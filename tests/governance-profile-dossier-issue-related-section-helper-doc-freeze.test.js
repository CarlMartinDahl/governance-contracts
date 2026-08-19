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

test("docs freeze the shared governance profile-dossier issue-related-section helper seam as the issue-to-section attachment boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared Governance Profile Dossier Issue-Related-Section Attachment Helper Seam Freeze[\s\S]*?(?=\n### )/,
  );
  const helperStart = governanceIndexText.indexOf(
    "function deriveSWEBodelningIssueRelatedSectionRefs(",
  );
  const helperEnd = governanceIndexText.indexOf(
    "function attachSWEBodelningIssueRelatedExhibitRefs(",
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

  assert.ok(docsSectionMatch, "expected issue-related-section helper docs section");
  assert.notEqual(helperStart, -1, "expected related-section helper definition start");
  assert.notEqual(helperEnd, -1, "expected related-section helper definition end");
  assert.notEqual(snapshotStart, -1, "expected snapshot construction start");
  assert.notEqual(snapshotEnd, -1, "expected snapshot construction end");
  assert.notEqual(exportStart, -1, "expected governance export surface");

  const docsSection = docsSectionMatch[0];
  const helperSlice = governanceIndexText.slice(helperStart, helperEnd);
  const snapshotSlice = governanceIndexText.slice(snapshotStart, snapshotEnd);
  const exportSlice = governanceIndexText.slice(exportStart);

  assert.match(
    docsSection,
    /Shared Governance Profile Dossier Issue-Related-Section Attachment Helper Seam Freeze/i,
  );
  assert.match(
    docsSection,
    /profile-dossier issue-related-section attachment helper `attachSWEBodelningIssueRelatedSectionRefs` is the canonical governance-side `SWE_BODELNING` helper boundary for enriching already assembled profile-dossier `issue_index` entries with `related_section_refs` from an already assembled `section_index`/i,
  );
  assert.match(
    docsSection,
    /currently evidenced governed surface in this freeze is limited to:\s+additive deterministic `SWE_BODELNING` profile-dossier `issue_index\.related_section_refs` attachment from already assembled issue entries and already assembled section entries inside the current profile-dossier snapshot flow/i,
  );
  assert.match(
    docsSection,
    /currently concrete helper responsibilities already evidenced for this seam are limited to:\s+returning an empty issue-index attachment result when `issueIndex` is not an array\s+preserving each existing issue entry while adding `related_section_refs`\s+deriving the related section refs through the bounded internal `deriveSWEBodelningIssueRelatedSectionRefs\(\.\.\.\)` helper\s+returning an empty related-section-ref list when `sectionIndex` is not an array\s+mapping current section keys to section refs from already assembled `sectionIndex` entries\s+mapping incomplete-input and support-incomplete issue codes to the `release_status` and `profile_inputs` section keys\s+mapping evaluator-version mismatch and profile-input-context mismatch issue codes to the `release_status` section key\s+returning deduplicated non-empty string section refs only/i,
  );
  assert.match(
    docsSection,
    /`deriveSWEBodelningIssueRelatedSectionRefs\(\.\.\.\)` is included only as a bounded internal family member because current repo evidence shows it is unexported, called only by `attachSWEBodelningIssueRelatedSectionRefs\(\.\.\.\)`, and owns only the issue-code-to-section-ref mapping needed by this attachment helper/i,
  );
  assert.match(
    docsSection,
    /relationship to profile-dossier snapshot construction is limited to `deriveSWEBodelningProfileDossierSnapshot\(\.\.\.\)` calling this helper once while assembling `snapshotWithRelatedSectionRefs`/i,
  );
  assert.match(
    docsSection,
    /relationship to the already-frozen issue-index helper seam is input-only and boundary-only because this attachment helper consumes already assembled `issue_index` entries and does not derive `ISS-###` issue entries, issue codes, blocking flags, or related lane keys/i,
  );
  assert.match(
    docsSection,
    /relationship to the already-frozen section-index helper seam is input-only and boundary-only because this attachment helper consumes already assembled `section_index` entries and does not derive `SEC-###` section entries, section keys, section order, or section presence/i,
  );
  assert.match(
    docsSection,
    /relationship to related-exhibit attachment helpers and other related-reference attachment helpers is negative and separate because those helpers enrich issue, lane, evidence-reference, evidence-exhibit, or section payloads with different related refs later in the snapshot-construction chain and do not own issue-to-section attachment/i,
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
    helperSlice,
    /function deriveSWEBodelningIssueRelatedSectionRefs\(issueCode, sectionIndex\) \{/,
  );
  assert.match(helperSlice, /if \(!Array\.isArray\(sectionIndex\)\) \{\s*return \[\];\s*\}/);
  assert.match(
    helperSlice,
    /const sectionRefsByKey = new Map\(\s*sectionIndex\s*\.filter\(\(entry\) => entry && typeof entry === "object"\)\s*\.map\(\(entry\) => \[entry\.section_key, entry\.section_ref\]\),\s*\);/,
  );
  assert.match(
    helperSlice,
    /issueCode === incompleteReleaseEvalReasonCode \|\|\s*issueCode === supportIncompleteReleaseEvalReasonCode[\s\S]*relatedSectionKeys = \["release_status", "profile_inputs"\];/,
  );
  assert.match(
    helperSlice,
    /issueCode === evaluatorVersionMismatchFreshnessReasonCode \|\|\s*issueCode === profileInputContextMismatchFreshnessReasonCode[\s\S]*relatedSectionKeys = \["release_status"\];/,
  );
  assert.match(
    helperSlice,
    /\.map\(\(sectionKey\) => sectionRefsByKey\.get\(sectionKey\)\)\s*\.filter\(\s*\(sectionRef\) => typeof sectionRef === "string" && sectionRef\.length > 0,/,
  );
  assert.match(
    helperSlice,
    /function attachSWEBodelningIssueRelatedSectionRefs\(issueIndex, sectionIndex\) \{/,
  );
  assert.match(helperSlice, /if \(!Array\.isArray\(issueIndex\)\) \{\s*return \[\];\s*\}/);
  assert.match(
    helperSlice,
    /return issueIndex\.map\(\(entry\) => \(\{\s*\.\.\.entry,\s*related_section_refs: deriveSWEBodelningIssueRelatedSectionRefs\(\s*entry\.issue_code,\s*sectionIndex,\s*\),\s*\}\)\);/,
  );
  assert.doesNotMatch(helperSlice, /deriveSWEBodelningProfileDossierIssueIndex\(/);
  assert.doesNotMatch(helperSlice, /deriveSWEBodelningProfileDossierSectionIndex\(/);
  assert.doesNotMatch(helperSlice, /attachSWEBodelningIssueRelatedExhibitRefs\(/);
  assert.doesNotMatch(helperSlice, /attachSWEBodelningIssueRelatedReferenceRefs\(/);
  assert.doesNotMatch(helperSlice, /attachSWEBodelningSectionRelated/);
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
    /issue_index: attachSWEBodelningIssueRelatedReferenceRefs\(\s*snapshotWithRelatedSectionRefs\.issue_index,/,
  );
  assert.match(
    snapshotSlice,
    /issue_index: attachSWEBodelningIssueRelatedExhibitRefs\(\s*snapshotWithRelatedReferenceRefs\.issue_index,/,
  );

  assert.doesNotMatch(
    exportSlice,
    /^\s*attachSWEBodelningIssueRelatedSectionRefs,\s*$/m,
  );
  assert.doesNotMatch(
    exportSlice,
    /^\s*deriveSWEBodelningIssueRelatedSectionRefs,\s*$/m,
  );

  assert.deepEqual(
    collectLineMatches(
      governanceIndexText,
      /\battachSWEBodelningIssueRelatedSectionRefs\b/,
    ),
    [
      1483,
      4990,
    ],
  );
  assert.deepEqual(
    collectLineMatches(
      governanceIndexText,
      /\bderiveSWEBodelningIssueRelatedSectionRefs\b/,
    ),
    [
      4955,
      4997,
    ],
  );
  assert.doesNotMatch(apiIndexText, /attachSWEBodelningIssueRelatedSectionRefs\(/);
  assert.doesNotMatch(
    databaseIndexText,
    /attachSWEBodelningIssueRelatedSectionRefs\(/,
  );
});
