"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const schema = require("../schemas/human-review-chronology.json");
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
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_v1.md",
);
const exportName = "humanReviewChronology";

const blockedSiblingExports = [
  "humanReviewChronologyValidator",
  "getHumanReviewChronologyValidator",
  "humanReviewChronologyValidatorRegistry",
];

test("packages/schemas exports the Human Review Chronology schema object", () => {
  assert.equal(Object.hasOwn(packageSchemas, exportName), true);
  assert.deepEqual(packageSchemas[exportName], schema);
  assert.equal(
    packageSchemas[exportName].$id,
    "https://governance-contracts.invalid/schemas/human-review-chronology.json",
  );
  assert.equal(
    packageSchemas[exportName].title,
    "Human Review Chronology Contract Scaffold",
  );
});

test("package export preserves the exact Review Chronology shape", () => {
  const exportedSchema = packageSchemas[exportName];
  const chronologyEntry = exportedSchema.$defs.chronologyEntry;

  assert.deepEqual(exportedSchema.required, [
    "contract_id",
    "contract_version",
    "packet_ref",
    "entries",
  ]);
  assert.equal(Object.keys(exportedSchema.properties).length, 4);
  assert.deepEqual(chronologyEntry.required, [
    "entry_ref",
    "review_state",
    "temporal_status",
    "declared_temporal_text",
    "review_text",
    "source_refs",
  ]);
  assert.equal(Object.keys(chronologyEntry.properties).length, 6);
  assert.equal(chronologyEntry.properties.review_state.enum.length, 4);
  assert.equal(chronologyEntry.properties.temporal_status.enum.length, 2);
  assert.equal(chronologyEntry.oneOf.length, 2);
  assert.equal(chronologyEntry.properties.source_refs.uniqueItems, true);
});

test("package export does not create validator object or dispatch siblings", () => {
  for (const blockedExport of blockedSiblingExports) {
    assert.equal(Object.hasOwn(packageSchemas, blockedExport), false, blockedExport);
  }
});

test("package index uses one static schema binding and one schema-object export", () => {
  const indexText = fs.readFileSync(packageIndexPath, "utf8");
  const occurrences = indexText.match(/\bhumanReviewChronology\b/gu) ?? [];

  assert.equal(occurrences.length, 3);
  assert.match(
    indexText,
    /humanReviewChronology = require\("\.\.\/\.\.\/\.\.\/schemas\/human-review-chronology\.json"\)/u,
  );
  assert.match(
    indexText,
    /module\.exports\.humanReviewChronology = humanReviewChronology/u,
  );
});

test("package export remains anchored to the docs-only scope boundary", () => {
  const docsText = fs.readFileSync(scopeDocPath, "utf8");

  assert.match(
    docsText,
    /FUTURE_PACKAGE_SCHEMA_EXPORT_NAME:\nhumanReviewChronology/u,
  );
  assert.match(
    docsText,
    /HUMAN_REVIEW_CHRONOLOGY_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_STATUS:\nTRACKED_DOCS_ONLY_PACKAGE_SCHEMA_EXPORT_SCOPE_DEFINED/u,
  );
  assert.match(docsText, /Human\/professional\nreview remains the release gate/u);
});
