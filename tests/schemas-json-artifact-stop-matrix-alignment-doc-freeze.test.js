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
  path.join(__dirname, "export-package-json-artifact-stop-matrix-alignment.test.js"),
  "utf8",
);

function collectLineMatches(text, pattern) {
  return text
    .split("\n")
    .flatMap((line, index) => (pattern.test(line) ? [index + 1] : []));
}

test("docs freeze the shared packages/schemas JSON artifact stop-matrix alignment seam as the schema-side stop-matrix alignment boundary", () => {
  assert.match(
    docsText,
    /Shared Packages\/Schemas JSON Artifact Stop-Matrix Alignment Seam Freeze/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas\/src\/index\.js` JSON artifact stop-matrix alignment seam formed by `exportPackageJsonArtifactStopMatrixAlignment` and `validateExportPackageJsonArtifactStopMatrixAlignment` is the canonical internal `packages\/schemas` JSON artifact stop-matrix alignment boundary for the current included schema-side flows below and is now frozen as the baseline seam/i,
  );
  assert.match(
    docsText,
    /the currently evidenced schema-side surfaces in this freeze are limited to:\s+exported JSON artifact stop-matrix alignment object sourced from `schemas\/export-package-json-artifact-stop-matrix-alignment\.json` through `packages\/schemas`\s+shared validator for the profile-keyed JSON artifact stop-matrix alignment payload covering `SWE_BODELNING` and `"CMD_PROFILE"`/i,
  );
  assert.match(
    docsText,
    /the currently concrete shared helper responsibilities already evidenced for this seam are limited to:\s+centralizing the exported JSON artifact stop-matrix alignment object inside `packages\/schemas\/src\/index\.js`\s+deriving the currently required top-level profile keys and per-profile required entry keys from that exported alignment object\s+deriving the current canonical `artifact_type`, blocked\/current release-gate and release-eval-freshness values plus the current profile-specific reason-code values from that exported alignment object\s+keeping the current seam-local `missing_required_input` condition-key constant inside this seam for the currently concrete JSON artifact stop-matrix case\s+validating the top-level alignment payload as a plain object with the exact currently required profile keys\s+validating each profile entry as a plain object with the exact currently required entry keys\s+enforcing `artifact_type`, `source_export_package_profile_dossier_release_gate`, and `source_export_package_profile_dossier_release_eval_freshness` against the current canonical values\s+enforcing `source_export_package_profile_dossier_release_gate_reason_code` against the current profile-specific reason codes `swe-bodelning-input-incomplete` and `cmd-input-incomplete`\s+validating `stop_matrix_entry` against the current documented `missing_required_input` JSON artifact case and canonical stop outcomes\s+returning the validated alignment payload unchanged/i,
  );
  assert.match(
    docsText,
    /the current relationship to the shared JSON artifact validator seam already evidenced in repo code is limited to this alignment seam mapping the already documented blocked\/current JSON artifact baseline and reason-code cases rather than validating artifact-envelope fields, filename\/content-type\/encoding\/body-utf8 validation, or generic JSON artifact validator dispatch/i,
  );
  assert.match(
    docsText,
    /the current relationship to the shared JSON artifact projection-validator seam already evidenced in repo code is limited to keeping JSON artifact `snapshot_status` currentness reporting outside this stop-matrix alignment seam rather than validating projection payloads or read-time projection return shapes/i,
  );
  assert.match(
    docsText,
    /the current bounded reuse already evidenced across repo code is limited to 1 imported alignment object definition, 6 current schema-side implementation-detail constant definitions derived from that object, 1 current seam-local `missing_required_input` condition-key constant inside this seam, 1 shared alignment validator definition, the current named module export surface exposing `exportPackageJsonArtifactStopMatrixAlignment` and `validateExportPackageJsonArtifactStopMatrixAlignment`, no current governance-side or database runtime call sites, and 1 current runtime proof file `tests\/export-package-json-artifact-stop-matrix-alignment\.test\.js` spanning the `SWE_BODELNING` case, the `"CMD_PROFILE"` case, the currently documented JSON artifact reason-code and `snapshot_status` currentness exclusions outside `missing_required_input`, the export surface, and docs parity/i,
  );
  assert.match(
    docsText,
    /the shared JSON artifact validator seam remains outside this seam because artifact-envelope validation, filename\/content-type\/encoding\/body-utf8 validation, canonical JSON equality, and generic JSON artifact validator dispatch are separate frozen responsibilities rather than stop-matrix alignment responsibilities/i,
  );
  assert.match(
    docsText,
    /the shared JSON artifact projection-validator seam remains outside this seam because projection-level `snapshot_status` currentness validation, reconstruction-based export-version comparison, and normalized projection return-shape enforcement are separate frozen responsibilities rather than stop-matrix alignment responsibilities/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas` validation-helper scaffold remains outside this seam because machine-readable error construction, plain-object enforcement, key-shape validation, shared string-enum enforcement, and shared stop-matrix-entry validation are separate frozen internal boundaries consumed by the alignment seam rather than defined by it/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas` export-artifact reconstruction helper scaffold remains outside this seam because JSON artifact stop-matrix alignment operates on documented alignment payloads and does not reconstruct JSON bodies or projection payloads/i,
  );
  assert.match(
    docsText,
    /the frozen governance-side JSON artifact adapter-dispatch seam remains outside this seam because governance adapter lookup, generic derivation\/projection dispatch, persisted JSON artifact assembly, and higher runtime JSON artifact behavior are separate runtime responsibilities and do not define the schema-side JSON artifact stop-matrix alignment boundary/i,
  );
  assert.match(
    docsText,
    /downstream governance, persistence, API route\/runtime, and other adapter behavior remain outside this seam because they may reference the same surface contractually but do not define the canonical shared schema-side JSON artifact stop-matrix alignment boundary themselves/i,
  );
  assert.match(
    docsText,
    /broader neutral stop-matrix semantic model work, uncovered reason-code policy, and future non-`missing_required_input` JSON artifact mapping cases remain outside this seam because current repo evidence only freezes the currently concrete JSON artifact stop-matrix alignment surface/i,
  );
  assert.match(
    docsText,
    /future JSON artifact stop-matrix alignment work that needs the same exported alignment object and shared validation entry point should extend this seam instead of introducing parallel JSON artifact stop-matrix alignment validators or schema exports elsewhere in the repo/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, stop-matrix alignment semantics, JSON artifact validation semantics, projection semantics, governance semantics, schema behavior, or fail-closed behavior/i,
  );

  assert.match(
    schemasIndexText,
    /const exportPackageJsonArtifactStopMatrixAlignment = require\("\.\.\/\.\.\/\.\.\/schemas\/export-package-json-artifact-stop-matrix-alignment\.json"\);/,
  );
  assert.match(
    schemasIndexText,
    /const exportPackageJsonArtifactStopMatrixAlignmentRequiredKeys =\s*exportPackageJsonArtifactStopMatrixAlignment\.required;/,
  );
  assert.match(
    schemasIndexText,
    /const exportPackageJsonArtifactStopMatrixAlignmentProfileRequiredKeysByProfile =\s*Object\.freeze\(\{[\s\S]*SWE_BODELNING:[\s\S]*CMD_PROFILE:[\s\S]*\}\);/,
  );
  assert.match(
    schemasIndexText,
    /const exportPackageJsonArtifactStopMatrixAlignmentReasonCodeByProfile =\s*Object\.freeze\(\{[\s\S]*SWE_BODELNING:[\s\S]*source_export_package_profile_dossier_release_gate_reason_code[\s\S]*CMD_PROFILE:[\s\S]*source_export_package_profile_dossier_release_gate_reason_code[\s\S]*\}\);/,
  );
  assert.match(
    schemasIndexText,
    /const exportPackageJsonArtifactStopMatrixAlignmentArtifactTypeValue =\s*exportPackageJsonArtifactStopMatrixAlignment\.properties\.SWE_BODELNING[\s\S]*?artifact_type\.const;/,
  );
  assert.match(
    schemasIndexText,
    /const exportPackageJsonArtifactStopMatrixAlignmentReleaseGateValue =\s*exportPackageJsonArtifactStopMatrixAlignment\.properties\.SWE_BODELNING[\s\S]*?source_export_package_profile_dossier_release_gate\.const;/,
  );
  assert.match(
    schemasIndexText,
    /const exportPackageJsonArtifactStopMatrixAlignmentFreshnessValue =\s*exportPackageJsonArtifactStopMatrixAlignment\.properties\.SWE_BODELNING[\s\S]*?source_export_package_profile_dossier_release_eval_freshness\.const;/,
  );
  assert.match(
    schemasIndexText,
    /const exportPackageJsonArtifactStopMatrixAlignmentConditionKey =\s*"missing_required_input";/,
  );
  assert.match(
    schemasIndexText,
    /function validateExportPackageJsonArtifactStopMatrixAlignment\(\s*input,\s*errorCode = "ERR_EXPORT_PACKAGE_JSON_ARTIFACT_STOP_MATRIX_ALIGNMENT_INVALID",\s*\)/,
  );
  assert.match(schemasIndexText, /assertPlainObject\(input, errorCode, "input"\);/);
  assert.match(
    schemasIndexText,
    /assertExactKeys\(\s*input,\s*exportPackageJsonArtifactStopMatrixAlignmentRequiredKeys,\s*errorCode,\s*"input",\s*\);/,
  );
  assert.match(
    schemasIndexText,
    /for \(const jurisdictionProfileKey of exportPackageJsonArtifactStopMatrixAlignmentRequiredKeys\)/,
  );
  assert.match(
    schemasIndexText,
    /assertPlainObject\(alignmentEntry, errorCode, alignmentField\);/,
  );
  assert.match(
    schemasIndexText,
    /exportPackageJsonArtifactStopMatrixAlignmentProfileRequiredKeysByProfile\[\s*jurisdictionProfileKey\s*\]/,
  );
  assert.match(
    schemasIndexText,
    /validateStringEnum\(\s*alignmentEntry\.artifact_type,\s*\[exportPackageJsonArtifactStopMatrixAlignmentArtifactTypeValue\],/,
  );
  assert.match(
    schemasIndexText,
    /validateStringEnum\(\s*alignmentEntry\.source_export_package_profile_dossier_release_gate,\s*\[exportPackageJsonArtifactStopMatrixAlignmentReleaseGateValue\],/,
  );
  assert.match(
    schemasIndexText,
    /validateStringEnum\(\s*alignmentEntry\.source_export_package_profile_dossier_release_eval_freshness,\s*\[exportPackageJsonArtifactStopMatrixAlignmentFreshnessValue\],/,
  );
  assert.match(
    schemasIndexText,
    /validateStringEnum\(\s*alignmentEntry\.source_export_package_profile_dossier_release_gate_reason_code,\s*\[[\s\S]*exportPackageJsonArtifactStopMatrixAlignmentReasonCodeByProfile\[\s*jurisdictionProfileKey\s*\][\s\S]*\],/,
  );
  assert.match(
    schemasIndexText,
    /validateStopMatrixEntryForAlignment\(\s*alignmentEntry\.stop_matrix_entry,\s*errorCode,\s*`\$\{alignmentField\}\.stop_matrix_entry`,\s*exportPackageJsonArtifactStopMatrixAlignmentConditionKey,\s*"export_package_json_artifact",\s*\);/,
  );
  assert.match(schemasIndexText, /return input;/);

  assert.deepEqual(
    collectLineMatches(
      schemasIndexText,
      /\bexportPackageJsonArtifactStopMatrixAlignment\b/,
    ),
    [2, 1428, 1432, 1435, 1440, 1444, 1448, 1451, 1454, 12963],
  );
  assert.deepEqual(
    collectLineMatches(
      schemasIndexText,
      /\bvalidateExportPackageJsonArtifactStopMatrixAlignment\b/,
    ),
    [5215, 13064],
  );
  assert.deepEqual(
    collectLineMatches(
      governanceIndexText,
      /\bvalidateExportPackageJsonArtifactStopMatrixAlignment\b/,
    ),
    [],
  );
  assert.deepEqual(
    collectLineMatches(
      databaseIndexText,
      /\bvalidateExportPackageJsonArtifactStopMatrixAlignment\b/,
    ),
    [],
  );

  assert.match(
    stopMatrixRuntimeTestText,
    /the current documented export_package_json_artifact fail-closed baseline aligns to the stop-matrix model for SWE_BODELNING where docs are concrete enough/,
  );
  assert.match(
    stopMatrixRuntimeTestText,
    /the current documented export_package_json_artifact fail-closed baseline aligns to the stop-matrix model for CMD_PROFILE where docs are concrete enough/,
  );
  assert.match(
    stopMatrixRuntimeTestText,
    /the documented export_package_json_artifact reason codes outside missing-required-input remain intentionally outside the stop-matrix alignment surface/,
  );
  assert.match(stopMatrixRuntimeTestText, /missing_required_input/);
  assert.match(stopMatrixRuntimeTestText, /swe-bodelning-input-incomplete/);
  assert.match(stopMatrixRuntimeTestText, /cmd-input-incomplete/);
  assert.match(stopMatrixRuntimeTestText, /cmd-runtime-not-implemented/);
  assert.match(
    stopMatrixRuntimeTestText,
    /snapshot_status` currentness reporting remains outside this mapping surface/,
  );
  assert.match(
    stopMatrixRuntimeTestText,
    /packages\/schemas exports the export_package_json_artifact stop-matrix alignment surface if applicable/,
  );
  assert.match(stopMatrixRuntimeTestText, /docs describe the same alignment/);
  assert.match(
    stopMatrixRuntimeTestText,
    /required\.includes\(\s*"snapshot_status"/,
  );
});
