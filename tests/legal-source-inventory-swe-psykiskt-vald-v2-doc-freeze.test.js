const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.join(__dirname, "..");
const inventoryV2DocsPath = path.join(
  repoRoot,
  "docs",
  "LEGAL_SOURCE_INVENTORY_SWE_PSYKISKT_VALD_v2.md",
);
const inventoryV1DocsPath = path.join(
  repoRoot,
  "docs",
  "LEGAL_SOURCE_INVENTORY_SWE_PSYKISKT_VALD_v1.md",
);
const inventoryV1ProofPath = path.join(
  repoRoot,
  "tests",
  "legal-source-inventory-swe-psykiskt-vald-doc-freeze.test.js",
);
const dkInventoryDocsPath = path.join(
  repoRoot,
  "docs",
  "LEGAL_SOURCE_INVENTORY_DK_PSYKISK_VOLD_v1.md",
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

test("SWE verified source inventory v2 doc exists and freezes DOCS_ONLY status", () => {
  assert.equal(fs.existsSync(inventoryV2DocsPath), true);

  const docsText = readText(inventoryV2DocsPath);

  assert.match(
    docsText,
    /# SWE_PSYKISKT_VALD verified post-enactment source inventory v2/,
  );
  assert.match(docsText, /Status:\s+DOCS_ONLY verified source inventory freeze\./);
  assert.match(docsText, /Mode:\s+source inventory only\./);
  assert.match(docsText, /official-source-first Swedish source hierarchy/i);
  assert.match(docsText, /no legal advice is given/i);
  assert.match(docsText, /no offence determination is made/i);
  assert.match(docsText, /no private case facts are evaluated/i);
  assert.match(
    docsText,
    /no Danish law or bodelning doctrine is imported into the SWE track/i,
  );
});

test("verified post-enactment Swedish sources and effective date are recorded explicitly", () => {
  const docsText = readText(inventoryV2DocsPath);

  assertIncludesAll(docsText, [
    "Brottsbalk (1962:700)` consolidated official text, specifically `4 kap. 7 b §`",
    "4 kap. 3 §",
    "4 kap. 4 a §",
    "4 kap. 4 b §",
    "4 kap. 4 e §",
    "SFS 2026:852",
    "issued `2026-05-28`",
    "published `2026-06-03`",
    "entered into force `2026-07-01`",
    "Prop. 2025/26:138",
    "Bet. 2025/26:JuU39",
    "Rskr. 2025/26:257",
    "Ds 2022:18",
    "Ju2025/01157",
    "Åklagarmyndigheten, Utvecklingscentrum, `Rättslig vägledning 2026:7`",
    "Brott i nära relation, olaga förföljelse och psykiskt våld",
    "replacing `Rättslig vägledning 2024:2`",
    "non-controlling official prosecutorial context only",
    "later official case-law source bucket (`Högsta domstolen` and `hovrätter`) — candidate bucket only, not doctrine application now",
  ]);
});

test("non-decisional statutory scope notes preserve ekonomiskt vald exclusion and nascent precedent caution", () => {
  const docsText = readText(inventoryV2DocsPath);

  assertIncludesAll(docsText, [
    "Economic violence (*ekonomiskt våld*) was not enacted as a separate statutory element in `4 kap. 7 b § brottsbalken`",
    "misuse or weaponization in high-conflict or custody disputes",
    "counter-context and missing-context preservation",
    "entered into force on `2026-07-01`",
    "precedent remains nascent and must never be invented or assumed",
    "does not quote long statutory text",
    "does not convert statutory structure into executable offence elements",
  ]);
});

test("source-priority model remains official-source-first and non-decisional", () => {
  const docsText = readText(inventoryV2DocsPath);

  assertIncludesAll(docsText, [
    "Current official consolidated `Brottsbalk (1962:700)` text first",
    "Enacted amending law `SFS 2026:852`",
    "`Prop. 2025/26:138`, `Bet. 2025/26:JuU39`, and `Rskr. 2025/26:257` next.",
    "`Ds 2022:18`, remissmaterial, `Ju2025/01157`, lagrådsremiss, and Lagrådet opinion next.",
    "Åklagarmyndigheten `Rättslig vägledning 2026:7` and any later official guidance only as non-controlling official context",
    "Official case law only as a later verified source-candidate bucket, not doctrine application now.",
    "does not rank case facts",
    "does not weigh evidence",
    "does not select any legal outcome",
  ]);
});

test("source-inventory v2 classifications are neutral and non-implementing", () => {
  const docsText = readText(inventoryV2DocsPath);

  assertIncludesAll(docsText, [
    "SWE_PSYKISKT_VALD_SOURCE_INVENTORY_V2",
    "SWE_BROTTSBALKEN_4_7B_VERIFIED_STATUTORY_SOURCE",
    "SWE_SFS_2026_852_ENACTED_AMENDING_SOURCE",
    "SWE_BROTTSBALKEN_ADJACENT_4_3_4A_4B_4E_AMENDMENT_SOURCE",
    "OFFICIAL_PROPOSITION_SOURCE",
    "OFFICIAL_PARLIAMENTARY_DECISION_SOURCE",
    "PREPARATORY_MATERIAL_SOURCE",
    "REMISS_MATERIAL_SOURCE",
    "AKLAGARMYNDIGHETEN_RAV_2026_7_NON_CONTROLLING_CONTEXT",
    "CASE_LAW_SOURCE_CANDIDATE",
    "OFFICIAL_SOURCE_PRIORITY",
    "IN_FORCE_VERIFIED_2026_07_01_ONGOING_CURRENTNESS_GATED",
    "SOURCE_COMPLETENESS_GATE",
    "EKONOMISKT_VALD_NOT_SEPARATE_4_7B_ELEMENT_NOTE",
    "TRANSLATION_CAUTION",
    "MANUAL_LEGAL_REVIEW_REQUIRED",
    "NON_CONTROLLING_CONTEXT_ONLY",
    "EXCLUDED_DANISH_TRACK",
    "EXCLUDED_BODELNING_TRACK",
    "NO_CASE_APPLICATION",
    "NO_LEGAL_ADVICE",
    "NO_DECISION_LOGIC",
  ]);

  assertNormalizedIncludesAll(docsText, [
    "These classifications are not schema fields, runtime classes, semantic-fact mappings, offence elements, doctrine labels, legal conclusions, case-law holdings, risk findings, diagnosis, issue merits determinations, or sufficiency determinations.",
  ]);
});

test("domain separation, closed v1 preservation, negative boundaries, and implementation blocks remain explicit", () => {
  const docsText = readText(inventoryV2DocsPath);

  assertIncludesAll(docsText, [
    "docs/LEGAL_SOURCE_INVENTORY_SWE_PSYKISKT_VALD_v1.md` remains closed and untouched",
    "SWE_PSYKISKT_VALD is separate from DK_PSYKISK_VOLD",
    "SWE_PSYKISKT_VALD is separate from SWE_BODELNING_DOLD_SAMAGANDERATT",
    "SWE_PSYKISKT_VALD is not Danish psychological-violence work",
    "SWE_PSYKISKT_VALD is not Swedish bodelning",
    "SWE_PSYKISKT_VALD is not Swedish hidden co-ownership",
    "SWE_PSYKISKT_VALD is not the bohag/lösöre side-track",
    "SWE_PSYKISKT_VALD is not private-case factual review",
    "determination whether `4 kap. 7 b § brottsbalken` or any Swedish offence element is satisfied",
    "real private run authorization",
    "raw/private/source inspection",
    "metadata acquisition",
    "product-candidate selection",
    "external-use authorization",
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

  assert.equal(fs.existsSync(inventoryV1DocsPath), true);
  assert.equal(fs.existsSync(inventoryV1ProofPath), true);
  assert.equal(fs.existsSync(dkInventoryDocsPath), true);
  assert.equal(fs.existsSync(bodelningBoundaryDocsPath), true);
});

test("proof is text-evidence only and does not require runtime, source, or schema changes", () => {
  const testText = readText(__filename);

  assert.match(testText, /readFileSync/);
  assert.match(testText, /existsSync/);
  assert.doesNotMatch(testText, /require\(".*packages\//);
  assert.doesNotMatch(testText, /require\(".*schemas\//);
});
