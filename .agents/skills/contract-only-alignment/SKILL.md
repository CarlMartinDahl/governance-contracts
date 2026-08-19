---
name: contract-only-alignment
description: Implements a contract-only docs/schema/export alignment slice without changing runtime behavior.
---

Use this skill when:
- the goal is contract, schema, or package-export alignment rather than runtime behavior
- the current slice should stay within docs, schemas, package exports, and tests only
- a docs-only freeze is too narrow, but a runtime change would broaden scope unnecessarily

Rules:
- default to CONTRACT_ONLY
- limit changes to docs, schemas, package exports, and tests only
- do not change runtime logic or introduce runtime behavior drift
- do not broaden legal-rule scope
- do not broaden the slice when a smaller safe prerequisite or sibling slice exists
- preserve unaffected seams and current runtime behavior

Checklist:
- identify the exact contract surface or alignment seam
- confirm the slice does not require runtime ownership
- limit touched files to docs, schemas, package exports, and tests
- verify no legal-rule expansion is introduced
- run test/lint/build
- if validations pass, make one commit only

Standard return shape:
1. concise change summary
2. files changed
3. test/lint/build outcomes
4. blockers or missing user input
5. whether the governance-readiness-check skill was used
6. short commit hash if a commit was created
7. which branch you ended on
