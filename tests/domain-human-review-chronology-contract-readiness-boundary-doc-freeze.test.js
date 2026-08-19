"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const docsRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_CONTRACT_READINESS_BOUNDARY_v1.md";
const productBoundaryRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_WORKSPACE_PUBLIC_SCOPE_ALIGNMENT_BOUNDARY_v1.md";
const reviewStateContractRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_STATE_MODEL_CONTRACT_v1.md";
const reviewStateSchemaRelativePath = "schemas/human-review-state-model.json";
const sourceRegisterContractRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_CONTRACT_BOUNDARY_v1.md";
const sourceRegisterConsumerDocsRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_VALIDATOR_CONSUMER_IMPLEMENTATION_SEMANTICS_BOUNDARY_v1.md";
const sourceRegisterCheckpointRelativePath =
  "packages/governance/src/human-review-source-register-pre-downstream-validation-boundary.js";
const controllingPaths = [
  "README.md",
  productBoundaryRelativePath,
  reviewStateContractRelativePath,
  reviewStateSchemaRelativePath,
  sourceRegisterContractRelativePath,
  "schemas/human-review-source-register.json",
  "schemas/human-review-source-register-validator-result.json",
  "packages/schemas/src/human-review-source-register-validator.js",
  sourceRegisterConsumerDocsRelativePath,
  sourceRegisterCheckpointRelativePath,
  "tests/domain-human-review-workspace-public-scope-alignment-boundary-doc-freeze.test.js",
  "tests/human-review-state-schema.test.js",
  "tests/human-review-source-register-pre-downstream-validation-boundary.test.js",
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

test("chronology readiness boundary and every controlling source exist", () => {
  const docsText = readRequired(docsRelativePath);

  for (const sourcePath of controllingPaths) {
    readRequired(sourcePath);
    assert.equal(docsText.includes(`\`${sourcePath}\``), true, sourcePath);
  }

  assert.match(docsText, /HUMAN_REVIEW_CHRONOLOGY_CONTRACT_READINESS_BOUNDARY/u);
  assert.match(docsText, /PROVE_ONLY_FINDINGS_CAPTURED_AS_DOCS_ONLY/u);
  assert.match(
    docsText,
    /APPEND_ONLY_REVIEW_CHRONOLOGY_CONTRACT_READINESS_ASSESSMENT/u,
  );
});

test("product boundary freezes chronology purpose without machine shape", () => {
  const productText = readRequired(productBoundaryRelativePath);

  assert.match(productText, /`REVIEW_CHRONOLOGY`/u);
  assert.match(productText, /neutral, cross-source review chronology/u);
  assert.match(productText, /human reviewer can\s+correct, reject, or annotate/u);
  assert.match(productText, /stable opaque references to supplied items/u);
  assert.match(
    productText,
    /does not authorize raw replay, private paths, filenames, URLs,\s+tokens/u,
  );
});

test("Source Register prerequisite remains bounded and directly validated", () => {
  const sourceRegisterContractText = readRequired(
    sourceRegisterContractRelativePath,
  );
  const sourceRegisterConsumerText = readRequired(
    sourceRegisterConsumerDocsRelativePath,
  );
  const checkpoint = require(path.join(
    repoRoot,
    sourceRegisterCheckpointRelativePath,
  ));

  assert.match(
    sourceRegisterContractText,
    /exactly one plain JSON-like object for exactly one/u,
  );
  assert.match(sourceRegisterConsumerText, /UNTRUSTED_STRUCTURE_ONLY/u);
  assert.deepEqual(Object.keys(checkpoint), [
    "validateHumanReviewSourceRegisterForDownstream",
  ]);
  assert.equal(
    checkpoint.validateHumanReviewSourceRegisterForDownstream.length,
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

test("thirteen current facts and twenty readiness rows remain non-implementing", () => {
  const docsText = readRequired(docsRelativePath);
  const factsSection = docsText.slice(
    docsText.indexOf("## 3. Current Tracked Facts"),
    docsText.indexOf("## 4."),
  );
  const readinessSection = docsText.slice(
    docsText.indexOf("## 4. Readiness Matrix"),
    docsText.indexOf("## 5."),
  );

  assert.equal((factsSection.match(/^\| \d+ \|/gmu) ?? []).length, 13);
  assert.equal(
    (
      readinessSection.match(
        /^\| (?!Readiness surface|---)[^|]+ \| `[^`]+` \|$/gmu,
      ) ?? []
    ).length,
    20,
  );
  assert.match(
    docsText,
    /CURRENT_REVIEW_CHRONOLOGY_CONTRACT_READINESS_FACT_COUNT:\n13/u,
  );
  assert.match(docsText, /REVIEW_CHRONOLOGY_CONTRACT_STATUS:\nNOT_DEFINED/u);
  assert.match(docsText, /REVIEW_CHRONOLOGY_SCHEMA_STATUS:\nNOT_CREATED/u);
  assert.match(docsText, /REVIEW_CHRONOLOGY_RUNTIME_STATUS:\nNOT_CREATED/u);
  assert.match(
    docsText,
    /REVIEW_CHRONOLOGY_CONTRACT_READINESS:\nBLOCKED_BY_EXACT_CONTRACT_DECISIONS/u,
  );
});

test("fourteen decisions precede one docs-only chronology scaffold", () => {
  const docsText = readRequired(docsRelativePath);
  const section = docsText.slice(
    docsText.indexOf("## 5. Fourteen Open Contract Decisions"),
    docsText.indexOf("## 6."),
  );

  assert.equal((section.match(/^\| \d+ \|/gmu) ?? []).length, 14);
  assert.match(docsText, /OPEN_REVIEW_CHRONOLOGY_CONTRACT_DECISION_COUNT:\n14/u);
  assert.match(section, /temporal representation/u);
  assert.match(section, /event ordering/u);
  assert.match(section, /source references/u);
  assert.match(section, /human corrections/u);
  assert.match(section, /prohibited semantics/u);
  assert.match(docsText, /one `DOCS_ONLY` review-chronology contract/u);
  assert.match(docsText, /must not create a schema, validator, parser/u);
});

test("chronology readiness preserves data and no-conclusion boundaries", () => {
  const docsText = readRequired(docsRelativePath);

  for (const marker of [
    "REVIEW_CHRONOLOGY_CONTRACT_NOT_DEFINED",
    "REVIEW_CHRONOLOGY_SCHEMA_NOT_CREATED",
    "REVIEW_CHRONOLOGY_VALIDATOR_NOT_CREATED",
    "REVIEW_CHRONOLOGY_PACKAGE_EXPORT_NOT_CREATED",
    "REVIEW_CHRONOLOGY_RUNTIME_NOT_CREATED",
    "NO_AUTOMATIC_CHRONOLOGY_DERIVATION_CREATED",
    "REAL_PRIVATE_SOURCE_MATERIAL_USE_NOT_AUTHORIZED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
  ]) {
    assert.equal(docsText.includes(marker), true, marker);
  }

  assert.match(docsText, /create no automatic temporal inference/u);
  assert.match(docsText, /not actual human review, professional review, legal/u);
  assert.match(
    docsText,
    /TRACKED_DOCS_ONLY_REVIEW_CHRONOLOGY_CONTRACT_READINESS_BLOCKED_BY_EXACT_DECISIONS/u,
  );
});
