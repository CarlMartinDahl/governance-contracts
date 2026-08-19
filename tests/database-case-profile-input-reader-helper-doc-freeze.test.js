const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const docsText = fs.readFileSync(
  path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md"),
  "utf8",
);
const databaseIndexText = fs.readFileSync(
  path.join(__dirname, "..", "packages", "database", "src", "index.js"),
  "utf8",
);

test("docs freeze the shared database case-profile-input reader seam as the persisted reader boundary", () => {
  assert.match(
    docsText,
    /Shared Database Case-Profile-Input Reader Helper Seam Freeze/i,
  );
  assert.match(
    docsText,
    /shared `packages\/database\/src\/index\.js` `getCaseProfileInputs` helper is the canonical persisted case-profile-input reader boundary for the current included database read\/projection\/persistence helpers below and is now frozen as the baseline seam/i,
  );
  assert.match(
    docsText,
    /the currently evidenced included database helpers in this freeze are limited to:\s+`getLatestCaseReleaseEvalRun`\s+`getLatestCaseProfileDossierProjection`\s+`getLatestCaseExportPackageProjection`\s+`getLatestCaseExportPackageDocxArtifactProjection`\s+`getLatestCaseExportPackagePdfArtifactProjection`\s+`getLatestCaseExportPackageJsonArtifactProjection`\s+`getLatestCaseExportPackageMarkdownArtifactProjection`\s+`persistCaseReleaseEvalRun`\s+`refreshCaseReleaseEvalRun`/i,
  );
  assert.match(
    docsText,
    /the currently concrete shared behavior already evidenced for this helper seam is limited to:\s+`getCaseProfileInputs` rejecting invalid `caseId` values through `createPersistenceError\("ERR_CASE_ID_INVALID", "caseId must be a non-empty string"\)`\s+`getCaseProfileInputs` loading the profile-input store through `readStore\(caseProfileInputsFileName, options\)`\s+`getCaseProfileInputs` reading `store\[caseId\]` as the persisted case-profile-input record lookup\s+`getCaseProfileInputs` returning `null` when no persisted profile-input record exists\s+`getCaseProfileInputs` otherwise returning only `jurisdiction_profile_key`, `profile_input_summary`, and `profile_input_lane_snapshot` from the persisted record/i,
  );
  assert.match(
    docsText,
    /the current bounded reuse already evidenced in `packages\/database\/src\/index\.js` is limited to:\s+`getCaseProfileInputs` being reused by `getLatestCaseReleaseEvalRun`\s+`getCaseProfileInputs` being reused by `getLatestCaseProfileDossierProjection`\s+`getCaseProfileInputs` being reused by `getLatestCaseExportPackageProjection`\s+`getCaseProfileInputs` being reused by `getLatestCaseExportPackageDocxArtifactProjection`\s+`getCaseProfileInputs` being reused by `getLatestCaseExportPackagePdfArtifactProjection`\s+`getCaseProfileInputs` being reused by `getLatestCaseExportPackageJsonArtifactProjection`\s+`getCaseProfileInputs` being reused by `getLatestCaseExportPackageMarkdownArtifactProjection`\s+`getCaseProfileInputs` being reused by `persistCaseReleaseEvalRun`\s+`getCaseProfileInputs` being reused by `refreshCaseReleaseEvalRun`/i,
  );
  assert.match(
    docsText,
    /the shared `createPersistenceError` helper seam remains outside this helper seam because machine-readable persistence error construction is a separate frozen boundary/i,
  );
  assert.match(
    docsText,
    /the shared `resolveStoragePath` \/ `readStore` \/ `writeStore` storage-helper seam remains outside this helper seam because filesystem\/path I\/O is a separate frozen boundary/i,
  );
  assert.match(
    docsText,
    /the shared `normalizeRecord` \/ `normalizeReleaseEvalRecord` \/ `normalizeExportPackage\*Record` normalization seam remains outside this helper seam because persisted record shaping is a separate frozen boundary/i,
  );
  assert.match(
    docsText,
    /the shared `reconcilePersistedReleaseEvalRun` \/ `resolvePersistedReleaseEvalProfileDossierSnapshot` reconciliation helper seam remains outside this helper seam because persisted release-eval reconciliation and dossier-snapshot resolution are a separate frozen lower boundary/i,
  );
  assert.match(
    docsText,
    /the shared `attachPersistedReleaseEvalRun` \/ `resolvePersistedReleaseEvalProfileDossierProjection` wrapper seam remains outside this helper seam because attached release-eval and profile-dossier projection resolution are a separate frozen higher boundary/i,
  );
  assert.match(
    docsText,
    /the shared API response-helper seam remains outside this helper seam because API response construction is performed in `apps\/api\/src\/index\.js` after persistence results are returned or thrown/i,
  );
  assert.match(
    docsText,
    /the shared `\/cases\/:caseId\/\.\.\.` parser seam remains outside this helper seam because path parsing occurs before any persistence boundary is reached/i,
  );
  assert.match(
    docsText,
    /the shared `loadAuthorizedCaseContext` helper remains outside this helper seam because auth\/access loading and capability gating occur before persistence helper selection/i,
  );
  assert.match(
    docsText,
    /downstream route-specific latest\/refresh\/delivery behavior remains outside this helper seam because route orchestration occurs after these database helpers return persisted values or projections/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, persistence semantics, filesystem behavior, API behavior, or fail-closed behavior/i,
  );

  assert.match(
    databaseIndexText,
    /async function getCaseProfileInputs\(caseId, options = \{\}\)\s*\{\s*if \(!caseId \|\| typeof caseId !== "string"\) \{\s*throw createPersistenceError\("ERR_CASE_ID_INVALID", "caseId must be a non-empty string"\);\s*\}\s*const store = await readStore\(caseProfileInputsFileName, options\);\s*const record = store\[caseId\];\s*if \(!record\) \{\s*return null;\s*\}\s*return \{\s*jurisdiction_profile_key: record\.jurisdiction_profile_key,\s*profile_input_summary: record\.profile_input_summary,\s*profile_input_lane_snapshot: record\.profile_input_lane_snapshot,\s*\};\s*\}/,
  );

  assert.equal(
    (databaseIndexText.match(/async function getCaseProfileInputs\(/g) || []).length,
    1,
  );
  assert.equal(
    (databaseIndexText.match(/getCaseProfileInputs\(/g) || []).length - 1,
    9,
  );

  assert.match(
    databaseIndexText,
    /async function getLatestCaseReleaseEvalRun[\s\S]*const caseProfileInputs = await getCaseProfileInputs\(caseId, options\);[\s\S]*return attachPersistedReleaseEvalRun\(/,
  );
  assert.match(
    databaseIndexText,
    /async function getLatestCaseProfileDossierProjection[\s\S]*const caseProfileInputs = await getCaseProfileInputs\(caseId, options\);[\s\S]*return resolvePersistedReleaseEvalProfileDossierProjection\(/,
  );
  assert.match(
    databaseIndexText,
    /async function getLatestCaseExportPackageProjection[\s\S]*const caseProfileInputs = await getCaseProfileInputs\(caseId, options\);[\s\S]*currentProfileDossierSnapshot = resolvePersistedReleaseEvalProfileDossierSnapshot\(/,
  );
  assert.match(
    databaseIndexText,
    /async function getLatestCaseExportPackageDocxArtifactProjection[\s\S]*const caseProfileInputs = await getCaseProfileInputs\(caseId, options\);[\s\S]*currentProfileDossierSnapshot = resolvePersistedReleaseEvalProfileDossierSnapshot\(/,
  );
  assert.match(
    databaseIndexText,
    /async function getLatestCaseExportPackagePdfArtifactProjection[\s\S]*const caseProfileInputs = await getCaseProfileInputs\(caseId, options\);[\s\S]*currentProfileDossierSnapshot = resolvePersistedReleaseEvalProfileDossierSnapshot\(/,
  );
  assert.match(
    databaseIndexText,
    /async function getLatestCaseExportPackageJsonArtifactProjection[\s\S]*const caseProfileInputs = await getCaseProfileInputs\(caseId, options\);[\s\S]*currentProfileDossierSnapshot = resolvePersistedReleaseEvalProfileDossierSnapshot\(/,
  );
  assert.match(
    databaseIndexText,
    /async function getLatestCaseExportPackageMarkdownArtifactProjection[\s\S]*const caseProfileInputs = await getCaseProfileInputs\(caseId, options\);[\s\S]*currentProfileDossierSnapshot = resolvePersistedReleaseEvalProfileDossierSnapshot\(/,
  );
  assert.match(
    databaseIndexText,
    /async function persistCaseReleaseEvalRun[\s\S]*const caseProfileInputs = await getCaseProfileInputs\(caseId, options\);/,
  );
  assert.match(
    databaseIndexText,
    /async function refreshCaseReleaseEvalRun[\s\S]*const caseProfileInputs = await getCaseProfileInputs\(caseId, options\);/,
  );
});
