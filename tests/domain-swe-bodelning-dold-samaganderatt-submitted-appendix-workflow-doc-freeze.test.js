const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.join(__dirname, "..");
const submittedAppendixDocsPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_SWE_BODELNING_DOLD_SAMAGANDERATT_SUBMITTED_APPENDIX_WORKFLOW_v1.md",
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

test("submitted appendix workflow doc exists and freezes the appendix-only boundary", () => {
  assert.equal(fs.existsSync(submittedAppendixDocsPath), true);

  const docsText = readText(submittedAppendixDocsPath);

  assert.match(
    docsText,
    /# SWE_BODELNING_DOLD_SAMAGANDERATT Submitted Appendix Workflow/,
  );
  assert.match(docsText, /DOCS_ONLY submitted appendix workflow only/i);
  assert.match(docsText, /non-core appendix\/submission tracking contract/i);
  assert.match(
    docsText,
    /without treating any submission artifact as verified proof, legal conclusion, source-status classification, issue relevance classification, working-ledger classification, corpus workflow classification, evidentiary sufficiency scoring, proof of any requisite, or ownership determination/i,
  );
});

test("closed prerequisites, blocked implementation, and current exclusions remain explicit", () => {
  const docsText = readText(submittedAppendixDocsPath);

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
    "builds on those contracts but does not supersede them",
    "runtime/schema/semantic-fact mapping remains blocked",
    "actual_swedish_samaganderatt_decision_logic remains excluded/not implemented",
  ]);
});

test("appendix workflow preconditions keep prior gates separate", () => {
  const docsText = readText(submittedAppendixDocsPath);

  assertIncludesAll(docsText, [
    "The submitted appendix workflow does not perform source-status classification",
    "The submitted appendix workflow does not perform issue relevance classification",
    "The submitted appendix workflow does not perform working-ledger classification",
    "The submitted appendix workflow does not perform chunked corpus classification",
    "Appendix workflow records may point to source/corpus/excerpt/working-ledger/issue links",
    "Appendix workflow records may track submission package, version, submitted file set, recipient context, submission date, and post-submission status",
    "Appendix workflow records must not enter core proof use unless the underlying material remains source-status classified and issue-classified",
    "The source-status gate controls promotion to source-backed material",
    "The issue relevance gate controls issue-area placement",
    "The working evidence memo / issue ledger controls working-note and lead tracking",
    "The chunked digital corpus workflow controls corpus/chunk tracking before appendix candidacy",
  ]);
});

test("existing SWE_BODELNING lanes remain context only and non-decisive", () => {
  const docsText = readText(submittedAppendixDocsPath);

  assertIncludesAll(docsText, [
    "Existing `SWE_BODELNING` lane keys are context only",
    "economic_contribution",
    "shared_use",
    "shared_intent",
    "not treated as implemented hidden co-ownership decision logic",
    "appendix workflow classifications",
    "source-status classification",
    "issue relevance classification",
    "working-ledger classification",
    "corpus workflow classification",
    "sufficiency scoring",
    "proof that any requisite is satisfied",
  ]);
});

test("appendix/submission classifications are neutral classifications only", () => {
  const docsText = readText(submittedAppendixDocsPath);

  assertIncludesAll(docsText, [
    "neutral appendix/submission workflow classifications only",
    "APPENDIX_CANDIDATE",
    "SUBMITTED_APPENDIX",
    "APPENDIX_REGISTER",
    "SUBMISSION_PACKAGE",
    "SUBMISSION_VERSION",
    "SUBMITTED_FILE_SET",
    "SOURCE_TO_APPENDIX_LINK",
    "CORPUS_TO_APPENDIX_LINK",
    "EXCERPT_TO_APPENDIX_LINK",
    "WORKING_LEDGER_TO_APPENDIX_LINK",
    "ISSUE_RELEVANCE_TO_APPENDIX_LINK",
    "PROTOCOL_RESPONSE_APPENDIX",
    "SUPPLEMENTAL_SUBMISSION_APPENDIX",
    "TRANSMISSION_REFERENCE",
    "RECIPIENT_CONTEXT",
    "SUBMISSION_DATE",
    "APPENDIX_STATUS",
    "POST_SUBMISSION_STATUS",
    "MANUAL_REVIEW_REQUIRED",
  ]);

  assertNormalizedIncludesAll(docsText, [
    "These classifications are not schema fields, runtime classes, semantic-fact mappings, source-status classifications, issue relevance classifications, working-ledger classifications, corpus workflow classifications, legal conclusions, issue merits determinations, or sufficiency determinations.",
  ]);
});

test("classification rules are explicit and non-conclusive", () => {
  const docsText = readText(submittedAppendixDocsPath);

  assertIncludesAll(docsText, [
    "`APPENDIX_CANDIDATE` may identify material being considered for appendix use, but it is not submitted evidence",
    "`SUBMITTED_APPENDIX` may identify an appendix that has been submitted, but it is not proof by itself",
    "`APPENDIX_REGISTER` may identify navigation and filing structure, not evidentiary sufficiency",
    "`SUBMISSION_PACKAGE` may identify a package of submitted materials, but it is not a legal conclusion",
    "`SUBMISSION_VERSION` may identify a dated or ordered version of a submission package",
    "`SUBMITTED_FILE_SET` may identify files included in a submission package without proving their underlying facts",
    "`SOURCE_TO_APPENDIX_LINK` may connect a source artifact to an appendix for traceability, not proof",
    "`CORPUS_TO_APPENDIX_LINK` may connect corpus/chunk material to an appendix for traceability, not proof",
    "`EXCERPT_TO_APPENDIX_LINK` may connect an excerpt to an appendix for traceability, not proof",
    "`WORKING_LEDGER_TO_APPENDIX_LINK` may connect a working-ledger item to appendix follow-up without turning a working note into proof",
    "`ISSUE_RELEVANCE_TO_APPENDIX_LINK` may connect issue placement to appendix organization without treating issue placement as legal conclusion",
    "`PROTOCOL_RESPONSE_APPENDIX` may identify material submitted in response to a protocol",
    "`SUPPLEMENTAL_SUBMISSION_APPENDIX` may identify material submitted as a later supplement",
    "`TRANSMISSION_REFERENCE` may identify sending/submission context and proves at most that something was submitted or transmitted",
    "`RECIPIENT_CONTEXT` may identify recipient context without making the underlying facts true",
    "`SUBMISSION_DATE` may identify submission or version date without proving underlying facts",
    "`APPENDIX_STATUS` may identify candidate, submitted, superseded, supplemented, withdrawn, or manual-review-required status",
    "`POST_SUBMISSION_STATUS` may identify later handling, supplement, response, supersession, or manual-review status",
    "`MANUAL_REVIEW_REQUIRED` may mark that human review is needed before any evidentiary or procedural use",
  ]);
});

test("required representation rules and proof anchors remain explicit", () => {
  const docsText = readText(submittedAppendixDocsPath);

  assertIncludesAll(docsText, [
    "The first submission package may be represented as SUBMISSION_PACKAGE with SUBMISSION_VERSION, SUBMITTED_FILE_SET, APPENDIX_REGISTER, RECIPIENT_CONTEXT, SUBMISSION_DATE, and submitted appendices",
    "Bilaga 08 / key-message appendix logic may be represented as SUBMITTED_APPENDIX or APPENDIX_CANDIDATE depending on submission status, with traceable excerpt/corpus/source links and no proof-by-itself status",
    "Protocol-response appendices should be represented as PROTOCOL_RESPONSE_APPENDIX and kept distinct from first-submission appendices",
    "Supplemental submissions should be represented as SUPPLEMENTAL_SUBMISSION_APPENDIX or linked to a later SUBMISSION_VERSION, not merged into the first package unless explicitly documented",
    "Appendix status may distinguish candidate, submitted, superseded, supplemented, withdrawn, or manual-review-required states",
    "appendix candidate is not submitted evidence",
    "submitted appendix is not proof by itself",
    "submission package is not legal conclusion",
    "appendix register is navigation, not sufficiency",
    "transmission/submission reference proves at most that something was submitted/transmitted, not the truth of the underlying fact",
    "source/corpus/excerpt links must remain traceable",
  ]);
});

test("core-blocking and proof rules remain explicit", () => {
  const docsText = readText(submittedAppendixDocsPath);

  assertIncludesAll(docsText, [
    "appendix candidates are not submitted evidence",
    "submitted appendices are not proof by themselves",
    "appendix registers are navigation, not sufficiency",
    "submission packages are not legal conclusions",
    "protocol-response appendices are not proof by themselves",
    "supplemental submission appendices are not proof by themselves",
    "transmission references prove at most that something was submitted/transmitted, not the truth of the underlying fact",
    "all underlying material must still be source-status classified and issue-classified before core use",
    "source-to-appendix, corpus-to-appendix, excerpt-to-appendix, working-ledger-to-appendix, and issue-relevance-to-appendix links are traceability links, not proof",
    "appendix candidate reference from the chunked corpus workflow is not a submitted appendix",
    "submission history may be preserved without creating evidence conclusions",
  ]);
});

test("manual-review gates and relationship to prior layers remain explicit", () => {
  const docsText = readText(submittedAppendixDocsPath);

  assertIncludesAll(docsText, [
    "any attempt to treat appendix candidate as submitted evidence",
    "any attempt to treat submitted appendix as proof by itself",
    "any attempt to treat submission package as legal conclusion",
    "any attempt to treat appendix register as sufficiency assessment",
    "any attempt to treat transmission reference as proof of the underlying fact",
    "any attempt to bypass source-status gate",
    "any attempt to bypass issue relevance gate",
    "any attempt to bypass working evidence memo / issue ledger",
    "any attempt to bypass chunked digital corpus workflow",
    "any ambiguity about whether a document is an appendix candidate, submitted appendix, protocol-response appendix, supplemental appendix, or merely a source/corpus/excerpt reference",
    "any ambiguity about whether later supplemental material supersedes, supplements, or merely references earlier submitted material",
  ]);

  assertIncludesAll(docsText, [
    "supports the chunked digital corpus workflow by carrying appendix-candidate references into submitted appendix tracking",
    "supports the source-status gate by preserving source-to-appendix traceability",
    "supports the issue relevance gate by preserving issue-relevance-to-appendix traceability",
    "supports the working evidence memo / issue ledger by preserving working-ledger-to-appendix traceability without turning working notes into proof",
    "supports the neutral evidence dossier scaffold by tracking appendix and submission organization without deciding proof",
    "does not replace the source-status gate",
    "does not replace the issue relevance gate",
    "does not replace the working evidence memo / issue ledger",
    "does not replace the chunked digital corpus workflow",
    "must not create counterparty matrix, side-track workflow, bohag/lösöre workflow, schema types, runtime classes, or semantic facts",
  ]);
});

test("negative boundaries preserve no sufficiency, no conclusion, and no implementation boundaries", () => {
  const docsText = readText(submittedAppendixDocsPath);

  assertIncludesAll(docsText, [
    "source-status classification",
    "source-backed material classification gate",
    "issue relevance classification",
    "working evidence memo / issue ledger replacement",
    "chunked digital corpus workflow replacement",
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
    "treating appendix candidate as submitted evidence",
    "treating submitted appendix as proof by itself",
    "treating submission package as legal conclusion",
    "treating appendix register as sufficiency assessment",
    "treating transmission/submission reference as proof of underlying fact",
    "bypassing source-status gate",
    "bypassing issue relevance gate",
    "bypassing working evidence memo / issue ledger",
    "bypassing chunked digital corpus workflow",
    "Swedish psychological violence track blending",
    "Danish psychological violence track blending",
    "general bodelning decision engine",
    "governance helper-level freeze continuation",
    "database/API/route behavior",
    "generated artifact behavior",
  ]);

  assertIncludesAll(docsText, [
    "This is a submitted appendix workflow only",
    "It is not source-status classification",
    "It is not issue relevance classification",
    "It is not working evidence memo / issue ledger",
    "It is not chunked digital corpus workflow",
    "It is not counterparty rebuttal matrix",
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
    "It must not treat appendix candidates, submitted appendices, appendix registers, submission packages, protocol-response appendices, or supplemental submissions as proof by themselves",
    "submitted material must not bypass the source-status gate",
    "submitted material must not bypass the issue relevance gate",
    "submitted material must not bypass the working evidence memo / issue ledger",
    "submitted material must not bypass the chunked digital corpus workflow",
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

  const boundaryDocsText = readText(boundaryDocsPath);
  const sourceInventoryText = readText(sourceInventoryDocsPath);
  const dossierScaffoldText = readText(dossierScaffoldDocsPath);
  const labelScaffoldText = readText(labelScaffoldDocsPath);
  const evidenceToLabelText = readText(evidenceToLabelDocsPath);
  const sourceStatusText = readText(sourceStatusDocsPath);
  const issueRelevanceText = readText(issueRelevanceDocsPath);
  const workingLedgerText = readText(workingLedgerDocsPath);
  const chunkedCorpusText = readText(chunkedCorpusDocsPath);
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
  const docsText = readText(submittedAppendixDocsPath);

  assertIncludesAll(docsText, [
    "runtime/schema/semantic-fact mapping remains blocked",
    "actual_swedish_samaganderatt_decision_logic remains excluded/not implemented",
    "It does not implement doctrine, schema behavior, runtime behavior, semantic-fact mapping, legal decision logic, legal advice, evidentiary sufficiency scoring, proof of any requisite, or ownership conclusions",
    "prepare for later domain contract work without implementing doctrine, schema, runtime, semantic-fact mapping, or decision logic",
  ]);
});
