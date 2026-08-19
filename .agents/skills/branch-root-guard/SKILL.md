---
name: branch-root-guard
description: Verifies correct repo root and working branch before any non-trivial work in nested-repo environments.
---

Use this skill when:
- the repo is nested inside another git repo
- the UI shows a different branch than git
- Codex asks to continue on main unexpectedly

Rules:
- verify:
  - `git rev-parse --show-toplevel`
  - `git status --short --branch`
- if repo root is wrong, stop and report
- if intended branch is not checked out, stop and report
- do not continue on main if the intended slice branch exists elsewhere
- do not create a replacement branch just to silence UI drift
- prefer reopening Codex in the correct repo root over forcing progress in a bad workspace
