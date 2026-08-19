import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const DOC_PATH =
  "docs/DOMAIN_CONTRACTS_RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_PLANNING_ROUND_SUMMARY_BOUNDARY_v1.md";
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

const matrix = sectionBetween(
  "## Planning-Layer Summary Matrix",
  "## Runtime-Gate Planning-Surface Summary",
);
const surfaces = sectionBetween(
  "## Runtime-Gate Planning-Surface Summary",
  "## Required Blocker Summary",
);
const recommendations = sectionBetween("## Recommended Next Posture");

test("boundary doc exists", () => {
  assert.equal(existsSync(DOC_PATH), true);
});

test("identity/status tokens exist", () => {
  assertIncludesAll([
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_PLANNING_ROUND_SUMMARY_BOUNDARY",
    "DOCS_ONLY",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_PLANNING_ROUND_SUMMARY_ONLY",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_PLANNING_ROUND_SUMMARY_PARTIAL_GAP_CONTEXT",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_PLANNING_ROUND_SUMMARY_NOT_IMPLEMENTATION_READINESS_AUTHORIZATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_PLANNING_ROUND_SUMMARY_NOT_IMPLEMENTATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_PLANNING_ROUND_SUMMARY_NOT_RUNTIME_READY",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_PLANNING_ROUND_SUMMARY_NOT_RUNTIME_BEHAVIOR",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_PLANNING_ROUND_SUMMARY_NOT_RUNTIME_API_SCHEMA_PACKAGE_BEHAVIOR_CHANGE",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_PLANNING_ROUND_SUMMARY_NOT_RUNTIME_GATE_IMPLEMENTATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_PLANNING_ROUND_SUMMARY_NOT_RUNTIME_GATE_INVENTORY_AS_IMPLEMENTATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_PLANNING_ROUND_SUMMARY_NOT_VALIDATOR_DISPATCH",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_PLANNING_ROUND_SUMMARY_NOT_REGISTRY_LOOKUP",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_PLANNING_ROUND_SUMMARY_NOT_SCHEMA_VALIDATOR_ENFORCEMENT",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_PLANNING_ROUND_SUMMARY_NOT_WORKFLOW_ENFORCEMENT",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_PLANNING_ROUND_SUMMARY_NOT_DELIVERY_GATE_IMPLEMENTATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_PLANNING_ROUND_SUMMARY_NOT_FINAL_DECISION_GATE_IMPLEMENTATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_PLANNING_ROUND_SUMMARY_NOT_PACKET_COMPONENT_APPROVAL_GATE_IMPLEMENTATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_PLANNING_ROUND_SUMMARY_NOT_GENERATED_PDF_HANDLING_GATE_IMPLEMENTATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_PLANNING_ROUND_SUMMARY_NOT_LOCAL_LOG_HANDLING_GATE_IMPLEMENTATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_PLANNING_ROUND_SUMMARY_NOT_PRODUCT_CANDIDATE_GATE_IMPLEMENTATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_PLANNING_ROUND_SUMMARY_NOT_EXTERNAL_USE_GATE_IMPLEMENTATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_PLANNING_ROUND_SUMMARY_NOT_DATA_HANDLING_IMPLEMENTATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_PLANNING_ROUND_SUMMARY_NOT_SECURITY_CONTROL_IMPLEMENTATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_PLANNING_ROUND_SUMMARY_NOT_CONTROL_PLANE_IMPLEMENTATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_PLANNING_ROUND_SUMMARY_NOT_RETENTION_IMPLEMENTATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_PLANNING_ROUND_SUMMARY_NOT_DELETION_IMPLEMENTATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_PLANNING_ROUND_SUMMARY_NOT_ENCRYPTION_IMPLEMENTATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_PLANNING_ROUND_SUMMARY_NOT_AUDIT_ACCESS_LOG_IMPLEMENTATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_PLANNING_ROUND_SUMMARY_NOT_EVENT_TAXONOMY_RUNTIME_CODE",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_PLANNING_ROUND_SUMMARY_NOT_LOG_SCHEMA",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_PLANNING_ROUND_SUMMARY_NOT_LOG_STORAGE",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_PLANNING_ROUND_SUMMARY_NOT_ROLE_PERMISSION_IMPLEMENTATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_PLANNING_ROUND_SUMMARY_NOT_RBAC_ACCESS_CONTROL_IMPLEMENTATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_PLANNING_ROUND_SUMMARY_NOT_ADMIN_SUPPORT_IMPLEMENTATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_PLANNING_ROUND_SUMMARY_NOT_RAW_MATERIAL_ROUTING_IMPLEMENTATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_PLANNING_ROUND_SUMMARY_NOT_THIRD_PARTY_ROUTING_IMPLEMENTATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_PLANNING_ROUND_SUMMARY_NOT_THIRD_PARTY_ROUTING_AUTHORIZATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_PLANNING_ROUND_SUMMARY_NOT_PROVIDER_INTEGRATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_PLANNING_ROUND_SUMMARY_NOT_PROVIDER_REGISTRY",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_PLANNING_ROUND_SUMMARY_NOT_PROVIDER_STATUS_IMPLEMENTATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_PLANNING_ROUND_SUMMARY_NOT_DATA_ROUTING_MAP_IMPLEMENTATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_PLANNING_ROUND_SUMMARY_NOT_TOKEN_URL_SECRET_HANDLING_IMPLEMENTATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_PLANNING_ROUND_SUMMARY_NOT_GLOBAL_ACCESS_CONTROL_THREAT_MODEL_CLOSURE",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_PLANNING_ROUND_SUMMARY_NOT_CI_EVIDENCE_CREATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_PLANNING_ROUND_SUMMARY_NOT_RELEASE_APPROVAL",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_PLANNING_ROUND_SUMMARY_NOT_PRODUCT_CANDIDATE",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_PLANNING_ROUND_SUMMARY_NOT_EXTERNAL_USE_AUTHORIZATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_PLANNING_ROUND_SUMMARY_NOT_DELIVERY_TO_EXTERNAL_REVIEWER",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_PLANNING_ROUND_SUMMARY_NOT_PACKET_APPROVAL",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_PLANNING_ROUND_SUMMARY_NOT_BLOCKER_RESOLUTION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_PLANNING_ROUND_SUMMARY_NOT_DEPENDENCY_CLOSURE",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_PLANNING_ROUND_SUMMARY_CONTINUED_PAUSE",
  ]);
});

test("purpose exists", () => {
  assertIncludesAll([
    "This boundary freezes the completed runtime-gate implementation candidate inventory planning round as DOCS_ONLY summary/context only.",
    "It summarizes entry-candidate review, entry-candidate scope boundary, status/gap review, status/gap boundary, evidence/closure-plan boundary, and planning-round status lock.",
    "It is partial/gap, non-authorizing, and creates no implementation",
    "Planning-round summary does not mean implementation-readiness, implementation, evidence existence, blocker closure, runtime readiness, or dependency closure.",
    "Runtime-gate inventory remains not implementation.",
  ]);
});

test("source hierarchy exists", () => {
  assertIncludesAll([
    "LIVE_REPO_EVIDENCE_WINS",
    "TRACKED_REPO_EVIDENCE_CONTROLS_CURRENT_STATE",
    "NEW_THREAD_HANDOFF_FILE_IS_CONTEXT_ONLY",
    "IMPLEMENTATION_READINESS_ENTRY_CRITERIA_BOUNDARY_CONTROLS_ENTRY_RULES",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_EVIDENCE_CLOSURE_PLAN_BOUNDARY_CONTROLS_FUTURE_EVIDENCE_AND_CLOSURE_REQUIREMENTS",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_STATUS_GAP_BOUNDARY_CONTROLS_CURRENT_GAPS",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_ENTRY_CANDIDATE_SCOPE_BOUNDARY_CONTROLS_SCOPE",
    "RUNTIME_GATE_CANDIDATE_STATUS_INVENTORY_BOUNDARY_AFTER_RBAC_GATE_STATUS_CONTROLS_PRIOR_RUNTIME_GATE_CONTEXT",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_PLANNING_ROUND_SUMMARY_CONTROLS_DHC_CONTEXT",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_EVIDENCE_CLOSURE_PLAN_BOUNDARY_CONTROLS_DHC_FUTURE_EVIDENCE",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_STATUS_GAP_BOUNDARY_CONTROLS_DHC_GAPS",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_ENTRY_CANDIDATE_SCOPE_BOUNDARY_CONTROLS_DHC_SCOPE",
    "RBAC_GATE_CANDIDATE_STATUS_BOUNDARY_CONTROLS_RBAC_GATE_CONTEXT",
    "RBAC_ROLE_PERMISSION_BOUNDARY_DOCS_CONTROL_ACCESS_CONTEXT",
    "AUDIT_ACCESS_LOG_BOUNDARY_DOCS_CONTROL_AUDIT_CONTEXT",
    "RETENTION_DELETION_CONTROL_SPECIFICATION_BOUNDARY_CONTROLS_RETENTION_CONTEXT",
    "RAW_MATERIAL_ROUTING_BOUNDARY_DOCS_CONTROL_RAW_ROUTING_CONTEXT",
    "THIRD_PARTY_PROVIDER_BOUNDARY_DOCS_CONTROL_PROVIDER_CONTEXT",
    "CI_RELEASE_PRODUCT_EXTERNAL_USE_BOUNDARY_DOCS_CONTROL_RELEASE_CONTEXT",
    "EXTERNAL_REVIEW_REQUIREMENTS_USED_AS_ADVISORY_CONTEXT_ONLY",
    "STATIC_INSPECTION_RESULTS_ARE_REVIEW_CONTEXT_ONLY",
    "OLD_HANDOFF_FILES_ARE_HISTORICAL_CONTEXT_ONLY",
    "STALE_HANDOFF_MUST_NOT_SELECT_REOPEN_OR_CLOSE_SLICE",
  ]);
});

test("current accepted state exists", () => {
  assertIncludesAll([
    "5baffc6 docs(domain): freeze runtime gate implementation candidate inventory evidence closure plan boundary",
    "671a75f docs(domain): freeze runtime gate implementation candidate inventory status gap boundary",
    "cddbb75 docs(domain): freeze runtime gate implementation candidate inventory scope boundary",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_EVIDENCE_AND_CLOSURE_PLAN_BOUNDARY_DOCS_ONLY_FROZEN_AND_COMMITTED",
    "LOCAL_CONTEXT_REFRESHED_TO_5baffc6_RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_EVIDENCE_AND_CLOSURE_PLAN_BOUNDARY_DOCS_ONLY_NO_RUNTIME_CHANGE",
    "REVIEW_ONLY_RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_EVIDENCE_AND_CLOSURE_PLAN_BOUNDARY_COMPLETED_NO_CHANGE",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_EVIDENCE_AND_CLOSURE_PLAN_BOUNDARY_REVIEWED_AND_PAUSED_NO_CHANGE",
    "NEXT_PHASE_SELECTED_AFTER_RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_EVIDENCE_CLOSURE_PLAN_PAUSE_NO_CHANGE",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_PLANNING_ROUND_STATUS_LOCKED_PARTIAL_GAP_NON_AUTHORIZING_AND_PAUSED_NO_CHANGE",
    "COMBINED_READ_ONLY_RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_EVIDENCE_CLOSURE_PLAN_PAUSE_AND_PLANNING_ROUND_STATUS_LOCK_COMPLETED_NO_CHANGE",
    "The current safe posture remains continued pause.",
  ]);
});

test("planning-layer summary matrix exists and all RGI-PLANNING rows exist", () => {
  assertIncludesAll([
    "planning layer",
    "current status",
    "evidence level",
    "blocker posture",
    "implementation posture",
    "authorization posture",
    "closure posture",
    "what remains non-authorized",
    "Every row preserves DOCS_ONLY, PROVE_ONLY, read-only, or output-only as applicable",
    "no runtime-gate implementation",
    "runtime-gate inventory not as implementation",
    "RGI-PLANNING-001 read-only entry-candidate review",
    "RGI-PLANNING-002 DOCS_ONLY entry-candidate scope boundary",
    "RGI-PLANNING-003 PROVE_ONLY status/gap review",
    "RGI-PLANNING-004 DOCS_ONLY status/gap boundary",
    "RGI-PLANNING-005 DOCS_ONLY evidence/closure-plan boundary",
    "RGI-PLANNING-006 output-only planning-round status lock",
    "RGI-PLANNING-007 planning-round summary boundary",
  ], matrix);
});

test("runtime-gate planning-surface summary exists", () => {
  assertIncludesAll([
    "Every surface remains partial/gap, future-evidence-only, non-authorizing, blocked, unresolved, or not implemented as applicable.",
    "runtime gate inventory as not implementation",
    "validator dispatch",
    "registry/lookup",
    "runtime gate candidates",
    "schema/validator gate candidates",
    "workflow/prompt gate candidates",
    "human/professional review gates",
    "delivery/final-decision gates",
    "packet component approval gates",
    "generated PDF handling gates",
    "local log handling gates",
    "product-candidate gate",
    "external-use gate",
    "retention/deletion dependency",
    "audit/access-log dependency",
    "RBAC/admin-support dependency",
    "raw-material routing dependency",
    "third-party/provider routing dependency",
    "DHC evidence/closure requirements",
    "no-raw/no-private/no-source-locator/no-token/no-URL posture",
    "implementation evidence",
    "test evidence",
    "CI evidence if claimed",
    "closure criteria",
    "non-authorization boundary",
  ], surfaces);
});

test("required blocker summary exists", () => {
  assertIncludesAll([
    "runtime gate inventory remains not implementation",
    "runtime gate candidate inventory remains not runtime gate implementation",
    "validator dispatch remains not created",
    "registry/lookup remains not created",
    "schema/validator enforcement remains absent",
    "workflow enforcement remains absent",
    "delivery/final-decision gates remain not implemented",
    "packet component approval gates remain not implemented",
    "generated PDF handling gates remain not implemented",
    "local log handling gates remain not implemented",
    "product-candidate gate remains not implemented",
    "external-use gate remains not implemented",
    "retention/deletion dependency remains unresolved",
    "audit/access-log dependency remains unresolved",
    "RBAC/admin-support dependency remains unresolved",
    "raw-material routing dependency remains unresolved",
    "third-party/provider routing dependency remains unresolved/unauthorized",
    "DHC evidence/closure requirements remain future-only",
    "no-raw/no-private/no-source-locator/no-token/no-URL posture remains preserved",
    "implementation evidence remains absent",
    "test evidence remains partial/tested-scenario only",
    "CI evidence remains not created",
    "local logs remain not CI evidence",
    "local logs remain not packet components",
    "tests remain tested-scenario evidence, not runtime certainty",
    "green tests are not release approval",
    "product candidate remains none",
    "external-use remains unauthorized",
    "human/professional review remains release gate",
    "closure criteria are not met and do not mean closure",
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
    "runtime gate candidate inventory is not runtime gate implementation",
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
    "This boundary creates no runtime gate implementation.",
    "This boundary creates no runtime gate inventory as implementation.",
    "This boundary creates no runtime gate inventory selection as implementation.",
    "This boundary creates no validator dispatch.",
    "This boundary creates no registry/lookup.",
    "This boundary creates no schema/validator enforcement.",
    "This boundary creates no workflow enforcement.",
    "This boundary creates no delivery gate implementation.",
    "This boundary creates no final decision gate implementation.",
    "This boundary creates no packet component approval gate implementation.",
    "This boundary creates no generated PDF handling gate implementation.",
    "This boundary creates no local log handling gate implementation.",
    "This boundary creates no product-candidate gate implementation.",
    "This boundary creates no external-use gate implementation.",
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
  ]);
});

test("no-overclaim rules exist", () => {
  assertIncludesAll([
    "planning-round summary boundary does not mean implementation-readiness authorization",
    "planning-round summary boundary does not mean implementation",
    "planning-round summary boundary does not mean runtime readiness",
    "planning-round summary boundary does not mean runtime/API/schema/package behavior change",
    "planning-round summary boundary does not mean runtime gate implementation",
    "planning-round summary boundary does not mean runtime gate inventory as implementation",
    "planning-round summary boundary does not mean validator dispatch",
    "planning-round summary boundary does not mean registry/lookup",
    "planning-round summary boundary does not mean schema/validator enforcement",
    "planning-round summary boundary does not mean workflow enforcement",
    "planning-round summary boundary does not mean blocker resolution",
    "planning-round summary boundary does not mean dependency closure",
    "planning-round status lock does not mean closure",
    "evidence plan does not mean evidence exists",
    "closure plan does not mean closure",
    "closure criteria do not mean closure",
    "status/gap boundary does not mean implementation",
    "runtime gate inventory row does not mean runtime gate inventory as implementation",
    "runtime gate candidate row does not mean runtime gate implementation",
    "validator dispatch row does not mean validator dispatch exists",
    "registry/lookup row does not mean registry/lookup exists",
    "schema/validator gate row does not mean schema/validator enforcement exists",
    "workflow/prompt gate row does not mean workflow enforcement exists",
    "delivery/final-decision gate row does not mean delivery or final decision exists",
    "packet component approval gate row does not mean packet component approval exists",
    "generated PDF handling row does not mean generated PDF is repo evidence or packet component",
    "local log handling row does not mean local logs are CI evidence or packet components",
    "product-candidate gate row does not mean product candidate selected",
    "external-use gate row does not mean external-use authorized",
    "retention/deletion dependency row does not mean retention/deletion implementation",
    "audit/access-log dependency row does not mean audit/access-log implementation",
    "RBAC/admin-support dependency row does not mean RBAC/admin-support implementation",
    "raw-material routing dependency row does not mean raw-material routing implementation",
    "third-party/provider dependency row does not mean third-party routing authorization",
    "DHC evidence/closure requirements row does not mean DHC evidence exists or closure exists",
    "required implementation evidence does not mean implementation evidence exists",
    "required test evidence does not mean test evidence exists",
    "required CI evidence does not mean CI evidence exists",
    "continued pause remains valid",
    "human/professional review remains release gate",
  ]);
});

test("recommended next posture is review-only or continued pause only", () => {
  assertIncludesAll([
    "REVIEW_ONLY_RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_PLANNING_ROUND_SUMMARY_BOUNDARY",
    "REVIEW_ONLY_POST_RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_PLANNING_ROUND_SUMMARY_NEXT_SAFE_POSTURE_SELECTION",
    "continued pause",
  ], recommendations);
});

test("none are authorized by this boundary exists", () => {
  assertIncludesAll(["None are authorized by this boundary."], recommendations);
});

test("rejects exact overclaiming tokens", () => {
  assertDoesNotIncludeExactToken([
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_IMPLEMENTATION_READY",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_READY_FOR_IMPLEMENTATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_IMPLEMENTED",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_CLOSED",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_BLOCKER_RESOLVED",
    "RUNTIME_GATE_IMPLEMENTED",
    "RUNTIME_GATE_INVENTORY_IMPLEMENTED",
    "RUNTIME_GATE_INVENTORY_SELECTED_AS_IMPLEMENTATION",
    "RUNTIME_GATE_INVENTORY_AS_IMPLEMENTATION_CREATED",
    "RUNTIME_GATE_CANDIDATE_IMPLEMENTED",
    "VALIDATOR_DISPATCH_CREATED",
    "REGISTRY_LOOKUP_CREATED",
    "SCHEMA_VALIDATOR_ENFORCEMENT_CREATED",
    "WORKFLOW_ENFORCEMENT_CREATED",
    "DELIVERY_GATE_IMPLEMENTED",
    "FINAL_DECISION_GATE_IMPLEMENTED",
    "PACKET_COMPONENT_APPROVAL_GATE_IMPLEMENTED",
    "GENERATED_PDF_HANDLING_GATE_IMPLEMENTED",
    "LOCAL_LOG_HANDLING_GATE_IMPLEMENTED",
    "PRODUCT_CANDIDATE_GATE_IMPLEMENTED",
    "EXTERNAL_USE_GATE_IMPLEMENTED",
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
