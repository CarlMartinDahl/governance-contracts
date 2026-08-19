"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_VALIDATOR_RESULT_SCHEMA_READINESS_BOUNDARY_v1.md";
const proofPath =
  "tests/domain-human-review-controlled-handoff-human-professional-approval-validator-result-schema-readiness-boundary-doc-freeze.test.js";
const candidateSchemaPath =
  "schemas/human-review-controlled-handoff-human-professional-approval.json";
const validatorResultProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_VALIDATOR_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const packageExportProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const validatorResultPackageExportProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const controllingPaths = [
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_CONTRACT_BOUNDARY_v1.md",
  candidateSchemaPath,
  "tests/human-review-controlled-handoff-human-professional-approval-schema.test.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_VALIDATOR_ERROR_PATH_SEMANTICS_BOUNDARY_v1.md",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-validator-error-path-semantics-boundary-doc-freeze.test.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_VALIDATOR_RESULT_SCHEMA_READINESS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_VALIDATOR_RESULT_SCHEMA_READINESS_BOUNDARY_v1.md",
  "schemas/human-review-questions-validator-result.json",
  "schemas/human-review-no-conclusion-notice-validator-result.json",
];
const reservedLaterPaths = [
  "schemas/human-review-controlled-handoff-human-professional-approval-validator-result.json",
  "tests/human-review-controlled-handoff-human-professional-approval-validator-result-schema.test.js",
  "tests/human-review-controlled-handoff-human-professional-approval-package-export.test.js",
  "tests/human-review-controlled-handoff-human-professional-approval-validator-result-package-export.test.js",
  "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-validator.js",
  "tests/human-review-controlled-handoff-human-professional-approval-validator.test.js",
];
const validatorResultCandidatePaths = reservedLaterPaths.slice(0, 2);
const candidatePackageExportProofPath = reservedLaterPaths[2];
const validatorResultPackageExportProofPath = reservedLaterPaths[3];
const retainedValidatorPaths = reservedLaterPaths.slice(4);
const errorCodes = [
  "required_field_missing",
  "unexpected_field",
  "invalid_field_type",
  "invalid_field_value",
  "invalid_cross_field_combination",
  "duplicate_reference",
];
const indexedPaths = [
  "$.decision_support.decision_basis_refs[<index>]",
  "$.decision_support.prior_approval_refs[<index>]",
  "$.decision_support.correction_request_refs[<index>]",
];

function absolute(relativePath) {
  return path.join(repoRoot, relativePath);
}

function readRequired(relativePath) {
  assert.equal(fs.existsSync(absolute(relativePath)), true, relativePath);
  return fs.readFileSync(absolute(relativePath), "utf8");
}

function sectionBetween(docsText, start, end) {
  const startIndex = docsText.indexOf(start);
  const endIndex = docsText.indexOf(end, startIndex + start.length);

  assert.notEqual(startIndex, -1, start);
  assert.notEqual(endIndex, -1, end);
  return docsText.slice(startIndex, endIndex);
}

test("approval validator-result readiness boundary and every source exist", () => {
  const docsText = readRequired(docsPath);

  for (const sourcePath of controllingPaths) {
    readRequired(sourcePath);
    assert.equal(docsText.includes("`" + sourcePath + "`"), true, sourcePath);
  }

  assert.match(
    docsText,
    /HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_VALIDATOR_RESULT_SCHEMA_READINESS_BOUNDARY/u,
  );
  assert.match(docsText, /DOCS_ONLY/u);
  assert.match(docsText, /APPEND_ONLY_SCHEMA_READINESS_ASSESSMENT/u);
  assert.match(docsText, /VALIDATOR_RESULT_SCHEMA_READINESS_ASSESSED/u);
});

test("candidate schema remains tracked and separate with historical export posture preserved", () => {
  const docsText = readRequired(docsPath);
  const proofText = readRequired(proofPath);
  const packageExportTransitionText = readRequired(
    packageExportProofTransitionPath,
  );
  const candidateSchema = require("../" + candidateSchemaPath);

  assert.equal(candidateSchema.type, "object");
  assert.equal(
    packageExportTransitionText.includes(
      "`humanReviewControlledHandoffHumanProfessionalApproval`",
    ),
    true,
  );
  assert.match(
    packageExportTransitionText,
    /HISTORICAL_CANDIDATE_SCHEMA_UNEXPORTED_MARKERS_PRESERVED/u,
  );
  assert.equal(
    proofText.includes("const package" + "Schemas = require("),
    false,
  );
  assert.match(
    docsText,
    /HUMAN_PROFESSIONAL_APPROVAL_CANDIDATE_SCHEMA_STATUS:\nTRACKED_UNEXPORTED_CONTRACT_ONLY/u,
  );
  assert.match(docsText, /VALIDATOR_RESULT_SCHEMA_STATUS:\nNOT_CREATED/u);
  assert.match(
    docsText,
    /must not be added to, nested inside, or represented\nas a branch/u,
  );
});

test("exact four-field result and two-field error shapes are available", () => {
  const docsText = readRequired(docsPath);
  const resultSection = sectionBetween(
    docsText,
    "## 4. Exact Result Shape Available",
    "## 5.",
  );
  const errorSection = sectionBetween(
    docsText,
    "## 5. Exact Error-Item Shape Available",
    "## 6.",
  );

  assert.equal((resultSection.match(/^\| [1-4] \|/gmu) ?? []).length, 4);
  assert.equal((errorSection.match(/^\| [1-2] \|/gmu) ?? []).length, 2);
  for (const field of ["valid", "contractKind", "version", "errors"]) {
    assert.equal(resultSection.includes("`" + field + "`"), true, field);
  }
  for (const field of ["code", "path"]) {
    assert.equal(errorSection.includes("`" + field + "`"), true, field);
  }
  assert.match(resultSection, /VALIDATOR_RESULT_FIELD_COUNT:\n4/u);
  assert.match(
    resultSection,
    /HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_VALIDATOR_BOUNDARY/u,
  );
  assert.match(resultSection, /`valid: true` if and only if `errors` is empty/u);
  assert.match(
    resultSection,
    /`valid: false` if and only if `errors` contains at least one item/u,
  );
  assert.match(errorSection, /VALIDATION_ERROR_ITEM_FIELD_COUNT:\n2/u);
});

test("six codes twenty static paths and three indexed templates are exact", () => {
  const docsText = readRequired(docsPath);
  const section = sectionBetween(
    docsText,
    "## 6. Exact Closed Codes And Path Grammar Available",
    "## 7.",
  );

  for (const errorCode of errorCodes) {
    assert.equal(section.includes("`" + errorCode + "`"), true, errorCode);
  }
  for (const indexedPath of indexedPaths) {
    assert.equal(section.includes("`" + indexedPath + "`"), true, indexedPath);
  }
  assert.match(section, /VALIDATION_ERROR_CODE_COUNT:\n6/u);
  assert.match(section, /VALIDATION_ERROR_STATIC_PATH_COUNT:\n20/u);
  assert.match(section, /VALIDATION_ERROR_INDEXED_PATH_TEMPLATE_COUNT:\n3/u);
  assert.match(section, /VALIDATION_ERROR_PATH_TEMPLATE_COUNT:\n23/u);
  assert.equal(section.includes("`(?:0|[1-9][0-9]*)`"), true);
  assert.equal((section.match(/^\d+\. `\^\\\$/gmu) ?? []).length, 3);
});

test("six code-to-path partitions are closed and schema-ready", () => {
  const docsText = readRequired(docsPath);
  const section = sectionBetween(
    docsText,
    "## 7. Exact Code-To-Path Partition Available",
    "## 8.",
  );

  assert.equal((section.match(/^\| `[^`]+` \|/gmu) ?? []).length, 6);
  assert.match(section, /CODE_TO_PATH_PARTITION_COUNT:\n6/u);
  assert.match(section, /nineteen declared root-field or nested-field static paths/u);
  assert.match(section, /fourteen declared scalar field paths/u);
  assert.match(section, /Independent global code and path constraints/u);
  assert.match(section, /invalid\ncode\/path cross-pairs/u);
});

test("schema-expressible facts remain separate from validator behavior", () => {
  const docsText = readRequired(docsPath);
  const section = sectionBetween(
    docsText,
    "## 8. Schema-Expressible And Validator-Only Boundaries",
    "## 9.",
  );

  for (const phrase of [
    "exact closed four-field root",
    "exact code-to-path branch partition",
    "uniqueItems: true",
    "seven-phase validation execution",
    "parent-gated error cascade",
    "first-occurrence exact `{ code, path }` deduplication behavior",
    "descriptor-safe inspection",
    "recursive result immutability",
    "reviewer authority",
  ]) {
    assert.equal(section.includes(phrase), true, phrase);
  }
  assert.match(section, /SCHEMA_DOES_NOT_CREATE_VALIDATOR_BEHAVIOR:\nTRUE/u);
  assert.match(section, /SCHEMA_DOES_NOT_CREATE_APPROVAL_EFFECT:\nTRUE/u);
});

test("six scaffold questions remain open at the next semantic gate", () => {
  const docsText = readRequired(docsPath);
  const questionSection = sectionBetween(
    docsText,
    "## 9. Open Scaffold-Scope Questions",
    "## 10.",
  );

  assert.equal((questionSection.match(/^\d+\./gmu) ?? []).length, 6);
  assert.match(
    docsText,
    /OPEN_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_QUESTION_COUNT:\n6/u,
  );
  assert.match(
    docsText,
    /VALIDATOR_RESULT_SCHEMA_READINESS:\nREADY_FOR_DOCS_ONLY_SCAFFOLD_SCOPE_DECISION/u,
  );
  assert.match(docsText, /No answer is inferred by this readiness assessment/u);
});

test("two-file readiness scope preserves history current partition and no conclusions", () => {
  const docsText = readRequired(docsPath);
  const proofText = readRequired(proofPath);
  const validatorResultTransitionText = readRequired(
    validatorResultProofTransitionPath,
  );
  const packageExportTransitionText = readRequired(
    packageExportProofTransitionPath,
  );
  const validatorResultPackageExportTransitionText = readRequired(
    validatorResultPackageExportProofTransitionPath,
  );
  const scopeSection = sectionBetween(
    docsText,
    "## 11. Exact Current File Scope",
    "## 12.",
  );

  for (const validatorResultCandidatePath of validatorResultCandidatePaths) {
    assert.equal(
      scopeSection.includes("`" + validatorResultCandidatePath + "`"),
      true,
      validatorResultCandidatePath,
    );
    assert.equal(
      validatorResultTransitionText.includes(
        "`" +
          validatorResultCandidatePath +
          "` | `PERMITTED_AFTER_ALL_PROOF_ALIGNMENTS_IN_SEPARATE_LATER_CONTRACT_ONLY_SLICE`",
      ),
      true,
      validatorResultCandidatePath,
    );
  }
  assert.equal(
    proofText.includes(
      "fs." + "existsSync(absolute(validatorResultCandidatePath))",
    ),
    false,
  );
  assert.equal(
    packageExportTransitionText.includes(
      "`" + proofPath + "` | `SEPARATE_FOCUSED_ALIGNMENT_REQUIRED`",
    ),
    true,
  );
  assert.equal(
    packageExportTransitionText.includes(
      "`" + candidatePackageExportProofPath + "`",
    ),
    true,
  );
  assert.equal(
    proofText.includes(
      "fs." + "existsSync(absolute(candidatePackageExportProofPath))",
    ),
    false,
  );
  assert.equal(
    validatorResultPackageExportTransitionText.includes(
      "`" + proofPath + "` | `SEPARATE_FOCUSED_ALIGNMENT_REQUIRED`",
    ),
    true,
  );
  assert.equal(
    validatorResultPackageExportTransitionText.includes(
      "`" + validatorResultPackageExportProofPath + "`",
    ),
    true,
  );
  assert.equal(
    proofText.includes(
      "fs." +
        "existsSync(absolute(validatorResultPackageExportProofPath))",
    ),
    false,
  );
  const validatorHelperProofTransitionText = readRequired(
    "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
  );
  for (const retainedPath of retainedValidatorPaths) {
    assert.equal(
      scopeSection.includes("`" + retainedPath + "`"),
      true,
      retainedPath,
    );
    assert.equal(
      validatorResultTransitionText.includes(
        "`" + retainedPath + "` | `RETAIN_LIVE_ABSENCE_ASSERTION`",
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
  assert.match(
    validatorResultTransitionText,
    /VALIDATOR_RESULT_SCHEMA_CANDIDATE_PATH_TRANSITION_COUNT:\n2/u,
  );
  assert.match(
    validatorResultTransitionText,
    /RETAINED_PACKAGE_AND_VALIDATOR_SIBLING_ABSENCE_COUNT:\n4/u,
  );
  assert.match(
    validatorResultTransitionText,
    /REMAINING_FOCUSED_PROOF_ALIGNMENT_COUNT:\n8/u,
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
  assert.match(scopeSection, /CURRENT_READINESS_SLICE_FILE_COUNT:\n2/u);
  assert.equal(scopeSection.includes("`" + docsPath + "`"), true);
  assert.equal(scopeSection.includes("`" + proofPath + "`"), true);

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
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
  ]) {
    assert.equal(docsText.includes(marker), true, marker);
  }
  assert.match(docsText, /not actual human review/u);
  assert.match(docsText, /real-evidence review/u);
  assert.doesNotMatch(docsText, /\/Users\//u);
});
