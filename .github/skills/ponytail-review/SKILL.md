---
name: ponytail-review
description: Review a diff for unnecessary complexity and duplicate implementation after correctness/domain review. Quran Universe canonical rules take precedence.
license: MIT
source: DietrichGebert/ponytail
---

# Ponytail review

Review only for complexity after correctness and Quran Universe data integrity are established.

Look for:
- duplicate source/data registries;
- another override where an old conflicting rule should be removed;
- one-off abstractions with one implementation;
- new dependencies for native/stdlib behavior;
- repeated local guards that belong in one shared owner;
- dead compatibility code from superseded UI iterations.

Format findings as:
`<file>: <delete|native|stdlib|yagni|shrink>: <what to simplify> → <replacement>`

Never recommend removing:
- content/data guards;
- provenance fields;
- accessibility basics;
- canonical distinctions between Quranic, lexical-only, research-only, or reconstructed data.
