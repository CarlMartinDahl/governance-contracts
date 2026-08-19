const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const {
  handleCaseExportPackageDocxArtifactRefreshRoute,
} = require("../apps/api/src/index.js");
const {
  getLatestCaseExportPackageDocxArtifactSnapshot,
  refreshCaseExportPackageSnapshot,
  refreshCaseReleaseEvalRun,
  upsertCaseProfileInputs,
} = require("../packages/database/src/index.js");
const {
  validateCMDExportPackageDocxArtifact,
  validateSWEBodelningExportPackageDocxArtifact,
} = require("../packages/schemas/src/index.js");

const docsPath = path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md");
const docsText = fs.readFileSync(docsPath, "utf8");
const apiIndexPath = path.join(__dirname, "..", "apps", "api", "src", "index.js");
const apiIndexText = fs.readFileSync(apiIndexPath, "utf8");

function createStorageDir() {
  return fs.mkdtempSync(
    path.join(os.tmpdir(), "governance-contracts-export-package-docx-artifact-refresh-api-"),
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

test("docs freeze the thin authenticated export_package_docx_artifact refresh seam as a distinct canonical runtime/refresh seam", () => {
  assert.match(
    docsText,
    /Thin Authenticated DOCX Export-Artifact Refresh Seam Freeze/i,
  );
  assert.match(
    docsText,
    /thin authenticated `export_package_docx_artifact` refresh seam is now frozen as the baseline runtime\/refresh seam/i,
  );
  assert.match(
    docsText,
    /only currently evidenced refresh surface in this freeze is `POST \/cases\/:caseId\/export-package\/docx-artifact\/refresh`/i,
  );
  assert.match(
    docsText,
    /authenticated\/case-access-controlled boundary behavior at the thin route edge/i,
  );
  assert.match(
    docsText,
    /thin POST wrapper behavior that first enforces a route-edge upstream profile-basis invariant over the latest persisted export_package snapshot and then delegates to the existing shared-governance DOCX export artifact refresh\/create path plus existing persistence helpers/i,
  );
  assert.match(
    docsText,
    /fail-closed route-edge invariant that the latest upstream export_package and embedded profile_dossier `jurisdiction_profile_key` values must equal the authorized case-context `jurisdiction_profile_key` before DOCX artifact refresh persistence/i,
  );
  assert.match(
    docsText,
    /same-tenant supported-profile drift in already-persisted upstream export_package\/profile_dossier data rejects machine-readably with HTTP `409` `ERR_EXPORT_PACKAGE_UPSTREAM_JURISDICTION_PROFILE_MISMATCH` before a fresh DOCX artifact snapshot is persisted/i,
  );
  assert.match(
    docsText,
    /persisted canonical DOCX export artifact snapshot response passthrough from that existing refresh\/create path only after the route-edge upstream profile-basis invariant passes/i,
  );
  assert.match(
    docsText,
    /no latest-read semantics or delivery-byte passthrough semantics inside this seam/i,
  );
  assert.match(
    docsText,
    /shared `snapshot_status` seam governs shared currentness semantics where relevant for this refresh seam and remains a separate frozen shared currentness boundary/i,
  );
  assert.match(
    docsText,
    /shared API error-envelope seam and its frozen subfamilies remain the governing boundary for machine-readable refresh error envelopes/i,
  );
  assert.match(
    docsText,
    /thin authenticated `export_package_docx_artifact` latest-read seam remains a distinct read boundary/i,
  );
  assert.match(
    docsText,
    /thin authenticated current-only `export_package_docx_artifact` delivery seam remains a distinct current-only byte-delivery boundary/i,
  );
  assert.match(
    docsText,
    /frozen broader governance export-artifact derivation and round-trip seam remains a distinct broader runtime\/helper seam/i,
  );
  assert.match(
    docsText,
    /frozen governance PDF\/DOCX content-assembly seam remains a distinct narrower PDF\/DOCX helper seam/i,
  );
  assert.match(
    docsText,
    /surrounding `export_package_docx_artifact` projection, refresh, and delivery machinery remains a broader documented runtime\/helper area, and this refresh seam is narrower than that surrounding machinery/i,
  );
  assert.match(
    docsText,
    /does not itself redefine latest-read, delivery, or DOCX export-artifact derivation \/ rebuild behavior/i,
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
    /async function handleCaseExportPackageDocxArtifactRefreshRoute\(/,
  );
  assert.match(
    apiIndexText,
    /loadAuthorizedCaseContext\(\s+routeMatch\.caseId,\s+request\.auth,\s+options\.loadCaseContext,\s+"export_package_docx_artifact"/,
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
    /await refreshCaseExportPackageDocxArtifactSnapshot\(routeMatch\.caseId, options\)/,
  );
  assert.match(
    apiIndexText,
    /return jsonResponse\(200, exportPackageDocxArtifactSnapshot\)/,
  );
});

test("successful refresh for a tenant-owned SWE_BODELNING case with canonical export package data", async () => {
  const storageDir = createStorageDir();
  const loadCaseContext = createCaseContextLoader({
    "case-1": {
      tenant_id: "tenant-1",
      jurisdiction_profile_key: "SWE_BODELNING",
    },
  });

  await upsertCaseProfileInputs("case-1", createProfileInputs(), { storageDir });
  await refreshCaseReleaseEvalRun("case-1", createReleaseEvalSeed(), { storageDir });
  await refreshCaseExportPackageSnapshot("case-1", {
    storageDir,
    generated_at: "2026-03-24T12:00:00.000Z",
  });

  const response = await handleCaseExportPackageDocxArtifactRefreshRoute(
    {
      method: "POST",
      path: "/cases/case-1/export-package/docx-artifact/refresh",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );

  const latest = await getLatestCaseExportPackageDocxArtifactSnapshot("case-1", {
    storageDir,
  });

  assert.equal(response.status, 200);
  assert.deepEqual(response.body, latest);
  assert.deepEqual(
    validateSWEBodelningExportPackageDocxArtifact(response.body),
    response.body,
  );
});

test("successful refresh for a tenant-owned CMD_PROFILE case with persisted export package data produces a canonical DOCX artifact", async () => {
  const storageDir = createStorageDir();
  const loadCaseContext = createCaseContextLoader({
    "case-cmd": {
      tenant_id: "tenant-1",
      jurisdiction_profile_key: "CMD_PROFILE",
    },
  });

  await upsertCaseProfileInputs("case-cmd", createCMDProfileInputs(), { storageDir });
  await refreshCaseReleaseEvalRun("case-cmd", createCMDReleaseEvalSeed(), { storageDir });
  await refreshCaseExportPackageSnapshot("case-cmd", {
    storageDir,
    generated_at: "2026-03-25T12:00:00.000Z",
  });

  const response = await handleCaseExportPackageDocxArtifactRefreshRoute(
    {
      method: "POST",
      path: "/cases/case-cmd/export-package/docx-artifact/refresh",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );

  const latest = await getLatestCaseExportPackageDocxArtifactSnapshot("case-cmd", {
    storageDir,
  });

  assert.equal(response.status, 200);
  assert.deepEqual(response.body, latest);
  assert.deepEqual(validateCMDExportPackageDocxArtifact(response.body), response.body);
});

test("tenant/case isolation rejection", async () => {
  const response = await handleCaseExportPackageDocxArtifactRefreshRoute(
    {
      method: "POST",
      path: "/cases/case-2/export-package/docx-artifact/refresh",
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

  const response = await handleCaseExportPackageDocxArtifactRefreshRoute(
    {
      method: "POST",
      path: "/cases/case-3/export-package/docx-artifact/refresh",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );

  assert.equal(response.status, 404);
  assert.equal(response.body.error.code, "ERR_EXPORT_PACKAGE_SNAPSHOT_NOT_FOUND");
  assert.equal(response.body.error.case_id, "case-3");
});

test("invalid persisted export package data is rejected machine-readably with HTTP 422 before DOCX artifact refresh persistence", async () => {
  const storageDir = createStorageDir();
  const loadCaseContext = createCaseContextLoader({
    "case-invalid-contract": {
      tenant_id: "tenant-1",
      jurisdiction_profile_key: "SWE_BODELNING",
    },
  });

  await upsertCaseProfileInputs("case-invalid-contract", createProfileInputs(), { storageDir });
  await refreshCaseReleaseEvalRun("case-invalid-contract", createReleaseEvalSeed(), {
    storageDir,
  });
  await refreshCaseExportPackageSnapshot("case-invalid-contract", {
    storageDir,
    generated_at: "2026-03-24T12:00:00.000Z",
  });

  rewriteStoredExportPackageSnapshot(storageDir, "case-invalid-contract", (snapshot) => ({
    ...snapshot,
    generated_at: "",
  }));

  const response = await handleCaseExportPackageDocxArtifactRefreshRoute(
    {
      method: "POST",
      path: "/cases/case-invalid-contract/export-package/docx-artifact/refresh",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );

  const latest = await getLatestCaseExportPackageDocxArtifactSnapshot("case-invalid-contract", {
    storageDir,
  });

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

test("unsupported/non-SWE DOCX artifact response remains machine-readable and non-breaking", async () => {
  const response = await handleCaseExportPackageDocxArtifactRefreshRoute(
    {
      method: "POST",
      path: "/cases/case-4/export-package/docx-artifact/refresh",
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

test("no-persisted-export-package fail-closed response for CMD_PROFILE", async () => {
  const storageDir = createStorageDir();
  const loadCaseContext = createCaseContextLoader({
    "case-cmd-missing": {
      tenant_id: "tenant-1",
      jurisdiction_profile_key: "CMD_PROFILE",
    },
  });

  const response = await handleCaseExportPackageDocxArtifactRefreshRoute(
    {
      method: "POST",
      path: "/cases/case-cmd-missing/export-package/docx-artifact/refresh",
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

test("same-tenant upstream export package profile drift is rejected before DOCX artifact refresh persistence", async () => {
  const storageDir = createStorageDir();
  const loadCaseContext = createCaseContextLoader({
    "case-profile-drift": {
      tenant_id: "tenant-1",
      jurisdiction_profile_key: "SWE_BODELNING",
    },
  });

  await upsertCaseProfileInputs("case-profile-drift", createCMDProfileInputs(), {
    storageDir,
  });
  await refreshCaseReleaseEvalRun("case-profile-drift", createCMDReleaseEvalSeed(), {
    storageDir,
  });
  await refreshCaseExportPackageSnapshot("case-profile-drift", {
    storageDir,
    generated_at: "2026-03-25T12:00:00.000Z",
  });

  const response = await handleCaseExportPackageDocxArtifactRefreshRoute(
    {
      method: "POST",
      path: "/cases/case-profile-drift/export-package/docx-artifact/refresh",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );

  const latest = await getLatestCaseExportPackageDocxArtifactSnapshot(
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

test("refresh response matches the persisted canonical DOCX artifact snapshot rather than diverging", async () => {
  const storageDir = createStorageDir();
  const loadCaseContext = createCaseContextLoader({
    "case-5": {
      tenant_id: "tenant-1",
      jurisdiction_profile_key: "SWE_BODELNING",
    },
  });

  await upsertCaseProfileInputs("case-5", createProfileInputs(), { storageDir });
  await refreshCaseReleaseEvalRun("case-5", createReleaseEvalSeed(), { storageDir });
  await refreshCaseExportPackageSnapshot("case-5", {
    storageDir,
    generated_at: "2026-03-24T12:00:00.000Z",
  });

  const response = await handleCaseExportPackageDocxArtifactRefreshRoute(
    {
      method: "POST",
      path: "/cases/case-5/export-package/docx-artifact/refresh",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );

  const latest = await getLatestCaseExportPackageDocxArtifactSnapshot("case-5", {
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
    /POST \/cases\/:caseId\/export-package\/docx-artifact\/refresh/,
  );
  assert.match(
    docsText,
    /ERR_EXPORT_PACKAGE_UPSTREAM_JURISDICTION_PROFILE_MISMATCH/,
  );
  assert.match(
    docsText,
    /without route-local DOCX artifact derivation/,
  );
});
