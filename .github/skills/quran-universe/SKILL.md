---
name: quran-universe
description: Work safely and consistently on the Quran Universe repository. Use for Quran data, roots, morphology, Ayah Space, Root Galaxy, source integration, canonical mappings, UI changes, and deployment checks. Preserves approved Quran-first semantics and canonical UI instead of reinterpreting them.
---

# Quran Universe workflow

## Before editing

1. Read `AGENTS.md`.
2. Read `docs/DATA_ARCHITECTURE.md` for any data, corpus, word-ID, morphology, syntax, source, or Ayah Space task.
3. Identify the authority for the requested change:
   - Quran/canonical research data;
   - derived presentation data;
   - UI/component;
   - CSS/layout;
   - deployment/CI.
4. Inspect the current approved implementation before changing a repeated visual pattern.

## Canonical-first rule

Do not duplicate a fact into multiple files when one canonical source can feed the others.

For Quran data:
- Quran Universe IDs are primary.
- External corpus IDs are mappings, never primary keys.
- Preserve source provenance.
- Never infer that two corpora share segmentation merely because their word counts are close.
- Quranic usage is the first semantic authority under the project's approved methodology.
- Classical lexicons and external datasets support and test the model; they do not silently replace it.

## Approved UI rule

When the user says an existing screen or word is the reference, reproduce that implementation rather than designing a similar alternative.

Current approved morphology reference: taqwā.

Do not redesign unrelated screens. The latest explicit user correction overrides older notes.

## Change workflow

1. Read the exact files that currently own the data or UI.
2. Check for stale duplicate rules before adding new ones.
3. Make the smallest coherent change.
4. Update project invariants in `AGENTS.md` only when the user has explicitly approved the rule.
5. Run `npm run sync` when canonical research registries changed.
6. Run `npm run check` so generated docs, system architecture and content invariants are all verified.
7. Run the production build.
8. Inspect the GitHub Actions result.
9. Never say "deployed", "live", or "готово" until the newest workflow run completes successfully.
10. Provide the build-specific Pages URL after success.

## Data audit checklist

For every new root/word/ayah/source:
- stable canonical ID;
- root/orbit exists;
- morphology profile exists for every visible form;
- Quran occurrence IDs resolve to a registered form;
- source IDs resolve to a source definition;
- fallback cards preserve the word's own source;
- Quran-attested and lexical-only status are not mixed;
- morphology and word-content patterns agree;
- Ayah Space token links resolve to registered words;
- reconstructed stages are labelled as reconstructions, not lexical words;
- research-only or historical layers remain visibly separate from canonical/traditional layers.

## Visual safety

Before changing morphology connectors, orbit geometry, or approved Ayah Space layouts, inspect the existing CSS and component that renders the accepted version.

Avoid adding another override when an older conflicting rule should be removed or consolidated.
