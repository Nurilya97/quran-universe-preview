---
name: graphify
description: Use for repo-wide architecture questions, dependency/data-flow tracing, impact analysis, and locating shared owners before broad edits. Prefer an existing graphify-out graph when present. Project authority remains AGENTS.md and the Quran Universe skill.
license: Apache-2.0
source: Graphify-Labs/graphify
source_commit: 20a20d30d8e7eef77675651f0199d87f913bd3e7
---

# Graphify for Quran Universe

Graphify is a structural map, not a semantic authority.

## When to use

Use before:
- broad refactors touching several components/data files;
- tracing where one canonical fact is duplicated;
- understanding data flow from canonical data → adapters → UI;
- CSS/component cleanup where old overrides may still affect the result;
- impact analysis before moving source registries or shared helpers.

## Fast path

If `graphify-out/graph.json` exists, query that graph first instead of
re-reading the whole repository.

Useful commands in a shell-capable environment:

```bash
graphify query "where is taqwa data defined and rendered?"
graphify path "canonicalWqy" "WordDetails"
graphify explain "content-guard"
```

## Build/update

Official package: `graphifyy` (double y), CLI: `graphify`.

Project install in a shell-capable environment:

```bash
uv tool install graphifyy
graphify agents install --project
graphify .
```

For code-only structural mapping, Graphify's AST pass is local/deterministic.
Do not assume inferred graph edges are facts: preserve EXTRACTED / INFERRED /
AMBIGUOUS confidence.

## Quran Universe boundaries

Graphify may tell us where data flows, but it may not decide:
- Quranic meaning;
- root/morphology correctness;
- source priority;
- canonical vs research-only status;
- whether a user-approved UI may be redesigned.

Those remain governed by the Quran Universe skill and `AGENTS.md`.

## Update rule

After significant architecture changes, update/rebuild the graph before using
it for impact analysis again.
