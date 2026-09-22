---
name: webapp-testing
description: Use for Quran Universe UI verification with Playwright: reproduce UI bugs, inspect rendered state, capture screenshots, and verify approved mobile/desktop layouts before claiming a visual fix.
license: Apache-2.0
source: anthropics/skills
source_commit: 34040c9c568585f6929bedeaad110ad08f079624
---

# Webapp testing for Quran Universe

Adapted from Anthropic's webapp-testing skill for this repository.

## Authority

The latest user-approved UI and `AGENTS.md` are the visual specification.
Screenshots are evidence, not a license to redesign.

## Workflow

For dynamic UI bugs:

1. Reproduce the exact page/state first.
2. Wait until the rendered app is stable.
3. Capture the target viewport.
4. Inspect rendered DOM only after the page has settled.
5. Compare against the approved reference screen/state.
6. Make the smallest code change.
7. Repeat the same screenshot/interaction.
8. Do not claim the visual issue is fixed until the fresh run confirms it.

## Quran Universe reference states

Prioritize regression coverage for:
- taqwā word/root morphology;
- ل ب ب Root Space;
- Ayah Space 2:197;
- mobile layouts first, then desktop.

When a user supplies a screenshot of an approved state, treat it as the baseline
for the requested visual behavior.

## Playwright guidance

Prefer role/text/test-id selectors over brittle layout selectors.
Use a real browser rendering path for:
- connector geometry;
- orbit spacing;
- RTL/Arabic rendering;
- overlays/cards;
- responsive/mobile breakpoints;
- keyboard/focus behavior.

If Playwright is not already installed, do not add it merely to answer a code
question. Add it when visual regression tests are actually being established.

## Visual regression

When baselines exist, a changed screenshot means "investigate", not
automatically "update baseline".

Update a baseline only when the user explicitly approved the corresponding UI
change.

## Completion gate

A successful build alone does not prove a visual fix. For visual work require:
- fresh browser render;
- target viewport check;
- no unexpected change to approved reference screens;
- successful latest deployment before reporting the public site as live.
