const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.join(__dirname, "..");
const issueRelevanceDocsPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_SWE_BODELNING_DOLD_SAMAGANDERATT_ISSUE_RELEVANCE_GATE_v1.md",
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

test("issue relevance gate doc exists and freezes the issue-area boundary", () => {
  assert.equal(fs.existsSync(issueRelevanceDocsPath), true);

  const docsText = readText(issueRelevanceDocsPath);

  assert.match(
    docsText,
    /# SWE_BODELNING_DOLD_SAMAGANDERATT Issue Relevance Gate/,
  );
  assert.match(docsText, /DOCS_ONLY issue relevance gate only/i);
  assert.match(docsText, /issue relevance gate only/i);
  assert.match(
    docsText,
    /classifies already source-backed material by issue area before it may be placed in the hidden-co-ownership core dossier/i,
  );
});

test("closed prerequisites, blocked implementation, and current exclusions remain explicit", () => {
  const docsText = readText(issueRelevanceDocsPath);

  assertIncludesAll(docsText, [
    "boundary/prerequisite freeze is closed at `1a6d6c6`",
    "legal/source inventory contract is closed at `6fa0a4a`",
    "neutral evidence dossier scaffold is closed at `625e538`",
    "doctrine/requisite label scaffold is closed at `ed13c92`",
    "evidence-to-label boundary scaffold is closed at `93edca0`",
    "source-backed material classification gate is closed at `4a20f9f`",
    "builds on those contracts but does not supersede them",
    "runtime/schema/semantic-fact mapping remains blocked",
    "actual_swedish_samaganderatt_decision_logic remains excluded/not implemented",
  ]);
});

test("source-status precondition stays separate from issue relevance", () => {
  const docsText = readText(issueRelevanceDocsPath);

  assertIncludesAll(docsText, [
    "Issue relevance classification applies only after source-status classification",
    "Source-status classification answers what kind of source material is present",
    "Issue relevance classification answers where source-backed material may belong in the matter",
    "Material that is not source-backed remains controlled by the source-status gate and must not be placed in the hidden-co-ownership core merely by issue label",
  ]);
});

test("existing SWE_BODELNING lanes remain context only and non-decisive", () => {
  const docsText = readText(issueRelevanceDocsPath);

  assertIncludesAll(docsText, [
    "Existing `SWE_BODELNING` lane keys are context only",
    "economic_contribution",
    "shared_use",
    "shared_intent",
    "not treated as implemented hidden co-ownership decision logic",
    "issue relevance classification",
    "sufficiency scoring",
    "proof that any requisite is satisfied",
  ]);
});

test("issue relevance classifications are neutral issue-area classifications only", () => {
  const docsText = readText(issueRelevanceDocsPath);

  assertIncludesAll(docsText, [
    "neutral issue-area classifications only",
    "HIDDEN_CO_OWNERSHIP_CORE",
    "ACQUISITION_FINANCING_CORE",
    "PARTY_INTENT_CORE",
    "DOCUMENTED_ECONOMIC_CONTRIBUTION_CORE",
    "COUNTERPARTY_POSITION_CONTEXT",
    "BODELNING_SIDE_TRACK",
    "BOHAG_LOSORE_SIDE_TRACK",
    "PROPERTY_ACCESS_RETRIEVAL_LOGISTICS",
    "WORKING_MEMO_FOLLOW_UP",
    "OFF_CORE_CONFLICT_PERSON_MATERIAL",
    "MANUAL_REVIEW_REQUIRED",
    "EXCLUDED_FROM_HIDDEN_CO_OWNERSHIP_CORE",
  ]);

  assertNormalizedIncludesAll(docsText, [
    "These classifications are not schema fields, runtime classes, semantic-fact mappings, legal conclusions, issue merits determinations, or sufficiency determinations.",
  ]);
});

test("classification rules remain explicit and issue-area only", () => {
  const docsText = readText(issueRelevanceDocsPath);

  assertIncludesAll(docsText, [
    "HIDDEN_CO_OWNERSHIP_CORE may be used only for material issue-linked to the hidden-co-ownership core",
    "ACQUISITION_FINANCING_CORE may be used for source-backed material about acquisition, financing, financing-chain context, or acquisition-related debt/loan structure",
    "PARTY_INTENT_CORE may be used for source-backed material about party intent or shared project context",
    "DOCUMENTED_ECONOMIC_CONTRIBUTION_CORE may be used for source-backed material about documented economic contributions",
    "COUNTERPARTY_POSITION_CONTEXT may be used for counterparty's counterparty positions when they address acquisition, financing, intent, contribution, ownership-position context, or related core questions",
    "BODELNING_SIDE_TRACK may be used for bodelning-relevant material that is not hidden-co-ownership core",
    "BOHAG_LOSORE_SIDE_TRACK may be used for bohag/lösöre material and must remain separate from the hidden-co-ownership core",
    "PROPERTY_ACCESS_RETRIEVAL_LOGISTICS may be used for property pickup, access, key, retrieval, contact, or safety logistics",
    "WORKING_MEMO_FOLLOW_UP may be used for working memo follow-up items that are not yet placed in a core or side-track category",
    "OFF_CORE_CONFLICT_PERSON_MATERIAL may be used for personal/conflict material without a source-backed issue link to the bodelning matter",
    "MANUAL_REVIEW_REQUIRED may be used when issue placement is ambiguous, mixed, or risks legal/sufficiency inference",
    "EXCLUDED_FROM_HIDDEN_CO_OWNERSHIP_CORE may be used for material that must not enter the hidden-co-ownership core",
  ]);
});

test("core and side-track boundary proof anchors remain explicit", () => {
  const docsText = readText(issueRelevanceDocsPath);

  assertIncludesAll(docsText, [
    "source-backed does not equal core-relevant",
    "core-relevant does not equal legally proven",
    "issue placement is not legal conclusion",
    "issue placement is not proof of any requisite",
    "issue placement must not rank evidentiary sufficiency",
    "access/logistics material must not enter hidden-co-ownership core unless separately source-backed and issue-linked",
    "conflict/person material must not enter hidden-co-ownership core unless separately source-backed and issue-linked",
    "bohag/lösöre-only material must remain side-track",
    "general bodelning-only material not tied to hidden co-ownership must remain side-track",
    "working memo/follow-up material must not enter hidden-co-ownership core without source-backed issue classification",
    "counterparty statements about acquisition, financing, intent, contribution, or ownership-position context may be COUNTERPARTY_POSITION_CONTEXT",
    "counterparty statements about access/conflict/logistics must stay in access/logistics or off-core classification unless manually reviewed",
  ]);
});

test("manual-review gates and relationships to prior layers remain explicit", () => {
  const docsText = readText(issueRelevanceDocsPath);

  assertIncludesAll(docsText, [
    "ambiguous issue area",
    "mixed source-backed/conflict material",
    "access/safety/contact statements proposed for hidden-co-ownership core use",
    "bohag/lösöre material proposed for hidden-co-ownership core use",
    "counterparty statements with unclear issue linkage",
    "working memo/follow-up material proposed for core use",
    "any attempted legal inference from issue placement",
    "any attempted sufficiency inference from issue placement",
    "any attempted ownership inference from issue placement",
    "any attempt to use issue placement as proof that a requisite is satisfied or not satisfied",
  ]);

  assertIncludesAll(docsText, [
    "supports the source-status gate by adding issue-area placement after source-status classification",
    "supports the neutral evidence dossier scaffold by determining whether material belongs in the hidden-co-ownership core or an adjacent bucket",
    "supports the evidence-to-label boundary by preventing source-backed but off-core material from contaminating core evidence-label organization",
    "does not replace the source-status gate",
    "does not replace the dossier scaffold",
    "does not replace the doctrine/requisite label scaffold",
    "does not replace the evidence-to-label boundary",
    "must not create source-status classifications, side-track workflows, rebuttal matrices, bohag/lösöre process handling, schema types, runtime classes, or semantic facts",
  ]);
});

test("negative boundaries preserve no sufficiency, no conclusion, and no implementation boundaries", () => {
  const docsText = readText(issueRelevanceDocsPath);

  assertIncludesAll(docsText, [
    "source-status classification gate",
    "source-backed material classification gate",
    "full evidence discipline gate",
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
    "treating source-backed material as automatically core-relevant",
    "treating core-relevant material as legally proven",
    "treating issue placement as legal conclusion",
    "treating bohag/lösöre as hidden-co-ownership proof",
    "treating safety/contact conflict material as hidden-co-ownership core unless source-backed and issue-linked",
    "Swedish psychological violence track blending",
    "Danish psychological violence track blending",
    "general bodelning decision engine",
    "governance helper-level freeze continuation",
    "database/API/route behavior",
    "generated artifact behavior",
  ]);

  assertIncludesAll(docsText, [
    "This is an issue relevance gate only",
    "It is not source-status classification",
    "It is not a full evidence discipline gate",
    "It is not a side-track/quarantine workflow",
    "It is not a counterparty rebuttal matrix",
    "It is not a bohag/lösöre workflow",
    "It is not schema-first work",
    "It is not runtime implementation",
    "It is not semantic-fact mapping",
    "It is not legal decision logic",
    "It must not determine whether hidden co-ownership exists in any case",
    "It must not infer legal conclusions from digital material",
    "It must not score sufficiency",
    "It must not classify any requisite as satisfied or not satisfied",
  ]);
});

test("existing tracked evidence confirms prior domain docs and generic SWE_BODELNING scaffolding only", () => {
  assert.equal(fs.existsSync(boundaryDocsPath), true);
  assert.equal(fs.existsSync(sourceInventoryDocsPath), true);
  assert.equal(fs.existsSync(dossierScaffoldDocsPath), true);
  assert.equal(fs.existsSync(labelScaffoldDocsPath), true);
  assert.equal(fs.existsSync(evidenceToLabelDocsPath), true);
  assert.equal(fs.existsSync(sourceStatusDocsPath), true);

  const boundaryDocsText = readText(boundaryDocsPath);
  const sourceInventoryText = readText(sourceInventoryDocsPath);
  const dossierScaffoldText = readText(dossierScaffoldDocsPath);
  const labelScaffoldText = readText(labelScaffoldDocsPath);
  const evidenceToLabelText = readText(evidenceToLabelDocsPath);
  const sourceStatusText = readText(sourceStatusDocsPath);
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
  assert.match(
    sourceStatusText,
    /# SWE_BODELNING_DOLD_SAMAGANDERATT Source-Backed Material Classification Gate/,
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
  const docsText = readText(issueRelevanceDocsPath);

  assertIncludesAll(docsText, [
    "runtime/schema/semantic-fact mapping remains blocked",
    "actual_swedish_samaganderatt_decision_logic remains excluded/not implemented",
    "It does not implement doctrine, schema behavior, runtime behavior, semantic-fact mapping, legal decision logic, legal advice, evidentiary sufficiency scoring, proof of any requisite, or ownership conclusions",
    "prepare for later domain contract work without implementing doctrine, schema, runtime, semantic-fact mapping, or decision logic",
  ]);
});
