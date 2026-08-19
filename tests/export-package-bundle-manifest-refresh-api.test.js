const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const {
  handleCaseExportPackageBundleManifestRefreshRoute,
} = require("../apps/api/src/index.js");
const {
  getLatestCaseExportPackageBundleManifestSnapshot,
  refreshCaseExportPackageDocxArtifactSnapshot,
  refreshCaseExportPackageJsonArtifactSnapshot,
  refreshCaseExportPackageMarkdownArtifactSnapshot,
  refreshCaseExportPackagePdfArtifactSnapshot,
  refreshCaseExportPackageSnapshot,
  refreshCaseReleaseEvalRun,
  upsertCaseProfileInputs,
} = require("../packages/database/src/index.js");
const {
  validateCMDExportPackageBundleManifest,
  validateSWEBodelningExportPackageBundleManifest,
} = require("../packages/schemas/src/index.js");

const docsPath = path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md");
const docsText = fs.readFileSync(docsPath, "utf8");
const apiIndexText = fs.readFileSync(
  path.join(__dirname, "..", "apps", "api", "src", "index.js"),
  "utf8",
);

function createStorageDir() {
  return fs.mkdtempSync(
    path.join(
      os.tmpdir(),
      "governance-contracts-export-package-bundle-manifest-refresh-api-",
    ),
  );
}

function createCaseContextLoader(caseContexts) {
  return async function loadCaseContext(caseId) {
    return caseContexts[caseId] ?? null;
  };
}

function rewriteStoredExportPackageSnapshot(storageDir, caseId, transformSnapshot) {
  const storePath = path.join(storageDir, "export-package-snapshots.json");
  const store = JSON.parse(fs.readFileSync(storePath, "utf8"));
  const caseSnapshots = store[caseId];
  const latestIndex = caseSnapshots.length - 1;
  const latestRecord = caseSnapshots[latestIndex];
  caseSnapshots[latestIndex] = {
    ...latestRecord,
    export_package_payload: transformSnapshot(latestRecord.export_package_payload),
  };
  fs.writeFileSync(storePath, JSON.stringify(store, null, 2));
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

async function persistCanonicalExportPackage(caseId, storageDir) {
  await upsertCaseProfileInputs(caseId, createProfileInputs(), { storageDir });
  await refreshCaseReleaseEvalRun(caseId, createReleaseEvalSeed(), { storageDir });
  await refreshCaseExportPackageSnapshot(caseId, {
    storageDir,
    generated_at: "2026-03-24T12:00:00.000Z",
  });
}

async function persistRequiredCanonicalArtifacts(caseId, storageDir) {
  await refreshCaseExportPackageJsonArtifactSnapshot(caseId, { storageDir });
  await refreshCaseExportPackageMarkdownArtifactSnapshot(caseId, { storageDir });
  await refreshCaseExportPackagePdfArtifactSnapshot(caseId, { storageDir });
  await refreshCaseExportPackageDocxArtifactSnapshot(caseId, { storageDir });
}

async function persistCanonicalCMDExportPackage(caseId, storageDir) {
  await upsertCaseProfileInputs(caseId, createCMDProfileInputs(), { storageDir });
  await refreshCaseReleaseEvalRun(caseId, createCMDReleaseEvalSeed(), { storageDir });
  await refreshCaseExportPackageSnapshot(caseId, {
    storageDir,
    generated_at: "2026-03-25T12:00:00.000Z",
  });
}

test("successful refresh for a tenant-owned SWE_BODELNING case with canonical export package + required canonical artifact data", async () => {
  const storageDir = createStorageDir();
  const loadCaseContext = createCaseContextLoader({
    "case-1": {
      tenant_id: "tenant-1",
      jurisdiction_profile_key: "SWE_BODELNING",
    },
  });

  await persistCanonicalExportPackage("case-1", storageDir);
  await persistRequiredCanonicalArtifacts("case-1", storageDir);

  const response = await handleCaseExportPackageBundleManifestRefreshRoute(
    {
      method: "POST",
      path: "/cases/case-1/export-package/bundle-manifest/refresh",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );

  const latest = await getLatestCaseExportPackageBundleManifestSnapshot("case-1", {
    storageDir,
  });

  assert.equal(response.status, 200);
  assert.deepEqual(response.body, latest);
  assert.deepEqual(
    validateSWEBodelningExportPackageBundleManifest(response.body),
    response.body,
  );
});

test("docs freeze the thin authenticated bundle/package manifest refresh seam as a distinct canonical runtime/refresh seam", () => {
  assert.match(
    docsText,
    /Thin Authenticated Bundle\/Package Manifest Refresh Seam Freeze/i,
  );
  assert.match(
    docsText,
    /thin authenticated bundle\/package manifest refresh seam is now frozen as the baseline runtime\/refresh seam/i,
  );
  assert.match(
    docsText,
    /only currently evidenced refresh surface in this freeze is `POST \/cases\/:caseId\/export-package\/bundle-manifest\/refresh`/i,
  );
  assert.match(
    docsText,
    /authenticated\/case-access-controlled boundary behavior at the thin route edge/i,
  );
  assert.match(
    docsText,
    /thin POST wrapper behavior that first enforces a route-edge upstream profile-basis invariant over the latest persisted export_package snapshot and then delegates to the existing governance-owned canonical bundle\/package manifest refresh\/create helper path/i,
  );
  assert.match(
    docsText,
    /fail-closed route-edge invariant that the latest upstream export_package and embedded profile_dossier `jurisdiction_profile_key` values must equal the authorized case-context `jurisdiction_profile_key` before bundle\/package manifest refresh persistence/i,
  );
  assert.match(
    docsText,
    /same-tenant supported-profile drift in already-persisted upstream export_package\/profile_dossier data rejects machine-readably with HTTP `409` `ERR_EXPORT_PACKAGE_UPSTREAM_JURISDICTION_PROFILE_MISMATCH` before a fresh bundle\/package manifest snapshot is persisted/i,
  );
  assert.match(
    docsText,
    /persisted canonical bundle\/package manifest snapshot response passthrough from that existing refresh helper path only after the route-edge upstream profile-basis invariant passes/i,
  );
  assert.match(
    docsText,
    /without latest-read semantics inside the route itself/i,
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
    /frozen governance bundle\/package manifest derivation and projection helper scaffold remains a distinct broader runtime\/helper seam/i,
  );
  assert.match(
    docsText,
    /this refresh seam is narrower than those seams and does not itself redefine shared currentness semantics, error-envelope partitioning, latest-read behavior, or bundle\/package manifest derivation \/ projection behavior/i,
  );
  assert.match(
    docsText,
    /this seam is not the latest-read boundary and does not itself own bundle\/package manifest derivation or rebuild logic beyond delegating to the already-existing refresh helper path/i,
  );
  assert.match(
    docsText,
    /no undocumented broadening of this refresh seam into latest-read, derivation, reconstruction, or neutral-model alignment should be introduced/i,
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
    /async function handleCaseExportPackageBundleManifestRefreshRoute\(/,
  );
  assert.match(
    apiIndexText,
    /loadAuthorizedCaseContext\(\s+routeMatch\.caseId,\s+request\.auth,\s+options\.loadCaseContext,\s+"export_package_bundle_manifest"/,
  );
  assert.match(apiIndexText, /if \(request\.method !== "POST"\)/);
  assert.match(
    apiIndexText,
    /await getLatestCaseExportPackageSnapshot\(\s+routeMatch\.caseId,\s+options,\s+\)/,
  );
  assert.match(
    apiIndexText,
    /ERR_EXPORT_PACKAGE_UPSTREAM_JURISDICTION_PROFILE_MISMATCH/,
  );
  assert.match(
    apiIndexText,
    /await refreshCaseExportPackageBundleManifestSnapshot\(/,
  );
  assert.match(
    apiIndexText,
    /return jsonResponse\(200, exportPackageBundleManifestSnapshot\)/,
  );
});

test("successful refresh for a tenant-owned CMD_PROFILE case with persisted export package plus required persisted JSON / Markdown / PDF / DOCX artifacts produces a canonical bundle/package manifest", async () => {
  const storageDir = createStorageDir();
  const loadCaseContext = createCaseContextLoader({
    "case-cmd": {
      tenant_id: "tenant-1",
      jurisdiction_profile_key: "CMD_PROFILE",
    },
  });

  await persistCanonicalCMDExportPackage("case-cmd", storageDir);
  await persistRequiredCanonicalArtifacts("case-cmd", storageDir);

  const response = await handleCaseExportPackageBundleManifestRefreshRoute(
    {
      method: "POST",
      path: "/cases/case-cmd/export-package/bundle-manifest/refresh",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );

  const latest = await getLatestCaseExportPackageBundleManifestSnapshot("case-cmd", {
    storageDir,
  });

  assert.equal(response.status, 200);
  assert.deepEqual(response.body, latest);
  assert.deepEqual(validateCMDExportPackageBundleManifest(response.body), response.body);
});

test("tenant/case isolation rejection", async () => {
  const response = await handleCaseExportPackageBundleManifestRefreshRoute(
    {
      method: "POST",
      path: "/cases/case-2/export-package/bundle-manifest/refresh",
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

test("no-canonical-export-package fail-closed response", async () => {
  const storageDir = createStorageDir();
  const loadCaseContext = createCaseContextLoader({
    "case-3": {
      tenant_id: "tenant-1",
      jurisdiction_profile_key: "SWE_BODELNING",
    },
  });

  await upsertCaseProfileInputs("case-3", createProfileInputs(), { storageDir });
  await refreshCaseReleaseEvalRun("case-3", createReleaseEvalSeed(), { storageDir });

  const response = await handleCaseExportPackageBundleManifestRefreshRoute(
    {
      method: "POST",
      path: "/cases/case-3/export-package/bundle-manifest/refresh",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );

  assert.equal(response.status, 404);
  assert.equal(response.body.error.code, "ERR_EXPORT_PACKAGE_SNAPSHOT_NOT_FOUND");
  assert.equal(response.body.error.case_id, "case-3");
});

test("invalid persisted export package data is rejected machine-readably with HTTP 422 before bundle/package manifest refresh persistence", async () => {
  const storageDir = createStorageDir();
  const loadCaseContext = createCaseContextLoader({
    "case-invalid-contract": {
      tenant_id: "tenant-1",
      jurisdiction_profile_key: "SWE_BODELNING",
    },
  });

  await persistCanonicalExportPackage("case-invalid-contract", storageDir);
  await persistRequiredCanonicalArtifacts("case-invalid-contract", storageDir);

  rewriteStoredExportPackageSnapshot(storageDir, "case-invalid-contract", (snapshot) => ({
    ...snapshot,
    generated_at: "",
  }));

  const response = await handleCaseExportPackageBundleManifestRefreshRoute(
    {
      method: "POST",
      path: "/cases/case-invalid-contract/export-package/bundle-manifest/refresh",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );

  const latest = await getLatestCaseExportPackageBundleManifestSnapshot(
    "case-invalid-contract",
    { storageDir },
  );

  assert.equal(response.status, 422);
  assert.deepEqual(response.body, {
    error: {
      case_id: "case-invalid-contract",
      code: "ERR_EXPORT_PACKAGE_INVALID",
      field: "generated_at",
      message: "generated_at must be a non-empty string",
    },
  });
  assert.equal(latest, null);
});

test("missing-required-artifact fail-closed response", async () => {
  const storageDir = createStorageDir();
  const loadCaseContext = createCaseContextLoader({
    "case-4": {
      tenant_id: "tenant-1",
      jurisdiction_profile_key: "SWE_BODELNING",
    },
  });

  await persistCanonicalExportPackage("case-4", storageDir);

  const response = await handleCaseExportPackageBundleManifestRefreshRoute(
    {
      method: "POST",
      path: "/cases/case-4/export-package/bundle-manifest/refresh",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );

  assert.equal(response.status, 404);
  assert.equal(response.body.error.code, "ERR_EXPORT_PACKAGE_JSON_ARTIFACT_SNAPSHOT_NOT_FOUND");
  assert.equal(response.body.error.case_id, "case-4");
});

test("no-persisted-export-package fail-closed response for CMD_PROFILE", async () => {
  const storageDir = createStorageDir();
  const loadCaseContext = createCaseContextLoader({
    "case-cmd-missing": {
      tenant_id: "tenant-1",
      jurisdiction_profile_key: "CMD_PROFILE",
    },
  });

  const response = await handleCaseExportPackageBundleManifestRefreshRoute(
    {
      method: "POST",
      path: "/cases/case-cmd-missing/export-package/bundle-manifest/refresh",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );

  assert.equal(response.status, 404);
  assert.deepEqual(response.body, {
    error: {
      code: "ERR_EXPORT_PACKAGE_SNAPSHOT_NOT_FOUND",
      case_id: "case-cmd-missing",
    },
  });
});

test("same-tenant upstream export package profile drift is rejected before bundle/package manifest refresh persistence", async () => {
  const storageDir = createStorageDir();
  const loadCaseContext = createCaseContextLoader({
    "case-profile-drift": {
      tenant_id: "tenant-1",
      jurisdiction_profile_key: "SWE_BODELNING",
    },
  });

  await persistCanonicalCMDExportPackage("case-profile-drift", storageDir);
  await persistRequiredCanonicalArtifacts("case-profile-drift", storageDir);

  const response = await handleCaseExportPackageBundleManifestRefreshRoute(
    {
      method: "POST",
      path: "/cases/case-profile-drift/export-package/bundle-manifest/refresh",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );

  const latest = await getLatestCaseExportPackageBundleManifestSnapshot(
    "case-profile-drift",
    { storageDir },
  );

  assert.equal(response.status, 409);
  assert.deepEqual(response.body, {
    error: {
      case_id: "case-profile-drift",
      code: "ERR_EXPORT_PACKAGE_UPSTREAM_JURISDICTION_PROFILE_MISMATCH",
      export_package_jurisdiction_profile_key: "CMD_PROFILE",
      expected_jurisdiction_profile_key: "SWE_BODELNING",
      profile_dossier_jurisdiction_profile_key: "CMD_PROFILE",
    },
  });
  assert.equal(latest, null);
});

test("missing required artifact snapshot for CMD_PROFILE fails closed with a machine-readable response", async () => {
  const storageDir = createStorageDir();
  const loadCaseContext = createCaseContextLoader({
    "case-cmd-artifact-missing": {
      tenant_id: "tenant-1",
      jurisdiction_profile_key: "CMD_PROFILE",
    },
  });

  await persistCanonicalCMDExportPackage("case-cmd-artifact-missing", storageDir);

  const response = await handleCaseExportPackageBundleManifestRefreshRoute(
    {
      method: "POST",
      path: "/cases/case-cmd-artifact-missing/export-package/bundle-manifest/refresh",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );

  assert.equal(response.status, 404);
  assert.deepEqual(response.body, {
    error: {
      code: "ERR_EXPORT_PACKAGE_JSON_ARTIFACT_SNAPSHOT_NOT_FOUND",
      case_id: "case-cmd-artifact-missing",
    },
  });
});

test("unsupported/non-SWE bundle/package manifest response remains machine-readable and non-breaking", async () => {
  const response = await handleCaseExportPackageBundleManifestRefreshRoute(
    {
      method: "POST",
      path: "/cases/case-5/export-package/bundle-manifest/refresh",
      auth: { tenantId: "tenant-1" },
    },
    {
      loadCaseContext: createCaseContextLoader({
        "case-5": {
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

test("refresh response matches the persisted canonical bundle/package manifest snapshot rather than diverging", async () => {
  const storageDir = createStorageDir();
  const loadCaseContext = createCaseContextLoader({
    "case-6": {
      tenant_id: "tenant-1",
      jurisdiction_profile_key: "SWE_BODELNING",
    },
  });

  await persistCanonicalExportPackage("case-6", storageDir);
  await persistRequiredCanonicalArtifacts("case-6", storageDir);

  const response = await handleCaseExportPackageBundleManifestRefreshRoute(
    {
      method: "POST",
      path: "/cases/case-6/export-package/bundle-manifest/refresh",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );

  const latest = await getLatestCaseExportPackageBundleManifestSnapshot("case-6", {
    storageDir,
  });

  assert.equal(response.status, 200);
  assert.deepEqual(response.body, latest);
});

test("no readiness behavior changes are introduced", () => {
  const workerEntries = fs.readdirSync(path.join(__dirname, "..", "workers", "analyze"));

  assert.deepEqual(workerEntries, [".gitkeep"]);
  assert.match(
    docsText,
    /POST \/cases\/:caseId\/export-package\/bundle-manifest\/refresh/,
  );
  assert.match(
    docsText,
    /ERR_EXPORT_PACKAGE_UPSTREAM_JURISDICTION_PROFILE_MISMATCH/,
  );
  assert.match(
    docsText,
    /returns the persisted canonical bundle\/package manifest snapshot unchanged/,
  );
  assert.match(
    docsText,
    /without route-local bundle\/package manifest derivation, delivery, or package assembly/,
  );
});
