const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const docsPath = path.join(
  __dirname,
  "..",
  "docs",
  "DOMAIN_CONTRACTS_GOVERNANCE_DRY_RUN_REPORT_SUPPLEMENTAL_PACKET_COMPONENT_DECISION_BOUNDARY_v1.md",
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

function sectionBetween(startHeading, endHeading) {
  const start = docsText.indexOf(startHeading);
  assert.notEqual(start, -1, `missing start heading: ${startHeading}`);
  const end = docsText.indexOf(endHeading, start + startHeading.length);
  assert.notEqual(end, -1, `missing end heading: ${endHeading}`);
  return docsText.slice(start, end);
}

test("supplemental packet-component decision boundary exists and is DOCS_ONLY", () => {
  assert.equal(fs.existsSync(docsPath), true);
  assertIncludesAll([
    "Boundary name: `GOVERNANCE_DRY_RUN_REPORT_SUPPLEMENTAL_PACKET_COMPONENT_DECISION_BOUNDARY`.",
    "Status: `DOCS_ONLY`.",
    "This boundary is documentation only.",
    "It defines supplemental packet-component decision status only.",
    "packet-component decision layer is now safe to document separately",
  ]);
});

test("decision recording does not approve component addition or delivery", () => {
  assertIncludesAll([
    "It does not approve the dry-run report as a excluded private-review packet component.",
    "It does not add the dry-run report to the existing excluded private-review packet.",
    "It does not create a supplemental packet.",
    "It does not create a supplemental markdown addendum.",
    "It does not update the External Reviewer markdown packet.",
    "It does not update the excluded private-review manifest.",
    "It does not update the excluded private-review TOC.",
    "It does not update the excluded private-review reference index.",
    "It does not prepare delivery to External Reviewer.",
    "It does not send or package anything for External Reviewer.",
    "The dry-run report remains a separate markdown-only, reference-only, excluded private-review artifact unless separately approved later.",
  ]);
});

test("PDF packet archive external-use product and runtime authorizations are blocked", () => {
  assertIncludesAll([
    "It does not create a PDF.",
    "It does not create a PDF packet.",
    "It does not create an archive or ZIP.",
    "It does not treat the generated PDF draft as repo evidence.",
    "It does not treat the generated PDF draft as a packet component.",
    "It does not authorize external-use readiness.",
    "It does not authorize product-candidate selection.",
    "It does not authorize runtime certification.",
    "It does not authorize technical sign-off.",
    "It does not authorize runtime/API behavior.",
  ]);
});

test("current decision statuses appear", () => {
  assertIncludesAll([
    "GOVERNANCE_DRY_RUN_REPORT_SUPPLEMENTAL_PACKET_COMPONENT_DECISION_BOUNDARY",
    "GOVERNANCE_DRY_RUN_REPORT_PACKET_COMPONENT_DECISION_RECORDED",
    "GOVERNANCE_DRY_RUN_REPORT_PACKET_COMPONENT_NOT_APPROVED",
    "GOVERNANCE_DRY_RUN_REPORT_DIRECT_PACKET_ADDITION_BLOCKED",
    "GOVERNANCE_DRY_RUN_REPORT_REMAINS_SEPARATE_REFERENCE_ONLY_CANDIDATE",
    "GOVERNANCE_DRY_RUN_REPORT_SUPPLEMENTAL_ADDENDUM_NOT_CREATED",
    "GOVERNANCE_DRY_RUN_REPORT_DELIVERY_NOT_AUTHORIZED",
    "SUPPLEMENTAL_PRIVATE_REVIEW_ARTIFACT_EXCLUDED",
    "EXISTING_EXTERNAL_REVIEWER_PACKET_BOUNDARIES_DO_NOT_ALLOW_DIRECT_ADDITION",
    "EXTERNAL_REVIEWER_PACKET_MANIFEST_TOC_REFERENCE_INDEX_UPDATE_NOT_AUTHORIZED",
    "GENERATED_PDF_EXCLUDED_FROM_REPO_EVIDENCE_AND_PACKET_COMPONENTS",
  ]);
});

test("future options are present only as not-yet-authorized options", () => {
  const optionSection = sectionBetween(
    "## Future Option Classifications",
    "## Prerequisites Before Any Future Component Approval",
  );

  assert.match(optionSection, /not-yet-authorized options/i);
  assertIncludesAll([
    "OPTION_ADD_AS_SUPPLEMENTAL_COMPONENT_NOT_APPROVED",
    "OPTION_KEEP_SEPARATE_REFERENCE_ONLY_ARTIFACT_CURRENT_POSTURE",
    "OPTION_PREPARE_SEPARATE_MARKDOWN_ADDENDUM_NOT_CREATED",
    "OPTION_KEEP_BLOCKED_CURRENTLY_ACTIVE",
    "No option listed here approves a packet component, creates an addendum, prepares delivery, or changes the existing excluded private-review packet.",
  ], optionSection);
});

test("future component approval prerequisites appear", () => {
  assertIncludesAll([
    "EXPLICIT_PACKET_COMPONENT_APPROVAL_REQUIRED",
    "SUPPLEMENTAL_BOUNDARY_REQUIRED",
    "EXTERNAL_REVIEWER_PACKET_MANIFEST_UPDATE_REQUIRED_IF_COMPONENT_IS_ADDED",
    "EXTERNAL_REVIEWER_PACKET_TOC_UPDATE_REQUIRED_IF_COMPONENT_IS_ADDED",
    "EXTERNAL_REVIEWER_REFERENCE_INDEX_UPDATE_REQUIRED_IF_COMPONENT_IS_ADDED",
    "SUPPLEMENTAL_MARKDOWN_ADDENDUM_REQUIRED_IF_DELIVERY_IS_PROPOSED",
    "PROOF_TEST_REQUIRED_BEFORE_COMPONENT_APPROVAL",
    "NO_RAW_OUTPUT_PRESERVED",
    "NO_PRIVATE_FACTS_INCLUDED",
    "NO_SOURCE_LOCATORS_INCLUDED",
    "NO_LEGAL_CLINICAL_EVIDENTIARY_CONCLUSIONS",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "PRODUCT_CANDIDATE_NONE",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "These prerequisites do not approve component use.",
  ]);
});

test("component approval risks appear", () => {
  assertIncludesAll([
    "IMPLIED_DELIVERY_RISK",
    "IMPLIED_TECHNICAL_SIGN_OFF_RISK",
    "IMPLIED_EXTERNAL_USE_READINESS_RISK",
    "IMPLIED_RUNTIME_CERTIFICATION_RISK",
    "IMPLIED_EXTERNAL_REVIEWER_APPROVAL_RISK",
    "IMPLIED_PACKET_COMPLETENESS_RISK",
    "Risk listing is not approval, certification, delivery, or verification.",
  ]);
});

test("blocked actions appear only as blocked or must-not-use language", () => {
  const blockedSection = sectionBetween(
    "## Blocked / Must-Not-Use Actions And Statuses",
    "## Prior Boundaries Not Bypassed",
  );

  assert.match(blockedSection, /listed only as blocked \/ must-not-use language/i);
  assert.match(blockedSection, /must not be emitted as active findings/i);

  assertIncludesAll([
    "PACKET_COMPONENT_APPROVED",
    "DIRECT_PACKET_ADDITION_APPROVED",
    "SUPPLEMENTAL_PACKET_CREATED",
    "SUPPLEMENTAL_MARKDOWN_ADDENDUM_CREATED",
    "EXTERNAL_REVIEWER_PACKET_MARKDOWN_UPDATED",
    "EXTERNAL_REVIEWER_PACKET_MANIFEST_UPDATED",
    "EXTERNAL_REVIEWER_PACKET_TOC_UPDATED",
    "EXTERNAL_REVIEWER_REFERENCE_INDEX_UPDATED",
    "DELIVERY_TO_EXTERNAL_REVIEWER_PREPARED",
    "MATERIAL_SENT_TO_EXTERNAL_REVIEWER",
    "PDF_CREATED",
    "PDF_PACKET_CREATED",
    "ARCHIVE_ZIP_CREATED",
    "GENERATED_PDF_TREATED_AS_REPO_EVIDENCE",
    "GENERATED_PDF_TREATED_AS_PACKET_COMPONENT",
    "EXTERNAL_USE_READY",
    "PRODUCT_CANDIDATE_SELECTED",
    "RUNTIME_CERTIFICATION_CLAIMED",
    "TECHNICAL_SIGN_OFF_CLAIMED",
    "LEGAL_PROFESSIONAL_VERIFICATION_CLAIMED",
    "CLINICAL_REVIEW_CLAIMED",
    "EVIDENTIARY_PROOF_CLAIMED",
    "EXTERNAL_REVIEWER_APPROVAL_CLAIMED",
    "PACKET_COMPLETENESS_CLAIMED",
    "REAL_PRIVATE_RUN_STARTED",
    "SOURCE_INSPECTION_STARTED",
    "METADATA_ACQUIRED",
    "MANIFEST_INSTANCE_CREATED",
    "ACTUAL_MATRIX_CREATED",
    "VALIDATOR_DISPATCH_CREATED",
    "RUNTIME_API_BEHAVIOR_CREATED",
    "RAW_SOURCE_MATERIAL_INCLUDED",
    "PRIVATE_FACTS_INCLUDED",
    "SOURCE_LOCATORS_INCLUDED",
    "CASE_TRUTH_CLAIM_CREATED",
    "LEGAL_RELEVANCE_CONFIRMED",
    "CLINICAL_CONCLUSION_CREATED",
    "EVIDENCE_SUFFICIENT",
    "RISK_SCORE",
    "SUFFICIENCY_SCORE",
    "MARKER_FINDING_CREATED",
  ], blockedSection);
});

test("prior boundary references appear and are not bypassed", () => {
  assertIncludesAll([
    "This boundary references and does not bypass:",
    "EXCLUDED_PRIVATE_REVIEW_ARTIFACT",
    "TECHNICAL_GOVERNANCE_EVIDENCE_REVIEW_AGENT_DRY_RUN_REPORT",
    "TECHNICAL_GOVERNANCE_EVIDENCE_REVIEW_AGENT_BOUNDARY",
    "EXCLUDED_PRIVATE_REVIEW_ARTIFACT",
    "EXCLUDED_PRIVATE_REVIEW_ARTIFACT",
    "EXCLUDED_PRIVATE_REVIEW_ARTIFACT",
    "EXCLUDED_PRIVATE_REVIEW_ARTIFACT",
    "TECHNICAL_VERIFICATION_APPENDIX_GOVERNANCE_ENFORCEMENT_EVIDENCE",
    "PRIVATE_LARGE_SOURCE_RUN_READINESS_BOUNDARY",
    "LOCAL_REAL_PRIVATE_RUN_MANUAL_DECISION_RECORD",
    "DATA_HANDLING_AND_PRIVATE_PILOT_READINESS_BOUNDARY",
    "TRAUMA_MINIMIZING_LAYERED_SOURCE_NAVIGATION_BOUNDARY",
    "The existing excluded private-review packet markdown, manifest, TOC, and reference index remain unchanged.",
    "The existing excluded private-review packet boundaries do not allow direct addition of the dry-run report.",
    "No packet component is approved by this boundary.",
    "No delivery to External Reviewer is authorized by this boundary.",
  ]);
});

test("non-proof and no-overclaim rules appear", () => {
  assertIncludesAll([
    "Packet-component decision recording is not packet-component approval.",
    "Packet-component decision recording is not direct packet addition.",
    "Packet-component decision recording is not manifest update.",
    "Packet-component decision recording is not TOC update.",
    "Packet-component decision recording is not reference-index update.",
    "Packet-component decision recording is not supplemental delivery.",
    "Packet-component decision recording is not sending material to External Reviewer.",
    "Packet-component decision recording is not runtime certification.",
    "Packet-component decision recording is not technical sign-off.",
    "Packet-component decision recording is not External Reviewer approval.",
    "Packet-component decision recording is not legal/professional verification.",
    "Packet-component decision recording is not external-use readiness.",
    "Packet-component decision recording is not product-candidate selection.",
    "Dry-run report existence is not packet-component approval.",
    "Dry-run report existence is not External Reviewer approval.",
    "Dry-run report existence is not runtime proof.",
    "Dry-run report existence is not source inspection.",
    "Dry-run report existence is not metadata acquisition.",
    "Dry-run report existence is not manifest instance creation.",
    "Dry-run report existence is not actual matrix creation.",
    "Generated PDF existence is not repo evidence.",
    "Generated PDF existence is not packet evidence.",
    "Hash/manifest/ZIP validation remains integrity/reproducibility only, not truth/legal/clinical/evidentiary proof.",
    "Test evidence remains tested-scenario evidence only, not runtime certainty or total non-bypassability.",
    "Human/professional review remains release gate.",
  ]);
});

test("no-reopening rules appear", () => {
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
    "legal/professional verification authority",
    "runtime certification authority",
    "supplemental packet creation",
    "supplemental markdown addendum creation",
    "excluded private-review packet markdown update",
    "excluded private-review packet manifest update",
    "excluded private-review packet TOC update",
    "excluded private-review reference index update",
    "material delivery to External Reviewer",
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

test("approval delivery PDF packet archive external-use and product authorization are not created", () => {
  assert.doesNotMatch(docsText, /\bpacket component approved\b/i);
  assert.doesNotMatch(docsText, /\bdirect packet addition approved\b/i);
  assert.doesNotMatch(docsText, /\bsupplemental addendum created\b/i);
  assert.doesNotMatch(docsText, /\bdelivery to External Reviewer prepared\b/i);
  assert.doesNotMatch(docsText, /\bPDF packet created\b/i);
  assert.doesNotMatch(docsText, /\barchive\/ZIP created\b/i);
  assert.doesNotMatch(docsText, /\bexternal-use ready\b/i);
  assert.doesNotMatch(docsText, /\bproduct candidate selected\b/i);
});
