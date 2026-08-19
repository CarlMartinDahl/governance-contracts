import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const DOC_PATH =
  "docs/DOMAIN_CONTRACTS_DATA_HANDLING_SECURITY_CONTROL_PLANE_IMPLEMENTATION_CONTROL_PLAN_ENTRY_CANDIDATE_SCOPE_BOUNDARY_v1.md";
const doc = readFileSync(DOC_PATH, "utf8");

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function assertIncludesAll(entries, text = doc) {
  for (const entry of entries) {
    assert.match(text, new RegExp(escapeRegExp(entry)), `missing ${entry}`);
  }
}

function assertDoesNotIncludeExactToken(entries, text = doc) {
  for (const entry of entries) {
    const pattern = new RegExp(`(?<![A-Z0-9_])${escapeRegExp(entry)}(?![A-Z0-9_])`);
    assert.doesNotMatch(text, pattern, `forbidden exact token ${entry}`);
  }
}

function sectionBetween(startHeading, endHeading) {
  const start = doc.indexOf(startHeading);
  assert.notEqual(start, -1, `missing section ${startHeading}`);
  const end = endHeading ? doc.indexOf(endHeading, start + startHeading.length) : doc.length;
  assert.notEqual(end, -1, `missing end section ${endHeading}`);
  return doc.slice(start, end);
}

const matrix = sectionBetween("## Scope Matrix", "## Scope Exclusions");
const recommendations = sectionBetween("## Recommended Next Posture");

test("boundary doc exists", () => {
  assert.equal(existsSync(DOC_PATH), true);
});

test("identity/status tokens exist", () => {
  assertIncludesAll([
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_IMPLEMENTATION_CONTROL_PLAN_ENTRY_CANDIDATE_SCOPE_BOUNDARY",
    "DOCS_ONLY",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_ENTRY_CANDIDATE_SCOPE_ONLY",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_SCOPE_PARTIAL_GAP_CONTEXT",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_SCOPE_NOT_IMPLEMENTATION_READINESS_AUTHORIZATION",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_SCOPE_NOT_IMPLEMENTATION",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_SCOPE_NOT_RUNTIME_READY",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_SCOPE_NOT_RUNTIME_BEHAVIOR",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_SCOPE_NOT_RUNTIME_API_SCHEMA_PACKAGE_BEHAVIOR_CHANGE",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_SCOPE_NOT_PROVE_ONLY_STATUS_GAP",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_SCOPE_NOT_RETENTION_IMPLEMENTATION",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_SCOPE_NOT_DELETION_IMPLEMENTATION",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_SCOPE_NOT_ENCRYPTION_IMPLEMENTATION",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_SCOPE_NOT_AUDIT_ACCESS_LOG_IMPLEMENTATION",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_SCOPE_NOT_EVENT_TAXONOMY_RUNTIME_CODE",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_SCOPE_NOT_LOG_SCHEMA",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_SCOPE_NOT_LOG_STORAGE",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_SCOPE_NOT_ROLE_PERMISSION_IMPLEMENTATION",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_SCOPE_NOT_RBAC_ACCESS_CONTROL_IMPLEMENTATION",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_SCOPE_NOT_ADMIN_SUPPORT_IMPLEMENTATION",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_SCOPE_NOT_RAW_MATERIAL_ROUTING_IMPLEMENTATION",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_SCOPE_NOT_THIRD_PARTY_ROUTING_IMPLEMENTATION",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_SCOPE_NOT_THIRD_PARTY_ROUTING_AUTHORIZATION",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_SCOPE_NOT_PROVIDER_INTEGRATION",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_SCOPE_NOT_PROVIDER_REGISTRY",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_SCOPE_NOT_PROVIDER_STATUS_IMPLEMENTATION",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_SCOPE_NOT_DATA_ROUTING_MAP_IMPLEMENTATION",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_SCOPE_NOT_TOKEN_URL_SECRET_HANDLING_IMPLEMENTATION",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_SCOPE_NOT_GLOBAL_ACCESS_CONTROL_THREAT_MODEL_CLOSURE",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_SCOPE_NOT_RUNTIME_GATE_IMPLEMENTATION",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_SCOPE_NOT_RUNTIME_GATE_INVENTORY_AS_IMPLEMENTATION",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_SCOPE_NOT_VALIDATOR_DISPATCH",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_SCOPE_NOT_REGISTRY_LOOKUP",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_SCOPE_NOT_SCHEMA_VALIDATOR_ENFORCEMENT",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_SCOPE_NOT_WORKFLOW_ENFORCEMENT",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_SCOPE_NOT_CI_EVIDENCE_CREATION",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_SCOPE_NOT_RELEASE_APPROVAL",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_SCOPE_NOT_PRODUCT_CANDIDATE",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_SCOPE_NOT_EXTERNAL_USE_AUTHORIZATION",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_SCOPE_NOT_DELIVERY_TO_EXTERNAL_REVIEWER",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_SCOPE_NOT_PACKET_APPROVAL",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_SCOPE_NOT_BLOCKER_RESOLUTION",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_SCOPE_NOT_DEPENDENCY_CLOSURE",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_SCOPE_CONTINUED_PAUSE",
  ]);
});

test("purpose and source hierarchy exist", () => {
  assertIncludesAll([
    "This boundary freezes the data-handling/security/control-plane implementation control plan entry-candidate scope after the roadmap dependencies 001-to-007 blocked-completion summary.",
    "It is DOCS_ONLY, non-authorizing, partial/gap, and scope/context only.",
    "This scope boundary is required before any future PROVE_ONLY data-handling/security/control-plane status/gap review could be considered.",
    "LIVE_REPO_EVIDENCE_WINS",
    "TRACKED_REPO_EVIDENCE_CONTROLS_CURRENT_STATE",
    "IMPLEMENTATION_READINESS_ENTRY_CRITERIA_BOUNDARY_CONTROLS_ENTRY_RULES",
    "ROADMAP_DEPENDENCIES_001_TO_007_BLOCKED_COMPLETION_SUMMARY_CONTROLS_CURRENT_ROADMAP_PAUSE",
    "DEPENDENCY_001_PLANNING_ROUND_SUMMARY_CONTROLS_RBAC_ADMIN_SUPPORT_CONTEXT",
    "DEPENDENCY_002_PLANNING_ROUND_SUMMARY_CONTROLS_AUDIT_ACCESS_LOG_CONTEXT",
    "DEPENDENCY_003_PLANNING_ROUND_SUMMARY_CONTROLS_RETENTION_DELETION_CONTEXT",
    "DEPENDENCY_004_PLANNING_ROUND_SUMMARY_CONTROLS_RAW_MATERIAL_ROUTING_CONTEXT",
    "DEPENDENCY_005_PLANNING_ROUND_SUMMARY_CONTROLS_THIRD_PARTY_PROVIDER_CONTEXT",
    "DEPENDENCY_006_PLANNING_ROUND_SUMMARY_CONTROLS_VALIDATOR_REGISTRY_RUNTIME_GATE_CONTEXT",
    "DEPENDENCY_007_PLANNING_ROUND_SUMMARY_CONTROLS_CI_RELEASE_PRODUCT_EXTERNAL_USE_CONTEXT",
    "DATA_HANDLING_PRIVATE_PILOT_READINESS_BOUNDARY_CONTROLS_PRIOR_DATA_HANDLING_CONTEXT_IF_PRESENT",
    "RETENTION_DELETION_CONTROL_SPECIFICATION_BOUNDARY_CONTROLS_RETENTION_CONTEXT",
    "AUDIT_ACCESS_LOG_BOUNDARY_DOCS_CONTROL_AUDIT_CONTEXT",
    "RBAC_ADMIN_SUPPORT_BOUNDARY_DOCS_CONTROL_ACCESS_CONTEXT",
    "RAW_MATERIAL_ROUTING_BOUNDARY_DOCS_CONTROL_RAW_ROUTING_CONTEXT",
    "THIRD_PARTY_PROVIDER_BOUNDARY_DOCS_CONTROL_PROVIDER_CONTEXT",
    "VALIDATOR_REGISTRY_RUNTIME_GATE_BOUNDARY_DOCS_CONTROL_GATE_CONTEXT",
    "CI_RELEASE_PRODUCT_EXTERNAL_USE_BOUNDARY_DOCS_CONTROL_RELEASE_CONTEXT",
    "EXTERNAL_REVIEW_REQUIREMENTS_USED_AS_ADVISORY_CONTEXT_ONLY",
    "STATIC_INSPECTION_RESULTS_ARE_REVIEW_CONTEXT_ONLY",
    "OLD_HANDOFF_FILES_ARE_HISTORICAL_CONTEXT_ONLY",
    "STALE_HANDOFF_MUST_NOT_SELECT_REOPEN_OR_CLOSE_SLICE",
  ]);
});

test("current accepted state and prior review result exist", () => {
  assertIncludesAll([
    "a984bda docs(domain): freeze roadmap dependencies 001-007 blocked completion summary boundary",
    "POST_ROADMAP_DEPENDENCIES_001_TO_007_BLOCKED_COMPLETION_ROUND_SUMMARY_BOUNDARY_REVIEWED_AND_PAUSED_NO_CHANGE",
    "NEXT_SAFE_POSTURE_SELECTED_AFTER_ROADMAP_DEPENDENCIES_001_TO_007_BLOCKED_COMPLETION_SUMMARY_PAUSE_NO_CHANGE",
    "REVIEW_ONLY_DATA_HANDLING_SECURITY_CONTROL_PLANE_IMPLEMENTATION_CONTROL_PLAN_ENTRY_CANDIDATE_COMPLETED_NO_CHANGE",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_IMPLEMENTATION_CONTROL_PLAN_ENTRY_CANDIDATE_REVIEWED_PARTIAL_GAP_NON_AUTHORIZING_AND_PAUSED_NO_CHANGE",
    "NEXT_PHASE_SELECTED_AFTER_DATA_HANDLING_SECURITY_CONTROL_PLANE_ENTRY_CANDIDATE_SCOPE_GAP_NO_CHANGE",
    "COMBINED_READ_ONLY_DATA_HANDLING_SECURITY_CONTROL_PLANE_ENTRY_CANDIDATE_PAUSE_AND_SCOPE_BOUNDARY_SELECTION_COMPLETED_NO_CHANGE",
    "RECOVERY_AFTER_INTERRUPTED_DATA_HANDLING_SECURITY_CONTROL_PLANE_ENTRY_CANDIDATE_SCOPE_BOUNDARY_WRITE_SLICE_COMPLETED_NO_CHANGE",
    "The data-handling/security/control-plane entry-candidate review was read-only.",
    "PARTIAL_GAP_REQUIRES_DOCS_ONLY_DATA_HANDLING_SECURITY_CONTROL_PLANE_IMPLEMENTATION_CONTROL_PLAN_ENTRY_CANDIDATE_SCOPE_BOUNDARY",
    "A future PROVE_ONLY status/gap candidate may not yet be proposed.",
    "Continued pause remains valid until scope is frozen.",
    "This boundary freezes scope only and does not alter that result.",
  ]);
});

test("scope surfaces and IR-EC summary exist", () => {
  assertIncludesAll([
    "retention",
    "deletion",
    "encryption",
    "audit/access logs",
    "event taxonomy",
    "log schema",
    "log storage",
    "role permissions / RBAC",
    "admin/support access",
    "raw-material routing",
    "third-party model/API status",
    "provider registry/status",
    "provider data-routing map",
    "provider retention/deletion posture",
    "provider auditability posture",
    "provider token/URL/secret handling",
    "access control beyond documented route/case behavior",
    "complete global access-control threat model",
    "local logs as not CI evidence",
    "local logs as not packet components",
    "no-raw/no-private/no-source-locator/no-token/no-URL posture",
    "implementation evidence",
    "test evidence",
    "CI evidence if claimed",
    "closure criteria",
    "non-authorization boundary",
    "IR-EC-001",
    "IR-EC-018",
    "satisfied for read-only candidate review is not implementation-readiness authorization",
  ]);
});

test("scope matrix exists and all DHC-SCOPE-001 through DHC-SCOPE-024 rows exist", () => {
  assertIncludesAll([
    "row ID",
    "scope surface",
    "current evidence level",
    "scope gap requiring freeze",
    "control-plan question to freeze",
    "linked dependency/context",
    "future evidence required before status/gap",
    "what remains non-authorized",
    "Every row preserves DOCS_ONLY, scope only, partial/gap where applicable, no implementation-readiness authorization, no implementation, no runtime/API/schema/package change, no current CI evidence, no blocker resolution, no dependency closure, future evidence only, and continued pause on ambiguity.",
  ], matrix);
  for (let index = 1; index <= 24; index += 1) {
    assertIncludesAll([`DHC-SCOPE-${String(index).padStart(3, "0")}`], matrix);
  }
});

test("scope exclusions and evidence limits exist", () => {
  assertIncludesAll([
    "Scope does not mean status/gap review.",
    "Scope does not mean implementation plan approval.",
    "Scope does not mean implementation-readiness.",
    "Scope does not mean implementation.",
    "Scope does not mean blocker resolution.",
    "Scope does not mean dependency closure.",
    "Scope does not mean CI evidence.",
    "Scope does not mean release approval.",
    "Scope does not mean product candidate.",
    "Scope does not mean external-use authorization.",
    "Scope does not mean runtime gate inventory can be selected before this scope is reviewed and paused.",
    "Tests are tested-scenario evidence, not runtime certainty.",
    "Green tests are not release approval.",
    "npm test/lint/build history is not release approval.",
    "Local logs are not CI evidence.",
    "Local logs are not packet components.",
    "Generated PDFs are not repo evidence unless separately approved.",
    "Generated PDFs are not packet components unless separately approved.",
    "DOCS_ONLY boundaries are not runtime enforcement.",
    "Prompt/workflow controls are not runtime enforcement.",
    "Route/case/capability evidence is not full RBAC/access-control.",
    "Route/case/capability evidence is not admin/support access-control.",
    "Route/case/capability evidence is not global authorization model.",
    "Runtime gate inventory is not implementation.",
    "CI evidence requires separate explicit CI evidence creation.",
    "Runtime certification requires separate explicit evidence.",
    "Technical sign-off requires separate explicit evidence.",
    "External Reviewer approval requires separate explicit evidence.",
    "Product candidate requires separate explicit selection.",
    "External-use requires separate explicit authorization.",
    "Delivery to External Reviewer requires separate explicit authorization.",
    "Packet approval requires separate explicit authorization.",
    "Digest/dossier context is not product readiness.",
    "Consolidated dossier context is not runtime certification.",
    "Human/professional review remains release gate.",
    "Continued pause is valid.",
  ]);
});

test("negative authorization and no-overclaim rules exist", () => {
  assertIncludesAll([
    "This boundary creates no implementation-readiness.",
    "This boundary creates no implementation.",
    "This boundary creates no runtime behavior.",
    "This boundary creates no runtime/API/schema/package behavior change.",
    "This boundary creates no data-handling implementation.",
    "This boundary creates no security-control implementation.",
    "This boundary creates no control-plane implementation.",
    "This boundary creates no retention implementation.",
    "This boundary creates no deletion implementation.",
    "This boundary creates no encryption implementation.",
    "This boundary creates no audit/access-log implementation.",
    "This boundary creates no event taxonomy runtime code.",
    "This boundary creates no log schema.",
    "This boundary creates no log storage.",
    "This boundary creates no role/permission implementation.",
    "This boundary creates no RBAC/access-control implementation.",
    "This boundary creates no admin/support implementation.",
    "This boundary creates no raw-material routing implementation.",
    "This boundary creates no third-party routing implementation or authorization.",
    "This boundary creates no provider integration.",
    "This boundary creates no provider registry.",
    "This boundary creates no provider status implementation.",
    "This boundary creates no data-routing map implementation.",
    "This boundary creates no token/URL/secret handling implementation.",
    "This boundary creates no global access-control threat model closure.",
    "This boundary creates no runtime gate implementation.",
    "This boundary treats runtime gate inventory as not implementation.",
    "This boundary creates no validator dispatch.",
    "This boundary creates no registry/lookup.",
    "This boundary creates no schema/validator enforcement.",
    "This boundary creates no workflow enforcement.",
    "This boundary creates no CI evidence.",
    "This boundary creates no CI certification.",
    "This boundary does not promote local logs to CI evidence.",
    "This boundary does not promote local logs to packet components.",
    "This boundary creates no release approval.",
    "This boundary creates no runtime certification.",
    "This boundary creates no technical sign-off.",
    "This boundary creates no External Reviewer approval.",
    "This boundary creates no product readiness.",
    "This boundary selects no product candidate.",
    "This boundary creates no external-use authorization.",
    "This boundary authorizes no delivery to External Reviewer.",
    "This boundary creates no packet approval.",
    "This boundary creates no packet component approval.",
    "This boundary creates no final delivery decision.",
    "This boundary creates no PDF packet.",
    "This boundary creates no archive/ZIP.",
    "This boundary creates no generated PDF as repo evidence.",
    "This boundary creates no generated PDF as packet component.",
    "This boundary authorizes no raw/private/source inspection.",
    "This boundary authorizes no source package inspection.",
    "This boundary authorizes no PDF/image/screenshot/metadata inspection.",
    "This boundary authorizes no metadata acquisition.",
    "This boundary authorizes no real private run.",
    "This boundary creates no blocker resolution.",
    "This boundary creates no dependency closure.",
    "This boundary creates no finding.",
    "This boundary assigns no severity.",
    "This boundary recommends no remediation.",
    "This boundary authorizes no local log file inspection.",
    "This boundary creates no delivery package generation.",
    "Scope boundary does not mean implementation-readiness authorization.",
    "Scope boundary does not mean implementation.",
    "Scope boundary does not mean runtime readiness.",
    "Scope boundary does not mean PROVE_ONLY status/gap review.",
    "Scope row does not mean blocker closure.",
    "Partial/gap entry-candidate review does not mean dependency closure.",
    "Retention scope does not mean retention implementation.",
    "Deletion scope does not mean deletion implementation.",
    "Encryption scope does not mean encryption implementation.",
    "Audit/access-log scope does not mean audit/access-log implementation.",
    "RBAC scope does not mean RBAC implementation.",
    "Admin/support scope does not mean admin/support implementation.",
    "Raw-material routing scope does not mean raw-material routing implementation.",
    "Third-party/provider scope does not mean third-party routing authorization.",
    "Provider registry/status scope does not mean provider registry/status exists.",
    "Data-routing map scope does not mean data-routing map exists.",
    "Token/URL/secret scope does not mean token/URL/secret handling exists.",
    "Global access-control threat-model scope does not mean threat model is closed.",
    "Runtime gate sequencing scope does not mean runtime gate inventory can be selected.",
    "Required implementation evidence does not mean implementation evidence exists.",
    "Required test evidence does not mean test evidence exists.",
    "Required CI evidence does not mean CI evidence exists.",
  ]);
});

test("recommended next posture is review-only or continued pause only", () => {
  assertIncludesAll([
    "REVIEW_ONLY_DATA_HANDLING_SECURITY_CONTROL_PLANE_IMPLEMENTATION_CONTROL_PLAN_ENTRY_CANDIDATE_SCOPE_BOUNDARY",
    "REVIEW_ONLY_DATA_HANDLING_SECURITY_CONTROL_PLANE_IMPLEMENTATION_CONTROL_PLAN_STATUS_GAP_AFTER_SCOPE_BOUNDARY",
    "continued pause",
    "None are authorized by this boundary.",
  ], recommendations);
});

test("rejects exact overclaiming tokens", () => {
  assertDoesNotIncludeExactToken([
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_IMPLEMENTATION_READY",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_READY_FOR_IMPLEMENTATION",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_IMPLEMENTED",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_CLOSED",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_BLOCKER_RESOLVED",
    "DATA_HANDLING_IMPLEMENTED",
    "SECURITY_CONTROL_IMPLEMENTED",
    "CONTROL_PLANE_IMPLEMENTED",
    "RETENTION_IMPLEMENTED",
    "DELETION_IMPLEMENTED",
    "ENCRYPTION_IMPLEMENTED",
    "AUDIT_ACCESS_LOG_IMPLEMENTED",
    "EVENT_TAXONOMY_RUNTIME_CODE_CREATED",
    "LOG_SCHEMA_CREATED",
    "LOG_STORAGE_CREATED",
    "ROLE_PERMISSION_IMPLEMENTED",
    "RBAC_ACCESS_CONTROL_IMPLEMENTED",
    "ADMIN_SUPPORT_IMPLEMENTED",
    "RAW_MATERIAL_ROUTING_IMPLEMENTED",
    "THIRD_PARTY_ROUTING_AUTHORIZED",
    "THIRD_PARTY_ROUTING_IMPLEMENTED",
    "PROVIDER_INTEGRATION_CREATED",
    "PROVIDER_REGISTRY_CREATED",
    "PROVIDER_STATUS_IMPLEMENTATION_CREATED",
    "DATA_ROUTING_MAP_CREATED",
    "TOKEN_URL_SECRET_HANDLING_IMPLEMENTED",
    "GLOBAL_ACCESS_CONTROL_THREAT_MODEL_CLOSED",
    "RUNTIME_GATE_IMPLEMENTED",
    "RUNTIME_GATE_INVENTORY_IMPLEMENTED",
    "RUNTIME_GATE_INVENTORY_AS_IMPLEMENTATION_CREATED",
    "VALIDATOR_DISPATCH_CREATED",
    "REGISTRY_LOOKUP_CREATED",
    "SCHEMA_VALIDATOR_ENFORCEMENT_CREATED",
    "WORKFLOW_ENFORCEMENT_CREATED",
    "PROVE_ONLY_STATUS_GAP_AUTHORIZED",
    "IMPLEMENTATION_READINESS_AUTHORIZED",
    "IMPLEMENTATION_AUTHORIZED",
    "RUNTIME_AUTHORIZED",
    "RUNTIME_READY",
    "MODEL_RUNTIME_READY",
    "MODEL_COMPLETE",
    "MODEL_COMPLETION_READY",
    "CI_EVIDENCE_CREATED",
    "CI_CERTIFICATION_CREATED",
    "LOCAL_LOGS_PROMOTED_TO_CI_EVIDENCE",
    "LOCAL_LOGS_PROMOTED_TO_PACKET_COMPONENTS",
    "RELEASE_APPROVAL_CREATED",
    "RUNTIME_CERTIFICATION_CREATED",
    "TECHNICAL_SIGN_OFF_CREATED",
    "EXTERNAL_REVIEWER_APPROVAL_CREATED",
    "PRODUCT_READINESS_CREATED",
    "PRODUCT_CANDIDATE_SELECTED",
    "EXTERNAL_USE_AUTHORIZED",
    "DELIVERY_TO_EXTERNAL_REVIEWER_AUTHORIZED",
    "PACKET_APPROVAL_CREATED",
    "PACKET_COMPONENT_APPROVAL_CREATED",
    "FINAL_DELIVERY_DECISION_CREATED",
    "PDF_PACKET_CREATED",
    "ARCHIVE_ZIP_CREATED",
    "GENERATED_PDF_REPO_EVIDENCE_CREATED",
    "GENERATED_PDF_PACKET_COMPONENT_CREATED",
    "RAW_PRIVATE_SOURCE_INSPECTION_AUTHORIZED",
    "SOURCE_PACKAGE_INSPECTION_AUTHORIZED",
    "PDF_IMAGE_SCREENSHOT_METADATA_INSPECTION_AUTHORIZED",
    "METADATA_ACQUISITION_AUTHORIZED",
    "REAL_PRIVATE_RUN_AUTHORIZED",
    "BLOCKER_RESOLVED",
    "DEPENDENCY_CLOSED",
    "SECURITY_FINDING_CREATED",
    "VULNERABILITY_FINDING_CREATED",
    "SEVERITY_ASSIGNED",
    "REMEDIATION_RECOMMENDED",
    "REMEDIATION_IMPLEMENTED",
  ]);
});
