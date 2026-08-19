import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const DOC_PATH =
  "docs/DOMAIN_CONTRACTS_RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_STATUS_GAP_BOUNDARY_v1.md";
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

const matrix = sectionBetween("## RGI Status Gap Matrix", "## Required Implementation Or Authorization Evidence");
const recommendations = sectionBetween("## Recommended Next Posture");

test("boundary doc exists", () => {
  assert.equal(existsSync(DOC_PATH), true);
});

test("identity/status tokens exist", () => {
  assertIncludesAll([
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_STATUS_GAP_BOUNDARY",
    "DOCS_ONLY",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_STATUS_GAP_ONLY",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_STATUS_GAP_PARTIAL_GAP_CONTEXT",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_STATUS_GAP_NOT_IMPLEMENTATION_READINESS_AUTHORIZATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_STATUS_GAP_NOT_IMPLEMENTATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_STATUS_GAP_NOT_RUNTIME_READY",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_STATUS_GAP_NOT_RUNTIME_BEHAVIOR",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_STATUS_GAP_NOT_RUNTIME_API_SCHEMA_PACKAGE_BEHAVIOR_CHANGE",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_STATUS_GAP_NOT_RUNTIME_GATE_IMPLEMENTATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_STATUS_GAP_NOT_RUNTIME_GATE_INVENTORY_AS_IMPLEMENTATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_STATUS_GAP_NOT_VALIDATOR_DISPATCH",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_STATUS_GAP_NOT_REGISTRY_LOOKUP",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_STATUS_GAP_NOT_SCHEMA_VALIDATOR_ENFORCEMENT",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_STATUS_GAP_NOT_WORKFLOW_ENFORCEMENT",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_STATUS_GAP_NOT_DELIVERY_GATE_IMPLEMENTATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_STATUS_GAP_NOT_FINAL_DECISION_GATE_IMPLEMENTATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_STATUS_GAP_NOT_PACKET_COMPONENT_APPROVAL_GATE_IMPLEMENTATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_STATUS_GAP_NOT_GENERATED_PDF_HANDLING_GATE_IMPLEMENTATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_STATUS_GAP_NOT_LOCAL_LOG_HANDLING_GATE_IMPLEMENTATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_STATUS_GAP_NOT_PRODUCT_CANDIDATE_GATE_IMPLEMENTATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_STATUS_GAP_NOT_EXTERNAL_USE_GATE_IMPLEMENTATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_STATUS_GAP_NOT_DATA_HANDLING_IMPLEMENTATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_STATUS_GAP_NOT_SECURITY_CONTROL_IMPLEMENTATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_STATUS_GAP_NOT_CONTROL_PLANE_IMPLEMENTATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_STATUS_GAP_NOT_RETENTION_IMPLEMENTATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_STATUS_GAP_NOT_DELETION_IMPLEMENTATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_STATUS_GAP_NOT_ENCRYPTION_IMPLEMENTATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_STATUS_GAP_NOT_AUDIT_ACCESS_LOG_IMPLEMENTATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_STATUS_GAP_NOT_EVENT_TAXONOMY_RUNTIME_CODE",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_STATUS_GAP_NOT_LOG_SCHEMA",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_STATUS_GAP_NOT_LOG_STORAGE",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_STATUS_GAP_NOT_ROLE_PERMISSION_IMPLEMENTATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_STATUS_GAP_NOT_RBAC_ACCESS_CONTROL_IMPLEMENTATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_STATUS_GAP_NOT_ADMIN_SUPPORT_IMPLEMENTATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_STATUS_GAP_NOT_RAW_MATERIAL_ROUTING_IMPLEMENTATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_STATUS_GAP_NOT_THIRD_PARTY_ROUTING_IMPLEMENTATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_STATUS_GAP_NOT_THIRD_PARTY_ROUTING_AUTHORIZATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_STATUS_GAP_NOT_PROVIDER_INTEGRATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_STATUS_GAP_NOT_PROVIDER_REGISTRY",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_STATUS_GAP_NOT_PROVIDER_STATUS_IMPLEMENTATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_STATUS_GAP_NOT_DATA_ROUTING_MAP_IMPLEMENTATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_STATUS_GAP_NOT_TOKEN_URL_SECRET_HANDLING_IMPLEMENTATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_STATUS_GAP_NOT_GLOBAL_ACCESS_CONTROL_THREAT_MODEL_CLOSURE",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_STATUS_GAP_NOT_CI_EVIDENCE_CREATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_STATUS_GAP_NOT_RELEASE_APPROVAL",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_STATUS_GAP_NOT_PRODUCT_CANDIDATE",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_STATUS_GAP_NOT_EXTERNAL_USE_AUTHORIZATION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_STATUS_GAP_NOT_DELIVERY_TO_EXTERNAL_REVIEWER",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_STATUS_GAP_NOT_PACKET_APPROVAL",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_STATUS_GAP_NOT_BLOCKER_RESOLUTION",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_STATUS_GAP_NOT_DEPENDENCY_CLOSURE",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_STATUS_GAP_CONTINUED_PAUSE",
  ]);
});

test("purpose exists", () => {
  assertIncludesAll([
    "This boundary freezes the completed PROVE_ONLY runtime-gate implementation candidate inventory status/gap review as repo evidence only.",
    "It is DOCS_ONLY, non-authorizing, partial/gap, status/gap only",
    "Runtime-gate inventory is not implementation.",
    "Status/gap boundary does not mean implementation-readiness, implementation, evidence existence, blocker closure, or dependency closure.",
  ]);
});

test("source hierarchy exists", () => {
  assertIncludesAll([
    "LIVE_REPO_EVIDENCE_WINS",
    "TRACKED_REPO_EVIDENCE_CONTROLS_CURRENT_STATE",
    "NEW_THREAD_HANDOFF_FILE_IS_CONTEXT_ONLY",
    "IMPLEMENTATION_READINESS_ENTRY_CRITERIA_BOUNDARY_CONTROLS_ENTRY_RULES",
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
    "cddbb75 docs(domain): freeze runtime gate implementation candidate inventory scope boundary",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_ENTRY_CANDIDATE_SCOPE_BOUNDARY_DOCS_ONLY_FROZEN_AND_COMMITTED",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_ENTRY_CANDIDATE_SCOPE_BOUNDARY_REVIEWED_AND_PAUSED_NO_CHANGE",
    "NEXT_PHASE_SELECTED_AFTER_RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_SCOPE_BOUNDARY_PAUSE_NO_CHANGE",
    "PROVE_ONLY_RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_STATUS_GAP_COMPLETED_NO_CHANGE",
    "COMBINED_READ_ONLY_RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_SCOPE_BOUNDARY_PAUSE_AND_STATUS_GAP_REVIEW_COMPLETED_NO_CHANGE",
    "PROVE_ONLY_RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_STATUS_GAP_REVIEWED_PARTIAL_GAP_NON_AUTHORIZING_AND_PAUSED_NO_CHANGE",
    "NEXT_PHASE_SELECTED_AFTER_RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_STATUS_GAP_PAUSE_NO_CHANGE",
    "COMBINED_READ_ONLY_RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_STATUS_GAP_PAUSE_AND_NEXT_PHASE_SELECTION_COMPLETED_NO_CHANGE",
    "The current safe posture remains continued pause.",
  ]);
});

test("prior PROVE_ONLY status/gap result exists", () => {
  assertIncludesAll([
    "The PROVE_ONLY review was read-only.",
    "The result was PARTIAL_GAP_REQUIRES_DOCS_ONLY_RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_STATUS_GAP_BOUNDARY.",
    "A future DOCS_ONLY status/gap boundary is suitable.",
    "This boundary freezes that partial/gap result only.",
    "This boundary does not alter status/gap result into implementation-readiness, implementation, blocker closure, or dependency closure.",
  ]);
});

test("RGI status/gap matrix exists and all rows exist", () => {
  assertIncludesAll([
    "row ID",
    "control/gate surface",
    "current evidence level",
    "current blocker status",
    "implementation/control gap",
    "required implementation or authorization evidence",
    "required test/CI evidence",
    "closure criteria",
    "what remains non-authorized until closure",
    "Every row preserves DOCS_ONLY, status/gap only, partial/gap where applicable, no implementation-readiness authorization",
  ], matrix);

  for (let i = 1; i <= 25; i += 1) {
    const rowId = `RGI-SG-${String(i).padStart(3, "0")}`;
    assertIncludesAll([rowId], matrix);
  }
});

test("required implementation / authorization evidence definition exists", () => {
  assertIncludesAll([
    "tracked implementation diff where implementation is claimed",
    "scoped implementation rationale",
    "explicit affected and non-affected surfaces",
    "runtime-gate implementation evidence if runtime gates are claimed",
    "validator dispatch evidence if dispatch is claimed",
    "registry/lookup evidence if registry/lookup is claimed",
    "schema/validator enforcement evidence if schema/validator gates are claimed",
    "workflow enforcement evidence if workflow gates are claimed",
    "delivery/final-decision gate evidence if delivery/final-decision gates are claimed",
    "packet component approval gate evidence if packet gates are claimed",
    "generated PDF handling evidence if PDF handling gates are claimed",
    "local log handling evidence if local log handling gates are claimed",
    "product-candidate gate evidence if product-candidate gate is claimed",
    "external-use gate evidence if external-use gate is claimed",
    "retention/deletion implementation evidence if lifecycle dependency is claimed",
    "audit/access-log implementation evidence if audit/log dependency is claimed",
    "RBAC/admin-support implementation evidence if access-control dependency is claimed",
    "raw-material routing implementation evidence if raw routing dependency is claimed",
    "third-party/provider routing authorization if third-party/provider route is claimed",
    "DHC evidence/closure evidence if DHC closure is claimed",
    "no-raw/no-private/no-source-locator/no-token/no-URL posture",
    "rollback/fail-closed posture",
    "human/professional review preservation",
    "None of this evidence exists yet for runtime-gate implementation candidate inventory closure.",
  ]);
});

test("required test / CI evidence definition exists", () => {
  assertIncludesAll([
    "runtime gate tests if runtime gates are claimed",
    "validator dispatch tests if dispatch is claimed",
    "registry/lookup tests if registry/lookup is claimed",
    "schema/validator enforcement tests if schema gates are claimed",
    "workflow/prompt gate tests if workflow gates are claimed",
    "delivery/final-decision gate tests if delivery gates are claimed",
    "packet component approval tests if packet gates are claimed",
    "generated PDF handling tests if generated PDF handling is claimed",
    "local log handling tests if local log handling is claimed",
    "product-candidate gate tests if product-candidate gate is claimed",
    "external-use gate tests if external-use gate is claimed",
    "retention/deletion tests if lifecycle dependency is claimed",
    "audit/access-log tests if audit/log dependency is claimed",
    "RBAC/admin-support tests if access-control dependency is claimed",
    "raw-material routing tests if raw-routing dependency is claimed",
    "third-party/provider routing tests if third-party route is claimed",
    "no-raw/no-private/no-source-locator/no-token/no-URL tests",
    "no-implementation-readiness-overclaim tests",
    "no-release-approval-overclaim tests",
    "no-product-candidate-overclaim tests",
    "no-external-use-overclaim tests",
    "CI evidence proof only if CI is separately claimed",
    "None of this test/CI evidence exists yet for runtime-gate implementation candidate inventory closure.",
  ]);
});

test("dependency links exist", () => {
  assertIncludesAll([
    "Dependencies 001 through 007 remain not closed.",
    "DHC evidence/closure requirements remain future-only.",
    "Runtime gate inventory remains not implementation.",
    "Validator dispatch remains not created.",
    "Registry/lookup remains not created.",
    "Schema/validator enforcement remains absent.",
    "Workflow enforcement remains absent.",
    "Delivery/final-decision gates remain not implemented.",
    "Packet component approval gates remain not implemented.",
    "Generated PDF handling gates remain not implemented.",
    "Local log handling gates remain not implemented.",
    "Product-candidate gate remains not implemented.",
    "External-use gate remains not implemented.",
    "RBAC/admin-support implementation remains absent.",
    "Audit/access-log implementation remains absent.",
    "Retention/deletion implementation remains absent.",
    "Raw-material routing implementation remains absent.",
    "Third-party routing remains unauthorized.",
    "Provider integration remains absent.",
    "Provider registry/status remains absent.",
    "Provider data-routing map remains absent.",
    "Token/URL/secret handling remains unresolved.",
    "Complete global access-control threat model remains not closed.",
    "CI evidence remains not created.",
    "Local logs remain not CI evidence.",
    "Local logs remain not packet components.",
    "Product candidate remains none.",
    "External-use remains unauthorized.",
    "Human/professional review remains release gate.",
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
    "This boundary authorizes no implementation-readiness",
    "runtime/API/schema/package behavior change",
    "runtime gate inventory selection as implementation",
    "third-party routing implementation or authorization",
    "local log promotion to CI evidence",
    "local log promotion to packet component",
    "raw/private/source inspection",
    "PDF/image/screenshot/metadata inspection",
    "metadata acquisition",
    "real private run",
    "blocker resolution",
    "dependency closure",
    "finding",
    "severity",
    "remediation",
    "local log file inspection",
    "delivery package generation",
  ]);
});

test("no-overclaim rules exist", () => {
  assertIncludesAll([
    "Status/gap boundary does not mean implementation-readiness authorization.",
    "Status/gap boundary does not mean implementation.",
    "Status/gap boundary does not mean runtime readiness.",
    "Status/gap boundary does not mean runtime/API/schema/package behavior change.",
    "Status/gap boundary does not mean runtime gate implementation.",
    "Status/gap boundary does not mean runtime gate inventory as implementation.",
    "Status/gap boundary does not mean validator dispatch.",
    "Status/gap boundary does not mean registry/lookup.",
    "Status/gap boundary does not mean schema/validator enforcement.",
    "Status/gap boundary does not mean workflow enforcement.",
    "Status/gap boundary does not mean blocker resolution.",
    "Status/gap boundary does not mean dependency closure.",
    "Runtime gate inventory row does not mean runtime gate inventory as implementation.",
    "Runtime gate candidate row does not mean runtime gate implementation.",
    "Validator dispatch row does not mean validator dispatch exists.",
    "Registry/lookup row does not mean registry/lookup exists.",
    "Schema/validator gate row does not mean schema/validator enforcement exists.",
    "Workflow/prompt gate row does not mean workflow enforcement exists.",
    "Delivery/final-decision gate row does not mean delivery or final decision exists.",
    "Packet component approval gate row does not mean packet component approval exists.",
    "Generated PDF handling gate row does not mean generated PDF is repo evidence or packet component.",
    "Local log handling gate row does not mean local logs are CI evidence or packet components.",
    "Product-candidate gate row does not mean product candidate selected.",
    "External-use gate row does not mean external-use authorized.",
    "Retention/deletion dependency row does not mean retention/deletion implementation.",
    "Audit/access-log dependency row does not mean audit/access-log implementation.",
    "RBAC/admin-support dependency row does not mean RBAC/admin-support implementation.",
    "Raw-material routing dependency row does not mean raw-material routing implementation.",
    "Third-party/provider dependency row does not mean third-party routing authorization.",
    "DHC evidence/closure requirements row does not mean DHC evidence exists or closure exists.",
    "Required implementation evidence does not mean implementation evidence exists.",
    "Required test evidence does not mean test evidence exists.",
    "Required CI evidence does not mean CI evidence exists.",
    "Continued pause remains valid.",
    "Human/professional review remains release gate.",
  ]);
});

test("recommended next posture is review-only or continued pause only", () => {
  assertIncludesAll([
    "REVIEW_ONLY_RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_STATUS_GAP_BOUNDARY",
    "REVIEW_ONLY_RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_EVIDENCE_AND_CLOSURE_PLAN_BOUNDARY",
    "continued pause",
    "None are authorized by this boundary.",
  ], recommendations);
  assert.doesNotMatch(recommendations, /DOCS_ONLY_RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_EVIDENCE_AND_CLOSURE_PLAN_BOUNDARY/);
  assert.doesNotMatch(recommendations, /RUNTIME_CHANGE/);
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
