"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const docsRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_SOURCE_REGISTER_CROSS_REFERENCE_READINESS_BOUNDARY_v1.md";
const runtimeRelativePath =
  "packages/governance/src/human-review-chronology-source-register-validation-boundary.js";
const proofRelativePath =
  "tests/human-review-chronology-source-register-validation-boundary.test.js";
const crossReferenceProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_SOURCE_REGISTER_CROSS_REFERENCE_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const controllingPaths = [
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_CONTRACT_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_CONTRACT_BOUNDARY_v1.md",
  "schemas/human-review-chronology.json",
  "schemas/human-review-chronology-validator-result.json",
  "schemas/human-review-source-register.json",
  "schemas/human-review-source-register-validator-result.json",
  "packages/schemas/src/human-review-chronology-validator.js",
  "packages/schemas/src/human-review-source-register-validator.js",
  "packages/schemas/src/index.js",
  "packages/governance/src/human-review-source-register-pre-downstream-validation-boundary.js",
  "tests/human-review-chronology-validator.test.js",
  "tests/human-review-chronology-validator-package-export.test.js",
  "tests/human-review-source-register-validator.test.js",
  "tests/human-review-source-register-validator-package-export.test.js",
  "tests/human-review-source-register-pre-downstream-validation-boundary.test.js",
];

function absolutePath(relativePath) {
  return path.join(repoRoot, relativePath);
}

function readRequired(relativePath) {
  const targetPath = absolutePath(relativePath);
  assert.equal(fs.existsSync(targetPath), true, `expected ${relativePath}`);
  return fs.readFileSync(targetPath, "utf8");
}

test("cross-reference readiness boundary and every controlling source exist", () => {
  const docsText = readRequired(docsRelativePath);

  for (const sourcePath of controllingPaths) {
    readRequired(sourcePath);
    assert.equal(docsText.includes(`\`${sourcePath}\``), true, sourcePath);
  }

  assert.match(
    docsText,
    /HUMAN_REVIEW_CHRONOLOGY_SOURCE_REGISTER_CROSS_REFERENCE_READINESS_BOUNDARY/u,
  );
  assert.match(docsText, /PROVE_ONLY_FINDINGS_CAPTURED_AS_DOCS_ONLY/u);
  assert.match(docsText, /APPEND_ONLY_CROSS_REFERENCE_READINESS_ASSESSMENT/u);
});

test("completed chronology and Source Register structural surfaces remain exact", () => {
  const chronologySchema = require("../schemas/human-review-chronology.json");
  const chronologyResultSchema = require("../schemas/human-review-chronology-validator-result.json");
  const sourceRegisterSchema = require("../schemas/human-review-source-register.json");
  const sourceRegisterResultSchema = require("../schemas/human-review-source-register-validator-result.json");
  const chronologyValidatorModule = require("../packages/schemas/src/human-review-chronology-validator.js");
  const sourceRegisterValidatorModule = require("../packages/schemas/src/human-review-source-register-validator.js");
  const packageSchemas = require("../packages/schemas/src/index.js");
  const sourceRegisterCheckpoint = require("../packages/governance/src/human-review-source-register-pre-downstream-validation-boundary.js");

  assert.deepEqual(Object.keys(chronologyValidatorModule), [
    "validateHumanReviewChronology",
  ]);
  assert.deepEqual(Object.keys(sourceRegisterValidatorModule), [
    "validateHumanReviewSourceRegister",
  ]);
  assert.strictEqual(
    packageSchemas.validateHumanReviewChronology,
    chronologyValidatorModule.validateHumanReviewChronology,
  );
  assert.strictEqual(
    packageSchemas.validateHumanReviewSourceRegister,
    sourceRegisterValidatorModule.validateHumanReviewSourceRegister,
  );
  assert.strictEqual(packageSchemas.humanReviewChronology, chronologySchema);
  assert.strictEqual(
    packageSchemas.humanReviewChronologyValidatorResult,
    chronologyResultSchema,
  );
  assert.strictEqual(
    packageSchemas.humanReviewSourceRegister,
    sourceRegisterSchema,
  );
  assert.strictEqual(
    packageSchemas.humanReviewSourceRegisterValidatorResult,
    sourceRegisterResultSchema,
  );
  assert.deepEqual(Object.keys(sourceRegisterCheckpoint), [
    "validateHumanReviewSourceRegisterForDownstream",
  ]);
  assert.equal(
    sourceRegisterCheckpoint.validateHumanReviewSourceRegisterForDownstream
      .length,
    1,
  );
});

test("fourteen tracked facts and both historical runtime reservations are frozen", () => {
  const docsText = readRequired(docsRelativePath);
  const crossReferenceProofTransitionText = readRequired(
    crossReferenceProofTransitionPath,
  );
  const section = docsText.slice(
    docsText.indexOf("## 3. Current Tracked Facts"),
    docsText.indexOf("## 4."),
  );

  assert.equal((section.match(/^\| \d+ \|/gmu) ?? []).length, 14);
  assert.match(docsText, /CURRENT_CROSS_REFERENCE_READINESS_FACT_COUNT:\n14/u);
  assert.match(docsText, /RESERVED_CROSS_REFERENCE_CHECK_COUNT:\n2/u);
  assert.match(
    docsText,
    /RESERVED_CROSS_REFERENCE_IMPLEMENTATION_PATH_COUNT:\n2/u,
  );
  assert.match(docsText, /CROSS_REFERENCE_RUNTIME_STATUS:\nNOT_CREATED/u);
  assert.equal(docsText.includes(`\`${runtimeRelativePath}\``), true);
  assert.equal(docsText.includes(`\`${proofRelativePath}\``), true);
  assert.equal(
    crossReferenceProofTransitionText.includes(`\`${runtimeRelativePath}\``),
    true,
  );
  assert.equal(
    crossReferenceProofTransitionText.includes(`\`${proofRelativePath}\``),
    true,
  );
  assert.match(
    crossReferenceProofTransitionText,
    /CROSS_REFERENCE_RUNTIME_PATH_LIVE_ABSENCE_TRANSITION_COUNT:\n12/u,
  );
  assert.match(
    crossReferenceProofTransitionText,
    /TRACKED_DOCS_ONLY_CROSS_REFERENCE_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
});

test("readiness stays blocked while the declared checks remain narrow", () => {
  const docsText = readRequired(docsRelativePath);

  assert.match(
    docsText,
    /CROSS_REFERENCE_READINESS:\nBLOCKED_BY_EXACT_SEMANTICS_AND_RESULT_CONTRACT_DECISIONS/u,
  );
  assert.match(
    docsText,
    /cross-reference responsibility limited to two declared checks \| `YES_TRACKED`/u,
  );
  assert.match(
    docsText,
    /exact input cardinality, container, and arity selected \| `NO_OPEN`/u,
  );
  assert.match(
    docsText,
    /exact mismatch, membership, code, and path result contract selected \| `NO_OPEN`/u,
  );
});

test("twelve open decisions and one docs-only semantics step are explicit", () => {
  const docsText = readRequired(docsRelativePath);
  const section = docsText.slice(
    docsText.indexOf("## 5. Twelve Open Cross-Reference Scope Decisions"),
    docsText.indexOf("## 6."),
  );

  assert.equal((section.match(/^\| \d+ \|/gmu) ?? []).length, 12);
  assert.match(docsText, /OPEN_CROSS_REFERENCE_SCOPE_DECISION_COUNT:\n12/u);
  assert.match(section, /structural-validation prerequisite/u);
  assert.match(section, /packet comparison/u);
  assert.match(section, /membership traversal/u);
  assert.match(section, /result contract/u);
  assert.match(section, /observability boundary/u);
  assert.match(docsText, /one `DOCS_ONLY` staged cross-reference/u);
  assert.match(docsText, /must not implement the checkpoint/u);
});

test("readiness assessment preserves non-interference and no-conclusion boundaries", () => {
  const docsText = readRequired(docsRelativePath);

  for (const marker of [
    "CROSS_REFERENCE_CHECKPOINT_NOT_CREATED",
    "CROSS_REFERENCE_RESULT_CONTRACT_NOT_DEFINED",
    "PERSISTENCE_API_ROUTE_PROVIDER_MODEL_UI_NOT_CREATED",
    "LOGGING_TELEMETRY_AUDIT_NOT_CREATED",
    "NO_REAL_PRIVATE_SOURCE_OR_CASE_MATERIAL_PROCESSED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
  ]) {
    assert.equal(docsText.includes(marker), true, marker);
  }

  assert.match(docsText, /do not inspect or process raw, private, source, case/u);
  assert.match(docsText, /not actual human review, professional review, legal/u);
  assert.match(
    docsText,
    /TRACKED_DOCS_ONLY_CROSS_REFERENCE_READINESS_BLOCKED_BY_EXACT_SEMANTICS_AND_RESULT_CONTRACT_DECISIONS/u,
  );
});
