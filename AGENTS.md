# Quran Universe — editorial and UI rules

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

## 6. Morphology connectors

Connectors must look deliberate and geometric.

- Straight lines only.
- 1 px thickness unless the user explicitly asks for another weight.
- No bent “AI-looking” branches.
- No decorative elbow stubs.
- Use exactly one connector between consecutive morphology steps.
- The approved mobile connector is: small dot at the upper heading → continuous 1 px vertical line → attached arrowhead at the lower heading.
- On mobile, use one 1 px vertical timeline rail on the left of the text.
- All step content sits to the right of this rail.
- Anchor the rail to the numbered step headings: the segment starts at the vertical center of “01 …” and ends at the vertical center of “02 …”; the next segment runs from “02 …” to “03 …”, and so on.
- Put a small dot exactly at the upper endpoint beside the current numbered heading.
- Put the arrowhead exactly at the lower endpoint beside the next numbered heading.
- The arrowhead is physically attached to the 1 px line at its endpoint. Never render the arrow as a separate glyph, in the middle of the line, or with a visible gap.
- The connector must never float between a paragraph and the next word, and must never start from the body copy.
- Reuse the same restrained arrow treatment as the approved taqwā evolution; no filled triangle arrowheads.
- On desktop, the same visual language may run horizontally when the steps are horizontal.
- Explanatory callouts are text-only: do not add side borders or branch lines to them.
- If the user says “как в taqwā” or names another approved screen, inspect that existing implementation first and reuse its spacing, alignment, line weight, and interaction pattern. Do not invent a new visual language.
- The latest explicit user correction overrides older project notes. Before changing a repeated element, check the latest accepted rule in this file and the approved reference implementation.
- Use the same connector language across roots, including taqwā and ل ب ب.

## 7. Root orbit notation

Root-space legends are required whenever orbital rings are shown.

- A ring represents one derivational / word-formation family.
- The Roman numeral labels the verb form around which that family is grouped; it does not assign that verb pattern to every noun on the ring.
- Quran-attested words use the approved green highlight.
- If an inner dashed ring is used only to create extra room inside a crowded family, label it explicitly as an additional zone of the same family, not a separate form.
- Keep the legend available for every root space, not only ل ب ب.

## 8. Change discipline

Do not redesign approved screens unless explicitly requested.

Before adding a new explanatory block, ask:
- Is this new information?
- Is it already stated above?
- Does it belong in Meaning, Structure, Syntax, or another panel?

If it repeats existing information, do not add it.
