# Cross-corpus pilot · 2:197

Checked: 2026-09-22

## Goal

Establish Quran Universe's own stable word coordinates and then map external corpora onto them without assuming identical tokenisation or segmentation.

Canonical ayah ID:

`q:2:197`

Current orthographic word range:

`q:2:197:w1` … `q:2:197:w29`

## Current result

### Quranic Arabic Corpus

Status: **row-mapped**

The current Ayah Space has 29 orthographic words. Each is mapped to a QAC locator:

`q:2:197:wN ↔ 2:197:N`

The three words already connected to Root/Word Space also cross-check against the occurrence database:

- `q:2:197:w26` → `taqwa`
- `q:2:197:w27` → `ittaqa`
- `q:2:197:w29` → `albab`

This mapping is automatically validated before deployment.

Primary public reference:
https://corpus.quran.com/wordbyword.jsp?chapter=2&verse=197

### Tafsir Center quran.db

Status: **schema verified; row import pending**

The official Tafsir Center tooling exposes a word key of:

`surahNo + ayahNo + wordNo`

Verified word-level tables include:

- `word_content_rasm.word`
- `word_content_meaning.meaning`
- `word_content_irab.irabMushakkal`
- `word_content_sarf.sarf`
- `word_statistics.root`

The public dataset card reports 77,432 word rows and CC BY 4.0 licensing.

References:
https://huggingface.co/datasets/tafsircenter/tafsir-mcp-data
https://github.com/tafsircenter/tafsir-mcp

Next action: materialize/query the official database and compare all 29 2:197 word rows against Quran Universe IDs.

### QuranMorph

Status: **metadata verified; official access pending**

The official SinaLab resource describes QuranMorph as word-level morphology tagging with each word linked to a Qabas lemma and assigned a POS tag. The publication reports 77,429 tokens and manual annotation by three expert linguists.

The current official download form requires affiliation with a recognized company, university, or institution and an official professional email.

Therefore Quran Universe does not promote an unofficial mirror into the canonical ingestion layer.

References:
https://sina.birzeit.edu/quran/
https://arxiv.org/abs/2506.18148

Next action: ingest after authorized official access, then map by ayah + orthographic word while explicitly checking boundary differences.

### QAMAR

Status: **metadata verified; row import pending**

The 2026 QAMAR paper describes a manually verified Quranic morphological resource with, for every Quranic word:

- MSA equivalent
- stem
- lemma
- root
- POS

ACL Anthology exposes optional supplementary material, but row-level 2:197 data is not yet stored in Quran Universe.

Reference:
https://aclanthology.org/2026.abjadnlp-1.38/

Next action: ingest the official supplementary resource, inspect its identifiers/tokenisation, then map it onto Quran Universe IDs.

## Important conclusion

The pilot must remain asymmetric until every dataset is actually inspected.

It is valid to have:

- QAC = mapped
- Tafsir Center = schema ready
- QuranMorph = access pending
- QAMAR = import pending

It is **not** valid to copy QAC's word numbering into the other corpora and call that a mapping.

## Deployment protection

`npm run test:content` now blocks deployment if:

- the 2:197 canonical word count drifts from 29;
- root-space token links stop matching occurrence coordinates;
- source adapter states silently change;
- an undefined word source appears;
- the approved taqwā morphology/meaning regresses.
