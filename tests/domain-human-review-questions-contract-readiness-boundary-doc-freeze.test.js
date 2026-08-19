"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_CONTRACT_READINESS_BOUNDARY_v1.md";
const productBoundaryPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_WORKSPACE_PUBLIC_SCOPE_ALIGNMENT_BOUNDARY_v1.md";
const corpusPath =
  "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_CORPUS_BOUNDARY_v1.md";
const taxonomyPath =
  "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_CORPUS_FOUR_FIELD_RESPONSE_TAXONOMY_PARTITION_BOUNDARY_v1.md";
const resultEnvelopeBoundaryPath =
  "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_CONTRACT_BOUNDARY_v1.md";
const resultEnvelopeSchemaPath =
  "schemas/controlled-synthetic-red-team-result-envelope.json";
const controllingPaths = [
  "README.md",
  productBoundaryPath,
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_STATE_MODEL_CONTRACT_v1.md",
  "schemas/human-review-state-model.json",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_CONTRACT_BOUNDARY_v1.md",
  "schemas/human-review-source-register.json",
  "packages/schemas/src/human-review-source-register-validator.js",
  "packages/governance/src/human-review-source-register-pre-downstream-validation-boundary.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_CONTRACT_BOUNDARY_v1.md",
  "schemas/human-review-chronology.json",
  "packages/schemas/src/human-review-chronology-validator.js",
  "packages/governance/src/human-review-chronology-source-register-validation-boundary.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_CONTRACT_BOUNDARY_v1.md",
  "schemas/human-review-asserted-claim-matrix.json",
  "packages/schemas/src/human-review-asserted-claim-matrix-validator.js",
  "packages/governance/src/human-review-asserted-claim-matrix-validation-boundary.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_CONTRACT_BOUNDARY_v1.md",
  "schemas/human-review-declared-packet-review-gaps.json",
  "packages/schemas/src/human-review-declared-packet-review-gaps-validator.js",
  "packages/governance/src/human-review-declared-packet-review-gaps-cross-reference-validation-boundary.js",
  corpusPath,
  taxonomyPath,
  resultEnvelopeBoundaryPath,
  resultEnvelopeSchemaPath,
];

function readRequired(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  assert.equal(fs.existsSync(absolutePath), true, `expected ${relativePath}`);
  return fs.readFileSync(absolutePath, "utf8");
}

test("Human Review Questions readiness boundary and every source exist", () => {
  const docsText = readRequired(docsPath);

  for (const controllingPath of controllingPaths) {
    readRequired(controllingPath);
    assert.equal(
      docsText.includes("`" + controllingPath + "`"),
      true,
      controllingPath,
    );
  }

  for (const marker of [
    "HUMAN_REVIEW_QUESTIONS_CONTRACT_READINESS_BOUNDARY",
    "DOCS_ONLY",
    "PROVE_ONLY_FINDINGS_CAPTURED_AS_DOCS_ONLY",
    "APPEND_ONLY_HUMAN_REVIEW_QUESTIONS_CONTRACT_READINESS_ASSESSMENT",
    "CONTROLLED_SYNTHETIC_RED_TEAM_OUTPUT_LABEL_PRECEDENT_ONLY",
  ]) {
    assert.match(docsText, new RegExp(marker, "u"));
  }
});

test("product boundary freezes output order language and human control", () => {
  const productText = readRequired(productBoundaryPath);
  const docsText = readRequired(docsPath);
  const outputFamilies = [
    "SOURCE_REGISTER",
    "REVIEW_CHRONOLOGY",
    "ASSERTED_CLAIM_MATRIX",
    "DECLARED_PACKET_REVIEW_GAPS",
    "HUMAN_REVIEW_QUESTIONS",
    "NO_CONCLUSION_NOTICE",
    "CONTROLLED_HANDOFF_BRIEF",
  ];
  let previousIndex = -1;

  for (const outputFamily of outputFamilies) {
    const index = productText.indexOf("`" + outputFamily + "`");
    assert.equal(index > previousIndex, true, outputFamily);
    previousIndex = index;
  }

  assert.match(productText, /possible human review question/u);
  assert.match(productText, /Every output remains a proposal for human review/u);
  assert.match(
    productText,
    /must stop or reframe requests to:[\s\S]*legal merit/u,
  );
  assert.match(
    docsText,
    /listed immediately after `DECLARED_PACKET_REVIEW_GAPS`/u,
  );
});

test("four prerequisite output chains remain direct bounded checkpoints", () => {
  const checkpointExpectations = [
    [
      "../packages/governance/src/human-review-source-register-pre-downstream-validation-boundary.js",
      "validateHumanReviewSourceRegisterForDownstream",
    ],
    [
      "../packages/governance/src/human-review-chronology-source-register-validation-boundary.js",
      "validateHumanReviewChronologySourceRegisterCrossReference",
    ],
    [
      "../packages/governance/src/human-review-asserted-claim-matrix-validation-boundary.js",
      "validateHumanReviewAssertedClaimMatrixCrossReference",
    ],
    [
      "../packages/governance/src/human-review-declared-packet-review-gaps-cross-reference-validation-boundary.js",
      "validateHumanReviewDeclaredPacketReviewGapsCrossReference",
    ],
  ];
  const governanceIndex = require("../packages/governance/src/index.js");

  for (const [modulePath, functionName] of checkpointExpectations) {
    const checkpoint = require(modulePath);
    assert.deepEqual(Object.keys(checkpoint), [functionName]);
    assert.equal(typeof checkpoint[functionName], "function");
    assert.equal(Object.hasOwn(governanceIndex, functionName), false);
  }
});

test("synthetic output labels remain separate control precedent only", () => {
  const docsText = readRequired(docsPath);
  const corpusText = readRequired(corpusPath);
  const taxonomyText = readRequired(taxonomyPath);
  const resultBoundaryText = readRequired(resultEnvelopeBoundaryPath);
  const resultSchemaText = readRequired(resultEnvelopeSchemaPath);

  for (const sourceText of [
    corpusText,
    taxonomyText,
    resultBoundaryText,
    resultSchemaText,
  ]) {
    assert.match(sourceText, /HUMAN_REVIEW_QUESTIONS/u);
  }

  assert.match(taxonomyText, /STOPPED_NO_CONCLUSION/u);
  assert.match(taxonomyText, /ANSWERED_WITHIN_BOUNDARY/u);
  assert.match(docsText, /output-label precedent\nonly/u);
  assert.match(
    docsText,
    /None defines a Human Review Questions\nproduct contract/u,
  );
  assert.match(
    docsText,
    /do not import synthetic `outputType`, `actionClass`, `escalationTarget`, or `safeNextAction`/u,
  );
});

test("eighteen current facts and thirty readiness rows stay non-implementing", () => {
  const docsText = readRequired(docsPath);
  const factsSection = docsText.slice(
    docsText.indexOf("## 3. Current Tracked Facts"),
    docsText.indexOf("## 4."),
  );
  const readinessSection = docsText.slice(
    docsText.indexOf("## 4. Readiness Matrix"),
    docsText.indexOf("## 5."),
  );

  assert.equal((factsSection.match(/^\| \d+ \|/gmu) ?? []).length, 18);
  assert.equal(
    (
      readinessSection.match(
        /^\| (?!Readiness surface|---)[^|]+ \| `[^`]+` \|$/gmu,
      ) ?? []
    ).length,
    30,
  );
  assert.match(
    docsText,
    /CURRENT_HUMAN_REVIEW_QUESTIONS_CONTRACT_READINESS_FACT_COUNT:\n18/u,
  );
  assert.match(
    docsText,
    /HUMAN_REVIEW_QUESTIONS_CONTRACT_STATUS:\nNOT_DEFINED/u,
  );
  assert.match(
    docsText,
    /HUMAN_REVIEW_QUESTIONS_SCHEMA_STATUS:\nNOT_CREATED/u,
  );
  assert.match(
    docsText,
    /HUMAN_REVIEW_QUESTIONS_DERIVATION_STATUS:\nNOT_DEFINED/u,
  );
  assert.match(
    docsText,
    /HUMAN_REVIEW_QUESTIONS_RUNTIME_STATUS:\nNOT_CREATED/u,
  );
  assert.match(
    docsText,
    /HUMAN_REVIEW_QUESTIONS_CONTRACT_READINESS:\nBLOCKED_BY_EXACT_CONTRACT_REFERENCE_AND_LIFECYCLE_DECISIONS/u,
  );
});

test("nineteen decisions precede one staged Owner semantics boundary", () => {
  const docsText = readRequired(docsPath);
  const section = docsText.slice(
    docsText.indexOf("## 5. Nineteen Open Contract Decisions"),
    docsText.indexOf("## 6."),
  );

  assert.equal((section.match(/^\| \d+ \|/gmu) ?? []).length, 19);
  assert.match(
    docsText,
    /OPEN_HUMAN_REVIEW_QUESTIONS_CONTRACT_DECISION_COUNT:\n19/u,
  );
  for (const requiredDecision of [
    "bounded question text",
    "origin and attribution",
    "purpose taxonomy",
    "Source Register references",
    "Review Chronology references",
    "Asserted Claim Matrix references",
    "Declared Gaps references",
    "posture vocabularies",
    "answer lifecycle",
    "prohibited semantics",
    "validation and ownership",
  ]) {
    assert.equal(section.includes(requiredDecision), true, requiredDecision);
  }
  assert.match(
    docsText,
    /smallest safe next slice is one staged `DOCS_ONLY` Human Review Questions\nsemantics decision boundary/u,
  );
  assert.match(docsText, /explicit Owner selections/u);
  assert.match(docsText, /must not create a contract, schema, validator/u);
});

test("exact two-file readiness slice preserves adjacent output families", () => {
  const docsText = readRequired(docsPath);
  const expectedPaths = [
    docsPath,
    "tests/domain-human-review-questions-contract-readiness-boundary-doc-freeze.test.js",
  ];

  assert.match(
    docsText,
    /HUMAN_REVIEW_QUESTIONS_CONTRACT_READINESS_SLICE_FILE_COUNT:\n2/u,
  );
  for (const expectedPath of expectedPaths) {
    assert.equal(docsText.includes("`" + expectedPath + "`"), true);
  }
  for (const adjacentFamily of [
    "NO_CONCLUSION_NOTICE",
    "CONTROLLED_HANDOFF_BRIEF",
  ]) {
    assert.equal(docsText.includes("`" + adjacentFamily + "`"), true);
  }
});

test("readiness preserves non-implementation and no-conclusion boundaries", () => {
  const docsText = readRequired(docsPath);

  for (const marker of [
    "HUMAN_REVIEW_QUESTIONS_CONTRACT_NOT_DEFINED",
    "HUMAN_REVIEW_QUESTIONS_SCHEMA_NOT_CREATED",
    "HUMAN_REVIEW_QUESTIONS_VALIDATOR_NOT_CREATED",
    "HUMAN_REVIEW_QUESTIONS_PACKAGE_EXPORT_NOT_CREATED",
    "HUMAN_REVIEW_QUESTIONS_DERIVATION_NOT_DEFINED",
    "HUMAN_REVIEW_QUESTIONS_RUNTIME_NOT_CREATED",
    "NO_AUTOMATIC_QUESTION_GENERATION_OR_LEGAL_ANALYSIS_CREATED",
    "REAL_PRIVATE_SOURCE_MATERIAL_USE_NOT_AUTHORIZED",
    "NO_DOMAIN_FINDING_SCORE_OR_CONCLUSION_CREATED",
    "NO_APPROVAL_OR_RELEASE_PRODUCT_IMPLEMENTATION_READINESS_CREATED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "TRACKED_DOCS_ONLY_HUMAN_REVIEW_QUESTIONS_CONTRACT_READINESS_BLOCKED_BY_EXACT_DECISIONS",
  ]) {
    assert.match(docsText, new RegExp(marker, "u"));
  }

  assert.match(docsText, /Human\/professional review\nremains the release gate/u);
  assert.match(docsText, /not actual human review[\s\S]*real-evidence review/u);
});
