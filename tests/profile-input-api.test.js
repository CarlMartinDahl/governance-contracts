const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const { handleCaseProfileInputsRoute } = require("../apps/api/src/index.js");

const docsPath = path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md");
const docsText = fs.readFileSync(docsPath, "utf8");
const apiIndexPath = path.join(__dirname, "..", "apps", "api", "src", "index.js");
const apiIndexText = fs.readFileSync(apiIndexPath, "utf8");

function createStorageDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "governance-contracts-api-"));
}

function createCaseContextLoader(caseContexts) {
  return async function loadCaseContext(caseId) {
    return caseContexts[caseId] ?? null;
  };
}

function createValidSnapshot() {
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
        evidence_object_ids: ["evidence-1", "evidence-2"],
      },
      shared_use: {
        has_value: true,
        value: "residence",
        evidence_object_ids: ["evidence-3"],
      },
      shared_intent: {
        has_value: false,
        value: null,
        evidence_object_ids: [],
      },
    },
  };
}

function createCMDValidSnapshot() {
  return {
    jurisdiction_profile_key: "CMD_PROFILE",
    profile_input_summary: {
      required_lane_count: 1,
      lanes_with_value_count: 1,
      missing_value_lane_keys: [],
    },
    profile_input_lane_snapshot: {
      cmd_primary_signal: {
        has_value: true,
        value: "documented",
        evidence_object_ids: ["cmd-evidence-1"],
      },
    },
  };
}

test("docs freeze the thin authenticated persisted profile_inputs read seam as a distinct canonical runtime/read seam", () => {
  assert.match(
    docsText,
    /Thin Authenticated Profile Inputs Read Seam Freeze/i,
  );
  assert.match(
    docsText,
    /thin authenticated persisted `profile_inputs` read seam is now frozen as the baseline runtime\/read seam/i,
  );
  assert.match(
    docsText,
    /only currently evidenced read surface in this freeze is `GET \/cases\/:caseId\/profile-inputs`/i,
  );
  assert.match(
    docsText,
    /authenticated\/case-access-controlled boundary behavior at the thin route edge/i,
  );
  assert.match(
    docsText,
    /read-only passthrough over the persisted canonical profile input snapshot unchanged/i,
  );
  assert.match(
    docsText,
    /no write semantics inside this seam/i,
  );
  assert.match(
    docsText,
    /shared API error-envelope seam and its frozen subfamilies remain the governing boundary for machine-readable read error envelopes/i,
  );
  assert.match(
    docsText,
    /adjacent `PATCH \/cases\/:caseId\/profile-inputs` write seam remains a distinct write\/validation\/persistence boundary/i,
  );
  assert.match(
    docsText,
    /adjacent `profile_dossier` read\/projection seam remains a distinct route boundary/i,
  );
  assert.match(
    docsText,
    /surrounding `profile_inputs` read\/write machinery remains a broader documented runtime area, and this read seam is narrower than that surrounding machinery/i,
  );
  assert.match(
    docsText,
    /does not itself redefine write behavior, PATCH validation, profile_dossier projection semantics, or shared-governance derivation of `profile_input_summary` or `profile_input_lane_snapshot`/i,
  );
  assert.match(
    docsText,
    /no undocumented broadening of this read seam into write behavior, dossier projection, derivation, or neutral-model alignment should be introduced/i,
  );
  assert.match(
    docsText,
    /the seam should remain a thin authenticated persisted read-only boundary unless explicit contract detail changes/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, read semantics, schema behavior, or fail-closed behavior/i,
  );

  assert.match(apiIndexText, /async function handleCaseProfileInputsRoute\(/);
  assert.match(
    apiIndexText,
    /loadAuthorizedCaseContext\(\s+routeMatch\.caseId,\s+request\.auth,\s+options\.loadCaseContext,\s+"profile_inputs"/,
  );
  assert.match(apiIndexText, /if \(request\.method === "GET"\)/);
  assert.match(
    apiIndexText,
    /const profileInputs = await getCaseProfileInputs\(routeMatch\.caseId, options\);/,
  );
  assert.match(apiIndexText, /return jsonResponse\(200, profileInputs\);/);
  assert.match(apiIndexText, /if \(request\.method === "PATCH"\)/);
  assert.match(apiIndexText, /async function handleCaseProfileDossierRoute\(/);
});

test("docs freeze the thin authenticated profile_inputs write seam as a distinct canonical runtime/write seam", () => {
  assert.match(
    docsText,
    /Thin Authenticated Profile Inputs Write Seam Freeze/i,
  );
  assert.match(
    docsText,
    /thin authenticated `profile_inputs` write seam is now frozen as the baseline runtime\/write seam/i,
  );
  assert.match(
    docsText,
    /only currently evidenced write surface in this freeze is `PATCH \/cases\/:caseId\/profile-inputs`/i,
  );
  assert.match(
    docsText,
    /authenticated\/case-access-controlled boundary behavior at the thin route edge/i,
  );
  assert.match(
    docsText,
    /thin PATCH validation using the existing shared profile input schema export and machine-readable invalid-body rejection path already evidenced by the current route and tests/i,
  );
  assert.match(
    docsText,
    /fail-closed route-edge invariant that the PATCH body `jurisdiction_profile_key` must equal the authorized case-context `jurisdiction_profile_key` before persistence/i,
  );
  assert.match(
    docsText,
    /same-tenant supported-profile mismatch rejects machine-readably with HTTP `409` `ERR_PROFILE_INPUT_JURISDICTION_PROFILE_MISMATCH` before persistence/i,
  );
  assert.match(
    docsText,
    /persisted write\/update passthrough over the canonical profile input snapshot returned by the existing persistence path/i,
  );
  assert.match(
    docsText,
    /no read-only semantics inside this seam/i,
  );
  assert.match(
    docsText,
    /shared API error-envelope seam and its frozen subfamilies remain the governing boundary for machine-readable write error envelopes/i,
  );
  assert.match(
    docsText,
    /adjacent `GET \/cases\/:caseId\/profile-inputs` read seam remains a distinct persisted read boundary/i,
  );
  assert.match(
    docsText,
    /adjacent `profile_dossier` read\/projection seam remains a distinct route boundary/i,
  );
  assert.match(
    docsText,
    /surrounding `profile_inputs` read\/write machinery remains a broader documented runtime area, and this write seam is narrower than that surrounding machinery/i,
  );
  assert.match(
    docsText,
    /does not itself redefine read behavior, profile_dossier projection semantics, or shared-governance derivation of `profile_input_summary` or `profile_input_lane_snapshot`/i,
  );
  assert.match(
    docsText,
    /no undocumented broadening of this write seam into read behavior, dossier projection, derivation, or neutral-model alignment should be introduced/i,
  );
  assert.match(
    docsText,
    /the seam should remain a thin authenticated persisted write boundary unless explicit contract detail changes/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, write semantics, schema behavior, or fail-closed behavior/i,
  );

  assert.match(apiIndexText, /async function handleCaseProfileInputsRoute\(/);
  assert.match(
    apiIndexText,
    /loadAuthorizedCaseContext\(\s+routeMatch\.caseId,\s+request\.auth,\s+options\.loadCaseContext,\s+"profile_inputs"/,
  );
  assert.match(apiIndexText, /if \(request\.method === "PATCH"\)/);
  assert.match(apiIndexText, /validateProfileInputSnapshot\(request\.body\)/);
  assert.match(
    apiIndexText,
    /request\.body\.jurisdiction_profile_key !==\s+authorization\.caseContext\.jurisdiction_profile_key/,
  );
  assert.match(
    apiIndexText,
    /ERR_PROFILE_INPUT_JURISDICTION_PROFILE_MISMATCH/,
  );
  assert.match(
    apiIndexText,
    /const profileInputs = await upsertCaseProfileInputs\(\s+routeMatch\.caseId,\s+request\.body,\s+options,\s+\);/,
  );
  assert.match(apiIndexText, /return jsonResponse\(200, profileInputs\);/);
  assert.match(apiIndexText, /if \(request\.method === "GET"\)/);
  assert.match(apiIndexText, /async function handleCaseProfileDossierRoute\(/);
});

test("successful GET for a tenant-owned SWE_BODELNING case with persisted inputs", async () => {
  const storageDir = createStorageDir();
  const body = createValidSnapshot();
  const loadCaseContext = createCaseContextLoader({
    "case-1": {
      tenant_id: "tenant-1",
      jurisdiction_profile_key: "SWE_BODELNING",
    },
  });

  await handleCaseProfileInputsRoute(
    {
      method: "PATCH",
      path: "/cases/case-1/profile-inputs",
      auth: { tenantId: "tenant-1" },
      body,
    },
    { loadCaseContext, storageDir },
  );

  const response = await handleCaseProfileInputsRoute(
    {
      method: "GET",
      path: "/cases/case-1/profile-inputs",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );

  assert.equal(response.status, 200);
  assert.deepEqual(response.body, body);
});

test("successful PATCH for a tenant-owned SWE_BODELNING case with valid input", async () => {
  const storageDir = createStorageDir();
  const body = createValidSnapshot();
  const response = await handleCaseProfileInputsRoute(
    {
      method: "PATCH",
      path: "/cases/case-2/profile-inputs",
      auth: { tenantId: "tenant-1" },
      body,
    },
    {
      loadCaseContext: createCaseContextLoader({
        "case-2": {
          tenant_id: "tenant-1",
          jurisdiction_profile_key: "SWE_BODELNING",
        },
      }),
      storageDir,
    },
  );

  assert.equal(response.status, 200);
  assert.deepEqual(response.body, body);
});

test("invalid input shape rejection", async () => {
  const invalidBody = createValidSnapshot();
  delete invalidBody.profile_input_summary;

  const response = await handleCaseProfileInputsRoute(
    {
      method: "PATCH",
      path: "/cases/case-3/profile-inputs",
      auth: { tenantId: "tenant-1" },
      body: invalidBody,
    },
    {
      loadCaseContext: createCaseContextLoader({
        "case-3": {
          tenant_id: "tenant-1",
          jurisdiction_profile_key: "SWE_BODELNING",
        },
      }),
      storageDir: createStorageDir(),
    },
  );

  assert.equal(response.status, 422);
  assert.equal(response.body.error.code, "ERR_PROFILE_INPUT_INVALID");
});

test("invalid evidence-reference field shape rejection", async () => {
  const invalidBody = createValidSnapshot();
  invalidBody.profile_input_lane_snapshot.shared_use.evidence_object_ids = {
    id: "evidence-3",
  };

  const response = await handleCaseProfileInputsRoute(
    {
      method: "PATCH",
      path: "/cases/case-3b/profile-inputs",
      auth: { tenantId: "tenant-1" },
      body: invalidBody,
    },
    {
      loadCaseContext: createCaseContextLoader({
        "case-3b": {
          tenant_id: "tenant-1",
          jurisdiction_profile_key: "SWE_BODELNING",
        },
      }),
      storageDir: createStorageDir(),
    },
  );

  assert.equal(response.status, 422);
  assert.equal(response.body.error.code, "ERR_PROFILE_INPUT_INVALID");
  assert.equal(
    response.body.error.field,
    "profile_input_lane_snapshot.shared_use.evidence_object_ids",
  );
});

test("tenant/case isolation rejection", async () => {
  const response = await handleCaseProfileInputsRoute(
    {
      method: "GET",
      path: "/cases/case-4/profile-inputs",
      auth: { tenantId: "tenant-1" },
    },
    {
      loadCaseContext: createCaseContextLoader({
        "case-4": {
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

test("malformed percent-encoded case ids fail closed with ERR_ROUTE_NOT_FOUND before route logic runs", async () => {
  let loadCaseContextCalls = 0;

  const response = await handleCaseProfileInputsRoute(
    {
      method: "GET",
      path: "/cases/%E0%A4%A/profile-inputs",
      auth: { tenantId: "tenant-1" },
    },
    {
      loadCaseContext: async () => {
        loadCaseContextCalls += 1;
        return null;
      },
      storageDir: createStorageDir(),
    },
  );

  assert.equal(loadCaseContextCalls, 0);
  assert.equal(response.status, 404);
  assert.deepEqual(response.body, {
    error: {
      code: "ERR_ROUTE_NOT_FOUND",
    },
  });
});

test("same-tenant supported-profile mismatch is rejected before persistence", async () => {
  const storageDir = createStorageDir();
  const response = await handleCaseProfileInputsRoute(
    {
      method: "PATCH",
      path: "/cases/case-4b/profile-inputs",
      auth: { tenantId: "tenant-1" },
      body: createCMDValidSnapshot(),
    },
    {
      loadCaseContext: createCaseContextLoader({
        "case-4b": {
          tenant_id: "tenant-1",
          jurisdiction_profile_key: "SWE_BODELNING",
        },
      }),
      storageDir,
    },
  );

  assert.equal(response.status, 409);
  assert.equal(
    response.body.error.code,
    "ERR_PROFILE_INPUT_JURISDICTION_PROFILE_MISMATCH",
  );
  assert.deepEqual(response.body.error, {
    case_id: "case-4b",
    code: "ERR_PROFILE_INPUT_JURISDICTION_PROFILE_MISMATCH",
    jurisdiction_profile_key: "CMD_PROFILE",
    expected_jurisdiction_profile_key: "SWE_BODELNING",
  });
  assert.equal(
    fs.existsSync(path.join(storageDir, "case-profile-inputs.json")),
    false,
  );

  const getResponse = await handleCaseProfileInputsRoute(
    {
      method: "GET",
      path: "/cases/case-4b/profile-inputs",
      auth: { tenantId: "tenant-1" },
    },
    {
      loadCaseContext: createCaseContextLoader({
        "case-4b": {
          tenant_id: "tenant-1",
          jurisdiction_profile_key: "SWE_BODELNING",
        },
      }),
      storageDir,
    },
  );

  assert.equal(getResponse.status, 404);
  assert.equal(getResponse.body.error.code, "ERR_PROFILE_INPUTS_NOT_FOUND");
});

test("non-SWE_BODELNING case/profile is rejected machine-readably", async () => {
  const response = await handleCaseProfileInputsRoute(
    {
      method: "GET",
      path: "/cases/case-5/profile-inputs",
      auth: { tenantId: "tenant-1" },
    },
    {
      loadCaseContext: createCaseContextLoader({
        "case-5": {
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

test("persisted roundtrip preserves the expected summary and lane snapshot shape", async () => {
  const storageDir = createStorageDir();
  const body = createValidSnapshot();
  const loadCaseContext = createCaseContextLoader({
    "case-6": {
      tenant_id: "tenant-1",
      jurisdiction_profile_key: "SWE_BODELNING",
    },
  });

  await handleCaseProfileInputsRoute(
    {
      method: "PATCH",
      path: "/cases/case-6/profile-inputs",
      auth: { tenantId: "tenant-1" },
      body,
    },
    { loadCaseContext, storageDir },
  );

  const response = await handleCaseProfileInputsRoute(
    {
      method: "GET",
      path: "/cases/case-6/profile-inputs",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );

  assert.deepEqual(response.body.profile_input_summary, body.profile_input_summary);
  assert.deepEqual(
    response.body.profile_input_lane_snapshot,
    body.profile_input_lane_snapshot,
  );
});

test("no readiness behavior changes are introduced by this slice", () => {
  const workerEntries = fs.readdirSync(path.join(__dirname, "..", "workers", "analyze"));
  assert.deepEqual(workerEntries, [".gitkeep"]);
});
