const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.resolve(__dirname, "..");
const docPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_SECURITY_AGENT_GOVERNANCE_NAVIGATOR_ADVISORY_BOUNDARY_v1.md",
);
const doc = fs.readFileSync(docPath, "utf8");

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function assertIncludesAll(expected, text = doc) {
  for (const item of expected) {
    assert.match(text, new RegExp(escapeRegExp(item), "i"), `missing ${item}`);
  }
}

function assertDoesNotIncludeAny(forbidden, text = doc) {
  for (const item of forbidden) {
    assert.doesNotMatch(text, new RegExp(escapeRegExp(item)), `unexpected ${item}`);
  }
}

function sectionBetween(startHeading, endHeading) {
  const start = doc.indexOf(startHeading);
  assert.notEqual(start, -1, `missing section ${startHeading}`);
  const end = endHeading ? doc.indexOf(endHeading, start + startHeading.length) : doc.length;
  assert.notEqual(end, -1, `missing end section ${endHeading}`);
  return doc.slice(start, end);
}

const statusTokens = [
  "SECURITY_AGENT_GOVERNANCE_NAVIGATOR_ADVISORY_BOUNDARY",
  "DOCS_ONLY",
  "SECURITY_AGENT_GOVERNANCE_NAVIGATOR_ADVISORY_ONLY",
  "SECURITY_AGENT_IS_GOVERNANCE_NAVIGATOR_NOT_RUNTIME_AUTHORITY",
  "SECURITY_AGENT_INTERNAL_ADVISORY_CONTROL_FUNCTION_ONLY",
  "SECURITY_AGENT_DOCS_FIRST_FAIL_CLOSED_NAVIGATOR",
  "SECURITY_AGENT_POSTURE_AWARE_REPO_EVIDENCE_BOUND",
  "SECURITY_AGENT_SMALLEST_SAFE_NEXT_STEP_NAVIGATOR",
  "SECURITY_AGENT_NOT_IMPLEMENTATION",
  "SECURITY_AGENT_NOT_RUNTIME_BEHAVIOR",
  "SECURITY_AGENT_NOT_APPROVAL_AUTHORITY",
  "SECURITY_AGENT_NOT_SECURITY_FINDING_AUTHORITY",
  "SECURITY_AGENT_NOT_VULNERABILITY_FINDING_AUTHORITY",
  "SECURITY_AGENT_NOT_SEVERITY_AUTHORITY",
  "SECURITY_AGENT_NOT_REMEDIATION_AUTHORITY",
  "SECURITY_AGENT_NOT_PRODUCT_CANDIDATE_SELECTOR",
  "SECURITY_AGENT_NOT_EXTERNAL_USE_AUTHORIZER",
  "EXTERNAL_REVIEW_REQUIREMENTS_ADVISORY_CONTEXT_ONLY",
  "LIVE_GIT_EVIDENCE_CONTROLS_HANDOFF_TEXT",
  "STALE_HANDOFF_SUPPORT_FILES_ORIENTATION_ONLY",
  "THIRD_PARTY_ROUTING_REMAINS_REVIEWED_PAUSED_NON_RUNTIME_READY_BLOCKED",
  "NO_IMPLEMENTATION_CREATED",
  "NO_RUNTIME_BEHAVIOR_CREATED",
  "RUNTIME_API_SCHEMA_PACKAGE_BEHAVIOR_UNCHANGED",
  "NO_SECURITY_FINDING",
  "NO_VULNERABILITY_FINDING",
  "NO_SEVERITY",
  "NO_REMEDIATION",
  "NO_APPROVAL",
  "NO_SIGN_OFF",
  "PRODUCT_CANDIDATE_NONE",
  "EXTERNAL_USE_NOT_AUTHORIZED",
  "NO_BLOCKER_RESOLUTION",
  "RAW_PRIVATE_MATERIAL_NOT_INSPECTED",
  "SOURCE_PACKAGE_NOT_INSPECTED",
  "PDF_IMAGE_SCREENSHOT_METADATA_NOT_INSPECTED",
  "METADATA_NOT_ACQUIRED",
  "REAL_PRIVATE_RUN_NOT_STARTED",
  "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
  "DOCS_ONLY_BOUNDARIES_NOT_RUNTIME_ENFORCEMENT",
];

const allowedFunctions = [
  "identify blockers",
  "identify overclaim risk",
  "identify stale handoff references",
  "identify missing authorization",
  "preserve fail-closed posture",
  "recommend `REVIEW_ONLY`, `PROVE_ONLY`, `DOCS_ONLY`, or `CONTINUED_PAUSE` posture candidates",
  "formulate questions for External Reviewer",
  "compare external-review requirements against repo boundaries",
  "require human/professional review as release gate",
  "recommend stopping when evidence is insufficient",
];

const forbiddenFunctions = [
  "authorize implementation",
  "resolve blockers",
  "create runtime behavior",
  "create route authorization",
  "create provider integration",
  "create provider registry/status implementation",
  "create data-routing map",
  "create token/URL/secret handling",
  "create audit/access-log implementation",
  "create event taxonomy runtime code",
  "create log schema/storage",
  "create RBAC/access-control implementation",
  "create raw-material routing implementation",
  "create retention/deletion implementation",
  "create runtime gates",
  "treat runtime gate inventory as implementation",
  "inspect raw/private/source package material",
  "inspect PDF/image/screenshot/metadata material",
  "acquire metadata",
  "start a real private run",
  "create legal/clinical/evidentiary/case-truth conclusions",
  "create credibility/offence/ownership/risk/sufficiency/police-report/pleading conclusions",
  "create security/vulnerability findings",
  "assign severity",
  "recommend remediation",
  "select product candidate",
  "authorize external-use",
  "create approval, certification, sign-off, or release readiness",
];

const noOverclaimRules = [
  "security-agent advisory role does not mean runtime agent implementation",
  "governance navigator does not mean approval authority",
  "posture recommendation does not mean authorization",
  "blocker identification does not mean blocker resolution",
  "External Reviewer question formulation does not mean External Reviewer approval",
  "security-oriented review does not mean security finding, vulnerability finding, severity assignment, or remediation",
  "docs-first advisory context does not mean runtime/API/schema/package behavior change",
  "stale handoff review does not mean stale handoff text controls live git evidence",
  "DOCS_ONLY boundaries are not runtime enforcement",
  "human/professional review remains release gate",
];

const negativeChecks = [
  "This boundary creates no implementation.",
  "This boundary creates no runtime behavior.",
  "This boundary creates no runtime/API/schema/package behavior change.",
  "This boundary creates no security finding.",
  "This boundary creates no vulnerability finding.",
  "This boundary assigns no severity.",
  "This boundary recommends no remediation.",
  "This boundary creates no approval.",
  "This boundary creates no sign-off.",
  "This boundary selects no product candidate.",
  "This boundary authorizes no external-use.",
  "This boundary resolves no blocker.",
];

test("boundary doc exists and boundary/status tokens exist", () => {
  assert.ok(fs.existsSync(docPath));
  assertIncludesAll([
    "Boundary name: `SECURITY_AGENT_GOVERNANCE_NAVIGATOR_ADVISORY_BOUNDARY`",
    "Mode: `DOCS_ONLY`",
    "Status: `SECURITY_AGENT_GOVERNANCE_NAVIGATOR_ADVISORY_ONLY`",
  ]);
  assertIncludesAll(statusTokens);
});

test("advisory-only role and smallest safe next step purpose are present", () => {
  assertIncludesAll([
    "internal, advisory, docs-first, fail-closed governance navigator",
    "What is the smallest safe next step?",
    "SECURITY_AGENT_IS_GOVERNANCE_NAVIGATOR_NOT_RUNTIME_AUTHORITY",
    "not a runtime agent",
    "not implementation",
    "not external-use authorization",
  ]);
});

test("allowed advisory functions are present", () => {
  const section = sectionBetween("## Allowed Advisory Functions", "## Forbidden Functions");
  assertIncludesAll(allowedFunctions, section);
});

test("forbidden functions are present", () => {
  const section = sectionBetween("## Forbidden Functions", "## External Review Requirements Rule");
  assertIncludesAll(forbiddenFunctions, section);
});

test("external-review requirements advisory-only rule is present", () => {
  const section = sectionBetween("## External Review Requirements Rule", "## Repo Evidence Hierarchy");
  assertIncludesAll([
    "external-review requirements remains advisory context only unless separately frozen into repo evidence by an explicit `DOCS_ONLY` boundary and proof-test pattern.",
    "formulate questions for External Reviewer",
    "compare external-review requirements against repo boundaries",
    "must not treat external-review requirements as implementation approval, technical sign-off, product readiness, external-use authorization, or blocker resolution",
  ], section);
});

test("repo evidence hierarchy is present", () => {
  const section = sectionBetween("## Repo Evidence Hierarchy", "## Relationship To Current Third-Party Routing Posture");
  assertIncludesAll([
    "Live git evidence, tracked docs, and proof tests control.",
    "Stale handoff/support files are orientation only.",
    "If handoff text conflicts with live repo evidence",
    "stop and report",
  ], section);
});

test("third-party routing no-reopening rule is present", () => {
  const section = sectionBetween("## Relationship To Current Third-Party Routing Posture", "## No-Raw / No-Private / No-Source Rule");
  assertIncludesAll([
    "This boundary must not reopen third-party routing.",
    "Third-party routing remains `DOCS_ONLY`, reviewed, paused, non-runtime-ready, and blocked after blocker analysis.",
    "`9e2ab6a` is historical third-party routing blocker-analysis context only.",
    "`0d37892` is the current canonical third-party routing status/gap summary after blocker analysis context when live git evidence confirms it.",
    "no third-party routing implementation",
    "no third-party routing authorization",
    "no provider integration",
    "no product candidate",
    "no external-use authorization",
  ], section);
});

test("no-raw/no-private/no-source/material inspection guard is present", () => {
  const section = sectionBetween("## No-Raw / No-Private / No-Source Rule", "## No-Overclaim Rules");
  assertIncludesAll([
    "contains no raw/private source material",
    "authorizes no raw/private/source package/PDF/image/screenshot/metadata inspection",
    "authorizes no metadata acquisition and no real private run",
    "tracked repo docs, proof tests, git status",
  ], section);
});

test("no-overclaim rules and negative authorization checks are present", () => {
  assertIncludesAll(noOverclaimRules, sectionBetween("## No-Overclaim Rules", "## Negative Authorization Checks"));
  assertIncludesAll(negativeChecks, sectionBetween("## Negative Authorization Checks", "## Evidence References"));
});

test("recommended next posture is review-only or continued pause only", () => {
  const section = sectionBetween("## Recommended Smallest Safe Next Posture", null);
  assertIncludesAll([
    "REVIEW_ONLY_SECURITY_AGENT_GOVERNANCE_NAVIGATOR_ADVISORY_BOUNDARY",
    "continued pause",
    "None are authorized by this boundary.",
  ], section);
  assert.doesNotMatch(section, /RUNTIME_CHANGE/);
  assert.doesNotMatch(section, /IMPLEMENTATION/);
  assert.doesNotMatch(section, /EXTERNAL_USE/);
});

test("exact overclaiming status tokens are rejected", () => {
  assertDoesNotIncludeAny([
    "SECURITY_AGENT_IMPLEMENTED",
    "SECURITY_AGENT_RUNTIME_ENABLED",
    "SECURITY_AGENT_RUNTIME_AUTHORITY",
    "SECURITY_AGENT_APPROVED",
    "SECURITY_AGENT_CERTIFIED",
    "EXTERNAL_SECURITY_APPROVAL_CREATED",
    "EXTERNAL_REVIEWER_APPROVAL_CREATED",
    "TECHNICAL_SIGN_OFF_CREATED",
    "PRODUCT_READINESS_CREATED",
    "PRODUCT_CANDIDATE_SELECTED",
    "EXTERNAL_USE_AUTHORIZED",
    "SECURITY_FINDING_CREATED",
    "VULNERABILITY_FINDING_CREATED",
    "SEVERITY_ASSIGNED",
    "REMEDIATION_RECOMMENDED",
    "REMEDIATION_IMPLEMENTED",
    "BLOCKER_RESOLVED",
    "RUNTIME_ENFORCED",
    "IMPLEMENTATION_AUTHORIZED",
  ]);
});
