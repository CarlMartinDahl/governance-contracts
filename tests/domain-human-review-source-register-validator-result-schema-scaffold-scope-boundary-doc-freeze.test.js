"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.join(__dirname, "..");
const docsRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md";
const proofTransitionRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_VALIDATOR_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const futurePaths = [
  "schemas/human-review-source-register-validator-result.json",
  "tests/human-review-source-register-validator-result-schema.test.js",
];
const controllingPaths = [
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_CONTRACT_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_VALIDATOR_RESULT_SCHEMA_READINESS_BOUNDARY_v1.md",
  "schemas/human-review-source-register.json",
  "tests/human-review-source-register-schema.test.js",
  "packages/schemas/src/index.js",
  "tests/human-review-source-register-package-export.test.js",
  "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "schemas/controlled-synthetic-red-team-result-envelope-validator-result.json",
  "tests/controlled-synthetic-red-team-result-envelope-validator-result-schema.test.js",
];

function readRequired(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  assert.equal(fs.existsSync(absolutePath), true, `expected ${relativePath}`);
  return fs.readFileSync(absolutePath, "utf8");
}

test("validator-result scaffold scope and all tracked sources exist", () => {
  const docsText = readRequired(docsRelativePath);

  for (const sourcePath of controllingPaths) {
    readRequired(sourcePath);
    assert.equal(docsText.includes(`\`${sourcePath}\``), true, sourcePath);
  }
  assert.match(
    docsText,
    /HUMAN_REVIEW_SOURCE_REGISTER_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY/u,
  );
  assert.match(docsText, /DOCS_ONLY/u);
  assert.match(docsText, /APPEND_ONLY_SCHEMA_SCAFFOLD_SCOPE/u);
});

test("future validator-result schema slice is exactly two transition-permitted files", () => {
  const docsText = readRequired(docsRelativePath);
  const proofTransitionText = readRequired(proofTransitionRelativePath);

  assert.match(
    docsText,
    /FUTURE_VALIDATOR_RESULT_SCHEMA_SLICE_FILE_COUNT:\n2/u,
  );
  for (const futurePath of futurePaths) {
    assert.equal(docsText.includes(`\`${futurePath}\``), true, futurePath);
    assert.equal(
      proofTransitionText.includes(`\`${futurePath}\``),
      true,
      futurePath,
    );
  }
  assert.match(docsText, /package index, and all runtime files\nremain unchanged/u);
  assert.match(
    proofTransitionText,
    /VALIDATOR_RESULT_SCHEMA_PATH_TRANSITION_COUNT:\n2/u,
  );
  assert.match(
    proofTransitionText,
    /TRACKED_CONTRACT_ONLY_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
});

test("future schema identity and exact four-field root are frozen", () => {
  const docsText = readRequired(docsRelativePath);
  const identitySection = docsText.slice(
    docsText.indexOf("## 4. Exact Future Schema Identity"),
    docsText.indexOf("## 5."),
  );
  const rootSection = docsText.slice(
    docsText.indexOf("## 5. Exact Future Root Shape"),
    docsText.indexOf("## 6."),
  );

  assert.equal(
    identitySection.includes(
      "`https://governance-contracts.invalid/schemas/human-review-source-register-validator-result.json`",
    ),
    true,
  );
  assert.equal(
    identitySection.includes("`Human Review Source Register Validator Result Contract`"),
    true,
  );
  assert.equal((rootSection.match(/^\| \d+ \|/gmu) ?? []).length, 4);
  for (const field of ["valid", "contractKind", "version", "errors"]) {
    assert.equal(rootSection.includes(`\`${field}\``), true, field);
  }
  assert.match(rootSection, /HUMAN_REVIEW_SOURCE_REGISTER_VALIDATOR_BOUNDARY/u);
  assert.match(rootSection, /const: "1\.0\.0"/u);
  assert.match(rootSection, /uniqueItems: true/u);
});

test("future root oneOf has exact success and failure branches", () => {
  const docsText = readRequired(docsRelativePath);
  const section = docsText.slice(
    docsText.indexOf("## 6. Exact Two-State Root Encoding"),
    docsText.indexOf("## 7."),
  );

  assert.equal((section.match(/^\| \d+ \|/gmu) ?? []).length, 2);
  assert.match(section, /valid const true`; `errors maxItems 0/u);
  assert.match(section, /valid const false`; `errors minItems 1/u);
  assert.match(
    section,
    /FUTURE_VALIDATOR_RESULT_STATE_BRANCH_KEYWORD:\noneOf/u,
  );
  assert.match(section, /FUTURE_VALIDATOR_RESULT_STATE_BRANCH_COUNT:\n2/u);
});

test("future error item is closed and uses exact indexed patterns", () => {
  const docsText = readRequired(docsRelativePath);
  const itemSection = docsText.slice(
    docsText.indexOf("## 7. Exact Future Error-Item Shape"),
    docsText.indexOf("## 8."),
  );
  const patternSection = docsText.slice(
    docsText.indexOf("## 8. Exact Indexed Path Patterns"),
    docsText.indexOf("## 9."),
  );

  assert.match(itemSection, /required: \["code", "path"\]/u);
  assert.match(itemSection, /additionalProperties: false/u);
  assert.match(itemSection, /No `\$defs`, dynamic reference/u);
  assert.equal((patternSection.match(/^\| indexed/gmu) ?? []).length, 3);
  for (const pattern of [
    "^\\\\$\\\\.sources\\\\[(0|[1-9][0-9]*)\\\\]$",
    "^\\\\$\\\\.sources\\\\[(0|[1-9][0-9]*)\\\\]\\\\.(source_ref|declared_source_type|declared_label)$",
    "^\\\\$\\\\.sources\\\\[(0|[1-9][0-9]*)\\\\]\\\\.source_ref$",
  ]) {
    assert.equal(patternSection.includes(`\`${pattern}\``), true, pattern);
  }
  assert.match(
    patternSection,
    /FUTURE_VALIDATION_ERROR_INDEXED_PATH_PATTERN_COUNT:\n3/u,
  );
});

test("five code-to-path branches and their nested path counts are exact", () => {
  const docsText = readRequired(docsRelativePath);

  for (const marker of [
    "REQUIRED_FIELD_MISSING_PATH_BRANCH_COUNT:\n2",
    "UNEXPECTED_FIELD_PATH_BRANCH_COUNT:\n2",
    "INVALID_FIELD_TYPE_PATH_BRANCH_COUNT:\n3",
    "INVALID_FIELD_VALUE_PATH_BRANCH_COUNT:\n2",
    "DUPLICATE_SOURCE_REF_PATH_BRANCH_COUNT:\n1",
    "FUTURE_VALIDATION_ERROR_CODE_PATH_BRANCH_COUNT:\n5",
  ]) {
    assert.match(docsText, new RegExp(marker, "u"));
  }
  const aggregateSection = docsText.slice(
    docsText.indexOf("## 14. Exact Five Code-to-Path Branches"),
    docsText.indexOf("## 15."),
  );
  for (const code of [
    "required_field_missing",
    "unexpected_field",
    "invalid_field_type",
    "invalid_field_value",
    "duplicate_source_ref",
  ]) {
    assert.equal(aggregateSection.includes(`\`${code}\``), true, code);
  }
  assert.match(aggregateSection, /Independent global code and path enums/u);
});

test("uniqueItems is structural and validator behaviors remain outside", () => {
  const docsText = readRequired(docsRelativePath);

  assert.match(
    docsText,
    /FUTURE_VALIDATION_ERROR_ARRAY_UNIQUE_ITEMS:\nTRUE/u,
  );
  assert.match(docsText, /does\s+not implement first-occurrence retention/u);
  for (const phrase of [
    "seven-phase validation execution order",
    "structural duplicate-source detection across candidate entries",
    "descriptor-safe candidate inspection",
    "deep immutability of returned results",
    "candidate label trimming checks",
  ]) {
    assert.equal(docsText.includes(phrase), true, phrase);
  }
});

test("all six readiness questions are resolved without sibling implementation", () => {
  const docsText = readRequired(docsRelativePath);
  const resolvedSection = docsText.slice(
    docsText.indexOf("## 19. Resolved Readiness Questions"),
    docsText.indexOf("## 20."),
  );

  assert.equal((resolvedSection.match(/^\| \d+ \|/gmu) ?? []).length, 6);
  assert.match(
    docsText,
    /RESOLVED_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_QUESTION_COUNT:\n6/u,
  );
  assert.match(docsText, /SEPARATE_LATER_CONTRACT_ONLY_SLICE/u);
  assert.match(docsText, /OUT_OF_SCOPE_NOT_AUTHORIZED/u);
});

test("scope creates no schema runtime approval or conclusion", () => {
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
    "TRACKED_DOCS_ONLY_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_DEFINED",
  ]) {
    assert.equal(docsText.includes(marker), true, marker);
  }
  assert.match(docsText, /not actual human review/u);
  assert.match(docsText, /not actual human review[\s\S]*real-evidence review/u);
});
