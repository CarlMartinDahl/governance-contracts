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

test("docs freeze the shared governance profile-dossier section-related-exhibit helper seam as the section-to-exhibit attachment boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared Governance Profile Dossier Section-Related-Exhibit Attachment Helper Seam Freeze[\s\S]*?(?=\n### )/,
  );
  const helperStart = governanceIndexText.indexOf(
    "function attachSWEBodelningSectionRelatedExhibitRefs(",
  );
  const helperEnd = governanceIndexText.indexOf(
    "function deriveSWEBodelningProfileDossierSectionIndex(",
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

  assert.ok(
    docsSectionMatch,
    "expected section-related-exhibit helper docs section",
  );
  assert.notEqual(
    helperStart,
    -1,
    "expected section-related-exhibit helper definition start",
  );
  assert.notEqual(
    helperEnd,
    -1,
    "expected section-related-exhibit helper definition end",
  );
  assert.notEqual(snapshotStart, -1, "expected snapshot construction start");
  assert.notEqual(snapshotEnd, -1, "expected snapshot construction end");
  assert.notEqual(exportStart, -1, "expected governance export surface");

  const docsSection = docsSectionMatch[0];
  const helperSlice = governanceIndexText.slice(helperStart, helperEnd);
  const snapshotSlice = governanceIndexText.slice(snapshotStart, snapshotEnd);
  const exportSlice = governanceIndexText.slice(exportStart);

  assert.match(
    docsSection,
    /Shared Governance Profile Dossier Section-Related-Exhibit Attachment Helper Seam Freeze/i,
  );
  assert.match(
    docsSection,
    /profile-dossier section-related-exhibit attachment helper `attachSWEBodelningSectionRelatedExhibitRefs` is the canonical governance-side `SWE_BODELNING` helper boundary for enriching already assembled profile-dossier `section_index` entries with `related_exhibit_refs` from already assembled `issue_index\.related_exhibit_refs`, already attached `section_index\.related_issue_refs`, and canonical `evidence_exhibit_index\.exhibit_ref` values/i,
  );
  assert.match(
    docsSection,
    /currently evidenced governed surface in this freeze is limited to:\s+additive deterministic `SWE_BODELNING` profile-dossier `section_index\.related_exhibit_refs` attachment from already assembled section entries, already attached section-to-issue refs, already assembled issue-to-exhibit links, and already assembled evidence-exhibit entries inside the current profile-dossier snapshot flow/i,
  );
  assert.match(
    docsSection,
    /currently concrete helper responsibilities already evidenced for this seam are limited to:\s+returning an empty section-index attachment result when `sectionIndex` is not an array\s+building the current issue-ref keyed related-exhibit map from already assembled `issueIndex` entries when `issueIndex` is an array\s+treating issue entries without array-shaped `related_exhibit_refs` as empty related-exhibit input\s+deriving the current canonical exhibit-ref set from object-shaped entries in the already assembled `evidenceExhibitIndex`\s+preserving each existing section entry while adding `related_exhibit_refs`\s+deriving section `related_exhibit_refs` from canonical exhibit refs, already attached `section_index\.related_issue_refs`, and already assembled `issue_index\.related_exhibit_refs`/i,
  );
  assert.match(
    docsSection,
    /no bounded internal helper is included in this seam because current repo evidence shows `attachSWEBodelningSectionRelatedExhibitRefs\(\.\.\.\)` owns this section-to-exhibit attachment behavior directly with no helper delegated only for section-related exhibit-ref mapping/i,
  );
  assert.match(
    docsSection,
    /relationship to profile-dossier snapshot construction is limited to `deriveSWEBodelningProfileDossierSnapshot\(\.\.\.\)` calling this helper once while assembling `snapshotWithSectionRelatedExhibitRefs`/i,
  );
  assert.match(
    docsSection,
    /relationship to the already-frozen section-index helper seam is input-only and boundary-only because this attachment helper consumes already assembled `section_index` entries and does not derive `SEC-###` section entries, section keys, section order, section presence, or section `related_issue_refs`/i,
  );
  assert.match(
    docsSection,
    /relationship to the already-frozen issue-index helper seam is input-only and boundary-only because this attachment helper consumes already assembled issue entries and does not derive `ISS-###` issue entries, issue codes, blocking flags, issue `related_lane_keys`, or issue `related_exhibit_refs`/i,
  );
  assert.match(
    docsSection,
    /relationship to the already-frozen evidence-exhibit index helper seam is input-only and boundary-only because this attachment helper consumes already assembled `evidence_exhibit_index` entries for their canonical `exhibit_ref` values and does not derive `EX-###` exhibit entries/i,
  );
  assert.match(
    docsSection,
    /relationship to the already-frozen issue-related-section attachment seam is boundary-only because this section-related-exhibit helper does not derive issue-to-section mappings or include `attachSWEBodelningIssueRelatedSectionRefs\(\.\.\.\)` \/ `deriveSWEBodelningIssueRelatedSectionRefs\(\.\.\.\)`/i,
  );
  assert.match(
    docsSection,
    /relationship to the already-frozen section-related-issue attachment seam is input-only and boundary-only because this helper consumes already attached `section_index\.related_issue_refs` and does not derive section-to-issue mappings or include `attachSWEBodelningSectionRelatedIssueRefs\(\.\.\.\)`/i,
  );
  assert.match(
    docsSection,
    /relationship to the already-frozen section-related-lane attachment seam is sibling-only and boundary-only because both helpers enrich already assembled `section_index` entries but this helper does not derive section-to-lane mappings or include `attachSWEBodelningSectionRelatedLaneKeys\(\.\.\.\)`/i,
  );
  assert.match(
    docsSection,
    /relationship to section-related-reference, issue-related-reference, issue-related-exhibit, evidence-reference\/exhibit attachment, and lane attachment helpers is negative and separate/i,
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
    /function attachSWEBodelningSectionRelatedExhibitRefs\(\s*sectionIndex,\s*issueIndex,\s*evidenceExhibitIndex,\s*\) \{/,
  );
  assert.match(
    helperSlice,
    /if \(!Array\.isArray\(sectionIndex\)\) \{\s*return \[\];\s*\}/,
  );
  assert.match(
    helperSlice,
    /const relatedExhibitRefsByIssueRef = new Map\(\s*Array\.isArray\(issueIndex\)\s*\? issueIndex\.map\(\(entry\) => \[\s*entry\.issue_ref,\s*Array\.isArray\(entry\.related_exhibit_refs\) \? entry\.related_exhibit_refs : \[\],\s*\]\)\s*: \[\],\s*\);/,
  );
  assert.match(
    helperSlice,
    /const canonicalExhibitRefs = Array\.isArray\(evidenceExhibitIndex\)\s*\? evidenceExhibitIndex\s*\.filter\(\(entry\) => entry && typeof entry === "object"\)\s*\.map\(\(entry\) => entry\.exhibit_ref\)\s*: \[\];/,
  );
  assert.match(
    helperSlice,
    /return sectionIndex\.map\(\(entry\) => \(\{\s*\.\.\.entry,\s*related_exhibit_refs: canonicalExhibitRefs\.filter\(\(exhibitRef\) =>\s*Array\.isArray\(entry\.related_issue_refs\) &&\s*entry\.related_issue_refs\.some\(\(issueRef\) =>\s*relatedExhibitRefsByIssueRef\.get\(issueRef\)\?\.includes\(exhibitRef\),\s*\),\s*\),\s*\}\)\);/,
  );
  assert.doesNotMatch(helperSlice, /attachSWEBodelningSectionRelatedIssueRefs\(/);
  assert.doesNotMatch(helperSlice, /deriveSWEBodelningIssueRelatedSectionRefs\(/);
  assert.doesNotMatch(helperSlice, /attachSWEBodelningIssueRelatedSectionRefs\(/);
  assert.doesNotMatch(helperSlice, /attachSWEBodelningSectionRelatedLaneKeys\(/);
  assert.doesNotMatch(helperSlice, /deriveSWEBodelningProfileDossierIssueIndex\(/);
  assert.doesNotMatch(helperSlice, /deriveSWEBodelningProfileDossierSectionIndex\(/);
  assert.doesNotMatch(helperSlice, /deriveSWEBodelningProfileDossierEvidenceExhibitIndex\(/);
  assert.doesNotMatch(helperSlice, /attachSWEBodelningSectionRelatedReferenceRefs\(/);
  assert.doesNotMatch(helperSlice, /attachSWEBodelningIssueRelatedExhibitRefs\(/);
  assert.doesNotMatch(helperSlice, /resolveSWEBodelningProfileDossierSnapshot\(/);
  assert.doesNotMatch(helperSlice, /validateSWEBodelningProfileDossierSnapshot\(/);
  assert.doesNotMatch(helperSlice, /deriveSWEBodelningExportPackage/);
  assert.doesNotMatch(helperSlice, /getLatest|persist|refresh|route|response/i);

  assert.match(
    snapshotSlice,
    /const snapshotWithSectionRelatedExhibitRefs = \{\s*\.\.\.snapshotWithExhibitRelatedIssueRefs,\s*section_index: attachSWEBodelningSectionRelatedExhibitRefs\(\s*snapshotWithSectionRelatedLaneKeys\.section_index,\s*snapshotWithRelatedExhibitRefs\.issue_index,\s*snapshotWithExhibitRelatedIssueRefs\.evidence_exhibit_index,\s*\),\s*\};/,
  );
  assert.match(
    snapshotSlice,
    /const snapshotWithSectionRelatedReferenceRefs = \{\s*\.\.\.snapshotWithSectionRelatedExhibitRefs,\s*section_index: attachSWEBodelningSectionRelatedReferenceRefs\(\s*snapshotWithSectionRelatedExhibitRefs\.section_index,/,
  );

  assert.doesNotMatch(
    exportSlice,
    /^\s*attachSWEBodelningSectionRelatedExhibitRefs,\s*$/m,
  );

  assert.deepEqual(
    collectLineMatches(
      governanceIndexText,
      /\battachSWEBodelningSectionRelatedExhibitRefs\b/,
    ),
    [
      1575,
      5291,
    ],
  );
  assert.doesNotMatch(
    apiIndexText,
    /attachSWEBodelningSectionRelatedExhibitRefs\(/,
  );
  assert.doesNotMatch(
    databaseIndexText,
    /attachSWEBodelningSectionRelatedExhibitRefs\(/,
  );
});
