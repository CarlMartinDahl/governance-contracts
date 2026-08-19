"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const docsRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_CONTRACT_READINESS_BOUNDARY_v1.md";
const proofTransitionRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const validatorHelperProofTransitionRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const crossReferenceProofTransitionRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_CROSS_REFERENCE_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const productBoundaryRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_WORKSPACE_PUBLIC_SCOPE_ALIGNMENT_BOUNDARY_v1.md";
const reviewStateContractRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_STATE_MODEL_CONTRACT_v1.md";
const sourceRegisterCheckpointRelativePath =
  "packages/governance/src/human-review-source-register-pre-downstream-validation-boundary.js";
const chronologyValidatorRelativePath =
  "packages/schemas/src/human-review-chronology-validator.js";
const crossReferenceBoundaryRelativePath =
  "packages/governance/src/human-review-chronology-source-register-validation-boundary.js";
const controllingPaths = [
  "README.md",
  productBoundaryRelativePath,
  reviewStateContractRelativePath,
  "schemas/human-review-state-model.json",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_CONTRACT_BOUNDARY_v1.md",
  "schemas/human-review-source-register.json",
  "packages/schemas/src/human-review-source-register-validator.js",
  sourceRegisterCheckpointRelativePath,
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_CONTRACT_BOUNDARY_v1.md",
  "schemas/human-review-chronology.json",
  chronologyValidatorRelativePath,
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_SOURCE_REGISTER_CROSS_REFERENCE_SEMANTICS_BOUNDARY_v1.md",
  "schemas/human-review-chronology-source-register-cross-reference-result.json",
  crossReferenceBoundaryRelativePath,
  "tests/human-review-chronology-source-register-validation-boundary.test.js",
];
const candidateSchemaPaths = [
  "schemas/human-review-asserted-claim-matrix.json",
  "tests/human-review-asserted-claim-matrix-schema.test.js",
];
const historicalValidatorHelperPath =
  "packages/schemas/src/human-review-asserted-claim-matrix-validator.js";
const retainedAbsentGovernancePaths = [
  "packages/governance/src/human-review-asserted-claim-matrix-validation-boundary.js",
];
const reviewStates = [
  "ASSERTED",
  "APPEARS_IN_SUPPLIED_MATERIAL",
  "NOT_ESTABLISHED",
  "HUMAN_REVIEW_REQUIRED",
];

function readRequired(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  assert.equal(fs.existsSync(absolutePath), true, `expected ${relativePath}`);
  return fs.readFileSync(absolutePath, "utf8");
}

test("asserted-claim-matrix readiness boundary and controlling sources exist", () => {
  const docsText = readRequired(docsRelativePath);

  for (const sourcePath of controllingPaths) {
    readRequired(sourcePath);
    assert.equal(docsText.includes(`\`${sourcePath}\``), true, sourcePath);
  }

  assert.match(
    docsText,
    /HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_CONTRACT_READINESS_BOUNDARY/u,
  );
  assert.match(docsText, /PROVE_ONLY_FINDINGS_CAPTURED_AS_DOCS_ONLY/u);
  assert.match(
    docsText,
    /APPEND_ONLY_ASSERTED_CLAIM_MATRIX_CONTRACT_READINESS_ASSESSMENT/u,
  );
});

test("product boundary freezes claim-matrix purpose without machine shape", () => {
  const productText = readRequired(productBoundaryRelativePath);

  assert.match(productText, /`ASSERTED_CLAIM_MATRIX`/u);
  assert.match(
    productText,
    /Keep asserted claims separate from what appears in the supplied material/u,
  );
  assert.match(productText, /`ASSERTED`/u);
  assert.match(productText, /`APPEARS_IN_SUPPLIED_MATERIAL`/u);
  assert.match(productText, /without model endorsement/u);
  assert.match(
    productText,
    /does not authorize raw replay, private paths, filenames, URLs,\s+tokens/u,
  );
});

test("tracked structural prerequisites remain bounded", () => {
  const sourceRegisterCheckpoint = require(path.join(
    repoRoot,
    sourceRegisterCheckpointRelativePath,
  ));
  const chronologyValidator = require(path.join(
    repoRoot,
    chronologyValidatorRelativePath,
  ));
  const crossReferenceBoundary = require(path.join(
    repoRoot,
    crossReferenceBoundaryRelativePath,
  ));

  assert.deepEqual(Object.keys(sourceRegisterCheckpoint), [
    "validateHumanReviewSourceRegisterForDownstream",
  ]);
  assert.deepEqual(Object.keys(chronologyValidator), [
    "validateHumanReviewChronology",
  ]);
  assert.deepEqual(Object.keys(crossReferenceBoundary), [
    "validateHumanReviewChronologySourceRegisterCrossReference",
  ]);
  assert.equal(
    crossReferenceBoundary
      .validateHumanReviewChronologySourceRegisterCrossReference.length,
    1,
  );
});

test("review-state vocabulary remains exact and separate", () => {
  const contractText = readRequired(reviewStateContractRelativePath);
  const schema = require("../schemas/human-review-state-model.json");
  const packageSchemas = require("../packages/schemas/src/index.js");

  assert.deepEqual(schema.required, ["review_state"]);
  assert.deepEqual(schema.properties.review_state.enum, reviewStates);
  assert.strictEqual(packageSchemas.humanReviewStateModel, schema);
  assert.match(contractText, /classify review posture only/u);
  assert.match(
    contractText,
    /creates no automatic mapping, conversion, equivalence, dispatch/u,
  );
});

test("candidate schema paths transition while helper history and governance reservation stay bounded", () => {
  const proofTransitionText = readRequired(proofTransitionRelativePath);
  const validatorHelperProofTransitionText = readRequired(
    validatorHelperProofTransitionRelativePath,
  );
  const crossReferenceProofTransitionText = readRequired(
    crossReferenceProofTransitionRelativePath,
  );

  for (const [index, relativePath] of candidateSchemaPaths.entries()) {
    const expectedRow =
      `| ${index + 1} | \`${relativePath}\` | ` +
      "`PERMITTED_FOR_SEPARATE_LATER_CONTRACT_ONLY_SLICE` |";
    assert.equal(proofTransitionText.includes(expectedRow), true, relativePath);
  }
  for (const relativePath of retainedAbsentGovernancePaths) {
    assert.equal(
      crossReferenceProofTransitionText.includes(`\`${relativePath}\``),
      true,
      relativePath,
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
  assert.match(proofTransitionText, /CANDIDATE_SCHEMA_PATH_TRANSITION_COUNT:\n2/u);
  assert.match(proofTransitionText, /RETAINED_LATER_SIBLING_ABSENCE_COUNT:\n4/u);
  assert.equal(
    validatorHelperProofTransitionText.includes(`\`${historicalValidatorHelperPath}\``),
    true,
  );
  assert.match(
    validatorHelperProofTransitionText,
    /VALIDATOR_HELPER_PATH_LIVE_ABSENCE_TRANSITION_COUNT:\n10/u,
  );
  assert.match(
    validatorHelperProofTransitionText,
    /RETAINED_CROSS_REFERENCE_CHECKPOINT_ABSENCE_COUNT:\n1/u,
  );
});

test("fifteen current facts and twenty-four readiness rows remain non-implementing", () => {
  const docsText = readRequired(docsRelativePath);
  const factsSection = docsText.slice(
    docsText.indexOf("## 3. Current Tracked Facts"),
    docsText.indexOf("## 4."),
  );
  const readinessSection = docsText.slice(
    docsText.indexOf("## 4. Readiness Matrix"),
    docsText.indexOf("## 5."),
  );

  assert.equal((factsSection.match(/^\| \d+ \|/gmu) ?? []).length, 15);
  assert.equal(
    (
      readinessSection.match(
        /^\| (?!Readiness surface|---)[^|]+ \| `[^`]+` \|$/gmu,
      ) ?? []
    ).length,
    24,
  );
  assert.match(
    docsText,
    /CURRENT_ASSERTED_CLAIM_MATRIX_CONTRACT_READINESS_FACT_COUNT:\n15/u,
  );
  assert.match(
    docsText,
    /ASSERTED_CLAIM_MATRIX_CONTRACT_STATUS:\nNOT_DEFINED/u,
  );
  assert.match(
    docsText,
    /ASSERTED_CLAIM_MATRIX_SCHEMA_STATUS:\nNOT_CREATED/u,
  );
  assert.match(
    docsText,
    /ASSERTED_CLAIM_MATRIX_RUNTIME_STATUS:\nNOT_CREATED/u,
  );
  assert.match(
    docsText,
    /ASSERTED_CLAIM_MATRIX_CONTRACT_READINESS:\nBLOCKED_BY_EXACT_CONTRACT_DECISIONS/u,
  );
});

test("sixteen decisions precede one docs-only claim-matrix scaffold", () => {
  const docsText = readRequired(docsRelativePath);
  const section = docsText.slice(
    docsText.indexOf("## 5. Sixteen Open Contract Decisions"),
    docsText.indexOf("## 6."),
  );

  assert.equal((section.match(/^\| \d+ \|/gmu) ?? []).length, 16);
  assert.match(
    docsText,
    /OPEN_ASSERTED_CLAIM_MATRIX_CONTRACT_DECISION_COUNT:\n16/u,
  );
  assert.match(section, /asserted representation/u);
  assert.match(section, /supplied-material observation/u);
  assert.match(section, /Source Register references/u);
  assert.match(section, /Review Chronology relationship/u);
  assert.match(section, /conflict and gap partition/u);
  assert.match(section, /prohibited semantics/u);
  assert.match(
    docsText,
    /one `DOCS_ONLY` asserted-claim-matrix contract/u,
  );
  assert.match(docsText, /must not create a schema, validator, parser/u);
});

test("claim-matrix readiness preserves data and no-conclusion boundaries", () => {
  const docsText = readRequired(docsRelativePath);

  for (const marker of [
    "ASSERTED_CLAIM_MATRIX_CONTRACT_NOT_DEFINED",
    "ASSERTED_CLAIM_MATRIX_SCHEMA_NOT_CREATED",
    "ASSERTED_CLAIM_MATRIX_VALIDATOR_NOT_CREATED",
    "ASSERTED_CLAIM_MATRIX_PACKAGE_EXPORT_NOT_CREATED",
    "ASSERTED_CLAIM_MATRIX_RUNTIME_NOT_CREATED",
    "NO_AUTOMATIC_CLAIM_EXTRACTION_OR_ENDORSEMENT_CREATED",
    "REAL_PRIVATE_SOURCE_MATERIAL_USE_NOT_AUTHORIZED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
  ]) {
    assert.equal(docsText.includes(marker), true, marker);
  }

  assert.match(docsText, /create no automatic claim extraction/u);
  assert.match(docsText, /not actual human review, professional review, legal/u);
  assert.match(
    docsText,
    /TRACKED_DOCS_ONLY_ASSERTED_CLAIM_MATRIX_CONTRACT_READINESS_BLOCKED_BY_EXACT_DECISIONS/u,
  );
});
