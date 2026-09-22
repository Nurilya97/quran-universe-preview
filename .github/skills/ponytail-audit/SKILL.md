---
name: ponytail-audit
description: Whole-repo audit for over-engineering and stale duplicate implementation. Use before cleanup/refactors, but never override Quran Universe canonical semantics.
license: MIT
source: DietrichGebert/ponytail
---

# Ponytail repo audit

Rank the biggest safe simplifications first.

Hunt especially for:
- duplicate registries and constants;
- stale CSS overrides from superseded iterations;
- wrappers with one caller that add no semantic boundary;
- unused flags/config;
- duplicated validation that belongs in the central content guard;
- dead code left by prototype iterations.

Before flagging deletion, verify that the code is not:
- an approved canonical data distinction;
- source provenance;
- a deployment/data invariant;
- a mobile/desktop accessibility rule;
- an intentional research-layer separation.

End with a concrete cleanup order, not an invented line-savings claim.
