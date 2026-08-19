const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.join(__dirname, "..");
const docsPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_SWE_BODELNING_REDACTED_REVIEW_SIGNAL_PRESERVATION_BOUNDARY_v1.md",
);

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function assertIncludesAll(text, entries) {
  for (const entry of entries) {
    assert.match(text, new RegExp(entry.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"));
  }
}

function assertNotIncludesAll(text, entries) {
  for (const entry of entries) {
    assert.doesNotMatch(
      text,
      new RegExp(entry.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"),
    );
  }
}

test("redacted review signal-preservation boundary doc exists and freezes DOCS_ONLY status", () => {
  assert.equal(fs.existsSync(docsPath), true);

  const docsText = readText(docsPath);

  assert.match(docsText, /# SWE_BODELNING Redacted Review Signal Preservation Boundary/);
  assert.match(docsText, /Status: `DOCS_ONLY`/);
  assert.match(docsText, /redacted review signal-preservation boundary/i);
  assert.match(docsText, /This document freezes a documentation-only product boundary\./);
});

test("purpose and problem boundary prevent over-abstraction after lifecycle signals are found", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "A redacted review package must preserve concrete review-relevant source signals.",
    "Redaction must remove private identifiers and unrelated private material, but must not abstract away the material source signal that makes an item relevant for human review.",
    "A lifecycle signal can be found but later weakened by over-redaction or over-abstraction.",
    "later loan-management",
    "financial context",
    "message context",
    "supporting source",
    "The problem is not only privacy leakage.",
    "The problem is also signal loss.",
  ]);
});

test("signal preservation rule and minimum signal tuple are explicit", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "source family",
    "lifecycle stage",
    "approximate date or narrow time window",
    "type of source",
    "concrete action or event",
    "material amount or category of amount",
    "role of the parties using neutral labels",
    "relation to the core chain",
    "use classification",
    "remaining human-review gate",
    "no-conclusion boundary",
    "Minimum Signal Tuple",
    "REVIEW_ID",
    "SOURCE_FAMILY",
    "LIFECYCLE_STAGE",
    "SOURCE_WINDOW",
    "REVIEW_SIGNAL",
    "USE_CLASSIFICATION",
    "REDACTION_REQUIRED",
    "HUMAN_REVIEW_GATE",
    "MUST_NOT_CONCLUDE",
  ]);
});

test("redaction versus impermissible abstraction distinction is frozen", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "REDACT_PRIVATE_IDENTIFIER",
    "REDACT_RAW_PATH",
    "REDACT_UNRELATED_PRIVATE_CONTEXT",
    "PRESERVE_REVIEW_SIGNAL",
    "SIGNAL_TOO_ABSTRACT_REQUIRES_ENRICHMENT",
    "SIGNAL_PRESERVED_READY_FOR_HUMAN_REVIEW",
    "Removing account numbers is redaction.",
    "Removing private URLs/tokens is redaction.",
    "Removing unrelated intimate or medical content is redaction.",
    "Removing the fact that a partial payment was discussed is impermissible abstraction.",
    "Removing the fact that a salary increase or mortgage/refinance handling was discussed is impermissible abstraction",
    "Removing the fact that a source is only supporting and not proof is impermissible boundary loss.",
  ]);
});

test("material concrete facts and supporting-only boundaries remain preserved when safe", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "partial-payment amount",
    "remaining amount",
    "request for more time",
    "salary increase / new salary",
    "mortgage handling",
    "bank contact",
    "possible refinance",
    "loan closure",
    "debt recall / withdrawal",
    "third-party confirmation",
    "counterparty explanation",
    "source provenance type",
    "original/export not found",
    "manual source-selection gate",
    "supporting-only",
    "no-proof boundary",
    "no bank approval conclusion is allowed",
    "no actual refinancing proof is allowed",
  ]);
});

test("safe statuses privacy rule and required package checklist are explicit", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "SIGNAL_PRESERVED_READY_FOR_HUMAN_REVIEW",
    "SIGNAL_TOO_ABSTRACT_REQUIRES_ENRICHMENT",
    "SIGNAL_PRESERVED_SUPPORTING_ONLY",
    "SIGNAL_PRESERVED_BACKGROUND_ONLY",
    "SIGNAL_REDACTED_PRIVATE_REVIEW_ONLY",
    "SIGNAL_REQUIRES_MANUAL_SOURCE_SELECTION",
    "SIGNAL_NOT_INCLUDED_SCOPE_LIMITATION",
    "raw phone-number filenames",
    "transaction IDs",
    "transfer references",
    "account numbers",
    "IBAN/BIC",
    "CPR/personnummer",
    "full private addresses",
    "private URLs/tokens",
    "private bank identifiers",
    "raw email addresses unless necessary and reviewed",
    "private case identifiers",
    "SOURCE_UNIVERSE_DECLARATION.md",
    "SOURCE_FAMILY_LIFECYCLE_SWEEP.md",
    "LIFECYCLE_SIGNALS_FOUND.md",
    "SOURCE_SELECTION_MATRIX.md",
    "SIGNAL_PRESERVATION_CHECKLIST.md",
    "NOT_SEARCHED_SCOPE_LIMITATIONS.md",
    "HUMAN_REVIEW_FOLLOW_UPS.md",
    "EXTERNAL_USE_REDACTION_PLAN.md",
  ]);
});

test("human-review-only boundary lifecycle relation and checklist questions are explicit", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "human source/provenance review",
    "source selection",
    "redaction planning",
    "working-ledger organization",
    "possible later human-drafted submission planning",
    "They must not become automatic conclusions.",
    "The lifecycle recall sweep helps find signals.",
    "ensures found signals are not lost in redacted summaries",
    "Both boundaries are required before a redacted evidence-readiness package can be treated as mature for human review.",
    "Does the summary preserve the actual source-family signal?",
    "Does it preserve material amounts or partial-payment facts where relevant?",
    "Does it preserve later management/refinance/repayment planning facts?",
    "Does it preserve the source’s use classification?",
    "Does it preserve human-review gates?",
    "Does it preserve no-conclusion boundaries?",
    "Did redaction remove only private identifiers and unrelated private context?",
    "Did redaction accidentally remove the reason the source matters?",
  ]);
});

test("anonymized examples cover redacted signal preservation without private facts", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "Example A",
    "A third-party loan used at acquisition later appears in post-acquisition correspondence discussing partial payment, remaining balance, salary increase, and possible mortgage refinancing.",
    "Example B",
    "A family transfer appears in a message-image source.",
    "original bank/export proof remains manually gated",
    "Example C",
    "A debt-clearance payment later appears in a third-party recall or withdrawal confirmation.",
    "payment/status/recall sequence and no legal-effect conclusion",
    "Example D",
    "A formal title document shows registered ownership.",
    "must not convert it into hidden-co-ownership conclusion",
  ]);
});

test("forbidden outputs and non-implementation boundaries remain explicit", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "proof of hidden co-ownership",
    "ownership determination",
    "legal advice",
    "evidentiary sufficiency scoring",
    "credibility finding",
    "final submission drafting",
    "runtime decision logic",
    "actual_swedish_samaganderatt_decision_logic",
    "psychological-violence blending",
    "DK/SWE comparison",
    "Nordic comparison",
    "It does not create runtime behavior.",
    "It does not create schema changes.",
    "It does not create semantic-fact mapping.",
    "It does not create legal advice.",
    "It does not create ownership determination.",
    "It does not create sufficiency scoring.",
    "It does not create a proof conclusion.",
    "It does not draft final submissions.",
  ]);
});

test("private case strings and private-case labels are absent", () => {
  const docsText = readText(docsPath);

  assertNotIncludesAll(docsText, [
    "Named Private Person",
    "Private Case Label",
    "Private Street Address",
    "Private Financial Identifier",
    "synthetic-phone-number",
    "local-sync-directory",
    "private-message-export",
  ]);
});
