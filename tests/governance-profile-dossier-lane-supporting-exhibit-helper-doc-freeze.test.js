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

test("docs freeze the shared governance profile-dossier lane supporting-exhibit helper seam as the lane-to-exhibit attachment boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared Governance Profile Dossier Lane Supporting-Exhibit Attachment Helper Seam Freeze[\s\S]*?(?=\n### )/,
  );
  const helperStart = governanceIndexText.indexOf(
    "function attachSWEBodelningLaneSupportingExhibitRefs(",
  );
  const helperEnd = governanceIndexText.indexOf(
    "function attachSWEBodelningLaneSupportingReferenceRefs(",
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
    "expected lane supporting-exhibit helper docs section",
  );
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
    /Shared Governance Profile Dossier Lane Supporting-Exhibit Attachment Helper Seam Freeze/i,
  );
  assert.match(
    docsSection,
    /profile-dossier lane supporting-exhibit attachment helper `attachSWEBodelningLaneSupportingExhibitRefs` is the canonical governance-side `SWE_BODELNING` helper boundary for enriching already assembled profile-dossier `profile_input_lane_snapshot` entries with `supporting_exhibit_refs` from each lane's already assembled `evidence_object_ids` and already assembled `evidence_exhibit_index` entries/i,
  );
  assert.match(
    docsSection,
    /currently evidenced governed surface in this freeze is limited to:\s+additive deterministic `SWE_BODELNING` profile-dossier `profile_input_lane_snapshot\.\*\.supporting_exhibit_refs` attachment from already assembled lane entries and already assembled evidence-exhibit entries inside the current profile-dossier snapshot flow/i,
  );
  assert.match(
    docsSection,
    /currently concrete helper responsibilities already evidenced for this seam are limited to:\s+asserting object-shaped `profileInputLaneSnapshot`\s+treating non-array `evidenceExhibitIndex` input as an empty evidence-exhibit entry list\s+iterating the current canonical SWE lane keys\s+asserting each current lane entry under `profile_input_lane_snapshot\.<laneKey>`\s+building a lane-local evidence-object-id set from array-shaped `laneEntry\.evidence_object_ids`, otherwise an empty set\s+preserving each existing lane entry while adding `supporting_exhibit_refs`\s+deriving lane `supporting_exhibit_refs` from already assembled `evidence_exhibit_index\.evidence_object_id` values that match the lane evidence-object-id set and mapping those matched entries to `evidence_exhibit_index\.exhibit_ref`/i,
  );
  assert.match(
    docsSection,
    /no bounded internal helper is included in this seam because current repo evidence shows `attachSWEBodelningLaneSupportingExhibitRefs\(\.\.\.\)` owns this lane-to-exhibit attachment behavior directly with no helper delegated only for lane supporting-exhibit-ref mapping/i,
  );
  assert.match(
    docsSection,
    /relationship to profile-dossier snapshot construction is limited to `deriveSWEBodelningProfileDossierSnapshot\(\.\.\.\)` calling this helper once while assembling `snapshotWithSupportingExhibitRefs`/i,
  );
  assert.match(
    docsSection,
    /relationship to the already-frozen evidence-exhibit index helper seam is input-only and boundary-only because this attachment helper consumes already assembled `evidence_exhibit_index` entries and does not derive `EX-###` exhibit entries, evidence object ids, supporting lane keys, exhibit `related_lane_keys`, exhibit `related_reference_refs`, exhibit `related_issue_refs`, or exhibit `related_section_refs`/i,
  );
  assert.match(
    docsSection,
    /relationship to the already-frozen evidence-reference index helper seam is boundary-only because this attachment helper consumes the already assembled evidence-exhibit index produced from evidence-reference entries and does not derive `REF-###` reference entries, evidence-reference related-section refs, or evidence-reference related-exhibit refs/i,
  );
  assert.match(
    docsSection,
    /relationship to the already-frozen lane supporting-reference attachment seam is sibling-only and boundary-only because that helper enriches already assembled `profile_input_lane_snapshot` entries with `supporting_reference_refs` from already assembled evidence-reference entries while this helper enriches lanes with `supporting_exhibit_refs` from already assembled evidence-exhibit entries/i,
  );
  assert.match(
    docsSection,
    /relationship to the already-frozen evidence-reference related-section and evidence-reference related-exhibit attachment seams is sibling-adjacent and boundary-only because those helpers enrich already assembled `evidence_reference_index` entries while this helper enriches already assembled `profile_input_lane_snapshot` entries/i,
  );
  assert.match(
    docsSection,
    /relationship to issue-related-reference, issue-related-exhibit, lane related-issue, lane related-section, section-related-reference, section-related-exhibit, section-related-lane, section-related-issue, and issue-related-section attachment helpers is negative and separate/i,
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
    /function attachSWEBodelningLaneSupportingExhibitRefs\(\s*profileInputLaneSnapshot,\s*evidenceExhibitIndex,\s*\) \{/,
  );
  assert.match(
    helperSlice,
    /assertPlainObject\(\s*profileInputLaneSnapshot,\s*"ERR_PROFILE_DOSSIER_SNAPSHOT_INVALID",\s*"profile_input_lane_snapshot",\s*\);/,
  );
  assert.match(
    helperSlice,
    /const evidenceExhibitEntries = Array\.isArray\(evidenceExhibitIndex\)\s*\? evidenceExhibitIndex\s*: \[\];/,
  );
  assert.match(helperSlice, /for \(const laneKey of laneKeys\) \{/);
  assert.match(
    helperSlice,
    /assertPlainObject\(\s*laneEntry,\s*"ERR_PROFILE_DOSSIER_SNAPSHOT_INVALID",\s*`profile_input_lane_snapshot\.\$\{laneKey\}`,\s*\);/,
  );
  assert.match(
    helperSlice,
    /const evidenceObjectIds = new Set\(\s*Array\.isArray\(laneEntry\.evidence_object_ids\) \? laneEntry\.evidence_object_ids : \[\],\s*\);/,
  );
  assert.match(
    helperSlice,
    /attachedSnapshot\[laneKey\] = \{\s*\.\.\.laneEntry,\s*supporting_exhibit_refs: evidenceExhibitEntries\s*\.filter\(\(entry\) => evidenceObjectIds\.has\(entry\.evidence_object_id\)\)\s*\.map\(\(entry\) => entry\.exhibit_ref\),\s*\};/,
  );
  assert.match(helperSlice, /return attachedSnapshot;/);
  assert.doesNotMatch(helperSlice, /attachSWEBodelningLaneSupportingReferenceRefs\(/);
  assert.doesNotMatch(helperSlice, /deriveSWEBodelningProfileDossierEvidenceExhibitIndex\(/);
  assert.doesNotMatch(helperSlice, /deriveSWEBodelningProfileDossierEvidenceReferenceIndex\(/);
  assert.doesNotMatch(helperSlice, /attachSWEBodelningEvidenceReferenceRelatedSectionRefs\(/);
  assert.doesNotMatch(helperSlice, /attachSWEBodelningEvidenceReferenceRelatedExhibitRefs\(/);
  assert.doesNotMatch(helperSlice, /attachSWEBodelningSectionRelatedExhibitRefs\(/);
  assert.doesNotMatch(helperSlice, /attachSWEBodelningSectionRelatedLaneKeys\(/);
  assert.doesNotMatch(helperSlice, /attachSWEBodelningSectionRelatedIssueRefs\(/);
  assert.doesNotMatch(helperSlice, /attachSWEBodelningIssueRelatedSectionRefs\(/);
  assert.doesNotMatch(helperSlice, /deriveSWEBodelningIssueRelatedSectionRefs\(/);
  assert.doesNotMatch(helperSlice, /deriveSWEBodelningProfileDossierIssueIndex\(/);
  assert.doesNotMatch(helperSlice, /deriveSWEBodelningProfileDossierSectionIndex\(/);
  assert.doesNotMatch(helperSlice, /resolveSWEBodelningProfileDossierSnapshot\(/);
  assert.doesNotMatch(helperSlice, /validateSWEBodelningProfileDossierSnapshot\(/);
  assert.doesNotMatch(helperSlice, /deriveSWEBodelningExportPackage/);
  assert.doesNotMatch(helperSlice, /getLatest|persist|refresh|route|response/i);

  assert.match(
    snapshotSlice,
    /const snapshotWithSupportingExhibitRefs = \{\s*\.\.\.snapshotWithRelatedReferenceRefs,\s*profile_input_lane_snapshot: attachSWEBodelningLaneSupportingExhibitRefs\(\s*snapshotWithSupportingReferenceRefs\.profile_input_lane_snapshot,\s*snapshotWithEvidenceReferenceRelatedExhibitRefs\.evidence_exhibit_index,\s*\),\s*\};/,
  );
  assert.match(
    snapshotSlice,
    /const snapshotWithRelatedExhibitRefs = \{\s*\.\.\.snapshotWithSupportingExhibitRefs,\s*issue_index: attachSWEBodelningIssueRelatedExhibitRefs\(/,
  );

  assert.doesNotMatch(
    exportSlice,
    /^\s*attachSWEBodelningLaneSupportingExhibitRefs,\s*$/m,
  );

  assert.deepEqual(
    collectLineMatches(
      governanceIndexText,
      /\battachSWEBodelningLaneSupportingExhibitRefs\b/,
    ),
    [
      1093,
      1546,
    ],
  );
  assert.doesNotMatch(
    apiIndexText,
    /attachSWEBodelningLaneSupportingExhibitRefs\(/,
  );
  assert.doesNotMatch(
    databaseIndexText,
    /attachSWEBodelningLaneSupportingExhibitRefs\(/,
  );
});
