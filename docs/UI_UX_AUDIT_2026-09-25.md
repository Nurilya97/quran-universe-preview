# Quran Universe UI/UX audit — 2026-09-25

## Authority

This audit is advisory. The order of authority remains:

1. latest explicit user decision;
2. Quran Universe master skill and approved UI;
3. canonical project data and browser contracts;
4. external design references such as Emil Kowalski's design-engineering principles and Taste Design.

External design rules must never erase the approved cosmic/spatial identity.

## What is already strong

- Ayah, word and root remain the primary visual objects.
- Progressive disclosure keeps detail from covering the Quranic text.
- Ayah Space has a clear top-level model: Analysis / Composition / Rhetoric.
- Composition and Rhetoric now read vertically on mobile instead of requiring lateral hunting.
- Word Structure preserves the approved neon morphology language.
- Root Space is spatial rather than card-heavy.
- Reduced-motion, keyboard labels, Arabic directionality and mobile contracts already exist.

## Current design debt

### 1. CSS cascade complexity — highest priority

`AyahView.css` contains many historical experiments and late overrides. The rendered result is approved, but small changes can accidentally reactivate old treatments.

Rule: stabilize the current rendered state with tests before deleting old layers. Cleanup must be incremental and visual-regression checked.

### 2. Typography consistency

Arabic must use the canonical `--arabic-font` stack. Interface text should converge on a smaller semantic type scale instead of many one-off sizes.

Do not reduce Quranic Arabic merely to make layout easier; spatial room should expand before the Quranic text is compressed.

### 3. Motion hierarchy

Frequent interaction should feel immediate. Long cinematic motion belongs to rare journeys between semantic spaces, not routine button or panel interaction.

Direct manipulation must remain responsive. Avoid `transition: all`.

### 4. Touch and affordance

Mobile primary controls need at least 44×44 CSS-pixel hit targets. Visible icons can remain visually smaller.

Pressed feedback should be tactile but must not shift orbit/root geometry.

### 5. Semantic light and colour

Keep the cosmic glow. Do not flatten Quran Universe into a generic monochrome product.

But separate:
- atmospheric cosmic light;
- product/navigation chrome;
- semantic morphology/syntax/meaning colour.

Glow should communicate hierarchy or state rather than appear uniformly.

## Pass 1 — stabilization

Implemented on `ui/design-system-polish-2026-09-25`:

- shared motion/touch tokens;
- canonical Arabic font stack in the core universe UI;
- faster routine scene reveal;
- named-property transitions instead of `transition: all`;
- 44×44 mobile back/context/zoom controls;
- neutral Ayah onboarding hint consolidated into one canonical rule;
- restrained pressed feedback;
- regression coverage for Arabic typography, neutral hint styling and mobile target size;
- master-skill rules preventing regressions.

## Pass 2 — polish

Next safe candidates:

- audit remaining typography into a small semantic scale;
- reduce duplicate radius/shadow/blur values into tokens;
- make direct pan/zoom track the pointer without tween lag, while retaining animated reset/mode transitions;
- refine focus/pressed states for touch devices;
- profile backdrop blur and canvas work on mobile;
- remove superseded CSS blocks only after each visual state is protected by a test.

## Pass 3 — deeper spatial UX

After stabilization:

### Constellation wayfinding

Composition and Rhetoric can gain a thin semantic reading rail:
- one vertical thread;
- nodes correspond to verified reading blocks;
- current block receives a restrained light state;
- selecting a node moves to that block;
- it is part of the universe, not a conventional scrollbar.

### Cross-space continuity

When a Quranic word is selected, transitions between Ayah Space, Word Orbit and Root Space should preserve conceptual continuity:
- the selected word remains the visual anchor;
- the destination emerges from that anchor;
- motion explains where the user went;
- do not add extra explanatory cards merely to narrate the transition.

## Non-goals

- no redesign from scratch;
- no removal of the approved neon morphology palette;
- no generic dashboard/card aesthetic;
- no animation for decoration alone;
- no change to Quranic content or linguistic decisions as part of UI polish.
