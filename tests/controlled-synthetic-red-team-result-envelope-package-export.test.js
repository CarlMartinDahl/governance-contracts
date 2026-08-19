const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const schema = require("../schemas/controlled-synthetic-red-team-result-envelope.json");
const packageSchemas = require("../packages/schemas/src/index.js");

const packageIndexPath = path.join(__dirname, "..", "packages", "schemas", "src", "index.js");
const exportName = "controlledSyntheticRedTeamResultEnvelope";

const blockedSiblingExports = [
  "controlledSyntheticRedTeamResultEnvelopeValidator",
  "getControlledSyntheticRedTeamResultEnvelopeValidator",
  "controlledSyntheticRedTeamResultEnvelopeValidatorRegistry",
];

test("packages/schemas exports the controlled synthetic red-team result envelope schema object", () => {
  assert.equal(Object.hasOwn(packageSchemas, exportName), true);
  assert.deepEqual(packageSchemas[exportName], schema);
  assert.equal(
    packageSchemas[exportName].$id,
    "https://governance-contracts.invalid/schemas/controlled-synthetic-red-team-result-envelope.json",
  );
  assert.equal(
    packageSchemas[exportName].title,
    "Controlled Synthetic Red-Team Result Envelope Contract",
  );
});

test("package export preserves the exact candidate-envelope shape", () => {
  const exportedSchema = packageSchemas[exportName];

  assert.equal(exportedSchema.required.length, 10);
  assert.equal(Object.keys(exportedSchema.properties).length, 10);
  assert.equal(exportedSchema.oneOf.length, 26);
  assert.equal(
    exportedSchema.properties.contractKind.const,
    "CONTROLLED_SYNTHETIC_RED_TEAM_RESULT_ENVELOPE",
  );
  assert.equal(
    exportedSchema.properties.syntheticCorpusPosture.const,
    "SYNTHETIC_CONTROL_CORPUS_ONLY",
  );
  assert.equal(exportedSchema.properties.realEvidencePosture.const, "NO_REAL_EVIDENCE");
  assert.equal(exportedSchema.properties.humanProfessionalReviewRequired.const, true);
});

test("package export publishes validateControlledSyntheticRedTeamResultEnvelope while retaining no validator object lookup or dispatch sibling surface", () => {
  for (const blockedExport of blockedSiblingExports) {
    assert.equal(Object.hasOwn(packageSchemas, blockedExport), false, blockedExport);
  }
});

test("package index uses one static schema binding and one schema-object export", () => {
  const indexText = fs.readFileSync(packageIndexPath, "utf8");
  const occurrences = indexText.match(/\bcontrolledSyntheticRedTeamResultEnvelope\b/g) ?? [];

  assert.equal(occurrences.length, 2);
  assert.match(
    indexText,
    /controlledSyntheticRedTeamResultEnvelope = require\("\.\.\/\.\.\/\.\.\/schemas\/controlled-synthetic-red-team-result-envelope\.json"\)/,
  );
  assert.match(
    indexText,
    /jurisdictionProfileRegistry, noRawMetadataManifest, controlledSyntheticRedTeamResultEnvelope,/,
  );
});
