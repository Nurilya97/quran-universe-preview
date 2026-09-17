# Quran Universe — Spatial Preview

Public visual preview of the Quran Universe spatial interface.

This repository contains only the standalone demo interface for the root `و ق ي`
and 11 selected forms. It does not include the private research archive,
methodology documents, source audits, or internal project notes.

Each displayed form has a short RU/EN lexical guide, morphology explanation,
transliteration and public source links. These are working explanations, not
verse translations or a claim that the root's full derivational tree is complete.

The Quran panel lists 258 word coordinates across the eight groups in the
[Quranic Arabic Corpus](https://corpus.quran.com/qurandictionary.jsp?q=wqy).
Only reference coordinates are included; no verse translations are copied.
The source's grouping of `3:102:7` under `taqiyy` is explicitly explained in the UI.
Three additional dictionary forms are labelled separately. Arabic typography is
self-hosted Noto Sans Arabic via Fontsource.

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
