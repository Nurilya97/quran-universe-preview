---
name: systematic-debugging
description: Use for any Quran Universe bug, visual regression, build failure, stale-data mismatch, or unexpected behavior before proposing a fix. Find root cause first, then change one thing.
license: MIT
source: obra/superpowers
---

# Systematic debugging

Adapted from obra/superpowers.

## Core rule

No fix without root-cause investigation first.

## Process

1. Reproduce the problem consistently.
2. Read the complete error/output and inspect the affected current implementation.
3. Check recent changes that touch the same flow.
4. Trace data/CSS/component flow backward to the shared owner.
5. Find a working approved example in the repo and compare it completely.
6. State one concrete hypothesis.
7. Test the smallest possible change.
8. Verify the original symptom after the change.

Do not stack speculative fixes.

## Quran Universe-specific signals

If the user says:
- "ты опять поменял";
- "как в taqwā";
- "этого не было";
- "почему снова";
- "не вижу изменений";

treat that as evidence of either:
- a stale/competing rule;
- wrong canonical owner;
- browser/deployment cache mismatch;
- an unverified assumption.

Check those before adding new CSS or new data.

After three failed fixes, stop adding patches and inspect the architecture or
conflicting rule set.
