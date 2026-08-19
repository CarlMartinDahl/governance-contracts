"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const scaffoldPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_VALIDATOR_HELPER_SCAFFOLD_SCOPE_BOUNDARY_v1.md";
const crossReferenceProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_CROSS_REFERENCE_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const alignedTestPaths = [
  "tests/human-review-asserted-claim-matrix-schema.test.js",
  "tests/domain-human-review-asserted-claim-matrix-contract-readiness-boundary-doc-freeze.test.js",
  "tests/domain-human-review-asserted-claim-matrix-validator-result-schema-scaffold-scope-boundary-doc-freeze.test.js",
  "tests/domain-human-review-asserted-claim-matrix-contract-boundary-doc-freeze.test.js",
  "tests/domain-human-review-asserted-claim-matrix-validator-result-schema-readiness-boundary-doc-freeze.test.js",
  "tests/domain-human-review-asserted-claim-matrix-validator-helper-readiness-boundary-doc-freeze.test.js",
];
const historicalHelperPaths = [
  "packages/schemas/src/human-review-asserted-claim-matrix-validator.js",
  "tests/human-review-asserted-claim-matrix-validator.test.js",
];
const retainedCrossReferencePath =
  "packages/governance/src/human-review-asserted-claim-matrix-validation-boundary.js";
const historicalPackageDenials = [
  "humanReviewAssertedClaimMatrixValidator",
  "validateHumanReviewAssertedClaimMatrix",
  "getHumanReviewAssertedClaimMatrixValidator",
  "humanReviewAssertedClaimMatrixValidatorRegistry",
];

function readRequired(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  assert.equal(fs.existsSync(absolutePath), true, `expected ${relativePath} to exist`);
  return fs.readFileSync(absolutePath, "utf8");
}

test("proof-transition boundary and controlling scaffold exist", () => {
  const docsText = readRequired(docsPath);
  readRequired(scaffoldPath);

  assert.equal(docsText.includes("`" + scaffoldPath + "`"), true);
  assert.match(
    docsText,
    /HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY/u,
  );
  assert.match(docsText, /DOCS_ONLY/u);
  assert.match(docsText, /APPEND_ONLY_PROOF_TRANSITION_PREREQUISITE/u);
});

test("transition is exactly eight files ten assertions and two historical paths", () => {
  const docsText = readRequired(docsPath);

  assert.match(docsText, /VALIDATOR_HELPER_PROOF_TRANSITION_FILE_COUNT:\n8/u);
  assert.match(docsText, /VALIDATOR_HELPER_PATH_LIVE_ABSENCE_TRANSITION_COUNT:\n10/u);
  assert.match(docsText, /VALIDATOR_HELPER_RESERVED_PATH_COUNT:\n2/u);
  for (const alignedPath of alignedTestPaths) {
    assert.equal(docsText.includes("`" + alignedPath + "`"), true, alignedPath);
  }
  for (const helperPath of historicalHelperPaths) {
    assert.equal(docsText.includes("`" + helperPath + "`"), true, helperPath);
  }
});

test("aligned proofs anchor transition instead of perpetual helper absence", () => {
  const transitionFileName = path.basename(docsPath);

  for (const alignedPath of alignedTestPaths) {
    const testText = readRequired(alignedPath);
    assert.equal(testText.includes(transitionFileName), true, alignedPath);
    assert.match(testText, /VALIDATOR_HELPER_PATH_LIVE_ABSENCE_TRANSITION_COUNT/u);
    assert.equal(testText.includes("retainedValidatorHelperPaths"), false, alignedPath);
    assert.equal(testText.includes("retainedAbsentImplementationPaths"), false, alignedPath);
  }
});

test("cross-reference history and package denials remain bounded", () => {
  const docsText = readRequired(docsPath);
  const crossReferenceProofTransitionText = readRequired(
    crossReferenceProofTransitionPath,
  );
  const contractReadinessProof = readRequired(
    "tests/domain-human-review-asserted-claim-matrix-contract-readiness-boundary-doc-freeze.test.js",
  );
  const packageSchemas = require("../packages/schemas/src/index.js");
  const packageIndexText = readRequired("packages/schemas/src/index.js");

  assert.equal(
    crossReferenceProofTransitionText.includes("`" + retainedCrossReferencePath + "`"),
    true,
  );
  assert.match(
    crossReferenceProofTransitionText,
    /CROSS_REFERENCE_FUTURE_PATH_LIVE_ABSENCE_TRANSITION_COUNT:\n7/u,
  );
  assert.match(
    crossReferenceProofTransitionText,
    /TRACKED_DOCS_ONLY_CROSS_REFERENCE_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
  assert.equal(docsText.includes("`" + retainedCrossReferencePath + "`"), true);
  assert.equal(contractReadinessProof.includes("retainedAbsentGovernancePaths"), true);
  assert.match(docsText, /RETAINED_CROSS_REFERENCE_CHECKPOINT_ABSENCE_COUNT:\n1/u);

  for (const deniedExport of historicalPackageDenials) {
    assert.equal(docsText.includes("- `" + deniedExport + "`"), true, deniedExport);
    assert.equal(Object.hasOwn(packageSchemas, deniedExport), false, deniedExport);
  }
  assert.equal((packageIndexText.match(/\n/gu) ?? []).length, 13165);
  assert.match(docsText, /PACKAGE_INDEX_BASELINE_LINE_COUNT:\n13165/u);
});

test("later helper remains a separate exact two-file slice", () => {
  const docsText = readRequired(docsPath);

  assert.match(docsText, /one separate `RUNTIME_CHANGE`\nslice may create exactly/u);
  for (const helperPath of historicalHelperPaths) {
    assert.equal(docsText.includes("- `" + helperPath + "`"), true, helperPath);
  }
  assert.match(docsText, /eight-stage algorithm/u);
  assert.match(docsText, /package-index non-interference/u);
});

test("transition preserves non-implementation and no-conclusion boundaries", () => {
  const docsText = readRequired(docsPath);

  for (const marker of [
    "HISTORICAL_VALIDATOR_HELPER_ABSENCE_MARKERS_PRESERVED",
    "CROSS_REFERENCE_CHECKPOINT_ABSENCES_RETAINED",
    "PACKAGE_EXPORT_DENIALS_RETAINED",
    "HELPER_NOT_CREATED_BY_THIS_SLICE",
    "HELPER_TEST_NOT_CREATED_BY_THIS_SLICE",
    "PACKAGE_INDEX_UNCHANGED",
    "VALIDATOR_EXPORT_NOT_CREATED",
    "VALIDATOR_DISPATCH_NOT_CHANGED",
    "VALIDATION_EXECUTION_NOT_CREATED",
    "NO_RUNTIME_BEHAVIOR_CREATED",
    "NO_REAL_PRIVATE_OR_SOURCE_MATERIAL_INSPECTION_CREATED",
    "NO_DOMAIN_FINDING_SCORE_OR_CONCLUSION_CREATED",
    "NO_APPROVAL_OR_RELEASE_PRODUCT_IMPLEMENTATION_READINESS_CREATED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "TRACKED_DOCS_ONLY_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_DEFINED",
  ]) {
    assert.match(docsText, new RegExp(marker, "u"));
  }

  assert.match(docsText, /Human\/professional review remains the release gate/u);
  assert.match(docsText, /not actual human review[\s\S]*real-evidence review/u);
});
