"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.join(__dirname, "..");
const docsRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_VALIDATOR_RESULT_SCHEMA_READINESS_BOUNDARY_v1.md";
const proofTransitionRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_VALIDATOR_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const validatorHelperProofTransitionRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const crossReferenceProofTransitionRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_SOURCE_REGISTER_CROSS_REFERENCE_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const controllingPaths = [
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_CONTRACT_BOUNDARY_v1.md",
  "schemas/human-review-chronology.json",
  "tests/human-review-chronology-schema.test.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_v1.md",
  "packages/schemas/src/index.js",
  "tests/human-review-chronology-package-export.test.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_VALIDATOR_RESULT_SCHEMA_READINESS_BOUNDARY_v1.md",
  "schemas/human-review-source-register-validator-result.json",
  "tests/human-review-source-register-validator-result-schema.test.js",
];
const validatorResultSchemaCandidatePaths = [
  "schemas/human-review-chronology-validator-result.json",
  "tests/human-review-chronology-validator-result-schema.test.js",
];
const historicalValidatorHelperPaths = [
  "packages/schemas/src/human-review-chronology-validator.js",
  "tests/human-review-chronology-validator.test.js",
];
const historicalCrossReferencePaths = [
  "packages/governance/src/human-review-chronology-source-register-validation-boundary.js",
  "tests/human-review-chronology-source-register-validation-boundary.test.js",
];

function absolutePath(relativePath) {
  return path.join(repoRoot, relativePath);
}

function readRequired(relativePath) {
  const filePath = absolutePath(relativePath);
  assert.equal(fs.existsSync(filePath), true, `expected ${relativePath}`);
  return fs.readFileSync(filePath, "utf8");
}

test("validator-result readiness boundary and every source exist", () => {
  const docsText = readRequired(docsRelativePath);

  for (const sourcePath of controllingPaths) {
    readRequired(sourcePath);
    assert.equal(docsText.includes(`\`${sourcePath}\``), true, sourcePath);
  }

  assert.match(
    docsText,
    /HUMAN_REVIEW_CHRONOLOGY_VALIDATOR_RESULT_SCHEMA_READINESS_BOUNDARY/u,
  );
  assert.match(docsText, /DOCS_ONLY/u);
  assert.match(docsText, /APPEND_ONLY_SCHEMA_READINESS_ASSESSMENT/u);
});

test("candidate schema and package export remain separate current facts", () => {
  const docsText = readRequired(docsRelativePath);
  const packageSchemas = require("../packages/schemas/src/index.js");

  assert.equal(Object.hasOwn(packageSchemas, "humanReviewChronology"), true);
  assert.match(docsText, /CHRONOLOGY_SCHEMA_STATUS:\nTRACKED_AND_PACKAGE_EXPORTED/u);
  assert.match(docsText, /VALIDATOR_RESULT_SCHEMA_STATUS:\nNOT_CREATED/u);
  assert.match(
    docsText,
    /must not be added\nto, nested inside, or represented as a branch/u,
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

test("six codes and thirteen path templates are exact", () => {
  const docsText = readRequired(docsRelativePath);

  for (const code of [
    "required_field_missing",
    "unexpected_field",
    "invalid_field_type",
    "invalid_field_value",
    "duplicate_entry_ref",
    "duplicate_source_ref",
  ]) {
    assert.equal(docsText.includes(`\`${code}\``), true, code);
  }
  for (const pathTemplate of [
    "$",
    "$.contract_id",
    "$.contract_version",
    "$.packet_ref",
    "$.entries",
    "$.entries[n]",
    "$.entries[n].entry_ref",
    "$.entries[n].review_state",
    "$.entries[n].temporal_status",
    "$.entries[n].declared_temporal_text",
    "$.entries[n].review_text",
    "$.entries[n].source_refs",
    "$.entries[n].source_refs[m]",
  ]) {
    assert.equal(docsText.includes(`\`${pathTemplate}\``), true, pathTemplate);
  }

  assert.match(docsText, /VALIDATION_ERROR_CODE_COUNT:\n6/u);
  assert.match(docsText, /VALIDATION_ERROR_PATH_TEMPLATE_COUNT:\n13/u);
  assert.match(docsText, /Multi-digit indices have no leading zero/u);
});

test("six code-to-path partitions remain closed and explicit", () => {
  const docsText = readRequired(docsRelativePath);
  const partitionSection = docsText.slice(
    docsText.indexOf("## 7. Exact Code-To-Path Partition Available"),
    docsText.indexOf("## 8."),
  );

  assert.equal((partitionSection.match(/^\| `/gmu) ?? []).length, 6);
  assert.match(partitionSection, /Independent global code and\npath constraints alone/u);
  assert.match(partitionSection, /indexed-path patterns/u);
});

test("schema-expressible facts remain separate from validator behavior", () => {
  const docsText = readRequired(docsRelativePath);

  assert.match(docsText, /SCHEMA_DOES_NOT_CREATE_VALIDATOR_BEHAVIOR:\nTRUE/u);
  for (const phrase of [
    "eight-phase validation execution order",
    "first-occurrence deduplication behavior",
    "structural duplicate-entry and within-entry source-reference detection",
    "descriptor-safe candidate inspection",
    "deep immutability of returned results",
    "trim checks on temporal and review text",
    "Source Register membership or packet-reference resolution",
  ]) {
    assert.equal(docsText.includes(phrase), true, phrase);
  }
});

test("six scaffold questions remain historical while helper and cross-reference paths transition", () => {
  const docsText = readRequired(docsRelativePath);
  const proofTransitionText = readRequired(proofTransitionRelativePath);
  const validatorHelperProofTransitionText = readRequired(
    validatorHelperProofTransitionRelativePath,
  );
  const crossReferenceProofTransitionText = readRequired(
    crossReferenceProofTransitionRelativePath,
  );
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
  assert.match(docsText, /RETAINED_LATER_SIBLING_ABSENCE_COUNT:\n6/u);
  for (const candidatePath of validatorResultSchemaCandidatePaths) {
    assert.equal(
      proofTransitionText.includes(`\`${candidatePath}\``),
      true,
      candidatePath,
    );
  }
  for (const historicalPath of historicalCrossReferencePaths) {
    assert.equal(docsText.includes(`\`${historicalPath}\``), true, historicalPath);
    assert.equal(
      crossReferenceProofTransitionText.includes(`\`${historicalPath}\``),
      true,
      historicalPath,
    );
  }
  for (const helperPath of historicalValidatorHelperPaths) {
    assert.equal(docsText.includes(`\`${helperPath}\``), true, helperPath);
    assert.equal(
      validatorHelperProofTransitionText.includes(`\`${helperPath}\``),
      true,
      helperPath,
    );
  }
  assert.match(
    proofTransitionText,
    /VALIDATOR_RESULT_SCHEMA_PATH_TRANSITION_COUNT:\n2/u,
  );
  assert.match(
    proofTransitionText,
    /RETAINED_VALIDATOR_AND_CROSS_REFERENCE_ABSENCE_COUNT:\n4/u,
  );
  assert.match(
    proofTransitionText,
    /TRACKED_CONTRACT_ONLY_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
  assert.match(
    validatorHelperProofTransitionText,
    /VALIDATOR_HELPER_PATH_LIVE_ABSENCE_TRANSITION_COUNT:\n7/u,
  );
  assert.match(
    validatorHelperProofTransitionText,
    /TRACKED_DOCS_ONLY_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
  assert.match(
    crossReferenceProofTransitionText,
    /CROSS_REFERENCE_RUNTIME_PATH_LIVE_ABSENCE_TRANSITION_COUNT:\n12/u,
  );
  assert.match(
    crossReferenceProofTransitionText,
    /TRACKED_DOCS_ONLY_CROSS_REFERENCE_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
});

test("readiness creates no downstream implementation or conclusion", () => {
  const docsText = readRequired(docsRelativePath);

  for (const marker of [
    "SCHEMA_FILE_NOT_CREATED",
    "SCHEMA_EXPORT_NOT_CREATED",
    "VALIDATOR_NOT_CREATED",
    "VALIDATOR_DISPATCH_NOT_CHANGED",
    "SOURCE_REGISTER_CROSS_REFERENCE_CHECKPOINT_NOT_CREATED",
    "VALIDATION_EXECUTION_NOT_CREATED",
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
});
