const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const {
  handleCaseExportPackageBundleManifestLatestRoute,
} = require("../apps/api/src/index.js");
const {
  getLatestCaseExportPackageBundleManifestProjection,
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
  validateCMDExportPackageBundleManifestProjection,
  validateSWEBodelningExportPackageBundleManifestProjection,
} = require("../packages/schemas/src/index.js");
const {
  deriveCMDExportPackageBundleManifestVersion,
  deriveSWEBodelningExportPackageBundleManifestVersion,
} = require("../packages/governance/src/index.js");

const docsPath = path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md");
const docsText = fs.readFileSync(docsPath, "utf8");
const apiIndexPath = path.join(__dirname, "..", "apps", "api", "src", "index.js");
const apiIndexText = fs.readFileSync(apiIndexPath, "utf8");

function createStorageDir() {
  return fs.mkdtempSync(
    path.join(os.tmpdir(), "governance-contracts-export-package-bundle-manifest-api-"),
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

async function persistCanonicalManifestPrerequisites(caseId, storageDir, options = {}) {
  await upsertCaseProfileInputs(caseId, createProfileInputs(options.profileInputOverrides), {
    storageDir,
  });
  await refreshCaseReleaseEvalRun(caseId, createReleaseEvalSeed(options.releaseEvalOverrides), {
    storageDir,
  });
  await refreshCaseExportPackageSnapshot(caseId, {
    storageDir,
    generated_at: options.exportGeneratedAt ?? "2026-03-24T12:00:00.000Z",
  });
  await refreshCaseExportPackageJsonArtifactSnapshot(caseId, { storageDir });
  await refreshCaseExportPackageMarkdownArtifactSnapshot(caseId, { storageDir });
  await refreshCaseExportPackagePdfArtifactSnapshot(caseId, { storageDir });
  await refreshCaseExportPackageDocxArtifactSnapshot(caseId, { storageDir });
}

async function persistCanonicalBundleManifest(caseId, storageDir, options = {}) {
  await persistCanonicalManifestPrerequisites(caseId, storageDir, options);

  return refreshCaseExportPackageBundleManifestSnapshot(caseId, {
    storageDir,
    generated_at: options.bundleGeneratedAt ?? "2026-03-24T13:00:00.000Z",
  });
}

async function persistCanonicalCMDBundleManifest(caseId, storageDir, options = {}) {
  await upsertCaseProfileInputs(caseId, createCMDProfileInputs(options.profileInputOverrides), {
    storageDir,
  });
  await refreshCaseReleaseEvalRun(
    caseId,
    createCMDReleaseEvalSeed(options.releaseEvalOverrides),
    { storageDir },
  );
  await refreshCaseExportPackageSnapshot(caseId, {
    storageDir,
    generated_at: options.exportGeneratedAt ?? "2026-03-25T12:00:00.000Z",
  });
  await refreshCaseExportPackageJsonArtifactSnapshot(caseId, { storageDir });
  await refreshCaseExportPackageMarkdownArtifactSnapshot(caseId, { storageDir });
  await refreshCaseExportPackagePdfArtifactSnapshot(caseId, { storageDir });
  await refreshCaseExportPackageDocxArtifactSnapshot(caseId, { storageDir });

  return refreshCaseExportPackageBundleManifestSnapshot(caseId, {
    storageDir,
    generated_at: options.bundleGeneratedAt ?? "2026-03-25T12:45:00.000Z",
  });
}

test("docs freeze the thin authenticated bundle/package manifest latest-read seam as a distinct canonical runtime/read seam", () => {
  assert.match(
    docsText,
    /Thin Authenticated Bundle\/Package Manifest Latest-Read Seam Freeze/i,
  );
  assert.match(
    docsText,
    /thin authenticated bundle\/package manifest latest-read seam is now frozen as the baseline runtime\/read seam/i,
  );
  assert.match(
    docsText,
    /only currently evidenced latest-read surface in this freeze is `GET \/cases\/:caseId\/export-package\/bundle-manifest\/latest`/i,
  );
  assert.match(
    docsText,
    /authenticated\/case-access-controlled boundary behavior at the thin route edge/i,
  );
  assert.match(
    docsText,
    /read-only latest projection passthrough over the persisted canonical bundle\/package manifest snapshot unchanged plus the top-level machine-readable snapshot_status block already present in the persisted latest projection contract only when the latest bundle\/package manifest projection `jurisdiction_profile_key` and any embedded `canonical_source\.jurisdiction_profile_key` both match the authorized case-context `jurisdiction_profile_key`/i,
  );
  assert.match(
    docsText,
    /fail-closed route-edge invariant that the latest bundle\/package manifest projection `jurisdiction_profile_key` and any embedded `canonical_source\.jurisdiction_profile_key` must equal the authorized case-context `jurisdiction_profile_key` before return/i,
  );
  assert.match(
    docsText,
    /same-tenant supported-profile drift in already-persisted upstream export_package\/profile_dossier data rejects machine-readably with HTTP `409` `ERR_EXPORT_PACKAGE_UPSTREAM_JURISDICTION_PROFILE_MISMATCH` instead of returning the mismatched latest projection/i,
  );
  assert.match(
    docsText,
    /no refresh semantics or downstream bundle\/archive latest or delivery semantics inside this seam/i,
  );
  assert.match(
    docsText,
    /current\/stale projection metadata only where already surfaced through the persisted latest projection contract/i,
  );
  assert.match(
    docsText,
    /fail-closed missing-snapshot responses from this exact latest-read route with HTTP 404 ERR_EXPORT_PACKAGE_BUNDLE_MANIFEST_SNAPSHOT_NOT_FOUND plus route-level case_id detail/i,
  );
  assert.match(
    docsText,
    /shared `snapshot_status` seam governs shared currentness semantics where relevant for this latest-read seam and remains a separate frozen shared currentness boundary/i,
  );
  assert.match(
    docsText,
    /shared API error-envelope seam and its frozen subfamilies remain the governing boundary for machine-readable latest-read error envelopes/i,
  );
  assert.match(
    docsText,
    /currently evidenced `ERR_EXPORT_PACKAGE_BUNDLE_MANIFEST_SNAPSHOT_NOT_FOUND` route branch for this thin latest-read seam remains distinct from the already-frozen shared `resource\/snapshot not found` API envelope partition\/prerequisites/i,
  );
  assert.match(
    docsText,
    /thin bundle\/package manifest refresh seam remains a distinct refresh boundary/i,
  );
  assert.match(
    docsText,
    /frozen governance bundle\/package manifest derivation and projection helper scaffold remains a distinct broader runtime\/helper seam/i,
  );
  assert.match(
    docsText,
    /this latest-read seam is narrower than those seams and does not itself redefine currentness, error-envelope partitioning, refresh behavior, or bundle\/package manifest derivation \/ projection behavior/i,
  );
  assert.match(
    docsText,
    /this seam is not the refresh boundary and does not itself perform derivation or rebuild work/i,
  );
  assert.match(
    docsText,
    /no undocumented broadening of this latest-read seam into refresh, derivation, reconstruction, or neutral-model alignment should be introduced/i,
  );
  assert.match(
    docsText,
    /the seam should remain a thin authenticated read-only latest-projection boundary unless explicit contract detail changes/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, latest-read semantics, schema behavior, or fail-closed behavior/i,
  );

  assert.match(
    apiIndexText,
    /async function handleCaseExportPackageBundleManifestLatestRoute\(/,
  );
  assert.match(
    apiIndexText,
    /loadAuthorizedCaseContext\(\s+routeMatch\.caseId,\s+request\.auth,\s+options\.loadCaseContext,\s+"export_package_bundle_manifest"/,
  );
  assert.match(apiIndexText, /if \(request\.method !== "GET"\)/);
  assert.match(
    apiIndexText,
    /await getLatestCaseExportPackageBundleManifestProjection\(/,
  );
  assert.match(
    apiIndexText,
    /if \(!exportPackageBundleManifestSnapshot\) {\s+return errorResponse\(404, "ERR_EXPORT_PACKAGE_BUNDLE_MANIFEST_SNAPSHOT_NOT_FOUND", {\s+case_id: routeMatch\.caseId,\s+}\);\s+}/,
  );
  assert.match(
    apiIndexText,
    /ERR_EXPORT_PACKAGE_UPSTREAM_JURISDICTION_PROFILE_MISMATCH/,
  );
  assert.match(
    apiIndexText,
    /return jsonResponse\(200, exportPackageBundleManifestSnapshot\)/,
  );
});

test("successful bundle/package manifest retrieval for a tenant-owned SWE_BODELNING case with canonical manifest data", async () => {
  const storageDir = createStorageDir();
  const loadCaseContext = createCaseContextLoader({
    "case-1": {
      tenant_id: "tenant-1",
      jurisdiction_profile_key: "SWE_BODELNING",
    },
  });

  const persistedBundleManifest = await persistCanonicalBundleManifest("case-1", storageDir);
  const expectedProjection = await getLatestCaseExportPackageBundleManifestProjection("case-1", {
    storageDir,
  });
  const response = await handleCaseExportPackageBundleManifestLatestRoute(
    {
      method: "GET",
      path: "/cases/case-1/export-package/bundle-manifest/latest",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );

  assert.equal(response.status, 200);
  assert.deepEqual(response.body, expectedProjection);
  assert.deepEqual(
    validateSWEBodelningExportPackageBundleManifestProjection(response.body),
    response.body,
  );
  const { snapshot_status, ...persistedFields } = response.body;
  assert.deepEqual(persistedFields, persistedBundleManifest);
  assert.deepEqual(snapshot_status, {
    source: "persisted-current",
    snapshot_package_version_found: persistedBundleManifest.package_version,
    current_package_version: deriveSWEBodelningExportPackageBundleManifestVersion(),
    snapshot_is_current: true,
  });
});

test("successful GET /cases/:caseId/export-package/bundle-manifest/latest for a tenant-owned CMD_PROFILE case returns the persisted bundle/package manifest projection unchanged", async () => {
  const storageDir = createStorageDir();
  const loadCaseContext = createCaseContextLoader({
    "case-cmd": {
      tenant_id: "tenant-1",
      jurisdiction_profile_key: "CMD_PROFILE",
    },
  });

  const persistedBundleManifest = await persistCanonicalCMDBundleManifest(
    "case-cmd",
    storageDir,
  );
  const expectedProjection = await getLatestCaseExportPackageBundleManifestProjection(
    "case-cmd",
    { storageDir },
  );
  const response = await handleCaseExportPackageBundleManifestLatestRoute(
    {
      method: "GET",
      path: "/cases/case-cmd/export-package/bundle-manifest/latest",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );

  assert.equal(response.status, 200);
  assert.deepEqual(response.body, expectedProjection);
  assert.deepEqual(
    validateCMDExportPackageBundleManifestProjection(response.body),
    response.body,
  );
  const { snapshot_status, ...persistedFields } = response.body;
  assert.deepEqual(persistedFields, persistedBundleManifest);
  assert.deepEqual(snapshot_status, {
    source: "persisted-current",
    snapshot_package_version_found: persistedBundleManifest.package_version,
    current_package_version: deriveCMDExportPackageBundleManifestVersion(),
    snapshot_is_current: true,
  });
});

test("tenant/case isolation rejection", async () => {
  const response = await handleCaseExportPackageBundleManifestLatestRoute(
    {
      method: "GET",
      path: "/cases/case-2/export-package/bundle-manifest/latest",
      auth: { tenantId: "tenant-1" },
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

test("no-canonical-bundle-manifest fail-closed response", async () => {
  const storageDir = createStorageDir();
  const loadCaseContext = createCaseContextLoader({
    "case-3": {
      tenant_id: "tenant-1",
      jurisdiction_profile_key: "SWE_BODELNING",
    },
  });

  await persistCanonicalManifestPrerequisites("case-3", storageDir);

  const response = await handleCaseExportPackageBundleManifestLatestRoute(
    {
      method: "GET",
      path: "/cases/case-3/export-package/bundle-manifest/latest",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );

  assert.equal(response.status, 404);
  assert.equal(response.body.error.code, "ERR_EXPORT_PACKAGE_BUNDLE_MANIFEST_SNAPSHOT_NOT_FOUND");
  assert.equal(response.body.error.case_id, "case-3");
});

test("unsupported/non-SWE bundle/package manifest response remains machine-readable and non-breaking", async () => {
  const response = await handleCaseExportPackageBundleManifestLatestRoute(
    {
      method: "GET",
      path: "/cases/case-4/export-package/bundle-manifest/latest",
      auth: { tenantId: "tenant-1" },
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

test("same-tenant supported-profile drift in already-persisted upstream export_package/profile_dossier data rejects GET /cases/:caseId/export-package/bundle-manifest/latest", async () => {
  const storageDir = createStorageDir();
  const loadCaseContext = createCaseContextLoader({
    "case-profile-drift": {
      tenant_id: "tenant-1",
      jurisdiction_profile_key: "SWE_BODELNING",
    },
  });

  await persistCanonicalCMDBundleManifest("case-profile-drift", storageDir);

  const expectedProjection = await getLatestCaseExportPackageBundleManifestProjection(
    "case-profile-drift",
    { storageDir },
  );

  assert.equal(expectedProjection.jurisdiction_profile_key, "CMD_PROFILE");
  assert.equal(
    expectedProjection.canonical_source.jurisdiction_profile_key,
    "CMD_PROFILE",
  );

  const response = await handleCaseExportPackageBundleManifestLatestRoute(
    {
      method: "GET",
      path: "/cases/case-profile-drift/export-package/bundle-manifest/latest",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );

  assert.equal(response.status, 409);
  assert.notDeepEqual(response.body, expectedProjection);
  assert.deepEqual(response.body, {
    error: {
      case_id: "case-profile-drift",
      code: "ERR_EXPORT_PACKAGE_UPSTREAM_JURISDICTION_PROFILE_MISMATCH",
      expected_jurisdiction_profile_key: "SWE_BODELNING",
      bundle_manifest_jurisdiction_profile_key: "CMD_PROFILE",
      canonical_source_jurisdiction_profile_key: "CMD_PROFILE",
    },
  });
});

test("stale manifest snapshot yields snapshot_status.source = persisted-stale when export-package/artifact/dossier drift occurs", async () => {
  const storageDir = createStorageDir();
  const loadCaseContext = createCaseContextLoader({
    "case-5": {
      tenant_id: "tenant-1",
      jurisdiction_profile_key: "SWE_BODELNING",
    },
  });

  const persistedBundleManifest = await persistCanonicalBundleManifest("case-5", storageDir, {
    exportGeneratedAt: "2026-03-24T12:00:00.000Z",
    bundleGeneratedAt: "2026-03-24T13:00:00.000Z",
  });

  await upsertCaseProfileInputs(
    "case-5",
    createProfileInputs({
      profile_input_summary: {
        required_lane_count: 3,
        lanes_with_value_count: 3,
        missing_value_lane_keys: [],
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
          has_value: true,
          value: "co-acquisition",
          evidence_object_ids: ["evidence-3"],
        },
      },
    }),
    { storageDir },
  );
  await refreshCaseReleaseEvalRun(
    "case-5",
    createReleaseEvalSeed({ release_eval_run_id: "release-eval-run-2" }),
    { storageDir },
  );
  await refreshCaseExportPackageSnapshot("case-5", {
    storageDir,
    generated_at: "2026-03-24T14:00:00.000Z",
  });
  await refreshCaseExportPackageJsonArtifactSnapshot("case-5", { storageDir });
  await refreshCaseExportPackageMarkdownArtifactSnapshot("case-5", { storageDir });
  await refreshCaseExportPackagePdfArtifactSnapshot("case-5", { storageDir });
  await refreshCaseExportPackageDocxArtifactSnapshot("case-5", { storageDir });

  const response = await handleCaseExportPackageBundleManifestLatestRoute(
    {
      method: "GET",
      path: "/cases/case-5/export-package/bundle-manifest/latest",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );

  assert.equal(response.status, 200);
  const { snapshot_status, ...persistedFields } = response.body;
  assert.deepEqual(persistedFields, persistedBundleManifest);
  assert.equal(snapshot_status.source, "persisted-stale");
  assert.equal(
    snapshot_status.snapshot_package_version_found,
    persistedBundleManifest.package_version,
  );
  assert.equal(
    snapshot_status.current_package_version,
    deriveSWEBodelningExportPackageBundleManifestVersion(),
  );
  assert.equal(snapshot_status.snapshot_is_current, false);
});

test("bundle/package manifest payload matches the persisted canonical snapshot rather than diverging", async () => {
  const storageDir = createStorageDir();
  const loadCaseContext = createCaseContextLoader({
    "case-6": {
      tenant_id: "tenant-1",
      jurisdiction_profile_key: "SWE_BODELNING",
    },
  });

  const persistedBundleManifest = await persistCanonicalBundleManifest("case-6", storageDir, {
    exportGeneratedAt: "2026-03-24T14:00:00.000Z",
    bundleGeneratedAt: "2026-03-24T15:00:00.000Z",
  });

  const response = await handleCaseExportPackageBundleManifestLatestRoute(
    {
      method: "GET",
      path: "/cases/case-6/export-package/bundle-manifest/latest",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );

  assert.equal(response.status, 200);
  const { snapshot_status, ...persistedFields } = response.body;
  assert.equal(snapshot_status.source, "persisted-current");
  assert.deepEqual(persistedFields, persistedBundleManifest);
});

test("no readiness behavior changes are introduced", () => {
  const workerEntries = fs.readdirSync(path.join(__dirname, "..", "workers", "analyze"));

  assert.deepEqual(workerEntries, [".gitkeep"]);
  assert.match(
    docsText,
    /GET \/cases\/:caseId\/export-package\/bundle-manifest\/latest/,
  );
  assert.match(
    docsText,
    /machine-readable top-level `snapshot_status` block/,
  );
  assert.match(
    docsText,
    /without route-local bundle\/package manifest recomputation or silent refresh/,
  );
});
