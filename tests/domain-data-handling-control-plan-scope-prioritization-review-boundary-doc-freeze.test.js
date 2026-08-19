const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const docsPath = path.join(
  __dirname,
  "..",
  "docs",
  "DOMAIN_CONTRACTS_DATA_HANDLING_CONTROL_PLAN_SCOPE_PRIORITIZATION_REVIEW_BOUNDARY_v1.md",
);
const docsText = fs.readFileSync(docsPath, "utf8");

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function assertIncludesAll(values, text = docsText) {
  for (const value of values) {
    assert.match(text, new RegExp(escapeRegExp(value)));
  }
}

function assertDoesNotIncludeAny(values, text = docsText) {
  for (const value of values) {
    assert.doesNotMatch(text, new RegExp(escapeRegExp(value), "i"));
  }
}

function sectionBetween(startHeading, endHeading) {
  const start = docsText.indexOf(startHeading);
  assert.notEqual(start, -1, `missing start heading: ${startHeading}`);
  const end = docsText.indexOf(endHeading, start + startHeading.length);
  assert.notEqual(end, -1, `missing end heading: ${endHeading}`);
  return docsText.slice(start, end);
}

function rowForControl(controlName, table) {
  const row = table
    .split("\n")
    .find((line) => line.startsWith("| ") && line.includes(`| ${controlName} |`));
  assert.ok(row, `missing table row for control: ${controlName}`);
  return row;
}

const statusTokens = [
  "DATA_HANDLING_CONTROL_PLAN_SCOPE_PRIORITIZATION_REVIEW_BOUNDARY",
  "DOCS_ONLY",
  "SCOPE_PRIORITIZATION_REVIEW_ONLY",
  "CONTROL_PLAN_SCOPE_REVIEW_NOT_IMPLEMENTATION",
  "CONTROL_PLAN_SCOPE_REVIEW_NOT_REMEDIATION",
  "NO_SECURITY_FINDING_CREATED",
  "NO_VULNERABILITY_FINDING_CREATED",
  "NO_SEVERITY_ASSIGNED",
  "NO_REMEDIATION_RECOMMENDED",
  "NO_REMEDIATION_IMPLEMENTED",
  "NO_BLOCKER_RESOLVED",
  "NO_IMPLEMENTATION_EVIDENCE_CREATED",
  "RUNTIME_API_SCHEMA_PACKAGE_BEHAVIOR_UNCHANGED",
  "VALIDATOR_DISPATCH_NOT_CREATED",
  "REGISTRY_LOOKUP_NOT_CREATED",
  "REAL_PRIVATE_RUN_NOT_STARTED",
  "RAW_PRIVATE_MATERIAL_NOT_INSPECTED",
  "SOURCE_PACKAGE_NOT_INSPECTED",
  "METADATA_NOT_ACQUIRED",
  "PRODUCT_CANDIDATE_NONE",
  "EXTERNAL_USE_NOT_AUTHORIZED",
  "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
  "RUNTIME_GATE_INVENTORY_DEFERRED",
  "RAW_MATERIAL_ROUTING_FIRST_DEEP_DIVE_CANDIDATE",
  "RBAC_SECOND_OR_PARALLEL_DEEP_DIVE_CANDIDATE",
  "RETENTION_DELETION_USEFUL_BUT_NOT_IMMEDIATE_NEXT_DEEP_DIVE",
  "ENCRYPTION_NEEDS_SPLIT_AT_REST_AND_IN_TRANSIT",
  "AUDIT_ACCESS_LOGS_NEEDS_SPLIT",
  "THIRD_PARTY_MODEL_API_STATUS_DEPENDENCY_BLOCKED",
  "COMPLETE_GLOBAL_ACCESS_CONTROL_THREAT_MODEL_SECURITY_AGENT_SCOPE_FIRST",
  "DOCS_ONLY_BOUNDARIES_NOT_RUNTIME_ENFORCEMENT",
  "ROUTE_CASE_CAPABILITY_EVIDENCE_SURFACE_SPECIFIC_PARTIAL_ONLY",
  "ROUTE_CASE_CAPABILITY_EVIDENCE_NOT_FULL_ACCESS_CONTROL",
  "ROUTE_CASE_CAPABILITY_EVIDENCE_NOT_RBAC",
  "ROUTE_CASE_CAPABILITY_EVIDENCE_NOT_ADMIN_SUPPORT_ACCESS_CONTROL",
  "ROUTE_CASE_CAPABILITY_EVIDENCE_NOT_GLOBAL_AUTHORIZATION_MODEL",
];

const reviewRows = [
  [
    "retention",
    "`CLEAR_ENOUGH_FOR_PLAN_LEVEL`",
    "`SHOULD_MOVE_LATER`",
    "`REASONABLE`",
    "`CONCRETE_ENOUGH`",
    "`VERIFIABLE`",
    "`LOW`",
    "`KEEP_AS_IS`",
  ],
  [
    "deletion",
    "`CLEAR_ENOUGH_FOR_PLAN_LEVEL`",
    "`SHOULD_MOVE_LATER`",
    "`REASONABLE`",
    "`CONCRETE_ENOUGH`",
    "`VERIFIABLE`",
    "`LOW`",
    "`KEEP_AS_IS`",
  ],
  [
    "encryption",
    "`NEEDS_SPLIT`",
    "`DEPENDENCY_BLOCKED`",
    "`ARCHITECTURE_REQUIRED_FIRST`",
    "`NOT_TESTABLE_UNTIL_ARCHITECTURE`",
    "`NOT_VERIFIABLE_YET`",
    "`MEDIUM`",
    "`SECURITY_AGENT_SCOPE_FIRST`",
  ],
  [
    "audit/access logs",
    "`NEEDS_SPLIT`",
    "`DEPENDENCY_BLOCKED`",
    "`ARCHITECTURE_REQUIRED_FIRST`",
    "`NEEDS_MORE_TEST_DETAIL`",
    "`NEEDS_MORE_CONCRETE_CLOSURE`",
    "`MEDIUM`",
    "`SPLIT_CONTROL`",
  ],
  [
    "role permissions / RBAC",
    "`CLEAR_ENOUGH_FOR_PLAN_LEVEL`",
    "`SHOULD_MOVE_EARLIER`",
    "`ARCHITECTURE_REQUIRED_FIRST`",
    "`CONCRETE_ENOUGH`",
    "`VERIFIABLE`",
    "`HIGH`",
    "`RBAC_DEEP_DIVE_CANDIDATE`",
  ],
  [
    "raw-material routing",
    "`CLEAR_ENOUGH_FOR_PLAN_LEVEL`",
    "`SHOULD_MOVE_EARLIER`",
    "`REASONABLE`",
    "`CONCRETE_ENOUGH`",
    "`VERIFIABLE`",
    "`HIGH`",
    "`RAW_ROUTING_DEEP_DIVE_CANDIDATE`",
  ],
  [
    "third-party model/API status",
    "`CLEAR_ENOUGH_FOR_PLAN_LEVEL`",
    "`DEPENDENCY_BLOCKED`",
    "`ARCHITECTURE_REQUIRED_FIRST`",
    "`NEEDS_MORE_TEST_DETAIL`",
    "`NEEDS_MORE_CONCRETE_CLOSURE`",
    "`HIGH`",
    "`KEEP_AS_IS`",
  ],
  [
    "access control beyond documented route/case behavior",
    "`CLEAR_ENOUGH_FOR_PLAN_LEVEL`",
    "`SHOULD_MOVE_EARLIER`",
    "`ARCHITECTURE_REQUIRED_FIRST`",
    "`CONCRETE_ENOUGH`",
    "`VERIFIABLE`",
    "`HIGH`",
    "`KEEP_AS_IS`",
  ],
  [
    "complete global access-control threat model",
    "`SECURITY_AGENT_REVIEW_RECOMMENDED`",
    "`DEPENDENCY_BLOCKED`",
    "`ARCHITECTURE_REQUIRED_FIRST`",
    "`NOT_TESTABLE_UNTIL_ARCHITECTURE`",
    "`NOT_VERIFIABLE_YET`",
    "`HIGH`",
    "`SECURITY_AGENT_SCOPE_FIRST`",
  ],
];

test("boundary doc exists and freezes docs-only scope-prioritization posture", () => {
  assert.equal(fs.existsSync(docsPath), true);
  assertIncludesAll([
    "Boundary name: `DATA_HANDLING_CONTROL_PLAN_SCOPE_PRIORITIZATION_REVIEW_BOUNDARY`",
    "Mode: `DOCS_ONLY`",
    "Status: `SCOPE_PRIORITIZATION_REVIEW_ONLY`",
    "This boundary freezes the data-handling control-plan scope/prioritization review only.",
    "It is not implementation.",
    "It is not remediation.",
    "It does not resolve blockers.",
    "It does not create implementation evidence.",
    "It does not change runtime/API/schema/package behavior.",
    "It preserves that runtime gate inventory remains deferred.",
  ]);
});

test("all required current status tokens appear", () => {
  assertIncludesAll(statusTokens);
});

test("all nine review table rows appear", () => {
  for (const [controlName] of reviewRows) {
    assertIncludesAll([controlName]);
  }
});

test("row-scoped assertions bind review table columns together", () => {
  const table = sectionBetween("## Scope Prioritization Review Table", "## Summary Findings");
  for (const rowParts of reviewRows) {
    const [controlName, ...expectedParts] = rowParts;
    const row = rowForControl(controlName, table);
    assertIncludesAll(expectedParts, row);
  }
});

test("required summary findings appear", () => {
  assertIncludesAll([
    "Plan covers the right trust-blockers.",
    "Nine controls are mostly correctly separated at plan level.",
    "Split candidates are encryption at rest vs in transit and audit logs vs access logs.",
    "No merge is recommended.",
    "Priority order should shift to raw-material routing first.",
    "RBAC/access-control architecture should be second or parallel.",
    "Retention/deletion remain useful but are no longer the immediate next deep dive.",
    "Intended enforcement layers are target classifications, not current enforcement.",
    "Runtime gate implementation candidate inventory remains deferred.",
    "Raw-material routing is likely first deep-dive candidate after this review.",
    "RBAC is likely second or parallel.",
    "Too-vague blockers remain encryption architecture, audit/access log event taxonomy, third-party provider/data-routing status, and complete global access-control threat model.",
  ]);
});

test("required evidence references appear", () => {
  assertIncludesAll([
    "docs/DOMAIN_CONTRACTS_DATA_HANDLING_IMPLEMENTATION_CONTROL_PLAN_BOUNDARY_v1.md",
    "tests/domain-data-handling-implementation-control-plan-boundary-doc-freeze.test.js",
    "docs/DOMAIN_CONTRACTS_RETENTION_DELETION_CONTROL_SPECIFICATION_BOUNDARY_v1.md",
    "docs/DOMAIN_CONTRACTS_DATA_HANDLING_IMPLEMENTATION_GAP_INVENTORY_STATUS_BOUNDARY_v1.md",
    "docs/DOMAIN_CONTRACTS_INTERNAL_GOVERNANCE_REVIEW_PROTOCOL_STATUS_AND_GAP_SUMMARY_v1.md",
    "docs/DOMAIN_CONTRACTS_ROLE_PERMISSION_SURFACE_INVENTORY_STATUS_BOUNDARY_v1.md",
    "docs/DOMAIN_CONTRACTS_ADMIN_SUPPORT_ACCESS_SURFACE_INVENTORY_STATUS_BOUNDARY_v1.md",
    "docs/DOMAIN_CONTRACTS_ACCESS_CONTROL_THREAT_MODEL_INVENTORY_STATUS_BOUNDARY_v1.md",
    "[excluded private review artifact]",
    "[excluded private review artifact]",
  ]);
});

test("no-overclaim rules appear", () => {
  const section = sectionBetween("## No-Overclaim Rules", "## No-Reopening Rules");
  assertIncludesAll([
    "this scope/prioritization review is not implementation",
    "this scope/prioritization review is not remediation",
    "this scope/prioritization review is not a security assessment finding",
    "this scope/prioritization review is not a vulnerability finding",
    "this scope/prioritization review assigns no severity",
    "this scope/prioritization review recommends no remediation",
    "prioritization does not mean implementation approval",
    "deep-dive candidate does not mean runtime gate candidate",
    "intended enforcement layer is a target classification, not current enforcement",
    "DOCS_ONLY boundaries are not runtime enforcement",
    "route/case/capability evidence is not full access control",
    "route/case/capability evidence is not RBAC",
    "route/case/capability evidence is not admin/support access control",
    "route/case/capability evidence is not global authorization model",
    "runtime gate inventory remains deferred",
    "product candidate remains none",
    "external-use remains unauthorized",
    "human/professional review remains release gate",
  ], section);
});

test("no-reopening rules appear", () => {
  const section = sectionBetween("## No-Reopening Rules", "## Raw/Private/Conclusion Guard");
  assertIncludesAll([
    "runtime implementation",
    "API behavior change",
    "schema behavior change",
    "package implementation behavior",
    "validator dispatch",
    "registry/lookup/generic dispatch",
    "real private run",
    "source inspection",
    "raw/private material inspection",
    "metadata acquisition",
    "source package inspection",
    "manifest instance creation",
    "actual source matrix creation",
    "test fixture instance creation",
    "manual External Reviewer delivery",
    "PDF generation",
    "PDF packet creation",
    "archive/ZIP generation",
    "packet component approval",
    "generated PDF as repo evidence",
    "generated PDF as packet component",
    "committing local logs",
    "local logs as CI evidence",
    "product-candidate selection",
    "external-use readiness",
    "release approval",
    "runtime certification",
    "technical sign-off",
    "External Reviewer approval",
    "legal/clinical/evidentiary/case-truth conclusions",
    "security findings",
    "vulnerability findings",
    "severity",
    "remediation",
    "SWE bodelning",
    "DK psykisk vold offence modelling",
    "no SWE psykiskt våld legal modelling",
    "Nordic comparison",
  ], section);
});

test("next-slice posture appears without authorization", () => {
  const section = docsText.slice(docsText.indexOf("## Next-Slice Posture"));
  assertIncludesAll([
    "`REVIEW_ONLY_DATA_HANDLING_CONTROL_PLAN_SCOPE_PRIORITIZATION_REVIEW_BOUNDARY`",
    "`PROVE_ONLY_RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_FEASIBILITY_REVIEW`",
    "`PROVE_ONLY_RBAC_CONTROL_SPECIFICATION_FEASIBILITY_REVIEW`",
    "continued pause",
    "None are authorized by this boundary.",
  ], section);
});

test("negative authorization checks preserve no runtime and no approval posture", () => {
  assertIncludesAll([
    "It does not change runtime/API/schema/package behavior.",
    "It does not authorize raw-material routing implementation.",
    "It does not authorize RBAC implementation.",
    "It does not authorize access-control architecture implementation.",
    "It does not authorize runtime gate inventory.",
    "It does not authorize real private run.",
    "It does not authorize raw/private/source package inspection.",
    "It does not authorize metadata acquisition.",
    "It does not authorize external-use.",
    "It does not select product candidate.",
    "`RUNTIME_API_SCHEMA_PACKAGE_BEHAVIOR_UNCHANGED`",
    "`VALIDATOR_DISPATCH_NOT_CREATED`",
    "`REGISTRY_LOOKUP_NOT_CREATED`",
    "`REAL_PRIVATE_RUN_NOT_STARTED`",
    "`RAW_PRIVATE_MATERIAL_NOT_INSPECTED`",
    "`SOURCE_PACKAGE_NOT_INSPECTED`",
    "`METADATA_NOT_ACQUIRED`",
    "`PRODUCT_CANDIDATE_NONE`",
    "`EXTERNAL_USE_NOT_AUTHORIZED`",
    "`HUMAN_PROFESSIONAL_REVIEW_REQUIRED`",
  ]);
});

test("raw private and conclusion guard remains blocked-category wording only", () => {
  const guard = sectionBetween("## Raw/Private/Conclusion Guard", "## Next-Slice Posture");
  assertIncludesAll([
    "This boundary contains no raw/private source material.",
    "This boundary contains no source package material.",
    "This boundary creates no legal, clinical, evidentiary, case-truth, credibility, offence, ownership, risk, sufficiency, police-report, pleading, marker-finding, security-finding, vulnerability-finding, severity, remediation, external-use, or product-candidate conclusion.",
    "Any references to those categories are blocked-category or non-authorization wording only.",
  ], guard);
  assertDoesNotIncludeAny([
    "legal conclusion created",
    "clinical conclusion created",
    "evidentiary proof created",
    "case-truth conclusion created",
    "security finding created",
    "vulnerability finding created",
    "severity assigned",
    "remediation recommended",
    "product candidate selected",
    "external-use authorized",
  ]);
});
