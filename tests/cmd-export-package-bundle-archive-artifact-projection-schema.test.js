const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const schema = require("../schemas/cmd-export-package-bundle-archive-artifact-projection.json");
const {
  cmdExportPackageBundleArchiveArtifactProjection,
  validateCMDExportPackageBundleArchiveArtifactProjection,
} = require("../packages/schemas/src/index.js");

const docsPath = path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md");
const docsText = fs.readFileSync(docsPath, "utf8");

function createCMDExportPackageBundleArchiveArtifactProjection() {
  return {
    artifact_type: "export-package-bundle-archive",
    filename:
      "cmd-export-bundle-manifest-v1-0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef.zip",
    content_type: "application/zip",
    encoding: "base64",
    body_base64: Buffer.from("PK\ncmd bundle archive", "utf8").toString("base64"),
    package_version: "cmd-export-bundle-manifest-v1",
    bundle_manifest_fingerprint:
      "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
    snapshot_status: {
      source: "persisted-current",
      snapshot_package_version_found: "cmd-export-bundle-manifest-v1",
      current_package_version: "cmd-export-bundle-manifest-v1",
      snapshot_is_current: true,
    },
  };
}

test("the CMD_PROFILE final bundle/archive artifact projection schema accepts the documented surface", () => {
  assert.deepEqual(schema.required, [
    "artifact_type",
    "filename",
    "content_type",
    "encoding",
    "body_base64",
    "package_version",
    "bundle_manifest_fingerprint",
    "snapshot_status",
  ]);
  assert.deepEqual(schema.properties.snapshot_status.required, [
    "source",
    "snapshot_package_version_found",
    "current_package_version",
    "snapshot_is_current",
  ]);
  assert.deepEqual(
    validateCMDExportPackageBundleArchiveArtifactProjection(
      createCMDExportPackageBundleArchiveArtifactProjection(),
    ),
    createCMDExportPackageBundleArchiveArtifactProjection(),
  );
});

test("packages/schemas exports the CMD_PROFILE final bundle/archive artifact projection schema", () => {
  assert.deepEqual(cmdExportPackageBundleArchiveArtifactProjection, schema);
});

test("docs describe the same CMD_PROFILE final bundle/archive artifact projection surface", () => {
  assert.match(
    docsText,
    /schemas\/cmd-export-package-bundle-archive-artifact-projection\.json/,
  );
  assert.match(docsText, /top-level machine-readable `snapshot_status` block/);
});

test("no readiness behavior changes are introduced", () => {
  const workerEntries = fs.readdirSync(path.join(__dirname, "..", "workers", "analyze"));
  assert.deepEqual(workerEntries, [".gitkeep"]);
});
