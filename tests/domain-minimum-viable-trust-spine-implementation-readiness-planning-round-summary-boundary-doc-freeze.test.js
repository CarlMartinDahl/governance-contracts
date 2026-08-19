const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const docsPath = path.join(
  __dirname,
  "..",
  "docs",
  "DOMAIN_CONTRACTS_MINIMUM_VIABLE_TRUST_SPINE_IMPLEMENTATION_READINESS_PLANNING_ROUND_SUMMARY_BOUNDARY_v1.md",
);
const docsText = fs.readFileSync(docsPath, "utf8");

function assertIncludesAll(entries, text = docsText) {
  for (const entry of entries) {
    assert.match(
      text,
      new RegExp(entry.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"),
    );
  }
}

test("minimum viable trust spine planning-round summary boundary doc exists", () => {
  assert.equal(fs.existsSync(docsPath), true);
});

test("identity and status tokens exist", () => {
  assertIncludesAll([
    "MINIMUM_VIABLE_TRUST_SPINE_IMPLEMENTATION_READINESS_PLANNING_ROUND_SUMMARY_BOUNDARY",
    "DOCS_ONLY",
    "MINIMUM_VIABLE_TRUST_SPINE_IMPLEMENTATION_READINESS_PLANNING_ROUND_SUMMARY_ONLY",
    "MINIMUM_VIABLE_TRUST_SPINE_IMPLEMENTATION_READINESS_PLANNING_ROUND_STATUS_LOCKED_PARTIAL_GAP_NON_AUTHORIZING_AND_PAUSED",
    "MINIMUM_VIABLE_TRUST_SPINE_IMPLEMENTATION_READINESS_PLANNING_ROUND_SUMMARY_PARTIAL_GAP_CONTEXT",
    "MINIMUM_VIABLE_TRUST_SPINE_IMPLEMENTATION_READINESS_PLANNING_ROUND_SUMMARY_NON_AUTHORIZING",
    "MINIMUM_VIABLE_TRUST_SPINE_IMPLEMENTATION_READINESS_PLANNING_ROUND_SUMMARY_NOT_IMPLEMENTATION_READINESS_AUTHORIZATION",
    "MINIMUM_VIABLE_TRUST_SPINE_IMPLEMENTATION_READINESS_PLANNING_ROUND_SUMMARY_NOT_IMPLEMENTATION",
    "MINIMUM_VIABLE_TRUST_SPINE_IMPLEMENTATION_READINESS_PLANNING_ROUND_SUMMARY_NOT_RUNTIME_BEHAVIOR",
    "MINIMUM_VIABLE_TRUST_SPINE_IMPLEMENTATION_READINESS_PLANNING_ROUND_SUMMARY_NOT_RUNTIME_API_SCHEMA_PACKAGE_BEHAVIOR_CHANGE",
    "TRUST_SPINE_A_DENY_BY_DEFAULT_POLICY_RESOURCE_MATERIAL_CLASS_KERNEL",
    "TRUST_SPINE_B_NO_CONTENT_DECISION_EVENT_TAXONOMY",
    "TRUST_SPINE_A_AND_B_PLANNING_ROUND_SUMMARY_CONTEXT",
    "TRUST_SPINE_A_AND_B_PLANNING_ROUND_SUMMARY_NOT_IMPLEMENTATION",
    "TRUST_SPINE_A_AND_B_PLANNING_ROUND_SUMMARY_NOT_IMPLEMENTATION_READINESS_AUTHORIZATION",
    "TRUST_SPINE_A_AND_B_PLANNING_ROUND_SUMMARY_NOT_POLICY_KERNEL_IMPLEMENTATION",
    "TRUST_SPINE_A_AND_B_PLANNING_ROUND_SUMMARY_NOT_POLICY_EVALUATOR_IMPLEMENTATION",
    "TRUST_SPINE_A_AND_B_PLANNING_ROUND_SUMMARY_NOT_DECISION_EVENT_TAXONOMY_RUNTIME_CODE",
    "TRUST_SPINE_A_AND_B_PLANNING_ROUND_SUMMARY_NOT_EVENT_EMITTER",
    "TRUST_SPINE_A_AND_B_PLANNING_ROUND_SUMMARY_NOT_LOG_SCHEMA",
    "TRUST_SPINE_A_AND_B_PLANNING_ROUND_SUMMARY_NOT_LOG_STORAGE",
    "TRUST_SPINE_A_AND_B_PLANNING_ROUND_SUMMARY_NOT_RBAC_IMPLEMENTATION",
    "TRUST_SPINE_A_AND_B_PLANNING_ROUND_SUMMARY_NOT_ADMIN_SUPPORT_IMPLEMENTATION",
    "TRUST_SPINE_A_AND_B_PLANNING_ROUND_SUMMARY_NOT_AUDIT_ACCESS_LOG_IMPLEMENTATION",
    "TRUST_SPINE_A_AND_B_PLANNING_ROUND_SUMMARY_NOT_RETENTION_DELETION_IMPLEMENTATION",
    "TRUST_SPINE_A_AND_B_PLANNING_ROUND_SUMMARY_NOT_RAW_MATERIAL_ROUTING_IMPLEMENTATION",
    "TRUST_SPINE_A_AND_B_PLANNING_ROUND_SUMMARY_NOT_THIRD_PARTY_ROUTING_AUTHORIZATION",
    "TRUST_SPINE_A_AND_B_PLANNING_ROUND_SUMMARY_NOT_RUNTIME_GATE_IMPLEMENTATION",
    "TRUST_SPINE_A_AND_B_PLANNING_ROUND_SUMMARY_NOT_VALIDATOR_DISPATCH",
    "TRUST_SPINE_A_AND_B_PLANNING_ROUND_SUMMARY_NOT_REGISTRY_LOOKUP",
    "TRUST_SPINE_A_AND_B_PLANNING_ROUND_SUMMARY_NOT_CI_EVIDENCE_CREATION",
    "TRUST_SPINE_A_AND_B_PLANNING_ROUND_SUMMARY_NOT_RELEASE_APPROVAL",
    "TRUST_SPINE_A_AND_B_PLANNING_ROUND_SUMMARY_NOT_PRODUCT_CANDIDATE",
    "TRUST_SPINE_A_AND_B_PLANNING_ROUND_SUMMARY_NOT_EXTERNAL_USE_AUTHORIZATION",
    "TRUST_SPINE_A_AND_B_PLANNING_ROUND_SUMMARY_NOT_BLOCKER_RESOLUTION",
    "TRUST_SPINE_A_AND_B_PLANNING_ROUND_SUMMARY_NOT_DEPENDENCY_CLOSURE",
    "TRUST_SPINE_A_AND_B_PLANNING_ROUND_SUMMARY_CONTINUED_PAUSE",
  ]);
});

test("purpose exists", () => {
  assertIncludesAll([
    "This boundary freezes the completed minimum viable trust spine implementation-readiness planning round as DOCS_ONLY summary/context only.",
    "The read-only planning-round status lock was `MINIMUM_VIABLE_TRUST_SPINE_IMPLEMENTATION_READINESS_PLANNING_ROUND_STATUS_LOCKED_PARTIAL_GAP_NON_AUTHORIZING_AND_PAUSED`.",
    "The strategy, entry-candidate scope, status/gap, and evidence/closure-plan layers are all frozen/reviewed/paused.",
    "A+B remains partial/gap and non-authorizing.",
    "This boundary does not authorize implementation-readiness.",
    "This boundary does not authorize implementation.",
    "This boundary creates no runtime/API/schema/package behavior change.",
    "This boundary creates no policy kernel, policy evaluator, decision-event taxonomy runtime code, event emitter, log schema, or log storage.",
    "Any future implementation or implementation-readiness authorization requires a separate explicit user-authorized scope after live git guard.",
  ]);
});

test("source hierarchy exists", () => {
  assertIncludesAll([
    "LIVE_REPO_EVIDENCE_WINS",
    "TRACKED_REPO_EVIDENCE_CONTROLS_CURRENT_STATE",
    "NEW_THREAD_HANDOFF_FILE_IS_CONTEXT_ONLY",
    "IMPLEMENTATION_READINESS_ENTRY_CRITERIA_BOUNDARY_CONTROLS_ENTRY_RULES",
    "MINIMUM_VIABLE_TRUST_SPINE_EVIDENCE_CLOSURE_PLAN_BOUNDARY_CONTROLS_A_AND_B_EVIDENCE_CLOSURE_PLAN",
    "MINIMUM_VIABLE_TRUST_SPINE_STATUS_GAP_BOUNDARY_CONTROLS_A_AND_B_STATUS_GAP",
    "MINIMUM_VIABLE_TRUST_SPINE_ENTRY_CANDIDATE_SCOPE_BOUNDARY_CONTROLS_A_AND_B_SCOPE",
    "MINIMUM_VIABLE_TRUST_SPINE_STRATEGY_BOUNDARY_CONTROLS_A_AND_B_STRATEGY",
    "FINAL_BLOCKED_CHAIN_STATUS_BOUNDARY_CONTROLS_CURRENT_BLOCKED_CHAIN_CONTEXT",
    "POST_RUNTIME_GATE_BLOCKED_COMPLETION_SUMMARY_BOUNDARY_CONTROLS_POST_RUNTIME_GATE_CONTEXT",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_PLANNING_ROUND_SUMMARY_CONTROLS_DHC_CONTEXT",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_PLANNING_ROUND_SUMMARY_BOUNDARY_CONTROLS_RUNTIME_GATE_CONTEXT",
    "ROADMAP_DEPENDENCIES_001_TO_007_BLOCKED_COMPLETION_ROUND_SUMMARY_CONTROLS_DEPENDENCY_CONTEXT",
    "RBAC_ADMIN_SUPPORT_BOUNDARY_DOCS_CONTROL_ACCESS_CONTEXT",
    "AUDIT_ACCESS_LOG_BOUNDARY_DOCS_CONTROL_AUDIT_CONTEXT",
    "RETENTION_DELETION_BOUNDARY_DOCS_CONTROL_LIFECYCLE_CONTEXT",
    "RAW_MATERIAL_ROUTING_BOUNDARY_DOCS_CONTROL_RAW_ROUTING_CONTEXT",
    "THIRD_PARTY_PROVIDER_BOUNDARY_DOCS_CONTROL_PROVIDER_CONTEXT",
    "EXTERNAL_REVIEW_REQUIREMENTS_USED_AS_ADVISORY_CONTEXT_ONLY",
    "OLD_HANDOFF_FILES_ARE_HISTORICAL_CONTEXT_ONLY",
    "STALE_HANDOFF_MUST_NOT_SELECT_REOPEN_OR_CLOSE_SLICE",
  ]);
});

test("current accepted state exists", () => {
  assertIncludesAll([
    "d7af6b9",
    "0ba1fe1 docs(domain): freeze trust spine implementation-readiness evidence closure plan boundary",
    "07fe867 docs(domain): freeze trust spine implementation-readiness status gap boundary",
    "ce18352 docs(domain): freeze trust spine implementation-readiness entry scope boundary",
    "a85b443 docs(domain): freeze minimum viable trust spine strategy boundary",
    "MINIMUM_VIABLE_TRUST_SPINE_EVIDENCE_CLOSURE_PLAN_AND_HANDOFF_REFRESH_REVIEWED_AND_PAUSED_NO_CHANGE",
    "NEXT_PHASE_SELECTED_AFTER_MINIMUM_VIABLE_TRUST_SPINE_EVIDENCE_CLOSURE_PLAN_HANDOFF_REFRESH_PAUSE_NO_CHANGE",
    "MINIMUM_VIABLE_TRUST_SPINE_IMPLEMENTATION_READINESS_PLANNING_ROUND_STATUS_LOCKED_PARTIAL_GAP_NON_AUTHORIZING_AND_PAUSED_NO_CHANGE",
    "COMBINED_READ_ONLY_MINIMUM_VIABLE_TRUST_SPINE_EVIDENCE_CLOSURE_PLAN_HANDOFF_REFRESH_PAUSE_AND_PLANNING_ROUND_STATUS_LOCK_COMPLETED_NO_CHANGE",
    "The current safe posture remains continued pause until a separate next posture is selected.",
  ]);
});

test("planning-layer summary exists", () => {
  assertIncludesAll([
    "## Planning-Layer Summary",
    "row ID",
    "planning layer",
    "controlling boundary or context",
    "current evidence level",
    "current status",
    "implementation gap",
    "what remains non-authorized",
    "next dependency or future evidence",
    "Every row preserves planning only, DOCS_ONLY where applicable, partial/gap where applicable, future evidence only where applicable, no implementation-readiness authorization, no implementation, no runtime/API/schema/package behavior change, no policy kernel, no policy evaluator, no decision-event runtime code, no event emitter, no log schema, no log storage, no CI evidence, no release approval, no product candidate, no external-use, no blocker resolution, no dependency closure, and continued pause.",
    ...Array.from({ length: 8 }, (_, index) =>
      `MVTSP-PLANNING-${String(index + 1).padStart(3, "0")}`,
    ),
  ]);
});

test("A+B planning summary exists", () => {
  assertIncludesAll([
    "## A+B Planning Summary",
    "A covers deny-by-default policy/resource/material-class vocabulary.",
    "B covers no-content decision-event taxonomy.",
    "actor/subject",
    "role/permission concept",
    "tenant/case scope",
    "object/function/property scope",
    "material class",
    "route/surface",
    "action",
    "allow/deny",
    "default deny",
    "reason code",
    "no-raw/no-private/no-source-locator/no-token/no-URL posture",
    "subject reference",
    "decision status",
    "timestamp category",
    "no-raw/no-private/no-source-locator marker",
    "no raw content",
    "no private facts",
    "no source locators",
    "no token/URL/secret material",
    "These remain planning fields only.",
    "These are not schema, runtime code, event emitter, log schema, log storage, policy evaluator, implementation evidence, test closure evidence, or CI evidence.",
  ]);
});

test("planning-round lock summary exists", () => {
  assertIncludesAll([
    "## Planning-Round Lock Summary",
    "strategy boundary frozen/reviewed/paused",
    "entry-candidate scope boundary frozen/reviewed/paused",
    "status/gap boundary frozen/reviewed/paused",
    "evidence/closure-plan boundary frozen/reviewed/paused",
    "handoff refresh after evidence/closure-plan boundary reviewed/paused",
    "planning layers locked as planning only",
    "A+B remains DOCS_ONLY",
    "A+B remains partial/gap",
    "A+B remains non-authorizing",
    "A+B remains future-evidence-only where applicable",
    "A+B remains paused",
    "no implementation-readiness authorized",
    "no implementation authorized",
    "no runtime/API/schema/package behavior created",
    "no policy kernel created",
    "no policy evaluator created",
    "no decision-event taxonomy runtime code created",
    "no event emitter created",
    "no log schema or log storage created",
    "no CI evidence created",
    "no release approval created",
    "no product candidate selected",
    "no external-use authorized",
    "no delivery/packet approval created",
    "no blocker resolved",
    "no dependency closed",
  ]);
});

test("blocker coverage summary exists", () => {
  assertIncludesAll([
    "A+B supports D001 RBAC/admin-support vocabulary.",
    "A+B supports D002 audit/access-log event semantics.",
    "A+B supports D003 retention/deletion lifecycle decisions.",
    "A+B supports D004 raw-material routing deny/quarantine decisions.",
    "A+B supports D005 third-party/provider deny-by-default routing posture.",
    "A+B supports D006 validator/registry/runtime-gate prerequisites later.",
    "A+B supports D007 CI/release/product/external-use gate evidence later.",
    "A+B supports DHC future evidence and closure criteria.",
    "A+B should precede runtime gates.",
    "A+B can be scoped without raw/private/source inspection.",
    "A+B can be scoped without source package inspection.",
    "A+B can be scoped without PDF/image/screenshot/metadata inspection.",
    "A+B can be scoped without metadata acquisition.",
    "A+B can be scoped without local log inspection.",
    "A+B can be scoped without real private run.",
    "All blockers remain unresolved/not closed.",
  ]);
});

test("required non-authorizations exist", () => {
  assertIncludesAll([
    "implementation-readiness",
    "implementation",
    "runtime behavior",
    "runtime/API/schema/package behavior change",
    "policy kernel implementation",
    "policy evaluator implementation",
    "decision-event taxonomy runtime code",
    "event emitter",
    "log schema",
    "log storage",
    "RBAC implementation",
    "admin/support implementation",
    "audit/access-log implementation",
    "retention implementation",
    "deletion implementation",
    "raw-material routing implementation",
    "third-party routing implementation or authorization",
    "provider integration",
    "provider registry",
    "provider status implementation",
    "data-routing map implementation",
    "token/URL/secret handling implementation",
    "runtime gate implementation",
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
    "Planning-round summary boundary is not implementation-readiness authorization.",
    "Planning-round summary boundary is not implementation.",
    "Planning-round summary boundary is not implementation evidence.",
    "Evidence plan does not mean evidence exists.",
    "Closure plan does not mean closure.",
    "Closure criteria do not mean closure.",
    "Tests remain tested-scenario evidence, not runtime certainty.",
    "Local logs are not CI evidence.",
    "Local logs are not packet components.",
    "Green tests are not release approval.",
    "DOCS_ONLY boundaries are not runtime enforcement.",
    "Route/case/capability evidence is not full RBAC/access-control.",
    "Route/case/capability evidence is not admin/support access-control.",
    "Route/case/capability evidence is not global authorization model.",
    "Runtime gate inventory is not implementation.",
    "CI evidence requires separate explicit CI evidence creation.",
    "Product candidate requires separate explicit selection.",
    "External-use requires separate explicit authorization.",
    "Human/professional review remains release gate.",
    "Continued pause is valid.",
  ]);
});

test("no-overclaim rules exist", () => {
  assertIncludesAll([
    "Planning-round summary does not mean implementation-readiness authorization.",
    "Planning-round summary does not mean implementation.",
    "Planning-round status lock does not mean implementation-readiness authorization.",
    "Planning-round status lock does not mean implementation.",
    "Planning-round status lock does not mean closure.",
    "Planning-round summary does not mean policy kernel exists.",
    "Planning-round summary does not mean policy evaluator exists.",
    "Planning-round summary does not mean event taxonomy runtime code exists.",
    "Planning-round summary does not mean event emitter exists.",
    "Planning-round summary does not mean log schema exists.",
    "Planning-round summary does not mean log storage exists.",
    "Planning-round summary does not mean RBAC exists.",
    "Planning-round summary does not mean audit/access-log exists.",
    "Planning-round summary does not mean retention/deletion exists.",
    "Planning-round summary does not mean raw routing exists.",
    "Planning-round summary does not mean third-party provider registry exists.",
    "Planning-round summary does not mean runtime gates exist.",
    "Planning-round summary does not mean CI evidence exists.",
    "Planning-round summary does not mean release approval.",
    "Planning-round summary does not mean product candidate.",
    "Planning-round summary does not mean external-use authorization.",
    "Planning-round summary does not mean blocker closure.",
    "Planning-round summary does not mean dependency closure.",
    "Required evidence does not mean evidence exists.",
    "Required tests do not mean tests exist.",
    "Required CI does not mean CI exists.",
    "Closure criteria do not mean closure.",
    "Any future implementation-readiness authorization requires separate explicit authorization.",
    "Any future implementation requires separate explicit authorization.",
  ]);
});

test("External Reviewer posture exists", () => {
  assertIncludesAll([
    "No external-review request is required by this boundary.",
    "external-review requirements remains advisory context only, not approval, sign-off, implementation-readiness authorization, implementation authorization, release approval, product candidate, or external-use authorization.",
    "Should the minimum viable trust spine implementation-readiness planning-round summary remain the controlling non-authorizing prerequisite before any later implementation-readiness authorization or implementation slice?",
  ]);
});

test("recommended next posture remains narrow and unauthorized", () => {
  assertIncludesAll([
    "REVIEW_ONLY_MINIMUM_VIABLE_TRUST_SPINE_IMPLEMENTATION_READINESS_PLANNING_ROUND_SUMMARY_BOUNDARY",
    "DOCS_ONLY_NEW_THREAD_HANDOFF_REFRESH_AFTER_MINIMUM_VIABLE_TRUST_SPINE_IMPLEMENTATION_READINESS_PLANNING_ROUND_SUMMARY_BOUNDARY",
    "continued pause",
    "None are authorized by this boundary.",
  ]);
});

test("exact overclaiming tokens are absent", () => {
  const forbidden = [
    "TRUST_SPINE_IMPLEMENTATION_READY",
    "TRUST_SPINE_READY_FOR_IMPLEMENTATION",
    "TRUST_SPINE_IMPLEMENTED",
    "TRUST_SPINE_CLOSED",
    "TRUST_SPINE_BLOCKER_RESOLVED",
    "PLANNING_ROUND_AUTHORIZES_IMPLEMENTATION_READINESS",
    "PLANNING_ROUND_AUTHORIZES_IMPLEMENTATION",
    "PLANNING_ROUND_CREATES_CLOSURE",
    "PLANNING_ROUND_CLOSED",
    "PLANNING_ROUND_COMPLETE",
    "CLOSURE_PLAN_CREATES_CLOSURE",
    "CLOSURE_CRITERIA_MET",
    "POLICY_KERNEL_CREATED",
    "POLICY_KERNEL_IMPLEMENTED",
    "POLICY_EVALUATOR_CREATED",
    "POLICY_EVALUATOR_IMPLEMENTED",
    "DECISION_EVENT_TAXONOMY_CREATED",
    "DECISION_EVENT_TAXONOMY_IMPLEMENTED",
    "EVENT_EMITTER_CREATED",
    "LOG_SCHEMA_CREATED",
    "LOG_STORAGE_CREATED",
    "RBAC_IMPLEMENTED",
    "ADMIN_SUPPORT_IMPLEMENTED",
    "RETENTION_IMPLEMENTED",
    "DELETION_IMPLEMENTED",
    "AUDIT_ACCESS_LOG_IMPLEMENTED",
    "RAW_MATERIAL_ROUTING_IMPLEMENTED",
    "THIRD_PARTY_ROUTING_AUTHORIZED",
    "THIRD_PARTY_ROUTING_IMPLEMENTED",
    "PROVIDER_INTEGRATION_CREATED",
    "PROVIDER_REGISTRY_CREATED",
    "PROVIDER_STATUS_IMPLEMENTATION_CREATED",
    "DATA_ROUTING_MAP_CREATED",
    "TOKEN_URL_SECRET_HANDLING_IMPLEMENTED",
    "RUNTIME_GATE_IMPLEMENTED",
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
  ];

  for (const token of forbidden) {
    assert.equal(docsText.includes(token), false, token);
  }
});
