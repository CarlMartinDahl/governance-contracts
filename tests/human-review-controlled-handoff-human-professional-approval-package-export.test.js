"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const schema = require("../schemas/human-review-controlled-handoff-human-professional-approval.json");
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
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_v1.md",
);
const transitionDocPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
);
const validatorResultTransitionDocPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
);
const exportName = "humanReviewControlledHandoffHumanProfessionalApproval";
const validatorResultExportName =
  "humanReviewControlledHandoffHumanProfessionalApprovalValidatorResult";
const expectedRootFields = [
  "contract_id",
  "contract_version",
  "approval_ref",
  "packet_ref",
  "controlled_handoff_brief_ref",
  "controlled_handoff_brief_fingerprint",
  "approval_posture",
  "decision",
  "reviewer_attribution",
  "decision_support",
  "decided_at",
  "review_session_ref",
  "decision_attestation_ref",
];
const expectedReviewerFields = [
  "reviewer_ref",
  "reviewer_role",
  "reviewer_authority_evidence_ref",
];
const expectedSupportFields = [
  "decision_basis_refs",
  "prior_approval_refs",
  "correction_request_refs",
];
const blockedSiblingExports = [
  "humanReviewControlledHandoffHumanProfessionalApprovalValidator",
  "validateHumanReviewControlledHandoffHumanProfessionalApproval",
  "getHumanReviewControlledHandoffHumanProfessionalApprovalValidator",
  "humanReviewControlledHandoffHumanProfessionalApprovalValidatorRegistry",
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

test("packages/schemas exports the exact approval candidate schema object", () => {
  assert.equal(Object.hasOwn(packageSchemas, exportName), true);
  assert.strictEqual(packageSchemas[exportName], schema);
  assert.deepEqual(packageSchemas[exportName], schema);
  assert.equal(
    packageSchemas[exportName].$id,
    "https://governance-contracts.invalid/schemas/human-review-controlled-handoff-human-professional-approval.json",
  );
  assert.equal(
    packageSchemas[exportName].title,
    "Human Review Controlled Handoff Human/Professional Approval Contract Scaffold",
  );
});

test("package export preserves exact root reviewer and decision-support order", () => {
  const exportedSchema = packageSchemas[exportName];

  assert.deepEqual(exportedSchema.required, expectedRootFields);
  assert.deepEqual(Object.keys(exportedSchema.properties), expectedRootFields);
  assert.equal(exportedSchema.additionalProperties, false);
  assert.equal(
    exportedSchema.properties.reviewer_attribution.$ref,
    "#/$defs/reviewerAttribution",
  );
  assert.equal(
    exportedSchema.properties.decision_support.$ref,
    "#/$defs/decisionSupport",
  );
  assert.deepEqual(
    exportedSchema.$defs.reviewerAttribution.required,
    expectedReviewerFields,
  );
  assert.deepEqual(
    Object.keys(exportedSchema.$defs.reviewerAttribution.properties),
    expectedReviewerFields,
  );
  assert.deepEqual(
    exportedSchema.$defs.decisionSupport.required,
    expectedSupportFields,
  );
  assert.deepEqual(
    Object.keys(exportedSchema.$defs.decisionSupport.properties),
    expectedSupportFields,
  );
});

test("package export preserves exact approval literals enums and opaque patterns", () => {
  const exportedSchema = packageSchemas[exportName];

  assert.equal(
    exportedSchema.properties.contract_id.const,
    "human_review.controlled_handoff_human_professional_approval",
  );
  assert.equal(exportedSchema.properties.contract_version.const, "1.0.0");
  assert.equal(
    exportedSchema.properties.approval_posture.const,
    "APPROVAL_DECISION_CANDIDATE_ONLY",
  );
  assert.deepEqual(exportedSchema.properties.decision.enum, [
    "HUMAN_PROFESSIONAL_GATE_APPROVED",
    "HUMAN_PROFESSIONAL_GATE_CORRECTION_REQUIRED",
    "HUMAN_PROFESSIONAL_GATE_REJECTED",
  ]);
  assert.deepEqual(
    exportedSchema.$defs.reviewerAttribution.properties.reviewer_role.enum,
    ["HUMAN_REVIEWER", "PROFESSIONAL_REVIEWER"],
  );
  assert.equal(
    exportedSchema.properties.approval_ref.pattern,
    "^apr_[a-z0-9][a-z0-9_-]{0,59}$",
  );
  assert.equal(
    exportedSchema.properties.controlled_handoff_brief_fingerprint.pattern,
    "^sha256:[a-f0-9]{64}$",
  );
});

test("package export preserves exact schema keyword counts", () => {
  const exportedSchema = packageSchemas[exportName];

  assert.equal(countKeyword(exportedSchema, "const"), 4);
  assert.equal(countKeyword(exportedSchema, "pattern"), 12);
  assert.equal(countKeyword(exportedSchema, "enum"), 2);
  assert.equal(
    countKeyword(
      exportedSchema,
      "additionalProperties",
      (value) => value === false,
    ),
    3,
  );
  assert.equal(countKeyword(exportedSchema, "$ref"), 2);
  assert.equal(countKeyword(exportedSchema, "allOf"), 1);
  assert.equal(countKeyword(exportedSchema, "if"), 1);
  assert.equal(countKeyword(exportedSchema, "then"), 1);
  assert.equal(countKeyword(exportedSchema, "else"), 1);
});

test("package export preserves array cardinality and uniqueness declarations", () => {
  const exportedSchema = packageSchemas[exportName];

  assert.equal(countKeyword(exportedSchema, "minItems"), 3);
  assert.equal(countKeyword(exportedSchema, "maxItems"), 3);
  assert.equal(countKeyword(exportedSchema, "uniqueItems"), 1);
});

test("candidate export keeps validator siblings separate and result transition anchored", () => {
  const transitionText = fs.readFileSync(validatorResultTransitionDocPath, "utf8");
  const proofText = fs.readFileSync(__filename, "utf8");

  assert.equal(
    transitionText.includes(
      "`tests/human-review-controlled-handoff-human-professional-approval-package-export.test.js` | `SEPARATE_FOCUSED_ALIGNMENT_REQUIRED`",
    ),
    true,
  );
  assert.equal(
    transitionText.includes("`" + validatorResultExportName + "`"),
    true,
  );
  assert.equal(
    proofText.includes(
      "Object." +
        "hasOwn(packageSchemas, validatorResultExportName)",
    ),
    false,
  );
  for (const blockedExport of blockedSiblingExports) {
    assert.equal(Object.hasOwn(packageSchemas, blockedExport), false, blockedExport);
  }
});

test("package index uses one static candidate binding and one schema-object export", () => {
  const indexText = fs.readFileSync(packageIndexPath, "utf8");
  const occurrences =
    indexText.match(
      /\bhumanReviewControlledHandoffHumanProfessionalApproval\b/gu,
    ) ?? [];

  assert.equal(occurrences.length, 3);
  assert.match(
    indexText,
    /humanReviewControlledHandoffHumanProfessionalApproval = require\("\.\.\/\.\.\/\.\.\/schemas\/human-review-controlled-handoff-human-professional-approval\.json"\)/u,
  );
  assert.match(
    indexText,
    /module\.exports\.humanReviewControlledHandoffHumanProfessionalApproval = humanReviewControlledHandoffHumanProfessionalApproval/u,
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
  assert.match(
    scopeText,
    /FUTURE_CANDIDATE_PACKAGE_SCHEMA_EXPORT_NAME:\nhumanReviewControlledHandoffHumanProfessionalApproval/u,
  );
  assert.match(
    scopeText,
    /FUTURE_CANDIDATE_PACKAGE_EXPORT_PROOF_ASSERTION_FAMILY_COUNT:\n9/u,
  );
  assert.match(
    transitionText,
    /HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_STATUS:\nTRACKED_DOCS_ONLY_FIRST_CANDIDATE_PACKAGE_EXPORT_PROOF_TRANSITION_DEFINED/u,
  );
  assert.match(scopeText, /VALIDATOR_RESULT_SCHEMA_EXPORT_SEPARATE_LATER_SLICE/u);
  assert.match(scopeText, /NO_RUNTIME_BEHAVIOR_CREATED/u);
  assert.match(
    validatorResultTransitionText,
    /VALIDATOR_RESULT_PACKAGE_EXPORT_LIVE_PROOF_CONFLICT_COUNT:\n13/u,
  );
  assert.match(
    validatorResultTransitionText,
    /REMAINING_FOCUSED_PROOF_ALIGNMENT_COUNT:\n12/u,
  );
});

test("static schema-object export exposes no callable approval or handoff behavior", () => {
  const exportedSchema = packageSchemas[exportName];

  assert.equal(typeof exportedSchema, "object");
  assert.equal(containsCallable(exportedSchema), false);
  for (const behaviorName of [
    "approveHumanReviewControlledHandoffHumanProfessionalApproval",
    "deliverHumanReviewControlledHandoffHumanProfessionalApproval",
    "releaseHumanReviewControlledHandoffHumanProfessionalApproval",
  ]) {
    assert.equal(Object.hasOwn(packageSchemas, behaviorName), false, behaviorName);
  }
});
