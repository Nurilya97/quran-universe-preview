import fs from 'node:fs'
import { COPY, FORMS, ROOT_DEMOS, formsForRoot } from '../src/demo.js'
import { OCCURRENCES, ROOT_OCCURRENCE_COUNT } from '../src/occurrences.js'
import { WQY_PUBLIC_MODEL } from '../src/canonicalWqy.js'
import { MORPHOLOGY } from '../src/morphologyWqy.js'
import { CONTENT_SOURCES, WORD_CONTENT, LBB_WORD_CONTENT, LBB_DERIVATION_NOTES } from '../src/rootContent.js'
import { AYAH_PROTOTYPES } from '../src/ayahPrototype.js'
import { validateAyahRecord } from '../src/data/ayahSchema.js'
import {
  QURAN_UNIVERSE_DATA_VERSION,
  DATA_SOURCE_SYSTEMS,
  DATA_LAYER_AUTHORITY,
  buildPilotOrthographicWordMap,
} from '../src/data/quranUniverseData.js'
import { PILOT_SOURCE_ADAPTERS, PILOT_2_197_DATASET_STATUS } from '../src/data/sourceAdapters.js'
import { TAFSIRCENTER_2_197_PILOT } from '../src/data/pilots/tafsircenter-2-197.js'

const errors = []
const fail = message => errors.push(message)
const unique = values => new Set(values).size === values.length

const readProjectJson = relativePath => JSON.parse(fs.readFileSync(new URL(`../${relativePath}`, import.meta.url), 'utf8'))
const rootRegistry = readProjectJson('src/data/research/rootRegistry.json')
const sourceRegistry = readProjectJson('src/data/research/sourceRegistry.json')
const wqyResearch = readProjectJson('src/data/research/wqyResearch.json')

if (rootRegistry.authority !== 'single_repository' || rootRegistry.sourceOfTruth !== 'Nurilya97/quran-universe-preview') fail('root registry must declare the single-repository authority')
if (sourceRegistry.authority !== 'single_repository') fail('source registry must declare the single-repository authority')
if (wqyResearch.authority !== 'single_repository') fail('w-q-y research record must declare the single-repository authority')
if (wqyResearch.modelVersion !== WQY_PUBLIC_MODEL.modelVersion) fail('w-q-y research/public model version drift')
if (!wqyResearch.humanReviewed || wqyResearch.scholarReviewed) fail('w-q-y review state drifted')
for (const systemId of ['qac', 'tafsircenter', 'quranmorph', 'qamar', 'tanzil']) {
  if (!sourceRegistry.sources.some(source => source.systemId === systemId)) fail(`missing canonical source-registry entry ${systemId}`)
}
if (!rootRegistry.roots.some(root => root.root === 'ل ب ب')) fail('ل ب ب must exist in the single root registry')

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

// Every registered word source must resolve through the single canonical source registry.
for (const form of FORMS) {
  if (form.source && !CONTENT_SOURCES[form.source]) fail(`form ${form.id} references undefined source ${form.source}`)
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
if (!MORPHOLOGY.ittaqa?.transformation?.ru?.includes('إبدال') || !MORPHOLOGY.ittaqa?.transformation?.ru?.includes('إدغام')) {
  fail('ittaqa transformation must preserve explicit ibdal then idgham')
}
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


// Ayah Space records must satisfy the shared schema before deployment.
for (const [reference, record] of Object.entries(AYAH_PROTOTYPES)) {
  try {
    validateAyahRecord(record)
  } catch (error) {
    fail(`Ayah Space schema failed for ${reference}: ${error.message}`)
  }
}

// Canonical Quran Universe IDs and first cross-corpus pilot.
if (QURAN_UNIVERSE_DATA_VERSION !== 'QU-DATA v0.4 — 2026-09-22') fail('unexpected Quran Universe data-layer version')
const pilotAyah = AYAH_PROTOTYPES['2:197']
if (!pilotAyah) fail('2:197 pilot ayah missing')
else {
  const pilotWords = buildPilotOrthographicWordMap(pilotAyah)
  if (pilotWords.length !== 29) fail(`2:197 pilot token count changed: ${pilotWords.length}`)
  if (!unique(pilotWords.map(word => word.id))) fail('duplicate canonical Quran Universe word IDs in 2:197 pilot')
  for (const word of pilotWords) {
    if (word.external.qac !== `2:197:${word.word}`) fail(`QAC bridge mismatch for ${word.id}`)
    if (word.orbitId && OCCURRENCES[word.orbitId]) {
      const hasOccurrence = OCCURRENCES[word.orbitId].some(item =>
        item.sura === word.surah && item.ayah === word.ayah && item.word === word.word
      )
      if (!hasOccurrence) fail(`Ayah token ${word.id} links to ${word.orbitId} but occurrence database lacks its QAC coordinate`)
    }
  }
}
if (TAFSIRCENTER_2_197_PILOT.wordCount !== 29 || TAFSIRCENTER_2_197_PILOT.rows.length !== 29) {
  fail('Tafsir Center 2:197 pilot must remain 29/29 words')
}
const canonicalPilotRows = buildPilotOrthographicWordMap(pilotAyah)
for (let index = 0; index < TAFSIRCENTER_2_197_PILOT.rows.length; index += 1) {
  const sourceRow = TAFSIRCENTER_2_197_PILOT.rows[index]
  const canonicalRow = canonicalPilotRows[index]
  if (sourceRow.id !== canonicalRow?.id) fail(`Tafsir Center pilot ID mismatch at word ${index + 1}`)
  if (sourceRow.qacText !== canonicalRow?.text) fail(`Tafsir Center pilot QAC text drift at ${sourceRow.id}`)
}
const normalizeArabicSurface = value => String(value)
  .replace(/ٱ/g, 'ا')
  .replace(/ـ/g, '')
  .replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g, '')
  .replace(/\//g, '')
const orthographyDifferences = TAFSIRCENTER_2_197_PILOT.rows
  .filter(row => normalizeArabicSurface(row.qacText) !== normalizeArabicSurface(row.tafsirCenterText))
  .map(row => row.id)
if (JSON.stringify(orthographyDifferences) !== JSON.stringify(['q:2:197:w28', 'q:2:197:w29'])) {
  fail(`unexpected 2:197 QAC/Tafsir Center orthography differences: ${orthographyDifferences.join(', ')}`)
}
if (!unique(TAFSIRCENTER_2_197_PILOT.rows.map(row => row.id))) fail('duplicate Tafsir Center Quran Universe IDs')
const tafsirTaqwa = TAFSIRCENTER_2_197_PILOT.evidence.taqwa
const tafsirIttaquni = TAFSIRCENTER_2_197_PILOT.evidence.ittaquni
const tafsirAlbab = TAFSIRCENTER_2_197_PILOT.evidence.albab
if (tafsirTaqwa.root !== 'وقي' || !tafsirTaqwa.sarf.includes('فَعْلَى')) {
  fail('Tafsir Center taqwa evidence must preserve root وقي and noun pattern فَعْلَى')
}
if (tafsirIttaquni.root !== 'وقي' || !tafsirIttaquni.sarf.includes('افْتَعَلَ') || !tafsirIttaquni.sarf.includes('اوْتَقِي')) {
  fail('Tafsir Center ittaquni evidence must preserve root وقي, Form VIII, and source form اوْتَقِي')
}
if (tafsirAlbab.root !== 'لبب' || !tafsirAlbab.sarf.includes('أَفْعَالٌ')) {
  fail('Tafsir Center albab evidence must preserve root لبب and pattern أَفْعَال')
}
if (PILOT_2_197_DATASET_STATUS.tafsircenter.mappedOrthographicWords !== 29) {
  fail('2:197 Tafsir Center pilot must remain 29/29 words')
}

if (PILOT_2_197_DATASET_STATUS.qac.mappedOrthographicWords !== 29) fail('2:197 QAC pilot must remain 29/29 words')
if (PILOT_SOURCE_ADAPTERS.qac.pilotStatus !== 'row_mapped') fail('QAC pilot adapter status drifted')
if (PILOT_SOURCE_ADAPTERS.tafsircenter.pilotStatus !== 'row_mapped') fail('Tafsir Center adapter status drifted')
if (PILOT_SOURCE_ADAPTERS.quranmorph.pilotStatus !== 'metadata_verified_access_pending') fail('QuranMorph access status drifted')
if (PILOT_SOURCE_ADAPTERS.qamar.pilotStatus !== 'publication_verified_release_pending') fail('QAMAR release status drifted')
if (!PILOT_SOURCE_ADAPTERS.quranmorph.access.includes('official_download_form_requires')) {
  fail('QuranMorph official-access restriction must remain explicit until authorized access is available')
}

const taqwaToken = pilotAyah?.tokens?.[25]
if (!taqwaToken || taqwaToken.orbitId !== 'taqwa') fail('2:197 word 26 must remain linked to taqwa')
else {
  const taqwaMeaning = taqwaToken.analysis?.ru?.meaning
  if (taqwaToken.ru !== 'благочестие' || taqwaMeaning?.gloss !== 'Благочестие') {
    fail('2:197 taqwa must keep the approved Russian rendering «благочестие»')
  }
  if (!taqwaMeaning?.definition?.includes('Почитание Всевышнего')) {
    fail('2:197 taqwa must keep the ordinary Russian definition of «благочестие» separate')
  }
  if (!taqwaMeaning?.source?.includes('помнит о Нём') ||
      !taqwaMeaning?.source?.includes('границ') ||
      !taqwaMeaning?.source?.includes('совершать зло')) {
    fail('2:197 taqwa source/mechanism is not synchronized with the approved model')
  }
  if (JSON.stringify(taqwaMeaning).includes('целостная осознанность перед Всевышним') ||
      taqwaMeaning?.gloss?.toLowerCase().includes('осознанност')) {
    fail('2:197 taqwa regressed to «осознанность» as the standalone Russian rendering')
  }
  if (!taqwaToken.analysis?.ru?.morphology?.text?.includes('модели فَعْلَى')) {
    fail('2:197 taqwa morphology lost its own noun pattern')
  }
}

const ittaquniToken = pilotAyah?.tokens?.[26]
if (!ittaquniToken || ittaquniToken.orbitId !== 'ittaqa') fail('2:197 word 27 must remain linked to ittaqa')
else {
  const ittaquniMeaning = ittaquniToken.analysis?.ru?.meaning
  if (!ittaquniToken.ru?.includes('границы') || !ittaquniMeaning?.gloss?.includes('границы')) {
    fail('2:197 wa-ittaqūni must keep the approved boundary-centred Russian explanation')
  }
  if (JSON.stringify(ittaquniMeaning).includes('передо Мной') || JSON.stringify(ittaquniMeaning).includes('опасайтесь Меня')) {
    fail('2:197 wa-ittaqūni restored an explicitly rejected Russian phrasing')
  }
}

for (const [layer, sources] of Object.entries(DATA_LAYER_AUTHORITY)) {
  if (!Array.isArray(sources) || !sources.length) fail(`data authority layer ${layer} has no sources`)
  for (const source of sources) if (!DATA_SOURCE_SYSTEMS[source]) fail(`data authority layer ${layer} references unknown source ${source}`)
}
if (DATA_SOURCE_SYSTEMS['corpus-coranicum']?.status !== 'separate_layer') {
  fail('Corpus Coranicum must remain a separate historical/research layer')
}

// Editorial rules that previously drifted.
if (COPY.ru.semanticStatus.includes('Рабочее объяснение по источникам')) fail('obsolete semantic-status wording returned')
if (JSON.stringify(MORPHOLOGY).includes('Что нам даёт форма')) fail('obsolete morphology heading returned')

if (errors.length) {
  for (const error of errors) console.error('QURAN_UNIVERSE_DATA_GUARD_FAIL:', error)
  process.exit(1)
}

console.log(`Quran Universe data guard passed: ${FORMS.length} forms, ${activeForms.length} visible morphology profiles, ${Object.keys(OCCURRENCES).length} Quran occurrence groups, canonical source registry, and QAC + Tafsir Center 2:197 row mappings are aligned.`)
