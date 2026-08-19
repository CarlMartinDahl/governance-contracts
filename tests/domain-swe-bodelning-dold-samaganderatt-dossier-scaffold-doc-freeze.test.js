const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.join(__dirname, "..");
const scaffoldDocsPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_SWE_BODELNING_DOLD_SAMAGANDERATT_DOSSIER_SCAFFOLD_v1.md",
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

function assertIncludesAll(text, entries) {
  for (const entry of entries) {
    const escapedEntry = entry.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    assert.match(text, new RegExp(escapedEntry, "i"));
  }
}

test("neutral evidence dossier scaffold doc exists and freezes the scaffold-only boundary", () => {
  assert.equal(fs.existsSync(scaffoldDocsPath), true);

  const docsText = readText(scaffoldDocsPath);

  assert.match(
    docsText,
    /# SWE_BODELNING_DOLD_SAMAGANDERATT Neutral Evidence Dossier Scaffold/,
  );
  assert.match(docsText, /neutral evidence dossier scaffold only/i);
  assert.match(docsText, /conceptual dossier structure/i);
  assert.match(docsText, /evidence\/requisite dimensions as dossier organization labels only/i);
  assert.match(docsText, /boundary\/prerequisite freeze closed at `1a6d6c6`/i);
  assert.match(docsText, /legal\/source inventory contract closed at `6fa0a4a`/i);
  assert.match(docsText, /does not supersede them/i);
  assert.match(docsText, /Runtime, schema, and\s+semantic-fact mapping remain blocked/i);
});

test("existing SWE_BODELNING lanes remain context only", () => {
  const docsText = readText(scaffoldDocsPath);

  assertIncludesAll(docsText, [
    "Existing `SWE_BODELNING` lane keys are context only",
    "economic_contribution",
    "shared_use",
    "shared_intent",
    "not treated as implemented hidden co-ownership decision logic",
    "actual_swedish_samaganderatt_decision_logic",
  ]);
});

test("conceptual dossier sections and candidate domain objects are scaffold terms only", () => {
  const docsText = readText(scaffoldDocsPath);

  assertIncludesAll(docsText, [
    "case and party-neutral overview",
    "asset/property overview",
    "acquisition event and acquisition timeline",
    "claim and counter-position summary",
    "evidence inventory",
    "requisite-labelled evidence organization",
    "post-acquisition context section",
    "counterevidence section",
    "missing evidence section",
    "source reliability and provenance section",
    "contradiction handling section",
    "manual-review gate section",
    "neutral dossier summary",
    "conceptual sections only",
    "do not create schema ownership",
  ]);

  assertIncludesAll(docsText, [
    "HiddenCoOwnershipDossier",
    "HiddenCoOwnershipClaim",
    "AssetOrProperty",
    "NominalOwner",
    "AllegedHiddenOwner",
    "AcquisitionEvent",
    "AcquisitionTimeline",
    "DigitalEvidenceItem",
    "EvidenceSource",
    "EvidenceTimelineEntry",
    "CounterEvidence",
    "MissingEvidence",
    "SourceReliabilityAssessment",
    "ConfidenceIndicator",
    "NeutralDossierSummary",
    "ManualReviewGate",
    "not schema types, runtime classes, or semantic-fact mappings",
  ]);
});

test("evidence labels and examples stay non-conclusive", () => {
  const docsText = readText(scaffoldDocsPath);

  assertIncludesAll(docsText, [
    "common use",
    "economic contribution to acquisition",
    "common intent",
    "tacit agreement",
    "acquisition-time circumstances",
    "timeline proximity to acquisition",
    "post-acquisition context evidence only",
    "counterevidence",
    "missing or unverified evidence",
    "metadata/provenance status",
    "contradiction handling",
    "source reliability",
    "neutral summary",
    "not automatic legal conclusions",
  ]);

  assertIncludesAll(docsText, [
    "purchase contract",
    "loan material",
    "down payment / kontantinsats",
    "handpenning",
    "bank transfer",
    "bank statements",
    "Swish",
    "amortization",
    "messages",
    "emails",
    "notes",
    "admissions",
    "conduct around purchase",
    "residence/use records",
    "household context",
    "shared occupancy",
    "metadata status",
    "source location",
    "screenshot/document provenance",
    "contradictions",
    "missing records",
    "unverified claims",
    "examples do not imply evidentiary sufficiency",
  ]);
});

test("manual-review gates and NeutralDossierSummary rule remain explicit", () => {
  const docsText = readText(scaffoldDocsPath);

  assertIncludesAll(docsText, [
    "source completeness",
    "handling of HD T 2565-02",
    "controlling vs contextual NJA cases",
    "bodelning/sambo-property distinction from hidden co-ownership doctrine",
    "post-acquisition material as context, not automatic legal inference",
    "confidence/reliability wording without legal conclusions",
    "official-source vs aggregator-summary conflicts",
    "remain unresolved",
    "manually reviewed before any doctrine contract",
  ]);

  assertIncludesAll(docsText, [
    "what is alleged",
    "what source material exists",
    "what source material is missing",
    "what appears contradictory",
    "what requires manual legal review",
    "hidden co-ownership exists",
    "hidden co-ownership does not exist",
    "a party will win or lose",
    "a legal conclusion is established",
  ]);
});

test("negative boundaries forbid doctrine, runtime, schema, and conclusion behavior", () => {
  const docsText = readText(scaffoldDocsPath);

  assertIncludesAll(docsText, [
    "final ownership determination",
    "legal advice",
    "actual_swedish_samaganderatt_decision_logic",
    "case outcome prediction",
    "process pleading generation",
    "runtime implementation",
    "schema behavior changes",
    "semantic-fact mapping",
    "automatic legal conclusions from digital material",
    "substantive legal doctrine contract",
    "evidentiary sufficiency scoring",
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
  const docsText = readText(scaffoldDocsPath);

  assert.match(docsText, /runtime_behavior:\s+blocked/);
  assert.match(docsText, /schema_behavior:\s+blocked/);
  assert.match(docsText, /semantic_fact_mapping:\s+blocked/);
  assert.match(docsText, /legal_decision_logic:\s+blocked/);
  assert.match(docsText, /not schema types, runtime classes, or semantic-fact\s+mappings/i);
  assert.match(docsText, /This is a neutral evidence dossier scaffold only/i);
});
