const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const schema = require("../schemas/jurisdiction-profile-registry.json");
const {
  jurisdictionProfileRegistry: runtimeRegistry,
} = require("../packages/governance/src/index.js");
const {
  jurisdictionProfileRegistry: exportedSchema,
  validateJurisdictionProfileRegistry,
} = require("../packages/schemas/src/index.js");

const docsPath = path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md");
const docsText = fs.readFileSync(docsPath, "utf8");

test("the registry schema accepts the current runtime registry surface", () => {
  assert.deepEqual(schema.required, ["SWE_BODELNING", "CMD_PROFILE"]);
  assert.deepEqual(Object.keys(schema.properties), ["SWE_BODELNING", "CMD_PROFILE"]);
  assert.deepEqual(schema.$defs.jurisdictionProfileRegistryEntry.required, [
    "jurisdiction_profile_key",
    "capabilities",
  ]);
  assert.deepEqual(schema.$defs.jurisdictionProfileCapabilityFlags.required, [
    "profile_inputs",
    "release_eval",
    "profile_dossier",
    "export_package",
    "export_package_json_artifact",
    "export_package_markdown_artifact",
    "export_package_pdf_artifact",
    "export_package_docx_artifact",
    "export_package_bundle_manifest",
    "export_package_bundle_archive_artifact",
  ]);
  assert.deepEqual(validateJurisdictionProfileRegistry(runtimeRegistry), runtimeRegistry);
});

test("packages/schemas exports the registry schema", () => {
  assert.deepEqual(exportedSchema, schema);
});

test("docs describe the same registry surface", () => {
  assert.match(docsText, /schemas\/jurisdiction-profile-registry\.json/);
  assert.match(
    docsText,
    /currently requires the supported `SWE_BODELNING` entry plus the explicit `"CMD_PROFILE"` entry/,
  );
  assert.match(docsText, /allows later additional profile entries/);
});

test("the runtime registry enables the CMD_PROFILE profile_inputs, release_eval, profile_dossier, export_package, JSON artifact, Markdown artifact, PDF artifact, DOCX artifact, bundle/package manifest, and final bundle/archive capabilities", () => {
  assert.deepEqual(Object.keys(runtimeRegistry), ["SWE_BODELNING", "CMD_PROFILE"]);
  assert.deepEqual(runtimeRegistry["CMD_PROFILE"].capabilities, {
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
  });
  assert.deepEqual(validateJurisdictionProfileRegistry(runtimeRegistry), runtimeRegistry);
});
