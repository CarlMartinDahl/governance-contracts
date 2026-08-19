const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const docsPath = path.join(
  __dirname,
  "..",
  "docs",
  "DOMAIN_CONTRACTS_DATA_HANDLING_SECURITY_CONTROL_PLANE_IMPLEMENTATION_CONTROL_PLAN_AFTER_DHC_ALIGNMENT_BOUNDARY_v1.md",
);
const docsText = fs.readFileSync(docsPath, "utf8");

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function assertIncludesAll(entries, text = docsText) {
  for (const entry of entries) {
    assert.match(text, new RegExp(escapeRegExp(entry)), `missing ${entry}`);
  }
}

function assertDoesNotIncludeExactToken(entries, text = docsText) {
  for (const entry of entries) {
    const pattern = new RegExp(
      `(?<![A-Z0-9_])${escapeRegExp(entry)}(?![A-Z0-9_])`,
    );
    assert.doesNotMatch(text, pattern, `forbidden exact token ${entry}`);
  }
}

function sectionBetween(startHeading, endHeading) {
  const start = docsText.indexOf(startHeading);
  assert.notEqual(start, -1, `missing section ${startHeading}`);
  const end = endHeading
    ? docsText.indexOf(endHeading, start + startHeading.length)
    : docsText.length;
  assert.notEqual(end, -1, `missing end section ${endHeading}`);
  return docsText.slice(start, end);
}

const matrix = sectionBetween(
  "## DH-ICP Matrix",
  "## Implementation-Control-Plan Summary After DHC Alignment",
);
const recommendedNext = sectionBetween("## Recommended Next Posture");

test("boundary doc exists", () => {
  assert.equal(fs.existsSync(docsPath), true);
});

test("identity/status tokens exist", () => {
  assertIncludesAll([
    "DATA_HANDLING_IMPLEMENTATION_CONTROL_PLAN_AFTER_DHC_ALIGNMENT_BOUNDARY",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_IMPLEMENTATION_CONTROL_PLAN_AFTER_DHC_ALIGNMENT_BOUNDARY",
    "DOCS_ONLY",
    "DATA_HANDLING_IMPLEMENTATION_CONTROL_PLAN_AFTER_DHC_ALIGNMENT_ONLY",
    "DATA_HANDLING_IMPLEMENTATION_CONTROL_PLAN_AFTER_DHC_ALIGNMENT_PARTIAL_GAP_CONTEXT",
    "DATA_HANDLING_IMPLEMENTATION_CONTROL_PLAN_AFTER_DHC_ALIGNMENT_NON_AUTHORIZING",
    "DATA_HANDLING_IMPLEMENTATION_CONTROL_PLAN_AFTER_DHC_ALIGNMENT_NOT_DHC_IMPLEMENTATION",
    "DATA_HANDLING_IMPLEMENTATION_CONTROL_PLAN_AFTER_DHC_ALIGNMENT_NOT_DHC_CLOSURE",
    "DATA_HANDLING_IMPLEMENTATION_CONTROL_PLAN_AFTER_DHC_ALIGNMENT_NOT_IMPLEMENTATION_READINESS_AUTHORIZATION",
    "DATA_HANDLING_IMPLEMENTATION_CONTROL_PLAN_AFTER_DHC_ALIGNMENT_NOT_IMPLEMENTATION",
    "DATA_HANDLING_IMPLEMENTATION_CONTROL_PLAN_AFTER_DHC_ALIGNMENT_NOT_RUNTIME_BEHAVIOR",
    "DATA_HANDLING_IMPLEMENTATION_CONTROL_PLAN_AFTER_DHC_ALIGNMENT_NOT_RUNTIME_API_SCHEMA_PACKAGE_BEHAVIOR_CHANGE",
    "DATA_HANDLING_IMPLEMENTATION_CONTROL_PLAN_AFTER_DHC_ALIGNMENT_NOT_RUNTIME_GATE_MOVEMENT",
    "DATA_HANDLING_IMPLEMENTATION_CONTROL_PLAN_AFTER_DHC_ALIGNMENT_NOT_LOCAL_SANITIZED_TEST_PILOT",
    "DATA_HANDLING_IMPLEMENTATION_CONTROL_PLAN_AFTER_DHC_ALIGNMENT_NOT_REAL_PRIVATE_RUN",
    "DATA_HANDLING_IMPLEMENTATION_CONTROL_PLAN_AFTER_DHC_ALIGNMENT_NOT_CI_EVIDENCE",
    "DATA_HANDLING_IMPLEMENTATION_CONTROL_PLAN_AFTER_DHC_ALIGNMENT_NOT_RELEASE_APPROVAL",
    "DATA_HANDLING_IMPLEMENTATION_CONTROL_PLAN_AFTER_DHC_ALIGNMENT_NOT_PRODUCT_CANDIDATE",
    "DATA_HANDLING_IMPLEMENTATION_CONTROL_PLAN_AFTER_DHC_ALIGNMENT_NOT_EXTERNAL_USE_AUTHORIZATION",
    "DATA_HANDLING_IMPLEMENTATION_CONTROL_PLAN_AFTER_DHC_ALIGNMENT_NOT_BLOCKER_RESOLUTION",
    "DATA_HANDLING_IMPLEMENTATION_CONTROL_PLAN_AFTER_DHC_ALIGNMENT_NOT_DEPENDENCY_CLOSURE",
    "DATA_HANDLING_IMPLEMENTATION_CONTROL_PLAN_REMAINS_BEFORE_D006_RUNTIME_GATE_MOVEMENT",
    "DHC_REMAINS_UNRESOLVED_NOT_CLOSED",
    "D001_TO_D007_REMAIN_UNRESOLVED_NOT_CLOSED",
    "RUNTIME_GATE_MOVEMENT_REMAINS_DOWNSTREAM",
    "RETENTION_DELETION_ENCRYPTION_REQUIRED_BEFORE_REAL_PRIVATE_RUN",
    "LOCAL_SANITIZED_TEST_PILOT_REMAINS_FUTURE_SCOPE_ONLY",
    "REAL_PRIVATE_RUN_REMAINS_BLOCKED",
    "DATA_HANDLING_IMPLEMENTATION_CONTROL_PLAN_AFTER_DHC_ALIGNMENT_CONTINUED_PAUSE",
  ]);
});

test("purpose exists", () => {
  assertIncludesAll([
    "This boundary freezes the completed read-only data-handling implementation-control-plan review after DHC alignment as DOCS_ONLY repo evidence only.",
    "The review result was `PARTIAL_GAP_REQUIRES_DOCS_ONLY_DATA_HANDLING_IMPLEMENTATION_CONTROL_PLAN_AFTER_DHC_ALIGNMENT_BOUNDARY`.",
    "DHC implementation-control planning remains before D006 runtime-gate movement.",
    "Retention, deletion, encryption, audit/access-log, RBAC/admin-support, raw-material routing, third-party/provider routing, access control beyond route/case behavior, and complete global access-control threat model remain unresolved or not implemented.",
    "This boundary does not authorize DHC implementation, DHC closure, implementation-readiness, implementation, runtime/API/schema/package behavior, runtime-gate movement, CI evidence, release approval, product candidate, external-use, local sanitized pilot execution, real private run, blocker resolution, or dependency closure.",
  ]);
});

test("source hierarchy exists", () => {
  assertIncludesAll([
    "LIVE_REPO_EVIDENCE_WINS",
    "TRACKED_REPO_EVIDENCE_CONTROLS_CURRENT_STATE",
    "NEW_THREAD_HANDOFF_FILE_IS_CONTEXT_ONLY",
    "DHC_ALIGNMENT_AFTER_D001_D007_REPRIORITIZATION_BOUNDARY_CONTROLS_CURRENT_DHC_ALIGNMENT_CONTEXT",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_ENTRY_CANDIDATE_SCOPE_BOUNDARY_CONTROLS_DHC_SCOPE",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_STATUS_GAP_BOUNDARY_CONTROLS_DHC_STATUS_GAP",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_EVIDENCE_CLOSURE_PLAN_BOUNDARY_CONTROLS_DHC_EVIDENCE_CLOSURE_PLAN",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_PLANNING_ROUND_SUMMARY_CONTROLS_DHC_PLANNING_CONTEXT",
    "DEPENDENCY_001_TO_007_POST_TRUST_SPINE_REPRIORITIZATION_BOUNDARY_CONTROLS_CURRENT_DEPENDENCY_ORDER",
    "ROADMAP_DEPENDENCIES_001_TO_007_BLOCKED_COMPLETION_ROUND_SUMMARY_CONTROLS_DEPENDENCY_CONTEXT",
    "D001_RBAC_ADMIN_SUPPORT_PLANNING_SUMMARY_CONTROLS_D001_CONTEXT",
    "D002_AUDIT_ACCESS_LOG_PLANNING_SUMMARY_CONTROLS_D002_CONTEXT",
    "D003_RETENTION_DELETION_PLANNING_SUMMARY_CONTROLS_D003_CONTEXT",
    "D004_RAW_MATERIAL_ROUTING_PLANNING_SUMMARY_CONTROLS_D004_CONTEXT",
    "D005_THIRD_PARTY_PROVIDER_ROUTING_PLANNING_SUMMARY_CONTROLS_D005_CONTEXT",
    "D006_VALIDATOR_REGISTRY_RUNTIME_GATE_PLANNING_SUMMARY_CONTROLS_D006_CONTEXT",
    "D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_PLANNING_SUMMARY_CONTROLS_D007_CONTEXT",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_PLANNING_ROUND_SUMMARY_BOUNDARY_CONTROLS_RUNTIME_GATE_CONTEXT",
    "EXTERNAL_REVIEW_REQUIREMENTS_USED_AS_ADVISORY_CONTEXT_ONLY",
    "OLD_HANDOFF_FILES_ARE_HISTORICAL_CONTEXT_ONLY",
    "STALE_HANDOFF_MUST_NOT_SELECT_REOPEN_OR_CLOSE_SLICE",
  ]);
});

test("current accepted state exists", () => {
  assertIncludesAll([
    "10f35f1 docs(context): refresh new-thread handoff after DHC alignment boundary",
    "58c4e4f docs(domain): freeze DHC alignment after D001-D007 reprioritization boundary",
    "39c28ea docs(domain): freeze D001-D007 post-trust-spine reprioritization boundary",
    "DHC_ALIGNMENT_AND_HANDOFF_REVIEWED_AND_PAUSED_NO_CHANGE",
    "REVIEW_ONLY_DATA_HANDLING_IMPLEMENTATION_CONTROL_PLAN_AFTER_DHC_ALIGNMENT_COMPLETED_NO_CHANGE",
    "POST_DHC_ALIGNMENT_DATA_HANDLING_IMPLEMENTATION_CONTROL_PLAN_RECOMMENDATION_SELECTED_NO_CHANGE",
    "COMBINED_READ_ONLY_DATA_HANDLING_IMPLEMENTATION_CONTROL_PLAN_AFTER_DHC_ALIGNMENT_COMPLETED_NO_CHANGE",
    "RECOVERY_AFTER_INTERRUPTED_DATA_HANDLING_IMPLEMENTATION_CONTROL_PLAN_AFTER_DHC_ALIGNMENT_WRITE_SLICE_COMPLETED_NO_CHANGE",
    "The current safe posture remains continued pause until a separate next posture is selected.",
  ]);
});

test("prior read-only review result exists", () => {
  assertIncludesAll([
    "The REVIEW_ONLY data-handling implementation-control-plan review after DHC alignment was performed.",
    "The result was `PARTIAL_GAP_REQUIRES_DOCS_ONLY_DATA_HANDLING_IMPLEMENTATION_CONTROL_PLAN_AFTER_DHC_ALIGNMENT_BOUNDARY`.",
    "A future DOCS_ONLY data-handling implementation-control-plan boundary is suitable.",
    "This boundary freezes that partial/gap result only.",
    "This boundary does not convert control planning into DHC implementation, DHC closure, implementation-readiness authorization, implementation, runtime behavior, CI evidence, release approval, product candidate, external-use authorization, local sanitized pilot execution, real private run, blocker closure, or dependency closure.",
  ]);
});

test("DH-ICP matrix exists", () => {
  assertIncludesAll([
    "row ID",
    "control-plan surface",
    "current tracked evidence level",
    "relation to DHC alignment and D001-D007 order",
    "current blocker status",
    "upstream dependencies",
    "downstream dependencies",
    "intended future enforcement layer, if any",
    "implementation gap",
    "required future implementation or authorization evidence",
    "required future test/CI evidence",
    "what remains non-authorized",
    "Every row preserves DOCS_ONLY control-plan only, partial/gap where applicable, no DHC implementation, no DHC closure, no implementation-readiness authorization, no implementation, no runtime/API/schema/package behavior change, no runtime-gate movement, no CI evidence, no release approval, no product candidate, no external-use, no local sanitized pilot execution, no real private run, no blocker resolution, no dependency closure, and continued pause.",
  ], matrix);
});

test("all DH-ICP rows exist", () => {
  const rows = Array.from({ length: 20 }, (_, index) =>
    `| DH-ICP-${String(index + 1).padStart(3, "0")} |`,
  );
  assertIncludesAll(rows, matrix);
});

test("required row content exists", () => {
  assertIncludesAll([
    "DHC implementation-control-plan posture after DHC alignment",
    "DHC implementation-control-plan posture remains DOCS_ONLY partial/gap and must stay before D006 runtime-gate movement",
    "retention remains blocked and depends on D003",
    "future retention enforcement/tests/CI are required only if separately authorized",
    "deletion remains blocked and depends on D003",
    "future deletion/purge/idempotency proof is absent",
    "encryption remains blocked and cross-cuts D001-D007",
    "future encryption evidence/tests are absent",
    "audit/access-log remains blocked and depends on D002",
    "must stay no-content/no-raw and not local-log-as-CI",
    "RBAC remains blocked and depends on D001",
    "future role/permission/access tests are absent",
    "admin/support remains blocked and depends on D001",
    "future privileged-access/bypass tests are absent",
    "raw routing remains blocked and depends on D004",
    "must remain no-raw/no-private/no-locator/no-token/no-URL",
    "third-party remains blocked/unauthorized and depends on D005",
    "provider status/routing evidence is absent unless separately authorized",
    "access beyond route/case behavior remains unresolved and depends on D001",
    "complete global access-control threat model remains blocked and depends on D001",
    "no-raw posture is posture only, not enforcement",
    "local sanitized test pilot remains future discussion only and not execution authorization",
    "real private run remains blocked; retention/deletion/encryption/audit/RBAC/raw/third-party prerequisites remain open",
    "runtime gates remain downstream of D001-D005/DHC; no validator dispatch, registry, or movement exists",
    "implementation evidence is absent",
    "test evidence is partial/tested-scenario only",
    "CI evidence is absent; local logs are not CI evidence",
    "closure criteria are not met and remain future-only",
    "continued pause preserves no approvals, sign-offs, findings, severity, remediation, product, external-use, delivery, or packet approval",
  ], matrix);
});

test("implementation-control-plan summary exists", () => {
  assertIncludesAll([
    "DHC implementation-control planning should remain before D006 runtime-gate movement.",
    "Retention/deletion/encryption must be specified before any real private run.",
    "Audit/access-log must remain no-content/no-raw and must not treat local logs as CI evidence.",
    "RBAC/admin-support/global access-control threat model remain upstream blockers.",
    "Raw-material routing must preserve no-raw/no-private/no-source-locator/no-token/no-URL.",
    "Third-party model/API status remains unauthorized and upstream of runtime gates.",
    "Local sanitized test pilot can be discussed later only as a separate scope and without execution authorization now.",
    "Real private run remains blocked.",
    "No dependency can be closed now.",
    "No implementation-readiness authorization is created now.",
    "No implementation is created now.",
  ]);
});

test("required non-authorizations exist", () => {
  assertIncludesAll([
    "implementation-readiness",
    "implementation",
    "runtime behavior",
    "runtime/API/schema/package behavior change",
    "DHC implementation",
    "DHC closure",
    "retention implementation",
    "deletion implementation",
    "encryption implementation",
    "audit/access-log implementation",
    "event taxonomy runtime code",
    "log schema",
    "log storage",
    "RBAC implementation",
    "admin/support implementation",
    "role permissions implementation",
    "raw-material routing implementation",
    "third-party routing implementation or authorization",
    "provider integration",
    "provider registry",
    "provider status implementation",
    "data-routing map implementation",
    "token/URL/secret handling implementation",
    "global access-control threat model closure",
    "runtime gate implementation",
    "runtime gate movement",
    "runtime gate inventory as implementation",
    "validator dispatch",
    "registry/lookup",
    "CI evidence",
    "release approval",
    "runtime certification",
    "technical sign-off",
    "External Reviewer approval",
    "product candidate",
    "external-use authorization",
    "delivery to External Reviewer",
    "packet approval",
    "final delivery decision",
    "PDF packet",
    "archive/ZIP",
    "raw/private/source inspection",
    "source package inspection",
    "PDF/image/screenshot/metadata inspection",
    "metadata acquisition",
    "local sanitized test pilot execution",
    "real private run",
    "blocker resolution",
    "dependency closure",
    "finding",
    "severity",
    "remediation",
  ]);
});

test("evidence limits exist", () => {
  assertIncludesAll([
    "implementation-control-plan boundary is not DHC implementation.",
    "implementation-control-plan boundary is not DHC closure.",
    "implementation-control-plan boundary is not implementation-readiness authorization.",
    "implementation-control-plan boundary is not implementation.",
    "implementation-control-plan boundary is not implementation evidence.",
    "control plan does not mean blocker resolution.",
    "ordering does not mean closure.",
    "required implementation evidence does not mean evidence exists.",
    "required tests do not mean tests exist.",
    "required CI does not mean CI exists.",
    "tests remain tested-scenario evidence, not runtime certainty.",
    "local logs are not CI evidence.",
    "local logs are not packet components.",
    "green tests are not release approval.",
    "DOCS_ONLY boundaries are not runtime enforcement.",
    "route/case/capability evidence is not full RBAC/access-control.",
    "route/case/capability evidence is not admin/support access-control.",
    "route/case/capability evidence is not global authorization model.",
    "runtime gate inventory is not implementation.",
    "CI evidence requires separate explicit CI evidence creation.",
    "product candidate requires separate explicit selection.",
    "external-use requires separate explicit authorization.",
    "human/professional review remains release gate.",
    "continued pause is valid.",
  ]);
});

test("no-overclaim rules exist", () => {
  assertIncludesAll([
    "data-handling implementation-control plan does not mean DHC implementation.",
    "data-handling implementation-control plan does not mean DHC closure.",
    "DHC control planning before D006 does not mean runtime gates may move now.",
    "retention control row does not mean retention exists.",
    "deletion control row does not mean deletion exists.",
    "encryption control row does not mean encryption exists.",
    "audit/access-log control row does not mean audit/access-log exists.",
    "RBAC control row does not mean RBAC exists.",
    "admin/support control row does not mean admin/support access-control exists.",
    "raw-routing control row does not mean raw routing exists.",
    "third-party control row does not mean third-party routing is authorized.",
    "local sanitized pilot implication does not mean pilot authorization.",
    "real private run blocker preservation does not mean real private run authorization.",
    "required tests do not mean tests exist.",
    "required CI does not mean CI exists.",
    "closure criteria do not mean closure.",
    "any future implementation-readiness authorization requires separate explicit authorization.",
    "any future implementation requires separate explicit authorization.",
  ]);
});

test("External Reviewer posture exists", () => {
  assertIncludesAll([
    "No external-review request is required by this boundary.",
    '"Should we freeze a DOCS_ONLY data-handling implementation-control-plan boundary after DHC alignment, preserving no implementation, no closure, no pilot execution, no real private run, no runtime-gate movement, no product, and no external-use authorization?"',
    "external-review requirements remains advisory context only, not approval, sign-off, implementation-readiness authorization, implementation authorization, release approval, product candidate, external-use authorization, local sanitized pilot authorization, real private run authorization, runtime-gate movement authorization, or DHC closure.",
  ]);
});

test("recommended next posture is limited and non-authorized", () => {
  assertIncludesAll([
    "REVIEW_ONLY_DATA_HANDLING_IMPLEMENTATION_CONTROL_PLAN_AFTER_DHC_ALIGNMENT_BOUNDARY",
    "DOCS_ONLY_NEW_THREAD_HANDOFF_REFRESH_AFTER_DATA_HANDLING_IMPLEMENTATION_CONTROL_PLAN_AFTER_DHC_ALIGNMENT_BOUNDARY",
    "continued pause",
    "None are authorized by this boundary.",
  ], recommendedNext);
});

test("overclaiming tokens are absent", () => {
  assertDoesNotIncludeExactToken([
    "DATA_HANDLING_CONTROL_PLAN_AUTHORIZES_IMPLEMENTATION_READINESS",
    "DATA_HANDLING_CONTROL_PLAN_AUTHORIZES_IMPLEMENTATION",
    "DATA_HANDLING_CONTROL_PLAN_CREATES_DHC_IMPLEMENTATION",
    "DATA_HANDLING_CONTROL_PLAN_CREATES_DHC_CLOSURE",
    "DATA_HANDLING_CONTROL_PLAN_CREATES_RUNTIME_GATE_MOVEMENT",
    "DATA_HANDLING_CONTROL_PLANE_IMPLEMENTED",
    "DATA_HANDLING_CONTROL_PLANE_CLOSED",
    "DHC_IMPLEMENTED",
    "DHC_CLOSED",
    "DHC_BLOCKER_RESOLVED",
    "RETENTION_IMPLEMENTED",
    "DELETION_IMPLEMENTED",
    "ENCRYPTION_IMPLEMENTED",
    "AUDIT_ACCESS_LOG_IMPLEMENTED",
    "EVENT_TAXONOMY_RUNTIME_CODE_CREATED",
    "LOG_SCHEMA_CREATED",
    "LOG_STORAGE_CREATED",
    "RBAC_IMPLEMENTED",
    "ADMIN_SUPPORT_IMPLEMENTED",
    "ROLE_PERMISSION_MODEL_IMPLEMENTED",
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
    "RUNTIME_GATE_MOVEMENT_AUTHORIZED",
    "RUNTIME_GATE_INVENTORY_IMPLEMENTED",
    "VALIDATOR_DISPATCH_CREATED",
    "REGISTRY_LOOKUP_CREATED",
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
    "RELEASE_APPROVAL_CREATED",
    "RUNTIME_CERTIFICATION_CREATED",
    "TECHNICAL_SIGN_OFF_CREATED",
    "EXTERNAL_REVIEWER_APPROVAL_CREATED",
    "PRODUCT_CANDIDATE_SELECTED",
    "EXTERNAL_USE_AUTHORIZED",
    "DELIVERY_TO_EXTERNAL_REVIEWER_AUTHORIZED",
    "PACKET_APPROVAL_CREATED",
    "FINAL_DELIVERY_DECISION_CREATED",
    "PDF_PACKET_CREATED",
    "ARCHIVE_ZIP_CREATED",
    "LOCAL_SANITIZED_TEST_PILOT_AUTHORIZED",
    "LOCAL_SANITIZED_TEST_PILOT_EXECUTED",
    "REAL_PRIVATE_RUN_AUTHORIZED",
    "REAL_PRIVATE_RUN_STARTED",
    "RAW_PRIVATE_SOURCE_INSPECTION_AUTHORIZED",
    "SOURCE_PACKAGE_INSPECTION_AUTHORIZED",
    "PDF_IMAGE_SCREENSHOT_METADATA_INSPECTION_AUTHORIZED",
    "METADATA_ACQUISITION_AUTHORIZED",
    "BLOCKER_RESOLVED",
    "DEPENDENCY_CLOSED",
    "SECURITY_FINDING_CREATED",
    "VULNERABILITY_FINDING_CREATED",
    "SEVERITY_ASSIGNED",
    "REMEDIATION_RECOMMENDED",
    "REMEDIATION_IMPLEMENTED",
  ]);
});
