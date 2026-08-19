const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const schema = require("../schemas/human-review-state-model.json");
const stopOutcomeSchema = require("../schemas/stop-outcome-model.json");
const {
  humanReviewStateModel,
  validateHumanReviewStateModel,
} = require("../packages/schemas/src/index.js");

const docsPath = path.join(
  __dirname,
  "..",
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_STATE_MODEL_CONTRACT_v1.md",
);
const docsText = fs.readFileSync(docsPath, "utf8");

const canonicalReviewStates = [
  "ASSERTED",
  "APPEARS_IN_SUPPLIED_MATERIAL",
  "NOT_ESTABLISHED",
  "HUMAN_REVIEW_REQUIRED",
];

test("the human-review-state schema accepts exactly the documented states", () => {
  assert.deepEqual(schema.required, ["review_state"]);
  assert.deepEqual(Object.keys(schema.properties), ["review_state"]);
  assert.equal(schema.additionalProperties, false);
  assert.deepEqual(schema.properties.review_state.enum, canonicalReviewStates);

  for (const reviewState of canonicalReviewStates) {
    const payload = { review_state: reviewState };
    assert.equal(validateHumanReviewStateModel(payload), payload);
  }
});

test("the human-review-state validator rejects invalid shape and values", () => {
  for (const payload of [
    { review_state: "asserted" },
    { review_state: "REQUIRES_HUMAN_REVIEW" },
    { review_state: "HUMAN_REVIEW_REQUIRED", score: 1 },
    {},
    [],
    null,
  ]) {
    assert.throws(
      () => validateHumanReviewStateModel(payload),
      (error) => error && error.code === "ERR_HUMAN_REVIEW_STATE_INVALID",
    );
  }
});

test("packages/schemas exports the review-state schema and validator", () => {
  assert.deepEqual(humanReviewStateModel, schema);
  assert.equal(typeof validateHumanReviewStateModel, "function");
});

test("review states remain separate from canonical stop outcomes", () => {
  assert.deepEqual(stopOutcomeSchema.properties.stop_outcome.enum, [
    "blocked",
    "insufficient_input",
    "unsupported",
    "requires_human_review",
  ]);
  assert.equal(
    canonicalReviewStates.includes("requires_human_review"),
    false,
  );
  assert.match(docsText, /NO_STOP_OUTCOME_MAPPING_CREATED/);
  assert.match(docsText, /creates no automatic mapping, conversion, equivalence/i);
});

test("docs preserve the exact contract and no-conclusion boundary", () => {
  assert.match(docsText, /CONTRACT_ONLY/);
  assert.match(docsText, /`schemas\/human-review-state-model\.json`/);
  assert.match(docsText, /exactly one required field, `review_state`/i);

  for (const reviewState of canonicalReviewStates) {
    assert.equal(docsText.includes(`\`${reviewState}\``), true);
  }

  assert.match(docsText, /do not score or determine/i);
  assert.match(docsText, /NO_RUNTIME_BEHAVIOR_CREATED/);
  assert.match(docsText, /Human\/professional review remains the release gate\./);
});

test("no runtime behavior changes are introduced", () => {
  const workerEntries = fs.readdirSync(
    path.join(__dirname, "..", "workers", "analyze"),
  );
  assert.deepEqual(workerEntries, [".gitkeep"]);
});
