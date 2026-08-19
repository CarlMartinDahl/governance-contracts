"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const schema = require("../schemas/human-review-asserted-claim-matrix.json");
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
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_v1.md",
);
const exportName = "humanReviewAssertedClaimMatrix";
const expectedRootFields = ["contract_id", "contract_version", "packet_ref", "claims"];
const expectedClaimFields = [
  "claim_ref",
  "review_state",
  "asserted_claim_text",
  "supplied_material_observation_text",
  "source_refs",
  "chronology_entry_refs",
];
const expectedReviewStates = [
  "ASSERTED",
  "APPEARS_IN_SUPPLIED_MATERIAL",
  "NOT_ESTABLISHED",
  "HUMAN_REVIEW_REQUIRED",
];
const blockedSiblingExports = [
  "humanReviewAssertedClaimMatrixValidator",
  "validateHumanReviewAssertedClaimMatrix",
  "getHumanReviewAssertedClaimMatrixValidator",
  "humanReviewAssertedClaimMatrixValidatorRegistry",
];

test("packages/schemas exports the Human Review Asserted Claim Matrix schema object", () => {
  assert.equal(Object.hasOwn(packageSchemas, exportName), true);
  assert.strictEqual(packageSchemas[exportName], schema);
  assert.deepEqual(packageSchemas[exportName], schema);
  assert.equal(
    packageSchemas[exportName].$id,
    "https://governance-contracts.invalid/schemas/human-review-asserted-claim-matrix.json",
  );
  assert.equal(
    packageSchemas[exportName].title,
    "Human Review Asserted Claim Matrix Contract Scaffold",
  );
});

test("package export preserves the exact Asserted Claim Matrix shape", () => {
  const exportedSchema = packageSchemas[exportName];
  const claimRow = exportedSchema.$defs.claimRow;

  assert.deepEqual(exportedSchema.required, expectedRootFields);
  assert.deepEqual(Object.keys(exportedSchema.properties), expectedRootFields);
  assert.deepEqual(claimRow.required, expectedClaimFields);
  assert.deepEqual(Object.keys(claimRow.properties), expectedClaimFields);
  assert.deepEqual(claimRow.properties.review_state.enum, expectedReviewStates);
  assert.equal(claimRow.oneOf.length, 4);
  assert.equal(
    claimRow.oneOf[3].properties.supplied_material_observation_text.oneOf.length,
    2,
  );
});

test("package export does not create validator or dispatch sibling exports", () => {
  for (const blockedExport of blockedSiblingExports) {
    assert.equal(Object.hasOwn(packageSchemas, blockedExport), false, blockedExport);
  }
});

test("package index uses one static schema binding and one schema-object export", () => {
  const indexText = fs.readFileSync(packageIndexPath, "utf8");
  const occurrences = indexText.match(/\bhumanReviewAssertedClaimMatrix\b/gu) ?? [];

  assert.equal(occurrences.length, 3);
  assert.match(
    indexText,
    /humanReviewAssertedClaimMatrix = require\("\.\.\/\.\.\/\.\.\/schemas\/human-review-asserted-claim-matrix\.json"\)/u,
  );
  assert.match(
    indexText,
    /module\.exports\.humanReviewAssertedClaimMatrix = humanReviewAssertedClaimMatrix/u,
  );
});

test("package export remains anchored to the docs-only scope boundary", () => {
  const docsText = fs.readFileSync(scopeDocPath, "utf8");

  assert.match(
    docsText,
    /FUTURE_PACKAGE_SCHEMA_EXPORT_NAME:\nhumanReviewAssertedClaimMatrix/u,
  );
  assert.match(
    docsText,
    /HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_STATUS:\nTRACKED_DOCS_ONLY_PACKAGE_SCHEMA_EXPORT_SCOPE_DEFINED/u,
  );
  assert.match(docsText, /Human\/professional\nreview remains the release gate/u);
  assert.match(docsText, /NO_RUNTIME_BEHAVIOR_CREATED/u);
});
