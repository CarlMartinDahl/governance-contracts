"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const docsRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_CONTRACT_BOUNDARY_v1.md";
const readinessRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_CONTRACT_READINESS_BOUNDARY_v1.md";
const proofTransitionRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const validatorResultProofTransitionRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_VALIDATOR_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const validatorHelperProofTransitionRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const controllingPaths = [
  readinessRelativePath,
  "README.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_WORKSPACE_PUBLIC_SCOPE_ALIGNMENT_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_STATE_MODEL_CONTRACT_v1.md",
  "schemas/human-review-state-model.json",
  "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_VALIDATOR_RESULT_SHAPE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_VALIDATION_ERROR_TAXONOMY_AND_ORDERING_BOUNDARY_v1.md",
  "packages/governance/src/api-contract-schema-validator.js",
  "tests/api-contract-schema-validator.test.js",
];
const candidateSchemaPaths = [
  "schemas/human-review-source-register.json",
  "tests/human-review-source-register-schema.test.js",
];
const validatorResultCandidatePaths = [
  "schemas/human-review-source-register-validator-result.json",
  "tests/human-review-source-register-validator-result-schema.test.js",
];
const historicalValidatorHelperPaths = [
  "packages/schemas/src/human-review-source-register-validator.js",
  "tests/human-review-source-register-validator.test.js",
];
const reservedFuturePaths = [
  ...candidateSchemaPaths,
  ...validatorResultCandidatePaths,
  ...historicalValidatorHelperPaths,
];

function readRequired(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  assert.equal(fs.existsSync(absolutePath), true, `expected ${relativePath}`);
  return fs.readFileSync(absolutePath, "utf8");
}

test("source-register contract boundary and every controlling source exist", () => {
  const docsText = readRequired(docsRelativePath);

  for (const sourcePath of controllingPaths) {
    readRequired(sourcePath);
    assert.equal(docsText.includes(`\`${sourcePath}\``), true, sourcePath);
  }

  assert.match(docsText, /HUMAN_REVIEW_SOURCE_REGISTER_CONTRACT_BOUNDARY/u);
  assert.match(docsText, /APPEND_ONLY_CONTRACT_DEFINITION/u);
  assert.match(docsText, /PACKET_SCOPED_SINGLE_OBJECT_ONLY/u);
});

test("identity cardinality and exact four-field root shape are frozen", () => {
  const docsText = readRequired(docsRelativePath);
  const section = docsText.slice(
    docsText.indexOf("## 4. Exact Top-Level Shape"),
    docsText.indexOf("## 5."),
  );

  assert.match(docsText, /SOURCE_REGISTER_CONTRACT_ID:\nhuman_review\.source_register/u);
  assert.match(docsText, /SOURCE_REGISTER_CONTRACT_VERSION:\n1\.0\.0/u);
  assert.match(
    docsText,
    /SOURCE_REGISTER_CARDINALITY:\nONE_OBJECT_PER_DECLARED_SUPPLIED_PACKET/u,
  );
  assert.equal((section.match(/^\| \d+ \|/gmu) ?? []).length, 4);
  for (const field of ["contract_id", "contract_version", "packet_ref", "sources"]) {
    assert.equal(section.includes(`\`${field}\``), true, field);
  }
  assert.match(section, /REQUIRED_TOP_LEVEL_FIELDS:\nALL_FOUR/u);
  assert.match(section, /OPTIONAL_TOP_LEVEL_FIELDS:\nNONE/u);
  assert.match(section, /ADDITIONAL_TOP_LEVEL_FIELDS:\nNONE/u);
});

test("source entries references and seven source types remain exact", () => {
  const docsText = readRequired(docsRelativePath);
  const entrySection = docsText.slice(
    docsText.indexOf("## 5. Exact Source-Entry Shape and Cardinality"),
    docsText.indexOf("## 6."),
  );
  const typeSection = docsText.slice(
    docsText.indexOf("## 7. Exact Declared Source-Type Vocabulary"),
    docsText.indexOf("## 8."),
  );

  assert.match(entrySection, /SOURCE_ENTRY_MINIMUM_COUNT:\n0/u);
  assert.match(entrySection, /SOURCE_ENTRY_MAXIMUM_COUNT:\nNO_CONTRACT_MAXIMUM/u);
  assert.equal((entrySection.match(/^\| \d+ \|/gmu) ?? []).length, 3);
  for (const field of ["source_ref", "declared_source_type", "declared_label"]) {
    assert.equal(entrySection.includes(`\`${field}\``), true, field);
  }
  assert.equal(
    docsText.includes("`^pkt_[a-z0-9][a-z0-9_-]{0,59}$`"),
    true,
  );
  assert.equal(
    docsText.includes("`^src_[a-z0-9][a-z0-9_-]{0,59}$`"),
    true,
  );
  assert.equal((typeSection.match(/^\| \d+ \|/gmu) ?? []).length, 7);
  for (const sourceType of [
    "message_thread",
    "email",
    "document",
    "image",
    "audio",
    "video",
    "other_declared",
  ]) {
    assert.equal(typeSection.includes(`\`${sourceType}\``), true, sourceType);
  }
});

test("packet scope review-state separation and duplicates stay non-concluding", () => {
  const docsText = readRequired(docsRelativePath);

  assert.match(docsText, /No case identifier belongs to this contract/u);
  assert.match(docsText, /REVIEW_STATE_AT_REGISTER_LEVEL:\nPROHIBITED/u);
  assert.match(docsText, /REVIEW_STATE_AT_SOURCE_ENTRY_LEVEL:\nPROHIBITED/u);
  assert.match(docsText, /INFERRED_REVIEW_STATE_TRANSITION:\nPROHIBITED/u);
  assert.match(docsText, /every later structurally valid occurrence/u);
  assert.match(docsText, /invalid source-reference values do not participate/u);
  assert.match(docsText, /repeated labels or source types with distinct source references are allowed/u);
  assert.match(docsText, /do not establish that\s+two references identify different real-world sources/u);
});

test("fourteen prohibited semantic families add no classifier", () => {
  const docsText = readRequired(docsRelativePath);
  const section = docsText.slice(
    docsText.indexOf("## 10. Prohibited Semantic Field Families"),
    docsText.indexOf("## 11."),
  );

  assert.equal((section.match(/^\| \d+ \|/gmu) ?? []).length, 14);
  assert.match(section, /PROHIBITED_SEMANTIC_FIELD_FAMILY_COUNT:\n14/u);
  assert.match(section, /`RAW_SOURCE_CONTENT`/u);
  assert.match(section, /`CHAIN_OF_CUSTODY_CLAIM`/u);
  assert.match(section, /`FINDING_OR_LEGAL_EVIDENTIARY_CONCLUSION`/u);
  assert.match(
    section,
    /not JSON keys, validator codes, findings, or a semantic classifier/u,
  );
});

test("validator result error shape and exact five codes are frozen", () => {
  const docsText = readRequired(docsRelativePath);
  const resultSection = docsText.slice(
    docsText.indexOf("## 11. Separate Validator-Result Contract"),
    docsText.indexOf("## 12."),
  );
  const codeSection = docsText.slice(
    docsText.indexOf("## 12. Exact Validation Error Codes"),
    docsText.indexOf("## 13."),
  );

  assert.equal((resultSection.match(/^\| \d+ \|/gmu) ?? []).length, 6);
  for (const field of ["valid", "contractKind", "version", "errors", "code", "path"]) {
    assert.equal(resultSection.includes(`\`${field}\``), true, field);
  }
  assert.match(
    resultSection,
    /HUMAN_REVIEW_SOURCE_REGISTER_VALIDATOR_BOUNDARY/u,
  );
  assert.match(resultSection, /VALIDATOR_RESULT_FIELD_COUNT:\n4/u);
  assert.match(resultSection, /VALIDATION_ERROR_ITEM_FIELD_COUNT:\n2/u);
  assert.equal((codeSection.match(/^\| \d+ \|/gmu) ?? []).length, 5);
  for (const code of [
    "required_field_missing",
    "unexpected_field",
    "invalid_field_type",
    "invalid_field_value",
    "duplicate_source_ref",
  ]) {
    assert.equal(codeSection.includes(`\`${code}\``), true, code);
  }
});

test("path grammar seven phases no-echo and immutability are deterministic", () => {
  const docsText = readRequired(docsRelativePath);
  const phaseSection = docsText.slice(
    docsText.indexOf("## 14. Deterministic Validation Phases and Ordering"),
    docsText.indexOf("## 15."),
  );

  for (const pathTemplate of [
    "`$`",
    "`$.contract_id`",
    "`$.contract_version`",
    "`$.packet_ref`",
    "`$.sources`",
    "`$.sources[n]`",
    "`$.sources[n].source_ref`",
    "`$.sources[n].declared_source_type`",
    "`$.sources[n].declared_label`",
  ]) {
    assert.equal(docsText.includes(pathTemplate), true, pathTemplate);
  }
  assert.equal((phaseSection.match(/^\| \d+ \|/gmu) ?? []).length, 7);
  assert.match(phaseSection, /VALIDATION_PHASE_COUNT:\n7/u);
  assert.match(phaseSection, /ROOT_TYPE_GATE/u);
  assert.match(phaseSection, /DUPLICATE_SOURCE_REFERENCES/u);
  assert.match(docsText, /candidate object and all nested arrays and entries remain unmodified/u);
  assert.match(docsText, /rejected keys and values are never returned, logged, retained/u);
  assert.match(docsText, /accessors are not invoked/u);
});

test("historical schema and helper reservations remain documented after bounded transitions", () => {
  const docsText = readRequired(docsRelativePath);
  const proofTransitionText = readRequired(proofTransitionRelativePath);
  const validatorResultProofTransitionText = readRequired(
    validatorResultProofTransitionRelativePath,
  );
  const validatorHelperProofTransitionText = readRequired(
    validatorHelperProofTransitionRelativePath,
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
  for (const helperPath of historicalValidatorHelperPaths) {
    assert.equal(
      validatorHelperProofTransitionText.includes(`\`${helperPath}\``),
      true,
      helperPath,
    );
  }
  for (const candidatePath of validatorResultCandidatePaths) {
    assert.equal(
      validatorResultProofTransitionText.includes(`\`${candidatePath}\``),
      true,
      candidatePath,
    );
  }

  assert.match(
    proofTransitionText,
    /CANDIDATE_SCHEMA_PATH_TRANSITION_COUNT:\n2/u,
  );
  assert.match(
    proofTransitionText,
    /RETAINED_LATER_SIBLING_ABSENCE_COUNT:\n4/u,
  );
  assert.match(
    proofTransitionText,
    /HISTORICAL_SCHEMA_ABSENCE_MARKERS_PRESERVED/u,
  );
  assert.match(
    proofTransitionText,
    /SCHEMA_FILE_NOT_CREATED_BY_THIS_SLICE/u,
  );
  assert.match(
    proofTransitionText,
    /TRACKED_DOCS_ONLY_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
  assert.match(
    validatorResultProofTransitionText,
    /VALIDATOR_RESULT_SCHEMA_PATH_TRANSITION_COUNT:\n2/u,
  );
  assert.match(
    validatorResultProofTransitionText,
    /RETAINED_VALIDATOR_HELPER_ABSENCE_COUNT:\n2/u,
  );
  assert.match(
    validatorResultProofTransitionText,
    /TRACKED_CONTRACT_ONLY_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
  assert.match(
    validatorHelperProofTransitionText,
    /VALIDATOR_HELPER_PATH_LIVE_ABSENCE_TRANSITION_COUNT:\n2/u,
  );
  assert.match(
    validatorHelperProofTransitionText,
    /HISTORICAL_VALIDATOR_HELPER_ABSENCE_MARKERS_PRESERVED/u,
  );
  assert.match(
    validatorHelperProofTransitionText,
    /TRACKED_DOCS_ONLY_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );

  for (const marker of [
    "SCHEMA_NOT_CREATED",
    "VALIDATOR_RESULT_SCHEMA_NOT_CREATED",
    "VALIDATOR_NOT_CREATED",
    "PACKAGE_EXPORT_NOT_CREATED",
    "PERSISTENCE_NOT_CREATED",
    "API_NOT_CREATED",
    "UI_NOT_CREATED",
    "NO_RUNTIME_BEHAVIOR_CREATED",
    "REAL_PRIVATE_SOURCE_MATERIAL_USE_NOT_AUTHORIZED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
  ]) {
    assert.equal(docsText.includes(marker), true, marker);
  }

  assert.match(
    docsText,
    /HUMAN_REVIEW_SOURCE_REGISTER_CONTRACT_BOUNDARY_STATUS:\nTRACKED_DOCS_ONLY_SOURCE_REGISTER_CONTRACT_DEFINED/u,
  );
  assert.match(docsText, /not actual human review, professional review, legal/u);
});
