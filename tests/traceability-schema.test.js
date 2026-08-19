const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const schema = require("../schemas/traceability-model.json");
const {
  traceabilityModel,
  validateTraceabilityModel,
} = require("../packages/schemas/src/index.js");

const docsPath = path.join(
  __dirname,
  "..",
  "docs",
  "MODEL_INFORMATION_PRINCIPLES_v1.md",
);
const docsText = fs.readFileSync(docsPath, "utf8");

test("the traceability schema accepts the documented canonical minimal surface", () => {
  const payload = {
    input_references: ["case-profile-inputs/case-123"],
    documented_rule_references: [
      "docs/MODEL_INFORMATION_PRINCIPLES_v1.md#traceability-principle",
    ],
    canonical_output_references: ["release-eval/case-123/latest"],
    change_causes: ["changed_input", "changed_rule"],
  };

  assert.deepEqual(schema.required, [
    "input_references",
    "documented_rule_references",
    "canonical_output_references",
  ]);
  assert.deepEqual(Object.keys(schema.properties), [
    "input_references",
    "documented_rule_references",
    "canonical_output_references",
    "change_causes",
  ]);
  assert.deepEqual(validateTraceabilityModel(payload), payload);
});

test("the traceability schema rejects structurally invalid traceability objects", () => {
  assert.throws(
    () =>
      validateTraceabilityModel({
        input_references: [],
        documented_rule_references: ["docs/MODEL_INFORMATION_PRINCIPLES_v1.md"],
        canonical_output_references: ["profile-dossier/case-123/latest"],
      }),
    (error) =>
      error &&
      error.code === "ERR_TRACEABILITY_MODEL_INVALID" &&
      error.details.field === "input_references",
  );
});

test("packages/schemas exports the traceability schema and validator", () => {
  assert.deepEqual(traceabilityModel, schema);
  assert.equal(typeof validateTraceabilityModel, "function");
});

test("docs describe the same traceability surface", () => {
  assert.match(
    docsText,
    /canonical reusable schema surface for this v1 traceability object is defined in\s*`schemas\/traceability-model\.json`/i,
  );
  assert.match(docsText, /exported through `packages\/schemas`/);
  assert.match(docsText, /required `input_references`, `documented_rule_references`, and\s*`canonical_output_references` arrays/i);
  assert.match(docsText, /optional `change_causes`/i);
  assert.match(docsText, /`changed_input`/);
  assert.match(docsText, /`changed_support`/);
  assert.match(docsText, /`changed_rule`/);
});

test("no runtime behavior changes are introduced", () => {
  const workerEntries = fs.readdirSync(path.join(__dirname, "..", "workers", "analyze"));
  assert.deepEqual(workerEntries, [".gitkeep"]);
});
