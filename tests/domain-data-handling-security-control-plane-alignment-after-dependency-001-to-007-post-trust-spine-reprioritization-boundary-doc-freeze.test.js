const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const docsPath = path.join(
  __dirname,
  "..",
  "docs",
  "DOMAIN_CONTRACTS_DATA_HANDLING_SECURITY_CONTROL_PLANE_ALIGNMENT_AFTER_DEPENDENCY_001_TO_007_POST_TRUST_SPINE_REPRIORITIZATION_BOUNDARY_v1.md",
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
  "## DHC Alignment Matrix",
  "## DHC Alignment Summary After D001-D007 Reprioritization",
);
const recommendedNext = sectionBetween("## Recommended Next Posture");

test("boundary doc exists", () => {
  assert.equal(fs.existsSync(docsPath), true);
});

test("identity/status tokens exist", () => {
  assertIncludesAll([
    "DHC_ALIGNMENT_AFTER_DEPENDENCY_001_TO_007_POST_TRUST_SPINE_REPRIORITIZATION_BOUNDARY",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_ALIGNMENT_AFTER_DEPENDENCY_001_TO_007_POST_TRUST_SPINE_REPRIORITIZATION_BOUNDARY",
    "DOCS_ONLY",
    "DHC_ALIGNMENT_AFTER_D001_D007_REPRIORITIZATION_ONLY",
    "DHC_ALIGNMENT_AFTER_D001_D007_REPRIORITIZATION_PARTIAL_GAP_CONTEXT",
    "DHC_ALIGNMENT_AFTER_D001_D007_REPRIORITIZATION_NON_AUTHORIZING",
    "DHC_ALIGNMENT_AFTER_D001_D007_REPRIORITIZATION_NOT_DHC_IMPLEMENTATION",
    "DHC_ALIGNMENT_AFTER_D001_D007_REPRIORITIZATION_NOT_DHC_CLOSURE",
    "DHC_ALIGNMENT_AFTER_D001_D007_REPRIORITIZATION_NOT_IMPLEMENTATION_READINESS_AUTHORIZATION",
    "DHC_ALIGNMENT_AFTER_D001_D007_REPRIORITIZATION_NOT_IMPLEMENTATION",
    "DHC_ALIGNMENT_AFTER_D001_D007_REPRIORITIZATION_NOT_RUNTIME_BEHAVIOR",
    "DHC_ALIGNMENT_AFTER_D001_D007_REPRIORITIZATION_NOT_RUNTIME_API_SCHEMA_PACKAGE_BEHAVIOR_CHANGE",
    "DHC_ALIGNMENT_AFTER_D001_D007_REPRIORITIZATION_NOT_RUNTIME_GATE_MOVEMENT",
    "DHC_ALIGNMENT_AFTER_D001_D007_REPRIORITIZATION_NOT_LOCAL_SANITIZED_TEST_PILOT",
    "DHC_ALIGNMENT_AFTER_D001_D007_REPRIORITIZATION_NOT_REAL_PRIVATE_RUN",
    "DHC_ALIGNMENT_AFTER_D001_D007_REPRIORITIZATION_NOT_CI_EVIDENCE",
    "DHC_ALIGNMENT_AFTER_D001_D007_REPRIORITIZATION_NOT_RELEASE_APPROVAL",
    "DHC_ALIGNMENT_AFTER_D001_D007_REPRIORITIZATION_NOT_PRODUCT_CANDIDATE",
    "DHC_ALIGNMENT_AFTER_D001_D007_REPRIORITIZATION_NOT_EXTERNAL_USE_AUTHORIZATION",
    "DHC_ALIGNMENT_AFTER_D001_D007_REPRIORITIZATION_NOT_BLOCKER_RESOLUTION",
    "DHC_ALIGNMENT_AFTER_D001_D007_REPRIORITIZATION_NOT_DEPENDENCY_CLOSURE",
    "DHC_ALIGNMENT_INSERTED_BEFORE_D006_RUNTIME_GATE_MOVEMENT",
    "DHC_REMAINS_UNRESOLVED_NOT_CLOSED",
    "D001_TO_D007_REMAIN_UNRESOLVED_NOT_CLOSED",
    "RUNTIME_GATE_MOVEMENT_REMAINS_DOWNSTREAM",
    "DEPENDENCY_ORDER_REMAINS_D001_D002_D003_D004_D005_DHC_D006_D007",
    "DHC_ALIGNMENT_AFTER_D001_D007_REPRIORITIZATION_CONTINUED_PAUSE",
  ]);
});

test("purpose exists", () => {
  assertIncludesAll([
    "This boundary freezes the completed read-only DHC alignment review after the D001-D007 post-trust-spine reprioritization boundary as DOCS_ONLY repo evidence only.",
    "The read-only review result was `PARTIAL_GAP_REQUIRES_DOCS_ONLY_DHC_ALIGNMENT_AFTER_DEPENDENCY_001_TO_007_POST_TRUST_SPINE_REPRIORITIZATION_BOUNDARY`.",
    "DHC alignment remains before D006 runtime-gate movement.",
    "A+B and D001-D007 clarify DHC sequencing but do not create DHC implementation, DHC closure, runtime gates, implementation-readiness, implementation, runtime/API/schema/package behavior, CI evidence, release approval, product candidate, external-use, blocker resolution, or dependency closure.",
    "Local sanitized test pilot remains not selected.",
    "Real private run remains not authorized.",
  ]);
});

test("source hierarchy exists", () => {
  assertIncludesAll([
    "LIVE_REPO_EVIDENCE_WINS",
    "TRACKED_REPO_EVIDENCE_CONTROLS_CURRENT_STATE",
    "NEW_THREAD_HANDOFF_FILE_IS_CONTEXT_ONLY",
    "DEPENDENCY_001_TO_007_POST_TRUST_SPINE_REPRIORITIZATION_BOUNDARY_CONTROLS_CURRENT_DEPENDENCY_ORDER",
    "TRUST_SPINE_PLANNING_ROUND_SUMMARY_BOUNDARY_CONTROLS_A_AND_B_PLANNING_CONTEXT",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_ENTRY_CANDIDATE_SCOPE_BOUNDARY_CONTROLS_DHC_SCOPE",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_STATUS_GAP_BOUNDARY_CONTROLS_DHC_STATUS_GAP",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_EVIDENCE_CLOSURE_PLAN_BOUNDARY_CONTROLS_DHC_EVIDENCE_CLOSURE_PLAN",
    "DATA_HANDLING_SECURITY_CONTROL_PLANE_PLANNING_ROUND_SUMMARY_CONTROLS_DHC_PLANNING_CONTEXT",
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
    "44562fe docs(context): refresh new-thread handoff after D001-D007 post-trust-spine reprioritization",
    "39c28ea docs(domain): freeze D001-D007 post-trust-spine reprioritization boundary",
    "27cd7ff new-thread handoff after minimum viable trust spine planning-round summary boundary",
    "DEPENDENCY_001_TO_007_POST_TRUST_SPINE_REPRIORITIZATION_AND_HANDOFF_REVIEWED_AND_PAUSED_NO_CHANGE",
    "REVIEW_ONLY_DHC_ALIGNMENT_AFTER_DEPENDENCY_001_TO_007_POST_TRUST_SPINE_REPRIORITIZATION_COMPLETED_NO_CHANGE",
    "POST_D001_D007_REPRIORITIZATION_DHC_ALIGNMENT_RECOMMENDATION_SELECTED_NO_CHANGE",
    "COMBINED_READ_ONLY_DHC_ALIGNMENT_AFTER_DEPENDENCY_001_TO_007_POST_TRUST_SPINE_REPRIORITIZATION_COMPLETED_NO_CHANGE",
    "The current safe posture remains continued pause until a separate next posture is selected.",
  ]);
});

test("prior read-only review result exists", () => {
  assertIncludesAll([
    "The REVIEW_ONLY DHC alignment after D001-D007 post-trust-spine reprioritization was performed.",
    "RECOVERY_AFTER_INTERRUPTED_READ_ONLY_DHC_ALIGNMENT_REVIEW_CLEAN_NO_CHANGE",
    "The result was `PARTIAL_GAP_REQUIRES_DOCS_ONLY_DHC_ALIGNMENT_AFTER_DEPENDENCY_001_TO_007_POST_TRUST_SPINE_REPRIORITIZATION_BOUNDARY`.",
    "A future DOCS_ONLY DHC alignment boundary is suitable.",
    "This boundary freezes that partial/gap result only.",
    "This boundary does not convert alignment into DHC implementation, DHC closure, implementation-readiness authorization, implementation, runtime behavior, CI evidence, release approval, product candidate, external-use authorization, local sanitized pilot, real private run, blocker closure, or dependency closure.",
  ]);
});

test("DHC alignment matrix exists", () => {
  assertIncludesAll([
    "row ID",
    "DHC alignment surface",
    "current tracked evidence level",
    "relation to D001-D007 order",
    "trust-spine contribution from A+B",
    "current blocker status",
    "upstream dependencies",
    "downstream dependencies",
    "implementation gap",
    "required future implementation or authorization evidence",
    "required future test/CI evidence",
    "what remains non-authorized",
    "Every row preserves DOCS_ONLY alignment only, partial/gap where applicable, no DHC implementation, no DHC closure, no implementation-readiness authorization, no implementation, no runtime/API/schema/package behavior change, no CI evidence, no release approval, no product candidate, no external-use, no local sanitized pilot, no real private run, no blocker resolution, no dependency closure, and continued pause.",
  ], matrix);
});

test("all DHC-ALIGN rows exist", () => {
  const rows = Array.from({ length: 26 }, (_, index) =>
    `| DHC-ALIGN-${String(index + 1).padStart(3, "0")} |`,
  );
  assertIncludesAll(rows, matrix);
});

test("required row content exists", () => {
  assertIncludesAll([
    "DHC planning posture after D001-D007 reprioritization",
    "DHC alignment remains inserted before D006 runtime-gate movement",
    "D001 RBAC/admin-support alignment",
    "blocked/not implemented",
    "D001 remains first and upstream for DHC access-control clarity",
    "D002 audit/access-log alignment",
    "D002 follows D001 and is needed for DHC event/log clarity",
    "D003 retention/deletion alignment",
    "D003 follows D001-D002 and is needed for lifecycle controls",
    "D004 raw-material routing alignment",
    "D004 follows D001-D003 and must preserve no raw/private/source inspection",
    "D005 third-party/provider routing alignment",
    "third-party model/API routing authorization/status/provider registry absent",
    "D006 remains downstream of D001-D005 and DHC; no dispatch, registry, lookup, or runtime gate exists",
    "D007 remains downstream and absent/unauthorized",
    "retention implementation and tests are absent",
    "deletion execution proof is absent",
    "encryption implementation-backed evidence is absent",
    "audit/access-log runtime evidence is absent",
    "role permissions/RBAC implementation is absent",
    "raw-material routing implementation is absent",
    "access control beyond route/case/capability remains unresolved",
    "complete global access-control threat model remains blocked",
    "posture only, not runtime enforcement",
    "local sanitized test pilot is not authorized",
    "real private run blocker is preserved",
    "implementation evidence is absent",
    "test evidence is partial/tested-scenario only",
    "CI evidence is absent",
    "closure criteria are not met",
    "all approvals, sign-offs, findings, severity, remediation, product/external-use, delivery, packet approval remain non-authorized",
  ], matrix);
});

test("DHC alignment summary exists", () => {
  assertIncludesAll([
    "DHC alignment should remain inserted before D006 runtime-gate movement.",
    "Runtime-gate movement remains downstream.",
    "DHC alignment does not mean DHC implementation.",
    "DHC alignment does not mean DHC closure.",
    "DHC alignment does not mean runtime gate movement.",
    "DHC remains unresolved/not closed.",
    "D001-D007 remain unresolved/not closed.",
    "Local sanitized test pilot remains a future separate scope only.",
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
    "local sanitized test pilot",
    "real private run",
    "blocker resolution",
    "dependency closure",
    "finding",
    "severity",
    "remediation",
  ], sectionBetween("## Required Non-Authorizations", "## Evidence Limits"));
});

test("evidence limits exist", () => {
  assertIncludesAll([
    "DHC alignment boundary is not DHC implementation.",
    "DHC alignment boundary is not DHC closure.",
    "DHC alignment boundary is not implementation-readiness authorization.",
    "DHC alignment boundary is not implementation.",
    "DHC alignment boundary is not implementation evidence.",
    "Alignment does not mean blocker resolution.",
    "Ordering does not mean closure.",
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
    "DHC alignment does not mean DHC implementation.",
    "DHC alignment does not mean DHC closure.",
    "DHC before D006 does not mean runtime gates may move now.",
    "D001 alignment does not mean RBAC exists.",
    "D002 alignment does not mean audit/access-log exists.",
    "D003 alignment does not mean retention/deletion exists.",
    "D004 alignment does not mean raw routing exists.",
    "D005 alignment does not mean third-party routing is authorized.",
    "D006 downstream placement does not mean runtime gates exist.",
    "D007 downstream placement does not mean CI/release/product/external-use readiness.",
    "No-raw posture does not mean runtime no-leak enforcement.",
    "Local sanitized pilot implication does not mean pilot authorization.",
    "Real private run blocker preservation does not mean real private run authorization.",
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
    "Should we freeze a DOCS_ONLY DHC alignment boundary after D001-D007 reprioritization and before D006 runtime-gate movement, with no implementation, closure, product, external-use, local sanitized pilot, real private run, or delivery authorization?",
    "external-review requirements remains advisory context only, not approval, sign-off, implementation-readiness authorization, implementation authorization, release approval, product candidate, external-use authorization, local sanitized pilot authorization, real private run authorization, or DHC closure.",
  ]);
});

test("recommended next posture is limited", () => {
  assertIncludesAll([
    "Only these may be recommended:",
    "REVIEW_ONLY_DHC_ALIGNMENT_AFTER_DEPENDENCY_001_TO_007_POST_TRUST_SPINE_REPRIORITIZATION_BOUNDARY",
    "DOCS_ONLY_NEW_THREAD_HANDOFF_REFRESH_AFTER_DHC_ALIGNMENT_AFTER_DEPENDENCY_001_TO_007_POST_TRUST_SPINE_REPRIORITIZATION_BOUNDARY",
    "continued pause",
    "None are authorized by this boundary.",
  ], recommendedNext);
});

test("forbidden exact overclaiming tokens are absent", () => {
  assertDoesNotIncludeExactToken([
    "DHC_ALIGNMENT_AUTHORIZES_IMPLEMENTATION_READINESS",
    "DHC_ALIGNMENT_AUTHORIZES_IMPLEMENTATION",
    "DHC_ALIGNMENT_CREATES_DHC_IMPLEMENTATION",
    "DHC_ALIGNMENT_CREATES_DHC_CLOSURE",
    "DHC_ALIGNMENT_CREATES_RUNTIME_GATE_MOVEMENT",
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
    "REAL_PRIVATE_RUN_AUTHORIZED",
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
