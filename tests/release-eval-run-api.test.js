const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const { handleCaseReleaseEvalLatestRoute } = require("../apps/api/src/index.js");
const {
  persistCaseReleaseEvalRun,
  refreshCaseReleaseEvalRun,
  upsertCaseProfileInputs,
} = require("../packages/database/src/index.js");
const {
  validateCMDProfileDossierSnapshot,
} = require("../packages/schemas/src/index.js");
const {
  deriveCMDReleaseEvalBaseline,
  deriveCMDReleaseEvalEvaluatorVersion,
  deriveSWEBodelningProfileDossierSnapshot,
  deriveSWEBodelningReleaseEvalBaseline,
  deriveSWEBodelningReleaseEvalEvaluatorVersion,
} = require("../packages/governance/src/index.js");

const cmdCanonicalBaseline = deriveCMDReleaseEvalBaseline();
const cmdCanonicalEvaluatorVersion = deriveCMDReleaseEvalEvaluatorVersion();
const canonicalBaseline = deriveSWEBodelningReleaseEvalBaseline();
const canonicalEvaluatorVersion = deriveSWEBodelningReleaseEvalEvaluatorVersion();
const currentFreshnessReasonCode = "evaluator-version-current";
const staleFreshnessReasonCode = "evaluator-version-mismatch";
const profileInputContextMismatchReasonCode = "profile-input-context-mismatch";
const cmdRuntimeNotImplementedReasonCode = "cmd-runtime-not-implemented";
const incompleteReasonCode = "swe-bodelning-input-incomplete";
const supportIncompleteReasonCode = "swe-bodelning-support-incomplete";
const docsPath = path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md");
const docsText = fs.readFileSync(docsPath, "utf8");
const apiIndexPath = path.join(__dirname, "..", "apps", "api", "src", "index.js");
const apiIndexText = fs.readFileSync(apiIndexPath, "utf8");

function createStorageDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "governance-contracts-release-eval-api-"));
}

function rewriteStoredProfileInputRecord(storageDir, caseId, transformRecord) {
  const storePath = path.join(storageDir, "case-profile-inputs.json");
  const store = JSON.parse(fs.readFileSync(storePath, "utf8"));
  store[caseId] = transformRecord(store[caseId]);
  fs.writeFileSync(storePath, JSON.stringify(store, null, 2));
}

function createCaseContextLoader(caseContexts) {
  return async function loadCaseContext(caseId) {
    return caseContexts[caseId] ?? null;
  };
}

function createProfileInputs() {
  return {
    jurisdiction_profile_key: "SWE_BODELNING",
    profile_input_summary: {
      required_lane_count: 3,
      lanes_with_value_count: 2,
      missing_value_lane_keys: ["shared_intent"],
    },
    profile_input_lane_snapshot: {
      economic_contribution: {
        has_value: true,
        value: "documented",
        evidence_object_ids: ["evidence-1"],
      },
      shared_use: {
        has_value: true,
        value: "residence",
        evidence_object_ids: ["evidence-2"],
      },
      shared_intent: {
        has_value: false,
        value: null,
        evidence_object_ids: [],
      },
    },
  };
}

function createValueCompleteButSupportIncompleteProfileInputs() {
  return {
    jurisdiction_profile_key: "SWE_BODELNING",
    profile_input_summary: {
      required_lane_count: 3,
      lanes_with_value_count: 3,
      missing_value_lane_keys: [],
    },
    profile_input_lane_snapshot: {
      economic_contribution: {
        has_value: true,
        value: "documented",
        evidence_object_ids: ["evidence-1"],
      },
      shared_use: {
        has_value: true,
        value: "residence",
        evidence_object_ids: [],
      },
      shared_intent: {
        has_value: true,
        value: "co-acquisition",
        evidence_object_ids: ["evidence-3"],
      },
    },
  };
}

function createReleaseEvalSeed(overrides = {}) {
  return {
    jurisdiction_profile_key: "SWE_BODELNING",
    release_eval_run_id: "release-eval-run-1",
    evaluator_version: "SHOULD_NOT_BE_PASSED_THROUGH",
    release_gate: "SHOULD_NOT_BE_PASSED_THROUGH",
    release_eval_freshness: "SHOULD_NOT_BE_PASSED_THROUGH",
    ...overrides,
  };
}

function createCMDProfileInputs() {
  return {
    jurisdiction_profile_key: "CMD_PROFILE",
    profile_input_summary: {
      required_lane_count: 1,
      lanes_with_value_count: 1,
      missing_value_lane_keys: [],
    },
    profile_input_lane_snapshot: {
      "cmd_primary_signal": {
        has_value: true,
        value: "documented",
        evidence_object_ids: ["cmd-evidence-1"],
      },
    },
  };
}

function createCMDReleaseEvalSeed(overrides = {}) {
  return {
    jurisdiction_profile_key: "CMD_PROFILE",
    release_eval_run_id: "cmd-release-eval-run-1",
    evaluator_version: "IGNORED_BY_GOVERNANCE",
    release_gate: "IGNORED_BY_GOVERNANCE",
    release_eval_freshness: "IGNORED_BY_GOVERNANCE",
    ...overrides,
  };
}

function createPersistedReleaseEvalRun(overrides = {}) {
  const releaseEvalRun = {
    jurisdiction_profile_key: "SWE_BODELNING",
    release_eval_run_id: "release-eval-run-1",
    evaluator_version: canonicalEvaluatorVersion,
    release_gate: canonicalBaseline.release_gate,
    release_gate_reason_code: supportIncompleteReasonCode,
    release_eval_freshness: canonicalBaseline.release_eval_freshness,
    release_eval_freshness_reason_code: currentFreshnessReasonCode,
    profile_input_summary: {
      required_lane_count: 3,
      lanes_with_value_count: 3,
      missing_value_lane_keys: [],
      lanes_with_support_count: 2,
      missing_support_lane_keys: ["shared_use"],
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
        evidence_object_ids: [],
        has_support: false,
      },
      shared_intent: {
        has_value: true,
        value: "co-acquisition",
        evidence_object_ids: ["evidence-3"],
        has_support: true,
      },
    },
    ...overrides,
  };

  return {
    ...releaseEvalRun,
    profile_dossier_snapshot: deriveSWEBodelningProfileDossierSnapshot(
      releaseEvalRun,
      {
        persisted_at: "2026-03-23T10:00:00.000Z",
      },
    ),
  };
}

test("docs freeze the thin authenticated release_eval latest-read seam as a distinct canonical runtime/read seam", () => {
  assert.match(
    docsText,
    /Thin Authenticated Release Eval Latest-Read Seam Freeze/i,
  );
  assert.match(
    docsText,
    /thin authenticated `release_eval` latest-read seam is now frozen as the baseline runtime\/read seam/i,
  );
  assert.match(
    docsText,
    /only currently evidenced latest-read surface in this freeze is `GET \/cases\/:caseId\/release-eval\/latest`/i,
  );
  assert.match(
    docsText,
    /authenticated\/case-access-controlled boundary behavior at the thin route edge/i,
  );
  assert.match(
    docsText,
    /read-only latest persisted-run passthrough only when the persisted canonical release_eval run `jurisdiction_profile_key` matches the authorized case-context `jurisdiction_profile_key`/i,
  );
  assert.match(
    docsText,
    /fail-closed route-edge invariant that the persisted latest release_eval run `jurisdiction_profile_key` must equal the authorized case-context `jurisdiction_profile_key` before return/i,
  );
  assert.match(
    docsText,
    /same-tenant supported-profile drift in persisted latest release_eval data rejects machine-readably with HTTP `409` `ERR_RELEASE_EVAL_JURISDICTION_PROFILE_MISMATCH` instead of returning the mismatched run/i,
  );
  assert.match(
    docsText,
    /fail-closed no-persisted-run responses from this exact latest-read route with HTTP 404 ERR_RELEASE_EVAL_RUN_NOT_FOUND plus route-level case_id detail/i,
  );
  assert.match(
    docsText,
    /attached canonical profile_dossier_snapshot passthrough only where already present in the persisted canonical release_eval run contract/i,
  );
  assert.match(
    docsText,
    /currently evidenced `ERR_RELEASE_EVAL_RUN_NOT_FOUND` route branch for this thin latest-read seam remains distinct from the broader blocked shared `resource\/snapshot not found` API envelope family question/i,
  );
  assert.match(
    docsText,
    /shared `snapshot_status` seam remains a separate frozen shared currentness boundary and is not introduced or redefined by this latest-read seam/i,
  );
  assert.match(
    docsText,
    /shared API error-envelope seam and its frozen subfamilies remain the governing boundary for machine-readable latest-read error envelopes/i,
  );
  assert.match(
    docsText,
    /adjacent `profile_dossier` read\/projection seam remains a distinct route boundary and is not redefined by this latest-read seam/i,
  );
  assert.match(
    docsText,
    /does not itself redefine refresh, delivery-byte passthrough, release-eval derivation \/ reconciliation, or profile-dossier projection behavior/i,
  );
  assert.match(
    docsText,
    /no undocumented broadening of this latest-read seam into refresh, delivery, derivation, reconciliation, profile-dossier projection, snapshot_status currentness, or neutral-model alignment should be introduced/i,
  );
  assert.match(
    docsText,
    /the seam should remain a thin authenticated read-only latest-run boundary unless explicit contract detail changes/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, latest-read semantics, schema behavior, or fail-closed behavior/i,
  );

  assert.match(
    apiIndexText,
    /async function handleCaseReleaseEvalLatestRoute\(/,
  );
  assert.match(
    apiIndexText,
    /loadAuthorizedCaseContext\(\s+routeMatch\.caseId,\s+request\.auth,\s+options\.loadCaseContext,\s+"release_eval"/,
  );
  assert.match(apiIndexText, /if \(request\.method !== "GET"\)/);
  assert.match(
    apiIndexText,
    /await getLatestCaseReleaseEvalRun\(routeMatch\.caseId,\s+options\)/,
  );
  assert.match(
    apiIndexText,
    /if \(!releaseEvalRun\) {\s+return errorResponse\(404, "ERR_RELEASE_EVAL_RUN_NOT_FOUND", {\s+case_id: routeMatch\.caseId,\s+}\);\s+}/,
  );
  assert.match(
    apiIndexText,
    /releaseEvalRun\.jurisdiction_profile_key !==\s+authorization\.caseContext\.jurisdiction_profile_key/,
  );
  assert.match(
    apiIndexText,
    /ERR_RELEASE_EVAL_JURISDICTION_PROFILE_MISMATCH/,
  );
  assert.match(
    apiIndexText,
    /return jsonResponse\(200, releaseEvalRun\)/,
  );
});

test("successful GET for a tenant-owned SWE_BODELNING case with persisted latest release eval", async () => {
  const storageDir = createStorageDir();
  const loadCaseContext = createCaseContextLoader({
    "case-1": {
      tenant_id: "tenant-1",
      jurisdiction_profile_key: "SWE_BODELNING",
    },
  });

  await upsertCaseProfileInputs("case-1", createProfileInputs(), { storageDir });
  const persisted = await refreshCaseReleaseEvalRun(
    "case-1",
    createReleaseEvalSeed(),
    { storageDir },
  );

  const response = await handleCaseReleaseEvalLatestRoute(
    {
      method: "GET",
      path: "/cases/case-1/release-eval/latest",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );

  assert.equal(response.status, 200);
  assert.deepEqual(response.body, persisted);
  assert.deepEqual(
    response.body.profile_dossier_snapshot,
    persisted.profile_dossier_snapshot,
  );
});

test("successful GET for a tenant-owned CMD_PROFILE case returns the persisted release_eval unchanged", async () => {
  const storageDir = createStorageDir();
  const loadCaseContext = createCaseContextLoader({
    "case-cmd": {
      tenant_id: "tenant-1",
      jurisdiction_profile_key: "CMD_PROFILE",
    },
  });

  await upsertCaseProfileInputs("case-cmd", createCMDProfileInputs(), { storageDir });
  const persisted = await refreshCaseReleaseEvalRun(
    "case-cmd",
    createCMDReleaseEvalSeed(),
    { storageDir },
  );

  const response = await handleCaseReleaseEvalLatestRoute(
    {
      method: "GET",
      path: "/cases/case-cmd/release-eval/latest",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );

  assert.equal(response.status, 200);
  assert.deepEqual(response.body, persisted);
  assert.equal(response.body.evaluator_version, cmdCanonicalEvaluatorVersion);
  assert.equal(response.body.release_gate, cmdCanonicalBaseline.release_gate);
  assert.equal(
    response.body.release_gate_reason_code,
    cmdRuntimeNotImplementedReasonCode,
  );
  assert.equal(
    response.body.release_eval_freshness,
    cmdCanonicalBaseline.release_eval_freshness,
  );
  assert.equal(
    response.body.release_eval_freshness_reason_code,
    currentFreshnessReasonCode,
  );
  assert.deepEqual(
    validateCMDProfileDossierSnapshot(response.body.profile_dossier_snapshot),
    response.body.profile_dossier_snapshot,
  );
  assert.deepEqual(
    response.body.profile_dossier_snapshot,
    persisted.profile_dossier_snapshot,
  );
});

test("tenant/case isolation rejection remains enforced for latest release eval route", async () => {
  const response = await handleCaseReleaseEvalLatestRoute(
    {
      method: "GET",
      path: "/cases/case-2/release-eval/latest",
      auth: { tenantId: "tenant-1" },
    },
    {
      loadCaseContext: createCaseContextLoader({
        "case-2": {
          tenant_id: "tenant-2",
          jurisdiction_profile_key: "SWE_BODELNING",
        },
      }),
      storageDir: createStorageDir(),
    },
  );

  assert.equal(response.status, 403);
  assert.equal(response.body.error.code, "ERR_CASE_ACCESS_DENIED");
});

test("non-SWE_BODELNING behavior remains unchanged for latest release eval route", async () => {
  const response = await handleCaseReleaseEvalLatestRoute(
    {
      method: "GET",
      path: "/cases/case-3/release-eval/latest",
      auth: { tenantId: "tenant-1" },
    },
    {
      loadCaseContext: createCaseContextLoader({
        "case-3": {
          tenant_id: "tenant-1",
          jurisdiction_profile_key: "SWE_OTHER",
        },
      }),
      storageDir: createStorageDir(),
    },
  );

  assert.equal(response.status, 409);
  assert.equal(response.body.error.code, "ERR_UNSUPPORTED_JURISDICTION_PROFILE");
});

test("no-persisted-run fail-closed response remains explicit for the latest release eval route", async () => {
  const response = await handleCaseReleaseEvalLatestRoute(
    {
      method: "GET",
      path: "/cases/case-missing/release-eval/latest",
      auth: { tenantId: "tenant-1" },
    },
    {
      loadCaseContext: createCaseContextLoader({
        "case-missing": {
          tenant_id: "tenant-1",
          jurisdiction_profile_key: "SWE_BODELNING",
        },
      }),
      storageDir: createStorageDir(),
    },
  );

  assert.equal(response.status, 404);
  assert.deepEqual(response.body, {
    error: {
      case_id: "case-missing",
      code: "ERR_RELEASE_EVAL_RUN_NOT_FOUND",
    },
  });
});

test("same-tenant persisted release eval profile drift is rejected instead of returning the mismatched latest run", async () => {
  const storageDir = createStorageDir();
  const loadCaseContext = createCaseContextLoader({
    "case-profile-drift": {
      tenant_id: "tenant-1",
      jurisdiction_profile_key: "SWE_BODELNING",
    },
  });

  await upsertCaseProfileInputs(
    "case-profile-drift",
    createCMDProfileInputs(),
    { storageDir },
  );
  await refreshCaseReleaseEvalRun(
    "case-profile-drift",
    createCMDReleaseEvalSeed(),
    { storageDir },
  );

  const response = await handleCaseReleaseEvalLatestRoute(
    {
      method: "GET",
      path: "/cases/case-profile-drift/release-eval/latest",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );

  assert.equal(response.status, 409);
  assert.deepEqual(response.body, {
    error: {
      case_id: "case-profile-drift",
      code: "ERR_RELEASE_EVAL_JURISDICTION_PROFILE_MISMATCH",
      jurisdiction_profile_key: "CMD_PROFILE",
      expected_jurisdiction_profile_key: "SWE_BODELNING",
    },
  });
});

test("latest release eval route returns persisted support metadata unchanged", async () => {
  const storageDir = createStorageDir();
  const loadCaseContext = createCaseContextLoader({
    "case-4": {
      tenant_id: "tenant-1",
      jurisdiction_profile_key: "SWE_BODELNING",
    },
  });

  await upsertCaseProfileInputs(
    "case-4",
    createValueCompleteButSupportIncompleteProfileInputs(),
    { storageDir },
  );
  await refreshCaseReleaseEvalRun("case-4", createReleaseEvalSeed(), { storageDir });
  const persisted = await persistCaseReleaseEvalRun(
    "case-4",
    createPersistedReleaseEvalRun({
      release_eval_run_id: "release-eval-run-2",
      evaluator_version: "swe-bodelning-release-eval-v0",
    }),
    { storageDir },
  );

  const response = await handleCaseReleaseEvalLatestRoute(
    {
      method: "GET",
      path: "/cases/case-4/release-eval/latest",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );

  assert.equal(response.status, 200);
  assert.deepEqual(response.body, persisted);
  assert.equal(response.body.evaluator_version, "swe-bodelning-release-eval-v0");
  assert.equal(response.body.release_gate, "blocked");
  assert.equal(response.body.release_gate_reason_code, supportIncompleteReasonCode);
  assert.equal(response.body.release_eval_freshness, "stale");
  assert.equal(
    response.body.release_eval_freshness_reason_code,
    staleFreshnessReasonCode,
  );
  assert.deepEqual(response.body.profile_input_summary.missing_value_lane_keys, []);
  assert.equal(response.body.profile_input_summary.lanes_with_support_count, 2);
  assert.deepEqual(response.body.profile_input_summary.missing_support_lane_keys, [
    "shared_use",
  ]);
  assert.equal(response.body.profile_input_lane_snapshot.economic_contribution.has_support, true);
  assert.equal(response.body.profile_input_lane_snapshot.shared_use.has_support, false);
  assert.deepEqual(
    response.body.profile_dossier_snapshot,
    persisted.profile_dossier_snapshot,
  );
});

test("latest release eval route returns profile-input freshness changes unchanged", async () => {
  const storageDir = createStorageDir();
  const loadCaseContext = createCaseContextLoader({
    "case-5": {
      tenant_id: "tenant-1",
      jurisdiction_profile_key: "SWE_BODELNING",
    },
  });

  await upsertCaseProfileInputs(
    "case-5",
    createValueCompleteButSupportIncompleteProfileInputs(),
    { storageDir },
  );
  const persisted = await refreshCaseReleaseEvalRun(
    "case-5",
    createReleaseEvalSeed(),
    { storageDir },
  );

  await upsertCaseProfileInputs(
    "case-5",
    {
      jurisdiction_profile_key: "SWE_BODELNING",
      profile_input_summary: {
        required_lane_count: 3,
        lanes_with_value_count: 3,
        missing_value_lane_keys: [],
      },
      profile_input_lane_snapshot: {
        economic_contribution: {
          has_value: true,
          value: "documented",
          evidence_object_ids: ["evidence-1"],
        },
        shared_use: {
          has_value: true,
          value: "separate-residence",
          evidence_object_ids: [],
        },
        shared_intent: {
          has_value: true,
          value: "co-acquisition",
          evidence_object_ids: ["evidence-3"],
        },
      },
    },
    { storageDir },
  );

  const response = await handleCaseReleaseEvalLatestRoute(
    {
      method: "GET",
      path: "/cases/case-5/release-eval/latest",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );

  assert.equal(response.status, 200);
  assert.equal(response.body.release_eval_run_id, persisted.release_eval_run_id);
  assert.equal(response.body.release_eval_freshness, "stale");
  assert.equal(
    response.body.release_eval_freshness_reason_code,
    profileInputContextMismatchReasonCode,
  );
  assert.equal(response.body.release_gate_reason_code, supportIncompleteReasonCode);
  assert.equal(response.body.profile_input_lane_snapshot.shared_use.value, "residence");
  assert.deepEqual(response.body.profile_input_summary.missing_support_lane_keys, [
    "shared_use",
  ]);
});

test("latest release eval route returns profile-key freshness changes unchanged", async () => {
  const storageDir = createStorageDir();
  const loadCaseContext = createCaseContextLoader({
    "case-6": {
      tenant_id: "tenant-1",
      jurisdiction_profile_key: "SWE_BODELNING",
    },
  });

  await upsertCaseProfileInputs("case-6", createProfileInputs(), { storageDir });
  const persisted = await refreshCaseReleaseEvalRun(
    "case-6",
    createReleaseEvalSeed(),
    { storageDir },
  );

  rewriteStoredProfileInputRecord(storageDir, "case-6", (record) => ({
    ...record,
    jurisdiction_profile_key: "SWE_OTHER",
  }));

  const response = await handleCaseReleaseEvalLatestRoute(
    {
      method: "GET",
      path: "/cases/case-6/release-eval/latest",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );

  assert.equal(response.status, 200);
  assert.equal(response.body.release_eval_run_id, persisted.release_eval_run_id);
  assert.equal(response.body.release_eval_freshness, "stale");
  assert.equal(
    response.body.release_eval_freshness_reason_code,
    profileInputContextMismatchReasonCode,
  );
  assert.equal(response.body.jurisdiction_profile_key, "SWE_BODELNING");
});

test("no final export behavior is introduced by this slice", () => {
  const exportWorkerPath = path.join(__dirname, "..", "workers", "export");
  assert.equal(fs.existsSync(exportWorkerPath), false);
});
