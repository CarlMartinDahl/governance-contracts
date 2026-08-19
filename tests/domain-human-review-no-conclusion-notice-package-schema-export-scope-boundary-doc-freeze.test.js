"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_v1.md";
const proofPath =
  "tests/domain-human-review-no-conclusion-notice-package-schema-export-scope-boundary-doc-freeze.test.js";
const schemaPath = "schemas/human-review-no-conclusion-notice.json";
const schemaProofPath = "tests/human-review-no-conclusion-notice-schema.test.js";
const packageIndexPath = "packages/schemas/src/index.js";
const futureProofPath =
  "tests/human-review-no-conclusion-notice-package-export.test.js";
const proofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const sourcePaths = [
  schemaPath,
  schemaProofPath,
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_CONTRACT_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
  packageIndexPath,
  "tests/human-review-questions-package-export.test.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_v1.md",
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

test("package export scope references exact tracked and convention sources", () => {
  const docsText = readRequired(docsPath);

  for (const sourcePath of sourcePaths) {
    readRequired(sourcePath);
    assert.equal(docsText.includes("`" + sourcePath + "`"), true, sourcePath);
  }
  assert.match(docsText, /Convention evidence supplies only/u);
  assert.match(docsText, /does not supply\nnew No-Conclusion Notice fields/u);
});

test("tracked schema identity and exact structural counts remain frozen", () => {
  const docsText = readRequired(docsPath);
  const current = section(docsText, "## 3.", "## 4.");
  const schema = JSON.parse(readRequired(schemaPath));

  assert.equal(current.includes("`" + schemaPath + "`"), true);
  assert.equal(current.includes("`" + schema.$schema + "`"), true);
  assert.equal(current.includes("`" + schema.$id + "`"), true);
  assert.equal(current.includes("`" + schema.title + "`"), true);
  for (const [marker, count] of [
    ["TRACKED_SCHEMA_ROOT_FIELD_COUNT", 4],
    ["TRACKED_SCHEMA_NOTICE_ROW_FIELD_COUNT", 9],
    ["TRACKED_SCHEMA_REFERENCE_ARRAY_COUNT", 5],
    ["TRACKED_SCHEMA_MIN_ITEMS_KEYWORD_COUNT", 6],
    ["TRACKED_SCHEMA_UNIQUE_ITEMS_TRUE_COUNT", 5],
    ["TRACKED_SCHEMA_NOTICE_ROW_ANY_OF_BRANCH_COUNT", 5],
    ["TRACKED_SCHEMA_MAX_ITEMS_KEYWORD_COUNT", 0],
  ]) {
    assert.match(current, new RegExp(marker + ":\\n" + count, "u"));
  }
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
    /HUMAN_REVIEW_NO_CONCLUSION_NOTICE_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_STATUS:\nTRACKED_DOCS_ONLY_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_DEFINED/u,
  );
  assert.match(files, /schema file and its existing schema proof test must remain\nunchanged/u);
});

test("exact future symbol source path and static two-step surface are frozen", () => {
  const docsText = readRequired(docsPath);
  const surface = section(docsText, "## 5.", "## 6.");

  assert.match(
    surface,
    /FUTURE_PACKAGE_SCHEMA_EXPORT_NAME:\nhumanReviewNoConclusionNotice/u,
  );
  assert.equal(
    surface.includes("`../../../schemas/human-review-no-conclusion-notice.json`"),
    true,
  );
  assert.equal((surface.match(/^\d+\. /gmu) ?? []).length, 2);
  assert.match(surface, /must not wrap, normalize, project, mutate, clone/u);
});

test("five sibling export names and downstream surfaces remain separate", () => {
  const docsText = readRequired(docsPath);
  const siblings = section(docsText, "## 6.", "## 7.");

  for (const name of [
    "humanReviewNoConclusionNoticeValidatorResult",
    "humanReviewNoConclusionNoticeValidator",
    "validateHumanReviewNoConclusionNotice",
    "getHumanReviewNoConclusionNoticeValidator",
    "humanReviewNoConclusionNoticeValidatorRegistry",
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
  assert.match(proof, /introduces no `maxItems`/u);
  assert.match(proof, /must not claim validator correctness/u);
  assert.match(proof, /executed\nmodel refusal/u);
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
    "NOTICE_GENERATION_NOT_CREATED",
    "TRIGGER_CLASSIFICATION_NOT_CREATED",
    "CONTROLLED_HANDOFF_NOT_CREATED",
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
