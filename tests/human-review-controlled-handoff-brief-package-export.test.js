"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const schema = require("../schemas/human-review-controlled-handoff-brief.json");
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
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_v1.md",
);
const transitionDocPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
);
const exportName = "humanReviewControlledHandoffBrief";
const expectedRootFields = [
  "contract_id",
  "contract_version",
  "packet_ref",
  "handoff_posture",
  "component_refs",
];
const expectedComponentFields = [
  "source_register_ref",
  "review_chronology_ref",
  "asserted_claim_matrix_ref",
  "declared_packet_review_gaps_ref",
  "human_review_questions_ref",
  "no_conclusion_notice_ref",
];
const blockedSiblingExports = [
  "humanReviewControlledHandoffBriefValidator",
  "validateHumanReviewControlledHandoffBrief",
  "getHumanReviewControlledHandoffBriefValidator",
  "humanReviewControlledHandoffBriefValidatorRegistry",
];

function countKeyword(value, keyword, predicate = () => true) {
  if (Array.isArray(value)) {
    return value.reduce(
      (count, item) => count + countKeyword(item, keyword, predicate),
      0,
    );
  }
  if (value === null || typeof value !== "object") return 0;

  return Object.entries(value).reduce(
    (count, [key, child]) =>
      count +
      (key === keyword && predicate(child) ? 1 : 0) +
      countKeyword(child, keyword, predicate),
    0,
  );
}

function containsCallable(value) {
  if (typeof value === "function") return true;
  if (Array.isArray(value)) return value.some(containsCallable);
  if (value === null || typeof value !== "object") return false;
  return Object.values(value).some(containsCallable);
}

test("packages/schemas exports the exact Controlled Handoff Brief schema object", () => {
  assert.equal(Object.hasOwn(packageSchemas, exportName), true);
  assert.strictEqual(packageSchemas[exportName], schema);
  assert.deepEqual(packageSchemas[exportName], schema);
  assert.equal(
    packageSchemas[exportName].$id,
    "https://governance-contracts.invalid/schemas/human-review-controlled-handoff-brief.json",
  );
  assert.equal(
    packageSchemas[exportName].title,
    "Human Review Controlled Handoff Brief Contract Scaffold",
  );
});

test("package export preserves the exact five-field root and six-field component object", () => {
  const exportedSchema = packageSchemas[exportName];
  const componentRefs = exportedSchema.$defs.componentRefs;

  assert.deepEqual(exportedSchema.required, expectedRootFields);
  assert.deepEqual(Object.keys(exportedSchema.properties), expectedRootFields);
  assert.equal(exportedSchema.additionalProperties, false);
  assert.equal(exportedSchema.properties.component_refs.$ref, "#/$defs/componentRefs");
  assert.deepEqual(componentRefs.required, expectedComponentFields);
  assert.deepEqual(Object.keys(componentRefs.properties), expectedComponentFields);
  assert.equal(componentRefs.additionalProperties, false);
});

test("package export preserves the exact literals and opaque-reference patterns", () => {
  const exportedSchema = packageSchemas[exportName];
  const componentRefs = exportedSchema.$defs.componentRefs;

  assert.equal(
    exportedSchema.properties.contract_id.const,
    "human_review.controlled_handoff_brief",
  );
  assert.equal(exportedSchema.properties.contract_version.const, "1.0.0");
  assert.equal(
    exportedSchema.properties.handoff_posture.const,
    "HANDOFF_CANDIDATE_ONLY",
  );
  assert.equal(
    exportedSchema.properties.packet_ref.pattern,
    "^pkt_[a-z0-9][a-z0-9_-]{0,59}$",
  );
  for (const field of expectedComponentFields) {
    assert.equal(componentRefs.properties[field].type, "string", field);
    assert.equal(
      componentRefs.properties[field].pattern,
      "^hro_[a-z0-9][a-z0-9_-]{0,59}$",
      field,
    );
  }
});

test("package export preserves exact keyword counts without array or uniqueness semantics", () => {
  const exportedSchema = packageSchemas[exportName];

  assert.equal(countKeyword(exportedSchema, "const"), 3);
  assert.equal(countKeyword(exportedSchema, "pattern"), 7);
  assert.equal(
    countKeyword(
      exportedSchema,
      "additionalProperties",
      (value) => value === false,
    ),
    2,
  );
  for (const keyword of [
    "minItems",
    "maxItems",
    "uniqueItems",
    "allOf",
    "anyOf",
    "oneOf",
    "if",
    "then",
  ]) {
    assert.equal(countKeyword(exportedSchema, keyword), 0, keyword);
  }
});

test("candidate package export preserves all four validator sibling boundaries", () => {
  for (const blockedExport of blockedSiblingExports) {
    assert.equal(Object.hasOwn(packageSchemas, blockedExport), false, blockedExport);
  }
});

test("package index uses one static schema binding and one schema-object export", () => {
  const indexText = fs.readFileSync(packageIndexPath, "utf8");
  const occurrences =
    indexText.match(/\bhumanReviewControlledHandoffBrief\b/gu) ?? [];

  assert.equal(occurrences.length, 3);
  assert.match(
    indexText,
    /humanReviewControlledHandoffBrief = require\("\.\.\/\.\.\/\.\.\/schemas\/human-review-controlled-handoff-brief\.json"\)/u,
  );
  assert.match(
    indexText,
    /module\.exports\.humanReviewControlledHandoffBrief = humanReviewControlledHandoffBrief/u,
  );
});

test("package export remains anchored to scope transition and no-runtime boundaries", () => {
  const scopeText = fs.readFileSync(scopeDocPath, "utf8");
  const transitionText = fs.readFileSync(transitionDocPath, "utf8");

  assert.match(
    scopeText,
    /FUTURE_PACKAGE_SCHEMA_EXPORT_NAME:\nhumanReviewControlledHandoffBrief/u,
  );
  assert.match(
    scopeText,
    /FUTURE_PACKAGE_EXPORT_PROOF_ASSERTION_FAMILY_COUNT:\n8/u,
  );
  assert.match(
    scopeText,
    /HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_STATUS:\nTRACKED_DOCS_ONLY_PACKAGE_SCHEMA_EXPORT_SCOPE_DEFINED/u,
  );
  assert.match(
    transitionText,
    /HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_STATUS:\nTRACKED_DOCS_ONLY_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_DEFINED/u,
  );
  assert.match(scopeText, /Human\/professional\nreview remains the release gate/u);
  assert.match(scopeText, /NO_RUNTIME_BEHAVIOR_CREATED/u);
});

test("static schema-object export exposes no callable handoff behavior", () => {
  const exportedSchema = packageSchemas[exportName];

  assert.equal(typeof exportedSchema, "object");
  assert.equal(containsCallable(exportedSchema), false);
  for (const behaviorName of [
    "assembleHumanReviewControlledHandoffBrief",
    "approveHumanReviewControlledHandoffBrief",
    "deliverHumanReviewControlledHandoffBrief",
  ]) {
    assert.equal(Object.hasOwn(packageSchemas, behaviorName), false, behaviorName);
  }
});
