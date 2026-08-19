"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const docsRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_SOURCE_REGISTER_CROSS_REFERENCE_SEMANTICS_BOUNDARY_v1.md";
const resultSchemaRelativePath =
  "schemas/human-review-chronology-source-register-cross-reference-result.json";
const resultSchemaProofTransitionRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_SOURCE_REGISTER_CROSS_REFERENCE_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const packageExportProofTransitionRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_SOURCE_REGISTER_CROSS_REFERENCE_RESULT_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const runtimeRelativePath =
  "packages/governance/src/human-review-chronology-source-register-validation-boundary.js";
const runtimeProofRelativePath =
  "tests/human-review-chronology-source-register-validation-boundary.test.js";
const crossReferenceProofTransitionRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_SOURCE_REGISTER_CROSS_REFERENCE_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const controllingPaths = [
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_SOURCE_REGISTER_CROSS_REFERENCE_READINESS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_CONTRACT_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_CONTRACT_BOUNDARY_v1.md",
  "schemas/human-review-chronology.json",
  "schemas/human-review-chronology-validator-result.json",
  "schemas/human-review-source-register.json",
  "schemas/human-review-source-register-validator-result.json",
  "packages/schemas/src/human-review-chronology-validator.js",
  "packages/schemas/src/human-review-source-register-validator.js",
  "packages/schemas/src/index.js",
  "packages/governance/src/human-review-source-register-pre-downstream-validation-boundary.js",
  "tests/human-review-chronology-validator.test.js",
  "tests/human-review-source-register-validator.test.js",
  "tests/human-review-source-register-pre-downstream-validation-boundary.test.js",
];
const runtimeAbsenceOwnerPaths = [
  "tests/domain-human-review-chronology-contract-boundary-doc-freeze.test.js",
  "tests/domain-human-review-chronology-validator-result-schema-readiness-boundary-doc-freeze.test.js",
  "tests/domain-human-review-chronology-validator-helper-proof-transition-prerequisite-boundary-doc-freeze.test.js",
  "tests/human-review-chronology-schema.test.js",
  "tests/domain-human-review-chronology-source-register-cross-reference-readiness-boundary-doc-freeze.test.js",
  "tests/domain-human-review-chronology-source-register-cross-reference-semantics-boundary-doc-freeze.test.js",
];

function absolutePath(relativePath) {
  return path.join(repoRoot, relativePath);
}

function readRequired(relativePath) {
  const targetPath = absolutePath(relativePath);
  assert.equal(fs.existsSync(targetPath), true, `expected ${relativePath}`);
  return fs.readFileSync(targetPath, "utf8");
}

test("cross-reference semantics boundary and every controlling source exist", () => {
  const docsText = readRequired(docsRelativePath);

  for (const sourcePath of controllingPaths) {
    readRequired(sourcePath);
    assert.equal(docsText.includes(`\`${sourcePath}\``), true, sourcePath);
  }

  assert.match(
    docsText,
    /HUMAN_REVIEW_CHRONOLOGY_SOURCE_REGISTER_CROSS_REFERENCE_SEMANTICS_BOUNDARY/u,
  );
  assert.match(docsText, /OWNER_SELECTED_STAGED_SEMANTICS_TRANSLATED/u);
  assert.match(docsText, /EXACT_TWELVE_SCOPE_DECISIONS_RESOLVED/u);
});

test("all twelve Owner-selected scope decisions are frozen", () => {
  const docsText = readRequired(docsRelativePath);
  const section = docsText.slice(
    docsText.indexOf("## 3. Twelve Resolved Scope Decisions"),
    docsText.indexOf("## 4."),
  );

  assert.equal((section.match(/^\| \d+ \|/gmu) ?? []).length, 12);
  assert.match(docsText, /RESOLVED_CROSS_REFERENCE_SCOPE_DECISION_COUNT:\n12/u);
  assert.match(docsText, /OPEN_CROSS_REFERENCE_SCOPE_DECISION_COUNT:\n0/u);
  assert.match(
    docsText,
    /RELEASE_BOUNDARY_DECISION:\nPRESERVED_AS_SEPARATE_HUMAN_PROFESSIONAL_GATE/u,
  );
});

test("unary envelope direct module and child-validator boundaries are exact", () => {
  const docsText = readRequired(docsRelativePath);
  const packageSchemas = require("../packages/schemas/src/index.js");
  const chronologyValidator = require("../packages/schemas/src/human-review-chronology-validator.js");
  const sourceRegisterValidator = require("../packages/schemas/src/human-review-source-register-validator.js");

  assert.match(
    docsText,
    /FUTURE_FUNCTION_NAME:\nvalidateHumanReviewChronologySourceRegisterCrossReference/u,
  );
  assert.match(docsText, /FUTURE_FUNCTION_ARITY:\n1/u);
  assert.match(docsText, /FUTURE_MODULE_EXPORT_COUNT:\n1/u);
  assert.match(docsText, /DIRECT_INTERNAL_MODULE_EXPORT_ONLY/u);
  assert.match(docsText, /INPUT_ENVELOPE_FIELD_COUNT:\n2/u);
  assert.match(docsText, /\| 1 \| `review_chronology` \|/u);
  assert.match(docsText, /\| 2 \| `source_register` \|/u);
  assert.match(docsText, /ADDITIONAL_INPUT_ENVELOPE_FIELDS:\nNONE/u);
  assert.strictEqual(
    packageSchemas.validateHumanReviewChronology,
    chronologyValidator.validateHumanReviewChronology,
  );
  assert.strictEqual(
    packageSchemas.validateHumanReviewSourceRegister,
    sourceRegisterValidator.validateHumanReviewSourceRegister,
  );
});

test("packet equality and membership traversal remain exact and bounded", () => {
  const docsText = readRequired(docsRelativePath);

  assert.match(
    docsText,
    /PACKET_REFERENCE_COMPARISON:\nEXACT_CASE_SENSITIVE_EQUALITY/u,
  );
  assert.match(docsText, /PACKET_REFERENCE_NORMALIZATION:\nPROHIBITED/u);
  assert.match(
    docsText,
    /PACKET_MISMATCH_MEMBERSHIP_TRAVERSAL:\nPROHIBITED/u,
  );
  assert.match(docsText, /ascending source index/u);
  assert.match(docsText, /ascending entry index/u);
  assert.match(docsText, /ascending item index/u);
  assert.match(docsText, /one error at each distinct path/u);
  assert.match(docsText, /must not return, log, persist, hash/u);
});

test("four-field result and five-code path partition are exact", () => {
  const docsText = readRequired(docsRelativePath);
  const resultSection = docsText.slice(
    docsText.indexOf("## 8. Exact Future Result Contract"),
    docsText.indexOf("## 9."),
  );
  const errorSection = docsText.slice(
    docsText.indexOf("## 9. Exact Error Taxonomy And Paths"),
    docsText.indexOf("## 10."),
  );

  assert.equal((resultSection.match(/^\| \d+ \|/gmu) ?? []).length, 4);
  assert.match(docsText, /CROSS_REFERENCE_RESULT_FIELD_COUNT:\n4/u);
  assert.match(
    docsText,
    /CROSS_REFERENCE_RESULT_CONTRACT_KIND:\nHUMAN_REVIEW_CHRONOLOGY_SOURCE_REGISTER_CROSS_REFERENCE_BOUNDARY/u,
  );
  assert.match(docsText, /CROSS_REFERENCE_RESULT_VERSION:\n1\.0\.0/u);
  assert.equal((errorSection.match(/^\| \d+ \|/gmu) ?? []).length, 5);
  assert.match(docsText, /CROSS_REFERENCE_ERROR_CODE_COUNT:\n5/u);
  for (const code of [
    "invalid_input_shape",
    "review_chronology_invalid",
    "source_register_invalid",
    "packet_ref_mismatch",
    "source_ref_not_in_register",
  ]) {
    assert.equal(errorSection.includes(`\`${code}\``), true, code);
  }
  assert.match(errorSection, /`\$\.review_chronology\.packet_ref`/u);
  assert.match(
    errorSection,
    /`\$\.review_chronology\.entries\[n\]\.source_refs\[m\]`/u,
  );
  assert.match(docsText, /recursively\s+frozen/u);
});

test("five deterministic phases and no-observability lifecycle are frozen", () => {
  const docsText = readRequired(docsRelativePath);
  const phaseSection = docsText.slice(
    docsText.indexOf("## 10. Deterministic Five-Phase Execution"),
    docsText.indexOf("## 11."),
  );

  assert.equal((phaseSection.match(/^\| [0-4] \|/gmu) ?? []).length, 5);
  assert.match(docsText, /CROSS_REFERENCE_EXECUTION_PHASE_COUNT:\n5/u);
  assert.match(docsText, /RESULT_LIFECYCLE:\nEPHEMERAL_RETURN_ONLY/u);
  assert.match(docsText, /LOGGING:\nNONE/u);
  assert.match(docsText, /TELEMETRY:\nNONE/u);
  assert.match(docsText, /AUDIT_EMISSION:\nNONE/u);
});

test("future staged surfaces and exact runtime proof transition remain separate", () => {
  const docsText = readRequired(docsRelativePath);
  const resultSchemaProofTransitionText = readRequired(
    resultSchemaProofTransitionRelativePath,
  );
  const packageExportProofTransitionText = readRequired(
    packageExportProofTransitionRelativePath,
  );
  const crossReferenceProofTransitionText = readRequired(
    crossReferenceProofTransitionRelativePath,
  );
  const futureSection = docsText.slice(
    docsText.indexOf("## 12. Exact Future Slice Partition"),
    docsText.indexOf("## 13."),
  );

  assert.equal((futureSection.match(/^\| \d+ \|/gmu) ?? []).length, 8);
  assert.match(docsText, /FUTURE_STAGED_SURFACE_COUNT:\n8/u);
  assert.match(docsText, /CURRENT_RUNTIME_LIVE_ABSENCE_OWNER_COUNT:\n6/u);
  assert.match(docsText, /FUTURE_RUNTIME_PROOF_TRANSITION_FILE_COUNT:\n8/u);
  assert.match(docsText, /FUTURE_RUNTIME_IMPLEMENTATION_FILE_COUNT:\n2/u);
  for (const ownerPath of runtimeAbsenceOwnerPaths) {
    readRequired(ownerPath);
    assert.equal(docsText.includes(`\`${ownerPath}\``), true, ownerPath);
  }
  assert.equal(
    resultSchemaProofTransitionText.includes(`\`${resultSchemaRelativePath}\``),
    true,
  );
  assert.match(
    resultSchemaProofTransitionText,
    /CROSS_REFERENCE_RESULT_SCHEMA_PATH_TRANSITION_COUNT:\n2/u,
  );
  assert.equal(
    packageExportProofTransitionText.includes(
      "`tests/domain-human-review-chronology-source-register-cross-reference-semantics-boundary-doc-freeze.test.js`",
    ),
    true,
  );
  assert.match(
    packageExportProofTransitionText,
    /PACKAGE_SCHEMA_EXPORT_HISTORICAL_ASSERTION_TRANSITION_COUNT:\n3/u,
  );
  assert.match(
    packageExportProofTransitionText,
    /RETAINED_PACKAGE_SCHEMA_EXPORT_LIVE_ABSENCE_ASSERTION_COUNT:\n1/u,
  );
  assert.equal(
    crossReferenceProofTransitionText.includes(`\`${runtimeRelativePath}\``),
    true,
  );
  assert.equal(
    crossReferenceProofTransitionText.includes(`\`${runtimeProofRelativePath}\``),
    true,
  );
  assert.match(
    crossReferenceProofTransitionText,
    /CROSS_REFERENCE_RUNTIME_PATH_LIVE_ABSENCE_TRANSITION_COUNT:\n12/u,
  );
  assert.match(
    crossReferenceProofTransitionText,
    /TRACKED_DOCS_ONLY_CROSS_REFERENCE_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
});

test("semantics slice preserves non-interference and no-conclusion boundaries", () => {
  const docsText = readRequired(docsRelativePath);

  for (const marker of [
    "RESULT_SCHEMA_NOT_CREATED",
    "RESULT_SCHEMA_PACKAGE_EXPORT_NOT_CREATED",
    "PROOF_TRANSITION_NOT_CREATED",
    "CROSS_REFERENCE_CHECKPOINT_NOT_CREATED",
    "PERSISTENCE_API_ROUTE_PROVIDER_MODEL_UI_NOT_CREATED",
    "NO_REAL_PRIVATE_SOURCE_OR_CASE_MATERIAL_PROCESSED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
  ]) {
    assert.equal(docsText.includes(marker), true, marker);
  }

  assert.match(docsText, /one `DOCS_ONLY` readiness assessment/u);
  assert.match(docsText, /must not create the result schema/u);
  assert.match(docsText, /not actual human review, professional review, legal/u);
  assert.match(
    docsText,
    /TRACKED_DOCS_ONLY_OWNER_SELECTED_CROSS_REFERENCE_SEMANTICS_DEFINED/u,
  );
});
