const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const {
  handleCaseExportPackageRefreshRoute,
} = require("../apps/api/src/index.js");
const {
  getLatestCaseExportPackageSnapshot,
  refreshCaseReleaseEvalRun,
  upsertCaseProfileInputs,
} = require("../packages/database/src/index.js");
const {
  validateCMDExportPackage,
  validateSWEBodelningExportPackage,
} = require("../packages/schemas/src/index.js");

const docsPath = path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md");
const docsText = fs.readFileSync(docsPath, "utf8");
const apiIndexPath = path.join(__dirname, "..", "apps", "api", "src", "index.js");
const apiIndexText = fs.readFileSync(apiIndexPath, "utf8");

function createStorageDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "governance-contracts-export-package-refresh-api-"));
}

function createCaseContextLoader(caseContexts) {
  return async function loadCaseContext(caseId) {
    return caseContexts[caseId] ?? null;
  };
}

function createProfileInputs(overrides = {}) {
  return {
    jurisdiction_profile_key: "SWE_BODELNING",
    profile_input_summary: {
      required_lane_count: 3,
      lanes_with_value_count: 2,
      missing_value_lane_keys: ["shared_intent"],
    },
    profile_input_lane_snapshot: {
      economic_contribution: {
        has_value: true,
        value: "documented",
        evidence_object_ids: ["evidence-1"],
      },
      shared_use: {
        has_value: true,
        value: "residence",
        evidence_object_ids: ["evidence-2"],
      },
      shared_intent: {
        has_value: false,
        value: null,
        evidence_object_ids: [],
      },
    },
    ...overrides,
  };
}

function createReleaseEvalSeed(overrides = {}) {
  return {
    jurisdiction_profile_key: "SWE_BODELNING",
    release_eval_run_id: "release-eval-run-1",
    evaluator_version: "SHOULD_NOT_BE_PASSED_THROUGH",
    release_gate: "SHOULD_NOT_BE_PASSED_THROUGH",
    release_eval_freshness: "SHOULD_NOT_BE_PASSED_THROUGH",
    ...overrides,
  };
}

function createCMDProfileInputs(overrides = {}) {
  return {
    jurisdiction_profile_key: "CMD_PROFILE",
    profile_input_summary: {
      required_lane_count: 1,
      lanes_with_value_count: 1,
      missing_value_lane_keys: [],
    },
    profile_input_lane_snapshot: {
      "cmd_primary_signal": {
        has_value: true,
        value: "documented",
        evidence_object_ids: ["cmd-evidence-1"],
      },
    },
    ...overrides,
  };
}

function createCMDReleaseEvalSeed(overrides = {}) {
  return {
    jurisdiction_profile_key: "CMD_PROFILE",
    release_eval_run_id: "cmd-release-eval-run-1",
    evaluator_version: "IGNORED_BY_GOVERNANCE",
    release_gate: "IGNORED_BY_GOVERNANCE",
    release_eval_freshness: "IGNORED_BY_GOVERNANCE",
    ...overrides,
  };
}

test("docs freeze the thin authenticated export_package refresh seam as a distinct canonical runtime/refresh seam", () => {
  assert.match(
    docsText,
    /Thin Authenticated Export Package Refresh Seam Freeze/i,
  );
  assert.match(
    docsText,
    /thin authenticated `export_package` refresh seam is now frozen as the baseline runtime\/refresh seam/i,
  );
  assert.match(
    docsText,
    /only currently evidenced refresh surface in this freeze is `POST \/cases\/:caseId\/export-package\/refresh`/i,
  );
  assert.match(
    docsText,
    /authenticated\/case-access-controlled boundary behavior at the thin route edge/i,
  );
  assert.match(
    docsText,
    /thin POST wrapper behavior that delegates to the existing shared-governance export package refresh\/create helper path/i,
  );
  assert.match(
    docsText,
    /fail-closed route-edge invariant that the latest upstream release_eval and embedded profile_dossier `jurisdiction_profile_key` values must equal the authorized case-context `jurisdiction_profile_key` before refresh persistence/i,
  );
  assert.match(
    docsText,
    /same-tenant supported-profile drift in already-persisted upstream release_eval\/profile_dossier data rejects machine-readably with HTTP `409` `ERR_EXPORT_PACKAGE_UPSTREAM_JURISDICTION_PROFILE_MISMATCH` before a fresh export package snapshot is persisted/i,
  );
  assert.match(
    docsText,
    /persisted canonical export package snapshot response passthrough from that existing refresh helper path only after the route-edge upstream profile-basis invariant passes and without latest-read semantics inside the route itself/i,
  );
  assert.match(
    docsText,
    /shared `snapshot_status` seam governs shared currentness semantics where relevant and remains a separate frozen shared currentness boundary that this refresh seam does not redefine/i,
  );
  assert.match(
    docsText,
    /shared API error-envelope seam and its frozen subfamilies remain the governing boundary for machine-readable refresh error envelopes/i,
  );
  assert.match(
    docsText,
    /thin `export_package` latest-read seam remains a distinct read boundary/i,
  );
  assert.match(
    docsText,
    /surrounding `export_package` projection and refresh machinery remains a broader documented runtime\/helper area, and this refresh seam is narrower than that surrounding machinery/i,
  );
  assert.match(
    docsText,
    /does not itself redefine latest-read, delivery, or export-package derivation \/ rebuild behavior/i,
  );
  assert.match(
    docsText,
    /no undocumented broadening of this refresh seam into latest-read, delivery, derivation, reconstruction, or neutral-model alignment should be introduced/i,
  );
  assert.match(
    docsText,
    /the seam should remain a thin authenticated refresh boundary unless explicit contract detail changes/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, refresh semantics, schema behavior, or fail-closed behavior/i,
  );

  assert.match(
    apiIndexText,
    /async function handleCaseExportPackageRefreshRoute\(/,
  );
  assert.match(
    apiIndexText,
    /loadAuthorizedCaseContext\(\s+routeMatch\.caseId,\s+request\.auth,\s+options\.loadCaseContext,\s+"export_package"/,
  );
  assert.match(apiIndexText, /if \(request\.method !== "POST"\)/);
  assert.match(
    apiIndexText,
    /await getLatestCaseReleaseEvalRun\(routeMatch\.caseId,\s+options\)/,
  );
  assert.match(
    apiIndexText,
    /releaseEvalJurisdictionProfileKey !== expectedJurisdictionProfileKey/,
  );
  assert.match(
    apiIndexText,
    /profileDossierJurisdictionProfileKey !== expectedJurisdictionProfileKey/,
  );
  assert.match(
    apiIndexText,
    /ERR_EXPORT_PACKAGE_UPSTREAM_JURISDICTION_PROFILE_MISMATCH/,
  );
  assert.match(
    apiIndexText,
    /await refreshCaseExportPackageSnapshot\(/,
  );
  assert.match(
    apiIndexText,
    /return jsonResponse\(200, exportPackageSnapshot\)/,
  );
});

test("successful refresh for a tenant-owned SWE_BODELNING case with canonical dossier data", async () => {
  const storageDir = createStorageDir();
  const loadCaseContext = createCaseContextLoader({
    "case-1": {
      tenant_id: "tenant-1",
      jurisdiction_profile_key: "SWE_BODELNING",
    },
  });

  await upsertCaseProfileInputs("case-1", createProfileInputs(), { storageDir });
  await refreshCaseReleaseEvalRun("case-1", createReleaseEvalSeed(), { storageDir });

  const response = await handleCaseExportPackageRefreshRoute(
    {
      method: "POST",
      path: "/cases/case-1/export-package/refresh",
      auth: { tenantId: "tenant-1" },
      body: { generated_at: "2026-03-23T12:00:00.000Z" },
    },
    { loadCaseContext, storageDir },
  );

  const latest = await getLatestCaseExportPackageSnapshot("case-1", { storageDir });

  assert.equal(response.status, 200);
  assert.deepEqual(response.body, latest);
  assert.deepEqual(validateSWEBodelningExportPackage(response.body), response.body);
});

test("successful refresh for a tenant-owned CMD_PROFILE case with persisted dossier data produces a canonical export package", async () => {
  const storageDir = createStorageDir();
  const loadCaseContext = createCaseContextLoader({
    "case-cmd": {
      tenant_id: "tenant-1",
      jurisdiction_profile_key: "CMD_PROFILE",
    },
  });

  await upsertCaseProfileInputs("case-cmd", createCMDProfileInputs(), { storageDir });
  const persistedReleaseEval = await refreshCaseReleaseEvalRun(
    "case-cmd",
    createCMDReleaseEvalSeed(),
    { storageDir },
  );

  const response = await handleCaseExportPackageRefreshRoute(
    {
      method: "POST",
      path: "/cases/case-cmd/export-package/refresh",
      auth: { tenantId: "tenant-1" },
      body: { generated_at: "2026-03-23T12:00:00.000Z" },
    },
    { loadCaseContext, storageDir },
  );

  const latest = await getLatestCaseExportPackageSnapshot("case-cmd", { storageDir });

  assert.equal(response.status, 200);
  assert.deepEqual(response.body, latest);
  assert.deepEqual(validateCMDExportPackage(response.body), response.body);
  assert.deepEqual(
    response.body.profile_dossier_snapshot,
    persistedReleaseEval.profile_dossier_snapshot,
  );
  assert.equal(
    response.body.canonical_source.release_eval_run_id,
    persistedReleaseEval.release_eval_run_id,
  );
  assert.equal(
    response.body.canonical_source.evaluator_version,
    persistedReleaseEval.evaluator_version,
  );
  assert.equal(response.body.canonical_source.jurisdiction_profile_key, "CMD_PROFILE");
  assert.equal(typeof response.body.canonical_source.persisted_at, "string");
});

test("tenant/case isolation rejection", async () => {
  const response = await handleCaseExportPackageRefreshRoute(
    {
      method: "POST",
      path: "/cases/case-2/export-package/refresh",
      auth: { tenantId: "tenant-1" },
      body: { generated_at: "2026-03-23T12:00:00.000Z" },
    },
    {
      loadCaseContext: createCaseContextLoader({
        "case-2": {
          tenant_id: "tenant-2",
          jurisdiction_profile_key: "SWE_BODELNING",
        },
      }),
      storageDir: createStorageDir(),
    },
  );

  assert.equal(response.status, 403);
  assert.equal(response.body.error.code, "ERR_CASE_ACCESS_DENIED");
});

test("no-canonical-dossier fail-closed response", async () => {
  const storageDir = createStorageDir();
  const loadCaseContext = createCaseContextLoader({
    "case-3": {
      tenant_id: "tenant-1",
      jurisdiction_profile_key: "SWE_BODELNING",
    },
  });

  const response = await handleCaseExportPackageRefreshRoute(
    {
      method: "POST",
      path: "/cases/case-3/export-package/refresh",
      auth: { tenantId: "tenant-1" },
      body: { generated_at: "2026-03-23T12:00:00.000Z" },
    },
    { loadCaseContext, storageDir },
  );

  assert.equal(response.status, 404);
  assert.equal(response.body.error.code, "ERR_PROFILE_DOSSIER_SNAPSHOT_NOT_FOUND");
  assert.equal(response.body.error.case_id, "case-3");
});

test("no-persisted-dossier fail-closed response for CMD_PROFILE", async () => {
  const storageDir = createStorageDir();
  const loadCaseContext = createCaseContextLoader({
    "case-cmd-missing": {
      tenant_id: "tenant-1",
      jurisdiction_profile_key: "CMD_PROFILE",
    },
  });

  const response = await handleCaseExportPackageRefreshRoute(
    {
      method: "POST",
      path: "/cases/case-cmd-missing/export-package/refresh",
      auth: { tenantId: "tenant-1" },
      body: { generated_at: "2026-03-23T12:00:00.000Z" },
    },
    { loadCaseContext, storageDir },
  );

  assert.equal(response.status, 404);
  assert.equal(response.body.error.code, "ERR_PROFILE_DOSSIER_SNAPSHOT_NOT_FOUND");
  assert.equal(response.body.error.case_id, "case-cmd-missing");
});

test("same-tenant upstream profile drift is rejected before export package refresh persistence", async () => {
  const storageDir = createStorageDir();
  const loadCaseContext = createCaseContextLoader({
    "case-profile-drift": {
      tenant_id: "tenant-1",
      jurisdiction_profile_key: "SWE_BODELNING",
    },
  });

  await upsertCaseProfileInputs(
    "case-profile-drift",
    createCMDProfileInputs(),
    { storageDir },
  );
  await refreshCaseReleaseEvalRun(
    "case-profile-drift",
    createCMDReleaseEvalSeed(),
    { storageDir },
  );

  const response = await handleCaseExportPackageRefreshRoute(
    {
      method: "POST",
      path: "/cases/case-profile-drift/export-package/refresh",
      auth: { tenantId: "tenant-1" },
      body: { generated_at: "2026-03-23T12:00:00.000Z" },
    },
    { loadCaseContext, storageDir },
  );

  const latest = await getLatestCaseExportPackageSnapshot("case-profile-drift", {
    storageDir,
  });

  assert.equal(response.status, 409);
  assert.deepEqual(response.body, {
    error: {
      case_id: "case-profile-drift",
      code: "ERR_EXPORT_PACKAGE_UPSTREAM_JURISDICTION_PROFILE_MISMATCH",
      expected_jurisdiction_profile_key: "SWE_BODELNING",
      profile_dossier_jurisdiction_profile_key: "CMD_PROFILE",
      release_eval_jurisdiction_profile_key: "CMD_PROFILE",
    },
  });
  assert.equal(latest, null);
});

test("unsupported/non-SWE export-package response remains machine-readable and non-breaking", async () => {
  const response = await handleCaseExportPackageRefreshRoute(
    {
      method: "POST",
      path: "/cases/case-4/export-package/refresh",
      auth: { tenantId: "tenant-1" },
      body: { generated_at: "2026-03-23T12:00:00.000Z" },
    },
    {
      loadCaseContext: createCaseContextLoader({
        "case-4": {
          tenant_id: "tenant-1",
          jurisdiction_profile_key: "SWE_OTHER",
        },
      }),
      storageDir: createStorageDir(),
    },
  );

  assert.equal(response.status, 409);
  assert.equal(response.body.error.code, "ERR_UNSUPPORTED_JURISDICTION_PROFILE");
});

test("refresh response matches the persisted canonical snapshot rather than diverging", async () => {
  const storageDir = createStorageDir();
  const loadCaseContext = createCaseContextLoader({
    "case-5": {
      tenant_id: "tenant-1",
      jurisdiction_profile_key: "SWE_BODELNING",
    },
  });

  await upsertCaseProfileInputs("case-5", createProfileInputs(), { storageDir });
  await refreshCaseReleaseEvalRun("case-5", createReleaseEvalSeed(), { storageDir });

  const response = await handleCaseExportPackageRefreshRoute(
    {
      method: "POST",
      path: "/cases/case-5/export-package/refresh",
      auth: { tenantId: "tenant-1" },
      body: { generated_at: "2026-03-23T12:00:00.000Z" },
    },
    { loadCaseContext, storageDir },
  );

  const latest = await getLatestCaseExportPackageSnapshot("case-5", { storageDir });

  assert.equal(response.status, 200);
  assert.deepEqual(response.body, latest);
});

test("no readiness behavior changes are introduced", () => {
  const workerEntries = fs.readdirSync(path.join(__dirname, "..", "workers", "analyze"));
  assert.deepEqual(workerEntries, [".gitkeep"]);
  assert.match(docsText, /POST \/cases\/:caseId\/export-package\/refresh/);
  assert.match(
    docsText,
    /without route-local export derivation/,
  );
});
