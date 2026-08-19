"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const tick = String.fromCharCode(96);
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md";
const proofPath =
  "tests/domain-human-review-controlled-handoff-human-professional-approval-validator-result-schema-scaffold-scope-boundary-doc-freeze.test.js";
const readinessPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_VALIDATOR_RESULT_SCHEMA_READINESS_BOUNDARY_v1.md";
const proofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_VALIDATOR_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const packageExportProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const validatorResultPackageExportProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const controllingPaths = [
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_CONTRACT_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_VALIDATOR_ERROR_PATH_SEMANTICS_BOUNDARY_v1.md",
  readinessPath,
  "schemas/human-review-controlled-handoff-human-professional-approval.json",
  "tests/human-review-controlled-handoff-human-professional-approval-schema.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-validator-error-path-semantics-boundary-doc-freeze.test.js",
  "packages/schemas/src/index.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "schemas/human-review-questions-validator-result.json",
  "tests/human-review-questions-validator-result-schema.test.js",
  "schemas/human-review-no-conclusion-notice-validator-result.json",
  "tests/human-review-no-conclusion-notice-validator-result-schema.test.js",
];
const futureSchemaPaths = [
  "schemas/human-review-controlled-handoff-human-professional-approval-validator-result.json",
  "tests/human-review-controlled-handoff-human-professional-approval-validator-result-schema.test.js",
];
const retainedSiblingPaths = [
  "tests/human-review-controlled-handoff-human-professional-approval-package-export.test.js",
  "tests/human-review-controlled-handoff-human-professional-approval-validator-result-package-export.test.js",
  "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-validator.js",
  "tests/human-review-controlled-handoff-human-professional-approval-validator.test.js",
];
const candidatePackageExportProofPath = retainedSiblingPaths[0];
const validatorResultPackageExportProofPath = retainedSiblingPaths[1];
const retainedValidatorPaths = retainedSiblingPaths.slice(2);
const remainingProofAlignmentPaths = [
  "tests/domain-human-review-controlled-handoff-human-professional-approval-contract-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-schema-readiness-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-schema-scaffold-scope-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-schema-scaffold-proof-self-transition-hardening-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-schema-hardening-proof-candidate-path-alignment-boundary-doc-freeze.test.js",
  "tests/human-review-controlled-handoff-human-professional-approval-schema.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-validator-error-path-semantics-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-validator-result-schema-readiness-boundary-doc-freeze.test.js",
];
const rootKeywords = [
  "$schema",
  "$id",
  "title",
  "type",
  "additionalProperties",
  "required",
  "properties",
  "oneOf",
];
const staticPaths = [
  "$",
  "$.contract_id",
  "$.contract_version",
  "$.approval_ref",
  "$.packet_ref",
  "$.controlled_handoff_brief_ref",
  "$.controlled_handoff_brief_fingerprint",
  "$.approval_posture",
  "$.decision",
  "$.reviewer_attribution",
  "$.decision_support",
  "$.decided_at",
  "$.review_session_ref",
  "$.decision_attestation_ref",
  "$.reviewer_attribution.reviewer_ref",
  "$.reviewer_attribution.reviewer_role",
  "$.reviewer_attribution.reviewer_authority_evidence_ref",
  "$.decision_support.decision_basis_refs",
  "$.decision_support.prior_approval_refs",
  "$.decision_support.correction_request_refs",
];
const codes = [
  "required_field_missing",
  "unexpected_field",
  "invalid_field_type",
  "invalid_field_value",
  "invalid_cross_field_combination",
  "duplicate_reference",
];
const jsonPatternStrings = [
  "^\\\\$\\\\.decision_support\\\\.decision_basis_refs\\\\[(?:0|[1-9][0-9]*)\\\\]$",
  "^\\\\$\\\\.decision_support\\\\.prior_approval_refs\\\\[(?:0|[1-9][0-9]*)\\\\]$",
  "^\\\\$\\\\.decision_support\\\\.correction_request_refs\\\\[(?:0|[1-9][0-9]*)\\\\]$",
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

function assertOrdered(text, values) {
  let previous = -1;
  for (const value of values) {
    const index = text.indexOf(value, previous + 1);
    assert.notEqual(index, -1, value);
    assert.equal(index > previous, true, value);
    previous = index;
  }
}

test("scaffold scope references exact controlling and precedent sources", () => {
  const docsText = readRequired(docsPath);

  for (const sourcePath of controllingPaths) {
    readRequired(sourcePath);
    assert.equal(docsText.includes(tick + sourcePath + tick), true, sourcePath);
  }
  assert.match(
    docsText,
    /HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY/u,
  );
  assert.match(docsText, /DOCS_ONLY/u);
  assert.match(
    docsText,
    /does not supply\nHuman Review Controlled Handoff human\/professional approval semantics/u,
  );
});

test("future two-file schema slice is exact and first-proof transition permitted", () => {
  const docsText = readRequired(docsPath);
  const transitionText = readRequired(proofTransitionPath);
  const identity = section(docsText, "## 4.", "## 5.");

  assert.match(docsText, /FUTURE_VALIDATOR_RESULT_SCHEMA_SLICE_FILE_COUNT:\n2/u);
  for (const futurePath of futureSchemaPaths) {
    assert.equal(docsText.includes(tick + futurePath + tick), true, futurePath);
    assert.equal(
      transitionText.includes(
        tick +
          futurePath +
          tick +
          " | " +
          tick +
          "PERMITTED_AFTER_ALL_PROOF_ALIGNMENTS_IN_SEPARATE_LATER_CONTRACT_ONLY_SLICE" +
          tick,
      ),
      true,
      futurePath,
    );
  }
  assert.match(
    transitionText,
    /VALIDATOR_RESULT_SCHEMA_CANDIDATE_PATH_TRANSITION_COUNT:\n2/u,
  );
  assert.match(
    transitionText,
    /VALIDATOR_RESULT_SCHEMA_LIVE_PROOF_CONFLICT_COUNT:\n9/u,
  );
  assert.match(
    transitionText,
    /RETAINED_PACKAGE_AND_VALIDATOR_SIBLING_ABSENCE_COUNT:\n4/u,
  );
  assert.match(
    transitionText,
    /REMAINING_FOCUSED_PROOF_ALIGNMENT_COUNT:\n8/u,
  );
  assert.match(transitionText, /CURRENT_PREREQUISITE_FILE_COUNT:\n2/u);
  assert.match(
    transitionText,
    /DIRECT_SCAFFOLD_PROOF_TRANSITION_STEP_COUNT:\n9/u,
  );
  assertOrdered(
    identity,
    rootKeywords.map((keyword) => tick + keyword + tick),
  );
  assert.match(identity, /FUTURE_VALIDATOR_RESULT_ROOT_KEYWORD_COUNT:\n8/u);
  assert.match(
    identity,
    /https:\/\/governance-contracts\.invalid\/schemas\/human-review-controlled-handoff-human-professional-approval-validator-result\.json/u,
  );
  assert.match(
    identity,
    /Human Review Controlled Handoff Human\/Professional Approval Validator Result Contract/u,
  );
});

test("closed root states and exact inline item orders are frozen", () => {
  const docsText = readRequired(docsPath);
  const root = section(docsText, "## 5.", "## 6.");
  const states = section(docsText, "## 6.", "## 7.");
  const errors = section(docsText, "## 7.", "## 8.");
  const itemStart = errors.indexOf("`errors.items`");

  assert.equal((root.match(/^\| \d+ \|/gmu) ?? []).length, 4);
  assertOrdered(
    root,
    ["valid", "contractKind", "version", "errors"].map(
      (field) => tick + field + tick,
    ),
  );
  assert.match(root, /FUTURE_VALIDATOR_RESULT_REQUIRED_PROPERTY_COUNT:\n4/u);
  assert.match(root, /FUTURE_VALIDATOR_RESULT_ADDITIONAL_PROPERTIES:\nFALSE/u);
  assert.match(states, /FUTURE_VALIDATOR_RESULT_STATE_BRANCH_KEYWORD:\noneOf/u);
  assert.match(states, /FUTURE_VALIDATOR_RESULT_STATE_BRANCH_COUNT:\n2/u);
  assert.match(states, /valid const true\x60; \x60errors maxItems 0/u);
  assert.match(states, /valid const false\x60; \x60errors minItems 1/u);
  assert.notEqual(itemStart, -1);
  assertOrdered(
    errors.slice(0, itemStart),
    ["type", "uniqueItems", "items"].map((key) => tick + key + tick),
  );
  assertOrdered(
    errors.slice(itemStart),
    ["type", "additionalProperties", "required", "properties", "oneOf"].map(
      (key) => tick + key + tick,
    ),
  );
  assert.match(errors, /FUTURE_VALIDATION_ERRORS_KEYWORD_COUNT:\n3/u);
  assert.match(errors, /FUTURE_VALIDATION_ERROR_ITEM_KEYWORD_COUNT:\n5/u);
  assert.match(errors, /required: \["code", "path"\]/u);
  assert.match(errors, /FUTURE_VALIDATION_ERROR_ITEM_DEFS_COUNT:\n0/u);
});

test("twenty static paths and three JSON-escaped patterns are exact", () => {
  const docsText = readRequired(docsPath);
  const pathSection = section(docsText, "## 8.", "## 9.");
  const patternSection = section(docsText, "## 9.", "## 10.");

  for (const canonicalPath of staticPaths) {
    assert.equal(
      pathSection.includes(tick + canonicalPath + tick),
      true,
      canonicalPath,
    );
  }
  assert.match(pathSection, /FUTURE_VALIDATION_ERROR_STATIC_PATH_COUNT:\n20/u);
  assert.match(
    pathSection,
    /FUTURE_VALIDATION_ERROR_SCALAR_VALUE_PATH_COUNT:\n14/u,
  );
  for (const pattern of jsonPatternStrings) {
    assert.equal(
      patternSection.includes(tick + pattern + tick),
      true,
      pattern,
    );
  }
  assert.match(
    patternSection,
    /FUTURE_VALIDATION_ERROR_INDEXED_PATH_PATTERN_COUNT:\n3/u,
  );
  assert.match(patternSection, /exactly \x60\(\?:0\|\[1-9\]\[0-9\]\*\)\x60/u);
  assert.match(patternSection, /leading-zero\nmulti-digit index/u);
});

test("all six exact code-path branches preserve the closed partition", () => {
  const docsText = readRequired(docsPath);
  const allBranches = section(docsText, "## 10.", "## 17.");
  const branchOrder = section(docsText, "## 16.", "## 17.");

  assert.equal((branchOrder.match(/^\d+\. /gmu) ?? []).length, 6);
  assertOrdered(
    branchOrder,
    codes.map((code) => tick + code + tick),
  );
  for (const marker of [
    "REQUIRED_FIELD_MISSING_PATH_ENUM_COUNT:\n19",
    "UNEXPECTED_FIELD_PATH_ENUM_COUNT:\n3",
    "INVALID_FIELD_TYPE_PATH_BRANCH_COUNT:\n4",
    "INVALID_FIELD_VALUE_STATIC_PATH_ENUM_COUNT:\n16",
    "INVALID_FIELD_VALUE_PATH_BRANCH_COUNT:\n4",
    "INVALID_CROSS_FIELD_COMBINATION_PATH_BRANCH_COUNT:\n1",
    "DUPLICATE_REFERENCE_PATH_BRANCH_COUNT:\n3",
    "FUTURE_VALIDATION_ERROR_CODE_PATH_BRANCH_COUNT:\n6",
  ]) {
    assert.equal(allBranches.includes(marker), true, marker);
  }
  assert.match(allBranches, /reordered branches are\nprohibited/u);
});

test("unique items stay distinct from validator and approval behavior", () => {
  const docsText = readRequired(docsPath);
  const duplicates = section(docsText, "## 17.", "## 18.");
  const validatorOnly = section(docsText, "## 18.", "## 19.");

  assert.match(
    duplicates,
    /FUTURE_VALIDATION_ERROR_ARRAY_UNIQUE_ITEMS:\nTRUE/u,
  );
  for (const marker of [
    "seven-phase validation execution",
    "parent-gated error cascade",
    "first-occurrence exact",
    "later-occurrence duplicate detection",
    "accessor non-execution",
    "input non-mutation",
    "recursive result immutability",
    "reviewer authority",
    "admissibility",
    "approval effect",
  ]) {
    assert.equal(validatorOnly.includes(marker), true, marker);
  }
  assert.match(
    validatorOnly,
    /SCHEMA_DOES_NOT_CREATE_VALIDATOR_BEHAVIOR:\nTRUE/u,
  );
  assert.match(
    validatorOnly,
    /SCHEMA_DOES_NOT_CREATE_APPROVAL_EFFECT:\nTRUE/u,
  );
});

test("exports stay separate and proof transition remains mandatory", () => {
  const docsText = readRequired(docsPath);
  const siblings = section(docsText, "## 19.", "## 20.");
  const transition = section(docsText, "## 21.", "## 22.");
  const resolved = section(docsText, "## 22.", "## 23.");

  assert.match(
    siblings,
    /CANDIDATE_PACKAGE_SCHEMA_EXPORT_INCLUDED_IN_FUTURE_SCHEMA_SLICE:\nFALSE/u,
  );
  assert.match(
    siblings,
    /VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_INCLUDED_IN_FUTURE_SCHEMA_SLICE:\nFALSE/u,
  );
  assert.match(
    transition,
    /VALIDATOR_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_REQUIRED:\nTRUE/u,
  );
  assert.match(
    transition,
    /VALIDATOR_RESULT_SCHEMA_PATH_TRANSITION_COUNT_REQUIRED:\n2/u,
  );
  assert.match(
    transition,
    /RETAINED_PACKAGE_AND_VALIDATOR_SIBLING_ABSENCE_COUNT_REQUIRED:\n4/u,
  );
  assert.equal((resolved.match(/^\| \d+ \|/gmu) ?? []).length, 6);
  assert.match(
    resolved,
    /RESOLVED_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_QUESTION_COUNT:\n6/u,
  );
});

test("current slice stays exact two-file fail-closed and non-authorizing", () => {
  const docsText = readRequired(docsPath);
  const readinessText = readRequired(readinessPath);
  const transitionText = readRequired(proofTransitionPath);
  const packageExportTransitionText = readRequired(
    packageExportProofTransitionPath,
  );
  const validatorResultPackageExportTransitionText = readRequired(
    validatorResultPackageExportProofTransitionPath,
  );
  const scaffoldProofText = readRequired(proofPath);

  assert.match(docsText, /CURRENT_SCHEMA_SCAFFOLD_SCOPE_FILE_COUNT:\n2/u);
  for (const currentPath of [docsPath, proofPath]) {
    assert.equal(docsText.includes(tick + currentPath + tick), true, currentPath);
    readRequired(currentPath);
  }
  for (const transitionScopePath of [proofTransitionPath, proofPath]) {
    assert.equal(
      transitionText.includes(tick + transitionScopePath + tick),
      true,
      transitionScopePath,
    );
    readRequired(transitionScopePath);
  }
  for (const absentPath of [...futureSchemaPaths, ...retainedSiblingPaths]) {
    assert.equal(docsText.includes(tick + absentPath + tick), true, absentPath);
  }
  for (const futurePath of futureSchemaPaths) {
    assert.equal(
      transitionText.includes(
        tick +
          futurePath +
          tick +
          " | " +
          tick +
          "PERMITTED_AFTER_ALL_PROOF_ALIGNMENTS_IN_SEPARATE_LATER_CONTRACT_ONLY_SLICE" +
          tick,
      ),
      true,
      futurePath,
    );
  }
  const validatorHelperProofTransitionText = readRequired(
    "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
  );
  for (const retainedPath of retainedValidatorPaths) {
    assert.equal(
      transitionText.includes(
        tick +
          retainedPath +
          tick +
          " | " +
          tick +
          "RETAIN_LIVE_ABSENCE_ASSERTION" +
          tick,
      ),
      true,
      retainedPath,
    );
    assert.equal(
      validatorHelperProofTransitionText.includes("`" + retainedPath + "`"),
      true,
      retainedPath,
    );
  }
  assert.equal(
    packageExportTransitionText.includes(
      tick + proofPath + tick + " | " + tick + "SEPARATE_FOCUSED_ALIGNMENT_REQUIRED" + tick,
    ),
    true,
  );
  assert.equal(
    packageExportTransitionText.includes(
      tick + candidatePackageExportProofPath + tick,
    ),
    true,
  );
  assert.equal(
    scaffoldProofText.includes(
      "fs." + "existsSync(absolute(candidatePackageExportProofPath))",
    ),
    false,
  );
  assert.equal(
    validatorResultPackageExportTransitionText.includes(
      tick + proofPath + tick + " | " + tick + "SEPARATE_FOCUSED_ALIGNMENT_REQUIRED" + tick,
    ),
    true,
  );
  assert.equal(
    validatorResultPackageExportTransitionText.includes(
      tick + validatorResultPackageExportProofPath + tick,
    ),
    true,
  );
  assert.equal(
    scaffoldProofText.includes(
      "fs." +
        "existsSync(absolute(validatorResultPackageExportProofPath))",
    ),
    false,
  );
  for (const remainingPath of remainingProofAlignmentPaths) {
    readRequired(remainingPath);
    assert.equal(
      transitionText.includes(tick + remainingPath + tick),
      true,
      remainingPath,
    );
  }
  assert.equal(
    scaffoldProofText.includes(
      "fs." + "existsSync(absolute(futurePath))",
    ),
    false,
  );
  assert.match(docsText, /RETAINED_LATER_PATH_LIVE_ABSENCE_COUNT:\n6/u);
  assert.match(
    transitionText,
    /TRACKED_DOCS_ONLY_FIRST_VALIDATOR_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
  assert.match(
    packageExportTransitionText,
    /PACKAGE_SCHEMA_EXPORT_LIVE_PROOF_CONFLICT_COUNT:\n11/u,
  );
  assert.match(
    packageExportTransitionText,
    /REMAINING_FOCUSED_PROOF_ALIGNMENT_COUNT:\n10/u,
  );
  assert.match(
    validatorResultPackageExportTransitionText,
    /VALIDATOR_RESULT_PACKAGE_EXPORT_LIVE_PROOF_CONFLICT_COUNT:\n13/u,
  );
  assert.match(
    validatorResultPackageExportTransitionText,
    /REMAINING_FOCUSED_PROOF_ALIGNMENT_COUNT:\n12/u,
  );
  for (const marker of [
    "DOCS_ONLY",
    "HISTORICAL_SCHEMA_ABSENCE_MARKERS_PRESERVED",
    "SCHEMA_FILE_NOT_CREATED_BY_THIS_SLICE",
    "SCHEMA_PROOF_NOT_CREATED_BY_THIS_SLICE",
    "SCHEMA_EXPORT_NOT_CREATED",
    "VALIDATOR_NOT_CREATED",
    "APPROVAL_EFFECT_NOT_CREATED",
    "NO_RUNTIME_BEHAVIOR_CREATED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
  ]) {
    assert.equal(transitionText.includes(marker), true, marker);
  }
  assert.match(
    readinessText,
    /OPEN_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_QUESTION_COUNT:\n6/u,
  );
  for (const marker of [
    "SCHEMA_FILE_NOT_CREATED",
    "SCHEMA_PROOF_NOT_CREATED",
    "SCHEMA_EXPORT_NOT_CREATED",
    "VALIDATOR_NOT_CREATED",
    "VALIDATOR_DISPATCH_NOT_CHANGED",
    "VALIDATION_EXECUTION_NOT_CREATED",
    "CROSS_REFERENCE_ADMISSIBILITY_CHECKPOINT_NOT_CREATED",
    "APPROVAL_EFFECT_NOT_CREATED",
    "NO_RUNTIME_BEHAVIOR_CREATED",
    "NO_SOURCE_ACQUISITION_OR_CONTENT_INSPECTION_CREATED",
    "NO_DOMAIN_FINDING_SCORE_OR_CONCLUSION_CREATED",
    "NO_APPROVAL_OR_RELEASE_PRODUCT_IMPLEMENTATION_READINESS_CREATED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "TRACKED_DOCS_ONLY_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_DEFINED",
  ]) {
    assert.equal(docsText.includes(marker), true, marker);
  }
  assert.match(
    docsText,
    /not actual human review[\s\S]*chain-of-custody proof/u,
  );
});
