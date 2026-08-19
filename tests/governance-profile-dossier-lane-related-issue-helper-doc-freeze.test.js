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

test("docs freeze the shared governance profile-dossier lane-related-issue helper seam as the lane-to-issue attachment boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared Governance Profile Dossier Lane-Related-Issue Attachment Helper Seam Freeze[\s\S]*?(?=\n### )/,
  );
  const helperStart = governanceIndexText.indexOf(
    "function attachSWEBodelningLaneRelatedIssueRefs(",
  );
  const helperEnd = governanceIndexText.indexOf(
    "function attachSWEBodelningLaneRelatedSectionRefs(",
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

  assert.ok(docsSectionMatch, "expected lane-related-issue helper docs section");
  assert.notEqual(helperStart, -1, "expected lane-related-issue helper start");
  assert.notEqual(helperEnd, -1, "expected lane-related-issue helper end");
  assert.notEqual(snapshotStart, -1, "expected snapshot construction start");
  assert.notEqual(snapshotEnd, -1, "expected snapshot construction end");
  assert.notEqual(exportStart, -1, "expected governance export surface");

  const docsSection = docsSectionMatch[0];
  const helperSlice = governanceIndexText.slice(helperStart, helperEnd);
  const snapshotSlice = governanceIndexText.slice(snapshotStart, snapshotEnd);
  const exportSlice = governanceIndexText.slice(exportStart);

  assert.match(
    docsSection,
    /Shared Governance Profile Dossier Lane-Related-Issue Attachment Helper Seam Freeze/i,
  );
  assert.match(
    docsSection,
    /profile-dossier lane-related-issue attachment helper `attachSWEBodelningLaneRelatedIssueRefs` is the canonical governance-side `SWE_BODELNING` helper boundary for enriching already assembled profile-dossier `profile_input_lane_snapshot` entries with `related_issue_refs` from already assembled `issue_index\.related_lane_keys` and `issue_index\.issue_ref` values/i,
  );
  assert.match(
    docsSection,
    /currently evidenced governed surface in this freeze is limited to:\s+additive deterministic `SWE_BODELNING` profile-dossier `profile_input_lane_snapshot\.\*\.related_issue_refs` attachment from already assembled lane entries and already assembled issue entries inside the current profile-dossier snapshot flow/i,
  );
  assert.match(
    docsSection,
    /currently concrete helper responsibilities already evidenced for this seam are limited to:\s+asserting object-shaped `profileInputLaneSnapshot`\s+initializing the current canonical SWE lane-key map for related issue refs\s+treating non-array `issueIndex` input as an empty issue entry list\s+consuming only issue entries with string `issue_ref` and array-shaped `related_lane_keys`\s+skipping related lane keys outside the current canonical SWE lane-key map\s+deduplicating issue refs per lane key with the current array membership check\s+iterating the current canonical SWE lane keys\s+asserting each current lane entry under `profile_input_lane_snapshot\.<laneKey>`\s+preserving each existing lane entry while adding `related_issue_refs`\s+deriving lane `related_issue_refs` from already assembled `issue_index\.related_lane_keys` and `issue_index\.issue_ref` values/i,
  );
  assert.match(
    docsSection,
    /no bounded internal helper is included in this seam because current repo evidence shows `attachSWEBodelningLaneRelatedIssueRefs\(\.\.\.\)` owns this lane-to-issue attachment behavior directly with no helper delegated only for lane related-issue-ref mapping/i,
  );
  assert.match(
    docsSection,
    /relationship to profile-dossier snapshot construction is limited to `deriveSWEBodelningProfileDossierSnapshot\(\.\.\.\)` calling this helper once while assembling `snapshotWithLaneRelatedIssueRefs`/i,
  );
  assert.match(
    docsSection,
    /relationship to the already-frozen issue-index helper seam is input-only and boundary-only because this attachment helper consumes already assembled issue entries and does not derive `ISS-###` issue entries/i,
  );
  assert.match(
    docsSection,
    /relationship to the already-frozen issue-related-reference, issue-related-exhibit, and issue-related-section attachment helper seams is sibling-adjacent and boundary-only because those helpers enrich already assembled `issue_index` entries while this helper enriches already assembled `profile_input_lane_snapshot` entries/i,
  );
  assert.match(
    docsSection,
    /relationship to the already-frozen lane supporting-reference and lane supporting-exhibit attachment helper seams is sibling-only and boundary-only because those helpers enrich already assembled `profile_input_lane_snapshot` entries with `supporting_reference_refs` or `supporting_exhibit_refs`, while this helper enriches lanes with `related_issue_refs`/i,
  );
  assert.match(
    docsSection,
    /relationship to lane related-section, section-related-reference, evidence-exhibit related-reference\/issue\/section, and other related\/supporting attachment helpers is negative and separate/i,
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
    /function attachSWEBodelningLaneRelatedIssueRefs\(\s*profileInputLaneSnapshot,\s*issueIndex,\s*\) \{/,
  );
  assert.match(
    helperSlice,
    /assertPlainObject\(\s*profileInputLaneSnapshot,\s*"ERR_PROFILE_DOSSIER_SNAPSHOT_INVALID",\s*"profile_input_lane_snapshot",\s*\);/,
  );
  assert.match(
    helperSlice,
    /const relatedIssueRefsByLaneKey = new Map\(laneKeys\.map\(\(laneKey\) => \[laneKey, \[\]\]\)\);/,
  );
  assert.match(helperSlice, /if \(Array\.isArray\(issueIndex\)\) \{/);
  assert.match(
    helperSlice,
    /typeof issueEntry\?\.issue_ref !== "string" \|\|\s*!Array\.isArray\(issueEntry\.related_lane_keys\)/,
  );
  assert.match(helperSlice, /for \(const laneKey of issueEntry\.related_lane_keys\) \{/);
  assert.match(
    helperSlice,
    /if \(!relatedIssueRefsByLaneKey\.has\(laneKey\)\) \{\s*continue;\s*\}/,
  );
  assert.match(
    helperSlice,
    /if \(!relatedIssueRefs\.includes\(issueEntry\.issue_ref\)\) \{\s*relatedIssueRefs\.push\(issueEntry\.issue_ref\);\s*\}/,
  );
  assert.match(helperSlice, /for \(const laneKey of laneKeys\) \{/);
  assert.match(
    helperSlice,
    /assertPlainObject\(\s*laneEntry,\s*"ERR_PROFILE_DOSSIER_SNAPSHOT_INVALID",\s*`profile_input_lane_snapshot\.\$\{laneKey\}`,\s*\);/,
  );
  assert.match(
    helperSlice,
    /attachedSnapshot\[laneKey\] = \{\s*\.\.\.laneEntry,\s*related_issue_refs: relatedIssueRefsByLaneKey\.get\(laneKey\) \?\? \[\],\s*\};/,
  );
  assert.match(helperSlice, /return attachedSnapshot;/);
  assert.doesNotMatch(helperSlice, /attachSWEBodelningLaneSupportingReferenceRefs\(/);
  assert.doesNotMatch(helperSlice, /attachSWEBodelningLaneSupportingExhibitRefs\(/);
  assert.doesNotMatch(helperSlice, /attachSWEBodelningIssueRelatedReferenceRefs\(/);
  assert.doesNotMatch(helperSlice, /deriveSWEBodelningIssueRelatedReferenceRefs\(/);
  assert.doesNotMatch(helperSlice, /attachSWEBodelningIssueRelatedExhibitRefs\(/);
  assert.doesNotMatch(helperSlice, /deriveSWEBodelningIssueRelatedExhibitRefs\(/);
  assert.doesNotMatch(helperSlice, /attachSWEBodelningIssueRelatedSectionRefs\(/);
  assert.doesNotMatch(helperSlice, /deriveSWEBodelningIssueRelatedSectionRefs\(/);
  assert.doesNotMatch(helperSlice, /deriveSWEBodelningProfileDossierIssueIndex\(/);
  assert.doesNotMatch(helperSlice, /resolveSWEBodelningProfileDossierSnapshot\(/);
  assert.doesNotMatch(helperSlice, /validateSWEBodelningProfileDossierSnapshot\(/);
  assert.doesNotMatch(helperSlice, /deriveSWEBodelningExportPackage/);
  assert.doesNotMatch(helperSlice, /getLatest|persist|refresh|route|response/i);

  assert.match(
    snapshotSlice,
    /const snapshotWithLaneRelatedIssueRefs = \{\s*\.\.\.snapshotWithRelatedExhibitRefs,\s*profile_input_lane_snapshot: attachSWEBodelningLaneRelatedIssueRefs\(\s*snapshotWithSupportingExhibitRefs\.profile_input_lane_snapshot,\s*snapshotWithRelatedExhibitRefs\.issue_index,\s*\),\s*\};/,
  );
  assert.match(
    snapshotSlice,
    /const snapshotWithExhibitRelatedIssueRefs = \{\s*\.\.\.snapshotWithLaneRelatedIssueRefs,\s*evidence_exhibit_index: attachSWEBodelningEvidenceExhibitRelatedIssueRefs\(/,
  );

  assert.doesNotMatch(exportSlice, /^\s*attachSWEBodelningLaneRelatedIssueRefs,\s*$/m);

  assert.deepEqual(
    collectLineMatches(governanceIndexText, /\battachSWEBodelningLaneRelatedIssueRefs\b/),
    [
      1171,
      1561,
    ],
  );
  assert.doesNotMatch(apiIndexText, /attachSWEBodelningLaneRelatedIssueRefs\(/);
  assert.doesNotMatch(databaseIndexText, /attachSWEBodelningLaneRelatedIssueRefs\(/);
});
