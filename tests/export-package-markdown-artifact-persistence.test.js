const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const {
  getLatestCaseExportPackageMarkdownArtifactSnapshot,
  persistCaseExportPackageMarkdownArtifactSnapshot,
} = require("../packages/database/src/index.js");
const {
  deriveSWEBodelningExportPackage,
  deriveSWEBodelningExportPackageMarkdownArtifact,
  deriveSWEBodelningProfileDossierSnapshot,
  deriveSWEBodelningReleaseEvalBaseline,
  deriveSWEBodelningReleaseEvalEvaluatorVersion,
} = require("../packages/governance/src/index.js");

const docsPath = path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md");
const docsText = fs.readFileSync(docsPath, "utf8");
const databaseIndexPath = path.join(__dirname, "..", "packages", "database", "src", "index.js");
const databaseIndexText = fs.readFileSync(databaseIndexPath, "utf8");

const canonicalBaseline = deriveSWEBodelningReleaseEvalBaseline();
const canonicalEvaluatorVersion = deriveSWEBodelningReleaseEvalEvaluatorVersion();
const currentFreshnessReasonCode = "evaluator-version-current";
const canonicalPersistedAt = "2026-03-24T10:00:00.000Z";

function createStorageDir() {
  return fs.mkdtempSync(
    path.join(os.tmpdir(), "governance-contracts-export-package-markdown-artifact-"),
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

function createValidMarkdownArtifact(options = {}) {
  const exportPackage = deriveSWEBodelningExportPackage(
    createValidReleaseEvalRun(options.releaseEvalOverrides),
    {
      generated_at: options.generated_at ?? "2026-03-24T12:00:00.000Z",
    },
  );

  return deriveSWEBodelningExportPackageMarkdownArtifact(exportPackage);
}

test("docs freeze the case-level persisted export_package_markdown_artifact seam as a distinct canonical persistence seam", () => {
  assert.match(
    docsText,
    /Case-Level Persisted Export Package Markdown Artifact Snapshot Seam Freeze/i,
  );
  assert.match(
    docsText,
    /case-level persisted `export_package_markdown_artifact` seam is now frozen as the canonical persistence boundary for this exact stored surface/i,
  );
  assert.match(
    docsText,
    /only currently evidenced persistence surfaces in this freeze are `getLatestCaseExportPackageMarkdownArtifactSnapshot`, `persistCaseExportPackageMarkdownArtifactSnapshot`, and `refreshCaseExportPackageMarkdownArtifactSnapshot`/i,
  );
  assert.match(
    docsText,
    /persisted case-level canonical export_package_markdown_artifact latest-read behavior/i,
  );
  assert.match(
    docsText,
    /persisted latest-read via the existing `getLatestCaseExportPackageMarkdownArtifactSnapshot` boundary/i,
  );
  assert.match(
    docsText,
    /persisted write via the existing `persistCaseExportPackageMarkdownArtifactSnapshot` boundary/i,
  );
  assert.match(
    docsText,
    /persisted refresh via the existing `refreshCaseExportPackageMarkdownArtifactSnapshot` boundary/i,
  );
  assert.match(
    docsText,
    /existing canonical Markdown export artifact validation on write and refresh-time derivation from the latest persisted canonical export_package snapshot already evidenced inside that persistence path/i,
  );
  assert.match(
    docsText,
    /separate from the thin authenticated `GET \/cases\/:caseId\/export-package\/markdown-artifact\/latest` latest-read seam, the thin authenticated `POST \/cases\/:caseId\/export-package\/markdown-artifact\/refresh` refresh seam, and the thin authenticated current-only `GET \/cases\/:caseId\/export-package\/markdown-artifact\/download` delivery seam/i,
  );
  assert.match(
    docsText,
    /does not itself define route-edge authentication or API error-envelope behavior/i,
  );
  assert.match(
    docsText,
    /does not itself define parent `export_package` persistence semantics, json\/pdf\/docx sibling artifact persistence semantics, bundle\/package manifest persistence semantics, final bundle\/archive persistence semantics, or broader governance Markdown export-artifact derivation\/rebuild ownership beyond the exact stored `export_package_markdown_artifact` boundary already evidenced here/i,
  );
  assert.match(
    docsText,
    /no undocumented broadening of this persistence seam into route behavior, parent `export_package` persistence, sibling artifact persistence, manifest\/archive persistence, or broader derivation\/rebuild work should be introduced/i,
  );
  assert.match(
    docsText,
    /seam should remain a thin case-level persisted canonical `export_package_markdown_artifact` boundary unless explicit contract detail changes/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, persistence semantics, schema behavior, or fail-closed behavior/i,
  );

  assert.match(
    databaseIndexText,
    /async function getLatestCaseExportPackageMarkdownArtifactSnapshot\(/,
  );
  assert.match(
    databaseIndexText,
    /async function persistCaseExportPackageMarkdownArtifactSnapshot\(/,
  );
  assert.match(
    databaseIndexText,
    /async function refreshCaseExportPackageMarkdownArtifactSnapshot\(/,
  );
  assert.match(
    databaseIndexText,
    /return caseSnapshots\[caseSnapshots\.length - 1\]\.export_package_markdown_artifact_payload;/,
  );
  assert.match(
    databaseIndexText,
    /const canonicalExportPackageMarkdownArtifact =\s+validateExportPackageMarkdownArtifact\(\s+exportPackageMarkdownArtifactSnapshot,\s+\);/s,
  );
  assert.match(
    databaseIndexText,
    /normalizeExportPackageMarkdownArtifactRecord\(\s+caseId,\s+canonicalExportPackageMarkdownArtifact,\s+persistedAt,\s+\)/s,
  );
  assert.match(
    databaseIndexText,
    /const exportPackageSnapshot = await getLatestCaseExportPackageSnapshot\(caseId, options\);/,
  );
  assert.match(
    databaseIndexText,
    /const canonicalExportPackageMarkdownArtifact =\s+deriveExportPackageMarkdownArtifact\(exportPackageSnapshot\);/s,
  );
  assert.match(
    databaseIndexText,
    /return persistCaseExportPackageMarkdownArtifactSnapshot\(\s+caseId,\s+canonicalExportPackageMarkdownArtifact,\s+options,\s+\);/s,
  );
  assert.match(databaseIndexText, /async function persistCaseExportPackageSnapshot\(/);
  assert.match(
    databaseIndexText,
    /async function persistCaseExportPackageJsonArtifactSnapshot\(/,
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

test("valid Markdown export artifact payload roundtrips through persistence", async () => {
  const storageDir = createStorageDir();
  const payload = createValidMarkdownArtifact();

  const persisted = await persistCaseExportPackageMarkdownArtifactSnapshot(
    "case-1",
    payload,
    { storageDir },
  );
  const latest = await getLatestCaseExportPackageMarkdownArtifactSnapshot("case-1", {
    storageDir,
  });

  assert.deepEqual(persisted, payload);
  assert.deepEqual(latest, payload);
});

test("latest Markdown export artifact retrieval works at case level", async () => {
  const storageDir = createStorageDir();
  const firstPayload = createValidMarkdownArtifact({
    generated_at: "2026-03-24T12:00:00.000Z",
  });
  const secondPayload = createValidMarkdownArtifact({
    generated_at: "2026-03-24T13:00:00.000Z",
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

  await persistCaseExportPackageMarkdownArtifactSnapshot("case-1", firstPayload, {
    storageDir,
  });
  await persistCaseExportPackageMarkdownArtifactSnapshot("case-1", secondPayload, {
    storageDir,
  });
  await persistCaseExportPackageMarkdownArtifactSnapshot("case-2", firstPayload, {
    storageDir,
  });

  const latestCaseOne = await getLatestCaseExportPackageMarkdownArtifactSnapshot("case-1", {
    storageDir,
  });
  const latestCaseTwo = await getLatestCaseExportPackageMarkdownArtifactSnapshot("case-2", {
    storageDir,
  });

  assert.deepEqual(latestCaseOne, secondPayload);
  assert.deepEqual(latestCaseTwo, firstPayload);
});

test("invalid payload shape is rejected before persistence", async () => {
  const storageDir = createStorageDir();
  const invalidPayload = createValidMarkdownArtifact();
  invalidPayload.body_utf8 = "";

  await assert.rejects(
    persistCaseExportPackageMarkdownArtifactSnapshot("case-1", invalidPayload, {
      storageDir,
    }),
    (error) => {
      assert.equal(error.code, "ERR_EXPORT_PACKAGE_MARKDOWN_ARTIFACT_INVALID");
      assert.equal(error.details.field, "body_utf8");
      return true;
    },
  );

  const latest = await getLatestCaseExportPackageMarkdownArtifactSnapshot("case-1", {
    storageDir,
  });
  assert.equal(latest, null);
});

test("non-SWE_BODELNING behavior remains unchanged", async () => {
  const storageDir = createStorageDir();
  const invalidPayload = createValidMarkdownArtifact();
  invalidPayload.body_utf8 = invalidPayload.body_utf8.replace(
    "`SWE_BODELNING`",
    "`SWE_OTHER`",
  );

  await assert.rejects(
    persistCaseExportPackageMarkdownArtifactSnapshot("case-1", invalidPayload, {
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
    /minimal canonical Markdown export artifact persistence foundation stores case-level latest Markdown export artifact snapshots/,
  );
  assert.match(
    docsText,
    /without adding delivery endpoints or file packaging/,
  );
});
