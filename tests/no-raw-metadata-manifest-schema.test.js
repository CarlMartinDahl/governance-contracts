const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const schemaPath = path.join(__dirname, "..", "schemas", "no-raw-metadata-manifest.json");
const schema = require(schemaPath);

const requiredFields = [
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
];

const allowedChunkIds = ["chunk_001", "chunk_002", "chunk_003", "chunk_004", "chunk_005"];

const allowedStatusValues = [
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
];

const blockedFields = [
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
];

const blockedStatuses = [
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

function schemaValues(value) {
  if (!value || typeof value !== "object") {
    return [];
  }

  const directValues = [
    ...(typeof value.const === "string" ? [value.const] : []),
    ...(Array.isArray(value.enum) ? value.enum : []),
  ];

  return [
    ...directValues,
    ...Object.values(value).flatMap((entry) =>
      typeof entry === "object" && entry !== null ? schemaValues(entry) : [],
    ),
  ];
}

function validateAgainstSchema(payload) {
  const actualKeys = Object.keys(payload);

  if (schema.additionalProperties === false) {
    const unexpectedKey = actualKeys.find((key) => !schema.required.includes(key));
    if (unexpectedKey) {
      return false;
    }
  }

  for (const field of schema.required) {
    if (!Object.hasOwn(payload, field)) {
      return false;
    }
  }

  for (const [field, definition] of Object.entries(schema.properties)) {
    const value = payload[field];

    if (definition.type === "string" && typeof value !== "string") {
      return false;
    }

    if (definition.minLength && value.length < definition.minLength) {
      return false;
    }

    if (definition.const && value !== definition.const) {
      return false;
    }

    if (definition.enum && !definition.enum.includes(value)) {
      return false;
    }
  }

  return true;
}

function createValidManifest(overrides = {}) {
  return {
    manifest_id: "manifest-contract-scaffold",
    manifest_version: "1",
    manifest_contract: "NO_RAW_METADATA_MANIFEST_CONTRACT_DEFINED",
    manifest_scope: "DOCS_ONLY_CONTRACT_DEFINED",
    source_layer_status: "TEXT_PRIMARY_CHUNK_ID_ONLY",
    chunk_id: "chunk_001",
    chunk_period_bucket: "SANITIZED_PERIOD_BUCKET_ONLY",
    chunk_availability_status: "CHUNK_AVAILABILITY_NOT_EVIDENCED",
    sanitized_row_count_status: "COUNT_SUMMARY_NOT_EVIDENCED",
    sanitized_marker_count_status: "MARKER_COUNT_NOT_EVIDENCED",
    readiness_status: "MANIFEST_INSTANCE_NOT_CREATED",
    privacy_blocker_status: "NO_PRIVATE_FACTS_INCLUDED",
    counter_context_status: "VALIDATION_WITHOUT_CONCLUSION",
    unresolved_pointer_status: "NO_SOURCE_LOCATOR_INCLUDED",
    human_professional_review_status: "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    validation_without_conclusion_status: "VALIDATION_WITHOUT_CONCLUSION",
    manifest_integrity_status: "VALIDATION_WITHOUT_CONCLUSION",
    manifest_provenance_status: "VALIDATION_WITHOUT_CONCLUSION",
    metadata_acquisition_path_status: "METADATA_NOT_ACQUIRED",
    data_handling_unknowns_status: "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    external_use_status: "EXTERNAL_USE_NOT_AUTHORIZED",
    product_candidate_status: "PRODUCT_CANDIDATE_NONE",
    ...overrides,
  };
}

test("schema file exists and identifies the no-raw metadata manifest contract scaffold", () => {
  assert.equal(fs.existsSync(schemaPath), true);
  assert.equal(schema.$id, "https://governance-contracts.invalid/schemas/no-raw-metadata-manifest.json");
  assert.equal(schema.title, "No-Raw Metadata Manifest Contract Scaffold");
  assert.equal(schema.type, "object");
});

test("schema is an exact-key contract scaffold with required no-raw manifest fields only", () => {
  assert.equal(schema.additionalProperties, false);
  assert.deepEqual(schema.required, requiredFields);
  assert.deepEqual(Object.keys(schema.properties), requiredFields);
});

test("schema preserves constants and chunk identifier constraints", () => {
  assert.equal(
    schema.properties.manifest_contract.const,
    "NO_RAW_METADATA_MANIFEST_CONTRACT_DEFINED",
  );
  assert.equal(schema.properties.manifest_scope.const, "DOCS_ONLY_CONTRACT_DEFINED");
  assert.equal(
    schema.properties.validation_without_conclusion_status.const,
    "VALIDATION_WITHOUT_CONCLUSION",
  );
  assert.equal(
    schema.properties.human_professional_review_status.const,
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
  );
  assert.equal(schema.properties.external_use_status.const, "EXTERNAL_USE_NOT_AUTHORIZED");
  assert.equal(schema.properties.product_candidate_status.const, "PRODUCT_CANDIDATE_NONE");
  assert.deepEqual(schema.properties.chunk_id.enum, allowedChunkIds);
});

test("allowed status values are present only in const or enum constraints", () => {
  const values = schemaValues(schema);

  for (const status of allowedStatusValues) {
    assert.ok(values.includes(status), `${status} should be represented`);
  }

  assert.equal(validateAgainstSchema(createValidManifest()), true);
});

test("blocked fields are absent from schema properties and rejected by exact-key validation", () => {
  for (const field of blockedFields) {
    assert.equal(Object.hasOwn(schema.properties, field), false, `${field} should be absent`);
    assert.equal(validateAgainstSchema(createValidManifest({ [field]: "blocked" })), false);
  }
});

test("blocked status values are absent from schema constraints and rejected", () => {
  const values = schemaValues(schema);

  for (const status of blockedStatuses) {
    assert.equal(values.includes(status), false, `${status} should be absent`);
    assert.equal(validateAgainstSchema(createValidManifest({ readiness_status: status })), false);
  }
});

test("raw, private, date, locator, source-package, conclusion, and product fields are rejected", () => {
  for (const field of [
    "raw_text",
    "private_fact",
    "exact_date",
    "source_locator",
    "pdf_content",
    "image_content",
    "metadata_content",
    "source_package_content",
    "legal_conclusion",
    "clinical_conclusion",
    "evidentiary_conclusion",
    "product_candidate_selection",
    "external_use_readiness",
  ]) {
    assert.equal(validateAgainstSchema(createValidManifest({ [field]: "blocked" })), false);
  }
});

test("integrity and provenance remain status fields only and not proof fields", () => {
  assert.deepEqual(schema.properties.manifest_integrity_status.enum, [
    "MANIFEST_INSTANCE_NOT_CREATED",
    "VALIDATION_WITHOUT_CONCLUSION",
  ]);
  assert.deepEqual(schema.properties.manifest_provenance_status.enum, [
    "MANIFEST_INSTANCE_NOT_CREATED",
    "VALIDATION_WITHOUT_CONCLUSION",
  ]);

  for (const blockedProofField of [
    "proof",
    "proof_status",
    "source_completeness_proof",
    "truth_proof",
    "marker_finding",
  ]) {
    assert.equal(Object.hasOwn(schema.properties, blockedProofField), false);
    assert.equal(validateAgainstSchema(createValidManifest({ [blockedProofField]: "blocked" })), false);
  }
});

test("schema does not encode acquisition, instance, population, matrix, runtime, API, dispatch, source inspection, or Gate-001 proof language", () => {
  const schemaText = fs.readFileSync(schemaPath, "utf8");

  for (const forbiddenFragment of [
    "manifest_instance",
    "manifest_population",
    "actual_matrix",
    "runtime",
    "api",
    "validator_dispatch",
    "source_inspection",
    "Gate-001",
    "row count",
    "proof",
  ]) {
    assert.equal(schemaText.includes(forbiddenFragment), false, forbiddenFragment);
  }

  for (const forbiddenSurface of [
    "metadata_acquisition_performed",
    "metadata_acquisition_result",
    "metadata_acquisition_source",
    "manifest_instance_id",
    "manifest_population_status",
    "actual_matrix_id",
    "runtime_behavior",
    "api_behavior",
    "validator_dispatch_status",
    "source_inspection_status",
  ]) {
    assert.equal(Object.hasOwn(schema.properties, forbiddenSurface), false, forbiddenSurface);
  }
});

test("validation without conclusion is preserved", () => {
  assert.equal(validateAgainstSchema(createValidManifest()), true);
  assert.equal(
    validateAgainstSchema(
      createValidManifest({
        validation_without_conclusion_status: "PROOF_FOUND",
      }),
    ),
    false,
  );
});
