"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const docsRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_VALIDATOR_RESULT_SCHEMA_READINESS_BOUNDARY_v1.md";
const transitionRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_VALIDATOR_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const validatorHelperTransitionRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const crossReferenceProofTransitionRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_CROSS_REFERENCE_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const controllingPaths = [
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_CONTRACT_BOUNDARY_v1.md",
  "schemas/human-review-declared-packet-review-gaps.json",
  "tests/human-review-declared-packet-review-gaps-schema.test.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_v1.md",
  "packages/schemas/src/index.js",
  "tests/human-review-declared-packet-review-gaps-package-export.test.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_VALIDATOR_RESULT_SCHEMA_READINESS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_VALIDATOR_RESULT_SCHEMA_READINESS_BOUNDARY_v1.md",
];
const candidatePaths = [
  "schemas/human-review-declared-packet-review-gaps-validator-result.json",
  "tests/human-review-declared-packet-review-gaps-validator-result-schema.test.js",
];
const historicalValidatorHelperPaths = [
  "packages/schemas/src/human-review-declared-packet-review-gaps-validator.js",
  "tests/human-review-declared-packet-review-gaps-validator.test.js",
];
const retainedCrossReferencePaths = [
  "packages/governance/src/human-review-declared-packet-review-gaps-cross-reference-validation-boundary.js",
  "tests/human-review-declared-packet-review-gaps-cross-reference-validation-boundary.test.js",
];
const errorCodes = [
  "required_field_missing",
  "unexpected_field",
  "invalid_field_type",
  "invalid_field_value",
  "duplicate_gap_ref",
  "duplicate_source_ref",
  "duplicate_chronology_entry_ref",
  "duplicate_claim_ref",
];
const pathTemplates = [
  "$",
  "$.contract_id",
  "$.contract_version",
  "$.packet_ref",
  "$.gaps",
  "$.gaps[n]",
  "$.gaps[n].gap_ref",
  "$.gaps[n].declaration_origin",
  "$.gaps[n].declared_gap_text",
  "$.gaps[n].source_refs",
  "$.gaps[n].source_refs[m]",
  "$.gaps[n].chronology_entry_refs",
  "$.gaps[n].chronology_entry_refs[m]",
  "$.gaps[n].claim_refs",
  "$.gaps[n].claim_refs[m]",
];

function readRequired(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  assert.equal(fs.existsSync(absolutePath), true, `expected ${relativePath}`);
  return fs.readFileSync(absolutePath, "utf8");
}

test("validator-result readiness boundary and every source exist", () => {
  const docsText = readRequired(docsRelativePath);

  for (const sourcePath of controllingPaths) {
    readRequired(sourcePath);
    assert.equal(docsText.includes(`\`${sourcePath}\``), true, sourcePath);
  }

  assert.match(
    docsText,
    /HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_VALIDATOR_RESULT_SCHEMA_READINESS_BOUNDARY/u,
  );
  assert.match(docsText, /DOCS_ONLY/u);
  assert.match(docsText, /APPEND_ONLY_SCHEMA_READINESS_ASSESSMENT/u);
});

test("candidate schema and package export remain separate current facts", () => {
  const docsText = readRequired(docsRelativePath);
  const candidateSchema = require("../schemas/human-review-declared-packet-review-gaps.json");
  const packageSchemas = require("../packages/schemas/src/index.js");

  assert.strictEqual(packageSchemas.humanReviewDeclaredPacketReviewGaps, candidateSchema);
  assert.match(
    docsText,
    /DECLARED_PACKET_REVIEW_GAPS_SCHEMA_STATUS:\nTRACKED_AND_PACKAGE_EXPORTED/u,
  );
  assert.match(docsText, /VALIDATOR_RESULT_SCHEMA_STATUS:\nNOT_CREATED/u);
  assert.match(
    docsText,
    /must not be\nadded to, nested inside, or represented as a branch/u,
  );
});

test("six reserved downstream paths preserve history and retained absences", () => {
  const docsText = readRequired(docsRelativePath);
  const transitionText = readRequired(transitionRelativePath);
  const validatorHelperTransitionText = readRequired(validatorHelperTransitionRelativePath);
  const crossReferenceTransitionText = readRequired(
    crossReferenceProofTransitionRelativePath,
  );

  for (const relativePath of candidatePaths) {
    assert.equal(docsText.includes(`\`${relativePath}\``), true, relativePath);
    assert.equal(
      transitionText.includes(
        `\`${relativePath}\` | \`PERMITTED_FOR_SEPARATE_LATER_CONTRACT_ONLY_SLICE\``,
      ),
      true,
      relativePath,
    );
  }
  for (const relativePath of historicalValidatorHelperPaths) {
    assert.equal(docsText.includes(`\`${relativePath}\``), true, relativePath);
    assert.equal(
      validatorHelperTransitionText.includes(`\`${relativePath}\``),
      true,
      relativePath,
    );
  }
  for (const relativePath of retainedCrossReferencePaths) {
    assert.equal(docsText.includes(`\`${relativePath}\``), true, relativePath);
    assert.equal(
      crossReferenceTransitionText.includes(`\`${relativePath}\``),
      true,
      relativePath,
    );
  }
  assert.match(docsText, /CURRENT_READINESS_SLICE_FILE_COUNT:\n2/u);
  assert.match(transitionText, /RETAINED_LATER_SIBLING_ABSENCE_COUNT:\n4/u);
  assert.match(
    validatorHelperTransitionText,
    /VALIDATOR_HELPER_PATH_LIVE_ABSENCE_TRANSITION_COUNT:\n7/u,
  );
  assert.match(
    validatorHelperTransitionText,
    /TRACKED_DOCS_ONLY_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
  assert.match(
    crossReferenceTransitionText,
    /CROSS_REFERENCE_FUTURE_PATH_LIVE_ABSENCE_TRANSITION_COUNT:\n14/u,
  );
  assert.match(
    crossReferenceTransitionText,
    /TRACKED_DOCS_ONLY_CROSS_REFERENCE_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
});

test("exact four-field result and two-field error shapes are available", () => {
  const docsText = readRequired(docsRelativePath);
  const resultSection = docsText.slice(
    docsText.indexOf("## 4. Exact Result Shape Available"),
    docsText.indexOf("## 5."),
  );
  const errorSection = docsText.slice(
    docsText.indexOf("## 5. Exact Error-Item Shape Available"),
    docsText.indexOf("## 6."),
  );

  assert.equal((resultSection.match(/^\| \d+ \|/gmu) ?? []).length, 4);
  assert.equal((errorSection.match(/^\| \d+ \|/gmu) ?? []).length, 2);
  for (const field of ["valid", "contractKind", "version", "errors"]) {
    assert.equal(resultSection.includes(`\`${field}\``), true, field);
  }
  for (const field of ["code", "path"]) {
    assert.equal(errorSection.includes(`\`${field}\``), true, field);
  }
  assert.match(resultSection, /valid: true` if and only if `errors` is empty/u);
  assert.match(resultSection, /valid: false` if and only if `errors` is non-empty/u);
});

test("eight codes and fifteen path templates are exact", () => {
  const docsText = readRequired(docsRelativePath);

  for (const code of errorCodes) {
    assert.equal(docsText.includes(`\`${code}\``), true, code);
  }
  for (const pathTemplate of pathTemplates) {
    assert.equal(docsText.includes(`\`${pathTemplate}\``), true, pathTemplate);
  }

  assert.match(docsText, /VALIDATION_ERROR_CODE_COUNT:\n8/u);
  assert.match(docsText, /VALIDATION_ERROR_PATH_TEMPLATE_COUNT:\n15/u);
  assert.match(docsText, /Multi-digit indices have no leading zero/u);
});

test("eight code-to-path partitions remain closed and explicit", () => {
  const docsText = readRequired(docsRelativePath);
  const partitionSection = docsText.slice(
    docsText.indexOf("## 7. Exact Code-To-Path Partition Available"),
    docsText.indexOf("## 8."),
  );

  assert.equal((partitionSection.match(/^\| `/gmu) ?? []).length, 8);
  assert.match(partitionSection, /Independent global code\nand path constraints/u);
  assert.match(partitionSection, /indexed-path patterns/u);
});

test("schema-expressible facts remain separate from validator behavior", () => {
  const docsText = readRequired(docsRelativePath);

  assert.match(docsText, /SCHEMA_DOES_NOT_CREATE_VALIDATOR_BEHAVIOR:\nTRUE/u);
  for (const phrase of [
    "ten-phase validation execution order",
    "first-occurrence deduplication behavior",
    "structural duplicate detection for gap, source, chronology, and claim references",
    "descriptor-safe candidate inspection",
    "deep immutability of returned results",
    "membership checks",
  ]) {
    assert.equal(docsText.includes(phrase), true, phrase);
  }
});

test("six scaffold questions remain open", () => {
  const docsText = readRequired(docsRelativePath);
  const questionSection = docsText.slice(
    docsText.indexOf("## 9. Open Scaffold-Scope Questions"),
    docsText.indexOf("## 10."),
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
});

test("readiness creates no downstream implementation or conclusion", () => {
  const docsText = readRequired(docsRelativePath);

  for (const marker of [
    "SCHEMA_FILE_NOT_CREATED",
    "SCHEMA_EXPORT_NOT_CREATED",
    "VALIDATOR_NOT_CREATED",
    "VALIDATOR_DISPATCH_NOT_CHANGED",
    "VALIDATION_EXECUTION_NOT_CREATED",
    "CROSS_REFERENCE_CHECKPOINT_NOT_CREATED",
    "NO_RUNTIME_BEHAVIOR_CREATED",
    "NO_SOURCE_ACQUISITION_OR_CONTENT_INSPECTION_CREATED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "TRACKED_DOCS_ONLY_VALIDATOR_RESULT_SCHEMA_READINESS_ASSESSED",
  ]) {
    assert.equal(docsText.includes(marker), true, marker);
  }
  assert.match(docsText, /not actual human review/u);
  assert.match(docsText, /not actual human review[\s\S]*real-evidence review/u);
  assert.doesNotMatch(docsText, /\/Users\//u);
});
