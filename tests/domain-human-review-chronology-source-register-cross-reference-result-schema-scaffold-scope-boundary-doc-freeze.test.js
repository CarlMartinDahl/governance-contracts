"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const docsRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_SOURCE_REGISTER_CROSS_REFERENCE_RESULT_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md";
const futurePaths = [
  "schemas/human-review-chronology-source-register-cross-reference-result.json",
  "tests/human-review-chronology-source-register-cross-reference-result-schema.test.js",
];
const resultSchemaProofTransitionRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_SOURCE_REGISTER_CROSS_REFERENCE_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const packageExportProofTransitionRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_SOURCE_REGISTER_CROSS_REFERENCE_RESULT_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const controllingPaths = [
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_SOURCE_REGISTER_CROSS_REFERENCE_SEMANTICS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_SOURCE_REGISTER_CROSS_REFERENCE_RESULT_SCHEMA_READINESS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "schemas/human-review-chronology-validator-result.json",
  "tests/human-review-chronology-validator-result-schema.test.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "schemas/human-review-source-register-validator-result.json",
  "tests/human-review-source-register-validator-result-schema.test.js",
  "packages/schemas/src/index.js",
];

function absolutePath(relativePath) {
  return path.join(repoRoot, relativePath);
}

function readRequired(relativePath) {
  const targetPath = absolutePath(relativePath);
  assert.equal(fs.existsSync(targetPath), true, `expected ${relativePath}`);
  return fs.readFileSync(targetPath, "utf8");
}

test("cross-reference result-schema scaffold scope and all sources exist", () => {
  const docsText = readRequired(docsRelativePath);

  for (const sourcePath of controllingPaths) {
    readRequired(sourcePath);
    assert.equal(docsText.includes(`\`${sourcePath}\``), true, sourcePath);
  }

  assert.match(
    docsText,
    /HUMAN_REVIEW_CHRONOLOGY_SOURCE_REGISTER_CROSS_REFERENCE_RESULT_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY/u,
  );
  assert.match(docsText, /DOCS_ONLY/u);
  assert.match(docsText, /APPEND_ONLY_RESULT_SCHEMA_SCAFFOLD_SCOPE/u);
});

test("future result-schema slice is exactly two transition-permitted files", () => {
  const docsText = readRequired(docsRelativePath);
  const resultSchemaProofTransitionText = readRequired(
    resultSchemaProofTransitionRelativePath,
  );

  assert.match(
    docsText,
    /FUTURE_CROSS_REFERENCE_RESULT_SCHEMA_SLICE_FILE_COUNT:\n2/u,
  );
  for (const futurePath of futurePaths) {
    assert.equal(docsText.includes(`\`${futurePath}\``), true, futurePath);
    assert.equal(
      resultSchemaProofTransitionText.includes(`\`${futurePath}\``),
      true,
      futurePath,
    );
  }
  assert.match(
    resultSchemaProofTransitionText,
    /CROSS_REFERENCE_RESULT_SCHEMA_PATH_TRANSITION_COUNT:\n2/u,
  );
  assert.match(docsText, /package index, proof-transition surfaces, and every runtime file remain\nunchanged/u);
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
      "`https://governance-contracts.invalid/schemas/human-review-chronology-source-register-cross-reference-result.json`",
    ),
    true,
  );
  assert.equal(
    identitySection.includes(
      "`Human Review Chronology Source Register Cross-Reference Result Contract`",
    ),
    true,
  );
  assert.equal((rootSection.match(/^\| \d+ \|/gmu) ?? []).length, 4);
  for (const field of ["valid", "contractKind", "version", "errors"]) {
    assert.equal(rootSection.includes(`\`${field}\``), true, field);
  }
  assert.match(
    rootSection,
    /HUMAN_REVIEW_CHRONOLOGY_SOURCE_REGISTER_CROSS_REFERENCE_BOUNDARY/u,
  );
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
    /FUTURE_CROSS_REFERENCE_RESULT_STATE_BRANCH_KEYWORD:\noneOf/u,
  );
  assert.match(
    section,
    /FUTURE_CROSS_REFERENCE_RESULT_STATE_BRANCH_COUNT:\n2/u,
  );
});

test("future error item is closed and indexed path grammar is exact", () => {
  const docsText = readRequired(docsRelativePath);
  const itemSection = docsText.slice(
    docsText.indexOf("## 7. Exact Future Error-Item Shape"),
    docsText.indexOf("## 8."),
  );
  const patternSection = docsText.slice(
    docsText.indexOf("## 8. Exact Indexed Path Pattern"),
    docsText.indexOf("## 9."),
  );
  const exactPattern =
    "^\\\\$\\\\.review_chronology\\\\.entries\\\\[(0|[1-9][0-9]*)\\\\]\\\\.source_refs\\\\[(0|[1-9][0-9]*)\\\\]$";

  assert.match(itemSection, /required: \["code", "path"\]/u);
  assert.match(itemSection, /additionalProperties: false/u);
  assert.match(itemSection, /No `\$defs`, dynamic reference/u);
  assert.equal(patternSection.includes(`\`${exactPattern}\``), true);
  assert.match(
    patternSection,
    /FUTURE_CROSS_REFERENCE_ERROR_INDEXED_PATH_PATTERN_COUNT:\n1/u,
  );
  assert.match(patternSection, /rejects multi-digit indices\nwith a leading zero/u);
});

test("five code-to-path branches remain exact and closed", () => {
  const docsText = readRequired(docsRelativePath);
  const branchSection = docsText.slice(
    docsText.indexOf("## 9. Exact Five Code-To-Path Branches"),
    docsText.indexOf("## 10."),
  );

  assert.equal((branchSection.match(/^\| \d+ \|/gmu) ?? []).length, 5);
  for (const code of [
    "invalid_input_shape",
    "review_chronology_invalid",
    "source_register_invalid",
    "packet_ref_mismatch",
    "source_ref_not_in_register",
  ]) {
    assert.equal(branchSection.includes(code), true, code);
  }
  assert.match(
    branchSection,
    /FUTURE_CROSS_REFERENCE_ERROR_CODE_PATH_BRANCH_COUNT:\n5/u,
  );
  assert.match(branchSection, /FUTURE_CROSS_REFERENCE_STATIC_PATH_BRANCH_COUNT:\n4/u);
  assert.match(branchSection, /FUTURE_CROSS_REFERENCE_INDEXED_PATH_BRANCH_COUNT:\n1/u);
  assert.match(branchSection, /Independent global enums/u);
});

test("uniqueItems is structural and checkpoint behavior stays outside", () => {
  const docsText = readRequired(docsRelativePath);

  assert.match(
    docsText,
    /FUTURE_CROSS_REFERENCE_ERROR_ARRAY_UNIQUE_ITEMS:\nTRUE/u,
  );
  assert.match(docsText, /does not implement first-occurrence retention/u);
  for (const phrase of [
    "five-phase cross-reference execution order",
    "descriptor-safe envelope inspection",
    "exact child-validator call order or call counts",
    "packet-mismatch short-circuiting",
    "Source Register membership-set construction",
    "deterministic result construction or recursive freezing",
    "no logging, telemetry, metrics, tracing, audit emission, or value echo",
  ]) {
    assert.equal(docsText.includes(phrase), true, phrase);
  }
});

test("all six readiness questions are resolved without sibling implementation", () => {
  const docsText = readRequired(docsRelativePath);
  const packageExportProofTransitionText = readRequired(
    packageExportProofTransitionRelativePath,
  );
  const resolvedSection = docsText.slice(
    docsText.indexOf("## 14. Resolved Readiness Questions"),
    docsText.indexOf("## 15."),
  );

  assert.equal((resolvedSection.match(/^\| \d+ \|/gmu) ?? []).length, 6);
  assert.match(
    docsText,
    /RESOLVED_CROSS_REFERENCE_RESULT_SCHEMA_SCAFFOLD_SCOPE_QUESTION_COUNT:\n6/u,
  );
  assert.equal(
    packageExportProofTransitionText.includes(
      "`tests/domain-human-review-chronology-source-register-cross-reference-result-schema-scaffold-scope-boundary-doc-freeze.test.js`",
    ),
    true,
  );
  assert.match(
    packageExportProofTransitionText,
    /PACKAGE_SCHEMA_EXPORT_HISTORICAL_ASSERTION_TRANSITION_COUNT:\n3/u,
  );
  assert.match(
    packageExportProofTransitionText,
    /RETAINED_PACKAGE_SCHEMA_EXPORT_LIVE_ABSENCE_ASSERTION_COUNT:\n1/u,
  );
  assert.match(docsText, /SEPARATE_LATER_CONTRACT_ONLY_SLICE/u);
  assert.match(docsText, /SEPARATE_LATER_DOCS_ONLY_PREREQUISITE/u);
  assert.match(docsText, /OUT_OF_SCOPE_NOT_AUTHORIZED/u);
  assert.match(docsText, /NEW_RUNTIME_LIVE_ABSENCE_OWNER_COUNT:\n0/u);
});

test("scope creates no schema runtime approval or conclusion", () => {
  const docsText = readRequired(docsRelativePath);

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
    assert.equal(docsText.includes(marker), true, marker);
  }
  assert.match(docsText, /one `DOCS_ONLY` proof-transition prerequisite/u);
  assert.match(docsText, /not actual human review, professional review/u);
  assert.match(docsText, /not actual human review[\s\S]*real-evidence review/u);
});
