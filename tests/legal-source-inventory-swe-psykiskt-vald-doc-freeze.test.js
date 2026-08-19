const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.join(__dirname, "..");
const inventoryDocsPath = path.join(
  repoRoot,
  "docs",
  "LEGAL_SOURCE_INVENTORY_SWE_PSYKISKT_VALD_v1.md",
);
const dkInventoryDocsPath = path.join(
  repoRoot,
  "docs",
  "LEGAL_SOURCE_INVENTORY_DK_PSYKISK_VOLD_v1.md",
);
const dkNeutralLabelDocsPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_DK_PSYKISK_VOLD_NEUTRAL_LABEL_SCAFFOLD_v1.md",
);
const bodelningBoundaryDocsPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_SWE_BODELNING_DOLD_SAMAGANDERATT_v1.md",
);
const reviewTemplateDocsPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_SWE_BODELNING_DOLD_SAMAGANDERATT_ANONYMIZED_PR_LEGAL_PRODUCT_REVIEW_TEMPLATE_v1.md",
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

test("SWE source inventory doc exists and freezes the source-inventory-only boundary", () => {
  assert.equal(fs.existsSync(inventoryDocsPath), true);

  const docsText = readText(inventoryDocsPath);

  assert.match(docsText, /# SWE_PSYKISKT_VALD boundary\/source inventory/);
  assert.match(docsText, /source inventory only/i);
  assert.match(docsText, /official-source-first Swedish source hierarchy/i);
  assert.match(docsText, /currentness and in-force status gates/i);
  assert.match(
    docsText,
    /future implementation must verify current official source text before any labels, doctrine, schema, runtime, or semantic-fact work/i,
  );
  assert.match(docsText, /no legal advice is given/i);
  assert.match(docsText, /no offence determination is made/i);
  assert.match(docsText, /no private case facts are evaluated/i);
  assert.match(
    docsText,
    /no Danish law or bodelning doctrine is imported into the SWE track/i,
  );
});

test("official Swedish source candidates are listed as future-verification candidates", () => {
  const docsText = readText(inventoryDocsPath);

  assertIncludesAll(docsText, [
    "Brottsbalk (1962:700)` current official consolidated text, including the new psychological-violence provision once reflected in official current law or after entry into force",
    "official SFS amending law for the reform, once published/identified",
    "Prop. 2025/26:138, En särskild straffbestämmelse för psykiskt våld",
    "Bet. 2025/26:JuU39, En särskild straffbestämmelse för psykiskt våld",
    "Rskr. 2025/26:257",
    "Ds 2022:18, Straffansvar för psykiskt våld",
    "remissmaterial for `Ds 2022:18`",
    "remiss of utkast to lagrådsremiss, diarienummer `Ju2025/01157`",
    "lagrådsremiss `En särskild straffbestämmelse för psykiskt våld`",
    "future official Åklagarmyndigheten guidance, if a dedicated source appears",
    "future official police/prosecution guidance, if a dedicated source appears",
    "later official case-law source bucket only as candidate bucket, not doctrine application now",
    "Source candidates are not doctrine application, not legal advice, not offence determination, and not case application",
  ]);
});

test("source-priority model is official-source-first and non-decisional", () => {
  const docsText = readText(inventoryDocsPath);

  assertIncludesAll(docsText, [
    "Current official consolidated statute text first.",
    "Enacted amending SFS text and consolidated official text next.",
    "Proposition, betänkande, and riksdagsskrivelse next.",
    "Ds, remissmaterial, and lagrådsremiss materials next.",
    "Future official guidance only as non-controlling official context unless otherwise legally reviewed.",
    "Case-law only as later verified source-candidate bucket, not doctrine application now.",
    "does not rank case facts",
    "does not weigh evidence",
    "does not select any legal outcome",
  ]);
});

test("source-inventory classifications are neutral and non-implementing", () => {
  const docsText = readText(inventoryDocsPath);

  assertIncludesAll(docsText, [
    "neutral source-inventory classifications only",
    "SWE_PSYKISKT_VALD_SOURCE_INVENTORY",
    "SWE_BROTTSBALKEN_PSYKISKT_VALD_SOURCE",
    "OFFICIAL_STATUTORY_SOURCE",
    "OFFICIAL_SFS_AMENDING_SOURCE",
    "OFFICIAL_PROPOSITION_SOURCE",
    "OFFICIAL_PARLIAMENTARY_DECISION_SOURCE",
    "PREPARATORY_MATERIAL_SOURCE",
    "REMISS_MATERIAL_SOURCE",
    "OFFICIAL_GUIDANCE_SOURCE_CANDIDATE",
    "CASE_LAW_SOURCE_CANDIDATE",
    "OFFICIAL_SOURCE_PRIORITY",
    "SOURCE_COMPLETENESS_GATE",
    "IN_FORCE_STATUS_GATE",
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
    "These classifications are not schema fields, runtime classes, semantic-fact mappings, offence elements, neutral labels, doctrine labels, legal conclusions, case-law holdings, risk findings, diagnosis, issue merits determinations, or sufficiency determinations.",
  ]);
});

test("classification rules preserve inventory semantics only", () => {
  const docsText = readText(inventoryDocsPath);

  assertIncludesAll(docsText, [
    "SWE_PSYKISKT_VALD_SOURCE_INVENTORY` may identify the separate Swedish psychological-violence source-inventory track",
    "SWE_BROTTSBALKEN_PSYKISKT_VALD_SOURCE` may identify the Swedish Criminal Code / Brottsbalk source candidate once current official text is verified",
    "OFFICIAL_STATUTORY_SOURCE` may identify current or historical official statutory source candidates",
    "OFFICIAL_SFS_AMENDING_SOURCE` may identify the official SFS amending law source candidate once published or identified",
    "OFFICIAL_PROPOSITION_SOURCE` may identify proposition source candidates",
    "OFFICIAL_PARLIAMENTARY_DECISION_SOURCE` may identify betänkande and riksdagsskrivelse source candidates",
    "PREPARATORY_MATERIAL_SOURCE` may identify Ds, lagrådsremiss, and related preparatory-material source candidates",
    "REMISS_MATERIAL_SOURCE` may identify remiss and remiss-response source candidates",
    "OFFICIAL_GUIDANCE_SOURCE_CANDIDATE` may identify future dedicated official guidance source candidates",
    "CASE_LAW_SOURCE_CANDIDATE` may identify a future verified official case-law source bucket, not doctrine application",
    "OFFICIAL_SOURCE_PRIORITY` may identify source hierarchy",
    "SOURCE_COMPLETENESS_GATE` may identify that currentness and completeness of official source text require manual verification",
    "IN_FORCE_STATUS_GATE` may identify that effective date and in-force status require manual verification",
    "TRANSLATION_CAUTION` may identify translation risk between Swedish, Danish, and English legal terms",
    "MANUAL_LEGAL_REVIEW_REQUIRED` may identify that human legal review is required before labels, doctrine, application, or later modelling",
    "NON_CONTROLLING_CONTEXT_ONLY` may identify official context sources that are not controlling statutory text",
    "EXCLUDED_DANISH_TRACK` may identify that Danish psychological-violence work is excluded from this SWE track",
    "EXCLUDED_BODELNING_TRACK` may identify that bodelning/hidden-co-ownership work is excluded from this SWE track",
    "NO_CASE_APPLICATION` may identify that private facts are not evaluated",
    "NO_LEGAL_ADVICE` may identify that the inventory is not advice",
    "NO_DECISION_LOGIC` may identify that the inventory is not legal decision logic",
  ]);
});

test("manual legal-review gates are explicit before labels, doctrine, or application work", () => {
  const docsText = readText(inventoryDocsPath);

  assertIncludesAll(docsText, [
    "current official wording and in-force status",
    "source completeness/currentness",
    "exact SFS amending law identifier and text",
    "whether the provision is reflected in current official law on the implementation date",
    "any doctrinal significance of preparatory materials",
    "any case-law selection",
    "any dedicated Åklagarmyndigheten guidance",
    "any dedicated police/prosecution guidance",
    "any guidance treated as legally weighty",
    "any translation-sensitive wording between Swedish, Danish, and English terms",
    "any move from inventory to neutral labels, doctrine labels, offence elements, or case-law use",
    "any wording that could imply legal advice",
    "any wording that could imply offence determination",
    "any wording that could imply sufficiency scoring",
    "any wording that could imply risk scoring",
    "any wording that could imply diagnosis",
    "any wording that could imply outcome prediction",
    "any use of non-official summaries or non-controlling context",
    "any attempt to import Danish psychological-violence law",
    "any attempt to import Swedish bodelning or hidden-co-ownership doctrine",
  ]);
});

test("excluded tracks, relationship to future work, and separation remain explicit", () => {
  const docsText = readText(inventoryDocsPath);

  assertIncludesAll(docsText, [
    "SWE_PSYKISKT_VALD is separate from DK_PSYKISK_VOLD",
    "SWE_PSYKISKT_VALD is separate from SWE_BODELNING_DOLD_SAMAGANDERATT",
    "SWE_PSYKISKT_VALD is not Danish psychological-violence work",
    "SWE_PSYKISKT_VALD is not Swedish bodelning",
    "SWE_PSYKISKT_VALD is not Swedish hidden co-ownership",
    "SWE_PSYKISKT_VALD is not the bohag/lösöre side-track",
    "SWE_PSYKISKT_VALD is not private-case factual review",
    "The closed `SWE_BODELNING_DOLD_SAMAGANDERATT` chain and anonymized PR/legal product review template remain closed and are not superseded",
    "The closed `DK_PSYKISK_VOLD` source inventory and neutral label scaffold remain closed and are not superseded",
    "This source inventory may support a later `SWE_PSYKISKT_VALD` neutral label scaffold only after official source currentness/in-force status verification",
    "This source inventory may support later doctrine/requisite work only after explicit user approval",
    "This source inventory may support later schema/runtime/semantic-fact planning only after explicit user approval",
    "This source inventory does not select or create any later neutral labels, doctrine, schema, runtime, semantic-fact, risk, diagnosis, or decision work",
    "`DK_PSYKISK_VOLD` remains a separate source/label track",
    "`SWE_BODELNING_DOLD_SAMAGANDERATT` remains a separate bodelning/hidden-co-ownership track",
  ]);

  assertIncludesAll(docsText, [
    "DK_PSYKISK_VOLD",
    "SWE_BODELNING_DOLD_SAMAGANDERATT",
    "Swedish hidden co-ownership",
    "Swedish bodelning ownership determination",
    "bohag/lösöre side-track",
    "private case facts",
    "private screenshots",
    "uploaded private documents",
    "case-specific review material",
    "runtime/schema/semantic-fact/legal-decision work",
    "neutral labels",
    "doctrine labels",
    "offence-element modelling",
    "case-law doctrine",
    "risk scoring",
    "diagnosis",
    "offence determination",
    "police report generation",
    "process pleading generation",
  ]);
});

test("negative boundaries block advice, application, implementation, labels, and modelling", () => {
  const docsText = readText(inventoryDocsPath);

  assertIncludesAll(docsText, [
    "evaluation of private case facts",
    "diagnosis of psychological violence",
    "determination that psychological violence occurred",
    "determination whether any Swedish offence element is satisfied",
    "legal advice",
    "police reports",
    "pleadings",
    "case outcome prediction",
    "risk scoring",
    "evidentiary sufficiency scoring",
    "runtime implementation",
    "schema behavior changes",
    "semantic-fact mapping",
    "legal decision logic",
    "neutral label scaffold",
    "doctrine/requisite labels",
    "offence-element modelling",
    "case-law doctrine",
    "importing Danish psychological-violence law into the SWE track",
    "importing bodelning or hidden-co-ownership doctrine into the SWE track",
    "blending `SWE_PSYKISKT_VALD` with `SWE_BODELNING_DOLD_SAMAGANDERATT`",
    "blending `SWE_PSYKISKT_VALD` with `DK_PSYKISK_VOLD`",
    "private case-specific facts or screenshots",
    "copying private uploaded documents into product docs",
    "governance helper-level freeze continuation",
    "database/API/route behavior",
    "generated artifact behavior",
  ]);
});

test("implementation blocks and adjacent closed evidence remain explicit", () => {
  const docsText = readText(inventoryDocsPath);

  assert.match(docsText, /runtime\/schema\/semantic-fact mapping remains blocked/i);
  assert.match(
    docsText,
    /actual_swedish_samaganderatt_decision_logic` remains excluded\/not implemented/i,
  );

  assert.equal(fs.existsSync(dkInventoryDocsPath), true);
  assert.equal(fs.existsSync(dkNeutralLabelDocsPath), true);
  assert.equal(fs.existsSync(bodelningBoundaryDocsPath), true);
  assert.equal(fs.existsSync(reviewTemplateDocsPath), true);
});

test("proof is text-evidence only and does not require runtime, source, or schema changes", () => {
  const docsText = readText(inventoryDocsPath);
  const testText = readText(__filename);

  assert.match(docsText, /Status:\s+DOCS_ONLY source inventory freeze\./);
  assert.match(docsText, /Mode:\s+source inventory only\./);
  assert.match(testText, /readFileSync/);
  assert.match(testText, /existsSync/);
  assert.doesNotMatch(testText, /require\(".*packages\//);
  assert.doesNotMatch(testText, /require\(".*schemas\//);
});
