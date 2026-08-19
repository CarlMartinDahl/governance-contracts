import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const DOC_PATH =
  "docs/DOMAIN_CONTRACTS_MODEL_COMPLETION_READINESS_ROADMAP_BOUNDARY_v1.md";
const doc = readFileSync(DOC_PATH, "utf8");

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function assertIncludesAll(entries) {
  for (const entry of entries) {
    assert.match(doc, new RegExp(escapeRegExp(entry)), `missing ${entry}`);
  }
}

test("model completion readiness roadmap boundary doc exists", () => {
  assert.equal(existsSync(DOC_PATH), true);
});

test("identity and status tokens exist", () => {
  assertIncludesAll([
    "MODEL_COMPLETION_READINESS_ROADMAP_BOUNDARY",
    "DOCS_ONLY",
    "MODEL_COMPLETION_READINESS_ROADMAP_ONLY",
    "COMPLETION_READINESS_NOT_COMPLETION",
    "COMPLETION_ROADMAP_NOT_IMPLEMENTATION",
    "COMPLETION_ROADMAP_NOT_IMPLEMENTATION_READINESS_AUTHORIZATION",
    "COMPLETION_ROADMAP_NOT_RUNTIME_CERTIFICATION",
    "COMPLETION_ROADMAP_NOT_RELEASE_APPROVAL",
    "COMPLETION_ROADMAP_NOT_TECHNICAL_SIGN_OFF",
    "COMPLETION_ROADMAP_NOT_EXTERNAL_REVIEWER_APPROVAL",
    "COMPLETION_ROADMAP_NOT_PRODUCT_READINESS",
    "COMPLETION_ROADMAP_NOT_EXTERNAL_USE_AUTHORIZATION",
    "COMPLETION_ROADMAP_NOT_BLOCKER_RESOLUTION",
  ]);
});

test("source hierarchy exists", () => {
  assertIncludesAll([
    "LIVE_REPO_EVIDENCE_WINS",
    "TRACKED_REPO_EVIDENCE_CONTROLS_CURRENT_STATE",
    "STATIC_INSPECTION_RESULTS_ARE_REVIEW_CONTEXT_ONLY",
    "STAGE_1_TO_3_RESULTS_ARE_NOT_RUNTIME_CERTIFICATION",
    "EXTERNAL_REVIEW_REQUIREMENTS_IS_ADVISORY_CONTEXT_ONLY",
    "OLD_HANDOFF_FILES_ARE_HISTORICAL_CONTEXT_ONLY",
    "STALE_HANDOFF_MUST_NOT_SELECT_REOPEN_OR_CLOSE_SLICE",
  ]);
});

test("current completed state exists", () => {
  assertIncludesAll([
    "b6e45b9 docs(domain): freeze technical static inspection round summary boundary",
    "TECHNICAL_REPO_TEST_STATIC_INSPECTION_ROUND_STAGE_1_TO_3_SUMMARY_BOUNDARY_REVIEWED_AND_PAUSED_NO_CHANGE",
    "FULL_BLOCKER_FAMILY_REVIEW_ROUND_REVIEWED_CONSISTENT_BLOCKED_AND_PAUSED_NO_CHANGE",
    "EXCLUDED_PRIVATE_REVIEW_ARTIFACT_REVIEWED_AND_PAUSED_NO_CHANGE",
    "The current safe posture remains continued pause.",
  ]);
});

test("model-completion readiness definition exists", () => {
  assertIncludesAll([
    "closed governance/evidence baseline",
    "closed blocker dependency order",
    "tracked implementation evidence where implementation is later authorized",
    "tracked test evidence for each closed blocker",
    "CI evidence where CI is claimed",
    "no-raw/no-private/no-source handling evidence where relevant",
    "human/professional review gate preserved",
    "explicit product/external-use authorization only after separate review",
    "Static inspection is not closure.",
    "Docs-only roadmap is not closure.",
    "Reviewed blocker status is not blocker resolution.",
    "Future implementation evidence is not current implementation evidence.",
    "Future test evidence is not current closure.",
  ]);
});

test("dependency order exists", () => {
  assertIncludesAll([
    "1. Global access-control threat model and RBAC/admin-support authorization model.",
    "2. Audit/access-log foundation: event taxonomy, no-leak event paths, log schema, and log storage.",
    "3. Retention/deletion lifecycle policy and implementation prerequisites.",
    "4. Raw-material routing controls, including deny/quarantine posture for raw/private/source/package/PDF/image/metadata material.",
    "5. Third-party provider/routing prerequisites: provider status, data-routing map, provider retention posture, auditability, token/URL/secret handling, and no-route tests.",
    "6. Validator dispatch, registry/lookup, runtime gate inventory, and runtime gates only after the above blockers have tracked closure evidence.",
    "7. CI evidence and human/professional release gate before any product/external-use consideration.",
  ]);
});

test("roadmap matrix exists", () => {
  assertIncludesAll([
    "## Roadmap Matrix",
    "| roadmap ID | blocker family | dependency order | current evidence level | current blocker status | required prerequisite | required implementation evidence | required test evidence | closure criteria | what remains non-authorized until closure |",
    "Every roadmap row preserves unresolved or future-only status",
    "closure requires separate tracked implementation evidence and separate tracked test evidence",
  ]);
});

test("all roadmap rows exist", () => {
  assertIncludesAll([
    "MCR-RM-001",
    "MCR-RM-002",
    "MCR-RM-003",
    "MCR-RM-004",
    "MCR-RM-005",
    "MCR-RM-006",
    "MCR-RM-007",
    "MCR-RM-008",
    "MCR-RM-009",
    "MCR-RM-010",
    "MCR-RM-011",
    "MCR-RM-012",
    "MCR-RM-013",
    "MCR-RM-014",
    "MCR-RM-015",
    "MCR-RM-016",
    "MCR-RM-017",
  ]);
});

test("evidence limits exist", () => {
  assertIncludesAll([
    "Tests are tested-scenario evidence, not runtime certainty.",
    "Green tests are not release approval.",
    "Local logs are not CI evidence.",
    "DOCS_ONLY boundaries are not runtime enforcement.",
    "Prompt/workflow controls are not runtime enforcement.",
    "Route/case/capability evidence is not full RBAC/access-control.",
    "Schema validator evidence is not proof of all schemas or all runtime behavior.",
    "Compact digest context is not product readiness.",
    "Consolidated dossier context is not runtime certification.",
    "Static inspection results are review context only.",
    "Human/professional review remains release gate.",
    "Continued pause is valid.",
  ]);
});

test("remaining blockers exist", () => {
  assertIncludesAll([
    "RBAC/access-control implementation remains absent.",
    "Role fields remain absent.",
    "Permission fields remain absent.",
    "Role schema remains absent.",
    "Permission schema remains absent.",
    "Admin/support implementation remains absent.",
    "Admin/support model remains absent.",
    "Admin/support auth fields remain absent.",
    "Admin/support routes remain absent.",
    "Admin/support DB fields remain absent.",
    "Admin/support allowed/denied tests remain absent.",
    "Admin/support bypass-prevention tests remain absent.",
    "Audit/access-log implementation remains absent.",
    "Event taxonomy runtime code remains absent.",
    "Log schema/storage remains absent.",
    "Retention/deletion implementation remains absent.",
    "Raw-material routing implementation remains absent.",
    "Third-party routing implementation or authorization remains absent.",
    "Provider integration remains absent.",
    "Provider registry/status implementation remains absent.",
    "Data-routing map remains absent.",
    "Token/URL/secret handling remains unresolved.",
    "Provider auditability implementation remains absent.",
    "Provider retention/deletion posture remains absent.",
    "Complete global access-control threat model remains unresolved.",
    "Runtime gate inventory remains deferred.",
    "Validator dispatch remains absent.",
    "Registry/lookup remains absent.",
    "CI evidence remains not created where only local logs exist.",
  ]);
});

test("negative authorization checks exist", () => {
  assertIncludesAll([
    "This boundary creates no implementation.",
    "This boundary creates no implementation-readiness authorization.",
    "This boundary creates no runtime behavior.",
    "This boundary creates no runtime/API/schema/package behavior change.",
    "This boundary creates no validator dispatch.",
    "This boundary creates no registry/lookup.",
    "This boundary creates no RBAC/access-control implementation.",
    "This boundary creates no role fields.",
    "This boundary creates no permission fields.",
    "This boundary creates no role schema.",
    "This boundary creates no permission schema.",
    "This boundary creates no admin/support implementation.",
    "This boundary creates no admin/support model.",
    "This boundary creates no admin/support auth fields.",
    "This boundary creates no admin/support routes.",
    "This boundary creates no admin/support DB fields.",
    "This boundary creates no admin/support allowed/denied tests.",
    "This boundary creates no admin/support bypass-prevention tests.",
    "This boundary creates no audit/access-log implementation.",
    "This boundary creates no event taxonomy runtime code.",
    "This boundary creates no log schema/storage.",
    "This boundary creates no retention/deletion implementation.",
    "This boundary creates no deletion/purge/lifecycle runtime behavior.",
    "This boundary creates no raw-material routing implementation.",
    "This boundary creates no third-party routing implementation or authorization.",
    "This boundary creates no provider integration.",
    "This boundary creates no provider registry/status implementation.",
    "This boundary creates no data-routing map.",
    "This boundary creates no token/URL/secret handling.",
    "This boundary creates no provider auditability implementation.",
    "This boundary creates no provider retention/deletion posture implementation.",
    "This boundary creates no runtime gate implementation.",
    "This boundary creates no runtime gate inventory as implementation.",
    "This boundary creates no raw/private/source inspection.",
    "This boundary creates no source package inspection.",
    "This boundary creates no PDF/image/screenshot/metadata inspection.",
    "This boundary creates no metadata acquisition.",
    "This boundary creates no real private run.",
    "This boundary creates no local log file inspection.",
    "This boundary creates no CI evidence creation.",
    "This boundary creates no delivery to External Reviewer.",
    "This boundary creates no packet approval.",
    "This boundary creates no product candidate.",
    "This boundary creates no external-use authorization.",
    "This boundary creates no approval.",
    "This boundary creates no sign-off.",
    "This boundary creates no runtime certification.",
    "This boundary creates no technical sign-off.",
    "This boundary creates no External Reviewer approval.",
    "This boundary creates no legal/clinical/evidentiary/case-truth conclusion.",
    "This boundary creates no security finding.",
    "This boundary creates no vulnerability finding.",
    "This boundary creates no severity.",
    "This boundary creates no remediation.",
    "This boundary creates no blocker resolution.",
  ]);
});

test("no-overclaim rules exist", () => {
  assertIncludesAll([
    "Completion readiness roadmap does not mean model is complete.",
    "Dependency order does not mean implementation authorization.",
    "Required implementation evidence does not mean implementation exists.",
    "Required test evidence does not mean tests exist.",
    "Closure criteria do not mean closure.",
    "Runtime gate sequence does not mean runtime gates are authorized.",
    "Product/external-use readiness gate does not mean product/external-use is authorized.",
    "Human/professional review remains release gate.",
    "Continued pause remains valid.",
  ]);
});

test("recommended next posture is review-only or continued pause only", () => {
  assertIncludesAll([
    "REVIEW_ONLY_MODEL_COMPLETION_READINESS_ROADMAP_BOUNDARY",
    "continued pause",
    "None are authorized by this boundary.",
  ]);
});

test("exact overclaiming tokens are rejected", () => {
  [
    "MODEL_COMPLETION_READY",
    "MODEL_COMPLETION_CERTIFIED",
    "MODEL_COMPLETE",
    "MODEL_RUNTIME_READY",
    "MODEL_PRODUCT_READY",
    "MODEL_EXTERNAL_USE_READY",
    "COMPLETION_ROADMAP_AUTHORIZES_IMPLEMENTATION",
    "COMPLETION_ROADMAP_AUTHORIZES_RUNTIME",
    "COMPLETION_ROADMAP_AUTHORIZES_PRODUCT",
    "COMPLETION_ROADMAP_AUTHORIZES_EXTERNAL_USE",
    "IMPLEMENTATION_AUTHORIZED",
    "RUNTIME_CERTIFICATION_CREATED",
    "RELEASE_APPROVAL_CREATED",
    "TECHNICAL_SIGN_OFF_CREATED",
    "EXTERNAL_REVIEWER_APPROVAL_CREATED",
    "PRODUCT_READINESS_CREATED",
    "PRODUCT_CANDIDATE_SELECTED",
    "EXTERNAL_USE_AUTHORIZED",
    "BLOCKER_RESOLVED",
    "SECURITY_FINDING_CREATED",
    "VULNERABILITY_FINDING_CREATED",
    "SEVERITY_ASSIGNED",
    "REMEDIATION_RECOMMENDED",
    "REMEDIATION_IMPLEMENTED",
    "RBAC_IMPLEMENTED",
    "ADMIN_SUPPORT_IMPLEMENTED",
    "AUDIT_ACCESS_LOG_IMPLEMENTED",
    "EVENT_TAXONOMY_RUNTIME_CODE_CREATED",
    "LOG_SCHEMA_CREATED",
    "LOG_STORAGE_CREATED",
    "RETENTION_DELETION_IMPLEMENTED",
    "RAW_MATERIAL_ROUTING_IMPLEMENTED",
    "THIRD_PARTY_ROUTING_AUTHORIZED",
    "PROVIDER_INTEGRATION_CREATED",
    "PROVIDER_REGISTRY_CREATED",
    "DATA_ROUTING_MAP_CREATED",
    "TOKEN_SECRET_HANDLING_CREATED",
    "GLOBAL_ACCESS_CONTROL_IMPLEMENTED",
    "RUNTIME_GATE_IMPLEMENTED",
    "RUNTIME_GATE_INVENTORY_IMPLEMENTED",
    "VALIDATOR_DISPATCH_CREATED",
    "REGISTRY_LOOKUP_CREATED",
    "CI_EVIDENCE_CREATED",
    "LOCAL_LOGS_PROMOTED_TO_CI_EVIDENCE",
  ].forEach((forbiddenToken) => assert.doesNotMatch(doc, new RegExp(forbiddenToken)));
});
