const test = require("node:test");
const assert = require("node:assert/strict");

const schema = require("../schemas/no-raw-metadata-manifest.json");
const packageSchemas = require("../packages/schemas/src/index.js");

test("packages/schemas exports the no-raw metadata manifest schema object", () => {
  assert.equal(Object.hasOwn(packageSchemas, "noRawMetadataManifest"), true);
  assert.deepEqual(packageSchemas.noRawMetadataManifest, schema);
  assert.equal(
    packageSchemas.noRawMetadataManifest.$id,
    "https://governance-contracts.invalid/schemas/no-raw-metadata-manifest.json",
  );
  assert.equal(
    packageSchemas.noRawMetadataManifest.title,
    "No-Raw Metadata Manifest Contract Scaffold",
  );
});

test("validator export is explicit while validator dispatch remains absent", () => {
  assert.equal(Object.hasOwn(packageSchemas, "validateNoRawMetadataManifest"), true);
  assert.equal(typeof packageSchemas.validateNoRawMetadataManifest, "function");

  for (const exportName of [
    "noRawMetadataManifestValidator",
    "getNoRawMetadataManifestValidator",
    "noRawMetadataManifestValidatorRegistry",
  ]) {
    assert.equal(Object.hasOwn(packageSchemas, exportName), false, exportName);
  }
});

test("package export proof stays schema-object only and does not require manifest data or runtime behavior", () => {
  assert.equal(Object.hasOwn(packageSchemas.noRawMetadataManifest.properties, "manifest_id"), true);

  for (const blockedSurface of [
    "manifest_instance_id",
    "manifest_population_status",
    "metadata_acquisition_result",
    "actual_matrix_id",
    "runtime_behavior",
    "api_behavior",
    "external_use_readiness",
    "product_candidate_selection",
  ]) {
    assert.equal(
      Object.hasOwn(packageSchemas.noRawMetadataManifest.properties, blockedSurface),
      false,
      blockedSurface,
    );
  }

  assert.equal(
    packageSchemas.noRawMetadataManifest.properties.external_use_status.const,
    "EXTERNAL_USE_NOT_AUTHORIZED",
  );
  assert.equal(
    packageSchemas.noRawMetadataManifest.properties.product_candidate_status.const,
    "PRODUCT_CANDIDATE_NONE",
  );
});
