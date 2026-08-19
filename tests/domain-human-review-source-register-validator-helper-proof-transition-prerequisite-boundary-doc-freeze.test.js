const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.join(__dirname, "..");
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const scaffoldPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_VALIDATOR_HELPER_SCAFFOLD_SCOPE_BOUNDARY_v1.md";
const alignedTestPaths = [
  "tests/domain-human-review-source-register-contract-boundary-doc-freeze.test.js",
  "tests/domain-human-review-source-register-validator-result-schema-readiness-boundary-doc-freeze.test.js",
];
const historicalHelperPaths = [
  "packages/schemas/src/human-review-source-register-validator.js",
  "tests/human-review-source-register-validator.test.js",
];
const historicalPackageDenials = [
  "humanReviewSourceRegisterValidator",
  "validateHumanReviewSourceRegister",
  "getHumanReviewSourceRegisterValidator",
  "humanReviewSourceRegisterValidatorRegistry",
];
const retainedPackageDenials = historicalPackageDenials.filter(
  (exportName) => exportName !== "validateHumanReviewSourceRegister",
);

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
    /HUMAN_REVIEW_SOURCE_REGISTER_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY/u,
  );
  assert.match(docsText, /DOCS_ONLY/u);
  assert.match(docsText, /APPEND_ONLY_PROOF_TRANSITION_PREREQUISITE/u);
});

test("transition is exactly four files and two historical helper paths", () => {
  const docsText = readRequired(docsPath);

  assert.match(docsText, /VALIDATOR_HELPER_PROOF_TRANSITION_FILE_COUNT:\n4/u);
  assert.match(docsText, /VALIDATOR_HELPER_PATH_LIVE_ABSENCE_TRANSITION_COUNT:\n2/u);
  for (const alignedPath of alignedTestPaths) {
    assert.equal(docsText.includes("`" + alignedPath + "`"), true, alignedPath);
  }
  for (const helperPath of historicalHelperPaths) {
    assert.equal(docsText.includes("`" + helperPath + "`"), true, helperPath);
  }
});

test("aligned proofs no longer enforce live helper filesystem absence", () => {
  const docsText = readRequired(docsPath);

  for (const alignedPath of alignedTestPaths) {
    const testText = readRequired(alignedPath);
    assert.equal(testText.includes("retainedAbsentFuturePaths"), false, alignedPath);
    assert.equal(
      testText.includes("validatorHelperProofTransitionRelativePath"),
      true,
      alignedPath,
    );
    assert.match(testText, /VALIDATOR_HELPER_PATH_LIVE_ABSENCE_TRANSITION_COUNT/u);
  }

  assert.match(docsText, /remove only two live filesystem-absence loops/u);
  assert.match(docsText, /historical absence markers and counts remain present/u);
});

test("historical denials stay documented while retained siblings remain absent", () => {
  const docsText = readRequired(docsPath);
  const packageSchemas = require("../packages/schemas/src/index.js");
  const packageIndexText = readRequired("packages/schemas/src/index.js");
  const validatorModule = require("../packages/schemas/src/human-review-source-register-validator.js");

  for (const deniedExport of historicalPackageDenials) {
    assert.equal(docsText.includes("- `" + deniedExport + "`"), true, deniedExport);
  }
  for (const deniedExport of retainedPackageDenials) {
    assert.equal(Object.hasOwn(packageSchemas, deniedExport), false, deniedExport);
  }
  assert.strictEqual(
    packageSchemas.validateHumanReviewSourceRegister,
    validatorModule.validateHumanReviewSourceRegister,
  );
  assert.equal((packageIndexText.match(/\n/gu) ?? []).length, 13165);
  assert.match(docsText, /PACKAGE_INDEX_BASELINE_LINE_COUNT:\n13165/u);
});

test("later helper remains a separate exact two-file slice", () => {
  const docsText = readRequired(docsPath);

  assert.match(docsText, /one separate `RUNTIME_CHANGE`\nslice may create exactly/u);
  for (const helperPath of historicalHelperPaths) {
    assert.equal(docsText.includes("- `" + helperPath + "`"), true, helperPath);
  }
  assert.match(docsText, /seven-phase algorithm/u);
  assert.match(docsText, /package-index non-interference/u);
});

test("transition preserves non-implementation and no-conclusion boundaries", () => {
  const docsText = readRequired(docsPath);

  for (const marker of [
    "HISTORICAL_VALIDATOR_HELPER_ABSENCE_MARKERS_PRESERVED",
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

  assert.match(docsText, /Human\/professional\nreview remains the release gate/u);
  assert.match(docsText, /not actual human review[\s\S]*real-evidence review/u);
});
