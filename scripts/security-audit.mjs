import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const errors = []
const fail = message => errors.push(message)
const walk = dir => fs.existsSync(dir) ? fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
  const p = path.join(dir, entry.name)
  return entry.isDirectory() ? walk(p) : [p]
}) : []

const workflowFiles = walk(path.join(root, '.github/workflows')).filter(file => /\.ya?ml$/.test(file))
if (!workflowFiles.length) fail('no GitHub Actions workflows found')

for (const file of workflowFiles) {
  const rel = path.relative(root, file)
  const content = fs.readFileSync(file, 'utf8')
  if (!/^permissions:\s*(?:\{\s*\})?\s*$/m.test(content)) fail(`${rel}: missing explicit permissions block`)
  if (/pull_request_target\s*:/.test(content)) fail(`${rel}: pull_request_target is forbidden without explicit security redesign`)
  if (/workflow_run\s*:/.test(content)) fail(`${rel}: workflow_run is forbidden without explicit security redesign`)
  if (/permissions:\s*write-all/.test(content)) fail(`${rel}: write-all permissions are forbidden`)
  for (const match of content.matchAll(/uses:\s*([^\s#]+)@([^\s#]+)/g)) {
    if (!/^[0-9a-f]{40}$/.test(match[2])) {
      fail(`${rel}: action is not pinned to an immutable 40-character commit SHA: ${match[1]}@${match[2]}`)
    }
  }
}

for (const rel of ['.github/workflows/data-pilots.yml', '.github/workflows/system-health.yml']) {
  const content = fs.readFileSync(path.join(root, rel), 'utf8')
  if (/\bcurl\b|\bwget\b/.test(content)) fail(`${rel}: external datasets must use quarantine-download.mjs, not direct curl/wget`)
}

const html = fs.readFileSync(path.join(root, 'spatial.html'), 'utf8')
if (!html.includes('Content-Security-Policy')) fail('spatial.html missing Content Security Policy')
if (/script-src[^;]*(?:'unsafe-inline'|'unsafe-eval')/.test(html)) fail('CSP script-src must not allow unsafe-inline or unsafe-eval')

const injectionFiles = [...walk(path.join(root, 'src')), path.join(root, 'spatial.html')]
const injectionPatterns = [
  [/dangerouslySetInnerHTML/g, 'dangerouslySetInnerHTML'],
  [/\.innerHTML\s*=/g, 'innerHTML assignment'],
  [/\beval\s*\(/g, 'eval'],
  [/new\s+Function\s*\(/g, 'new Function'],
  [/document\.write\s*\(/g, 'document.write'],
]
for (const file of injectionFiles) {
  const content = fs.readFileSync(file, 'utf8')
  for (const [pattern, label] of injectionPatterns) {
    pattern.lastIndex = 0
    if (pattern.test(content)) fail(`${path.relative(root, file)}: unsafe HTML/script primitive detected: ${label}`)
  }
}

const secretFiles = [
  ...walk(path.join(root, 'src')),
  ...walk(path.join(root, 'scripts')),
  ...walk(path.join(root, '.github')),
  ...['AGENTS.md', 'README.md', 'spatial.html', 'vite.config.js'].map(p => path.join(root, p)).filter(fs.existsSync),
].filter(file => !file.endsWith(path.join('scripts', 'security-audit.mjs')))

const secretPatterns = [
  [new RegExp(['gh', 'p_'].join('') + '[A-Za-z0-9]{30,}', 'g'), 'GitHub classic token'],
  [new RegExp(['github', '_pat_'].join('') + '[A-Za-z0-9_]{30,}', 'g'), 'GitHub fine-grained token'],
  [new RegExp(['hf', '_'].join('') + '[A-Za-z0-9]{30,}', 'g'), 'Hugging Face token'],
  [new RegExp(['AK', 'IA'].join('') + '[A-Z0-9]{16}', 'g'), 'AWS access key'],
  [new RegExp(['sk', '-proj-'].join('') + '[A-Za-z0-9_-]{20,}', 'g'), 'API secret token'],
  [new RegExp(['-----BEGIN ', 'PRIVATE KEY-----'].join(''), 'g'), 'private key'],
]
for (const file of secretFiles) {
  if (!/\.(?:js|jsx|mjs|json|md|ya?ml|html)$/.test(file)) continue
  const content = fs.readFileSync(file, 'utf8')
  for (const [pattern, label] of secretPatterns) {
    pattern.lastIndex = 0
    if (pattern.test(content)) fail(`${path.relative(root, file)}: possible committed secret: ${label}`)
  }
}

const integrity = JSON.parse(fs.readFileSync(path.join(root, 'src/data/research/externalDataIntegrity.json'), 'utf8'))
for (const [id, spec] of Object.entries(integrity.datasets || {})) {
  if (!spec.url?.startsWith('https://')) fail(`${id}: external source must use HTTPS`)
  if (!Array.isArray(spec.allowedHosts) || !spec.allowedHosts.length) fail(`${id}: allowedHosts required`)
  if (!Number.isInteger(spec.maxBytes) || spec.maxBytes <= 0) fail(`${id}: positive maxBytes required`)
  if (!['zip', 'sqlite'].includes(spec.fileType)) fail(`${id}: unsupported quarantine fileType ${spec.fileType}`)
  if (spec.status === 'approved_for_pilot' && !/^[0-9a-f]{64}$/.test(spec.sha256 || '')) {
    fail(`${id}: approved external data requires an exact SHA256 pin`)
  }
}
if (integrity.datasets?.['qamar-acl-supplement']?.status !== 'quarantine_only') {
  fail('QAMAR supplement must remain quarantine_only until the actual corpus release/hash/licence is reviewed')
}

const baseline = JSON.parse(fs.readFileSync(path.join(root, 'src/data/research/securityBaseline.json'), 'utf8'))
for (const item of baseline.criticalFiles || []) {
  if (!/^[0-9a-f]{40}$/.test(item.gitBlobSha || '')) fail(`invalid critical-file baseline SHA: ${item.path}`)
}

if (!fs.existsSync(path.join(root, '.github/skills/quran-universe-security/SKILL.md'))) fail('Quran Universe security skill missing')
const agents = fs.readFileSync(path.join(root, 'AGENTS.md'), 'utf8')
if (!agents.includes('.github/skills/quran-universe-security/SKILL.md')) fail('AGENTS.md does not require the security skill')

if (errors.length) {
  for (const error of errors) console.error('QURAN_UNIVERSE_SECURITY_AUDIT_FAIL:', error)
  process.exit(1)
}
console.log(`Security audit passed: ${workflowFiles.length} pinned workflows, CSP present, no unsafe script injection, no obvious committed secrets, external-data quarantine policy valid.`)
