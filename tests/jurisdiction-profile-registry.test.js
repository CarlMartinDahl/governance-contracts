const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const {
  deriveSWEBodelningProfileInputSnapshot,
  getJurisdictionProfileRegistryEntry,
  hasJurisdictionProfileCapability,
  isSupportedJurisdictionProfileKey,
  jurisdictionProfileRegistry,
} = require("../packages/governance/src/index.js");
const {
  validateSWEBodelningProfileInputSnapshot,
} = require("../packages/schemas/src/index.js");
const {
  handleCaseExportPackageLatestRoute,
  handleCaseExportPackageJsonArtifactLatestRoute,
} = require("../apps/api/src/index.js");

const docsPath = path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md");
const docsText = fs.readFileSync(docsPath, "utf8");

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
      },
      shared_use: {
        has_value: false,
        value: null,
      },
      shared_intent: {
        has_value: true,
        value: "planned",
      },
    },
    ...overrides,
  };
}

test("the registry exposes the current SWE_BODELNING entry", () => {
  const sweEntry = getJurisdictionProfileRegistryEntry("SWE_BODELNING");
  const cmdEntry = getJurisdictionProfileRegistryEntry("CMD_PROFILE");

  assert.deepEqual(jurisdictionProfileRegistry, {
    SWE_BODELNING: sweEntry,
    "CMD_PROFILE": cmdEntry,
  });
  assert.deepEqual(sweEntry, {
    jurisdiction_profile_key: "SWE_BODELNING",
    capabilities: {
      profile_inputs: true,
      release_eval: true,
      profile_dossier: true,
      export_package: true,
      export_package_json_artifact: true,
      export_package_markdown_artifact: true,
      export_package_pdf_artifact: true,
      export_package_docx_artifact: true,
      export_package_bundle_manifest: true,
      export_package_bundle_archive_artifact: true,
    },
  });
  assert.deepEqual(cmdEntry, {
    jurisdiction_profile_key: "CMD_PROFILE",
    capabilities: {
      profile_inputs: true,
      release_eval: true,
      profile_dossier: true,
      export_package: true,
      export_package_json_artifact: true,
      export_package_markdown_artifact: true,
      export_package_pdf_artifact: true,
      export_package_docx_artifact: true,
      export_package_bundle_manifest: true,
      export_package_bundle_archive_artifact: true,
    },
  });
});

test("governance supported-profile checks use the registry path while preserving current SWE_BODELNING behavior", () => {
  const derivedSnapshot = deriveSWEBodelningProfileInputSnapshot(createProfileInput());

  assert.equal(isSupportedJurisdictionProfileKey("SWE_BODELNING"), true);
  assert.equal(isSupportedJurisdictionProfileKey("CMD_PROFILE"), true);
  assert.equal(
    hasJurisdictionProfileCapability("SWE_BODELNING", "profile_inputs"),
    true,
  );
  assert.equal(
    hasJurisdictionProfileCapability("CMD_PROFILE", "profile_inputs"),
    true,
  );
  assert.equal(
    hasJurisdictionProfileCapability("CMD_PROFILE", "release_eval"),
    true,
  );
  assert.equal(
    hasJurisdictionProfileCapability("CMD_PROFILE", "profile_dossier"),
    true,
  );
  assert.equal(
    hasJurisdictionProfileCapability("CMD_PROFILE", "export_package"),
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
  assert.deepEqual(
    validateSWEBodelningProfileInputSnapshot(derivedSnapshot),
    derivedSnapshot,
  );
  assert.throws(
    () =>
      deriveSWEBodelningProfileInputSnapshot(
        createProfileInput({ jurisdiction_profile_key: "SWE_OTHER" }),
      ),
    (error) => error.code === "ERR_UNSUPPORTED_JURISDICTION_PROFILE",
  );
});

test("API supported/unsupported checks use the same registry path while preserving current machine-readable non-SWE behavior", async () => {
  const nonSweResponse = await handleCaseExportPackageLatestRoute(
    {
      method: "GET",
      path: "/cases/case-unsupported/export-package/latest",
      auth: { tenantId: "tenant-1" },
    },
    {
      loadCaseContext: async () => ({
        tenant_id: "tenant-1",
        jurisdiction_profile_key: "SWE_OTHER",
      }),
    },
  );
  const cmdResponse = await handleCaseExportPackageJsonArtifactLatestRoute(
    {
      method: "GET",
      path: "/cases/case-cmd/export-package/json-artifact/latest",
      auth: { tenantId: "tenant-1" },
    },
    {
      loadCaseContext: async () => ({
        tenant_id: "tenant-1",
        jurisdiction_profile_key: "CMD_PROFILE",
      }),
    },
  );

  assert.equal(
    hasJurisdictionProfileCapability("SWE_OTHER", "export_package"),
    false,
  );
  assert.equal(nonSweResponse.status, 409);
  assert.deepEqual(nonSweResponse.body, {
    error: {
      code: "ERR_UNSUPPORTED_JURISDICTION_PROFILE",
      case_id: "case-unsupported",
      jurisdiction_profile_key: "SWE_OTHER",
    },
  });
  assert.equal(
    hasJurisdictionProfileCapability("CMD_PROFILE", "export_package_json_artifact"),
    true,
  );
  assert.equal(cmdResponse.status, 404);
  assert.deepEqual(cmdResponse.body, {
    error: {
      code: "ERR_EXPORT_PACKAGE_JSON_ARTIFACT_SNAPSHOT_NOT_FOUND",
      case_id: "case-cmd",
    },
  });
});

test("docs describe the same jurisdiction-profile registry scaffold", () => {
  assert.match(
    docsText,
    /packages\/governance\/src\/jurisdiction-profile-registry\.js/,
  );
  assert.match(
    docsText,
    /contains the explicit supported `SWE_BODELNING` entry plus the explicit `"CMD_PROFILE"` entry/,
  );
});

test("no readiness behavior changes are introduced", () => {
  const workerEntries = fs.readdirSync(path.join(__dirname, "..", "workers", "analyze"));
  assert.deepEqual(workerEntries, [".gitkeep"]);
});
