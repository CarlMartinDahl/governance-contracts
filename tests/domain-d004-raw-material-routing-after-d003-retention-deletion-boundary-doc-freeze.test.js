const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const docsPath = path.join(
  __dirname,
  "..",
  "docs",
  "DOMAIN_CONTRACTS_D004_RAW_MATERIAL_ROUTING_AFTER_D003_RETENTION_DELETION_BOUNDARY_v1.md",
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
  "## D004-RMR Matrix",
  "## D004 Raw-Material Routing Summary After D003 Retention/Deletion",
);
const recommendations = sectionBetween("## Recommended Next Posture");

test("boundary doc exists", () => {
  assert.equal(fs.existsSync(docsPath), true);
});

test("identity/status tokens exist", () => {
  assertIncludesAll([
    "D004_RAW_MATERIAL_ROUTING_AFTER_D003_RETENTION_DELETION_BOUNDARY",
    "D004_RAW_MATERIAL_ROUTING_AFTER_D003_RETENTION_DELETION_ONLY",
    "DOCS_ONLY",
    "D004_RAW_MATERIAL_ROUTING_AFTER_D003_RETENTION_DELETION_PARTIAL_GAP_CONTEXT",
    "D004_RAW_MATERIAL_ROUTING_AFTER_D003_RETENTION_DELETION_NON_AUTHORIZING",
    "D004_RAW_MATERIAL_ROUTING_AFTER_D003_RETENTION_DELETION_NOT_IMPLEMENTATION_READINESS_AUTHORIZATION",
    "D004_RAW_MATERIAL_ROUTING_AFTER_D003_RETENTION_DELETION_NOT_IMPLEMENTATION",
    "D004_RAW_MATERIAL_ROUTING_AFTER_D003_RETENTION_DELETION_NOT_RUNTIME_BEHAVIOR",
    "D004_RAW_MATERIAL_ROUTING_AFTER_D003_RETENTION_DELETION_NOT_RUNTIME_API_SCHEMA_PACKAGE_BEHAVIOR_CHANGE",
    "D004_RAW_MATERIAL_ROUTING_AFTER_D003_RETENTION_DELETION_NOT_RAW_MATERIAL_ROUTING_IMPLEMENTATION",
    "D004_RAW_MATERIAL_ROUTING_AFTER_D003_RETENTION_DELETION_NOT_RAW_ROUTING_RUNTIME_BEHAVIOR",
    "D004_RAW_MATERIAL_ROUTING_AFTER_D003_RETENTION_DELETION_NOT_ROUTING_RUNTIME_BEHAVIOR",
    "D004_RAW_MATERIAL_ROUTING_AFTER_D003_RETENTION_DELETION_NOT_RAW_PRIVATE_SOURCE_INSPECTION",
    "D004_RAW_MATERIAL_ROUTING_AFTER_D003_RETENTION_DELETION_NOT_SOURCE_PACKAGE_INSPECTION",
    "D004_RAW_MATERIAL_ROUTING_AFTER_D003_RETENTION_DELETION_NOT_PDF_IMAGE_SCREENSHOT_METADATA_INSPECTION",
    "D004_RAW_MATERIAL_ROUTING_AFTER_D003_RETENTION_DELETION_NOT_METADATA_ACQUISITION",
    "D004_RAW_MATERIAL_ROUTING_AFTER_D003_RETENTION_DELETION_NOT_NO_RAW_RUNTIME_ENFORCEMENT",
    "D004_RAW_MATERIAL_ROUTING_AFTER_D003_RETENTION_DELETION_NOT_QUARANTINE_IMPLEMENTATION",
    "D004_RAW_MATERIAL_ROUTING_AFTER_D003_RETENTION_DELETION_NOT_DENY_ROUTE_IMPLEMENTATION",
    "D004_RAW_MATERIAL_ROUTING_AFTER_D003_RETENTION_DELETION_NOT_MATERIAL_CLASSIFIER_IMPLEMENTATION",
    "D004_RAW_MATERIAL_ROUTING_AFTER_D003_RETENTION_DELETION_NOT_DATA_ROUTING_MAP",
    "D004_RAW_MATERIAL_ROUTING_AFTER_D003_RETENTION_DELETION_NOT_THIRD_PARTY_ROUTING_AUTHORIZATION",
    "D004_RAW_MATERIAL_ROUTING_AFTER_D003_RETENTION_DELETION_NOT_LOCAL_SANITIZED_TEST_PILOT",
    "D004_RAW_MATERIAL_ROUTING_AFTER_D003_RETENTION_DELETION_NOT_REAL_PRIVATE_RUN",
    "D004_RAW_MATERIAL_ROUTING_AFTER_D003_RETENTION_DELETION_NOT_CI_EVIDENCE",
    "D004_RAW_MATERIAL_ROUTING_AFTER_D003_RETENTION_DELETION_NOT_RELEASE_APPROVAL",
    "D004_RAW_MATERIAL_ROUTING_AFTER_D003_RETENTION_DELETION_NOT_PRODUCT_CANDIDATE",
    "D004_RAW_MATERIAL_ROUTING_AFTER_D003_RETENTION_DELETION_NOT_EXTERNAL_USE_AUTHORIZATION",
    "D004_RAW_MATERIAL_ROUTING_AFTER_D003_RETENTION_DELETION_NOT_BLOCKER_RESOLUTION",
    "D004_RAW_MATERIAL_ROUTING_AFTER_D003_RETENTION_DELETION_NOT_DEPENDENCY_CLOSURE",
    "D004_REMAINS_UNRESOLVED_NOT_CLOSED",
    "D004_REMAINS_NEXT_FOCUSED_BLOCKER_AFTER_D003",
    "D004_PRECEDES_D005_D006_D007",
    "RAW_PRIVATE_SOURCE_INSPECTION_REMAINS_PROHIBITED",
    "SOURCE_PACKAGE_INSPECTION_REMAINS_PROHIBITED",
    "PDF_IMAGE_SCREENSHOT_METADATA_INSPECTION_REMAINS_PROHIBITED",
    "METADATA_ACQUISITION_REMAINS_PROHIBITED",
    "RAW_MATERIAL_ROUTING_REMAINS_NO_RAW_NO_PRIVATE_NO_SOURCE_LOCATOR_NO_TOKEN_NO_URL",
    "DENY_QUARANTINE_ROUTING_REMAINS_POSTURE_FUTURE_ONLY",
    "MATERIAL_CLASS_ROUTING_REMAINS_SPECIFICATION_ONLY",
    "D005_PROVIDER_ROUTING_REMAINS_DOWNSTREAM_UNAUTHORIZED",
    "LOCAL_SANITIZED_TEST_PILOT_REMAINS_FUTURE_SCOPE_ONLY",
    "REAL_PRIVATE_RUN_REMAINS_BLOCKED",
    "D004_RAW_MATERIAL_ROUTING_AFTER_D003_RETENTION_DELETION_CONTINUED_PAUSE",
  ]);
});

test("purpose exists", () => {
  assertIncludesAll([
    "This boundary freezes the completed read-only D004 raw-material routing review after D003 retention/deletion as DOCS_ONLY repo evidence only.",
    "The review result was `PARTIAL_GAP_REQUIRES_DOCS_ONLY_D004_RAW_MATERIAL_ROUTING_AFTER_D003_RETENTION_DELETION_BOUNDARY`.",
    "D004 remains the next focused blocker after D003.",
    "D004 should precede D005 third-party/provider routing, D006 runtime gates, local pilot execution, real private run, and D007 release/product/external-use.",
    "Raw/private/source inspection, source-package inspection, PDF/image/screenshot/metadata inspection, and metadata acquisition remain prohibited.",
    "Raw-material routing remains no-raw/no-private/no-source-locator/no-token/no-URL.",
    "Deny/quarantine routing and material-class routing remain future-only/specification-only.",
  ]);
});

test("source hierarchy exists", () => {
  assertIncludesAll([
    "LIVE_REPO_EVIDENCE_WINS",
    "TRACKED_REPO_EVIDENCE_CONTROLS_CURRENT_STATE",
    "NEW_THREAD_HANDOFF_FILE_IS_CONTEXT_ONLY",
    "D003_RETENTION_DELETION_AFTER_D002_AUDIT_ACCESS_LOG_BOUNDARY_CONTROLS_CURRENT_D003_CONTEXT",
    "D002_AUDIT_ACCESS_LOG_AFTER_D001_RBAC_ADMIN_SUPPORT_BOUNDARY_CONTROLS_CURRENT_D002_CONTEXT",
    "D001_RBAC_ADMIN_SUPPORT_AFTER_DATA_HANDLING_CONTROL_PLAN_BOUNDARY_CONTROLS_CURRENT_D001_CONTEXT",
    "DATA_HANDLING_IMPLEMENTATION_CONTROL_PLAN_AFTER_DHC_ALIGNMENT_BOUNDARY_CONTROLS_CURRENT_DATA_HANDLING_CONTEXT",
    "DHC_ALIGNMENT_AFTER_D001_D007_REPRIORITIZATION_BOUNDARY_CONTROLS_CURRENT_DHC_ALIGNMENT_CONTEXT",
    "DEPENDENCY_001_TO_007_POST_TRUST_SPINE_REPRIORITIZATION_BOUNDARY_CONTROLS_CURRENT_DEPENDENCY_ORDER",
    "D004_RAW_MATERIAL_ROUTING_PLANNING_SUMMARY_CONTROLS_D004_CONTEXT",
    "D004_RAW_MATERIAL_ROUTING_STATUS_GAP_BOUNDARY_CONTROLS_D004_STATUS_GAP",
    "D004_RAW_MATERIAL_ROUTING_EVIDENCE_CLOSURE_PLAN_BOUNDARY_CONTROLS_D004_EVIDENCE_CONTEXT_IF_PRESENT",
    "RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_BOUNDARY_CONTROLS_D004_CONTROL_SPEC_CONTEXT",
    "RBAC_ADMIN_SUPPORT_CONTEXT_IS_UPSTREAM_CONTEXT_ONLY",
    "AUDIT_ACCESS_LOG_CONTEXT_IS_UPSTREAM_CONTEXT_ONLY",
    "RETENTION_DELETION_CONTEXT_IS_UPSTREAM_CONTEXT_ONLY",
    "THIRD_PARTY_PROVIDER_ROUTING_CONTEXT_IS_DOWNSTREAM_CONTEXT_ONLY",
    "RUNTIME_GATE_CONTEXT_IS_DOWNSTREAM_CONTEXT_ONLY",
    "LOCAL_SANITIZED_PILOT_CONTEXT_IS_DOWNSTREAM_FUTURE_CONTEXT_ONLY",
    "EXTERNAL_REVIEW_REQUIREMENTS_USED_AS_ADVISORY_CONTEXT_ONLY",
    "OLD_HANDOFF_FILES_ARE_HISTORICAL_CONTEXT_ONLY",
    "STALE_HANDOFF_MUST_NOT_SELECT_REOPEN_OR_CLOSE_SLICE",
  ]);
});

test("current accepted state and prior result exist", () => {
  assertIncludesAll([
    "8399b0d docs(context): refresh new-thread handoff after D003 retention deletion boundary",
    "4fd0b26 docs(domain): freeze D003 retention deletion after D002 audit boundary",
    "af1fd3b docs(domain): freeze D002 audit access log after D001 boundary",
    "21f8c0d docs(domain): freeze D001 RBAC admin support after data handling control plan boundary",
    "070133e docs(domain): freeze data handling control plan after DHC alignment boundary",
    "58c4e4f docs(domain): freeze DHC alignment after D001-D007 reprioritization boundary",
    "39c28ea docs(domain): freeze D001-D007 post-trust-spine reprioritization boundary",
    "D003_RETENTION_DELETION_AND_HANDOFF_REVIEWED_AND_PAUSED_NO_CHANGE",
    "REVIEW_ONLY_D004_RAW_MATERIAL_ROUTING_AFTER_D003_RETENTION_DELETION_COMPLETED_NO_CHANGE",
    "POST_D003_RETENTION_DELETION_D004_RAW_MATERIAL_ROUTING_RECOMMENDATION_SELECTED_NO_CHANGE",
    "COMBINED_READ_ONLY_D004_RAW_MATERIAL_ROUTING_AFTER_D003_RETENTION_DELETION_COMPLETED_NO_CHANGE",
    "The current safe posture remains continued pause until a separate next posture is selected.",
    "The REVIEW_ONLY D004 raw-material routing after D003 retention/deletion was performed.",
    "A future DOCS_ONLY D004 raw-material routing boundary is suitable.",
    "This boundary freezes that partial/gap result only.",
  ]);
});

test("D004-RMR matrix exists and all rows exist", () => {
  assertIncludesAll([
    "row ID",
    "raw-material routing surface",
    "current tracked evidence level",
    "relation to D003 and D001-D007 order",
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
    assertIncludesAll([`D004-RMR-${String(index).padStart(3, "0")}`], matrix);
  }
});

test("required row content exists", () => {
  assertIncludesAll([
    "D004 planning posture remains DOCS_ONLY partial/gap and follows D003 before D005-D007.",
    "Raw/private/source routing remains not authorized/unresolved; no route path exists.",
    "Source package routing remains not authorized; no package path exists.",
    "PDF/image/screenshot/metadata routing remains not authorized; no inspection or acquisition path exists.",
    "Material-class routing vocabulary remains DOCS_ONLY/specification-only; no dispatcher or classifier exists.",
    "Deny-by-default routing remains future-only; no enforcement exists.",
    "Quarantine/block decision posture remains future-only; no runtime quarantine exists.",
    "No-raw/no-private/no-source-locator/no-token/no-URL routing remains specification-only; no runtime enforcement exists.",
    "Raw/private/source inspection remains prohibited.",
    "Metadata acquisition remains prohibited.",
    "Local log/test transcript routing remains DOCS_ONLY; local logs are not CI evidence and not packet components.",
    "Generated/export artifact routing remains unresolved; no delivery/external-use is authorized.",
    "Third-party/API routed material remains unresolved and downstream of D004; provider routing is not authorized.",
    "RBAC/admin-support routing dependency remains upstream/future-only and cannot bypass human/professional review.",
    "Audit/access-log routing event dependency remains future-only and does not create logging implementation.",
    "Retention/deletion lifecycle dependency remains upstream/future-only and does not create lifecycle runtime behavior.",
    "D003 lifecycle precondition remains unresolved/future-only.",
    "Material intake gate candidate remains specification-only; no runtime gate exists.",
    "Prohibited ingress/blocked material candidate remains specification-only; no denial event/storage exists.",
    "Redaction/sanitization dependency remains future-only; no source inspection or redaction runtime exists.",
    "Manifest validation/no-metadata dependency remains specification-only; no metadata acquisition is authorized.",
    "Wrong-tenant/wrong-case/wrong-material routing tests remain future evidence only.",
    "D005 provider routing remains downstream, unresolved, and unauthorized.",
    "Runtime gates remain downstream; no validator dispatch, registry/lookup, runtime gate, or runtime-gate movement exists.",
    "Local sanitized test pilot remains planning-only/future and not selected.",
    "Real private run remains blocked and not authorized.",
    "Implementation evidence is absent.",
    "Test/CI evidence is absent or future-only.",
    "Closure criteria are not met and remain future-only.",
    "Continued pause preserves no approvals, sign-offs, findings, severity, remediation, product, external-use, delivery, packet approval, blocker resolution, or dependency closure.",
  ]);
});

test("summary, non-authorizations, evidence limits, and no-overclaim rules exist", () => {
  assertIncludesAll([
    "D004 is the next focused blocker after D003.",
    "D004 should precede D005 third-party/provider routing.",
    "D004 should precede D006 runtime gates.",
    "D004 should precede local pilot execution.",
    "D004 should precede real private run.",
    "D004 should precede D007 release/product/external-use.",
    "D004 cannot be closed now.",
    "No implementation-readiness authorization is created now.",
    "No implementation is created now.",
    "This boundary creates or authorizes none of the following:",
    "raw-material routing implementation",
    "raw/private/source inspection",
    "source package inspection",
    "PDF/image/screenshot/metadata inspection",
    "metadata acquisition",
    "third-party routing implementation or authorization",
    "runtime gate movement",
    "local sanitized test pilot execution",
    "real private run",
    "blocker resolution",
    "dependency closure",
    "D004 raw-material routing boundary is not raw-material routing implementation.",
    "D004 raw-material routing boundary is not raw routing runtime behavior.",
    "D004 raw-material routing boundary is not metadata acquisition.",
    "Material-class vocabulary does not mean classifier exists.",
    "Deny/quarantine posture does not mean enforcement exists.",
    "No-raw/no-private/no-source-locator/no-token/no-URL posture does not mean runtime enforcement exists.",
    "Local logs are not CI evidence.",
    "Local logs are not packet components.",
    "DOCS_ONLY boundaries are not runtime enforcement.",
    "D004 review does not mean raw-material routing exists.",
    "D004 review does not mean raw routing runtime behavior exists.",
    "Raw/private/source routing row does not authorize raw/private/source inspection.",
    "D004 before D006 does not mean runtime gates may move now.",
    "Closure criteria do not mean closure.",
    "Any future implementation-readiness authorization requires separate explicit authorization.",
    "Any future implementation requires separate explicit authorization.",
  ]);
});

test("External Reviewer posture and recommended next posture exist", () => {
  assertIncludesAll([
    "No external-review request is required by this boundary.",
    "Should we freeze a DOCS_ONLY D004 raw-material routing boundary after D003 retention/deletion",
    "external-review requirements remains advisory context only",
  ]);

  assertIncludesAll([
    "REVIEW_ONLY_D004_RAW_MATERIAL_ROUTING_AFTER_D003_RETENTION_DELETION_BOUNDARY",
    "DOCS_ONLY_NEW_THREAD_HANDOFF_REFRESH_AFTER_D004_RAW_MATERIAL_ROUTING_AFTER_D003_RETENTION_DELETION_BOUNDARY",
    "continued pause",
    "None are authorized by this boundary.",
  ], recommendations);
});

test("forbidden exact overclaiming tokens are absent", () => {
  assertDoesNotIncludeExactToken([
    "D004_RAW_MATERIAL_ROUTING_AUTHORIZES_IMPLEMENTATION_READINESS",
    "D004_RAW_MATERIAL_ROUTING_AUTHORIZES_IMPLEMENTATION",
    "D004_RAW_MATERIAL_ROUTING_CREATES_RAW_MATERIAL_ROUTING_IMPLEMENTATION",
    "D004_RAW_MATERIAL_ROUTING_CREATES_RAW_ROUTING_RUNTIME_BEHAVIOR",
    "D004_RAW_MATERIAL_ROUTING_CREATES_ROUTING_RUNTIME_BEHAVIOR",
    "D004_RAW_MATERIAL_ROUTING_CREATES_RAW_PRIVATE_SOURCE_INSPECTION",
    "D004_RAW_MATERIAL_ROUTING_CREATES_SOURCE_PACKAGE_INSPECTION",
    "D004_RAW_MATERIAL_ROUTING_CREATES_PDF_IMAGE_SCREENSHOT_METADATA_INSPECTION",
    "D004_RAW_MATERIAL_ROUTING_CREATES_METADATA_ACQUISITION",
    "D004_RAW_MATERIAL_ROUTING_CREATES_NO_RAW_RUNTIME_ENFORCEMENT",
    "D004_RAW_MATERIAL_ROUTING_CREATES_QUARANTINE_IMPLEMENTATION",
    "D004_RAW_MATERIAL_ROUTING_CREATES_DENY_ROUTE_IMPLEMENTATION",
    "D004_RAW_MATERIAL_ROUTING_CREATES_MATERIAL_CLASSIFIER_IMPLEMENTATION",
    "D004_RAW_MATERIAL_ROUTING_CREATES_DATA_ROUTING_MAP",
    "D004_CLOSED",
    "D004_BLOCKER_RESOLVED",
    "RAW_MATERIAL_ROUTING_IMPLEMENTED",
    "RAW_ROUTING_RUNTIME_BEHAVIOR_CREATED",
    "ROUTING_RUNTIME_BEHAVIOR_CREATED",
    "RAW_PRIVATE_SOURCE_INSPECTION_AUTHORIZED",
    "SOURCE_PACKAGE_INSPECTION_AUTHORIZED",
    "PDF_IMAGE_SCREENSHOT_METADATA_INSPECTION_AUTHORIZED",
    "METADATA_ACQUISITION_AUTHORIZED",
    "NO_RAW_RUNTIME_ENFORCEMENT_CREATED",
    "QUARANTINE_IMPLEMENTED",
    "DENY_ROUTE_IMPLEMENTED",
    "MATERIAL_CLASSIFIER_IMPLEMENTED",
    "DATA_ROUTING_MAP_CREATED",
    "THIRD_PARTY_ROUTING_AUTHORIZED",
    "THIRD_PARTY_ROUTING_IMPLEMENTED",
    "PROVIDER_INTEGRATION_CREATED",
    "PROVIDER_REGISTRY_CREATED",
    "PROVIDER_STATUS_IMPLEMENTATION_CREATED",
    "TOKEN_URL_SECRET_HANDLING_IMPLEMENTED",
    "LOCAL_LOGS_ARE_CI_EVIDENCE",
    "LOCAL_LOGS_ARE_PACKET_COMPONENTS",
    "CI_EVIDENCE_EXISTS",
    "IMPLEMENTATION_EVIDENCE_EXISTS",
    "TEST_EVIDENCE_EXISTS",
    "IMPLEMENTATION_READINESS_AUTHORIZED",
    "IMPLEMENTATION_AUTHORIZED",
    "RUNTIME_AUTHORIZED",
    "RUNTIME_READY",
    "MODEL_RUNTIME_READY",
    "MODEL_COMPLETE",
    "MODEL_COMPLETION_READY",
    "RETENTION_IMPLEMENTED",
    "DELETION_IMPLEMENTED",
    "PURGE_IMPLEMENTED",
    "LIFECYCLE_RUNTIME_BEHAVIOR_CREATED",
    "DELETION_EXECUTION_PROOF_CREATED",
    "AUDIT_ACCESS_LOG_IMPLEMENTED",
    "AUDIT_LOGGING_IMPLEMENTED",
    "ACCESS_LOGGING_IMPLEMENTED",
    "EVENT_TAXONOMY_RUNTIME_CODE_CREATED",
    "EVENT_EMITTER_CREATED",
    "LOG_SCHEMA_CREATED",
    "LOG_STORAGE_CREATED",
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
    "RUNTIME_GATE_IMPLEMENTED",
    "RUNTIME_GATE_MOVEMENT_AUTHORIZED",
    "RUNTIME_GATE_INVENTORY_IMPLEMENTED",
    "VALIDATOR_DISPATCH_CREATED",
    "REGISTRY_LOOKUP_CREATED",
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
    "BLOCKER_RESOLVED",
    "DEPENDENCY_CLOSED",
    "SECURITY_FINDING_CREATED",
    "VULNERABILITY_FINDING_CREATED",
    "SEVERITY_ASSIGNED",
    "REMEDIATION_RECOMMENDED",
    "REMEDIATION_IMPLEMENTED",
  ]);
});
