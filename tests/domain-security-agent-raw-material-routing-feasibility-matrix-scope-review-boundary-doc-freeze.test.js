const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const docsPath = path.join(
  __dirname,
  "..",
  "docs",
  "DOMAIN_CONTRACTS_SECURITY_AGENT_RAW_MATERIAL_ROUTING_FEASIBILITY_MATRIX_SCOPE_REVIEW_BOUNDARY_v1.md",
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

function sectionBetween(startHeading, endHeading) {
  const start = docsText.indexOf(startHeading);
  assert.notEqual(start, -1, `missing start heading: ${startHeading}`);
  const end = docsText.indexOf(endHeading, start + startHeading.length);
  assert.notEqual(end, -1, `missing end heading: ${endHeading}`);
  return docsText.slice(start, end);
}

const statusTokens = [
  "SECURITY_AGENT_RAW_MATERIAL_ROUTING_FEASIBILITY_MATRIX_SCOPE_REVIEW_BOUNDARY",
  "DOCS_ONLY",
  "DIRECT_MATRIX_REVIEW_COMPLETED",
  "ACTUAL_RAW_MATERIAL_ROUTING_FEASIBILITY_MATRIX_INSPECTED",
  "SCOPE_ALIGNMENT_REVIEW_CONTEXT_ONLY_NOT_SUBSTITUTE",
  "SUITABLE_AS_SCOPE_UNDERLAG",
  "NO_REQUIRED_REVISIONS_FOR_SCOPE_UNDERLAG",
  "DOWNSTREAM_ARTIFACTS_INTERNAL_CONTEXT_ONLY",
  "DOWNSTREAM_ARTIFACTS_NOT_APPROVED",
  "DOWNSTREAM_ARTIFACTS_NOT_RUNTIME_ENFORCEMENT",
  "DOWNSTREAM_ARTIFACTS_NOT_IMPLEMENTATION",
  "DOWNSTREAM_ARTIFACTS_NOT_PRODUCT_READINESS",
  "DOWNSTREAM_ARTIFACTS_NOT_EXTERNAL_USE",
  "WORDING_OVERCLAIM_RISK_REMAINS_IF_CONTEXT_QUALIFIER_REMOVED",
  "NO_REAL_SUBSTANTIVE_CONTRADICTION",
  "NO_SECURITY_FINDING_CREATED",
  "NO_VULNERABILITY_FINDING_CREATED",
  "NO_SEVERITY_ASSIGNED",
  "NO_REMEDIATION_RECOMMENDED",
  "NO_REMEDIATION_IMPLEMENTED",
  "NO_BLOCKER_RESOLVED",
  "NO_IMPLEMENTATION_EVIDENCE_CREATED",
  "RUNTIME_API_SCHEMA_PACKAGE_BEHAVIOR_UNCHANGED",
  "RAW_PRIVATE_MATERIAL_NOT_INSPECTED",
  "SOURCE_PACKAGE_NOT_INSPECTED",
  "PDF_IMAGE_SCREENSHOT_METADATA_NOT_INSPECTED",
  "METADATA_NOT_ACQUIRED",
  "THIRD_PARTY_MODEL_API_ROUTING_NOT_AUTHORIZED",
  "REAL_PRIVATE_RUN_NOT_STARTED",
  "RUNTIME_GATE_INVENTORY_DEFERRED",
  "PRODUCT_CANDIDATE_NONE",
  "EXTERNAL_USE_NOT_AUTHORIZED",
  "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
  "DOCS_ONLY_BOUNDARIES_NOT_RUNTIME_ENFORCEMENT",
];

const answerRows = [
  "| Material classes complete and correctly separated | yes |",
  "| Raw/private/source isolated from sanitized/no-raw | yes |",
  "| Generated/export artifacts and local logs/test transcripts separate risk classes | yes |",
  "| PDF/image/screenshot/metadata potentially sensitive/blocked | yes |",
  "| Third-party model/API routed material deny-by-default and requires separate authorization | yes |",
  "| Human/professional review-only material bounded as review-only, not approval/sign-off/external-use | yes |",
  "| Ingress, processing, egress, redaction/sanitization, audit, retention/deletion, and RBAC dependencies clear enough for scope | yes |",
  "| DOCS_ONLY runtime-enforcement risk | low residual risk, mitigated by no-overclaim wording |",
  "| Misread risk as implementation/remediation/finding/severity/certification/sign-off/readiness/external-use | low residual risk, mitigated by no-overclaim wording |",
];

const downstreamPosture = [
  "`RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_BOUNDARY`: internal DOCS_ONLY context only pending separate presentation/acceptance.",
  "`RBAC_CONTROL_SPECIFICATION_FEASIBILITY_REVIEW_BOUNDARY`: internal DOCS_ONLY context only.",
  "`RBAC_CONTROL_SPECIFICATION_BOUNDARY`: internal DOCS_ONLY context only.",
  "`AUDIT_ACCESS_LOG_CONTROL_SPECIFICATION_FEASIBILITY_REVIEW_BOUNDARY`: internal DOCS_ONLY context only.",
  "Any untracked audit/access-log control-specification draft files: local downstream draft only, not repo evidence.",
];

const evidenceReferences = [
  "`docs/DOMAIN_CONTRACTS_RAW_MATERIAL_ROUTING_FEASIBILITY_REVIEW_BOUNDARY_v1.md`",
  "`tests/domain-raw-material-routing-feasibility-review-boundary-doc-freeze.test.js`",
  "`docs/DOMAIN_CONTRACTS_RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_BOUNDARY_v1.md`",
  "`docs/DOMAIN_CONTRACTS_RBAC_CONTROL_SPECIFICATION_FEASIBILITY_REVIEW_BOUNDARY_v1.md`",
  "`docs/DOMAIN_CONTRACTS_RBAC_CONTROL_SPECIFICATION_BOUNDARY_v1.md`",
  "`docs/DOMAIN_CONTRACTS_AUDIT_ACCESS_LOG_CONTROL_SPECIFICATION_FEASIBILITY_REVIEW_BOUNDARY_v1.md`",
  "`[excluded private review artifact]`",
  "`[excluded private review artifact]`",
];

const noOverclaimRules = [
  "this direct matrix scope review boundary is not implementation",
  "this direct matrix scope review boundary is not remediation",
  "this direct matrix scope review boundary is not a security assessment finding",
  "this direct matrix scope review boundary is not a vulnerability finding",
  "this direct matrix scope review boundary assigns no severity",
  "this direct matrix scope review boundary recommends no remediation",
  "`SUITABLE_AS_SCOPE_UNDERLAG` does not mean implementation approval",
  "`SUITABLE_AS_SCOPE_UNDERLAG` does not mean runtime enforcement",
  "`SUITABLE_AS_SCOPE_UNDERLAG` does not mean product readiness",
  "`SUITABLE_AS_SCOPE_UNDERLAG` does not mean external-use authorization",
  "downstream artifacts are internal context only unless separately reviewed/accepted",
  "DOCS_ONLY boundaries are not runtime enforcement",
  "product candidate remains none",
  "external-use remains unauthorized",
  "human/professional review remains release gate",
  "runtime gate inventory remains deferred",
];

const noReopeningRules = [
  "runtime implementation",
  "API behavior change",
  "schema behavior change",
  "package implementation behavior",
  "raw-material routing implementation",
  "RBAC implementation",
  "audit/access-log implementation",
  "event taxonomy runtime code",
  "log schema",
  "log storage",
  "role field creation",
  "permission field creation",
  "role schema creation",
  "permission schema creation",
  "admin/support model creation",
  "validator dispatch",
  "registry/lookup/generic dispatch",
  "real private run",
  "source inspection",
  "raw/private material inspection",
  "metadata acquisition",
  "source package inspection",
  "PDF/image/screenshot inspection",
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
  "local logs as packet components",
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
  "no SWE psykiskt vald legal modelling",
  "Nordic comparison",
];

const negativeAuthorizationPhrases = [
  "It changes no runtime/API/schema/package behavior.",
  "raw-material routing implementation",
  "RBAC implementation",
  "audit/access-log implementation",
  "event taxonomy runtime code",
  "log schema",
  "log storage",
  "role field creation",
  "permission field creation",
  "role schema creation",
  "permission schema creation",
  "admin/support model creation",
  "validator dispatch",
  "registry/lookup/generic dispatch",
  "real private run",
  "source inspection",
  "raw/private material inspection",
  "metadata acquisition",
  "It selects no product candidate.",
  "It authorizes no external-use.",
  "release approval",
  "runtime certification",
  "technical sign-off",
  "External Reviewer approval",
  "legal/clinical/evidentiary/case-truth conclusions",
  "security findings",
  "vulnerability findings",
  "severity",
  "remediation",
];

test("security-agent raw-material routing feasibility matrix scope review boundary is frozen", () => {
  assert.ok(fs.existsSync(docsPath));
  assertIncludesAll([
    "Boundary name: `SECURITY_AGENT_RAW_MATERIAL_ROUTING_FEASIBILITY_MATRIX_SCOPE_REVIEW_BOUNDARY`",
    "Mode: `DOCS_ONLY`",
    "Status: `SUITABLE_AS_SCOPE_UNDERLAG`",
    "The inspected matrix is `docs/DOMAIN_CONTRACTS_RAW_MATERIAL_ROUTING_FEASIBILITY_REVIEW_BOUNDARY_v1.md`.",
    "The prior internal PROVE_ONLY scope-alignment review was context only and not a substitute for this direct matrix review.",
  ]);
  assertIncludesAll(statusTokens);
});

test("direct review answer table and downstream posture are frozen", () => {
  const answerTable = sectionBetween("## Direct Review Answer Table", "## Downstream Artifact Posture");
  assertIncludesAll(answerRows, answerTable);

  const downstreamSection = sectionBetween("## Downstream Artifact Posture", "## EXTERNAL_REVIEWER_AGENT_ALIGNMENT_HEURISTIC Result");
  assertIncludesAll(downstreamPosture, downstreamSection);
});

test("evidence references and alignment result are frozen", () => {
  const heuristicSection = sectionBetween("## EXTERNAL_REVIEWER_AGENT_ALIGNMENT_HEURISTIC Result", "## Evidence References");
  assertIncludesAll([
    "The direct matrix review satisfies scope-before-specification.",
    "Feasibility remains before control specification.",
    "Control specification remains before implementation.",
    "Implementation evidence remains before runtime-gate claims.",
    "Mismatch classification: no substantive mismatch.",
    "Residual mismatch classification: `WORDING_OVERCLAIM_RISK` only if downstream DOCS_ONLY artifacts are later presented without the internal-context-only qualifier.",
  ], heuristicSection);

  const evidenceSection = sectionBetween("## Evidence References", "## No-Overclaim Rules");
  assertIncludesAll(evidenceReferences, evidenceSection);
});

test("no-overclaim and no-reopening rules are frozen", () => {
  const noOverclaimSection = sectionBetween("## No-Overclaim Rules", "## No-Reopening Rules");
  assertIncludesAll(noOverclaimRules, noOverclaimSection);

  const noReopeningSection = sectionBetween("## No-Reopening Rules", "## Raw/Private/Conclusion Guard");
  assertIncludesAll(noReopeningRules, noReopeningSection);
  assertIncludesAll(negativeAuthorizationPhrases, docsText);
});

test("raw/private/conclusion guard and next-slice posture are frozen", () => {
  const guardSection = sectionBetween("## Raw/Private/Conclusion Guard", "## Next-Slice Posture");
  assertIncludesAll([
    "This boundary contains no raw/private source material.",
    "This boundary contains no source package material.",
    "This boundary creates no legal, clinical, evidentiary, case-truth, credibility, offence, ownership, risk, sufficiency, police-report, pleading, marker-finding, security-finding, vulnerability-finding, severity, remediation, external-use, or product-candidate conclusion.",
    "Any references to those categories are blocked-category, forbidden-category, future-evidence, or non-authorization wording only.",
  ], guardSection);

  const nextSliceSection = docsText.slice(docsText.indexOf("## Next-Slice Posture"));
  assertIncludesAll([
    "`REVIEW_ONLY_SECURITY_AGENT_RAW_MATERIAL_ROUTING_FEASIBILITY_MATRIX_SCOPE_REVIEW_BOUNDARY`",
    "`REVIEW_ONLY_RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_BOUNDARY_AS_DOWNSTREAM_CONTEXT`",
    "`DOCS_ONLY_RAW_MATERIAL_ROUTING_CONTROL_SPECIFICATION_SCOPE_ALIGNMENT_STATUS_BOUNDARY`",
    "continued pause",
    "None are authorized by this boundary.",
  ], nextSliceSection);
});
