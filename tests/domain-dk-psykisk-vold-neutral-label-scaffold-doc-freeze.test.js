const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.join(__dirname, "..");
const labelScaffoldDocsPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_DK_PSYKISK_VOLD_NEUTRAL_LABEL_SCAFFOLD_v1.md",
);
const sourceInventoryDocsPath = path.join(
  repoRoot,
  "docs",
  "LEGAL_SOURCE_INVENTORY_DK_PSYKISK_VOLD_v1.md",
);
const sourceInventoryProofPath = path.join(
  repoRoot,
  "tests",
  "legal-source-inventory-dk-psykisk-vold-doc-freeze.test.js",
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

test("DK neutral label scaffold doc exists and freezes organizational-only labels", () => {
  assert.equal(fs.existsSync(labelScaffoldDocsPath), true);

  const docsText = readText(labelScaffoldDocsPath);

  assert.match(
    docsText,
    /# DK_PSYKISK_VOLD neutral source-derived label scaffold/,
  );
  assert.match(docsText, /neutral source-derived label scaffold/i);
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

test("closed source inventory prerequisite and source provenance are explicit", () => {
  const docsText = readText(labelScaffoldDocsPath);

  assertIncludesAll(docsText, [
    "DK_PSYKISK_VOLD` boundary/source inventory is closed at `042a471`",
    "The closed source inventory is the prerequisite for this label scaffold",
    "The verified official source pack supports source-candidate purposes only",
    "This scaffold follows the verified source inventory but does not replace it",
    "Official source currentness remains manual-review gated",
    "Future work must not treat these labels as a substitute for current official source verification",
  ]);

  assertIncludesAll(docsText, [
    "Current official consolidated Danish Criminal Code / straffeloven, including § 243",
    "Lov nr. 329 af 30/03/2019",
    "L 139, 2018/1 preparatory material",
    "Lov nr. 415 af 13/03/2021 as later amendment touching § 243 wording",
    "Rigsadvokatmeddelelsen, section on Psykisk vold",
    "Anklagemyndighedens Vidensbase / guidance material as non-controlling official context",
    "Anklagemyndigheden thematic inspection / opsamling as non-controlling official context",
    "Official case-law bucket not selected now and requiring later manual legal review",
  ]);
});

test("source-priority model remains source-first and non-decisional", () => {
  const docsText = readText(labelScaffoldDocsPath);

  assertIncludesAll(docsText, [
    "Current official consolidated statute first.",
    "Original/amending law and preparatory materials next.",
    "Official prosecutorial guidance next.",
    "Official inspection/guidance materials as non-controlling official context.",
    "Official case-law bucket only as later verified source candidate, not doctrine application now.",
    "does not decide law",
    "does not apply sources to facts",
    "does not select any outcome",
  ]);
});

test("domain separation and implementation blocks are preserved", () => {
  const docsText = readText(labelScaffoldDocsPath);

  assertIncludesAll(docsText, [
    "DK_PSYKISK_VOLD is separate from SWE_BODELNING_DOLD_SAMAGANDERATT",
    "DK_PSYKISK_VOLD is separate from SWE_PSYKISKT_VALD",
    "DK_PSYKISK_VOLD is not Swedish bodelning",
    "DK_PSYKISK_VOLD is not Swedish hidden co-ownership",
    "DK_PSYKISK_VOLD is not bohag/lösöre side-track",
    "DK_PSYKISK_VOLD is not private-case factual review",
    "The closed `SWE_BODELNING_DOLD_SAMAGANDERATT` chain and anonymized PR/legal product review template remain closed and are not superseded",
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

test("label-scaffold preconditions block advice, application, scoring, and implementation", () => {
  const docsText = readText(labelScaffoldDocsPath);

  assertIncludesAll(docsText, [
    "The scaffold does not evaluate private case facts",
    "The scaffold does not diagnose psychological violence",
    "The scaffold does not determine that psychological violence occurred",
    "The scaffold does not determine whether straffeloven § 243 is satisfied",
    "The scaffold does not define executable offence elements",
    "The scaffold does not create legal decision logic",
    "The scaffold does not give legal advice",
    "The scaffold does not generate police reports or pleadings",
    "The scaffold does not predict case outcome",
    "The scaffold does not score risk",
    "The scaffold does not score evidentiary sufficiency",
    "The scaffold does not implement runtime behavior",
    "The scaffold does not change schemas",
    "The scaffold does not adopt semantic-fact mapping",
    "The scaffold does not import Swedish psychological violence law into the DK track",
    "The scaffold does not import bodelning or hidden-co-ownership doctrine into the DK track",
  ]);
});

test("safe neutral labels are listed and remain organizational", () => {
  const docsText = readText(labelScaffoldDocsPath);

  assertIncludesAll(docsText, [
    "DK_PSYKISK_VOLD_LABEL_SCAFFOLD",
    "PSYKISK_VOLD_CONTEXT_LABEL",
    "SOURCE_PROVENANCE_LABEL",
    "TRANSLATION_CAUTION_LABEL",
    "MANUAL_LEGAL_REVIEW_REQUIRED",
    "NO_CASE_APPLICATION",
    "NO_OFFENCE_DETERMINATION",
  ]);

  assertNormalizedIncludesAll(docsText, [
    "These labels are neutral organizational labels only and do not determine law, facts, risk, proof, sufficiency, diagnosis, or outcome.",
  ]);
});

test("source-supported labels are manual-review gated and non-decisional", () => {
  const docsText = readText(labelScaffoldDocsPath);

  assertIncludesAll(docsText, [
    "FORURETTEDE_PERSON_LABEL",
    "GERNINGSPERSON_LABEL",
    "HUSSTAND_OR_NAER_TILKNYTNING_CONTEXT",
    "KRAENKENDE_ADFAERD_LABEL",
    "DURATION_OR_PATTERN_CONTEXT",
    "RELATION_CONTEXT",
    "CONTROL_OR_ISOLATION_CONTEXT",
    "THREAT_OR_DEGRADATION_CONTEXT",
  ]);

  assertNormalizedIncludesAll(docsText, [
    "These labels may be used only for cautious organization and must not be treated as offence elements, legal conclusions, proof, sufficiency findings, risk findings, diagnosis, or offence determination.",
  ]);
});

test("offence-element-adjacent labels are excluded or deferred", () => {
  const docsText = readText(labelScaffoldDocsPath);

  assertIncludesAll(docsText, [
    "EGNET_TIL_UTILBORLIG_STYRING_LABEL",
    "GROV_NEDSAETTENDE_FORHAANDELSE_LABEL",
    "too close to offence-element modelling unless later narrowed and manually reviewed",
    "must not be used in this scaffold to decide whether straffeloven § 243 is satisfied",
    "to model offence elements",
    "to prove any legal condition",
  ]);
});

test("label classification rules preserve source-derived organization only", () => {
  const docsText = readText(labelScaffoldDocsPath);

  assertIncludesAll(docsText, [
    "DK_PSYKISK_VOLD_LABEL_SCAFFOLD` may identify the neutral label-scaffold surface",
    "PSYKISK_VOLD_CONTEXT_LABEL` may identify generic context for Danish psychological violence source organization without case application",
    "SOURCE_PROVENANCE_LABEL` may identify official source provenance without making doctrine findings",
    "TRANSLATION_CAUTION_LABEL` may identify translation risk between Danish, Swedish, and English legal terms",
    "MANUAL_LEGAL_REVIEW_REQUIRED` may identify that human legal review is required before doctrine, application, or later modelling",
    "NO_CASE_APPLICATION` may identify that no private facts are evaluated",
    "NO_OFFENCE_DETERMINATION` may identify that no offence determination is made",
    "FORURETTEDE_PERSON_LABEL` may identify a source-supported role label, but not a finding that any person is legally forurettet in a concrete case",
    "GERNINGSPERSON_LABEL` may identify a source-supported role label, but not a finding that any person is legally gerningsperson in a concrete case",
    "HUSSTAND_OR_NAER_TILKNYTNING_CONTEXT` may identify source-supported relationship/context organization, not legal conclusion",
    "KRAENKENDE_ADFAERD_LABEL` may identify source-supported conduct-context organization, not proof",
    "DURATION_OR_PATTERN_CONTEXT` may identify source-supported duration/pattern context, not sufficiency",
    "RELATION_CONTEXT` may identify relation context, not legal conclusion",
    "CONTROL_OR_ISOLATION_CONTEXT` may identify source-supported control/isolation context, not offence determination",
    "THREAT_OR_DEGRADATION_CONTEXT` may identify source-supported threat/degradation context, not proof or diagnosis",
  ]);
});

test("manual legal-review gates remain explicit", () => {
  const docsText = readText(labelScaffoldDocsPath);

  assertIncludesAll(docsText, [
    "official source currentness at implementation/review time",
    "translation between Danish, Swedish, and English legal terms",
    "any use of labels near statutory or prosecutorial criteria",
    "any attempt to treat labels as offence elements",
    "any attempt to treat labels as legal conclusions",
    "any attempt to treat labels as proof",
    "any attempt to evaluate private facts",
    "any attempt to determine whether straffeloven § 243 is satisfied",
    "any attempt to determine whether psychological violence occurred",
    "any attempt to use labels for diagnosis",
    "any attempt to use labels for risk scoring",
    "any attempt to use labels for sufficiency scoring",
    "any attempt to use labels for police report generation or pleadings",
    "any case-law selection",
    "any import of Swedish psychological violence law",
    "any import of bodelning or hidden-co-ownership doctrine",
    "any use of excluded/deferred labels",
  ]);
});

test("future work relationship and excluded tracks stay bounded", () => {
  const docsText = readText(labelScaffoldDocsPath);

  assertIncludesAll(docsText, [
    "The neutral label scaffold may support later source/dossier organization only",
    "Later doctrine/requisite work requires explicit user approval",
    "Later offence-element modelling requires explicit user approval and manual legal review",
    "Later case-law doctrine requires explicit user approval and manual legal review",
    "Later schema/runtime/semantic-fact work requires explicit user approval",
    "SWE_PSYKISKT_VALD must be a separate source inventory if selected later",
    "does not select or create any later doctrine, schema, runtime, semantic-fact, risk, diagnosis, or decision work",
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
    "offence-element modelling",
    "case-law doctrine",
    "runtime/schema/semantic-fact/legal-decision work",
    "risk scoring",
    "diagnosis",
    "offence determination",
    "police report generation",
    "process pleading generation",
  ]);
});

test("negative boundaries block offence modelling, advice, and implementation", () => {
  const docsText = readText(labelScaffoldDocsPath);

  assertIncludesAll(docsText, [
    "evaluation of private case facts",
    "diagnosis of psychological violence",
    "determination that psychological violence occurred",
    "determination whether straffeloven § 243 is satisfied",
    "executable offence elements",
    "legal advice",
    "legal decision logic",
    "police reports",
    "pleadings",
    "case outcome prediction",
    "risk scoring",
    "evidentiary sufficiency scoring",
    "proof that any offence element is satisfied",
    "proof that any offence element is not satisfied",
    "runtime implementation",
    "schema behavior changes",
    "semantic-fact mapping",
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

test("existing repo evidence is adjacent context only", () => {
  assert.equal(fs.existsSync(sourceInventoryDocsPath), true);
  assert.equal(fs.existsSync(sourceInventoryProofPath), true);

  const sourceInventoryText = readText(sourceInventoryDocsPath);
  const bodelningBoundaryText = readText(bodelningBoundaryDocsPath);
  const reviewTemplateText = readText(reviewTemplateDocsPath);

  assert.match(
    sourceInventoryText,
    /# DK_PSYKISK_VOLD boundary\/source inventory/,
  );
  assert.match(sourceInventoryText, /source inventory only/i);
  assert.match(
    sourceInventoryText,
    /Future implementation must verify current official source text before any doctrine, schema, runtime, or semantic-fact work/i,
  );

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
});

test("proof stays text-only and avoids private case material", () => {
  const docsText = readText(labelScaffoldDocsPath);
  const testText = readText(__filename);
  const combinedText = `${docsText}\n${testText}`;

  assert.match(
    docsText,
    /This document uses source-derived label-scaffold text evidence only/i,
  );
  assert.match(testText, /fs\.readFileSync/);
  assert.doesNotMatch(combinedText, /file:\/\/\//i);
  assert.doesNotMatch(combinedText, /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  assert.doesNotMatch(combinedText, /\b\d{6}[-+]\d{4}\b/);
  assert.doesNotMatch(combinedText, /\b\d{8}[-+]\d{4}\b/);
});
