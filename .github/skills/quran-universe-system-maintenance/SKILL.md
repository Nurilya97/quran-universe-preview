---
name: quran-universe-system-maintenance
description: Maintain the single-repository Quran Universe architecture, generated docs, workflows, source freshness and cross-file synchronization. Use for system audits, process changes, automation, repo cleanup, and sync questions.
---

# Quran Universe system maintenance

## Single-system rule

This repository is the only active control plane and runtime.

Never recreate a mandatory Notion layer, mirror repository, duplicate semantic runtime, or second source registry.

## Before system/process changes

1. Read `docs/SYSTEM.md`.
2. Run/inspect `npm run audit:system`.
3. Identify the canonical owner before changing any generated or duplicated presentation.

## Canonical → generated synchronization

Canonical structured owners:
- `src/data/research/rootRegistry.json`
- `src/data/research/sourceRegistry.json`
- `src/data/research/roadmap.json`
- current code/data registries.

After changing one of these, run:

`npm run sync`

Never hand-edit generated:
- `docs/ROOT_REGISTRY.md`
- `docs/SOURCES_AND_LICENSES.md`
- `docs/ROADMAP.md`
- `docs/SYSTEM_STATUS.md`

CI runs `npm run sync:check` and blocks drift.

## Completion

For repository/system work require:
- `npm run check`
- production build
- latest workflow success when the change reaches main.

Weekly system health monitors stale core-source reviews and upstream skill changes.
