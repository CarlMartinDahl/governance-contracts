"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const packageSchemas = require("../packages/schemas/src/index.js");
const candidateSchema = require("../schemas/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence.json");
const resultSchema = require("../schemas/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-result.json");

const repoRoot = path.join(__dirname, "..");
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_VALIDATOR_HELPER_SCAFFOLD_SCOPE_BOUNDARY_v1.md";
const proofPath =
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-helper-scaffold-scope-boundary-doc-freeze.test.js";
const proofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const proofTransitionProofPath =
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-helper-proof-transition-prerequisite-boundary-doc-freeze.test.js";
const futureFunctionName =
  "validateHumanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidence";
const retainedPackageSiblingNames = [
  "humanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidenceValidator",
  "getHumanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidenceValidator",
  "humanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidenceValidatorRegistry",
];
const futureImplementationPaths = [
  "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator.js",
  "tests/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator.test.js",
];
const canonicalPaths = [
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_VALIDATOR_HELPER_READINESS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_CONTRACT_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_VALIDATOR_ERROR_PATH_SEMANTICS_BOUNDARY_v1.md",
  "schemas/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence.json",
  "schemas/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-result.json",
];
const precedentPaths = [
  "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator.js",
  "tests/human-review-controlled-handoff-human-professional-approval-decision-attestation-evidence-validator.test.js",
  "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-review-session-evidence-validator.js",
  "tests/human-review-controlled-handoff-human-professional-approval-review-session-evidence-validator.test.js",
  "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-validator.js",
  "tests/human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-validator.test.js",
  "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-reviewer-role-evidence-validator.js",
  "tests/human-review-controlled-handoff-human-professional-approval-reviewer-role-evidence-validator.test.js",
  "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-validator.js",
  "tests/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-validator.test.js",
];
const transitionTestPaths = [
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-contract-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-package-schema-export-scope-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-schema-scaffold-scope-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-error-path-semantics-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-helper-readiness-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-result-package-schema-export-scope-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-result-schema-readiness-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-result-schema-scaffold-scope-boundary-doc-freeze.test.js",
  "tests/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-schema.test.js",
  "tests/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-result-schema.test.js",
];
const declaredFields = [
  "contract_id",
  "contract_version",
  "decision_basis_ref",
  "approval_ref",
  "review_session_ref",
  "reviewer_ref",
  "reviewer_role",
  "decision",
  "basis_subject_kind",
  "basis_subject_ref",
  "basis_posture",
  "binding_issuer_ref",
  "binding_provenance_ref",
  "basis_lifecycle_posture",
  "verification_posture",
  "human_professional_review_required",
];
const duplicateParticipants = [
  "decision_basis_ref",
  "approval_ref",
  "review_session_ref",
  "reviewer_ref",
  "basis_subject_ref",
  "binding_issuer_ref",
  "binding_provenance_ref",
];
const fieldPaths = declaredFields.map((field) => `$.${field}`);
const duplicatePaths = duplicateParticipants.map((field) => `$.${field}`);
const errorCodes = [
  "required_field_missing",
  "unexpected_field",
  "invalid_field_type",
  "invalid_field_value",
  "duplicate_reference",
];
const exactPathPartitions = [
  fieldPaths,
  ["$"],
  ["$", ...fieldPaths],
  fieldPaths,
  duplicatePaths,
];

function absolute(relativePath) {
  return path.join(repoRoot, relativePath);
}

function readRequired(relativePath) {
  assert.equal(fs.existsSync(absolute(relativePath)), true, relativePath);
  return fs.readFileSync(absolute(relativePath), "utf8");
}

function sectionBetween(text, startHeading, endHeading) {
  const start = text.indexOf(startHeading);
  assert.notEqual(start, -1, startHeading);
  const end = endHeading ? text.indexOf(endHeading, start + startHeading.length) : text.length;
  assert.notEqual(end, -1, endHeading ?? "EOF");
  return text.slice(start, end);
}

function tableLines(sectionText) {
  return sectionText
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("|"));
}

test("scaffold-scope boundary document and canonical sources exist with required header markers", () => {
  const docsText = readRequired(docsPath);
  for (const requiredPath of [proofPath, ...canonicalPaths, ...precedentPaths, ...transitionTestPaths]) {
    assert.equal(fs.existsSync(absolute(requiredPath)), true, requiredPath);
  }

  const requiredMarkers = [
    "HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_VALIDATOR_HELPER_SCAFFOLD_SCOPE_BOUNDARY",
    "DOCS_ONLY",
    "APPEND_ONLY_VALIDATOR_HELPER_SCOPE",
    "OWNER_SELECTED_STAGE_1_OPTION_A",
    "OWNER_SELECTED_STAGE_2_OPTION_A",
    "OWNER_SELECTED_STAGE_3_OPTION_A",
    "OWNER_SELECTED_STAGE_4_OPTION_A",
    "OWNER_SELECTED_STAGE_5_OPTION_A",
    "OWNER_SELECTED_STAGE_6_OPTION_A",
    "OWNER_SELECTED_STAGE_7_OPTION_A",
    "OWNER_SELECTED_STAGE_8_OPTION_A",
    "EIGHT_SCOPE_DECISIONS_RESOLVED",
    "EXACT_INTERNAL_MODULE_ONLY_SURFACE_DEFINED",
    "PROOF_TRANSITION_PREREQUISITE_REQUIRED_FIRST",
    "EXACT_TWO_FILE_RUNTIME_CHANGE_SCOPE_DEFINED_AFTER_PREREQUISITE",
    "PACKAGE_INDEX_UNCHANGED",
    "PACKAGE_EXPORT_NOT_CREATED",
    "VALIDATOR_DISPATCH_NOT_CHANGED",
    "VALIDATOR_NOT_CREATED_BY_THIS_SLICE",
    "VALIDATION_EXECUTION_NOT_CREATED_BY_THIS_SLICE",
    "NO_IMPLEMENTATION_CREATED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
  ];

  for (const marker of requiredMarkers) {
    assert.match(docsText, new RegExp(`^${marker}$`, "mu"), marker);
  }
});

test("scaffold-scope boundary aligns exactly with candidate and validator-result schemas", () => {
  const docsText = readRequired(docsPath);

  assert.deepEqual(candidateSchema.required, declaredFields);
  assert.deepEqual(Object.keys(candidateSchema.properties), declaredFields);
  assert.equal(candidateSchema.allOf.length, 6);

  const resultBranches = resultSchema.properties.errors.items.oneOf;
  assert.equal(resultBranches.length, errorCodes.length);
  for (let i = 0; i < errorCodes.length; i += 1) {
    const branch = resultBranches[i];
    assert.equal(branch.properties.code.const, errorCodes[i]);
    const permitted = branch.properties.path.enum ?? [branch.properties.path.const];
    assert.deepEqual(permitted, exactPathPartitions[i]);
  }

  assert.match(docsText, /FUTURE_VALIDATOR_MODULE_EXPORT_COUNT:\n1/u);
  assert.match(docsText, /FUTURE_VALIDATOR_FUNCTION_ARITY:\n1/u);
  assert.match(docsText, /FUTURE_VALIDATOR_PHASE_1_SUBPASS_COUNT:\n4/u);
  assert.match(docsText, /FUTURE_VALIDATOR_DECLARED_FIELD_COUNT:\n16/u);
  assert.match(docsText, /FUTURE_VALIDATOR_DUPLICATE_PARTICIPANT_COUNT:\n7/u);
  assert.match(docsText, /FUTURE_VALIDATOR_PHASE_COUNT:\n2/u);
  assert.match(docsText, /FUTURE_VALIDATOR_ERROR_CODE_COUNT:\n5/u);
  assert.match(docsText, /FUTURE_VALIDATOR_STATIC_ERROR_PATH_COUNT:\n17/u);
  assert.match(docsText, /FUTURE_VALIDATOR_INDEXED_PATH_TEMPLATE_COUNT:\n0/u);
  assert.match(docsText, /FUTURE_VALIDATOR_CODE_TO_PATH_PARTITION_COUNT:\n5/u);
  assert.match(docsText, /FUTURE_VALIDATOR_FAIL_CLOSED_CASCADE_RULE_COUNT:\n6/u);
  assert.match(docsText, /FUTURE_VALIDATOR_FOCUSED_PROOF_FAMILY_COUNT:\n16/u);

  const algoSection = sectionBetween(docsText, "## 7. Exact Future Validation Algorithm", "## 8.");
  const partitionRows = tableLines(algoSection);
  assert.equal(partitionRows.length, 2 + errorCodes.length);
  for (let i = 0; i < errorCodes.length; i += 1) {
    const expectedRow = `| \`${errorCodes[i]}\` | ${exactPathPartitions[i].map((p) => `\`${p}\``).join(", ")} |`;
    assert.equal(partitionRows[i + 2], expectedRow);
  }
});

test("prerequisite scope, denial-transition sites, and two-file future implementation scope are exact", () => {
  const docsText = readRequired(docsPath);
  const scopeSection = sectionBetween(
    docsText,
    "## 8. Decision 5: Exact Prerequisite And Implementation File Scopes",
    "## 9.",
  );
  const denialSection = sectionBetween(docsText, "## 9. Decision 6: Existing Denial Tests", "## 10.");
  const resolvedSection = sectionBetween(docsText, "## 12. Resolved Readiness Decisions", "## 13.");

  assert.match(scopeSection, /PROOF_TRANSITION_PREREQUISITE_FILE_COUNT:\n12/u);
  assert.match(scopeSection, /PROOF_TRANSITION_EXISTING_ALIGNMENT_TEST_FILE_COUNT:\n10/u);
  assert.match(scopeSection, /FUTURE_VALIDATOR_HELPER_IMPLEMENTATION_FILE_COUNT:\n2/u);
  assert.match(denialSection, /LIVE_HELPER_PATH_ABSENCE_ASSERTION_TRANSITION_COUNT:\n48/u);
  assert.match(denialSection, /LIVE_HELPER_PATH_ALIGNMENT_TEST_FILE_COUNT:\n10/u);
  assert.match(denialSection, /LIVE_HELPER_PATH_ABSENCE_ASSERTION_SITE_COUNT:\n14/u);
  assert.match(resolvedSection, /RESOLVED_VALIDATOR_HELPER_SCOPE_DECISION_COUNT:\n8/u);

  for (const requiredRef of [proofTransitionPath, proofTransitionProofPath, ...transitionTestPaths, ...futureImplementationPaths]) {
    assert.equal(scopeSection.includes("`" + requiredRef + "`"), true, requiredRef);
  }

  const siteRows = tableLines(denialSection);
  assert.equal(siteRows.length, 2 + 14);
  const summedChecks = siteRows
    .slice(2)
    .map((row) => Number(row.split("|").at(-2).trim()))
    .reduce((sum, count) => sum + count, 0);
  assert.equal(summedChecks, 48);

  const resolvedRows = tableLines(resolvedSection);
  assert.equal(resolvedRows.length, 2 + 8);
});

test("package index remains unchanged at 13165 lines and non-authorizations are preserved", () => {
  const docsText = readRequired(docsPath);
  const indexText = readRequired("packages/schemas/src/index.js");

  assert.equal(indexText.split("\n").length - 1, 13165);
  assert.match(docsText, /PACKAGE_INDEX_BASELINE_LINE_COUNT:\n13165/u);
  assert.match(docsText, /CURRENT_VALIDATOR_HELPER_SCAFFOLD_SCOPE_FILE_COUNT:\n3/u);
  assert.match(docsText, /NON_INTERFERENCE_RULE_COUNT:\n8/u);
  assert.match(
    docsText,
    /HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_VALIDATOR_HELPER_SCAFFOLD_SCOPE_BOUNDARY_STATUS:\nTRACKED_DOCS_ONLY_INTERNAL_VALIDATOR_HELPER_SCOPE_DEFINED/u,
  );
  assert.match(
    docsText,
    /REPO_NEXT_ACTION:\nproof transition prerequisite remains a separate slice/u,
  );

  for (const name of retainedPackageSiblingNames) {
    assert.equal(Object.hasOwn(packageSchemas, name), false, name);
  }

  // Transition-aware check: do not hard-forbid future implementation paths directly;
  // allow either pre-implementation absence or post-prerequisite tracking.
  const transitionTracked = fs.existsSync(absolute(proofTransitionPath));
  if (!transitionTracked) {
    assert.equal(Object.hasOwn(packageSchemas, futureFunctionName), false, futureFunctionName);
  }
});
