import { FORMS } from '../src/demo.js'
import { OCCURRENCES, ROOT_OCCURRENCE_COUNT } from '../src/occurrences.js'
import { WQY_PUBLIC_MODEL } from '../src/canonicalWqy.js'

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
