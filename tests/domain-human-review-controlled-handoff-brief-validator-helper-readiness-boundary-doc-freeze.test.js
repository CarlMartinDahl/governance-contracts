"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const fence = String.fromCharCode(96);
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_VALIDATOR_HELPER_READINESS_BOUNDARY_v1.md";
const proofPath =
  "tests/domain-human-review-controlled-handoff-brief-validator-helper-readiness-boundary-doc-freeze.test.js";
const validatorHelperProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const controllingPaths = [
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_CONTRACT_BOUNDARY_v1.md",
  "schemas/human-review-controlled-handoff-brief.json",
  "schemas/human-review-controlled-handoff-brief-validator-result.json",
  "tests/human-review-controlled-handoff-brief-schema.test.js",
  "tests/human-review-controlled-handoff-brief-validator-result-schema.test.js",
  "packages/schemas/src/index.js",
  "tests/human-review-controlled-handoff-brief-package-export.test.js",
  "tests/human-review-controlled-handoff-brief-validator-result-package-export.test.js",
  "packages/schemas/src/human-review-source-register-validator.js",
  "tests/human-review-source-register-validator.test.js",
  "packages/schemas/src/human-review-no-conclusion-notice-validator.js",
  "tests/human-review-no-conclusion-notice-validator.test.js",
];
const schemaExports = [
  "humanReviewControlledHandoffBrief",
  "humanReviewControlledHandoffBriefValidatorResult",
];
const blockedBehaviorExports = [
  "humanReviewControlledHandoffBriefValidator",
  "validateHumanReviewControlledHandoffBrief",
  "getHumanReviewControlledHandoffBriefValidator",
  "humanReviewControlledHandoffBriefValidatorRegistry",
];
const futureHelperPaths = [
  "packages/schemas/src/human-review-controlled-handoff-brief-validator.js",
  "tests/human-review-controlled-handoff-brief-validator.test.js",
];

function absolute(relativePath) {
  return path.join(repoRoot, relativePath);
}

function readRequired(relativePath) {
  assert.equal(fs.existsSync(absolute(relativePath)), true, "expected " + relativePath);
  return fs.readFileSync(absolute(relativePath), "utf8");
}

function section(text, heading, nextHeading) {
  const start = text.indexOf(heading);
  assert.notEqual(start, -1, heading);
  const end = text.indexOf(nextHeading, start + heading.length);
  assert.notEqual(end, -1, nextHeading);
  return text.slice(start, end);
}

test("validator-helper readiness boundary and every source exist", () => {
  const docsText = readRequired(docsPath);

  for (const sourcePath of controllingPaths) {
    readRequired(sourcePath);
    assert.equal(docsText.includes(fence + sourcePath + fence), true, sourcePath);
  }
  assert.match(
    docsText,
    /HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_VALIDATOR_HELPER_READINESS_BOUNDARY/u,
  );
  assert.match(docsText, /PROVE_ONLY_FINDINGS_CAPTURED_AS_DOCS_ONLY/u);
  assert.match(docsText, /APPEND_ONLY_READINESS_ASSESSMENT/u);
});

test("eleven concrete validation facts remain structural and exact", () => {
  const docsText = readRequired(docsPath);
  const facts = section(docsText, "## 3.", "## 4.");

  assert.equal(
    (facts.match(/^\| (?!Surface |---)[^|]+ \| [^|]+ \|$/gmu) ?? []).length,
    11,
  );
  assert.match(docsText, /CONCRETE_VALIDATION_CONTRACT_FACT_COUNT:\n11/u);
  for (const marker of [
    "exact five-field order",
    "exact six-field order",
    "first structurally valid component token wins",
    "exact five codes and twelve canonical paths",
    "exact phases 1 through 10",
    "descriptor-safe inspection",
    "no accessor invocation",
    "deep immutability",
  ]) {
    assert.equal(facts.includes(marker), true, marker);
  }
  assert.match(facts, /structural facts only/u);
});

test("both schema exports exist while package behavior exports remain absent", () => {
  const docsText = readRequired(docsPath);
  const validatorHelperProofTransitionText = readRequired(
    validatorHelperProofTransitionPath,
  );
  const packageSchemas = require("../packages/schemas/src/index.js");

  for (const exportName of schemaExports) {
    assert.equal(Object.hasOwn(packageSchemas, exportName), true, exportName);
    assert.equal(docsText.includes("- " + fence + exportName + fence), true);
  }
  for (const exportName of blockedBehaviorExports) {
    assert.equal(Object.hasOwn(packageSchemas, exportName), false, exportName);
    assert.equal(docsText.includes("- " + fence + exportName + fence), true);
  }
  for (const futurePath of futureHelperPaths) {
    assert.equal(docsText.includes(fence + futurePath + fence), true, futurePath);
    assert.equal(
      validatorHelperProofTransitionText.includes(fence + futurePath + fence),
      true,
      futurePath,
    );
  }
  assert.match(
    validatorHelperProofTransitionText,
    /VALIDATOR_HELPER_PATH_LIVE_ABSENCE_TRANSITION_COUNT:\n18/u,
  );
  assert.match(
    validatorHelperProofTransitionText,
    /TRACKED_DOCS_ONLY_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
});

test("readiness remains blocked only by exact scope decisions", () => {
  const docsText = readRequired(docsPath);
  const matrix = section(docsText, "## 5.", "## 6.");

  assert.match(
    docsText,
    /VALIDATOR_HELPER_READINESS:\nBLOCKED_BY_EXACT_SCOPE_DECISIONS/u,
  );
  assert.match(matrix, /candidate contract concrete \| \x60YES_TRACKED\x60/u);
  assert.match(
    matrix,
    /static schema package exports tracked \| \x60YES_TRACKED\x60/u,
  );
  assert.match(
    matrix,
    /validator module\/package path frozen \| \x60NO_OPEN\x60/u,
  );
  assert.match(
    matrix,
    /exact public helper\/export surface frozen \| \x60NO_OPEN\x60/u,
  );
  assert.match(
    matrix,
    /exact validator\/result-schema conformance proof frozen \| \x60NO_OPEN\x60/u,
  );
});

test("exactly eight validator implementation-scope decisions remain open", () => {
  const docsText = readRequired(docsPath);
  const decisions = section(docsText, "## 6.", "## 7.");

  assert.equal((decisions.match(/^\| \d+ \|/gmu) ?? []).length, 8);
  assert.match(docsText, /OPEN_VALIDATOR_HELPER_SCOPE_DECISION_COUNT:\n8/u);
  for (const marker of [
    "exact package and module path",
    "exact public exports",
    "authoritative component-validation machine sources",
    "helper/schema relationship",
    "exact implementation and proof file set",
    "exact existing-test denial transitions",
    "line-count preservation",
    "validator/result-schema conformance proof",
  ]) {
    assert.equal(decisions.includes(marker), true, marker);
  }
});

test("smallest safe next slice is docs-only scaffold scope", () => {
  const docsText = readRequired(docsPath);

  assert.match(
    docsText,
    /RECOMMENDED_NEXT_SLICE:\nHUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_VALIDATOR_HELPER_SCAFFOLD_SCOPE_BOUNDARY_DOCS_ONLY/u,
  );
  assert.match(docsText, /must not implement or export the validator/u);
});

test("current readiness scope is exact two-file and non-authorizing", () => {
  const docsText = readRequired(docsPath);

  assert.match(docsText, /CURRENT_VALIDATOR_HELPER_READINESS_FILE_COUNT:\n2/u);
  for (const currentPath of [docsPath, proofPath]) {
    assert.equal(docsText.includes(fence + currentPath + fence), true);
    readRequired(currentPath);
  }
  for (const marker of [
    "VALIDATOR_HELPER_NOT_IMPLEMENTATION_READY",
    "EIGHT_SCOPE_DECISIONS_OPEN",
    "VALIDATOR_NOT_CREATED",
    "VALIDATOR_EXPORT_NOT_CREATED",
    "VALIDATOR_DISPATCH_NOT_CHANGED",
    "VALIDATION_EXECUTION_NOT_CREATED",
    "CROSS_REFERENCE_CHECKPOINT_NOT_CREATED",
    "COMPONENT_ASSEMBLY_NOT_CREATED",
    "HUMAN_REVIEW_OR_APPROVAL_NOT_CREATED",
    "DELIVERY_OR_RELEASE_NOT_CREATED",
    "NO_RUNTIME_BEHAVIOR_CREATED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "TRACKED_DOCS_ONLY_VALIDATOR_HELPER_READINESS_BLOCKED_BY_SCOPE_DECISIONS",
  ]) {
    assert.equal(docsText.includes(marker), true, marker);
  }
  assert.match(
    docsText,
    /not actual human\/professional\/legal\/technical[\s\S]*real-evidence review/u,
  );
});
