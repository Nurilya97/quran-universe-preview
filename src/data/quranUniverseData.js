// Quran Universe canonical data-layer primitives.
// This file defines our own stable identifiers and source-layer authority.
// External corpora are mapped onto these IDs; none of their positional IDs
// becomes the primary key of Quran Universe.

export const QURAN_UNIVERSE_DATA_VERSION = 'QU-DATA v0.1 — 2026-09-22'

export const DATA_SOURCE_SYSTEMS = {
  'quran-universe': { role: 'canonical_mapping', status: 'internal' },
  tanzil: { role: 'canonical_text', status: 'planned' },
  tafsircenter: { role: 'morphology_irab_tafsir', status: 'planned' },
  quranmorph: { role: 'lemma_pos', status: 'planned' },
  qamar: { role: 'root_lemma_pos', status: 'planned' },
  qac: { role: 'morphology_syntax', status: 'connected' },
  qul: { role: 'aggregated_quran_layers', status: 'planned' },
  qabas: { role: 'lexical_bridge', status: 'planned' },
  lane: { role: 'classical_lexicon', status: 'connected_partial' },
  'arabic-ontology': { role: 'concept_ontology', status: 'planned' },
  qursim: { role: 'semantic_ayah_links', status: 'planned' },
  qurana: { role: 'coreference', status: 'planned' },
  'boundary-quran': { role: 'prosody_waqf', status: 'planned' },
  ardt: { role: 'rhetoric_ontology', status: 'planned' },
  'balagha-corpus': { role: 'rhetoric_examples', status: 'planned' },
  'corpus-coranicum': { role: 'historical_research', status: 'separate_layer' },
}

export const DATA_LAYER_AUTHORITY = {
  canonicalText: ['tanzil'],
  wordSegmentation: ['quran-universe'],
  lemmaPos: ['quranmorph', 'qamar', 'qac'],
  root: ['qamar', 'qac', 'tafsircenter'],
  sarfIrab: ['tafsircenter', 'qac'],
  syntax: ['qac'],
  lexicalUniverse: ['qabas', 'lane'],
  conceptUniverse: ['arabic-ontology'],
  semanticAyahLinks: ['qursim', 'qul'],
  coreference: ['qurana'],
  prosodyWaqf: ['boundary-quran'],
  rhetoricOntology: ['ardt'],
  rhetoricExamples: ['balagha-corpus'],
  tafsirEvidence: ['tafsircenter'],
  historicalManuscripts: ['corpus-coranicum'],
}

function positiveInteger(value, name) {
  const number = Number(value)
  if (!Number.isInteger(number) || number < 1) throw new Error(`${name} must be a positive integer`)
  return number
}

export function canonicalAyahId(surah, ayah) {
  return `q:${positiveInteger(surah, 'surah')}:${positiveInteger(ayah, 'ayah')}`
}

export function canonicalWordId(surah, ayah, word) {
  return `${canonicalAyahId(surah, ayah)}:w${positiveInteger(word, 'word')}`
}

export function canonicalSegmentId(surah, ayah, word, segment) {
  return `${canonicalWordId(surah, ayah, word)}:s${positiveInteger(segment, 'segment')}`
}

export function parseAyahReference(reference) {
  const match = String(reference || '').match(/^(\d+):(\d+)$/)
  if (!match) throw new Error(`Invalid ayah reference: ${reference}`)
  return { surah: Number(match[1]), ayah: Number(match[2]) }
}

// Pilot bridge for an ayah whose orthographic word order has been manually
// cross-checked against QAC. Segment-level mappings are intentionally separate:
// we do not assume that another corpus shares the same segmentation.
export function buildPilotOrthographicWordMap(ayahRecord, { externalSystem = 'qac' } = {}) {
  if (!ayahRecord?.reference || !Array.isArray(ayahRecord.tokens)) throw new Error('Invalid ayah record')
  const { surah, ayah } = parseAyahReference(ayahRecord.reference)
  return ayahRecord.tokens.map((token, index) => {
    const word = index + 1
    return {
      id: canonicalWordId(surah, ayah, word),
      ayahId: canonicalAyahId(surah, ayah),
      surah,
      ayah,
      word,
      text: token.ar,
      orbitId: token.orbitId || null,
      external: externalSystem === 'qac' ? { qac: `${surah}:${ayah}:${word}` } : {},
    }
  })
}
