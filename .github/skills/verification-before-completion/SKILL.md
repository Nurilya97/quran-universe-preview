---
name: verification-before-completion
description: Use immediately before saying Quran Universe work is done, fixed, live, deployed, passing, or visually correct. Requires fresh evidence in the current task.
license: MIT
source: obra/superpowers
---

# Verification before completion

Adapted from obra/superpowers.

## Rule

No completion claim without fresh verification evidence.

Before saying "готово", "исправлено", "live", "published", or equivalent:

1. Identify what proves the claim.
2. Run/check it fresh.
3. Read the result.
4. State the actual status.
5. Only then make the success claim.

## Quran Universe gates

For data/content changes:
- content guard passes;
- build passes.

For deployment:
- newest workflow run for the newest commit is `completed` + `success`.

For visual changes:
- build success is not enough;
- the target browser state/viewport must also be checked when a visual test path is available.

For source/data changes:
- source IDs resolve;
- canonical and presentation data agree;
- no unsupported source status is promoted to "verified".

Never infer success from an older workflow run.
