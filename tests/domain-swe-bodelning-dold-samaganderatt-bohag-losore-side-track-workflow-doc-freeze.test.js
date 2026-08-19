const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.join(__dirname, "..");
const sideTrackDocsPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_SWE_BODELNING_DOLD_SAMAGANDERATT_BOHAG_LOSORE_SIDE_TRACK_WORKFLOW_v1.md",
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
const rebuttalMatrixDocsPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_SWE_BODELNING_DOLD_SAMAGANDERATT_COUNTERPARTY_REBUTTAL_MATRIX_v1.md",
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

test("bohag/losore side-track workflow doc exists and freezes the side-track-only boundary", () => {
  assert.equal(fs.existsSync(sideTrackDocsPath), true);

  const docsText = readText(sideTrackDocsPath);

  assert.match(
    docsText,
    /# SWE_BODELNING_DOLD_SAMAGANDERATT Bohag\/Lösöre Side-Track Workflow/,
  );
  assert.match(docsText, /DOCS_ONLY bohag\/lösöre side-track workflow only/i);
  assert.match(docsText, /non-core side-track workflow contract/i);
  assert.match(
    docsText,
    /keeps bohag\/lösöre material separate from hidden-co-ownership core proof/i,
  );
});

test("closed prerequisites, blocked implementation, and current exclusions remain explicit", () => {
  const docsText = readText(sideTrackDocsPath);

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
    "counterparty rebuttal matrix is closed at `011cb0b`",
    "builds on those contracts but does not supersede them",
    "runtime/schema/semantic-fact mapping remains blocked",
    "actual_swedish_samaganderatt_decision_logic remains excluded/not implemented",
  ]);
});

test("side-track workflow preconditions keep prior gates separate", () => {
  const docsText = readText(sideTrackDocsPath);

  assertIncludesAll(docsText, [
    "The bohag/lösöre side-track workflow does not perform source-status classification",
    "The bohag/lösöre side-track workflow does not perform issue relevance classification",
    "The bohag/lösöre side-track workflow does not perform working-ledger classification",
    "The bohag/lösöre side-track workflow does not perform chunked corpus classification",
    "The bohag/lösöre side-track workflow does not perform submitted appendix workflow classification",
    "The bohag/lösöre side-track workflow does not perform counterparty rebuttal matrix classification",
    "Side-track records may point to source-status references",
    "Side-track records may point to issue-relevance references",
    "Side-track records may point to submitted appendix references",
    "Side-track records may point to counterparty rebuttal matrix entries",
    "Side-track records may preserve item, value, return, possession, access, and fixture/improvement issues without resolving them",
    "Side-track records must not enter hidden-co-ownership core proof unless separately source-backed and issue-classified to core under later review",
    "The source-status gate controls source-backed material status",
    "The issue relevance gate controls issue-area placement",
    "The working evidence memo / issue ledger controls working-note and lead tracking",
    "The chunked digital corpus workflow controls corpus/chunk tracking",
    "The submitted appendix workflow controls appendix/submission tracking",
    "The counterparty rebuttal matrix controls counterparty-position and party-response organization",
  ]);
});

test("existing SWE_BODELNING lanes remain context only and non-decisive", () => {
  const docsText = readText(sideTrackDocsPath);

  assertIncludesAll(docsText, [
    "Existing `SWE_BODELNING` lane keys are context only",
    "economic_contribution",
    "shared_use",
    "shared_intent",
    "not treated as implemented hidden co-ownership decision logic",
    "bohag/lösöre side-track classifications",
    "source-status classification",
    "issue relevance classification",
    "working-ledger classification",
    "corpus workflow classification",
    "submitted appendix workflow classification",
    "counterparty rebuttal matrix classification",
    "sufficiency scoring",
    "proof that any hidden-co-ownership requisite is satisfied",
  ]);
});

test("bohag/losore classifications are neutral side-track workflow classifications only", () => {
  const docsText = readText(sideTrackDocsPath);

  assertIncludesAll(docsText, [
    "neutral bohag/lösöre side-track workflow classifications only",
    "BOHAG_LOSORE_SIDE_TRACK",
    "MOVABLE_PROPERTY_ITEM",
    "ITEM_CATEGORY",
    "RETURN_REQUEST",
    "VALUE_IN_BODELNING_ALTERNATIVE",
    "ITEM_RECEIPT_REFERENCE",
    "ITEM_APPENDIX_REFERENCE",
    "COUNTERPARTY_ITEM_LIST",
    "SUBMITTED_PARTY_ITEM_SUPPLEMENT",
    "DISPUTED_ITEM_INCLUSION",
    "DISPUTED_ITEM_VALUE",
    "POSSESSION_LOCATION_NOTE",
    "RETRIEVAL_ACCESS_LOGISTICS_REFERENCE",
    "IMPROVEMENT_OR_FIXTURE_AMBIGUITY",
    "MANUAL_REVIEW_REQUIRED",
    "EXCLUDED_FROM_HIDDEN_CO_OWNERSHIP_CORE",
  ]);

  assertNormalizedIncludesAll(docsText, [
    "These classifications are not schema fields, runtime classes, semantic-fact mappings, source-status classifications, issue relevance classifications, working-ledger classifications, corpus workflow classifications, submitted appendix workflow classifications, counterparty rebuttal matrix classifications, legal conclusions, item ownership determinations, hidden-co-ownership conclusions, issue merits determinations, or sufficiency determinations.",
  ]);
});

test("classification rules are explicit and non-conclusive", () => {
  const docsText = readText(sideTrackDocsPath);

  assertIncludesAll(docsText, [
    "`BOHAG_LOSORE_SIDE_TRACK` may identify the separate bodelning-adjacent side-track for movable-property and household-goods issues",
    "`MOVABLE_PROPERTY_ITEM` may identify an item or item group without deciding ownership",
    "`ITEM_CATEGORY` may identify category labels such as furniture, electronics, kitchen/hushåll, bedroom, outdoor, tools, garden equipment, or miscellaneous categories without deciding ownership or value",
    "`RETURN_REQUEST` may identify a request that an item be returned, but not proof of ownership or hidden co-ownership",
    "`VALUE_IN_BODELNING_ALTERNATIVE` may identify an alternative request that value be considered within bodelning, but not legal decision logic",
    "`ITEM_RECEIPT_REFERENCE` may identify a receipt, invoice, or payment reference for traceability, not proof by itself",
    "`ITEM_APPENDIX_REFERENCE` may identify an appendix or submitted appendix reference for traceability, not proof by itself",
    "`COUNTERPARTY_ITEM_LIST` may identify counterparty's or counterparty's item list, but not truth or completeness by itself",
    "`SUBMITTED_PARTY_ITEM_SUPPLEMENT` may identify submitted party's submitted supplement or item list, but not truth or completeness by itself",
    "`DISPUTED_ITEM_INCLUSION` may identify a dispute about whether an item belongs in the side-track",
    "`DISPUTED_ITEM_VALUE` may identify a dispute about value, depreciation, condition, currency, or valuation method",
    "`POSSESSION_LOCATION_NOTE` may identify where an item is said to be located or possessed without deciding ownership",
    "`RETRIEVAL_ACCESS_LOGISTICS_REFERENCE` may identify retrieval, pickup, key, access, timing, representative, or safety/logistics information without deciding ownership or value",
    "`IMPROVEMENT_OR_FIXTURE_AMBIGUITY` may identify items that may be movable property, fixture, improvement, or property-related contribution and must remain manual-review gated",
    "`MANUAL_REVIEW_REQUIRED` may identify that human review is required before any evidentiary, valuation, return, or legal use",
    "`EXCLUDED_FROM_HIDDEN_CO_OWNERSHIP_CORE` may identify side-track material that must not enter hidden-co-ownership core proof",
  ]);
});

test("required representation rules remain explicit", () => {
  const docsText = readText(sideTrackDocsPath);

  assertIncludesAll(docsText, [
    "counterparty's item list may be represented as COUNTERPARTY_ITEM_LIST, with item-level MOVABLE_PROPERTY_ITEM entries, but not truth or completeness by itself",
    "submitted party's supplemental item list may be represented as SUBMITTED_PARTY_ITEM_SUPPLEMENT, but not truth or completeness by itself",
    "Receipts may be represented as ITEM_RECEIPT_REFERENCE, not proof by themselves",
    "Item appendix references may be represented as ITEM_APPENDIX_REFERENCE, not proof by themselves",
    "Return requests may be represented as RETURN_REQUEST, not ownership conclusions",
    "Value alternatives may be represented as VALUE_IN_BODELNING_ALTERNATIVE, not legal decision logic",
    "Elmarkis or tralldäck/skiljevägg style items may be represented as IMPROVEMENT_OR_FIXTURE_AMBIGUITY and must be manual-review gated",
    "Retrieval/access logistics may be represented as RETRIEVAL_ACCESS_LOGISTICS_REFERENCE or POSSESSION_LOCATION_NOTE and must remain separate from ownership/value",
    "Categories such as vardagsrum, elektronik/kök/hushåll, sovrum, utomhus, tools, garden equipment, or övrigt may be represented as ITEM_CATEGORY and must not decide ownership or value",
  ]);
});

test("core-blocking and proof rules remain explicit", () => {
  const docsText = readText(sideTrackDocsPath);

  assertIncludesAll(docsText, [
    "bohag/lösöre remains separate from hidden-co-ownership core",
    "bohag/lösöre side-track entries must stay out of hidden-co-ownership core unless separately source-backed and issue-classified to core under later review",
    "item return requests are not proof of hidden co-ownership",
    "value-in-bodelning alternatives are not proof of hidden co-ownership",
    "item value claims are not proof of hidden co-ownership",
    "item possession/access logistics are not proof of hidden co-ownership",
    "counterparty item lists are not complete or true by themselves",
    "submitted party item supplements are not complete or true by themselves",
    "improvement-or-fixture ambiguity must stay out of hidden-co-ownership core unless manually reviewed",
    "item receipt references are traceability links, not proof of hidden co-ownership",
    "item appendix references are traceability links, not proof of hidden co-ownership",
    "access/retrieval logistics are not ownership conclusions",
    "item valuation is not legal decision logic",
    "side-track history may be preserved without creating evidence conclusions about hidden co-ownership",
  ]);
});

test("manual-review gates remain explicit and preserve prior gates", () => {
  const docsText = readText(sideTrackDocsPath);

  assertIncludesAll(docsText, [
    "disputed item inclusion",
    "disputed item value",
    "unclear ownership or possession",
    "missing receipt/source link",
    "missing appendix link where one is claimed",
    "improvement-or-fixture ambiguity",
    "access/retrieval conflict",
    "any attempt to use item return request as proof of hidden co-ownership",
    "any attempt to use item value claim as proof of hidden co-ownership",
    "any attempt to treat counterparty item list as complete or true by itself",
    "any attempt to treat submitted party item supplement as complete or true by itself",
    "any attempt to treat access/retrieval logistics as ownership conclusion",
    "any attempt to bypass source-status gate",
    "any attempt to bypass issue relevance gate",
    "any attempt to bypass working evidence memo / issue ledger",
    "any attempt to bypass chunked digital corpus workflow",
    "any attempt to bypass submitted appendix workflow",
    "any attempt to bypass counterparty rebuttal matrix",
    "Material reaching these gates must remain manual-review-required",
  ]);
});

test("relationship to prior domain layers is explicit and non-replacing", () => {
  const docsText = readText(sideTrackDocsPath);

  assertIncludesAll(docsText, [
    "supports the issue relevance gate by giving the BOHAG_LOSORE_SIDE_TRACK issue placement a separate non-core workflow",
    "supports the source-status gate by preserving source-status references without deciding source status",
    "supports the submitted appendix workflow by preserving item appendix references without treating appendices as proof",
    "supports the counterparty rebuttal matrix by allowing item-list disputes to remain separate from hidden-co-ownership rebuttal issues",
    "supports the working evidence memo / issue ledger by separating working item leads from submitted item assertions",
    "supports the chunked digital corpus workflow where item references arise from message/image/pdf corpora",
    "does not replace the source-status gate",
    "does not replace the issue relevance gate",
    "does not replace the working evidence memo / issue ledger",
    "does not replace the chunked digital corpus workflow",
    "does not replace the submitted appendix workflow",
    "does not replace the counterparty rebuttal matrix",
    "must not create schema types, runtime classes, semantic facts, legal decision logic, item-ownership decisions, or hidden-co-ownership proof",
  ]);
});

test("negative boundaries block sufficiency, conclusions, implementation, and bypasses", () => {
  const docsText = readText(sideTrackDocsPath);

  assertIncludesAll(docsText, [
    "source-status classification",
    "source-backed material classification gate",
    "issue relevance classification",
    "working evidence memo / issue ledger replacement",
    "chunked digital corpus workflow replacement",
    "submitted appendix workflow replacement",
    "counterparty rebuttal matrix replacement",
    "full evidence discipline gate",
    "full doctrine contract",
    "final ownership determination of the bostadsrätt",
    "final ownership determination of any item",
    "legal advice",
    "legal decision logic",
    "actual_swedish_samaganderatt_decision_logic",
    "evidentiary sufficiency scoring",
    "proof that any hidden-co-ownership requisite is satisfied",
    "proof that any hidden-co-ownership requisite is not satisfied",
    "case outcome prediction",
    "process pleading generation",
    "runtime implementation",
    "schema behavior changes",
    "semantic-fact mapping",
    "automatic legal conclusions from digital material",
    "treating item return request as proof of hidden co-ownership",
    "treating item value claim as proof of hidden co-ownership",
    "treating retrieval/access logistics as ownership conclusion",
    "treating counterparty item list as complete or true by itself",
    "treating submitted party item supplement as complete or true by itself",
    "treating receipt references as proof of hidden co-ownership",
    "treating appendix references as proof of hidden co-ownership",
    "bypassing source-status gate",
    "bypassing issue relevance gate",
    "bypassing working evidence memo / issue ledger",
    "bypassing chunked digital corpus workflow",
    "bypassing submitted appendix workflow",
    "bypassing counterparty rebuttal matrix",
    "Swedish psychological violence track blending",
    "Danish psychological violence track blending",
    "general bodelning decision engine",
    "governance helper-level freeze continuation",
    "database/API/route behavior",
    "generated artifact behavior",
  ]);

  assertIncludesAll(docsText, [
    "It does not determine whether hidden co-ownership exists in any case",
    "It does not determine final ownership of the bostadsrätt",
    "It does not determine final ownership of any item",
    "It does not infer legal conclusions from digital material",
    "It does not score evidentiary sufficiency",
    "It does not classify any hidden-co-ownership requisite as satisfied or not satisfied",
    "It does not implement actual_swedish_samaganderatt_decision_logic",
  ]);
});

test("prior domain docs and generic SWE_BODELNING scaffolding evidence exist", () => {
  for (const filePath of [
    boundaryDocsPath,
    sourceInventoryDocsPath,
    dossierScaffoldDocsPath,
    labelScaffoldDocsPath,
    evidenceToLabelDocsPath,
    sourceStatusDocsPath,
    issueRelevanceDocsPath,
    workingLedgerDocsPath,
    chunkedCorpusDocsPath,
    submittedAppendixDocsPath,
    rebuttalMatrixDocsPath,
    coreFreezePath,
    fullScopeFreezePath,
    dossierSchemaPath,
  ]) {
    assert.equal(fs.existsSync(filePath), true, `${filePath} should exist`);
  }

  assertIncludesAll(readText(coreFreezePath), ["SWE_BODELNING"]);
  assertIncludesAll(readText(fullScopeFreezePath), [
    "SWE_BODELNING",
    "actual_swedish_samaganderatt_decision_logic",
  ]);
  assertIncludesAll(readText(dossierSchemaPath), [
    "economic_contribution",
    "shared_use",
    "shared_intent",
  ]);
});

test("actual_swedish_samaganderatt_decision_logic remains excluded and proof is text-only", () => {
  const docsText = readText(sideTrackDocsPath);

  assertIncludesAll(docsText, [
    "actual_swedish_samaganderatt_decision_logic remains excluded/not implemented",
    "This contract is limited to a text-only DOCS_ONLY side-track workflow boundary",
    "It is not schema-first work",
    "It is not runtime implementation",
    "It is not semantic-fact mapping",
  ]);
});
