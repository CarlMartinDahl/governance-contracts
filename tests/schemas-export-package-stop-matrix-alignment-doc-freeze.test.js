const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const docsText = fs.readFileSync(
  path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md"),
  "utf8",
);
const schemasIndexText = fs.readFileSync(
  path.join(__dirname, "..", "packages", "schemas", "src", "index.js"),
  "utf8",
);
const governanceIndexText = fs.readFileSync(
  path.join(__dirname, "..", "packages", "governance", "src", "index.js"),
  "utf8",
);
const databaseIndexText = fs.readFileSync(
  path.join(__dirname, "..", "packages", "database", "src", "index.js"),
  "utf8",
);
const stopMatrixRuntimeTestText = fs.readFileSync(
  path.join(__dirname, "export-package-stop-matrix-alignment.test.js"),
  "utf8",
);

function collectLineMatches(text, pattern) {
  return text
    .split("\n")
    .flatMap((line, index) => (pattern.test(line) ? [index + 1] : []));
}

test("docs freeze the shared packages/schemas export-package stop-matrix alignment seam as the schema-side stop-matrix alignment boundary", () => {
  assert.match(
    docsText,
    /Shared Packages\/Schemas Export Package Stop-Matrix Alignment Seam Freeze/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas\/src\/index\.js` export-package stop-matrix alignment seam formed by `exportPackageStopMatrixAlignment` and `validateExportPackageStopMatrixAlignment` is the canonical internal `packages\/schemas` export-package stop-matrix alignment boundary for the current included schema-side flows below and is now frozen as the baseline seam/i,
  );
  assert.match(
    docsText,
    /the currently evidenced schema-side surfaces in this freeze are limited to:\s+exported export-package stop-matrix alignment object sourced from `schemas\/export-package-stop-matrix-alignment\.json` through `packages\/schemas`\s+shared validator for the profile-keyed export-package stop-matrix alignment payload covering `SWE_BODELNING` and `"CMD_PROFILE"`/i,
  );
  assert.match(
    docsText,
    /the currently concrete shared helper responsibilities already evidenced for this seam are limited to:\s+centralizing the exported export-package stop-matrix alignment object inside `packages\/schemas\/src\/index\.js`\s+deriving the currently required top-level profile keys and per-profile required entry keys from that exported alignment object\s+deriving the current blocked\/current release-gate and release-eval-freshness values plus the current profile-specific reason-code values from that exported alignment object\s+keeping the current seam-local `missing_required_input` condition-key constant inside this seam for the currently concrete export-package stop-matrix case\s+validating the top-level alignment payload as a plain object with the exact currently required profile keys\s+validating each profile entry as a plain object with the exact currently required entry keys\s+enforcing `profile_dossier_release_gate` and `profile_dossier_release_eval_freshness` against the current canonical values\s+enforcing `profile_dossier_release_gate_reason_code` against the current profile-specific reason codes `swe-bodelning-input-incomplete` and `cmd-input-incomplete`\s+validating `stop_matrix_entry` against the current documented `missing_required_input` export-package case and canonical stop outcomes through the separately shared lower stop-matrix-entry validation path\s+returning the validated alignment payload unchanged/i,
  );
  assert.match(
    docsText,
    /the current relationship to broader export-package validation and projection contract surfaces already evidenced in repo code is limited to this alignment seam mapping the already documented blocked\/current export-package baseline and current `missing_required_input` reason-code cases while keeping export package `snapshot_status` currentness reporting outside this stop-matrix alignment seam rather than validating export_package payloads or read-time projection return shapes/i,
  );
  assert.match(
    docsText,
    /the current bounded reuse already evidenced across repo code is limited to 1 imported alignment object definition, 5 current schema-side implementation-detail constant definitions derived from that object, 1 current seam-local `missing_required_input` condition-key constant inside this seam, 1 shared alignment validator definition, no current seam-local case helper definition, the current named module export surface exposing `exportPackageStopMatrixAlignment` and `validateExportPackageStopMatrixAlignment`, no current governance-side or database runtime call sites, and 1 current runtime proof file `tests\/export-package-stop-matrix-alignment\.test\.js` spanning the `SWE_BODELNING` case, the `"CMD_PROFILE"` case, the currently documented reason-code exclusions outside `missing_required_input`, the export surface, and docs parity/i,
  );
  assert.match(
    docsText,
    /no current seam-local case helper is evidenced inside this seam because current repo code keeps the current profile-keyed stop-matrix checks inline inside `validateExportPackageStopMatrixAlignment`, while the separately reused `validateStopMatrixEntryForAlignment` helper remains part of the distinct frozen `packages\/schemas` validation infrastructure rather than this seam/i,
  );
  assert.match(
    docsText,
    /the shared JSON artifact stop-matrix alignment seam remains outside this seam because JSON artifact-specific `artifact_type` baselines and JSON artifact `snapshot_status` currentness exclusions are separate lower stop-matrix alignment responsibilities rather than this export-package alignment boundary/i,
  );
  assert.match(
    docsText,
    /the shared Markdown artifact stop-matrix alignment seam remains outside this seam because Markdown artifact-specific `artifact_type` baselines and Markdown artifact `snapshot_status` currentness exclusions are separate lower stop-matrix alignment responsibilities rather than this export-package alignment boundary/i,
  );
  assert.match(
    docsText,
    /the shared PDF artifact stop-matrix alignment seam remains outside this seam because PDF artifact-specific `artifact_type` baselines and PDF artifact `snapshot_status` currentness exclusions are separate lower stop-matrix alignment responsibilities rather than this export-package alignment boundary/i,
  );
  assert.match(
    docsText,
    /the shared DOCX artifact stop-matrix alignment seam remains outside this seam because DOCX artifact-specific `artifact_type` baselines and DOCX artifact `snapshot_status` currentness exclusions are separate lower stop-matrix alignment responsibilities rather than this export-package alignment boundary/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas` validation-helper scaffold remains outside this seam because machine-readable error construction, plain-object enforcement, key-shape validation, shared string-enum enforcement, and shared stop-matrix-entry validation are separate frozen internal boundaries consumed by the alignment seam rather than defined by it/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas` export-artifact reconstruction helper scaffold remains outside this seam because export-package stop-matrix alignment operates on documented alignment payloads and does not reconstruct export-package payloads, artifact bodies, or projection payloads/i,
  );
  assert.match(
    docsText,
    /the frozen governance-side export-package adapter-dispatch seam remains outside this seam because governance adapter lookup, generic export-package derivation\/projection dispatch, and higher runtime export-package behavior are separate runtime responsibilities and do not define the schema-side stop-matrix alignment boundary/i,
  );
  assert.match(
    docsText,
    /downstream governance, persistence, API route\/runtime, and other adapter behavior remain outside this seam because they may reference the same surface contractually but do not define the canonical shared schema-side export-package stop-matrix alignment boundary themselves/i,
  );
  assert.match(
    docsText,
    /broader neutral stop-matrix semantic model work, uncovered reason-code policy, and future non-`missing_required_input` export-package mapping cases remain outside this seam because current repo evidence only freezes the currently concrete export-package stop-matrix alignment surface/i,
  );
  assert.match(
    docsText,
    /future export-package stop-matrix alignment work that needs the same exported alignment object and shared validation entry point should extend this seam instead of introducing parallel export-package stop-matrix alignment validators or schema exports elsewhere in the repo/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, stop-matrix alignment semantics, export-package validation semantics, projection semantics, governance semantics, schema behavior, or fail-closed behavior/i,
  );

  assert.match(
    schemasIndexText,
    /const exportPackageStopMatrixAlignment = require\("\.\.\/\.\.\/\.\.\/schemas\/export-package-stop-matrix-alignment\.json"\);/,
  );
  assert.match(
    schemasIndexText,
    /const exportPackageStopMatrixAlignmentRequiredKeys =\s*exportPackageStopMatrixAlignment\.required;/,
  );
  assert.match(
    schemasIndexText,
    /const exportPackageStopMatrixAlignmentProfileRequiredKeysByProfile =\s*Object\.freeze\(\{[\s\S]*SWE_BODELNING:[\s\S]*CMD_PROFILE:[\s\S]*\}\);/,
  );
  assert.match(
    schemasIndexText,
    /const exportPackageStopMatrixAlignmentReasonCodeByProfile =\s*Object\.freeze\(\{[\s\S]*SWE_BODELNING:[\s\S]*profile_dossier_release_gate_reason_code[\s\S]*CMD_PROFILE:[\s\S]*profile_dossier_release_gate_reason_code[\s\S]*\}\);/,
  );
  assert.match(
    schemasIndexText,
    /const exportPackageStopMatrixAlignmentReleaseGateValue =\s*exportPackageStopMatrixAlignment\.properties\.SWE_BODELNING[\s\S]*?profile_dossier_release_gate\.const;/,
  );
  assert.match(
    schemasIndexText,
    /const exportPackageStopMatrixAlignmentFreshnessValue =\s*exportPackageStopMatrixAlignment\.properties\.SWE_BODELNING[\s\S]*?profile_dossier_release_eval_freshness\.const;/,
  );
  assert.match(
    schemasIndexText,
    /const exportPackageStopMatrixAlignmentConditionKey =\s*"missing_required_input";/,
  );
  assert.match(
    schemasIndexText,
    /function validateExportPackageStopMatrixAlignment\(\s*input,\s*errorCode = "ERR_EXPORT_PACKAGE_STOP_MATRIX_ALIGNMENT_INVALID",\s*\)/,
  );
  assert.match(schemasIndexText, /assertPlainObject\(input, errorCode, "input"\);/);
  assert.match(
    schemasIndexText,
    /assertExactKeys\(\s*input,\s*exportPackageStopMatrixAlignmentRequiredKeys,\s*errorCode,\s*"input",\s*\);/,
  );
  assert.match(
    schemasIndexText,
    /for \(const jurisdictionProfileKey of exportPackageStopMatrixAlignmentRequiredKeys\)/,
  );
  assert.match(
    schemasIndexText,
    /assertPlainObject\(alignmentEntry, errorCode, alignmentField\);/,
  );
  assert.match(
    schemasIndexText,
    /exportPackageStopMatrixAlignmentProfileRequiredKeysByProfile\[\s*jurisdictionProfileKey\s*\]/,
  );
  assert.match(
    schemasIndexText,
    /validateStringEnum\(\s*alignmentEntry\.profile_dossier_release_gate,\s*\[exportPackageStopMatrixAlignmentReleaseGateValue\],/,
  );
  assert.match(
    schemasIndexText,
    /validateStringEnum\(\s*alignmentEntry\.profile_dossier_release_eval_freshness,\s*\[exportPackageStopMatrixAlignmentFreshnessValue\],/,
  );
  assert.match(
    schemasIndexText,
    /validateStringEnum\(\s*alignmentEntry\.profile_dossier_release_gate_reason_code,\s*\[[\s\S]*exportPackageStopMatrixAlignmentReasonCodeByProfile\[\s*jurisdictionProfileKey\s*\][\s\S]*\],/,
  );
  assert.match(
    schemasIndexText,
    /validateStopMatrixEntryForAlignment\(\s*alignmentEntry\.stop_matrix_entry,\s*errorCode,\s*`\$\{alignmentField\}\.stop_matrix_entry`,\s*exportPackageStopMatrixAlignmentConditionKey,\s*"export_package",\s*\);/,
  );
  assert.doesNotMatch(
    schemasIndexText,
    /function validateExportPackageStopMatrixCase\(/,
  );
  assert.match(schemasIndexText, /return input;/);

  assert.deepEqual(
    collectLineMatches(schemasIndexText, /\bexportPackageStopMatrixAlignment\b/),
    [20, 75, 79, 80, 84, 87, 91, 94, 12972],
  );
  assert.deepEqual(
    collectLineMatches(
      schemasIndexText,
      /\bvalidateExportPackageStopMatrixAlignment\b/,
    ),
    [5281, 13073],
  );
  assert.deepEqual(
    collectLineMatches(
      governanceIndexText,
      /\bvalidateExportPackageStopMatrixAlignment\b/,
    ),
    [],
  );
  assert.deepEqual(
    collectLineMatches(
      databaseIndexText,
      /\bvalidateExportPackageStopMatrixAlignment\b/,
    ),
    [],
  );

  assert.match(
    stopMatrixRuntimeTestText,
    /the current documented export_package fail-closed baseline aligns to the stop-matrix model for SWE_BODELNING where docs are concrete enough/,
  );
  assert.match(
    stopMatrixRuntimeTestText,
    /the current documented export_package fail-closed baseline aligns to the stop-matrix model for CMD_PROFILE where docs are concrete enough/,
  );
  assert.match(
    stopMatrixRuntimeTestText,
    /the documented export_package reason codes outside missing-required-input remain intentionally outside the stop-matrix alignment surface/,
  );
  assert.match(stopMatrixRuntimeTestText, /missing_required_input/);
  assert.match(stopMatrixRuntimeTestText, /swe-bodelning-input-incomplete/);
  assert.match(stopMatrixRuntimeTestText, /cmd-input-incomplete/);
  assert.match(stopMatrixRuntimeTestText, /cmd-runtime-not-implemented/);
  assert.match(stopMatrixRuntimeTestText, /swe-bodelning-support-incomplete/);
  assert.match(
    stopMatrixRuntimeTestText,
    /governance_baseline_fail_closed_pending_completeness_support_policy/,
  );
  assert.match(
    stopMatrixRuntimeTestText,
    /packages\/schemas exports the export_package stop-matrix alignment surface if applicable/,
  );
  assert.match(
    stopMatrixRuntimeTestText,
    /docs describe the same export_package-to-stop-matrix alignment/,
  );
  assert.match(
    stopMatrixRuntimeTestText,
    /export package `snapshot_status` currentness reporting remains outside this mapping surface/i,
  );
});
