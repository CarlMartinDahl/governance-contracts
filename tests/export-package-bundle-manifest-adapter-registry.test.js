const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const {
  handleCaseExportPackageBundleManifestLatestRoute,
  handleCaseExportPackageBundleManifestRefreshRoute,
} = require("../apps/api/src/index.js");
const {
  getLatestCaseExportPackageBundleManifestProjection,
  getLatestCaseExportPackageBundleManifestSnapshot,
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
  deriveExportPackageBundleManifest,
  deriveSWEBodelningExportPackageBundleManifest,
  exportPackageBundleManifestAdapterRegistry,
  getExportPackageBundleManifestAdapter,
  hasJurisdictionProfileCapability,
  resolveExportPackageBundleManifestProjection,
  resolveSWEBodelningExportPackageBundleManifestProjection,
} = require("../packages/governance/src/index.js");
const {
  validateCMDExportPackageBundleManifestProjection,
  validateSWEBodelningExportPackageBundleManifestProjection,
} = require("../packages/schemas/src/index.js");

const docsPath = path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md");
const docsText = fs.readFileSync(docsPath, "utf8");

function createStorageDir() {
  return fs.mkdtempSync(
    path.join(os.tmpdir(), "governance-contracts-bundle-manifest-adapter-"),
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

test("the generic bundle/package manifest adapter registry exposes the explicit CMD_PROFILE entry", () => {
  const sweAdapter = getExportPackageBundleManifestAdapter("SWE_BODELNING");
  const cmdAdapter = getExportPackageBundleManifestAdapter("CMD_PROFILE");

  assert.equal(exportPackageBundleManifestAdapterRegistry.SWE_BODELNING, sweAdapter);
  assert.equal(exportPackageBundleManifestAdapterRegistry["CMD_PROFILE"], cmdAdapter);
  assert.deepEqual(Object.keys(exportPackageBundleManifestAdapterRegistry), [
    "SWE_BODELNING",
    "CMD_PROFILE",
  ]);
  assert.equal(sweAdapter.jurisdiction_profile_key, "SWE_BODELNING");
  assert.equal(cmdAdapter.jurisdiction_profile_key, "CMD_PROFILE");
  assert.equal(typeof cmdAdapter.deriveExportPackageBundleManifest, "function");
  assert.equal(typeof cmdAdapter.resolveExportPackageBundleManifestProjection, "function");
});

test("bundle/package manifest refresh/create uses the registry path while preserving current SWE_BODELNING behavior", async () => {
  const storageDir = createStorageDir();

  await upsertCaseProfileInputs("case-1", createProfileInputs(), { storageDir });
  await refreshCaseReleaseEvalRun("case-1", createReleaseEvalSeed(), { storageDir });
  const exportPackage = await refreshCaseExportPackageSnapshot("case-1", {
    storageDir,
    generated_at: "2026-03-24T12:00:00.000Z",
  });
  const artifactSnapshots = await refreshCanonicalArtifactSnapshots("case-1", storageDir);

  const refreshed = await refreshCaseExportPackageBundleManifestSnapshot("case-1", {
    storageDir,
  });
  const expectedViaRegistry = deriveExportPackageBundleManifest(
    exportPackage,
    artifactSnapshots,
  );
  const expectedDirect = deriveSWEBodelningExportPackageBundleManifest(
    exportPackage,
    artifactSnapshots,
  );

  assert.deepEqual(refreshed, expectedViaRegistry);
  assert.deepEqual(expectedViaRegistry, expectedDirect);
});

test("bundle/package manifest read/projection/currentness uses the same adapter path where applicable while preserving current behavior", async () => {
  const storageDir = createStorageDir();

  await upsertCaseProfileInputs("case-2", createProfileInputs(), { storageDir });
  await refreshCaseReleaseEvalRun(
    "case-2",
    createReleaseEvalSeed({ release_eval_run_id: "release-eval-run-2" }),
    { storageDir },
  );
  const exportPackage = await refreshCaseExportPackageSnapshot("case-2", {
    storageDir,
    generated_at: "2026-03-24T12:00:00.000Z",
  });
  const artifactSnapshots = await refreshCanonicalArtifactSnapshots("case-2", storageDir);
  const bundleManifest = await refreshCaseExportPackageBundleManifestSnapshot("case-2", {
    storageDir,
  });
  const projected = await getLatestCaseExportPackageBundleManifestProjection("case-2", {
    storageDir,
  });
  const expectedViaRegistry = resolveExportPackageBundleManifestProjection(
    bundleManifest,
    exportPackage,
    artifactSnapshots,
  );
  const expectedDirect = resolveSWEBodelningExportPackageBundleManifestProjection(
    bundleManifest,
    exportPackage,
    artifactSnapshots,
  );

  assert.deepEqual(projected, expectedViaRegistry);
  assert.deepEqual(expectedViaRegistry, expectedDirect);
});

test("the CMD_PROFILE entry derives and resolves canonical bundle/package manifests through the shared runtime seam", async () => {
  const storageDir = createStorageDir();
  const adapter = getExportPackageBundleManifestAdapter("CMD_PROFILE");

  await upsertCaseProfileInputs("case-cmd", createCMDProfileInputs(), { storageDir });
  await refreshCaseReleaseEvalRun("case-cmd", createCMDReleaseEvalSeed(), {
    storageDir,
  });
  const exportPackageSnapshot = await refreshCaseExportPackageSnapshot("case-cmd", {
    storageDir,
    generated_at: "2026-03-25T12:30:00.000Z",
  });
  const artifactSnapshots = await refreshCanonicalArtifactSnapshots("case-cmd", storageDir);
  const bundleManifestSnapshot = adapter.deriveExportPackageBundleManifest(
    exportPackageSnapshot,
    artifactSnapshots,
    {
      generated_at: "2026-03-25T12:45:00.000Z",
    },
  );
  const projected = adapter.resolveExportPackageBundleManifestProjection(
    bundleManifestSnapshot,
    exportPackageSnapshot,
    artifactSnapshots,
  );

  assert.equal(
    hasJurisdictionProfileCapability("CMD_PROFILE", "export_package_bundle_manifest"),
    true,
  );
  assert.deepEqual(
    bundleManifestSnapshot,
    deriveExportPackageBundleManifest(exportPackageSnapshot, artifactSnapshots, {
      generated_at: "2026-03-25T12:45:00.000Z",
    }),
  );
  assert.deepEqual(
    projected,
    resolveExportPackageBundleManifestProjection(
      bundleManifestSnapshot,
      exportPackageSnapshot,
      artifactSnapshots,
    ),
  );
  assert.deepEqual(
    validateCMDExportPackageBundleManifestProjection(projected),
    projected,
  );
  assert.equal(projected.snapshot_status.source, "persisted-current");
  assert.equal(projected.snapshot_status.snapshot_is_current, true);
});

test("API bundle/package manifest read/refresh routes stay thin and preserve current machine-readable non-SWE behavior", async () => {
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
  await refreshCanonicalArtifactSnapshots("case-3", storageDir);

  const refreshResponse = await handleCaseExportPackageBundleManifestRefreshRoute(
    {
      method: "POST",
      path: "/cases/case-3/export-package/bundle-manifest/refresh",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );
  const latestSnapshot = await getLatestCaseExportPackageBundleManifestSnapshot("case-3", {
    storageDir,
  });

  assert.equal(refreshResponse.status, 200);
  assert.deepEqual(refreshResponse.body, latestSnapshot);

  const latestResponse = await handleCaseExportPackageBundleManifestLatestRoute(
    {
      method: "GET",
      path: "/cases/case-3/export-package/bundle-manifest/latest",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );
  const latestProjection = await getLatestCaseExportPackageBundleManifestProjection(
    "case-3",
    { storageDir },
  );

  assert.equal(latestResponse.status, 200);
  assert.deepEqual(latestResponse.body, latestProjection);

  const unsupportedLatestResponse =
    await handleCaseExportPackageBundleManifestLatestRoute(
      {
        method: "GET",
        path: "/cases/case-unsupported/export-package/bundle-manifest/latest",
        auth: { tenantId: "tenant-1" },
      },
      { loadCaseContext, storageDir },
    );
  const unsupportedRefreshResponse =
    await handleCaseExportPackageBundleManifestRefreshRoute(
      {
        method: "POST",
        path: "/cases/case-unsupported/export-package/bundle-manifest/refresh",
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
});

test("no current SWE_BODELNING bundle/package manifest schema/output changes are introduced", async () => {
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
  await refreshCanonicalArtifactSnapshots("case-4", storageDir);
  await refreshCaseExportPackageBundleManifestSnapshot("case-4", { storageDir });
  const latestProjection = await getLatestCaseExportPackageBundleManifestProjection(
    "case-4",
    { storageDir },
  );

  assert.deepEqual(
    validateSWEBodelningExportPackageBundleManifestProjection(latestProjection),
    latestProjection,
  );
  assert.match(docsText, /bundle\/package manifest adapter\/dispatch scaffold/);
  assert.match(
    docsText,
    /contains the explicit supported `SWE_BODELNING` adapter entry plus the explicit `"CMD_PROFILE"` adapter entry/,
  );
});

test("no readiness behavior changes are introduced", () => {
  const workerEntries = fs.readdirSync(path.join(__dirname, "..", "workers", "analyze"));
  assert.deepEqual(workerEntries, [".gitkeep"]);
});
