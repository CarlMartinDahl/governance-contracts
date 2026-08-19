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

test("docs freeze the shared database release-eval writer seam as the persisted writer boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared Database Release-Eval Writer Helper Seam Freeze[\s\S]*?(?=\n### )/,
  );
  const writerStart = databaseIndexText.indexOf(
    "async function persistCaseReleaseEvalRun(",
  );
  const writerEnd = databaseIndexText.indexOf(
    "async function persistCaseExportPackageSnapshot(",
    writerStart,
  );
  const refreshStart = databaseIndexText.indexOf(
    "async function refreshCaseReleaseEvalRun(",
  );
  const refreshEnd = databaseIndexText.indexOf("module.exports = {", refreshStart);

  assert.ok(docsSectionMatch, "expected release-eval writer docs section");
  assert.notEqual(writerStart, -1, "expected persistCaseReleaseEvalRun helper");
  assert.notEqual(writerEnd, -1, "expected next database helper boundary");
  assert.notEqual(refreshStart, -1, "expected refreshCaseReleaseEvalRun helper");
  assert.notEqual(refreshEnd, -1, "expected database export scaffold");

  const docsSection = docsSectionMatch[0];
  const writerSlice = databaseIndexText.slice(writerStart, writerEnd);
  const refreshSlice = databaseIndexText.slice(refreshStart, refreshEnd);

  assert.match(
    docsSection,
    /Shared Database Release-Eval Writer Helper Seam Freeze/i,
  );
  assert.match(
    docsSection,
    /shared `packages\/database\/src\/index\.js` `persistCaseReleaseEvalRun` helper is the canonical persisted case-level `release_eval_run` writer boundary/i,
  );
  assert.match(
    docsSection,
    /currently evidenced included database\/runtime surfaces in this freeze are limited to:\s+`refreshCaseReleaseEvalRun`/i,
  );
  assert.match(
    docsSection,
    /current `packages\/database` persistence boundary already does this through the existing shared writer with bounded live-code reuse inside the database package/i,
  );
  assert.match(
    docsSection,
    /`persistCaseReleaseEvalRun` rejecting invalid `caseId` values through `createPersistenceError\("ERR_CASE_ID_INVALID", "caseId must be a non-empty string"\)`/i,
  );
  assert.match(
    docsSection,
    /`persistCaseReleaseEvalRun` rejecting unsupported `jurisdiction_profile_key` values through `typeof releaseEvalRun\?\.jurisdiction_profile_key === "string" && !hasJurisdictionProfileCapability\(releaseEvalRun\.jurisdiction_profile_key, "release_eval"\)` plus `createPersistenceError\("ERR_UNSUPPORTED_JURISDICTION_PROFILE", "jurisdiction_profile_key is not supported", \{ jurisdiction_profile_key \}\)`/i,
  );
  assert.match(
    docsSection,
    /`persistCaseReleaseEvalRun` loading case profile inputs through the already-frozen `getCaseProfileInputs\(caseId, options\)` seam/i,
  );
  assert.match(
    docsSection,
    /`persistCaseReleaseEvalRun` deriving `persistedAt` from `options\.persisted_at \?\? releaseEvalRun\?\.profile_dossier_snapshot\?\.canonical_source\?\.persisted_at \?\? new Date\(\)\.toISOString\(\)`/i,
  );
  assert.match(
    docsSection,
    /`persistCaseReleaseEvalRun` preserving non-`profile_dossier`-capable runs unchanged for persistence/i,
  );
  assert.match(
    docsSection,
    /`persistCaseReleaseEvalRun` otherwise delegating dossier-capable persistence through `attachReleaseEvalProfileDossierSnapshot\(reconcileReleaseEvalRun\(releaseEvalRun, caseProfileInputs\), \{ persisted_at: persistedAt, force_reproject: true \}\)`/i,
  );
  assert.match(
    docsSection,
    /`persistCaseReleaseEvalRun` validating\/canonicalizing the persisted run through `validateReleaseEvalRun\(releaseEvalRunForPersistence\)`/i,
  );
  assert.match(
    docsSection,
    /`persistCaseReleaseEvalRun` loading the release-eval store through `readStore\(releaseEvalRunsFileName, options\)`/i,
  );
  assert.match(
    docsSection,
    /`persistCaseReleaseEvalRun` appending the normalized persisted record through `normalizeReleaseEvalRecord\(caseId, canonicalReleaseEvalRun, persistedAt\)`/i,
  );
  assert.match(
    docsSection,
    /`persistCaseReleaseEvalRun` writing the updated store through `writeStore\(releaseEvalRunsFileName, store, options\)`/i,
  );
  assert.match(
    docsSection,
    /`persistCaseReleaseEvalRun` returning the canonical `release_eval_run` produced by `validateReleaseEvalRun\(releaseEvalRunForPersistence\)`/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen case-level persisted `release_eval_run` seam is limited to this helper being the narrower persisted write boundary inside that broader persistence seam, while latest-read and refresh remain separate adjacent surfaces/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-evidenced broader `refreshCaseReleaseEvalRun` flow is limited to refresh deriving a canonical run and delegating the final persisted write through `persistCaseReleaseEvalRun\(caseId, canonicalReleaseEvalRun, \{ \.\.\.options, persisted_at: persistedAt \}\)`/i,
  );
  assert.match(
    docsSection,
    /current bounded live-code reuse already evidenced in `packages\/database\/src\/index\.js` is limited to:\s+`persistCaseReleaseEvalRun` being reused by `refreshCaseReleaseEvalRun`\s+`persistCaseReleaseEvalRun` being exposed from `packages\/database\/src\/index\.js`/i,
  );
  assert.match(
    docsSection,
    /current bounded runtime\/test surface already evidenced in `packages\/database\/src\/index\.js`, `tests\/release-eval-run-persistence\.test\.js`, and `tests\/release-eval-run-api\.test\.js` is limited to 1 shared writer-helper definition, 1 higher database refresh caller, 1 database export surface, 1 invalid-`caseId` persistence error branch, 1 unsupported-profile persistence error branch, 1 case-profile-input reader dependency, 1 persisted-at selection chain, 1 profile-dossier-capable reconciliation\/attach branch, 1 shared release-eval validation\/canonicalization step, 1 store read, 1 normalized-record append, 1 store write, 1 canonical `release_eval_run` return surface, and current runtime proof across the existing release-eval persistence\/api tests/i,
  );
  assert.match(
    docsSection,
    /already-frozen shared database case-profile-input reader seam remains outside this helper seam because persisted profile-input reads are a separate frozen lower boundary even though this writer currently loads `caseProfileInputs` through that seam/i,
  );
  assert.match(
    docsSection,
    /already-frozen shared database case-profile-input writer seam remains outside this helper seam because `profile_inputs` persistence is a separate frozen database writer boundary/i,
  );
  assert.match(
    docsSection,
    /thin authenticated `GET \/cases\/:caseId\/release-eval\/latest` latest-read seam remains a distinct route boundary/i,
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
    /shared governance release-eval\/profile-dossier projection \/ snapshot \/ attach helper seams remain outside this helper seam because governance-side dossier resolution, snapshot resolution, and attachment\/projection behavior are separate higher or adjacent boundaries even where this writer delegates through the existing attachment path/i,
  );
  assert.match(
    docsSection,
    /shared schemas release-eval validator seam remains outside this helper seam because machine-readable release-eval validation\/canonicalization is a separate lower boundary even where this writer delegates through `validateReleaseEvalRun\(\.\.\.\)`/i,
  );
  assert.match(
    docsSection,
    /lower schemas profile-dossier validator \/ projection-validator seams remain outside this helper seam because schema-side dossier validation and projection validation are not defined by the release-eval writer boundary/i,
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
    /shared `normalizeRecord` \/ `normalizeReleaseEvalRecord` \/ `normalizeExportPackage\*Record` normalization seam remains outside this helper seam because persisted record shaping is a separate frozen boundary/i,
  );
  assert.match(
    docsSection,
    /broader downstream persistence\/runtime behavior remains outside this helper seam because latest-read orchestration, refresh derivation, export-package persistence, and post-write consumers are higher or adjacent flows rather than the writer seam itself/i,
  );
  assert.match(
    docsSection,
    /future database helpers that need the same persisted release-eval write behavior should extend the existing `persistCaseReleaseEvalRun` seam instead of introducing a parallel release-eval writer stack/i,
  );
  assert.match(
    docsSection,
    /does not change runtime behavior, persistence semantics, filesystem behavior, API behavior, or fail-closed behavior/i,
  );

  assert.match(
    writerSlice,
    /async function persistCaseReleaseEvalRun\(\s*caseId,\s*releaseEvalRun,\s*options = \{\}\s*\)\s*\{/,
  );
  assert.match(
    writerSlice,
    /if \(!caseId \|\| typeof caseId !== "string"\) \{\s*throw createPersistenceError\("ERR_CASE_ID_INVALID", "caseId must be a non-empty string"\);\s*\}/s,
  );
  assert.match(
    writerSlice,
    /typeof releaseEvalRun\?\.jurisdiction_profile_key === "string" &&\s*!hasJurisdictionProfileCapability\(\s*releaseEvalRun\.jurisdiction_profile_key,\s*"release_eval",\s*\)/s,
  );
  assert.match(
    writerSlice,
    /throw createPersistenceError\(\s*"ERR_UNSUPPORTED_JURISDICTION_PROFILE",\s*"jurisdiction_profile_key is not supported",[\s\S]*jurisdiction_profile_key: releaseEvalRun\.jurisdiction_profile_key,[\s\S]*\);/,
  );
  assert.match(
    writerSlice,
    /const caseProfileInputs = await getCaseProfileInputs\(caseId, options\);/,
  );
  assert.match(
    writerSlice,
    /const persistedAt =\s*options\.persisted_at \?\?\s*releaseEvalRun\?\.profile_dossier_snapshot\?\.canonical_source\?\.persisted_at \?\?\s*new Date\(\)\.toISOString\(\);/s,
  );
  assert.match(
    writerSlice,
    /hasJurisdictionProfileCapability\(\s*releaseEvalRun\?\.jurisdiction_profile_key,\s*"profile_dossier",\s*\)/s,
  );
  assert.match(
    writerSlice,
    /attachReleaseEvalProfileDossierSnapshot\(/,
  );
  assert.match(
    writerSlice,
    /reconcileReleaseEvalRun\(releaseEvalRun, caseProfileInputs\)/,
  );
  assert.match(
    writerSlice,
    /persisted_at: persistedAt/,
  );
  assert.match(
    writerSlice,
    /force_reproject: true/,
  );
  assert.match(
    writerSlice,
    /const canonicalReleaseEvalRun = validateReleaseEvalRun\(releaseEvalRunForPersistence\);/,
  );
  assert.match(
    writerSlice,
    /const store = await readStore\(releaseEvalRunsFileName, options\);/,
  );
  assert.match(
    writerSlice,
    /const caseRuns = Array\.isArray\(store\[caseId\]\) \? store\[caseId\] : \[\];/,
  );
  assert.match(
    writerSlice,
    /caseRuns\.push\(normalizeReleaseEvalRecord\(caseId, canonicalReleaseEvalRun, persistedAt\)\);/,
  );
  assert.match(writerSlice, /store\[caseId\] = caseRuns;/);
  assert.match(writerSlice, /await writeStore\(releaseEvalRunsFileName, store, options\);/);
  assert.match(writerSlice, /return canonicalReleaseEvalRun;/);
  assert.equal(
    (databaseIndexText.match(/async function persistCaseReleaseEvalRun\(/g) || []).length,
    1,
  );
  assert.equal(
    (databaseIndexText.match(/\bpersistCaseReleaseEvalRun\b/g) || []).length,
    3,
  );
  assert.doesNotMatch(writerSlice, /getLatestCaseReleaseEvalRun\(/);
  assert.doesNotMatch(writerSlice, /resolvePersistedReleaseEvalProfileDossierProjection\(/);
  assert.doesNotMatch(writerSlice, /resolvePersistedReleaseEvalProfileDossierSnapshot\(/);
  assert.doesNotMatch(writerSlice, /attachPersistedReleaseEvalRun\(/);
  assert.doesNotMatch(writerSlice, /upsertCaseProfileInputs\(/);

  assert.match(
    refreshSlice,
    /const canonicalReleaseEvalRun = deriveReleaseEvalRun\(\s*releaseEvalSeed,\s*caseProfileInputs,\s*\{ persisted_at: persistedAt \},\s*\);/s,
  );
  assert.match(
    refreshSlice,
    /return persistCaseReleaseEvalRun\(\s*caseId,\s*canonicalReleaseEvalRun,\s*\{\s*\.\.\.options,\s*persisted_at: persistedAt,\s*\}\s*\);/s,
  );

  assert.equal((apiIndexText.match(/\bpersistCaseReleaseEvalRun\b/g) || []).length, 0);

  assert.match(
    releaseEvalPersistenceTestText,
    /test\("valid release_eval_run payload roundtrips through persistence"/,
  );
  assert.match(
    releaseEvalPersistenceTestText,
    /test\("unchanged SWE_BODELNING profile inputs remain current"/,
  );
  assert.match(
    releaseEvalPersistenceTestText,
    /test\("invalid payload shape is rejected before persistence"/,
  );
  assert.match(
    releaseEvalPersistenceTestText,
    /test\("non-SWE_BODELNING behavior remains unchanged"/,
  );

  assert.match(
    releaseEvalApiTestText,
    /const persisted = await persistCaseReleaseEvalRun\(\s*"case-4",[\s\S]*assert\.deepEqual\(response\.body, persisted\);/s,
  );
});
