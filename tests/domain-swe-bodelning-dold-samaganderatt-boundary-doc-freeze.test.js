const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.join(__dirname, "..");
const domainDocsPath = path.join(
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
    assert.match(text, new RegExp(entry.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"));
  }
}

test("domain boundary doc exists and freezes the hidden co-ownership prerequisite boundary", () => {
  assert.equal(fs.existsSync(domainDocsPath), true);

  const docsText = readText(domainDocsPath);

  assert.match(docsText, /# SWE_BODELNING_DOLD_SAMAGANDERATT Boundary Freeze/);
  assert.match(docsText, /prerequisite\/boundary freeze/i);
  assert.match(docsText, /It is not implementation/i);
  assert.match(docsText, /absent_not_yet_contract_defined/i);
  assert.match(docsText, /absent\/not-yet-contract-defined/i);
  assert.match(docsText, /new domain-first track/i);
  assert.match(docsText, /not legal decision-making/i);
  assert.match(docsText, /Existing generic `SWE_BODELNING` backend\/export scaffolding is context only/i);
  assert.match(
    docsText,
    /`actual_swedish_samaganderatt_decision_logic` coverage is an explicit\s+exclusion/i,
  );
  assert.match(docsText, /not an implementation/i);
  assert.match(
    docsText,
    /Runtime, schema, and semantic-fact mapping for this domain remain blocked/i,
  );
  assert.match(docsText, /legal\/source inventory exists/i);
  assert.match(docsText, /domain terms are contract-defined/i);
  assert.match(docsText, /evidence\/timeline concepts are contract-defined/i);
  assert.match(docsText, /semantic-fact mappings are made concrete/i);
  assert.match(docsText, /proof tests exist for the domain contract/i);

  assertIncludesAll(docsText, [
    "nominal owner",
    "alleged hidden owner",
    "asset/property",
    "acquisition date or acquisition period",
    "common use",
    "economic contribution to acquisition",
    "common intent or tacit agreement",
    "post-acquisition evidence that may illuminate intent at acquisition",
    "counterevidence",
    "missing evidence",
    "source reliability",
    "confidence level",
    "neutral summary",
  ]);

  assertIncludesAll(docsText, [
    "digital material",
    "evidence source",
    "evidence item",
    "evidence timeline",
    "source location",
    "document/message/payment reference",
    "metadata status",
    "reliability/confidence indicator",
    "contradiction or counterevidence marker",
    "missing follow-up evidence",
  ]);

  assertIncludesAll(docsText, [
    "legal advice engine",
    "final ownership determination",
    "guilt determination",
    "actual_swedish_samaganderatt_decision_logic",
    "runtime implementation",
    "schema behavior changes",
    "semantic-fact adoption",
    "case outcome prediction",
    "process pleading generation",
    "Swedish psychological violence track",
    "Danish psychological violence track",
    "general bodelning decision engine",
    "governance helper-level freeze loop",
    "database/API/route behavior",
    "generated artifact behavior",
  ]);
});

test("existing tracked evidence remains generic SWE_BODELNING context only", () => {
  const coreFreezeText = readText(coreFreezePath);
  const fullScopeFreezeText = readText(fullScopeFreezePath);
  const dossierSchemaText = readText(dossierSchemaPath);

  assert.match(coreFreezeText, /# SWE_BODELNING Core\/Backend MVP Freeze/);
  assert.match(coreFreezeText, /canonical_profile_dossier_snapshot/);
  assert.match(coreFreezeText, /evidence_reference_index/);
  assert.match(coreFreezeText, /evidence_exhibit_index/);
  assert.match(coreFreezeText, /issue_index/);
  assert.match(coreFreezeText, /section_index/);

  assert.match(fullScopeFreezeText, /# SWE_BODELNING Full Scope Freeze/);
  assert.match(fullScopeFreezeText, /canonical_export_package_snapshot/);
  assert.match(fullScopeFreezeText, /completed SWE_BODELNING full-scope backend\/export baseline/i);

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
});

test("existing samaganderatt decision logic evidence is excluded rather than implemented", () => {
  const coreFreezeText = readText(coreFreezePath);
  const fullScopeFreezeText = readText(fullScopeFreezePath);
  const coreFreezeTestText = readText(coreFreezeTestPath);
  const fullScopeFreezeTestText = readText(fullScopeFreezeTestPath);

  assert.match(coreFreezeText, /out_of_scope:[\s\S]*actual_swedish_samaganderatt_decision_logic/);
  assert.match(fullScopeFreezeText, /out_of_scope:[\s\S]*actual_swedish_samaganderatt_decision_logic/);
  assert.match(coreFreezeTestText, /actual_swedish_samaganderatt_decision_logic/);
  assert.match(fullScopeFreezeTestText, /actual_swedish_samaganderatt_decision_logic/);
});

test("proof stays text-only and does not require runtime or schema changes", () => {
  const docsText = readText(domainDocsPath);

  assert.match(docsText, /runtime_behavior:\s+blocked/);
  assert.match(docsText, /schema_behavior:\s+blocked/);
  assert.match(docsText, /semantic_fact_mapping:\s+blocked/);
  assert.match(docsText, /It must not infer legal conclusions from digital\s+material/i);
  assert.match(docsText, /It records what must be defined before any later implementation/i);
});
