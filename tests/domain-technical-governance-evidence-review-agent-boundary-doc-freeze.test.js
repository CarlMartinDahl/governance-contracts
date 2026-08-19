const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const docsPath = path.join(
  __dirname,
  "..",
  "docs",
  "DOMAIN_CONTRACTS_TECHNICAL_GOVERNANCE_EVIDENCE_REVIEW_AGENT_BOUNDARY_v1.md",
);
const docsText = fs.readFileSync(docsPath, "utf8");

function assertIncludesAll(entries) {
  for (const entry of entries) {
    assert.match(docsText, new RegExp(entry.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"));
  }
}

function sectionBetween(startHeading, endHeading) {
  const start = docsText.indexOf(startHeading);
  assert.notEqual(start, -1, `missing start heading: ${startHeading}`);
  const end = docsText.indexOf(endHeading, start + startHeading.length);
  assert.notEqual(end, -1, `missing end heading: ${endHeading}`);
  return docsText.slice(start, end);
}

test("technical governance evidence review agent boundary exists and is DOCS_ONLY", () => {
  assert.equal(fs.existsSync(docsPath), true);
  assert.match(
    docsText,
    /Boundary name: `TECHNICAL_GOVERNANCE_EVIDENCE_REVIEW_AGENT_BOUNDARY`/,
  );
  assert.match(docsText, /Agent name: `TECHNICAL_GOVERNANCE_EVIDENCE_REVIEW_AGENT`/);
  assert.match(docsText, /Status: `DOCS_ONLY`/);
  assert.match(docsText, /technical-governance-evidence-review-agent-only/i);
});

test("agent role is bounded defensive governance evidence review only", () => {
  assertIncludesAll([
    "The agent is a bounded, authorized, defensive governance-evidence reviewer.",
    "The agent reviews repo-level governance evidence only.",
    "The agent is not a feature builder.",
    "The agent is not a Control Tower.",
    "The agent is not a legal reviewer.",
    "The agent is not a clinical reviewer.",
    "The agent is not an evidentiary fact-finder.",
    "The agent is not a runtime certification authority.",
    "The agent is not an external-use approver.",
    "The agent is not a product-candidate selector.",
  ]);
});

test("generated PDF draft is comparison input only and future artifact is markdown plus proof test", () => {
  assertIncludesAll([
    "The generated PDF draft named `Governance Verification Review Agent v1` is comparison/input only, not committed repo evidence.",
    "The generated PDF draft is not a packet component.",
    "The future repo artifact is markdown plus proof test, not PDF.",
    "It does not create a PDF packet.",
    "It does not create an archive or ZIP packet.",
    "It does not add a generated PDF to repo evidence.",
  ]);
});

test("allowed review scope appears", () => {
  assertIncludesAll([
    "docs",
    "tests",
    "schemas",
    "package export surfaces",
    "validator surfaces",
    "approved technical review packets",
    "Technical Verification Appendix",
    "committed domain/governance boundaries",
    "proof tests",
    "evidence-level classification",
    "runtime/schema/workflow/human/DOCS_ONLY/unknown separation",
    "no-raw/no-private/no-source-locator posture",
    "no-conclusion posture",
    "human/professional review gate preservation",
    "integrity-vs-truth separation",
    "tested-scenario evidence vs runtime-certainty separation",
    "unresolved data-handling questions",
    "source-completeness and false-negative limits",
    "failure modes",
    "threat model scaffolds",
    "reproducibility/package-integrity evidence",
    "overclaim risks",
    "blockers/gaps",
    "recommended smallest safe next step",
  ]);
});

test("evidence categories appear", () => {
  assertIncludesAll([
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

test("required review output sections appear", () => {
  assertIncludesAll([
    "scope reviewed",
    "evidence inventory with repo-relative paths and line references",
    "implemented-vs-DOCS_ONLY matrix",
    "test evidence matrix",
    "sanitized no-raw posture check",
    "failure-mode register",
    "threat model review",
    "data-handling unknowns / not-evidenced items",
    "reproducibility / package-integrity evidence",
    "overclaim risks",
    "blockers / gaps",
    "recommended smallest safe next step",
    "explicit non-authorizations",
  ]);
});

test("forbidden actions and non-authorizations appear only as blocked language", () => {
  const blockedSection = sectionBetween(
    "## Blocked / Must-Not-Use Actions And Statuses",
    "## Non-Proof And No-Overclaim Rules",
  );

  for (const status of [
    "RAW_SOURCE_MATERIAL_INSPECTED",
    "PRIVATE_FACTS_INSPECTED",
    "SOURCE_LOCATORS_EMITTED",
    "PDF_IMAGE_METADATA_SOURCE_PACKAGE_INSPECTED",
    "REAL_PRIVATE_RUN_STARTED",
    "ACTUAL_1_8_GB_SOURCE_PROCESSING_STARTED",
    "METADATA_ACQUIRED",
    "MANIFEST_INSTANCE_CREATED",
    "TEST_FIXTURE_TREATED_AS_MANIFEST_INSTANCE",
    "ACTUAL_MATRIX_CREATED",
    "VALIDATOR_DISPATCH_CREATED",
    "VALIDATOR_REGISTRY_CREATED",
    "GENERIC_LOOKUP_CREATED",
    "RUNTIME_API_BEHAVIOR_CREATED",
    "PDF_PACKET_CREATED",
    "ARCHIVE_ZIP_CREATED",
    "EXTERNAL_USE_READY",
    "PRODUCT_CANDIDATE_SELECTED",
    "LEGAL_RELEVANCE_CONFIRMED",
    "CLINICAL_CONCLUSION_CREATED",
    "EVIDENCE_SUFFICIENT",
    "CASE_TRUTH_CLAIM_CREATED",
    "CREDIBILITY_FINDING_CREATED",
    "VICTIM_STATUS_CONCLUSION_CREATED",
    "PERPETRATOR_STATUS_CONCLUSION_CREATED",
    "OFFENCE_FINDING_CREATED",
    "OWNERSHIP_FINDING_CREATED",
    "RISK_SCORE",
    "SUFFICIENCY_SCORE",
    "POLICE_REPORT_LANGUAGE_CREATED",
    "PLEADING_LANGUAGE_CREATED",
    "DIAGNOSIS_CREATED",
    "TRAUMA_DIAGNOSIS_CREATED",
    "MARKER_FINDING_CREATED",
    "PERFECT_RECALL_CLAIMED",
    "PERFECT_DETECTION_CLAIMED",
    "SOURCE_COMPLETENESS_PROOF_CREATED",
    "RUNTIME_CERTAINTY_CLAIMED",
    "HASH_MANIFEST_ZIP_TREATED_AS_TRUTH_PROOF",
    "TEST_EVIDENCE_TREATED_AS_TOTAL_NON_BYPASSABILITY_PROOF",
  ]) {
    assert.match(blockedSection, new RegExp(status));
  }

  assert.match(blockedSection, /listed only as blocked \/ must-not-use language/i);
  assert.match(blockedSection, /must not be emitted as active findings/i);
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

test("prior boundary references appear and are not bypassed", () => {
  assertIncludesAll([
    "This boundary references and does not bypass:",
    "TECHNICAL_VERIFICATION_APPENDIX_GOVERNANCE_ENFORCEMENT_EVIDENCE",
    "EXCLUDED_PRIVATE_REVIEW_ARTIFACT",
    "PRIVATE_LARGE_SOURCE_RUN_READINESS_BOUNDARY",
    "LOCAL_REAL_PRIVATE_RUN_MANUAL_DECISION_RECORD",
    "DATA_HANDLING_AND_PRIVATE_PILOT_READINESS_BOUNDARY",
    "TRAUMA_MINIMIZING_LAYERED_SOURCE_NAVIGATION_BOUNDARY",
    "NO_RAW_METADATA_MANIFEST_VALIDATOR_DISPATCH_READINESS_BOUNDARY",
    "NO_RAW_METADATA_MANIFEST_INSTANCE_READINESS_BOUNDARY",
    "NO_RAW_METADATA_MANIFEST_ACTIVE_METADATA_ACQUISITION_PATH_READINESS_BOUNDARY",
    "These boundaries remain active constraints.",
  ]);
});

test("non-reopening rules appear", () => {
  assertIncludesAll([
    "This boundary does not reopen:",
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
  ]);
});

test("proof text contains no raw private source locator or conclusion material except blocked categories", () => {
  assert.doesNotMatch(docsText, /\/Users\//);
  assert.doesNotMatch(docsText, /https?:\/\//);
  assert.doesNotMatch(docsText, /\bpage\s+\d+\b/i);
  assert.doesNotMatch(docsText, /\bsource locator:/i);
  assert.doesNotMatch(docsText, /\blegal conclusion:/i);
  assert.doesNotMatch(docsText, /\bclinical conclusion:/i);
  assert.doesNotMatch(docsText, /\bevidentiary conclusion:/i);
});
