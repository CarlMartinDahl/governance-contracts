const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.join(__dirname, "..");
const docsPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_SWE_BODELNING_EXTERNAL_USE_REDACTION_AND_OMBUD_REVIEW_GATE_v1.md",
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

test("external-use redaction and ombud-review gate doc exists and freezes DOCS_ONLY status", () => {
  assert.equal(fs.existsSync(docsPath), true);

  const docsText = readText(docsPath);

  assert.match(docsText, /# SWE_BODELNING External Use Redaction And Ombud Review Gate/);
  assert.match(docsText, /Status: `DOCS_ONLY`/);
  assert.match(docsText, /external-use redaction and ombud-review gate/i);
  assert.match(docsText, /This document is documentation only\./);
});

test("core rule prevents review-ready material from being treated as external-ready", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "REVIEW_READY` is not `EXTERNAL_READY",
    "CORE_REVIEW` is not `SEND_AS_IS",
    "SUPPORTING_REVIEW` is not `LEGAL_ARGUMENT",
    "FORMAL_RECORD` is not `OWNERSHIP_CONCLUSION",
    "ADMITTED_FACT` is not `LEGAL_CONCLUSION",
    "PRIVATE_REVIEW_ONLY` must not be externally shared as-is",
  ]);
});

test("required external-use classifications row structure and redaction levels are explicit", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "READY_AFTER_REDACTION",
    "READY_AFTER_STRICT_REDACTION",
    "SUMMARY_ONLY",
    "PRIVATE_REVIEW_ONLY",
    "NEEDS_OMBUD_REVIEW",
    "DO_NOT_USE_EXTERNALLY",
    "REVIEW_ID",
    "SOURCE_FAMILY",
    "INTERNAL_REVIEW_STATUS",
    "EXTERNAL_USE_CLASSIFICATION",
    "REDACTION_LEVEL",
    "OMBUD_REVIEW_REQUIRED",
    "SAFE_PUBLIC_SUMMARY",
    "PRIVATE_DETAILS_TO_REMOVE",
    "HUMAN_REVIEW_GATE",
    "MUST_NOT_CONCLUDE",
    "LOW_REDACTION",
    "MEDIUM_REDACTION",
    "HIGH_REDACTION",
    "STRICT_REDACTION",
    "SUMMARY_ONLY_REDACTION",
    "PRIVATE_ONLY_NO_EXTERNAL_USE",
  ]);
});

test("special source-family rules and strict-handling classes are explicit", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "raw message exports",
    "narrow lifecycle message windows",
    "bank/transfer documents",
    "account/payment materials",
    "identity images",
    "signatures",
    "tax/source-status documents",
    "counterparty protocols",
    "family-transfer image/message provenance",
    "debt authority materials",
    "email headers and ticket references",
    "Core financial/payment source",
    "Later lifecycle/refinance-planning signal",
    "Family-transfer image/message provenance",
    "Counterparty protocol",
    "layer-separated summary only",
    "Formal register/title/pant",
    "Formal title is not hidden-co-ownership conclusion.",
    "Formal title is not proof against hidden co-ownership by itself.",
    "Tax/source-status documents",
  ]);
});

test("allowed transformation external-use forbidden list and required package files are explicit", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "SOURCE FACT PRESERVED",
    "PRIVATE IDENTIFIER REDACTED",
    "RAW PATH REMOVED",
    "UNRELATED PRIVATE CONTEXT OMITTED",
    "LEGAL CONCLUSION BLOCKED",
    "SUMMARY_ONLY_ALLOWED",
    "DO_NOT_QUOTE_RAW",
    "raw full message exports",
    "raw 2025-type post-dispute exports",
    "raw bank transfer confirmations",
    "private tax URLs/tokens",
    "counterparty protocol broad quotations",
    "internal working-ledger labels",
    "local context handoffs",
    "private source packages",
    "private worksheets",
    "EXTERNAL_USE_CLASSIFICATION_TABLE.md",
    "OMBUD_REVIEW_QUEUE.md",
    "STRICT_REDACTION_PLAN.md",
    "SUMMARY_ONLY_SOURCE_ROWS.md",
    "PRIVATE_REVIEW_ONLY_SOURCE_ROWS.md",
    "DO_NOT_USE_EXTERNALLY.md",
    "SAFE_PUBLIC_SUMMARY_DRAFT.md",
    "NO_CONCLUSION_BOUNDARY.md",
  ]);
});

test("pass criteria failure modes and relation to prior safeguards are explicit", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "every source row has external-use classification",
    "every row has redaction level",
    "every row has ombud-review flag",
    "every row has must-not-conclude boundary",
    "source references are not treated as proof",
    "core-review does not become send-as-is",
    "supporting-review does not become legal argument",
    "no final submission text is generated",
    "treating `CORE_REVIEW` as external-ready",
    "sharing private review package as-is",
    "quoting raw message export broadly",
    "including identity image details",
    "including transaction IDs or account numbers",
    "preserving private URLs/tokens",
    "treating counterparty protocol as neutral truth",
    "treating formal register as legal conclusion",
    "turning supporting signal into ownership argument",
    "omitting ombud-review gate",
    "omitting no-conclusion boundary",
    "generating final submission text",
    "The lifecycle recall sweep finds signals.",
    "The signal preservation boundary keeps them concrete.",
    "The anonymized stress test exercises both.",
    "The counterparty/formal matrix separates factual admissions, legal positions, formal records, and source references.",
    "The external-use gate decides what can leave private review and in what form.",
  ]);
});

test("forbidden outputs and non-implementation boundaries are explicit", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "source references are not proof",
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
  ]);
});

test("privacy rule and external-use boundary are explicit", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "raw phone-number filenames",
    "transaction IDs",
    "transfer references",
    "account numbers",
    "IBAN/BIC",
    "CPR/personnummer",
    "full private addresses",
    "private URLs/tokens",
    "private bank identifiers",
    "raw email addresses unless reviewed and necessary",
    "identity document details",
    "signatures unless approved",
    "private case identifiers",
    "It must not convert review readiness into external-use readiness by default.",
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
