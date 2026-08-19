"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const docsRelativePath =
  "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_VALIDATOR_HELPER_PACKAGE_EXPORT_SCAFFOLD_SCOPE_BOUNDARY_v1.md";
const controllingPaths = [
  "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_VALIDATOR_HELPER_PACKAGE_EXPORT_READINESS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_VALIDATOR_HELPER_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "packages/schemas/src/controlled-synthetic-red-team-result-envelope-validator.js",
  "tests/controlled-synthetic-red-team-result-envelope-validator.test.js",
  "packages/schemas/src/index.js",
  "tests/controlled-synthetic-red-team-result-envelope-package-export.test.js",
  "tests/controlled-synthetic-red-team-result-envelope-validator-result-package-export.test.js",
  "tests/domain-controlled-synthetic-red-team-result-envelope-validator-helper-readiness-boundary-doc-freeze.test.js",
  "tests/domain-controlled-synthetic-red-team-result-envelope-validator-helper-package-export-readiness-boundary-doc-freeze.test.js",
];
const futurePaths = [
  "packages/schemas/src/index.js",
  "tests/controlled-synthetic-red-team-result-envelope-package-export.test.js",
  "tests/controlled-synthetic-red-team-result-envelope-validator-result-package-export.test.js",
  "tests/domain-controlled-synthetic-red-team-result-envelope-validator-helper-readiness-boundary-doc-freeze.test.js",
  "tests/controlled-synthetic-red-team-result-envelope-validator.test.js",
  "tests/domain-controlled-synthetic-red-team-result-envelope-validator-helper-package-export-readiness-boundary-doc-freeze.test.js",
  "tests/controlled-synthetic-red-team-result-envelope-validator-package-export.test.js",
];

function readRequired(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  assert.equal(fs.existsSync(absolutePath), true, `expected ${relativePath}`);
  return fs.readFileSync(absolutePath, "utf8");
}

test("package-export scaffold boundary and every current source exist", () => {
  const docsText = readRequired(docsRelativePath);

  for (const sourcePath of controllingPaths) {
    readRequired(sourcePath);
    assert.equal(docsText.includes(`\`${sourcePath}\``), true, sourcePath);
  }

  assert.match(
    docsText,
    /CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_VALIDATOR_HELPER_PACKAGE_EXPORT_SCAFFOLD_SCOPE_BOUNDARY/,
  );
  assert.match(docsText, /DOCS_ONLY/);
  assert.match(docsText, /APPEND_ONLY_PACKAGE_EXPORT_SCOPE/);
});

test("exact reference-equivalent unary package export is frozen", () => {
  const docsText = readRequired(docsRelativePath);

  assert.match(docsText, /`validateControlledSyntheticRedTeamResultEnvelope`/);
  assert.match(docsText, /strictly reference-equal/);
  assert.match(docsText, /must not\ncreate a wrapper, adapter, alias, getter, factory/);
  assert.match(docsText, /FUTURE_PACKAGE_VALIDATOR_EXPORT_COUNT:\n1/);
  assert.match(docsText, /FUTURE_PACKAGE_VALIDATOR_FUNCTION_ARITY:\n1/);
});

test("package-index edit preserves exact baseline line count and two occurrences", () => {
  const docsText = readRequired(docsRelativePath);
  const indexText = readRequired("packages/schemas/src/index.js");

  assert.equal(indexText.split("\n").length - 1, 13165);
  assert.match(docsText, /PACKAGE_INDEX_BASELINE_LINE_COUNT:\n13165/);
  assert.match(docsText, /static destructured CommonJS binding/);
  assert.match(docsText, /shorthand `module\.exports` property/);
  assert.match(docsText, /exactly two occurrences of\nthe new symbol/);
});

test("five exact denial-proof transitions retain three sibling denials", () => {
  const docsText = readRequired(docsRelativePath);
  const transitionSection = docsText.slice(
    docsText.indexOf("## 6. Decision 4: Exact Five Denial-Proof Transitions"),
    docsText.indexOf("## 7."),
  );
  const denialSection = docsText.slice(
    docsText.indexOf("## 7. Retained Behavior-Sibling Denials"),
    docsText.indexOf("## 8."),
  );

  assert.equal((transitionSection.match(/^\| \d+ \|/gmu) ?? []).length, 5);
  assert.match(docsText, /FUTURE_PACKAGE_EXPORT_DENIAL_TRANSITION_COUNT:\n5/);
  assert.match(docsText, /RETAINED_PACKAGE_BEHAVIOR_SIBLING_DENIAL_COUNT:\n3/);
  for (const retainedName of [
    "controlledSyntheticRedTeamResultEnvelopeValidator",
    "getControlledSyntheticRedTeamResultEnvelopeValidator",
    "controlledSyntheticRedTeamResultEnvelopeValidatorRegistry",
  ]) {
    assert.equal(denialSection.includes(`\`${retainedName}\``), true, retainedName);
  }
});

test("future contract-only implementation is restricted to seven exact files", () => {
  const docsText = readRequired(docsRelativePath);
  const section = docsText.slice(
    docsText.indexOf("## 8. Decision 5: Exact Future Seven-File Scope"),
    docsText.indexOf("## 9."),
  );

  assert.equal((section.match(/^\| \d+ \|/gmu) ?? []).length, 7);
  assert.match(docsText, /FUTURE_PACKAGE_EXPORT_FILE_COUNT:\n7/);
  for (const futurePath of futurePaths) {
    assert.equal(section.includes(`\`${futurePath}\``), true, futurePath);
  }
  assert.match(section, /must not modify the helper module, either JSON schema/);
});

test("all seven readiness decisions are resolved without downstream integration", () => {
  const docsText = readRequired(docsRelativePath);
  const section = docsText.slice(
    docsText.indexOf("## 11. Resolved Decisions"),
    docsText.indexOf("## 12."),
  );

  assert.equal((section.match(/^\| \d+ \|/gmu) ?? []).length, 7);
  assert.match(
    docsText,
    /RESOLVED_VALIDATOR_HELPER_PACKAGE_EXPORT_SCOPE_DECISION_COUNT:\n7/,
  );
  assert.match(section, /strict reference equality, no wrapper or alias/);
  assert.match(section, /no consumer, dispatch, persistence, API, provider, model, or product behavior/);
});

test("proof and no-conclusion boundaries remain explicit", () => {
  const docsText = readRequired(docsRelativePath);

  for (const marker of [
    "PACKAGE_INDEX_UNCHANGED_BY_THIS_SLICE",
    "PACKAGE_EXPORT_NOT_CREATED_BY_THIS_SLICE",
    "VALIDATOR_BEHAVIOR_UNCHANGED",
    "VALIDATOR_DISPATCH_NOT_CHANGED",
    "PERSISTENCE_API_PROVIDER_MODEL_INTEGRATION_NOT_CREATED",
    "NO_EXECUTED_MODEL_RUN_EVIDENCE_CREATED",
    "NO_DOMAIN_FINDING_SCORE_OR_CONCLUSION_CREATED",
    "NO_APPROVAL_OR_RELEASE_PRODUCT_IMPLEMENTATION_READINESS_CREATED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "TRACKED_DOCS_ONLY_REFERENCE_EQUIVALENT_PACKAGE_EXPORT_SCOPE_DEFINED",
  ]) {
    assert.match(docsText, new RegExp(marker));
  }

  assert.match(docsText, /does not prove that the package export exists/);
  assert.match(docsText, /not actual human review[\s\S]*real-evidence review/);
});
