const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const docsPath = path.join(
  __dirname,
  "..",
  "docs",
  "SWE_BODELNING_FULL_SCOPE_FREEZE.md",
);
const docsText = fs.readFileSync(docsPath, "utf8");

test("freeze doc locks the SWE_BODELNING full-scope baseline metadata and declared scope", () => {
  assert.match(docsText, /# SWE_BODELNING Full Scope Freeze/);
  assert.match(docsText, /baseline_key:\s+SWE_BODELNING_FULL_SCOPE_BASELINE/);
  assert.match(docsText, /status:\s+frozen/);
  assert.match(docsText, /branch:\s+slice-swe-bodelning-full-scope-freeze/);
  assert.match(docsText, /short_head:\s+e74ffe0/);
  assert.match(docsText, /fail_closed:\s+true/);

  for (const sourceOfTruthEntry of [
    "canonical_release_eval_run",
    "canonical_profile_dossier_snapshot",
    "canonical_export_package_snapshot",
    "canonical_export_package_json_artifact_snapshot",
    "canonical_export_package_markdown_artifact_snapshot",
    "canonical_export_package_pdf_artifact_snapshot",
    "canonical_export_package_docx_artifact_snapshot",
    "canonical_export_package_bundle_manifest_snapshot",
    "canonical_export_package_bundle_archive_artifact_snapshot",
  ]) {
    assert.match(docsText, new RegExp("-\\s+" + sourceOfTruthEntry));
  }

  for (const includedEntry of [
    "core_backend",
    "dossier_projection_backend",
    "export_output_backend",
    "export_package_backend_surface",
    "export_package_json_artifact_backend_surface",
    "export_package_markdown_artifact_backend_surface",
    "export_package_pdf_artifact_backend_surface",
    "export_package_docx_artifact_backend_surface",
    "export_package_bundle_manifest_backend_surface",
    "export_package_bundle_archive_backend_surface",
    "thin_authenticated_current_only_delivery_for_json_markdown_pdf_docx_and_final_bundle_archive",
    "schema_package_doc_test_alignment_for_current_backend_export_surfaces",
  ]) {
    assert.match(docsText, new RegExp("-\\s+" + includedEntry));
  }

  for (const outOfScopeEntry of [
    "additional_non_swe_profiles",
    "actual_swedish_samaganderatt_decision_logic",
    "product_ui_work_outside_current_backend_export_surfaces",
  ]) {
    assert.match(docsText, new RegExp("-\\s+" + outOfScopeEntry));
  }

  assert.match(docsText, /npm_test:\s+passed/);
  assert.match(docsText, /npm_run_lint:\s+passed/);
  assert.match(docsText, /npm_run_build:\s+passed/);
  assert.match(
    docsText,
    /completed SWE_BODELNING full-scope backend\/export baseline in its current fail-closed form/i,
  );
  assert.match(
    docsText,
    /source of truth for the implemented SWE_BODELNING backend\/export surfaces in this repository/i,
  );
  assert.match(
    docsText,
    /limited to the SWE_BODELNING full-scope freeze seam only/i,
  );
  assert.match(
    docsText,
    /locks the\s+baseline metadata and declared scope above/i,
  );
  assert.match(
    docsText,
    /without reopening the narrower core\/backend MVP\s+freeze or broadening into schema\/export package surface changes, runtime\/API\/database\s+changes, legal-domain changes, or broader rollout\/governance work/i,
  );
});
