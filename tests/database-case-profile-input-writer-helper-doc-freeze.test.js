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
const profileInputPersistenceTestText = fs.readFileSync(
  path.join(__dirname, "profile-input-persistence.test.js"),
  "utf8",
);
const profileInputApiTestText = fs.readFileSync(
  path.join(__dirname, "profile-input-api.test.js"),
  "utf8",
);

test("docs freeze the shared database case-profile-input writer seam as the persisted writer boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared Database Case-Profile-Input Writer Helper Seam Freeze[\s\S]*?(?=\n### )/,
  );
  const writerStart = databaseIndexText.indexOf(
    "async function upsertCaseProfileInputs(",
  );
  const writerEnd = databaseIndexText.indexOf(
    "function normalizeReleaseEvalRecord(",
    writerStart,
  );
  const routePatchStart = apiIndexText.indexOf('if (request.method === "PATCH") {');
  const routeMethodFallback = apiIndexText.indexOf(
    'return errorResponse(405, "ERR_METHOD_NOT_ALLOWED"',
    routePatchStart,
  );

  assert.ok(docsSectionMatch, "expected writer helper docs section");
  assert.notEqual(writerStart, -1, "expected upsertCaseProfileInputs helper");
  assert.notEqual(writerEnd, -1, "expected next database helper boundary");
  assert.notEqual(routePatchStart, -1, "expected PATCH route branch");
  assert.notEqual(routeMethodFallback, -1, "expected route method fallback");

  const docsSection = docsSectionMatch[0];
  const writerSlice = databaseIndexText.slice(writerStart, writerEnd);
  const routePatchSlice = apiIndexText.slice(routePatchStart, routeMethodFallback);

  assert.match(
    docsSection,
    /Shared Database Case-Profile-Input Writer Helper Seam Freeze/i,
  );
  assert.match(
    docsSection,
    /shared `packages\/database\/src\/index\.js` `upsertCaseProfileInputs` helper is the canonical persisted case-profile-input writer boundary/i,
  );
  assert.match(
    docsSection,
    /currently evidenced included route\/runtime surfaces in this freeze are limited to:\s+`PATCH \/cases\/:caseId\/profile-inputs`/i,
  );
  assert.match(
    docsSection,
    /current `packages\/database` write boundary already does this through the existing shared writer with bounded live-code reuse across the current database export\/runtime surface/i,
  );
  assert.match(
    docsSection,
    /`upsertCaseProfileInputs` rejecting invalid `caseId` values through `createPersistenceError\("ERR_CASE_ID_INVALID", "caseId must be a non-empty string"\)`/i,
  );
  assert.match(
    docsSection,
    /`upsertCaseProfileInputs` rejecting unsupported `jurisdiction_profile_key` values through `hasJurisdictionProfileCapability\(profileInputSnapshot\?\.jurisdiction_profile_key, "profile_inputs"\)` plus `createPersistenceError\("ERR_UNSUPPORTED_JURISDICTION_PROFILE", "jurisdiction_profile_key is not supported", \{ jurisdiction_profile_key \}\)`/i,
  );
  assert.match(
    docsSection,
    /`upsertCaseProfileInputs` validating the incoming snapshot through `validateProfileInputSnapshot\(profileInputSnapshot\)`/i,
  );
  assert.match(
    docsSection,
    /`upsertCaseProfileInputs` deriving the canonical persisted snapshot through `deriveProfileInputSnapshot\(profileInputSnapshot\)`/i,
  );
  assert.match(
    docsSection,
    /`upsertCaseProfileInputs` loading the profile-input store through `readStore\(caseProfileInputsFileName, options\)`/i,
  );
  assert.match(
    docsSection,
    /`upsertCaseProfileInputs` shaping the persisted record through `normalizeRecord\(caseId, canonicalSnapshot, store\[caseId\]\)`/i,
  );
  assert.match(
    docsSection,
    /`upsertCaseProfileInputs` writing the updated store through `writeStore\(caseProfileInputsFileName, store, options\)`/i,
  );
  assert.match(
    docsSection,
    /`upsertCaseProfileInputs` returning only `jurisdiction_profile_key`, `profile_input_summary`, and `profile_input_lane_snapshot` from the persisted record/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen thin authenticated `PATCH \/cases\/:caseId\/profile-inputs` route seam is limited to that route delegating the persisted write to `upsertCaseProfileInputs` and returning the helper result unchanged on success, while route-edge auth\/access, route-edge validation-envelope shaping, and higher route orchestration remain outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /current bounded live-code reuse already evidenced is limited to:\s+`upsertCaseProfileInputs` being exported from `packages\/database\/src\/index\.js`\s+`upsertCaseProfileInputs` being imported into `apps\/api\/src\/index\.js`\s+`upsertCaseProfileInputs` being reused by the thin authenticated `PATCH \/cases\/:caseId\/profile-inputs` route seam/i,
  );
  assert.match(
    docsSection,
    /current bounded runtime\/test surface already evidenced in `packages\/database\/src\/index\.js`, `apps\/api\/src\/index\.js`, `tests\/profile-input-persistence\.test\.js`, and `tests\/profile-input-api\.test\.js` is limited to 1 shared writer-helper definition, 1 database export surface, 1 API import surface, 1 route write-through call, 1 invalid-`caseId` persistence error branch, 1 unsupported-profile persistence error branch, 1 shared validation step, 1 canonicalization step, 1 store read, 1 record-normalization step, 1 store write, 1 canonical persisted snapshot return surface, and current runtime proof across the existing profile-input persistence\/route tests/i,
  );
  assert.match(
    docsSection,
    /already-frozen case-level persisted `profile_inputs` snapshot seam remains the broader persistence boundary that includes both reader and writer surfaces, while this helper seam is the narrower shared writer slice inside that broader persistence boundary/i,
  );
  assert.match(
    docsSection,
    /already-frozen shared database case-profile-input reader seam remains outside this helper seam because persisted reads are a separate frozen boundary/i,
  );
  assert.match(
    docsSection,
    /thin authenticated `GET \/cases\/:caseId\/profile-inputs` read seam remains a distinct route boundary/i,
  );
  assert.match(
    docsSection,
    /thin authenticated `GET \/cases\/:caseId\/profile-dossier` read\/projection seam remains a distinct route boundary/i,
  );
  assert.match(
    docsSection,
    /thin authenticated `GET \/cases\/:caseId\/release-eval\/latest` latest-read seam remains a distinct route boundary/i,
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
    /governance profile-dossier projection \/ snapshot \/ attach \/ `snapshot_status` helper seams remain outside this helper seam because dossier projection assembly, snapshot resolution, attach behavior, and shared currentness derivation occur above or beside the database writer boundary/i,
  );
  assert.match(
    docsSection,
    /lower schemas profile-dossier validator \/ projection-validator seams remain outside this helper seam because schema-side dossier validation and projection validation are not defined by the case-profile-input writer boundary/i,
  );
  assert.match(
    docsSection,
    /downstream persistence\/runtime behavior beyond this helper seam remains outside because release-eval\/export persistence orchestration, route orchestration, and post-write consumers are higher or adjacent flows rather than the writer seam itself/i,
  );
  assert.match(
    docsSection,
    /future database helpers that need the same persisted case-profile-input write behavior should extend the existing `upsertCaseProfileInputs` seam instead of introducing a parallel profile-input writer stack/i,
  );
  assert.match(
    docsSection,
    /does not change runtime behavior, persistence semantics, filesystem behavior, API behavior, or fail-closed behavior/i,
  );

  assert.match(
    writerSlice,
    /async function upsertCaseProfileInputs\(\s*caseId,\s*profileInputSnapshot,\s*options = \{\}\s*\)\s*\{/,
  );
  assert.match(
    writerSlice,
    /if \(!caseId \|\| typeof caseId !== "string"\) \{\s*throw createPersistenceError\("ERR_CASE_ID_INVALID", "caseId must be a non-empty string"\);\s*\}/s,
  );
  assert.match(
    writerSlice,
    /!hasJurisdictionProfileCapability\(\s*profileInputSnapshot\?\.jurisdiction_profile_key,\s*"profile_inputs",\s*\)/s,
  );
  assert.match(
    writerSlice,
    /throw createPersistenceError\(\s*"ERR_UNSUPPORTED_JURISDICTION_PROFILE",\s*"jurisdiction_profile_key is not supported",[\s\S]*jurisdiction_profile_key: profileInputSnapshot\?\.jurisdiction_profile_key,[\s\S]*\);/,
  );
  assert.match(writerSlice, /validateProfileInputSnapshot\(profileInputSnapshot\);/);
  assert.match(
    writerSlice,
    /const canonicalSnapshot = deriveProfileInputSnapshot\(profileInputSnapshot\);/,
  );
  assert.match(
    writerSlice,
    /const store = await readStore\(caseProfileInputsFileName, options\);/,
  );
  assert.match(
    writerSlice,
    /const record = normalizeRecord\(caseId, canonicalSnapshot, store\[caseId\]\);/,
  );
  assert.match(writerSlice, /await writeStore\(caseProfileInputsFileName, store, options\);/);
  assert.match(
    writerSlice,
    /return \{\s*jurisdiction_profile_key: record\.jurisdiction_profile_key,\s*profile_input_summary: record\.profile_input_summary,\s*profile_input_lane_snapshot: record\.profile_input_lane_snapshot,\s*\};/s,
  );
  assert.equal(
    (databaseIndexText.match(/async function upsertCaseProfileInputs\(/g) || []).length,
    1,
  );
  assert.equal((databaseIndexText.match(/\bupsertCaseProfileInputs\b/g) || []).length, 2);
  assert.doesNotMatch(writerSlice, /getCaseProfileInputs\(/);
  assert.doesNotMatch(writerSlice, /getLatestCaseReleaseEvalRun\(/);
  assert.doesNotMatch(writerSlice, /getLatestCaseProfileDossierProjection\(/);
  assert.doesNotMatch(writerSlice, /resolvePersistedReleaseEvalProfileDossierProjection\(/);
  assert.doesNotMatch(writerSlice, /resolvePersistedReleaseEvalProfileDossierSnapshot\(/);
  assert.doesNotMatch(writerSlice, /attachPersistedReleaseEvalRun\(/);

  assert.equal((apiIndexText.match(/\bupsertCaseProfileInputs\b/g) || []).length, 2);
  assert.match(
    apiIndexText,
    /const \{[\s\S]*upsertCaseProfileInputs,[\s\S]*\} = require\("\.\.\/\.\.\/\.\.\/packages\/database\/src\/index\.js"\);/,
  );
  assert.match(
    routePatchSlice,
    /const profileInputs = await upsertCaseProfileInputs\(\s*routeMatch\.caseId,\s*request\.body,\s*options,\s*\);/,
  );
  assert.match(routePatchSlice, /return jsonResponse\(200, profileInputs\);/);
  assert.doesNotMatch(routePatchSlice, /readStore\(/);
  assert.doesNotMatch(routePatchSlice, /writeStore\(/);
  assert.doesNotMatch(routePatchSlice, /normalizeRecord\(/);
  assert.doesNotMatch(routePatchSlice, /deriveProfileInputSnapshot\(/);
  assert.doesNotMatch(routePatchSlice, /createPersistenceError\(/);

  assert.match(
    profileInputPersistenceTestText,
    /test\("persisted roundtrip for a valid SWE_BODELNING profile input snapshot"/,
  );
  assert.match(
    profileInputPersistenceTestText,
    /test\("invalid input shape is rejected before persistence"/,
  );
  assert.match(
    profileInputPersistenceTestText,
    /test\("invalid evidence-reference field shape is rejected before persistence"/,
  );
  assert.match(
    profileInputPersistenceTestText,
    /test\("non-SWE_BODELNING profile data is rejected at the persistence boundary"/,
  );
  assert.match(
    profileInputPersistenceTestText,
    /test\("stored profile_input_summary and profile_input_lane_snapshot preserve the expected shape"/,
  );

  assert.match(
    profileInputApiTestText,
    /test\("successful PATCH for a tenant-owned SWE_BODELNING case with valid input"/,
  );
  assert.match(
    profileInputApiTestText,
    /assert\.deepEqual\(response\.body, body\);/,
  );
  assert.match(
    profileInputApiTestText,
    /test\("same-tenant supported-profile mismatch is rejected before persistence"/,
  );
});
