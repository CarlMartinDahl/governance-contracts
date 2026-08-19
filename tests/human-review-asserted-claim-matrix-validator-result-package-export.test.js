"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const schema = require("../schemas/human-review-asserted-claim-matrix-validator-result.json");
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
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_v1.md",
);
const exportName = "humanReviewAssertedClaimMatrixValidatorResult";
const candidateExportName = "humanReviewAssertedClaimMatrix";
const blockedBehaviorExports = [
  "humanReviewAssertedClaimMatrixValidator",
  "validateHumanReviewAssertedClaimMatrix",
  "getHumanReviewAssertedClaimMatrixValidator",
  "humanReviewAssertedClaimMatrixValidatorRegistry",
];

test("packages/schemas exports the exact Asserted Claim Matrix validator-result schema object", () => {
  assert.equal(Object.hasOwn(packageSchemas, exportName), true);
  assert.strictEqual(packageSchemas[exportName], schema);
  assert.deepEqual(packageSchemas[exportName], schema);
  assert.equal(
    packageSchemas[exportName].$id,
    "https://governance-contracts.invalid/schemas/human-review-asserted-claim-matrix-validator-result.json",
  );
  assert.equal(
    packageSchemas[exportName].title,
    "Human Review Asserted Claim Matrix Validator Result Contract",
  );
});

test("validator-result package export preserves the exact structural contract", () => {
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
  assert.equal(exportedSchema.properties.errors.items.oneOf.length, 8);
  assert.equal(exportedSchema.properties.errors.uniqueItems, true);
  assert.equal(
    exportedSchema.properties.contractKind.const,
    "HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_VALIDATOR_BOUNDARY",
  );
  assert.equal(exportedSchema.properties.version.const, "1.0.0");
});

test("candidate schema remains present while validator and dispatch siblings stay absent", () => {
  assert.equal(Object.hasOwn(packageSchemas, candidateExportName), true);
  assert.equal(
    packageSchemas[candidateExportName].$id,
    "https://governance-contracts.invalid/schemas/human-review-asserted-claim-matrix.json",
  );

  for (const blockedExport of blockedBehaviorExports) {
    assert.equal(Object.hasOwn(packageSchemas, blockedExport), false, blockedExport);
  }
});

test("package index uses one static validator-result binding and one export property", () => {
  const indexText = fs.readFileSync(packageIndexPath, "utf8");
  const occurrences =
    indexText.match(/\bhumanReviewAssertedClaimMatrixValidatorResult\b/gu) ?? [];

  assert.equal(occurrences.length, 3);
  assert.equal((indexText.match(/\n/gu) ?? []).length, 13165);
  assert.match(
    indexText,
    /humanReviewAssertedClaimMatrixValidatorResult = require\("\.\.\/\.\.\/\.\.\/schemas\/human-review-asserted-claim-matrix-validator-result\.json"\)/u,
  );
  assert.match(
    indexText,
    /module\.exports\.humanReviewAssertedClaimMatrixValidatorResult = humanReviewAssertedClaimMatrixValidatorResult/u,
  );
});

test("package export remains anchored to the docs-only scope boundary", () => {
  const docsText = fs.readFileSync(scopeDocPath, "utf8");

  assert.match(
    docsText,
    /FUTURE_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_NAME:\nhumanReviewAssertedClaimMatrixValidatorResult/u,
  );
  assert.match(docsText, /PACKAGE_INDEX_BASELINE_LINE_COUNT:\n13165/u);
  assert.match(
    docsText,
    /HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_STATUS:\nTRACKED_DOCS_ONLY_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_SCOPE_DEFINED/u,
  );
  assert.match(docsText, /Human\/professional\s+review remains the release gate/u);
});
