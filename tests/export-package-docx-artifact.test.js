const test = require("node:test");
const assert = require("node:assert/strict");
const Buffer = require("node:buffer").Buffer;
const fs = require("node:fs");
const path = require("node:path");

const schema = require("../schemas/swe-bodelning-export-package-docx-artifact.json");
const {
  deriveSWEBodelningExportPackage,
  deriveSWEBodelningExportPackageDocxArtifact,
  deriveSWEBodelningExportPackageVersion,
  deriveSWEBodelningProfileDossierSnapshot,
  deriveSWEBodelningReleaseEvalBaseline,
  deriveSWEBodelningReleaseEvalEvaluatorVersion,
} = require("../packages/governance/src/index.js");
const {
  sweBodelningExportPackageDocxArtifact,
  validateSWEBodelningExportPackageDocxArtifact,
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

test("the governance helper derives a valid DOCX export artifact descriptor from a canonical SWE_BODELNING export package snapshot", () => {
  const exportPackage = deriveSWEBodelningExportPackage(createValidReleaseEvalRun(), {
    generated_at: canonicalGeneratedAt,
  });
  const artifact = deriveSWEBodelningExportPackageDocxArtifact(exportPackage);

  assert.deepEqual(artifact, {
    artifact_type: "export-package-docx",
    filename: `${deriveSWEBodelningExportPackageVersion()}-${exportPackage.dossier_fingerprint}.docx`,
    content_type:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    encoding: "base64",
    body_base64: artifact.body_base64,
  });
  assert.deepEqual(validateSWEBodelningExportPackageDocxArtifact(artifact), artifact);
});

test("the DOCX artifact schema accepts the intended machine-readable artifact shape", () => {
  assert.deepEqual(schema.required, [
    "artifact_type",
    "filename",
    "content_type",
    "encoding",
    "body_base64",
  ]);
  assert.equal(schema.properties.artifact_type.const, "export-package-docx");
  assert.equal(
    schema.properties.content_type.const,
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  );
  assert.equal(schema.properties.encoding.const, "base64");
});

test("the helper output validates against the shared DOCX artifact schema", () => {
  const exportPackage = deriveSWEBodelningExportPackage(createValidReleaseEvalRun(), {
    generated_at: canonicalGeneratedAt,
  });
  const artifact = deriveSWEBodelningExportPackageDocxArtifact(exportPackage);

  assert.deepEqual(validateSWEBodelningExportPackageDocxArtifact(artifact), artifact);
});

test("identical canonical inputs plus identical generated_at yield the same artifact filename and body_base64", () => {
  const firstArtifact = deriveSWEBodelningExportPackageDocxArtifact(
    deriveSWEBodelningExportPackage(createValidReleaseEvalRun(), {
      generated_at: canonicalGeneratedAt,
    }),
  );
  const secondArtifact = deriveSWEBodelningExportPackageDocxArtifact(
    deriveSWEBodelningExportPackage(createValidReleaseEvalRun(), {
      generated_at: canonicalGeneratedAt,
    }),
  );

  assert.equal(firstArtifact.filename, secondArtifact.filename);
  assert.equal(firstArtifact.body_base64, secondArtifact.body_base64);
});

test("changed canonical inputs yield changed DOCX artifact body where appropriate", () => {
  const firstArtifact = deriveSWEBodelningExportPackageDocxArtifact(
    deriveSWEBodelningExportPackage(createValidReleaseEvalRun(), {
      generated_at: canonicalGeneratedAt,
    }),
  );
  const secondArtifact = deriveSWEBodelningExportPackageDocxArtifact(
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

test("the produced body_base64 decodes to a plausible DOCX/ZIP payload", () => {
  const exportPackage = deriveSWEBodelningExportPackage(createValidReleaseEvalRun(), {
    generated_at: canonicalGeneratedAt,
  });
  const artifact = deriveSWEBodelningExportPackageDocxArtifact(exportPackage);
  const docxPayload = Buffer.from(artifact.body_base64, "base64");

  assert.equal(docxPayload.subarray(0, 2).toString("utf8"), "PK");
  assert.match(docxPayload.toString("utf8"), /\[Content_Types\]\.xml/);
  assert.match(docxPayload.toString("utf8"), /word\/document\.xml/);
});

test("packages/schemas exports the DOCX artifact schema", () => {
  assert.deepEqual(sweBodelningExportPackageDocxArtifact, schema);
});

test("docs describe the same DOCX artifact surface", () => {
  assert.match(
    docsText,
    /schemas\/swe-bodelning-export-package-docx-artifact\.json/,
  );
  assert.match(
    docsText,
    /shared-governance deterministic DOCX artifact helper/,
  );
  assert.match(
    docsText,
    /without introducing persistence, API, delivery, or final bundle\/package assembly behavior in this slice/,
  );
});

test("non-SWE_BODELNING profiles remain unchanged", () => {
  const exportPackage = deriveSWEBodelningExportPackage(createValidReleaseEvalRun(), {
    generated_at: canonicalGeneratedAt,
  });

  assert.throws(
    () =>
      deriveSWEBodelningExportPackageDocxArtifact({
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
    /without introducing persistence, API, delivery, or final bundle\/package assembly behavior in this slice/,
  );
});
