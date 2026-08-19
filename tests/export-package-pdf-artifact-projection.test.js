const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const Buffer = require("node:buffer").Buffer;

const schema = require("../schemas/swe-bodelning-export-package-pdf-artifact-projection.json");
const {
  deriveSWEBodelningExportPackage,
  deriveSWEBodelningExportPackageFromPdfArtifact,
  deriveSWEBodelningExportPackagePdfArtifact,
  deriveSWEBodelningExportPackagePdfArtifactSnapshotStatus,
  deriveSWEBodelningExportPackageVersion,
  deriveSWEBodelningProfileDossierSnapshot,
  deriveSWEBodelningReleaseEvalBaseline,
  deriveSWEBodelningReleaseEvalEvaluatorVersion,
  resolveSWEBodelningExportPackagePdfArtifactProjection,
} = require("../packages/governance/src/index.js");
const {
  sweBodelningExportPackagePdfArtifactProjection,
  validateSWEBodelningExportPackagePdfArtifactProjection,
} = require("../packages/schemas/src/index.js");

const docsPath = path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md");
const docsText = fs.readFileSync(docsPath, "utf8");

const canonicalBaseline = deriveSWEBodelningReleaseEvalBaseline();
const canonicalEvaluatorVersion = deriveSWEBodelningReleaseEvalEvaluatorVersion();
const currentFreshnessReasonCode = "evaluator-version-current";
const canonicalPersistedAt = "2026-03-24T10:00:00.000Z";
const canonicalGeneratedAt = "2026-03-24T12:00:00.000Z";

function createValidReleaseEvalRun(overrides = {}) {
  const releaseEvalRun = {
    jurisdiction_profile_key: "SWE_BODELNING",
    release_eval_run_id: "release-eval-run-1",
    evaluator_version: canonicalEvaluatorVersion,
    release_gate: canonicalBaseline.release_gate,
    release_gate_reason_code: canonicalBaseline.release_gate_reason_code,
    release_eval_freshness: canonicalBaseline.release_eval_freshness,
    release_eval_freshness_reason_code: currentFreshnessReasonCode,
    profile_input_summary: {
      required_lane_count: 3,
      lanes_with_value_count: 2,
      missing_value_lane_keys: ["shared_intent"],
      lanes_with_support_count: 2,
      missing_support_lane_keys: ["shared_intent"],
    },
    profile_input_lane_snapshot: {
      economic_contribution: {
        has_value: true,
        value: "documented",
        evidence_object_ids: ["evidence-1"],
        has_support: true,
      },
      shared_use: {
        has_value: true,
        value: "residence",
        evidence_object_ids: ["evidence-2"],
        has_support: true,
      },
      shared_intent: {
        has_value: false,
        value: null,
        evidence_object_ids: [],
        has_support: false,
      },
    },
    ...overrides,
  };

  return {
    ...releaseEvalRun,
    profile_dossier_snapshot: deriveSWEBodelningProfileDossierSnapshot(releaseEvalRun, {
      persisted_at: canonicalPersistedAt,
    }),
  };
}

test("the PDF export artifact projection schema includes the read-time snapshot_status surface", () => {
  assert.deepEqual(schema.required, [
    "artifact_type",
    "filename",
    "content_type",
    "encoding",
    "body_base64",
    "snapshot_status",
  ]);
  assert.deepEqual(
    schema.properties.snapshot_status.required,
    [
      "source",
      "snapshot_export_version_found",
      "current_export_version",
      "snapshot_is_current",
    ],
  );
  assert.deepEqual(
    schema.properties.snapshot_status.properties.source.enum,
    ["persisted-current", "persisted-stale"],
  );
});

test("packages/schemas exports the SWE_BODELNING PDF export artifact projection schema", () => {
  assert.deepEqual(sweBodelningExportPackagePdfArtifactProjection, schema);
});

test("current PDF artifact snapshot yields snapshot_status.source = persisted-current", () => {
  const releaseEvalRun = createValidReleaseEvalRun();
  const exportPackage = deriveSWEBodelningExportPackage(releaseEvalRun, {
    generated_at: canonicalGeneratedAt,
  });
  const pdfArtifact = deriveSWEBodelningExportPackagePdfArtifact(exportPackage);
  const projection = resolveSWEBodelningExportPackagePdfArtifactProjection(
    pdfArtifact,
    exportPackage,
    releaseEvalRun.profile_dossier_snapshot,
  );

  assert.equal(projection.snapshot_status.source, "persisted-current");
  assert.equal(projection.snapshot_status.snapshot_is_current, true);
  assert.equal(
    projection.snapshot_status.snapshot_export_version_found,
    exportPackage.export_version,
  );
  assert.equal(
    projection.snapshot_status.current_export_version,
    deriveSWEBodelningExportPackageVersion(),
  );
  assert.deepEqual(validateSWEBodelningExportPackagePdfArtifactProjection(projection), projection);
});

test("stale PDF artifact snapshot yields snapshot_status.source = persisted-stale when dossier_fingerprint changes", () => {
  const releaseEvalRun = createValidReleaseEvalRun();
  const exportPackage = deriveSWEBodelningExportPackage(releaseEvalRun, {
    generated_at: canonicalGeneratedAt,
  });
  const pdfArtifact = deriveSWEBodelningExportPackagePdfArtifact(exportPackage);
  const changedProfileDossierSnapshot = deriveSWEBodelningProfileDossierSnapshot(
    {
      ...releaseEvalRun,
      profile_input_summary: {
        ...releaseEvalRun.profile_input_summary,
        lanes_with_value_count: 3,
        missing_value_lane_keys: [],
        lanes_with_support_count: 3,
        missing_support_lane_keys: [],
      },
      profile_input_lane_snapshot: {
        ...releaseEvalRun.profile_input_lane_snapshot,
        shared_intent: {
          has_value: true,
          value: "co-acquisition",
          evidence_object_ids: ["evidence-3"],
          has_support: true,
        },
      },
    },
    { persisted_at: canonicalPersistedAt },
  );
  const projection = resolveSWEBodelningExportPackagePdfArtifactProjection(
    pdfArtifact,
    exportPackage,
    changedProfileDossierSnapshot,
  );

  assert.equal(projection.snapshot_status.source, "persisted-stale");
  assert.equal(projection.snapshot_status.snapshot_is_current, false);
  assert.equal(
    projection.snapshot_status.snapshot_export_version_found,
    exportPackage.export_version,
  );
  assert.equal(
    projection.snapshot_status.current_export_version,
    deriveSWEBodelningExportPackageVersion(),
  );
  assert.notEqual(
    deriveSWEBodelningExportPackageFromPdfArtifact(pdfArtifact).dossier_fingerprint,
    changedProfileDossierSnapshot.dossier_fingerprint,
  );
});

test("snapshot_status correctly reports found/current export version values when export_version is older", () => {
  const releaseEvalRun = createValidReleaseEvalRun();
  const exportPackage = deriveSWEBodelningExportPackage(releaseEvalRun, {
    generated_at: canonicalGeneratedAt,
  });
  const olderPdfArtifact = deriveSWEBodelningExportPackagePdfArtifact({
    ...exportPackage,
    export_version: "swe-bodelning-export-package-v0",
  });
  const projection = resolveSWEBodelningExportPackagePdfArtifactProjection(
    olderPdfArtifact,
    exportPackage,
    releaseEvalRun.profile_dossier_snapshot,
  );

  assert.deepEqual(
    deriveSWEBodelningExportPackagePdfArtifactSnapshotStatus(
      olderPdfArtifact,
      exportPackage,
      releaseEvalRun.profile_dossier_snapshot,
    ),
    projection.snapshot_status,
  );
  assert.equal(projection.snapshot_status.source, "persisted-stale");
  assert.equal(
    projection.snapshot_status.snapshot_export_version_found,
    "swe-bodelning-export-package-v0",
  );
  assert.equal(
    projection.snapshot_status.current_export_version,
    deriveSWEBodelningExportPackageVersion(),
  );
});

test("docs minimally describe the PDF export artifact projection surface", () => {
  assert.match(
    docsText,
    /schemas\/swe-bodelning-export-package-pdf-artifact-projection\.json/,
  );
  assert.match(docsText, /PDF export artifact read route/);
  assert.match(docsText, /machine-readable top-level `snapshot_status` block/);
});

test("non-SWE_BODELNING profiles remain unchanged", () => {
  const releaseEvalRun = createValidReleaseEvalRun();
  const exportPackage = deriveSWEBodelningExportPackage(releaseEvalRun, {
    generated_at: canonicalGeneratedAt,
  });
  const pdfArtifact = deriveSWEBodelningExportPackagePdfArtifact(exportPackage);
  const pdfPayload = Buffer.from(pdfArtifact.body_base64, "base64").toString("utf8");

  assert.throws(
    () =>
      resolveSWEBodelningExportPackagePdfArtifactProjection(
        {
          ...pdfArtifact,
          body_base64: Buffer.from(
            pdfPayload.replace(/SWE_BODELNING/g, "SWE_OTHER"),
            "utf8",
          ).toString("base64"),
        },
        exportPackage,
        releaseEvalRun.profile_dossier_snapshot,
      ),
    (error) =>
      error.code === "ERR_UNSUPPORTED_JURISDICTION_PROFILE" ||
      error.code === "ERR_EXPORT_PACKAGE_PDF_ARTIFACT_PROJECTION_INVALID",
  );
});

test("no readiness behavior changes are introduced", () => {
  assert.match(
    docsText,
    /without route-local PDF artifact recomputation or silent refresh/,
  );
  assert.match(
    docsText,
    /No zip\/pdf\/docx\/file generation or final output packaging is introduced in these export package slices/,
  );
});
