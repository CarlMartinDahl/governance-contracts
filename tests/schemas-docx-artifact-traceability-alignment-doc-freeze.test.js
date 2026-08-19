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
const traceabilityRuntimeTestText = fs.readFileSync(
  path.join(__dirname, "export-package-docx-artifact-traceability-alignment.test.js"),
  "utf8",
);

function collectLineMatches(text, pattern) {
  return text
    .split("\n")
    .flatMap((line, index) => (pattern.test(line) ? [index + 1] : []));
}

test("docs freeze the shared packages/schemas DOCX artifact traceability alignment seam as the schema-side traceability alignment boundary", () => {
  assert.match(
    docsText,
    /Shared Packages\/Schemas DOCX Artifact Traceability Alignment Seam Freeze/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas\/src\/index\.js` DOCX artifact traceability alignment seam formed by `exportPackageDocxArtifactTraceabilityAlignment` and `validateExportPackageDocxArtifactTraceabilityAlignment` is the canonical internal `packages\/schemas` DOCX artifact traceability alignment boundary for the current included schema-side flows below and is now frozen as the baseline seam/i,
  );
  assert.match(
    docsText,
    /the currently evidenced schema-side surfaces in this freeze are limited to:\s+exported DOCX artifact traceability alignment object sourced from `schemas\/export-package-docx-artifact-traceability-alignment\.json` through `packages\/schemas`\s+shared validator for the case-keyed DOCX artifact traceability alignment payload covering `SWE_BODELNING_INPUT_INCOMPLETE`, `SWE_BODELNING_SUPPORT_INCOMPLETE`, `CMD_PROFILE_INPUT_INCOMPLETE`, and `CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED`/i,
  );
  assert.match(
    docsText,
    /the currently concrete shared helper responsibilities already evidenced for this seam are limited to:\s+centralizing the exported DOCX artifact traceability alignment object inside `packages\/schemas\/src\/index\.js`\s+deriving the currently required top-level case keys and per-case required entry keys from that exported alignment object\s+deriving the current per-case canonical `jurisdiction_profile_key`, `artifact_type`, `source_export_package_profile_dossier_release_gate`, `source_export_package_profile_dossier_release_eval_freshness`, `source_export_package_profile_dossier_release_gate_reason_code`, required traceability keys, and canonical traceability reference sets from that exported alignment object\s+validating the top-level alignment payload as a plain object with the exact currently required case keys\s+validating each case entry as a plain object with the exact currently required entry keys\s+enforcing each case entry `jurisdiction_profile_key`, `artifact_type`, `source_export_package_profile_dossier_release_gate`, `source_export_package_profile_dossier_release_eval_freshness`, and `source_export_package_profile_dossier_release_gate_reason_code` against the current canonical per-case values derived from the exported alignment object\s+validating each case `traceability` block as a plain object with the exact currently required traceability keys and the shared neutral traceability model through the current internal seam-local case-validation helper\s+enforcing exact-set matching for `input_references`, `documented_rule_references`, `canonical_output_references`, and where currently concrete `change_causes` against the current per-case canonical traceability reference sets derived from the exported alignment object\s+returning the validated alignment payload unchanged/i,
  );
  assert.match(
    docsText,
    /the current relationship to the shared DOCX artifact validator seam already evidenced in repo code is limited to this alignment seam recording the already documented DOCX artifact schema outputs and blocked\/current release-gate reason-code baselines rather than validating artifact-envelope fields, filename\/content-type\/encoding\/body-base64 validation, or generic DOCX artifact validator dispatch/i,
  );
  assert.match(
    docsText,
    /the current relationship to the shared DOCX artifact projection-validator seam already evidenced in repo code is limited to this alignment seam recording the already documented DOCX artifact projection schema outputs while keeping DOCX artifact `snapshot_status` currentness reporting outside this traceability alignment seam rather than validating projection payloads or read-time projection return shapes/i,
  );
  assert.match(
    docsText,
    /the current bounded reuse already evidenced across repo code is limited to 1 imported alignment object definition, 9 current schema-side implementation-detail constant definitions derived from that object, 1 current internal case-traceability validation helper definition with 1 current shared validator call site inside this seam, 1 shared alignment validator definition, the current named module export surface exposing `exportPackageDocxArtifactTraceabilityAlignment` and `validateExportPackageDocxArtifactTraceabilityAlignment`, no current governance-side or database runtime call sites, and 1 current runtime proof file `tests\/export-package-docx-artifact-traceability-alignment\.test\.js` spanning the `SWE_BODELNING` input-incomplete case, the `SWE_BODELNING` support-incomplete case, the `"CMD_PROFILE"` input-incomplete case, the current documented first `"CMD_PROFILE"` runtime-not-implemented rule case, the export surface, and docs parity/i,
  );
  assert.match(
    docsText,
    /the shared DOCX artifact validator seam remains outside this seam because artifact-envelope validation, filename\/content-type\/encoding\/body-base64 validation, and generic DOCX artifact validator dispatch are separate frozen responsibilities rather than traceability alignment responsibilities/i,
  );
  assert.match(
    docsText,
    /the shared DOCX artifact projection-validator seam remains outside this seam because projection-level `snapshot_status` currentness validation, reconstruction-based export-version comparison, and normalized projection return-shape enforcement are separate frozen responsibilities rather than traceability alignment responsibilities/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas` validation-helper scaffold remains outside this seam because machine-readable error construction, plain-object enforcement, key-shape validation, shared string-enum enforcement, and shared traceability-model validation are separate frozen internal boundaries consumed by the alignment seam rather than defined by it/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas` export-artifact reconstruction helper scaffold remains outside this seam because DOCX artifact traceability alignment operates on documented alignment payloads and does not reconstruct DOCX bodies or projection payloads/i,
  );
  assert.match(
    docsText,
    /the frozen governance-side DOCX artifact adapter-dispatch seam remains outside this seam because governance adapter lookup, generic derivation\/projection dispatch, persisted DOCX artifact assembly, and higher runtime DOCX artifact behavior are separate runtime responsibilities and do not define the schema-side traceability alignment boundary/i,
  );
  assert.match(
    docsText,
    /downstream governance, persistence, API route\/runtime, and other adapter behavior remain outside this seam because they may reference the same surface contractually but do not define the canonical shared schema-side DOCX artifact traceability alignment boundary themselves/i,
  );
  assert.match(
    docsText,
    /broader neutral traceability semantic model work, uncovered reference-policy work, and future DOCX artifact traceability cases remain outside this seam because current repo evidence only freezes the currently concrete DOCX artifact traceability alignment surface/i,
  );
  assert.match(
    docsText,
    /future DOCX artifact traceability alignment work that needs the same exported alignment object and shared validation entry point should extend this seam instead of introducing parallel DOCX artifact traceability alignment validators or schema exports elsewhere in the repo/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, traceability alignment semantics, DOCX artifact validation semantics, projection semantics, governance semantics, schema behavior, or fail-closed behavior/i,
  );

  assert.match(
    schemasIndexText,
    /const exportPackageDocxArtifactTraceabilityAlignment = require\("\.\.\/\.\.\/\.\.\/schemas\/export-package-docx-artifact-traceability-alignment\.json"\);/,
  );
  assert.match(
    schemasIndexText,
    /const exportPackageDocxArtifactTraceabilityAlignmentRequiredKeys =\s*exportPackageDocxArtifactTraceabilityAlignment\.required;/,
  );
  assert.match(
    schemasIndexText,
    /const exportPackageDocxArtifactTraceabilityAlignmentEntryRequiredKeysByCase =\s*Object\.freeze\(\{[\s\S]*SWE_BODELNING_INPUT_INCOMPLETE:[\s\S]*SWE_BODELNING_SUPPORT_INCOMPLETE:[\s\S]*CMD_PROFILE_INPUT_INCOMPLETE:[\s\S]*CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:[\s\S]*\}\);/,
  );
  assert.match(
    schemasIndexText,
    /const exportPackageDocxArtifactTraceabilityAlignmentJurisdictionProfileKeyByCase =\s*Object\.freeze\(\{[\s\S]*SWE_BODELNING_INPUT_INCOMPLETE:[\s\S]*CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:[\s\S]*\}\);/,
  );
  assert.match(
    schemasIndexText,
    /const exportPackageDocxArtifactTraceabilityAlignmentArtifactTypeByCase =\s*Object\.freeze\(\{[\s\S]*SWE_BODELNING_INPUT_INCOMPLETE:[\s\S]*CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:[\s\S]*\}\);/,
  );
  assert.match(
    schemasIndexText,
    /const exportPackageDocxArtifactTraceabilityAlignmentReleaseGateByCase =\s*Object\.freeze\(\{[\s\S]*SWE_BODELNING_INPUT_INCOMPLETE:[\s\S]*CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:[\s\S]*\}\);/,
  );
  assert.match(
    schemasIndexText,
    /const exportPackageDocxArtifactTraceabilityAlignmentFreshnessByCase =\s*Object\.freeze\(\{[\s\S]*SWE_BODELNING_INPUT_INCOMPLETE:[\s\S]*CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:[\s\S]*\}\);/,
  );
  assert.match(
    schemasIndexText,
    /const exportPackageDocxArtifactTraceabilityAlignmentReasonCodeByCase =\s*Object\.freeze\(\{[\s\S]*SWE_BODELNING_INPUT_INCOMPLETE:[\s\S]*CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:[\s\S]*\}\);/,
  );
  assert.match(
    schemasIndexText,
    /const exportPackageDocxArtifactTraceabilityAlignmentTraceabilityRequiredKeysByCase =\s*Object\.freeze\(\{[\s\S]*SWE_BODELNING_INPUT_INCOMPLETE:[\s\S]*CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:[\s\S]*\}\);/,
  );
  assert.match(
    schemasIndexText,
    /const exportPackageDocxArtifactTraceabilityAlignmentCanonicalTraceabilityByCase =\s*Object\.freeze\(\{[\s\S]*input_references:[\s\S]*documented_rule_references:[\s\S]*canonical_output_references:[\s\S]*change_causes:[\s\S]*\}\);/,
  );
  assert.match(
    schemasIndexText,
    /function validateExportPackageDocxArtifactTraceabilityCase\(\s*traceability,\s*expectedTraceability,\s*errorCode,\s*traceabilityField,\s*caseKey,\s*\)/,
  );
  assert.match(
    schemasIndexText,
    /assertPlainObject\(traceability, errorCode, traceabilityField\);/,
  );
  assert.match(
    schemasIndexText,
    /assertExactKeys\(\s*traceability,\s*exportPackageDocxArtifactTraceabilityAlignmentTraceabilityRequiredKeysByCase\[\s*caseKey\s*\],\s*errorCode,\s*traceabilityField,\s*\);/,
  );
  assert.match(schemasIndexText, /validateTraceabilityModel\(traceability, errorCode\);/);
  assert.match(
    schemasIndexText,
    /for \(const arrayField of Object\.keys\(expectedTraceability\)\)/,
  );
  assert.match(
    schemasIndexText,
    /must match the canonical traceability references/,
  );
  assert.match(
    schemasIndexText,
    /function validateExportPackageDocxArtifactTraceabilityAlignment\(\s*input,\s*errorCode = "ERR_EXPORT_PACKAGE_DOCX_ARTIFACT_TRACEABILITY_ALIGNMENT_INVALID",\s*\)/,
  );
  assert.match(
    schemasIndexText,
    /assertExactKeys\(\s*input,\s*exportPackageDocxArtifactTraceabilityAlignmentRequiredKeys,\s*errorCode,\s*"input",\s*\);/,
  );
  assert.match(
    schemasIndexText,
    /for \(const caseKey of exportPackageDocxArtifactTraceabilityAlignmentRequiredKeys\)/,
  );
  assert.match(
    schemasIndexText,
    /validateStringEnum\(\s*alignmentEntry\.jurisdiction_profile_key,\s*\[[\s\S]*?exportPackageDocxArtifactTraceabilityAlignmentJurisdictionProfileKeyByCase\[\s*caseKey\s*\][\s\S]*?\],/,
  );
  assert.match(
    schemasIndexText,
    /validateStringEnum\(\s*alignmentEntry\.artifact_type,\s*\[[\s\S]*?exportPackageDocxArtifactTraceabilityAlignmentArtifactTypeByCase\[\s*caseKey\s*\][\s\S]*?\],/,
  );
  assert.match(
    schemasIndexText,
    /validateStringEnum\(\s*alignmentEntry\.source_export_package_profile_dossier_release_gate,\s*\[[\s\S]*?exportPackageDocxArtifactTraceabilityAlignmentReleaseGateByCase\[caseKey\][\s\S]*?\],/,
  );
  assert.match(
    schemasIndexText,
    /validateStringEnum\(\s*alignmentEntry\.source_export_package_profile_dossier_release_eval_freshness,\s*\[[\s\S]*?exportPackageDocxArtifactTraceabilityAlignmentFreshnessByCase\[caseKey\][\s\S]*?\],/,
  );
  assert.match(
    schemasIndexText,
    /validateStringEnum\(\s*alignmentEntry\.source_export_package_profile_dossier_release_gate_reason_code,\s*\[[\s\S]*?exportPackageDocxArtifactTraceabilityAlignmentReasonCodeByCase\[caseKey\][\s\S]*?\],/,
  );
  assert.match(
    schemasIndexText,
    /validateExportPackageDocxArtifactTraceabilityCase\(\s*alignmentEntry\.traceability,\s*exportPackageDocxArtifactTraceabilityAlignmentCanonicalTraceabilityByCase\[\s*caseKey\s*\],/,
  );
  assert.match(schemasIndexText, /return input;/);

  assert.deepEqual(
    collectLineMatches(schemasIndexText, /\bexportPackageDocxArtifactTraceabilityAlignment\b/),
    [
      7, 743, 747, 750, 753, 756, 762, 765, 768, 771, 778, 781, 784, 787, 794,
      798, 802, 806, 813, 817, 821, 825, 832, 836, 840, 844, 851, 854, 857,
      860, 868, 872, 876, 880, 886, 890, 894, 898, 904, 908, 912, 916, 922,
      926, 930, 934, 12962,
    ],
  );
  assert.deepEqual(
    collectLineMatches(schemasIndexText, /\bvalidateExportPackageDocxArtifactTraceabilityCase\b/),
    [4932, 5030],
  );
  assert.deepEqual(
    collectLineMatches(
      schemasIndexText,
      /\bvalidateExportPackageDocxArtifactTraceabilityAlignment\b/,
    ),
    [4971, 13063],
  );
  assert.deepEqual(
    collectLineMatches(
      governanceIndexText,
      /\bvalidateExportPackageDocxArtifactTraceabilityAlignment\b/,
    ),
    [],
  );
  assert.deepEqual(
    collectLineMatches(
      databaseIndexText,
      /\bvalidateExportPackageDocxArtifactTraceabilityAlignment\b/,
    ),
    [],
  );

  assert.match(
    traceabilityRuntimeTestText,
    /the current documented export_package_docx_artifact input-incomplete baseline has canonical traceability alignment for SWE_BODELNING where docs are concrete enough/,
  );
  assert.match(
    traceabilityRuntimeTestText,
    /the current documented export_package_docx_artifact support-incomplete baseline has canonical traceability alignment for SWE_BODELNING where docs are concrete enough/,
  );
  assert.match(
    traceabilityRuntimeTestText,
    /the current documented export_package_docx_artifact input-incomplete baseline has canonical traceability alignment for CMD_PROFILE where docs are concrete enough/,
  );
  assert.match(
    traceabilityRuntimeTestText,
    /the current documented first CMD_PROFILE rule as reflected through export_package_docx_artifact has canonical traceability alignment where docs are concrete enough/,
  );
  assert.match(
    traceabilityRuntimeTestText,
    /packages\/schemas exports the export_package_docx_artifact traceability alignment surface if applicable/,
  );
  assert.match(traceabilityRuntimeTestText, /docs describe the same export_package_docx_artifact-to-traceability alignment/);
  assert.match(
    traceabilityRuntimeTestText,
    /required\.includes\(\s*"snapshot_status"/,
  );
});
