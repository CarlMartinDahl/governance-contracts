"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const packageSchemas = require("../packages/schemas/src/index.js");

const repoRoot = path.join(__dirname, "..");
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const proofPath =
  "tests/domain-human-review-controlled-handoff-human-professional-approval-validator-helper-proof-transition-prerequisite-boundary-doc-freeze.test.js";
const scaffoldPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_VALIDATOR_HELPER_SCAFFOLD_SCOPE_BOUNDARY_v1.md";
const alignedTestTransitions = [
  {
    path: "tests/domain-human-review-controlled-handoff-human-professional-approval-contract-boundary-doc-freeze.test.js",
    forbiddenStatement:
      "assert.equal(fs.existsSync(absolute(retainedPath)), false, retainedPath);",
  },
  {
    path: "tests/domain-human-review-controlled-handoff-human-professional-approval-package-schema-export-scope-boundary-doc-freeze.test.js",
    forbiddenStatement:
      "assert.equal(fs.existsSync(absolute(retainedPath)), false, retainedPath);",
  },
  {
    path: "tests/domain-human-review-controlled-handoff-human-professional-approval-schema-hardening-proof-candidate-path-alignment-boundary-doc-freeze.test.js",
    forbiddenStatement:
      "assert.equal(fs.existsSync(absolute(retainedPath)), false, retainedPath);",
  },
  {
    path: "tests/domain-human-review-controlled-handoff-human-professional-approval-schema-readiness-boundary-doc-freeze.test.js",
    forbiddenStatement:
      "assert.equal(fs.existsSync(absolute(retainedPath)), false, retainedPath);",
  },
  {
    path: "tests/domain-human-review-controlled-handoff-human-professional-approval-schema-scaffold-proof-self-transition-hardening-boundary-doc-freeze.test.js",
    forbiddenStatement:
      "assert.equal(fs.existsSync(absolute(retainedPath)), false, retainedPath);",
  },
  {
    path: "tests/domain-human-review-controlled-handoff-human-professional-approval-schema-scaffold-scope-boundary-doc-freeze.test.js",
    forbiddenStatement:
      "assert.equal(fs.existsSync(absolute(retainedPath)), false, retainedPath);",
  },
  {
    path: "tests/domain-human-review-controlled-handoff-human-professional-approval-validator-error-path-semantics-boundary-doc-freeze.test.js",
    forbiddenStatement:
      "assert.equal(fs.existsSync(absolute(retainedSurface)), false, retainedSurface);",
  },
  {
    path: "tests/domain-human-review-controlled-handoff-human-professional-approval-validator-helper-readiness-boundary-doc-freeze.test.js",
    forbiddenStatement:
      "assert.equal(fs.existsSync(absolute(absentPath)), false, absentPath);",
  },
  {
    path: "tests/domain-human-review-controlled-handoff-human-professional-approval-validator-result-package-schema-export-scope-boundary-doc-freeze.test.js",
    forbiddenStatement:
      "assert.equal(fs.existsSync(absolute(validatorPath)), false, validatorPath);",
  },
  {
    path: "tests/domain-human-review-controlled-handoff-human-professional-approval-validator-result-schema-readiness-boundary-doc-freeze.test.js",
    forbiddenStatement:
      "assert.equal(fs.existsSync(absolute(retainedPath)), false, retainedPath);",
  },
  {
    path: "tests/domain-human-review-controlled-handoff-human-professional-approval-validator-result-schema-scaffold-scope-boundary-doc-freeze.test.js",
    forbiddenStatement:
      "assert.equal(fs.existsSync(absolute(retainedPath)), false, retainedPath);",
  },
  {
    path: "tests/human-review-controlled-handoff-human-professional-approval-schema.test.js",
    forbiddenStatement:
      "assert.equal(fs.existsSync(absolute(retainedPath)), false, retainedPath);",
  },
  {
    path: "tests/human-review-controlled-handoff-human-professional-approval-validator-result-schema.test.js",
    forbiddenStatement:
      "assert.equal(fs.existsSync(absolute(retainedPath)), false, retainedPath);",
  },
];
const historicalHelperPaths = [
  "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-validator.js",
  "tests/human-review-controlled-handoff-human-professional-approval-validator.test.js",
];
const blockedValidatorExports = [
  "humanReviewControlledHandoffHumanProfessionalApprovalValidator",
  "validateHumanReviewControlledHandoffHumanProfessionalApproval",
  "getHumanReviewControlledHandoffHumanProfessionalApprovalValidator",
  "humanReviewControlledHandoffHumanProfessionalApprovalValidatorRegistry",
];

function absolute(relativePath) {
  return path.join(repoRoot, relativePath);
}

function readRequired(relativePath) {
  assert.equal(fs.existsSync(absolute(relativePath)), true, `expected ${relativePath}`);
  return fs.readFileSync(absolute(relativePath), "utf8");
}

test("approval validator-helper proof-transition boundary and scaffold exist", () => {
  const docsText = readRequired(docsPath);
  readRequired(scaffoldPath);

  assert.equal(docsText.includes("`" + scaffoldPath + "`"), true);
  assert.match(
    docsText,
    /HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY/u,
  );
  assert.match(docsText, /DOCS_ONLY/u);
  assert.match(docsText, /APPEND_ONLY_PROOF_TRANSITION_PREREQUISITE/u);
});

test("transition is exactly fifteen files twenty-six outcomes and two historical paths", () => {
  const docsText = readRequired(docsPath);

  assert.equal(alignedTestTransitions.length, 13);
  assert.equal(historicalHelperPaths.length, 2);
  assert.match(docsText, /VALIDATOR_HELPER_PROOF_TRANSITION_FILE_COUNT:\n15/u);
  assert.match(
    docsText,
    /VALIDATOR_HELPER_PATH_LIVE_ABSENCE_TRANSITION_COUNT:\n26/u,
  );
  assert.match(docsText, /VALIDATOR_HELPER_RESERVED_PATH_COUNT:\n2/u);
  for (const { path: alignedPath } of alignedTestTransitions) {
    assert.equal(docsText.includes("`" + alignedPath + "`"), true, alignedPath);
  }
  for (const helperPath of historicalHelperPaths) {
    assert.equal(docsText.includes("`" + helperPath + "`"), true, helperPath);
  }
});

test("aligned proofs anchor transition without perpetual helper absence", () => {
  const transitionFileName = path.basename(docsPath);

  for (const { path: alignedPath, forbiddenStatement } of alignedTestTransitions) {
    const testText = readRequired(alignedPath);
    assert.equal(testText.includes(transitionFileName), true, alignedPath);
    assert.equal(testText.includes(forbiddenStatement), false, alignedPath);
    for (const helperPath of historicalHelperPaths) {
      assert.equal(
        testText.split('"' + helperPath + '"').length - 1,
        1,
        `${alignedPath}: ${helperPath}`,
      );
    }
  }

  const proofText = readRequired(proofPath);
  const prohibitedFuturePathLiveProbe =
    "fs." + "existsSync(absolute(futurePath))";
  assert.equal(proofText.includes(prohibitedFuturePathLiveProbe), false);
});

test("package denials and package-index baseline remain live", () => {
  const docsText = readRequired(docsPath);
  const packageIndexText = readRequired("packages/schemas/src/index.js");

  for (const deniedExport of blockedValidatorExports) {
    assert.equal(docsText.includes("- `" + deniedExport + "`"), true, deniedExport);
    assert.equal(Object.hasOwn(packageSchemas, deniedExport), false, deniedExport);
  }
  assert.equal((packageIndexText.match(/\n/gu) ?? []).length, 13165);
  assert.match(docsText, /PACKAGE_INDEX_BASELINE_LINE_COUNT:\n13165/u);
});

test("later helper remains a separate exact two-file runtime-change slice", () => {
  const docsText = readRequired(docsPath);

  assert.match(docsText, /one separate `RUNTIME_CHANGE`/u);
  for (const helperPath of historicalHelperPaths) {
    assert.equal(docsText.includes("- `" + helperPath + "`"), true, helperPath);
  }
  assert.match(docsText, /seven-phase algorithm/u);
  assert.match(docsText, /package-index non-interference/u);
});

test("transition preserves non-implementation and no-conclusion boundaries", () => {
  const docsText = readRequired(docsPath);

  for (const marker of [
    "EXACT_FIFTEEN_FILE_ALIGNMENT_SCOPE",
    "TWENTY_SIX_LIVE_HELPER_PATH_ABSENCE_ASSERTIONS_TRANSITIONED",
    "HISTORICAL_VALIDATOR_HELPER_ABSENCE_MARKERS_PRESERVED",
    "CROSS_REFERENCE_ADMISSIBILITY_ABSENCES_RETAINED",
    "REVIEWER_AUTHORITY_RESOLUTION_ABSENCE_RETAINED",
    "APPROVAL_EFFECT_ABSENCE_RETAINED",
    "PACKAGE_EXPORT_DENIALS_RETAINED",
    "HELPER_NOT_CREATED_BY_THIS_SLICE",
    "HELPER_TEST_NOT_CREATED_BY_THIS_SLICE",
    "PACKAGE_INDEX_UNCHANGED",
    "VALIDATOR_EXPORT_NOT_CREATED",
    "VALIDATOR_DISPATCH_NOT_CHANGED",
    "VALIDATION_EXECUTION_NOT_CREATED",
    "HANDOFF_DELIVERY_OR_RELEASE_NOT_CREATED",
    "NO_RUNTIME_BEHAVIOR_CREATED",
    "NO_SOURCE_ACQUISITION_OR_CONTENT_INSPECTION_CREATED",
    "NO_DOMAIN_FINDING_SCORE_OR_CONCLUSION_CREATED",
    "NO_APPROVAL_OR_RELEASE_PRODUCT_IMPLEMENTATION_READINESS_CREATED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "TRACKED_DOCS_ONLY_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_DEFINED",
  ]) {
    assert.equal(docsText.includes(marker), true, marker);
  }

  assert.match(docsText, /Human\/professional review remains the release gate/u);
  assert.match(docsText, /not actual human review[\s\S]*real-evidence review/u);
});
