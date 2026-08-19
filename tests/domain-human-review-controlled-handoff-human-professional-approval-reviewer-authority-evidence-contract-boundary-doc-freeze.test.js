"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const approvalSchema = require("../schemas/human-review-controlled-handoff-human-professional-approval.json");
const reviewerRoleSchema = require("../schemas/human-review-controlled-handoff-human-professional-approval-reviewer-role-evidence.json");
const {
  RBAC_ACTOR_ROLE_BINDING_EVIDENCE_CONTRACT_IDENTITY,
  RBAC_ACTOR_ROLE_BINDING_EVIDENCE_REQUIRED_FIELDS,
} = require("../packages/governance/src/rbac-actor-role-binding-evidence-contract.js");
const {
  RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_BINDING_LIFECYCLE_POSTURES,
  RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_CONTRACT_IDENTITY,
  RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_TOP_LEVEL_FIELDS,
  RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_VERIFICATION_POSTURES,
} = require("../packages/governance/src/rbac-role-permission-binding-evidence-contract.js");
const {
  RBAC_ROLE_PERMISSION_POLICY_EFFECT_DECLARATIONS,
  RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_CONTRACT_IDENTITY,
  RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_PERMISSION_CATEGORIES,
  RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_PERMISSION_DEFINITION_FIELDS,
  RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_ROLE_CATEGORIES,
  RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_ROLE_DEFINITION_FIELDS,
  RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_TOP_LEVEL_FIELDS,
  RBAC_ROLE_PERMISSION_POLICY_LIFECYCLE_POSTURES,
} = require("../packages/governance/src/rbac-role-permission-policy-evidence-contract.js");
const {
  permissionCategoryRegistry,
} = require("../packages/governance/src/rbac-role-permission-deny-by-default-scaffold.js");

const repoRoot = path.join(__dirname, "..");
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_AUTHORITY_EVIDENCE_CONTRACT_BOUNDARY_v1.md";
const proofPath =
  "tests/domain-human-review-controlled-handoff-human-professional-approval-reviewer-authority-evidence-contract-boundary-doc-freeze.test.js";
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
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_ROLE_EVIDENCE_CONTRACT_BOUNDARY_v1.md",
  "schemas/human-review-controlled-handoff-human-professional-approval-reviewer-role-evidence.json",
  "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-reviewer-role-evidence-validator.js",
  "tests/human-review-controlled-handoff-human-professional-approval-reviewer-role-evidence-validator.test.js",
  "packages/governance/src/rbac-actor-role-binding-evidence-contract.js",
  "tests/rbac-actor-role-binding-evidence-contract.test.js",
  "packages/governance/src/rbac-role-permission-binding-evidence-contract.js",
  "tests/rbac-role-permission-binding-evidence-contract.test.js",
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
  return text.split("\n").filter((line) => line.startsWith("|"));
}

function bulletLines(text) {
  return text.split("\n").filter((line) => line.startsWith("- "));
}

function normalizeWhitespace(text) {
  return text.trim().replace(/\s+/gu, " ");
}

const expectedStageTable = [
  "| Stage | Selected option | Frozen docs-level result |",
  "| --- | --- | --- |",
  "| 1 | `OPTION_A` | one separate closed approval-specific reviewer authority evidence contract composes exactly one directly supplied generic RBAC role-permission-binding evidence candidate; generic validity is necessary but insufficient |",
  "| 2 | `OPTION_A` | one separate opaque dependency reference equals the generic role-permission-binding candidate's `evidenceId` exactly; `bindingId`, role, permission, and policy identifiers are not substituted |",
  "| 3 | `OPTION_A` | one required `reviewer_ref` uses the exact `rvr_` namespace and equals the approval candidate's reviewer reference with no alias, normalization, derivation, or lookup |",
  "| 4 | `OPTION_A` | one required `reviewer_role` is exactly `HUMAN_REVIEWER` or `PROFESSIONAL_REVIEWER` and equals the approval candidate's reviewer-role literal |",
  "| 5 | `OPTION_A` | the role-permission binding's `roleId` and `roleDefinitionVersion` equal the reviewer-role family's actor-role-binding values in the future outer checkpoint |",
  "| 6 | `OPTION_A` | generic `roleId` and `permissionId` remain separate opaque identifiers and neither becomes, derives, or overrides `reviewer_role` or the approval decision |",
  "| 7 | `OPTION_A` | exactly one directly supplied generic RBAC role-permission-policy candidate is required; generic policy validity is necessary but insufficient |",
  "| 8 | `OPTION_A` | the role-permission binding's `policyEvidenceRef` equals the directly supplied policy candidate's `evidenceId` exactly |",
  "| 9 | `OPTION_A` | the role-permission binding's `policyId` and `policyVersion` equal the policy candidate's exact values without fallback, aliasing, or version substitution |",
  "| 10 | `OPTION_A` | exactly one policy role definition matches both the role-permission binding's `roleId` and `roleDefinitionVersion` |",
  "| 11 | `OPTION_A` | exactly one policy permission definition matches both the role-permission binding's `permissionId` and `permissionDefinitionVersion` |",
  "| 12 | `OPTION_A` | the matched permission definition has exactly `CATEGORY_ONLY_REVIEW_PERMISSION` for both allowed approval reviewer roles |",
  "| 13 | `OPTION_A` | the matched permission definition has exactly `POLICY_EFFECT_ALLOW_DECLARATION`, which remains a declaration and creates no permission authority, access, or approval effect |",
  "| 14 | `OPTION_A` | the policy remains exact deny-by-default: `POLICY_EFFECT_DENY_DECLARATION`, `denyPrecedence` true, and `wildcardsAllowed` false |",
  "| 15 | `OPTION_A` | the approval-specific wrapper and generic role-permission binding remain exactly `NOT_VERIFIED_BY_CONTRACT`; structural consistency never becomes verified authority |",
  "| 16 | `OPTION_A` | required `approval_ref` and `review_session_ref` bind the evidence to exactly one approval attempt and session in the future outer admissibility checkpoint |",
  "| 17 | `OPTION_A` | exact Human Review reviewer-authority contract identity and version use `contract_id` and `contract_version` |",
  "| 18 | `OPTION_A` | one required `reviewer_authority_evidence_ref` in the exact `rae_` namespace identifies the approval-specific evidence object |",
  "| 19 | `OPTION_A` | required `role_permission_binding_evidence_ref` uses generic opaque-reference semantics and equals the role-permission-binding candidate's `evidenceId` |",
  "| 20 | `OPTION_A` | required `role_permission_policy_evidence_ref` equals both the role-permission binding's `policyEvidenceRef` and the policy candidate's `evidenceId` |",
  "| 21 | `OPTION_A` | required `binding_issuer_ref` and `binding_provenance_ref` declare the source of the approval-specific wrapper binding without proving trust |",
  "| 22 | `OPTION_A` | one required three-value declared reviewer-authority binding lifecycle is separate from generic binding lifecycle, policy lifecycle, verified lifecycle, and currentness |",
  "| 23 | `OPTION_A` | the root is one exact closed fourteen-field scalar object with no optional, extension, duplicated RBAC, duplicated policy, grant, or scope fields |",
  "| 24 | `OPTION_A` | eight internal references are pairwise distinct while separately selected external bindings use exact case-sensitive string equality |",
  "| 25 | `OPTION_A` | strict flat no-raw, no-credential, no-nested-evidence, no-grant, no-authority-conclusion, no-approval-effect, and no-free-text posture |",
  "| 26 | `OPTION_A` | the future outer checkpoint binds authority reference, approval, session, reviewer, role, role-definition version, and one exact shared policy candidate across the approval and reviewer-role families |",
  "| 27 | `OPTION_A` | exactly one wrapper, one role-permission-binding candidate, and one policy candidate are supplied in the same call; arrays, alternatives, lookup, discovery, and persistence reads are prohibited |",
];

const rootFields = [
  "1. `contract_id`",
  "2. `contract_version`",
  "3. `reviewer_authority_evidence_ref`",
  "4. `approval_ref`",
  "5. `review_session_ref`",
  "6. `reviewer_ref`",
  "7. `reviewer_role`",
  "8. `role_permission_binding_evidence_ref`",
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
  "| `contract_id` | string equal to `human_review.controlled_handoff_human_professional_approval_reviewer_authority_evidence` |",
  "| `contract_version` | string equal to `1.0.0` |",
  "| `reviewer_authority_evidence_ref` | opaque string matching `^rae_[a-z0-9][a-z0-9_-]{0,59}$` |",
  "| `approval_ref` | opaque string matching `^apr_[a-z0-9][a-z0-9_-]{0,59}$` |",
  "| `review_session_ref` | opaque string matching `^rvs_[a-z0-9][a-z0-9_-]{0,59}$` |",
  "| `reviewer_ref` | opaque string matching `^rvr_[a-z0-9][a-z0-9_-]{0,59}$` |",
  "| `reviewer_role` | one exact value from Section 7 |",
  "| `role_permission_binding_evidence_ref` | one exact generic opaque reference from Section 5 |",
  "| `role_permission_policy_evidence_ref` | one exact generic opaque reference from Section 5 |",
  "| `binding_issuer_ref` | one exact generic opaque reference from Section 5 |",
  "| `binding_provenance_ref` | one exact generic opaque reference from Section 5 |",
  "| `binding_lifecycle_posture` | one exact value from Section 9 |",
  "| `verification_posture` | string equal to `NOT_VERIFIED_BY_CONTRACT` |",
  "| `human_professional_review_required` | boolean equal to `true` |",
];

const reviewerRoleFields = [
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

const actorRoleBindingFields = [
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

const rolePermissionBindingFields = [
  "contractVersion",
  "evidenceKind",
  "verificationPosture",
  "evidenceId",
  "bindingId",
  "bindingVersion",
  "bindingIssuerRef",
  "bindingProvenanceRef",
  "bindingLifecyclePosture",
  "policyEvidenceKind",
  "policyEvidenceContractVersion",
  "policyEvidenceRef",
  "policyId",
  "policyVersion",
  "roleId",
  "roleDefinitionVersion",
  "permissionId",
  "permissionDefinitionVersion",
  "humanProfessionalReviewRequired",
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

test("canonical sources and all twenty-seven Owner-selected stages are frozen", () => {
  const docsText = readRequired(docsPath);
  const sources = sectionBetween(
    docsText,
    "## 2. Canonical Sources And Precedent Boundary",
    "## 3.",
  );
  const stages = sectionBetween(
    docsText,
    "## 3. Twenty-Seven Owner-Selected Stages",
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
      { length: 27 },
      (_, index) => `OWNER_SELECTED_STAGE_${index + 1}_OPTION_A`,
    ),
  );
  assert.match(docsText, /OWNER_SELECTED_STAGE_COUNT:\n27/u);
  assert.match(docsText, /OPEN_CONTRACT_SEMANTIC_DECISION_COUNT:\n0/u);
  assert.match(
    docsText,
    /OWNER_SELECTED_TWENTY_SEVEN_STAGE_SEMANTICS_TRANSLATED/u,
  );
  assert.match(stages, /is not schema, validator, runtime,/u);
});

test("historical authority absence and current docs-only transition remain distinct", () => {
  const docsText = readRequired(docsPath);
  const roleBoundary = readRequired(
    "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEWER_ROLE_EVIDENCE_CONTRACT_BOUNDARY_v1.md",
  );
  const crossReferenceBoundary = readRequired(
    "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_CROSS_REFERENCE_ADMISSIBILITY_SEMANTICS_BOUNDARY_v1.md",
  );
  const precedent = sectionBetween(
    docsText,
    "## 2. Canonical Sources And Precedent Boundary",
    "## 3.",
  );

  assert.match(roleBoundary, /REVIEWER_AUTHORITY_CONTRACT_NOT_CREATED/u);
  assert.match(
    crossReferenceBoundary,
    /REVIEWER_EVIDENCE_CONTRACTS_STATUS:\nABSENT_AND_IMPLEMENTATION_BLOCKING/u,
  );
  for (const marker of [
    "HISTORICAL_REVIEWER_AUTHORITY_CONTRACT_ABSENCE_PRESERVED:\nYES",
    "CURRENT_REVIEWER_AUTHORITY_CONTRACT_SEMANTICS_STATUS:\nDOCS_ONLY_FROZEN_AFTER_MERGE",
    "CURRENT_REVIEWER_AUTHORITY_SCHEMA_VALIDATOR_RUNTIME_STATUS:\nABSENT_AND_IMPLEMENTATION_BLOCKING",
    "CURRENT_PROFESSIONAL_QUALIFICATION_STATUS:\nABSENT_AND_IMPLEMENTATION_BLOCKING",
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
    /CONTRACT_ID:\nhuman_review\.controlled_handoff_human_professional_approval_reviewer_authority_evidence/u,
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
  for (const prohibitedField of [
    "permissionId",
    "permissionDefinitionVersion",
    "permissionCategory",
    "effectDeclaration",
  ]) {
    assert.equal(root.includes(`\`${prohibitedField}\``), true, prohibitedField);
  }
});

test("same-call candidate family and opaque-reference vocabulary are exact", () => {
  const docsText = readRequired(docsPath);
  const bindingSource = readRequired(
    "packages/governance/src/rbac-role-permission-binding-evidence-contract.js",
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
    "receives exactly three\ndirectly supplied values in the same call:",
    "APPROVAL_SPECIFIC_REVIEWER_AUTHORITY_EVIDENCE_CANDIDATE_COUNT:",
  );
  const wrapperReferences = sectionBetween(
    dependencies,
    "The four generic-style wrapper references are:",
    "Each is a string",
  );
  const schemes = sectionBetween(
    dependencies,
    "The dangerous scheme prefixes are:",
    "Dangerous scheme prefixes are compared",
  );

  assert.deepEqual(numberedLines(candidates), [
    "1. one approval-specific reviewer-authority wrapper",
    "2. one candidate under `RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_CONTRACT`",
    "3. one candidate under `RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_CONTRACT`",
  ]);
  assert.deepEqual(numberedLines(wrapperReferences), [
    "1. `role_permission_binding_evidence_ref`",
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
    /APPROVAL_SPECIFIC_REVIEWER_AUTHORITY_EVIDENCE_CANDIDATE_COUNT:\n1/u,
  );
  assert.match(
    dependencies,
    /GENERIC_ROLE_PERMISSION_BINDING_EVIDENCE_CANDIDATE_COUNT:\n1/u,
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
  assert.match(dependencies, /remain separate\nouter-checkpoint families/u);
});

test("controlling approval role and RBAC contract surfaces are exact", () => {
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

  assert.deepEqual(reviewerRoleSchema.required, reviewerRoleFields);
  assert.deepEqual(Object.keys(reviewerRoleSchema.properties), reviewerRoleFields);
  assert.deepEqual(reviewerRoleSchema.properties.reviewer_role.enum, [
    "HUMAN_REVIEWER",
    "PROFESSIONAL_REVIEWER",
  ]);

  assert.deepEqual(RBAC_ACTOR_ROLE_BINDING_EVIDENCE_CONTRACT_IDENTITY, {
    contractName: "RBAC_ACTOR_ROLE_BINDING_EVIDENCE_CONTRACT",
    version: "v1",
    evidenceKind: "RBAC_ACTOR_ROLE_BINDING_EVIDENCE",
  });
  assert.deepEqual(
    RBAC_ACTOR_ROLE_BINDING_EVIDENCE_REQUIRED_FIELDS,
    actorRoleBindingFields,
  );

  assert.deepEqual(RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_CONTRACT_IDENTITY, {
    contractName: "RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_CONTRACT",
    version: "v1",
    evidenceKind: "RBAC_ROLE_PERMISSION_BINDING_EVIDENCE",
  });
  assert.deepEqual(
    RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_TOP_LEVEL_FIELDS,
    rolePermissionBindingFields,
  );
  assert.deepEqual(
    RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_BINDING_LIFECYCLE_POSTURES,
    [
      "ROLE_PERMISSION_BINDING_DECLARED_ACTIVE",
      "ROLE_PERMISSION_BINDING_DECLARED_INACTIVE",
      "ROLE_PERMISSION_BINDING_DECLARED_REVOKED",
    ],
  );
  assert.deepEqual(
    RBAC_ROLE_PERMISSION_BINDING_EVIDENCE_VERIFICATION_POSTURES,
    ["NOT_VERIFIED_BY_CONTRACT"],
  );

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
  assert.deepEqual(
    RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_PERMISSION_DEFINITION_FIELDS,
    [
      "permissionId",
      "permissionCategory",
      "definitionVersion",
      "provenanceRef",
      "actionCategoryRef",
      "resourceCategoryRef",
      "materialClassRef",
      "scopeDimensions",
      "effectDeclaration",
    ],
  );
  assert.deepEqual(RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_ROLE_CATEGORIES, [
    "HUMAN_REVIEW_ROLE_CATEGORY",
    "PROFESSIONAL_REVIEW_ROLE_CATEGORY",
    "ADMIN_ROLE_CATEGORY",
    "SUPPORT_ROLE_CATEGORY",
    "SYSTEM_INTERNAL_ROLE_CATEGORY",
  ]);
  assert.deepEqual(RBAC_ROLE_PERMISSION_POLICY_EVIDENCE_PERMISSION_CATEGORIES, [
    "CATEGORY_ONLY_REVIEW_PERMISSION",
    "RAW_PRIVATE_SOURCE_MATERIAL_ACCESS",
    "SOURCE_PACKAGE_ACCESS",
    "PDF_IMAGE_SCREENSHOT_METADATA_ACCESS",
    "THIRD_PARTY_MODEL_API_ROUTING_PERMISSION",
    "RELEASE_APPROVAL_PERMISSION",
    "EXTERNAL_USE_PERMISSION",
    "PRODUCT_CANDIDATE_PERMISSION",
    "PUBLIC_COURT_LAW_ENFORCEMENT_PERMISSION",
  ]);
  assert.deepEqual(RBAC_ROLE_PERMISSION_POLICY_EFFECT_DECLARATIONS, [
    "POLICY_EFFECT_ALLOW_DECLARATION",
    "POLICY_EFFECT_DENY_DECLARATION",
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
    "packages/governance/src/rbac-role-permission-binding-evidence-contract.js",
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
    "1. wrapper `role_permission_binding_evidence_ref` equals role-permission-binding candidate `evidenceId`",
    "2. wrapper `role_permission_policy_evidence_ref` equals role-permission-binding candidate `policyEvidenceRef`",
    "3. wrapper `role_permission_policy_evidence_ref` equals policy candidate `evidenceId`",
    "4. role-permission-binding candidate `policyId` equals policy candidate `policyId`",
    "5. role-permission-binding candidate `policyVersion` equals policy candidate `policyVersion`",
    "6. role-permission-binding candidate `roleId` identifies exactly one policy `roleDefinitions` item with the same `roleId`",
    "7. role-permission-binding candidate `roleDefinitionVersion` equals that same role definition's `definitionVersion`",
    "8. role-permission-binding candidate `permissionId` identifies exactly one policy `permissionDefinitions` item with the same `permissionId`",
    "9. role-permission-binding candidate `permissionDefinitionVersion` equals that same permission definition's `definitionVersion`",
  ]);
  assert.match(local, /EXACT_LOCAL_DEPENDENCY_BINDING_COUNT:\n9/u);
  assert.match(local, /No normalization, case folding/u);
  assert.match(local, /Selection by category alone is\nprohibited/u);
  assert.match(
    local,
    /GENERIC_BINDING_VALIDITY_AS_APPROVAL_AUTHORITY_ADMISSIBILITY:\nPROHIBITED/u,
  );
  assert.match(
    local,
    /GENERIC_POLICY_VALIDITY_AS_APPROVAL_AUTHORITY_ADMISSIBILITY:\nPROHIBITED/u,
  );

  for (const field of [
    "evidenceId",
    "policyEvidenceRef",
    "policyId",
    "policyVersion",
    "roleId",
    "roleDefinitionVersion",
    "permissionId",
    "permissionDefinitionVersion",
  ]) {
    assert.equal(bindingSource.includes(`"${field}"`), true, field);
  }
  for (const field of [
    "evidenceId",
    "policyId",
    "policyVersion",
    "roleDefinitions",
    "permissionDefinitions",
    "roleId",
    "permissionId",
    "definitionVersion",
  ]) {
    assert.equal(policySource.includes(`"${field}"`), true, field);
  }
  assert.match(policySource, /seenRoleIds/u);
  assert.match(policySource, /seenPermissionIds/u);
  assert.match(policySource, /"DUPLICATE_VALUE"/u);
});

test("permission mapping deny-by-default posture and authority separation are complete", () => {
  const docsText = readRequired(docsPath);
  const mapping = sectionBetween(
    docsText,
    "## 7. Exact Reviewer Permission Mapping And Authority Separation",
    "## 8.",
  );
  const policyDeclarations = sectionBetween(
    mapping,
    "The exact governing policy declarations are:",
    "EXACT_DENY_BY_DEFAULT_POLICY_DECLARATION_COUNT:",
  );

  assert.deepEqual(tableLines(mapping), [
    "| Approval `reviewer_role` | Required `permissionCategory` | Required `effectDeclaration` |",
    "| --- | --- | --- |",
    "| `HUMAN_REVIEWER` | `CATEGORY_ONLY_REVIEW_PERMISSION` | `POLICY_EFFECT_ALLOW_DECLARATION` |",
    "| `PROFESSIONAL_REVIEWER` | `CATEGORY_ONLY_REVIEW_PERMISSION` | `POLICY_EFFECT_ALLOW_DECLARATION` |",
  ]);
  assert.deepEqual(numberedLines(policyDeclarations), [
    "1. policy `defaultEffectDeclaration` equals `POLICY_EFFECT_DENY_DECLARATION`",
    "2. policy `denyPrecedence` equals `true`",
    "3. policy `wildcardsAllowed` equals `false`",
  ]);
  for (const marker of [
    "REVIEWER_ROLE_ENUM_COUNT:\n2",
    "REVIEWER_PERMISSION_MAPPING_COUNT:\n2",
    "REQUIRED_PERMISSION_CATEGORY_COUNT:\n1",
    "REQUIRED_PERMISSION_EFFECT_DECLARATION_COUNT:\n1",
    "EXACT_DENY_BY_DEFAULT_POLICY_DECLARATION_COUNT:\n3",
    "ROLE_ID_OR_PERMISSION_ID_AS_REVIEWER_ROLE_OR_APPROVAL_DECISION:\nPROHIBITED",
    "CATEGORY_ONLY_PERMISSION_AS_AUTHORITY_OR_ACCESS:\nPROHIBITED",
    "PROFESSIONAL_QUALIFICATION_VERIFICATION:\nNOT_CREATED_AND_IMPLEMENTATION_BLOCKING",
  ]) {
    assert.equal(mapping.includes(marker), true, marker);
  }
  assert.deepEqual(permissionCategoryRegistry.CATEGORY_ONLY_REVIEW_PERMISSION, {
    permission_category: "CATEGORY_ONLY_REVIEW_PERMISSION",
    grants_access: false,
    description: "Category-only review permission; no material access grant.",
  });
  for (const category of [
    "RELEASE_APPROVAL_PERMISSION",
    "EXTERNAL_USE_PERMISSION",
    "PRODUCT_CANDIDATE_PERMISSION",
  ]) {
    assert.equal(mapping.includes(`\`${category}\``), true, category);
  }
  assert.match(mapping, /Deny\nprecedence remains controlling/u);
  assert.match(mapping, /does not create permission authority/u);
});

test("future outer cross-family bindings are exact and locally non-interfering", () => {
  const docsText = readRequired(docsPath);
  const outer = sectionBetween(
    docsText,
    "## 8. Future Outer Approval And Reviewer-Role Cross-References",
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
    "5. wrapper `reviewer_authority_evidence_ref` equals `approval_candidate.reviewer_attribution.reviewer_authority_evidence_ref`",
    "6. role-permission-binding candidate `roleId` equals reviewer-role-family actor-role-binding candidate `roleId`",
    "7. role-permission-binding candidate `roleDefinitionVersion` equals reviewer-role-family actor-role-binding candidate `roleDefinitionVersion`",
    "8. authority wrapper `role_permission_policy_evidence_ref`, reviewer-role wrapper `role_permission_policy_evidence_ref`, both generic bindings' `policyEvidenceRef`, and the shared policy candidate `evidenceId` are equal",
    "9. both generic bindings' `policyId` equal the shared policy candidate `policyId`",
    "10. both generic bindings' `policyVersion` equal the shared policy candidate `policyVersion`",
    "11. the exact same directly supplied policy candidate is used by both reviewer-role and reviewer-authority family checks; an equivalent parallel candidate is prohibited",
  ]);
  assert.deepEqual(numberedLines(patterns), [
    "1. `reviewer_authority_evidence_ref` matches `^rae_[a-z0-9][a-z0-9_-]{0,59}$`",
    "2. `approval_ref` matches `^apr_[a-z0-9][a-z0-9_-]{0,59}$`",
    "3. `review_session_ref` matches `^rvs_[a-z0-9][a-z0-9_-]{0,59}$`",
    "4. `reviewer_ref` matches `^rvr_[a-z0-9][a-z0-9_-]{0,59}$`",
  ]);
  assert.match(outer, /EXACT_FUTURE_OUTER_CROSS_REFERENCE_COUNT:\n11/u);
  assert.match(outer, /`reviewer_ref` is not generic actor identity/u);
  assert.match(
    outer,
    /OUTER_APPROVAL_AUTHORITY_CROSS_REFERENCE_CHECKPOINT:\nNOT_CREATED_AND_IMPLEMENTATION_BLOCKING/u,
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
    "1. `REVIEWER_AUTHORITY_BINDING_DECLARED_ACTIVE`",
    "2. `REVIEWER_AUTHORITY_BINDING_DECLARED_INACTIVE`",
    "3. `REVIEWER_AUTHORITY_BINDING_DECLARED_REVOKED`",
  ]);
  assert.match(lifecycle, /BINDING_LIFECYCLE_POSTURE_COUNT:\n3/u);
  assert.match(lifecycle, /VERIFICATION_POSTURE_COUNT:\n1/u);
  assert.match(lifecycle, /`NOT_VERIFIED_BY_CONTRACT`/u);
  assert.match(lifecycle, /Neither reference proves issuer identity/u);
  assert.match(lifecycle, /need not equal the generic role-permission binding's/u);
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
    "1. `reviewer_authority_evidence_ref`",
    "2. `approval_ref`",
    "3. `review_session_ref`",
    "4. `reviewer_ref`",
    "5. `role_permission_binding_evidence_ref`",
    "6. `role_permission_policy_evidence_ref`",
    "7. `binding_issuer_ref`",
    "8. `binding_provenance_ref`",
  ]);
  assert.match(references, /PAIRWISE_DISTINCT_INTERNAL_REFERENCE_COUNT:\n8/u);
  assert.match(references, /exactly one wrapper, exactly one/u);
  assert.match(references, /performs no lookup, dereference, discovery/u);
  assert.match(references, /remain separate\nouter-checkpoint dependencies/u);
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
    "- person name, email address, account identifier, organization, title, licence, or jurisdiction",
    "- raw content, raw source, private fact, source excerpt, source locator, URL, file name, file path, provider payload, or case material",
    "- token, JWT, certificate, credential, password, secret, signature, qualification payload, authentication payload, or authorization payload",
    "- inline or nested role-permission-binding, policy, identity, role, qualification, authority, or other evidence candidate",
    "- duplicated `bindingId`, `policyId`, `policyVersion`, `roleId`, `roleDefinitionVersion`, `permissionId`, `permissionDefinitionVersion`, policy content, role definition, or permission definition",
    "- permission grant, scope, access decision, role assignment, authority conclusion, approval effect, eligibility, release status, or currentness result",
    "- finding, score, severity, recommendation, conclusion, explanation, note, description, or free text",
  ]);
  assert.match(privacy, /exact fourteen fields in Section 4 are the complete/u);
  const descriptorBoundary = sectionBetween(
    privacy,
    "Unknown keys remain invalid",
  );
  assert.equal(
    normalizeWhitespace(descriptorBoundary),
    "Unknown keys remain invalid even when their values appear harmless. Structural validation must inspect own property descriptors without invoking accessors, must not mutate the wrapper or supplied candidates, and must not echo rejected values, evidence, policy content, role definitions, permission definitions, or diagnostics.",
  );

  assert.deepEqual(numberedLines(validity), [
    "1. that the reviewer or any referenced record exists",
    "2. that the reviewer identity is authentic or bound to an actor",
    "3. that the reviewer role is authoritative, assigned, qualified, or current",
    "4. that the role-permission binding is authoritative, assigned, or current",
    "5. that the policy issuer, policy provenance, role definition, or permission definition is trusted",
    "6. that reviewer authority, permission, scope, independence, or professional qualification exists",
    "7. that any lifecycle, expiry, revocation, supersession, deny-precedence, conflict, or currentness evaluation passed",
    "8. that the approval, identity, role, and authority cross-references passed",
    "9. that the approval candidate is admissible, eligible, approved, or effective",
    "10. that access, handoff, export, delivery, release, product use, or external use is authorized",
  ]);
  assert.match(validity, /must stop closed/u);
  assert.match(validity, /No structural validator result shape/u);

  assert.deepEqual(numberedLines(deferred), [
    "1. professional qualification evidence and verification semantics",
    "2. identity, role, authority, and same-attempt outer admissibility integration",
    "3. trusted clock, freshness, lifecycle, currentness, revocation, and replacement semantics",
    "4. exact outer admissibility-envelope field map and policy conflict handling",
    "5. reviewer-authority JSON Schema ownership and exact schema path",
    "6. validator-result semantics and schema ownership",
    "7. package export ownership and names",
    "8. validator-helper ownership, error semantics, and runtime path",
    "9. approval admissibility checkpoint integration and consumer selection",
    "10. permission, policy, issuer, provenance, qualification, and authority verification ownership",
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
    "REVIEWER_AUTHORITY_VERIFIED_BY_THIS_SLICE:\nNO",
    "PROFESSIONAL_QUALIFICATION_VERIFIED_BY_THIS_SLICE:\nNO",
    "PERMISSION_AUTHORITY_ACCESS_OR_SCOPE_CREATED_BY_THIS_SLICE:\nNO",
    "POLICY_AUTHORITY_OR_CURRENTNESS_CREATED_BY_THIS_SLICE:\nNO",
    "APPROVAL_ADMISSIBILITY_ELIGIBILITY_OR_EFFECT_CREATED_BY_THIS_SLICE:\nNO",
    "PERSISTENCE_API_UI_OR_AUDIT_CREATED_BY_THIS_SLICE:\nNO",
    "RAW_PRIVATE_SOURCE_OR_REAL_EVIDENCE_PROCESSED_BY_THIS_SLICE:\nNO",
  ]) {
    assert.equal(docsText.includes(marker), true, marker);
  }

  assert.deepEqual(numberedLines(proof), [
    "1. the twenty-seven Owner-selected documentation decisions",
    "2. the exact contract identity and fourteen-field closed root",
    "3. the exact local three-candidate topology and relationship bindings",
    "4. the exact reviewer-role, category-only permission, allow-declaration, and deny-by-default mapping",
    "5. the future outer approval, reviewer-role, and shared-policy cross-reference partition",
    "6. issuer, provenance, lifecycle, verification, and currentness separation",
    "7. pairwise distinctness, privacy, deferred ownership, and non-effect markers",
    "8. this exact two-file docs-only scope",
  ]);
  assert.match(proof, /PROOF_CLASSIFICATION:\nSYNTHETIC_DOC_BOUNDARY_ONLY/u);
  assert.match(
    proof,
    /PROOF_RESULT:\nDOCS_ONLY_REVIEWER_AUTHORITY_EVIDENCE_SEMANTICS_FROZEN_IMPLEMENTATION_REMAINS_FAIL_CLOSED/u,
  );

  const expectedConclusion =
    "This tracked artifact is not human review, professional review, legal review, evidentiary review, identity verification, role verification, professional qualification verification, authority verification, permission verification, access authorization, approval, technical sign-off, governance evidence, compliance certification, product authorization, external-use authorization, implementation readiness, source-truth evidence, chain-of-custody proof, or a case-truth conclusion.";
  const conclusionText = sectionBetween(
    finalBoundary,
    "This tracked artifact",
    "FINAL_SAFE_ACTION:",
  );
  assert.equal(normalizeWhitespace(conclusionText), expectedConclusion);
  assert.match(
    finalBoundary,
    /FINAL_SAFE_ACTION:\nPAUSE_UNTIL_SEPARATELY_AUTHORIZED_REVIEWER_AUTHORITY_SCHEMA_SCAFFOLD_DECISION_OR_PROFESSIONAL_QUALIFICATION_SEMANTICS/u,
  );
  assert.match(docsText, /PRODUCT_CANDIDATE_NONE/u);
  assert.match(docsText, /EXTERNAL_USE_NOT_AUTHORIZED/u);
  assert.match(docsText, /HUMAN_PROFESSIONAL_REVIEW_REQUIRED/u);
});
