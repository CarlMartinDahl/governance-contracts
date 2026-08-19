"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const docsRelativePath =
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_CROSS_REFERENCE_CONSUMER_TARGET_SELECTION_BOUNDARY_v1.md";
const controllingPaths = [
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_WORKSPACE_PUBLIC_SCOPE_ALIGNMENT_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_CONTRACT_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_CROSS_REFERENCE_SEMANTICS_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_CROSS_REFERENCE_CONSUMER_READINESS_BOUNDARY_v1.md",
  "schemas/human-review-controlled-handoff-brief-cross-reference-result.json",
  "packages/schemas/src/index.js",
  "packages/governance/src/human-review-controlled-handoff-brief-cross-reference-validation-boundary.js",
  "packages/governance/src/index.js",
  "tests/human-review-controlled-handoff-brief-cross-reference-result-package-export.test.js",
  "tests/human-review-controlled-handoff-brief-cross-reference-validation-boundary.test.js",
];

function readRequired(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  assert.equal(fs.existsSync(absolutePath), true, `expected ${relativePath}`);
  return fs.readFileSync(absolutePath, "utf8");
}

test("consumer target-selection boundary and controlling sources exist", () => {
  const docsText = readRequired(docsRelativePath);

  for (const sourcePath of controllingPaths) {
    readRequired(sourcePath);
    assert.equal(docsText.includes(`\`${sourcePath}\``), true, sourcePath);
  }

  assert.match(
    docsText,
    /HUMAN_REVIEW_CONTROLLED_HANDOFF_BRIEF_CROSS_REFERENCE_CONSUMER_TARGET_SELECTION_BOUNDARY/u,
  );
  assert.match(docsText, /DOCS_ONLY/u);
  assert.match(docsText, /OWNER_SELECTED_CONSUMER_TARGET_OPTION_A_CAPTURED/u);
});

test("exactly one internal post-construction pre-approval target is selected", () => {
  const docsText = readRequired(docsRelativePath);

  assert.match(
    docsText,
    /SELECTED_CONSUMER_TARGET:\nHUMAN_REVIEW_WORKSPACE_CONTROLLED_HANDOFF_BRIEF_POST_CONSTRUCTION_PRE_HUMAN_PROFESSIONAL_APPROVAL_VALIDATION_BOUNDARY_V1/u,
  );
  assert.match(
    docsText,
    /SELECTED_CONSUMER_TARGET_CLASS:\nINTERNAL_POST_CONSTRUCTION_PRE_HUMAN_PROFESSIONAL_APPROVAL_VALIDATION_CHECKPOINT/u,
  );
  assert.match(
    docsText,
    /SELECTED_CHECKPOINT_FUNCTION:\nvalidateHumanReviewControlledHandoffBriefCrossReference/u,
  );
  assert.match(docsText, /SELECTED_CONSUMER_TARGET_COUNT:\n1/u);
  assert.match(
    docsText,
    /after one bounded set contains a constructed Controlled Handoff Brief/u,
  );
  assert.match(
    docsText,
    /before the Controlled Handoff Brief candidate may be presented to or/u,
  );
  assert.match(docsText, /future human\/professional approval evaluation/u);
});

test("two target decisions are resolved while seven implementation semantics remain open", () => {
  const docsText = readRequired(docsRelativePath);
  const resolvedSection = docsText.slice(
    docsText.indexOf("## 4. Resolved Target Decisions"),
    docsText.indexOf("## 5."),
  );
  const openSection = docsText.slice(
    docsText.indexOf("## 5. Unresolved Implementation Semantics"),
    docsText.indexOf("## 6."),
  );

  assert.equal((resolvedSection.match(/^\| \d+ \|/gmu) ?? []).length, 2);
  assert.equal((openSection.match(/^\| \d+ \|/gmu) ?? []).length, 7);
  assert.match(docsText, /RESOLVED_CONSUMER_TARGET_DECISION_COUNT:\n2/u);
  assert.match(
    docsText,
    /OPEN_CONSUMER_IMPLEMENTATION_SEMANTIC_DECISION_COUNT:\n7/u,
  );
  assert.match(
    docsText,
    /RELEASE_BOUNDARY_DECISION:\nPRESERVED_AS_SEPARATE_HUMAN_PROFESSIONAL_GATE/u,
  );
});

test("result checkpoint and package surfaces remain exact", () => {
  const resultSchema = require("../schemas/human-review-controlled-handoff-brief-cross-reference-result.json");
  const checkpointModule = require("../packages/governance/src/human-review-controlled-handoff-brief-cross-reference-validation-boundary.js");
  const packageSchemas = require("../packages/schemas/src/index.js");
  const governanceIndex = require("../packages/governance/src/index.js");
  const functionName =
    "validateHumanReviewControlledHandoffBriefCrossReference";

  assert.deepEqual(Object.keys(checkpointModule), [functionName]);
  assert.equal(checkpointModule[functionName].length, 1);
  assert.strictEqual(
    packageSchemas.humanReviewControlledHandoffBriefCrossReferenceResult,
    resultSchema,
  );
  assert.equal(Object.hasOwn(packageSchemas, functionName), false);
  assert.equal(Object.hasOwn(governanceIndex, functionName), false);
});

test("exact two-file scope runtime exclusions and no-conclusion boundaries remain explicit", () => {
  const docsText = readRequired(docsRelativePath);

  assert.match(
    docsText,
    /CROSS_REFERENCE_CONSUMER_TARGET_SELECTION_SLICE_FILE_COUNT:\n2/u,
  );
  for (const marker of [
    "CONSUMER_IMPLEMENTATION_NOT_CREATED",
    "HUMAN_PROFESSIONAL_APPROVAL_IMPLEMENTATION_NOT_CREATED",
    "HANDOFF_ASSEMBLY_EXPORT_DELIVERY_NOT_CREATED",
    "INPUT_ACQUISITION_AND_ENVELOPE_ASSEMBLY_NOT_DEFINED",
    "CODE_OWNERSHIP_AND_IMPORT_PATH_NOT_DEFINED",
    "INVOCATION_FAILURE_AND_RESULT_HANDLING_NOT_DEFINED",
    "LOGGING_TELEMETRY_AND_AUDIT_EMISSION_NOT_DEFINED",
    "PERSISTENCE_API_ROUTE_DISPATCH_PROVIDER_MODEL_UI_NOT_CREATED",
    "NO_REAL_PRIVATE_SOURCE_OR_CASE_MATERIAL_PROCESSED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
  ]) {
    assert.equal(docsText.includes(marker), true, marker);
  }

  assert.match(docsText, /one `DOCS_ONLY` implementation-semantics boundary/u);
  assert.match(
    docsText,
    /not actual human review, professional\nreview, legal review/u,
  );
  assert.match(
    docsText,
    /TRACKED_DOCS_ONLY_EXACT_TARGET_SELECTED_IMPLEMENTATION_SEMANTICS_OPEN/u,
  );
});
