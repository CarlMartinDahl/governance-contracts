const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const docsPath = path.join(
  __dirname,
  "..",
  "docs",
  "TECHNICAL_GOVERNANCE_EVIDENCE_REVIEW_AGENT_DRY_RUN_REPORT_v1.md",
);
const docsText = fs.readFileSync(docsPath, "utf8");

function assertIncludesAll(entries) {
  for (const entry of entries) {
    assert.match(
      docsText,
      new RegExp(entry.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"),
    );
  }
}

function sectionBetween(startHeading, endHeading) {
  const start = docsText.indexOf(startHeading);
  assert.notEqual(start, -1, `missing start heading: ${startHeading}`);
  const end = docsText.indexOf(endHeading, start + startHeading.length);
  assert.notEqual(end, -1, `missing end heading: ${endHeading}`);
  return docsText.slice(start, end);
}

test("dry-run report exists and freezes DOCS_ONLY markdown-only posture", () => {
  assert.equal(fs.existsSync(docsPath), true);
  assertIncludesAll([
    "Report name: `TECHNICAL_GOVERNANCE_EVIDENCE_REVIEW_AGENT_DRY_RUN_REPORT`.",
    "Status: `DOCS_ONLY`.",
    "markdown-only dry-run report",
    "first dry-run of `TECHNICAL_GOVERNANCE_EVIDENCE_REVIEW_AGENT`",
    "dry-run-report-only",
    "This report is not a PDF packet.",
    "This report is not an archive or ZIP packet.",
    "This report is not external-use material.",
    "The generated PDF draft remains comparison/input only and is not repo evidence.",
    "Live repo evidence controls over local handoff/context files.",
  ]);
});

test("required report sections appear", () => {
  assertIncludesAll([
    "## Scope Reviewed",
    "## Evidence Inventory",
    "## Implemented-vs-DOCS_ONLY Classification",
    "## Test Evidence Matrix Summary",
    "## Sanitized No-Raw Posture Check",
    "## Failure-Mode / Threat-Model Coverage Summary",
    "## Data-Handling Unknowns",
    "## Reproducibility / Package-Integrity Evidence",
    "## Overclaim Risks",
    "## Blockers / Gaps",
    "## Recommended Smallest Safe Next Step",
    "## Explicit Non-Authorizations",
  ]);
});

test("dry-run findings and evidence categories appear", () => {
  assertIncludesAll([
    "agent boundary works coherently against current repo evidence",
    "no conflict found between the boundary and tracked repo state",
    "supports implemented-vs-DOCS_ONLY classification without overclaiming runtime enforcement",
    "Proof tests exist and are scenario/proof evidence, not runtime certainty.",
    "The no-raw/no-private/no-source-locator posture is coherent.",
    "The no-conclusion posture is coherent.",
    "Formal complete threat model remains unknown/not evidenced.",
    "RUNTIME_ENFORCED",
    "SCHEMA_VALIDATOR_ENFORCED",
    "PROMPT_WORKFLOW_ENFORCED",
    "HUMAN_PROFESSIONAL_REVIEW_ENFORCED",
    "DOCS_ONLY",
    "UNKNOWN_NOT_EVIDENCED",
    "COMPARISON_EVIDENCE_ONLY",
    "NOT_APPLICABLE_AUTHORIZATION_MODEL",
  ]);
});

test("data-handling unknowns, reproducibility limits, and blockers appear", () => {
  assertIncludesAll([
    "retention remains unresolved/not evidenced",
    "deletion remains unresolved/not evidenced",
    "encryption remains unresolved/not evidenced",
    "audit logs remain unresolved/not evidenced",
    "role permissions remain unresolved/not evidenced",
    "raw-material routing remains unresolved/not evidenced",
    "third-party model/API status remains unresolved/not evidenced",
    "access control beyond documented route/case behavior remains unresolved/not evidenced",
    "Manifest/hash/ZIP/canonical validation remain integrity/reproducibility only, not truth/legal/clinical/evidentiary proof.",
    "DOCS_ONLY mistaken for runtime enforcement",
    "test evidence mistaken for total non-bypassability",
    "integrity evidence mistaken for proof",
    "source-completeness/perfect-recall claims",
    "real private run",
    "raw/source inspection",
    "metadata acquisition",
    "manifest instance",
    "actual matrix",
    "validator dispatch",
    "external-use readiness",
    "product-candidate selection",
  ]);
});

test("prior boundary references appear and are not bypassed", () => {
  assertIncludesAll([
    "This dry-run report references and does not bypass:",
    "TECHNICAL_GOVERNANCE_EVIDENCE_REVIEW_AGENT_BOUNDARY",
    "TECHNICAL_VERIFICATION_APPENDIX_GOVERNANCE_ENFORCEMENT_EVIDENCE",
    "EXCLUDED_PRIVATE_REVIEW_ARTIFACT",
    "PRIVATE_LARGE_SOURCE_RUN_READINESS_BOUNDARY",
    "LOCAL_REAL_PRIVATE_RUN_MANUAL_DECISION_RECORD",
    "DATA_HANDLING_AND_PRIVATE_PILOT_READINESS_BOUNDARY",
    "TRAUMA_MINIMIZING_LAYERED_SOURCE_NAVIGATION_BOUNDARY",
    "NO_RAW_METADATA_MANIFEST_VALIDATOR_DISPATCH_READINESS_BOUNDARY",
    "NO_RAW_METADATA_MANIFEST_INSTANCE_READINESS_BOUNDARY",
    "NO_RAW_METADATA_MANIFEST_ACTIVE_METADATA_ACQUISITION_PATH_READINESS_BOUNDARY",
    "These prior boundaries remain active constraints.",
  ]);
});

test("explicit non-authorizations appear", () => {
  const nonAuthorizations = sectionBetween(
    "## Explicit Non-Authorizations",
    "## No-Reopening Rules",
  );

  for (const entry of [
    "no real private run",
    "no actual 1.8 GB source processing",
    "no raw source inspection",
    "no raw message review",
    "no PDF/image/screenshot/metadata/source package inspection",
    "no raw/private material routing",
    "no third-party model/API routing authorization",
    "no metadata acquisition",
    "no metadata acquisition contract",
    "no deterministic preprocessor",
    "no reviewed chunk ledger",
    "no manual attestation workflow",
    "no other no-raw mechanism",
    "no manifest instance",
    "no test fixture instance",
    "no manifest population",
    "no actual source review matrix",
    "no validator dispatch",
    "no registry/lookup/generic dispatch",
    "no runtime/API behavior",
    "no external-use readiness",
    "no product-candidate selection",
    "no legal, clinical, evidentiary, case-truth, credibility, victim-status, perpetrator-status, offence, ownership, risk, sufficiency, police-report, pleading, diagnosis, trauma-diagnosis, marker finding, external-use, or product-candidate conclusions",
  ]) {
    assert.match(
      nonAuthorizations,
      new RegExp(entry.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"),
    );
  }
});

test("non-proof and no-overclaim rules appear", () => {
  assertIncludesAll([
    "Governance evidence review is not legal/professional verification.",
    "Governance evidence review is not runtime certification.",
    "Governance evidence review is not real private run authorization.",
    "Governance evidence review is not source inspection.",
    "Governance evidence review is not metadata acquisition.",
    "Governance evidence review is not manifest instance creation.",
    "Governance evidence review is not actual matrix creation.",
    "Governance evidence review is not validator dispatch.",
    "Governance evidence review is not runtime/API behavior.",
    "Governance evidence review is not external-use readiness.",
    "Governance evidence review is not product-candidate selection.",
    "Schema/export/validator existence is not run authorization.",
    "Hash/manifest/ZIP validation remains integrity/reproducibility only, not truth/legal/clinical/evidentiary proof.",
    "Red-team/test evidence remains tested-scenario evidence only, not runtime certainty or total non-bypassability.",
    "Trace-coverage goal is not perfect recall proof.",
    "`NOT_SEARCHED_BY_SCOPE` must not become a negative finding.",
    "False-negative risk must be disclosed where applicable.",
    "Source completeness is not proven unless separately evidenced.",
    "Human/professional review remains release gate.",
  ]);
});

test("no-reopening rules appear", () => {
  assertIncludesAll([
    "This report must not reopen:",
    "SWE bodelning",
    "DK psykisk vold offence modelling",
    "SWE psykiskt våld legal modelling",
    "Nordic comparison",
    "runtime behavior",
    "API behavior",
    "package implementation behavior",
    "validator dispatch",
    "registry/lookup/generic dispatch",
    "product-candidate selection",
    "external-use readiness",
    "real large-source private run",
    "actual 1.8 GB source processing",
    "raw source inspection",
    "PDF/image/metadata/source inspection",
    "PDF packet generation",
    "archive/ZIP generation",
    "actual source review matrix creation",
    "metadata acquisition",
    "metadata acquisition contract",
    "deterministic preprocessor",
    "reviewed chunk ledger",
    "manual attestation workflow",
    "other no-raw mechanism",
    "manifest instance creation",
    "manifest population",
    "test fixture instance creation",
    "legal/professional verification authority",
    "runtime certification authority",
  ]);
});

test("proof text contains no raw/private/source material except blocked categories", () => {
  assert.doesNotMatch(docsText, /\/Users\//);
  assert.doesNotMatch(docsText, /https?:\/\//);
  assert.doesNotMatch(docsText, /\bpage\s+\d+\b/i);
  assert.doesNotMatch(docsText, /\bsource locator:/i);
  assert.doesNotMatch(docsText, /\blegal conclusion:/i);
  assert.doesNotMatch(docsText, /\bclinical conclusion:/i);
  assert.doesNotMatch(docsText, /\bevidentiary conclusion:/i);
});

test("PDF packet and archive wording is not authorization", () => {
  assertIncludesAll([
    "This report is not a PDF packet.",
    "This report is not an archive or ZIP packet.",
    "The generated PDF draft remains comparison/input only and is not repo evidence.",
    "The dry-run did not inspect raw source material, PDF/image/metadata/source packages, generated PDFs, archives, ZIPs, or local handoff/context files as product evidence.",
  ]);
  assert.doesNotMatch(docsText, /\bPDF packet created\b/i);
  assert.doesNotMatch(docsText, /\barchive\/ZIP created\b/i);
});
