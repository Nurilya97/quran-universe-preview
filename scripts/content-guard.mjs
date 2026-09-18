import { FORMS } from '../src/demo.js'
import { OCCURRENCES, ROOT_OCCURRENCE_COUNT } from '../src/occurrences.js'
import { WQY_PUBLIC_MODEL } from '../src/canonicalWqy.js'
import { MORPHOLOGY } from '../src/morphologyWqy.js'

const fail = message => {
  console.error('PREVIEW_CONTENT_GUARD_FAIL:', message)
  process.exitCode = 1
}

if (WQY_PUBLIC_MODEL.modelVersion !== 'WQY-SM v0.2 — falsification-passed — 2026-09-17') {
  fail('unexpected canonical model version')
}
if (!WQY_PUBLIC_MODEL.falsificationPassed || !WQY_PUBLIC_MODEL.humanReviewed) {
  fail('w-q-y public model must remain falsification-passed and human-reviewed')
}
if (WQY_PUBLIC_MODEL.scholarReviewed) {
  fail('w-q-y must not be presented as scholar-reviewed')
}
if (ROOT_OCCURRENCE_COUNT !== 258 || WQY_PUBLIC_MODEL.corpusCounts.total !== 258) {
  fail(`root count mismatch: runtime=${ROOT_OCCURRENCE_COUNT}, canonical=${WQY_PUBLIC_MODEL.corpusCounts.total}`)
}
for (const [id, expected] of Object.entries(WQY_PUBLIC_MODEL.corpusCounts)) {
  if (id === 'total') continue
  const actual = OCCURRENCES[id]?.length ?? 0
  if (actual !== expected) fail(`${id} count mismatch: expected ${expected}, found ${actual}`)
}
const taqwaRefs = (OCCURRENCES.taqwa ?? []).map(x => `${x.sura}:${x.ayah}`)
for (const wrong of ['3:102', '59:18']) {
  if (taqwaRefs.includes(wrong)) fail(`taqwa noun list contains Form VIII verb context ${wrong}`)
}
if ((OCCURRENCES.taqwa ?? []).length !== 17) fail('taqwa noun count must be 17')
if (FORMS.filter(x => !x.lexicalOnly).length !== 8) fail('preview must preserve 8 Quranic Corpus groups')
if (FORMS.filter(x => x.lexicalOnly).length !== 3) fail('preview must preserve 3 clearly-marked lexical-only forms')
if (!WQY_PUBLIC_MODEL.roleSafeguards.directObject.ru.includes('не делает X источником опасности')) {
  fail('direct-object semantic-role safeguard missing')
}
if (WQY_PUBLIC_MODEL.translationFidelity.universalEquivalent !== false) {
  fail('translation fidelity must not imply a universal equivalent')
}

console.log('Preview content guard passed: WQY v0.2 status, counts, role safeguards and taqwa scope are aligned.')

const morphologyIds = FORMS.map(x => x.id)
const allowedRoles = new Set(['root', 'prefix', 'suffix', 'ending', 'particle', 'form'])
for (const id of morphologyIds) {
  const profile = MORPHOLOGY[id]
  if (!profile) fail(`missing morphology teaching profile for ${id}`)
  if (!Array.isArray(profile?.visualParts) || profile.visualParts.length < 2) fail(`invalid visualParts for ${id}`)
  if (!profile?.pattern?.ar || !profile?.pattern?.ru?.text || !profile?.pattern?.en?.text) fail(`missing pattern explanation for ${id}`)
  if (!Array.isArray(profile?.components)) fail(`components must be an array for ${id}`)
  for (const part of profile.visualParts || []) {
    if (!allowedRoles.has(part.role)) fail(`unknown morphology role ${part.role} in ${id}`)
  }
}
const taqwaRoles = [...new Set(MORPHOLOGY.taqwa.visualParts.map(x => x.role))]
if (taqwaRoles.length !== 2 || !taqwaRoles.includes('root') || !taqwaRoles.includes('form')) {
  fail('taqwa main formula must show only root + form colours')
}
if (!MORPHOLOGY.ittaqa.technical.ru.some(x => x.includes('اِوْتَقَى'))) fail('ittaqa must preserve the و→ت Form VIII derivation step in technical detail')
if (!MORPHOLOGY.muttaqin.components.some(x => x.role === 'ending' && x.ar.includes('ين'))) fail('muttaqin must distinguish ـين as a grammatical ending')
if (!MORPHOLOGY.waq.pattern.ru.text.includes('Алиф') || MORPHOLOGY.waq.pattern.ru.text.includes('сам по себе он означает')) fail('waq must explain alif as part of فاعل, not as an independent meaning')
if (JSON.stringify(MORPHOLOGY.taqwa).includes('историческое изменение')) fail('taqwa main model must not expose the obsolete letter-by-letter change label')
