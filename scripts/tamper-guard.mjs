import fs from 'node:fs'
import path from 'node:path'
import { createHash } from 'node:crypto'

const root = process.cwd()
const baseline = JSON.parse(fs.readFileSync(path.join(root, 'src/data/research/securityBaseline.json'), 'utf8'))
const errors = []

const gitBlobSha = file => {
  const bytes = fs.readFileSync(file)
  return createHash('sha1')
    .update(Buffer.from(`blob ${bytes.length}\0`))
    .update(bytes)
    .digest('hex')
}

for (const item of baseline.criticalFiles || []) {
  const file = path.join(root, item.path)
  if (!fs.existsSync(file)) {
    errors.push(`critical file missing: ${item.path}`)
    continue
  }
  const actual = gitBlobSha(file)
  if (actual !== item.gitBlobSha) {
    errors.push(`critical Quran data changed without reviewed baseline update: ${item.path} (${item.gitBlobSha.slice(0, 8)} -> ${actual.slice(0, 8)})`)
  }
}

if (errors.length) {
  for (const error of errors) console.error('QURAN_UNIVERSE_TAMPER_GUARD_FAIL:', error)
  process.exit(1)
}
console.log(`Tamper guard passed: ${baseline.criticalFiles.length} critical Quran/data files match the reviewed baseline.`)
