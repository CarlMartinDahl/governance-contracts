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

test("docs freeze the shared governance profile-dossier section-related-reference helper seam as the section-to-reference attachment boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared Governance Profile Dossier Section-Related-Reference Attachment Helper Seam Freeze[\s\S]*?(?=\n### )/,
  );
  const helperStart = governanceIndexText.indexOf(
    "function attachSWEBodelningSectionRelatedReferenceRefs(",
  );
  const helperEnd = governanceIndexText.indexOf(
    "function attachSWEBodelningEvidenceReferenceRelatedSectionRefs(",
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
    "expected section-related-reference helper docs section",
  );
  assert.notEqual(helperStart, -1, "expected section-related-reference helper start");
  assert.notEqual(helperEnd, -1, "expected section-related-reference helper end");
  assert.notEqual(snapshotStart, -1, "expected snapshot construction start");
  assert.notEqual(snapshotEnd, -1, "expected snapshot construction end");
  assert.notEqual(exportStart, -1, "expected governance export surface");

  const docsSection = docsSectionMatch[0];
  const helperSlice = governanceIndexText.slice(helperStart, helperEnd);
  const snapshotSlice = governanceIndexText.slice(snapshotStart, snapshotEnd);
  const exportSlice = governanceIndexText.slice(exportStart);

  assert.match(
    docsSection,
    /Shared Governance Profile Dossier Section-Related-Reference Attachment Helper Seam Freeze/i,
  );
  assert.match(
    docsSection,
    /profile-dossier section-related-reference attachment helper `attachSWEBodelningSectionRelatedReferenceRefs` is the canonical governance-side `SWE_BODELNING` helper boundary for enriching already assembled profile-dossier `section_index` entries with `related_reference_refs` from already attached `section_index\.related_exhibit_refs`, already assembled `evidence_exhibit_index\.related_reference_refs`, and canonical `evidence_reference_index\.reference_ref` values/i,
  );
  assert.match(
    docsSection,
    /currently evidenced governed surface in this freeze is limited to:\s+additive deterministic `SWE_BODELNING` profile-dossier `section_index\.related_reference_refs` attachment from already assembled section entries, already attached section-to-exhibit refs, already assembled evidence-exhibit entries, and already assembled evidence-reference entries inside the current profile-dossier snapshot flow/i,
  );
  assert.match(
    docsSection,
    /currently concrete helper responsibilities already evidenced for this seam are limited to:\s+returning an empty section-index attachment result when `sectionIndex` is not an array\s+building the current exhibit-ref keyed related-reference-ref map from already assembled `evidenceExhibitIndex` entries when `evidenceExhibitIndex` is an array\s+treating exhibit entries without array-shaped `related_reference_refs` as empty related-reference input\s+deriving the current canonical reference-ref list from object-shaped entries in the already assembled `evidenceReferenceIndex`\s+preserving each existing section entry while adding `related_reference_refs`\s+deriving section `related_reference_refs` from canonical reference refs, already attached `section_index\.related_exhibit_refs`, and already assembled `evidence_exhibit_index\.related_reference_refs`/i,
  );
  assert.match(
    docsSection,
    /no bounded internal helper is included in this seam because current repo evidence shows `attachSWEBodelningSectionRelatedReferenceRefs\(\.\.\.\)` owns this section-to-reference attachment behavior directly with no helper delegated only for section related-reference-ref mapping/i,
  );
  assert.match(
    docsSection,
    /relationship to profile-dossier snapshot construction is limited to `deriveSWEBodelningProfileDossierSnapshot\(\.\.\.\)` calling this helper once while assembling `snapshotWithSectionRelatedReferenceRefs`/i,
  );
  assert.match(
    docsSection,
    /relationship to the already-frozen section-index helper seam is input-only and boundary-only because this attachment helper consumes already assembled `section_index` entries and does not derive `SEC-###` section entries/i,
  );
  assert.match(
    docsSection,
    /relationship to the already-frozen section-related-exhibit attachment seam is input-only and boundary-only because this helper consumes already attached `section_index\.related_exhibit_refs` and does not derive section-to-exhibit mappings/i,
  );
  assert.match(
    docsSection,
    /relationship to the already-frozen evidence-exhibit index helper seam is input-only and boundary-only because this attachment helper consumes already assembled `evidence_exhibit_index` entries and does not derive `EX-###` exhibit entries/i,
  );
  assert.match(
    docsSection,
    /relationship to the already-frozen evidence-reference index helper seam is input-only and boundary-only because this attachment helper consumes already assembled `evidence_reference_index` entries for canonical `reference_ref` values/i,
  );
  assert.match(
    docsSection,
    /relationship to evidence-exhibit related-section, lane related-section, and other related\/supporting attachment helpers is negative and separate/i,
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
    /function attachSWEBodelningSectionRelatedReferenceRefs\(\s*sectionIndex,\s*evidenceExhibitIndex,\s*evidenceReferenceIndex,\s*\) \{/,
  );
  assert.match(helperSlice, /if \(!Array\.isArray\(sectionIndex\)\) \{\s*return \[\];\s*\}/);
  assert.match(
    helperSlice,
    /const relatedReferenceRefsByExhibitRef = new Map\(\s*Array\.isArray\(evidenceExhibitIndex\)\s*\? evidenceExhibitIndex\.map\(\(entry\) => \[\s*entry\.exhibit_ref,\s*Array\.isArray\(entry\.related_reference_refs\)\s*\? entry\.related_reference_refs\s*: \[\],\s*\]\)\s*: \[\],\s*\);/,
  );
  assert.match(
    helperSlice,
    /const canonicalReferenceRefs = Array\.isArray\(evidenceReferenceIndex\)\s*\? evidenceReferenceIndex\s*\.filter\(\(entry\) => entry && typeof entry === "object"\)\s*\.map\(\(entry\) => entry\.reference_ref\)\s*: \[\];/,
  );
  assert.match(
    helperSlice,
    /return sectionIndex\.map\(\(entry\) => \(\{\s*\.\.\.entry,\s*related_reference_refs: canonicalReferenceRefs\.filter\(\(referenceRef\) =>\s*Array\.isArray\(entry\.related_exhibit_refs\) &&\s*entry\.related_exhibit_refs\.some\(\(exhibitRef\) =>\s*relatedReferenceRefsByExhibitRef\.get\(exhibitRef\)\?\.includes\(referenceRef\),\s*\),\s*\),\s*\}\)\);/,
  );
  assert.doesNotMatch(helperSlice, /attachSWEBodelningSectionRelatedExhibitRefs\(/);
  assert.doesNotMatch(helperSlice, /attachSWEBodelningEvidenceExhibitRelatedIssueRefs\(/);
  assert.doesNotMatch(helperSlice, /deriveSWEBodelningProfileDossierEvidenceExhibitIndex\(/);
  assert.doesNotMatch(helperSlice, /deriveSWEBodelningProfileDossierEvidenceReferenceIndex\(/);
  assert.doesNotMatch(helperSlice, /attachSWEBodelningSectionRelatedIssueRefs\(/);
  assert.doesNotMatch(helperSlice, /attachSWEBodelningSectionRelatedLaneKeys\(/);
  assert.doesNotMatch(helperSlice, /resolveSWEBodelningProfileDossierSnapshot\(/);
  assert.doesNotMatch(helperSlice, /validateSWEBodelningProfileDossierSnapshot\(/);
  assert.doesNotMatch(helperSlice, /deriveSWEBodelningExportPackage/);
  assert.doesNotMatch(helperSlice, /getLatest|persist|refresh|route|response/i);

  assert.match(
    snapshotSlice,
    /const snapshotWithSectionRelatedReferenceRefs = \{\s*\.\.\.snapshotWithSectionRelatedExhibitRefs,\s*section_index: attachSWEBodelningSectionRelatedReferenceRefs\(\s*snapshotWithSectionRelatedExhibitRefs\.section_index,\s*snapshotWithExhibitRelatedIssueRefs\.evidence_exhibit_index,\s*snapshotWithEvidenceReferenceRelatedExhibitRefs\.evidence_reference_index,\s*\),\s*\};/,
  );
  assert.match(
    snapshotSlice,
    /const snapshotWithExhibitRelatedSectionRefs = \{\s*\.\.\.snapshotWithSectionRelatedReferenceRefs,\s*evidence_exhibit_index: attachSWEBodelningEvidenceExhibitRelatedSectionRefs\(/,
  );

  assert.doesNotMatch(
    exportSlice,
    /^\s*attachSWEBodelningSectionRelatedReferenceRefs,\s*$/m,
  );

  assert.deepEqual(
    collectLineMatches(governanceIndexText, /\battachSWEBodelningSectionRelatedReferenceRefs\b/),
    [
      1583,
      5122,
    ],
  );
  assert.doesNotMatch(apiIndexText, /attachSWEBodelningSectionRelatedReferenceRefs\(/);
  assert.doesNotMatch(databaseIndexText, /attachSWEBodelningSectionRelatedReferenceRefs\(/);
});
