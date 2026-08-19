"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const schema = require("../schemas/human-review-controlled-handoff-human-professional-approval-reviewer-role-evidence.json");
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
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_ROLE_EVIDENCE_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_v1.md",
);
const transitionDocPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_ROLE_EVIDENCE_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
);
const validatorResultTransitionDocPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_ROLE_EVIDENCE_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
);
const exportName =
  "humanReviewControlledHandoffHumanProfessionalApprovalReviewerRoleEvidence";
const validatorResultExportName =
  "humanReviewControlledHandoffHumanProfessionalApprovalReviewerRoleEvidenceValidatorResult";
const expectedRootFields = [
  "contract_id",
  "contract_version",
  "reviewer_role_evidence_ref",
  "approval_ref",
  "review_session_ref",
  "reviewer_ref",
  "reviewer_role",
  "actor_role_binding_evidence_ref",
  "role_permission_policy_evidence_ref",
  "binding_issuer_ref",
  "binding_provenance_ref",
  "binding_lifecycle_posture",
  "verification_posture",
  "human_professional_review_required",
];
const namespacePatterns = {
  reviewer_role_evidence_ref: "^rre_[a-z0-9][a-z0-9_-]{0,59}$",
  approval_ref: "^apr_[a-z0-9][a-z0-9_-]{0,59}$",
  review_session_ref: "^rvs_[a-z0-9][a-z0-9_-]{0,59}$",
  reviewer_ref: "^rvr_[a-z0-9][a-z0-9_-]{0,59}$",
};
const genericReferenceFields = [
  "actor_role_binding_evidence_ref",
  "role_permission_policy_evidence_ref",
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
const lifecyclePostures = [
  "REVIEWER_ROLE_BINDING_DECLARED_ACTIVE",
  "REVIEWER_ROLE_BINDING_DECLARED_INACTIVE",
  "REVIEWER_ROLE_BINDING_DECLARED_REVOKED",
];
const prohibitedSiblingExports = [
  "humanReviewControlledHandoffHumanProfessionalApprovalReviewerRoleEvidenceValidator",
  "getHumanReviewControlledHandoffHumanProfessionalApprovalReviewerRoleEvidenceValidator",
  "humanReviewControlledHandoffHumanProfessionalApprovalReviewerRoleEvidenceValidatorRegistry",
];
const alignedProofPaths = [
  "tests/domain-human-review-controlled-handoff-human-professional-approval-reviewer-role-evidence-package-schema-export-scope-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-reviewer-role-evidence-schema-scaffold-scope-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-reviewer-role-evidence-validator-error-path-semantics-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-reviewer-role-evidence-validator-result-schema-readiness-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-reviewer-role-evidence-validator-result-schema-scaffold-scope-boundary-doc-freeze.test.js",
  "tests/human-review-controlled-handoff-human-professional-approval-reviewer-role-evidence-validator-result-schema.test.js",
];

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

test("packages/schemas exports the exact reviewer role evidence candidate schema object", () => {
  assert.equal(Object.hasOwn(packageSchemas, exportName), true);
  assert.strictEqual(packageSchemas[exportName], schema);
  assert.deepEqual(packageSchemas[exportName], schema);
  assert.equal(
    packageSchemas[exportName].$id,
    "https://governance-contracts.invalid/schemas/human-review-controlled-handoff-human-professional-approval-reviewer-role-evidence.json",
  );
  assert.equal(
    packageSchemas[exportName].title,
    "Human Review Controlled Handoff Human/Professional Approval Reviewer Role Evidence Contract Scaffold",
  );
});

test("package export preserves exact root field order and closed-object posture", () => {
  const exportedSchema = packageSchemas[exportName];

  assert.deepEqual(exportedSchema.required, expectedRootFields);
  assert.deepEqual(Object.keys(exportedSchema.properties), expectedRootFields);
  assert.equal(exportedSchema.additionalProperties, false);
});

test("package export preserves exact role namespace, reviewer role, and posture declarations", () => {
  const properties = packageSchemas[exportName].properties;

  assert.equal(
    properties.contract_id.const,
    "human_review.controlled_handoff_human_professional_approval_reviewer_role_evidence",
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
  assert.deepEqual(properties.binding_lifecycle_posture.enum, lifecyclePostures);
  assert.equal(
    properties.verification_posture.const,
    "NOT_VERIFIED_BY_CONTRACT",
  );
  assert.equal(properties.human_professional_review_required.type, "boolean");
  assert.equal(properties.human_professional_review_required.const, true);
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

  assert.equal(countKeyword(exportedSchema, "const"), 4);
  assert.equal(countKeyword(exportedSchema, "pattern"), 36);
  assert.equal(countKeyword(exportedSchema, "enum"), 6);
  assert.equal(
    countKeyword(
      exportedSchema,
      "additionalProperties",
      (value) => value === false,
    ),
    1,
  );
  assert.equal(countKeyword(exportedSchema, "not"), 4);
  assert.equal(countKeyword(exportedSchema, "anyOf"), 4);
  for (const absentKeyword of [
    "$ref",
    "allOf",
    "minItems",
    "maxItems",
    "uniqueItems",
  ]) {
    assert.equal(countKeyword(exportedSchema, absentKeyword), 0, absentKeyword);
  }
});

test("candidate export keeps validator-object and dispatch siblings separate while result transition stays anchored", () => {
  const transitionText = fs.readFileSync(validatorResultTransitionDocPath, "utf8");
  const proofText = fs.readFileSync(__filename, "utf8");

  assert.equal(
    transitionText.includes(
      "`tests/human-review-controlled-handoff-human-professional-approval-reviewer-role-evidence-package-export.test.js` | `SEPARATE_FOCUSED_ALIGNMENT_REQUIRED`",
    ),
    true,
  );
  assert.equal(
    transitionText.includes("`" + validatorResultExportName + "`"),
    true,
  );
  assert.equal(prohibitedSiblingExports.includes(validatorResultExportName), false);
  assert.equal(
    proofText.includes(
      "Object." +
        "hasOwn(packageSchemas, validatorResultExportName)",
    ),
    false,
  );
  for (const prohibitedExport of prohibitedSiblingExports) {
    assert.equal(
      Object.hasOwn(packageSchemas, prohibitedExport),
      false,
      prohibitedExport,
    );
  }
});

test("package index uses one static candidate binding and one schema-object export", () => {
  const indexText = fs.readFileSync(packageIndexPath, "utf8");
  const occurrences =
    indexText.match(
      /\bhumanReviewControlledHandoffHumanProfessionalApprovalReviewerRoleEvidence\b/gu,
    ) ?? [];

  assert.equal((indexText.match(/\n/gu) ?? []).length, 13165);
  assert.equal(occurrences.length, 3);
  assert.match(
    indexText,
    /humanReviewControlledHandoffHumanProfessionalApprovalReviewerRoleEvidence = require\("\.\.\/\.\.\/\.\.\/schemas\/human-review-controlled-handoff-human-professional-approval-reviewer-role-evidence\.json"\)/u,
  );
  assert.match(
    indexText,
    /module\.exports\.humanReviewControlledHandoffHumanProfessionalApprovalReviewerRoleEvidence = humanReviewControlledHandoffHumanProfessionalApprovalReviewerRoleEvidence/u,
  );
});

test("package export remains anchored to scope transition and sequence boundaries", () => {
  const scopeText = fs.readFileSync(scopeDocPath, "utf8");
  const transitionText = fs.readFileSync(transitionDocPath, "utf8");
  const validatorResultTransitionText = fs.readFileSync(
    validatorResultTransitionDocPath,
    "utf8",
  );

  assert.match(scopeText, /OWNER_SELECTED_PACKAGE_EXPORT_SEQUENCE_OPTION_A/u);
  assert.match(scopeText, /CANDIDATE_SCHEMA_EXPORT_FIRST/u);
  assert.match(scopeText, /VALIDATOR_RESULT_SCHEMA_EXPORT_SEPARATE_LATER_SLICE/u);
  assert.match(
    scopeText,
    /FUTURE_CANDIDATE_PACKAGE_SCHEMA_EXPORT_NAME:\nhumanReviewControlledHandoffHumanProfessionalApprovalReviewerRoleEvidence/u,
  );
  assert.match(
    scopeText,
    /FUTURE_CANDIDATE_PACKAGE_EXPORT_PROOF_ASSERTION_FAMILY_COUNT:\n9/u,
  );
  assert.match(
    transitionText,
    /HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_ROLE_EVIDENCE_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_STATUS:\nTRACKED_DOCS_ONLY_FIRST_CANDIDATE_PACKAGE_EXPORT_PROOF_TRANSITION_DEFINED/u,
  );
  assert.match(
    transitionText,
    /PACKAGE_SCHEMA_EXPORT_LIVE_PROOF_CONFLICT_COUNT:\n7/u,
  );
  assert.match(
    transitionText,
    /REMAINING_FOCUSED_PROOF_ALIGNMENT_COUNT:\n6/u,
  );
  for (const proofPath of alignedProofPaths) {
    assert.equal(transitionText.includes("`" + proofPath + "`"), true, proofPath);
  }
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

test("static schema-object export exposes no callable role approval or handoff behavior", () => {
  const exportedSchema = packageSchemas[exportName];

  assert.equal(typeof exportedSchema, "object");
  assert.equal(containsCallable(exportedSchema), false);
  for (const behaviorName of [
    "verifyHumanReviewControlledHandoffHumanProfessionalApprovalReviewerRoleEvidence",
    "approveHumanReviewControlledHandoffHumanProfessionalApprovalReviewerRoleEvidence",
    "deliverHumanReviewControlledHandoffHumanProfessionalApprovalReviewerRoleEvidence",
    "releaseHumanReviewControlledHandoffHumanProfessionalApprovalReviewerRoleEvidence",
  ]) {
    assert.equal(Object.hasOwn(packageSchemas, behaviorName), false, behaviorName);
  }
});
