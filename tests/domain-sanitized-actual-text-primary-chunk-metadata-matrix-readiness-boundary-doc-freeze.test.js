const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.join(__dirname, "..");
const docsPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_SANITIZED_ACTUAL_TEXT_PRIMARY_CHUNK_METADATA_MATRIX_READINESS_BOUNDARY_v1.md",
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

test("sanitized actual text-primary chunk metadata readiness boundary exists and is DOCS_ONLY", () => {
  assert.equal(fs.existsSync(docsPath), true);

  const docsText = readText(docsPath);

  assert.match(
    docsText,
    /# Sanitized Actual Text-Primary Chunk Metadata Matrix Readiness Boundary/,
  );
  assert.match(
    docsText,
    /Boundary name: `SANITIZED_ACTUAL_TEXT_PRIMARY_CHUNK_METADATA_MATRIX_READINESS_BOUNDARY`/,
  );
  assert.match(docsText, /Status: `DOCS_ONLY`/);
  assert.match(docsText, /readiness-only/i);
});

test("boundary does not create real matrix proof matrix private processing or source inspection", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "It does not create a real source review matrix.",
    "It is not an evidence/proof matrix.",
    "It does not authorize actual private source processing.",
    "It does not authorize PDF, image, screenshot, metadata, source package, or original source inspection.",
    "It does not authorize raw text review.",
    "It does not authorize a real large-source private run.",
    "It does not authorize external-use readiness.",
    "It does not select a product candidate.",
    "It does not authorize creating that actual metadata/status matrix in this slice.",
  ]);
});

test("chunk identifiers and sanitized period representation are bounded", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "chunk_001",
    "chunk_002",
    "chunk_003",
    "chunk_004",
    "chunk_005",
    "The approximately five-year source span may be represented only through sanitized period buckets or chunk-period labels, not sensitive dates.",
  ]);

  assert.doesNotMatch(docsText, /\b\d{4}-\d{2}-\d{2}\b/);
});

test("allowed readiness metadata fields are present", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "chunk_id",
    "chunk_period_bucket",
    "chunk_availability_status",
    "sanitized_row_count_status",
    "sanitized_marker_count_status",
    "source_layer_status",
    "readiness_status",
    "privacy_blocker_status",
    "counter_context_status",
    "unresolved_pointer_status",
    "human_professional_review_status",
    "validation_without_conclusion_status",
  ]);
});

test("count summaries are allowed only if safely evidenced and otherwise require review", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "Row count summaries or marker count summaries may be represented only if already safely evidenced without raw text, private facts, source locators, exact dates, filenames, page references, PDF/image/metadata content, or sensitive details.",
    "If row count or marker count summaries are not safely evidenced, they must be marked:",
    "COUNT_SUMMARY_NOT_EVIDENCED",
    "REQUIRES_HUMAN_PROFESSIONAL_REVIEW",
  ]);
});

test("raw private locator file path page URL media package and sensitive details are blocked", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "Actual marker text must not be included.",
    "Actual raw excerpts must not be included.",
    "Private facts must not be included.",
    "Exact dates must not be included.",
    "Source locators must not be included.",
    "Filenames, private paths, page references, URLs/tokens must not be included.",
    "PDF, image, metadata, and source package content must not be included.",
    "Sensitive event details must not be included.",
  ]);

  assert.doesNotMatch(docsText, /\/Users\//);
  assert.doesNotMatch(docsText, /https?:\/\//i);
  assert.doesNotMatch(docsText, /\b\d{4}-\d{2}-\d{2}\b/);
});

test("allowed readiness statuses are present", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "READY_FOR_SANITIZED_METADATA_REVIEW",
    "TEXT_PRIMARY_CHUNK_ID_ONLY",
    "SANITIZED_PERIOD_BUCKET_ONLY",
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
    "COUNTER_CONTEXT_REQUIRED",
    "PRIVACY_BLOCKER",
    "UNRESOLVED_POINTER_FAIL_CLOSED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "VALIDATION_WITHOUT_CONCLUSION",
  ]);
});

test("blocked statuses appear only in blocked or must-not-use section", () => {
  const docsText = readText(docsPath);
  const blockedSection = sectionBetween(
    docsText,
    "## Blocked / Must-Not-Use Statuses",
    "## Preserved Review Safeguards",
  );
  const preBlockedSection = docsText.slice(
    0,
    docsText.indexOf("## Blocked / Must-Not-Use Statuses"),
  );

  const blockedStatuses = [
    "REAL_MATRIX_CREATED",
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
    "The following statuses are blocked and must not be used as readiness outcomes:",
    "These blocked statuses are listed only as must-not-use statuses.",
  ]);
  assertIncludesAll(blockedSection, blockedStatuses);

  for (const status of blockedStatuses) {
    const exactStatus = new RegExp(`\`${status}\``);
    assert.equal(
      exactStatus.test(preBlockedSection),
      false,
      `${status} must not appear before the blocked section`,
    );
  }
});

test("review safeguards are preserved", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "The readiness boundary preserves text-primary-first review.",
    "The readiness boundary preserves sanitized period buckets.",
    "The readiness boundary preserves source-universe status.",
    "The readiness boundary preserves counter-context status.",
    "The readiness boundary preserves privacy blocker status.",
    "The readiness boundary preserves unresolved pointer fail-closed behavior.",
    "The readiness boundary preserves layer conflict fail-closed behavior.",
    "Human/professional review remains the release gate.",
    "Validation-without-conclusion remains required.",
  ]);
});

test("non-proof rules are explicit", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "Metadata, timestamps, read receipts, repetition, silence, filenames, page positions, source-layer proximity, period overlap, chunk proximity, row counts, and marker counts are not proof.",
    "Chunks are not proof.",
    "Count summaries are not proof.",
    "Marker counts are not marker findings.",
  ]);
});

test("forbidden conclusions readiness limits and no reopening boundaries are explicit", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "Actual private source processing remains unauthorized.",
    "Raw text review remains unauthorized.",
    "PDF, image, screenshot, metadata, source package, and original source inspection remain unauthorized.",
    "Real large-source private run remains unauthorized.",
    "Data-handling unknowns remain unresolved and not bypassed.",
    "External-use remains unauthorized.",
    "Product candidate remains none.",
    "legal, clinical, evidentiary, case-truth, credibility, victim-status, perpetrator-status, offence, ownership, risk, sufficiency, police-report, pleading, external-use, diagnosis, trauma-diagnosis, or product-candidate conclusions",
    "SWE_BODELNING",
    "DK_PSYKISK_VOLD` offence modelling",
    "SWE_PSYKISKT_VALD` legal modelling",
    "Nordic comparison",
    "runtime behavior",
    "schemas",
    "API behavior",
    "package implementation",
    "external-use readiness",
    "real large-source private run",
    "PDF/image/metadata/source inspection",
    "product-candidate selection",
  ]);
});
