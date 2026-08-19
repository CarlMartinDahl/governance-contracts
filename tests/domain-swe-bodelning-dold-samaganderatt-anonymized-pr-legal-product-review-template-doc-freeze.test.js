const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.join(__dirname, "..");
const reviewTemplateDocsPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_SWE_BODELNING_DOLD_SAMAGANDERATT_ANONYMIZED_PR_LEGAL_PRODUCT_REVIEW_TEMPLATE_v1.md",
);
const priorDomainDocPaths = [
  "DOMAIN_CONTRACTS_SWE_BODELNING_DOLD_SAMAGANDERATT_v1.md",
  "LEGAL_SOURCE_INVENTORY_SWE_BODELNING_DOLD_SAMAGANDERATT_v1.md",
  "DOMAIN_CONTRACTS_SWE_BODELNING_DOLD_SAMAGANDERATT_DOSSIER_SCAFFOLD_v1.md",
  "DOMAIN_CONTRACTS_SWE_BODELNING_DOLD_SAMAGANDERATT_DOCTRINE_REQUISITE_LABELS_v1.md",
  "DOMAIN_CONTRACTS_SWE_BODELNING_DOLD_SAMAGANDERATT_EVIDENCE_TO_LABEL_BOUNDARY_v1.md",
  "DOMAIN_CONTRACTS_SWE_BODELNING_DOLD_SAMAGANDERATT_SOURCE_STATUS_GATE_v1.md",
  "DOMAIN_CONTRACTS_SWE_BODELNING_DOLD_SAMAGANDERATT_ISSUE_RELEVANCE_GATE_v1.md",
  "DOMAIN_CONTRACTS_SWE_BODELNING_DOLD_SAMAGANDERATT_WORKING_EVIDENCE_MEMO_ISSUE_LEDGER_v1.md",
  "DOMAIN_CONTRACTS_SWE_BODELNING_DOLD_SAMAGANDERATT_CHUNKED_DIGITAL_CORPUS_WORKFLOW_v1.md",
  "DOMAIN_CONTRACTS_SWE_BODELNING_DOLD_SAMAGANDERATT_SUBMITTED_APPENDIX_WORKFLOW_v1.md",
  "DOMAIN_CONTRACTS_SWE_BODELNING_DOLD_SAMAGANDERATT_COUNTERPARTY_REBUTTAL_MATRIX_v1.md",
  "DOMAIN_CONTRACTS_SWE_BODELNING_DOLD_SAMAGANDERATT_BOHAG_LOSORE_SIDE_TRACK_WORKFLOW_v1.md",
].map((fileName) => path.join(repoRoot, "docs", fileName));
const coreFreezePath = path.join(
  repoRoot,
  "docs",
  "SWE_BODELNING_CORE_BACKEND_MVP_FREEZE.md",
);
const fullScopeFreezePath = path.join(
  repoRoot,
  "docs",
  "SWE_BODELNING_FULL_SCOPE_FREEZE.md",
);
const dossierSchemaPath = path.join(
  repoRoot,
  "schemas",
  "swe-bodelning-profile-dossier-snapshot.json",
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

test("anonymized review template doc exists and freezes the template-only boundary", () => {
  assert.equal(fs.existsSync(reviewTemplateDocsPath), true);

  const docsText = readText(reviewTemplateDocsPath);

  assert.match(
    docsText,
    /# SWE_BODELNING_DOLD_SAMAGANDERATT anonymized PR\/legal product review template/,
  );
  assert.match(docsText, /anonymized PR\/legal product review template only/i);
  assert.match(docsText, /product\/model template is checklist-only/i);
  assert.match(
    docsText,
    /case-specific PR\/legal product review remains local side document \/ handoff note only/i,
  );
});

test("closed prerequisites and blocked implementation remain explicit", () => {
  const docsText = readText(reviewTemplateDocsPath);

  assertIncludesAll(docsText, [
    "boundary/prerequisite freeze closed at `1a6d6c6`",
    "legal/source inventory contract closed at `6fa0a4a`",
    "neutral evidence dossier scaffold closed at `625e538`",
    "doctrine/requisite label scaffold closed at `ed13c92`",
    "evidence-to-label boundary scaffold closed at `93edca0`",
    "source-backed material classification gate closed at `4a20f9f`",
    "issue relevance gate closed at `591a98a`",
    "working evidence memo / issue ledger closed at `0073dde`",
    "chunked digital corpus workflow closed at `3c9feff`",
    "submitted appendix workflow closed at `73396ed`",
    "counterparty rebuttal matrix closed at `011cb0b`",
    "bohag/lösöre side-track workflow closed at `11561a0`",
    "builds on those contracts but does not supersede them",
    "runtime/schema/semantic-fact mapping remains blocked",
    "actual_swedish_samaganderatt_decision_logic remains excluded/not implemented",
    "must not reopen or extend any closed product/domain layer",
  ]);
});

test("template preconditions keep all prior workflows separate", () => {
  const docsText = readText(reviewTemplateDocsPath);

  assertIncludesAll(docsText, [
    "The template does not perform source-status classification",
    "The template does not perform issue relevance classification",
    "The template does not perform working-ledger classification",
    "The template does not perform corpus workflow classification",
    "The template does not perform submitted appendix workflow classification",
    "The template does not perform rebuttal matrix classification",
    "The template does not perform bohag/lösöre side-track classification",
    "The template does not perform legal/source inventory",
    "The template does not create a synthetic example-case",
    "The template does not create a case-specific review note",
    "The template may only organize generic human-review checklist questions",
    "The template must not contain private case facts or raw case evidence",
    "The template must not be used to decide law, ownership, sufficiency, proof, or outcome",
  ]);
});

test("existing SWE_BODELNING lanes remain context only and non-decisive", () => {
  const docsText = readText(reviewTemplateDocsPath);

  assertIncludesAll(docsText, [
    "Existing `SWE_BODELNING` lane keys are context only",
    "economic_contribution",
    "shared_use",
    "shared_intent",
    "not treated as implemented hidden co-ownership decision logic",
    "review-template classifications",
    "source-status classification",
    "issue relevance classification",
    "working-ledger classification",
    "corpus workflow classification",
    "submitted appendix workflow classification",
    "counterparty rebuttal matrix classification",
    "bohag/lösöre side-track classification",
    "sufficiency scoring",
    "proof that any hidden-co-ownership requisite is satisfied",
  ]);
});

test("review-template classifications are neutral and exclude case-specific and synthetic classes", () => {
  const docsText = readText(reviewTemplateDocsPath);

  assertIncludesAll(docsText, [
    "neutral review-template classifications only",
    "ANONYMIZED_REVIEW_TEMPLATE",
    "REVIEW_SUBJECT",
    "CLOSED_LAYER_CHECKLIST",
    "HUMAN_REVIEWER_CHECKLIST",
    "EVIDENCE_DISCIPLINE_CHECKLIST",
    "SOURCE_STATUS_REVIEW_CHECKLIST",
    "ISSUE_RELEVANCE_REVIEW_CHECKLIST",
    "APPENDIX_SUBMISSION_REVIEW_CHECKLIST",
    "REBUTTAL_MATRIX_REVIEW_CHECKLIST",
    "SIDE_TRACK_SEPARATION_CHECKLIST",
    "OUT_OF_SCOPE_CHECKLIST",
    "ACCEPTANCE_CRITERIA",
    "ANONYMIZATION_REQUIREMENT",
    "PROHIBITED_CASE_SPECIFIC_CONTENT",
    "MANUAL_REVIEW_REQUIRED",
    "CASE_SPECIFIC_REVIEW_NOTE` and `SYNTHETIC_EXAMPLE_CASE_GUIDANCE` are not classifications in this template",
  ]);

  assertNormalizedIncludesAll(docsText, [
    "These classifications are not schema fields, runtime classes, semantic-fact mappings, source-status classifications, issue relevance classifications, working-ledger classifications, corpus workflow classifications, submitted appendix workflow classifications, counterparty rebuttal matrix classifications, bohag/lösöre side-track classifications, legal conclusions, ownership determinations, issue merits determinations, or sufficiency determinations.",
  ]);
});

test("classification rules are present and checklist-only", () => {
  const docsText = readText(reviewTemplateDocsPath);

  assertIncludesAll(docsText, [
    "ANONYMIZED_REVIEW_TEMPLATE` may identify a reusable checklist-only product-review template",
    "REVIEW_SUBJECT` may identify a generic closed domain chain under review, using placeholders only",
    "CLOSED_LAYER_CHECKLIST` may identify the list of closed layers to verify",
    "HUMAN_REVIEWER_CHECKLIST` may identify neutral questions for a human reviewer",
    "EVIDENCE_DISCIPLINE_CHECKLIST` may identify checks that working notes, assertions, appendices, and source links are not treated as proof by themselves",
    "SOURCE_STATUS_REVIEW_CHECKLIST` may identify checks that source-status surfaces remain organizational and non-decisional",
    "ISSUE_RELEVANCE_REVIEW_CHECKLIST` may identify checks that issue-placement surfaces remain organizational and non-decisional",
    "APPENDIX_SUBMISSION_REVIEW_CHECKLIST` may identify checks that appendices and submissions are not treated as proof by themselves",
    "REBUTTAL_MATRIX_REVIEW_CHECKLIST` may identify checks that neither party's assertion is treated as truth by itself",
    "SIDE_TRACK_SEPARATION_CHECKLIST` may identify checks that side-track material does not contaminate the hidden-co-ownership core",
    "OUT_OF_SCOPE_CHECKLIST` may identify surfaces that must remain excluded",
    "ACCEPTANCE_CRITERIA` may identify review pass/fail criteria without scoring sufficiency or proof",
    "ANONYMIZATION_REQUIREMENT` may identify privacy and anonymization obligations",
    "PROHIBITED_CASE_SPECIFIC_CONTENT` may identify content barred from product/model docs",
    "MANUAL_REVIEW_REQUIRED` may identify that human legal/product review is required",
  ]);
});

test("generic review checklist sections cover the closed chain review surface", () => {
  const docsText = readText(reviewTemplateDocsPath);

  assertIncludesAll(docsText, [
    "Closed-Layer Coherence",
    "Boundary And Prerequisite Closure",
    "Evidence Discipline",
    "Source-Status Boundaries",
    "Issue-Relevance Boundaries",
    "Working Memo / Issue Ledger Boundaries",
    "Corpus And Chunk Workflow Boundaries",
    "Appendix / Submission Workflow Boundaries",
    "Rebuttal Matrix Neutrality",
    "Side-Track Separation",
    "Acceptance Criteria",
    "Out-Of-Scope Verification",
    "Anonymization Compliance",
    "Manual-Review Gates",
  ]);

  assertIncludesAll(docsText, [
    "Traceability links remain traceability links",
    "source-status surfaces remain organizational and non-decisional",
    "issue-relevance surfaces remain organizational and non-decisional",
    "appendix registers are navigation, not sufficiency",
    "neither party's assertion is treated as truth by itself",
    "bohag/lösöre remains separate from hidden-co-ownership core proof",
    "no sufficiency, no conclusion, and no implementation boundaries",
  ]);
});

test("anonymization requirements and prohibited content stay generic", () => {
  const docsText = readText(reviewTemplateDocsPath);

  assertIncludesAll(docsText, [
    "generic placeholders only for people, assets, submissions, exhibits, institutions, dates, and amounts",
    "no real party names",
    "no real addresses",
    "no personal numbers",
    "no account numbers",
    "no phone numbers",
    "no private emails",
    "no exact private file paths",
    "no unredacted screenshots",
    "no raw excerpts from private case material",
    "no exact payment references or transaction IDs",
    "no proceeding IDs unless fully anonymized",
    "no copied private uploaded documents",
    "no unique chronology that could re-identify a case",
    "no direct quotes from private material",
    "no case-specific factual narrative beyond abstract placeholders",
    "no exact identifiers, contact details, account details, or private path details",
    "no raw evidence content",
    "case-specific review notes stay local unless separately anonymized",
  ]);

  assertIncludesAll(docsText, [
    "legal advice",
    "legal decision logic",
    "sufficiency scoring",
    "proof of any requisite",
    "ownership determination",
    "outcome prediction",
    "process pleading generation",
    "actual_swedish_samaganderatt_decision_logic",
  ]);
});

test("side-document-only content and manual-review gates remain explicit", () => {
  const docsText = readText(reviewTemplateDocsPath);

  assertIncludesAll(docsText, [
    "any real-case PR/legal product review narrative",
    "case-specific strengths and weaknesses",
    "case-specific appendix, rebuttal, source, payment, or corpus observations",
    "case-specific reviewer conclusions",
    "case-specific open questions",
    "private identifiers",
    "private facts",
    "real parties or real institutions unless anonymized into placeholders",
    "any raw material drawn from private uploaded documents",
  ]);

  assertIncludesAll(docsText, [
    "generic checklist wording that may imply legal advice",
    "acceptance criteria wording that may imply sufficiency scoring or proof",
    "review phrase that may imply ownership determination",
    "placeholder pattern that remains too close to a real-case pattern",
    "example that could re-identify a case",
    "prompt that invites outcome prediction",
    "wording that invites runtime/schema/semantic-fact implementation",
    "attempt to blend Swedish psychological violence or Danish psychological violence tracks into the bodelning review template",
  ]);
});

test("relationship to prior layers and negative boundaries remain explicit", () => {
  const docsText = readText(reviewTemplateDocsPath);

  assertIncludesAll(docsText, [
    "supports review of closed domain chains without changing them",
    "may review whether source-status surfaces remain organizational",
    "may review whether issue-relevance surfaces remain organizational",
    "may review whether appendix/submission surfaces remain non-proof",
    "may review whether rebuttal-matrix surfaces remain neutral",
    "may review whether side-track surfaces remain separate",
    "does not replace any of the twelve closed `SWE_BODELNING_DOLD_SAMAGANDERATT` layers",
    "must not create source-status classification, issue relevance classification, working-ledger workflow, corpus workflow, appendix workflow, rebuttal workflow, side-track workflow, schema types, runtime classes, semantic facts, legal decision logic, or synthetic example cases",
  ]);

  assertIncludesAll(docsText, [
    "case-specific PR/legal product review in product docs",
    "synthetic example-case",
    "source-status classification",
    "source-backed material classification gate",
    "issue relevance classification",
    "working evidence memo / issue ledger replacement",
    "chunked digital corpus workflow replacement",
    "submitted appendix workflow replacement",
    "counterparty rebuttal matrix replacement",
    "bohag/lösöre side-track workflow replacement",
    "full evidence discipline gate",
    "full doctrine contract",
    "final ownership determination of bostadsrätt",
    "final ownership determination of any item",
    "legal advice",
    "legal decision logic",
    "actual_swedish_samaganderatt_decision_logic",
    "evidentiary sufficiency scoring",
    "proof that any requisite is satisfied",
    "proof that any requisite is not satisfied",
    "runtime implementation",
    "schema behavior changes",
    "semantic-fact mapping",
    "Swedish psychological violence track blending",
    "Danish psychological violence track blending",
    "governance helper-level freeze continuation",
  ]);
});

test("existing repository evidence remains available for prior domain docs and generic SWE_BODELNING scaffolding", () => {
  for (const filePath of priorDomainDocPaths) {
    assert.equal(fs.existsSync(filePath), true);
  }

  const coreFreezeText = readText(coreFreezePath);
  const fullScopeFreezeText = readText(fullScopeFreezePath);
  const dossierSchemaText = readText(dossierSchemaPath);

  assertIncludesAll(coreFreezeText, [
    "SWE_BODELNING_CORE_BACKEND_MVP",
    "actual_swedish_samaganderatt_decision_logic",
  ]);
  assertIncludesAll(fullScopeFreezeText, [
    "SWE_BODELNING_FULL_SCOPE_BASELINE",
    "actual_swedish_samaganderatt_decision_logic",
  ]);
  assertIncludesAll(dossierSchemaText, [
    "SWE_BODELNING Profile Dossier Snapshot",
    "economic_contribution",
    "shared_use",
    "shared_intent",
  ]);
});

test("proof uses only text evidence and the template remains privacy-safe", () => {
  const docsText = readText(reviewTemplateDocsPath);
  const testText = readText(__filename);
  const combinedText = `${docsText}\n${testText}`;

  assert.match(docsText, /does not implement runtime, schema, semantic-fact, or legal decision behavior/i);
  assert.doesNotMatch(combinedText, /file:\/\/\S+/i);
  assert.doesNotMatch(combinedText, /[A-Z]:\\[^\s]+/);
  assert.doesNotMatch(combinedText, /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i);
  assert.doesNotMatch(combinedText, /\b\d{6}[-+]\d{4}\b/);
  assert.doesNotMatch(combinedText, /\b(?:\d[ -]*?){12,20}\b/);
  assert.doesNotMatch(combinedText, /\btransaction\s*(?:id|number)\s*[:#]/i);
  assert.doesNotMatch(combinedText, /\bproceeding\s*(?:id|number)\s*[:#]/i);
  assert.doesNotMatch(combinedText, /\bunredacted screenshot\b.*\.(?:png|jpg|jpeg|webp)/i);
  assert.doesNotMatch(combinedText, /\braw message excerpt:\s*["'`]/i);
  assert.doesNotMatch(combinedText, /\bprivate uploaded document:\s*["'`]/i);
});
