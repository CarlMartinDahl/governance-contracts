"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_CROSS_REFERENCE_SEMANTICS_BOUNDARY_v1.md";
const resultSchemaPath =
  "schemas/human-review-questions-cross-reference-result.json";
const resultSchemaProofPath =
  "tests/human-review-questions-cross-reference-result-schema.test.js";
const resultSchemaProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_CROSS_REFERENCE_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const packageExportProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_CROSS_REFERENCE_RESULT_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const packageExportProofPath =
  "tests/human-review-questions-cross-reference-result-package-export.test.js";
const packageExportName = "humanReviewQuestionsCrossReferenceResult";
const proofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_CROSS_REFERENCE_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const proofTransitionProofPath =
  "tests/domain-human-review-questions-cross-reference-proof-transition-prerequisite-boundary-doc-freeze.test.js";
const runtimeModulePath =
  "packages/governance/src/human-review-questions-cross-reference-validation-boundary.js";
const runtimeProofPath =
  "tests/human-review-questions-cross-reference-validation-boundary.test.js";
const functionName = "validateHumanReviewQuestionsCrossReference";
const controllingPaths = [
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_CROSS_REFERENCE_READINESS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_CONTRACT_BOUNDARY_v1.md",
  "schemas/human-review-questions.json",
  "schemas/human-review-questions-validator-result.json",
  "packages/schemas/src/human-review-questions-validator.js",
  "schemas/human-review-source-register.json",
  "schemas/human-review-source-register-validator-result.json",
  "packages/schemas/src/human-review-source-register-validator.js",
  "schemas/human-review-chronology.json",
  "schemas/human-review-chronology-validator-result.json",
  "packages/schemas/src/human-review-chronology-validator.js",
  "schemas/human-review-asserted-claim-matrix.json",
  "schemas/human-review-asserted-claim-matrix-validator-result.json",
  "packages/schemas/src/human-review-asserted-claim-matrix-validator.js",
  "schemas/human-review-declared-packet-review-gaps.json",
  "schemas/human-review-declared-packet-review-gaps-validator-result.json",
  "packages/schemas/src/human-review-declared-packet-review-gaps-validator.js",
  "packages/schemas/src/index.js",
  "packages/governance/src/human-review-source-register-pre-downstream-validation-boundary.js",
  "packages/governance/src/human-review-chronology-source-register-validation-boundary.js",
  "schemas/human-review-chronology-source-register-cross-reference-result.json",
  "packages/governance/src/human-review-asserted-claim-matrix-validation-boundary.js",
  "schemas/human-review-asserted-claim-matrix-cross-reference-result.json",
  "packages/governance/src/human-review-declared-packet-review-gaps-cross-reference-validation-boundary.js",
  "schemas/human-review-declared-packet-review-gaps-cross-reference-result.json",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_SOURCE_REGISTER_CROSS_REFERENCE_SEMANTICS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_CROSS_REFERENCE_SEMANTICS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_CROSS_REFERENCE_SEMANTICS_BOUNDARY_v1.md",
];
const futureSurfaces = [
  resultSchemaPath,
  resultSchemaProofPath,
  "packages/schemas/src/index.js",
  packageExportProofPath,
  proofTransitionPath,
  proofTransitionProofPath,
  runtimeModulePath,
  runtimeProofPath,
];
const liveAbsenceOwnerPaths = [
  "tests/domain-human-review-questions-contract-boundary-doc-freeze.test.js",
  "tests/domain-human-review-questions-validator-result-schema-readiness-boundary-doc-freeze.test.js",
  "tests/domain-human-review-questions-validator-helper-proof-transition-prerequisite-boundary-doc-freeze.test.js",
  "tests/human-review-questions-schema.test.js",
  "tests/human-review-questions-validator-result-schema.test.js",
  "tests/domain-human-review-questions-cross-reference-readiness-boundary-doc-freeze.test.js",
  "tests/domain-human-review-questions-cross-reference-semantics-boundary-doc-freeze.test.js",
];

function readRequired(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  assert.equal(
    fs.existsSync(absolutePath),
    true,
    `expected ${relativePath} to exist`,
  );
  return fs.readFileSync(absolutePath, "utf8");
}

test("questions cross-reference semantics boundary and sources exist", () => {
  const docsText = readRequired(docsPath);

  for (const controllingPath of controllingPaths) {
    readRequired(controllingPath);
    assert.equal(
      docsText.includes("`" + controllingPath + "`"),
      true,
      controllingPath,
    );
  }

  assert.match(
    docsText,
    /HUMAN_REVIEW_QUESTIONS_CROSS_REFERENCE_SEMANTICS_BOUNDARY/u,
  );
  assert.match(docsText, /DOCS_ONLY/u);
  assert.match(docsText, /OWNER_SELECTED_FOUR_STAGE_SEMANTICS_TRANSLATED/u);
  assert.match(docsText, /SNAKE_CASE_REPOSITORY_PRECEDENT/u);
  for (let stage = 1; stage <= 4; stage += 1) {
    assert.match(
      docsText,
      new RegExp(`OWNER_SELECTED_STAGE_${stage}_OPTION_A`, "u"),
    );
  }
});

test("all fifteen selected scope decisions are resolved without implementation", () => {
  const docsText = readRequired(docsPath);
  const decisionSection = docsText.slice(
    docsText.indexOf("## 3. Fifteen Resolved Scope Decisions"),
    docsText.indexOf("## 4."),
  );
  const rows = decisionSection.match(/^\| (?:[1-9]|1[0-5]) \|/gmu) ?? [];

  assert.equal(rows.length, 15);
  assert.match(docsText, /RESOLVED_CROSS_REFERENCE_SCOPE_DECISION_COUNT:\n15/u);
  assert.match(docsText, /OPEN_CROSS_REFERENCE_SCOPE_DECISION_COUNT:\n0/u);
  assert.match(docsText, /OWNER_SELECTED_STAGE_COUNT:\n4/u);
  assert.match(
    docsText,
    /RELEASE_BOUNDARY_DECISION:\nPRESERVED_AS_SEPARATE_HUMAN_PROFESSIONAL_GATE/u,
  );
  assert.match(
    docsText,
    /Resolution of these documentation decisions is not implementation authority/u,
  );
});

test("future unary five-field envelope and direct internal module are exact", () => {
  const docsText = readRequired(docsPath);
  const envelopeSection = docsText.slice(
    docsText.indexOf("## 4. Exact Future Input Envelope"),
    docsText.indexOf("## 5."),
  );
  const expectedRows = [
    "| 1 | `human_review_questions` |",
    "| 2 | `source_register` |",
    "| 3 | `review_chronology` |",
    "| 4 | `asserted_claim_matrix` |",
    "| 5 | `declared_packet_review_gaps` |",
  ];

  assert.match(docsText, new RegExp(`FUTURE_FUNCTION_NAME:\\n${functionName}`, "u"));
  assert.match(docsText, /FUTURE_FUNCTION_ARITY:\n1/u);
  assert.match(
    docsText,
    /FUTURE_MODULE_PATH:\npackages\/governance\/src\/human-review-questions-cross-reference-validation-boundary\.js/u,
  );
  assert.match(docsText, /FUTURE_MODULE_EXPORT_COUNT:\n1/u);
  assert.match(docsText, /FUTURE_PUBLIC_SURFACE:\nDIRECT_INTERNAL_MODULE_EXPORT_ONLY/u);
  assert.match(docsText, /INPUT_ENVELOPE_FIELD_COUNT:\n5/u);
  for (const row of expectedRows) {
    assert.equal(envelopeSection.includes(row), true, row);
  }
  assert.match(docsText, /OPTIONAL_INPUT_ENVELOPE_FIELDS:\nNONE/u);
  assert.match(docsText, /ADDITIONAL_INPUT_ENVELOPE_FIELDS:\nNONE/u);
  assert.match(
    docsText,
    /invalid envelope shape produces exactly one `invalid_input_shape` error at\n`\$`/u,
  );
});

test("same-call validation preserves imports and predecessor non-invocation", () => {
  const docsText = readRequired(docsPath);
  const validationSection = docsText.slice(
    docsText.indexOf("## 5. Same-Call Structural Validation"),
    docsText.indexOf("## 6."),
  );
  const questionsModule = require("../packages/schemas/src/human-review-questions-validator.js");
  const matrixModule = require("../packages/schemas/src/human-review-asserted-claim-matrix-validator.js");
  const gapsModule = require("../packages/schemas/src/human-review-declared-packet-review-gaps-validator.js");
  const packageSchemas = require("../packages/schemas/src/index.js");
  const packageGovernance = require("../packages/governance/src/index.js");

  for (const validator of [
    "validateHumanReviewQuestions",
    "validateHumanReviewSourceRegister",
    "validateHumanReviewChronology",
    "validateHumanReviewAssertedClaimMatrix",
    "validateHumanReviewDeclaredPacketReviewGaps",
  ]) {
    assert.equal(validationSection.includes("`" + validator + "`"), true, validator);
  }
  assert.deepEqual(Object.keys(questionsModule), ["validateHumanReviewQuestions"]);
  assert.deepEqual(Object.keys(matrixModule), [
    "validateHumanReviewAssertedClaimMatrix",
  ]);
  assert.deepEqual(Object.keys(gapsModule), [
    "validateHumanReviewDeclaredPacketReviewGaps",
  ]);
  for (const internalName of [
    "validateHumanReviewQuestions",
    "validateHumanReviewAssertedClaimMatrix",
    "validateHumanReviewDeclaredPacketReviewGaps",
  ]) {
    assert.equal(Object.hasOwn(packageSchemas, internalName), false, internalName);
  }
  assert.equal(typeof packageSchemas.validateHumanReviewSourceRegister, "function");
  assert.equal(typeof packageSchemas.validateHumanReviewChronology, "function");
  assert.equal(Object.hasOwn(packageGovernance, functionName), false);
  assert.match(docsText, /PREDECESSOR_CHECKPOINT_INVOCATION_COUNT:\n0/u);
  for (const pair of [
    "`human_review_questions_invalid` at\n`$.human_review_questions`",
    "`source_register_invalid` at `$.source_register`",
    "`review_chronology_invalid` at `$.review_chronology`",
    "`asserted_claim_matrix_invalid` at\n`$.asserted_claim_matrix`",
    "`declared_packet_review_gaps_invalid` at `$.declared_packet_review_gaps`",
  ]) {
    assert.equal(validationSection.includes(pair), true, pair);
  }
});

test("packet comparison is Questions-anchored ordered and fail closed", () => {
  const docsText = readRequired(docsPath);

  assert.match(docsText, /PACKET_REFERENCE_COMPARISON:\nEXACT_CASE_SENSITIVE_EQUALITY/u);
  assert.match(docsText, /PACKET_REFERENCE_ANCHOR:\nHUMAN_REVIEW_QUESTIONS/u);
  assert.match(docsText, /PACKET_REFERENCE_NORMALIZATION:\nPROHIBITED/u);
  assert.match(
    docsText,
    /PACKET_MISMATCH_AGGREGATION:\nSOURCE_REGISTER_PATH_THEN_REVIEW_CHRONOLOGY_PATH_THEN_ASSERTED_CLAIM_MATRIX_PATH_THEN_DECLARED_PACKET_REVIEW_GAPS_PATH/u,
  );
  assert.match(docsText, /PACKET_MISMATCH_MEMBERSHIP_TRAVERSAL:\nPROHIBITED/u);
  for (const packetPath of [
    "$.source_register.packet_ref",
    "$.review_chronology.packet_ref",
    "$.asserted_claim_matrix.packet_ref",
    "$.declared_packet_review_gaps.packet_ref",
  ]) {
    assert.equal(docsText.includes("`" + packetPath + "`"), true, packetPath);
  }
});

test("four membership phases remain separate ordered token checks", () => {
  const docsText = readRequired(docsPath);

  for (const [code, canonicalPath] of [
    [
      "source_ref_not_in_register",
      "$.human_review_questions.questions[n].source_refs[m]",
    ],
    [
      "chronology_entry_ref_not_in_chronology",
      "$.human_review_questions.questions[n].chronology_entry_refs[m]",
    ],
    [
      "claim_ref_not_in_asserted_claim_matrix",
      "$.human_review_questions.questions[n].claim_refs[m]",
    ],
    [
      "gap_ref_not_in_declared_packet_review_gaps",
      "$.human_review_questions.questions[n].gap_refs[m]",
    ],
  ]) {
    assert.equal(docsText.includes("`" + code + "`"), true, code);
    assert.equal(docsText.includes("`" + canonicalPath + "`"), true, canonicalPath);
  }
  assert.match(docsText, /After the complete Source Register membership phase/u);
  assert.match(docsText, /After the complete chronology membership phase/u);
  assert.match(docsText, /After the complete claim membership phase/u);
  assert.match(docsText, /does not invoke or replace the matrix\ncross-reference checkpoint/u);
  assert.match(docsText, /does not invoke or replace the\ngaps cross-reference checkpoint/u);
  assert.match(docsText, /opaque exact tokens only/u);
});

test("result identity eleven-code taxonomy and nine phases are exact", () => {
  const docsText = readRequired(docsPath);
  const errorSection = docsText.slice(
    docsText.indexOf("## 12. Exact Error Taxonomy And Paths"),
    docsText.indexOf("## 13."),
  );
  const phaseSection = docsText.slice(
    docsText.indexOf("## 13. Deterministic Nine-Phase Execution"),
    docsText.indexOf("## 14."),
  );
  const errorCodes = [
    "invalid_input_shape",
    "human_review_questions_invalid",
    "source_register_invalid",
    "review_chronology_invalid",
    "asserted_claim_matrix_invalid",
    "declared_packet_review_gaps_invalid",
    "packet_ref_mismatch",
    "source_ref_not_in_register",
    "chronology_entry_ref_not_in_chronology",
    "claim_ref_not_in_asserted_claim_matrix",
    "gap_ref_not_in_declared_packet_review_gaps",
  ];

  assert.match(docsText, /CROSS_REFERENCE_RESULT_FIELD_COUNT:\n4/u);
  assert.match(
    docsText,
    /CROSS_REFERENCE_RESULT_CONTRACT_KIND:\nHUMAN_REVIEW_QUESTIONS_CROSS_REFERENCE_BOUNDARY/u,
  );
  assert.match(docsText, /CROSS_REFERENCE_RESULT_VERSION:\n1\.0\.0/u);
  assert.match(docsText, /CROSS_REFERENCE_ERROR_CODE_COUNT:\n11/u);
  assert.match(docsText, /ADDITIONAL_CROSS_REFERENCE_ERROR_CODES:\nNONE/u);
  for (const code of errorCodes) {
    assert.equal(errorSection.includes("`" + code + "`"), true, code);
  }
  assert.equal((phaseSection.match(/^\| [0-8] \|/gmu) ?? []).length, 9);
  assert.match(docsText, /CROSS_REFERENCE_EXECUTION_PHASE_COUNT:\n9/u);
  assert.match(docsText, /deduplicated by first occurrence/u);
  assert.match(docsText, /recursively\nfrozen/u);
});

test("result lifecycle is ephemeral and observability remains absent", () => {
  const docsText = readRequired(docsPath);

  for (const marker of [
    "RESULT_RECIPIENT:\nIMMEDIATE_IN_PROCESS_CALLER_ONLY",
    "RESULT_LIFECYCLE:\nEPHEMERAL_RETURN_ONLY",
    "PERSISTENCE:\nNONE",
    "EXPORT_OR_ATTACHMENT:\nNONE",
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

test("eight staged surfaces preserve result-schema transition and later absences", () => {
  const docsText = readRequired(docsPath);
  const transitionText = readRequired(resultSchemaProofTransitionPath);
  const packageExportTransitionText = readRequired(
    packageExportProofTransitionPath,
  );
  const crossReferenceTransitionText = readRequired(proofTransitionPath);

  assert.match(docsText, /FUTURE_STAGED_SURFACE_COUNT:\n8/u);
  for (const futureSurface of futureSurfaces) {
    assert.equal(docsText.includes("`" + futureSurface + "`"), true, futureSurface);
  }
  assert.equal(docsText.includes("`" + packageExportName + "`"), true);
  assert.match(docsText, /CURRENT_RUNTIME_LIVE_ABSENCE_OWNER_COUNT:\n7/u);
  assert.match(docsText, /FUTURE_RUNTIME_PROOF_TRANSITION_FILE_COUNT:\n9/u);
  assert.match(docsText, /FUTURE_RUNTIME_IMPLEMENTATION_FILE_COUNT:\n2/u);

  for (const ownerPath of liveAbsenceOwnerPaths) {
    const ownerText = readRequired(ownerPath);
    assert.equal(ownerText.includes(runtimeModulePath), true, ownerPath);
    assert.equal(ownerText.includes(runtimeProofPath), true, ownerPath);
    assert.equal(docsText.includes("`" + ownerPath + "`"), true, ownerPath);
  }

  for (const [position, candidatePath] of [
    [1, resultSchemaPath],
    [2, resultSchemaProofPath],
  ]) {
    const expectedRow =
      "| " +
      position +
      " | `" +
      candidatePath +
      "` | `PERMITTED_FOR_SEPARATE_LATER_CONTRACT_ONLY_SLICE` |";
    assert.equal(transitionText.includes(expectedRow), true, candidatePath);
  }

  for (const [position, retainedPath] of [
    [2, proofTransitionPath],
    [3, proofTransitionProofPath],
  ]) {
    const expectedRow =
      "| " +
      position +
      " | `" +
      retainedPath +
      "` | `RETAIN_LIVE_ABSENCE_ASSERTION` |";
    assert.equal(transitionText.includes(expectedRow), true, retainedPath);
    assert.equal(
      crossReferenceTransitionText.includes("`" + retainedPath + "`"),
      true,
      retainedPath,
    );
  }

  for (const [position, retainedPath] of [
    [1, runtimeModulePath],
    [2, runtimeProofPath],
  ]) {
    const expectedRow =
      "| " +
      position +
      " | `" +
      retainedPath +
      "` | `RETAIN_LIVE_ABSENCE_ASSERTION` |";
    assert.equal(transitionText.includes(expectedRow), true, retainedPath);
    assert.equal(
      crossReferenceTransitionText.includes("`" + retainedPath + "`"),
      true,
      retainedPath,
    );
  }

  for (const marker of [
    "CROSS_REFERENCE_PROOF_TRANSITION_FILE_COUNT:\n9",
    "CROSS_REFERENCE_FUTURE_PATH_LIVE_ABSENCE_TRANSITION_COUNT:\n16",
    "CROSS_REFERENCE_RUNTIME_PATH_LIVE_ABSENCE_TRANSITION_COUNT:\n14",
    "CROSS_REFERENCE_PREREQUISITE_PATH_LIVE_ABSENCE_TRANSITION_COUNT:\n2",
    "CROSS_REFERENCE_LIVE_ABSENCE_OWNER_PROOF_COUNT:\n7",
    "TRACKED_DOCS_ONLY_CROSS_REFERENCE_PROOF_TRANSITION_PREREQUISITE_DEFINED",
  ]) {
    assert.equal(crossReferenceTransitionText.includes(marker), true, marker);
  }

  for (const [position, scopePath] of [
    [1, resultSchemaProofTransitionPath],
    [
      2,
      "tests/domain-human-review-questions-cross-reference-semantics-boundary-doc-freeze.test.js",
    ],
    [
      3,
      "tests/domain-human-review-questions-cross-reference-result-schema-readiness-boundary-doc-freeze.test.js",
    ],
    [
      4,
      "tests/domain-human-review-questions-cross-reference-result-schema-scaffold-scope-boundary-doc-freeze.test.js",
    ],
  ]) {
    assert.equal(
      transitionText.includes("| " + position + " | `" + scopePath + "` |"),
      true,
      scopePath,
    );
  }

  for (const marker of [
    "CROSS_REFERENCE_RESULT_SCHEMA_PATH_TRANSITION_COUNT:\n2",
    "LIVE_ABSENCE_OWNER_PROOF_SURFACE_COUNT:\n3",
    "TRANSITIONED_LIVE_ABSENCE_ASSERTION_COUNT:\n6",
    "PROOF_TRANSITION_SLICE_FILE_COUNT:\n4",
  ]) {
    assert.match(transitionText, new RegExp(marker, "u"));
  }

  for (const [position, currentPath, action] of [
    [
      1,
      packageExportProofTransitionPath,
      "CREATE_APPEND_ONLY_PREREQUISITE",
    ],
    [
      2,
      "tests/domain-human-review-questions-cross-reference-semantics-boundary-doc-freeze.test.js",
      "REMOVE_ONE_PACKAGE_SYMBOL_AND_ONE_PACKAGE_PROOF_PATH_LIVE_ABSENCE_ASSERTION_THEN_ANCHOR_TRANSITION",
    ],
    [
      3,
      "tests/domain-human-review-questions-cross-reference-result-schema-readiness-boundary-doc-freeze.test.js",
      "REMOVE_ONE_PACKAGE_SYMBOL_LIVE_ABSENCE_ASSERTION_THEN_ANCHOR_TRANSITION",
    ],
    [
      4,
      "tests/domain-human-review-questions-cross-reference-result-schema-scaffold-scope-boundary-doc-freeze.test.js",
      "REMOVE_ONE_PACKAGE_SYMBOL_LIVE_ABSENCE_ASSERTION_THEN_ANCHOR_TRANSITION",
    ],
    [
      5,
      resultSchemaProofPath,
      "REMOVE_PACKAGE_IMPORT_AND_ONE_PACKAGE_SYMBOL_LIVE_ABSENCE_ASSERTION_THEN_ANCHOR_TRANSITION",
    ],
  ]) {
    assert.equal(
      packageExportTransitionText.includes(
        "| " + position + " | `" + currentPath + "` | `" + action + "` |",
      ),
      true,
      currentPath,
    );
  }
  assert.equal(
    packageExportTransitionText.includes("`" + packageExportProofPath + "`"),
    true,
  );
  assert.equal(
    packageExportTransitionText.includes("`" + packageExportName + "`"),
    true,
  );
  for (const marker of [
    "PACKAGE_SCHEMA_EXPORT_SYMBOL_ASSERTION_TRANSITION_COUNT:\n4",
    "PACKAGE_SCHEMA_EXPORT_PROOF_PATH_ASSERTION_TRANSITION_COUNT:\n1",
    "PACKAGE_SCHEMA_EXPORT_TOTAL_LIVE_ABSENCE_TRANSITION_COUNT:\n5",
    "RETAINED_PACKAGE_SCHEMA_EXPORT_LIVE_ABSENCE_ASSERTION_COUNT:\n0",
    "CURRENT_PACKAGE_EXPORT_PROOF_TRANSITION_PREREQUISITE_FILE_COUNT:\n5",
    "RETAINED_HISTORICAL_PROOF_REQUIREMENT_COUNT:\n9",
    "HISTORICAL_PROOF_TRANSITION_STEP_COUNT:\n7",
  ]) {
    assert.equal(packageExportTransitionText.includes(marker), true, marker);
  }
});

test("two-file docs-only slice preserves release and no-conclusion boundaries", () => {
  const docsText = readRequired(docsPath);
  const expectedPaths = [
    docsPath,
    "tests/domain-human-review-questions-cross-reference-semantics-boundary-doc-freeze.test.js",
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
    "LOGGING_TELEMETRY_AUDIT_NOT_CREATED",
    "NO_REAL_PRIVATE_SOURCE_OR_CASE_MATERIAL_PROCESSED",
    "NO_DOMAIN_FINDING_SCORE_OR_CONCLUSION_CREATED",
    "NO_APPROVAL_OR_RELEASE_PRODUCT_IMPLEMENTATION_READINESS_CREATED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "TRACKED_DOCS_ONLY_OWNER_SELECTED_CROSS_REFERENCE_SEMANTICS_DEFINED",
  ]) {
    assert.match(docsText, new RegExp(marker, "u"));
  }
  assert.match(
    docsText,
    /smallest safe next slice is one `DOCS_ONLY` readiness assessment for the\nnew cross-reference result schema/u,
  );
  assert.match(docsText, /not actual human review[\s\S]*real-evidence review/u);
});
