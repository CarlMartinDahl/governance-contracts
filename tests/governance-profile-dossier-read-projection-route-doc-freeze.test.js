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
const governanceIndexText = fs.readFileSync(
  path.join(__dirname, "..", "packages", "governance", "src", "index.js"),
  "utf8",
);
const databaseIndexText = fs.readFileSync(
  path.join(__dirname, "..", "packages", "database", "src", "index.js"),
  "utf8",
);
const profileDossierApiTestText = fs.readFileSync(
  path.join(__dirname, "profile-dossier-api.test.js"),
  "utf8",
);

test("docs freeze the thin authenticated profile-dossier read/projection route seam as the exact GET route boundary", () => {
  const routeHandlerSlice = apiIndexText.slice(
    apiIndexText.indexOf("async function handleCaseProfileDossierRoute("),
    apiIndexText.indexOf("async function handleCaseExportPackageLatestRoute("),
  );

  assert.match(
    docsText,
    /Thin Authenticated Profile Dossier Read\/Projection Seam Freeze/i,
  );
  assert.match(
    docsText,
    /the thin authenticated `profile_dossier` read\/projection seam is now frozen as the baseline runtime\/read seam for this route/i,
  );
  assert.match(
    docsText,
    /the only currently evidenced read\/projection surface in this freeze is `GET \/cases\/:caseId\/profile-dossier`/i,
  );
  assert.match(
    docsText,
    /authenticated\/case-access-controlled boundary behavior at the thin route edge/i,
  );
  assert.match(
    docsText,
    /current relationship to governance-side profile-dossier projection resolution already evidenced for this seam is limited to the route reading through `getLatestCaseProfileDossierProjection` and returning the resulting canonical dossier projection unchanged on success, while the already-frozen governance profile-dossier projection-helper seam and governance release-eval profile-dossier projection-helper seam remain separate lower helper boundaries/i,
  );
  assert.match(
    docsText,
    /current relationship to the broader already-frozen `ERR_CASE_ACCESS_DENIED` route-family partition is limited to this exact route reaching the existing tenant\/case isolation branch through shared auth\/access logic, while broader `ERR_CASE_ACCESS_DENIED` family behavior remains outside this seam/i,
  );
  assert.match(
    docsText,
    /current bounded runtime\/test surface already evidenced in `apps\/api\/src\/index\.js` and `tests\/profile-dossier-api\.test\.js` is limited to 1 authenticated `GET \/cases\/:caseId\/profile-dossier` handler definition, 1 case-access-denied branch through the existing shared auth\/access path, 1 read call to `getLatestCaseProfileDossierProjection`, 1 missing-snapshot 404 branch, 1 jurisdiction-profile mismatch 409 branch, 1 success passthrough response, and current runtime proof across the existing dossier-route tests in `tests\/profile-dossier-api\.test\.js`/i,
  );
  assert.match(
    docsText,
    /already-frozen governance profile-dossier snapshot-helper seam, governance profile-dossier attach-helper seam, and governance profile-dossier `snapshot_status` helper seam remain outside this thin route seam because snapshot resolution, attach behavior, and shared currentness derivation stay below the route edge/i,
  );
  assert.match(
    docsText,
    /lower schemas profile-dossier validator seam and lower schemas profile-dossier projection-validator seam remain outside this thin route seam because schema-side dossier validation stays below the route edge/i,
  );
  assert.match(
    docsText,
    /broader already-frozen shared `resource\/snapshot not found` API envelope partition\/prerequisites/i,
  );
  assert.match(
    docsText,
    /the seam should remain a thin authenticated read-only dossier projection boundary unless explicit contract detail changes/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, read\/projection semantics, schema behavior, or fail-closed behavior/i,
  );

  assert.match(
    routeHandlerSlice,
    /async function handleCaseProfileDossierRoute\(\s*request,\s*options = \{\}\s*\)\s*\{/,
  );
  assert.match(routeHandlerSlice, /parseCaseProfileDossierPath\(request\.path\)/);
  assert.match(
    routeHandlerSlice,
    /loadAuthorizedCaseContext\(\s*routeMatch\.caseId,\s*request\.auth,\s*options\.loadCaseContext,\s*"profile_dossier",\s*\)/,
  );
  assert.match(routeHandlerSlice, /if \(request\.method !== "GET"\)/);
  assert.match(
    routeHandlerSlice,
    /const profileDossierProjection = await getLatestCaseProfileDossierProjection\(\s*routeMatch\.caseId,\s*options,\s*\);/,
  );
  assert.match(
    routeHandlerSlice,
    /if \(!profileDossierProjection\) \{\s*return errorResponse\(404, "ERR_PROFILE_DOSSIER_SNAPSHOT_NOT_FOUND", \{\s*case_id: routeMatch\.caseId,\s*\}\);\s*\}/s,
  );
  assert.match(
    routeHandlerSlice,
    /return errorResponse\(409, "ERR_PROFILE_DOSSIER_JURISDICTION_PROFILE_MISMATCH", \{\s*case_id: routeMatch\.caseId,\s*jurisdiction_profile_key: profileDossierProjection\.jurisdiction_profile_key,\s*expected_jurisdiction_profile_key:\s*authorization\.caseContext\.jurisdiction_profile_key,\s*\}\);/s,
  );
  assert.match(routeHandlerSlice, /return jsonResponse\(200, profileDossierProjection\);/);
  assert.equal(
    (routeHandlerSlice.match(/getLatestCaseProfileDossierProjection\(/g) || []).length,
    1,
  );
  assert.equal(
    (routeHandlerSlice.match(/ERR_PROFILE_DOSSIER_SNAPSHOT_NOT_FOUND/g) || []).length,
    1,
  );
  assert.equal(
    (routeHandlerSlice.match(/ERR_PROFILE_DOSSIER_JURISDICTION_PROFILE_MISMATCH/g) || [])
      .length,
    1,
  );
  assert.doesNotMatch(routeHandlerSlice, /resolveReleaseEvalProfileDossierProjection\(/);
  assert.doesNotMatch(routeHandlerSlice, /resolveSWEBodelningProfileDossierProjection\(/);
  assert.doesNotMatch(routeHandlerSlice, /resolveCMDProfileDossierProjection\(/);
  assert.doesNotMatch(routeHandlerSlice, /resolveSWEBodelningProfileDossierSnapshot\(/);
  assert.doesNotMatch(routeHandlerSlice, /resolveCMDProfileDossierSnapshot\(/);
  assert.doesNotMatch(routeHandlerSlice, /attachSWEBodelningProfileDossierSnapshot\(/);
  assert.doesNotMatch(routeHandlerSlice, /attachCMDProfileDossierSnapshot\(/);
  assert.doesNotMatch(routeHandlerSlice, /deriveSWEBodelningProfileDossierSnapshotStatus\(/);
  assert.doesNotMatch(routeHandlerSlice, /deriveCMDProfileDossierSnapshotStatus\(/);

  assert.match(
    databaseIndexText,
    /async function getLatestCaseProfileDossierProjection\(\s*caseId,\s*options = \{\}\s*\)\s*\{[\s\S]*return resolvePersistedReleaseEvalProfileDossierProjection\(\s*latestReleaseEvalRun,\s*caseProfileInputs,\s*\{\s*persisted_at: latestReleaseEvalRecord\.persisted_at,\s*\},\s*\);[\s\S]*\}/,
  );
  assert.match(
    databaseIndexText,
    /function resolvePersistedReleaseEvalProfileDossierProjection\(\s*releaseEvalRun,\s*caseProfileInputs,\s*options = \{\},\s*\)\s*\{[\s\S]*return resolveReleaseEvalProfileDossierProjection\(\s*reconciledReleaseEvalRun,\s*options,\s*\);[\s\S]*\}/,
  );
  assert.match(
    governanceIndexText,
    /function resolveReleaseEvalProfileDossierProjection\(/,
  );
  assert.match(
    governanceIndexText,
    /function resolveSWEBodelningProfileDossierProjection\(/,
  );
  assert.match(
    governanceIndexText,
    /function resolveCMDProfileDossierProjection\(/,
  );

  assert.match(
    profileDossierApiTestText,
    /test\("successful dossier retrieval for a tenant-owned SWE_BODELNING case with canonical release_eval data"/,
  );
  assert.match(
    profileDossierApiTestText,
    /test\("tenant\/case isolation rejection for profile dossier route"/,
  );
  assert.match(
    profileDossierApiTestText,
    /assert\.equal\(response\.body\.error\.code, "ERR_CASE_ACCESS_DENIED"\);/,
  );
  assert.match(
    profileDossierApiTestText,
    /test\("no-canonical-run fail-closed response for profile dossier route"/,
  );
  assert.match(
    profileDossierApiTestText,
    /test\("successful tenant-owned GET \/cases\/:caseId\/profile-dossier for a CMD_PROFILE case with persisted release_eval baseline"/,
  );
  assert.match(
    profileDossierApiTestText,
    /test\("same-tenant persisted dossier profile drift is rejected instead of returning the mismatched dossier projection"/,
  );
  assert.match(
    profileDossierApiTestText,
    /test\("older dossier projection versions trigger fallback reprojection and the dossier route exposes that result unchanged"/,
  );
});
