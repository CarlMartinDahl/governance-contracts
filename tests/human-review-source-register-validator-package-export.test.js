"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const candidateSchema = require("../schemas/human-review-source-register.json");
const resultSchema = require("../schemas/human-review-source-register-validator-result.json");
const validatorModule = require("../packages/schemas/src/human-review-source-register-validator.js");
const packageSchemas = require("../packages/schemas/src/index.js");

const exportName = "validateHumanReviewSourceRegister";
const packageIndexPath = path.join(
  __dirname,
  "..",
  "packages",
  "schemas",
  "src",
  "index.js",
);
const scaffoldPath = path.join(
  __dirname,
  "..",
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_VALIDATOR_HELPER_PACKAGE_EXPORT_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
);
const retainedSiblingDenials = [
  "humanReviewSourceRegisterValidator",
  "getHumanReviewSourceRegisterValidator",
  "humanReviewSourceRegisterValidatorRegistry",
];

test("package exports the exact unary Source Register validator by reference", () => {
  assert.deepEqual(Object.keys(validatorModule), [exportName]);
  assert.equal(typeof validatorModule[exportName], "function");
  assert.equal(validatorModule[exportName].length, 1);
  assert.strictEqual(packageSchemas[exportName], validatorModule[exportName]);
});

test("package index contains one static validator binding and one direct export", () => {
  const indexText = fs.readFileSync(packageIndexPath, "utf8");
  const occurrences =
    indexText.match(/\bvalidateHumanReviewSourceRegister\b/gu) ?? [];

  assert.equal((indexText.match(/\n/gu) ?? []).length, 13165);
  assert.equal(occurrences.length, 3);
  assert.match(
    indexText,
    /\{ validateHumanReviewSourceRegister \} = require\("\.\/human-review-source-register-validator\.js"\)/u,
  );
  assert.match(
    indexText,
    /module\.exports\.validateHumanReviewSourceRegister = validateHumanReviewSourceRegister/u,
  );
});

test("candidate and result schema package exports preserve exact object identity", () => {
  assert.strictEqual(packageSchemas.humanReviewSourceRegister, candidateSchema);
  assert.strictEqual(
    packageSchemas.humanReviewSourceRegisterValidatorResult,
    resultSchema,
  );
});

test("validator object lookup and registry sibling names remain absent", () => {
  for (const siblingName of retainedSiblingDenials) {
    assert.equal(Object.hasOwn(packageSchemas, siblingName), false, siblingName);
  }
});

test("package export remains anchored to the exact contract-only scaffold", () => {
  const scaffoldText = fs.readFileSync(scaffoldPath, "utf8");

  assert.match(scaffoldText, /FUTURE_PACKAGE_EXPORT_FILE_COUNT:\n10/u);
  assert.match(scaffoldText, /FUTURE_PACKAGE_EXPORT_DENIAL_TRANSITION_COUNT:\n8/u);
  assert.match(scaffoldText, /RETAINED_PACKAGE_BEHAVIOR_SIBLING_DENIAL_COUNT:\n3/u);
  assert.match(scaffoldText, /strictly reference-equal/u);
  assert.match(scaffoldText, /no consumer, registry, lookup, dispatch, persistence, API/u);
  assert.match(
    scaffoldText,
    /TRACKED_DOCS_ONLY_REFERENCE_EQUIVALENT_PACKAGE_EXPORT_SCOPE_DEFINED/u,
  );
});
