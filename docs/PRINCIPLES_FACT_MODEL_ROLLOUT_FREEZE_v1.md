# Principles Fact-Model Rollout Freeze v1

```yaml
freeze_record:
  baseline_key: PRINCIPLES_FACT_MODEL_ROLLOUT_BASELINE_V1
  status: frozen
  branch: slice-principles-fact-model-rollout-freeze
  short_head: 9dcf93e
  scope: shared_principles_fact_model_adoption_rollout
  neutral_models:
    - docs/MODEL_INFORMATION_PRINCIPLES_v1.md
    - schemas/semantic-fact-model.json
    - schemas/stop-outcome-model.json
    - schemas/stop-matrix-model.json
    - schemas/traceability-model.json
  adopted_shared_seams:
    - profile_input
    - release_eval
    - profile_dossier
    - export_package
    - export_package_json_artifact
    - export_package_markdown_artifact
    - export_package_pdf_artifact
    - export_package_docx_artifact
    - export_package_bundle_manifest
    - export_package_bundle_archive_artifact
  checks_at_freeze_time:
    npm_test: passed
    npm_run_lint: passed
    npm_run_build: passed
    worktree: clean
```

## Purpose

This freeze records the completed shared principles/fact-model adoption rollout for the
currently adopted seams in this repository. It is the stable baseline reference for later
contract work.

## Included Scope

- `profile_input`
- `release_eval`
- `profile_dossier`
- `export_package`
- `export_package_json_artifact`
- `export_package_markdown_artifact`
- `export_package_pdf_artifact`
- `export_package_docx_artifact`
- `export_package_bundle_manifest`
- `export_package_bundle_archive_artifact`

## Canonical Neutral Models

- semantic fact model: `schemas/semantic-fact-model.json`
- stop outcome model: `schemas/stop-outcome-model.json`
- stop matrix model: `schemas/stop-matrix-model.json`
- traceability model: `schemas/traceability-model.json`

## Adoption Status By Seam

- `profile_input`: semantic-fact partial adoption only: `presence_status` only.
  Stop-outcome, stop-matrix, and traceability are not applicable in the current seam design.
- `release_eval`: stop-outcome aligned, stop-matrix aligned, traceability aligned,
  semantic-fact partial adoption only: `presence_status` and `source_status` only.
- `profile_dossier`: stop-outcome aligned, stop-matrix aligned, traceability aligned,
  semantic-fact prerequisite/freeze only.
- `export_package`: stop-outcome aligned, stop-matrix aligned, traceability aligned,
  semantic-fact prerequisite/freeze only.
- `export_package_json_artifact`: stop-outcome aligned, stop-matrix aligned,
  traceability aligned, semantic-fact prerequisite/freeze only.
- `export_package_markdown_artifact`: stop-outcome aligned, stop-matrix aligned,
  traceability aligned, semantic-fact prerequisite/freeze only.
- `export_package_pdf_artifact`: stop-outcome aligned, stop-matrix aligned,
  traceability aligned, semantic-fact prerequisite/freeze only.
- `export_package_docx_artifact`: stop-outcome aligned, stop-matrix aligned,
  traceability aligned, semantic-fact prerequisite/freeze only.
- `export_package_bundle_manifest`: stop-outcome aligned, stop-matrix aligned,
  traceability aligned, semantic-fact prerequisite/freeze only.
- `export_package_bundle_archive_artifact`: stop-outcome aligned, stop-matrix aligned,
  traceability aligned, semantic-fact prerequisite/freeze only.

## Freeze Rule

- intentionally frozen and unassigned semantic-fact dimensions are not missing work
- no additional semantic-fact mapping may be added without explicit contract detail
- no guessing is allowed

## Runtime Behavior Statement

This rollout was contract, docs, package-export, and focused-test adoption only. It did not
change runtime behavior, stored payload shape, readiness behavior, fail-closed behavior, or
reason codes.

## Out Of Scope

- new legal or domain rules
- new runtime semantics
- guessed semantic-fact mappings
- additional seam adoption outside the ten listed seams

## Baseline Checks

At freeze time:

- `npm test` passed
- `npm run lint` passed
- `npm run build` passed
- the worktree was clean

## Freeze Head

This freeze records short HEAD `9dcf93e`.
