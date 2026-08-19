import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const DOC_PATH =
  "docs/DOMAIN_CONTRACTS_DATA_HANDLING_SECURITY_CONTROL_PLANE_IMPLEMENTATION_CONTROL_PLAN_EVIDENCE_AND_CLOSURE_PLAN_BOUNDARY_v1.md";
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

const matrix = sectionBetween("## Evidence And Closure-Plan Matrix", "## Required Implementation / Authorization Evidence Definition");
const recommendations = sectionBetween("## Recommended Next Posture");

test("boundary doc exists", () => {
  assert.equal(existsSync(DOC_PATH), true);
});

test("identity/status tokens exist", () => {
  assertIncludesAll([
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_IMPLEMENTATION_CONTROL_PLAN_EVIDENCE_AND_CLOSURE_PLAN_BOUNDARY",
    "DOCS_ONLY",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_IMPLEMENTATION_CONTROL_PLAN_EVIDENCE_AND_CLOSURE_PLAN_ONLY",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_EVIDENCE_CLOSURE_PLAN_PARTIAL_GAP_CONTEXT",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_EVIDENCE_CLOSURE_PLAN_NOT_IMPLEMENTATION_READINESS_AUTHORIZATION",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_EVIDENCE_CLOSURE_PLAN_NOT_IMPLEMENTATION",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_EVIDENCE_CLOSURE_PLAN_NOT_RUNTIME_READY",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_EVIDENCE_CLOSURE_PLAN_NOT_RUNTIME_BEHAVIOR",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_EVIDENCE_CLOSURE_PLAN_NOT_RUNTIME_API_SCHEMA_PACKAGE_BEHAVIOR_CHANGE",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_EVIDENCE_CLOSURE_PLAN_NOT_DATA_HANDLING_IMPLEMENTATION",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_EVIDENCE_CLOSURE_PLAN_NOT_SECURITY_CONTROL_IMPLEMENTATION",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_EVIDENCE_CLOSURE_PLAN_NOT_CONTROL_PLANE_IMPLEMENTATION",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_EVIDENCE_CLOSURE_PLAN_NOT_RETENTION_IMPLEMENTATION",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_EVIDENCE_CLOSURE_PLAN_NOT_DELETION_IMPLEMENTATION",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_EVIDENCE_CLOSURE_PLAN_NOT_ENCRYPTION_IMPLEMENTATION",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_EVIDENCE_CLOSURE_PLAN_NOT_AUDIT_ACCESS_LOG_IMPLEMENTATION",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_EVIDENCE_CLOSURE_PLAN_NOT_EVENT_TAXONOMY_RUNTIME_CODE",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_EVIDENCE_CLOSURE_PLAN_NOT_LOG_SCHEMA",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_EVIDENCE_CLOSURE_PLAN_NOT_LOG_STORAGE",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_EVIDENCE_CLOSURE_PLAN_NOT_ROLE_PERMISSION_IMPLEMENTATION",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_EVIDENCE_CLOSURE_PLAN_NOT_RBAC_ACCESS_CONTROL_IMPLEMENTATION",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_EVIDENCE_CLOSURE_PLAN_NOT_ADMIN_SUPPORT_IMPLEMENTATION",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_EVIDENCE_CLOSURE_PLAN_NOT_RAW_MATERIAL_ROUTING_IMPLEMENTATION",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_EVIDENCE_CLOSURE_PLAN_NOT_THIRD_PARTY_ROUTING_IMPLEMENTATION",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_EVIDENCE_CLOSURE_PLAN_NOT_THIRD_PARTY_ROUTING_AUTHORIZATION",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_EVIDENCE_CLOSURE_PLAN_NOT_PROVIDER_INTEGRATION",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_EVIDENCE_CLOSURE_PLAN_NOT_PROVIDER_REGISTRY",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_EVIDENCE_CLOSURE_PLAN_NOT_PROVIDER_STATUS_IMPLEMENTATION",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_EVIDENCE_CLOSURE_PLAN_NOT_DATA_ROUTING_MAP_IMPLEMENTATION",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_EVIDENCE_CLOSURE_PLAN_NOT_TOKEN_URL_SECRET_HANDLING_IMPLEMENTATION",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_EVIDENCE_CLOSURE_PLAN_NOT_GLOBAL_ACCESS_CONTROL_THREAT_MODEL_CLOSURE",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_EVIDENCE_CLOSURE_PLAN_NOT_RUNTIME_GATE_IMPLEMENTATION",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_EVIDENCE_CLOSURE_PLAN_NOT_RUNTIME_GATE_INVENTORY_AS_IMPLEMENTATION",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_EVIDENCE_CLOSURE_PLAN_NOT_VALIDATOR_DISPATCH",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_EVIDENCE_CLOSURE_PLAN_NOT_REGISTRY_LOOKUP",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_EVIDENCE_CLOSURE_PLAN_NOT_SCHEMA_VALIDATOR_ENFORCEMENT",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_EVIDENCE_CLOSURE_PLAN_NOT_WORKFLOW_ENFORCEMENT",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_EVIDENCE_CLOSURE_PLAN_NOT_CI_EVIDENCE_CREATION",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_EVIDENCE_CLOSURE_PLAN_NOT_RELEASE_APPROVAL",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_EVIDENCE_CLOSURE_PLAN_NOT_PRODUCT_CANDIDATE",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_EVIDENCE_CLOSURE_PLAN_NOT_EXTERNAL_USE_AUTHORIZATION",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_EVIDENCE_CLOSURE_PLAN_NOT_DELIVERY_TO_EXTERNAL_REVIEWER",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_EVIDENCE_CLOSURE_PLAN_NOT_PACKET_APPROVAL",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_EVIDENCE_CLOSURE_PLAN_NOT_BLOCKER_RESOLUTION",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_EVIDENCE_CLOSURE_PLAN_NOT_DEPENDENCY_CLOSURE",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_EVIDENCE_CLOSURE_PLAN_CONTINUED_PAUSE",
  ]);
});

test("purpose, source hierarchy, and accepted state exist", () => {
  assertIncludesAll([
    "This boundary freezes future evidence and closure-plan requirements for the data-handling/security/control-plane implementation control plan.",
    "It is DOCS_ONLY, non-authorizing, partial/gap, and evidence/closure-plan only.",
    "Evidence plan does not mean evidence exists.",
    "Closure plan does not mean closure.",
    "This boundary is required before any later planning-round summary or any implementation-readiness discussion could be considered.",
    "LIVE_REPO_EVIDENCE_WINS",
    "TRACKED_REPO_EVIDENCE_CONTROLS_CURRENT_STATE",
    "IMPLEMENTATION_READINESS_ENTRY_CRITERIA_BOUNDARY_CONTROLS_ENTRY_RULES",
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
    "EXTERNAL_REVIEW_REQUIREMENTS_USED_AS_ADVISORY_CONTEXT_ONLY",
    "STALE_HANDOFF_MUST_NOT_SELECT_REOPEN_OR_CLOSE_SLICE",
    "67d6e78 docs(domain): freeze data handling security control plane status gap boundary",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_IMPLEMENTATION_CONTROL_PLAN_STATUS_GAP_BOUNDARY_REVIEWED_AND_PAUSED_NO_CHANGE",
    "NEXT_PHASE_SELECTED_AFTER_DATA_HANDLING_SECURITY_CONTROL_PLANE_STATUS_GAP_BOUNDARY_PAUSE_NO_CHANGE",
    "COMBINED_READ_ONLY_DATA_HANDLING_SECURITY_CONTROL_PLANE_STATUS_GAP_BOUNDARY_PAUSE_AND_NEXT_PHASE_SELECTION_COMPLETED_NO_CHANGE",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_IMPLEMENTATION_CONTROL_PLAN_STATUS_GAP_BOUNDARY_DOCS_ONLY_FROZEN_AND_COMMITTED",
    "LOCAL_CONTEXT_REFRESHED_TO_67d6e78_DATA_HANDLING_SECURITY_CONTROL_PLANE_IMPLEMENTATION_CONTROL_PLAN_STATUS_GAP_BOUNDARY_DOCS_ONLY_NO_RUNTIME_CHANGE",
    "REVIEW_ONLY_DATA_HANDLING_SECURITY_CONTROL_PLANE_IMPLEMENTATION_CONTROL_PLAN_STATUS_GAP_BOUNDARY_COMPLETED_NO_CHANGE",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_IMPLEMENTATION_CONTROL_PLAN_ENTRY_CANDIDATE_SCOPE_BOUNDARY_REVIEWED_AND_PAUSED_NO_CHANGE",
    "The current safe posture remains continued pause.",
  ]);
});

test("prior status/gap result exists", () => {
  assertIncludesAll([
    "The PROVE_ONLY status/gap review was read-only.",
    "PARTIAL_GAP_REQUIRES_DOCS_ONLY_DATA_HANDLING_SECURITY_CONTROL_PLANE_IMPLEMENTATION_CONTROL_PLAN_STATUS_GAP_BOUNDARY",
    "The DOCS_ONLY status/gap boundary is frozen, reviewed, and paused.",
    "This evidence/closure-plan boundary freezes future evidence and closure requirements only.",
    "This boundary does not alter the partial/gap status into implementation-readiness, implementation, blocker closure, or dependency closure.",
  ]);
});

test("evidence and closure-plan matrix exists and all DHC-ECP-001 through DHC-ECP-027 rows exist", () => {
  assertIncludesAll([
    "row ID",
    "control surface",
    "current gap/status",
    "future implementation or authorization evidence required",
    "future test/CI evidence required",
    "closure criteria",
    "dependency links that must remain visible",
    "failure/ambiguity outcome",
    "what remains non-authorized until closure",
    "Every row preserves DOCS_ONLY, partial/gap where applicable, no implementation-readiness authorization, no implementation, no runtime/API/schema/package change, no current CI evidence, no release approval, no product candidate, no external-use authorization, no blocker resolution, no dependency closure, future evidence only, closure criteria do not mean closure, and continued pause on ambiguity.",
  ], matrix);
  for (let index = 1; index <= 27; index += 1) {
    assertIncludesAll([`DHC-ECP-${String(index).padStart(3, "0")}`], matrix);
  }
});

test("matrix preserves current gaps, future evidence only, dependency links, and continued pause", () => {
  assertIncludesAll([
    "retention not implemented",
    "deletion not implemented",
    "encryption not implemented",
    "audit/access-log not implemented",
    "event taxonomy runtime code absent",
    "log schema absent",
    "log storage absent",
    "RBAC implementation absent",
    "admin/support implementation absent",
    "broader access control unresolved",
    "threat model not closed",
    "raw-material routing not implemented",
    "third-party routing unauthorized",
    "provider registry/status absent",
    "provider data-routing map absent",
    "provider retention/deletion posture absent",
    "provider auditability absent",
    "token/URL/secret handling unresolved",
    "validator dispatch, registry lookup, and runtime gate implementation absent",
    "local logs are not CI evidence",
    "local logs are not packet components",
    "posture is not runtime enforcement",
    "implementation evidence absent",
    "test closure evidence absent",
    "CI evidence not created",
    "closure criteria are future criteria, not closure",
    "negative authorizations remain active",
    "dependency 001",
    "dependency 002",
    "dependency 003",
    "dependency 004",
    "dependency 005",
    "dependency 006",
    "dependency 007",
    "dependencies 001-007",
    "implementation-readiness entry criteria",
    "repo governance axioms",
    "continued pause",
  ], matrix);
});

test("required implementation and authorization evidence definition exists without claiming evidence exists", () => {
  assertIncludesAll([
    "## Required Implementation / Authorization Evidence Definition",
    "tracked implementation diff where implementation is claimed",
    "scoped implementation rationale",
    "explicit affected and non-affected surfaces",
    "retention implementation evidence if retention is claimed",
    "deletion implementation evidence if deletion is claimed",
    "encryption evidence if encryption is claimed",
    "audit/access-log implementation evidence if audit/access logs are claimed",
    "event taxonomy runtime-code evidence if event taxonomy is claimed",
    "log schema evidence if log schema is claimed",
    "log storage evidence if log storage is claimed",
    "RBAC/role-permission implementation evidence if RBAC is claimed",
    "admin/support access-control evidence if admin/support is claimed",
    "raw-material routing implementation evidence if routing is claimed",
    "third-party/provider routing authorization if third-party routing is claimed",
    "provider registry/status evidence if provider status is claimed",
    "provider data-routing map evidence if routing map is claimed",
    "provider retention/deletion and auditability evidence if provider posture is claimed",
    "token/URL/secret handling evidence if secret handling is claimed",
    "complete global access-control threat model if closure is claimed",
    "runtime-gate sequencing evidence if runtime gates are claimed",
    "CI evidence creation authorization if CI is claimed",
    "no-raw/no-private/no-source-locator/no-token/no-URL posture",
    "rollback/fail-closed posture",
    "human/professional review preservation",
    "None of this evidence exists yet for data-handling/security/control-plane closure.",
  ]);
});

test("required test and CI evidence definition exists without claiming test or CI closure", () => {
  assertIncludesAll([
    "## Required Test / CI Evidence Definition",
    "retention tests if retention is claimed",
    "deletion tests if deletion is claimed",
    "encryption tests if encryption is claimed",
    "audit/access-log tests if audit/access logs are claimed",
    "event taxonomy tests",
    "log schema tests",
    "log storage tests",
    "RBAC and role-permission tests",
    "admin/support access tests",
    "access-control tests beyond route/case/capability",
    "global access-control threat-model review/proof",
    "raw-material routing tests",
    "third-party/provider routing tests if provider route is claimed",
    "provider registry/status/data-routing-map tests if claimed",
    "provider retention/deletion/auditability tests if claimed",
    "token/URL/secret handling tests if claimed",
    "runtime-gate sequencing tests if claimed",
    "local-log-not-CI-evidence tests",
    "local-log-not-packet-component tests",
    "no-raw/no-private/no-source-locator/no-token/no-URL tests",
    "no-implementation-readiness-overclaim tests",
    "no-release-approval-overclaim tests",
    "no-product-candidate-overclaim tests",
    "no-external-use-overclaim tests",
    "CI evidence proof only if CI is separately claimed",
    "None of this test/CI evidence exists yet for data-handling/security/control-plane closure.",
  ]);
});

test("closure criteria and dependency links preserve no closure", () => {
  assertIncludesAll([
    "## Closure Criteria",
    "Closure requires all required implementation or authorization evidence tracked",
    "all required test/CI evidence tracked",
    "separate future blocker-status update",
    "negative boundary preserved",
    "upstream dependencies reviewed and not overread as closure unless separately closed",
    "CI evidence created only if separately authorized",
    "release/product/external-use gates preserved",
    "human/professional review preserved",
    "explicit future user-authorized closure posture",
    "focused proof test for closure boundary",
    "no overclaiming tokens",
    "Closure criteria do not mean closure.",
    "Closure criteria are not met.",
    "No closure is created by this boundary.",
    "## Dependency Links",
    "Dependencies 001 through 007 remain not closed.",
    "RBAC/admin-support implementation remains absent.",
    "Audit/access-log implementation remains absent.",
    "Retention/deletion implementation remains absent.",
    "Raw-material routing implementation remains absent.",
    "Third-party routing remains unauthorized.",
    "Provider integration remains absent.",
    "Provider registry/status remains absent.",
    "Provider data-routing map remains absent.",
    "Token/URL/secret handling remains unresolved.",
    "Validator dispatch remains not created.",
    "Registry/lookup remains not created.",
    "Runtime gate implementation remains absent.",
    "Runtime gate inventory remains not implementation.",
    "Schema/validator enforcement remains absent.",
    "Workflow enforcement remains absent.",
    "CI evidence remains not created.",
    "Local logs remain not CI evidence.",
    "Local logs remain not packet components.",
    "Product candidate remains none.",
    "External-use remains unauthorized.",
    "Human/professional review remains release gate.",
  ]);
});

test("evidence limits preserve local, CI, product, and release boundaries", () => {
  assertIncludesAll([
    "## Evidence Limits",
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

test("negative authorization forbids implementation, approvals, evidence promotion, and inspection authority", () => {
  assertIncludesAll([
    "## Negative Authorization",
    "This boundary creates no implementation-readiness.",
    "This boundary creates no implementation-readiness authorization.",
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
  ]);
});

test("no-overclaim rules and recommended next posture preserve pause", () => {
  assertIncludesAll([
    "## No-Overclaim Rules",
    "Evidence/closure-plan boundary does not mean implementation-readiness authorization.",
    "Evidence/closure-plan boundary does not mean implementation.",
    "Evidence/closure-plan boundary does not mean runtime readiness.",
    "Evidence plan does not mean evidence exists.",
    "Closure plan does not mean closure.",
    "Closure criteria do not mean closure.",
    "Partial/gap status/gap review does not mean dependency closure.",
    "Retention evidence plan does not mean retention implementation.",
    "Deletion evidence plan does not mean deletion implementation.",
    "Encryption evidence plan does not mean encryption implementation.",
    "Audit/access-log evidence plan does not mean audit/access-log implementation.",
    "Event taxonomy evidence plan does not mean event taxonomy runtime code exists.",
    "Log schema evidence plan does not mean log schema exists.",
    "Log storage evidence plan does not mean log storage exists.",
    "RBAC evidence plan does not mean RBAC implementation.",
    "Admin/support evidence plan does not mean admin/support implementation.",
    "Raw-material routing evidence plan does not mean raw-material routing implementation.",
    "Third-party/provider evidence plan does not mean third-party routing authorization.",
    "Provider registry/status evidence plan does not mean provider registry/status exists.",
    "Data-routing map evidence plan does not mean data-routing map exists.",
    "Token/URL/secret evidence plan does not mean token/URL/secret handling exists.",
    "Global access-control threat-model evidence plan does not mean threat model is closed.",
    "Runtime gate sequencing evidence plan does not mean runtime gate inventory can be selected as implementation.",
    "Local log row does not mean local logs are CI evidence.",
    "Local log row does not mean local logs are packet components.",
    "Required implementation evidence does not mean implementation evidence exists.",
    "Required test evidence does not mean test evidence exists.",
    "Required CI evidence does not mean CI evidence exists.",
    "Continued pause remains valid.",
    "Human/professional review remains release gate.",
    "REVIEW_ONLY_DATA_HANDLING_SECURITY_CONTROL_PLANE_IMPLEMENTATION_CONTROL_PLAN_EVIDENCE_AND_CLOSURE_PLAN_BOUNDARY",
    "REVIEW_ONLY_DATA_HANDLING_SECURITY_CONTROL_PLANE_IMPLEMENTATION_CONTROL_PLAN_PLANNING_ROUND_SUMMARY_BOUNDARY",
    "continued pause",
    "None are authorized by this boundary.",
  ]);
  assertIncludesAll([
    "The only recommended next postures are:",
    "None are authorized by this boundary.",
  ], recommendations);
});

test("forbidden exact authorization and overclaim tokens remain absent from the boundary doc", () => {
  assertDoesNotIncludeExactToken([
    "IMPLEMENTATION_READINESS_AUTHORIZED",
    "IMPLEMENTATION_AUTHORIZED",
    "IMPLEMENTATION_READY",
    "RUNTIME_READY",
    "RUNTIME_BEHAVIOR_CHANGED",
    "RUNTIME_API_SCHEMA_PACKAGE_BEHAVIOR_CHANGED",
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
    "RBAC_IMPLEMENTED",
    "ADMIN_SUPPORT_IMPLEMENTED",
    "RAW_MATERIAL_ROUTING_IMPLEMENTED",
    "THIRD_PARTY_ROUTING_AUTHORIZED",
    "PROVIDER_INTEGRATION_CREATED",
    "PROVIDER_REGISTRY_CREATED",
    "PROVIDER_STATUS_IMPLEMENTED",
    "DATA_ROUTING_MAP_IMPLEMENTED",
    "TOKEN_URL_SECRET_HANDLING_IMPLEMENTED",
    "GLOBAL_ACCESS_CONTROL_THREAT_MODEL_CLOSED",
    "RUNTIME_GATE_IMPLEMENTED",
    "RUNTIME_GATE_INVENTORY_SELECTED_AS_IMPLEMENTATION",
    "VALIDATOR_DISPATCH_CREATED",
    "REGISTRY_LOOKUP_CREATED",
    "SCHEMA_VALIDATOR_ENFORCEMENT_CREATED",
    "WORKFLOW_ENFORCEMENT_CREATED",
    "IMPLEMENTATION_EVIDENCE_EXISTS",
    "TEST_EVIDENCE_EXISTS",
    "CI_EVIDENCE_EXISTS",
    "CI_CERTIFIED",
    "LOCAL_LOGS_ARE_CI_EVIDENCE",
    "LOCAL_LOGS_ARE_PACKET_COMPONENTS",
    "RELEASE_APPROVED",
    "RUNTIME_CERTIFIED",
    "TECHNICAL_SIGNOFF_CREATED",
    "EXTERNAL_REVIEWER_APPROVED",
    "PRODUCT_READY",
    "PRODUCT_CANDIDATE_SELECTED",
    "EXTERNAL_USE_AUTHORIZED",
    "DELIVERY_TO_EXTERNAL_REVIEWER_AUTHORIZED",
    "PACKET_APPROVED",
    "PACKET_COMPONENT_APPROVED",
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
    "FINDING_CREATED",
    "SEVERITY_ASSIGNED",
    "REMEDIATION_RECOMMENDED",
    "LOCAL_LOG_FILE_INSPECTION_AUTHORIZED",
    "DELIVERY_PACKAGE_GENERATION_AUTHORIZED",
    "EVIDENCE_PLAN_AUTHORIZES_IMPLEMENTATION",
    "CLOSURE_PLAN_CREATES_CLOSURE",
  ]);
});
