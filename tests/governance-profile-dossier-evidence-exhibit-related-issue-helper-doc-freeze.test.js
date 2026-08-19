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

test("docs freeze the shared governance profile-dossier evidence-exhibit related-issue helper seam as the exhibit-to-issue attachment boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared Governance Profile Dossier Evidence-Exhibit Related-Issue Attachment Helper Seam Freeze[\s\S]*?(?=\n### )/,
  );
  const helperStart = governanceIndexText.indexOf(
    "function attachSWEBodelningEvidenceExhibitRelatedIssueRefs(",
  );
  const helperEnd = governanceIndexText.indexOf(
    "function attachSWEBodelningEvidenceExhibitRelatedSectionRefs(",
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
    "expected evidence-exhibit related-issue helper docs section",
  );
  assert.notEqual(helperStart, -1, "expected evidence-exhibit helper start");
  assert.notEqual(helperEnd, -1, "expected evidence-exhibit helper end");
  assert.notEqual(snapshotStart, -1, "expected snapshot construction start");
  assert.notEqual(snapshotEnd, -1, "expected snapshot construction end");
  assert.notEqual(exportStart, -1, "expected governance export surface");

  const docsSection = docsSectionMatch[0];
  const helperSlice = governanceIndexText.slice(helperStart, helperEnd);
  const snapshotSlice = governanceIndexText.slice(snapshotStart, snapshotEnd);
  const exportSlice = governanceIndexText.slice(exportStart);

  assert.match(
    docsSection,
    /Shared Governance Profile Dossier Evidence-Exhibit Related-Issue Attachment Helper Seam Freeze/i,
  );
  assert.match(
    docsSection,
    /profile-dossier evidence-exhibit related-issue attachment helper `attachSWEBodelningEvidenceExhibitRelatedIssueRefs` is the canonical governance-side `SWE_BODELNING` helper boundary for enriching already assembled profile-dossier `evidence_exhibit_index` entries with `related_issue_refs` from already assembled `issue_index\.related_exhibit_refs` and `issue_index\.issue_ref` values/i,
  );
  assert.match(
    docsSection,
    /currently evidenced governed surface in this freeze is limited to:\s+additive deterministic `SWE_BODELNING` profile-dossier `evidence_exhibit_index\.related_issue_refs` attachment from already assembled evidence-exhibit entries and already assembled issue entries inside the current profile-dossier snapshot flow/i,
  );
  assert.match(
    docsSection,
    /currently concrete helper responsibilities already evidenced for this seam are limited to:\s+returning an empty evidence-exhibit-index attachment result when `evidenceExhibitIndex` is not an array\s+initializing the current exhibit-ref keyed related-issue-ref map from already assembled evidence-exhibit entries\s+treating non-array `issueIndex` input as an empty issue entry list\s+consuming only issue entries with string `issue_ref` and array-shaped `related_exhibit_refs`\s+skipping exhibit refs outside the current exhibit-ref map\s+deduplicating issue refs per exhibit ref with the current array membership check\s+preserving each existing evidence-exhibit entry while adding `related_issue_refs`\s+deriving evidence-exhibit `related_issue_refs` from already assembled `issue_index\.related_exhibit_refs` and `issue_index\.issue_ref` values/i,
  );
  assert.match(
    docsSection,
    /no bounded internal helper is included in this seam because current repo evidence shows `attachSWEBodelningEvidenceExhibitRelatedIssueRefs\(\.\.\.\)` owns this exhibit-to-issue attachment behavior directly with no helper delegated only for evidence-exhibit related-issue-ref mapping/i,
  );
  assert.match(
    docsSection,
    /relationship to profile-dossier snapshot construction is limited to `deriveSWEBodelningProfileDossierSnapshot\(\.\.\.\)` calling this helper once while assembling `snapshotWithExhibitRelatedIssueRefs`/i,
  );
  assert.match(
    docsSection,
    /relationship to the already-frozen evidence-exhibit index helper seam is input-only and boundary-only because this attachment helper consumes already assembled `evidence_exhibit_index` entries and does not derive `EX-###` exhibit entries/i,
  );
  assert.match(
    docsSection,
    /relationship to the already-frozen issue-related-exhibit attachment helper seam is input-only and boundary-only because this helper consumes already attached `issue_index\.related_exhibit_refs` and does not derive issue-to-exhibit mappings/i,
  );
  assert.match(
    docsSection,
    /relationship to the already-frozen lane-related-issue, lane supporting-reference, lane supporting-exhibit, issue-related-reference, issue-related-section, evidence-reference index, evidence-reference related-section, evidence-reference related-exhibit, section-related-exhibit, section-related-lane, section-related-issue, section-index, canonical-source, fingerprint, snapshot\/status\/attach\/projection helper seams and release-eval profile-dossier helper seams is boundary-only/i,
  );
  assert.match(
    docsSection,
    /relationship to evidence-exhibit related-section, section-related-reference, lane related-section, and other related\/supporting attachment helpers is negative and separate/i,
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
    /function attachSWEBodelningEvidenceExhibitRelatedIssueRefs\(\s*evidenceExhibitIndex,\s*issueIndex,\s*\) \{/,
  );
  assert.match(
    helperSlice,
    /if \(!Array\.isArray\(evidenceExhibitIndex\)\) \{\s*return \[\];\s*\}/,
  );
  assert.match(
    helperSlice,
    /const relatedIssueRefsByExhibitRef = new Map\(\s*evidenceExhibitIndex\.map\(\(entry\) => \[entry\.exhibit_ref, \[\]\]\),\s*\);/,
  );
  assert.match(helperSlice, /if \(Array\.isArray\(issueIndex\)\) \{/);
  assert.match(
    helperSlice,
    /typeof issueEntry\?\.issue_ref !== "string" \|\|\s*!Array\.isArray\(issueEntry\.related_exhibit_refs\)/,
  );
  assert.match(helperSlice, /for \(const exhibitRef of issueEntry\.related_exhibit_refs\) \{/);
  assert.match(
    helperSlice,
    /if \(!relatedIssueRefsByExhibitRef\.has\(exhibitRef\)\) \{\s*continue;\s*\}/,
  );
  assert.match(
    helperSlice,
    /if \(!relatedIssueRefs\.includes\(issueEntry\.issue_ref\)\) \{\s*relatedIssueRefs\.push\(issueEntry\.issue_ref\);\s*\}/,
  );
  assert.match(
    helperSlice,
    /return evidenceExhibitIndex\.map\(\(entry\) => \(\{\s*\.\.\.entry,\s*related_issue_refs: relatedIssueRefsByExhibitRef\.get\(entry\.exhibit_ref\) \?\? \[\],\s*\}\)\);/,
  );
  assert.doesNotMatch(helperSlice, /attachSWEBodelningEvidenceExhibitRelatedSectionRefs\(/);
  assert.doesNotMatch(helperSlice, /attachSWEBodelningIssueRelatedExhibitRefs\(/);
  assert.doesNotMatch(helperSlice, /deriveSWEBodelningIssueRelatedExhibitRefs\(/);
  assert.doesNotMatch(helperSlice, /deriveSWEBodelningProfileDossierEvidenceExhibitIndex\(/);
  assert.doesNotMatch(helperSlice, /attachSWEBodelningLaneRelatedIssueRefs\(/);
  assert.doesNotMatch(helperSlice, /resolveSWEBodelningProfileDossierSnapshot\(/);
  assert.doesNotMatch(helperSlice, /validateSWEBodelningProfileDossierSnapshot\(/);
  assert.doesNotMatch(helperSlice, /deriveSWEBodelningExportPackage/);
  assert.doesNotMatch(helperSlice, /getLatest|persist|refresh|route|response/i);

  assert.match(
    snapshotSlice,
    /const snapshotWithExhibitRelatedIssueRefs = \{\s*\.\.\.snapshotWithLaneRelatedIssueRefs,\s*evidence_exhibit_index: attachSWEBodelningEvidenceExhibitRelatedIssueRefs\(\s*snapshotWithSupportingExhibitRefs\.evidence_exhibit_index,\s*snapshotWithRelatedExhibitRefs\.issue_index,\s*\),\s*\};/,
  );
  assert.match(
    snapshotSlice,
    /const snapshotWithSectionRelatedExhibitRefs = \{\s*\.\.\.snapshotWithExhibitRelatedIssueRefs,\s*section_index: attachSWEBodelningSectionRelatedExhibitRefs\(/,
  );

  assert.doesNotMatch(
    exportSlice,
    /^\s*attachSWEBodelningEvidenceExhibitRelatedIssueRefs,\s*$/m,
  );

  assert.deepEqual(
    collectLineMatches(
      governanceIndexText,
      /\battachSWEBodelningEvidenceExhibitRelatedIssueRefs\b/,
    ),
    [
      1568,
      5042,
    ],
  );
  assert.doesNotMatch(apiIndexText, /attachSWEBodelningEvidenceExhibitRelatedIssueRefs\(/);
  assert.doesNotMatch(
    databaseIndexText,
    /attachSWEBodelningEvidenceExhibitRelatedIssueRefs\(/,
  );
});
