const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const schema = require("../schemas/swe-bodelning-export-package-json-artifact-projection.json");
const {
  deriveSWEBodelningExportPackage,
  deriveSWEBodelningExportPackageFromJsonArtifact,
  deriveSWEBodelningExportPackageJsonArtifact,
  deriveSWEBodelningExportPackageJsonArtifactSnapshotStatus,
  deriveSWEBodelningExportPackageVersion,
  deriveSWEBodelningProfileDossierSnapshot,
  deriveSWEBodelningReleaseEvalBaseline,
  deriveSWEBodelningReleaseEvalEvaluatorVersion,
  resolveSWEBodelningExportPackageJsonArtifactProjection,
} = require("../packages/governance/src/index.js");
const {
  sweBodelningExportPackageJsonArtifactProjection,
  validateSWEBodelningExportPackageJsonArtifactProjection,
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

test("the JSON export artifact projection schema includes the read-time snapshot_status surface", () => {
  assert.deepEqual(schema.required, [
    "artifact_type",
    "filename",
    "content_type",
    "encoding",
    "body_utf8",
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

test("packages/schemas exports the SWE_BODELNING JSON export artifact projection schema", () => {
  assert.deepEqual(sweBodelningExportPackageJsonArtifactProjection, schema);
});

test("current JSON artifact snapshot yields snapshot_status.source = persisted-current", () => {
  const releaseEvalRun = createValidReleaseEvalRun();
  const exportPackage = deriveSWEBodelningExportPackage(releaseEvalRun, {
    generated_at: canonicalGeneratedAt,
  });
  const jsonArtifact = deriveSWEBodelningExportPackageJsonArtifact(exportPackage);
  const projection = resolveSWEBodelningExportPackageJsonArtifactProjection(
    jsonArtifact,
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
  assert.deepEqual(validateSWEBodelningExportPackageJsonArtifactProjection(projection), projection);
});

test("stale JSON artifact snapshot yields snapshot_status.source = persisted-stale when dossier_fingerprint changes", () => {
  const releaseEvalRun = createValidReleaseEvalRun();
  const exportPackage = deriveSWEBodelningExportPackage(releaseEvalRun, {
    generated_at: canonicalGeneratedAt,
  });
  const jsonArtifact = deriveSWEBodelningExportPackageJsonArtifact(exportPackage);
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
  const projection = resolveSWEBodelningExportPackageJsonArtifactProjection(
    jsonArtifact,
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
    deriveSWEBodelningExportPackageFromJsonArtifact(jsonArtifact).dossier_fingerprint,
    changedProfileDossierSnapshot.dossier_fingerprint,
  );
});

test("snapshot_status correctly reports found/current export version values when export_version is older", () => {
  const releaseEvalRun = createValidReleaseEvalRun();
  const exportPackage = deriveSWEBodelningExportPackage(releaseEvalRun, {
    generated_at: canonicalGeneratedAt,
  });
  const olderJsonArtifact = deriveSWEBodelningExportPackageJsonArtifact({
    ...exportPackage,
    export_version: "swe-bodelning-export-package-v0",
  });
  const projection = resolveSWEBodelningExportPackageJsonArtifactProjection(
    olderJsonArtifact,
    exportPackage,
    releaseEvalRun.profile_dossier_snapshot,
  );

  assert.deepEqual(
    deriveSWEBodelningExportPackageJsonArtifactSnapshotStatus(
      olderJsonArtifact,
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

test("docs minimally describe the JSON export artifact projection surface", () => {
  assert.match(
    docsText,
    /schemas\/swe-bodelning-export-package-json-artifact-projection\.json/,
  );
  assert.match(docsText, /JSON export artifact read route/);
  assert.match(docsText, /machine-readable `snapshot_status` block/);
});

test("non-SWE_BODELNING profiles remain unchanged", () => {
  const releaseEvalRun = createValidReleaseEvalRun();
  const exportPackage = deriveSWEBodelningExportPackage(releaseEvalRun, {
    generated_at: canonicalGeneratedAt,
  });

  assert.throws(
    () =>
      resolveSWEBodelningExportPackageJsonArtifactProjection(
        {
          ...deriveSWEBodelningExportPackageJsonArtifact(exportPackage),
          body_utf8: JSON.stringify({
            ...exportPackage,
            jurisdiction_profile_key: "SWE_OTHER",
          }),
          filename: `${exportPackage.export_version}-${exportPackage.dossier_fingerprint}.json`,
        },
        exportPackage,
        releaseEvalRun.profile_dossier_snapshot,
      ),
    (error) =>
      error.code === "ERR_UNSUPPORTED_JURISDICTION_PROFILE" ||
      error.code === "ERR_EXPORT_PACKAGE_JSON_ARTIFACT_INVALID",
  );
});

test("no readiness behavior changes are introduced", () => {
  assert.match(
    docsText,
    /without route-local JSON artifact recomputation or silent refresh/,
  );
  assert.match(
    docsText,
    /No zip\/pdf\/docx\/file generation or final output packaging is introduced in these export package slices/,
  );
});
