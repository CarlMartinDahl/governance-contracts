"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const packageSchemas = require("../packages/schemas/src/index.js");
const validatorModule = require("../packages/schemas/src/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator.js");
const candidateSchema = require("../schemas/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence.json");
const resultSchema = require("../schemas/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-result.json");

const repoRoot = path.join(__dirname, "..");
const packageIndexPath = "packages/schemas/src/index.js";
const exportName =
  "validateHumanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidence";
const retainedBlockedSiblings = [
  "humanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidenceValidator",
  "getHumanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidenceValidator",
  "humanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidenceValidatorRegistry",
];
const scaffoldScopePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_VALIDATOR_HELPER_PACKAGE_EXPORT_SCAFFOLD_SCOPE_BOUNDARY_v1.md";

function readRequired(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  assert.equal(fs.existsSync(absolutePath), true, relativePath);
  return fs.readFileSync(absolutePath, "utf8");
}

test("packages/schemas exports the exact reference-equivalent decision-basis-evidence validator function", () => {
  assert.equal(Object.hasOwn(packageSchemas, exportName), true);
  assert.equal(typeof packageSchemas[exportName], "function");
  assert.equal(packageSchemas[exportName].length, 1);
  assert.strictEqual(packageSchemas[exportName], validatorModule[exportName]);
  assert.strictEqual(
    packageSchemas.humanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidence,
    candidateSchema,
  );
  assert.strictEqual(
    packageSchemas.humanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidenceValidatorResult,
    resultSchema,
  );
});

test("package index preserves 13165 lines, anchor lines 13142 and 13164, and exact three symbol occurrences", () => {
  const indexText = readRequired(packageIndexPath);
  const lines = indexText.split("\n");
  assert.equal(indexText.endsWith("\n"), true);
  assert.equal(lines.length - 1, 13165);

  const occurrences =
    indexText.match(
      /\bvalidateHumanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidence\b/gu,
    ) ?? [];
  assert.equal(occurrences.length, 3);
  assert.equal(lines[13142 - 1].includes(exportName), true);
  assert.equal(
    lines[13164 - 1].includes(
      `module.exports.${exportName} = ${exportName};`,
    ),
    true,
  );
  assert.equal(lines[13146 - 1].includes(exportName), false);
  assert.equal(lines[13165 - 1].includes(exportName), false);
});

test("retained blocked sibling names remain absent and exported validator produces identical frozen results", () => {
  assert.equal(fs.existsSync(path.join(repoRoot, scaffoldScopePath)), true);
  for (const blocked of retainedBlockedSiblings) {
    assert.equal(Object.hasOwn(packageSchemas, blocked), false, blocked);
  }

  const validCandidate = {
    contract_id:
      "human_review.controlled_handoff_human_professional_approval_decision_basis_evidence",
    contract_version: "1.0.0",
    decision_basis_ref: "rvb_pkg_1",
    approval_ref: "apr_pkg_1",
    review_session_ref: "rvs_pkg_1",
    reviewer_ref: "rvr_pkg_1",
    reviewer_role: "PROFESSIONAL_REVIEWER",
    decision: "HUMAN_PROFESSIONAL_GATE_APPROVED",
    basis_subject_kind: "ASSERTED_CLAIM",
    basis_subject_ref: "clm_pkg_1",
    basis_posture: "DECISION_BASIS_CANDIDATE_ONLY",
    binding_issuer_ref: "issuer.pkg:001",
    binding_provenance_ref: "provenance.pkg:001",
    basis_lifecycle_posture: "DECISION_BASIS_DECLARED_ACTIVE",
    verification_posture: "NOT_VERIFIED_BY_CONTRACT",
    human_professional_review_required: true,
  };

  const pkgSuccess = packageSchemas[exportName](validCandidate);
  assert.deepEqual(pkgSuccess, {
    valid: true,
    contractKind:
      "HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_VALIDATOR_BOUNDARY",
    version: "1.0.0",
    errors: [],
  });
  assert.equal(Object.isFrozen(pkgSuccess), true);

  const pkgFailure = packageSchemas[exportName]({
    ...validCandidate,
    basis_subject_ref: "src_mismatched_prefix",
  });
  assert.deepEqual(pkgFailure, {
    valid: false,
    contractKind:
      "HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_VALIDATOR_BOUNDARY",
    version: "1.0.0",
    errors: [{ code: "invalid_field_value", path: "$.basis_subject_ref" }],
  });
  assert.equal(Object.isFrozen(pkgFailure), true);
});
