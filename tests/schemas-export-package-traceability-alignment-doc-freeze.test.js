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
  path.join(__dirname, "export-package-traceability-alignment.test.js"),
  "utf8",
);

function collectLineMatches(text, pattern) {
  return text
    .split("\n")
    .flatMap((line, index) => (pattern.test(line) ? [index + 1] : []));
}

test("docs freeze the shared packages/schemas export-package traceability alignment seam as the schema-side export-package traceability alignment boundary", () => {
  assert.match(
    docsText,
    /Shared Packages\/Schemas Export Package Traceability Alignment Seam Freeze/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas\/src\/index\.js` export-package traceability alignment seam formed by `exportPackageTraceabilityAlignment` and `validateExportPackageTraceabilityAlignment` is the canonical internal `packages\/schemas` export-package traceability alignment boundary for the current included schema-side flows below and is now frozen as the baseline seam/i,
  );
  assert.match(
    docsText,
    /the currently evidenced schema-side surfaces in this freeze are limited to:\s+exported export-package traceability alignment object sourced from `schemas\/export-package-traceability-alignment\.json` through `packages\/schemas`\s+shared validator for the case-keyed export-package traceability alignment payload covering `SWE_BODELNING_INPUT_INCOMPLETE`, `SWE_BODELNING_SUPPORT_INCOMPLETE`, `CMD_PROFILE_INPUT_INCOMPLETE`, and `CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED`/i,
  );
  assert.match(
    docsText,
    /the currently concrete shared helper responsibilities already evidenced for this seam are limited to:\s+centralizing the exported export-package traceability alignment object inside `packages\/schemas\/src\/index\.js`\s+deriving the currently required top-level case keys and per-case required entry keys from that exported alignment object\s+deriving the current per-case canonical `jurisdiction_profile_key`, `profile_dossier_release_gate`, `profile_dossier_release_eval_freshness`, `profile_dossier_release_gate_reason_code`, required traceability keys, and canonical traceability reference sets from that exported alignment object\s+validating the top-level alignment payload as a plain object with the exact currently required case keys\s+validating each case entry as a plain object with the exact currently required entry keys\s+enforcing each case entry `jurisdiction_profile_key`, `profile_dossier_release_gate`, `profile_dossier_release_eval_freshness`, and `profile_dossier_release_gate_reason_code` against the current canonical per-case values derived from the exported alignment object\s+validating each case `traceability` block as a plain object with the exact currently required traceability keys and the shared neutral traceability model through the current internal seam-local case-validation helper\s+enforcing exact-set matching for `input_references`, `documented_rule_references`, `canonical_output_references`, and where currently concrete `change_causes` against the current per-case canonical traceability reference sets derived from the exported alignment object\s+returning the validated alignment payload unchanged/i,
  );
  assert.match(
    docsText,
    /the current relationship to broader export-package validation and projection contract surfaces already evidenced in repo code is limited to this alignment seam recording the already documented export-package and export-package projection schema outputs and blocked\/current profile-dossier release-gate reason-code baselines while keeping export package `snapshot_status` currentness reporting outside this seam rather than validating export_package payloads or read-time projection return shapes/i,
  );
  assert.match(
    docsText,
    /the current bounded reuse already evidenced across repo code is limited to 1 imported alignment object definition, 8 current schema-side implementation-detail constant definitions derived from that object, 1 current internal case-traceability validation helper definition with 1 current shared validator call site inside this seam, 1 shared alignment validator definition, the current named module export surface exposing `exportPackageTraceabilityAlignment` and `validateExportPackageTraceabilityAlignment`, no current governance-side or database runtime call sites, and 1 current runtime proof file `tests\/export-package-traceability-alignment\.test\.js` spanning the `SWE_BODELNING` input-incomplete case, the `SWE_BODELNING` support-incomplete case, the `"CMD_PROFILE"` input-incomplete case, the current documented first `"CMD_PROFILE"` runtime-not-implemented rule case, the export surface, and docs parity/i,
  );
  assert.match(
    docsText,
    /the nearby `validateExportPackageTraceabilityCase` helper remains an internal implementation detail within this seam because current repo evidence limits it to 1 helper definition and 1 current shared validator call site inside `validateExportPackageTraceabilityAlignment` rather than showing a separately reused shared boundary/i,
  );
  assert.match(
    docsText,
    /the shared JSON artifact traceability alignment seam remains outside this seam because JSON artifact-specific `artifact_type` baselines, JSON artifact and JSON artifact projection output references, and JSON artifact `snapshot_status` currentness exclusions are separate lower traceability alignment responsibilities rather than this export-package alignment boundary/i,
  );
  assert.match(
    docsText,
    /the shared Markdown artifact traceability alignment seam remains outside this seam because Markdown artifact-specific `artifact_type` baselines, Markdown artifact and Markdown artifact projection output references, and Markdown artifact `snapshot_status` currentness exclusions are separate lower traceability alignment responsibilities rather than this export-package alignment boundary/i,
  );
  assert.match(
    docsText,
    /the shared PDF artifact traceability alignment seam remains outside this seam because PDF artifact-specific `artifact_type` baselines, PDF artifact and PDF artifact projection output references, and PDF artifact `snapshot_status` currentness exclusions are separate lower traceability alignment responsibilities rather than this export-package alignment boundary/i,
  );
  assert.match(
    docsText,
    /the shared DOCX artifact traceability alignment seam remains outside this seam because DOCX artifact-specific `artifact_type` baselines, DOCX artifact and DOCX artifact projection output references, and DOCX artifact `snapshot_status` currentness exclusions are separate lower traceability alignment responsibilities rather than this export-package alignment boundary/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas` validation-helper scaffold remains outside this seam because machine-readable error construction, plain-object enforcement, key-shape validation, shared string-enum enforcement, and shared traceability-model validation are separate frozen internal boundaries consumed by the alignment seam rather than defined by it/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas` export-artifact reconstruction helper scaffold remains outside this seam because export-package traceability alignment operates on documented alignment payloads and does not reconstruct export-package payloads, artifact bodies, or projection payloads/i,
  );
  assert.match(
    docsText,
    /the frozen governance-side export-package adapter-dispatch seam remains outside this seam because governance adapter lookup, generic export-package derivation\/projection dispatch, and higher runtime export-package behavior are separate runtime responsibilities and do not define the schema-side traceability alignment boundary/i,
  );
  assert.match(
    docsText,
    /downstream governance, persistence, API route\/runtime, and other adapter behavior remain outside this seam because they may reference the same surface contractually but do not define the canonical shared schema-side export-package traceability alignment boundary themselves/i,
  );
  assert.match(
    docsText,
    /broader neutral traceability semantic model work, uncovered reference-policy work, and future export-package traceability cases remain outside this seam because current repo evidence only freezes the currently concrete export-package traceability alignment surface/i,
  );
  assert.match(
    docsText,
    /future export-package traceability alignment work that needs the same exported alignment object and shared validation entry point should extend this seam instead of introducing parallel export-package traceability alignment validators or schema exports elsewhere in the repo/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, traceability alignment semantics, export-package validation semantics, projection semantics, governance semantics, schema behavior, or fail-closed behavior/i,
  );

  assert.match(
    schemasIndexText,
    /const exportPackageTraceabilityAlignment = require\("\.\.\/\.\.\/\.\.\/schemas\/export-package-traceability-alignment\.json"\);/,
  );
  assert.match(
    schemasIndexText,
    /const exportPackageTraceabilityAlignmentRequiredKeys =\s*exportPackageTraceabilityAlignment\.required;/,
  );
  assert.match(
    schemasIndexText,
    /const exportPackageTraceabilityAlignmentEntryRequiredKeysByCase =\s*Object\.freeze\(\{[\s\S]*SWE_BODELNING_INPUT_INCOMPLETE:[\s\S]*SWE_BODELNING_SUPPORT_INCOMPLETE:[\s\S]*CMD_PROFILE_INPUT_INCOMPLETE:[\s\S]*CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:[\s\S]*\}\);/,
  );
  assert.match(
    schemasIndexText,
    /const exportPackageTraceabilityAlignmentJurisdictionProfileKeyByCase =\s*Object\.freeze\(\{[\s\S]*SWE_BODELNING_INPUT_INCOMPLETE:[\s\S]*CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:[\s\S]*\}\);/,
  );
  assert.match(
    schemasIndexText,
    /const exportPackageTraceabilityAlignmentReleaseGateByCase =\s*Object\.freeze\(\{[\s\S]*SWE_BODELNING_INPUT_INCOMPLETE:[\s\S]*CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:[\s\S]*\}\);/,
  );
  assert.match(
    schemasIndexText,
    /const exportPackageTraceabilityAlignmentFreshnessByCase =\s*Object\.freeze\(\{[\s\S]*SWE_BODELNING_INPUT_INCOMPLETE:[\s\S]*CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:[\s\S]*\}\);/,
  );
  assert.match(
    schemasIndexText,
    /const exportPackageTraceabilityAlignmentReasonCodeByCase =\s*Object\.freeze\(\{[\s\S]*SWE_BODELNING_INPUT_INCOMPLETE:[\s\S]*CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:[\s\S]*\}\);/,
  );
  assert.match(
    schemasIndexText,
    /const exportPackageTraceabilityAlignmentTraceabilityRequiredKeysByCase =\s*Object\.freeze\(\{[\s\S]*SWE_BODELNING_INPUT_INCOMPLETE:[\s\S]*CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED:[\s\S]*\}\);/,
  );
  assert.match(
    schemasIndexText,
    /const exportPackageTraceabilityAlignmentCanonicalTraceabilityByCase =\s*Object\.freeze\(\{[\s\S]*input_references:[\s\S]*documented_rule_references:[\s\S]*canonical_output_references:[\s\S]*change_causes:[\s\S]*\}\);/,
  );
  assert.match(
    schemasIndexText,
    /function validateExportPackageTraceabilityCase\(\s*traceability,\s*expectedTraceability,\s*errorCode,\s*traceabilityField,\s*caseKey,\s*\)/,
  );
  assert.match(
    schemasIndexText,
    /assertPlainObject\(traceability, errorCode, traceabilityField\);/,
  );
  assert.match(
    schemasIndexText,
    /assertExactKeys\(\s*traceability,\s*exportPackageTraceabilityAlignmentTraceabilityRequiredKeysByCase\[\s*caseKey\s*\],\s*errorCode,\s*traceabilityField,\s*\);/,
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
    /function validateExportPackageTraceabilityAlignment\(\s*input,\s*errorCode = "ERR_EXPORT_PACKAGE_TRACEABILITY_ALIGNMENT_INVALID",\s*\)/,
  );
  assert.match(
    schemasIndexText,
    /assertExactKeys\(\s*input,\s*exportPackageTraceabilityAlignmentRequiredKeys,\s*errorCode,\s*"input",\s*\);/,
  );
  assert.match(
    schemasIndexText,
    /for \(const caseKey of exportPackageTraceabilityAlignmentRequiredKeys\)/,
  );
  assert.match(
    schemasIndexText,
    /validateStringEnum\(\s*alignmentEntry\.jurisdiction_profile_key,\s*\[[\s\S]*?exportPackageTraceabilityAlignmentJurisdictionProfileKeyByCase\[\s*caseKey\s*\][\s\S]*?\],/,
  );
  assert.match(
    schemasIndexText,
    /validateStringEnum\(\s*alignmentEntry\.profile_dossier_release_gate,\s*\[[\s\S]*?exportPackageTraceabilityAlignmentReleaseGateByCase\[caseKey\][\s\S]*?\],/,
  );
  assert.match(
    schemasIndexText,
    /validateStringEnum\(\s*alignmentEntry\.profile_dossier_release_eval_freshness,\s*\[[\s\S]*?exportPackageTraceabilityAlignmentFreshnessByCase\[caseKey\][\s\S]*?\],/,
  );
  assert.match(
    schemasIndexText,
    /validateStringEnum\(\s*alignmentEntry\.profile_dossier_release_gate_reason_code,\s*\[[\s\S]*?exportPackageTraceabilityAlignmentReasonCodeByCase\[caseKey\][\s\S]*?\],/,
  );
  assert.match(
    schemasIndexText,
    /validateExportPackageTraceabilityCase\(\s*alignmentEntry\.traceability,\s*exportPackageTraceabilityAlignmentCanonicalTraceabilityByCase\[\s*caseKey\s*\],/,
  );
  assert.match(schemasIndexText, /return input;/);

  assert.deepEqual(
    collectLineMatches(schemasIndexText, /\bexportPackageTraceabilityAlignment\b/),
    [
      22, 1656, 1659, 1662, 1665, 1668, 1674, 1677, 1681, 1684, 1690, 1693,
      1697, 1700, 1706, 1709, 1713, 1716, 1722, 1725, 1729, 1732, 1739, 1742,
      1746, 1749, 1757, 1761, 1765, 1769, 1775, 1779, 1783, 1787, 1793, 1797,
      1801, 1805, 1811, 1815, 1819, 1823, 12974,
    ],
  );
  assert.deepEqual(
    collectLineMatches(schemasIndexText, /\bvalidateExportPackageTraceabilityCase\b/),
    [5564, 6023],
  );
  assert.deepEqual(
    collectLineMatches(
      schemasIndexText,
      /\bvalidateExportPackageTraceabilityAlignment\b/,
    ),
    [5976, 13075],
  );
  assert.deepEqual(
    collectLineMatches(
      governanceIndexText,
      /\bvalidateExportPackageTraceabilityAlignment\b/,
    ),
    [],
  );
  assert.deepEqual(
    collectLineMatches(
      databaseIndexText,
      /\bvalidateExportPackageTraceabilityAlignment\b/,
    ),
    [],
  );

  assert.match(
    traceabilityRuntimeTestText,
    /the current documented export_package input-incomplete baseline has canonical traceability alignment for SWE_BODELNING where docs are concrete enough/,
  );
  assert.match(
    traceabilityRuntimeTestText,
    /the current documented export_package support-incomplete baseline has canonical traceability alignment for SWE_BODELNING where docs are concrete enough/,
  );
  assert.match(
    traceabilityRuntimeTestText,
    /the current documented export_package input-incomplete baseline has canonical traceability alignment for CMD_PROFILE where docs are concrete enough/,
  );
  assert.match(
    traceabilityRuntimeTestText,
    /the current documented first CMD_PROFILE rule as reflected through export_package has canonical traceability alignment where docs are concrete enough/,
  );
  assert.match(
    traceabilityRuntimeTestText,
    /packages\/schemas exports the export_package traceability alignment surface if applicable/,
  );
  assert.match(
    traceabilityRuntimeTestText,
    /docs describe the same export_package-to-traceability alignment/,
  );
  assert.match(
    traceabilityRuntimeTestText,
    /Export package `snapshot_status` currentness reporting remains intentionally outside this export package traceability alignment surface/i,
  );
});
