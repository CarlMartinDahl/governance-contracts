const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const {
  handleCaseExportPackageLatestRoute,
  handleCaseExportPackageRefreshRoute,
} = require("../apps/api/src/index.js");
const {
  getLatestCaseExportPackageProjection,
  getLatestCaseExportPackageSnapshot,
  refreshCaseExportPackageSnapshot,
  refreshCaseReleaseEvalRun,
  upsertCaseProfileInputs,
} = require("../packages/database/src/index.js");
const {
  deriveCMDExportPackageVersion,
  deriveExportPackage,
  deriveExportPackageFromProfileDossierSnapshot,
  deriveSWEBodelningExportPackage,
  deriveSWEBodelningExportPackageFromProfileDossierSnapshot,
  exportPackageAdapterRegistry,
  getExportPackageAdapter,
  hasJurisdictionProfileCapability,
  resolveExportPackageProjection,
  resolveSWEBodelningExportPackageProjection,
} = require("../packages/governance/src/index.js");
const {
  validateCMDExportPackage,
  validateCMDExportPackageProjection,
  validateSWEBodelningExportPackageProjection,
} = require("../packages/schemas/src/index.js");

const docsPath = path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md");
const docsText = fs.readFileSync(docsPath, "utf8");

function createStorageDir() {
  return fs.mkdtempSync(
    path.join(os.tmpdir(), "governance-contracts-export-package-adapter-"),
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

function createCMDProfileDossierSnapshot(overrides = {}) {
  return {
    jurisdiction_profile_key: "CMD_PROFILE",
    release_gate: "blocked",
    release_gate_reason_code: "contract-only-profile-runtime-unsupported",
    release_eval_freshness: "current",
    release_eval_freshness_reason_code: "contract-only-current-placeholder",
    evaluator_version: "cmd-release-eval-contract-v1",
    profile_input_summary: {
      required_lane_count: 1,
      lanes_with_value_count: 1,
      missing_value_lane_keys: [],
      lanes_with_support_count: 1,
      missing_support_lane_keys: [],
    },
    profile_input_lane_snapshot: {
      "cmd_primary_signal": {
        has_value: true,
        value: "documented",
        evidence_object_ids: ["cmd-evidence-1"],
        has_support: true,
      },
    },
    ...overrides,
  };
}

function createCMDReleaseEvalRun(overrides = {}) {
  return {
    jurisdiction_profile_key: "CMD_PROFILE",
    release_eval_run_id: "cmd-release-eval-run-1",
    evaluator_version: "cmd-release-eval-contract-v1",
    release_gate: "blocked",
    release_gate_reason_code: "contract-only-profile-runtime-unsupported",
    release_eval_freshness: "current",
    release_eval_freshness_reason_code: "contract-only-current-placeholder",
    profile_input_summary: {
      required_lane_count: 1,
      lanes_with_value_count: 1,
      missing_value_lane_keys: [],
      lanes_with_support_count: 1,
      missing_support_lane_keys: [],
    },
    profile_input_lane_snapshot: {
      "cmd_primary_signal": {
        has_value: true,
        value: "documented",
        evidence_object_ids: ["cmd-evidence-1"],
        has_support: true,
      },
    },
    ...overrides,
  };
}

test("the adapter/dispatch registry exposes the explicit CMD_PROFILE export-package adapter entry", () => {
  const sweAdapter = getExportPackageAdapter("SWE_BODELNING");
  const cmdAdapter = getExportPackageAdapter("CMD_PROFILE");

  assert.equal(exportPackageAdapterRegistry.SWE_BODELNING, sweAdapter);
  assert.equal(exportPackageAdapterRegistry["CMD_PROFILE"], cmdAdapter);
  assert.deepEqual(Object.keys(exportPackageAdapterRegistry), ["SWE_BODELNING", "CMD_PROFILE"]);
  assert.equal(sweAdapter.jurisdiction_profile_key, "SWE_BODELNING");
  assert.equal(cmdAdapter.jurisdiction_profile_key, "CMD_PROFILE");
  assert.equal(typeof cmdAdapter.deriveExportPackageFromProfileDossierSnapshot, "function");
  assert.equal(typeof cmdAdapter.deriveExportPackage, "function");
  assert.equal(typeof cmdAdapter.resolveExportPackageProjection, "function");
});

test("export-package refresh/create uses the registry path while preserving current SWE_BODELNING behavior", async () => {
  const storageDir = createStorageDir();

  await upsertCaseProfileInputs("case-1", createProfileInputs(), { storageDir });
  const releaseEvalRun = await refreshCaseReleaseEvalRun(
    "case-1",
    createReleaseEvalSeed(),
    { storageDir },
  );

  const refreshed = await refreshCaseExportPackageSnapshot("case-1", {
    storageDir,
    generated_at: "2026-03-24T12:00:00.000Z",
  });
  const expectedViaRegistry = deriveExportPackageFromProfileDossierSnapshot(
    releaseEvalRun.profile_dossier_snapshot,
    {
      generated_at: "2026-03-24T12:00:00.000Z",
    },
  );
  const expectedViaRunRegistry = deriveExportPackage(releaseEvalRun, {
    generated_at: "2026-03-24T12:00:00.000Z",
  });
  const expectedDirect = deriveSWEBodelningExportPackageFromProfileDossierSnapshot(
    releaseEvalRun.profile_dossier_snapshot,
    {
      generated_at: "2026-03-24T12:00:00.000Z",
    },
  );
  const expectedDirectViaRun = deriveSWEBodelningExportPackage(releaseEvalRun, {
    generated_at: "2026-03-24T12:00:00.000Z",
  });

  assert.deepEqual(refreshed, expectedViaRegistry);
  assert.deepEqual(expectedViaRegistry, expectedViaRunRegistry);
  assert.deepEqual(expectedViaRegistry, expectedDirect);
  assert.deepEqual(expectedDirect, expectedDirectViaRun);
});

test("export-package read/projection uses the same adapter path where applicable while preserving current behavior", async () => {
  const storageDir = createStorageDir();

  await upsertCaseProfileInputs("case-2", createProfileInputs(), { storageDir });
  const releaseEvalRun = await refreshCaseReleaseEvalRun(
    "case-2",
    createReleaseEvalSeed({ release_eval_run_id: "release-eval-run-2" }),
    { storageDir },
  );
  const refreshed = await refreshCaseExportPackageSnapshot("case-2", {
    storageDir,
    generated_at: "2026-03-24T12:00:00.000Z",
  });
  const projected = await getLatestCaseExportPackageProjection("case-2", { storageDir });
  const expectedViaRegistry = resolveExportPackageProjection(
    refreshed,
    releaseEvalRun.profile_dossier_snapshot,
  );
  const expectedDirect = resolveSWEBodelningExportPackageProjection(
    refreshed,
    releaseEvalRun.profile_dossier_snapshot,
  );

  assert.deepEqual(projected, expectedViaRegistry);
  assert.deepEqual(expectedViaRegistry, expectedDirect);
});

test("the CMD_PROFILE entry derives and resolves canonical export-package payloads through the shared seam", () => {
  const adapter = getExportPackageAdapter("CMD_PROFILE");
  const profileDossierSnapshot = createCMDProfileDossierSnapshot();
  const releaseEvalRun = createCMDReleaseEvalRun();
  const generatedAt = "2026-03-25T12:30:00.000Z";
  const persistedAt = "2026-03-25T12:00:00.000Z";
  const exportPackageSnapshot = deriveExportPackageFromProfileDossierSnapshot(
    profileDossierSnapshot,
    {
      generated_at: generatedAt,
      release_eval_run_id: releaseEvalRun.release_eval_run_id,
      evaluator_version: releaseEvalRun.evaluator_version,
      jurisdiction_profile_key: releaseEvalRun.jurisdiction_profile_key,
      persisted_at: persistedAt,
    },
  );
  const exportPackageFromRun = deriveExportPackage(releaseEvalRun, {
    generated_at: generatedAt,
    persisted_at: persistedAt,
  });
  const projection = resolveExportPackageProjection(
    exportPackageSnapshot,
    profileDossierSnapshot,
  );

  assert.equal(hasJurisdictionProfileCapability("CMD_PROFILE", "export_package"), true);
  assert.deepEqual(validateCMDExportPackage(exportPackageSnapshot), exportPackageSnapshot);
  assert.deepEqual(exportPackageFromRun, exportPackageSnapshot);
  assert.equal(exportPackageSnapshot.export_version, deriveCMDExportPackageVersion());
  assert.deepEqual(exportPackageSnapshot.canonical_source, {
    release_eval_run_id: releaseEvalRun.release_eval_run_id,
    evaluator_version: releaseEvalRun.evaluator_version,
    jurisdiction_profile_key: "CMD_PROFILE",
    persisted_at: persistedAt,
  });
  assert.deepEqual(
    validateCMDExportPackageProjection(projection),
    projection,
  );
  assert.deepEqual(projection, {
    ...exportPackageSnapshot,
    snapshot_status: {
      source: "persisted-current",
      snapshot_export_version_found: deriveCMDExportPackageVersion(),
      current_export_version: deriveCMDExportPackageVersion(),
      snapshot_is_current: true,
    },
  });

  assert.deepEqual(
    adapter.resolveExportPackageProjection(
      exportPackageSnapshot,
      profileDossierSnapshot,
    ),
    projection,
  );
  assert.equal(
    hasJurisdictionProfileCapability("CMD_PROFILE", "export_package_json_artifact"),
    true,
  );
});

test("API export-package read/refresh routes stay thin and preserve current machine-readable non-SWE behavior", async () => {
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

  const refreshResponse = await handleCaseExportPackageRefreshRoute(
    {
      method: "POST",
      path: "/cases/case-3/export-package/refresh",
      auth: { tenantId: "tenant-1" },
      body: { generated_at: "2026-03-24T12:00:00.000Z" },
    },
    { loadCaseContext, storageDir },
  );
  const latestSnapshot = await getLatestCaseExportPackageSnapshot("case-3", {
    storageDir,
  });

  assert.equal(refreshResponse.status, 200);
  assert.deepEqual(refreshResponse.body, latestSnapshot);

  const latestResponse = await handleCaseExportPackageLatestRoute(
    {
      method: "GET",
      path: "/cases/case-3/export-package/latest",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );
  const latestProjection = await getLatestCaseExportPackageProjection("case-3", {
    storageDir,
  });

  assert.equal(latestResponse.status, 200);
  assert.deepEqual(latestResponse.body, latestProjection);

  const unsupportedGetResponse = await handleCaseExportPackageLatestRoute(
    {
      method: "GET",
      path: "/cases/case-unsupported/export-package/latest",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );
  const unsupportedRefreshResponse = await handleCaseExportPackageRefreshRoute(
    {
      method: "POST",
      path: "/cases/case-unsupported/export-package/refresh",
      auth: { tenantId: "tenant-1" },
      body: { generated_at: "2026-03-24T12:00:00.000Z" },
    },
    { loadCaseContext, storageDir },
  );

  assert.equal(unsupportedGetResponse.status, 409);
  assert.equal(
    unsupportedGetResponse.body.error.code,
    "ERR_UNSUPPORTED_JURISDICTION_PROFILE",
  );
  assert.equal(unsupportedRefreshResponse.status, 409);
  assert.equal(
    unsupportedRefreshResponse.body.error.code,
    "ERR_UNSUPPORTED_JURISDICTION_PROFILE",
  );
});

test("no current SWE_BODELNING schema/output changes are introduced", async () => {
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
  const latestProjection = await getLatestCaseExportPackageProjection("case-4", {
    storageDir,
  });

  assert.deepEqual(
    validateSWEBodelningExportPackageProjection(latestProjection),
    latestProjection,
  );
  assert.match(docsText, /export-package adapter\/dispatch scaffold/);
  assert.match(
    docsText,
    /contains the explicit supported `SWE_BODELNING` adapter entry plus the explicit `"CMD_PROFILE"` adapter entry/,
  );
});

test("no readiness behavior changes are introduced", () => {
  const workerEntries = fs.readdirSync(path.join(__dirname, "..", "workers", "analyze"));
  assert.deepEqual(workerEntries, [".gitkeep"]);
});
