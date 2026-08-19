"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.join(__dirname, "..");
const docsRelativePath =
  "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_VALIDATOR_CONSUMER_READINESS_BOUNDARY_v1.md";
const controllingPaths = [
  "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_CONTRACT_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_VALIDATOR_HELPER_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "docs/DOMAIN_CONTRACTS_CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_VALIDATOR_HELPER_PACKAGE_EXPORT_SCAFFOLD_SCOPE_BOUNDARY_v1.md",
  "schemas/controlled-synthetic-red-team-result-envelope.json",
  "schemas/controlled-synthetic-red-team-result-envelope-validator-result.json",
  "packages/schemas/src/controlled-synthetic-red-team-result-envelope-validator.js",
  "packages/schemas/src/index.js",
  "tests/controlled-synthetic-red-team-result-envelope-validator.test.js",
  "tests/controlled-synthetic-red-team-result-envelope-validator-package-export.test.js",
];
const retainedSiblingDenials = [
  "controlledSyntheticRedTeamResultEnvelopeValidator",
  "getControlledSyntheticRedTeamResultEnvelopeValidator",
  "controlledSyntheticRedTeamResultEnvelopeValidatorRegistry",
];

function readRequired(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  assert.equal(fs.existsSync(absolutePath), true, `expected ${relativePath}`);
  return fs.readFileSync(absolutePath, "utf8");
}

test("validator-consumer readiness boundary and every controlling source exist", () => {
  const docsText = readRequired(docsRelativePath);

  for (const sourcePath of controllingPaths) {
    readRequired(sourcePath);
    assert.equal(docsText.includes(`\`${sourcePath}\``), true, sourcePath);
  }

  assert.match(
    docsText,
    /CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_VALIDATOR_CONSUMER_READINESS_BOUNDARY/u,
  );
  assert.match(docsText, /PROVE_ONLY_FINDINGS_CAPTURED_AS_DOCS_ONLY/u);
  assert.match(docsText, /APPEND_ONLY_VALIDATOR_CONSUMER_READINESS_ASSESSMENT/u);
});

test("completed schema helper and package surfaces remain exact", () => {
  const candidateSchema = require("../schemas/controlled-synthetic-red-team-result-envelope.json");
  const resultSchema = require("../schemas/controlled-synthetic-red-team-result-envelope-validator-result.json");
  const validatorModule = require("../packages/schemas/src/controlled-synthetic-red-team-result-envelope-validator.js");
  const packageSchemas = require("../packages/schemas/src/index.js");
  const exportName = "validateControlledSyntheticRedTeamResultEnvelope";

  assert.deepEqual(Object.keys(validatorModule), [exportName]);
  assert.equal(typeof validatorModule[exportName], "function");
  assert.equal(validatorModule[exportName].length, 1);
  assert.strictEqual(packageSchemas[exportName], validatorModule[exportName]);
  assert.strictEqual(
    packageSchemas.controlledSyntheticRedTeamResultEnvelope,
    candidateSchema,
  );
  assert.strictEqual(
    packageSchemas.controlledSyntheticRedTeamResultEnvelopeValidatorResult,
    resultSchema,
  );
  for (const deniedName of retainedSiblingDenials) {
    assert.equal(Object.hasOwn(packageSchemas, deniedName), false, deniedName);
  }
});

test("twelve current tracked facts are frozen without integration claims", () => {
  const docsText = readRequired(docsRelativePath);
  const section = docsText.slice(
    docsText.indexOf("## 3. Current Tracked Facts"),
    docsText.indexOf("## 4."),
  );

  assert.equal((section.match(/^\| \d+ \|/gmu) ?? []).length, 12);
  assert.match(docsText, /CURRENT_VALIDATOR_CONSUMER_READINESS_FACT_COUNT:\n12/u);
  assert.match(docsText, /TRACKED_PRODUCTION_CONSUMER_COUNT:\n0/u);
  assert.match(docsText, /CONSUMER_TARGET:\nNOT_SELECTED/u);
  assert.match(docsText, /RUNTIME_INTEGRATION_STATUS:\nNOT_CREATED/u);
});

test("consumer readiness stays blocked while completed surfaces remain distinct", () => {
  const docsText = readRequired(docsRelativePath);

  assert.match(
    docsText,
    /VALIDATOR_CONSUMER_READINESS:\nBLOCKED_BY_EXACT_TARGET_AND_SCOPE_DECISIONS/u,
  );
  assert.match(docsText, /candidate JSON schema tracked \| `YES_TRACKED`/u);
  assert.match(docsText, /strict package export tracked \| `YES_TRACKED`/u);
  assert.match(docsText, /first consumer class selected \| `NO_OPEN`/u);
  assert.match(docsText, /exact integration and non-interference proof frozen \| `NO_OPEN`/u);
});

test("ten open decisions and one docs-only target-selection step are explicit", () => {
  const docsText = readRequired(docsRelativePath);
  const section = docsText.slice(
    docsText.indexOf("## 5. Ten Open Consumer Scope Decisions"),
    docsText.indexOf("## 6."),
  );

  assert.equal((section.match(/^\| \d+ \|/gmu) ?? []).length, 10);
  assert.match(docsText, /OPEN_VALIDATOR_CONSUMER_SCOPE_DECISION_COUNT:\n10/u);
  assert.match(section, /consume or remain unconsumed/u);
  assert.match(section, /canonical input acquisition/u);
  assert.match(section, /observability boundary/u);
  assert.match(docsText, /one `DOCS_ONLY` consumer-target selection/u);
  assert.match(docsText, /must not implement the consumer/u);
});

test("readiness assessment preserves non-interference and no-conclusion boundaries", () => {
  const docsText = readRequired(docsRelativePath);

  for (const marker of [
    "DISPATCH_REGISTRY_LOOKUP_NOT_CREATED",
    "PERSISTENCE_API_PROVIDER_MODEL_INTEGRATION_NOT_CREATED",
    "LOGGING_TELEMETRY_NOT_CREATED",
    "NO_EXECUTED_MODEL_RUN_EVIDENCE_CREATED",
    "PRODUCT_CANDIDATE_NONE",
    "EXTERNAL_USE_NOT_AUTHORIZED",
    "HUMAN_PROFESSIONAL_REVIEW_REQUIRED",
  ]) {
    assert.equal(docsText.includes(marker), true, marker);
  }

  assert.match(docsText, /do not inspect or process raw, private, source/u);
  assert.match(docsText, /not actual human review, professional review, legal/u);
  assert.match(
    docsText,
    /TRACKED_DOCS_ONLY_CONSUMER_READINESS_BLOCKED_BY_TARGET_AND_SCOPE_DECISIONS/u,
  );
});
