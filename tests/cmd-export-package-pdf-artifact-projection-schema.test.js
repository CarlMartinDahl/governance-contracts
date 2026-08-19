const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const schema = require("../schemas/cmd-export-package-pdf-artifact-projection.json");
const {
  cmdExportPackagePdfArtifactProjection,
  validateCMDExportPackagePdfArtifactProjection,
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

function chunkPdfText(value, size = 88) {
  if (typeof value !== "string" || value.length === 0) {
    return [""];
  }

  const chunks = [];

  for (let index = 0; index < value.length; index += size) {
    chunks.push(value.slice(index, index + size));
  }

  return chunks;
}

function escapePdfText(value) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)")
    .replace(/\r/g, "\\r")
    .replace(/\n/g, "\\n");
}

function buildMinimalPdfDocument(lines) {
  const contentLines = ["BT", "/F1 10 Tf", "50 780 Td", "12 TL"];

  lines.forEach((line, index) => {
    contentLines.push(`(${escapePdfText(line)}) Tj`);

    if (index < lines.length - 1) {
      contentLines.push("T*");
    }
  });

  contentLines.push("ET");

  const contentStream = `${contentLines.join("\n")}\n`;
  const objects = [
    "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n",
    "2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n",
    "3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>\nendobj\n",
    "4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n",
    `5 0 obj\n<< /Length ${contentStream.length} >>\nstream\n${contentStream}endstream\nendobj\n`,
  ];

  let pdf = "%PDF-1.4\n";
  const offsets = [0];

  for (const objectText of objects) {
    offsets.push(pdf.length);
    pdf += objectText;
  }

  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;

  for (const offset of offsets.slice(1)) {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  }

  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

  return pdf;
}

function createCMDExportPackagePdfArtifactProjection() {
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
  const canonicalExportPackageJson = toCanonicalJson(exportPackage);
  const pdfPayload = buildMinimalPdfDocument([
    "CMD_PROFILE Export Package",
    `jurisdiction_profile_key: ${exportPackage.jurisdiction_profile_key}`,
    `export_version: ${exportPackage.export_version}`,
    `dossier_fingerprint: ${exportPackage.dossier_fingerprint}`,
    `generated_at: ${exportPackage.generated_at}`,
    "canonical_export_package_json:",
    ...chunkPdfText(canonicalExportPackageJson),
  ]);

  return {
    artifact_type: "export-package-pdf",
    filename: `${exportPackage.export_version}-${exportPackage.dossier_fingerprint}.pdf`,
    content_type: "application/pdf",
    encoding: "base64",
    body_base64: Buffer.from(pdfPayload, "utf8").toString("base64"),
    snapshot_status: {
      source: "persisted-current",
      snapshot_export_version_found: exportPackage.export_version,
      current_export_version: exportPackage.export_version,
      snapshot_is_current: true,
    },
  };
}

test("the CMD_PROFILE PDF export artifact projection schema accepts the documented surface", () => {
  assert.deepEqual(schema.required, [
    "artifact_type",
    "filename",
    "content_type",
    "encoding",
    "body_base64",
    "snapshot_status",
  ]);
  assert.deepEqual(schema.properties.snapshot_status.required, [
    "source",
    "snapshot_export_version_found",
    "current_export_version",
    "snapshot_is_current",
  ]);
  assert.deepEqual(
    validateCMDExportPackagePdfArtifactProjection(
      createCMDExportPackagePdfArtifactProjection(),
    ),
    createCMDExportPackagePdfArtifactProjection(),
  );
});

test("packages/schemas exports the CMD_PROFILE PDF artifact projection schema", () => {
  assert.deepEqual(cmdExportPackagePdfArtifactProjection, schema);
});

test("docs describe the same CMD_PROFILE PDF artifact projection surface", () => {
  assert.match(
    docsText,
    /schemas\/cmd-export-package-pdf-artifact-projection\.json/,
  );
  assert.match(docsText, /top-level machine-readable `snapshot_status` block/);
});

test("no readiness behavior changes are introduced", () => {
  const workerEntries = fs.readdirSync(path.join(__dirname, "..", "workers", "analyze"));
  assert.deepEqual(workerEntries, [".gitkeep"]);
});
