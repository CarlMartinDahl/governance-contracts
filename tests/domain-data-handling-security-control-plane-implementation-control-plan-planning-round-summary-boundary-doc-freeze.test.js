import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const DOC_PATH =
  "docs/DOMAIN_CONTRACTS_DATA_HANDLING_SECURITY_CONTROL_PLANE_IMPLEMENTATION_CONTROL_PLAN_PLANNING_ROUND_SUMMARY_BOUNDARY_v1.md";
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

const matrix = sectionBetween("## Planning-Layer Summary Matrix", "## Control-Surface Summary");
const recommendations = sectionBetween("## Recommended Next Posture");

test("boundary doc exists", () => {
  assert.equal(existsSync(DOC_PATH), true);
});

test("identity/status tokens exist", () => {
  assertIncludesAll([
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_IMPLEMENTATION_CONTROL_PLAN_PLANNING_ROUND_SUMMARY_BOUNDARY",
    "DOCS_ONLY",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_IMPLEMENTATION_CONTROL_PLAN_PLANNING_ROUND_SUMMARY_ONLY",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_PLANNING_ROUND_SUMMARY_PARTIAL_GAP_CONTEXT",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_PLANNING_ROUND_SUMMARY_NOT_IMPLEMENTATION_READINESS_AUTHORIZATION",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_PLANNING_ROUND_SUMMARY_NOT_IMPLEMENTATION",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_PLANNING_ROUND_SUMMARY_NOT_RUNTIME_READY",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_PLANNING_ROUND_SUMMARY_NOT_RUNTIME_BEHAVIOR",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_PLANNING_ROUND_SUMMARY_NOT_RUNTIME_API_SCHEMA_PACKAGE_BEHAVIOR_CHANGE",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_PLANNING_ROUND_SUMMARY_NOT_DATA_HANDLING_IMPLEMENTATION",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_PLANNING_ROUND_SUMMARY_NOT_SECURITY_CONTROL_IMPLEMENTATION",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_PLANNING_ROUND_SUMMARY_NOT_CONTROL_PLANE_IMPLEMENTATION",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_PLANNING_ROUND_SUMMARY_NOT_RETENTION_IMPLEMENTATION",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_PLANNING_ROUND_SUMMARY_NOT_DELETION_IMPLEMENTATION",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_PLANNING_ROUND_SUMMARY_NOT_ENCRYPTION_IMPLEMENTATION",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_PLANNING_ROUND_SUMMARY_NOT_AUDIT_ACCESS_LOG_IMPLEMENTATION",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_PLANNING_ROUND_SUMMARY_NOT_EVENT_TAXONOMY_RUNTIME_CODE",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_PLANNING_ROUND_SUMMARY_NOT_LOG_SCHEMA",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_PLANNING_ROUND_SUMMARY_NOT_LOG_STORAGE",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_PLANNING_ROUND_SUMMARY_NOT_ROLE_PERMISSION_IMPLEMENTATION",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_PLANNING_ROUND_SUMMARY_NOT_RBAC_ACCESS_CONTROL_IMPLEMENTATION",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_PLANNING_ROUND_SUMMARY_NOT_ADMIN_SUPPORT_IMPLEMENTATION",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_PLANNING_ROUND_SUMMARY_NOT_RAW_MATERIAL_ROUTING_IMPLEMENTATION",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_PLANNING_ROUND_SUMMARY_NOT_THIRD_PARTY_ROUTING_IMPLEMENTATION",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_PLANNING_ROUND_SUMMARY_NOT_THIRD_PARTY_ROUTING_AUTHORIZATION",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_PLANNING_ROUND_SUMMARY_NOT_PROVIDER_INTEGRATION",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_PLANNING_ROUND_SUMMARY_NOT_PROVIDER_REGISTRY",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_PLANNING_ROUND_SUMMARY_NOT_PROVIDER_STATUS_IMPLEMENTATION",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_PLANNING_ROUND_SUMMARY_NOT_DATA_ROUTING_MAP_IMPLEMENTATION",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_PLANNING_ROUND_SUMMARY_NOT_TOKEN_URL_SECRET_HANDLING_IMPLEMENTATION",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_PLANNING_ROUND_SUMMARY_NOT_GLOBAL_ACCESS_CONTROL_THREAT_MODEL_CLOSURE",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_PLANNING_ROUND_SUMMARY_NOT_RUNTIME_GATE_IMPLEMENTATION",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_PLANNING_ROUND_SUMMARY_NOT_RUNTIME_GATE_INVENTORY_AS_IMPLEMENTATION",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_PLANNING_ROUND_SUMMARY_NOT_VALIDATOR_DISPATCH",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_PLANNING_ROUND_SUMMARY_NOT_REGISTRY_LOOKUP",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_PLANNING_ROUND_SUMMARY_NOT_SCHEMA_VALIDATOR_ENFORCEMENT",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_PLANNING_ROUND_SUMMARY_NOT_WORKFLOW_ENFORCEMENT",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_PLANNING_ROUND_SUMMARY_NOT_CI_EVIDENCE_CREATION",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_PLANNING_ROUND_SUMMARY_NOT_RELEASE_APPROVAL",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_PLANNING_ROUND_SUMMARY_NOT_PRODUCT_CANDIDATE",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_PLANNING_ROUND_SUMMARY_NOT_EXTERNAL_USE_AUTHORIZATION",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_PLANNING_ROUND_SUMMARY_NOT_DELIVERY_TO_EXTERNAL_REVIEWER",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_PLANNING_ROUND_SUMMARY_NOT_PACKET_APPROVAL",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_PLANNING_ROUND_SUMMARY_NOT_BLOCKER_RESOLUTION",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_PLANNING_ROUND_SUMMARY_NOT_DEPENDENCY_CLOSURE",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_PLANNING_ROUND_SUMMARY_RUNTIME_GATE_INVENTORY_NOT_SELECTED",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_PLANNING_ROUND_SUMMARY_CONTINUED_PAUSE",
  ]);
});

test("purpose exists", () => {
  assertIncludesAll([
    "This boundary freezes the completed data-handling/security/control-plane implementation control plan planning round as DOCS_ONLY summary/context only.",
    "It summarizes the read-only entry-candidate review, the DOCS_ONLY entry-candidate scope boundary, the DOCS_ONLY status/gap boundary, the DOCS_ONLY evidence/closure-plan boundary, and the output-only planning-round status lock.",
    "It preserves partial/gap posture.",
    "It is non-authorizing.",
    "It does not select runtime-gate inventory.",
    "Planning-round summary does not mean implementation-readiness, implementation, evidence existence, blocker closure, or dependency closure.",
  ]);
});

test("source hierarchy exists", () => {
  assertIncludesAll([
    "LIVE_REPO_EVIDENCE_WINS",
    "TRACKED_REPO_EVIDENCE_CONTROLS_CURRENT_STATE",
    "NEW_THREAD_HANDOFF_FILE_IS_CONTEXT_ONLY",
    "IMPLEMENTATION_READINESS_ENTRY_CRITERIA_BOUNDARY_CONTROLS_ENTRY_RULES",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_EVIDENCE_CLOSURE_PLAN_BOUNDARY_CONTROLS_FUTURE_EVIDENCE_AND_CLOSURE_REQUIREMENTS",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_STATUS_GAP_BOUNDARY_CONTROLS_CURRENT_GAPS",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_ENTRY_CANDIDATE_SCOPE_BOUNDARY_CONTROLS_SCOPE",
    "ROADMAP_DEPENDENCIES_001_TO_007_BLOCKED_COMPLETION_SUMMARY_CONTROLS_CURRENT_ROADMAP_PAUSE",
    "DEPENDENCY_001_PLANNING_ROUND_SUMMARY_CONTROLS_RBAC_ADMIN_SUPPORT_CONTEXT",
    "DEPENDENCY_002_PLANNING_ROUND_SUMMARY_CONTROLS_AUDIT_ACCESS_LOG_CONTEXT",
    "DEPENDENCY_003_PLANNING_ROUND_SUMMARY_CONTROLS_RETENTION_DELETION_CONTEXT",
    "DEPENDENCY_004_PLANNING_ROUND_SUMMARY_CONTROLS_RAW_MATERIAL_ROUTING_CONTEXT",
    "DEPENDENCY_005_PLANNING_ROUND_SUMMARY_CONTROLS_THIRD_PARTY_PROVIDER_CONTEXT",
    "DEPENDENCY_006_PLANNING_ROUND_SUMMARY_CONTROLS_VALIDATOR_REGISTRY_RUNTIME_GATE_CONTEXT",
    "DEPENDENCY_007_PLANNING_ROUND_SUMMARY_CONTROLS_CI_RELEASE_PRODUCT_EXTERNAL_USE_CONTEXT",
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

test("current accepted state exists", () => {
  assertIncludesAll([
    "91eac45 docs(context): refresh new-thread handoff after data handling planning lock",
    "4a2df9a docs(domain): freeze data handling security control plane evidence closure plan boundary",
    "NEW_THREAD_HANDOFF_REFRESHED_AFTER_DATA_HANDLING_SECURITY_CONTROL_PLANE_PLANNING_ROUND_STATUS_LOCK_AND_COMMITTED",
    "LOCAL_CONTEXT_REFRESHED_TO_91eac45_NEW_THREAD_HANDOFF_AFTER_DATA_HANDLING_SECURITY_CONTROL_PLANE_PLANNING_ROUND_STATUS_LOCK_NO_RUNTIME_CHANGE",
    "REVIEW_ONLY_NEW_THREAD_HANDOFF_REFRESH_AFTER_DATA_HANDLING_SECURITY_CONTROL_PLANE_PLANNING_ROUND_STATUS_LOCK_COMPLETED_NO_CHANGE",
    "NEW_THREAD_HANDOFF_REFRESH_AFTER_DATA_HANDLING_SECURITY_CONTROL_PLANE_PLANNING_ROUND_STATUS_LOCK_REVIEWED_AND_PAUSED_NO_CHANGE",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_IMPLEMENTATION_CONTROL_PLAN_EVIDENCE_AND_CLOSURE_PLAN_BOUNDARY_DOCS_ONLY_FROZEN_AND_COMMITTED",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_IMPLEMENTATION_CONTROL_PLAN_EVIDENCE_AND_CLOSURE_PLAN_BOUNDARY_REVIEWED_AND_PAUSED_NO_CHANGE",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_IMPLEMENTATION_CONTROL_PLAN_STATUS_GAP_BOUNDARY_REVIEWED_AND_PAUSED_NO_CHANGE",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_IMPLEMENTATION_CONTROL_PLAN_ENTRY_CANDIDATE_SCOPE_BOUNDARY_REVIEWED_AND_PAUSED_NO_CHANGE",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_IMPLEMENTATION_CONTROL_PLAN_PLANNING_ROUND_STATUS_LOCKED_PARTIAL_GAP_NON_AUTHORIZING_AND_PAUSED_NO_CHANGE",
    "COMBINED_READ_ONLY_DATA_HANDLING_SECURITY_CONTROL_PLANE_EVIDENCE_CLOSURE_PLAN_PAUSE_AND_PLANNING_ROUND_STATUS_LOCK_COMPLETED_NO_CHANGE",
    "The current safe posture remains continued pause.",
  ]);
});

test("planning-layer summary matrix exists and all DHC-PLANNING rows exist", () => {
  assertIncludesAll([
    "planning layer",
    "current status",
    "evidence level",
    "blocker posture",
    "implementation posture",
    "authorization posture",
    "closure posture",
    "what remains non-authorized",
    "Every row preserves DOCS_ONLY or read-only/output-only as applicable, partial/gap where applicable, non-authorizing status, no implementation-readiness authorization, no implementation, no runtime/API/schema/package behavior change, no CI evidence, no release approval, no product candidate, no external-use authorization, no blocker resolution, no dependency closure, and continued pause.",
    "DHC-PLANNING-001 read-only entry-candidate review",
    "DHC-PLANNING-002 DOCS_ONLY entry-candidate scope boundary",
    "DHC-PLANNING-003 DOCS_ONLY status/gap boundary",
    "DHC-PLANNING-004 DOCS_ONLY evidence/closure-plan boundary",
    "DHC-PLANNING-005 output-only planning-round status lock",
    "DHC-PLANNING-006 planning-round summary boundary",
  ], matrix);
});

test("control-surface summary exists", () => {
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
    "access control beyond route/case/capability",
    "complete global access-control threat model",
    "raw-material routing",
    "third-party model/API status",
    "provider registry/status",
    "provider data-routing map",
    "provider retention/deletion posture",
    "provider auditability posture",
    "provider token/URL/secret handling",
    "validator/registry/runtime-gate sequencing",
    "local logs not CI evidence",
    "local logs not packet components",
    "no-raw/no-private/no-source-locator/no-token/no-URL posture",
    "implementation evidence",
    "test evidence",
    "CI evidence if claimed",
    "closure criteria",
    "non-authorization boundary",
    "Every surface below remains partial/gap, future-evidence-only, non-authorizing, or unresolved as applicable:",
  ]);
});

test("required blocker summary exists", () => {
  assertIncludesAll([
    "retention remains not implemented",
    "deletion remains not implemented",
    "encryption remains not implemented",
    "audit/access-log remains not implemented",
    "event taxonomy runtime code remains absent",
    "log schema remains absent",
    "log storage remains absent",
    "role permission/RBAC implementation remains absent",
    "admin/support implementation remains absent",
    "raw-material routing remains not implemented",
    "third-party routing remains unauthorized",
    "provider integration remains absent",
    "provider registry/status remains absent",
    "provider data-routing map remains absent",
    "token/URL/secret handling remains unresolved",
    "complete global access-control threat model remains not closed",
    "runtime gate implementation remains absent",
    "runtime gate inventory remains not implementation",
    "validator dispatch remains not created",
    "registry/lookup remains not created",
    "CI evidence remains not created",
    "local logs remain not CI evidence",
    "local logs remain not packet components",
    "tests remain tested-scenario evidence, not runtime certainty",
    "green tests are not release approval",
    "product candidate remains none",
    "external-use remains unauthorized",
    "human/professional review remains release gate",
    "DOCS_ONLY boundaries are not runtime enforcement",
    "route/case/capability evidence is not full RBAC/access-control",
    "route/case/capability evidence is not admin/support access-control",
    "route/case/capability evidence is not global authorization model",
  ]);
});

test("evidence limits exist", () => {
  assertIncludesAll([
    "tests are tested-scenario evidence, not runtime certainty",
    "green tests are not release approval",
    "npm test/lint/build history is not release approval",
    "local logs are not CI evidence",
    "local logs are not packet components",
    "generated PDFs are not repo evidence unless separately approved",
    "generated PDFs are not packet components unless separately approved",
    "DOCS_ONLY boundaries are not runtime enforcement",
    "prompt/workflow controls are not runtime enforcement",
    "route/case/capability evidence is not full RBAC/access-control",
    "route/case/capability evidence is not admin/support access-control",
    "route/case/capability evidence is not global authorization model",
    "runtime gate inventory is not implementation",
    "CI evidence requires separate explicit CI evidence creation",
    "runtime certification requires separate explicit evidence",
    "technical sign-off requires separate explicit evidence",
    "External Reviewer approval requires separate explicit evidence",
    "product candidate requires separate explicit selection",
    "external-use requires separate explicit authorization",
    "delivery to External Reviewer requires separate explicit authorization",
    "packet approval requires separate explicit authorization",
    "digest/dossier context is not product readiness",
    "consolidated dossier context is not runtime certification",
    "human/professional review remains release gate",
    "continued pause is valid",
  ]);
});

test("negative authorization checks exist", () => {
  assertIncludesAll([
    "This boundary creates no authorization for implementation-readiness.",
    "This boundary creates no authorization for implementation.",
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
    "This boundary creates no runtime gate inventory as implementation.",
    "This boundary creates no validator dispatch.",
    "This boundary creates no registry/lookup.",
    "This boundary creates no schema/validator enforcement.",
    "This boundary creates no workflow enforcement.",
    "This boundary creates no CI evidence.",
    "This boundary creates no CI certification.",
    "This boundary creates no local log promotion to CI evidence.",
    "This boundary creates no local log promotion to packet component.",
    "This boundary creates no release approval.",
    "This boundary creates no runtime certification.",
    "This boundary creates no technical sign-off.",
    "This boundary creates no External Reviewer approval.",
    "This boundary creates no product readiness.",
    "This boundary creates no product candidate.",
    "This boundary creates no external-use authorization.",
    "This boundary creates no delivery to External Reviewer.",
    "This boundary creates no packet approval.",
    "This boundary creates no packet component approval.",
    "This boundary creates no final delivery decision.",
    "This boundary creates no PDF packet.",
    "This boundary creates no archive/ZIP.",
    "This boundary creates no generated PDF as repo evidence.",
    "This boundary creates no generated PDF as packet component.",
    "This boundary creates no raw/private/source inspection.",
    "This boundary creates no source package inspection.",
    "This boundary creates no PDF/image/screenshot/metadata inspection.",
    "This boundary creates no metadata acquisition.",
    "This boundary creates no real private run.",
    "This boundary creates no blocker resolution.",
    "This boundary creates no dependency closure.",
    "This boundary creates no finding.",
    "This boundary assigns no severity.",
    "This boundary recommends no remediation.",
    "This boundary creates no local log file inspection.",
    "This boundary creates no delivery package generation.",
    "This boundary creates no runtime-gate inventory selection.",
  ]);
});

test("no-overclaim rules exist", () => {
  assertIncludesAll([
    "planning-round summary does not mean implementation-readiness authorization",
    "planning-round summary does not mean implementation",
    "planning-round summary does not mean runtime readiness",
    "planning-round summary does not mean runtime/API/schema/package behavior change",
    "planning-round summary does not mean evidence exists",
    "planning-round summary does not mean closure",
    "planning-round summary does not mean blocker resolution",
    "planning-round status lock does not mean closure",
    "evidence plan does not mean evidence exists",
    "closure plan does not mean closure",
    "closure criteria do not mean closure",
    "scope boundary does not mean status/gap closure",
    "status/gap boundary does not mean implementation",
    "retention planning row does not mean retention implementation",
    "deletion planning row does not mean deletion implementation",
    "encryption planning row does not mean encryption implementation",
    "audit/access-log planning row does not mean audit/access-log implementation",
    "RBAC planning row does not mean RBAC implementation",
    "admin/support planning row does not mean admin/support implementation",
    "raw-material routing planning row does not mean raw-material routing implementation",
    "third-party/provider planning row does not mean third-party routing authorization",
    "provider registry/status planning row does not mean provider registry/status exists",
    "data-routing map planning row does not mean data-routing map exists",
    "token/URL/secret planning row does not mean token/URL/secret handling exists",
    "global access-control threat-model planning row does not mean threat model is closed",
    "runtime gate sequencing row does not mean runtime-gate inventory is selected",
    "local log row does not mean local logs are CI evidence",
    "local log row does not mean local logs are packet components",
    "required implementation evidence does not mean implementation evidence exists",
    "required test evidence does not mean test evidence exists",
    "required CI evidence does not mean CI evidence exists",
    "continued pause remains valid",
    "human/professional review remains release gate",
  ]);
});

test("recommended next posture is review-only or continued pause only", () => {
  assertIncludesAll([
    "REVIEW_ONLY_DATA_HANDLING_SECURITY_CONTROL_PLANE_IMPLEMENTATION_CONTROL_PLAN_PLANNING_ROUND_SUMMARY_BOUNDARY",
    "REVIEW_ONLY_POST_DATA_HANDLING_SECURITY_CONTROL_PLANE_IMPLEMENTATION_CONTROL_PLAN_PLANNING_ROUND_SUMMARY_NEXT_SAFE_POSTURE_SELECTION",
    "continued pause",
    "None are authorized by this boundary.",
  ], recommendations);
  assert.doesNotMatch(recommendations, /RUNTIME_GATE_INVENTORY/i);
  assert.doesNotMatch(recommendations, /IMPLEMENTATION_READINESS_AUTHORIZATION/i);
});

test("forbidden exact overclaiming tokens are absent", () => {
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
    "RUNTIME_GATE_INVENTORY_SELECTED",
    "RUNTIME_GATE_INVENTORY_AS_IMPLEMENTATION_CREATED",
    "VALIDATOR_DISPATCH_CREATED",
    "REGISTRY_LOOKUP_CREATED",
    "SCHEMA_VALIDATOR_ENFORCEMENT_CREATED",
    "WORKFLOW_ENFORCEMENT_CREATED",
    "STATUS_GAP_AUTHORIZES_IMPLEMENTATION",
    "EVIDENCE_PLAN_AUTHORIZES_IMPLEMENTATION",
    "CLOSURE_PLAN_CREATES_CLOSURE",
    "PLANNING_ROUND_SUMMARY_AUTHORIZES_IMPLEMENTATION",
    "PLANNING_ROUND_SUMMARY_AUTHORIZES_RUNTIME",
    "PLANNING_ROUND_SUMMARY_CREATES_CLOSURE",
    "IMPLEMENTATION_EVIDENCE_EXISTS",
    "TEST_EVIDENCE_EXISTS",
    "CI_EVIDENCE_EXISTS",
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
