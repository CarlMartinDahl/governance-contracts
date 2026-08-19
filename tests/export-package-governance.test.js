const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const exportPackageSchema = require("../schemas/swe-bodelning-export-package.json");
const {
  deriveSWEBodelningExportPackage,
  deriveSWEBodelningExportPackageSnapshotStatus,
  deriveSWEBodelningExportPackageVersion,
  deriveSWEBodelningProfileDossierSnapshot,
  deriveSWEBodelningReleaseEvalBaseline,
  deriveSWEBodelningReleaseEvalEvaluatorVersion,
  resolveSWEBodelningExportPackageProjection,
} = require("../packages/governance/src/index.js");
const {
  validateSWEBodelningExportPackageProjection,
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

test("the governance helper derives a valid SWE_BODELNING export package", () => {
  const releaseEvalRun = createValidReleaseEvalRun();
  const exportPackage = deriveSWEBodelningExportPackage(releaseEvalRun, {
    generated_at: canonicalGeneratedAt,
  });

  assert.deepEqual(
    Object.keys(exportPackage).sort(),
    [...exportPackageSchema.required].sort(),
  );
  assert.equal(exportPackage.jurisdiction_profile_key, "SWE_BODELNING");
  assert.equal(
    exportPackage.export_version,
    deriveSWEBodelningExportPackageVersion(),
  );
  assert.equal(
    exportPackage.dossier_fingerprint,
    releaseEvalRun.profile_dossier_snapshot.dossier_fingerprint,
  );
  assert.deepEqual(
    exportPackage.canonical_source,
    releaseEvalRun.profile_dossier_snapshot.canonical_source,
  );
  assert.deepEqual(
    exportPackage.profile_dossier_snapshot,
    releaseEvalRun.profile_dossier_snapshot,
  );
  assert.equal(exportPackage.generated_at, canonicalGeneratedAt);
  assert.deepEqual(exportPackage.manifest, {
    included_top_level_artifacts: ["canonical_source", "profile_dossier_snapshot"],
  });
});

test("identical canonical inputs plus identical generated_at yield the same export package payload", () => {
  const first = deriveSWEBodelningExportPackage(createValidReleaseEvalRun(), {
    generated_at: canonicalGeneratedAt,
  });
  const second = deriveSWEBodelningExportPackage(createValidReleaseEvalRun(), {
    generated_at: canonicalGeneratedAt,
  });

  assert.deepEqual(first, second);
});

test("changed canonical inputs yield a different fingerprint-bearing export package output", () => {
  const first = deriveSWEBodelningExportPackage(createValidReleaseEvalRun(), {
    generated_at: canonicalGeneratedAt,
  });
  const second = deriveSWEBodelningExportPackage(
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
  );

  assert.notEqual(first.dossier_fingerprint, second.dossier_fingerprint);
  assert.notDeepEqual(
    first.profile_dossier_snapshot,
    second.profile_dossier_snapshot,
  );
  assert.deepEqual(first.manifest, second.manifest);
});

test("the governance helper uses the persisted canonical dossier snapshot as source of truth", () => {
  const releaseEvalRun = createValidReleaseEvalRun();
  const canonicalSnapshot = releaseEvalRun.profile_dossier_snapshot;

  releaseEvalRun.release_gate = "diverged-top-level";
  releaseEvalRun.release_gate_reason_code = "diverged-top-level-reason";
  releaseEvalRun.release_eval_freshness = "diverged-top-level-freshness";
  releaseEvalRun.release_eval_freshness_reason_code = "diverged-top-level-freshness-reason";
  releaseEvalRun.profile_input_summary = {
    ...releaseEvalRun.profile_input_summary,
    missing_value_lane_keys: [],
  };

  const exportPackage = deriveSWEBodelningExportPackage(releaseEvalRun, {
    generated_at: canonicalGeneratedAt,
  });

  assert.deepEqual(exportPackage.profile_dossier_snapshot, canonicalSnapshot);
  assert.equal(
    exportPackage.dossier_fingerprint,
    canonicalSnapshot.dossier_fingerprint,
  );
  assert.deepEqual(exportPackage.canonical_source, canonicalSnapshot.canonical_source);
});

test("current export package snapshot yields snapshot_status.source = persisted-current", () => {
  const releaseEvalRun = createValidReleaseEvalRun();
  const exportPackage = deriveSWEBodelningExportPackage(releaseEvalRun, {
    generated_at: canonicalGeneratedAt,
  });
  const projection = resolveSWEBodelningExportPackageProjection(
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
  assert.deepEqual(validateSWEBodelningExportPackageProjection(projection), projection);
});

test("stale export package snapshot yields snapshot_status.source = persisted-stale when dossier_fingerprint changes", () => {
  const releaseEvalRun = createValidReleaseEvalRun();
  const exportPackage = deriveSWEBodelningExportPackage(releaseEvalRun, {
    generated_at: canonicalGeneratedAt,
  });
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
    {
      persisted_at: canonicalPersistedAt,
    },
  );
  const projection = resolveSWEBodelningExportPackageProjection(
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
    exportPackage.dossier_fingerprint,
    changedProfileDossierSnapshot.dossier_fingerprint,
  );
});

test("stale export package snapshot reports found/current version values when export_version is older", () => {
  const releaseEvalRun = createValidReleaseEvalRun();
  const exportPackage = deriveSWEBodelningExportPackage(releaseEvalRun, {
    generated_at: canonicalGeneratedAt,
  });
  const projection = resolveSWEBodelningExportPackageProjection(
    {
      ...exportPackage,
      export_version: "swe-bodelning-export-package-v0",
    },
    releaseEvalRun.profile_dossier_snapshot,
  );

  assert.deepEqual(
    deriveSWEBodelningExportPackageSnapshotStatus(
      {
        ...exportPackage,
        export_version: "swe-bodelning-export-package-v0",
      },
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

test("non-SWE_BODELNING profiles remain unchanged", () => {
  assert.throws(
    () =>
      deriveSWEBodelningExportPackage(
        {
          ...createValidReleaseEvalRun(),
          jurisdiction_profile_key: "SWE_OTHER",
        },
        { generated_at: canonicalGeneratedAt },
      ),
    (error) => error.code === "ERR_UNSUPPORTED_JURISDICTION_PROFILE",
  );
});

test("no readiness behavior changes are introduced by the export package helper", () => {
  const releaseEvalRun = createValidReleaseEvalRun();
  const exportPackage = deriveSWEBodelningExportPackage(releaseEvalRun, {
    generated_at: canonicalGeneratedAt,
  });

  assert.equal(
    exportPackage.profile_dossier_snapshot.release_gate,
    releaseEvalRun.profile_dossier_snapshot.release_gate,
  );
  assert.equal(
    exportPackage.profile_dossier_snapshot.release_eval_freshness,
    releaseEvalRun.profile_dossier_snapshot.release_eval_freshness,
  );
  assert.match(
    docsText,
    /persisted canonical `profile_dossier_snapshot` plus explicit `generated_at`/,
  );
  assert.match(
    docsText,
    /No zip\/pdf\/docx\/file generation or final output packaging is introduced in these export package slices/,
  );
  assert.match(docsText, /persisted canonical export package snapshot unchanged plus a machine-readable top-level `snapshot_status` block/);
});
