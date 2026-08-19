# SWE_BODELNING Core/Backend MVP Freeze

```yaml
freeze_record:
  baseline_key: SWE_BODELNING_CORE_BACKEND_MVP
  status: frozen
  branch: slice-profile-dossier-projection-schema-alignment
  short_head: ef178ab
  fail_closed: true
  source_of_truth:
    - canonical_release_eval_run
    - canonical_profile_dossier_snapshot
  included:
    - persisted_profile_inputs
    - shared_governance_profile_input_derivation
    - canonical_release_eval_run_persistence
    - canonical_release_gate
    - canonical_release_eval_freshness
    - canonical_evaluator_version
    - canonical_profile_input_freshness_handling
    - canonical_profile_dossier_snapshot_persistence
    - thin_profile_dossier_read_api
    - version_aware_schema_aware_dossier_snapshot_reuse_and_fallback
    - issue_index
    - section_index
    - evidence_reference_index
    - evidence_exhibit_index
    - issue_ref
    - section_ref
    - reference_ref
    - exhibit_ref
    - canonical_cross_references_across_issues_sections_exhibits_evidence_references_and_lanes_where_present
    - schema_package_doc_test_alignment_for_current_dossier_read_surfaces
  out_of_scope:
    - final_export_output_packaging
    - additional_non_swe_profiles
    - actual_swedish_samaganderatt_decision_logic
  checks_at_freeze_time:
    npm_test: passed
    npm_run_lint: passed
    npm_run_build: passed
```

This freeze records the completed SWE_BODELNING core/backend-MVP baseline in its current fail-closed form. Canonical `release_eval_run` persistence and canonical `profile_dossier_snapshot` persistence remain the only backend source of truth for release-eval and dossier-read behavior in this baseline.

This freeze is limited to the narrower core/backend MVP seam only. It locks the baseline
metadata and declared scope above without broadening into export-package, artifact,
bundle/package manifest, bundle/archive, additional-profile, or broader full-scope freeze
work.
