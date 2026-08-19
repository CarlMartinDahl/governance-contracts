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
  path.join(__dirname, "export-package-bundle-manifest-stop-matrix-alignment.test.js"),
  "utf8",
);

function collectLineMatches(text, pattern) {
  return text
    .split("\n")
    .flatMap((line, index) => (pattern.test(line) ? [index + 1] : []));
}

test("docs freeze the shared packages/schemas bundle/package manifest stop-matrix alignment seam as the schema-side stop-matrix alignment boundary", () => {
  assert.match(
    docsText,
    /Shared Packages\/Schemas Bundle\/Package Manifest Stop-Matrix Alignment Seam Freeze/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas\/src\/index\.js` bundle\/package manifest stop-matrix alignment seam formed by `exportPackageBundleManifestStopMatrixAlignment` and `validateExportPackageBundleManifestStopMatrixAlignment` is the canonical internal `packages\/schemas` bundle\/package manifest stop-matrix alignment boundary for the current included schema-side flows below and is now frozen as the baseline seam/i,
  );
  assert.match(
    docsText,
    /the currently evidenced schema-side surfaces in this freeze are limited to:\s+exported bundle\/package manifest stop-matrix alignment object sourced from `schemas\/export-package-bundle-manifest-stop-matrix-alignment\.json` through `packages\/schemas`\s+shared validator for the profile-keyed bundle\/package manifest stop-matrix alignment payload covering `SWE_BODELNING` and `"CMD_PROFILE"`/i,
  );
  assert.match(
    docsText,
    /the currently concrete shared helper responsibilities already evidenced for this seam are limited to:\s+centralizing the exported bundle\/package manifest stop-matrix alignment object inside `packages\/schemas\/src\/index\.js`\s+deriving the currently required top-level profile keys and per-profile required entry keys from that exported alignment object\s+deriving the current canonical blocked\/current release-gate and release-eval-freshness values plus the current profile-specific reason-code values from that exported alignment object\s+deriving the current `missing_required_input` condition key for the bundle\/package manifest stop-matrix case from that exported alignment object\s+validating the top-level alignment payload as a plain object with the exact currently required profile keys\s+validating each profile entry as a plain object with the exact currently required entry keys\s+enforcing `source_export_package_profile_dossier_release_gate` and `source_export_package_profile_dossier_release_eval_freshness` against the current canonical blocked\/current values\s+enforcing `source_export_package_profile_dossier_release_gate_reason_code` against the current profile-specific reason codes `swe-bodelning-input-incomplete` and `cmd-input-incomplete`\s+validating `stop_matrix_entry` against the current documented `missing_required_input` bundle\/package manifest case and canonical stop outcomes\s+returning the validated alignment payload unchanged/i,
  );
  assert.match(
    docsText,
    /the current relationship to the shared bundle\/package manifest validator seam already evidenced in repo code is limited to this alignment seam mapping the already documented blocked\/current bundle\/package manifest baseline and reason-code cases rather than validating manifest-envelope fields, artifact entries, registry lookup, or generic manifest dispatch/i,
  );
  assert.match(
    docsText,
    /the current relationship to the shared bundle\/package manifest projection-validator seam already evidenced in repo code is limited to keeping bundle\/package manifest `snapshot_status` currentness reporting outside this stop-matrix alignment seam rather than validating projection payloads or read-time projection return shapes/i,
  );
  assert.match(
    docsText,
    /the current bounded reuse already evidenced across repo code is limited to 1 imported alignment object definition, 6 current schema-side implementation-detail constant definitions derived from that object, 1 shared alignment validator definition, the current named module export surface exposing `exportPackageBundleManifestStopMatrixAlignment` and `validateExportPackageBundleManifestStopMatrixAlignment`, no current governance-side or database runtime call sites, and 1 current runtime proof file `tests\/export-package-bundle-manifest-stop-matrix-alignment\.test\.js` spanning the `SWE_BODELNING` case, the `"CMD_PROFILE"` case, the export surface, and docs parity/i,
  );
  assert.match(
    docsText,
    /the shared bundle\/package manifest validator seam remains outside this seam because manifest-envelope validation, artifact entry validation, registry lookup, and generic manifest validator dispatch are separate frozen responsibilities rather than stop-matrix alignment responsibilities/i,
  );
  assert.match(
    docsText,
    /the shared bundle\/package manifest projection-validator seam remains outside this seam because projection-level `snapshot_status` currentness validation and normalized projection return-shape enforcement are separate frozen responsibilities rather than stop-matrix alignment responsibilities/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas` validation-helper scaffold remains outside this seam because machine-readable error construction, plain-object enforcement, key-shape validation, and shared string-enum enforcement are separate frozen internal boundaries consumed by the alignment seam rather than defined by it/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas` export-artifact reconstruction helper scaffold remains outside this seam because bundle\/package manifest stop-matrix alignment operates on documented alignment payloads and does not reconstruct artifact bodies or manifest payloads/i,
  );
  assert.match(
    docsText,
    /the frozen governance-side bundle-manifest adapter-dispatch seam remains outside this seam because governance adapter lookup, generic derivation\/projection dispatch, and higher runtime bundle\/package manifest behavior are separate runtime responsibilities and do not define the schema-side stop-matrix alignment boundary/i,
  );
  assert.match(
    docsText,
    /the frozen governance-side bundle\/archive artifact adapter-dispatch seam remains outside this seam because higher bundle\/archive derivation, projection, and currentness behavior are separate runtime responsibilities and do not define the schema-side stop-matrix alignment boundary/i,
  );
  assert.match(
    docsText,
    /downstream governance, persistence, API route\/runtime, and other adapter behavior remain outside this seam because they may reference the same surface contractually but do not define the canonical shared schema-side bundle\/package manifest stop-matrix alignment boundary themselves/i,
  );
  assert.match(
    docsText,
    /broader neutral stop-matrix semantic model work, uncovered reason-code policy, and future non-`missing_required_input` bundle\/package manifest mapping cases remain outside this seam because current repo evidence only freezes the currently concrete bundle\/package manifest stop-matrix alignment surface/i,
  );
  assert.match(
    docsText,
    /future bundle\/package manifest stop-matrix alignment work that needs the same exported alignment object and shared validation entry point should extend this seam instead of introducing parallel bundle\/package manifest stop-matrix alignment validators or schema exports elsewhere in the repo/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, stop-matrix alignment semantics, manifest validation semantics, projection semantics, governance semantics, schema behavior, or fail-closed behavior/i,
  );

  assert.match(
    schemasIndexText,
    /const exportPackageBundleManifestStopMatrixAlignment = require\("\.\.\/\.\.\/\.\.\/schemas\/export-package-bundle-manifest-stop-matrix-alignment\.json"\);/,
  );
  assert.match(
    schemasIndexText,
    /const exportPackageBundleManifestStopMatrixAlignmentRequiredKeys =\s*exportPackageBundleManifestStopMatrixAlignment\.required;/,
  );
  assert.match(
    schemasIndexText,
    /const exportPackageBundleManifestStopMatrixAlignmentProfileRequiredKeysByProfile =\s*Object\.freeze\(\{[\s\S]*SWE_BODELNING:[\s\S]*CMD_PROFILE:[\s\S]*\}\);/,
  );
  assert.match(
    schemasIndexText,
    /const exportPackageBundleManifestStopMatrixAlignmentReleaseGateValue =\s*exportPackageBundleManifestStopMatrixAlignment\.properties\.SWE_BODELNING[\s\S]*?source_export_package_profile_dossier_release_gate\.const;/,
  );
  assert.match(
    schemasIndexText,
    /const exportPackageBundleManifestStopMatrixAlignmentFreshnessValue =\s*exportPackageBundleManifestStopMatrixAlignment\.properties\.SWE_BODELNING[\s\S]*?source_export_package_profile_dossier_release_eval_freshness\.const;/,
  );
  assert.match(
    schemasIndexText,
    /const exportPackageBundleManifestStopMatrixAlignmentReasonCodeByProfile =\s*Object\.freeze\(\{[\s\S]*SWE_BODELNING:[\s\S]*source_export_package_profile_dossier_release_gate_reason_code[\s\S]*CMD_PROFILE:[\s\S]*source_export_package_profile_dossier_release_gate_reason_code[\s\S]*\}\);/,
  );
  assert.match(
    schemasIndexText,
    /const exportPackageBundleManifestStopMatrixAlignmentConditionKey =\s*exportPackageBundleManifestStopMatrixAlignment\.properties\.SWE_BODELNING[\s\S]*?\.properties\.stop_matrix_entry\.allOf\[1\]\.properties\.condition_key\.const;/,
  );
  assert.match(
    schemasIndexText,
    /function validateExportPackageBundleManifestStopMatrixAlignment\(\s*input,\s*errorCode = "ERR_EXPORT_PACKAGE_BUNDLE_MANIFEST_STOP_MATRIX_ALIGNMENT_INVALID",\s*\)/,
  );
  assert.match(
    schemasIndexText,
    /assertPlainObject\(input, errorCode, "input"\);/,
  );
  assert.match(
    schemasIndexText,
    /assertExactKeys\(\s*input,\s*exportPackageBundleManifestStopMatrixAlignmentRequiredKeys,\s*errorCode,\s*"input",\s*\);/,
  );
  assert.match(
    schemasIndexText,
    /for \(const jurisdictionProfileKey of exportPackageBundleManifestStopMatrixAlignmentRequiredKeys\)/,
  );
  assert.match(
    schemasIndexText,
    /assertPlainObject\(alignmentEntry, errorCode, alignmentField\);/,
  );
  assert.match(
    schemasIndexText,
    /exportPackageBundleManifestStopMatrixAlignmentProfileRequiredKeysByProfile\[\s*jurisdictionProfileKey\s*\]/,
  );
  assert.match(
    schemasIndexText,
    /validateStringEnum\(\s*alignmentEntry\.source_export_package_profile_dossier_release_gate,\s*\[exportPackageBundleManifestStopMatrixAlignmentReleaseGateValue\],/,
  );
  assert.match(
    schemasIndexText,
    /validateStringEnum\(\s*alignmentEntry\.source_export_package_profile_dossier_release_eval_freshness,\s*\[exportPackageBundleManifestStopMatrixAlignmentFreshnessValue\],/,
  );
  assert.match(
    schemasIndexText,
    /validateStringEnum\(\s*alignmentEntry\.source_export_package_profile_dossier_release_gate_reason_code,\s*\[[\s\S]*exportPackageBundleManifestStopMatrixAlignmentReasonCodeByProfile\[\s*jurisdictionProfileKey\s*\][\s\S]*\],/,
  );
  assert.match(
    schemasIndexText,
    /validateStopMatrixEntryForAlignment\(\s*alignmentEntry\.stop_matrix_entry,\s*errorCode,\s*`\$\{alignmentField\}\.stop_matrix_entry`,\s*exportPackageBundleManifestStopMatrixAlignmentConditionKey,\s*"export_package_bundle_manifest",\s*\);/,
  );
  assert.match(schemasIndexText, /return input;/);

  assert.deepEqual(
    collectLineMatches(
      schemasIndexText,
      /\bexportPackageBundleManifestStopMatrixAlignment\b/,
    ),
    [17, 410, 414, 417, 421, 424, 429, 433, 438, 12957],
  );
  assert.deepEqual(
    collectLineMatches(
      schemasIndexText,
      /\bvalidateExportPackageBundleManifestStopMatrixAlignment\b/,
    ),
    [4418, 13058],
  );
  assert.deepEqual(
    collectLineMatches(
      governanceIndexText,
      /\bvalidateExportPackageBundleManifestStopMatrixAlignment\b/,
    ),
    [],
  );
  assert.deepEqual(
    collectLineMatches(
      databaseIndexText,
      /\bvalidateExportPackageBundleManifestStopMatrixAlignment\b/,
    ),
    [],
  );

  assert.match(
    stopMatrixRuntimeTestText,
    /the current documented export_package_bundle_manifest fail-closed baseline aligns to the stop-matrix model for SWE_BODELNING where docs are concrete enough/,
  );
  assert.match(
    stopMatrixRuntimeTestText,
    /the current documented export_package_bundle_manifest fail-closed baseline aligns to the stop-matrix model for CMD_PROFILE where docs are concrete enough/,
  );
  assert.match(
    stopMatrixRuntimeTestText,
    /packages\/schemas exports the export_package_bundle_manifest stop-matrix alignment surface if applicable/,
  );
  assert.match(stopMatrixRuntimeTestText, /docs describe the same alignment/);
});
