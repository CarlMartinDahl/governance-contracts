const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.join(__dirname, "..");
const docsPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_DK_PSYKISK_VOLD_EVIDENCE_READINESS_REVIEW_SIGNAL_BOUNDARY_v1.md",
);
const dkSourceInventoryPath = path.join(
  repoRoot,
  "docs",
  "LEGAL_SOURCE_INVENTORY_DK_PSYKISK_VOLD_v1.md",
);
const dkLabelScaffoldPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_DK_PSYKISK_VOLD_NEUTRAL_LABEL_SCAFFOLD_v1.md",
);
const sweSourceInventoryPath = path.join(
  repoRoot,
  "docs",
  "LEGAL_SOURCE_INVENTORY_SWE_PSYKISKT_VALD_v1.md",
);

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function normalizeWhitespace(text) {
  return text.replace(/\s+/g, " ");
}

function assertIncludesAll(text, entries) {
  for (const entry of entries) {
    const escapedEntry = entry.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    assert.match(text, new RegExp(escapedEntry, "i"));
  }
}

function assertNormalizedIncludesAll(text, entries) {
  const normalizedText = normalizeWhitespace(text);

  for (const entry of entries) {
    const escapedEntry = entry.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    assert.match(normalizedText, new RegExp(escapedEntry, "i"));
  }
}

function forbiddenPhrasePattern(parts) {
  const escapedParts = parts.map((part) =>
    part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
  );
  return new RegExp(escapedParts.join("\\s+"), "i");
}

test("DK review-signal boundary doc exists and freezes DOCS_ONLY status", () => {
  assert.equal(fs.existsSync(docsPath), true);

  const docsText = readText(docsPath);

  assert.match(
    docsText,
    /# DK_PSYKISK_VOLD evidence-readiness review-signal boundary/,
  );
  assert.match(docsText, /Status:\s+DOCS_ONLY\./);
  assert.match(
    docsText,
    /Freeze safe source-backed review-signal and evidence-readiness recommendation boundaries for `DK_PSYKISK_VOLD`/i,
  );
  assert.match(docsText, /not legal advice/i);
  assert.match(docsText, /not offence determination/i);
  assert.match(docsText, /not diagnosis/i);
  assert.match(docsText, /not risk scoring/i);
  assert.match(docsText, /not sufficiency scoring/i);
});

test("relationship to closed DK layers and DK source-status foundation are explicit", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "DK_PSYKISK_VOLD` source inventory",
    "DK_PSYKISK_VOLD` neutral source-derived label scaffold",
    "governs review-signal / evidence-readiness wording and human-review routing after source/label review",
    "does not replace the source inventory",
    "does not create labels",
    "does not create offence elements",
    "does not create case-law doctrine",
    "does not implement runtime behavior",
  ]);

  assertIncludesAll(docsText, [
    "Current official Danish criminal-code source status has been checked in the inventory chain for source-status purposes",
    "Lov nr. 329 af 30/03/2019 remains the original enactment source",
    "currentness of prosecutorial guidance must remain manually review-gated",
    "Official Anklagemyndigheden / Vidensbase context may be used as source-status context only",
    "Source/currentness checks must be repeated before future deeper legal work",
    "does not create new legal doctrine",
    "does not create offence-element modelling",
  ]);
});

test("SWE source-status sidecar boundary and safe role surfaces are explicit", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "SWE_PSYKISKT_VALD` is source-status sidecar only",
    "SWE official parliamentary material may be noted as context",
    "Exact SFS/current-law/consolidated Brottsbalk verification remains required before SWE labels or deeper SWE work",
    "No SWE labels are created",
    "No SWE doctrine/requisite labels are created",
    "No SWE offence-element modelling is created",
    "No SWE case application is created",
    "No DK-to-SWE import is allowed",
    "Nordic comparison remains blocked pending SWE source verification",
  ]);

  assertIncludesAll(docsText, [
    "DK_SOURCE_PROVENANCE_ASSISTANT",
    "DK_NEUTRAL_CONTEXT_REVIEW_SIGNAL_ASSISTANT",
    "DK_REVIEW_SIGNAL_WORKING_LEDGER_GENERATOR",
    "DK_HUMAN_SUPPORT_OR_LEGAL_REVIEW_ROUTING_ASSISTANT",
    "DK_TRANSLATION_CAUTION_ASSISTANT",
    "SWE_SOURCE_STATUS_SIDECAR_ONLY",
    "party, legal representative, reviewer, or support professional seeking source-backed review-signal organization",
    "The model is not prosecutor, police, court, legal decision-maker, diagnosis engine, risk-scoring engine, sufficiency-scoring engine, offence-determination engine, or support-service replacement",
  ]);
});

test("all five DK recommendation levels are present and bounded", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "DK_LEVEL_0_NO_REVIEW_SIGNAL_FOUND",
    "DK_LEVEL_1_WEAK_OR_AMBIGUOUS_REVIEW_SIGNAL",
    "DK_LEVEL_2_REVIEWABLE_SOURCE_SIGNAL_FOUND",
    "DK_LEVEL_3_STRONG_REVIEWABLE_SOURCE_PATTERN_FOUND",
    "DK_LEVEL_4_READY_FOR_HUMAN_SUPPORT_OR_LEGAL_REVIEW",
  ]);

  assertIncludesAll(docsText, [
    "No clear DK_PSYKISK_VOLD review signal was found in the reviewed material. This does not decide any legal issue and may change if more source material is added.",
    "Weak or ambiguous DK_PSYKISK_VOLD review signals were found. More source material and human review are needed before this should be treated as a reviewable issue.",
    "The material contains reviewable source signals relevant to possible DK_PSYKISK_VOLD context. These should be organized in a source-backed review ledger for human legal/support review.",
    "The material contains strong reviewable source patterns across multiple source families. This may justify preparing a structured source package for human legal/support review. No offence determination, diagnosis, risk score, or legal conclusion is made.",
    "The material appears organized enough for a party, legal representative, reviewer, or support professional to consider human support/legal review. This is not a conclusion that DK_PSYKISK_VOLD occurred or that straffeloven § 243 is satisfied.",
  ]);

  assertNormalizedIncludesAll(docsText, [
    "All DK recommendation levels are review/readiness only.",
    "All DK recommendation levels are not offence determination, not proof, not legal advice, not diagnosis, not risk scoring, not sufficiency scoring, not outcome prediction, not police-report generation, not pleading generation, and not private-case conclusion.",
  ]);
});

test("safe DK output families remain non-decisional", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "DK_REVIEWABLE_SOURCE_SIGNAL_FOUND",
    "DK_HUMAN_SUPPORT_OR_LEGAL_REVIEW_NEEDED",
    "DK_SOURCE_BACKED_REVIEW_LEDGER_RECOMMENDED",
    "DK_SOURCE_ORIGINAL_PROVENANCE_VERIFICATION_NEEDED",
    "DK_NO_OFFENCE_DETERMINATION_MADE",
    "DK_NO_DIAGNOSIS_MADE",
    "DK_NO_RISK_OR_SUFFICIENCY_SCORE_MADE",
    "DK_NO_PRIVATE_CASE_APPLICATION_MADE",
  ]);

  assert.match(
    docsText,
    /It is not proof, not legal advice, not offence determination, not diagnosis, not risk scoring, not sufficiency scoring, and not private-case conclusion/i,
  );
});

test("forbidden output taxonomy and safe replacements are present", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "DK_PSYKISK_VOLD_PROVEN",
    "STRAFFELOVEN_243_SATISFIED",
    "OFFENCE_DETERMINATION",
    "LEGAL_ADVICE",
    "DIAGNOSIS",
    "RISK_SCORE",
    "SUFFICIENCY_SCORE",
    "CREDIBILITY_FINDING",
    "PRIVATE_CASE_CONCLUSION",
    "POLICE_REPORT_DRAFTING",
    "PLEADING_GENERATION",
    "DK_SWE_LABEL_IMPORT",
    "SWE_LABELS",
    "NORDIC_COMPARISON",
    "BODELNING_BLENDING",
    "CLUSTER_B_DARVO_GASLIGHTING_AS_DIAGNOSIS_OR_DETERMINATIVE_LABEL",
  ]);

  assertIncludesAll(docsText, [
    "Reviewable source signals were found; human legal/support review is needed.",
    "Source/original/provenance verification is needed.",
    "No offence determination is made.",
    "No diagnosis is made.",
    "No risk score is made.",
    "No sufficiency score is made.",
    "No private-case conclusion is made.",
    "Human legal/support review is needed before any external process step.",
    "SWE remains source-status sidecar only.",
    "Bodelning remains a separate track.",
  ]);
});

test("manual-review gates are listed", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "DK_LEGAL_SIGNIFICANCE_REVIEW",
    "DK_SOURCE_COMPLETENESS_REVIEW",
    "DK_RAW_SOURCE_VS_DERIVATIVE_REVIEW",
    "DK_OFFICIAL_SOURCE_CURRENTNESS_REVIEW",
    "DK_GUIDANCE_CURRENTNESS_REVIEW",
    "DK_TRANSLATION_CAUTION_REVIEW",
    "DK_CONTEXT_LABEL_NOT_OFFENCE_ELEMENT_REVIEW",
    "DK_REVIEW_SIGNAL_NOT_PROOF",
    "DK_REVIEW_SIGNAL_NOT_DIAGNOSIS",
    "DK_REVIEW_SIGNAL_NOT_RISK_SCORE",
    "DK_REVIEW_SIGNAL_NOT_SUFFICIENCY_SCORE",
    "DK_REVIEW_SIGNAL_NOT_PRIVATE_CASE_APPLICATION",
    "DK_CASE_LAW_DOCTRINE_NOT_INCLUDED",
    "DK_SWE_IMPORT_EXPORT_BLOCK",
    "SWE_SOURCE_STATUS_SIDECAR_ONLY",
    "PSYCHOLOGICAL_DIAGNOSIS_CONTAMINATION_BLOCK",
    "BODELNING_TRACK_SEPARATION_BLOCK",
  ]);
});

test("source/provenance and review-ledger handling remains non-proof", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "A review ledger is a source-follow-up and organization layer only.",
    "A review ledger is not proof.",
    "A review ledger is not legal advice.",
    "A review ledger is not a police report.",
    "A review ledger is not a pleading.",
    "A review ledger cannot determine whether § 243 is satisfied.",
    "A review ledger cannot diagnose.",
    "A review ledger cannot score risk.",
    "A review ledger cannot score sufficiency.",
    "A review ledger may identify source signals, source gaps, translation cautions, manual-review gates, and human-review routing.",
  ]);
});

test("translation caution, bodelning separation, and psychological diagnosis separation exist", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "Danish legal/source wording must not be freely translated into Swedish/English labels without caution.",
    "Swedish psychological-violence wording must not be imported into DK.",
    "DK labels must not be imported into SWE.",
    "Translation is organizational only and never offence-element modelling.",
    "SWE_BODELNING_DOLD_SAMAGANDERATT` remains separate.",
    "Hidden co-ownership / bodelning evidence-readiness work must not blend with `DK_PSYKISK_VOLD`.",
    "Financial/relationship conflict material cannot be treated as `DK_PSYKISK_VOLD` determination.",
    "Bodelning working ledger is not psychological-violence review ledger.",
    "Cluster-B, DARVO, gaslighting, love bombing, flying monkeys, or similar terms must not be used as diagnosis, proof, determinative labels, or risk scoring in this contract.",
    "Such terms may not replace source-backed legal/support review.",
    "Diagnosis and clinical classification are excluded.",
  ]);
});

test("explicit negative boundaries and future-scope notes are complete", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "not legal advice",
    "not offence determination",
    "not proof",
    "not diagnosis",
    "not risk scoring",
    "not sufficiency scoring",
    "not credibility finding",
    "not private-case conclusion",
    "not police-report drafting",
    "not pleading generation",
    "not case-law doctrine",
    "not legal decision logic",
    "not runtime/schema/semantic-fact implementation",
    "not DK/SWE comparison",
    "not Nordic comparison",
    "not SWE label scaffold",
    "not offence-element modelling",
    "not bodelning work",
    "not psychological diagnosis",
    "not `actual_swedish_samaganderatt_decision_logic`",
  ]);

  assertIncludesAll(docsText, [
    "Case-law doctrine is a later separate scope only after explicit manual product/legal decision.",
    "Offence-element modelling is a later separate scope only after explicit manual product/legal decision.",
    "Runtime implementation is a later separate scope only after explicit manual product/legal decision.",
    "Schema behavior is a later separate scope only after explicit manual product/legal decision.",
    "Semantic-fact mapping is a later separate scope only after explicit manual product/legal decision.",
    "Police-report/pleading generation is a later separate scope only after explicit manual product/legal decision.",
    "Private-case application is a later separate scope only after explicit manual product/legal decision.",
    "SWE labels are a later separate scope only after exact SFS/current-law/consolidated Brottsbalk verification and explicit manual product/legal decision.",
    "Nordic comparison is a later separate scope only after SWE source verification and explicit manual product/legal decision.",
    "Synthetic example-cases are later separate scopes only after explicit manual product/legal decision.",
  ]);
});

test("privacy and case-specific exclusions are explicit", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "private case facts",
    "private identifiers",
    "exact private file paths",
    "raw excerpts from private material",
    "screenshots",
    "working memo content",
    "chunks",
    "source-package contents",
    "source-foundation zip contents",
    "final submissions",
    "direct private quotations",
    "case-specific examples",
  ]);
});

test("adjacent DK and SWE source files remain context only", () => {
  assert.equal(fs.existsSync(dkSourceInventoryPath), true);
  assert.equal(fs.existsSync(dkLabelScaffoldPath), true);
  assert.equal(fs.existsSync(sweSourceInventoryPath), true);

  const dkSourceText = readText(dkSourceInventoryPath);
  const dkLabelText = readText(dkLabelScaffoldPath);
  const sweSourceText = readText(sweSourceInventoryPath);

  assert.match(dkSourceText, /# DK_PSYKISK_VOLD boundary\/source inventory/);
  assert.match(dkSourceText, /source inventory only/i);
  assert.match(
    dkLabelText,
    /# DK_PSYKISK_VOLD neutral source-derived label scaffold/,
  );
  assert.match(dkLabelText, /labels are organizational only/i);
  assert.match(
    sweSourceText,
    /# SWE_PSYKISKT_VALD boundary\/source inventory/,
  );
  assert.match(sweSourceText, /source inventory only/i);
});

test("proof stays text-only and avoids unsafe private content patterns", () => {
  const docsText = readText(docsPath);
  const testText = readText(__filename);
  const combinedText = `${docsText}\n${testText}`;

  assert.match(
    docsText,
    /This document uses checklist-only product-boundary text evidence only/i,
  );
  assert.match(testText, /fs\.readFileSync/);

  assert.doesNotMatch(
    combinedText,
    forbiddenPhrasePattern([
      "straffeloven",
      "§",
      "243",
      "is",
      "satisfied",
      "as",
      "an",
      "allowed",
      "conclusion",
    ]),
  );
  assert.doesNotMatch(
    combinedText,
    forbiddenPhrasePattern([
      "offence",
      "determination",
      "as",
      "an",
      "allowed",
      "conclusion",
    ]),
  );
  assert.doesNotMatch(
    combinedText,
    forbiddenPhrasePattern([
      "legal",
      "advice",
      "as",
      "an",
      "allowed",
      "conclusion",
    ]),
  );
  assert.doesNotMatch(
    combinedText,
    forbiddenPhrasePattern([
      "diagnosis",
      "as",
      "an",
      "allowed",
      "conclusion",
    ]),
  );
  assert.doesNotMatch(
    combinedText,
    forbiddenPhrasePattern([
      "risk",
      "scoring",
      "as",
      "an",
      "allowed",
      "conclusion",
    ]),
  );
  assert.doesNotMatch(
    combinedText,
    forbiddenPhrasePattern([
      "sufficiency",
      "scoring",
      "as",
      "an",
      "allowed",
      "conclusion",
    ]),
  );
  assert.doesNotMatch(
    combinedText,
    forbiddenPhrasePattern([
      "police",
      "report",
      "drafting",
      "as",
      "an",
      "allowed",
      "output",
    ]),
  );
  assert.doesNotMatch(
    combinedText,
    forbiddenPhrasePattern([
      "pleading",
      "generation",
      "as",
      "an",
      "allowed",
      "output",
    ]),
  );
  assert.doesNotMatch(combinedText, forbiddenPhrasePattern(["will", "win"]));
  assert.doesNotMatch(
    combinedText,
    forbiddenPhrasePattern(["DK_PSYKISK_VOLD", "is", "proven"]),
  );
  assert.doesNotMatch(combinedText, /file:\/\/\//i);
  assert.doesNotMatch(
    combinedText,
    forbiddenPhrasePattern(["Mobile", "Documents"]),
  );
  assert.doesNotMatch(
    combinedText,
    new RegExp("com~apple~" + "CloudDocs", "i"),
  );
  assert.doesNotMatch(
    combinedText,
    new RegExp("Bilagor" + "-Export", "i"),
  );
  assert.doesNotMatch(
    combinedText,
    forbiddenPhrasePattern(["Private", "Case", "Source.docx"]),
  );
  assert.doesNotMatch(
    combinedText,
    new RegExp(
      [
        "submitted party",
        "Zip",
        "\\/",
        ".+",
        "\\.",
        "(pdf|png|jpe?g|docx)",
      ].join(""),
      "i",
    ),
  );
  assert.doesNotMatch(
    combinedText,
    new RegExp(["chunk", "-", "\\d+"].join(""), "i"),
  );
  assert.doesNotMatch(
    combinedText,
    new RegExp("private-case-source" + "-neutral-source-foundation-v1\\.zip", "i"),
  );
  assert.doesNotMatch(combinedText, /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  assert.doesNotMatch(combinedText, /\b\d{6}[-+]\d{4}\b/);
  assert.doesNotMatch(combinedText, /\b\d{8}[-+]\d{4}\b/);
  assert.doesNotMatch(
    combinedText,
    /actual_swedish_samaganderatt_decision_logic (is|was|as) implemented/i,
  );
});
