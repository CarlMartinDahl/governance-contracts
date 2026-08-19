# Contributing

Thank you for helping improve Governance Contracts.

## Before changing a seam

1. Start at the Git root and inspect `git status --short --branch`.
2. Read `AGENTS.md`, the applicable document in `docs/`, schema, source module,
   and focused tests.
3. Keep the change to one verified seam. Do not infer legal, evidentiary,
   privacy, or security semantics that are not explicitly documented.
4. Do not add real private, legal, evidentiary, or sensitive material to the
   repository, test fixtures, issue reports, or generated local storage.

## Validation

Run the repository baseline checks before opening a pull request:

```sh
npm ci --ignore-scripts
npm test
npm run lint
npm run build
npm run release:scan
```

The repository uses a fail-closed posture. A passing local check is not release
approval or authorization for external use.

## Reporting concerns

Do not publish credentials, personal data, private case material, or detailed
security concerns in a public issue. Use the private reporting route described
in `SECURITY.md`.
