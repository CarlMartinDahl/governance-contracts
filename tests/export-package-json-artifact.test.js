const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const schema = require("../schemas/swe-bodelning-export-package-json-artifact.json");
const {
  deriveSWEBodelningExportPackage,
  deriveSWEBodelningExportPackageJsonArtifact,
  deriveSWEBodelningExportPackageVersion,
  deriveSWEBodelningProfileDossierSnapshot,
  deriveSWEBodelningReleaseEvalBaseline,
  deriveSWEBodelningReleaseEvalEvaluatorVersion,
} = require("../packages/governance/src/index.js");
const {
  sweBodelningExportPackageJsonArtifact,
  validateSWEBodelningExportPackageJsonArtifact,
} = require("../packages/schemas/src/index.js");

const docsPath = path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md");
const docsText = fs.readFileSync(docsPath, "utf8");

const canonicalBaseline = deriveSWEBodelningReleaseEvalBaseline();
const canonicalEvaluatorVersion = deriveSWEBodelningReleaseEvalEvaluatorVersion();
const currentFreshnessReasonCode = "evaluator-version-current";
const canonicalPersistedAt = "2026-03-23T10:00:00.000Z";
const canonicalGeneratedAt = "2026-03-23T12:00:00.000Z";

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

test("the governance helper derives a valid JSON export artifact from a canonical SWE_BODELNING export package snapshot", () => {
  const exportPackage = deriveSWEBodelningExportPackage(createValidReleaseEvalRun(), {
    generated_at: canonicalGeneratedAt,
  });
  const artifact = deriveSWEBodelningExportPackageJsonArtifact(exportPackage);

  assert.deepEqual(artifact, {
    artifact_type: "export-package-json",
    filename: `${deriveSWEBodelningExportPackageVersion()}-${exportPackage.dossier_fingerprint}.json`,
    content_type: "application/json",
    encoding: "utf-8",
    body_utf8: artifact.body_utf8,
  });
  assert.deepEqual(JSON.parse(artifact.body_utf8), exportPackage);
  assert.deepEqual(validateSWEBodelningExportPackageJsonArtifact(artifact), artifact);
});

test("the canonical JSON export artifact schema includes the required artifact fields", () => {
  assert.deepEqual(schema.required, [
    "artifact_type",
    "filename",
    "content_type",
    "encoding",
    "body_utf8",
  ]);
  assert.equal(schema.properties.artifact_type.const, "export-package-json");
  assert.equal(schema.properties.content_type.const, "application/json");
  assert.equal(schema.properties.encoding.const, "utf-8");
});

test("identical canonical inputs produce the same artifact filename and JSON body", () => {
  const firstExportPackage = deriveSWEBodelningExportPackage(createValidReleaseEvalRun(), {
    generated_at: canonicalGeneratedAt,
  });
  const secondExportPackage = deriveSWEBodelningExportPackage(createValidReleaseEvalRun(), {
    generated_at: canonicalGeneratedAt,
  });

  const firstArtifact = deriveSWEBodelningExportPackageJsonArtifact(firstExportPackage);
  const secondArtifact = deriveSWEBodelningExportPackageJsonArtifact(secondExportPackage);

  assert.equal(firstArtifact.filename, secondArtifact.filename);
  assert.equal(firstArtifact.body_utf8, secondArtifact.body_utf8);
});

test("changed canonical export package content produces changed JSON body where appropriate", () => {
  const firstArtifact = deriveSWEBodelningExportPackageJsonArtifact(
    deriveSWEBodelningExportPackage(createValidReleaseEvalRun(), {
      generated_at: canonicalGeneratedAt,
    }),
  );
  const secondArtifact = deriveSWEBodelningExportPackageJsonArtifact(
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

  assert.notEqual(firstArtifact.body_utf8, secondArtifact.body_utf8);
});

test("the artifact metadata is machine-readable and stable", () => {
  const exportPackage = deriveSWEBodelningExportPackage(createValidReleaseEvalRun(), {
    generated_at: canonicalGeneratedAt,
  });
  const artifact = deriveSWEBodelningExportPackageJsonArtifact(exportPackage);

  assert.equal(artifact.artifact_type, "export-package-json");
  assert.equal(artifact.content_type, "application/json");
  assert.equal(artifact.encoding, "utf-8");
  assert.match(
    artifact.filename,
    new RegExp(`^${deriveSWEBodelningExportPackageVersion()}-[a-f0-9]+\\.json$`),
  );
});

test("packages/schemas exports the JSON export artifact schema", () => {
  assert.deepEqual(sweBodelningExportPackageJsonArtifact, schema);
});

test("non-SWE_BODELNING behavior remains unchanged", () => {
  const exportPackage = deriveSWEBodelningExportPackage(createValidReleaseEvalRun(), {
    generated_at: canonicalGeneratedAt,
  });

  assert.throws(
    () =>
      deriveSWEBodelningExportPackageJsonArtifact({
        ...exportPackage,
        jurisdiction_profile_key: "SWE_OTHER",
      }),
    (error) => error.code === "ERR_UNSUPPORTED_JURISDICTION_PROFILE",
  );
});

test("no readiness behavior changes are introduced", () => {
  const exportPackage = deriveSWEBodelningExportPackage(createValidReleaseEvalRun(), {
    generated_at: canonicalGeneratedAt,
  });
  const artifact = deriveSWEBodelningExportPackageJsonArtifact(exportPackage);
  const parsedArtifactBody = JSON.parse(artifact.body_utf8);

  assert.equal(
    parsedArtifactBody.profile_dossier_snapshot.release_gate,
    exportPackage.profile_dossier_snapshot.release_gate,
  );
  assert.equal(
    parsedArtifactBody.profile_dossier_snapshot.release_eval_freshness,
    exportPackage.profile_dossier_snapshot.release_eval_freshness,
  );
  assert.match(
    docsText,
    /derives deterministic machine-readable JSON export artifacts/,
  );
  assert.match(
    docsText,
    /schemas\/swe-bodelning-export-package-json-artifact\.json/,
  );
  assert.match(
    docsText,
    /used by the shared governance JSON artifact helper/,
  );
  assert.match(
    docsText,
    /No zip\/pdf\/docx\/file generation or final output packaging is introduced in these export package slices/,
  );
  assert.match(
    docsText,
    /No delivery endpoints or final file packaging are introduced in this JSON artifact persistence slice/,
  );
});
