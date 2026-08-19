"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const docsRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_CONTRACT_BOUNDARY_v1.md";
const readinessRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_CONTRACT_READINESS_BOUNDARY_v1.md";
const proofTransitionRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const packageExportProofTransitionRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_CONTRACT_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const validatorResultProofTransitionRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_VALIDATOR_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const validatorHelperProofTransitionRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const crossReferenceProofTransitionRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_SOURCE_REGISTER_CROSS_REFERENCE_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const controllingPaths = [
  readinessRelativePath,
  "README.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_WORKSPACE_PUBLIC_SCOPE_ALIGNMENT_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_STATE_MODEL_CONTRACT_v1.md",
  "schemas/human-review-state-model.json",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_CONTRACT_BOUNDARY_v1.md",
  "schemas/human-review-source-register.json",
  "schemas/human-review-source-register-validator-result.json",
  "packages/schemas/src/human-review-source-register-validator.js",
  "packages/governance/src/human-review-source-register-pre-downstream-validation-boundary.js",
];
const candidateSchemaPaths = [
  "schemas/human-review-chronology.json",
  "tests/human-review-chronology-schema.test.js",
];
const validatorResultSchemaCandidatePaths = [
  "schemas/human-review-chronology-validator-result.json",
  "tests/human-review-chronology-validator-result-schema.test.js",
];
const historicalValidatorHelperPaths = [
  "packages/schemas/src/human-review-chronology-validator.js",
  "tests/human-review-chronology-validator.test.js",
];
const historicalCrossReferencePaths = [
  "packages/governance/src/human-review-chronology-source-register-validation-boundary.js",
  "tests/human-review-chronology-source-register-validation-boundary.test.js",
];
const reservedFuturePaths = [
  ...candidateSchemaPaths,
  ...validatorResultSchemaCandidatePaths,
  ...historicalValidatorHelperPaths,
  ...historicalCrossReferencePaths,
];
const reviewStates = [
  "ASSERTED",
  "APPEARS_IN_SUPPLIED_MATERIAL",
  "NOT_ESTABLISHED",
  "HUMAN_REVIEW_REQUIRED",
];
const temporalStatuses = ["DECLARED", "UNKNOWN"];

function absolutePath(relativePath) {
  return path.join(repoRoot, relativePath);
}

function readRequired(relativePath) {
  const candidatePath = absolutePath(relativePath);
  assert.equal(fs.existsSync(candidatePath), true, `expected ${relativePath}`);
  return fs.readFileSync(candidatePath, "utf8");
}

test("chronology contract boundary and every controlling source exist", () => {
  const docsText = readRequired(docsRelativePath);

  for (const sourcePath of controllingPaths) {
    readRequired(sourcePath);
    assert.equal(docsText.includes(`\`${sourcePath}\``), true, sourcePath);
  }

  assert.match(docsText, /HUMAN_REVIEW_CHRONOLOGY_CONTRACT_BOUNDARY/u);
  assert.match(docsText, /APPEND_ONLY_CONTRACT_DEFINITION/u);
  assert.match(docsText, /PACKET_SCOPED_SINGLE_OBJECT_ONLY/u);
  assert.match(docsText, /NEUTRAL_CORRECTABLE_REVIEW_SNAPSHOT_ONLY/u);
});

test("identity cardinality and exact four-field root shape are frozen", () => {
  const docsText = readRequired(docsRelativePath);
  const section = docsText.slice(
    docsText.indexOf("## 4. Exact Top-Level Shape"),
    docsText.indexOf("## 5."),
  );

  assert.match(
    docsText,
    /REVIEW_CHRONOLOGY_CONTRACT_ID:\nhuman_review\.review_chronology/u,
  );
  assert.match(docsText, /REVIEW_CHRONOLOGY_CONTRACT_VERSION:\n1\.0\.0/u);
  assert.match(
    docsText,
    /REVIEW_CHRONOLOGY_CARDINALITY:\nONE_OBJECT_PER_DECLARED_SUPPLIED_PACKET/u,
  );
  assert.equal((section.match(/^\| \d+ \|/gmu) ?? []).length, 4);
  for (const field of [
    "contract_id",
    "contract_version",
    "packet_ref",
    "entries",
  ]) {
    assert.equal(section.includes(`\`${field}\``), true, field);
  }
  assert.match(section, /REQUIRED_TOP_LEVEL_FIELDS:\nALL_FOUR/u);
  assert.match(section, /OPTIONAL_TOP_LEVEL_FIELDS:\nNONE/u);
  assert.match(section, /ADDITIONAL_TOP_LEVEL_FIELDS:\nNONE/u);
});

test("chronology entries have the selected exact six-field shape", () => {
  const docsText = readRequired(docsRelativePath);
  const section = docsText.slice(
    docsText.indexOf("## 5. Exact Chronology-Entry Shape And Cardinality"),
    docsText.indexOf("## 6."),
  );

  assert.match(section, /CHRONOLOGY_ENTRY_MINIMUM_COUNT:\n0/u);
  assert.match(section, /CHRONOLOGY_ENTRY_MAXIMUM_COUNT:\nNO_CONTRACT_MAXIMUM/u);
  assert.match(section, /EMPTY_REVIEW_CHRONOLOGY:\nALLOWED/u);
  assert.equal((section.match(/^\| \d+ \|/gmu) ?? []).length, 6);
  for (const field of [
    "entry_ref",
    "review_state",
    "temporal_status",
    "declared_temporal_text",
    "review_text",
    "source_refs",
  ]) {
    assert.equal(section.includes(`\`${field}\``), true, field);
  }
  assert.match(section, /REQUIRED_CHRONOLOGY_ENTRY_FIELDS:\nALL_SIX/u);
  assert.match(section, /OPTIONAL_CHRONOLOGY_ENTRY_FIELDS:\nNONE/u);
  assert.match(section, /ADDITIONAL_CHRONOLOGY_ENTRY_FIELDS:\nNONE/u);
});

test("opaque references and Source Register relationship remain non-resolving", () => {
  const docsText = readRequired(docsRelativePath);

  for (const pattern of [
    "`^pkt_[a-z0-9][a-z0-9_-]{0,59}$`",
    "`^src_[a-z0-9][a-z0-9_-]{0,59}$`",
    "`^chr_[a-z0-9][a-z0-9_-]{0,59}$`",
  ]) {
    assert.equal(docsText.includes(pattern), true, pattern);
  }
  assert.match(
    docsText,
    /OPAQUE_REFERENCE_RESOLUTION_BY_STRUCTURAL_VALIDATOR:\nPROHIBITED/u,
  );
  assert.match(docsText, /SOURCE_REFS_MINIMUM_COUNT_PER_ENTRY:\n1/u);
  assert.match(docsText, /SOURCE_REFS_UNIQUE_WITHIN_ENTRY:\nREQUIRED/u);
  assert.match(docsText, /SOURCE_REF_REUSE_ACROSS_ENTRIES:\nALLOWED/u);
  assert.match(docsText, /separately\s+authorized `packages\/governance` cross-reference checkpoint/u);
});

test("review state temporal coupling and text posture remain exact", () => {
  const docsText = readRequired(docsRelativePath);
  const stateSection = docsText.slice(
    docsText.indexOf("## 7. Exact Review-State Vocabulary And Separation"),
    docsText.indexOf("## 8."),
  );
  const temporalSection = docsText.slice(
    docsText.indexOf("## 8. Temporal Status And Review Text"),
    docsText.indexOf("## 9."),
  );

  assert.equal((stateSection.match(/^\| \d+ \|/gmu) ?? []).length, 4);
  for (const reviewState of reviewStates) {
    assert.equal(stateSection.includes(`\`${reviewState}\``), true, reviewState);
  }
  assert.match(stateSection, /AUTOMATIC_REVIEW_STATE_TRANSITION:\nPROHIBITED/u);
  assert.equal((temporalSection.match(/^\| \d+ \|/gmu) ?? []).length, 2);
  for (const temporalStatus of temporalStatuses) {
    assert.equal(
      temporalSection.includes(`\`${temporalStatus}\``),
      true,
      temporalStatus,
    );
  }
  assert.match(temporalSection, /`DECLARED` \| one trimmed, non-empty string/u);
  assert.match(temporalSection, /`UNKNOWN` \| exact `null`/u);
  assert.match(temporalSection, /not parsed as a date, time, duration, range/u);
  assert.match(temporalSection, /proposed neutral review description/u);
});

test("ordering duplicates conflicts and corrections stay human controlled", () => {
  const docsText = readRequired(docsRelativePath);

  assert.match(docsText, /input entry order is preserved as canonical review order/u);
  assert.match(docsText, /produces `duplicate_entry_ref`/u);
  assert.match(docsText, /produces `duplicate_source_ref`/u);
  assert.match(docsText, /not\s+merged, ranked, reconciled, collapsed, discarded/u);
  assert.match(docsText, /`DECLARED_PACKET_REVIEW_GAPS` output family/u);
  assert.match(
    docsText,
    /HUMAN_CORRECTION_MODEL:\nCOMPLETE_REPLACEMENT_CANDIDATE_BEFORE_CONTROLLED_HANDOFF/u,
  );
  assert.match(docsText, /REVISION_HISTORY_IN_V1_CONTRACT:\nABSENT/u);
  assert.match(docsText, /APPROVAL_OR_EXPORT_STATE_IN_V1_CONTRACT:\nABSENT/u);
});

test("fourteen prohibited semantic families add no classifier", () => {
  const docsText = readRequired(docsRelativePath);
  const section = docsText.slice(
    docsText.indexOf("## 12. Prohibited Semantic Field Families"),
    docsText.indexOf("## 13."),
  );

  assert.equal((section.match(/^\| \d+ \|/gmu) ?? []).length, 14);
  assert.match(section, /PROHIBITED_SEMANTIC_FIELD_FAMILY_COUNT:\n14/u);
  assert.match(section, /`RAW_SOURCE_REPLAY_OR_PRIVATE_CONTENT`/u);
  assert.match(section, /`AUTHENTICITY_OR_SOURCE_TRUTH_CLAIM`/u);
  assert.match(section, /`GUILT_LEGAL_MERIT_OR_EVIDENTIARY_CONCLUSION`/u);
  assert.match(section, /`SCORE_CONFIDENCE_STRENGTH_OR_RANKING`/u);
  assert.match(
    section,
    /not JSON keys, validator codes, findings, or a semantic classifier/u,
  );
});

test("validator result error shape and exact six codes are frozen", () => {
  const docsText = readRequired(docsRelativePath);
  const resultSection = docsText.slice(
    docsText.indexOf("## 13. Separate Validator-Result Contract"),
    docsText.indexOf("## 14."),
  );
  const codeSection = docsText.slice(
    docsText.indexOf("## 14. Exact Validation Error Codes"),
    docsText.indexOf("## 15."),
  );

  assert.equal((resultSection.match(/^\| \d+ \|/gmu) ?? []).length, 6);
  for (const field of ["valid", "contractKind", "version", "errors", "code", "path"]) {
    assert.equal(resultSection.includes(`\`${field}\``), true, field);
  }
  assert.match(resultSection, /HUMAN_REVIEW_CHRONOLOGY_VALIDATOR_BOUNDARY/u);
  assert.match(resultSection, /VALIDATOR_RESULT_FIELD_COUNT:\n4/u);
  assert.match(resultSection, /VALIDATION_ERROR_ITEM_FIELD_COUNT:\n2/u);
  assert.equal((codeSection.match(/^\| \d+ \|/gmu) ?? []).length, 6);
  for (const code of [
    "required_field_missing",
    "unexpected_field",
    "invalid_field_type",
    "invalid_field_value",
    "duplicate_entry_ref",
    "duplicate_source_ref",
  ]) {
    assert.equal(codeSection.includes(`\`${code}\``), true, code);
  }
});

test("path grammar eight phases no-echo and immutability are deterministic", () => {
  const docsText = readRequired(docsRelativePath);
  const phaseSection = docsText.slice(
    docsText.indexOf("## 16. Deterministic Validation Phases And Ordering"),
    docsText.indexOf("## 17."),
  );

  for (const pathTemplate of [
    "`$`",
    "`$.contract_id`",
    "`$.contract_version`",
    "`$.packet_ref`",
    "`$.entries`",
    "`$.entries[n]`",
    "`$.entries[n].entry_ref`",
    "`$.entries[n].review_state`",
    "`$.entries[n].temporal_status`",
    "`$.entries[n].declared_temporal_text`",
    "`$.entries[n].review_text`",
    "`$.entries[n].source_refs`",
    "`$.entries[n].source_refs[m]`",
  ]) {
    assert.equal(docsText.includes(pathTemplate), true, pathTemplate);
  }
  assert.equal((phaseSection.match(/^\| \d+ \|/gmu) ?? []).length, 8);
  assert.match(phaseSection, /VALIDATION_PHASE_COUNT:\n8/u);
  assert.match(phaseSection, /ROOT_TYPE_GATE/u);
  assert.match(phaseSection, /DUPLICATE_ENTRY_REFERENCES/u);
  assert.match(phaseSection, /DUPLICATE_SOURCE_REFERENCES/u);
  assert.match(docsText, /candidate object and all nested arrays and entries remain unmodified/u);
  assert.match(docsText, /rejected keys and values are never returned, logged, retained/u);
  assert.match(docsText, /validator results and their `errors` arrays are deeply frozen/u);
  assert.match(docsText, /accessors are not invoked/u);
});

test("historical schema helper and cross-reference reservations remain documented", () => {
  const docsText = readRequired(docsRelativePath);
  const proofTransitionText = readRequired(proofTransitionRelativePath);
  const packageExportProofTransitionText = readRequired(
    packageExportProofTransitionRelativePath,
  );
  const validatorResultProofTransitionText = readRequired(
    validatorResultProofTransitionRelativePath,
  );
  const validatorHelperProofTransitionText = readRequired(
    validatorHelperProofTransitionRelativePath,
  );
  const crossReferenceProofTransitionText = readRequired(
    crossReferenceProofTransitionRelativePath,
  );

  for (const futurePath of reservedFuturePaths) {
    assert.equal(docsText.includes(`\`${futurePath}\``), true, futurePath);
    assert.equal(proofTransitionText.includes(`\`${futurePath}\``), true, futurePath);
  }
  for (const candidatePath of candidateSchemaPaths) {
    assert.match(
      proofTransitionText,
      new RegExp(candidatePath.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&")),
    );
  }
  for (const candidatePath of validatorResultSchemaCandidatePaths) {
    assert.equal(
      validatorResultProofTransitionText.includes(`\`${candidatePath}\``),
      true,
      candidatePath,
    );
  }
  for (const historicalPath of historicalCrossReferencePaths) {
    assert.equal(
      crossReferenceProofTransitionText.includes(`\`${historicalPath}\``),
      true,
      historicalPath,
    );
  }
  for (const helperPath of historicalValidatorHelperPaths) {
    assert.equal(
      validatorHelperProofTransitionText.includes(`\`${helperPath}\``),
      true,
      helperPath,
    );
  }

  assert.match(proofTransitionText, /CANDIDATE_SCHEMA_PATH_TRANSITION_COUNT:\n2/u);
  assert.match(proofTransitionText, /RETAINED_LATER_SIBLING_ABSENCE_COUNT:\n6/u);
  assert.match(proofTransitionText, /HISTORICAL_SCHEMA_ABSENCE_MARKERS_PRESERVED/u);
  assert.match(proofTransitionText, /SCHEMA_FILE_NOT_CREATED_BY_THIS_SLICE/u);
  assert.match(
    proofTransitionText,
    /TRACKED_DOCS_ONLY_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
  assert.match(
    packageExportProofTransitionText,
    /CONTRACT_PROOF_PACKAGE_EXPORT_TRANSITION_COUNT:\n1/u,
  );
  assert.match(
    packageExportProofTransitionText,
    /RETAINED_LATER_SIBLING_ABSENCE_COUNT:\n6/u,
  );
  assert.match(
    packageExportProofTransitionText,
    /TRACKED_DOCS_ONLY_CONTRACT_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_DEFINED/u,
  );
  assert.match(
    validatorResultProofTransitionText,
    /VALIDATOR_RESULT_SCHEMA_PATH_TRANSITION_COUNT:\n2/u,
  );
  assert.match(
    validatorResultProofTransitionText,
    /RETAINED_VALIDATOR_AND_CROSS_REFERENCE_ABSENCE_COUNT:\n4/u,
  );
  assert.match(
    validatorResultProofTransitionText,
    /TRACKED_CONTRACT_ONLY_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
  assert.match(
    validatorHelperProofTransitionText,
    /VALIDATOR_HELPER_PATH_LIVE_ABSENCE_TRANSITION_COUNT:\n7/u,
  );
  assert.match(
    validatorHelperProofTransitionText,
    /TRACKED_DOCS_ONLY_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
  assert.match(
    crossReferenceProofTransitionText,
    /CROSS_REFERENCE_RUNTIME_PATH_LIVE_ABSENCE_TRANSITION_COUNT:\n12/u,
  );
  assert.match(
    crossReferenceProofTransitionText,
    /TRACKED_DOCS_ONLY_CROSS_REFERENCE_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
  assert.match(docsText, /No future path is created or implementation-authorized/u);
  assert.match(docsText, /this slice changes only this document and its focused proof test/u);
});

test("contract status remains docs-only and no-conclusion", () => {
  const docsText = readRequired(docsRelativePath);

  for (const marker of [
    "CHRONOLOGY_SCHEMA_NOT_CREATED",
    "CHRONOLOGY_VALIDATOR_RESULT_SCHEMA_NOT_CREATED",
    "CHRONOLOGY_VALIDATOR_NOT_CREATED",
    "CHRONOLOGY_PACKAGE_EXPORT_NOT_CREATED",
    "CHRONOLOGY_RUNTIME_NOT_CREATED",
    "CHRONOLOGY_DERIVATION_NOT_CREATED",
    "SOURCE_REGISTER_CROSS_REFERENCE_CHECKPOINT_NOT_CREATED",
    "REAL_PRIVATE_SOURCE_MATERIAL_USE_NOT_AUTHORIZED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
  ]) {
    assert.equal(docsText.includes(marker), true, marker);
  }
  assert.match(docsText, /not actual human review, professional review, legal/u);
  assert.match(
    docsText,
    /TRACKED_DOCS_ONLY_REVIEW_CHRONOLOGY_CONTRACT_DEFINED/u,
  );
});
