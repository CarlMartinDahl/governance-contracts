const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.join(__dirname, "..");
const docsPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_ACTUAL_CHUNK_METADATA_AVAILABILITY_GAP_BOUNDARY_v1.md",
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

test("actual chunk metadata availability gap boundary exists and is DOCS_ONLY", () => {
  assert.equal(fs.existsSync(docsPath), true);

  const docsText = readText(docsPath);

  assert.match(docsText, /# Actual Chunk Metadata Availability Gap Boundary/);
  assert.match(
    docsText,
    /Boundary name: `ACTUAL_CHUNK_METADATA_AVAILABILITY_GAP_BOUNDARY`/,
  );
  assert.match(docsText, /Status: `DOCS_ONLY`/);
  assert.match(docsText, /availability-gap boundary/i);
});

test("boundary does not create matrices or authorize private source processing", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "This boundary records an availability gap only.",
    "It does not create a real source review matrix.",
    "It does not create an evidence/proof matrix.",
    "It does not authorize actual private source processing.",
    "It does not authorize raw text review.",
    "It does not authorize PDF/image/metadata/source package inspection.",
    "It does not authorize a real large-source private run.",
    "It does not authorize external-use readiness.",
    "It does not select a product candidate.",
    "Product candidate remains none.",
  ]);
});

test("chunk identifiers are allowed only as identifiers and metadata is not evidenced", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "Sanitized chunk identifiers may be referenced only as allowed identifiers:",
    "chunk_001",
    "chunk_002",
    "chunk_003",
    "chunk_004",
    "chunk_005",
    "These chunk identifiers are not evidence that per-chunk metadata exists.",
    "per-chunk availability status",
    "per-chunk sanitized period bucket assignment",
    "per-chunk row count",
    "per-chunk marker count",
  ]);
});

test("Gate-001 row count is package process context only and missing counts require review", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "Gate-001 classification row count `20` may be referenced only as package/process context.",
    "Gate-001 classification row count `20` is not per-chunk metadata.",
    "Gate-001 classification row count `20` is not proof.",
    "Missing counts must be marked:",
    "COUNT_SUMMARY_NOT_EVIDENCED",
    "MARKER_COUNT_NOT_EVIDENCED",
    "REQUIRES_HUMAN_PROFESSIONAL_REVIEW",
  ]);
});

test("inference from chunk names package row count period span marker families or examples is blocked", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "The model must not infer counts from chunk names, package row count, period span, marker families, or synthetic examples.",
    "The model must not infer period buckets from the approximately five-year span.",
    "The model must not infer chunk availability from the existence of chunk identifiers.",
    "The model must not create per-chunk metadata from inference.",
    "The model must not create a sanitized actual text-primary chunk metadata/status matrix from inference.",
    "The actual sanitized text-primary chunk metadata/status matrix remains absent.",
    "Any later actual matrix requires separate explicit approval and safe metadata evidence.",
  ]);
});

test("raw private locator file path page URL media package and sensitive details are blocked", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "Raw text remains excluded.",
    "Actual marker text remains excluded.",
    "Private facts remain excluded.",
    "Exact dates remain excluded.",
    "Source locators remain excluded.",
    "Filenames/private paths remain excluded.",
    "Page references remain excluded.",
    "URLs/tokens remain excluded.",
    "PDF content remains excluded.",
    "Image content remains excluded.",
    "Metadata content remains excluded.",
    "Source package content remains excluded.",
    "Sensitive event details remain excluded.",
  ]);

  assert.doesNotMatch(docsText, /\/Users\//);
  assert.doesNotMatch(docsText, /https?:\/\//i);
  assert.doesNotMatch(docsText, /\b\d{4}-\d{2}-\d{2}\b/);
});

test("counts chunks period buckets and source-adjacent signals are not proof", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "Row counts are not proof.",
    "Marker counts are not proof.",
    "Chunks are not proof.",
    "Period buckets are not proof.",
    "Gate-001 package row count is not proof.",
    "Metadata, timestamps, read receipts, repetition, silence, filenames, page positions, source-layer proximity, period overlap, and chunk proximity are not proof.",
    "Marker counts are not marker findings.",
  ]);
});

test("allowed gap statuses are present", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "CHUNK_IDENTIFIER_ALLOWED_ONLY",
    "PER_CHUNK_AVAILABILITY_NOT_EVIDENCED",
    "PER_CHUNK_PERIOD_BUCKET_NOT_EVIDENCED",
    "COUNT_SUMMARY_NOT_EVIDENCED",
    "MARKER_COUNT_NOT_EVIDENCED",
    "REQUIRES_HUMAN_PROFESSIONAL_REVIEW",
    "NO_RAW_TEXT_INCLUDED",
    "NO_PRIVATE_FACTS_INCLUDED",
    "NO_SOURCE_LOCATOR_INCLUDED",
    "PDF_IMAGE_METADATA_NOT_OPENED",
    "SOURCE_PACKAGE_NOT_OPENED",
    "VALIDATION_WITHOUT_CONCLUSION",
  ]);
});

test("blocked statuses appear only in blocked or must-not-use section", () => {
  const docsText = readText(docsPath);
  const blockedSection = sectionBetween(
    docsText,
    "## Blocked / Must-Not-Use Statuses",
    "## Forbidden Conclusions",
  );

  assertIncludesAll(blockedSection, [
    "REAL_MATRIX_CREATED",
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
    "These blocked statuses are listed only as blocked / must-not-use statuses.",
  ]);

  const beforeBlocked = docsText.slice(0, docsText.indexOf("## Blocked / Must-Not-Use Statuses"));
  for (const status of [
    "REAL_MATRIX_CREATED",
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
  ]) {
    const wholeStatusPattern = new RegExp(`(^|[^A-Z0-9_])${status}([^A-Z0-9_]|$)`);
    assert.equal(
      wholeStatusPattern.test(beforeBlocked),
      false,
      `${status} appeared before blocked section`,
    );
  }
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
