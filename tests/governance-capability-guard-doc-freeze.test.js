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

test("docs freeze the shared governance capability guard seam as the runtime supported-capability gate boundary", () => {
  assert.match(
    docsText,
    /Shared Governance Capability-Guard Helper Seam Freeze/i,
  );
  assert.match(
    docsText,
    /shared `packages\/governance\/src\/index\.js` `assertSupportedJurisdictionProfileCapability` helper is the canonical runtime supported-capability guard boundary for the current included governance flows below and is now frozen as the baseline seam/i,
  );
  assert.match(
    docsText,
    /the currently evidenced governed surfaces in this freeze are limited to:\s+`profile_input` governance helpers\s+`release_eval` governance helpers\s+`profile_dossier` release-eval-backed governance resolution helpers\s+`export_package` governance helpers\s+`export_package_json_artifact` governance helpers\s+`export_package_markdown_artifact` governance helpers\s+`export_package_pdf_artifact` governance helpers\s+`export_package_docx_artifact` governance helpers\s+`export_package_bundle_manifest` governance helpers\s+`export_package_bundle_archive_artifact` governance helpers/i,
  );
  assert.match(
    docsText,
    /callers performing shared runtime jurisdiction\/profile capability gating for those included surfaces should go through the shared `assertSupportedJurisdictionProfileCapability\(jurisdictionProfileKey, capability\)` seam rather than inlining registry lookups and unsupported-profile branches inside downstream governance logic/i,
  );
  assert.match(
    docsText,
    /the currently concrete shared behavior already evidenced for this helper seam is limited to:\s+delegating the capability check to `hasJurisdictionProfileCapability\(jurisdictionProfileKey, capability\)`\s+throwing `createGovernanceError\("ERR_UNSUPPORTED_JURISDICTION_PROFILE", "jurisdiction_profile_key is not supported", \{ jurisdiction_profile_key: jurisdictionProfileKey \}\)` when the requested capability is not supported\s+otherwise returning normally and allowing downstream governance-specific logic to continue/i,
  );
  assert.match(
    docsText,
    /the current bounded reuse already evidenced in `packages\/governance\/src\/index\.js` is limited to 55 current helper call sites spanning profile-input, release-eval\/profile-dossier, export-package, export-package artifact, bundle\/package manifest, and final bundle\/archive governance flows/i,
  );
  assert.match(
    docsText,
    /the shared `createGovernanceError` helper seam remains outside this helper seam because machine-readable governance error construction is a separate frozen boundary that this guard consumes rather than defines/i,
  );
  assert.match(
    docsText,
    /the shared jurisdiction-profile registry scaffold remains outside this helper seam because capability metadata and registry source-of-truth ownership live in `packages\/governance\/src\/jurisdiction-profile-registry\.js`, while this guard only consumes the existing `hasJurisdictionProfileCapability` surface/i,
  );
  assert.match(
    docsText,
    /the shared API response-helper seam remains outside this helper seam because API response construction is performed in `apps\/api\/src\/index\.js` after governance results are returned or thrown/i,
  );
  assert.match(
    docsText,
    /the shared `\/cases\/:caseId\/\.\.\.` parser seam remains outside this helper seam because path parsing occurs before any governance boundary is reached/i,
  );
  assert.match(
    docsText,
    /the shared `loadAuthorizedCaseContext` helper remains outside this helper seam because auth\/access loading and capability gating for case-scoped routes occur before governance helper selection/i,
  );
  assert.match(
    docsText,
    /the shared database helper seams remain outside this helper seam because persistence\/storage\/reconciliation\/reader behavior lives below the governance runtime boundary/i,
  );
  assert.match(
    docsText,
    /the shared validator-dispatch scaffold remains outside this helper seam because schema-validator dispatch selects validators rather than performing shared runtime capability gating/i,
  );
  assert.match(
    docsText,
    /the shared governance adapter-dispatch scaffold remains outside this helper seam because jurisdiction-profile adapter routing and governed-surface dispatch are separate runtime boundaries above this shared capability guard/i,
  );
  assert.match(
    docsText,
    /downstream governance derivation, reconstruction, projection, and rule logic remain outside this helper seam because they may call the guard but do not define the canonical shared capability-gating boundary themselves/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, governance semantics, registry semantics, persistence semantics, API behavior, or fail-closed behavior/i,
  );

  assert.match(
    governanceIndexText,
    /function assertSupportedJurisdictionProfileCapability\(\s*jurisdictionProfileKey,\s*capability,\s*\)\s*\{\s*if \(!hasJurisdictionProfileCapability\(jurisdictionProfileKey, capability\)\) \{\s*throw createGovernanceError\(\s*"ERR_UNSUPPORTED_JURISDICTION_PROFILE",\s*"jurisdiction_profile_key is not supported",\s*\{\s*jurisdiction_profile_key: jurisdictionProfileKey,\s*\},\s*\);\s*\}\s*\}/,
  );
  assert.equal(
    (governanceIndexText.match(/function assertSupportedJurisdictionProfileCapability\(/g) || [])
      .length,
    1,
  );
  assert.equal(
    (governanceIndexText.match(/assertSupportedJurisdictionProfileCapability\(/g) || [])
      .length - 1,
    55,
  );

  assert.match(registryText, /function hasJurisdictionProfileCapability\(/);
  assert.match(
    governanceIndexText,
    /function validateProfileInputSnapshot[\s\S]*assertSupportedJurisdictionProfileCapability\(\s*profileInputSnapshot\.jurisdiction_profile_key,\s*"profile_inputs",/,
  );
  assert.match(
    governanceIndexText,
    /function deriveReleaseEvalRun[\s\S]*assertSupportedJurisdictionProfileCapability\(\s*releaseEvalSeed\.jurisdiction_profile_key,\s*"release_eval",/,
  );
  assert.match(
    governanceIndexText,
    /function resolveReleaseEvalProfileDossierProjection[\s\S]*assertSupportedJurisdictionProfileCapability\(\s*releaseEvalRun\.jurisdiction_profile_key,\s*"profile_dossier",/,
  );
  assert.match(
    governanceIndexText,
    /function deriveExportPackage\([\s\S]*assertSupportedJurisdictionProfileCapability\(\s*releaseEvalRun\.jurisdiction_profile_key,\s*"export_package",/,
  );
  assert.match(
    governanceIndexText,
    /function deriveExportPackageJsonArtifact[\s\S]*assertSupportedJurisdictionProfileCapability\(\s*exportPackageSnapshot\.jurisdiction_profile_key,\s*"export_package_json_artifact",/,
  );
  assert.match(
    governanceIndexText,
    /function deriveExportPackageMarkdownArtifact[\s\S]*assertSupportedJurisdictionProfileCapability\(\s*exportPackageSnapshot\.jurisdiction_profile_key,\s*"export_package_markdown_artifact",/,
  );
  assert.match(
    governanceIndexText,
    /function deriveExportPackagePdfArtifact[\s\S]*assertSupportedJurisdictionProfileCapability\(\s*exportPackageSnapshot\.jurisdiction_profile_key,\s*"export_package_pdf_artifact",/,
  );
  assert.match(
    governanceIndexText,
    /function deriveExportPackageDocxArtifact[\s\S]*assertSupportedJurisdictionProfileCapability\(\s*exportPackageSnapshot\.jurisdiction_profile_key,\s*"export_package_docx_artifact",/,
  );
  assert.match(
    governanceIndexText,
    /function deriveExportPackageBundleManifest[\s\S]*assertSupportedJurisdictionProfileCapability\(\s*exportPackageSnapshot\.jurisdiction_profile_key,\s*"export_package_bundle_manifest",/,
  );
  assert.match(
    governanceIndexText,
    /function deriveExportPackageBundleArchiveArtifact[\s\S]*assertSupportedJurisdictionProfileCapability\(\s*bundleManifestSnapshot\.jurisdiction_profile_key,\s*"export_package_bundle_archive_artifact",/,
  );
});
