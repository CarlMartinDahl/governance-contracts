const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const {
  handleCaseExportPackageMarkdownArtifactLatestRoute,
} = require("../apps/api/src/index.js");
const {
  getLatestCaseExportPackageProjection,
  getLatestCaseExportPackageMarkdownArtifactProjection,
  refreshCaseExportPackageMarkdownArtifactSnapshot,
  refreshCaseExportPackageSnapshot,
  refreshCaseReleaseEvalRun,
  upsertCaseProfileInputs,
} = require("../packages/database/src/index.js");
const {
  validateCMDExportPackageMarkdownArtifactProjection,
  validateSWEBodelningExportPackageMarkdownArtifactProjection,
} = require("../packages/schemas/src/index.js");
const {
  deriveCMDExportPackageVersion,
  deriveSWEBodelningExportPackageVersion,
} = require("../packages/governance/src/index.js");

const docsPath = path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md");
const docsText = fs.readFileSync(docsPath, "utf8");
const apiIndexPath = path.join(__dirname, "..", "apps", "api", "src", "index.js");
const apiIndexText = fs.readFileSync(apiIndexPath, "utf8");

function createStorageDir() {
  return fs.mkdtempSync(
    path.join(os.tmpdir(), "governance-contracts-export-package-markdown-artifact-api-"),
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

test("docs freeze the thin authenticated export_package_markdown_artifact latest-read seam as a distinct canonical runtime/read seam", () => {
  assert.match(
    docsText,
    /Thin Authenticated Markdown Export-Artifact Latest-Read Seam Freeze/i,
  );
  assert.match(
    docsText,
    /thin authenticated `export_package_markdown_artifact` latest-read seam is now frozen as the baseline runtime\/read seam/i,
  );
  assert.match(
    docsText,
    /only currently evidenced latest-read surface in this freeze is `GET \/cases\/:caseId\/export-package\/markdown-artifact\/latest`/i,
  );
  assert.match(
    docsText,
    /authenticated\/case-access-controlled boundary behavior at the thin route edge/i,
  );
  assert.match(
    docsText,
    /read-only latest projection passthrough over the persisted canonical Markdown export artifact snapshot unchanged plus the top-level machine-readable snapshot_status block already present in the persisted latest projection contract only when the latest export_package snapshot `jurisdiction_profile_key` and any embedded `profile_dossier_snapshot\.jurisdiction_profile_key` both match the authorized case-context `jurisdiction_profile_key`/i,
  );
  assert.match(
    docsText,
    /fail-closed route-edge invariant that the latest export_package snapshot `jurisdiction_profile_key` and any embedded `profile_dossier_snapshot\.jurisdiction_profile_key` must equal the authorized case-context `jurisdiction_profile_key` before return/i,
  );
  assert.match(
    docsText,
    /same-tenant supported-profile drift in already-persisted upstream export_package\/profile_dossier data rejects machine-readably with HTTP `409` `ERR_EXPORT_PACKAGE_UPSTREAM_JURISDICTION_PROFILE_MISMATCH` instead of returning the mismatched latest projection/i,
  );
  assert.match(
    docsText,
    /current\/stale projection metadata only where already surfaced through the persisted latest projection contract/i,
  );
  assert.match(
    docsText,
    /no refresh semantics or delivery-byte passthrough semantics inside this seam/i,
  );
  assert.match(
    docsText,
    /fail-closed missing-snapshot responses from this exact latest-read route with HTTP 404 ERR_EXPORT_PACKAGE_MARKDOWN_ARTIFACT_SNAPSHOT_NOT_FOUND plus route-level case_id detail/i,
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
    /currently evidenced `ERR_EXPORT_PACKAGE_MARKDOWN_ARTIFACT_SNAPSHOT_NOT_FOUND` route branch for this thin latest-read seam remains distinct from the already-frozen shared `resource\/snapshot not found` API envelope partition\/prerequisites/i,
  );
  assert.match(
    docsText,
    /frozen broader governance export-artifact derivation and round-trip seam remains a distinct broader runtime\/helper seam/i,
  );
  assert.match(
    docsText,
    /surrounding `export_package_markdown_artifact` projection, refresh, and delivery machinery remains a broader documented runtime\/helper area, and this latest-read seam is narrower than that surrounding machinery/i,
  );
  assert.match(
    docsText,
    /does not itself redefine refresh, delivery, or Markdown export-artifact derivation \/ rebuild behavior/i,
  );
  assert.match(
    docsText,
    /no undocumented broadening of this latest-read seam into refresh, delivery, derivation, reconstruction, or neutral-model alignment should be introduced/i,
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
    /async function handleCaseExportPackageMarkdownArtifactLatestRoute\(/,
  );
  assert.match(
    apiIndexText,
    /loadAuthorizedCaseContext\(\s+routeMatch\.caseId,\s+request\.auth,\s+options\.loadCaseContext,\s+"export_package_markdown_artifact"/,
  );
  assert.match(apiIndexText, /if \(request\.method !== "GET"\)/);
  assert.match(
    apiIndexText,
    /await getLatestCaseExportPackageMarkdownArtifactProjection\(\s+routeMatch\.caseId,\s+options,\s+\)/,
  );
  assert.match(
    apiIndexText,
    /if \(!exportPackageMarkdownArtifactProjection\) {\s+return errorResponse\(404, "ERR_EXPORT_PACKAGE_MARKDOWN_ARTIFACT_SNAPSHOT_NOT_FOUND", {\s+case_id: routeMatch\.caseId,\s+}\);\s+}/,
  );
  assert.match(
    apiIndexText,
    /ERR_EXPORT_PACKAGE_UPSTREAM_JURISDICTION_PROFILE_MISMATCH/,
  );
  assert.match(
    apiIndexText,
    /return jsonResponse\(200, exportPackageMarkdownArtifactProjection\)/,
  );
});

test("successful Markdown artifact retrieval for a tenant-owned SWE_BODELNING case with canonical artifact data", async () => {
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
  const persistedMarkdownArtifact =
    await refreshCaseExportPackageMarkdownArtifactSnapshot("case-1", {
      storageDir,
    });

  const expectedProjection = await getLatestCaseExportPackageMarkdownArtifactProjection("case-1", {
    storageDir,
  });
  const response = await handleCaseExportPackageMarkdownArtifactLatestRoute(
    {
      method: "GET",
      path: "/cases/case-1/export-package/markdown-artifact/latest",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );

  assert.equal(response.status, 200);
  assert.deepEqual(response.body, expectedProjection);
  assert.deepEqual(
    validateSWEBodelningExportPackageMarkdownArtifactProjection(response.body),
    response.body,
  );
  const { snapshot_status, ...persistedFields } = response.body;

  assert.deepEqual(persistedFields, persistedMarkdownArtifact);
  assert.deepEqual(snapshot_status, {
    source: "persisted-current",
    snapshot_export_version_found: expectedProjection.snapshot_status.snapshot_export_version_found,
    current_export_version: deriveSWEBodelningExportPackageVersion(),
    snapshot_is_current: true,
  });
});

test("successful GET /cases/:caseId/export-package/markdown-artifact/latest for a tenant-owned CMD_PROFILE case returns the persisted Markdown artifact projection unchanged", async () => {
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
  const persistedMarkdownArtifact =
    await refreshCaseExportPackageMarkdownArtifactSnapshot("case-cmd", {
      storageDir,
    });

  const expectedProjection = await getLatestCaseExportPackageMarkdownArtifactProjection(
    "case-cmd",
    { storageDir },
  );
  const response = await handleCaseExportPackageMarkdownArtifactLatestRoute(
    {
      method: "GET",
      path: "/cases/case-cmd/export-package/markdown-artifact/latest",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );

  assert.equal(response.status, 200);
  assert.deepEqual(response.body, expectedProjection);
  assert.deepEqual(
    validateCMDExportPackageMarkdownArtifactProjection(response.body),
    response.body,
  );
  const { snapshot_status, ...persistedFields } = response.body;
  assert.deepEqual(persistedFields, persistedMarkdownArtifact);
  assert.deepEqual(snapshot_status, {
    source: "persisted-current",
    snapshot_export_version_found: expectedProjection.snapshot_status.snapshot_export_version_found,
    current_export_version: deriveCMDExportPackageVersion(),
    snapshot_is_current: true,
  });
});

test("tenant/case isolation rejection", async () => {
  const response = await handleCaseExportPackageMarkdownArtifactLatestRoute(
    {
      method: "GET",
      path: "/cases/case-2/export-package/markdown-artifact/latest",
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

test("no-canonical-Markdown-artifact fail-closed response", async () => {
  const storageDir = createStorageDir();
  const loadCaseContext = createCaseContextLoader({
    "case-3": {
      tenant_id: "tenant-1",
      jurisdiction_profile_key: "SWE_BODELNING",
    },
  });

  await upsertCaseProfileInputs("case-3", createProfileInputs(), { storageDir });
  await refreshCaseReleaseEvalRun("case-3", createReleaseEvalSeed(), { storageDir });
  await refreshCaseExportPackageSnapshot("case-3", {
    storageDir,
    generated_at: "2026-03-24T12:00:00.000Z",
  });

  const response = await handleCaseExportPackageMarkdownArtifactLatestRoute(
    {
      method: "GET",
      path: "/cases/case-3/export-package/markdown-artifact/latest",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );

  assert.equal(response.status, 404);
  assert.equal(
    response.body.error.code,
    "ERR_EXPORT_PACKAGE_MARKDOWN_ARTIFACT_SNAPSHOT_NOT_FOUND",
  );
  assert.equal(response.body.error.case_id, "case-3");
});

test("no-persisted-export-package fail-closed response for CMD_PROFILE Markdown artifact latest", async () => {
  const storageDir = createStorageDir();
  const loadCaseContext = createCaseContextLoader({
    "case-cmd-missing": {
      tenant_id: "tenant-1",
      jurisdiction_profile_key: "CMD_PROFILE",
    },
  });

  const response = await handleCaseExportPackageMarkdownArtifactLatestRoute(
    {
      method: "GET",
      path: "/cases/case-cmd-missing/export-package/markdown-artifact/latest",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );

  assert.equal(response.status, 404);
  assert.deepEqual(response.body, {
    error: {
      code: "ERR_EXPORT_PACKAGE_MARKDOWN_ARTIFACT_SNAPSHOT_NOT_FOUND",
      case_id: "case-cmd-missing",
    },
  });
});

test("same-tenant upstream export package profile drift is rejected instead of returning the mismatched Markdown artifact latest projection", async () => {
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
  await refreshCaseReleaseEvalRun(
    "case-profile-drift",
    createCMDReleaseEvalSeed(),
    { storageDir },
  );
  await refreshCaseExportPackageSnapshot("case-profile-drift", {
    storageDir,
    generated_at: "2026-03-25T12:00:00.000Z",
  });
  await refreshCaseExportPackageMarkdownArtifactSnapshot("case-profile-drift", {
    storageDir,
  });

  const expectedProjection =
    await getLatestCaseExportPackageMarkdownArtifactProjection(
      "case-profile-drift",
      { storageDir },
    );
  const exportPackageProjection = await getLatestCaseExportPackageProjection(
    "case-profile-drift",
    { storageDir },
  );

  assert.equal(exportPackageProjection.jurisdiction_profile_key, "CMD_PROFILE");
  assert.equal(
    exportPackageProjection.profile_dossier_snapshot.jurisdiction_profile_key,
    "CMD_PROFILE",
  );

  const response = await handleCaseExportPackageMarkdownArtifactLatestRoute(
    {
      method: "GET",
      path: "/cases/case-profile-drift/export-package/markdown-artifact/latest",
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
      export_package_jurisdiction_profile_key: "CMD_PROFILE",
      profile_dossier_jurisdiction_profile_key: "CMD_PROFILE",
    },
  });
});

test("unsupported/non-SWE Markdown artifact response remains machine-readable and non-breaking", async () => {
  const response = await handleCaseExportPackageMarkdownArtifactLatestRoute(
    {
      method: "GET",
      path: "/cases/case-4/export-package/markdown-artifact/latest",
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

test("stale Markdown artifact snapshot yields snapshot_status.source = persisted-stale when export-package/dossier drift occurs", async () => {
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
  const persistedMarkdownArtifact =
    await refreshCaseExportPackageMarkdownArtifactSnapshot("case-5", {
      storageDir,
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

  const response = await handleCaseExportPackageMarkdownArtifactLatestRoute(
    {
      method: "GET",
      path: "/cases/case-5/export-package/markdown-artifact/latest",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );

  assert.equal(response.status, 200);
  const { snapshot_status, ...persistedFields } = response.body;
  assert.deepEqual(persistedFields, persistedMarkdownArtifact);
  assert.equal(snapshot_status.source, "persisted-stale");
  assert.equal(
    snapshot_status.snapshot_export_version_found,
    deriveSWEBodelningExportPackageVersion(),
  );
  assert.equal(
    snapshot_status.current_export_version,
    deriveSWEBodelningExportPackageVersion(),
  );
  assert.equal(snapshot_status.snapshot_is_current, false);
});

test("Markdown artifact payload matches the persisted canonical snapshot rather than diverging", async () => {
  const storageDir = createStorageDir();
  const loadCaseContext = createCaseContextLoader({
    "case-6": {
      tenant_id: "tenant-1",
      jurisdiction_profile_key: "SWE_BODELNING",
    },
  });

  await upsertCaseProfileInputs("case-6", createProfileInputs(), { storageDir });
  await refreshCaseReleaseEvalRun("case-6", createReleaseEvalSeed(), { storageDir });
  await refreshCaseExportPackageSnapshot("case-6", {
    storageDir,
    generated_at: "2026-03-24T12:00:00.000Z",
  });
  const persistedMarkdownArtifact =
    await refreshCaseExportPackageMarkdownArtifactSnapshot("case-6", {
      storageDir,
    });

  const response = await handleCaseExportPackageMarkdownArtifactLatestRoute(
    {
      method: "GET",
      path: "/cases/case-6/export-package/markdown-artifact/latest",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );

  assert.equal(response.status, 200);
  const { snapshot_status, ...persistedFields } = response.body;
  assert.equal(snapshot_status.source, "persisted-current");
  assert.deepEqual(persistedFields, persistedMarkdownArtifact);
});

test("no readiness behavior changes are introduced", () => {
  const workerEntries = fs.readdirSync(path.join(__dirname, "..", "workers", "analyze"));

  assert.deepEqual(workerEntries, [".gitkeep"]);
  assert.match(
    docsText,
    /GET \/cases\/:caseId\/export-package\/markdown-artifact\/latest/,
  );
  assert.match(
    docsText,
    /returns the persisted canonical Markdown export artifact snapshot unchanged plus a machine-readable top-level `snapshot_status` block/,
  );
  assert.match(
    docsText,
    /without route-local Markdown artifact recomputation or silent refresh/,
  );
});
