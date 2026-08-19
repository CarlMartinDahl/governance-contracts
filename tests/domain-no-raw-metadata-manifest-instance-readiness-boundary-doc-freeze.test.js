const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const docsPath = path.join(
  __dirname,
  "..",
  "docs",
  "DOMAIN_CONTRACTS_NO_RAW_METADATA_MANIFEST_INSTANCE_READINESS_BOUNDARY_v1.md",
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

test("manifest-instance readiness boundary exists and is DOCS_ONLY", () => {
  assert.equal(fs.existsSync(docsPath), true);
  assert.match(
    docsText,
    /Boundary name: `NO_RAW_METADATA_MANIFEST_INSTANCE_READINESS_BOUNDARY`/,
  );
  assert.match(docsText, /Status: `DOCS_ONLY`/);
  assert.match(docsText, /manifest-instance readiness only/i);
  assert.match(docsText, /Manifest-instance-readiness-only means/i);
});

test("boundary creates no manifest instance fixture population metadata matrix source review or product candidate", () => {
  assertIncludesAll([
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
    "It does not modify `validateNoRawMetadataManifest`.",
    "It does not modify `noRawMetadataManifest`.",
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
    "These prior boundaries remain active comparison and contract context only.",
  ]);
});

test("current readiness verdict and exact blocked status appear", () => {
  assertIncludesAll([
    "NO_RAW_METADATA_MANIFEST_INSTANCE_NOT_SAFE_NOW",
    "NO_RAW_METADATA_MANIFEST_INSTANCE_NOT_CREATED",
    "NO_RAW_METADATA_MANIFEST_INSTANCE_NOT_CONSUMED",
    "NO_RAW_METADATA_MANIFEST_INSTANCE_NOT_PERSISTED",
    "NO_RAW_METADATA_MANIFEST_INSTANCE_NOT_DISPATCHED",
    "NO_RAW_METADATA_MANIFEST_INSTANCE_BLOCKED_PENDING_ACTIVE_METADATA_ACQUISITION_AND_INSTANCE_BOUNDARY",
    "a no-raw metadata manifest instance is not safe now",
  ]);
});

test("prerequisite statuses appear and remain unsatisfied by this boundary", () => {
  assertIncludesAll([
    "MANIFEST_INSTANCE_BOUNDARY_REQUIRED",
    "ACTIVE_METADATA_ACQUISITION_PATH_REQUIRED",
    "SAFE_METADATA_EVIDENCE_REQUIRED",
    "NO_RAW_METADATA_MANIFEST_INSTANCE_PROOF_TEST_REQUIRED",
    "PERSISTED_SURFACE_REQUIRED_IF_PERSISTENCE_IS_PROPOSED",
    "RUNTIME_API_CONSUMER_SCOPE_REQUIRED_IF_RUNTIME_USE_IS_PROPOSED",
    "DISPATCH_SURFACE_PROOF_TEST_REQUIRED_IF_DISPATCH_IS_PROPOSED",
    "NO_RAW_OUTPUT_PRESERVED",
    "VALIDATION_WITHOUT_CONCLUSION_PRESERVED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "These prerequisite statuses are not satisfied by this boundary.",
  ]);
});

test("comparison classifications appear", () => {
  assertIncludesAll([
    "CONTRACT_VALIDATION_SURFACE_ONLY_NOT_INSTANCE",
    "DISPATCH_BLOCKER_COMPARISON_EVIDENCE",
    "COMPARISON_EVIDENCE_ONLY",
    "NOT_APPLICABLE_AUTHORIZATION_MODEL",
    "DOCS_ONLY_SOURCE_OF_TRUTH_FOR_INSTANCE_LIMITS",
    "These classifications do not activate manifest instance creation",
  ]);
});

test("blocked actions appear only as blocked or must-not-use language", () => {
  const blockedSection = sectionBetween(
    "## Blocked / Must-Not-Use Actions And Statuses",
    "## Non-Proof And No-Conclusion Rules",
  );

  for (const status of [
    "MANIFEST_INSTANCE_CREATED",
    "TEST_FIXTURE_TREATED_AS_MANIFEST_INSTANCE",
    "MANIFEST_POPULATED",
    "METADATA_ACQUIRED",
    "ACTIVE_METADATA_ACQUISITION_PATH_ASSUMED",
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
  assert.match(blockedSection, /They do not create facts, conclusions, manifest instances/i);
});

test("non-proof and no-conclusion rules are frozen", () => {
  assertIncludesAll([
    "Manifest-instance readiness is not instance creation.",
    "Manifest-instance readiness is not metadata acquisition.",
    "Manifest-instance readiness is not manifest population.",
    "Manifest-instance readiness is not actual matrix creation.",
    "Manifest-instance readiness is not validator dispatch.",
    "Manifest-instance readiness is not runtime enforcement.",
    "Manifest-instance readiness is not source completeness proof.",
    "Manifest-instance readiness is not truth proof.",
    "Manifest-instance readiness is not legal/clinical/evidentiary proof.",
    "Manifest-instance readiness is not external-use readiness.",
    "Manifest-instance readiness is not product-candidate selection.",
    "Schema/export/validator existence is not manifest existence.",
    "Validator existence is not metadata acquisition.",
    "Validator existence is not actual matrix creation.",
    "Gate-001 row count `20` remains package/process context only, not per-chunk metadata and not proof.",
    "Synthetic/test-only examples must not be treated as actual manifest instances.",
    "Any later actual manifest instance requires separate explicit approval, proof test, and safe metadata evidence.",
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
