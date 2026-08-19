"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const schema = require("../schemas/human-review-no-conclusion-notice.json");
const packageSchemas = require("../packages/schemas/src/index.js");

const repoRoot = path.join(__dirname, "..");
const packageIndexPath = path.join(
  repoRoot,
  "packages",
  "schemas",
  "src",
  "index.js",
);
const scopeDocPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_v1.md",
);
const transitionDocPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
);
const exportName = "humanReviewNoConclusionNotice";
const expectedRootFields = [
  "contract_id",
  "contract_version",
  "packet_ref",
  "notices",
];
const expectedNoticeFields = [
  "notice_ref",
  "declaration_origin",
  "notice_code",
  "notice_text",
  "source_refs",
  "chronology_entry_refs",
  "claim_refs",
  "gap_refs",
  "question_refs",
];
const expectedReferenceFields = [
  "source_refs",
  "chronology_entry_refs",
  "claim_refs",
  "gap_refs",
  "question_refs",
];
const expectedReferencePatterns = {
  source_refs: "^src_[a-z0-9][a-z0-9_-]{0,59}$",
  chronology_entry_refs: "^chr_[a-z0-9][a-z0-9_-]{0,59}$",
  claim_refs: "^clm_[a-z0-9][a-z0-9_-]{0,59}$",
  gap_refs: "^gap_[a-z0-9][a-z0-9_-]{0,59}$",
  question_refs: "^qst_[a-z0-9][a-z0-9_-]{0,59}$",
};
const blockedSiblingExports = [
  "humanReviewNoConclusionNoticeValidator",
  "validateHumanReviewNoConclusionNotice",
  "getHumanReviewNoConclusionNoticeValidator",
  "humanReviewNoConclusionNoticeValidatorRegistry",
];

function countKey(value, expectedKey) {
  if (value === null || typeof value !== "object") return 0;
  return Object.entries(value).reduce(
    (count, [key, nested]) =>
      count + (key === expectedKey ? 1 : 0) + countKey(nested, expectedKey),
    0,
  );
}

test("packages/schemas exports the exact No-Conclusion Notice schema object", () => {
  assert.equal(Object.hasOwn(packageSchemas, exportName), true);
  assert.strictEqual(packageSchemas[exportName], schema);
  assert.deepEqual(packageSchemas[exportName], schema);
  assert.equal(
    packageSchemas[exportName].$id,
    "https://governance-contracts.invalid/schemas/human-review-no-conclusion-notice.json",
  );
  assert.equal(
    packageSchemas[exportName].title,
    "Human Review No-Conclusion Notice Contract Scaffold",
  );
});

test("package export preserves the exact four-field root and nine-field notice row", () => {
  const exportedSchema = packageSchemas[exportName];
  const noticeRow = exportedSchema.$defs.noticeRow;

  assert.deepEqual(exportedSchema.required, expectedRootFields);
  assert.deepEqual(Object.keys(exportedSchema.properties), expectedRootFields);
  assert.equal(exportedSchema.additionalProperties, false);
  assert.deepEqual(noticeRow.required, expectedNoticeFields);
  assert.deepEqual(Object.keys(noticeRow.properties), expectedNoticeFields);
  assert.equal(noticeRow.additionalProperties, false);
  assert.equal(noticeRow.properties.declaration_origin.const, "BOUNDARY_DECLARED");
  assert.equal(
    noticeRow.properties.notice_code.const,
    "NO_MODEL_CONCLUSION_UNDER_CURRENT_BOUNDARY",
  );
  assert.equal(
    noticeRow.properties.notice_text.const,
    "No model conclusion is established under the current boundary.",
  );
});

test("package export preserves five exact empty-allowed unique reference arrays", () => {
  const noticeRow = packageSchemas[exportName].$defs.noticeRow;

  for (const field of expectedReferenceFields) {
    const definition = noticeRow.properties[field];
    assert.equal(definition.type, "array", field);
    assert.equal(definition.minItems, 0, field);
    assert.equal(definition.uniqueItems, true, field);
    assert.equal(definition.items.type, "string", field);
    assert.equal(definition.items.pattern, expectedReferencePatterns[field], field);
  }
});

test("package export preserves five ordered reference-cardinality branches", () => {
  const branches = packageSchemas[exportName].$defs.noticeRow.anyOf;

  assert.deepEqual(
    branches,
    expectedReferenceFields.map((field) => ({
      properties: { [field]: { minItems: 1 } },
    })),
  );
});

test("package export preserves six base minima five uniqueness declarations and no maximum", () => {
  const exportedSchema = packageSchemas[exportName];
  const noticeRow = exportedSchema.$defs.noticeRow;
  const baseMinima = [
    exportedSchema.properties.notices.minItems,
    ...expectedReferenceFields.map(
      (field) => noticeRow.properties[field].minItems,
    ),
  ];

  assert.deepEqual(baseMinima, [1, 0, 0, 0, 0, 0]);
  assert.equal(
    expectedReferenceFields.filter(
      (field) => noticeRow.properties[field].uniqueItems === true,
    ).length,
    5,
  );
  assert.equal(countKey(exportedSchema, "maxItems"), 0);
});

test("candidate package export preserves all four validator and dispatch sibling boundaries", () => {
  for (const blockedExport of blockedSiblingExports) {
    assert.equal(Object.hasOwn(packageSchemas, blockedExport), false, blockedExport);
  }
});

test("package index uses one static schema binding and one schema-object export", () => {
  const indexText = fs.readFileSync(packageIndexPath, "utf8");
  const occurrences = indexText.match(/\bhumanReviewNoConclusionNotice\b/gu) ?? [];

  assert.equal(occurrences.length, 3);
  assert.match(
    indexText,
    /humanReviewNoConclusionNotice = require\("\.\.\/\.\.\/\.\.\/schemas\/human-review-no-conclusion-notice\.json"\)/u,
  );
  assert.match(
    indexText,
    /module\.exports\.humanReviewNoConclusionNotice = humanReviewNoConclusionNotice/u,
  );
});

test("package export remains anchored to scope transition and no-runtime boundaries", () => {
  const scopeText = fs.readFileSync(scopeDocPath, "utf8");
  const transitionText = fs.readFileSync(transitionDocPath, "utf8");

  assert.match(
    scopeText,
    /FUTURE_PACKAGE_SCHEMA_EXPORT_NAME:\nhumanReviewNoConclusionNotice/u,
  );
  assert.match(scopeText, /FUTURE_PACKAGE_EXPORT_PROOF_ASSERTION_FAMILY_COUNT:\n8/u);
  assert.match(
    scopeText,
    /HUMAN_REVIEW_NO_CONCLUSION_NOTICE_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_STATUS:\nTRACKED_DOCS_ONLY_PACKAGE_SCHEMA_EXPORT_SCOPE_DEFINED/u,
  );
  assert.match(
    transitionText,
    /HUMAN_REVIEW_NO_CONCLUSION_NOTICE_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_STATUS:\nTRACKED_DOCS_ONLY_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_DEFINED/u,
  );
  assert.match(scopeText, /Human\/professional\nreview remains the release gate/u);
  assert.match(scopeText, /NO_RUNTIME_BEHAVIOR_CREATED/u);
});
