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


## Automatic synchronization

Canonical structured registries generate their human-readable documentation with `npm run sync`. CI runs `npm run sync:check`, so generated docs cannot silently drift from JSON owners.

`npm run audit:system` validates single-repository authority, product-root registration, source/adaptor freshness, skill wiring, workflow topology, and absence of legacy runtime dependencies.

A weekly `system-health.yml` run performs the full system check, production build, browser contracts, upstream skill watch, core-source freshness watch, and QAMAR release watch. Findings create/update one GitHub maintenance issue instead of silently mutating research data.

Dependabot watches npm and GitHub Actions dependencies weekly. Third-party agent skills are intentionally not auto-replaced: upstream changes are detected automatically, then pass the skill-security review before adoption.

## Security contour

Security is repository-native and additive to the existing Quran/content guards. CodeQL, dependency review, npm audit, immutable Action SHAs, CSP, external-data quarantine, secret/injection checks, CODEOWNERS and the critical-data tamper baseline are documented in `docs/SECURITY.md`.

External datasets never enter canonical paths directly: downloads are quarantined and verified first. Critical Quran/research data changes intentionally require both the ordinary content guards and a reviewed tamper-baseline update.
