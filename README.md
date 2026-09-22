# Quran Universe

This repository is the **single active Quran Universe system**: product UI, canonical data, research-control records, provenance/licensing registry, validation, tests and deployment live here together.

The former Notion control plane and `Nurilya97/research-by-heart-viz` repository are no longer operational dependencies. See [docs/SYSTEM.md](./docs/SYSTEM.md).

Each displayed form has a short RU/EN lexical guide, transliteration,
morphology explanation and public source links. These are working
explanations, not a claim that the root's full derivational tree is complete.

## Current interface

### Root and word space

The root galaxy leads into individual word orbits. The **Word Structure**
panel has two internal views:

- **Analysis / Разбор** — the primary colour-coded morphology view using the
  approved neon morphology palette.
- **Diagram / Схема** — the secondary visual board that presents the same
  morphology as a step-by-step structural map.

### Ayah Space

Focused-word analysis now keeps the three word-level views connected rather than treating them as isolated cards:

- **Morphology** shows a directional derivation chain with arrows (root → documented derived forms → the surface form used in the ayah), followed by the visible parts of that surface form.
- **Syntax** opens only the verified phrase relevant to the selected word. The current prototype covers both `فَإِنَّ خَيْرَ ٱلزَّادِ ٱلتَّقْوَىٰ` (2:197:23–26) and the closing `وَٱتَّقُونِ يَـٰٓأُو۟لِي ٱلْأَلْبَـٰبِ` (2:197:27–29). Relation arrows and clickable grammatical terms connect the explanation back to the exact words.

Ayah Space uses three top-level modes:

- **Analysis / Разбор** — the ayah remains the central object. A word can be
  opened into Meaning, Morphology and Syntax.
- **Composition / Композиция** — shows the ayah as one continuous movement of
  thought. It explains the semantic blocks and how each block leads into the
  next without turning the reading into a list of rhetorical terms.
- **Rhetoric / Риторика** — deepens the claims already visible in Composition.
  It explains which Arabic mechanisms create those relations: particles,
  condition/result structures, coordination, root repetition, lexical choice,
  direct address and other verified devices. The reader-facing explanation
  leads with meaning; technical labels and sources remain secondary.

Arabic phrases in Rhetoric include a separate transliteration line. Each
rhetorical block uses one short title with its step number rather than a
duplicate label/title pair.

Sound is **not** a separate top-level Ayah Space mode. It is used only when an
observable sound feature helps explain a larger semantic passage. Current sound
analysis is limited to verified ending correspondences and explicitly states
the ayah range / semantic block before describing the repeated ending.

The contextual research panel separates evidence sources from external
research tools.

## Research discipline

Research and runtime now share one repository without becoming the same layer. Reviewed research state is stored under `src/data/research/`; reader-facing data, morphology, corpus mappings and UI remain separately structured and are protected by `npm run test:content`.

External corpora, tafsir and translations support verification, but they do not silently override Quran-first project decisions.

Root research follows the project method in
[`ROOT_SEMANTIC_METHOD.md`](./ROOT_SEMANTIC_METHOD.md): reconstruct the
fundamental semantic mechanism that explains the derivatives, distinguish
attested facts from systemically supported connections and historical
etymology, compare apparent synonyms, and test the proposed model against the
Quranic corpus rather than presenting dictionary glosses as a disconnected
list.

For `و ق ي / تَقْوَىٰ`, the preview follows the current project model and
does not reduce the concept to fear-centred wording. Reader-facing rhetoric
must distinguish direct textual observation, grammatical mechanism and
interpretive synthesis.

## Corpus scope

The Quran panel lists 258 word coordinates across the eight groups in the
[Quranic Arabic Corpus](https://corpus.quran.com/qurandictionary.jsp?q=wqy).
Only reference coordinates are included; no verse translations are copied.
The source's grouping of `3:102:7` under `taqiyy` is explicitly explained in
the UI. Three additional dictionary forms are labelled separately.

Arabic typography is self-hosted Noto Sans Arabic via Fontsource.

## Local preview

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

GitHub Pages is deployed automatically from `main`.
