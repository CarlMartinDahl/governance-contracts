"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const candidateSchema = require("../schemas/controlled-synthetic-red-team-result-envelope.json");
const resultSchema = require("../schemas/controlled-synthetic-red-team-result-envelope-validator-result.json");
const validatorModule = require("../packages/schemas/src/controlled-synthetic-red-team-result-envelope-validator.js");
const packageSchemas = require("../packages/schemas/src/index.js");

const exportName = "validateControlledSyntheticRedTeamResultEnvelope";
const packageIndexPath = path.join(
  __dirname,
  "..",
  "packages",
  "schemas",
  "src",
  "index.js",
);
const retainedSiblingDenials = [
  "controlledSyntheticRedTeamResultEnvelopeValidator",
  "getControlledSyntheticRedTeamResultEnvelopeValidator",
  "controlledSyntheticRedTeamResultEnvelopeValidatorRegistry",
];

test("package exports the exact unary validator function by reference", () => {
  assert.deepEqual(Object.keys(validatorModule), [exportName]);
  assert.equal(typeof validatorModule[exportName], "function");
  assert.equal(validatorModule[exportName].length, 1);
  assert.strictEqual(packageSchemas[exportName], validatorModule[exportName]);
});

test("package index contains one static validator binding and one shorthand export", () => {
  const indexText = fs.readFileSync(packageIndexPath, "utf8");
  const occurrences = indexText.match(
    /\bvalidateControlledSyntheticRedTeamResultEnvelope\b/gu,
  ) ?? [];

  assert.equal((indexText.match(/\n/gu) ?? []).length, 13165);
  assert.equal(occurrences.length, 2);
  assert.match(
    indexText,
    /\{ validateControlledSyntheticRedTeamResultEnvelope \} = require\("\.\/controlled-synthetic-red-team-result-envelope-validator\.js"\)/u,
  );
  assert.match(
    indexText,
    /controlledSyntheticRedTeamResultEnvelope, controlledSyntheticRedTeamResultEnvelopeValidatorResult, validateControlledSyntheticRedTeamResultEnvelope,/u,
  );
});

test("candidate and result schema package exports preserve exact object identity", () => {
  assert.strictEqual(
    packageSchemas.controlledSyntheticRedTeamResultEnvelope,
    candidateSchema,
  );
  assert.strictEqual(
    packageSchemas.controlledSyntheticRedTeamResultEnvelopeValidatorResult,
    resultSchema,
  );
});

test("validator object lookup and dispatch sibling names remain absent", () => {
  for (const exportName of retainedSiblingDenials) {
    assert.equal(Object.hasOwn(packageSchemas, exportName), false, exportName);
  }
});
