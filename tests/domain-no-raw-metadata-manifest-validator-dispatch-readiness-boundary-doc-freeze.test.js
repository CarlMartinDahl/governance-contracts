const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const docsPath = path.join(
  __dirname,
  "..",
  "docs",
  "DOMAIN_CONTRACTS_NO_RAW_METADATA_MANIFEST_VALIDATOR_DISPATCH_READINESS_BOUNDARY_v1.md",
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

test("validator-dispatch readiness boundary exists and is DOCS_ONLY", () => {
  assert.equal(fs.existsSync(docsPath), true);
  assert.match(
    docsText,
    /Boundary name: `NO_RAW_METADATA_MANIFEST_VALIDATOR_DISPATCH_READINESS_BOUNDARY`/,
  );
  assert.match(docsText, /Status: `DOCS_ONLY`/);
  assert.match(docsText, /validator-dispatch readiness only/i);
  assert.match(docsText, /Validator-dispatch-readiness-only means/i);
});

test("boundary creates no dispatch registry lookup runtime API schema export or validator changes", () => {
  assertIncludesAll([
    "It does not create validator dispatch.",
    "It does not create registry behavior.",
    "It does not create lookup behavior.",
    "It does not create generic dispatch behavior.",
    "It does not modify `validateNoRawMetadataManifest`.",
    "It does not modify `noRawMetadataManifest`.",
    "It does not modify schema files.",
    "It does not modify package schema exports.",
    "It does not modify runtime/API/package implementation behavior.",
  ]);
});

test("boundary creates no manifest instance population metadata matrix source inspection external-use or product candidate", () => {
  assertIncludesAll([
    "It does not create a manifest instance.",
    "It does not populate manifest data.",
    "It does not acquire metadata.",
    "It does not create a real source review matrix.",
    "It does not create an evidence/proof matrix.",
    "It does not authorize source inspection.",
    "It does not authorize PDF/image/metadata/source package inspection.",
    "It does not authorize a real large-source private run.",
    "It does not authorize external-use readiness.",
    "It does not select a product candidate.",
    "Product candidate remains none.",
    "It does not infer per-chunk metadata.",
  ]);
});

test("current readiness verdict and exact blocked status appear", () => {
  assertIncludesAll([
    "NO_RAW_METADATA_MANIFEST_VALIDATOR_DISPATCH_NOT_SAFE_NOW",
    "NO_RAW_METADATA_MANIFEST_NOT_PERSISTED_DISPATCH_SURFACE",
    "NO_RAW_METADATA_MANIFEST_VALIDATOR_DISPATCH_BLOCKED_PENDING_MANIFEST_INSTANCE_AND_PERSISTED_SURFACE",
    "The current no-raw metadata manifest is not a persisted/dispatch surface.",
    "The current no-raw metadata manifest validator remains a helper/export only.",
  ]);
});

test("prerequisite statuses appear and remain unsatisfied by this boundary", () => {
  assertIncludesAll([
    "MANIFEST_INSTANCE_BOUNDARY_REQUIRED",
    "ACTIVE_METADATA_ACQUISITION_PATH_REQUIRED",
    "PERSISTED_DISPATCH_SURFACE_REQUIRED",
    "RUNTIME_API_CONSUMER_SCOPE_REQUIRED_IF_RUNTIME_USE_IS_PROPOSED",
    "DISPATCH_SURFACE_PROOF_TEST_REQUIRED",
    "NO_RAW_OUTPUT_PRESERVED",
    "VALIDATION_WITHOUT_CONCLUSION_PRESERVED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "These prerequisite statuses are not satisfied by this boundary.",
  ]);
});

test("comparison classifications appear", () => {
  assertIncludesAll([
    "COMPARISON_EVIDENCE_ONLY",
    "NOT_APPLICABLE_AUTHORIZATION_MODEL",
    "VALIDATOR_HELPER_ONLY_NOT_DISPATCH_SURFACE",
    "CONTRACT_SURFACE_ONLY_NOT_RUNTIME_SURFACE",
    "These classifications do not activate validator dispatch",
  ]);
});

test("blocked actions appear only as blocked or must-not-use language", () => {
  const blockedSection = sectionBetween(
    "## Blocked / Must-Not-Use Actions And Statuses",
    "## Non-Proof And No-Conclusion Rules",
  );

  for (const status of [
    "VALIDATOR_DISPATCH_CREATED",
    "VALIDATOR_REGISTRY_CREATED",
    "GENERIC_LOOKUP_CREATED",
    "PERSISTED_SURFACE_ASSUMED",
    "MANIFEST_INSTANCE_CREATED",
    "MANIFEST_POPULATED",
    "METADATA_ACQUIRED",
    "ACTUAL_MATRIX_CREATED",
    "RUNTIME_API_BEHAVIOR_CREATED",
    "SOURCE_INSPECTION_AUTHORIZED",
    "PDF_IMAGE_METADATA_SOURCE_PACKAGE_OPENED",
    "PER_CHUNK_METADATA_INFERRED",
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
  assert.match(blockedSection, /They do not create facts, conclusions, validator dispatch/i);
});

test("non-proof and no-conclusion rules are frozen", () => {
  assertIncludesAll([
    "Validator dispatch readiness is not dispatch creation.",
    "Validator dispatch readiness is not runtime enforcement.",
    "Validator dispatch readiness is not source completeness proof.",
    "Validator dispatch readiness is not truth proof.",
    "Validator dispatch readiness is not legal/clinical/evidentiary proof.",
    "Validator dispatch readiness is not external-use readiness.",
    "Validator dispatch readiness is not product-candidate selection.",
    "Validator existence is not manifest existence.",
    "Validator existence is not metadata acquisition.",
    "Validator existence is not actual matrix creation.",
    "Schema/export/validator existence is not source review.",
    "Gate-001 row count `20` remains package/process context only, not per-chunk metadata and not proof.",
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
