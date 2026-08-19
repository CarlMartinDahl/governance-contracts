"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const validatorHelperProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_IDENTITY_EVIDENCE_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_IDENTITY_EVIDENCE_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_v1.md";
const proofPath =
  "tests/domain-human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-validator-result-package-schema-export-scope-boundary-doc-freeze.test.js";
const proofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_IDENTITY_EVIDENCE_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const resultSchemaPath =
  "schemas/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-validator-result.json";
const resultSchemaProofPath =
  "tests/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-validator-result-schema.test.js";
const candidateExportProofPath =
  "tests/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-package-export.test.js";
const packageIndexPath = "packages/schemas/src/index.js";
const futureResultExportProofPath =
  "tests/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-validator-result-package-export.test.js";
const candidateExportName =
  "humanReviewControlledHandoffHumanProfessionalApprovalReviewerIdentityEvidence";
const validatorResultExportName =
  "humanReviewControlledHandoffHumanProfessionalApprovalReviewerIdentityEvidenceValidatorResult";
const retainedValidatorPaths = [
  "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-validator.js",
  "tests/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-validator.test.js",
];
const rootFields = ["valid", "contractKind", "version", "errors"];
const errorFields = ["code", "path"];
const prohibitedValidatorNames = [
  "humanReviewControlledHandoffHumanProfessionalApprovalReviewerIdentityEvidenceValidator",
  "validateHumanReviewControlledHandoffHumanProfessionalApprovalReviewerIdentityEvidence",
  "getHumanReviewControlledHandoffHumanProfessionalApprovalReviewerIdentityEvidenceValidator",
  "humanReviewControlledHandoffHumanProfessionalApprovalReviewerIdentityEvidenceValidatorRegistry",
];
const currentScopePaths = [docsPath, proofPath];
const futureScopePaths = [packageIndexPath, futureResultExportProofPath];

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

test("validator-result package-export scope references the exact selected sequence", () => {
  const docsText = readRequired(docsPath);

  for (const sourcePath of [
    resultSchemaPath,
    resultSchemaProofPath,
    candidateExportProofPath,
    packageIndexPath,
    "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_IDENTITY_EVIDENCE_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_v1.md",
    "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_IDENTITY_EVIDENCE_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
  ]) {
    readRequired(sourcePath);
    assert.equal(docsText.includes("`" + sourcePath + "`"), true, sourcePath);
  }
  for (const marker of [
    "DOCS_ONLY",
    "OWNER_SELECTED_PACKAGE_EXPORT_SEQUENCE_OPTION_A_PRESERVED",
    "CANDIDATE_SCHEMA_EXPORT_FIRST_COMPLETED",
    "VALIDATOR_RESULT_SCHEMA_EXPORT_SECOND_SEPARATE_SLICE",
    "APPEND_ONLY_PACKAGE_SCHEMA_EXPORT_SCOPE",
  ]) {
    assert.equal(docsText.includes(marker), true, marker);
  }
});

test("tracked validator-result identity shape and keyword counts are exact", () => {
  const docsText = readRequired(docsPath);
  const schema = require("../" + resultSchemaPath);

  assert.equal(
    schema.$id,
    "https://governance-contracts.invalid/schemas/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-validator-result.json",
  );
  assert.equal(
    schema.title,
    "Human Review Controlled Handoff Human/Professional Approval Reviewer Identity Evidence Validator Result Contract",
  );
  assert.deepEqual(schema.required, rootFields);
  assert.deepEqual(Object.keys(schema.properties), rootFields);
  assert.deepEqual(schema.properties.errors.items.required, errorFields);
  assert.deepEqual(schema.properties.errors.items.properties, {
    code: { type: "string" },
    path: { type: "string" },
  });
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
      const: 10,
      enum: 4,
      pattern: 0,
      oneOf: 2,
      closed: 2,
      minItems: 1,
      maxItems: 1,
      uniqueItems: 1,
    },
  );
  for (const [marker, count] of [
    ["TRACKED_VALIDATOR_RESULT_ROOT_FIELD_COUNT", 4],
    ["TRACKED_VALIDATOR_RESULT_ERROR_FIELD_COUNT", 2],
    ["TRACKED_VALIDATOR_RESULT_CONST_COUNT", 10],
    ["TRACKED_VALIDATOR_RESULT_ENUM_COUNT", 4],
    ["TRACKED_VALIDATOR_RESULT_PATTERN_COUNT", 0],
    ["TRACKED_VALIDATOR_RESULT_ONE_OF_COUNT", 2],
    ["TRACKED_VALIDATOR_RESULT_CLOSED_OBJECT_COUNT", 2],
    ["TRACKED_VALIDATOR_RESULT_MIN_ITEMS_COUNT", 1],
    ["TRACKED_VALIDATOR_RESULT_MAX_ITEMS_COUNT", 1],
    ["TRACKED_VALIDATOR_RESULT_UNIQUE_ITEMS_COUNT", 1],
  ]) {
    assert.match(docsText, new RegExp(marker + ":\\n" + count, "u"));
  }
});

test("future validator-result export scope symbol and proof families are exact", () => {
  const docsText = readRequired(docsPath);

  assert.match(
    docsText,
    /FUTURE_VALIDATOR_RESULT_PACKAGE_EXPORT_SLICE_FILE_COUNT:\n2/u,
  );
  for (const futurePath of futureScopePaths) {
    assert.equal(docsText.includes("`" + futurePath + "`"), true, futurePath);
  }
  assert.match(
    docsText,
    /FUTURE_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_NAME:\nhumanReviewControlledHandoffHumanProfessionalApprovalReviewerIdentityEvidenceValidatorResult/u,
  );
  assert.equal(
    docsText.includes(
      "`../../../schemas/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-validator-result.json`",
    ),
    true,
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

test("completed candidate export remains exact while result transition and validator absence stay exact", () => {
  const docsText = readRequired(docsPath);
  const transitionText = readRequired(proofTransitionPath);
  const proofText = readRequired(proofPath);
  const packageIndexText = readRequired(packageIndexPath);
  const packageSchemas = require("../packages/schemas/src/index.js");
  const candidateSchema = require("../schemas/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence.json");

  assert.strictEqual(packageSchemas[candidateExportName], candidateSchema);
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
    transitionText.includes("`" + validatorResultExportName + "`"),
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
    proofText.includes("packageIndex" + "Text.includes("),
    false,
  );
  assert.equal((packageIndexText.match(/\n/gu) ?? []).length, 13165);
  assert.equal(
    proofText.includes(
      "fs." + "existsSync(absolute(futureResultExportProofPath))",
    ),
    false,
  );
  for (const validatorPath of retainedValidatorPaths) {
    assert.equal(
      readRequired(validatorHelperProofTransitionPath).includes(
        "`" + validatorPath + "` | `LIVE_ABSENCE_ASSERTION_TRANSITIONED_FOR_SEPARATE_LATER_RUNTIME_CHANGE_SLICE`",
      ),
      true,
      validatorPath,
    );
  }
  assert.match(docsText, /FUTURE_PROHIBITED_VALIDATOR_EXPORT_NAME_COUNT:\n4/u);
  for (const prohibitedName of prohibitedValidatorNames) {
    assert.equal(docsText.includes("`" + prohibitedName + "`"), true, prohibitedName);
    assert.equal(Object.hasOwn(packageSchemas, prohibitedName), false, prohibitedName);
  }
  assert.match(
    transitionText,
    /VALIDATOR_RESULT_PACKAGE_EXPORT_LIVE_PROOF_CONFLICT_COUNT:\n9/u,
  );
  assert.match(
    transitionText,
    /REMAINING_FOCUSED_PROOF_ALIGNMENT_COUNT:\n8/u,
  );
});

test("current docs-only scope creates no export runtime or approval effect", () => {
  const docsText = readRequired(docsPath);

  assert.match(
    docsText,
    /CURRENT_VALIDATOR_RESULT_PACKAGE_EXPORT_SCOPE_FILE_COUNT:\n2/u,
  );
  for (const currentPath of currentScopePaths) {
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
    "IDENTITY_CURRENTNESS_ROLE_OR_AUTHORITY_EVALUATION_NOT_CREATED",
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
  assert.match(
    docsText,
    /REPO_NEXT_ACTION:\nnone from this boundary; a separate proof-transition prerequisite remains required before validator-result package export/u,
  );
});
