import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const readJson = p => JSON.parse(fs.readFileSync(path.join(root, p), 'utf8'))
const sourceRegistry = readJson('src/data/research/sourceRegistry.json')
const upstreams = readJson('src/data/research/upstreams.json')
const findings = []
const token = process.env.GITHUB_TOKEN || ''
const headers = token ? { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json' } : { Accept: 'application/vnd.github+json' }

for (const upstream of upstreams.repositories) {
  try {
    const response = await fetch(`https://api.github.com/repos/${upstream.repo}/git/ref/heads/${encodeURIComponent(upstream.branch)}`, { headers })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const payload = await response.json()
    const current = payload.object?.sha
    if (current && current !== upstream.pinnedCommit) {
      findings.push(`Skill upstream changed: ${upstream.id} — pinned ${upstream.pinnedCommit.slice(0, 8)}, upstream ${current.slice(0, 8)}. Run security review before updating.`)
    }
  } catch (error) {
    findings.push(`Could not verify skill upstream ${upstream.id}: ${error.message}`)
  }
}

const now = Date.now()
for (const source of sourceRegistry.sources.filter(item => String(item.priority).startsWith('A'))) {
  if (!source.lastChecked) {
    findings.push(`Core source has no review date: ${source.systemId}`)
    continue
  }
  const age = (now - Date.parse(source.lastChecked + 'T00:00:00Z')) / 86400000
  if (age > 60) findings.push(`Core source review due: ${source.systemId} was last checked ${Math.floor(age)} days ago (${source.lastChecked}).`)
}

const body = findings.length
  ? '# Quran Universe automated maintenance watch\n\n' + findings.map(item => '- ' + item).join('\n') + '\n'
  : '# Quran Universe automated maintenance watch\n\nNo upstream skill changes or overdue core-source reviews detected.\n'
fs.writeFileSync(path.join(root, 'system-health-report.md'), body)
console.log(body)
if (findings.length) process.exit(1)
