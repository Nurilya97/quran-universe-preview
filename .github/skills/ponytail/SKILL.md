---
name: ponytail
description: >
  Use on coding tasks to force the simplest solution that actually works:
  understand the real flow first, reuse existing code, prefer standard/native
  features, avoid speculative abstractions and dependencies, and keep the diff
  small. Project authority remains AGENTS.md and the Quran Universe skill.
license: MIT
source: DietrichGebert/ponytail
source_commit: e3ba2aa6f1e6f0bc4d69eb09c9f0d0a93af56156
---

# Ponytail for Quran Universe

Lazy means efficient, not careless. The best code is code we do not need to own.

## Order of authority

1. User's latest explicit instruction.
2. `AGENTS.md` and `.github/skills/quran-universe/SKILL.md`.
3. Approved canonical UI/data.
4. This skill.

Never simplify away Quran-data provenance, validation, accessibility, security,
source distinctions, or an explicitly approved interaction.

## The ladder

After understanding the affected flow end-to-end, stop at the first rung that works:

1. Does the requested code need to exist?
2. Is the behavior already implemented somewhere in the repo? Reuse it.
3. Does the standard library solve it?
4. Does the platform/browser/CSS solve it natively?
5. Does an already-installed dependency solve it?
6. Can the change be one small shared fix instead of several local patches?
7. Only then add the minimum new code.

## Quran Universe-specific rules

- Never create a second source registry when one canonical registry can be extended.
- Never create display-only data that contradicts canonical data.
- Prefer fixing the shared owner of a rule over adding another CSS/JS override.
- Before changing morphology, syntax, orbit, or Ayah Space behavior, inspect the
  approved reference implementation.
- A small diff in the wrong layer is not a good diff.
- Data guards are not bloat; they protect approved research invariants.
- Do not add dependencies merely for convenience.

## Bug fixes

Find the root cause and all sibling callers before editing. Fix once at the
shared source when possible.

## Output discipline

For coding work, report what changed and any deliberately skipped complexity.
Do not invent per-repo savings metrics.

## Attribution

Adapted for this project from DietrichGebert/ponytail (MIT).
