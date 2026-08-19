const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.join(__dirname, "..");
const evidenceToLabelDocsPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_SWE_BODELNING_DOLD_SAMAGANDERATT_EVIDENCE_TO_LABEL_BOUNDARY_v1.md",
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

test("evidence-to-label boundary doc exists and freezes the boundary-only scaffold", () => {
  assert.equal(fs.existsSync(evidenceToLabelDocsPath), true);

  const docsText = readText(evidenceToLabelDocsPath);

  assert.match(
    docsText,
    /# SWE_BODELNING_DOLD_SAMAGANDERATT Evidence-To-Label Boundary Scaffold/,
  );
  assert.match(docsText, /evidence-to-label boundary scaffold only/i);
  assert.match(docsText, /dossier organization only/i);
  assert.match(docsText, /boundary\/prerequisite freeze is closed at `1a6d6c6`/i);
  assert.match(docsText, /legal\/source inventory contract is closed at `6fa0a4a`/i);
  assert.match(docsText, /neutral evidence dossier scaffold is closed at `625e538`/i);
  assert.match(docsText, /doctrine\/requisite label scaffold is closed at `ed13c92`/i);
  assert.match(docsText, /does not supersede them/i);
  assert.match(docsText, /runtime\/schema\/semantic-fact mapping remains blocked/i);
  assert.match(
    docsText,
    /actual_swedish_samaganderatt_decision_logic remains excluded\/not implemented/i,
  );
});

test("existing SWE_BODELNING lanes remain context only and not mapping proof", () => {
  const docsText = readText(evidenceToLabelDocsPath);

  assertIncludesAll(docsText, [
    "Existing `SWE_BODELNING` lane keys are context only",
    "economic_contribution",
    "shared_use",
    "shared_intent",
    "not treated as implemented hidden co-ownership decision logic",
    "not evidence-to-label mapping",
    "not sufficiency scoring",
    "not proof that any requisite is satisfied",
  ]);
});

test("association concepts and allowed label targets remain organization-only", () => {
  const docsText = readText(evidenceToLabelDocsPath);

  assertIncludesAll(docsText, [
    "DigitalEvidenceItem",
    "EvidenceSource",
    "neutral label association",
    "source/material references",
    "label association notes",
    "contradiction/counterevidence notes",
    "missing-evidence notes",
    "timeline-proximity notes",
    "reliability/provenance notes",
    "manual-review routing",
    "neutral organization concepts only",
  ]);

  assertNormalizedIncludesAll(docsText, [
    "These association concepts are not schema fields, runtime classes, semantic-fact mappings, legal conclusions, or sufficiency determinations.",
  ]);

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
    "These labels remain organization labels only",
  ]);
});

test("association boundary rule preserves no sufficiency and no conclusion anchors", () => {
  const docsText = readText(evidenceToLabelDocsPath);

  assertIncludesAll(docsText, [
    "evidence may be associated with labels for organization only",
    "association may preserve source/material references",
    "association may preserve label association notes",
    "association may preserve contradiction/counterevidence notes",
    "association may preserve missing-evidence notes",
    "association may preserve timeline-proximity notes",
    "association may preserve reliability/provenance notes",
    "association may route material to manual review",
    "association does not mean a requisite is satisfied",
    "association does not mean a requisite is not satisfied",
    "association must not rank evidentiary sufficiency",
    "association must not infer legal conclusions",
    "association must not create semantic facts",
    "association must not decide ownership",
    "association must not implement actual_swedish_samaganderatt_decision_logic",
  ]);
});

test("manual-review gates and prior scaffold relationships remain explicit", () => {
  const docsText = readText(evidenceToLabelDocsPath);

  assertIncludesAll(docsText, [
    "source completeness",
    "handling of HD T 2565-02",
    "controlling vs contextual NJA cases",
    "bodelning/sambo-property distinction from hidden co-ownership doctrine",
    "post-acquisition context limits",
    "confidence wording without legal conclusions",
    "official-source vs aggregator-summary conflicts",
    "remain unresolved",
    "manually reviewed before any full doctrine contract",
  ]);

  assertIncludesAll(docsText, [
    "supports the neutral evidence dossier scaffold by describing organization-only associations",
    "uses doctrine/requisite labels only as neutral label targets",
    "does not replace the dossier scaffold",
    "does not replace the doctrine/requisite label scaffold",
    "must not create new dossier sections, schema types, runtime classes, or semantic facts",
  ]);
});

test("examples, neutral output, and negative boundaries forbid legal sufficiency", () => {
  const docsText = readText(evidenceToLabelDocsPath);

  assertIncludesAll(docsText, [
    "a bank transfer may be associated with an economic-contribution-to-acquisition label for organization only",
    "a message may be associated with a common-intent label for organization only",
    "residence/use material may be associated with a common-use label for organization only",
    "post-acquisition material may be associated with a post-acquisition-context label for organization only",
    "examples do not imply evidentiary sufficiency",
    "do not say the evidence proves, establishes, satisfies, or disproves any requisite",
  ]);

  assertIncludesAll(docsText, [
    "which neutral labels were used for organizing material",
    "what source/material references support the organizational association",
    "what association notes exist",
    "what contradictions or counterevidence are present",
    "what evidence is missing or unverified",
    "what reliability/provenance concerns exist",
    "what requires manual legal review",
    "hidden co-ownership exists",
    "hidden co-ownership does not exist",
    "a requisite is fulfilled",
    "a requisite is not fulfilled",
    "evidence is sufficient",
    "evidence is insufficient",
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
    "proof that any requisite is satisfied",
    "proof that any requisite is not satisfied",
    "case outcome prediction",
    "process pleading generation",
    "runtime implementation",
    "schema behavior changes",
    "semantic-fact mapping",
    "automatic legal conclusions from digital material",
    "treating any single evidence category as sufficient proof",
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
  const labelScaffoldText = readText(labelScaffoldDocsPath);
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
  assert.match(
    labelScaffoldText,
    /# SWE_BODELNING_DOLD_SAMAGANDERATT Doctrine\/Requisite Label Scaffold/,
  );
  assert.match(labelScaffoldText, /doctrine\/requisite label scaffold only/i);
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
  const docsText = readText(evidenceToLabelDocsPath);

  assert.match(docsText, /runtime_behavior:\s+blocked/);
  assert.match(docsText, /schema_behavior:\s+blocked/);
  assert.match(docsText, /semantic_fact_mapping:\s+blocked/);
  assert.match(docsText, /legal_decision_logic:\s+blocked/);
  assert.match(docsText, /evidentiary_sufficiency_scoring:\s+blocked/);
  assert.match(docsText, /requisite_proof:\s+blocked/);
  assert.match(docsText, /This document is a DOCS_ONLY evidence-to-label boundary scaffold only/i);
  assert.match(
    docsText,
    /It does not implement doctrine, schema behavior, runtime behavior, semantic-fact mapping, legal decision logic, legal advice, evidentiary sufficiency scoring, proof of any requisite, or ownership conclusions./i,
  );
});
