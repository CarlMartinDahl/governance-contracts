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

test("docs freeze the shared governance profile-dossier lane-related-section helper seam as the lane-to-section attachment boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared Governance Profile Dossier Lane-Related-Section Attachment Helper Seam Freeze[\s\S]*?(?=\n### )/,
  );
  const helperStart = governanceIndexText.indexOf(
    "function attachSWEBodelningLaneRelatedSectionRefs(",
  );
  const helperEnd = governanceIndexText.indexOf(
    "function deriveSWEBodelningIssueRelatedExhibitRefs(",
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

  assert.ok(docsSectionMatch, "expected lane-related-section helper docs section");
  assert.notEqual(helperStart, -1, "expected lane-related-section helper start");
  assert.notEqual(helperEnd, -1, "expected lane-related-section helper end");
  assert.notEqual(snapshotStart, -1, "expected snapshot construction start");
  assert.notEqual(snapshotEnd, -1, "expected snapshot construction end");
  assert.notEqual(exportStart, -1, "expected governance export surface");

  const docsSection = docsSectionMatch[0];
  const helperSlice = governanceIndexText.slice(helperStart, helperEnd);
  const snapshotSlice = governanceIndexText.slice(snapshotStart, snapshotEnd);
  const exportSlice = governanceIndexText.slice(exportStart);

  assert.match(
    docsSection,
    /Shared Governance Profile Dossier Lane-Related-Section Attachment Helper Seam Freeze/i,
  );
  assert.match(
    docsSection,
    /profile-dossier lane-related-section attachment helper `attachSWEBodelningLaneRelatedSectionRefs` is the canonical governance-side `SWE_BODELNING` helper boundary for enriching already assembled profile-dossier `profile_input_lane_snapshot` entries with `related_section_refs` from already attached `profile_input_lane_snapshot\.\*\.related_issue_refs`, already assembled `issue_index\.related_section_refs`, and canonical `section_index\.section_ref` values/i,
  );
  assert.match(
    docsSection,
    /currently evidenced governed surface in this freeze is limited to:\s+additive deterministic `SWE_BODELNING` profile-dossier `profile_input_lane_snapshot\.\*\.related_section_refs` attachment from already assembled lane entries, already attached lane-to-issue refs, already assembled issue entries, and already assembled section entries inside the current profile-dossier snapshot flow/i,
  );
  assert.match(
    docsSection,
    /currently concrete helper responsibilities already evidenced for this seam are limited to:\s+asserting object-shaped `profileInputLaneSnapshot`\s+building the current issue-ref keyed related-section-ref map from already assembled `issueIndex` entries when `issueIndex` is an array\s+treating issue entries without array-shaped `related_section_refs` as empty related-section input\s+deriving the current canonical section-ref list from object-shaped entries in the already assembled `sectionIndex`\s+iterating the current canonical SWE lane keys\s+asserting each current lane entry under `profile_input_lane_snapshot\.<laneKey>`\s+treating lane entries without array-shaped `related_issue_refs` as empty related-issue input\s+preserving each existing lane entry while adding `related_section_refs`\s+deriving lane `related_section_refs` from canonical section refs, already attached `profile_input_lane_snapshot\.\*\.related_issue_refs`, and already assembled `issue_index\.related_section_refs`/i,
  );
  assert.match(
    docsSection,
    /no bounded internal helper is included in this seam because current repo evidence shows `attachSWEBodelningLaneRelatedSectionRefs\(\.\.\.\)` owns this lane-to-section attachment behavior directly with no helper delegated only for lane related-section-ref mapping/i,
  );
  assert.match(
    docsSection,
    /relationship to profile-dossier snapshot construction is limited to `deriveSWEBodelningProfileDossierSnapshot\(\.\.\.\)` calling this helper once while assembling `snapshotWithLaneRelatedSectionRefs`/i,
  );
  assert.match(
    docsSection,
    /relationship to the already-frozen lane-related-issue attachment helper seam is input-only and boundary-only because this attachment helper consumes already attached `profile_input_lane_snapshot\.\*\.related_issue_refs` and does not derive lane-to-issue mappings/i,
  );
  assert.match(
    docsSection,
    /relationship to the already-frozen issue-related-section attachment helper seam is input-only and boundary-only because this helper consumes already attached `issue_index\.related_section_refs` and does not derive issue-to-section mappings/i,
  );
  assert.match(
    docsSection,
    /relationship to the already-frozen evidence-exhibit related-section, evidence-exhibit related-issue, section-related-reference, section-related-exhibit, section-related-lane, section-related-issue, issue-related-reference, issue-related-exhibit, lane supporting-reference, lane supporting-exhibit, evidence-reference index, evidence-reference related-section, evidence-reference related-exhibit, evidence-exhibit index, issue-index, canonical-source, fingerprint, snapshot\/status\/attach\/projection helper seams and release-eval profile-dossier helper seams is boundary-only/i,
  );
  assert.match(
    docsSection,
    /relationship to other related\/supporting attachment helpers is negative and separate/i,
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
    /function attachSWEBodelningLaneRelatedSectionRefs\(\s*profileInputLaneSnapshot,\s*issueIndex,\s*sectionIndex,\s*\) \{/,
  );
  assert.match(
    helperSlice,
    /assertPlainObject\(\s*profileInputLaneSnapshot,\s*"ERR_PROFILE_DOSSIER_SNAPSHOT_INVALID",\s*"profile_input_lane_snapshot",\s*\);/,
  );
  assert.match(
    helperSlice,
    /const relatedSectionRefsByIssueRef = new Map\(\s*Array\.isArray\(issueIndex\)\s*\? issueIndex\s*\.filter\(/,
  );
  assert.match(
    helperSlice,
    /typeof entry\.issue_ref === "string",\s*\)\s*\.map\(\(entry\) => \[\s*entry\.issue_ref,\s*Array\.isArray\(entry\.related_section_refs\) \? entry\.related_section_refs : \[\],\s*\]\)\s*: \[\],\s*\);/,
  );
  assert.match(
    helperSlice,
    /const canonicalSectionRefs = Array\.isArray\(sectionIndex\)\s*\? sectionIndex\s*\.filter\(/,
  );
  assert.match(
    helperSlice,
    /typeof entry\.section_ref === "string",\s*\)\s*\.map\(\(entry\) => entry\.section_ref\)\s*: \[\];/,
  );
  assert.match(helperSlice, /for \(const laneKey of laneKeys\) \{/);
  assert.match(
    helperSlice,
    /const relatedIssueRefs = Array\.isArray\(laneEntry\.related_issue_refs\)\s*\? laneEntry\.related_issue_refs\s*: \[\];/,
  );
  assert.match(
    helperSlice,
    /related_section_refs: canonicalSectionRefs\.filter\(\(sectionRef\) =>\s*relatedIssueRefs\.some\(\(issueRef\) =>\s*relatedSectionRefsByIssueRef\.get\(issueRef\)\?\.includes\(sectionRef\),\s*\),\s*\),/,
  );
  assert.doesNotMatch(helperSlice, /attachSWEBodelningLaneRelatedIssueRefs\(/);
  assert.doesNotMatch(helperSlice, /attachSWEBodelningEvidenceExhibitRelatedSectionRefs\(/);
  assert.doesNotMatch(helperSlice, /attachSWEBodelningIssueRelatedSectionRefs\(/);
  assert.doesNotMatch(helperSlice, /deriveSWEBodelningIssueRelatedSectionRefs\(/);
  assert.doesNotMatch(helperSlice, /deriveSWEBodelningProfileDossierSectionIndex\(/);
  assert.doesNotMatch(helperSlice, /deriveSWEBodelningProfileDossierIssueIndex\(/);
  assert.doesNotMatch(helperSlice, /resolveSWEBodelningProfileDossierSnapshot\(/);
  assert.doesNotMatch(helperSlice, /validateSWEBodelningProfileDossierSnapshot\(/);
  assert.doesNotMatch(helperSlice, /deriveSWEBodelningExportPackage/);
  assert.doesNotMatch(helperSlice, /getLatest|persist|refresh|route|response/i);

  assert.match(
    snapshotSlice,
    /const snapshotWithLaneRelatedSectionRefs = \{\s*\.\.\.snapshotWithExhibitRelatedSectionRefs,\s*profile_input_lane_snapshot: attachSWEBodelningLaneRelatedSectionRefs\(\s*snapshotWithLaneRelatedIssueRefs\.profile_input_lane_snapshot,\s*snapshotWithExhibitRelatedSectionRefs\.issue_index,\s*snapshotWithExhibitRelatedSectionRefs\.section_index,\s*\),\s*\};/,
  );
  assert.match(
    snapshotSlice,
    /dossier_fingerprint: deriveSWEBodelningProfileDossierFingerprint\(\s*snapshotWithLaneRelatedSectionRefs,\s*\)/,
  );

  assert.doesNotMatch(exportSlice, /^\s*attachSWEBodelningLaneRelatedSectionRefs,\s*$/m);

  assert.deepEqual(
    collectLineMatches(governanceIndexText, /\battachSWEBodelningLaneRelatedSectionRefs\b/),
    [
      1225,
      1598,
    ],
  );
  assert.doesNotMatch(apiIndexText, /attachSWEBodelningLaneRelatedSectionRefs\(/);
  assert.doesNotMatch(databaseIndexText, /attachSWEBodelningLaneRelatedSectionRefs\(/);
});
