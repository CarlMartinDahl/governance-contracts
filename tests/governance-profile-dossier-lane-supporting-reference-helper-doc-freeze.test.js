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

test("docs freeze the shared governance profile-dossier lane supporting-reference helper seam as the lane-to-reference attachment boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared Governance Profile Dossier Lane Supporting-Reference Attachment Helper Seam Freeze[\s\S]*?(?=\n### )/,
  );
  const helperStart = governanceIndexText.indexOf(
    "function attachSWEBodelningLaneSupportingReferenceRefs(",
  );
  const helperEnd = governanceIndexText.indexOf(
    "function attachSWEBodelningLaneRelatedIssueRefs(",
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
    "expected lane supporting-reference helper docs section",
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
    /Shared Governance Profile Dossier Lane Supporting-Reference Attachment Helper Seam Freeze/i,
  );
  assert.match(
    docsSection,
    /profile-dossier lane supporting-reference attachment helper `attachSWEBodelningLaneSupportingReferenceRefs` is the canonical governance-side `SWE_BODELNING` helper boundary for enriching already assembled profile-dossier `profile_input_lane_snapshot` entries with `supporting_reference_refs` from each lane's already assembled `evidence_object_ids` and already assembled `evidence_reference_index` entries/i,
  );
  assert.match(
    docsSection,
    /currently evidenced governed surface in this freeze is limited to:\s+additive deterministic `SWE_BODELNING` profile-dossier `profile_input_lane_snapshot\.\*\.supporting_reference_refs` attachment from already assembled lane entries and already assembled evidence-reference entries inside the current profile-dossier snapshot flow/i,
  );
  assert.match(
    docsSection,
    /currently concrete helper responsibilities already evidenced for this seam are limited to:\s+asserting object-shaped `profileInputLaneSnapshot`\s+treating non-array `evidenceReferenceIndex` input as an empty evidence-reference entry list\s+iterating the current canonical SWE lane keys\s+asserting each current lane entry under `profile_input_lane_snapshot\.<laneKey>`\s+building a lane-local evidence-object-id set from array-shaped `laneEntry\.evidence_object_ids`, otherwise an empty set\s+preserving each existing lane entry while adding `supporting_reference_refs`\s+deriving lane `supporting_reference_refs` from already assembled `evidence_reference_index\.evidence_object_id` values that match the lane evidence-object-id set and mapping those matched entries to `evidence_reference_index\.reference_ref`/i,
  );
  assert.match(
    docsSection,
    /no bounded internal helper is included in this seam because current repo evidence shows `attachSWEBodelningLaneSupportingReferenceRefs\(\.\.\.\)` owns this lane-to-reference attachment behavior directly with no helper delegated only for lane supporting-reference-ref mapping/i,
  );
  assert.match(
    docsSection,
    /relationship to profile-dossier snapshot construction is limited to `deriveSWEBodelningProfileDossierSnapshot\(\.\.\.\)` calling this helper once while assembling `snapshotWithSupportingReferenceRefs`/i,
  );
  assert.match(
    docsSection,
    /relationship to the already-frozen evidence-reference index helper seam is input-only and boundary-only because this attachment helper consumes already assembled `evidence_reference_index` entries and does not derive `REF-###` reference entries, evidence object ids, supporting lane keys, evidence-reference `related_issue_refs`, evidence-reference `related_section_refs`, or evidence-reference `related_exhibit_refs`/i,
  );
  assert.match(
    docsSection,
    /relationship to the already-frozen evidence-reference related-section and evidence-reference related-exhibit attachment seams is sibling-adjacent and boundary-only because those helpers enrich already assembled `evidence_reference_index` entries while this helper enriches already assembled `profile_input_lane_snapshot` entries/i,
  );
  assert.match(
    docsSection,
    /relationship to the lane supporting-exhibit attachment helper is sibling-only and boundary-only because that helper enriches already assembled `profile_input_lane_snapshot` entries with `supporting_exhibit_refs` from already assembled evidence-exhibit entries later in the snapshot-construction chain/i,
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
    /function attachSWEBodelningLaneSupportingReferenceRefs\(\s*profileInputLaneSnapshot,\s*evidenceReferenceIndex,\s*\) \{/,
  );
  assert.match(
    helperSlice,
    /assertPlainObject\(\s*profileInputLaneSnapshot,\s*"ERR_PROFILE_DOSSIER_SNAPSHOT_INVALID",\s*"profile_input_lane_snapshot",\s*\);/,
  );
  assert.match(
    helperSlice,
    /const evidenceReferenceEntries = Array\.isArray\(evidenceReferenceIndex\)\s*\? evidenceReferenceIndex\s*: \[\];/,
  );
  assert.match(
    helperSlice,
    /for \(const laneKey of laneKeys\) \{/,
  );
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
    /attachedSnapshot\[laneKey\] = \{\s*\.\.\.laneEntry,\s*supporting_reference_refs: evidenceReferenceEntries\s*\.filter\(\(entry\) => evidenceObjectIds\.has\(entry\.evidence_object_id\)\)\s*\.map\(\(entry\) => entry\.reference_ref\),\s*\};/,
  );
  assert.match(helperSlice, /return attachedSnapshot;/);
  assert.doesNotMatch(helperSlice, /attachSWEBodelningLaneSupportingExhibitRefs\(/);
  assert.doesNotMatch(helperSlice, /attachSWEBodelningEvidenceReferenceRelatedSectionRefs\(/);
  assert.doesNotMatch(helperSlice, /attachSWEBodelningEvidenceReferenceRelatedExhibitRefs\(/);
  assert.doesNotMatch(helperSlice, /deriveSWEBodelningProfileDossierEvidenceReferenceIndex\(/);
  assert.doesNotMatch(helperSlice, /deriveSWEBodelningProfileDossierEvidenceExhibitIndex\(/);
  assert.doesNotMatch(helperSlice, /deriveSWEBodelningProfileDossierIssueIndex\(/);
  assert.doesNotMatch(helperSlice, /deriveSWEBodelningProfileDossierSectionIndex\(/);
  assert.doesNotMatch(helperSlice, /resolveSWEBodelningProfileDossierSnapshot\(/);
  assert.doesNotMatch(helperSlice, /validateSWEBodelningProfileDossierSnapshot\(/);
  assert.doesNotMatch(helperSlice, /deriveSWEBodelningExportPackage/);
  assert.doesNotMatch(helperSlice, /getLatest|persist|refresh|route|response/i);

  assert.match(
    snapshotSlice,
    /const snapshotWithSupportingReferenceRefs = \{\s*\.\.\.snapshotWithEvidenceReferenceRelatedExhibitRefs,\s*profile_input_lane_snapshot: attachSWEBodelningLaneSupportingReferenceRefs\(\s*snapshotWithEvidenceReferenceRelatedExhibitRefs\.profile_input_lane_snapshot,\s*snapshotWithEvidenceReferenceRelatedExhibitRefs\.evidence_reference_index,\s*\),\s*\};/,
  );
  assert.match(
    snapshotSlice,
    /const snapshotWithSupportingExhibitRefs = \{\s*\.\.\.snapshotWithRelatedReferenceRefs,\s*profile_input_lane_snapshot: attachSWEBodelningLaneSupportingExhibitRefs\(\s*snapshotWithSupportingReferenceRefs\.profile_input_lane_snapshot,/,
  );

  assert.doesNotMatch(
    exportSlice,
    /^\s*attachSWEBodelningLaneSupportingReferenceRefs,\s*$/m,
  );

  assert.deepEqual(
    collectLineMatches(
      governanceIndexText,
      /\battachSWEBodelningLaneSupportingReferenceRefs\b/,
    ),
    [
      1132,
      1531,
    ],
  );
  assert.doesNotMatch(
    apiIndexText,
    /attachSWEBodelningLaneSupportingReferenceRefs\(/,
  );
  assert.doesNotMatch(
    databaseIndexText,
    /attachSWEBodelningLaneSupportingReferenceRefs\(/,
  );
});
