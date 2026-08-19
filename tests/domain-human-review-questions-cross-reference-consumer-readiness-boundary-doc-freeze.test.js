"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const docsRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_CROSS_REFERENCE_CONSUMER_READINESS_BOUNDARY_v1.md";
const controllingPaths = [
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_WORKSPACE_PUBLIC_SCOPE_ALIGNMENT_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_CONTRACT_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_CROSS_REFERENCE_SEMANTICS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_CROSS_REFERENCE_RESULT_PACKAGE_SCHEMA_EXPORT_SCOPE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_QUESTIONS_CROSS_REFERENCE_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
  "schemas/human-review-questions-cross-reference-result.json",
  "packages/schemas/src/index.js",
  "packages/governance/src/human-review-questions-cross-reference-validation-boundary.js",
  "packages/governance/src/index.js",
  "tests/human-review-questions-cross-reference-result-package-export.test.js",
  "tests/human-review-questions-cross-reference-validation-boundary.test.js",
];

function readRequired(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  assert.equal(fs.existsSync(absolutePath), true, `expected ${relativePath}`);
  return fs.readFileSync(absolutePath, "utf8");
}

test("consumer readiness boundary and every controlling source exist", () => {
  const docsText = readRequired(docsRelativePath);

  for (const sourcePath of controllingPaths) {
    readRequired(sourcePath);
    assert.equal(docsText.includes(`\`${sourcePath}\``), true, sourcePath);
  }

  assert.match(
    docsText,
    /HUMAN_REVIEW_QUESTIONS_CROSS_REFERENCE_CONSUMER_READINESS_BOUNDARY/u,
  );
  assert.match(docsText, /PROVE_ONLY_FINDINGS_CAPTURED_AS_DOCS_ONLY/u);
  assert.match(
    docsText,
    /APPEND_ONLY_CROSS_REFERENCE_CONSUMER_READINESS_ASSESSMENT/u,
  );
  assert.match(
    docsText,
    /ASSESSMENT_BASELINE_HEAD:\n+a596751d7429c3f7a4d01892d63ed376ebdea151/u,
  );
});

test("completed checkpoint result and package surfaces remain exact", () => {
  const resultSchema = require("../schemas/human-review-questions-cross-reference-result.json");
  const checkpointModule = require("../packages/governance/src/human-review-questions-cross-reference-validation-boundary.js");
  const packageSchemas = require("../packages/schemas/src/index.js");
  const governanceIndexText = readRequired("packages/governance/src/index.js");
  const functionName = "validateHumanReviewQuestionsCrossReference";

  assert.deepEqual(Object.keys(checkpointModule), [functionName]);
  assert.equal(typeof checkpointModule[functionName], "function");
  assert.equal(checkpointModule[functionName].length, 1);
  assert.strictEqual(
    packageSchemas.humanReviewQuestionsCrossReferenceResult,
    resultSchema,
  );
  assert.equal(Object.hasOwn(packageSchemas, functionName), false);
  assert.equal(governanceIndexText.includes(functionName), false);
});

test("fourteen current tracked facts freeze direct runtime and absent consumer separately", () => {
  const docsText = readRequired(docsRelativePath);
  const section = docsText.slice(
    docsText.indexOf("## 3. Current Tracked Facts"),
    docsText.indexOf("## 4."),
  );

  assert.equal((section.match(/^\| \d+ \|/gmu) ?? []).length, 14);
  assert.match(
    docsText,
    /CURRENT_CROSS_REFERENCE_CONSUMER_READINESS_FACT_COUNT:\n14/u,
  );
  assert.match(docsText, /TRACKED_NON_TEST_CALLER_COUNT_AT_BASELINE:\n0/u);
  assert.match(
    docsText,
    /CONSUMER_TARGET:\nNOT_SELECTED_IN_TRACKED_DOCS/u,
  );
  assert.match(
    docsText,
    /DIRECT_CHECKPOINT_RUNTIME_STATUS:\nTRACKED_INTERNAL_ONLY/u,
  );
  assert.match(docsText, /CONSUMER_RUNTIME_STATUS:\nNOT_CREATED/u);
});

test("consumer readiness remains blocked while completed surfaces stay distinct", () => {
  const docsText = readRequired(docsRelativePath);

  assert.match(
    docsText,
    /CROSS_REFERENCE_CONSUMER_READINESS:\nBLOCKED_BY_EXACT_TARGET_AND_IMPLEMENTATION_SEMANTICS/u,
  );
  assert.match(docsText, /exact cross-reference semantics tracked \| `YES_TRACKED`/u);
  assert.match(docsText, /isolated direct checkpoint behavior tracked \| `YES_TRACKED`/u);
  assert.match(docsText, /governance package function export tracked \| `NO_INTERNAL_ONLY`/u);
  assert.match(docsText, /first consumer class selected in tracked docs \| `NO_OPEN`/u);
  assert.match(docsText, /exact consumer implementation proof frozen \| `NO_OPEN`/u);
});

test("ten open decisions and one docs-only target-selection step are explicit", () => {
  const docsText = readRequired(docsRelativePath);
  const section = docsText.slice(
    docsText.indexOf("## 5. Ten Open Consumer Scope Decisions"),
    docsText.indexOf("## 6."),
  );

  assert.equal((section.match(/^\| \d+ \|/gmu) ?? []).length, 10);
  assert.match(
    docsText,
    /OPEN_CROSS_REFERENCE_CONSUMER_SCOPE_DECISION_COUNT:\n10/u,
  );
  assert.match(section, /consume or remain unconsumed/u);
  assert.match(section, /input representation and assembly/u);
  assert.match(section, /observability boundary/u);
  assert.match(docsText, /one `DOCS_ONLY` consumer-target selection/u);
  assert.match(docsText, /must not implement the consumer/u);
});

test("exact two-file scope and no-conclusion boundaries remain explicit", () => {
  const docsText = readRequired(docsRelativePath);

  assert.match(
    docsText,
    /CROSS_REFERENCE_CONSUMER_READINESS_SLICE_FILE_COUNT:\n2/u,
  );
  for (const marker of [
    "GOVERNANCE_PACKAGE_EXPORT_NOT_CREATED",
    "PERSISTENCE_API_ROUTE_DISPATCH_PROVIDER_MODEL_UI_NOT_CREATED",
    "LOGGING_TELEMETRY_AND_AUDIT_EMISSION_NOT_CREATED",
    "NO_REAL_PRIVATE_SOURCE_OR_CASE_MATERIAL_PROCESSED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
  ]) {
    assert.equal(docsText.includes(marker), true, marker);
  }

  assert.match(docsText, /do not inspect or process raw, private, source, case/u);
  assert.match(docsText, /not actual human review, professional review, legal/u);
  assert.match(
    docsText,
    /TRACKED_DOCS_ONLY_CONSUMER_READINESS_BLOCKED_BY_TARGET_AND_IMPLEMENTATION_SEMANTICS/u,
  );
});
