"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const docsRelativePath =
  "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_VALIDATOR_HELPER_PACKAGE_EXPORT_READINESS_BOUNDARY_v1.md";
const controllingPaths = [
  "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_VALIDATOR_HELPER_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "schemas/controlled-synthetic-red-team-result-envelope.json",
  "schemas/controlled-synthetic-red-team-result-envelope-validator-result.json",
  "packages/schemas/src/controlled-synthetic-red-team-result-envelope-validator.js",
  "tests/controlled-synthetic-red-team-result-envelope-validator.test.js",
  "packages/schemas/src/index.js",
  "tests/controlled-synthetic-red-team-result-envelope-package-export.test.js",
  "tests/controlled-synthetic-red-team-result-envelope-validator-result-package-export.test.js",
  "tests/domain-controlled-synthetic-red-team-result-envelope-validator-helper-readiness-boundary-doc-freeze.test.js",
];
const denialProofPaths = [
  "tests/controlled-synthetic-red-team-result-envelope-package-export.test.js",
  "tests/controlled-synthetic-red-team-result-envelope-validator-result-package-export.test.js",
  "tests/domain-controlled-synthetic-red-team-result-envelope-validator-helper-readiness-boundary-doc-freeze.test.js",
  "tests/controlled-synthetic-red-team-result-envelope-validator.test.js",
];

function readRequired(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  assert.equal(fs.existsSync(absolutePath), true, `expected ${relativePath}`);
  return fs.readFileSync(absolutePath, "utf8");
}

test("package-export readiness boundary and every controlling source exist", () => {
  const docsText = readRequired(docsRelativePath);

  for (const sourcePath of controllingPaths) {
    readRequired(sourcePath);
    assert.equal(docsText.includes(`\`${sourcePath}\``), true, sourcePath);
  }

  assert.match(
    docsText,
    /CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_VALIDATOR_HELPER_PACKAGE_EXPORT_READINESS_BOUNDARY/,
  );
  assert.match(docsText, /PROVE_ONLY_FINDINGS_CAPTURED_AS_DOCS_ONLY/);
  assert.match(docsText, /APPEND_ONLY_PACKAGE_EXPORT_READINESS_ASSESSMENT/);
});

test("readiness boundary preserves the then-absent snapshot after reference-equivalent export", () => {
  const docsText = readRequired(docsRelativePath);
  const validatorModule = require("../packages/schemas/src/controlled-synthetic-red-team-result-envelope-validator.js");
  const packageSchemas = require("../packages/schemas/src/index.js");
  const exportName = "validateControlledSyntheticRedTeamResultEnvelope";

  assert.deepEqual(Object.keys(validatorModule), [exportName]);
  assert.equal(typeof validatorModule[exportName], "function");
  assert.equal(validatorModule[exportName].length, 1);
  assert.strictEqual(packageSchemas[exportName], validatorModule[exportName]);
  assert.match(docsText, /INTERNAL_VALIDATOR_HELPER_TRACKED/);
  assert.match(docsText, /PUBLIC_PACKAGE_EXPORT_ABSENT/);
  assert.match(docsText, /direct helper module export is not the same thing/);
});

test("nine current tracked facts are recorded without runtime conclusions", () => {
  const docsText = readRequired(docsRelativePath);
  const section = docsText.slice(
    docsText.indexOf("## 3. Current Tracked Facts"),
    docsText.indexOf("## 4."),
  );

  assert.equal((section.match(/^\| \d+ \|/gmu) ?? []).length, 9);
  assert.match(docsText, /CURRENT_PACKAGE_EXPORT_READINESS_FACT_COUNT:\n9/);
  assert.match(section, /no runtime consumer, registry, dispatch, persistence, or API use/);
  assert.match(section, /repository facts only/);
});

test("all four current denial-proof dependencies are explicit", () => {
  const docsText = readRequired(docsRelativePath);
  const section = docsText.slice(
    docsText.indexOf("## 5. Four Current Denial-Proof Dependencies"),
    docsText.indexOf("## 6."),
  );

  assert.equal((section.match(/^\| \d+ \|/gmu) ?? []).length, 4);
  assert.match(docsText, /CURRENT_PACKAGE_EXPORT_DENIAL_PROOF_COUNT:\n4/);
  for (const testPath of denialProofPaths) {
    const testText = readRequired(testPath);
    assert.equal(section.includes(`\`${testPath}\``), true, testPath);
    assert.equal(
      testText.includes("validateControlledSyntheticRedTeamResultEnvelope"),
      true,
      testPath,
    );
  }
  assert.match(section, /must not broadly remove sibling denials/);
});

test("package-export readiness remains blocked by seven exact decisions", () => {
  const docsText = readRequired(docsRelativePath);
  const section = docsText.slice(
    docsText.indexOf("## 7. Seven Open Package-Export Scope Decisions"),
    docsText.indexOf("## 8."),
  );

  assert.match(
    docsText,
    /VALIDATOR_HELPER_PACKAGE_EXPORT_READINESS:\nBLOCKED_BY_EXACT_SCOPE_DECISIONS/,
  );
  assert.equal((section.match(/^\| \d+ \|/gmu) ?? []).length, 7);
  assert.match(
    docsText,
    /OPEN_VALIDATOR_HELPER_PACKAGE_EXPORT_SCOPE_DECISION_COUNT:\n7/,
  );
  assert.match(section, /publish or remain internal/);
  assert.match(section, /exact four denial-proof transitions/);
  assert.match(section, /exact downstream exclusion/);
});

test("smallest safe next slice is one docs-only scaffold boundary", () => {
  const docsText = readRequired(docsRelativePath);

  assert.match(
    docsText,
    /RECOMMENDED_NEXT_SLICE:\nCONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_VALIDATOR_HELPER_PACKAGE_EXPORT_SCAFFOLD_SCOPE_BOUNDARY_DOCS_ONLY/,
  );
  assert.match(docsText, /must not modify the package index/);
  assert.match(docsText, /must not[\s\S]*create any consumer or dispatch behavior/);
});

test("readiness slice preserves non-integration and release boundaries", () => {
  const docsText = readRequired(docsRelativePath);

  for (const marker of [
    "PACKAGE_EXPORT_NOT_IMPLEMENTATION_READY",
    "PACKAGE_INDEX_UNCHANGED_BY_THIS_SLICE",
    "VALIDATOR_DISPATCH_NOT_CHANGED",
    "PERSISTENCE_API_PROVIDER_MODEL_INTEGRATION_NOT_CREATED",
    "NO_EXECUTED_MODEL_RUN_EVIDENCE_CREATED",
    "NO_DOMAIN_FINDING_SCORE_OR_CONCLUSION_CREATED",
    "NO_APPROVAL_OR_RELEASE_PRODUCT_IMPLEMENTATION_READINESS_CREATED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
    "TRACKED_DOCS_ONLY_PACKAGE_EXPORT_READINESS_BLOCKED_BY_SCOPE_DECISIONS",
  ]) {
    assert.match(docsText, new RegExp(marker));
  }

  assert.match(docsText, /Human\/professional\nreview remains the release gate/);
  assert.match(docsText, /not actual human review[\s\S]*real-evidence review/);
});
