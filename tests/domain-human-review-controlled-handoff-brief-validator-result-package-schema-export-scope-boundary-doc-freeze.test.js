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
const fence = String.fromCharCode(96);
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_v1.md";
const proofPath =
  "tests/domain-human-review-controlled-handoff-brief-validator-result-package-schema-export-scope-boundary-doc-freeze.test.js";
const transitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const validatorHelperProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const schemaPath =
  "schemas/human-review-controlled-handoff-brief-validator-result.json";
const candidatePackageProofPath =
  "tests/human-review-controlled-handoff-brief-package-export.test.js";
const validatorResultProofPath =
  "tests/human-review-controlled-handoff-brief-validator-result-schema.test.js";
const sourcePaths = [
  schemaPath,
  validatorResultProofPath,
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_VALIDATOR_RESULT_SCHEMA_READINESS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_VALIDATOR_RESULT_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_VALIDATOR_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
  "packages/schemas/src/index.js",
  candidatePackageProofPath,
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_NO_CONCLUSION_NOTICE_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_v1.md",
];
const futurePaths = [
  "packages/schemas/src/index.js",
  candidatePackageProofPath,
  validatorResultProofPath,
  "tests/human-review-controlled-handoff-brief-validator-result-package-export.test.js",
];
const retainedBlockedExports = [
  "humanReviewControlledHandoffBriefValidator",
  "validateHumanReviewControlledHandoffBrief",
  "getHumanReviewControlledHandoffBriefValidator",
  "humanReviewControlledHandoffBriefValidatorRegistry",
];
const retainedSiblingPaths = [
  "packages/schemas/src/human-review-controlled-handoff-brief-validator.js",
  "tests/human-review-controlled-handoff-brief-validator.test.js",
  "packages/governance/src/human-review-controlled-handoff-brief-cross-reference-validation-boundary.js",
  "tests/human-review-controlled-handoff-brief-cross-reference-validation-boundary.test.js",
];
const historicalValidatorHelperPaths = retainedSiblingPaths.slice(0, 2);
const retainedCrossReferencePaths = retainedSiblingPaths.slice(2);
const exportName = "humanReviewControlledHandoffBriefValidatorResult";

function absolute(relativePath) {
  return path.join(repoRoot, relativePath);
}

function readRequired(relativePath) {
  assert.equal(fs.existsSync(absolute(relativePath)), true, "expected " + relativePath);
  return fs.readFileSync(absolute(relativePath), "utf8");
}

test("validator-result package export scope and controlling sources exist", () => {
  const docsText = readRequired(docsPath);

  for (const sourcePath of sourcePaths) {
    readRequired(sourcePath);
    assert.equal(docsText.includes(fence + sourcePath + fence), true, sourcePath);
  }
  assert.match(
    docsText,
    /HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY/u,
  );
  assert.match(docsText, /DOCS_ONLY/u);
  assert.match(docsText, /APPEND_ONLY_PACKAGE_SCHEMA_EXPORT_SCOPE/u);
});

test("tracked schema identity and structural counts remain exact", () => {
  const docsText = readRequired(docsPath);
  const schema = JSON.parse(readRequired(schemaPath));

  assert.equal(
    schema.$id,
    "https://governance-contracts.invalid/schemas/human-review-controlled-handoff-brief-validator-result.json",
  );
  assert.equal(
    schema.title,
    "Human Review Controlled Handoff Brief Validator Result Contract",
  );
  assert.equal(schema.required.length, 4);
  assert.equal(Object.keys(schema.properties).length, 4);
  assert.equal(schema.oneOf.length, 2);
  assert.equal(schema.properties.errors.items.oneOf.length, 5);
  assert.equal(schema.properties.errors.uniqueItems, true);
  assert.match(docsText, /exactly four required root properties/u);
  assert.match(docsText, /two root state branches/u);
  assert.match(docsText, /five complete code\/path/u);
  assert.match(docsText, /twelve canonical paths/u);
});

test("future package export transition is exactly four files", () => {
  const docsText = readRequired(docsPath);

  assert.match(
    docsText,
    /FUTURE_VALIDATOR_RESULT_PACKAGE_EXPORT_SLICE_FILE_COUNT:\n4/u,
  );
  for (const futurePath of futurePaths) {
    assert.equal(docsText.includes(fence + futurePath + fence), true, futurePath);
  }
  assert.match(docsText, /all runtime files remain\nunchanged/u);
});

test("exact package export symbol source and line-count guard are frozen", () => {
  const docsText = readRequired(docsPath);
  const indexText = readRequired("packages/schemas/src/index.js");

  assert.match(
    docsText,
    /FUTURE_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_NAME:\nhumanReviewControlledHandoffBriefValidatorResult/u,
  );
  assert.equal(
    docsText.includes(
      fence +
        "../../../schemas/human-review-controlled-handoff-brief-validator-result.json" +
        fence,
    ),
    true,
  );
  assert.equal(indexText.split("\n").length - 1, 13165);
  assert.match(docsText, /PACKAGE_INDEX_BASELINE_LINE_COUNT:\n13165/u);
});

test("three historical pre-export conflict families are narrowly transitioned", () => {
  const docsText = readRequired(docsPath);
  const transitionText = readRequired(transitionPath);

  assert.match(
    docsText,
    /LIVE_PRE_EXPORT_PROOF_CONFLICT_FAMILY_COUNT:\n3/u,
  );
  assert.match(transitionText, /PROOF_CONFLICT_FAMILY_COUNT:\n3/u);
  assert.match(
    transitionText,
    /LIVE_PRE_EXPORT_ASSERTION_NARROWING_COUNT:\n5/u,
  );
  for (const fragment of [
    "Object.hasOwn(packageSchemas, exportName)",
    "\"" + exportName + "\"",
    "const packageSchemas = require(\"../packages/schemas/src/index.js\");",
    "Object.hasOwn(",
  ]) {
    assert.equal(
      transitionText.includes(fence + fragment + fence),
      true,
      fragment,
    );
  }
});

test("validator export denials remain live and cross-reference paths are transition-anchored", () => {
  const docsText = readRequired(docsPath);
  const candidateProofText = readRequired(candidatePackageProofPath);
  const validatorHelperProofTransitionText = readRequired(
    validatorHelperProofTransitionPath,
  );

  for (const blockedExport of retainedBlockedExports) {
    assert.equal(
      candidateProofText.includes("\"" + blockedExport + "\""),
      true,
      blockedExport,
    );
    assert.equal(docsText.includes(fence + blockedExport + fence), true, blockedExport);
  }
  for (const historicalPath of historicalValidatorHelperPaths) {
    assert.equal(docsText.includes(fence + historicalPath + fence), true);
    assert.equal(
      validatorHelperProofTransitionText.includes(fence + historicalPath + fence),
      true,
      historicalPath,
    );
  }
  for (const retainedPath of retainedCrossReferencePaths) {
    assert.equal(docsText.includes(fence + retainedPath + fence), true, retainedPath);
    assert.equal(
      crossReferenceProofTransitionText.includes("\`" + retainedPath + "\`"),
      true,
      retainedPath,
    );
  }
  assert.match(
    validatorHelperProofTransitionText,
    /VALIDATOR_HELPER_PATH_LIVE_ABSENCE_TRANSITION_COUNT:\n18/u,
  );
  assert.match(
    validatorHelperProofTransitionText,
    /TRACKED_DOCS_ONLY_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
  assert.match(docsText, /RETAINED_PACKAGE_EXPORT_DENIAL_COUNT:\n4/u);
  assert.match(
    docsText,
    /RETAINED_LATER_SIBLING_PATH_ABSENCE_COUNT:\n4/u,
  );
});

test("future focused proof remains static structural and non-runtime", () => {
  const docsText = readRequired(docsPath);

  assert.match(
    docsText,
    /FUTURE_VALIDATOR_RESULT_PACKAGE_EXPORT_PROOF_ASSERTION_FAMILY_COUNT:\n9/u,
  );
  for (const marker of [
    "strictly identical",
    "one static binding",
    "13165 newline-terminated lines",
    "four validator and dispatch export names remain absent",
    "four validator and cross-reference file paths remain absent",
    "no callable validator",
  ]) {
    assert.equal(docsText.includes(marker), true, marker);
  }
});

test("current docs-only scope is exact and creates no package export", () => {
  const docsText = readRequired(docsPath);
  const transitionText = readRequired(transitionPath);

  assert.match(
    docsText,
    /CURRENT_VALIDATOR_RESULT_PACKAGE_EXPORT_SCOPE_FILE_COUNT:\n2/u,
  );
  for (const currentPath of [docsPath, proofPath]) {
    assert.equal(docsText.includes(fence + currentPath + fence), true, currentPath);
    readRequired(currentPath);
  }
  readRequired(transitionPath);
  assert.equal(docsText.includes(fence + transitionPath + fence), true);
  assert.match(transitionText, /CURRENT_PREREQUISITE_FILE_COUNT:\n2/u);
  assert.match(
    transitionText,
    /PRESERVED_FUTURE_PACKAGE_EXPORT_SLICE_FILE_COUNT:\n4/u,
  );
  assert.match(
    transitionText,
    /TRACKED_DOCS_ONLY_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_DEFINED/u,
  );
  for (const marker of [
    "PACKAGE_SCHEMA_EXPORT_NOT_CREATED_BY_THIS_SLICE",
    "SCHEMA_NOT_CHANGED",
    "VALIDATOR_NOT_CREATED",
    "VALIDATOR_DISPATCH_NOT_CHANGED",
    "VALIDATION_EXECUTION_NOT_CREATED",
    "CROSS_REFERENCE_CHECKPOINT_NOT_CREATED",
    "COMPONENT_ASSEMBLY_NOT_CREATED",
    "HUMAN_REVIEW_OR_APPROVAL_NOT_CREATED",
    "DELIVERY_OR_RELEASE_NOT_CREATED",
    "NO_RUNTIME_BEHAVIOR_CREATED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "TRACKED_DOCS_ONLY_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_SCOPE_DEFINED",
  ]) {
    assert.equal(docsText.includes(marker), true, marker);
  }
  assert.match(docsText, /not schema export implementation[\s\S]*case\ntruth/u);
});
