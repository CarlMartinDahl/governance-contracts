# AGENTS.md

## Purpose
This repo is operated fail-closed.
The goal is high-trust, low-drift, reviewable incremental work.

## Repo truth hierarchy
1. Docs/specs are the product and contract source of truth.
2. Schemas are the machine-readable contract truth.
3. Tests are living proof.
4. Runtime code must not silently outrun docs/contracts/tests.

## Core operating rules
- Always choose the smallest safe next slice.
- Never broaden scope without explicit evidence.
- Never guess semantics, mappings, or policy.
- If contracts are not concrete enough, freeze the boundary instead of implementing behavior.
- Prefer prove-only audits before implementation when scope is uncertain.
- Preserve existing runtime behavior unless the requested slice explicitly changes runtime behavior.
- Fail closed when there is ambiguity.

## Repo-wide governance axioms
- Git guard first; live repo root, branch, HEAD, git status, tracked docs, and
  tracked tests control over handoff text, old start prompts, chat summaries,
  local memory, or advisory background.
- Every slice must state what it does and what it does not create, including
  implementation, runtime behavior, approvals, sign-offs, conclusions, findings,
  severity, remediation, blocker resolution, product candidate, external-use,
  raw/private/source inspection, metadata acquisition, real private runs, and
  domain-specific reopening risks.
- Default posture: smallest safe next slice, fail closed on ambiguity,
  docs/contracts before runtime, tests prove only what they explicitly prove,
  pause is a valid outcome, human/professional review remains release gate, and
  product candidate or external-use requires separate explicit authorization.
- Security-agent/governance-navigator posture remains advisory only; it helps
  identify the smallest safe next step but does not decide, approve, certify,
  resolve blockers, create findings, assign severity, recommend remediation,
  select product candidate, authorize external-use, or authorize implementation.

## Work modes

### PROVE_ONLY
Use when auditing, verifying, or selecting the next slice.

Rules:
- no file changes
- no branch creation
- no commit
- no hidden scope expansion

### DOCS_ONLY
Use for canonical freezes, prerequisites, seam partitioning, and boundary clarification.

Rules:
- docs + one focused proof test only
- no runtime changes
- no schema changes unless the task explicitly requires it

### CONTRACT_ONLY
Use for schema/export/alignment work that should not alter runtime behavior.

Rules:
- docs/schemas/package exports/tests only
- no behavior drift
- no legal-rule expansion

### RUNTIME_CHANGE
Use only when explicitly requested or when the current slice clearly requires it.

Rules:
- isolate scope tightly
- prove necessity first
- preserve all unaffected seams

## Branch discipline
- Never work on `main`.
- Create one narrow branch per slice.
- Keep worktree clean before starting.
- One commit maximum per slice unless explicitly justified.
- Commit only after validations pass.

## Nested-repo / workspace guard
This repo must be operated from its actual Git project root, resolved with:
`git rev-parse --show-toplevel`

Before meaningful work:
- verify `git rev-parse --show-toplevel`
- verify `git status --short --branch`

If the UI/workspace root disagrees with git root, stop and report.
Do not continue on a parent repo.
Do not continue on `main` when the intended slice branch exists elsewhere.

## Validation requirements
Run after any change unless the task is prove-only:
- `npm test`
- `npm run lint`
- `npm run build`

## Thin-seam discipline
For thin route seams:
- latest-read must stay distinct from refresh
- refresh must stay distinct from delivery
- delivery must stay distinct from derivation/rebuild
- shared `snapshot_status` currentness remains a separate seam
- shared API error-envelope remains a separate seam

## Shared-seam discipline
For shared internal seams:
- keep export scaffold, validation helper, reconstruction helper, validator dispatch,
  governance adapter dispatch, and registry seams separate
- do not merge adjacent seams conceptually
- document aliases explicitly where one seam serves another surface

## Save modes

### OFF
Use for prove-only audits.

### COMMIT_ONLY
Use for implementation slices.

Rules:
- commit exactly once if and only if validations pass
- do not push
- do not open a PR

## Human release gate
Codex is the build engine.
Human review remains the release gate.
Do not treat local green checks as release approval.
Independent agent review does not replace human owner approval.

## Required response format
Unless the user asks otherwise, return only:
1. concise change summary
2. files changed
3. test/lint/build outcomes
4. blockers or missing user input
5. whether the governing skill/check was used
6. short commit hash if a commit was created
7. which branch you ended on

## Planning rule
For hard or ambiguous tasks:
- restate the exact seam
- restate what is outside scope
- restate whether this is PROVE_ONLY, DOCS_ONLY, CONTRACT_ONLY, or RUNTIME_CHANGE
- then proceed
