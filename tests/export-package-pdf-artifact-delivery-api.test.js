const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const {
  handleCaseExportPackagePdfArtifactDownloadRoute,
} = require("../apps/api/src/index.js");
const {
  getLatestCaseExportPackageProjection,
  refreshCaseExportPackagePdfArtifactSnapshot,
  refreshCaseExportPackageSnapshot,
  refreshCaseReleaseEvalRun,
  upsertCaseProfileInputs,
} = require("../packages/database/src/index.js");
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
    path.join(os.tmpdir(), "governance-contracts-export-package-pdf-artifact-delivery-api-"),
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

test("docs freeze the thin authenticated current-only export_package_pdf_artifact delivery seam as a distinct canonical runtime/delivery seam", () => {
  assert.match(
    docsText,
    /Thin Authenticated Current-Only PDF Export-Artifact Delivery Seam Freeze/i,
  );
  assert.match(
    docsText,
    /thin authenticated current-only `export_package_pdf_artifact` delivery seam is now frozen as the baseline runtime\/delivery seam/i,
  );
  assert.match(
    docsText,
    /only currently evidenced delivery surface in this freeze is `GET \/cases\/:caseId\/export-package\/pdf-artifact\/download`/i,
  );
  assert.match(
    docsText,
    /authenticated\/case-access-controlled boundary behavior at the thin route edge/i,
  );
  assert.match(
    docsText,
    /current-only gating over the persisted PDF export artifact projection through the already-frozen shared snapshot_status currentness dependency/i,
  );
  assert.match(
    docsText,
    /fail-closed route-edge invariant that the latest export_package snapshot `jurisdiction_profile_key` and any embedded `profile_dossier_snapshot\.jurisdiction_profile_key` must equal the authorized case-context `jurisdiction_profile_key` before PDF bytes are returned/i,
  );
  assert.match(
    docsText,
    /same-tenant supported-profile drift in already-persisted upstream export_package\/profile_dossier data rejects machine-readably with HTTP `409` `ERR_EXPORT_PACKAGE_UPSTREAM_JURISDICTION_PROFILE_MISMATCH` instead of returning mismatched PDF bytes/i,
  );
  assert.match(
    docsText,
    /thin passthrough over the persisted canonical PDF bytes decoded from body_base64 plus the persisted content_type and filename header semantics already evidenced by the current route and tests/i,
  );
  assert.match(
    docsText,
    /currently evidenced `ERR_EXPORT_PACKAGE_UPSTREAM_JURISDICTION_PROFILE_MISMATCH` route branch for this thin current-only delivery seam remains distinct from the already-frozen shared `jurisdiction\/profile mismatch` API envelope partition\/prerequisites/i,
  );
  assert.match(
    docsText,
    /fail-closed missing-snapshot responses from this exact delivery route with HTTP 404 ERR_EXPORT_PACKAGE_PDF_ARTIFACT_SNAPSHOT_NOT_FOUND plus route-level case_id detail/i,
  );
  assert.match(
    docsText,
    /fail-closed not-current responses from this exact delivery route with HTTP 409 ERR_EXPORT_PACKAGE_PDF_ARTIFACT_SNAPSHOT_NOT_CURRENT plus route-level case_id and shared snapshot_status detail/i,
  );
  assert.match(
    docsText,
    /no latest-read semantics or refresh semantics inside this seam/i,
  );
  assert.match(
    docsText,
    /shared `snapshot_status` seam governs shared currentness semantics where relevant for this delivery seam and remains a separate frozen shared currentness boundary/i,
  );
  assert.match(
    docsText,
    /shared API error-envelope seam and its frozen subfamilies remain the governing boundary for machine-readable current-only delivery error envelopes/i,
  );
  assert.match(
    docsText,
    /currently evidenced `ERR_EXPORT_PACKAGE_PDF_ARTIFACT_SNAPSHOT_NOT_FOUND` route branch for this thin current-only delivery seam remains distinct from the already-frozen shared `resource\/snapshot not found` API envelope partition\/prerequisites/i,
  );
  assert.match(
    docsText,
    /currently evidenced `ERR_EXPORT_PACKAGE_PDF_ARTIFACT_SNAPSHOT_NOT_CURRENT` route branch for this thin current-only delivery seam remains distinct from the already-frozen shared `snapshot not current` API envelope partition\/prerequisites/i,
  );
  assert.match(
    docsText,
    /thin authenticated `export_package_pdf_artifact` latest-read seam remains a distinct read boundary/i,
  );
  assert.match(
    docsText,
    /thin authenticated `export_package_pdf_artifact` refresh seam remains a distinct refresh boundary/i,
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
    /surrounding `export_package_pdf_artifact` projection, refresh, and delivery machinery remains a broader documented runtime\/helper area, and this delivery seam is narrower than that surrounding machinery/i,
  );
  assert.match(
    docsText,
    /does not itself redefine latest-read, refresh, or PDF export-artifact derivation \/ rebuild behavior/i,
  );
  assert.match(
    docsText,
    /no undocumented broadening of this delivery seam into latest-read, refresh, derivation, reconstruction, or neutral-model alignment should be introduced/i,
  );
  assert.match(
    docsText,
    /the seam should remain a thin authenticated current-only delivery boundary unless explicit contract detail changes/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, delivery semantics, schema behavior, or fail-closed behavior/i,
  );

  assert.match(
    apiIndexText,
    /async function handleCaseExportPackagePdfArtifactDownloadRoute\(/,
  );
  assert.match(
    apiIndexText,
    /loadAuthorizedCaseContext\(\s+routeMatch\.caseId,\s+request\.auth,\s+options\.loadCaseContext,\s+"export_package_pdf_artifact"/,
  );
  assert.match(apiIndexText, /if \(request\.method !== "GET"\)/);
  assert.match(
    apiIndexText,
    /await getLatestCaseExportPackagePdfArtifactProjection\(routeMatch\.caseId, options\)/,
  );
  assert.match(
    apiIndexText,
    /await getLatestCaseExportPackageProjection\(\s+routeMatch\.caseId,\s+options,\s+\)/,
  );
  assert.match(
    apiIndexText,
    /ERR_EXPORT_PACKAGE_UPSTREAM_JURISDICTION_PROFILE_MISMATCH/,
  );
  assert.match(
    apiIndexText,
    /if \(!exportPackagePdfArtifactProjection\) {\s+return errorResponse\(404, "ERR_EXPORT_PACKAGE_PDF_ARTIFACT_SNAPSHOT_NOT_FOUND", {\s+case_id: routeMatch\.caseId,\s+}\);\s+}/,
  );
  assert.match(
    apiIndexText,
    /snapshot_status\.snapshot_is_current !== true/,
  );
  assert.match(
    apiIndexText,
    /return errorResponse\(409, "ERR_EXPORT_PACKAGE_PDF_ARTIFACT_SNAPSHOT_NOT_CURRENT", {\s+case_id: routeMatch\.caseId,\s+snapshot_status: exportPackagePdfArtifactProjection\.snapshot_status,\s+}\);/,
  );
  assert.match(
    apiIndexText,
    /return artifactResponse\(\s*200,\s*Buffer\.from\(exportPackagePdfArtifactProjection\.body_base64, "base64"\),/,
  );
  assert.match(
    apiIndexText,
    /"content-type": exportPackagePdfArtifactProjection\.content_type/,
  );
  assert.match(
    apiIndexText,
    /"content-disposition": `attachment; filename="\$\{exportPackagePdfArtifactProjection\.filename\}"`/,
  );
});

test("successful PDF artifact delivery for a tenant-owned SWE_BODELNING case with a current canonical artifact snapshot", async () => {
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
  const persistedPdfArtifact = await refreshCaseExportPackagePdfArtifactSnapshot("case-1", {
    storageDir,
  });

  const response = await handleCaseExportPackagePdfArtifactDownloadRoute(
    {
      method: "GET",
      path: "/cases/case-1/export-package/pdf-artifact/download",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );

  assert.equal(response.status, 200);
  assert.ok(Buffer.isBuffer(response.body));
  assert.deepEqual(response.body, Buffer.from(persistedPdfArtifact.body_base64, "base64"));
  assert.deepEqual(response.headers, {
    "content-type": "application/pdf",
    "content-disposition": `attachment; filename="${persistedPdfArtifact.filename}"`,
  });
});

test("same-tenant upstream export package profile drift is rejected before returning mismatched PDF artifact bytes", async () => {
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
  const persistedPdfArtifact = await refreshCaseExportPackagePdfArtifactSnapshot(
    "case-profile-drift",
    {
      storageDir,
    },
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

  const response = await handleCaseExportPackagePdfArtifactDownloadRoute(
    {
      method: "GET",
      path: "/cases/case-profile-drift/export-package/pdf-artifact/download",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );

  assert.equal(response.status, 409);
  assert.equal(response.headers, undefined);
  assert.equal(Buffer.isBuffer(response.body), false);
  assert.notDeepEqual(response.body, Buffer.from(persistedPdfArtifact.body_base64, "base64"));
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

test("successful current-only GET /cases/:caseId/export-package/pdf-artifact/download for a current CMD_PROFILE artifact", async () => {
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
  const persistedPdfArtifact = await refreshCaseExportPackagePdfArtifactSnapshot("case-cmd", {
    storageDir,
  });

  const response = await handleCaseExportPackagePdfArtifactDownloadRoute(
    {
      method: "GET",
      path: "/cases/case-cmd/export-package/pdf-artifact/download",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );

  assert.equal(response.status, 200);
  assert.ok(Buffer.isBuffer(response.body));
  assert.deepEqual(response.body, Buffer.from(persistedPdfArtifact.body_base64, "base64"));
  assert.deepEqual(response.headers, {
    "content-type": "application/pdf",
    "content-disposition": `attachment; filename="${persistedPdfArtifact.filename}"`,
  });
});

test("tenant/case isolation rejection", async () => {
  const response = await handleCaseExportPackagePdfArtifactDownloadRoute(
    {
      method: "GET",
      path: "/cases/case-2/export-package/pdf-artifact/download",
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

test("missing PDF artifact snapshot fail-closed response", async () => {
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

  const response = await handleCaseExportPackagePdfArtifactDownloadRoute(
    {
      method: "GET",
      path: "/cases/case-3/export-package/pdf-artifact/download",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );

  assert.equal(response.status, 404);
  assert.equal(response.body.error.code, "ERR_EXPORT_PACKAGE_PDF_ARTIFACT_SNAPSHOT_NOT_FOUND");
  assert.equal(response.body.error.case_id, "case-3");
});

test("missing CMD_PROFILE PDF artifact snapshot fail-closed response", async () => {
  const storageDir = createStorageDir();
  const loadCaseContext = createCaseContextLoader({
    "case-cmd-missing": {
      tenant_id: "tenant-1",
      jurisdiction_profile_key: "CMD_PROFILE",
    },
  });

  const response = await handleCaseExportPackagePdfArtifactDownloadRoute(
    {
      method: "GET",
      path: "/cases/case-cmd-missing/export-package/pdf-artifact/download",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );

  assert.equal(response.status, 404);
  assert.deepEqual(response.body, {
    error: {
      code: "ERR_EXPORT_PACKAGE_PDF_ARTIFACT_SNAPSHOT_NOT_FOUND",
      case_id: "case-cmd-missing",
    },
  });
});

test("stale/non-current PDF artifact snapshot fail-closed response", async () => {
  const storageDir = createStorageDir();
  const loadCaseContext = createCaseContextLoader({
    "case-4": {
      tenant_id: "tenant-1",
      jurisdiction_profile_key: "SWE_BODELNING",
    },
  });

  await upsertCaseProfileInputs("case-4", createProfileInputs(), { storageDir });
  await refreshCaseReleaseEvalRun("case-4", createReleaseEvalSeed(), { storageDir });
  await refreshCaseExportPackageSnapshot("case-4", {
    storageDir,
    generated_at: "2026-03-24T12:00:00.000Z",
  });
  const persistedPdfArtifact = await refreshCaseExportPackagePdfArtifactSnapshot("case-4", {
    storageDir,
  });
  await upsertCaseProfileInputs(
    "case-4",
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
    "case-4",
    createReleaseEvalSeed({ release_eval_run_id: "release-eval-run-2" }),
    { storageDir },
  );

  const response = await handleCaseExportPackagePdfArtifactDownloadRoute(
    {
      method: "GET",
      path: "/cases/case-4/export-package/pdf-artifact/download",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );

  assert.equal(response.status, 409);
  assert.equal(response.body.error.code, "ERR_EXPORT_PACKAGE_PDF_ARTIFACT_SNAPSHOT_NOT_CURRENT");
  assert.equal(response.body.error.case_id, "case-4");
  assert.deepEqual(response.body.error.snapshot_status, {
    source: "persisted-stale",
    snapshot_export_version_found: deriveSWEBodelningExportPackageVersion(),
    current_export_version: deriveSWEBodelningExportPackageVersion(),
    snapshot_is_current: false,
  });
  assert.ok(persistedPdfArtifact.body_base64.length > 0);
});

test("stale/non-current CMD_PROFILE PDF artifact snapshot fails closed with a machine-readable response", async () => {
  const storageDir = createStorageDir();
  const loadCaseContext = createCaseContextLoader({
    "case-cmd-stale": {
      tenant_id: "tenant-1",
      jurisdiction_profile_key: "CMD_PROFILE",
    },
  });

  await upsertCaseProfileInputs("case-cmd-stale", createCMDProfileInputs(), { storageDir });
  await refreshCaseReleaseEvalRun("case-cmd-stale", createCMDReleaseEvalSeed(), {
    storageDir,
  });
  await refreshCaseExportPackageSnapshot("case-cmd-stale", {
    storageDir,
    generated_at: "2026-03-25T12:00:00.000Z",
  });
  const persistedPdfArtifact = await refreshCaseExportPackagePdfArtifactSnapshot(
    "case-cmd-stale",
    { storageDir },
  );
  await upsertCaseProfileInputs(
    "case-cmd-stale",
    createCMDProfileInputs({
      profile_input_lane_snapshot: {
        "cmd_primary_signal": {
          has_value: true,
          value: "revised",
          evidence_object_ids: ["cmd-evidence-2"],
        },
      },
    }),
    { storageDir },
  );
  await refreshCaseReleaseEvalRun(
    "case-cmd-stale",
    createCMDReleaseEvalSeed({ release_eval_run_id: "cmd-release-eval-run-2" }),
    { storageDir },
  );
  await refreshCaseExportPackageSnapshot("case-cmd-stale", {
    storageDir,
    generated_at: "2026-03-25T13:00:00.000Z",
  });

  const response = await handleCaseExportPackagePdfArtifactDownloadRoute(
    {
      method: "GET",
      path: "/cases/case-cmd-stale/export-package/pdf-artifact/download",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );

  assert.equal(response.status, 409);
  assert.equal(response.body.error.code, "ERR_EXPORT_PACKAGE_PDF_ARTIFACT_SNAPSHOT_NOT_CURRENT");
  assert.equal(response.body.error.case_id, "case-cmd-stale");
  assert.deepEqual(response.body.error.snapshot_status, {
    source: "persisted-stale",
    snapshot_export_version_found: deriveCMDExportPackageVersion(),
    current_export_version: deriveCMDExportPackageVersion(),
    snapshot_is_current: false,
  });
  assert.ok(persistedPdfArtifact.body_base64.length > 0);
});

test("unsupported/non-SWE PDF artifact delivery response remains machine-readable and non-breaking", async () => {
  const response = await handleCaseExportPackagePdfArtifactDownloadRoute(
    {
      method: "GET",
      path: "/cases/case-5/export-package/pdf-artifact/download",
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

test("delivered filename/content-type/body match the persisted canonical snapshot", async () => {
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
  const persistedPdfArtifact = await refreshCaseExportPackagePdfArtifactSnapshot("case-6", {
    storageDir,
  });

  const response = await handleCaseExportPackagePdfArtifactDownloadRoute(
    {
      method: "GET",
      path: "/cases/case-6/export-package/pdf-artifact/download",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );

  assert.equal(response.status, 200);
  assert.equal(
    response.headers["content-disposition"],
    `attachment; filename="${persistedPdfArtifact.filename}"`,
  );
  assert.equal(response.headers["content-type"], persistedPdfArtifact.content_type);
  assert.deepEqual(response.body, Buffer.from(persistedPdfArtifact.body_base64, "base64"));
});

test("no readiness behavior changes are introduced", () => {
  const workerEntries = fs.readdirSync(path.join(__dirname, "..", "workers", "analyze"));

  assert.deepEqual(workerEntries, [".gitkeep"]);
  assert.match(
    docsText,
    /GET \/cases\/:caseId\/export-package\/pdf-artifact\/download/,
  );
  assert.match(
    docsText,
    /serves the persisted canonical PDF bytes decoded from `body_base64` only when the latest export_package snapshot `jurisdiction_profile_key` and any embedded `profile_dossier_snapshot\.jurisdiction_profile_key` both match the authorized case-context `jurisdiction_profile_key` and the snapshot is current/,
  );
  assert.match(
    docsText,
    /without route-local PDF artifact recomputation or silent refresh/,
  );
});
