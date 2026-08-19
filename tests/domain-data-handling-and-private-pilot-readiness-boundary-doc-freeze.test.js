const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.join(__dirname, "..");
const docsPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_DATA_HANDLING_AND_PRIVATE_PILOT_READINESS_BOUNDARY_v1.md",
);

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function assertIncludesAll(text, entries) {
  for (const entry of entries) {
    assert.match(text, new RegExp(entry.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"));
  }
}

test("data-handling and private-pilot readiness boundary doc exists and is DOCS_ONLY", () => {
  assert.equal(fs.existsSync(docsPath), true);

  const docsText = readText(docsPath);

  assert.match(
    docsText,
    /# Data-Handling And Private-Pilot Readiness Boundary/,
  );
  assert.match(
    docsText,
    /Contract name: `DATA_HANDLING_AND_PRIVATE_PILOT_READINESS_BOUNDARY`/,
  );
  assert.match(docsText, /Status: `DOCS_ONLY`/);
  assert.match(docsText, /This document is documentation only\./);
});

test("synthetic or sanitized pilot planning only is frozen", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "This boundary governs readiness for synthetic or sanitized private pilot planning only.",
    "SYNTHETIC_OR_SANITIZED_PILOT_PLANNING_ONLY",
    "A synthetic or sanitized pilot may use only non-raw, non-private, non-identifying, synthetic or sanitized material.",
    "Pilot output must use marker, pointer, and review-route language only.",
    "MARKER_POINTER_ONLY",
    "VALIDATION_WITHOUT_CONCLUSION",
  ]);
});

test("real private source processing and raw inspection remain unauthorized", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "It does not authorize a real large-source private run.",
    "It does not authorize processing the actual 1.8 GB source package.",
    "It does not authorize raw message, image, screenshot, or metadata inspection.",
    "REAL_LARGE_SOURCE_RUN_NOT_AUTHORIZED",
    "RAW_MATERIAL_ROUTING_NOT_AUTHORIZED",
    "NO_RAW_OUTPUT",
    "Pilot planning must not authorize raw message, image, screenshot, metadata, package, or source inspection.",
  ]);
});

test("data-handling unknowns and third-party model status are not bypassed", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "DATA_HANDLING_UNKNOWN_NOT_BYPASSED",
    "THIRD_PARTY_MODEL_STATUS_UNKNOWN_NOT_BYPASSED",
    "retention",
    "encryption",
    "audit logs",
    "deletion",
    "role permissions",
    "raw-material routing",
    "third-party model/API status",
    "access control beyond documented route/case-access behavior",
    "If data-handling unknowns are unresolved, the model must not escalate from synthetic or sanitized pilot planning to real private source processing.",
    "If third-party model/API status is unknown, the model must not authorize raw or private material routing to that model/API.",
    "If retention, deletion, encryption, audit-log status, role permissions, or raw-material routing status is unknown, the model must mark the item as unresolved and stop before real-run authorization.",
  ]);
});

test("no-raw output and layered source navigation safeguards are preserved", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "raw replay",
    "raw messages",
    "private facts",
    "source locators",
    "filenames",
    "private paths",
    "page references",
    "URLs/tokens",
    "sensitive dates",
    "medical details",
    "intimate details",
    "child details",
    "third-party details",
    "text-primary first",
    "no raw by default",
    "source-universe declaration",
    "counter-context preservation",
    "privacy blockers",
    "unresolved pointer fail-closed behavior",
    "layer conflict fail-closed behavior",
    "human/professional review gate",
  ]);
});

test("integrity checks cannot authorize proof or raw-run escalation", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "Hash, manifest, ZIP, table, checksum, and package integrity signals are process and reproducibility context only.",
    "Hash, manifest, ZIP, table, checksum, and package integrity must not be treated as truth proof, legal proof, clinical proof, evidentiary proof, credibility proof, or authorization to process raw material.",
  ]);
});

test("forbidden conclusion categories and blocked statuses are explicit", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "REAL_SOURCE_RUN_AUTHORIZED",
    "RAW_MATERIAL_APPROVED",
    "EXTERNAL_USE_READY",
    "PRODUCT_CANDIDATE_SELECTED",
    "LEGAL_CONCLUSION",
    "CLINICAL_CONCLUSION",
    "EVIDENTIARY_CONCLUSION",
    "VICTIM_CONFIRMED",
    "PERPETRATOR_CONFIRMED",
    "RISK_SCORE",
    "SUFFICIENCY_SCORE",
    "POLICE_REPORT_READY",
    "PLEADING_READY",
    "legal, clinical, evidentiary, credibility, victim-status, perpetrator-status, offence, ownership, risk, sufficiency, police-report, pleading, external-use, diagnosis, trauma-diagnosis, or product-candidate conclusions",
  ]);
});

test("human review and no-reopening boundaries are frozen", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "Human/professional review remains the release gate.",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
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
    "product-candidate selection",
  ]);
});
