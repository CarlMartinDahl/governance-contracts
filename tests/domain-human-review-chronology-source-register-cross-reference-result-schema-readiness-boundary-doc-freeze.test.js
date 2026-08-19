"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const docsRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_SOURCE_REGISTER_CROSS_REFERENCE_RESULT_SCHEMA_READINESS_BOUNDARY_v1.md";
const resultSchemaRelativePath =
  "schemas/human-review-chronology-source-register-cross-reference-result.json";
const resultSchemaProofRelativePath =
  "tests/human-review-chronology-source-register-cross-reference-result-schema.test.js";
const resultSchemaProofTransitionRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_SOURCE_REGISTER_CROSS_REFERENCE_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const packageExportProofTransitionRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_SOURCE_REGISTER_CROSS_REFERENCE_RESULT_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const controllingPaths = [
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_SOURCE_REGISTER_CROSS_REFERENCE_SEMANTICS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_SOURCE_REGISTER_CROSS_REFERENCE_READINESS_BOUNDARY_v1.md",
  "schemas/human-review-chronology-validator-result.json",
  "tests/human-review-chronology-validator-result-schema.test.js",
  "schemas/human-review-source-register-validator-result.json",
  "tests/human-review-source-register-validator-result-schema.test.js",
  "packages/schemas/src/index.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_VALIDATOR_RESULT_SCHEMA_READINESS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_VALIDATOR_RESULT_SCHEMA_READINESS_BOUNDARY_v1.md",
];

function absolutePath(relativePath) {
  return path.join(repoRoot, relativePath);
}

function readRequired(relativePath) {
  const targetPath = absolutePath(relativePath);
  assert.equal(fs.existsSync(targetPath), true, `expected ${relativePath}`);
  return fs.readFileSync(targetPath, "utf8");
}

test("cross-reference result-schema readiness boundary and every source exist", () => {
  const docsText = readRequired(docsRelativePath);

  for (const sourcePath of controllingPaths) {
    readRequired(sourcePath);
    assert.equal(docsText.includes(`\`${sourcePath}\``), true, sourcePath);
  }

  assert.match(
    docsText,
    /HUMAN_REVIEW_CHRONOLOGY_SOURCE_REGISTER_CROSS_REFERENCE_RESULT_SCHEMA_READINESS_BOUNDARY/u,
  );
  assert.match(docsText, /DOCS_ONLY/u);
  assert.match(docsText, /APPEND_ONLY_RESULT_SCHEMA_READINESS_ASSESSMENT/u);
});

test("child validator-result schemas remain separate tracked siblings", () => {
  const docsText = readRequired(docsRelativePath);
  const packageSchemas = require("../packages/schemas/src/index.js");

  assert.equal(
    Object.hasOwn(packageSchemas, "humanReviewChronologyValidatorResult"),
    true,
  );
  assert.equal(
    Object.hasOwn(packageSchemas, "humanReviewSourceRegisterValidatorResult"),
    true,
  );
  assert.match(docsText, /CHILD_VALIDATOR_RESULT_SCHEMA_COUNT:\n2/u);
  assert.match(
    docsText,
    /CHILD_VALIDATOR_RESULT_SCHEMA_STATUS:\nTRACKED_AND_PACKAGE_EXPORTED/u,
  );
  assert.match(docsText, /must not be added to, nested\ninside, or represented as a branch/u);
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
  assert.match(
    resultSection,
    /HUMAN_REVIEW_CHRONOLOGY_SOURCE_REGISTER_CROSS_REFERENCE_BOUNDARY/u,
  );
});

test("five closed code-to-path branches and indexed grammar are exact", () => {
  const docsText = readRequired(docsRelativePath);
  const partitionSection = docsText.slice(
    docsText.indexOf("## 6. Exact Closed Codes And Path Grammar Available"),
    docsText.indexOf("## 7."),
  );
  const pairs = [
    ["invalid_input_shape", "$"],
    ["review_chronology_invalid", "$.review_chronology"],
    ["source_register_invalid", "$.source_register"],
    ["packet_ref_mismatch", "$.review_chronology.packet_ref"],
    [
      "source_ref_not_in_register",
      "$.review_chronology.entries[n].source_refs[m]",
    ],
  ];

  assert.equal((partitionSection.match(/^\| \d+ \|/gmu) ?? []).length, 5);
  for (const [code, pathTemplate] of pairs) {
    assert.equal(partitionSection.includes(`\`${code}\``), true, code);
    assert.equal(
      partitionSection.includes(`\`${pathTemplate}\``),
      true,
      pathTemplate,
    );
  }
  assert.match(docsText, /CROSS_REFERENCE_ERROR_CODE_COUNT:\n5/u);
  assert.match(docsText, /CROSS_REFERENCE_ERROR_STATIC_PATH_COUNT:\n4/u);
  assert.match(
    docsText,
    /CROSS_REFERENCE_ERROR_INDEXED_PATH_TEMPLATE_COUNT:\n1/u,
  );
  assert.match(docsText, /Multi-digit indices have no leading zero/u);
  assert.match(partitionSection, /Independent global code\nand path constraints/u);
});

test("schema-expressible facts stay separate from checkpoint behavior", () => {
  const docsText = readRequired(docsRelativePath);

  assert.match(
    docsText,
    /SCHEMA_DOES_NOT_CREATE_CROSS_REFERENCE_BEHAVIOR:\nTRUE/u,
  );
  assert.match(
    docsText,
    /SCHEMA_DOES_NOT_PROVE_PACKET_OR_SOURCE_MEMBERSHIP:\nTRUE/u,
  );
  for (const phrase of [
    "five-phase execution order",
    "descriptor-safe envelope inspection",
    "exact child-validator call order and call counts",
    "packet-mismatch short-circuiting",
    "Source Register membership-set construction",
    "first-occurrence code/path deduplication behavior",
    "deterministic result construction and recursive freezing",
    "no logging, telemetry, metrics, tracing, audit emission, or value echo",
  ]) {
    assert.equal(docsText.includes(phrase), true, phrase);
  }
});

test("six scaffold questions remain open and readiness is bounded", () => {
  const docsText = readRequired(docsRelativePath);
  const questionSection = docsText.slice(
    docsText.indexOf("## 8. Open Scaffold-Scope Questions"),
    docsText.indexOf("## 9."),
  );

  assert.equal((questionSection.match(/^\d+\./gmu) ?? []).length, 6);
  assert.match(
    docsText,
    /OPEN_CROSS_REFERENCE_RESULT_SCHEMA_SCAFFOLD_SCOPE_QUESTION_COUNT:\n6/u,
  );
  assert.match(
    docsText,
    /CROSS_REFERENCE_RESULT_SCHEMA_READINESS:\nREADY_FOR_DOCS_ONLY_SCAFFOLD_SCOPE_DECISION/u,
  );
  assert.match(
    docsText,
    /CROSS_REFERENCE_CHECKPOINT_IMPLEMENTATION_READINESS:\nNOT_CREATED/u,
  );
  assert.match(docsText, /one `DOCS_ONLY` cross-reference result-schema\nscaffold-scope boundary/u);
});

test("result schema paths and package-export proof transition remain bounded", () => {
  const docsText = readRequired(docsRelativePath);
  const resultSchemaProofTransitionText = readRequired(
    resultSchemaProofTransitionRelativePath,
  );
  const packageExportProofTransitionText = readRequired(
    packageExportProofTransitionRelativePath,
  );
  const futureSection = docsText.slice(
    docsText.indexOf("## 10. Retained Future Slice Partition"),
    docsText.indexOf("## 11."),
  );

  for (const candidatePath of [
    resultSchemaRelativePath,
    resultSchemaProofRelativePath,
  ]) {
    assert.equal(
      resultSchemaProofTransitionText.includes(`\`${candidatePath}\``),
      true,
      candidatePath,
    );
  }
  assert.match(
    resultSchemaProofTransitionText,
    /CROSS_REFERENCE_RESULT_SCHEMA_PATH_TRANSITION_COUNT:\n2/u,
  );
  assert.equal(
    packageExportProofTransitionText.includes(
      "`tests/domain-human-review-chronology-source-register-cross-reference-result-schema-readiness-boundary-doc-freeze.test.js`",
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
  assert.equal((futureSection.match(/^\| \d+ \|/gmu) ?? []).length, 8);
  assert.match(docsText, /RETAINED_FUTURE_STAGED_SURFACE_COUNT:\n8/u);
  assert.match(docsText, /NEW_RUNTIME_LIVE_ABSENCE_OWNER_COUNT:\n0/u);
  assert.match(docsText, /must not\nbecome a new live-absence owner/u);
});

test("readiness creates no implementation or conclusion", () => {
  const docsText = readRequired(docsRelativePath);

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
    assert.equal(docsText.includes(marker), true, marker);
  }
  assert.match(docsText, /not actual human review, professional review/u);
  assert.match(docsText, /not actual human review[\s\S]*real-evidence review/u);
});
