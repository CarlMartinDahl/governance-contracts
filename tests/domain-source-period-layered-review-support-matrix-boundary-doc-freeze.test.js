const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.join(__dirname, "..");
const docsPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_SOURCE_PERIOD_LAYERED_REVIEW_SUPPORT_MATRIX_BOUNDARY_v1.md",
);

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function assertIncludesAll(text, entries) {
  for (const entry of entries) {
    assert.match(text, new RegExp(entry.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"));
  }
}

test("source-period layered review-support matrix boundary doc exists and is DOCS_ONLY", () => {
  assert.equal(fs.existsSync(docsPath), true);

  const docsText = readText(docsPath);

  assert.match(
    docsText,
    /# Source-Period Layered Review-Support Matrix Boundary/,
  );
  assert.match(
    docsText,
    /Contract name: `SOURCE_PERIOD_LAYERED_REVIEW_SUPPORT_MATRIX_BOUNDARY`/,
  );
  assert.match(docsText, /Status: `DOCS_ONLY`/);
  assert.match(docsText, /This document is documentation only\./);
});

test("matrix purpose is review-support only and blocks proof-matrix treatment", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "sanitized review-support matrix procedure, not an evidence/proof matrix",
    "Chunks are not proof.",
    "Matrix rows are not proof.",
    "Period overlap is not proof.",
    "The matrix must not include raw text excerpts.",
    "The matrix must not include private facts, source locators, source filenames, absolute paths, sensitive dates, page references, URLs/tokens, medical details, intimate details, child details, third-party details, or raw package content.",
  ]);
});

test("5 chunks and five-year span are allowed only as sanitized inputs and buckets", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "already processed text-primary layer split into 5 chunks as sanitized text-primary inputs",
    "approximately five-year source span may be represented only through sanitized period buckets or chunk-period labels, not sensitive dates",
    "`already processed text-primary chunks`",
    "`sanitized period bucket or chunk-period label`",
    "`neutral marker inventory`",
  ]);
});

test("SWE_BODELNING comparison evidence is bounded and not reopened", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "The `SWE_BODELNING`-specific five-year/five-chunk corpus workflow is comparison evidence only.",
    "This boundary does not generalize that `SWE_BODELNING` corpus workflow into this matrix boundary.",
    "This boundary does not reopen `SWE_BODELNING`.",
    "The separate `SWE_BODELNING` comparison rule that chunks are not proof remains preserved.",
  ]);
});

test("allowed row fields and statuses are frozen", () => {
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

test("text-primary-first pointer routing is bounded to clean PDF and protected media metadata review need", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "The matrix must preserve text-primary-first review.",
    "The matrix may record neutral markers and marker families only as review signals.",
    "Clean PDF pointer-route status may be opened from sanitized text-primary chunk markers.",
    "Protected original media/metadata pointer-route status may be opened only if needed for human/professional review.",
    "This status language does not authorize opening protected original media, images, screenshots, metadata, or original source material.",
    "It does not authorize source package, PDF, image, screenshot, metadata, or original source inspection.",
    "It does not authorize opening the actual PDF, image, screenshot, metadata, or original source material.",
  ]);
});

test("source-universe, counter-context, privacy, unresolved pointer, and conflict rules are frozen", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "searched",
    "not searched",
    "not searched by scope",
    "unavailable",
    "requires human/professional review",
    "The matrix must preserve counter-context requirements across chunks and periods.",
    "The matrix must preserve privacy blockers.",
    "The matrix must preserve unresolved pointer fail-closed status.",
    "The matrix must preserve layer conflict fail-closed status.",
    "If a chunk marker cannot be mapped to the clean PDF layer, the matrix must mark pointer unresolved, not infer content.",
    "If a clean PDF pointer cannot be mapped to original media/metadata, the matrix must mark pointer unresolved, not infer content.",
    "If layers conflict, the matrix must fail closed and require human/professional review.",
  ]);
});

test("insufficient markers and non-proof signals cannot become conclusions", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "If markers are insufficient, the matrix must not say nothing happened.",
    "If markers are insufficient, the matrix must not say the user was not exposed.",
    "metadata, timestamps, read receipts, repetition, silence, filenames, page positions, source-layer proximity, period overlap, and chunk proximity are not proof",
    "The matrix must not turn text markers, marker repetition, chunk proximity, period overlap, source-layer proximity, source-universe declarations, pointer status, privacy blockers, or unresolved pointers into proof.",
  ]);
});

test("blocked statuses and forbidden conclusion categories are explicit", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
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
    "legal, clinical, evidentiary, case-truth, credibility, victim-status, perpetrator-status, offence, ownership, risk, sufficiency, police-report, pleading, external-use, diagnosis, trauma-diagnosis, or product-candidate conclusions",
  ]);
});

test("human review, real-run, data-handling, and no-reopening boundaries are frozen", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "Human/professional review remains the release gate.",
    "Real large-source private run remains unauthorized.",
    "Data-handling unknowns remain unresolved and not bypassed.",
    "PDF, image, screenshot, metadata, source package, and original source inspection remain unauthorized unless separately approved.",
    "Raw output remains unauthorized.",
    "SWE_BODELNING",
    "DK_PSYKISK_VOLD` offence modelling",
    "SWE_PSYKISKT_VALD` legal modelling",
    "Nordic comparison",
    "runtime behavior",
    "schemas",
    "API behavior",
    "package implementation",
    "external-use readiness",
    "PDF packet generation",
    "archive/ZIP generation",
    "real large-source private run",
    "product-candidate selection",
  ]);
});
