const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.join(__dirname, "..");
const labelDocsPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_SWE_BODELNING_DOLD_SAMAGANDERATT_DOCTRINE_REQUISITE_LABELS_v1.md",
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
    assert.match(
      normalizedText,
      new RegExp(entry.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"),
    );
  }
}

test("doctrine/requisite label scaffold doc exists and freezes the label-only boundary", () => {
  assert.equal(fs.existsSync(labelDocsPath), true);

  const docsText = readText(labelDocsPath);

  assert.match(
    docsText,
    /# SWE_BODELNING_DOLD_SAMAGANDERATT Doctrine\/Requisite Label Scaffold/,
  );
  assert.match(docsText, /doctrine\/requisite label scaffold only/i);
  assert.match(docsText, /neutral doctrine\/requisite labels/i);
  assert.match(docsText, /boundary\/prerequisite freeze is closed at `1a6d6c6`/i);
  assert.match(docsText, /legal\/source inventory contract is closed at `6fa0a4a`/i);
  assert.match(docsText, /neutral evidence dossier scaffold is closed at `625e538`/i);
  assert.match(docsText, /does not supersede them/i);
  assert.match(docsText, /runtime\/schema\/semantic-fact mapping remains blocked/i);
  assert.match(
    docsText,
    /actual_swedish_samaganderatt_decision_logic remains excluded\/not implemented/i,
  );
});

test("existing SWE_BODELNING lanes remain context only and non-sufficient", () => {
  const docsText = readText(labelDocsPath);

  assertIncludesAll(docsText, [
    "Existing `SWE_BODELNING` lane keys are context only",
    "economic_contribution",
    "shared_use",
    "shared_intent",
    "not treated as implemented hidden co-ownership decision logic",
    "not sufficiency scoring",
    "not proof that any requisite is satisfied",
  ]);
});

test("doctrine/requisite labels are neutral organization labels only", () => {
  const docsText = readText(labelDocsPath);

  assertIncludesAll(docsText, [
    "formal / nominal / open owner",
    "alleged hidden owner",
    "asset/property",
    "acquisition date or acquisition period",
    "acquisition-time circumstances",
    "common-use dimension",
    "economic-contribution-to-acquisition dimension",
    "common-intent dimension",
    "tacit-agreement dimension",
    "post-acquisition-context dimension",
    "counterevidence dimension",
    "missing-evidence dimension",
    "reliability/provenance dimension",
    "contradiction-handling dimension",
    "manual-review dimension",
    "neutral summary",
    "neutral organization labels only",
  ]);

  assertNormalizedIncludesAll(docsText, [
    "These labels are not schema fields, runtime classes, semantic-fact mappings, legal conclusions, or sufficiency determinations.",
  ]);
});

test("label usage rule preserves no sufficiency and no conclusion boundaries", () => {
  const docsText = readText(labelDocsPath);

  assertIncludesAll(docsText, [
    "labels may organize dossier material",
    "labels may group evidence under neutral headings",
    "labels may identify where manual legal review is needed",
    "labels must not state that a requisite is satisfied",
    "labels must not state that a requisite is not satisfied",
    "labels must not infer legal conclusions from digital material",
    "labels must not rank evidentiary sufficiency",
    "labels must not decide ownership",
  ]);
});

test("manual-review gates and relationship to dossier scaffold remain explicit", () => {
  const docsText = readText(labelDocsPath);

  assertIncludesAll(docsText, [
    "source completeness",
    "handling of HD T 2565-02",
    "controlling vs contextual NJA cases",
    "bodelning/sambo-property distinction from hidden co-ownership doctrine",
    "post-acquisition material as context, not automatic legal inference",
    "confidence/reliability wording without legal conclusions",
    "official-source vs aggregator-summary conflicts",
    "remain unresolved",
    "manually reviewed before any full doctrine contract",
  ]);

  assertIncludesAll(docsText, [
    "supports the neutral evidence dossier scaffold by naming organization labels only",
    "does not replace the dossier scaffold",
    "does not create new dossier sections, schema types, runtime classes, or semantic facts",
  ]);
});

test("neutral summary boundary and negative boundaries forbid conclusions and implementation", () => {
  const docsText = readText(labelDocsPath);

  assertIncludesAll(docsText, [
    "what labels appear relevant for organizing the material",
    "what source material exists",
    "what source material is missing",
    "what appears contradictory",
    "what requires manual legal review",
    "hidden co-ownership exists",
    "hidden co-ownership does not exist",
    "a requisite is fulfilled",
    "a requisite is not fulfilled",
    "a party will win or lose",
    "a legal conclusion is established",
  ]);

  assertIncludesAll(docsText, [
    "full doctrine contract",
    "final ownership determination",
    "legal advice",
    "legal decision logic",
    "actual_swedish_samaganderatt_decision_logic",
    "evidentiary sufficiency scoring",
    "case outcome prediction",
    "process pleading generation",
    "runtime implementation",
    "schema behavior changes",
    "semantic-fact mapping",
    "automatic legal conclusions from digital material",
    "treating post-acquisition material as automatic proof of ownership",
    "resolving controlling vs contextual case-law status",
    "Swedish psychological violence track blending",
    "Danish psychological violence track blending",
    "general bodelning decision engine",
    "governance helper-level freeze continuation",
    "database/API/route behavior",
    "generated artifact behavior",
  ]);
});

test("existing tracked evidence confirms prerequisites and generic scaffolding only", () => {
  const boundaryDocsText = readText(boundaryDocsPath);
  const sourceInventoryText = readText(sourceInventoryDocsPath);
  const dossierScaffoldText = readText(dossierScaffoldDocsPath);
  const coreFreezeText = readText(coreFreezePath);
  const fullScopeFreezeText = readText(fullScopeFreezePath);
  const dossierSchemaText = readText(dossierSchemaPath);
  const coreFreezeTestText = readText(coreFreezeTestPath);
  const fullScopeFreezeTestText = readText(fullScopeFreezeTestPath);

  assert.match(boundaryDocsText, /# SWE_BODELNING_DOLD_SAMAGANDERATT Boundary Freeze/);
  assert.match(boundaryDocsText, /absent\/not-yet-contract-defined/i);
  assert.match(
    sourceInventoryText,
    /# SWE_BODELNING_DOLD_SAMAGANDERATT Legal\/Source Inventory/,
  );
  assert.match(sourceInventoryText, /legal\/source inventory contract only/i);
  assert.match(
    dossierScaffoldText,
    /# SWE_BODELNING_DOLD_SAMAGANDERATT Neutral Evidence Dossier Scaffold/,
  );
  assert.match(dossierScaffoldText, /neutral evidence dossier scaffold only/i);
  assert.match(dossierScaffoldText, /evidence\/requisite dimensions as dossier organization labels only/i);
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

test("proof remains text-only and does not require runtime or schema changes", () => {
  const docsText = readText(labelDocsPath);

  assert.match(docsText, /runtime_behavior:\s+blocked/);
  assert.match(docsText, /schema_behavior:\s+blocked/);
  assert.match(docsText, /semantic_fact_mapping:\s+blocked/);
  assert.match(docsText, /legal_decision_logic:\s+blocked/);
  assert.match(docsText, /evidentiary_sufficiency_scoring:\s+blocked/);
  assert.match(docsText, /This document is a DOCS_ONLY doctrine\/requisite label scaffold only/i);
  assert.match(
    docsText,
    /It does not implement doctrine, schema behavior, runtime behavior, semantic-fact mapping, legal decision logic, legal advice, evidentiary sufficiency scoring, or ownership conclusions./i,
  );
});
