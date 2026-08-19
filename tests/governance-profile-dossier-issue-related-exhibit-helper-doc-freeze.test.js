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

test("docs freeze the shared governance profile-dossier issue-related-exhibit helper seam as the issue-to-exhibit attachment boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared Governance Profile Dossier Issue-Related-Exhibit Attachment Helper Seam Freeze[\s\S]*?(?=\n### )/,
  );
  const deriveStart = governanceIndexText.indexOf(
    "function deriveSWEBodelningIssueRelatedExhibitRefs(",
  );
  const deriveEnd = governanceIndexText.indexOf(
    "function deriveSWEBodelningIssueRelatedReferenceRefs(",
    deriveStart,
  );
  const attachStart = governanceIndexText.indexOf(
    "function attachSWEBodelningIssueRelatedExhibitRefs(",
  );
  const attachEnd = governanceIndexText.indexOf(
    "function attachSWEBodelningIssueRelatedReferenceRefs(",
    attachStart,
  );
  const snapshotStart = governanceIndexText.indexOf(
    "function deriveSWEBodelningProfileDossierSnapshot(",
  );
  const snapshotEnd = governanceIndexText.indexOf(
    "function resolveSWEBodelningExportPackageGeneratedAt(",
    snapshotStart,
  );
  const exportStart = governanceIndexText.indexOf("module.exports = {");

  assert.ok(docsSectionMatch, "expected issue-related-exhibit helper docs section");
  assert.notEqual(deriveStart, -1, "expected related-exhibit derive helper start");
  assert.notEqual(deriveEnd, -1, "expected related-exhibit derive helper end");
  assert.notEqual(attachStart, -1, "expected related-exhibit attach helper start");
  assert.notEqual(attachEnd, -1, "expected related-exhibit attach helper end");
  assert.notEqual(snapshotStart, -1, "expected snapshot construction start");
  assert.notEqual(snapshotEnd, -1, "expected snapshot construction end");
  assert.notEqual(exportStart, -1, "expected governance export surface");

  const docsSection = docsSectionMatch[0];
  const deriveSlice = governanceIndexText.slice(deriveStart, deriveEnd);
  const attachSlice = governanceIndexText.slice(attachStart, attachEnd);
  const snapshotSlice = governanceIndexText.slice(snapshotStart, snapshotEnd);
  const exportSlice = governanceIndexText.slice(exportStart);

  assert.match(
    docsSection,
    /Shared Governance Profile Dossier Issue-Related-Exhibit Attachment Helper Seam Freeze/i,
  );
  assert.match(
    docsSection,
    /profile-dossier issue-related-exhibit attachment helper `attachSWEBodelningIssueRelatedExhibitRefs` is the canonical governance-side `SWE_BODELNING` helper boundary for enriching already assembled profile-dossier `issue_index` entries with `related_exhibit_refs` from already assembled `profile_input_lane_snapshot\.\*\.supporting_exhibit_refs` values and already assembled `evidence_exhibit_index\.exhibit_ref` values/i,
  );
  assert.match(
    docsSection,
    /currently evidenced governed surface in this freeze is limited to:\s+additive deterministic `SWE_BODELNING` profile-dossier `issue_index\.related_exhibit_refs` attachment from already assembled issue entries, already attached lane supporting-exhibit refs, and already assembled evidence-exhibit entries inside the current profile-dossier snapshot flow/i,
  );
  assert.match(
    docsSection,
    /currently concrete helper responsibilities already evidenced for this seam are limited to:\s+returning an empty issue-index attachment result when `issueIndex` is not an array\s+preserving each existing issue entry while adding `related_exhibit_refs`\s+deriving the related exhibit refs through the bounded internal `deriveSWEBodelningIssueRelatedExhibitRefs\(\.\.\.\)` helper\s+asserting object-shaped `issueEntry`\s+asserting object-shaped `profileInputLaneSnapshot`\s+returning an empty related-exhibit-ref list when `issueEntry\.related_lane_keys` is not an array or `evidenceExhibitIndex` is not an array\s+iterating the already assembled `issueEntry\.related_lane_keys`\s+skipping missing, non-object, or array-shaped lane entries\s+collecting array-shaped `laneEntry\.supporting_exhibit_refs`, otherwise treating that lane's supporting-exhibit refs as empty\s+deduplicating candidate related-exhibit refs with the current `Set` accumulation\s+filtering already assembled `evidence_exhibit_index` entries against the collected exhibit refs and returning their `exhibit_ref` values/i,
  );
  assert.match(
    docsSection,
    /`deriveSWEBodelningIssueRelatedExhibitRefs\(\.\.\.\)` is included only as a bounded internal family member because current repo evidence shows it is unexported, called only by `attachSWEBodelningIssueRelatedExhibitRefs\(\.\.\.\)`, and owns only the issue-to-exhibit mapping needed by this attachment helper/i,
  );
  assert.match(
    docsSection,
    /relationship to profile-dossier snapshot construction is limited to `deriveSWEBodelningProfileDossierSnapshot\(\.\.\.\)` calling this helper once while assembling `snapshotWithRelatedExhibitRefs`/i,
  );
  assert.match(
    docsSection,
    /relationship to the already-frozen issue-related-reference attachment helper seam is sibling-only and boundary-only because this helper enriches already assembled `issue_index` entries with `related_exhibit_refs`, not `related_reference_refs`, and does not include `attachSWEBodelningIssueRelatedReferenceRefs\(\.\.\.\)` or `deriveSWEBodelningIssueRelatedReferenceRefs\(\.\.\.\)`/i,
  );
  assert.match(
    docsSection,
    /relationship to the already-frozen issue-related-section attachment helper seam is sibling-only and boundary-only because this helper enriches already assembled `issue_index` entries with `related_exhibit_refs`, not `related_section_refs`, and does not include `attachSWEBodelningIssueRelatedSectionRefs\(\.\.\.\)` or `deriveSWEBodelningIssueRelatedSectionRefs\(\.\.\.\)`/i,
  );
  assert.match(
    docsSection,
    /relationship to the already-frozen lane supporting-exhibit attachment seam is input-only and boundary-only because this attachment helper consumes already attached `profile_input_lane_snapshot\.\*\.supporting_exhibit_refs` and does not include `attachSWEBodelningLaneSupportingExhibitRefs\(\.\.\.\)` or derive lane supporting-exhibit refs/i,
  );
  assert.match(
    docsSection,
    /relationship to the already-frozen lane supporting-reference attachment seam is boundary-only because that seam attaches `supporting_reference_refs`, not `supporting_exhibit_refs`, and does not define issue-to-exhibit attachment/i,
  );
  assert.match(
    docsSection,
    /relationship to the already-frozen evidence-exhibit index helper seam is input-only and boundary-only because this attachment helper consumes already assembled `evidence_exhibit_index` entries and does not derive `EX-###` exhibit entries/i,
  );
  assert.match(
    docsSection,
    /relationship to the already-frozen evidence-reference index and evidence-reference related-section\/related-exhibit attachment seams is boundary-only because those helpers assemble or enrich `evidence_reference_index` while this helper enriches already assembled `issue_index` entries/i,
  );
  assert.match(
    docsSection,
    /relationship to lane related-issue, lane related-section, section-related-reference, evidence-exhibit related-reference\/issue\/section, and other related\/supporting attachment helpers is negative and separate/i,
  );
  assert.match(
    docsSection,
    /current bounded reuse already evidenced in `packages\/governance\/src\/index\.js` is limited to one attachment helper definition, one bounded internal derive helper definition, one profile-dossier snapshot-construction call site, and no current named module export surface for either helper/i,
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
    deriveSlice,
    /function deriveSWEBodelningIssueRelatedExhibitRefs\(\s*issueEntry,\s*profileInputLaneSnapshot,\s*evidenceExhibitIndex,\s*\) \{/,
  );
  assert.match(
    deriveSlice,
    /assertPlainObject\(\s*issueEntry,\s*"ERR_PROFILE_DOSSIER_SNAPSHOT_INVALID",\s*"issue_index_entry",\s*\);/,
  );
  assert.match(
    deriveSlice,
    /assertPlainObject\(\s*profileInputLaneSnapshot,\s*"ERR_PROFILE_DOSSIER_SNAPSHOT_INVALID",\s*"profile_input_lane_snapshot",\s*\);/,
  );
  assert.match(
    deriveSlice,
    /if \(!Array\.isArray\(issueEntry\.related_lane_keys\) \|\| !Array\.isArray\(evidenceExhibitIndex\)\) \{\s*return \[\];\s*\}/,
  );
  assert.match(deriveSlice, /const relatedExhibitRefs = new Set\(\);/);
  assert.match(deriveSlice, /for \(const laneKey of issueEntry\.related_lane_keys\) \{/);
  assert.match(
    deriveSlice,
    /if \(!laneEntry \|\| typeof laneEntry !== "object" \|\| Array\.isArray\(laneEntry\)\) \{\s*continue;\s*\}/,
  );
  assert.match(
    deriveSlice,
    /const supportingExhibitRefs = Array\.isArray\(laneEntry\.supporting_exhibit_refs\)\s*\? laneEntry\.supporting_exhibit_refs\s*: \[\];/,
  );
  assert.match(
    deriveSlice,
    /for \(const exhibitRef of supportingExhibitRefs\) \{\s*relatedExhibitRefs\.add\(exhibitRef\);\s*\}/,
  );
  assert.match(
    deriveSlice,
    /return evidenceExhibitIndex\s*\.filter\(\(entry\) => relatedExhibitRefs\.has\(entry\.exhibit_ref\)\)\s*\.map\(\(entry\) => entry\.exhibit_ref\);/,
  );
  assert.doesNotMatch(deriveSlice, /attachSWEBodelningIssueRelatedExhibitRefs\(/);
  assert.doesNotMatch(deriveSlice, /deriveSWEBodelningIssueRelatedReferenceRefs\(/);
  assert.doesNotMatch(deriveSlice, /attachSWEBodelningLaneSupportingExhibitRefs\(/);
  assert.doesNotMatch(deriveSlice, /deriveSWEBodelningProfileDossierEvidenceExhibitIndex\(/);
  assert.doesNotMatch(deriveSlice, /resolveSWEBodelningProfileDossierSnapshot\(/);
  assert.doesNotMatch(deriveSlice, /validateSWEBodelningProfileDossierSnapshot\(/);
  assert.doesNotMatch(deriveSlice, /deriveSWEBodelningExportPackage/);
  assert.doesNotMatch(deriveSlice, /getLatest|persist|refresh|route|response/i);

  assert.match(
    attachSlice,
    /function attachSWEBodelningIssueRelatedExhibitRefs\(\s*issueIndex,\s*profileInputLaneSnapshot,\s*evidenceExhibitIndex,\s*\) \{/,
  );
  assert.match(attachSlice, /if \(!Array\.isArray\(issueIndex\)\) \{\s*return \[\];\s*\}/);
  assert.match(
    attachSlice,
    /return issueIndex\.map\(\(entry\) => \(\{\s*\.\.\.entry,\s*related_exhibit_refs: deriveSWEBodelningIssueRelatedExhibitRefs\(\s*entry,\s*profileInputLaneSnapshot,\s*evidenceExhibitIndex,\s*\),\s*\}\)\);/,
  );
  assert.doesNotMatch(attachSlice, /attachSWEBodelningIssueRelatedReferenceRefs\(/);
  assert.doesNotMatch(attachSlice, /deriveSWEBodelningIssueRelatedReferenceRefs\(/);
  assert.doesNotMatch(attachSlice, /attachSWEBodelningIssueRelatedSectionRefs\(/);
  assert.doesNotMatch(attachSlice, /deriveSWEBodelningIssueRelatedSectionRefs\(/);
  assert.doesNotMatch(attachSlice, /attachSWEBodelningLaneSupportingReferenceRefs\(/);
  assert.doesNotMatch(attachSlice, /attachSWEBodelningLaneSupportingExhibitRefs\(/);
  assert.doesNotMatch(attachSlice, /deriveSWEBodelningProfileDossierEvidenceExhibitIndex\(/);
  assert.doesNotMatch(attachSlice, /resolveSWEBodelningProfileDossierSnapshot\(/);
  assert.doesNotMatch(attachSlice, /validateSWEBodelningProfileDossierSnapshot\(/);
  assert.doesNotMatch(attachSlice, /deriveSWEBodelningExportPackage/);
  assert.doesNotMatch(attachSlice, /getLatest|persist|refresh|route|response/i);

  assert.match(
    snapshotSlice,
    /const snapshotWithSupportingExhibitRefs = \{\s*\.\.\.snapshotWithRelatedReferenceRefs,\s*profile_input_lane_snapshot: attachSWEBodelningLaneSupportingExhibitRefs\(\s*snapshotWithSupportingReferenceRefs\.profile_input_lane_snapshot,\s*snapshotWithEvidenceReferenceRelatedExhibitRefs\.evidence_exhibit_index,\s*\),\s*\};/,
  );
  assert.match(
    snapshotSlice,
    /const snapshotWithRelatedExhibitRefs = \{\s*\.\.\.snapshotWithSupportingExhibitRefs,\s*issue_index: attachSWEBodelningIssueRelatedExhibitRefs\(\s*snapshotWithRelatedReferenceRefs\.issue_index,\s*snapshotWithSupportingExhibitRefs\.profile_input_lane_snapshot,\s*snapshotWithSupportingExhibitRefs\.evidence_exhibit_index,\s*\),\s*\};/,
  );
  assert.match(
    snapshotSlice,
    /const snapshotWithLaneRelatedIssueRefs = \{\s*\.\.\.snapshotWithRelatedExhibitRefs,\s*profile_input_lane_snapshot: attachSWEBodelningLaneRelatedIssueRefs\(/,
  );

  assert.doesNotMatch(exportSlice, /^\s*attachSWEBodelningIssueRelatedExhibitRefs,\s*$/m);
  assert.doesNotMatch(exportSlice, /^\s*deriveSWEBodelningIssueRelatedExhibitRefs,\s*$/m);

  assert.deepEqual(
    collectLineMatches(governanceIndexText, /\battachSWEBodelningIssueRelatedExhibitRefs\b/),
    [
      1553,
      5004,
    ],
  );
  assert.deepEqual(
    collectLineMatches(governanceIndexText, /\bderiveSWEBodelningIssueRelatedExhibitRefs\b/),
    [
      1289,
      5015,
    ],
  );
  assert.doesNotMatch(apiIndexText, /attachSWEBodelningIssueRelatedExhibitRefs\(/);
  assert.doesNotMatch(databaseIndexText, /attachSWEBodelningIssueRelatedExhibitRefs\(/);
});
