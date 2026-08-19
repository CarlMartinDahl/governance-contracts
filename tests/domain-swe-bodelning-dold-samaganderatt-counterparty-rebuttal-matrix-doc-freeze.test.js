const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.join(__dirname, "..");
const rebuttalMatrixDocsPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_SWE_BODELNING_DOLD_SAMAGANDERATT_COUNTERPARTY_REBUTTAL_MATRIX_v1.md",
);
const boundaryDocsPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_SWE_BODELNING_DOLD_SAMAGANDERATT_v1.md",
);
const sourceInventoryDocsPath = path.join(
  repoRoot,
  "docs",
  "LEGAL_SOURCE_INVENTORY_SWE_BODELNING_DOLD_SAMAGANDERATT_v1.md",
);
const dossierScaffoldDocsPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_SWE_BODELNING_DOLD_SAMAGANDERATT_DOSSIER_SCAFFOLD_v1.md",
);
const labelScaffoldDocsPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_SWE_BODELNING_DOLD_SAMAGANDERATT_DOCTRINE_REQUISITE_LABELS_v1.md",
);
const evidenceToLabelDocsPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_SWE_BODELNING_DOLD_SAMAGANDERATT_EVIDENCE_TO_LABEL_BOUNDARY_v1.md",
);
const sourceStatusDocsPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_SWE_BODELNING_DOLD_SAMAGANDERATT_SOURCE_STATUS_GATE_v1.md",
);
const issueRelevanceDocsPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_SWE_BODELNING_DOLD_SAMAGANDERATT_ISSUE_RELEVANCE_GATE_v1.md",
);
const workingLedgerDocsPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_SWE_BODELNING_DOLD_SAMAGANDERATT_WORKING_EVIDENCE_MEMO_ISSUE_LEDGER_v1.md",
);
const chunkedCorpusDocsPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_SWE_BODELNING_DOLD_SAMAGANDERATT_CHUNKED_DIGITAL_CORPUS_WORKFLOW_v1.md",
);
const submittedAppendixDocsPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_SWE_BODELNING_DOLD_SAMAGANDERATT_SUBMITTED_APPENDIX_WORKFLOW_v1.md",
);
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
const coreFreezeTestPath = path.join(
  repoRoot,
  "tests",
  "swe-bodelning-core-backend-mvp-freeze.test.js",
);
const fullScopeFreezeTestPath = path.join(
  repoRoot,
  "tests",
  "swe-bodelning-full-scope-freeze.test.js",
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

test("counterparty rebuttal matrix doc exists and freezes the matrix-only boundary", () => {
  assert.equal(fs.existsSync(rebuttalMatrixDocsPath), true);

  const docsText = readText(rebuttalMatrixDocsPath);

  assert.match(
    docsText,
    /# SWE_BODELNING_DOLD_SAMAGANDERATT Counterparty Rebuttal Matrix/,
  );
  assert.match(docsText, /DOCS_ONLY counterparty rebuttal matrix only/i);
  assert.match(docsText, /non-core rebuttal matrix contract/i);
  assert.match(
    docsText,
    /without treating either side's assertions as truth/i,
  );
});

test("closed prerequisites, blocked implementation, and current exclusions remain explicit", () => {
  const docsText = readText(rebuttalMatrixDocsPath);

  assertIncludesAll(docsText, [
    "boundary/prerequisite freeze is closed at `1a6d6c6`",
    "legal/source inventory contract is closed at `6fa0a4a`",
    "neutral evidence dossier scaffold is closed at `625e538`",
    "doctrine/requisite label scaffold is closed at `ed13c92`",
    "evidence-to-label boundary scaffold is closed at `93edca0`",
    "source-backed material classification gate is closed at `4a20f9f`",
    "issue relevance gate is closed at `591a98a`",
    "working evidence memo / issue ledger is closed at `0073dde`",
    "chunked digital corpus workflow is closed at `3c9feff`",
    "submitted appendix workflow is closed at `73396ed`",
    "builds on those contracts but does not supersede them",
    "runtime/schema/semantic-fact mapping remains blocked",
    "actual_swedish_samaganderatt_decision_logic remains excluded/not implemented",
  ]);
});

test("matrix workflow preconditions keep prior gates separate", () => {
  const docsText = readText(rebuttalMatrixDocsPath);

  assertIncludesAll(docsText, [
    "The counterparty rebuttal matrix does not perform source-status classification",
    "The counterparty rebuttal matrix does not perform issue relevance classification",
    "The counterparty rebuttal matrix does not perform working-ledger classification",
    "The counterparty rebuttal matrix does not perform chunked corpus classification",
    "The counterparty rebuttal matrix does not perform submitted appendix workflow classification",
    "Matrix records may point to source-status references",
    "Matrix records may point to issue-relevance references",
    "Matrix records may point to submitted appendix references",
    "Matrix records may point to supporting appendix references",
    "Matrix records may preserve disputed assertions, disputed inferences, and unresolved rebuttal issues without resolving them",
    "Matrix records must not enter proof/core use unless the underlying material remains source-status classified and issue-classified",
    "The source-status gate controls source-backed material status",
    "The issue relevance gate controls issue-area placement",
    "The working evidence memo / issue ledger controls working-note and lead tracking",
    "The chunked digital corpus workflow controls corpus/chunk tracking before appendix candidacy",
    "The submitted appendix workflow controls appendix/submission tracking",
  ]);
});

test("existing SWE_BODELNING lanes remain context only and non-decisive", () => {
  const docsText = readText(rebuttalMatrixDocsPath);

  assertIncludesAll(docsText, [
    "Existing `SWE_BODELNING` lane keys are context only",
    "economic_contribution",
    "shared_use",
    "shared_intent",
    "not treated as implemented hidden co-ownership decision logic",
    "rebuttal matrix classifications",
    "source-status classification",
    "issue relevance classification",
    "working-ledger classification",
    "corpus workflow classification",
    "submitted appendix workflow classification",
    "sufficiency scoring",
    "proof that any requisite is satisfied",
  ]);
});

test("rebuttal/matrix classifications are neutral classifications only", () => {
  const docsText = readText(rebuttalMatrixDocsPath);

  assertIncludesAll(docsText, [
    "neutral rebuttal/matrix workflow classifications only",
    "COUNTERPARTY_POSITION_STATEMENT",
    "SUBMITTED_PARTY_RESPONSE",
    "REBUTTAL_MATRIX_ENTRY",
    "COUNTERPARTY_ASSERTION",
    "PARTY_RESPONSE_ASSERTION",
    "ADMITTED_OR_OVERLAPPING_FACT",
    "DISPUTED_FACTUAL_ASSERTION",
    "DISPUTED_INFERENCE",
    "SUPPORTING_APPENDIX_REFERENCE",
    "SOURCE_STATUS_REFERENCE",
    "ISSUE_RELEVANCE_REFERENCE",
    "SUBMITTED_APPENDIX_REFERENCE",
    "MANUAL_REVIEW_REQUIRED",
    "UNRESOLVED_REBUTTAL_ISSUE",
  ]);

  assertNormalizedIncludesAll(docsText, [
    "These classifications are not schema fields, runtime classes, semantic-fact mappings, source-status classifications, issue relevance classifications, working-ledger classifications, corpus workflow classifications, submitted appendix workflow classifications, legal conclusions, issue merits determinations, or sufficiency determinations.",
  ]);
});

test("classification rules are explicit and non-conclusive", () => {
  const docsText = readText(rebuttalMatrixDocsPath);

  assertIncludesAll(docsText, [
    "`COUNTERPARTY_POSITION_STATEMENT` may identify a position submitted or stated by the counterparty",
    "`SUBMITTED_PARTY_RESPONSE` may identify a response submitted by the submitted party",
    "`REBUTTAL_MATRIX_ENTRY` may pair a counterparty position with a submitted party response and supporting references",
    "`COUNTERPARTY_ASSERTION` may identify a factual or interpretive assertion made by the counterparty, but not truth by itself",
    "`PARTY_RESPONSE_ASSERTION` may identify a factual or interpretive assertion made by the submitted party, but not truth by itself",
    "`ADMITTED_OR_OVERLAPPING_FACT` may identify a factual area where both sides appear to describe a shared or overlapping circumstance, but it is not legal conclusion or proof of any requisite",
    "`DISPUTED_FACTUAL_ASSERTION` may identify a disagreement about whether a fact happened or how it happened",
    "`DISPUTED_INFERENCE` may identify a disagreement about what a fact means",
    "`SUPPORTING_APPENDIX_REFERENCE` may identify a supporting appendix for traceability, not proof",
    "`SOURCE_STATUS_REFERENCE` may identify a source-status reference for traceability, not proof",
    "`ISSUE_RELEVANCE_REFERENCE` may identify an issue-relevance reference for traceability, not proof",
    "`SUBMITTED_APPENDIX_REFERENCE` may identify a submitted appendix reference for traceability, not proof",
    "`MANUAL_REVIEW_REQUIRED` may identify that human review is required before any evidentiary or legal use",
    "`UNRESOLVED_REBUTTAL_ISSUE` may identify that the matrix preserves but does not resolve the issue",
  ]);
});

test("required representation rules and proof anchors remain explicit", () => {
  const docsText = readText(rebuttalMatrixDocsPath);

  assertIncludesAll(docsText, [
    "counterparty's statements about ownership, financing, financing instrument, financial institution, referenced property, family-law agreement, common use, economic contribution, or intent may be represented as COUNTERPARTY_POSITION_STATEMENT or COUNTERPARTY_ASSERTION, but not truth by themselves",
    "submitted party's responses may be represented as SUBMITTED_PARTY_RESPONSE or PARTY_RESPONSE_ASSERTION, but not truth by themselves",
    "A row pairing a counterparty assertion with a submitted party response may be represented as REBUTTAL_MATRIX_ENTRY",
    "Shared or overlapping factual descriptions may be represented as ADMITTED_OR_OVERLAPPING_FACT, but not as legal conclusion or proof of a requisite",
    "A disagreement about what a fact means may be represented as DISPUTED_INFERENCE",
    "A disagreement about whether a fact happened may be represented as DISPUTED_FACTUAL_ASSERTION",
    "References to appendices or submissions may be represented as SUPPORTING_APPENDIX_REFERENCE or SUBMITTED_APPENDIX_REFERENCE, but not proof by themselves",
  ]);
});

test("core-blocking and proof rules remain explicit", () => {
  const docsText = readText(rebuttalMatrixDocsPath);

  assertIncludesAll(docsText, [
    "counterparty assertions are not truth by themselves",
    "party response assertions are not truth by themselves",
    "rebuttal matrix entries are not proof by themselves",
    "supporting appendix references are traceability links, not proof",
    "source-status references are traceability links, not proof",
    "issue-relevance references are traceability links, not proof",
    "submitted appendix references are traceability links, not proof",
    "admitted-or-overlapping facts still require source-status handling before core use",
    "disputed factual assertions remain disputed until source-status and issue-relevance gates support later use",
    "disputed inferences remain unresolved unless manually reviewed outside this matrix contract",
    "matrix entries must not enter proof/core use unless the underlying material is source-status classified and issue-classified",
    "rebuttal history may be preserved without creating evidence conclusions",
  ]);
});

test("manual-review gates and relationship to prior layers remain explicit", () => {
  const docsText = readText(rebuttalMatrixDocsPath);

  assertIncludesAll(docsText, [
    "any attempt to treat counterparty assertion as truth",
    "any attempt to treat party response as truth",
    "any attempt to treat admitted/overlapping fact as legal conclusion",
    "any disputed inference about ownership, financing, financing instrument, financial institution, referenced property, family-law agreement, common-use, economic contribution, common intent, or acquisition circumstances",
    "any missing source-status reference",
    "any missing issue-relevance reference",
    "any missing submitted appendix reference where one is claimed",
    "any attempt to use matrix organization as proof",
    "any attempt to use matrix organization as sufficiency scoring",
    "any attempt to use matrix organization as ownership determination",
    "any attempt to bypass source-status gate",
    "any attempt to bypass issue relevance gate",
    "any attempt to bypass working evidence memo / issue ledger",
    "any attempt to bypass chunked digital corpus workflow",
    "any attempt to bypass submitted appendix workflow",
  ]);

  assertIncludesAll(docsText, [
    "supports the source-status gate by preserving source-status references without deciding source status",
    "supports the issue relevance gate by preserving issue-relevance references without deciding issue placement",
    "supports the submitted appendix workflow by preserving submitted appendix references without treating appendices as proof",
    "supports the working evidence memo / issue ledger by separating working notes and legal-review questions from submitted responses",
    "supports the chunked digital corpus workflow by preserving source/corpus traceability where needed",
    "supports the neutral evidence dossier scaffold by organizing positions and responses without deciding proof",
    "does not replace the source-status gate",
    "does not replace the issue relevance gate",
    "does not replace the working evidence memo / issue ledger",
    "does not replace the chunked digital corpus workflow",
    "does not replace the submitted appendix workflow",
    "must not create side-track workflow, bohag/lösöre workflow, schema types, runtime classes, semantic facts, or legal decision logic",
  ]);
});

test("negative boundaries preserve no sufficiency, no conclusion, and no implementation boundaries", () => {
  const docsText = readText(rebuttalMatrixDocsPath);

  assertIncludesAll(docsText, [
    "source-status classification",
    "source-backed material classification gate",
    "issue relevance classification",
    "working evidence memo / issue ledger replacement",
    "chunked digital corpus workflow replacement",
    "submitted appendix workflow replacement",
    "side-track/quarantine workflow",
    "bohag/lösöre workflow",
    "full evidence discipline gate",
    "full doctrine contract",
    "final ownership determination",
    "legal advice",
    "legal decision logic",
    "actual_swedish_samaganderatt_decision_logic",
    "evidentiary sufficiency scoring",
    "proof that any requisite is satisfied",
    "proof that any requisite is not satisfied",
    "case outcome prediction",
    "process pleading generation",
    "runtime implementation",
    "schema behavior changes",
    "semantic-fact mapping",
    "automatic legal conclusions from digital material",
    "treating counterparty assertions as truth",
    "treating party responses as truth",
    "treating admitted/overlapping fact as legal conclusion",
    "treating rebuttal matrix organization as proof",
    "treating supporting appendix reference as proof",
    "treating source-status reference as proof",
    "treating issue-relevance reference as proof",
    "treating submitted appendix reference as proof",
    "resolving disputed inferences automatically",
    "bypassing source-status gate",
    "bypassing issue relevance gate",
    "bypassing working evidence memo / issue ledger",
    "bypassing chunked digital corpus workflow",
    "bypassing submitted appendix workflow",
    "Swedish psychological violence track blending",
    "Danish psychological violence track blending",
    "general bodelning decision engine",
    "governance helper-level freeze continuation",
    "database/API/route behavior",
    "generated artifact behavior",
  ]);

  assertIncludesAll(docsText, [
    "This is a counterparty rebuttal matrix only",
    "It is not source-status classification",
    "It is not issue relevance classification",
    "It is not working evidence memo / issue ledger",
    "It is not chunked digital corpus workflow",
    "It is not submitted appendix workflow",
    "It is not side-track/quarantine workflow",
    "It is not bohag/lösöre workflow",
    "It is not schema-first work",
    "It is not runtime implementation",
    "It is not semantic-fact mapping",
    "It is not legal decision logic",
    "It must not determine whether hidden co-ownership exists in any case",
    "It must not infer legal conclusions from digital material",
    "It must not score sufficiency",
    "It must not classify any requisite as satisfied or not satisfied",
    "It must not treat counterparty statements, submitted party responses, matrix rows, supporting references, or overlapping facts as proof by themselves",
    "matrix entries must not bypass the source-status gate",
    "matrix entries must not bypass the issue relevance gate",
    "matrix entries must not bypass the working evidence memo / issue ledger",
    "matrix entries must not bypass the chunked digital corpus workflow",
    "matrix entries must not bypass the submitted appendix workflow",
  ]);
});

test("existing repo evidence confirms prior domain docs and generic SWE_BODELNING scaffolding only", () => {
  assert.equal(fs.existsSync(boundaryDocsPath), true);
  assert.equal(fs.existsSync(sourceInventoryDocsPath), true);
  assert.equal(fs.existsSync(dossierScaffoldDocsPath), true);
  assert.equal(fs.existsSync(labelScaffoldDocsPath), true);
  assert.equal(fs.existsSync(evidenceToLabelDocsPath), true);
  assert.equal(fs.existsSync(sourceStatusDocsPath), true);
  assert.equal(fs.existsSync(issueRelevanceDocsPath), true);
  assert.equal(fs.existsSync(workingLedgerDocsPath), true);
  assert.equal(fs.existsSync(chunkedCorpusDocsPath), true);
  assert.equal(fs.existsSync(submittedAppendixDocsPath), true);

  const boundaryDocsText = readText(boundaryDocsPath);
  const sourceInventoryText = readText(sourceInventoryDocsPath);
  const dossierScaffoldText = readText(dossierScaffoldDocsPath);
  const labelScaffoldText = readText(labelScaffoldDocsPath);
  const evidenceToLabelText = readText(evidenceToLabelDocsPath);
  const sourceStatusText = readText(sourceStatusDocsPath);
  const issueRelevanceText = readText(issueRelevanceDocsPath);
  const workingLedgerText = readText(workingLedgerDocsPath);
  const chunkedCorpusText = readText(chunkedCorpusDocsPath);
  const submittedAppendixText = readText(submittedAppendixDocsPath);
  const coreFreezeText = readText(coreFreezePath);
  const fullScopeFreezeText = readText(fullScopeFreezePath);
  const dossierSchemaText = readText(dossierSchemaPath);
  const coreFreezeTestText = readText(coreFreezeTestPath);
  const fullScopeFreezeTestText = readText(fullScopeFreezeTestPath);

  assert.match(boundaryDocsText, /# SWE_BODELNING_DOLD_SAMAGANDERATT Boundary Freeze/);
  assert.match(sourceInventoryText, /# SWE_BODELNING_DOLD_SAMAGANDERATT Legal\/Source Inventory/);
  assert.match(dossierScaffoldText, /# SWE_BODELNING_DOLD_SAMAGANDERATT Neutral Evidence Dossier Scaffold/);
  assert.match(labelScaffoldText, /# SWE_BODELNING_DOLD_SAMAGANDERATT Doctrine\/Requisite Label Scaffold/);
  assert.match(evidenceToLabelText, /# SWE_BODELNING_DOLD_SAMAGANDERATT Evidence-To-Label Boundary Scaffold/);
  assert.match(sourceStatusText, /# SWE_BODELNING_DOLD_SAMAGANDERATT Source-Backed Material Classification Gate/);
  assert.match(issueRelevanceText, /# SWE_BODELNING_DOLD_SAMAGANDERATT Issue Relevance Gate/);
  assert.match(workingLedgerText, /# SWE_BODELNING_DOLD_SAMAGANDERATT Working Evidence Memo \/ Issue Ledger/);
  assert.match(chunkedCorpusText, /# SWE_BODELNING_DOLD_SAMAGANDERATT Chunked Digital Corpus Workflow/);
  assert.match(submittedAppendixText, /# SWE_BODELNING_DOLD_SAMAGANDERATT Submitted Appendix Workflow/);

  assert.match(coreFreezeText, /# SWE_BODELNING Core\/Backend MVP Freeze/);
  assert.match(fullScopeFreezeText, /# SWE_BODELNING Full Scope Freeze/);

  assertIncludesAll(dossierSchemaText, [
    "SWE_BODELNING Profile Dossier Snapshot",
    "profile_input_summary",
    "profile_input_lane_snapshot",
    "evidence_reference_index",
    "evidence_exhibit_index",
    "issue_index",
    "section_index",
    "economic_contribution",
    "shared_use",
    "shared_intent",
  ]);

  assert.match(coreFreezeText, /out_of_scope:[\s\S]*actual_swedish_samaganderatt_decision_logic/);
  assert.match(fullScopeFreezeText, /out_of_scope:[\s\S]*actual_swedish_samaganderatt_decision_logic/);
  assert.match(coreFreezeTestText, /actual_swedish_samaganderatt_decision_logic/);
  assert.match(fullScopeFreezeTestText, /actual_swedish_samaganderatt_decision_logic/);
});

test("proof remains text-only and does not require runtime, source, or schema changes", () => {
  const docsText = readText(rebuttalMatrixDocsPath);

  assertIncludesAll(docsText, [
    "runtime/schema/semantic-fact mapping remains blocked",
    "actual_swedish_samaganderatt_decision_logic remains excluded/not implemented",
    "It does not implement doctrine, schema behavior, runtime behavior, semantic-fact mapping, legal decision logic, legal advice, evidentiary sufficiency scoring, proof of any requisite, or ownership conclusions",
    "prepare for later domain contract work without implementing doctrine, schema, runtime, semantic-fact mapping, or decision logic",
  ]);
});
