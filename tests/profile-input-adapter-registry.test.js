const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const {
  getCaseProfileInputs,
  upsertCaseProfileInputs,
} = require("../packages/database/src/index.js");
const {
  deriveProfileInputLaneSnapshot,
  deriveProfileInputSnapshot,
  deriveProfileInputSummary,
  deriveSWEBodelningProfileInputLaneSnapshot,
  deriveSWEBodelningProfileInputSnapshot,
  deriveSWEBodelningProfileInputSummary,
  hasJurisdictionProfileCapability,
  isSupportedJurisdictionProfileKey,
  getProfileInputAdapter,
  profileInputAdapterRegistry,
  validateProfileInputSnapshot,
} = require("../packages/governance/src/index.js");
const {
  validateCMDProfileInputSnapshot,
  validateSWEBodelningProfileInputSnapshot,
} = require("../packages/schemas/src/index.js");
const {
  handleCaseExportPackageBundleArchiveArtifactLatestRoute,
  handleCaseExportPackageBundleManifestLatestRoute,
  handleCaseExportPackageDocxArtifactLatestRoute,
  handleCaseExportPackageJsonArtifactLatestRoute,
  handleCaseExportPackageMarkdownArtifactLatestRoute,
  handleCaseExportPackagePdfArtifactLatestRoute,
  handleCaseProfileInputsRoute,
} = require("../apps/api/src/index.js");

const docsPath = path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md");
const docsText = fs.readFileSync(docsPath, "utf8");

function createStorageDir() {
  return fs.mkdtempSync(
    path.join(os.tmpdir(), "governance-contracts-profile-input-adapter-"),
  );
}

function createProfileInput(overrides = {}) {
  return {
    jurisdiction_profile_key: "SWE_BODELNING",
    profile_input_summary: {
      required_lane_count: 3,
      lanes_with_value_count: 0,
      missing_value_lane_keys: [
        "economic_contribution",
        "shared_use",
        "shared_intent",
      ],
    },
    profile_input_lane_snapshot: {
      economic_contribution: {
        has_value: true,
        value: "documented",
        evidence_object_ids: ["evidence-1"],
      },
      shared_use: {
        has_value: false,
        value: null,
        evidence_object_ids: [],
      },
      shared_intent: {
        has_value: true,
        value: "planned",
        evidence_object_ids: ["evidence-2"],
      },
    },
    ...overrides,
  };
}

function createCMDProfileInput(overrides = {}) {
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
        evidence_object_ids: ["evidence-cmd-1"],
      },
    },
    ...overrides,
  };
}

test("the adapter/dispatch registry exposes the explicit CMD_PROFILE profile-input adapter entry", () => {
  const sweAdapter = getProfileInputAdapter("SWE_BODELNING");
  const cmdAdapter = getProfileInputAdapter("CMD_PROFILE");

  assert.equal(profileInputAdapterRegistry.SWE_BODELNING, sweAdapter);
  assert.equal(profileInputAdapterRegistry["CMD_PROFILE"], cmdAdapter);
  assert.deepEqual(Object.keys(profileInputAdapterRegistry), ["SWE_BODELNING", "CMD_PROFILE"]);
  assert.equal(sweAdapter.jurisdiction_profile_key, "SWE_BODELNING");
  assert.equal(cmdAdapter.jurisdiction_profile_key, "CMD_PROFILE");
  assert.equal(typeof cmdAdapter.validateProfileInputSnapshot, "function");
  assert.equal(typeof cmdAdapter.deriveProfileInputLaneSnapshot, "function");
  assert.equal(typeof cmdAdapter.deriveProfileInputSummary, "function");
  assert.equal(typeof cmdAdapter.deriveProfileInputSnapshot, "function");
});

test("profile-input validation/canonicalization uses the registry path while preserving current SWE_BODELNING behavior", () => {
  const profileInput = createProfileInput();
  const cmdProfileInput = createCMDProfileInput();

  assert.deepEqual(
    validateProfileInputSnapshot(profileInput),
    validateSWEBodelningProfileInputSnapshot(profileInput),
  );
  assert.deepEqual(
    deriveProfileInputLaneSnapshot(profileInput),
    deriveSWEBodelningProfileInputLaneSnapshot(profileInput),
  );
  assert.deepEqual(
    deriveProfileInputSummary(profileInput),
    deriveSWEBodelningProfileInputSummary(profileInput),
  );
  assert.deepEqual(
    deriveProfileInputSnapshot(profileInput),
    deriveSWEBodelningProfileInputSnapshot(profileInput),
  );
  assert.deepEqual(
    validateProfileInputSnapshot(cmdProfileInput),
    validateCMDProfileInputSnapshot(cmdProfileInput),
  );
  assert.deepEqual(deriveProfileInputLaneSnapshot(cmdProfileInput), {
    "cmd_primary_signal": {
      has_value: true,
      value: "documented",
      evidence_object_ids: ["evidence-cmd-1"],
    },
  });
  assert.deepEqual(deriveProfileInputSummary(cmdProfileInput), {
    required_lane_count: 1,
    lanes_with_value_count: 1,
    missing_value_lane_keys: [],
  });
  assert.deepEqual(deriveProfileInputSnapshot(cmdProfileInput), cmdProfileInput);
});

test("successful tenant-owned GET/PATCH profile-input roundtrip for a CMD_PROFILE case uses the shared adapter path", async () => {
  const storageDir = createStorageDir();
  const loadCaseContext = async (caseId) =>
    ({
      "case-1": {
        tenant_id: "tenant-1",
        jurisdiction_profile_key: "SWE_BODELNING",
      },
      "case-unsupported": {
        tenant_id: "tenant-1",
        jurisdiction_profile_key: "SWE_OTHER",
      },
      "case-cmd": {
        tenant_id: "tenant-1",
        jurisdiction_profile_key: "CMD_PROFILE",
      },
      "case-cmd-empty": {
        tenant_id: "tenant-1",
        jurisdiction_profile_key: "CMD_PROFILE",
      },
      "case-cmd-foreign": {
        tenant_id: "tenant-2",
        jurisdiction_profile_key: "CMD_PROFILE",
      },
    })[caseId] ?? null;
  const profileInput = createProfileInput();
  const cmdProfileInput = createCMDProfileInput();

  const persisted = await upsertCaseProfileInputs("case-1", profileInput, { storageDir });
  const roundtrip = await getCaseProfileInputs("case-1", { storageDir });

  assert.deepEqual(persisted, deriveProfileInputSnapshot(profileInput));
  assert.deepEqual(roundtrip, deriveProfileInputSnapshot(profileInput));

  const cmdPatchResponse = await handleCaseProfileInputsRoute(
    {
      method: "PATCH",
      path: "/cases/case-cmd/profile-inputs",
      auth: { tenantId: "tenant-1" },
      body: cmdProfileInput,
    },
    { loadCaseContext, storageDir },
  );
  const cmdGetResponse = await handleCaseProfileInputsRoute(
    {
      method: "GET",
      path: "/cases/case-cmd/profile-inputs",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );
  const cmdEmptyCaseResponse = await handleCaseProfileInputsRoute(
    {
      method: "GET",
      path: "/cases/case-cmd-empty/profile-inputs",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );
  const cmdForeignTenantResponse = await handleCaseProfileInputsRoute(
    {
      method: "GET",
      path: "/cases/case-cmd-foreign/profile-inputs",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );
  const unsupportedResponse = await handleCaseProfileInputsRoute(
    {
      method: "GET",
      path: "/cases/case-unsupported/profile-inputs",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );

  assert.equal(cmdPatchResponse.status, 200);
  assert.deepEqual(cmdPatchResponse.body, deriveProfileInputSnapshot(cmdProfileInput));
  assert.equal(cmdGetResponse.status, 200);
  assert.deepEqual(cmdGetResponse.body, deriveProfileInputSnapshot(cmdProfileInput));
  assert.equal(cmdEmptyCaseResponse.status, 404);
  assert.deepEqual(cmdEmptyCaseResponse.body, {
    error: {
      code: "ERR_PROFILE_INPUTS_NOT_FOUND",
      case_id: "case-cmd-empty",
    },
  });
  assert.equal(cmdForeignTenantResponse.status, 403);
  assert.deepEqual(cmdForeignTenantResponse.body, {
    error: {
      code: "ERR_CASE_ACCESS_DENIED",
      case_id: "case-cmd-foreign",
    },
  });
  assert.equal(isSupportedJurisdictionProfileKey("CMD_PROFILE"), true);
  assert.equal(hasJurisdictionProfileCapability("CMD_PROFILE", "profile_inputs"), true);
  assert.equal(unsupportedResponse.status, 409);
  assert.deepEqual(unsupportedResponse.body, {
    error: {
      code: "ERR_UNSUPPORTED_JURISDICTION_PROFILE",
      case_id: "case-unsupported",
      jurisdiction_profile_key: "SWE_OTHER",
    },
  });
});

test("invalid CMD_PROFILE profile-input shape is rejected before persistence", async () => {
  const storageDir = createStorageDir();
  const loadCaseContext = async () => ({
    tenant_id: "tenant-1",
    jurisdiction_profile_key: "CMD_PROFILE",
  });
  const invalidCmdProfileInput = createCMDProfileInput();

  delete invalidCmdProfileInput.profile_input_summary;

  const patchResponse = await handleCaseProfileInputsRoute(
    {
      method: "PATCH",
      path: "/cases/case-cmd/profile-inputs",
      auth: { tenantId: "tenant-1" },
      body: invalidCmdProfileInput,
    },
    { loadCaseContext, storageDir },
  );

  assert.equal(patchResponse.status, 422);
  assert.deepEqual(patchResponse.body, {
    error: {
      code: "ERR_PROFILE_INPUT_INVALID",
      field: "input",
      expectedKeys: [
        "jurisdiction_profile_key",
        "profile_input_lane_snapshot",
        "profile_input_summary",
      ],
      actualKeys: [
        "jurisdiction_profile_key",
        "profile_input_lane_snapshot",
      ],
      message: "input has an invalid key set",
    },
  });
  assert.equal(await getCaseProfileInputs("case-cmd", { storageDir }), null);
});

test("enabled CMD_PROFILE bundle/package manifest uses the shared seam while final bundle/archive remains machine-readable unsupported", async () => {
  const loadCaseContext = async () => ({
    tenant_id: "tenant-1",
    jurisdiction_profile_key: "CMD_PROFILE",
  });

  const jsonResponse = await handleCaseExportPackageJsonArtifactLatestRoute(
    {
      method: "GET",
      path: "/cases/case-cmd/export-package/json-artifact/latest",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext },
  );
  const markdownResponse = await handleCaseExportPackageMarkdownArtifactLatestRoute(
    {
      method: "GET",
      path: "/cases/case-cmd/export-package/markdown-artifact/latest",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext },
  );
  const pdfResponse = await handleCaseExportPackagePdfArtifactLatestRoute(
    {
      method: "GET",
      path: "/cases/case-cmd/export-package/pdf-artifact/latest",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext },
  );
  const docxResponse = await handleCaseExportPackageDocxArtifactLatestRoute(
    {
      method: "GET",
      path: "/cases/case-cmd/export-package/docx-artifact/latest",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext },
  );
  const bundleManifestResponse = await handleCaseExportPackageBundleManifestLatestRoute(
    {
      method: "GET",
      path: "/cases/case-cmd/export-package/bundle-manifest/latest",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext },
  );
  const bundleArchiveResponse =
    await handleCaseExportPackageBundleArchiveArtifactLatestRoute(
      {
        method: "GET",
        path: "/cases/case-cmd/export-package/bundle-archive-artifact/latest",
        auth: { tenantId: "tenant-1" },
      },
      { loadCaseContext },
    );

  assert.equal(bundleManifestResponse.status, 404);
  assert.deepEqual(bundleManifestResponse.body, {
    error: {
      code: "ERR_EXPORT_PACKAGE_BUNDLE_MANIFEST_SNAPSHOT_NOT_FOUND",
      case_id: "case-cmd",
    },
  });
  assert.equal(bundleArchiveResponse.status, 404);
  assert.deepEqual(bundleArchiveResponse.body, {
    error: {
      code: "ERR_EXPORT_PACKAGE_BUNDLE_ARCHIVE_ARTIFACT_SNAPSHOT_NOT_FOUND",
      case_id: "case-cmd",
    },
  });

  assert.equal(jsonResponse.status, 404);
  assert.deepEqual(jsonResponse.body, {
    error: {
      code: "ERR_EXPORT_PACKAGE_JSON_ARTIFACT_SNAPSHOT_NOT_FOUND",
      case_id: "case-cmd",
    },
  });
  assert.equal(markdownResponse.status, 404);
  assert.deepEqual(markdownResponse.body, {
    error: {
      code: "ERR_EXPORT_PACKAGE_MARKDOWN_ARTIFACT_SNAPSHOT_NOT_FOUND",
      case_id: "case-cmd",
    },
  });
  assert.equal(pdfResponse.status, 404);
  assert.deepEqual(pdfResponse.body, {
    error: {
      code: "ERR_EXPORT_PACKAGE_PDF_ARTIFACT_SNAPSHOT_NOT_FOUND",
      case_id: "case-cmd",
    },
  });
  assert.equal(docxResponse.status, 404);
  assert.deepEqual(docxResponse.body, {
    error: {
      code: "ERR_EXPORT_PACKAGE_DOCX_ARTIFACT_SNAPSHOT_NOT_FOUND",
      case_id: "case-cmd",
    },
  });
  assert.equal(hasJurisdictionProfileCapability("CMD_PROFILE", "release_eval"), true);
  assert.equal(hasJurisdictionProfileCapability("CMD_PROFILE", "profile_dossier"), true);
  assert.equal(hasJurisdictionProfileCapability("CMD_PROFILE", "export_package"), true);
  assert.equal(
    hasJurisdictionProfileCapability("CMD_PROFILE", "export_package_json_artifact"),
    true,
  );
  assert.equal(
    hasJurisdictionProfileCapability("CMD_PROFILE", "export_package_markdown_artifact"),
    true,
  );
  assert.equal(
    hasJurisdictionProfileCapability("CMD_PROFILE", "export_package_pdf_artifact"),
    true,
  );
  assert.equal(
    hasJurisdictionProfileCapability("CMD_PROFILE", "export_package_docx_artifact"),
    true,
  );
  assert.equal(
    hasJurisdictionProfileCapability("CMD_PROFILE", "export_package_bundle_manifest"),
    true,
  );
  assert.equal(
    hasJurisdictionProfileCapability(
      "CMD_PROFILE",
      "export_package_bundle_archive_artifact",
    ),
    true,
  );
});

test("no current SWE_BODELNING schema/output changes are introduced", async () => {
  const storageDir = createStorageDir();
  const loadCaseContext = async () => ({
    tenant_id: "tenant-1",
    jurisdiction_profile_key: "SWE_BODELNING",
  });
  const profileInput = createProfileInput();
  const patchResponse = await handleCaseProfileInputsRoute(
    {
      method: "PATCH",
      path: "/cases/case-2/profile-inputs",
      auth: { tenantId: "tenant-1" },
      body: profileInput,
    },
    { loadCaseContext, storageDir },
  );

  assert.equal(patchResponse.status, 200);
  assert.deepEqual(
    validateSWEBodelningProfileInputSnapshot(patchResponse.body),
    patchResponse.body,
  );
  assert.match(docsText, /profile-input adapter\/dispatch scaffold/);
  assert.match(
    docsText,
    /contains the explicit supported `SWE_BODELNING` adapter entry plus the explicit `"CMD_PROFILE"` adapter entry/,
  );
  assert.match(
    docsText,
    /Runtime support is enabled for `profile_inputs` in this slice/,
  );
});

test("no readiness behavior changes are introduced", () => {
  const workerEntries = fs.readdirSync(path.join(__dirname, "..", "workers", "analyze"));
  assert.deepEqual(workerEntries, [".gitkeep"]);
});
