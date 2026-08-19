const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const {
  getLatestCaseExportPackageJsonArtifactSnapshot,
  persistCaseExportPackageJsonArtifactSnapshot,
} = require("../packages/database/src/index.js");
const {
  deriveSWEBodelningExportPackage,
  deriveSWEBodelningExportPackageJsonArtifact,
  deriveSWEBodelningProfileDossierSnapshot,
  deriveSWEBodelningReleaseEvalBaseline,
  deriveSWEBodelningReleaseEvalEvaluatorVersion,
} = require("../packages/governance/src/index.js");

const docsPath = path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md");
const docsText = fs.readFileSync(docsPath, "utf8");
const databaseIndexPath = path.join(
  __dirname,
  "..",
  "packages",
  "database",
  "src",
  "index.js",
);
const databaseIndexText = fs.readFileSync(databaseIndexPath, "utf8");

const canonicalBaseline = deriveSWEBodelningReleaseEvalBaseline();
const canonicalEvaluatorVersion = deriveSWEBodelningReleaseEvalEvaluatorVersion();
const currentFreshnessReasonCode = "evaluator-version-current";
const canonicalPersistedAt = "2026-03-23T10:00:00.000Z";

function createStorageDir() {
  return fs.mkdtempSync(
    path.join(os.tmpdir(), "governance-contracts-export-package-json-artifact-"),
  );
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

function createValidJsonArtifact(options = {}) {
  const exportPackage = deriveSWEBodelningExportPackage(
    createValidReleaseEvalRun(options.releaseEvalOverrides),
    {
      generated_at: options.generated_at ?? "2026-03-23T12:00:00.000Z",
    },
  );

  return deriveSWEBodelningExportPackageJsonArtifact(exportPackage);
}

test("docs freeze the case-level persisted export_package_json_artifact seam as a distinct canonical persistence seam", () => {
  assert.match(
    docsText,
    /Case-Level Persisted Export Package JSON Artifact Snapshot Seam Freeze/i,
  );
  assert.match(
    docsText,
    /case-level persisted `export_package_json_artifact` seam is now frozen as the canonical persistence boundary for this exact stored surface/i,
  );
  assert.match(
    docsText,
    /only currently evidenced persistence surfaces in this freeze are `getLatestCaseExportPackageJsonArtifactSnapshot`, `persistCaseExportPackageJsonArtifactSnapshot`, and `refreshCaseExportPackageJsonArtifactSnapshot`/i,
  );
  assert.match(
    docsText,
    /persisted case-level canonical export_package_json_artifact latest-read behavior/i,
  );
  assert.match(
    docsText,
    /persisted latest-read via the existing `getLatestCaseExportPackageJsonArtifactSnapshot` boundary/i,
  );
  assert.match(
    docsText,
    /persisted write via the existing `persistCaseExportPackageJsonArtifactSnapshot` boundary/i,
  );
  assert.match(
    docsText,
    /persisted refresh via the existing `refreshCaseExportPackageJsonArtifactSnapshot` boundary/i,
  );
  assert.match(
    docsText,
    /existing canonical JSON export artifact validation on write and refresh-time derivation from the latest persisted canonical export_package snapshot already evidenced inside that persistence path/i,
  );
  assert.match(
    docsText,
    /separate from the thin authenticated `GET \/cases\/:caseId\/export-package\/json-artifact\/latest` latest-read seam, the thin authenticated `POST \/cases\/:caseId\/export-package\/json-artifact\/refresh` refresh seam, and the thin authenticated current-only `GET \/cases\/:caseId\/export-package\/json-artifact\/download` delivery seam/i,
  );
  assert.match(
    docsText,
    /does not itself define route-edge authentication or API error-envelope behavior/i,
  );
  assert.match(
    docsText,
    /does not itself define parent `export_package` persistence semantics, markdown\/pdf\/docx artifact persistence semantics, bundle\/package manifest persistence semantics, final bundle\/archive persistence semantics, or broader governance JSON derivation\/rebuild ownership beyond the exact stored `export_package_json_artifact` boundary already evidenced here/i,
  );
  assert.match(
    docsText,
    /no undocumented broadening of this persistence seam into route behavior, parent `export_package` persistence, sibling artifact persistence, manifest\/archive persistence, or broader derivation\/rebuild work should be introduced/i,
  );
  assert.match(
    docsText,
    /seam should remain a thin case-level persisted canonical `export_package_json_artifact` boundary unless explicit contract detail changes/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, persistence semantics, schema behavior, or fail-closed behavior/i,
  );

  assert.match(
    databaseIndexText,
    /async function getLatestCaseExportPackageJsonArtifactSnapshot\(/,
  );
  assert.match(
    databaseIndexText,
    /async function persistCaseExportPackageJsonArtifactSnapshot\(/,
  );
  assert.match(
    databaseIndexText,
    /async function refreshCaseExportPackageJsonArtifactSnapshot\(/,
  );
  assert.match(
    databaseIndexText,
    /return caseSnapshots\[caseSnapshots\.length - 1\]\.export_package_json_artifact_payload;/,
  );
  assert.match(
    databaseIndexText,
    /const canonicalExportPackageJsonArtifact =\s+validateExportPackageJsonArtifact\(exportPackageJsonArtifactSnapshot\);/s,
  );
  assert.match(
    databaseIndexText,
    /normalizeExportPackageJsonArtifactRecord\(\s+caseId,\s+canonicalExportPackageJsonArtifact,\s+persistedAt,\s+\)/s,
  );
  assert.match(
    databaseIndexText,
    /const exportPackageSnapshot = await getLatestCaseExportPackageSnapshot\(caseId, options\);/,
  );
  assert.match(
    databaseIndexText,
    /const canonicalExportPackageJsonArtifact = deriveExportPackageJsonArtifact\(\s+exportPackageSnapshot,\s+\);/s,
  );
  assert.match(
    databaseIndexText,
    /return persistCaseExportPackageJsonArtifactSnapshot\(\s+caseId,\s+canonicalExportPackageJsonArtifact,\s+options,\s+\);/s,
  );
  assert.match(databaseIndexText, /async function persistCaseExportPackageSnapshot\(/);
  assert.match(
    databaseIndexText,
    /async function persistCaseExportPackageMarkdownArtifactSnapshot\(/,
  );
  assert.match(
    databaseIndexText,
    /async function persistCaseExportPackagePdfArtifactSnapshot\(/,
  );
  assert.match(
    databaseIndexText,
    /async function persistCaseExportPackageDocxArtifactSnapshot\(/,
  );
  assert.match(
    databaseIndexText,
    /async function persistCaseExportPackageBundleManifestSnapshot\(/,
  );
  assert.match(
    databaseIndexText,
    /async function persistCaseExportPackageBundleArchiveArtifactSnapshot\(/,
  );
});

test("valid JSON export artifact payload roundtrips through persistence", async () => {
  const storageDir = createStorageDir();
  const payload = createValidJsonArtifact();

  const persisted = await persistCaseExportPackageJsonArtifactSnapshot(
    "case-1",
    payload,
    { storageDir },
  );
  const latest = await getLatestCaseExportPackageJsonArtifactSnapshot("case-1", {
    storageDir,
  });

  assert.deepEqual(persisted, payload);
  assert.deepEqual(latest, payload);
});

test("latest JSON export artifact retrieval works at case level", async () => {
  const storageDir = createStorageDir();
  const firstPayload = createValidJsonArtifact({
    generated_at: "2026-03-23T12:00:00.000Z",
  });
  const secondPayload = createValidJsonArtifact({
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

  await persistCaseExportPackageJsonArtifactSnapshot("case-1", firstPayload, {
    storageDir,
  });
  await persistCaseExportPackageJsonArtifactSnapshot("case-1", secondPayload, {
    storageDir,
  });
  await persistCaseExportPackageJsonArtifactSnapshot("case-2", firstPayload, {
    storageDir,
  });

  const latestCaseOne = await getLatestCaseExportPackageJsonArtifactSnapshot("case-1", {
    storageDir,
  });
  const latestCaseTwo = await getLatestCaseExportPackageJsonArtifactSnapshot("case-2", {
    storageDir,
  });

  assert.deepEqual(latestCaseOne, secondPayload);
  assert.deepEqual(latestCaseTwo, firstPayload);
});

test("invalid payload shape is rejected before persistence", async () => {
  const storageDir = createStorageDir();
  const invalidPayload = createValidJsonArtifact();
  invalidPayload.body_utf8 = "";

  await assert.rejects(
    persistCaseExportPackageJsonArtifactSnapshot("case-1", invalidPayload, {
      storageDir,
    }),
    (error) => {
      assert.equal(error.code, "ERR_EXPORT_PACKAGE_JSON_ARTIFACT_INVALID");
      assert.equal(error.details.field, "body_utf8");
      return true;
    },
  );

  const latest = await getLatestCaseExportPackageJsonArtifactSnapshot("case-1", {
    storageDir,
  });
  assert.equal(latest, null);
});

test("non-SWE_BODELNING behavior remains unchanged", async () => {
  const storageDir = createStorageDir();
  const invalidPayload = createValidJsonArtifact();
  const parsedArtifactBody = JSON.parse(invalidPayload.body_utf8);
  invalidPayload.body_utf8 = JSON.stringify({
    ...parsedArtifactBody,
    jurisdiction_profile_key: "SWE_OTHER",
  });

  await assert.rejects(
    persistCaseExportPackageJsonArtifactSnapshot("case-1", invalidPayload, {
      storageDir,
    }),
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
  assert.match(
    docsText,
    /minimal canonical JSON export artifact persistence foundation stores case-level latest JSON export artifact snapshots/,
  );
  assert.match(
    docsText,
    /No delivery endpoints or final file packaging are introduced in this JSON artifact persistence slice/,
  );
});
