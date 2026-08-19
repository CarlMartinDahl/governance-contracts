import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const DOC_PATH =
  "docs/DOMAIN_CONTRACTS_RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_ENTRY_CANDIDATE_SCOPE_BOUNDARY_v1.md";
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

const scopeMatrix = sectionBetween("## Scope Matrix", "## Scope Exclusions");
const recommendations = sectionBetween("## Recommended Next Posture");

test("boundary doc exists", () => {
  assert.equal(existsSync(DOC_PATH), true);
});

test("identity/status tokens exist", () => {
  assertIncludesAll([
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_ENTRY_CANDIDATE_SCOPE_BOUNDARY",
    "DOCS_ONLY",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_ENTRY_CANDIDATE_SCOPE_ONLY",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_SCOPE_PARTIAL_GAP_CONTEXT",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_SCOPE_NOT_IMPLEMENTATION_READINESS_AUTHORIZATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_SCOPE_NOT_IMPLEMENTATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_SCOPE_NOT_RUNTIME_READY",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_SCOPE_NOT_RUNTIME_BEHAVIOR",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_SCOPE_NOT_RUNTIME_API_SCHEMA_PACKAGE_BEHAVIOR_CHANGE",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_SCOPE_NOT_PROVE_ONLY_STATUS_GAP",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_SCOPE_NOT_RUNTIME_GATE_IMPLEMENTATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_SCOPE_NOT_RUNTIME_GATE_INVENTORY_AS_IMPLEMENTATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_SCOPE_NOT_VALIDATOR_DISPATCH",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_SCOPE_NOT_REGISTRY_LOOKUP",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_SCOPE_NOT_SCHEMA_VALIDATOR_ENFORCEMENT",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_SCOPE_NOT_WORKFLOW_ENFORCEMENT",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_SCOPE_NOT_DELIVERY_GATE_IMPLEMENTATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_SCOPE_NOT_FINAL_DECISION_GATE_IMPLEMENTATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_SCOPE_NOT_PACKET_COMPONENT_APPROVAL_GATE_IMPLEMENTATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_SCOPE_NOT_GENERATED_PDF_HANDLING_GATE_IMPLEMENTATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_SCOPE_NOT_LOCAL_LOG_HANDLING_GATE_IMPLEMENTATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_SCOPE_NOT_PRODUCT_CANDIDATE_GATE_IMPLEMENTATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_SCOPE_NOT_EXTERNAL_USE_GATE_IMPLEMENTATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_SCOPE_NOT_DATA_HANDLING_IMPLEMENTATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_SCOPE_NOT_SECURITY_CONTROL_IMPLEMENTATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_SCOPE_NOT_CONTROL_PLANE_IMPLEMENTATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_SCOPE_NOT_RETENTION_IMPLEMENTATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_SCOPE_NOT_DELETION_IMPLEMENTATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_SCOPE_NOT_ENCRYPTION_IMPLEMENTATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_SCOPE_NOT_AUDIT_ACCESS_LOG_IMPLEMENTATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_SCOPE_NOT_EVENT_TAXONOMY_RUNTIME_CODE",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_SCOPE_NOT_LOG_SCHEMA",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_SCOPE_NOT_LOG_STORAGE",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_SCOPE_NOT_ROLE_PERMISSION_IMPLEMENTATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_SCOPE_NOT_RBAC_ACCESS_CONTROL_IMPLEMENTATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_SCOPE_NOT_ADMIN_SUPPORT_IMPLEMENTATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_SCOPE_NOT_RAW_MATERIAL_ROUTING_IMPLEMENTATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_SCOPE_NOT_THIRD_PARTY_ROUTING_IMPLEMENTATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_SCOPE_NOT_THIRD_PARTY_ROUTING_AUTHORIZATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_SCOPE_NOT_PROVIDER_INTEGRATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_SCOPE_NOT_PROVIDER_REGISTRY",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_SCOPE_NOT_PROVIDER_STATUS_IMPLEMENTATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_SCOPE_NOT_DATA_ROUTING_MAP_IMPLEMENTATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_SCOPE_NOT_TOKEN_URL_SECRET_HANDLING_IMPLEMENTATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_SCOPE_NOT_GLOBAL_ACCESS_CONTROL_THREAT_MODEL_CLOSURE",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_SCOPE_NOT_CI_EVIDENCE_CREATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_SCOPE_NOT_RELEASE_APPROVAL",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_SCOPE_NOT_PRODUCT_CANDIDATE",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_SCOPE_NOT_EXTERNAL_USE_AUTHORIZATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_SCOPE_NOT_DELIVERY_TO_EXTERNAL_REVIEWER",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_SCOPE_NOT_PACKET_APPROVAL",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_SCOPE_NOT_BLOCKER_RESOLUTION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_SCOPE_NOT_DEPENDENCY_CLOSURE",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_SCOPE_CONTINUED_PAUSE",
  ]);
});

test("purpose exists", () => {
  assertIncludesAll([
    "This boundary freezes the runtime-gate implementation candidate inventory entry-candidate scope after the DHC planning-round summary.",
    "It is DOCS_ONLY, non-authorizing, partial/gap, and scope/context only.",
    "It creates no implementation, implementation-readiness authorization, runtime behavior, runtime/API/schema/package change, CI evidence, release approval, product candidate, external-use, delivery approval, packet approval, blocker resolution, or dependency closure.",
    "This scope boundary is required before any future PROVE_ONLY runtime-gate implementation candidate inventory status/gap review could be considered.",
    "Runtime-gate inventory is not implementation.",
  ]);
});

test("source hierarchy exists", () => {
  assertIncludesAll([
    "LIVE_REPO_EVIDENCE_WINS",
    "TRACKED_REPO_EVIDENCE_CONTROLS_CURRENT_STATE",
    "NEW_THREAD_HANDOFF_FILE_IS_CONTEXT_ONLY",
    "IMPLEMENTATION_READINESS_ENTRY_CRITERIA_BOUNDARY_CONTROLS_ENTRY_RULES",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_PLANNING_ROUND_SUMMARY_CONTROLS_DHC_CONTEXT",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_EVIDENCE_CLOSURE_PLAN_BOUNDARY_CONTROLS_DHC_FUTURE_EVIDENCE",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_STATUS_GAP_BOUNDARY_CONTROLS_DHC_GAPS",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_ENTRY_CANDIDATE_SCOPE_BOUNDARY_CONTROLS_DHC_SCOPE",
    "RUNTIME_GATE_CANDIDATE_STATUS_INVENTORY_BOUNDARY_AFTER_RBAC_GATE_STATUS_CONTROLS_PRIOR_RUNTIME_GATE_CONTEXT",
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
    "a929b98 docs(context): refresh new-thread handoff after data handling planning summary",
    "9e18c56 docs(domain): freeze data handling security control plane planning round summary boundary",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_IMPLEMENTATION_CONTROL_PLAN_PLANNING_ROUND_SUMMARY_BOUNDARY_DOCS_ONLY_FROZEN_AND_COMMITTED",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_IMPLEMENTATION_CONTROL_PLAN_PLANNING_ROUND_SUMMARY_BOUNDARY_REVIEWED_AND_PAUSED_NO_CHANGE",
    "POST_DATA_HANDLING_SECURITY_CONTROL_PLANE_IMPLEMENTATION_CONTROL_PLAN_PLANNING_ROUND_SUMMARY_BOUNDARY_REVIEWED_AND_PAUSED_NO_CHANGE",
    "NEXT_SAFE_POSTURE_SELECTED_AFTER_DATA_HANDLING_SECURITY_CONTROL_PLANE_PLANNING_ROUND_SUMMARY_PAUSE_NO_CHANGE",
    "REVIEW_ONLY_RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_ENTRY_CANDIDATE_COMPLETED_NO_CHANGE",
    "COMBINED_READ_ONLY_POST_DATA_HANDLING_SECURITY_CONTROL_PLANE_IMPLEMENTATION_CONTROL_PLAN_PLANNING_ROUND_SUMMARY_NEXT_SAFE_POSTURE_SELECTION_COMPLETED_NO_CHANGE",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_ENTRY_CANDIDATE_REVIEWED_PARTIAL_GAP_NON_AUTHORIZING_AND_PAUSED_NO_CHANGE",
    "NEXT_PHASE_SELECTED_AFTER_RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_ENTRY_CANDIDATE_SCOPE_GAP_NO_CHANGE",
    "COMBINED_READ_ONLY_RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_ENTRY_CANDIDATE_PAUSE_AND_SCOPE_BOUNDARY_SELECTION_COMPLETED_NO_CHANGE",
    "RECOVERY_AFTER_INTERRUPTED_RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_ENTRY_CANDIDATE_SCOPE_BOUNDARY_WRITE_SLICE_COMPLETED_NO_CHANGE",
    "The current safe posture remains continued pause.",
  ]);
});

test("prior entry-candidate review result exists", () => {
  assertIncludesAll([
    "The runtime-gate implementation candidate inventory entry-candidate review was read-only.",
    "The result was PARTIAL_GAP_REQUIRES_DOCS_ONLY_RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_ENTRY_CANDIDATE_SCOPE_BOUNDARY.",
    "A future PROVE_ONLY runtime-gate status/gap candidate may not yet be proposed.",
    "Continued pause remains valid until scope is frozen.",
    "This boundary freezes scope only and does not alter that result.",
  ]);
});

test("scope surfaces exist", () => {
  assertIncludesAll([
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
  ]);
});

test("IR-EC summary exists", () => {
  assertIncludesAll([
    "IR-EC-001 | satisfied for read-only candidate review",
    "IR-EC-002 | satisfied for read-only candidate review",
    "IR-EC-003 | satisfied for read-only candidate review",
    "IR-EC-004 | partial / gap",
    "IR-EC-005 | satisfied for read-only candidate review",
    "IR-EC-006 | satisfied for read-only candidate review",
    "IR-EC-007 | satisfied for read-only candidate review",
    "IR-EC-008 | satisfied for read-only candidate review",
    "IR-EC-009 | satisfied for read-only candidate review",
    "IR-EC-010 | satisfied for read-only candidate review",
    "IR-EC-011 | satisfied for read-only candidate review",
    "IR-EC-012 | partial / gap",
    "IR-EC-013 | partial / gap",
    "IR-EC-014 | partial / gap",
    "IR-EC-015 | partial / gap",
    "IR-EC-016 | partial / gap",
    "IR-EC-017 | satisfied for read-only candidate review",
    "IR-EC-018 | satisfied for read-only candidate review",
    "Satisfied for read-only candidate review is not implementation-readiness authorization.",
  ]);
});

test("scope matrix exists and all RGI-SCOPE rows exist", () => {
  assertIncludesAll([
    "row ID",
    "scope surface",
    "current evidence level",
    "scope gap requiring freeze",
    "inventory/control question to freeze",
    "linked dependency/context",
    "future evidence required before status/gap",
    "what remains non-authorized",
    "Every row preserves DOCS_ONLY, scope only, partial/gap where applicable, no implementation-readiness authorization, no implementation, no runtime/API/schema/package change, no current CI evidence, no blocker resolution, no dependency closure, future evidence only, and continued pause on ambiguity.",
    "RGI-SCOPE-001",
    "RGI-SCOPE-002",
    "RGI-SCOPE-003",
    "RGI-SCOPE-004",
    "RGI-SCOPE-005",
    "RGI-SCOPE-006",
    "RGI-SCOPE-007",
    "RGI-SCOPE-008",
    "RGI-SCOPE-009",
    "RGI-SCOPE-010",
    "RGI-SCOPE-011",
    "RGI-SCOPE-012",
    "RGI-SCOPE-013",
    "RGI-SCOPE-014",
    "RGI-SCOPE-015",
    "RGI-SCOPE-016",
    "RGI-SCOPE-017",
    "RGI-SCOPE-018",
    "RGI-SCOPE-019",
    "RGI-SCOPE-020",
    "RGI-SCOPE-021",
    "RGI-SCOPE-022",
    "RGI-SCOPE-023",
    "RGI-SCOPE-024",
    "RGI-SCOPE-025",
  ], scopeMatrix);
});

test("scope exclusions exist", () => {
  assertIncludesAll([
    "Scope does not mean status/gap review.",
    "Scope does not mean implementation plan approval.",
    "Scope does not mean implementation-readiness.",
    "Scope does not mean implementation.",
    "Scope does not mean runtime gate implementation.",
    "Scope does not mean runtime gate inventory as implementation.",
    "Scope does not mean validator dispatch.",
    "Scope does not mean registry/lookup.",
    "Scope does not mean schema/validator enforcement.",
    "Scope does not mean workflow enforcement.",
    "Scope does not mean blocker resolution.",
    "Scope does not mean dependency closure.",
    "Scope does not mean CI evidence.",
    "Scope does not mean release approval.",
    "Scope does not mean product candidate.",
    "Scope does not mean external-use authorization.",
    "Scope does not mean delivery/packet approval.",
    "Scope does not mean PROVE_ONLY status/gap may be skipped.",
  ]);
});

test("evidence limits exist", () => {
  assertIncludesAll([
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
    "Runtime gate candidate inventory is not runtime gate implementation.",
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
    "Scope boundary does not mean implementation-readiness authorization.",
    "Scope boundary does not mean implementation.",
    "Scope boundary does not mean runtime readiness.",
    "Scope boundary does not mean PROVE_ONLY status/gap review.",
    "Runtime gate inventory scope does not mean runtime gate inventory as implementation.",
    "Runtime gate candidate row does not mean runtime gate implementation.",
    "Validator dispatch scope does not mean validator dispatch exists.",
    "Registry/lookup scope does not mean registry/lookup exists.",
    "Schema/validator gate scope does not mean schema/validator enforcement exists.",
    "Workflow/prompt gate scope does not mean workflow enforcement exists.",
    "Delivery/final-decision gate scope does not mean delivery or final decision exists.",
    "Packet component approval gate scope does not mean packet component approval exists.",
    "Generated PDF handling gate scope does not mean generated PDF is repo evidence or packet component.",
    "Local log handling gate scope does not mean local logs are CI evidence or packet components.",
    "Product-candidate gate scope does not mean product candidate selected.",
    "External-use gate scope does not mean external-use authorized.",
    "Partial/gap entry-candidate review does not mean dependency closure.",
    "Retention/deletion dependency scope does not mean retention/deletion implementation.",
    "Audit/access-log dependency scope does not mean audit/access-log implementation.",
    "RBAC/admin-support dependency scope does not mean RBAC/admin-support implementation.",
    "Raw-material routing dependency scope does not mean raw-material routing implementation.",
    "Third-party/provider dependency scope does not mean third-party routing authorization.",
    "DHC evidence/closure requirements scope does not mean DHC evidence exists or closure exists.",
    "Required implementation evidence does not mean implementation evidence exists.",
    "Required test evidence does not mean test evidence exists.",
    "Required CI evidence does not mean CI evidence exists.",
    "Continued pause remains valid.",
    "Human/professional review remains release gate.",
  ]);
});

test("recommended next posture is review-only or continued pause only", () => {
  assertIncludesAll([
    "REVIEW_ONLY_RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_ENTRY_CANDIDATE_SCOPE_BOUNDARY",
    "REVIEW_ONLY_RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_STATUS_GAP_AFTER_SCOPE_BOUNDARY",
    "continued pause",
    "None are authorized by this boundary.",
  ], recommendations);
});

test("reject exact overclaiming tokens", () => {
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
