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
  path.join(__dirname, "export-package-markdown-artifact-traceability-alignment.test.js"),
  "utf8",
);

function collectLineMatches(text, pattern) {
  return text
    .split("\n")
    .flatMap((line, index) => (pattern.test(line) ? [index + 1] : []));
}

test("docs freeze the shared packages/schemas Markdown artifact traceability alignment seam as the schema-side traceability alignment boundary", () => {
  assert.match(
    docsText,
    /Shared Packages\/Schemas Markdown Artifact Traceability Alignment Seam Freeze/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas\/src\/index\.js` Markdown artifact traceability alignment seam formed by `exportPackageMarkdownArtifactTraceabilityAlignment` and `validateExportPackageMarkdownArtifactTraceabilityAlignment` is the canonical internal `packages\/schemas` Markdown artifact traceability alignment boundary for the current included schema-side flows below and is now frozen as the baseline seam/i,
  );
  assert.match(
    docsText,
    /the currently evidenced schema-side surfaces in this freeze are limited to:\s+exported Markdown artifact traceability alignment object sourced from `schemas\/export-package-markdown-artifact-traceability-alignment\.json` through `packages\/schemas`\s+shared validator for the case-keyed Markdown artifact traceability alignment payload covering `SWE_BODELNING_INPUT_INCOMPLETE`, `SWE_BODELNING_SUPPORT_INCOMPLETE`, `CMD_PROFILE_INPUT_INCOMPLETE`, and `CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED`/i,
  );
  assert.match(
    docsText,
    /the currently concrete shared helper responsibilities already evidenced for this seam are limited to:\s+centralizing the exported Markdown artifact traceability alignment object inside `packages\/schemas\/src\/index\.js`\s+deriving the currently required top-level case keys and per-case required entry keys from that exported alignment object\s+deriving the current per-case canonical `jurisdiction_profile_key`, `artifact_type`, `source_export_package_profile_dossier_release_gate`, `source_export_package_profile_dossier_release_eval_freshness`, `source_export_package_profile_dossier_release_gate_reason_code`, required traceability keys, and canonical traceability reference sets from that exported alignment object\s+validating the top-level alignment payload as a plain object with the exact currently required case keys\s+validating each case entry as a plain object with the exact currently required entry keys\s+enforcing each case entry `jurisdiction_profile_key`, `artifact_type`, `source_export_package_profile_dossier_release_gate`, `source_export_package_profile_dossier_release_eval_freshness`, and `source_export_package_profile_dossier_release_gate_reason_code` against the current canonical per-case values derived from the exported alignment object\s+validating each case `traceability` block as a plain object with the exact currently required traceability keys and the shared neutral traceability model through the current internal seam-local case-validation helper\s+enforcing exact-set matching for `input_references`, `documented_rule_references`, `canonical_output_references`, and where currently concrete `change_causes` against the current per-case canonical traceability reference sets derived from the exported alignment object\s+returning the validated alignment payload unchanged/i,
  );
  assert.match(
    docsText,
    /the current relationship to the shared Markdown artifact validator seam already evidenced in repo code is limited to this alignment seam recording the already documented Markdown artifact schema outputs and blocked\/current release-gate reason-code baselines rather than validating artifact-envelope fields, filename\/content-type\/encoding\/body-utf8 validation, or generic Markdown artifact validator dispatch/i,
  );
  assert.match(
    docsText,
    /the current relationship to the shared Markdown artifact projection-validator seam already evidenced in repo code is limited to this alignment seam recording the already documented Markdown artifact projection schema outputs while keeping Markdown artifact `snapshot_status` currentness reporting outside this traceability alignment seam rather than validating projection payloads or read-time projection return shapes/i,
  );
  assert.match(
    docsText,
    /the current bounded reuse already evidenced across repo code is limited to 1 imported alignment object definition, 9 current schema-side implementation-detail constant definitions derived from that object, 1 current internal case-traceability validation helper definition with 1 current shared validator call site inside this seam, 1 shared alignment validator definition, the current named module export surface exposing `exportPackageMarkdownArtifactTraceabilityAlignment` and `validateExportPackageMarkdownArtifactTraceabilityAlignment`, no current governance-side or database runtime call sites, and 1 current runtime proof file `tests\/export-package-markdown-artifact-traceability-alignment\.test\.js` spanning the `SWE_BODELNING` input-incomplete case, the `SWE_BODELNING` support-incomplete case, the `"CMD_PROFILE"` input-incomplete case, the current documented first `"CMD_PROFILE"` runtime-not-implemented rule case, the export surface, and docs parity/i,
  );
  assert.match(
    docsText,
    /the nearby `validateExportPackageMarkdownArtifactTraceabilityCase` helper remains an internal implementation detail within this seam because current repo evidence limits it to 1 helper definition and 1 current shared validator call site inside `validateExportPackageMarkdownArtifactTraceabilityAlignment` rather than showing a separately reused shared boundary/i,
  );
  assert.match(
    docsText,
    /the shared Markdown artifact validator seam remains outside this seam because artifact-envelope validation, filename\/content-type\/encoding\/body-utf8 validation, canonical Markdown equality, and generic Markdown artifact validator dispatch are separate frozen responsibilities rather than traceability alignment responsibilities/i,
  );
  assert.match(
    docsText,
    /the shared Markdown artifact projection-validator seam remains outside this seam because projection-level `snapshot_status` currentness validation, reconstruction-based export-version comparison, and normalized projection return-shape enforcement are separate frozen responsibilities rather than traceability alignment responsibilities/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas` validation-helper scaffold remains outside this seam because machine-readable error construction, plain-object enforcement, key-shape validation, shared string-enum enforcement, and shared traceability-model validation are separate frozen internal boundaries consumed by the alignment seam rather than defined by it/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas` export-artifact reconstruction helper scaffold remains outside this seam because Markdown artifact traceability alignment operates on documented alignment payloads and does not reconstruct Markdown bodies or projection payloads/i,
  );
  assert.match(
    docsText,
    /the frozen governance-side Markdown artifact adapter-dispatch seam remains outside this seam because governance adapter lookup, generic derivation\/projection dispatch, persisted Markdown artifact assembly, and higher runtime Markdown artifact behavior are separate runtime responsibilities and do not define the schema-side traceability alignment boundary/i,
  );
  assert.match(
    docsText,
    /downstream governance, persistence, API route\/runtime, and other adapter behavior remain outside this seam because they may reference the same surface contractually but do not define the canonical shared schema-side Markdown artifact traceability alignment boundary themselves/i,
  );
  assert.match(
    docsText,
    /broader neutral traceability semantic model work, uncovered reference-policy work, and future Markdown artifact traceability cases remain outside this seam because current repo evidence only freezes the currently concrete Markdown artifact traceability alignment surface/i,
  );
  assert.match(
    docsText,
    /future Markdown artifact traceability alignment work that needs the same exported alignment object and shared validation entry point should extend this seam instead of introducing parallel Markdown artifact traceability alignment validators or schema exports elsewhere in the repo/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, traceability alignment semantics, Markdown artifact validation semantics, projection semantics, governance semantics, schema behavior, or fail-closed behavior/i,
  );

  assert.match(
    schemasIndexText,
    /const exportPackageMarkdownArtifactTraceabilityAlignment = require\("\.\.\/\.\.\/\.\.\/schemas\/export-package-markdown-artifact-traceability-alignment\.json"\);/,
  );
  assert.match(
    schemasIndexText,
    /const exportPackageMarkdownArtifactTraceabilityAlignmentRequiredKeys =\s*exportPackageMarkdownArtifactTraceabilityAlignment\.required;/,
  );
  assert.match(
    schemasIndexText,
    /const exportPackageMarkdownArtifactTraceabilityAlignmentEntryRequiredKeysByCase =\s*Object\.freeze\(\{[\s\S]*SWE_BODELNING_INPUT_INCOMPLETE:[\s\S]*SWE_BODELNING_SUPPORT_INCOMPLETE:[\s\S]*CMD_PROFILE_INPUT_INCOMPLETE:[\s\S]*CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:[\s\S]*\}\);/,
  );
  assert.match(
    schemasIndexText,
    /const exportPackageMarkdownArtifactTraceabilityAlignmentJurisdictionProfileKeyByCase =\s*Object\.freeze\(\{[\s\S]*SWE_BODELNING_INPUT_INCOMPLETE:[\s\S]*CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:[\s\S]*\}\);/,
  );
  assert.match(
    schemasIndexText,
    /const exportPackageMarkdownArtifactTraceabilityAlignmentArtifactTypeByCase =\s*Object\.freeze\(\{[\s\S]*SWE_BODELNING_INPUT_INCOMPLETE:[\s\S]*CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:[\s\S]*\}\);/,
  );
  assert.match(
    schemasIndexText,
    /const exportPackageMarkdownArtifactTraceabilityAlignmentReleaseGateByCase =\s*Object\.freeze\(\{[\s\S]*SWE_BODELNING_INPUT_INCOMPLETE:[\s\S]*CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:[\s\S]*\}\);/,
  );
  assert.match(
    schemasIndexText,
    /const exportPackageMarkdownArtifactTraceabilityAlignmentFreshnessByCase =\s*Object\.freeze\(\{[\s\S]*SWE_BODELNING_INPUT_INCOMPLETE:[\s\S]*CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:[\s\S]*\}\);/,
  );
  assert.match(
    schemasIndexText,
    /const exportPackageMarkdownArtifactTraceabilityAlignmentReasonCodeByCase =\s*Object\.freeze\(\{[\s\S]*SWE_BODELNING_INPUT_INCOMPLETE:[\s\S]*CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:[\s\S]*\}\);/,
  );
  assert.match(
    schemasIndexText,
    /const exportPackageMarkdownArtifactTraceabilityAlignmentTraceabilityRequiredKeysByCase =\s*Object\.freeze\(\{[\s\S]*SWE_BODELNING_INPUT_INCOMPLETE:[\s\S]*CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:[\s\S]*\}\);/,
  );
  assert.match(
    schemasIndexText,
    /const exportPackageMarkdownArtifactTraceabilityAlignmentCanonicalTraceabilityByCase =\s*Object\.freeze\(\{[\s\S]*input_references:[\s\S]*documented_rule_references:[\s\S]*canonical_output_references:[\s\S]*change_causes:[\s\S]*\}\);/,
  );
  assert.match(
    schemasIndexText,
    /function validateExportPackageMarkdownArtifactTraceabilityCase\(\s*traceability,\s*expectedTraceability,\s*errorCode,\s*traceabilityField,\s*caseKey,\s*\)/,
  );
  assert.match(
    schemasIndexText,
    /assertPlainObject\(traceability, errorCode, traceabilityField\);/,
  );
  assert.match(
    schemasIndexText,
    /assertExactKeys\(\s*traceability,\s*exportPackageMarkdownArtifactTraceabilityAlignmentTraceabilityRequiredKeysByCase\[\s*caseKey\s*\],\s*errorCode,\s*traceabilityField,\s*\);/,
  );
  assert.match(
    schemasIndexText,
    /validateTraceabilityModel\(traceability, errorCode\);/,
  );
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
    /function validateExportPackageMarkdownArtifactTraceabilityAlignment\(\s*input,\s*errorCode = "ERR_EXPORT_PACKAGE_MARKDOWN_ARTIFACT_TRACEABILITY_ALIGNMENT_INVALID",\s*\)/,
  );
  assert.match(
    schemasIndexText,
    /assertExactKeys\(\s*input,\s*exportPackageMarkdownArtifactTraceabilityAlignmentRequiredKeys,\s*errorCode,\s*"input",\s*\);/,
  );
  assert.match(
    schemasIndexText,
    /for \(const caseKey of exportPackageMarkdownArtifactTraceabilityAlignmentRequiredKeys\)/,
  );
  assert.match(
    schemasIndexText,
    /validateStringEnum\(\s*alignmentEntry\.jurisdiction_profile_key,\s*\[[\s\S]*?exportPackageMarkdownArtifactTraceabilityAlignmentJurisdictionProfileKeyByCase\[\s*caseKey\s*\][\s\S]*?\],/,
  );
  assert.match(
    schemasIndexText,
    /validateStringEnum\(\s*alignmentEntry\.artifact_type,\s*\[[\s\S]*?exportPackageMarkdownArtifactTraceabilityAlignmentArtifactTypeByCase\[\s*caseKey\s*\][\s\S]*?\],/,
  );
  assert.match(
    schemasIndexText,
    /validateStringEnum\(\s*alignmentEntry\.source_export_package_profile_dossier_release_gate,\s*\[[\s\S]*?exportPackageMarkdownArtifactTraceabilityAlignmentReleaseGateByCase\[caseKey\][\s\S]*?\],/,
  );
  assert.match(
    schemasIndexText,
    /validateStringEnum\(\s*alignmentEntry\.source_export_package_profile_dossier_release_eval_freshness,\s*\[[\s\S]*?exportPackageMarkdownArtifactTraceabilityAlignmentFreshnessByCase\[caseKey\][\s\S]*?\],/,
  );
  assert.match(
    schemasIndexText,
    /validateStringEnum\(\s*alignmentEntry\.source_export_package_profile_dossier_release_gate_reason_code,\s*\[[\s\S]*?exportPackageMarkdownArtifactTraceabilityAlignmentReasonCodeByCase\[caseKey\][\s\S]*?\],/,
  );
  assert.match(
    schemasIndexText,
    /validateExportPackageMarkdownArtifactTraceabilityCase\(\s*alignmentEntry\.traceability,\s*exportPackageMarkdownArtifactTraceabilityAlignmentCanonicalTraceabilityByCase\[\s*caseKey\s*\],/,
  );
  assert.match(schemasIndexText, /return input;/);

  assert.deepEqual(
    collectLineMatches(
      schemasIndexText,
      /\bexportPackageMarkdownArtifactTraceabilityAlignment\b/,
    ),
    [
      10, 1231, 1235, 1238, 1241, 1244, 1250, 1253, 1256, 1259, 1266, 1269,
      1272, 1275, 1282, 1286, 1290, 1294, 1301, 1305, 1309, 1313, 1320, 1324,
      1328, 1332, 1339, 1342, 1345, 1348, 1356, 1360, 1364, 1368, 1374, 1378,
      1382, 1386, 1392, 1396, 1400, 1404, 1410, 1414, 1418, 1422, 12968,
    ],
  );
  assert.deepEqual(
    collectLineMatches(
      schemasIndexText,
      /\bvalidateExportPackageMarkdownArtifactTraceabilityCase\b/,
    ),
    [5718, 5962],
  );
  assert.deepEqual(
    collectLineMatches(
      schemasIndexText,
      /\bvalidateExportPackageMarkdownArtifactTraceabilityAlignment\b/,
    ),
    [5903, 13069],
  );
  assert.deepEqual(
    collectLineMatches(
      governanceIndexText,
      /\bvalidateExportPackageMarkdownArtifactTraceabilityAlignment\b/,
    ),
    [],
  );
  assert.deepEqual(
    collectLineMatches(
      databaseIndexText,
      /\bvalidateExportPackageMarkdownArtifactTraceabilityAlignment\b/,
    ),
    [],
  );

  assert.match(
    traceabilityRuntimeTestText,
    /the current documented export_package_markdown_artifact input-incomplete baseline has canonical traceability alignment for SWE_BODELNING where docs are concrete enough/,
  );
  assert.match(
    traceabilityRuntimeTestText,
    /the current documented export_package_markdown_artifact support-incomplete baseline has canonical traceability alignment for SWE_BODELNING where docs are concrete enough/,
  );
  assert.match(
    traceabilityRuntimeTestText,
    /the current documented export_package_markdown_artifact input-incomplete baseline has canonical traceability alignment for CMD_PROFILE where docs are concrete enough/,
  );
  assert.match(
    traceabilityRuntimeTestText,
    /the current documented first CMD_PROFILE rule as reflected through export_package_markdown_artifact has canonical traceability alignment where docs are concrete enough/,
  );
  assert.match(
    traceabilityRuntimeTestText,
    /packages\/schemas exports the export_package_markdown_artifact traceability alignment surface if applicable/,
  );
  assert.match(
    traceabilityRuntimeTestText,
    /docs describe the same export_package_markdown_artifact-to-traceability alignment/,
  );
  assert.match(traceabilityRuntimeTestText, /`changed_input`/);
  assert.match(traceabilityRuntimeTestText, /`changed_support`/);
  assert.match(traceabilityRuntimeTestText, /`changed_rule`/);
  assert.match(
    traceabilityRuntimeTestText,
    /required\.includes\(\s*"snapshot_status"/,
  );
});
