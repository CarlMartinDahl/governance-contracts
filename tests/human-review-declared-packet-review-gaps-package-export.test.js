"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const schema = require("../schemas/human-review-declared-packet-review-gaps.json");
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
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_v1.md",
);
const exportName = "humanReviewDeclaredPacketReviewGaps";
const expectedRootFields = ["contract_id", "contract_version", "packet_ref", "gaps"];
const expectedGapFields = [
  "gap_ref",
  "declaration_origin",
  "declared_gap_text",
  "source_refs",
  "chronology_entry_refs",
  "claim_refs",
];
const expectedReferenceFields = [
  "source_refs",
  "chronology_entry_refs",
  "claim_refs",
];
const blockedSiblingExports = [
  "humanReviewDeclaredPacketReviewGapsValidator",
  "validateHumanReviewDeclaredPacketReviewGaps",
  "getHumanReviewDeclaredPacketReviewGapsValidator",
  "humanReviewDeclaredPacketReviewGapsValidatorRegistry",
];

test("packages/schemas exports the Human Review Declared Packet Review Gaps schema object", () => {
  assert.equal(Object.hasOwn(packageSchemas, exportName), true);
  assert.strictEqual(packageSchemas[exportName], schema);
  assert.deepEqual(packageSchemas[exportName], schema);
  assert.equal(
    packageSchemas[exportName].$id,
    "https://governance-contracts.invalid/schemas/human-review-declared-packet-review-gaps.json",
  );
  assert.equal(
    packageSchemas[exportName].title,
    "Human Review Declared Packet Review Gaps Contract Scaffold",
  );
});

test("package export preserves the exact Declared Packet Review Gaps shape", () => {
  const exportedSchema = packageSchemas[exportName];
  const gapRow = exportedSchema.$defs.gapRow;

  assert.deepEqual(exportedSchema.required, expectedRootFields);
  assert.deepEqual(Object.keys(exportedSchema.properties), expectedRootFields);
  assert.equal(exportedSchema.properties.gaps.minItems, 0);
  assert.equal(Object.hasOwn(exportedSchema.properties.gaps, "uniqueItems"), false);
  assert.deepEqual(gapRow.required, expectedGapFields);
  assert.deepEqual(Object.keys(gapRow.properties), expectedGapFields);
  assert.equal(gapRow.properties.declaration_origin.const, "HUMAN_DECLARED");
  assert.equal(gapRow.properties.declared_gap_text.minLength, 1);
  assert.equal(gapRow.properties.declared_gap_text.maxLength, 1000);
  for (const referenceField of expectedReferenceFields) {
    assert.equal(gapRow.properties[referenceField].minItems, 0, referenceField);
    assert.equal(gapRow.properties[referenceField].uniqueItems, true, referenceField);
  }
});

test("candidate package export does not create validator or dispatch sibling exports", () => {
  for (const blockedExport of blockedSiblingExports) {
    assert.equal(Object.hasOwn(packageSchemas, blockedExport), false, blockedExport);
  }
});

test("package index uses one static schema binding and one schema-object export", () => {
  const indexText = fs.readFileSync(packageIndexPath, "utf8");
  const occurrences = indexText.match(/\bhumanReviewDeclaredPacketReviewGaps\b/gu) ?? [];

  assert.equal(occurrences.length, 3);
  assert.match(
    indexText,
    /humanReviewDeclaredPacketReviewGaps = require\("\.\.\/\.\.\/\.\.\/schemas\/human-review-declared-packet-review-gaps\.json"\)/u,
  );
  assert.match(
    indexText,
    /module\.exports\.humanReviewDeclaredPacketReviewGaps = humanReviewDeclaredPacketReviewGaps/u,
  );
});

test("package export remains anchored to the docs-only scope boundary", () => {
  const docsText = fs.readFileSync(scopeDocPath, "utf8");

  assert.match(
    docsText,
    /FUTURE_PACKAGE_SCHEMA_EXPORT_NAME:\nhumanReviewDeclaredPacketReviewGaps/u,
  );
  assert.match(
    docsText,
    /HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_STATUS:\nTRACKED_DOCS_ONLY_PACKAGE_SCHEMA_EXPORT_SCOPE_DEFINED/u,
  );
  assert.match(docsText, /Human\/professional\nreview remains the release gate/u);
  assert.match(docsText, /NO_RUNTIME_BEHAVIOR_CREATED/u);
});
