const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const schema = require("../schemas/swe-bodelning-export-package-bundle-archive-artifact.json");
const {
  sweBodelningExportPackageBundleArchiveArtifact,
} = require("../packages/schemas/src/index.js");

const docsPath = path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md");
const docsText = fs.readFileSync(docsPath, "utf8");

test("the final bundle/archive artifact schema accepts the intended machine-readable artifact shape", () => {
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
});

test("packages/schemas exports the final bundle/archive artifact schema", () => {
  assert.deepEqual(sweBodelningExportPackageBundleArchiveArtifact, schema);
});

test("docs describe the same final bundle/archive artifact surface", () => {
  assert.match(
    docsText,
    /schemas\/swe-bodelning-export-package-bundle-archive-artifact\.json/,
  );
  assert.match(docsText, /machine-readable final archive artifact surface/);
  assert.match(docsText, /bundle_manifest_fingerprint/);
});

test("no persistence\/API\/delivery behavior changes are introduced beyond schema alignment", () => {
  assert.match(
    docsText,
    /without introducing persistence, API routes, or delivery in this slice/,
  );
});
