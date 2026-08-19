"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_v1.md";
const proofPath =
  "tests/domain-human-review-controlled-handoff-human-professional-approval-validator-result-package-schema-export-scope-boundary-doc-freeze.test.js";
const proofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const resultSchemaPath =
  "schemas/human-review-controlled-handoff-human-professional-approval-validator-result.json";
const candidateExportProofPath =
  "tests/human-review-controlled-handoff-human-professional-approval-package-export.test.js";
const packageIndexPath = "packages/schemas/src/index.js";
const futureResultExportProofPath =
  "tests/human-review-controlled-handoff-human-professional-approval-validator-result-package-export.test.js";
const retainedValidatorPaths = [
  "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-validator.js",
  "tests/human-review-controlled-handoff-human-professional-approval-validator.test.js",
];
const rootFields = ["valid", "contractKind", "version", "errors"];
const errorFields = ["code", "path"];
const prohibitedValidatorNames = [
  "humanReviewControlledHandoffHumanProfessionalApprovalValidator",
  "validateHumanReviewControlledHandoffHumanProfessionalApproval",
  "getHumanReviewControlledHandoffHumanProfessionalApprovalValidator",
  "humanReviewControlledHandoffHumanProfessionalApprovalValidatorRegistry",
];

function absolute(relativePath) {
  return path.join(repoRoot, relativePath);
}

function readRequired(relativePath) {
  assert.equal(fs.existsSync(absolute(relativePath)), true, relativePath);
  return fs.readFileSync(absolute(relativePath), "utf8");
}

function countKey(value, key, predicate = () => true) {
  if (Array.isArray(value)) {
    return value.reduce((count, item) => count + countKey(item, key, predicate), 0);
  }
  if (value === null || typeof value !== "object") return 0;
  return Object.entries(value).reduce(
    (count, [entryKey, entryValue]) =>
      count +
      (entryKey === key && predicate(entryValue) ? 1 : 0) +
      countKey(entryValue, key, predicate),
    0,
  );
}

test("validator-result package-export scope references exact selected sequence", () => {
  const docsText = readRequired(docsPath);

  for (const sourcePath of [
    resultSchemaPath,
    candidateExportProofPath,
    packageIndexPath,
    "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_v1.md",
    "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
  ]) {
    readRequired(sourcePath);
    assert.equal(docsText.includes("`" + sourcePath + "`"), true, sourcePath);
  }
  for (const marker of [
    "DOCS_ONLY",
    "OWNER_SELECTED_PACKAGE_EXPORT_SEQUENCE_OPTION_A_PRESERVED",
    "CANDIDATE_SCHEMA_EXPORT_FIRST_COMPLETED",
    "VALIDATOR_RESULT_SCHEMA_EXPORT_SECOND_SEPARATE_SLICE",
  ]) {
    assert.equal(docsText.includes(marker), true, marker);
  }
});

test("tracked validator-result identity shape and keyword counts are exact", () => {
  const docsText = readRequired(docsPath);
  const schema = require("../" + resultSchemaPath);

  assert.equal(
    schema.$id,
    "https://governance-contracts.invalid/schemas/human-review-controlled-handoff-human-professional-approval-validator-result.json",
  );
  assert.equal(
    schema.title,
    "Human Review Controlled Handoff Human/Professional Approval Validator Result Contract",
  );
  assert.deepEqual(schema.required, rootFields);
  assert.deepEqual(Object.keys(schema.properties), rootFields);
  assert.deepEqual(schema.properties.errors.items.required, errorFields);
  assert.deepEqual(Object.keys(schema.properties.errors.items.properties), errorFields);
  assert.deepEqual(
    {
      const: countKey(schema, "const"),
      enum: countKey(schema, "enum"),
      pattern: countKey(schema, "pattern"),
      oneOf: countKey(schema, "oneOf"),
      closed: countKey(schema, "additionalProperties", (value) => value === false),
      minItems: countKey(schema, "minItems"),
      maxItems: countKey(schema, "maxItems"),
      uniqueItems: countKey(schema, "uniqueItems"),
    },
    {
      const: 11,
      enum: 4,
      pattern: 9,
      oneOf: 5,
      closed: 2,
      minItems: 1,
      maxItems: 1,
      uniqueItems: 1,
    },
  );
  for (const [marker, count] of [
    ["TRACKED_VALIDATOR_RESULT_ROOT_FIELD_COUNT", 4],
    ["TRACKED_VALIDATOR_RESULT_ERROR_FIELD_COUNT", 2],
    ["TRACKED_VALIDATOR_RESULT_CONST_COUNT", 11],
    ["TRACKED_VALIDATOR_RESULT_ENUM_COUNT", 4],
    ["TRACKED_VALIDATOR_RESULT_PATTERN_COUNT", 9],
    ["TRACKED_VALIDATOR_RESULT_ONE_OF_COUNT", 5],
    ["TRACKED_VALIDATOR_RESULT_CLOSED_OBJECT_COUNT", 2],
    ["TRACKED_VALIDATOR_RESULT_MIN_ITEMS_COUNT", 1],
    ["TRACKED_VALIDATOR_RESULT_MAX_ITEMS_COUNT", 1],
    ["TRACKED_VALIDATOR_RESULT_UNIQUE_ITEMS_COUNT", 1],
  ]) {
    assert.match(docsText, new RegExp(marker + ":\\n" + count, "u"));
  }
});

test("future validator-result export scope and symbol are exact", () => {
  const docsText = readRequired(docsPath);

  assert.match(
    docsText,
    /FUTURE_VALIDATOR_RESULT_PACKAGE_EXPORT_SLICE_FILE_COUNT:\n2/u,
  );
  for (const futurePath of [packageIndexPath, futureResultExportProofPath]) {
    assert.equal(docsText.includes("`" + futurePath + "`"), true, futurePath);
  }
  assert.match(
    docsText,
    /FUTURE_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_NAME:\nhumanReviewControlledHandoffHumanProfessionalApprovalValidatorResult/u,
  );
  assert.match(
    docsText,
    /FUTURE_VALIDATOR_RESULT_PACKAGE_EXPORT_PROOF_ASSERTION_FAMILY_COUNT:\n9/u,
  );
  assert.match(
    docsText,
    /VALIDATOR_RESULT_PACKAGE_EXPORT_PROOF_TRANSITION_REQUIRED:\nTRUE/u,
  );
});

test("completed candidate export remains present while result transition and validator absence stay exact", () => {
  const docsText = readRequired(docsPath);
  const transitionText = readRequired(proofTransitionPath);
  const proofText = readRequired(proofPath);
  const packageSchemas = require("../packages/schemas/src/index.js");

  assert.equal(
    Object.hasOwn(
      packageSchemas,
      "humanReviewControlledHandoffHumanProfessionalApproval",
    ),
    true,
  );
  assert.equal(
    transitionText.includes(
      "`" + proofPath + "` | `SEPARATE_FOCUSED_ALIGNMENT_REQUIRED`",
    ),
    true,
  );
  for (const targetPath of [packageIndexPath, futureResultExportProofPath]) {
    assert.equal(transitionText.includes("`" + targetPath + "`"), true, targetPath);
  }
  assert.equal(
    transitionText.includes(
      "`humanReviewControlledHandoffHumanProfessionalApprovalValidatorResult`",
    ),
    true,
  );
  assert.equal(
    proofText.includes(
      "Object." +
        "hasOwn(packageSchemas, validatorResultExportName)",
    ),
    false,
  );
  assert.equal(
    proofText.includes(
      "fs." + "existsSync(absolute(futureResultExportProofPath))",
    ),
    false,
  );
  const validatorHelperProofTransitionText = readRequired(
    "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
  );
  for (const validatorPath of retainedValidatorPaths) {
    assert.equal(
      validatorHelperProofTransitionText.includes("`" + validatorPath + "`"),
      true,
      validatorPath,
    );
  }
  assert.match(docsText, /FUTURE_PROHIBITED_VALIDATOR_EXPORT_NAME_COUNT:\n4/u);
  for (const prohibitedName of prohibitedValidatorNames) {
    assert.equal(docsText.includes("`" + prohibitedName + "`"), true, prohibitedName);
  }
  assert.match(
    transitionText,
    /VALIDATOR_RESULT_PACKAGE_EXPORT_LIVE_PROOF_CONFLICT_COUNT:\n13/u,
  );
  assert.match(
    transitionText,
    /REMAINING_FOCUSED_PROOF_ALIGNMENT_COUNT:\n12/u,
  );
});

test("current docs-only scope creates no export runtime or approval effect", () => {
  const docsText = readRequired(docsPath);

  assert.match(
    docsText,
    /CURRENT_VALIDATOR_RESULT_PACKAGE_EXPORT_SCOPE_FILE_COUNT:\n2/u,
  );
  for (const currentPath of [docsPath, proofPath]) {
    assert.equal(docsText.includes("`" + currentPath + "`"), true, currentPath);
    readRequired(currentPath);
  }
  for (const marker of [
    "PACKAGE_SCHEMA_EXPORT_NOT_CREATED_BY_THIS_SLICE",
    "CANDIDATE_SCHEMA_EXPORT_NOT_CHANGED",
    "VALIDATOR_RESULT_SCHEMA_NOT_CHANGED",
    "VALIDATOR_NOT_CREATED",
    "VALIDATOR_DISPATCH_NOT_CHANGED",
    "VALIDATION_EXECUTION_NOT_CREATED",
    "APPROVAL_EFFECT_NOT_CREATED",
    "HANDOFF_DELIVERY_OR_RELEASE_NOT_CREATED",
    "NO_RUNTIME_BEHAVIOR_CREATED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "TRACKED_DOCS_ONLY_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_SCOPE_DEFINED",
  ]) {
    assert.equal(docsText.includes(marker), true, marker);
  }
});
