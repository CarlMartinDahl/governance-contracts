"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_CROSS_REFERENCE_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const semanticsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_CROSS_REFERENCE_SEMANTICS_BOUNDARY_v1.md";
const semanticsProofPath =
  "tests/domain-human-review-controlled-handoff-brief-cross-reference-semantics-boundary-doc-freeze.test.js";
const packageExportTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_CROSS_REFERENCE_RESULT_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const candidatePaths = [
  "schemas/human-review-controlled-handoff-brief-cross-reference-result.json",
  "tests/human-review-controlled-handoff-brief-cross-reference-result-schema.test.js",
];
const historicalPackageProofPath =
  "tests/human-review-controlled-handoff-brief-cross-reference-result-package-export.test.js";
const retainedRuntimePaths = [
  "packages/governance/src/human-review-controlled-handoff-brief-cross-reference-validation-boundary.js",
  "tests/human-review-controlled-handoff-brief-cross-reference-validation-boundary.test.js",
];

function readRequired(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  assert.equal(fs.existsSync(absolutePath), true, relativePath);
  return fs.readFileSync(absolutePath, "utf8");
}

test("result-schema proof transition and canonical sources exist", () => {
  const docsText = readRequired(docsPath);

  for (const sourcePath of [semanticsPath, semanticsProofPath]) {
    readRequired(sourcePath);
    assert.equal(docsText.includes("`" + sourcePath + "`"), true, sourcePath);
  }
  for (const marker of [
    "DOCS_ONLY",
    "PROOF_ASSERTION_TRANSITION_ONLY",
    "EXACT_TWO_RESULT_SCHEMA_CANDIDATE_PATHS_RELEASED",
    "RESULT_SCHEMA_NOT_CREATED_BY_THIS_SLICE",
    "NO_RUNTIME_BEHAVIOR_CREATED",
  ]) {
    assert.match(docsText, new RegExp(marker, "u"));
  }
});

test("exact two candidate paths are transition-authorized without live absence", () => {
  const docsText = readRequired(docsPath);
  const semanticsProofText = readRequired(semanticsProofPath);

  assert.match(
    docsText,
    /CROSS_REFERENCE_RESULT_SCHEMA_CANDIDATE_PATH_COUNT:\n2/u,
  );
  assert.match(
    docsText,
    /TRANSITIONED_LIVE_ABSENCE_ASSERTION_COUNT:\n2/u,
  );
  for (const [index, candidatePath] of candidatePaths.entries()) {
    const row =
      "| " +
      (index + 1) +
      " | `" +
      candidatePath +
      "` | `PERMITTED_FOR_SEPARATE_LATER_CONTRACT_ONLY_SLICE` |";
    assert.equal(docsText.includes(row), true, candidatePath);
    assert.equal(semanticsProofText.includes(candidatePath), true, candidatePath);
  }

  const retainedArray = semanticsProofText.slice(
    semanticsProofText.indexOf("const retainedAbsentFuturePaths = ["),
    semanticsProofText.indexOf("];", semanticsProofText.indexOf("const retainedAbsentFuturePaths = [")) + 2,
  );
  for (const candidatePath of candidatePaths) {
    assert.equal(retainedArray.includes(candidatePath), false, candidatePath);
  }
});

test("historical package posture is anchored while runtime denials remain live", () => {
  const docsText = readRequired(docsPath);
  const semanticsProofText = readRequired(semanticsProofPath);
  const packageExportTransitionText = readRequired(packageExportTransitionPath);

  assert.match(docsText, /RETAINED_LATER_PATH_LIVE_ABSENCE_COUNT:\n3/u);
  assert.match(docsText, /RETAINED_PACKAGE_EXPORT_DENIAL_COUNT:\n2/u);
  assert.equal(
    packageExportTransitionText.includes("`" + historicalPackageProofPath + "`"),
    true,
  );
  for (const retainedPath of retainedRuntimePaths) {
    assert.equal(docsText.includes("`" + retainedPath + "`"), true, retainedPath);
    assert.equal(semanticsProofText.includes(retainedPath), true, retainedPath);
  }
  for (const symbol of [
    "humanReviewControlledHandoffBriefCrossReferenceResult",
    "validateHumanReviewControlledHandoffBriefCrossReference",
  ]) {
    assert.equal(docsText.includes("`" + symbol + "`"), true, symbol);
    assert.equal(semanticsProofText.includes(symbol), true, symbol);
    assert.equal(packageExportTransitionText.includes(symbol), true, symbol);
  }
});

test("transition scope is exact and later schema slice stays two files", () => {
  const docsText = readRequired(docsPath);

  assert.match(docsText, /RESULT_SCHEMA_PROOF_TRANSITION_FILE_COUNT:\n3/u);
  assert.match(docsText, /FUTURE_RESULT_SCHEMA_IMPLEMENTATION_FILE_COUNT:\n2/u);
  for (const currentPath of [docsPath, __filename.slice(repoRoot.length + 1), semanticsProofPath]) {
    assert.equal(docsText.includes("`" + currentPath + "`"), true, currentPath);
  }
  for (const candidatePath of candidatePaths) {
    assert.equal(docsText.includes("`" + candidatePath + "`"), true, candidatePath);
  }
});

test("release and no-conclusion boundaries remain explicit", () => {
  const docsText = readRequired(docsPath);

  for (const marker of [
    "PACKAGE_EXPORT_NOT_CREATED",
    "CROSS_REFERENCE_CHECKPOINT_NOT_CREATED",
    "NO_APPROVAL_OR_RELEASE_AUTHORITY_CREATED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "TRACKED_DOCS_ONLY_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_DEFINED",
  ]) {
    assert.match(docsText, new RegExp(marker, "u"));
  }
  assert.match(docsText, /not actual human review[\s\S]*real-evidence review/u);
});
