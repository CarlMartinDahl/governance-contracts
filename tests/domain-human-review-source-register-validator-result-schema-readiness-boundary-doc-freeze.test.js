"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.join(__dirname, "..");
const docsRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_VALIDATOR_RESULT_SCHEMA_READINESS_BOUNDARY_v1.md";
const proofTransitionRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_VALIDATOR_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const validatorHelperProofTransitionRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const validatorResultCandidatePaths = [
  "schemas/human-review-source-register-validator-result.json",
  "tests/human-review-source-register-validator-result-schema.test.js",
];
const historicalValidatorHelperPaths = [
  "packages/schemas/src/human-review-source-register-validator.js",
  "tests/human-review-source-register-validator.test.js",
];
const controllingPaths = [
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_CONTRACT_BOUNDARY_v1.md",
  "schemas/human-review-source-register.json",
  "tests/human-review-source-register-schema.test.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_v1.md",
  "packages/schemas/src/index.js",
  "tests/human-review-source-register-package-export.test.js",
  "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_VALIDATOR_RESULT_SCHEMA_READINESS_BOUNDARY_v1.md",
  "schemas/no-raw-metadata-manifest.json",
  "tests/no-raw-metadata-manifest-schema.test.js",
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
    /HUMAN_REVIEW_SOURCE_REGISTER_VALIDATOR_RESULT_SCHEMA_READINESS_BOUNDARY/u,
  );
  assert.match(docsText, /DOCS_ONLY/u);
  assert.match(docsText, /APPEND_ONLY_SCHEMA_READINESS_ASSESSMENT/u);
});

test("candidate schema and package export remain separate current facts", () => {
  const docsText = readRequired(docsRelativePath);
  const packageSchemas = require("../packages/schemas/src/index.js");

  assert.equal(Object.hasOwn(packageSchemas, "humanReviewSourceRegister"), true);
  assert.match(
    docsText,
    /SOURCE_REGISTER_SCHEMA_STATUS:\nTRACKED_AND_PACKAGE_EXPORTED/u,
  );
  assert.match(docsText, /VALIDATOR_RESULT_SCHEMA_STATUS:\nNOT_CREATED/u);
  assert.match(docsText, /must not be added\nto, nested inside, or represented as a branch/u);
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

test("five codes and nine path templates are exact", () => {
  const docsText = readRequired(docsRelativePath);

  for (const code of [
    "required_field_missing",
    "unexpected_field",
    "invalid_field_type",
    "invalid_field_value",
    "duplicate_source_ref",
  ]) {
    assert.equal(docsText.includes(`\`${code}\``), true, code);
  }
  for (const pathTemplate of [
    "$",
    "$.contract_id",
    "$.contract_version",
    "$.packet_ref",
    "$.sources",
    "$.sources[n]",
    "$.sources[n].source_ref",
    "$.sources[n].declared_source_type",
    "$.sources[n].declared_label",
  ]) {
    assert.equal(docsText.includes(`\`${pathTemplate}\``), true, pathTemplate);
  }

  assert.match(docsText, /VALIDATION_ERROR_CODE_COUNT:\n5/u);
  assert.match(docsText, /VALIDATION_ERROR_PATH_TEMPLATE_COUNT:\n9/u);
  assert.match(docsText, /Multi-digit indices have no leading zero/u);
});

test("five code-to-path partitions remain closed and explicit", () => {
  const docsText = readRequired(docsRelativePath);
  const partitionSection = docsText.slice(
    docsText.indexOf("## 7. Exact Code-to-Path Partition Available"),
    docsText.indexOf("## 8."),
  );

  assert.equal((partitionSection.match(/^\| `/gmu) ?? []).length, 5);
  assert.match(partitionSection, /Independent global code and path\nconstraints alone would be insufficient/u);
  assert.match(partitionSection, /indexed-path patterns/u);
});

test("schema-expressible facts remain separate from validator behavior", () => {
  const docsText = readRequired(docsRelativePath);

  assert.match(docsText, /SCHEMA_DOES_NOT_CREATE_VALIDATOR_BEHAVIOR:\nTRUE/u);
  for (const phrase of [
    "seven-phase validation execution order",
    "first-occurrence deduplication behavior",
    "structural duplicate-source detection",
    "descriptor-safe candidate inspection",
    "deep immutability of returned results",
    "trimming checks on candidate labels",
  ]) {
    assert.equal(docsText.includes(phrase), true, phrase);
  }
});

test("six scaffold questions and helper reservations remain historical after bounded transitions", () => {
  const docsText = readRequired(docsRelativePath);
  const proofTransitionText = readRequired(proofTransitionRelativePath);
  const validatorHelperProofTransitionText = readRequired(
    validatorHelperProofTransitionRelativePath,
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
  for (const candidatePath of validatorResultCandidatePaths) {
    assert.equal(
      proofTransitionText.includes(`\`${candidatePath}\``),
      true,
      candidatePath,
    );
  }
  for (const helperPath of historicalValidatorHelperPaths) {
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
    /RETAINED_VALIDATOR_HELPER_ABSENCE_COUNT:\n2/u,
  );
  assert.match(
    validatorHelperProofTransitionText,
    /VALIDATOR_HELPER_PATH_LIVE_ABSENCE_TRANSITION_COUNT:\n2/u,
  );
  assert.match(
    validatorHelperProofTransitionText,
    /TRACKED_DOCS_ONLY_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
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
