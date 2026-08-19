---
name: thin-route-freeze
description: Implements a docs-only canonical freeze for a narrow authenticated latest-read, refresh, or delivery route seam without changing runtime behavior.
---

Use this skill when:
- the route already exists
- tests already prove the route behavior
- the goal is to freeze a thin seam, not redesign it

Rules:
- default to DOCS_ONLY
- add or minimally extend one focused proof test
- do not change runtime logic
- do not change schema logic
- do not broaden the seam into adjacent concerns
- explicitly distinguish the seam from snapshot_status, API error-envelope, and broader helper seams where relevant

Checklist:
- identify exact seam
- identify exact route surface
- identify what the seam does not own
- document relation to adjacent frozen seams
- run test/lint/build
- if validations pass, make one commit only
