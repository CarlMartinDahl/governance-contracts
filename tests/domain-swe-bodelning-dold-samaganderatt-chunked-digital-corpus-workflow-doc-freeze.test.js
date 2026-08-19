const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.join(__dirname, "..");
const chunkedCorpusDocsPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_SWE_BODELNING_DOLD_SAMAGANDERATT_CHUNKED_DIGITAL_CORPUS_WORKFLOW_v1.md",
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

test("chunked digital corpus workflow doc exists and freezes the corpus-only boundary", () => {
  assert.equal(fs.existsSync(chunkedCorpusDocsPath), true);

  const docsText = readText(chunkedCorpusDocsPath);

  assert.match(
    docsText,
    /# SWE_BODELNING_DOLD_SAMAGANDERATT Chunked Digital Corpus Workflow/,
  );
  assert.match(docsText, /DOCS_ONLY chunked digital corpus workflow only/i);
  assert.match(docsText, /non-core corpus\/chunk tracking contract/i);
  assert.match(
    docsText,
    /without treating that material as verified proof, legal conclusion, source-status classification, issue relevance classification, working-ledger classification, submitted appendix workflow, evidentiary sufficiency scoring, proof of any requisite, or ownership determination/i,
  );
});

test("closed prerequisites, blocked implementation, and current exclusions remain explicit", () => {
  const docsText = readText(chunkedCorpusDocsPath);

  assertIncludesAll(docsText, [
    "boundary/prerequisite freeze is closed at `1a6d6c6`",
    "legal/source inventory contract is closed at `6fa0a4a`",
    "neutral evidence dossier scaffold is closed at `625e538`",
    "doctrine/requisite label scaffold is closed at `ed13c92`",
    "evidence-to-label boundary scaffold is closed at `93edca0`",
    "source-backed material classification gate is closed at `4a20f9f`",
    "issue relevance gate is closed at `591a98a`",
    "working evidence memo / issue ledger is closed at `0073dde`",
    "builds on those contracts but does not supersede them",
    "runtime/schema/semantic-fact mapping remains blocked",
    "actual_swedish_samaganderatt_decision_logic remains excluded/not implemented",
  ]);
});

test("corpus workflow preconditions keep prior gates separate", () => {
  const docsText = readText(chunkedCorpusDocsPath);

  assertIncludesAll(docsText, [
    "The corpus workflow does not perform source-status classification",
    "The corpus workflow does not perform issue relevance classification",
    "The corpus workflow does not perform working-ledger classification",
    "A corpus record may point to source-status follow-up needs",
    "A corpus record may point to issue-relevance follow-up needs",
    "A corpus record may point to a working-ledger entry",
    "Corpus material must not enter core dossier use unless later excerpted, source-status classified, and issue-classified",
    "The source-status gate controls promotion to source-backed material",
    "The issue relevance gate controls later issue-area placement",
    "The working evidence memo / issue ledger controls working-note and lead tracking",
  ]);
});

test("existing SWE_BODELNING lanes remain context only and non-decisive", () => {
  const docsText = readText(chunkedCorpusDocsPath);

  assertIncludesAll(docsText, [
    "Existing `SWE_BODELNING` lane keys are context only",
    "economic_contribution",
    "shared_use",
    "shared_intent",
    "not treated as implemented hidden co-ownership decision logic",
    "corpus workflow classifications",
    "source-status classification",
    "issue relevance classification",
    "working-ledger classification",
    "sufficiency scoring",
    "proof that any requisite is satisfied",
  ]);
});

test("corpus/chunk classifications are neutral classifications only", () => {
  const docsText = readText(chunkedCorpusDocsPath);

  assertIncludesAll(docsText, [
    "neutral corpus/chunk workflow classifications only",
    "DIGITAL_EVIDENCE_CORPUS",
    "MESSAGE_CORPUS",
    "MESSAGE_CORPUS_CHUNK",
    "MESSAGE_TEXT_CHUNK",
    "MESSAGE_PDF_EXPORT",
    "EMBEDDED_MEDIA_REFERENCE",
    "EMAIL_CORPUS_ITEM",
    "SOURCE_FILE_REFERENCE",
    "CORPUS_DATE_RANGE",
    "CHUNK_INDEX",
    "CHARACTER_RANGE",
    "PAGE_RANGE",
    "PARTICIPANT_IDENTIFIER",
    "EXTRACTION_STATUS",
    "LINKED_EXCERPT_REFERENCE",
    "LINKED_WORKING_LEDGER_ENTRY",
    "SOURCE_STATUS_FOLLOW_UP",
    "ISSUE_RELEVANCE_FOLLOW_UP",
    "APPENDIX_CANDIDATE_REFERENCE",
    "MANUAL_REVIEW_REQUIRED",
  ]);

  assertNormalizedIncludesAll(docsText, [
    "These classifications are not schema fields, runtime classes, semantic-fact mappings, source-status classifications, issue relevance classifications, working-ledger classifications, legal conclusions, issue merits determinations, or sufficiency determinations.",
  ]);
});

test("classification rules are explicit and non-conclusive", () => {
  const docsText = readText(chunkedCorpusDocsPath);

  assertIncludesAll(docsText, [
    "`DIGITAL_EVIDENCE_CORPUS` may identify a broad digital source collection",
    "`MESSAGE_CORPUS` may identify a message-history corpus",
    "`MESSAGE_CORPUS_CHUNK` may identify a chunk within a message-history corpus",
    "`MESSAGE_TEXT_CHUNK` may identify a text extraction view of a message corpus chunk",
    "`MESSAGE_PDF_EXPORT` may identify a PDF export view of message data",
    "`EMBEDDED_MEDIA_REFERENCE` may identify images, attachments, or other media embedded in message exports",
    "`EMAIL_CORPUS_ITEM` may identify an email or email PDF item and must remain separate from message corpus chunks unless later bridged by another contract",
    "`SOURCE_FILE_REFERENCE` may identify the source file name, location, or reference without making the file proof",
    "`CORPUS_DATE_RANGE` may identify the date range covered by a corpus or chunk",
    "`CHUNK_INDEX` may identify chunk order within a corpus",
    "`CHARACTER_RANGE` may identify text range within a text chunk",
    "`PAGE_RANGE` may identify page range within a PDF export",
    "`PARTICIPANT_IDENTIFIER` may identify participant labels or handles without deciding identity disputes",
    "`EXTRACTION_STATUS` may identify whether text, PDF, screenshot, OCR, or other extraction is complete, partial, uncertain, or manually reviewed",
    "`LINKED_EXCERPT_REFERENCE` may point to a later excerpt candidate, but the excerpt must separately pass source-status and issue-relevance gates",
    "`LINKED_WORKING_LEDGER_ENTRY` may point to a working-ledger entry without turning corpus material into a working-note conclusion",
    "`SOURCE_STATUS_FOLLOW_UP` may mark that later source-status classification is needed",
    "`ISSUE_RELEVANCE_FOLLOW_UP` may mark that later issue-relevance classification is needed",
    "`APPENDIX_CANDIDATE_REFERENCE` may identify possible future appendix use without making the item submitted evidence",
    "`MANUAL_REVIEW_REQUIRED` may mark that human review is needed before any promotion or use",
  ]);
});

test("representation rules and proof anchors remain explicit", () => {
  const docsText = readText(chunkedCorpusDocsPath);

  assertIncludesAll(docsText, [
    "A five-year message history split into five chunks should be represented as one MESSAGE_CORPUS with five MESSAGE_CORPUS_CHUNK records",
    "Each MESSAGE_CORPUS_CHUNK should preserve CHUNK_INDEX, CORPUS_DATE_RANGE, SOURCE_FILE_REFERENCE, EXTRACTION_STATUS, PARTICIPANT_IDENTIFIER handling",
    "None of the five chunks is proof by itself",
    "TXT chunks should be MESSAGE_TEXT_CHUNK extraction views",
    "PDF message exports should be MESSAGE_PDF_EXPORT records with PAGE_RANGE and an explicit warning that the PDF is not the original platform record",
    "Images or media inside message exports should be EMBEDDED_MEDIA_REFERENCE items requiring separate source/provenance tracking",
    "Email PDFs should be tracked as EMAIL_CORPUS_ITEM, not MESSAGE_CORPUS_CHUNK, unless a later contract explicitly bridges them",
    "corpus chunks are not proof by themselves",
    "TXT chunks are not original source",
    "PDF exports are not original platform records",
    "embedded media requires separate source/provenance tracking",
    "Email PDFs remain separate from message corpus chunks unless later bridged by a separate contract",
    "excerpts must later pass source-status and issue-relevance gates",
  ]);
});

test("core-blocking and promotion rules remain explicit", () => {
  const docsText = readText(chunkedCorpusDocsPath);

  assertIncludesAll(docsText, [
    "corpus chunks stay out of core dossier unless later excerpted, source-status classified, and issue-classified",
    "TXT chunks are not original source",
    "PDF exports are not original platform records",
    "embedded media is not verified without separate source/provenance tracking",
    "email PDFs stay separate from message corpus chunks unless later source-status and issue relevance gates connect them",
    "appendix candidate reference is not a submitted appendix",
    "appendix candidate reference is not proof",
    "linked excerpt reference is not proof until separately source-status classified and issue-classified",
    "corpus records may preserve navigation, location, and extraction information without creating evidence conclusions",
  ]);
});

test("manual-review gates and relationship to prior layers remain explicit", () => {
  const docsText = readText(chunkedCorpusDocsPath);

  assertIncludesAll(docsText, [
    "any claim that a chunk is proof",
    "any uncertainty about original platform source versus export",
    "any PDF export with images or formatting-dependent meaning",
    "any embedded media without separate provenance",
    "any participant identity ambiguity",
    "any altered/deleted/partial message-history concern",
    "any attempt to promote corpus material into core dossier use",
    "any attempt to treat appendix candidacy as submission or proof",
    "any attempt to bypass the source-status gate",
    "any attempt to bypass the issue relevance gate",
    "any attempt to bypass the working evidence memo / issue ledger",
  ]);

  assertIncludesAll(docsText, [
    "supports the source-status gate by tracking corpus records before excerpt/source promotion",
    "supports the issue relevance gate by preserving later issue-placement follow-up",
    "supports the working evidence memo / issue ledger by linking raw corpus material to working notes, leads, or follow-up items without turning them into proof",
    "supports the evidence-to-label boundary only after excerpts have passed later gates",
    "does not replace the source-status gate",
    "does not replace the issue relevance gate",
    "does not replace the working evidence memo / issue ledger",
    "must not create submitted appendix workflow, counterparty matrix, side-track workflow, schema types, runtime classes, or semantic facts",
  ]);
});

test("negative boundaries preserve no sufficiency, no conclusion, and no implementation boundaries", () => {
  const docsText = readText(chunkedCorpusDocsPath);

  assertIncludesAll(docsText, [
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
    "source-status classification",
    "source-backed material classification gate",
    "issue relevance classification",
    "working evidence memo / issue ledger replacement",
    "submitted appendix workflow",
    "counterparty rebuttal matrix",
    "side-track/quarantine workflow",
    "bohag/lösöre workflow",
    "treating corpus chunks as proof",
    "treating TXT chunks as original source",
    "treating PDF exports as original platform records",
    "treating embedded media as verified without separate provenance",
    "treating email PDFs as message corpus chunks unless a later contract explicitly bridges them",
    "treating appendix candidate references as submitted evidence",
    "bypassing source-status gate",
    "bypassing issue relevance gate",
    "bypassing working evidence memo / issue ledger",
    "Swedish psychological violence track blending",
    "Danish psychological violence track blending",
    "general bodelning decision engine",
    "governance helper-level freeze continuation",
    "database/API/route behavior",
    "generated artifact behavior",
  ]);

  assertIncludesAll(docsText, [
    "This is a chunked digital corpus workflow only",
    "It is not source-status classification",
    "It is not issue relevance classification",
    "It is not working evidence memo / issue ledger",
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
    "It must not treat message chunks, text chunks, PDF exports, embedded media, or email PDFs as proof by themselves",
    "corpus material must not bypass the source-status gate",
    "corpus material must not bypass the issue relevance gate",
    "corpus material must not bypass the working evidence memo / issue ledger",
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

  const boundaryDocsText = readText(boundaryDocsPath);
  const sourceInventoryText = readText(sourceInventoryDocsPath);
  const dossierScaffoldText = readText(dossierScaffoldDocsPath);
  const labelScaffoldText = readText(labelScaffoldDocsPath);
  const evidenceToLabelText = readText(evidenceToLabelDocsPath);
  const sourceStatusText = readText(sourceStatusDocsPath);
  const issueRelevanceText = readText(issueRelevanceDocsPath);
  const workingLedgerText = readText(workingLedgerDocsPath);
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
  const docsText = readText(chunkedCorpusDocsPath);

  assertIncludesAll(docsText, [
    "runtime/schema/semantic-fact mapping remains blocked",
    "actual_swedish_samaganderatt_decision_logic remains excluded/not implemented",
    "It does not implement doctrine, schema behavior, runtime behavior, semantic-fact mapping, legal decision logic, legal advice, evidentiary sufficiency scoring, proof of any requisite, or ownership conclusions",
    "prepare for later domain contract work without implementing doctrine, schema, runtime, semantic-fact mapping, or decision logic",
  ]);
});
