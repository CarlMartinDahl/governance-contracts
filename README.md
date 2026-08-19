# Governance Contracts

Governance Contracts is a Node.js governance and contract workspace for
source-bound human-review structures. It contains JSON schemas, validators,
deterministic derivation helpers, local file-backed persistence, and testable
API-handler modules.

The product direction is deliberately bounded:

1. a governance/no-overclaim kernel; and
2. a future Human Review Workspace for organizing authorized, supplied material
   into review structures and controlled handoff support.

## Status and limits

This repository is not a deployed service or a complete product. It does not
provide an HTTP server, authentication provider, production database, or
authorization to process real private material. It does not make legal,
evidentiary, ownership, credibility, or case-truth conclusions, and it is not
an external-use, public-sector, or release-readiness authorization.
This is not a claim of runtime completeness. Human/professional review remains
the release gate.

The repository does contain tested internal contract and handler seams. Those
seams should not be read as a complete user interface, hosted system, or
production security posture. A host application would need to supply trusted
authentication context and case lookup before invoking the exported handlers.

The canonical product boundary and its non-authorizations are documented in
[the Human Review Workspace public scope boundary](docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_WORKSPACE_PUBLIC_SCOPE_ALIGNMENT_BOUNDARY_v1.md).
The current internal contract and handler inventory is documented in
[API Contracts Governance](docs/API_CONTRACTS_GOVERNANCE_v1.md).

## Synthetic demo

[View the 90-second synthetic fail-closed animatic](https://carlmartindahl.github.io/governance-contracts/).

The demonstrator uses fabricated input to illustrate one narrow contract
boundary. It is not a live case or a deployed product. It does not prove
runtime completeness, verify reviewer authority, make a legal or evidentiary
conclusion, or authorize processing of real private material. Human and
professional judgment remains outside the automation boundary.

## Repository layout

- `schemas/` — machine-readable contracts.
- `packages/schemas/` — validator and schema exports.
- `packages/governance/` — fail-closed governance and derivation helpers.
- `packages/database/` — local JSON-backed snapshot persistence.
- `apps/api/` — exported handler modules, not a listening web server.
- `tests/` — executable contract and regression checks.
- `docs/` — canonical boundaries, contracts, and operating principles.

## Contributor validation

Requires Node.js 22.x, matching the CI workflow.

```sh
npm ci --ignore-scripts
npm test
npm run lint
npm run build
npm run release:scan
```

`npm run lint` is currently a bootstrap check that the required scripts exist,
and `npm run build` verifies the required repository paths. They are baseline
repository checks, not a compiler or full static-analysis signal.

## Local data boundary

The development persistence adapter writes JSON snapshots under
`.tmp/database` by default. That directory is ignored by Git. Do not place
real private, legal, evidentiary, or sensitive material there. Integration
hosts and tests should provide an explicit storage directory where needed.

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md) and the repository rules in
[AGENTS.md](AGENTS.md) before proposing a change. Documentation and schemas
are contract sources of truth; runtime behavior must not silently outrun them.

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
