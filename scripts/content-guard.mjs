import { COPY, FORMS, ROOT_DEMOS, formsForRoot } from '../src/demo.js'
import { OCCURRENCES, ROOT_OCCURRENCE_COUNT } from '../src/occurrences.js'
import { WQY_PUBLIC_MODEL } from '../src/canonicalWqy.js'
import { MORPHOLOGY } from '../src/morphologyWqy.js'
import { CONTENT_SOURCES, WORD_CONTENT, LBB_WORD_CONTENT, LBB_DERIVATION_NOTES } from '../src/rootContent.js'

const errors = []
const fail = message => errors.push(message)
const unique = values => new Set(values).size === values.length

// Canonical w-q-y semantic model.
if (WQY_PUBLIC_MODEL.modelVersion !== 'WQY-SM v0.2 — falsification-passed — 2026-09-17') {
  fail('unexpected canonical w-q-y model version')
}
if (!WQY_PUBLIC_MODEL.falsificationPassed || !WQY_PUBLIC_MODEL.humanReviewed) {
  fail('w-q-y public model must remain falsification-passed and human-reviewed')
}
if (WQY_PUBLIC_MODEL.scholarReviewed) fail('w-q-y must not be presented as scholar-reviewed')
if (WQY_PUBLIC_MODEL.translationFidelity.universalEquivalent !== false) {
  fail('translation fidelity must not imply a universal equivalent')
}
if (!WQY_PUBLIC_MODEL.roleSafeguards.directObject.ru.includes('роль X определяется контекстом')) {
  fail('direct-object semantic-role safeguard missing')
}

// Form registry.
const ids = FORMS.map(form => form.id)
if (!unique(ids)) fail('duplicate ids in FORMS')
for (const rootKey of Object.keys(ROOT_DEMOS)) {
  const root = ROOT_DEMOS[rootKey]
  const orbitIds = new Set(root.orbits.map(orbit => orbit.id))
  for (const form of formsForRoot(rootKey)) {
    if (!orbitIds.has(form.orbit)) fail(`${form.id} points to missing visible orbit ${form.orbit}`)
  }
}

// Occurrence database and canonical counts.
if (ROOT_OCCURRENCE_COUNT !== 258 || WQY_PUBLIC_MODEL.corpusCounts.total !== 258) {
  fail(`w-q-y root count mismatch: runtime=${ROOT_OCCURRENCE_COUNT}, canonical=${WQY_PUBLIC_MODEL.corpusCounts.total}`)
}
for (const [id, expected] of Object.entries(WQY_PUBLIC_MODEL.corpusCounts)) {
  if (id === 'total') continue
  const actual = OCCURRENCES[id]?.length ?? 0
  if (actual !== expected) fail(`${id} count mismatch: expected ${expected}, found ${actual}`)
}
for (const id of Object.keys(OCCURRENCES)) {
  const form = FORMS.find(item => item.id === id)
  if (!form) fail(`occurrence group ${id} has no FORMS entry`)
  else if (form.lexicalOnly) fail(`Quran-attested form ${id} is incorrectly marked lexicalOnly`)
}
const taqwaRefs = (OCCURRENCES.taqwa ?? []).map(x => `${x.sura}:${x.ayah}`)
for (const wrong of ['3:102', '59:18']) {
  if (taqwaRefs.includes(wrong)) fail(`taqwa noun list contains a non-taqwa target context ${wrong}`)
}
if ((OCCURRENCES.taqwa ?? []).length !== 17) fail('taqwa noun count must be 17')
if ((OCCURRENCES.albab ?? []).length !== 16) fail('albab Quran occurrence count must be 16')

// The 8 + 3 Corpus/dictionary scope belongs to w-q-y only.
const wqyForms = FORMS.filter(form => form.rootKey === 'wqy')
if (wqyForms.filter(form => !form.lexicalOnly).length !== 8) fail('w-q-y must preserve 8 Quranic Corpus groups')
if (wqyForms.filter(form => form.lexicalOnly).length !== 3) fail('w-q-y must preserve 3 clearly-marked lexical-only forms')

// Every visible root-space form has a morphology teaching profile.
const activeForms = FORMS.filter(form => !form.relatedOnly)
const allowedRoles = new Set(['root', 'prefix', 'suffix', 'ending', 'particle', 'form', 'fusion', 'rootShift'])
for (const form of activeForms) {
  const profile = MORPHOLOGY[form.id]
  if (!profile) {
    fail(`missing morphology teaching profile for visible form ${form.id}`)
    continue
  }
  if (!Array.isArray(profile.visualParts) || profile.visualParts.length < 2) fail(`invalid visualParts for ${form.id}`)
  if (!profile.pattern?.ar || !profile.pattern?.ru?.text || !profile.pattern?.en?.text) fail(`missing pattern explanation for ${form.id}`)
  if (!Array.isArray(profile.components)) fail(`components must be an array for ${form.id}`)
  for (const part of profile.visualParts || []) {
    if (!allowedRoles.has(part.role)) fail(`unknown morphology role ${part.role} in ${form.id}`)
  }
}
for (const id of Object.keys(MORPHOLOGY)) {
  if (!FORMS.some(form => form.id === id)) fail(`orphan morphology profile ${id}`)
}

// Approved taqwa visual semantics.
const taqwaParts = MORPHOLOGY.taqwa?.visualParts || []
const expectedTaqwa = [
  ['تَ', 'rootShift'],
  ['قْ', 'root'],
  ['و', 'rootShift'],
  ['ىٰ', 'form'],
]
if (JSON.stringify(taqwaParts.map(p => [p.text, p.role])) !== JSON.stringify(expectedTaqwa)) {
  fail('taqwa colour analysis must show changed-root ت, root ق, changed-root و, and final pattern ىٰ')
}
if (MORPHOLOGY.taqwa?.pattern?.ar !== 'فَعْلَى') fail('taqwa must use its own noun pattern فَعْلَى')
if (!MORPHOLOGY.taqwa?.formation?.ru?.includes('وَقْيَا → تَقْيَا')) fail('taqwa reconstruction sequence missing')
if (JSON.stringify(MORPHOLOGY.taqwa).includes('تَـ не выделяется как самостоятельный смысловой префикс') &&
    taqwaParts.some(p => p.role === 'prefix')) {
  fail('taqwa ت must not be visually classified as a semantic prefix')
}

// Approved mim semantics.
if (!MORPHOLOGY.muttaqin?.components?.some(x => x.role === 'prefix' && x.ar.includes('مُ') && x.ru.includes('носителя смысла'))) {
  fail('muttaqin must preserve approved مُـ bearer semantics')
}
if (!MORPHOLOGY.muttaqin?.components?.some(x => x.role === 'ending' && x.ar.includes('ين'))) {
  fail('muttaqin must distinguish ـين as a grammatical ending')
}

// LBB coverage and provenance.
const activeLbb = activeForms.filter(form => form.rootKey === 'lbb')
for (const form of activeLbb) {
  if (!LBB_DERIVATION_NOTES[form.id]) fail(`missing LBB derivation note for ${form.id}`)
  if (!LBB_WORD_CONTENT[form.id] && form.source && !CONTENT_SOURCES[form.source]) {
    fail(`fallback LBB source ${form.source} for ${form.id} is not defined in CONTENT_SOURCES`)
  }
}
for (const id of Object.keys(LBB_DERIVATION_NOTES)) {
  if (!activeLbb.some(form => form.id === id)) fail(`orphan LBB derivation note ${id}`)
}

// Source references inside stored content must resolve.
const collectSourceRefs = value => {
  const refs = []
  if (!value || typeof value !== 'object') return refs
  if (Array.isArray(value)) {
    for (const item of value) refs.push(...collectSourceRefs(item))
    return refs
  }
  for (const [key, item] of Object.entries(value)) {
    if ((key === 'structureSources' || key === 'meaningSources' || key === 'sources') && Array.isArray(item)) refs.push(...item)
    else refs.push(...collectSourceRefs(item))
  }
  return refs
}
for (const id of new Set([...collectSourceRefs(WORD_CONTENT), ...collectSourceRefs(LBB_WORD_CONTENT)])) {
  if (!CONTENT_SOURCES[id]) fail(`content references undefined source ${id}`)
}

// Editorial rules that previously drifted.
if (COPY.ru.semanticStatus.includes('Рабочее объяснение по источникам')) fail('obsolete semantic-status wording returned')
if (JSON.stringify(MORPHOLOGY).includes('Что нам даёт форма')) fail('obsolete morphology heading returned')

if (errors.length) {
  for (const error of errors) console.error('QURAN_UNIVERSE_DATA_GUARD_FAIL:', error)
  process.exit(1)
}

console.log(`Quran Universe data guard passed: ${FORMS.length} forms, ${activeForms.length} visible morphology profiles, ${Object.keys(OCCURRENCES).length} Quran occurrence groups, and source references are aligned.`)
