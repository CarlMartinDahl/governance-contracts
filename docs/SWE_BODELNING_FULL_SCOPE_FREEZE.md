# SWE_BODELNING Full Scope Freeze

```yaml
freeze_record:
  baseline_key: SWE_BODELNING_FULL_SCOPE_BASELINE
  status: frozen
  branch: slice-swe-bodelning-full-scope-freeze
  short_head: e74ffe0
  fail_closed: true
  source_of_truth:
    - canonical_release_eval_run
    - canonical_profile_dossier_snapshot
    - canonical_export_package_snapshot
    - canonical_export_package_json_artifact_snapshot
    - canonical_export_package_markdown_artifact_snapshot
    - canonical_export_package_pdf_artifact_snapshot
    - canonical_export_package_docx_artifact_snapshot
    - canonical_export_package_bundle_manifest_snapshot
    - canonical_export_package_bundle_archive_artifact_snapshot
  included:
    - core_backend
    - dossier_projection_backend
    - export_output_backend
    - export_package_backend_surface
    - export_package_json_artifact_backend_surface
    - export_package_markdown_artifact_backend_surface
    - export_package_pdf_artifact_backend_surface
    - export_package_docx_artifact_backend_surface
    - export_package_bundle_manifest_backend_surface
    - export_package_bundle_archive_backend_surface
    - thin_authenticated_current_only_delivery_for_json_markdown_pdf_docx_and_final_bundle_archive
    - schema_package_doc_test_alignment_for_current_backend_export_surfaces
  out_of_scope:
    - additional_non_swe_profiles
    - actual_swedish_samaganderatt_decision_logic
    - product_ui_work_outside_current_backend_export_surfaces
  checks_at_freeze_time:
    npm_test: passed
    npm_run_lint: passed
    npm_run_build: passed
```

This freeze records the completed SWE_BODELNING full-scope backend/export baseline in its current fail-closed form. Canonical `release_eval_run`, canonical `profile_dossier_snapshot`, canonical export package snapshots, canonical artifact snapshots, canonical bundle/package manifest snapshots, and canonical bundle/archive artifact snapshots remain the source of truth for the implemented SWE_BODELNING backend/export surfaces in this repository.

This freeze is limited to the SWE_BODELNING full-scope freeze seam only. It locks the
baseline metadata and declared scope above without reopening the narrower core/backend MVP
freeze or broadening into schema/export package surface changes, runtime/API/database
changes, legal-domain changes, or broader rollout/governance work.
