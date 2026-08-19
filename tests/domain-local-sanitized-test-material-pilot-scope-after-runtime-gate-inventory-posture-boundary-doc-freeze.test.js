const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const docsPath = path.join(
  __dirname,
  "..",
  "docs",
  "DOMAIN_CONTRACTS_LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_AFTER_RUNTIME_GATE_INVENTORY_POSTURE_BOUNDARY_v1.md",
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
  "## LSTP-SCOPE Matrix",
  "## Local Sanitized Test-Material Pilot-Scope Summary After Runtime-Gate Inventory Posture",
);
const recommended = sectionBetween("## Recommended Next Posture");

test("boundary doc exists", () => {
  assert.equal(fs.existsSync(docsPath), true);
});

test("identity/status tokens exist", () => {
  assertIncludesAll([
    "LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_AFTER_RUNTIME_GATE_INVENTORY_POSTURE_BOUNDARY",
    "LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_AFTER_RUNTIME_GATE_INVENTORY_POSTURE_ONLY",
    "DOCS_ONLY",
    "LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_AFTER_RUNTIME_GATE_INVENTORY_POSTURE_PARTIAL_GAP_CONTEXT",
    "LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_AFTER_RUNTIME_GATE_INVENTORY_POSTURE_NON_AUTHORIZING",
    "LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_AFTER_RUNTIME_GATE_INVENTORY_POSTURE_NOT_IMPLEMENTATION_READINESS_AUTHORIZATION",
    "LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_AFTER_RUNTIME_GATE_INVENTORY_POSTURE_NOT_IMPLEMENTATION",
    "LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_AFTER_RUNTIME_GATE_INVENTORY_POSTURE_NOT_RUNTIME_BEHAVIOR",
    "LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_AFTER_RUNTIME_GATE_INVENTORY_POSTURE_NOT_RUNTIME_API_SCHEMA_PACKAGE_BEHAVIOR_CHANGE",
    "LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_AFTER_RUNTIME_GATE_INVENTORY_POSTURE_NOT_PILOT_AUTHORIZATION",
    "LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_AFTER_RUNTIME_GATE_INVENTORY_POSTURE_NOT_PILOT_EXECUTION",
    "LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_AFTER_RUNTIME_GATE_INVENTORY_POSTURE_NOT_REAL_PRIVATE_RUN",
    "LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_AFTER_RUNTIME_GATE_INVENTORY_POSTURE_NOT_RAW_PRIVATE_SOURCE_INSPECTION",
    "LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_AFTER_RUNTIME_GATE_INVENTORY_POSTURE_NOT_SOURCE_PACKAGE_INSPECTION",
    "LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_AFTER_RUNTIME_GATE_INVENTORY_POSTURE_NOT_PDF_IMAGE_SCREENSHOT_METADATA_INSPECTION",
    "LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_AFTER_RUNTIME_GATE_INVENTORY_POSTURE_NOT_METADATA_ACQUISITION",
    "LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_AFTER_RUNTIME_GATE_INVENTORY_POSTURE_NOT_LOCAL_LOG_INSPECTION",
    "LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_AFTER_RUNTIME_GATE_INVENTORY_POSTURE_NOT_CI_EVIDENCE",
    "LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_AFTER_RUNTIME_GATE_INVENTORY_POSTURE_NOT_RELEASE_APPROVAL",
    "LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_AFTER_RUNTIME_GATE_INVENTORY_POSTURE_NOT_PRODUCT_CANDIDATE",
    "LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_AFTER_RUNTIME_GATE_INVENTORY_POSTURE_NOT_EXTERNAL_USE_AUTHORIZATION",
    "LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_AFTER_RUNTIME_GATE_INVENTORY_POSTURE_NOT_DELIVERY",
    "LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_AFTER_RUNTIME_GATE_INVENTORY_POSTURE_NOT_PACKET_APPROVAL",
    "LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_AFTER_RUNTIME_GATE_INVENTORY_POSTURE_NOT_BLOCKER_RESOLUTION",
    "LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_AFTER_RUNTIME_GATE_INVENTORY_POSTURE_NOT_DEPENDENCY_CLOSURE",
    "PILOT_SCOPE_REVIEW_ONLY",
    "PILOT_EXECUTION_REMAINS_UNAUTHORIZED",
    "REAL_PRIVATE_RUN_REMAINS_BLOCKED",
    "SYNTHETIC_MANUALLY_SANITIZED_ONLY",
    "NO_RAW_NO_PRIVATE_NO_SOURCE_LOCATOR_NO_TOKEN_NO_URL",
    "NO_LOCAL_LOG_INSPECTION",
    "NO_METADATA_ACQUISITION",
    "NO_LEGAL_CLINICAL_EVIDENTIARY_CASE_TRUTH_CONCLUSIONS",
    "NO_CREDIBILITY_RISK_SUFFICIENCY_POLICE_REPORT_PLEADING_OUTPUTS",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_AFTER_RUNTIME_GATE_INVENTORY_POSTURE_CONTINUED_PAUSE",
  ]);
});

test("purpose exists", () => {
  assertIncludesAll([
    "This boundary freezes the completed read-only local sanitized test-material pilot-scope review after runtime-gate inventory posture as DOCS_ONLY repo evidence only.",
    "PARTIAL_GAP_REQUIRES_DOCS_ONLY_LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_AFTER_RUNTIME_GATE_INVENTORY_POSTURE_BOUNDARY",
    "This is scope review only.",
    "This boundary does not authorize pilot execution, actual test-material selection, real private run, raw/private/source inspection, source-package inspection, PDF/image/screenshot/metadata inspection, metadata acquisition, local log inspection, CI evidence, release approval, product candidate, external-use, delivery, packet approval, legal/clinical/evidentiary/case-truth conclusions, blocker resolution, or dependency closure.",
  ]);
});

test("source hierarchy exists", () => {
  assertIncludesAll([
    "LIVE_REPO_EVIDENCE_WINS",
    "TRACKED_REPO_EVIDENCE_CONTROLS_CURRENT_STATE",
    "NEW_THREAD_HANDOFF_FILE_IS_CONTEXT_ONLY",
    "RUNTIME_GATE_INVENTORY_POSTURE_AFTER_D005_THIRD_PARTY_PROVIDER_ROUTING_BOUNDARY_CONTROLS_CURRENT_D006_CONTEXT",
    "D005_THIRD_PARTY_PROVIDER_ROUTING_AFTER_D004_RAW_MATERIAL_ROUTING_BOUNDARY_CONTROLS_CURRENT_D005_CONTEXT",
    "D004_RAW_MATERIAL_ROUTING_AFTER_D003_RETENTION_DELETION_BOUNDARY_CONTROLS_CURRENT_D004_CONTEXT",
    "D003_RETENTION_DELETION_AFTER_D002_AUDIT_ACCESS_LOG_BOUNDARY_CONTROLS_CURRENT_D003_CONTEXT",
    "D002_AUDIT_ACCESS_LOG_AFTER_D001_RBAC_ADMIN_SUPPORT_BOUNDARY_CONTROLS_CURRENT_D002_CONTEXT",
    "D001_RBAC_ADMIN_SUPPORT_AFTER_DATA_HANDLING_CONTROL_PLAN_BOUNDARY_CONTROLS_CURRENT_D001_CONTEXT",
    "DATA_HANDLING_IMPLEMENTATION_CONTROL_PLAN_AFTER_DHC_ALIGNMENT_BOUNDARY_CONTROLS_CURRENT_DATA_HANDLING_CONTEXT",
    "DHC_ALIGNMENT_AFTER_D001_D007_REPRIORITIZATION_BOUNDARY_CONTROLS_CURRENT_DHC_ALIGNMENT_CONTEXT",
    "D007_CI_RELEASE_PRODUCT_EXTERNAL_USE_CONTEXT_IS_DOWNSTREAM_CONTEXT_ONLY",
    "LOCAL_SANITIZED_PILOT_CONTEXT_IS_SCOPE_REVIEW_ONLY",
    "TECHNICAL_VERIFICATION_NO_RAW_TRACE_CONTEXT_IS_ADVISORY_CONTEXT_ONLY",
    "FAILURE_MODE_REGISTER_USED_AS_NO_OVERCLAIM_CONTEXT_ONLY",
    "EXTERNAL_REVIEW_REQUIREMENTS_USED_AS_ADVISORY_CONTEXT_ONLY",
    "OLD_HANDOFF_FILES_ARE_HISTORICAL_CONTEXT_ONLY",
    "STALE_HANDOFF_MUST_NOT_SELECT_REOPEN_OR_CLOSE_SLICE",
  ]);
});

test("current accepted state exists", () => {
  assertIncludesAll([
    "4bbbc6f",
    "78ceb94 docs(domain): freeze runtime gate inventory posture after D005 third-party routing boundary",
    "78c27b5 docs(domain): freeze D005 third-party/provider routing after D004 raw-material routing boundary",
    "4f26035 docs(domain): freeze D004 raw material routing after D003 retention deletion boundary",
    "4fd0b26 docs(domain): freeze D003 retention deletion after D002 audit boundary",
    "af1fd3b docs(domain): freeze D002 audit access log after D001 boundary",
    "21f8c0d docs(domain): freeze D001 RBAC admin support after data handling control plan boundary",
    "070133e docs(domain): freeze data handling control plan after DHC alignment boundary",
    "58c4e4f docs(domain): freeze DHC alignment after D001-D007 reprioritization boundary",
    "39c28ea docs(domain): freeze D001-D007 post-trust-spine reprioritization boundary",
    "RUNTIME_GATE_INVENTORY_POSTURE_AND_HANDOFF_REVIEWED_AND_PAUSED_NO_CHANGE",
    "REVIEW_ONLY_LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_AFTER_RUNTIME_GATE_INVENTORY_POSTURE_COMPLETED_NO_CHANGE",
    "POST_RUNTIME_GATE_INVENTORY_POSTURE_LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_RECOMMENDATION_SELECTED_NO_CHANGE",
    "COMBINED_READ_ONLY_LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_AFTER_RUNTIME_GATE_INVENTORY_POSTURE_COMPLETED_NO_CHANGE",
    "The current safe posture remains continued pause until a separate next posture is selected.",
  ]);
});

test("prior read-only review result exists", () => {
  assertIncludesAll([
    "REVIEW_ONLY local sanitized test-material pilot scope after runtime-gate inventory posture was performed.",
    "A future DOCS_ONLY local sanitized test-material pilot-scope boundary is suitable.",
    "This boundary freezes that partial/gap result only.",
    "This boundary does not convert scope review into pilot authorization, pilot execution, actual test-material selection, real private run, implementation-readiness authorization, implementation, runtime behavior, CI evidence, release approval, product candidate, external-use authorization, delivery, packet approval, blocker closure, or dependency closure.",
  ]);
});

test("LSTP-SCOPE matrix exists and all rows exist", () => {
  assertIncludesAll([
    "row ID",
    "pilot-scope surface",
    "current tracked evidence level",
    "relation to runtime-gate inventory posture and D001-D007 order",
    "current blocker status",
    "upstream dependencies",
    "downstream dependencies",
    "intended future enforcement layer, if any",
    "implementation/execution gap",
    "required future authorization evidence",
    "required future test/CI evidence",
    "what remains non-authorized",
    "Every row preserves DOCS_ONLY review only",
  ], matrix);

  for (let index = 1; index <= 30; index += 1) {
    assertIncludesAll([`LSTP-SCOPE-${String(index).padStart(3, "0")}`], matrix);
  }
});

test("required row content exists", () => {
  assertIncludesAll([
    "Pilot planning posture remains DOCS_ONLY partial/gap after runtime-gate inventory posture.",
    "Synthetic/manually sanitized material is required.",
    "Raw/private/source material is prohibited.",
    "Source locators, private paths, and filenames are prohibited.",
    "Tokens, URLs, and secrets are prohibited.",
    "PDF/image/screenshot/metadata inspection is prohibited.",
    "Metadata acquisition is prohibited.",
    "Local log inspection is prohibited.",
    "Local logs are not CI evidence and not packet components.",
    "Real private run remains blocked.",
    "Pilot execution remains unauthorized.",
    "Legal, clinical, evidentiary, and case-truth conclusions are prohibited.",
    "Credibility, risk, sufficiency, police-report, and pleading outputs are prohibited.",
    "Human/professional review remains the release gate.",
    "Product candidate remains none and external-use remains unauthorized.",
    "Delivery, packet, PDF packet, archive, and ZIP generation remain unauthorized.",
    "Runtime/API/schema/package behavior remains unchanged.",
    "Runtime gate movement and validator dispatch remain absent.",
    "CI evidence and release approval remain absent.",
    "D001-D006 prerequisite blockers remain visible and unresolved/not closed.",
    "D007 remains downstream and unauthorized.",
    "Allowed synthetic input classes are future-only and must remain non-real/non-private/no-raw.",
    "Prohibited input classes include raw source, private facts, source locators, filenames/private paths, page references, URLs/tokens/secrets, PDF/image/screenshot/metadata content, local logs, real private material, source packages, and untracked private files.",
    "Allowed output classes are limited to scope/status markers, allowed/prohibited class lists, fail-closed statuses, review-route notes, and future proof-test needs.",
    "Prohibited output classes include legal/clinical/evidentiary/case-truth conclusions, credibility/risk/sufficiency scores, police reports, pleadings, product claims, delivery outputs, external-use claims, findings, severity, and remediation.",
    "Expected fail-closed statuses include NOT_AUTHORIZED, BLOCKED, FUTURE_ONLY, DOCS_ONLY, NO_RAW, NO_PRIVATE, NO_SOURCE_LOCATOR, NO_TOKEN, NO_URL, NO_METADATA_ACQUISITION, NO_LOCAL_LOG_INSPECTION, NO_PILOT_EXECUTION, REAL_PRIVATE_RUN_BLOCKED, HUMAN_PROFESSIONAL_REVIEW_REQUIRED.",
    "Failure modes to preserve include raw-content leak, scope leak, legal conclusion leak, clinical conclusion leak, metadata-as-proof, source-completeness overclaim, DOCS_ONLY-as-runtime overclaim, generated-PDF-as-evidence, external-use overclaim, and product-candidate overclaim.",
    "Future proof-test needs are future-only and do not mean test evidence exists.",
    "Closure criteria are not met and remain future-only.",
    "Continued pause preserves no approvals, sign-offs, findings, severity, remediation, product, external-use, delivery, packet approval, blocker resolution, or dependency closure.",
  ]);
});

test("local sanitized pilot scope summary exists", () => {
  assertIncludesAll([
    "local sanitized test-material pilot scope is the next suitable review-only surface after runtime-gate inventory posture",
    "scope can remain strictly synthetic/manually sanitized/no-raw/no-private/no-source-locator/no-token/no-URL",
    "scope can be defined without local logs",
    "scope can be defined without raw/private/source inspection",
    "scope can be defined without source-package/PDF/image/screenshot/metadata inspection",
    "scope can be defined without metadata acquisition",
    "scope can be defined without real private run",
    "no legal/clinical/evidentiary/case-truth conclusions are allowed",
    "no product candidate and no external-use are authorized",
    "scope should precede any pilot execution",
    "D007 CI/release/product/external-use remains downstream and unauthorized",
    "local sanitized pilot scope cannot be closed now",
    "no implementation-readiness authorization is created now",
    "no implementation is created now",
    "no pilot execution is authorized now",
    "real private run is not authorized now",
  ]);
});

test("required non-authorizations exist", () => {
  assertIncludesAll([
    "implementation-readiness",
    "implementation",
    "runtime behavior",
    "runtime/API/schema/package behavior change",
    "runtime gate implementation",
    "runtime gate movement",
    "runtime gate inventory as implementation",
    "validator dispatch",
    "registry/lookup",
    "schema enforcement creation",
    "workflow enforcement creation",
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
    "local sanitized test pilot authorization",
    "local sanitized test pilot execution",
    "actual test-material selection",
    "real private run",
    "raw/private/source inspection",
    "source package inspection",
    "PDF/image/screenshot/metadata inspection",
    "metadata acquisition",
    "local log inspection",
    "local logs as CI evidence",
    "local logs as packet components",
    "legal conclusion",
    "clinical conclusion",
    "evidentiary conclusion",
    "case-truth conclusion",
    "credibility finding",
    "risk score",
    "sufficiency score",
    "police report",
    "pleading",
    "third-party/provider routing implementation or authorization",
    "provider integration",
    "provider registry",
    "data-routing map",
    "token/URL/secret handling",
    "raw-material routing implementation",
    "retention implementation",
    "deletion implementation",
    "audit/access-log implementation",
    "RBAC/access-control implementation",
    "DHC implementation",
    "DHC closure",
    "blocker resolution",
    "dependency closure",
    "finding",
    "severity",
    "remediation",
  ]);
});

test("evidence limits exist", () => {
  assertIncludesAll([
    "local sanitized test-material pilot-scope boundary is not pilot authorization",
    "local sanitized test-material pilot-scope boundary is not pilot execution",
    "local sanitized test-material pilot-scope boundary is not actual test-material selection",
    "local sanitized test-material pilot-scope boundary is not real private run",
    "local sanitized test-material pilot-scope boundary is not raw/private/source inspection",
    "local sanitized test-material pilot-scope boundary is not source-package/PDF/image/screenshot/metadata inspection",
    "local sanitized test-material pilot-scope boundary is not metadata acquisition",
    "local sanitized test-material pilot-scope boundary is not local log inspection",
    "local sanitized test-material pilot-scope boundary is not CI evidence",
    "local sanitized test-material pilot-scope boundary is not release approval",
    "local sanitized test-material pilot-scope boundary is not product candidate",
    "local sanitized test-material pilot-scope boundary is not external-use authorization",
    "allowed synthetic input vocabulary does not mean actual input exists",
    "prohibited input classes do not mean those materials were inspected",
    "allowed output classes do not mean output was generated",
    "future proof tests do not mean tests exist",
    "required implementation evidence does not mean evidence exists",
    "required CI does not mean CI exists",
    "tests remain tested-scenario evidence, not runtime certainty",
    "local logs are not CI evidence",
    "local logs are not packet components",
    "green tests are not release approval",
    "DOCS_ONLY boundaries are not runtime enforcement",
    "runtime gate inventory is not implementation",
    "product candidate requires separate explicit selection",
    "external-use requires separate explicit authorization",
    "human/professional review remains release gate",
    "continued pause is valid",
  ]);
});

test("no-overclaim rules exist", () => {
  assertIncludesAll([
    "pilot-scope review does not mean pilot execution",
    "pilot-scope review does not mean actual test material was selected",
    "synthetic/manually sanitized row does not mean real material exists",
    "no-raw row does not mean raw material was inspected",
    "no source-locator row does not mean source locators were inspected",
    "no token/URL/secret row does not mean credentials or endpoints were inspected",
    "no PDF/image/screenshot/metadata row does not mean those materials were inspected",
    "no metadata row does not mean metadata was acquired",
    "no local-log row does not mean local logs were inspected",
    "local logs not CI row does not mean CI evidence exists",
    "no real private run row does not mean real private run is authorized",
    "no pilot execution row does not mean pilot execution is authorized",
    "no conclusion row does not authorize legal/clinical/evidentiary/case-truth conclusions",
    "no product/external-use row does not authorize product candidate or external-use",
    "no delivery/packet row does not authorize delivery, PDF packet, archive, or ZIP",
    "no runtime/API/schema/package row does not authorize runtime behavior",
    "no runtime gate movement row does not authorize runtime gate movement",
    "D001-D006 blocker visibility row does not close blockers",
    "D007 downstream row does not authorize D007",
    "allowed input classes row does not authorize real/private/source input",
    "allowed output classes row does not authorize conclusions",
    "prohibited output classes row does not create findings/severity/remediation",
    "fail-closed status row does not create implementation",
    "failure modes row does not mean failure modes were exercised now",
    "future proof-test needs row does not mean proof tests exist",
    "closure criteria do not mean closure",
    "any future pilot execution requires separate explicit authorization",
    "any future implementation-readiness authorization requires separate explicit authorization",
    "any future implementation requires separate explicit authorization",
  ]);
});

test("External Reviewer posture exists", () => {
  assertIncludesAll([
    "No external-review request is required by this boundary.",
    "Should we freeze a DOCS_ONLY local sanitized test-material pilot-scope boundary after runtime-gate inventory posture, preserving no raw/private/source/log/metadata inspection, no execution, no real private run, no conclusions, and no product/external-use?",
    "external-review requirements remains advisory context only, not approval, sign-off, implementation-readiness authorization, implementation authorization, release approval, product candidate, external-use authorization, local sanitized pilot authorization, real private run authorization, runtime-gate movement authorization, local sanitized pilot closure, CI evidence, delivery, packet approval, or D007 authorization.",
  ]);
});

test("recommended next posture is constrained", () => {
  assertIncludesAll([
    "REVIEW_ONLY_LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_AFTER_RUNTIME_GATE_INVENTORY_POSTURE_BOUNDARY",
    "DOCS_ONLY_NEW_THREAD_HANDOFF_REFRESH_AFTER_LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_AFTER_RUNTIME_GATE_INVENTORY_POSTURE_BOUNDARY",
    "continued pause",
    "None are authorized by this boundary.",
  ], recommended);
});

test("rejects exact overclaiming tokens", () => {
  assertDoesNotIncludeExactToken([
    "LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_AUTHORIZES_IMPLEMENTATION_READINESS",
    "LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_AUTHORIZES_IMPLEMENTATION",
    "LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_AUTHORIZES_PILOT",
    "LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_AUTHORIZES_PILOT_EXECUTION",
    "LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_SELECTS_TEST_MATERIAL",
    "LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_EXECUTES_PILOT",
    "LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_AUTHORIZES_REAL_PRIVATE_RUN",
    "LOCAL_SANITIZED_TEST_MATERIAL_PILOT_SCOPE_STARTS_REAL_PRIVATE_RUN",
    "PILOT_AUTHORIZED",
    "PILOT_EXECUTED",
    "ACTUAL_TEST_MATERIAL_SELECTED",
    "REAL_PRIVATE_RUN_AUTHORIZED",
    "REAL_PRIVATE_RUN_STARTED",
    "RAW_PRIVATE_SOURCE_INSPECTION_AUTHORIZED",
    "SOURCE_PACKAGE_INSPECTION_AUTHORIZED",
    "PDF_IMAGE_SCREENSHOT_METADATA_INSPECTION_AUTHORIZED",
    "METADATA_ACQUISITION_AUTHORIZED",
    "LOCAL_LOG_INSPECTION_AUTHORIZED",
    "LOCAL_LOGS_ARE_CI_EVIDENCE",
    "LOCAL_LOGS_ARE_PACKET_COMPONENTS",
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
    "LEGAL_CONCLUSION_CREATED",
    "CLINICAL_CONCLUSION_CREATED",
    "EVIDENTIARY_CONCLUSION_CREATED",
    "CASE_TRUTH_CONCLUSION_CREATED",
    "CREDIBILITY_FINDING_CREATED",
    "RISK_SCORE_CREATED",
    "SUFFICIENCY_SCORE_CREATED",
    "POLICE_REPORT_CREATED",
    "PLEADING_CREATED",
    "RUNTIME_GATE_IMPLEMENTED",
    "RUNTIME_GATE_MOVEMENT_AUTHORIZED",
    "VALIDATOR_DISPATCH_CREATED",
    "REGISTRY_LOOKUP_CREATED",
    "SCHEMA_ENFORCEMENT_CREATED",
    "WORKFLOW_ENFORCEMENT_CREATED",
    "THIRD_PARTY_ROUTING_AUTHORIZED",
    "THIRD_PARTY_ROUTING_IMPLEMENTED",
    "RAW_MATERIAL_ROUTING_IMPLEMENTED",
    "RETENTION_IMPLEMENTED",
    "DELETION_IMPLEMENTED",
    "AUDIT_ACCESS_LOG_IMPLEMENTED",
    "RBAC_IMPLEMENTED",
    "ACCESS_CONTROL_IMPLEMENTED",
    "DHC_IMPLEMENTED",
    "DHC_CLOSED",
    "BLOCKER_RESOLVED",
    "DEPENDENCY_CLOSED",
    "SECURITY_FINDING_CREATED",
    "VULNERABILITY_FINDING_CREATED",
    "SEVERITY_ASSIGNED",
    "REMEDIATION_RECOMMENDED",
    "REMEDIATION_IMPLEMENTED",
  ]);
});
