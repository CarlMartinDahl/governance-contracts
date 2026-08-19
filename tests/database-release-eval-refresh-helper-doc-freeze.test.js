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

test("docs freeze the shared database release-eval refresh seam as the persisted refresh boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared Database Release-Eval Refresh Helper Seam Freeze[\s\S]*?(?=\n### )/,
  );
  const refreshStart = databaseIndexText.indexOf(
    "async function refreshCaseReleaseEvalRun(",
  );
  const refreshEnd = databaseIndexText.indexOf("module.exports = {", refreshStart);

  assert.ok(docsSectionMatch, "expected release-eval refresh docs section");
  assert.notEqual(refreshStart, -1, "expected refreshCaseReleaseEvalRun helper");
  assert.notEqual(refreshEnd, -1, "expected database export scaffold");

  const docsSection = docsSectionMatch[0];
  const refreshSlice = databaseIndexText.slice(refreshStart, refreshEnd);

  assert.match(
    docsSection,
    /Shared Database Release-Eval Refresh Helper Seam Freeze/i,
  );
  assert.match(
    docsSection,
    /shared `packages\/database\/src\/index\.js` `refreshCaseReleaseEvalRun` helper is the canonical persisted case-level `release_eval_run` refresh boundary/i,
  );
  assert.match(
    docsSection,
    /currently evidenced included database\/runtime surfaces in this freeze are limited to:\s+`packages\/database\/src\/index\.js` export surface\s+current runtime proof in `tests\/release-eval-run-persistence\.test\.js`\s+current runtime proof in `tests\/release-eval-run-api\.test\.js`/i,
  );
  assert.match(
    docsSection,
    /current `packages\/database` persistence boundary already does this through the existing shared refresh helper with bounded live-code reuse inside the database package/i,
  );
  assert.match(
    docsSection,
    /`refreshCaseReleaseEvalRun` rejecting invalid `caseId` values through `createPersistenceError\("ERR_CASE_ID_INVALID", "caseId must be a non-empty string"\)`/i,
  );
  assert.match(
    docsSection,
    /`refreshCaseReleaseEvalRun` loading case profile inputs through the already-frozen `getCaseProfileInputs\(caseId, options\)` seam/i,
  );
  assert.match(
    docsSection,
    /`refreshCaseReleaseEvalRun` rejecting missing persisted profile inputs through `createPersistenceError\("ERR_PROFILE_INPUTS_NOT_FOUND", "profile inputs must exist before release eval refresh", \{ case_id: caseId \}\)`/i,
  );
  assert.match(
    docsSection,
    /`refreshCaseReleaseEvalRun` deriving `persistedAt` through `new Date\(\)\.toISOString\(\)`/i,
  );
  assert.match(
    docsSection,
    /`refreshCaseReleaseEvalRun` deriving `canonicalReleaseEvalRun` through `deriveReleaseEvalRun\(releaseEvalSeed, caseProfileInputs, \{ persisted_at: persistedAt \}\)`/i,
  );
  assert.match(
    docsSection,
    /`refreshCaseReleaseEvalRun` delegating the final persisted write through the already-frozen writer seam `persistCaseReleaseEvalRun\(caseId, canonicalReleaseEvalRun, \{ \.\.\.options, persisted_at: persistedAt \}\)`/i,
  );
  assert.match(
    docsSection,
    /`refreshCaseReleaseEvalRun` returning the canonical persisted `release_eval_run` delegated back from `persistCaseReleaseEvalRun\(\.\.\.\)`/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen case-level persisted `release_eval_run` seam is limited to this helper being the narrower persisted refresh boundary inside that broader persistence seam, while latest-read and direct persisted-write remain separate adjacent surfaces/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen writer seam `persistCaseReleaseEvalRun` is limited to refresh deriving a canonical run through `deriveReleaseEvalRun\(releaseEvalSeed, caseProfileInputs, \{ persisted_at: persistedAt \}\)` and delegating the final persisted write through `persistCaseReleaseEvalRun\(caseId, canonicalReleaseEvalRun, \{ \.\.\.options, persisted_at: persistedAt \}\)`/i,
  );
  assert.match(
    docsSection,
    /current bounded live-code reuse already evidenced in `packages\/database\/src\/index\.js` is limited to:\s+`refreshCaseReleaseEvalRun` being exposed from `packages\/database\/src\/index\.js`/i,
  );
  assert.match(
    docsSection,
    /current bounded runtime\/test surface already evidenced in `packages\/database\/src\/index\.js`, `tests\/release-eval-run-persistence\.test\.js`, and `tests\/release-eval-run-api\.test\.js` is limited to 1 shared refresh-helper definition, 1 database export surface, 1 invalid-`caseId` persistence error branch, 1 case-profile-input reader dependency, 1 missing-profile-input persistence error branch, 1 canonical `persistedAt` derivation step, 1 shared governance release-eval derivation step, 1 bounded delegation into the frozen writer seam, 1 canonical persisted `release_eval_run` return surface, and current runtime proof across the existing release-eval persistence\/api tests/i,
  );
  assert.match(
    docsSection,
    /already-frozen shared database release-eval writer seam remains outside this helper seam because persisted release-eval writes are a separate frozen lower boundary even though refresh delegates its final write through that seam/i,
  );
  assert.match(
    docsSection,
    /already-frozen shared database case-profile-input reader seam remains outside this helper seam because persisted profile-input reads are a separate frozen lower boundary even though refresh currently loads `caseProfileInputs` through that seam/i,
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
    /shared governance release-eval\/profile-dossier helper seams remain outside this helper seam because governance-side canonical release-eval derivation plus dossier projection \/ snapshot \/ attach behavior are separate adjacent boundaries even where refresh delegates through `deriveReleaseEvalRun\(\.\.\.\)` before calling the frozen writer seam/i,
  );
  assert.match(
    docsSection,
    /shared schemas release-eval validator seam remains outside this helper seam because machine-readable release-eval validation\/canonicalization is performed in the frozen writer seam rather than defined by the refresh helper boundary/i,
  );
  assert.match(
    docsSection,
    /lower schemas profile-dossier validator \/ projection-validator seams remain outside this helper seam because schema-side dossier validation and projection validation are not defined by the release-eval refresh boundary/i,
  );
  assert.match(
    docsSection,
    /shared `createPersistenceError` helper seam remains outside this helper seam because machine-readable persistence error construction is a separate frozen boundary/i,
  );
  assert.match(
    docsSection,
    /broader downstream persistence\/runtime behavior remains outside this helper seam because latest-read orchestration, higher release-eval refresh callers, direct writer internals, and post-refresh consumers are higher or adjacent flows rather than the refresh seam itself/i,
  );
  assert.match(
    docsSection,
    /future database helpers that need the same persisted release-eval refresh behavior should extend the existing `refreshCaseReleaseEvalRun` seam instead of introducing a parallel release-eval refresh stack/i,
  );
  assert.match(
    docsSection,
    /does not change runtime behavior, persistence semantics, filesystem behavior, API behavior, or fail-closed behavior/i,
  );

  assert.match(
    refreshSlice,
    /async function refreshCaseReleaseEvalRun\(caseId, releaseEvalSeed, options = \{\}\)\s*\{/,
  );
  assert.match(
    refreshSlice,
    /if \(!caseId \|\| typeof caseId !== "string"\) \{\s*throw createPersistenceError\("ERR_CASE_ID_INVALID", "caseId must be a non-empty string"\);\s*\}/s,
  );
  assert.match(
    refreshSlice,
    /const caseProfileInputs = await getCaseProfileInputs\(caseId, options\);/,
  );
  assert.match(
    refreshSlice,
    /if \(!caseProfileInputs\) \{\s*throw createPersistenceError\(\s*"ERR_PROFILE_INPUTS_NOT_FOUND",\s*"profile inputs must exist before release eval refresh",\s*\{ case_id: caseId \},\s*\);\s*\}/s,
  );
  assert.match(refreshSlice, /const persistedAt = new Date\(\)\.toISOString\(\);/);
  assert.match(
    refreshSlice,
    /const canonicalReleaseEvalRun = deriveReleaseEvalRun\(\s*releaseEvalSeed,\s*caseProfileInputs,\s*\{ persisted_at: persistedAt \},\s*\);/s,
  );
  assert.match(
    refreshSlice,
    /return persistCaseReleaseEvalRun\(caseId, canonicalReleaseEvalRun, \{\s*\.\.\.options,\s*persisted_at: persistedAt,\s*\}\);/s,
  );
  assert.equal(
    (databaseIndexText.match(/async function refreshCaseReleaseEvalRun\(/g) || [])
      .length,
    1,
  );
  assert.equal(
    (databaseIndexText.match(/\brefreshCaseReleaseEvalRun\b/g) || []).length,
    2,
  );
  assert.match(
    databaseIndexText,
    /module\.exports = \{[\s\S]*refreshCaseReleaseEvalRun,[\s\S]*\}/,
  );
  assert.doesNotMatch(refreshSlice, /getLatestCaseReleaseEvalRun\(/);
  assert.doesNotMatch(refreshSlice, /attachPersistedReleaseEvalRun\(/);
  assert.doesNotMatch(
    refreshSlice,
    /resolvePersistedReleaseEvalProfileDossierProjection\(/,
  );
  assert.doesNotMatch(
    refreshSlice,
    /resolvePersistedReleaseEvalProfileDossierSnapshot\(/,
  );
  assert.doesNotMatch(refreshSlice, /upsertCaseProfileInputs\(/);
  assert.doesNotMatch(apiIndexText, /\brefreshCaseReleaseEvalRun\b/);

  assert.match(
    releaseEvalPersistenceTestText,
    /an older projection_version triggers shared-governance fallback\/reprojection/,
  );
  assert.match(
    releaseEvalPersistenceTestText,
    /const persisted = await refreshCaseReleaseEvalRun\(\s*"case-dossier-fallback",/s,
  );
  assert.match(
    releaseEvalPersistenceTestText,
    /a schema-invalid current-version snapshot triggers shared-governance fallback\/reprojection/,
  );
  assert.match(
    releaseEvalPersistenceTestText,
    /const persisted = await refreshCaseReleaseEvalRun\(\s*"case-dossier-invalid",/s,
  );
  assert.match(
    releaseEvalApiTestText,
    /successful GET for a tenant-owned SWE_BODELNING case with persisted latest release eval/,
  );
  assert.match(
    releaseEvalApiTestText,
    /const persisted = await refreshCaseReleaseEvalRun\(\s*"case-1",/s,
  );
  assert.match(
    releaseEvalApiTestText,
    /successful GET for a tenant-owned CMD_PROFILE case returns the persisted release_eval unchanged/,
  );
  assert.match(
    releaseEvalApiTestText,
    /assert\.deepEqual\(response\.body, persisted\);/,
  );
});
