const test = require("node:test");
const assert = require("node:assert/strict");
const Buffer = require("node:buffer").Buffer;
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const {
  handleCaseExportPackageBundleArchiveArtifactDownloadRoute,
  handleCaseExportPackageBundleArchiveArtifactLatestRoute,
  handleCaseExportPackageBundleArchiveArtifactRefreshRoute,
} = require("../apps/api/src/index.js");
const {
  getLatestCaseExportPackageBundleArchiveArtifactProjection,
  getLatestCaseExportPackageBundleArchiveArtifactSnapshot,
  getLatestCaseExportPackageBundleManifestProjection,
  refreshCaseExportPackageBundleArchiveArtifactSnapshot,
  refreshCaseExportPackageBundleManifestSnapshot,
  refreshCaseExportPackageDocxArtifactSnapshot,
  refreshCaseExportPackageJsonArtifactSnapshot,
  refreshCaseExportPackageMarkdownArtifactSnapshot,
  refreshCaseExportPackagePdfArtifactSnapshot,
  refreshCaseExportPackageSnapshot,
  refreshCaseReleaseEvalRun,
  upsertCaseProfileInputs,
} = require("../packages/database/src/index.js");
const {
  deriveExportPackageBundleArchiveArtifact,
  deriveSWEBodelningExportPackageBundleArchiveArtifact,
  exportPackageBundleArchiveArtifactAdapterRegistry,
  getExportPackageBundleArchiveArtifactAdapter,
  hasJurisdictionProfileCapability,
  resolveExportPackageBundleArchiveArtifactProjection,
  resolveSWEBodelningExportPackageBundleArchiveArtifactProjection,
} = require("../packages/governance/src/index.js");
const {
  validateCMDExportPackageBundleArchiveArtifactProjection,
  validateSWEBodelningExportPackageBundleArchiveArtifactProjection,
} = require("../packages/schemas/src/index.js");

const docsPath = path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md");
const docsText = fs.readFileSync(docsPath, "utf8");

function createStorageDir() {
  return fs.mkdtempSync(
    path.join(
      os.tmpdir(),
      "governance-contracts-export-bundle-archive-artifact-adapter-",
    ),
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

async function refreshCanonicalArtifactSnapshots(caseId, storageDir) {
  const jsonArtifactSnapshot = await refreshCaseExportPackageJsonArtifactSnapshot(caseId, {
    storageDir,
  });
  const markdownArtifactSnapshot =
    await refreshCaseExportPackageMarkdownArtifactSnapshot(caseId, {
      storageDir,
    });
  const pdfArtifactSnapshot = await refreshCaseExportPackagePdfArtifactSnapshot(caseId, {
    storageDir,
  });
  const docxArtifactSnapshot = await refreshCaseExportPackageDocxArtifactSnapshot(caseId, {
    storageDir,
  });

  return {
    jsonArtifactSnapshot,
    markdownArtifactSnapshot,
    pdfArtifactSnapshot,
    docxArtifactSnapshot,
  };
}

async function refreshCanonicalFinalArchive(caseId, storageDir, options = {}) {
  await upsertCaseProfileInputs(caseId, createProfileInputs(options.profileInputOverrides), {
    storageDir,
  });
  await refreshCaseReleaseEvalRun(caseId, createReleaseEvalSeed(options.releaseEvalOverrides), {
    storageDir,
  });
  const exportPackage = await refreshCaseExportPackageSnapshot(caseId, {
    storageDir,
    generated_at: options.exportGeneratedAt ?? "2026-03-24T12:00:00.000Z",
  });
  const artifactSnapshots = await refreshCanonicalArtifactSnapshots(caseId, storageDir);
  const bundleManifestProjection = await refreshCaseExportPackageBundleManifestSnapshot(caseId, {
    storageDir,
    generated_at: options.bundleGeneratedAt ?? "2026-03-24T13:00:00.000Z",
  });
  const finalArchiveArtifact = await refreshCaseExportPackageBundleArchiveArtifactSnapshot(
    caseId,
    { storageDir },
  );

  return {
    artifactSnapshots,
    bundleManifestProjection,
    exportPackage,
    finalArchiveArtifact,
  };
}

test("the generic final bundle/archive artifact adapter registry exposes the explicit CMD_PROFILE entry", () => {
  const sweAdapter = getExportPackageBundleArchiveArtifactAdapter("SWE_BODELNING");
  const cmdAdapter = getExportPackageBundleArchiveArtifactAdapter("CMD_PROFILE");

  assert.equal(
    exportPackageBundleArchiveArtifactAdapterRegistry.SWE_BODELNING,
    sweAdapter,
  );
  assert.equal(
    exportPackageBundleArchiveArtifactAdapterRegistry["CMD_PROFILE"],
    cmdAdapter,
  );
  assert.deepEqual(Object.keys(exportPackageBundleArchiveArtifactAdapterRegistry), [
    "SWE_BODELNING",
    "CMD_PROFILE",
  ]);
  assert.equal(sweAdapter.jurisdiction_profile_key, "SWE_BODELNING");
  assert.equal(cmdAdapter.jurisdiction_profile_key, "CMD_PROFILE");
  assert.equal(typeof cmdAdapter.deriveExportPackageBundleArchiveArtifact, "function");
  assert.equal(
    typeof cmdAdapter.resolveExportPackageBundleArchiveArtifactProjection,
    "function",
  );
});

test("final bundle/archive artifact refresh/create uses the registry path while preserving current SWE_BODELNING behavior", async () => {
  const storageDir = createStorageDir();

  await upsertCaseProfileInputs("case-1", createProfileInputs(), { storageDir });
  await refreshCaseReleaseEvalRun("case-1", createReleaseEvalSeed(), { storageDir });
  await refreshCaseExportPackageSnapshot("case-1", {
    storageDir,
    generated_at: "2026-03-24T12:00:00.000Z",
  });
  const artifactSnapshots = await refreshCanonicalArtifactSnapshots("case-1", storageDir);
  const bundleManifestSnapshot = await refreshCaseExportPackageBundleManifestSnapshot("case-1", {
    storageDir,
    generated_at: "2026-03-24T13:00:00.000Z",
  });

  const refreshed = await refreshCaseExportPackageBundleArchiveArtifactSnapshot("case-1", {
    storageDir,
  });
  const expectedViaRegistry = deriveExportPackageBundleArchiveArtifact(
    bundleManifestSnapshot,
    artifactSnapshots,
  );
  const expectedDirect = deriveSWEBodelningExportPackageBundleArchiveArtifact(
    bundleManifestSnapshot,
    artifactSnapshots,
  );

  assert.deepEqual(refreshed, expectedViaRegistry);
  assert.deepEqual(expectedViaRegistry, expectedDirect);
});

test("final bundle/archive artifact read/projection/currentness uses the same adapter path where applicable while preserving current behavior", async () => {
  const storageDir = createStorageDir();

  const { finalArchiveArtifact } = await refreshCanonicalFinalArchive("case-2", storageDir, {
    releaseEvalOverrides: { release_eval_run_id: "release-eval-run-2" },
  });
  const currentBundleManifestProjection =
    await getLatestCaseExportPackageBundleManifestProjection("case-2", {
      storageDir,
    });
  const projected = await getLatestCaseExportPackageBundleArchiveArtifactProjection("case-2", {
    storageDir,
  });
  const expectedViaRegistry = resolveExportPackageBundleArchiveArtifactProjection(
    finalArchiveArtifact,
    currentBundleManifestProjection,
  );
  const expectedDirect = resolveSWEBodelningExportPackageBundleArchiveArtifactProjection(
    finalArchiveArtifact,
    currentBundleManifestProjection,
  );

  assert.deepEqual(projected, expectedViaRegistry);
  assert.deepEqual(expectedViaRegistry, expectedDirect);
});

test("the CMD_PROFILE entry derives and resolves canonical final bundle/archive artifacts through the shared runtime seam", async () => {
  const storageDir = createStorageDir();
  const adapter = getExportPackageBundleArchiveArtifactAdapter("CMD_PROFILE");

  await upsertCaseProfileInputs("case-cmd", createCMDProfileInputs(), { storageDir });
  await refreshCaseReleaseEvalRun("case-cmd", createCMDReleaseEvalSeed(), { storageDir });
  await refreshCaseExportPackageSnapshot("case-cmd", {
    storageDir,
    generated_at: "2026-03-25T12:00:00.000Z",
  });
  const artifactSnapshots = await refreshCanonicalArtifactSnapshots("case-cmd", storageDir);
  const bundleManifestSnapshot = await refreshCaseExportPackageBundleManifestSnapshot(
    "case-cmd",
    {
      storageDir,
      generated_at: "2026-03-25T13:00:00.000Z",
    },
  );
  const refreshed = await refreshCaseExportPackageBundleArchiveArtifactSnapshot(
    "case-cmd",
    { storageDir },
  );
  const currentBundleManifestProjection =
    await getLatestCaseExportPackageBundleManifestProjection("case-cmd", {
      storageDir,
    });
  const projected = await getLatestCaseExportPackageBundleArchiveArtifactProjection(
    "case-cmd",
    {
      storageDir,
    },
  );

  assert.equal(
    hasJurisdictionProfileCapability(
      "CMD_PROFILE",
      "export_package_bundle_archive_artifact",
    ),
    true,
  );
  const expectedViaRegistry = deriveExportPackageBundleArchiveArtifact(
    bundleManifestSnapshot,
    artifactSnapshots,
  );
  const expectedDirect = adapter.deriveExportPackageBundleArchiveArtifact(
    bundleManifestSnapshot,
    artifactSnapshots,
  );
  const expectedProjectionViaRegistry = resolveExportPackageBundleArchiveArtifactProjection(
    refreshed,
    currentBundleManifestProjection,
  );
  const expectedProjectionDirect = adapter.resolveExportPackageBundleArchiveArtifactProjection(
    refreshed,
    currentBundleManifestProjection,
  );

  assert.deepEqual(refreshed, expectedViaRegistry);
  assert.deepEqual(expectedViaRegistry, expectedDirect);
  assert.deepEqual(projected, expectedProjectionViaRegistry);
  assert.deepEqual(expectedProjectionViaRegistry, expectedProjectionDirect);
  assert.deepEqual(
    validateCMDExportPackageBundleArchiveArtifactProjection(projected),
    projected,
  );
  assert.equal(projected.snapshot_status.source, "persisted-current");
  assert.equal(projected.snapshot_status.snapshot_is_current, true);
});

test("API final bundle/archive artifact read/refresh/delivery routes stay thin and preserve current machine-readable non-SWE behavior", async () => {
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

  await refreshCanonicalFinalArchive("case-3", storageDir, {
    releaseEvalOverrides: { release_eval_run_id: "release-eval-run-3" },
  });

  const refreshResponse = await handleCaseExportPackageBundleArchiveArtifactRefreshRoute(
    {
      method: "POST",
      path: "/cases/case-3/export-package/bundle-archive-artifact/refresh",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );
  const latestSnapshot =
    await getLatestCaseExportPackageBundleArchiveArtifactSnapshot("case-3", {
      storageDir,
    });

  assert.equal(refreshResponse.status, 200);
  assert.deepEqual(refreshResponse.body, latestSnapshot);

  const latestResponse = await handleCaseExportPackageBundleArchiveArtifactLatestRoute(
    {
      method: "GET",
      path: "/cases/case-3/export-package/bundle-archive-artifact/latest",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );
  const latestProjection =
    await getLatestCaseExportPackageBundleArchiveArtifactProjection("case-3", {
      storageDir,
    });

  assert.equal(latestResponse.status, 200);
  assert.deepEqual(latestResponse.body, latestProjection);

  const downloadResponse = await handleCaseExportPackageBundleArchiveArtifactDownloadRoute(
    {
      method: "GET",
      path: "/cases/case-3/export-package/bundle-archive-artifact/download",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );

  assert.equal(downloadResponse.status, 200);
  assert.deepEqual(
    downloadResponse.body,
    Buffer.from(latestProjection.body_base64, "base64"),
  );
  assert.equal(
    downloadResponse.headers["content-type"],
    latestProjection.content_type,
  );

  const unsupportedLatestResponse =
    await handleCaseExportPackageBundleArchiveArtifactLatestRoute(
      {
        method: "GET",
        path: "/cases/case-unsupported/export-package/bundle-archive-artifact/latest",
        auth: { tenantId: "tenant-1" },
      },
      { loadCaseContext, storageDir },
    );
  const unsupportedRefreshResponse =
    await handleCaseExportPackageBundleArchiveArtifactRefreshRoute(
      {
        method: "POST",
        path: "/cases/case-unsupported/export-package/bundle-archive-artifact/refresh",
        auth: { tenantId: "tenant-1" },
      },
      { loadCaseContext, storageDir },
    );
  const unsupportedDownloadResponse =
    await handleCaseExportPackageBundleArchiveArtifactDownloadRoute(
      {
        method: "GET",
        path: "/cases/case-unsupported/export-package/bundle-archive-artifact/download",
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

test("no current SWE_BODELNING final bundle/archive artifact schema/output changes are introduced", async () => {
  const storageDir = createStorageDir();

  await refreshCanonicalFinalArchive("case-4", storageDir, {
    releaseEvalOverrides: { release_eval_run_id: "release-eval-run-4" },
  });
  const latestProjection =
    await getLatestCaseExportPackageBundleArchiveArtifactProjection("case-4", {
      storageDir,
    });

  assert.deepEqual(
    validateSWEBodelningExportPackageBundleArchiveArtifactProjection(
      latestProjection,
    ),
    latestProjection,
  );
  assert.match(docsText, /final bundle\/archive artifact adapter\/dispatch scaffold/);
  assert.match(
    docsText,
    /contains the explicit supported `SWE_BODELNING` adapter entry plus the explicit `"CMD_PROFILE"` adapter entry/,
  );
});

test("no readiness behavior changes are introduced", () => {
  const workerEntries = fs.readdirSync(path.join(__dirname, "..", "workers", "analyze"));
  assert.deepEqual(workerEntries, [".gitkeep"]);
});
