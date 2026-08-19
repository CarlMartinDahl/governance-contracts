const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const docsPath = path.join(
  __dirname,
  "..",
  "docs",
  "DOMAIN_CONTRACTS_NO_RAW_METADATA_MANIFEST_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
);
const docsText = fs.readFileSync(docsPath, "utf8");

function assertIncludesAll(values) {
  for (const value of values) {
    assert.match(docsText, new RegExp(value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
}

test("schema scaffold scope boundary exists and is DOCS_ONLY", () => {
  assert.equal(fs.existsSync(docsPath), true);
  assert.match(
    docsText,
    /Boundary name: `NO_RAW_METADATA_MANIFEST_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY`/,
  );
  assert.match(docsText, /Status: `DOCS_ONLY`/);
  assert.match(docsText, /future schema scaffold scope only/i);
  assert.match(docsText, /schema-scaffold-scope-only/i);
});

test("boundary blocks schema, export, validator, dispatch, manifest, metadata, matrix, and source activity", () => {
  assertIncludesAll([
    "It does not create a schema file.",
    "It does not create a schema export.",
    "It does not change validator dispatch.",
    "It does not create a validator.",
    "It does not create a manifest instance.",
    "It does not populate manifest data.",
    "It does not acquire metadata.",
    "It does not create a real source review matrix.",
    "It does not create an evidence/proof matrix.",
    "It does not authorize raw text review.",
    "It does not authorize PDF/image/metadata/source package inspection.",
    "It does not authorize a real large-source private run.",
    "It does not authorize external-use readiness.",
    "Product candidate remains none.",
    "It does not infer per-chunk metadata.",
    "It does not bypass `ACTUAL_CHUNK_METADATA_AVAILABILITY_GAP_BOUNDARY`.",
    "It does not bypass `SAFE_METADATA_ACQUISITION_PATH_BOUNDARY`.",
    "It does not bypass `NO_RAW_METADATA_MANIFEST_CONTRACT_BOUNDARY`.",
    "It does not bypass `NO_RAW_METADATA_MANIFEST_SCHEMA_READINESS_BOUNDARY`.",
  ]);
});

test("required scope status labels appear", () => {
  assertIncludesAll([
    "NO_RAW_METADATA_MANIFEST_SCHEMA_SCAFFOLD_SCOPE_DEFINED",
    "DOCS_ONLY_SCOPE_DEFINED",
    "SCHEMA_FILE_NOT_CREATED",
    "SCHEMA_EXPORT_NOT_CREATED",
    "VALIDATOR_NOT_CREATED",
    "VALIDATOR_DISPATCH_NOT_CHANGED",
    "MANIFEST_INSTANCE_NOT_CREATED",
    "METADATA_NOT_ACQUIRED",
    "ACTUAL_MATRIX_NOT_CREATED",
    "VALIDATION_WITHOUT_CONCLUSION",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
  ]);
});

test("future file-scope classifications appear without creating active scope", () => {
  assertIncludesAll([
    "schemas/no-raw-metadata-manifest.json",
    "FUTURE_CONTRACT_ONLY_CANDIDATE",
    "packages/schemas/src/index.js",
    "FUTURE_CONTRACT_ONLY_CANDIDATE_IF_EXPLICITLY_SCOPED",
    "OUT_OF_SCOPE_UNLESS_PERSISTED_OR_DISPATCH_SURFACE_APPROVED",
    "tests/no-raw-metadata-manifest-schema.test.js",
    "FUTURE_CONTRACT_ONLY_PROOF_TEST_CANDIDATE",
    "CURRENT_DOCS_ONLY_SCOPE_CONTROL",
    "not created by this slice",
    "not changed by this slice",
  ]);
});

test("comparison and reuse classifications appear", () => {
  assertIncludesAll([
    "COMPARISON_EVIDENCE_ONLY",
    "NOT_AUTHORIZATION_MODEL_FOR_NO_RAW_METADATA_MANIFEST",
    "DIRECTLY_REUSABLE_PATTERN_FOR_LATER_CONTRACT_ONLY",
    "COMPARISON_EVIDENCE_ONLY_UNLESS_DISPATCH_SURFACE_APPROVED",
    "DOCS_ONLY_SOURCE_OF_TRUTH_FOR_FUTURE_SCHEMA_FIELDS",
    "DOCS_ONLY_SOURCE_OF_TRUTH_FOR_FUTURE_SCHEMA_LIMITS",
  ]);
});

test("future allowed-field scope appears", () => {
  assertIncludesAll([
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
  ]);
});

test("future blocked-field scope appears", () => {
  assertIncludesAll([
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

test("future enum and blocked status scopes appear as candidate or blocked scope", () => {
  assertIncludesAll([
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
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "PRODUCT_CANDIDATE_NONE",
  ]);

  assertIncludesAll([
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
    "These blocked statuses are listed only as blocked / must-not-use scope.",
  ]);
});

test("future schema proof expectations and non-authorization limits appear", () => {
  assertIncludesAll([
    "allowed fields only",
    "blocked fields absent/rejected",
    "allowed enum/status candidates only",
    "blocked statuses absent/rejected",
    "additionalProperties: false",
    "no raw/private/source-locator/date/PDF/image/metadata/source-package fields",
    "validation without conclusion",
    "manifest integrity/provenance not proof",
    "manifest existence not source completeness proof",
    "Gate-001 row count `20` remains package/process context only, not per-chunk metadata and not proof",
    "no manifest instance creation",
    "no manifest population",
    "no metadata acquisition",
    "no actual matrix creation",
    "no runtime/API behavior",
    "Scaffold scope is not scaffold creation.",
    "Scaffold scope is not schema creation.",
    "Scaffold scope is not runtime enforcement.",
    "Scaffold scope is not metadata acquisition.",
    "Scaffold scope is not manifest population.",
    "Scaffold scope is not actual matrix creation.",
    "Scaffold scope is not source completeness proof.",
    "Scaffold scope is not truth proof.",
    "Scaffold scope is not legal/clinical/evidentiary proof.",
    "Scaffold scope is not external-use readiness.",
    "Scaffold scope is not product-candidate selection.",
    "Gate-001 row count `20` is not per-chunk metadata.",
    "Gate-001 row count `20` is not proof.",
  ]);
});

test("forbidden conclusions and reopening remain blocked", () => {
  assertIncludesAll([
    "legal conclusion",
    "clinical conclusion",
    "evidentiary conclusion",
    "case-truth conclusion",
    "credibility conclusion",
    "victim-status conclusion",
    "perpetrator-status conclusion",
    "offence conclusion",
    "ownership finding",
    "risk scoring",
    "sufficiency scoring",
    "police-report text",
    "pleading text",
    "external-use conclusion",
    "diagnosis",
    "trauma-diagnosis",
    "marker finding",
    "product-candidate conclusion",
    "`SWE_BODELNING`",
    "`DK_PSYKISK_VOLD` offence modelling",
    "`SWE_PSYKISKT_VALD` legal modelling",
    "Nordic comparison",
    "runtime",
    "schemas",
    "schema exports",
    "validator dispatch",
    "API",
    "package implementation",
    "real large-source private run",
    "PDF/image/metadata/source inspection",
    "metadata acquisition",
    "manifest instance creation",
    "manifest population",
    "actual source review matrix creation",
  ]);
});
