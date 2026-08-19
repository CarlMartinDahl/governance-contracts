const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const {
  getLatestCaseExportPackageSnapshot,
  persistCaseExportPackageSnapshot,
} = require("../packages/database/src/index.js");
const {
  deriveSWEBodelningExportPackage,
  deriveSWEBodelningProfileDossierSnapshot,
  deriveSWEBodelningReleaseEvalBaseline,
  deriveSWEBodelningReleaseEvalEvaluatorVersion,
} = require("../packages/governance/src/index.js");

const canonicalBaseline = deriveSWEBodelningReleaseEvalBaseline();
const canonicalEvaluatorVersion = deriveSWEBodelningReleaseEvalEvaluatorVersion();
const currentFreshnessReasonCode = "evaluator-version-current";
const canonicalPersistedAt = "2026-03-23T10:00:00.000Z";

function createStorageDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "governance-contracts-export-package-"));
}

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

function createValidExportPackage(options = {}) {
  const releaseEvalRun = createValidReleaseEvalRun(options.releaseEvalOverrides);

  return deriveSWEBodelningExportPackage(releaseEvalRun, {
    generated_at: options.generated_at ?? "2026-03-23T12:00:00.000Z",
  });
}

test("valid export package payload roundtrips through persistence", async () => {
  const storageDir = createStorageDir();
  const payload = createValidExportPackage();

  const persisted = await persistCaseExportPackageSnapshot("case-1", payload, {
    storageDir,
  });
  const latest = await getLatestCaseExportPackageSnapshot("case-1", { storageDir });

  assert.deepEqual(persisted, payload);
  assert.deepEqual(latest, payload);
});

test("latest export package retrieval works at case level", async () => {
  const storageDir = createStorageDir();
  const firstPayload = createValidExportPackage({
    generated_at: "2026-03-23T12:00:00.000Z",
  });
  const secondPayload = createValidExportPackage({
    generated_at: "2026-03-23T13:00:00.000Z",
    releaseEvalOverrides: {
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
    },
  });

  await persistCaseExportPackageSnapshot("case-1", firstPayload, { storageDir });
  await persistCaseExportPackageSnapshot("case-1", secondPayload, { storageDir });
  await persistCaseExportPackageSnapshot("case-2", firstPayload, { storageDir });

  const latestCaseOne = await getLatestCaseExportPackageSnapshot("case-1", {
    storageDir,
  });
  const latestCaseTwo = await getLatestCaseExportPackageSnapshot("case-2", {
    storageDir,
  });

  assert.deepEqual(latestCaseOne, secondPayload);
  assert.deepEqual(latestCaseTwo, firstPayload);
});

test("invalid payload shape is rejected before persistence", async () => {
  const storageDir = createStorageDir();
  const invalidPayload = createValidExportPackage();
  invalidPayload.generated_at = "";

  await assert.rejects(
    persistCaseExportPackageSnapshot("case-1", invalidPayload, { storageDir }),
    (error) => {
      assert.equal(error.code, "ERR_EXPORT_PACKAGE_INVALID");
      assert.equal(error.details.field, "generated_at");
      return true;
    },
  );

  const latest = await getLatestCaseExportPackageSnapshot("case-1", { storageDir });
  assert.equal(latest, null);
});

test("non-SWE_BODELNING behavior remains unchanged", async () => {
  const storageDir = createStorageDir();
  const invalidPayload = createValidExportPackage();
  invalidPayload.jurisdiction_profile_key = "SWE_OTHER";

  await assert.rejects(
    persistCaseExportPackageSnapshot("case-1", invalidPayload, { storageDir }),
    (error) => {
      assert.equal(error.code, "ERR_UNSUPPORTED_JURISDICTION_PROFILE");
      assert.equal(error.details.jurisdiction_profile_key, "SWE_OTHER");
      return true;
    },
  );
});

test("no readiness behavior changes are introduced", () => {
  const workerEntries = fs.readdirSync(path.join(__dirname, "..", "workers", "analyze"));
  assert.deepEqual(workerEntries, [".gitkeep"]);
});
