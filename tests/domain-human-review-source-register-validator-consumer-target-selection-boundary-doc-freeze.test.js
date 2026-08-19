"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const docsRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_VALIDATOR_CONSUMER_TARGET_SELECTION_BOUNDARY_v1.md";
const controllingPaths = [
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_WORKSPACE_PUBLIC_SCOPE_ALIGNMENT_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_CONTRACT_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_VALIDATOR_HELPER_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_VALIDATOR_HELPER_PACKAGE_EXPORT_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_VALIDATOR_CONSUMER_READINESS_BOUNDARY_v1.md",
  "schemas/human-review-source-register.json",
  "schemas/human-review-source-register-validator-result.json",
  "packages/schemas/src/human-review-source-register-validator.js",
  "packages/schemas/src/index.js",
  "tests/human-review-source-register-validator.test.js",
  "tests/human-review-source-register-validator-package-export.test.js",
];
const retainedSiblingDenials = [
  "humanReviewSourceRegisterValidator",
  "getHumanReviewSourceRegisterValidator",
  "humanReviewSourceRegisterValidatorRegistry",
];

function readRequired(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  assert.equal(fs.existsSync(absolutePath), true, `expected ${relativePath}`);
  return fs.readFileSync(absolutePath, "utf8");
}

test("consumer target-selection boundary and controlling sources exist", () => {
  const docsText = readRequired(docsRelativePath);

  for (const sourcePath of controllingPaths) {
    readRequired(sourcePath);
    assert.equal(docsText.includes(`\`${sourcePath}\``), true, sourcePath);
  }

  assert.match(
    docsText,
    /HUMAN_REVIEW_SOURCE_REGISTER_VALIDATOR_CONSUMER_TARGET_SELECTION_BOUNDARY/u,
  );
  assert.match(docsText, /DOCS_ONLY/u);
  assert.match(docsText, /OWNER_SELECTED_CONSUMER_TARGET_CAPTURED/u);
});

test("exactly one internal pre-downstream target is selected", () => {
  const docsText = readRequired(docsRelativePath);

  assert.match(
    docsText,
    /SELECTED_CONSUMER_TARGET:\nHUMAN_REVIEW_WORKSPACE_DECLARED_PACKET_SOURCE_REGISTER_PRE_DOWNSTREAM_VALIDATION_BOUNDARY_V1/u,
  );
  assert.match(
    docsText,
    /SELECTED_CONSUMER_TARGET_CLASS:\nINTERNAL_PRE_DOWNSTREAM_VALIDATION_CHECKPOINT/u,
  );
  assert.match(
    docsText,
    /SELECTED_VALIDATOR_HELPER:\nvalidateHumanReviewSourceRegister/u,
  );
  assert.match(docsText, /SELECTED_CONSUMER_TARGET_COUNT:\n1/u);
  assert.match(docsText, /after a candidate `SOURCE_REGISTER` has been constructed/u);
  assert.match(docsText, /before that candidate may be treated as validated/u);
});

test("two target decisions are resolved while seven implementation semantics remain open", () => {
  const docsText = readRequired(docsRelativePath);
  const resolvedSection = docsText.slice(
    docsText.indexOf("## 4. Resolved Target Decisions"),
    docsText.indexOf("## 5."),
  );
  const openSection = docsText.slice(
    docsText.indexOf("## 5. Unresolved Implementation Semantics"),
    docsText.indexOf("## 6."),
  );

  assert.equal((resolvedSection.match(/^\| \d+ \|/gmu) ?? []).length, 2);
  assert.equal((openSection.match(/^\| \d+ \|/gmu) ?? []).length, 7);
  assert.match(docsText, /RESOLVED_CONSUMER_TARGET_DECISION_COUNT:\n2/u);
  assert.match(
    docsText,
    /OPEN_CONSUMER_IMPLEMENTATION_SEMANTIC_DECISION_COUNT:\n7/u,
  );
  assert.match(
    docsText,
    /RELEASE_BOUNDARY_DECISION:\nPRESERVED_AS_SEPARATE_HUMAN_PROFESSIONAL_GATE/u,
  );
});

test("schema helper and package-export surfaces remain exact", () => {
  const candidateSchema = require("../schemas/human-review-source-register.json");
  const resultSchema = require("../schemas/human-review-source-register-validator-result.json");
  const validatorModule = require("../packages/schemas/src/human-review-source-register-validator.js");
  const packageSchemas = require("../packages/schemas/src/index.js");
  const exportName = "validateHumanReviewSourceRegister";

  assert.deepEqual(Object.keys(validatorModule), [exportName]);
  assert.equal(validatorModule[exportName].length, 1);
  assert.strictEqual(packageSchemas[exportName], validatorModule[exportName]);
  assert.strictEqual(packageSchemas.humanReviewSourceRegister, candidateSchema);
  assert.strictEqual(
    packageSchemas.humanReviewSourceRegisterValidatorResult,
    resultSchema,
  );
  for (const deniedName of retainedSiblingDenials) {
    assert.equal(Object.hasOwn(packageSchemas, deniedName), false, deniedName);
  }
});

test("runtime and no-conclusion boundaries remain explicit", () => {
  const docsText = readRequired(docsRelativePath);

  for (const marker of [
    "CONSUMER_IMPLEMENTATION_NOT_CREATED",
    "INPUT_ACQUISITION_AND_REPRESENTATION_NOT_DEFINED",
    "CODE_OWNERSHIP_AND_IMPORT_PATH_NOT_DEFINED",
    "INVOCATION_FAILURE_AND_RESULT_LIFECYCLE_NOT_DEFINED",
    "LOGGING_TELEMETRY_AND_AUDIT_EMISSION_NOT_DEFINED",
    "PERSISTENCE_API_ROUTE_DISPATCH_PROVIDER_MODEL_UI_NOT_CREATED",
    "NO_REAL_PRIVATE_SOURCE_OR_CASE_MATERIAL_PROCESSED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
  ]) {
    assert.equal(docsText.includes(marker), true, marker);
  }

  assert.match(docsText, /one `DOCS_ONLY` implementation-semantics boundary/u);
  assert.match(
    docsText,
    /not actual human review, professional review,\nlegal review/u,
  );
  assert.match(
    docsText,
    /TRACKED_DOCS_ONLY_EXACT_TARGET_SELECTED_IMPLEMENTATION_SEMANTICS_OPEN/u,
  );
});
