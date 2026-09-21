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
- No arrowheads unless the user explicitly asks for them.
- No bent “AI-looking” branches.
- No decorative elbow stubs.
- Use exactly one connector between consecutive morphology steps.
- The approved connector is: small start dot → 1 px line → arrow pointing to the next derived word.
- On mobile, use a timeline rail in its own left column. The dot aligns with the source word, the 1 px line spans the full source step (including its explanation), and the arrow ends immediately before the next step.
- The connector must never float as an isolated line between a paragraph and the next word.
- Reuse the same restrained arrow treatment as the approved taqwā evolution; no filled triangle arrowheads.
- On desktop, the same visual language may run horizontally when the steps are horizontal.
- Explanatory callouts are text-only: do not add side borders or branch lines to them.
- If the user says “как в taqwā” or names another approved screen, inspect that existing implementation first and reuse its spacing, alignment, line weight, and interaction pattern. Do not invent a new visual language.
- The latest explicit user correction overrides older project notes. Before changing a repeated element, check the latest accepted rule in this file and the approved reference implementation.
- Use the same connector language across roots, including taqwā and ل ب ب.

## 7. Change discipline

Do not redesign approved screens unless explicitly requested.

Before adding a new explanatory block, ask:
- Is this new information?
- Is it already stated above?
- Does it belong in Meaning, Structure, Syntax, or another panel?

If it repeats existing information, do not add it.
