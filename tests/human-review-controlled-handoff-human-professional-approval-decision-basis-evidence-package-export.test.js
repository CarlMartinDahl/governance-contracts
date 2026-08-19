"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const schema = require("../schemas/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence.json");
const packageSchemas = require("../packages/schemas/src/index.js");

const repoRoot = path.join(__dirname, "..");
const packageIndexPath = path.join(
  repoRoot,
  "packages",
  "schemas",
  "src",
  "index.js",
);
const scopeDocPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_v1.md",
);
const transitionDocPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
);
const validatorResultTransitionDocPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
);
const centralProofPath = path.join(
  repoRoot,
  "tests",
  "domain-human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-package-schema-export-scope-boundary-doc-freeze.test.js",
);
const exportName =
  "humanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidence";
const validatorResultExportName =
  "humanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidenceValidatorResult";
const expectedRootFields = [
  "contract_id",
  "contract_version",
  "decision_basis_ref",
  "approval_ref",
  "review_session_ref",
  "reviewer_ref",
  "reviewer_role",
  "decision",
  "basis_subject_kind",
  "basis_subject_ref",
  "basis_posture",
  "binding_issuer_ref",
  "binding_provenance_ref",
  "basis_lifecycle_posture",
  "verification_posture",
  "human_professional_review_required",
];
const namespacePatterns = {
  decision_basis_ref: "^rvb_[a-z0-9][a-z0-9_-]{0,59}$",
  approval_ref: "^apr_[a-z0-9][a-z0-9_-]{0,59}$",
  review_session_ref: "^rvs_[a-z0-9][a-z0-9_-]{0,59}$",
  reviewer_ref: "^rvr_[a-z0-9][a-z0-9_-]{0,59}$",
};
const subjectBindings = [
  ["SOURCE_REGISTER_SOURCE", "^src_[a-z0-9][a-z0-9_-]{0,59}$"],
  ["REVIEW_CHRONOLOGY_ENTRY", "^chr_[a-z0-9][a-z0-9_-]{0,59}$"],
  ["ASSERTED_CLAIM", "^clm_[a-z0-9][a-z0-9_-]{0,59}$"],
  ["DECLARED_REVIEW_GAP", "^gap_[a-z0-9][a-z0-9_-]{0,59}$"],
  ["HUMAN_REVIEW_QUESTION", "^qst_[a-z0-9][a-z0-9_-]{0,59}$"],
  ["NO_CONCLUSION_NOTICE", "^ncn_[a-z0-9][a-z0-9_-]{0,59}$"],
];
const genericReferenceFields = [
  "binding_issuer_ref",
  "binding_provenance_ref",
];
const expectedOpaqueNotAnyOf = [
  { enum: [".", ".."] },
  { pattern: "^[Hh][Tt][Tt][Pp]:" },
  { pattern: "^[Hh][Tt][Tt][Pp][Ss]:" },
  { pattern: "^[Ff][Tt][Pp]:" },
  { pattern: "^[Ff][Ii][Ll][Ee]:" },
  { pattern: "^[Mm][Aa][Ii][Ll][Tt][Oo]:" },
  { pattern: "^[Dd][Aa][Tt][Aa]:" },
  { pattern: "^[Jj][Aa][Vv][Aa][Ss][Cc][Rr][Ii][Pp][Tt]:" },
];
const prohibitedSiblingExports = [
  "humanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidenceValidator",
  "validateHumanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidence",
  "getHumanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidenceValidator",
  "humanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidenceValidatorRegistry",
];
const alignedProofPaths = [
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-contract-boundary-doc-freeze.test.js",
  "tests/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-schema.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-schema-scaffold-scope-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-error-path-semantics-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-result-schema-readiness-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-result-schema-scaffold-scope-boundary-doc-freeze.test.js",
  "tests/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-result-schema.test.js",
];

function readRequired(filePath) {
  assert.equal(fs.existsSync(filePath), true, "expected " + filePath);
  return fs.readFileSync(filePath, "utf8");
}

function countKeyword(value, keyword, predicate = () => true) {
  if (Array.isArray(value)) {
    return value.reduce(
      (count, item) => count + countKeyword(item, keyword, predicate),
      0,
    );
  }
  if (value === null || typeof value !== "object") return 0;

  return Object.entries(value).reduce(
    (count, [key, child]) =>
      count +
      (key === keyword && predicate(child) ? 1 : 0) +
      countKeyword(child, keyword, predicate),
    0,
  );
}

function containsCallable(value) {
  if (typeof value === "function") return true;
  if (Array.isArray(value)) return value.some(containsCallable);
  if (value === null || typeof value !== "object") return false;
  return Object.values(value).some(containsCallable);
}

test("packages/schemas exports the exact decision basis evidence candidate schema object", () => {
  assert.equal(Object.hasOwn(packageSchemas, exportName), true);
  assert.strictEqual(packageSchemas[exportName], schema);
  assert.deepEqual(packageSchemas[exportName], schema);
  assert.equal(
    packageSchemas[exportName].$id,
    "https://governance-contracts.invalid/schemas/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence.json",
  );
  assert.equal(
    packageSchemas[exportName].title,
    "Human Review Controlled Handoff Human/Professional Approval Decision Basis Evidence Contract Scaffold",
  );
});

test("package export preserves exact root field order and closed-object posture", () => {
  const exportedSchema = packageSchemas[exportName];

  assert.deepEqual(exportedSchema.required, expectedRootFields);
  assert.deepEqual(Object.keys(exportedSchema.properties), expectedRootFields);
  assert.equal(exportedSchema.additionalProperties, false);
});

test("package export preserves exact decision basis declarations and six subject bindings", () => {
  const properties = packageSchemas[exportName].properties;

  assert.equal(
    properties.contract_id.const,
    "human_review.controlled_handoff_human_professional_approval_decision_basis_evidence",
  );
  assert.equal(properties.contract_version.const, "1.0.0");
  for (const [field, pattern] of Object.entries(namespacePatterns)) {
    assert.equal(properties[field].type, "string", field);
    assert.equal(properties[field].pattern, pattern, field);
  }
  assert.deepEqual(properties.reviewer_role.enum, [
    "HUMAN_REVIEWER",
    "PROFESSIONAL_REVIEWER",
  ]);
  assert.deepEqual(properties.decision.enum, [
    "HUMAN_PROFESSIONAL_GATE_APPROVED",
    "HUMAN_PROFESSIONAL_GATE_CORRECTION_REQUIRED",
    "HUMAN_PROFESSIONAL_GATE_REJECTED",
  ]);
  assert.deepEqual(
    properties.basis_subject_kind.enum,
    subjectBindings.map(([kind]) => kind),
  );
  assert.equal(properties.basis_posture.const, "DECISION_BASIS_CANDIDATE_ONLY");
  assert.deepEqual(properties.basis_lifecycle_posture.enum, [
    "DECISION_BASIS_DECLARED_ACTIVE",
    "DECISION_BASIS_DECLARED_INACTIVE",
    "DECISION_BASIS_DECLARED_REVOKED",
  ]);
  assert.equal(
    properties.verification_posture.const,
    "NOT_VERIFIED_BY_CONTRACT",
  );
  assert.equal(properties.human_professional_review_required.type, "boolean");
  assert.equal(properties.human_professional_review_required.const, true);
  assert.equal(schema.allOf.length, 6);
  for (const [index, [kind, pattern]] of subjectBindings.entries()) {
    assert.deepEqual(schema.allOf[index], {
      if: {
        properties: {
          basis_subject_kind: { const: kind },
        },
        required: ["basis_subject_kind"],
      },
      then: {
        properties: {
          basis_subject_ref: { pattern },
        },
      },
    });
  }
});

test("package export preserves exact generic opaque-reference boundaries", () => {
  const properties = packageSchemas[exportName].properties;

  for (const field of genericReferenceFields) {
    assert.equal(properties[field].type, "string", field);
    assert.equal(properties[field].pattern, "^[A-Za-z0-9._:-]{1,128}$", field);
    assert.deepEqual(properties[field].not.anyOf, expectedOpaqueNotAnyOf, field);
  }
});

test("package export preserves exact schema keyword counts", () => {
  const exportedSchema = packageSchemas[exportName];

  assert.equal(countKeyword(exportedSchema, "const"), 11);
  assert.equal(countKeyword(exportedSchema, "pattern"), 26);
  assert.equal(countKeyword(exportedSchema, "enum"), 6);
  assert.equal(
    countKeyword(
      exportedSchema,
      "additionalProperties",
      (value) => value === false,
    ),
    1,
  );
  assert.equal(countKeyword(exportedSchema, "not"), 2);
  assert.equal(countKeyword(exportedSchema, "anyOf"), 2);
  assert.equal(countKeyword(exportedSchema, "allOf"), 1);
  assert.equal(countKeyword(exportedSchema, "if"), 6);
  assert.equal(countKeyword(exportedSchema, "then"), 6);
  for (const absentKeyword of [
    "$ref",
    "minItems",
    "maxItems",
    "uniqueItems",
  ]) {
    assert.equal(countKeyword(exportedSchema, absentKeyword), 0, absentKeyword);
  }
});

test("candidate export keeps validator and dispatch siblings separate while result transition stays anchored", () => {
  const scopeText = readRequired(scopeDocPath);
  const transitionText = readRequired(validatorResultTransitionDocPath);
  const proofText = readRequired(__filename);

  assert.equal(
    transitionText.includes(
      "`tests/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-package-export.test.js` | `SEPARATE_FOCUSED_ALIGNMENT_REQUIRED`",
    ),
    true,
  );
  assert.equal(
    transitionText.includes("`" + validatorResultExportName + "`"),
    true,
  );
  assert.equal(
    prohibitedSiblingExports.includes(validatorResultExportName),
    false,
  );
  assert.equal(
    proofText.includes(
      "Object." +
        "hasOwn(packageSchemas, validatorResultExportName)",
    ),
    false,
  );
  assert.equal(prohibitedSiblingExports.length, 4);
  for (const prohibitedExport of prohibitedSiblingExports) {
    assert.equal(scopeText.includes("`" + prohibitedExport + "`"), true);
    assert.equal(
      Object.hasOwn(packageSchemas, prohibitedExport),
      false,
      prohibitedExport,
    );
  }
});

test("package index uses one static candidate binding and one schema-object export", () => {
  const indexText = readRequired(packageIndexPath);
  const proofText = readRequired(__filename);
  const occurrences =
    indexText.match(
      /\bhumanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidence\b/gu,
    ) ?? [];

  assert.equal(
    proofText.includes(
      "assert.equal((indexText.match(/" + "\\n/gu) ?? []).length",
    ),
    false,
  );
  assert.equal(occurrences.length, 3);
  assert.match(
    indexText,
    /const humanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidence = require\("\.\.\/\.\.\/\.\.\/schemas\/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence\.json"\);/u,
  );
  assert.match(
    indexText,
    /module\.exports\.humanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidence = humanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidence;/u,
  );
});

test("package export remains anchored to scope, transition, and sequence boundaries", () => {
  const scopeText = readRequired(scopeDocPath);
  const transitionText = readRequired(transitionDocPath);
  const validatorResultTransitionText = readRequired(
    validatorResultTransitionDocPath,
  );
  const centralProofText = readRequired(centralProofPath);

  assert.match(scopeText, /OWNER_SELECTED_PACKAGE_EXPORT_SEQUENCE_OPTION_A/u);
  assert.match(scopeText, /CANDIDATE_SCHEMA_EXPORT_FIRST/u);
  assert.match(scopeText, /VALIDATOR_RESULT_SCHEMA_EXPORT_SEPARATE_LATER_SLICE/u);
  assert.match(
    scopeText,
    /FUTURE_CANDIDATE_PACKAGE_SCHEMA_EXPORT_NAME:\nhumanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidence/u,
  );
  assert.match(
    scopeText,
    /FUTURE_CANDIDATE_PACKAGE_EXPORT_PROOF_ASSERTION_FAMILY_COUNT:\n9/u,
  );
  assert.match(
    transitionText,
    /HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_STATUS:\nTRACKED_DOCS_ONLY_FIRST_CANDIDATE_PACKAGE_EXPORT_PROOF_TRANSITION_DEFINED/u,
  );
  assert.match(
    transitionText,
    /PACKAGE_SCHEMA_EXPORT_LIVE_PROOF_CONFLICT_COUNT:\n8/u,
  );
  assert.match(
    transitionText,
    /REMAINING_FOCUSED_PROOF_ALIGNMENT_COUNT:\n7/u,
  );
  assert.equal(
    transitionText.includes("`" + validatorResultExportName + "`"),
    true,
  );
  for (const proofPath of alignedProofPaths) {
    assert.equal(transitionText.includes("`" + proofPath + "`"), true, proofPath);
  }
  assert.equal(
    centralProofText.includes(
      "remainingPackageExportProofAlignmentPaths.slice(0, 7)",
    ),
    true,
  );
  assert.equal(
    centralProofText.includes(
      "remainingPackageExportProofAlignmentPaths.slice(7)",
    ),
    true,
  );
  assert.match(
    validatorResultTransitionText,
    /VALIDATOR_RESULT_PACKAGE_EXPORT_LIVE_PROOF_CONFLICT_COUNT:\n9/u,
  );
  assert.match(
    validatorResultTransitionText,
    /REMAINING_FOCUSED_PROOF_ALIGNMENT_COUNT:\n8/u,
  );
  assert.match(scopeText, /NO_RUNTIME_BEHAVIOR_CREATED/u);
});

test("static schema-object export exposes no callable validation approval or handoff behavior", () => {
  const exportedSchema = packageSchemas[exportName];

  assert.equal(typeof exportedSchema, "object");
  assert.equal(containsCallable(exportedSchema), false);
  for (const behaviorName of [
    "validateHumanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidence",
    "verifyHumanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidence",
    "approveHumanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidence",
    "deliverHumanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidence",
    "releaseHumanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidence",
  ]) {
    assert.equal(Object.hasOwn(packageSchemas, behaviorName), false, behaviorName);
  }
});
