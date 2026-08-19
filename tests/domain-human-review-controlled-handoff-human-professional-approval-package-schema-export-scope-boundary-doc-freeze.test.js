"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_v1.md";
const proofPath =
  "tests/domain-human-review-controlled-handoff-human-professional-approval-package-schema-export-scope-boundary-doc-freeze.test.js";
const packageExportProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const validatorResultPackageExportProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const candidateSchemaPath =
  "schemas/human-review-controlled-handoff-human-professional-approval.json";
const candidateSchemaProofPath =
  "tests/human-review-controlled-handoff-human-professional-approval-schema.test.js";
const validatorResultSchemaPath =
  "schemas/human-review-controlled-handoff-human-professional-approval-validator-result.json";
const validatorResultSchemaProofPath =
  "tests/human-review-controlled-handoff-human-professional-approval-validator-result-schema.test.js";
const packageIndexPath = "packages/schemas/src/index.js";
const futureExportProofPath =
  "tests/human-review-controlled-handoff-human-professional-approval-package-export.test.js";
const validatorResultExportProofPath =
  "tests/human-review-controlled-handoff-human-professional-approval-validator-result-package-export.test.js";
const retainedValidatorPaths = [
  "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-validator.js",
  "tests/human-review-controlled-handoff-human-professional-approval-validator.test.js",
];
const controllingPaths = [
  candidateSchemaPath,
  candidateSchemaProofPath,
  validatorResultSchemaPath,
  validatorResultSchemaProofPath,
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_CONTRACT_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_VALIDATOR_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
  packageIndexPath,
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_v1.md",
  "tests/human-review-controlled-handoff-brief-package-export.test.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_v1.md",
];
const rootFields = [
  "contract_id",
  "contract_version",
  "approval_ref",
  "packet_ref",
  "controlled_handoff_brief_ref",
  "controlled_handoff_brief_fingerprint",
  "approval_posture",
  "decision",
  "reviewer_attribution",
  "decision_support",
  "decided_at",
  "review_session_ref",
  "decision_attestation_ref",
];
const reviewerFields = [
  "reviewer_ref",
  "reviewer_role",
  "reviewer_authority_evidence_ref",
];
const supportFields = [
  "decision_basis_refs",
  "prior_approval_refs",
  "correction_request_refs",
];
const prohibitedSiblingNames = [
  "humanReviewControlledHandoffHumanProfessionalApprovalValidatorResult",
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

test("candidate package-export scope references exact sources and owner sequence", () => {
  const docsText = readRequired(docsPath);

  for (const sourcePath of controllingPaths) {
    readRequired(sourcePath);
    assert.equal(docsText.includes("`" + sourcePath + "`"), true, sourcePath);
  }
  for (const marker of [
    "HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY",
    "DOCS_ONLY",
    "OWNER_SELECTED_PACKAGE_EXPORT_SEQUENCE_OPTION_A",
    "CANDIDATE_SCHEMA_EXPORT_FIRST",
    "VALIDATOR_RESULT_SCHEMA_EXPORT_SEPARATE_LATER_SLICE",
  ]) {
    assert.equal(docsText.includes(marker), true, marker);
  }
});

test("tracked candidate schema identity shape and keyword counts are exact", () => {
  const docsText = readRequired(docsPath);
  const schema = require("../" + candidateSchemaPath);

  assert.equal(
    schema.$id,
    "https://governance-contracts.invalid/schemas/human-review-controlled-handoff-human-professional-approval.json",
  );
  assert.equal(
    schema.title,
    "Human Review Controlled Handoff Human/Professional Approval Contract Scaffold",
  );
  assert.deepEqual(schema.required, rootFields);
  assert.deepEqual(Object.keys(schema.properties), rootFields);
  assert.deepEqual(schema.$defs.reviewerAttribution.required, reviewerFields);
  assert.deepEqual(
    Object.keys(schema.$defs.reviewerAttribution.properties),
    reviewerFields,
  );
  assert.deepEqual(schema.$defs.decisionSupport.required, supportFields);
  assert.deepEqual(Object.keys(schema.$defs.decisionSupport.properties), supportFields);

  const counts = {
    const: countKey(schema, "const"),
    pattern: countKey(schema, "pattern"),
    enum: countKey(schema, "enum"),
    closed: countKey(schema, "additionalProperties", (value) => value === false),
    ref: countKey(schema, "$ref"),
    allOf: countKey(schema, "allOf"),
    conditional:
      countKey(schema, "if") + countKey(schema, "then") + countKey(schema, "else"),
    minItems: countKey(schema, "minItems"),
    maxItems: countKey(schema, "maxItems"),
    uniqueItems: countKey(schema, "uniqueItems"),
  };
  assert.deepEqual(counts, {
    const: 4,
    pattern: 12,
    enum: 2,
    closed: 3,
    ref: 2,
    allOf: 1,
    conditional: 3,
    minItems: 3,
    maxItems: 3,
    uniqueItems: 1,
  });
  for (const [marker, count] of [
    ["TRACKED_SCHEMA_ROOT_FIELD_COUNT", 13],
    ["TRACKED_SCHEMA_REVIEWER_ATTRIBUTION_FIELD_COUNT", 3],
    ["TRACKED_SCHEMA_DECISION_SUPPORT_FIELD_COUNT", 3],
    ["TRACKED_SCHEMA_CONST_COUNT", 4],
    ["TRACKED_SCHEMA_PATTERN_COUNT", 12],
    ["TRACKED_SCHEMA_ENUM_COUNT", 2],
    ["TRACKED_SCHEMA_CLOSED_OBJECT_COUNT", 3],
    ["TRACKED_SCHEMA_REF_COUNT", 2],
    ["TRACKED_SCHEMA_ALL_OF_COUNT", 1],
    ["TRACKED_SCHEMA_IF_THEN_ELSE_COUNT", 3],
    ["TRACKED_SCHEMA_MIN_ITEMS_COUNT", 3],
    ["TRACKED_SCHEMA_MAX_ITEMS_COUNT", 3],
    ["TRACKED_SCHEMA_UNIQUE_ITEMS_COUNT", 1],
  ]) {
    assert.match(docsText, new RegExp(marker + ":\\n" + count, "u"));
  }
});

test("future candidate export scope name and package actions are exact", () => {
  const docsText = readRequired(docsPath);

  assert.match(docsText, /FUTURE_CANDIDATE_PACKAGE_EXPORT_SLICE_FILE_COUNT:\n2/u);
  for (const futurePath of [packageIndexPath, futureExportProofPath]) {
    assert.equal(docsText.includes("`" + futurePath + "`"), true, futurePath);
  }
  assert.match(
    docsText,
    /FUTURE_CANDIDATE_PACKAGE_SCHEMA_EXPORT_NAME:\nhumanReviewControlledHandoffHumanProfessionalApproval/u,
  );
  assert.equal(
    docsText.includes(
      "`../../../schemas/human-review-controlled-handoff-human-professional-approval.json`",
    ),
    true,
  );
  assert.match(docsText, /FUTURE_CANDIDATE_PACKAGE_EXPORT_PROOF_ASSERTION_FAMILY_COUNT:\n9/u);
  assert.match(docsText, /CANDIDATE_PACKAGE_EXPORT_PROOF_TRANSITION_REQUIRED:\nTRUE/u);
});

test("selected sequence keeps validator-result and validator siblings separate", () => {
  const docsText = readRequired(docsPath);

  assert.match(docsText, /PACKAGE_EXPORT_SEQUENCE_STEP_COUNT:\n2/u);
  assert.match(docsText, /FUTURE_PROHIBITED_SIBLING_EXPORT_NAME_COUNT:\n5/u);
  for (const siblingName of prohibitedSiblingNames) {
    assert.equal(docsText.includes("`" + siblingName + "`"), true, siblingName);
  }
  assert.match(
    docsText,
    /candidate schema-object package export \| `FIRST_SEPARATE_CONTRACT_ONLY_SLICE`/u,
  );
  assert.match(
    docsText,
    /validator-result schema-object package export \| `SECOND_SEPARATE_CONTRACT_ONLY_SLICE`/u,
  );
});

test("current scope is exact fail-closed and creates no export", () => {
  const docsText = readRequired(docsPath);
  const transitionText = readRequired(packageExportProofTransitionPath);
  const validatorResultTransitionText = readRequired(
    validatorResultPackageExportProofTransitionPath,
  );
  const scopeProofText = readRequired(proofPath);

  assert.match(docsText, /CURRENT_CANDIDATE_PACKAGE_EXPORT_SCOPE_FILE_COUNT:\n2/u);
  for (const currentPath of [docsPath, proofPath]) {
    assert.equal(docsText.includes("`" + currentPath + "`"), true, currentPath);
    readRequired(currentPath);
  }
  for (const targetPath of [packageIndexPath, futureExportProofPath]) {
    assert.equal(transitionText.includes("`" + targetPath + "`"), true, targetPath);
  }
  assert.equal(
    transitionText.includes(
      "`" + proofPath + "` | `SEPARATE_FOCUSED_ALIGNMENT_REQUIRED`",
    ),
    true,
  );
  assert.equal(
    transitionText.includes(
      "`humanReviewControlledHandoffHumanProfessionalApproval`",
    ),
    true,
  );
  assert.equal(
    scopeProofText.includes("packageIndex" + "Text.includes("),
    false,
  );
  assert.equal(
    scopeProofText.includes(
      "fs." + "existsSync(absolute(futureExportProofPath))",
    ),
    false,
  );
  assert.equal(
    validatorResultTransitionText.includes(
      "`" + proofPath + "` | `SEPARATE_FOCUSED_ALIGNMENT_REQUIRED`",
    ),
    true,
  );
  assert.equal(
    validatorResultTransitionText.includes(
      "`" + validatorResultExportProofPath + "`",
    ),
    true,
  );
  assert.equal(
    scopeProofText.includes(
      "fs." + "existsSync(absolute(validatorResultExportProofPath))",
    ),
    false,
  );
  const validatorHelperProofTransitionText = readRequired(
    "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
  );
  for (const retainedPath of retainedValidatorPaths) {
    assert.equal(
      validatorHelperProofTransitionText.includes("`" + retainedPath + "`"),
      true,
      retainedPath,
    );
  }
  for (const marker of [
    "PACKAGE_SCHEMA_EXPORT_NOT_CREATED_BY_THIS_SLICE",
    "SCHEMA_NOT_CHANGED",
    "VALIDATOR_RESULT_SCHEMA_NOT_CHANGED",
    "VALIDATOR_RESULT_PACKAGE_EXPORT_NOT_CREATED",
    "VALIDATOR_NOT_CREATED",
    "VALIDATOR_DISPATCH_NOT_CHANGED",
    "VALIDATION_EXECUTION_NOT_CREATED",
    "CROSS_REFERENCE_ADMISSIBILITY_CHECKPOINT_NOT_CREATED",
    "APPROVAL_EFFECT_NOT_CREATED",
    "HANDOFF_DELIVERY_OR_RELEASE_NOT_CREATED",
    "NO_RUNTIME_BEHAVIOR_CREATED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "TRACKED_DOCS_ONLY_CANDIDATE_PACKAGE_SCHEMA_EXPORT_SCOPE_DEFINED",
  ]) {
    assert.equal(docsText.includes(marker), true, marker);
  }
  for (const marker of [
    "PACKAGE_SCHEMA_EXPORT_LIVE_PROOF_CONFLICT_COUNT:\n11",
    "REMAINING_FOCUSED_PROOF_ALIGNMENT_COUNT:\n10",
    "TRACKED_DOCS_ONLY_FIRST_CANDIDATE_PACKAGE_EXPORT_PROOF_TRANSITION_DEFINED",
  ]) {
    assert.equal(transitionText.includes(marker), true, marker);
  }
  for (const marker of [
    "VALIDATOR_RESULT_PACKAGE_EXPORT_LIVE_PROOF_CONFLICT_COUNT:\n13",
    "REMAINING_FOCUSED_PROOF_ALIGNMENT_COUNT:\n12",
    "TRACKED_DOCS_ONLY_FIRST_VALIDATOR_RESULT_PACKAGE_EXPORT_PROOF_TRANSITION_DEFINED",
  ]) {
    assert.equal(validatorResultTransitionText.includes(marker), true, marker);
  }
  assert.match(docsText, /not actual human review[\s\S]*real-evidence review/u);
});
