"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const schema = require("../schemas/human-review-declared-packet-review-gaps-cross-reference-result.json");
const declaredPacketReviewGapsResultSchema = require("../schemas/human-review-declared-packet-review-gaps-validator-result.json");
const sourceRegisterResultSchema = require("../schemas/human-review-source-register-validator-result.json");
const chronologyResultSchema = require("../schemas/human-review-chronology-validator-result.json");
const assertedClaimMatrixResultSchema = require("../schemas/human-review-asserted-claim-matrix-validator-result.json");
const chronologyCrossReferenceResultSchema = require("../schemas/human-review-chronology-source-register-cross-reference-result.json");
const assertedClaimMatrixCrossReferenceResultSchema = require("../schemas/human-review-asserted-claim-matrix-cross-reference-result.json");
const packageSchemas = require("../packages/schemas/src/index.js");

const packageIndexPath = path.join(
  __dirname,
  "..",
  "packages",
  "schemas",
  "src",
  "index.js",
);
const scopeDocPath = path.join(
  __dirname,
  "..",
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_CROSS_REFERENCE_RESULT_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_v1.md",
);
const proofTransitionDocPath = path.join(
  __dirname,
  "..",
  "docs",
  "DOMAIN_CONTRACTS_HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_CROSS_REFERENCE_RESULT_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
);
const exportName =
  "humanReviewDeclaredPacketReviewGapsCrossReferenceResult";
const childResultExports = [
  [
    "humanReviewDeclaredPacketReviewGapsValidatorResult",
    declaredPacketReviewGapsResultSchema,
  ],
  ["humanReviewSourceRegisterValidatorResult", sourceRegisterResultSchema],
  ["humanReviewChronologyValidatorResult", chronologyResultSchema],
  [
    "humanReviewAssertedClaimMatrixValidatorResult",
    assertedClaimMatrixResultSchema,
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
];

test("packages/schemas exports the exact declared-gaps cross-reference result schema object", () => {
  assert.equal(Object.hasOwn(packageSchemas, exportName), true);
  assert.strictEqual(packageSchemas[exportName], schema);
  assert.deepEqual(packageSchemas[exportName], schema);
  assert.equal(
    packageSchemas[exportName].$id,
    "https://governance-contracts.invalid/schemas/human-review-declared-packet-review-gaps-cross-reference-result.json",
  );
  assert.equal(
    packageSchemas[exportName].title,
    "Human Review Declared Packet Review Gaps Cross-Reference Result Contract",
  );
});

test("package export preserves the exact structural result contract", () => {
  const exportedSchema = packageSchemas[exportName];
  const branches = exportedSchema.properties.errors.items.oneOf;
  const pathAlternativeCount = branches.reduce(
    (count, branch) =>
      count + (branch.properties.path.enum?.length ?? 1),
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
  assert.equal(branches.length, 9);
  assert.equal(pathAlternativeCount, 11);
  assert.equal(exportedSchema.properties.errors.uniqueItems, true);
  assert.equal(
    exportedSchema.properties.contractKind.const,
    "HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_CROSS_REFERENCE_BOUNDARY",
  );
  assert.equal(exportedSchema.properties.version.const, "1.0.0");
});

test("child and prior cross-reference result exports remain identical while execution stays outside", () => {
  for (const [childExportName, childSchema] of childResultExports) {
    assert.equal(Object.hasOwn(packageSchemas, childExportName), true);
    assert.strictEqual(packageSchemas[childExportName], childSchema);
  }
  for (const [priorExportName, priorSchema] of priorCrossReferenceResultExports) {
    assert.equal(Object.hasOwn(packageSchemas, priorExportName), true);
    assert.strictEqual(packageSchemas[priorExportName], priorSchema);
  }
  assert.equal(
    Object.hasOwn(
      packageSchemas,
      "validateHumanReviewDeclaredPacketReviewGapsCrossReference",
    ),
    false,
  );
});

test("package index uses one static binding and one export property", () => {
  const indexText = fs.readFileSync(packageIndexPath, "utf8");
  const occurrences = indexText.match(
    /\bhumanReviewDeclaredPacketReviewGapsCrossReferenceResult\b/gu,
  ) ?? [];

  assert.equal(occurrences.length, 3);
  assert.equal((indexText.match(/\n/gu) ?? []).length, 13165);
  assert.match(
    indexText,
    /humanReviewDeclaredPacketReviewGapsCrossReferenceResult = require\("\.\.\/\.\.\/\.\.\/schemas\/human-review-declared-packet-review-gaps-cross-reference-result\.json"\)/u,
  );
  assert.match(
    indexText,
    /module\.exports\.humanReviewDeclaredPacketReviewGapsCrossReferenceResult = humanReviewDeclaredPacketReviewGapsCrossReferenceResult/u,
  );
  assert.match(
    indexText,
    /humanReviewDeclaredPacketReviewGapsValidatorResult = require\("\.\.\/\.\.\/\.\.\/schemas\/human-review-declared-packet-review-gaps-validator-result\.json"\), humanReviewDeclaredPacketReviewGapsCrossReferenceResult/u,
  );
  assert.match(
    indexText,
    /module\.exports\.humanReviewDeclaredPacketReviewGapsValidatorResult = humanReviewDeclaredPacketReviewGapsValidatorResult; module\.exports\.humanReviewDeclaredPacketReviewGapsCrossReferenceResult/u,
  );
});

test("package export remains anchored to scope and proof-transition boundaries", () => {
  const scopeText = fs.readFileSync(scopeDocPath, "utf8");
  const transitionText = fs.readFileSync(proofTransitionDocPath, "utf8");

  assert.match(
    scopeText,
    /FUTURE_CROSS_REFERENCE_RESULT_PACKAGE_SCHEMA_EXPORT_NAME:\nhumanReviewDeclaredPacketReviewGapsCrossReferenceResult/u,
  );
  assert.match(scopeText, /PACKAGE_INDEX_BASELINE_LINE_COUNT:\n13165/u);
  assert.match(
    scopeText,
    /FUTURE_CROSS_REFERENCE_RESULT_PACKAGE_EXPORT_SLICE_FILE_COUNT:\n2/u,
  );
  assert.match(
    transitionText,
    /PACKAGE_SCHEMA_EXPORT_SYMBOL_ASSERTION_TRANSITION_COUNT:\n3/u,
  );
  assert.match(
    transitionText,
    /PACKAGE_SCHEMA_EXPORT_PROOF_PATH_ASSERTION_TRANSITION_COUNT:\n1/u,
  );
  assert.match(
    transitionText,
    /PACKAGE_SCHEMA_EXPORT_TOTAL_LIVE_ABSENCE_TRANSITION_COUNT:\n4/u,
  );
  assert.match(
    transitionText,
    /RETAINED_PACKAGE_SCHEMA_EXPORT_LIVE_ABSENCE_ASSERTION_COUNT:\n0/u,
  );
  assert.match(
    transitionText,
    /TRACKED_DOCS_ONLY_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_DEFINED/u,
  );
});

test("static schema export creates no validator runtime or conclusion", () => {
  const scopeText = fs.readFileSync(scopeDocPath, "utf8");

  assert.equal(typeof packageSchemas[exportName], "object");
  assert.match(scopeText, /Exporting a static JSON schema object does not create/u);
  assert.match(scopeText, /VALIDATOR_NOT_CREATED/u);
  assert.match(scopeText, /CROSS_REFERENCE_EXECUTION_NOT_CREATED/u);
  assert.match(scopeText, /NO_RUNTIME_BEHAVIOR_CREATED/u);
  assert.match(scopeText, /HUMAN_PROFESSIONAL_REVIEW_REQUIRED/u);
  assert.match(scopeText, /not actual human review[\s\S]*real-evidence review/u);
});
