# Quran Universe — Spatial Preview

Public visual preview of the Quran Universe spatial interface.

This repository contains the standalone public demo for the root `و ق ي`,
11 selected forms, and the current Ayah Space prototype for Qur'an 2:197.
It does not include the private research archive, methodology documents,
source audits, or internal project notes.

Each displayed form has a short RU/EN lexical guide, transliteration,
morphology explanation and public source links. These are working
explanations, not a claim that the root's full derivational tree is complete.

## Current interface

### Root and word space

The root galaxy leads into individual word orbits. The **Word Structure**
panel now has two internal views:

- **Analysis / Разбор** — the primary colour-coded morphology view using the
  approved neon morphology palette.
- **Diagram / Схема** — the secondary visual board that presents the same
  morphology as a step-by-step structural map.

### Ayah Space — 2:197

The current Ayah Space prototype has two top-level modes:

- **Analysis / Разбор** — the ayah remains the central object. A word can be
  opened into Meaning, Morphology and Syntax. Syntax currently covers the
  verified phrase `فَإِنَّ خَيْرَ ٱلزَّادِ ٱلتَّقْوَىٰ` and grammar terms open
  inline explanations without repeating a large example word.
- **Composition / Композиция** — a freely pannable and zoomable map of the
  ayah with three internal layers that preserve the same spatial context:
  **Themes / Темы**, **Rhetoric / Риторика**, and **Sound / Звучание**.
  Rhetoric exposes structural language moves such as repetition, transition,
  semantic bridging and direct address. Sound currently maps only directly
  observable recurrences, keeping them separate from interpretive claims.
  Nodes are interactive and open a short explanation in place.
- The Sound layer is structured for later recitation playback and reciter
  selection, but no audio source is bound yet.

The contextual research panel separates evidence sources from external
research tools.

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
