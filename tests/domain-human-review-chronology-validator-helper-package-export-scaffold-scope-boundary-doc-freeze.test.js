"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.join(__dirname, "..");
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_VALIDATOR_HELPER_PACKAGE_EXPORT_SCAFFOLD_SCOPE_BOUNDARY_v1.md";
const readinessPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_VALIDATOR_HELPER_PACKAGE_EXPORT_READINESS_BOUNDARY_v1.md";
const helperPath =
  "packages/schemas/src/human-review-chronology-validator.js";
const transitionPaths = [
  "tests/human-review-chronology-package-export.test.js",
  "tests/human-review-chronology-validator-result-package-export.test.js",
  "tests/human-review-chronology-validator-result-schema.test.js",
  "tests/domain-human-review-chronology-validator-helper-readiness-boundary-doc-freeze.test.js",
  "tests/domain-human-review-chronology-validator-helper-proof-transition-prerequisite-boundary-doc-freeze.test.js",
  "tests/human-review-chronology-validator.test.js",
  "tests/domain-human-review-chronology-validator-helper-package-export-readiness-boundary-doc-freeze.test.js",
  "tests/domain-human-review-chronology-validator-helper-package-export-scaffold-scope-boundary-doc-freeze.test.js",
];
const futurePaths = [
  "packages/schemas/src/index.js",
  ...transitionPaths,
  "tests/human-review-chronology-validator-package-export.test.js",
];
const retainedSiblingDenials = [
  "humanReviewChronologyValidator",
  "getHumanReviewChronologyValidator",
  "humanReviewChronologyValidatorRegistry",
];

function readRequired(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  assert.equal(fs.existsSync(absolutePath), true, `expected ${relativePath}`);
  return fs.readFileSync(absolutePath, "utf8");
}

test("Chronology validator package-export scaffold and sources exist", () => {
  const docsText = readRequired(docsPath);

  for (const sourcePath of [readinessPath, helperPath, ...transitionPaths]) {
    readRequired(sourcePath);
    assert.equal(docsText.includes("`" + sourcePath + "`"), true, sourcePath);
  }

  assert.match(
    docsText,
    /HUMAN_REVIEW_CHRONOLOGY_VALIDATOR_HELPER_PACKAGE_EXPORT_SCAFFOLD_SCOPE_BOUNDARY/u,
  );
  assert.match(docsText, /DOCS_ONLY/u);
  assert.match(docsText, /APPEND_ONLY_PACKAGE_EXPORT_SCOPE/u);
});

test("exact reference-equivalent unary package export is frozen", () => {
  const docsText = readRequired(docsPath);
  const helperModule = require("../packages/schemas/src/human-review-chronology-validator.js");

  assert.deepEqual(Object.keys(helperModule), ["validateHumanReviewChronology"]);
  assert.equal(helperModule.validateHumanReviewChronology.length, 1);
  assert.match(docsText, /`validateHumanReviewChronology`/u);
  assert.match(docsText, /strictly reference-equal/u);
  assert.match(docsText, /FUTURE_PACKAGE_VALIDATOR_EXPORT_COUNT:\n1/u);
  assert.match(docsText, /FUTURE_PACKAGE_VALIDATOR_FUNCTION_ARITY:\n1/u);
  assert.match(
    docsText,
    /must not\ncreate a wrapper, adapter, alias, getter, factory/u,
  );
});

test("two exact same-line package-index edits preserve the baseline", () => {
  const docsText = readRequired(docsPath);
  const packageIndexText = readRequired("packages/schemas/src/index.js");

  assert.equal((packageIndexText.match(/\n/gu) ?? []).length, 13165);
  assert.match(docsText, /PACKAGE_INDEX_BASELINE_LINE_COUNT:\n13165/u);
  assert.match(docsText, /exactly two additive same-line edits/u);
  assert.match(docsText, /`\.\/human-review-chronology-validator\.js`/u);
  assert.match(
    docsText,
    /`module\.exports\.validateHumanReviewChronology = validateHumanReviewChronology`/u,
  );
  assert.match(
    docsText,
    /FUTURE_PACKAGE_INDEX_VALIDATOR_SYMBOL_OCCURRENCE_COUNT:\n3/u,
  );
});

test("eight exact denial-proof transitions retain three sibling denials", () => {
  const docsText = readRequired(docsPath);
  const section = docsText.slice(
    docsText.indexOf("## 6. Decision 4: Exact Eight Denial-Proof Transitions"),
    docsText.indexOf("## 7."),
  );

  assert.equal(transitionPaths.length, 8);
  assert.equal((section.match(/^\| \d+ \|/gmu) ?? []).length, 8);
  for (const transitionPath of transitionPaths) {
    assert.equal(section.includes("`" + transitionPath + "`"), true, transitionPath);
  }
  assert.match(
    docsText,
    /FUTURE_PACKAGE_EXPORT_DENIAL_TRANSITION_COUNT:\n8/u,
  );

  for (const denial of retainedSiblingDenials) {
    assert.equal(docsText.includes("- `" + denial + "`"), true, denial);
  }
  assert.match(
    docsText,
    /RETAINED_PACKAGE_BEHAVIOR_SIBLING_DENIAL_COUNT:\n3/u,
  );
});

test("future package-export implementation is exactly ten valid files", () => {
  const docsText = readRequired(docsPath);
  const section = docsText.slice(
    docsText.indexOf("## 8. Decision 5: Exact Future Ten-File Scope"),
    docsText.indexOf("## 9."),
  );

  assert.equal(futurePaths.length, 10);
  assert.equal((section.match(/^\| (?:[1-9]|10) \|/gmu) ?? []).length, 10);
  for (const futurePath of futurePaths) {
    assert.equal(section.includes("`" + futurePath + "`"), true, futurePath);
  }
  assert.match(docsText, /FUTURE_PACKAGE_EXPORT_FILE_COUNT:\n10/u);
  assert.match(docsText, /must not modify the helper module, either JSON schema/u);
});

test("future proof claims and downstream exclusions remain bounded", () => {
  const docsText = readRequired(docsPath);

  assert.match(docsText, /package export is strictly reference-equal/u);
  assert.match(
    docsText,
    /both existing schema-object exports remain strictly identical/u,
  );
  assert.match(docsText, /all existing validator behavior cases remain green/u);
  assert.match(
    docsText,
    /no consumer, registry, lookup, dispatch, persistence, API/u,
  );
  assert.equal(
    (docsText.match(/`OUT_OF_SCOPE_NOT_AUTHORIZED`/gu) ?? []).length,
    6,
  );
  assert.match(docsText, /source truth, temporal truth, event truth, legal correctness/u);
});

test("all seven readiness decisions are resolved without implementation", () => {
  const docsText = readRequired(docsPath);
  const section = docsText.slice(
    docsText.indexOf("## 11. Resolved Decisions"),
    docsText.indexOf("## 12."),
  );

  assert.equal((section.match(/^\| \d+ \|/gmu) ?? []).length, 7);
  assert.match(
    docsText,
    /RESOLVED_VALIDATOR_HELPER_PACKAGE_EXPORT_SCOPE_DECISION_COUNT:\n7/u,
  );
  assert.match(section, /strict reference equality, no wrapper or alias/u);
  assert.match(section, /exact eight live proof transitions/u);
  assert.match(section, /exact ten files/u);
});

test("scaffold snapshot and live package export preserve exact identity and no-conclusion boundaries", () => {
  const docsText = readRequired(docsPath);
  const packageSchemas = require("../packages/schemas/src/index.js");
  const validatorModule = require("../packages/schemas/src/human-review-chronology-validator.js");

  assert.strictEqual(
    packageSchemas.validateHumanReviewChronology,
    validatorModule.validateHumanReviewChronology,
  );
  for (const marker of [
    "EXACT_TEN_FILE_CONTRACT_ONLY_SCOPE_DEFINED",
    "SCAFFOLD_SELF_DENIAL_COUNTED",
    "PACKAGE_INDEX_UNCHANGED_BY_THIS_SLICE",
    "PACKAGE_EXPORT_NOT_CREATED_BY_THIS_SLICE",
    "VALIDATOR_BEHAVIOR_UNCHANGED",
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
    /TRACKED_DOCS_ONLY_REFERENCE_EQUIVALENT_PACKAGE_EXPORT_SCOPE_DEFINED/u,
  );
  assert.match(docsText, /does not prove that the package export exists/u);
  assert.match(docsText, /chain-of-custody proof/u);
});
