const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const docsText = fs.readFileSync(
  path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md"),
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
const profileInputApiTestText = fs.readFileSync(
  path.join(__dirname, "profile-input-api.test.js"),
  "utf8",
);

test("docs freeze the thin authenticated profile-input write route seam as the exact PATCH validation/persistence boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Thin Authenticated Profile Inputs Write Seam Freeze[\s\S]*?(?=\n### )/,
  );
  const routeHandlerStart = apiIndexText.indexOf(
    "async function handleCaseProfileInputsRoute(",
  );
  const routePatchStart = apiIndexText.indexOf('if (request.method === "PATCH") {');
  const routeMethodFallback = apiIndexText.indexOf(
    'return errorResponse(405, "ERR_METHOD_NOT_ALLOWED"',
    routePatchStart,
  );

  assert.ok(docsSectionMatch, "expected thin profile-input write seam docs section");
  assert.notEqual(routeHandlerStart, -1, "expected profile-input route handler");
  assert.notEqual(routePatchStart, -1, "expected PATCH route branch");
  assert.notEqual(routeMethodFallback, -1, "expected method fallback branch");

  const docsSection = docsSectionMatch[0];
  const routeHandlerSlice = apiIndexText.slice(routeHandlerStart, routeMethodFallback);
  const routePatchSlice = apiIndexText.slice(routePatchStart, routeMethodFallback);

  assert.match(
    docsSection,
    /Thin Authenticated Profile Inputs Write Seam Freeze/i,
  );
  assert.match(
    docsSection,
    /the thin authenticated `profile_inputs` write seam is now frozen as the baseline runtime\/write seam for this write path/i,
  );
  assert.match(
    docsSection,
    /the only currently evidenced write surface in this freeze is `PATCH \/cases\/:caseId\/profile-inputs`/i,
  );
  assert.match(
    docsSection,
    /authenticated\/case-access-controlled boundary behavior at the thin route edge/i,
  );
  assert.match(
    docsSection,
    /thin PATCH validation using the existing shared profile input schema export and machine-readable invalid-body rejection path already evidenced by the current route and tests/i,
  );
  assert.match(
    docsSection,
    /fail-closed route-edge invariant that the PATCH body `jurisdiction_profile_key` must equal the authorized case-context `jurisdiction_profile_key` before persistence/i,
  );
  assert.match(
    docsSection,
    /same-tenant supported-profile mismatch rejects machine-readably with HTTP `409` `ERR_PROFILE_INPUT_JURISDICTION_PROFILE_MISMATCH` before persistence/i,
  );
  assert.match(
    docsSection,
    /persisted write\/update passthrough over the canonical profile input snapshot returned by the existing persistence path/i,
  );
  assert.match(
    docsSection,
    /current relationship to the persisted profile-input write path already evidenced for this seam is limited to the route validating the PATCH body, writing through `upsertCaseProfileInputs`, and returning the canonical persisted profile input snapshot unchanged on success, while the already-frozen database case-profile-input writer seam remains a separate lower persistence boundary/i,
  );
  assert.match(
    docsSection,
    /current relationship to the broader already-frozen `ERR_CASE_ACCESS_DENIED` route-family partition is limited to this exact route reaching the existing tenant\/case isolation branch through shared auth\/access logic, while broader `ERR_CASE_ACCESS_DENIED` family behavior remains outside this seam/i,
  );
  assert.match(
    docsSection,
    /current bounded runtime\/test surface already evidenced in `apps\/api\/src\/index\.js` and `tests\/profile-input-api\.test\.js` is limited to 1 authenticated `PATCH \/cases\/:caseId\/profile-inputs` handler branch inside `handleCaseProfileInputsRoute`, 1 case-access-denied branch through the existing shared auth\/access path, 1 shared schema validation call to `validateProfileInputSnapshot`, 2 currently evidenced invalid-body 422 branches in `tests\/profile-input-api\.test\.js`, 1 same-tenant supported-profile mismatch 409 branch, 1 persisted write call to `upsertCaseProfileInputs`, 1 success passthrough response, and current runtime proof across the existing profile-input route tests in `tests\/profile-input-api\.test\.js`/i,
  );
  assert.match(
    docsSection,
    /adjacent `GET \/cases\/:caseId\/profile-inputs` read seam remains a distinct persisted read boundary/i,
  );
  assert.match(
    docsSection,
    /adjacent `profile_dossier` read\/projection seam remains a distinct route boundary/i,
  );
  assert.match(
    docsSection,
    /adjacent `GET \/cases\/:caseId\/release-eval\/latest` latest-read seam remains a distinct route boundary/i,
  );
  assert.match(
    docsSection,
    /governance profile-dossier projection \/ snapshot \/ attach \/ `snapshot_status` helper seams remain outside this thin route seam because dossier projection assembly, snapshot resolution, attach behavior, and shared currentness derivation stay below or beside the persisted write edge/i,
  );
  assert.match(
    docsSection,
    /lower schemas profile-dossier validator \/ projection-validator seams remain outside this thin route seam because schema-side dossier validation and projection validation are not defined by the persisted `profile_inputs` write boundary/i,
  );
  assert.match(
    docsSection,
    /downstream persistence\/runtime behavior beyond this thin persisted-write seam remains outside because canonical profile-input storage\/update orchestration and broader persistence\/runtime flows are lower boundaries consumed by the route rather than defined by it/i,
  );
  assert.match(
    docsSection,
    /does not change runtime behavior, write semantics, schema behavior, or fail-closed behavior/i,
  );

  assert.match(
    routeHandlerSlice,
    /loadAuthorizedCaseContext\(\s*routeMatch\.caseId,\s*request\.auth,\s*options\.loadCaseContext,\s*"profile_inputs",\s*\)/,
  );
  assert.match(routePatchSlice, /if \(request\.method === "PATCH"\)/);
  assert.match(routePatchSlice, /validateProfileInputSnapshot\(request\.body\);/);
  assert.match(
    routePatchSlice,
    /return errorResponse\(422, error\.code \?\? "ERR_PROFILE_INPUT_INVALID", \{\s*\.\.\.error\.details,\s*message: error\.message,\s*\}\);/s,
  );
  assert.match(
    routePatchSlice,
    /request\.body\.jurisdiction_profile_key !==\s*authorization\.caseContext\.jurisdiction_profile_key/s,
  );
  assert.match(
    routePatchSlice,
    /return errorResponse\(409, "ERR_PROFILE_INPUT_JURISDICTION_PROFILE_MISMATCH", \{[\s\S]*case_id: routeMatch\.caseId,[\s\S]*expected_jurisdiction_profile_key:[\s\S]*authorization\.caseContext\.jurisdiction_profile_key,[\s\S]*\}\);/,
  );
  assert.match(
    routePatchSlice,
    /const profileInputs = await upsertCaseProfileInputs\(\s*routeMatch\.caseId,\s*request\.body,\s*options,\s*\);/,
  );
  assert.match(routePatchSlice, /return jsonResponse\(200, profileInputs\);/);
  assert.equal((routePatchSlice.match(/validateProfileInputSnapshot\(/g) || []).length, 1);
  assert.equal((routePatchSlice.match(/ERR_PROFILE_INPUT_INVALID/g) || []).length, 1);
  assert.equal(
    (routePatchSlice.match(/ERR_PROFILE_INPUT_JURISDICTION_PROFILE_MISMATCH/g) || [])
      .length,
    1,
  );
  assert.equal((routePatchSlice.match(/upsertCaseProfileInputs\(/g) || []).length, 1);
  assert.doesNotMatch(routePatchSlice, /getCaseProfileInputs\(/);
  assert.doesNotMatch(routePatchSlice, /ERR_PROFILE_INPUTS_NOT_FOUND/);
  assert.doesNotMatch(routePatchSlice, /getLatestCaseReleaseEvalRun\(/);
  assert.doesNotMatch(routePatchSlice, /getLatestCaseProfileDossierProjection\(/);
  assert.doesNotMatch(routePatchSlice, /resolveReleaseEvalProfileDossierProjection\(/);
  assert.doesNotMatch(routePatchSlice, /resolveSWEBodelningProfileDossierProjection\(/);
  assert.doesNotMatch(routePatchSlice, /resolveCMDProfileDossierProjection\(/);
  assert.doesNotMatch(routePatchSlice, /resolveSWEBodelningProfileDossierSnapshot\(/);
  assert.doesNotMatch(routePatchSlice, /resolveCMDProfileDossierSnapshot\(/);
  assert.doesNotMatch(routePatchSlice, /attachSWEBodelningProfileDossierSnapshot\(/);
  assert.doesNotMatch(routePatchSlice, /attachCMDProfileDossierSnapshot\(/);
  assert.doesNotMatch(routePatchSlice, /deriveSWEBodelningProfileDossierSnapshotStatus\(/);
  assert.doesNotMatch(routePatchSlice, /deriveCMDProfileDossierSnapshotStatus\(/);

  assert.match(
    databaseIndexText,
    /async function upsertCaseProfileInputs\(\s*caseId,\s*profileInputSnapshot,\s*options = \{\}\s*\)\s*\{[\s\S]*hasJurisdictionProfileCapability\(\s*profileInputSnapshot\?\.jurisdiction_profile_key,\s*"profile_inputs",\s*\)[\s\S]*validateProfileInputSnapshot\(profileInputSnapshot\);[\s\S]*const canonicalSnapshot = deriveProfileInputSnapshot\(profileInputSnapshot\);[\s\S]*const store = await readStore\(caseProfileInputsFileName, options\);[\s\S]*const record = normalizeRecord\(caseId, canonicalSnapshot, store\[caseId\]\);[\s\S]*await writeStore\(caseProfileInputsFileName, store, options\);[\s\S]*return \{\s*jurisdiction_profile_key: record\.jurisdiction_profile_key,\s*profile_input_summary: record\.profile_input_summary,\s*profile_input_lane_snapshot: record\.profile_input_lane_snapshot,\s*\};[\s\S]*\}/,
  );

  assert.match(
    profileInputApiTestText,
    /test\("successful PATCH for a tenant-owned SWE_BODELNING case with valid input"/,
  );
  assert.match(
    profileInputApiTestText,
    /test\("invalid input shape rejection"/,
  );
  assert.match(
    profileInputApiTestText,
    /test\("invalid evidence-reference field shape rejection"/,
  );
  assert.match(
    profileInputApiTestText,
    /test\("tenant\/case isolation rejection"/,
  );
  assert.match(
    profileInputApiTestText,
    /assert\.equal\(response\.body\.error\.code, "ERR_CASE_ACCESS_DENIED"\);/,
  );
  assert.match(
    profileInputApiTestText,
    /assert\.equal\(response\.body\.error\.code, "ERR_PROFILE_INPUT_INVALID"\);/,
  );
  assert.match(
    profileInputApiTestText,
    /test\("same-tenant supported-profile mismatch is rejected before persistence"/,
  );
  assert.match(
    profileInputApiTestText,
    /"ERR_PROFILE_INPUT_JURISDICTION_PROFILE_MISMATCH"/,
  );
  assert.match(
    profileInputApiTestText,
    /test\("persisted roundtrip preserves the expected summary and lane snapshot shape"/,
  );
});
