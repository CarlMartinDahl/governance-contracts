"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const docsRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_CROSS_REFERENCE_CONSUMER_IMPLEMENTATION_SEMANTICS_BOUNDARY_v1.md";
const futureModulePath =
  "packages/governance/src/human-review-questions-pre-controlled-handoff-validation-boundary.js";
const futureRuntimeTestPath =
  "tests/human-review-questions-pre-controlled-handoff-validation-boundary.test.js";
const thisTestPath =
  "tests/domain-human-review-questions-cross-reference-consumer-implementation-semantics-boundary-doc-freeze.test.js";
const controllingPaths = [
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_WORKSPACE_PUBLIC_SCOPE_ALIGNMENT_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_CONTRACT_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_CROSS_REFERENCE_SEMANTICS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_CROSS_REFERENCE_CONSUMER_READINESS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_CROSS_REFERENCE_CONSUMER_TARGET_SELECTION_BOUNDARY_v1.md",
  "schemas/human-review-questions-cross-reference-result.json",
  "packages/schemas/src/index.js",
  "packages/governance/src/human-review-questions-cross-reference-validation-boundary.js",
  "packages/governance/src/index.js",
  "tests/human-review-questions-cross-reference-result-package-export.test.js",
  "tests/human-review-questions-cross-reference-validation-boundary.test.js",
];

function absolutePath(relativePath) {
  return path.join(repoRoot, relativePath);
}

function readRequired(relativePath) {
  const resolvedPath = absolutePath(relativePath);
  assert.equal(fs.existsSync(resolvedPath), true, `expected ${relativePath}`);
  return fs.readFileSync(resolvedPath, "utf8");
}

test("implementation-semantics boundary and canonical sources exist", () => {
  const docsText = readRequired(docsRelativePath);

  for (const sourcePath of controllingPaths) {
    readRequired(sourcePath);
    assert.equal(docsText.includes(`\`${sourcePath}\``), true, sourcePath);
  }

  assert.match(
    docsText,
    /HUMAN_REVIEW_QUESTIONS_CROSS_REFERENCE_CONSUMER_IMPLEMENTATION_SEMANTICS_BOUNDARY/u,
  );
  assert.match(docsText, /DOCS_ONLY/u);
  assert.match(docsText, /OWNER_SELECTED_CODE_OWNERSHIP_OPTION_A_CAPTURED/u);
  assert.match(docsText, /EXACT_SEVEN_IMPLEMENTATION_SEMANTICS_RESOLVED/u);
});

test("exact internal governance ownership and surface are frozen", () => {
  const docsText = readRequired(docsRelativePath);
  const governanceIndexText = readRequired("packages/governance/src/index.js");
  const functionName =
    "validateHumanReviewQuestionsCrossReferencePreControlledHandoff";

  assert.match(docsText, /FUTURE_OWNER_PACKAGE:\npackages\/governance/u);
  assert.match(
    docsText,
    /FUTURE_MODULE_PATH:\npackages\/governance\/src\/human-review-questions-pre-controlled-handoff-validation-boundary\.js/u,
  );
  assert.match(
    docsText,
    /FUTURE_FUNCTION_NAME:\nvalidateHumanReviewQuestionsCrossReferencePreControlledHandoff/u,
  );
  assert.match(
    docsText,
    /FUTURE_CHECKPOINT_IMPORT_PATH:\n\.\/human-review-questions-cross-reference-validation-boundary\.js/u,
  );
  assert.match(
    docsText,
    /FUTURE_PUBLIC_SURFACE:\nDIRECT_INTERNAL_MODULE_EXPORT_ONLY/u,
  );
  assert.equal(governanceIndexText.includes(functionName), false);
});

test("input invocation lifecycle and no-observability semantics are exact", () => {
  const docsText = readRequired(docsRelativePath);

  for (const marker of [
    "ONE_ALREADY_CONSTRUCTED_FIVE_FIELD_CROSS_REFERENCE_ENVELOPE_FROM_AN_IN_PROCESS_CALLER",
    "UNTRUSTED_STRUCTURE_AND_CROSS_REFERENCE_INPUT_ONLY",
    "DIRECT_JAVASCRIPT_ENVELOPE_NO_PARSE_SERIALIZE_CLONE_NORMALIZE_OR_REASSEMBLE",
    "SYNCHRONOUS_DIRECT_DELEGATION",
    "EXACT_EXISTING_CROSS_REFERENCE_RESULT_NO_TRANSLATION",
    "IMMEDIATE_IN_PROCESS_CALLER_ONLY",
    "EPHEMERAL_EXACT_RETURN_ONLY",
    "FUTURE_LOGGING:\nNONE",
    "FUTURE_TELEMETRY:\nNONE",
    "FUTURE_AUDIT_EMISSION:\nNONE",
  ]) {
    assert.equal(docsText.includes(marker.replace("\\n", "\n")), true, marker);
  }

  assert.match(docsText, /FUTURE_FUNCTION_ARITY:\n1/u);
  assert.match(docsText, /FUTURE_INVOCATION_COUNT_PER_CALL:\n1/u);
  assert.match(docsText, /must not throw merely because the\nenvelope/u);
  assert.match(docsText, /unless the returned result has `valid: true`/u);
  assert.match(docsText, /adds no numeric size limit/u);
});

test("seven decisions are resolved with no open implementation semantics", () => {
  const docsText = readRequired(docsRelativePath);
  const section = docsText.slice(
    docsText.indexOf("## 10. Resolved Implementation Semantics"),
    docsText.indexOf("## 11."),
  );

  assert.equal((section.match(/^\| \d+ \|/gmu) ?? []).length, 7);
  assert.match(
    docsText,
    /RESOLVED_CONSUMER_IMPLEMENTATION_SEMANTIC_DECISION_COUNT:\n7/u,
  );
  assert.match(
    docsText,
    /OPEN_CONSUMER_IMPLEMENTATION_SEMANTIC_DECISION_COUNT:\n0/u,
  );
  assert.match(
    docsText,
    /RELEASE_BOUNDARY_DECISION:\nPRESERVED_AS_SEPARATE_HUMAN_PROFESSIONAL_GATE/u,
  );
});

test("implementation follows exactly the frozen three transitions", () => {
  const docsText = readRequired(docsRelativePath);
  const section = docsText.slice(
    docsText.indexOf("## 9. Decision 9: Exact Implementation Proof"),
    docsText.indexOf("## 10."),
  );
  const futurePaths = [futureModulePath, futureRuntimeTestPath, thisTestPath];

  assert.equal((section.match(/^\| \d+ \|/gmu) ?? []).length, 3);
  for (const futurePath of futurePaths) {
    assert.equal(section.includes(`\`${futurePath}\``), true, futurePath);
  }
  assert.match(
    docsText,
    /FUTURE_INTERNAL_CONSUMER_IMPLEMENTATION_FILE_COUNT:\n3/u,
  );
  assert.equal(fs.existsSync(absolutePath(futureModulePath)), true);
  assert.equal(fs.existsSync(absolutePath(futureRuntimeTestPath)), true);

  const wrapper = require(absolutePath(futureModulePath));
  assert.deepEqual(Object.keys(wrapper), [
    "validateHumanReviewQuestionsCrossReferencePreControlledHandoff",
  ]);
  assert.equal(
    wrapper.validateHumanReviewQuestionsCrossReferencePreControlledHandoff
      .length,
    1,
  );
});

test("existing checkpoint result and package surfaces remain exact", () => {
  const checkpointModule = require("../packages/governance/src/human-review-questions-cross-reference-validation-boundary.js");
  const packageSchemas = require("../packages/schemas/src/index.js");
  const resultSchema = require("../schemas/human-review-questions-cross-reference-result.json");

  assert.deepEqual(Object.keys(checkpointModule), [
    "validateHumanReviewQuestionsCrossReference",
  ]);
  assert.equal(
    checkpointModule.validateHumanReviewQuestionsCrossReference.length,
    1,
  );
  assert.strictEqual(
    packageSchemas.humanReviewQuestionsCrossReferenceResult,
    resultSchema,
  );
  assert.equal(
    Object.hasOwn(
      packageSchemas,
      "validateHumanReviewQuestionsCrossReferencePreControlledHandoff",
    ),
    false,
  );
});

test("exact docs-only scope runtime exclusions and no-conclusion boundaries remain explicit", () => {
  const docsText = readRequired(docsRelativePath);

  assert.match(
    docsText,
    /CROSS_REFERENCE_CONSUMER_IMPLEMENTATION_SEMANTICS_SLICE_FILE_COUNT:\n2/u,
  );
  for (const marker of [
    "RUNTIME_CONSUMER_NOT_CREATED_BY_THIS_SLICE",
    "CONTROLLED_HANDOFF_NOT_CREATED",
    "INPUT_ACQUISITION_PARSING_SERIALIZATION_AND_ENVELOPE_REASSEMBLY_NOT_CREATED",
    "GOVERNANCE_PACKAGE_INDEX_EXPORT_NOT_CREATED",
    "PERSISTENCE_API_ROUTE_DISPATCH_PROVIDER_MODEL_UI_NOT_CREATED",
    "LOGGING_TELEMETRY_AUDIT_EMISSION_NOT_CREATED",
    "NO_REAL_PRIVATE_SOURCE_OR_CASE_MATERIAL_PROCESSED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
  ]) {
    assert.equal(docsText.includes(marker), true, marker);
  }

  assert.match(docsText, /one narrow `RUNTIME_CHANGE` internal wrapper/u);
  assert.match(docsText, /not actual human review,\nprofessional review, legal/u);
  assert.match(
    docsText,
    /TRACKED_DOCS_ONLY_EXACT_INTERNAL_CONSUMER_SEMANTICS_DEFINED_RUNTIME_NOT_CREATED/u,
  );
});
