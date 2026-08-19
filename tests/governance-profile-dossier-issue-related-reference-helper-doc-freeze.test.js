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

test("docs freeze the shared governance profile-dossier issue-related-reference helper seam as the issue-to-reference attachment boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared Governance Profile Dossier Issue-Related-Reference Attachment Helper Seam Freeze[\s\S]*?(?=\n### )/,
  );
  const deriveStart = governanceIndexText.indexOf(
    "function deriveSWEBodelningIssueRelatedReferenceRefs(",
  );
  const deriveEnd = governanceIndexText.indexOf(
    "function resolveProfileDossierSourceTimestamp(",
    deriveStart,
  );
  const attachStart = governanceIndexText.indexOf(
    "function attachSWEBodelningIssueRelatedReferenceRefs(",
  );
  const attachEnd = governanceIndexText.indexOf(
    "function attachSWEBodelningEvidenceExhibitRelatedIssueRefs(",
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

  assert.ok(docsSectionMatch, "expected issue-related-reference helper docs section");
  assert.notEqual(deriveStart, -1, "expected related-reference derive helper start");
  assert.notEqual(deriveEnd, -1, "expected related-reference derive helper end");
  assert.notEqual(attachStart, -1, "expected related-reference attach helper start");
  assert.notEqual(attachEnd, -1, "expected related-reference attach helper end");
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
    /Shared Governance Profile Dossier Issue-Related-Reference Attachment Helper Seam Freeze/i,
  );
  assert.match(
    docsSection,
    /profile-dossier issue-related-reference attachment helper `attachSWEBodelningIssueRelatedReferenceRefs` is the canonical governance-side `SWE_BODELNING` helper boundary for enriching already assembled profile-dossier `issue_index` entries with `related_reference_refs` from already assembled `profile_input_lane_snapshot\.\*\.supporting_reference_refs` values and already assembled `evidence_reference_index\.reference_ref` values/i,
  );
  assert.match(
    docsSection,
    /currently evidenced governed surface in this freeze is limited to:\s+additive deterministic `SWE_BODELNING` profile-dossier `issue_index\.related_reference_refs` attachment from already assembled issue entries, already attached lane supporting-reference refs, and already assembled evidence-reference entries inside the current profile-dossier snapshot flow/i,
  );
  assert.match(
    docsSection,
    /currently concrete helper responsibilities already evidenced for this seam are limited to:\s+returning an empty issue-index attachment result when `issueIndex` is not an array\s+preserving each existing issue entry while adding `related_reference_refs`\s+deriving the related reference refs through the bounded internal `deriveSWEBodelningIssueRelatedReferenceRefs\(\.\.\.\)` helper\s+asserting object-shaped `issueEntry`\s+asserting object-shaped `profileInputLaneSnapshot`\s+returning an empty related-reference-ref list when `issueEntry\.related_lane_keys` is not an array or `evidenceReferenceIndex` is not an array\s+iterating the already assembled `issueEntry\.related_lane_keys`\s+skipping missing, non-object, or array-shaped lane entries\s+collecting array-shaped `laneEntry\.supporting_reference_refs`, otherwise treating that lane's supporting-reference refs as empty\s+deduplicating candidate related-reference refs with the current `Set` accumulation\s+filtering already assembled `evidence_reference_index` entries against the collected reference refs and returning their `reference_ref` values/i,
  );
  assert.match(
    docsSection,
    /`deriveSWEBodelningIssueRelatedReferenceRefs\(\.\.\.\)` is included only as a bounded internal family member because current repo evidence shows it is unexported, called only by `attachSWEBodelningIssueRelatedReferenceRefs\(\.\.\.\)`, and owns only the issue-to-reference mapping needed by this attachment helper/i,
  );
  assert.match(
    docsSection,
    /relationship to profile-dossier snapshot construction is limited to `deriveSWEBodelningProfileDossierSnapshot\(\.\.\.\)` calling this helper once while assembling `snapshotWithRelatedReferenceRefs`/i,
  );
  assert.match(
    docsSection,
    /relationship to the already-frozen issue-related-section attachment helper seam is sibling-only and boundary-only because this helper enriches already assembled `issue_index` entries with `related_reference_refs`, not `related_section_refs`, and does not include `attachSWEBodelningIssueRelatedSectionRefs\(\.\.\.\)` or `deriveSWEBodelningIssueRelatedSectionRefs\(\.\.\.\)`/i,
  );
  assert.match(
    docsSection,
    /relationship to the issue-related-exhibit attachment helper seam is sibling-only and boundary-only because that helper enriches already assembled `issue_index` entries with `related_exhibit_refs`, not `related_reference_refs`, and is not included in this freeze/i,
  );
  assert.match(
    docsSection,
    /relationship to the already-frozen lane supporting-reference attachment seam is input-only and boundary-only because this attachment helper consumes already attached `profile_input_lane_snapshot\.\*\.supporting_reference_refs` and does not include `attachSWEBodelningLaneSupportingReferenceRefs\(\.\.\.\)` or derive lane supporting-reference refs/i,
  );
  assert.match(
    docsSection,
    /relationship to the already-frozen evidence-reference index helper seam is input-only and boundary-only because this attachment helper consumes already assembled `evidence_reference_index` entries and does not derive `REF-###` reference entries, evidence object ids, supporting lane keys, evidence-reference `related_issue_refs`, evidence-reference `related_section_refs`, or evidence-reference `related_exhibit_refs`/i,
  );
  assert.match(
    docsSection,
    /relationship to the already-frozen evidence-reference related-section and evidence-reference related-exhibit attachment seams is boundary-only because those helpers enrich already assembled `evidence_reference_index` entries while this helper enriches already assembled `issue_index` entries/i,
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
    /function deriveSWEBodelningIssueRelatedReferenceRefs\(\s*issueEntry,\s*profileInputLaneSnapshot,\s*evidenceReferenceIndex,\s*\) \{/,
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
    /if \(!Array\.isArray\(issueEntry\.related_lane_keys\) \|\| !Array\.isArray\(evidenceReferenceIndex\)\) \{\s*return \[\];\s*\}/,
  );
  assert.match(deriveSlice, /const relatedReferenceRefs = new Set\(\);/);
  assert.match(deriveSlice, /for \(const laneKey of issueEntry\.related_lane_keys\) \{/);
  assert.match(
    deriveSlice,
    /if \(!laneEntry \|\| typeof laneEntry !== "object" \|\| Array\.isArray\(laneEntry\)\) \{\s*continue;\s*\}/,
  );
  assert.match(
    deriveSlice,
    /const supportingReferenceRefs = Array\.isArray\(laneEntry\.supporting_reference_refs\)\s*\? laneEntry\.supporting_reference_refs\s*: \[\];/,
  );
  assert.match(
    deriveSlice,
    /for \(const referenceRef of supportingReferenceRefs\) \{\s*relatedReferenceRefs\.add\(referenceRef\);\s*\}/,
  );
  assert.match(
    deriveSlice,
    /return evidenceReferenceIndex\s*\.filter\(\(entry\) => relatedReferenceRefs\.has\(entry\.reference_ref\)\)\s*\.map\(\(entry\) => entry\.reference_ref\);/,
  );
  assert.doesNotMatch(deriveSlice, /attachSWEBodelningIssueRelatedReferenceRefs\(/);
  assert.doesNotMatch(deriveSlice, /deriveSWEBodelningIssueRelatedSectionRefs\(/);
  assert.doesNotMatch(deriveSlice, /attachSWEBodelningLaneSupportingReferenceRefs\(/);
  assert.doesNotMatch(deriveSlice, /deriveSWEBodelningProfileDossierEvidenceReferenceIndex\(/);
  assert.doesNotMatch(deriveSlice, /resolveSWEBodelningProfileDossierSnapshot\(/);
  assert.doesNotMatch(deriveSlice, /validateSWEBodelningProfileDossierSnapshot\(/);
  assert.doesNotMatch(deriveSlice, /deriveSWEBodelningExportPackage/);
  assert.doesNotMatch(deriveSlice, /getLatest|persist|refresh|route|response/i);

  assert.match(
    attachSlice,
    /function attachSWEBodelningIssueRelatedReferenceRefs\(\s*issueIndex,\s*profileInputLaneSnapshot,\s*evidenceReferenceIndex,\s*\) \{/,
  );
  assert.match(attachSlice, /if \(!Array\.isArray\(issueIndex\)\) \{\s*return \[\];\s*\}/);
  assert.match(
    attachSlice,
    /return issueIndex\.map\(\(entry\) => \(\{\s*\.\.\.entry,\s*related_reference_refs: deriveSWEBodelningIssueRelatedReferenceRefs\(\s*entry,\s*profileInputLaneSnapshot,\s*evidenceReferenceIndex,\s*\),\s*\}\)\);/,
  );
  assert.doesNotMatch(attachSlice, /attachSWEBodelningIssueRelatedSectionRefs\(/);
  assert.doesNotMatch(attachSlice, /deriveSWEBodelningIssueRelatedSectionRefs\(/);
  assert.doesNotMatch(attachSlice, /attachSWEBodelningIssueRelatedExhibitRefs\(/);
  assert.doesNotMatch(attachSlice, /deriveSWEBodelningIssueRelatedExhibitRefs\(/);
  assert.doesNotMatch(attachSlice, /attachSWEBodelningLaneSupportingReferenceRefs\(/);
  assert.doesNotMatch(attachSlice, /attachSWEBodelningLaneSupportingExhibitRefs\(/);
  assert.doesNotMatch(attachSlice, /deriveSWEBodelningProfileDossierEvidenceReferenceIndex\(/);
  assert.doesNotMatch(attachSlice, /resolveSWEBodelningProfileDossierSnapshot\(/);
  assert.doesNotMatch(attachSlice, /validateSWEBodelningProfileDossierSnapshot\(/);
  assert.doesNotMatch(attachSlice, /deriveSWEBodelningExportPackage/);
  assert.doesNotMatch(attachSlice, /getLatest|persist|refresh|route|response/i);

  assert.match(
    snapshotSlice,
    /const snapshotWithSupportingReferenceRefs = \{\s*\.\.\.snapshotWithEvidenceReferenceRelatedExhibitRefs,\s*profile_input_lane_snapshot: attachSWEBodelningLaneSupportingReferenceRefs\(\s*snapshotWithEvidenceReferenceRelatedExhibitRefs\.profile_input_lane_snapshot,\s*snapshotWithEvidenceReferenceRelatedExhibitRefs\.evidence_reference_index,\s*\),\s*\};/,
  );
  assert.match(
    snapshotSlice,
    /const snapshotWithRelatedReferenceRefs = \{\s*\.\.\.snapshotWithSupportingReferenceRefs,\s*issue_index: attachSWEBodelningIssueRelatedReferenceRefs\(\s*snapshotWithRelatedSectionRefs\.issue_index,\s*snapshotWithSupportingReferenceRefs\.profile_input_lane_snapshot,\s*snapshotWithEvidenceReferenceRelatedExhibitRefs\.evidence_reference_index,\s*\),\s*\};/,
  );
  assert.match(
    snapshotSlice,
    /const snapshotWithSupportingExhibitRefs = \{\s*\.\.\.snapshotWithRelatedReferenceRefs,\s*profile_input_lane_snapshot: attachSWEBodelningLaneSupportingExhibitRefs\(/,
  );
  assert.match(
    snapshotSlice,
    /const snapshotWithRelatedExhibitRefs = \{\s*\.\.\.snapshotWithSupportingExhibitRefs,\s*issue_index: attachSWEBodelningIssueRelatedExhibitRefs\(/,
  );

  assert.doesNotMatch(exportSlice, /^\s*attachSWEBodelningIssueRelatedReferenceRefs,\s*$/m);
  assert.doesNotMatch(exportSlice, /^\s*deriveSWEBodelningIssueRelatedReferenceRefs,\s*$/m);

  assert.deepEqual(
    collectLineMatches(governanceIndexText, /\battachSWEBodelningIssueRelatedReferenceRefs\b/),
    [
      1538,
      5023,
    ],
  );
  assert.deepEqual(
    collectLineMatches(governanceIndexText, /\bderiveSWEBodelningIssueRelatedReferenceRefs\b/),
    [
      1332,
      5034,
    ],
  );
  assert.doesNotMatch(apiIndexText, /attachSWEBodelningIssueRelatedReferenceRefs\(/);
  assert.doesNotMatch(databaseIndexText, /attachSWEBodelningIssueRelatedReferenceRefs\(/);
});
