const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.join(__dirname, "..");
const docsPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_NO_RAW_METADATA_MANIFEST_SCHEMA_READINESS_BOUNDARY_v1.md",
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

test("no-raw metadata manifest schema-readiness boundary exists and is DOCS_ONLY", () => {
  assert.equal(fs.existsSync(docsPath), true);

  const docsText = readText(docsPath);

  assert.match(docsText, /# No-Raw Metadata Manifest Schema-Readiness Boundary/);
  assert.match(docsText, /Boundary name: `NO_RAW_METADATA_MANIFEST_SCHEMA_READINESS_BOUNDARY`/);
  assert.match(docsText, /Status: `DOCS_ONLY`/);
  assert.match(docsText, /schema-readiness/i);
});

test("boundary is readiness-only and does not authorize schema creation or acquisition", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "This boundary defines schema-readiness only.",
    "It does not create a schema file.",
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
    "It does not bypass `NO_RAW_METADATA_MANIFEST_CONTRACT_BOUNDARY`.",
    "It prepares only for a possible future `CONTRACT_ONLY` schema scaffold if separately approved.",
    "Any future schema scaffold must remain non-acquisitive and validation-without-conclusion.",
    "Any future schema scaffold must not imply manifest instance creation, metadata acquisition, actual matrix creation, external-use readiness, product-candidate selection, or runtime enforcement.",
  ]);

  assert.doesNotMatch(docsText, /\/Users\//);
  assert.doesNotMatch(docsText, /https?:\/\//i);
  assert.doesNotMatch(docsText, /\b\d{4}-\d{2}-\d{2}\b/);
});

test("schema-readiness labels and comparison evidence classifications are frozen", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "NO_RAW_METADATA_MANIFEST_SCHEMA_READINESS_DEFINED",
    "DOCS_ONLY_SCHEMA_READINESS",
    "SCHEMA_FILE_NOT_CREATED",
    "SCHEMA_EXPORT_NOT_CREATED",
    "VALIDATOR_DISPATCH_NOT_CHANGED",
    "MANIFEST_INSTANCE_NOT_CREATED",
    "METADATA_NOT_ACQUIRED",
    "ACTUAL_MATRIX_NOT_CREATED",
    "VALIDATION_WITHOUT_CONCLUSION",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "COMPARISON_EVIDENCE_ONLY",
    "REUSABLE_PATTERN_FOR_LATER_CONTRACT_ONLY",
    "DOCS_ONLY_SOURCE_OF_TRUTH_FOR_FUTURE_SCHEMA_FIELDS",
    "NOT_AUTHORIZATION_MODEL_FOR_NO_RAW_METADATA_MANIFEST",
  ]);
});

test("future schema field candidates from the manifest contract are listed only as candidates", () => {
  const docsText = readText(docsPath);
  const candidatesSection = sectionBetween(
    docsText,
    "## Future Schema Field Candidates",
    "## Future Schema Blocked Fields",
  );

  assertIncludesAll(candidatesSection, [
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
    "These future schema field candidates are not populated by this slice.",
    "They do not evidence that safe per-chunk metadata exists.",
  ]);
});

test("future schema blocked fields remain blocked", () => {
  const docsText = readText(docsPath);
  const blockedFieldsSection = sectionBetween(
    docsText,
    "## Future Schema Blocked Fields",
    "## Future Schema Status / Enum Candidates",
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

test("future schema enum and status candidates remain examples only", () => {
  const docsText = readText(docsPath);
  const enumSection = sectionBetween(
    docsText,
    "## Future Schema Status / Enum Candidates",
    "## Future Schema Blocked / Must-Not-Use Statuses",
  );

  assertIncludesAll(enumSection, [
    "The following may be considered only as future enum or status candidates, not as actual manifest data:",
    "NO_RAW_METADATA_MANIFEST_CONTRACT_DEFINED",
    "DOCS_ONLY_CONTRACT_DEFINED",
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
    "MANIFEST_INSTANCE_NOT_CREATED",
    "METADATA_NOT_ACQUIRED",
    "ACTUAL_MATRIX_NOT_CREATED",
  ]);
});

test("future schema blocked statuses appear only in blocked or must-not-use section", () => {
  const docsText = readText(docsPath);
  const blockedSection = sectionBetween(
    docsText,
    "## Future Schema Blocked / Must-Not-Use Statuses",
    "## Non-Proof And Non-Authorization Limits",
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

  const beforeBlocked = docsText.slice(
    0,
    docsText.indexOf("## Future Schema Blocked / Must-Not-Use Statuses"),
  );
  for (const status of statuses) {
    const wholeStatusPattern = new RegExp(`(^|[^A-Z0-9_])${status}([^A-Z0-9_]|$)`);
    assert.equal(
      wholeStatusPattern.test(beforeBlocked),
      false,
      `${status} appeared before blocked section`,
    );
  }
});

test("schema-readiness non-proof and non-authorization limits are frozen", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "Schema-readiness is not schema creation.",
    "Schema-readiness is not runtime enforcement.",
    "Schema-readiness is not metadata acquisition.",
    "Schema-readiness is not manifest population.",
    "Schema-readiness is not actual matrix creation.",
    "Schema-readiness is not source completeness proof.",
    "Schema-readiness is not truth proof.",
    "Schema-readiness is not legal proof.",
    "Schema-readiness is not clinical proof.",
    "Schema-readiness is not evidentiary proof.",
    "Schema-readiness is not external-use readiness.",
    "Schema-readiness is not product-candidate selection.",
    "Schema-readiness must preserve manifest integrity as package/reproducibility only, not proof.",
    "Schema-readiness must preserve manifest provenance as provenance only, not truth proof.",
    "Schema-readiness must preserve Gate-001 row count `20` as package/process context only.",
    "Gate-001 row count `20` is not per-chunk metadata.",
    "Gate-001 row count `20` is not proof.",
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
    "This boundary does not reopen manifest instance creation.",
    "This boundary does not reopen manifest population.",
    "This boundary does not reopen actual source review matrix creation.",
  ]);
});
