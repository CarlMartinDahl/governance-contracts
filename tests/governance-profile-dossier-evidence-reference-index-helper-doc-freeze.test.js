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

test("docs freeze the shared governance profile-dossier evidence-reference index helper seam as the reference-index derivation boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared Governance Profile Dossier Evidence-Reference Index Helper Seam Freeze[\s\S]*?(?=\n### )/,
  );
  const helperStart = governanceIndexText.indexOf(
    "function deriveSWEBodelningProfileDossierEvidenceReferenceIndex(",
  );
  const helperEnd = governanceIndexText.indexOf(
    "function deriveSWEBodelningProfileDossierEvidenceExhibitIndex(",
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

  assert.ok(docsSectionMatch, "expected evidence-reference index docs section");
  assert.notEqual(helperStart, -1, "expected helper definition start");
  assert.notEqual(helperEnd, -1, "expected helper definition end");
  assert.notEqual(snapshotStart, -1, "expected snapshot construction start");
  assert.notEqual(snapshotEnd, -1, "expected snapshot construction end");
  assert.notEqual(exportStart, -1, "expected governance export surface");

  const docsSection = docsSectionMatch[0];
  const helperSlice = governanceIndexText.slice(helperStart, helperEnd);
  const snapshotSlice = governanceIndexText.slice(snapshotStart, snapshotEnd);
  const exportSlice = governanceIndexText.slice(exportStart);

  assert.match(
    docsSection,
    /Shared Governance Profile Dossier Evidence-Reference Index Helper Seam Freeze/i,
  );
  assert.match(
    docsSection,
    /profile-dossier evidence-reference index helper `deriveSWEBodelningProfileDossierEvidenceReferenceIndex` is the canonical governance-side `SWE_BODELNING` evidence-reference index derivation boundary/i,
  );
  assert.match(
    docsSection,
    /currently evidenced governed surface in this freeze is limited to:\s+`SWE_BODELNING` profile-dossier `evidence_reference_index` derivation from the already assembled profile-dossier snapshot payload/i,
  );
  assert.match(
    docsSection,
    /currently concrete helper responsibilities already evidenced for this seam are limited to:\s+asserting object-shaped `profileDossierSnapshot`\s+cloning the already-derived release-eval profile-input lane snapshot through the already-frozen release-eval profile-input clone helper seam\s+reading each current SWE lane's sorted `evidence_object_ids`\s+grouping unique supporting lane keys by evidence object id\s+sorting evidence object ids lexicographically\s+returning deterministic `reference_ref` values with zero-padded `REF-###` numbering\s+returning each entry's `evidence_object_id`, cloned `supporting_lane_keys`, and `related_issue_refs` derived only from already assembled issue entries whose `related_lane_keys` intersect the supporting lane keys/i,
  );
  assert.match(
    docsSection,
    /relationship to `deriveSWEBodelningProfileDossierEvidenceExhibitIndex\(\.\.\.\)` is negative and separate because the exhibit-index helper consumes an already assembled `evidence_reference_index` later in the snapshot-construction chain, derives `EX-###` exhibit entries, and is not a member of this evidence-reference index seam/i,
  );
  assert.match(
    docsSection,
    /relationship to profile-dossier snapshot construction is limited to `deriveSWEBodelningProfileDossierSnapshot\(\.\.\.\)` calling this helper once while assembling `snapshotWithEvidenceReferenceIndex`/i,
  );
  assert.match(
    docsSection,
    /current bounded reuse already evidenced in `packages\/governance\/src\/index\.js` is limited to one helper definition, one profile-dossier snapshot-construction call site, and the current named module export surface exposing `deriveSWEBodelningProfileDossierEvidenceReferenceIndex`/i,
  );
  assert.match(
    docsSection,
    /route behavior, database persistence behavior, export-package helper seams, release-eval policy\/freshness\/reconciliation\/profile-input helper seams, profile-input derivation\/context\/adapter seams, schema validation, and broader governance\/runtime behavior remain outside this seam/i,
  );
  assert.match(
    docsSection,
    /does not change runtime behavior, governance semantics, profile-dossier semantics, persistence semantics, API behavior, or fail-closed behavior/i,
  );

  assert.match(
    helperSlice,
    /function deriveSWEBodelningProfileDossierEvidenceReferenceIndex\(\s*profileDossierSnapshot,\s*\)\s*\{/,
  );
  assert.match(
    helperSlice,
    /assertPlainObject\(\s*profileDossierSnapshot,\s*"ERR_PROFILE_DOSSIER_SNAPSHOT_INVALID",\s*"profileDossierSnapshot",\s*\);/,
  );
  assert.match(
    helperSlice,
    /const laneSnapshot = cloneSWEBodelningReleaseEvalProfileInputLaneSnapshot\(\s*profileDossierSnapshot\.profile_input_lane_snapshot,\s*\);/,
  );
  assert.match(
    helperSlice,
    /const issueIndex = Array\.isArray\(profileDossierSnapshot\.issue_index\)[\s\S]*: \[\];/,
  );
  assert.match(
    helperSlice,
    /const supportingLaneKeysByEvidenceObjectId = new Map\(\);/,
  );
  assert.match(
    helperSlice,
    /for \(const laneKey of laneKeys\)[\s\S]*const evidenceObjectIds = Array\.isArray\(laneSnapshot\[laneKey\]\.evidence_object_ids\)[\s\S]*\[\.\.\.laneSnapshot\[laneKey\]\.evidence_object_ids\]\.sort\(\)/,
  );
  assert.match(
    helperSlice,
    /\.sort\(\(\[leftEvidenceObjectId\], \[rightEvidenceObjectId\]\) =>\s*leftEvidenceObjectId\.localeCompare\(rightEvidenceObjectId\),\s*\)/,
  );
  assert.match(
    helperSlice,
    /reference_ref: `REF-\$\{String\(index \+ 1\)\.padStart\(3, "0"\)\}`/,
  );
  assert.match(
    helperSlice,
    /related_issue_refs: \[[\s\S]*issueEntry\.related_lane_keys\.some\(\(laneKey\) =>[\s\S]*supporting_lane_keys\.includes\(laneKey\),[\s\S]*\.map\(\(issueEntry\) => issueEntry\.issue_ref\)/,
  );
  assert.doesNotMatch(
    helperSlice,
    /deriveSWEBodelningProfileDossierEvidenceExhibitIndex\(/,
  );

  assert.match(
    snapshotSlice,
    /const snapshotWithEvidenceReferenceIndex = \{\s*\.\.\.snapshotWithSectionRelatedLaneKeys,\s*evidence_reference_index: deriveSWEBodelningProfileDossierEvidenceReferenceIndex\(\s*snapshotWithSectionRelatedLaneKeys,\s*\),\s*\};/,
  );
  assert.match(
    snapshotSlice,
    /const snapshotWithEvidenceExhibitIndex = \{\s*\.\.\.snapshotWithEvidenceReferenceRelatedSectionRefs,\s*evidence_exhibit_index: deriveSWEBodelningProfileDossierEvidenceExhibitIndex\(\s*snapshotWithEvidenceReferenceRelatedSectionRefs,\s*\),\s*\};/,
  );
  assert.match(
    exportSlice,
    /^\s*deriveSWEBodelningProfileDossierEvidenceReferenceIndex,\s*$/m,
  );

  assert.deepEqual(
    collectLineMatches(
      governanceIndexText,
      /\bderiveSWEBodelningProfileDossierEvidenceReferenceIndex\b/,
    ),
    [
      993,
      1504,
      5906,
    ],
  );
  assert.deepEqual(
    collectLineMatches(
      governanceIndexText,
      /\bderiveSWEBodelningProfileDossierEvidenceExhibitIndex\b/,
    ),
    [
      1054,
      1518,
      5905,
    ],
  );
  assert.doesNotMatch(
    apiIndexText,
    /deriveSWEBodelningProfileDossierEvidenceReferenceIndex\(/,
  );
  assert.doesNotMatch(
    databaseIndexText,
    /deriveSWEBodelningProfileDossierEvidenceReferenceIndex\(/,
  );
});
