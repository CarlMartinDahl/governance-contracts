const test = require("node:test");
const assert = require("node:assert/strict");
const path = require("node:path");
const fs = require("node:fs");

const schema = require("../schemas/swe-bodelning-profile-input.json");
const {
  sweBodelningProfileInput,
  validateSWEBodelningProfileInputSnapshot,
} = require("../packages/schemas/src/index.js");

const expectedLaneKeys = [
  "economic_contribution",
  "shared_use",
  "shared_intent",
];

test("canonical SWE_BODELNING schema includes the three required lane keys", () => {
  assert.equal(schema.properties.jurisdiction_profile_key.const, "SWE_BODELNING");
  assert.deepEqual(
    schema.properties.profile_input_lane_snapshot.required,
    expectedLaneKeys,
  );
  assert.deepEqual(
    Object.keys(schema.properties.profile_input_lane_snapshot.properties),
    expectedLaneKeys,
  );
});

test("schema includes profile_input_summary", () => {
  assert.ok(schema.properties.profile_input_summary);
  assert.deepEqual(
    schema.properties.profile_input_summary.required,
    ["required_lane_count", "lanes_with_value_count", "missing_value_lane_keys"],
  );
});

test("schema includes profile_input_lane_snapshot", () => {
  assert.ok(schema.properties.profile_input_lane_snapshot);
  assert.equal(
    schema.properties.profile_input_lane_snapshot.additionalProperties,
    false,
  );
});

test("schema accepts evidence references for each lane", () => {
  assert.equal(
    schema.$defs.laneSnapshotEntry.properties.evidence_object_ids.type,
    "array",
  );

  const validSnapshot = {
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

  assert.deepEqual(
    validateSWEBodelningProfileInputSnapshot(validSnapshot),
    validSnapshot,
  );
});

test("packages/schemas exports the canonical schema", () => {
  assert.deepEqual(sweBodelningProfileInput, schema);
});

test("no runtime behavior was introduced by this slice", () => {
  const workerEntries = fs.readdirSync(path.join(__dirname, "..", "workers", "analyze"));
  assert.deepEqual(workerEntries, [".gitkeep"]);
});
