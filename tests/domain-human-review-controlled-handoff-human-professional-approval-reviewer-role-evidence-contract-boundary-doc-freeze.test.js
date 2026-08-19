"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const approvalSchema = require("../schemas/human-review-controlled-handoff-human-professional-approval.json");
const reviewerIdentitySchema = require("../schemas/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence.json");
const {
  RBAC_ACTOR_ROLE_BINDING_EVIDENCE_CONTRACT_IDENTITY,
  RBAC_ACTOR_ROLE_BINDING_EVIDENCE_DEPENDENCY_DECLARATIONS,
  RBAC_ACTOR_ROLE_BINDING_EVIDENCE_LIFECYCLE_POSTURES,
  RBAC_ACTOR_ROLE_BINDING_EVIDENCE_OPAQUE_REFERENCE_FIELDS,
  RBAC_ACTOR_ROLE_BINDING_EVIDENCE_REQUIRED_FIELDS,
} = require("../packages/governance/src/rbac-actor-role-binding-evidence-contract.js");
const {
  RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_CONTRACT_IDENTITY,
  RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_ROLE_CATEGORIES,
  RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_ROLE_DEFINITION_FIELDS,
  RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_TOP_LEVEL_FIELDS,
  RBAC_ROLE_PERMISSION_POLICY_LIFECYCLE_POSTURES,
} = require("../packages/governance/src/rbac-role-permission-policy-evidence-contract.js");

const repoRoot = path.join(__dirname, "..");
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_ROLE_EVIDENCE_CONTRACT_BOUNDARY_v1.md";
const proofPath =
  "tests/domain-human-review-controlled-handoff-human-professional-approval-reviewer-role-evidence-contract-boundary-doc-freeze.test.js";
const controllingPaths = [
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_CONTRACT_BOUNDARY_v1.md",
  "schemas/human-review-controlled-handoff-human-professional-approval.json",
  "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-validator.js",
  "tests/human-review-controlled-handoff-human-professional-approval-validator.test.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_CROSS_REFERENCE_ADMISSIBILITY_SEMANTICS_BOUNDARY_v1.md",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-cross-reference-admissibility-semantics-boundary-doc-freeze.test.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_IDENTITY_EVIDENCE_CONTRACT_BOUNDARY_v1.md",
  "schemas/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence.json",
  "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-validator.js",
  "tests/human-review-controlled-handoff-human-professional-approval-reviewer-identity-evidence-validator.test.js",
  "packages/governance/src/rbac-actor-role-binding-evidence-contract.js",
  "tests/rbac-actor-role-binding-evidence-contract.test.js",
  "packages/governance/src/rbac-role-permission-policy-evidence-contract.js",
  "tests/rbac-role-permission-policy-evidence-contract.test.js",
  "packages/governance/src/rbac-role-permission-deny-by-default-scaffold.js",
  "tests/rbac-role-permission-deny-by-default-scaffold.test.js",
];

function absolute(relativePath) {
  return path.join(repoRoot, relativePath);
}

function readRequired(relativePath) {
  assert.equal(fs.existsSync(absolute(relativePath)), true, relativePath);
  return fs.readFileSync(absolute(relativePath), "utf8");
}

function sectionBetween(docsText, start, end) {
  const startIndex = docsText.indexOf(start);
  const endIndex = end
    ? docsText.indexOf(end, startIndex + start.length)
    : docsText.length;

  assert.notEqual(startIndex, -1, start);
  assert.notEqual(endIndex, -1, end);
  return docsText.slice(startIndex, endIndex);
}

function numberedLines(text) {
  return [...text.matchAll(/^([1-9][0-9]*)\. (.+)$/gmu)].map(
    ([, number, value]) => `${number}. ${value}`,
  );
}

function tableLines(text) {
  return text
    .split("\n")
    .filter((line) => line.startsWith("|"));
}

function bulletLines(text) {
  return text
    .split("\n")
    .filter((line) => line.startsWith("- "));
}

function normalizeWhitespace(text) {
  return text.trim().replace(/\s+/gu, " ");
}

const expectedStageTable = [
  "| Stage | Selected option | Frozen docs-level result |",
  "| --- | --- | --- |",
  "| 1 | `OPTION_A` | one separate closed approval-specific reviewer role evidence contract composes exactly one directly supplied generic RBAC actor-role-binding evidence candidate; generic validity is necessary but insufficient |",
  "| 2 | `OPTION_A` | one separate opaque dependency reference equals the generic actor-role-binding candidate's `evidenceId` exactly; `bindingId`, `roleId`, actor identity, and policy references are not substituted |",
  "| 3 | `OPTION_A` | one required `reviewer_ref` uses the exact `rvr_` namespace and equals the approval candidate's reviewer reference with no alias, normalization, derivation, or lookup |",
  "| 4 | `OPTION_A` | one required `reviewer_role` is exactly `HUMAN_REVIEWER` or `PROFESSIONAL_REVIEWER` and equals the approval candidate's reviewer-role literal |",
  "| 5 | `OPTION_A` | the RBAC candidate's `actorIdentityEvidenceRef` equals the reviewer identity candidate's `actor_identity_evidence_ref` in the future outer admissibility checkpoint; `reviewer_ref` remains separate |",
  "| 6 | `OPTION_A` | generic `roleId` remains one separate opaque role identifier and is never equated with, normalized to, or used to derive `reviewer_role` |",
  "| 7 | `OPTION_A` | exactly two reviewer-role to RBAC role-category mappings are allowed; admin, support, and system categories are prohibited |",
  "| 8 | `OPTION_A` | `PROFESSIONAL_REVIEWER` and `PROFESSIONAL_REVIEW_ROLE_CATEGORY` never prove professional qualification; qualification remains separately governed and fail-closed |",
  "| 9 | `OPTION_A` | one directly supplied generic RBAC role-permission-policy candidate is required and the actor-role binding's `policyEvidenceRef` equals its `evidenceId` exactly |",
  "| 10 | `OPTION_A` | the actor-role binding's `policyId` and `policyVersion` equal the policy candidate's exact values without fallback, aliasing, or version substitution |",
  "| 11 | `OPTION_A` | exactly one policy role definition matches both the actor-role binding's `roleId` and `roleDefinitionVersion` |",
  "| 12 | `OPTION_A` | the matched role definition's `roleCategory` equals the exact two-value mapping selected for the approval `reviewer_role` |",
  "| 13 | `OPTION_A` | the approval-specific wrapper and generic actor-role binding remain exactly `NOT_VERIFIED_BY_CONTRACT`; structural consistency never becomes verified role assignment |",
  "| 14 | `OPTION_A` | required `approval_ref` and `review_session_ref` bind the evidence to exactly one approval attempt and session in the future outer admissibility checkpoint |",
  "| 15 | `OPTION_A` | exact Human Review reviewer-role contract identity and version use `contract_id` and `contract_version` |",
  "| 16 | `OPTION_A` | one required `reviewer_role_evidence_ref` in the new `rre_` namespace identifies the approval-specific evidence object |",
  "| 17 | `OPTION_A` | required `actor_role_binding_evidence_ref` uses generic opaque-reference semantics and equals the actor-role-binding candidate's `evidenceId` |",
  "| 18 | `OPTION_A` | required `role_permission_policy_evidence_ref` equals both the actor-role binding's `policyEvidenceRef` and the policy candidate's `evidenceId` |",
  "| 19 | `OPTION_A` | required `binding_issuer_ref` and `binding_provenance_ref` declare the source of the approval-specific wrapper binding without proving trust |",
  "| 20 | `OPTION_A` | one required three-value declared reviewer-role binding lifecycle is separate from generic binding lifecycle, policy lifecycle, verified lifecycle, and currentness |",
  "| 21 | `OPTION_A` | the root is one exact closed fourteen-field scalar object with no optional, extension, duplicated RBAC, or duplicated policy fields |",
  "| 22 | `OPTION_A` | eight internal references are pairwise distinct while separately selected external bindings use exact case-sensitive string equality |",
  "| 23 | `OPTION_A` | strict flat no-raw, no-credential, no-nested-evidence, no-authority, no-conclusion, and no-free-text posture |",
  "| 24 | `OPTION_A` | exactly one wrapper, one actor-role-binding candidate, and one policy candidate are supplied in the same call; arrays, alternatives, lookup, discovery, and persistence reads are prohibited |",
];

const rootFields = [
  "1. `contract_id`",
  "2. `contract_version`",
  "3. `reviewer_role_evidence_ref`",
  "4. `approval_ref`",
  "5. `review_session_ref`",
  "6. `reviewer_ref`",
  "7. `reviewer_role`",
  "8. `actor_role_binding_evidence_ref`",
  "9. `role_permission_policy_evidence_ref`",
  "10. `binding_issuer_ref`",
  "11. `binding_provenance_ref`",
  "12. `binding_lifecycle_posture`",
  "13. `verification_posture`",
  "14. `human_professional_review_required`",
];

const rootTable = [
  "| Field | Exact structural contract |",
  "| --- | --- |",
  "| `contract_id` | string equal to `human_review.controlled_handoff_human_professional_approval_reviewer_role_evidence` |",
  "| `contract_version` | string equal to `1.0.0` |",
  "| `reviewer_role_evidence_ref` | opaque string matching `^rre_[a-z0-9][a-z0-9_-]{0,59}$` |",
  "| `approval_ref` | opaque string matching `^apr_[a-z0-9][a-z0-9_-]{0,59}$` |",
  "| `review_session_ref` | opaque string matching `^rvs_[a-z0-9][a-z0-9_-]{0,59}$` |",
  "| `reviewer_ref` | opaque string matching `^rvr_[a-z0-9][a-z0-9_-]{0,59}$` |",
  "| `reviewer_role` | one exact value from Section 7 |",
  "| `actor_role_binding_evidence_ref` | one exact generic opaque reference from Section 5 |",
  "| `role_permission_policy_evidence_ref` | one exact generic opaque reference from Section 5 |",
  "| `binding_issuer_ref` | one exact generic opaque reference from Section 5 |",
  "| `binding_provenance_ref` | one exact generic opaque reference from Section 5 |",
  "| `binding_lifecycle_posture` | one exact value from Section 9 |",
  "| `verification_posture` | string equal to `NOT_VERIFIED_BY_CONTRACT` |",
  "| `human_professional_review_required` | boolean equal to `true` |",
];

const reviewerIdentityFields = [
  "contract_id",
  "contract_version",
  "reviewer_identity_evidence_ref",
  "approval_ref",
  "review_session_ref",
  "reviewer_ref",
  "actor_identity_evidence_ref",
  "binding_issuer_ref",
  "binding_provenance_ref",
  "binding_lifecycle_posture",
  "verification_posture",
  "human_professional_review_required",
];

const actorRoleBindingRequiredFields = [
  "contractVersion",
  "evidenceKind",
  "verificationPosture",
  "evidenceId",
  "bindingId",
  "bindingVersion",
  "bindingIssuerRef",
  "bindingProvenanceRef",
  "bindingLifecyclePosture",
  "actorIdentityEvidenceKind",
  "actorIdentityEvidenceContractVersion",
  "actorIdentityEvidenceRef",
  "policyEvidenceKind",
  "policyEvidenceContractVersion",
  "policyEvidenceRef",
  "policyId",
  "policyVersion",
  "roleId",
  "roleDefinitionVersion",
  "humanProfessionalReviewRequired",
];

const actorRoleBindingOpaqueReferenceFields = [
  "evidenceId",
  "bindingId",
  "bindingVersion",
  "bindingIssuerRef",
  "bindingProvenanceRef",
  "actorIdentityEvidenceRef",
  "policyEvidenceRef",
  "policyId",
  "policyVersion",
  "roleId",
  "roleDefinitionVersion",
];

const policyTopLevelFields = [
  "contractVersion",
  "evidenceKind",
  "evidenceId",
  "policyId",
  "policyVersion",
  "policyProvenanceRef",
  "policyLifecyclePosture",
  "defaultEffectDeclaration",
  "denyPrecedence",
  "wildcardsAllowed",
  "humanProfessionalReviewRequired",
  "roleDefinitions",
  "permissionDefinitions",
];

test("canonical sources and all twenty-four Owner-selected stages are frozen", () => {
  const docsText = readRequired(docsPath);
  const sources = sectionBetween(
    docsText,
    "## 2. Canonical Sources And Precedent Boundary",
    "## 3.",
  );
  const stages = sectionBetween(
    docsText,
    "## 3. Twenty-Four Owner-Selected Stages",
    "## 4.",
  );

  assert.deepEqual(
    bulletLines(sources),
    controllingPaths.map((controllingPath) => `- \`${controllingPath}\``),
  );
  for (const controllingPath of controllingPaths) {
    readRequired(controllingPath);
  }

  assert.deepEqual(tableLines(stages), expectedStageTable);
  const stageMarkers = docsText.match(/OWNER_SELECTED_STAGE_[0-9]+_OPTION_A/gmu) ?? [];
  assert.deepEqual(
    stageMarkers,
    Array.from(
      { length: 24 },
      (_, index) => `OWNER_SELECTED_STAGE_${index + 1}_OPTION_A`,
    ),
  );
  assert.match(docsText, /OWNER_SELECTED_STAGE_COUNT:\n24/u);
  assert.match(docsText, /OPEN_CONTRACT_SEMANTIC_DECISION_COUNT:\n0/u);
  assert.match(
    docsText,
    /OWNER_SELECTED_TWENTY_FOUR_STAGE_SEMANTICS_TRANSLATED/u,
  );
  assert.match(stages, /is not schema, validator, runtime,/u);
});

test("historical contract absence and current docs-only transition remain distinct", () => {
  const docsText = readRequired(docsPath);
  const identityBoundary = readRequired(
    "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_IDENTITY_EVIDENCE_CONTRACT_BOUNDARY_v1.md",
  );
  const crossReferenceBoundary = readRequired(
    "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_CROSS_REFERENCE_ADMISSIBILITY_SEMANTICS_BOUNDARY_v1.md",
  );
  const precedent = sectionBetween(
    docsText,
    "## 2. Canonical Sources And Precedent Boundary",
    "## 3.",
  );

  assert.match(identityBoundary, /REVIEWER_ROLE_CONTRACT_NOT_CREATED/u);
  assert.match(
    crossReferenceBoundary,
    /REVIEWER_EVIDENCE_CONTRACTS_STATUS:\nABSENT_AND_IMPLEMENTATION_BLOCKING/u,
  );
  for (const marker of [
    "HISTORICAL_REVIEWER_ROLE_CONTRACT_ABSENCE_PRESERVED:\nYES",
    "CURRENT_REVIEWER_ROLE_CONTRACT_SEMANTICS_STATUS:\nDOCS_ONLY_FROZEN_AFTER_MERGE",
    "CURRENT_REVIEWER_ROLE_SCHEMA_VALIDATOR_RUNTIME_STATUS:\nABSENT_AND_IMPLEMENTATION_BLOCKING",
    "CURRENT_REVIEWER_AUTHORITY_CONTRACT_STATUS:\nABSENT_AND_IMPLEMENTATION_BLOCKING",
    "CURRENT_APPROVAL_ADMISSIBILITY_STATUS:\nNOT_CREATED_AND_IMPLEMENTATION_BLOCKING",
  ]) {
    assert.equal(precedent.includes(marker), true, marker);
  }
  assert.match(precedent, /remain preserved historical statements/u);
  assert.match(precedent, /only the current absence/u);
  assert.match(precedent, /historical text is not rewritten/u);
});

test("exact contract identity and complete fourteen-field root are frozen", () => {
  const docsText = readRequired(docsPath);
  const root = sectionBetween(
    docsText,
    "## 4. Contract Identity And Exact Root Shape",
    "## 5.",
  );

  assert.match(
    root,
    /CONTRACT_ID:\nhuman_review\.controlled_handoff_human_professional_approval_reviewer_role_evidence/u,
  );
  assert.match(root, /CONTRACT_VERSION:\n1\.0\.0/u);
  assert.match(root, /TOP_LEVEL_FIELD_COUNT:\n14/u);
  assert.deepEqual(numberedLines(root), rootFields);
  assert.deepEqual(tableLines(root), rootTable);
  assert.match(root, /prototype is exactly\n`Object\.prototype` or `null`/u);
  const closedRoot = sectionBetween(
    root,
    "No field is optional.",
    "The wrapper does not duplicate",
  );
  assert.equal(
    normalizeWhitespace(closedRoot),
    "No field is optional. Unknown string or symbol keys, aliases, accessors, null field values, nested values, and extension fields are prohibited. Dates, maps, sets, regular expressions, functions, arrays, and other non-scalar wrapper field values are invalid.",
  );
  assert.match(root, /does not duplicate `bindingId`, `bindingVersion`/u);
});

test("same-call candidate family and opaque-reference vocabulary are exact", () => {
  const docsText = readRequired(docsPath);
  const bindingSource = readRequired(
    "packages/governance/src/rbac-actor-role-binding-evidence-contract.js",
  );
  const policySource = readRequired(
    "packages/governance/src/rbac-role-permission-policy-evidence-contract.js",
  );
  const dependencies = sectionBetween(
    docsText,
    "## 5. Direct Generic Dependencies And Same-Call Family",
    "## 6.",
  );
  const candidates = sectionBetween(
    dependencies,
    "receives exactly three directly\nsupplied values in the same call:",
    "APPROVAL_SPECIFIC_REVIEWER_ROLE_EVIDENCE_CANDIDATE_COUNT:",
  );
  const wrapperReferences = sectionBetween(
    dependencies,
    "The four generic-style wrapper references are:",
    "Each is a string",
  );
  const schemes = sectionBetween(
    dependencies,
    "The dangerous scheme prefixes are:",
    "No array",
  );

  assert.deepEqual(numberedLines(candidates), [
    "1. one approval-specific reviewer-role wrapper",
    "2. one candidate under `RBAC_ACTOR_ROLE_BINDING_EVIDENCE_CONTRACT`",
    "3. one candidate under `RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_CONTRACT`",
  ]);
  assert.deepEqual(numberedLines(wrapperReferences), [
    "1. `actor_role_binding_evidence_ref`",
    "2. `role_permission_policy_evidence_ref`",
    "3. `binding_issuer_ref`",
    "4. `binding_provenance_ref`",
  ]);
  assert.deepEqual(numberedLines(schemes), [
    "1. `http:`",
    "2. `https:`",
    "3. `ftp:`",
    "4. `file:`",
    "5. `mailto:`",
    "6. `data:`",
    "7. `javascript:`",
  ]);
  assert.match(
    dependencies,
    /DANGEROUS_SCHEME_PREFIX_COMPARISON:\nASCII_CASE_INSENSITIVE/u,
  );
  for (const mixedCasePrefix of ["HTTP:", "Https:", "FILE:", "JavaScript:"]) {
    assert.equal(
      dependencies.includes(`\`${mixedCasePrefix}\``),
      true,
      mixedCasePrefix,
    );
  }
  for (const source of [bindingSource, policySource]) {
    assert.equal(
      source.includes("/^(?:https?|ftp|file|mailto|data|javascript):/i;"),
      true,
    );
  }
  assert.match(
    dependencies,
    /APPROVAL_SPECIFIC_REVIEWER_ROLE_EVIDENCE_CANDIDATE_COUNT:\n1/u,
  );
  assert.match(
    dependencies,
    /GENERIC_ACTOR_ROLE_BINDING_EVIDENCE_CANDIDATE_COUNT:\n1/u,
  );
  assert.match(
    dependencies,
    /GENERIC_ROLE_PERMISSION_POLICY_EVIDENCE_CANDIDATE_COUNT:\n1/u,
  );
  assert.equal(dependencies.includes("`^[A-Za-z0-9._:-]{1,128}$`"), true);
  assert.match(
    dependencies,
    /LOOKUP_DEREFERENCE_DISCOVERY_OR_PERSISTENCE:\nPROHIBITED/u,
  );
  assert.match(dependencies, /remain\s+separate sibling families/u);
});

test("controlling approval identity and RBAC contract surfaces are exact", () => {
  assert.deepEqual(approvalSchema.$defs.reviewerAttribution, {
    type: "object",
    additionalProperties: false,
    required: [
      "reviewer_ref",
      "reviewer_role",
      "reviewer_authority_evidence_ref",
    ],
    properties: {
      reviewer_ref: {
        type: "string",
        pattern: "^rvr_[a-z0-9][a-z0-9_-]{0,59}$",
      },
      reviewer_role: {
        type: "string",
        enum: ["HUMAN_REVIEWER", "PROFESSIONAL_REVIEWER"],
      },
      reviewer_authority_evidence_ref: {
        type: "string",
        pattern: "^rae_[a-z0-9][a-z0-9_-]{0,59}$",
      },
    },
  });

  assert.deepEqual(reviewerIdentitySchema.required, reviewerIdentityFields);
  assert.deepEqual(
    Object.keys(reviewerIdentitySchema.properties),
    reviewerIdentityFields,
  );
  assert.equal(
    reviewerIdentitySchema.properties.reviewer_ref.pattern,
    "^rvr_[a-z0-9][a-z0-9_-]{0,59}$",
  );
  assert.equal(
    reviewerIdentitySchema.properties.actor_identity_evidence_ref.pattern,
    "^[A-Za-z0-9._:-]{1,128}$",
  );

  assert.deepEqual(RBAC_ACTOR_ROLE_BINDING_EVIDENCE_CONTRACT_IDENTITY, {
    contractName: "RBAC_ACTOR_ROLE_BINDING_EVIDENCE_CONTRACT",
    version: "v1",
    evidenceKind: "RBAC_ACTOR_ROLE_BINDING_EVIDENCE",
  });
  assert.deepEqual(RBAC_ACTOR_ROLE_BINDING_EVIDENCE_DEPENDENCY_DECLARATIONS, {
    actorIdentityEvidenceKind: "AUTHENTICATED_ACTOR_IDENTITY_EVIDENCE",
    actorIdentityEvidenceContractVersion: "v1",
    policyEvidenceKind: "RBAC_ROLE_PERMISSION_POLICY_EVIDENCE",
    policyEvidenceContractVersion: "v1",
  });
  assert.deepEqual(
    RBAC_ACTOR_ROLE_BINDING_EVIDENCE_REQUIRED_FIELDS,
    actorRoleBindingRequiredFields,
  );
  assert.deepEqual(
    RBAC_ACTOR_ROLE_BINDING_EVIDENCE_OPAQUE_REFERENCE_FIELDS,
    actorRoleBindingOpaqueReferenceFields,
  );
  assert.deepEqual(RBAC_ACTOR_ROLE_BINDING_EVIDENCE_LIFECYCLE_POSTURES, [
    "ACTOR_ROLE_BINDING_DECLARED_ACTIVE",
    "ACTOR_ROLE_BINDING_DECLARED_INACTIVE",
    "ACTOR_ROLE_BINDING_DECLARED_REVOKED",
  ]);

  assert.deepEqual(RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_CONTRACT_IDENTITY, {
    contractName: "RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_CONTRACT",
    version: "v1",
    evidenceKind: "RBAC_ROLE_PERMISSION_POLICY_EVIDENCE",
  });
  assert.deepEqual(
    RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_TOP_LEVEL_FIELDS,
    policyTopLevelFields,
  );
  assert.deepEqual(RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_ROLE_DEFINITION_FIELDS, [
    "roleId",
    "roleCategory",
    "definitionVersion",
    "provenanceRef",
    "descriptionRef",
  ]);
  assert.deepEqual(RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_ROLE_CATEGORIES, [
    "HUMAN_REVIEW_ROLE_CATEGORY",
    "PROFESSIONAL_REVIEW_ROLE_CATEGORY",
    "ADMIN_ROLE_CATEGORY",
    "SUPPORT_ROLE_CATEGORY",
    "SYSTEM_INTERNAL_ROLE_CATEGORY",
  ]);
  assert.deepEqual(RBAC_ROLE_PERMISSION_POLICY_LIFECYCLE_POSTURES, [
    "DECLARED_ACTIVE",
    "DECLARED_INACTIVE",
    "DECLARED_REVOKED",
  ]);
});

test("complete local dependency relation and generic precedent are frozen", () => {
  const docsText = readRequired(docsPath);
  const bindingSource = readRequired(
    "packages/governance/src/rbac-actor-role-binding-evidence-contract.js",
  );
  const policySource = readRequired(
    "packages/governance/src/rbac-role-permission-policy-evidence-contract.js",
  );
  const local = sectionBetween(
    docsText,
    "## 6. Exact Local Dependency Bindings",
    "## 7.",
  );

  assert.deepEqual(numberedLines(local), [
    "1. wrapper `actor_role_binding_evidence_ref` equals actor-role-binding candidate `evidenceId`",
    "2. wrapper `role_permission_policy_evidence_ref` equals actor-role-binding candidate `policyEvidenceRef`",
    "3. wrapper `role_permission_policy_evidence_ref` equals policy candidate `evidenceId`",
    "4. actor-role-binding candidate `policyId` equals policy candidate `policyId`",
    "5. actor-role-binding candidate `policyVersion` equals policy candidate `policyVersion`",
    "6. actor-role-binding candidate `roleId` identifies exactly one policy `roleDefinitions` item with the same `roleId`",
    "7. actor-role-binding candidate `roleDefinitionVersion` equals that same role definition's `definitionVersion`",
  ]);
  assert.match(local, /EXACT_LOCAL_DEPENDENCY_BINDING_COUNT:\n7/u);
  assert.match(local, /No normalization, case folding/u);
  assert.match(local, /Selection by role category alone is prohibited/u);
  assert.match(
    local,
    /GENERIC_BINDING_VALIDITY_AS_APPROVAL_ROLE_ADMISSIBILITY:\nPROHIBITED/u,
  );
  assert.match(
    local,
    /GENERIC_POLICY_VALIDITY_AS_APPROVAL_ROLE_ADMISSIBILITY:\nPROHIBITED/u,
  );

  for (const field of [
    "evidenceId",
    "actorIdentityEvidenceRef",
    "policyEvidenceRef",
    "policyId",
    "policyVersion",
    "roleId",
    "roleDefinitionVersion",
  ]) {
    assert.equal(bindingSource.includes(`"${field}"`), true, field);
  }
  for (const field of [
    "evidenceId",
    "policyId",
    "policyVersion",
    "roleDefinitions",
    "roleId",
    "roleCategory",
    "definitionVersion",
  ]) {
    assert.equal(policySource.includes(`"${field}"`), true, field);
  }
  assert.match(policySource, /seenRoleIds/u);
  assert.match(policySource, /"DUPLICATE_VALUE"/u);
});

test("role-category mapping and qualification separation are complete", () => {
  const docsText = readRequired(docsPath);
  const mapping = sectionBetween(
    docsText,
    "## 7. Exact Reviewer Role Mapping And Qualification Separation",
    "## 8.",
  );

  assert.deepEqual(tableLines(mapping), [
    "| Approval `reviewer_role` | Required matched policy `roleCategory` |",
    "| --- | --- |",
    "| `HUMAN_REVIEWER` | `HUMAN_REVIEW_ROLE_CATEGORY` |",
    "| `PROFESSIONAL_REVIEWER` | `PROFESSIONAL_REVIEW_ROLE_CATEGORY` |",
  ]);
  assert.match(mapping, /REVIEWER_ROLE_ENUM_COUNT:\n2/u);
  assert.match(mapping, /REVIEWER_ROLE_CATEGORY_MAPPING_COUNT:\n2/u);
  for (const category of [
    "ADMIN_ROLE_CATEGORY",
    "SUPPORT_ROLE_CATEGORY",
    "SYSTEM_INTERNAL_ROLE_CATEGORY",
  ]) {
    assert.equal(mapping.includes(`\`${category}\``), true, category);
  }
  assert.match(mapping, /ROLE_ID_AS_REVIEWER_ROLE:\nPROHIBITED/u);
  assert.match(
    mapping,
    /ROLE_CATEGORY_AS_PROFESSIONAL_QUALIFICATION:\nPROHIBITED/u,
  );
  assert.match(
    mapping,
    /PROFESSIONAL_QUALIFICATION_VERIFICATION:\nNOT_CREATED_AND_IMPLEMENTATION_BLOCKING/u,
  );
  assert.match(mapping, /not inspected, copied, compared, resolved, verified/u);
});

test("future outer cross-family bindings are exact and locally non-interfering", () => {
  const docsText = readRequired(docsPath);
  const outer = sectionBetween(
    docsText,
    "## 8. Future Outer Approval And Identity Cross-References",
    "## 9.",
  );
  const relations = sectionBetween(
    outer,
    "checkpoint:",
    "EXACT_FUTURE_OUTER_CROSS_REFERENCE_COUNT:",
  );
  const patterns = sectionBetween(
    outer,
    "The wrapper reference patterns remain exactly:",
    "No alias",
  );

  assert.deepEqual(numberedLines(relations), [
    "1. wrapper `approval_ref` equals `approval_candidate.approval_ref`",
    "2. wrapper `review_session_ref` equals `approval_candidate.review_session_ref`",
    "3. wrapper `reviewer_ref` equals `approval_candidate.reviewer_attribution.reviewer_ref`",
    "4. wrapper `reviewer_role` equals `approval_candidate.reviewer_attribution.reviewer_role`",
    "5. actor-role-binding candidate `actorIdentityEvidenceRef` equals reviewer identity candidate `actor_identity_evidence_ref`",
  ]);
  assert.deepEqual(numberedLines(patterns), [
    "1. `approval_ref` matches `^apr_[a-z0-9][a-z0-9_-]{0,59}$`",
    "2. `review_session_ref` matches `^rvs_[a-z0-9][a-z0-9_-]{0,59}$`",
    "3. `reviewer_ref` matches `^rvr_[a-z0-9][a-z0-9_-]{0,59}$`",
  ]);
  assert.match(outer, /EXACT_FUTURE_OUTER_CROSS_REFERENCE_COUNT:\n5/u);
  assert.match(outer, /not generic `actorIdentityEvidenceRef`/u);
  assert.match(
    outer,
    /OUTER_APPROVAL_ROLE_CROSS_REFERENCE_CHECKPOINT:\nNOT_CREATED_AND_IMPLEMENTATION_BLOCKING/u,
  );
  assert.match(outer, /does not modify the approval candidate/u);
});

test("issuer provenance lifecycle verification and currentness remain separate", () => {
  const docsText = readRequired(docsPath);
  const lifecycle = sectionBetween(
    docsText,
    "## 9. Binding Issuer, Provenance, Lifecycle, And Verification",
    "## 10.",
  );

  assert.deepEqual(numberedLines(lifecycle), [
    "1. `REVIEWER_ROLE_BINDING_DECLARED_ACTIVE`",
    "2. `REVIEWER_ROLE_BINDING_DECLARED_INACTIVE`",
    "3. `REVIEWER_ROLE_BINDING_DECLARED_REVOKED`",
  ]);
  assert.match(lifecycle, /BINDING_LIFECYCLE_POSTURE_COUNT:\n3/u);
  assert.match(lifecycle, /VERIFICATION_POSTURE_COUNT:\n1/u);
  assert.match(lifecycle, /`NOT_VERIFIED_BY_CONTRACT`/u);
  assert.match(lifecycle, /Neither reference proves issuer identity/u);
  assert.match(lifecycle, /need not equal the generic actor-role binding's/u);
  assert.match(lifecycle, /remain three separate declarations/u);
  assert.match(
    lifecycle,
    /TRUSTED_TIME_CURRENTNESS_EVALUATION:\nNOT_CREATED_AND_IMPLEMENTATION_BLOCKING/u,
  );
});

test("complete reference list and same-call cardinality remain fail-closed", () => {
  const docsText = readRequired(docsPath);
  const references = sectionBetween(
    docsText,
    "## 10. Reference Distinctness And Same-Call Cardinality",
    "## 11.",
  );

  assert.deepEqual(numberedLines(references), [
    "1. `reviewer_role_evidence_ref`",
    "2. `approval_ref`",
    "3. `review_session_ref`",
    "4. `reviewer_ref`",
    "5. `actor_role_binding_evidence_ref`",
    "6. `role_permission_policy_evidence_ref`",
    "7. `binding_issuer_ref`",
    "8. `binding_provenance_ref`",
  ]);
  assert.match(references, /PAIRWISE_DISTINCT_INTERNAL_REFERENCE_COUNT:\n8/u);
  assert.match(references, /exactly one wrapper, exactly one/u);
  assert.match(references, /performs no lookup, dereference, discovery/u);
  assert.match(
    references,
    /remain\s+separate outer-checkpoint dependencies/u,
  );
});

test("privacy structural limits and deferred ownership are complete", () => {
  const docsText = readRequired(docsPath);
  const privacy = sectionBetween(
    docsText,
    "## 11. Privacy, Closed Shape, And Shadow-Semantics Prohibition",
    "## 12.",
  );
  const validity = sectionBetween(
    docsText,
    "## 12. Structural Validity And Separate Future Admissibility",
    "## 13.",
  );
  const deferred = sectionBetween(
    docsText,
    "## 13. Deferred Ownership And Separate Future Prerequisites",
    "## 14.",
  );

  assert.deepEqual(bulletLines(privacy), [
    "- person name, email address, account identifier, organization, title, or jurisdiction",
    "- raw content, raw source, private fact, source excerpt, source locator, URL, file name, file path, provider payload, or case material",
    "- token, JWT, certificate, credential, password, secret, signature, licence, qualification payload, or authentication payload",
    "- inline or nested actor-role-binding, policy, identity, qualification, authority, or other evidence candidate",
    "- duplicated `bindingId`, `policyId`, `policyVersion`, `roleId`, `roleDefinitionVersion`, `roleCategory`, role definition, or policy content",
    "- permission, scope, grant, role assignment, authority, approval effect, eligibility, release status, or access decision",
    "- finding, score, severity, recommendation, conclusion, explanation, note, description, or free text",
  ]);
  assert.match(privacy, /exact fourteen fields in Section 4 are the complete/u);
  const descriptorBoundary = sectionBetween(
    privacy,
    "Unknown keys remain invalid",
  );
  assert.equal(
    normalizeWhitespace(descriptorBoundary),
    "Unknown keys remain invalid even when their values appear harmless. Structural validation must inspect own property descriptors without invoking accessors, must not mutate the wrapper or supplied candidates, and must not echo rejected values, evidence, policy content, role definitions, or diagnostics.",
  );

  assert.deepEqual(numberedLines(validity), [
    "1. that the reviewer or any referenced record exists",
    "2. that the reviewer identity is authentic or bound to the actor",
    "3. that the actor-role binding is authoritative, assigned, or current",
    "4. that the policy issuer, policy provenance, or role definition is trusted",
    "5. that the reviewer is professionally qualified or licensed",
    "6. that reviewer authority, permission, scope, or independence exists",
    "7. that any lifecycle, expiry, revocation, supersession, or currentness check passed",
    "8. that the approval candidate and reviewer identity cross-references passed",
    "9. that the approval candidate is admissible or eligible",
    "10. that handoff, export, delivery, release, product use, or external use is authorized",
  ]);
  assert.match(validity, /must stop closed/u);
  assert.match(validity, /No structural validator result shape/u);

  assert.deepEqual(numberedLines(deferred), [
    "1. reviewer authority evidence contract semantics",
    "2. professional qualification evidence and verification semantics",
    "3. identity, role, authority, and same-attempt outer admissibility integration",
    "4. trusted clock, freshness, lifecycle, currentness, and replacement semantics",
    "5. exact outer admissibility-envelope field map",
    "6. reviewer-role JSON Schema ownership and exact schema path",
    "7. validator-result semantics and schema ownership",
    "8. package export ownership and names",
    "9. validator-helper ownership, error semantics, and runtime path",
    "10. approval admissibility checkpoint integration and consumer selection",
  ]);
  for (const marker of [
    "FUTURE_SCHEMA_PATH:\nDEFERRED_TO_SEPARATE_OWNER_DECISION",
    "FUTURE_VALIDATOR_RESULT_SCHEMA_PATH:\nDEFERRED_TO_SEPARATE_OWNER_DECISION",
    "FUTURE_PACKAGE_EXPORT_OWNERSHIP:\nDEFERRED_TO_SEPARATE_OWNER_DECISION",
    "FUTURE_VALIDATOR_CODE_OWNERSHIP:\nDEFERRED_TO_SEPARATE_OWNER_DECISION",
    "FUTURE_OUTER_CHECKPOINT_OWNERSHIP:\nDEFERRED_TO_SEPARATE_OWNER_DECISION",
    "CURRENT_SAFE_SCHEMA_OR_RUNTIME_STEP:\nNONE",
  ]) {
    assert.equal(deferred.includes(marker), true, marker);
  }
  assert.match(deferred, /No future path, export, helper/u);
});

test("exact two-file scope all non-effects and proof boundary are frozen", () => {
  const docsText = readRequired(docsPath);
  const scope = sectionBetween(
    docsText,
    "## 14. Exact Two-File Docs-Only Slice",
    "## 15.",
  );
  const proof = sectionBetween(docsText, "## 16. Proof Boundary", "## 17.");
  const finalBoundary = sectionBetween(
    docsText,
    "## 17. Final No-Conclusion Boundary",
  );

  assert.deepEqual(numberedLines(scope), [
    `1. \`${docsPath}\``,
    `2. \`${proofPath}\``,
  ]);
  for (const marker of [
    "CURRENT_SLICE_FILE_COUNT:\n2",
    "CURRENT_SLICE_DOC_FILE_COUNT:\n1",
    "CURRENT_SLICE_FOCUSED_PROOF_FILE_COUNT:\n1",
    "CURRENT_SLICE_SCHEMA_FILE_COUNT:\n0",
    "CURRENT_SLICE_PACKAGE_EXPORT_COUNT:\n0",
    "CURRENT_SLICE_RUNTIME_FILE_COUNT:\n0",
  ]) {
    assert.equal(scope.includes(marker), true, marker);
  }
  assert.match(scope, /No existing tracked file is modified/u);

  for (const marker of [
    "SCHEMA_CREATED_BY_THIS_SLICE:\nNO",
    "VALIDATOR_RESULT_SCHEMA_CREATED_BY_THIS_SLICE:\nNO",
    "PACKAGE_EXPORT_CREATED_BY_THIS_SLICE:\nNO",
    "VALIDATOR_OR_RUNTIME_CREATED_BY_THIS_SLICE:\nNO",
    "REVIEWER_IDENTITY_VERIFIED_BY_THIS_SLICE:\nNO",
    "REVIEWER_ROLE_VERIFIED_BY_THIS_SLICE:\nNO",
    "PROFESSIONAL_QUALIFICATION_VERIFIED_BY_THIS_SLICE:\nNO",
    "REVIEWER_AUTHORITY_CREATED_BY_THIS_SLICE:\nNO",
    "POLICY_AUTHORITY_OR_CURRENTNESS_CREATED_BY_THIS_SLICE:\nNO",
    "APPROVAL_ADMISSIBILITY_OR_ELIGIBILITY_CREATED_BY_THIS_SLICE:\nNO",
    "PERSISTENCE_API_UI_OR_AUDIT_CREATED_BY_THIS_SLICE:\nNO",
    "RAW_PRIVATE_SOURCE_OR_REAL_EVIDENCE_PROCESSED_BY_THIS_SLICE:\nNO",
  ]) {
    assert.equal(docsText.includes(marker), true, marker);
  }

  assert.deepEqual(numberedLines(proof), [
    "1. the twenty-four Owner-selected documentation decisions",
    "2. the exact contract identity and fourteen-field closed root",
    "3. the exact local three-candidate topology and relationship bindings",
    "4. the exact two-row reviewer-role and role-category mapping",
    "5. the future outer approval and reviewer-identity cross-reference partition",
    "6. issuer, provenance, lifecycle, verification, and currentness separation",
    "7. pairwise distinctness, privacy, deferred ownership, and non-effect markers",
    "8. this exact two-file docs-only scope",
  ]);
  assert.match(proof, /PROOF_CLASSIFICATION:\nSYNTHETIC_DOC_BOUNDARY_ONLY/u);
  assert.match(
    proof,
    /PROOF_RESULT:\nDOCS_ONLY_REVIEWER_ROLE_EVIDENCE_SEMANTICS_FROZEN_IMPLEMENTATION_REMAINS_FAIL_CLOSED/u,
  );

  const expectedConclusion =
    "This tracked artifact is not human review, professional review, legal review, evidentiary review, identity verification, role verification, professional qualification verification, authority verification, technical sign-off, governance evidence, compliance certification, product authorization, external-use authorization, implementation readiness, source-truth evidence, chain-of-custody proof, or a case-truth conclusion.";
  const conclusionText = sectionBetween(
    finalBoundary,
    "This tracked artifact",
    "FINAL_SAFE_ACTION:",
  );
  assert.equal(normalizeWhitespace(conclusionText), expectedConclusion);
  assert.match(
    finalBoundary,
    /FINAL_SAFE_ACTION:\nPAUSE_UNTIL_SEPARATELY_AUTHORIZED_REVIEWER_ROLE_SCHEMA_SCAFFOLD_DECISION_OR_REVIEWER_AUTHORITY_SEMANTICS/u,
  );
  assert.match(docsText, /PRODUCT_CANDIDATE_NONE/u);
  assert.match(docsText, /EXTERNAL_USE_NOT_AUTHORIZED/u);
  assert.match(docsText, /HUMAN_PROFESSIONAL_REVIEW_REQUIRED/u);
});
