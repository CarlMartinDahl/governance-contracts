"use strict";

const deepFreeze = (value) => {
  if (!value || typeof value !== "object" || Object.isFrozen(value)) {
    return value;
  }

  Object.freeze(value);
  for (const nested of Object.values(value)) {
    deepFreeze(nested);
  }

  return value;
};

const cloneAndFreeze = (value) => deepFreeze(structuredClone(value));

const RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_REGISTRY_POSTURE =
  deepFreeze({
    PROVE_ONLY: "PROVE_ONLY",
    STATIC_GOVERNANCE_REGISTRY_SCAFFOLD:
      "STATIC_GOVERNANCE_REGISTRY_SCAFFOLD",
    NOT_IMPLEMENTATION: "NOT_IMPLEMENTATION",
    NOT_RUNTIME_ENFORCEMENT: "NOT_RUNTIME_ENFORCEMENT",
    NOT_RBAC_IMPLEMENTATION: "NOT_RBAC_IMPLEMENTATION",
    NOT_ACCESS_CONTROL_IMPLEMENTATION:
      "NOT_ACCESS_CONTROL_IMPLEMENTATION",
    NOT_ADMIN_SUPPORT_AUTHORIZATION:
      "NOT_ADMIN_SUPPORT_AUTHORIZATION",
    NOT_ROLE_SCHEMA: "NOT_ROLE_SCHEMA",
    NOT_PERMISSION_SCHEMA: "NOT_PERMISSION_SCHEMA",
    HUMAN_PROFESSIONAL_REVIEW_REQUIRED:
      "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    EXTERNAL_USE_NOT_AUTHORIZED: "EXTERNAL_USE_NOT_AUTHORIZED",
    PRODUCT_CANDIDATE_NONE: "PRODUCT_CANDIDATE_NONE",
  });

const RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_SOURCE_EVIDENCE =
  deepFreeze({
    pr52ScopeReviewDoc:
      "docs/DOMAIN_CONTRACTS_RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_AFTER_PR51_v1.md",
    pr52FocusedTest:
      "tests/domain-rbac-role-permission-model-scope-review-after-pr51.test.js",
    pr53AlignmentProof:
      "tests/domain-rbac-role-permission-model-scope-review-after-pr51-alignment.test.js",
    pr52MergeMarker:
      "MERGED_AS_RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_AFTER_PR51",
    pr53MergeMarker:
      "MERGED_AS_RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_AFTER_PR51_ALIGNMENT_PROOF",
  });

const RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_ALLOWED_EVIDENCE_LEVELS =
  deepFreeze([
    "DOCS_ONLY",
    "TEST_ONLY",
    "PROVE_ONLY",
    "SCOPE_REVIEW_ONLY",
    "ALIGNMENT_PROOF_ONLY",
    "UNKNOWN_NOT_EVIDENCED",
    "NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
  ]);

const RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_FORBIDDEN_POSITIVE_LABELS =
  deepFreeze([
    "RUNTIME_ENFORCED",
    "TECHNICAL_SIGNED_OFF",
    "RELEASE_APPROVED",
    "EXTERNAL_USE_READY",
    "AI_ACT_COMPLIANT",
    "COURT_READY",
    "HIGH_RISK_APPROVED",
  ]);

const RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_ROW_GROUPS_BY_ID =
  deepFreeze({
    "RBAC-RPSR-001":
      "Human professional reviewer / review-support only",
    "RBAC-RPSR-002":
      "Repo/operator maintainer / governance maintenance only",
    "RBAC-RPSR-003":
      "Admin/support actor / blocked or separately gated access",
    "RBAC-RPSR-004": "Workflow automation agent / no self-approval",
    "RBAC-RPSR-005": "System/service actor / no self-authorization",
    "RBAC-RPSR-006":
      "External reviewer/auditor / no raw/private/source by default",
    "RBAC-RPSR-007":
      "Affected-person or subject-facing actor / explanation/contestability not implemented",
    "RBAC-RPSR-008":
      "Third-party/provider actor / routing deny-by-default",
    "RBAC-RPSR-009": "Raw/private/source material access / not authorized",
    "RBAC-RPSR-010":
      "External-use/product/release actions / not authorized",
  });

const BASE_NON_AUTHORIZATION_FLAGS = deepFreeze({
  authorized: false,
  access_granted: false,
  rbac_implemented: false,
  access_control_implemented: false,
  access_control_enforced: false,
  admin_support_implementation_created: false,
  admin_support_access_authorized: false,
  role_fields_created: false,
  permission_fields_created: false,
  role_schema_created: false,
  permission_schema_created: false,
  audit_access_log_implemented: false,
  retention_deletion_encryption_implemented: false,
  raw_material_routing_implemented: false,
  third_party_provider_routing_authorized: false,
  runtime_gate_created: false,
  runtime_gate_implemented: false,
  validator_dispatch_created: false,
  executable_registry_lookup_created: false,
  runtime_registry_lookup_created: false,
  model_facts_approval_created: false,
  governance_proof_created: false,
  security_finding_created: false,
  severity_assigned: false,
  remediation_recommended: false,
  blocker_closure_created: false,
  release_approved: false,
  external_use_authorized: false,
  product_candidate_selected: false,
  technical_signoff_created: false,
  runtime_certification_created: false,
  legal_clinical_evidentiary_case_truth_conclusion_created: false,
  court_ready_created: false,
  ai_act_compliance_created: false,
  high_risk_approval_created: false,
  runtime_api_schema_package_behavior_changed: false,
});

const makeRow = ({
  id,
  actorType,
  roleCategory,
  permissionCategory,
  allowedMaterialClasses,
  prohibitedMaterialClasses,
  allowedActions,
  prohibitedActions,
  adminSupportAccessRule,
  humanProfessionalReviewDependency,
  auditLogDependency,
  retentionDeletionDependency,
  rawMaterialRoutingDependency,
  thirdPartyRoutingConstraint,
  currentEvidenceLevel,
  implementationGap,
  requiredImplementationEvidence,
  requiredTestEvidence,
  blockerStatus,
  closureCriteria,
  remainsNonAuthorizedUntilClosure,
}) =>
  deepFreeze({
    id,
    actorType,
    roleCategory,
    permissionCategory,
    allowedMaterialClasses,
    prohibitedMaterialClasses,
    allowedActions,
    prohibitedActions,
    adminSupportAccessRule,
    humanProfessionalReviewDependency,
    auditLogDependency,
    retentionDeletionDependency,
    rawMaterialRoutingDependency,
    thirdPartyRoutingConstraint,
    currentEvidenceLevel,
    implementationGap,
    requiredImplementationEvidence,
    requiredTestEvidence,
    blockerStatus,
    closureCriteria,
    remainsNonAuthorizedUntilClosure,
  });

const baseDependencyPosture = deepFreeze({
  humanProfessionalReviewDependency:
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
  auditLogDependency:
    "audit/access-log depends on actor/permission taxonomy before runtime implementation",
  retentionDeletionDependency:
    "retention/deletion depends on actor/permission taxonomy for request/execute/verify flows",
  rawMaterialRoutingDependency:
    "raw-material routing depends on role/permission model before runtime enforcement",
  thirdPartyRoutingConstraint:
    "third-party/provider routing depends on explicit authorization and is deny-by-default",
});

const futureOnlyClosureCriteria =
  "future tracked implementation evidence and future tracked test evidence required; closure cannot be satisfied by this registry scaffold or its focused proof test";

const RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_REGISTRY_ROWS = deepFreeze([
  makeRow({
    id: "RBAC-RPSR-001",
    actorType: "human professional reviewer",
    roleCategory: "professional reviewer",
    permissionCategory: [
      "view sanitized/no-raw material",
      "view redacted review signals",
      "request human/professional review",
    ],
    allowedMaterialClasses: [
      "sanitized/no-raw material",
      "redacted review signals",
    ],
    prohibitedMaterialClasses: [
      "raw/private/source material",
      "source packages",
      "PDF/image/screenshot/metadata material",
    ],
    allowedActions: ["review-support assessment"],
    prohibitedActions: ["runtime enforcement", "external-use approval"],
    adminSupportAccessRule: "NO_ADMIN_SUPPORT_ACCESS_AUTHORIZED",
    ...baseDependencyPosture,
    currentEvidenceLevel: "DOCS_ONLY",
    implementationGap: "ROLE_PERMISSION_MODEL_NOT_IMPLEMENTED",
    requiredImplementationEvidence:
      "future tracked role/permission model evidence required",
    requiredTestEvidence: "future tracked allow/deny test evidence required",
    blockerStatus: "NOT_AUTHORIZED",
    closureCriteria: futureOnlyClosureCriteria,
    remainsNonAuthorizedUntilClosure:
      "RBAC/access-control enforcement and admin/support access",
  }),
  makeRow({
    id: "RBAC-RPSR-002",
    actorType: "repo/operator maintainer",
    roleCategory: "owner/maintainer",
    permissionCategory: [
      "view metadata/manifest material",
      "view generated/export artifacts",
    ],
    allowedMaterialClasses: [
      "metadata/manifest material",
      "generated/export artifacts",
    ],
    prohibitedMaterialClasses: ["raw/private/source material"],
    allowedActions: ["maintain governance registry scaffold"],
    prohibitedActions: ["self-approve release", "close blockers"],
    adminSupportAccessRule:
      "ADMIN_SUPPORT_ACCESS_REQUIRES_SEPARATE_EVIDENCE",
    ...baseDependencyPosture,
    currentEvidenceLevel: "PROVE_ONLY",
    implementationGap: "MAINTAINER_ROLE_NOT_BOUND_TO_RUNTIME_PERMISSION_MODEL",
    requiredImplementationEvidence:
      "future tracked maintainer role binding evidence required",
    requiredTestEvidence: "future tracked denial-path tests required",
    blockerStatus: "NOT_AUTHORIZED",
    closureCriteria: futureOnlyClosureCriteria,
    remainsNonAuthorizedUntilClosure:
      "release approval, technical sign-off, runtime certification",
  }),
  makeRow({
    id: "RBAC-RPSR-003",
    actorType: "support/admin actor",
    roleCategory: "admin/support",
    permissionCategory: ["access admin/support path"],
    allowedMaterialClasses: ["none until separately evidenced"],
    prohibitedMaterialClasses: [
      "raw/private/source material",
      "source packages",
      "provider payload material",
    ],
    allowedActions: ["none until separately evidenced"],
    prohibitedActions: ["admin/support runtime access", "bypass review gates"],
    adminSupportAccessRule:
      "BLOCKED_UNTIL_SEPARATELY_GATED_AND_EVIDENCED",
    ...baseDependencyPosture,
    currentEvidenceLevel: "NOT_AUTHORIZED",
    implementationGap: "ADMIN_SUPPORT_ACCESS_MODEL_NOT_IMPLEMENTED",
    requiredImplementationEvidence:
      "future admin/support model, bypass prevention, audit, and authorization evidence required",
    requiredTestEvidence:
      "future admin/support allowed and denied tests required",
    blockerStatus: "NOT_AUTHORIZED",
    closureCriteria: futureOnlyClosureCriteria,
    remainsNonAuthorizedUntilClosure:
      "admin/support implementation and access authorization",
  }),
  makeRow({
    id: "RBAC-RPSR-004",
    actorType: "workflow automation agent",
    roleCategory: "automation/service",
    permissionCategory: [
      "approve/reject review-support output",
      "create runtime gate",
    ],
    allowedMaterialClasses: [
      "sanitized/no-raw material",
      "metadata/manifest material",
    ],
    prohibitedMaterialClasses: [
      "raw/private/source material",
      "provider tokens or secrets",
    ],
    allowedActions: ["prepare review-support status"],
    prohibitedActions: ["self-approval", "runtime gate creation"],
    adminSupportAccessRule: "NO_ADMIN_SUPPORT_ACCESS_AUTHORIZED",
    ...baseDependencyPosture,
    currentEvidenceLevel: "SCOPE_REVIEW_ONLY",
    implementationGap: "AUTOMATION_ROLE_NOT_BOUND_TO_RUNTIME_PERMISSION_MODEL",
    requiredImplementationEvidence:
      "future non-self-approval and audit evidence required",
    requiredTestEvidence: "future denied self-approval tests required",
    blockerStatus: "NOT_AUTHORIZED",
    closureCriteria: futureOnlyClosureCriteria,
    remainsNonAuthorizedUntilClosure:
      "self-approval, runtime gate creation, validator dispatch",
  }),
  makeRow({
    id: "RBAC-RPSR-005",
    actorType: "system/service actor",
    roleCategory: "automation/service",
    permissionCategory: [
      "create validator dispatch",
      "perform registry lookup",
    ],
    allowedMaterialClasses: ["none until separately evidenced"],
    prohibitedMaterialClasses: [
      "raw/private/source material",
      "source packages",
      "provider payload material",
    ],
    allowedActions: ["none until separately evidenced"],
    prohibitedActions: [
      "validator dispatch",
      "executable/runtime registry lookup",
      "self-authorization",
    ],
    adminSupportAccessRule: "NO_ADMIN_SUPPORT_ACCESS_AUTHORIZED",
    ...baseDependencyPosture,
    currentEvidenceLevel: "UNKNOWN_NOT_EVIDENCED",
    implementationGap: "SYSTEM_SERVICE_AUTHORIZATION_MODEL_NOT_IMPLEMENTED",
    requiredImplementationEvidence:
      "future service actor model and fail-closed runtime evidence required",
    requiredTestEvidence: "future service actor denial and audit tests required",
    blockerStatus: "NOT_AUTHORIZED",
    closureCriteria: futureOnlyClosureCriteria,
    remainsNonAuthorizedUntilClosure:
      "validator dispatch and executable/runtime registry lookup",
  }),
  makeRow({
    id: "RBAC-RPSR-006",
    actorType: "external reviewer or auditor",
    roleCategory: "external auditor",
    permissionCategory: ["view redacted review signals"],
    allowedMaterialClasses: [
      "redacted review signals",
      "sanitized/no-raw material",
    ],
    prohibitedMaterialClasses: [
      "raw/private/source material",
      "source packages",
      "PDF/image/screenshot/metadata material",
    ],
    allowedActions: ["review redacted governance evidence"],
    prohibitedActions: ["approve external-use", "select product candidate"],
    adminSupportAccessRule: "NO_ADMIN_SUPPORT_ACCESS_AUTHORIZED",
    ...baseDependencyPosture,
    currentEvidenceLevel: "DOCS_ONLY",
    implementationGap: "EXTERNAL_REVIEWER_PERMISSION_MODEL_NOT_IMPLEMENTED",
    requiredImplementationEvidence:
      "future redaction, access boundary, and audit evidence required",
    requiredTestEvidence: "future external reviewer allow/deny tests required",
    blockerStatus: "NOT_AUTHORIZED",
    closureCriteria: futureOnlyClosureCriteria,
    remainsNonAuthorizedUntilClosure:
      "raw/private/source access, external-use, release approval",
  }),
  makeRow({
    id: "RBAC-RPSR-007",
    actorType: "affected-person or subject-facing actor",
    roleCategory: "affected-person/subject-facing",
    permissionCategory: ["view generated/export artifacts"],
    allowedMaterialClasses: ["none until separately evidenced"],
    prohibitedMaterialClasses: [
      "raw/private/source material",
      "source packages",
      "internal review material",
    ],
    allowedActions: ["none until separately evidenced"],
    prohibitedActions: ["external-use", "court-ready use"],
    adminSupportAccessRule: "NO_ADMIN_SUPPORT_ACCESS_AUTHORIZED",
    ...baseDependencyPosture,
    currentEvidenceLevel: "UNKNOWN_NOT_EVIDENCED",
    implementationGap:
      "EXPLANATION_AND_CONTESTABILITY_MODEL_NOT_IMPLEMENTED",
    requiredImplementationEvidence:
      "future subject-facing access, explanation, and contestability evidence required",
    requiredTestEvidence: "future subject-facing tests required",
    blockerStatus: "NOT_AUTHORIZED",
    closureCriteria: futureOnlyClosureCriteria,
    remainsNonAuthorizedUntilClosure:
      "subject-facing output, court-ready claim, external-use",
  }),
  makeRow({
    id: "RBAC-RPSR-008",
    actorType: "third-party/provider actor",
    roleCategory: "third-party/provider",
    permissionCategory: ["authorize third-party/provider routing"],
    allowedMaterialClasses: ["none"],
    prohibitedMaterialClasses: [
      "raw/private/source material",
      "metadata/manifest material",
      "generated/export artifacts",
    ],
    allowedActions: ["none"],
    prohibitedActions: ["provider routing", "provider payload processing"],
    adminSupportAccessRule: "NO_ADMIN_SUPPORT_ACCESS_AUTHORIZED",
    ...baseDependencyPosture,
    currentEvidenceLevel: "NOT_AUTHORIZED",
    implementationGap: "PROVIDER_ROUTING_AUTHORIZATION_MODEL_NOT_IMPLEMENTED",
    requiredImplementationEvidence:
      "future provider registry, route authorization, auditability, and retention/deletion posture evidence required",
    requiredTestEvidence:
      "future provider routing deny and authorization tests required",
    blockerStatus: "NOT_AUTHORIZED",
    closureCriteria: futureOnlyClosureCriteria,
    remainsNonAuthorizedUntilClosure:
      "third-party/provider routing and provider integration",
  }),
  makeRow({
    id: "RBAC-RPSR-009",
    actorType: "repo/operator maintainer",
    roleCategory: "reviewer",
    permissionCategory: [
      "access raw/private/source material",
      "access source packages",
      "access PDF/image/screenshot/metadata material",
      "view local logs/test transcript summaries",
    ],
    allowedMaterialClasses: ["none"],
    prohibitedMaterialClasses: [
      "raw/private/source material",
      "source packages",
      "PDF/image/screenshot/metadata material",
      "local logs/test transcript summaries as CI evidence",
    ],
    allowedActions: ["none"],
    prohibitedActions: [
      "inspect raw/private/source material",
      "inspect source packages",
      "inspect PDF/image/screenshot/metadata material",
      "read local logs",
    ],
    adminSupportAccessRule: "NO_ADMIN_SUPPORT_ACCESS_AUTHORIZED",
    ...baseDependencyPosture,
    currentEvidenceLevel: "NOT_AUTHORIZED",
    implementationGap: "RAW_MATERIAL_ACCESS_CONTROL_NOT_IMPLEMENTED",
    requiredImplementationEvidence:
      "future raw-material routing and RBAC evidence required",
    requiredTestEvidence: "future raw/private/source denial tests required",
    blockerStatus: "NOT_AUTHORIZED",
    closureCriteria: futureOnlyClosureCriteria,
    remainsNonAuthorizedUntilClosure:
      "raw/private/source access and source package access",
  }),
  makeRow({
    id: "RBAC-RPSR-010",
    actorType: "repo/operator maintainer",
    roleCategory: "read-only observer",
    permissionCategory: [
      "request retention/deletion action",
      "verify retention/deletion action",
      "approve external-use",
      "select product candidate",
    ],
    allowedMaterialClasses: ["none"],
    prohibitedMaterialClasses: [
      "all material classes for external-use until separately authorized",
    ],
    allowedActions: ["none"],
    prohibitedActions: [
      "release approval",
      "external-use authorization",
      "product-candidate selection",
      "technical sign-off",
      "runtime certification",
    ],
    adminSupportAccessRule: "NO_ADMIN_SUPPORT_ACCESS_AUTHORIZED",
    ...baseDependencyPosture,
    currentEvidenceLevel: "ALIGNMENT_PROOF_ONLY",
    implementationGap: "RELEASE_AND_EXTERNAL_USE_AUTHORIZATION_NOT_IMPLEMENTED",
    requiredImplementationEvidence:
      "future separate release, sign-off, certification, and product evidence required",
    requiredTestEvidence:
      "future release and external-use authorization tests required",
    blockerStatus: "NOT_AUTHORIZED",
    closureCriteria: futureOnlyClosureCriteria,
    remainsNonAuthorizedUntilClosure:
      "release approval, external-use, product candidate, technical sign-off, runtime certification",
  }),
]);

const getRbacRolePermissionModelScopeReviewRegistrySummary = () =>
  cloneAndFreeze({
    posture: Object.values(
      RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_REGISTRY_POSTURE,
    ),
    rowCount: RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_REGISTRY_ROWS.length,
    rowIds: RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_REGISTRY_ROWS.map(
      (row) => row.id,
    ),
    rowGroupsById:
      RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_ROW_GROUPS_BY_ID,
    sourceEvidence:
      RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_SOURCE_EVIDENCE,
    allowedEvidenceLevels:
      RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_ALLOWED_EVIDENCE_LEVELS,
    forbiddenPositiveLabels:
      RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_FORBIDDEN_POSITIVE_LABELS,
    dependencyPosture: {
      rawMaterialRouting:
        "raw-material routing depends on role/permission model before runtime enforcement",
      auditAccessLog:
        "audit/access-log depends on actor/permission taxonomy before runtime implementation",
      retentionDeletion:
        "retention/deletion depends on actor/permission taxonomy for request/execute/verify flows",
      thirdPartyProviderRouting:
        "third-party/provider routing depends on explicit authorization and is deny-by-default",
      globalAccessControl:
        "global access-control threat model depends on preliminary RBAC/admin-support scope",
      runtimeGates: "runtime gates remain deferred",
      validatorDispatch: "validator dispatch remains not created",
      executableRuntimeRegistryLookup:
        "executable/runtime registry lookup remains not created",
    },
    nonAuthorizationFlags: BASE_NON_AUTHORIZATION_FLAGS,
    closurePosture:
      "future-only; cannot be satisfied by registry scaffold or focused proof test",
  });

const listRbacRolePermissionModelScopeReviewRegistryRows = () =>
  cloneAndFreeze(RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_REGISTRY_ROWS);

module.exports = {
  RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_ALLOWED_EVIDENCE_LEVELS,
  RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_FORBIDDEN_POSITIVE_LABELS,
  RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_REGISTRY_POSTURE,
  RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_REGISTRY_ROWS,
  RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_ROW_GROUPS_BY_ID,
  RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_SOURCE_EVIDENCE,
  getRbacRolePermissionModelScopeReviewRegistrySummary,
  listRbacRolePermissionModelScopeReviewRegistryRows,
};
