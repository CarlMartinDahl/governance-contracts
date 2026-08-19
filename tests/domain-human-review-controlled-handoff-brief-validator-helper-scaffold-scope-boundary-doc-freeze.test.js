"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_VALIDATOR_HELPER_SCAFFOLD_SCOPE_BOUNDARY_v1.md";
const proofPath =
  "tests/domain-human-review-controlled-handoff-brief-validator-helper-scaffold-scope-boundary-doc-freeze.test.js";
const selfTransitionHardeningPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_VALIDATOR_HELPER_SCAFFOLD_PROOF_SELF_TRANSITION_HARDENING_BOUNDARY_v1.md";
const controllingPaths = [
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_VALIDATOR_HELPER_READINESS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_CONTRACT_BOUNDARY_v1.md",
  "schemas/human-review-controlled-handoff-brief.json",
  "schemas/human-review-controlled-handoff-brief-validator-result.json",
  "packages/schemas/src/human-review-source-register-validator.js",
  "tests/human-review-source-register-validator.test.js",
  "packages/schemas/src/human-review-no-conclusion-notice-validator.js",
  "tests/human-review-no-conclusion-notice-validator.test.js",
];
const transitionTestPaths = [
  "tests/human-review-controlled-handoff-brief-schema.test.js",
  "tests/domain-human-review-controlled-handoff-brief-contract-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-brief-schema-scaffold-scope-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-brief-validator-result-schema-readiness-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-brief-validator-result-schema-scaffold-scope-boundary-doc-freeze.test.js",
  "tests/human-review-controlled-handoff-brief-validator-result-schema.test.js",
  "tests/domain-human-review-controlled-handoff-brief-validator-result-package-schema-export-scope-boundary-doc-freeze.test.js",
  "tests/human-review-controlled-handoff-brief-validator-result-package-export.test.js",
  "tests/domain-human-review-controlled-handoff-brief-validator-helper-readiness-boundary-doc-freeze.test.js",
];
const prerequisitePaths = [
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
  "tests/domain-human-review-controlled-handoff-brief-validator-helper-proof-transition-prerequisite-boundary-doc-freeze.test.js",
  ...transitionTestPaths,
];
const futureImplementationPaths = [
  "packages/schemas/src/human-review-controlled-handoff-brief-validator.js",
  "tests/human-review-controlled-handoff-brief-validator.test.js",
];

function absolute(relativePath) {
  return path.join(repoRoot, relativePath);
}

function readRequired(relativePath) {
  assert.equal(fs.existsSync(absolute(relativePath)), true, `expected ${relativePath}`);
  return fs.readFileSync(absolute(relativePath), "utf8");
}

test("validator-helper scaffold scope and controlling sources exist", () => {
  const docsText = readRequired(docsPath);

  for (const sourcePath of controllingPaths) {
    readRequired(sourcePath);
    assert.equal(docsText.includes("`" + sourcePath + "`"), true, sourcePath);
  }
  assert.match(
    docsText,
    /HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_VALIDATOR_HELPER_SCAFFOLD_SCOPE_BOUNDARY/u,
  );
  assert.match(docsText, /DOCS_ONLY/u);
  assert.match(docsText, /APPEND_ONLY_VALIDATOR_HELPER_SCOPE/u);
});

test("internal module and one unary module export are exact", () => {
  const docsText = readRequired(docsPath);
  const packageSchemas = require("../packages/schemas/src/index.js");

  assert.match(
    docsText,
    /`packages\/schemas\/src\/human-review-controlled-handoff-brief-validator\.js`/u,
  );
  assert.match(docsText, /`validateHumanReviewControlledHandoffBrief`/u);
  assert.match(docsText, /FUTURE_VALIDATOR_MODULE_EXPORT_COUNT:\n1/u);
  assert.match(docsText, /FUTURE_VALIDATOR_FUNCTION_ARITY:\n1/u);
  assert.match(docsText, /function is not a public\npackage-index export/u);
  assert.equal(
    Object.hasOwn(packageSchemas, "validateHumanReviewControlledHandoffBrief"),
    false,
  );
});

test("two tracked JSON schemas remain the exact machine sources", () => {
  const docsText = readRequired(docsPath);

  assert.match(
    docsText,
    /`\.\.\/\.\.\/\.\.\/schemas\/human-review-controlled-handoff-brief\.json`/u,
  );
  assert.match(
    docsText,
    /`\.\.\/\.\.\/\.\.\/schemas\/human-review-controlled-handoff-brief-validator-result\.json`/u,
  );
  assert.match(docsText, /direct descriptor-safe implementation/u);
  assert.match(docsText, /not a generic JSON Schema engine/u);
});

test("future algorithm preserves the exact ten stages", () => {
  const docsText = readRequired(docsPath);
  const algorithm = docsText.slice(
    docsText.indexOf("## 7. Exact Future Validation Algorithm"),
    docsText.indexOf("## 8."),
  );

  for (let stage = 1; stage <= 10; stage += 1) {
    assert.match(algorithm, new RegExp(`### Stage ${stage}:`, "u"));
  }
  assert.match(docsText, /FUTURE_VALIDATOR_STAGE_COUNT:\n10/u);
  for (const marker of [
    "descriptor-safe",
    "never invoke getters or setters",
    "pairwise",
    "duplicate_component_ref",
    "invalid component values do not participate",
    "recursively freeze",
  ]) {
    assert.equal(algorithm.includes(marker), true, marker);
  }
});

test("proof transition and implementation scopes are exact and separate", () => {
  const docsText = readRequired(docsPath);
  const selfTransitionHardeningText = readRequired(selfTransitionHardeningPath);

  assert.equal(prerequisitePaths.length, 11);
  for (const prerequisitePath of prerequisitePaths) {
    assert.equal(docsText.includes("`" + prerequisitePath + "`"), true, prerequisitePath);
  }
  assert.match(docsText, /PROOF_TRANSITION_PREREQUISITE_FILE_COUNT:\n11/u);

  assert.equal(futureImplementationPaths.length, 2);
  for (const futurePath of futureImplementationPaths) {
    assert.equal(docsText.includes("`" + futurePath + "`"), true, futurePath);
    assert.equal(
      selfTransitionHardeningText.includes("`" + futurePath + "`"),
      true,
      futurePath,
    );
  }
  assert.match(
    selfTransitionHardeningText,
    /SCAFFOLD_PROOF_SELF_CREATED_LIVE_ABSENCE_TRANSITION_COUNT:\n2/u,
  );
  assert.match(
    selfTransitionHardeningText,
    /TRACKED_DOCS_ONLY_SCAFFOLD_PROOF_SELF_TRANSITION_HARDENING_COMPLETE/u,
  );
  assert.match(docsText, /FUTURE_VALIDATOR_HELPER_IMPLEMENTATION_FILE_COUNT:\n2/u);
  assert.match(docsText, /implementation slice must not modify any existing file/u);
});

test("only eighteen audited live absence assertions may transition", () => {
  const docsText = readRequired(docsPath);

  assert.equal(transitionTestPaths.length, 9);
  for (const transitionPath of transitionTestPaths) {
    const transitionText = readRequired(transitionPath);
    for (const futurePath of futureImplementationPaths) {
      assert.equal(transitionText.includes('"' + futurePath + '"'), true, transitionPath);
    }
    assert.match(transitionText, /fs\.existsSync/u);
  }
  assert.match(
    docsText,
    /LIVE_HELPER_PATH_ABSENCE_ASSERTION_TRANSITION_COUNT:\n18/u,
  );
  assert.match(docsText, /Historical docs, reserved paths, status\nmarkers/u);
  assert.match(docsText, /all package-export denial\ntests remain correct and unchanged/u);
});

test("package index remains unchanged at its tracked line count", () => {
  const docsText = readRequired(docsPath);
  const packageIndexText = readRequired("packages/schemas/src/index.js");

  assert.equal((packageIndexText.match(/\n/gu) ?? []).length, 13165);
  assert.match(docsText, /PACKAGE_INDEX_BASELINE_LINE_COUNT:\n13165/u);
  assert.match(docsText, /public package surface remain byte-for-byte outside/u);
});

test("all eight decisions and current two-file scope remain non-authorizing", () => {
  const docsText = readRequired(docsPath);
  const decisions = docsText.slice(
    docsText.indexOf("## 12. Resolved Readiness Decisions"),
    docsText.indexOf("## 13."),
  );

  assert.equal((decisions.match(/^\| \d+ \|/gmu) ?? []).length, 8);
  assert.match(docsText, /RESOLVED_VALIDATOR_HELPER_SCOPE_DECISION_COUNT:\n8/u);
  assert.match(docsText, /CURRENT_VALIDATOR_HELPER_SCAFFOLD_SCOPE_FILE_COUNT:\n2/u);
  for (const currentPath of [docsPath, proofPath]) {
    assert.equal(docsText.includes("`" + currentPath + "`"), true, currentPath);
    readRequired(currentPath);
  }
  for (const marker of [
    "VALIDATOR_NOT_CREATED_BY_THIS_SLICE",
    "VALIDATION_EXECUTION_NOT_CREATED_BY_THIS_SLICE",
    "PACKAGE_EXPORT_NOT_CREATED",
    "VALIDATOR_DISPATCH_NOT_CHANGED",
    "CROSS_REFERENCE_CHECKPOINT_NOT_CREATED",
    "COMPONENT_ASSEMBLY_NOT_CREATED",
    "HUMAN_REVIEW_OR_APPROVAL_NOT_CREATED",
    "DELIVERY_OR_RELEASE_NOT_CREATED",
    "PERSISTENCE_API_SOURCE_PROVIDER_MODEL_INTEGRATION_NOT_CREATED",
    "NO_SOURCE_ACQUISITION_OR_CONTENT_INSPECTION_CREATED",
    "NO_DOMAIN_FINDING_SCORE_OR_CONCLUSION_CREATED",
    "NO_APPROVAL_OR_RELEASE_PRODUCT_IMPLEMENTATION_READINESS_CREATED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "TRACKED_DOCS_ONLY_INTERNAL_VALIDATOR_HELPER_SCOPE_DEFINED",
  ]) {
    assert.match(docsText, new RegExp(marker, "u"));
  }
  assert.match(docsText, /not actual human review[\s\S]*real-evidence review/u);
});
