const test = require("node:test");
const assert = require("node:assert/strict");
const Buffer = require("node:buffer").Buffer;
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const {
  handleCaseExportPackageDocxArtifactDownloadRoute,
  handleCaseExportPackageDocxArtifactLatestRoute,
  handleCaseExportPackageDocxArtifactRefreshRoute,
} = require("../apps/api/src/index.js");
const {
  getLatestCaseExportPackageDocxArtifactProjection,
  getLatestCaseExportPackageDocxArtifactSnapshot,
  refreshCaseExportPackageDocxArtifactSnapshot,
  refreshCaseExportPackageSnapshot,
  refreshCaseReleaseEvalRun,
  upsertCaseProfileInputs,
} = require("../packages/database/src/index.js");
const {
  deriveExportPackageFromDocxArtifact,
  deriveExportPackageDocxArtifact,
  deriveCMDExportPackageVersion,
  deriveSWEBodelningExportPackageDocxArtifact,
  exportPackageDocxArtifactAdapterRegistry,
  getExportPackageDocxArtifactAdapter,
  hasJurisdictionProfileCapability,
  resolveExportPackageDocxArtifactProjection,
  resolveSWEBodelningExportPackageDocxArtifactProjection,
} = require("../packages/governance/src/index.js");
const {
  validateCMDExportPackageDocxArtifact,
  validateCMDExportPackageDocxArtifactProjection,
  validateSWEBodelningExportPackageDocxArtifactProjection,
} = require("../packages/schemas/src/index.js");

const docsPath = path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md");
const docsText = fs.readFileSync(docsPath, "utf8");

function createStorageDir() {
  return fs.mkdtempSync(
    path.join(os.tmpdir(), "governance-contracts-export-docx-artifact-adapter-"),
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

test("the generic DOCX artifact adapter registry exposes the explicit CMD_PROFILE entry", () => {
  const sweAdapter = getExportPackageDocxArtifactAdapter("SWE_BODELNING");
  const cmdAdapter = getExportPackageDocxArtifactAdapter("CMD_PROFILE");

  assert.equal(exportPackageDocxArtifactAdapterRegistry.SWE_BODELNING, sweAdapter);
  assert.equal(exportPackageDocxArtifactAdapterRegistry["CMD_PROFILE"], cmdAdapter);
  assert.deepEqual(Object.keys(exportPackageDocxArtifactAdapterRegistry), [
    "SWE_BODELNING",
    "CMD_PROFILE",
  ]);
  assert.equal(sweAdapter.jurisdiction_profile_key, "SWE_BODELNING");
  assert.equal(cmdAdapter.jurisdiction_profile_key, "CMD_PROFILE");
  assert.equal(typeof cmdAdapter.deriveExportPackageDocxArtifact, "function");
  assert.equal(typeof cmdAdapter.deriveExportPackageFromDocxArtifact, "function");
  assert.equal(typeof cmdAdapter.resolveExportPackageDocxArtifactProjection, "function");
});

test("DOCX artifact refresh/create uses the registry path while preserving current SWE_BODELNING behavior", async () => {
  const storageDir = createStorageDir();

  await upsertCaseProfileInputs("case-1", createProfileInputs(), { storageDir });
  await refreshCaseReleaseEvalRun("case-1", createReleaseEvalSeed(), { storageDir });
  const exportPackage = await refreshCaseExportPackageSnapshot("case-1", {
    storageDir,
    generated_at: "2026-03-24T12:00:00.000Z",
  });

  const refreshed = await refreshCaseExportPackageDocxArtifactSnapshot("case-1", {
    storageDir,
  });
  const expectedViaRegistry = deriveExportPackageDocxArtifact(exportPackage);
  const expectedDirect = deriveSWEBodelningExportPackageDocxArtifact(exportPackage);

  assert.deepEqual(refreshed, expectedViaRegistry);
  assert.deepEqual(expectedViaRegistry, expectedDirect);
});

test("DOCX artifact read/projection/currentness uses the same adapter path where applicable while preserving current behavior", async () => {
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
  const docxArtifact = await refreshCaseExportPackageDocxArtifactSnapshot("case-2", {
    storageDir,
  });
  const projected = await getLatestCaseExportPackageDocxArtifactProjection("case-2", {
    storageDir,
  });
  const expectedViaRegistry = resolveExportPackageDocxArtifactProjection(
    docxArtifact,
    exportPackage,
    releaseEvalRun.profile_dossier_snapshot,
  );
  const expectedDirect = resolveSWEBodelningExportPackageDocxArtifactProjection(
    docxArtifact,
    exportPackage,
    releaseEvalRun.profile_dossier_snapshot,
  );

  assert.deepEqual(projected, expectedViaRegistry);
  assert.deepEqual(expectedViaRegistry, expectedDirect);
});

test("the CMD_PROFILE entry derives and resolves canonical DOCX artifacts through the shared runtime seam", async () => {
  const storageDir = createStorageDir();
  const adapter = getExportPackageDocxArtifactAdapter("CMD_PROFILE");

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
  const docxArtifactSnapshot = adapter.deriveExportPackageDocxArtifact(exportPackageSnapshot);
  const projected = adapter.resolveExportPackageDocxArtifactProjection(
    docxArtifactSnapshot,
    exportPackageSnapshot,
    releaseEvalRun.profile_dossier_snapshot,
  );

  assert.equal(
    hasJurisdictionProfileCapability("CMD_PROFILE", "export_package_docx_artifact"),
    true,
  );
  assert.deepEqual(
    docxArtifactSnapshot,
    deriveExportPackageDocxArtifact(exportPackageSnapshot),
  );
  assert.deepEqual(
    validateCMDExportPackageDocxArtifact(docxArtifactSnapshot),
    docxArtifactSnapshot,
  );
  assert.deepEqual(
    adapter.deriveExportPackageFromDocxArtifact(docxArtifactSnapshot),
    exportPackageSnapshot,
  );
  assert.deepEqual(
    deriveExportPackageFromDocxArtifact(docxArtifactSnapshot),
    exportPackageSnapshot,
  );
  assert.deepEqual(
    projected,
    resolveExportPackageDocxArtifactProjection(
      docxArtifactSnapshot,
      exportPackageSnapshot,
      releaseEvalRun.profile_dossier_snapshot,
    ),
  );
  assert.deepEqual(
    validateCMDExportPackageDocxArtifactProjection(projected),
    projected,
  );
  assert.equal(projected.snapshot_status.source, "persisted-current");
  assert.equal(
    projected.snapshot_status.current_export_version,
    deriveCMDExportPackageVersion(),
  );
  assert.equal(projected.snapshot_status.snapshot_is_current, true);
});

test("API DOCX artifact read/refresh/delivery routes stay thin and preserve current machine-readable non-SWE behavior", async () => {
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

  const refreshResponse = await handleCaseExportPackageDocxArtifactRefreshRoute(
    {
      method: "POST",
      path: "/cases/case-3/export-package/docx-artifact/refresh",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );
  const latestSnapshot = await getLatestCaseExportPackageDocxArtifactSnapshot("case-3", {
    storageDir,
  });

  assert.equal(refreshResponse.status, 200);
  assert.deepEqual(refreshResponse.body, latestSnapshot);

  const latestResponse = await handleCaseExportPackageDocxArtifactLatestRoute(
    {
      method: "GET",
      path: "/cases/case-3/export-package/docx-artifact/latest",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );
  const latestProjection = await getLatestCaseExportPackageDocxArtifactProjection(
    "case-3",
    { storageDir },
  );

  assert.equal(latestResponse.status, 200);
  assert.deepEqual(latestResponse.body, latestProjection);

  const downloadResponse = await handleCaseExportPackageDocxArtifactDownloadRoute(
    {
      method: "GET",
      path: "/cases/case-3/export-package/docx-artifact/download",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );

  assert.equal(downloadResponse.status, 200);
  assert.deepEqual(
    downloadResponse.body,
    Buffer.from(latestProjection.body_base64, "base64"),
  );
  assert.equal(downloadResponse.headers["content-type"], latestProjection.content_type);

  const unsupportedLatestResponse = await handleCaseExportPackageDocxArtifactLatestRoute(
    {
      method: "GET",
      path: "/cases/case-unsupported/export-package/docx-artifact/latest",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );
  const unsupportedRefreshResponse =
    await handleCaseExportPackageDocxArtifactRefreshRoute(
      {
        method: "POST",
        path: "/cases/case-unsupported/export-package/docx-artifact/refresh",
        auth: { tenantId: "tenant-1" },
      },
      { loadCaseContext, storageDir },
    );
  const unsupportedDownloadResponse =
    await handleCaseExportPackageDocxArtifactDownloadRoute(
      {
        method: "GET",
        path: "/cases/case-unsupported/export-package/docx-artifact/download",
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

test("no current SWE_BODELNING DOCX artifact schema/output changes are introduced", async () => {
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
  await refreshCaseExportPackageDocxArtifactSnapshot("case-4", { storageDir });
  const latestProjection = await getLatestCaseExportPackageDocxArtifactProjection(
    "case-4",
    { storageDir },
  );

  assert.deepEqual(
    validateSWEBodelningExportPackageDocxArtifactProjection(latestProjection),
    latestProjection,
  );
  assert.match(docsText, /DOCX export artifact adapter\/dispatch scaffold/);
  assert.match(
    docsText,
    /contains the explicit supported `SWE_BODELNING` adapter entry plus the explicit `"CMD_PROFILE"` adapter entry/,
  );
});

test("no readiness behavior changes are introduced", () => {
  const workerEntries = fs.readdirSync(path.join(__dirname, "..", "workers", "analyze"));
  assert.deepEqual(workerEntries, [".gitkeep"]);
});
