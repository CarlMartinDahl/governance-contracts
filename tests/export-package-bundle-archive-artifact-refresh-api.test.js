const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const {
  handleCaseExportPackageBundleArchiveArtifactRefreshRoute,
} = require("../apps/api/src/index.js");
const {
  getLatestCaseExportPackageSnapshot,
  getLatestCaseExportPackageJsonArtifactSnapshot,
  getLatestCaseExportPackageMarkdownArtifactSnapshot,
  getLatestCaseExportPackagePdfArtifactSnapshot,
  getLatestCaseExportPackageBundleArchiveArtifactSnapshot,
  persistCaseExportPackageBundleManifestSnapshot,
  persistCaseExportPackageDocxArtifactSnapshot,
  persistCaseExportPackageJsonArtifactSnapshot,
  persistCaseExportPackageMarkdownArtifactSnapshot,
  persistCaseExportPackagePdfArtifactSnapshot,
  refreshCaseExportPackageDocxArtifactSnapshot,
  refreshCaseExportPackageJsonArtifactSnapshot,
  refreshCaseExportPackageMarkdownArtifactSnapshot,
  refreshCaseExportPackagePdfArtifactSnapshot,
  refreshCaseExportPackageBundleManifestSnapshot,
  refreshCaseExportPackageSnapshot,
  refreshCaseReleaseEvalRun,
  upsertCaseProfileInputs,
} = require("../packages/database/src/index.js");
const {
  validateCMDExportPackageBundleArchiveArtifact,
  validateSWEBodelningExportPackageBundleArchiveArtifact,
} = require("../packages/schemas/src/index.js");
const {
  deriveExportPackageBundleManifest,
  deriveExportPackageDocxArtifact,
  deriveSWEBodelningExportPackageBundleManifest,
  deriveSWEBodelningExportPackageDocxArtifact,
  deriveSWEBodelningExportPackageJsonArtifact,
  deriveSWEBodelningExportPackageMarkdownArtifact,
  deriveSWEBodelningExportPackagePdfArtifact,
} = require("../packages/governance/src/index.js");

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
      "governance-contracts-export-package-bundle-archive-artifact-refresh-api-",
    ),
  );
}

function createCaseContextLoader(caseContexts) {
  return async function loadCaseContext(caseId) {
    return caseContexts[caseId] ?? null;
  };
}

function rewriteStoredBundleManifestSnapshot(storageDir, caseId, transformSnapshot) {
  const storePath = path.join(storageDir, "export-package-bundle-manifest-snapshots.json");
  const store = JSON.parse(fs.readFileSync(storePath, "utf8"));
  const caseSnapshots = store[caseId];
  const latestIndex = caseSnapshots.length - 1;
  const latestRecord = caseSnapshots[latestIndex];
  caseSnapshots[latestIndex] = {
    ...latestRecord,
    export_package_bundle_manifest_payload: transformSnapshot(
      latestRecord.export_package_bundle_manifest_payload,
    ),
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

async function persistCanonicalExportPackage(caseId, storageDir, options = {}) {
  await upsertCaseProfileInputs(caseId, createProfileInputs(options.profileInputOverrides), {
    storageDir,
  });
  await refreshCaseReleaseEvalRun(caseId, createReleaseEvalSeed(options.releaseEvalOverrides), {
    storageDir,
  });

  return refreshCaseExportPackageSnapshot(caseId, {
    storageDir,
    generated_at: options.exportGeneratedAt ?? "2026-03-24T12:00:00.000Z",
  });
}

function deriveCanonicalArtifacts(exportPackage) {
  return {
    jsonArtifact: deriveSWEBodelningExportPackageJsonArtifact(exportPackage),
    markdownArtifact: deriveSWEBodelningExportPackageMarkdownArtifact(exportPackage),
    pdfArtifact: deriveSWEBodelningExportPackagePdfArtifact(exportPackage),
    docxArtifact: deriveSWEBodelningExportPackageDocxArtifact(exportPackage),
  };
}

async function persistArtifactSnapshots(caseId, artifacts, storageDir, options = {}) {
  if (options.skipArtifactType !== "export-package-json") {
    await persistCaseExportPackageJsonArtifactSnapshot(caseId, artifacts.jsonArtifact, {
      storageDir,
    });
  }

  if (options.skipArtifactType !== "export-package-markdown") {
    await persistCaseExportPackageMarkdownArtifactSnapshot(
      caseId,
      artifacts.markdownArtifact,
      { storageDir },
    );
  }

  if (options.skipArtifactType !== "export-package-pdf") {
    await persistCaseExportPackagePdfArtifactSnapshot(caseId, artifacts.pdfArtifact, {
      storageDir,
    });
  }

  if (options.skipArtifactType !== "export-package-docx") {
    await persistCaseExportPackageDocxArtifactSnapshot(caseId, artifacts.docxArtifact, {
      storageDir,
    });
  }
}

async function persistCanonicalManifest(caseId, exportPackage, artifacts, storageDir) {
  const bundleManifest = deriveSWEBodelningExportPackageBundleManifest(
    exportPackage,
    {
      jsonArtifactSnapshot: artifacts.jsonArtifact,
      markdownArtifactSnapshot: artifacts.markdownArtifact,
      pdfArtifactSnapshot: artifacts.pdfArtifact,
      docxArtifactSnapshot: artifacts.docxArtifact,
    },
    {
      generated_at: "2026-03-24T13:00:00.000Z",
    },
  );

  await persistCaseExportPackageBundleManifestSnapshot(caseId, bundleManifest, {
    storageDir,
  });

  return bundleManifest;
}

async function persistCanonicalManifestAndRequiredArtifacts(caseId, storageDir) {
  const exportPackage = await persistCanonicalExportPackage(caseId, storageDir);
  const artifacts = deriveCanonicalArtifacts(exportPackage);

  await persistArtifactSnapshots(caseId, artifacts, storageDir);
  await refreshCaseExportPackageBundleManifestSnapshot(caseId, {
    storageDir,
    generated_at: "2026-03-24T13:00:00.000Z",
  });
}

async function persistCanonicalCMDManifestAndRequiredArtifacts(caseId, storageDir) {
  await upsertCaseProfileInputs(caseId, createCMDProfileInputs(), { storageDir });
  await refreshCaseReleaseEvalRun(caseId, createCMDReleaseEvalSeed(), { storageDir });
  await refreshCaseExportPackageSnapshot(caseId, {
    storageDir,
    generated_at: "2026-03-25T12:00:00.000Z",
  });
  await refreshCaseExportPackageJsonArtifactSnapshot(caseId, { storageDir });
  await refreshCaseExportPackageMarkdownArtifactSnapshot(caseId, { storageDir });
  await refreshCaseExportPackagePdfArtifactSnapshot(caseId, { storageDir });
  await refreshCaseExportPackageDocxArtifactSnapshot(caseId, { storageDir });
  await refreshCaseExportPackageBundleManifestSnapshot(caseId, {
    storageDir,
    generated_at: "2026-03-25T13:00:00.000Z",
  });
}

test("successful refresh for a tenant-owned SWE_BODELNING case with canonical manifest + required canonical artifact data", async () => {
  const storageDir = createStorageDir();
  const loadCaseContext = createCaseContextLoader({
    "case-1": {
      tenant_id: "tenant-1",
      jurisdiction_profile_key: "SWE_BODELNING",
    },
  });

  await persistCanonicalManifestAndRequiredArtifacts("case-1", storageDir);

  const response = await handleCaseExportPackageBundleArchiveArtifactRefreshRoute(
    {
      method: "POST",
      path: "/cases/case-1/export-package/bundle-archive-artifact/refresh",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );

  const latest = await getLatestCaseExportPackageBundleArchiveArtifactSnapshot("case-1", {
    storageDir,
  });

  assert.equal(response.status, 200);
  assert.deepEqual(response.body, latest);
  assert.deepEqual(
    validateSWEBodelningExportPackageBundleArchiveArtifact(response.body),
    response.body,
  );
});

test("docs freeze the thin authenticated final bundle/archive refresh seam as a distinct canonical runtime/refresh seam", () => {
  assert.match(
    docsText,
    /Thin Authenticated Final Bundle\/Archive Refresh Seam Freeze/i,
  );
  assert.match(
    docsText,
    /thin authenticated final bundle\/archive refresh seam is now frozen as the baseline runtime\/refresh seam/i,
  );
  assert.match(
    docsText,
    /only currently evidenced refresh surface in this freeze is `POST \/cases\/:caseId\/export-package\/bundle-archive-artifact\/refresh`/i,
  );
  assert.match(
    docsText,
    /authenticated\/case-access-controlled boundary behavior at the thin route edge/i,
  );
  assert.match(
    docsText,
    /thin POST wrapper behavior that first enforces a route-edge upstream profile-basis invariant over the latest persisted bundle\/package manifest snapshot and then delegates to the existing shared-governance final bundle\/archive artifact refresh\/create helper path/i,
  );
  assert.match(
    docsText,
    /fail-closed route-edge invariant that the latest upstream bundle\/package manifest `jurisdiction_profile_key` and embedded `canonical_source\.jurisdiction_profile_key` must equal the authorized case-context `jurisdiction_profile_key` before final bundle\/archive refresh persistence/i,
  );
  assert.match(
    docsText,
    /same-tenant supported-profile drift in already-persisted upstream bundle\/package manifest data rejects machine-readably with HTTP `409` `ERR_EXPORT_PACKAGE_UPSTREAM_JURISDICTION_PROFILE_MISMATCH` before a fresh final bundle\/archive artifact snapshot is persisted/i,
  );
  assert.match(
    docsText,
    /persisted canonical final bundle\/archive artifact snapshot response passthrough from that existing refresh helper path only after the route-edge upstream profile-basis invariant passes and without byte-delivery passthrough behavior in the route itself/i,
  );
  assert.match(
    docsText,
    /shared `snapshot_status` seam governs shared currentness semantics and remains a separate frozen shared currentness boundary that this refresh seam does not redefine/i,
  );
  assert.match(
    docsText,
    /shared API error-envelope seam and its frozen subfamilies remain the governing boundary for machine-readable refresh error envelopes/i,
  );
  assert.match(
    docsText,
    /thin latest-read seam remains a distinct read-only boundary/i,
  );
  assert.match(
    docsText,
    /thin current-only delivery seam remains a distinct byte-delivery boundary/i,
  );
  assert.match(
    docsText,
    /frozen governance final bundle\/archive derivation and projection helper scaffold remains a distinct broader runtime\/helper seam/i,
  );
  assert.match(
    docsText,
    /this refresh seam is narrower than those seams and does not itself redefine shared currentness semantics, error-envelope partitioning, latest-read behavior, delivery behavior, or final bundle\/archive derivation \/ projection behavior/i,
  );
  assert.match(
    docsText,
    /this seam is not the latest-read boundary or the byte-delivery passthrough boundary and does not itself own final bundle\/archive derivation or rebuild logic beyond delegating to the already-existing refresh helper path/i,
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
    /async function handleCaseExportPackageBundleArchiveArtifactRefreshRoute\(/,
  );
  assert.match(
    apiIndexText,
    /loadAuthorizedCaseContext\(\s+routeMatch\.caseId,\s+request\.auth,\s+options\.loadCaseContext,\s+"export_package_bundle_archive_artifact"/,
  );
  assert.match(apiIndexText, /if \(request\.method !== "POST"\)/);
  assert.match(
    apiIndexText,
    /await getLatestCaseExportPackageBundleManifestSnapshot\(\s*routeMatch\.caseId,\s*options\s*\)/,
  );
  assert.match(
    apiIndexText,
    /ERR_EXPORT_PACKAGE_UPSTREAM_JURISDICTION_PROFILE_MISMATCH/,
  );
  assert.match(
    apiIndexText,
    /await refreshCaseExportPackageBundleArchiveArtifactSnapshot\(/,
  );
  assert.match(
    apiIndexText,
    /return jsonResponse\(200, exportPackageBundleArchiveArtifactSnapshot\)/,
  );
});

test("successful refresh for a tenant-owned CMD_PROFILE case with persisted bundle/package manifest plus required persisted JSON / Markdown / PDF / DOCX artifacts produces a canonical final bundle/archive artifact", async () => {
  const storageDir = createStorageDir();
  const loadCaseContext = createCaseContextLoader({
    "case-cmd": {
      tenant_id: "tenant-1",
      jurisdiction_profile_key: "CMD_PROFILE",
    },
  });

  await persistCanonicalCMDManifestAndRequiredArtifacts("case-cmd", storageDir);

  const response = await handleCaseExportPackageBundleArchiveArtifactRefreshRoute(
    {
      method: "POST",
      path: "/cases/case-cmd/export-package/bundle-archive-artifact/refresh",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );

  const latest = await getLatestCaseExportPackageBundleArchiveArtifactSnapshot("case-cmd", {
    storageDir,
  });

  assert.equal(response.status, 200);
  assert.deepEqual(response.body, latest);
  assert.deepEqual(
    validateCMDExportPackageBundleArchiveArtifact(response.body),
    response.body,
  );
});

test("tenant/case isolation rejection", async () => {
  const response = await handleCaseExportPackageBundleArchiveArtifactRefreshRoute(
    {
      method: "POST",
      path: "/cases/case-2/export-package/bundle-archive-artifact/refresh",
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

test("no-canonical-manifest fail-closed response", async () => {
  const storageDir = createStorageDir();
  const loadCaseContext = createCaseContextLoader({
    "case-3": {
      tenant_id: "tenant-1",
      jurisdiction_profile_key: "SWE_BODELNING",
    },
  });

  const exportPackage = await persistCanonicalExportPackage("case-3", storageDir);
  const artifacts = deriveCanonicalArtifacts(exportPackage);

  await persistArtifactSnapshots("case-3", artifacts, storageDir);

  const response = await handleCaseExportPackageBundleArchiveArtifactRefreshRoute(
    {
      method: "POST",
      path: "/cases/case-3/export-package/bundle-archive-artifact/refresh",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );

  assert.equal(response.status, 404);
  assert.equal(
    response.body.error.code,
    "ERR_EXPORT_PACKAGE_BUNDLE_MANIFEST_SNAPSHOT_NOT_FOUND",
  );
  assert.equal(response.body.error.case_id, "case-3");
});

test("invalid persisted bundle/package manifest data is rejected machine-readably with HTTP 422 before final bundle/archive refresh persistence", async () => {
  const storageDir = createStorageDir();
  const loadCaseContext = createCaseContextLoader({
    "case-invalid-contract": {
      tenant_id: "tenant-1",
      jurisdiction_profile_key: "SWE_BODELNING",
    },
  });

  await persistCanonicalManifestAndRequiredArtifacts("case-invalid-contract", storageDir);

  rewriteStoredBundleManifestSnapshot(storageDir, "case-invalid-contract", (snapshot) => ({
    ...snapshot,
    artifacts: [
      {
        ...snapshot.artifacts[0],
        filename: "mismatched-export-package.json",
      },
      ...snapshot.artifacts.slice(1),
    ],
  }));

  const response = await handleCaseExportPackageBundleArchiveArtifactRefreshRoute(
    {
      method: "POST",
      path: "/cases/case-invalid-contract/export-package/bundle-archive-artifact/refresh",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );

  const latest = await getLatestCaseExportPackageBundleArchiveArtifactSnapshot(
    "case-invalid-contract",
    { storageDir },
  );

  assert.equal(response.status, 422);
  assert.deepEqual(response.body, {
    error: {
      case_id: "case-invalid-contract",
      code: "ERR_EXPORT_PACKAGE_BUNDLE_ARCHIVE_INVALID",
      artifact_type: "export-package-json",
      message: "bundle/package manifest artifact entry does not match persisted artifact snapshot",
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

  const exportPackage = await persistCanonicalExportPackage("case-4", storageDir);
  const artifacts = deriveCanonicalArtifacts(exportPackage);

  await persistCanonicalManifest("case-4", exportPackage, artifacts, storageDir);
  await persistArtifactSnapshots("case-4", artifacts, storageDir, {
    skipArtifactType: "export-package-json",
  });

  const response = await handleCaseExportPackageBundleArchiveArtifactRefreshRoute(
    {
      method: "POST",
      path: "/cases/case-4/export-package/bundle-archive-artifact/refresh",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );

  assert.equal(response.status, 404);
  assert.equal(response.body.error.code, "ERR_EXPORT_PACKAGE_JSON_ARTIFACT_SNAPSHOT_NOT_FOUND");
  assert.equal(response.body.error.case_id, "case-4");
});

test("no-persisted-bundle-manifest for CMD_PROFILE fails closed with a machine-readable response", async () => {
  const storageDir = createStorageDir();
  const loadCaseContext = createCaseContextLoader({
    "case-cmd-missing": {
      tenant_id: "tenant-1",
      jurisdiction_profile_key: "CMD_PROFILE",
    },
  });

  await upsertCaseProfileInputs("case-cmd-missing", createCMDProfileInputs(), { storageDir });
  await refreshCaseReleaseEvalRun("case-cmd-missing", createCMDReleaseEvalSeed(), {
    storageDir,
  });
  await refreshCaseExportPackageSnapshot("case-cmd-missing", {
    storageDir,
    generated_at: "2026-03-25T12:00:00.000Z",
  });
  await refreshCaseExportPackageJsonArtifactSnapshot("case-cmd-missing", { storageDir });
  await refreshCaseExportPackageMarkdownArtifactSnapshot("case-cmd-missing", {
    storageDir,
  });
  await refreshCaseExportPackagePdfArtifactSnapshot("case-cmd-missing", { storageDir });
  await refreshCaseExportPackageDocxArtifactSnapshot("case-cmd-missing", { storageDir });

  const response = await handleCaseExportPackageBundleArchiveArtifactRefreshRoute(
    {
      method: "POST",
      path: "/cases/case-cmd-missing/export-package/bundle-archive-artifact/refresh",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );

  assert.equal(response.status, 404);
  assert.equal(
    response.body.error.code,
    "ERR_EXPORT_PACKAGE_BUNDLE_MANIFEST_SNAPSHOT_NOT_FOUND",
  );
  assert.equal(response.body.error.case_id, "case-cmd-missing");
});

test("same-tenant upstream bundle/package manifest profile drift is rejected before final bundle/archive refresh persistence", async () => {
  const storageDir = createStorageDir();
  const loadCaseContext = createCaseContextLoader({
    "case-profile-drift": {
      tenant_id: "tenant-1",
      jurisdiction_profile_key: "SWE_BODELNING",
    },
  });

  await persistCanonicalCMDManifestAndRequiredArtifacts("case-profile-drift", storageDir);

  const response = await handleCaseExportPackageBundleArchiveArtifactRefreshRoute(
    {
      method: "POST",
      path: "/cases/case-profile-drift/export-package/bundle-archive-artifact/refresh",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );

  const latest = await getLatestCaseExportPackageBundleArchiveArtifactSnapshot(
    "case-profile-drift",
    { storageDir },
  );

  assert.equal(response.status, 409);
  assert.deepEqual(response.body, {
    error: {
      case_id: "case-profile-drift",
      code: "ERR_EXPORT_PACKAGE_UPSTREAM_JURISDICTION_PROFILE_MISMATCH",
      bundle_manifest_jurisdiction_profile_key: "CMD_PROFILE",
      expected_jurisdiction_profile_key: "SWE_BODELNING",
      canonical_source_jurisdiction_profile_key: "CMD_PROFILE",
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

  await upsertCaseProfileInputs("case-cmd-artifact-missing", createCMDProfileInputs(), {
    storageDir,
  });
  await refreshCaseReleaseEvalRun(
    "case-cmd-artifact-missing",
    createCMDReleaseEvalSeed(),
    { storageDir },
  );
  await refreshCaseExportPackageSnapshot("case-cmd-artifact-missing", {
    storageDir,
    generated_at: "2026-03-25T12:00:00.000Z",
  });
  await refreshCaseExportPackageJsonArtifactSnapshot("case-cmd-artifact-missing", {
    storageDir,
  });
  await refreshCaseExportPackageMarkdownArtifactSnapshot("case-cmd-artifact-missing", {
    storageDir,
  });
  await refreshCaseExportPackagePdfArtifactSnapshot("case-cmd-artifact-missing", {
    storageDir,
  });

  const exportPackageSnapshot = await getLatestCaseExportPackageSnapshot(
    "case-cmd-artifact-missing",
    { storageDir },
  );
  const jsonArtifactSnapshot = await getLatestCaseExportPackageJsonArtifactSnapshot(
    "case-cmd-artifact-missing",
    { storageDir },
  );
  const markdownArtifactSnapshot =
    await getLatestCaseExportPackageMarkdownArtifactSnapshot(
      "case-cmd-artifact-missing",
      { storageDir },
    );
  const pdfArtifactSnapshot = await getLatestCaseExportPackagePdfArtifactSnapshot(
    "case-cmd-artifact-missing",
    { storageDir },
  );

  const bundleManifest = deriveExportPackageBundleManifest(
    exportPackageSnapshot,
    {
      jsonArtifactSnapshot,
      markdownArtifactSnapshot,
      pdfArtifactSnapshot,
      docxArtifactSnapshot: deriveExportPackageDocxArtifact(exportPackageSnapshot),
    },
    {
      generated_at: "2026-03-25T13:00:00.000Z",
    },
  );

  await persistCaseExportPackageBundleManifestSnapshot(
    "case-cmd-artifact-missing",
    bundleManifest,
    { storageDir },
  );

  const response = await handleCaseExportPackageBundleArchiveArtifactRefreshRoute(
    {
      method: "POST",
      path: "/cases/case-cmd-artifact-missing/export-package/bundle-archive-artifact/refresh",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );

  assert.equal(response.status, 404);
  assert.equal(
    response.body.error.code,
    "ERR_EXPORT_PACKAGE_DOCX_ARTIFACT_SNAPSHOT_NOT_FOUND",
  );
  assert.equal(response.body.error.case_id, "case-cmd-artifact-missing");
});

test("unsupported/non-SWE final archive response remains machine-readable and non-breaking", async () => {
  const response = await handleCaseExportPackageBundleArchiveArtifactRefreshRoute(
    {
      method: "POST",
      path: "/cases/case-5/export-package/bundle-archive-artifact/refresh",
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

test("refresh response matches the persisted canonical final bundle/archive artifact snapshot rather than diverging", async () => {
  const storageDir = createStorageDir();
  const loadCaseContext = createCaseContextLoader({
    "case-6": {
      tenant_id: "tenant-1",
      jurisdiction_profile_key: "SWE_BODELNING",
    },
  });

  await persistCanonicalManifestAndRequiredArtifacts("case-6", storageDir);

  const response = await handleCaseExportPackageBundleArchiveArtifactRefreshRoute(
    {
      method: "POST",
      path: "/cases/case-6/export-package/bundle-archive-artifact/refresh",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );

  const latest = await getLatestCaseExportPackageBundleArchiveArtifactSnapshot("case-6", {
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
    /POST \/cases\/:caseId\/export-package\/bundle-archive-artifact\/refresh/,
  );
  assert.match(
    docsText,
    /ERR_EXPORT_PACKAGE_UPSTREAM_JURISDICTION_PROFILE_MISMATCH/,
  );
  assert.match(
    docsText,
    /returns the persisted canonical final bundle\/archive artifact snapshot unchanged/,
  );
  assert.match(
    docsText,
    /without route-local final archive derivation, delivery behavior, or additional package assembly beyond the already-existing canonical archive helper/,
  );
});
