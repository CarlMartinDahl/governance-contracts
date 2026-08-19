"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_VALIDATOR_HELPER_SCAFFOLD_PROOF_SELF_TRANSITION_HARDENING_BOUNDARY_v1.md";
const scaffoldDocsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_VALIDATOR_HELPER_SCAFFOLD_SCOPE_BOUNDARY_v1.md";
const scaffoldProofPath =
  "tests/domain-human-review-controlled-handoff-brief-validator-helper-scaffold-scope-boundary-doc-freeze.test.js";
const historicalTransitionPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const historicalTransitionProofPath =
  "tests/domain-human-review-controlled-handoff-brief-validator-helper-proof-transition-prerequisite-boundary-doc-freeze.test.js";
const futureHelperPaths = [
  "packages/schemas/src/human-review-controlled-handoff-brief-validator.js",
  "tests/human-review-controlled-handoff-brief-validator.test.js",
];

function absolute(relativePath) {
  return path.join(repoRoot, relativePath);
}

function readRequired(relativePath) {
  assert.equal(fs.existsSync(absolute(relativePath)), true, `expected ${relativePath}`);
  return fs.readFileSync(absolute(relativePath), "utf8");
}

test("self-transition hardening and all controlling sources exist", () => {
  const docsText = readRequired(docsPath);

  for (const sourcePath of [
    scaffoldDocsPath,
    scaffoldProofPath,
    historicalTransitionPath,
    historicalTransitionProofPath,
  ]) {
    readRequired(sourcePath);
    assert.equal(docsText.includes("`" + sourcePath + "`"), true, sourcePath);
  }
  assert.match(
    docsText,
    /HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_VALIDATOR_HELPER_SCAFFOLD_PROOF_SELF_TRANSITION_HARDENING_BOUNDARY/u,
  );
  assert.match(docsText, /DOCS_ONLY/u);
  assert.match(docsText, /PROOF_HARDENING_CORRECTION/u);
});

test("exactly two self-created live absences transition", () => {
  const docsText = readRequired(docsPath);

  assert.equal(futureHelperPaths.length, 2);
  for (const futurePath of futureHelperPaths) {
    assert.equal(docsText.includes("`" + futurePath + "`"), true, futurePath);
  }
  assert.match(
    docsText,
    /SCAFFOLD_PROOF_SELF_CREATED_LIVE_ABSENCE_TRANSITION_COUNT:\n2/u,
  );
});

test("scaffold proof anchors hardening instead of perpetual helper absence", () => {
  const docsText = readRequired(docsPath);
  const scaffoldProofText = readRequired(scaffoldProofPath);
  const hardeningFileName = path.basename(docsPath);

  assert.equal(scaffoldProofText.includes(hardeningFileName), true);
  assert.match(
    scaffoldProofText,
    /SCAFFOLD_PROOF_SELF_CREATED_LIVE_ABSENCE_TRANSITION_COUNT/u,
  );
  for (const futurePath of futureHelperPaths) {
    assert.equal(scaffoldProofText.includes('"' + futurePath + '"'), true);
    assert.equal(docsText.includes("`" + futurePath + "`"), true);
  }
});

test("historical eighteen-assertion transition remains separate", () => {
  const docsText = readRequired(docsPath);
  const historicalText = readRequired(historicalTransitionPath);

  assert.match(
    historicalText,
    /VALIDATOR_HELPER_PATH_LIVE_ABSENCE_TRANSITION_COUNT:\n18/u,
  );
  assert.match(
    docsText,
    /HISTORICAL_VALIDATOR_HELPER_PATH_LIVE_ABSENCE_TRANSITION_COUNT:\n18/u,
  );
  assert.match(
    historicalText,
    /TRACKED_DOCS_ONLY_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_DEFINED/u,
  );
});

test("hardening scope is exact three-file and package index stays unchanged", () => {
  const docsText = readRequired(docsPath);
  const packageIndexText = readRequired("packages/schemas/src/index.js");

  for (const currentPath of [docsPath, scaffoldProofPath]) {
    assert.equal(docsText.includes("`" + currentPath + "`"), true, currentPath);
  }
  assert.equal(
    docsText.includes(
      "`tests/domain-human-review-controlled-handoff-brief-validator-helper-scaffold-proof-self-transition-hardening-boundary-doc-freeze.test.js`",
    ),
    true,
  );
  assert.match(docsText, /SCAFFOLD_PROOF_SELF_TRANSITION_HARDENING_FILE_COUNT:\n3/u);
  assert.equal((packageIndexText.match(/\n/gu) ?? []).length, 13165);
});

test("hardening remains non-implementing and non-authorizing", () => {
  const docsText = readRequired(docsPath);

  for (const marker of [
    "EXACT_TWO_SELF_CREATED_LIVE_ABSENCE_ASSERTIONS_TRANSITIONED",
    "HISTORICAL_EIGHTEEN_ASSERTION_TRANSITION_PRESERVED",
    "EXACT_THREE_FILE_HARDENING_SCOPE",
    "HELPER_NOT_CREATED_BY_THIS_SLICE",
    "HELPER_TEST_NOT_CREATED_BY_THIS_SLICE",
    "PACKAGE_INDEX_UNCHANGED",
    "VALIDATOR_EXPORT_NOT_CREATED",
    "VALIDATOR_DISPATCH_NOT_CHANGED",
    "VALIDATION_EXECUTION_NOT_CREATED",
    "CROSS_REFERENCE_CHECKPOINT_NOT_CREATED",
    "COMPONENT_ASSEMBLY_NOT_CREATED",
    "HUMAN_REVIEW_OR_APPROVAL_NOT_CREATED",
    "DELIVERY_OR_RELEASE_NOT_CREATED",
    "NO_RUNTIME_BEHAVIOR_CREATED",
    "NO_SOURCE_ACQUISITION_OR_CONTENT_INSPECTION_CREATED",
    "NO_DOMAIN_FINDING_SCORE_OR_CONCLUSION_CREATED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "TRACKED_DOCS_ONLY_SCAFFOLD_PROOF_SELF_TRANSITION_HARDENING_COMPLETE",
  ]) {
    assert.match(docsText, new RegExp(marker, "u"));
  }
  assert.match(docsText, /not actual human review[\s\S]*real-evidence review/u);
});
