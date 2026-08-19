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

test("docs freeze the thin authenticated profile-input read route seam as the exact GET persisted-read boundary", () => {
  const routeGetSlice = apiIndexText.slice(
    apiIndexText.indexOf("async function handleCaseProfileInputsRoute("),
    apiIndexText.indexOf('if (request.method === "PATCH") {'),
  );

  assert.match(
    docsText,
    /Thin Authenticated Profile Inputs Read Seam Freeze/i,
  );
  assert.match(
    docsText,
    /the thin authenticated persisted `profile_inputs` read seam is now frozen as the baseline runtime\/read seam for this read path/i,
  );
  assert.match(
    docsText,
    /the only currently evidenced read surface in this freeze is `GET \/cases\/:caseId\/profile-inputs`/i,
  );
  assert.match(
    docsText,
    /authenticated\/case-access-controlled boundary behavior at the thin route edge/i,
  );
  assert.match(
    docsText,
    /read-only passthrough over the persisted canonical profile input snapshot unchanged/i,
  );
  assert.match(
    docsText,
    /fail-closed missing-snapshot responses from this exact read route with HTTP 404 ERR_PROFILE_INPUTS_NOT_FOUND plus route-level case_id detail/i,
  );
  assert.match(
    docsText,
    /current relationship to the persisted profile-input read path already evidenced for this seam is limited to the route reading through `getCaseProfileInputs` and returning the persisted canonical profile input snapshot unchanged on success, while the already-frozen database case-profile-input reader seam remains a separate lower persistence boundary/i,
  );
  assert.match(
    docsText,
    /current relationship to the broader already-frozen `ERR_CASE_ACCESS_DENIED` route-family partition is limited to this exact route reaching the existing tenant\/case isolation branch through shared auth\/access logic, while broader `ERR_CASE_ACCESS_DENIED` family behavior remains outside this seam/i,
  );
  assert.match(
    docsText,
    /current bounded runtime\/test surface already evidenced in `apps\/api\/src\/index\.js` and `tests\/profile-input-api\.test\.js` is limited to 1 authenticated `GET \/cases\/:caseId\/profile-inputs` handler branch inside `handleCaseProfileInputsRoute`, 1 case-access-denied branch through the existing shared auth\/access path, 1 persisted read call to `getCaseProfileInputs`, 1 not-found 404 branch, 1 success passthrough response, and current runtime proof across the existing profile-input route tests in `tests\/profile-input-api\.test\.js`/i,
  );
  assert.match(
    docsText,
    /adjacent `PATCH \/cases\/:caseId\/profile-inputs` write seam remains a distinct write\/validation\/persistence boundary/i,
  );
  assert.match(
    docsText,
    /adjacent `profile_dossier` read\/projection seam remains a distinct route boundary/i,
  );
  assert.match(
    docsText,
    /governance profile-dossier projection \/ snapshot \/ attach \/ `snapshot_status` helper seams remain outside this thin route seam because dossier projection assembly, snapshot resolution, attach behavior, and shared currentness derivation stay below or beside the persisted read edge/i,
  );
  assert.match(
    docsText,
    /lower schemas profile-dossier validator \/ projection-validator seams remain outside this thin route seam because schema-side dossier validation and projection validation are not defined by the persisted `profile_inputs` read boundary/i,
  );
  assert.match(
    docsText,
    /downstream persistence\/runtime behavior beyond this thin persisted-read seam remains outside because canonical profile-input storage lookup and broader persistence\/runtime orchestration are lower boundaries consumed by the route rather than defined by it/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, read semantics, schema behavior, or fail-closed behavior/i,
  );

  assert.match(
    routeGetSlice,
    /async function handleCaseProfileInputsRoute\(\s*request,\s*options = \{\}\s*\)\s*\{/,
  );
  assert.match(routeGetSlice, /parseCaseProfileInputsPath\(request\.path\)/);
  assert.match(
    routeGetSlice,
    /loadAuthorizedCaseContext\(\s*routeMatch\.caseId,\s*request\.auth,\s*options\.loadCaseContext,\s*"profile_inputs",\s*\)/,
  );
  assert.match(routeGetSlice, /if \(request\.method === "GET"\)/);
  assert.match(
    routeGetSlice,
    /const profileInputs = await getCaseProfileInputs\(routeMatch\.caseId, options\);/,
  );
  assert.match(
    routeGetSlice,
    /if \(!profileInputs\) \{\s*return errorResponse\(404, "ERR_PROFILE_INPUTS_NOT_FOUND", \{\s*case_id: routeMatch\.caseId,\s*\}\);\s*\}/s,
  );
  assert.match(routeGetSlice, /return jsonResponse\(200, profileInputs\);/);
  assert.equal((routeGetSlice.match(/getCaseProfileInputs\(/g) || []).length, 1);
  assert.equal((routeGetSlice.match(/ERR_PROFILE_INPUTS_NOT_FOUND/g) || []).length, 1);
  assert.doesNotMatch(routeGetSlice, /getLatestCaseProfileDossierProjection\(/);
  assert.doesNotMatch(routeGetSlice, /resolveReleaseEvalProfileDossierProjection\(/);
  assert.doesNotMatch(routeGetSlice, /resolveSWEBodelningProfileDossierProjection\(/);
  assert.doesNotMatch(routeGetSlice, /resolveCMDProfileDossierProjection\(/);
  assert.doesNotMatch(routeGetSlice, /resolveSWEBodelningProfileDossierSnapshot\(/);
  assert.doesNotMatch(routeGetSlice, /resolveCMDProfileDossierSnapshot\(/);
  assert.doesNotMatch(routeGetSlice, /attachSWEBodelningProfileDossierSnapshot\(/);
  assert.doesNotMatch(routeGetSlice, /attachCMDProfileDossierSnapshot\(/);
  assert.doesNotMatch(routeGetSlice, /deriveSWEBodelningProfileDossierSnapshotStatus\(/);
  assert.doesNotMatch(routeGetSlice, /deriveCMDProfileDossierSnapshotStatus\(/);

  assert.match(
    databaseIndexText,
    /async function getCaseProfileInputs\(\s*caseId,\s*options = \{\}\s*\)\s*\{[\s\S]*const store = await readStore\(caseProfileInputsFileName, options\);[\s\S]*const record = store\[caseId\];[\s\S]*if \(!record\) \{\s*return null;\s*\}[\s\S]*return \{\s*jurisdiction_profile_key: record\.jurisdiction_profile_key,\s*profile_input_summary: record\.profile_input_summary,\s*profile_input_lane_snapshot: record\.profile_input_lane_snapshot,\s*\};[\s\S]*\}/,
  );
  assert.doesNotMatch(databaseIndexText, /resolveReleaseEvalProfileDossierProjection\(\s*routeMatch\.caseId/);

  assert.match(
    profileInputApiTestText,
    /test\("successful GET for a tenant-owned SWE_BODELNING case with persisted inputs"/,
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
    /assert\.equal\(getResponse\.body\.error\.code, "ERR_PROFILE_INPUTS_NOT_FOUND"\);/,
  );
  assert.match(
    profileInputApiTestText,
    /test\("persisted roundtrip preserves the expected summary and lane snapshot shape"/,
  );
});
