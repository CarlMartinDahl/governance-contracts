"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_CROSS_REFERENCE_READINESS_BOUNDARY_v1.md";
const crossReferenceProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_CROSS_REFERENCE_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const controllingPaths = [
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_CONTRACT_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_SCHEMA_READINESS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_VALIDATOR_RESULT_SCHEMA_READINESS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_VALIDATOR_HELPER_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
  "schemas/human-review-no-conclusion-notice.json",
  "schemas/human-review-no-conclusion-notice-validator-result.json",
  "packages/schemas/src/human-review-no-conclusion-notice-validator.js",
  "tests/human-review-no-conclusion-notice-validator.test.js",
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
  "schemas/human-review-questions.json",
  "schemas/human-review-questions-validator-result.json",
  "packages/schemas/src/human-review-questions-validator.js",
  "packages/schemas/src/index.js",
  "packages/governance/src/human-review-source-register-pre-downstream-validation-boundary.js",
  "packages/governance/src/human-review-chronology-source-register-validation-boundary.js",
  "schemas/human-review-chronology-source-register-cross-reference-result.json",
  "packages/governance/src/human-review-asserted-claim-matrix-validation-boundary.js",
  "schemas/human-review-asserted-claim-matrix-cross-reference-result.json",
  "packages/governance/src/human-review-declared-packet-review-gaps-cross-reference-validation-boundary.js",
  "schemas/human-review-declared-packet-review-gaps-cross-reference-result.json",
  "packages/governance/src/human-review-questions-cross-reference-validation-boundary.js",
  "schemas/human-review-questions-cross-reference-result.json",
  "tests/human-review-source-register-pre-downstream-validation-boundary.test.js",
  "tests/human-review-chronology-source-register-validation-boundary.test.js",
  "tests/human-review-asserted-claim-matrix-validation-boundary.test.js",
  "tests/human-review-declared-packet-review-gaps-cross-reference-validation-boundary.test.js",
  "tests/human-review-questions-cross-reference-validation-boundary.test.js",
];
const futureCheckpointPaths = [
  "packages/governance/src/human-review-no-conclusion-notice-cross-reference-validation-boundary.js",
  "tests/human-review-no-conclusion-notice-cross-reference-validation-boundary.test.js",
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

test("no-conclusion notice cross-reference readiness boundary and sources exist", () => {
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
    /HUMAN_REVIEW_NO_CONCLUSION_NOTICE_CROSS_REFERENCE_READINESS_BOUNDARY/u,
  );
  assert.match(docsText, /DOCS_ONLY/u);
  assert.match(docsText, /PROVE_ONLY_FINDINGS_CAPTURED_AS_DOCS_ONLY/u);
  assert.match(docsText, /APPEND_ONLY_CROSS_REFERENCE_READINESS_ASSESSMENT/u);
});

test("twenty-five facts and six bounded checks remain non-implementing", () => {
  const docsText = readRequired(docsPath);
  const crossReferenceProofTransitionText = readRequired(
    crossReferenceProofTransitionPath,
  );

  assert.match(docsText, /CURRENT_CROSS_REFERENCE_READINESS_FACT_COUNT:\n25/u);
  assert.match(
    docsText,
    /BOUNDED_FUTURE_CROSS_REFERENCE_CHECK_COUNT:\n6/u,
  );
  assert.match(docsText, /TRACKED_FUTURE_CHECKPOINT_PATH_COUNT:\n2/u);
  assert.match(docsText, /CROSS_REFERENCE_RUNTIME_STATUS:\nNOT_CREATED/u);

  for (const futurePath of futureCheckpointPaths) {
    assert.equal(docsText.includes("`" + futurePath + "`"), true, futurePath);
    assert.equal(
      crossReferenceProofTransitionText.includes("`" + futurePath + "`"),
      true,
      futurePath,
    );
  }
  assert.match(
    crossReferenceProofTransitionText,
    /CROSS_REFERENCE_FUTURE_PATH_LIVE_ABSENCE_TRANSITION_COUNT:\n20/u,
  );
  assert.match(
    crossReferenceProofTransitionText,
    /TRACKED_DOCS_ONLY_CROSS_REFERENCE_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );

  for (const responsibility of [
    /packet-reference equality across the No-Conclusion Notice candidate,/u,
    /membership of every notice `source_ref` in the separately validated Source/u,
    /membership of every notice `chronology_entry_ref` in the separately/u,
    /membership of every notice `claim_ref` in the separately validated Asserted/u,
    /membership of every notice `gap_ref` in the separately validated Declared/u,
    /membership of every notice `question_ref` in the separately validated Human/u,
  ]) {
    assert.match(docsText, responsibility);
  }

  assert.match(
    docsText,
    /does not require\nimplementation, select a checkpoint contract, define a result contract, or\nmake predecessor checkpoints runtime dependencies/u,
  );
});

test("six validators stay unary with only two package function exports", () => {
  const noticeModule = require("../packages/schemas/src/human-review-no-conclusion-notice-validator.js");
  const questionsModule = require("../packages/schemas/src/human-review-questions-validator.js");
  const sourceModule = require("../packages/schemas/src/human-review-source-register-validator.js");
  const chronologyModule = require("../packages/schemas/src/human-review-chronology-validator.js");
  const matrixModule = require("../packages/schemas/src/human-review-asserted-claim-matrix-validator.js");
  const gapsModule = require("../packages/schemas/src/human-review-declared-packet-review-gaps-validator.js");
  const packageSchemas = require("../packages/schemas/src/index.js");

  const modules = [
    [noticeModule, "validateHumanReviewNoConclusionNotice"],
    [questionsModule, "validateHumanReviewQuestions"],
    [sourceModule, "validateHumanReviewSourceRegister"],
    [chronologyModule, "validateHumanReviewChronology"],
    [matrixModule, "validateHumanReviewAssertedClaimMatrix"],
    [gapsModule, "validateHumanReviewDeclaredPacketReviewGaps"],
  ];

  for (const [moduleValue, exportName] of modules) {
    assert.deepEqual(Object.keys(moduleValue), [exportName]);
    assert.equal(moduleValue[exportName].length, 1);
  }

  for (const [exportName, moduleValue] of [
    ["validateHumanReviewSourceRegister", sourceModule],
    ["validateHumanReviewChronology", chronologyModule],
  ]) {
    assert.strictEqual(packageSchemas[exportName], moduleValue[exportName]);
  }

  for (const exportName of [
    "validateHumanReviewNoConclusionNotice",
    "validateHumanReviewQuestions",
    "validateHumanReviewAssertedClaimMatrix",
    "validateHumanReviewDeclaredPacketReviewGaps",
  ]) {
    assert.equal(Object.hasOwn(packageSchemas, exportName), false, exportName);
  }

  for (const schemaExport of [
    "humanReviewNoConclusionNotice",
    "humanReviewNoConclusionNoticeValidatorResult",
    "humanReviewQuestions",
    "humanReviewQuestionsValidatorResult",
    "humanReviewQuestionsCrossReferenceResult",
    "humanReviewDeclaredPacketReviewGaps",
    "humanReviewDeclaredPacketReviewGapsValidatorResult",
    "humanReviewDeclaredPacketReviewGapsCrossReferenceResult",
    "humanReviewAssertedClaimMatrix",
    "humanReviewAssertedClaimMatrixValidatorResult",
    "humanReviewAssertedClaimMatrixCrossReferenceResult",
    "humanReviewChronology",
    "humanReviewChronologyValidatorResult",
    "humanReviewChronologySourceRegisterCrossReferenceResult",
    "humanReviewSourceRegister",
    "humanReviewSourceRegisterValidatorResult",
  ]) {
    assert.equal(Object.hasOwn(packageSchemas, schemaExport), true, schemaExport);
  }
});

test("five existing checkpoints remain direct-module precedents only", () => {
  const sourceCheckpoint = require("../packages/governance/src/human-review-source-register-pre-downstream-validation-boundary.js");
  const chronologyCheckpoint = require("../packages/governance/src/human-review-chronology-source-register-validation-boundary.js");
  const matrixCheckpoint = require("../packages/governance/src/human-review-asserted-claim-matrix-validation-boundary.js");
  const gapsCheckpoint = require("../packages/governance/src/human-review-declared-packet-review-gaps-cross-reference-validation-boundary.js");
  const questionsCheckpoint = require("../packages/governance/src/human-review-questions-cross-reference-validation-boundary.js");
  const packageGovernance = require("../packages/governance/src/index.js");
  const checkpoints = [
    [sourceCheckpoint, "validateHumanReviewSourceRegisterForDownstream"],
    [
      chronologyCheckpoint,
      "validateHumanReviewChronologySourceRegisterCrossReference",
    ],
    [matrixCheckpoint, "validateHumanReviewAssertedClaimMatrixCrossReference"],
    [
      gapsCheckpoint,
      "validateHumanReviewDeclaredPacketReviewGapsCrossReference",
    ],
    [questionsCheckpoint, "validateHumanReviewQuestionsCrossReference"],
  ];

  for (const [moduleValue, exportName] of checkpoints) {
    assert.deepEqual(Object.keys(moduleValue), [exportName]);
    assert.equal(moduleValue[exportName].length, 1);
    assert.equal(Object.hasOwn(packageGovernance, exportName), false, exportName);
  }
});

test("sixteen decisions block implementation without selecting semantics", () => {
  const docsText = readRequired(docsPath);

  assert.match(docsText, /OPEN_CROSS_REFERENCE_SCOPE_DECISION_COUNT:\n16/u);
  assert.match(
    docsText,
    /CROSS_REFERENCE_READINESS:\nBLOCKED_BY_EXACT_SEMANTICS_AND_RESULT_CONTRACT_DECISIONS/u,
  );
  assert.match(docsText, /No option is selected by this assessment/u);
  assert.match(docsText, /does not copy a\npredecessor result schema/u);
  assert.match(
    docsText,
    /smallest safe next slice is one `DOCS_ONLY` staged cross-reference\nsemantics matrix/u,
  );
  assert.match(
    docsText,
    /RELEASE_BOUNDARY_DECISION:\nPRESERVED_AS_SEPARATE_HUMAN_PROFESSIONAL_GATE/u,
  );
});

test("exact two-file readiness slice preserves non-implementation", () => {
  const docsText = readRequired(docsPath);
  const expectedPaths = [
    docsPath,
    "tests/domain-human-review-no-conclusion-notice-cross-reference-readiness-boundary-doc-freeze.test.js",
  ];

  assert.match(docsText, /CROSS_REFERENCE_READINESS_SLICE_FILE_COUNT:\n2/u);
  for (const expectedPath of expectedPaths) {
    assert.equal(docsText.includes("`" + expectedPath + "`"), true, expectedPath);
  }

  for (const marker of [
    "CROSS_REFERENCE_CHECKPOINT_NOT_CREATED",
    "CROSS_REFERENCE_RESULT_CONTRACT_NOT_DEFINED",
    "INPUT_AND_PREVALIDATION_PROOF_NOT_DEFINED",
    "ERROR_TAXONOMY_ORDERING_AND_RESULT_LIFECYCLE_NOT_DEFINED",
    "PERSISTENCE_API_ROUTE_PROVIDER_MODEL_UI_NOT_CREATED",
    "LOGGING_TELEMETRY_AUDIT_NOT_CREATED",
    "NO_REAL_PRIVATE_SOURCE_OR_CASE_MATERIAL_PROCESSED",
    "NO_DOMAIN_FINDING_SCORE_OR_CONCLUSION_CREATED",
    "NO_APPROVAL_OR_RELEASE_PRODUCT_IMPLEMENTATION_READINESS_CREATED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "TRACKED_DOCS_ONLY_CROSS_REFERENCE_READINESS_BLOCKED_BY_EXACT_SEMANTICS_AND_RESULT_CONTRACT_DECISIONS",
  ]) {
    assert.match(docsText, new RegExp(marker, "u"));
  }

  assert.match(
    docsText,
    /Human\/professional review\nremains the release gate/u,
  );
  assert.match(docsText, /not actual human review[\s\S]*real-evidence review/u);
});
