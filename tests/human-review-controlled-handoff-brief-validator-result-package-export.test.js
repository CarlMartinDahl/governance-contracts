"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const resultSchema = require(
  "../schemas/human-review-controlled-handoff-brief-validator-result.json",
);
const packageSchemas = require("../packages/schemas/src/index.js");

const repoRoot = path.join(__dirname, "..");
const crossReferenceProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_CROSS_REFERENCE_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const crossReferenceProofTransitionText = fs.readFileSync(
  path.join(repoRoot, crossReferenceProofTransitionPath),
  "utf8",
);
const packageIndexPath =
  "packages/schemas/src/index.js";
const candidatePackageProofPath =
  "tests/human-review-controlled-handoff-brief-package-export.test.js";
const validatorResultProofPath =
  "tests/human-review-controlled-handoff-brief-validator-result-schema.test.js";
const scopePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_v1.md";
const transitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const validatorHelperProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const exportName = "humanReviewControlledHandoffBriefValidatorResult";
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

function absolute(relativePath) {
  return path.join(repoRoot, relativePath);
}

function readRequired(relativePath) {
  assert.equal(fs.existsSync(absolute(relativePath)), true, "expected " + relativePath);
  return fs.readFileSync(absolute(relativePath), "utf8");
}

function containsCallable(value) {
  if (typeof value === "function") return true;
  if (Array.isArray(value)) return value.some(containsCallable);
  if (value === null || typeof value !== "object") return false;
  return Object.values(value).some(containsCallable);
}

test("packages/schemas exports the exact validator-result schema object", () => {
  assert.equal(Object.hasOwn(packageSchemas, exportName), true);
  assert.strictEqual(packageSchemas[exportName], resultSchema);
  assert.deepEqual(packageSchemas[exportName], resultSchema);
  assert.equal(
    packageSchemas[exportName].$id,
    "https://governance-contracts.invalid/schemas/human-review-controlled-handoff-brief-validator-result.json",
  );
  assert.equal(
    packageSchemas[exportName].title,
    "Human Review Controlled Handoff Brief Validator Result Contract",
  );
});

test("package export preserves the exact structural result contract", () => {
  const exported = packageSchemas[exportName];
  const branches = exported.properties.errors.items.oneOf;

  assert.deepEqual(exported.required, [
    "valid",
    "contractKind",
    "version",
    "errors",
  ]);
  assert.deepEqual(Object.keys(exported.properties), exported.required);
  assert.equal(exported.additionalProperties, false);
  assert.equal(exported.oneOf.length, 2);
  assert.equal(exported.properties.errors.uniqueItems, true);
  assert.equal(branches.length, 5);
  assert.deepEqual(
    branches.map((branch) => branch.properties.code.const),
    [
      "required_field_missing",
      "unexpected_field",
      "invalid_field_type",
      "invalid_field_value",
      "duplicate_component_ref",
    ],
  );
  assert.deepEqual(
    branches.map((branch) => branch.properties.path.enum.length),
    [11, 2, 12, 10, 5],
  );
});

test("package index uses one static binding and one schema-object export", () => {
  const indexText = readRequired(packageIndexPath);
  const occurrences =
    indexText.match(/\bhumanReviewControlledHandoffBriefValidatorResult\b/gu) ??
    [];

  assert.equal(occurrences.length, 3);
  assert.match(
    indexText,
    /humanReviewControlledHandoffBriefValidatorResult = require\("\.\.\/\.\.\/\.\.\/schemas\/human-review-controlled-handoff-brief-validator-result\.json"\)/u,
  );
  assert.match(
    indexText,
    /module\.exports\.humanReviewControlledHandoffBriefValidatorResult = humanReviewControlledHandoffBriefValidatorResult/u,
  );
});

test("package index preserves the exact newline baseline", () => {
  const indexText = readRequired(packageIndexPath);

  assert.equal(indexText.endsWith("\n"), true);
  assert.equal(indexText.split("\n").length - 1, 13165);
});

test("candidate proof releases only the result schema export denial", () => {
  const candidateProofText = readRequired(candidatePackageProofPath);

  assert.equal(candidateProofText.includes("\"" + exportName + "\""), false);
  for (const blockedExport of retainedBlockedExports) {
    assert.equal(
      candidateProofText.includes("\"" + blockedExport + "\""),
      true,
      blockedExport,
    );
    assert.equal(Object.hasOwn(packageSchemas, blockedExport), false, blockedExport);
  }
});

test("schema proof releases only package ownership absence", () => {
  const schemaProofText = readRequired(validatorResultProofPath);
  const validatorHelperProofTransitionText = readRequired(
    validatorHelperProofTransitionPath,
  );

  assert.equal(
    schemaProofText.includes(
      "const packageSchemas = require(\"../packages/schemas/src/index.js\");",
    ),
    false,
  );
  assert.equal(schemaProofText.includes("\"" + exportName + "\""), false);
  for (const historicalPath of historicalValidatorHelperPaths) {
    assert.equal(schemaProofText.includes("\"" + historicalPath + "\""), true);
    assert.equal(
      validatorHelperProofTransitionText.includes("`" + historicalPath + "`"),
      true,
      historicalPath,
    );
  }
  for (const retainedPath of retainedCrossReferencePaths) {
    assert.equal(schemaProofText.includes("\"" + retainedPath + "\""), true);
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
});

test("package export remains anchored to scope and proof transition", () => {
  const scopeText = readRequired(scopePath);
  const transitionText = readRequired(transitionPath);

  assert.match(
    scopeText,
    /FUTURE_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_NAME:\nhumanReviewControlledHandoffBriefValidatorResult/u,
  );
  assert.match(
    scopeText,
    /FUTURE_VALIDATOR_RESULT_PACKAGE_EXPORT_SLICE_FILE_COUNT:\n4/u,
  );
  assert.match(
    transitionText,
    /PRESERVED_FUTURE_PACKAGE_EXPORT_SLICE_FILE_COUNT:\n4/u,
  );
  assert.match(
    transitionText,
    /TRACKED_DOCS_ONLY_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_DEFINED/u,
  );
  assert.match(scopeText, /NO_RUNTIME_BEHAVIOR_CREATED/u);
  assert.match(transitionText, /HUMAN_PROFESSIONAL_REVIEW_REQUIRED/u);
});

test("static schema-object export exposes no callable handoff behavior", () => {
  const exported = packageSchemas[exportName];

  assert.equal(typeof exported, "object");
  assert.equal(containsCallable(exported), false);
  for (const behaviorName of [
    "validateHumanReviewControlledHandoffBrief",
    "assembleHumanReviewControlledHandoffBrief",
    "approveHumanReviewControlledHandoffBrief",
    "deliverHumanReviewControlledHandoffBrief",
  ]) {
    assert.equal(Object.hasOwn(packageSchemas, behaviorName), false, behaviorName);
  }
});
