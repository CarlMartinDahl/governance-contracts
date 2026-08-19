# Start here

This file is a short orientation guide. It does not override live Git state,
the repository rules in `AGENTS.md`, or the canonical contracts in `docs/`.
When sources conflict, follow the stricter documented boundary and stop rather
than infer missing semantics.

Läsordning
AGENTS.md
docs/API_CONTRACTS_GOVERNANCE_v1.md
docs/PRINCIPLES_FACT_MODEL_ROLLOUT_FREEZE_v1.md
docs/MODEL_INFORMATION_PRINCIPLES_v1.md

## Read in this order

The existing canonical read order above remains the required first pass. Then
read `README.md` for the public project boundary and contributor checks, and
read the applicable schema, implementation module, and test before changing a
seam.

## Working principles

- Documentation is the product and contract source of truth.
- Schemas are the machine-readable contract source of truth.
- Tests prove only their explicit assertions.
- Runtime behavior must not silently outrun documentation, schemas, or tests.
- Human and professional review remains the release gate.

Always start from the Git root reported by `git rev-parse --show-toplevel` and
check `git status --short --branch` before meaningful work.
