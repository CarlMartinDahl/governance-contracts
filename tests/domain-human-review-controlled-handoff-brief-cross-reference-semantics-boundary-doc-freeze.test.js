"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const crossReferenceProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_CROSS_REFERENCE_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const crossReferenceProofTransitionText = fs.readFileSync(
  path.join(repoRoot, crossReferenceProofTransitionPath),
  "utf8",
);
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_CROSS_REFERENCE_SEMANTICS_BOUNDARY_v1.md";
const resultSchemaPath =
  "schemas/human-review-controlled-handoff-brief-cross-reference-result.json";
const resultSchemaProofPath =
  "tests/human-review-controlled-handoff-brief-cross-reference-result-schema.test.js";
const resultSchemaProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_CROSS_REFERENCE_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const packageExportProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_CROSS_REFERENCE_RESULT_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const packageExportProofPath =
  "tests/human-review-controlled-handoff-brief-cross-reference-result-package-export.test.js";
const runtimeModulePath =
  "packages/governance/src/human-review-controlled-handoff-brief-cross-reference-validation-boundary.js";
const runtimeProofPath =
  "tests/human-review-controlled-handoff-brief-cross-reference-validation-boundary.test.js";
const futureFunctionName =
  "validateHumanReviewControlledHandoffBriefCrossReference";
const futurePackageExportName =
  "humanReviewControlledHandoffBriefCrossReferenceResult";
const controllingPaths = [
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_CONTRACT_BOUNDARY_v1.md",
  "schemas/human-review-controlled-handoff-brief.json",
  "schemas/human-review-controlled-handoff-brief-validator-result.json",
  "packages/schemas/src/human-review-controlled-handoff-brief-validator.js",
  "schemas/human-review-source-register.json",
  "packages/schemas/src/human-review-source-register-validator.js",
  "schemas/human-review-chronology.json",
  "packages/schemas/src/human-review-chronology-validator.js",
  "schemas/human-review-asserted-claim-matrix.json",
  "packages/schemas/src/human-review-asserted-claim-matrix-validator.js",
  "schemas/human-review-declared-packet-review-gaps.json",
  "packages/schemas/src/human-review-declared-packet-review-gaps-validator.js",
  "schemas/human-review-questions.json",
  "packages/schemas/src/human-review-questions-validator.js",
  "schemas/human-review-no-conclusion-notice.json",
  "packages/schemas/src/human-review-no-conclusion-notice-validator.js",
  "packages/schemas/src/index.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_SOURCE_REGISTER_CROSS_REFERENCE_SEMANTICS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_CROSS_REFERENCE_SEMANTICS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_CROSS_REFERENCE_SEMANTICS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_CROSS_REFERENCE_SEMANTICS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_CROSS_REFERENCE_SEMANTICS_BOUNDARY_v1.md",
  "packages/governance/src/human-review-questions-pre-controlled-handoff-validation-boundary.js",
  "packages/governance/src/human-review-no-conclusion-notice-pre-controlled-handoff-validation-boundary.js",
];
const resultSchemaCandidatePaths = [resultSchemaPath, resultSchemaProofPath];
const retainedAbsentFuturePaths = [
  runtimeModulePath,
  runtimeProofPath,
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

test("controlled handoff cross-reference semantics and controlling sources exist", () => {
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
    /HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_CROSS_REFERENCE_SEMANTICS_BOUNDARY/u,
  );
  assert.match(docsText, /DOCS_ONLY/u);
  assert.match(docsText, /OWNER_SELECTED_FIVE_STAGE_SEMANTICS_TRANSLATED/u);
  assert.match(
    docsText,
    /OWNER_APPROVED_STAGE_4_RESULT_FIELD_PRECEDENT_NORMALIZATION/u,
  );
  for (let stage = 1; stage <= 5; stage += 1) {
    assert.match(
      docsText,
      new RegExp(`OWNER_SELECTED_STAGE_${stage}_OPTION_A`, "u"),
    );
  }
});

test("sixteen decisions are closed at docs level only", () => {
  const docsText = readRequired(docsPath);
  const section = docsText.slice(
    docsText.indexOf("## 3. Sixteen Resolved Scope Decisions"),
    docsText.indexOf("## 4."),
  );

  assert.equal((section.match(/^\| (?:[1-9]|1[0-6]) \|/gmu) ?? []).length, 16);
  assert.match(docsText, /RESOLVED_CROSS_REFERENCE_SCOPE_DECISION_COUNT:\n16/u);
  assert.match(docsText, /OPEN_CROSS_REFERENCE_SCOPE_DECISION_COUNT:\n0/u);
  assert.match(docsText, /OWNER_SELECTED_STAGE_COUNT:\n5/u);
  assert.match(docsText, /RESULT_FIELD_PRECEDENT_NORMALIZATION_COUNT:\n1/u);
  assert.match(
    docsText,
    /RELEASE_BOUNDARY_DECISION:\nPRESERVED_AS_SEPARATE_HUMAN_PROFESSIONAL_GATE/u,
  );
  assert.match(
    docsText,
    /Resolution of these documentation decisions is not implementation authority/u,
  );
});

test("future envelope and six exact bindings are closed and ordered", () => {
  const docsText = readRequired(docsPath);
  const bindingSection = docsText.slice(
    docsText.indexOf("## 5. Exact Six Family-Bound Component Bindings"),
    docsText.indexOf("## 6."),
  );

  assert.match(
    docsText,
    new RegExp(`FUTURE_FUNCTION_NAME:\\n${futureFunctionName}`, "u"),
  );
  assert.match(docsText, /FUTURE_FUNCTION_ARITY:\n1/u);
  assert.match(
    docsText,
    /FUTURE_MODULE_PATH:\npackages\/governance\/src\/human-review-controlled-handoff-brief-cross-reference-validation-boundary\.js/u,
  );
  assert.match(docsText, /INPUT_ENVELOPE_FIELD_COUNT:\n2/u);
  assert.match(docsText, /COMPONENT_BINDING_FIELD_COUNT:\n6/u);
  assert.match(docsText, /COMPONENT_BINDING_OBJECT_FIELD_COUNT:\n2/u);
  for (const [position, field, referenceField] of [
    [1, "source_register", "source_register_ref"],
    [2, "review_chronology", "review_chronology_ref"],
    [3, "asserted_claim_matrix", "asserted_claim_matrix_ref"],
    [4, "declared_packet_review_gaps", "declared_packet_review_gaps_ref"],
    [5, "human_review_questions", "human_review_questions_ref"],
    [6, "no_conclusion_notice", "no_conclusion_notice_ref"],
  ]) {
    assert.equal(
      bindingSection.includes(
        "| " + position + " | `" + field + "` | `" + referenceField + "` |",
      ),
      true,
      field,
    );
  }
  for (const marker of [
    "GLOBAL_OUTPUT_CANDIDATE_REGISTRY:\nNONE",
    "PERSISTED_OUTPUT_CANDIDATE_REGISTRY:\nNONE",
    "REFERENCE_LOOKUP_OR_DISCOVERY:\nPROHIBITED",
  ]) {
    assert.match(docsText, new RegExp(marker, "u"));
  }
});

test("seven validators are same-call and predecessor checkpoints stay separate", () => {
  const docsText = readRequired(docsPath);
  const validationSection = docsText.slice(
    docsText.indexOf("## 6. Same-Call Seven-Candidate Structural Validation"),
    docsText.indexOf("## 7."),
  );

  for (const validatorName of [
    "validateHumanReviewControlledHandoffBrief",
    "validateHumanReviewSourceRegister",
    "validateHumanReviewChronology",
    "validateHumanReviewAssertedClaimMatrix",
    "validateHumanReviewDeclaredPacketReviewGaps",
    "validateHumanReviewQuestions",
    "validateHumanReviewNoConclusionNotice",
  ]) {
    assert.equal(
      validationSection.includes("`" + validatorName + "`"),
      true,
      validatorName,
    );
  }
  assert.match(docsText, /PREDECESSOR_CHECKPOINT_INVOCATION_COUNT:\n0/u);
  assert.match(docsText, /All seven validators are invoked/u);
  assert.match(docsText, /must not copy, translate, reorder, embed, persist, export, or\necho a child validator's error array/u);
});

test("packet and component comparisons are exact ordered and fail closed", () => {
  const docsText = readRequired(docsPath);

  for (const marker of [
    "PACKET_REFERENCE_ANCHOR:\nCONTROLLED_HANDOFF_BRIEF",
    "PACKET_REFERENCE_COMPARISON:\nEXACT_CASE_SENSITIVE_EQUALITY",
    "PACKET_REFERENCE_NORMALIZATION:\nPROHIBITED",
    "PACKET_MISMATCH_COMPONENT_REFERENCE_COMPARISON:\nPROHIBITED",
    "COMPONENT_REFERENCE_COMPARISON:\nEXACT_CASE_SENSITIVE_EQUALITY",
    "COMPONENT_REFERENCE_NORMALIZATION:\nPROHIBITED",
    "COMPONENT_REFERENCE_TOKEN_PARSING:\nPROHIBITED",
    "COMPONENT_FAMILY_AND_VERSION_AUTHORITY:\nFIELD_SPECIFIC_STRUCTURAL_VALIDATOR_ONLY",
  ]) {
    assert.match(docsText, new RegExp(marker, "u"));
  }

  for (const field of [
    "source_register",
    "review_chronology",
    "asserted_claim_matrix",
    "declared_packet_review_gaps",
    "human_review_questions",
    "no_conclusion_notice",
  ]) {
    assert.equal(
      docsText.includes(
        "`$.component_bindings." + field + ".candidate.packet_ref`",
      ),
      true,
      field + " packet path",
    );
    assert.equal(
      docsText.includes(
        "`$.component_bindings." + field + ".component_ref`",
      ),
      true,
      field + " component path",
    );
  }
});

test("precedent-normalized result ten codes and six phases are exact", () => {
  const docsText = readRequired(docsPath);
  const resultSection = docsText.slice(
    docsText.indexOf("## 9. Exact Future Result Contract"),
    docsText.indexOf("## 10."),
  );
  const errorSection = docsText.slice(
    docsText.indexOf("## 10. Exact Ten-Code Error Taxonomy"),
    docsText.indexOf("## 11."),
  );
  const phaseSection = docsText.slice(
    docsText.indexOf("## 11. Deterministic Six-Phase Execution"),
    docsText.indexOf("## 12."),
  );
  const errorCodes = [
    "invalid_input_shape",
    "human_review_controlled_handoff_brief_invalid",
    "source_register_invalid",
    "review_chronology_invalid",
    "asserted_claim_matrix_invalid",
    "declared_packet_review_gaps_invalid",
    "human_review_questions_invalid",
    "human_review_no_conclusion_notice_invalid",
    "packet_ref_mismatch",
    "component_ref_mismatch",
  ];

  for (const field of ["valid", "contractKind", "version", "errors"]) {
    assert.equal(resultSection.includes("`" + field + "`"), true, field);
  }
  assert.equal(resultSection.includes("`contract_id`"), false);
  assert.equal(resultSection.includes("`contract_version`"), false);
  assert.match(docsText, /CROSS_REFERENCE_RESULT_FIELD_COUNT:\n4/u);
  assert.match(
    docsText,
    /CROSS_REFERENCE_RESULT_CONTRACT_KIND:\nHUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_CROSS_REFERENCE_BOUNDARY/u,
  );
  assert.match(docsText, /CROSS_REFERENCE_RESULT_VERSION:\n1\.0\.0/u);
  assert.match(docsText, /CROSS_REFERENCE_ERROR_CODE_COUNT:\n10/u);
  for (const code of errorCodes) {
    assert.equal(errorSection.includes("`" + code + "`"), true, code);
  }
  assert.equal((phaseSection.match(/^\| [1-6] \|/gmu) ?? []).length, 6);
  assert.match(docsText, /CROSS_REFERENCE_EXECUTION_PHASE_COUNT:\n6/u);
  assert.match(docsText, /deduplicated by\nfirst occurrence/u);
  assert.match(docsText, /recursively frozen/u);
});

test("lifecycle remains ephemeral with no observability or release authority", () => {
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
  for (const marker of [
    "HANDOFF_APPROVAL_ASSEMBLY_EXPORT_DELIVERY_NOT_CREATED",
    "NO_DOMAIN_FINDING_SCORE_OR_CONCLUSION_CREATED",
    "NO_APPROVAL_OR_RELEASE_PRODUCT_IMPLEMENTATION_READINESS_CREATED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
  ]) {
    assert.match(docsText, new RegExp(marker, "u"));
  }
});

test("schema package and runtime paths are transition-anchored", () => {
  const docsText = readRequired(docsPath);
  const transitionText = readRequired(resultSchemaProofTransitionPath);
  const packageExportTransitionText = readRequired(
    packageExportProofTransitionPath,
  );
  const packageGovernance = require("../packages/governance/src/index.js");

  for (const candidatePath of resultSchemaCandidatePaths) {
    assert.equal(
      transitionText.includes("`" + candidatePath + "`"),
      true,
      candidatePath,
    );
    assert.equal(docsText.includes("`" + candidatePath + "`"), true, candidatePath);
  }
  for (const futurePath of retainedAbsentFuturePaths) {
    assert.equal(
      crossReferenceProofTransitionText.includes("\`" + futurePath + "\`"),
      true,
      futurePath,
    );
    assert.equal(docsText.includes("`" + futurePath + "`"), true, futurePath);
  }
  assert.equal(
    packageExportTransitionText.includes(futurePackageExportName),
    true,
  );
  assert.equal(
    packageExportTransitionText.includes("`" + packageExportProofPath + "`"),
    true,
  );
  assert.equal(Object.hasOwn(packageGovernance, futureFunctionName), false);
  assert.match(
    transitionText,
    /TRACKED_DOCS_ONLY_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
  assert.match(docsText, /RESULT_SCHEMA_PACKAGE_EXPORT_NOT_CREATED/u);
  assert.match(docsText, /CROSS_REFERENCE_CHECKPOINT_NOT_CREATED/u);
});

test("current slice is exactly docs and focused proof", () => {
  const docsText = readRequired(docsPath);

  assert.match(docsText, /CROSS_REFERENCE_SEMANTICS_SLICE_FILE_COUNT:\n2/u);
  assert.equal(docsText.includes("`" + docsPath + "`"), true);
  assert.equal(
    docsText.includes(
      "`tests/domain-human-review-controlled-handoff-brief-cross-reference-semantics-boundary-doc-freeze.test.js`",
    ),
    true,
  );
  assert.match(
    docsText,
    /TRACKED_DOCS_ONLY_OWNER_SELECTED_CROSS_REFERENCE_SEMANTICS_DEFINED/u,
  );
  assert.match(
    docsText,
    /not actual human review[\s\S]*real-evidence review/u,
  );
});
