# Quran Universe — single-system architecture

As of 2026-09-22, **Nurilya97/quran-universe-preview is the only active source of truth and the only active runtime repository.**

## What lives here

- product UI and approved visual language;
- canonical Quran Universe IDs and Ayah Space schema;
- morphology and root/word data used by the product;
- reviewed research-control records that materially affect product meaning;
- source/licence registry;
- cross-corpus adapters and pilot evidence;
- content guards, browser contracts, CI and GitHub Pages deployment;
- roadmap and project rules.

## What no longer exists as an authority

The former Notion Quran Universe control plane and the former private repository `Nurilya97/research-by-heart-viz` are legacy archives only. They must never be required for ordinary work. Historical material may be recovered only when a specific unanswered research question requires it.

## Authority order

1. Latest explicit user instruction.
2. `AGENTS.md` and the Quran Universe project skill.
3. Structured canonical/research data in this repository.
4. Current implementation and tests in this repository.
5. External sources as evidence, with provenance and licence rules.
6. Legacy history only when explicitly needed.

## Simplicity rule

Do not recreate a second control plane, mirror repository, duplicate semantic runtime, or external mandatory state store. If a fact is required to build or validate the product, it belongs in this repository.
