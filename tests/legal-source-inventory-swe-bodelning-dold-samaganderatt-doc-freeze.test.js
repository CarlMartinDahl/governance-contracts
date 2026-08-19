const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.join(__dirname, "..");
const inventoryDocsPath = path.join(
  repoRoot,
  "docs",
  "LEGAL_SOURCE_INVENTORY_SWE_BODELNING_DOLD_SAMAGANDERATT_v1.md",
);
const boundaryDocsPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_SWE_BODELNING_DOLD_SAMAGANDERATT_v1.md",
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

test("legal/source inventory doc exists and freezes the inventory-only boundary", () => {
  assert.equal(fs.existsSync(inventoryDocsPath), true);

  const docsText = readText(inventoryDocsPath);

  assert.match(
    docsText,
    /# SWE_BODELNING_DOLD_SAMAGANDERATT Legal\/Source Inventory/,
  );
  assert.match(docsText, /legal\/source inventory contract only/i);
  assert.match(docsText, /no substantive domain contract/i);
  assert.match(docsText, /no substantive domain contract, runtime implementation, schema\s+behavior, semantic-fact mapping, or legal decision logic exists yet/i);
  assert.match(docsText, /must preserve manual legal-review gates/i);
});

test("source priority model is explicit and keeps secondary sources non-controlling", () => {
  const docsText = readText(inventoryDocsPath);

  assertIncludesAll(docsText, [
    "Official primary legal sources",
    "official court material where available",
    "official statute text from Riksdagen",
    "Primary case references via legal aggregator",
    "lagen.nu",
    "Secondary/explanatory sources",
    "non-controlling context only",
    "must not control future model contracts",
    "Missing or unverified sources",
  ]);
});

test("required case and statutory source candidates are named", () => {
  const docsText = readText(inventoryDocsPath);

  assertIncludesAll(docsText, [
    "NJA 1981 s. 693",
    "NJA 1982 s. 589",
    "NJA 1985 s. 97",
    "NJA 2002 s. 142",
    "HD T 2565-02",
    "NJA 2008 s. 826",
    "NJA 2013 s. 242",
    "NJA 2013 s. 632",
    "NJA 2016 s. 1057",
    "Äktenskapsbalken",
    "Sambolagen",
    "Lag om samäganderätt",
    "context/source candidates for future legal/source inventory only",
  ]);
});

test("doctrine, evidence, and digital-material candidates are inventory-only", () => {
  const docsText = readText(inventoryDocsPath);

  assertIncludesAll(docsText, [
    "nominal owner",
    "formal owner",
    "open owner",
    "alleged hidden owner",
    "asset/property",
    "acquisition date or acquisition period",
    "acquisition-time circumstances",
    "common use",
    "economic contribution to acquisition",
    "common intent",
    "tacit agreement",
    "post-acquisition evidence with possible evidentiary value",
    "counterevidence",
    "missing evidence",
    "source reliability",
    "confidence",
    "neutral summary",
    "direct acquisition evidence",
    "indirect intent evidence",
    "common-use evidence",
    "contribution evidence",
    "timeline evidence",
    "reliability evidence",
    "negative evidence",
    "purchase contract",
    "loan",
    "down payment",
    "bank transfer",
    "bank statements",
    "Swish",
    "amortization",
    "handpenning",
    "kontantinsats",
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
  ]);
});

test("manual legal-review gates are preserved before any future domain contract", () => {
  const docsText = readText(inventoryDocsPath);

  assertIncludesAll(docsText, [
    "whether the source list is complete",
    "exact handling of HD T 2565-02",
    "which NJA cases are controlling versus contextual",
    "how to distinguish bodelning/sambo property concepts from hidden co-ownership doctrine",
    "whether post-acquisition digital material may be represented only as evidentiary context, not legal inference",
    "how to express confidence/reliability without implying legal conclusions",
    "how to handle cases where official source text differs from aggregator summaries",
    "how to avoid giving legal advice or predicting ownership outcomes",
  ]);
});

test("current repo absence and negative boundaries remain explicit", () => {
  const docsText = readText(inventoryDocsPath);

  assertIncludesAll(docsText, [
    "boundary doc/proof for `SWE_BODELNING_DOLD_SAMAGANDERATT`",
    "generic `SWE_BODELNING` scaffolding and dossier/evidence indexes",
    "economic_contribution",
    "shared_use",
    "shared_intent",
    "explicit exclusion of `actual_swedish_samaganderatt_decision_logic`",
    "no substantive domain contract",
    "no runtime/schema/semantic-fact implementation",
    "no legal/source-backed mapping from digital material to neutral dossier concepts",
    "substantive legal doctrine contract",
    "final ownership determination",
    "legal advice engine",
    "actual_swedish_samaganderatt_decision_logic",
    "runtime implementation",
    "schema behavior changes",
    "semantic-fact adoption",
    "case outcome prediction",
    "process pleading generation",
    "automatic legal conclusion from digital material",
    "Swedish psychological violence track",
    "Danish psychological violence track",
    "general bodelning decision engine",
    "governance helper-level freeze continuation",
    "database/API/route behavior",
    "generated artifact behavior",
  ]);
});

test("existing tracked evidence confirms prior boundary and generic scaffolding only", () => {
  const boundaryDocsText = readText(boundaryDocsPath);
  const coreFreezeText = readText(coreFreezePath);
  const fullScopeFreezeText = readText(fullScopeFreezePath);
  const dossierSchemaText = readText(dossierSchemaPath);
  const coreFreezeTestText = readText(coreFreezeTestPath);
  const fullScopeFreezeTestText = readText(fullScopeFreezeTestPath);

  assert.match(
    boundaryDocsText,
    /# SWE_BODELNING_DOLD_SAMAGANDERATT Boundary Freeze/,
  );
  assert.match(boundaryDocsText, /absent\/not-yet-contract-defined/i);
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
  const docsText = readText(inventoryDocsPath);

  assert.match(docsText, /runtime_behavior:\s+blocked/);
  assert.match(docsText, /schema_behavior:\s+blocked/);
  assert.match(docsText, /semantic_fact_mapping:\s+blocked/);
  assert.match(docsText, /legal_decision_logic:\s+blocked/);
  assert.match(docsText, /This document does not implement legal logic under any statute/i);
});
