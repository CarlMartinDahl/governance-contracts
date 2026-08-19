const test = require("node:test");
const assert = require("node:assert/strict");
const path = require("node:path");
const fs = require("node:fs");

const {
  deriveSWEBodelningProfileInputLaneSnapshot,
  deriveSWEBodelningProfileInputSummary,
  deriveSWEBodelningProfileInputSnapshot,
} = require("../packages/governance/src/index.js");
const { handleCaseProfileInputsRoute } = require("../apps/api/src/index.js");

function createInput(overrides = {}) {
  return {
    jurisdiction_profile_key: "SWE_BODELNING",
    profile_input_summary: {
      required_lane_count: 3,
      lanes_with_value_count: 0,
      missing_value_lane_keys: [
        "economic_contribution",
        "shared_use",
        "shared_intent",
      ],
    },
    profile_input_lane_snapshot: {
      economic_contribution: {
        has_value: true,
        value: "documented",
      },
      shared_use: {
        has_value: false,
        value: null,
      },
      shared_intent: {
        has_value: true,
        value: "planned",
      },
    },
    ...overrides,
  };
}

test("shared governance derives deterministic profile_input_summary", () => {
  const input = createInput();

  assert.deepEqual(deriveSWEBodelningProfileInputSummary(input), {
    required_lane_count: 3,
    lanes_with_value_count: 2,
    missing_value_lane_keys: ["shared_use"],
  });
});

test("shared governance derives deterministic profile_input_lane_snapshot", () => {
  const input = createInput();

  assert.deepEqual(deriveSWEBodelningProfileInputLaneSnapshot(input), {
    economic_contribution: {
      has_value: true,
      value: "documented",
    },
    shared_use: {
      has_value: false,
      value: null,
    },
    shared_intent: {
      has_value: true,
      value: "planned",
    },
  });
});

test("API read/write surfaces use the same canonical derived shape", async () => {
  const storageDir = fs.mkdtempSync(path.join(require("node:os").tmpdir(), "jur-governance-"));
  const loadCaseContext = async () => ({
    tenant_id: "tenant-1",
    jurisdiction_profile_key: "SWE_BODELNING",
  });
  const input = createInput({
    profile_input_summary: {
      required_lane_count: 3,
      lanes_with_value_count: 0,
      missing_value_lane_keys: ["economic_contribution", "shared_use", "shared_intent"],
    },
  });

  const patchResponse = await handleCaseProfileInputsRoute(
    {
      method: "PATCH",
      path: "/cases/case-1/profile-inputs",
      auth: { tenantId: "tenant-1" },
      body: input,
    },
    { loadCaseContext, storageDir },
  );

  const expected = deriveSWEBodelningProfileInputSnapshot(input);

  assert.equal(patchResponse.status, 200);
  assert.deepEqual(patchResponse.body, expected);

  const getResponse = await handleCaseProfileInputsRoute(
    {
      method: "GET",
      path: "/cases/case-1/profile-inputs",
      auth: { tenantId: "tenant-1" },
    },
    { loadCaseContext, storageDir },
  );

  assert.equal(getResponse.status, 200);
  assert.deepEqual(getResponse.body, expected);
});

test("non-SWE_BODELNING behavior remains unchanged", () => {
  assert.throws(
    () =>
      deriveSWEBodelningProfileInputSnapshot(
        createInput({ jurisdiction_profile_key: "SWE_OTHER" }),
      ),
    (error) => {
      assert.equal(error.code, "ERR_UNSUPPORTED_JURISDICTION_PROFILE");
      return true;
    },
  );
});

test("no readiness behavior changes are introduced by this slice", () => {
  const workerEntries = fs.readdirSync(path.join(__dirname, "..", "workers", "analyze"));
  assert.deepEqual(workerEntries, [".gitkeep"]);
});
