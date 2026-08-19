"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const crossReferenceProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_CROSS_REFERENCE_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const crossReferenceProofTransitionText = fs.readFileSync(
  path.join(repoRoot, crossReferenceProofTransitionPath),
  "utf8",
);
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_CROSS_REFERENCE_RESULT_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const semanticsProofPath =
  "tests/domain-human-review-controlled-handoff-brief-cross-reference-semantics-boundary-doc-freeze.test.js";
const resultSchemaProofPath =
  "tests/human-review-controlled-handoff-brief-cross-reference-result-schema.test.js";
const earlierTransitionProofPath =
  "tests/domain-human-review-controlled-handoff-brief-cross-reference-result-schema-proof-transition-prerequisite-boundary-doc-freeze.test.js";
const packageProofPath =
  "tests/human-review-controlled-handoff-brief-cross-reference-result-package-export.test.js";
const packageSymbol =
  "humanReviewControlledHandoffBriefCrossReferenceResult";
const runtimePaths = [
  "packages/governance/src/human-review-controlled-handoff-brief-cross-reference-validation-boundary.js",
  "tests/human-review-controlled-handoff-brief-cross-reference-validation-boundary.test.js",
];
const governanceFunction =
  "validateHumanReviewControlledHandoffBriefCrossReference";

function readRequired(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  assert.equal(fs.existsSync(absolutePath), true, relativePath);
  return fs.readFileSync(absolutePath, "utf8");
}

test("package-export proof transition and controlling proofs exist", () => {
  const docsText = readRequired(docsPath);

  for (const proofPath of [
    semanticsProofPath,
    resultSchemaProofPath,
    earlierTransitionProofPath,
  ]) {
    readRequired(proofPath);
    assert.equal(docsText.includes("`" + proofPath + "`"), true, proofPath);
  }
  for (const marker of [
    "CONTRACT_ONLY",
    "PROOF_ASSERTION_TRANSITION_ONLY",
    "EXACT_ONE_STATIC_SCHEMA_EXPORT_SYMBOL_RELEASED",
    "EXACT_FOUR_LIVE_ABSENCE_OUTCOMES_TRANSITIONED",
    "PACKAGE_EXPORT_NOT_CREATED_BY_THIS_SLICE",
    "NO_RUNTIME_BEHAVIOR_CREATED",
  ]) {
    assert.match(docsText, new RegExp(marker, "u"));
  }
});

test("one package symbol and one proof path are transition-authorized", () => {
  const docsText = readRequired(docsPath);

  assert.match(docsText, /PACKAGE_SCHEMA_EXPORT_SYMBOL_COUNT:\n1/u);
  assert.match(docsText, /PACKAGE_SCHEMA_EXPORT_PROOF_PATH_COUNT:\n1/u);
  assert.match(
    docsText,
    /PACKAGE_SCHEMA_EXPORT_TOTAL_LIVE_ABSENCE_TRANSITION_COUNT:\n4/u,
  );
  assert.equal(docsText.includes(packageSymbol), true);
  assert.equal(docsText.includes("`" + packageProofPath + "`"), true);

  for (const proofPath of [semanticsProofPath, resultSchemaProofPath]) {
    const proofText = readRequired(proofPath);
    assert.equal(proofText.includes(docsPath), true, proofPath);
    assert.equal(proofText.includes(packageSymbol), true, proofPath);
    assert.equal(proofText.includes(packageProofPath), true, proofPath);
  }
});

test("runtime paths are transition-anchored and governance export denial remains live", () => {
  const docsText = readRequired(docsPath);
  const packageGovernance = require("../packages/governance/src/index.js");

  assert.match(docsText, /RUNTIME_PATH_LIVE_ABSENCE_OWNER_COUNT:\n2/u);
  assert.match(docsText, /RUNTIME_PATH_LIVE_ABSENCE_OUTCOME_COUNT:\n4/u);
  assert.match(
    docsText,
    /GOVERNANCE_FUNCTION_EXPORT_DENIAL_OUTCOME_COUNT:\n2/u,
  );
  for (const runtimePath of runtimePaths) {
    assert.equal(docsText.includes("`" + runtimePath + "`"), true, runtimePath);
    assert.equal(
      crossReferenceProofTransitionText.includes("\`" + runtimePath + "\`"),
      true,
      runtimePath,
    );
  }
  assert.equal(Object.hasOwn(packageGovernance, governanceFunction), false);
});

test("exact five-file transition preserves two-file export implementation", () => {
  const docsText = readRequired(docsPath);

  assert.match(
    docsText,
    /CURRENT_PACKAGE_EXPORT_PROOF_TRANSITION_PREREQUISITE_FILE_COUNT:\n5/u,
  );
  assert.match(
    docsText,
    /FUTURE_PACKAGE_SCHEMA_EXPORT_IMPLEMENTATION_FILE_COUNT:\n2/u,
  );
  assert.match(docsText, /PACKAGE_INDEX_BASELINE_LINE_COUNT:\n13165/u);
  for (const currentPath of [
    docsPath,
    __filename.slice(repoRoot.length + 1),
    semanticsProofPath,
    resultSchemaProofPath,
    earlierTransitionProofPath,
  ]) {
    assert.equal(docsText.includes("`" + currentPath + "`"), true, currentPath);
  }
});

test("release and no-conclusion boundaries remain explicit", () => {
  const docsText = readRequired(docsPath);

  for (const marker of [
    "CROSS_REFERENCE_CHECKPOINT_NOT_CREATED",
    "NO_APPROVAL_OR_RELEASE_AUTHORITY_CREATED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "TRACKED_CONTRACT_ONLY_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_DEFINED",
  ]) {
    assert.match(docsText, new RegExp(marker, "u"));
  }
  assert.match(docsText, /not actual human review[\s\S]*real-evidence review/u);
});
