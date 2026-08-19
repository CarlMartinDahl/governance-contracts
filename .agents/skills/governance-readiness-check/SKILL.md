---
name: governance-readiness-check
description: Prove-only audit skill for finding the smallest safe next slice or verifying whether a seam is already complete.
---

Use this skill when:
- selecting the next narrow slice
- auditing whether a seam is already complete
- checking whether a docs-only or contract-only slice is justified
- confirming no runtime drift

Rules:
- start in PROVE_ONLY
- do not modify files
- do not create branches
- do not commit
- inspect docs, packages, schemas, apps, and tests only as needed
- distinguish:
  1. complete seam
  2. partial seam
  3. frozen boundary
  4. not applicable
- prefer the smallest next safe slice
- never recommend broadening when a narrower sibling seam exists
- never guess mappings or semantics

Standard return shape:
1. whether the seam is already complete
2. remaining missing or partial capabilities
3. whether behavior drift exists
4. the single safest next narrow slice
5. why it is next
6. whether the check skill was used
7. short HEAD
