// External dataset adapters for the first Quran Universe cross-corpus pilot.
// These records describe verified schemas/access conditions only.
// Row-level mappings are added only after the corresponding source data is actually inspected.

export const PILOT_SOURCE_ADAPTERS = {
  qac: {
    name: 'Quranic Arabic Corpus',
    authority: 'University of Leeds / Quranic Arabic Corpus',
    url: 'https://corpus.quran.com/',
    license: 'GNU GPL annotation terms; Tanzil text terms also apply',
    access: 'public_web_and_download',
    wordKey: ['surah', 'ayah', 'word'],
    externalIdExample: '2:197:26',
    layers: ['word_text', 'morphology', 'root', 'lemma', 'pos', 'syntax'],
    pilotStatus: 'row_mapped',
    checkedOn: '2026-09-22',
  },

  tafsircenter: {
    name: 'Tafsir Center Quranic Database',
    authority: 'Tafsir Center for Quranic Studies',
    url: 'https://huggingface.co/datasets/tafsircenter/tafsir-mcp-data',
    license: 'CC BY 4.0',
    access: 'public_dataset',
    wordKey: ['surahNo', 'ayahNo', 'wordNo'],
    tables: {
      text: 'word_content_rasm.word',
      meaning: 'word_content_meaning.meaning',
      irab: 'word_content_irab.irabMushakkal',
      sarf: 'word_content_sarf.sarf',
      root: 'word_statistics.root',
    },
    layers: ['word_text', 'meaning', 'irab', 'sarf', 'root', 'qiraat', 'tafsir'],
    pilotStatus: 'row_mapped',
    checkedOn: '2026-09-22',
  },

  quranmorph: {
    name: 'QuranMorph',
    authority: 'SinaLab · Birzeit University',
    url: 'https://sina.birzeit.edu/quran/',
    license: 'reported as CC BY 4.0 in the publication/resource description',
    access: 'official_download_form_requires_company_or_institution_affiliation',
    wordKey: null,
    layers: ['lemma', 'pos', 'qabas_link'],
    pilotStatus: 'metadata_verified_access_pending',
    checkedOn: '2026-09-22',
    note: 'Do not ingest an unofficial mirror as canonical source data while official access has not been granted.',
  },

  qamar: {
    name: 'QAMAR',
    authority: 'Faqihi, Bouzoubaa, Tajmout, Namly · AbjadNLP 2026',
    url: 'https://aclanthology.org/2026.abjadnlp-1.38/',
    license: 'ACL Anthology 2026 material · CC BY 4.0',
    access: 'paper_public_corpus_release_not_found',
    wordKey: null,
    layers: ['msa_equivalent', 'stem', 'lemma', 'root', 'pos'],
    pilotStatus: 'publication_verified_release_pending',
    checkedOn: '2026-09-22',
    note: 'ACL optional supplementary material currently contains the paper source and figures, not the QAMAR corpus. The paper states that the corpus will be released as an open-source resource after peer review; a row-level public corpus release was not present in the ACL attachment checked on 2026-09-22.',
  },
}

export const PILOT_2_197_DATASET_STATUS = {
  canonicalAyahId: 'q:2:197',
  qac: {
    status: 'mapped',
    mappedOrthographicWords: 29,
    note: 'All 29 current Ayah Space orthographic words have Quran Universe IDs and QAC 2:197:N locators.',
  },
  tafsircenter: {
    status: 'mapped',
    mappedOrthographicWords: 29,
    note: 'Official quran.db was imported read-only on 2026-09-22. All 29 Tafsir Center orthographic word rows for 2:197 are mapped to Quran Universe IDs; source evidence remains separate from canonical Quran-first meaning.',
  },
  quranmorph: {
    status: 'access_pending',
    mappedOrthographicWords: 0,
    note: 'Official current download form requires organization affiliation; no unofficial mirror is promoted to canonical data.',
  },
  qamar: {
    status: 'release_pending',
    mappedOrthographicWords: 0,
    note: 'The publication is verified, but the ACL optional supplementary archive contains paper source/figures rather than corpus rows. No row-level QAMAR mapping is claimed until the official corpus release is located.',
  },
}
