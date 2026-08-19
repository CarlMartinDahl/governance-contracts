const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const schema = require("../schemas/swe-bodelning-export-package.json");
const projectionSchema = require("../schemas/swe-bodelning-export-package-projection.json");
const {
  sweBodelningExportPackage,
  sweBodelningExportPackageProjection,
} = require("../packages/schemas/src/index.js");

const docsPath = path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md");
const docsText = fs.readFileSync(docsPath, "utf8");

test("the export package schema includes the canonical required SWE_BODELNING fields", () => {
  assert.deepEqual(schema.required, [
    "jurisdiction_profile_key",
    "export_version",
    "dossier_fingerprint",
    "canonical_source",
    "profile_dossier_snapshot",
    "generated_at",
    "manifest",
  ]);
  assert.equal(schema.properties.jurisdiction_profile_key.const, "SWE_BODELNING");
  assert.equal(
    schema.properties.canonical_source.$ref,
    "https://governance-contracts.invalid/schemas/swe-bodelning-profile-dossier-snapshot.json#/$defs/canonicalSource",
  );
  assert.equal(
    schema.properties.profile_dossier_snapshot.$ref,
    "https://governance-contracts.invalid/schemas/swe-bodelning-profile-dossier-snapshot.json",
  );
  assert.deepEqual(schema.$defs.exportPackageManifest.required, [
    "included_top_level_artifacts",
  ]);
  assert.deepEqual(
    schema.$defs.exportPackageManifest.properties.included_top_level_artifacts.items.enum,
    ["canonical_source", "profile_dossier_snapshot"],
  );
});

test("packages/schemas exports the SWE_BODELNING export package schema", () => {
  assert.deepEqual(sweBodelningExportPackage, schema);
});

test("the export package projection schema includes the read-time snapshot_status surface", () => {
  assert.deepEqual(projectionSchema.required, [
    "jurisdiction_profile_key",
    "export_version",
    "dossier_fingerprint",
    "canonical_source",
    "profile_dossier_snapshot",
    "generated_at",
    "manifest",
    "snapshot_status",
  ]);
  assert.deepEqual(
    projectionSchema.properties.snapshot_status.required,
    [
      "source",
      "snapshot_export_version_found",
      "current_export_version",
      "snapshot_is_current",
    ],
  );
  assert.deepEqual(
    projectionSchema.properties.snapshot_status.properties.source.enum,
    ["persisted-current", "persisted-stale"],
  );
});

test("packages/schemas exports the SWE_BODELNING export package projection schema", () => {
  assert.deepEqual(sweBodelningExportPackageProjection, projectionSchema);
});

test("docs minimally describe the export package projection surface", () => {
  assert.match(docsText, /schemas\/swe-bodelning-export-package\.json/);
  assert.match(docsText, /schemas\/swe-bodelning-export-package-projection\.json/);
  assert.match(docsText, /`SWE_BODELNING` export package contract/);
  assert.match(docsText, /top-level `snapshot_status` block/);
  assert.match(
    docsText,
    /No zip\/pdf\/docx\/file generation or final output packaging is introduced in these export package slices/,
  );
});
