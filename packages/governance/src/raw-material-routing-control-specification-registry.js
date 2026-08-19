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

const {
  LIFECYCLE_CONTROL_FAMILIES,
} = require("./retention-deletion-encryption-storage-dependency-registry.js");

const RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_STATUS = deepFreeze({
  GOVERNANCE_REGISTRY_SCAFFOLD_ONLY: "GOVERNANCE_REGISTRY_SCAFFOLD_ONLY",
  PROVE_ONLY: "PROVE_ONLY",
  DOCS_ONLY_CONTROL_SPECIFICATION_ONLY:
    "DOCS_ONLY_CONTROL_SPECIFICATION_ONLY",
  TEST_ONLY_ALIGNMENT_PROOF_ONLY: "TEST_ONLY_ALIGNMENT_PROOF_ONLY",
  REVIEW_SUPPORT_ONLY: "REVIEW_SUPPORT_ONLY",
  DEPENDENCY_ONLY: "DEPENDENCY_ONLY",
  FUTURE_ONLY_CLOSURE_CRITERIA: "FUTURE_ONLY_CLOSURE_CRITERIA",
  CONTROL_SPECIFICATION_ONLY: "CONTROL_SPECIFICATION_ONLY",
  ALIGNMENT_PROOF_ONLY: "ALIGNMENT_PROOF_ONLY",
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
  EXECUTABLE_REGISTRY_LOOKUP_NOT_CREATED:
    "EXECUTABLE_REGISTRY_LOOKUP_NOT_CREATED",
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
  THIRD_PARTY_MODEL_API_ROUTING_NOT_AUTHORIZED:
    "THIRD_PARTY_MODEL_API_ROUTING_NOT_AUTHORIZED",
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

const RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_REQUIRED_FIELDS =
  deepFreeze([
    "controlId",
    "materialClass",
    "allowedIngress",
    "prohibitedIngress",
    "allowedProcessingLayer",
    "prohibitedProcessingLayer",
    "allowedEgress",
    "prohibitedEgress",
    "requiredRedactionSanitizationPoint",
    "requiredAuditAccessLogEvent",
    "retentionDeletionDependency",
    "rbacAccessControlDependency",
    "thirdPartyModelApiConstraint",
    "currentEvidenceLevel",
    "intendedEnforcementLayer",
    "implementationGap",
    "requiredImplementationEvidence",
    "requiredTestEvidence",
    "blockerStatus",
    "closureCriteria",
    "remainsNonAuthorizedUntilClosure",
  ]);

const RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_MATERIAL_CLASSES =
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

const BASE_LINEAGE = deepFreeze(
  Array.from({ length: 20 }, (_, index) => `PR_${index + 29}`),
);

const BASE_EVIDENCE = deepFreeze({
  pr43: "DOCS_ONLY_PROVE_ONLY_RAW_MATERIAL_ROUTING_IMPLEMENTATION_READINESS_SCOPE_REVIEW",
  pr44: "TEST_ONLY_PROVE_ONLY_ALIGNMENT_PROOF",
  pr45: "PROVE_ONLY_STATIC_GOVERNANCE_REGISTRY_SCAFFOLD",
  pr46: "TEST_ONLY_PROVE_ONLY_REGISTRY_ALIGNMENT_PROOF",
  pr47: "DOCS_ONLY_PROVE_ONLY_CONTROL_SPECIFICATION_ONLY",
  pr48: "TEST_ONLY_PROVE_ONLY_ALIGNMENT_PROOF_ONLY",
});

const BASE_STATUS_LABELS = deepFreeze([
  RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_STATUS
    .GOVERNANCE_REGISTRY_SCAFFOLD_ONLY,
  RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_STATUS.PROVE_ONLY,
  RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_STATUS
    .DOCS_ONLY_CONTROL_SPECIFICATION_ONLY,
  RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_STATUS
    .TEST_ONLY_ALIGNMENT_PROOF_ONLY,
  RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_STATUS
    .CONTROL_SPECIFICATION_ONLY,
  RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_STATUS
    .ALIGNMENT_PROOF_ONLY,
  RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_STATUS
    .REVIEW_SUPPORT_ONLY,
  RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_STATUS
    .DEPENDENCY_ONLY,
  RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_STATUS
    .FUTURE_ONLY_CLOSURE_CRITERIA,
  RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_STATUS
    .RAW_MATERIAL_ROUTING_IMPLEMENTATION_NOT_CREATED,
  RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_STATUS
    .RAW_MATERIAL_ROUTING_NOT_IMPLEMENTED,
  RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_STATUS
    .ROUTE_POLICY_NOT_IMPLEMENTED,
  RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_STATUS
    .ROUTE_DECISION_ENGINE_NOT_CREATED,
  RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_STATUS
    .QUARANTINE_OR_BLOCK_PATH_REQUIRED,
  RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_STATUS
    .RUNTIME_GATES_NOT_CREATED,
  RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_STATUS
    .VALIDATOR_DISPATCH_NOT_CREATED,
  RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_STATUS
    .EXECUTABLE_REGISTRY_LOOKUP_NOT_CREATED,
  RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_STATUS
    .RUNTIME_REGISTRY_LOOKUP_NOT_CREATED,
  RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_STATUS
    .MATERIAL_CLASS_REGISTRY_NOT_IMPLEMENTED,
  RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_STATUS
    .SCOPE_MODEL_NOT_IMPLEMENTED,
  RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_STATUS
    .RBAC_ACCESS_CONTROL_ENFORCEMENT_NOT_CREATED,
  RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_STATUS
    .ADMIN_SUPPORT_ACCESS_AUTHORIZATION_NOT_CREATED,
  RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_STATUS
    .AUDIT_ACCESS_LOG_IMPLEMENTATION_NOT_CREATED,
  RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_STATUS
    .THIRD_PARTY_ROUTING_NOT_AUTHORIZED,
  RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_STATUS
    .THIRD_PARTY_MODEL_API_ROUTING_NOT_AUTHORIZED,
  RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_STATUS
    .RETENTION_DELETION_ENCRYPTION_IMPLEMENTATION_NOT_CREATED,
  RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_STATUS
    .CHAIN_OF_CUSTODY_NOT_CREATED,
  RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_STATUS
    .SECURITY_FINDING_NOT_CREATED,
  RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_STATUS
    .SEVERITY_NOT_ASSIGNED,
  RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_STATUS
    .REMEDIATION_NOT_RECOMMENDED,
  RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_STATUS
    .EXTERNAL_USE_NOT_AUTHORIZED,
  RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_STATUS
    .PRODUCT_CANDIDATE_NONE,
  RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_STATUS
    .RUNTIME_CERTIFICATION_NOT_CREATED,
  RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_STATUS
    .TECHNICAL_SIGN_OFF_NOT_CREATED,
  RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_STATUS
    .HUMAN_PROFESSIONAL_REVIEW_REQUIRED,
]);

const RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_NON_AUTHORIZATIONS =
  deepFreeze({
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
    executable_registry_lookup_created: false,
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

const makeRow = (row) =>
  deepFreeze({
    ...row,
    lineage: BASE_LINEAGE,
    baseEvidence: BASE_EVIDENCE,
    statusLabels: BASE_STATUS_LABELS,
    nonAuthorization:
      RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_NON_AUTHORIZATIONS,
    registryScaffoldOnly: true,
    staticRegistryHelperOnly: true,
  });

const ROW_DEFINITIONS = deepFreeze([
  {
    controlId: "RMR-CS-001",
    materialClass:
      RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_MATERIAL_CLASSES
        .SANITIZED_NO_RAW_REVIEW_MATERIAL,
    allowedIngress:
      "Potential review-support ingress only after documented redaction and sanitization; tracked governance material only.",
    prohibitedIngress:
      "Raw/private/source content, source locators, source packages, PDF/image/screenshot/metadata material, provider payloads, URLs, tokens, secrets.",
    allowedProcessingLayer: "Docs-only review-support control specification.",
    prohibitedProcessingLayer:
      "Runtime route processing, provider processing, source inspection, metadata acquisition, route decisioning.",
    allowedEgress: "Governance status and review-support pointers.",
    prohibitedEgress:
      "No external-use, no product use, no delivery approval, no court-readiness, no legal/clinical/evidentiary/case-truth conclusion.",
    requiredRedactionSanitizationPoint:
      "Redaction and sanitization before any future route candidate.",
    requiredAuditAccessLogEvent:
      "Future category-only sanitized route decision event; no payload.",
    retentionDeletionDependency:
      "Lifecycle policy required before persistence or delivery.",
    rbacAccessControlDependency:
      "Role/permission policy required before route use.",
    thirdPartyModelApiConstraint:
      "Third-party/API route remains not authorized.",
    currentEvidenceLevel: "DOCS_ONLY_PROVE_ONLY_PARTIAL_SCOPE_CONTEXT",
    intendedEnforcementLayer: "FUTURE_WORKFLOW_GATE_CANDIDATE_ONLY",
    implementationGap:
      "No route policy runtime, no route decision engine, no audit/access-log path.",
    requiredImplementationEvidence:
      "Future sanitized-only route control evidence if separately authorized.",
    requiredTestEvidence:
      "Future no-raw, no-private, no-source-locator allow/deny tests.",
    blockerStatus: "OPEN_DEPENDENCY_NOT_CLOSED",
    closureCriteria:
      "Separate tracked implementation evidence plus focused tests plus human/professional review.",
    remainsNonAuthorizedUntilClosure:
      "YES_REMAINS_NON_AUTHORIZED_UNTIL_CLOSURE",
  },
  {
    controlId: "RMR-CS-002",
    materialClass:
      RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_MATERIAL_CLASSES
        .REDACTED_REVIEW_SIGNALS,
    allowedIngress: "Tracked redacted review signal summaries only.",
    prohibitedIngress:
      "Raw facts, private facts, unredacted snippets, source locators, URLs, tokens, secrets.",
    allowedProcessingLayer: "Review-support signal context only.",
    prohibitedProcessingLayer:
      "Automated conclusion generation, risk scoring, proof creation, provider route, runtime decisioning.",
    allowedEgress: "Review-only signal references.",
    prohibitedEgress:
      "No approval, no sign-off, no legal conclusion, no clinical conclusion, no evidentiary conclusion, no case-truth conclusion.",
    requiredRedactionSanitizationPoint:
      "Redaction before any review-support route.",
    requiredAuditAccessLogEvent:
      "Future category-only redacted signal access event; no private content.",
    retentionDeletionDependency: "Review-signal lifecycle policy required.",
    rbacAccessControlDependency: "Review-role policy required.",
    thirdPartyModelApiConstraint:
      "Third-party/API route remains not authorized.",
    currentEvidenceLevel: "DOCS_ONLY_PROVE_ONLY_REVIEW_SUPPORT_ONLY",
    intendedEnforcementLayer: "FUTURE_REVIEW_WORKFLOW_GATE_CANDIDATE_ONLY",
    implementationGap: "No redaction workflow runtime, no review route gate.",
    requiredImplementationEvidence:
      "Future bounded redacted-review workflow evidence.",
    requiredTestEvidence: "Future redaction, no-conclusion, no-approval tests.",
    blockerStatus: "OPEN_DEPENDENCY_NOT_CLOSED",
    closureCriteria:
      "Separate workflow evidence and tests; closure criteria are future-only.",
    remainsNonAuthorizedUntilClosure:
      "YES_REMAINS_NON_AUTHORIZED_UNTIL_CLOSURE",
  },
  {
    controlId: "RMR-CS-003",
    materialClass:
      RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_MATERIAL_CLASSES
        .NO_RAW_METADATA_MANIFEST_MATERIAL,
    allowedIngress: "Tracked no-raw manifest contract/status context only.",
    prohibitedIngress:
      "Active metadata acquisition, source metadata, exact paths, PDF/image/screenshot metadata, URLs, tokens, secrets.",
    allowedProcessingLayer: "Package, inventory, and integrity context only.",
    prohibitedProcessingLayer:
      "Metadata acquisition, manifest population from source, runtime registry lookup, truth proof, chain-of-custody creation.",
    allowedEgress: "Manifest status labels and contract pointers.",
    prohibitedEgress:
      "Evidence packet promotion, product use, external-use, truth proof, chain-of-custody claim.",
    requiredRedactionSanitizationPoint:
      "No-raw contract boundary before any future manifest use.",
    requiredAuditAccessLogEvent: "Future category-only manifest validation event.",
    retentionDeletionDependency: "Manifest lifecycle policy required if persisted.",
    rbacAccessControlDependency: "Manifest access policy required.",
    thirdPartyModelApiConstraint:
      "Third-party/API route remains not authorized.",
    currentEvidenceLevel: "DOCS_ONLY_PROVE_ONLY_CONTRACT_CONTEXT_ONLY",
    intendedEnforcementLayer: "FUTURE_SCHEMA_VALIDATOR_GATE_CANDIDATE_ONLY",
    implementationGap:
      "No metadata acquisition path, no manifest runtime consumer, no executable registry lookup.",
    requiredImplementationEvidence:
      "Future metadata acquisition denial or explicit acquisition contract evidence.",
    requiredTestEvidence:
      "Future no-acquisition, no-source-metadata, no-truth-proof tests.",
    blockerStatus: "OPEN_DEPENDENCY_NOT_CLOSED",
    closureCriteria:
      "Separate contract evidence, implementation evidence, tests, and review.",
    remainsNonAuthorizedUntilClosure:
      "YES_REMAINS_NON_AUTHORIZED_UNTIL_CLOSURE",
  },
  {
    controlId: "RMR-CS-004",
    materialClass:
      RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_MATERIAL_CLASSES
        .GENERATED_EXPORT_ARTIFACTS,
    allowedIngress:
      "Tracked generated/export artifact governance references only.",
    prohibitedIngress:
      "Raw/private/source material, packet/delivery approval, court/external-use claims.",
    allowedProcessingLayer: "Docs-only export-readiness control specification.",
    prohibitedProcessingLayer:
      "Runtime export/download gate, delivery gate, product packaging.",
    allowedEgress: "Scoped governance artifact references.",
    prohibitedEgress:
      "No External Reviewer delivery, no external-use, no release approval, no product candidate, no court-adjacent use.",
    requiredRedactionSanitizationPoint:
      "Sanitize and redact before any future export candidate.",
    requiredAuditAccessLogEvent:
      "Future category-only export/download decision event.",
    retentionDeletionDependency: "Artifact lifecycle policy required.",
    rbacAccessControlDependency: "Export/download role policy required.",
    thirdPartyModelApiConstraint: "Provider delivery remains not authorized.",
    currentEvidenceLevel: "DOCS_ONLY_PROVE_ONLY_PARTIAL_CONTEXT_ONLY",
    intendedEnforcementLayer: "FUTURE_DELIVERY_GATE_CANDIDATE_ONLY",
    implementationGap:
      "No packet/delivery gate, no role-aware export/download policy.",
    requiredImplementationEvidence: "Future export/download control evidence.",
    requiredTestEvidence:
      "Future allow/deny, wrong-case, overexposure, no-delivery tests.",
    blockerStatus: "OPEN_DEPENDENCY_NOT_CLOSED",
    closureCriteria: "Separate release/external-use boundary if ever claimed.",
    remainsNonAuthorizedUntilClosure:
      "YES_REMAINS_NON_AUTHORIZED_UNTIL_CLOSURE",
  },
  {
    controlId: "RMR-CS-005",
    materialClass:
      RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_MATERIAL_CLASSES
        .LOCAL_LOGS_TEST_TRANSCRIPTS,
    allowedIngress:
      "None by default; only summarized tracked validation status if later explicitly written.",
    prohibitedIngress:
      "Local log bodies, CI logs, terminal transcripts, raw output, private facts, source locators.",
    allowedProcessingLayer: "Docs-only boundary statement.",
    prohibitedProcessingLayer:
      "Local log inspection, CI log inspection, packet component treatment, chain-of-custody creation.",
    allowedEgress: "Non-evidence boundary note.",
    prohibitedEgress:
      "CI evidence claim, release evidence claim, packet component claim, chain-of-custody claim.",
    requiredRedactionSanitizationPoint:
      "Summarize without log body if separately authorized.",
    requiredAuditAccessLogEvent: "Future category-only local-log treatment event.",
    retentionDeletionDependency: "Log lifecycle policy required.",
    rbacAccessControlDependency: "Log access policy required.",
    thirdPartyModelApiConstraint: "Provider payloads in logs remain prohibited.",
    currentEvidenceLevel: "DOCS_ONLY_PROVE_ONLY_NOT_CI_EVIDENCE",
    intendedEnforcementLayer: "DOCS_ONLY_UNTIL_SEPARATE_AUTHORIZATION",
    implementationGap: "No log classification path, no audit/access-log implementation.",
    requiredImplementationEvidence: "Future local-log policy evidence.",
    requiredTestEvidence:
      "Future local-log non-CI, non-packet, no-chain-of-custody tests.",
    blockerStatus: "OPEN_DEPENDENCY_NOT_CLOSED",
    closureCriteria: "Separate log policy and proof; closure criteria are future-only.",
    remainsNonAuthorizedUntilClosure:
      "YES_REMAINS_NON_AUTHORIZED_UNTIL_CLOSURE",
  },
  {
    controlId: "RMR-CS-006",
    materialClass:
      RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_MATERIAL_CLASSES
        .RAW_PRIVATE_SOURCE_MATERIAL,
    allowedIngress: "None.",
    prohibitedIngress:
      "All raw/private/source ingress, source locators, private facts, real private case material.",
    allowedProcessingLayer: "None.",
    prohibitedProcessingLayer:
      "Automated processing, third-party routing, export, logs, generated reports, non-professional review.",
    allowedEgress: "None.",
    prohibitedEgress: "All egress, provider routing, external-use, product use.",
    requiredRedactionSanitizationPoint:
      "None until separate explicit future authorization.",
    requiredAuditAccessLogEvent:
      "Future category-only attempted-ingress denial event; no content.",
    retentionDeletionDependency:
      "Retention, deletion, encryption, and key-management policy required before any authorized handling.",
    rbacAccessControlDependency:
      "RBAC/access-control required before any authorized handling.",
    thirdPartyModelApiConstraint: "Third-party/API routing blocked.",
    currentEvidenceLevel: "NOT_AUTHORIZED_EXPLICITLY_UNRESOLVED",
    intendedEnforcementLayer: "NOT_AUTHORIZED_UNTIL_SEPARATE_APPROVAL",
    implementationGap: "No deny/quarantine runtime path, no raw-route policy.",
    requiredImplementationEvidence:
      "Future deny/quarantine, redaction, minimization, access-control, audit/access-log, retention/deletion/encryption, and professional review gate evidence if separately authorized.",
    requiredTestEvidence: "Future raw/private denial, quarantine, no-leakage tests.",
    blockerStatus: "BLOCKED_NOT_CLOSED",
    closureCriteria:
      "Separate explicit authorization plus tracked denial/control evidence and tests.",
    remainsNonAuthorizedUntilClosure:
      "YES_REMAINS_NON_AUTHORIZED_UNTIL_CLOSURE",
  },
  {
    controlId: "RMR-CS-007",
    materialClass:
      RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_MATERIAL_CLASSES
        .SOURCE_PACKAGES,
    allowedIngress: "None unless explicit tracked governance authorization exists.",
    prohibitedIngress:
      "Source package inspection, archive/ZIP opening, source package routing.",
    allowedProcessingLayer: "None.",
    prohibitedProcessingLayer:
      "Package/source inspection, model/API processing, metadata extraction.",
    allowedEgress: "None.",
    prohibitedEgress: "Archive delivery, model/API egress, external-use.",
    requiredRedactionSanitizationPoint:
      "None until separate explicit future authorization.",
    requiredAuditAccessLogEvent:
      "Future category-only attempted-package denial event; no content.",
    retentionDeletionDependency:
      "Package lifecycle policy required before any authorized handling.",
    rbacAccessControlDependency: "Package access policy required.",
    thirdPartyModelApiConstraint: "Third-party/API routing blocked.",
    currentEvidenceLevel: "NOT_AUTHORIZED_FUTURE_ONLY",
    intendedEnforcementLayer: "NOT_AUTHORIZED_UNTIL_SEPARATE_APPROVAL",
    implementationGap: "No source package handling policy, no quarantine/block path.",
    requiredImplementationEvidence: "Future source-package deny/quarantine evidence.",
    requiredTestEvidence: "Future source-package denial and no-archive-route tests.",
    blockerStatus: "BLOCKED_NOT_CLOSED",
    closureCriteria:
      "Separate explicit authorization and tests prove blocking or bounded handling.",
    remainsNonAuthorizedUntilClosure:
      "YES_REMAINS_NON_AUTHORIZED_UNTIL_CLOSURE",
  },
  {
    controlId: "RMR-CS-008",
    materialClass:
      RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_MATERIAL_CLASSES
        .PDF_IMAGE_SCREENSHOT_METADATA_MATERIAL,
    allowedIngress: "None.",
    prohibitedIngress:
      "PDF/image/screenshot inspection, OCR, metadata extraction, page references, private file paths.",
    allowedProcessingLayer: "None.",
    prohibitedProcessingLayer:
      "OCR, metadata acquisition, model/API processing, packet promotion.",
    allowedEgress: "None.",
    prohibitedEgress: "Repo evidence claim, product use, external-use, provider route.",
    requiredRedactionSanitizationPoint:
      "None until separate explicit future authorization.",
    requiredAuditAccessLogEvent:
      "Future category-only attempted-inspection denial event; no content.",
    retentionDeletionDependency:
      "Metadata lifecycle policy required before any authorized handling.",
    rbacAccessControlDependency: "Metadata access policy required.",
    thirdPartyModelApiConstraint: "Third-party/API routing blocked.",
    currentEvidenceLevel: "NOT_AUTHORIZED_DOCS_ONLY",
    intendedEnforcementLayer: "NOT_AUTHORIZED_UNTIL_SEPARATE_APPROVAL",
    implementationGap: "No inspection/acquisition path, no metadata route.",
    requiredImplementationEvidence:
      "Future inspection-denial and acquisition-boundary evidence.",
    requiredTestEvidence: "Future no-inspection, no-acquisition, no-packet tests.",
    blockerStatus: "BLOCKED_NOT_CLOSED",
    closureCriteria: "Separate explicit authorization and no-leak tests.",
    remainsNonAuthorizedUntilClosure:
      "YES_REMAINS_NON_AUTHORIZED_UNTIL_CLOSURE",
  },
  {
    controlId: "RMR-CS-009",
    materialClass:
      RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_MATERIAL_CLASSES
        .THIRD_PARTY_MODEL_API_ROUTED_MATERIAL,
    allowedIngress:
      "None for raw/private/source; sanitized-only route remains unresolved.",
    prohibitedIngress:
      "Provider payloads, prompts, responses, raw/private/source material, URLs, tokens, secrets.",
    allowedProcessingLayer:
      "None until provider posture is separately authorized.",
    prohibitedProcessingLayer: "Third-party model/API processing.",
    allowedEgress: "None.",
    prohibitedEgress: "Provider egress, external-use, product use.",
    requiredRedactionSanitizationPoint:
      "Sanitize and redact before any separately authorized future provider route.",
    requiredAuditAccessLogEvent:
      "Future category-only provider route denial event; no payload.",
    retentionDeletionDependency: "Provider retention/deletion posture required.",
    rbacAccessControlDependency: "Route authorization policy required.",
    thirdPartyModelApiConstraint:
      "Provider registry/status, provider retention/deletion posture, provider auditability, token/URL/secret handling, data-routing map, and explicit approval required first.",
    currentEvidenceLevel: "EXPLICITLY_UNRESOLVED_ARCHITECTURE_REQUIRED_FIRST",
    intendedEnforcementLayer: "FUTURE_PROVIDER_ROUTE_GATE_CANDIDATE_ONLY",
    implementationGap:
      "No provider registry/status, no data-routing map, no provider auditability.",
    requiredImplementationEvidence:
      "Future provider posture and no-route control evidence.",
    requiredTestEvidence: "Future no-route, no-token, no-URL, no-payload tests.",
    blockerStatus: "BLOCKED_NOT_CLOSED",
    closureCriteria:
      "Separate provider-routing authorization plus implementation and tests.",
    remainsNonAuthorizedUntilClosure:
      "YES_REMAINS_NON_AUTHORIZED_UNTIL_CLOSURE",
  },
  {
    controlId: "RMR-CS-010",
    materialClass:
      RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_MATERIAL_CLASSES
        .HUMAN_PROFESSIONAL_REVIEW_ONLY_MATERIAL,
    allowedIngress: "Review-gate context only.",
    prohibitedIngress:
      "Raw/private/source unless separately authorized, automated conclusions, release claims.",
    allowedProcessingLayer: "Human/professional review support.",
    prohibitedProcessingLayer:
      "Automated approval, product selection, court/AI Act readiness declaration.",
    allowedEgress: "Review-only handoff.",
    prohibitedEgress:
      "No approval, no technical sign-off, no external-use, no court-readiness.",
    requiredRedactionSanitizationPoint:
      "Redaction before review handoff if material is sensitive.",
    requiredAuditAccessLogEvent:
      "Future category-only review access event; no conclusion.",
    retentionDeletionDependency: "Review-material lifecycle policy required.",
    rbacAccessControlDependency: "Review-role policy required.",
    thirdPartyModelApiConstraint:
      "Third-party/API routing remains not authorized.",
    currentEvidenceLevel: "HUMAN_PROFESSIONAL_REVIEW_REQUIRED_DOCS_ONLY",
    intendedEnforcementLayer: "HUMAN_PROFESSIONAL_REVIEW_GATE_REQUIRED",
    implementationGap:
      "No review workflow gate evidence, no approval/sign-off gate.",
    requiredImplementationEvidence: "Future review workflow evidence.",
    requiredTestEvidence: "Future no-approval, no-signoff, no-conclusion tests.",
    blockerStatus: "OPEN_DEPENDENCY_NOT_CLOSED",
    closureCriteria:
      "Separate human/professional review evidence and explicit release boundary.",
    remainsNonAuthorizedUntilClosure:
      "YES_REMAINS_NON_AUTHORIZED_UNTIL_CLOSURE",
  },
  {
    controlId: "RMR-CS-011",
    materialClass:
      RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_MATERIAL_CLASSES
        .UNKNOWN_UNCLASSIFIED_MATERIAL,
    allowedIngress: "None.",
    prohibitedIngress: "All material ingress until classified.",
    allowedProcessingLayer: "None.",
    prohibitedProcessingLayer: "All runtime/workflow/model/API processing.",
    allowedEgress: "None.",
    prohibitedEgress: "All egress.",
    requiredRedactionSanitizationPoint:
      "Classify before any future route candidate.",
    requiredAuditAccessLogEvent:
      "Future category-only unknown denial event; no content.",
    retentionDeletionDependency:
      "Lifecycle policy required before any authorized handling.",
    rbacAccessControlDependency: "Fail-closed access policy required.",
    thirdPartyModelApiConstraint: "Third-party/API routing blocked.",
    currentEvidenceLevel: "UNKNOWN_NOT_EVIDENCED_FAIL_CLOSED",
    intendedEnforcementLayer: "DENY_BY_DEFAULT_UNTIL_CLASSIFIED",
    implementationGap: "No classification/runtime route path.",
    requiredImplementationEvidence: "Future classification and denial evidence.",
    requiredTestEvidence: "Future unknown-denial tests.",
    blockerStatus: "BLOCKED_NOT_CLOSED",
    closureCriteria:
      "Explicit classification, implementation evidence, tests, and review.",
    remainsNonAuthorizedUntilClosure:
      "YES_REMAINS_NON_AUTHORIZED_UNTIL_CLOSURE",
  },
  {
    controlId: "RMR-CS-012",
    materialClass:
      RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_MATERIAL_CLASSES
        .MIXED_OR_AMBIGUOUS_MATERIAL_BUNDLES,
    allowedIngress: "None.",
    prohibitedIngress:
      "Mixed bundles containing any raw/private/source, source package, PDF/image/screenshot/metadata, URL, token, secret, provider payload, or unclear class.",
    allowedProcessingLayer: "None.",
    prohibitedProcessingLayer:
      "Bundle splitting, runtime routing, provider routing, packet promotion.",
    allowedEgress: "None.",
    prohibitedEgress: "All egress until split and classified.",
    requiredRedactionSanitizationPoint:
      "Split and classify before any future route candidate.",
    requiredAuditAccessLogEvent:
      "Future category-only ambiguous-bundle denial event; no content.",
    retentionDeletionDependency: "Lifecycle policy required for each separated class.",
    rbacAccessControlDependency: "Class-aware access policy required.",
    thirdPartyModelApiConstraint: "Third-party/API routing blocked.",
    currentEvidenceLevel: "AMBIGUOUS_NOT_EVIDENCED_FAIL_CLOSED",
    intendedEnforcementLayer: "DENY_BY_DEFAULT_UNTIL_SEPARATED_AND_CLASSIFIED",
    implementationGap: "No mixed-bundle route path, no quarantine/block path.",
    requiredImplementationEvidence:
      "Future split/classify/quarantine evidence if separately authorized.",
    requiredTestEvidence:
      "Future mixed-bundle denial, no-leakage, no-provider-route tests.",
    blockerStatus: "BLOCKED_NOT_CLOSED",
    closureCriteria:
      "Separate classification and implementation evidence plus tests and review.",
    remainsNonAuthorizedUntilClosure:
      "YES_REMAINS_NON_AUTHORIZED_UNTIL_CLOSURE",
  },
].map(makeRow));

const RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_ROWS = deepFreeze(
  Object.fromEntries(ROW_DEFINITIONS.map((row) => [row.controlId, row])),
);

const RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_ROW_IDS =
  deepFreeze(Object.keys(RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_ROWS));

const UNKNOWN_ROW = deepFreeze({
  controlId: "UNKNOWN_NOT_EVIDENCED",
  materialClass: "UNKNOWN_NOT_EVIDENCED",
  allowedIngress: "None.",
  prohibitedIngress: "ALL_RUNTIME_ACTIONS_BLOCKED",
  allowedProcessingLayer: "None.",
  prohibitedProcessingLayer: "ALL_RUNTIME_PROCESSING_BLOCKED",
  allowedEgress: "None.",
  prohibitedEgress: "ALL_EGRESS_BLOCKED",
  requiredRedactionSanitizationPoint: "UNKNOWN_NOT_EVIDENCED",
  requiredAuditAccessLogEvent: "UNKNOWN_NOT_EVIDENCED",
  retentionDeletionDependency: "UNKNOWN_NOT_EVIDENCED",
  rbacAccessControlDependency: "UNKNOWN_NOT_EVIDENCED",
  thirdPartyModelApiConstraint: "UNKNOWN_NOT_EVIDENCED",
  currentEvidenceLevel: "UNKNOWN_NOT_EVIDENCED",
  intendedEnforcementLayer: "UNKNOWN_NOT_EVIDENCED",
  implementationGap: "UNKNOWN_NOT_EVIDENCED",
  requiredImplementationEvidence: "UNKNOWN_NOT_EVIDENCED",
  requiredTestEvidence: "UNKNOWN_NOT_EVIDENCED",
  blockerStatus: "UNKNOWN_NOT_EVIDENCED",
  closureCriteria: "UNKNOWN_NOT_EVIDENCED",
  remainsNonAuthorizedUntilClosure: "YES_REMAINS_NON_AUTHORIZED_UNTIL_CLOSURE",
  lineage: BASE_LINEAGE,
  baseEvidence: BASE_EVIDENCE,
  statusLabels: [
    RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_STATUS
      .UNKNOWN_NOT_EVIDENCED,
  ],
  nonAuthorization:
    RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_NON_AUTHORIZATIONS,
  registryScaffoldOnly: true,
  staticRegistryHelperOnly: true,
});

const listRawMaterialRoutingControlSpecificationRows = () =>
  cloneAndFreeze(
    Object.values(RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_ROWS),
  );

const getRawMaterialRoutingControlSpecificationRow = (controlId) =>
  cloneAndFreeze(
    RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_ROWS[controlId] ||
      UNKNOWN_ROW,
  );

const summarizeRawMaterialRoutingControlSpecificationRegistry = () =>
  cloneAndFreeze({
    statusLabels: BASE_STATUS_LABELS,
    requiredFields:
      RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_REQUIRED_FIELDS,
    materialClasses: Object.values(
      RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_MATERIAL_CLASSES,
    ),
    lineage: BASE_LINEAGE,
    baseEvidence: BASE_EVIDENCE,
    rowIds: RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_ROW_IDS,
    rowCount: RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_ROW_IDS.length,
    pr47ControlSpecificationPosture:
      "DOCS_ONLY_PROVE_ONLY_CONTROL_SPECIFICATION_ONLY",
    pr48AlignmentProofPosture: "TEST_ONLY_PROVE_ONLY_ALIGNMENT_PROOF_ONLY",
    dependencyOnly: true,
    futureOnlyClosureCriteria: true,
    localValidationIsCiEvidence: false,
    ciEvidenceIsReleaseApproval: false,
    ciEvidenceIsTechnicalSignoff: false,
    ciEvidenceIsRuntimeCertification: false,
    implementationCreated: false,
    runtimeApiSchemaPackageBehaviorChanged: false,
    registryScaffoldOnly: true,
    runtimeRegistryLookupCreated: false,
    executableRoutingCreated: false,
    humanProfessionalReviewRequired: true,
    nonAuthorization:
      RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_NON_AUTHORIZATIONS,
  });

const RAW_MATERIAL_ROUTING_CONTROL_FAMILIES = deepFreeze({
  SANITIZED_TEXT_PRIMARY: "SANITIZED_TEXT_PRIMARY",
  REDACTED_REVIEW_SIGNAL: "REDACTED_REVIEW_SIGNAL",
  NO_RAW_METADATA_MANIFEST: "NO_RAW_METADATA_MANIFEST",
  GENERATED_ARTIFACT_OR_EXPORT: "GENERATED_ARTIFACT_OR_EXPORT",
  LOCAL_LOG_OR_TEST_TRANSCRIPT: "LOCAL_LOG_OR_TEST_TRANSCRIPT",
  RAW_PRIVATE_SOURCE: "RAW_PRIVATE_SOURCE",
  SOURCE_PACKAGE: "SOURCE_PACKAGE",
  PDF_IMAGE_SCREENSHOT_METADATA: "PDF_IMAGE_SCREENSHOT_METADATA",
  THIRD_PARTY_MODEL_API: "THIRD_PARTY_MODEL_API",
  HUMAN_PROFESSIONAL_REVIEW_ONLY: "HUMAN_PROFESSIONAL_REVIEW_ONLY",
});

const RAW_MATERIAL_ROUTING_IMPLEMENTATION_STATUS = deepFreeze({
  CONTROL_SPECIFICATION_ONLY: "CONTROL_SPECIFICATION_ONLY",
  NOT_RUNTIME_ROUTING_IMPLEMENTATION: "NOT_RUNTIME_ROUTING_IMPLEMENTATION",
  NOT_RAW_MATERIAL_PROCESSING: "NOT_RAW_MATERIAL_PROCESSING",
  NOT_SOURCE_PACKAGE_INSPECTION: "NOT_SOURCE_PACKAGE_INSPECTION",
  NOT_METADATA_ACQUISITION: "NOT_METADATA_ACQUISITION",
  NOT_THIRD_PARTY_PROVIDER_INTEGRATION:
    "NOT_THIRD_PARTY_PROVIDER_INTEGRATION",
  NOT_AUDIT_ACCESS_LOG_IMPLEMENTATION:
    "NOT_AUDIT_ACCESS_LOG_IMPLEMENTATION",
  NOT_RBAC_ACCESS_CONTROL_IMPLEMENTATION:
    "NOT_RBAC_ACCESS_CONTROL_IMPLEMENTATION",
  NOT_RETENTION_DELETION_IMPLEMENTATION:
    "NOT_RETENTION_DELETION_IMPLEMENTATION",
  UNKNOWN_NOT_EVIDENCED: "UNKNOWN_NOT_EVIDENCED",
});

const RAW_MATERIAL_ROUTING_DECISION_STATUS = deepFreeze({
  CATEGORY_DESCRIPTOR_ALLOWED_ONLY: "CATEGORY_DESCRIPTOR_ALLOWED_ONLY",
  DENIED_BY_DEFAULT: "DENIED_BY_DEFAULT",
  BLOCKED_BY_NO_RAW_POLICY: "BLOCKED_BY_NO_RAW_POLICY",
  BLOCKED_BY_NO_SOURCE_PACKAGE_POLICY: "BLOCKED_BY_NO_SOURCE_PACKAGE_POLICY",
  BLOCKED_BY_NO_METADATA_ACQUISITION_POLICY:
    "BLOCKED_BY_NO_METADATA_ACQUISITION_POLICY",
  BLOCKED_BY_THIRD_PARTY_ROUTE_POLICY:
    "BLOCKED_BY_THIRD_PARTY_ROUTE_POLICY",
  HUMAN_REVIEW_REQUIRED_NOT_SYSTEM_APPROVAL:
    "HUMAN_REVIEW_REQUIRED_NOT_SYSTEM_APPROVAL",
  UNKNOWN_NOT_EVIDENCED: "UNKNOWN_NOT_EVIDENCED",
});

const RAW_MATERIAL_ROUTING_EVIDENCE_POSTURE = deepFreeze({
  DOCS_ONLY_CONTROL_SPECIFICATION: "DOCS_ONLY_CONTROL_SPECIFICATION",
  REGISTRY_SCAFFOLD_EVIDENCE: "REGISTRY_SCAFFOLD_EVIDENCE",
  TESTED_ALIGNMENT_EVIDENCE: "TESTED_ALIGNMENT_EVIDENCE",
  CI_TESTED_SCENARIO_EVIDENCE: "CI_TESTED_SCENARIO_EVIDENCE",
  FUTURE_RUNTIME_CANDIDATE_ONLY: "FUTURE_RUNTIME_CANDIDATE_ONLY",
  UNKNOWN_NOT_EVIDENCED: "UNKNOWN_NOT_EVIDENCED",
});

const BASE_IMPLEMENTATION_STATUSES = deepFreeze([
  RAW_MATERIAL_ROUTING_IMPLEMENTATION_STATUS.CONTROL_SPECIFICATION_ONLY,
  RAW_MATERIAL_ROUTING_IMPLEMENTATION_STATUS
    .NOT_RUNTIME_ROUTING_IMPLEMENTATION,
  RAW_MATERIAL_ROUTING_IMPLEMENTATION_STATUS.NOT_RAW_MATERIAL_PROCESSING,
  RAW_MATERIAL_ROUTING_IMPLEMENTATION_STATUS.NOT_SOURCE_PACKAGE_INSPECTION,
  RAW_MATERIAL_ROUTING_IMPLEMENTATION_STATUS.NOT_METADATA_ACQUISITION,
  RAW_MATERIAL_ROUTING_IMPLEMENTATION_STATUS
    .NOT_THIRD_PARTY_PROVIDER_INTEGRATION,
  RAW_MATERIAL_ROUTING_IMPLEMENTATION_STATUS
    .NOT_AUDIT_ACCESS_LOG_IMPLEMENTATION,
  RAW_MATERIAL_ROUTING_IMPLEMENTATION_STATUS
    .NOT_RBAC_ACCESS_CONTROL_IMPLEMENTATION,
  RAW_MATERIAL_ROUTING_IMPLEMENTATION_STATUS
    .NOT_RETENTION_DELETION_IMPLEMENTATION,
]);

const BASE_NON_AUTHORIZATIONS = deepFreeze({
  authorized: false,
  route_authorized: false,
  raw_material_routing_implemented: false,
  raw_material_processing_authorized: false,
  source_package_inspection_authorized: false,
  metadata_acquisition_authorized: false,
  third_party_model_api_authorized: false,
  provider_routing_authorized: false,
  audit_access_log_implemented: false,
  rbac_access_control_implemented: false,
  retention_deletion_implemented: false,
  release_approved: false,
  external_use_authorized: false,
  product_candidate_authorized: false,
  runtime_certification_created: false,
  technical_signoff_created: false,
  legal_clinical_evidentiary_conclusion_created: false,
  security_finding_created: false,
});

const BASE_ROUTE_FLAGS = deepFreeze({
  routed: false,
  inspected: false,
  metadata_acquired: false,
  emitted: false,
  stored: false,
  runtime_gate_created: false,
  system_approval_created: false,
});

const RAW_MATERIAL_ROUTING_NON_OVERCLAIM_RULES = deepFreeze([
  "CATEGORY_DESCRIPTOR_ALLOWED_ONLY does not mean route authorization",
  "ALLOWED_INGRESS_CANDIDATE does not mean CURRENT_INGRESS_IMPLEMENTATION",
  "ALLOWED_PROCESSING_LAYER does not mean RUNTIME_PROCESSING_AUTHORIZATION",
  "ALLOWED_EGRESS_CANDIDATE does not mean EXTERNAL_USE_AUTHORIZATION",
  "REDACTION_POINT does not mean REDACTION_EXECUTED",
  "SANITIZED_TEXT_PRIMARY does not mean raw/private/source access",
  "REDACTED_REVIEW_SIGNAL does not mean source package access",
  "NO_RAW_METADATA_MANIFEST does not mean metadata acquisition",
  "HASH_OR_MANIFEST does not mean TRUTH_PROOF",
  "GENERATED_ARTIFACT_OR_EXPORT does not mean external-use authorization",
  "LOCAL_LOG does not mean CI_EVIDENCE",
  "CI_LOG does not mean RELEASE_EVIDENCE",
  "AUDIT_EVENT_CANDIDATE does not mean audit/access-log implementation",
  "RBAC_BOUNDARY_STATUS does not mean access-control enforcement",
  "RETENTION_DELETION_DEPENDENCY does not mean lifecycle execution",
  "THIRD_PARTY_ROUTE_CONSTRAINT does not mean provider routing authorization",
  "HUMAN_PROFESSIONAL_REVIEW_REQUIRED does not mean system approval",
]);

const RAW_MATERIAL_ROUTING_REQUIRED_PREREQUISITES = deepFreeze([
  "storage/data-location inventory registry alignment",
  "retention/deletion/encryption dependency registry alignment",
  "audit/access-log dependency registry alignment",
  "RBAC role-permission deny-by-default scaffold alignment",
  "admin/support no-bypass model",
  "third-party route denial hardening alignment",
  "third-party provider status registry",
  "data-routing map",
  "token/URL/secret handling policy",
  "provider retention/deletion posture",
  "provider auditability posture",
  "no-content audit/access event taxonomy alignment",
  "CI evidence hardening workflow",
  "CI test plan",
  "non-proof/non-external-use wording",
  "synthetic no-raw unit tests",
  "human/professional review gate",
]);

const rawMaterialRoutingRequiredFieldNames = deepFreeze([
  "control_id",
  "material_class",
  "allowed_ingress",
  "prohibited_ingress",
  "allowed_processing_layer",
  "prohibited_processing_layer",
  "allowed_egress",
  "prohibited_egress",
  "required_redaction_sanitization_point",
  "required_audit_access_log_event",
  "retention_deletion_dependency",
  "rbac_access_control_dependency",
  "third_party_model_api_constraint",
  "current_evidence_level",
  "intended_enforcement_layer",
  "implementation_gap",
  "required_implementation_evidence",
  "required_test_evidence",
  "blocker_status",
  "closure_criteria",
  "non_authorized_until_closure",
]);

const makeLegacyControl = ({
  key,
  controlId,
  family,
  decisionStatus,
  row,
  relatedStorageLocationIds,
  relatedAalEventCandidateIds,
  relatedLifecycleFamilies,
}) =>
  {
    const materialClass = controlId.replace(/^RMR-CS-\d+_/, "");
    const highRiskFamilies = new Set([
      RAW_MATERIAL_ROUTING_CONTROL_FAMILIES.RAW_PRIVATE_SOURCE,
      RAW_MATERIAL_ROUTING_CONTROL_FAMILIES.SOURCE_PACKAGE,
      RAW_MATERIAL_ROUTING_CONTROL_FAMILIES.PDF_IMAGE_SCREENSHOT_METADATA,
      RAW_MATERIAL_ROUTING_CONTROL_FAMILIES.THIRD_PARTY_MODEL_API,
    ]);
    const deniedByDefault = highRiskFamilies.has(family);

    return deepFreeze({
    control_id: controlId,
    family,
    material_class: materialClass,
    allowed_ingress: deniedByDefault ? "DENIED_BY_DEFAULT" : row.allowedIngress,
    prohibited_ingress: [row.prohibitedIngress],
    allowed_processing_layer: [row.allowedProcessingLayer],
    prohibited_processing_layer: [row.prohibitedProcessingLayer],
    allowed_egress:
      controlId === "RMR-CS-005_LOCAL_LOG_OR_TEST_TRANSCRIPT_MATERIAL"
        ? "LOCAL_EVIDENCE_ONLY_NOT_CI_OR_RELEASE_EVIDENCE"
        : controlId === "RMR-CS-004_GENERATED_ARTIFACT_OR_EXPORT_MATERIAL"
          ? "GENERATED_ARTIFACT_REFERENCE_ONLY_NOT_EXTERNAL_USE"
          : deniedByDefault
            ? "DENIED_BY_DEFAULT"
            : row.allowedEgress,
    prohibited_egress: [
      row.prohibitedEgress,
      "ANY_PROVIDER_ROUTE",
      "SOURCE_PACKAGE_INSPECTION",
    ],
    required_redaction_sanitization_point:
      controlId === "RMR-CS-008_PDF_IMAGE_SCREENSHOT_METADATA_MATERIAL"
        ? "PDF_IMAGE_SCREENSHOT_METADATA_NOT_ACQUIRED"
        : row.requiredRedactionSanitizationPoint,
    required_audit_access_log_event:
      relatedAalEventCandidateIds[0] || row.requiredAuditAccessLogEvent,
    retention_deletion_dependency: relatedLifecycleFamilies[0],
    rbac_access_control_dependency: row.rbacAccessControlDependency,
    third_party_model_api_constraint:
      controlId === "RMR-CS-009_THIRD_PARTY_MODEL_API_ROUTED_MATERIAL"
        ? "DENIED_BY_DEFAULT_NO_PROVIDER_INTEGRATION"
        : row.thirdPartyModelApiConstraint,
    current_evidence_level: row.currentEvidenceLevel,
    intended_enforcement_layer: row.intendedEnforcementLayer,
    implementation_gap: row.implementationGap,
    implementation_statuses: BASE_IMPLEMENTATION_STATUSES,
    required_implementation_evidence: [row.requiredImplementationEvidence],
    required_test_evidence: [row.requiredTestEvidence],
    blocker_status: row.blockerStatus,
    closure_criteria: row.closureCriteria,
    non_authorized_until_closure: true,
    decision_status: decisionStatus,
    evidence_posture:
      RAW_MATERIAL_ROUTING_EVIDENCE_POSTURE.REGISTRY_SCAFFOLD_EVIDENCE,
    non_authorizations: BASE_NON_AUTHORIZATIONS,
    route_flags: BASE_ROUTE_FLAGS,
    related_storage_location_ids: relatedStorageLocationIds,
    related_aal_event_candidate_ids: relatedAalEventCandidateIds,
    related_lifecycle_families: relatedLifecycleFamilies,
    related_rbac_boundary_status:
      controlId === "RMR-CS-010_HUMAN_PROFESSIONAL_REVIEW_ONLY_MATERIAL"
        ? "HUMAN_REVIEW_REQUIRED_NOT_SYSTEM_APPROVAL"
        : "RBAC_ACCESS_CONTROL_ENFORCEMENT_NOT_CREATED",
    required_field_names: rawMaterialRoutingRequiredFieldNames,
    notes: [
      `${key} is preserved as the pre-existing compatibility surface.`,
      "This compatibility entry remains control-specification evidence only.",
    ],
  });
  };

const rowById = RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_ROWS;

const RAW_MATERIAL_ROUTING_CONTROL_REGISTRY = deepFreeze({
  RMR_CS_001_SANITIZED_TEXT_PRIMARY_MATERIAL: makeLegacyControl({
    key: "RMR_CS_001_SANITIZED_TEXT_PRIMARY_MATERIAL",
    controlId: "RMR-CS-001_SANITIZED_TEXT_PRIMARY_MATERIAL",
    family: RAW_MATERIAL_ROUTING_CONTROL_FAMILIES.SANITIZED_TEXT_PRIMARY,
    decisionStatus:
      RAW_MATERIAL_ROUTING_DECISION_STATUS.CATEGORY_DESCRIPTOR_ALLOWED_ONLY,
    row: rowById["RMR-CS-001"],
    relatedStorageLocationIds: ["L03_REPO_TRACKED_DOCS"],
    relatedAalEventCandidateIds: ["AAL-EVENT-004_REDACTION_SANITIZATION"],
    relatedLifecycleFamilies: [LIFECYCLE_CONTROL_FAMILIES.RETENTION],
  }),
  RMR_CS_002_REDACTED_REVIEW_SIGNAL_MATERIAL: makeLegacyControl({
    key: "RMR_CS_002_REDACTED_REVIEW_SIGNAL_MATERIAL",
    controlId: "RMR-CS-002_REDACTED_REVIEW_SIGNAL_MATERIAL",
    family: RAW_MATERIAL_ROUTING_CONTROL_FAMILIES.REDACTED_REVIEW_SIGNAL,
    decisionStatus:
      RAW_MATERIAL_ROUTING_DECISION_STATUS.CATEGORY_DESCRIPTOR_ALLOWED_ONLY,
    row: rowById["RMR-CS-002"],
    relatedStorageLocationIds: ["L24_PR_COMMENTS_ISSUES_REVIEW_METADATA"],
    relatedAalEventCandidateIds: [
      "AAL-EVENT-015_HUMAN_PROFESSIONAL_REVIEW_ACCESS",
    ],
    relatedLifecycleFamilies: [LIFECYCLE_CONTROL_FAMILIES.RETENTION],
  }),
  RMR_CS_003_NO_RAW_METADATA_MANIFEST_MATERIAL: makeLegacyControl({
    key: "RMR_CS_003_NO_RAW_METADATA_MANIFEST_MATERIAL",
    controlId: "RMR-CS-003_NO_RAW_METADATA_MANIFEST_MATERIAL",
    family: RAW_MATERIAL_ROUTING_CONTROL_FAMILIES.NO_RAW_METADATA_MANIFEST,
    decisionStatus:
      RAW_MATERIAL_ROUTING_DECISION_STATUS.CATEGORY_DESCRIPTOR_ALLOWED_ONLY,
    row: rowById["RMR-CS-003"],
    relatedStorageLocationIds: ["L04_REPO_TRACKED_SCHEMAS", "L06_REPO_LOCKFILE"],
    relatedAalEventCandidateIds: ["AAL-EVENT-007_MANIFEST_VALIDATION"],
    relatedLifecycleFamilies: [LIFECYCLE_CONTROL_FAMILIES.RETENTION],
  }),
  RMR_CS_004_GENERATED_ARTIFACT_OR_EXPORT_MATERIAL: makeLegacyControl({
    key: "RMR_CS_004_GENERATED_ARTIFACT_OR_EXPORT_MATERIAL",
    controlId: "RMR-CS-004_GENERATED_ARTIFACT_OR_EXPORT_MATERIAL",
    family:
      RAW_MATERIAL_ROUTING_CONTROL_FAMILIES.GENERATED_ARTIFACT_OR_EXPORT,
    decisionStatus:
      RAW_MATERIAL_ROUTING_DECISION_STATUS.CATEGORY_DESCRIPTOR_ALLOWED_ONLY,
    row: rowById["RMR-CS-004"],
    relatedStorageLocationIds: [
      "L12_LOCAL_GENERATED_ARTIFACTS",
      "L13_LOCAL_EXPORT_PACKAGES",
    ],
    relatedAalEventCandidateIds: ["AAL-EVENT-008_EXPORT_DOWNLOAD_ACCESS"],
    relatedLifecycleFamilies: [LIFECYCLE_CONTROL_FAMILIES.RETENTION],
  }),
  RMR_CS_005_LOCAL_LOG_OR_TEST_TRANSCRIPT_MATERIAL: makeLegacyControl({
    key: "RMR_CS_005_LOCAL_LOG_OR_TEST_TRANSCRIPT_MATERIAL",
    controlId: "RMR-CS-005_LOCAL_LOG_OR_TEST_TRANSCRIPT_MATERIAL",
    family: RAW_MATERIAL_ROUTING_CONTROL_FAMILIES.LOCAL_LOG_OR_TEST_TRANSCRIPT,
    decisionStatus: RAW_MATERIAL_ROUTING_DECISION_STATUS.DENIED_BY_DEFAULT,
    row: rowById["RMR-CS-005"],
    relatedStorageLocationIds: ["L10_LOCAL_TEST_LOGS"],
    relatedAalEventCandidateIds: [
      "AAL-EVENT-010_LOCAL_LOG_TEST_TRANSCRIPT_HANDLING",
    ],
    relatedLifecycleFamilies: [LIFECYCLE_CONTROL_FAMILIES.RETENTION],
  }),
  RMR_CS_006_RAW_PRIVATE_SOURCE_MATERIAL: makeLegacyControl({
    key: "RMR_CS_006_RAW_PRIVATE_SOURCE_MATERIAL",
    controlId: "RMR-CS-006_RAW_PRIVATE_SOURCE_MATERIAL",
    family: RAW_MATERIAL_ROUTING_CONTROL_FAMILIES.RAW_PRIVATE_SOURCE,
    decisionStatus: RAW_MATERIAL_ROUTING_DECISION_STATUS.BLOCKED_BY_NO_RAW_POLICY,
    row: rowById["RMR-CS-006"],
    relatedStorageLocationIds: ["L11_LOCAL_UNTRACKED_FILES"],
    relatedAalEventCandidateIds: ["AAL-EVENT-002_BLOCKED_PROHIBITED_INGRESS"],
    relatedLifecycleFamilies: [
      LIFECYCLE_CONTROL_FAMILIES.RETENTION,
      LIFECYCLE_CONTROL_FAMILIES.DELETION,
      LIFECYCLE_CONTROL_FAMILIES.ENCRYPTION,
    ],
  }),
  RMR_CS_007_SOURCE_PACKAGE_MATERIAL: makeLegacyControl({
    key: "RMR_CS_007_SOURCE_PACKAGE_MATERIAL",
    controlId: "RMR-CS-007_SOURCE_PACKAGE_MATERIAL",
    family: RAW_MATERIAL_ROUTING_CONTROL_FAMILIES.SOURCE_PACKAGE,
    decisionStatus:
      RAW_MATERIAL_ROUTING_DECISION_STATUS.BLOCKED_BY_NO_SOURCE_PACKAGE_POLICY,
    row: rowById["RMR-CS-007"],
    relatedStorageLocationIds: ["L11_LOCAL_UNTRACKED_FILES"],
    relatedAalEventCandidateIds: ["AAL-EVENT-002_BLOCKED_PROHIBITED_INGRESS"],
    relatedLifecycleFamilies: [
      LIFECYCLE_CONTROL_FAMILIES.RETENTION,
      LIFECYCLE_CONTROL_FAMILIES.DELETION,
      LIFECYCLE_CONTROL_FAMILIES.ENCRYPTION,
    ],
  }),
  RMR_CS_008_PDF_IMAGE_SCREENSHOT_METADATA_MATERIAL: makeLegacyControl({
    key: "RMR_CS_008_PDF_IMAGE_SCREENSHOT_METADATA_MATERIAL",
    controlId: "RMR-CS-008_PDF_IMAGE_SCREENSHOT_METADATA_MATERIAL",
    family:
      RAW_MATERIAL_ROUTING_CONTROL_FAMILIES.PDF_IMAGE_SCREENSHOT_METADATA,
    decisionStatus:
      RAW_MATERIAL_ROUTING_DECISION_STATUS
        .BLOCKED_BY_NO_METADATA_ACQUISITION_POLICY,
    row: rowById["RMR-CS-008"],
    relatedStorageLocationIds: ["L11_LOCAL_UNTRACKED_FILES"],
    relatedAalEventCandidateIds: ["AAL-EVENT-002_BLOCKED_PROHIBITED_INGRESS"],
    relatedLifecycleFamilies: [
      LIFECYCLE_CONTROL_FAMILIES.RETENTION,
      LIFECYCLE_CONTROL_FAMILIES.DELETION,
      LIFECYCLE_CONTROL_FAMILIES.ENCRYPTION,
    ],
  }),
  RMR_CS_009_THIRD_PARTY_MODEL_API_ROUTED_MATERIAL: makeLegacyControl({
    key: "RMR_CS_009_THIRD_PARTY_MODEL_API_ROUTED_MATERIAL",
    controlId: "RMR-CS-009_THIRD_PARTY_MODEL_API_ROUTED_MATERIAL",
    family: RAW_MATERIAL_ROUTING_CONTROL_FAMILIES.THIRD_PARTY_MODEL_API,
    decisionStatus:
      RAW_MATERIAL_ROUTING_DECISION_STATUS
        .BLOCKED_BY_THIRD_PARTY_ROUTE_POLICY,
    row: rowById["RMR-CS-009"],
    relatedStorageLocationIds: ["L22_THIRD_PARTY_PROVIDER_STORAGE_FUTURE"],
    relatedAalEventCandidateIds: [
      "AAL-EVENT-013_THIRD_PARTY_ROUTE_DENIAL_APPROVAL",
    ],
    relatedLifecycleFamilies: [LIFECYCLE_CONTROL_FAMILIES.PROVIDER_DELETION],
  }),
  RMR_CS_010_HUMAN_PROFESSIONAL_REVIEW_ONLY_MATERIAL: makeLegacyControl({
    key: "RMR_CS_010_HUMAN_PROFESSIONAL_REVIEW_ONLY_MATERIAL",
    controlId: "RMR-CS-010_HUMAN_PROFESSIONAL_REVIEW_ONLY_MATERIAL",
    family:
      RAW_MATERIAL_ROUTING_CONTROL_FAMILIES
        .HUMAN_PROFESSIONAL_REVIEW_ONLY,
    decisionStatus:
      RAW_MATERIAL_ROUTING_DECISION_STATUS
        .HUMAN_REVIEW_REQUIRED_NOT_SYSTEM_APPROVAL,
    row: rowById["RMR-CS-010"],
    relatedStorageLocationIds: ["L24_PR_COMMENTS_ISSUES_REVIEW_METADATA"],
    relatedAalEventCandidateIds: [
      "AAL-EVENT-015_HUMAN_PROFESSIONAL_REVIEW_ACCESS",
    ],
    relatedLifecycleFamilies: [LIFECYCLE_CONTROL_FAMILIES.RETENTION],
  }),
});

const UNKNOWN_RAW_MATERIAL_ROUTING_CONTROL = deepFreeze({
  control_id: "UNKNOWN_NOT_EVIDENCED",
  material_class: "UNKNOWN_NOT_EVIDENCED",
  decision_status: RAW_MATERIAL_ROUTING_DECISION_STATUS.UNKNOWN_NOT_EVIDENCED,
  evidence_posture: RAW_MATERIAL_ROUTING_EVIDENCE_POSTURE.UNKNOWN_NOT_EVIDENCED,
  implementation_statuses: [
    RAW_MATERIAL_ROUTING_IMPLEMENTATION_STATUS.UNKNOWN_NOT_EVIDENCED,
  ],
  non_authorized_until_closure: true,
  required_field_names: rawMaterialRoutingRequiredFieldNames,
  non_authorizations: BASE_NON_AUTHORIZATIONS,
  route_flags: BASE_ROUTE_FLAGS,
});

const listRawMaterialRoutingControlFamilies = () =>
  cloneAndFreeze(Object.values(RAW_MATERIAL_ROUTING_CONTROL_FAMILIES));

const listRawMaterialRoutingControls = () =>
  cloneAndFreeze(Object.values(RAW_MATERIAL_ROUTING_CONTROL_REGISTRY));

const getRawMaterialRoutingControl = (controlKey) =>
  cloneAndFreeze(
    RAW_MATERIAL_ROUTING_CONTROL_REGISTRY[controlKey] ||
      UNKNOWN_RAW_MATERIAL_ROUTING_CONTROL,
  );

const classifyRawMaterialRoutingControl = (controlKey) =>
  getRawMaterialRoutingControl(controlKey);

const hasRawMaterialRoutingControl = (controlKey) =>
  Object.hasOwn(RAW_MATERIAL_ROUTING_CONTROL_REGISTRY, controlKey);

const listRawMaterialRoutingNonOverclaimRules = () =>
  cloneAndFreeze(RAW_MATERIAL_ROUTING_NON_OVERCLAIM_RULES);

const getRawMaterialRoutingRequiredPrerequisites = () =>
  cloneAndFreeze(RAW_MATERIAL_ROUTING_REQUIRED_PREREQUISITES);

const getRawMaterialRoutingNonAuthorizationStatus = () =>
  cloneAndFreeze(BASE_NON_AUTHORIZATIONS);

const isRawMaterialRoutingImplemented = () => false;

const isRawMaterialRouteAuthorized = () => false;

module.exports = {
  RAW_MATERIAL_ROUTING_CONTROL_FAMILIES,
  RAW_MATERIAL_ROUTING_CONTROL_REGISTRY,
  RAW_MATERIAL_ROUTING_DECISION_STATUS,
  RAW_MATERIAL_ROUTING_EVIDENCE_POSTURE,
  RAW_MATERIAL_ROUTING_IMPLEMENTATION_STATUS,
  RAW_MATERIAL_ROUTING_NON_OVERCLAIM_RULES,
  RAW_MATERIAL_ROUTING_REQUIRED_PREREQUISITES,
  RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_MATERIAL_CLASSES,
  RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_NON_AUTHORIZATIONS,
  RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_REQUIRED_FIELDS,
  RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_ROWS,
  RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_ROW_IDS,
  RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_REGISTRY_STATUS,
  classifyRawMaterialRoutingControl,
  getRawMaterialRoutingControlSpecificationRow,
  getRawMaterialRoutingControl,
  getRawMaterialRoutingNonAuthorizationStatus,
  getRawMaterialRoutingRequiredPrerequisites,
  hasRawMaterialRoutingControl,
  isRawMaterialRouteAuthorized,
  isRawMaterialRoutingImplemented,
  listRawMaterialRoutingControlFamilies,
  listRawMaterialRoutingControlSpecificationRows,
  listRawMaterialRoutingControls,
  listRawMaterialRoutingNonOverclaimRules,
  summarizeRawMaterialRoutingControlSpecificationRegistry,
};
