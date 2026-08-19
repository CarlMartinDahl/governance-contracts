const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const schema = require("../schemas/export-package-markdown-artifact-stop-outcome-alignment.json");
const stopOutcomeModel = require("../schemas/stop-outcome-model.json");
const sweBodelningExportPackageMarkdownArtifact = require("../schemas/swe-bodelning-export-package-markdown-artifact.json");
const sweBodelningExportPackageMarkdownArtifactProjection = require("../schemas/swe-bodelning-export-package-markdown-artifact-projection.json");
const cmdExportPackageMarkdownArtifact = require("../schemas/cmd-export-package-markdown-artifact.json");
const cmdExportPackageMarkdownArtifactProjection = require("../schemas/cmd-export-package-markdown-artifact-projection.json");
const {
  exportPackageMarkdownArtifactStopOutcomeAlignment,
  validateExportPackageMarkdownArtifactStopOutcomeAlignment,
} = require("../packages/schemas/src/index.js");

const docsPath = path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md");
const docsText = fs.readFileSync(docsPath, "utf8");

function createAlignmentPayload() {
  return {
    SWE_BODELNING: {
      artifact_type: "export-package-markdown",
      source_export_package_profile_dossier_release_gate: "blocked",
      source_export_package_profile_dossier_release_eval_freshness: "current",
      canonical_stop_outcome: {
        stop_outcome: "blocked",
      },
      source_export_package_profile_dossier_release_gate_reason_codes: [
        "governance_baseline_fail_closed_pending_completeness_support_policy",
        "swe-bodelning-input-incomplete",
        "swe-bodelning-support-incomplete",
      ],
    },
    CMD_PROFILE: {
      artifact_type: "export-package-markdown",
      source_export_package_profile_dossier_release_gate: "blocked",
      source_export_package_profile_dossier_release_eval_freshness: "current",
      canonical_stop_outcome: {
        stop_outcome: "blocked",
      },
      source_export_package_profile_dossier_release_gate_reason_codes: [
        "cmd-input-incomplete",
        "cmd-runtime-not-implemented",
      ],
    },
  };
}

test("the current documented export_package_markdown_artifact fail-closed baseline aligns to the stop-outcome model for SWE_BODELNING where docs are concrete enough", () => {
  const payload = createAlignmentPayload();

  assert.deepEqual(validateExportPackageMarkdownArtifactStopOutcomeAlignment(payload), payload);
  assert.equal(payload.SWE_BODELNING.artifact_type, "export-package-markdown");
  assert.equal(
    payload.SWE_BODELNING.source_export_package_profile_dossier_release_gate,
    "blocked",
  );
  assert.equal(
    payload.SWE_BODELNING.source_export_package_profile_dossier_release_eval_freshness,
    "current",
  );
  assert.deepEqual(payload.SWE_BODELNING.canonical_stop_outcome, {
    stop_outcome: "blocked",
  });
  assert.equal(
    sweBodelningExportPackageMarkdownArtifact.properties.artifact_type.const,
    "export-package-markdown",
  );
  assert.ok(
    sweBodelningExportPackageMarkdownArtifact.required.includes("body_utf8"),
  );
  assert.ok(
    sweBodelningExportPackageMarkdownArtifactProjection.required.includes(
      "snapshot_status",
    ),
  );
});

test("the current documented export_package_markdown_artifact fail-closed baseline aligns to the stop-outcome model for CMD_PROFILE where docs are concrete enough", () => {
  const payload = createAlignmentPayload();

  assert.deepEqual(validateExportPackageMarkdownArtifactStopOutcomeAlignment(payload), payload);
  assert.equal(payload.CMD_PROFILE.artifact_type, "export-package-markdown");
  assert.equal(
    payload.CMD_PROFILE.source_export_package_profile_dossier_release_gate,
    "blocked",
  );
  assert.equal(
    payload.CMD_PROFILE.source_export_package_profile_dossier_release_eval_freshness,
    "current",
  );
  assert.deepEqual(payload.CMD_PROFILE.canonical_stop_outcome, {
    stop_outcome: "blocked",
  });
  assert.equal(
    cmdExportPackageMarkdownArtifact.properties.artifact_type.const,
    "export-package-markdown",
  );
  assert.ok(cmdExportPackageMarkdownArtifact.required.includes("body_utf8"));
  assert.ok(
    cmdExportPackageMarkdownArtifactProjection.required.includes("snapshot_status"),
  );
});

test("packages/schemas exports the export_package_markdown_artifact stop-outcome alignment surface if applicable", () => {
  assert.deepEqual(exportPackageMarkdownArtifactStopOutcomeAlignment, schema);
  assert.equal(
    typeof validateExportPackageMarkdownArtifactStopOutcomeAlignment,
    "function",
  );
  assert.equal(
    schema.properties.SWE_BODELNING.properties.canonical_stop_outcome.$ref,
    "./stop-outcome-model.json",
  );
  assert.equal(
    schema.properties.CMD_PROFILE.properties.canonical_stop_outcome.$ref,
    "./stop-outcome-model.json",
  );
  assert.deepEqual(stopOutcomeModel.required, ["stop_outcome"]);
});

test("docs describe the same alignment", () => {
  assert.match(
    docsText,
    /shared blocked\/current `export_package_markdown_artifact` baseline is explicitly aligned to the neutral stop-outcome contract through `schemas\/export-package-markdown-artifact-stop-outcome-alignment\.json`/i,
  );
  assert.match(
    docsText,
    /persisted canonical export package snapshot from which the Markdown artifact is deterministically derived/i,
  );
  assert.match(docsText, /`artifact_type = "export-package-markdown"`/);
  assert.match(
    docsText,
    /`source_export_package_profile_dossier_release_gate = blocked`/,
  );
  assert.match(
    docsText,
    /`source_export_package_profile_dossier_release_eval_freshness = current`/,
  );
  assert.match(docsText, /\{ "stop_outcome": "blocked" \}/);
  assert.match(
    docsText,
    /Markdown artifact `snapshot_status` currentness reporting remains intentionally outside this stop-outcome alignment surface/i,
  );
});

test("no runtime behavior changes are introduced", () => {
  const workerEntries = fs.readdirSync(path.join(__dirname, "..", "workers", "analyze"));
  assert.deepEqual(workerEntries, [".gitkeep"]);
});
