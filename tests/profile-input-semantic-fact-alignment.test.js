const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const schema = require("../schemas/profile-input-semantic-fact-alignment.json");
const sweBodelningProfileInput = require("../schemas/swe-bodelning-profile-input.json");
const cmdProfileInput = require("../schemas/cmd-profile-input.json");
const semanticFactModel = require("../schemas/semantic-fact-model.json");
const {
  profileInputSemanticFactAlignment,
  validateProfileInputSemanticFactAlignment,
} = require("../packages/schemas/src/index.js");

const docsPath = path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md");
const docsText = fs.readFileSync(docsPath, "utf8");

function createAlignmentPayload() {
  return {
    alignment_scope: "presence_status_only",
    supported_semantic_fact_dimensions: ["presence_status"],
    unassigned_semantic_fact_dimensions: [
      "source_status",
      "verification_status",
      "dispute_status",
      "consistency_status",
    ],
    SWE_BODELNING_REQUIRED_LANE_WITH_VALUE: {
      jurisdiction_profile_key: "SWE_BODELNING",
      case_key: "required_lane_with_value",
      input_contract_references: [
        "profile_input_lane_snapshot.*.has_value",
        "profile_input_summary.required_lane_count",
        "profile_input_summary.lanes_with_value_count",
        "profile_input_summary.missing_value_lane_keys",
      ],
      canonical_semantic_fact: {
        presence_status: "present",
      },
    },
    SWE_BODELNING_REQUIRED_LANE_MARKED_MISSING: {
      jurisdiction_profile_key: "SWE_BODELNING",
      case_key: "required_lane_marked_missing",
      input_contract_references: [
        "profile_input_lane_snapshot.*.has_value",
        "profile_input_summary.required_lane_count",
        "profile_input_summary.lanes_with_value_count",
        "profile_input_summary.missing_value_lane_keys",
      ],
      canonical_semantic_fact: {
        presence_status: "missing",
      },
    },
    CMD_PROFILE_REQUIRED_LANE_WITH_VALUE: {
      jurisdiction_profile_key: "CMD_PROFILE",
      case_key: "required_lane_with_value",
      input_contract_references: [
        "profile_input_lane_snapshot.*.has_value",
        "profile_input_summary.required_lane_count",
        "profile_input_summary.lanes_with_value_count",
        "profile_input_summary.missing_value_lane_keys",
      ],
      canonical_semantic_fact: {
        presence_status: "present",
      },
    },
    CMD_PROFILE_REQUIRED_LANE_MARKED_MISSING: {
      jurisdiction_profile_key: "CMD_PROFILE",
      case_key: "required_lane_marked_missing",
      input_contract_references: [
        "profile_input_lane_snapshot.*.has_value",
        "profile_input_summary.required_lane_count",
        "profile_input_summary.lanes_with_value_count",
        "profile_input_summary.missing_value_lane_keys",
      ],
      canonical_semantic_fact: {
        presence_status: "missing",
      },
    },
  };
}

test("the current documented required-lane-with-value case has canonical presence_status = present alignment for SWE_BODELNING", () => {
  const payload = createAlignmentPayload();

  assert.deepEqual(validateProfileInputSemanticFactAlignment(payload), payload);
  assert.equal(
    payload.SWE_BODELNING_REQUIRED_LANE_WITH_VALUE.jurisdiction_profile_key,
    "SWE_BODELNING",
  );
  assert.equal(
    payload.SWE_BODELNING_REQUIRED_LANE_WITH_VALUE.case_key,
    "required_lane_with_value",
  );
  assert.deepEqual(
    payload.SWE_BODELNING_REQUIRED_LANE_WITH_VALUE.canonical_semantic_fact,
    {
      presence_status: "present",
    },
  );
  assert.equal(
    sweBodelningProfileInput.properties.profile_input_summary.properties
      .required_lane_count.const,
    3,
  );
  assert.deepEqual(
    sweBodelningProfileInput.properties.profile_input_lane_snapshot.required,
    ["economic_contribution", "shared_use", "shared_intent"],
  );
});

test("the current documented required-lane-with-value case has canonical presence_status = present alignment for CMD_PROFILE", () => {
  const payload = createAlignmentPayload();

  assert.deepEqual(validateProfileInputSemanticFactAlignment(payload), payload);
  assert.equal(
    payload.CMD_PROFILE_REQUIRED_LANE_WITH_VALUE.jurisdiction_profile_key,
    "CMD_PROFILE",
  );
  assert.equal(
    payload.CMD_PROFILE_REQUIRED_LANE_WITH_VALUE.case_key,
    "required_lane_with_value",
  );
  assert.deepEqual(
    payload.CMD_PROFILE_REQUIRED_LANE_WITH_VALUE.canonical_semantic_fact,
    {
      presence_status: "present",
    },
  );
  assert.equal(
    cmdProfileInput.properties.profile_input_summary.properties.required_lane_count
      .const,
    1,
  );
  assert.deepEqual(
    cmdProfileInput.properties.profile_input_lane_snapshot.required,
    ["cmd_primary_signal"],
  );
});

test("the current documented required-lane-missing case has canonical presence_status = missing alignment where docs are concrete enough", () => {
  const payload = createAlignmentPayload();

  assert.deepEqual(validateProfileInputSemanticFactAlignment(payload), payload);
  assert.deepEqual(
    payload.SWE_BODELNING_REQUIRED_LANE_MARKED_MISSING.canonical_semantic_fact,
    {
      presence_status: "missing",
    },
  );
  assert.deepEqual(
    payload.CMD_PROFILE_REQUIRED_LANE_MARKED_MISSING.canonical_semantic_fact,
    {
      presence_status: "missing",
    },
  );
  assert.ok(
    sweBodelningProfileInput.properties.profile_input_summary.properties
      .missing_value_lane_keys.items.enum.includes("shared_intent"),
  );
  assert.ok(
    cmdProfileInput.properties.profile_input_summary.properties
      .missing_value_lane_keys.items.enum.includes("cmd_primary_signal"),
  );
});

test("packages/schemas exports the profile_input semantic-fact alignment surface if applicable", () => {
  assert.deepEqual(profileInputSemanticFactAlignment, schema);
  assert.equal(typeof validateProfileInputSemanticFactAlignment, "function");
  assert.equal(
    schema.$defs.presenceOnlySemanticFact.properties.presence_status.$ref,
    "./semantic-fact-model.json#/properties/presence_status",
  );
  assert.deepEqual(semanticFactModel.properties.presence_status.enum, [
    "present",
    "missing",
  ]);
});

test("docs describe the same alignment and explicitly keep the other four dimensions unassigned", () => {
  assert.match(
    docsText,
    /`schemas\/profile-input-semantic-fact-alignment\.json`, exported through `packages\/schemas`/i,
  );
  assert.match(
    docsText,
    /intentionally limited to\s+the one currently safe dimension, `presence_status`/i,
  );
  assert.match(
    docsText,
    /required lane with value ->\s+`?\{ "presence_status": "present" \}`?/i,
  );
  assert.match(
    docsText,
    /required lane already marked missing in the canonical `profile_input` snapshot\/summary ->\s+`?\{ "presence_status": "missing" \}`?/i,
  );
  assert.match(
    docsText,
    /Raw empty payload content is not independently normalized at the `profile_input` seam\./i,
  );
  assert.match(docsText, /`source_status`/);
  assert.match(docsText, /`verification_status`/);
  assert.match(docsText, /`dispute_status`/);
  assert.match(docsText, /`consistency_status`/);
});

test("no runtime behavior changes are introduced", () => {
  const workerEntries = fs.readdirSync(path.join(__dirname, "..", "workers", "analyze"));
  assert.deepEqual(workerEntries, [".gitkeep"]);
});
