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
const derivationHelperFreezeTestText = fs.readFileSync(
  path.join(__dirname, "governance-export-package-derivation-helper-doc-freeze.test.js"),
  "utf8",
);
const releaseEvalHelperFreezeTestText = fs.readFileSync(
  path.join(
    __dirname,
    "governance-export-package-release-eval-derivation-helper-doc-freeze.test.js",
  ),
  "utf8",
);
const snapshotStatusHelperFreezeTestText = fs.readFileSync(
  path.join(
    __dirname,
    "governance-export-package-snapshot-status-helper-doc-freeze.test.js",
  ),
  "utf8",
);
const projectionHelperFreezeTestText = fs.readFileSync(
  path.join(__dirname, "governance-export-package-projection-helper-doc-freeze.test.js"),
  "utf8",
);
const broaderAdapterDispatchFreezeTestText = fs.readFileSync(
  path.join(__dirname, "governance-adapter-dispatch-doc-freeze.test.js"),
  "utf8",
);
const canonicalJsonFreezeTestText = fs.readFileSync(
  path.join(__dirname, "governance-canonical-json-helper-doc-freeze.test.js"),
  "utf8",
);
const storedZipFreezeTestText = fs.readFileSync(
  path.join(__dirname, "governance-stored-zip-helper-doc-freeze.test.js"),
  "utf8",
);
const artifactDerivationFreezeTestText = fs.readFileSync(
  path.join(__dirname, "governance-artifact-derivation-doc-freeze.test.js"),
  "utf8",
);
const adapterRegistryTestText = fs.readFileSync(
  path.join(__dirname, "export-package-adapter-registry.test.js"),
  "utf8",
);
const governanceTestText = fs.readFileSync(
  path.join(__dirname, "export-package-governance.test.js"),
  "utf8",
);

function collectLineMatches(text, pattern) {
  const lines = text.split("\n");
  const matches = [];
  for (let index = 0; index < lines.length; index += 1) {
    if (pattern.test(lines[index])) {
      matches.push(index + 1);
    }
  }
  return matches;
}

test("docs freeze the shared governance export-package adapter-dispatch seam as the export-package-specific registry and generic dispatch boundary", () => {
  assert.match(
    docsText,
    /Shared Governance Export Package Adapter-Dispatch Seam Freeze/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/governance\/src\/index\.js` export-package adapter\/dispatch seam formed by `exportPackageAdapterRegistry`, `getExportPackageAdapter`, `deriveExportPackageFromProfileDossierSnapshot`, `deriveExportPackage`, and `resolveExportPackageProjection` is the canonical internal governance-side export-package adapter lookup and generic dispatch boundary for the current included governance flows below and is now frozen as the baseline seam/i,
  );
  assert.match(
    docsText,
    /the currently evidenced governed surfaces in this freeze are limited to:\s+`export_package` adapter lookup keyed by `jurisdiction_profile_key`\s+generic `export_package` derivation dispatch from a `profile_dossier_snapshot`\s+generic `export_package` derivation dispatch from release-eval-backed input\s+generic `export_package` projection dispatch/i,
  );
  assert.match(
    docsText,
    /the currently concrete shared helper responsibilities already evidenced for this seam are limited to:\s+centralizing the explicit export-package adapter entries for `SWE_BODELNING` and `"CMD_PROFILE"` inside the shared registry object\s+returning the current adapter entry or `null` through the shared `getExportPackageAdapter` lookup helper\s+dispatching generic profile-dossier-snapshot-backed export-package derivation through the shared registry with SWE fallback when `jurisdiction_profile_key` is missing\s+dispatching generic release-eval-backed export-package derivation through the shared registry with SWE fallback when `jurisdiction_profile_key` is missing\s+dispatching generic export-package projection resolution through the shared registry with SWE fallback when `jurisdiction_profile_key` is missing/i,
  );
  assert.match(
    docsText,
    /the current relationship to the already-frozen profile-specific export-package derivation seam already evidenced in `packages\/governance\/src\/index\.js` is limited to `sweBodelningExportPackageAdapter` and `cmdExportPackageAdapter` exposing `deriveExportPackageFromProfileDossierSnapshot` slots backed by `deriveSWEBodelningExportPackageFromProfileDossierSnapshot` and `deriveCMDExportPackageFromProfileDossierSnapshot`, while the shared generic dispatcher delegates through those adapter slots instead of reconstructing profile-specific derivation logic itself/i,
  );
  assert.match(
    docsText,
    /the current relationship to the already-frozen export-package release-eval derivation seam already evidenced in `packages\/governance\/src\/index\.js` is limited to the same adapter pair exposing `deriveExportPackage` slots backed by `deriveSWEBodelningExportPackage` and `deriveCMDExportPackage`, while the shared generic dispatcher delegates through those adapter slots instead of reconstructing profile-specific release-eval derivation logic itself/i,
  );
  assert.match(
    docsText,
    /the current relationship to the already-frozen export-package projection-helper seam already evidenced in `packages\/governance\/src\/index\.js` is limited to the same adapter pair exposing `resolveExportPackageProjection` slots backed by `resolveSWEBodelningExportPackageProjection` and `resolveCMDExportPackageProjection`, while the shared generic dispatcher delegates through those adapter slots instead of reconstructing profile-specific projection logic itself/i,
  );
  assert.match(
    docsText,
    /the current relationship to adapter-slot wiring already evidenced in `packages\/governance\/src\/index\.js` is limited to:\s+`sweBodelningExportPackageAdapter` wiring the shared export-package slots to the SWE helper trio\s+`cmdExportPackageAdapter` wiring the shared export-package slots to the CMD helper trio\s+`exportPackageAdapterRegistry` centralizing those two adapter objects under `supportedProfileKey` and `cmdProfileKey`/i,
  );
  assert.match(
    docsText,
    /the current bounded reuse already evidenced in `packages\/governance\/src\/index\.js` is limited to 2 profile-specific adapter object definitions, 1 shared registry definition, 1 shared lookup helper definition, 3 shared generic dispatch helper definitions, and the current named module export surface exposing `deriveExportPackage`, `deriveExportPackageFromProfileDossierSnapshot`, `exportPackageAdapterRegistry`, `getExportPackageAdapter`, and `resolveExportPackageProjection`/i,
  );
  assert.match(
    docsText,
    /the frozen export-package snapshot-status seam remains outside this seam because currentness comparison and `snapshot_status` assembly remain separate lower governance helper responsibilities reached only through the delegated projection-helper seam rather than through this registry\/lookup\/generic-dispatch seam/i,
  );
  assert.match(
    docsText,
    /the frozen broader shared governance adapter-dispatch scaffold remains outside this seam because it owns the wider multi-surface runtime\/governance boundary across profile input, release-eval, export-package, artifact, and bundle surfaces rather than this narrower export-package-specific registry\/lookup\/generic-dispatch sub-seam/i,
  );
  assert.match(
    docsText,
    /the shared governance `toCanonicalJson` helper seam remains outside this seam because canonical JSON serialization is a separate frozen boundary/i,
  );
  assert.match(
    docsText,
    /the shared governance `buildStoredZip` helper seam remains outside this seam because ZIP container assembly is a separate frozen boundary/i,
  );
  assert.match(
    docsText,
    /the shared `createGovernanceError` helper seam remains outside this seam because machine-readable governance error construction is a separate frozen boundary/i,
  );
  assert.match(
    docsText,
    /the shared `assertSupportedJurisdictionProfileCapability` helper seam remains outside this seam because runtime supported-capability gating is a separate frozen boundary even where the generic dispatchers currently consume it on unsupported profile paths/i,
  );
  assert.match(
    docsText,
    /the shared `assertPlainObject` helper seam remains outside this seam because governance-local object-shape gating is a separate frozen boundary even where the generic dispatchers currently consume it before adapter lookup/i,
  );
  assert.match(
    docsText,
    /downstream governance artifact-derivation and route\/runtime behavior remain outside this seam because they may call or route into the shared export-package registry\/lookup\/generic-dispatch seam but do not define that canonical export-package-specific boundary themselves/i,
  );
  assert.match(
    docsText,
    /future governance-side export-package adapter lookup or generic export-package dispatch behavior that needs the same shared registry path should extend this seam instead of bypassing it in profile-specific helpers, artifact helpers, or routes/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, governance semantics, projection semantics, currentness semantics, derivation semantics, schema behavior, or fail-closed behavior/i,
  );

  assert.match(
    governanceIndexText,
    /const exportPackageAdapterRegistry = Object\.freeze\(\{\s*\[supportedProfileKey\]: sweBodelningExportPackageAdapter,\s*\[cmdProfileKey\]: cmdExportPackageAdapter,\s*\}\);/,
  );
  assert.match(
    governanceIndexText,
    /function getExportPackageAdapter\(jurisdictionProfileKey\)\s*\{[\s\S]*return exportPackageAdapterRegistry\[jurisdictionProfileKey\] \?\? null;\s*\}/,
  );
  assert.match(
    governanceIndexText,
    /function deriveExportPackageFromProfileDossierSnapshot\([\s\S]*?profileDossierSnapshot,[\s\S]*?options = \{\},[\s\S]*?\)\s*\{/,
  );
  assert.match(
    governanceIndexText,
    /assertPlainObject\(\s*profileDossierSnapshot,\s*"ERR_PROFILE_DOSSIER_SNAPSHOT_INVALID",\s*"profile_dossier_snapshot",\s*\);/,
  );
  assert.match(
    governanceIndexText,
    /return deriveSWEBodelningExportPackageFromProfileDossierSnapshot\(\s*profileDossierSnapshot,\s*options,\s*\);/,
  );
  assert.match(
    governanceIndexText,
    /const adapter = getExportPackageAdapter\([\s\S]*?profileDossierSnapshot\.jurisdiction_profile_key,[\s\S]*?\);/,
  );
  assert.match(
    governanceIndexText,
    /return adapter\.deriveExportPackageFromProfileDossierSnapshot\(\s*profileDossierSnapshot,\s*options,\s*\);/,
  );
  assert.match(
    governanceIndexText,
    /function deriveExportPackage\(\s*releaseEvalRun,\s*options = \{\}\s*\)/,
  );
  assert.match(
    governanceIndexText,
    /assertPlainObject\(releaseEvalRun, "ERR_RELEASE_EVAL_RUN_INVALID", "releaseEvalRun"\);/,
  );
  assert.match(
    governanceIndexText,
    /return deriveSWEBodelningExportPackage\(releaseEvalRun, options\);/,
  );
  assert.match(
    governanceIndexText,
    /const adapter = getExportPackageAdapter\(releaseEvalRun\.jurisdiction_profile_key\);/,
  );
  assert.match(
    governanceIndexText,
    /return adapter\.deriveExportPackage\(releaseEvalRun, options\);/,
  );
  assert.match(
    governanceIndexText,
    /function resolveExportPackageProjection\([\s\S]*?exportPackageSnapshot,[\s\S]*?currentProfileDossierSnapshot,[\s\S]*?\)\s*\{/,
  );
  assert.match(
    governanceIndexText,
    /assertPlainObject\(\s*exportPackageSnapshot,\s*"ERR_EXPORT_PACKAGE_INVALID",\s*"exportPackageSnapshot",\s*\);/,
  );
  assert.match(
    governanceIndexText,
    /return resolveSWEBodelningExportPackageProjection\(\s*exportPackageSnapshot,\s*currentProfileDossierSnapshot,\s*\);/,
  );
  assert.match(
    governanceIndexText,
    /const adapter = getExportPackageAdapter\([\s\S]*?exportPackageSnapshot\.jurisdiction_profile_key,[\s\S]*?\);/,
  );
  assert.match(
    governanceIndexText,
    /return adapter\.resolveExportPackageProjection\(\s*exportPackageSnapshot,\s*currentProfileDossierSnapshot,\s*\);/,
  );
  assert.match(
    governanceIndexText,
    /deriveExportPackage,\n/,
  );
  assert.match(
    governanceIndexText,
    /deriveExportPackageFromProfileDossierSnapshot,\n/,
  );
  assert.match(
    governanceIndexText,
    /exportPackageAdapterRegistry,\n/,
  );
  assert.match(
    governanceIndexText,
    /getExportPackageAdapter,\n/,
  );
  assert.match(
    governanceIndexText,
    /resolveExportPackageProjection,\n/,
  );

  assert.deepEqual(
    collectLineMatches(governanceIndexText, /\bexportPackageAdapterRegistry\b/),
    [
      1852,
      1865,
      5918,
    ],
  );
  assert.deepEqual(
    collectLineMatches(governanceIndexText, /\bgetExportPackageAdapter\b/),
    [
      1857,
      1888,
      1915,
      4818,
      5932,
    ],
  );
  assert.deepEqual(
    collectLineMatches(governanceIndexText, /\bderiveExportPackageFromProfileDossierSnapshot\b/),
    [
      1838,
      1846,
      1868,
      1899,
      5868,
    ],
  );
  assert.deepEqual(
    collectLineMatches(governanceIndexText, /\bderiveExportPackage\b/),
    [
      1840,
      1848,
      1905,
      1924,
      5866,
    ],
  );
  assert.deepEqual(
    collectLineMatches(governanceIndexText, /\bresolveExportPackageProjection\b/),
    [
      1841,
      1849,
      4798,
      4829,
      6019,
    ],
  );

  assert.match(
    derivationHelperFreezeTestText,
    /Shared Governance Export Package Derivation Helper Seam Freeze/i,
  );
  assert.match(
    releaseEvalHelperFreezeTestText,
    /Shared Governance Export Package Release-Eval Derivation Helper Seam Freeze/i,
  );
  assert.match(
    snapshotStatusHelperFreezeTestText,
    /Shared Governance Export Package Snapshot-Status Helper Seam Freeze/i,
  );
  assert.match(
    projectionHelperFreezeTestText,
    /Shared Governance Export Package Projection Helper Seam Freeze/i,
  );
  assert.match(
    broaderAdapterDispatchFreezeTestText,
    /Shared Governance Adapter-Dispatch Scaffold Freeze/i,
  );
  assert.match(
    canonicalJsonFreezeTestText,
    /Shared Governance Canonical-JSON Helper Seam Freeze/i,
  );
  assert.match(
    storedZipFreezeTestText,
    /Shared Governance Stored-ZIP Helper Seam Freeze/i,
  );
  assert.match(
    artifactDerivationFreezeTestText,
    /Shared Governance Export-Artifact Derivation and Round-Trip Helper Scaffold Freeze/i,
  );

  assert.match(
    adapterRegistryTestText,
    /the adapter\/dispatch registry exposes the explicit CMD_PROFILE export-package adapter entry/i,
  );
  assert.match(
    adapterRegistryTestText,
    /const expectedViaRegistry = deriveExportPackageFromProfileDossierSnapshot\(/,
  );
  assert.match(
    adapterRegistryTestText,
    /const expectedViaRunRegistry = deriveExportPackage\(releaseEvalRun,/,
  );
  assert.match(
    adapterRegistryTestText,
    /const expectedViaRegistry = resolveExportPackageProjection\(/,
  );
  assert.match(
    adapterRegistryTestText,
    /adapter\.resolveExportPackageProjection\(/,
  );
  assert.match(
    adapterRegistryTestText,
    /export-package adapter\\\/dispatch scaffold/i,
  );
  assert.match(
    governanceTestText,
    /deriveSWEBodelningExportPackage,/,
  );
  assert.match(
    governanceTestText,
    /resolveSWEBodelningExportPackageProjection,/,
  );
});
