"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md";
const contractPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_CONTRACT_BOUNDARY_v1.md";
const readinessPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_SCHEMA_READINESS_BOUNDARY_v1.md";
const proofTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const sourcePaths = [
  contractPath,
  readinessPath,
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_SOURCE_REGISTER_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CHRONOLOGY_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_ASSERTED_CLAIM_MATRIX_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "schemas/human-review-source-register.json",
  "schemas/human-review-chronology.json",
  "schemas/human-review-asserted-claim-matrix.json",
  "tests/human-review-source-register-schema.test.js",
  "packages/schemas/src/index.js",
];
const futureSchemaPath =
  "schemas/human-review-declared-packet-review-gaps.json";
const futureProofPath =
  "tests/human-review-declared-packet-review-gaps-schema.test.js";

function absolute(relativePath) {
  return path.join(repoRoot, relativePath);
}

function readRequired(relativePath) {
  assert.equal(fs.existsSync(absolute(relativePath)), true, relativePath);
  return fs.readFileSync(absolute(relativePath), "utf8");
}

function section(text, heading, nextHeading) {
  const start = text.indexOf(heading);
  assert.notEqual(start, -1, heading);
  const end = text.indexOf(nextHeading, start + heading.length);
  assert.notEqual(end, -1, nextHeading);
  return text.slice(start, end);
}

test("schema-scaffold scope and every controlling source exist", () => {
  const docsText = readRequired(docsPath);

  for (const sourcePath of sourcePaths) {
    readRequired(sourcePath);
    assert.equal(docsText.includes("`" + sourcePath + "`"), true, sourcePath);
  }
  for (const marker of [
    "HUMAN_REVIEW_DECLARED_PACKET_REVIEW_GAPS_SCHEMA_SCAFFOLD_SCOPE_BOUNDARY",
    "DOCS_ONLY",
    "EXACT_CANDIDATE_SCHEMA_SCOPE_FROZEN",
    "SCHEMA_FILE_NOT_CREATED",
    "PACKAGE_EXPORT_EXCLUDED",
    "VALIDATOR_RESULT_SCHEMA_EXCLUDED",
    "CROSS_REFERENCE_SURFACES_EXCLUDED",
  ]) {
    assert.match(docsText, new RegExp(marker, "u"));
  }
});

test("all nine readiness questions receive exact scope answers", () => {
  const docsText = readRequired(docsPath);
  const resolved = section(docsText, "## 3.", "## 4.");

  assert.equal((resolved.match(/^\| \d+ \|/gmu) ?? []).length, 9);
  assert.match(resolved, /RESOLVED_SCHEMA_SCAFFOLD_SCOPE_QUESTION_COUNT:\n9/u);
  for (const selected of [
    "draft/2020-12/schema",
    "$defs.gapRow",
    "minItems: 0",
    "minLength: 1",
    "maxLength: 1000",
    "uniqueItems: true",
    "future-validator-only",
    "package export",
    "validator-result schema",
  ]) {
    assert.equal(resolved.includes(selected), true, selected);
  }
});

test("future implementation paths follow the tracked proof transition", () => {
  const docsText = readRequired(docsPath);
  const transitionText = readRequired(proofTransitionPath);
  const futureSection = section(docsText, "## 4.", "## 5.");

  assert.match(futureSection, /FUTURE_SCHEMA_IMPLEMENTATION_FILE_COUNT:\n2/u);
  for (const futurePath of [futureSchemaPath, futureProofPath]) {
    assert.equal(futureSection.includes("`" + futurePath + "`"), true, futurePath);
    assert.equal(
      transitionText.includes(
        "`" +
          futurePath +
          "` | `PERMITTED_AFTER_ALL_PROOF_ALIGNMENTS_IN_SEPARATE_LATER_CONTRACT_ONLY_SLICE`",
      ),
      true,
      futurePath,
    );
  }
  assert.match(transitionText, /CANDIDATE_SCHEMA_PATH_TRANSITION_COUNT:\n2/u);
  assert.match(transitionText, /REMAINING_FOCUSED_PROOF_ALIGNMENT_COUNT:\n2/u);
  assert.equal(
    transitionText.includes(
      "`tests/domain-human-review-declared-packet-review-gaps-schema-scaffold-scope-boundary-doc-freeze.test.js`",
    ),
    true,
  );
  assert.match(futureSection, /`packages\/schemas\/src\/index\.js` remains unchanged/u);
});

test("future schema identity root and local definition are exact", () => {
  const docsText = readRequired(docsPath);
  const identity = section(docsText, "## 5.", "## 6.");
  const root = section(docsText, "## 6.", "## 7.");
  const gapRow = section(docsText, "## 7.", "## 8.");

  for (const exactValue of [
    "https://json-schema.org/draft/2020-12/schema",
    "https://governance-contracts.invalid/schemas/human-review-declared-packet-review-gaps.json",
    "Human Review Declared Packet Review Gaps Contract Scaffold",
  ]) {
    assert.equal(identity.includes("`" + exactValue + "`"), true, exactValue);
  }
  assert.match(identity, /FUTURE_SCHEMA_IDENTITY_KEYWORD_COUNT:\n5/u);
  assert.match(root, /FUTURE_SCHEMA_ROOT_FIELD_COUNT:\n4/u);
  assert.match(root, /FUTURE_SCHEMA_ROOT_REQUIRED_COUNT:\n4/u);
  assert.equal(root.includes('"$ref": "#/$defs/gapRow"'), true);
  assert.match(gapRow, /FUTURE_SCHEMA_LOCAL_DEFINITION_COUNT:\n1/u);
  assert.match(gapRow, /FUTURE_SCHEMA_GAP_ROW_FIELD_COUNT:\n6/u);
  assert.match(gapRow, /FUTURE_SCHEMA_GAP_ROW_REQUIRED_COUNT:\n6/u);
  assert.match(gapRow, /FUTURE_SCHEMA_EXPLICIT_MIN_ITEMS_ZERO_COUNT:\n4/u);
  assert.match(gapRow, /FUTURE_SCHEMA_UNIQUE_ITEMS_TRUE_COUNT:\n3/u);
});

test("future focused proof remains structural and bounded", () => {
  const docsText = readRequired(docsPath);
  const proof = section(docsText, "## 8.", "## 9.");

  assert.equal((proof.match(/^\d+\. /gmu) ?? []).length, 9);
  assert.match(proof, /FUTURE_FOCUSED_PROOF_ASSERTION_FAMILY_COUNT:\n9/u);
  assert.match(proof, /empty `gaps` candidate is structurally valid/u);
  assert.match(proof, /duplicate scalar references/u);
  assert.match(proof, /does not enforce cross-row\n`gap_ref` uniqueness/u);
  assert.match(proof, /schema validity is not gap truth/u);
});

test("excluded package validator cross-reference and runtime seams stay separate", () => {
  const docsText = readRequired(docsPath);
  const excluded = section(docsText, "## 9.", "## 10.");

  for (const excludedPath of [
    "packages/schemas/src/index.js",
    "schemas/human-review-declared-packet-review-gaps-validator-result.json",
    "packages/schemas/src/human-review-declared-packet-review-gaps-validator.js",
  ]) {
    assert.equal(excluded.includes("`" + excludedPath + "`"), true, excludedPath);
  }
  assert.match(excluded, /Package export, validator-result schema, validator helper/u);
  assert.match(excluded, /each remain\nseparate later seams/u);
});

test("current slice is exact two-file docs-only and non-authorizing", () => {
  const docsText = readRequired(docsPath);
  const proofPath =
    "tests/domain-human-review-declared-packet-review-gaps-schema-scaffold-scope-boundary-doc-freeze.test.js";

  assert.match(docsText, /CURRENT_SCAFFOLD_SCOPE_FILE_COUNT:\n2/u);
  assert.equal(docsText.includes("`" + docsPath + "`"), true);
  assert.equal(docsText.includes("`" + proofPath + "`"), true);
  for (const marker of [
    "NO_RUNTIME_BEHAVIOR_CREATED",
    "NO_REAL_PRIVATE_SOURCE_MATERIAL_USE_AUTHORIZED",
    "NO_DOMAIN_FINDING_SCORE_OR_CONCLUSION_CREATED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "TRACKED_DOCS_ONLY_EXACT_TWO_FILE_FUTURE_SCHEMA_SCOPE_FROZEN",
  ]) {
    assert.match(docsText, new RegExp(marker, "u"));
  }
  assert.match(docsText, /not schema correctness[\s\S]*real-evidence review/u);
});
