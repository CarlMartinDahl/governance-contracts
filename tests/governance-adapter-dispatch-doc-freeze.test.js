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

test("docs freeze the shared packages/governance adapter-dispatch scaffold as the runtime boundary seam", () => {
  assert.match(docsText, /Shared Governance Adapter-Dispatch Scaffold Freeze/i);
  assert.match(
    docsText,
    /shared `packages\/governance` jurisdiction-profile adapter\/dispatch scaffold is the canonical runtime\/governance boundary for the included surfaces below and is now frozen as the baseline seam/i,
  );
  assert.match(docsText, /`profile_input`/i);
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
    /`profile_dossier` runtime dispatch is already centralized through the shared `release_eval` adapter seam and its dossier-related methods rather than through a separate `profile_dossier` adapter registry/i,
  );
  assert.match(
    docsText,
    /callers at the runtime\/governance boundary for those included surfaces should go through the shared `packages\/governance` adapter\/dispatch seam keyed by `jurisdiction_profile_key`/i,
  );
  assert.match(
    docsText,
    /direct profile-specific adapter implementations may remain inside `packages\/governance` as internal implementation details behind that shared dispatch scaffold, but they are not the canonical shared runtime boundary contract for these included surfaces/i,
  );
  assert.match(
    docsText,
    /future new profiles or new governed surfaces should extend the shared dispatch seam instead of reintroducing direct profile-specific runtime-boundary calls/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, governance semantics, database behavior, API behavior, or fail-closed behavior/i,
  );

  assert.match(governanceIndexText, /function getProfileInputAdapter\(/);
  assert.match(governanceIndexText, /function getReleaseEvalAdapter\(/);
  assert.match(governanceIndexText, /function getExportPackageAdapter\(/);
  assert.match(governanceIndexText, /function getExportPackageJsonArtifactAdapter\(/);
  assert.match(governanceIndexText, /function getExportPackageMarkdownArtifactAdapter\(/);
  assert.match(governanceIndexText, /function getExportPackagePdfArtifactAdapter\(/);
  assert.match(governanceIndexText, /function getExportPackageDocxArtifactAdapter\(/);
  assert.match(governanceIndexText, /function getExportPackageBundleManifestAdapter\(/);
  assert.match(governanceIndexText, /function getExportPackageBundleArchiveArtifactAdapter\(/);
  assert.match(governanceIndexText, /function attachReleaseEvalProfileDossierSnapshot\(/);
  assert.match(governanceIndexText, /function resolveReleaseEvalProfileDossierSnapshot\(/);
  assert.match(governanceIndexText, /function resolveReleaseEvalProfileDossierProjection\(/);
  assert.doesNotMatch(governanceIndexText, /function getProfileDossierAdapter\(/);

  assert.match(registryText, /profile_inputs:\s+true/);
  assert.match(registryText, /release_eval:\s+true/);
  assert.match(registryText, /profile_dossier:\s+true/);
  assert.match(registryText, /export_package:\s+true/);
  assert.match(registryText, /export_package_json_artifact:\s+true/);
  assert.match(registryText, /export_package_markdown_artifact:\s+true/);
  assert.match(registryText, /export_package_pdf_artifact:\s+true/);
  assert.match(registryText, /export_package_docx_artifact:\s+true/);
  assert.match(registryText, /export_package_bundle_manifest:\s+true/);
  assert.match(registryText, /export_package_bundle_archive_artifact:\s+true/);
});
