const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const docsPath = path.join(
  __dirname,
  "..",
  "docs",
  "SWE_BODELNING_CORE_BACKEND_MVP_FREEZE.md",
);
const docsText = fs.readFileSync(docsPath, "utf8");

test("freeze doc locks the SWE_BODELNING core/backend MVP baseline metadata and narrow scope", () => {
  assert.match(docsText, /# SWE_BODELNING Core\/Backend MVP Freeze/);
  assert.match(docsText, /baseline_key:\s+SWE_BODELNING_CORE_BACKEND_MVP/);
  assert.match(docsText, /status:\s+frozen/);
  assert.match(
    docsText,
    /branch:\s+slice-profile-dossier-projection-schema-alignment/,
  );
  assert.match(docsText, /short_head:\s+ef178ab/);
  assert.match(docsText, /fail_closed:\s+true/);

  for (const sourceOfTruthEntry of [
    "canonical_release_eval_run",
    "canonical_profile_dossier_snapshot",
  ]) {
    assert.match(docsText, new RegExp("-\\s+" + sourceOfTruthEntry));
  }

  for (const includedEntry of [
    "persisted_profile_inputs",
    "shared_governance_profile_input_derivation",
    "canonical_release_eval_run_persistence",
    "canonical_release_gate",
    "canonical_release_eval_freshness",
    "canonical_evaluator_version",
    "canonical_profile_input_freshness_handling",
    "canonical_profile_dossier_snapshot_persistence",
    "thin_profile_dossier_read_api",
    "version_aware_schema_aware_dossier_snapshot_reuse_and_fallback",
    "issue_index",
    "section_index",
    "evidence_reference_index",
    "evidence_exhibit_index",
    "issue_ref",
    "section_ref",
    "reference_ref",
    "exhibit_ref",
    "canonical_cross_references_across_issues_sections_exhibits_evidence_references_and_lanes_where_present",
    "schema_package_doc_test_alignment_for_current_dossier_read_surfaces",
  ]) {
    assert.match(docsText, new RegExp("-\\s+" + includedEntry));
  }

  for (const outOfScopeEntry of [
    "final_export_output_packaging",
    "additional_non_swe_profiles",
    "actual_swedish_samaganderatt_decision_logic",
  ]) {
    assert.match(docsText, new RegExp("-\\s+" + outOfScopeEntry));
  }

  assert.match(docsText, /npm_test:\s+passed/);
  assert.match(docsText, /npm_run_lint:\s+passed/);
  assert.match(docsText, /npm_run_build:\s+passed/);
  assert.match(
    docsText,
    /completed SWE_BODELNING core\/backend-MVP baseline in its current fail-closed form/i,
  );
  assert.match(
    docsText,
    /only backend source of truth for release-eval and dossier-read behavior/i,
  );
  assert.match(
    docsText,
    /limited to the narrower core\/backend MVP seam only/i,
  );
  assert.match(
    docsText,
    /locks the baseline\s+metadata and declared scope above/i,
  );
  assert.match(
    docsText,
    /without broadening into export-package, artifact,\s+bundle\/package manifest, bundle\/archive, additional-profile, or broader full-scope freeze\s+work/i,
  );
});
