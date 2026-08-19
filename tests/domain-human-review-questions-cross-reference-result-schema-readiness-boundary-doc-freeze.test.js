"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const docsRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_CROSS_REFERENCE_RESULT_SCHEMA_READINESS_BOUNDARY_v1.md";
const proofRelativePath =
  "tests/domain-human-review-questions-cross-reference-result-schema-readiness-boundary-doc-freeze.test.js";
const resultSchemaRelativePath =
  "schemas/human-review-questions-cross-reference-result.json";
const resultSchemaProofRelativePath =
  "tests/human-review-questions-cross-reference-result-schema.test.js";
const resultSchemaProofTransitionRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_CROSS_REFERENCE_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const packageExportProofTransitionRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_CROSS_REFERENCE_RESULT_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const packageExportName = "humanReviewQuestionsCrossReferenceResult";
const tick = String.fromCharCode(96);
const newline = String.fromCharCode(10);
const controllingPaths = [
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_CROSS_REFERENCE_SEMANTICS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_CROSS_REFERENCE_READINESS_BOUNDARY_v1.md",
  "schemas/human-review-questions-validator-result.json",
  "tests/human-review-questions-validator-result-schema.test.js",
  "schemas/human-review-source-register-validator-result.json",
  "tests/human-review-source-register-validator-result-schema.test.js",
  "schemas/human-review-chronology-validator-result.json",
  "tests/human-review-chronology-validator-result-schema.test.js",
  "schemas/human-review-asserted-claim-matrix-validator-result.json",
  "tests/human-review-asserted-claim-matrix-validator-result-schema.test.js",
  "schemas/human-review-declared-packet-review-gaps-validator-result.json",
  "tests/human-review-declared-packet-review-gaps-validator-result-schema.test.js",
  "packages/schemas/src/index.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_SOURCE_REGISTER_CROSS_REFERENCE_RESULT_SCHEMA_READINESS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_CROSS_REFERENCE_RESULT_SCHEMA_READINESS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_CROSS_REFERENCE_RESULT_SCHEMA_READINESS_BOUNDARY_v1.md",
];

function absolutePath(relativePath) {
  return path.join(repoRoot, relativePath);
}

function readRequired(relativePath) {
  const targetPath = absolutePath(relativePath);
  assert.equal(
    fs.existsSync(targetPath),
    true,
    "expected " + relativePath + " to exist",
  );
  return fs.readFileSync(targetPath, "utf8");
}

function assertIncludes(text, expected, label = expected) {
  assert.equal(text.includes(expected), true, label);
}

function sectionBetween(text, startHeading, endHeading) {
  const start = text.indexOf(startHeading);
  const end = text.indexOf(endHeading, start + startHeading.length);
  assert.notEqual(start, -1, startHeading);
  assert.notEqual(end, -1, endHeading);
  return text.slice(start, end);
}

function numberedTableRowCount(text) {
  return text.split(newline).filter((line) => {
    if (!line.startsWith("|")) {
      return false;
    }
    const cells = line.split("|");
    const position = (cells[1] || "").trim();
    return position !== "" && Number.isInteger(Number(position));
  }).length;
}

function assertLinesInOrder(text, expectedLines) {
  let cursor = -1;

  for (const expectedLine of expectedLines) {
    const nextPosition = text.indexOf(expectedLine, cursor + 1);
    assert.notEqual(nextPosition, -1, expectedLine);
    assert.equal(nextPosition > cursor, true, expectedLine);
    cursor = nextPosition;
  }
}

test("Questions result-schema readiness boundary and sources exist", () => {
  const docsText = readRequired(docsRelativePath);

  for (const sourcePath of controllingPaths) {
    readRequired(sourcePath);
    assertIncludes(docsText, tick + sourcePath + tick, sourcePath);
  }

  for (const marker of [
    "HUMAN_REVIEW_QUESTIONS_CROSS_REFERENCE_RESULT_SCHEMA_READINESS_BOUNDARY",
    "DOCS_ONLY",
    "APPEND_ONLY_RESULT_SCHEMA_READINESS_ASSESSMENT",
    "RESULT_SCHEMA_READINESS_ASSESSED",
  ]) {
    assertIncludes(docsText, marker);
  }
});

test("five child validator-result schemas remain separate exports", () => {
  const docsText = readRequired(docsRelativePath);
  const packageSchemas = require("../packages/schemas/src/index.js");

  for (const exportName of [
    "humanReviewQuestionsValidatorResult",
    "humanReviewSourceRegisterValidatorResult",
    "humanReviewChronologyValidatorResult",
    "humanReviewAssertedClaimMatrixValidatorResult",
    "humanReviewDeclaredPacketReviewGapsValidatorResult",
  ]) {
    assert.equal(Object.hasOwn(packageSchemas, exportName), true, exportName);
  }

  assertIncludes(docsText, "CHILD_VALIDATOR_RESULT_SCHEMA_COUNT:" + newline + "5");
  assertIncludes(
    docsText,
    "CHILD_VALIDATOR_RESULT_SCHEMA_STATUS:" +
      newline +
      "TRACKED_AND_PACKAGE_EXPORTED",
  );
  assertIncludes(
    docsText,
    "must not be added to, nested" + newline + "inside, or represented as a branch",
  );
});

test("exact result and error-item shapes are available", () => {
  const docsText = readRequired(docsRelativePath);
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

  assert.equal(numberedTableRowCount(resultSection), 4);
  assert.equal(numberedTableRowCount(errorSection), 2);
  assertLinesInOrder(resultSection, [
    "| 1 | `valid` |",
    "| 2 | `contractKind` |",
    "| 3 | `version` |",
    "| 4 | `errors` |",
  ]);
  assertLinesInOrder(errorSection, ["| 1 | `code` |", "| 2 | `path` |"]);
  assertIncludes(
    resultSection,
    tick + "valid: true" + tick + " if and only if " + tick + "errors" + tick + " is empty",
  );
  assertIncludes(
    resultSection,
    tick + "valid: false" + tick + " if and only if " + tick + "errors" + tick + " is non-empty",
  );
  assertIncludes(resultSection, "HUMAN_REVIEW_QUESTIONS_CROSS_REFERENCE_BOUNDARY");
  assertIncludes(resultSection, "exact " + tick + "1.0.0" + tick);
});

test("eleven closed code-to-path branches and path grammars are exact", () => {
  const docsText = readRequired(docsRelativePath);
  const partitionSection = sectionBetween(
    docsText,
    "## 6. Exact Closed Codes And Path Grammar Available",
    "## 7.",
  );
  const expectedRows = [
    "| 1 | `invalid_input_shape` | `$` |",
    "| 2 | `human_review_questions_invalid` | `$.human_review_questions` |",
    "| 3 | `source_register_invalid` | `$.source_register` |",
    "| 4 | `review_chronology_invalid` | `$.review_chronology` |",
    "| 5 | `asserted_claim_matrix_invalid` | `$.asserted_claim_matrix` |",
    "| 6 | `declared_packet_review_gaps_invalid` | `$.declared_packet_review_gaps` |",
    "| 7 | `packet_ref_mismatch` | `$.source_register.packet_ref`, `$.review_chronology.packet_ref`, `$.asserted_claim_matrix.packet_ref`, or `$.declared_packet_review_gaps.packet_ref` |",
    "| 8 | `source_ref_not_in_register` | `$.human_review_questions.questions[n].source_refs[m]` |",
    "| 9 | `chronology_entry_ref_not_in_chronology` | `$.human_review_questions.questions[n].chronology_entry_refs[m]` |",
    "| 10 | `claim_ref_not_in_asserted_claim_matrix` | `$.human_review_questions.questions[n].claim_refs[m]` |",
    "| 11 | `gap_ref_not_in_declared_packet_review_gaps` | `$.human_review_questions.questions[n].gap_refs[m]` |",
  ];

  assert.equal(numberedTableRowCount(partitionSection), 11);
  assertLinesInOrder(partitionSection, expectedRows);
  for (const fact of [
    "CROSS_REFERENCE_ERROR_CODE_COUNT:" + newline + "11",
    "CROSS_REFERENCE_ERROR_STATIC_PATH_COUNT:" + newline + "10",
    "CROSS_REFERENCE_ERROR_INDEXED_PATH_TEMPLATE_COUNT:" + newline + "4",
    "CROSS_REFERENCE_ERROR_CODE_TO_PATH_BRANCH_COUNT:" + newline + "11",
    "CROSS_REFERENCE_ERROR_DISTINCT_PATH_ALTERNATIVE_COUNT:" + newline + "14",
    "ADDITIONAL_CROSS_REFERENCE_ERROR_CODES_OR_PATHS:" + newline + "NONE",
    "Multi-digit indices have no leading" + newline + "zero",
    "Independent global code" + newline + "and path constraints",
  ]) {
    assertIncludes(docsText, fact);
  }
});

test("schema structure remains separate from checkpoint behavior", () => {
  const docsText = readRequired(docsRelativePath);

  for (const marker of [
    "SCHEMA_DOES_NOT_CREATE_CROSS_REFERENCE_BEHAVIOR:" + newline + "TRUE",
    "SCHEMA_DOES_NOT_PROVE_PACKET_OR_REFERENCE_MEMBERSHIP:" + newline + "TRUE",
  ]) {
    assertIncludes(docsText, marker);
  }
  for (const phrase of [
    "nine-phase execution order",
    "descriptor-safe envelope inspection",
    "exact five-child-validator call order and call counts",
    "four Questions-anchored packet comparisons",
    "membership-set construction and four ordered reference traversals",
    "first-occurrence code/path deduplication behavior",
    "deterministic result construction and recursive freezing",
    "no logging, telemetry, metrics, tracing, audit emission, or value echo",
  ]) {
    assertIncludes(docsText, phrase);
  }
});

test("six scaffold questions remain open and readiness is bounded", () => {
  const docsText = readRequired(docsRelativePath);
  const questionSection = sectionBetween(
    docsText,
    "## 8. Open Scaffold-Scope Questions",
    "## 9.",
  );

  for (let position = 1; position <= 6; position += 1) {
    assertIncludes(questionSection, newline + position + ". ", String(position));
  }
  assertIncludes(
    docsText,
    "OPEN_CROSS_REFERENCE_RESULT_SCHEMA_SCAFFOLD_SCOPE_QUESTION_COUNT:" +
      newline +
      "6",
  );
  assertIncludes(
    docsText,
    "CROSS_REFERENCE_RESULT_SCHEMA_READINESS:" +
      newline +
      "READY_FOR_DOCS_ONLY_SCAFFOLD_SCOPE_DECISION",
  );
  assertIncludes(
    docsText,
    "CROSS_REFERENCE_CHECKPOINT_IMPLEMENTATION_READINESS:" + newline + "NOT_CREATED",
  );
});

test("future surfaces stay staged with bounded result-schema transition", () => {
  const docsText = readRequired(docsRelativePath);
  const transitionText = readRequired(resultSchemaProofTransitionRelativePath);
  const packageExportTransitionText = readRequired(
    packageExportProofTransitionRelativePath,
  );
  const futureSection = sectionBetween(
    docsText,
    "## 10. Retained Future Slice Partition",
    "## 11.",
  );

  assert.equal(numberedTableRowCount(futureSection), 8);
  assertIncludes(docsText, "RETAINED_FUTURE_STAGED_SURFACE_COUNT:" + newline + "8");
  assertIncludes(docsText, "NEW_RUNTIME_LIVE_ABSENCE_OWNER_COUNT:" + newline + "0");
  assertIncludes(docsText, "must not" + newline + "become a new live-absence owner");
  for (const [position, candidatePath] of [
    [1, resultSchemaRelativePath],
    [2, resultSchemaProofRelativePath],
  ]) {
    assertIncludes(
      transitionText,
      "| " +
        position +
        " | " +
        tick +
        candidatePath +
        tick +
        " | " +
        tick +
        "PERMITTED_FOR_SEPARATE_LATER_CONTRACT_ONLY_SLICE" +
        tick +
        " |",
      candidatePath,
    );
  }
  for (const marker of [
    "CROSS_REFERENCE_RESULT_SCHEMA_PATH_TRANSITION_COUNT:" + newline + "2",
    "LIVE_ABSENCE_OWNER_PROOF_SURFACE_COUNT:" + newline + "3",
    "TRANSITIONED_LIVE_ABSENCE_ASSERTION_COUNT:" + newline + "6",
    "PROOF_TRANSITION_SLICE_FILE_COUNT:" + newline + "4",
  ]) {
    assertIncludes(transitionText, marker);
  }

  assertIncludes(
    packageExportTransitionText,
    "| 3 | " +
      tick +
      proofRelativePath +
      tick +
      " | " +
      tick +
      "REMOVE_ONE_PACKAGE_SYMBOL_LIVE_ABSENCE_ASSERTION_THEN_ANCHOR_TRANSITION" +
      tick +
      " |",
    proofRelativePath,
  );
  assertIncludes(
    packageExportTransitionText,
    tick + packageExportName + tick,
    packageExportName,
  );
  for (const marker of [
    "PACKAGE_SCHEMA_EXPORT_SYMBOL_ASSERTION_TRANSITION_COUNT:" + newline + "4",
    "PACKAGE_SCHEMA_EXPORT_PROOF_PATH_ASSERTION_TRANSITION_COUNT:" +
      newline +
      "1",
    "PACKAGE_SCHEMA_EXPORT_TOTAL_LIVE_ABSENCE_TRANSITION_COUNT:" +
      newline +
      "5",
    "RETAINED_PACKAGE_SCHEMA_EXPORT_LIVE_ABSENCE_ASSERTION_COUNT:" +
      newline +
      "0",
    "CURRENT_PACKAGE_EXPORT_PROOF_TRANSITION_PREREQUISITE_FILE_COUNT:" +
      newline +
      "5",
  ]) {
    assertIncludes(packageExportTransitionText, marker);
  }
});

test("two-file readiness slice creates no implementation or conclusion", () => {
  const docsText = readRequired(docsRelativePath);

  assertIncludes(docsText, "RESULT_SCHEMA_READINESS_SLICE_FILE_COUNT:" + newline + "2");
  for (const expectedPath of [docsRelativePath, proofRelativePath]) {
    assertIncludes(docsText, tick + expectedPath + tick, expectedPath);
  }
  for (const marker of [
    "RESULT_SCHEMA_NOT_CREATED",
    "RESULT_SCHEMA_PACKAGE_EXPORT_NOT_CREATED",
    "RESULT_SCHEMA_PROOF_NOT_CREATED",
    "PROOF_TRANSITION_NOT_CREATED",
    "CROSS_REFERENCE_CHECKPOINT_NOT_CREATED",
    "NEW_RUNTIME_LIVE_ABSENCE_OWNER_CREATED_NO",
    "PERSISTENCE_API_ROUTE_PROVIDER_MODEL_UI_NOT_CREATED",
    "NO_REAL_PRIVATE_SOURCE_OR_CASE_MATERIAL_PROCESSED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "TRACKED_DOCS_ONLY_CROSS_REFERENCE_RESULT_SCHEMA_READINESS_ASSESSED",
  ]) {
    assertIncludes(docsText, marker);
  }
  assertIncludes(docsText, "not actual human review, professional review");
  assertIncludes(docsText, "real-evidence review");
  assert.equal(docsText.includes("/Users/"), false);
});
