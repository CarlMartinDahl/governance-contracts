const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const {
  handleCaseExportPackageJsonArtifactDownloadRoute,
  handleCaseExportPackageJsonArtifactLatestRoute,
  handleCaseExportPackageJsonArtifactRefreshRoute,
} = require("../apps/api/src/index.js");
const {
  getLatestCaseExportPackageJsonArtifactProjection,
  getLatestCaseExportPackageJsonArtifactSnapshot,
  refreshCaseExportPackageJsonArtifactSnapshot,
  refreshCaseExportPackageSnapshot,
  refreshCaseReleaseEvalRun,
  upsertCaseProfileInputs,
} = require("../packages/database/src/index.js");
const {
  deriveExportPackageFromJsonArtifact,
  deriveExportPackageJsonArtifact,
  deriveSWEBodelningExportPackageJsonArtifact,
  exportPackageJsonArtifactAdapterRegistry,
  getExportPackageJsonArtifactAdapter,
  hasJurisdictionProfileCapability,
  resolveExportPackageJsonArtifactProjection,
  resolveSWEBodelningExportPackageJsonArtifactProjection,
} = require("../packages/governance/src/index.js");
const {
  validateCMDExportPackageJsonArtifactProjection,
  validateSWEBodelningExportPackageJsonArtifactProjection,
} = require("../packages/schemas/src/index.js");

const docsPath = path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md");
const docsText = fs.readFileSync(docsPath, "utf8");

function createStorageDir() {
  return fs.mkdtempSync(
    path.join(os.tmpdir(), "governance-contracts-export-json-artifact-adapter-"),
  );
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

test("the generic JSON artifact adapter registry exposes the explicit CMD_PROFILE entry", () => {
  const sweAdapter = getExportPackageJsonArtifactAdapter("SWE_BODELNING");
  const cmdAdapter = getExportPackageJsonArtifactAdapter("CMD_PROFILE");

  assert.equal(exportPackageJsonArtifactAdapterRegistry.SWE_BODELNING, sweAdapter);
  assert.equal(exportPackageJsonArtifactAdapterRegistry["CMD_PROFILE"], cmdAdapter);
  assert.deepEqual(Object.keys(exportPackageJsonArtifactAdapterRegistry), [
    "SWE_BODELNING",
    "CMD_PROFILE",
  ]);
  assert.equal(sweAdapter.jurisdiction_profile_key, "SWE_BODELNING");
  assert.equal(cmdAdapter.jurisdiction_profile_key, "CMD_PROFILE");
  assert.equal(typeof cmdAdapter.deriveExportPackageJsonArtifact, "function");
  assert.equal(typeof cmdAdapter.deriveExportPackageFromJsonArtifact, "function");
  assert.equal(typeof cmdAdapter.resolveExportPackageJsonArtifactProjection, "function");
});

test("JSON artifact refresh/create uses the registry path while preserving current SWE_BODELNING behavior", async () => {
  const storageDir = createStorageDir();

  await upsertCaseProfileInputs("case-1", createProfileInputs(), { storageDir });
  await refreshCaseReleaseEvalRun("case-1", createReleaseEvalSeed(), { storageDir });
  const exportPackage = await refreshCaseExportPackageSnapshot("case-1", {
    storageDir,
    generated_at: "2026-03-24T12:00:00.000Z",
  });

  const refreshed = await refreshCaseExportPackageJsonArtifactSnapshot("case-1", {
    storageDir,
  });
  const expectedViaRegistry = deriveExportPackageJsonArtifact(exportPackage);
  const expectedDirect = deriveSWEBodelningExportPackageJsonArtifact(exportPackage);

  assert.deepEqual(refreshed, expectedViaRegistry);
  assert.deepEqual(expectedViaRegistry, expectedDirect);
});

test("JSON artifact read/projection/currentness uses the same adapter path where applicable while preserving current behavior", async () => {
  const storageDir = createStorageDir();

  await upsertCaseProfileInputs("case-2", createProfileInputs(), { storageDir });
  const releaseEvalRun = await refreshCaseReleaseEvalRun(
    "case-2",
    createReleaseEvalSeed({ release_eval_run_id: "release-eval-run-2" }),
    { storageDir },
  );
  const exportPackage = await refreshCaseExportPackageSnapshot("case-2", {
    storageDir,
    generated_at: "2026-03-24T12:00:00.000Z",
  });
  const jsonArtifact = await refreshCaseExportPackageJsonArtifactSnapshot("case-2", {
    storageDir,
  });
  const projected = await getLatestCaseExportPackageJsonArtifactProjection("case-2", {
    storageDir,
  });
  const expectedViaRegistry = resolveExportPackageJsonArtifactProjection(
    jsonArtifact,
    exportPackage,
    releaseEvalRun.profile_dossier_snapshot,
  );
  const expectedDirect = resolveSWEBodelningExportPackageJsonArtifactProjection(
    jsonArtifact,
    exportPackage,
    releaseEvalRun.profile_dossier_snapshot,
  );

  assert.deepEqual(projected, expectedViaRegistry);
  assert.deepEqual(expectedViaRegistry, expectedDirect);
});

test("the CMD_PROFILE entry derives and resolves canonical JSON artifacts through the shared runtime seam", async () => {
  const storageDir = createStorageDir();
  const adapter = getExportPackageJsonArtifactAdapter("CMD_PROFILE");

  await upsertCaseProfileInputs("case-cmd", createCMDProfileInputs(), { storageDir });
  const releaseEvalRun = await refreshCaseReleaseEvalRun(
    "case-cmd",
    createCMDReleaseEvalSeed(),
    { storageDir },
  );
  const exportPackageSnapshot = await refreshCaseExportPackageSnapshot("case-cmd", {
    storageDir,
    generated_at: "2026-03-25T12:30:00.000Z",
  });
  const jsonArtifactSnapshot = adapter.deriveExportPackageJsonArtifact(
    exportPackageSnapshot,
  );
  const projected = adapter.resolveExportPackageJsonArtifactProjection(
    jsonArtifactSnapshot,
    exportPackageSnapshot,
    releaseEvalRun.profile_dossier_snapshot,
  );

  assert.equal(
    hasJurisdictionProfileCapability("CMD_PROFILE", "export_package_json_artifact"),
    true,
  );
  assert.deepEqual(
    jsonArtifactSnapshot,
    deriveExportPackageJsonArtifact(exportPackageSnapshot),
  );
  assert.deepEqual(
    adapter.deriveExportPackageFromJsonArtifact(jsonArtifactSnapshot),
    exportPackageSnapshot,
  );
  assert.deepEqual(
    deriveExportPackageFromJsonArtifact(jsonArtifactSnapshot),
    exportPackageSnapshot,
  );
  assert.deepEqual(
    projected,
    resolveExportPackageJsonArtifactProjection(
      jsonArtifactSnapshot,
      exportPackageSnapshot,
      releaseEvalRun.profile_dossier_snapshot,
    ),
  );
  assert.deepEqual(
    validateCMDExportPackageJsonArtifactProjection(projected),
    projected,
  );
  assert.equal(projected.snapshot_status.source, "persisted-current");
  assert.equal(projected.snapshot_status.snapshot_is_current, true);
});

test("API JSON artifact read/refresh/delivery routes stay thin and preserve current machine-readable non-SWE behavior", async () => {
  const storageDir = createStorageDir();
  const loadCaseContext = createCaseContextLoader({
    "case-3": {
      tenant_id: "tenant-1",
      jurisdiction_profile_key: "SWE_BODELNING",
    },
    "case-unsupported": {
      tenant_id: "tenant-1",
      jurisdiction_profile_key: "SWE_OTHER",
    },
  });

  await upsertCaseProfileInputs("case-3", createProfileInputs(), { storageDir });
  await refreshCaseReleaseEvalRun(
    "case-3",
    createReleaseEvalSeed({ release_eval_run_id: "release-eval-run-3" }),
    { storageDir },
  );
  await refreshCaseExportPackageSnapshot("case-3", {
    storageDir,
    generated_at: "2026-03-24T12:00:00.000Z",
  });

  const refreshResponse = await handleCaseExportPackageJsonArtifactRefreshRoute(
    {
      method: "POST",
      path: "/cases/case-3/export-package/json-artifact/refresh",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );
  const latestSnapshot = await getLatestCaseExportPackageJsonArtifactSnapshot("case-3", {
    storageDir,
  });

  assert.equal(refreshResponse.status, 200);
  assert.deepEqual(refreshResponse.body, latestSnapshot);

  const latestResponse = await handleCaseExportPackageJsonArtifactLatestRoute(
    {
      method: "GET",
      path: "/cases/case-3/export-package/json-artifact/latest",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );
  const latestProjection = await getLatestCaseExportPackageJsonArtifactProjection(
    "case-3",
    { storageDir },
  );

  assert.equal(latestResponse.status, 200);
  assert.deepEqual(latestResponse.body, latestProjection);

  const downloadResponse = await handleCaseExportPackageJsonArtifactDownloadRoute(
    {
      method: "GET",
      path: "/cases/case-3/export-package/json-artifact/download",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );

  assert.equal(downloadResponse.status, 200);
  assert.equal(downloadResponse.body, latestProjection.body_utf8);
  assert.equal(downloadResponse.headers["content-type"], latestProjection.content_type);

  const unsupportedLatestResponse = await handleCaseExportPackageJsonArtifactLatestRoute(
    {
      method: "GET",
      path: "/cases/case-unsupported/export-package/json-artifact/latest",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );
  const unsupportedRefreshResponse = await handleCaseExportPackageJsonArtifactRefreshRoute(
    {
      method: "POST",
      path: "/cases/case-unsupported/export-package/json-artifact/refresh",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );
  const unsupportedDownloadResponse = await handleCaseExportPackageJsonArtifactDownloadRoute(
    {
      method: "GET",
      path: "/cases/case-unsupported/export-package/json-artifact/download",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );

  assert.equal(unsupportedLatestResponse.status, 409);
  assert.equal(
    unsupportedLatestResponse.body.error.code,
    "ERR_UNSUPPORTED_JURISDICTION_PROFILE",
  );
  assert.equal(unsupportedRefreshResponse.status, 409);
  assert.equal(
    unsupportedRefreshResponse.body.error.code,
    "ERR_UNSUPPORTED_JURISDICTION_PROFILE",
  );
  assert.equal(unsupportedDownloadResponse.status, 409);
  assert.equal(
    unsupportedDownloadResponse.body.error.code,
    "ERR_UNSUPPORTED_JURISDICTION_PROFILE",
  );
});

test("no current SWE_BODELNING JSON artifact schema/output changes are introduced", async () => {
  const storageDir = createStorageDir();

  await upsertCaseProfileInputs("case-4", createProfileInputs(), { storageDir });
  await refreshCaseReleaseEvalRun(
    "case-4",
    createReleaseEvalSeed({ release_eval_run_id: "release-eval-run-4" }),
    { storageDir },
  );
  await refreshCaseExportPackageSnapshot("case-4", {
    storageDir,
    generated_at: "2026-03-24T12:00:00.000Z",
  });
  await refreshCaseExportPackageJsonArtifactSnapshot("case-4", { storageDir });
  const latestProjection = await getLatestCaseExportPackageJsonArtifactProjection(
    "case-4",
    { storageDir },
  );

  assert.deepEqual(
    validateSWEBodelningExportPackageJsonArtifactProjection(latestProjection),
    latestProjection,
  );
  assert.match(docsText, /JSON export artifact adapter\/dispatch scaffold/);
  assert.match(
    docsText,
    /contains the explicit supported `SWE_BODELNING` adapter entry plus the explicit `"CMD_PROFILE"` adapter entry/,
  );
});

test("no readiness behavior changes are introduced", () => {
  const workerEntries = fs.readdirSync(path.join(__dirname, "..", "workers", "analyze"));
  assert.deepEqual(workerEntries, [".gitkeep"]);
});
