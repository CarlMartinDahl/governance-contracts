const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const schema = require("../schemas/semantic-fact-model.json");
const {
  semanticFactModel,
  validateSemanticFactModel,
} = require("../packages/schemas/src/index.js");

const docsPath = path.join(
  __dirname,
  "..",
  "docs",
  "MODEL_INFORMATION_PRINCIPLES_v1.md",
);
const docsText = fs.readFileSync(docsPath, "utf8");

test("the semantic fact schema accepts the documented canonical dimension object", () => {
  assert.deepEqual(schema.required, [
    "presence_status",
    "source_status",
    "verification_status",
    "dispute_status",
    "consistency_status",
  ]);
  assert.deepEqual(Object.keys(schema.properties), [
    "presence_status",
    "source_status",
    "verification_status",
    "dispute_status",
    "consistency_status",
  ]);

  const payload = {
    presence_status: "present",
    source_status: "sourced",
    verification_status: "verified",
    dispute_status: "undisputed",
    consistency_status: "consistent",
  };

  assert.deepEqual(validateSemanticFactModel(payload), payload);
});

test("the semantic fact schema rejects invalid enum values", () => {
  assert.throws(
    () =>
      validateSemanticFactModel({
        presence_status: "present",
        source_status: "sourced",
        verification_status: "verified",
        dispute_status: "undisputed",
        consistency_status: "contradictory",
      }),
    (error) =>
      error &&
      error.code === "ERR_SEMANTIC_FACT_INVALID" &&
      error.details.field === "consistency_status",
  );
});

test("packages/schemas exports the semantic fact schema and validator", () => {
  assert.deepEqual(semanticFactModel, schema);
  assert.equal(typeof validateSemanticFactModel, "function");
});

test("docs describe the same semantic fact surface", () => {
  assert.match(
    docsText,
    /canonical reusable schema surface for this v1 semantic fact object is defined in\s*`schemas\/semantic-fact-model\.json`/i,
  );
  assert.match(docsText, /exported through `packages\/schemas`/);
  assert.match(docsText, /exactly\s*these five dimension fields/i);
  assert.match(docsText, /`presence_status`/);
  assert.match(docsText, /`source_status`/);
  assert.match(docsText, /`verification_status`/);
  assert.match(docsText, /`dispute_status`/);
  assert.match(docsText, /`consistency_status`/);
});

test("no runtime behavior changes are introduced", () => {
  const workerEntries = fs.readdirSync(path.join(__dirname, "..", "workers", "analyze"));
  assert.deepEqual(workerEntries, [".gitkeep"]);
});
