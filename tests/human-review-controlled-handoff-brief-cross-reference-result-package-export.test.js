"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const schema = require("../schemas/human-review-controlled-handoff-brief-cross-reference-result.json");
const controlledHandoffResultSchema = require("../schemas/human-review-controlled-handoff-brief-validator-result.json");
const sourceRegisterResultSchema = require("../schemas/human-review-source-register-validator-result.json");
const chronologyResultSchema = require("../schemas/human-review-chronology-validator-result.json");
const assertedClaimMatrixResultSchema = require("../schemas/human-review-asserted-claim-matrix-validator-result.json");
const declaredPacketReviewGapsResultSchema = require("../schemas/human-review-declared-packet-review-gaps-validator-result.json");
const questionsResultSchema = require("../schemas/human-review-questions-validator-result.json");
const noConclusionNoticeResultSchema = require("../schemas/human-review-no-conclusion-notice-validator-result.json");
const chronologyCrossReferenceResultSchema = require("../schemas/human-review-chronology-source-register-cross-reference-result.json");
const assertedClaimMatrixCrossReferenceResultSchema = require("../schemas/human-review-asserted-claim-matrix-cross-reference-result.json");
const declaredPacketReviewGapsCrossReferenceResultSchema = require("../schemas/human-review-declared-packet-review-gaps-cross-reference-result.json");
const questionsCrossReferenceResultSchema = require("../schemas/human-review-questions-cross-reference-result.json");
const noConclusionNoticeCrossReferenceResultSchema = require("../schemas/human-review-no-conclusion-notice-cross-reference-result.json");
const packageSchemas = require("../packages/schemas/src/index.js");
const packageGovernance = require("../packages/governance/src/index.js");

const repoRoot = path.join(__dirname, "..");
const crossReferenceProofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_CROSS_REFERENCE_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const crossReferenceProofTransitionText = fs.readFileSync(
  path.join(repoRoot, crossReferenceProofTransitionPath),
  "utf8",
);
const packageIndexPath = path.join(
  repoRoot,
  "packages",
  "schemas",
  "src",
  "index.js",
);
const semanticsDocPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_CROSS_REFERENCE_SEMANTICS_BOUNDARY_v1.md",
);
const proofTransitionDocPath = path.join(
  repoRoot,
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_CROSS_REFERENCE_RESULT_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
);
const exportName =
  "humanReviewControlledHandoffBriefCrossReferenceResult";
const runtimeFunctionName =
  "validateHumanReviewControlledHandoffBriefCrossReference";
const runtimePaths = [
  "packages/governance/src/human-review-controlled-handoff-brief-cross-reference-validation-boundary.js",
  "tests/human-review-controlled-handoff-brief-cross-reference-validation-boundary.test.js",
];
const childResultExports = [
  [
    "humanReviewControlledHandoffBriefValidatorResult",
    controlledHandoffResultSchema,
  ],
  ["humanReviewSourceRegisterValidatorResult", sourceRegisterResultSchema],
  ["humanReviewChronologyValidatorResult", chronologyResultSchema],
  [
    "humanReviewAssertedClaimMatrixValidatorResult",
    assertedClaimMatrixResultSchema,
  ],
  [
    "humanReviewDeclaredPacketReviewGapsValidatorResult",
    declaredPacketReviewGapsResultSchema,
  ],
  ["humanReviewQuestionsValidatorResult", questionsResultSchema],
  [
    "humanReviewNoConclusionNoticeValidatorResult",
    noConclusionNoticeResultSchema,
  ],
];
const priorCrossReferenceResultExports = [
  [
    "humanReviewChronologySourceRegisterCrossReferenceResult",
    chronologyCrossReferenceResultSchema,
  ],
  [
    "humanReviewAssertedClaimMatrixCrossReferenceResult",
    assertedClaimMatrixCrossReferenceResultSchema,
  ],
  [
    "humanReviewDeclaredPacketReviewGapsCrossReferenceResult",
    declaredPacketReviewGapsCrossReferenceResultSchema,
  ],
  [
    "humanReviewQuestionsCrossReferenceResult",
    questionsCrossReferenceResultSchema,
  ],
  [
    "humanReviewNoConclusionNoticeCrossReferenceResult",
    noConclusionNoticeCrossReferenceResultSchema,
  ],
];

test("schemas package exports the exact controlled handoff cross-reference result object", () => {
  assert.equal(Object.hasOwn(packageSchemas, exportName), true);
  assert.strictEqual(packageSchemas[exportName], schema);
  assert.deepEqual(packageSchemas[exportName], schema);
  assert.equal(
    packageSchemas[exportName].$id,
    "https://governance-contracts.invalid/schemas/human-review-controlled-handoff-brief-cross-reference-result.json",
  );
  assert.equal(
    packageSchemas[exportName].title,
    "Human Review Controlled Handoff Brief Cross-Reference Result Contract",
  );
});

test("package export preserves the exact four-field ten-code contract", () => {
  const exportedSchema = packageSchemas[exportName];
  const branches = exportedSchema.properties.errors.items.oneOf;
  const pathAlternativeCount = branches.reduce(
    (count, branch) => count + (branch.properties.path.enum?.length ?? 1),
    0,
  );

  assert.deepEqual(exportedSchema.required, [
    "valid",
    "contractKind",
    "version",
    "errors",
  ]);
  assert.deepEqual(Object.keys(exportedSchema.properties), [
    "valid",
    "contractKind",
    "version",
    "errors",
  ]);
  assert.equal(exportedSchema.oneOf.length, 2);
  assert.equal(branches.length, 10);
  assert.equal(pathAlternativeCount, 20);
  assert.equal(
    branches.some(
      (branch) => typeof branch.properties.path.pattern === "string",
    ),
    false,
  );
  assert.equal(exportedSchema.properties.errors.uniqueItems, true);
  assert.equal(
    exportedSchema.properties.contractKind.const,
    "HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_CROSS_REFERENCE_BOUNDARY",
  );
  assert.equal(exportedSchema.properties.version.const, "1.0.0");
});

test("child and predecessor result exports remain identical", () => {
  assert.equal(childResultExports.length, 7);
  for (const [childExportName, childSchema] of childResultExports) {
    assert.equal(Object.hasOwn(packageSchemas, childExportName), true);
    assert.strictEqual(packageSchemas[childExportName], childSchema);
  }
  assert.equal(priorCrossReferenceResultExports.length, 5);
  for (const [priorExportName, priorSchema] of priorCrossReferenceResultExports) {
    assert.equal(Object.hasOwn(packageSchemas, priorExportName), true);
    assert.strictEqual(packageSchemas[priorExportName], priorSchema);
  }
});

test("package index uses one static binding and one export property", () => {
  const indexText = fs.readFileSync(packageIndexPath, "utf8");
  const occurrences =
    indexText.match(
      /\bhumanReviewControlledHandoffBriefCrossReferenceResult\b/gu,
    ) ?? [];

  assert.equal(occurrences.length, 3);
  assert.equal((indexText.match(/\n/gu) ?? []).length, 13165);
  assert.match(
    indexText,
    /humanReviewControlledHandoffBriefCrossReferenceResult = require\("\.\.\/\.\.\/\.\.\/schemas\/human-review-controlled-handoff-brief-cross-reference-result\.json"\)/u,
  );
  assert.match(
    indexText,
    /module\.exports\.humanReviewControlledHandoffBriefCrossReferenceResult = humanReviewControlledHandoffBriefCrossReferenceResult/u,
  );
  assert.match(
    indexText,
    /humanReviewControlledHandoffBriefValidatorResult = require\("\.\.\/\.\.\/\.\.\/schemas\/human-review-controlled-handoff-brief-validator-result\.json"\), humanReviewControlledHandoffBriefCrossReferenceResult/u,
  );
  assert.match(
    indexText,
    /module\.exports\.humanReviewControlledHandoffBriefValidatorResult = humanReviewControlledHandoffBriefValidatorResult; module\.exports\.humanReviewControlledHandoffBriefCrossReferenceResult/u,
  );
});

test("package export is anchored to semantics and proof transition", () => {
  const semanticsText = fs.readFileSync(semanticsDocPath, "utf8");
  const transitionText = fs.readFileSync(proofTransitionDocPath, "utf8");

  assert.equal(semanticsText.includes(exportName), true);
  assert.match(semanticsText, /CROSS_REFERENCE_RESULT_FIELD_COUNT:\n4/u);
  assert.match(semanticsText, /CROSS_REFERENCE_ERROR_CODE_COUNT:\n10/u);
  assert.match(
    transitionText,
    /PACKAGE_SCHEMA_EXPORT_SYMBOL_ASSERTION_TRANSITION_COUNT:\n2/u,
  );
  assert.match(
    transitionText,
    /PACKAGE_SCHEMA_EXPORT_PROOF_PATH_ASSERTION_TRANSITION_COUNT:\n2/u,
  );
  assert.match(
    transitionText,
    /PACKAGE_SCHEMA_EXPORT_TOTAL_LIVE_ABSENCE_TRANSITION_COUNT:\n4/u,
  );
  assert.match(
    transitionText,
    /FUTURE_PACKAGE_SCHEMA_EXPORT_IMPLEMENTATION_FILE_COUNT:\n2/u,
  );
  assert.match(transitionText, /PACKAGE_INDEX_BASELINE_LINE_COUNT:\n13165/u);
});

test("static schema export creates no governance runtime or conclusion", () => {
  const semanticsText = fs.readFileSync(semanticsDocPath, "utf8");

  assert.equal(typeof packageSchemas[exportName], "object");
  assert.equal(Object.hasOwn(packageSchemas, runtimeFunctionName), false);
  assert.equal(Object.hasOwn(packageGovernance, runtimeFunctionName), false);
  for (const runtimePath of runtimePaths) {
    assert.equal(
      crossReferenceProofTransitionText.includes("\`" + runtimePath + "\`"),
      true,
      runtimePath,
    );
  }
  for (const marker of [
    "CROSS_REFERENCE_CHECKPOINT_NOT_CREATED",
    "NO_APPROVAL_OR_RELEASE_PRODUCT_IMPLEMENTATION_READINESS_CREATED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
  ]) {
    assert.match(semanticsText, new RegExp(marker, "u"));
  }
  assert.match(
    semanticsText,
    /not actual human review[\s\S]*real-evidence review/u,
  );
});
