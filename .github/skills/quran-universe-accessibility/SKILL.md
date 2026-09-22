---
name: quran-universe-accessibility
description: Use when reviewing or changing Quran Universe interactive UI, especially Arabic/RTL word cards, clickable grammar terms, overlays, navigation, focus, contrast, and mobile interactions.
---

# Quran Universe accessibility

## Scope

Check accessibility without changing the approved visual language unless a fix
is necessary.

## Required checks

For changed interactive UI verify:
- Arabic text keeps `lang="ar"` and appropriate RTL direction;
- transliteration keeps `lang="ar-Latn"` and LTR direction;
- clickable grammar terms are keyboard reachable;
- focus is visible and not trapped behind overlays;
- buttons/links have accessible names;
- non-text meaning is not conveyed by color alone;
- orbit/star/connector visuals have text explanations where they encode meaning;
- reduced-motion users are not forced through unnecessary animation;
- mobile tap targets remain usable;
- contrast is sufficient for functional text and controls.

## Automation

When Playwright + axe are installed, run automated checks as a first pass.
Automated accessibility results never replace manual keyboard and semantic
review.

Do not add axe as a dependency until the project is actually establishing the
browser/a11y test suite.
