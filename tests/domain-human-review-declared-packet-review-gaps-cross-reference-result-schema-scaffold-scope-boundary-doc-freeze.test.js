"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const docsRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_CROSS_REFERENCE_RESULT_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md";
const proofRelativePath =
  "tests/domain-human-review-declared-packet-review-gaps-cross-reference-result-schema-scaffold-scope-boundary-doc-freeze.test.js";
const futurePaths = [
  "schemas/human-review-declared-packet-review-gaps-cross-reference-result.json",
  "tests/human-review-declared-packet-review-gaps-cross-reference-result-schema.test.js",
];
const resultSchemaProofTransitionRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_CROSS_REFERENCE_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const packageExportProofTransitionRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_CROSS_REFERENCE_RESULT_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const packageExportName =
  "humanReviewDeclaredPacketReviewGapsCrossReferenceResult";
const tick = String.fromCharCode(96);
const newline = String.fromCharCode(10);
const jsonEscape = String.fromCharCode(92).repeat(2);
const controllingPaths = [
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_CROSS_REFERENCE_SEMANTICS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_CROSS_REFERENCE_RESULT_SCHEMA_READINESS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_CROSS_REFERENCE_RESULT_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "schemas/human-review-asserted-claim-matrix-cross-reference-result.json",
  "tests/human-review-asserted-claim-matrix-cross-reference-result-schema.test.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_SOURCE_REGISTER_CROSS_REFERENCE_RESULT_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "schemas/human-review-chronology-source-register-cross-reference-result.json",
  "tests/human-review-chronology-source-register-cross-reference-result-schema.test.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "schemas/human-review-declared-packet-review-gaps-validator-result.json",
  "tests/human-review-declared-packet-review-gaps-validator-result-schema.test.js",
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

function inlineConst(value) {
  return tick + 'const: "' + value + '"' + tick;
}

function indexedPattern(fieldName) {
  const index = "(0|[1-9][0-9]*)";
  return (
    "^" +
    jsonEscape +
    "$" +
    jsonEscape +
    ".declared_packet_review_gaps" +
    jsonEscape +
    ".gaps" +
    jsonEscape +
    "[" +
    index +
    jsonEscape +
    "]" +
    jsonEscape +
    "." +
    fieldName +
    jsonEscape +
    "[" +
    index +
    jsonEscape +
    "]$"
  );
}

test("cross-reference result-schema scaffold scope and sources exist", () => {
  const docsText = readRequired(docsRelativePath);

  for (const sourcePath of controllingPaths) {
    readRequired(sourcePath);
    assertIncludes(docsText, tick + sourcePath + tick, sourcePath);
  }

  for (const marker of [
    "HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_CROSS_REFERENCE_RESULT_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY",
    "DOCS_ONLY",
    "APPEND_ONLY_RESULT_SCHEMA_SCAFFOLD_SCOPE",
    "CROSS_REFERENCE_RESULT_SCHEMA_SCAFFOLD_SCOPE_DEFINED",
  ]) {
    assertIncludes(docsText, marker);
  }
});

test("future result-schema slice is exactly two transition-permitted files", () => {
  const docsText = readRequired(docsRelativePath);
  const transitionText = readRequired(resultSchemaProofTransitionRelativePath);

  assertIncludes(
    docsText,
    "FUTURE_CROSS_REFERENCE_RESULT_SCHEMA_SLICE_FILE_COUNT:" + newline + "2",
  );
  for (const [index, futurePath] of futurePaths.entries()) {
    assertIncludes(docsText, tick + futurePath + tick, futurePath);
    assertIncludes(
      transitionText,
      "| " +
        (index + 1) +
        " | " +
        tick +
        futurePath +
        tick +
        " | " +
        tick +
        "PERMITTED_FOR_SEPARATE_LATER_CONTRACT_ONLY_SLICE" +
        tick +
        " |",
      futurePath,
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
    docsText,
    "package index, proof-transition surfaces, and every runtime file remain" +
      newline +
      "unchanged",
  );
});

test("future schema identity and exact four-field root are frozen", () => {
  const docsText = readRequired(docsRelativePath);
  const identitySection = sectionBetween(
    docsText,
    "## 4. Exact Future Schema Identity",
    "## 5.",
  );
  const rootSection = sectionBetween(
    docsText,
    "## 5. Exact Future Root Shape",
    "## 6.",
  );

  for (const identity of [
    "https://json-schema.org/draft/2020-12/schema",
    "https://governance-contracts.invalid/schemas/human-review-declared-packet-review-gaps-cross-reference-result.json",
    "Human Review Declared Packet Review Gaps Cross-Reference Result Contract",
  ]) {
    assertIncludes(identitySection, tick + identity + tick, identity);
  }
  assert.equal(numberedTableRowCount(rootSection), 4);
  assertLinesInOrder(rootSection, [
    "| 1 | " + tick + "valid" + tick + " |",
    "| 2 | " + tick + "contractKind" + tick + " |",
    "| 3 | " + tick + "version" + tick + " |",
    "| 4 | " + tick + "errors" + tick + " |",
  ]);
  assertIncludes(
    rootSection,
    "HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_CROSS_REFERENCE_BOUNDARY",
  );
  assertIncludes(rootSection, 'const: "1.0.0"');
  assertIncludes(rootSection, "uniqueItems: true");
});

test("future root oneOf has exact success and failure branches", () => {
  const docsText = readRequired(docsRelativePath);
  const section = sectionBetween(
    docsText,
    "## 6. Exact Two-State Root Encoding",
    "## 7.",
  );

  assert.equal(numberedTableRowCount(section), 2);
  assertLinesInOrder(section, [
    "| 1 | success | " +
      tick +
      "valid const true" +
      tick +
      "; " +
      tick +
      "errors maxItems 0" +
      tick +
      " |",
    "| 2 | failure | " +
      tick +
      "valid const false" +
      tick +
      "; " +
      tick +
      "errors minItems 1" +
      tick +
      " |",
  ]);
  assertIncludes(
    section,
    "FUTURE_CROSS_REFERENCE_RESULT_STATE_BRANCH_KEYWORD:" +
      newline +
      "oneOf",
  );
  assertIncludes(
    section,
    "FUTURE_CROSS_REFERENCE_RESULT_STATE_BRANCH_COUNT:" + newline + "2",
  );
});

test("future error item and three indexed grammars are exact", () => {
  const docsText = readRequired(docsRelativePath);
  const itemSection = sectionBetween(
    docsText,
    "## 7. Exact Future Error-Item Shape",
    "## 8.",
  );
  const patternSection = sectionBetween(
    docsText,
    "## 8. Exact Indexed Path Patterns",
    "## 9.",
  );
  const patterns = [
    ["source-reference target", indexedPattern("source_refs")],
    ["chronology-reference target", indexedPattern("chronology_entry_refs")],
    ["claim-reference target", indexedPattern("claim_refs")],
  ];

  for (const itemFact of [
    'required: ["code", "path"]',
    "additionalProperties: false",
    "No " + tick + "$defs" + tick + ", dynamic reference",
  ]) {
    assertIncludes(itemSection, itemFact);
  }
  for (const [patternName, exactPattern] of patterns) {
    assertIncludes(patternSection, "| " + patternName + " |");
    assertIncludes(patternSection, tick + exactPattern + tick, patternName);
  }
  assertIncludes(
    patternSection,
    "FUTURE_CROSS_REFERENCE_ERROR_INDEXED_PATH_PATTERN_COUNT:" +
      newline +
      "3",
  );
  assertIncludes(
    patternSection,
    "rejects multi-digit indices" + newline + "with a leading zero",
  );
});

test("nine code-to-path branches remain exact ordered and closed", () => {
  const docsText = readRequired(docsRelativePath);
  const branchSection = sectionBetween(
    docsText,
    "## 9. Exact Nine Code-To-Path Branches",
    "## 10.",
  );
  const packetEnum =
    tick +
    'enum: ["$.source_register.packet_ref", "$.review_chronology.packet_ref", "$.asserted_claim_matrix.packet_ref"]' +
    tick;
  const expectedRows = [
    "| 1 | " +
      inlineConst("invalid_input_shape") +
      " | " +
      inlineConst("$") +
      " |",
    "| 2 | " +
      inlineConst("declared_packet_review_gaps_invalid") +
      " | " +
      inlineConst("$.declared_packet_review_gaps") +
      " |",
    "| 3 | " +
      inlineConst("source_register_invalid") +
      " | " +
      inlineConst("$.source_register") +
      " |",
    "| 4 | " +
      inlineConst("review_chronology_invalid") +
      " | " +
      inlineConst("$.review_chronology") +
      " |",
    "| 5 | " +
      inlineConst("asserted_claim_matrix_invalid") +
      " | " +
      inlineConst("$.asserted_claim_matrix") +
      " |",
    "| 6 | " +
      inlineConst("packet_ref_mismatch") +
      " | ordered " +
      packetEnum +
      " |",
    "| 7 | " +
      inlineConst("source_ref_not_in_register") +
      " | exact source-reference pattern from Section 8 |",
    "| 8 | " +
      inlineConst("chronology_entry_ref_not_in_chronology") +
      " | exact chronology-reference pattern from Section 8 |",
    "| 9 | " +
      inlineConst("claim_ref_not_in_asserted_claim_matrix") +
      " | exact claim-reference pattern from Section 8 |",
  ];

  assert.equal(numberedTableRowCount(branchSection), 9);
  assertLinesInOrder(branchSection, expectedRows);
  for (const fact of [
    "FUTURE_CROSS_REFERENCE_ERROR_CODE_PATH_BRANCH_COUNT:" + newline + "9",
    "FUTURE_CROSS_REFERENCE_STATIC_PATH_ALTERNATIVE_COUNT:" + newline + "8",
    "FUTURE_CROSS_REFERENCE_INDEXED_PATH_BRANCH_COUNT:" + newline + "3",
    "FUTURE_PACKET_MISMATCH_PATH_ENUM_VALUE_COUNT:" + newline + "3",
    "FUTURE_CROSS_REFERENCE_DISTINCT_PATH_ALTERNATIVE_COUNT:" +
      newline +
      "11",
    "Independent global enums",
  ]) {
    assertIncludes(branchSection, fact);
  }
});

test("uniqueItems is structural and checkpoint behavior stays outside", () => {
  const docsText = readRequired(docsRelativePath);

  assertIncludes(
    docsText,
    "FUTURE_CROSS_REFERENCE_ERROR_ARRAY_UNIQUE_ITEMS:" + newline + "TRUE",
  );
  assertIncludes(docsText, "does not implement first-occurrence retention");
  for (const phrase of [
    "eight-phase cross-reference execution order",
    "descriptor-safe envelope inspection",
    "exact four-child-validator call order or call counts",
    "three packet-reference comparisons or mismatch short-circuiting",
    "source, chronology, and claim membership-set construction",
    "deterministic result construction or recursive freezing",
    "no logging, telemetry, metrics, tracing, audit emission, or value echo",
  ]) {
    assertIncludes(docsText, phrase);
  }
});

test("all six questions resolve without sibling implementation", () => {
  const docsText = readRequired(docsRelativePath);
  const packageExportTransitionText = readRequired(
    packageExportProofTransitionRelativePath,
  );
  const resolvedSection = sectionBetween(
    docsText,
    "## 14. Resolved Readiness Questions",
    "## 15.",
  );
  assert.equal(numberedTableRowCount(resolvedSection), 6);
  assertIncludes(
    docsText,
    "RESOLVED_CROSS_REFERENCE_RESULT_SCHEMA_SCAFFOLD_SCOPE_QUESTION_COUNT:" +
      newline +
      "6",
  );
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
    tick + packageExportName + tick,
    packageExportName,
  );
  for (const marker of [
    "PACKAGE_SCHEMA_EXPORT_SYMBOL_ASSERTION_TRANSITION_COUNT:" + newline + "3",
    "PACKAGE_SCHEMA_EXPORT_PROOF_PATH_ASSERTION_TRANSITION_COUNT:" +
      newline +
      "1",
    "PACKAGE_SCHEMA_EXPORT_TOTAL_LIVE_ABSENCE_TRANSITION_COUNT:" +
      newline +
      "4",
    "RETAINED_PACKAGE_SCHEMA_EXPORT_LIVE_ABSENCE_ASSERTION_COUNT:" +
      newline +
      "0",
    "CURRENT_PACKAGE_EXPORT_PROOF_TRANSITION_PREREQUISITE_FILE_COUNT:" +
      newline +
      "4",
  ]) {
    assertIncludes(packageExportTransitionText, marker);
  }
  for (const boundary of [
    "SEPARATE_LATER_CONTRACT_ONLY_SLICE",
    "SEPARATE_LATER_DOCS_ONLY_PREREQUISITE",
    "OUT_OF_SCOPE_NOT_AUTHORIZED",
    "NEW_RUNTIME_LIVE_ABSENCE_OWNER_COUNT:" + newline + "0",
  ]) {
    assertIncludes(docsText, boundary);
  }
});

test("two-file scope creates no schema runtime approval or conclusion", () => {
  const docsText = readRequired(docsRelativePath);

  assertIncludes(
    docsText,
    "RESULT_SCHEMA_SCAFFOLD_SCOPE_SLICE_FILE_COUNT:" + newline + "2",
  );
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
  assertIncludes(docsText, "one " + tick + "DOCS_ONLY" + tick + " proof-transition prerequisite");
  assertIncludes(docsText, "not actual human review, professional review");
  assertIncludes(docsText, "real-evidence review");
  assert.equal(docsText.includes("/Users/"), false);
});
