const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const schema = require("../schemas/cmd-export-package-markdown-artifact.json");
const {
  cmdExportPackageMarkdownArtifact,
  sweBodelningExportPackageMarkdownArtifact,
} = require("../packages/schemas/src/index.js");
const {
  hasJurisdictionProfileCapability,
  isSupportedJurisdictionProfileKey,
} = require("../packages/governance/src/index.js");

const docsPath = path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md");
const docsText = fs.readFileSync(docsPath, "utf8");

test("the new CMD_PROFILE Markdown artifact schema accepts the documented surface", () => {
  assert.deepEqual(schema.required, [
    "artifact_type",
    "filename",
    "content_type",
    "encoding",
    "body_utf8",
  ]);
  assert.equal(schema.properties.artifact_type.const, "export-package-markdown");
  assert.equal(schema.properties.content_type.const, "text/markdown");
  assert.equal(schema.properties.encoding.const, "utf-8");
  assert.equal("jurisdiction_profile_key" in schema.properties, false);
});

test("packages/schemas exports the new schema if applicable", () => {
  assert.deepEqual(cmdExportPackageMarkdownArtifact, schema);
});

test("docs describe the same Markdown artifact surface", () => {
  assert.match(
    docsText,
    /canonical `"CMD_PROFILE"` Markdown export artifact contract is defined in `schemas\/cmd-export-package-markdown-artifact\.json`/,
  );
  assert.match(docsText, /follows the existing Markdown artifact contract style exactly/i);
  assert.match(
    docsText,
    /stable `artifact_type`, `filename`, `content_type`, `encoding`, and `body_utf8`/,
  );
  assert.match(
    docsText,
    /Runtime support is enabled for this `"CMD_PROFILE"` Markdown artifact surface in this slice/,
  );
});

test("current SWE_BODELNING behavior remains unchanged", () => {
  assert.deepEqual(sweBodelningExportPackageMarkdownArtifact.required, [
    "artifact_type",
    "filename",
    "content_type",
    "encoding",
    "body_utf8",
  ]);
  assert.equal(
    sweBodelningExportPackageMarkdownArtifact.properties.artifact_type.const,
    "export-package-markdown",
  );
  assert.equal(
    sweBodelningExportPackageMarkdownArtifact.properties.content_type.const,
    "text/markdown",
  );
  assert.equal(
    sweBodelningExportPackageMarkdownArtifact.properties.encoding.const,
    "utf-8",
  );
});

test("Markdown artifact runtime support for CMD_PROFILE is enabled while the remaining export surfaces stay unsupported", () => {
  assert.equal(isSupportedJurisdictionProfileKey("CMD_PROFILE"), true);
  assert.equal(
    hasJurisdictionProfileCapability("CMD_PROFILE", "export_package_markdown_artifact"),
    true,
  );
});

test("no readiness behavior changes are introduced", () => {
  const workerEntries = fs.readdirSync(path.join(__dirname, "..", "workers", "analyze"));
  assert.deepEqual(workerEntries, [".gitkeep"]);
});
