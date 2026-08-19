const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const docsText = fs.readFileSync(
  path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md"),
  "utf8",
);
const schemasIndexText = fs.readFileSync(
  path.join(__dirname, "..", "packages", "schemas", "src", "index.js"),
  "utf8",
);
const databaseIndexText = fs.readFileSync(
  path.join(__dirname, "..", "packages", "database", "src", "index.js"),
  "utf8",
);

test("docs freeze the shared packages/schemas validator-dispatch scaffold as the persisted-surface boundary seam", () => {
  assert.match(docsText, /Shared Validator-Dispatch Scaffold Freeze/i);
  assert.match(
    docsText,
    /shared `packages\/schemas` jurisdiction-profile validator-dispatch scaffold is the canonical persisted-surface validation boundary for the included surfaces below and is now frozen as the baseline seam/i,
  );
  assert.match(docsText, /`release_eval`/i);
  assert.match(docsText, /`export_package`/i);
  assert.match(docsText, /`export_package_json_artifact`/i);
  assert.match(docsText, /`export_package_markdown_artifact`/i);
  assert.match(docsText, /`export_package_pdf_artifact`/i);
  assert.match(docsText, /`export_package_docx_artifact`/i);
  assert.match(docsText, /`export_package_bundle_manifest`/i);
  assert.match(docsText, /`export_package_bundle_archive_artifact`/i);
  assert.match(
    docsText,
    /callers at the persistence\/database boundary for those included surfaces should go through the shared `packages\/schemas` validator-dispatch seam keyed by `jurisdiction_profile_key`/i,
  );
  assert.match(
    docsText,
    /direct profile-specific validator functions may remain inside `packages\/schemas` as internal implementation details behind that shared dispatch scaffold, but they are not the canonical persistence-boundary contract for these included persisted surfaces/i,
  );
  assert.match(
    docsText,
    /future new profiles or future new persisted surfaces should extend the shared dispatch seam instead of reintroducing direct profile-specific persistence-boundary calls/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, validator semantics, schema behavior, or fail-closed behavior/i,
  );

  assert.match(schemasIndexText, /function getReleaseEvalValidator\(/);
  assert.match(schemasIndexText, /function getExportPackageValidator\(/);
  assert.match(schemasIndexText, /function getExportPackageJsonArtifactValidator\(/);
  assert.match(schemasIndexText, /function getExportPackageMarkdownArtifactValidator\(/);
  assert.match(schemasIndexText, /function getExportPackagePdfArtifactValidator\(/);
  assert.match(schemasIndexText, /function getExportPackageDocxArtifactValidator\(/);
  assert.match(schemasIndexText, /function getExportPackageBundleManifestValidator\(/);
  assert.match(schemasIndexText, /function getExportPackageBundleArchiveArtifactValidator\(/);

  assert.match(databaseIndexText, /validateReleaseEvalRun\(/);
  assert.match(databaseIndexText, /validateExportPackage\(/);
  assert.match(databaseIndexText, /validateExportPackageJsonArtifact\(/);
  assert.match(databaseIndexText, /validateExportPackageMarkdownArtifact\(/);
  assert.match(databaseIndexText, /validateExportPackagePdfArtifact\(/);
  assert.match(databaseIndexText, /validateExportPackageDocxArtifact\(/);
  assert.match(databaseIndexText, /validateExportPackageBundleManifest\(/);
  assert.match(databaseIndexText, /validateExportPackageBundleArchiveArtifact\(/);
});
