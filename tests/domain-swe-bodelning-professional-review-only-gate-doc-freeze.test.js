const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.join(__dirname, "..");
const docsPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_SWE_BODELNING_PROFESSIONAL_REVIEW_ONLY_GATE_v1.md",
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

test("professional-review-only gate doc exists and freezes DOCS_ONLY status", () => {
  assert.equal(fs.existsSync(docsPath), true);

  const docsText = readText(docsPath);

  assert.match(docsText, /# SWE_BODELNING Professional Review Only Gate/);
  assert.match(docsText, /Status: `DOCS_ONLY`/);
  assert.match(docsText, /professional-review-only gate/i);
  assert.match(docsText, /This document is documentation only\./);
});

test("core professional-review status labels are explicit", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "PROFESSIONAL_REVIEW_ONLY",
    "NO_OMBUD_PRESENT_SCOPE_UNCHANGED",
    "NOT_SELF_REPRESENTED_FILING",
    "OMBUD_REVIEW_REQUIRED",
    "HUMAN_LEGAL_REVIEW_REQUIRED",
    "DIRECT_EXTERNAL_USE_BLOCKED",
    "SHARE_CANDIDATE_REQUIRES_PROFESSIONAL_APPROVAL",
    "CLEAN_SUMMARY_NOT_FINAL_SUBMISSION",
    "PRIVATE_REVIEW_NOT_EXTERNAL_USE",
  ]);
});

test("no-ombud rule does not change model scope", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "NO_OMBUD_PRESENT` does not change model scope",
    "If the user lacks ombud, outputs must remain in professional-review posture.",
    "seek professional review if possible",
    "use this only as private organization",
    "do not treat as final filing",
    "do not submit raw materials without redaction and review",
    "file this as-is",
    "use this as legal argument",
    "this proves ownership",
    "this is sufficient evidence",
    "this is how you should litigate the case",
  ]);
});

test("share-candidate and clean-summary boundaries are explicit", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "A share-candidate package is not a filing package.",
    "A clean ombud cover summary is not a self-represented submission.",
    "review-only",
    "not final",
    "not legal advice",
    "not proof",
    "not ownership determination",
    "not sufficiency assessment",
    "subject to professional/human approval",
    "This material is prepared for professional/human legal review.",
    "It is not a legal submission, not final filing text, not legal advice, not proof, and not an ownership determination.",
  ]);
});

test("role separation and forbidden outputs are explicit", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "source/provenance organization",
    "review-readiness classification",
    "redaction planning",
    "ombud-review preparation",
    "safe question lists for professional review",
    "no-conclusion summaries",
    "legal advice",
    "direct filing instruction",
    "final legal argument",
    "litigation strategy",
    "ownership outcome",
    "proof conclusion",
    "evidentiary sufficiency score",
    "credibility finding",
    "final submission text",
    "proof of hidden co-ownership",
    "ownership determination",
    "evidentiary sufficiency scoring",
    "final submission drafting",
    "direct self-represented filing instruction",
    "actual_swedish_samaganderatt_decision_logic",
  ]);
});

test("non-implementation boundaries are explicit", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "It does not create runtime behavior.",
    "It does not create schema changes.",
    "It does not create semantic-fact mapping.",
    "It does not create legal advice.",
    "It does not create ownership determination.",
    "It does not create sufficiency scoring.",
    "It does not create a proof conclusion.",
    "It does not create a credibility finding.",
    "It does not draft final submissions.",
    "It does not create a self-represented filing tool.",
    "It does not implement `actual_swedish_samaganderatt_decision_logic`.",
  ]);
});

test("relation to prior safeguards is explicit", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "The lifecycle recall sweep finds signals.",
    "The redacted review signal preservation boundary keeps them concrete.",
    "The anonymized stress test exercises those behaviors.",
    "The counterparty/formal matrix separates facts, positions, formal records, and source references.",
    "The external-use redaction gate decides what can leave private review and in what form.",
    "The professional-review-only gate ensures all outputs remain for ombud/jurist/human legal review rather than self-represented filing.",
  ]);
});

test("privacy rule is explicit", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "raw phone-number filenames",
    "transaction IDs",
    "account numbers",
    "IBAN/BIC",
    "CPR/personnummer",
    "full private addresses",
    "private URLs/tokens",
    "private bank identifiers",
    "raw email addresses unless reviewed",
    "identity document details",
    "signatures unless approved",
    "unrelated intimate/medical/psychological/family-conflict material",
    "private case identifiers",
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
