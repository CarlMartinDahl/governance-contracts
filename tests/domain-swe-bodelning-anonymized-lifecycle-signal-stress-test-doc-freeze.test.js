const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.join(__dirname, "..");
const docsPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_SWE_BODELNING_ANONYMIZED_LIFECYCLE_SIGNAL_STRESS_TEST_v1.md",
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

test("anonymized lifecycle signal stress test doc exists and freezes DOCS_ONLY status", () => {
  assert.equal(fs.existsSync(docsPath), true);

  const docsText = readText(docsPath);

  assert.match(docsText, /# SWE_BODELNING Anonymized Lifecycle Signal Stress Test/);
  assert.match(docsText, /Status: `DOCS_ONLY`/);
  assert.match(docsText, /anonymized lifecycle signal stress test/i);
  assert.match(docsText, /This document is documentation only\./);
});

test("synthetic scenario and purpose cover lifecycle recall and signal preservation together", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "avoid target-only appendix anchoring",
    "perform lifecycle recall",
    "find later source-family lifecycle signals",
    "preserve concrete review-relevant signal facts in redacted summaries",
    "separate source/provenance from legal conclusions",
    "keep output human-review-only",
    "Party A and Party B are spouses",
    "A dwelling was formally acquired by Party B alone",
    "Party A claims the dwelling was a joint housing project",
    "Party B disputes hidden co-ownership",
    "A Formal Register shows Party B as sole formal holder",
    "Party A made two documented payments before acquisition",
    "Party B had a prior loan that was closed before acquisition",
    "A Third-Party Lender loan was used in connection with the acquisition",
    "A Family Transfer Image source exists but no raw bank export is available",
    "Later correspondence discusses partial payment, more time for the remaining amount, salary increase/new salary, and possible mortgage/refinance handling",
    "A Debt Authority payment/recall source exists",
    "counterparty protocol both disputes the legal conclusion and confirms some factual finance events",
  ]);
});

test("source universe lifecycle sweep matrix and later loan-resolution correspondence are explicit", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "Synthetic Source Universe",
    "Message Anchors",
    "Financial / Acquisition Sources",
    "Lifecycle Sources",
    "Provenance-Gated Sources",
    "Excluded / Noisy Sources",
    "Required Lifecycle Sweep Matrix",
    "Source family",
    "Origination/funding signal",
    "Implementation/closure signal",
    "Later management/refinance/repayment signal",
    "Counterparty admission/explanation signal",
    "Formal record signal",
    "Expected status",
    "Must not conclude",
    "later loan-resolution correspondence",
    "Party A payments / prior-loan closure chain",
    "bank/home-acquisition message chain",
    "third-party loan acquisition-financing chain",
    "debt payment/status/recall chain",
    "Family Transfer Image provenance chain",
    "formal-title/register chain",
    "counterparty protocol chain",
  ]);
});

test("later lifecycle signal preserves concrete review facts and supporting-only classification", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "partial payment",
    "remaining amount",
    "request for more time",
    "salary increase / new salary",
    "Bank Contact",
    "possible mortgage handling",
    "possible refinance",
    "relation to Third-Party Lender loan",
    "supporting-only classification",
    "no bank approval conclusion",
    "no actual refinancing proof",
    "no ownership conclusion",
    "25,000 units",
    "60,000 units",
    "synthetic placeholders only",
  ]);
});

test("acceptable and failing redacted output examples are explicit", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "Expected Redacted Evidence-Readiness Output",
    "The Third-Party Lender acquisition loan is supplemented by a later narrow message window where Party B discusses partial payment, more time for the remaining amount, salary increase/new salary, and possible mortgage/refinance handling.",
    "This is a supporting lifecycle signal only.",
    "It does not prove ownership, bank approval, or actual refinancing.",
    "The loan was later discussed.",
    "The source is financial context.",
    "Later management appears.",
    "These fail because they erase the review-relevant signal.",
  ]);
});

test("required statuses source universe and not-found versus not-searched rules are explicit", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "FOUND_RELEVANT_SOURCE_FAMILY_LIFECYCLE_SIGNAL",
    "SIGNAL_PRESERVED_READY_FOR_HUMAN_REVIEW",
    "SIGNAL_PRESERVED_SUPPORTING_ONLY",
    "SIGNAL_TOO_ABSTRACT_REQUIRES_ENRICHMENT",
    "NOT_SEARCHED_BY_SCOPE",
    "NOT_FOUND_AFTER_TARGETED_SEARCH",
    "FOUND_RELEVANT_REQUIRES_HUMAN_REVIEW",
    "MANUAL_SELECTION_IF_BANK_PROOF_NEEDED",
    "PROVENANCE_GATED",
    "HOLD_FOR_PROVENANCE_ONLY",
    "ACCEPT_FOR_CORE_REVIEW",
    "ACCEPT_FOR_SUPPORTING_REVIEW",
    "BACKGROUND_CONTEXT",
    "PRIVATE_REVIEW_ONLY",
    "SUMMARY_ONLY",
    "SOURCE_UNIVERSE_DECLARATION",
    "If raw bank export was not searched, status must be `NOT_SEARCHED_BY_SCOPE`, not `NOT_FOUND_AFTER_TARGETED_SEARCH`.",
    "If family-transfer bank export is unavailable locally, status must be `NOT_LOCAL` or `MANUAL_SELECTION_IF_BANK_PROOF_NEEDED`, not proof-closed.",
    "If later correspondence was not searched, the package must not claim full lifecycle readiness.",
    "If later correspondence was searched and a signal is found, it must be recorded as `FOUND_RELEVANT_SOURCE_FAMILY_LIFECYCLE_SIGNAL`.",
  ]);
});

test("counterparty factual admission versus legal position and formal record separation are explicit", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "ADMITTED_FACT",
    "DISPUTED_FACT",
    "COUNTERPARTY_LEGAL_POSITION",
    "FORMAL_RECORD",
    "SOURCE_REFERENCE",
    "HUMAN_REVIEW_GATE",
    "MUST_NOT_CONCLUDE",
    "A counterparty may confirm factual events while disputing legal consequences.",
    "preserve factual confirmations without converting them into legal conclusions",
    "Formal Register",
    "formal-title/register chain",
  ]);
});

test("privacy boundedness forbidden outputs and non-implementation boundaries are explicit", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "no raw phone-number filenames",
    "no transaction IDs",
    "no account numbers",
    "no private URLs/tokens",
    "no full addresses",
    "no CPR/personnummer",
    "no private bank identifiers",
    "no unrelated intimate/medical/psychological/family-conflict content",
    "only narrow source windows",
    "no broad private dumps",
    "proof of hidden co-ownership",
    "ownership determination",
    "legal advice",
    "sufficiency scoring",
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
  ]);
});

test("pass criteria and failure modes cover the intended stress test", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "Pass Criteria",
    "identifies the later loan-resolution lifecycle signal",
    "preserves concrete signal facts",
    "classifies it as supporting only",
    "preserves no-proof/no-ownership/no-bank-approval/no-actual-refinancing boundaries",
    "separates counterparty admissions from legal position",
    "distinguishes not-found from not-searched",
    "keeps raw/private/noisy material out",
    "includes source-universe declaration",
    "includes human-review gates",
    "Failure Modes",
    "target-only appendix review",
    "early-event-only timeline",
    "omitting later correspondence",
    "saying not found when not searched",
    "summarizing concrete signal as vague \"financial context\"",
    "treating formal title as ownership conclusion",
    "treating counterparty admission as legal conclusion",
    "treating Family Transfer Image as bank proof",
    "including raw private identifiers",
    "blending psychological-violence material",
    "generating final submission text",
  ]);
});

test("private case strings and private-path style content are absent", () => {
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
