# Quran Universe — Spatial Preview

Public visual preview of the Quran Universe spatial interface.

This repository contains the standalone public demo for the root `و ق ي`,
11 selected forms, and the current Ayah Space prototype for Qur'an 2:197.
It does not include the private research archive, full methodology documents,
source audits, or internal project notes.

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

### Ayah Space — 2:197

The current Ayah Space prototype has three top-level modes:

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

The public preview implements conclusions from the private Research By Heart /
Quran Universe research layer. External corpora, tafsir and translations can
support verification, but they do not silently override the project's approved
semantic model.

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
