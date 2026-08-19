const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const schema = require("../schemas/cmd-export-package-markdown-artifact-projection.json");
const {
  cmdExportPackageMarkdownArtifactProjection,
  validateCMDExportPackageMarkdownArtifactProjection,
} = require("../packages/schemas/src/index.js");

const docsPath = path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md");
const docsText = fs.readFileSync(docsPath, "utf8");

function toCanonicalJson(value) {
  if (Array.isArray(value)) {
    return `[${value.map((item) => toCanonicalJson(item)).join(",")}]`;
  }

  if (value && typeof value === "object") {
    const entries = Object.keys(value)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${toCanonicalJson(value[key])}`);
    return `{${entries.join(",")}}`;
  }

  return JSON.stringify(value);
}

function createCMDExportPackageMarkdownArtifactProjection() {
  const exportPackage = {
    jurisdiction_profile_key: "CMD_PROFILE",
    export_version: "cmd-export-package-v1",
    dossier_fingerprint: "cmd-dossier-fingerprint-1",
    canonical_source: {
      release_eval_run_id: "cmd-release-eval-run-1",
      evaluator_version: "cmd-release-eval-v1",
      jurisdiction_profile_key: "CMD_PROFILE",
      persisted_at: "2026-03-25T12:00:00.000Z",
    },
    profile_dossier_snapshot: {
      jurisdiction_profile_key: "CMD_PROFILE",
      release_gate: "blocked",
      release_gate_reason_code: "cmd-runtime-not-implemented",
      release_eval_freshness: "current",
      release_eval_freshness_reason_code: "evaluator-version-current",
      evaluator_version: "cmd-release-eval-v1",
      profile_input_summary: {
        required_lane_count: 1,
        lanes_with_value_count: 1,
        missing_value_lane_keys: [],
        lanes_with_support_count: 1,
        missing_support_lane_keys: [],
      },
      profile_input_lane_snapshot: {
        "cmd_primary_signal": {
          has_value: true,
          value: "documented",
          evidence_object_ids: ["cmd-evidence-1"],
          has_support: true,
        },
      },
    },
    generated_at: "2026-03-25T12:30:00.000Z",
    manifest: {
      included_top_level_artifacts: ["canonical_source", "profile_dossier_snapshot"],
    },
  };

  return {
    artifact_type: "export-package-markdown",
    filename: `${exportPackage.export_version}-${exportPackage.dossier_fingerprint}.md`,
    content_type: "text/markdown",
    encoding: "utf-8",
    body_utf8: [
      "# CMD_PROFILE Export Package",
      "",
      "## Metadata",
      "",
      `- \`jurisdiction_profile_key\`: \`${exportPackage.jurisdiction_profile_key}\``,
      `- \`export_version\`: \`${exportPackage.export_version}\``,
      `- \`dossier_fingerprint\`: \`${exportPackage.dossier_fingerprint}\``,
      `- \`generated_at\`: \`${exportPackage.generated_at}\``,
      "",
      "## Canonical Source",
      "",
      "```json",
      toCanonicalJson(exportPackage.canonical_source),
      "```",
      "",
      "## Manifest",
      "",
      "```json",
      toCanonicalJson(exportPackage.manifest),
      "```",
      "",
      "## Profile Dossier Snapshot",
      "",
      "```json",
      toCanonicalJson(exportPackage.profile_dossier_snapshot),
      "```",
      "",
    ].join("\n"),
    snapshot_status: {
      source: "persisted-current",
      snapshot_export_version_found: exportPackage.export_version,
      current_export_version: exportPackage.export_version,
      snapshot_is_current: true,
    },
  };
}

test("the CMD_PROFILE Markdown export artifact projection schema accepts the documented surface", () => {
  assert.deepEqual(schema.required, [
    "artifact_type",
    "filename",
    "content_type",
    "encoding",
    "body_utf8",
    "snapshot_status",
  ]);
  assert.deepEqual(schema.properties.snapshot_status.required, [
    "source",
    "snapshot_export_version_found",
    "current_export_version",
    "snapshot_is_current",
  ]);
  assert.deepEqual(
    validateCMDExportPackageMarkdownArtifactProjection(
      createCMDExportPackageMarkdownArtifactProjection(),
    ),
    createCMDExportPackageMarkdownArtifactProjection(),
  );
});

test("packages/schemas exports the CMD_PROFILE Markdown artifact projection schema", () => {
  assert.deepEqual(cmdExportPackageMarkdownArtifactProjection, schema);
});

test("docs describe the same CMD_PROFILE Markdown artifact projection surface", () => {
  assert.match(
    docsText,
    /schemas\/cmd-export-package-markdown-artifact-projection\.json/,
  );
  assert.match(docsText, /top-level machine-readable `snapshot_status` block/);
});

test("no readiness behavior changes are introduced", () => {
  const workerEntries = fs.readdirSync(path.join(__dirname, "..", "workers", "analyze"));
  assert.deepEqual(workerEntries, [".gitkeep"]);
});
