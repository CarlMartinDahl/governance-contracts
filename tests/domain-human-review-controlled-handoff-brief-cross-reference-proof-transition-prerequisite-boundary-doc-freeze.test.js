"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_CROSS_REFERENCE_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const runtimePaths = [
  "packages/governance/src/human-review-controlled-handoff-brief-cross-reference-validation-boundary.js",
  "tests/human-review-controlled-handoff-brief-cross-reference-validation-boundary.test.js",
];
const ownerPaths = [
  "tests/domain-human-review-controlled-handoff-brief-contract-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-brief-schema-scaffold-scope-boundary-doc-freeze.test.js",
  "tests/human-review-controlled-handoff-brief-schema.test.js",
  "tests/domain-human-review-controlled-handoff-brief-validator-result-schema-readiness-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-brief-validator-result-schema-scaffold-scope-boundary-doc-freeze.test.js",
  "tests/human-review-controlled-handoff-brief-validator-result-schema.test.js",
  "tests/domain-human-review-controlled-handoff-brief-validator-result-package-schema-export-scope-boundary-doc-freeze.test.js",
  "tests/human-review-controlled-handoff-brief-validator-result-package-export.test.js",
  "tests/domain-human-review-controlled-handoff-brief-validator-helper-proof-transition-prerequisite-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-brief-cross-reference-semantics-boundary-doc-freeze.test.js",
  "tests/human-review-controlled-handoff-brief-cross-reference-result-schema.test.js",
  "tests/domain-human-review-controlled-handoff-brief-cross-reference-result-package-schema-export-proof-transition-prerequisite-boundary-doc-freeze.test.js",
  "tests/human-review-controlled-handoff-brief-cross-reference-result-package-export.test.js",
];
const forbiddenLiveAbsenceFragments = [
  "fs.existsSync(absolute(retainedPath)), false",
  "fs.existsSync(path.join(repoRoot, futurePath))",
  "fs.existsSync(path.join(repoRoot, absentPath)), false",
  "fs.existsSync(path.join(repoRoot, runtimePath)), false",
];
const functionName =
  "validateHumanReviewControlledHandoffBriefCrossReference";

function readRequired(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  assert.equal(fs.existsSync(absolutePath), true, relativePath);
  return fs.readFileSync(absolutePath, "utf8");
}

test("cross-reference runtime proof transition and canonical sources exist", () => {
  const docsText = readRequired(docsPath);

  for (const sourcePath of [
    "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_CROSS_REFERENCE_SEMANTICS_BOUNDARY_v1.md",
    "schemas/human-review-controlled-handoff-brief-cross-reference-result.json",
    "tests/human-review-controlled-handoff-brief-cross-reference-result-package-export.test.js",
  ]) {
    readRequired(sourcePath);
    assert.equal(docsText.includes("`" + sourcePath + "`"), true, sourcePath);
  }
  for (const marker of [
    "DOCS_ONLY",
    "PROOF_ASSERTION_TRANSITION_ONLY",
    "EXACT_TWO_RUNTIME_CANDIDATE_PATHS_RELEASED",
    "EXACT_TWENTY_SIX_LIVE_ABSENCE_OUTCOMES_TRANSITIONED",
    "RUNTIME_MODULE_NOT_CREATED_BY_THIS_SLICE",
    "NO_RUNTIME_BEHAVIOR_CREATED",
  ]) {
    assert.match(docsText, new RegExp(marker, "u"));
  }
});

test("thirteen owners anchor both runtime paths without live absence", () => {
  const docsText = readRequired(docsPath);

  assert.equal(ownerPaths.length, 13);
  assert.match(
    docsText,
    /CROSS_REFERENCE_RUNTIME_LIVE_ABSENCE_OWNER_COUNT:\n13/u,
  );
  assert.match(
    docsText,
    /CROSS_REFERENCE_RUNTIME_LIVE_ABSENCE_OUTCOME_COUNT:\n26/u,
  );
  for (const ownerPath of ownerPaths) {
    const ownerText = readRequired(ownerPath);
    assert.equal(docsText.includes("`" + ownerPath + "`"), true, ownerPath);
    assert.equal(ownerText.includes(docsPath), true, ownerPath);
    for (const runtimePath of runtimePaths) {
      assert.equal(ownerText.includes(runtimePath), true, ownerPath);
    }
    for (const fragment of forbiddenLiveAbsenceFragments) {
      assert.equal(ownerText.includes(fragment), false, ownerPath + ": " + fragment);
    }
  }
});

test("two candidate paths and exact fifteen-file scope are frozen", () => {
  const docsText = readRequired(docsPath);

  assert.match(docsText, /CROSS_REFERENCE_RUNTIME_CANDIDATE_PATH_COUNT:\n2/u);
  assert.match(
    docsText,
    /CROSS_REFERENCE_RUNTIME_PROOF_TRANSITION_FILE_COUNT:\n15/u,
  );
  assert.match(
    docsText,
    /FUTURE_CROSS_REFERENCE_RUNTIME_IMPLEMENTATION_FILE_COUNT:\n2/u,
  );
  for (const [index, runtimePath] of runtimePaths.entries()) {
    const row =
      "| " +
      (index + 1) +
      " | `" +
      runtimePath +
      "` | `PERMITTED_FOR_SEPARATE_LATER_RUNTIME_CHANGE_SLICE` |";
    assert.equal(docsText.includes(row), true, runtimePath);
  }
});

test("package runtime-function exports remain denied", () => {
  const docsText = readRequired(docsPath);
  const packageSchemas = require("../packages/schemas/src/index.js");
  const packageGovernance = require("../packages/governance/src/index.js");
  const governanceIndexText = readRequired("packages/governance/src/index.js");

  assert.equal(Object.hasOwn(packageSchemas, functionName), false);
  assert.equal(Object.hasOwn(packageGovernance, functionName), false);
  assert.equal((governanceIndexText.match(/\n/gu) ?? []).length, 6212);
  assert.match(
    docsText,
    /FUTURE_GOVERNANCE_PACKAGE_INDEX_EXPORT:\nPROHIBITED/u,
  );
  assert.match(
    docsText,
    /FUTURE_SCHEMAS_PACKAGE_FUNCTION_EXPORT:\nPROHIBITED/u,
  );
  assert.match(
    docsText,
    /GOVERNANCE_PACKAGE_INDEX_BASELINE_LINE_COUNT:\n6212/u,
  );
});

test("release and no-conclusion boundaries remain explicit", () => {
  const docsText = readRequired(docsPath);

  for (const marker of [
    "CALLER_REGISTRY_APPROVAL_DELIVERY_NOT_CREATED",
    "NO_APPROVAL_OR_RELEASE_AUTHORITY_CREATED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "TRACKED_DOCS_ONLY_CROSS_REFERENCE_RUNTIME_PROOF_TRANSITION_PREREQUISITE_DEFINED",
  ]) {
    assert.match(docsText, new RegExp(marker, "u"));
  }
  assert.match(docsText, /not actual human review[\s\S]*real-evidence review/u);
});
