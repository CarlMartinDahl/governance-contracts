const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.join(__dirname, "..");
const inventoryDocsPath = path.join(
  repoRoot,
  "docs",
  "LEGAL_SOURCE_INVENTORY_DK_PSYKISK_VOLD_v1.md",
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

test("DK source inventory doc exists and freezes the source-inventory-only boundary", () => {
  assert.equal(fs.existsSync(inventoryDocsPath), true);

  const docsText = readText(inventoryDocsPath);

  assert.match(docsText, /# DK_PSYKISK_VOLD boundary\/source inventory/);
  assert.match(docsText, /source inventory only/i);
  assert.match(docsText, /official-source-first hierarchy/i);
  assert.match(
    docsText,
    /future implementation must verify current official source text before any doctrine, schema, runtime, or semantic-fact work/i,
  );
  assert.match(docsText, /no legal advice is given/i);
  assert.match(docsText, /no offence determination is made/i);
  assert.match(docsText, /no private case facts are evaluated/i);
});

test("official Danish source candidates are listed as future-verification candidates", () => {
  const docsText = readText(inventoryDocsPath);

  assertIncludesAll(docsText, [
    "Danish Criminal Code / straffeloven § 243",
    "Lov nr. 329 af 30/03/2019",
    "Rigsadvokatmeddelelsen, section on Psykisk vold",
    "Anklagemyndigheden guidance on psykisk vold",
    "Anklagemyndigheden thematic inspection / opsamling on psykisk vold",
    "relevant preparatory materials / lovforslag for § 243",
    "later official amendments or current consolidated law text, if live official source access is used",
    "Source candidates are not doctrine application, not legal advice, not offence determination, and not case application",
  ]);
});

test("source-priority model is official-source-first and non-decisional", () => {
  const docsText = readText(inventoryDocsPath);

  assertIncludesAll(docsText, [
    "Current official consolidated statute first.",
    "Original/amending law and preparatory materials next.",
    "Official prosecutorial guidance next.",
    "Official inspection/guidance materials as non-controlling official context.",
    "Case-law bucket only as verified official source candidate, not as doctrine application.",
    "does not rank case facts",
    "does not weigh evidence",
    "does not select any legal outcome",
  ]);
});

test("source-inventory classifications are neutral and non-implementing", () => {
  const docsText = readText(inventoryDocsPath);

  assertIncludesAll(docsText, [
    "neutral source-inventory classifications only",
    "DK_PSYKISK_VOLD_SOURCE_INVENTORY",
    "DK_STRAFFELOVEN_SECTION_243",
    "OFFICIAL_STATUTORY_SOURCE",
    "OFFICIAL_PROSECUTORIAL_GUIDANCE",
    "PREPARATORY_MATERIAL_SOURCE",
    "CASE_LAW_SOURCE_CANDIDATE",
    "OFFICIAL_SOURCE_PRIORITY",
    "SOURCE_COMPLETENESS_GATE",
    "TRANSLATION_CAUTION",
    "MANUAL_LEGAL_REVIEW_REQUIRED",
    "NON_CONTROLLING_CONTEXT_ONLY",
    "EXCLUDED_SWEDISH_TRACK",
    "EXCLUDED_BODELNING_TRACK",
    "NO_CASE_APPLICATION",
    "NO_LEGAL_ADVICE",
    "NO_DECISION_LOGIC",
  ]);

  assertNormalizedIncludesAll(docsText, [
    "These classifications are not schema fields, runtime classes, semantic-fact mappings, offence elements, doctrine labels, legal conclusions, case-law holdings, risk findings, diagnosis, issue merits determinations, or sufficiency determinations.",
  ]);
});

test("classification rules preserve inventory semantics only", () => {
  const docsText = readText(inventoryDocsPath);

  assertIncludesAll(docsText, [
    "DK_PSYKISK_VOLD_SOURCE_INVENTORY` may identify the separate Danish psychological violence source-inventory track",
    "DK_STRAFFELOVEN_SECTION_243` may identify the statutory source candidate for straffeloven § 243",
    "OFFICIAL_STATUTORY_SOURCE` may identify current or historical official statutory source candidates",
    "OFFICIAL_PROSECUTORIAL_GUIDANCE` may identify official prosecutorial guidance source candidates",
    "PREPARATORY_MATERIAL_SOURCE` may identify preparatory-material source candidates",
    "CASE_LAW_SOURCE_CANDIDATE` may identify a future verified official case-law source bucket, not doctrine application",
    "OFFICIAL_SOURCE_PRIORITY` may identify source hierarchy",
    "SOURCE_COMPLETENESS_GATE` may identify that currentness and completeness of official source text require manual verification",
    "TRANSLATION_CAUTION` may identify translation-risk between Danish, Swedish, and English legal terms",
    "MANUAL_LEGAL_REVIEW_REQUIRED` may identify that human legal review is required before any doctrine or application work",
    "NON_CONTROLLING_CONTEXT_ONLY` may identify official context sources that are not controlling statutory text",
    "EXCLUDED_SWEDISH_TRACK` may identify that Swedish psychological violence work is excluded from this DK track",
    "EXCLUDED_BODELNING_TRACK` may identify that Swedish bodelning/hidden-co-ownership work is excluded from this DK track",
    "NO_CASE_APPLICATION` may identify that private facts are not evaluated",
    "NO_LEGAL_ADVICE` may identify that the inventory is not advice",
    "NO_DECISION_LOGIC` may identify that the inventory is not legal decision logic",
  ]);
});

test("manual legal-review gates are explicit before doctrine or application work", () => {
  const docsText = readText(inventoryDocsPath);

  assertIncludesAll(docsText, [
    "currentness and completeness of official source text",
    "translation between Danish, Swedish, and English terms",
    "any move from inventory to doctrine labels or offence elements",
    "any case-law selection",
    "any private fact application",
    "any wording that could imply legal advice",
    "any wording that could imply offence determination",
    "any wording that could imply sufficiency scoring",
    "any wording that could imply risk scoring",
    "any wording that could imply diagnosis",
    "any wording that could imply outcome prediction",
    "any use of non-official summaries or non-controlling context",
    "any attempt to import Swedish psychological violence law",
    "any attempt to import Swedish bodelning or hidden co-ownership doctrine",
  ]);
});

test("excluded tracks and future-work relationship keep DK separate", () => {
  const docsText = readText(inventoryDocsPath);

  assertIncludesAll(docsText, [
    "DK_PSYKISK_VOLD is separate from SWE_BODELNING_DOLD_SAMAGANDERATT",
    "DK_PSYKISK_VOLD is separate from SWE_PSYKISKT_VALD",
    "DK_PSYKISK_VOLD is not Swedish bodelning",
    "DK_PSYKISK_VOLD is not Swedish hidden co-ownership",
    "DK_PSYKISK_VOLD is not the bohag/lösöre side-track",
    "DK_PSYKISK_VOLD is not private-case factual review",
    "The closed `SWE_BODELNING_DOLD_SAMAGANDERATT` chain and anonymized PR/legal product review template remain closed and are not superseded",
    "SWE_PSYKISKT_VALD must be a separate source inventory if selected later",
  ]);

  assertIncludesAll(docsText, [
    "SWE_BODELNING_DOLD_SAMAGANDERATT",
    "Swedish hidden co-ownership",
    "Swedish bodelning ownership determination",
    "bohag/lösöre side-track",
    "SWE_PSYKISKT_VALD",
    "private case facts",
    "private screenshots",
    "uploaded private documents",
    "case-specific review material",
    "runtime/schema/semantic-fact/legal-decision work",
    "risk scoring",
    "diagnosis",
    "offence determination",
    "police report generation",
    "process pleading generation",
  ]);
});

test("negative boundaries block advice, application, implementation, and scoring", () => {
  const docsText = readText(inventoryDocsPath);

  assertIncludesAll(docsText, [
    "evaluation of private case facts",
    "diagnosis of psychological violence",
    "determination that psychological violence occurred",
    "determination whether straffeloven § 243 is satisfied",
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
    "doctrine/requisite labels",
    "offence-element modelling",
    "case-law doctrine",
    "importing Swedish psychological violence law into the DK track",
    "importing bodelning or hidden-co-ownership doctrine into the DK track",
    "blending DK_PSYKISK_VOLD with SWE_BODELNING_DOLD_SAMAGANDERATT",
    "blending DK_PSYKISK_VOLD with SWE_PSYKISKT_VALD",
    "private case-specific facts or screenshots",
    "copying private uploaded documents into product docs",
    "governance helper-level freeze continuation",
    "database/API/route behavior",
    "generated artifact behavior",
  ]);
});

test("implementation blocks remain explicit", () => {
  const docsText = readText(inventoryDocsPath);

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

test("existing repo evidence is adjacent context only, not DK implementation", () => {
  const bodelningBoundaryText = readText(bodelningBoundaryDocsPath);
  const reviewTemplateText = readText(reviewTemplateDocsPath);
  const coreFreezeText = readText(coreFreezePath);
  const fullScopeFreezeText = readText(fullScopeFreezePath);
  const dossierSchemaText = readText(dossierSchemaPath);

  assert.match(
    bodelningBoundaryText,
    /# SWE_BODELNING_DOLD_SAMAGANDERATT Boundary Freeze/,
  );
  assert.match(bodelningBoundaryText, /Danish psychological violence track/);

  assert.match(
    reviewTemplateText,
    /# SWE_BODELNING_DOLD_SAMAGANDERATT anonymized PR\/legal product review template/,
  );
  assert.match(reviewTemplateText, /Danish psychological violence track blending/);

  assert.match(coreFreezeText, /# SWE_BODELNING Core\/Backend MVP Freeze/);
  assert.match(fullScopeFreezeText, /# SWE_BODELNING Full Scope Freeze/);
  assertIncludesAll(dossierSchemaText, [
    "SWE_BODELNING Profile Dossier Snapshot",
    "economic_contribution",
    "shared_use",
    "shared_intent",
  ]);

  assert.doesNotMatch(coreFreezeText, /DK_PSYKISK_VOLD_SOURCE_INVENTORY/);
  assert.doesNotMatch(fullScopeFreezeText, /DK_PSYKISK_VOLD_SOURCE_INVENTORY/);
  assert.doesNotMatch(dossierSchemaText, /DK_PSYKISK_VOLD_SOURCE_INVENTORY/);
});

test("proof stays text-only and avoids private case material", () => {
  const docsText = readText(inventoryDocsPath);
  const testText = readText(__filename);
  const combinedText = `${docsText}\n${testText}`;

  assert.match(
    docsText,
    /This document uses source candidates and source-boundary text evidence only/i,
  );
  assert.match(testText, /fs\.readFileSync/);
  assert.doesNotMatch(combinedText, /file:\/\/\//i);
  assert.doesNotMatch(combinedText, /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  assert.doesNotMatch(combinedText, /\b\d{6}[-+]\d{4}\b/);
  assert.doesNotMatch(combinedText, /\b\d{8}[-+]\d{4}\b/);
});
