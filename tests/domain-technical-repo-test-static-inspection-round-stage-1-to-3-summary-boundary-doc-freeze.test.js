import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const DOC_PATH =
  "docs/DOMAIN_CONTRACTS_TECHNICAL_REPO_TEST_STATIC_INSPECTION_ROUND_STAGE_1_TO_3_SUMMARY_BOUNDARY_v1.md";
const doc = readFileSync(DOC_PATH, "utf8");

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function assertIncludesAll(entries) {
  for (const entry of entries) {
    assert.match(doc, new RegExp(escapeRegExp(entry)), `missing ${entry}`);
  }
}

test("technical repo/test static inspection round summary boundary doc exists", () => {
  assert.equal(existsSync(DOC_PATH), true);
});

test("identity and status tokens exist", () => {
  assertIncludesAll([
    "TECHNICAL_REPO_TEST_STATIC_INSPECTION_ROUND_STAGE_1_TO_3_SUMMARY_BOUNDARY",
    "DOCS_ONLY",
    "STATIC_INSPECTION_SUMMARY_ONLY",
    "STAGE_1_TO_3_SUMMARY_ONLY",
    "NOT_STAGE_4",
    "NOT_IMPLEMENTATION",
    "NOT_RUNTIME_CERTIFICATION",
    "NOT_RELEASE_APPROVAL",
    "NOT_TECHNICAL_SIGN_OFF",
    "NOT_PRODUCT_READINESS",
    "NOT_EXTERNAL_USE_AUTHORIZATION",
    "NOT_BLOCKER_RESOLUTION",
  ]);
});

test("source hierarchy exists", () => {
  assertIncludesAll([
    "LIVE_REPO_EVIDENCE_WINS",
    "TRACKED_REPO_EVIDENCE_CONTROLS_CURRENT_STATE",
    "STATIC_INSPECTION_RESULTS_ARE_REVIEW_CONTEXT_ONLY",
    "STAGE_1_TO_3_RESULTS_ARE_NOT_RUNTIME_CERTIFICATION",
    "OLD_HANDOFF_FILES_ARE_HISTORICAL_CONTEXT_ONLY",
    "STALE_HANDOFF_MUST_NOT_SELECT_REOPEN_OR_CLOSE_SLICE",
  ]);
});

test("Stage 1 summary tokens exist", () => {
  assertIncludesAll([
    "TECHNICAL_REPO_TEST_STATIC_INSPECTION_STAGE_1_RUNTIME_SCHEMA_CLAIMS_REVIEWED_AND_PAUSED_NO_CHANGE",
    "STATIC_INSPECTION_STAGE_1_RUNTIME_SCHEMA_CLAIMS_PARTIAL_SUPPORTED_AS_DOCUMENTED",
    "runtime/API documented-and-tested surfaces were partially supported as documented",
    "authenticated route/case-context gates were partially supported as documented",
    "exported tracked schema validators were supported for inspected exports",
    "no global runtime assurance",
    "no full RBAC/access-control",
    "no runtime certification",
    "no release approval",
    "no product readiness",
    "no external-use authorization",
  ]);
});

test("Stage 2 summary tokens exist", () => {
  assertIncludesAll([
    "TECHNICAL_REPO_TEST_STATIC_INSPECTION_STAGE_2_WORKFLOW_HUMAN_DOCS_ONLY_CLAIMS_REVIEWED_AND_PAUSED_NO_CHANGE",
    "STATIC_INSPECTION_STAGE_2_WORKFLOW_HUMAN_DOCS_ONLY_CLAIMS_SUPPORTED_AS_DOCUMENTED",
    "prompt/workflow controls supported as documented workflow/process controls",
    "human/professional review supported as documented release-gate language",
    "DOCS_ONLY boundary corpus supported as documented",
    "no automatic approval",
    "no runtime enforcement from workflow controls",
    "no runtime enforcement from DOCS_ONLY boundaries",
    "no product readiness",
    "no external-use authorization",
  ]);
});

test("Stage 3 summary tokens exist", () => {
  assertIncludesAll([
    "TECHNICAL_REPO_TEST_STATIC_INSPECTION_STAGE_3_LOCAL_LOGS_UNKNOWN_BLOCKERS_REVIEWED_AND_PAUSED_NO_CHANGE",
    "STATIC_INSPECTION_STAGE_3_LOCAL_LOGS_UNKNOWN_BLOCKERS_SUPPORTED_AS_DOCUMENTED",
    "local logs remain tracked summary/local transcript evidence only",
    "local logs are not CI logs",
    "local logs are not CI evidence",
    "local logs are not packet components",
    "actual local log files were not inspected",
    "red-team corpus remains unknown/not-evidenced where tracked docs say so",
    "exact blocker activation traces remain synthetic-only or unknown/not-evidenced where tracked docs say so",
    "unknown/not-evidenced blockers remain open blockers, not resolved items",
    "data-handling blockers remain unresolved",
  ]);
});

test("Stage 1-3 round status exists", () => {
  assertIncludesAll([
    "TECHNICAL_REPO_TEST_STATIC_INSPECTION_ROUND_STAGE_1_TO_3_REVIEWED_AND_PAUSED_NO_CHANGE",
    "Stage 1-3 are reviewed and paused.",
    "Stage 1-3 create no implementation.",
    "Stage 1-3 create no runtime/API/schema/package behavior change.",
    "Stage 1-3 create no runtime certification.",
    "Stage 1-3 create no release approval.",
    "Stage 1-3 create no technical sign-off.",
    "Stage 1-3 create no External Reviewer approval.",
    "Stage 1-3 create no product readiness.",
    "Stage 1-3 create no external-use authorization.",
    "Stage 1-3 create no blocker resolution.",
    "The current safe posture remains continued pause.",
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
    "Human/professional review remains release gate.",
    "Continued pause is valid.",
  ]);
});

test("remaining blockers exist", () => {
  assertIncludesAll([
    "RBAC/access-control implementation remains absent.",
    "Admin/support implementation remains absent.",
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
    "Complete global access-control threat model remains unresolved.",
    "Runtime gate inventory remains deferred.",
  ]);
});

test("negative authorization checks exist", () => {
  assertIncludesAll([
    "This boundary creates no implementation.",
    "This boundary creates no runtime behavior.",
    "This boundary creates no runtime/API/schema/package behavior change.",
    "This boundary creates no validator dispatch.",
    "This boundary creates no registry/lookup.",
    "This boundary creates no RBAC/access-control implementation.",
    "This boundary creates no admin/support implementation.",
    "This boundary creates no audit/access-log implementation.",
    "This boundary creates no event taxonomy runtime code.",
    "This boundary creates no log schema/storage.",
    "This boundary creates no retention/deletion implementation.",
    "This boundary creates no raw-material routing implementation.",
    "This boundary creates no third-party routing implementation or authorization.",
    "This boundary creates no provider integration.",
    "This boundary creates no provider registry/status implementation.",
    "This boundary creates no data-routing map.",
    "This boundary creates no token/URL/secret handling.",
    "This boundary creates no provider auditability implementation.",
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

test("recommended next posture is review-only or continued pause only", () => {
  assertIncludesAll([
    "REVIEW_ONLY_TECHNICAL_REPO_TEST_STATIC_INSPECTION_ROUND_STAGE_1_TO_3_SUMMARY_BOUNDARY",
    "continued pause",
    "None are authorized by this boundary.",
  ]);
});

test("exact overclaiming tokens are rejected", () => {
  [
    "STAGE_1_TO_3_RUNTIME_CERTIFIED",
    "STAGE_1_TO_3_RELEASE_APPROVED",
    "STAGE_1_TO_3_TECHNICAL_SIGN_OFF_CREATED",
    "STAGE_1_TO_3_PRODUCT_READY",
    "STAGE_1_TO_3_EXTERNAL_USE_AUTHORIZED",
    "STATIC_INSPECTION_AUTHORIZES_IMPLEMENTATION",
    "STATIC_INSPECTION_AUTHORIZES_RUNTIME",
    "RUNTIME_CERTIFICATION_CREATED",
    "RELEASE_APPROVAL_CREATED",
    "TECHNICAL_SIGN_OFF_CREATED",
    "EXTERNAL_REVIEWER_APPROVAL_CREATED",
    "PRODUCT_READINESS_CREATED",
    "PRODUCT_CANDIDATE_SELECTED",
    "EXTERNAL_USE_AUTHORIZED",
    "IMPLEMENTATION_AUTHORIZED",
    "BLOCKER_RESOLVED",
    "SECURITY_FINDING_CREATED",
    "VULNERABILITY_FINDING_CREATED",
    "SEVERITY_ASSIGNED",
    "REMEDIATION_RECOMMENDED",
    "REMEDIATION_IMPLEMENTED",
    "RBAC_IMPLEMENTED",
    "ADMIN_SUPPORT_IMPLEMENTED",
    "AUDIT_ACCESS_LOG_IMPLEMENTED",
    "RETENTION_DELETION_IMPLEMENTED",
    "RAW_MATERIAL_ROUTING_IMPLEMENTED",
    "THIRD_PARTY_ROUTING_AUTHORIZED",
    "GLOBAL_ACCESS_CONTROL_IMPLEMENTED",
    "VALIDATOR_DISPATCH_CREATED",
    "REGISTRY_LOOKUP_CREATED",
    "CI_EVIDENCE_CREATED",
    "LOCAL_LOGS_PROMOTED_TO_CI_EVIDENCE",
  ].forEach((forbiddenToken) => assert.doesNotMatch(doc, new RegExp(forbiddenToken)));
});
