const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.join(__dirname, "..");
const docsPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_SAFE_METADATA_ACQUISITION_PATH_BOUNDARY_v1.md",
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

test("safe metadata acquisition path boundary exists and is DOCS_ONLY", () => {
  assert.equal(fs.existsSync(docsPath), true);

  const docsText = readText(docsPath);

  assert.match(docsText, /# Safe Metadata Acquisition Path Boundary/);
  assert.match(docsText, /Boundary name: `SAFE_METADATA_ACQUISITION_PATH_BOUNDARY`/);
  assert.match(docsText, /Status: `DOCS_ONLY`/);
  assert.match(docsText, /safe metadata acquisition path boundary/i);
});

test("boundary does not acquire metadata or authorize source processing", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "This boundary defines safe metadata acquisition paths only.",
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
  ]);
});

test("acquisition path classifications are frozen", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "Manual Human/Professional Review Attestation",
    "Classification: `DOCS_ONLY_CONCEPT_ONLY`",
    "allowed only as a future path if separately specified",
    "Separately Generated No-Raw Metadata Manifest",
    "Classification: `HYPOTHETICAL_UNTIL_CONTRACTED`",
    "may become allowed only after a separate contract or boundary",
    "Deterministic Preprocessor Output",
    "may become allowed only after a separate contract or boundary and test evidence",
    "must be deterministic, no-raw, auditable, and validation-without-conclusion",
    "Reviewed Chunk Ledger",
    "may become allowed only after a separate ledger boundary and proof test",
    "Other Documented No-Raw Mechanism",
    "Classification: `ABSENT_NOT_AVAILABLE`",
    "not usable until separately documented, reviewed, and tested",
  ]);
});

test("blocked acquisition paths prevent inference", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "inference from chunk identifiers",
    "inference from Gate-001 classification row count `20`",
    "inference from approximately five-year period span",
    "inference from synthetic examples",
    "inference from marker families",
    "inference from source layer proximity",
    "inference from filenames",
    "inference from page positions",
    "inference from metadata",
    "inference from timestamps",
    "inference from read receipts",
    "inference from repetition",
    "inference from silence",
    "inference from user assertion",
    "inference from broad privacy waiver",
    "The model must not infer per-chunk metadata from any blocked acquisition path.",
  ]);
});

test("future metadata conditions preserve no raw private locator date media package and review gates", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "NO_RAW_TEXT_INCLUDED",
    "NO_PRIVATE_FACTS_INCLUDED",
    "NO_SOURCE_LOCATOR_INCLUDED",
    "NO_EXACT_DATES_INCLUDED",
    "PDF_IMAGE_METADATA_NOT_OPENED",
    "SOURCE_PACKAGE_NOT_OPENED",
    "VALIDATION_WITHOUT_CONCLUSION",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "They do not authorize metadata acquisition, actual private source processing, raw text review, PDF/image/metadata/source package inspection, real large-source private run, external-use readiness, product-candidate selection, or actual matrix creation.",
  ]);

  assert.doesNotMatch(docsText, /\/Users\//);
  assert.doesNotMatch(docsText, /https?:\/\//i);
  assert.doesNotMatch(docsText, /\b\d{4}-\d{2}-\d{2}\b/);
});

test("Gate-001 row count and chunk identifiers remain bounded", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "Gate-001 classification row count `20` remains package/process context only.",
    "Gate-001 classification row count `20` is not per-chunk metadata.",
    "Gate-001 classification row count `20` is not proof.",
    "Sanitized chunk identifiers may be referenced only as identifiers:",
    "chunk_001",
    "chunk_002",
    "chunk_003",
    "chunk_004",
    "chunk_005",
    "The existence of chunk identifiers does not evidence chunk availability.",
    "No actual sanitized text-primary chunk metadata/status matrix may be created until a safe acquisition path is separately approved and safe metadata evidence exists.",
    "Any future actual matrix requires separate explicit approval.",
  ]);
});

test("source-adjacent signals and counts are not proof", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "Metadata is not proof.",
    "Timestamps are not proof.",
    "Read receipts are not proof.",
    "Repetition is not proof.",
    "Silence is not proof.",
    "Filenames are not proof.",
    "Page positions are not proof.",
    "Source-layer proximity is not proof.",
    "Period overlap is not proof.",
    "Chunk proximity is not proof.",
    "Row counts are not proof.",
    "Marker counts are not proof.",
    "Gate-001 package row count is not proof.",
    "Marker counts are not marker findings.",
    "Count summaries are not proof.",
  ]);
});

test("blocked statuses appear only in blocked or must-not-use section", () => {
  const docsText = readText(docsPath);
  const blockedSection = sectionBetween(
    docsText,
    "## Blocked / Must-Not-Use Statuses",
    "## Forbidden Conclusions",
  );

  const statuses = [
    "METADATA_ACQUIRED_BY_INFERENCE",
    "PER_CHUNK_METADATA_INFERRED",
    "COUNT_SUMMARY_INFERRED",
    "MARKER_COUNT_INFERRED",
    "PERIOD_BUCKET_INFERRED",
    "CHUNK_AVAILABILITY_INFERRED",
    "RAW_TEXT_INCLUDED",
    "PRIVATE_FACTS_INCLUDED",
    "EXACT_DATES_INCLUDED",
    "SOURCE_LOCATOR_INCLUDED",
    "PDF_OPENED",
    "IMAGE_METADATA_OPENED",
    "SOURCE_PACKAGE_OPENED",
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

test("forbidden conclusion categories are blocked", () => {
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
  ]);
});

test("non-reopening rules are frozen", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "This boundary does not reopen `SWE_BODELNING`.",
    "This boundary does not reopen `DK_PSYKISK_VOLD` offence modelling.",
    "This boundary does not reopen `SWE_PSYKISKT_VALD` legal modelling.",
    "This boundary does not reopen Nordic comparison.",
    "This boundary does not reopen runtime.",
    "This boundary does not reopen schemas.",
    "This boundary does not reopen API.",
    "This boundary does not reopen package implementation.",
    "This boundary does not reopen external-use readiness.",
    "This boundary does not reopen real large-source private run.",
    "This boundary does not reopen PDF/image/metadata/source inspection.",
    "This boundary does not reopen product-candidate selection.",
  ]);
});
