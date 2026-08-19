const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.join(__dirname, "..");
const docsPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_NO_RAW_METADATA_MANIFEST_CONTRACT_BOUNDARY_v1.md",
);

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function assertIncludesAll(text, entries) {
  for (const entry of entries) {
    assert.match(text, new RegExp(entry.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"));
  }
}

function sectionBetween(text, startHeading, endHeading) {
  const start = text.indexOf(startHeading);
  assert.notEqual(start, -1, `missing start heading: ${startHeading}`);
  const end = text.indexOf(endHeading, start + startHeading.length);
  assert.notEqual(end, -1, `missing end heading: ${endHeading}`);
  return text.slice(start, end);
}

test("no-raw metadata manifest contract boundary exists and is DOCS_ONLY", () => {
  assert.equal(fs.existsSync(docsPath), true);

  const docsText = readText(docsPath);

  assert.match(docsText, /# No-Raw Metadata Manifest Contract Boundary/);
  assert.match(docsText, /Boundary name: `NO_RAW_METADATA_MANIFEST_CONTRACT_BOUNDARY`/);
  assert.match(docsText, /Status: `DOCS_ONLY`/);
  assert.match(docsText, /no-raw metadata manifest contract/i);
});

test("boundary defines only a contract and does not authorize acquisition or processing", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "This boundary defines a no-raw metadata manifest contract only.",
    "It does not create a manifest instance.",
    "It does not populate manifest data.",
    "It does not acquire metadata.",
    "It does not create a real source review matrix.",
    "It does not create an evidence/proof matrix.",
    "It does not authorize actual private source processing.",
    "It does not authorize raw text review.",
    "It does not authorize PDF/image/metadata/source package inspection.",
    "It does not authorize a real large-source private run.",
    "It does not authorize external-use readiness.",
    "It does not select a product candidate.",
    "Product candidate remains none.",
    "It does not infer per-chunk metadata.",
    "It does not bypass `ACTUAL_CHUNK_METADATA_AVAILABILITY_GAP_BOUNDARY`.",
    "It does not bypass `SAFE_METADATA_ACQUISITION_PATH_BOUNDARY`.",
    "This boundary converts the no-raw metadata manifest path from `HYPOTHETICAL_UNTIL_CONTRACTED` to `DOCS_ONLY_CONTRACT_DEFINED`, but not to active metadata acquisition.",
  ]);

  assert.doesNotMatch(docsText, /\/Users\//);
  assert.doesNotMatch(docsText, /https?:\/\//i);
  assert.doesNotMatch(docsText, /\b\d{4}-\d{2}-\d{2}\b/);
});

test("contract status labels are frozen", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "NO_RAW_METADATA_MANIFEST_CONTRACT_DEFINED",
    "DOCS_ONLY_CONTRACT_DEFINED",
    "MANIFEST_INSTANCE_NOT_CREATED",
    "METADATA_NOT_ACQUIRED",
    "ACTUAL_MATRIX_NOT_CREATED",
    "VALIDATION_WITHOUT_CONCLUSION",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "These labels are contract labels only.",
  ]);
});

test("allowed manifest fields and chunk identifiers are frozen", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "manifest_id",
    "manifest_version",
    "manifest_contract",
    "manifest_scope",
    "source_layer_status",
    "chunk_id",
    "chunk_period_bucket",
    "chunk_availability_status",
    "sanitized_row_count_status",
    "sanitized_marker_count_status",
    "readiness_status",
    "privacy_blocker_status",
    "counter_context_status",
    "unresolved_pointer_status",
    "human_professional_review_status",
    "validation_without_conclusion_status",
    "manifest_integrity_status",
    "manifest_provenance_status",
    "metadata_acquisition_path_status",
    "data_handling_unknowns_status",
    "external_use_status",
    "product_candidate_status",
    "chunk_001",
    "chunk_002",
    "chunk_003",
    "chunk_004",
    "chunk_005",
    "Manifest chunk identifiers are identifiers only.",
  ]);
});

test("allowed value and status examples remain examples only", () => {
  const docsText = readText(docsPath);
  const examplesSection = sectionBetween(
    docsText,
    "## Allowed Field Value / Status Examples",
    "## Blocked Manifest Fields",
  );

  assertIncludesAll(examplesSection, [
    "The following may appear only as allowed status examples, not as actual populated metadata:",
    "TEXT_PRIMARY_CHUNK_ID_ONLY",
    "SANITIZED_PERIOD_BUCKET_ONLY",
    "CHUNK_AVAILABILITY_NOT_EVIDENCED",
    "COUNT_SUMMARY_SAFE_IF_EVIDENCED",
    "COUNT_SUMMARY_NOT_EVIDENCED",
    "MARKER_COUNT_SAFE_IF_EVIDENCED",
    "MARKER_COUNT_NOT_EVIDENCED",
    "NO_RAW_TEXT_INCLUDED",
    "NO_PRIVATE_FACTS_INCLUDED",
    "NO_SOURCE_LOCATOR_INCLUDED",
    "NO_EXACT_DATES_INCLUDED",
    "PDF_IMAGE_METADATA_NOT_OPENED",
    "SOURCE_PACKAGE_NOT_OPENED",
    "VALIDATION_WITHOUT_CONCLUSION",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "PRODUCT_CANDIDATE_NONE",
    "These examples do not activate metadata acquisition.",
    "These examples do not create manifest data.",
  ]);
});

test("blocked manifest fields are explicitly blocked", () => {
  const docsText = readText(docsPath);
  const blockedFieldsSection = sectionBetween(
    docsText,
    "## Blocked Manifest Fields",
    "## Blocked / Must-Not-Use Statuses",
  );

  assertIncludesAll(blockedFieldsSection, [
    "raw_text",
    "raw_excerpt",
    "actual_marker_text",
    "private_fact",
    "exact_date",
    "sensitive_event_date",
    "source_locator",
    "source_filename",
    "private_path",
    "absolute_path",
    "page_reference",
    "url",
    "token",
    "pdf_content",
    "image_content",
    "metadata_content",
    "source_package_content",
    "medical_detail",
    "intimate_detail",
    "child_detail",
    "third_party_detail",
    "legal_conclusion",
    "clinical_conclusion",
    "evidentiary_conclusion",
    "case_truth_claim",
    "credibility_finding",
    "victim_status_conclusion",
    "perpetrator_status_conclusion",
    "offence_finding",
    "ownership_finding",
    "risk_score",
    "sufficiency_score",
    "police_report_language",
    "pleading_language",
    "diagnosis",
    "trauma_diagnosis",
    "marker_finding",
    "external_use_readiness",
    "product_candidate_selection",
  ]);
});

test("blocked statuses appear only in blocked or must-not-use section", () => {
  const docsText = readText(docsPath);
  const blockedSection = sectionBetween(
    docsText,
    "## Blocked / Must-Not-Use Statuses",
    "## Provenance And Integrity Rules",
  );

  const statuses = [
    "MANIFEST_POPULATED_WITH_RAW_TEXT",
    "MANIFEST_POPULATED_WITH_PRIVATE_FACTS",
    "MANIFEST_POPULATED_WITH_EXACT_DATES",
    "MANIFEST_POPULATED_WITH_SOURCE_LOCATORS",
    "MANIFEST_POPULATED_WITH_FILENAMES",
    "MANIFEST_POPULATED_WITH_PAGE_REFERENCES",
    "MANIFEST_POPULATED_WITH_URLS_OR_TOKENS",
    "MANIFEST_POPULATED_WITH_PDF_CONTENT",
    "MANIFEST_POPULATED_WITH_IMAGE_CONTENT",
    "MANIFEST_POPULATED_WITH_METADATA_CONTENT",
    "MANIFEST_POPULATED_WITH_SOURCE_PACKAGE_CONTENT",
    "METADATA_ACQUIRED_BY_INFERENCE",
    "PER_CHUNK_METADATA_INFERRED",
    "COUNT_SUMMARY_INFERRED",
    "MARKER_COUNT_INFERRED",
    "PERIOD_BUCKET_INFERRED",
    "CHUNK_AVAILABILITY_INFERRED",
    "PROOF_FOUND",
    "MARKER_FINDING_CREATED",
    "ABUSE_CONFIRMED",
    "VICTIM_CONFIRMED",
    "PERPETRATOR_CONFIRMED",
    "LEGAL_RELEVANCE_CONFIRMED",
    "EVIDENCE_SUFFICIENT",
    "RISK_SCORE",
    "SUFFICIENCY_SCORE",
    "EXTERNAL_USE_READY",
    "PRODUCT_CANDIDATE_SELECTED",
  ];

  assertIncludesAll(blockedSection, [
    ...statuses,
    "These blocked statuses are listed only as blocked / must-not-use statuses.",
  ]);

  const beforeBlocked = docsText.slice(0, docsText.indexOf("## Blocked / Must-Not-Use Statuses"));
  for (const status of statuses) {
    const wholeStatusPattern = new RegExp(`(^|[^A-Z0-9_])${status}([^A-Z0-9_]|$)`);
    assert.equal(
      wholeStatusPattern.test(beforeBlocked),
      false,
      `${status} appeared before blocked section`,
    );
  }
});

test("provenance integrity and Gate-001 non-proof rules are frozen", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "Manifest integrity supports reproducibility and package integrity only.",
    "Manifest integrity is not proof.",
    "Manifest provenance is not truth proof.",
    "Manifest existence is not source completeness proof.",
    "Manifest field presence is not marker finding.",
    "Manifest counts are not proof.",
    "Manifest counts are not marker findings.",
    "Manifest chunk identifiers are identifiers only.",
    "Manifest period buckets are sanitized buckets only.",
    "Gate-001 row count `20` remains package/process context only.",
    "Gate-001 row count `20` is not per-chunk metadata.",
    "Gate-001 row count `20` is not proof.",
    "No actual matrix may be created until separate approval, active safe acquisition path, and safe metadata evidence exist.",
  ]);
});

test("generation paths remain separate and inactive", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "Manifest generation is not authorized by this slice.",
    "Manual human/professional attestation remains separate and is not activated by this contract.",
    "Deterministic preprocessor output remains separate and is not activated by this contract.",
    "Reviewed chunk ledger remains separate and is not activated by this contract.",
    "Any future manifest instance requires separate approval and proof test.",
    "Any future manifest instance must remain no-raw and validation-without-conclusion.",
  ]);
});

test("forbidden conclusion categories and non-reopening rules are frozen", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "This boundary must not create legal conclusions.",
    "This boundary must not create clinical conclusions.",
    "This boundary must not create evidentiary conclusions.",
    "This boundary must not create case-truth conclusions.",
    "This boundary must not create credibility conclusions.",
    "This boundary must not create victim-status conclusions.",
    "This boundary must not create perpetrator-status conclusions.",
    "This boundary must not create offence conclusions.",
    "This boundary must not create ownership conclusions.",
    "This boundary must not create risk conclusions or scores.",
    "This boundary must not create sufficiency conclusions or scores.",
    "This boundary must not create police-report language.",
    "This boundary must not create pleading language.",
    "This boundary must not create external-use readiness.",
    "This boundary must not create diagnosis or trauma-diagnosis conclusions.",
    "This boundary must not create marker findings.",
    "This boundary must not create product-candidate conclusions.",
    "This boundary does not reopen SWE bodelning.",
    "This boundary does not reopen DK psykisk vold offence modelling.",
    "This boundary does not reopen SWE psykiskt vald legal modelling.",
    "This boundary does not reopen Nordic comparison.",
    "This boundary does not reopen runtime.",
    "This boundary does not reopen schemas.",
    "This boundary does not reopen API.",
    "This boundary does not reopen package implementation.",
    "This boundary does not reopen product-candidate selection.",
    "This boundary does not reopen external-use readiness.",
    "This boundary does not reopen real large-source private run.",
    "This boundary does not reopen PDF/image/metadata/source inspection.",
    "This boundary does not reopen metadata acquisition.",
    "This boundary does not reopen actual source review matrix creation.",
  ]);
});
