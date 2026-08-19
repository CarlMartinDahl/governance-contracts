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
  path.join(__dirname, "export-package-markdown-artifact-stop-outcome-alignment.test.js"),
  "utf8",
);

function collectLineMatches(text, pattern) {
  return text
    .split("\n")
    .flatMap((line, index) => (pattern.test(line) ? [index + 1] : []));
}

test("docs freeze the shared packages/schemas Markdown artifact stop-outcome alignment seam as the schema-side stop-outcome alignment boundary", () => {
  assert.match(
    docsText,
    /Shared Packages\/Schemas Markdown Artifact Stop-Outcome Alignment Seam Freeze/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas\/src\/index\.js` Markdown artifact stop-outcome alignment seam formed by `exportPackageMarkdownArtifactStopOutcomeAlignment` and `validateExportPackageMarkdownArtifactStopOutcomeAlignment` is the canonical internal `packages\/schemas` Markdown artifact stop-outcome alignment boundary for the current included schema-side flows below and is now frozen as the baseline seam/i,
  );
  assert.match(
    docsText,
    /the currently evidenced schema-side surfaces in this freeze are limited to:\s+exported Markdown artifact stop-outcome alignment object sourced from `schemas\/export-package-markdown-artifact-stop-outcome-alignment\.json` through `packages\/schemas`\s+shared validator for the profile-keyed Markdown artifact stop-outcome alignment payload covering `SWE_BODELNING` and `"CMD_PROFILE"`/i,
  );
  assert.match(
    docsText,
    /the currently concrete shared helper responsibilities already evidenced for this seam are limited to:\s+centralizing the exported Markdown artifact stop-outcome alignment object inside `packages\/schemas\/src\/index\.js`\s+deriving the currently required top-level profile keys and per-profile required entry keys from that exported alignment object\s+deriving the current canonical `artifact_type`, blocked\/current release-gate and release-eval-freshness values plus the current profile-specific canonical reason-code sets from that exported alignment object\s+validating the top-level alignment payload as a plain object with the exact currently required profile keys\s+validating each profile entry as a plain object with the exact currently required entry keys\s+enforcing `artifact_type`, `source_export_package_profile_dossier_release_gate`, and `source_export_package_profile_dossier_release_eval_freshness` against the current canonical values\s+validating `canonical_stop_outcome` against the shared neutral stop-outcome contract and enforcing its `stop_outcome` value to match the current `source_export_package_profile_dossier_release_gate`\s+enforcing `source_export_package_profile_dossier_release_gate_reason_codes` against the current profile-specific canonical reason-code sets `governance_baseline_fail_closed_pending_completeness_support_policy`, `swe-bodelning-input-incomplete`, and `swe-bodelning-support-incomplete` for `SWE_BODELNING`, and `cmd-input-incomplete` plus `cmd-runtime-not-implemented` for `"CMD_PROFILE"`\s+enforcing exact-set matching for those current profile-specific reason-code arrays rather than allowing undocumented extras or omissions\s+returning the validated alignment payload unchanged/i,
  );
  assert.match(
    docsText,
    /the current relationship to the shared Markdown artifact validator seam already evidenced in repo code is limited to this alignment seam mapping the already documented blocked\/current Markdown artifact baseline and reason-code sets rather than validating artifact-envelope fields, filename\/content-type\/encoding\/body-utf8 validation, or generic Markdown artifact validator dispatch/i,
  );
  assert.match(
    docsText,
    /the current relationship to the shared Markdown artifact projection-validator seam already evidenced in repo code is limited to keeping Markdown artifact `snapshot_status` currentness reporting outside this stop-outcome alignment seam rather than validating projection payloads or read-time projection return shapes/i,
  );
  assert.match(
    docsText,
    /the current bounded reuse already evidenced across repo code is limited to 1 imported alignment object definition, 6 current schema-side implementation-detail constant definitions derived from that object, 1 shared alignment validator definition, the current named module export surface exposing `exportPackageMarkdownArtifactStopOutcomeAlignment` and `validateExportPackageMarkdownArtifactStopOutcomeAlignment`, no current governance-side or database runtime call sites, and 1 current runtime proof file `tests\/export-package-markdown-artifact-stop-outcome-alignment\.test\.js` spanning the `SWE_BODELNING` case, the `"CMD_PROFILE"` case, the export surface, and docs parity/i,
  );
  assert.match(
    docsText,
    /the shared Markdown artifact validator seam remains outside this seam because artifact-envelope validation, filename\/content-type\/encoding\/body-utf8 validation, canonical Markdown equality, and generic Markdown artifact validator dispatch are separate frozen responsibilities rather than stop-outcome alignment responsibilities/i,
  );
  assert.match(
    docsText,
    /the shared Markdown artifact projection-validator seam remains outside this seam because projection-level `snapshot_status` currentness validation, reconstruction-based export-version comparison, and normalized projection return-shape enforcement are separate frozen responsibilities rather than stop-outcome alignment responsibilities/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas` validation-helper scaffold remains outside this seam because machine-readable error construction, plain-object enforcement, key-shape validation, shared string-enum enforcement, shared string-enum-array enforcement, and shared stop-outcome-model validation are separate frozen internal boundaries consumed by the alignment seam rather than defined by it/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas` export-artifact reconstruction helper scaffold remains outside this seam because Markdown artifact stop-outcome alignment operates on documented alignment payloads and does not reconstruct Markdown bodies or projection payloads/i,
  );
  assert.match(
    docsText,
    /the frozen governance-side Markdown artifact adapter-dispatch seam remains outside this seam because governance adapter lookup, generic derivation\/projection dispatch, persisted Markdown artifact assembly, and higher runtime Markdown artifact behavior are separate runtime responsibilities and do not define the schema-side Markdown artifact stop-outcome alignment boundary/i,
  );
  assert.match(
    docsText,
    /downstream governance, persistence, API route\/runtime, and other adapter behavior remain outside this seam because they may reference the same surface contractually but do not define the canonical shared schema-side Markdown artifact stop-outcome alignment boundary themselves/i,
  );
  assert.match(
    docsText,
    /broader neutral stop-outcome semantic model work, uncovered reason-code policy, and future Markdown artifact stop-outcome mapping cases remain outside this seam because current repo evidence only freezes the currently concrete Markdown artifact stop-outcome alignment surface/i,
  );
  assert.match(
    docsText,
    /future Markdown artifact stop-outcome alignment work that needs the same exported alignment object and shared validation entry point should extend this seam instead of introducing parallel Markdown artifact stop-outcome alignment validators or schema exports elsewhere in the repo/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, stop-outcome alignment semantics, Markdown artifact validation semantics, projection semantics, governance semantics, schema behavior, or fail-closed behavior/i,
  );

  assert.match(
    schemasIndexText,
    /const exportPackageMarkdownArtifactStopOutcomeAlignment = require\("\.\.\/\.\.\/\.\.\/schemas\/export-package-markdown-artifact-stop-outcome-alignment\.json"\);/,
  );
  assert.match(
    schemasIndexText,
    /const exportPackageMarkdownArtifactStopOutcomeAlignmentRequiredKeys =\s*exportPackageMarkdownArtifactStopOutcomeAlignment\.required;/,
  );
  assert.match(
    schemasIndexText,
    /const exportPackageMarkdownArtifactStopOutcomeAlignmentProfileRequiredKeysByProfile =\s*Object\.freeze\(\{[\s\S]*SWE_BODELNING:[\s\S]*CMD_PROFILE:[\s\S]*\}\);/,
  );
  assert.match(
    schemasIndexText,
    /const exportPackageMarkdownArtifactStopOutcomeAlignmentReasonCodesByProfile =\s*Object\.freeze\(\{[\s\S]*SWE_BODELNING:[\s\S]*source_export_package_profile_dossier_release_gate_reason_codes[\s\S]*CMD_PROFILE:[\s\S]*source_export_package_profile_dossier_release_gate_reason_codes[\s\S]*\}\);/,
  );
  assert.match(
    schemasIndexText,
    /const exportPackageMarkdownArtifactStopOutcomeAlignmentArtifactTypeValue =\s*exportPackageMarkdownArtifactStopOutcomeAlignment\.properties\.SWE_BODELNING[\s\S]*?artifact_type\.const;/,
  );
  assert.match(
    schemasIndexText,
    /const exportPackageMarkdownArtifactStopOutcomeAlignmentReleaseGateValue =\s*exportPackageMarkdownArtifactStopOutcomeAlignment\.properties\.SWE_BODELNING[\s\S]*?source_export_package_profile_dossier_release_gate\.const;/,
  );
  assert.match(
    schemasIndexText,
    /const exportPackageMarkdownArtifactStopOutcomeAlignmentFreshnessValue =\s*exportPackageMarkdownArtifactStopOutcomeAlignment\.properties\.SWE_BODELNING[\s\S]*?source_export_package_profile_dossier_release_eval_freshness\.const;/,
  );
  assert.match(
    schemasIndexText,
    /function validateExportPackageMarkdownArtifactStopOutcomeAlignment\(\s*input,\s*errorCode = "ERR_EXPORT_PACKAGE_MARKDOWN_ARTIFACT_STOP_OUTCOME_ALIGNMENT_INVALID",\s*\)/,
  );
  assert.match(schemasIndexText, /assertPlainObject\(input, errorCode, "input"\);/);
  assert.match(
    schemasIndexText,
    /assertExactKeys\(\s*input,\s*exportPackageMarkdownArtifactStopOutcomeAlignmentRequiredKeys,\s*errorCode,\s*"input",\s*\);/,
  );
  assert.match(
    schemasIndexText,
    /for \(const jurisdictionProfileKey of exportPackageMarkdownArtifactStopOutcomeAlignmentRequiredKeys\)/,
  );
  assert.match(
    schemasIndexText,
    /const expectedReasonCodes =\s*exportPackageMarkdownArtifactStopOutcomeAlignmentReasonCodesByProfile\[\s*jurisdictionProfileKey\s*\];/,
  );
  assert.match(
    schemasIndexText,
    /assertPlainObject\(alignmentEntry, errorCode, alignmentField\);/,
  );
  assert.match(
    schemasIndexText,
    /exportPackageMarkdownArtifactStopOutcomeAlignmentProfileRequiredKeysByProfile\[\s*jurisdictionProfileKey\s*\]/,
  );
  assert.match(
    schemasIndexText,
    /validateStringEnum\(\s*alignmentEntry\.artifact_type,\s*\[exportPackageMarkdownArtifactStopOutcomeAlignmentArtifactTypeValue\],/,
  );
  assert.match(
    schemasIndexText,
    /validateStringEnum\(\s*alignmentEntry\.source_export_package_profile_dossier_release_gate,\s*\[exportPackageMarkdownArtifactStopOutcomeAlignmentReleaseGateValue\],/,
  );
  assert.match(
    schemasIndexText,
    /validateStringEnum\(\s*alignmentEntry\.source_export_package_profile_dossier_release_eval_freshness,\s*\[exportPackageMarkdownArtifactStopOutcomeAlignmentFreshnessValue\],/,
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
      /\bexportPackageMarkdownArtifactStopOutcomeAlignment\b/,
    ),
    [9, 652, 656, 659, 665, 669, 674, 677, 680, 12967],
  );
  assert.deepEqual(
    collectLineMatches(
      schemasIndexText,
      /\bvalidateExportPackageMarkdownArtifactStopOutcomeAlignment\b/,
    ),
    [4575, 13068],
  );
  assert.deepEqual(
    collectLineMatches(
      governanceIndexText,
      /\bvalidateExportPackageMarkdownArtifactStopOutcomeAlignment\b/,
    ),
    [],
  );
  assert.deepEqual(
    collectLineMatches(
      databaseIndexText,
      /\bvalidateExportPackageMarkdownArtifactStopOutcomeAlignment\b/,
    ),
    [],
  );

  assert.match(
    stopOutcomeRuntimeTestText,
    /the current documented export_package_markdown_artifact fail-closed baseline aligns to the stop-outcome model for SWE_BODELNING where docs are concrete enough/,
  );
  assert.match(
    stopOutcomeRuntimeTestText,
    /the current documented export_package_markdown_artifact fail-closed baseline aligns to the stop-outcome model for CMD_PROFILE where docs are concrete enough/,
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
    /packages\/schemas exports the export_package_markdown_artifact stop-outcome alignment surface if applicable/,
  );
  assert.match(stopOutcomeRuntimeTestText, /docs describe the same alignment/);
  assert.match(
    stopOutcomeRuntimeTestText,
    /required\.includes\("body_utf8"\)/,
  );
  assert.match(
    stopOutcomeRuntimeTestText,
    /snapshot_status` currentness reporting remains intentionally outside this stop-outcome alignment surface/,
  );
});
