"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const docsRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_CONTRACT_READINESS_BOUNDARY_v1.md";
const productBoundaryRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_WORKSPACE_PUBLIC_SCOPE_ALIGNMENT_BOUNDARY_v1.md";
const reviewStateContractRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_STATE_MODEL_CONTRACT_v1.md";
const reviewStateSchemaRelativePath = "schemas/human-review-state-model.json";
const controllingPaths = [
  "README.md",
  productBoundaryRelativePath,
  reviewStateContractRelativePath,
  reviewStateSchemaRelativePath,
  "tests/domain-human-review-workspace-public-scope-alignment-boundary-doc-freeze.test.js",
  "tests/human-review-state-schema.test.js",
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

test("source-register readiness boundary and every controlling source exist", () => {
  const docsText = readRequired(docsRelativePath);

  for (const sourcePath of controllingPaths) {
    readRequired(sourcePath);
    assert.equal(docsText.includes(`\`${sourcePath}\``), true, sourcePath);
  }

  assert.match(docsText, /HUMAN_REVIEW_SOURCE_REGISTER_CONTRACT_READINESS_BOUNDARY/u);
  assert.match(docsText, /PROVE_ONLY_FINDINGS_CAPTURED_AS_DOCS_ONLY/u);
  assert.match(docsText, /APPEND_ONLY_SOURCE_REGISTER_CONTRACT_READINESS_ASSESSMENT/u);
});

test("canonical product boundary freezes source-register purpose without machine shape", () => {
  const productText = readRequired(productBoundaryRelativePath);

  assert.match(productText, /`SOURCE_REGISTER`/u);
  assert.match(productText, /authorized and bounded supplied packet/u);
  assert.match(productText, /stable opaque references to supplied items/u);
  assert.match(
    productText,
    /does not authorize raw replay, private paths, filenames, URLs,\s+tokens/u,
  );
  assert.match(
    productText,
    /authenticity claims, or chain-of-custody\s+claims/u,
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
  assert.match(contractText, /creates no automatic mapping, conversion, equivalence, dispatch/u);
});

test("eleven current facts and fourteen readiness rows remain non-implementing", () => {
  const docsText = readRequired(docsRelativePath);
  const factsSection = docsText.slice(
    docsText.indexOf("## 3. Current Tracked Facts"),
    docsText.indexOf("## 4."),
  );
  const readinessSection = docsText.slice(
    docsText.indexOf("## 4. Readiness Matrix"),
    docsText.indexOf("## 5."),
  );

  assert.equal((factsSection.match(/^\| \d+ \|/gmu) ?? []).length, 11);
  assert.equal(
    (readinessSection.match(/^\| (?!Readiness surface|---)[^|]+ \| `[^`]+` \|$/gmu) ?? [])
      .length,
    14,
  );
  assert.match(docsText, /CURRENT_SOURCE_REGISTER_CONTRACT_READINESS_FACT_COUNT:\n11/u);
  assert.match(docsText, /SOURCE_REGISTER_CONTRACT_STATUS:\nNOT_DEFINED/u);
  assert.match(docsText, /SOURCE_REGISTER_SCHEMA_STATUS:\nNOT_CREATED/u);
  assert.match(docsText, /SOURCE_REGISTER_RUNTIME_STATUS:\nNOT_CREATED/u);
  assert.match(
    docsText,
    /SOURCE_REGISTER_CONTRACT_READINESS:\nBLOCKED_BY_EXACT_CONTRACT_DECISIONS/u,
  );
});

test("twelve exact decisions precede one docs-only scaffold boundary", () => {
  const docsText = readRequired(docsRelativePath);
  const section = docsText.slice(
    docsText.indexOf("## 5. Twelve Open Contract Decisions"),
    docsText.indexOf("## 6."),
  );

  assert.equal((section.match(/^\| \d+ \|/gmu) ?? []).length, 12);
  assert.match(docsText, /OPEN_SOURCE_REGISTER_CONTRACT_DECISION_COUNT:\n12/u);
  assert.match(section, /opaque reference/u);
  assert.match(section, /packet relationship/u);
  assert.match(section, /prohibited fields/u);
  assert.match(section, /validation result/u);
  assert.match(docsText, /one `DOCS_ONLY` source-register contract/u);
  assert.match(docsText, /must not create a schema, validator, parser/u);
});

test("source-register readiness preserves data and no-conclusion boundaries", () => {
  const docsText = readRequired(docsRelativePath);

  for (const marker of [
    "SOURCE_REGISTER_CONTRACT_NOT_DEFINED",
    "SOURCE_REGISTER_SCHEMA_NOT_CREATED",
    "SOURCE_REGISTER_VALIDATOR_NOT_CREATED",
    "SOURCE_REGISTER_PACKAGE_EXPORT_NOT_CREATED",
    "SOURCE_REGISTER_RUNTIME_NOT_CREATED",
    "REAL_PRIVATE_SOURCE_MATERIAL_USE_NOT_AUTHORIZED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
  ]) {
    assert.equal(docsText.includes(marker), true, marker);
  }

  assert.match(docsText, /create no authenticity, completeness, authorship/u);
  assert.match(docsText, /not actual human review, professional review, legal/u);
  assert.match(
    docsText,
    /TRACKED_DOCS_ONLY_SOURCE_REGISTER_CONTRACT_READINESS_BLOCKED_BY_EXACT_DECISIONS/u,
  );
});
