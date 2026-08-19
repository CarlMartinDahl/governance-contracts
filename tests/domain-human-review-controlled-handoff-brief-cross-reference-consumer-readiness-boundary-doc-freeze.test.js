"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const docsRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_CROSS_REFERENCE_CONSUMER_READINESS_BOUNDARY_v1.md";
const proofTransitionRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_CROSS_REFERENCE_CONSUMER_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md";
const checkpointRelativePath =
  "packages/governance/src/human-review-controlled-handoff-brief-cross-reference-validation-boundary.js";
const permittedFutureCallerPath =
  "packages/governance/src/human-review-controlled-handoff-brief-pre-human-professional-approval-validation-boundary.js";
const functionName =
  "validateHumanReviewControlledHandoffBriefCrossReference";
const controllingPaths = [
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_WORKSPACE_PUBLIC_SCOPE_ALIGNMENT_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_CONTRACT_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_CROSS_REFERENCE_SEMANTICS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_CROSS_REFERENCE_RESULT_SCHEMA_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_CROSS_REFERENCE_RESULT_PACKAGE_SCHEMA_EXPORT_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_CROSS_REFERENCE_PROOF_TRANSITION_PREREQUISITE_BOUNDARY_v1.md",
  "schemas/human-review-controlled-handoff-brief-cross-reference-result.json",
  "packages/schemas/src/index.js",
  checkpointRelativePath,
  "packages/governance/src/index.js",
  "tests/human-review-controlled-handoff-brief-cross-reference-result-package-export.test.js",
  "tests/human-review-controlled-handoff-brief-cross-reference-validation-boundary.test.js",
];

function readRequired(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  assert.equal(fs.existsSync(absolutePath), true, `expected ${relativePath}`);
  return fs.readFileSync(absolutePath, "utf8");
}

function findRuntimeReferences(relativeDirectory) {
  const absoluteDirectory = path.join(repoRoot, relativeDirectory);
  if (!fs.existsSync(absoluteDirectory)) {
    return [];
  }

  const references = [];
  const visit = (absolutePath) => {
    const entries = fs.readdirSync(absolutePath, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.name === "node_modules") {
        continue;
      }
      const entryPath = path.join(absolutePath, entry.name);
      if (entry.isDirectory()) {
        visit(entryPath);
      } else if (/\.(?:cjs|js|mjs|ts)$/u.test(entry.name)) {
        const relativePath = path.relative(repoRoot, entryPath);
        if (
          relativePath !== checkpointRelativePath &&
          fs.readFileSync(entryPath, "utf8").includes(functionName)
        ) {
          references.push(relativePath);
        }
      }
    }
  };

  visit(absoluteDirectory);
  return references.sort();
}

test("consumer readiness boundary and every controlling source exist", () => {
  const docsText = readRequired(docsRelativePath);

  for (const sourcePath of controllingPaths) {
    readRequired(sourcePath);
    assert.equal(docsText.includes(`\`${sourcePath}\``), true, sourcePath);
  }

  assert.match(
    docsText,
    /HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_CROSS_REFERENCE_CONSUMER_READINESS_BOUNDARY/u,
  );
  assert.match(docsText, /PROVE_ONLY_FINDINGS_CAPTURED_AS_DOCS_ONLY/u);
  assert.match(
    docsText,
    /APPEND_ONLY_CROSS_REFERENCE_CONSUMER_READINESS_ASSESSMENT/u,
  );
  assert.match(
    docsText,
    /ASSESSMENT_BASELINE_HEAD:\n+a4364925ee1fff375bd2a241133fec1c2f71abdf/u,
  );
});

test("completed checkpoint result and package surfaces remain exact", () => {
  const resultSchema = require("../schemas/human-review-controlled-handoff-brief-cross-reference-result.json");
  const checkpointModule = require(`../${checkpointRelativePath}`);
  const packageSchemas = require("../packages/schemas/src/index.js");
  const governanceIndex = require("../packages/governance/src/index.js");

  assert.deepEqual(Object.keys(checkpointModule), [functionName]);
  assert.equal(typeof checkpointModule[functionName], "function");
  assert.equal(checkpointModule[functionName].length, 1);
  assert.strictEqual(
    packageSchemas.humanReviewControlledHandoffBriefCrossReferenceResult,
    resultSchema,
  );
  assert.equal(Object.hasOwn(packageSchemas, functionName), false);
  assert.equal(Object.hasOwn(governanceIndex, functionName), false);
});

test("historical zero remains and live callers are limited to one exact future path", () => {
  const docsText = readRequired(docsRelativePath);
  const transitionText = readRequired(proofTransitionRelativePath);
  const packageReferences = findRuntimeReferences("packages");
  const permittedReferences = packageReferences.filter(
    (relativePath) => relativePath === permittedFutureCallerPath,
  );

  assert.match(docsText, /TRACKED_NON_TEST_CALLER_COUNT_AT_BASELINE:\n0/u);
  assert.deepEqual(
    packageReferences.filter(
      (relativePath) => relativePath !== permittedFutureCallerPath,
    ),
    [],
  );
  assert.equal(permittedReferences.length <= 1, true);
  assert.deepEqual(findRuntimeReferences("apps"), []);
  assert.deepEqual(findRuntimeReferences("scripts"), []);
  assert.match(
    transitionText,
    /HISTORICAL_TRACKED_NON_TEST_CALLER_COUNT:\n0/u,
  );
  assert.match(
    transitionText,
    /PERMITTED_FUTURE_NON_TEST_CALLER_PATH:\npackages\/governance\/src\/human-review-controlled-handoff-brief-pre-human-professional-approval-validation-boundary\.js/u,
  );
  assert.match(
    transitionText,
    /PERMITTED_LIVE_REFERENCE_CARDINALITY:\nZERO_OR_ONE_EXACT_PATH/u,
  );
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
  assert.match(
    docsText,
    /exact cross-reference semantics tracked \| `YES_TRACKED`/u,
  );
  assert.match(
    docsText,
    /isolated direct checkpoint behavior tracked \| `YES_TRACKED`/u,
  );
  assert.match(
    docsText,
    /governance package function export tracked \| `NO_INTERNAL_ONLY`/u,
  );
  assert.match(
    docsText,
    /first consumer class selected in tracked docs \| `NO_OPEN`/u,
  );
  assert.match(
    docsText,
    /exact consumer implementation proof frozen \| `NO_OPEN`/u,
  );
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
    "HANDOFF_APPROVAL_ASSEMBLY_EXPORT_DELIVERY_NOT_CREATED",
    "NO_REAL_PRIVATE_SOURCE_OR_CASE_MATERIAL_PROCESSED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
  ]) {
    assert.equal(docsText.includes(marker), true, marker);
  }

  assert.match(docsText, /do not inspect or process raw, private, source, case/u);
  assert.match(docsText, /not actual human review, professional review/u);
  assert.match(
    docsText,
    /TRACKED_DOCS_ONLY_CONSUMER_READINESS_BLOCKED_BY_TARGET_AND_IMPLEMENTATION_SEMANTICS/u,
  );
});
