"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_CROSS_REFERENCE_SEMANTICS_BOUNDARY_v1.md";
const resultSchemaProofTransitionRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_CROSS_REFERENCE_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const packageExportProofTransitionRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_CROSS_REFERENCE_RESULT_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const packageExportProofRelativePath =
  "tests/human-review-asserted-claim-matrix-cross-reference-result-package-export.test.js";
const packageExportName =
  "humanReviewAssertedClaimMatrixCrossReferenceResult";
const crossReferenceProofTransitionRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_CROSS_REFERENCE_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const crossReferenceProofTransitionProofRelativePath =
  "tests/domain-human-review-asserted-claim-matrix-cross-reference-proof-transition-prerequisite-boundary-doc-freeze.test.js";
const controllingPaths = [
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_CROSS_REFERENCE_READINESS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_CONTRACT_BOUNDARY_v1.md",
  "schemas/human-review-asserted-claim-matrix.json",
  "schemas/human-review-asserted-claim-matrix-validator-result.json",
  "packages/schemas/src/human-review-asserted-claim-matrix-validator.js",
  "schemas/human-review-source-register.json",
  "schemas/human-review-source-register-validator-result.json",
  "packages/schemas/src/human-review-source-register-validator.js",
  "schemas/human-review-chronology.json",
  "schemas/human-review-chronology-validator-result.json",
  "packages/schemas/src/human-review-chronology-validator.js",
  "packages/schemas/src/index.js",
  "packages/governance/src/human-review-source-register-pre-downstream-validation-boundary.js",
  "packages/governance/src/human-review-chronology-source-register-validation-boundary.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_SOURCE_REGISTER_CROSS_REFERENCE_SEMANTICS_BOUNDARY_v1.md",
];
const resultSchemaCandidatePaths = [
  "schemas/human-review-asserted-claim-matrix-cross-reference-result.json",
  "tests/human-review-asserted-claim-matrix-cross-reference-result-schema.test.js",
];
const retainedFuturePaths = [
  packageExportProofRelativePath,
  crossReferenceProofTransitionRelativePath,
  crossReferenceProofTransitionProofRelativePath,
  "packages/governance/src/human-review-asserted-claim-matrix-validation-boundary.js",
  "tests/human-review-asserted-claim-matrix-validation-boundary.test.js",
];
const liveAbsenceOwnerPaths = [
  "tests/domain-human-review-asserted-claim-matrix-contract-readiness-boundary-doc-freeze.test.js",
  "tests/domain-human-review-asserted-claim-matrix-validator-helper-proof-transition-prerequisite-boundary-doc-freeze.test.js",
  "tests/domain-human-review-asserted-claim-matrix-cross-reference-readiness-boundary-doc-freeze.test.js",
  "tests/domain-human-review-asserted-claim-matrix-cross-reference-semantics-boundary-doc-freeze.test.js",
];

function readRequired(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  assert.equal(fs.existsSync(absolutePath), true, `expected ${relativePath} to exist`);
  return fs.readFileSync(absolutePath, "utf8");
}

test("claim-matrix cross-reference semantics boundary and every source exist", () => {
  const docsText = readRequired(docsPath);

  for (const controllingPath of controllingPaths) {
    readRequired(controllingPath);
    assert.equal(docsText.includes("`" + controllingPath + "`"), true, controllingPath);
  }

  assert.match(
    docsText,
    /HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_CROSS_REFERENCE_SEMANTICS_BOUNDARY/u,
  );
  assert.match(docsText, /DOCS_ONLY/u);
  assert.match(
    docsText,
    /OWNER_MANDATE_SELECTED_CONSERVATIVE_SEMANTICS_TRANSLATED/u,
  );
});

test("all thirteen conservative scope decisions are resolved without implementation", () => {
  const docsText = readRequired(docsPath);
  const decisionSection = docsText.slice(
    docsText.indexOf("## 3. Thirteen Resolved Scope Decisions"),
    docsText.indexOf("## 4."),
  );
  const rows = decisionSection.match(/^\| (?:[1-9]|1[0-3]) \|/gmu) ?? [];

  assert.equal(rows.length, 13);
  assert.match(docsText, /RESOLVED_CROSS_REFERENCE_SCOPE_DECISION_COUNT:\n13/u);
  assert.match(docsText, /OPEN_CROSS_REFERENCE_SCOPE_DECISION_COUNT:\n0/u);
  assert.match(
    docsText,
    /RELEASE_BOUNDARY_DECISION:\nPRESERVED_AS_SEPARATE_HUMAN_PROFESSIONAL_GATE/u,
  );
  assert.match(
    docsText,
    /Resolution of these documentation decisions is not implementation authority/u,
  );
});

test("future unary three-field envelope and direct internal module are exact", () => {
  const docsText = readRequired(docsPath);
  const envelopeSection = docsText.slice(
    docsText.indexOf("## 4. Exact Future Input Envelope"),
    docsText.indexOf("## 5."),
  );

  assert.match(
    docsText,
    /FUTURE_FUNCTION_NAME:\nvalidateHumanReviewAssertedClaimMatrixCrossReference/u,
  );
  assert.match(docsText, /FUTURE_FUNCTION_ARITY:\n1/u);
  assert.match(
    docsText,
    /FUTURE_MODULE_PATH:\npackages\/governance\/src\/human-review-asserted-claim-matrix-validation-boundary\.js/u,
  );
  assert.match(docsText, /FUTURE_MODULE_EXPORT_COUNT:\n1/u);
  assert.match(
    docsText,
    /FUTURE_PUBLIC_SURFACE:\nDIRECT_INTERNAL_MODULE_EXPORT_ONLY/u,
  );
  assert.match(docsText, /INPUT_ENVELOPE_FIELD_COUNT:\n3/u);
  for (const row of [
    "| 1 | `asserted_claim_matrix` |",
    "| 2 | `source_register` |",
    "| 3 | `review_chronology` |",
  ]) {
    assert.equal(envelopeSection.includes(row), true, row);
  }
  assert.match(docsText, /OPTIONAL_INPUT_ENVELOPE_FIELDS:\nNONE/u);
  assert.match(docsText, /ADDITIONAL_INPUT_ENVELOPE_FIELDS:\nNONE/u);
  assert.match(docsText, /invalid envelope shape produces exactly one `invalid_input_shape` error at\n`\$`/u);
});

test("same-call validation and packet comparison are exact and fail closed", () => {
  const docsText = readRequired(docsPath);
  const validationSection = docsText.slice(
    docsText.indexOf("## 5. Same-Call Structural Validation"),
    docsText.indexOf("## 6."),
  );

  for (const validator of [
    "validateHumanReviewAssertedClaimMatrix",
    "validateHumanReviewSourceRegister",
    "validateHumanReviewChronology",
  ]) {
    assert.equal(validationSection.includes("`" + validator + "`"), true, validator);
  }
  for (const pair of [
    "`asserted_claim_matrix_invalid` at\n`$.asserted_claim_matrix`",
    "`source_register_invalid` at `$.source_register`",
    "`review_chronology_invalid` at `$.review_chronology`",
  ]) {
    assert.equal(validationSection.includes(pair), true, pair);
  }
  assert.match(docsText, /PACKET_REFERENCE_COMPARISON:\nEXACT_CASE_SENSITIVE_EQUALITY/u);
  assert.match(docsText, /PACKET_REFERENCE_NORMALIZATION:\nPROHIBITED/u);
  assert.match(
    docsText,
    /PACKET_MISMATCH_AGGREGATION:\nSOURCE_REGISTER_PATH_THEN_REVIEW_CHRONOLOGY_PATH/u,
  );
  assert.match(docsText, /PACKET_MISMATCH_MEMBERSHIP_TRAVERSAL:\nPROHIBITED/u);
});

test("source and chronology memberships remain separate ordered token checks", () => {
  const docsText = readRequired(docsPath);

  assert.match(
    docsText,
    /`source_ref_not_in_register` error at:\n\n`\$\.asserted_claim_matrix\.claims\[n\]\.source_refs\[m\]`/u,
  );
  assert.match(
    docsText,
    /`chronology_entry_ref_not_in_chronology` error at:\n\n`\$\.asserted_claim_matrix\.claims\[n\]\.chronology_entry_refs\[m\]`/u,
  );
  assert.match(
    docsText,
    /After the complete Source Register membership phase/u,
  );
  assert.match(docsText, /opaque exact tokens only/u);
  assert.match(
    docsText,
    /Reuse of a present reference across claims\nremains allowed/u,
  );
});

test("future result identity seven-code taxonomy and seven phases are exact", () => {
  const docsText = readRequired(docsPath);
  const errorSection = docsText.slice(
    docsText.indexOf("## 10. Exact Error Taxonomy And Paths"),
    docsText.indexOf("## 11."),
  );
  const phaseSection = docsText.slice(
    docsText.indexOf("## 11. Deterministic Seven-Phase Execution"),
    docsText.indexOf("## 12."),
  );
  const errorCodes = [
    "invalid_input_shape",
    "asserted_claim_matrix_invalid",
    "source_register_invalid",
    "review_chronology_invalid",
    "packet_ref_mismatch",
    "source_ref_not_in_register",
    "chronology_entry_ref_not_in_chronology",
  ];

  assert.match(docsText, /CROSS_REFERENCE_RESULT_FIELD_COUNT:\n4/u);
  assert.match(
    docsText,
    /CROSS_REFERENCE_RESULT_CONTRACT_KIND:\nHUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_CROSS_REFERENCE_BOUNDARY/u,
  );
  assert.match(docsText, /CROSS_REFERENCE_RESULT_VERSION:\n1\.0\.0/u);
  assert.match(docsText, /CROSS_REFERENCE_ERROR_CODE_COUNT:\n7/u);
  assert.match(docsText, /ADDITIONAL_CROSS_REFERENCE_ERROR_CODES:\nNONE/u);
  for (const code of errorCodes) {
    assert.equal(errorSection.includes("`" + code + "`"), true, code);
  }
  assert.equal((phaseSection.match(/^\| [0-6] \|/gmu) ?? []).length, 7);
  assert.match(docsText, /CROSS_REFERENCE_EXECUTION_PHASE_COUNT:\n7/u);
  assert.match(docsText, /deduplicated by first occurrence/u);
  assert.match(docsText, /recursively\nfrozen/u);
});

test("result lifecycle is ephemeral and observability remains absent", () => {
  const docsText = readRequired(docsPath);

  for (const marker of [
    "RESULT_RECIPIENT:\nIMMEDIATE_IN_PROCESS_CALLER_ONLY",
    "RESULT_LIFECYCLE:\nEPHEMERAL_RETURN_ONLY",
    "LOGGING:\nNONE",
    "TELEMETRY:\nNONE",
    "METRICS_OR_TRACING:\nNONE",
    "AUDIT_EMISSION:\nNONE",
  ]) {
    assert.match(docsText, new RegExp(marker, "u"));
  }
  assert.match(
    docsText,
    /must not be persisted, cached, queued, attached, summarized,\nexported, emitted/u,
  );
});

test("eight staged surfaces preserve the exact result-schema proof transition", () => {
  const docsText = readRequired(docsPath);
  const resultSchemaProofTransitionText = readRequired(
    resultSchemaProofTransitionRelativePath,
  );
  const packageExportProofTransitionText = readRequired(
    packageExportProofTransitionRelativePath,
  );
  const crossReferenceProofTransitionText = readRequired(
    crossReferenceProofTransitionRelativePath,
  );
  const runtimeModulePath = retainedFuturePaths[3];

  assert.match(docsText, /FUTURE_STAGED_SURFACE_COUNT:\n8/u);
  assert.match(docsText, /CURRENT_RUNTIME_LIVE_ABSENCE_OWNER_COUNT:\n4/u);
  assert.match(docsText, /FUTURE_RUNTIME_PROOF_TRANSITION_FILE_COUNT:\n6/u);
  assert.match(docsText, /FUTURE_RUNTIME_IMPLEMENTATION_FILE_COUNT:\n2/u);

  for (const candidatePath of resultSchemaCandidatePaths) {
    assert.equal(docsText.includes("`" + candidatePath + "`"), true, candidatePath);
    assert.equal(
      resultSchemaProofTransitionText.includes("`" + candidatePath + "`"),
      true,
      candidatePath,
    );
  }
  assert.match(
    resultSchemaProofTransitionText,
    /CROSS_REFERENCE_RESULT_SCHEMA_PATH_TRANSITION_COUNT:\n2/u,
  );
  assert.match(
    resultSchemaProofTransitionText,
    /TRANSITIONED_LIVE_ABSENCE_ASSERTION_COUNT:\n6/u,
  );
  for (const futurePath of retainedFuturePaths) {
    assert.equal(docsText.includes("`" + futurePath + "`"), true, futurePath);
  }
  for (const futurePath of retainedFuturePaths.slice(1)) {
    assert.equal(
      crossReferenceProofTransitionText.includes("`" + futurePath + "`"),
      true,
      futurePath,
    );
  }
  assert.match(
    crossReferenceProofTransitionText,
    /CROSS_REFERENCE_FUTURE_PATH_LIVE_ABSENCE_TRANSITION_COUNT:\n7/u,
  );
  assert.match(
    crossReferenceProofTransitionText,
    /TRACKED_DOCS_ONLY_CROSS_REFERENCE_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
  for (const ownerPath of liveAbsenceOwnerPaths) {
    const ownerText = readRequired(ownerPath);
    assert.equal(ownerText.includes(runtimeModulePath), true, ownerPath);
    assert.equal(docsText.includes("`" + ownerPath + "`"), true, ownerPath);
  }
  assert.equal(
    packageExportProofTransitionText.includes(
      "`tests/domain-human-review-asserted-claim-matrix-cross-reference-semantics-boundary-doc-freeze.test.js`",
    ),
    true,
  );
  assert.equal(
    packageExportProofTransitionText.includes("`" + packageExportName + "`"),
    true,
  );
  assert.match(
    packageExportProofTransitionText,
    /PACKAGE_SCHEMA_EXPORT_SYMBOL_ASSERTION_TRANSITION_COUNT:\n3/u,
  );
  assert.match(
    packageExportProofTransitionText,
    /PACKAGE_SCHEMA_EXPORT_PROOF_PATH_ASSERTION_TRANSITION_COUNT:\n1/u,
  );
  assert.match(
    packageExportProofTransitionText,
    /PACKAGE_SCHEMA_EXPORT_TOTAL_LIVE_ABSENCE_TRANSITION_COUNT:\n4/u,
  );
  assert.match(
    packageExportProofTransitionText,
    /RETAINED_PACKAGE_SCHEMA_EXPORT_LIVE_ABSENCE_ASSERTION_COUNT:\n0/u,
  );
});

test("two-file docs-only slice preserves release and no-conclusion boundaries", () => {
  const docsText = readRequired(docsPath);
  const expectedPaths = [
    docsPath,
    "tests/domain-human-review-asserted-claim-matrix-cross-reference-semantics-boundary-doc-freeze.test.js",
  ];

  assert.match(docsText, /CROSS_REFERENCE_SEMANTICS_SLICE_FILE_COUNT:\n2/u);
  for (const expectedPath of expectedPaths) {
    assert.equal(docsText.includes("`" + expectedPath + "`"), true, expectedPath);
  }
  for (const marker of [
    "RESULT_SCHEMA_NOT_CREATED",
    "RESULT_SCHEMA_PACKAGE_EXPORT_NOT_CREATED",
    "PROOF_TRANSITION_NOT_CREATED",
    "CROSS_REFERENCE_CHECKPOINT_NOT_CREATED",
    "PERSISTENCE_API_ROUTE_PROVIDER_MODEL_UI_NOT_CREATED",
    "NO_REAL_PRIVATE_SOURCE_OR_CASE_MATERIAL_PROCESSED",
    "NO_DOMAIN_FINDING_SCORE_OR_CONCLUSION_CREATED",
    "NO_APPROVAL_OR_RELEASE_PRODUCT_IMPLEMENTATION_READINESS_CREATED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "TRACKED_DOCS_ONLY_OWNER_MANDATED_CROSS_REFERENCE_SEMANTICS_DEFINED",
  ]) {
    assert.match(docsText, new RegExp(marker, "u"));
  }
  assert.match(
    docsText,
    /smallest safe next slice is one `DOCS_ONLY` readiness assessment for the\nnew cross-reference result schema/u,
  );
  assert.match(docsText, /Human\/professional review remains the release gate/u);
  assert.match(docsText, /not actual human review[\s\S]*real-evidence review/u);
});
