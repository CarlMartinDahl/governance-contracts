const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.join(__dirname, "..");
const docsPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_SWE_PSYKISKT_VALD_EVIDENCE_READINESS_REVIEW_SIGNAL_BOUNDARY_v1.md",
);
const sweSourceInventoryV1Path = path.join(
  repoRoot,
  "docs",
  "LEGAL_SOURCE_INVENTORY_SWE_PSYKISKT_VALD_v1.md",
);
const sweSourceInventoryV2Path = path.join(
  repoRoot,
  "docs",
  "LEGAL_SOURCE_INVENTORY_SWE_PSYKISKT_VALD_v2.md",
);
const sweLabelScaffoldPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_SWE_PSYKISKT_VALD_NEUTRAL_LABEL_SCAFFOLD_v1.md",
);
const dkReviewSignalPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_DK_PSYKISK_VOLD_EVIDENCE_READINESS_REVIEW_SIGNAL_BOUNDARY_v1.md",
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

test("SWE review-signal boundary doc exists and freezes DOCS_ONLY status", () => {
  assert.equal(fs.existsSync(docsPath), true);

  const docsText = readText(docsPath);

  assert.match(
    docsText,
    /# SWE_PSYKISKT_VALD evidence-readiness review-signal boundary/,
  );
  assert.match(docsText, /Status:\s+DOCS_ONLY\./);
  assert.match(docsText, /Mode:\s+checklist-only product-boundary freeze\./);
  assert.match(
    docsText,
    /Freeze safe source-backed review-signal and evidence-readiness recommendation boundaries for `SWE_PSYKISKT_VALD`/i,
  );
  assert.match(docsText, /not legal advice/i);
  assert.match(docsText, /not offence determination/i);
  assert.match(docsText, /not diagnosis/i);
  assert.match(docsText, /not risk scoring/i);
  assert.match(docsText, /not sufficiency scoring/i);
});

test("relationship to closed SWE layers and post-enactment source foundation are explicit", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "docs/LEGAL_SOURCE_INVENTORY_SWE_PSYKISKT_VALD_v1.md",
    "docs/LEGAL_SOURCE_INVENTORY_SWE_PSYKISKT_VALD_v2.md",
    "docs/DOMAIN_CONTRACTS_SWE_PSYKISKT_VALD_NEUTRAL_LABEL_SCAFFOLD_v1.md",
    "SFS 2026:852` enacted `4 kap. 7 b § brottsbalken`",
    "entry into force on `2026-07-01`",
    "Prop. 2025/26:138",
    "Bet. 2025/26:JuU39",
    "Rskr. 2025/26:257",
    "Rättslig vägledning 2026:7",
    "Economic violence (*ekonomiskt våld*) was not enacted as a separate statutory element in `4 kap. 7 b § brottsbalken`",
    "case law remain nascent",
    "does not create offence-element modelling",
  ]);
});

test("DK separation, safe SWE surfaces, and five SWE recommendation levels are explicit", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "DK_PSYKISK_VOLD` remains a separate closed jurisdiction track",
    "No DK-to-SWE label, doctrine, or guidance import is allowed",
    "No SWE-to-DK label, doctrine, or guidance export is allowed",
    "Nordic comparison remains a separate future scope",
    "SWE_SOURCE_PROVENANCE_ASSISTANT",
    "SWE_NEUTRAL_CONTEXT_REVIEW_SIGNAL_ASSISTANT",
    "SWE_REVIEW_SIGNAL_WORKING_LEDGER_GENERATOR",
    "SWE_COUNTER_CONTEXT_AND_GAP_DISCLOSURE_ASSISTANT",
    "SWE_HUMAN_SUPPORT_OR_LEGAL_REVIEW_ROUTING_ASSISTANT",
    "SWE_TRANSLATION_CAUTION_ASSISTANT",
    "SWE_LEVEL_0_NO_REVIEW_SIGNAL_FOUND",
    "SWE_LEVEL_1_WEAK_OR_AMBIGUOUS_REVIEW_SIGNAL",
    "SWE_LEVEL_2_REVIEWABLE_SOURCE_SIGNAL_FOUND",
    "SWE_LEVEL_3_STRONG_REVIEWABLE_SOURCE_PATTERN_FOUND",
    "SWE_LEVEL_4_READY_FOR_HUMAN_SUPPORT_OR_LEGAL_REVIEW",
    "This is not a conclusion that SWE_PSYKISKT_VALD occurred or that 4 kap. 7 b § brottsbalken is satisfied.",
  ]);
});

test("safe SWE output families and forbidden-output taxonomy block overclaims", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "SWE_REVIEWABLE_SOURCE_SIGNAL_FOUND",
    "SWE_HUMAN_SUPPORT_OR_LEGAL_REVIEW_NEEDED",
    "SWE_SOURCE_BACKED_REVIEW_LEDGER_RECOMMENDED",
    "SWE_SOURCE_ORIGINAL_PROVENANCE_VERIFICATION_NEEDED",
    "SWE_COUNTER_CONTEXT_AND_SELECTION_GAP_CHECK_NEEDED",
    "SWE_NO_OFFENCE_DETERMINATION_MADE",
    "SWE_NO_DIAGNOSIS_MADE",
    "SWE_NO_RISK_OR_SUFFICIENCY_SCORE_MADE",
    "SWE_NO_PRIVATE_CASE_APPLICATION_MADE",
    "SWE_PSYKISKT_VALD_PROVEN` is prohibited",
    "BROTTSBALKEN_4_7B_SATISFIED` is prohibited",
    "EKONOMISKT_VALD_AS_4_7B_OFFENCE` is prohibited",
    "ONE_SIDED_SELECTION_AS_COMPLETE_TRUTH` is prohibited",
    "OFFENCE_DETERMINATION` is prohibited",
    "LEGAL_ADVICE` is prohibited",
    "DIAGNOSIS` is prohibited",
    "RISK_SCORE` is prohibited",
    "SUFFICIENCY_SCORE` is prohibited",
    "CREDIBILITY_FINDING` is prohibited",
    "PRIVATE_CASE_CONCLUSION` is prohibited",
    "POLICE_REPORT_DRAFTING` is prohibited",
    "PLEADING_GENERATION` is prohibited",
    "DK_SWE_LABEL_IMPORT` is prohibited",
    "NORDIC_COMPARISON` is prohibited",
    "BODELNING_BLENDING` is prohibited",
    "CLUSTER_B_DARVO_GASLIGHTING_AS_DIAGNOSIS_OR_DETERMINATIVE_LABEL` is prohibited",
  ]);
});

test("manual-review gates, counter-context/misuse caution, and negative boundaries remain intact", () => {
  const docsText = readText(docsPath);

  assertIncludesAll(docsText, [
    "SWE_LEGAL_SIGNIFICANCE_REVIEW",
    "SWE_NORMATIVE_THRESHOLD_HUMAN_ONLY_REVIEW",
    "SWE_SOURCE_COMPLETENESS_REVIEW",
    "SWE_COUNTER_CONTEXT_AND_SELECTION_BIAS_REVIEW",
    "SWE_CUSTODY_OR_HIGH_CONFLICT_MISUSE_CAUTION_REVIEW",
    "SWE_RAW_SOURCE_VS_DERIVATIVE_REVIEW",
    "SWE_OFFICIAL_SOURCE_CURRENTNESS_REVIEW",
    "SWE_GUIDANCE_CURRENTNESS_REVIEW",
    "SWE_NASCENT_CASE_LAW_REVIEW",
    "SWE_EKONOMISKT_VALD_BOUNDARY_REVIEW",
    "SWE_TRANSLATION_CAUTION_REVIEW",
    "SWE_CONTEXT_LABEL_NOT_OFFENCE_ELEMENT_REVIEW",
    "SWE_REVIEW_SIGNAL_NOT_PROOF",
    "SWE_REVIEW_SIGNAL_NOT_DIAGNOSIS",
    "SWE_REVIEW_SIGNAL_NOT_RISK_SCORE",
    "SWE_REVIEW_SIGNAL_NOT_SUFFICIENCY_SCORE",
    "SWE_REVIEW_SIGNAL_NOT_PRIVATE_CASE_APPLICATION",
    "SWE_CASE_LAW_DOCTRINE_NOT_INCLUDED",
    "DK_SWE_IMPORT_EXPORT_BLOCK",
    "PSYCHOLOGICAL_DIAGNOSIS_CONTAMINATION_BLOCK",
    "BODELNING_TRACK_SEPARATION_BLOCK",
    "not real-private-run authorization",
    "not product-candidate selection",
    "not external-use authorization",
    "remains outside this public repository and must independently satisfy data-handling, encryption, retention/deletion, no-third-party-cloud-leakage, and human legal-review obligations",
  ]);
});

test("prerequisite and adjacent files exist and proof is text-evidence only", () => {
  assert.equal(fs.existsSync(sweSourceInventoryV1Path), true);
  assert.equal(fs.existsSync(sweSourceInventoryV2Path), true);
  assert.equal(fs.existsSync(sweLabelScaffoldPath), true);
  assert.equal(fs.existsSync(dkReviewSignalPath), true);

  const testText = readText(__filename);
  assert.match(testText, /readFileSync/);
  assert.match(testText, /existsSync/);
  assert.doesNotMatch(testText, /require\(".*packages\//);
  assert.doesNotMatch(testText, /require\(".*schemas\//);
});
