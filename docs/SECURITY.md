# Quran Universe security model

Quran Universe is a static React/Vite site on GitHub Pages. It has no application backend, login system or user database. The main security boundary is therefore supply-chain integrity, workflow/deployment integrity, external Quran-data provenance, XSS prevention and protection of reviewed canonical/research data.

## Automated controls

- CodeQL scans JavaScript on pull requests, main and weekly.
- Dependency Review checks dependency changes on pull requests.
- `npm audit --audit-level=high` blocks high/critical known dependency vulnerabilities in PR, main deployment and weekly health/security workflows.
- All GitHub Actions are pinned to immutable commit SHAs.
- `scripts/security-audit.mjs` checks workflow pins/permissions, dangerous triggers, CSP, unsafe HTML/script primitives, obvious committed secrets and external-data policy.
- `scripts/tamper-guard.mjs` protects reviewed Quran/data files against accidental unreviewed changes.
- External datasets are downloaded only through `scripts/quarantine-download.mjs`, which enforces HTTPS, host allowlists, size limits, file magic and SHA-256 manifests.
- Tafsir Center's current pilot database is pinned to SHA-256 `10e61f615ab5e6a3440e8ecc8ba1dc2273d12cd9048752760fe53a44d191cc27`.
- QAMAR's ACL supplement is quarantine-only until an approved hash for an actual corpus release and corpus-specific licence are established.
- CODEOWNERS marks workflows, security controls and critical Quran data for owner review.

## CSP limitation on GitHub Pages

The main document uses a CSP meta tag. It blocks non-self scripts and unsafe script evaluation while allowing inline styles required by the current React UI. GitHub Pages does not let this repository define arbitrary HTTP response headers, so header-only directives such as `frame-ancestors` and HSTS must be added if hosting moves behind a configurable server or CDN.

## Repository settings still required

Repository-level branch protection/rulesets are not stored in this codebase. For `main`, enable a GitHub ruleset that requires pull requests, CODEOWNERS review, passing CodeQL/dependency-review/security/integrity checks, blocks force-pushes/deletion, and prevents bypass except for deliberate emergency administration.

Public-repository secret scanning is an additional GitHub platform layer, but push-protection and ruleset configuration remain repository/account controls rather than files in this repository.
