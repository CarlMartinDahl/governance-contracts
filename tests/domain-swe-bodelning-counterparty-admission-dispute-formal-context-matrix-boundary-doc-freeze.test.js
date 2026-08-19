const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.join(__dirname, "..");
const docsPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_SWE_BODELNING_COUNTERPARTY_ADMISSION_DISPUTE_FORMAL_CONTEXT_MATRIX_BOUNDARY_v1.md",
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

test("counterparty admission dispute formal context matrix boundary doc exists and freezes DOCS_ONLY status", () => {
  assert.equal(fs.existsSync(docsPath), true);

  const docsText = readText(docsPath);

  assert.match(
    docsText,
    /# SWE_BODELNING Counterparty Admission Dispute Formal Context Matrix Boundary/,
  );
  assert.match(docsText, /Status: `DOCS_ONLY`/);
  assert.match(docsText, /counterparty admission \/ dispute \/ formal-context matrix boundary/i);
  assert.match(docsText, /This document is documentation only\./);
});

test("required categories and row structure are explicit", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "ADMITTED_FACT",
    "DISPUTED_FACT",
    "COUNTERPARTY_LEGAL_POSITION",
    "FORMAL_RECORD",
    "SOURCE_REFERENCE",
    "THIRD_PARTY_CONFIRMATION",
    "HUMAN_REVIEW_GATE",
    "MUST_NOT_CONCLUDE",
    "REVIEW_ID",
    "SOURCE_TYPE",
    "SOURCE_FAMILY",
    "STATEMENT_OR_RECORD_SUMMARY",
    "CATEGORY",
    "WHAT_IT_SUPPORTS_FOR_REVIEW",
    "REDACTION_REQUIRED",
    "EXTERNAL_USE_CLASSIFICATION",
  ]);
});

test("admission versus legal position rule and formal record rule are explicit", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "A factual admission can support source/provenance review.",
    "A legal position is not a fact.",
    "A formal record is not a legal conclusion.",
    "A counterparty’s denial does not erase factual confirmations.",
    "A counterparty’s factual confirmation does not prove the legal conclusion.",
    "Formal title is not ownership conclusion.",
    "ownership determination",
    "proof against hidden co-ownership",
    "proof of hidden co-ownership",
    "final legal conclusion",
  ]);
});

test("counterparty protocol separation and mixed-layer warning are explicit", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "Counterparty Protocol",
    "factual confirmations",
    "disputed facts",
    "legal positions",
    "formal records referenced",
    "source documents referenced",
    "human-review questions",
    "counterparty denies claim",
    "counterparty confirms claim",
    "Both are too abstract when mixed facts and positions are present.",
    "Mixed protocol requires layer separation.",
    "MIXED_PROTOCOL_REQUIRES_LAYER_SEPARATION",
  ]);
});

test("anonymized source family examples are explicit", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "Example A",
    "Family Transfer",
    "ADMITTED_FACT for receipt/use",
    "COUNTERPARTY_LEGAL_POSITION for disputed connection",
    "MUST_NOT_CONCLUDE no ownership determination",
    "Example B",
    "Third-Party Loan",
    "THIRD_PARTY_CONFIRMATION",
    "MUST_NOT_CONCLUDE no legal conclusion",
    "Example C",
    "Formal Register",
    "FORMAL_RECORD",
    "FORMAL_STRUCTURE_CONTEXT",
    "formal title is not by itself a hidden-co-ownership decision",
    "Example D",
    "Bank Contact",
    "ADMITTED_FACT or `COUNTERPARTY_EXPLANATION` for reason given",
    "no automatic legal effect",
  ]);
});

test("interaction with safeguards statuses and package effects are explicit", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "The lifecycle recall sweep finds lifecycle signals.",
    "The redacted review signal preservation boundary keeps concrete facts from being abstracted away.",
    "The anonymized lifecycle stress test exercises both.",
    "All four are complementary.",
    "COUNTERPARTY_MATRIX_READY_FOR_HUMAN_REVIEW",
    "ADMITTED_FACT_READY_FOR_HUMAN_REVIEW",
    "DISPUTED_FACT_REQUIRES_HUMAN_REVIEW",
    "COUNTERPARTY_LEGAL_POSITION_RECORDED",
    "FORMAL_RECORD_CONTEXT_ONLY",
    "SOURCE_REFERENCE_REQUIRES_PROVENANCE_REVIEW",
    "FORMAL_TITLE_NOT_OWNERSHIP_CONCLUSION",
    "FACTUAL_ADMISSION_NOT_LEGAL_CONCLUSION",
    "COUNTERPARTY_DENIAL_NOT_FACTUAL_NEGATION",
    "COUNTERPARTY_ADMISSION_DISPUTE_MATRIX.md",
    "FORMAL_RECORD_CONTEXT_MATRIX.md",
    "SOURCE_REFERENCE_PROVENANCE_FOLLOW_UPS.md",
    "MUST_NOT_CONCLUDE_BOUNDARY.md",
  ]);
});

test("pass criteria forbidden outputs privacy and non-implementation boundaries are explicit", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "source/provenance review only",
    "records source references without treating them as proof",
    "preserves human-review gates",
    "preserves no-conclusion boundaries",
    "avoids credibility findings",
    "avoids legal advice",
    "avoids private identifiers",
    "proof of hidden co-ownership",
    "ownership determination",
    "legal advice",
    "evidentiary sufficiency scoring",
    "credibility finding",
    "final submission drafting",
    "actual_swedish_samaganderatt_decision_logic",
    "psychological-violence blending",
    "DK/SWE comparison",
    "Nordic comparison",
    "no raw phone-number filenames",
    "transaction IDs",
    "account numbers",
    "IBAN/BIC",
    "CPR/personnummer",
    "full private addresses",
    "private URLs/tokens",
    "private bank identifiers",
    "It does not create runtime behavior.",
    "It does not create schema changes.",
    "It does not create semantic-fact mapping.",
    "It does not create legal advice.",
    "It does not create ownership determination.",
    "It does not create sufficiency scoring.",
  ]);
});

test("failure modes cover the intended boundary", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "treating counterparty denial as factual negation",
    "treating counterparty admission as legal conclusion",
    "treating formal title as final ownership conclusion",
    "treating formal title as proof against hidden co-ownership",
    "treating family transfer admission as bank/export proof",
    "summarizing mixed protocol too broadly",
    "omitting disputed-fact layer",
    "omitting human-review gate",
    "making credibility finding",
    "generating final submission text",
    "blending psychological-violence material",
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
