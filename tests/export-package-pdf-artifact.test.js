const test = require("node:test");
const assert = require("node:assert/strict");
const Buffer = require("node:buffer").Buffer;
const fs = require("node:fs");
const path = require("node:path");

const schema = require("../schemas/swe-bodelning-export-package-pdf-artifact.json");
const {
  deriveSWEBodelningExportPackage,
  deriveSWEBodelningExportPackagePdfArtifact,
  deriveSWEBodelningExportPackageVersion,
  deriveSWEBodelningProfileDossierSnapshot,
  deriveSWEBodelningReleaseEvalBaseline,
  deriveSWEBodelningReleaseEvalEvaluatorVersion,
} = require("../packages/governance/src/index.js");
const {
  sweBodelningExportPackagePdfArtifact,
  validateSWEBodelningExportPackagePdfArtifact,
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

test("the governance helper derives a valid PDF export artifact descriptor from a canonical SWE_BODELNING export package snapshot", () => {
  const exportPackage = deriveSWEBodelningExportPackage(createValidReleaseEvalRun(), {
    generated_at: canonicalGeneratedAt,
  });
  const artifact = deriveSWEBodelningExportPackagePdfArtifact(exportPackage);

  assert.deepEqual(artifact, {
    artifact_type: "export-package-pdf",
    filename: `${deriveSWEBodelningExportPackageVersion()}-${exportPackage.dossier_fingerprint}.pdf`,
    content_type: "application/pdf",
    encoding: "base64",
    body_base64: artifact.body_base64,
  });
  assert.deepEqual(validateSWEBodelningExportPackagePdfArtifact(artifact), artifact);
});

test("the PDF artifact schema accepts the intended machine-readable artifact shape", () => {
  assert.deepEqual(schema.required, [
    "artifact_type",
    "filename",
    "content_type",
    "encoding",
    "body_base64",
  ]);
  assert.equal(schema.properties.artifact_type.const, "export-package-pdf");
  assert.equal(schema.properties.content_type.const, "application/pdf");
  assert.equal(schema.properties.encoding.const, "base64");
});

test("the helper output validates against the shared PDF artifact schema", () => {
  const exportPackage = deriveSWEBodelningExportPackage(createValidReleaseEvalRun(), {
    generated_at: canonicalGeneratedAt,
  });
  const artifact = deriveSWEBodelningExportPackagePdfArtifact(exportPackage);

  assert.deepEqual(validateSWEBodelningExportPackagePdfArtifact(artifact), artifact);
});

test("identical canonical inputs plus identical generated_at yield the same artifact filename and body_base64", () => {
  const firstArtifact = deriveSWEBodelningExportPackagePdfArtifact(
    deriveSWEBodelningExportPackage(createValidReleaseEvalRun(), {
      generated_at: canonicalGeneratedAt,
    }),
  );
  const secondArtifact = deriveSWEBodelningExportPackagePdfArtifact(
    deriveSWEBodelningExportPackage(createValidReleaseEvalRun(), {
      generated_at: canonicalGeneratedAt,
    }),
  );

  assert.equal(firstArtifact.filename, secondArtifact.filename);
  assert.equal(firstArtifact.body_base64, secondArtifact.body_base64);
});

test("changed canonical inputs yield changed PDF artifact body where appropriate", () => {
  const firstArtifact = deriveSWEBodelningExportPackagePdfArtifact(
    deriveSWEBodelningExportPackage(createValidReleaseEvalRun(), {
      generated_at: canonicalGeneratedAt,
    }),
  );
  const secondArtifact = deriveSWEBodelningExportPackagePdfArtifact(
    deriveSWEBodelningExportPackage(
      createValidReleaseEvalRun({
        profile_input_summary: {
          required_lane_count: 3,
          lanes_with_value_count: 3,
          missing_value_lane_keys: [],
          lanes_with_support_count: 3,
          missing_support_lane_keys: [],
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
            has_value: true,
            value: "co-acquisition",
            evidence_object_ids: ["evidence-3"],
            has_support: true,
          },
        },
      }),
      {
        generated_at: canonicalGeneratedAt,
      },
    ),
  );

  assert.notEqual(firstArtifact.body_base64, secondArtifact.body_base64);
});

test("the produced body_base64 decodes to a plausible PDF payload", () => {
  const exportPackage = deriveSWEBodelningExportPackage(createValidReleaseEvalRun(), {
    generated_at: canonicalGeneratedAt,
  });
  const artifact = deriveSWEBodelningExportPackagePdfArtifact(exportPackage);
  const pdfPayload = Buffer.from(artifact.body_base64, "base64").toString("utf8");

  assert.match(pdfPayload, /^%PDF-/);
  assert.match(pdfPayload, /SWE_BODELNING Export Package/);
});

test("packages/schemas exports the PDF artifact schema", () => {
  assert.deepEqual(sweBodelningExportPackagePdfArtifact, schema);
});

test("docs describe the same PDF artifact surface", () => {
  assert.match(
    docsText,
    /schemas\/swe-bodelning-export-package-pdf-artifact\.json/,
  );
  assert.match(
    docsText,
    /shared-governance deterministic PDF artifact helper/,
  );
  assert.match(
    docsText,
    /without introducing persistence, API, delivery, or package assembly behavior in this slice/,
  );
});

test("non-SWE_BODELNING profiles remain unchanged", () => {
  const exportPackage = deriveSWEBodelningExportPackage(createValidReleaseEvalRun(), {
    generated_at: canonicalGeneratedAt,
  });

  assert.throws(
    () =>
      deriveSWEBodelningExportPackagePdfArtifact({
        ...exportPackage,
        jurisdiction_profile_key: "SWE_OTHER",
      }),
    (error) => error.code === "ERR_UNSUPPORTED_JURISDICTION_PROFILE",
  );
});

test("no persistence/API/delivery behavior changes are introduced", () => {
  const workerEntries = fs.readdirSync(path.join(__dirname, "..", "workers", "analyze"));

  assert.deepEqual(workerEntries, [".gitkeep"]);
  assert.match(
    docsText,
    /without introducing persistence, API, delivery, or package assembly behavior in this slice/,
  );
});
