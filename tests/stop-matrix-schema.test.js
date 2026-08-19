const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const schema = require("../schemas/stop-matrix-model.json");
const stopOutcomeModel = require("../schemas/stop-outcome-model.json");
const {
  stopMatrixModel,
  validateStopMatrixModel,
} = require("../packages/schemas/src/index.js");

const docsPath = path.join(
  __dirname,
  "..",
  "docs",
  "MODEL_INFORMATION_PRINCIPLES_v1.md",
);
const docsText = fs.readFileSync(docsPath, "utf8");

test("the stop-matrix schema accepts the documented canonical principle-level cases", () => {
  const payload = {
    matrix_entries: [
      {
        condition_key: "missing_required_input",
        canonical_stop_outcomes: [
          { stop_outcome: "blocked" },
          { stop_outcome: "insufficient_input" },
        ],
      },
      {
        condition_key: "unsupported_profile_surface_or_capability",
        canonical_stop_outcomes: [{ stop_outcome: "unsupported" }],
      },
      {
        condition_key: "inconsistent_or_ambiguous_critical_information",
        canonical_stop_outcomes: [
          { stop_outcome: "blocked" },
          { stop_outcome: "requires_human_review" },
        ],
      },
      {
        condition_key: "unsourced_or_unverified_information_offered_as_settled",
        canonical_stop_outcomes: [
          { stop_outcome: "blocked" },
          { stop_outcome: "requires_human_review" },
        ],
      },
    ],
  };

  assert.deepEqual(schema.required, ["matrix_entries"]);
  assert.deepEqual(Object.keys(schema.properties), ["matrix_entries"]);
  assert.deepEqual(validateStopMatrixModel(payload), payload);
});

test("the stop-matrix schema aligns with the existing stop-outcome model", () => {
  assert.equal(
    schema.$defs.stopMatrixEntry.properties.canonical_stop_outcomes.items.$ref,
    "./stop-outcome-model.json",
  );
  assert.deepEqual(stopOutcomeModel.required, ["stop_outcome"]);
});

test("packages/schemas exports the stop-matrix schema and validator", () => {
  assert.deepEqual(stopMatrixModel, schema);
  assert.equal(typeof validateStopMatrixModel, "function");
});

test("docs describe the same stop-matrix surface", () => {
  assert.match(
    docsText,
    /canonical reusable schema surface for this v1 stop-matrix object is defined in\s*`schemas\/stop-matrix-model\.json`/i,
  );
  assert.match(docsText, /exported through `packages\/schemas`/);
  assert.match(docsText, /exactly one required `matrix_entries` field/i);
  assert.match(docsText, /`missing_required_input`/);
  assert.match(docsText, /`unsupported_profile_surface_or_capability`/);
  assert.match(docsText, /`inconsistent_or_ambiguous_critical_information`/);
  assert.match(
    docsText,
    /`unsourced_or_unverified_information_offered_as_settled`/,
  );
  assert.match(docsText, /`schemas\/stop-outcome-model\.json`/);
});

test("no runtime behavior changes are introduced", () => {
  const workerEntries = fs.readdirSync(path.join(__dirname, "..", "workers", "analyze"));
  assert.deepEqual(workerEntries, [".gitkeep"]);
});
