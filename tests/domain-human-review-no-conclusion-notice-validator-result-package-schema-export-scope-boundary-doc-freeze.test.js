"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_v1.md";
const transitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const schemaPath =
  "schemas/human-review-no-conclusion-notice-validator-result.json";
const candidatePackageProofPath =
  "tests/human-review-no-conclusion-notice-package-export.test.js";
const validatorResultProofPath =
  "tests/human-review-no-conclusion-notice-validator-result-schema.test.js";
const sourcePaths = [
  schemaPath,
  validatorResultProofPath,
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_VALIDATOR_RESULT_SCHEMA_READINESS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_VALIDATOR_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
  "packages/schemas/src/index.js",
  candidatePackageProofPath,
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_v1.md",
];
const futurePaths = [
  "packages/schemas/src/index.js",
  candidatePackageProofPath,
  validatorResultProofPath,
  "tests/human-review-no-conclusion-notice-validator-result-package-export.test.js",
];
const retainedPackageBlockedExports = [
  "humanReviewNoConclusionNoticeValidator",
  "validateHumanReviewNoConclusionNotice",
  "getHumanReviewNoConclusionNoticeValidator",
  "humanReviewNoConclusionNoticeValidatorRegistry",
];
const exportName = "humanReviewNoConclusionNoticeValidatorResult";
const fence = String.fromCharCode(96);

function readRequired(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  assert.equal(fs.existsSync(absolutePath), true, "expected " + relativePath);
  return fs.readFileSync(absolutePath, "utf8");
}

test("validator-result package export scope and controlling sources exist", () => {
  const docsText = readRequired(docsPath);

  for (const sourcePath of sourcePaths) {
    readRequired(sourcePath);
    assert.equal(
      docsText.includes(fence + sourcePath + fence),
      true,
      sourcePath,
    );
  }
  assert.match(
    docsText,
    /HUMAN_REVIEW_NO_CONCLUSION_NOTICE_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY/u,
  );
  assert.match(docsText, /DOCS_ONLY/u);
  assert.match(docsText, /APPEND_ONLY_PACKAGE_SCHEMA_EXPORT_SCOPE/u);
});

test("current docs-only scope is exactly two files and creates no export", () => {
  const docsText = readRequired(docsPath);
  const transitionText = readRequired(transitionPath);

  assert.match(
    docsText,
    /CURRENT_VALIDATOR_RESULT_PACKAGE_EXPORT_SCOPE_FILE_COUNT:\n2/u,
  );
  assert.match(docsText, /PACKAGE_SCHEMA_EXPORT_NOT_CREATED_BY_THIS_SLICE/u);
  assert.match(docsText, /No existing tracked file changes in this slice/u);
  assert.match(
    transitionText,
    /HISTORICAL_SCOPE_NON_IMPLEMENTATION_MARKERS_PRESERVED/u,
  );
  assert.match(transitionText, /PACKAGE_SCHEMA_EXPORT_NOT_CREATED_BY_THIS_SLICE/u);
});

test("future package export transition is exactly four files", () => {
  const docsText = readRequired(docsPath);

  assert.match(
    docsText,
    /FUTURE_VALIDATOR_RESULT_PACKAGE_EXPORT_SLICE_FILE_COUNT:\n4/u,
  );
  for (const futurePath of futurePaths) {
    assert.equal(
      docsText.includes(fence + futurePath + fence),
      true,
      futurePath,
    );
  }
  assert.match(docsText, /all runtime\nfiles remain unchanged/u);
});

test("exact package export symbol and schema source path are frozen", () => {
  const docsText = readRequired(docsPath);

  assert.match(
    docsText,
    /FUTURE_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_NAME:\nhumanReviewNoConclusionNoticeValidatorResult/u,
  );
  assert.equal(
    docsText.includes(
      fence +
        "../../../schemas/human-review-no-conclusion-notice-validator-result.json" +
        fence,
    ),
    true,
  );
  assert.equal(
    docsText.includes("one static " + fence + "require" + fence + " binding"),
    true,
  );
  assert.equal(
    docsText.includes(fence + "module.exports" + fence + " property"),
    true,
  );
});

test("tracked schema identity and structural counts remain exact", () => {
  const docsText = readRequired(docsPath);
  const schema = JSON.parse(readRequired(schemaPath));

  assert.equal(
    schema.$id,
    "https://governance-contracts.invalid/schemas/human-review-no-conclusion-notice-validator-result.json",
  );
  assert.equal(
    schema.title,
    "Human Review No-Conclusion Notice Validator Result Contract",
  );
  assert.equal(schema.required.length, 4);
  assert.equal(Object.keys(schema.properties).length, 4);
  assert.equal(schema.oneOf.length, 2);
  assert.equal(schema.properties.errors.items.oneOf.length, 11);
  assert.equal(schema.properties.errors.uniqueItems, true);
  assert.match(docsText, /exactly four required root properties/u);
  assert.match(docsText, /exactly two root state/u);
  assert.match(docsText, /exactly eleven complete code\/path/u);
  assert.equal(
    docsText.includes(fence + "errors.uniqueItems: true" + fence),
    true,
  );
});

test("candidate package proof releases only the schema export denial", () => {
  const docsText = readRequired(docsPath);
  const transitionText = readRequired(transitionPath);

  assert.equal(
    transitionText.includes(fence + candidatePackageProofPath + fence),
    true,
  );
  assert.equal(
    transitionText.includes(
      "the candidate package proof still contains " +
        fence +
        "\"" +
        exportName +
        "\"" +
        fence,
    ),
    true,
  );
  assert.match(
    docsText,
    /stop classifying this separately scoped schema-object export\nas forbidden/u,
  );
  for (const blockedExport of retainedPackageBlockedExports) {
    assert.equal(
      docsText.includes("- " + fence + blockedExport + fence),
      true,
      blockedExport,
    );
    assert.equal(
      transitionText.includes(fence + blockedExport + fence),
      true,
      blockedExport,
    );
  }
  assert.match(transitionText, /RETAINED_PACKAGE_EXPORT_DENIAL_COUNT:\n4/u);
  assert.match(docsText, /test-alignment transition, not deletion\nof a safety boundary/u);
});

test("schema proof releases only its obsolete package-path absence check", () => {
  const docsText = readRequired(docsPath);
  const transitionText = readRequired(transitionPath);

  assert.equal(
    transitionText.includes(fence + validatorResultProofPath + fence),
    true,
  );
  assert.match(transitionText, /LIVE_PRE_EXPORT_ASSERTION_NARROWING_COUNT:\n5/u);
  for (const exactRelease of [
    "remove only the " + fence + "packageIndexPath" + fence + " declaration",
    "remove only the " + fence + "packageIndexText" + fence + " read",
    "remove only the assertion that",
    "align only the affected test description",
  ]) {
    assert.equal(docsText.includes(exactRelease), true, exactRelease);
  }
  assert.match(docsText, /four retained sibling-path assertions must remain\nunchanged/u);
  assert.match(
    transitionText,
    /RETAINED_LATER_SIBLING_PATH_ABSENCE_COUNT:\n4/u,
  );
});

test("future proof preserves static export and package line-count guards", () => {
  const docsText = readRequired(docsPath);
  const packageIndexText = readRequired("packages/schemas/src/index.js");

  assert.equal((packageIndexText.match(/\n/gu) ?? []).length, 13165);
  assert.match(docsText, /PACKAGE_INDEX_BASELINE_LINE_COUNT:\n13165/u);
  assert.match(docsText, /exported value is deeply equal and strictly identical/u);
  assert.match(
    docsText,
    /exact four root properties, two state branches, eleven error branches/u,
  );
  assert.match(
    docsText,
    /pre-existing No-Conclusion Notice candidate schema export remains\n  unchanged/u,
  );
  assert.match(docsText, /no validator execution, dispatch, cross-reference behavior/u);
  assert.match(docsText, /does not prove that the package export exists/u);
});

test("historical live proof assertions are narrowed only by the tracked transition", () => {
  const transitionText = readRequired(transitionPath);

  assert.equal(transitionText.includes(fence + docsPath + fence), true);
  assert.equal(
    transitionText.includes(
      fence +
        "tests/domain-human-review-no-conclusion-notice-validator-result-package-schema-export-scope-boundary-doc-freeze.test.js" +
        fence,
    ),
    true,
  );
  assert.match(transitionText, /PROOF_CONFLICT_FAMILY_COUNT:\n3/u);
  assert.match(transitionText, /CURRENT_PREREQUISITE_FILE_COUNT:\n2/u);
  assert.match(
    transitionText,
    /PRESERVED_FUTURE_PACKAGE_EXPORT_SLICE_FILE_COUNT:\n4/u,
  );
  assert.match(transitionText, /PACKAGE_INDEX_BASELINE_LINE_COUNT:\n13165/u);
  assert.match(
    transitionText,
    /TRACKED_DOCS_ONLY_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_DEFINED/u,
  );
});

test("scope preserves non-implementation and no-conclusion boundaries", () => {
  const docsText = readRequired(docsPath);

  for (const marker of [
    "PACKAGE_SCHEMA_EXPORT_NOT_CREATED_BY_THIS_SLICE",
    "VALIDATOR_NOT_CREATED",
    "VALIDATOR_DISPATCH_NOT_CHANGED",
    "VALIDATION_EXECUTION_NOT_CREATED",
    "CROSS_REFERENCE_CHECKPOINT_NOT_CREATED",
    "NOTICE_GENERATION_NOT_CREATED",
    "TRIGGER_CLASSIFICATION_NOT_CREATED",
    "CONTROLLED_HANDOFF_NOT_CREATED",
    "NO_RUNTIME_BEHAVIOR_CREATED",
    "NO_SOURCE_ACQUISITION_OR_CONTENT_INSPECTION_CREATED",
    "NO_DOMAIN_FINDING_SCORE_OR_CONCLUSION_CREATED",
    "NO_APPROVAL_OR_RELEASE_PRODUCT_IMPLEMENTATION_READINESS_CREATED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "TRACKED_DOCS_ONLY_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_SCOPE_DEFINED",
  ]) {
    assert.equal(docsText.includes(marker), true, marker);
  }
  assert.match(docsText, /Human\/professional\nreview remains the release gate/u);
  assert.match(docsText, /not actual human review[\s\S]*real-evidence review/u);
  assert.doesNotMatch(docsText, /\/Users\//u);
});
