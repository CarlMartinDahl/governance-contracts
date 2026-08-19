"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const resultSchema = require(
  "../schemas/human-review-controlled-handoff-human-professional-approval-review-session-evidence-validator-result.json",
);
const candidateSchema = require(
  "../schemas/human-review-controlled-handoff-human-professional-approval-review-session-evidence.json",
);
const packageSchemas = require("../packages/schemas/src/index.js");

const repoRoot = path.join(__dirname, "..");
const packageIndexPath = "packages/schemas/src/index.js";
const scopePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEW_SESSION_EVIDENCE_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_v1.md";
const transitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_REVIEW_SESSION_EVIDENCE_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const exportName =
  "humanReviewControlledHandoffHumanProfessionalApprovalReviewSessionEvidenceValidatorResult";
const candidateExportName =
  "humanReviewControlledHandoffHumanProfessionalApprovalReviewSessionEvidence";
const rootFields = ["valid", "contractKind", "version", "errors"];
const errorFields = ["code", "path"];
const blockedValidatorExports = [
  "humanReviewControlledHandoffHumanProfessionalApprovalReviewSessionEvidenceValidator",
  "getHumanReviewControlledHandoffHumanProfessionalApprovalReviewSessionEvidenceValidator",
  "humanReviewControlledHandoffHumanProfessionalApprovalReviewSessionEvidenceValidatorRegistry",
];

function absolute(relativePath) {
  return path.join(repoRoot, relativePath);
}

function readRequired(relativePath) {
  assert.equal(fs.existsSync(absolute(relativePath)), true, relativePath);
  return fs.readFileSync(absolute(relativePath), "utf8");
}

function countKey(value, key, predicate = () => true) {
  if (Array.isArray(value)) {
    return value.reduce(
      (count, item) => count + countKey(item, key, predicate),
      0,
    );
  }
  if (value === null || typeof value !== "object") return 0;
  return Object.entries(value).reduce(
    (count, [entryKey, entryValue]) =>
      count +
      (entryKey === key && predicate(entryValue) ? 1 : 0) +
      countKey(entryValue, key, predicate),
    0,
  );
}

function containsCallable(value) {
  if (typeof value === "function") return true;
  if (Array.isArray(value)) return value.some(containsCallable);
  if (value === null || typeof value !== "object") return false;
  return Object.values(value).some(containsCallable);
}

test("packages/schemas exports the exact review session evidence validator-result schema object", () => {
  assert.equal(Object.hasOwn(packageSchemas, exportName), true);
  assert.strictEqual(packageSchemas[exportName], resultSchema);
  assert.deepEqual(packageSchemas[exportName], resultSchema);
});

test("validator-result export preserves identity and exact field order", () => {
  const exported = packageSchemas[exportName];

  assert.equal(
    exported.$id,
    "https://governance-contracts.invalid/schemas/human-review-controlled-handoff-human-professional-approval-review-session-evidence-validator-result.json",
  );
  assert.equal(
    exported.title,
    "Human Review Controlled Handoff Human/Professional Approval Review Session Evidence Validator Result Contract",
  );
  assert.deepEqual(exported.required, rootFields);
  assert.deepEqual(Object.keys(exported.properties), rootFields);
  assert.deepEqual(exported.properties.errors.items.required, errorFields);
  assert.deepEqual(
    Object.keys(exported.properties.errors.items.properties),
    errorFields,
  );
  for (const branch of exported.properties.errors.items.oneOf) {
    assert.deepEqual(Object.keys(branch.properties), errorFields);
  }
});

test("validator-result export preserves exact schema keyword counts", () => {
  const exported = packageSchemas[exportName];

  assert.deepEqual(
    {
      const: countKey(exported, "const"),
      enum: countKey(exported, "enum"),
      pattern: countKey(exported, "pattern"),
      oneOf: countKey(exported, "oneOf"),
      closed: countKey(
        exported,
        "additionalProperties",
        (value) => value === false,
      ),
    },
    { const: 10, enum: 4, pattern: 0, oneOf: 2, closed: 2 },
  );
});

test("validator-result export preserves exact cardinality and uniqueness", () => {
  const exported = packageSchemas[exportName];

  assert.equal(countKey(exported, "minItems"), 1);
  assert.equal(countKey(exported, "maxItems"), 1);
  assert.equal(countKey(exported, "uniqueItems"), 1);
  assert.equal(exported.properties.errors.uniqueItems, true);
});

test("completed candidate schema export remains unchanged", () => {
  assert.equal(Object.hasOwn(packageSchemas, candidateExportName), true);
  assert.strictEqual(packageSchemas[candidateExportName], candidateSchema);
  assert.equal(
    packageSchemas[candidateExportName].$id,
    "https://governance-contracts.invalid/schemas/human-review-controlled-handoff-human-professional-approval-review-session-evidence.json",
  );
});

test("validator-object lookup and registry exports remain absent", () => {
  for (const blockedExport of blockedValidatorExports) {
    assert.equal(Object.hasOwn(packageSchemas, blockedExport), false, blockedExport);
  }
});

test("package index uses one static result binding and schema-object export", () => {
  const indexText = readRequired(packageIndexPath);
  const occurrences =
    indexText.match(
      /\bhumanReviewControlledHandoffHumanProfessionalApprovalReviewSessionEvidenceValidatorResult\b/gu,
    ) ?? [];

  assert.equal(occurrences.length, 3);
  assert.equal(indexText.endsWith("\n"), true);
  assert.equal(indexText.split("\n").length - 1, 13165);
  assert.match(
    indexText,
    /humanReviewControlledHandoffHumanProfessionalApprovalReviewSessionEvidenceValidatorResult = require\("\.\.\/\.\.\/\.\.\/schemas\/human-review-controlled-handoff-human-professional-approval-review-session-evidence-validator-result\.json"\)/u,
  );
  assert.match(
    indexText,
    /module\.exports\.humanReviewControlledHandoffHumanProfessionalApprovalReviewSessionEvidenceValidatorResult = humanReviewControlledHandoffHumanProfessionalApprovalReviewSessionEvidenceValidatorResult/u,
  );
});

test("package export remains anchored to exact scope and proof transition", () => {
  const scopeText = readRequired(scopePath);
  const transitionText = readRequired(transitionPath);

  assert.match(
    scopeText,
    /FUTURE_VALIDATOR_RESULT_PACKAGE_EXPORT_SLICE_FILE_COUNT:\n2/u,
  );
  assert.match(
    scopeText,
    /FUTURE_VALIDATOR_RESULT_PACKAGE_SCHEMA_EXPORT_NAME:\nhumanReviewControlledHandoffHumanProfessionalApprovalReviewSessionEvidenceValidatorResult/u,
  );
  assert.match(
    scopeText,
    /FUTURE_VALIDATOR_RESULT_PACKAGE_EXPORT_PROOF_ASSERTION_FAMILY_COUNT:\n9/u,
  );
  assert.match(
    transitionText,
    /TRACKED_DOCS_ONLY_FIRST_VALIDATOR_RESULT_PACKAGE_EXPORT_PROOF_TRANSITION_DEFINED/u,
  );
});

test("static schema export creates no callable session approval handoff or runtime behavior", () => {
  const exported = packageSchemas[exportName];

  assert.equal(typeof exported, "object");
  assert.equal(containsCallable(exported), false);
  for (const behaviorName of [
    "verifyHumanReviewControlledHandoffHumanProfessionalApprovalReviewSessionEvidence",
    "approveHumanReviewControlledHandoffHumanProfessionalApprovalReviewSessionEvidence",
    "handoffHumanReviewControlledHandoffHumanProfessionalApprovalReviewSessionEvidence",
    "deliverHumanReviewControlledHandoffHumanProfessionalApprovalReviewSessionEvidence",
    "releaseHumanReviewControlledHandoffHumanProfessionalApprovalReviewSessionEvidence",
  ]) {
    assert.equal(Object.hasOwn(packageSchemas, behaviorName), false, behaviorName);
  }
});
