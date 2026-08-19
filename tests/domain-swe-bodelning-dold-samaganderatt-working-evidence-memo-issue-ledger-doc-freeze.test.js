const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.join(__dirname, "..");
const workingLedgerDocsPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_SWE_BODELNING_DOLD_SAMAGANDERATT_WORKING_EVIDENCE_MEMO_ISSUE_LEDGER_v1.md",
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

test("working evidence memo / issue ledger doc exists and freezes the ledger-only boundary", () => {
  assert.equal(fs.existsSync(workingLedgerDocsPath), true);

  const docsText = readText(workingLedgerDocsPath);

  assert.match(
    docsText,
    /# SWE_BODELNING_DOLD_SAMAGANDERATT Working Evidence Memo \/ Issue Ledger/,
  );
  assert.match(docsText, /DOCS_ONLY working evidence memo \/ issue ledger only/i);
  assert.match(docsText, /non-core working ledger/i);
  assert.match(
    docsText,
    /without treating that material as verified proof, legal conclusion, source-status classification, issue relevance classification, evidentiary sufficiency scoring, proof of any requisite, or ownership determination/i,
  );
});

test("closed prerequisites, blocked implementation, and current exclusions remain explicit", () => {
  const docsText = readText(workingLedgerDocsPath);

  assertIncludesAll(docsText, [
    "boundary/prerequisite freeze is closed at `1a6d6c6`",
    "legal/source inventory contract is closed at `6fa0a4a`",
    "neutral evidence dossier scaffold is closed at `625e538`",
    "doctrine/requisite label scaffold is closed at `ed13c92`",
    "evidence-to-label boundary scaffold is closed at `93edca0`",
    "source-backed material classification gate is closed at `4a20f9f`",
    "issue relevance gate is closed at `591a98a`",
    "builds on those contracts but does not supersede them",
    "runtime/schema/semantic-fact mapping remains blocked",
    "actual_swedish_samaganderatt_decision_logic remains excluded/not implemented",
  ]);
});

test("source-status and issue-relevance preconditions stay separate from the working ledger", () => {
  const docsText = readText(workingLedgerDocsPath);

  assertIncludesAll(docsText, [
    "The working ledger does not perform source-status classification",
    "The working ledger does not perform issue relevance classification",
    "A working-ledger entry may point to source-status follow-up needs",
    "A working-ledger entry may point to issue-relevance follow-up needs",
    "Working-ledger material must not enter core dossier use unless later source-backed and issue-classified",
    "The source-status gate controls promotion to source-backed material",
    "The issue relevance gate controls later issue-area placement",
  ]);
});

test("existing SWE_BODELNING lanes remain context only and non-decisive", () => {
  const docsText = readText(workingLedgerDocsPath);

  assertIncludesAll(docsText, [
    "Existing `SWE_BODELNING` lane keys are context only",
    "economic_contribution",
    "shared_use",
    "shared_intent",
    "not treated as implemented hidden co-ownership decision logic",
    "working ledger classifications",
    "source-status classification",
    "issue relevance classification",
    "sufficiency scoring",
    "proof that any requisite is satisfied",
  ]);
});

test("working-ledger classifications are neutral classifications only", () => {
  const docsText = readText(workingLedgerDocsPath);

  assertIncludesAll(docsText, [
    "neutral working-ledger classifications only",
    "WORKING_NOTE",
    "OPEN_QUESTION",
    "LEGAL_REVIEW_QUESTION",
    "HYPOTHESIS_ONLY",
    "UNVERIFIED_SOURCE_LEAD",
    "SOURCE_CANDIDATE_TO_VERIFY",
    "SOURCE_INTEGRITY_CONCERN",
    "DESCRIPTION_DRAFT",
    "DESCRIPTION_SUPERSEDED_BY_LATER_VERSION",
    "FOLLOW_UP_REQUIRED",
    "MANUAL_REVIEW_REQUIRED",
    "BLOCKED_FROM_CORE_UNTIL_SOURCE_BACKED_AND_ISSUE_CLASSIFIED",
  ]);

  assertNormalizedIncludesAll(docsText, [
    "These classifications are not schema fields, runtime classes, semantic-fact mappings, source-status classifications, issue relevance classifications, legal conclusions, issue merits determinations, or sufficiency determinations.",
  ]);
});

test("classification rules are explicit and non-conclusive", () => {
  const docsText = readText(workingLedgerDocsPath);

  assertIncludesAll(docsText, [
    "`WORKING_NOTE` may preserve a non-core note, draft observation, or working reminder",
    "`OPEN_QUESTION` may preserve a factual, procedural, source, or evidence question that needs follow-up",
    "`LEGAL_REVIEW_QUESTION` may preserve a question for human legal review, such as “what does this mean legally?”, but it must not answer the legal question",
    "`HYPOTHESIS_ONLY` may preserve a theory, interpretation, or possible explanation without treating it as fact",
    "`UNVERIFIED_SOURCE_LEAD` may preserve a lead that lacks sufficient documentary/source support",
    "`SOURCE_CANDIDATE_TO_VERIFY` may preserve a possible source artifact to obtain or check",
    "`SOURCE_INTEGRITY_CONCERN` may preserve an allegation or concern about deletion, editing, alteration, provenance, or integrity until technical/source verification",
    "`DESCRIPTION_DRAFT` may preserve an early description that has not been submitted or source-backed",
    "`DESCRIPTION_SUPERSEDED_BY_LATER_VERSION` may preserve an earlier description that has been narrowed, softened, corrected, or superseded by later wording",
    "`FOLLOW_UP_REQUIRED` may preserve that further source review, factual review, product review, or legal review is needed",
    "`MANUAL_REVIEW_REQUIRED` may preserve that a human must review before any promotion or use",
    "`BLOCKED_FROM_CORE_UNTIL_SOURCE_BACKED_AND_ISSUE_CLASSIFIED` must preserve that the material cannot support the hidden-co-ownership core unless it later passes source-status and issue-relevance gates",
  ]);
});

test("example handling and core-blocking anchors remain explicit", () => {
  const docsText = readText(workingLedgerDocsPath);

  assertIncludesAll(docsText, [
    "Source-derived working material remains working-ledger material unless linked to verified/extracted source material and then separately passes source-status and issue relevance classification",
    "Working notes are not verified proof",
    "Hypotheses are not facts",
    "Legal-review questions are not legal conclusions",
    "Unverified leads are not source-backed evidence",
    "Source-integrity concerns remain leads until technical or source verification",
    "A later, more cautious submitted version may supersede an earlier working description without erasing the historical working record",
    "Working-ledger material must not bypass the source-status gate",
    "Working-ledger material must not bypass the issue relevance gate",
    "working notes stay out of core dossier",
    "hypotheses stay out of core dossier",
    "unverified leads stay out of core dossier",
    "legal-review questions stay out of core dossier",
    "source-integrity concerns stay out of core dossier until verified",
    "evolving descriptions stay out of core dossier unless replaced by source-backed and issue-classified material",
    "a working-ledger entry may be promoted only by later linking to VERIFIED_SOURCE_ARTIFACT or EXTRACTED_SOURCE_EXCERPT under the source-status gate",
    "after source-status promotion, separate issue relevance classification is still required before core placement",
    "working-ledger history may be preserved without becoming evidence",
  ]);
});

test("manual-review gates and relationship to prior layers remain explicit", () => {
  const docsText = readText(workingLedgerDocsPath);

  assertIncludesAll(docsText, [
    "any “what does this mean legally?” question",
    "any attempt to turn a working note into proof",
    "any attempt to treat a hypothesis as a legal inference",
    "any source-integrity allegation without technical/source verification",
    "any evolving description where later wording materially narrows or softens an earlier claim",
    "any attempt to move working-ledger material into core dossier use",
    "any ambiguity about whether an item is a note, submission, source-backed artifact, or counterparty position",
    "any attempt to bypass the source-status gate",
    "any attempt to bypass the issue relevance gate",
    "any attempt to use working-ledger material as proof that a requisite is satisfied or not satisfied",
  ]);

  assertIncludesAll(docsText, [
    "supports the source-status gate by preserving leads until source-backed promotion can be assessed",
    "supports the issue relevance gate by preserving follow-up needs before issue placement",
    "supports the neutral evidence dossier scaffold by keeping non-core working material outside the core dossier",
    "does not replace the source-status gate",
    "does not replace the issue relevance gate",
    "does not replace the neutral evidence dossier scaffold",
    "must not create submitted appendix workflow, counterparty matrix, side-track workflow, schema types, runtime classes, or semantic facts",
  ]);
});

test("negative boundaries preserve no sufficiency, no conclusion, and no implementation boundaries", () => {
  const docsText = readText(workingLedgerDocsPath);

  assertIncludesAll(docsText, [
    "source-status classification",
    "source-backed material classification gate",
    "issue relevance classification",
    "submitted appendix workflow",
    "counterparty rebuttal matrix",
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
    "treating working notes as verified proof",
    "treating hypotheses as facts",
    "treating legal-review questions as legal conclusions",
    "treating unverified leads as source-backed evidence",
    "bypassing source-status gate",
    "bypassing issue relevance gate",
    "Swedish psychological violence track blending",
    "Danish psychological violence track blending",
    "general bodelning decision engine",
    "governance helper-level freeze continuation",
    "database/API/route behavior",
    "generated artifact behavior",
  ]);

  assertIncludesAll(docsText, [
    "This is a working evidence memo / issue ledger only",
    "It is not source-status classification",
    "It is not issue relevance classification",
    "It is not a submitted appendix workflow",
    "It is not a counterparty rebuttal matrix",
    "It is not a side-track/quarantine workflow",
    "It is not a bohag/lösöre workflow",
    "It is not schema-first work",
    "It is not runtime implementation",
    "It is not semantic-fact mapping",
    "It is not legal decision logic",
    "It must not determine whether hidden co-ownership exists in any case",
    "It must not infer legal conclusions from digital material",
    "It must not score sufficiency",
    "It must not classify any requisite as satisfied or not satisfied",
    "It must not treat source-derived working material as verified proof",
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

  const boundaryDocsText = readText(boundaryDocsPath);
  const sourceInventoryText = readText(sourceInventoryDocsPath);
  const dossierScaffoldText = readText(dossierScaffoldDocsPath);
  const labelScaffoldText = readText(labelScaffoldDocsPath);
  const evidenceToLabelText = readText(evidenceToLabelDocsPath);
  const sourceStatusText = readText(sourceStatusDocsPath);
  const issueRelevanceText = readText(issueRelevanceDocsPath);
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
  const docsText = readText(workingLedgerDocsPath);

  assertIncludesAll(docsText, [
    "runtime/schema/semantic-fact mapping remains blocked",
    "actual_swedish_samaganderatt_decision_logic remains excluded/not implemented",
    "It does not implement doctrine, schema behavior, runtime behavior, semantic-fact mapping, legal decision logic, legal advice, evidentiary sufficiency scoring, proof of any requisite, or ownership conclusions",
    "prepare for later domain contract work without implementing doctrine, schema, runtime, semantic-fact mapping, or decision logic",
  ]);
});
