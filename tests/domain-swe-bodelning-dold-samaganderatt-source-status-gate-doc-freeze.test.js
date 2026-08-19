const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.join(__dirname, "..");
const sourceStatusDocsPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_SWE_BODELNING_DOLD_SAMAGANDERATT_SOURCE_STATUS_GATE_v1.md",
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

test("source-status gate doc exists and freezes the source-backed material classification boundary", () => {
  assert.equal(fs.existsSync(sourceStatusDocsPath), true);

  const docsText = readText(sourceStatusDocsPath);

  assert.match(
    docsText,
    /# SWE_BODELNING_DOLD_SAMAGANDERATT Source-Backed Material Classification Gate/,
  );
  assert.match(docsText, /DOCS_ONLY source-backed material classification gate only/i);
  assert.match(docsText, /source-backed material classification gate only/i);
  assert.match(docsText, /classifies material before it may be used in the core evidence dossier/i);
});

test("closed prerequisites, blocked implementation, and current exclusions remain explicit", () => {
  const docsText = readText(sourceStatusDocsPath);

  assertIncludesAll(docsText, [
    "boundary/prerequisite freeze is closed at `1a6d6c6`",
    "legal/source inventory contract is closed at `6fa0a4a`",
    "neutral evidence dossier scaffold is closed at `625e538`",
    "doctrine/requisite label scaffold is closed at `ed13c92`",
    "evidence-to-label boundary scaffold is closed at `93edca0`",
    "builds on those contracts but does not supersede them",
    "runtime/schema/semantic-fact mapping remains blocked",
    "actual_swedish_samaganderatt_decision_logic remains excluded/not implemented",
  ]);
});

test("existing SWE_BODELNING lanes remain context only and non-decisive", () => {
  const docsText = readText(sourceStatusDocsPath);

  assertIncludesAll(docsText, [
    "Existing `SWE_BODELNING` lane keys are context only",
    "economic_contribution",
    "shared_use",
    "shared_intent",
    "not treated as implemented hidden co-ownership decision logic",
    "source-status classification",
    "sufficiency scoring",
    "proof that any requisite is satisfied",
  ]);
});

test("source-status classifications are neutral classifications only", () => {
  const docsText = readText(sourceStatusDocsPath);

  assertIncludesAll(docsText, [
    "neutral source-status classifications only",
    "VERIFIED_SOURCE_ARTIFACT",
    "EXTRACTED_SOURCE_EXCERPT",
    "SUBMITTED_PARTY_POSITION",
    "COUNTERPARTY_POSITION",
    "WORKING_MEMO_ONLY",
    "HYPOTHESIS_ONLY",
    "UNVERIFIED_SOURCE_LEAD",
    "SOURCE_INTEGRITY_CONCERN",
    "MANUAL_REVIEW_REQUIRED",
    "CORE_DOSSIER_USE_BLOCKED_UNTIL_SOURCE_BACKED",
  ]);

  assertNormalizedIncludesAll(docsText, [
    "These classifications are not schema fields, runtime classes, semantic-fact mappings, legal conclusions, issue relevance determinations, or sufficiency determinations.",
  ]);
});

test("classification rules and specific example handling remain explicit", () => {
  const docsText = readText(sourceStatusDocsPath);

  assertIncludesAll(docsText, [
    "VERIFIED_SOURCE_ARTIFACT may identify a source-backed artifact",
    "EXTRACTED_SOURCE_EXCERPT may identify text or excerpt taken from a source-backed artifact, but it must remain linked to that artifact",
    "SUBMITTED_PARTY_POSITION identifies submitted party’s submitted position, not truth by itself",
    "COUNTERPARTY_POSITION identifies counterparty’s submitted or recorded counterparty position, not truth by itself",
    "WORKING_MEMO_ONLY identifies working memo material or working notes, not verified proof",
    "HYPOTHESIS_ONLY identifies a theory, interpretation, or legal question, not verified proof",
    "UNVERIFIED_SOURCE_LEAD identifies a lead without sufficient documentary/source support",
    "SOURCE_INTEGRITY_CONCERN identifies alleged deletion, editing, alteration, or source-integrity issue that requires technical/source verification",
    "MANUAL_REVIEW_REQUIRED identifies material that cannot safely enter core use without human legal/product review",
    "CORE_DOSSIER_USE_BLOCKED_UNTIL_SOURCE_BACKED identifies material that must not support the core evidence dossier unless linked to a source artifact or extracted source excerpt",
  ]);

  assertIncludesAll(docsText, [
    "working memo material is WORKING_MEMO_ONLY unless linked to source artifacts or extracted source excerpts",
    "counterparty’s statements are COUNTERPARTY_POSITION and not truth by themselves",
    "submitted party’s responses are SUBMITTED_PARTY_POSITION and not truth by themselves",
    "reported telephone confirmation without written support is UNVERIFIED_SOURCE_LEAD",
    "alleged message deletion/editing without technical or source verification is SOURCE_INTEGRITY_CONCERN",
    "working memo content must not be treated as verified evidence",
    "unverified leads must not be treated as core evidence",
    "party assertions must not be treated as truth",
    "counterparty assertions must not be treated as truth",
  ]);
});

test("core dossier use rule, manual-review gates, and relationships to prior layers remain explicit", () => {
  const docsText = readText(sourceStatusDocsPath);

  assertIncludesAll(docsText, [
    "core claims must link to VERIFIED_SOURCE_ARTIFACT or EXTRACTED_SOURCE_EXCERPT",
    "Submitted party positions may explain what submitted party argues, but they do not by themselves prove the underlying fact",
    "Counterparty positions may explain what counterparty argues, but they do not by themselves prove the underlying fact",
    "Working memos may preserve leads and issue hypotheses, but they do not by themselves support the core evidence dossier",
    "Hypotheses may guide follow-up, but they do not enter the core dossier as evidence",
    "Unverified source leads are blocked from core dossier use until source-backed",
    "Source integrity concerns require manual/technical verification before use",
    "This gate does not decide legal relevance, sufficiency, issue merits, or ownership",
  ]);

  assertIncludesAll(docsText, [
    "uncertain source status",
    "missing source artifact",
    "reported telephone confirmation",
    "alleged deletion/editing or source-integrity issue",
    "conflict/person material proposed for core dossier use",
    "borderline party/counterparty assertion",
    "working memo content proposed for core dossier use",
    "any attempt to use a classification as proof of a requisite",
    "any attempt to use a classification as legal conclusion",
  ]);

  assertIncludesAll(docsText, [
    "supports the neutral evidence dossier scaffold by deciding source-status before core dossier use",
    "supports the evidence-to-label boundary by ensuring only source-backed material can support core evidence organization",
    "does not replace the dossier scaffold",
    "does not replace the doctrine/requisite label scaffold",
    "does not replace the evidence-to-label boundary",
    "must not create new dossier sections, issue-relevance routing, side-track workflow, schema types, runtime classes, or semantic facts",
  ]);
});

test("negative boundaries preserve no sufficiency, no conclusion, and no implementation boundaries", () => {
  const docsText = readText(sourceStatusDocsPath);

  assertIncludesAll(docsText, [
    "full evidence discipline / issue relevance gate",
    "issue relevance routing workflow",
    "side-track/quarantine workflow",
    "counterparty rebuttal matrix",
    "bohag/lösöre workflow",
    "submitted package workflow",
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
    "treating working memo content as verified evidence",
    "treating unverified leads as core evidence",
    "treating party assertions as truth",
    "treating counterparty assertions as truth",
    "resolving source-integrity concerns without verification",
    "Swedish psychological violence track blending",
    "Danish psychological violence track blending",
    "general bodelning decision engine",
    "governance helper-level freeze continuation",
    "database/API/route behavior",
    "generated artifact behavior",
  ]);

  assertIncludesAll(docsText, [
    "It is not the full evidence discipline / issue relevance gate",
    "It is not issue relevance routing",
    "It is not a full doctrine contract",
    "It is not runtime implementation",
    "It is not semantic-fact mapping",
    "It is not legal decision logic",
    "It must not determine whether hidden co-ownership exists in any case",
    "It must not infer legal conclusions from digital material",
    "It must not score sufficiency",
    "It must not classify any requisite as satisfied or not satisfied",
  ]);
});

test("existing repo evidence confirms prior domain docs and generic SWE_BODELNING scaffolding only", () => {
  assert.equal(fs.existsSync(boundaryDocsPath), true);
  assert.equal(fs.existsSync(sourceInventoryDocsPath), true);
  assert.equal(fs.existsSync(dossierScaffoldDocsPath), true);
  assert.equal(fs.existsSync(labelScaffoldDocsPath), true);
  assert.equal(fs.existsSync(evidenceToLabelDocsPath), true);

  const boundaryDocsText = readText(boundaryDocsPath);
  const sourceInventoryText = readText(sourceInventoryDocsPath);
  const dossierScaffoldText = readText(dossierScaffoldDocsPath);
  const labelScaffoldText = readText(labelScaffoldDocsPath);
  const evidenceToLabelText = readText(evidenceToLabelDocsPath);
  const coreFreezeText = readText(coreFreezePath);
  const fullScopeFreezeText = readText(fullScopeFreezePath);
  const dossierSchemaText = readText(dossierSchemaPath);
  const coreFreezeTestText = readText(coreFreezeTestPath);
  const fullScopeFreezeTestText = readText(fullScopeFreezeTestPath);

  assert.match(boundaryDocsText, /# SWE_BODELNING_DOLD_SAMAGANDERATT Boundary Freeze/);
  assert.match(
    sourceInventoryText,
    /# SWE_BODELNING_DOLD_SAMAGANDERATT Legal\/Source Inventory/,
  );
  assert.match(
    dossierScaffoldText,
    /# SWE_BODELNING_DOLD_SAMAGANDERATT Neutral Evidence Dossier Scaffold/,
  );
  assert.match(
    labelScaffoldText,
    /# SWE_BODELNING_DOLD_SAMAGANDERATT Doctrine\/Requisite Label Scaffold/,
  );
  assert.match(
    evidenceToLabelText,
    /# SWE_BODELNING_DOLD_SAMAGANDERATT Evidence-To-Label Boundary Scaffold/,
  );

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
  const docsText = readText(sourceStatusDocsPath);

  assertIncludesAll(docsText, [
    "runtime/schema/semantic-fact mapping remains blocked",
    "actual_swedish_samaganderatt_decision_logic remains excluded/not implemented",
    "It does not implement doctrine, schema behavior, runtime behavior, semantic-fact mapping, legal decision logic, legal advice, evidentiary sufficiency scoring, proof of any requisite, or ownership conclusions",
    "prepare for later domain contract work without implementing doctrine, schema, runtime, semantic-fact mapping, or decision logic",
  ]);
});
