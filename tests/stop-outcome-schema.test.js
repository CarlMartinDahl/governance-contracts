const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const schema = require("../schemas/stop-outcome-model.json");
const {
  stopOutcomeModel,
  validateStopOutcomeModel,
} = require("../packages/schemas/src/index.js");

const docsPath = path.join(
  __dirname,
  "..",
  "docs",
  "MODEL_INFORMATION_PRINCIPLES_v1.md",
);
const docsText = fs.readFileSync(docsPath, "utf8");

test("the stop-outcome schema accepts the documented canonical outcomes", () => {
  assert.deepEqual(schema.required, ["stop_outcome"]);
  assert.deepEqual(Object.keys(schema.properties), ["stop_outcome"]);

  for (const outcome of [
    "blocked",
    "insufficient_input",
    "unsupported",
    "requires_human_review",
  ]) {
    const payload = { stop_outcome: outcome };
    assert.deepEqual(validateStopOutcomeModel(payload), payload);
  }
});

test("the stop-outcome schema rejects invalid outcome values", () => {
  assert.throws(
    () => validateStopOutcomeModel({ stop_outcome: "halted" }),
    (error) =>
      error &&
      error.code === "ERR_STOP_OUTCOME_INVALID" &&
      error.details.field === "stop_outcome",
  );
});

test("packages/schemas exports the stop-outcome schema and validator", () => {
  assert.deepEqual(stopOutcomeModel, schema);
  assert.equal(typeof validateStopOutcomeModel, "function");
});

test("docs describe the same stop-outcome surface", () => {
  assert.match(
    docsText,
    /canonical reusable schema surface for this v1 stop-outcome object is defined in\s*`schemas\/stop-outcome-model\.json`/i,
  );
  assert.match(docsText, /exported through `packages\/schemas`/);
  assert.match(docsText, /exactly one required `stop_outcome` field/i);
  assert.match(docsText, /`blocked`/);
  assert.match(docsText, /`insufficient_input`/);
  assert.match(docsText, /`unsupported`/);
  assert.match(docsText, /`requires_human_review`/);
});

test("no runtime behavior changes are introduced", () => {
  const workerEntries = fs.readdirSync(path.join(__dirname, "..", "workers", "analyze"));
  assert.deepEqual(workerEntries, [".gitkeep"]);
});
