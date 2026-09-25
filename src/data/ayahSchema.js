import { canonicalAyahId, canonicalWordId, parseAyahReference } from './quranUniverseData.js'

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

function bilingualLabel(value, label) {
  assert(value && typeof value === 'object', `${label} must be an object`)
  assert(typeof value.ru === 'string' && value.ru.trim(), `${label}.ru is required`)
  assert(typeof value.en === 'string' && value.en.trim(), `${label}.en is required`)
}

function localizedCopy(value, label, requiredFields) {
  assert(value && typeof value === 'object', `${label} must be an object`)
  for (const field of requiredFields) {
    assert(typeof value[field] === 'string' && value[field].trim(), `${label}.${field} is required`)
  }
}

function validRange(range, tokenCount, label) {
  assert(Array.isArray(range) && range.length === 2, `${label}.range must be [start, end]`)
  const [start, end] = range
  assert(Number.isInteger(start) && Number.isInteger(end), `${label}.range must use integers`)
  assert(start >= 1 && end >= start && end <= tokenCount, `${label}.range is outside the ayah token range`)
}

export function validateAyahRecord(record) {
  assert(record && typeof record === 'object', 'ayah record must be an object')
  const { surah, ayah } = parseAyahReference(record.reference)
  assert(surah >= 1 && surah <= 114, `invalid surah in ${record.reference}`)
  assert(ayah >= 1, `invalid ayah in ${record.reference}`)
  bilingualLabel(record.surah, `${record.reference}.surah`)

  assert(Array.isArray(record.tokens) && record.tokens.length > 0, `${record.reference}.tokens must be non-empty`)
  record.tokens.forEach((token, index) => {
    const label = `${record.reference}.tokens[${index}]`
    assert(token && typeof token === 'object', `${label} must be an object`)
    assert(typeof token.ar === 'string' && token.ar.trim(), `${label}.ar is required`)
    assert(typeof token.tr === 'string', `${label}.tr must be a string`)
    if (token.analysis) {
      if (token.analysis.ru) assert(typeof token.analysis.ru === 'object', `${label}.analysis.ru must be an object`)
      if (token.analysis.en) assert(typeof token.analysis.en === 'object', `${label}.analysis.en must be an object`)
    }
  })

  const tokenCount = record.tokens.length
  assert(Array.isArray(record.blocks) && record.blocks.length > 0, `${record.reference}.blocks must be non-empty`)
  let previousEnd = 0
  record.blocks.forEach((block, index) => {
    const label = `${record.reference}.blocks[${index}]`
    assert(block?.id, `${label}.id is required`)
    validRange(block.range, tokenCount, label)
    assert(block.range[0] > previousEnd, `${record.reference}.blocks must be ordered and non-overlapping`)
    previousEnd = block.range[1]
    localizedCopy(block.ru, `${label}.ru`, ['title', 'text'])
    localizedCopy(block.en, `${label}.en`, ['title', 'text'])
  })

  if (record.journey) {
    localizedCopy(record.journey.ru, `${record.reference}.journey.ru`, ['guide', 'guideNote'])
    localizedCopy(record.journey.en, `${record.reference}.journey.en`, ['guide', 'guideNote'])
    assert(Array.isArray(record.journey.segments) && record.journey.segments.length > 0,
      `${record.reference}.journey.segments must be non-empty`)

    let previousJourneyEnd = 0
    record.journey.segments.forEach((segment, index) => {
      const label = `${record.reference}.journey.segments[${index}]`
      assert(segment?.id, `${label}.id is required`)
      validRange(segment.range, tokenCount, label)
      assert(segment.range[0] > previousJourneyEnd,
        `${record.reference}.journey.segments must be ordered and non-overlapping`)
      previousJourneyEnd = segment.range[1]
      localizedCopy(segment.ru, `${label}.ru`, ['meaning', 'note'])
      localizedCopy(segment.en, `${label}.en`, ['meaning', 'note'])
    })
  }

    for (const [index, item] of (record.rhetoric || []).entries()) {
    const label = `${record.reference}.rhetoric[${index}]`
    assert(item?.id, `${label}.id is required`)
    validRange(item.range, tokenCount, label)
    localizedCopy(item.ru, `${label}.ru`, ['step', 'title', 'evidence', 'mechanism', 'effect'])
    localizedCopy(item.en, `${label}.en`, ['step', 'title', 'evidence', 'mechanism', 'effect'])
    for (const wordIndex of item.focusWords || []) {
      assert(Number.isInteger(wordIndex) && wordIndex >= item.range[0] && wordIndex <= item.range[1],
        `${label}.focusWords contains an index outside its range`)
    }
  }

  return true
}

export function prepareAyahRecord(record) {
  validateAyahRecord(record)
  const { surah, ayah } = parseAyahReference(record.reference)
  return {
    ...record,
    canonicalId: canonicalAyahId(surah, ayah),
    tokens: record.tokens.map((token, index) => ({
      ...token,
      canonicalId: canonicalWordId(surah, ayah, index + 1),
      ayahReference: record.reference,
      wordIndex: index + 1,
    })),
  }
}

export function qacTreebankUrl(reference) {
  const { surah, ayah } = parseAyahReference(reference)
  return `https://corpus.quran.com/treebank.jsp?chapter=${surah}&verse=${ayah}`
}
