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
const releaseEvalRunApiTestText = fs.readFileSync(
  path.join(__dirname, "release-eval-run-api.test.js"),
  "utf8",
);

test("docs freeze the thin authenticated release-eval latest-read route seam as the exact GET latest-read boundary", () => {
  const routeHandlerSlice = apiIndexText.slice(
    apiIndexText.indexOf("async function handleCaseReleaseEvalLatestRoute("),
    apiIndexText.indexOf("async function handleCaseProfileDossierRoute("),
  );
  const latestReadHelperSlice = databaseIndexText.slice(
    databaseIndexText.indexOf("async function getLatestCaseReleaseEvalRun("),
    databaseIndexText.indexOf("async function getLatestCaseProfileDossierProjection("),
  );

  assert.match(
    docsText,
    /Thin Authenticated Release Eval Latest-Read Seam Freeze/i,
  );
  assert.match(
    docsText,
    /thin authenticated `release_eval` latest-read seam is now frozen as the baseline runtime\/read seam for this latest-read path/i,
  );
  assert.match(
    docsText,
    /the only currently evidenced latest-read surface in this freeze is `GET \/cases\/:caseId\/release-eval\/latest`/i,
  );
  assert.match(
    docsText,
    /authenticated\/case-access-controlled boundary behavior at the thin route edge/i,
  );
  assert.match(
    docsText,
    /read-only latest persisted-run passthrough only when the persisted canonical release_eval run `jurisdiction_profile_key` matches the authorized case-context `jurisdiction_profile_key`/i,
  );
  assert.match(
    docsText,
    /same-tenant supported-profile drift in persisted latest release_eval data rejects machine-readably with HTTP `409` `ERR_RELEASE_EVAL_JURISDICTION_PROFILE_MISMATCH` instead of returning the mismatched run/i,
  );
  assert.match(
    docsText,
    /fail-closed no-persisted-run responses from this exact latest-read route with HTTP 404 ERR_RELEASE_EVAL_RUN_NOT_FOUND plus route-level case_id detail/i,
  );
  assert.match(
    docsText,
    /current relationship to the persisted latest release_eval read path already evidenced for this seam is limited to the route reading through `getLatestCaseReleaseEvalRun` and returning the resulting canonical latest release_eval run unchanged on success, while the already-frozen case-level persisted `release_eval_run` seam remains a separate lower persistence boundary/i,
  );
  assert.match(
    docsText,
    /current relationship to the broader already-frozen `ERR_CASE_ACCESS_DENIED` route-family partition is limited to this exact route reaching the existing tenant\/case isolation branch through shared auth\/access logic, while broader `ERR_CASE_ACCESS_DENIED` family behavior remains outside this seam/i,
  );
  assert.match(
    docsText,
    /current bounded runtime\/test surface already evidenced in `apps\/api\/src\/index\.js` and `tests\/release-eval-run-api\.test\.js` is limited to 1 authenticated `GET \/cases\/:caseId\/release-eval\/latest` handler definition, 1 case-access-denied branch through the existing shared auth\/access path, 1 latest persisted-read call to `getLatestCaseReleaseEvalRun`, 1 no-persisted-run 404 branch, 1 jurisdiction-profile-mismatch 409 branch, 1 success passthrough response, and current runtime proof across the existing release-eval latest-route tests in `tests\/release-eval-run-api\.test\.js`/i,
  );
  assert.match(
    docsText,
    /adjacent `profile_inputs` persisted-read seam remains a distinct route boundary and is not redefined by this latest-read seam/i,
  );
  assert.match(
    docsText,
    /adjacent `profile_dossier` read\/projection seam remains a distinct route boundary and is not redefined by this latest-read seam/i,
  );
  assert.match(
    docsText,
    /governance release-eval profile-dossier projection \/ snapshot \/ attach helper seams and governance profile-dossier projection \/ snapshot \/ attach \/ `snapshot_status` helper seams remain outside this thin route seam because latest-run reads consume the persisted latest release_eval payload and any already-attached dossier snapshot passthrough rather than owning dossier projection assembly, snapshot resolution, attach behavior, or shared currentness derivation/i,
  );
  assert.match(
    docsText,
    /lower schemas validator \/ projection seams remain outside this thin route seam because schema-side validation and projection logic are not defined by the latest persisted release_eval read boundary/i,
  );
  assert.match(
    docsText,
    /downstream persistence\/runtime behavior beyond this thin latest-read seam remains outside because canonical latest release_eval storage lookup and broader reconciliation\/attach\/runtime orchestration are lower boundaries consumed by the route rather than defined by it/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, latest-read semantics, schema behavior, or fail-closed behavior/i,
  );

  assert.match(
    routeHandlerSlice,
    /async function handleCaseReleaseEvalLatestRoute\(\s*request,\s*options = \{\}\s*\)\s*\{/,
  );
  assert.match(
    routeHandlerSlice,
    /parseCaseReleaseEvalLatestPath\(request\.path\)/,
  );
  assert.match(
    routeHandlerSlice,
    /loadAuthorizedCaseContext\(\s*routeMatch\.caseId,\s*request\.auth,\s*options\.loadCaseContext,\s*"release_eval",\s*\)/,
  );
  assert.match(routeHandlerSlice, /if \(request\.method !== "GET"\)/);
  assert.match(
    routeHandlerSlice,
    /const releaseEvalRun = await getLatestCaseReleaseEvalRun\(routeMatch\.caseId, options\);/,
  );
  assert.match(
    routeHandlerSlice,
    /if \(!releaseEvalRun\) \{\s*return errorResponse\(404, "ERR_RELEASE_EVAL_RUN_NOT_FOUND", \{\s*case_id: routeMatch\.caseId,\s*\}\);\s*\}/s,
  );
  assert.match(
    routeHandlerSlice,
    /return errorResponse\(409, "ERR_RELEASE_EVAL_JURISDICTION_PROFILE_MISMATCH", \{\s*case_id: routeMatch\.caseId,\s*jurisdiction_profile_key: releaseEvalRun\.jurisdiction_profile_key,\s*expected_jurisdiction_profile_key:\s*authorization\.caseContext\.jurisdiction_profile_key,\s*\}\);/s,
  );
  assert.match(routeHandlerSlice, /return jsonResponse\(200, releaseEvalRun\);/);
  assert.equal(
    (routeHandlerSlice.match(/getLatestCaseReleaseEvalRun\(/g) || []).length,
    1,
  );
  assert.equal(
    (routeHandlerSlice.match(/ERR_RELEASE_EVAL_RUN_NOT_FOUND/g) || []).length,
    1,
  );
  assert.equal(
    (routeHandlerSlice.match(/ERR_RELEASE_EVAL_JURISDICTION_PROFILE_MISMATCH/g) || [])
      .length,
    1,
  );
  assert.doesNotMatch(routeHandlerSlice, /getCaseProfileInputs\(/);
  assert.doesNotMatch(routeHandlerSlice, /getLatestCaseProfileDossierProjection\(/);
  assert.doesNotMatch(routeHandlerSlice, /resolveReleaseEvalProfileDossierProjection\(/);
  assert.doesNotMatch(routeHandlerSlice, /resolveReleaseEvalProfileDossierSnapshot\(/);
  assert.doesNotMatch(routeHandlerSlice, /attachReleaseEvalProfileDossierSnapshot\(/);
  assert.doesNotMatch(routeHandlerSlice, /resolveSWEBodelningProfileDossierProjection\(/);
  assert.doesNotMatch(routeHandlerSlice, /resolveCMDProfileDossierProjection\(/);
  assert.doesNotMatch(routeHandlerSlice, /resolveSWEBodelningProfileDossierSnapshot\(/);
  assert.doesNotMatch(routeHandlerSlice, /resolveCMDProfileDossierSnapshot\(/);
  assert.doesNotMatch(routeHandlerSlice, /attachSWEBodelningProfileDossierSnapshot\(/);
  assert.doesNotMatch(routeHandlerSlice, /attachCMDProfileDossierSnapshot\(/);
  assert.doesNotMatch(routeHandlerSlice, /deriveSWEBodelningProfileDossierSnapshotStatus\(/);
  assert.doesNotMatch(routeHandlerSlice, /deriveCMDProfileDossierSnapshotStatus\(/);

  assert.match(
    latestReadHelperSlice,
    /async function getLatestCaseReleaseEvalRun\(\s*caseId,\s*options = \{\}\s*\)\s*\{[\s\S]*const store = await readStore\(releaseEvalRunsFileName, options\);[\s\S]*const caseRuns = store\[caseId\];[\s\S]*if \(!Array\.isArray\(caseRuns\) \|\| caseRuns\.length === 0\) \{\s*return null;\s*\}[\s\S]*const latestReleaseEvalRecord = caseRuns\[caseRuns\.length - 1\];[\s\S]*const latestReleaseEvalRun = latestReleaseEvalRecord\.release_eval_payload;[\s\S]*const caseProfileInputs = await getCaseProfileInputs\(caseId, options\);[\s\S]*return attachPersistedReleaseEvalRun\(latestReleaseEvalRun, caseProfileInputs, \{\s*persisted_at: latestReleaseEvalRecord\.persisted_at,\s*\}\);[\s\S]*\}/,
  );

  assert.match(
    releaseEvalRunApiTestText,
    /test\("successful GET for a tenant-owned SWE_BODELNING case with persisted latest release eval"/,
  );
  assert.match(
    releaseEvalRunApiTestText,
    /test\("successful GET for a tenant-owned CMD_PROFILE case returns the persisted release_eval unchanged"/,
  );
  assert.match(
    releaseEvalRunApiTestText,
    /test\("tenant\/case isolation rejection remains enforced for latest release eval route"/,
  );
  assert.match(
    releaseEvalRunApiTestText,
    /assert\.equal\(response\.body\.error\.code, "ERR_CASE_ACCESS_DENIED"\);/,
  );
  assert.match(
    releaseEvalRunApiTestText,
    /test\("no-persisted-run fail-closed response remains explicit for the latest release eval route"/,
  );
  assert.match(
    releaseEvalRunApiTestText,
    /code: "ERR_RELEASE_EVAL_RUN_NOT_FOUND"/,
  );
  assert.match(
    releaseEvalRunApiTestText,
    /test\("same-tenant persisted release eval profile drift is rejected instead of returning the mismatched latest run"/,
  );
  assert.match(
    releaseEvalRunApiTestText,
    /code: "ERR_RELEASE_EVAL_JURISDICTION_PROFILE_MISMATCH"/,
  );
});
