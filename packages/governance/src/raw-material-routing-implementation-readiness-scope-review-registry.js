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

const RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_SCOPE_REVIEW_REGISTRY_STATUS =
  deepFreeze({
    GOVERNANCE_REGISTRY_SCAFFOLD_ONLY:
      "GOVERNANCE_REGISTRY_SCAFFOLD_ONLY",
    PROVE_ONLY: "PROVE_ONLY",
    DOCS_ONLY_IMPLEMENTATION_READINESS_SCOPE_REVIEW_ONLY:
      "DOCS_ONLY_IMPLEMENTATION_READINESS_SCOPE_REVIEW_ONLY",
    TEST_ONLY_ALIGNMENT_PROOF_ONLY: "TEST_ONLY_ALIGNMENT_PROOF_ONLY",
    REVIEW_SUPPORT_ONLY: "REVIEW_SUPPORT_ONLY",
    DEPENDENCY_ONLY: "DEPENDENCY_ONLY",
    FUTURE_ONLY_CLOSURE_CRITERIA: "FUTURE_ONLY_CLOSURE_CRITERIA",
    RAW_MATERIAL_ROUTING_IMPLEMENTATION_NOT_CREATED:
      "RAW_MATERIAL_ROUTING_IMPLEMENTATION_NOT_CREATED",
    RAW_MATERIAL_ROUTING_NOT_IMPLEMENTED:
      "RAW_MATERIAL_ROUTING_NOT_IMPLEMENTED",
    ROUTE_POLICY_NOT_IMPLEMENTED: "ROUTE_POLICY_NOT_IMPLEMENTED",
    ROUTE_DECISION_ENGINE_NOT_CREATED:
      "ROUTE_DECISION_ENGINE_NOT_CREATED",
    QUARANTINE_OR_BLOCK_PATH_REQUIRED:
      "QUARANTINE_OR_BLOCK_PATH_REQUIRED",
    RUNTIME_GATES_NOT_CREATED: "RUNTIME_GATES_NOT_CREATED",
    VALIDATOR_DISPATCH_NOT_CREATED: "VALIDATOR_DISPATCH_NOT_CREATED",
    REGISTRY_LOOKUP_NOT_CREATED: "REGISTRY_LOOKUP_NOT_CREATED",
    RUNTIME_REGISTRY_LOOKUP_NOT_CREATED:
      "RUNTIME_REGISTRY_LOOKUP_NOT_CREATED",
    MATERIAL_CLASS_REGISTRY_NOT_IMPLEMENTED:
      "MATERIAL_CLASS_REGISTRY_NOT_IMPLEMENTED",
    SCOPE_MODEL_NOT_IMPLEMENTED: "SCOPE_MODEL_NOT_IMPLEMENTED",
    RBAC_ACCESS_CONTROL_ENFORCEMENT_NOT_CREATED:
      "RBAC_ACCESS_CONTROL_ENFORCEMENT_NOT_CREATED",
    ADMIN_SUPPORT_ACCESS_AUTHORIZATION_NOT_CREATED:
      "ADMIN_SUPPORT_ACCESS_AUTHORIZATION_NOT_CREATED",
    AUDIT_ACCESS_LOG_IMPLEMENTATION_NOT_CREATED:
      "AUDIT_ACCESS_LOG_IMPLEMENTATION_NOT_CREATED",
    THIRD_PARTY_ROUTING_NOT_AUTHORIZED:
      "THIRD_PARTY_ROUTING_NOT_AUTHORIZED",
    RETENTION_DELETION_ENCRYPTION_IMPLEMENTATION_NOT_CREATED:
      "RETENTION_DELETION_ENCRYPTION_IMPLEMENTATION_NOT_CREATED",
    CHAIN_OF_CUSTODY_NOT_CREATED: "CHAIN_OF_CUSTODY_NOT_CREATED",
    SECURITY_FINDING_NOT_CREATED: "SECURITY_FINDING_NOT_CREATED",
    SEVERITY_NOT_ASSIGNED: "SEVERITY_NOT_ASSIGNED",
    REMEDIATION_NOT_RECOMMENDED: "REMEDIATION_NOT_RECOMMENDED",
    EXTERNAL_USE_NOT_AUTHORIZED: "EXTERNAL_USE_NOT_AUTHORIZED",
    PRODUCT_CANDIDATE_NONE: "PRODUCT_CANDIDATE_NONE",
    RUNTIME_CERTIFICATION_NOT_CREATED:
      "RUNTIME_CERTIFICATION_NOT_CREATED",
    TECHNICAL_SIGN_OFF_NOT_CREATED: "TECHNICAL_SIGN_OFF_NOT_CREATED",
    HUMAN_PROFESSIONAL_REVIEW_REQUIRED:
      "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    UNKNOWN_NOT_EVIDENCED: "UNKNOWN_NOT_EVIDENCED",
  });

const RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_SCOPE_REVIEW_MATERIAL_CLASSES =
  deepFreeze({
    SANITIZED_NO_RAW_REVIEW_MATERIAL: "sanitized/no-raw review material",
    REDACTED_REVIEW_SIGNALS: "redacted review signals",
    NO_RAW_METADATA_MANIFEST_MATERIAL:
      "no-raw metadata manifest material",
    GENERATED_EXPORT_ARTIFACTS: "generated/export artifacts",
    LOCAL_LOGS_TEST_TRANSCRIPTS: "local logs/test transcripts",
    RAW_PRIVATE_SOURCE_MATERIAL: "raw private source material",
    SOURCE_PACKAGES: "source packages",
    PDF_IMAGE_SCREENSHOT_METADATA_MATERIAL:
      "PDF/image/screenshot/metadata material",
    THIRD_PARTY_MODEL_API_ROUTED_MATERIAL:
      "third-party model/API routed material",
    HUMAN_PROFESSIONAL_REVIEW_ONLY_MATERIAL:
      "human/professional review-only material",
    UNKNOWN_UNCLASSIFIED_MATERIAL: "unknown/unclassified material",
    MIXED_OR_AMBIGUOUS_MATERIAL_BUNDLES:
      "mixed or ambiguous material bundles",
  });

const BASE_LINEAGE = deepFreeze([
  "PR_29_COURT_ADJACENT_HIGH_RISK_AI_READINESS_GAP_MATRIX_SCAFFOLD",
  "PR_30_RBAC_ADMIN_SUPPORT_SCOPE_REVIEW_REGISTRY_SCAFFOLD",
  "PR_31_RBAC_ADMIN_SUPPORT_SCOPE_REVIEW_REGISTRY_ALIGNMENT_PROOF",
  "PR_32_COURT_ADJACENT_RBAC_ADMIN_SUPPORT_DEPENDENCY_CROSSWALK_PROOF",
  "PR_33_ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_SELECTION_BOUNDARY",
  "PR_34_ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_SELECTION_ALIGNMENT_PROOF",
  "PR_35_ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_SELECTION_REGISTRY_SCAFFOLD",
  "PR_36_ADMIN_SUPPORT_SUB_SCOPE_CLARIFICATION_SELECTION_REGISTRY_ALIGNMENT_PROOF",
  "PR_37_AUDIT_ACCESS_LOG_ADMIN_SUPPORT_DEPENDENCY_MAPPING",
  "PR_38_AUDIT_ACCESS_LOG_IMPLEMENTATION_GAP_INVENTORY",
  "PR_39_RBAC_ROLE_PERMISSION_ADMIN_SUPPORT_SCOPE_REVIEW",
  "PR_40_RBAC_ROLE_PERMISSION_ADMIN_SUPPORT_SCOPE_REVIEW_ALIGNMENT_PROOF",
  "PR_41_RBAC_ROLE_PERMISSION_ADMIN_SUPPORT_SCOPE_REVIEW_REGISTRY_SCAFFOLD",
  "PR_42_RBAC_ROLE_PERMISSION_ADMIN_SUPPORT_SCOPE_REVIEW_REGISTRY_ALIGNMENT_PROOF",
  "PR_43_RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_SCOPE_REVIEW",
  "PR_44_RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_SCOPE_REVIEW_ALIGNMENT_PROOF",
]);

const BASE_STATUS_LABELS = deepFreeze([
  RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_SCOPE_REVIEW_REGISTRY_STATUS
    .GOVERNANCE_REGISTRY_SCAFFOLD_ONLY,
  RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_SCOPE_REVIEW_REGISTRY_STATUS
    .PROVE_ONLY,
  RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_SCOPE_REVIEW_REGISTRY_STATUS
    .DOCS_ONLY_IMPLEMENTATION_READINESS_SCOPE_REVIEW_ONLY,
  RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_SCOPE_REVIEW_REGISTRY_STATUS
    .TEST_ONLY_ALIGNMENT_PROOF_ONLY,
  RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_SCOPE_REVIEW_REGISTRY_STATUS
    .REVIEW_SUPPORT_ONLY,
  RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_SCOPE_REVIEW_REGISTRY_STATUS
    .DEPENDENCY_ONLY,
  RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_SCOPE_REVIEW_REGISTRY_STATUS
    .FUTURE_ONLY_CLOSURE_CRITERIA,
  RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_SCOPE_REVIEW_REGISTRY_STATUS
    .RAW_MATERIAL_ROUTING_IMPLEMENTATION_NOT_CREATED,
  RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_SCOPE_REVIEW_REGISTRY_STATUS
    .RAW_MATERIAL_ROUTING_NOT_IMPLEMENTED,
  RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_SCOPE_REVIEW_REGISTRY_STATUS
    .ROUTE_POLICY_NOT_IMPLEMENTED,
  RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_SCOPE_REVIEW_REGISTRY_STATUS
    .ROUTE_DECISION_ENGINE_NOT_CREATED,
  RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_SCOPE_REVIEW_REGISTRY_STATUS
    .QUARANTINE_OR_BLOCK_PATH_REQUIRED,
  RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_SCOPE_REVIEW_REGISTRY_STATUS
    .RUNTIME_GATES_NOT_CREATED,
  RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_SCOPE_REVIEW_REGISTRY_STATUS
    .VALIDATOR_DISPATCH_NOT_CREATED,
  RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_SCOPE_REVIEW_REGISTRY_STATUS
    .REGISTRY_LOOKUP_NOT_CREATED,
  RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_SCOPE_REVIEW_REGISTRY_STATUS
    .RUNTIME_REGISTRY_LOOKUP_NOT_CREATED,
  RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_SCOPE_REVIEW_REGISTRY_STATUS
    .MATERIAL_CLASS_REGISTRY_NOT_IMPLEMENTED,
  RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_SCOPE_REVIEW_REGISTRY_STATUS
    .SCOPE_MODEL_NOT_IMPLEMENTED,
  RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_SCOPE_REVIEW_REGISTRY_STATUS
    .RBAC_ACCESS_CONTROL_ENFORCEMENT_NOT_CREATED,
  RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_SCOPE_REVIEW_REGISTRY_STATUS
    .ADMIN_SUPPORT_ACCESS_AUTHORIZATION_NOT_CREATED,
  RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_SCOPE_REVIEW_REGISTRY_STATUS
    .AUDIT_ACCESS_LOG_IMPLEMENTATION_NOT_CREATED,
  RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_SCOPE_REVIEW_REGISTRY_STATUS
    .THIRD_PARTY_ROUTING_NOT_AUTHORIZED,
  RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_SCOPE_REVIEW_REGISTRY_STATUS
    .RETENTION_DELETION_ENCRYPTION_IMPLEMENTATION_NOT_CREATED,
  RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_SCOPE_REVIEW_REGISTRY_STATUS
    .CHAIN_OF_CUSTODY_NOT_CREATED,
  RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_SCOPE_REVIEW_REGISTRY_STATUS
    .SECURITY_FINDING_NOT_CREATED,
  RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_SCOPE_REVIEW_REGISTRY_STATUS
    .SEVERITY_NOT_ASSIGNED,
  RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_SCOPE_REVIEW_REGISTRY_STATUS
    .REMEDIATION_NOT_RECOMMENDED,
  RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_SCOPE_REVIEW_REGISTRY_STATUS
    .EXTERNAL_USE_NOT_AUTHORIZED,
  RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_SCOPE_REVIEW_REGISTRY_STATUS
    .PRODUCT_CANDIDATE_NONE,
  RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_SCOPE_REVIEW_REGISTRY_STATUS
    .RUNTIME_CERTIFICATION_NOT_CREATED,
  RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_SCOPE_REVIEW_REGISTRY_STATUS
    .TECHNICAL_SIGN_OFF_NOT_CREATED,
  RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_SCOPE_REVIEW_REGISTRY_STATUS
    .HUMAN_PROFESSIONAL_REVIEW_REQUIRED,
]);

const BASE_NON_AUTHORIZATION = deepFreeze({
  authorized: false,
  route_authorized: false,
  raw_material_routing_implemented: false,
  route_policy_implemented: false,
  route_decision_engine_created: false,
  quarantine_implemented: false,
  block_path_implemented: false,
  runtime_gate_created: false,
  runtime_gate_implemented: false,
  validator_dispatch_created: false,
  registry_lookup_created: false,
  runtime_registry_lookup_created: false,
  material_class_registry_implemented: false,
  scope_model_implemented: false,
  rbac_implemented: false,
  access_control_implemented: false,
  access_control_enforced: false,
  admin_support_access_authorized: false,
  audit_access_log_implemented: false,
  audit_logging_implemented: false,
  access_logging_implemented: false,
  event_emitter_created: false,
  log_schema_created: false,
  log_storage_created: false,
  log_viewer_created: false,
  log_access_control_implemented: false,
  third_party_routing_authorized: false,
  provider_routing_authorized: false,
  retention_deletion_encryption_implemented: false,
  chain_of_custody_created: false,
  blocker_closure_created: false,
  security_finding_created: false,
  vulnerability_finding_created: false,
  severity_assigned: false,
  remediation_recommended: false,
  remediation_implemented: false,
  release_approved: false,
  external_use_authorized: false,
  product_candidate_selected: false,
  product_candidate_authorized: false,
  technical_signoff_created: false,
  runtime_certification_created: false,
  court_ready_created: false,
  ai_act_compliance_created: false,
  high_risk_approval_created: false,
  legal_clinical_evidentiary_case_truth_conclusion_created: false,
  runtime_api_schema_package_behavior_changed: false,
});

const makeRow = ({
  rowId,
  materialClass,
  allowedIngress,
  prohibitedIngress,
  allowedProcessingLayer,
  prohibitedProcessingLayer,
  allowedEgress,
  prohibitedEgress,
  requiredRedactionSanitizationPoint,
  requiredAuditAccessLogEvent,
  retentionDeletionDependency,
  rbacAccessControlDependency,
  adminSupportDependency,
  thirdPartyModelApiConstraint,
  currentEvidenceLevel,
  intendedEnforcementLayer,
  implementationGap,
  requiredImplementationEvidence,
  requiredTestEvidence,
  blockerStatus,
  closureCriteria,
}) =>
  deepFreeze({
    rowId,
    materialClass,
    allowedIngress,
    prohibitedIngress,
    allowedProcessingLayer,
    prohibitedProcessingLayer,
    allowedEgress,
    prohibitedEgress,
    requiredRedactionSanitizationPoint,
    requiredAuditAccessLogEvent,
    retentionDeletionDependency,
    rbacAccessControlDependency,
    adminSupportDependency,
    thirdPartyModelApiConstraint,
    currentEvidenceLevel,
    intendedEnforcementLayer,
    implementationGap,
    requiredImplementationEvidence,
    requiredTestEvidence,
    blockerStatus,
    closureCriteria,
    remainsNonAuthorizedUntilClosure: true,
    lineage: BASE_LINEAGE,
    nonAuthorization: BASE_NON_AUTHORIZATION,
    statusLabels: BASE_STATUS_LABELS,
  });

const RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_SCOPE_REVIEW_REGISTRY_ROWS =
  deepFreeze({
    "RMR-IR-SR-001": makeRow({
      rowId: "RMR-IR-SR-001",
      materialClass:
        RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_SCOPE_REVIEW_MATERIAL_CLASSES
          .SANITIZED_NO_RAW_REVIEW_MATERIAL,
      allowedIngress: "tracked sanitized governance docs and no-raw review summaries",
      prohibitedIngress:
        "raw/private/source content, source locators, source packages, PDF/image/screenshot/metadata, provider payloads, URLs, tokens, secrets",
      allowedProcessingLayer: "docs-only review support",
      prohibitedProcessingLayer:
        "runtime route processing, provider processing, source inspection, metadata acquisition",
      allowedEgress: "governance status and review-support pointers",
      prohibitedEgress:
        "no external-use, no product use, no delivery approval, no court-ready claim",
      requiredRedactionSanitizationPoint:
        "sanitize before any future route candidate",
      requiredAuditAccessLogEvent:
        "future category-only sanitized route decision event; no payload",
      retentionDeletionDependency:
        "lifecycle policy required before persistence or delivery",
      rbacAccessControlDependency:
        "role/permission policy required before route use",
      adminSupportDependency: "admin/support cannot bypass review gate",
      thirdPartyModelApiConstraint:
        "third-party/API route remains not authorized",
      currentEvidenceLevel: "DOCS_ONLY; PARTIAL_SCOPE_CONTEXT_ONLY",
      intendedEnforcementLayer: "future workflow gate candidate only",
      implementationGap:
        "no route policy implementation; no route decision engine; no audit/access-log implementation",
      requiredImplementationEvidence:
        "future sanitized-only route evidence if separately authorized",
      requiredTestEvidence: "future no-raw/no-private/no-source-locator tests",
      blockerStatus: "OPEN_DEPENDENCY",
      closureCriteria:
        "separate tracked implementation evidence plus focused tests plus human/professional review",
    }),
    "RMR-IR-SR-002": makeRow({
      rowId: "RMR-IR-SR-002",
      materialClass:
        RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_SCOPE_REVIEW_MATERIAL_CLASSES
          .REDACTED_REVIEW_SIGNALS,
      allowedIngress: "tracked redacted review signal summaries only",
      prohibitedIngress:
        "raw facts, private facts, unredacted snippets, source locators, URLs, tokens, secrets",
      allowedProcessingLayer: "human/professional review support",
      prohibitedProcessingLayer:
        "automated conclusion generation, provider route, runtime decisioning",
      allowedEgress: "review-only signal references",
      prohibitedEgress:
        "no approval, no sign-off, no legal/clinical/evidentiary/case-truth conclusion",
      requiredRedactionSanitizationPoint:
        "redaction before any review-support route",
      requiredAuditAccessLogEvent:
        "future category-only redacted signal access event",
      retentionDeletionDependency:
        "review-signal retention/deletion policy required",
      rbacAccessControlDependency: "review-role policy required",
      adminSupportDependency: "admin/support access remains unresolved",
      thirdPartyModelApiConstraint:
        "third-party/API route remains not authorized",
      currentEvidenceLevel: "DOCS_ONLY; REVIEW_SUPPORT_ONLY",
      intendedEnforcementLayer: "future review workflow gate candidate only",
      implementationGap:
        "no redaction workflow implementation; no review route gate",
      requiredImplementationEvidence:
        "future redacted-review workflow evidence",
      requiredTestEvidence:
        "future redaction/no-conclusion/no-approval tests",
      blockerStatus: "OPEN_DEPENDENCY",
      closureCriteria:
        "separate workflow evidence and tests; closure criteria do not mean closure",
    }),
    "RMR-IR-SR-003": makeRow({
      rowId: "RMR-IR-SR-003",
      materialClass:
        RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_SCOPE_REVIEW_MATERIAL_CLASSES
          .NO_RAW_METADATA_MANIFEST_MATERIAL,
      allowedIngress: "tracked no-raw manifest contract/status only",
      prohibitedIngress:
        "active metadata acquisition, source metadata, exact paths, PDF/image/screenshot metadata, URLs, tokens, secrets",
      allowedProcessingLayer: "docs-only manifest boundary review",
      prohibitedProcessingLayer:
        "metadata acquisition, manifest population from source, runtime registry lookup",
      allowedEgress: "manifest status labels and contract pointers",
      prohibitedEgress:
        "evidence packet promotion, product use, external-use",
      requiredRedactionSanitizationPoint:
        "no-raw contract before any future manifest use",
      requiredAuditAccessLogEvent:
        "future category-only manifest validation event",
      retentionDeletionDependency:
        "manifest lifecycle policy required if persisted",
      rbacAccessControlDependency: "manifest access policy required",
      adminSupportDependency: "admin/support cannot populate manifest",
      thirdPartyModelApiConstraint:
        "third-party/API route remains not authorized",
      currentEvidenceLevel: "DOCS_ONLY; CONTRACT_CONTEXT_ONLY",
      intendedEnforcementLayer: "future schema/validator gate candidate only",
      implementationGap:
        "no metadata acquisition contract; no consumer path; no registry lookup",
      requiredImplementationEvidence:
        "future acquisition-denial or explicit acquisition contract evidence",
      requiredTestEvidence:
        "future no-acquisition/no-source-metadata tests",
      blockerStatus: "OPEN_DEPENDENCY",
      closureCriteria:
        "separate contract/implementation evidence and tests; closure criteria do not mean closure",
    }),
    "RMR-IR-SR-004": makeRow({
      rowId: "RMR-IR-SR-004",
      materialClass:
        RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_SCOPE_REVIEW_MATERIAL_CLASSES
          .GENERATED_EXPORT_ARTIFACTS,
      allowedIngress: "tracked generated/export artifact governance references",
      prohibitedIngress:
        "raw/private/source material, packet/delivery approval, court/external-use claims",
      allowedProcessingLayer: "docs-only export-readiness review",
      prohibitedProcessingLayer:
        "runtime export/download gate, delivery gate, product packaging",
      allowedEgress: "scoped governance artifact references",
      prohibitedEgress:
        "no External Reviewer delivery, no external-use, no release approval, no product candidate",
      requiredRedactionSanitizationPoint:
        "sanitize/redact before any future export candidate",
      requiredAuditAccessLogEvent:
        "future category-only export/download decision event",
      retentionDeletionDependency: "artifact lifecycle policy required",
      rbacAccessControlDependency:
        "export/download role policy required",
      adminSupportDependency:
        "admin/support export cannot authorize delivery",
      thirdPartyModelApiConstraint: "provider delivery remains not authorized",
      currentEvidenceLevel: "DOCS_ONLY; PARTIAL_CONTEXT_ONLY",
      intendedEnforcementLayer: "future runtime gate candidate only",
      implementationGap:
        "no packet/delivery gate; no role-aware export/download policy",
      requiredImplementationEvidence:
        "future export/download control evidence",
      requiredTestEvidence:
        "future allow/deny, wrong-case, overexposure, no-delivery tests",
      blockerStatus: "OPEN_DEPENDENCY",
      closureCriteria:
        "separate release/external-use boundary if ever claimed",
    }),
    "RMR-IR-SR-005": makeRow({
      rowId: "RMR-IR-SR-005",
      materialClass:
        RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_SCOPE_REVIEW_MATERIAL_CLASSES
          .LOCAL_LOGS_TEST_TRANSCRIPTS,
      allowedIngress:
        "none; only summarized tracked validation status if later explicitly written",
      prohibitedIngress:
        "local log bodies, CI logs, terminal transcripts, raw output, private facts, source locators",
      allowedProcessingLayer: "docs-only boundary statement",
      prohibitedProcessingLayer:
        "local log inspection, CI log inspection, packet component treatment",
      allowedEgress: "non-evidence boundary note",
      prohibitedEgress:
        "CI evidence claim, release evidence claim, packet component claim",
      requiredRedactionSanitizationPoint:
        "summarize without log body if separately authorized",
      requiredAuditAccessLogEvent:
        "future category-only local-log treatment event",
      retentionDeletionDependency: "log retention/deletion policy required",
      rbacAccessControlDependency: "log access policy required",
      adminSupportDependency: "admin/support cannot promote logs",
      thirdPartyModelApiConstraint:
        "provider payloads in logs remain prohibited",
      currentEvidenceLevel: "DOCS_ONLY; NOT_CI_EVIDENCE",
      intendedEnforcementLayer: "docs-only until separate authorization",
      implementationGap:
        "no log classification path; no audit/access-log implementation",
      requiredImplementationEvidence: "future local-log policy evidence",
      requiredTestEvidence: "future local-log non-CI/non-packet tests",
      blockerStatus: "OPEN_DEPENDENCY",
      closureCriteria:
        "separate log policy and proof; closure criteria do not mean closure",
    }),
    "RMR-IR-SR-006": makeRow({
      rowId: "RMR-IR-SR-006",
      materialClass:
        RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_SCOPE_REVIEW_MATERIAL_CLASSES
          .RAW_PRIVATE_SOURCE_MATERIAL,
      allowedIngress: "none",
      prohibitedIngress:
        "all raw/private/source ingress, source locators, private facts, real private case material",
      allowedProcessingLayer: "none",
      prohibitedProcessingLayer:
        "all runtime/workflow/model/API processing",
      allowedEgress: "none",
      prohibitedEgress:
        "all egress, provider routing, external-use, product use",
      requiredRedactionSanitizationPoint:
        "none until separate explicit future authorization",
      requiredAuditAccessLogEvent:
        "future category-only attempted-ingress denial event; no content",
      retentionDeletionDependency:
        "retention/deletion policy required before any authorized handling",
      rbacAccessControlDependency:
        "RBAC/access-control required before any authorized handling",
      adminSupportDependency:
        "admin/support access authorization not created",
      thirdPartyModelApiConstraint: "third-party/API routing blocked",
      currentEvidenceLevel: "NOT_AUTHORIZED; EXPLICITLY_UNRESOLVED",
      intendedEnforcementLayer: "not authorized until separate approval",
      implementationGap:
        "no deny/quarantine runtime path; no raw-route policy",
      requiredImplementationEvidence:
        "future deny/quarantine and minimization evidence if separately authorized",
      requiredTestEvidence:
        "future raw/private denial, quarantine, no-leakage tests",
      blockerStatus: "BLOCKED",
      closureCriteria:
        "separate explicit authorization plus tracked denial/control evidence and tests",
    }),
    "RMR-IR-SR-007": makeRow({
      rowId: "RMR-IR-SR-007",
      materialClass:
        RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_SCOPE_REVIEW_MATERIAL_CLASSES
          .SOURCE_PACKAGES,
      allowedIngress: "none",
      prohibitedIngress:
        "source package inspection, archive/ZIP opening, source package routing",
      allowedProcessingLayer: "none",
      prohibitedProcessingLayer:
        "package/source inspection, model/API processing, metadata extraction",
      allowedEgress: "none",
      prohibitedEgress:
        "archive delivery, model/API egress, external-use",
      requiredRedactionSanitizationPoint:
        "none until separate explicit future authorization",
      requiredAuditAccessLogEvent:
        "future category-only attempted-package denial event; no content",
      retentionDeletionDependency:
        "package lifecycle policy required before any authorized handling",
      rbacAccessControlDependency: "package access policy required",
      adminSupportDependency: "admin/support cannot inspect packages",
      thirdPartyModelApiConstraint: "third-party/API routing blocked",
      currentEvidenceLevel: "NOT_AUTHORIZED; FUTURE_ONLY",
      intendedEnforcementLayer: "not authorized until separate approval",
      implementationGap:
        "no source package handling policy; no quarantine/block path",
      requiredImplementationEvidence:
        "future source-package deny/quarantine evidence",
      requiredTestEvidence:
        "future source-package denial and no-archive-route tests",
      blockerStatus: "BLOCKED",
      closureCriteria:
        "separate explicit authorization and tests prove blocking or bounded handling",
    }),
    "RMR-IR-SR-008": makeRow({
      rowId: "RMR-IR-SR-008",
      materialClass:
        RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_SCOPE_REVIEW_MATERIAL_CLASSES
          .PDF_IMAGE_SCREENSHOT_METADATA_MATERIAL,
      allowedIngress: "none",
      prohibitedIngress:
        "PDF/image/screenshot inspection, OCR, metadata extraction, page references, private file paths",
      allowedProcessingLayer: "none",
      prohibitedProcessingLayer:
        "OCR, metadata acquisition, model/API processing, packet promotion",
      allowedEgress: "none",
      prohibitedEgress:
        "repo evidence claim, product use, external-use, provider route",
      requiredRedactionSanitizationPoint:
        "none until separate explicit future authorization",
      requiredAuditAccessLogEvent:
        "future category-only attempted-inspection denial event; no content",
      retentionDeletionDependency:
        "metadata lifecycle policy required before any authorized handling",
      rbacAccessControlDependency: "metadata access policy required",
      adminSupportDependency: "admin/support cannot acquire metadata",
      thirdPartyModelApiConstraint: "third-party/API routing blocked",
      currentEvidenceLevel: "NOT_AUTHORIZED; DOCS_ONLY",
      intendedEnforcementLayer: "not authorized until separate approval",
      implementationGap:
        "no inspection/acquisition path; no metadata route",
      requiredImplementationEvidence:
        "future inspection-denial/acquisition-boundary evidence",
      requiredTestEvidence:
        "future no-inspection, no-acquisition, no-packet tests",
      blockerStatus: "BLOCKED",
      closureCriteria:
        "separate explicit authorization and no-leak tests",
    }),
    "RMR-IR-SR-009": makeRow({
      rowId: "RMR-IR-SR-009",
      materialClass:
        RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_SCOPE_REVIEW_MATERIAL_CLASSES
          .THIRD_PARTY_MODEL_API_ROUTED_MATERIAL,
      allowedIngress: "none for raw/private; sanitized-only route remains unresolved",
      prohibitedIngress:
        "provider payloads, prompts, responses, raw/private/source material, URLs, tokens, secrets",
      allowedProcessingLayer: "none until provider posture is separately authorized",
      prohibitedProcessingLayer: "third-party model/API processing",
      allowedEgress: "none",
      prohibitedEgress:
        "provider egress, external-use, product use",
      requiredRedactionSanitizationPoint:
        "sanitize/redact before any separately authorized future provider route",
      requiredAuditAccessLogEvent:
        "future category-only provider route denial event; no payload",
      retentionDeletionDependency:
        "provider retention/deletion posture required",
      rbacAccessControlDependency: "route authorization policy required",
      adminSupportDependency:
        "admin/support route approval not sufficient",
      thirdPartyModelApiConstraint:
        "third-party/API routing remains not authorized",
      currentEvidenceLevel:
        "EXPLICITLY_UNRESOLVED; ARCHITECTURE_REQUIRED_FIRST",
      intendedEnforcementLayer: "future provider route gate candidate only",
      implementationGap:
        "no provider registry/status, no data-routing map, no provider auditability",
      requiredImplementationEvidence:
        "future provider posture and no-route control evidence",
      requiredTestEvidence:
        "future no-route, no-token, no-URL, no-payload tests",
      blockerStatus: "BLOCKED",
      closureCriteria:
        "separate provider-routing authorization plus implementation and tests",
    }),
    "RMR-IR-SR-010": makeRow({
      rowId: "RMR-IR-SR-010",
      materialClass:
        RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_SCOPE_REVIEW_MATERIAL_CLASSES
          .HUMAN_PROFESSIONAL_REVIEW_ONLY_MATERIAL,
      allowedIngress: "review-gate context only",
      prohibitedIngress:
        "raw/private/source unless separately authorized, automated conclusions, release claims",
      allowedProcessingLayer: "human/professional review support",
      prohibitedProcessingLayer:
        "automated approval, product selection, court/AI Act readiness declaration",
      allowedEgress: "review-only handoff",
      prohibitedEgress:
        "no approval, no technical sign-off, no external-use, no court-ready claim",
      requiredRedactionSanitizationPoint:
        "redaction before review handoff if material is sensitive",
      requiredAuditAccessLogEvent:
        "future category-only review access event; no conclusion",
      retentionDeletionDependency:
        "review-material lifecycle policy required",
      rbacAccessControlDependency: "review-role policy required",
      adminSupportDependency: "admin/support cannot replace review",
      thirdPartyModelApiConstraint:
        "third-party/API routing remains not authorized",
      currentEvidenceLevel:
        "HUMAN_PROFESSIONAL_REVIEW_REQUIRED; DOCS_ONLY",
      intendedEnforcementLayer: "human/professional review gate required",
      implementationGap:
        "no review workflow gate evidence; no approval/sign-off gate",
      requiredImplementationEvidence: "future review workflow evidence",
      requiredTestEvidence:
        "future no-approval/no-signoff/no-conclusion tests",
      blockerStatus: "OPEN_DEPENDENCY",
      closureCriteria:
        "separate human/professional review evidence and explicit release boundary",
    }),
    "RMR-IR-SR-011": makeRow({
      rowId: "RMR-IR-SR-011",
      materialClass:
        RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_SCOPE_REVIEW_MATERIAL_CLASSES
          .UNKNOWN_UNCLASSIFIED_MATERIAL,
      allowedIngress: "none",
      prohibitedIngress: "all material ingress until classified",
      allowedProcessingLayer: "none",
      prohibitedProcessingLayer:
        "all runtime/workflow/model/API processing",
      allowedEgress: "none",
      prohibitedEgress: "all egress",
      requiredRedactionSanitizationPoint:
        "classify before any future route candidate",
      requiredAuditAccessLogEvent:
        "future category-only unknown denial event; no content",
      retentionDeletionDependency:
        "lifecycle policy required before any authorized handling",
      rbacAccessControlDependency:
        "fail-closed access policy required",
      adminSupportDependency: "admin/support cannot classify into access",
      thirdPartyModelApiConstraint: "third-party/API routing blocked",
      currentEvidenceLevel: "UNKNOWN_NOT_EVIDENCED; FAIL_CLOSED",
      intendedEnforcementLayer: "deny-by-default until classified",
      implementationGap: "no classification/runtime route path",
      requiredImplementationEvidence:
        "future classification and denial evidence",
      requiredTestEvidence: "future unknown-denial tests",
      blockerStatus: "BLOCKED",
      closureCriteria:
        "explicit classification, implementation evidence, tests, and review",
    }),
    "RMR-IR-SR-012": makeRow({
      rowId: "RMR-IR-SR-012",
      materialClass:
        RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_SCOPE_REVIEW_MATERIAL_CLASSES
          .MIXED_OR_AMBIGUOUS_MATERIAL_BUNDLES,
      allowedIngress: "none",
      prohibitedIngress:
        "mixed bundles containing any raw/private/source, source package, PDF/image/screenshot/metadata, URL, token, secret, provider payload, or unclear class",
      allowedProcessingLayer: "none",
      prohibitedProcessingLayer:
        "bundle splitting, runtime routing, provider routing, packet promotion",
      allowedEgress: "none",
      prohibitedEgress: "all egress until split/classified",
      requiredRedactionSanitizationPoint:
        "split and classify before any future route candidate",
      requiredAuditAccessLogEvent:
        "future category-only ambiguous-bundle denial event; no content",
      retentionDeletionDependency:
        "lifecycle policy required for each separated class",
      rbacAccessControlDependency:
        "class-aware access policy required",
      adminSupportDependency: "admin/support cannot clear ambiguity",
      thirdPartyModelApiConstraint: "third-party/API routing blocked",
      currentEvidenceLevel: "AMBIGUOUS_NOT_EVIDENCED; FAIL_CLOSED",
      intendedEnforcementLayer:
        "deny-by-default until separated and classified",
      implementationGap:
        "no mixed-bundle route path; no quarantine/block path",
      requiredImplementationEvidence:
        "future split/classify/quarantine evidence if separately authorized",
      requiredTestEvidence:
        "future mixed-bundle denial, no-leakage, no-provider-route tests",
      blockerStatus: "BLOCKED",
      closureCriteria:
        "separate classification and implementation evidence plus tests and review",
    }),
  });

const UNKNOWN_ROW = deepFreeze({
  rowId: "UNKNOWN_NOT_EVIDENCED",
  materialClass: "UNKNOWN_NOT_EVIDENCED",
  allowedIngress: "none",
  prohibitedIngress: "ALL_RUNTIME_ACTIONS_BLOCKED",
  allowedProcessingLayer: "none",
  prohibitedProcessingLayer: "ALL_RUNTIME_PROCESSING_BLOCKED",
  allowedEgress: "none",
  prohibitedEgress: "ALL_EGRESS_BLOCKED",
  requiredRedactionSanitizationPoint: "UNKNOWN_NOT_EVIDENCED",
  requiredAuditAccessLogEvent: "UNKNOWN_NOT_EVIDENCED",
  retentionDeletionDependency: "UNKNOWN_NOT_EVIDENCED",
  rbacAccessControlDependency: "UNKNOWN_NOT_EVIDENCED",
  adminSupportDependency: "UNKNOWN_NOT_EVIDENCED",
  thirdPartyModelApiConstraint: "UNKNOWN_NOT_EVIDENCED",
  currentEvidenceLevel: "UNKNOWN_NOT_EVIDENCED",
  intendedEnforcementLayer: "UNKNOWN_NOT_EVIDENCED",
  implementationGap: "UNKNOWN_NOT_EVIDENCED",
  requiredImplementationEvidence: "UNKNOWN_NOT_EVIDENCED",
  requiredTestEvidence: "UNKNOWN_NOT_EVIDENCED",
  blockerStatus: "UNKNOWN_NOT_EVIDENCED",
  closureCriteria: "UNKNOWN_NOT_EVIDENCED",
  remainsNonAuthorizedUntilClosure: true,
  lineage: BASE_LINEAGE,
  nonAuthorization: BASE_NON_AUTHORIZATION,
  statusLabels: [
    RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_SCOPE_REVIEW_REGISTRY_STATUS
      .UNKNOWN_NOT_EVIDENCED,
  ],
});

const listRawMaterialRoutingImplementationReadinessScopeReviewRows = () =>
  cloneAndFreeze(
    Object.values(
      RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_SCOPE_REVIEW_REGISTRY_ROWS,
    ),
  );

const getRawMaterialRoutingImplementationReadinessScopeReviewRow = (rowId) =>
  cloneAndFreeze(
    RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_SCOPE_REVIEW_REGISTRY_ROWS[
      rowId
    ] || UNKNOWN_ROW,
  );

const summarizeRawMaterialRoutingImplementationReadinessScopeReviewRegistry =
  () =>
    cloneAndFreeze({
      statusLabels: BASE_STATUS_LABELS,
      materialClasses: Object.values(
        RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_SCOPE_REVIEW_MATERIAL_CLASSES,
      ),
      lineage: BASE_LINEAGE,
      rowCount: Object.keys(
        RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_SCOPE_REVIEW_REGISTRY_ROWS,
      ).length,
      pr43ScopeReviewPosture:
        "DOCS_ONLY_IMPLEMENTATION_READINESS_SCOPE_REVIEW_ONLY",
      pr44AlignmentProofPosture: "TEST_ONLY_ALIGNMENT_PROOF_ONLY",
      dependencyOnly: true,
      futureOnlyClosureCriteria: true,
      localValidationIsCiEvidence: false,
      ciEvidenceIsReleaseApproval: false,
      ciEvidenceIsTechnicalSignoff: false,
      ciEvidenceIsRuntimeCertification: false,
      implementationCreated: false,
      runtimeApiSchemaPackageBehaviorChanged: false,
      humanProfessionalReviewRequired: true,
      nonAuthorization: BASE_NON_AUTHORIZATION,
    });

module.exports = {
  RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_SCOPE_REVIEW_MATERIAL_CLASSES,
  RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_SCOPE_REVIEW_REGISTRY_ROWS,
  RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_SCOPE_REVIEW_REGISTRY_STATUS,
  getRawMaterialRoutingImplementationReadinessScopeReviewRow,
  listRawMaterialRoutingImplementationReadinessScopeReviewRows,
  summarizeRawMaterialRoutingImplementationReadinessScopeReviewRegistry,
};
