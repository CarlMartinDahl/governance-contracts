"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const packageSchemas = require("../packages/schemas/src/index.js");
const validatorModule = require("../packages/schemas/src/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator.js");

const repoRoot = path.join(__dirname, "..");
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_VALIDATOR_HELPER_PACKAGE_EXPORT_READINESS_BOUNDARY_v1.md";
const proofPath =
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-helper-package-export-readiness-boundary-doc-freeze.test.js";
const packageIndexPath = "packages/schemas/src/index.js";
const validatorPath =
  "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator.js";
const validatorHelperExportName =
  "validateHumanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidence";
const retainedValidatorExports = [
  "humanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidenceValidator",
  "getHumanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidenceValidator",
  "humanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidenceValidatorRegistry",
];
const preexistingDenialProofs = [
  "tests/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-package-export.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-package-schema-export-scope-boundary-doc-freeze.test.js",
  "tests/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-result-package-export.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-result-package-schema-export-scope-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-helper-readiness-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-helper-scaffold-scope-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-helper-proof-transition-prerequisite-boundary-doc-freeze.test.js",
  "tests/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator.test.js",
];

function absolute(relativePath) {
  return path.join(repoRoot, relativePath);
}

function readRequired(relativePath) {
  assert.equal(fs.existsSync(absolute(relativePath)), true, relativePath);
  return fs.readFileSync(absolute(relativePath), "utf8");
}

function tableLines(sectionText) {
  return sectionText
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("|"));
}

function sectionBetween(text, startHeading, endHeading) {
  const start = text.indexOf(startHeading);
  assert.notEqual(start, -1, startHeading);
  const end = endHeading ? text.indexOf(endHeading, start + startHeading.length) : text.length;
  assert.notEqual(end, -1, endHeading ?? "EOF");
  return text.slice(start, end);
}

test("package-export readiness boundary, sources, and markers are exact", () => {
  const docsText = readRequired(docsPath);
  for (const requiredPath of [proofPath, packageIndexPath, validatorPath, ...preexistingDenialProofs]) {
    assert.equal(fs.existsSync(absolute(requiredPath)), true, requiredPath);
  }

  for (const marker of [
    "HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_VALIDATOR_HELPER_PACKAGE_EXPORT_READINESS_BOUNDARY",
    "PROVE_ONLY_FINDINGS_CAPTURED_AS_DOCS_ONLY",
    "INTERNAL_VALIDATOR_HELPER_TRACKED",
    "PUBLIC_PACKAGE_EXPORT_ABSENT",
    "EIGHT_PREEXISTING_PACKAGE_EXPORT_DENIAL_PROOFS_IDENTIFIED",
    "SEVEN_PACKAGE_EXPORT_SCOPE_DECISIONS_OPEN",
    "PACKAGE_INDEX_UNCHANGED_BY_THIS_SLICE",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
  ]) {
    assert.match(docsText, new RegExp(`^${marker}$`, "mu"), marker);
  }
});

test("readiness facts, eight denial dependencies, and seven open scope decisions are exact", () => {
  const docsText = readRequired(docsPath);
  const factsSection = sectionBetween(docsText, "## 3. Current Tracked Facts", "## 4.");
  const denialSection = sectionBetween(docsText, "## 5. Eight Pre-Existing Denial-Proof Dependencies", "## 6.");
  const openSection = sectionBetween(docsText, "## 6. Seven Open Package-Export Scope Decisions", "## 7.");

  assert.equal(tableLines(factsSection).length, 2 + 10);
  assert.equal(tableLines(denialSection).length, 2 + 8);
  assert.equal(tableLines(openSection).length, 2 + 7);
  assert.match(docsText, /CURRENT_PACKAGE_EXPORT_READINESS_FACT_COUNT:\n10/u);
  assert.match(docsText, /CURRENT_PREEXISTING_PACKAGE_EXPORT_DENIAL_PROOF_COUNT:\n8/u);
  assert.match(docsText, /READINESS_SLICE_ADDITIONAL_LIVE_DENIAL_PROOF_COUNT:\n1/u);
  assert.match(docsText, /OPEN_PACKAGE_EXPORT_SCOPE_DECISION_COUNT:\n7/u);
  assert.match(docsText, /CURRENT_PACKAGE_EXPORT_READINESS_FILE_COUNT:\n2/u);
  assert.match(
    docsText,
    /RECOMMENDED_NEXT_SLICE:\nHUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_VALIDATOR_HELPER_PACKAGE_EXPORT_SCAFFOLD_SCOPE_BOUNDARY_DOCS_ONLY/u,
  );

  for (const denialProof of preexistingDenialProofs) {
    assert.equal(denialSection.includes("`" + denialProof + "`"), true, denialProof);
  }
});

test("package index remains 13165 lines and preserves current package export posture", () => {
  const indexText = readRequired(packageIndexPath);
  assert.equal(indexText.split("\n").length - 1, 13165);
  assert.equal(typeof validatorModule[validatorHelperExportName], "function");
  assert.strictEqual(
    packageSchemas[validatorHelperExportName],
    validatorModule[validatorHelperExportName],
  );
  for (const exportName of retainedValidatorExports) {
    assert.equal(Object.hasOwn(packageSchemas, exportName), false, exportName);
  }
});
