const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const docsText = fs.readFileSync(
  path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md"),
  "utf8",
);
const governanceIndexText = fs.readFileSync(
  path.join(__dirname, "..", "packages", "governance", "src", "index.js"),
  "utf8",
);
const apiIndexText = fs.readFileSync(
  path.join(__dirname, "..", "apps", "api", "src", "index.js"),
  "utf8",
);
const databaseIndexText = fs.readFileSync(
  path.join(__dirname, "..", "packages", "database", "src", "index.js"),
  "utf8",
);

function collectLineMatches(text, pattern) {
  return text
    .split("\n")
    .flatMap((line, index) => (pattern.test(line) ? [index + 1] : []));
}

test("docs freeze the shared governance profile-dossier issue-index helper seam as the issue-index derivation boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared Governance Profile Dossier Issue-Index Helper Seam Freeze[\s\S]*?(?=\n### )/,
  );
  const helperStart = governanceIndexText.indexOf(
    "function deriveSWEBodelningProfileDossierIssueIndex(",
  );
  const helperEnd = governanceIndexText.indexOf(
    "function deriveSWEBodelningIssueRelatedSectionRefs(",
    helperStart,
  );
  const snapshotStart = governanceIndexText.indexOf(
    "function deriveSWEBodelningProfileDossierSnapshot(",
  );
  const snapshotEnd = governanceIndexText.indexOf(
    "function resolveSWEBodelningExportPackageGeneratedAt(",
    snapshotStart,
  );
  const exportStart = governanceIndexText.indexOf("module.exports = {");

  assert.ok(docsSectionMatch, "expected issue-index helper docs section");
  assert.notEqual(helperStart, -1, "expected issue-index helper definition start");
  assert.notEqual(helperEnd, -1, "expected issue-index helper definition end");
  assert.notEqual(snapshotStart, -1, "expected snapshot construction start");
  assert.notEqual(snapshotEnd, -1, "expected snapshot construction end");
  assert.notEqual(exportStart, -1, "expected governance export surface");

  const docsSection = docsSectionMatch[0];
  const helperSlice = governanceIndexText.slice(helperStart, helperEnd);
  const snapshotSlice = governanceIndexText.slice(snapshotStart, snapshotEnd);
  const exportSlice = governanceIndexText.slice(exportStart);

  assert.match(
    docsSection,
    /Shared Governance Profile Dossier Issue-Index Helper Seam Freeze/i,
  );
  assert.match(
    docsSection,
    /profile-dossier issue-index helper `deriveSWEBodelningProfileDossierIssueIndex` is the canonical governance-side `SWE_BODELNING` profile-dossier `issue_index` derivation boundary/i,
  );
  assert.match(
    docsSection,
    /currently evidenced governed surface in this freeze is limited to:\s+deterministic `SWE_BODELNING` profile-dossier `issue_index` derivation from an already assembled profile-dossier snapshot payload carrying release-eval profile-input summary and freshness metadata/i,
  );
  assert.match(
    docsSection,
    /currently concrete helper responsibilities already evidenced for this seam are limited to:\s+asserting object-shaped `profileDossierSnapshot`\s+cloning the already-derived `profileDossierSnapshot\.profile_input_summary` through the already-frozen release-eval profile-input clone helper seam\s+deriving a blocking incomplete-input issue from non-empty `missing_value_lane_keys`\s+deriving a blocking support-incomplete issue from non-empty `missing_support_lane_keys`\s+deriving a blocking freshness issue when `profileDossierSnapshot\.release_eval_freshness` differs from the current release-eval baseline freshness\s+sorting related lane keys for the missing-value and missing-support issue entries\s+returning deterministic `issue_ref` values with zero-padded `ISS-###` numbering/i,
  );
  assert.match(
    docsSection,
    /relationship to profile-dossier snapshot construction is limited to `deriveSWEBodelningProfileDossierSnapshot\(\.\.\.\)` calling this helper once while assembling `snapshotWithIssueIndex`/i,
  );
  assert.match(
    docsSection,
    /relationship to the already-frozen release-eval profile-input clone helper seam is consumer-only and boundary-only because this issue-index helper clones an already-derived profile-input summary before reading missing lane metadata, but clone\/copy ownership remains outside this issue-index seam/i,
  );
  assert.match(
    docsSection,
    /relationship to release-eval freshness is input-only and boundary-only because this issue-index helper reads already-derived `release_eval_freshness` and `release_eval_freshness_reason_code` fields but does not derive freshness, policy, reconciliation, or release-eval scoring semantics/i,
  );
  assert.match(
    docsSection,
    /relationship to profile-dossier section-index derivation is negative and separate because `deriveSWEBodelningProfileDossierSectionIndex\(\.\.\.\)` consumes an already assembled `issue_index` later in the snapshot-construction chain and is not a member of this issue-index seam/i,
  );
  assert.match(
    docsSection,
    /relationship to related-reference, related-section, related-exhibit, supporting-reference, and supporting-exhibit attachment helpers is negative and separate because those helpers enrich already assembled issue\/lane\/reference\/exhibit\/section payloads later in the snapshot-construction chain and do not derive the initial `ISS-###` issue entries/i,
  );
  assert.match(
    docsSection,
    /current bounded reuse already evidenced in `packages\/governance\/src\/index\.js` is limited to one helper definition, one profile-dossier snapshot-construction call site, and the current named module export surface exposing `deriveSWEBodelningProfileDossierIssueIndex`/i,
  );
  assert.match(
    docsSection,
    /route behavior, API behavior, database persistence behavior, export-package helper seams, release-eval policy\/freshness\/reconciliation\/profile-input helper seams, profile-input derivation\/context\/adapter seams, schema validation, and broader governance\/runtime behavior remain outside this seam/i,
  );
  assert.match(
    docsSection,
    /does not change runtime behavior, governance semantics, profile-dossier semantics, release-eval semantics, persistence semantics, API behavior, export-package behavior, schema behavior, or fail-closed behavior/i,
  );

  assert.match(
    helperSlice,
    /function deriveSWEBodelningProfileDossierIssueIndex\(profileDossierSnapshot\) \{/,
  );
  assert.match(
    helperSlice,
    /assertPlainObject\(\s*profileDossierSnapshot,\s*"ERR_PROFILE_DOSSIER_SNAPSHOT_INVALID",\s*"profileDossierSnapshot",\s*\);/,
  );
  assert.match(
    helperSlice,
    /const profileInputSummary = cloneSWEBodelningReleaseEvalProfileInputSummary\(\s*profileDossierSnapshot\.profile_input_summary,\s*\);/,
  );
  assert.match(
    helperSlice,
    /if \(profileInputSummary\.missing_value_lane_keys\.length > 0\) \{[\s\S]*issue_code: incompleteReleaseEvalReasonCode,[\s\S]*blocking: true,[\s\S]*related_lane_keys: \[\.\.\.profileInputSummary\.missing_value_lane_keys\]\.sort\(\),[\s\S]*\}/,
  );
  assert.match(
    helperSlice,
    /if \(profileInputSummary\.missing_support_lane_keys\.length > 0\) \{[\s\S]*issue_code: supportIncompleteReleaseEvalReasonCode,[\s\S]*blocking: true,[\s\S]*related_lane_keys: \[\.\.\.profileInputSummary\.missing_support_lane_keys\]\.sort\(\),[\s\S]*\}/,
  );
  assert.match(
    helperSlice,
    /profileDossierSnapshot\.release_eval_freshness !==\s*releaseEvalBaseline\.release_eval_freshness/,
  );
  assert.match(
    helperSlice,
    /issue_code: profileDossierSnapshot\.release_eval_freshness_reason_code,[\s\S]*blocking: true,[\s\S]*related_lane_keys: \[\]/,
  );
  assert.match(
    helperSlice,
    /issue_ref: `ISS-\$\{String\(index \+ 1\)\.padStart\(3, "0"\)\}`/,
  );
  assert.doesNotMatch(
    helperSlice,
    /deriveSWEBodelningProfileDossierSectionIndex\(/,
  );
  assert.doesNotMatch(helperSlice, /attachSWEBodelning/);
  assert.doesNotMatch(
    helperSlice,
    /deriveSWEBodelningProfileDossierEvidenceReferenceIndex\(/,
  );
  assert.doesNotMatch(
    helperSlice,
    /deriveSWEBodelningProfileDossierEvidenceExhibitIndex\(/,
  );
  assert.doesNotMatch(
    helperSlice,
    /deriveSWEBodelningProfileDossierFingerprint\(/,
  );
  assert.doesNotMatch(helperSlice, /resolveSWEBodelningProfileDossierSnapshot\(/);
  assert.doesNotMatch(helperSlice, /validateSWEBodelningProfileDossierSnapshot\(/);
  assert.doesNotMatch(helperSlice, /deriveSWEBodelningExportPackage/);
  assert.doesNotMatch(helperSlice, /getLatest|persist|refresh|route|response/i);

  assert.match(
    snapshotSlice,
    /const snapshotWithIssueIndex = \{\s*\.\.\.snapshot,\s*issue_index: deriveSWEBodelningProfileDossierIssueIndex\(snapshot\),\s*\};/,
  );
  assert.match(
    snapshotSlice,
    /const snapshotWithSectionIndex = \{\s*\.\.\.snapshotWithIssueIndex,\s*section_index: deriveSWEBodelningProfileDossierSectionIndex\(\s*snapshotWithIssueIndex,\s*\),\s*\};/,
  );
  assert.match(
    exportSlice,
    /^\s*deriveSWEBodelningProfileDossierIssueIndex,\s*$/m,
  );

  assert.deepEqual(
    collectLineMatches(
      governanceIndexText,
      /\bderiveSWEBodelningProfileDossierIssueIndex\b/,
    ),
    [
      1473,
      4910,
      5908,
    ],
  );
  assert.deepEqual(
    collectLineMatches(
      governanceIndexText,
      /\bderiveSWEBodelningProfileDossierSectionIndex\b/,
    ),
    [
      1477,
      5325,
      5909,
    ],
  );
  assert.doesNotMatch(apiIndexText, /deriveSWEBodelningProfileDossierIssueIndex\(/);
  assert.doesNotMatch(
    databaseIndexText,
    /deriveSWEBodelningProfileDossierIssueIndex\(/,
  );
});
