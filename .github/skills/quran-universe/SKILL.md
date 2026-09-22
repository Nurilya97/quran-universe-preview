---
name: quran-universe
description: Master Quran Universe specification for research, Quran-first semantics, Arabic root analysis, translation/context decisions, morphology, syntax, Root Space, Ayah Space, UI/design reuse, canonical data, implementation, and verification. Use before any substantial Quran Universe content or design change.
---

# Quran Universe Master Skill

This file is the primary project workflow for Quran Universe. It exists so a new root, word, ayah, or interface state is built correctly from the start instead of being repaired through repeated ad-hoc edits.

## 0. Authority and non-negotiables

Authority order:

1. latest explicit user decision;
2. this skill and `AGENTS.md`;
3. approved canonical Quran Universe data and approved reference UI;
4. supporting skills, corpora, lexicons, tafsir, and external datasets.

Never silently replace an approved semantic decision, translation, layout, interaction, or visual language.

When an older repository note conflicts with a later explicit user correction, the later correction wins and the stale rule must be removed or updated rather than left in parallel.

This repository is the only active Quran Universe source of truth. Do not create a required Notion control plane, mirror repository, duplicate semantic runtime, or second source registry.

---

# PART I — CONTENT ENGINE

## 1. Quran-first semantic method

Quran Universe is Quran-first.

For every root, word, expression, or ayah:

1. identify the lexical/root field;
2. inspect the actual morphological form;
3. inspect the Quranic occurrences and local ayah context;
4. inspect syntax and construction;
5. compare classical lexical evidence;
6. consult tafsir when it clarifies context, usage, rhetoric, or competing interpretation;
7. formulate the Quran Universe explanation only after the evidence is reconciled.

The Quran's own description of a quality, state, group, or action is primary evidence. A short dictionary gloss must not override a fuller Quranic description.

Do not force a root etymology directly into a translation. Root meaning explains semantic ancestry; the actual word form and context determine the word's meaning in the ayah.

## 2. Translation protocol

Translation and explanation are different layers.

For a visible Quranic word, keep these separate:

### A. Translation
The best natural Russian equivalent for this word in this ayah.

### B. Meaning
What the translated Russian word itself means in ordinary, precise Russian.

### C. Source/mechanism of the meaning in the Arabic word
How the Arabic root, form, Quranic usage, and context give rise to that meaning.

### D. Meaning in this ayah
Which part of the lexical field is activated here, and why.

Never collapse all four into one paragraph.

Do not use a vague explanatory word merely because it is popular in English. In particular, distinguish English `conscious` from `mindful`; Russian `осознанность` is not automatically an adequate equivalent for either and must not be used as a default substitute for a richer Quranic concept.

When several translations are possible:
- identify what each preserves;
- identify what each loses;
- choose the project rendering from the ayah context, not from popularity;
- retain alternative published renderings only when they materially help explain the decision.

Do not describe a meaning as merely “religious”, “spiritual”, or “moral” when those labels do not explain the semantic mechanism.

## 3. Canonical decision: التَّقْوَىٰ in 2:197

For Quran Universe, the current approved Russian rendering in 2:197 is:

**التَّقْوَىٰ — благочестие**

Do not replace it with `осознанность`.

Keep the layers separate:

### Translation
**благочестие**

### Meaning of the Russian word
Use the ordinary Russian definition of благочестие: reverence for the Creator / living and behaving in accordance with that reverence. Do not redefine the Russian word through Arabic etymology.

### Source of this state in taqwā
Explain separately that in taqwā this state grows from orientation toward Allah: remembering Him / His presence, being aware of the boundaries He has established, and therefore guarding oneself from crossing them and from doing evil.

This causal logic may be expressed as:

**память об Аллахе → осознание Его границ → остережение от нарушения → благочестивое состояние и поведение**

This is explanatory logic, not a one-word translation.

For **وَاتَّقُونِ**, avoid unnatural Russian such as “опасайтесь Меня” or “опасайтесь передо Мной” in explanatory prose. Prefer a natural explanation centred on remembering Allah and guarding oneself from crossing His boundaries. Do not invent a quotation-like translation unless it is actually a translation.

## 4. Root Research Protocol

Use this protocol for every root. It is based on the method established while researching **ل ب ب**.

### Step 1 — collect the full lexical family
Do not start from one favourite gloss.

Gather:
- primary/root verb meanings;
- nouns;
- adjectives;
- verbal nouns;
- derived forms;
- idiomatic or culturally grounded usages;
- Quran-attested and lexical-only members.

Do not mix Quran-attested and lexical-only status.

### Step 2 — triangulate multiple sources
Use several reliable sources rather than one dictionary.

Root-verify every collected form. Broad lexical searches can mix homographs, neighbouring roots, cross-references, or later related forms. Never admit a form to the semantic map merely because a search result grouped it nearby.

Preferred lexical stack when available:
- Arabist / Arabous;
- Almaany;
- Lane;
- Lisān al-ʿArab;
- Tāj al-ʿArūs;
- Arabic Lexicon aggregations of classical dictionaries;
- Doha Historical Dictionary when useful;
- Baranovsky for Russian cross-checking.

Preferred Quran/corpus stack when available:
- canonical Quran text;
- Quranic Arabic Corpus;
- Tafsir Center morphology/iʿrāb resources;
- QuranMorph;
- QAMAR only when the actual verified dataset is available;
- project source adapters and canonical Quran Universe mappings.

No single corpus is universal authority for segmentation, POS, lemma, or word IDs. Preserve source-specific coordinates and provenance.

### Step 3 — search for the fundamental semantic image
Ask:

- What is the most stable meaning shared across the family?
- Is there a physical or concrete image underneath later abstract meanings?
- What did the word originally name or describe?
- Why was a particular object/state/action called by this root?
- What semantic transfer connects the concrete and abstract usages?

The goal is not to invent a poetic “root essence”. The goal is to find the smallest defensible semantic mechanism that explains the family.

### Step 4 — test and falsify the candidate
A proposed core meaning is not accepted merely because it explains the Quranic word.

Actively try to break the proposed nucleus:
- test every verified derivative;
- test concrete/physical senses before abstract ones where possible;
- test every manageable Quranic occurrence;
- search for a counterexample that would make the proposed mechanism fail;
- compare neighbouring roots that receive similar translations.

A model becomes stronger by surviving counterexamples, not by accumulating only supportive examples.

Run it against the full family:
- explain why each derivative belongs to the root;
- identify the semantic bridge;
- identify where a separate branch may have developed;
- reject a core model that requires repeated forced explanations.

Do not force unrelated or weakly related forms into one beautiful story.

### Step 5 — separate semantic branches
A root may contain more than one historically or lexically established branch.

If the evidence supports separate branches:
- show them separately;
- identify their relationship only when evidence supports one;
- do not pretend all forms are a direct linear derivation from one modern gloss.

### Step 6 — explain the “living image”
When evidence supports it, explain:
- the concrete image;
- the cultural or physical bridge;
- the semantic transfer;
- why the later meaning makes sense.

This is especially important when a literal dictionary list looks disconnected.

### Step 7 — compare near-synonymous roots
When two roots appear to mean the same thing:
- compare their semantic centres;
- show what each one profiles differently;
- use Quranic usage and lexical evidence;
- do not flatten them into synonyms.

The comparison exists to clarify the root, not to manufacture contrast.

### Step 8 — morphology after lexical family
For each derived form, distinguish:

- root letters;
- derivational pattern;
- morphophonological change;
- inflection/endings;
- lexical meaning.

Explain the function of the whole form without assigning universal independent meanings to every pattern or letter.

Teaching order:

**root → base/lexical family → pattern → transformation → actual word**

### Step 9 — Quranic usage
After the lexical map is coherent, inspect Quranic occurrences.

For each occurrence:
- exact word/form;
- ayah;
- syntax;
- immediate collocation;
- wider ayah/surah context where material;
- which part of the lexical field is active;
- rhetorical/semantic relations when demonstrable.

Do not infer the Quranic meaning from a dictionary alone.

### Step 10 — final formulation
Only after the full test, write:
- concise root meaning;
- semantic map/branches;
- word meanings;
- Quranic usage;
- unresolved uncertainty.

The final root meaning must be short enough to function as a nucleus, but rich enough to explain the family.

## 5. Evidence discipline for root research

Distinguish three levels:

### Dictionary/source fact
Directly supported by lexical/corpus evidence.

### Synthesis
A conclusion produced by comparing several supported facts.

### Hypothesis
A plausible semantic bridge not directly established by the sources.

Never present a hypothesis as dictionary fact.

When uncertain:
- say what is certain;
- say what is disputed or unclear;
- preserve competing analyses if both are credible;
- do not add unsupported reflections merely because they make the visualization elegant.

## 6. Source presentation

Research from multiple sources, but do not write the visible explanation as:
“Lane says… Lisān says… Almaany says…”

The user-facing explanation should be one coherent synthesis.

Place sources/provenance in the source layer or source list at the bottom.

Inline source attribution is appropriate only when:
- a claim is contested;
- an unusual historical claim depends on a specific authority;
- competing interpretations must be distinguished.

## 7. Working semantic model for ل ب ب

The previously developed working model for **ل ب ب** is:

**сердцевина / суть → дойти до неё → удержаться при ней**

Treat this as a working Quran Universe synthesis that must remain traceable to the lexical family and Quranic usage, not as an unquestionable dictionary quote.

When re-running ل ب ب:
1. re-check the full family;
2. preserve genuine semantic branches;
3. verify every visible word and relationship;
4. explain the physical/conceptual bridge;
5. compare nearby roots where useful;
6. re-check Quranic **أُولِي الْأَلْبَابِ** in context;
7. rebuild the Root Space from the approved master template rather than patching the old layout.

---

# PART II — WORD AND AYAH ANALYSIS

## 8. Word panel hierarchy

For every word panel, keep information non-duplicative.

Default hierarchy:

1. **Перевод**
2. **Значение**
3. **Связь с корнем**
4. **В этом аяте**
5. **Структура слова**
6. **Морфология**
7. **Синтаксис**
8. source/provenance layer where appropriate

Only show a section when it adds new information.

### Word Orbit meaning-card contract

A Word Orbit meaning card must stand on its own. A reader should understand the word without opening another tab.

For every visible word:

1. **Start with a direct definition.**
   - Prefer an ordinary verb, noun, adjective, or phrase that answers “what does this word mean?”
   - Write `ٱتَّقَىٰ (ittaqā) — беречь себя / остерегаться`, not an abstract surrogate such as “занимать защитно-ориентированную позицию”.
   - Do not make the reader infer the basic meaning from a mechanism, root theory, or morphology.

2. **Add one short semantic-focus paragraph.**
   - Explain what is foregrounded: action, state, agent, degree, process, means, stable quality, etc.
   - Keep it to one or two short sentences.
   - Do not repeat the definition in different words.

3. **Give one useful contrast.**
   - “Чем отличается” must compare the nearest genuinely confusable form.
   - It must add a difference, not restate the lead.
   - If reliable sources treat two forms as near-synonyms and do not establish a stable semantic boundary, say so explicitly. Do not invent a contrast from morphology alone.

4. **Make Arabic readable.**
   - In Russian explanatory prose, every Arabic lexical form must be followed by Latin transliteration on first mention in that local section: `تَقْوَىٰ (taqwā)`, `أَتْقَى (atqā)`.
   - The renderer must not strip author-supplied transliteration.
   - Do not assume the reader can vocalize Arabic unaided.

5. **Do not use navigation as explanation.**
   - Never write “различие раскрывается в «Строении слова»”, “смотрите там”, or equivalent as a substitute for explaining the meaning.
   - Morphology may add a separate explanation, but the meaning panel must already answer what the word means and how it differs.

6. **Avoid negative-definition chains.**
   - Define the word positively first.
   - Do not build paragraphs from “это не X, не Y, но Z” unless a rejected translation materially needs clarification.

7. **Use mechanism maps only when they add information.**
   - Simple lexical items normally need direct meaning + semantic focus + contrast, not a repeated “Механизм” card.
   - Complex Quranic concepts may keep a map only for genuinely additional layers such as Quranic unfolding, source-of-state logic, or context.

Do not repeat the same concept under “Значение”, “Связь с корнем”, “Механизм”, and “В этом аяте”.

Morphological mechanics belong in structure/morphology, not in lexical meaning.

## 9. Ayah Space principle

Ayah Space is one connected semantic space, not a stack of unrelated cards.

At the overview level:
- keep the full ayah readable;
- keep the approved cosmic/minimal visual language;
- let the user select a word or relation;
- reveal detail progressively rather than covering the ayah with large cards.

For a selected word, the detailed information may expose:
- translation;
- meaning;
- root relation;
- word structure;
- morphology;
- syntax;
- local contextual meaning;
- rhetoric where supported.

Rhetoric, composition, context, and sound may also have their own wider ayah-level views when they concern the whole construction rather than one token.

## 10. Syntax

Syntax must operate on the relevant phrase, not automatically on the entire ayah.

For the selected construction:
- show the actual phrase from the ayah;
- identify grammatical roles precisely;
- visually mark the exact spans being explained;
- Arabic grammar terms such as مُضاف / مُضاف إليه may be clickable;
- clicking a term should explain the term itself;
- do not insert unrelated lexical labels into syntax explanations.

Syntax explains relationships between words. It must not duplicate morphology.

## 11. Rhetoric, composition, context, sound

These are separate analytical dimensions.

### Rhetoric
Show a rhetorical mechanism only when it is actually evidenced in the construction.

### Composition
Show how the parts of the ayah/sequence are arranged and why the order matters.

### Context
Show the relevant local/surah context without turning the interface into a long tafsir article.

### Sound
When added, analyze meaningful sonic patterning cautiously and evidence-first. A recitation layer may be connected to the ayah, but audio is not itself proof of a rhetorical claim.

Do not manufacture rhetorical significance from every phonetic repetition.

---

# PART III — MORPHOLOGY

## 12. Morphological causality

Use this order:

**root meaning → contribution of added element/pattern → transformation → complete word meaning**

Do not reverse the causality by implying that an abstract pattern independently creates the lexical meaning.

Distinguish:
- root letters;
- pattern letters/elements;
- transformed root letters;
- morphophonological changes;
- grammatical endings.

## 13. تَقْوَىٰ morphology

Keep the noun pattern **فَعْلَى** distinct from Form VIII verb **ٱتَّقَىٰ**.

For the approved teaching sequence, the project may show reconstructed stages:

**وَقْيَا → تَقْيَا → تَقْوَىٰ**

These are reconstructed morphological stages, not separate lexical words.

Keep visible:
- initial root **و** corresponding to **ت** in the derivational history;
- root **ق** retained;
- final root **ي** corresponding to the medial **و** in the resulting noun form;
- final **ىٰ** as part of the noun pattern.

Do not label **ت** as a simple semantic prefix.

If classical sources order the intermediate reconstruction differently while preserving the same correspondences, note the competing analysis rather than hiding it.

## 14. Added-element mnemonic

The project may use these teaching mnemonics only when they are actually applicable:

- **مُـ** — bearer / possessor associated with the root meaning;
- **مَـ** — locus/place where the root meaning manifests.

The whole morphological pattern refines the result. Do not turn the mnemonic into a universal linguistic law.

---

# PART IV — ROOT SPACE / ORBITS

## 15. Root Space meaning

Root Space is a semantic-morphological map, not a decorative solar system.

It must allow the user to understand:
- the root nucleus;
- derivational families;
- actual words;
- Quran-attested vs lexical-only status;
- semantic distance/branching;
- meaningful relationships between words;
- how morphology and meaning interact.

A root orbit with words but no meaningful relationships is incomplete.

## 16. Orbit notation

Whenever orbital rings are shown:

- one ring represents one derivational/word-formation family;
- Roman numeral labels the verb form around which the family is grouped;
- the numeral does not assert that every noun on the ring is itself that verb pattern;
- Quran-attested words use the approved Quran-attested highlight;
- an extra ring used only for layout capacity must be explicitly identified as another zone of the same family;
- form labels are free-standing, not pill/chip badges;
- legend remains available and unboxed.

## 17. Crowded roots

For crowded roots:
- expand the overall root space before compressing labels;
- increase spacing between families;
- give dense families more radius/area;
- a family may have an additional internal zone while remaining one family;
- keep the nucleus visually clean;
- move form labels away from words;
- never solve crowding by overlapping word nodes or hiding semantic relations.

## 18. Relationships in Root Space

Show relationships only when meaningful.

Possible relation classes include:
- derivational;
- semantic development;
- shared concrete image;
- semantic branch;
- Quranic conceptual relation.

Do not draw a line simply because two words share the same root.

Every visible connection must answer “why are these two nodes connected?”

---

# PART V — DESIGN / UI ENGINE

## 19. Approved-design rule

When the user says “как в taqwā” or names another approved reference:
- inspect that implementation first;
- reuse the same component logic, hierarchy, spacing logic, interaction, and visual language;
- change linguistic data, not the design system.

Do not redesign approved screens unless explicitly requested.

A new root must inherit the approved template instead of receiving a bespoke layout.

## 20. Connector rules are context-specific

Never apply one connector style globally across Quran Universe. “Morphology”, “syntax”, “Root Space” and “Word Orbit” are separate diagram families.

### A. Word Orbit → Structure → visual morphology

Canonical runtime owner:
- `src/components/WordDetails.jsx` → `.morph-board`
- `src/components/WordDetails.css`
- browser contract in `tests/ui/approved-ui.spec.js`

Approved rule:
- straight **1 px** connectors;
- directional arrowhead;
- desktop: horizontal connector between consecutive morphology nodes;
- mobile: vertical 1 px connector, small dot at the upper endpoint, attached arrowhead at the lower endpoint;
- no bent “AI-looking” branches or floating fragments.

### B. Ayah Space → taqwā morphology

Canonical runtime owner:
- `TaqwaMorphologyLegacy` in `src/components/AyahView.jsx`
- scoped CSS `.approved-taqwa-baseline` in `src/components/AyahView.css`

Latest approved rule:
- **1 px** connector tree;
- **no arrowheads / no SVG markers**;
- clean orthogonal geometry;
- the word begins the scheme; the root is not substituted for the word as the start node.

The earlier 3 px request was later reduced to 2 px and then 1 px. The no-arrow requirement remained.

### C. Ayah Space syntax

Runtime owner:
- `src/components/SyntaxView.jsx`
- `src/components/WordFocusViews.css`

Syntax uses restrained directional relation arcs with clickable grammatical terms. Its geometry and weight are its own system; do not copy morphology connector settings into it.

### D. Root Space

Orbit rings are family guides, not morphology arrows. The current ل ب ب Root Space has approved notation/legend elements, but its semantic relationship layer is incomplete and must not be frozen as the final relationship template.

### Cascade rule

`AyahView.css` contains several older morphology experiments. Comments such as “v4” or “v5” are historical layers, not authority. For a repeated visual decision inspect, in this order:
1. the rendered approved state / explicit user decision;
2. the active component;
3. the latest scoped selector that actually wins the CSS cascade;
4. the browser contract, when one exists.

Never propagate a connector correction from one diagram family to another unless the user explicitly approves that cross-context change.

## 21. Visual hierarchy

The interface should remain:
- modern;
- minimal;
- immersive/cosmic without decorative clutter;
- readable on mobile;
- spatial rather than card-heavy;
- progressively disclosed.

The ayah/root itself is primary. Panels and explanations support it and must not dominate the screen.

## 22. Script handling

Arabic, transliteration, and Russian must remain visually distinct.

- Arabic: `lang="ar"`, `dir="rtl"`, Arabic font.
- Transliteration: `lang="ar-Latn"`, LTR.
- Russian: Cyrillic body copy.
- Avoid redundant transliteration when Arabic is already visible unless pronunciation requires it.

## 23. Headings and prose

Headings:
- short;
- factual;
- usually 1–4 words.

Prefer:
- Перевод
- Значение
- Связь с корнем
- В этом аяте
- Структура слова
- Морфология
- Синтаксис
- Смысл корня
- Изменение
- Результат

Avoid conversational or meta headings.

Russian prose:
- fact first;
- short natural sentences;
- no vague academic padding;
- no “мы показываем”, “удобно читать как”, “рабочая модель” unless uncertainty truly needs to be signalled;
- do not describe the UI inside the linguistic explanation;
- do not repeat the same idea with synonyms in adjacent blocks.

---

# PART VI — DATA / PROVENANCE

## 24. Canonical-first data

For every root/word/ayah/source:
- stable Quran Universe canonical ID;
- root/orbit registration;
- morphology profile;
- occurrence mapping;
- source provenance;
- lexical/Quran-attested status;
- Ayah Space token link;
- reconstructed stages labelled as reconstruction;
- external IDs stored as mappings, never as Quran Universe primary IDs.

Never infer equal segmentation between corpora merely from similar word counts.

## 25. External datasets

External data can support:
- lemma;
- POS;
- root;
- morphology;
- syntax/iʿrāb;
- occurrences;
- source cross-checks.

It does not automatically own the project's semantic interpretation.

Preserve:
- exact source;
- version/release;
- license/status;
- source-specific segmentation;
- orthographic differences;
- mapping confidence.

Unverified datasets remain research/pending, not canonical.

---

# PART VII — CHANGE DISCIPLINE

## 25A. Runtime ownership map

Before editing a repeated pattern, locate its real owner:

- Universe/search/root navigation: `ImmersiveUniverse.jsx` + `ImmersiveUniverse.css`
- Word Orbit layout: `WordOrbit.css`
- Word Orbit content/structure/meaning: `WordDetails.jsx`, `WordDetails.css`, `rootContent.js`, `morphologyWqy.js`
- Root families/positions: `demo.js`
- Ayah Space record content: `ayahPrototype.js` validated by `data/ayahSchema.js`
- Ayah Space UI/morphology/composition/rhetoric: `AyahView.jsx` + `AyahView.css`
- Ayah Space focused meaning/syntax styling: `WordFocusViews.css`
- Syntax presentation: `SyntaxView.jsx`, `syntaxPresentation.js`, `syntaxTerms.js`
- WQY canonical semantic safeguards: `canonicalWqy.js` + `data/research/wqyResearch.json`
- Quran occurrences: `occurrences.js`
- Cross-corpus canonical IDs/adapters: `data/quranUniverseData.js`, `data/sourceAdapters.js`
- Automated semantic/data invariants: `scripts/content-guard.mjs`
- Approved browser contracts: `tests/ui/approved-ui.spec.js`

Do not infer authority from file names or comments alone. A historical CSS block, obsolete test assumption, or stale guard can conflict with a later explicit user decision and must then be updated.

## 26. Before editing

Before any substantial content/UI change:

1. read `AGENTS.md`;
2. read this skill;
3. read `docs/DATA_ARCHITECTURE.md` for corpus/data work;
4. identify the canonical owner of the fact or UI;
5. inspect the current approved implementation;
6. search for stale contradictory rules;
7. identify whether the task is content, morphology, syntax, Root Space, Ayah Space, CSS, data, or deployment;
8. load relevant supporting skills.

For a bug/unexpected state, use systematic debugging before patching.

## 27. Make coherent changes, not patches

Do not repair a new root by stacking overrides onto an obsolete prototype.

If the template itself changed:
1. finalize the template;
2. update the canonical reference;
3. then re-run affected roots/words through the template.

Specific current rule:
- do not keep patching the old **ل ب ب** Root Space;
- once the master template is approved, perform a complete re-run of ل ب ب through the new content + design pipeline.

## 28. No duplication

Before adding a block, ask:
- is this genuinely new information?
- is it already stated elsewhere?
- does it belong to translation, meaning, root relation, context, morphology, syntax, rhetoric, or source provenance?

If it repeats existing information, do not add it.

---

# PART VIII — QUALITY GATE

## 29. Content preflight

Before implementation, confirm internally:

- Did I inspect more than one lexical source where the claim requires lexical research?
- Did I inspect Quranic usage?
- Did I separate root meaning from actual word meaning?
- Did I separate translation from explanation?
- Did I test the root model against the whole family?
- Did I distinguish fact/synthesis/hypothesis?
- Did I avoid unsupported semantic bridges?
- Did I preserve alternative analyses when real uncertainty exists?
- Does every Word Orbit card begin with a direct, ordinary-language definition?
- Is every Arabic form in Russian explanatory prose readable through adjacent Latin transliteration?
- Does “Чем отличается” add a real contrast instead of repeating the definition?
- Did I avoid inventing semantic differences between near-synonyms when the sources do not support one?
- Can the meaning panel stand alone without telling the reader to open Structure/Morphology?
- Did I avoid duplicate explanation?

If any answer is no, research is incomplete.

## 30. Design preflight

Before implementation:

- What approved screen is the reference?
- Am I reusing it rather than approximating it?
- Did I preserve current connector rules?
- Are Root Space relations meaningful?
- Is the ayah/root visually primary?
- Does mobile have enough spatial room?
- Have I avoided new chips/cards/boxes not present in the approved language?

## 31. Verification

For canonical registry changes:
- run `npm run sync`.

Before completion:
- run `npm run check`;
- run the production build;
- inspect relevant browser states for visual changes;
- inspect the newest GitHub Actions run.

Never say “готово”, “исправлено”, “live”, or “deployed” from assumption or an older run.

## 32. Definition of a successful new root

A new root is not complete merely because words appear on orbits.

It is complete only when:
- semantic nucleus is evidence-tested;
- full family has been considered;
- true branches are represented;
- morphology is correct;
- Quranic usage is mapped;
- each visible word has non-duplicative content;
- meaningful relationships are visible;
- design matches the canonical template;
- mobile/desktop are verified;
- data/provenance checks pass.

This is the standard to use for the full re-run of **ل ب ب** after the template is finalized.
