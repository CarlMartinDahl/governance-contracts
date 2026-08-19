const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.join(__dirname, "..");
const docsPath = path.join(
  repoRoot,
  "docs",
  "SYNTHETIC_SANITIZED_SOURCE_SUPPORT_REVIEW_MATRIX_EXAMPLE_v1.md",
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

test("synthetic sanitized source-support review matrix example exists and is DOCS_ONLY", () => {
  assert.equal(fs.existsSync(docsPath), true);

  const docsText = readText(docsPath);

  assert.match(
    docsText,
    /# Synthetic\/Sanitized Source-Support Review Matrix Example/,
  );
  assert.match(
    docsText,
    /Example name: `SYNTHETIC_SANITIZED_SOURCE_SUPPORT_REVIEW_MATRIX_EXAMPLE`/,
  );
  assert.match(docsText, /Status: `DOCS_ONLY`/);
  assert.match(docsText, /synthetic\/sanitized example matrix/i);
});

test("example remains synthetic only and not real source review or proof matrix", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "It does not create a real source review matrix.",
    "It is not an evidence/proof matrix.",
    "This example is a synthetic/sanitized example matrix only.",
    "It must use synthetic placeholder values only.",
    "It must not use actual material from the user's five-year source set.",
    "The following rows are synthetic placeholders only. They are not real source review rows.",
  ]);
});

test("required row fields are present", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "chunk_id",
    "chunk_period_bucket",
    "text_marker_id",
    "marker_family",
    "neutral_review_signal",
    "text_layer_status",
    "clean_pdf_pointer_status",
    "original_media_metadata_pointer_status",
    "source_universe_status",
    "counter_context_status",
    "privacy_blocker_status",
    "unresolved_pointer_status",
    "layer_conflict_status",
    "human_professional_review_status",
    "validation_without_conclusion_status",
    "forbidden_inference_guard",
    "matrix_row_status",
  ]);
});

test("at least three synthetic rows and required placeholders are present", () => {
  const docsText = readText(docsPath);
  const exampleRows = sectionBetween(
    docsText,
    "## Synthetic Example Matrix",
    "## Blocked / Must-Not-Use Statuses",
  );

  assert.match(exampleRows, /`chunk_001`/);
  assert.match(exampleRows, /`chunk_002`/);
  assert.match(exampleRows, /`chunk_003`/);

  assertIncludesAll(exampleRows, [
    "PERIOD_BUCKET_001",
    "PERIOD_BUCKET_002",
    "PERIOD_BUCKET_003",
    "TEXT_MARKER_SYNTHETIC_001",
    "TEXT_MARKER_SYNTHETIC_002",
    "TEXT_MARKER_SYNTHETIC_003",
    "MARKER_FAMILY_SYNTHETIC_A",
    "MARKER_FAMILY_SYNTHETIC_B",
    "MARKER_FAMILY_SYNTHETIC_C",
    "NEUTRAL_REVIEW_SIGNAL_SYNTHETIC",
    "NO_PROOF_NO_CONCLUSION",
  ]);
});

test("allowed statuses are demonstrated", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "TEXT_MARKER_PRESENT",
    "REVIEW_ROUTE_OPENED",
    "PDF_POINTER_PENDING",
    "PDF_POINTER_UNRESOLVED",
    "ORIGINAL_MEDIA_METADATA_NOT_OPENED_BY_DEFAULT",
    "ORIGINAL_MEDIA_METADATA_REVIEW_NEEDED",
    "SOURCE_LAYER_NOT_SEARCHED_BY_SCOPE",
    "COUNTER_CONTEXT_REQUIRED",
    "PRIVACY_BLOCKER",
    "LAYER_CONFLICT_FAIL_CLOSED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "VALIDATION_WITHOUT_CONCLUSION",
  ]);
});

test("blocked statuses appear only in blocked or must-not-use sections and not in example rows", () => {
  const docsText = readText(docsPath);
  const exampleRows = sectionBetween(
    docsText,
    "## Synthetic Example Matrix",
    "## Blocked / Must-Not-Use Statuses",
  );

  const blockedStatuses = [
    "PROOF_FOUND",
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

  assertIncludesAll(docsText, [
    "## Blocked / Must-Not-Use Statuses",
    "These blocked statuses are listed only as must-not-use statuses.",
  ]);
  assertIncludesAll(docsText, blockedStatuses);

  for (const status of blockedStatuses) {
    assert.equal(
      exampleRows.includes(status),
      false,
      `${status} must not appear in synthetic example rows`,
    );
  }
});

test("raw private source locator and package content are excluded", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "It must not use real raw text, private facts, exact dates, source locators, source filenames, absolute paths, page references, URLs/tokens, PDF content, image content, screenshot content, metadata content, source package content, or sensitive event details.",
    "They do not represent real events, real messages, real people, real source files, exact dates, page references, URLs/tokens, PDF content, image content, screenshot content, metadata content, or source package content.",
    "The example must not emit raw source material by default or by example.",
  ]);

  assert.doesNotMatch(docsText, /\/Users\//);
  assert.doesNotMatch(docsText, /https?:\/\//i);
  assert.doesNotMatch(docsText, /\b\d{4}-\d{2}-\d{2}\b/);
});

test("text-primary first layered safeguards are preserved without opening PDF image metadata or source packages", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "The example preserves text-primary-first review and sanitized period buckets or chunk-period labels only.",
    "Clean PDF pointer statuses are demonstrated without opening any PDF.",
    "Original media/metadata pointer statuses are demonstrated without opening any image, screenshot, metadata, source package, or original source material.",
    "PDF, image, screenshot, metadata, source package, and original source inspection remain unauthorized.",
  ]);
});

test("context privacy fail-closed human review and validation boundaries are preserved", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "The example preserves source-universe status.",
    "The example preserves counter-context status.",
    "The example preserves privacy blocker status.",
    "The example preserves unresolved pointer fail-closed status.",
    "The example preserves layer conflict fail-closed status.",
    "If a synthetic text marker cannot be mapped to a clean PDF pointer, the example must mark the pointer unresolved and must not infer content.",
    "If synthetic layers conflict, the example must fail closed and require human/professional review.",
    "Human/professional review remains the release gate.",
    "Validation-without-conclusion remains required.",
  ]);
});

test("non-proof rules and readiness blockers are preserved", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "Metadata, timestamps, read receipts, repetition, silence, filenames, page positions, source-layer proximity, period overlap, and chunk proximity are not proof.",
    "Chunks are not proof.",
    "Real large-source private run remains unauthorized.",
    "Data-handling unknowns remain unresolved and not bypassed.",
    "Raw output remains unauthorized.",
  ]);
});

test("forbidden conclusion categories and no-reopening boundaries are explicit", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
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
