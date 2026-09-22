import fs from 'node:fs'
import path from 'node:path'
import { ROOT_DEMOS } from '../src/demo.js'
import { DATA_SOURCE_SYSTEMS } from '../src/data/quranUniverseData.js'
import { PILOT_SOURCE_ADAPTERS } from '../src/data/sourceAdapters.js'

const root = process.cwd()
const errors = []
const fail = message => errors.push(message)
const readJson = p => JSON.parse(fs.readFileSync(path.join(root, p), 'utf8'))
const rootRegistry = readJson('src/data/research/rootRegistry.json')
const sourceRegistry = readJson('src/data/research/sourceRegistry.json')
const roadmap = readJson('src/data/research/roadmap.json')
const upstreams = readJson('src/data/research/upstreams.json')
const pkg = readJson('package.json')

const requiredScripts = ['sync', 'sync:check', 'audit:system', 'check', 'verify']
for (const script of requiredScripts) if (!pkg.scripts?.[script]) fail(`package.json missing script ${script}`)

if (rootRegistry.authority !== 'single_repository') fail('root registry authority drift')
if (sourceRegistry.authority !== 'single_repository') fail('source registry authority drift')
if (roadmap.authority !== 'single_repository') fail('roadmap authority drift')
if (upstreams.policy !== 'watch_then_security_review') fail('upstream skills must be watch-then-review, never blind auto-update')

for (const rootDef of Object.values(ROOT_DEMOS)) {
  if (!rootRegistry.roots.some(item => item.root === rootDef.arabic)) fail(`product root missing from research registry: ${rootDef.arabic}`)
}
const staleTerms = /\bOrchestrator\b|ROOT_STATE|Notion ID/i
for (const item of rootRegistry.roots) {
  if (staleTerms.test(JSON.stringify(item))) fail(`legacy control-plane wording remains in root registry: ${item.root}`)
}

const registryIds = new Set(sourceRegistry.sources.map(item => item.systemId))
for (const id of Object.keys(DATA_SOURCE_SYSTEMS)) {
  if (id !== 'quran-universe' && !registryIds.has(id)) fail(`source registry missing active data-system ${id}`)
}
for (const [id, adapter] of Object.entries(PILOT_SOURCE_ADAPTERS)) {
  const record = sourceRegistry.sources.find(item => item.systemId === id)
  if (!record) fail(`pilot adapter missing source-registry record: ${id}`)
  else if (record.lastChecked && adapter.checkedOn && record.lastChecked < adapter.checkedOn) {
    fail(`source registry is older than adapter verification for ${id}: ${record.lastChecked} < ${adapter.checkedOn}`)
  }
}

const walk = dir => fs.existsSync(dir) ? fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
  const p = path.join(dir, entry.name)
  return entry.isDirectory() ? walk(p) : [p]
}) : []
const skillFiles = walk(path.join(root, '.github/skills')).filter(p => p.endsWith('/SKILL.md') || p.endsWith('\\SKILL.md'))
if (skillFiles.length < 8) fail('project skill set unexpectedly incomplete')
const skillNames = new Set()
for (const file of skillFiles) {
  const content = fs.readFileSync(file, 'utf8')
  const match = content.match(/^---[\s\S]*?\nname:\s*([^\n]+)[\s\S]*?---/)
  if (!match) fail(`skill frontmatter missing: ${path.relative(root, file)}`)
  else if (skillNames.has(match[1].trim())) fail(`duplicate skill name: ${match[1].trim()}`)
  else skillNames.add(match[1].trim())
}

const agents = fs.readFileSync(path.join(root, 'AGENTS.md'), 'utf8')
for (const match of agents.matchAll(/\.github\/skills\/([^/]+)\/SKILL\.md/g)) {
  const skillPath = path.join(root, '.github/skills', match[1], 'SKILL.md')
  if (!fs.existsSync(skillPath)) fail(`AGENTS references missing skill: ${match[1]}`)
}

const expectedWorkflows = ['pages-preview.yml', 'preview-integrity.yml', 'data-pilots.yml', 'system-health.yml']
for (const wf of expectedWorkflows) if (!fs.existsSync(path.join(root, '.github/workflows', wf))) fail(`missing workflow ${wf}`)
const pilots = fs.readFileSync(path.join(root, '.github/workflows/data-pilots.yml'), 'utf8')
if (/push:\s*[\s\S]*branches:\s*[\s\S]*main/.test(pilots)) fail('data-pilots workflow must not create skipped runs on every main push')
if (fs.existsSync(path.join(root, 'src/components/archive'))) fail('obsolete production archive directory returned')

const sourceFiles = [...walk(path.join(root, 'src')), ...walk(path.join(root, 'scripts')), ...walk(path.join(root, '.github/workflows'))]
for (const file of sourceFiles) {
  if (file.endsWith(path.join('scripts', 'system-audit.mjs'))) continue
  const content = fs.readFileSync(file, 'utf8')
  if (/mcp__Notion__|notion-rest|research-by-heart-viz/.test(content) && !file.endsWith('wqyResearch.json')) {
    fail(`active runtime/control file references legacy system: ${path.relative(root, file)}`)
  }
}

const coreSources = sourceRegistry.sources.filter(item => String(item.priority).startsWith('A'))
const now = Date.now()
for (const item of coreSources) {
  if (!item.lastChecked) { fail(`core source missing lastChecked: ${item.systemId}`); continue }
  const age = (now - Date.parse(item.lastChecked + 'T00:00:00Z')) / 86400000
  if (age > 90) fail(`core source review older than 90 days: ${item.systemId} (${Math.floor(age)} days)`)
}

if (errors.length) {
  for (const error of errors) console.error('QURAN_UNIVERSE_SYSTEM_AUDIT_FAIL:', error)
  process.exit(1)
}
console.log(`System audit passed: ${rootRegistry.roots.length} research roots, ${sourceRegistry.sources.length} sources, ${skillFiles.length} skills, ${roadmap.phases.length} roadmap phases.`)
