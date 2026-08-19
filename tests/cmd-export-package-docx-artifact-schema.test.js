const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const schema = require("../schemas/cmd-export-package-docx-artifact.json");
const {
  cmdExportPackageDocxArtifact,
  sweBodelningExportPackageDocxArtifact,
} = require("../packages/schemas/src/index.js");
const {
  hasJurisdictionProfileCapability,
  isSupportedJurisdictionProfileKey,
} = require("../packages/governance/src/index.js");

const docsPath = path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md");
const docsText = fs.readFileSync(docsPath, "utf8");

test("the new CMD_PROFILE DOCX artifact schema accepts the documented surface", () => {
  assert.deepEqual(schema.required, [
    "artifact_type",
    "filename",
    "content_type",
    "encoding",
    "body_base64",
  ]);
  assert.equal(schema.properties.artifact_type.const, "export-package-docx");
  assert.equal(
    schema.properties.content_type.const,
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  );
  assert.equal(schema.properties.encoding.const, "base64");
  assert.equal("jurisdiction_profile_key" in schema.properties, false);
});

test("packages/schemas exports the new schema if applicable", () => {
  assert.deepEqual(cmdExportPackageDocxArtifact, schema);
});

test("docs describe the same DOCX artifact surface", () => {
  assert.match(
    docsText,
    /canonical `"CMD_PROFILE"` DOCX export artifact contract is defined in `schemas\/cmd-export-package-docx-artifact\.json`/,
  );
  assert.match(docsText, /follows the existing DOCX artifact contract style exactly/i);
  assert.match(
    docsText,
    /stable `artifact_type`, `filename`, `content_type`, `encoding`, and `body_base64`/,
  );
  assert.match(docsText, /Runtime support is enabled for this `"CMD_PROFILE"` DOCX artifact surface/);
  assert.match(
    docsText,
    /the thin authenticated DOCX artifact routes now read, refresh, and current-only deliver it through that same centralized path/,
  );
});

test("current SWE_BODELNING behavior remains unchanged", () => {
  assert.deepEqual(sweBodelningExportPackageDocxArtifact.required, [
    "artifact_type",
    "filename",
    "content_type",
    "encoding",
    "body_base64",
  ]);
  assert.equal(
    sweBodelningExportPackageDocxArtifact.properties.artifact_type.const,
    "export-package-docx",
  );
  assert.equal(
    sweBodelningExportPackageDocxArtifact.properties.content_type.const,
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  );
  assert.equal(
    sweBodelningExportPackageDocxArtifact.properties.encoding.const,
    "base64",
  );
});

test("DOCX artifact runtime support for CMD_PROFILE remains enabled with final bundle/archive support present", () => {
  assert.equal(isSupportedJurisdictionProfileKey("CMD_PROFILE"), true);
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

test("no readiness behavior changes are introduced", () => {
  const workerEntries = fs.readdirSync(path.join(__dirname, "..", "workers", "analyze"));
  assert.deepEqual(workerEntries, [".gitkeep"]);
});
