const test = require("node:test");
const assert = require("node:assert/strict");

const {
  noRawMetadataManifest,
  validateNoRawMetadataManifest,
} = require("../packages/schemas/src/index.js");

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

function createSyntheticValidatorFixture(overrides = {}) {
  return {
    manifest_id: "synthetic-test-only",
    manifest_version: "validator-contract-test",
    manifest_contract: "NO_RAW_METADATA_MANIFEST_CONTRACT_DEFINED",
    manifest_scope: "DOCS_ONLY_CONTRACT_DEFINED",
    source_layer_status: "NO_RAW_TEXT_INCLUDED",
    chunk_id: "chunk_001",
    chunk_period_bucket: "NO_EXACT_DATES_INCLUDED",
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
    data_handling_unknowns_status: "VALIDATION_WITHOUT_CONCLUSION",
    external_use_status: "EXTERNAL_USE_NOT_AUTHORIZED",
    product_candidate_status: "PRODUCT_CANDIDATE_NONE",
    ...overrides,
  };
}

function assertInvalidManifestValidation(fn, label) {
  assert.throws(
    fn,
    (error) => error.code === "ERR_NO_RAW_METADATA_MANIFEST_INVALID",
    label,
  );
}

test("exports validator and schema without adding validator dispatch", () => {
  assert.equal(Object.hasOwn(noRawMetadataManifest, "required"), true);
  assert.equal(typeof validateNoRawMetadataManifest, "function");

  const packageSchemas = require("../packages/schemas/src/index.js");

  for (const exportName of [
    "noRawMetadataManifestValidator",
    "getNoRawMetadataManifestValidator",
    "noRawMetadataManifestValidatorRegistry",
  ]) {
    assert.equal(Object.hasOwn(packageSchemas, exportName), false, exportName);
  }
});

test("validates a synthetic no-raw contract fixture without creating manifest behavior", () => {
  const fixture = createSyntheticValidatorFixture();
  const validated = validateNoRawMetadataManifest(fixture);

  assert.equal(validated, fixture);
  assert.equal(validated.validation_without_conclusion_status, "VALIDATION_WITHOUT_CONCLUSION");
  assert.equal(validated.readiness_status, "MANIFEST_INSTANCE_NOT_CREATED");
  assert.equal(validated.metadata_acquisition_path_status, "METADATA_NOT_ACQUIRED");
  assert.equal(validated.product_candidate_status, "PRODUCT_CANDIDATE_NONE");
  assert.equal(validated.external_use_status, "EXTERNAL_USE_NOT_AUTHORIZED");
  assert.equal(Object.hasOwn(validated, "manifest_instance_id"), false);
  assert.equal(Object.hasOwn(validated, "manifest_population_status"), false);
  assert.equal(Object.hasOwn(validated, "metadata_acquisition_result"), false);
  assert.equal(Object.hasOwn(validated, "actual_matrix_id"), false);
  assert.equal(Object.hasOwn(validated, "runtime_behavior"), false);
  assert.equal(Object.hasOwn(validated, "api_behavior"), false);
});

test("rejects non-objects, extra fields, missing fields, and invalid chunk ids", () => {
  assertInvalidManifestValidation(() => validateNoRawMetadataManifest(null));
  assertInvalidManifestValidation(
    () => validateNoRawMetadataManifest(createSyntheticValidatorFixture({ unexpected: "blocked" })),
  );

  const missing = createSyntheticValidatorFixture();
  delete missing.manifest_id;
  assertInvalidManifestValidation(() => validateNoRawMetadataManifest(missing));

  assertInvalidManifestValidation(
    () => validateNoRawMetadataManifest(createSyntheticValidatorFixture({ chunk_id: "chunk_999" })),
  );
});

test("rejects blocked raw, private, source, conclusion, product, and external-use fields", () => {
  for (const blockedField of blockedFields) {
    assertInvalidManifestValidation(
      () => validateNoRawMetadataManifest(
        createSyntheticValidatorFixture({ [blockedField]: "blocked" }),
      ),
      blockedField,
    );
  }
});

test("rejects blocked statuses instead of inferring metadata, proof, or conclusions", () => {
  for (const blockedStatus of blockedStatuses) {
    assertInvalidManifestValidation(
      () => validateNoRawMetadataManifest(
        createSyntheticValidatorFixture({ readiness_status: blockedStatus }),
      ),
      blockedStatus,
    );
  }
});

test("preserves no-row-count-proof, no-runtime, and no-manifest-population boundaries", () => {
  const validated = validateNoRawMetadataManifest(createSyntheticValidatorFixture());
  const serialized = JSON.stringify(validated);

  assert.equal(serialized.includes("20"), false);
  assert.equal(Object.hasOwn(validated, "gate_001_row_count"), false);
  assert.equal(Object.hasOwn(validated, "per_chunk_metadata"), false);
  assert.equal(Object.hasOwn(validated, "proof_status"), false);
  assert.equal(Object.hasOwn(validated, "validator_dispatch"), false);
  assert.equal(Object.hasOwn(validated, "registry_lookup"), false);
  assert.equal(Object.hasOwn(validated, "manifest_instance"), false);
  assert.equal(Object.hasOwn(validated, "manifest_population"), false);
  assert.equal(Object.hasOwn(validated, "metadata_acquisition"), false);
});
