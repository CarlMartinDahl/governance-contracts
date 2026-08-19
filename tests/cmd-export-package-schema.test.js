const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const schema = require("../schemas/cmd-export-package.json");
const {
  cmdExportPackage,
  sweBodelningExportPackage,
} = require("../packages/schemas/src/index.js");
const {
  getExportPackageAdapter,
  hasJurisdictionProfileCapability,
  isSupportedJurisdictionProfileKey,
} = require("../packages/governance/src/index.js");

const docsPath = path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md");
const docsText = fs.readFileSync(docsPath, "utf8");

test("the new CMD_PROFILE export package schema accepts the documented surface", () => {
  assert.deepEqual(schema.required, [
    "jurisdiction_profile_key",
    "export_version",
    "dossier_fingerprint",
    "canonical_source",
    "profile_dossier_snapshot",
    "generated_at",
    "manifest",
  ]);
  assert.equal(schema.properties.jurisdiction_profile_key.const, "CMD_PROFILE");
  assert.equal(
    schema.properties.profile_dossier_snapshot.$ref,
    "https://governance-contracts.invalid/schemas/cmd-profile-dossier-snapshot.json",
  );
  assert.deepEqual(schema.$defs.exportPackageCanonicalSource.required, [
    "release_eval_run_id",
    "evaluator_version",
    "jurisdiction_profile_key",
    "persisted_at",
  ]);
  assert.equal(
    schema.$defs.exportPackageCanonicalSource.properties.jurisdiction_profile_key.const,
    "CMD_PROFILE",
  );
  assert.deepEqual(schema.$defs.exportPackageManifest.required, [
    "included_top_level_artifacts",
  ]);
  assert.deepEqual(
    schema.$defs.exportPackageManifest.properties.included_top_level_artifacts.items.enum,
    ["canonical_source", "profile_dossier_snapshot"],
  );
});

test("packages/schemas exports the new schema if applicable", () => {
  assert.deepEqual(cmdExportPackage, schema);
});

test("docs describe the same export package surface", () => {
  assert.match(
    docsText,
    /canonical `"CMD_PROFILE"` export package contract is defined in `schemas\/cmd-export-package\.json`/,
  );
  assert.match(docsText, /reusing the `"CMD_PROFILE"` dossier snapshot surface/i);
  assert.match(docsText, /Runtime support is enabled for `"CMD_PROFILE"` at the export-package surface/i);
  assert.match(
    docsText,
    /derive and persist canonical `"CMD_PROFILE"` export packages deterministically from the persisted `"CMD_PROFILE"` dossier snapshot/i,
  );
});

test("current SWE_BODELNING behavior remains unchanged", () => {
  assert.equal(
    sweBodelningExportPackage.properties.jurisdiction_profile_key.const,
    "SWE_BODELNING",
  );
  assert.deepEqual(sweBodelningExportPackage.required, [
    "jurisdiction_profile_key",
    "export_version",
    "dossier_fingerprint",
    "canonical_source",
    "profile_dossier_snapshot",
    "generated_at",
    "manifest",
  ]);
  assert.equal(
    sweBodelningExportPackage.properties.profile_dossier_snapshot.$ref,
    "https://governance-contracts.invalid/schemas/swe-bodelning-profile-dossier-snapshot.json",
  );
});

test("export-package runtime support for CMD_PROFILE remains enabled with final bundle/archive support present", () => {
  const adapter = getExportPackageAdapter("CMD_PROFILE");

  assert.equal(adapter?.jurisdiction_profile_key, "CMD_PROFILE");
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
