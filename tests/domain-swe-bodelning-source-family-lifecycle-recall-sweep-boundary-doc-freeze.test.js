const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.join(__dirname, "..");
const docsPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_SWE_BODELNING_SOURCE_FAMILY_LIFECYCLE_RECALL_SWEEP_BOUNDARY_v1.md",
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

test("source-family lifecycle recall sweep boundary doc exists and freezes DOCS_ONLY status", () => {
  assert.equal(fs.existsSync(docsPath), true);

  const docsText = readText(docsPath);

  assert.match(docsText, /# SWE_BODELNING Source-Family Lifecycle Recall Sweep Boundary/);
  assert.match(docsText, /Status: `DOCS_ONLY`/);
  assert.match(docsText, /source-family lifecycle recall sweep is required/i);
  assert.match(docsText, /not runtime implementation/i);
  assert.match(docsText, /not schema behavior/i);
});

test("anti-anchoring rule and source-universe declaration are frozen", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "reduce anchoring on",
    "user-selected appendices",
    "already-submitted documents",
    "already-known source candidates",
    "filenames created by one party",
    "first-pass package contents",
    "early-event-only evidence",
    "Anti-Anchoring Rule",
    "cannot be marked `FULL_SOURCE_REVIEW_PACKAGE_READY_FOR_HUMAN_REVIEW`",
    "LIFECYCLE_RECALL_SWEEP_NOT_PERFORMED_SCOPE_LIMITATION",
    "Source-Universe Declaration",
    "which corpora were searched",
    "which corpora were not searched",
    "whether later correspondence was searched",
    "whether after-dispute correspondence was searched",
  ]);
});

test("lifecycle stages, source-family classes, and temporal sweep requirement are explicit", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "ORIGINATION",
    "FUNDING",
    "IMPLEMENTATION",
    "CLOSURE",
    "LATER_MANAGEMENT",
    "REFINANCE_OR_REPAYMENT_PLANNING",
    "DISPUTE_OR_DENIAL",
    "THIRD_PARTY_CONFIRMATION",
    "COUNTERPARTY_ADMISSION_OR_EXPLANATION",
    "family transfer / third-party transfer",
    "party payment / contribution",
    "bank loan",
    "bridge loan",
    "association loan",
    "private loan",
    "pledge / pant / formal-title source",
    "debt-clearance source",
    "message-anchor source",
    "counterparty protocol/process-context source",
    "Temporal Sweep Requirement",
    "before the acquisition",
    "during acquisition",
    "after acquisition",
    "during later management",
    "during dispute separation",
    "during post-dispute protocol/response phase",
  ]);
});

test("later management, refinance, repayment planning, and multilingual search terms are frozen", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "later repayment planning",
    "later refinance planning",
    "later partial-payment discussions",
    "later loan-management correspondence",
    "loan",
    "repay",
    "solve",
    "amortize",
    "refinance",
    "extend time",
    "remaining amount",
    "partial payment",
    "new salary",
    "mortgage",
    "bank contact",
    "bank approval",
    "later handling",
    "lån",
    "lösa",
    "betala",
    "amortera",
    "delbetala",
    "förlänga tid",
    "resterande belopp",
    "löneökning",
    "ny lön",
    "bolån",
    "baka in",
    "tilbagebetaling",
    "gæld",
  ]);
});

test("not-found versus not-searched statuses and safe output statuses remain distinct", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "NOT_FOUND_AFTER_TARGETED_SEARCH",
    "NOT_SEARCHED_BY_SCOPE",
    "NOT_LOCAL",
    "FOUND_BUT_OUT_OF_SCOPE",
    "FOUND_RELEVANT_REQUIRES_HUMAN_REVIEW",
    "FOUND_RELEVANT_SOURCE_FAMILY_LIFECYCLE_SIGNAL",
    "wrongly treated as absent when it was merely outside scope",
    "SOURCE_FAMILY_LIFECYCLE_SWEEP_READY_FOR_HUMAN_REVIEW",
    "SOURCE_FAMILY_LIFECYCLE_SIGNAL_FOUND_READY_FOR_HUMAN_REVIEW",
    "SOURCE_FAMILY_LIFECYCLE_SWEEP_NEEDS_MANUAL_SELECTION",
    "SOURCE_FAMILY_LIFECYCLE_SWEEP_NOT_PERFORMED_SCOPE_LIMITATION",
    "SOURCE_FAMILY_LIFECYCLE_SWEEP_TOO_AMBIGUOUS",
    "SOURCE_FAMILY_LIFECYCLE_SIGNAL_FOUND_SUPPORTING_ONLY",
    "SOURCE_FAMILY_LIFECYCLE_SIGNAL_FOUND_BACKGROUND_ONLY",
  ]);
});

test("privacy-limited search rule and required package checklist are explicit", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "Privacy-Limited Search Rule",
    "must be bounded",
    "must not dump broad private conversations",
    "must not inspect unrelated intimate, medical, psychological, or family material unless explicitly in scope",
    "must isolate narrow source windows and redact them",
    "raw phone-number filenames",
    "transaction IDs",
    "account numbers",
    "private URLs/tokens",
    "CPR/personnummer",
    "full addresses",
    "private bank identifiers",
    "SOURCE_UNIVERSE_DECLARATION.md",
    "SOURCE_FAMILY_LIFECYCLE_SWEEP.md",
    "LIFECYCLE_SIGNALS_FOUND.md",
    "NOT_SEARCHED_SCOPE_LIMITATIONS.md",
    "HUMAN_REVIEW_FOLLOW_UPS.md",
  ]);
});

test("forbidden outputs and human-review-only boundary remain explicit", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "proof of hidden co-ownership",
    "final ownership determination",
    "legal advice",
    "evidentiary sufficiency scoring",
    "credibility finding",
    "final submission drafting",
    "runtime decision logic",
    "actual_swedish_samaganderatt_decision_logic",
    "psychological-violence blending",
    "DK/SWE comparison",
    "Nordic comparison",
    "source/provenance support",
    "working-ledger support",
    "human legal/product review material",
    "must not become automatic conclusions",
  ]);
});

test("anonymized examples cover lifecycle recall without private facts", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "Example A",
    "third-party loan used at acquisition later appears in a post-acquisition message",
    "partial repayment, salary increase, and possible mortgage refinancing",
    "Example B",
    "debt-clearance payment later appears in a third-party withdrawal/recall confirmation",
    "Example C",
    "family transfer appears in a message/image provenance source but not in bank-export form",
    "Example D",
    "formal-title record appears to show sole title",
    "Formal title is not by itself a hidden-co-ownership decision.",
  ]);

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

test("product boundary blocks runtime schema implementation and legal conclusions", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "This document freezes a documentation-only product boundary.",
    "It does not create runtime behavior.",
    "It does not create schema changes.",
    "It does not create semantic-fact mapping.",
    "It does not create legal advice.",
    "It does not create ownership determination.",
    "It does not create sufficiency scoring.",
    "It does not create a proof conclusion.",
    "It does not draft final submissions.",
    "It does not implement `actual_swedish_samaganderatt_decision_logic`.",
    "contains no case-specific examples",
  ]);
});
