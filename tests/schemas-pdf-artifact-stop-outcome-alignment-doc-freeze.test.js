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
const stopOutcomeRuntimeTestText = fs.readFileSync(
  path.join(__dirname, "export-package-pdf-artifact-stop-outcome-alignment.test.js"),
  "utf8",
);

function collectLineMatches(text, pattern) {
  return text
    .split("\n")
    .flatMap((line, index) => (pattern.test(line) ? [index + 1] : []));
}

test("docs freeze the shared packages/schemas PDF artifact stop-outcome alignment seam as the schema-side stop-outcome alignment boundary", () => {
  assert.match(
    docsText,
    /Shared Packages\/Schemas PDF Artifact Stop-Outcome Alignment Seam Freeze/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas\/src\/index\.js` PDF artifact stop-outcome alignment seam formed by `exportPackagePdfArtifactStopOutcomeAlignment` and `validateExportPackagePdfArtifactStopOutcomeAlignment` is the canonical internal `packages\/schemas` PDF artifact stop-outcome alignment boundary for the current included schema-side flows below and is now frozen as the baseline seam/i,
  );
  assert.match(
    docsText,
    /the currently evidenced schema-side surfaces in this freeze are limited to:\s+exported PDF artifact stop-outcome alignment object sourced from `schemas\/export-package-pdf-artifact-stop-outcome-alignment\.json` through `packages\/schemas`\s+shared validator for the profile-keyed PDF artifact stop-outcome alignment payload covering `SWE_BODELNING` and `"CMD_PROFILE"`/i,
  );
  assert.match(
    docsText,
    /the currently concrete shared helper responsibilities already evidenced for this seam are limited to:\s+centralizing the exported PDF artifact stop-outcome alignment object inside `packages\/schemas\/src\/index\.js`\s+deriving the currently required top-level profile keys and per-profile required entry keys from that exported alignment object\s+deriving the current canonical `artifact_type`, blocked\/current release-gate and release-eval-freshness values plus the current profile-specific canonical reason-code sets from that exported alignment object\s+validating the top-level alignment payload as a plain object with the exact currently required profile keys\s+validating each profile entry as a plain object with the exact currently required entry keys\s+enforcing `artifact_type`, `source_export_package_profile_dossier_release_gate`, and `source_export_package_profile_dossier_release_eval_freshness` against the current canonical values\s+validating `canonical_stop_outcome` against the shared neutral stop-outcome contract and enforcing its `stop_outcome` value to match the current `source_export_package_profile_dossier_release_gate`\s+enforcing `source_export_package_profile_dossier_release_gate_reason_codes` against the current profile-specific canonical reason-code sets `governance_baseline_fail_closed_pending_completeness_support_policy`, `swe-bodelning-input-incomplete`, and `swe-bodelning-support-incomplete` for `SWE_BODELNING`, and `cmd-input-incomplete` plus `cmd-runtime-not-implemented` for `"CMD_PROFILE"`\s+enforcing exact-set matching for those current profile-specific reason-code arrays rather than allowing undocumented extras or omissions\s+returning the validated alignment payload unchanged/i,
  );
  assert.match(
    docsText,
    /the current relationship to the shared PDF artifact validator seam already evidenced in repo code is limited to this alignment seam mapping the already documented blocked\/current PDF artifact baseline and reason-code sets rather than validating artifact-envelope fields, filename\/content-type\/encoding fields, or generic PDF artifact validator dispatch/i,
  );
  assert.match(
    docsText,
    /the current relationship to the shared PDF artifact projection-validator seam already evidenced in repo code is limited to keeping PDF artifact `snapshot_status` currentness reporting outside this stop-outcome alignment seam rather than validating projection payloads or read-time projection return shapes/i,
  );
  assert.match(
    docsText,
    /the current bounded reuse already evidenced across repo code is limited to 1 imported alignment object definition, 6 current schema-side implementation-detail constant definitions derived from that object, 1 shared alignment validator definition, the current named module export surface exposing `exportPackagePdfArtifactStopOutcomeAlignment` and `validateExportPackagePdfArtifactStopOutcomeAlignment`, no current governance-side or database runtime call sites, and 1 current runtime proof file `tests\/export-package-pdf-artifact-stop-outcome-alignment\.test\.js` spanning the `SWE_BODELNING` case, the `"CMD_PROFILE"` case, the export surface, and docs parity/i,
  );
  assert.match(
    docsText,
    /the shared PDF artifact validator seam remains outside this seam because artifact-envelope validation, filename\/content-type\/encoding\/body-base64 validation, and generic PDF artifact validator dispatch are separate frozen responsibilities rather than stop-outcome alignment responsibilities/i,
  );
  assert.match(
    docsText,
    /the shared PDF artifact projection-validator seam remains outside this seam because projection-level `snapshot_status` currentness validation, reconstruction-based export-version comparison, and normalized projection return-shape enforcement are separate frozen responsibilities rather than stop-outcome alignment responsibilities/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas` validation-helper scaffold remains outside this seam because machine-readable error construction, plain-object enforcement, key-shape validation, shared string-enum enforcement, shared string-enum-array enforcement, and shared stop-outcome-model validation are separate frozen internal boundaries consumed by the alignment seam rather than defined by it/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas` export-artifact reconstruction helper scaffold remains outside this seam because PDF artifact stop-outcome alignment operates on documented alignment payloads and does not reconstruct PDF bodies or projection payloads/i,
  );
  assert.match(
    docsText,
    /the frozen governance-side PDF artifact adapter-dispatch seam remains outside this seam because governance adapter lookup, generic derivation\/projection dispatch, persisted PDF artifact assembly, and higher runtime PDF artifact behavior are separate runtime responsibilities and do not define the schema-side PDF artifact stop-outcome alignment boundary/i,
  );
  assert.match(
    docsText,
    /downstream governance, persistence, API route\/runtime, and other adapter behavior remain outside this seam because they may reference the same surface contractually but do not define the canonical shared schema-side PDF artifact stop-outcome alignment boundary themselves/i,
  );
  assert.match(
    docsText,
    /broader neutral stop-outcome semantic model work, uncovered reason-code policy, and future PDF artifact stop-outcome mapping cases remain outside this seam because current repo evidence only freezes the currently concrete PDF artifact stop-outcome alignment surface/i,
  );
  assert.match(
    docsText,
    /future PDF artifact stop-outcome alignment work that needs the same exported alignment object and shared validation entry point should extend this seam instead of introducing parallel PDF artifact stop-outcome alignment validators or schema exports elsewhere in the repo/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, stop-outcome alignment semantics, PDF artifact validation semantics, projection semantics, governance semantics, schema behavior, or fail-closed behavior/i,
  );

  assert.match(
    schemasIndexText,
    /const exportPackagePdfArtifactStopOutcomeAlignment = require\("\.\.\/\.\.\/\.\.\/schemas\/export-package-pdf-artifact-stop-outcome-alignment\.json"\);/,
  );
  assert.match(
    schemasIndexText,
    /const exportPackagePdfArtifactStopOutcomeAlignmentRequiredKeys =\s*exportPackagePdfArtifactStopOutcomeAlignment\.required;/,
  );
  assert.match(
    schemasIndexText,
    /const exportPackagePdfArtifactStopOutcomeAlignmentProfileRequiredKeysByProfile =\s*Object\.freeze\(\{[\s\S]*SWE_BODELNING:[\s\S]*CMD_PROFILE:[\s\S]*\}\);/,
  );
  assert.match(
    schemasIndexText,
    /const exportPackagePdfArtifactStopOutcomeAlignmentReasonCodesByProfile =\s*Object\.freeze\(\{[\s\S]*SWE_BODELNING:[\s\S]*source_export_package_profile_dossier_release_gate_reason_codes[\s\S]*CMD_PROFILE:[\s\S]*source_export_package_profile_dossier_release_gate_reason_codes[\s\S]*\}\);/,
  );
  assert.match(
    schemasIndexText,
    /const exportPackagePdfArtifactStopOutcomeAlignmentArtifactTypeValue =\s*exportPackagePdfArtifactStopOutcomeAlignment\.properties\.SWE_BODELNING[\s\S]*?artifact_type\.const;/,
  );
  assert.match(
    schemasIndexText,
    /const exportPackagePdfArtifactStopOutcomeAlignmentReleaseGateValue =\s*exportPackagePdfArtifactStopOutcomeAlignment\.properties\.SWE_BODELNING[\s\S]*?source_export_package_profile_dossier_release_gate\.const;/,
  );
  assert.match(
    schemasIndexText,
    /const exportPackagePdfArtifactStopOutcomeAlignmentFreshnessValue =\s*exportPackagePdfArtifactStopOutcomeAlignment\.properties\.SWE_BODELNING[\s\S]*?source_export_package_profile_dossier_release_eval_freshness\.const;/,
  );
  assert.match(
    schemasIndexText,
    /function validateExportPackagePdfArtifactStopOutcomeAlignment\(\s*input,\s*errorCode = "ERR_EXPORT_PACKAGE_PDF_ARTIFACT_STOP_OUTCOME_ALIGNMENT_INVALID",\s*\)/,
  );
  assert.match(
    schemasIndexText,
    /assertPlainObject\(input, errorCode, "input"\);/,
  );
  assert.match(
    schemasIndexText,
    /assertExactKeys\(\s*input,\s*exportPackagePdfArtifactStopOutcomeAlignmentRequiredKeys,\s*errorCode,\s*"input",\s*\);/,
  );
  assert.match(
    schemasIndexText,
    /for \(const jurisdictionProfileKey of exportPackagePdfArtifactStopOutcomeAlignmentRequiredKeys\)/,
  );
  assert.match(
    schemasIndexText,
    /const expectedReasonCodes =\s*exportPackagePdfArtifactStopOutcomeAlignmentReasonCodesByProfile\[\s*jurisdictionProfileKey\s*\];/,
  );
  assert.match(
    schemasIndexText,
    /assertPlainObject\(alignmentEntry, errorCode, alignmentField\);/,
  );
  assert.match(
    schemasIndexText,
    /exportPackagePdfArtifactStopOutcomeAlignmentProfileRequiredKeysByProfile\[\s*jurisdictionProfileKey\s*\]/,
  );
  assert.match(
    schemasIndexText,
    /validateStringEnum\(\s*alignmentEntry\.artifact_type,\s*\[exportPackagePdfArtifactStopOutcomeAlignmentArtifactTypeValue\],/,
  );
  assert.match(
    schemasIndexText,
    /validateStringEnum\(\s*alignmentEntry\.source_export_package_profile_dossier_release_gate,\s*\[exportPackagePdfArtifactStopOutcomeAlignmentReleaseGateValue\],/,
  );
  assert.match(
    schemasIndexText,
    /validateStringEnum\(\s*alignmentEntry\.source_export_package_profile_dossier_release_eval_freshness,\s*\[exportPackagePdfArtifactStopOutcomeAlignmentFreshnessValue\],/,
  );
  assert.match(
    schemasIndexText,
    /validateStopOutcomeModel\(alignmentEntry\.canonical_stop_outcome, errorCode\);/,
  );
  assert.match(
    schemasIndexText,
    /canonical_stop_outcome must match source_export_package_profile_dossier_release_gate/,
  );
  assert.match(
    schemasIndexText,
    /validateStringEnumArray\(\s*alignmentEntry\.source_export_package_profile_dossier_release_gate_reason_codes,\s*expectedReasonCodes,/,
  );
  assert.match(
    schemasIndexText,
    /const foundReasonCodes = \[[\s\S]*alignmentEntry\.source_export_package_profile_dossier_release_gate_reason_codes[\s\S]*\]\.sort\(\);/,
  );
  assert.match(
    schemasIndexText,
    /const sortedExpectedReasonCodes = \[\.\.\.expectedReasonCodes\]\.sort\(\);/,
  );
  assert.match(
    schemasIndexText,
    /foundReasonCodes\.length !== sortedExpectedReasonCodes\.length \|\|[\s\S]*foundReasonCodes\.join\(","\) !== sortedExpectedReasonCodes\.join\(","\)/,
  );
  assert.match(
    schemasIndexText,
    /source_export_package_profile_dossier_release_gate_reason_codes must match the canonical reason codes/,
  );
  assert.match(schemasIndexText, /return input;/);

  assert.deepEqual(
    collectLineMatches(
      schemasIndexText,
      /\bexportPackagePdfArtifactStopOutcomeAlignment\b/,
    ),
    [12, 940, 944, 946, 951, 955, 959, 962, 965, 12970],
  );
  assert.deepEqual(
    collectLineMatches(
      schemasIndexText,
      /\bvalidateExportPackagePdfArtifactStopOutcomeAlignment\b/,
    ),
    [4672, 13071],
  );
  assert.deepEqual(
    collectLineMatches(
      governanceIndexText,
      /\bvalidateExportPackagePdfArtifactStopOutcomeAlignment\b/,
    ),
    [],
  );
  assert.deepEqual(
    collectLineMatches(
      databaseIndexText,
      /\bvalidateExportPackagePdfArtifactStopOutcomeAlignment\b/,
    ),
    [],
  );

  assert.match(
    stopOutcomeRuntimeTestText,
    /the current documented export_package_pdf_artifact fail-closed baseline aligns to the stop-outcome model for SWE_BODELNING where docs are concrete enough/,
  );
  assert.match(
    stopOutcomeRuntimeTestText,
    /the current documented export_package_pdf_artifact fail-closed baseline aligns to the stop-outcome model for CMD_PROFILE where docs are concrete enough/,
  );
  assert.match(
    stopOutcomeRuntimeTestText,
    /governance_baseline_fail_closed_pending_completeness_support_policy/,
  );
  assert.match(stopOutcomeRuntimeTestText, /swe-bodelning-input-incomplete/);
  assert.match(stopOutcomeRuntimeTestText, /swe-bodelning-support-incomplete/);
  assert.match(stopOutcomeRuntimeTestText, /cmd-input-incomplete/);
  assert.match(stopOutcomeRuntimeTestText, /cmd-runtime-not-implemented/);
  assert.match(
    stopOutcomeRuntimeTestText,
    /packages\/schemas exports the export_package_pdf_artifact stop-outcome alignment surface if applicable/,
  );
  assert.match(stopOutcomeRuntimeTestText, /docs describe the same alignment/);
  assert.match(
    stopOutcomeRuntimeTestText,
    /required\.includes\("body_base64"\)/,
  );
  assert.match(
    stopOutcomeRuntimeTestText,
    /required\.includes\("snapshot_status"\)/,
  );
});
