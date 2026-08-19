const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const docsPath = path.join(
  __dirname,
  "..",
  "docs",
  "DOMAIN_CONTRACTS_MINIMUM_VIABLE_TRUST_SPINE_STRATEGY_BOUNDARY_v1.md",
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

test("minimum viable trust spine strategy boundary doc exists", () => {
  assert.equal(fs.existsSync(docsPath), true);
});

test("identity and status tokens exist", () => {
  assertIncludesAll([
    "MINIMUM_VIABLE_TRUST_SPINE_STRATEGY_BOUNDARY",
    "DOCS_ONLY",
    "MINIMUM_VIABLE_TRUST_SPINE_STRATEGY_ONLY",
    "MINIMUM_VIABLE_TRUST_SPINE_STRATEGY_RECOMMENDS_A_AND_B",
    "TRUST_SPINE_A_DENY_BY_DEFAULT_POLICY_RESOURCE_MATERIAL_CLASS_KERNEL",
    "TRUST_SPINE_B_NO_CONTENT_DECISION_EVENT_TAXONOMY",
    "TRUST_SPINE_A_AND_B_NOT_IMPLEMENTATION",
    "TRUST_SPINE_A_AND_B_NOT_IMPLEMENTATION_READINESS_AUTHORIZATION",
    "TRUST_SPINE_A_AND_B_NOT_RUNTIME_BEHAVIOR",
    "TRUST_SPINE_A_AND_B_NOT_RUNTIME_API_SCHEMA_PACKAGE_BEHAVIOR_CHANGE",
    "TRUST_SPINE_A_AND_B_NOT_RUNTIME_GATE_IMPLEMENTATION",
    "TRUST_SPINE_A_AND_B_NOT_RUNTIME_GATE_INVENTORY_AS_IMPLEMENTATION",
    "TRUST_SPINE_A_AND_B_NOT_VALIDATOR_DISPATCH",
    "TRUST_SPINE_A_AND_B_NOT_REGISTRY_LOOKUP",
    "TRUST_SPINE_A_AND_B_NOT_SCHEMA_VALIDATOR_ENFORCEMENT",
    "TRUST_SPINE_A_AND_B_NOT_WORKFLOW_ENFORCEMENT",
    "TRUST_SPINE_A_AND_B_NOT_CI_EVIDENCE_CREATION",
    "TRUST_SPINE_A_AND_B_NOT_RELEASE_APPROVAL",
    "TRUST_SPINE_A_AND_B_NOT_RUNTIME_CERTIFICATION",
    "TRUST_SPINE_A_AND_B_NOT_TECHNICAL_SIGN_OFF",
    "TRUST_SPINE_A_AND_B_NOT_EXTERNAL_REVIEWER_APPROVAL",
    "TRUST_SPINE_A_AND_B_NOT_PRODUCT_CANDIDATE",
    "TRUST_SPINE_A_AND_B_NOT_EXTERNAL_USE_AUTHORIZATION",
    "TRUST_SPINE_A_AND_B_NOT_DELIVERY_TO_EXTERNAL_REVIEWER",
    "TRUST_SPINE_A_AND_B_NOT_PACKET_APPROVAL",
    "TRUST_SPINE_A_AND_B_NOT_BLOCKER_RESOLUTION",
    "TRUST_SPINE_A_AND_B_NOT_DEPENDENCY_CLOSURE",
    "TRUST_SPINE_A_AND_B_CONTINUED_PAUSE",
  ]);
});

test("purpose freezes A and B as strategy only", () => {
  assertIncludesAll([
    "This boundary freezes the completed read-only minimum viable trust spine strategy recommendation as repo evidence only.",
    "default-deny policy/resource/material-class vocabulary",
    "no-content decision-event taxonomy",
    "This boundary does not implement A.",
    "This boundary does not implement B.",
    "This boundary does not authorize implementation-readiness.",
    "This boundary does not authorize implementation.",
    "This boundary creates no runtime/API/schema/package behavior change.",
    "Any implementation requires a separate explicit user-authorized implementation scope after live git guard.",
  ]);
});

test("source hierarchy exists", () => {
  assertIncludesAll([
    "LIVE_REPO_EVIDENCE_WINS",
    "TRACKED_REPO_EVIDENCE_CONTROLS_CURRENT_STATE",
    "NEW_THREAD_HANDOFF_FILE_IS_CONTEXT_ONLY",
    "IMPLEMENTATION_READINESS_ENTRY_CRITERIA_BOUNDARY_CONTROLS_ENTRY_RULES",
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
    "358bec1 docs(context): refresh new-thread handoff after final blocked-chain status",
    "d065420 docs(domain): freeze final blocked-chain status boundary after post-runtime-gate summary",
    "FINAL_BLOCKED_CHAIN_CONTINUED_PAUSE_CONFIRMED_FOR_NEW_STRATEGIC_SCOPE_NO_CHANGE",
    "REVIEW_ONLY_MINIMUM_VIABLE_TRUST_SPINE_STRATEGY_COMPLETED_NO_CHANGE",
    "MINIMUM_VIABLE_TRUST_SPINE_STRATEGY_RECOMMENDATION_SELECTED_NO_CHANGE",
    "COMBINED_READ_ONLY_MINIMUM_VIABLE_TRUST_SPINE_STRATEGY_AFTER_FINAL_BLOCKED_CHAIN_CONTINUED_PAUSE_COMPLETED_NO_CHANGE",
    "The current safe posture remains continued pause until a separate next posture is selected.",
  ]);
});

test("prior read-only strategy result exists", () => {
  assertIncludesAll([
    "The read-only minimum viable trust spine strategy review was performed.",
    "STRATEGY_RECOMMENDS_TRUST_SPINE_A_AND_B_POLICY_KERNEL_WITH_NO_CONTENT_DECISION_EVENTS",
    "A+B was selected because it provides the smallest shared trust spine.",
    "C RBAC/admin skeleton was not selected first because A+B should define the policy vocabulary.",
    "D retention/deletion lifecycle was not selected first because A+B should define material class and lifecycle decision vocabulary.",
    "E raw-material routing deny/quarantine was not selected first because A+B should define material class and decision vocabulary.",
    "F third-party provider deny registry was not selected first because A+B plus provider authorization/status rules must precede it.",
    "Continued pause was not selected because tracked evidence supports a docs-only strategy boundary.",
    "No external-review request is required by this boundary.",
  ]);
});

test("strategy candidate matrix and all rows exist", () => {
  assertIncludesAll([
    "## Strategy Candidate Matrix",
    "blocker coverage",
    "upstream dependencies",
    "implementation risk",
    "overclaim risk",
    "later surfaces",
    "minimum later tests",
    "should precede runtime gates",
    "can be no-raw scoped",
    "what remains non-authorized",
    "TRUST-SPINE-STRATEGY-001",
    "TRUST-SPINE-STRATEGY-002",
    "TRUST-SPINE-STRATEGY-003",
    "TRUST-SPINE-STRATEGY-004",
    "TRUST-SPINE-STRATEGY-005",
    "TRUST-SPINE-STRATEGY-006",
    "TRUST-SPINE-STRATEGY-007",
    "Every row preserves strategy only, no implementation-readiness authorization, no implementation, no runtime/API/schema/package behavior change, no CI evidence, no release approval, no product candidate, no external-use, no blocker resolution, no dependency closure, and continued pause.",
  ]);
});

test("recommended A and B trust spine scope exists", () => {
  assertIncludesAll([
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
    "These are strategy fields only, not schema, runtime, event taxonomy runtime code, log schema, or log storage.",
  ]);
});

test("blocker coverage summary exists", () => {
  assertIncludesAll([
    "supports D001 RBAC/admin-support vocabulary",
    "supports D002 audit/access-log event semantics",
    "supports D003 retention/deletion lifecycle decisions",
    "supports D004 raw-material routing deny/quarantine decisions",
    "supports D005 third-party/provider deny-by-default routing posture",
    "supports D006 validator/registry/runtime-gate prerequisites later",
    "supports D007 CI/release/product/external-use gate evidence later",
    "supports DHC future evidence and closure criteria",
    "should precede runtime gates",
    "runtime gates should not be implemented first",
  ]);
});

test("required non-authorizations exist", () => {
  assertIncludesAll([
    "implementation-readiness",
    "implementation",
    "runtime behavior",
    "runtime/API/schema/package behavior change",
    "runtime gate implementation",
    "runtime gate inventory as implementation",
    "validator dispatch",
    "registry/lookup",
    "schema/validator enforcement",
    "workflow enforcement",
    "event taxonomy runtime code",
    "log schema",
    "log storage",
    "RBAC implementation",
    "admin/support implementation",
    "retention implementation",
    "deletion implementation",
    "encryption implementation",
    "audit/access-log implementation",
    "raw-material routing implementation",
    "third-party routing implementation or authorization",
    "provider integration",
    "provider registry",
    "provider status implementation",
    "data-routing map implementation",
    "token/URL/secret handling implementation",
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
    "strategy recommendation is not implementation evidence",
    "strategy boundary is not implementation-readiness authorization",
    "tests remain tested-scenario evidence, not runtime certainty",
    "local logs are not CI evidence",
    "local logs are not packet components",
    "green tests are not release approval",
    "DOCS_ONLY boundaries are not runtime enforcement",
    "route/case/capability evidence is not full RBAC/access-control",
    "route/case/capability evidence is not admin/support access-control",
    "route/case/capability evidence is not global authorization model",
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
    "A+B recommendation does not mean policy kernel exists",
    "A+B recommendation does not mean event taxonomy exists",
    "A+B recommendation does not mean event emitter exists",
    "A+B recommendation does not mean log schema exists",
    "A+B recommendation does not mean log storage exists",
    "A+B recommendation does not mean RBAC exists",
    "A+B recommendation does not mean audit/access-log exists",
    "A+B recommendation does not mean retention/deletion exists",
    "A+B recommendation does not mean raw routing exists",
    "A+B recommendation does not mean provider registry exists",
    "A+B recommendation does not mean runtime gates exist",
    "A+B recommendation does not mean CI evidence exists",
    "A+B recommendation does not mean implementation-readiness",
    "A+B recommendation does not mean blocker closure",
    "A+B recommendation does not mean dependency closure",
    "any future implementation requires separate explicit authorization",
  ]);
});

test("recommended next posture is review-only or continued pause only", () => {
  assertIncludesAll([
    "REVIEW_ONLY_MINIMUM_VIABLE_TRUST_SPINE_STRATEGY_BOUNDARY",
    "REVIEW_ONLY_MINIMUM_VIABLE_TRUST_SPINE_IMPLEMENTATION_READINESS_ENTRY_CANDIDATE",
    "continued pause",
    "None are authorized by this boundary",
  ]);
});

test("boundary rejects exact overclaiming tokens", () => {
  const forbiddenTokens = [
    "TRUST_SPINE_IMPLEMENTATION_READY",
    "TRUST_SPINE_READY_FOR_IMPLEMENTATION",
    "TRUST_SPINE_IMPLEMENTED",
    "TRUST_SPINE_CLOSED",
    "TRUST_SPINE_BLOCKER_RESOLVED",
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
    "ENCRYPTION_IMPLEMENTED",
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

  for (const token of forbiddenTokens) {
    assert.equal(
      docsText.includes(token),
      false,
      `Boundary must not contain overclaim token: ${token}`,
    );
  }
});
