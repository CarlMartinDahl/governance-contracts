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

const ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_REGISTRY_NAME =
  "ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_REGISTRY";

const ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_REGISTRY_VERSION = "v1";

const ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_REGISTRY_POSTURE =
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
    NOT_ADMIN_SUPPORT_IMPLEMENTATION:
      "NOT_ADMIN_SUPPORT_IMPLEMENTATION",
    HUMAN_PROFESSIONAL_REVIEW_REQUIRED:
      "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    EXTERNAL_USE_NOT_AUTHORIZED: "EXTERNAL_USE_NOT_AUTHORIZED",
    PRODUCT_CANDIDATE_NONE: "PRODUCT_CANDIDATE_NONE",
  });

const ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_SOURCE_EVIDENCE =
  deepFreeze({
    pr53LegacyAlignment: {
      sourcePath:
        "tests/domain-rbac-role-permission-model-scope-review-after-pr51-alignment.test.js",
      literalMarkers: ["PROVE_ONLY", "SCOPE_REVIEW_ONLY"],
      absentLiteralMarkers: ["TEST_ONLY", "ALIGNMENT_PROOF_ONLY"],
      boundaries: [
        "no implementation",
        "no enforcement",
        "no blocker closure",
      ],
      note: "legacy PR53 source evidence remains prove-only and blocker-open",
    },
    pr55RegistryAlignment: {
      sourcePath:
        "tests/rbac-role-permission-model-scope-review-registry-alignment.test.js",
      literalMarkers: ["TEST_ONLY", "PROVE_ONLY", "ALIGNMENT_PROOF_ONLY"],
      note: "registry alignment proof only",
    },
    pr56ScopeReview: {
      documentPath:
        "docs/DOMAIN_CONTRACTS_ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_AFTER_PR55_v1.md",
      focusedTestPath:
        "tests/domain-admin-support-access-model-scope-review-after-pr55.test.js",
      sourceAnchor:
        "governance/main @ f8ccf0434659de424a3d460ed26998e0b3472484",
      preMergeSourceMarker:
        "MERGED_AS_RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_REGISTRY_ALIGNMENT_PROOF_AFTER_PR54",
      literalMarkers: ["DOCS_ONLY", "PROVE_ONLY", "SCOPE_REVIEW_ONLY"],
    },
    pr57AlignmentProof: {
      sourcePath:
        "tests/domain-admin-support-access-model-scope-review-after-pr55-alignment.test.js",
      literalMarkers: ["TEST_ONLY", "PROVE_ONLY", "ALIGNMENT_PROOF_ONLY"],
      note: "source provenance reconciliation preserved",
    },
  });

const ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_ACCEPTED_MERGE_PROVENANCE =
  deepFreeze({
    pr53Alignment: {
      mergeMarker:
        "MERGED_AS_RBAC_ROLE_PERMISSION_MODEL_SCOPE_REVIEW_AFTER_PR51_ALIGNMENT_PROOF",
      mergeCommit: "03516fa6deeea91a7dccbcb35c17907e3e113da8",
    },
    pr56ScopeReview: {
      mergeMarker:
        "MERGED_AS_ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_AFTER_PR55",
      mergeCommit: "7c6917c8f43b0cf1febc5fc95c682203e18d01d3",
    },
    pr57AlignmentProof: {
      mergeMarker:
        "MERGED_AS_ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_AFTER_PR55_ALIGNMENT_PROOF",
      mergeCommit: "aae85a902b255c4405f9e0eb93a9487bc7e0b754",
    },
  });

const ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_ALLOWED_EVIDENCE_LABELS =
  deepFreeze([
    "DOCS_ONLY",
    "TEST_ONLY",
    "PROVE_ONLY",
    "SCOPE_REVIEW_ONLY",
    "ALIGNMENT_PROOF_ONLY",
    "STATIC_GOVERNANCE_REGISTRY_SCAFFOLD",
    "UNKNOWN_NOT_EVIDENCED",
    "NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
  ]);

const ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_FORBIDDEN_POSITIVE_LABELS =
  deepFreeze([
    "RUNTIME_ENFORCED",
    "RBAC_ENFORCED",
    "ACCESS_CONTROL_ENFORCED",
    "ADMIN_SUPPORT_AUTHORIZED",
    "IMPLICIT_SUPERUSER_AUTHORIZED",
    "BREAK_GLASS_AUTHORIZED",
    "IMPERSONATION_AUTHORIZED",
    "ROLE_SCHEMA_CREATED",
    "PERMISSION_SCHEMA_CREATED",
    "TECHNICAL_SIGNED_OFF",
    "RELEASE_APPROVED",
    "EXTERNAL_USE_READY",
    "AI_ACT_COMPLIANT",
    "COURT_READY",
    "HIGH_RISK_APPROVED",
  ]);

const ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_NON_AUTHORIZATION_FLAGS =
  deepFreeze({
    implementation_created: false,
    runtime_behavior_changed: false,
    rbac_implemented: false,
    access_control_implemented: false,
    admin_support_implemented: false,
    admin_support_access_authorized: false,
    implicit_superuser_authorized: false,
    break_glass_authorized: false,
    impersonation_authorized: false,
    audit_access_log_implemented: false,
    retention_deletion_encryption_implemented: false,
    raw_material_routing_implemented: false,
    third_party_provider_routing_authorized: false,
    runtime_gate_created: false,
    validator_dispatch_created: false,
    runtime_registry_lookup_created: false,
    blocker_closure_created: false,
    security_finding_created: false,
    vulnerability_finding_created: false,
    severity_assigned: false,
    remediation_recommended: false,
    release_approved: false,
    external_use_authorized: false,
    product_candidate_selected: false,
    technical_signoff_created: false,
    runtime_certification_created: false,
    domain_conclusion_created: false,
  });

const accessPath = (
  registryId,
  category,
  posture,
  currentAuthorization,
  materialPosture,
) =>
  deepFreeze({
    registry_id: registryId,
    row_type: "ACCESS_PATH_SCOPE",
    category,
    posture,
    currentAuthorization,
    materialPosture,
  });

const bypassRisk = (
  registryId,
  {
    risk,
    currentEvidenceLevel,
    currentNonAuthorization,
    dependency,
    requiredFutureImplementationEvidence,
    requiredFutureTestEvidence,
    blockerStatus,
    futureOnlyClosureCriterion,
  },
) =>
  deepFreeze({
    registry_id: registryId,
    row_type: "BYPASS_RISK",
    risk,
    currentEvidenceLevel,
    currentNonAuthorization,
    dependency,
    requiredFutureImplementationEvidence,
    requiredFutureTestEvidence,
    blockerStatus,
    futureOnlyClosureCriterion,
  });

const ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_ACCESS_PATH_ROWS =
  deepFreeze([
    accessPath(
      "ASAM-AP-001",
      "Sanitized/no-raw review-support access",
      "narrow future review-support candidate",
      "NOT_AUTHORIZED",
      "no raw/private/source material",
    ),
    accessPath(
      "ASAM-AP-002",
      "Redacted review-signal access",
      "narrow future review-support candidate",
      "NOT_AUTHORIZED",
      "redacted signals only if separately evidenced",
    ),
    accessPath(
      "ASAM-AP-003",
      "No-raw metadata/manifest access",
      "separately gated future dependency",
      "NOT_AUTHORIZED",
      "metadata/manifest only if separately evidenced",
    ),
    accessPath(
      "ASAM-AP-004",
      "Generated/export artifact access",
      "separately gated future dependency",
      "NOT_AUTHORIZED",
      "generated/export artifacts only if separately evidenced",
    ),
    accessPath(
      "ASAM-AP-005",
      "Local log or test-transcript summary access",
      "separately gated future dependency",
      "NOT_AUTHORIZED",
      "local logs are not CI evidence",
    ),
    accessPath(
      "ASAM-AP-006",
      "Raw/private/source material access",
      "not authorized",
      "NOT_AUTHORIZED",
      "deny-by-default",
    ),
    accessPath(
      "ASAM-AP-007",
      "Source-package access",
      "not authorized",
      "NOT_AUTHORIZED",
      "deny-by-default",
    ),
    accessPath(
      "ASAM-AP-008",
      "PDF/image/screenshot/metadata access",
      "not authorized",
      "NOT_AUTHORIZED",
      "deny-by-default",
    ),
    accessPath(
      "ASAM-AP-009",
      "Cross-tenant access",
      "not authorized",
      "NOT_AUTHORIZED",
      "tenant boundary remains closed",
    ),
    accessPath(
      "ASAM-AP-010",
      "Cross-case access",
      "not authorized",
      "NOT_AUTHORIZED",
      "case boundary remains closed",
    ),
    accessPath(
      "ASAM-AP-011",
      "Cross-object/function/property access",
      "not authorized",
      "NOT_AUTHORIZED",
      "object/function/property boundary remains closed",
    ),
    accessPath(
      "ASAM-AP-012",
      "Retention/deletion request access",
      "separately gated future dependency",
      "NOT_AUTHORIZED",
      "request flow remains separate from execute and verify",
    ),
    accessPath(
      "ASAM-AP-013",
      "Retention/deletion execution access",
      "not authorized",
      "NOT_AUTHORIZED",
      "execution requires separate future evidence",
    ),
    accessPath(
      "ASAM-AP-014",
      "Retention/deletion verification access",
      "separately gated future dependency",
      "NOT_AUTHORIZED",
      "verification remains independent from execution",
    ),
    accessPath(
      "ASAM-AP-015",
      "Audit/access-log viewing access",
      "separately gated future dependency",
      "NOT_AUTHORIZED",
      "audit/access-log implementation remains absent",
    ),
    accessPath(
      "ASAM-AP-016",
      "Third-party/provider routing authorization",
      "deny-by-default",
      "NOT_AUTHORIZED",
      "provider route authorization absent",
    ),
    accessPath(
      "ASAM-AP-017",
      "Role or permission administration",
      "separately gated future dependency",
      "NOT_AUTHORIZED",
      "role escalation and self-grant not authorized",
    ),
    accessPath(
      "ASAM-AP-018",
      "Impersonation or session-assumption access",
      "not authorized",
      "NOT_AUTHORIZED",
      "impersonation absent",
    ),
    accessPath(
      "ASAM-AP-019",
      "Break-glass or emergency access",
      "unknown/not evidenced",
      "UNKNOWN_NOT_EVIDENCED",
      "break-glass absent",
    ),
    accessPath(
      "ASAM-AP-020",
      "External-use/product/release approval",
      "not authorized",
      "NOT_AUTHORIZED",
      "release and product decisions remain separate",
    ),
  ]);

const ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_BYPASS_RISK_ROWS =
  deepFreeze([
    bypassRisk("ASAM-BR-001", {
      risk: "implicit superuser interpretation",
      currentEvidenceLevel: "SCOPE_REVIEW_ONLY",
      currentNonAuthorization:
        "admin/support is not an implicit superuser",
      dependency: "RBAC role-permission taxonomy",
      requiredFutureImplementationEvidence:
        "future tracked admin/support role boundary evidence",
      requiredFutureTestEvidence:
        "future denial tests for superuser interpretation",
      blockerStatus: "NOT_AUTHORIZED",
      futureOnlyClosureCriterion:
        "cannot be closed by this document or focused proof test",
    }),
    bypassRisk("ASAM-BR-002", {
      risk: "support-to-reviewer role confusion",
      currentEvidenceLevel: "SCOPE_REVIEW_ONLY",
      currentNonAuthorization:
        "admin/support is not equivalent to professional reviewer",
      dependency: "human/professional-review gate",
      requiredFutureImplementationEvidence:
        "future tracked separation of support and reviewer roles",
      requiredFutureTestEvidence:
        "future denial tests for reviewer-role substitution",
      blockerStatus: "NOT_AUTHORIZED",
      futureOnlyClosureCriterion:
        "future role separation evidence required",
    }),
    bypassRisk("ASAM-BR-003", {
      risk: "owner/maintainer privilege confusion",
      currentEvidenceLevel: "SCOPE_REVIEW_ONLY",
      currentNonAuthorization:
        "admin/support is not equivalent to owner/maintainer",
      dependency: "RBAC role-permission taxonomy",
      requiredFutureImplementationEvidence:
        "future tracked owner/admin separation evidence",
      requiredFutureTestEvidence:
        "future denial tests for owner/admin confusion",
      blockerStatus: "NOT_AUTHORIZED",
      futureOnlyClosureCriterion:
        "future owner/admin separation evidence required",
    }),
    bypassRisk("ASAM-BR-004", {
      risk: "self-granted permission",
      currentEvidenceLevel: "UNKNOWN_NOT_EVIDENCED",
      currentNonAuthorization:
        "role escalation and self-grant are not authorized or implemented",
      dependency: "role or permission administration model",
      requiredFutureImplementationEvidence:
        "future tracked self-grant prevention evidence",
      requiredFutureTestEvidence: "future denied self-grant tests",
      blockerStatus: "NOT_AUTHORIZED",
      futureOnlyClosureCriterion:
        "future self-grant prevention evidence required",
    }),
    bypassRisk("ASAM-BR-005", {
      risk: "self-approval",
      currentEvidenceLevel: "SCOPE_REVIEW_ONLY",
      currentNonAuthorization:
        "support identity does not permit self-approval",
      dependency: "human/professional-review gate",
      requiredFutureImplementationEvidence:
        "future tracked non-self-approval evidence",
      requiredFutureTestEvidence: "future denied self-approval tests",
      blockerStatus: "NOT_AUTHORIZED",
      futureOnlyClosureCriterion:
        "future non-self-approval evidence required",
    }),
    bypassRisk("ASAM-BR-006", {
      risk: "workflow-agent approval",
      currentEvidenceLevel: "UNKNOWN_NOT_EVIDENCED",
      currentNonAuthorization:
        "workflow automation cannot approve support access",
      dependency: "automation actor permission model",
      requiredFutureImplementationEvidence:
        "future tracked workflow-agent non-approval evidence",
      requiredFutureTestEvidence: "future denied workflow approval tests",
      blockerStatus: "NOT_AUTHORIZED",
      futureOnlyClosureCriterion:
        "future workflow-agent denial evidence required",
    }),
    bypassRisk("ASAM-BR-007", {
      risk: "system/service self-authorization",
      currentEvidenceLevel: "UNKNOWN_NOT_EVIDENCED",
      currentNonAuthorization:
        "system/service actor self-authorization is not created",
      dependency: "service actor authorization model",
      requiredFutureImplementationEvidence:
        "future tracked service actor fail-closed evidence",
      requiredFutureTestEvidence:
        "future denied service self-authorization tests",
      blockerStatus: "NOT_AUTHORIZED",
      futureOnlyClosureCriterion: "future service actor evidence required",
    }),
    bypassRisk("ASAM-BR-008", {
      risk: "tenant/case switching",
      currentEvidenceLevel: "UNKNOWN_NOT_EVIDENCED",
      currentNonAuthorization:
        "cross-tenant and cross-case access are not authorized",
      dependency: "global access-control threat modeling",
      requiredFutureImplementationEvidence:
        "future tracked tenant/case boundary evidence",
      requiredFutureTestEvidence:
        "future denied tenant/case switching tests",
      blockerStatus: "NOT_AUTHORIZED",
      futureOnlyClosureCriterion:
        "future tenant/case boundary evidence required",
    }),
    bypassRisk("ASAM-BR-009", {
      risk: "object/function/property scope bypass",
      currentEvidenceLevel: "UNKNOWN_NOT_EVIDENCED",
      currentNonAuthorization:
        "cross-object/function/property access is not authorized",
      dependency: "object/function/property access model",
      requiredFutureImplementationEvidence:
        "future tracked object/function/property boundary evidence",
      requiredFutureTestEvidence:
        "future denied BOLA/IDOR and function-level tests",
      blockerStatus: "NOT_AUTHORIZED",
      futureOnlyClosureCriterion:
        "future object/function/property boundary evidence required",
    }),
    bypassRisk("ASAM-BR-010", {
      risk: "direct database/storage/object-store bypass",
      currentEvidenceLevel: "UNKNOWN_NOT_EVIDENCED",
      currentNonAuthorization:
        "direct storage/database/object-store bypass is not authorized or implemented",
      dependency: "storage access-control model",
      requiredFutureImplementationEvidence:
        "future tracked storage bypass prevention evidence",
      requiredFutureTestEvidence:
        "future denied direct storage access tests",
      blockerStatus: "NOT_AUTHORIZED",
      futureOnlyClosureCriterion: "future storage bypass evidence required",
    }),
    bypassRisk("ASAM-BR-011", {
      risk: "export/download bypass",
      currentEvidenceLevel: "UNKNOWN_NOT_EVIDENCED",
      currentNonAuthorization: "export/download bypass is not authorized",
      dependency: "generated/export artifact access model",
      requiredFutureImplementationEvidence:
        "future tracked export boundary evidence",
      requiredFutureTestEvidence:
        "future denied export/download bypass tests",
      blockerStatus: "NOT_AUTHORIZED",
      futureOnlyClosureCriterion: "future export boundary evidence required",
    }),
    bypassRisk("ASAM-BR-012", {
      risk: "audit-log access bypass",
      currentEvidenceLevel: "UNKNOWN_NOT_EVIDENCED",
      currentNonAuthorization:
        "audit/access-log viewing access is not authorized",
      dependency: "audit/access-log dependency",
      requiredFutureImplementationEvidence:
        "future tracked audit-log viewing role evidence",
      requiredFutureTestEvidence: "future denied audit-log access tests",
      blockerStatus: "NOT_AUTHORIZED",
      futureOnlyClosureCriterion: "future audit-log role evidence required",
    }),
    bypassRisk("ASAM-BR-013", {
      risk: "deletion execution without independent verification",
      currentEvidenceLevel: "UNKNOWN_NOT_EVIDENCED",
      currentNonAuthorization:
        "retention/deletion execution is not authorized",
      dependency: "retention/deletion request/execute/verify separation",
      requiredFutureImplementationEvidence:
        "future tracked separation of execute and verify duties",
      requiredFutureTestEvidence:
        "future denied deletion execution without verification tests",
      blockerStatus: "NOT_AUTHORIZED",
      futureOnlyClosureCriterion:
        "future retention/deletion separation evidence required",
    }),
    bypassRisk("ASAM-BR-014", {
      risk: "provider-route approval through support privilege",
      currentEvidenceLevel: "UNKNOWN_NOT_EVIDENCED",
      currentNonAuthorization:
        "support identity does not grant route authorization",
      dependency: "third-party/provider deny-by-default routing",
      requiredFutureImplementationEvidence:
        "future tracked provider route authorization evidence",
      requiredFutureTestEvidence:
        "future denied provider-route approval tests",
      blockerStatus: "NOT_AUTHORIZED",
      futureOnlyClosureCriterion:
        "future provider-route authorization evidence required",
    }),
    bypassRisk("ASAM-BR-015", {
      risk: "external-use approval through support privilege",
      currentEvidenceLevel: "UNKNOWN_NOT_EVIDENCED",
      currentNonAuthorization:
        "support identity does not grant external-use authorization",
      dependency: "external-use approval remains separate",
      requiredFutureImplementationEvidence:
        "future tracked release/external-use approval boundary evidence",
      requiredFutureTestEvidence:
        "future denied external-use approval tests",
      blockerStatus: "NOT_AUTHORIZED",
      futureOnlyClosureCriterion:
        "future external-use approval boundary evidence required",
    }),
    bypassRisk("ASAM-BR-016", {
      risk: "human-review bypass",
      currentEvidenceLevel: "SCOPE_REVIEW_ONLY",
      currentNonAuthorization:
        "support identity does not permit bypass of human/professional review",
      dependency: "human/professional-review gate",
      requiredFutureImplementationEvidence:
        "future tracked human-review non-bypass evidence",
      requiredFutureTestEvidence: "future denied human-review bypass tests",
      blockerStatus: "NOT_AUTHORIZED",
      futureOnlyClosureCriterion:
        "future human-review non-bypass evidence required",
    }),
    bypassRisk("ASAM-BR-017", {
      risk: "impersonation/session takeover",
      currentEvidenceLevel: "UNKNOWN_NOT_EVIDENCED",
      currentNonAuthorization:
        "impersonation is not authorized or implemented",
      dependency: "session and identity-boundary model",
      requiredFutureImplementationEvidence:
        "future tracked impersonation denial evidence",
      requiredFutureTestEvidence:
        "future denied impersonation/session assumption tests",
      blockerStatus: "NOT_AUTHORIZED",
      futureOnlyClosureCriterion:
        "future impersonation denial evidence required",
    }),
    bypassRisk("ASAM-BR-018", {
      risk: "emergency or break-glass misuse",
      currentEvidenceLevel: "UNKNOWN_NOT_EVIDENCED",
      currentNonAuthorization:
        "break-glass access is not authorized or implemented",
      dependency: "separate future emergency-access scope if ever proposed",
      requiredFutureImplementationEvidence:
        "future tracked break-glass boundary evidence",
      requiredFutureTestEvidence: "future denied emergency-access tests",
      blockerStatus: "NOT_AUTHORIZED",
      futureOnlyClosureCriterion:
        "future emergency-access evidence required",
    }),
  ]);

const listAdminSupportAccessModelScopeReviewAccessPathRows = () =>
  cloneAndFreeze(ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_ACCESS_PATH_ROWS);

const listAdminSupportAccessModelScopeReviewBypassRiskRows = () =>
  cloneAndFreeze(ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_BYPASS_RISK_ROWS);

const getAdminSupportAccessModelScopeReviewRegistrySummary = () =>
  cloneAndFreeze({
    registryName: ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_REGISTRY_NAME,
    registryVersion: ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_REGISTRY_VERSION,
    posture: Object.values(
      ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_REGISTRY_POSTURE,
    ),
    accessPathCount:
      ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_ACCESS_PATH_ROWS.length,
    bypassRiskCount:
      ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_BYPASS_RISK_ROWS.length,
    sourceProvenanceSeparated: true,
    legacyEvidenceRewritten: false,
    sourceEvidence:
      ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_SOURCE_EVIDENCE,
    acceptedMergeProvenance:
      ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_ACCEPTED_MERGE_PROVENANCE,
    allowedEvidenceLabels:
      ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_ALLOWED_EVIDENCE_LABELS,
    forbiddenPositiveLabels:
      ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_FORBIDDEN_POSITIVE_LABELS,
    nonAuthorizationFlags:
      ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_NON_AUTHORIZATION_FLAGS,
  });

module.exports = {
  ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_ACCEPTED_MERGE_PROVENANCE,
  ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_ACCESS_PATH_ROWS,
  ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_ALLOWED_EVIDENCE_LABELS,
  ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_BYPASS_RISK_ROWS,
  ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_FORBIDDEN_POSITIVE_LABELS,
  ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_NON_AUTHORIZATION_FLAGS,
  ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_REGISTRY_NAME,
  ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_REGISTRY_POSTURE,
  ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_REGISTRY_VERSION,
  ADMIN_SUPPORT_ACCESS_MODEL_SCOPE_REVIEW_SOURCE_EVIDENCE,
  getAdminSupportAccessModelScopeReviewRegistrySummary,
  listAdminSupportAccessModelScopeReviewAccessPathRows,
  listAdminSupportAccessModelScopeReviewBypassRiskRows,
};
