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

test("docs freeze the shared governance profile-dossier evidence-reference related-exhibit helper seam as the evidence-reference-to-exhibit attachment boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared Governance Profile Dossier Evidence-Reference Related-Exhibit Attachment Helper Seam Freeze[\s\S]*?(?=\n### )/,
  );
  const helperStart = governanceIndexText.indexOf(
    "function attachSWEBodelningEvidenceReferenceRelatedExhibitRefs(",
  );
  const helperEnd = governanceIndexText.indexOf(
    "function attachSWEBodelningSectionRelatedIssueRefs(",
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
    "expected evidence-reference related-exhibit helper docs section",
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
    /Shared Governance Profile Dossier Evidence-Reference Related-Exhibit Attachment Helper Seam Freeze/i,
  );
  assert.match(
    docsSection,
    /profile-dossier evidence-reference related-exhibit attachment helper `attachSWEBodelningEvidenceReferenceRelatedExhibitRefs` is the canonical governance-side `SWE_BODELNING` helper boundary for enriching already assembled profile-dossier `evidence_reference_index` entries with `related_exhibit_refs` from already assembled `evidence_reference_index\.evidence_object_id` values and already assembled `evidence_exhibit_index` entries/i,
  );
  assert.match(
    docsSection,
    /currently evidenced governed surface in this freeze is limited to:\s+additive deterministic `SWE_BODELNING` profile-dossier `evidence_reference_index\.related_exhibit_refs` attachment from already assembled evidence-reference entries and already assembled evidence-exhibit entries inside the current profile-dossier snapshot flow/i,
  );
  assert.match(
    docsSection,
    /currently concrete helper responsibilities already evidenced for this seam are limited to:\s+returning an empty evidence-reference-index attachment result when `evidenceReferenceIndex` is not an array\s+building the current evidence-object-id keyed related-exhibit-ref map from already assembled `evidenceReferenceIndex` entries\s+consuming already assembled `evidenceExhibitIndex` entries only when `evidenceExhibitIndex` is an array\s+ignoring exhibit entries without string `exhibit_ref`, without string `evidence_object_id`, or whose `evidence_object_id` is not present in the current evidence-reference map\s+deduplicating exhibit refs per evidence object id\s+preserving each existing evidence-reference entry while adding `related_exhibit_refs`\s+deriving evidence-reference `related_exhibit_refs` from already assembled `evidence_reference_index\.evidence_object_id`, already assembled `evidence_exhibit_index\.evidence_object_id`, and already assembled `evidence_exhibit_index\.exhibit_ref`/i,
  );
  assert.match(
    docsSection,
    /no bounded internal helper is included in this seam because current repo evidence shows `attachSWEBodelningEvidenceReferenceRelatedExhibitRefs\(\.\.\.\)` owns this evidence-reference-to-exhibit attachment behavior directly with no helper delegated only for evidence-reference related-exhibit-ref mapping/i,
  );
  assert.match(
    docsSection,
    /relationship to profile-dossier snapshot construction is limited to `deriveSWEBodelningProfileDossierSnapshot\(\.\.\.\)` calling this helper once while assembling `snapshotWithEvidenceReferenceRelatedExhibitRefs`/i,
  );
  assert.match(
    docsSection,
    /relationship to the already-frozen evidence-reference index helper seam is input-only and boundary-only because this attachment helper consumes already assembled `evidence_reference_index` entries and does not derive `REF-###` reference entries, evidence object ids, supporting lane keys, or evidence-reference `related_issue_refs` \/ `related_section_refs`/i,
  );
  assert.match(
    docsSection,
    /relationship to the already-frozen evidence-exhibit index helper seam is input-only and boundary-only because this attachment helper consumes already assembled `evidence_exhibit_index` entries and does not derive `EX-###` exhibit entries/i,
  );
  assert.match(
    docsSection,
    /relationship to the already-frozen evidence-reference related-section attachment seam is sibling-only and boundary-only because both helpers enrich already assembled `evidence_reference_index` entries but this helper does not derive evidence-reference-to-section mappings or include `attachSWEBodelningEvidenceReferenceRelatedSectionRefs\(\.\.\.\)`/i,
  );
  assert.match(
    docsSection,
    /relationship to the already-frozen section-related-exhibit attachment seam is boundary-only because that helper enriches already assembled `section_index` entries while this helper enriches already assembled `evidence_reference_index` entries and does not include `attachSWEBodelningSectionRelatedExhibitRefs\(\.\.\.\)`/i,
  );
  assert.match(
    docsSection,
    /relationship to the already-frozen section-index and issue-index helper seams is boundary-only because this attachment helper consumes neither section-index nor issue-index derivation ownership and does not derive `SEC-###` section entries or `ISS-###` issue entries/i,
  );
  assert.match(
    docsSection,
    /relationship to issue-related-reference, issue-related-exhibit, section-related-reference, evidence-exhibit attachment, and lane attachment helpers is negative and separate/i,
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
    /function attachSWEBodelningEvidenceReferenceRelatedExhibitRefs\(\s*evidenceReferenceIndex,\s*evidenceExhibitIndex,\s*\) \{/,
  );
  assert.match(
    helperSlice,
    /if \(!Array\.isArray\(evidenceReferenceIndex\)\) \{\s*return \[\];\s*\}/,
  );
  assert.match(
    helperSlice,
    /const relatedExhibitRefsByEvidenceObjectId = new Map\(\s*evidenceReferenceIndex\.map\(\(entry\) => \[entry\.evidence_object_id, \[\]\]\),\s*\);/,
  );
  assert.match(
    helperSlice,
    /if \(Array\.isArray\(evidenceExhibitIndex\)\) \{\s*for \(const exhibitEntry of evidenceExhibitIndex\) \{/,
  );
  assert.match(
    helperSlice,
    /typeof exhibitEntry\?\.exhibit_ref !== "string" \|\|\s*typeof exhibitEntry\.evidence_object_id !== "string" \|\|\s*!relatedExhibitRefsByEvidenceObjectId\.has\(exhibitEntry\.evidence_object_id\)/,
  );
  assert.match(
    helperSlice,
    /if \(!relatedExhibitRefs\.includes\(exhibitEntry\.exhibit_ref\)\) \{\s*relatedExhibitRefs\.push\(exhibitEntry\.exhibit_ref\);\s*\}/,
  );
  assert.match(
    helperSlice,
    /return evidenceReferenceIndex\.map\(\(entry\) => \(\{\s*\.\.\.entry,\s*related_exhibit_refs:\s*relatedExhibitRefsByEvidenceObjectId\.get\(entry\.evidence_object_id\) \?\? \[\],\s*\}\)\);/,
  );
  assert.doesNotMatch(helperSlice, /attachSWEBodelningEvidenceReferenceRelatedSectionRefs\(/);
  assert.doesNotMatch(helperSlice, /deriveSWEBodelningProfileDossierEvidenceReferenceIndex\(/);
  assert.doesNotMatch(helperSlice, /deriveSWEBodelningProfileDossierEvidenceExhibitIndex\(/);
  assert.doesNotMatch(helperSlice, /attachSWEBodelningSectionRelatedExhibitRefs\(/);
  assert.doesNotMatch(helperSlice, /deriveSWEBodelningProfileDossierIssueIndex\(/);
  assert.doesNotMatch(helperSlice, /deriveSWEBodelningProfileDossierSectionIndex\(/);
  assert.doesNotMatch(helperSlice, /attachSWEBodelningIssueRelatedSectionRefs\(/);
  assert.doesNotMatch(helperSlice, /deriveSWEBodelningIssueRelatedSectionRefs\(/);
  assert.doesNotMatch(helperSlice, /attachSWEBodelningSectionRelatedIssueRefs\(/);
  assert.doesNotMatch(helperSlice, /attachSWEBodelningSectionRelatedLaneKeys\(/);
  assert.doesNotMatch(helperSlice, /resolveSWEBodelningProfileDossierSnapshot\(/);
  assert.doesNotMatch(helperSlice, /validateSWEBodelningProfileDossierSnapshot\(/);
  assert.doesNotMatch(helperSlice, /deriveSWEBodelningExportPackage/);
  assert.doesNotMatch(helperSlice, /getLatest|persist|refresh|route|response/i);

  assert.match(
    snapshotSlice,
    /const snapshotWithEvidenceReferenceRelatedExhibitRefs = \{\s*\.\.\.snapshotWithEvidenceExhibitIndex,\s*evidence_reference_index: attachSWEBodelningEvidenceReferenceRelatedExhibitRefs\(\s*snapshotWithEvidenceReferenceRelatedSectionRefs\.evidence_reference_index,\s*snapshotWithEvidenceExhibitIndex\.evidence_exhibit_index,\s*\),\s*\};/,
  );
  assert.match(
    snapshotSlice,
    /const snapshotWithSupportingReferenceRefs = \{\s*\.\.\.snapshotWithEvidenceReferenceRelatedExhibitRefs,\s*profile_input_lane_snapshot: attachSWEBodelningLaneSupportingReferenceRefs\(/,
  );

  assert.doesNotMatch(
    exportSlice,
    /^\s*attachSWEBodelningEvidenceReferenceRelatedExhibitRefs,\s*$/m,
  );

  assert.deepEqual(
    collectLineMatches(
      governanceIndexText,
      /\battachSWEBodelningEvidenceReferenceRelatedExhibitRefs\b/,
    ),
    [
      1524,
      5194,
    ],
  );
  assert.doesNotMatch(
    apiIndexText,
    /attachSWEBodelningEvidenceReferenceRelatedExhibitRefs\(/,
  );
  assert.doesNotMatch(
    databaseIndexText,
    /attachSWEBodelningEvidenceReferenceRelatedExhibitRefs\(/,
  );
});
