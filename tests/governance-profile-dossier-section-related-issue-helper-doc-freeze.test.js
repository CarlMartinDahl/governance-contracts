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

test("docs freeze the shared governance profile-dossier section-related-issue helper seam as the section-to-issue attachment boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared Governance Profile Dossier Section-Related-Issue Attachment Helper Seam Freeze[\s\S]*?(?=\n### )/,
  );
  const helperStart = governanceIndexText.indexOf(
    "function attachSWEBodelningSectionRelatedIssueRefs(",
  );
  const helperEnd = governanceIndexText.indexOf(
    "function attachSWEBodelningSectionRelatedLaneKeys(",
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
    "expected section-related-issue helper docs section",
  );
  assert.notEqual(
    helperStart,
    -1,
    "expected section-related-issue helper definition start",
  );
  assert.notEqual(
    helperEnd,
    -1,
    "expected section-related-issue helper definition end",
  );
  assert.notEqual(snapshotStart, -1, "expected snapshot construction start");
  assert.notEqual(snapshotEnd, -1, "expected snapshot construction end");
  assert.notEqual(exportStart, -1, "expected governance export surface");

  const docsSection = docsSectionMatch[0];
  const helperSlice = governanceIndexText.slice(helperStart, helperEnd);
  const snapshotSlice = governanceIndexText.slice(snapshotStart, snapshotEnd);
  const exportSlice = governanceIndexText.slice(exportStart);

  assert.match(
    docsSection,
    /Shared Governance Profile Dossier Section-Related-Issue Attachment Helper Seam Freeze/i,
  );
  assert.match(
    docsSection,
    /profile-dossier section-related-issue attachment helper `attachSWEBodelningSectionRelatedIssueRefs` is the canonical governance-side `SWE_BODELNING` helper boundary for enriching already assembled profile-dossier `section_index` entries with `related_issue_refs` from already assembled `issue_index\.related_section_refs`/i,
  );
  assert.match(
    docsSection,
    /currently evidenced governed surface in this freeze is limited to:\s+additive deterministic `SWE_BODELNING` profile-dossier `section_index\.related_issue_refs` attachment from already assembled section entries and already assembled issue-to-section links inside the current profile-dossier snapshot flow/i,
  );
  assert.match(
    docsSection,
    /currently concrete helper responsibilities already evidenced for this seam are limited to:\s+returning an empty section-index attachment result when `sectionIndex` is not an array\s+building the current section-ref keyed accumulator from already assembled `sectionIndex` entries\s+reading already assembled issue entries only when `issueIndex` is an array\s+ignoring issue entries whose `related_section_refs` is not an array\s+mapping each issue entry's `issue_ref` into the matching section accumulator for each already assembled `related_section_refs` value that exists in the current section map\s+deduplicating issue refs per section by preserving only first occurrence in current iteration order\s+preserving each existing section entry while adding `related_issue_refs`/i,
  );
  assert.match(
    docsSection,
    /no bounded internal helper is included in this seam because current repo evidence shows `attachSWEBodelningSectionRelatedIssueRefs\(\.\.\.\)` owns this section-to-issue attachment behavior directly with no helper delegated only for section-related issue-ref mapping/i,
  );
  assert.match(
    docsSection,
    /relationship to profile-dossier snapshot construction is limited to `deriveSWEBodelningProfileDossierSnapshot\(\.\.\.\)` calling this helper once while assembling `snapshotWithRelatedIssueRefs`/i,
  );
  assert.match(
    docsSection,
    /relationship to the already-frozen section-index helper seam is input-only and boundary-only because this attachment helper consumes already assembled `section_index` entries and does not derive `SEC-###` section entries, section keys, section order, or section presence/i,
  );
  assert.match(
    docsSection,
    /relationship to the already-frozen issue-index helper seam is input-only and boundary-only because this attachment helper consumes already assembled issue entries and does not derive `ISS-###` issue entries, issue codes, blocking flags, or related lane keys/i,
  );
  assert.match(
    docsSection,
    /relationship to the already-frozen issue-related-section attachment seam is input-only and boundary-only because this section-related-issue helper consumes already assembled `issue_index\.related_section_refs` and does not derive issue-to-section mappings or include `attachSWEBodelningIssueRelatedSectionRefs\(\.\.\.\)` \/ `deriveSWEBodelningIssueRelatedSectionRefs\(\.\.\.\)`/i,
  );
  assert.match(
    docsSection,
    /relationship to section-related-lane, section-related-reference, section-related-exhibit, issue-related-reference, issue-related-exhibit, evidence-reference\/exhibit, and lane attachment helpers is negative and separate/i,
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
    /function attachSWEBodelningSectionRelatedIssueRefs\(sectionIndex, issueIndex\) \{/,
  );
  assert.match(
    helperSlice,
    /if \(!Array\.isArray\(sectionIndex\)\) \{\s*return \[\];\s*\}/,
  );
  assert.match(
    helperSlice,
    /const relatedIssueRefsBySectionRef = new Map\(\s*sectionIndex\.map\(\(entry\) => \[entry\.section_ref, \[\]\]\),\s*\);/,
  );
  assert.match(helperSlice, /if \(Array\.isArray\(issueIndex\)\) \{/);
  assert.match(helperSlice, /for \(const issueEntry of issueIndex\) \{/);
  assert.match(
    helperSlice,
    /if \(!Array\.isArray\(issueEntry\.related_section_refs\)\) \{\s*continue;\s*\}/,
  );
  assert.match(
    helperSlice,
    /for \(const sectionRef of issueEntry\.related_section_refs\) \{/,
  );
  assert.match(
    helperSlice,
    /if \(!relatedIssueRefsBySectionRef\.has\(sectionRef\)\) \{\s*continue;\s*\}/,
  );
  assert.match(
    helperSlice,
    /const relatedIssueRefs = relatedIssueRefsBySectionRef\.get\(sectionRef\);\s*if \(!relatedIssueRefs\.includes\(issueEntry\.issue_ref\)\) \{\s*relatedIssueRefs\.push\(issueEntry\.issue_ref\);\s*\}/,
  );
  assert.match(
    helperSlice,
    /return sectionIndex\.map\(\(entry\) => \(\{\s*\.\.\.entry,\s*related_issue_refs: relatedIssueRefsBySectionRef\.get\(entry\.section_ref\) \?\? \[\],\s*\}\)\);/,
  );
  assert.doesNotMatch(helperSlice, /attachSWEBodelningIssueRelatedSectionRefs\(/);
  assert.doesNotMatch(helperSlice, /deriveSWEBodelningIssueRelatedSectionRefs\(/);
  assert.doesNotMatch(helperSlice, /deriveSWEBodelningProfileDossierIssueIndex\(/);
  assert.doesNotMatch(helperSlice, /deriveSWEBodelningProfileDossierSectionIndex\(/);
  assert.doesNotMatch(helperSlice, /attachSWEBodelningSectionRelatedLaneKeys\(/);
  assert.doesNotMatch(helperSlice, /attachSWEBodelningSectionRelatedReferenceRefs\(/);
  assert.doesNotMatch(helperSlice, /attachSWEBodelningSectionRelatedExhibitRefs\(/);
  assert.doesNotMatch(helperSlice, /attachSWEBodelningIssueRelatedExhibitRefs\(/);
  assert.doesNotMatch(helperSlice, /resolveSWEBodelningProfileDossierSnapshot\(/);
  assert.doesNotMatch(helperSlice, /validateSWEBodelningProfileDossierSnapshot\(/);
  assert.doesNotMatch(helperSlice, /deriveSWEBodelningExportPackage/);
  assert.doesNotMatch(helperSlice, /getLatest|persist|refresh|route|response/i);

  assert.match(
    snapshotSlice,
    /const snapshotWithIssueIndex = \{\s*\.\.\.snapshot,\s*issue_index: deriveSWEBodelningProfileDossierIssueIndex\(snapshot\),\s*\};/,
  );
  assert.match(
    snapshotSlice,
    /const snapshotWithSectionIndex = \{\s*\.\.\.snapshotWithIssueIndex,\s*section_index: deriveSWEBodelningProfileDossierSectionIndex\(\s*snapshotWithIssueIndex,\s*\),\s*\};/,
  );
  assert.match(
    snapshotSlice,
    /const snapshotWithRelatedSectionRefs = \{\s*\.\.\.snapshotWithSectionIndex,\s*issue_index: attachSWEBodelningIssueRelatedSectionRefs\(\s*snapshotWithIssueIndex\.issue_index,\s*snapshotWithSectionIndex\.section_index,\s*\),\s*\};/,
  );
  assert.match(
    snapshotSlice,
    /const snapshotWithRelatedIssueRefs = \{\s*\.\.\.snapshotWithRelatedSectionRefs,\s*section_index: attachSWEBodelningSectionRelatedIssueRefs\(\s*snapshotWithSectionIndex\.section_index,\s*snapshotWithRelatedSectionRefs\.issue_index,\s*\),\s*\};/,
  );
  assert.match(
    snapshotSlice,
    /section_index: attachSWEBodelningSectionRelatedLaneKeys\(\s*snapshotWithRelatedIssueRefs\.section_index,\s*snapshotWithRelatedSectionRefs\.issue_index,/,
  );

  assert.doesNotMatch(
    exportSlice,
    /^\s*attachSWEBodelningSectionRelatedIssueRefs,\s*$/m,
  );
  assert.doesNotMatch(
    exportSlice,
    /^\s*deriveSWEBodelningSectionRelatedIssueRefs,\s*$/m,
  );

  assert.deepEqual(
    collectLineMatches(
      governanceIndexText,
      /\battachSWEBodelningSectionRelatedIssueRefs\b/,
    ),
    [
      1490,
      5232,
    ],
  );
  assert.doesNotMatch(
    apiIndexText,
    /attachSWEBodelningSectionRelatedIssueRefs\(/,
  );
  assert.doesNotMatch(
    databaseIndexText,
    /attachSWEBodelningSectionRelatedIssueRefs\(/,
  );
});
