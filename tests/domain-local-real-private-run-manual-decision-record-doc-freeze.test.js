const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const docsPath = path.join(
  __dirname,
  "..",
  "docs",
  "DOMAIN_CONTRACTS_LOCAL_REAL_PRIVATE_RUN_MANUAL_DECISION_RECORD_v1.md",
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

test("local real private run manual decision record exists and is DOCS_ONLY", () => {
  assert.equal(fs.existsSync(docsPath), true);
  assert.match(
    docsText,
    /Record name: `LOCAL_REAL_PRIVATE_RUN_MANUAL_DECISION_RECORD`/,
  );
  assert.match(docsText, /Status: `DOCS_ONLY`/);
  assert.match(docsText, /manual-decision-record-only/i);
  assert.match(docsText, /manual product-direction decisions only/i);
});

test("manual decisions are recorded without authorizing the run", () => {
  assertIncludesAll([
    "Real private run is recorded as a future target for a local controlled test to show more about model function.",
    "The actual real private run is not authorized by this record.",
    "The first private run target is local-only unless later explicitly changed.",
    "Third-party model/API use may be considered long-term, but third-party model/API routing is not active, assumed, or authorized for the first local run.",
    "Local phase data-handling ownership remains with the user unless separately assigned.",
    "The local build review gate is user plus AI-assisted internal review.",
    "The formal professional review gate remains not yet assigned and is not replaced by AI-assisted internal review.",
    "Product candidate remains none.",
    "External-use remains unauthorized.",
    "External Reviewer review is awaited; no new external claims are authorized before separate approval.",
  ]);
});

test("required decision statuses appear", () => {
  assertIncludesAll([
    "REAL_PRIVATE_RUN_FUTURE_TARGET_LOCAL_TEST",
    "REAL_PRIVATE_RUN_NOT_AUTHORIZED",
    "FIRST_PRIVATE_RUN_LOCAL_ONLY_TARGET",
    "THIRD_PARTY_MODEL_API_LONG_TERM_POSSIBLE_NOT_ACTIVE_FOR_FIRST_LOCAL_RUN",
    "LOCAL_PHASE_DATA_HANDLING_OWNER_USER",
    "LOCAL_BUILD_REVIEW_GATE_USER_PLUS_AI_ASSISTED_INTERNAL_REVIEW",
    "FORMAL_PROFESSIONAL_REVIEW_GATE_NOT_ASSIGNED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "EXTERNAL_REVIEWER_REVIEW_AWAITED_NO_EXTERNAL_NEW_CLAIMS",
  ]);
});

test("source processing inspection routing metadata manifest matrix dispatch runtime and API remain blocked", () => {
  assertIncludesAll([
    "It does not authorize actual 1.8 GB source processing.",
    "It does not authorize raw source inspection.",
    "It does not authorize raw message review.",
    "It does not authorize PDF/image/screenshot/metadata/source package inspection.",
    "It does not authorize raw/private material routing.",
    "It does not authorize third-party model/API routing for the first local run.",
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
    "Runtime/API/package implementation behavior is not modified.",
  ]);
});

test("forbidden conclusion categories data-handling unknowns and formal review boundary are preserved", () => {
  assertIncludesAll([
    "It does not create legal, clinical, evidentiary, case-truth, credibility, victim-status, perpetrator-status, offence, ownership, risk, sufficiency, police-report, pleading, diagnosis, trauma-diagnosis, marker finding, external-use, or product-candidate conclusions.",
    "It does not bypass existing data-handling unknowns.",
    "It does not replace formal human/professional review.",
    "Human/professional review remains the release gate.",
  ]);
});

test("trace coverage is fail-closed marking and gap language without perfect recall or completeness proof", () => {
  assertIncludesAll([
    "The must-not-miss-traces goal is encoded as fail-closed trace-coverage marking and gap language.",
    "The trace-coverage goal requires review-relevant trace omission to be marked.",
    "Unsearched scope must be marked instead of converted into a negative finding.",
    "A not-found status after targeted search requires scope and method context.",
    "Silent omission or loss of review-relevant digital traces is forbidden.",
    "False-negative risk must be disclosed.",
    "This record does not claim perfect recall.",
    "This record does not claim perfect detection.",
    "This record does not create source completeness proof.",
    "REVIEW_RELEVANT_TRACE_OMISSION_MUST_BE_MARKED",
    "SOURCE_UNIVERSE_DECLARATION_REQUIRED",
    "NOT_SEARCHED_BY_SCOPE_REQUIRED",
    "NOT_FOUND_AFTER_TARGETED_SEARCH_REQUIRES_SCOPE_AND_METHOD",
    "SILENT_OMISSION_OF_REVIEW_RELEVANT_DIGITAL_TRACES_FORBIDDEN",
    "NO_PERFECT_RECALL_CLAIM",
    "NO_PERFECT_DETECTION_CLAIM",
    "NO_SOURCE_COMPLETENESS_PROOF",
    "FALSE_NEGATIVE_RISK_MUST_BE_DISCLOSED",
    "UNSEARCHED_LAYER_MUST_NOT_BECOME_NEGATIVE_FINDING",
    "COUNTER_CONTEXT_PRESERVATION_REQUIRED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
  ]);
});

test("prior boundaries appear and are not bypassed", () => {
  assertIncludesAll([
    "This record does not bypass:",
    "PRIVATE_LARGE_SOURCE_RUN_READINESS_BOUNDARY",
    "DATA_HANDLING_AND_PRIVATE_PILOT_READINESS_BOUNDARY",
    "TRAUMA_MINIMIZING_LAYERED_SOURCE_NAVIGATION_BOUNDARY",
    "NO_RAW_METADATA_MANIFEST_VALIDATOR_DISPATCH_READINESS_BOUNDARY",
    "NO_RAW_METADATA_MANIFEST_INSTANCE_READINESS_BOUNDARY",
    "NO_RAW_METADATA_MANIFEST_ACTIVE_METADATA_ACQUISITION_PATH_READINESS_BOUNDARY",
    "These boundaries remain active constraints.",
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
    "PERFECT_RECALL_CLAIMED",
    "PERFECT_DETECTION_CLAIMED",
    "UNSEARCHED_SCOPE_TREATED_AS_NEGATIVE_FINDING",
    "SILENT_TRACE_OMISSION_ALLOWED",
  ]) {
    assert.match(blockedSection, new RegExp(status));
  }

  assert.match(blockedSection, /listed only as blocked \/ must-not-use language/i);
  assert.match(blockedSection, /do not create facts, conclusions/i);
});

test("non-proof and no-conclusion rules appear", () => {
  assertIncludesAll([
    "Manual decision recording is not run authorization.",
    "Local-run target is not source processing.",
    "Local-only target is not raw inspection.",
    "Long-term third-party/API possibility is not current third-party/API authorization.",
    "AI-assisted internal review is not formal professional review.",
    "Trace-coverage goal is not perfect recall proof.",
    "Trace-coverage goal is not source completeness proof.",
    "Trace-coverage goal is not legal/clinical/evidentiary proof.",
    "Readiness planning is not metadata acquisition.",
    "Readiness planning is not manifest instance creation.",
    "Readiness planning is not actual matrix creation.",
    "Readiness planning is not validator dispatch.",
    "Readiness planning is not runtime/API behavior.",
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

test("source-handling and non-reopening rules are preserved", () => {
  assertIncludesAll([
    "No real private run is authorized.",
    "No actual 1.8 GB source processing is authorized.",
    "No raw source inspection is authorized.",
    "No raw message review is authorized.",
    "No PDF/image/screenshot/metadata/source package inspection is authorized.",
    "No raw/private material routing is authorized.",
    "No third-party model/API routing is authorized for the first local run.",
    "No metadata acquisition occurs.",
    "No metadata acquisition contract is created.",
    "No manifest instance or test fixture instance is created.",
    "No manifest data is populated.",
    "No actual matrix is created.",
    "No validator dispatch/registry/lookup is created.",
    "This record does not reopen:",
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

test("record does not include raw private source locator or conclusion material outside blocked category wording", () => {
  assert.doesNotMatch(docsText, /https?:\/\//);
  assert.doesNotMatch(docsText, /private path/i);
  assert.doesNotMatch(docsText, /page reference/i);
  assert.doesNotMatch(docsText, /sensitive event/i);
  assert.doesNotMatch(docsText, /legal conclusion/i);
  assert.doesNotMatch(docsText, /clinical conclusion/i);
  assert.doesNotMatch(docsText, /evidentiary conclusion/i);
});
