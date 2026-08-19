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
const releaseEvalPersistenceTestText = fs.readFileSync(
  path.join(__dirname, "release-eval-run-persistence.test.js"),
  "utf8",
);
const releaseEvalApiTestText = fs.readFileSync(
  path.join(__dirname, "release-eval-run-api.test.js"),
  "utf8",
);

test("docs freeze the shared database release-eval reader seam as the persisted latest-reader boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared Database Release-Eval Reader Helper Seam Freeze[\s\S]*?(?=\n### )/,
  );
  const readerStart = databaseIndexText.indexOf(
    "async function getLatestCaseReleaseEvalRun(",
  );
  const readerEnd = databaseIndexText.indexOf(
    "async function getLatestCaseProfileDossierProjection(",
    readerStart,
  );

  assert.ok(docsSectionMatch, "expected release-eval reader docs section");
  assert.notEqual(readerStart, -1, "expected getLatestCaseReleaseEvalRun helper");
  assert.notEqual(readerEnd, -1, "expected next read helper boundary");

  const docsSection = docsSectionMatch[0];
  const readerSlice = databaseIndexText.slice(readerStart, readerEnd);

  assert.match(
    docsSection,
    /Shared Database Release-Eval Reader Helper Seam Freeze/i,
  );
  assert.match(
    docsSection,
    /shared `packages\/database\/src\/index\.js` `getLatestCaseReleaseEvalRun` helper is the canonical persisted case-level `release_eval_run` latest-reader boundary/i,
  );
  assert.match(
    docsSection,
    /currently evidenced included database\/runtime surfaces in this freeze are limited to:\s+`packages\/database\/src\/index\.js` export surface\s+current thin latest-read route read-through in `apps\/api\/src\/index\.js`\s+current broader export-package refresh upstream consumer in `apps\/api\/src\/index\.js`\s+current runtime proof in `tests\/release-eval-run-persistence\.test\.js`\s+current runtime proof in `tests\/release-eval-run-api\.test\.js`/i,
  );
  assert.match(
    docsSection,
    /current `packages\/database` read boundary already does this through the existing shared latest-reader helper with bounded live-code reuse inside the database package and bounded downstream runtime reuse above it/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseReleaseEvalRun` rejecting invalid `caseId` values through `createPersistenceError\("ERR_CASE_ID_INVALID", "caseId must be a non-empty string"\)`/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseReleaseEvalRun` loading the release-eval store through `readStore\(releaseEvalRunsFileName, options\)`/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseReleaseEvalRun` reading `store\[caseId\]` as the persisted case-level release-eval record list lookup/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseReleaseEvalRun` returning `null` when no persisted case-level release-eval record list exists/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseReleaseEvalRun` selecting `caseRuns\[caseRuns\.length - 1\]` as the persisted latest release-eval record/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseReleaseEvalRun` reading `latestReleaseEvalRecord\.release_eval_payload` as the persisted latest release-eval payload/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseReleaseEvalRun` loading case profile inputs through the already-frozen `getCaseProfileInputs\(caseId, options\)` seam/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseReleaseEvalRun` delegating attached latest-run shaping through the already-frozen wrapper seam `attachPersistedReleaseEvalRun\(latestReleaseEvalRun, caseProfileInputs, \{ persisted_at: latestReleaseEvalRecord\.persisted_at \}\)`/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseReleaseEvalRun` returning the attached canonical latest `release_eval_run` delegated back from `attachPersistedReleaseEvalRun\(\.\.\.\)`/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen case-level persisted `release_eval_run` seam is limited to this helper being the narrower persisted latest-reader boundary inside that broader persistence seam, while writer and refresh remain separate adjacent surfaces/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen thin `GET \/cases\/:caseId\/release-eval\/latest` seam is limited to the route reading through `getLatestCaseReleaseEvalRun\(routeMatch\.caseId, options\)` and returning the resulting canonical latest release-eval run unchanged on success, while route-edge auth\/access, route-level 404\/409 handling, and API response construction remain outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen `getCaseProfileInputs` seam is limited to loading persisted case profile inputs through `getCaseProfileInputs\(caseId, options\)` before attached latest-run shaping, while persisted profile-input read semantics remain outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen `attachPersistedReleaseEvalRun` seam is limited to delegating attached latest-run shaping through `attachPersistedReleaseEvalRun\(latestReleaseEvalRun, caseProfileInputs, \{ persisted_at: latestReleaseEvalRecord\.persisted_at \}\)`, while persisted release-eval reconciliation and profile-dossier attachment behavior remain outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /current bounded live-code reuse already evidenced in `packages\/database\/src\/index\.js` is limited to:\s+`getLatestCaseReleaseEvalRun` being exposed from `packages\/database\/src\/index\.js`/i,
  );
  assert.match(
    docsSection,
    /current bounded downstream runtime reuse already evidenced in `apps\/api\/src\/index\.js` is limited to:\s+`getLatestCaseReleaseEvalRun` being reused by `handleCaseReleaseEvalLatestRoute`\s+`getLatestCaseReleaseEvalRun` being reused by `handleCaseExportPackageRefreshRoute`/i,
  );
  assert.match(
    docsSection,
    /current bounded runtime\/test surface already evidenced in `packages\/database\/src\/index\.js`, `apps\/api\/src\/index\.js`, `tests\/release-eval-run-persistence\.test\.js`, and `tests\/release-eval-run-api\.test\.js` is limited to 1 shared reader-helper definition, 1 database export surface, 1 invalid-`caseId` persistence error branch, 1 release-eval store read, 1 persisted case-run lookup, 1 null-on-missing branch, 1 latest-record selection path, 1 case-profile-input reader dependency, 1 bounded attach-wrapper delegation, 2 current direct API consumers, 1 canonical attached latest `release_eval_run` return surface, and current runtime proof across the existing release-eval persistence\/api tests/i,
  );
  assert.match(
    docsSection,
    /already-frozen shared database release-eval writer seam remains outside this helper seam because persisted release-eval writes are a separate frozen lower boundary/i,
  );
  assert.match(
    docsSection,
    /already-frozen shared database release-eval refresh seam remains outside this helper seam because persisted release-eval refresh derivation is a separate frozen adjacent boundary/i,
  );
  assert.match(
    docsSection,
    /already-frozen shared database case-profile-input writer seam remains outside this helper seam because `profile_inputs` persistence is a separate frozen database writer boundary/i,
  );
  assert.match(
    docsSection,
    /already-frozen shared database case-profile-input reader seam remains outside this helper seam because persisted profile-input reads are a separate frozen lower boundary even though this reader currently loads `caseProfileInputs` through that seam/i,
  );
  assert.match(
    docsSection,
    /already-frozen shared database release-eval attach\/projection wrapper seam remains outside this helper seam because attached release-eval shaping and persisted profile-dossier projection resolution are a separate frozen lower boundary even though this reader currently delegates through `attachPersistedReleaseEvalRun\(\.\.\.\)`/i,
  );
  assert.match(
    docsSection,
    /thin authenticated `GET \/cases\/:caseId\/release-eval\/latest` latest-read seam remains a distinct route boundary even though it currently reads through this helper/i,
  );
  assert.match(
    docsSection,
    /thin authenticated `GET \/cases\/:caseId\/profile-inputs` read seam remains a distinct route boundary/i,
  );
  assert.match(
    docsSection,
    /thin authenticated `PATCH \/cases\/:caseId\/profile-inputs` write seam remains a distinct route boundary/i,
  );
  assert.match(
    docsSection,
    /thin authenticated `GET \/cases\/:caseId\/profile-dossier` read\/projection seam remains a distinct route boundary/i,
  );
  assert.match(
    docsSection,
    /shared governance release-eval\/profile-dossier helper seams remain outside this helper seam because governance-side reconciliation, dossier projection, snapshot resolution, and attachment behavior are separate lower or adjacent boundaries consumed through the already-frozen database seams rather than defined by the latest-reader seam/i,
  );
  assert.match(
    docsSection,
    /shared schemas release-eval validator seam remains outside this helper seam because machine-readable release-eval validation\/canonicalization is not defined by the latest-reader boundary/i,
  );
  assert.match(
    docsSection,
    /lower schemas profile-dossier validator \/ projection-validator seams remain outside this helper seam because schema-side dossier validation and projection validation are not defined by the release-eval latest-reader boundary/i,
  );
  assert.match(
    docsSection,
    /shared `createPersistenceError` helper seam remains outside this helper seam because machine-readable persistence error construction is a separate frozen boundary/i,
  );
  assert.match(
    docsSection,
    /shared `resolveStoragePath` \/ `readStore` \/ `writeStore` storage-helper seam remains outside this helper seam because filesystem\/path I\/O is a separate frozen boundary/i,
  );
  assert.match(
    docsSection,
    /broader downstream persistence\/runtime behavior remains outside this helper seam because export-package refresh orchestration, latest-read route-edge behavior, and post-read consumers are higher or adjacent flows rather than the reader seam itself/i,
  );
  assert.match(
    docsSection,
    /future database helpers that need the same persisted latest release-eval read behavior should extend the existing `getLatestCaseReleaseEvalRun` seam instead of introducing a parallel release-eval reader stack/i,
  );
  assert.match(
    docsSection,
    /does not change runtime behavior, persistence semantics, filesystem behavior, API behavior, or fail-closed behavior/i,
  );

  assert.match(
    readerSlice,
    /async function getLatestCaseReleaseEvalRun\(caseId, options = \{\}\)\s*\{/,
  );
  assert.match(
    readerSlice,
    /if \(!caseId \|\| typeof caseId !== "string"\) \{\s*throw createPersistenceError\("ERR_CASE_ID_INVALID", "caseId must be a non-empty string"\);\s*\}/s,
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
    /return attachPersistedReleaseEvalRun\(latestReleaseEvalRun, caseProfileInputs, \{\s*persisted_at: latestReleaseEvalRecord\.persisted_at,\s*\}\);/s,
  );
  assert.equal(
    (databaseIndexText.match(/async function getLatestCaseReleaseEvalRun\(/g) || [])
      .length,
    1,
  );
  assert.equal(
    (databaseIndexText.match(/\bgetLatestCaseReleaseEvalRun\b/g) || []).length,
    2,
  );
  assert.match(
    databaseIndexText,
    /module\.exports = \{[\s\S]*getLatestCaseReleaseEvalRun,[\s\S]*\}/,
  );
  assert.equal((apiIndexText.match(/getLatestCaseReleaseEvalRun\(/g) || []).length, 2);
  assert.match(
    apiIndexText,
    /const releaseEvalRun = await getLatestCaseReleaseEvalRun\(routeMatch\.caseId, options\);/,
  );
  assert.match(
    apiIndexText,
    /const latestReleaseEvalRun = await getLatestCaseReleaseEvalRun\(routeMatch\.caseId, options\);/,
  );
  assert.doesNotMatch(readerSlice, /persistCaseReleaseEvalRun\(/);
  assert.doesNotMatch(readerSlice, /refreshCaseReleaseEvalRun\(/);
  assert.doesNotMatch(readerSlice, /resolvePersistedReleaseEvalProfileDossierProjection\(/);
  assert.doesNotMatch(readerSlice, /upsertCaseProfileInputs\(/);
  assert.doesNotMatch(readerSlice, /deriveReleaseEvalRun\(/);

  assert.match(
    releaseEvalPersistenceTestText,
    /valid release_eval_run payload roundtrips through persistence/,
  );
  assert.match(
    releaseEvalPersistenceTestText,
    /const latest = await getLatestCaseReleaseEvalRun\("case-1", \{ storageDir \}\);/,
  );
  assert.match(
    releaseEvalPersistenceTestText,
    /unchanged SWE_BODELNING profile inputs remain current/,
  );
  assert.match(
    releaseEvalPersistenceTestText,
    /const latest = await getLatestCaseReleaseEvalRun\("case-current", \{ storageDir \}\);/,
  );
  assert.match(
    releaseEvalPersistenceTestText,
    /an older projection_version triggers shared-governance fallback\/reprojection/,
  );
  assert.match(
    releaseEvalPersistenceTestText,
    /const latest = await getLatestCaseReleaseEvalRun\("case-dossier-fallback", \{\s*storageDir,\s*\}\);/s,
  );
  assert.match(
    releaseEvalPersistenceTestText,
    /a schema-invalid current-version snapshot triggers shared-governance fallback\/reprojection/,
  );
  assert.match(
    releaseEvalPersistenceTestText,
    /const latest = await getLatestCaseReleaseEvalRun\("case-dossier-invalid", \{\s*storageDir,\s*\}\);/s,
  );
  assert.match(
    releaseEvalPersistenceTestText,
    /const latest = await getLatestCaseReleaseEvalRun\("case-3", \{ storageDir \}\);/,
  );
  assert.match(
    releaseEvalPersistenceTestText,
    /assert\.equal\(latest, null\);/,
  );

  assert.match(
    releaseEvalApiTestText,
    /successful GET for a tenant-owned SWE_BODELNING case with persisted latest release eval/,
  );
  assert.match(
    releaseEvalApiTestText,
    /successful GET for a tenant-owned CMD_PROFILE case returns the persisted release_eval unchanged/,
  );
  assert.match(
    releaseEvalApiTestText,
    /same-tenant persisted release eval profile drift is rejected instead of returning the mismatched latest run/,
  );
  assert.match(
    releaseEvalApiTestText,
    /latest release eval route returns persisted support metadata unchanged/,
  );
  assert.match(
    releaseEvalApiTestText,
    /assert\.deepEqual\(response\.body, persisted\);/,
  );
});
