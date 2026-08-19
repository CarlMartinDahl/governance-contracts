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
  path.join(__dirname, "export-package-stop-outcome-alignment.test.js"),
  "utf8",
);

function collectLineMatches(text, pattern) {
  return text
    .split("\n")
    .flatMap((line, index) => (pattern.test(line) ? [index + 1] : []));
}

test("docs freeze the shared packages/schemas export-package stop-outcome alignment seam as the schema-side stop-outcome alignment boundary", () => {
  assert.match(
    docsText,
    /Shared Packages\/Schemas Export Package Stop-Outcome Alignment Seam Freeze/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas\/src\/index\.js` export-package stop-outcome alignment seam formed by `exportPackageStopOutcomeAlignment` and `validateExportPackageStopOutcomeAlignment` is the canonical internal `packages\/schemas` export-package stop-outcome alignment boundary for the current included schema-side flows below and is now frozen as the baseline seam/i,
  );
  assert.match(
    docsText,
    /the currently evidenced schema-side surfaces in this freeze are limited to:\s+exported export-package stop-outcome alignment object sourced from `schemas\/export-package-stop-outcome-alignment\.json` through `packages\/schemas`\s+shared validator for the profile-keyed export-package stop-outcome alignment payload covering `SWE_BODELNING` and `"CMD_PROFILE"`/i,
  );
  assert.match(
    docsText,
    /the currently concrete shared helper responsibilities already evidenced for this seam are limited to:\s+centralizing the exported export-package stop-outcome alignment object inside `packages\/schemas\/src\/index\.js`\s+deriving the currently required top-level profile keys and per-profile required entry keys from that exported alignment object\s+deriving the current blocked\/current release-gate and release-eval-freshness values plus the current profile-specific canonical reason-code sets from that exported alignment object\s+validating the top-level alignment payload as a plain object with the exact currently required profile keys\s+validating each profile entry as a plain object with the exact currently required entry keys\s+enforcing `profile_dossier_release_gate` and `profile_dossier_release_eval_freshness` against the current canonical values\s+validating `canonical_stop_outcome` against the shared neutral stop-outcome contract and enforcing its `stop_outcome` value to match the current `profile_dossier_release_gate`\s+enforcing `profile_dossier_release_gate_reason_codes` against the current profile-specific canonical reason-code sets `governance_baseline_fail_closed_pending_completeness_support_policy`, `swe-bodelning-input-incomplete`, and `swe-bodelning-support-incomplete` for `SWE_BODELNING`, and `cmd-input-incomplete` plus `cmd-runtime-not-implemented` for `"CMD_PROFILE"`\s+enforcing exact-set matching for those current profile-specific reason-code arrays rather than allowing undocumented extras or omissions\s+returning the validated alignment payload unchanged/i,
  );
  assert.match(
    docsText,
    /the current relationship to broader export-package validation and projection contract surfaces already evidenced in repo code is limited to this alignment seam mapping the already documented blocked\/current export-package baseline and reason-code sets while keeping export package `snapshot_status` currentness reporting outside this stop-outcome alignment seam rather than validating export_package payloads or read-time projection return shapes/i,
  );
  assert.match(
    docsText,
    /the current bounded reuse already evidenced across repo code is limited to 1 imported alignment object definition, 5 current schema-side implementation-detail constant definitions derived from that object, no current separate seam-local case helper definition, 1 shared alignment validator definition, the current named module export surface exposing `exportPackageStopOutcomeAlignment` and `validateExportPackageStopOutcomeAlignment`, no current governance-side or database runtime call sites, and 1 current runtime proof file `tests\/export-package-stop-outcome-alignment\.test\.js` spanning the `SWE_BODELNING` case, the `"CMD_PROFILE"` case, the export surface, and docs parity/i,
  );
  assert.match(
    docsText,
    /no current seam-local case helper is evidenced inside this seam because current repo code keeps the current profile-keyed stop-outcome checks inline inside `validateExportPackageStopOutcomeAlignment` rather than routing through a separately reused helper boundary/i,
  );
  assert.match(
    docsText,
    /the shared JSON artifact stop-outcome alignment seam remains outside this seam because JSON artifact-specific `artifact_type` baselines and JSON artifact `snapshot_status` currentness exclusions are separate lower stop-outcome alignment responsibilities rather than this export-package alignment boundary/i,
  );
  assert.match(
    docsText,
    /the shared Markdown artifact stop-outcome alignment seam remains outside this seam because Markdown artifact-specific `artifact_type` baselines and Markdown artifact `snapshot_status` currentness exclusions are separate lower stop-outcome alignment responsibilities rather than this export-package alignment boundary/i,
  );
  assert.match(
    docsText,
    /the shared PDF artifact stop-outcome alignment seam remains outside this seam because PDF artifact-specific `artifact_type` baselines and PDF artifact `snapshot_status` currentness exclusions are separate lower stop-outcome alignment responsibilities rather than this export-package alignment boundary/i,
  );
  assert.match(
    docsText,
    /the shared DOCX artifact stop-outcome alignment seam remains outside this seam because DOCX artifact-specific `artifact_type` baselines and DOCX artifact `snapshot_status` currentness exclusions are separate lower stop-outcome alignment responsibilities rather than this export-package alignment boundary/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas` validation-helper scaffold remains outside this seam because machine-readable error construction, plain-object enforcement, key-shape validation, shared string-enum enforcement, shared string-enum-array enforcement, and shared stop-outcome-model validation are separate frozen internal boundaries consumed by the alignment seam rather than defined by it/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas` export-artifact reconstruction helper scaffold remains outside this seam because export-package stop-outcome alignment operates on documented alignment payloads and does not reconstruct export-package payloads, artifact bodies, or projection payloads/i,
  );
  assert.match(
    docsText,
    /the frozen governance-side export-package adapter-dispatch seam remains outside this seam because governance adapter lookup, generic export-package derivation\/projection dispatch, and higher runtime export-package behavior are separate runtime responsibilities and do not define the schema-side stop-outcome alignment boundary/i,
  );
  assert.match(
    docsText,
    /downstream governance, persistence, API route\/runtime, and other adapter behavior remain outside this seam because they may reference the same surface contractually but do not define the canonical shared schema-side export-package stop-outcome alignment boundary themselves/i,
  );
  assert.match(
    docsText,
    /broader neutral stop-outcome semantic model work, uncovered reason-code policy, and future export-package stop-outcome mapping cases remain outside this seam because current repo evidence only freezes the currently concrete export-package stop-outcome alignment surface/i,
  );
  assert.match(
    docsText,
    /future export-package stop-outcome alignment work that needs the same exported alignment object and shared validation entry point should extend this seam instead of introducing parallel export-package stop-outcome alignment validators or schema exports elsewhere in the repo/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, stop-outcome alignment semantics, export-package validation semantics, projection semantics, governance semantics, schema behavior, or fail-closed behavior/i,
  );

  assert.match(
    schemasIndexText,
    /const exportPackageStopOutcomeAlignment = require\("\.\.\/\.\.\/\.\.\/schemas\/export-package-stop-outcome-alignment\.json"\);/,
  );
  assert.match(
    schemasIndexText,
    /const exportPackageStopOutcomeAlignmentRequiredKeys =\s*exportPackageStopOutcomeAlignment\.required;/,
  );
  assert.match(
    schemasIndexText,
    /const exportPackageStopOutcomeAlignmentProfileRequiredKeysByProfile =\s*Object\.freeze\(\{[\s\S]*SWE_BODELNING:[\s\S]*CMD_PROFILE:[\s\S]*\}\);/,
  );
  assert.match(
    schemasIndexText,
    /const exportPackageStopOutcomeAlignmentReasonCodesByProfile =\s*Object\.freeze\(\{[\s\S]*SWE_BODELNING:[\s\S]*profile_dossier_release_gate_reason_codes[\s\S]*CMD_PROFILE:[\s\S]*profile_dossier_release_gate_reason_codes[\s\S]*\}\);/,
  );
  assert.match(
    schemasIndexText,
    /const exportPackageStopOutcomeAlignmentReleaseGateValue =\s*exportPackageStopOutcomeAlignment\.properties\.SWE_BODELNING[\s\S]*?profile_dossier_release_gate\.const;/,
  );
  assert.match(
    schemasIndexText,
    /const exportPackageStopOutcomeAlignmentFreshnessValue =\s*exportPackageStopOutcomeAlignment\.properties\.SWE_BODELNING[\s\S]*?profile_dossier_release_eval_freshness\.const;/,
  );
  assert.match(
    schemasIndexText,
    /function validateExportPackageStopOutcomeAlignment\(\s*input,\s*errorCode = "ERR_EXPORT_PACKAGE_STOP_OUTCOME_ALIGNMENT_INVALID",\s*\)/,
  );
  assert.match(schemasIndexText, /assertPlainObject\(input, errorCode, "input"\);/);
  assert.match(
    schemasIndexText,
    /assertExactKeys\(\s*input,\s*exportPackageStopOutcomeAlignmentRequiredKeys,\s*errorCode,\s*"input",\s*\);/,
  );
  assert.match(
    schemasIndexText,
    /for \(const jurisdictionProfileKey of exportPackageStopOutcomeAlignmentRequiredKeys\)/,
  );
  assert.match(
    schemasIndexText,
    /const expectedReasonCodes =\s*exportPackageStopOutcomeAlignmentReasonCodesByProfile\[jurisdictionProfileKey\];/,
  );
  assert.match(
    schemasIndexText,
    /assertPlainObject\(alignmentEntry, errorCode, alignmentField\);/,
  );
  assert.match(
    schemasIndexText,
    /exportPackageStopOutcomeAlignmentProfileRequiredKeysByProfile\[\s*jurisdictionProfileKey\s*\]/,
  );
  assert.match(
    schemasIndexText,
    /validateStringEnum\(\s*alignmentEntry\.profile_dossier_release_gate,\s*\[exportPackageStopOutcomeAlignmentReleaseGateValue\],/,
  );
  assert.match(
    schemasIndexText,
    /validateStringEnum\(\s*alignmentEntry\.profile_dossier_release_eval_freshness,\s*\[exportPackageStopOutcomeAlignmentFreshnessValue\],/,
  );
  assert.match(
    schemasIndexText,
    /validateStopOutcomeModel\(alignmentEntry\.canonical_stop_outcome, errorCode\);/,
  );
  assert.match(
    schemasIndexText,
    /canonical_stop_outcome must match profile_dossier_release_gate/,
  );
  assert.match(
    schemasIndexText,
    /validateStringEnumArray\(\s*alignmentEntry\.profile_dossier_release_gate_reason_codes,\s*expectedReasonCodes,/,
  );
  assert.match(
    schemasIndexText,
    /const foundReasonCodes = \[[\s\S]*alignmentEntry\.profile_dossier_release_gate_reason_codes[\s\S]*\]\.sort\(\);/,
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
    /profile_dossier_release_gate_reason_codes must match the canonical reason codes/,
  );
  assert.doesNotMatch(
    schemasIndexText,
    /function validateExportPackageStopOutcomeCase\(/,
  );
  assert.match(schemasIndexText, /return input;/);

  assert.deepEqual(
    collectLineMatches(schemasIndexText, /\bexportPackageStopOutcomeAlignment\b/),
    [21, 98, 102, 103, 107, 110, 114, 117, 12973],
  );
  assert.deepEqual(
    collectLineMatches(
      schemasIndexText,
      /\bvalidateExportPackageStopOutcomeAlignment\b/,
    ),
    [4076, 13074],
  );
  assert.deepEqual(
    collectLineMatches(
      governanceIndexText,
      /\bvalidateExportPackageStopOutcomeAlignment\b/,
    ),
    [],
  );
  assert.deepEqual(
    collectLineMatches(
      databaseIndexText,
      /\bvalidateExportPackageStopOutcomeAlignment\b/,
    ),
    [],
  );

  assert.match(
    stopOutcomeRuntimeTestText,
    /the current documented export_package fail-closed baseline aligns to the stop-outcome model for SWE_BODELNING where docs are concrete enough/,
  );
  assert.match(
    stopOutcomeRuntimeTestText,
    /the current documented export_package fail-closed baseline aligns to the stop-outcome model for CMD_PROFILE where docs are concrete enough/,
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
    /packages\/schemas exports the export_package stop-outcome alignment surface if applicable/,
  );
  assert.match(
    stopOutcomeRuntimeTestText,
    /docs describe the same export_package-to-stop-outcome alignment/,
  );
  assert.match(
    stopOutcomeRuntimeTestText,
    /export package `snapshot_status` currentness reporting remains intentionally outside this stop-outcome alignment surface/i,
  );
});
