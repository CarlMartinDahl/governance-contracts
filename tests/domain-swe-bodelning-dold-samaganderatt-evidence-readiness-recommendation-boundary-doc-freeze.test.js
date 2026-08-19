const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.join(__dirname, "..");
const docsPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_SWE_BODELNING_DOLD_SAMAGANDERATT_EVIDENCE_READINESS_RECOMMENDATION_BOUNDARY_v1.md",
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

test("evidence-readiness recommendation boundary doc exists and freezes DOCS_ONLY status", () => {
  assert.equal(fs.existsSync(docsPath), true);

  const docsText = readText(docsPath);

  assert.match(
    docsText,
    /# SWE_BODELNING_DOLD_SAMAGANDERATT Evidence-Readiness Recommendation Boundary/,
  );
  assert.match(docsText, /Status: `DOCS_ONLY`/);
  assert.match(
    docsText,
    /freeze safe recommendation boundaries for evidence-readiness outputs after neutral marker\/source review/i,
  );
  assert.match(docsText, /not legal advice, not proof, not ownership determination/i);
});

test("safe role definitions and process surfaces remain explicit", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "PARTY_OR_OMBUD_EVIDENCE_READINESS_ASSISTANT",
    "SOURCE_PROVENANCE_ASSISTANT",
    "NEUTRAL_MARKER_DETECTION_ASSISTANT",
    "WORKING_LEDGER_GENERATOR",
    "APPENDIX_SOURCE_ORGANIZATION_ASSISTANT",
    "REBUTTAL_ISSUE_MAPPER",
    "Primary user: a party or legal representative",
    "- bodelningsförrättare",
    "- judge",
    "- legal decision-maker",
    "- ownership-determination engine",
    "- sufficiency-scoring engine",
  ]);
});

test("recommendation levels are complete and non-conclusive", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "LEVEL_0_NO_RELEVANT_TRACE_FOUND",
    "LEVEL_1_WEAK_TRACE_FOUND",
    "LEVEL_2_REVIEWABLE_TRACE_FOUND",
    "LEVEL_3_STRONG_REVIEWABLE_TRACE_FOUND",
    "LEVEL_4_READY_FOR_PARTY_PRESENTATION_REVIEW",
    "No clear hidden-co-ownership marker traces were found in the reviewed material. This does not decide the legal issue and may change if more source material is added.",
    "Weak or partial traces were found. More source material and human review are needed before this should be treated as a bodelning-core issue.",
    "The material contains reviewable traces relevant to possible hidden co-ownership. It should be organized in a source-backed working ledger for human legal review.",
    "The material contains strong reviewable traces across multiple source families. It may justify preparing a structured source package for legal review or possible bodelningsförrättare presentation. No legal conclusion is made.",
    "The material appears organized enough for a party or legal representative to review for possible presentation to the bodelningsförrättare. This is not a conclusion that hidden co-ownership exists.",
    "evidence-readiness / human-review recommendations only",
    "No level is a legal conclusion",
  ]);
});

test("safe recommendation output families are explicit and non-proof", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "REVIEWABLE_TRACES_FOUND",
    "HUMAN_LEGAL_REVIEW_NEEDED",
    "SOURCE_BACKED_WORKING_LEDGER_RECOMMENDED",
    "SOURCE_ORIGINAL_PROVENANCE_VERIFICATION_NEEDED",
    "POSSIBLE_PARTY_PRESENTATION_REVIEW",
    "COUNTERPARTY_POSITION_REBUTTAL_ISSUE",
    "NO_LEGAL_CONCLUSION_MADE",
    "not proof or legal advice",
    "not a decision-maker outcome",
    "not a credibility finding",
  ]);
});

test("forbidden output families and safe replacements are frozen", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "HIDDEN_CO_OWNERSHIP_PROVEN",
    "YOU_WILL_WIN",
    "BODELNINGSFORRATTARE_SHOULD_DECIDE_X",
    "OTHER_PARTY_LIES",
    "FORMAL_TITLE_OVERRIDDEN",
    "MATERIAL_IS_SUFFICIENT",
    "APPENDIX_PACKAGE_PROVES_CLAIM",
    "LEGAL_ADVICE",
    "OWNERSHIP_DETERMINATION",
    "FINAL_ITEM_OWNERSHIP_DETERMINATION",
    "SUFFICIENCY_SCORE",
    "OUTCOME_PREDICTION",
    "CREDIBILITY_FINDING",
    "Reviewable traces were found; human legal review is needed.",
    "Counterparty position may be contradicted, qualified, or made incomplete by contemporaneous source candidates.",
    "Source/original/provenance verification is needed before any legal review.",
    "No legal conclusion is made; seek human legal review.",
  ]);
});

test("manual-review gates are complete", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "LEGAL_SIGNIFICANCE_REVIEW",
    "SOURCE_COMPLETENESS_REVIEW",
    "RAW_SOURCE_VS_DERIVATIVE_REVIEW",
    "MESSAGE_EXPORT_COMPLETENESS_REVIEW",
    "EMAIL_HEADER_PROVENANCE_REVIEW",
    "FINANCIAL_ARTIFACT_VERIFICATION",
    "GIFT_LOAN_CONTRIBUTION_CHARACTERIZATION",
    "ORDINARY_HOUSEHOLD_PAYMENT_FALSE_POSITIVE",
    "ORDINARY_RELATIONSHIP_LANGUAGE_FALSE_POSITIVE",
    "POST_ACQUISITION_SUPPORT_FALSE_POSITIVE",
    "FORMAL_TITLE_NOT_OWNERSHIP_CONCLUSION",
    "COUNTERPARTY_POSITION_NOT_TRUTH",
    "FINAL_ARGUMENT_NOT_PROOF",
    "APPENDIX_NOT_PROOF",
    "WORKING_LEDGER_NOT_PROOF",
    "PSYCHOLOGICAL_VIOLENCE_CONTAMINATION_BLOCK",
  ]);
});

test("bodelningsförrättare process fit and appendix source-package boundaries remain explicit", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "The model helps a party or legal representative prepare underlag.",
    "The bodelningsförrättare remains the objective decision-maker.",
    "The model does not replace, pressure, or predict the decision-maker.",
    "A completed appendix package may be described as presentation/source completeness only.",
    "Appendix completeness is not proof.",
    "An appendix or submitted package is not a legal conclusion.",
    "Final narrative is not source proof.",
    "R/Bilaga/Kompletteringsbilaga-style groups are generic source/presentation layers only",
    "Source/original/provenance verification remains required before use.",
  ]);
});

test("working-ledger, counterparty, and psychological-violence boundaries stay blocked from proof and credibility findings", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "A source-ledger-like working record is a source-follow-up and organization layer.",
    "The working ledger is not proof.",
    "The working ledger is not final submission text.",
    "The working ledger is not legal advice.",
    "The working ledger cannot score sufficiency.",
    "The working ledger cannot determine ownership.",
    "Counterparty positions are not truth by themselves.",
    "The model must not say a party lies.",
    "Credibility findings remain excluded.",
    "`SWE_PSYKISKT_VALD` and `DK_PSYKISK_VOLD` remain separate tracks.",
    "must not enter bodelning core",
  ]);
});

test("explicit negative boundaries and privacy exclusions are complete", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "not legal advice",
    "not proof",
    "not ownership determination",
    "not final item ownership determination",
    "not sufficiency scoring",
    "not outcome prediction",
    "not credibility finding",
    "not legal decision logic",
    "not bodelningsförrättare replacement",
    "not final submission drafting",
    "not private-case application",
    "not runtime/schema/semantic-fact implementation",
    "not `actual_swedish_samaganderatt_decision_logic`",
    "not psychological-violence track blending",
    "not DK/SWE psychological violence work",
    "not Nordic comparison",
    "not synthetic example-case",
    "not case-specific PR/legal review in product docs",
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

test("private and unsafe product content is absent", () => {
  const docsText = readText(docsPath);

  assertNotIncludesAll(docsText, [
    "will win",
    "hidden co-ownership is proven",
    "other party lies",
    "/Users/",
    "Mobile Documents",
    "Äktenskapsförord",
    "private-case-source-neutral-source-foundation-v1.zip",
    "submitted party Zip/",
    "2021.rtf",
    "2022.rtf",
    "2023.rtf",
    "2024 till 8 nov.rtf",
    "2025.rtf",
  ]);

  assert.doesNotMatch(docsText, /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  assert.doesNotMatch(docsText, /\b\d{6}[-+]\d{4}\b/);
  assert.doesNotMatch(
    docsText,
    /actual_swedish_samaganderatt_decision_logic(?![`;\s.,-]*(?:remains|;|is later|only|`))/i,
  );
  assert.doesNotMatch(
    docsText,
    /ownership determination(?:\s+is|\s+as|\s+allowed|\s+implemented)/i,
  );
  assert.doesNotMatch(
    docsText,
    /sufficiency scoring(?:\s+is|\s+as|\s+allowed|\s+implemented)/i,
  );
});
