const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const projectionSchema = require("../schemas/cmd-export-package-projection.json");
const exportPackageSchema = require("../schemas/cmd-export-package.json");
const {
  cmdExportPackage,
  cmdExportPackageProjection,
  sweBodelningExportPackageProjection,
} = require("../packages/schemas/src/index.js");
const {
  getExportPackageAdapter,
  hasJurisdictionProfileCapability,
  isSupportedJurisdictionProfileKey,
} = require("../packages/governance/src/index.js");

const docsPath = path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md");
const docsText = fs.readFileSync(docsPath, "utf8");

test("the new CMD_PROFILE export package projection schema accepts the documented surface", () => {
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
  assert.equal(projectionSchema.properties.jurisdiction_profile_key.const, "CMD_PROFILE");
  assert.equal(
    projectionSchema.properties.canonical_source.$ref,
    "https://governance-contracts.invalid/schemas/cmd-export-package.json#/$defs/exportPackageCanonicalSource",
  );
  assert.equal(
    projectionSchema.properties.profile_dossier_snapshot.$ref,
    "https://governance-contracts.invalid/schemas/cmd-profile-dossier-snapshot.json",
  );
  assert.equal(
    projectionSchema.properties.manifest.$ref,
    "https://governance-contracts.invalid/schemas/cmd-export-package.json#/$defs/exportPackageManifest",
  );
  assert.deepEqual(projectionSchema.properties.snapshot_status.required, [
    "source",
    "snapshot_export_version_found",
    "current_export_version",
    "snapshot_is_current",
  ]);
  assert.deepEqual(projectionSchema.properties.snapshot_status.properties.source.enum, [
    "persisted-current",
    "persisted-stale",
  ]);
});

test("packages/schemas exports the new schema if applicable", () => {
  assert.deepEqual(cmdExportPackageProjection, projectionSchema);
  assert.deepEqual(cmdExportPackage, exportPackageSchema);
});

test("docs describe the same export package projection surface", () => {
  assert.match(
    docsText,
    /read-time `"CMD_PROFILE"` export package projection contract is defined in `schemas\/cmd-export-package-projection\.json`/,
  );
  assert.match(docsText, /reuses the `"CMD_PROFILE"` export package surface/);
  assert.match(docsText, /top-level machine-readable `snapshot_status` block/);
  assert.match(docsText, /Runtime support is enabled for this `"CMD_PROFILE"` export package projection surface/);
  assert.match(
    docsText,
    /GET \/cases\/:caseId\/export-package\/latest` route now returns the persisted canonical `"CMD_PROFILE"` export package unchanged plus a machine-readable `snapshot_status` block/i,
  );
});

test("current SWE_BODELNING behavior remains unchanged", () => {
  assert.equal(
    sweBodelningExportPackageProjection.properties.jurisdiction_profile_key.const,
    "SWE_BODELNING",
  );
  assert.deepEqual(sweBodelningExportPackageProjection.required, [
    "jurisdiction_profile_key",
    "export_version",
    "dossier_fingerprint",
    "canonical_source",
    "profile_dossier_snapshot",
    "generated_at",
    "manifest",
    "snapshot_status",
  ]);
});

test("export-package runtime support for CMD_PROFILE remains enabled with final bundle/archive support present", () => {
  const adapter = getExportPackageAdapter("CMD_PROFILE");

  assert.equal(adapter.jurisdiction_profile_key, "CMD_PROFILE");
  assert.equal(typeof adapter.resolveExportPackageProjection, "function");
  assert.equal(isSupportedJurisdictionProfileKey("CMD_PROFILE"), true);
  assert.equal(hasJurisdictionProfileCapability("CMD_PROFILE", "export_package"), true);
  assert.equal(
    hasJurisdictionProfileCapability("CMD_PROFILE", "export_package_json_artifact"),
    true,
  );
  assert.equal(
    hasJurisdictionProfileCapability("CMD_PROFILE", "export_package_bundle_manifest"),
    true,
  );
  assert.equal(
    hasJurisdictionProfileCapability(
      "CMD_PROFILE",
      "export_package_bundle_archive_artifact",
    ),
    true,
  );
});

test("no readiness behavior changes are introduced", () => {
  const workerEntries = fs.readdirSync(path.join(__dirname, "..", "workers", "analyze"));
  assert.deepEqual(workerEntries, [".gitkeep"]);
});
