# Quran Universe — single-system architecture

As of 2026-11-04, **Nurilya97/quran-universe-preview is the only active application/runtime repository.** Google Drive / AI_WORKSPACE / `3_KNOWLEDGE/QURAN_RESEARCH` is the canonical owner of authored research methodology and reviewed semantic research notes ([research index](https://drive.google.com/file/d/1NmUdPOeHmoTwbKibnq2zfGWwYftbsPEB/view)). Drive is a knowledge store, not a second runtime/control plane.

## What lives here

- product UI and approved visual language;
- canonical Quran Universe IDs and Ayah Space schema;
- morphology and root/word data used by the product;
- reviewed machine-readable runtime research records that materially affect product meaning, with provenance;
- source/licence registry;
- cross-corpus adapters and pilot evidence;
- content guards, browser contracts, CI and GitHub Pages deployment;
- roadmap and project rules.

## What no longer exists as an authority

The former Notion Quran Universe control plane and the former private repository `Nurilya97/research-by-heart-viz` are legacy archives only. They must never be required for ordinary work. Historical material may be recovered only when a specific unanswered research question requires it.

## Authority order

1. Latest explicit user instruction.
2. `AGENTS.md` and the Quran Universe project skill.
3. Drive-authored research methods/semantic decisions, and separately reviewed structured runtime data in this repository.
4. Current implementation and tests in this repository.
5. External sources as evidence, with provenance and licence rules.
6. Legacy history only when explicitly needed.

## Simplicity rule

Do not recreate a second control plane, mirror repository or duplicate semantic runtime. Facts necessary for self-contained build/validation must be serialized in this repository with review status and provenance. Research methodology and authored semantic decisions are maintained in the Drive research knowledge base and must not be silently changed by runtime tooling.


## Automatic synchronization

Canonical structured registries generate their human-readable documentation with `npm run sync`. CI runs `npm run sync:check`, so generated docs cannot silently drift from JSON owners.

### Live preview authority

`main` is the only branch allowed to deploy the public GitHub Pages site. Design or experiment branches may run checks and generate evidence, but they must not own a competing Pages deployment or publish an archived baseline over the live root.

The design branch may mirror `main` when useful for visual work, but the live URL always follows `main`.

`npm run audit:system` validates single-repository authority, product-root registration, source/adaptor freshness, skill wiring, workflow topology, and absence of legacy runtime dependencies.

A weekly `system-health.yml` run performs the full system check, production build, browser contracts, upstream skill watch, core-source freshness watch, and QAMAR release watch. Findings create/update one GitHub maintenance issue instead of silently mutating research data.

Dependabot watches npm and GitHub Actions dependencies weekly. Third-party agent skills are intentionally not auto-replaced: upstream changes are detected automatically, then pass the skill-security review before adoption.

## Security contour

Security is repository-native and additive to the existing Quran/content guards. CodeQL, dependency review, npm audit, immutable Action SHAs, CSP, external-data quarantine, secret/injection checks, CODEOWNERS and the critical-data tamper baseline are documented in `docs/SECURITY.md`.

External datasets never enter canonical paths directly: downloads are quarantined and verified first. Critical Quran/research data changes intentionally require both the ordinary content guards and a reviewed tamper-baseline update.
