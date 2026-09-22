---
name: quran-universe
description: Master specification for Quran Universe. Use for every substantial content, research, root, morphology, syntax, Ayah Space, Root Space/Root Galaxy, canonical-data, UI, interaction, source-integration, or deployment task. Enforces the approved Quran-first content method and the approved spatial/cosmic design language so new work reuses the canonical template instead of improvising.
---

# Quran Universe — master skill

This is the primary project skill.

Its job is not merely to keep code consistent. It must preserve the user's approved linguistic method, Quran-first semantic logic, spatial interaction model, visual language, and change discipline.

## 0. Authority and non-negotiables

Authority order:

1. latest explicit user instruction;
2. this skill + `AGENTS.md`;
3. approved canonical UI/data already in the repository;
4. supporting project skills;
5. external references and corpora.

When rules conflict, the newest explicit approved rule wins. Remove or update stale repository instructions instead of layering another contradictory override.

Never:
- silently reinterpret an approved Quran meaning;
- silently replace an approved translation;
- redesign an approved screen because a new alternative looks cleaner;
- copy an old Root Space/Ayah Space bug into a new root;
- duplicate one explanation across Meaning, Structure, Syntax, Context, or Rhetoric;
- infer linguistic relations that the data does not support;
- call a build visually correct without browser evidence when a runnable path exists;
- say done/live/deployed without fresh verification.

The repository is the only active source of truth. Do not recreate a mandatory Notion control plane or mirrored semantic runtime.

---

# 1. Required preflight before editing

Before substantial work:

1. Read `AGENTS.md`.
2. Read this skill completely.
3. For Quran/corpus/data work read `docs/DATA_ARCHITECTURE.md`.
4. Identify the owner of the requested fact or UI:
   - canonical research data;
   - derived presentation data;
   - component;
   - CSS/layout;
   - workflow/deployment.
5. Inspect the currently approved implementation before changing any repeated UI pattern.
6. Search for stale duplicate rules before adding a new one.
7. If the user names an approved reference such as taqwā, reproduce that implementation and its logic; do not create a merely similar alternative.

For UI bugs or visual changes also load the project webapp-testing skill.
For unexpected behavior use systematic-debugging.
For external datasets use source-refresh and security.
Before completion use verification-before-completion.

---

# 2. Content Engine

## 2.1 Quran-first semantic authority

Quran Universe is Quran-first.

Use this evidence order:

1. the word and construction in the target ayah;
2. Quran-wide usage of the same word/root/form;
3. morphology and syntax;
4. classical lexicons;
5. translations;
6. tafsir/contextual commentary;
7. external corpora/datasets as supporting evidence.

The Quran's own description of a quality, state, action, or group is primary evidence. A compact dictionary gloss must not erase a fuller meaning that Quranic usage itself unfolds.

At the same time, do not commit the etymological fallacy: a root meaning is not automatically the full meaning of every derived word.

Always preserve the distinction between:
- root mechanism;
- lexical meaning of the actual word;
- contribution of visible morphological elements;
- contextual meaning in the ayah;
- Quranic description/effect;
- natural translation.

## 2.2 Preferred lexical/research workflow

For Arabic lexical work, cross-check rather than relying on a single glossary.

Preferred lexical sources:
- Arabist / Arabous;
- Almaany;
- Lane's Arabic-English Lexicon;
- Lisān al-ʿArab when deeper classical evidence is needed.

Preferred Quran tools:
- Quran.com;
- Quran Hive;
- Al-Quran / Greentech resources already approved by the project;
- the repository's own canonical occurrences and mappings.

Translation comparison may include:
- Russian: Кулиев, Абу Адель;
- English: Clear Quran, M. A. S. Abdel Haleem, Sahih International;
- other translations only as comparative evidence, never as automatic authority.

Tafsir is a contextual evidence layer. It does not silently replace the Quran-first lexical model.

Record provenance in canonical/research data where the architecture supports it.

## 2.3 Translation-selection method

Never choose a Russian equivalent from the root alone.

Use this order:

**root → lexical field → actual morphological form → syntax → local construction → surrounding ayah → Quran-wide usage → translation comparison → natural Russian equivalent**

Ask:
- What can this word mean lexically?
- Which part of that field is activated by this form?
- What does the syntax require?
- What does the immediate construction add?
- How does the Quran itself use or describe this word elsewhere?
- Which Russian equivalent communicates this context naturally?
- What does that Russian word itself mean to a Russian reader?
- What important Arabic nuance remains to be explained below the translation?

A translation is not required to carry the entire Arabic semantic field inside one Russian word. The UI may give a natural translation first and explain the remaining semantic mechanism below.

## 2.4 Word-content separation

Do not merge different semantic jobs into one paragraph.

For a selected Quran word, separate these layers when relevant:

### Translation
The natural Russian equivalent chosen for this ayah.

### Meaning
The direct meaning of the selected Russian/Arabic lexical item. Do not turn this into a root essay.

### Root connection
One concise explanation of how the word relates to the root's fundamental semantic mechanism.

### Source of the state / contextual mechanism
Use only when it adds genuinely new information: what in the Arabic concept gives rise to the translated quality/state in this context.

### Meaning in this ayah
What the word is doing in the exact construction and passage.

### Word structure
Morphological construction, pattern, changed letters, affixes, reconstructed stages.

### Syntax
Its grammatical role and relations in the construction.

Do not repeat the same sentence under several headings.

## 2.5 Approved writing order

For ordinary word panels, default to:

1. **Значение**
2. **Связь с корнем**
3. **Что добавляет ...** only when a visible element materially contributes
4. **Структура слова**
5. **Синтаксис / Связь в аяте** when the word is in Ayah Space

When a contextual translation needs explanation, preserve the explanation of **why this translation is chosen**. Never delete it merely to shorten the panel.

Headings are short noun phrases, usually 1–4 words.

Preferred:
- Значение
- Связь с корнем
- Структура слова
- Синтаксис
- Связь в аяте
- Смысл корня
- Изменение
- Результат
- Источник состояния

Avoid vague headings and meta-commentary.

## 2.6 Russian explanatory style

Write naturally and directly.

- State the fact first.
- Prefer short, concrete sentences.
- Explain the linguistic fact, not the interface.
- Avoid defensive/meta phrasing such as «рабочая модель», «удобно читать как», «мы показываем», unless uncertainty is genuinely material.
- Avoid abstract filler such as «религиозное значение» when it does not explain anything.
- Do not use «не только..., но и...» as a default rhetorical crutch.
- Do not create contrast where the meanings can coexist.
- Distinguish explanation from translation.

For taqwā and related content, do not use standalone «осознанность» as though it were a complete Russian equivalent.
Do not default to «богобоязненность» for taqwā in Quran Universe.
Do not use awkward phrases such as «опасайтесь передо Мной» or «держит в сознании Его знание».

## 2.7 Canonical taqwā decision for 2:197

The current approved translation for **التَّقْوَىٰ** in 2:197 is:

**благочестие**

Do not replace it with «осознанность», «богобоязненность», or «праведность» in the canonical 2:197 translation unless the user explicitly reopens that decision.

Translation comparison may show that «праведность» or other equivalents are used by translators, but they are comparative evidence, not the selected canonical equivalent for this ayah.

Keep three different ideas separate:

### Translation
**التَّقْوَىٰ — благочестие**

### Meaning of the Russian equivalent
Use the ordinary meaning of «благочестие»: reverence toward the Almighty and life/behavior corresponding to that reverence. Do not redefine the Russian word by simply repeating the Arabic explanation.

### Source of this state in taqwā
Explain separately that this state grows from remembering Allah and His presence, awareness of the boundaries He has established, and therefore caution against crossing those boundaries and doing evil.

Conceptual flow:

**память об Аллахе / Его присутствии → осознание установленных Им границ → остережение от их нарушения и зла → благочестие в состоянии и поступках**

Do not turn «осознанность» into the translation itself. In this project it is one component in the explanation of how taqwā operates.

Do not create a duplicate large block such as «Как смысл проявляется», «Проявления taqwā», or another restatement if the same content is already present in Meaning/Context.

### Taqwā morphology

Keep the noun **تَقْوَىٰ** distinct from the Form VIII verb **ٱتَّقَىٰ**.

For the teaching sequence, the approved transparent reconstruction may show:

**وَقْيَا → تَقْيَا → تَقْوَىٰ**

Treat intermediate forms as reconstructed morphological stages, not lexical words.

In color analysis:
- ت corresponds to changed root و;
- ق is the unchanged root consonant;
- the و after ق corresponds to changed final root ي;
- final ىٰ belongs to the فَعْلَى noun pattern.

Do not label ت as a semantic prefix.

---

# 3. Morphology Engine

## 3.1 Semantic causality

Default explanatory order:

**root meaning → contribution of added letters/elements → complete word meaning**

Do not imply that an abstract pattern independently creates the meaning while the actual letters are incidental.

Working teaching mnemonics already approved in the project:
- **مُـ**: bearer / possessor of the root meaning;
- **مَـ**: locus / place where the root meaning manifests.

The complete pattern may refine the contribution.

## 3.2 Structure vs Meaning

Morphological mechanics belong in **Структура слова**, not in **Значение**.

Meaning should answer what the word means.
Structure should answer how the word is built.

Do not duplicate:
- pattern name;
- root-letter transformations;
- affix explanation;
- reconstructed steps
inside the Meaning panel unless a very short reference is necessary.

## 3.3 Morphology connectors — latest approved rule

The latest approved connector rule overrides older arrow/timeline experiments.

For morphology evolution diagrams:
- straight geometric connector lines;
- **3 px** thickness;
- **no arrowheads**;
- no bent AI-looking branches;
- no decorative elbow stubs;
- no floating connector fragments detached from the relevant steps;
- use one clear connector between consecutive stages;
- explanatory callouts stay text-only, without decorative side branches.

If the accepted reference currently contains an endpoint dot, preserve it only when matching that reference exactly. Do not introduce new dots as decoration.

The same connector language must be reusable across roots.

---

# 4. Syntax Engine

Syntax must be understandable to a beginner without replacing Arabic grammar with Russian grammar.

For a syntax-focused view:
- show only the phrase/construction being analyzed, not the entire ayah duplicated inside the analysis;
- highlight the exact words that participate in the relationship;
- show the visual relation close to the phrase;
- put the detailed explanation below in a readable vertical flow;
- use restrained thin syntax links/arrows where they clarify relation;
- do not use morphology's 3 px connector rule for syntax relations;
- make grammatical terms clickable for a concise explanation.

Terms such as:
- مُضَاف
- مُضَافٌ إِلَيْهِ
- فَاعِل
- مَفْعُولٌ بِهِ

remain Arabic grammatical terms.

For grammatical states use:
- مرفوع / marfūʿ
- منصوب / manṣūb
- مجرور / majrūr

Do not relabel them as Russian nominative/accusative/genitive cases.

Term explanations:
1. short definition;
2. when the state/role occurs;
3. only then any example needed for the current ayah.

Avoid irrelevant case-system digressions.

---

# 5. Ayah Space — canonical interaction model

## 5.1 One spatial environment

Ayah Space is one continuous navigable spatial canvas.

Do not rebuild it as:
- unrelated page tabs;
- a stack of independent cards;
- a modal-heavy dashboard;
- separate disconnected pages for each linguistic layer.

Local mode switches are allowed, but they must behave as views/windows inside the same spatial environment.

The user should preserve orientation while moving deeper.

Canonical hierarchy:

**Universe → Surah → Composition / Context → Ayah → Construction → Word → Word Structure → Root Galaxy / Root Space**

## 5.2 Progressive disclosure

At the broad scale:
- the complete ayah remains visible;
- the viewer can understand where they are.

As the user approaches/selects:
- constructions emerge;
- word relations emerge;
- per-word meaning/morphology/syntax becomes available;
- deeper structure/root information appears without losing spatial orientation.

Clicking a word should center/focus the camera while preserving enough surrounding ayah context to understand its position.

## 5.3 Default ayah state

Preserve the approved cosmic background.

The interaction hint:
- exact text: **«Нажмите на любое слово»**;
- placed below the ayah and ayah number;
- ordinary weight, not bold;
- blue, visually secondary but clearly readable;
- keep the approved vertical separation (the accepted reference moved it about 50 px lower);
- hide after the first meaningful word interaction.

Do not let the hint merge visually with the ayah number.

## 5.4 Selected word

When a word is selected:
- create strong focus on the word;
- dim/blur surrounding background enough to establish hierarchy;
- do not use an unnecessary oval grounding shape;
- keep explanation readable and untruncated;
- keep lower explanatory content high enough that the user does not lose the ayah.

Detailed explanation belongs below the ayah in the vertical flow, not in a large blocking modal/overlay.

## 5.5 Meaning / Morphology / Syntax

These are distinct information jobs.

The approved interaction may expose local views such as:
- Meaning;
- Morphology;
- Syntax / Связь в аяте.

They must not become three disconnected product pages.

Meaning:
- includes the selected translation;
- preserves the explanation of why that translation fits the context;
- separates lexical/root/contextual meaning to avoid duplication.

Morphology:
- uses the approved neon visual language from the accepted word-structure reference;
- never replaces an accepted structure view with a new card design without permission;
- an alternative structural visualization may exist only as an additional second view when explicitly approved.

Syntax:
- highlights the selected construction in the original ayah;
- brings the local relation close to the text;
- keeps grammar terms clickable;
- does not permanently place noisy Arabic grammar labels under every Quran word.

## 5.6 Context, Composition, Rhetoric, Sound

Do not mix these into the basic word Meaning/Morphology/Syntax layers.

### Context
The larger passage/surah environment around the ayah.

### Composition
Explains **what develops and how it develops** through the passage.
Treat composition as a route/sequence through the text, not as another word definition panel.

Do not repeat the full ayah/translation inside every composition comment.

### Rhetoric
Explains **why this formulation works and what effect it creates**.

Preferred evidence structure:

**CLAIM → ARABIC EVIDENCE → MECHANISM → MEANING EFFECT → PASSAGE CONNECTION**

Use one meaningful heading with its adjacent number rather than repeated small labels.

### Sound
Sound is a distinct layer: phonetic/recitational behavior and, when verified/licensed sources exist, listening/recitation controls.

Do not add audio merely because the visual layer mentions a reciter. Source and rights must be verified first.

---

# 6. Root Space / Root Galaxy — canonical template

## 6.1 Center

The center of a root space stays clean.

For **ل ب ب**, the approved center is only:

**ل ب ب**
**Корень**

Do not add a large «как смысл проявляется» label, extra semantic slogans, or unrelated explanatory text into the center.

## 6.2 Orbit system

A visible ring represents a derivational / word-formation family.

- Roman numerals identify the verb form around which the family is grouped.
- A Roman numeral does not imply that every noun on the ring itself carries that verb pattern.
- Roman form labels are free-standing text to the left of rings, not chips/badges.
- Quran-attested words use the approved green highlight.
- Lexical-only and Quran-attested items must remain distinguishable.

If a crowded family needs an inner dashed ring for space, label it explicitly as an additional zone of the same family, not as a new form.

Keep the legend unboxed.

## 6.3 Geometry and mobile behavior

Words must remain on their assigned form orbits.

Never solve overlap by moving a word into the wrong family.

Instead:
- enlarge the overall root-space diameter;
- increase spacing between rings;
- give crowded Form I more radius/room;
- use an additional same-family zone when necessary;
- move Roman form labels farther left if they collide;
- give mobile more space rather than compressing the system.

Do not allow words to overlap each other, orbit labels, or ring notation.

## 6.4 Connections

Root Space is not merely a catalog of words placed on rings.

Show meaningful relationships where supported:
- root → family/form;
- form → derived lexical item;
- transparent morphological relation;
- Quran occurrence connection;
- semantic relationship when explicitly researched.

Do not invent a direct parent-child derivation between sibling words merely to draw a line.

Connections must explain the system, not decorate it.

## 6.5 Root word cards

Every visible root-space word must use the same approved content/design schema.

A word card must not fall back to an older layout merely because the root was implemented earlier.

Meaning and design for each word should be generated from canonical data through the current approved template.

## 6.6 Special instruction for ل ب ب

The current **ل ب ب** orbit implementation is not the final reference.

Known issues include:
- word Meaning design/structure not matching the approved template;
- missing or insufficient relations/connections;
- crowding/space problems in the orbit system.

Do not keep patching those individual cards.

After the master template is fully approved, rerun **ل ب ب** through the complete template from canonical data:
- root semantics;
- forms/families;
- visible words;
- meanings;
- root connections;
- morphology;
- Quran occurrences;
- orbit placement;
- relation graph;
- word cards;
- Ayah Space links.

Treat that rerun as the first full validation that the template scales beyond taqwā.

---

# 7. Visual Design Engine

## 7.1 Preserve the approved visual language

Quran Universe uses the approved cosmic/spatial visual system.

Do not:
- replace it with generic SaaS cards;
- flatten it into a dashboard;
- introduce a new component language in one panel;
- redesign an unrelated area while fixing a local bug.

When the user says «как в taqwā», inspect and reuse:
- typography;
- neon accents;
- spacing;
- transparency;
- hierarchy;
- connector geometry;
- interactions;
- animation behavior where relevant.

Do not approximate from memory when the approved implementation is available in the repository.

## 7.2 Information hierarchy

Prefer:
- one strong primary object;
- secondary explanatory text;
- progressive reveal;
- generous spatial separation;
- readable contrast;
- restrained visual links.

Avoid:
- duplicated headings;
- stacks of opaque cards;
- floating unanchored lines;
- oversized explanation panels covering the Quran text;
- arbitrary chips around every term.

## 7.3 Arabic / transliteration / Russian separation

Arabic:
- `lang="ar"`;
- `dir="rtl"`;
- approved Arabic font.

Transliteration:
- `lang="ar-Latn"`;
- `dir="ltr"`.

Russian explanatory prose remains Cyrillic.

Do not visually fuse Arabic, Latin transliteration, and Russian prose into one undifferentiated line.

## 7.4 Accessibility and mobile

Do not sacrifice:
- text legibility;
- focus visibility;
- touch targets;
- semantic HTML;
- reduced-motion safety;
- keyboard access where applicable
for the cosmic aesthetic.

Mobile is a designed mode, not a shrunken desktop screenshot.

When orbital or graph layouts become crowded on mobile, expand/scroll/zoom the space rather than reducing everything until it becomes unreadable.

---

# 8. Canonical data and schema discipline

Do not duplicate a fact into multiple files when one canonical source can feed all views.

For Quran data:
- Quran Universe IDs are primary.
- External corpus IDs are mappings only.
- Preserve source provenance.
- Never assume corpora share segmentation from similar token counts.
- Quran-attested and lexical-only status must not be mixed.
- reconstructed morphology stages are labelled as reconstructions.
- research-only/historical layers remain distinguishable from canonical/traditional layers.

For every new root/word/ayah/source verify:
- stable canonical ID;
- root/orbit exists;
- every visible form has a morphology profile;
- Quran occurrence IDs resolve;
- source IDs resolve;
- word-content patterns agree with morphology;
- Ayah Space token links resolve to registered words;
- fallback content preserves the selected word's own source.

Ayah Space content must be schema-driven where the architecture supports it. Do not hardcode approved meaning into UI components when canonical data can own it.

---

# 9. Change discipline

Before adding a block ask:

1. Is this new information?
2. Is it already stated elsewhere?
3. Does it belong in Meaning, Root Connection, Structure, Syntax, Context, Composition, Rhetoric, or Sound?
4. Does the new block change an approved visual hierarchy?
5. Can the existing canonical schema render it instead?

If it repeats existing information, do not add it.

When fixing a repeated UI:
- change the canonical component/style/data owner;
- do not accumulate CSS overrides that fight each other;
- remove stale contradictory rule when safe.

The smallest coherent change is preferred, but not if a full template rerun is required to remove legacy inconsistency.

---

# 10. First-pass implementation checklist

Before writing code/content, build a short internal checklist for the target.

## Content
- target word/ayah/root identified;
- translation decision separated from explanation;
- root meaning checked;
- lexical field checked;
- form checked;
- syntax checked;
- local context checked;
- Quran-wide usage checked;
- source provenance recorded;
- no unsupported semantic leap;
- no duplicate explanation.

## Design
- approved reference identified;
- canonical component identified;
- spacing/hierarchy copied from reference;
- mobile behavior defined;
- interaction behavior defined;
- no unrelated redesign;
- no old legacy card reused accidentally;
- connectors follow current rules.

## Data
- canonical IDs resolve;
- occurrence/source mappings resolve;
- derived UI is driven by canonical data;
- no external dataset silently promoted.

Only then implement.

---

# 11. Validation before completion

After canonical research registry changes:
- run `npm run sync`.

Before completion:
- run `npm run check`;
- run production build;
- inspect newest GitHub Actions result.

For content changes:
- content guards must pass;
- review the exact rendered text, not only JSON validity.

For visual changes:
- build success is insufficient;
- inspect the target state in a browser at relevant desktop/mobile viewport(s) when a test path exists;
- compare against the approved reference.

For Root Space:
- check every visible word remains on the correct orbit;
- check labels/words do not overlap;
- check connections represent real relations;
- check mobile space is usable.

For Ayah Space:
- check the whole ayah remains readable;
- check selection/focus;
- check Meaning/Morphology/Syntax content does not duplicate;
- check contextual explanations remain below the ayah rather than covering it;
- check grammar terminology interactions.

Never say «готово», «исправлено», «live», or «deployed» until fresh evidence supports the exact claim.

---

# 12. Master-template principle

Taqwā is the current approved reference for the content/design method, not a root-specific exception.

The goal is to make future roots/ayahs correct by applying the same canonical method from the beginning:

**research → canonical data → schema → approved spatial template → validation**

Do not hand-design every new root independently.

Once this master template is fully approved, use **ل ب ب** as the first complete rerun/scale test before treating the template as universal.
