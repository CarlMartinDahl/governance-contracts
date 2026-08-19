const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const docsPath = path.join(
  __dirname,
  "..",
  "docs",
  "DOMAIN_CONTRACTS_DEPENDENCY_001_TO_007_POST_TRUST_SPINE_REPRIORITIZATION_BOUNDARY_v1.md",
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
  "## D001-D007 Reprioritization Matrix",
  "## Recommended Dependency Ordering After Trust-Spine",
);
const recommendedNext = sectionBetween("## Recommended Next Posture");

test("boundary doc exists", () => {
  assert.equal(fs.existsSync(docsPath), true);
});

test("identity/status tokens exist", () => {
  assertIncludesAll([
    "DEPENDENCY_001_TO_007_POST_TRUST_SPINE_REPRIORITIZATION_BOUNDARY",
    "DOCS_ONLY",
    "DEPENDENCY_001_TO_007_POST_TRUST_SPINE_REPRIORITIZATION_ONLY",
    "DEPENDENCY_001_TO_007_POST_TRUST_SPINE_REPRIORITIZATION_PARTIAL_GAP_CONTEXT",
    "DEPENDENCY_001_TO_007_POST_TRUST_SPINE_REPRIORITIZATION_NON_AUTHORIZING",
    "DEPENDENCY_001_TO_007_POST_TRUST_SPINE_REPRIORITIZATION_NOT_IMPLEMENTATION_READINESS_AUTHORIZATION",
    "DEPENDENCY_001_TO_007_POST_TRUST_SPINE_REPRIORITIZATION_NOT_IMPLEMENTATION",
    "DEPENDENCY_001_TO_007_POST_TRUST_SPINE_REPRIORITIZATION_NOT_RUNTIME_BEHAVIOR",
    "DEPENDENCY_001_TO_007_POST_TRUST_SPINE_REPRIORITIZATION_NOT_RUNTIME_API_SCHEMA_PACKAGE_BEHAVIOR_CHANGE",
    "DEPENDENCY_001_TO_007_POST_TRUST_SPINE_REPRIORITIZATION_NOT_CI_EVIDENCE",
    "DEPENDENCY_001_TO_007_POST_TRUST_SPINE_REPRIORITIZATION_NOT_RELEASE_APPROVAL",
    "DEPENDENCY_001_TO_007_POST_TRUST_SPINE_REPRIORITIZATION_NOT_PRODUCT_CANDIDATE",
    "DEPENDENCY_001_TO_007_POST_TRUST_SPINE_REPRIORITIZATION_NOT_EXTERNAL_USE_AUTHORIZATION",
    "DEPENDENCY_001_TO_007_POST_TRUST_SPINE_REPRIORITIZATION_NOT_BLOCKER_RESOLUTION",
    "DEPENDENCY_001_TO_007_POST_TRUST_SPINE_REPRIORITIZATION_NOT_DEPENDENCY_CLOSURE",
    "TRUST_SPINE_A_DENY_BY_DEFAULT_POLICY_RESOURCE_MATERIAL_CLASS_KERNEL",
    "TRUST_SPINE_B_NO_CONTENT_DECISION_EVENT_TAXONOMY",
    "TRUST_SPINE_A_AND_B_POST_DEPENDENCY_REPRIORITIZATION_CONTEXT_ONLY",
    "D001_RBAC_ADMIN_SUPPORT_REMAINS_BLOCKED",
    "D002_AUDIT_ACCESS_LOG_REMAINS_BLOCKED",
    "D003_RETENTION_DELETION_REMAINS_BLOCKED",
    "D004_RAW_MATERIAL_ROUTING_REMAINS_BLOCKED",
    "D005_THIRD_PARTY_PROVIDER_ROUTING_REMAINS_BLOCKED_UNAUTHORIZED",
    "D006_VALIDATOR_REGISTRY_RUNTIME_GATE_REMAINS_BLOCKED_DOWNSTREAM",
    "D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_REMAINS_BLOCKED_UNAUTHORIZED",
    "DHC_ALIGNMENT_REVIEW_INSERTED_BEFORE_D006_RUNTIME_GATE_MOVEMENT",
    "RUNTIME_GATE_MOVEMENT_REMAINS_DOWNSTREAM",
    "DEPENDENCY_001_TO_007_POST_TRUST_SPINE_REPRIORITIZATION_CONTINUED_PAUSE",
  ]);
});

test("purpose exists", () => {
  assertIncludesAll([
    "This boundary freezes the completed read-only D001-D007 post-trust-spine reprioritization review as DOCS_ONLY repo evidence only.",
    "The read-only review result was `PARTIAL_GAP_REQUIRES_DOCS_ONLY_DEPENDENCY_001_TO_007_POST_TRUST_SPINE_REPRIORITIZATION_BOUNDARY`.",
    "A+B clarifies dependency ordering and blocker semantics but does not create implementation, readiness, runtime enforcement, CI evidence, release approval, product candidate, external-use, blocker resolution, or dependency closure.",
    "This boundary is suitable as docs-only evidence because all D001-D007 blockers remain unresolved/not closed.",
  ]);
});

test("source hierarchy exists", () => {
  assertIncludesAll([
    "LIVE_REPO_EVIDENCE_WINS",
    "TRACKED_REPO_EVIDENCE_CONTROLS_CURRENT_STATE",
    "NEW_THREAD_HANDOFF_FILE_IS_CONTEXT_ONLY",
    "TRUST_SPINE_PLANNING_ROUND_SUMMARY_BOUNDARY_CONTROLS_A_AND_B_PLANNING_CONTEXT",
    "MINIMUM_VIABLE_TRUST_SPINE_EVIDENCE_CLOSURE_PLAN_BOUNDARY_CONTROLS_A_AND_B_EVIDENCE_CLOSURE_PLAN",
    "MINIMUM_VIABLE_TRUST_SPINE_STATUS_GAP_BOUNDARY_CONTROLS_A_AND_B_STATUS_GAP",
    "MINIMUM_VIABLE_TRUST_SPINE_ENTRY_CANDIDATE_SCOPE_BOUNDARY_CONTROLS_A_AND_B_SCOPE",
    "MINIMUM_VIABLE_TRUST_SPINE_STRATEGY_BOUNDARY_CONTROLS_A_AND_B_STRATEGY",
    "ROADMAP_DEPENDENCIES_001_TO_007_BLOCKED_COMPLETION_ROUND_SUMMARY_CONTROLS_DEPENDENCY_CONTEXT",
    "D001_RBAC_ADMIN_SUPPORT_PLANNING_SUMMARY_CONTROLS_D001_CONTEXT",
    "D002_AUDIT_ACCESS_LOG_PLANNING_SUMMARY_CONTROLS_D002_CONTEXT",
    "D003_RETENTION_DELETION_PLANNING_SUMMARY_CONTROLS_D003_CONTEXT",
    "D004_RAW_MATERIAL_ROUTING_PLANNING_SUMMARY_CONTROLS_D004_CONTEXT",
    "D005_THIRD_PARTY_PROVIDER_ROUTING_PLANNING_SUMMARY_CONTROLS_D005_CONTEXT",
    "D006_VALIDATOR_REGISTRY_RUNTIME_GATE_PLANNING_SUMMARY_CONTROLS_D006_CONTEXT",
    "D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_PLANNING_SUMMARY_CONTROLS_D007_CONTEXT",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_PLANNING_ROUND_SUMMARY_CONTROLS_DHC_CONTEXT",
    "RUNTIME_GATE_IMPLEMENTATION_CANDIDATE_INVENTORY_PLANNING_ROUND_SUMMARY_BOUNDARY_CONTROLS_RUNTIME_GATE_CONTEXT",
    "FINAL_BLOCKED_CHAIN_STATUS_BOUNDARY_CONTROLS_CURRENT_BLOCKED_CHAIN_CONTEXT",
    "EXTERNAL_REVIEW_REQUIREMENTS_USED_AS_ADVISORY_CONTEXT_ONLY",
    "OLD_HANDOFF_FILES_ARE_HISTORICAL_CONTEXT_ONLY",
    "STALE_HANDOFF_MUST_NOT_SELECT_REOPEN_OR_CLOSE_SLICE",
  ]);
});

test("current accepted state exists", () => {
  assertIncludesAll([
    "27cd7ff",
    "1c747c2 docs(domain): freeze trust spine implementation-readiness planning round summary boundary",
    "0ba1fe1 docs(domain): freeze trust spine implementation-readiness evidence closure plan boundary",
    "07fe867 docs(domain): freeze trust spine implementation-readiness status gap boundary",
    "ce18352 docs(domain): freeze trust spine implementation-readiness entry scope boundary",
    "a85b443 docs(domain): freeze minimum viable trust spine strategy boundary",
    "MINIMUM_VIABLE_TRUST_SPINE_PLANNING_ROUND_AND_HANDOFF_REVIEWED_AND_PAUSED_NO_CHANGE",
    "REVIEW_ONLY_DEPENDENCY_001_TO_007_POST_TRUST_SPINE_REPRIORITIZATION_COMPLETED_NO_CHANGE",
    "POST_TRUST_SPINE_DEPENDENCY_001_TO_007_REPRIORITIZATION_RECOMMENDATION_SELECTED_NO_CHANGE",
    "COMBINED_READ_ONLY_DEPENDENCY_001_TO_007_POST_TRUST_SPINE_REPRIORITIZATION_COMPLETED_NO_CHANGE",
    "The current safe posture remains continued pause until a separate next posture is selected.",
  ]);
});

test("prior read-only review result exists", () => {
  assertIncludesAll([
    "The REVIEW_ONLY dependency 001-to-007 post-trust-spine reprioritization review was performed.",
    "The result was `PARTIAL_GAP_REQUIRES_DOCS_ONLY_DEPENDENCY_001_TO_007_POST_TRUST_SPINE_REPRIORITIZATION_BOUNDARY`.",
    "A future DOCS_ONLY reprioritization boundary is suitable.",
    "This boundary freezes that partial/gap result only.",
    "This boundary does not convert reprioritization into implementation-readiness authorization, implementation, runtime behavior, CI evidence, release approval, product candidate, external-use authorization, blocker closure, or dependency closure.",
  ]);
});

test("D001-D007 reprioritization matrix exists", () => {
  assertIncludesAll([
    "dependency ID",
    "dependency surface",
    "current tracked status",
    "trust-spine contribution from A+B",
    "blocker status",
    "upstream dependencies",
    "downstream dependencies",
    "overclaim risk",
    "expected later surfaces",
    "minimum later proof tests if separately authorized",
    "should precede runtime gates",
    "what remains non-authorized",
    "Every row preserves not implemented, not closed, no implementation-readiness authorization, no implementation, no runtime/API/schema/package behavior change, no CI evidence, no release approval, no product candidate, no external-use, no blocker resolution, no dependency closure, and continued pause.",
  ], matrix);
});

test("D001 through D007 rows exist", () => {
  assertIncludesAll([
    "| D001 | RBAC/admin-support |",
    "| D002 | audit/access-log |",
    "| D003 | retention/deletion |",
    "| D004 | raw-material routing |",
    "| D005 | third-party/provider routing |",
    "| D006 | validator/registry/runtime-gate |",
    "| D007 | CI/release/product/external-use |",
  ], matrix);
});

test("required row content exists", () => {
  assertIncludesAll([
    "blocked, not implemented, not closed",
    "A+B clarifies actor/role/permission, tenant/case, material-class, action, allow/deny/default-deny vocabulary",
    "trust spine and DHC/access-control scope",
    "D002-D006 and D007",
    "role/schema overclaim",
    "allow/deny, wrong-tenant, wrong-case, bypass-prevention, admin/support denial",
    "RBAC/admin implementation and closure",
    "A+B clarifies no-content decision-event semantics",
    "D001 should precede or co-evolve",
    "event/log runtime overclaim",
    "no-content event, no raw/private/source locator/token/URL, log access/storage if authorized",
    "event runtime, emitter, log schema/storage",
    "A+B clarifies material-class/lifecycle decision vocabulary",
    "A+B, D001, D002",
    "lifecycle behavior overclaim",
    "retention state, deletion/purge/idempotency, audit-linked lifecycle denial",
    "retention/deletion implementation",
    "A+B clarifies deny/quarantine and no-raw/no-private/no-source-locator posture",
    "A+B, D001-D003",
    "raw/private/source inspection or routing overclaim",
    "deny/quarantine, no-leak, no raw/private/source/package/PDF/image/metadata inspection",
    "raw routing and raw/private/source inspection",
    "blocked, unauthorized, not implemented, not closed",
    "A+B clarifies deny-by-default provider routing posture",
    "A+B, D001-D004",
    "provider authorization/registry overclaim",
    "no unauthorized provider route, no token/URL/secret leakage, provider status/routing map only if authorized",
    "third-party routing, provider registry/map",
    "blocked by D001-D005 and DHC, not implemented, not closed",
    "A+B clarifies later gate prerequisites",
    "D001-D005 and DHC",
    "runtime-gate inventory as implementation",
    "validator dispatch, registry lookup, gate ordering, schema/workflow enforcement only if authorized",
    "runtime-gate-adjacent and must remain downstream",
    "validator dispatch, registry, runtime gates",
    "blocked by D001-D006, absent/unauthorized, not closed",
    "A+B clarifies later gate evidence expectations only",
    "D001-D006 plus DHC/runtime-gate posture",
    "CI/release/product overclaim",
    "CI evidence if claimed, release gate, local-log-not-CI, product/external-use denial",
    "no; remains downstream",
    "CI evidence, release, product, external-use, delivery, packet approval",
  ], matrix);
});

test("recommended dependency ordering exists", () => {
  assertIncludesAll([
    "Keep D001 -> D002 -> D003 -> D004 -> D005 -> DHC alignment review -> D006 -> D007.",
    "D001 still precedes D002-D006.",
    "D002 may co-evolve with D001 vocabulary but should not outrun it.",
    "D003 depends on A+B/D001/D002.",
    "D004 depends on A+B/D001-D003.",
    "D005 depends on A+B/D001-D004.",
    "DHC alignment review should be inserted before D006 runtime-gate movement.",
    "D006 remains downstream of D001-D005 and DHC.",
    "D007 remains downstream of D001-D006.",
    "No dependency can be closed now.",
    "No implementation-readiness authorization is created now.",
    "No implementation is created now.",
  ]);
});

test("DHC and runtime-gate sequencing exists", () => {
  assertIncludesAll([
    "DHC control-plane alignment should be reviewed before any runtime-gate move.",
    "Runtime-gate inventory remains not implementation.",
    "Runtime-gate movement remains downstream.",
    "Validator dispatch remains not created.",
    "Registry/lookup remains not created.",
    "Runtime/API/schema/package behavior remains unchanged.",
  ]);
});

test("trust-spine contribution summary exists", () => {
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
    "DHC implementation",
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
    "Reprioritization boundary is not implementation-readiness authorization.",
    "Reprioritization boundary is not implementation.",
    "Reprioritization boundary is not implementation evidence.",
    "Reprioritization does not mean dependency closure.",
    "Ordering does not mean blocker resolution.",
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
    "D001 priority does not mean RBAC exists.",
    "D002 event semantics do not mean event runtime exists.",
    "D003 lifecycle vocabulary does not mean retention/deletion exists.",
    "D004 raw-routing ordering does not mean raw routing exists.",
    "D005 provider posture does not mean third-party routing is authorized.",
    "D006 downstream placement does not mean runtime gates exist.",
    "D007 downstream placement does not mean CI/release/product/external-use readiness.",
    "DHC alignment insertion does not mean DHC implementation.",
    "Trust-spine contribution does not mean dependency closure.",
    "Reprioritization does not mean blocker closure.",
    "Required tests do not mean tests exist.",
    "Required CI does not mean CI exists.",
    "Any future implementation-readiness authorization requires separate explicit authorization.",
    "Any future implementation requires separate explicit authorization.",
  ]);
});

test("External Reviewer posture exists", () => {
  assertIncludesAll([
    "No external-review request is required by this boundary.",
    "Should the D001-D007 post-trust-spine reprioritization boundary preserve the existing dependency order while inserting DHC alignment before D006 runtime-gate movement, with no implementation, closure, product, or external-use authorization?",
    "external-review requirements remains advisory context only, not approval, sign-off, implementation-readiness authorization, implementation authorization, release approval, product candidate, or external-use authorization.",
  ]);
});

test("recommended next posture is limited and unauthorized", () => {
  assertIncludesAll([
    "REVIEW_ONLY_DEPENDENCY_001_TO_007_POST_TRUST_SPINE_REPRIORITIZATION_BOUNDARY",
    "DOCS_ONLY_NEW_THREAD_HANDOFF_REFRESH_AFTER_DEPENDENCY_001_TO_007_POST_TRUST_SPINE_REPRIORITIZATION_BOUNDARY",
    "continued pause",
    "None are authorized by this boundary.",
  ], recommendedNext);
});

test("forbidden exact overclaiming tokens are absent", () => {
  assertDoesNotIncludeExactToken([
    "DEPENDENCY_ORDER_AUTHORIZES_IMPLEMENTATION_READINESS",
    "DEPENDENCY_ORDER_AUTHORIZES_IMPLEMENTATION",
    "DEPENDENCY_REPRIORITIZATION_CREATES_CLOSURE",
    "DEPENDENCY_REPRIORITIZATION_CLOSES_BLOCKERS",
    "D001_CLOSED",
    "D002_CLOSED",
    "D003_CLOSED",
    "D004_CLOSED",
    "D005_CLOSED",
    "D006_CLOSED",
    "D007_CLOSED",
    "RBAC_IMPLEMENTED",
    "ADMIN_SUPPORT_IMPLEMENTED",
    "AUDIT_ACCESS_LOG_IMPLEMENTED",
    "RETENTION_IMPLEMENTED",
    "DELETION_IMPLEMENTED",
    "RAW_MATERIAL_ROUTING_IMPLEMENTED",
    "THIRD_PARTY_ROUTING_AUTHORIZED",
    "THIRD_PARTY_ROUTING_IMPLEMENTED",
    "PROVIDER_INTEGRATION_CREATED",
    "PROVIDER_REGISTRY_CREATED",
    "PROVIDER_STATUS_IMPLEMENTATION_CREATED",
    "DATA_ROUTING_MAP_CREATED",
    "TOKEN_URL_SECRET_HANDLING_IMPLEMENTED",
    "DHC_IMPLEMENTED",
    "RUNTIME_GATE_IMPLEMENTED",
    "RUNTIME_GATE_INVENTORY_IMPLEMENTED",
    "VALIDATOR_DISPATCH_CREATED",
    "REGISTRY_LOOKUP_CREATED",
    "POLICY_KERNEL_CREATED",
    "POLICY_EVALUATOR_CREATED",
    "DECISION_EVENT_TAXONOMY_CREATED",
    "EVENT_EMITTER_CREATED",
    "LOG_SCHEMA_CREATED",
    "LOG_STORAGE_CREATED",
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
  ]);
});
