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

test("docs freeze the shared governance plain-object helper seam as the governance-local object-shape gate boundary", () => {
  assert.match(
    docsText,
    /Shared Governance Plain-Object Helper Seam Freeze/i,
  );
  assert.match(
    docsText,
    /shared `packages\/governance\/src\/index\.js` `assertPlainObject` helper is the canonical governance-local plain-object guard boundary for the current included governance flows below and is now frozen as the baseline seam/i,
  );
  assert.match(
    docsText,
    /the currently evidenced governed surfaces in this freeze are limited to:\s+`profile_input` governance helpers and comparable-profile-input context helpers\s+`release_eval` governance helpers and release-eval-backed `profile_dossier` helpers\s+`export_package` governance helpers, including profile-dossier-backed export-package derivation where applicable\s+`export_package_bundle_manifest` governance helpers and `export_package_bundle_archive_artifact` governance helpers where existing shared artifact-snapshot object guards are already present\s+governance-local dossier, projection, policy, and freshness helpers where existing shared object guards are already present/i,
  );
  assert.match(
    docsText,
    /callers performing governance-local object-shape gating for those included surfaces should go through the shared `assertPlainObject\(value, code, field\)` seam rather than inlining repeated `!value \|\| typeof value !== "object" \|\| Array\.isArray\(value\)` branches inside downstream governance logic/i,
  );
  assert.match(
    docsText,
    /the currently concrete shared behavior already evidenced for this helper seam is limited to:\s+rejecting falsy values\s+rejecting non-object values\s+rejecting arrays\s+throwing `createGovernanceError\(code, `\$\{field\} must be an object`, \{ field \}\)`\s+otherwise returning normally and allowing downstream governance-specific logic to continue/i,
  );
  assert.match(
    docsText,
    /the current bounded reuse already evidenced in `packages\/governance\/src\/index\.js` is limited to 64 current helper call sites spanning profile-input snapshot\/lane derivation, comparable-profile-input context derivation, release-eval\/profile-dossier helpers, export-package derivation, bundle-manifest\/archive helper scaffolding, and governance-local dossier\/projection\/policy\/freshness helpers/i,
  );
  assert.match(
    docsText,
    /the shared `createGovernanceError` helper seam remains outside this helper seam because machine-readable governance error construction is a separate frozen boundary that this guard consumes rather than defines/i,
  );
  assert.match(
    docsText,
    /the shared `assertSupportedJurisdictionProfileCapability` helper seam remains outside this helper seam because runtime supported-capability gating is a separate frozen boundary that may run alongside this guard but is not the same object-shape gate/i,
  );
  assert.match(
    docsText,
    /the shared jurisdiction-profile registry scaffold remains outside this helper seam because jurisdiction\/profile registry metadata and capability source-of-truth ownership live in `packages\/governance\/src\/jurisdiction-profile-registry\.js`, while this guard only validates governance-local object shape/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas` validation-helper scaffold remains outside this helper seam because the separately frozen `packages\/schemas` `assertPlainObject` helper is a different cross-package validation-infrastructure boundary/i,
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
    /the shared `loadAuthorizedCaseContext` helper remains outside this helper seam because auth\/access loading and case-scoped capability gating occur before governance helper selection/i,
  );
  assert.match(
    docsText,
    /the shared database helper seams remain outside this helper seam because persistence\/storage\/normalization\/reconciliation\/reader behavior lives below the governance runtime boundary/i,
  );
  assert.match(
    docsText,
    /the shared governance adapter-dispatch scaffold remains outside this helper seam because jurisdiction-profile adapter routing and governed-surface dispatch are separate runtime boundaries above or beside this shared object-shape guard/i,
  );
  assert.match(
    docsText,
    /downstream governance dispatch, adapter, derivation, reconstruction, projection, and rule logic remain outside this helper seam because they may call the guard but do not define the canonical shared plain-object boundary themselves/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, governance semantics, registry semantics, schema semantics, persistence semantics, API behavior, or fail-closed behavior/i,
  );

  assert.match(
    governanceIndexText,
    /function assertPlainObject\(value, code, field\) \{\s*if \(!value \|\| typeof value !== "object" \|\| Array\.isArray\(value\)\) \{\s*throw createGovernanceError\(code, `\$\{field\} must be an object`, \{ field \}\);\s*\}\s*\}/,
  );
  assert.equal(
    (governanceIndexText.match(/function assertPlainObject\(/g) || []).length,
    1,
  );
  assert.equal(
    (governanceIndexText.match(/assertPlainObject\(/g) || []).length - 1,
    64,
  );

  assert.match(
    governanceIndexText,
    /function deriveSWEBodelningProfileInputLaneSnapshot[\s\S]*assertPlainObject\(\s*input,\s*"ERR_PROFILE_INPUT_INVALID",\s*"input"\s*,?\s*\)/,
  );
  assert.match(
    governanceIndexText,
    /function validateProfileInputSnapshot[\s\S]*assertPlainObject\(\s*profileInputSnapshot,\s*"ERR_PROFILE_INPUT_INVALID",\s*"profileInputSnapshot"\s*,?\s*\)/,
  );
  assert.match(
    governanceIndexText,
    /function deriveComparableProfileInputContextFromLaneSnapshot[\s\S]*assertPlainObject\(\s*laneSnapshot,\s*code,\s*"profile_input_lane_snapshot"\s*,?\s*\)/,
  );
  assert.match(
    governanceIndexText,
    /function deriveReleaseEvalRun[\s\S]*assertPlainObject\(\s*releaseEvalSeed,\s*"ERR_RELEASE_EVAL_RUN_INVALID",\s*"releaseEvalSeed"\s*,?\s*\)/,
  );
  assert.match(
    governanceIndexText,
    /function resolveReleaseEvalProfileDossierProjection[\s\S]*assertPlainObject\(\s*releaseEvalRun,\s*"ERR_RELEASE_EVAL_RUN_INVALID",\s*"releaseEvalRun"\s*,?\s*\)/,
  );
  assert.match(
    governanceIndexText,
    /function deriveExportPackageFromProfileDossierSnapshot[\s\S]*assertPlainObject\(\s*profileDossierSnapshot,\s*"ERR_PROFILE_DOSSIER_SNAPSHOT_INVALID",\s*"profile_dossier_snapshot"\s*,?\s*\)/,
  );
  assert.match(
    governanceIndexText,
    /function deriveExportPackage\([\s\S]*assertPlainObject\(\s*releaseEvalRun,\s*"ERR_RELEASE_EVAL_RUN_INVALID",\s*"releaseEvalRun"\s*,?\s*\)/,
  );
  assert.match(
    governanceIndexText,
    /function deriveSWEBodelningExportPackageBundleManifest[\s\S]*assertPlainObject\(\s*artifactSnapshots,\s*"ERR_EXPORT_PACKAGE_BUNDLE_MANIFEST_INVALID",\s*"artifactSnapshots"\s*,?\s*\)/,
  );
  assert.match(
    governanceIndexText,
    /function deriveSWEBodelningExportPackageBundleArchiveArtifact[\s\S]*assertPlainObject\(\s*artifactSnapshots,\s*"ERR_EXPORT_PACKAGE_BUNDLE_ARCHIVE_INVALID",\s*"artifactSnapshots"\s*,?\s*\)/,
  );
  assert.match(
    governanceIndexText,
    /function resolveExportPackageProjection[\s\S]*assertPlainObject\(\s*exportPackageSnapshot,\s*"ERR_EXPORT_PACKAGE_INVALID",\s*"exportPackageSnapshot"\s*,?\s*\)/,
  );
});
