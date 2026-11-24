"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const packageSchemas = require("../packages/schemas/src/index.js");

const repoRoot = path.join(__dirname, "..");
const docsPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const proofPath =
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-helper-proof-transition-prerequisite-boundary-doc-freeze.test.js";
const scaffoldPath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_VALIDATOR_HELPER_SCAFFOLD_SCOPE_BOUNDARY_v1.md";
const scaffoldProofPath =
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-helper-scaffold-scope-boundary-doc-freeze.test.js";
const transitionStatus =
  "LIVE_ABSENCE_ASSERTION_TRANSITIONED_FOR_SEPARATE_LATER_RUNTIME_CHANGE_SLICE";
const historicalHelperPaths = [
  "packages/schemas/src/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator.js",
  "tests/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator.test.js",
];
const alignedTestPaths = [
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-contract-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-package-schema-export-scope-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-schema-scaffold-scope-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-error-path-semantics-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-helper-readiness-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-result-package-schema-export-scope-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-result-schema-readiness-boundary-doc-freeze.test.js",
  "tests/domain-human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-result-schema-scaffold-scope-boundary-doc-freeze.test.js",
  "tests/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-schema.test.js",
  "tests/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator-result-schema.test.js",
];
const historicalValidatorExports = [
  "humanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidenceValidator",
  "validateHumanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidence",
  "getHumanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidenceValidator",
  "humanReviewControlledHandoffHumanProfessionalApprovalDecisionBasisEvidenceValidatorRegistry",
];
const validatorHelperExportName = historicalValidatorExports[1];
const retainedValidatorExports = historicalValidatorExports.filter(
  (name) => name !== validatorHelperExportName,
);

function absolute(relativePath) {
  return path.join(repoRoot, relativePath);
}

function readRequired(relativePath) {
  assert.equal(fs.existsSync(absolute(relativePath)), true, relativePath);
  return fs.readFileSync(absolute(relativePath), "utf8");
}

function sectionBetween(text, startHeading, endHeading) {
  const start = text.indexOf(startHeading);
  assert.notEqual(start, -1, startHeading);
  const end = endHeading ? text.indexOf(endHeading, start + startHeading.length) : text.length;
  assert.notEqual(end, -1, endHeading ?? "EOF");
  return text.slice(start, end);
}

function tableLines(sectionText) {
  return sectionText
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("|"));
}

test("proof-transition prerequisite boundary and required markers are exact", () => {
  const docsText = readRequired(docsPath);
  for (const requiredPath of [proofPath, scaffoldPath, scaffoldProofPath, ...alignedTestPaths]) {
    assert.equal(fs.existsSync(absolute(requiredPath)), true, requiredPath);
  }

  const requiredMarkers = [
    "HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY",
    "DOCS_ONLY",
    "APPEND_ONLY_PROOF_TRANSITION_PREREQUISITE",
    "EXACT_TWELVE_FILE_ALIGNMENT_SCOPE",
    "TEN_HISTORICAL_PROOF_FILES_ALIGNED",
    "FOURTEEN_LIVE_ASSERTION_SITES_TRANSITIONED",
    "FORTY_EIGHT_LIVE_HELPER_PATH_ABSENCE_CHECKS_TRANSITIONED",
    "HISTORICAL_VALIDATOR_HELPER_ABSENCE_MARKERS_PRESERVED",
    "PACKAGE_EXPORT_DENIALS_RETAINED",
    "HELPER_NOT_CREATED_BY_THIS_SLICE",
    "HELPER_TEST_NOT_CREATED_BY_THIS_SLICE",
    "PACKAGE_INDEX_UNCHANGED",
    "VALIDATOR_EXPORT_NOT_CREATED",
    "VALIDATOR_DISPATCH_NOT_CHANGED",
    "NO_IMPLEMENTATION_CREATED",
    "NO_RUNTIME_BEHAVIOR_CREATED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
  ];

  for (const marker of requiredMarkers) {
    assert.match(docsText, new RegExp(`^${marker}$`, "mu"), marker);
  }
});

test("reserved helper paths, 14 sites, 48 checks, and 12-file scope tables are exact", () => {
  const docsText = readRequired(docsPath);
  const reservedSection = sectionBetween(
    docsText,
    "## 3. Exact Reserved Helper Paths And Transition Status",
    "## 4.",
  );
  const siteSection = sectionBetween(
    docsText,
    "## 4. Exact Live Assertion-Site Transition",
    "## 5.",
  );
  const scopeSection = sectionBetween(docsText, "## 5. Exact File Scope", "## 6.");

  assert.match(docsText, /HISTORICAL_PROOF_FILE_ALIGNMENT_COUNT:\n10/u);
  assert.match(reservedSection, /VALIDATOR_HELPER_RESERVED_PATH_COUNT:\n2/u);
  assert.match(siteSection, /VALIDATOR_HELPER_LIVE_ASSERTION_SITE_TRANSITION_COUNT:\n14/u);
  assert.match(siteSection, /VALIDATOR_HELPER_PATH_LIVE_ABSENCE_CHECK_TRANSITION_COUNT:\n48/u);
  assert.match(scopeSection, /VALIDATOR_HELPER_PROOF_TRANSITION_FILE_COUNT:\n12/u);
  assert.match(docsText, /RETAINED_SEPARATE_BOUNDARY_COUNT:\n5/u);
  assert.match(docsText, /BLOCKED_VALIDATOR_PACKAGE_EXPORT_NAME_COUNT:\n4/u);
  assert.match(docsText, /PACKAGE_INDEX_BASELINE_LINE_COUNT:\n13165/u);
  assert.match(docsText, /SEPARATE_LATER_HELPER_SLICE_FILE_COUNT:\n2/u);
  assert.match(docsText, /NON_INTERFERENCE_RULE_COUNT:\n10/u);

  const reservedRows = tableLines(reservedSection);
  assert.equal(reservedRows.length, 4);
  for (let i = 0; i < historicalHelperPaths.length; i += 1) {
    assert.equal(
      reservedRows[i + 2],
      `| ${i + 1} | \`${historicalHelperPaths[i]}\` | \`${transitionStatus}\` |`,
    );
  }

  const siteRows = tableLines(siteSection);
  assert.equal(siteRows.length, 2 + 14);
  const totalChecks = siteRows
    .slice(2)
    .map((row) => Number(row.split("|").at(-2).trim()))
    .reduce((sum, n) => sum + n, 0);
  assert.equal(totalChecks, 48);

  const scopeRows = tableLines(scopeSection);
  assert.equal(scopeRows.length, 2 + 12);
});

test("all ten aligned historical proofs anchor this transition and preserve historical helper paths", () => {
  for (const testPath of alignedTestPaths) {
    const source = readRequired(testPath);
    assert.equal(source.includes(docsPath), true, `${testPath} must anchor transition doc`);
    assert.equal(
      source.includes(transitionStatus),
      true,
      `${testPath} must assert transition status`,
    );
    for (const helperPath of historicalHelperPaths) {
      assert.equal(source.includes(helperPath), true, `${testPath}: ${helperPath}`);
    }
  }
});

test("package index remains 13165 lines and retained package denials and final status markers hold", () => {
  const docsText = readRequired(docsPath);
  const indexText = readRequired("packages/schemas/src/index.js");

  assert.equal(indexText.split("\n").length - 1, 13165);
  for (const exportName of retainedValidatorExports) {
    assert.equal(Object.hasOwn(packageSchemas, exportName), false, exportName);
  }

  const validatorModule = require("../packages/schemas/src/human-review-controlled-handoff-human-professional-approval-decision-basis-evidence-validator.js");
  assert.strictEqual(
    packageSchemas[validatorHelperExportName],
    validatorModule[validatorHelperExportName],
  );

  assert.match(
    docsText,
    /HUMAN_REVIEW_CONTROLLED_HANDOFF_HUMAN_PROFESSIONAL_APPROVAL_DECISION_BASIS_EVIDENCE_VALIDATOR_HELPER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_STATUS:\nTRACKED_DOCS_ONLY_VALIDATOR_HELPER_PROOF_TRANSITION_COMPLETE/u,
  );
  assert.match(
    docsText,
    /REPO_NEXT_ACTION:\nseparate two-file internal validator-helper implementation slice remains outside this prerequisite/u,
  );
});
