const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const schema = require("../schemas/cmd-export-package-json-artifact.json");
const {
  cmdExportPackageJsonArtifact,
  sweBodelningExportPackageJsonArtifact,
} = require("../packages/schemas/src/index.js");
const {
  hasJurisdictionProfileCapability,
  isSupportedJurisdictionProfileKey,
} = require("../packages/governance/src/index.js");

const docsPath = path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md");
const docsText = fs.readFileSync(docsPath, "utf8");

test("the new CMD_PROFILE JSON artifact schema accepts the documented surface", () => {
  assert.deepEqual(schema.required, [
    "artifact_type",
    "filename",
    "content_type",
    "encoding",
    "body_utf8",
  ]);
  assert.equal(schema.properties.artifact_type.const, "export-package-json");
  assert.equal(schema.properties.content_type.const, "application/json");
  assert.equal(schema.properties.encoding.const, "utf-8");
  assert.equal("jurisdiction_profile_key" in schema.properties, false);
});

test("packages/schemas exports the new schema if applicable", () => {
  assert.deepEqual(cmdExportPackageJsonArtifact, schema);
});

test("docs describe the same JSON artifact surface", () => {
  assert.match(
    docsText,
    /canonical `"CMD_PROFILE"` JSON export artifact contract is defined in `schemas\/cmd-export-package-json-artifact\.json`/,
  );
  assert.match(docsText, /follows the existing JSON artifact contract style exactly/i);
  assert.match(
    docsText,
    /stable `artifact_type`, `filename`, `content_type`, `encoding`, and `body_utf8`/,
  );
  assert.match(docsText, /Runtime support is enabled for this `"CMD_PROFILE"` JSON artifact surface/);
  assert.match(
    docsText,
    /the thin authenticated JSON artifact routes now read, refresh, and current-only deliver it through that same centralized path/,
  );
});

test("current SWE_BODELNING behavior remains unchanged", () => {
  assert.deepEqual(sweBodelningExportPackageJsonArtifact.required, [
    "artifact_type",
    "filename",
    "content_type",
    "encoding",
    "body_utf8",
  ]);
  assert.equal(
    sweBodelningExportPackageJsonArtifact.properties.artifact_type.const,
    "export-package-json",
  );
  assert.equal(
    sweBodelningExportPackageJsonArtifact.properties.content_type.const,
    "application/json",
  );
  assert.equal(
    sweBodelningExportPackageJsonArtifact.properties.encoding.const,
    "utf-8",
  );
});

test("JSON artifact runtime support for CMD_PROFILE remains enabled", () => {
  assert.equal(isSupportedJurisdictionProfileKey("CMD_PROFILE"), true);
  assert.equal(
    hasJurisdictionProfileCapability("CMD_PROFILE", "export_package_json_artifact"),
    true,
  );
});

test("no readiness behavior changes are introduced", () => {
  const workerEntries = fs.readdirSync(path.join(__dirname, "..", "workers", "analyze"));
  assert.deepEqual(workerEntries, [".gitkeep"]);
});
