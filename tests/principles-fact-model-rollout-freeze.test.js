const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const docsPath = path.join(
  __dirname,
  "..",
  "docs",
  "PRINCIPLES_FACT_MODEL_ROLLOUT_FREEZE_v1.md",
);
const docsText = fs.readFileSync(docsPath, "utf8");

test("freeze doc records the completed shared principles/fact-model rollout baseline", () => {
  assert.match(docsText, /# Principles Fact-Model Rollout Freeze v1/);
  assert.match(
    docsText,
    /This freeze records the completed shared principles\/fact-model adoption rollout/i,
  );

  for (const seam of [
    "profile_input",
    "release_eval",
    "profile_dossier",
    "export_package",
    "export_package_json_artifact",
    "export_package_markdown_artifact",
    "export_package_pdf_artifact",
    "export_package_docx_artifact",
    "export_package_bundle_manifest",
    "export_package_bundle_archive_artifact",
  ]) {
    assert.match(docsText, new RegExp("`" + seam + "`"));
  }

  for (const model of [
    "docs/MODEL_INFORMATION_PRINCIPLES_v1.md",
    "schemas/semantic-fact-model.json",
    "schemas/stop-outcome-model.json",
    "schemas/stop-matrix-model.json",
    "schemas/traceability-model.json",
  ]) {
    assert.match(docsText, new RegExp(model.replace(/\//g, "\\/")));
  }

  assert.match(
    docsText,
    /`profile_input`: semantic-fact partial adoption only: `presence_status` only/i,
  );
  assert.match(
    docsText,
    /Stop-outcome, stop-matrix, and traceability are not applicable in the current seam design/i,
  );
  assert.match(
    docsText,
    /`release_eval`: stop-outcome aligned, stop-matrix aligned, traceability aligned,\s+semantic-fact partial adoption only: `presence_status` and `source_status` only/i,
  );

  for (const downstreamSeam of [
    "profile_dossier",
    "export_package",
    "export_package_json_artifact",
    "export_package_markdown_artifact",
    "export_package_pdf_artifact",
    "export_package_docx_artifact",
    "export_package_bundle_manifest",
    "export_package_bundle_archive_artifact",
  ]) {
    assert.match(
      docsText,
      new RegExp(
        "`" +
          downstreamSeam +
          "`: stop-outcome aligned, stop-matrix aligned,[\\s\\S]*semantic-fact prerequisite\\/freeze only",
      ),
    );
  }

  assert.match(
    docsText,
    /intentionally frozen and unassigned semantic-fact dimensions are not missing work/i,
  );
  assert.match(
    docsText,
    /no additional semantic-fact mapping may be added without explicit contract detail/i,
  );
  assert.match(docsText, /no guessing is allowed/i);
  assert.match(docsText, /npm_test:\s+passed/);
  assert.match(docsText, /npm_run_lint:\s+passed/);
  assert.match(docsText, /npm_run_build:\s+passed/);
  assert.match(docsText, /worktree:\s+clean/);
  assert.match(docsText, /short_head:\s+9dcf93e/);
});
