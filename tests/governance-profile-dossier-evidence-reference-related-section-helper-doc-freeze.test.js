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

test("docs freeze the shared governance profile-dossier evidence-reference related-section helper seam as the evidence-reference-to-section attachment boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared Governance Profile Dossier Evidence-Reference Related-Section Attachment Helper Seam Freeze[\s\S]*?(?=\n### )/,
  );
  const helperStart = governanceIndexText.indexOf(
    "function attachSWEBodelningEvidenceReferenceRelatedSectionRefs(",
  );
  const helperEnd = governanceIndexText.indexOf(
    "function attachSWEBodelningEvidenceReferenceRelatedExhibitRefs(",
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
    "expected evidence-reference related-section helper docs section",
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
    /Shared Governance Profile Dossier Evidence-Reference Related-Section Attachment Helper Seam Freeze/i,
  );
  assert.match(
    docsSection,
    /profile-dossier evidence-reference related-section attachment helper `attachSWEBodelningEvidenceReferenceRelatedSectionRefs` is the canonical governance-side `SWE_BODELNING` helper boundary for enriching already assembled profile-dossier `evidence_reference_index` entries with `related_section_refs` from already assembled `evidence_reference_index\.related_issue_refs`, already assembled `issue_index\.related_section_refs`, and canonical `section_index\.section_ref` values/i,
  );
  assert.match(
    docsSection,
    /currently evidenced governed surface in this freeze is limited to:\s+additive deterministic `SWE_BODELNING` profile-dossier `evidence_reference_index\.related_section_refs` attachment from already assembled evidence-reference entries, already assembled evidence-reference-to-issue refs, already assembled issue-to-section refs, and already assembled section entries inside the current profile-dossier snapshot flow/i,
  );
  assert.match(
    docsSection,
    /currently concrete helper responsibilities already evidenced for this seam are limited to:\s+returning an empty evidence-reference-index attachment result when `evidenceReferenceIndex` is not an array\s+building the current issue-ref keyed related-section map from already assembled `issueIndex` entries when `issueIndex` is an array\s+treating issue entries without array-shaped `related_section_refs` as empty related-section input\s+deriving the current canonical section-ref set from entries in the already assembled `sectionIndex` that carry string `section_ref` values\s+preserving each existing evidence-reference entry while adding `related_section_refs`\s+deriving evidence-reference `related_section_refs` from canonical section refs, already assembled `evidence_reference_index\.related_issue_refs`, and already assembled `issue_index\.related_section_refs`/i,
  );
  assert.match(
    docsSection,
    /no bounded internal helper is included in this seam because current repo evidence shows `attachSWEBodelningEvidenceReferenceRelatedSectionRefs\(\.\.\.\)` owns this evidence-reference-to-section attachment behavior directly with no helper delegated only for evidence-reference related-section-ref mapping/i,
  );
  assert.match(
    docsSection,
    /relationship to profile-dossier snapshot construction is limited to `deriveSWEBodelningProfileDossierSnapshot\(\.\.\.\)` calling this helper once while assembling `snapshotWithEvidenceReferenceRelatedSectionRefs`/i,
  );
  assert.match(
    docsSection,
    /relationship to the already-frozen evidence-reference index helper seam is input-only and boundary-only because this attachment helper consumes already assembled `evidence_reference_index` entries and does not derive `REF-###` reference entries, evidence object ids, supporting lane keys, or evidence-reference `related_issue_refs`/i,
  );
  assert.match(
    docsSection,
    /relationship to the already-frozen section-index helper seam is input-only and boundary-only because this attachment helper consumes already assembled `section_index` entries for their canonical `section_ref` values/i,
  );
  assert.match(
    docsSection,
    /relationship to the already-frozen issue-index helper seam is input-only and boundary-only because this attachment helper consumes already assembled issue entries carrying `related_section_refs` and does not derive `ISS-###` issue entries/i,
  );
  assert.match(
    docsSection,
    /relationship to the already-frozen issue-related-section attachment seam is input-only and boundary-only because this helper consumes already attached `issue_index\.related_section_refs` and does not derive issue-to-section mappings or include `attachSWEBodelningIssueRelatedSectionRefs\(\.\.\.\)` \/ `deriveSWEBodelningIssueRelatedSectionRefs\(\.\.\.\)`/i,
  );
  assert.match(
    docsSection,
    /relationship to the already-frozen section-related-issue, section-related-lane, and section-related-exhibit attachment seams is boundary-only because those helpers enrich already assembled `section_index` entries while this helper enriches already assembled `evidence_reference_index` entries/i,
  );
  assert.match(
    docsSection,
    /relationship to evidence-reference related-exhibit, issue-related-reference, issue-related-exhibit, section-related-reference, evidence-exhibit attachment, and lane attachment helpers is negative and separate/i,
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
    /function attachSWEBodelningEvidenceReferenceRelatedSectionRefs\(\s*evidenceReferenceIndex,\s*issueIndex,\s*sectionIndex,\s*\) \{/,
  );
  assert.match(
    helperSlice,
    /if \(!Array\.isArray\(evidenceReferenceIndex\)\) \{\s*return \[\];\s*\}/,
  );
  assert.match(
    helperSlice,
    /const relatedSectionRefsByIssueRef = new Map\(\s*Array\.isArray\(issueIndex\)\s*\? issueIndex\s*\.filter\(\(entry\) => entry && typeof entry === "object"\)\s*\.map\(\(entry\) => \[\s*entry\.issue_ref,\s*Array\.isArray\(entry\.related_section_refs\) \? entry\.related_section_refs : \[\],\s*\]\)\s*: \[\],\s*\);/,
  );
  assert.match(
    helperSlice,
    /const canonicalSectionRefs = Array\.isArray\(sectionIndex\)\s*\? sectionIndex\s*\.filter\(\(entry\) => entry && typeof entry\.section_ref === "string"\)\s*\.map\(\(entry\) => entry\.section_ref\)\s*: \[\];/,
  );
  assert.match(
    helperSlice,
    /return evidenceReferenceIndex\.map\(\(entry\) => \(\{\s*\.\.\.entry,\s*related_section_refs: canonicalSectionRefs\.filter\(\(sectionRef\) =>\s*Array\.isArray\(entry\.related_issue_refs\) &&\s*entry\.related_issue_refs\.some\(\(issueRef\) =>\s*relatedSectionRefsByIssueRef\.get\(issueRef\)\?\.includes\(sectionRef\),\s*\),\s*\),\s*\}\)\);/,
  );
  assert.doesNotMatch(helperSlice, /deriveSWEBodelningProfileDossierEvidenceReferenceIndex\(/);
  assert.doesNotMatch(helperSlice, /deriveSWEBodelningProfileDossierEvidenceExhibitIndex\(/);
  assert.doesNotMatch(helperSlice, /deriveSWEBodelningProfileDossierIssueIndex\(/);
  assert.doesNotMatch(helperSlice, /deriveSWEBodelningProfileDossierSectionIndex\(/);
  assert.doesNotMatch(helperSlice, /attachSWEBodelningIssueRelatedSectionRefs\(/);
  assert.doesNotMatch(helperSlice, /deriveSWEBodelningIssueRelatedSectionRefs\(/);
  assert.doesNotMatch(helperSlice, /attachSWEBodelningSectionRelatedIssueRefs\(/);
  assert.doesNotMatch(helperSlice, /attachSWEBodelningSectionRelatedLaneKeys\(/);
  assert.doesNotMatch(helperSlice, /attachSWEBodelningSectionRelatedExhibitRefs\(/);
  assert.doesNotMatch(helperSlice, /attachSWEBodelningEvidenceReferenceRelatedExhibitRefs\(/);
  assert.doesNotMatch(helperSlice, /resolveSWEBodelningProfileDossierSnapshot\(/);
  assert.doesNotMatch(helperSlice, /validateSWEBodelningProfileDossierSnapshot\(/);
  assert.doesNotMatch(helperSlice, /deriveSWEBodelningExportPackage/);
  assert.doesNotMatch(helperSlice, /getLatest|persist|refresh|route|response/i);

  assert.match(
    snapshotSlice,
    /const snapshotWithEvidenceReferenceRelatedSectionRefs = \{\s*\.\.\.snapshotWithEvidenceReferenceIndex,\s*evidence_reference_index: attachSWEBodelningEvidenceReferenceRelatedSectionRefs\(\s*snapshotWithEvidenceReferenceIndex\.evidence_reference_index,\s*snapshotWithEvidenceReferenceIndex\.issue_index,\s*snapshotWithEvidenceReferenceIndex\.section_index,\s*\),\s*\};/,
  );
  assert.match(
    snapshotSlice,
    /const snapshotWithEvidenceExhibitIndex = \{\s*\.\.\.snapshotWithEvidenceReferenceRelatedSectionRefs,\s*evidence_exhibit_index: deriveSWEBodelningProfileDossierEvidenceExhibitIndex\(/,
  );

  assert.doesNotMatch(
    exportSlice,
    /^\s*attachSWEBodelningEvidenceReferenceRelatedSectionRefs,\s*$/m,
  );

  assert.deepEqual(
    collectLineMatches(
      governanceIndexText,
      /\battachSWEBodelningEvidenceReferenceRelatedSectionRefs\b/,
    ),
    [
      1510,
      5158,
    ],
  );
  assert.doesNotMatch(
    apiIndexText,
    /attachSWEBodelningEvidenceReferenceRelatedSectionRefs\(/,
  );
  assert.doesNotMatch(
    databaseIndexText,
    /attachSWEBodelningEvidenceReferenceRelatedSectionRefs\(/,
  );
});
