"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_CROSS_REFERENCE_SEMANTICS_BOUNDARY_v1.md";
const resultSchemaPath =
  "schemas/human-review-declared-packet-review-gaps-cross-reference-result.json";
const resultSchemaProofPath =
  "tests/human-review-declared-packet-review-gaps-cross-reference-result-schema.test.js";
const resultSchemaProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_CROSS_REFERENCE_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const packageExportProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_CROSS_REFERENCE_RESULT_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const packageExportProofPath =
  "tests/human-review-declared-packet-review-gaps-cross-reference-result-package-export.test.js";
const packageExportName =
  "humanReviewDeclaredPacketReviewGapsCrossReferenceResult";
const proofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_CROSS_REFERENCE_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const proofTransitionProofPath =
  "tests/domain-human-review-declared-packet-review-gaps-cross-reference-proof-transition-prerequisite-boundary-doc-freeze.test.js";
const runtimeModulePath =
  "packages/governance/src/human-review-declared-packet-review-gaps-cross-reference-validation-boundary.js";
const runtimeProofPath =
  "tests/human-review-declared-packet-review-gaps-cross-reference-validation-boundary.test.js";
const functionName =
  "validateHumanReviewDeclaredPacketReviewGapsCrossReference";
const controllingPaths = [
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_CROSS_REFERENCE_READINESS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_CONTRACT_BOUNDARY_v1.md",
  "schemas/human-review-declared-packet-review-gaps.json",
  "schemas/human-review-declared-packet-review-gaps-validator-result.json",
  "packages/schemas/src/human-review-declared-packet-review-gaps-validator.js",
  "schemas/human-review-source-register.json",
  "schemas/human-review-source-register-validator-result.json",
  "packages/schemas/src/human-review-source-register-validator.js",
  "schemas/human-review-chronology.json",
  "schemas/human-review-chronology-validator-result.json",
  "packages/schemas/src/human-review-chronology-validator.js",
  "schemas/human-review-asserted-claim-matrix.json",
  "schemas/human-review-asserted-claim-matrix-validator-result.json",
  "packages/schemas/src/human-review-asserted-claim-matrix-validator.js",
  "packages/schemas/src/index.js",
  "packages/governance/src/human-review-source-register-pre-downstream-validation-boundary.js",
  "packages/governance/src/human-review-chronology-source-register-validation-boundary.js",
  "schemas/human-review-chronology-source-register-cross-reference-result.json",
  "packages/governance/src/human-review-asserted-claim-matrix-validation-boundary.js",
  "schemas/human-review-asserted-claim-matrix-cross-reference-result.json",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_SOURCE_REGISTER_CROSS_REFERENCE_SEMANTICS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_CROSS_REFERENCE_SEMANTICS_BOUNDARY_v1.md",
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
  "tests/domain-human-review-declared-packet-review-gaps-contract-boundary-doc-freeze.test.js",
  "tests/domain-human-review-declared-packet-review-gaps-validator-result-schema-readiness-boundary-doc-freeze.test.js",
  "tests/domain-human-review-declared-packet-review-gaps-validator-helper-proof-transition-prerequisite-boundary-doc-freeze.test.js",
  "tests/human-review-declared-packet-review-gaps-schema.test.js",
  "tests/domain-human-review-declared-packet-review-gaps-cross-reference-readiness-boundary-doc-freeze.test.js",
  "tests/domain-human-review-declared-packet-review-gaps-cross-reference-semantics-boundary-doc-freeze.test.js",
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

test("declared-gaps cross-reference semantics boundary and sources exist", () => {
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
    /HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_CROSS_REFERENCE_SEMANTICS_BOUNDARY/u,
  );
  assert.match(docsText, /DOCS_ONLY/u);
  assert.match(docsText, /OWNER_SELECTED_FOUR_STAGE_SEMANTICS_TRANSLATED/u);
  assert.match(docsText, /SNAKE_CASE_REPOSITORY_PRECEDENT/u);
});

test("all fourteen selected scope decisions are resolved without implementation", () => {
  const docsText = readRequired(docsPath);
  const decisionSection = docsText.slice(
    docsText.indexOf("## 3. Fourteen Resolved Scope Decisions"),
    docsText.indexOf("## 4."),
  );
  const rows = decisionSection.match(/^\| (?:[1-9]|1[0-4]) \|/gmu) ?? [];

  assert.equal(rows.length, 14);
  assert.match(docsText, /RESOLVED_CROSS_REFERENCE_SCOPE_DECISION_COUNT:\n14/u);
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

test("future unary four-field envelope and direct internal module are exact", () => {
  const docsText = readRequired(docsPath);
  const envelopeSection = docsText.slice(
    docsText.indexOf("## 4. Exact Future Input Envelope"),
    docsText.indexOf("## 5."),
  );
  const expectedRows = [
    "| 1 | `declared_packet_review_gaps` |",
    "| 2 | `source_register` |",
    "| 3 | `review_chronology` |",
    "| 4 | `asserted_claim_matrix` |",
  ];

  assert.match(docsText, new RegExp(`FUTURE_FUNCTION_NAME:\\n${functionName}`, "u"));
  assert.match(docsText, /FUTURE_FUNCTION_ARITY:\n1/u);
  assert.match(
    docsText,
    /FUTURE_MODULE_PATH:\npackages\/governance\/src\/human-review-declared-packet-review-gaps-cross-reference-validation-boundary\.js/u,
  );
  assert.match(docsText, /FUTURE_MODULE_EXPORT_COUNT:\n1/u);
  assert.match(docsText, /FUTURE_PUBLIC_SURFACE:\nDIRECT_INTERNAL_MODULE_EXPORT_ONLY/u);
  assert.match(docsText, /INPUT_ENVELOPE_FIELD_COUNT:\n4/u);
  for (const row of expectedRows) {
    assert.equal(envelopeSection.includes(row), true, row);
  }
  assert.match(docsText, /OPTIONAL_INPUT_ENVELOPE_FIELDS:\nNONE/u);
  assert.match(docsText, /ADDITIONAL_INPUT_ENVELOPE_FIELDS:\nNONE/u);
  assert.match(
    docsText,
    /invalid envelope shape produces exactly one `invalid_input_shape` error at\n+`\$`/u,
  );
});

test("same-call validation preserves exact imports and predecessor non-invocation", () => {
  const docsText = readRequired(docsPath);
  const validationSection = docsText.slice(
    docsText.indexOf("## 5. Same-Call Structural Validation"),
    docsText.indexOf("## 6."),
  );
  const gapsModule = require("../packages/schemas/src/human-review-declared-packet-review-gaps-validator.js");
  const matrixModule = require("../packages/schemas/src/human-review-asserted-claim-matrix-validator.js");
  const packageSchemas = require("../packages/schemas/src/index.js");
  const packageGovernance = require("../packages/governance/src/index.js");

  for (const validator of [
    "validateHumanReviewDeclaredPacketReviewGaps",
    "validateHumanReviewSourceRegister",
    "validateHumanReviewChronology",
    "validateHumanReviewAssertedClaimMatrix",
  ]) {
    assert.equal(validationSection.includes("`" + validator + "`"), true, validator);
  }
  assert.deepEqual(Object.keys(gapsModule), [
    "validateHumanReviewDeclaredPacketReviewGaps",
  ]);
  assert.deepEqual(Object.keys(matrixModule), [
    "validateHumanReviewAssertedClaimMatrix",
  ]);
  assert.equal(
    Object.hasOwn(packageSchemas, "validateHumanReviewDeclaredPacketReviewGaps"),
    false,
  );
  assert.equal(
    Object.hasOwn(packageSchemas, "validateHumanReviewAssertedClaimMatrix"),
    false,
  );
  assert.equal(typeof packageSchemas.validateHumanReviewSourceRegister, "function");
  assert.equal(typeof packageSchemas.validateHumanReviewChronology, "function");
  assert.equal(Object.hasOwn(packageGovernance, functionName), false);
  assert.match(docsText, /PREDECESSOR_CHECKPOINT_INVOCATION_COUNT:\n0/u);
  for (const pair of [
    "`declared_packet_review_gaps_invalid` at\n`$.declared_packet_review_gaps`",
    "`source_register_invalid` at `$.source_register`",
    "`review_chronology_invalid` at `$.review_chronology`",
    "`asserted_claim_matrix_invalid` at\n`$.asserted_claim_matrix`",
  ]) {
    assert.equal(validationSection.includes(pair), true, pair);
  }
});

test("packet comparison is gaps-anchored ordered and fail closed", () => {
  const docsText = readRequired(docsPath);

  assert.match(docsText, /PACKET_REFERENCE_COMPARISON:\nEXACT_CASE_SENSITIVE_EQUALITY/u);
  assert.match(docsText, /PACKET_REFERENCE_ANCHOR:\nDECLARED_PACKET_REVIEW_GAPS/u);
  assert.match(docsText, /PACKET_REFERENCE_NORMALIZATION:\nPROHIBITED/u);
  assert.match(
    docsText,
    /PACKET_MISMATCH_AGGREGATION:\nSOURCE_REGISTER_PATH_THEN_REVIEW_CHRONOLOGY_PATH_THEN_ASSERTED_CLAIM_MATRIX_PATH/u,
  );
  assert.match(docsText, /PACKET_MISMATCH_MEMBERSHIP_TRAVERSAL:\nPROHIBITED/u);
  for (const packetPath of [
    "$.source_register.packet_ref",
    "$.review_chronology.packet_ref",
    "$.asserted_claim_matrix.packet_ref",
  ]) {
    assert.equal(docsText.includes("`" + packetPath + "`"), true, packetPath);
  }
});

test("three membership phases remain separate ordered token checks", () => {
  const docsText = readRequired(docsPath);

  assert.match(
    docsText,
    /`source_ref_not_in_register` error at:\n\n`\$\.declared_packet_review_gaps\.gaps\[n\]\.source_refs\[m\]`/u,
  );
  assert.match(
    docsText,
    /`chronology_entry_ref_not_in_chronology` error at:\n\n`\$\.declared_packet_review_gaps\.gaps\[n\]\.chronology_entry_refs\[m\]`/u,
  );
  assert.match(
    docsText,
    /`claim_ref_not_in_asserted_claim_matrix` error at:\n\n`\$\.declared_packet_review_gaps\.gaps\[n\]\.claim_refs\[m\]`/u,
  );
  assert.match(docsText, /After the complete Source Register membership phase/u);
  assert.match(docsText, /After the complete chronology membership phase/u);
  assert.match(docsText, /does not invoke or replace the matrix\ncross-reference checkpoint/u);
  assert.match(docsText, /opaque exact tokens/u);
});

test("result identity nine-code taxonomy and eight phases are exact", () => {
  const docsText = readRequired(docsPath);
  const errorSection = docsText.slice(
    docsText.indexOf("## 11. Exact Error Taxonomy And Paths"),
    docsText.indexOf("## 12."),
  );
  const phaseSection = docsText.slice(
    docsText.indexOf("## 12. Deterministic Eight-Phase Execution"),
    docsText.indexOf("## 13."),
  );
  const errorCodes = [
    "invalid_input_shape",
    "declared_packet_review_gaps_invalid",
    "source_register_invalid",
    "review_chronology_invalid",
    "asserted_claim_matrix_invalid",
    "packet_ref_mismatch",
    "source_ref_not_in_register",
    "chronology_entry_ref_not_in_chronology",
    "claim_ref_not_in_asserted_claim_matrix",
  ];

  assert.match(docsText, /CROSS_REFERENCE_RESULT_FIELD_COUNT:\n4/u);
  assert.match(
    docsText,
    /CROSS_REFERENCE_RESULT_CONTRACT_KIND:\nHUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_CROSS_REFERENCE_BOUNDARY/u,
  );
  assert.match(docsText, /CROSS_REFERENCE_RESULT_VERSION:\n1\.0\.0/u);
  assert.match(docsText, /CROSS_REFERENCE_ERROR_CODE_COUNT:\n9/u);
  assert.match(docsText, /ADDITIONAL_CROSS_REFERENCE_ERROR_CODES:\nNONE/u);
  for (const code of errorCodes) {
    assert.equal(errorSection.includes("`" + code + "`"), true, code);
  }
  assert.equal((phaseSection.match(/^\| [0-7] \|/gmu) ?? []).length, 8);
  assert.match(docsText, /CROSS_REFERENCE_EXECUTION_PHASE_COUNT:\n8/u);
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
  assert.match(docsText, /CURRENT_RUNTIME_LIVE_ABSENCE_OWNER_COUNT:\n6/u);
  assert.match(docsText, /FUTURE_RUNTIME_PROOF_TRANSITION_FILE_COUNT:\n8/u);
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
  }

  for (const [position, scopePath] of [
    [1, resultSchemaProofTransitionPath],
    [
      2,
      "tests/domain-human-review-declared-packet-review-gaps-cross-reference-semantics-boundary-doc-freeze.test.js",
    ],
    [
      3,
      "tests/domain-human-review-declared-packet-review-gaps-cross-reference-result-schema-readiness-boundary-doc-freeze.test.js",
    ],
    [
      4,
      "tests/domain-human-review-declared-packet-review-gaps-cross-reference-result-schema-scaffold-scope-boundary-doc-freeze.test.js",
    ],
  ]) {
    assert.equal(
      transitionText.includes("| " + position + " | `" + scopePath + "` |"),
      true,
      scopePath,
    );
  }

  assert.match(
    transitionText,
    /CROSS_REFERENCE_RESULT_SCHEMA_PATH_TRANSITION_COUNT:\n2/u,
  );
  assert.match(transitionText, /LIVE_ABSENCE_OWNER_PROOF_SURFACE_COUNT:\n3/u);
  assert.match(
    transitionText,
    /TRANSITIONED_LIVE_ABSENCE_ASSERTION_COUNT:\n6/u,
  );
  assert.match(transitionText, /PROOF_TRANSITION_SLICE_FILE_COUNT:\n4/u);

  for (const [position, currentPath, action] of [
    [
      1,
      packageExportProofTransitionPath,
      "CREATE_APPEND_ONLY_PREREQUISITE",
    ],
    [
      2,
      "tests/domain-human-review-declared-packet-review-gaps-cross-reference-semantics-boundary-doc-freeze.test.js",
      "REMOVE_ONE_PACKAGE_SYMBOL_AND_ONE_PACKAGE_PROOF_PATH_LIVE_ABSENCE_ASSERTION_THEN_ANCHOR_TRANSITION",
    ],
    [
      3,
      "tests/domain-human-review-declared-packet-review-gaps-cross-reference-result-schema-readiness-boundary-doc-freeze.test.js",
      "REMOVE_ONE_PACKAGE_SYMBOL_LIVE_ABSENCE_ASSERTION_THEN_ANCHOR_TRANSITION",
    ],
    [
      4,
      "tests/domain-human-review-declared-packet-review-gaps-cross-reference-result-schema-scaffold-scope-boundary-doc-freeze.test.js",
      "REMOVE_ONE_PACKAGE_SYMBOL_LIVE_ABSENCE_ASSERTION_THEN_ANCHOR_TRANSITION",
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
    "PACKAGE_SCHEMA_EXPORT_SYMBOL_ASSERTION_TRANSITION_COUNT:\n3",
    "PACKAGE_SCHEMA_EXPORT_PROOF_PATH_ASSERTION_TRANSITION_COUNT:\n1",
    "PACKAGE_SCHEMA_EXPORT_TOTAL_LIVE_ABSENCE_TRANSITION_COUNT:\n4",
    "RETAINED_PACKAGE_SCHEMA_EXPORT_LIVE_ABSENCE_ASSERTION_COUNT:\n0",
    "CURRENT_PACKAGE_EXPORT_PROOF_TRANSITION_PREREQUISITE_FILE_COUNT:\n4",
    "RETAINED_HISTORICAL_PROOF_REQUIREMENT_COUNT:\n9",
    "HISTORICAL_PROOF_TRANSITION_STEP_COUNT:\n7",
  ]) {
    assert.equal(packageExportTransitionText.includes(marker), true, marker);
  }

  for (const transitionedPath of [
    proofTransitionPath,
    proofTransitionProofPath,
    runtimeModulePath,
    runtimeProofPath,
  ]) {
    assert.equal(
      crossReferenceTransitionText.includes("`" + transitionedPath + "`"),
      true,
      transitionedPath,
    );
  }
  assert.match(
    crossReferenceTransitionText,
    /CROSS_REFERENCE_FUTURE_PATH_LIVE_ABSENCE_TRANSITION_COUNT:\n14/u,
  );
  assert.match(
    crossReferenceTransitionText,
    /CROSS_REFERENCE_RUNTIME_PATH_LIVE_ABSENCE_TRANSITION_COUNT:\n12/u,
  );
  assert.match(
    crossReferenceTransitionText,
    /CROSS_REFERENCE_PREREQUISITE_PATH_LIVE_ABSENCE_TRANSITION_COUNT:\n2/u,
  );
  assert.match(
    crossReferenceTransitionText,
    /TRACKED_DOCS_ONLY_CROSS_REFERENCE_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
});

test("two-file docs-only slice preserves release and no-conclusion boundaries", () => {
  const docsText = readRequired(docsPath);
  const expectedPaths = [
    docsPath,
    "tests/domain-human-review-declared-packet-review-gaps-cross-reference-semantics-boundary-doc-freeze.test.js",
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
