"use strict";

const materialClassRegistry = Object.freeze({
  SYNTHETIC_NO_RAW_MATERIAL: Object.freeze({
    material_class: "SYNTHETIC_NO_RAW_MATERIAL",
    handling_status: "DENY_BY_DEFAULT",
    description: "Synthetic fixture material that carries no raw, private, or source payload.",
  }),
  REDACTED_REVIEW_SIGNAL_MATERIAL: Object.freeze({
    material_class: "REDACTED_REVIEW_SIGNAL_MATERIAL",
    handling_status: "DENY_BY_DEFAULT",
    description: "Redacted review signal material that is not route-authorized by this slice.",
  }),
  LOCAL_LOG_OR_TEST_TRANSCRIPT_MATERIAL: Object.freeze({
    material_class: "LOCAL_LOG_OR_TEST_TRANSCRIPT_MATERIAL",
    handling_status: "DENY_BY_DEFAULT",
    description: "Local proof output that cannot become CI evidence or runtime certainty.",
  }),
  HASH_OR_MANIFEST_MATERIAL: Object.freeze({
    material_class: "HASH_OR_MANIFEST_MATERIAL",
    handling_status: "DENY_BY_DEFAULT",
    description: "Hash or manifest material that cannot become truth proof.",
  }),
  RAW_PRIVATE_SOURCE_MATERIAL: Object.freeze({
    material_class: "RAW_PRIVATE_SOURCE_MATERIAL",
    handling_status: "DENY_BY_DEFAULT",
    blocker: "RAW_PRIVATE_SOURCE_MATERIAL_ROUTE_BLOCKED",
    description: "Raw, private, or source material is denied by default.",
  }),
  SOURCE_PACKAGE_MATERIAL: Object.freeze({
    material_class: "SOURCE_PACKAGE_MATERIAL",
    handling_status: "DENY_BY_DEFAULT",
    blocker: "SOURCE_PACKAGE_ROUTE_BLOCKED",
    description: "Source packages are denied by default.",
  }),
  PDF_IMAGE_SCREENSHOT_METADATA_MATERIAL: Object.freeze({
    material_class: "PDF_IMAGE_SCREENSHOT_METADATA_MATERIAL",
    handling_status: "DENY_BY_DEFAULT",
    blocker: "PDF_IMAGE_SCREENSHOT_METADATA_ACQUISITION_BLOCKED",
    description: "PDF, image, screenshot, and metadata acquisition is denied by default.",
  }),
  THIRD_PARTY_MODEL_API_ROUTED_MATERIAL: Object.freeze({
    material_class: "THIRD_PARTY_MODEL_API_ROUTED_MATERIAL",
    handling_status: "DENY_BY_DEFAULT",
    blocker: "THIRD_PARTY_MODEL_API_ROUTE_BLOCKED",
    description: "Third-party model or API routing is denied by default.",
  }),
});

const materialHandlingStatusRegistry = Object.freeze({
  DENY_BY_DEFAULT: Object.freeze({
    handling_status: "DENY_BY_DEFAULT",
    authorized: false,
    description: "No route, use, release, or disclosure authorization is created.",
  }),
  DOCS_ONLY_NOT_RUNTIME_ENFORCEMENT: Object.freeze({
    handling_status: "DOCS_ONLY_NOT_RUNTIME_ENFORCEMENT",
    authorized: false,
    description: "A docs-only control-plane statement does not create runtime enforcement.",
  }),
  HUMAN_PROFESSIONAL_REVIEW_REQUIRED: Object.freeze({
    handling_status: "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    authorized: false,
    description: "Human and professional review remains a required release gate.",
  }),
  UNKNOWN_NOT_EVIDENCED: Object.freeze({
    handling_status: "UNKNOWN_NOT_EVIDENCED",
    authorized: false,
    description: "Unknown or unevidenced material remains denied.",
  }),
});

const routeDecisionRegistry = Object.freeze({
  ROUTE_DENIED_BY_DEFAULT: Object.freeze({
    route_decision: "ROUTE_DENIED_BY_DEFAULT",
    authorized: false,
    description: "No material route is authorized by this control-plane slice.",
  }),
  RAW_PRIVATE_SOURCE_MATERIAL_ROUTE_DENIED: Object.freeze({
    route_decision: "RAW_PRIVATE_SOURCE_MATERIAL_ROUTE_DENIED",
    authorized: false,
    description: "Raw, private, or source material is denied by default.",
  }),
  SOURCE_PACKAGE_MATERIAL_ROUTE_DENIED: Object.freeze({
    route_decision: "SOURCE_PACKAGE_MATERIAL_ROUTE_DENIED",
    authorized: false,
    description: "Source packages are denied by default.",
  }),
  PDF_IMAGE_SCREENSHOT_METADATA_ACQUISITION_ROUTE_DENIED: Object.freeze({
    route_decision: "PDF_IMAGE_SCREENSHOT_METADATA_ACQUISITION_ROUTE_DENIED",
    authorized: false,
    description: "PDF, image, screenshot, and metadata acquisition is denied by default.",
  }),
  THIRD_PARTY_MODEL_API_ROUTE_DENIED: Object.freeze({
    route_decision: "THIRD_PARTY_MODEL_API_ROUTE_DENIED",
    authorized: false,
    description: "Third-party model or API routing is denied by default.",
  }),
  EXTERNAL_USE_DENIED_BY_DEFAULT: Object.freeze({
    route_decision: "EXTERNAL_USE_DENIED_BY_DEFAULT",
    authorized: false,
    description: "External use is denied by default.",
  }),
  PRODUCT_CANDIDATE_SELECTION_DENIED_BY_DEFAULT: Object.freeze({
    route_decision: "PRODUCT_CANDIDATE_SELECTION_DENIED_BY_DEFAULT",
    authorized: false,
    description: "Product-candidate selection is denied by default.",
  }),
  RELEASE_APPROVAL_DENIED_BY_DEFAULT: Object.freeze({
    route_decision: "RELEASE_APPROVAL_DENIED_BY_DEFAULT",
    authorized: false,
    description: "Release approval is denied by default.",
  }),
  PUBLIC_AUTHORITY_DISCLOSURE_DENIED_BY_DEFAULT: Object.freeze({
    route_decision: "PUBLIC_AUTHORITY_DISCLOSURE_DENIED_BY_DEFAULT",
    authorized: false,
    description: "Public authority disclosure is denied by default.",
  }),
  COURT_USE_DENIED_BY_DEFAULT: Object.freeze({
    route_decision: "COURT_USE_DENIED_BY_DEFAULT",
    authorized: false,
    description: "Court use is denied by default.",
  }),
  LAW_ENFORCEMENT_USE_DENIED_BY_DEFAULT: Object.freeze({
    route_decision: "LAW_ENFORCEMENT_USE_DENIED_BY_DEFAULT",
    authorized: false,
    description: "Law-enforcement use is denied by default.",
  }),
});

const nonProofStatusRegistry = Object.freeze({
  DOCS_ONLY_NOT_RUNTIME_ENFORCEMENT: Object.freeze({
    non_proof_status: "DOCS_ONLY_NOT_RUNTIME_ENFORCEMENT",
    allowed: false,
    description: "DOCS_ONLY cannot become runtime enforcement.",
  }),
  LOCAL_LOGS_NOT_CI_EVIDENCE: Object.freeze({
    non_proof_status: "LOCAL_LOGS_NOT_CI_EVIDENCE",
    allowed: false,
    description: "Local logs cannot become CI evidence.",
  }),
  HASH_MANIFEST_NOT_TRUTH_PROOF: Object.freeze({
    non_proof_status: "HASH_MANIFEST_NOT_TRUTH_PROOF",
    allowed: false,
    description: "Hash or manifest output cannot become truth proof.",
  }),
  TESTED_SCENARIO_NOT_RUNTIME_CERTAINTY: Object.freeze({
    non_proof_status: "TESTED_SCENARIO_NOT_RUNTIME_CERTAINTY",
    allowed: false,
    description: "A tested scenario cannot become runtime certainty.",
  }),
  ROUTE_CASE_CAPABILITY_NOT_FULL_RBAC: Object.freeze({
    non_proof_status: "ROUTE_CASE_CAPABILITY_NOT_FULL_RBAC",
    allowed: false,
    description: "Route, case, or capability evidence cannot become full RBAC.",
  }),
  ROUTE_CASE_CAPABILITY_NOT_FULL_ACCESS_CONTROL: Object.freeze({
    non_proof_status: "ROUTE_CASE_CAPABILITY_NOT_FULL_ACCESS_CONTROL",
    allowed: false,
    description: "Route, case, or capability evidence cannot become full access control.",
  }),
  RECIPIENT_RESPONSE_NOT_RECIPIENT_COMPLIANCE: Object.freeze({
    non_proof_status: "RECIPIENT_RESPONSE_NOT_RECIPIENT_COMPLIANCE",
    allowed: false,
    description: "Recipient response cannot become recipient compliance.",
  }),
  PROVIDER_STATUS_NOT_PROVIDER_VERIFICATION: Object.freeze({
    non_proof_status: "PROVIDER_STATUS_NOT_PROVIDER_VERIFICATION",
    allowed: false,
    description: "Provider status cannot become provider verification.",
  }),
  HUMAN_PROFESSIONAL_REVIEW_REQUIRED: Object.freeze({
    non_proof_status: "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    allowed: false,
    description: "Human and professional review remains required.",
  }),
});

const dataHandlingBlockerRegistry = Object.freeze({
  RAW_PRIVATE_SOURCE_MATERIAL_ROUTE_BLOCKED: Object.freeze({
    blocker: "RAW_PRIVATE_SOURCE_MATERIAL_ROUTE_BLOCKED",
    description: "Raw, private, or source material is not route-authorized.",
  }),
  SOURCE_PACKAGE_ROUTE_BLOCKED: Object.freeze({
    blocker: "SOURCE_PACKAGE_ROUTE_BLOCKED",
    description: "Source package inspection or routing is not authorized.",
  }),
  PDF_IMAGE_SCREENSHOT_METADATA_ACQUISITION_BLOCKED: Object.freeze({
    blocker: "PDF_IMAGE_SCREENSHOT_METADATA_ACQUISITION_BLOCKED",
    description: "PDF, image, screenshot, and metadata acquisition is not authorized.",
  }),
  THIRD_PARTY_MODEL_API_ROUTE_BLOCKED: Object.freeze({
    blocker: "THIRD_PARTY_MODEL_API_ROUTE_BLOCKED",
    description: "Third-party model or API routing is not authorized.",
  }),
  RETENTION_DELETION_PURGE_IMPLEMENTATION_NOT_CREATED: Object.freeze({
    blocker: "RETENTION_DELETION_PURGE_IMPLEMENTATION_NOT_CREATED",
    description: "Retention, deletion, and purge behavior is not implemented.",
  }),
  ENCRYPTION_IMPLEMENTATION_NOT_CREATED: Object.freeze({
    blocker: "ENCRYPTION_IMPLEMENTATION_NOT_CREATED",
    description: "Encryption behavior is not implemented.",
  }),
  AUDIT_LOG_STORAGE_NOT_CREATED: Object.freeze({
    blocker: "AUDIT_LOG_STORAGE_NOT_CREATED",
    description: "Audit log storage is not implemented.",
  }),
  RBAC_ENFORCEMENT_NOT_CREATED: Object.freeze({
    blocker: "RBAC_ENFORCEMENT_NOT_CREATED",
    description: "RBAC enforcement is not implemented.",
  }),
  ADMIN_SUPPORT_MODEL_NOT_CREATED: Object.freeze({
    blocker: "ADMIN_SUPPORT_MODEL_NOT_CREATED",
    description: "Admin or support model behavior is not implemented.",
  }),
  RELEASE_EXTERNAL_USE_PRODUCT_AUTHORIZATION_NOT_CREATED: Object.freeze({
    blocker: "RELEASE_EXTERNAL_USE_PRODUCT_AUTHORIZATION_NOT_CREATED",
    description: "Release, external-use, and product-candidate authorization is not created.",
  }),
  PUBLIC_COURT_LAW_ENFORCEMENT_AUTHORIZATION_NOT_CREATED: Object.freeze({
    blocker: "PUBLIC_COURT_LAW_ENFORCEMENT_AUTHORIZATION_NOT_CREATED",
    description: "Public, court, and law-enforcement authorization is not created.",
  }),
  LEGAL_CLINICAL_EVIDENTIARY_CASE_TRUTH_CONCLUSION_NOT_CREATED: Object.freeze({
    blocker: "LEGAL_CLINICAL_EVIDENTIARY_CASE_TRUTH_CONCLUSION_NOT_CREATED",
    description: "Legal, clinical, evidentiary, or case-truth conclusions are not created.",
  }),
  SECURITY_FINDING_SEVERITY_REMEDIATION_NOT_CREATED: Object.freeze({
    blocker: "SECURITY_FINDING_SEVERITY_REMEDIATION_NOT_CREATED",
    description: "Security findings, severity, and remediation are not created.",
  }),
});

const materialRouteDecisionByClass = Object.freeze({
  RAW_PRIVATE_SOURCE_MATERIAL: "RAW_PRIVATE_SOURCE_MATERIAL_ROUTE_DENIED",
  SOURCE_PACKAGE_MATERIAL: "SOURCE_PACKAGE_MATERIAL_ROUTE_DENIED",
  PDF_IMAGE_SCREENSHOT_METADATA_MATERIAL:
    "PDF_IMAGE_SCREENSHOT_METADATA_ACQUISITION_ROUTE_DENIED",
  THIRD_PARTY_MODEL_API_ROUTED_MATERIAL: "THIRD_PARTY_MODEL_API_ROUTE_DENIED",
});

const noOverclaimStatusByClaim = Object.freeze({
  DOCS_ONLY_AS_RUNTIME_ENFORCEMENT: "DOCS_ONLY_NOT_RUNTIME_ENFORCEMENT",
  LOCAL_LOG_AS_CI_EVIDENCE: "LOCAL_LOGS_NOT_CI_EVIDENCE",
  HASH_MANIFEST_AS_TRUTH_PROOF: "HASH_MANIFEST_NOT_TRUTH_PROOF",
  TESTED_SCENARIO_AS_RUNTIME_CERTAINTY: "TESTED_SCENARIO_NOT_RUNTIME_CERTAINTY",
  ROUTE_CASE_CAPABILITY_AS_FULL_RBAC: "ROUTE_CASE_CAPABILITY_NOT_FULL_RBAC",
  ROUTE_CASE_CAPABILITY_AS_FULL_ACCESS_CONTROL:
    "ROUTE_CASE_CAPABILITY_NOT_FULL_ACCESS_CONTROL",
  RECIPIENT_RESPONSE_AS_RECIPIENT_COMPLIANCE:
    "RECIPIENT_RESPONSE_NOT_RECIPIENT_COMPLIANCE",
  PROVIDER_STATUS_AS_PROVIDER_VERIFICATION:
    "PROVIDER_STATUS_NOT_PROVIDER_VERIFICATION",
});

const dataHandlingNonAuthorizationInvariant = Object.freeze({
  external_use_authorized: false,
  product_candidate_selected: false,
  release_approved: false,
  public_authority_disclosure_authorized: false,
  court_use_authorized: false,
  law_enforcement_use_authorized: false,
  runtime_enforcement_created: false,
  ci_evidence_created_from_local_logs: false,
  truth_proof_created_from_hash_or_manifest: false,
  runtime_certainty_created_from_tested_scenario: false,
  full_rbac_created_from_route_case_capability: false,
  full_access_control_created_from_route_case_capability: false,
  recipient_compliance_created_from_response: false,
  provider_verification_created_from_status: false,
  human_professional_review_required: true,
});

function getRegistryEntry(registry, key) {
  return registry[key] || null;
}

function getMaterialClassEntry(materialClass) {
  return getRegistryEntry(materialClassRegistry, materialClass);
}

function getMaterialHandlingStatusEntry(status) {
  return getRegistryEntry(materialHandlingStatusRegistry, status);
}

function getRouteDecisionEntry(decision) {
  return getRegistryEntry(routeDecisionRegistry, decision);
}

function getNonProofStatusEntry(status) {
  return getRegistryEntry(nonProofStatusRegistry, status);
}

function getDataHandlingBlockerEntry(blocker) {
  return getRegistryEntry(dataHandlingBlockerRegistry, blocker);
}

function decideMaterialRoute(materialClass, routeSurface = "MODEL_CONTEXT_ROUTE") {
  const materialEntry = getMaterialClassEntry(materialClass);
  const routeDecision =
    materialRouteDecisionByClass[materialClass] || "ROUTE_DENIED_BY_DEFAULT";

  return Object.freeze({
    material_class: materialClass,
    material_class_known: Boolean(materialEntry),
    route_surface: routeSurface,
    route_decision: routeDecision,
    authorized: false,
    handling_status: materialEntry
      ? materialEntry.handling_status
      : "UNKNOWN_NOT_EVIDENCED",
    blocker: materialEntry && materialEntry.blocker ? materialEntry.blocker : null,
    human_professional_review_required: true,
    non_authorizations: Object.freeze([
      "NO_RAW_PRIVATE_SOURCE_PROCESSING",
      "NO_SOURCE_PACKAGE_INSPECTION",
      "NO_PDF_IMAGE_SCREENSHOT_METADATA_ACQUISITION",
      "NO_THIRD_PARTY_MODEL_API_ROUTING",
      "NO_EXTERNAL_USE_AUTHORIZATION",
      "NO_PRODUCT_CANDIDATE_SELECTION",
      "NO_RELEASE_APPROVAL",
      "NO_PUBLIC_AUTHORITY_DISCLOSURE",
      "NO_COURT_USE",
      "NO_LAW_ENFORCEMENT_USE",
    ]),
  });
}

function evaluateNoOverclaim(claim) {
  const nonProofStatus =
    noOverclaimStatusByClaim[claim] || "HUMAN_PROFESSIONAL_REVIEW_REQUIRED";
  const nonProofEntry = getNonProofStatusEntry(nonProofStatus);

  return Object.freeze({
    claim,
    allowed: false,
    non_proof_status: nonProofStatus,
    human_professional_review_required: true,
    description: nonProofEntry ? nonProofEntry.description : null,
  });
}

function getGlobalNonAuthorizationInvariant() {
  return { ...dataHandlingNonAuthorizationInvariant };
}

module.exports = {
  dataHandlingBlockerRegistry,
  dataHandlingNonAuthorizationInvariant,
  decideMaterialRoute,
  evaluateNoOverclaim,
  getDataHandlingBlockerEntry,
  getGlobalNonAuthorizationInvariant,
  getMaterialClassEntry,
  getMaterialHandlingStatusEntry,
  getNonProofStatusEntry,
  getRouteDecisionEntry,
  materialClassRegistry,
  materialHandlingStatusRegistry,
  nonProofStatusRegistry,
  routeDecisionRegistry,
};
