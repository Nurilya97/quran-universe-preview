# Quran Universe data architecture

## Principle

Quran Universe must not use the positional word ID of any single external corpus as its primary key.

Different Quran datasets can use different tokenisation and segmentation rules. Quran Universe therefore owns a stable canonical coordinate system and stores mappings from each external source onto it.

## Canonical identifiers

- Ayah: `q:<surah>:<ayah>`
- Orthographic word: `q:<surah>:<ayah>:w<word>`
- Segment: `q:<surah>:<ayah>:w<word>:s<segment>`

Example:

- `q:2:197`
- `q:2:197:w26`
- `q:2:197:w26:s1`

An orthographic word and a morphological segment are deliberately different entities.

## Mapping rule

External datasets attach to Quran Universe coordinates:

`QuranUniverseWord ↔ QAC ↔ QuranMorph ↔ QAMAR ↔ TafsirCenter ↔ QUL`

A mapping may be null until verified. Never manufacture an external identifier merely to fill a field.

## Layer authority

The current target stack is encoded in `src/data/quranUniverseData.js`.

Core direction:

- canonical Quran text: Tanzil, cross-checked where required;
- Quran Universe-owned word/segment mapping;
- lemma/POS: QuranMorph + QAMAR + QAC comparison;
- root: QAMAR + QAC + Tafsir Center;
- ṣarf/iʿrāb: Tafsir Center + QAC;
- syntax: QAC;
- lexical universe: Qabas + Lane;
- concept universe: Arabic Ontology;
- tafsir evidence: Tafsir Center;
- rhetoric, coreference, prosody and semantic-link layers remain separate datasets;
- Corpus Coranicum stays in a clearly separated historical/research layer.

## Pilot

The first verified bridge is ayah 2:197 because the current Ayah Space already contains a word-by-word representation cross-checked against QAC.

The pilot establishes orthographic-word IDs only. It does **not** assert that QAC, QuranMorph, QAMAR, Tafsir Center or QUL have identical segment boundaries.

## Data status

Each fact should eventually carry:

- canonical entity ID;
- source system;
- source locator / external ID;
- evidence type;
- verification status;
- last checked date;
- optional reviewer status.

Research candidates must remain distinguishable from human-verified and scholar-verified claims.

## Deployment invariant

`npm run test:content` is the gatekeeper. A deployment must fail when canonical IDs, corpus counts, source references, morphology profiles or approved semantic invariants drift out of sync.
