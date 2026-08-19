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
  path.join(__dirname, "export-package-bundle-archive-artifact-stop-outcome-alignment.test.js"),
  "utf8",
);

function collectLineMatches(text, pattern) {
  return text
    .split("\n")
    .flatMap((line, index) => (pattern.test(line) ? [index + 1] : []));
}

test("docs freeze the shared packages/schemas bundle/archive artifact stop-outcome alignment seam as the schema-side stop-outcome alignment boundary", () => {
  assert.match(
    docsText,
    /Shared Packages\/Schemas Bundle\/Archive Artifact Stop-Outcome Alignment Seam Freeze/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas\/src\/index\.js` bundle\/archive artifact stop-outcome alignment seam formed by `exportPackageBundleArchiveArtifactStopOutcomeAlignment` and `validateExportPackageBundleArchiveArtifactStopOutcomeAlignment` is the canonical internal `packages\/schemas` bundle\/archive artifact stop-outcome alignment boundary for the current included schema-side flows below and is now frozen as the baseline seam/i,
  );
  assert.match(
    docsText,
    /the currently evidenced schema-side surfaces in this freeze are limited to:\s+exported bundle\/archive artifact stop-outcome alignment object sourced from `schemas\/export-package-bundle-archive-artifact-stop-outcome-alignment\.json` through `packages\/schemas`\s+shared validator for the profile-keyed bundle\/archive artifact stop-outcome alignment payload covering `SWE_BODELNING` and `"CMD_PROFILE"`/i,
  );
  assert.match(
    docsText,
    /the currently concrete shared helper responsibilities already evidenced for this seam are limited to:\s+centralizing the exported bundle\/archive artifact stop-outcome alignment object inside `packages\/schemas\/src\/index\.js`\s+deriving the currently required top-level profile keys and per-profile required entry keys from that exported alignment object\s+deriving the current canonical `artifact_type`, blocked\/current release-gate and release-eval-freshness values, plus the current profile-specific canonical reason-code sets from that exported alignment object\s+validating the top-level alignment payload as a plain object with the exact currently required profile keys\s+validating each profile entry as a plain object with the exact currently required entry keys\s+enforcing `artifact_type`, `source_export_package_profile_dossier_release_gate`, and `source_export_package_profile_dossier_release_eval_freshness` against the current canonical values\s+validating `canonical_stop_outcome` against the shared neutral stop-outcome contract and enforcing its `stop_outcome` value to match the current `source_export_package_profile_dossier_release_gate`\s+enforcing `source_export_package_profile_dossier_release_gate_reason_codes` against the current profile-specific canonical reason-code sets `governance_baseline_fail_closed_pending_completeness_support_policy`, `swe-bodelning-input-incomplete`, and `swe-bodelning-support-incomplete` for `SWE_BODELNING`, and `cmd-input-incomplete` plus `cmd-runtime-not-implemented` for `"CMD_PROFILE"`\s+enforcing exact-set matching for those current profile-specific reason-code arrays rather than allowing undocumented extras or omissions\s+returning the validated alignment payload unchanged/i,
  );
  assert.match(
    docsText,
    /the current relationship to the shared bundle\/archive artifact validator seam already evidenced in repo code is limited to this alignment seam mapping the already documented blocked\/current final bundle\/archive artifact baseline and reason-code sets rather than validating artifact-envelope fields, registry lookup, or generic final bundle\/archive artifact validator dispatch/i,
  );
  assert.match(
    docsText,
    /the current relationship to the shared bundle\/archive artifact projection-validator seam already evidenced in repo code is limited to keeping final bundle\/archive artifact `snapshot_status` currentness reporting outside this stop-outcome alignment seam rather than validating projection payloads or read-time projection return shapes/i,
  );
  assert.match(
    docsText,
    /the current bounded reuse already evidenced across repo code is limited to 1 imported alignment object definition, 6 current schema-side implementation-detail constant definitions derived from that object, 1 shared alignment validator definition, the current named module export surface exposing `exportPackageBundleArchiveArtifactStopOutcomeAlignment` and `validateExportPackageBundleArchiveArtifactStopOutcomeAlignment`, no current governance-side or database runtime call sites, and 1 current runtime proof file `tests\/export-package-bundle-archive-artifact-stop-outcome-alignment\.test\.js` spanning the `SWE_BODELNING` case, the `"CMD_PROFILE"` case, the export surface, and docs parity/i,
  );
  assert.match(
    docsText,
    /the shared bundle\/archive artifact validator seam remains outside this seam because artifact-envelope validation, ZIP filename\/base64\/package-version\/bundle-manifest-fingerprint validation, registry lookup, and generic final bundle\/archive artifact validator dispatch are separate frozen responsibilities rather than stop-outcome alignment responsibilities/i,
  );
  assert.match(
    docsText,
    /the shared bundle\/archive artifact projection-validator seam remains outside this seam because projection-level `snapshot_status` currentness validation and normalized projection return-shape enforcement are separate frozen responsibilities rather than stop-outcome alignment responsibilities/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas` validation-helper scaffold remains outside this seam because machine-readable error construction, plain-object enforcement, key-shape validation, shared string-enum enforcement, shared string-enum-array enforcement, and shared stop-outcome-model validation are separate frozen internal boundaries consumed by the alignment seam rather than defined by it/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas` export-artifact reconstruction helper scaffold remains outside this seam because bundle\/archive artifact stop-outcome alignment operates on documented alignment payloads and does not reconstruct archive bodies or projection payloads/i,
  );
  assert.match(
    docsText,
    /the frozen governance-side bundle\/archive artifact adapter-dispatch seam remains outside this seam because governance adapter lookup, generic derivation\/projection dispatch, persisted final bundle\/archive artifact assembly, and higher runtime bundle\/archive behavior are separate runtime responsibilities and do not define the schema-side stop-outcome alignment boundary/i,
  );
  assert.match(
    docsText,
    /downstream governance, persistence, API route\/runtime, and other adapter behavior remain outside this seam because they may reference the same surface contractually but do not define the canonical shared schema-side bundle\/archive artifact stop-outcome alignment boundary themselves/i,
  );
  assert.match(
    docsText,
    /broader neutral stop-outcome semantic model work, uncovered reason-code policy, and future non-blocked\/current bundle\/archive artifact mapping cases remain outside this seam because current repo evidence only freezes the currently concrete bundle\/archive artifact stop-outcome alignment surface/i,
  );
  assert.match(
    docsText,
    /future bundle\/archive artifact stop-outcome alignment work that needs the same exported alignment object and shared validation entry point should extend this seam instead of introducing parallel bundle\/archive artifact stop-outcome alignment validators or schema exports elsewhere in the repo/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, stop-outcome alignment semantics, bundle\/archive artifact validation semantics, projection semantics, governance semantics, schema behavior, or fail-closed behavior/i,
  );

  assert.match(
    schemasIndexText,
    /const exportPackageBundleArchiveArtifactStopOutcomeAlignment = require\("\.\.\/\.\.\/\.\.\/schemas\/export-package-bundle-archive-artifact-stop-outcome-alignment\.json"\);/,
  );
  assert.match(
    schemasIndexText,
    /const exportPackageBundleArchiveArtifactStopOutcomeAlignmentRequiredKeys =\s*exportPackageBundleArchiveArtifactStopOutcomeAlignment\.required;/,
  );
  assert.match(
    schemasIndexText,
    /const exportPackageBundleArchiveArtifactStopOutcomeAlignmentProfileRequiredKeysByProfile =\s*Object\.freeze\(\{[\s\S]*SWE_BODELNING:[\s\S]*CMD_PROFILE:[\s\S]*\}\);/,
  );
  assert.match(
    schemasIndexText,
    /const exportPackageBundleArchiveArtifactStopOutcomeAlignmentReasonCodesByProfile =\s*Object\.freeze\(\{[\s\S]*SWE_BODELNING:[\s\S]*source_export_package_profile_dossier_release_gate_reason_codes[\s\S]*CMD_PROFILE:[\s\S]*source_export_package_profile_dossier_release_gate_reason_codes[\s\S]*\}\);/,
  );
  assert.match(
    schemasIndexText,
    /const exportPackageBundleArchiveArtifactStopOutcomeAlignmentArtifactTypeValue =\s*exportPackageBundleArchiveArtifactStopOutcomeAlignment\.properties\.SWE_BODELNING[\s\S]*?artifact_type\.const;/,
  );
  assert.match(
    schemasIndexText,
    /const exportPackageBundleArchiveArtifactStopOutcomeAlignmentReleaseGateValue =\s*exportPackageBundleArchiveArtifactStopOutcomeAlignment\.properties\.SWE_BODELNING[\s\S]*?source_export_package_profile_dossier_release_gate\.const;/,
  );
  assert.match(
    schemasIndexText,
    /const exportPackageBundleArchiveArtifactStopOutcomeAlignmentFreshnessValue =\s*exportPackageBundleArchiveArtifactStopOutcomeAlignment\.properties\.SWE_BODELNING[\s\S]*?source_export_package_profile_dossier_release_eval_freshness\.const;/,
  );
  assert.match(
    schemasIndexText,
    /function validateExportPackageBundleArchiveArtifactStopOutcomeAlignment\(\s*input,\s*errorCode = "ERR_EXPORT_PACKAGE_BUNDLE_ARCHIVE_ARTIFACT_STOP_OUTCOME_ALIGNMENT_INVALID",\s*\)/,
  );
  assert.match(
    schemasIndexText,
    /assertPlainObject\(input, errorCode, "input"\);/,
  );
  assert.match(
    schemasIndexText,
    /assertExactKeys\(\s*input,\s*exportPackageBundleArchiveArtifactStopOutcomeAlignmentRequiredKeys,\s*errorCode,\s*"input",\s*\);/,
  );
  assert.match(
    schemasIndexText,
    /for \(const jurisdictionProfileKey of exportPackageBundleArchiveArtifactStopOutcomeAlignmentRequiredKeys\)/,
  );
  assert.match(
    schemasIndexText,
    /const expectedReasonCodes =[\s\S]*exportPackageBundleArchiveArtifactStopOutcomeAlignmentReasonCodesByProfile\[\s*jurisdictionProfileKey\s*\]/,
  );
  assert.match(
    schemasIndexText,
    /assertPlainObject\(alignmentEntry, errorCode, alignmentField\);/,
  );
  assert.match(
    schemasIndexText,
    /exportPackageBundleArchiveArtifactStopOutcomeAlignmentProfileRequiredKeysByProfile\[\s*jurisdictionProfileKey\s*\]/,
  );
  assert.match(
    schemasIndexText,
    /validateStringEnum\(\s*alignmentEntry\.artifact_type,\s*\[exportPackageBundleArchiveArtifactStopOutcomeAlignmentArtifactTypeValue\],/,
  );
  assert.match(
    schemasIndexText,
    /validateStringEnum\(\s*alignmentEntry\.source_export_package_profile_dossier_release_gate,\s*\[exportPackageBundleArchiveArtifactStopOutcomeAlignmentReleaseGateValue\],/,
  );
  assert.match(
    schemasIndexText,
    /validateStringEnum\(\s*alignmentEntry\.source_export_package_profile_dossier_release_eval_freshness,\s*\[exportPackageBundleArchiveArtifactStopOutcomeAlignmentFreshnessValue\],/,
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
      /\bexportPackageBundleArchiveArtifactStopOutcomeAlignment\b/,
    ),
    [15, 120, 124, 127, 133, 137, 142, 145, 148, 12955],
  );
  assert.deepEqual(
    collectLineMatches(
      schemasIndexText,
      /\bvalidateExportPackageBundleArchiveArtifactStopOutcomeAlignment\b/,
    ),
    [4164, 13056],
  );
  assert.deepEqual(
    collectLineMatches(
      governanceIndexText,
      /\bvalidateExportPackageBundleArchiveArtifactStopOutcomeAlignment\b/,
    ),
    [],
  );
  assert.deepEqual(
    collectLineMatches(
      databaseIndexText,
      /\bvalidateExportPackageBundleArchiveArtifactStopOutcomeAlignment\b/,
    ),
    [],
  );

  assert.match(
    stopOutcomeRuntimeTestText,
    /the current documented export_package_bundle_archive_artifact fail-closed baseline aligns to the stop-outcome model for SWE_BODELNING where docs are concrete enough/,
  );
  assert.match(
    stopOutcomeRuntimeTestText,
    /the current documented export_package_bundle_archive_artifact fail-closed baseline aligns to the stop-outcome model for CMD_PROFILE where docs are concrete enough/,
  );
  assert.match(
    stopOutcomeRuntimeTestText,
    /packages\/schemas exports the export_package_bundle_archive_artifact stop-outcome alignment surface if applicable/,
  );
  assert.match(stopOutcomeRuntimeTestText, /docs describe the same alignment/);
  assert.match(
    stopOutcomeRuntimeTestText,
    /required\.includes\("body_base64"\)/,
  );
  assert.match(
    stopOutcomeRuntimeTestText,
    /required\.includes\(\s*"snapshot_status"/,
  );
});
