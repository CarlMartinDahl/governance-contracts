"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const docsRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_CROSS_REFERENCE_RESULT_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md";
const proofRelativePath =
  "tests/domain-human-review-questions-cross-reference-result-schema-scaffold-scope-boundary-doc-freeze.test.js";
const futureSchemaRelativePath =
  "schemas/human-review-questions-cross-reference-result.json";
const futureSchemaProofRelativePath =
  "tests/human-review-questions-cross-reference-result-schema.test.js";
const resultSchemaProofTransitionRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_CROSS_REFERENCE_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const packageExportProofTransitionRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_CROSS_REFERENCE_RESULT_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const futurePackageExportName = "humanReviewQuestionsCrossReferenceResult";
const tick = String.fromCharCode(96);
const newline = String.fromCharCode(10);
const controllingPaths = [
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_CROSS_REFERENCE_SEMANTICS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_CROSS_REFERENCE_RESULT_SCHEMA_READINESS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_CROSS_REFERENCE_RESULT_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "schemas/human-review-declared-packet-review-gaps-cross-reference-result.json",
  "tests/human-review-declared-packet-review-gaps-cross-reference-result-schema.test.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_CROSS_REFERENCE_RESULT_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "schemas/human-review-asserted-claim-matrix-cross-reference-result.json",
  "tests/human-review-asserted-claim-matrix-cross-reference-result-schema.test.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_SOURCE_REGISTER_CROSS_REFERENCE_RESULT_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "schemas/human-review-chronology-source-register-cross-reference-result.json",
  "tests/human-review-chronology-source-register-cross-reference-result-schema.test.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "schemas/human-review-questions-validator-result.json",
  "tests/human-review-questions-validator-result-schema.test.js",
  "packages/schemas/src/index.js",
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

test("Questions result-schema scaffold boundary and sources exist", () => {
  const docsText = readRequired(docsRelativePath);

  for (const sourcePath of controllingPaths) {
    readRequired(sourcePath);
    assertIncludes(docsText, tick + sourcePath + tick, sourcePath);
  }

  for (const marker of [
    "HUMAN_REVIEW_QUESTIONS_CROSS_REFERENCE_RESULT_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY",
    "DOCS_ONLY",
    "APPEND_ONLY_RESULT_SCHEMA_SCAFFOLD_SCOPE",
    "CROSS_REFERENCE_RESULT_SCHEMA_SCAFFOLD_SCOPE_DEFINED",
  ]) {
    assertIncludes(docsText, marker);
  }
});

test("future two-file schema slice is transition-permitted with exact identity", () => {
  const docsText = readRequired(docsRelativePath);
  const transitionText = readRequired(resultSchemaProofTransitionRelativePath);
  const packageExportTransitionText = readRequired(
    packageExportProofTransitionRelativePath,
  );
  const identitySection = sectionBetween(
    docsText,
    "## 4. Exact Future Schema Identity",
    "## 5.",
  );

  for (const [index, expectedPath] of [
    futureSchemaRelativePath,
    futureSchemaProofRelativePath,
  ].entries()) {
    assertIncludes(docsText, tick + expectedPath + tick, expectedPath);
    assertIncludes(
      transitionText,
      "| " +
        (index + 1) +
        " | " +
        tick +
        expectedPath +
        tick +
        " | " +
        tick +
        "PERMITTED_FOR_SEPARATE_LATER_CONTRACT_ONLY_SLICE" +
        tick +
        " |",
      expectedPath,
    );
  }
  assertIncludes(
    docsText,
    "FUTURE_CROSS_REFERENCE_RESULT_SCHEMA_SLICE_FILE_COUNT:" + newline + "2",
  );
  for (const expectedIdentity of [
    "https://json-schema.org/draft/2020-12/schema",
    "https://governance-contracts.invalid/schemas/human-review-questions-cross-reference-result.json",
    "Human Review Questions Cross-Reference Result Contract",
    "`additionalProperties` | `false`",
  ]) {
    assertIncludes(identitySection, expectedIdentity);
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
    "| 4 | " +
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
    tick + futurePackageExportName + tick,
    futurePackageExportName,
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

test("root and error-item scaffold shapes are exact", () => {
  const docsText = readRequired(docsRelativePath);
  const rootSection = sectionBetween(
    docsText,
    "## 5. Exact Future Root Shape",
    "## 6.",
  );
  const stateSection = sectionBetween(
    docsText,
    "## 6. Exact Two-State Root Encoding",
    "## 7.",
  );
  const errorSection = sectionBetween(
    docsText,
    "## 7. Exact Future Error-Item Shape",
    "## 8.",
  );

  assert.equal(numberedTableRowCount(rootSection), 4);
  assertLinesInOrder(rootSection, [
    "| 1 | `valid` |",
    "| 2 | `contractKind` |",
    "| 3 | `version` |",
    "| 4 | `errors` |",
  ]);
  assertIncludes(rootSection, "HUMAN_REVIEW_QUESTIONS_CROSS_REFERENCE_BOUNDARY");
  assertIncludes(rootSection, "`const: \"1.0.0\"`");
  assert.equal(numberedTableRowCount(stateSection), 2);
  assertLinesInOrder(stateSection, [
    "| 1 | success | `valid const true`; `errors maxItems 0` |",
    "| 2 | failure | `valid const false`; `errors minItems 1` |",
  ]);
  assertIncludes(errorSection, "`required: [\"code\", \"path\"]`");
  assertIncludes(errorSection, "eleven exact branches");
  for (const fact of [
    "FUTURE_CROSS_REFERENCE_RESULT_REQUIRED_PROPERTY_COUNT:" + newline + "4",
    "FUTURE_CROSS_REFERENCE_RESULT_STATE_BRANCH_COUNT:" + newline + "2",
    "FUTURE_CROSS_REFERENCE_ERROR_ITEM_REQUIRED_PROPERTY_COUNT:" + newline + "2",
  ]) {
    assertIncludes(docsText, fact);
  }
});

test("four indexed path patterns are exact", () => {
  const docsText = readRequired(docsRelativePath);
  const patternSection = sectionBetween(
    docsText,
    "## 8. Exact Indexed Path Patterns",
    "## 9.",
  );
  const expectedPatterns = [
    String.raw`^\\$\\.human_review_questions\\.questions\\[(0|[1-9][0-9]*)\\]\\.source_refs\\[(0|[1-9][0-9]*)\\]$`,
    String.raw`^\\$\\.human_review_questions\\.questions\\[(0|[1-9][0-9]*)\\]\\.chronology_entry_refs\\[(0|[1-9][0-9]*)\\]$`,
    String.raw`^\\$\\.human_review_questions\\.questions\\[(0|[1-9][0-9]*)\\]\\.claim_refs\\[(0|[1-9][0-9]*)\\]$`,
    String.raw`^\\$\\.human_review_questions\\.questions\\[(0|[1-9][0-9]*)\\]\\.gap_refs\\[(0|[1-9][0-9]*)\\]$`,
  ];

  assert.equal(numberedTableRowCount(patternSection), 0);
  for (const expectedPattern of expectedPatterns) {
    assertIncludes(patternSection, expectedPattern);
  }
  assertIncludes(
    docsText,
    "FUTURE_CROSS_REFERENCE_ERROR_INDEXED_PATH_PATTERN_COUNT:" + newline + "4",
  );
  assertIncludes(patternSection, "rejects multi-digit indices" + newline + "with a leading zero");
});

test("eleven complete code-to-path branches and counts are exact", () => {
  const docsText = readRequired(docsRelativePath);
  const branchSection = sectionBetween(
    docsText,
    "## 9. Exact Eleven Code-To-Path Branches",
    "## 10.",
  );
  const expectedRows = [
    "| 1 | `const: \"invalid_input_shape\"` | `const: \"$\"` |",
    "| 2 | `const: \"human_review_questions_invalid\"` | `const: \"$.human_review_questions\"` |",
    "| 3 | `const: \"source_register_invalid\"` | `const: \"$.source_register\"` |",
    "| 4 | `const: \"review_chronology_invalid\"` | `const: \"$.review_chronology\"` |",
    "| 5 | `const: \"asserted_claim_matrix_invalid\"` | `const: \"$.asserted_claim_matrix\"` |",
    "| 6 | `const: \"declared_packet_review_gaps_invalid\"` | `const: \"$.declared_packet_review_gaps\"` |",
    "| 7 | `const: \"packet_ref_mismatch\"` | ordered `enum:",
    "| 8 | `const: \"source_ref_not_in_register\"` |",
    "| 9 | `const: \"chronology_entry_ref_not_in_chronology\"` |",
    "| 10 | `const: \"claim_ref_not_in_asserted_claim_matrix\"` |",
    "| 11 | `const: \"gap_ref_not_in_declared_packet_review_gaps\"` |",
  ];

  assert.equal(numberedTableRowCount(branchSection), 11);
  assertLinesInOrder(branchSection, expectedRows);
  for (const packetPath of [
    "$.source_register.packet_ref",
    "$.review_chronology.packet_ref",
    "$.asserted_claim_matrix.packet_ref",
    "$.declared_packet_review_gaps.packet_ref",
  ]) {
    assertIncludes(branchSection, packetPath);
  }
  for (const fact of [
    "FUTURE_CROSS_REFERENCE_ERROR_CODE_PATH_BRANCH_COUNT:" + newline + "11",
    "FUTURE_CROSS_REFERENCE_STATIC_PATH_ALTERNATIVE_COUNT:" + newline + "10",
    "FUTURE_CROSS_REFERENCE_INDEXED_PATH_BRANCH_COUNT:" + newline + "4",
    "FUTURE_PACKET_MISMATCH_PATH_ENUM_VALUE_COUNT:" + newline + "4",
    "FUTURE_CROSS_REFERENCE_DISTINCT_PATH_ALTERNATIVE_COUNT:" + newline + "14",
  ]) {
    assertIncludes(docsText, fact);
  }
});

test("duplicate and checkpoint-only boundaries remain separate", () => {
  const docsText = readRequired(docsRelativePath);

  assertIncludes(
    docsText,
    "FUTURE_CROSS_REFERENCE_ERROR_ARRAY_UNIQUE_ITEMS:" + newline + "TRUE",
  );
  for (const phrase of [
    "nine-phase cross-reference execution order",
    "exact five-child-validator call order or call counts",
    "calling all five child validators when an earlier result is invalid",
    "four Questions-anchored packet-reference comparisons",
    "source, chronology, claim, and gap membership-set construction",
    "first-occurrence code/path deduplication behavior",
    "ephemeral immediate-caller-only lifecycle",
    "no logging, telemetry, metrics, tracing, audit emission, or value echo",
  ]) {
    assertIncludes(docsText, phrase);
  }
  assertIncludes(docsText, "humanReviewQuestionsCrossReferenceResult");
  assertIncludes(docsText, "SEPARATE_FINAL_RUNTIME_CHANGE_SLICE");
});

test("six questions are resolved with a structural-only proof scope", () => {
  const docsText = readRequired(docsRelativePath);
  const resolutionSection = sectionBetween(
    docsText,
    "## 14. Resolved Readiness Questions",
    "## 15.",
  );

  assert.equal(numberedTableRowCount(resolutionSection), 6);
  assertIncludes(
    docsText,
    "RESOLVED_CROSS_REFERENCE_RESULT_SCHEMA_SCAFFOLD_SCOPE_QUESTION_COUNT:" +
      newline +
      "6",
  );
  for (const phrase of [
    "all four indexed patterns are exact",
    "eleven complete code/path branches",
    "ordered four-path enum",
    "representative failures for all fourteen path",
    "no package export, proof transition, checkpoint, source use, execution, or",
  ]) {
    assertIncludes(docsText, phrase);
  }
});

test("exact docs-only slice creates no implementation or conclusion", () => {
  const docsText = readRequired(docsRelativePath);

  assertIncludes(docsText, "RESULT_SCHEMA_SCAFFOLD_SCOPE_SLICE_FILE_COUNT:" + newline + "2");
  for (const currentPath of [docsRelativePath, proofRelativePath]) {
    assertIncludes(docsText, tick + currentPath + tick, currentPath);
  }
  for (const marker of [
    "SCHEMA_FILE_NOT_CREATED",
    "SCHEMA_EXPORT_NOT_CREATED",
    "SCHEMA_PROOF_NOT_CREATED",
    "PROOF_TRANSITION_NOT_CREATED",
    "CROSS_REFERENCE_CHECKPOINT_NOT_CREATED",
    "NEW_RUNTIME_LIVE_ABSENCE_OWNER_CREATED_NO",
    "PERSISTENCE_API_ROUTE_PROVIDER_MODEL_UI_NOT_CREATED",
    "NO_REAL_PRIVATE_SOURCE_OR_CASE_MATERIAL_PROCESSED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "TRACKED_DOCS_ONLY_CROSS_REFERENCE_RESULT_SCHEMA_SCAFFOLD_SCOPE_DEFINED",
  ]) {
    assertIncludes(docsText, marker);
  }
  assertIncludes(docsText, "NEW_RUNTIME_LIVE_ABSENCE_OWNER_COUNT:" + newline + "0");
  assertIncludes(docsText, "one `DOCS_ONLY` proof-transition prerequisite");
  assertIncludes(docsText, "not actual human review, professional review");
  assertIncludes(docsText, "real-evidence review");
  assert.equal(docsText.includes("/Users/"), false);
});
