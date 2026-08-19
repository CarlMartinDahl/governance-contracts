"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const packageSchemas = require("../packages/schemas/src/index.js");

const repoRoot = path.join(__dirname, "..");
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_VALIDATOR_HELPER_SCAFFOLD_SCOPE_BOUNDARY_v1.md";
const proofPath =
  "tests/domain-human-review-controlled-handoff-human-professional-approval-validator-helper-scaffold-scope-boundary-doc-freeze.test.js";
const controllingPaths = [
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_VALIDATOR_HELPER_READINESS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_CONTRACT_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_VALIDATOR_ERROR_PATH_SEMANTICS_BOUNDARY_v1.md",
  "schemas/human-review-controlled-handoff-human-professional-approval.json",
  "schemas/human-review-controlled-handoff-human-professional-approval-validator-result.json",
  "packages/schemas/src/human-review-controlled-handoff-brief-validator.js",
  "tests/human-review-controlled-handoff-brief-validator.test.js",
  "packages/schemas/src/human-review-questions-validator.js",
  "tests/human-review-questions-validator.test.js",
];
const transitionTestPaths = [
  "tests/domain-human-review-controlled-handoff-human-professional-approval-contract-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-package-schema-export-scope-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-schema-hardening-proof-candidate-path-alignment-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-schema-readiness-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-schema-scaffold-proof-self-transition-hardening-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-schema-scaffold-scope-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-validator-error-path-semantics-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-validator-helper-readiness-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-validator-result-package-schema-export-scope-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-validator-result-schema-readiness-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-validator-result-schema-scaffold-scope-boundary-doc-freeze.test.js",
  "tests/human-review-controlled-handoff-human-professional-approval-schema.test.js",
  "tests/human-review-controlled-handoff-human-professional-approval-validator-result-schema.test.js",
];
const prerequisitePaths = [
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-validator-helper-proof-transition-prerequisite-boundary-doc-freeze.test.js",
  ...transitionTestPaths,
];
const futureImplementationPaths = [
  "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-validator.js",
  "tests/human-review-controlled-handoff-human-professional-approval-validator.test.js",
];
const blockedValidatorExports = [
  "humanReviewControlledHandoffHumanProfessionalApprovalValidator",
  "validateHumanReviewControlledHandoffHumanProfessionalApproval",
  "getHumanReviewControlledHandoffHumanProfessionalApprovalValidator",
  "humanReviewControlledHandoffHumanProfessionalApprovalValidatorRegistry",
];

function absolute(relativePath) {
  return path.join(repoRoot, relativePath);
}

function readRequired(relativePath) {
  assert.equal(fs.existsSync(absolute(relativePath)), true, `expected ${relativePath}`);
  return fs.readFileSync(absolute(relativePath), "utf8");
}

function sectionBetween(text, start, end) {
  const startIndex = text.indexOf(start);
  const endIndex = text.indexOf(end, startIndex + start.length);
  assert.notEqual(startIndex, -1, start);
  assert.notEqual(endIndex, -1, end);
  return text.slice(startIndex, endIndex);
}

test("approval validator-helper scaffold scope and controlling sources are exact", () => {
  const docsText = readRequired(docsPath);

  for (const sourcePath of controllingPaths) {
    readRequired(sourcePath);
    assert.equal(docsText.includes("`" + sourcePath + "`"), true, sourcePath);
  }
  for (const marker of [
    "HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_VALIDATOR_HELPER_SCAFFOLD_SCOPE_BOUNDARY",
    "DOCS_ONLY",
    "APPEND_ONLY_VALIDATOR_HELPER_SCOPE",
    "EIGHT_SCOPE_DECISIONS_RESOLVED",
  ]) {
    assert.equal(docsText.includes(marker), true, marker);
  }
});

test("internal module and one unary module export are exact", () => {
  const docsText = readRequired(docsPath);

  assert.match(
    docsText,
    /`packages\/schemas\/src\/human-review-controlled-handoff-human-professional-approval-validator\.js`/u,
  );
  assert.match(
    docsText,
    /`validateHumanReviewControlledHandoffHumanProfessionalApproval`/u,
  );
  assert.match(docsText, /FUTURE_VALIDATOR_MODULE_EXPORT_COUNT:\n1/u);
  assert.match(docsText, /FUTURE_VALIDATOR_FUNCTION_ARITY:\n1/u);
  assert.match(docsText, /function is not a public\npackage-index export/u);
  for (const blockedExport of blockedValidatorExports) {
    assert.equal(Object.hasOwn(packageSchemas, blockedExport), false, blockedExport);
  }
});

test("two tracked JSON schemas remain the exact machine sources", () => {
  const docsText = readRequired(docsPath);

  assert.match(
    docsText,
    /`\.\.\/\.\.\/\.\.\/schemas\/human-review-controlled-handoff-human-professional-approval\.json`/u,
  );
  assert.match(
    docsText,
    /`\.\.\/\.\.\/\.\.\/schemas\/human-review-controlled-handoff-human-professional-approval-validator-result\.json`/u,
  );
  assert.match(docsText, /direct descriptor-safe implementation/u);
  assert.match(docsText, /not a generic JSON Schema engine/u);
});

test("future algorithm preserves the exact seven phases and result boundary", () => {
  const docsText = readRequired(docsPath);
  const algorithm = sectionBetween(
    docsText,
    "## 7. Exact Future Validation Algorithm",
    "## 8.",
  );

  assert.match(algorithm, /### Root Plain-Object Preflight/u);
  for (let phase = 1; phase <= 7; phase += 1) {
    assert.match(algorithm, new RegExp(`### Phase ${phase}:`, "u"));
  }
  assert.match(docsText, /FUTURE_VALIDATOR_PHASE_COUNT:\n7/u);
  for (const marker of [
    "descriptor",
    "never invoke getters or setters",
    "invalid_cross_field_combination",
    "duplicate_reference",
    "invalid items do not establish or match a duplicate value",
    "recursively freeze",
  ]) {
    assert.equal(algorithm.includes(marker), true, marker);
  }
});

test("proof transition and implementation scopes are exact and separate", () => {
  const docsText = readRequired(docsPath);

  assert.equal(prerequisitePaths.length, 15);
  for (const prerequisitePath of prerequisitePaths) {
    assert.equal(docsText.includes("`" + prerequisitePath + "`"), true, prerequisitePath);
  }
  assert.match(docsText, /PROOF_TRANSITION_PREREQUISITE_FILE_COUNT:\n15/u);

  assert.equal(futureImplementationPaths.length, 2);
  for (const futurePath of futureImplementationPaths) {
    assert.equal(docsText.includes("`" + futurePath + "`"), true, futurePath);
  }
  assert.match(docsText, /FUTURE_VALIDATOR_HELPER_IMPLEMENTATION_FILE_COUNT:\n2/u);
  assert.match(docsText, /implementation slice must not modify any existing file/u);
});

test("only twenty-six audited live absence assertions may transition", () => {
  const docsText = readRequired(docsPath);
  const proofText = readRequired(proofPath);

  assert.equal(transitionTestPaths.length, 13);
  for (const transitionPath of transitionTestPaths) {
    const transitionText = readRequired(transitionPath);
    for (const futurePath of futureImplementationPaths) {
      assert.equal(
        transitionText.split('"' + futurePath + '"').length - 1,
        1,
        `${transitionPath}: ${futurePath}`,
      );
    }
    assert.match(transitionText, /fs\.existsSync/u);
  }
  assert.match(
    docsText,
    /LIVE_HELPER_PATH_ABSENCE_ASSERTION_TRANSITION_COUNT:\n26/u,
  );
  assert.match(docsText, /Historical docs, reserved paths,\nstatus markers/u);
  assert.match(docsText, /all package-export denial\ntests remain correct and unchanged/u);
  const liveAbsenceCall = "fs." + "existsSync(absolute(futurePath))";
  assert.equal(
    proofText.includes(liveAbsenceCall),
    false,
  );
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
  const decisions = sectionBetween(
    docsText,
    "## 12. Resolved Readiness Decisions",
    "## 13.",
  );
  const scope = sectionBetween(docsText, "## 13. Exact Current Scope", "## 14.");

  assert.equal((decisions.match(/^\| \d+ \|/gmu) ?? []).length, 8);
  assert.match(docsText, /RESOLVED_VALIDATOR_HELPER_SCOPE_DECISION_COUNT:\n8/u);
  assert.match(scope, /CURRENT_VALIDATOR_HELPER_SCAFFOLD_SCOPE_FILE_COUNT:\n2/u);
  for (const currentPath of [docsPath, proofPath]) {
    assert.equal(scope.includes("`" + currentPath + "`"), true, currentPath);
    readRequired(currentPath);
  }
  for (const marker of [
    "VALIDATOR_NOT_CREATED_BY_THIS_SLICE",
    "VALIDATION_EXECUTION_NOT_CREATED_BY_THIS_SLICE",
    "PACKAGE_EXPORT_NOT_CREATED",
    "VALIDATOR_DISPATCH_NOT_CHANGED",
    "CROSS_REFERENCE_ADMISSIBILITY_CHECKPOINT_NOT_CREATED",
    "REVIEWER_AUTHORITY_RESOLUTION_NOT_CREATED",
    "APPROVAL_EFFECT_NOT_CREATED",
    "HANDOFF_DELIVERY_OR_RELEASE_NOT_CREATED",
    "PERSISTENCE_API_SOURCE_PROVIDER_MODEL_INTEGRATION_NOT_CREATED",
    "NO_SOURCE_ACQUISITION_OR_CONTENT_INSPECTION_CREATED",
    "NO_DOMAIN_FINDING_SCORE_OR_CONCLUSION_CREATED",
    "NO_APPROVAL_OR_RELEASE_PRODUCT_IMPLEMENTATION_READINESS_CREATED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "TRACKED_DOCS_ONLY_INTERNAL_VALIDATOR_HELPER_SCOPE_DEFINED",
  ]) {
    assert.equal(docsText.includes(marker), true, marker);
  }
  assert.match(docsText, /not actual human review[\s\S]*real-evidence review/u);
});
