const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const schema = require("../schemas/cmd-export-package-bundle-manifest.json");
const {
  cmdExportPackageBundleManifest,
  sweBodelningExportPackageBundleManifest,
} = require("../packages/schemas/src/index.js");
const {
  hasJurisdictionProfileCapability,
  isSupportedJurisdictionProfileKey,
} = require("../packages/governance/src/index.js");

const docsPath = path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md");
const docsText = fs.readFileSync(docsPath, "utf8");

test("the new CMD_PROFILE bundle/package manifest schema accepts the documented surface", () => {
  assert.deepEqual(schema.required, [
    "jurisdiction_profile_key",
    "package_version",
    "export_version",
    "dossier_fingerprint",
    "canonical_source",
    "generated_at",
    "artifacts",
  ]);
  assert.equal(schema.properties.jurisdiction_profile_key.const, "CMD_PROFILE");
  assert.equal(
    schema.properties.canonical_source.$ref,
    "https://governance-contracts.invalid/schemas/cmd-export-package.json#/$defs/exportPackageCanonicalSource",
  );
  assert.deepEqual(schema.$defs.bundleManifestArtifact.required, [
    "artifact_type",
    "filename",
    "content_type",
    "encoding",
  ]);
});

test("packages/schemas exports the new schema if applicable", () => {
  assert.deepEqual(cmdExportPackageBundleManifest, schema);
});

test("docs describe the same bundle/package manifest surface", () => {
  assert.match(
    docsText,
    /canonical `"CMD_PROFILE"` export bundle\/package manifest contract is defined in `schemas\/cmd-export-package-bundle-manifest\.json`/,
  );
  assert.match(
    docsText,
    /follows the existing bundle\/package manifest contract style exactly/i,
  );
  assert.match(
    docsText,
    /stable `jurisdiction_profile_key`, `package_version`, `export_version`, `dossier_fingerprint`, `canonical_source`, `generated_at`, and ordered `artifacts` metadata entries/,
  );
  assert.match(
    docsText,
    /Runtime support is enabled for this `"CMD_PROFILE"` bundle\/package manifest surface in this slice/,
  );
  assert.match(
    docsText,
    /Shared governance also derives a deterministic machine-readable `"CMD_PROFILE"` bundle\/package manifest/i,
  );
});

test("current SWE_BODELNING behavior remains unchanged", () => {
  assert.deepEqual(sweBodelningExportPackageBundleManifest.required, [
    "jurisdiction_profile_key",
    "package_version",
    "export_version",
    "dossier_fingerprint",
    "canonical_source",
    "generated_at",
    "artifacts",
  ]);
  assert.equal(
    sweBodelningExportPackageBundleManifest.properties.jurisdiction_profile_key.const,
    "SWE_BODELNING",
  );
  assert.deepEqual(
    sweBodelningExportPackageBundleManifest.$defs.bundleManifestArtifact.required,
    ["artifact_type", "filename", "content_type", "encoding"],
  );
});

test("bundle/package manifest runtime support for CMD_PROFILE remains enabled with final bundle/archive support present", () => {
  assert.equal(isSupportedJurisdictionProfileKey("CMD_PROFILE"), true);
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

test("no readiness behavior changes are introduced", () => {
  const workerEntries = fs.readdirSync(path.join(__dirname, "..", "workers", "analyze"));
  assert.deepEqual(workerEntries, [".gitkeep"]);
});
