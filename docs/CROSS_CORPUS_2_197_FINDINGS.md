# 2:197 · QAC ↔ Tafsir Center comparison

Checked: 2026-09-22

## Result

Quran Universe now has two independently mapped row-level layers for all 29 orthographic positions in 2:197:

- Quranic Arabic Corpus coordinates: `2:197:N`
- Tafsir Center coordinates: `surahNo=2, ayahNo=197, wordNo=N`
- Quran Universe primary key: `q:2:197:wN`

After removing ordinary diacritics, Uthmani elongation marks, and the Tafsir Center slash separator, **27 of 29 word surfaces align directly**.

The two expected orthographic/segmentation differences are:

- `q:2:197:w28`: QAC/Ayah Space `يَـٰٓأُو۟لِي`; Tafsir Center `يا/أولي`. Tafsir Center explicitly exposes the vocative + noun boundary with a slash.
- `q:2:197:w29`: QAC/Ayah Space `ٱلْأَلْبَـٰبِ`; Tafsir Center `الألباب`. Tafsir Center's own rasm note says the word is written with deletion of the alif, while its searchable word field uses the normalized spelling.

This is exactly why Quran Universe must keep its own canonical word ID and source-specific surface fields instead of declaring one corpus's token string universal.

## High-value morphology cross-checks

### q:2:197:w26 · التقوى

Tafsir Center:
- root: `وقي`
- noun
- pattern: `فَعْلَى`

This independently agrees with the Quran Universe decision to keep `تَقْوَىٰ` on its own nominal pattern `فَعْلَى`, distinct from the Form VIII verb.

The Tafsir Center meaning/iʿrāb/ṣarf stays as source evidence. It does not replace Quran Universe's Quran-first semantic definition.

### q:2:197:w27 · واتقون

Tafsir Center:
- root: `وقي`
- imperative
- Form VIII: `افْتَعَلَ`
- source form recorded as `اوْتَقِي`
- explicitly records `و → ت` ibdāl followed by idghām

This supports the project explanation that the first root `و` is replaced by `ت`, then merges with the Form VIII `ت` to produce `تّ`.

### q:2:197:w29 · الألباب

Tafsir Center:
- root: `لبب`
- broken plural
- singular: `لُبّ`
- pattern: `أَفْعَال`

This agrees with the current Quran Universe morphology profile for `أَلْبَاب`.

## CI invariant

The content guard now cross-checks:
- all 29 Tafsir Center IDs against current Ayah Space/QAC word order;
- the QAC text stored in the pilot against the actual current 2:197 tokens;
- expected surface differences remain only w28 and w29;
- the key morphology evidence for taqwā, ittaqūni and albāb remains intact.
