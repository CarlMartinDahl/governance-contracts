"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const schema = require("../schemas/human-review-chronology-source-register-cross-reference-result.json");
const chronologyResultSchema = require("../schemas/human-review-chronology-validator-result.json");
const sourceRegisterResultSchema = require("../schemas/human-review-source-register-validator-result.json");
const packageSchemas = require("../packages/schemas/src/index.js");

const packageIndexPath = path.join(
  __dirname,
  "..",
  "packages",
  "schemas",
  "src",
  "index.js",
);
const scopeDocPath = path.join(
  __dirname,
  "..",
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_SOURCE_REGISTER_CROSS_REFERENCE_RESULT_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_v1.md",
);
const proofTransitionDocPath = path.join(
  __dirname,
  "..",
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_SOURCE_REGISTER_CROSS_REFERENCE_RESULT_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
);
const exportName =
  "humanReviewChronologySourceRegisterCrossReferenceResult";
const childResultExports = [
  ["humanReviewChronologyValidatorResult", chronologyResultSchema],
  ["humanReviewSourceRegisterValidatorResult", sourceRegisterResultSchema],
];

test("packages/schemas exports the exact cross-reference result schema object", () => {
  assert.equal(Object.hasOwn(packageSchemas, exportName), true);
  assert.strictEqual(packageSchemas[exportName], schema);
  assert.deepEqual(packageSchemas[exportName], schema);
  assert.equal(
    packageSchemas[exportName].$id,
    "https://governance-contracts.invalid/schemas/human-review-chronology-source-register-cross-reference-result.json",
  );
  assert.equal(
    packageSchemas[exportName].title,
    "Human Review Chronology Source Register Cross-Reference Result Contract",
  );
});

test("package export preserves the exact structural result contract", () => {
  const exportedSchema = packageSchemas[exportName];

  assert.deepEqual(exportedSchema.required, [
    "valid",
    "contractKind",
    "version",
    "errors",
  ]);
  assert.deepEqual(Object.keys(exportedSchema.properties), [
    "valid",
    "contractKind",
    "version",
    "errors",
  ]);
  assert.equal(exportedSchema.oneOf.length, 2);
  assert.equal(exportedSchema.properties.errors.items.oneOf.length, 5);
  assert.equal(exportedSchema.properties.errors.uniqueItems, true);
  assert.equal(
    exportedSchema.properties.contractKind.const,
    "HUMAN_REVIEW_CHRONOLOGY_SOURCE_REGISTER_CROSS_REFERENCE_BOUNDARY",
  );
  assert.equal(exportedSchema.properties.version.const, "1.0.0");
});

test("child result exports remain identical while cross-reference execution stays outside the package", () => {
  for (const [childExportName, childSchema] of childResultExports) {
    assert.equal(Object.hasOwn(packageSchemas, childExportName), true);
    assert.strictEqual(packageSchemas[childExportName], childSchema);
  }
  assert.equal(
    Object.hasOwn(
      packageSchemas,
      "validateHumanReviewChronologySourceRegisterCrossReference",
    ),
    false,
  );
});

test("package index uses one static binding and one export property", () => {
  const indexText = fs.readFileSync(packageIndexPath, "utf8");
  const occurrences = indexText.match(
    /\bhumanReviewChronologySourceRegisterCrossReferenceResult\b/gu,
  ) ?? [];

  assert.equal(occurrences.length, 3);
  assert.equal((indexText.match(/\n/gu) ?? []).length, 13165);
  assert.match(
    indexText,
    /humanReviewChronologySourceRegisterCrossReferenceResult = require\("\.\.\/\.\.\/\.\.\/schemas\/human-review-chronology-source-register-cross-reference-result\.json"\)/u,
  );
  assert.match(
    indexText,
    /module\.exports\.humanReviewChronologySourceRegisterCrossReferenceResult = humanReviewChronologySourceRegisterCrossReferenceResult/u,
  );
  assert.match(
    indexText,
    /validateHumanReviewSourceRegister = validateHumanReviewSourceRegister; module\.exports\.humanReviewChronologySourceRegisterCrossReferenceResult/u,
  );
});

test("package export remains anchored to scope and proof-transition boundaries", () => {
  const scopeText = fs.readFileSync(scopeDocPath, "utf8");
  const transitionText = fs.readFileSync(proofTransitionDocPath, "utf8");

  assert.match(
    scopeText,
    /FUTURE_CROSS_REFERENCE_RESULT_PACKAGE_SCHEMA_EXPORT_NAME:\nhumanReviewChronologySourceRegisterCrossReferenceResult/u,
  );
  assert.match(scopeText, /PACKAGE_INDEX_BASELINE_LINE_COUNT:\n13165/u);
  assert.match(
    scopeText,
    /FUTURE_CROSS_REFERENCE_RESULT_PACKAGE_EXPORT_SLICE_FILE_COUNT:\n3/u,
  );
  assert.match(
    transitionText,
    /RETAINED_PACKAGE_SCHEMA_EXPORT_LIVE_ABSENCE_ASSERTION_COUNT:\n1/u,
  );
  assert.match(
    transitionText,
    /TRACKED_DOCS_ONLY_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_DEFINED/u,
  );
});

test("static schema export creates no validator runtime or conclusion", () => {
  const scopeText = fs.readFileSync(scopeDocPath, "utf8");

  assert.equal(typeof packageSchemas[exportName], "object");
  assert.match(scopeText, /Exporting a static JSON schema object does not create/u);
  assert.match(scopeText, /VALIDATOR_NOT_CREATED/u);
  assert.match(scopeText, /CROSS_REFERENCE_EXECUTION_NOT_CREATED/u);
  assert.match(scopeText, /NO_RUNTIME_BEHAVIOR_CREATED/u);
  assert.match(scopeText, /HUMAN_PROFESSIONAL_REVIEW_REQUIRED/u);
  assert.match(scopeText, /not actual human review[\s\S]*real-evidence review/u);
});
