# Quran Universe master-system audit — 2026-09-22

> Audit snapshot only. Normative authority remains `AGENTS.md` and `.github/skills/quran-universe/SKILL.md`. This file records what was inspected and why the canonical rules were rebuilt.

## Scope

The repository was re-indexed from the recursive Git tree rather than from memory or selected files.

At the audited branch head:
- 107 Git tree entries;
- 82 file blobs;
- 75 non-CSS text/config/source files inspected in the conflict scan, excluding `package-lock.json`;
- all 6 CSS files inspected for active/legacy visual connector rules.

The audit covered:
- project skills and `AGENTS.md`;
- runtime React components;
- all Quran/root/ayah content owners;
- morphology and syntax presentation;
- Root Space and Word Orbit definitions;
- canonical research records and registries;
- source adapters and cross-corpus pilot data;
- content/system/security/tamper guards;
- generated docs;
- GitHub Actions workflows;
- Playwright approved-UI contracts.

## Canonical ownership map

| Layer | Canonical owner(s) |
|---|---|
| Master project method | `.github/skills/quran-universe/SKILL.md`, `AGENTS.md` |
| Human root-method reference | `ROOT_SEMANTIC_METHOD.md` — subordinate to the master skill |
| Universe/search/root navigation | `src/components/ImmersiveUniverse.jsx`, `ImmersiveUniverse.css` |
| Word Orbit layout | `src/components/WordOrbit.css` |
| Word Orbit content | `src/components/WordDetails.jsx`, `src/rootContent.js` |
| Word morphology data | `src/morphologyWqy.js` |
| Root families/positions | `src/demo.js` |
| Ayah Space canonical content | `src/ayahPrototype.js` |
| Ayah record schema | `src/data/ayahSchema.js` |
| Ayah Space UI | `src/components/AyahView.jsx`, `AyahView.css` |
| Focused meaning/syntax UI | `src/components/WordFocusViews.css` |
| Syntax model | `SyntaxView.jsx`, `syntaxPresentation.js`, `syntaxTerms.js` |
| WQY public semantic safeguards | `src/canonicalWqy.js` |
| WQY reviewed research record | `src/data/research/wqyResearch.json` |
| Root research status | `src/data/research/rootRegistry.json` |
| Quran occurrences | `src/occurrences.js` |
| Canonical IDs / data authority | `src/data/quranUniverseData.js` |
| External source mappings | `src/data/sourceAdapters.js` |
| Semantic/data regression guard | `scripts/content-guard.mjs` |
| Approved browser behavior | `tests/ui/approved-ui.spec.js` |

## Conflicts found and resolved

### 1. Connector rule was incorrectly globalized

The system contains distinct diagram families.

**Word Orbit → Structure → visual morphology**
- 1 px;
- directional arrowhead;
- desktop horizontal;
- mobile vertical with upper dot and attached lower arrowhead.

**Ayah Space → taqwā morphology**
- 1 px;
- no arrowheads / SVG markers;
- clean orthogonal tree.

**Ayah Space syntax**
- its own thin directional relation arcs and clickable grammar terms.

**Root Space**
- orbit rings encode families;
- semantic relationship lines are a separate, still incomplete layer for ل ب ب.

The master skill and AGENTS now explicitly prohibit copying connector rules from one diagram family into another.

### 2. Old taqwā presentation was still canonical in runtime data

Several files still treated “осознанность перед Всевышним” as the primary Russian rendering and “благочестие” as only a manifestation.

The approved 2:197 presentation is now synchronized across the system:

- **Translation:** `التَّقْوَىٰ — благочестие`.
- **Meaning of the Russian word:** почитание Всевышнего and life/conduct in accordance with that reverence.
- **Source of the state in taqwā:** remembrance of Allah and His presence → awareness of His boundaries → guarding against crossing them and doing evil.
- **Context:** this piety is called the “best provision” in the Hajj passage.
- **Translation note:** “осознанность” is explanatory, not a standalone Russian equivalent; “праведность” describes conduct more strongly and is not paired by default in this ayah.

The broader WQY root model remains separate from this context-specific translation decision.

### 3. The old semantic model was protected by CI

`scripts/content-guard.mjs` previously failed if 2:197 used “благочестие” and required the old “целостная осознанность” wording.

The guard now protects the new approved hierarchy instead:
- rendering = благочестие;
- Russian definition remains separate;
- source/mechanism remains separate;
- old awareness-as-translation wording is rejected;
- rejected “передо Мной / опасайтесь Меня” explanatory phrasing is blocked for the 2:197 `وَٱتَّقُونِ` presentation.

### 4. Ayah Space meaning layers were structurally collapsed

The focus renderer previously had only:
- gloss;
- contextual description;
- translation note.

It now supports distinct:
- translation/gloss;
- meaning/definition;
- source of the state;
- meaning in this ayah;
- why this translation.

This prevents the Russian definition, Arabic semantic source, and ayah context from duplicating one another.

### 5. Root-research authority was duplicated

`ROOT_SEMANTIC_METHOD.md` contained valuable root-reconstruction rules that were not fully represented in the shorter project skill.

The master skill now incorporates:
- root-verification of every candidate form;
- multi-source triangulation;
- concrete/physical senses;
- full-family testing;
- active falsification and counterexample search;
- neighbouring-root comparison;
- semantic-branch separation;
- dictionary fact vs synthesis vs hypothesis;
- Quranic occurrence validation.

`ROOT_SEMANTIC_METHOD.md` remains a human reference but is explicitly subordinate to the master skill.

### 6. ل ب ب data and UI are at different maturity levels

The data already contain:
- lexical-family coverage;
- semantic branches such as `core`, `stay`, `chest`, `separate`, and related R.Q. material;
- per-word derivation notes;
- Quranic validation for أَلْبَاب;
- the working synthesis:
  **сердцевина / суть → дойти до неё → удержаться при ней**.

The current Root Space does not yet express these relations adequately.

Therefore the root remains **In research** and is explicitly queued for a full end-to-end rerun after the master template is approved. The old Root Space must not be patched incrementally into the final model.

### 7. CSS contains historical experiments

`AyahView.css` contains old morphology connector experiments and later scoped approved rules.

Historical comments such as “v4” / “v5” are not authority. For visual decisions, the required order is:
1. explicit/latest approved user decision or approved rendered state;
2. active component;
3. winning scoped CSS;
4. browser contract.

## Regression protection added

The system now has:
- semantic guard for the approved 2:197 taqwā hierarchy;
- browser contract for “Благочестие” and its separate meaning/source sections;
- browser contract for Ayah Space taqwā 1 px / no-marker morphology;
- existing browser contract for Word Orbit 1 px directional morphology;
- reviewed tamper-baseline updates for changed critical Quran/research files.

## ل ب ب next pass

Do not redesign ل ب ب yet.

After the master template is explicitly approved:
1. re-verify the lexical family and root membership;
2. re-test the working nucleus against every branch;
3. run counterexample/falsification checks;
4. validate all manageable Quranic occurrences;
5. separate strong, weak, and unrelated semantic links;
6. rebuild every Word Orbit meaning/structure panel from the canonical template;
7. rebuild Root Space relationships so every visible line has an explainable semantic or derivational reason;
8. verify mobile and desktop;
9. promote research status only after the review criteria are actually met.

## Remaining boundaries

- `ل ب ب` has not yet passed formal human semantic review/falsification in the registry.
- WQY is human-reviewed but not scholar-reviewed.
- Old CSS may later be cleaned, but only after the current approved behavior is fully protected; cleanup must not precede correctness.
- This audit does not merge PRs or change GitHub account-level repository settings.
