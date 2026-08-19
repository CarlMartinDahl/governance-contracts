"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_SOURCE_REGISTER_CROSS_REFERENCE_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const semanticsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_SOURCE_REGISTER_CROSS_REFERENCE_SEMANTICS_BOUNDARY_v1.md";
const resultSchemaPath =
  "schemas/human-review-chronology-source-register-cross-reference-result.json";
const alignedTestPaths = [
  "tests/domain-human-review-chronology-contract-boundary-doc-freeze.test.js",
  "tests/domain-human-review-chronology-validator-result-schema-readiness-boundary-doc-freeze.test.js",
  "tests/domain-human-review-chronology-validator-helper-proof-transition-prerequisite-boundary-doc-freeze.test.js",
  "tests/human-review-chronology-schema.test.js",
  "tests/domain-human-review-chronology-source-register-cross-reference-readiness-boundary-doc-freeze.test.js",
  "tests/domain-human-review-chronology-source-register-cross-reference-semantics-boundary-doc-freeze.test.js",
];
const historicalRuntimePaths = [
  "packages/governance/src/human-review-chronology-source-register-validation-boundary.js",
  "tests/human-review-chronology-source-register-validation-boundary.test.js",
];

function readRequired(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  assert.equal(fs.existsSync(absolutePath), true, `expected ${relativePath}`);
  return fs.readFileSync(absolutePath, "utf8");
}

test("proof-transition boundary and controlling semantics exist", () => {
  const docsText = readRequired(docsPath);
  readRequired(semanticsPath);

  assert.equal(docsText.includes("`" + semanticsPath + "`"), true);
  assert.match(
    docsText,
    /HUMAN_REVIEW_CHRONOLOGY_SOURCE_REGISTER_CROSS_REFERENCE_PROOF_TRANSITION_PREREQUISITE_BOUNDARY/u,
  );
  assert.match(docsText, /DOCS_ONLY/u);
  assert.match(docsText, /APPEND_ONLY_PROOF_TRANSITION_PREREQUISITE/u);
});

test("transition is exactly eight files twelve outcomes and two runtime paths", () => {
  const docsText = readRequired(docsPath);

  assert.match(docsText, /CROSS_REFERENCE_PROOF_TRANSITION_FILE_COUNT:\n8/u);
  assert.match(
    docsText,
    /CROSS_REFERENCE_RUNTIME_PATH_LIVE_ABSENCE_TRANSITION_COUNT:\n12/u,
  );
  assert.match(docsText, /CROSS_REFERENCE_RUNTIME_RESERVED_PATH_COUNT:\n2/u);
  for (const alignedPath of alignedTestPaths) {
    assert.equal(docsText.includes("`" + alignedPath + "`"), true, alignedPath);
  }
  for (const runtimePath of historicalRuntimePaths) {
    assert.equal(docsText.includes("`" + runtimePath + "`"), true, runtimePath);
  }
});

test("aligned proofs anchor transition instead of perpetual runtime absence", () => {
  for (const alignedPath of alignedTestPaths) {
    const testText = readRequired(alignedPath);
    assert.equal(
      testText.includes("crossReferenceProofTransition"),
      true,
      alignedPath,
    );
    assert.match(
      testText,
      /CROSS_REFERENCE_RUNTIME_PATH_LIVE_ABSENCE_TRANSITION_COUNT/u,
      alignedPath,
    );
    assert.match(
      testText,
      /TRACKED_DOCS_ONLY_CROSS_REFERENCE_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
      alignedPath,
    );
  }
});

test("former runtime-path absence expressions are removed", () => {
  const alignedText = alignedTestPaths.map(readRequired).join("\n");

  for (const expression of [
    "fs.existsSync(absolutePath(retainedPath))",
    "fs.existsSync(absolutePath(absentPath))",
    "fs.existsSync(path.join(repoRoot, retainedPath))",
    "fs.existsSync(path.join(repoRoot, relativePath))",
    "fs.existsSync(absolutePath(runtimeRelativePath))",
    "fs.existsSync(absolutePath(proofRelativePath))",
    "fs.existsSync(absolutePath(runtimeProofRelativePath))",
  ]) {
    assert.equal(alignedText.includes(expression), false, expression);
  }
});

test("result schema and static package export prerequisites remain exact", () => {
  const directSchema = require("../schemas/human-review-chronology-source-register-cross-reference-result.json");
  const packageSchemas = require("../packages/schemas/src/index.js");
  const docsText = readRequired(docsPath);

  readRequired(resultSchemaPath);
  assert.strictEqual(
    packageSchemas.humanReviewChronologySourceRegisterCrossReferenceResult,
    directSchema,
  );
  assert.match(docsText, /RESULT_SCHEMA_STATUS:\nTRACKED_AND_STATICALLY_PACKAGE_EXPORTED/u);
  assert.match(docsText, /RESULT_SCHEMA_OR_PACKAGE_MUTATION_BY_THIS_SLICE:\nNONE/u);
});

test("later runtime remains a separate exact two-file slice", () => {
  const docsText = readRequired(docsPath);

  assert.match(docsText, /CROSS_REFERENCE_RUNTIME_IMPLEMENTATION_FILE_COUNT:\n2/u);
  for (const runtimePath of historicalRuntimePaths) {
    assert.equal(docsText.includes("- `" + runtimePath + "`"), true, runtimePath);
  }
  assert.match(docsText, /five-phase execution/u);
  assert.match(docsText, /separate explicit\s+`RUNTIME_CHANGE` slice/u);
});

test("transition preserves non-implementation and no-conclusion boundaries", () => {
  const docsText = readRequired(docsPath);

  for (const marker of [
    "HISTORICAL_CROSS_REFERENCE_ABSENCE_MARKERS_PRESERVED",
    "RESULT_SCHEMA_AND_STATIC_PACKAGE_EXPORT_PRESERVED",
    "CHECKPOINT_NOT_CREATED_BY_THIS_SLICE",
    "CHECKPOINT_TEST_NOT_CREATED_BY_THIS_SLICE",
    "GOVERNANCE_PACKAGE_EXPORT_NOT_CREATED",
    "CALLER_PERSISTENCE_API_ROUTE_PROVIDER_MODEL_UI_NOT_CREATED",
    "LOGGING_TELEMETRY_AUDIT_NOT_CREATED",
    "NO_RUNTIME_BEHAVIOR_CREATED",
    "NO_REAL_PRIVATE_SOURCE_OR_CASE_MATERIAL_PROCESSED",
    "NO_DOMAIN_FINDING_SCORE_OR_CONCLUSION_CREATED",
    "NO_APPROVAL_OR_RELEASE_PRODUCT_IMPLEMENTATION_READINESS_CREATED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "TRACKED_DOCS_ONLY_CROSS_REFERENCE_PROOF_TRANSITION_PREREQUISITE_DEFINED",
  ]) {
    assert.match(docsText, new RegExp(marker, "u"));
  }

  assert.match(docsText, /Human\/professional review remains the release gate/u);
  assert.match(docsText, /not actual human review[\s\S]*real-evidence review/u);
});
