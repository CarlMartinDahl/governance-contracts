const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const schema = require("../schemas/controlled-synthetic-red-team-result-envelope-validator-result.json");
const packageSchemas = require("../packages/schemas/src/index.js");

const packageIndexPath = path.join(__dirname, "..", "packages", "schemas", "src", "index.js");
const exportName = "controlledSyntheticRedTeamResultEnvelopeValidatorResult";
const candidateExportName = "controlledSyntheticRedTeamResultEnvelope";
const blockedBehaviorExports = [
  "controlledSyntheticRedTeamResultEnvelopeValidator",
  "getControlledSyntheticRedTeamResultEnvelopeValidator",
  "controlledSyntheticRedTeamResultEnvelopeValidatorRegistry",
];

test("packages/schemas exports the exact validator-result schema object", () => {
  assert.equal(Object.hasOwn(packageSchemas, exportName), true);
  assert.strictEqual(packageSchemas[exportName], schema);
  assert.deepEqual(packageSchemas[exportName], schema);
  assert.equal(
    packageSchemas[exportName].$id,
    "https://governance-contracts.invalid/schemas/controlled-synthetic-red-team-result-envelope-validator-result.json",
  );
  assert.equal(
    packageSchemas[exportName].title,
    "Controlled Synthetic Red-Team Result Envelope Validator Result Contract",
  );
});

test("validator-result package export preserves the exact structural contract", () => {
  const exportedSchema = packageSchemas[exportName];

  assert.deepEqual(exportedSchema.required, ["valid", "contractKind", "version", "errors"]);
  assert.deepEqual(Object.keys(exportedSchema.properties), [
    "valid",
    "contractKind",
    "version",
    "errors",
  ]);
  assert.equal(exportedSchema.oneOf.length, 2);
  assert.equal(exportedSchema.properties.errors.items.oneOf.length, 5);
  assert.equal(exportedSchema.properties.errors.uniqueItems, true);
  assert.equal(
    exportedSchema.properties.contractKind.const,
    "CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE_VALIDATOR_BOUNDARY",
  );
  assert.equal(exportedSchema.properties.version.const, "v1");
});

test("candidate schema and validateControlledSyntheticRedTeamResultEnvelope exports remain present while remaining behavior siblings stay absent", () => {
  assert.equal(Object.hasOwn(packageSchemas, candidateExportName), true);
  assert.equal(
    packageSchemas[candidateExportName].$id,
    "https://governance-contracts.invalid/schemas/controlled-synthetic-red-team-result-envelope.json",
  );

  for (const blockedExport of blockedBehaviorExports) {
    assert.equal(Object.hasOwn(packageSchemas, blockedExport), false, blockedExport);
  }
});

test("package index uses one static validator-result binding and one export property", () => {
  const indexText = fs.readFileSync(packageIndexPath, "utf8");
  const occurrences = indexText.match(
    /\bcontrolledSyntheticRedTeamResultEnvelopeValidatorResult\b/g,
  ) ?? [];

  assert.equal(occurrences.length, 2);
  assert.match(
    indexText,
    /controlledSyntheticRedTeamResultEnvelopeValidatorResult = require\("\.\.\/\.\.\/\.\.\/schemas\/controlled-synthetic-red-team-result-envelope-validator-result\.json"\)/,
  );
  assert.match(
    indexText,
    /controlledSyntheticRedTeamResultEnvelope, controlledSyntheticRedTeamResultEnvelopeValidatorResult,/,
  );
});
