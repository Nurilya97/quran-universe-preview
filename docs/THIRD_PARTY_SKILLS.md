# Third-party agent skills

This repository includes project-scoped adaptations of external agent skills.

## Ponytail

Source: https://github.com/DietrichGebert/ponytail

License: MIT

Project copies:
- `.github/skills/ponytail/SKILL.md`
- `.github/skills/ponytail-review/SKILL.md`
- `.github/skills/ponytail-audit/SKILL.md`

The project versions are adapted so Quran Universe canonical data, provenance,
validation, accessibility, and the user's approved UI always take precedence
over generic minimization.

## Graphify

Source: https://github.com/Graphify-Labs/graphify

License: Apache-2.0

Project integration:
- `.github/skills/graphify/SKILL.md`

The project skill is a lightweight integration guide. The Graphify runtime
itself is not vendored into this repository; its official package is
`graphifyy` and the CLI is `graphify`.

## Anthropic Webapp Testing

Source: https://github.com/anthropics/skills/tree/main/skills/webapp-testing

License: Apache-2.0. The Quran Universe project copy is an adapted workflow, not a verbatim vendoring of helper scripts.

## Superpowers · systematic debugging / verification before completion

Source: https://github.com/obra/superpowers

License: MIT. Project copies are shortened/adapted to Quran Universe's authority and deployment rules.

## Skill Security Auditor

Source: https://github.com/alirezarezvani/claude-skills/tree/main/engineering/skills/skill-security-auditor

License: MIT. Project copy is a narrowed static-review workflow; upstream scripts are not vendored.
