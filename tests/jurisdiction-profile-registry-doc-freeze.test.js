const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const docsText = fs.readFileSync(
  path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md"),
  "utf8",
);
const governanceIndexText = fs.readFileSync(
  path.join(__dirname, "..", "packages", "governance", "src", "index.js"),
  "utf8",
);
const registryText = fs.readFileSync(
  path.join(
    __dirname,
    "..",
    "packages",
    "governance",
    "src",
    "jurisdiction-profile-registry.js",
  ),
  "utf8",
);
const registrySchemaText = fs.readFileSync(
  path.join(__dirname, "..", "schemas", "jurisdiction-profile-registry.json"),
  "utf8",
);

test("docs freeze the shared jurisdiction-profile registry scaffold as the machine-readable profile/capability boundary seam", () => {
  assert.match(docsText, /Shared Jurisdiction-Profile Registry Scaffold Freeze/i);
  assert.match(
    docsText,
    /shared `packages\/governance` jurisdiction-profile registry scaffold is the canonical machine-readable profile\/capability registry boundary and is now frozen as the baseline seam/i,
  );
  assert.match(docsText, /shared registry is keyed by `jurisdiction_profile_key`/i);
  assert.match(docsText, /`SWE_BODELNING`/i);
  assert.match(docsText, /"CMD_PROFILE"/i);
  assert.match(docsText, /`profile_inputs`/i);
  assert.match(docsText, /`release_eval`/i);
  assert.match(docsText, /`profile_dossier`/i);
  assert.match(docsText, /`export_package`/i);
  assert.match(docsText, /`export_package_json_artifact`/i);
  assert.match(docsText, /`export_package_markdown_artifact`/i);
  assert.match(docsText, /`export_package_pdf_artifact`/i);
  assert.match(docsText, /`export_package_docx_artifact`/i);
  assert.match(docsText, /`export_package_bundle_manifest`/i);
  assert.match(docsText, /`export_package_bundle_archive_artifact`/i);
  assert.match(
    docsText,
    /callers performing shared runtime capability checks for those registry-covered surfaces should use the central registry seam rather than bypassing it with ad hoc profile branching/i,
  );
  assert.match(
    docsText,
    /runtime registry implementation in `packages\/governance\/src\/jurisdiction-profile-registry\.js` plus the contract\/schema surface in `schemas\/jurisdiction-profile-registry\.json`/i,
  );
  assert.match(
    docsText,
    /profile-specific legal or runtime implementations may remain elsewhere as internal implementation details, but the registry is the canonical shared machine-readable profile\/capability boundary/i,
  );
  assert.match(
    docsText,
    /future new profiles or future new capability flags should extend the shared registry rather than reintroducing scattered profile metadata checks/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, registry semantics, database behavior, API behavior, or fail-closed behavior/i,
  );

  assert.match(governanceIndexText, /getJurisdictionProfileRegistryEntry/);
  assert.match(governanceIndexText, /hasJurisdictionProfileCapability/);
  assert.match(governanceIndexText, /isSupportedJurisdictionProfileKey/);
  assert.match(governanceIndexText, /assertSupportedJurisdictionProfileCapability/);

  assert.match(registryText, /function getJurisdictionProfileRegistryEntry\(/);
  assert.match(registryText, /function isSupportedJurisdictionProfileKey\(/);
  assert.match(registryText, /function hasJurisdictionProfileCapability\(/);
  assert.match(registryText, /sweBodelningProfileKey/);
  assert.match(registryText, /cmdProfileKey/);
  assert.match(registryText, /profile_inputs:\s+true/);
  assert.match(registryText, /release_eval:\s+true/);
  assert.match(registryText, /profile_dossier:\s+true/);
  assert.match(registryText, /export_package_bundle_archive_artifact:\s+true/);

  assert.match(registrySchemaText, /"SWE_BODELNING"/);
  assert.match(registrySchemaText, /"CMD_PROFILE"/);
  assert.match(registrySchemaText, /"jurisdiction_profile_key"/);
  assert.match(registrySchemaText, /"profile_inputs"/);
  assert.match(registrySchemaText, /"export_package_bundle_archive_artifact"/);
});
