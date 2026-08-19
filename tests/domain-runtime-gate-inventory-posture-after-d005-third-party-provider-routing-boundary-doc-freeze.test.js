const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const docsPath = path.join(
  __dirname,
  "..",
  "docs",
  "DOMAIN_CONTRACTS_RUNTIME_GATE_INVENTORY_POSTURE_AFTER_D005_THIRD_PARTY_PROVIDER_ROUTING_BOUNDARY_v1.md",
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
  "## D006-RGIP Matrix",
  "## Runtime-Gate Inventory Posture Summary After D005 Third-Party/Provider Routing",
);
const recommendations = sectionBetween("## Recommended Next Posture");

test("boundary doc exists", () => {
  assert.equal(fs.existsSync(docsPath), true);
});

test("identity/status tokens exist", () => {
  assertIncludesAll([
    "RUNTIME_GATE_INVENTORY_POSTURE_AFTER_D005_THIRD_PARTY_PROVIDER_ROUTING_BOUNDARY",
    "RUNTIME_GATE_INVENTORY_POSTURE_AFTER_D005_THIRD_PARTY_PROVIDER_ROUTING_ONLY",
    "DOCS_ONLY",
    "RUNTIME_GATE_INVENTORY_POSTURE_AFTER_D005_THIRD_PARTY_PROVIDER_ROUTING_PARTIAL_GAP_CONTEXT",
    "RUNTIME_GATE_INVENTORY_POSTURE_AFTER_D005_THIRD_PARTY_PROVIDER_ROUTING_NON_AUTHORIZING",
    "RUNTIME_GATE_INVENTORY_POSTURE_AFTER_D005_THIRD_PARTY_PROVIDER_ROUTING_NOT_IMPLEMENTATION_READINESS_AUTHORIZATION",
    "RUNTIME_GATE_INVENTORY_POSTURE_AFTER_D005_THIRD_PARTY_PROVIDER_ROUTING_NOT_IMPLEMENTATION",
    "RUNTIME_GATE_INVENTORY_POSTURE_AFTER_D005_THIRD_PARTY_PROVIDER_ROUTING_NOT_RUNTIME_BEHAVIOR",
    "RUNTIME_GATE_INVENTORY_POSTURE_AFTER_D005_THIRD_PARTY_PROVIDER_ROUTING_NOT_RUNTIME_API_SCHEMA_PACKAGE_BEHAVIOR_CHANGE",
    "RUNTIME_GATE_INVENTORY_POSTURE_AFTER_D005_THIRD_PARTY_PROVIDER_ROUTING_NOT_RUNTIME_GATE_IMPLEMENTATION",
    "RUNTIME_GATE_INVENTORY_POSTURE_AFTER_D005_THIRD_PARTY_PROVIDER_ROUTING_NOT_RUNTIME_GATE_MOVEMENT",
    "RUNTIME_GATE_INVENTORY_POSTURE_AFTER_D005_THIRD_PARTY_PROVIDER_ROUTING_NOT_RUNTIME_GATE_INVENTORY_AS_IMPLEMENTATION",
    "RUNTIME_GATE_INVENTORY_POSTURE_AFTER_D005_THIRD_PARTY_PROVIDER_ROUTING_NOT_VALIDATOR_DISPATCH",
    "RUNTIME_GATE_INVENTORY_POSTURE_AFTER_D005_THIRD_PARTY_PROVIDER_ROUTING_NOT_REGISTRY_LOOKUP",
    "RUNTIME_GATE_INVENTORY_POSTURE_AFTER_D005_THIRD_PARTY_PROVIDER_ROUTING_NOT_SCHEMA_ENFORCEMENT_CREATION",
    "RUNTIME_GATE_INVENTORY_POSTURE_AFTER_D005_THIRD_PARTY_PROVIDER_ROUTING_NOT_WORKFLOW_ENFORCEMENT_CREATION",
    "RUNTIME_GATE_INVENTORY_POSTURE_AFTER_D005_THIRD_PARTY_PROVIDER_ROUTING_NOT_RUNTIME_ENFORCEMENT_CREATION",
    "RUNTIME_GATE_INVENTORY_POSTURE_AFTER_D005_THIRD_PARTY_PROVIDER_ROUTING_NOT_GATE_ORDERING_ENFORCEMENT_CREATION",
    "RUNTIME_GATE_INVENTORY_POSTURE_AFTER_D005_THIRD_PARTY_PROVIDER_ROUTING_NOT_GATE_CLASSIFIER_IMPLEMENTATION",
    "RUNTIME_GATE_INVENTORY_POSTURE_AFTER_D005_THIRD_PARTY_PROVIDER_ROUTING_NOT_DECISION_EVENT_RUNTIME_CODE",
    "RUNTIME_GATE_INVENTORY_POSTURE_AFTER_D005_THIRD_PARTY_PROVIDER_ROUTING_NOT_EVENT_EMITTER",
    "RUNTIME_GATE_INVENTORY_POSTURE_AFTER_D005_THIRD_PARTY_PROVIDER_ROUTING_NOT_LOG_SCHEMA",
    "RUNTIME_GATE_INVENTORY_POSTURE_AFTER_D005_THIRD_PARTY_PROVIDER_ROUTING_NOT_LOG_STORAGE",
    "RUNTIME_GATE_INVENTORY_POSTURE_AFTER_D005_THIRD_PARTY_PROVIDER_ROUTING_NOT_CURRENT_LOGGING",
    "RUNTIME_GATE_INVENTORY_POSTURE_AFTER_D005_THIRD_PARTY_PROVIDER_ROUTING_NOT_CI_EVIDENCE",
    "RUNTIME_GATE_INVENTORY_POSTURE_AFTER_D005_THIRD_PARTY_PROVIDER_ROUTING_NOT_RELEASE_APPROVAL",
    "RUNTIME_GATE_INVENTORY_POSTURE_AFTER_D005_THIRD_PARTY_PROVIDER_ROUTING_NOT_PRODUCT_CANDIDATE",
    "RUNTIME_GATE_INVENTORY_POSTURE_AFTER_D005_THIRD_PARTY_PROVIDER_ROUTING_NOT_EXTERNAL_USE_AUTHORIZATION",
    "RUNTIME_GATE_INVENTORY_POSTURE_AFTER_D005_THIRD_PARTY_PROVIDER_ROUTING_NOT_LOCAL_SANITIZED_TEST_PILOT",
    "RUNTIME_GATE_INVENTORY_POSTURE_AFTER_D005_THIRD_PARTY_PROVIDER_ROUTING_NOT_REAL_PRIVATE_RUN",
    "RUNTIME_GATE_INVENTORY_POSTURE_AFTER_D005_THIRD_PARTY_PROVIDER_ROUTING_NOT_BLOCKER_RESOLUTION",
    "RUNTIME_GATE_INVENTORY_POSTURE_AFTER_D005_THIRD_PARTY_PROVIDER_ROUTING_NOT_DEPENDENCY_CLOSURE",
    "D006_REMAINS_UNRESOLVED_NOT_CLOSED",
    "D006_REMAINS_NEXT_REVIEW_ONLY_SURFACE_AFTER_D005",
    "D006_PRECEDES_LOCAL_PILOT_REAL_PRIVATE_RUN_D007",
    "RUNTIME_GATE_INVENTORY_REMAINS_INVENTORY_POSTURE_ONLY",
    "RUNTIME_GATE_INVENTORY_REMAINS_NOT_IMPLEMENTATION",
    "VALIDATOR_DISPATCH_REMAINS_ABSENT",
    "REGISTRY_LOOKUP_REMAINS_ABSENT",
    "RUNTIME_GATE_IMPLEMENTATION_REMAINS_ABSENT",
    "RUNTIME_GATE_MOVEMENT_REMAINS_ABSENT",
    "SCHEMA_ENFORCEMENT_CREATION_REMAINS_ABSENT",
    "WORKFLOW_ENFORCEMENT_CREATION_REMAINS_ABSENT",
    "RUNTIME_API_SCHEMA_PACKAGE_BEHAVIOR_REMAINS_UNCHANGED",
    "D001_D005_REMAIN_UNRESOLVED_NOT_CLOSED_NON_AUTHORIZING",
    "DHC_DATA_HANDLING_CONTROL_PLANE_REMAINS_PREREQUISITE_CONTEXT_ONLY",
    "LOCAL_SANITIZED_TEST_PILOT_REMAINS_FUTURE_SCOPE_ONLY",
    "REAL_PRIVATE_RUN_REMAINS_BLOCKED",
    "D007_REMAINS_DOWNSTREAM_UNAUTHORIZED",
    "RUNTIME_GATE_INVENTORY_POSTURE_AFTER_D005_THIRD_PARTY_PROVIDER_ROUTING_CONTINUED_PAUSE",
  ]);
});

test("purpose exists", () => {
  assertIncludesAll([
    "This boundary freezes the completed read-only runtime-gate inventory posture review after D005 third-party/provider routing as DOCS_ONLY repo evidence only.",
    "PARTIAL_GAP_REQUIRES_DOCS_ONLY_RUNTIME_GATE_INVENTORY_POSTURE_AFTER_D005_THIRD_PARTY_PROVIDER_ROUTING_BOUNDARY",
    "D006 runtime-gate inventory posture is the next suitable review-only surface after D005.",
    "D006 should precede local pilot execution, real private run, D007 release/product/external-use, and any runtime/API/schema/package behavior.",
    "Runtime-gate inventory remains inventory/posture only and not implementation.",
    "This boundary does not authorize runtime gate implementation, runtime gate movement, validator dispatch, registry/lookup, schema enforcement, workflow enforcement, runtime/API/schema/package behavior, CI evidence, release approval, product candidate, external-use, local sanitized pilot execution, real private run, blocker resolution, or dependency closure.",
  ]);
});

test("source hierarchy exists", () => {
  assertIncludesAll([
    "LIVE_REPO_EVIDENCE_WINS",
    "TRACKED_REPO_EVIDENCE_CONTROLS_CURRENT_STATE",
    "NEW_THREAD_HANDOFF_FILE_IS_CONTEXT_ONLY",
    "D005_THIRD_PARTY_PROVIDER_ROUTING_AFTER_D004_RAW_MATERIAL_ROUTING_BOUNDARY_CONTROLS_CURRENT_D005_CONTEXT",
    "D004_RAW_MATERIAL_ROUTING_AFTER_D003_RETENTION_DELETION_BOUNDARY_CONTROLS_CURRENT_D004_CONTEXT",
    "D003_RETENTION_DELETION_AFTER_D002_AUDIT_ACCESS_LOG_BOUNDARY_CONTROLS_CURRENT_D003_CONTEXT",
    "D002_AUDIT_ACCESS_LOG_AFTER_D001_RBAC_ADMIN_SUPPORT_BOUNDARY_CONTROLS_CURRENT_D002_CONTEXT",
    "D001_RBAC_ADMIN_SUPPORT_AFTER_DATA_HANDLING_CONTROL_PLAN_BOUNDARY_CONTROLS_CURRENT_D001_CONTEXT",
    "DATA_HANDLING_IMPLEMENTATION_CONTROL_PLAN_AFTER_DHC_ALIGNMENT_BOUNDARY_CONTROLS_CURRENT_DATA_HANDLING_CONTEXT",
    "DHC_ALIGNMENT_AFTER_D001_D007_REPRIORITIZATION_BOUNDARY_CONTROLS_CURRENT_DHC_ALIGNMENT_CONTEXT",
    "DEPENDENCY_001_TO_007_POST_TRUST_SPINE_REPRIORITIZATION_BOUNDARY_CONTROLS_CURRENT_DEPENDENCY_ORDER",
    "D006_VALIDATOR_REGISTRY_RUNTIME_GATE_PLANNING_SUMMARY_CONTROLS_D006_CONTEXT",
    "RUNTIME_GATE_INVENTORY_STATUS_DOCS_CONTROL_D006_CONTEXT_IF_PRESENT",
    "VALIDATOR_REGISTRY_RUNTIME_GATE_CONTEXT_IS_D006_CONTEXT_ONLY",
    "RBAC_ADMIN_SUPPORT_CONTEXT_IS_UPSTREAM_CONTEXT_ONLY",
    "AUDIT_ACCESS_LOG_CONTEXT_IS_UPSTREAM_CONTEXT_ONLY",
    "RETENTION_DELETION_CONTEXT_IS_UPSTREAM_CONTEXT_ONLY",
    "RAW_MATERIAL_ROUTING_CONTEXT_IS_UPSTREAM_CONTEXT_ONLY",
    "THIRD_PARTY_PROVIDER_ROUTING_CONTEXT_IS_UPSTREAM_CONTEXT_ONLY",
    "DHC_DATA_HANDLING_CONTEXT_IS_UPSTREAM_PREREQUISITE_CONTEXT_ONLY",
    "D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_CONTEXT_IS_DOWNSTREAM_CONTEXT_ONLY",
    "LOCAL_SANITIZED_PILOT_CONTEXT_IS_DOWNSTREAM_FUTURE_CONTEXT_ONLY",
    "EXTERNAL_REVIEW_REQUIREMENTS_USED_AS_ADVISORY_CONTEXT_ONLY",
    "OLD_HANDOFF_FILES_ARE_HISTORICAL_CONTEXT_ONLY",
    "STALE_HANDOFF_MUST_NOT_SELECT_REOPEN_OR_CLOSE_SLICE",
  ]);
});

test("current accepted state exists", () => {
  assertIncludesAll([
    "a57358f docs(context): refresh new-thread handoff after D005 third-party provider routing boundary",
    "78c27b5 docs(domain): freeze D005 third-party/provider routing after D004 raw-material routing boundary",
    "4f26035 docs(domain): freeze D004 raw material routing after D003 retention deletion boundary",
    "4fd0b26 docs(domain): freeze D003 retention deletion after D002 audit boundary",
    "af1fd3b docs(domain): freeze D002 audit access log after D001 boundary",
    "21f8c0d docs(domain): freeze D001 RBAC admin support after data handling control plan boundary",
    "070133e docs(domain): freeze data handling control plan after DHC alignment boundary",
    "58c4e4f docs(domain): freeze DHC alignment after D001-D007 reprioritization boundary",
    "39c28ea docs(domain): freeze D001-D007 post-trust-spine reprioritization boundary",
    "D005_THIRD_PARTY_PROVIDER_ROUTING_AND_HANDOFF_REVIEWED_AND_PAUSED_NO_CHANGE",
    "REVIEW_ONLY_RUNTIME_GATE_INVENTORY_POSTURE_AFTER_D005_THIRD_PARTY_PROVIDER_ROUTING_COMPLETED_NO_CHANGE",
    "POST_D005_THIRD_PARTY_PROVIDER_ROUTING_RUNTIME_GATE_INVENTORY_POSTURE_RECOMMENDATION_SELECTED_NO_CHANGE",
    "COMBINED_READ_ONLY_RUNTIME_GATE_INVENTORY_POSTURE_AFTER_D005_THIRD_PARTY_PROVIDER_ROUTING_COMPLETED_NO_CHANGE",
    "The current safe posture remains continued pause until a separate next posture is selected.",
  ]);
});

test("prior read-only review result exists", () => {
  assertIncludesAll([
    "The REVIEW_ONLY runtime-gate inventory posture after D005 third-party/provider routing was performed.",
    "A future DOCS_ONLY runtime-gate inventory posture boundary is suitable.",
    "This boundary freezes that partial/gap result only.",
    "This boundary does not convert review into runtime gate implementation, runtime gate movement, runtime gate inventory as implementation, validator dispatch, registry/lookup, schema enforcement, workflow enforcement, runtime/API/schema/package behavior, CI evidence, release approval, product candidate, external-use authorization, local sanitized pilot execution, real private run, blocker closure, or dependency closure.",
  ]);
});

test("D006-RGIP matrix exists and all rows exist", () => {
  assertIncludesAll([
    "row ID",
    "runtime-gate inventory surface",
    "current tracked evidence level",
    "relation to D005 and D001-D007 order",
    "current blocker status",
    "upstream dependencies",
    "downstream dependencies",
    "intended future enforcement layer, if any",
    "implementation gap",
    "required future implementation or authorization evidence",
    "required future test/CI evidence",
    "what remains non-authorized",
    "Every row preserves DOCS_ONLY review only",
  ], matrix);

  for (let index = 1; index <= 30; index += 1) {
    assertIncludesAll([`D006-RGIP-${String(index).padStart(3, "0")}`], matrix);
  }
});

test("required row content exists", () => {
  assertIncludesAll([
    "D006 planning posture remains DOCS_ONLY partial/gap after D005 before D007.",
    "D001-D005 prerequisite blockers are frozen as DOCS_ONLY blocker-review layers but remain unresolved/not closed.",
    "DHC/data-handling control-plane context remains reviewed/paused prerequisite context only; no DHC implementation or closure.",
    "Runtime-gate inventory remains inventory/posture only and not implementation.",
    "Validator dispatch is absent.",
    "Registry/lookup is absent.",
    "Schema/validator gate enforcement is absent.",
    "Workflow/prompt gate enforcement is absent.",
    "Human/professional review gate remains release gate; no sign-off or release approval.",
    "RBAC allow/deny gate remains future-only; no RBAC/admin implementation.",
    "Wrong-tenant/wrong-case/wrong-object gate remains future evidence only; no runtime denial.",
    "Material intake authorization gate remains future candidate; no intake enforcement.",
    "Raw/private/source deny-quarantine gate remains future candidate; no raw routing or quarantine implementation.",
    "Source-package/PDF/image/screenshot/metadata deny-acquisition gate remains prohibited/future-only; no inspection or metadata acquisition.",
    "Third-party/provider route approval-denial gate remains future-only; D005 remains unauthorized; no provider route.",
    "Audit/access-log gate-event dependency remains unresolved; no event emitter, event taxonomy runtime code, log schema, or log storage.",
    "Retention/deletion lifecycle gate dependency remains unresolved; no lifecycle runtime behavior.",
    "Local log/CI/packet exclusion gate remains future candidate; local logs are not CI evidence and not packet components.",
    "Generated/export artifact gate remains future-only; no delivery or external-use.",
    "Packet/delivery promotion gate remains future D007 surface; no packet or delivery approval.",
    "Product/external-use gate remains downstream D007 surface; product candidate remains none and external-use unauthorized.",
    "Admin/support privileged-access gate remains unresolved; no admin/support model.",
    "Runtime/schema/workflow gate ordering remains candidate posture only; no ordering enforcement.",
    "D007 CI/release/product/external-use remains downstream and blocked.",
    "Local sanitized test pilot remains future separate scope only and not selected.",
    "Real private run remains blocked and not authorized.",
    "Implementation evidence is absent.",
    "Test/CI evidence is absent or future-only.",
    "Closure criteria are not met and remain future-only.",
    "Continued pause preserves no approvals, sign-offs, findings, severity, remediation, product, external-use, delivery, packet approval, blocker resolution, or dependency closure.",
  ]);
});

test("runtime-gate inventory posture summary exists", () => {
  assertIncludesAll([
    "D006 runtime-gate inventory posture is the next suitable review-only surface after D005.",
    "D006 should precede local pilot execution.",
    "D006 should precede real private run.",
    "D006 should precede D007 release/product/external-use.",
    "D006 should precede any runtime/API/schema/package behavior.",
    "Runtime-gate inventory remains inventory/posture only.",
    "Runtime-gate inventory remains not implementation.",
    "Validator dispatch remains absent.",
    "Registry/lookup remains absent.",
    "Runtime gate implementation remains absent.",
    "Runtime gate movement remains absent.",
    "Schema enforcement creation remains absent.",
    "Workflow enforcement creation remains absent.",
    "Runtime/API/schema/package behavior remains unchanged.",
    "D001-D005 blockers remain unresolved/not closed and non-authorizing.",
    "DHC/data-handling control-plane context remains prerequisite context only.",
    "Local sanitized test pilot remains future separate scope only.",
    "Real private run remains blocked.",
    "D007 CI/release/product/external-use remains downstream and unauthorized.",
    "D006 cannot be closed now.",
    "No implementation-readiness authorization is created now.",
    "No implementation is created now.",
  ]);
});

test("required non-authorizations exist", () => {
  assertIncludesAll([
    "This boundary creates or authorizes none of the following:",
    "implementation-readiness",
    "runtime gate implementation",
    "runtime gate movement",
    "runtime gate inventory as implementation",
    "validator dispatch",
    "registry/lookup",
    "schema enforcement creation",
    "workflow enforcement creation",
    "runtime enforcement creation",
    "gate ordering enforcement creation",
    "gate classifier implementation",
    "decision event runtime code",
    "event emitter",
    "current logging",
    "log schema",
    "log storage",
    "CI evidence",
    "runtime certification",
    "technical sign-off",
    "External Reviewer approval",
    "final delivery decision",
    "PDF packet",
    "archive/ZIP",
    "local sanitized test pilot execution",
    "real private run",
    "third-party/provider routing implementation or authorization",
    "token/URL/secret handling",
    "raw/private/source inspection",
    "metadata acquisition",
    "deletion execution proof",
    "local logs as CI evidence",
    "local logs as packet components",
    "global access-control threat model closure",
    "finding",
    "severity",
    "remediation",
  ]);
});

test("evidence limits exist", () => {
  assertIncludesAll([
    "runtime-gate inventory posture boundary is not runtime gate implementation",
    "runtime-gate inventory posture boundary is not runtime gate movement",
    "runtime-gate inventory posture boundary is not runtime gate inventory as implementation",
    "runtime-gate inventory posture boundary is not validator dispatch",
    "runtime-gate inventory posture boundary is not registry/lookup",
    "runtime-gate inventory posture boundary is not schema enforcement",
    "runtime-gate inventory posture boundary is not workflow enforcement",
    "runtime-gate inventory posture boundary is not runtime/API/schema/package behavior change",
    "runtime-gate inventory posture boundary is not CI evidence",
    "runtime-gate inventory posture boundary is not release approval",
    "runtime-gate inventory posture boundary is not product candidate",
    "runtime-gate inventory posture boundary is not external-use authorization",
    "gate candidate vocabulary does not mean gate exists",
    "gate ordering posture does not mean ordering enforcement exists",
    "validator dispatch candidate does not mean validator dispatch exists",
    "registry/lookup candidate does not mean registry/lookup exists",
    "schema gate candidate does not mean schema enforcement exists",
    "workflow gate candidate does not mean workflow enforcement exists",
    "human/professional review gate remains release gate and not release approval",
    "required implementation evidence does not mean evidence exists",
    "required tests do not mean tests exist",
    "required CI does not mean CI exists",
    "tests remain tested-scenario evidence, not runtime certainty",
    "local logs are not CI evidence",
    "local logs are not packet components",
    "green tests are not release approval",
    "DOCS_ONLY boundaries are not runtime enforcement",
    "runtime gate inventory is not implementation",
    "CI evidence requires separate explicit CI evidence creation",
    "product candidate requires separate explicit selection",
    "external-use requires separate explicit authorization",
    "human/professional review remains release gate",
    "continued pause is valid",
  ]);
});

test("no-overclaim rules exist", () => {
  assertIncludesAll([
    "D006 review does not mean runtime gates exist.",
    "D006 review does not mean runtime gate movement is authorized.",
    "runtime-gate inventory row does not mean implementation.",
    "validator dispatch row does not mean dispatch exists.",
    "registry/lookup row does not mean lookup exists.",
    "schema/validator gate row does not mean schema enforcement exists.",
    "workflow/prompt gate row does not mean workflow enforcement exists.",
    "human/professional review gate row does not mean release approval.",
    "RBAC allow/deny gate row does not mean RBAC implementation exists.",
    "wrong-scope gate row does not mean runtime denial exists.",
    "material intake gate row does not mean intake enforcement exists.",
    "raw/private/source deny-quarantine row does not mean quarantine implementation exists.",
    "source/PDF/image/metadata deny-acquisition row does not authorize inspection or metadata acquisition.",
    "provider route approval-denial row does not authorize provider routing.",
    "audit/access-log dependency row does not mean logging implementation exists.",
    "retention/deletion dependency row does not mean lifecycle implementation exists.",
    "local-log exclusion row does not mean local logs are CI evidence.",
    "local-log exclusion row does not mean local logs are packet components.",
    "generated/export artifact gate row does not mean delivery/external-use is approved.",
    "packet/delivery promotion row does not mean packet approval.",
    "product/external-use row does not mean product candidate or external-use authorization.",
    "admin/support privileged-access row does not mean admin/support model exists.",
    "gate ordering row does not mean gate ordering enforcement exists.",
    "D007 dependency row does not mean CI/release/product/external-use readiness.",
    "local sanitized pilot implication does not mean pilot authorization.",
    "real private run blocker preservation does not mean real private run authorization.",
    "D006 before D007 does not mean D007 may move now.",
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
    "Should we freeze a DOCS_ONLY runtime-gate inventory posture boundary after D005, preserving no implementation, no gate movement, no validator dispatch, no registry/lookup, no schema/workflow enforcement, no CI evidence, no pilot execution, and no private-source inspection?",
    "external-review requirements remains advisory context only, not approval, sign-off, implementation-readiness authorization, implementation authorization, release approval, product candidate, external-use authorization, local sanitized pilot authorization, real private run authorization, runtime-gate movement authorization, D006 closure, validator dispatch, registry/lookup, schema enforcement, workflow enforcement, CI evidence, or runtime/API/schema/package behavior authorization.",
  ]);
});

test("recommended next posture is limited and non-authorizing", () => {
  assertIncludesAll([
    "The only possible next postures named by this boundary are:",
    "REVIEW_ONLY_RUNTIME_GATE_INVENTORY_POSTURE_AFTER_D005_THIRD_PARTY_PROVIDER_ROUTING_BOUNDARY",
    "DOCS_ONLY_NEW_THREAD_HANDOFF_REFRESH_AFTER_RUNTIME_GATE_INVENTORY_POSTURE_AFTER_D005_THIRD_PARTY_PROVIDER_ROUTING_BOUNDARY",
    "continued pause",
    "None are authorized by this boundary.",
  ], recommendations);
});

test("forbidden overclaiming tokens are absent", () => {
  assertDoesNotIncludeExactToken([
    "RUNTIME_GATE_INVENTORY_POSTURE_AUTHORIZES_IMPLEMENTATION_READINESS",
    "RUNTIME_GATE_INVENTORY_POSTURE_AUTHORIZES_IMPLEMENTATION",
    "RUNTIME_GATE_INVENTORY_POSTURE_CREATES_RUNTIME_GATE_IMPLEMENTATION",
    "RUNTIME_GATE_INVENTORY_POSTURE_CREATES_RUNTIME_GATE_MOVEMENT",
    "RUNTIME_GATE_INVENTORY_POSTURE_CREATES_RUNTIME_GATE_INVENTORY_AS_IMPLEMENTATION",
    "RUNTIME_GATE_INVENTORY_POSTURE_CREATES_VALIDATOR_DISPATCH",
    "RUNTIME_GATE_INVENTORY_POSTURE_CREATES_REGISTRY_LOOKUP",
    "RUNTIME_GATE_INVENTORY_POSTURE_CREATES_SCHEMA_ENFORCEMENT",
    "RUNTIME_GATE_INVENTORY_POSTURE_CREATES_WORKFLOW_ENFORCEMENT",
    "RUNTIME_GATE_IMPLEMENTED",
    "RUNTIME_GATE_MOVEMENT_AUTHORIZED",
    "RUNTIME_GATE_INVENTORY_IMPLEMENTED",
    "VALIDATOR_DISPATCH_CREATED",
    "REGISTRY_LOOKUP_CREATED",
    "SCHEMA_ENFORCEMENT_CREATED",
    "WORKFLOW_ENFORCEMENT_CREATED",
    "RUNTIME_ENFORCEMENT_CREATED",
    "GATE_ORDERING_ENFORCEMENT_CREATED",
    "GATE_CLASSIFIER_IMPLEMENTED",
    "DECISION_EVENT_RUNTIME_CODE_CREATED",
    "EVENT_EMITTER_CREATED",
    "LOG_SCHEMA_CREATED",
    "LOG_STORAGE_CREATED",
    "CURRENT_LOGGING_CREATED",
    "CI_EVIDENCE_EXISTS",
    "CI_EVIDENCE_CREATED",
    "IMPLEMENTATION_EVIDENCE_EXISTS",
    "TEST_EVIDENCE_EXISTS",
    "IMPLEMENTATION_READINESS_AUTHORIZED",
    "IMPLEMENTATION_AUTHORIZED",
    "RUNTIME_AUTHORIZED",
    "RUNTIME_READY",
    "MODEL_RUNTIME_READY",
    "MODEL_COMPLETE",
    "MODEL_COMPLETION_READY",
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
    "THIRD_PARTY_ROUTING_AUTHORIZED",
    "THIRD_PARTY_ROUTING_IMPLEMENTED",
    "PROVIDER_INTEGRATION_CREATED",
    "PROVIDER_REGISTRY_CREATED",
    "PROVIDER_STATUS_IMPLEMENTATION_CREATED",
    "DATA_ROUTING_MAP_CREATED",
    "TOKEN_URL_SECRET_HANDLING_IMPLEMENTED",
    "RAW_MATERIAL_ROUTING_IMPLEMENTED",
    "RAW_PRIVATE_SOURCE_INSPECTION_AUTHORIZED",
    "SOURCE_PACKAGE_INSPECTION_AUTHORIZED",
    "PDF_IMAGE_SCREENSHOT_METADATA_INSPECTION_AUTHORIZED",
    "METADATA_ACQUISITION_AUTHORIZED",
    "RETENTION_IMPLEMENTED",
    "DELETION_IMPLEMENTED",
    "PURGE_IMPLEMENTED",
    "LIFECYCLE_RUNTIME_BEHAVIOR_CREATED",
    "DELETION_EXECUTION_PROOF_CREATED",
    "AUDIT_ACCESS_LOG_IMPLEMENTED",
    "AUDIT_LOGGING_IMPLEMENTED",
    "ACCESS_LOGGING_IMPLEMENTED",
    "LOCAL_LOGS_ARE_CI_EVIDENCE",
    "LOCAL_LOGS_ARE_PACKET_COMPONENTS",
    "RBAC_IMPLEMENTED",
    "ACCESS_CONTROL_IMPLEMENTED",
    "ADMIN_SUPPORT_IMPLEMENTED",
    "ROLE_PERMISSION_MODEL_IMPLEMENTED",
    "ROLE_FIELDS_CREATED",
    "PERMISSION_FIELDS_CREATED",
    "ROLE_SCHEMA_CREATED",
    "PERMISSION_SCHEMA_CREATED",
    "ADMIN_SUPPORT_MODEL_CREATED",
    "GLOBAL_ACCESS_CONTROL_MODEL_CREATED",
    "GLOBAL_ACCESS_CONTROL_THREAT_MODEL_CLOSED",
    "DHC_IMPLEMENTED",
    "DHC_CLOSED",
    "D006_CLOSED",
    "D006_BLOCKER_RESOLVED",
    "BLOCKER_RESOLVED",
    "DEPENDENCY_CLOSED",
    "SECURITY_FINDING_CREATED",
    "VULNERABILITY_FINDING_CREATED",
    "SEVERITY_ASSIGNED",
    "REMEDIATION_RECOMMENDED",
    "REMEDIATION_IMPLEMENTED",
  ]);
});
