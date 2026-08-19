---
name: shared-seam-freeze
description: Implements a docs-only canonical freeze for a shared internal scaffold or boundary seam without changing runtime behavior.
---

Use this skill when:
- the seam is shared and centralized
- code/tests already prove it exists
- the task is to record the canonical boundary, not redesign behavior

Rules:
- default to DOCS_ONLY
- treat internal implementation details as allowed unless they form a competing shared boundary
- document exact seam scope
- document what adjacent seams it is distinct from
- document extension rule for future work
- add one focused doc-proof test if needed
- do not change runtime logic
- do not change schemas unless the task explicitly requires it
