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

test("docs freeze the shared governance profile-dossier section-index helper seam as the section-index derivation boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared Governance Profile Dossier Section-Index Helper Seam Freeze[\s\S]*?(?=\n### )/,
  );
  const helperStart = governanceIndexText.indexOf(
    "function deriveSWEBodelningProfileDossierSectionIndex(",
  );
  const helperEnd = governanceIndexText.indexOf(
    "function resolveSWEBodelningProfileDossierSnapshot(",
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

  assert.ok(docsSectionMatch, "expected section-index helper docs section");
  assert.notEqual(helperStart, -1, "expected section-index helper definition start");
  assert.notEqual(helperEnd, -1, "expected section-index helper definition end");
  assert.notEqual(snapshotStart, -1, "expected snapshot construction start");
  assert.notEqual(snapshotEnd, -1, "expected snapshot construction end");
  assert.notEqual(exportStart, -1, "expected governance export surface");

  const docsSection = docsSectionMatch[0];
  const helperSlice = governanceIndexText.slice(helperStart, helperEnd);
  const snapshotSlice = governanceIndexText.slice(snapshotStart, snapshotEnd);
  const exportSlice = governanceIndexText.slice(exportStart);

  assert.match(
    docsSection,
    /Shared Governance Profile Dossier Section-Index Helper Seam Freeze/i,
  );
  assert.match(
    docsSection,
    /profile-dossier section-index helper `deriveSWEBodelningProfileDossierSectionIndex` is the canonical governance-side `SWE_BODELNING` profile-dossier `section_index` derivation boundary/i,
  );
  assert.match(
    docsSection,
    /currently evidenced governed surface in this freeze is limited to:\s+deterministic `SWE_BODELNING` profile-dossier `section_index` derivation from an already assembled profile-dossier snapshot payload carrying `issue_index`/i,
  );
  assert.match(
    docsSection,
    /currently concrete helper responsibilities already evidenced for this seam are limited to:\s+asserting object-shaped `profileDossierSnapshot`\s+returning the current fixed section entries for `release_status`, `profile_inputs`, and `issues`\s+returning deterministic `section_ref` values with zero-padded `SEC-###` numbering\s+marking the `release_status` and `profile_inputs` sections present\s+marking the `issues` section present only when the already assembled `profileDossierSnapshot\.issue_index` is an array with at least one entry/i,
  );
  assert.match(
    docsSection,
    /relationship to profile-dossier snapshot construction is limited to `deriveSWEBodelningProfileDossierSnapshot\(\.\.\.\)` calling this helper once while assembling `snapshotWithSectionIndex`/i,
  );
  assert.match(
    docsSection,
    /relationship to the already-frozen issue-index helper seam is input-only and boundary-only because this section-index helper consumes an already assembled `issue_index` only to determine the `issues` section presence, but issue derivation, issue code ownership, issue related-lane selection, and `ISS-###` numbering remain outside this section-index seam/i,
  );
  assert.match(
    docsSection,
    /relationship to related-reference, related-section, related-exhibit, supporting-reference, and supporting-exhibit attachment helpers is negative and separate because those helpers enrich already assembled issue\/lane\/reference\/exhibit\/section payloads later in the snapshot-construction chain and do not derive the initial `SEC-###` section entries/i,
  );
  assert.match(
    docsSection,
    /current bounded reuse already evidenced in `packages\/governance\/src\/index\.js` is limited to one helper definition, one profile-dossier snapshot-construction call site, and the current named module export surface exposing `deriveSWEBodelningProfileDossierSectionIndex`/i,
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
    /function deriveSWEBodelningProfileDossierSectionIndex\(profileDossierSnapshot\) \{/,
  );
  assert.match(
    helperSlice,
    /assertPlainObject\(\s*profileDossierSnapshot,\s*"ERR_PROFILE_DOSSIER_SNAPSHOT_INVALID",\s*"profileDossierSnapshot",\s*\);/,
  );
  assert.match(helperSlice, /section_key: "release_status"/);
  assert.match(helperSlice, /section_key: "profile_inputs"/);
  assert.match(helperSlice, /section_key: "issues"/);
  assert.match(helperSlice, /section_order: 1/);
  assert.match(helperSlice, /section_order: 2/);
  assert.match(helperSlice, /section_order: 3/);
  assert.match(
    helperSlice,
    /present:\s*Array\.isArray\(profileDossierSnapshot\.issue_index\) &&\s*profileDossierSnapshot\.issue_index\.length > 0/,
  );
  assert.match(
    helperSlice,
    /section_ref: `SEC-\$\{String\(index \+ 1\)\.padStart\(3, "0"\)\}`/,
  );
  assert.doesNotMatch(
    helperSlice,
    /deriveSWEBodelningProfileDossierIssueIndex\(/,
  );
  assert.doesNotMatch(helperSlice, /attachSWEBodelning/);
  assert.doesNotMatch(
    helperSlice,
    /deriveSWEBodelningProfileDossierEvidenceReferenceIndex\(/,
  );
  assert.doesNotMatch(
    helperSlice,
    /deriveSWEBodelningProfileDossierEvidenceExhibitIndex\(/,
  );
  assert.doesNotMatch(
    helperSlice,
    /deriveSWEBodelningProfileDossierFingerprint\(/,
  );
  assert.doesNotMatch(
    helperSlice,
    /deriveSWEBodelningProfileDossierCanonicalSource\(/,
  );
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
    /section_index: attachSWEBodelningSectionRelatedIssueRefs\(\s*snapshotWithSectionIndex\.section_index,\s*snapshotWithRelatedSectionRefs\.issue_index,\s*\)/,
  );
  assert.match(
    snapshotSlice,
    /section_index: attachSWEBodelningSectionRelatedLaneKeys\(\s*snapshotWithRelatedIssueRefs\.section_index,\s*snapshotWithRelatedSectionRefs\.issue_index,\s*\)/,
  );
  assert.match(
    exportSlice,
    /^\s*deriveSWEBodelningProfileDossierSectionIndex,\s*$/m,
  );

  assert.deepEqual(
    collectLineMatches(
      governanceIndexText,
      /\bderiveSWEBodelningProfileDossierSectionIndex\b/,
    ),
    [
      1477,
      5325,
      5909,
    ],
  );
  assert.deepEqual(
    collectLineMatches(
      governanceIndexText,
      /\bderiveSWEBodelningProfileDossierIssueIndex\b/,
    ),
    [
      1473,
      4910,
      5908,
    ],
  );
  assert.doesNotMatch(apiIndexText, /deriveSWEBodelningProfileDossierSectionIndex\(/);
  assert.doesNotMatch(
    databaseIndexText,
    /deriveSWEBodelningProfileDossierSectionIndex\(/,
  );
});
