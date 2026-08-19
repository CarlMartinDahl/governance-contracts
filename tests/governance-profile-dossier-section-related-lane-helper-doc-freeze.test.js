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

test("docs freeze the shared governance profile-dossier section-related-lane helper seam as the section-to-lane attachment boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared Governance Profile Dossier Section-Related-Lane Attachment Helper Seam Freeze[\s\S]*?(?=\n### )/,
  );
  const helperStart = governanceIndexText.indexOf(
    "function attachSWEBodelningSectionRelatedLaneKeys(",
  );
  const helperEnd = governanceIndexText.indexOf(
    "function attachSWEBodelningSectionRelatedExhibitRefs(",
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

  assert.ok(docsSectionMatch, "expected section-related-lane helper docs section");
  assert.notEqual(helperStart, -1, "expected section-related-lane helper definition start");
  assert.notEqual(helperEnd, -1, "expected section-related-lane helper definition end");
  assert.notEqual(snapshotStart, -1, "expected snapshot construction start");
  assert.notEqual(snapshotEnd, -1, "expected snapshot construction end");
  assert.notEqual(exportStart, -1, "expected governance export surface");

  const docsSection = docsSectionMatch[0];
  const helperSlice = governanceIndexText.slice(helperStart, helperEnd);
  const snapshotSlice = governanceIndexText.slice(snapshotStart, snapshotEnd);
  const exportSlice = governanceIndexText.slice(exportStart);

  assert.match(
    docsSection,
    /Shared Governance Profile Dossier Section-Related-Lane Attachment Helper Seam Freeze/i,
  );
  assert.match(
    docsSection,
    /profile-dossier section-related-lane attachment helper `attachSWEBodelningSectionRelatedLaneKeys` is the canonical governance-side `SWE_BODELNING` helper boundary for enriching already assembled profile-dossier `section_index` entries with `related_lane_keys` from already assembled `issue_index\.related_lane_keys` and already attached `section_index\.related_issue_refs`/i,
  );
  assert.match(
    docsSection,
    /currently evidenced governed surface in this freeze is limited to:\s+additive deterministic `SWE_BODELNING` profile-dossier `section_index\.related_lane_keys` attachment from already assembled section entries, already attached section-to-issue refs, and already assembled issue-to-lane links inside the current profile-dossier snapshot flow/i,
  );
  assert.match(
    docsSection,
    /currently concrete helper responsibilities already evidenced for this seam are limited to:\s+returning an empty section-index attachment result when `sectionIndex` is not an array\s+building the current issue-ref keyed related-lane map from already assembled `issueIndex` entries when `issueIndex` is an array\s+treating issue entries without array-shaped `related_lane_keys` as empty related-lane input\s+preserving each existing section entry while adding `related_lane_keys`\s+deriving section `related_lane_keys` from current `laneKeys`, already attached `section_index\.related_issue_refs`, and already assembled `issue_index\.related_lane_keys`/i,
  );
  assert.match(
    docsSection,
    /no bounded internal helper is included in this seam because current repo evidence shows `attachSWEBodelningSectionRelatedLaneKeys\(\.\.\.\)` owns this section-to-lane attachment behavior directly with no helper delegated only for section-related lane-key mapping/i,
  );
  assert.match(
    docsSection,
    /relationship to profile-dossier snapshot construction is limited to `deriveSWEBodelningProfileDossierSnapshot\(\.\.\.\)` calling this helper once while assembling `snapshotWithSectionRelatedLaneKeys`/i,
  );
  assert.match(
    docsSection,
    /relationship to the already-frozen section-index helper seam is input-only and boundary-only because this attachment helper consumes already assembled `section_index` entries and does not derive `SEC-###` section entries, section keys, section order, section presence, or section `related_issue_refs`/i,
  );
  assert.match(
    docsSection,
    /relationship to the already-frozen issue-index helper seam is input-only and boundary-only because this attachment helper consumes already assembled issue entries and does not derive `ISS-###` issue entries, issue codes, blocking flags, or issue `related_lane_keys`/i,
  );
  assert.match(
    docsSection,
    /relationship to the already-frozen issue-related-section attachment seam is boundary-only because this section-related-lane helper does not derive issue-to-section mappings or include `attachSWEBodelningIssueRelatedSectionRefs\(\.\.\.\)` \/ `deriveSWEBodelningIssueRelatedSectionRefs\(\.\.\.\)`/i,
  );
  assert.match(
    docsSection,
    /relationship to the already-frozen section-related-issue attachment seam is input-only and boundary-only because this helper consumes already attached `section_index\.related_issue_refs` and does not derive section-to-issue mappings or include `attachSWEBodelningSectionRelatedIssueRefs\(\.\.\.\)`/i,
  );
  assert.match(
    docsSection,
    /relationship to section-related-reference, section-related-exhibit, issue-related-reference, issue-related-exhibit, evidence-reference\/exhibit, and lane attachment helpers is negative and separate/i,
  );
  assert.match(
    docsSection,
    /current bounded reuse already evidenced in `packages\/governance\/src\/index\.js` is limited to one attachment helper definition, one profile-dossier snapshot-construction call site, and no current named module export surface for this helper/i,
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
    /function attachSWEBodelningSectionRelatedLaneKeys\(sectionIndex, issueIndex\) \{/,
  );
  assert.match(
    helperSlice,
    /if \(!Array\.isArray\(sectionIndex\)\) \{\s*return \[\];\s*\}/,
  );
  assert.match(
    helperSlice,
    /const relatedLaneKeysByIssueRef = new Map\(\s*Array\.isArray\(issueIndex\)\s*\? issueIndex\.map\(\(entry\) => \[\s*entry\.issue_ref,\s*Array\.isArray\(entry\.related_lane_keys\) \? entry\.related_lane_keys : \[\],\s*\]\)\s*: \[\],\s*\);/,
  );
  assert.match(
    helperSlice,
    /return sectionIndex\.map\(\(entry\) => \(\{\s*\.\.\.entry,\s*related_lane_keys: laneKeys\.filter\(\(laneKey\) =>\s*Array\.isArray\(entry\.related_issue_refs\) &&\s*entry\.related_issue_refs\.some\(\(issueRef\) =>\s*relatedLaneKeysByIssueRef\.get\(issueRef\)\?\.includes\(laneKey\),\s*\),\s*\),\s*\}\)\);/,
  );
  assert.doesNotMatch(helperSlice, /attachSWEBodelningSectionRelatedIssueRefs\(/);
  assert.doesNotMatch(helperSlice, /attachSWEBodelningIssueRelatedSectionRefs\(/);
  assert.doesNotMatch(helperSlice, /deriveSWEBodelningIssueRelatedSectionRefs\(/);
  assert.doesNotMatch(helperSlice, /deriveSWEBodelningProfileDossierIssueIndex\(/);
  assert.doesNotMatch(helperSlice, /deriveSWEBodelningProfileDossierSectionIndex\(/);
  assert.doesNotMatch(helperSlice, /attachSWEBodelningSectionRelatedReferenceRefs\(/);
  assert.doesNotMatch(helperSlice, /attachSWEBodelningSectionRelatedExhibitRefs\(/);
  assert.doesNotMatch(helperSlice, /attachSWEBodelningIssueRelatedExhibitRefs\(/);
  assert.doesNotMatch(helperSlice, /resolveSWEBodelningProfileDossierSnapshot\(/);
  assert.doesNotMatch(helperSlice, /validateSWEBodelningProfileDossierSnapshot\(/);
  assert.doesNotMatch(helperSlice, /deriveSWEBodelningExportPackage/);
  assert.doesNotMatch(helperSlice, /getLatest|persist|refresh|route|response/i);

  assert.match(
    snapshotSlice,
    /const snapshotWithRelatedIssueRefs = \{\s*\.\.\.snapshotWithRelatedSectionRefs,\s*section_index: attachSWEBodelningSectionRelatedIssueRefs\(\s*snapshotWithSectionIndex\.section_index,\s*snapshotWithRelatedSectionRefs\.issue_index,\s*\),\s*\};/,
  );
  assert.match(
    snapshotSlice,
    /const snapshotWithSectionRelatedLaneKeys = \{\s*\.\.\.snapshotWithRelatedIssueRefs,\s*section_index: attachSWEBodelningSectionRelatedLaneKeys\(\s*snapshotWithRelatedIssueRefs\.section_index,\s*snapshotWithRelatedSectionRefs\.issue_index,\s*\),\s*\};/,
  );
  assert.match(
    snapshotSlice,
    /evidence_reference_index: deriveSWEBodelningProfileDossierEvidenceReferenceIndex\(\s*snapshotWithSectionRelatedLaneKeys,/,
  );

  assert.doesNotMatch(
    exportSlice,
    /^\s*attachSWEBodelningSectionRelatedLaneKeys,\s*$/m,
  );

  assert.deepEqual(
    collectLineMatches(
      governanceIndexText,
      /\battachSWEBodelningSectionRelatedLaneKeys\b/,
    ),
    [
      1497,
      5266,
    ],
  );
  assert.doesNotMatch(
    apiIndexText,
    /attachSWEBodelningSectionRelatedLaneKeys\(/,
  );
  assert.doesNotMatch(
    databaseIndexText,
    /attachSWEBodelningSectionRelatedLaneKeys\(/,
  );
});
