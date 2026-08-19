"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_CROSS_REFERENCE_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const semanticsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_CROSS_REFERENCE_SEMANTICS_BOUNDARY_v1.md";
const resultSchemaPath =
  "schemas/human-review-declared-packet-review-gaps-cross-reference-result.json";
const alignedTestPaths = [
  "tests/domain-human-review-declared-packet-review-gaps-contract-boundary-doc-freeze.test.js",
  "tests/domain-human-review-declared-packet-review-gaps-validator-result-schema-readiness-boundary-doc-freeze.test.js",
  "tests/domain-human-review-declared-packet-review-gaps-validator-helper-proof-transition-prerequisite-boundary-doc-freeze.test.js",
  "tests/human-review-declared-packet-review-gaps-schema.test.js",
  "tests/domain-human-review-declared-packet-review-gaps-cross-reference-readiness-boundary-doc-freeze.test.js",
  "tests/domain-human-review-declared-packet-review-gaps-cross-reference-semantics-boundary-doc-freeze.test.js",
];
const historicalFuturePaths = [
  docsPath,
  "tests/domain-human-review-declared-packet-review-gaps-cross-reference-proof-transition-prerequisite-boundary-doc-freeze.test.js",
  "packages/governance/src/human-review-declared-packet-review-gaps-cross-reference-validation-boundary.js",
  "tests/human-review-declared-packet-review-gaps-cross-reference-validation-boundary.test.js",
];
const historicalRuntimePaths = historicalFuturePaths.slice(2);

function readRequired(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  assert.equal(fs.existsSync(absolutePath), true, `expected ${relativePath}`);
  return fs.readFileSync(absolutePath, "utf8");
}

test("proof-transition boundary and controlling semantics exist", () => {
  const docsText = readRequired(docsPath);
  readRequired(semanticsPath);

  assert.equal(docsText.includes("`" + semanticsPath + "`"), true);
  assert.match(
    docsText,
    /HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_CROSS_REFERENCE_PROOF_TRANSITION_PREREQUISITE_BOUNDARY/u,
  );
  assert.match(docsText, /DOCS_ONLY/u);
  assert.match(docsText, /APPEND_ONLY_PROOF_TRANSITION_PREREQUISITE/u);
});

test("transition is exactly eight files fourteen outcomes and four future paths", () => {
  const docsText = readRequired(docsPath);

  for (const marker of [
    "CROSS_REFERENCE_PROOF_TRANSITION_FILE_COUNT:\n8",
    "CROSS_REFERENCE_FUTURE_PATH_LIVE_ABSENCE_TRANSITION_COUNT:\n14",
    "CROSS_REFERENCE_RUNTIME_PATH_LIVE_ABSENCE_TRANSITION_COUNT:\n12",
    "CROSS_REFERENCE_PREREQUISITE_PATH_LIVE_ABSENCE_TRANSITION_COUNT:\n2",
    "CROSS_REFERENCE_LIVE_ABSENCE_OWNER_PROOF_COUNT:\n6",
    "CROSS_REFERENCE_FUTURE_RESERVED_PATH_COUNT:\n4",
    "CROSS_REFERENCE_RUNTIME_RESERVED_PATH_COUNT:\n2",
  ]) {
    assert.equal(docsText.includes(marker), true, marker);
  }
  for (const alignedPath of alignedTestPaths) {
    assert.equal(docsText.includes("`" + alignedPath + "`"), true, alignedPath);
  }
  for (const futurePath of historicalFuturePaths) {
    assert.equal(docsText.includes("`" + futurePath + "`"), true, futurePath);
  }
});

test("exact path-to-action mapping is frozen", () => {
  const docsText = readRequired(docsPath);
  const expectedRows = [
    [1, docsPath, "CREATE_APPEND_ONLY_PREREQUISITE"],
    [
      2,
      historicalFuturePaths[1],
      "CREATE_FOCUSED_TRANSITION_PROOF",
    ],
    ...alignedTestPaths.slice(0, 5).map((alignedPath, index) => [
      index + 3,
      alignedPath,
      "REMOVE_TWO_RUNTIME_PATH_LIVE_ABSENCE_OUTCOMES_THEN_ANCHOR_TRANSITION",
    ]),
    [
      8,
      alignedTestPaths[5],
      "REMOVE_TWO_PREREQUISITE_AND_TWO_RUNTIME_PATH_LIVE_ABSENCE_OUTCOMES_THEN_ANCHOR_TRANSITION",
    ],
  ];

  for (const [position, currentPath, action] of expectedRows) {
    assert.equal(
      docsText.includes(
        "| " + position + " | `" + currentPath + "` | `" + action + "` |",
      ),
      true,
      currentPath,
    );
  }
});

test("aligned proofs anchor transition instead of perpetual future-path absence", () => {
  const transitionFileName = path.basename(docsPath);

  for (const alignedPath of alignedTestPaths) {
    const testText = readRequired(alignedPath);
    assert.equal(testText.includes(transitionFileName), true, alignedPath);
    assert.match(
      testText,
      /CROSS_REFERENCE_FUTURE_PATH_LIVE_ABSENCE_TRANSITION_COUNT/u,
      alignedPath,
    );
    assert.match(
      testText,
      /TRACKED_DOCS_ONLY_CROSS_REFERENCE_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
      alignedPath,
    );
  }
});

test("former future-path absence expressions are removed", () => {
  const alignedText = alignedTestPaths.map(readRequired).join("\n");

  for (const expression of [
    "fs.existsSync(absolute(retainedPath))",
    "fs.existsSync(path.join(repoRoot, relativePath))",
    "fs.existsSync(path.join(repoRoot, retainedPath))",
    "fs.existsSync(path.join(repoRoot, futurePath))",
    "fs.existsSync(path.join(repoRoot, absentPath))",
  ]) {
    assert.equal(alignedText.includes(expression), false, expression);
  }
});

test("result schema and static package export prerequisites remain exact", () => {
  const directSchema = require("../schemas/human-review-declared-packet-review-gaps-cross-reference-result.json");
  const packageSchemas = require("../packages/schemas/src/index.js");
  const docsText = readRequired(docsPath);

  readRequired(resultSchemaPath);
  assert.strictEqual(
    packageSchemas.humanReviewDeclaredPacketReviewGapsCrossReferenceResult,
    directSchema,
  );
  assert.match(
    docsText,
    /RESULT_SCHEMA_STATUS:\nTRACKED_AND_STATICALLY_PACKAGE_EXPORTED/u,
  );
  assert.match(
    docsText,
    /RESULT_SCHEMA_OR_PACKAGE_MUTATION_BY_THIS_SLICE:\nNONE/u,
  );
  assert.equal(
    Object.hasOwn(
      packageSchemas,
      "validateHumanReviewDeclaredPacketReviewGapsCrossReference",
    ),
    false,
  );
});

test("later runtime remains a separate exact two-file eight-phase slice", () => {
  const docsText = readRequired(docsPath);

  assert.match(docsText, /CROSS_REFERENCE_RUNTIME_IMPLEMENTATION_FILE_COUNT:\n2/u);
  for (const runtimePath of historicalRuntimePaths) {
    assert.equal(docsText.includes("- `" + runtimePath + "`"), true, runtimePath);
  }
  assert.match(docsText, /eight-phase execution/u);
  assert.match(docsText, /separate explicit\s+`RUNTIME_CHANGE` slice/u);
});

test("transition preserves non-implementation and no-conclusion boundaries", () => {
  const docsText = readRequired(docsPath);

  for (const marker of [
    "HISTORICAL_CROSS_REFERENCE_ABSENCE_MARKERS_PRESERVED",
    "RESULT_SCHEMA_AND_STATIC_PACKAGE_EXPORT_PRESERVED",
    "CROSS_REFERENCE_CHECKPOINT_NOT_CREATED_BY_THIS_SLICE",
    "CROSS_REFERENCE_CHECKPOINT_TEST_NOT_CREATED_BY_THIS_SLICE",
    "GOVERNANCE_PACKAGE_EXPORT_NOT_CREATED",
    "CALLER_PERSISTENCE_API_ROUTE_PROVIDER_MODEL_UI_NOT_CREATED",
    "LOGGING_TELEMETRY_AUDIT_NOT_CREATED",
    "NO_RUNTIME_BEHAVIOR_CREATED",
    "NO_REAL_PRIVATE_SOURCE_OR_CASE_MATERIAL_PROCESSED",
    "NO_DOMAIN_FINDING_SCORE_OR_CONCLUSION_CREATED",
    "NO_APPROVAL_OR_RELEASE_PRODUCT_IMPLEMENTATION_READINESS_CREATED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "TRACKED_DOCS_ONLY_CROSS_REFERENCE_PROOF_TRANSITION_PREREQUISITE_DEFINED",
  ]) {
    assert.match(docsText, new RegExp(marker, "u"));
  }

  assert.match(docsText, /Human\/professional review remains the release gate/u);
  assert.match(docsText, /not actual human review[\s\S]*real-evidence review/u);
});
