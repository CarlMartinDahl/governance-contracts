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

test("docs freeze the shared governance profile-dossier evidence-exhibit index helper seam as the exhibit-index derivation boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared Governance Profile Dossier Evidence-Exhibit Index Helper Seam Freeze[\s\S]*?(?=\n### )/,
  );
  const referenceHelperStart = governanceIndexText.indexOf(
    "function deriveSWEBodelningProfileDossierEvidenceReferenceIndex(",
  );
  const helperStart = governanceIndexText.indexOf(
    "function deriveSWEBodelningProfileDossierEvidenceExhibitIndex(",
  );
  const helperEnd = governanceIndexText.indexOf(
    "function attachSWEBodelningLaneSupportingExhibitRefs(",
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

  assert.ok(docsSectionMatch, "expected evidence-exhibit index docs section");
  assert.notEqual(referenceHelperStart, -1, "expected reference helper start");
  assert.notEqual(helperStart, -1, "expected exhibit helper definition start");
  assert.notEqual(helperEnd, -1, "expected exhibit helper definition end");
  assert.notEqual(snapshotStart, -1, "expected snapshot construction start");
  assert.notEqual(snapshotEnd, -1, "expected snapshot construction end");
  assert.notEqual(exportStart, -1, "expected governance export surface");

  const docsSection = docsSectionMatch[0];
  const helperSlice = governanceIndexText.slice(helperStart, helperEnd);
  const snapshotSlice = governanceIndexText.slice(snapshotStart, snapshotEnd);
  const exportSlice = governanceIndexText.slice(exportStart);

  assert.match(
    docsSection,
    /Shared Governance Profile Dossier Evidence-Exhibit Index Helper Seam Freeze/i,
  );
  assert.match(
    docsSection,
    /profile-dossier evidence-exhibit index helper `deriveSWEBodelningProfileDossierEvidenceExhibitIndex` is the canonical governance-side `SWE_BODELNING` evidence-exhibit index derivation boundary/i,
  );
  assert.match(
    docsSection,
    /currently evidenced governed surface in this freeze is limited to:\s+`SWE_BODELNING` profile-dossier `evidence_exhibit_index` derivation from an already assembled profile-dossier snapshot payload that already carries `evidence_reference_index`/i,
  );
  assert.match(
    docsSection,
    /currently concrete helper responsibilities already evidenced for this seam are limited to:\s+asserting object-shaped `profileDossierSnapshot`\s+requiring the already assembled `profileDossierSnapshot\.evidence_reference_index` to be an array before exhibit-index derivation\s+mapping the current `evidence_reference_index` entries in their existing order\s+returning deterministic `exhibit_ref` values with zero-padded `EX-###` numbering\s+returning each entry's `evidence_object_id`, cloned `supporting_lane_keys`, `related_lane_keys` filtered from current SWE lane keys, `related_reference_refs` derived only from already assembled evidence-reference entries sharing the same `evidence_object_id`, and empty initial `related_issue_refs` \/ `related_section_refs`/i,
  );
  assert.match(
    docsSection,
    /relationship to the already-frozen evidence-reference index helper seam is input-only and boundary-only because `deriveSWEBodelningProfileDossierEvidenceExhibitIndex\(\.\.\.\)` consumes an already assembled `evidence_reference_index` later in the snapshot-construction chain and does not derive `REF-###` reference entries or own evidence-reference behavior/i,
  );
  assert.match(
    docsSection,
    /`deriveSWEBodelningProfileDossierEvidenceReferenceIndex\(\.\.\.\)` remains outside this evidence-exhibit index seam and is the separately frozen evidence-reference helper boundary/i,
  );
  assert.match(
    docsSection,
    /relationship to profile-dossier snapshot construction is limited to `deriveSWEBodelningProfileDossierSnapshot\(\.\.\.\)` calling this helper once while assembling `snapshotWithEvidenceExhibitIndex`/i,
  );
  assert.match(
    docsSection,
    /current bounded reuse already evidenced in `packages\/governance\/src\/index\.js` is limited to one helper definition, one profile-dossier snapshot-construction call site, and the current named module export surface exposing `deriveSWEBodelningProfileDossierEvidenceExhibitIndex`/i,
  );
  assert.match(
    docsSection,
    /route behavior, database persistence behavior, export-package helper seams, release-eval policy\/freshness\/reconciliation\/profile-input helper seams, profile-input derivation\/context\/adapter seams, schema validation, and broader governance\/runtime behavior remain outside this seam/i,
  );
  assert.match(
    docsSection,
    /does not change runtime behavior, governance semantics, profile-dossier semantics, persistence semantics, API behavior, or fail-closed behavior/i,
  );

  assert.match(
    helperSlice,
    /function deriveSWEBodelningProfileDossierEvidenceExhibitIndex\(\s*profileDossierSnapshot,\s*\)\s*\{/,
  );
  assert.match(
    helperSlice,
    /assertPlainObject\(\s*profileDossierSnapshot,\s*"ERR_PROFILE_DOSSIER_SNAPSHOT_INVALID",\s*"profileDossierSnapshot",\s*\);/,
  );
  assert.match(
    helperSlice,
    /if \(!Array\.isArray\(profileDossierSnapshot\.evidence_reference_index\)\) \{\s*throw createGovernanceError\(\s*"ERR_PROFILE_DOSSIER_SNAPSHOT_INVALID",\s*"evidence_reference_index must be an array",\s*\{\s*field: "evidence_reference_index",\s*\},\s*\);/,
  );
  assert.match(
    helperSlice,
    /return profileDossierSnapshot\.evidence_reference_index\.map\(\(entry, index\) => \(\{\s*exhibit_ref: `EX-\$\{String\(index \+ 1\)\.padStart\(3, "0"\)\}`/,
  );
  assert.match(helperSlice, /evidence_object_id: entry\.evidence_object_id/);
  assert.match(helperSlice, /supporting_lane_keys: \[\.\.\.entry\.supporting_lane_keys\]/);
  assert.match(
    helperSlice,
    /related_lane_keys: laneKeys\.filter\(\(laneKey\) =>\s*entry\.supporting_lane_keys\.includes\(laneKey\),\s*\)/,
  );
  assert.match(
    helperSlice,
    /related_reference_refs: profileDossierSnapshot\.evidence_reference_index\s*\.filter\([\s\S]*referenceEntry\.evidence_object_id === entry\.evidence_object_id,[\s\S]*\.map\(\(referenceEntry\) => referenceEntry\.reference_ref\)/,
  );
  assert.match(helperSlice, /related_issue_refs: \[\]/);
  assert.match(helperSlice, /related_section_refs: \[\]/);
  assert.doesNotMatch(
    helperSlice,
    /deriveSWEBodelningProfileDossierEvidenceReferenceIndex\(/,
  );

  assert.match(
    snapshotSlice,
    /const snapshotWithEvidenceReferenceIndex = \{\s*\.\.\.snapshotWithSectionRelatedLaneKeys,\s*evidence_reference_index: deriveSWEBodelningProfileDossierEvidenceReferenceIndex\(\s*snapshotWithSectionRelatedLaneKeys,\s*\),\s*\};/,
  );
  assert.match(
    snapshotSlice,
    /const snapshotWithEvidenceExhibitIndex = \{\s*\.\.\.snapshotWithEvidenceReferenceRelatedSectionRefs,\s*evidence_exhibit_index: deriveSWEBodelningProfileDossierEvidenceExhibitIndex\(\s*snapshotWithEvidenceReferenceRelatedSectionRefs,\s*\),\s*\};/,
  );
  assert.match(
    exportSlice,
    /^\s*deriveSWEBodelningProfileDossierEvidenceExhibitIndex,\s*$/m,
  );

  assert.deepEqual(
    collectLineMatches(
      governanceIndexText,
      /\bderiveSWEBodelningProfileDossierEvidenceExhibitIndex\b/,
    ),
    [
      1054,
      1518,
      5905,
    ],
  );
  assert.deepEqual(
    collectLineMatches(
      governanceIndexText,
      /\bderiveSWEBodelningProfileDossierEvidenceReferenceIndex\b/,
    ),
    [
      993,
      1504,
      5906,
    ],
  );
  assert.doesNotMatch(
    apiIndexText,
    /deriveSWEBodelningProfileDossierEvidenceExhibitIndex\(/,
  );
  assert.doesNotMatch(
    databaseIndexText,
    /deriveSWEBodelningProfileDossierEvidenceExhibitIndex\(/,
  );
});
