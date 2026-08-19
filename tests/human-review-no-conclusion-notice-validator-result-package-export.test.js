"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const schema = require("../schemas/human-review-no-conclusion-notice-validator-result.json");
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
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_v1.md",
);
const transitionDocPath = path.join(
  __dirname,
  "..",
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
);
const exportName = "humanReviewNoConclusionNoticeValidatorResult";
const candidateExportName = "humanReviewNoConclusionNotice";
const blockedBehaviorExports = [
  "humanReviewNoConclusionNoticeValidator",
  "validateHumanReviewNoConclusionNotice",
  "getHumanReviewNoConclusionNoticeValidator",
  "humanReviewNoConclusionNoticeValidatorRegistry",
];

test("packages/schemas exports the exact No-Conclusion Notice validator-result schema object", () => {
  assert.equal(Object.hasOwn(packageSchemas, exportName), true);
  assert.strictEqual(packageSchemas[exportName], schema);
  assert.deepEqual(packageSchemas[exportName], schema);
  assert.equal(
    packageSchemas[exportName].$id,
    "https://governance-contracts.invalid/schemas/human-review-no-conclusion-notice-validator-result.json",
  );
  assert.equal(
    packageSchemas[exportName].title,
    "Human Review No-Conclusion Notice Validator Result Contract",
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
  assert.equal(exportedSchema.properties.errors.items.oneOf.length, 11);
  assert.equal(exportedSchema.properties.errors.uniqueItems, true);
  assert.equal(
    exportedSchema.properties.contractKind.const,
    "HUMAN_REVIEW_NO_CONCLUSION_NOTICE_VALIDATOR_BOUNDARY",
  );
  assert.equal(exportedSchema.properties.version.const, "1.0.0");
});

test("candidate schema remains present while validator and dispatch siblings stay absent", () => {
  assert.equal(Object.hasOwn(packageSchemas, candidateExportName), true);
  assert.equal(
    packageSchemas[candidateExportName].$id,
    "https://governance-contracts.invalid/schemas/human-review-no-conclusion-notice.json",
  );

  for (const blockedExport of blockedBehaviorExports) {
    assert.equal(Object.hasOwn(packageSchemas, blockedExport), false, blockedExport);
  }
});

test("package index uses one static validator-result binding and one export property", () => {
  const indexText = fs.readFileSync(packageIndexPath, "utf8");
  const occurrences =
    indexText.match(/\bhumanReviewNoConclusionNoticeValidatorResult\b/gu) ?? [];

  assert.equal(occurrences.length, 3);
  assert.equal((indexText.match(/\n/gu) ?? []).length, 13165);
  assert.match(
    indexText,
    /humanReviewNoConclusionNoticeValidatorResult = require\("\.\.\/\.\.\/\.\.\/schemas\/human-review-no-conclusion-notice-validator-result\.json"\)/u,
  );
  assert.match(
    indexText,
    /module\.exports\.humanReviewNoConclusionNoticeValidatorResult = humanReviewNoConclusionNoticeValidatorResult/u,
  );
});

test("package export remains anchored to the scope and proof-transition boundaries", () => {
  const scopeText = fs.readFileSync(scopeDocPath, "utf8");
  const transitionText = fs.readFileSync(transitionDocPath, "utf8");

  assert.match(
    scopeText,
    /FUTURE_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_NAME:\nhumanReviewNoConclusionNoticeValidatorResult/u,
  );
  assert.match(scopeText, /PACKAGE_INDEX_BASELINE_LINE_COUNT:\n13165/u);
  assert.match(
    scopeText,
    /HUMAN_REVIEW_NO_CONCLUSION_NOTICE_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_STATUS:\nTRACKED_DOCS_ONLY_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_SCOPE_DEFINED/u,
  );
  assert.match(
    transitionText,
    /HUMAN_REVIEW_NO_CONCLUSION_NOTICE_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_STATUS:\nTRACKED_DOCS_ONLY_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_DEFINED/u,
  );
  assert.match(scopeText, /Human\/professional\nreview remains the release gate/u);
});
