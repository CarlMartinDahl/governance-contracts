const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const schema = require("../schemas/cmd-export-package-bundle-archive-artifact.json");
const {
  cmdExportPackageBundleArchiveArtifact,
  sweBodelningExportPackageBundleArchiveArtifact,
} = require("../packages/schemas/src/index.js");
const {
  hasJurisdictionProfileCapability,
  isSupportedJurisdictionProfileKey,
} = require("../packages/governance/src/index.js");

const docsPath = path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md");
const docsText = fs.readFileSync(docsPath, "utf8");

test("the new CMD_PROFILE final bundle/archive artifact schema accepts the documented surface", () => {
  assert.deepEqual(schema.required, [
    "artifact_type",
    "filename",
    "content_type",
    "encoding",
    "body_base64",
    "package_version",
    "bundle_manifest_fingerprint",
  ]);
  assert.equal(schema.properties.artifact_type.const, "export-package-bundle-archive");
  assert.equal(schema.properties.content_type.const, "application/zip");
  assert.equal(schema.properties.encoding.const, "base64");
  assert.equal("jurisdiction_profile_key" in schema.properties, false);
});

test("packages/schemas exports the new schema if applicable", () => {
  assert.deepEqual(cmdExportPackageBundleArchiveArtifact, schema);
});

test("docs describe the same final bundle/archive artifact surface", () => {
  assert.match(
    docsText,
    /canonical `"CMD_PROFILE"` final bundle\/archive artifact contract is defined in `schemas\/cmd-export-package-bundle-archive-artifact\.json`/,
  );
  assert.match(
    docsText,
    /follows the existing final bundle\/archive artifact contract style exactly/i,
  );
  assert.match(
    docsText,
    /stable `artifact_type`, `filename`, `content_type`, `encoding`, `body_base64`, `package_version`, and `bundle_manifest_fingerprint`/,
  );
  assert.match(
    docsText,
    /Runtime support is enabled for `"CMD_PROFILE"` in this validator slice/i,
  );
});

test("current SWE_BODELNING behavior remains unchanged", () => {
  assert.deepEqual(sweBodelningExportPackageBundleArchiveArtifact.required, [
    "artifact_type",
    "filename",
    "content_type",
    "encoding",
    "body_base64",
    "package_version",
    "bundle_manifest_fingerprint",
  ]);
  assert.equal(
    sweBodelningExportPackageBundleArchiveArtifact.properties.artifact_type.const,
    "export-package-bundle-archive",
  );
  assert.equal(
    sweBodelningExportPackageBundleArchiveArtifact.properties.content_type.const,
    "application/zip",
  );
  assert.equal(
    sweBodelningExportPackageBundleArchiveArtifact.properties.encoding.const,
    "base64",
  );
});

test("final bundle/archive runtime support for CMD_PROFILE is enabled", () => {
  assert.equal(isSupportedJurisdictionProfileKey("CMD_PROFILE"), true);
  assert.equal(
    hasJurisdictionProfileCapability("CMD_PROFILE", "export_package_bundle_archive_artifact"),
    true,
  );
});

test("no readiness behavior changes are introduced", () => {
  const workerEntries = fs.readdirSync(path.join(__dirname, "..", "workers", "analyze"));
  assert.deepEqual(workerEntries, [".gitkeep"]);
});
