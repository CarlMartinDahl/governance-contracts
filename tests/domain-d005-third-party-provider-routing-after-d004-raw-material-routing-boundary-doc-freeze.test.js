const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const docsPath = path.join(
  __dirname,
  "..",
  "docs",
  "DOMAIN_CONTRACTS_D005_THIRD_PARTY_PROVIDER_ROUTING_AFTER_D004_RAW_MATERIAL_ROUTING_BOUNDARY_v1.md",
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
  "## D005-TPR Matrix",
  "## D005 Third-Party/Provider Routing Summary After D004 Raw-Material Routing",
);
const recommendations = sectionBetween("## Recommended Next Posture");

test("boundary doc exists", () => {
  assert.equal(fs.existsSync(docsPath), true);
});

test("identity/status tokens exist", () => {
  assertIncludesAll([
    "D005_THIRD_PARTY_PROVIDER_ROUTING_AFTER_D004_RAW_MATERIAL_ROUTING_BOUNDARY",
    "D005_THIRD_PARTY_PROVIDER_ROUTING_AFTER_D004_RAW_MATERIAL_ROUTING_ONLY",
    "DOCS_ONLY",
    "D005_THIRD_PARTY_PROVIDER_ROUTING_AFTER_D004_RAW_MATERIAL_ROUTING_PARTIAL_GAP_CONTEXT",
    "D005_THIRD_PARTY_PROVIDER_ROUTING_AFTER_D004_RAW_MATERIAL_ROUTING_NON_AUTHORIZING",
    "D005_THIRD_PARTY_PROVIDER_ROUTING_AFTER_D004_RAW_MATERIAL_ROUTING_NOT_IMPLEMENTATION_READINESS_AUTHORIZATION",
    "D005_THIRD_PARTY_PROVIDER_ROUTING_AFTER_D004_RAW_MATERIAL_ROUTING_NOT_IMPLEMENTATION",
    "D005_THIRD_PARTY_PROVIDER_ROUTING_AFTER_D004_RAW_MATERIAL_ROUTING_NOT_RUNTIME_BEHAVIOR",
    "D005_THIRD_PARTY_PROVIDER_ROUTING_AFTER_D004_RAW_MATERIAL_ROUTING_NOT_RUNTIME_API_SCHEMA_PACKAGE_BEHAVIOR_CHANGE",
    "D005_THIRD_PARTY_PROVIDER_ROUTING_AFTER_D004_RAW_MATERIAL_ROUTING_NOT_THIRD_PARTY_ROUTING_IMPLEMENTATION",
    "D005_THIRD_PARTY_PROVIDER_ROUTING_AFTER_D004_RAW_MATERIAL_ROUTING_NOT_THIRD_PARTY_ROUTING_AUTHORIZATION",
    "D005_THIRD_PARTY_PROVIDER_ROUTING_AFTER_D004_RAW_MATERIAL_ROUTING_NOT_THIRD_PARTY_MODEL_API_ROUTING_AUTHORIZATION",
    "D005_THIRD_PARTY_PROVIDER_ROUTING_AFTER_D004_RAW_MATERIAL_ROUTING_NOT_PROVIDER_INTEGRATION",
    "D005_THIRD_PARTY_PROVIDER_ROUTING_AFTER_D004_RAW_MATERIAL_ROUTING_NOT_PROVIDER_REGISTRY",
    "D005_THIRD_PARTY_PROVIDER_ROUTING_AFTER_D004_RAW_MATERIAL_ROUTING_NOT_PROVIDER_STATUS_IMPLEMENTATION",
    "D005_THIRD_PARTY_PROVIDER_ROUTING_AFTER_D004_RAW_MATERIAL_ROUTING_NOT_DATA_ROUTING_MAP",
    "D005_THIRD_PARTY_PROVIDER_ROUTING_AFTER_D004_RAW_MATERIAL_ROUTING_NOT_PROVIDER_RETENTION_DELETION_POSTURE_IMPLEMENTATION",
    "D005_THIRD_PARTY_PROVIDER_ROUTING_AFTER_D004_RAW_MATERIAL_ROUTING_NOT_PROVIDER_AUDITABILITY_IMPLEMENTATION",
    "D005_THIRD_PARTY_PROVIDER_ROUTING_AFTER_D004_RAW_MATERIAL_ROUTING_NOT_PROVIDER_TOKEN_URL_SECRET_HANDLING_IMPLEMENTATION",
    "D005_THIRD_PARTY_PROVIDER_ROUTING_AFTER_D004_RAW_MATERIAL_ROUTING_NOT_TOKEN_URL_SECRET_HANDLING_IMPLEMENTATION",
    "D005_THIRD_PARTY_PROVIDER_ROUTING_AFTER_D004_RAW_MATERIAL_ROUTING_NOT_PROVIDER_PROMPT_RESPONSE_PAYLOAD_HANDLING",
    "D005_THIRD_PARTY_PROVIDER_ROUTING_AFTER_D004_RAW_MATERIAL_ROUTING_NOT_PROVIDER_PAYLOAD_HANDLING",
    "D005_THIRD_PARTY_PROVIDER_ROUTING_AFTER_D004_RAW_MATERIAL_ROUTING_NOT_RAW_PRIVATE_SOURCE_INSPECTION",
    "D005_THIRD_PARTY_PROVIDER_ROUTING_AFTER_D004_RAW_MATERIAL_ROUTING_NOT_SOURCE_PACKAGE_INSPECTION",
    "D005_THIRD_PARTY_PROVIDER_ROUTING_AFTER_D004_RAW_MATERIAL_ROUTING_NOT_PDF_IMAGE_SCREENSHOT_METADATA_INSPECTION",
    "D005_THIRD_PARTY_PROVIDER_ROUTING_AFTER_D004_RAW_MATERIAL_ROUTING_NOT_METADATA_ACQUISITION",
    "D005_THIRD_PARTY_PROVIDER_ROUTING_AFTER_D004_RAW_MATERIAL_ROUTING_NOT_LOCAL_SANITIZED_TEST_PILOT",
    "D005_THIRD_PARTY_PROVIDER_ROUTING_AFTER_D004_RAW_MATERIAL_ROUTING_NOT_REAL_PRIVATE_RUN",
    "D005_THIRD_PARTY_PROVIDER_ROUTING_AFTER_D004_RAW_MATERIAL_ROUTING_NOT_CI_EVIDENCE",
    "D005_THIRD_PARTY_PROVIDER_ROUTING_AFTER_D004_RAW_MATERIAL_ROUTING_NOT_RELEASE_APPROVAL",
    "D005_THIRD_PARTY_PROVIDER_ROUTING_AFTER_D004_RAW_MATERIAL_ROUTING_NOT_PRODUCT_CANDIDATE",
    "D005_THIRD_PARTY_PROVIDER_ROUTING_AFTER_D004_RAW_MATERIAL_ROUTING_NOT_EXTERNAL_USE_AUTHORIZATION",
    "D005_THIRD_PARTY_PROVIDER_ROUTING_AFTER_D004_RAW_MATERIAL_ROUTING_NOT_BLOCKER_RESOLUTION",
    "D005_THIRD_PARTY_PROVIDER_ROUTING_AFTER_D004_RAW_MATERIAL_ROUTING_NOT_DEPENDENCY_CLOSURE",
    "D005_REMAINS_UNRESOLVED_NOT_CLOSED",
    "D005_REMAINS_NEXT_FOCUSED_BLOCKER_AFTER_D004",
    "D005_PRECEDES_D006_D007",
    "THIRD_PARTY_PROVIDER_ROUTING_REMAINS_UNAUTHORIZED",
    "THIRD_PARTY_MODEL_API_ROUTING_REMAINS_UNAUTHORIZED",
    "PROVIDER_INTEGRATION_REMAINS_ABSENT",
    "PROVIDER_REGISTRY_REMAINS_ABSENT",
    "PROVIDER_STATUS_IMPLEMENTATION_REMAINS_ABSENT",
    "DATA_ROUTING_MAP_REMAINS_ABSENT",
    "PROVIDER_RETENTION_DELETION_POSTURE_REMAINS_ABSENT",
    "PROVIDER_AUDITABILITY_REMAINS_ABSENT",
    "TOKEN_URL_SECRET_HANDLING_REMAINS_ABSENT",
    "PROVIDER_PROMPT_RESPONSE_PAYLOAD_HANDLING_REMAINS_PROHIBITED_ABSENT",
    "NO_ROUTE_NO_PROVIDER_DENIAL_POSTURE_REMAINS_FUTURE_ONLY",
    "D005_ROUTING_REMAINS_NO_RAW_NO_PRIVATE_NO_SOURCE_LOCATOR_NO_TOKEN_NO_URL",
    "LOCAL_SANITIZED_TEST_PILOT_REMAINS_FUTURE_SCOPE_ONLY",
    "REAL_PRIVATE_RUN_REMAINS_BLOCKED",
    "D005_THIRD_PARTY_PROVIDER_ROUTING_AFTER_D004_RAW_MATERIAL_ROUTING_CONTINUED_PAUSE",
  ]);
});

test("purpose, source hierarchy, and accepted state exist", () => {
  assertIncludesAll([
    "This boundary freezes the completed read-only D005 third-party/provider routing review after D004 raw-material routing as DOCS_ONLY repo evidence only.",
    "The review result was `PARTIAL_GAP_REQUIRES_DOCS_ONLY_D005_THIRD_PARTY_PROVIDER_ROUTING_AFTER_D004_RAW_MATERIAL_ROUTING_BOUNDARY`.",
    "D005 remains the next focused blocker after D004.",
    "D005 should precede D006 runtime gates, local pilot execution, real private run, and D007 release/product/external-use.",
    "LIVE_REPO_EVIDENCE_WINS",
    "TRACKED_REPO_EVIDENCE_CONTROLS_CURRENT_STATE",
    "NEW_THREAD_HANDOFF_FILE_IS_CONTEXT_ONLY",
    "D004_RAW_MATERIAL_ROUTING_AFTER_D003_RETENTION_DELETION_BOUNDARY_CONTROLS_CURRENT_D004_CONTEXT",
    "D005_THIRD_PARTY_ROUTING_PLANNING_SUMMARY_CONTROLS_D005_CONTEXT",
    "D005_THIRD_PARTY_ROUTING_STATUS_GAP_BOUNDARY_CONTROLS_D005_STATUS_GAP",
    "D005_THIRD_PARTY_ROUTING_EVIDENCE_CLOSURE_PLAN_BOUNDARY_CONTROLS_D005_EVIDENCE_CONTEXT_IF_PRESENT",
    "THIRD_PARTY_PROVIDER_ROUTING_CONTROL_SPECIFICATION_BOUNDARY_CONTROLS_D005_CONTROL_SPEC_CONTEXT_IF_PRESENT",
    "EXTERNAL_REVIEW_REQUIREMENTS_USED_AS_ADVISORY_CONTEXT_ONLY",
    "STALE_HANDOFF_MUST_NOT_SELECT_REOPEN_OR_CLOSE_SLICE",
    "ca74bc0 docs(context): refresh new-thread handoff after D004 raw-material routing boundary",
    "4f26035 docs(domain): freeze D004 raw material routing after D003 retention deletion boundary",
    "REVIEW_ONLY_D005_THIRD_PARTY_PROVIDER_ROUTING_AFTER_D004_RAW_MATERIAL_ROUTING_COMPLETED_NO_CHANGE",
    "POST_D004_RAW_MATERIAL_ROUTING_D005_THIRD_PARTY_PROVIDER_ROUTING_RECOMMENDATION_SELECTED_NO_CHANGE",
    "COMBINED_READ_ONLY_D005_THIRD_PARTY_PROVIDER_ROUTING_AFTER_D004_RAW_MATERIAL_ROUTING_COMPLETED_NO_CHANGE",
  ]);
});

test("prior read-only review result exists", () => {
  assertIncludesAll([
    "The REVIEW_ONLY D005 third-party/provider routing after D004 raw-material routing was performed.",
    "A future DOCS_ONLY D005 third-party/provider routing boundary is suitable.",
    "This boundary freezes that partial/gap result only.",
    "This boundary does not convert review into third-party routing authorization, third-party/provider routing implementation, provider integration, provider registry, provider status implementation, data-routing map, provider retention/deletion posture, provider auditability, token/URL/secret handling, provider prompt/response/payload handling, implementation-readiness authorization, implementation, runtime behavior, CI evidence, release approval, product candidate, external-use authorization, local sanitized pilot execution, real private run, blocker closure, or dependency closure.",
  ]);
});

test("D005-TPR matrix exists and all rows exist", () => {
  assertIncludesAll([
    "row ID",
    "third-party/provider routing surface",
    "current tracked evidence level",
    "relation to D004 and D001-D007 order",
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
    assertIncludesAll([`D005-TPR-${String(index).padStart(3, "0")}`], matrix);
  }
});

test("required row content exists", () => {
  assertIncludesAll([
    "D005 planning posture remains DOCS_ONLY partial/gap and follows D004 before D006-D007.",
    "Third-party model/API routing remains absent and unauthorized; route policy is missing; no provider route exists.",
    "Provider identity/status is absent/not evidenced; provider identity/status contract is missing.",
    "Provider registry is absent; registry/status implementation is missing.",
    "Provider data-routing map is absent; tenant/case/material/provider map is missing.",
    "Provider retention/deletion posture is absent; D003 lifecycle dependency remains unresolved.",
    "Provider auditability/logging is absent; D002 event/log dependency remains unresolved.",
    "Provider token/URL/secret handling is unresolved/absent; no credential/endpoint policy exists.",
    "Provider prompt/response/payload handling is prohibited/absent; no provider payload path exists.",
    "No-route/no-provider-denial posture remains future-only; no denial implementation exists.",
    "Provider route approval candidate remains future-only; no approval semantics exist.",
    "Provider route denial candidate remains future-only; no denial event/storage exists.",
    "Third-party route event dependency remains future-only; no audit/log implementation exists.",
    "Admin/support provider approval risk remains unresolved and cannot bypass human/professional review.",
    "RBAC/admin-support provider dependency remains upstream/future-only; no RBAC/admin implementation exists.",
    "Audit/access-log provider dependency remains upstream/future-only; no event taxonomy/log schema/storage exists.",
    "Retention/deletion provider lifecycle remains upstream/future-only; no lifecycle runtime behavior exists.",
    "Raw-material routing provider dependency remains upstream/future-only; no raw routing implementation exists.",
    "No-raw/no-private/no-source-locator/no-token/no-URL is required posture only; no runtime enforcement exists.",
    "Generated/export artifact provider route remains unresolved; no delivery/external-use is authorized.",
    "Local log/test transcript provider route remains DOCS_ONLY; local logs are not CI evidence and not packet components.",
    "Source package/PDF/image/screenshot/metadata provider route remains prohibited; no inspection/acquisition is authorized.",
    "Wrong-tenant/wrong-case/wrong-provider/wrong-route tests remain future evidence only.",
    "Runtime gates remain downstream; no validator dispatch, registry/lookup, runtime gate, or runtime-gate movement exists.",
    "Local sanitized test pilot remains future separate scope only and not selected.",
    "Real private run remains blocked and not authorized.",
    "Implementation evidence is absent.",
    "Test/CI evidence is absent or future-only.",
    "Closure criteria are not met and remain future-only.",
    "Continued pause preserves no approvals, sign-offs, findings, severity, remediation, product, external-use, delivery, packet approval, blocker resolution, or dependency closure.",
  ]);
});

test("summary, non-authorizations, evidence limits, and no-overclaim rules exist", () => {
  assertIncludesAll([
    "D005 is the next focused blocker after D004.",
    "D005 should precede D006 runtime gates.",
    "D005 should precede local pilot execution.",
    "D005 should precede real private run.",
    "D005 should precede D007 release/product/external-use.",
    "Provider approval/denial events remain future-only and do not create logging implementation.",
    "D004 raw-material routing dependency remains unresolved/future-only.",
    "D003 retention/deletion provider lifecycle dependency remains unresolved/future-only.",
    "D002 audit/access-log provider event dependency remains future-only and does not create logging implementation.",
    "D001 RBAC/admin-support provider approval dependency remains upstream/future-only and cannot bypass human/professional review.",
    "D005 cannot be closed now.",
    "No implementation-readiness authorization is created now.",
    "No implementation is created now.",
    "This boundary creates or authorizes none of the following:",
    "provider route denial implementation",
    "raw-material routing implementation",
    "runtime gate movement",
    "finding",
    "severity",
    "remediation",
    "D005 third-party/provider routing boundary is not third-party routing authorization.",
    "D005 third-party/provider routing boundary is not provider routing implementation.",
    "D005 third-party/provider routing boundary is not provider integration.",
    "D005 third-party/provider routing boundary is not provider registry.",
    "D005 third-party/provider routing boundary is not provider status implementation.",
    "D005 third-party/provider routing boundary is not data-routing map.",
    "D005 third-party/provider routing boundary is not provider retention/deletion posture implementation.",
    "D005 third-party/provider routing boundary is not provider auditability implementation.",
    "D005 third-party/provider routing boundary is not token/URL/secret handling.",
    "D005 third-party/provider routing boundary is not provider prompt/response/payload handling.",
    "D005 third-party/provider routing boundary is not raw/private/source inspection.",
    "D005 third-party/provider routing boundary is not source-package inspection.",
    "D005 third-party/provider routing boundary is not PDF/image/screenshot/metadata inspection.",
    "D005 third-party/provider routing boundary is not metadata acquisition.",
    "D005 third-party/provider routing boundary is not implementation-readiness authorization.",
    "D005 third-party/provider routing boundary is not implementation.",
    "D005 third-party/provider routing boundary is not implementation evidence.",
    "Provider identity/status vocabulary does not mean provider registry exists.",
    "Provider routing posture does not mean provider routing is authorized.",
    "No-route/no-provider-denial posture does not mean denial implementation exists.",
    "Required implementation evidence does not mean evidence exists.",
    "Required tests do not mean tests exist.",
    "Required CI does not mean CI exists.",
    "Local logs are not CI evidence.",
    "Local logs are not packet components.",
    "DOCS_ONLY boundaries are not runtime enforcement.",
    "D005 review does not mean third-party routing is authorized.",
    "D005 review does not mean provider routing exists.",
    "Third-party model/API routing row does not authorize model/API routing.",
    "Provider identity/status row does not mean provider registry exists.",
    "Provider registry row does not mean provider registry is created.",
    "Data-routing map row does not mean data-routing map exists.",
    "Provider retention/deletion row does not mean lifecycle posture exists.",
    "Provider auditability row does not mean logging implementation exists.",
    "Token/URL/secret row does not mean token/URL/secret handling exists.",
    "Prompt/response/payload row does not mean provider payload path exists.",
    "Route approval row does not mean provider route approval exists.",
    "Route denial row does not mean route denial implementation exists.",
    "Route event dependency row does not mean audit/access-log implementation exists.",
    "D005 before D006 does not mean runtime gates may move now.",
    "Any future implementation-readiness authorization requires separate explicit authorization.",
    "Any future implementation requires separate explicit authorization.",
  ]);
});

test("External Reviewer posture and recommended next posture exist", () => {
  assertIncludesAll([
    "No external-review request is required by this boundary.",
    "Should we freeze a DOCS_ONLY D005 third-party/provider routing boundary after D004 raw-material routing",
    "external-review requirements remains advisory context only",
  ]);

  assertIncludesAll([
    "REVIEW_ONLY_D005_THIRD_PARTY_PROVIDER_ROUTING_AFTER_D004_RAW_MATERIAL_ROUTING_BOUNDARY",
    "DOCS_ONLY_NEW_THREAD_HANDOFF_REFRESH_AFTER_D005_THIRD_PARTY_PROVIDER_ROUTING_AFTER_D004_RAW_MATERIAL_ROUTING_BOUNDARY",
    "continued pause",
    "None are authorized by this boundary.",
  ], recommendations);
});

test("forbidden exact overclaiming tokens are absent", () => {
  assertDoesNotIncludeExactToken([
    "D005_THIRD_PARTY_PROVIDER_ROUTING_AUTHORIZES_IMPLEMENTATION_READINESS",
    "D005_THIRD_PARTY_PROVIDER_ROUTING_AUTHORIZES_IMPLEMENTATION",
    "D005_THIRD_PARTY_PROVIDER_ROUTING_AUTHORIZES_THIRD_PARTY_ROUTING",
    "D005_THIRD_PARTY_PROVIDER_ROUTING_CREATES_THIRD_PARTY_ROUTING_IMPLEMENTATION",
    "D005_THIRD_PARTY_PROVIDER_ROUTING_CREATES_PROVIDER_INTEGRATION",
    "D005_THIRD_PARTY_PROVIDER_ROUTING_CREATES_PROVIDER_REGISTRY",
    "D005_THIRD_PARTY_PROVIDER_ROUTING_CREATES_PROVIDER_STATUS_IMPLEMENTATION",
    "D005_THIRD_PARTY_PROVIDER_ROUTING_CREATES_DATA_ROUTING_MAP",
    "D005_THIRD_PARTY_PROVIDER_ROUTING_CREATES_PROVIDER_RETENTION_DELETION_POSTURE",
    "D005_THIRD_PARTY_PROVIDER_ROUTING_CREATES_PROVIDER_AUDITABILITY",
    "D005_THIRD_PARTY_PROVIDER_ROUTING_CREATES_TOKEN_URL_SECRET_HANDLING",
    "D005_THIRD_PARTY_PROVIDER_ROUTING_CREATES_PROVIDER_PROMPT_RESPONSE_PAYLOAD_HANDLING",
    "D005_CLOSED",
    "D005_BLOCKER_RESOLVED",
    "THIRD_PARTY_ROUTING_AUTHORIZED",
    "THIRD_PARTY_ROUTING_IMPLEMENTED",
    "THIRD_PARTY_MODEL_API_ROUTING_AUTHORIZED",
    "PROVIDER_ROUTING_IMPLEMENTED",
    "PROVIDER_INTEGRATION_CREATED",
    "PROVIDER_REGISTRY_CREATED",
    "PROVIDER_STATUS_IMPLEMENTATION_CREATED",
    "DATA_ROUTING_MAP_CREATED",
    "PROVIDER_RETENTION_DELETION_POSTURE_CREATED",
    "PROVIDER_AUDITABILITY_CREATED",
    "TOKEN_URL_SECRET_HANDLING_IMPLEMENTED",
    "PROVIDER_TOKEN_URL_SECRET_HANDLING_IMPLEMENTED",
    "PROVIDER_PROMPT_RESPONSE_PAYLOAD_HANDLING_CREATED",
    "PROVIDER_PAYLOAD_HANDLING_CREATED",
    "PROVIDER_ROUTE_APPROVAL_CREATED",
    "PROVIDER_ROUTE_DENIAL_IMPLEMENTED",
    "RAW_PRIVATE_SOURCE_INSPECTION_AUTHORIZED",
    "SOURCE_PACKAGE_INSPECTION_AUTHORIZED",
    "PDF_IMAGE_SCREENSHOT_METADATA_INSPECTION_AUTHORIZED",
    "METADATA_ACQUISITION_AUTHORIZED",
    "RAW_MATERIAL_ROUTING_IMPLEMENTED",
    "RAW_ROUTING_RUNTIME_BEHAVIOR_CREATED",
    "QUARANTINE_IMPLEMENTED",
    "DENY_ROUTE_IMPLEMENTED",
    "MATERIAL_CLASSIFIER_IMPLEMENTED",
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
