"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_v1.md";
const proofPath =
  "tests/domain-human-review-controlled-handoff-brief-package-schema-export-scope-boundary-doc-freeze.test.js";
const schemaPath = "schemas/human-review-controlled-handoff-brief.json";
const schemaProofPath =
  "tests/human-review-controlled-handoff-brief-schema.test.js";
const packageIndexPath = "packages/schemas/src/index.js";
const futureProofPath =
  "tests/human-review-controlled-handoff-brief-package-export.test.js";
const proofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const sourcePaths = [
  schemaPath,
  schemaProofPath,
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_CONTRACT_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
  packageIndexPath,
  "tests/human-review-no-conclusion-notice-package-export.test.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_v1.md",
];

function absolute(relativePath) {
  return path.join(repoRoot, relativePath);
}

function readRequired(relativePath) {
  assert.equal(fs.existsSync(absolute(relativePath)), true, relativePath);
  return fs.readFileSync(absolute(relativePath), "utf8");
}

function section(text, heading, nextHeading) {
  const start = text.indexOf(heading);
  assert.notEqual(start, -1, heading);
  const end = text.indexOf(nextHeading, start + heading.length);
  assert.notEqual(end, -1, nextHeading);
  return text.slice(start, end);
}

function countKeyword(value, keyword, predicate = () => true) {
  if (Array.isArray(value)) {
    return value.reduce(
      (count, item) => count + countKeyword(item, keyword, predicate),
      0,
    );
  }
  if (value === null || typeof value !== "object") {
    return 0;
  }

  let count = 0;
  for (const [key, child] of Object.entries(value)) {
    if (key === keyword && predicate(child)) {
      count += 1;
    }
    count += countKeyword(child, keyword, predicate);
  }
  return count;
}

test("package export scope references exact tracked and convention sources", () => {
  const docsText = readRequired(docsPath);

  for (const sourcePath of sourcePaths) {
    readRequired(sourcePath);
    assert.equal(docsText.includes("`" + sourcePath + "`"), true, sourcePath);
  }
  assert.match(docsText, /Convention evidence supplies only/u);
  assert.match(docsText, /does not supply\nnew Controlled Handoff Brief fields/u);
});

test("tracked schema identity and exact structural counts remain frozen", () => {
  const docsText = readRequired(docsPath);
  const current = section(docsText, "## 3.", "## 4.");
  const schema = JSON.parse(readRequired(schemaPath));
  const componentRefs = schema.$defs.componentRefs;

  assert.equal(current.includes("`" + schemaPath + "`"), true);
  assert.equal(current.includes("`" + schema.$schema + "`"), true);
  assert.equal(current.includes("`" + schema.$id + "`"), true);
  assert.equal(current.includes("`" + schema.title + "`"), true);
  assert.equal(schema.required.length, 5);
  assert.equal(Object.keys(schema.properties).length, 5);
  assert.equal(componentRefs.required.length, 6);
  assert.equal(Object.keys(componentRefs.properties).length, 6);
  for (const [marker, count] of [
    ["TRACKED_SCHEMA_ROOT_FIELD_COUNT", 5],
    ["TRACKED_SCHEMA_COMPONENT_REFERENCE_FIELD_COUNT", 6],
    ["TRACKED_SCHEMA_CONST_COUNT", 3],
    ["TRACKED_SCHEMA_PATTERN_COUNT", 7],
    ["TRACKED_SCHEMA_CLOSED_OBJECT_COUNT", 2],
    ["TRACKED_SCHEMA_MIN_ITEMS_KEYWORD_COUNT", 0],
    ["TRACKED_SCHEMA_MAX_ITEMS_KEYWORD_COUNT", 0],
    ["TRACKED_SCHEMA_UNIQUE_ITEMS_KEYWORD_COUNT", 0],
  ]) {
    assert.match(current, new RegExp(marker + ":\\n" + count, "u"));
  }
  assert.equal(countKeyword(schema, "const"), 3);
  assert.equal(countKeyword(schema, "pattern"), 7);
  assert.equal(
    countKeyword(schema, "additionalProperties", (value) => value === false),
    2,
  );
  assert.equal(countKeyword(schema, "minItems"), 0);
  assert.equal(countKeyword(schema, "maxItems"), 0);
  assert.equal(countKeyword(schema, "uniqueItems"), 0);
});

test("future package export follows the tracked proof transition and stays exactly two files", () => {
  const docsText = readRequired(docsPath);
  const transitionText = readRequired(proofTransitionPath);
  const files = section(docsText, "## 4.", "## 5.");

  assert.match(files, /FUTURE_PACKAGE_EXPORT_SLICE_FILE_COUNT:\n2/u);
  assert.equal(files.includes("`" + packageIndexPath + "`"), true);
  assert.equal(files.includes("`" + futureProofPath + "`"), true);
  assert.equal(transitionText.includes("`" + futureProofPath + "`"), true);
  assert.equal(transitionText.includes("`" + proofPath + "`"), true);
  assert.match(transitionText, /PACKAGE_SCHEMA_EXPORT_TRANSITION_COUNT:\n1/u);
  assert.match(
    transitionText,
    /REMAINING_PACKAGE_EXPORT_PROOF_ALIGNMENT_COUNT:\n1/u,
  );
  assert.match(
    transitionText,
    /HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_STATUS:\nTRACKED_DOCS_ONLY_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_DEFINED/u,
  );
  assert.match(
    files,
    /schema file and its existing schema proof test must remain\nunchanged/u,
  );
});

test("exact future symbol source path and static two-step surface are frozen", () => {
  const docsText = readRequired(docsPath);
  const surface = section(docsText, "## 5.", "## 6.");

  assert.match(
    surface,
    /FUTURE_PACKAGE_SCHEMA_EXPORT_NAME:\nhumanReviewControlledHandoffBrief/u,
  );
  assert.equal(
    surface.includes(
      "`../../../schemas/human-review-controlled-handoff-brief.json`",
    ),
    true,
  );
  assert.equal((surface.match(/^\d+\. /gmu) ?? []).length, 2);
  assert.match(surface, /must not wrap, normalize, project, mutate, clone/u);
});

test("five sibling export names and downstream surfaces remain separate", () => {
  const docsText = readRequired(docsPath);
  const siblings = section(docsText, "## 6.", "## 7.");

  for (const name of [
    "humanReviewControlledHandoffBriefValidatorResult",
    "humanReviewControlledHandoffBriefValidator",
    "validateHumanReviewControlledHandoffBrief",
    "getHumanReviewControlledHandoffBriefValidator",
    "humanReviewControlledHandoffBriefValidatorRegistry",
  ]) {
    assert.equal(siblings.includes("`" + name + "`"), true, name);
  }
  assert.match(siblings, /FUTURE_PROHIBITED_SIBLING_EXPORT_NAME_COUNT:\n5/u);
  assert.match(siblings, /SEPARATE_LATER_GOVERNANCE_SLICE/u);
  assert.match(siblings, /OUT_OF_SCOPE_NOT_AUTHORIZED/u);
});

test("future proof remains eight bounded structural assertion families", () => {
  const docsText = readRequired(docsPath);
  const proof = section(docsText, "## 7.", "## 8.");

  assert.equal((proof.match(/^\d+\. /gmu) ?? []).length, 8);
  assert.match(proof, /FUTURE_PACKAGE_EXPORT_PROOF_ASSERTION_FAMILY_COUNT:\n8/u);
  assert.match(proof, /reference-equal and deeply equal/u);
  assert.match(proof, /introduces no array cardinality or uniqueness keyword/u);
  assert.match(proof, /must not claim validator correctness/u);
  assert.match(proof, /executed model behavior/u);
});

test("scope remains exact two-file docs-only and non-authorizing", () => {
  const docsText = readRequired(docsPath);

  assert.match(docsText, /CURRENT_PACKAGE_EXPORT_SCOPE_FILE_COUNT:\n2/u);
  for (const exactPath of [docsPath, proofPath]) {
    assert.equal(docsText.includes("`" + exactPath + "`"), true, exactPath);
    readRequired(exactPath);
  }
  for (const marker of [
    "DOCS_ONLY",
    "SCHEMA_OBJECT_EXPORT_SCOPE_DEFINED",
    "PACKAGE_SCHEMA_EXPORT_NOT_CREATED_BY_THIS_SLICE",
    "VALIDATOR_RESULT_SCHEMA_NOT_CREATED",
    "VALIDATOR_NOT_CREATED",
    "CROSS_REFERENCE_CHECKPOINT_NOT_CREATED",
    "COMPONENT_ASSEMBLY_NOT_CREATED",
    "HUMAN_REVIEW_OR_APPROVAL_NOT_CREATED",
    "DELIVERY_OR_RELEASE_NOT_CREATED",
    "NO_RUNTIME_BEHAVIOR_CREATED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "TRACKED_DOCS_ONLY_PACKAGE_SCHEMA_EXPORT_SCOPE_DEFINED",
  ]) {
    assert.equal(docsText.includes(marker), true, marker);
  }
  assert.match(docsText, /not actual human review[\s\S]*real-evidence review/u);
});
