const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const { handleCaseProfileDossierRoute } = require("../apps/api/src/index.js");
const {
  getLatestCaseProfileDossierProjection,
  getLatestCaseReleaseEvalRun,
  persistCaseReleaseEvalRun,
  refreshCaseReleaseEvalRun,
  upsertCaseProfileInputs,
} = require("../packages/database/src/index.js");
const {
  validateCMDProfileDossierProjection,
  validateSWEBodelningProfileDossierProjection,
  validateSWEBodelningProfileDossierSnapshot,
} = require("../packages/schemas/src/index.js");
const {
  deriveSWEBodelningProfileDossierCanonicalSource,
  deriveSWEBodelningProfileDossierFingerprint,
  deriveSWEBodelningProfileDossierProjectionVersion,
} = require("../packages/governance/src/index.js");

const docsPath = path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md");
const docsText = fs.readFileSync(docsPath, "utf8");
const apiIndexPath = path.join(__dirname, "..", "apps", "api", "src", "index.js");
const apiIndexText = fs.readFileSync(apiIndexPath, "utf8");

function createStorageDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "governance-contracts-profile-dossier-api-"));
}

function createCaseContextLoader(caseContexts) {
  return async function loadCaseContext(caseId) {
    return caseContexts[caseId] ?? null;
  };
}

function rewriteStoredReleaseEvalRecord(storageDir, caseId, transformRecord) {
  const storePath = path.join(storageDir, "release-eval-runs.json");
  const store = JSON.parse(fs.readFileSync(storePath, "utf8"));
  const caseRuns = store[caseId];
  const latestIndex = caseRuns.length - 1;
  caseRuns[latestIndex] = transformRecord(caseRuns[latestIndex]);
  fs.writeFileSync(storePath, JSON.stringify(store, null, 2));
}

function createProfileInputs(overrides = {}) {
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
    ...overrides,
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

function createCompleteProfileInputs() {
  return createProfileInputs({
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
        evidence_object_ids: ["evidence-2"],
      },
      shared_intent: {
        has_value: true,
        value: "co-acquisition",
        evidence_object_ids: ["evidence-3"],
      },
    },
  });
}

function createCompleteUnsupportedProfileInputs() {
  return createProfileInputs({
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
  });
}

function createCMDProfileInputs(overrides = {}) {
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
    ...overrides,
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

test("docs freeze the thin authenticated profile_dossier read/projection seam as a distinct canonical runtime/read seam", () => {
  assert.match(
    docsText,
    /Thin Authenticated Profile Dossier Read\/Projection Seam Freeze/i,
  );
  assert.match(
    docsText,
    /thin authenticated `profile_dossier` read\/projection seam is now frozen as the baseline runtime\/read seam/i,
  );
  assert.match(
    docsText,
    /only currently evidenced read\/projection surface in this freeze is `GET \/cases\/:caseId\/profile-dossier`/i,
  );
  assert.match(
    docsText,
    /authenticated\/case-access-controlled boundary behavior at the thin route edge/i,
  );
  assert.match(
    docsText,
    /read-only projection passthrough over the canonical profile dossier projection returned by the existing shared dossier projection path plus the top-level machine-readable snapshot_status block already present in that projection contract where applicable only when the projected canonical profile dossier `jurisdiction_profile_key` matches the authorized case-context `jurisdiction_profile_key`/i,
  );
  assert.match(
    docsText,
    /fail-closed route-edge invariant that the projected canonical profile dossier `jurisdiction_profile_key` must equal the authorized case-context `jurisdiction_profile_key` before return/i,
  );
  assert.match(
    docsText,
    /same-tenant supported-profile drift in already-persisted upstream release_eval\/profile_inputs data rejects machine-readably with HTTP `409` `ERR_PROFILE_DOSSIER_JURISDICTION_PROFILE_MISMATCH` instead of returning the mismatched dossier projection/i,
  );
  assert.match(
    docsText,
    /fail-closed missing-snapshot responses from this exact read\/projection route with HTTP 404 ERR_PROFILE_DOSSIER_SNAPSHOT_NOT_FOUND plus route-level case_id detail/i,
  );
  assert.match(
    docsText,
    /no profile_inputs read\/write semantics inside this seam/i,
  );
  assert.match(
    docsText,
    /no release_eval latest-read ownership inside this seam/i,
  );
  assert.match(
    docsText,
    /shared `snapshot_status` seam governs shared currentness semantics where relevant for this read\/projection seam and remains a separate frozen shared currentness boundary/i,
  );
  assert.match(
    docsText,
    /shared API error-envelope seam and its frozen subfamilies remain the governing boundary for machine-readable read\/projection error envelopes/i,
  );
  assert.match(
    docsText,
    /currently evidenced `ERR_PROFILE_DOSSIER_SNAPSHOT_NOT_FOUND` route branch for this thin read\/projection seam remains distinct from the broader already-frozen shared `resource\/snapshot not found` API envelope partition\/prerequisites/i,
  );
  assert.match(
    docsText,
    /adjacent `GET \/cases\/:caseId\/profile-inputs` read seam remains a distinct persisted profile-input boundary/i,
  );
  assert.match(
    docsText,
    /adjacent `PATCH \/cases\/:caseId\/profile-inputs` write seam remains a distinct validation\/persistence boundary/i,
  );
  assert.match(
    docsText,
    /adjacent `GET \/cases\/:caseId\/release-eval\/latest` seam remains a distinct latest-read boundary/i,
  );
  assert.match(
    docsText,
    /surrounding `profile_dossier` snapshot\/projection\/derivation machinery remains a broader documented runtime area, and this read\/projection seam is narrower than that surrounding machinery/i,
  );
  assert.match(
    docsText,
    /does not itself redefine profile_inputs read\/write behavior, release_eval latest-read behavior, refresh behavior, delivery-byte passthrough behavior, shared snapshot_status semantics, shared API error-envelope partitioning, or shared-governance dossier derivation \/ reprojection behavior/i,
  );
  assert.match(
    docsText,
    /no undocumented broadening of this read\/projection seam into profile_inputs behavior, release_eval ownership, refresh, delivery, shared currentness semantics, error-envelope partitioning, or dossier derivation \/ reprojection should be introduced/i,
  );
  assert.match(
    docsText,
    /the seam should remain a thin authenticated read-only dossier projection boundary unless explicit contract detail changes/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, read\/projection semantics, schema behavior, or fail-closed behavior/i,
  );

  assert.match(apiIndexText, /async function handleCaseProfileDossierRoute\(/);
  assert.match(
    apiIndexText,
    /loadAuthorizedCaseContext\(\s+routeMatch\.caseId,\s+request\.auth,\s+options\.loadCaseContext,\s+"profile_dossier"/,
  );
  assert.match(apiIndexText, /if \(request\.method !== "GET"\)/);
  assert.match(
    apiIndexText,
    /const profileDossierProjection = await getLatestCaseProfileDossierProjection\(\s+routeMatch\.caseId,\s+options,\s+\);/,
  );
  assert.match(
    apiIndexText,
    /if \(!profileDossierProjection\) {\s+return errorResponse\(404, "ERR_PROFILE_DOSSIER_SNAPSHOT_NOT_FOUND", {\s+case_id: routeMatch\.caseId,\s+}\);\s+}/,
  );
  assert.match(
    apiIndexText,
    /profileDossierProjection\.jurisdiction_profile_key !==\s+authorization\.caseContext\.jurisdiction_profile_key/,
  );
  assert.match(
    apiIndexText,
    /ERR_PROFILE_DOSSIER_JURISDICTION_PROFILE_MISMATCH/,
  );
  assert.match(apiIndexText, /return jsonResponse\(200, profileDossierProjection\);/);
  assert.match(apiIndexText, /async function handleCaseProfileInputsRoute\(/);
  assert.match(apiIndexText, /async function handleCaseReleaseEvalLatestRoute\(/);
});

test("successful dossier retrieval for a tenant-owned SWE_BODELNING case with canonical release_eval data", async () => {
  const storageDir = createStorageDir();
  const loadCaseContext = createCaseContextLoader({
    "case-1": {
      tenant_id: "tenant-1",
      jurisdiction_profile_key: "SWE_BODELNING",
    },
  });

  await upsertCaseProfileInputs("case-1", createProfileInputs(), { storageDir });
  const persistedReleaseEval = await refreshCaseReleaseEvalRun(
    "case-1",
    createReleaseEvalSeed(),
    { storageDir },
  );
  const expectedProjection = await getLatestCaseProfileDossierProjection("case-1", {
    storageDir,
  });

  const response = await handleCaseProfileDossierRoute(
    {
      method: "GET",
      path: "/cases/case-1/profile-dossier",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );

  assert.equal(response.status, 200);
  assert.deepEqual(response.body, expectedProjection);
  assert.deepEqual(
    validateSWEBodelningProfileDossierProjection(response.body),
    response.body,
  );
  assert.equal(
    response.body.projection_version,
    deriveSWEBodelningProfileDossierProjectionVersion(),
  );
  assert.equal(
    response.body.dossier_fingerprint,
    deriveSWEBodelningProfileDossierFingerprint({
      jurisdiction_profile_key: response.body.jurisdiction_profile_key,
      projection_version: response.body.projection_version,
      release_gate: response.body.release_gate,
      release_gate_reason_code: response.body.release_gate_reason_code,
      release_eval_freshness: response.body.release_eval_freshness,
      release_eval_freshness_reason_code:
        response.body.release_eval_freshness_reason_code,
      evaluator_version: response.body.evaluator_version,
      profile_input_summary: response.body.profile_input_summary,
      profile_input_lane_snapshot: response.body.profile_input_lane_snapshot,
      evidence_reference_index: response.body.evidence_reference_index,
      evidence_exhibit_index: response.body.evidence_exhibit_index,
      issue_index: response.body.issue_index,
      section_index: response.body.section_index,
    }),
  );
  assert.deepEqual(
    response.body.canonical_source,
    persistedReleaseEval.profile_dossier_snapshot.canonical_source,
  );
  assert.equal(response.body.snapshot_status.source, "persisted-current");
  assert.deepEqual(response.body.evidence_reference_index, [
    {
      reference_ref: "REF-001",
      evidence_object_id: "evidence-1",
      supporting_lane_keys: ["economic_contribution"],
      related_issue_refs: [],
      related_section_refs: [],
      related_exhibit_refs: ["EX-001"],
    },
    {
      reference_ref: "REF-002",
      evidence_object_id: "evidence-2",
      supporting_lane_keys: ["shared_use"],
      related_issue_refs: [],
      related_section_refs: [],
      related_exhibit_refs: ["EX-002"],
    },
  ]);
  assert.deepEqual(response.body.evidence_exhibit_index, [
    {
      exhibit_ref: "EX-001",
      evidence_object_id: "evidence-1",
      supporting_lane_keys: ["economic_contribution"],
      related_lane_keys: ["economic_contribution"],
      related_reference_refs: ["REF-001"],
      related_issue_refs: [],
      related_section_refs: [],
    },
    {
      exhibit_ref: "EX-002",
      evidence_object_id: "evidence-2",
      supporting_lane_keys: ["shared_use"],
      related_lane_keys: ["shared_use"],
      related_reference_refs: ["REF-002"],
      related_issue_refs: [],
      related_section_refs: [],
    },
  ]);
  assert.deepEqual(
    response.body.profile_input_lane_snapshot.economic_contribution.supporting_reference_refs,
    ["REF-001"],
  );
  assert.deepEqual(
    response.body.profile_input_lane_snapshot.economic_contribution.supporting_exhibit_refs,
    ["EX-001"],
  );
  assert.deepEqual(
    response.body.profile_input_lane_snapshot.economic_contribution.related_issue_refs,
    [],
  );
  assert.deepEqual(
    response.body.profile_input_lane_snapshot.economic_contribution.related_section_refs,
    [],
  );
  assert.deepEqual(
    response.body.profile_input_lane_snapshot.shared_use.supporting_reference_refs,
    ["REF-002"],
  );
  assert.deepEqual(
    response.body.profile_input_lane_snapshot.shared_use.supporting_exhibit_refs,
    ["EX-002"],
  );
  assert.deepEqual(
    response.body.profile_input_lane_snapshot.shared_use.related_issue_refs,
    [],
  );
  assert.deepEqual(
    response.body.profile_input_lane_snapshot.shared_use.related_section_refs,
    [],
  );
  assert.deepEqual(
    response.body.profile_input_lane_snapshot.shared_intent.supporting_reference_refs,
    [],
  );
  assert.deepEqual(
    response.body.profile_input_lane_snapshot.shared_intent.supporting_exhibit_refs,
    [],
  );
  assert.deepEqual(
    response.body.profile_input_lane_snapshot.shared_intent.related_issue_refs,
    ["ISS-001", "ISS-002"],
  );
  assert.deepEqual(
    response.body.profile_input_lane_snapshot.shared_intent.related_section_refs,
    ["SEC-001", "SEC-002"],
  );
  assert.deepEqual(
    response.body.profile_input_lane_snapshot,
    persistedReleaseEval.profile_dossier_snapshot.profile_input_lane_snapshot,
  );
  assert.deepEqual(response.body.issue_index, [
    {
      issue_ref: "ISS-001",
      issue_code: "swe-bodelning-input-incomplete",
      blocking: true,
      related_lane_keys: ["shared_intent"],
      related_reference_refs: [],
      related_section_refs: ["SEC-001", "SEC-002"],
      related_exhibit_refs: [],
    },
    {
      issue_ref: "ISS-002",
      issue_code: "swe-bodelning-support-incomplete",
      blocking: true,
      related_lane_keys: ["shared_intent"],
      related_reference_refs: [],
      related_section_refs: ["SEC-001", "SEC-002"],
      related_exhibit_refs: [],
    },
  ]);
  assert.deepEqual(response.body.section_index, [
    {
      section_ref: "SEC-001",
      section_key: "release_status",
      section_order: 1,
      present: true,
      related_issue_refs: ["ISS-001", "ISS-002"],
      related_lane_keys: ["shared_intent"],
      related_reference_refs: [],
      related_exhibit_refs: [],
    },
    {
      section_ref: "SEC-002",
      section_key: "profile_inputs",
      section_order: 2,
      present: true,
      related_issue_refs: ["ISS-001", "ISS-002"],
      related_lane_keys: ["shared_intent"],
      related_reference_refs: [],
      related_exhibit_refs: [],
    },
    {
      section_ref: "SEC-003",
      section_key: "issues",
      section_order: 3,
      present: true,
      related_issue_refs: [],
      related_lane_keys: [],
      related_reference_refs: [],
      related_exhibit_refs: [],
    },
  ]);
});

test("dossier route exposes persisted related_reference_refs unchanged when current", async () => {
  const storageDir = createStorageDir();
  const loadCaseContext = createCaseContextLoader({
    "case-reference-issue-refs": {
      tenant_id: "tenant-1",
      jurisdiction_profile_key: "SWE_BODELNING",
    },
  });

  await upsertCaseProfileInputs(
    "case-reference-issue-refs",
    createProfileInputs({
      profile_input_summary: {
        required_lane_count: 3,
        lanes_with_value_count: 2,
        missing_value_lane_keys: ["shared_use"],
      },
      profile_input_lane_snapshot: {
        economic_contribution: {
          has_value: true,
          value: "documented",
          evidence_object_ids: ["evidence-1"],
        },
        shared_use: {
          has_value: false,
          value: null,
          evidence_object_ids: ["evidence-2"],
        },
        shared_intent: {
          has_value: true,
          value: "co-acquisition",
          evidence_object_ids: ["evidence-3"],
        },
      },
    }),
    { storageDir },
  );

  const persistedReleaseEval = await refreshCaseReleaseEvalRun(
    "case-reference-issue-refs",
    createReleaseEvalSeed({
      release_eval_run_id: "release-eval-run-reference-issue-refs",
    }),
    { storageDir },
  );

  const response = await handleCaseProfileDossierRoute(
    {
      method: "GET",
      path: "/cases/case-reference-issue-refs/profile-dossier",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );

  assert.equal(response.status, 200);
  assert.deepEqual(response.body.issue_index, [
    {
      issue_ref: "ISS-001",
      issue_code: "swe-bodelning-input-incomplete",
      blocking: true,
      related_lane_keys: ["shared_use"],
      related_reference_refs: ["REF-002"],
      related_section_refs: ["SEC-001", "SEC-002"],
      related_exhibit_refs: ["EX-002"],
    },
  ]);
  assert.deepEqual(
    response.body.issue_index,
    persistedReleaseEval.profile_dossier_snapshot.issue_index,
  );
});

test("dossier route exposes persisted related_reference_refs for sections unchanged when current", async () => {
  const storageDir = createStorageDir();
  const loadCaseContext = createCaseContextLoader({
    "case-reference-sections": {
      tenant_id: "tenant-1",
      jurisdiction_profile_key: "SWE_BODELNING",
    },
  });

  await upsertCaseProfileInputs(
    "case-reference-sections",
    createProfileInputs({
      profile_input_summary: {
        required_lane_count: 3,
        lanes_with_value_count: 2,
        missing_value_lane_keys: ["shared_use"],
      },
      profile_input_lane_snapshot: {
        economic_contribution: {
          has_value: true,
          value: "documented",
          evidence_object_ids: ["evidence-1"],
        },
        shared_use: {
          has_value: false,
          value: null,
          evidence_object_ids: ["evidence-2"],
        },
        shared_intent: {
          has_value: true,
          value: "co-acquisition",
          evidence_object_ids: ["evidence-3"],
        },
      },
    }),
    { storageDir },
  );

  const persistedReleaseEval = await refreshCaseReleaseEvalRun(
    "case-reference-sections",
    createReleaseEvalSeed({
      release_eval_run_id: "release-eval-run-reference-sections",
    }),
    { storageDir },
  );

  const response = await handleCaseProfileDossierRoute(
    {
      method: "GET",
      path: "/cases/case-reference-sections/profile-dossier",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );

  assert.equal(response.status, 200);
  assert.deepEqual(response.body.section_index, [
    {
      section_ref: "SEC-001",
      section_key: "release_status",
      section_order: 1,
      present: true,
      related_issue_refs: ["ISS-001"],
      related_lane_keys: ["shared_use"],
      related_reference_refs: ["REF-002"],
      related_exhibit_refs: ["EX-002"],
    },
    {
      section_ref: "SEC-002",
      section_key: "profile_inputs",
      section_order: 2,
      present: true,
      related_issue_refs: ["ISS-001"],
      related_lane_keys: ["shared_use"],
      related_reference_refs: ["REF-002"],
      related_exhibit_refs: ["EX-002"],
    },
    {
      section_ref: "SEC-003",
      section_key: "issues",
      section_order: 3,
      present: true,
      related_issue_refs: [],
      related_lane_keys: [],
      related_reference_refs: [],
      related_exhibit_refs: [],
    },
  ]);
  assert.deepEqual(
    response.body.section_index,
    persistedReleaseEval.profile_dossier_snapshot.section_index,
  );
});

test("tenant/case isolation rejection for profile dossier route", async () => {
  const response = await handleCaseProfileDossierRoute(
    {
      method: "GET",
      path: "/cases/case-2/profile-dossier",
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

test("no-canonical-run fail-closed response for profile dossier route", async () => {
  const storageDir = createStorageDir();
  const response = await handleCaseProfileDossierRoute(
    {
      method: "GET",
      path: "/cases/case-3/profile-dossier",
      auth: { tenantId: "tenant-1" },
    },
    {
      loadCaseContext: createCaseContextLoader({
        "case-3": {
          tenant_id: "tenant-1",
          jurisdiction_profile_key: "SWE_BODELNING",
        },
      }),
      storageDir,
    },
  );

  assert.equal(response.status, 404);
  assert.deepEqual(response.body, {
    error: {
      case_id: "case-3",
      code: "ERR_PROFILE_DOSSIER_SNAPSHOT_NOT_FOUND",
    },
  });
});

test("successful tenant-owned GET /cases/:caseId/profile-dossier for a CMD_PROFILE case with persisted release_eval baseline", async () => {
  const storageDir = createStorageDir();
  const loadCaseContext = createCaseContextLoader({
    "case-cmd": {
      tenant_id: "tenant-1",
      jurisdiction_profile_key: "CMD_PROFILE",
    },
  });

  await upsertCaseProfileInputs("case-cmd", createCMDProfileInputs(), { storageDir });
  const persistedReleaseEval = await refreshCaseReleaseEvalRun(
    "case-cmd",
    createCMDReleaseEvalSeed(),
    { storageDir },
  );
  const expectedProjection = await getLatestCaseProfileDossierProjection("case-cmd", {
    storageDir,
  });

  const response = await handleCaseProfileDossierRoute(
    {
      method: "GET",
      path: "/cases/case-cmd/profile-dossier",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );

  assert.equal(response.status, 200);
  assert.deepEqual(response.body, expectedProjection);
  assert.deepEqual(
    validateCMDProfileDossierProjection(response.body),
    response.body,
  );
  assert.deepEqual(response.body, {
    jurisdiction_profile_key: "CMD_PROFILE",
    release_gate: "blocked",
    release_gate_reason_code: "cmd-runtime-not-implemented",
    release_eval_freshness: "current",
    release_eval_freshness_reason_code: "evaluator-version-current",
    evaluator_version: "cmd-release-eval-v1",
    profile_input_summary: persistedReleaseEval.profile_input_summary,
    profile_input_lane_snapshot: persistedReleaseEval.profile_dossier_snapshot.profile_input_lane_snapshot,
    snapshot_status: {
      source: "persisted-current",
      snapshot_projection_version_found: "cmd-profile-dossier-v1",
      current_projection_version: "cmd-profile-dossier-v1",
      snapshot_is_current: true,
    },
  });
});

test("no-persisted-release_eval for CMD_PROFILE fails closed with a machine-readable response", async () => {
  const storageDir = createStorageDir();
  const loadCaseContext = createCaseContextLoader({
    "case-cmd-missing": {
      tenant_id: "tenant-1",
      jurisdiction_profile_key: "CMD_PROFILE",
    },
  });

  const response = await handleCaseProfileDossierRoute(
    {
      method: "GET",
      path: "/cases/case-cmd-missing/profile-dossier",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );

  assert.equal(response.status, 404);
  assert.deepEqual(response.body, {
    error: {
      code: "ERR_PROFILE_DOSSIER_SNAPSHOT_NOT_FOUND",
      case_id: "case-cmd-missing",
    },
  });
});

test("same-tenant persisted dossier profile drift is rejected instead of returning the mismatched dossier projection", async () => {
  const storageDir = createStorageDir();
  const loadCaseContext = createCaseContextLoader({
    "case-drift": {
      tenant_id: "tenant-1",
      jurisdiction_profile_key: "SWE_BODELNING",
    },
  });

  await upsertCaseProfileInputs("case-drift", createCMDProfileInputs(), { storageDir });
  const persistedReleaseEval = await refreshCaseReleaseEvalRun(
    "case-drift",
    createCMDReleaseEvalSeed({ release_eval_run_id: "cmd-release-eval-run-drift" }),
    { storageDir },
  );
  const expectedProjection = await getLatestCaseProfileDossierProjection("case-drift", {
    storageDir,
  });

  assert.equal(persistedReleaseEval.jurisdiction_profile_key, "CMD_PROFILE");
  assert.equal(expectedProjection.jurisdiction_profile_key, "CMD_PROFILE");

  const response = await handleCaseProfileDossierRoute(
    {
      method: "GET",
      path: "/cases/case-drift/profile-dossier",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );

  assert.equal(response.status, 409);
  assert.notDeepEqual(response.body, expectedProjection);
  assert.deepEqual(response.body, {
    error: {
      case_id: "case-drift",
      code: "ERR_PROFILE_DOSSIER_JURISDICTION_PROFILE_MISMATCH",
      jurisdiction_profile_key: "CMD_PROFILE",
      expected_jurisdiction_profile_key: "SWE_BODELNING",
    },
  });
});

test("unsupported/non-SWE dossier response remains machine-readable and non-breaking", async () => {
  const response = await handleCaseProfileDossierRoute(
    {
      method: "GET",
      path: "/cases/case-4/profile-dossier",
      auth: { tenantId: "tenant-1" },
    },
    {
      loadCaseContext: createCaseContextLoader({
        "case-4": {
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

test("dossier payload matches the persisted canonical snapshot rather than diverging", async () => {
  const storageDir = createStorageDir();
  const loadCaseContext = createCaseContextLoader({
    "case-5": {
      tenant_id: "tenant-1",
      jurisdiction_profile_key: "SWE_BODELNING",
    },
  });

  await upsertCaseProfileInputs("case-5", createProfileInputs(), { storageDir });
  const persistedReleaseEval = await refreshCaseReleaseEvalRun(
    "case-5",
    createReleaseEvalSeed(),
    { storageDir },
  );
  await upsertCaseProfileInputs(
    "case-5",
    createProfileInputs({
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
          evidence_object_ids: ["evidence-2"],
        },
        shared_intent: {
          has_value: true,
          value: "co-acquisition",
          evidence_object_ids: ["evidence-3"],
        },
      },
    }),
    { storageDir },
  );

  const latestReleaseEval = await getLatestCaseReleaseEvalRun("case-5", {
    storageDir,
  });
  const latestProfileDossierProjection = await getLatestCaseProfileDossierProjection(
    "case-5",
    { storageDir },
  );
  const response = await handleCaseProfileDossierRoute(
    {
      method: "GET",
      path: "/cases/case-5/profile-dossier",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );

  assert.equal(response.status, 200);
  const { snapshot_status, ...snapshotFields } = response.body;
  assert.deepEqual(snapshotFields, persistedReleaseEval.profile_dossier_snapshot);
  assert.equal(
    response.body.projection_version,
    persistedReleaseEval.profile_dossier_snapshot.projection_version,
  );
  assert.equal(
    response.body.dossier_fingerprint,
    persistedReleaseEval.profile_dossier_snapshot.dossier_fingerprint,
  );
  assert.deepEqual(
    response.body.canonical_source,
    persistedReleaseEval.profile_dossier_snapshot.canonical_source,
  );
  assert.deepEqual(
    latestProfileDossierProjection,
    response.body,
  );
  assert.equal(
    latestReleaseEval.release_eval_freshness,
    "stale",
  );
  assert.equal(
    response.body.release_eval_freshness,
    persistedReleaseEval.profile_dossier_snapshot.release_eval_freshness,
  );
  assert.deepEqual(snapshot_status, {
    source: "persisted-current",
    snapshot_projection_version_found:
      persistedReleaseEval.profile_dossier_snapshot.projection_version,
    current_projection_version:
      persistedReleaseEval.profile_dossier_snapshot.projection_version,
    snapshot_is_current: true,
  });
  assert.deepEqual(
    response.body.section_index,
    persistedReleaseEval.profile_dossier_snapshot.section_index,
  );
  assert.deepEqual(
    response.body.evidence_reference_index,
    persistedReleaseEval.profile_dossier_snapshot.evidence_reference_index,
  );
  assert.deepEqual(
    response.body.evidence_exhibit_index,
    persistedReleaseEval.profile_dossier_snapshot.evidence_exhibit_index,
  );
  assert.deepEqual(
    response.body.profile_input_lane_snapshot,
    persistedReleaseEval.profile_dossier_snapshot.profile_input_lane_snapshot,
  );
});

test("dossier canonical_source fields match persisted release eval data", async () => {
  const storageDir = createStorageDir();
  const loadCaseContext = createCaseContextLoader({
    "case-6": {
      tenant_id: "tenant-1",
      jurisdiction_profile_key: "SWE_BODELNING",
    },
  });

  await upsertCaseProfileInputs("case-6", createProfileInputs(), { storageDir });
  const persistedReleaseEval = await refreshCaseReleaseEvalRun(
    "case-6",
    createReleaseEvalSeed({ release_eval_run_id: "release-eval-run-source-1" }),
    { storageDir },
  );

  const response = await handleCaseProfileDossierRoute(
    {
      method: "GET",
      path: "/cases/case-6/profile-dossier",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );

  assert.equal(response.status, 200);
  assert.deepEqual(
    response.body.canonical_source,
    deriveSWEBodelningProfileDossierCanonicalSource(persistedReleaseEval),
  );
  assert.equal(
    response.body.canonical_source.release_eval_run_id,
    persistedReleaseEval.release_eval_run_id,
  );
  assert.equal(
    response.body.canonical_source.evaluator_version,
    persistedReleaseEval.evaluator_version,
  );
  assert.equal(
    response.body.canonical_source.jurisdiction_profile_key,
    persistedReleaseEval.jurisdiction_profile_key,
  );
  assert.equal(response.body.snapshot_status.source, "persisted-current");
});

test("older dossier projection versions trigger fallback reprojection and the dossier route exposes that result unchanged", async () => {
  const storageDir = createStorageDir();
  const loadCaseContext = createCaseContextLoader({
    "case-7": {
      tenant_id: "tenant-1",
      jurisdiction_profile_key: "SWE_BODELNING",
    },
  });

  await upsertCaseProfileInputs("case-7", createProfileInputs(), { storageDir });
  const persistedReleaseEval = await refreshCaseReleaseEvalRun(
    "case-7",
    createReleaseEvalSeed({ release_eval_run_id: "release-eval-run-fallback-1" }),
    { storageDir },
  );

  rewriteStoredReleaseEvalRecord(storageDir, "case-7", (record) => ({
    ...record,
    release_eval_payload: {
      ...record.release_eval_payload,
      profile_dossier_snapshot: {
        ...record.release_eval_payload.profile_dossier_snapshot,
        projection_version: "swe-bodelning-profile-dossier-v0",
        dossier_fingerprint: "legacy-dossier-fingerprint",
      },
    },
  }));

  const latestReleaseEval = await getLatestCaseReleaseEvalRun("case-7", {
    storageDir,
  });
  const latestProfileDossierProjection = await getLatestCaseProfileDossierProjection(
    "case-7",
    { storageDir },
  );
  const response = await handleCaseProfileDossierRoute(
    {
      method: "GET",
      path: "/cases/case-7/profile-dossier",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );

  assert.equal(response.status, 200);
  assert.deepEqual(response.body, latestProfileDossierProjection);
  assert.equal(
    response.body.projection_version,
    deriveSWEBodelningProfileDossierProjectionVersion(),
  );
  assert.notEqual(response.body.dossier_fingerprint, "legacy-dossier-fingerprint");
  assert.deepEqual(
    response.body.canonical_source,
    persistedReleaseEval.profile_dossier_snapshot.canonical_source,
  );
  assert.deepEqual(response.body.snapshot_status, {
    source: "fallback-reprojection",
    snapshot_projection_version_found: "swe-bodelning-profile-dossier-v0",
    current_projection_version: deriveSWEBodelningProfileDossierProjectionVersion(),
    snapshot_is_current: false,
  });
  assert.deepEqual(response.body.evidence_reference_index, [
    {
      reference_ref: "REF-001",
      evidence_object_id: "evidence-1",
      supporting_lane_keys: ["economic_contribution"],
      related_issue_refs: [],
      related_section_refs: [],
      related_exhibit_refs: ["EX-001"],
    },
    {
      reference_ref: "REF-002",
      evidence_object_id: "evidence-2",
      supporting_lane_keys: ["shared_use"],
      related_issue_refs: [],
      related_section_refs: [],
      related_exhibit_refs: ["EX-002"],
    },
  ]);
  assert.deepEqual(response.body.evidence_exhibit_index, [
    {
      exhibit_ref: "EX-001",
      evidence_object_id: "evidence-1",
      supporting_lane_keys: ["economic_contribution"],
      related_lane_keys: ["economic_contribution"],
      related_reference_refs: ["REF-001"],
      related_issue_refs: [],
      related_section_refs: [],
    },
    {
      exhibit_ref: "EX-002",
      evidence_object_id: "evidence-2",
      supporting_lane_keys: ["shared_use"],
      related_lane_keys: ["shared_use"],
      related_reference_refs: ["REF-002"],
      related_issue_refs: [],
      related_section_refs: [],
    },
  ]);
  assert.deepEqual(
    response.body.profile_input_lane_snapshot.economic_contribution.supporting_reference_refs,
    ["REF-001"],
  );
  assert.deepEqual(
    response.body.profile_input_lane_snapshot.economic_contribution.supporting_exhibit_refs,
    ["EX-001"],
  );
  assert.deepEqual(
    response.body.profile_input_lane_snapshot.shared_use.supporting_reference_refs,
    ["REF-002"],
  );
  assert.deepEqual(
    response.body.profile_input_lane_snapshot.shared_use.supporting_exhibit_refs,
    ["EX-002"],
  );
  assert.deepEqual(
    response.body.profile_input_lane_snapshot.shared_intent.supporting_reference_refs,
    [],
  );
  assert.deepEqual(
    response.body.profile_input_lane_snapshot.shared_intent.supporting_exhibit_refs,
    [],
  );
  assert.deepEqual(response.body.section_index, [
    {
      section_ref: "SEC-001",
      section_key: "release_status",
      section_order: 1,
      present: true,
      related_issue_refs: ["ISS-001", "ISS-002"],
      related_lane_keys: ["shared_intent"],
      related_reference_refs: [],
      related_exhibit_refs: [],
    },
    {
      section_ref: "SEC-002",
      section_key: "profile_inputs",
      section_order: 2,
      present: true,
      related_issue_refs: ["ISS-001", "ISS-002"],
      related_lane_keys: ["shared_intent"],
      related_reference_refs: [],
      related_exhibit_refs: [],
    },
    {
      section_ref: "SEC-003",
      section_key: "issues",
      section_order: 3,
      present: true,
      related_issue_refs: [],
      related_lane_keys: [],
      related_reference_refs: [],
      related_exhibit_refs: [],
    },
  ]);
});

test("schema-invalid current-version dossier snapshots trigger fallback reprojection and the dossier route exposes that result unchanged", async () => {
  const storageDir = createStorageDir();
  const loadCaseContext = createCaseContextLoader({
    "case-8": {
      tenant_id: "tenant-1",
      jurisdiction_profile_key: "SWE_BODELNING",
    },
  });

  await upsertCaseProfileInputs("case-8", createProfileInputs(), { storageDir });
  const persistedReleaseEval = await refreshCaseReleaseEvalRun(
    "case-8",
    createReleaseEvalSeed({ release_eval_run_id: "release-eval-run-invalid-1" }),
    { storageDir },
  );

  rewriteStoredReleaseEvalRecord(storageDir, "case-8", (record) => ({
    ...record,
    release_eval_payload: {
      ...record.release_eval_payload,
      profile_dossier_snapshot: {
        ...record.release_eval_payload.profile_dossier_snapshot,
        dossier_fingerprint: "",
      },
    },
  }));

  const latestProfileDossierProjection = await getLatestCaseProfileDossierProjection(
    "case-8",
    {
      storageDir,
    },
  );
  const latestReleaseEval = await getLatestCaseReleaseEvalRun("case-8", {
    storageDir,
  });
  const response = await handleCaseProfileDossierRoute(
    {
      method: "GET",
      path: "/cases/case-8/profile-dossier",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );

  assert.equal(response.status, 200);
  assert.deepEqual(response.body, latestProfileDossierProjection);
  assert.notEqual(response.body.dossier_fingerprint, "");
  assert.deepEqual(
    response.body.canonical_source,
    persistedReleaseEval.profile_dossier_snapshot.canonical_source,
  );
  assert.deepEqual(
    validateSWEBodelningProfileDossierProjection(response.body),
    response.body,
  );
  assert.deepEqual(response.body.snapshot_status, {
    source: "fallback-reprojection",
    snapshot_projection_version_found:
      persistedReleaseEval.profile_dossier_snapshot.projection_version,
    current_projection_version: deriveSWEBodelningProfileDossierProjectionVersion(),
    snapshot_is_current: false,
  });
  assert.deepEqual(response.body.evidence_reference_index, [
    {
      reference_ref: "REF-001",
      evidence_object_id: "evidence-1",
      supporting_lane_keys: ["economic_contribution"],
      related_issue_refs: [],
      related_section_refs: [],
      related_exhibit_refs: ["EX-001"],
    },
    {
      reference_ref: "REF-002",
      evidence_object_id: "evidence-2",
      supporting_lane_keys: ["shared_use"],
      related_issue_refs: [],
      related_section_refs: [],
      related_exhibit_refs: ["EX-002"],
    },
  ]);
  assert.deepEqual(response.body.evidence_exhibit_index, [
    {
      exhibit_ref: "EX-001",
      evidence_object_id: "evidence-1",
      supporting_lane_keys: ["economic_contribution"],
      related_lane_keys: ["economic_contribution"],
      related_reference_refs: ["REF-001"],
      related_issue_refs: [],
      related_section_refs: [],
    },
    {
      exhibit_ref: "EX-002",
      evidence_object_id: "evidence-2",
      supporting_lane_keys: ["shared_use"],
      related_lane_keys: ["shared_use"],
      related_reference_refs: ["REF-002"],
      related_issue_refs: [],
      related_section_refs: [],
    },
  ]);
  assert.deepEqual(
    response.body.profile_input_lane_snapshot.economic_contribution.supporting_exhibit_refs,
    ["EX-001"],
  );
  assert.deepEqual(
    response.body.profile_input_lane_snapshot.economic_contribution.related_issue_refs,
    [],
  );
  assert.deepEqual(
    response.body.profile_input_lane_snapshot.economic_contribution.related_section_refs,
    [],
  );
  assert.deepEqual(
    response.body.profile_input_lane_snapshot.shared_use.supporting_exhibit_refs,
    ["EX-002"],
  );
  assert.deepEqual(
    response.body.profile_input_lane_snapshot.shared_use.related_issue_refs,
    [],
  );
  assert.deepEqual(
    response.body.profile_input_lane_snapshot.shared_use.related_section_refs,
    [],
  );
  assert.equal(latestReleaseEval.profile_dossier_snapshot.projection_version, response.body.projection_version);
});

test("issue_index includes canonical missing-support issues when those states already exist", async () => {
  const storageDir = createStorageDir();
  const loadCaseContext = createCaseContextLoader({
    "case-9": {
      tenant_id: "tenant-1",
      jurisdiction_profile_key: "SWE_BODELNING",
    },
  });

  await upsertCaseProfileInputs("case-9", createCompleteUnsupportedProfileInputs(), {
    storageDir,
  });
  await refreshCaseReleaseEvalRun("case-9", createReleaseEvalSeed(), { storageDir });

  const response = await handleCaseProfileDossierRoute(
    {
      method: "GET",
      path: "/cases/case-9/profile-dossier",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );

  assert.equal(response.status, 200);
  assert.deepEqual(
    response.body.profile_input_lane_snapshot.economic_contribution.related_issue_refs,
    [],
  );
  assert.deepEqual(
    response.body.profile_input_lane_snapshot.economic_contribution.related_section_refs,
    [],
  );
  assert.deepEqual(
    response.body.profile_input_lane_snapshot.shared_use.related_issue_refs,
    ["ISS-001"],
  );
  assert.deepEqual(
    response.body.profile_input_lane_snapshot.shared_use.related_section_refs,
    ["SEC-001", "SEC-002"],
  );
  assert.deepEqual(
    response.body.profile_input_lane_snapshot.shared_intent.related_issue_refs,
    [],
  );
  assert.deepEqual(
    response.body.profile_input_lane_snapshot.shared_intent.related_section_refs,
    [],
  );
  assert.deepEqual(response.body.issue_index, [
    {
      issue_ref: "ISS-001",
      issue_code: "swe-bodelning-support-incomplete",
      blocking: true,
      related_lane_keys: ["shared_use"],
      related_reference_refs: [],
      related_section_refs: ["SEC-001", "SEC-002"],
      related_exhibit_refs: [],
    },
  ]);
  assert.deepEqual(response.body.section_index, [
    {
      section_ref: "SEC-001",
      section_key: "release_status",
      section_order: 1,
      present: true,
      related_issue_refs: ["ISS-001"],
      related_lane_keys: ["shared_use"],
      related_reference_refs: [],
      related_exhibit_refs: [],
    },
    {
      section_ref: "SEC-002",
      section_key: "profile_inputs",
      section_order: 2,
      present: true,
      related_issue_refs: ["ISS-001"],
      related_lane_keys: ["shared_use"],
      related_reference_refs: [],
      related_exhibit_refs: [],
    },
    {
      section_ref: "SEC-003",
      section_key: "issues",
      section_order: 3,
      present: true,
      related_issue_refs: [],
      related_lane_keys: [],
      related_reference_refs: [],
      related_exhibit_refs: [],
    },
  ]);
});

test("issue_index includes canonical freshness-related issues when those states already exist", async () => {
  const storageDir = createStorageDir();
  const loadCaseContext = createCaseContextLoader({
    "case-10": {
      tenant_id: "tenant-1",
      jurisdiction_profile_key: "SWE_BODELNING",
    },
  });

  await upsertCaseProfileInputs("case-10", createCompleteProfileInputs(), { storageDir });
  await persistCaseReleaseEvalRun(
    "case-10",
    {
      jurisdiction_profile_key: "SWE_BODELNING",
      release_eval_run_id: "release-eval-run-stale-1",
      evaluator_version: "swe-bodelning-release-eval-v0",
      release_gate: "blocked",
      release_gate_reason_code:
        "governance_baseline_fail_closed_pending_completeness_support_policy",
      release_eval_freshness: "current",
      release_eval_freshness_reason_code: "evaluator-version-current",
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
    { storageDir },
  );

  const response = await handleCaseProfileDossierRoute(
    {
      method: "GET",
      path: "/cases/case-10/profile-dossier",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );

  assert.equal(response.status, 200);
  assert.deepEqual(response.body.issue_index, [
    {
      issue_ref: "ISS-001",
      issue_code: "evaluator-version-mismatch",
      blocking: true,
      related_lane_keys: [],
      related_reference_refs: [],
      related_section_refs: ["SEC-001"],
      related_exhibit_refs: [],
    },
  ]);
  assert.deepEqual(response.body.section_index, [
    {
      section_ref: "SEC-001",
      section_key: "release_status",
      section_order: 1,
      present: true,
      related_issue_refs: ["ISS-001"],
      related_lane_keys: [],
      related_reference_refs: [],
      related_exhibit_refs: [],
    },
    {
      section_ref: "SEC-002",
      section_key: "profile_inputs",
      section_order: 2,
      present: true,
      related_issue_refs: [],
      related_lane_keys: [],
      related_reference_refs: [],
      related_exhibit_refs: [],
    },
    {
      section_ref: "SEC-003",
      section_key: "issues",
      section_order: 3,
      present: true,
      related_issue_refs: [],
      related_lane_keys: [],
      related_reference_refs: [],
      related_exhibit_refs: [],
    },
  ]);
});

test("no readiness behavior changes are introduced by this slice", () => {
  const exportWorkerPath = path.join(__dirname, "..", "workers", "export");
  assert.equal(fs.existsSync(exportWorkerPath), false);
});
