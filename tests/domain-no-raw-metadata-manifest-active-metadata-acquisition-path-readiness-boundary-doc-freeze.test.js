const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const docsPath = path.join(
  __dirname,
  "..",
  "docs",
  "DOMAIN_CONTRACTS_NO_RAW_METADATA_MANIFEST_ACTIVE_METADATA_ACQUISITION_PATH_READINESS_BOUNDARY_v1.md",
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

test("active metadata acquisition path readiness boundary exists and is DOCS_ONLY", () => {
  assert.equal(fs.existsSync(docsPath), true);
  assert.match(
    docsText,
    /Boundary name: `NO_RAW_METADATA_MANIFEST_ACTIVE_METADATA_ACQUISITION_PATH_READINESS_BOUNDARY`/,
  );
  assert.match(docsText, /Status: `DOCS_ONLY`/);
  assert.match(docsText, /active metadata acquisition path readiness only/i);
  assert.match(docsText, /Active-metadata-acquisition-path-readiness-only means/i);
});

test("boundary creates no active acquisition contract mechanism instance metadata matrix or product candidate", () => {
  assertIncludesAll([
    "It does not activate a metadata acquisition path.",
    "It does not create a metadata acquisition contract.",
    "It does not create a deterministic preprocessor.",
    "It does not create a reviewed chunk ledger.",
    "It does not create a manual attestation workflow.",
    "It does not create another no-raw mechanism.",
    "It does not create a manifest instance.",
    "It does not create a test fixture instance.",
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
  ]);
});

test("boundary creates no validator dispatch registry lookup schema export validator runtime or API changes", () => {
  assertIncludesAll([
    "It does not create validator dispatch.",
    "It does not create registry behavior.",
    "It does not create lookup behavior.",
    "It does not create generic dispatch behavior.",
    "It does not modify schema files.",
    "It does not modify package schema exports.",
    "It does not modify validator files.",
    "It does not modify runtime/API/package implementation behavior.",
  ]);
});

test("prior boundaries appear and are not bypassed", () => {
  assertIncludesAll([
    "This boundary does not bypass:",
    "ACTUAL_CHUNK_METADATA_AVAILABILITY_GAP_BOUNDARY",
    "SAFE_METADATA_ACQUISITION_PATH_BOUNDARY",
    "NO_RAW_METADATA_MANIFEST_CONTRACT_BOUNDARY",
    "NO_RAW_METADATA_MANIFEST_SCHEMA_READINESS_BOUNDARY",
    "NO_RAW_METADATA_MANIFEST_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY",
    "NO_RAW_METADATA_MANIFEST_VALIDATOR_DISPATCH_READINESS_BOUNDARY",
    "NO_RAW_METADATA_MANIFEST_INSTANCE_READINESS_BOUNDARY",
    "These prior boundaries remain active comparison and contract context only.",
  ]);
});

test("current readiness verdict and exact blocked status appear", () => {
  assertIncludesAll([
    "NO_RAW_METADATA_MANIFEST_ACTIVE_METADATA_ACQUISITION_PATH_NOT_SAFE_NOW",
    "NO_ACTIVE_NO_RAW_METADATA_ACQUISITION_PATH_EXISTS",
    "NO_SAFE_METADATA_EVIDENCE_EXISTS",
    "NO_GENERATION_CONTRACT_EXISTS",
    "NO_RAW_METADATA_MANIFEST_ACTIVE_METADATA_ACQUISITION_PATH_BLOCKED_PENDING_CONTRACT_AND_SAFE_METADATA_EVIDENCE",
    "an active no-raw metadata acquisition path is not safe now",
  ]);
});

test("candidate path classifications appear", () => {
  assertIncludesAll([
    "Manual human/professional attestation concept is classified as:",
    "DOCS_ONLY_ONLY_NOT_ACTIVE",
    "Safe metadata acquisition boundary is classified as:",
    "No-raw metadata manifest contract is classified as:",
    "DOCS_ONLY_CONTRACT_DEFINED_NOT_ACTIVE_ACQUISITION",
    "Deterministic preprocessor output is classified as:",
    "HYPOTHETICAL_UNTIL_CONTRACTED",
    "Reviewed chunk ledger is classified as:",
    "Other no-raw mechanism is classified as:",
    "HYPOTHETICAL_OR_ABSENT_UNTIL_DOCUMENTED_REVIEWED_AND_TESTED",
    "Inference from identifiers, row count, period span, synthetic examples, marker families, source-adjacent signals, metadata, timestamps, read receipts, filenames, page positions, or user assertion is classified as:",
    "BLOCKED_AS_ACQUISITION_PATH",
  ]);
});

test("prerequisite statuses appear and remain unsatisfied by this boundary", () => {
  assertIncludesAll([
    "ACTIVE_METADATA_ACQUISITION_CONTRACT_REQUIRED",
    "SAFE_METADATA_EVIDENCE_REQUIRED",
    "NO_RAW_METADATA_ACQUISITION_PROOF_TEST_REQUIRED",
    "NO_RAW_OUTPUT_PRESERVED",
    "NO_PRIVATE_FACTS_INCLUDED",
    "NO_SOURCE_LOCATOR_INCLUDED",
    "NO_EXACT_DATES_INCLUDED",
    "PDF_IMAGE_METADATA_NOT_OPENED",
    "SOURCE_PACKAGE_NOT_OPENED",
    "VALIDATION_WITHOUT_CONCLUSION_PRESERVED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "MANIFEST_INSTANCE_BOUNDARY_REQUIRED_BEFORE_INSTANCE",
    "PERSISTED_SURFACE_REQUIRED_IF_PERSISTENCE_IS_PROPOSED",
    "RUNTIME_API_CONSUMER_SCOPE_REQUIRED_IF_RUNTIME_USE_IS_PROPOSED",
    "DISPATCH_SURFACE_PROOF_TEST_REQUIRED_IF_DISPATCH_IS_PROPOSED",
    "These prerequisite statuses are not satisfied by this boundary.",
  ]);
});

test("safe metadata evidence gaps appear", () => {
  assertIncludesAll([
    "Safe metadata evidence is absent for:",
    "per-chunk availability",
    "period bucket assignment",
    "row count summary",
    "marker count summary",
    "source layer status",
    "privacy blocker status",
    "counter-context status",
    "unresolved pointer status",
    "human/professional review status",
    "validation-without-conclusion status",
    "These gaps mean no active metadata acquisition path is evidenced by the current repo state.",
  ]);
});

test("blocked actions appear only as blocked or must-not-use language", () => {
  const blockedSection = sectionBetween(
    "## Blocked / Must-Not-Use Actions And Statuses",
    "## Non-Proof And No-Conclusion Rules",
  );

  for (const status of [
    "ACTIVE_METADATA_ACQUISITION_PATH_ACTIVATED",
    "METADATA_ACQUIRED",
    "METADATA_ACQUIRED_BY_INFERENCE",
    "MANIFEST_INSTANCE_CREATED",
    "TEST_FIXTURE_TREATED_AS_MANIFEST_INSTANCE",
    "MANIFEST_POPULATED",
    "SAFE_METADATA_EVIDENCE_ASSUMED",
    "PER_CHUNK_METADATA_INFERRED",
    "COUNT_SUMMARY_INFERRED",
    "MARKER_COUNT_INFERRED",
    "PERIOD_BUCKET_INFERRED",
    "CHUNK_AVAILABILITY_INFERRED",
    "ACTUAL_MATRIX_CREATED",
    "VALIDATOR_DISPATCH_CREATED",
    "VALIDATOR_REGISTRY_CREATED",
    "GENERIC_LOOKUP_CREATED",
    "PERSISTED_SURFACE_ASSUMED",
    "RUNTIME_API_BEHAVIOR_CREATED",
    "SOURCE_INSPECTION_AUTHORIZED",
    "RAW_TEXT_REVIEW_AUTHORIZED",
    "PDF_IMAGE_METADATA_SOURCE_PACKAGE_OPENED",
    "EXTERNAL_USE_READY",
    "PRODUCT_CANDIDATE_SELECTED",
    "PROOF_FOUND",
    "MARKER_FINDING_CREATED",
    "LEGAL_RELEVANCE_CONFIRMED",
    "EVIDENCE_SUFFICIENT",
    "RISK_SCORE",
    "SUFFICIENCY_SCORE",
  ]) {
    assert.match(blockedSection, new RegExp(status));
  }

  assert.match(blockedSection, /listed only as blocked \/ must-not-use language/i);
  assert.match(blockedSection, /They do not create facts, conclusions, active metadata acquisition/i);
});

test("non-proof and no-conclusion rules are frozen", () => {
  assertIncludesAll([
    "Active metadata acquisition path readiness is not metadata acquisition.",
    "Acquisition readiness is not acquisition contract creation.",
    "Acquisition readiness is not manifest instance creation.",
    "Acquisition readiness is not manifest population.",
    "Acquisition readiness is not actual matrix creation.",
    "Acquisition readiness is not validator dispatch.",
    "Acquisition readiness is not runtime enforcement.",
    "Acquisition readiness is not source completeness proof.",
    "Acquisition readiness is not truth proof.",
    "Acquisition readiness is not legal/clinical/evidentiary proof.",
    "Acquisition readiness is not external-use readiness.",
    "Acquisition readiness is not product-candidate selection.",
    "Schema/export/validator existence is not metadata acquisition.",
    "Manifest contract existence is not metadata acquisition.",
    "Manifest instance readiness is not metadata acquisition.",
    "Gate-001 row count `20` remains package/process context only, not per-chunk metadata and not proof.",
    "Synthetic/test-only examples must not be treated as actual metadata evidence.",
    "Any later active metadata acquisition path requires separate explicit approval, proof test, and safe metadata evidence.",
  ]);
});

test("non-reopening rules appear", () => {
  assertIncludesAll([
    "This boundary does not reopen:",
    "SWE_BODELNING",
    "DK_PSYKISK_VOLD_OFFENCE_MODELLING",
    "SWE_PSYKISKT_VALD_LEGAL_MODELLING",
    "NORDIC_COMPARISON",
    "RUNTIME_BEHAVIOR",
    "API_BEHAVIOR",
    "PACKAGE_IMPLEMENTATION_BEHAVIOR",
    "VALIDATOR_DISPATCH",
    "REGISTRY_LOOKUP_GENERIC_DISPATCH",
    "PRODUCT_CANDIDATE_SELECTION",
    "EXTERNAL_USE_READINESS",
    "REAL_LARGE_SOURCE_PRIVATE_RUN",
    "PDF_IMAGE_METADATA_SOURCE_INSPECTION",
    "PDF_PACKET_GENERATION",
    "ARCHIVE_ZIP_GENERATION",
    "ACTUAL_SOURCE_REVIEW_MATRIX_CREATION",
    "METADATA_ACQUISITION",
    "MANIFEST_INSTANCE_CREATION",
    "MANIFEST_POPULATION",
    "TEST_FIXTURE_INSTANCE_CREATION",
  ]);
});

test("proof text contains no raw private source locator or conclusion material except blocked categories", () => {
  assert.doesNotMatch(docsText, /\/Users\//);
  assert.doesNotMatch(docsText, /https?:\/\//i);
  assert.doesNotMatch(docsText, /\b\d{4}-\d{2}-\d{2}\b/);

  assert.match(
    docsText,
    /No raw\/private\/conclusion material is inspected, emitted, or added by this boundary except blocked\/forbidden-category wording\./,
  );
  assert.match(
    docsText,
    /No legal, clinical, evidentiary, case-truth, credibility, victim-status, perpetrator-status, offence, ownership, risk, sufficiency, police-report, pleading, external-use, diagnosis, trauma-diagnosis, marker finding, product-candidate, or source-completeness conclusion is authorized\./,
  );
});
