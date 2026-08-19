const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.resolve(__dirname, "..");
const docPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_REPO_WIDE_GOVERNANCE_AXIOMS_BOUNDARY_v1.md",
);
const agentsPath = path.join(repoRoot, "AGENTS.md");
const doc = fs.readFileSync(docPath, "utf8");
const agents = fs.readFileSync(agentsPath, "utf8");

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

const identityTokens = [
  "REPO_WIDE_GOVERNANCE_AXIOMS_BOUNDARY",
  "DOCS_ONLY",
  "GOVERNANCE_AXIOMS_ONLY",
  "REPO_WIDE_GOVERNANCE_AXIOMS_NOT_RUNTIME_ENFORCEMENT",
];

const defaultPostureTokens = [
  "GIT_GUARD_FIRST",
  "LIVE_REPO_EVIDENCE_CONTROLS",
  "SMALLEST_SAFE_NEXT_SLICE",
  "FAIL_CLOSED_ON_AMBIGUITY",
  "DOCS_CONTRACTS_BEFORE_RUNTIME",
  "TESTS_PROVE_ONLY_WHAT_THEY_EXPLICITLY_PROVE",
  "PAUSE_IS_VALID_OUTCOME",
  "HUMAN_PROFESSIONAL_REVIEW_REMAINS_RELEASE_GATE",
  "NO_PRODUCT_CANDIDATE_WITHOUT_SEPARATE_EXPLICIT_AUTHORIZATION",
  "NO_EXTERNAL_USE_WITHOUT_SEPARATE_EXPLICIT_AUTHORIZATION",
];

const negativeBoundaryItems = [
  "implementation",
  "runtime behavior",
  "runtime/API/schema/package behavior change",
  "approval",
  "sign-off",
  "legal/clinical/evidentiary/case-truth conclusions",
  "security/vulnerability findings",
  "severity",
  "remediation",
  "blocker resolution",
  "product candidate",
  "external-use authorization",
  "raw/private/source inspection",
  "source package inspection",
  "PDF/image/screenshot/metadata inspection",
  "metadata acquisition",
  "real private run",
  "any domain-specific reopening risks",
];

const negativeChecks = [
  "This boundary creates no implementation.",
  "This boundary creates no runtime behavior.",
  "This boundary creates no runtime/API/schema/package behavior change.",
  "This boundary creates no approval.",
  "This boundary creates no sign-off.",
  "This boundary creates no release approval.",
  "This boundary creates no runtime certification.",
  "This boundary creates no technical sign-off.",
  "This boundary creates no External Reviewer approval.",
  "This boundary creates no legal/clinical/evidentiary/case-truth conclusion.",
  "This boundary creates no security finding.",
  "This boundary creates no vulnerability finding.",
  "This boundary assigns no severity.",
  "This boundary recommends no remediation.",
  "This boundary resolves no blocker.",
  "This boundary selects no product candidate.",
  "This boundary authorizes no external-use.",
  "This boundary authorizes no raw/private/source inspection.",
  "This boundary authorizes no source package inspection.",
  "This boundary authorizes no PDF/image/screenshot/metadata inspection.",
  "This boundary authorizes no metadata acquisition.",
  "This boundary authorizes no real private run.",
  "This boundary creates no third-party routing reopening.",
  "This boundary creates no RBAC implementation.",
  "This boundary creates no audit/access-log implementation.",
  "This boundary creates no retention/deletion implementation.",
  "This boundary creates no raw-material routing implementation.",
  "This boundary creates no runtime gate implementation.",
  "This boundary creates no validator dispatch.",
  "This boundary creates no registry/lookup.",
];

test("boundary doc exists and identity/status tokens exist", () => {
  assert.ok(fs.existsSync(docPath));
  assertIncludesAll([
    "Boundary name: `REPO_WIDE_GOVERNANCE_AXIOMS_BOUNDARY`",
    "Mode: `DOCS_ONLY`",
    "Status: `GOVERNANCE_AXIOMS_ONLY`",
  ]);
  assertIncludesAll(identityTokens);
});

test("live repo evidence wins axiom exists", () => {
  const section = sectionBetween("## Axiom A: Live Repo Evidence Wins", "## Axiom B: Security Agent Is Advisory Not Decisional");
  assertIncludesAll([
    "LIVE_REPO_EVIDENCE_WINS",
    "Git guard first.",
    "Live repo root, branch, HEAD, git status, tracked docs, and tracked tests control.",
    "Handoff files, old startprompts, chat summaries, local memory, and advisory background are orientation only",
    "If conflict cannot be resolved safely, stop and report.",
  ], section);
});

test("security agent advisory not decisional axiom exists", () => {
  const section = sectionBetween("## Axiom B: Security Agent Is Advisory Not Decisional", "## Axiom C: Every Slice Must Declare Negative Boundary");
  assertIncludesAll([
    "SECURITY_AGENT_IS_ADVISORY_NOT_DECISIONAL",
    "helps identify the smallest safe next step",
    "blockers, stale context, overclaim risk, missing authorization, fail-closed posture, and questions for External Reviewer",
    "must not create approval, sign-off, security/vulnerability findings, severity, remediation, blocker resolution, product candidate, external-use authorization, implementation authorization, runtime authority, release certification, or product readiness",
  ], section);
});

test("every slice must declare negative boundary axiom exists", () => {
  const section = sectionBetween("## Axiom C: Every Slice Must Declare Negative Boundary", "## Default Posture");
  assertIncludesAll([
    "EVERY_SLICE_MUST_DECLARE_NEGATIVE_BOUNDARY",
    "what it does",
    "what it does not create",
  ], section);
  assertIncludesAll(negativeBoundaryItems, section);
});

test("default posture tokens exist", () => {
  assertIncludesAll(defaultPostureTokens, sectionBetween("## Default Posture", "## Proof And Validation Meaning"));
});

test("proof and validation meaning limits exist", () => {
  const section = sectionBetween("## Proof And Validation Meaning", "## Pause And Fail-Closed Rule");
  assertIncludesAll([
    "DOCS_ONLY is not runtime enforcement.",
    "PROVE_ONLY is not authorization.",
    "REVIEW_ONLY is not approval.",
    "Focused proof tests prove only the frozen text/guards they assert.",
    "`npm test`, `npm run lint`, and `npm run build` passing is not release approval.",
    "Green tests are not product readiness.",
    "Validation is evidence of the tested claim only, not broader certification.",
  ], section);
});

test("pause and fail-closed valid outcome rule exists", () => {
  const section = sectionBetween("## Pause And Fail-Closed Rule", "## External Review Requirements Rule");
  assertIncludesAll([
    "Continued pause is a valid result.",
    "Stop/fail-closed is correct when ambiguity, missing authorization, stale evidence, dirty tree, or boundary conflict exists.",
    "Not proceeding is not a failure when the safe boundary is unclear.",
  ], section);
});

test("External Reviewer advisory-only rule exists", () => {
  const section = sectionBetween("## External Review Requirements Rule", "## Handoff And Stale-Context Rule");
  assertIncludesAll([
    "external-review requirements remains advisory context unless separately frozen into repo evidence by an explicit `DOCS_ONLY` boundary/proof-test pattern.",
    "Asking External Reviewer a question is not External Reviewer approval.",
    "Comparing external-review requirements to repo evidence is not technical sign-off.",
    "external-review requirements does not authorize implementation, runtime, product candidate, external-use, approval, sign-off, blocker resolution, findings, severity, or remediation.",
  ], section);
});

test("handoff and stale-context rule exists", () => {
  const section = sectionBetween("## Handoff And Stale-Context Rule", "## Security-Agent Rule");
  assertIncludesAll([
    "Untracked advisory material may be stale.",
    "If they conflict with live repo evidence, live repo evidence wins.",
    "If conflict cannot be resolved safely, stop and report.",
    "Do not select, reopen, or close a slice from stale handoff text.",
  ], section);
});

test("security-agent advisory-only rule exists", () => {
  const section = sectionBetween("## Security-Agent Rule", "## Relationship To Existing Posture");
  assertIncludesAll([
    "security agent / governance navigator remains advisory only",
    "helps identify smallest safe next posture",
    "does not decide, approve, certify, resolve blockers, create findings, assign severity, recommend remediation, select product candidate, authorize external-use, or authorize implementation",
  ], section);
});

test("third-party routing no-reopening rule exists", () => {
  const section = sectionBetween("## Relationship To Existing Posture", "## Negative Authorization Checks");
  assertIncludesAll([
    "This boundary must not reopen third-party routing.",
    "Third-party routing remains `DOCS_ONLY`, reviewed, paused, non-runtime-ready, and blocked after blocker analysis.",
    "`9e2ab6a` is historical third-party routing blocker-analysis context only.",
    "`0d37892` is previous third-party routing status/gap-summary context.",
    "`26a31ca` is security-agent governance navigator advisory context when live git evidence confirms it.",
    "This boundary must not create any runtime/API/schema/package behavior change.",
    "This boundary must not alter security-agent advisory-only posture.",
  ], section);
});

test("raw/private/source inspection guards and negative authorization checks exist", () => {
  const section = sectionBetween("## Negative Authorization Checks", "## Evidence References");
  assertIncludesAll(negativeChecks, section);
});

test("recommended next posture is review-only or continued pause only", () => {
  const section = sectionBetween("## Recommended Smallest Safe Next Posture", null);
  assertIncludesAll([
    "REVIEW_ONLY_REPO_WIDE_GOVERNANCE_AXIOMS_BOUNDARY",
    "continued pause",
    "None are authorized by this boundary.",
  ], section);
  assert.doesNotMatch(section, /RUNTIME_CHANGE/);
  assert.doesNotMatch(section, /IMPLEMENTATION/);
  assert.doesNotMatch(section, /EXTERNAL_USE/);
});

test("AGENTS.md has minimal repo-wide governance axiom hardening", () => {
  assertIncludesAll([
    "## Repo-wide governance axioms",
    "Git guard first",
    "Every slice must state what it does and what it does not create",
    "Default posture: smallest safe next slice, fail closed on ambiguity",
    "Security-agent/governance-navigator posture remains advisory only",
  ], agents);
});

test("exact overclaiming status tokens are rejected", () => {
  assertDoesNotIncludeAny([
    "GOVERNANCE_AXIOMS_RUNTIME_ENFORCED",
    "GOVERNANCE_AXIOMS_IMPLEMENTED_AS_RUNTIME",
    "GOVERNANCE_AXIOMS_APPROVED",
    "SECURITY_AGENT_RUNTIME_AUTHORITY",
    "SECURITY_AGENT_DECISION_AUTHORITY",
    "SECURITY_AGENT_APPROVAL_AUTHORITY",
    "EXTERNAL_REVIEWER_APPROVAL_CREATED",
    "TECHNICAL_SIGN_OFF_CREATED",
    "RELEASE_APPROVAL_CREATED",
    "PRODUCT_READINESS_CREATED",
    "PRODUCT_CANDIDATE_SELECTED",
    "EXTERNAL_USE_AUTHORIZED",
    "SECURITY_FINDING_CREATED",
    "VULNERABILITY_FINDING_CREATED",
    "SEVERITY_ASSIGNED",
    "REMEDIATION_RECOMMENDED",
    "REMEDIATION_IMPLEMENTED",
    "BLOCKER_RESOLVED",
    "IMPLEMENTATION_AUTHORIZED",
    "RUNTIME_ENFORCED",
    "THIRD_PARTY_ROUTING_REOPENED",
    "RBAC_IMPLEMENTED",
    "AUDIT_ACCESS_LOG_IMPLEMENTED",
    "RETENTION_DELETION_IMPLEMENTED",
    "RAW_MATERIAL_ROUTING_IMPLEMENTED",
    "VALIDATOR_DISPATCH_CREATED",
    "REGISTRY_LOOKUP_CREATED",
  ]);
});
