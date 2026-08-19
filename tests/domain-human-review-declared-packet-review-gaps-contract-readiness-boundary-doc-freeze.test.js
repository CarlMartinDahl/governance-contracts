"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_CONTRACT_READINESS_BOUNDARY_v1.md";
const productBoundaryPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_WORKSPACE_PUBLIC_SCOPE_ALIGNMENT_BOUNDARY_v1.md";
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
  "tests/human-review-chronology-source-register-validation-boundary.test.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_CONTRACT_BOUNDARY_v1.md",
  "schemas/human-review-asserted-claim-matrix.json",
  "packages/schemas/src/human-review-asserted-claim-matrix-validator.js",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_CROSS_REFERENCE_SEMANTICS_BOUNDARY_v1.md",
  "schemas/human-review-asserted-claim-matrix-cross-reference-result.json",
  "packages/governance/src/human-review-asserted-claim-matrix-validation-boundary.js",
  "tests/human-review-asserted-claim-matrix-validation-boundary.test.js",
];

function readRequired(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  assert.equal(fs.existsSync(absolutePath), true, `expected ${relativePath}`);
  return fs.readFileSync(absolutePath, "utf8");
}

test("declared packet review gaps readiness boundary and every source exist", () => {
  const docsText = readRequired(docsPath);

  for (const controllingPath of controllingPaths) {
    readRequired(controllingPath);
    assert.equal(docsText.includes("`" + controllingPath + "`"), true, controllingPath);
  }

  assert.match(
    docsText,
    /HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_CONTRACT_READINESS_BOUNDARY/u,
  );
  assert.match(docsText, /DOCS_ONLY/u);
  assert.match(docsText, /PROVE_ONLY_FINDINGS_CAPTURED_AS_DOCS_ONLY/u);
  assert.match(
    docsText,
    /APPEND_ONLY_DECLARED_PACKET_REVIEW_GAPS_CONTRACT_READINESS_ASSESSMENT/u,
  );
});

test("product boundary freezes output order language separation and human control", () => {
  const productText = readRequired(productBoundaryPath);
  const docsText = readRequired(docsPath);

  for (const outputFamily of [
    "SOURCE_REGISTER",
    "REVIEW_CHRONOLOGY",
    "ASSERTED_CLAIM_MATRIX",
    "DECLARED_PACKET_REVIEW_GAPS",
    "HUMAN_REVIEW_QUESTIONS",
    "NO_CONCLUSION_NOTICE",
    "CONTROLLED_HANDOFF_BRIEF",
  ]) {
    assert.match(productText, new RegExp("`" + outputFamily + "`", "u"));
  }
  assert.match(productText, /declared packet\/review gap/u);
  assert.match(productText, /Every output remains a proposal for human review/u);
  assert.match(productText, /must\s+not be converted into probability, credibility/u);
  assert.match(docsText, /listed immediately after `ASSERTED_CLAIM_MATRIX`/u);
});

test("three prerequisite output chains expose only bounded internal checkpoints", () => {
  const sourceCheckpoint = require("../packages/governance/src/human-review-source-register-pre-downstream-validation-boundary.js");
  const chronologyCheckpoint = require("../packages/governance/src/human-review-chronology-source-register-validation-boundary.js");
  const matrixCheckpoint = require("../packages/governance/src/human-review-asserted-claim-matrix-validation-boundary.js");
  const governanceIndex = require("../packages/governance/src/index.js");

  assert.deepEqual(Object.keys(sourceCheckpoint), [
    "validateHumanReviewSourceRegisterForDownstream",
  ]);
  assert.deepEqual(Object.keys(chronologyCheckpoint), [
    "validateHumanReviewChronologySourceRegisterCrossReference",
  ]);
  assert.deepEqual(Object.keys(matrixCheckpoint), [
    "validateHumanReviewAssertedClaimMatrixCrossReference",
  ]);
  for (const functionName of [
    "validateHumanReviewSourceRegisterForDownstream",
    "validateHumanReviewChronologySourceRegisterCrossReference",
    "validateHumanReviewAssertedClaimMatrixCrossReference",
  ]) {
    assert.equal(Object.hasOwn(governanceIndex, functionName), false, functionName);
  }
});

test("sixteen current facts and twenty-seven readiness rows remain non-implementing", () => {
  const docsText = readRequired(docsPath);
  const factsSection = docsText.slice(
    docsText.indexOf("## 3. Current Tracked Facts"),
    docsText.indexOf("## 4."),
  );
  const readinessSection = docsText.slice(
    docsText.indexOf("## 4. Readiness Matrix"),
    docsText.indexOf("## 5."),
  );

  assert.equal((factsSection.match(/^\| \d+ \|/gmu) ?? []).length, 16);
  assert.equal(
    (
      readinessSection.match(
        /^\| (?!Readiness surface|---)[^|]+ \| `[^`]+` \|$/gmu,
      ) ?? []
    ).length,
    27,
  );
  assert.match(
    docsText,
    /CURRENT_DECLARED_PACKET_REVIEW_GAPS_CONTRACT_READINESS_FACT_COUNT:\n16/u,
  );
  assert.match(
    docsText,
    /DECLARED_PACKET_REVIEW_GAPS_CONTRACT_STATUS:\nNOT_DEFINED/u,
  );
  assert.match(
    docsText,
    /DECLARED_PACKET_REVIEW_GAPS_SCHEMA_STATUS:\nNOT_CREATED/u,
  );
  assert.match(
    docsText,
    /DECLARED_PACKET_REVIEW_GAPS_DERIVATION_STATUS:\nNOT_DEFINED/u,
  );
  assert.match(
    docsText,
    /DECLARED_PACKET_REVIEW_GAPS_RUNTIME_STATUS:\nNOT_CREATED/u,
  );
  assert.match(
    docsText,
    /DECLARED_PACKET_REVIEW_GAPS_CONTRACT_READINESS:\nBLOCKED_BY_EXACT_CONTRACT_AND_DERIVATION_DECISIONS/u,
  );
});

test("eighteen decisions precede one staged docs-only semantics boundary", () => {
  const docsText = readRequired(docsPath);
  const section = docsText.slice(
    docsText.indexOf("## 5. Eighteen Open Contract And Derivation Decisions"),
    docsText.indexOf("## 6."),
  );

  assert.equal((section.match(/^\| \d+ \|/gmu) ?? []).length, 18);
  assert.match(
    docsText,
    /OPEN_DECLARED_PACKET_REVIEW_GAPS_CONTRACT_DECISION_COUNT:\n18/u,
  );
  for (const requiredDecision of [
    "category taxonomy",
    "declaration origin",
    "packet relationship",
    "Source Register references",
    "Review Chronology references",
    "Asserted Claim Matrix references",
    "derivation trigger",
    "prohibited semantics",
    "validation and ownership",
  ]) {
    assert.equal(section.includes(requiredDecision), true, requiredDecision);
  }
  assert.match(
    docsText,
    /smallest safe next slice is one staged `DOCS_ONLY` declared-packet-review-\ngaps semantics decision boundary/u,
  );
  assert.match(docsText, /explicit Owner selections/u);
  assert.match(docsText, /must not create a contract, schema, validator/u);
});

test("exact two-file readiness slice preserves adjacent output families", () => {
  const docsText = readRequired(docsPath);
  const expectedPaths = [
    docsPath,
    "tests/domain-human-review-declared-packet-review-gaps-contract-readiness-boundary-doc-freeze.test.js",
  ];

  assert.match(
    docsText,
    /DECLARED_PACKET_REVIEW_GAPS_CONTRACT_READINESS_SLICE_FILE_COUNT:\n2/u,
  );
  for (const expectedPath of expectedPaths) {
    assert.equal(docsText.includes("`" + expectedPath + "`"), true, expectedPath);
  }
  for (const adjacentFamily of [
    "HUMAN_REVIEW_QUESTIONS",
    "NO_CONCLUSION_NOTICE",
    "CONTROLLED_HANDOFF_BRIEF",
  ]) {
    assert.equal(docsText.includes("`" + adjacentFamily + "`"), true, adjacentFamily);
  }
});

test("readiness preserves data non-implementation and no-conclusion boundaries", () => {
  const docsText = readRequired(docsPath);

  for (const marker of [
    "DECLARED_PACKET_REVIEW_GAPS_CONTRACT_NOT_DEFINED",
    "DECLARED_PACKET_REVIEW_GAPS_SCHEMA_NOT_CREATED",
    "DECLARED_PACKET_REVIEW_GAPS_VALIDATOR_NOT_CREATED",
    "DECLARED_PACKET_REVIEW_GAPS_PACKAGE_EXPORT_NOT_CREATED",
    "DECLARED_PACKET_REVIEW_GAPS_DERIVATION_NOT_DEFINED",
    "DECLARED_PACKET_REVIEW_GAPS_RUNTIME_NOT_CREATED",
    "NO_AUTOMATIC_GAP_INFERENCE_OR_SEVERITY_CREATED",
    "REAL_PRIVATE_SOURCE_MATERIAL_USE_NOT_AUTHORIZED",
    "NO_DOMAIN_FINDING_SCORE_OR_CONCLUSION_CREATED",
    "NO_APPROVAL_OR_RELEASE_PRODUCT_IMPLEMENTATION_READINESS_CREATED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "TRACKED_DOCS_ONLY_DECLARED_PACKET_REVIEW_GAPS_CONTRACT_READINESS_BLOCKED_BY_EXACT_DECISIONS",
  ]) {
    assert.match(docsText, new RegExp(marker, "u"));
  }

  assert.match(docsText, /Human\/professional review remains the release\ngate/u);
  assert.match(docsText, /not actual human review[\s\S]*real-evidence review/u);
});
