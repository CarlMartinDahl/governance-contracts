"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.join(__dirname, "..");
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_VALIDATOR_HELPER_PACKAGE_EXPORT_READINESS_BOUNDARY_v1.md";
const helperPath =
  "packages/schemas/src/human-review-source-register-validator.js";
const controllingPaths = [
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_VALIDATOR_HELPER_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
  "schemas/human-review-source-register.json",
  "schemas/human-review-source-register-validator-result.json",
  helperPath,
  "tests/human-review-source-register-validator.test.js",
  "packages/schemas/src/index.js",
];
const denialProofPaths = [
  "tests/human-review-source-register-package-export.test.js",
  "tests/human-review-source-register-validator-result-package-export.test.js",
  "tests/human-review-source-register-validator-result-schema.test.js",
  "tests/domain-human-review-source-register-validator-helper-readiness-boundary-doc-freeze.test.js",
  "tests/domain-human-review-source-register-validator-helper-proof-transition-prerequisite-boundary-doc-freeze.test.js",
  "tests/human-review-source-register-validator.test.js",
];
const currentSchemaExports = [
  "humanReviewSourceRegister",
  "humanReviewSourceRegisterValidatorResult",
];
const historicalBehaviorExports = [
  "validateHumanReviewSourceRegister",
  "humanReviewSourceRegisterValidator",
  "getHumanReviewSourceRegisterValidator",
  "humanReviewSourceRegisterValidatorRegistry",
];
const retainedBehaviorExports = historicalBehaviorExports.filter(
  (exportName) => exportName !== "validateHumanReviewSourceRegister",
);

function readRequired(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  assert.equal(fs.existsSync(absolutePath), true, `expected ${relativePath}`);
  return fs.readFileSync(absolutePath, "utf8");
}

test("Source Register validator package-export readiness boundary and sources exist", () => {
  const docsText = readRequired(docsPath);

  for (const sourcePath of [...controllingPaths, ...denialProofPaths]) {
    readRequired(sourcePath);
    assert.equal(docsText.includes("`" + sourcePath + "`"), true, sourcePath);
  }

  assert.match(
    docsText,
    /HUMAN_REVIEW_SOURCE_REGISTER_VALIDATOR_HELPER_PACKAGE_EXPORT_READINESS_BOUNDARY/u,
  );
  assert.match(docsText, /PROVE_ONLY_FINDINGS_CAPTURED_AS_DOCS_ONLY/u);
  assert.match(docsText, /APPEND_ONLY_PACKAGE_EXPORT_READINESS_ASSESSMENT/u);
});

test("ten current package-export readiness facts are tracked without conclusions", () => {
  const docsText = readRequired(docsPath);
  const helperModule = require("../packages/schemas/src/human-review-source-register-validator.js");
  const section = docsText.slice(
    docsText.indexOf("## 3. Current Tracked Facts"),
    docsText.indexOf("## 4."),
  );

  assert.equal((section.match(/^\| \d+ \|/gmu) ?? []).length, 10);
  assert.match(docsText, /CURRENT_PACKAGE_EXPORT_READINESS_FACT_COUNT:\n10/u);
  assert.deepEqual(Object.keys(helperModule), [
    "validateHumanReviewSourceRegister",
  ]);
  assert.equal(helperModule.validateHumanReviewSourceRegister.length, 1);
  assert.match(section, /no runtime consumer, registry, dispatch, persistence, API/u);
  assert.match(section, /accessor-safe, immutability, and result-contract cases/u);
});

test("schema exports and historical absence remain documented while the package validator is reference-equal", () => {
  const docsText = readRequired(docsPath);
  const packageSchemas = require("../packages/schemas/src/index.js");
  const packageIndexText = readRequired("packages/schemas/src/index.js");
  const validatorModule = require("../packages/schemas/src/human-review-source-register-validator.js");

  for (const exportName of currentSchemaExports) {
    assert.equal(Object.hasOwn(packageSchemas, exportName), true, exportName);
    assert.equal(docsText.includes("- `" + exportName + "`"), true, exportName);
  }
  for (const exportName of historicalBehaviorExports) {
    assert.equal(docsText.includes("- `" + exportName + "`"), true, exportName);
  }
  for (const exportName of retainedBehaviorExports) {
    assert.equal(Object.hasOwn(packageSchemas, exportName), false, exportName);
  }
  assert.strictEqual(
    packageSchemas.validateHumanReviewSourceRegister,
    validatorModule.validateHumanReviewSourceRegister,
  );

  assert.equal((packageIndexText.match(/\n/gu) ?? []).length, 13165);
  assert.match(docsText, /PACKAGE_INDEX_BASELINE_LINE_COUNT:\n13165/u);
});

test("six package-export denial proofs remain documented as the readiness snapshot", () => {
  const docsText = readRequired(docsPath);

  assert.equal(denialProofPaths.length, 6);
  for (const denialPath of denialProofPaths) {
    readRequired(denialPath);
    assert.equal(docsText.includes("`" + denialPath + "`"), true, denialPath);
  }

  assert.match(docsText, /CURRENT_PACKAGE_EXPORT_DENIAL_PROOF_COUNT:\n6/u);
  assert.match(docsText, /Historical docs remain unchanged/u);
});

test("readiness remains blocked by seven exact package-export decisions", () => {
  const docsText = readRequired(docsPath);
  const section = docsText.slice(
    docsText.indexOf("## 7. Seven Open Package-Export Scope Decisions"),
    docsText.indexOf("## 8."),
  );

  assert.match(
    docsText,
    /VALIDATOR_HELPER_PACKAGE_EXPORT_READINESS:\nBLOCKED_BY_EXACT_SCOPE_DECISIONS/u,
  );
  assert.equal((section.match(/^\| \d+ \|/gmu) ?? []).length, 7);
  assert.match(docsText, /OPEN_VALIDATOR_HELPER_PACKAGE_EXPORT_SCOPE_DECISION_COUNT:\n7/u);
  assert.match(section, /publish or remain internal/u);
  assert.match(section, /exact package symbol and reference identity/u);
  assert.match(section, /exact denial-proof transitions/u);
  assert.match(section, /exact downstream exclusion/u);
});

test("smallest safe next slice is one docs-only package-export scaffold", () => {
  const docsText = readRequired(docsPath);

  assert.match(
    docsText,
    /RECOMMENDED_NEXT_SLICE:\nHUMAN_REVIEW_SOURCE_REGISTER_VALIDATOR_HELPER_PACKAGE_EXPORT_SCAFFOLD_SCOPE_BOUNDARY_DOCS_ONLY/u,
  );
  assert.match(docsText, /must not modify the package index/u);
  assert.match(docsText, /freeze a later exact `CONTRACT_ONLY` package-export slice/u);
});

test("readiness slice preserves non-interference and no-conclusion boundaries", () => {
  const docsText = readRequired(docsPath);

  for (const marker of [
    "SIX_CURRENT_PACKAGE_EXPORT_DENIAL_PROOFS_IDENTIFIED",
    "PACKAGE_EXPORT_NOT_IMPLEMENTATION_READY",
    "PACKAGE_INDEX_UNCHANGED_BY_THIS_SLICE",
    "VALIDATOR_DISPATCH_NOT_CHANGED",
    "PERSISTENCE_API_PROVIDER_MODEL_INTEGRATION_NOT_CREATED",
    "NO_REAL_PRIVATE_OR_SOURCE_MATERIAL_INSPECTION_CREATED",
    "NO_DOMAIN_FINDING_SCORE_OR_CONCLUSION_CREATED",
    "NO_APPROVAL_OR_RELEASE_PRODUCT_IMPLEMENTATION_READINESS_CREATED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
  ]) {
    assert.equal(docsText.includes(marker), true, marker);
  }

  assert.match(
    docsText,
    /TRACKED_DOCS_ONLY_PACKAGE_EXPORT_READINESS_BLOCKED_BY_SCOPE_DECISIONS/u,
  );
  assert.match(docsText, /does not prove that a package export is needed/u);
  assert.match(docsText, /chain-of-custody proof/u);
});
