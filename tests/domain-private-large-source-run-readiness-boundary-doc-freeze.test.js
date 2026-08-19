const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const docsPath = path.join(
  __dirname,
  "..",
  "docs",
  "DOMAIN_CONTRACTS_PRIVATE_LARGE_SOURCE_RUN_READINESS_BOUNDARY_v1.md",
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

test("private large-source run readiness boundary exists and is DOCS_ONLY", () => {
  assert.equal(fs.existsSync(docsPath), true);
  assert.match(
    docsText,
    /Boundary name: `PRIVATE_LARGE_SOURCE_RUN_READINESS_BOUNDARY`/,
  );
  assert.match(docsText, /Status: `DOCS_ONLY`/);
  assert.match(docsText, /private-large-source-run-readiness-only boundary/i);
  assert.match(docsText, /readiness planning is allowed only as boundary planning/i);
});

test("real private run source processing and raw inspection are not authorized", () => {
  assertIncludesAll([
    "It does not authorize a real private run.",
    "It does not authorize actual 1.8 GB source processing.",
    "It does not authorize raw source inspection.",
    "It does not authorize raw message review.",
    "It does not authorize image/screenshot review.",
    "It does not authorize PDF inspection.",
    "It does not authorize metadata inspection.",
    "It does not authorize source package inspection.",
    "It does not authorize raw/private material routing.",
    "It does not authorize third-party model/API routing.",
  ]);
});

test("metadata manifest matrix dispatch runtime API product and external-use remain blocked", () => {
  assertIncludesAll([
    "It does not authorize metadata acquisition.",
    "It does not activate a metadata acquisition path.",
    "It does not create a metadata acquisition contract.",
    "It does not create a manifest instance.",
    "It does not create a test fixture instance.",
    "It does not populate a manifest.",
    "It does not create an actual source review matrix.",
    "It does not create validator dispatch.",
    "It does not create registry/lookup/generic dispatch behavior.",
    "It does not create runtime/API behavior.",
    "It does not select a product candidate.",
    "It does not authorize external-use readiness.",
    "Runtime/API/package implementation behavior is not modified.",
    "Product candidate remains none.",
  ]);
});

test("forbidden conclusion categories and data-handling unknowns are not bypassed", () => {
  assertIncludesAll([
    "It does not create legal, clinical, evidentiary, case-truth, credibility, victim-status, perpetrator-status, offence, ownership, risk, sufficiency, police-report, pleading, diagnosis, trauma-diagnosis, marker finding, external-use, or product-candidate conclusions.",
    "It does not bypass existing data-handling unknowns.",
    "retention",
    "deletion",
    "encryption",
    "audit logs",
    "role permissions",
    "raw-material routing",
    "third-party model/API status",
    "access control beyond documented route/case-access behavior",
  ]);
});

test("prior boundaries appear and are not bypassed", () => {
  assertIncludesAll([
    "This boundary does not bypass:",
    "DATA_HANDLING_AND_PRIVATE_PILOT_READINESS_BOUNDARY",
    "TRAUMA_MINIMIZING_LAYERED_SOURCE_NAVIGATION_BOUNDARY",
    "NO_RAW_METADATA_MANIFEST_VALIDATOR_DISPATCH_READINESS_BOUNDARY",
    "NO_RAW_METADATA_MANIFEST_INSTANCE_READINESS_BOUNDARY",
    "NO_RAW_METADATA_MANIFEST_ACTIVE_METADATA_ACQUISITION_PATH_READINESS_BOUNDARY",
    "These boundaries remain active constraints.",
  ]);
});

test("current readiness verdict statuses appear", () => {
  assertIncludesAll([
    "PRIVATE_LARGE_SOURCE_RUN_READINESS_PLANNING_ONLY",
    "REAL_PRIVATE_RUN_NOT_AUTHORIZED",
    "ACTUAL_1_8_GB_SOURCE_PROCESSING_NOT_AUTHORIZED",
    "RAW_SOURCE_INSPECTION_NOT_AUTHORIZED",
    "PDF_IMAGE_METADATA_SOURCE_PACKAGE_INSPECTION_NOT_AUTHORIZED",
    "RAW_PRIVATE_MATERIAL_ROUTING_NOT_AUTHORIZED",
    "THIRD_PARTY_MODEL_API_STATUS_UNRESOLVED",
    "DATA_HANDLING_UNKNOWNS_NOT_BYPASSED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
  ]);
});

test("unresolved blocker statuses appear", () => {
  assertIncludesAll([
    "RETENTION_POLICY_NOT_EVIDENCED",
    "DELETION_POLICY_NOT_EVIDENCED",
    "ENCRYPTION_CONTROL_NOT_EVIDENCED",
    "AUDIT_LOG_CONTROL_NOT_EVIDENCED",
    "ROLE_PERMISSION_CONTROL_NOT_EVIDENCED",
    "RAW_MATERIAL_ROUTING_NOT_EVIDENCED",
    "THIRD_PARTY_MODEL_API_ROUTING_NOT_EVIDENCED",
    "ACCESS_CONTROL_BEYOND_DOCUMENTED_ROUTE_CASE_ACCESS_NOT_EVIDENCED",
    "ACTIVE_METADATA_ACQUISITION_PATH_NOT_ACTIVE",
    "MANIFEST_INSTANCE_NOT_CREATED",
    "PERSISTED_DISPATCH_SURFACE_NOT_APPROVED",
    "RUNTIME_API_CONSUMER_SCOPE_NOT_APPROVED",
    "ACTUAL_SOURCE_REVIEW_MATRIX_NOT_CREATED",
  ]);
});

test("future prerequisite statuses appear", () => {
  assertIncludesAll([
    "EXPLICIT_MANUAL_PRODUCT_DECISION_REQUIRED",
    "DATA_HANDLING_CONTRACT_REQUIRED",
    "RETENTION_POLICY_REQUIRED",
    "DELETION_POLICY_REQUIRED",
    "ENCRYPTION_CONTROL_REQUIRED",
    "AUDIT_LOG_CONTROL_REQUIRED",
    "ROLE_PERMISSION_CONTROL_REQUIRED",
    "RAW_MATERIAL_ROUTING_DECISION_REQUIRED",
    "THIRD_PARTY_MODEL_API_DECISION_REQUIRED",
    "SOURCE_PROCESSING_SCOPE_REQUIRED",
    "NO_RAW_OUTPUT_PROOF_TEST_REQUIRED",
    "PRIVACY_LEAK_ABORT_CRITERIA_REQUIRED",
    "SOURCE_UNIVERSE_DECLARATION_REQUIRED",
    "COUNTER_CONTEXT_PRESERVATION_REQUIRED",
    "HUMAN_PROFESSIONAL_REVIEW_GATE_REQUIRED",
    "EXTERNAL_USE_GATE_REQUIRED_IF_EXTERNAL_USE_IS_PROPOSED",
    "PRODUCT_CANDIDATE_SELECTION_REQUIRED_IF_PRODUCTIZATION_IS_PROPOSED",
    "MANIFEST_INSTANCE_BOUNDARY_REQUIRED_IF_MANIFEST_INSTANCE_IS_PROPOSED",
    "ACTIVE_METADATA_ACQUISITION_CONTRACT_REQUIRED_IF_METADATA_IS_PROPOSED",
    "DISPATCH_SURFACE_PROOF_TEST_REQUIRED_IF_DISPATCH_IS_PROPOSED",
    "RUNTIME_API_CONSUMER_SCOPE_REQUIRED_IF_RUNTIME_USE_IS_PROPOSED",
  ]);
});

test("blocked actions appear only as blocked or must-not-use language", () => {
  const blockedSection = sectionBetween(
    "## Blocked / Must-Not-Use Actions And Statuses",
    "## Non-Proof And No-Conclusion Rules",
  );

  for (const status of [
    "REAL_PRIVATE_RUN_STARTED",
    "ACTUAL_1_8_GB_SOURCE_PROCESSING_STARTED",
    "RAW_SOURCE_INSPECTION_STARTED",
    "RAW_MESSAGE_REVIEW_STARTED",
    "PDF_INSPECTION_STARTED",
    "IMAGE_SCREENSHOT_INSPECTION_STARTED",
    "METADATA_INSPECTION_STARTED",
    "SOURCE_PACKAGE_INSPECTION_STARTED",
    "RAW_PRIVATE_MATERIAL_ROUTED",
    "THIRD_PARTY_MODEL_API_ROUTING_ASSUMED",
    "METADATA_ACQUIRED",
    "ACTIVE_METADATA_ACQUISITION_PATH_ACTIVATED",
    "METADATA_ACQUISITION_CONTRACT_CREATED",
    "MANIFEST_INSTANCE_CREATED",
    "TEST_FIXTURE_TREATED_AS_MANIFEST_INSTANCE",
    "MANIFEST_POPULATED",
    "ACTUAL_MATRIX_CREATED",
    "VALIDATOR_DISPATCH_CREATED",
    "VALIDATOR_REGISTRY_CREATED",
    "GENERIC_LOOKUP_CREATED",
    "RUNTIME_API_BEHAVIOR_CREATED",
    "PERSISTED_SURFACE_ASSUMED",
    "SOURCE_COMPLETENESS_PROOF_CREATED",
    "TRUTH_PROOF_CREATED",
    "LEGAL_RELEVANCE_CONFIRMED",
    "EVIDENCE_SUFFICIENT",
    "RISK_SCORE",
    "SUFFICIENCY_SCORE",
    "EXTERNAL_USE_READY",
    "PRODUCT_CANDIDATE_SELECTED",
  ]) {
    assert.match(blockedSection, new RegExp(status));
  }

  assert.match(blockedSection, /listed only as blocked \/ must-not-use language/i);
  assert.match(blockedSection, /do not create facts, conclusions/i);
});

test("non-proof and no-conclusion rules are frozen", () => {
  assertIncludesAll([
    "Private large-source run readiness is not run authorization.",
    "Readiness planning is not source processing.",
    "Readiness planning is not raw inspection.",
    "Readiness planning is not metadata acquisition.",
    "Readiness planning is not manifest instance creation.",
    "Readiness planning is not actual matrix creation.",
    "Readiness planning is not validator dispatch.",
    "Readiness planning is not runtime/API behavior.",
    "Readiness planning is not source completeness proof.",
    "Readiness planning is not truth proof.",
    "Readiness planning is not legal/clinical/evidentiary proof.",
    "Readiness planning is not external-use readiness.",
    "Readiness planning is not product-candidate selection.",
    "Schema/export/validator existence is not run authorization.",
    "Metadata-acquisition readiness is not metadata acquisition.",
    "Manifest-instance readiness is not manifest instance.",
    "Dispatch readiness is not dispatch.",
    "Gate-001 row count `20` remains package/process context only, not per-chunk metadata and not proof.",
    "Hashes/manifests/ZIP validation remain integrity/reproducibility only, not truth/legal/clinical proof.",
    "Red-team/test evidence remains tested-scenario evidence only, not runtime certainty.",
    "Any later real private run requires separate explicit approval, proof test, data-handling contract, source-processing scope, and human/professional review gate.",
  ]);
});

test("source-handling rules are preserved", () => {
  assertIncludesAll([
    "No real private run is authorized.",
    "No actual 1.8 GB source processing is authorized.",
    "No raw source inspection is authorized.",
    "No raw message review is authorized.",
    "No PDF/image/metadata/source package inspection is authorized.",
    "No raw/private material routing is authorized.",
    "No third-party model/API routing is authorized while status remains unresolved or not evidenced.",
    "No metadata acquisition occurs.",
    "No metadata acquisition contract is created.",
    "No manifest instance or test fixture instance is created.",
    "No manifest data is populated.",
    "No actual matrix is created.",
    "No validator dispatch/registry/lookup is created.",
    "External-use readiness is not authorized.",
    "Human/professional review remains the release gate.",
  ]);
});

test("no reopening rules appear", () => {
  assertIncludesAll([
    "This boundary does not reopen:",
    "SWE bodelning",
    "DK psykisk vold offence modelling",
    "SWE psykiskt vald legal modelling",
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

test("doc contains no raw private or conclusion material beyond blocked category wording", () => {
  assert.doesNotMatch(docsText, /https?:\/\//i);
  assert.doesNotMatch(docsText, /private path:/i);
  assert.doesNotMatch(docsText, /source locator:/i);
  assert.match(docsText, /blocked \/ must-not-use language/i);
  assert.match(docsText, /It does not create legal, clinical, evidentiary/i);
});
