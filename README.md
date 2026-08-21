# Governance Contracts

Fail-closed governance contracts, JSON schemas, and tested Node.js seams for
source-bound human-review workflows.

Governance Contracts is a contract-first workspace for organizing explicit
boundaries around sensitive review processes. It contains machine-readable
schemas, validators, deterministic governance helpers, local development
persistence, and host-invoked API-handler modules.

## Synthetic demo

[View the 90-second synthetic fail-closed animatic](https://carlmartindahl.github.io/governance-contracts/).

The demonstrator uses fabricated input to illustrate one narrow contract
boundary. It is not a live case or a deployed product. It does not prove
runtime completeness, verify reviewer authority, make a legal or evidentiary
conclusion, or authorize processing of real private material. Human and
professional judgment remains outside the automation boundary.

## Why

Legally sensitive human-review workflows may involve incomplete, contested,
private, or traumatic material. Automation in those settings needs explicit
limits for provenance, uncertainty, review scope, and decision authority.

One motivating domain is the structured review of material concerning
psychological violence, psychological abuse, and coercive control. This
repository does not determine whether psychological violence occurred, assess
legal admissibility, produce legal findings, or replace courts, legal counsel,
investigators, or other qualified professionals.

The product direction remains deliberately bounded:

1. a governance/no-overclaim kernel; and
2. a future Human Review Workspace for organizing authorized, supplied material
   into review structures and controlled handoff support.

## What is here now

- Canonical documentation and JSON schemas for bounded contract surfaces.
- Repository-local schema and validator exports for Node.js.
- Deterministic governance and derivation helpers with explicit fail-closed
  outcomes where their contracts require them.
- Local file-backed snapshot persistence for development and synthetic use.
- Testable handler modules that require a host application to provide trusted
  authentication context and case lookup.
- Executable contract tests, CI evidence, and a public-release boundary scan.

These are tested internal seams, not a hosted application or a published npm
package.

## Scope and non-authorizations

This repository is not a deployed service or a complete product. It does not
provide an HTTP server, authentication provider, production database, or
authorization to process real private material. It does not make legal,
evidentiary, ownership, credibility, or case-truth conclusions, and it is not
an external-use, public-sector, or release-readiness authorization.

This is not a claim of runtime completeness; human/professional review remains
the release gate. The repository's tested seams should not be read as a complete
user interface, hosted system, or production security posture.

The canonical product boundary and its non-authorizations are documented in
[the Human Review Workspace public scope boundary](docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_WORKSPACE_PUBLIC_SCOPE_ALIGNMENT_BOUNDARY_v1.md).
The current internal contract and handler inventory is documented in
[API Contracts Governance](docs/API_CONTRACTS_GOVERNANCE_v1.md).

## Quick start

Requires Node.js 22.x and npm.

```sh
git clone https://github.com/CarlMartinDahl/governance-contracts.git
cd governance-contracts
npm ci --ignore-scripts
node --test tests/public-synthetic-demo-boundary.test.js
```

The focused command checks that the tracked demonstrator is self-contained,
uses fabricated input, reproduces its displayed failure through the tracked
validator, and preserves the human-review boundary. It does not establish
runtime completeness or release readiness.

## Architecture

The repository does not implement one universal request pipeline. Its main
responsibility boundaries are:

1. Documentation defines the intended contract and its non-authorizations.
2. JSON schemas provide machine-readable contract shapes.
3. Validators and governance helpers enforce or derive individual bounded
   seams.
4. Handler modules expose host-invoked operations; the host must supply trusted
   authentication context and case lookup.
5. The development persistence adapter stores local snapshots where a seam
   requires them.
6. Human or professional decisions remain outside the automation boundary.

Different operations use different subsets of these components. Documentation
and schemas are contract sources of truth; runtime behavior must not silently
outrun them.

## Repository layout

- `schemas/` - machine-readable contracts.
- `packages/schemas/` - repository-local validators and schema exports.
- `packages/governance/` - fail-closed governance and derivation helpers.
- `packages/database/` - local JSON-backed snapshot persistence.
- `apps/api/` - exported handler modules, not a listening web server.
- `tests/` - executable contract and regression checks.
- `docs/` - canonical boundaries, contracts, and operating principles.

## Full contributor validation

The CI workflow runs the following checks with Node.js 22.x:

```sh
npm ci --ignore-scripts
npm audit --omit=dev
npm run release:scan
npm test
npm run lint
npm run build
```

`npm run lint` is currently a bootstrap check that the required scripts exist,
and `npm run build` verifies the required repository paths. They are baseline
repository checks, not a compiler or full static-analysis signal. Passing CI
is technical evidence, not release approval or runtime certification.

## Start here

- Read [Start here](00_START_HERE.md) for the canonical repository read order.
- Read [the Human Review Workspace public scope boundary](docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_WORKSPACE_PUBLIC_SCOPE_ALIGNMENT_BOUNDARY_v1.md)
  for the public product boundary and its non-authorizations.
- Read [API Contracts Governance](docs/API_CONTRACTS_GOVERNANCE_v1.md) for the
  current contract and handler inventory.
- Read the applicable schema, implementation module, and test before changing a
  seam.

## Local data boundary

The development persistence adapter writes JSON snapshots under
`.tmp/database` by default. That directory is ignored by Git. Do not place
real private, legal, evidentiary, or sensitive material there. Integration
hosts and tests should provide an explicit storage directory where needed.

## Contributing and governance

Read [CONTRIBUTING.md](CONTRIBUTING.md) and the repository rules in
[AGENTS.md](AGENTS.md) before proposing a change. See
[CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) for community expectations and
[SUPPORT.md](SUPPORT.md) for the public support boundary.

## Public release boundary

This repository begins with a fresh public root commit. Private development
history, private review material, launch strategy, branches, pull requests,
issues, releases, build artifacts, and local paths are intentionally excluded.
Opaque pre-publication lineage labels that remain inside contract fixtures are
non-resolvable identifiers, not links to public history.

## License and security reporting

The source is licensed under [Apache License 2.0](LICENSE). Report suspected
vulnerabilities privately through the process in [SECURITY.md](SECURITY.md).
Do not place credentials, personal data, private case material, or exploit
details in public issues.
