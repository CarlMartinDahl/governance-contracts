"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const packageSchemas = require("../packages/schemas/src/index.js");

const repoRoot = path.join(__dirname, "..");
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_VALIDATOR_HELPER_READINESS_BOUNDARY_v1.md";
const proofPath =
  "tests/domain-human-review-controlled-handoff-human-professional-approval-validator-helper-readiness-boundary-doc-freeze.test.js";
const contractPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_CONTRACT_BOUNDARY_v1.md";
const semanticsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_VALIDATOR_ERROR_PATH_SEMANTICS_BOUNDARY_v1.md";
const candidateSchemaPath =
  "schemas/human-review-controlled-handoff-human-professional-approval.json";
const resultSchemaPath =
  "schemas/human-review-controlled-handoff-human-professional-approval-validator-result.json";
const candidateProofPath =
  "tests/human-review-controlled-handoff-human-professional-approval-schema.test.js";
const resultProofPath =
  "tests/human-review-controlled-handoff-human-professional-approval-validator-result-schema.test.js";
const candidateExportProofPath =
  "tests/human-review-controlled-handoff-human-professional-approval-package-export.test.js";
const resultExportProofPath =
  "tests/human-review-controlled-handoff-human-professional-approval-validator-result-package-export.test.js";
const packageIndexPath = "packages/schemas/src/index.js";
const validatorPath =
  "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-validator.js";
const validatorProofPath =
  "tests/human-review-controlled-handoff-human-professional-approval-validator.test.js";
const candidateExportName =
  "humanReviewControlledHandoffHumanProfessionalApproval";
const resultExportName =
  "humanReviewControlledHandoffHumanProfessionalApprovalValidatorResult";
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
  assert.equal(fs.existsSync(absolute(relativePath)), true, relativePath);
  return fs.readFileSync(absolute(relativePath), "utf8");
}

function sectionBetween(text, start, end) {
  const startIndex = text.indexOf(start);
  const endIndex = text.indexOf(end, startIndex + start.length);
  assert.notEqual(startIndex, -1, start);
  assert.notEqual(endIndex, -1, end);
  return text.slice(startIndex, endIndex);
}

test("approval validator-helper readiness sources and boundary are exact", () => {
  const docsText = readRequired(docsPath);
  const sources = [
    contractPath,
    semanticsPath,
    candidateSchemaPath,
    resultSchemaPath,
    candidateProofPath,
    resultProofPath,
    packageIndexPath,
    candidateExportProofPath,
    resultExportProofPath,
  ];

  for (const sourcePath of sources) {
    readRequired(sourcePath);
    assert.equal(docsText.includes("`" + sourcePath + "`"), true, sourcePath);
  }
  for (const marker of [
    "PROVE_ONLY_FINDINGS_CAPTURED_AS_DOCS_ONLY",
    "VALIDATION_CONTRACT_FACTS_COMPLETE",
    "VALIDATOR_HELPER_NOT_IMPLEMENTATION_READY",
    "EIGHT_SCOPE_DECISIONS_OPEN",
  ]) {
    assert.equal(docsText.includes(marker), true, marker);
  }
});

test("eleven concrete facts preserve the selected validation semantics", () => {
  const docsText = readRequired(docsPath);
  const semanticsText = readRequired(semanticsPath);
  const facts = sectionBetween(
    docsText,
    "## 3. Concrete Contract Facts",
    "## 4.",
  );

  assert.match(facts, /CONCRETE_VALIDATION_CONTRACT_FACT_COUNT:\n11/u);
  assert.equal((facts.match(/^\| [a-z]/gmu) ?? []).length, 11);
  assert.match(semanticsText, /OPEN_ERROR_PATH_SEMANTIC_DECISION_COUNT:\n0/u);
  assert.match(semanticsText, /VALIDATOR_ERROR_CODE_COUNT:\n6/u);
  assert.match(semanticsText, /CANONICAL_STATIC_ERROR_PATH_COUNT:\n20/u);
  assert.match(semanticsText, /CANONICAL_INDEXED_PATH_TEMPLATE_COUNT:\n3/u);
  assert.match(semanticsText, /CANONICAL_VALIDATION_PHASE_COUNT:\n7/u);
});

test("static schemas are exported while validator surfaces remain absent", () => {
  const docsText = readRequired(docsPath);
  const candidateSchema = require("../" + candidateSchemaPath);
  const resultSchema = require("../" + resultSchemaPath);
  const indexText = readRequired(packageIndexPath);

  assert.strictEqual(packageSchemas[candidateExportName], candidateSchema);
  assert.strictEqual(packageSchemas[resultExportName], resultSchema);
  assert.equal(indexText.split("\n").length - 1, 13165);
  for (const blockedExport of blockedValidatorExports) {
    assert.equal(Object.hasOwn(packageSchemas, blockedExport), false, blockedExport);
    assert.equal(docsText.includes("`" + blockedExport + "`"), true, blockedExport);
  }
  const validatorHelperProofTransitionText = readRequired(
    "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
  );
  for (const absentPath of [validatorPath, validatorProofPath]) {
    assert.equal(
      validatorHelperProofTransitionText.includes("`" + absentPath + "`"),
      true,
      absentPath,
    );
    assert.equal(docsText.includes("`" + absentPath + "`"), true, absentPath);
  }
});

test("readiness is blocked by exactly eight open scope decisions", () => {
  const docsText = readRequired(docsPath);
  const matrix = sectionBetween(docsText, "## 5. Readiness Matrix", "## 6.");
  const decisions = sectionBetween(
    docsText,
    "## 6. Eight Open Scope Decisions",
    "## 7.",
  );

  assert.equal((matrix.match(/`YES_TRACKED`/gu) ?? []).length, 4);
  assert.equal((matrix.match(/`NO_OPEN`/gu) ?? []).length, 8);
  assert.match(matrix, /VALIDATOR_HELPER_READINESS:\nBLOCKED_BY_EXACT_SCOPE_DECISIONS/u);
  assert.equal((decisions.match(/^\| \d+ \|/gmu) ?? []).length, 8);
  assert.match(decisions, /OPEN_VALIDATOR_HELPER_SCOPE_DECISION_COUNT:\n8/u);
  assert.match(
    docsText,
    /RECOMMENDED_NEXT_SLICE:\nHUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_VALIDATOR_HELPER_SCAFFOLD_SCOPE_BOUNDARY_DOCS_ONLY/u,
  );
});

test("readiness scope is exact docs-only and creates no authorization", () => {
  const docsText = readRequired(docsPath);
  const scope = sectionBetween(docsText, "## 8. Exact Current Scope", "## 9.");

  assert.match(scope, /CURRENT_VALIDATOR_HELPER_READINESS_FILE_COUNT:\n2/u);
  for (const currentPath of [docsPath, proofPath]) {
    assert.equal(scope.includes("`" + currentPath + "`"), true, currentPath);
    readRequired(currentPath);
  }
  for (const marker of [
    "VALIDATOR_NOT_CREATED",
    "VALIDATOR_EXPORT_NOT_CREATED",
    "VALIDATION_EXECUTION_NOT_CREATED",
    "APPROVAL_EFFECT_NOT_CREATED",
    "HANDOFF_DELIVERY_OR_RELEASE_NOT_CREATED",
    "NO_RUNTIME_BEHAVIOR_CREATED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "TRACKED_DOCS_ONLY_VALIDATOR_HELPER_READINESS_BLOCKED_BY_SCOPE_DECISIONS",
  ]) {
    assert.equal(docsText.includes(marker), true, marker);
  }
});
