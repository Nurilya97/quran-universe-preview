---
name: quran-universe-source-refresh
description: Review or update Quran Universe external-source status, licences, dataset availability, source adapters, and freshness metadata without silently promoting unverified data.
---

# Source refresh

Use when an external corpus, lexicon, API, licence, or publication may have changed.

## Process

1. Verify the official source, exact dataset/release and licence/terms.
2. Update `src/data/research/sourceRegistry.json`.
3. Update a runtime/source adapter only if row/schema access was actually verified.
4. Never change a source from pending to mapped based on a paper, mirror, or another corpus's coordinates.
5. Preserve exact provenance and source-specific segmentation.
6. Run `npm run sync` and `npm run check`.

## Automated watch

The weekly health workflow only detects likely changes and overdue reviews. It must not overwrite research/source decisions automatically.

Third-party agent skills are also watch-only: an upstream change requires the skill-security audit before the pinned project adaptation is updated.
