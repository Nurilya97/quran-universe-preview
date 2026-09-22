import fs from 'node:fs'
import path from 'node:path'
import { createHash } from 'node:crypto'

const root = process.cwd()
const registry = JSON.parse(fs.readFileSync(path.join(root, 'src/data/research/externalDataIntegrity.json'), 'utf8'))
const [id, ...flags] = process.argv.slice(2)

if (!id || !registry.datasets?.[id]) {
  console.error('Usage: node scripts/quarantine-download.mjs <dataset-id> [--require-approved]')
  process.exit(2)
}

const spec = registry.datasets[id]
const requireApproved = flags.includes('--require-approved')
const approved = spec.status === 'approved_for_pilot' && /^[0-9a-f]{64}$/.test(spec.sha256 || '')

if (requireApproved && !approved) {
  console.error(`QUARANTINE_FAIL: ${id} is not approved for automated use`)
  process.exit(1)
}

const isAllowedHost = host => spec.allowedHosts.some(rule =>
  rule.startsWith('.') ? host === rule.slice(1) || host.endsWith(rule) : host === rule
)

const sourceUrl = new URL(spec.url)
if (sourceUrl.protocol !== 'https:' || !isAllowedHost(sourceUrl.hostname)) {
  throw new Error(`${id}: source URL must be HTTPS on an allowlisted host`)
}

const dir = path.join(root, '.quarantine', id)
fs.mkdirSync(dir, { recursive: true })
const output = path.join(dir, spec.filename)
const partial = output + '.part'
const manifestPath = output + '.integrity.json'
fs.rmSync(partial, { force: true })
fs.rmSync(output, { force: true })

const response = await fetch(sourceUrl, {
  redirect: 'follow',
  headers: { 'User-Agent': 'Quran-Universe-integrity-quarantine/1.0' },
})
if (!response.ok || !response.body) throw new Error(`${id}: download failed with HTTP ${response.status}`)

const finalUrl = new URL(response.url)
if (finalUrl.protocol !== 'https:' || !isAllowedHost(finalUrl.hostname)) {
  throw new Error(`${id}: redirect left allowlisted HTTPS hosts: ${finalUrl.hostname}`)
}

const declaredLength = Number(response.headers.get('content-length') || 0)
if (declaredLength && declaredLength > spec.maxBytes) {
  throw new Error(`${id}: declared size ${declaredLength} exceeds maxBytes ${spec.maxBytes}`)
}

const hash = createHash('sha256')
const handle = fs.openSync(partial, 'wx')
let bytes = 0
let prefix = Buffer.alloc(0)
try {
  for await (const chunk of response.body) {
    const buffer = Buffer.from(chunk)
    bytes += buffer.length
    if (bytes > spec.maxBytes) throw new Error(`${id}: downloaded size exceeds maxBytes ${spec.maxBytes}`)
    hash.update(buffer)
    if (prefix.length < 16) prefix = Buffer.concat([prefix, buffer]).subarray(0, 16)
    fs.writeSync(handle, buffer)
  }
} catch (error) {
  fs.closeSync(handle)
  fs.rmSync(partial, { force: true })
  throw error
}
fs.closeSync(handle)

const actualSha = hash.digest('hex')
const zipSignatures = [[0x03, 0x04], [0x05, 0x06], [0x07, 0x08]]
const isZip = prefix.length >= 4 && prefix[0] === 0x50 && prefix[1] === 0x4b &&
  zipSignatures.some(([a, b]) => prefix[2] === a && prefix[3] === b)
const isSqlite = prefix.subarray(0, 16).toString('binary') === 'SQLite format 3\0'

if ((spec.fileType === 'zip' && !isZip) || (spec.fileType === 'sqlite' && !isSqlite)) {
  fs.rmSync(partial, { force: true })
  throw new Error(`${id}: magic bytes do not match expected type ${spec.fileType}`)
}
if (spec.sha256 && actualSha !== spec.sha256) {
  fs.rmSync(partial, { force: true })
  throw new Error(`${id}: SHA256 mismatch; expected ${spec.sha256}, got ${actualSha}`)
}

fs.renameSync(partial, output)
const manifest = {
  dataset: id,
  status: approved ? 'verified_approved' : 'quarantined_unapproved',
  sourceUrl: spec.url,
  finalUrl: response.url,
  contentType: response.headers.get('content-type'),
  fileType: spec.fileType,
  bytes,
  sha256: actualSha,
  expectedSha256: spec.sha256 || null,
  checkedAt: new Date().toISOString(),
}
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n')

console.log(`${id}: ${manifest.status}; ${bytes} bytes; sha256=${actualSha}`)
console.log(`Integrity manifest: ${path.relative(root, manifestPath)}`)
if (!approved) {
  console.warn(`${id}: quarantine only — do not extract or ingest until an approved hash and review status are recorded.`)
}
