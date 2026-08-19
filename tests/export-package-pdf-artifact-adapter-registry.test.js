const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const {
  handleCaseExportPackagePdfArtifactDownloadRoute,
  handleCaseExportPackagePdfArtifactLatestRoute,
  handleCaseExportPackagePdfArtifactRefreshRoute,
} = require("../apps/api/src/index.js");
const {
  getLatestCaseExportPackagePdfArtifactProjection,
  getLatestCaseExportPackagePdfArtifactSnapshot,
  refreshCaseExportPackagePdfArtifactSnapshot,
  refreshCaseExportPackageSnapshot,
  refreshCaseReleaseEvalRun,
  upsertCaseProfileInputs,
} = require("../packages/database/src/index.js");
const {
  deriveExportPackageFromPdfArtifact,
  deriveExportPackagePdfArtifact,
  deriveCMDExportPackageVersion,
  deriveSWEBodelningExportPackagePdfArtifact,
  exportPackagePdfArtifactAdapterRegistry,
  getExportPackagePdfArtifactAdapter,
  hasJurisdictionProfileCapability,
  resolveExportPackagePdfArtifactProjection,
  resolveSWEBodelningExportPackagePdfArtifactProjection,
} = require("../packages/governance/src/index.js");
const {
  validateCMDExportPackagePdfArtifact,
  validateCMDExportPackagePdfArtifactProjection,
  validateSWEBodelningExportPackagePdfArtifactProjection,
} = require("../packages/schemas/src/index.js");

const docsPath = path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md");
const docsText = fs.readFileSync(docsPath, "utf8");

function createStorageDir() {
  return fs.mkdtempSync(
    path.join(os.tmpdir(), "governance-contracts-export-pdf-artifact-adapter-"),
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

function toCanonicalJson(value) {
  if (Array.isArray(value)) {
    return `[${value.map((item) => toCanonicalJson(item)).join(",")}]`;
  }

  if (value && typeof value === "object") {
    const entries = Object.keys(value)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${toCanonicalJson(value[key])}`);
    return `{${entries.join(",")}}`;
  }

  return JSON.stringify(value);
}

function chunkPdfText(value, size = 88) {
  if (typeof value !== "string" || value.length === 0) {
    return [""];
  }

  const chunks = [];

  for (let index = 0; index < value.length; index += size) {
    chunks.push(value.slice(index, index + size));
  }

  return chunks;
}

function escapePdfText(value) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)")
    .replace(/\r/g, "\\r")
    .replace(/\n/g, "\\n");
}

function buildMinimalPdfDocument(lines) {
  const contentLines = ["BT", "/F1 10 Tf", "50 780 Td", "12 TL"];

  lines.forEach((line, index) => {
    contentLines.push(`(${escapePdfText(line)}) Tj`);

    if (index < lines.length - 1) {
      contentLines.push("T*");
    }
  });

  contentLines.push("ET");

  const contentStream = `${contentLines.join("\n")}\n`;
  const objects = [
    "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n",
    "2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n",
    "3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>\nendobj\n",
    "4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n",
    `5 0 obj\n<< /Length ${contentStream.length} >>\nstream\n${contentStream}endstream\nendobj\n`,
  ];

  let pdf = "%PDF-1.4\n";
  const offsets = [0];

  for (const objectText of objects) {
    offsets.push(pdf.length);
    pdf += objectText;
  }

  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;

  for (const offset of offsets.slice(1)) {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  }

  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

  return pdf;
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

function createCMDExportPackage() {
  return {
    jurisdiction_profile_key: "CMD_PROFILE",
    export_version: "cmd-export-package-v1",
    dossier_fingerprint: "cmd-dossier-fingerprint-1",
    canonical_source: {
      release_eval_run_id: "cmd-release-eval-run-1",
      evaluator_version: "cmd-release-eval-v1",
      jurisdiction_profile_key: "CMD_PROFILE",
      persisted_at: "2026-03-25T12:00:00.000Z",
    },
    profile_dossier_snapshot: {
      jurisdiction_profile_key: "CMD_PROFILE",
      release_gate: "blocked",
      release_gate_reason_code: "cmd-runtime-not-implemented",
      release_eval_freshness: "current",
      release_eval_freshness_reason_code: "evaluator-version-current",
      evaluator_version: "cmd-release-eval-v1",
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
    },
    generated_at: "2026-03-25T12:30:00.000Z",
    manifest: {
      included_top_level_artifacts: ["canonical_source", "profile_dossier_snapshot"],
    },
  };
}

function createCMDPdfArtifact() {
  const exportPackage = createCMDExportPackage();
  const canonicalExportPackageJson = toCanonicalJson(exportPackage);
  const pdfPayload = buildMinimalPdfDocument([
    "CMD_PROFILE Export Package",
    `jurisdiction_profile_key: ${exportPackage.jurisdiction_profile_key}`,
    `export_version: ${exportPackage.export_version}`,
    `dossier_fingerprint: ${exportPackage.dossier_fingerprint}`,
    `generated_at: ${exportPackage.generated_at}`,
    "canonical_export_package_json:",
    ...chunkPdfText(canonicalExportPackageJson),
  ]);

  return {
    artifact_type: "export-package-pdf",
    filename: `${exportPackage.export_version}-${exportPackage.dossier_fingerprint}.pdf`,
    content_type: "application/pdf",
    encoding: "base64",
    body_base64: Buffer.from(pdfPayload, "utf8").toString("base64"),
  };
}

test("the generic PDF artifact adapter registry exposes the explicit CMD_PROFILE entry", () => {
  const sweAdapter = getExportPackagePdfArtifactAdapter("SWE_BODELNING");
  const cmdAdapter = getExportPackagePdfArtifactAdapter("CMD_PROFILE");

  assert.equal(exportPackagePdfArtifactAdapterRegistry.SWE_BODELNING, sweAdapter);
  assert.equal(exportPackagePdfArtifactAdapterRegistry["CMD_PROFILE"], cmdAdapter);
  assert.deepEqual(Object.keys(exportPackagePdfArtifactAdapterRegistry), [
    "SWE_BODELNING",
    "CMD_PROFILE",
  ]);
  assert.equal(sweAdapter.jurisdiction_profile_key, "SWE_BODELNING");
  assert.equal(cmdAdapter.jurisdiction_profile_key, "CMD_PROFILE");
  assert.equal(typeof cmdAdapter.deriveExportPackagePdfArtifact, "function");
  assert.equal(typeof cmdAdapter.deriveExportPackageFromPdfArtifact, "function");
  assert.equal(typeof cmdAdapter.resolveExportPackagePdfArtifactProjection, "function");
});

test("PDF artifact refresh/create uses the registry path while preserving current SWE_BODELNING behavior", async () => {
  const storageDir = createStorageDir();

  await upsertCaseProfileInputs("case-1", createProfileInputs(), { storageDir });
  await refreshCaseReleaseEvalRun("case-1", createReleaseEvalSeed(), { storageDir });
  const exportPackage = await refreshCaseExportPackageSnapshot("case-1", {
    storageDir,
    generated_at: "2026-03-24T12:00:00.000Z",
  });

  const refreshed = await refreshCaseExportPackagePdfArtifactSnapshot("case-1", {
    storageDir,
  });
  const expectedViaRegistry = deriveExportPackagePdfArtifact(exportPackage);
  const expectedDirect = deriveSWEBodelningExportPackagePdfArtifact(exportPackage);

  assert.deepEqual(refreshed, expectedViaRegistry);
  assert.deepEqual(expectedViaRegistry, expectedDirect);
});

test("PDF artifact read/projection/currentness uses the same adapter path where applicable while preserving current behavior", async () => {
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
  const pdfArtifact = await refreshCaseExportPackagePdfArtifactSnapshot("case-2", {
    storageDir,
  });
  const projected = await getLatestCaseExportPackagePdfArtifactProjection("case-2", {
    storageDir,
  });
  const expectedViaRegistry = resolveExportPackagePdfArtifactProjection(
    pdfArtifact,
    exportPackage,
    releaseEvalRun.profile_dossier_snapshot,
  );
  const expectedDirect = resolveSWEBodelningExportPackagePdfArtifactProjection(
    pdfArtifact,
    exportPackage,
    releaseEvalRun.profile_dossier_snapshot,
  );

  assert.deepEqual(projected, expectedViaRegistry);
  assert.deepEqual(expectedViaRegistry, expectedDirect);
});

test("the CMD_PROFILE entry derives and resolves canonical PDF artifacts through the shared runtime seam", async () => {
  const storageDir = createStorageDir();
  const adapter = getExportPackagePdfArtifactAdapter("CMD_PROFILE");

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
  const pdfArtifactSnapshot = adapter.deriveExportPackagePdfArtifact(exportPackageSnapshot);
  const projected = adapter.resolveExportPackagePdfArtifactProjection(
    pdfArtifactSnapshot,
    exportPackageSnapshot,
    releaseEvalRun.profile_dossier_snapshot,
  );

  assert.equal(
    hasJurisdictionProfileCapability("CMD_PROFILE", "export_package_pdf_artifact"),
    true,
  );
  assert.deepEqual(
    pdfArtifactSnapshot,
    deriveExportPackagePdfArtifact(exportPackageSnapshot),
  );
  assert.deepEqual(validateCMDExportPackagePdfArtifact(pdfArtifactSnapshot), pdfArtifactSnapshot);
  assert.deepEqual(
    adapter.deriveExportPackageFromPdfArtifact(pdfArtifactSnapshot),
    exportPackageSnapshot,
  );
  assert.deepEqual(
    deriveExportPackageFromPdfArtifact(pdfArtifactSnapshot),
    exportPackageSnapshot,
  );
  assert.deepEqual(
    projected,
    resolveExportPackagePdfArtifactProjection(
      pdfArtifactSnapshot,
      exportPackageSnapshot,
      releaseEvalRun.profile_dossier_snapshot,
    ),
  );
  assert.deepEqual(
    validateCMDExportPackagePdfArtifactProjection(projected),
    projected,
  );
  assert.equal(projected.snapshot_status.source, "persisted-current");
  assert.equal(
    projected.snapshot_status.current_export_version,
    deriveCMDExportPackageVersion(),
  );
  assert.equal(projected.snapshot_status.snapshot_is_current, true);
});

test("API PDF artifact read/refresh/delivery routes stay thin and preserve current machine-readable non-SWE behavior", async () => {
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

  const refreshResponse = await handleCaseExportPackagePdfArtifactRefreshRoute(
    {
      method: "POST",
      path: "/cases/case-3/export-package/pdf-artifact/refresh",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );
  const latestSnapshot = await getLatestCaseExportPackagePdfArtifactSnapshot("case-3", {
    storageDir,
  });

  assert.equal(refreshResponse.status, 200);
  assert.deepEqual(refreshResponse.body, latestSnapshot);

  const latestResponse = await handleCaseExportPackagePdfArtifactLatestRoute(
    {
      method: "GET",
      path: "/cases/case-3/export-package/pdf-artifact/latest",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );
  const latestProjection = await getLatestCaseExportPackagePdfArtifactProjection(
    "case-3",
    { storageDir },
  );

  assert.equal(latestResponse.status, 200);
  assert.deepEqual(latestResponse.body, latestProjection);

  const downloadResponse = await handleCaseExportPackagePdfArtifactDownloadRoute(
    {
      method: "GET",
      path: "/cases/case-3/export-package/pdf-artifact/download",
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

  const unsupportedLatestResponse = await handleCaseExportPackagePdfArtifactLatestRoute(
    {
      method: "GET",
      path: "/cases/case-unsupported/export-package/pdf-artifact/latest",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );
  const unsupportedRefreshResponse = await handleCaseExportPackagePdfArtifactRefreshRoute(
    {
      method: "POST",
      path: "/cases/case-unsupported/export-package/pdf-artifact/refresh",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );
  const unsupportedDownloadResponse = await handleCaseExportPackagePdfArtifactDownloadRoute(
    {
      method: "GET",
      path: "/cases/case-unsupported/export-package/pdf-artifact/download",
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

test("no current SWE_BODELNING PDF artifact schema/output changes are introduced", async () => {
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
  await refreshCaseExportPackagePdfArtifactSnapshot("case-4", { storageDir });
  const latestProjection = await getLatestCaseExportPackagePdfArtifactProjection("case-4", {
    storageDir,
  });

  assert.deepEqual(
    validateSWEBodelningExportPackagePdfArtifactProjection(latestProjection),
    latestProjection,
  );
  assert.match(docsText, /PDF export artifact adapter\/dispatch scaffold/);
  assert.match(
    docsText,
    /contains the explicit supported `SWE_BODELNING` adapter entry plus the explicit `"CMD_PROFILE"` adapter entry/,
  );
});

test("no readiness behavior changes are introduced", () => {
  const workerEntries = fs.readdirSync(path.join(__dirname, "..", "workers", "analyze"));
  assert.deepEqual(workerEntries, [".gitkeep"]);
});
