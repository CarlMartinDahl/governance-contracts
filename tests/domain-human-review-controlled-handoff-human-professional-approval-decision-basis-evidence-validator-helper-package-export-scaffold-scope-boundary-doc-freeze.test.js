"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const packageSchemas = require("../packages/schemas/src/index.js");
const validatorModule = require("../packages/schemas/src/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator.js");

const repoRoot = path.join(__dirname, "..");
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_VALIDATOR_HELPER_PACKAGE_EXPORT_SCAFFOLD_SCOPE_BOUNDARY_v1.md";
const proofPath =
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-helper-package-export-scaffold-scope-boundary-doc-freeze.test.js";
const readinessPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_VALIDATOR_HELPER_PACKAGE_EXPORT_READINESS_BOUNDARY_v1.md";
const packageIndexPath = "packages/schemas/src/index.js";
const validatorHelperExportName =
  "validateHumanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidence";
const retainedValidatorExports = [
  "humanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidenceValidator",
  "getHumanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidenceValidator",
  "humanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidenceValidatorRegistry",
];
const transitionProofPaths = [
  "tests/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-package-export.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-package-schema-export-scope-boundary-doc-freeze.test.js",
  "tests/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-result-package-export.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-result-package-schema-export-scope-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-helper-readiness-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-helper-scaffold-scope-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-helper-proof-transition-prerequisite-boundary-doc-freeze.test.js",
  "tests/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-helper-package-export-readiness-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-helper-package-export-scaffold-scope-boundary-doc-freeze.test.js",
];

function absolute(relativePath) {
  return path.join(repoRoot, relativePath);
}

function readRequired(relativePath) {
  assert.equal(fs.existsSync(absolute(relativePath)), true, relativePath);
  return fs.readFileSync(absolute(relativePath), "utf8");
}

function sectionBetween(text, startHeading, endHeading) {
  const start = text.indexOf(startHeading);
  assert.notEqual(start, -1, startHeading);
  const end = endHeading ? text.indexOf(endHeading, start + startHeading.length) : text.length;
  assert.notEqual(end, -1, endHeading ?? "EOF");
  return text.slice(start, end);
}

function tableLines(sectionText) {
  return sectionText
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("|"));
}

test("package-export scaffold-scope boundary, sources, and markers are exact", () => {
  const docsText = readRequired(docsPath);
  for (const requiredPath of [proofPath, readinessPath, packageIndexPath, ...transitionProofPaths]) {
    assert.equal(fs.existsSync(absolute(requiredPath)), true, requiredPath);
  }

  for (const marker of [
    "HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_VALIDATOR_HELPER_PACKAGE_EXPORT_SCAFFOLD_SCOPE_BOUNDARY",
    "DOCS_ONLY",
    "OWNER_SELECTED_STAGES_1_TO_7_OPTION_A",
    "SEVEN_PACKAGE_EXPORT_SCOPE_DECISIONS_RESOLVED",
    "EXACT_REFERENCE_EQUIVALENT_PACKAGE_EXPORT_DEFINED",
    "EXACT_TWELVE_FILE_CONTRACT_ONLY_SCOPE_DEFINED",
    "TEN_DENIAL_PROOF_TRANSITIONS_DEFINED",
    "PACKAGE_INDEX_LINE_COUNT_PRESERVED",
    "PACKAGE_INDEX_UNCHANGED_BY_THIS_SLICE",
    "PACKAGE_EXPORT_NOT_CREATED_BY_THIS_SLICE",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
  ]) {
    assert.match(docsText, new RegExp(`^${marker}$`, "mu"), marker);
  }
});

test("anchor lines, ten denial-proof transitions, and twelve-file future scope are exact", () => {
  const docsText = readRequired(docsPath);
  const indexLines = readRequired(packageIndexPath).split("\n");
  assert.equal(indexLines.length - 1, 13165);
  assert.equal(
    indexLines[13142 - 1].includes(
      "humanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidence",
    ),
    true,
  );
  assert.equal(
    indexLines[13164 - 1].includes(
      "module.exports.humanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidence",
    ),
    true,
  );

  assert.match(docsText, /FUTURE_PACKAGE_VALIDATOR_EXPORT_COUNT:\n1/u);
  assert.match(docsText, /FUTURE_PACKAGE_VALIDATOR_FUNCTION_ARITY:\n1/u);
  assert.match(docsText, /PACKAGE_INDEX_BASELINE_LINE_COUNT:\n13165/u);
  assert.match(docsText, /PACKAGE_INDEX_STATIC_BINDING_ANCHOR_LINE:\n13142/u);
  assert.match(docsText, /PACKAGE_INDEX_DIRECT_EXPORT_ANCHOR_LINE:\n13164/u);
  assert.match(docsText, /FUTURE_PACKAGE_INDEX_VALIDATOR_SYMBOL_OCCURRENCE_COUNT:\n3/u);
  assert.match(docsText, /FUTURE_PACKAGE_EXPORT_DENIAL_TRANSITION_COUNT:\n10/u);
  assert.match(docsText, /FUTURE_PACKAGE_EXPORT_TRANSITION_PROOF_FILE_COUNT:\n10/u);
  assert.match(docsText, /FUTURE_PACKAGE_EXPORT_IMPLEMENTATION_FILE_COUNT:\n12/u);
  assert.match(docsText, /RETAINED_BLOCKED_VALIDATOR_SIBLING_EXPORT_COUNT:\n3/u);
  assert.match(docsText, /CURRENT_PACKAGE_EXPORT_SCAFFOLD_SCOPE_FILE_COUNT:\n2/u);

  const transitionSection = sectionBetween(
    docsText,
    "## 6. Decision 4: Exact Ten Denial-Proof Transitions",
    "## 7.",
  );
  assert.equal(tableLines(transitionSection).length, 2 + 10);
  for (const target of transitionProofPaths) {
    assert.equal(transitionSection.includes("`" + target + "`"), true, target);
  }
});

test("package index remains unchanged and live package-export denial holds before Slice 7", () => {
  assert.equal(typeof validatorModule[validatorHelperExportName], "function");
  assert.equal(Object.hasOwn(packageSchemas, validatorHelperExportName), false);
  for (const exportName of retainedValidatorExports) {
    assert.equal(Object.hasOwn(packageSchemas, exportName), false, exportName);
  }
});
