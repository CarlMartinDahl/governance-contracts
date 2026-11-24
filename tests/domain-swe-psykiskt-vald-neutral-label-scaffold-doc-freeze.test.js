const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.join(__dirname, "..");
const labelScaffoldDocsPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_SWE_PSYKISKT_VALD_NEUTRAL_LABEL_SCAFFOLD_v1.md",
);
const sourceInventoryV1DocsPath = path.join(
  repoRoot,
  "docs",
  "LEGAL_SOURCE_INVENTORY_SWE_PSYKISKT_VALD_v1.md",
);
const sourceInventoryV2DocsPath = path.join(
  repoRoot,
  "docs",
  "LEGAL_SOURCE_INVENTORY_SWE_PSYKISKT_VALD_v2.md",
);
const sourceInventoryV2ProofPath = path.join(
  repoRoot,
  "tests",
  "legal-source-inventory-swe-psykiskt-vald-v2-doc-freeze.test.js",
);
const dkLabelScaffoldDocsPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_DK_PSYKISK_VOLD_NEUTRAL_LABEL_SCAFFOLD_v1.md",
);
const bodelningBoundaryDocsPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_SWE_BODELNING_DOLD_SAMAGANDERATT_v1.md",
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

test("SWE neutral label scaffold doc exists and freezes organizational-only labels", () => {
  assert.equal(fs.existsSync(labelScaffoldDocsPath), true);

  const docsText = readText(labelScaffoldDocsPath);

  assert.match(
    docsText,
    /# SWE_PSYKISKT_VALD neutral source-derived label scaffold/,
  );
  assert.match(docsText, /Status:\s+DOCS_ONLY neutral label scaffold freeze\./);
  assert.match(docsText, /Mode:\s+neutral source-derived label scaffold\./);
  assert.match(docsText, /labels are organizational only/i);
  assert.match(docsText, /labels are not executable offence elements/i);
  assert.match(docsText, /labels are not legal conclusions/i);
  assert.match(docsText, /labels are not legal advice/i);
  assert.match(docsText, /labels are not offence determination/i);
  assert.match(docsText, /labels are not diagnosis/i);
  assert.match(docsText, /labels are not risk scoring/i);
  assert.match(docsText, /labels are not sufficiency scoring/i);
  assert.match(docsText, /private facts are not evaluated/i);
});

test("closed source inventory prerequisites and official Swedish provenance are explicit", () => {
  const docsText = readText(labelScaffoldDocsPath);

  assertIncludesAll(docsText, [
    "docs/LEGAL_SOURCE_INVENTORY_SWE_PSYKISKT_VALD_v1.md` remains closed and untouched",
    "docs/LEGAL_SOURCE_INVENTORY_SWE_PSYKISKT_VALD_v2.md` is the verified post-enactment source-inventory prerequisite",
    "This scaffold follows the verified `v2` source inventory but does not replace it",
    "Official source currentness and any later amendments or case law remain manual-review gated",
    "Current official consolidated `Brottsbalk (1962:700)`, specifically `4 kap. 7 b §`",
    "SFS 2026:852",
    "entered into force `2026-07-01`",
    "Prop. 2025/26:138",
    "Bet. 2025/26:JuU39",
    "Rskr. 2025/26:257",
    "Rättslig vägledning 2026:7",
    "non-controlling official prosecutorial context",
  ]);
});

test("domain separation and implementation blocks remain intact", () => {
  const docsText = readText(labelScaffoldDocsPath);

  assertIncludesAll(docsText, [
    "SWE_PSYKISKT_VALD is separate from DK_PSYKISK_VOLD",
    "SWE_PSYKISKT_VALD is separate from SWE_BODELNING_DOLD_SAMAGANDERATT",
    "SWE_PSYKISKT_VALD is not Danish psychological-violence work",
    "SWE_PSYKISKT_VALD is not Swedish bodelning",
    "SWE_PSYKISKT_VALD is not Swedish hidden co-ownership",
    "SWE_PSYKISKT_VALD is not bohag/lösöre side-track",
    "SWE_PSYKISKT_VALD is not private-case factual review",
    "The closed `DK_PSYKISK_VOLD` source inventory, neutral label scaffold, and evidence-readiness review-signal boundary remain closed and are not superseded",
  ]);

  assert.match(docsText, /runtime\/schema\/semantic-fact mapping remains blocked/i);
  assert.match(
    docsText,
    /actual_swedish_samaganderatt_decision_logic` remains excluded\/not implemented/i,
  );
  assert.match(docsText, /runtime_behavior:\s+blocked/);
  assert.match(docsText, /schema_behavior:\s+blocked/);
  assert.match(docsText, /semantic_fact_mapping:\s+blocked/);
  assert.match(docsText, /legal_decision_logic:\s+blocked/);
});

test("safe neutral labels and manual-review-gated working labels are explicit and non-decisional", () => {
  const docsText = readText(labelScaffoldDocsPath);

  assertIncludesAll(docsText, [
    "SWE_PSYKISKT_VALD_LABEL_SCAFFOLD",
    "SWE_PSYKISKT_VALD_CONTEXT_LABEL",
    "SOURCE_PROVENANCE_LABEL",
    "TRANSLATION_CAUTION_LABEL",
    "MANUAL_LEGAL_REVIEW_REQUIRED",
    "NO_CASE_APPLICATION",
    "NO_OFFENCE_DETERMINATION",
    "MALSAGANDE_OR_AFFECTED_PERSON_CONTEXT_LABEL",
    "ASSERTED_ACTOR_OR_COUNTERPARTY_CONTEXT_LABEL",
    "ACCUSATION_OR_DISPARAGEMENT_CONTEXT",
    "HUMILIATION_BEHAVIOR_CONTEXT",
    "THREAT_OR_COERCION_CONTEXT",
    "MONITORING_OR_SURVEILLANCE_CONTEXT",
    "REPETITION_OR_DURATION_TIMELINE_CONTEXT",
    "RELATION_AND_COUNTER_CONTEXT",
    "ADJACENT_STATUTORY_CROSS_REFERENCE_CONTEXT",
  ]);

  assertNormalizedIncludesAll(docsText, [
    "These labels are neutral organizational labels only and do not determine law, facts, risk, proof, sufficiency, diagnosis, or outcome.",
    "These labels may be used only for cautious, human-correctable organization of supplied material and must not be treated as offence elements, normative threshold findings, legal conclusions, proof, sufficiency findings, risk findings, diagnosis, or offence determination.",
  ]);
});

test("normative threshold, non-enacted, culpability, and clinical labels are explicitly excluded or deferred", () => {
  const docsText = readText(labelScaffoldDocsPath);

  assertIncludesAll(docsText, [
    "OTILLBORLIGT_THRESHOLD_LABEL",
    "UPPREPAT_OR_VARAKTIG_SATISFIED_LABEL",
    "ALLVARLIGT_SKADA_SJALVKANSLAN_LABEL",
    "EKONOMISKT_VALD_AS_SEPARATE_4_7B_ELEMENT_LABEL",
    "UPPSAT_OR_GUILT_LABEL",
    "CLINICAL_OR_DIAGNOSTIC_CONFLICT_LABEL",
    "must not be used in this scaffold to decide whether `4 kap. 7 b § brottsbalken` is satisfied",
    "to expand statutory scope beyond `SFS 2026:852`",
  ]);
});

test("label classification rules and manual legal-review gates preserve non-decisional boundaries", () => {
  const docsText = readText(labelScaffoldDocsPath);

  assertIncludesAll(docsText, [
    "ACCUSATION_OR_DISPARAGEMENT_CONTEXT` may group supplied material for human review near the *beskyllning* / *nedsättande uttalande* working area without deciding",
    "HUMILIATION_BEHAVIOR_CONTEXT` may group supplied material for human review near the *förödmjukande beteende* working area without deciding",
    "THREAT_OR_COERCION_CONTEXT` may group supplied material for human review near the *otillbörligt hot* / *otillbörligt tvång* working area without deciding",
    "MONITORING_OR_SURVEILLANCE_CONTEXT` may group supplied material for human review near the *otillbörlig övervakning* working area without deciding",
    "REPETITION_OR_DURATION_TIMELINE_CONTEXT` may organize timestamps, sequence spans, and declared timeline gaps",
    "RELATION_AND_COUNTER_CONTEXT` may preserve relationship setting, surrounding thread context, counter-context, and selection-bias/missing-message warnings",
    "ADJACENT_STATUTORY_CROSS_REFERENCE_CONTEXT` may record a non-decisional cross-reference note",
    "any normative threshold assessment (*otillbörligt*, *upprepat*, *varaktig*, *ägnade att allvarligt skada personens självkänsla*)",
    "any economic-conflict context (noting *ekonomiskt våld* was not enacted as a separate `4 kap. 7 b §` element)",
    "any custody-dispute, high-conflict, or counter-context selection-bias risk",
    "real private run authorization",
    "product-candidate selection",
    "external-use authorization",
  ]);
});

test("prerequisite and adjacent repo evidence remain present and proof is text-only", () => {
  assert.equal(fs.existsSync(sourceInventoryV1DocsPath), true);
  assert.equal(fs.existsSync(sourceInventoryV2DocsPath), true);
  assert.equal(fs.existsSync(sourceInventoryV2ProofPath), true);
  assert.equal(fs.existsSync(dkLabelScaffoldDocsPath), true);
  assert.equal(fs.existsSync(bodelningBoundaryDocsPath), true);

  const testText = readText(__filename);
  assert.match(testText, /readFileSync/);
  assert.match(testText, /existsSync/);
  assert.doesNotMatch(testText, /require\(".*packages\//);
  assert.doesNotMatch(testText, /require\(".*schemas\//);
});
