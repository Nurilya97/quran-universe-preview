# Quran Universe — editorial and UI rules

## Single source of truth

- This repository is the only active Quran Universe source of truth.
- Do not require Notion, `Nurilya97/research-by-heart-viz`, or any second control plane for implementation, validation, research status, or deployment.
- If a fact is necessary for the product or its guards, store it here.
- Legacy systems may be consulted only for a specific missing historical fact, never as current authority.
- Do not recreate mirrored semantic runtimes or duplicate registries in another service/repository.

## Project skills

Before substantial Quran Universe implementation work:

1. Load and follow `.github/skills/quran-universe/SKILL.md`. This is the project-specific authority.
2. For data/corpus work also read `docs/DATA_ARCHITECTURE.md`.
3. For coding changes apply `.github/skills/ponytail/SKILL.md` after understanding the real flow. It may simplify implementation but may never simplify away canonical data, provenance, validation, accessibility, or approved UI.
4. For repo-wide architecture, dependency/data-flow tracing, shared-owner discovery, and broad refactors use `.github/skills/graphify/SKILL.md`. If `graphify-out/graph.json` exists, query it before re-reading the repository.
5. Use `ponytail-review` or `ponytail-audit` for cleanup only after correctness and Quran Universe invariants are established.
6. For UI bugs or visual changes load `.github/skills/webapp-testing/SKILL.md`; visual work needs browser evidence when a runnable test path exists.
7. For any bug or unexpected behavior load `.github/skills/systematic-debugging/SKILL.md` before proposing a fix.
8. Before saying work is done/live/fixed load `.github/skills/verification-before-completion/SKILL.md`.
9. Before adding any external skill/package load `.github/skills/skill-security-auditor/SKILL.md`.
10. For interactive Quran UI changes also apply `.github/skills/quran-universe-accessibility/SKILL.md`.
11. For architecture, workflow, synchronization, automation, cleanup, or system-health changes load `.github/skills/quran-universe-system-maintenance/SKILL.md`.
12. For external dataset/licence/source-status refreshes load `.github/skills/quran-universe-source-refresh/SKILL.md`.
13. For dependency, workflow, external dataset, HTML injection, secret, deployment, or critical-data integrity changes load `.github/skills/quran-universe-security/SKILL.md` and apply its gates.
14. After canonical registry changes run `npm run sync`; before completion run `npm run check`. The check includes generated-doc sync, maintenance-script syntax, system audit, security/tamper guards and Quran content guards.

Authority order: latest explicit user instruction → AGENTS.md / Quran Universe skill → approved canonical UI/data → supporting skills such as Graphify, Ponytail, testing/debugging, accessibility, and skill-security review.

These rules are the default source of truth for future Quran Universe changes.

## 1. Writing hierarchy

For every word panel, write information in this order:

1. **Значение** — only the direct lexical meaning or meanings.
2. **Связь с корнем** — one concise explanation of how the meaning connects to the root.
3. **Что добавляет ...** — only when a visible added element such as مُـ or مَـ materially changes the meaning.
4. Morphological form mechanics belong in **Структура слова**, not in **Значение**.

Do not repeat the same idea in several sections.

## 2. Headings

Headings must be short, factual noun phrases. Prefer 1–4 words.

Preferred:
- Значение
- Связь с корнем
- Структура слова
- Смысл корня
- Изменение
- Результат
- Что добавляет مُـ
- Что добавляет مَـ

Avoid:
- Почему это значение связано с корнем
- Как слово складывается шаг за шагом
- Рабочее объяснение по источникам
- Что нам даёт форма
- Long rhetorical or conversational headings

## 3. Russian explanatory style

Write naturally and directly.

- State the fact first.
- Use short sentences.
- Avoid meta-language such as «рабочая модель», «удобно читать как», «мы показываем», «пока считаем», unless uncertainty is genuinely necessary.
- Avoid defensive phrases and excessive qualifications.
- Do not describe the interface inside the linguistic explanation.
- Avoid saying the same thing with different wording in adjacent blocks.
- Prefer concrete wording over abstract phrases such as «корневой механизм осуществляется».
- If a term needs explanation, explain the term itself rather than adding another vague layer.

Example:
Bad: «Во II форме корневой механизм осуществляется на объекте».
Better: «Во II форме действие направлено на объект».

## 4. Script separation

Arabic, Latin transliteration and Cyrillic must not visually merge.

- Arabic spans: lang="ar", dir="rtl", Arabic font.
- Transliteration: lang="ar-Latn", dir="ltr".
- Russian prose stays Cyrillic.
- Do not insert Latin transliteration into Russian prose when the Arabic word is already visible unless transliteration is necessary for pronunciation.
- Prefer «буква م» or the exact form مُـ / مَـ over Latin “mīm” in Russian UI text.

## 5. Semantic logic

### Quran-first authority

Quran Universe is Quran-first by design.

- When the Quran itself describes a word, state, quality, or the people characterised by it, that Quranic description is primary evidence and belongs in the explanation.
- Do not demote a Quranic description merely because it is broader than a compact dictionary gloss.
- Root analysis, morphology, classical lexicons, translations, and tafsir are supporting layers; they must not override a meaning clearly unfolded by Quranic usage.
- Preserve the distinction between the lexical/root mechanism and the Quran's own fuller description, but show both when the Quran supplies that description.
- For تَقْوَىٰ morphology, keep the noun pattern فَعْلَى distinct from the Form VIII verb ٱتَّقَىٰ. For a transparent teaching sequence, show وَقْيَا → تَقْيَا → تَقْوَىٰ: initial root و corresponds to ت, then final root ي corresponds to و in the noun pattern. Label these as reconstructed morphological stages, not separate lexical words, and note that classical sources may order the intermediate derivation differently while preserving the same two correspondences.
- In the colour analysis of تَقْوَىٰ, mark ت and the و after ق as changed root letters, ق as an unchanged root letter, and final ىٰ as the element of the فَعْلَى pattern. Do not label ت as a semantic prefix or treat قْوَى as an undifferentiated root block.

For Quran Universe explanations, use this order:

**root meaning → contribution of added letters/elements → complete word meaning**

Do not reverse the causality by implying that the abstract pattern creates meaning independently of its letters.

Working mnemonic used in this project:
- مُـ: bearer / possessor of the root meaning.
- مَـ: locus / place where the root meaning manifests.

The full pattern refines this contribution; it does not erase the contribution of the added element.

## 6. Connector rules

Connector styling is diagram-specific. Never copy one line treatment across every Quran Universe diagram.

**Word Orbit → Структура слова → visual morphology**
- 1 px straight connectors;
- directional arrowhead;
- desktop horizontal;
- mobile vertical with a small upper dot and attached lower arrowhead.
- Canonical owner: `.morph-board` in `WordDetails.jsx/css`; protected by the approved UI browser contract.

**Ayah Space → taqwā morphology**
- 1 px connector tree;
- no arrowheads / SVG markers;
- clean orthogonal geometry.
- Canonical owner: `TaqwaMorphologyLegacy` + scoped `.approved-taqwa-baseline`.
- The earlier 3 px instruction was later reduced to 2 px and then 1 px; “no arrows” remained.

**Ayah Space syntax**
- uses its own restrained directional relation arcs and clickable grammar terms;
- never inherit morphology connector settings.

**Root Space**
- orbit rings are family guides;
- ل ب ب notation/legend is partly approved, but semantic relationship lines are not yet a finished canonical template.

`AyahView.css` contains historical connector experiments. Do not treat old “v4/v5” comments as authority. Check the rendered approved state, active component, winning scoped CSS and browser contract.

If the user says “как в taqwā” or names another approved screen, first identify which taqwā context they mean: Word Orbit structure and Ayah Space morphology do **not** use the same connector rule.

The latest explicit user correction overrides older project notes. Remove stale conflicting rules instead of preserving both.

## 6A. Root research authority

For root meanings and semantic families, follow the **Root Research Protocol** in `.github/skills/quran-universe/SKILL.md`.

In particular:
- triangulate multiple lexical/Quran sources;
- test the proposed root nucleus against the full derivational family;
- explain real semantic bridges and separate genuine branches;
- distinguish dictionary fact, synthesis, and hypothesis;
- compare near-synonymous roots when it clarifies the semantic centre;
- do not force unrelated derivatives into one elegant story;
- present one coherent Quran Universe synthesis with source provenance kept separately.

For **ل ب ب**, preserve the established working model only as an evidence-tested synthesis and re-run the root through the finalized master template rather than patching the older Root Space.

## 7. Root orbit notation

Root-space legends are required whenever orbital rings are shown.

- A ring represents one derivational / word-formation family.
- The Roman numeral labels the verb form around which that family is grouped; it does not assign that verb pattern to every noun on the ring.
- Quran-attested words use the approved green highlight.
- If an inner dashed ring is used only to create extra room inside a crowded family, label it explicitly as an additional zone of the same family, not a separate form.
- Keep the legend available for every root space, not only ل ب ب.
- Keep root-space notation unboxed: the legend must not sit inside a surrounding card, frame, or opaque panel.
- Roman form labels beside the orbital rings are free-standing text placed just to the left of the ring, never chip-like badges with a background or border.

## 8. Change discipline

Do not redesign approved screens unless explicitly requested.

Before adding a new explanatory block, ask:
- Is this new information?
- Is it already stated above?
- Does it belong in Meaning, Structure, Syntax, or another panel?

If it repeats existing information, do not add it.
