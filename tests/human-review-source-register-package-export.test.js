"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const schema = require("../schemas/human-review-source-register.json");
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
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_v1.md",
);
const exportName = "humanReviewSourceRegister";

const blockedSiblingExports = [
  "humanReviewSourceRegisterValidator",
  "getHumanReviewSourceRegisterValidator",
  "humanReviewSourceRegisterValidatorRegistry",
];

test("packages/schemas exports the Human Review Source Register schema object", () => {
  assert.equal(Object.hasOwn(packageSchemas, exportName), true);
  assert.deepEqual(packageSchemas[exportName], schema);
  assert.equal(
    packageSchemas[exportName].$id,
    "https://governance-contracts.invalid/schemas/human-review-source-register.json",
  );
  assert.equal(
    packageSchemas[exportName].title,
    "Human Review Source Register Contract Scaffold",
  );
});

test("package export preserves the exact Source Register shape", () => {
  const exportedSchema = packageSchemas[exportName];
  const sourceEntry = exportedSchema.$defs.sourceEntry;

  assert.deepEqual(exportedSchema.required, [
    "contract_id",
    "contract_version",
    "packet_ref",
    "sources",
  ]);
  assert.equal(Object.keys(exportedSchema.properties).length, 4);
  assert.deepEqual(sourceEntry.required, [
    "source_ref",
    "declared_source_type",
    "declared_label",
  ]);
  assert.equal(Object.keys(sourceEntry.properties).length, 3);
  assert.equal(sourceEntry.properties.declared_source_type.enum.length, 7);
});

test("package export does not create validator-object or dispatch sibling exports", () => {
  for (const blockedExport of blockedSiblingExports) {
    assert.equal(Object.hasOwn(packageSchemas, blockedExport), false, blockedExport);
  }
});

test("package index uses one static schema binding and one schema-object export", () => {
  const indexText = fs.readFileSync(packageIndexPath, "utf8");
  const occurrences = indexText.match(/\bhumanReviewSourceRegister\b/gu) ?? [];

  assert.equal(occurrences.length, 3);
  assert.match(
    indexText,
    /humanReviewSourceRegister = require\("\.\.\/\.\.\/\.\.\/schemas\/human-review-source-register\.json"\)/u,
  );
  assert.match(
    indexText,
    /module\.exports\.humanReviewSourceRegister = humanReviewSourceRegister/u,
  );
});

test("package export remains anchored to the docs-only scope boundary", () => {
  const docsText = fs.readFileSync(scopeDocPath, "utf8");

  assert.match(
    docsText,
    /FUTURE_PACKAGE_SCHEMA_EXPORT_NAME:\nhumanReviewSourceRegister/u,
  );
  assert.match(
    docsText,
    /HUMAN_REVIEW_SOURCE_REGISTER_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_STATUS:\nTRACKED_DOCS_ONLY_PACKAGE_SCHEMA_EXPORT_SCOPE_DEFINED/u,
  );
  assert.match(docsText, /Human\/professional\nreview remains the release gate/u);
});
