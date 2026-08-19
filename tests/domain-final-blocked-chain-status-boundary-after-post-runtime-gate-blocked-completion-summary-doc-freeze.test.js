import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const DOC_PATH =
  "docs/DOMAIN_CONTRACTS_FINAL_BLOCKED_CHAIN_STATUS_BOUNDARY_AFTER_POST_RUNTIME_GATE_BLOCKED_COMPLETION_SUMMARY_v1.md";
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

const matrix = sectionBetween("## Final Blocked-Chain Status Matrix", "## Required Blocker Summary");
const recommendations = sectionBetween("## Recommended Next Posture");

test("boundary doc exists", () => {
  assert.equal(existsSync(DOC_PATH), true);
});

test("identity/status tokens exist", () => {
  assertIncludesAll([
    "FINAL_BLOCKED_CHAIN_STATUS_BOUNDARY_AFTER_POST_RUNTIME_GATE_BLOCKED_COMPLETION_SUMMARY",
    "DOCS_ONLY",
    "FINAL_BLOCKED_CHAIN_STATUS_AFTER_POST_RUNTIME_GATE_BLOCKED_COMPLETION_SUMMARY_ONLY",
    "FINAL_BLOCKED_CHAIN_STATUS_AFTER_POST_RUNTIME_GATE_BLOCKED_COMPLETION_SUMMARY_PARTIAL_GAP_CONTEXT",
    "FINAL_BLOCKED_CHAIN_STATUS_AFTER_POST_RUNTIME_GATE_BLOCKED_COMPLETION_SUMMARY_BLOCKED_CONTEXT",
    "FINAL_BLOCKED_CHAIN_STATUS_AFTER_POST_RUNTIME_GATE_BLOCKED_COMPLETION_SUMMARY_NOT_IMPLEMENTATION_READINESS_AUTHORIZATION",
    "FINAL_BLOCKED_CHAIN_STATUS_AFTER_POST_RUNTIME_GATE_BLOCKED_COMPLETION_SUMMARY_NOT_IMPLEMENTATION",
    "FINAL_BLOCKED_CHAIN_STATUS_AFTER_POST_RUNTIME_GATE_BLOCKED_COMPLETION_SUMMARY_NOT_RUNTIME_READY",
    "FINAL_BLOCKED_CHAIN_STATUS_AFTER_POST_RUNTIME_GATE_BLOCKED_COMPLETION_SUMMARY_NOT_RUNTIME_BEHAVIOR",
    "FINAL_BLOCKED_CHAIN_STATUS_AFTER_POST_RUNTIME_GATE_BLOCKED_COMPLETION_SUMMARY_NOT_RUNTIME_API_SCHEMA_PACKAGE_BEHAVIOR_CHANGE",
    "FINAL_BLOCKED_CHAIN_STATUS_AFTER_POST_RUNTIME_GATE_BLOCKED_COMPLETION_SUMMARY_NOT_RUNTIME_GATE_IMPLEMENTATION",
    "FINAL_BLOCKED_CHAIN_STATUS_AFTER_POST_RUNTIME_GATE_BLOCKED_COMPLETION_SUMMARY_NOT_RUNTIME_GATE_INVENTORY_AS_IMPLEMENTATION",
    "FINAL_BLOCKED_CHAIN_STATUS_AFTER_POST_RUNTIME_GATE_BLOCKED_COMPLETION_SUMMARY_NOT_VALIDATOR_DISPATCH",
    "FINAL_BLOCKED_CHAIN_STATUS_AFTER_POST_RUNTIME_GATE_BLOCKED_COMPLETION_SUMMARY_NOT_REGISTRY_LOOKUP",
    "FINAL_BLOCKED_CHAIN_STATUS_AFTER_POST_RUNTIME_GATE_BLOCKED_COMPLETION_SUMMARY_NOT_SCHEMA_VALIDATOR_ENFORCEMENT",
    "FINAL_BLOCKED_CHAIN_STATUS_AFTER_POST_RUNTIME_GATE_BLOCKED_COMPLETION_SUMMARY_NOT_WORKFLOW_ENFORCEMENT",
    "FINAL_BLOCKED_CHAIN_STATUS_AFTER_POST_RUNTIME_GATE_BLOCKED_COMPLETION_SUMMARY_NOT_CI_EVIDENCE_CREATION",
    "FINAL_BLOCKED_CHAIN_STATUS_AFTER_POST_RUNTIME_GATE_BLOCKED_COMPLETION_SUMMARY_NOT_RELEASE_APPROVAL",
    "FINAL_BLOCKED_CHAIN_STATUS_AFTER_POST_RUNTIME_GATE_BLOCKED_COMPLETION_SUMMARY_NOT_PRODUCT_CANDIDATE",
    "FINAL_BLOCKED_CHAIN_STATUS_AFTER_POST_RUNTIME_GATE_BLOCKED_COMPLETION_SUMMARY_NOT_EXTERNAL_USE_AUTHORIZATION",
    "FINAL_BLOCKED_CHAIN_STATUS_AFTER_POST_RUNTIME_GATE_BLOCKED_COMPLETION_SUMMARY_NOT_DELIVERY_TO_EXTERNAL_REVIEWER",
    "FINAL_BLOCKED_CHAIN_STATUS_AFTER_POST_RUNTIME_GATE_BLOCKED_COMPLETION_SUMMARY_NOT_PACKET_APPROVAL",
    "FINAL_BLOCKED_CHAIN_STATUS_AFTER_POST_RUNTIME_GATE_BLOCKED_COMPLETION_SUMMARY_NOT_BLOCKER_RESOLUTION",
    "FINAL_BLOCKED_CHAIN_STATUS_AFTER_POST_RUNTIME_GATE_BLOCKED_COMPLETION_SUMMARY_NOT_DEPENDENCY_CLOSURE",
    "FINAL_BLOCKED_CHAIN_STATUS_AFTER_POST_RUNTIME_GATE_BLOCKED_COMPLETION_SUMMARY_CONTINUED_PAUSE",
  ]);
});

test("purpose exists", () => {
  assertIncludesAll([
    "This boundary freezes the completed read-only final blocked-chain/status review as DOCS_ONLY summary/context only.",
    "It is partial/gap, blocked, non-authorizing, and creates no implementation",
    "Final blocked-chain status does not mean implementation-readiness, implementation, evidence existence, runtime readiness, product readiness, release readiness, external-use readiness, blocker closure, or dependency closure.",
    "Runtime-gate inventory remains not implementation.",
    "This is final only as a current blocked-chain status summary, not final as product, release, external-use, runtime, implementation-readiness, blocker closure, or dependency closure.",
  ]);
});

test("source hierarchy exists", () => {
  assertIncludesAll([
    "LIVE_REPO_EVIDENCE_WINS",
    "TRACKED_REPO_EVIDENCE_CONTROLS_CURRENT_STATE",
    "NEW_THREAD_HANDOFF_FILE_IS_CONTEXT_ONLY",
    "IMPLEMENTATION_READINESS_ENTRY_CRITERIA_BOUNDARY_CONTROLS_ENTRY_RULES",
    "POST_RUNTIME_GATE_BLOCKED_COMPLETION_SUMMARY_BOUNDARY_CONTROLS_CURRENT_BLOCKED_COMPLETION_CONTEXT",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_PLANNING_ROUND_SUMMARY_BOUNDARY_CONTROLS_RUNTIME_GATE_CONTEXT",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_PLANNING_ROUND_SUMMARY_CONTROLS_DHC_CONTEXT",
    "ROADMAP_DEPENDENCIES_001_TO_007_BLOCKED_COMPLETION_ROUND_SUMMARY_CONTROLS_DEPENDENCY_CONTEXT",
    "DEPENDENCY_001_RBAC_ADMIN_SUPPORT_PLANNING_SUMMARY_CONTROLS_D001_CONTEXT",
    "DEPENDENCY_002_AUDIT_ACCESS_LOG_PLANNING_SUMMARY_CONTROLS_D002_CONTEXT",
    "DEPENDENCY_003_RETENTION_DELETION_PLANNING_SUMMARY_CONTROLS_D003_CONTEXT",
    "DEPENDENCY_004_RAW_MATERIAL_ROUTING_PLANNING_SUMMARY_CONTROLS_D004_CONTEXT",
    "DEPENDENCY_005_THIRD_PARTY_ROUTING_PLANNING_SUMMARY_CONTROLS_D005_CONTEXT",
    "DEPENDENCY_006_VALIDATOR_REGISTRY_RUNTIME_GATE_PLANNING_SUMMARY_CONTROLS_D006_CONTEXT",
    "DEPENDENCY_007_CI_RELEASE_PRODUCT_EXTERNAL_USE_PLANNING_SUMMARY_CONTROLS_D007_CONTEXT",
    "RBAC_GATE_CANDIDATE_STATUS_BOUNDARY_CONTROLS_RBAC_GATE_CONTEXT",
    "RBAC_ROLE_PERMISSION_BOUNDARY_DOCS_CONTROL_ACCESS_CONTEXT",
    "AUDIT_ACCESS_LOG_BOUNDARY_DOCS_CONTROL_AUDIT_CONTEXT",
    "RETENTION_DELETION_CONTROL_SPECIFICATION_BOUNDARY_CONTROLS_RETENTION_CONTEXT",
    "RAW_MATERIAL_ROUTING_BOUNDARY_DOCS_CONTROL_RAW_ROUTING_CONTEXT",
    "THIRD_PARTY_PROVIDER_BOUNDARY_DOCS_CONTROL_PROVIDER_CONTEXT",
    "CI_RELEASE_PRODUCT_EXTERNAL_USE_BOUNDARY_DOCS_CONTROL_RELEASE_CONTEXT",
    "HANDOFF_REFRESH_AFTER_POST_RUNTIME_GATE_BLOCKED_COMPLETION_SUMMARY_IS_CONTEXT_ONLY",
    "EXTERNAL_REVIEW_REQUIREMENTS_USED_AS_ADVISORY_CONTEXT_ONLY",
    "STATIC_INSPECTION_RESULTS_ARE_REVIEW_CONTEXT_ONLY",
    "OLD_HANDOFF_FILES_ARE_HISTORICAL_CONTEXT_ONLY",
    "STALE_HANDOFF_MUST_NOT_SELECT_REOPEN_OR_CLOSE_SLICE",
  ]);
});

test("current accepted state exists", () => {
  assertIncludesAll([
    "2e47e56 docs(context): refresh new-thread handoff after post-runtime-gate blocked completion summary",
    "48b0df0 docs(domain): freeze post-runtime-gate blocked completion summary boundary",
    "520f0c1 docs(domain): freeze runtime gate implementation candidate inventory planning round summary boundary",
    "POST_RUNTIME_GATE_BLOCKED_COMPLETION_SUMMARY_AND_HANDOFF_REFRESH_REVIEWED_AND_PAUSED_NO_CHANGE",
    "NEXT_SAFE_POSTURE_SELECTED_AFTER_POST_RUNTIME_GATE_BLOCKED_COMPLETION_HANDOFF_REFRESH_PAUSE_NO_CHANGE",
    "REVIEW_ONLY_FINAL_BLOCKED_CHAIN_STATUS_AFTER_POST_RUNTIME_GATE_BLOCKED_COMPLETION_SUMMARY_COMPLETED_NO_CHANGE",
    "COMBINED_READ_ONLY_POST_RUNTIME_GATE_BLOCKED_COMPLETION_SUMMARY_NEXT_SAFE_POSTURE_SELECTION_COMPLETED_NO_CHANGE",
    "The current safe posture remains continued pause.",
  ]);
});

test("prior read-only review result exists", () => {
  assertIncludesAll([
    "The read-only final blocked-chain/status review was performed.",
    "The result was PARTIAL_GAP_REQUIRES_DOCS_ONLY_FINAL_BLOCKED_CHAIN_STATUS_BOUNDARY_AFTER_POST_RUNTIME_GATE_BLOCKED_COMPLETION_SUMMARY.",
    "A future DOCS_ONLY final blocked-chain status boundary is suitable.",
    "This boundary freezes that partial/gap result only.",
    "This boundary does not alter the final blocked-chain status into implementation-readiness, implementation, runtime readiness, release approval, product candidate, external-use authorization, blocker closure, or dependency closure.",
  ]);
});

test("final blocked-chain/status matrix exists and all rows exist", () => {
  assertIncludesAll([
    "surface",
    "current accepted status",
    "evidence level",
    "blocker status",
    "implementation posture",
    "runtime/API/schema/package posture",
    "release/product/external-use posture",
    "closure posture",
    "next safe evidence needed",
    "Every row preserves DOCS_ONLY, PROVE_ONLY, read-only, output-only, or context-only as applicable",
    "no runtime-gate implementation",
    "runtime-gate inventory not as implementation",
    "FINAL-BLOCKED-001 roadmap dependencies 001-to-007",
    "FINAL-BLOCKED-002 D001 RBAC/admin-support",
    "FINAL-BLOCKED-003 D002 audit/access-log",
    "FINAL-BLOCKED-004 D003 retention/deletion",
    "FINAL-BLOCKED-005 D004 raw-material routing",
    "FINAL-BLOCKED-006 D005 third-party/provider routing",
    "FINAL-BLOCKED-007 D006 validator/registry/runtime-gate",
    "FINAL-BLOCKED-008 D007 CI/release/product/external-use",
    "FINAL-BLOCKED-009 data-handling/security/control-plane planning",
    "FINAL-BLOCKED-010 runtime-gate implementation candidate inventory planning",
    "FINAL-BLOCKED-011 post-runtime-gate blocked-completion summary",
    "FINAL-BLOCKED-012 current handoff refresh",
    "FINAL-BLOCKED-013 unresolved dependency links",
    "FINAL-BLOCKED-014 evidence limits",
    "FINAL-BLOCKED-015 negative authorizations",
    "FINAL-BLOCKED-016 no-overclaim rules and continued pause",
  ], matrix);
});

test("required blocker summary exists", () => {
  assertIncludesAll([
    "dependencies 001 through 007 remain not closed",
    "D001 RBAC/admin-support remains not implemented and not closed",
    "D002 audit/access-log remains not implemented and not closed",
    "D003 retention/deletion remains not implemented and not closed",
    "D004 raw-material routing remains not implemented and not closed",
    "D005 third-party/provider routing remains unauthorized/not implemented and not closed",
    "D006 validator/registry/runtime-gate remains not implemented and not closed",
    "D007 CI/release/product/external-use remains absent/unauthorized and not closed",
    "DHC planning round remains partial/gap, future-evidence-only, not implemented, and not closed",
    "runtime-gate planning round remains partial/gap, future-evidence-only, not implemented, and not closed",
    "post-runtime-gate blocked-completion summary remains partial/gap, non-authorizing, and not closure",
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
    "final blocked-chain status boundary does not mean implementation-readiness authorization",
    "final blocked-chain status boundary does not mean implementation",
    "final blocked-chain status boundary does not mean runtime readiness",
    "final blocked-chain status boundary does not mean runtime/API/schema/package behavior change",
    "final blocked-chain status boundary does not mean runtime gate implementation",
    "final blocked-chain status boundary does not mean runtime gate inventory as implementation",
    "final blocked-chain status boundary does not mean validator dispatch",
    "final blocked-chain status boundary does not mean registry/lookup",
    "final blocked-chain status boundary does not mean schema/validator enforcement",
    "final blocked-chain status boundary does not mean workflow enforcement",
    "final blocked-chain status boundary does not mean CI evidence",
    "final blocked-chain status boundary does not mean release approval",
    "final blocked-chain status boundary does not mean product candidate",
    "final blocked-chain status boundary does not mean external-use authorization",
    "final blocked-chain status boundary does not mean blocker resolution",
    "final blocked-chain status boundary does not mean dependency closure",
    "final blocked-chain status row does not mean closure",
    "blocked-completion summary boundary does not mean closure",
    "planning-round summary does not mean closure",
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
    "The only recommended next postures are:",
    "REVIEW_ONLY_FINAL_BLOCKED_CHAIN_STATUS_BOUNDARY_AFTER_POST_RUNTIME_GATE_BLOCKED_COMPLETION_SUMMARY",
    "REVIEW_ONLY_FINAL_BLOCKED_CHAIN_STATUS_NEXT_SAFE_POSTURE_SELECTION",
    "continued pause",
    "None are authorized by this boundary.",
  ], recommendations);
});

test("none are authorized by this boundary exists", () => {
  assertIncludesAll(["None are authorized by this boundary."]);
});

test("rejects exact overclaiming tokens", () => {
  assertDoesNotIncludeExactToken([
    "FINAL_BLOCKED_CHAIN_IMPLEMENTATION_READY",
    "FINAL_BLOCKED_CHAIN_READY_FOR_IMPLEMENTATION",
    "FINAL_BLOCKED_CHAIN_IMPLEMENTED",
    "FINAL_BLOCKED_CHAIN_CLOSED",
    "FINAL_BLOCKED_CHAIN_BLOCKER_RESOLVED",
    "FINAL_BLOCKED_CHAIN_AUTHORIZES_IMPLEMENTATION",
    "FINAL_BLOCKED_CHAIN_AUTHORIZES_RUNTIME",
    "FINAL_BLOCKED_CHAIN_CREATES_CLOSURE",
    "FINAL_BLOCKED_CHAIN_CREATES_PRODUCT_CANDIDATE",
    "FINAL_BLOCKED_CHAIN_AUTHORIZES_EXTERNAL_USE",
    "FINAL_BLOCKED_CHAIN_RELEASE_APPROVED",
    "POST_RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_IMPLEMENTED",
    "POST_RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_CLOSED",
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
