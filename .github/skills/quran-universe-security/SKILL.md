---
name: quran-universe-security
description: Protect Quran Universe dependencies, GitHub Actions, external datasets, HTML/script surfaces, secrets, deployment, and critical Quran data from supply-chain, injection, credential, workflow and tampering risks.
---

# Quran Universe security

Use this skill whenever a change touches dependencies, package manifests/lockfiles, `.github/workflows/**`, external downloads/datasets, HTML/script injection surfaces, secrets/credentials, deployment, or critical Quran/research data.

## Authority and scope

Security protects the approved Quran Universe system; it does not redefine Quran semantics or research authority.

Order of authority remains:
1. latest explicit user instruction;
2. `AGENTS.md` and the Quran Universe skill;
3. approved canonical Quran/research data and UI;
4. this security process.

## Required gates

1. Prefer no new dependency when platform or standard-library features are enough.
2. Pin every GitHub Action to an immutable 40-character commit SHA. Keep the human-readable version in a comment.
3. Give workflows explicit least-privilege `permissions`. Do not add `write-all`, `pull_request_target`, or `workflow_run` without a separate security design and explicit review.
4. Run `npm run security:deps` for dependency vulnerabilities.
5. Run `npm run security:static` for workflow pins, CSP, injection primitives, obvious committed secrets, external-data policy and critical-data tamper checks.
6. Run the ordinary `npm run check` and production build after security gates.

## External data quarantine

External corpora and datasets are untrusted until verified.

Required order:
`HTTPS download → host allowlist → max size → magic/type check → SHA-256 → integrity manifest → manual/source review → only then ingestion`.

- Use `scripts/quarantine-download.mjs`; never direct-download corpus data into canonical paths.
- An entry with no approved SHA remains quarantine-only.
- A hash mismatch is a hard stop, not an automatic update.
- Never promote a quarantined source into canonical data because a workflow downloaded successfully.
- QAMAR remains quarantine-only until the actual corpus release and its licence/hash are verified.

## Critical Quran data

`src/data/research/securityBaseline.json` protects the reviewed critical data surface.

A mismatch must stop CI. Update the baseline only in the same reviewed change that intentionally changes the protected Quran/research data, after checking provenance, counts, IDs and review status.

## HTML and XSS

- Keep `script-src` free of `'unsafe-inline'` and `'unsafe-eval'`.
- Do not use `dangerouslySetInnerHTML`, direct `innerHTML =`, `eval`, `new Function`, or `document.write` without an explicit security review and sanitization design.
- Because GitHub Pages cannot provide project-defined response headers, the current CSP is delivered by a meta tag. If hosting changes, move CSP to HTTP headers and add header-only controls such as `frame-ancestors`.

## Secrets

Never commit tokens, passwords, private keys or credentials, including examples copied from incidents. Use GitHub secrets/environment configuration instead.

GitHub platform secret scanning is an additional layer, not a replacement for repository checks.

## Completion

Do not say a security change is complete until the newest PR/commit checks have run and the relevant CodeQL, dependency review, security audit, integrity/content checks and build results have been inspected.
