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
const apiIndexText = fs.readFileSync(
  path.join(__dirname, "..", "apps", "api", "src", "index.js"),
  "utf8",
);
const profileDossierApiTestText = fs.readFileSync(
  path.join(__dirname, "profile-dossier-api.test.js"),
  "utf8",
);

test("docs freeze the shared database profile-dossier reader seam as the persisted latest projection-reader boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared Database Profile-Dossier Reader Helper Seam Freeze[\s\S]*?(?=\n### )/,
  );
  const readerStart = databaseIndexText.indexOf(
    "async function getLatestCaseProfileDossierProjection(",
  );
  const readerEnd = databaseIndexText.indexOf(
    "async function getLatestCaseExportPackageSnapshot(",
    readerStart,
  );

  assert.ok(docsSectionMatch, "expected profile-dossier reader docs section");
  assert.notEqual(
    readerStart,
    -1,
    "expected getLatestCaseProfileDossierProjection helper",
  );
  assert.notEqual(readerEnd, -1, "expected next helper boundary");

  const docsSection = docsSectionMatch[0];
  const readerSlice = databaseIndexText.slice(readerStart, readerEnd);

  assert.match(
    docsSection,
    /Shared Database Profile-Dossier Reader Helper Seam Freeze/i,
  );
  assert.match(
    docsSection,
    /shared `packages\/database\/src\/index\.js` `getLatestCaseProfileDossierProjection` helper is the canonical persisted case-level latest `profile_dossier` projection reader boundary/i,
  );
  assert.match(
    docsSection,
    /currently evidenced included database\/runtime surfaces in this freeze are limited to:\s+`packages\/database\/src\/index\.js` export surface\s+current thin profile-dossier read route read-through in `apps\/api\/src\/index\.js`\s+current runtime proof in `tests\/profile-dossier-api\.test\.js`/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseProfileDossierProjection` rejecting invalid `caseId` values through `createPersistenceError\("ERR_CASE_ID_INVALID", "caseId must be a non-empty string"\)`/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseProfileDossierProjection` loading the release-eval store through `readStore\(releaseEvalRunsFileName, options\)`/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseProfileDossierProjection` returning `null` when no persisted case-level release-eval record list exists/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseProfileDossierProjection` selecting `caseRuns\[caseRuns\.length - 1\]` as the persisted latest release-eval record/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseProfileDossierProjection` loading case profile inputs through the already-frozen `getCaseProfileInputs\(caseId, options\)` seam before delegated dossier projection resolution/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseProfileDossierProjection` delegating latest profile-dossier projection resolution through the already-frozen lower wrapper seam `resolvePersistedReleaseEvalProfileDossierProjection\(latestReleaseEvalRun, caseProfileInputs, \{ persisted_at: latestReleaseEvalRecord\.persisted_at \}\)`/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen thin `GET \/cases\/:caseId\/profile-dossier` seam is limited to the route reading through `getLatestCaseProfileDossierProjection\(routeMatch\.caseId, options\)` and returning the resulting canonical dossier projection unchanged on success/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen `getCaseProfileInputs` seam is limited to loading persisted case profile inputs through `getCaseProfileInputs\(caseId, options\)` before delegated dossier projection resolution/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen lower `resolvePersistedReleaseEvalProfileDossierProjection` wrapper seam is limited to delegating persisted latest dossier projection resolution through `resolvePersistedReleaseEvalProfileDossierProjection\(latestReleaseEvalRun, caseProfileInputs, \{ persisted_at: latestReleaseEvalRecord\.persisted_at \}\)`/i,
  );
  assert.match(
    docsSection,
    /current bounded live-code reuse already evidenced in `packages\/database\/src\/index\.js` is limited to:\s+`getLatestCaseProfileDossierProjection` being exposed from `packages\/database\/src\/index\.js`/i,
  );
  assert.match(
    docsSection,
    /current bounded downstream runtime reuse already evidenced in `apps\/api\/src\/index\.js` is limited to:\s+`getLatestCaseProfileDossierProjection` being reused by `handleCaseProfileDossierRoute`/i,
  );
  assert.match(
    docsSection,
    /already-frozen database release-eval reader-helper seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /already-frozen database release-eval writer-helper seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /already-frozen database release-eval refresh-helper seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /already-frozen database case-profile-input writer-helper seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /already-frozen database case-profile-input reader-helper seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /already-frozen thin `GET \/cases\/:caseId\/profile-dossier` route seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /shared governance release-eval\/profile-dossier helper seams remain outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /lower schemas profile-dossier validator \/ projection-validator seams remain outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /shared `createPersistenceError` helper seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /shared `resolveStoragePath` \/ `readStore` \/ `writeStore` storage-helper seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /future database helpers that need the same persisted latest profile-dossier projection read behavior should extend the existing `getLatestCaseProfileDossierProjection` seam instead of introducing a parallel dossier reader stack/i,
  );
  assert.match(
    docsSection,
    /does not change runtime behavior, persistence semantics, filesystem behavior, API behavior, or fail-closed behavior/i,
  );

  assert.match(
    readerSlice,
    /async function getLatestCaseProfileDossierProjection\(\s*caseId,\s*options = \{\}\s*\)\s*\{/,
  );
  assert.match(
    readerSlice,
    /throw createPersistenceError\("ERR_CASE_ID_INVALID", "caseId must be a non-empty string"\);/,
  );
  assert.match(
    readerSlice,
    /const store = await readStore\(releaseEvalRunsFileName, options\);/,
  );
  assert.match(readerSlice, /const caseRuns = store\[caseId\];/);
  assert.match(
    readerSlice,
    /if \(!Array\.isArray\(caseRuns\) \|\| caseRuns\.length === 0\) \{\s*return null;\s*\}/s,
  );
  assert.match(
    readerSlice,
    /const latestReleaseEvalRecord = caseRuns\[caseRuns\.length - 1\];/,
  );
  assert.match(
    readerSlice,
    /const latestReleaseEvalRun = latestReleaseEvalRecord\.release_eval_payload;/,
  );
  assert.match(
    readerSlice,
    /const caseProfileInputs = await getCaseProfileInputs\(caseId, options\);/,
  );
  assert.match(
    readerSlice,
    /return resolvePersistedReleaseEvalProfileDossierProjection\(\s*latestReleaseEvalRun,\s*caseProfileInputs,\s*\{\s*persisted_at: latestReleaseEvalRecord\.persisted_at,\s*\},\s*\);/s,
  );

  assert.equal(
    (databaseIndexText.match(/async function getLatestCaseProfileDossierProjection\(/g) || [])
      .length,
    1,
  );
  assert.equal(
    (databaseIndexText.match(/\bgetLatestCaseProfileDossierProjection\b/g) || []).length,
    2,
  );
  assert.match(
    databaseIndexText,
    /module\.exports = \{[\s\S]*getLatestCaseProfileDossierProjection,[\s\S]*\}/,
  );
  assert.equal(
    (apiIndexText.match(/\bgetLatestCaseProfileDossierProjection\b/g) || []).length,
    2,
  );
  assert.match(
    apiIndexText,
    /const profileDossierProjection = await getLatestCaseProfileDossierProjection\(\s*routeMatch\.caseId,\s*options,\s*\);/,
  );
  assert.equal(
    (apiIndexText.match(/getLatestCaseProfileDossierProjection\(/g) || []).length,
    1,
  );

  assert.match(
    databaseIndexText,
    /function resolvePersistedReleaseEvalProfileDossierProjection\(\s*releaseEvalRun,\s*caseProfileInputs,\s*options = \{\},\s*\)\s*\{[\s\S]*return resolveReleaseEvalProfileDossierProjection\(\s*reconciledReleaseEvalRun,\s*options,\s*\);[\s\S]*\}/,
  );

  assert.doesNotMatch(readerSlice, /getLatestCaseReleaseEvalRun\(/);
  assert.doesNotMatch(readerSlice, /persistCaseReleaseEvalRun\(/);
  assert.doesNotMatch(readerSlice, /refreshCaseReleaseEvalRun\(/);
  assert.doesNotMatch(readerSlice, /attachPersistedReleaseEvalRun\(/);
  assert.doesNotMatch(readerSlice, /resolveReleaseEvalProfileDossierProjection\(/);
  assert.doesNotMatch(readerSlice, /resolveSWEBodelningProfileDossierProjection\(/);
  assert.doesNotMatch(readerSlice, /resolveCMDProfileDossierProjection\(/);
  assert.doesNotMatch(readerSlice, /upsertCaseProfileInputs\(/);
  assert.doesNotMatch(readerSlice, /validateSWEBodelningProfileDossierProjection\(/);
  assert.doesNotMatch(readerSlice, /validateCMDProfileDossierProjection\(/);

  assert.match(
    profileDossierApiTestText,
    /test\("successful dossier retrieval for a tenant-owned SWE_BODELNING case with canonical release_eval data"/,
  );
  assert.match(
    profileDossierApiTestText,
    /const expectedProjection = await getLatestCaseProfileDossierProjection\("case-1", \{\s*storageDir,\s*\}\);/s,
  );
  assert.match(
    profileDossierApiTestText,
    /test\("successful tenant-owned GET \/cases\/:caseId\/profile-dossier for a CMD_PROFILE case with persisted release_eval baseline"/,
  );
  assert.match(
    profileDossierApiTestText,
    /const expectedProjection = await getLatestCaseProfileDossierProjection\("case-cmd", \{\s*storageDir,\s*\}\);/s,
  );
  assert.match(
    profileDossierApiTestText,
    /test\("same-tenant persisted dossier profile drift is rejected instead of returning the mismatched dossier projection"/,
  );
  assert.match(
    profileDossierApiTestText,
    /const expectedProjection = await getLatestCaseProfileDossierProjection\("case-drift", \{\s*storageDir,\s*\}\);/s,
  );
  assert.match(
    profileDossierApiTestText,
    /test\("older dossier projection versions trigger fallback reprojection and the dossier route exposes that result unchanged"/,
  );
  assert.match(
    profileDossierApiTestText,
    /const latestProfileDossierProjection = await getLatestCaseProfileDossierProjection\([\s\S]*?"case-7",[\s\S]*?\{ storageDir \},[\s\S]*?\);/,
  );
  assert.match(
    profileDossierApiTestText,
    /test\("schema-invalid current-version dossier snapshots trigger fallback reprojection and the dossier route exposes that result unchanged"/,
  );
  assert.match(
    profileDossierApiTestText,
    /const latestProfileDossierProjection = await getLatestCaseProfileDossierProjection\([\s\S]*?"case-8",[\s\S]*?\{\s*storageDir,\s*\}[\s\S]*?\);/,
  );
  assert.match(
    profileDossierApiTestText,
    /assert\.deepEqual\(response\.body, expectedProjection\);/,
  );
  assert.match(
    profileDossierApiTestText,
    /assert\.deepEqual\(response\.body, latestProfileDossierProjection\);/,
  );
});
