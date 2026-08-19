const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const schema = require("../schemas/cmd-export-package-bundle-manifest-projection.json");
const {
  cmdExportPackageBundleManifestProjection,
  validateCMDExportPackageBundleManifestProjection,
} = require("../packages/schemas/src/index.js");

const docsPath = path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md");
const docsText = fs.readFileSync(docsPath, "utf8");

function createCMDExportPackageBundleManifestProjection() {
  return {
    jurisdiction_profile_key: "CMD_PROFILE",
    package_version: "cmd-export-bundle-manifest-v1",
    export_version: "cmd-export-package-v1",
    dossier_fingerprint: "cmd-dossier-fingerprint-1",
    canonical_source: {
      release_eval_run_id: "cmd-release-eval-run-1",
      evaluator_version: "cmd-release-eval-v1",
      jurisdiction_profile_key: "CMD_PROFILE",
      persisted_at: "2026-03-25T12:00:00.000Z",
    },
    generated_at: "2026-03-25T12:45:00.000Z",
    artifacts: [
      {
        artifact_type: "export-package-json",
        filename: "cmd-export-package-v1-cmd-dossier-fingerprint-1.json",
        content_type: "application/json",
        encoding: "utf-8",
      },
      {
        artifact_type: "export-package-markdown",
        filename: "cmd-export-package-v1-cmd-dossier-fingerprint-1.md",
        content_type: "text/markdown",
        encoding: "utf-8",
      },
      {
        artifact_type: "export-package-pdf",
        filename: "cmd-export-package-v1-cmd-dossier-fingerprint-1.pdf",
        content_type: "application/pdf",
        encoding: "base64",
      },
      {
        artifact_type: "export-package-docx",
        filename: "cmd-export-package-v1-cmd-dossier-fingerprint-1.docx",
        content_type:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        encoding: "base64",
      },
    ],
    snapshot_status: {
      source: "persisted-current",
      snapshot_package_version_found: "cmd-export-bundle-manifest-v1",
      current_package_version: "cmd-export-bundle-manifest-v1",
      snapshot_is_current: true,
    },
  };
}

test("the CMD_PROFILE bundle/package manifest projection schema accepts the documented surface", () => {
  assert.deepEqual(schema.required, [
    "jurisdiction_profile_key",
    "package_version",
    "export_version",
    "dossier_fingerprint",
    "canonical_source",
    "generated_at",
    "artifacts",
    "snapshot_status",
  ]);
  assert.deepEqual(schema.properties.snapshot_status.required, [
    "source",
    "snapshot_package_version_found",
    "current_package_version",
    "snapshot_is_current",
  ]);
  assert.deepEqual(
    validateCMDExportPackageBundleManifestProjection(
      createCMDExportPackageBundleManifestProjection(),
    ),
    createCMDExportPackageBundleManifestProjection(),
  );
});

test("packages/schemas exports the CMD_PROFILE bundle/package manifest projection schema", () => {
  assert.deepEqual(cmdExportPackageBundleManifestProjection, schema);
});

test("docs describe the same CMD_PROFILE bundle/package manifest projection surface", () => {
  assert.match(
    docsText,
    /schemas\/cmd-export-package-bundle-manifest-projection\.json/,
  );
  assert.match(docsText, /top-level machine-readable `snapshot_status` block/);
});

test("no readiness behavior changes are introduced", () => {
  const workerEntries = fs.readdirSync(path.join(__dirname, "..", "workers", "analyze"));
  assert.deepEqual(workerEntries, [".gitkeep"]);
});
