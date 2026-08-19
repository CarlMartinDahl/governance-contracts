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
const exportPackageAdapterDispatchFreezeTestText = fs.readFileSync(
  path.join(__dirname, "governance-export-package-adapter-dispatch-doc-freeze.test.js"),
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
  path.join(__dirname, "export-package-bundle-manifest-adapter-registry.test.js"),
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

test("docs freeze the shared governance export-package bundle/package manifest adapter-dispatch seam as the manifest-specific registry and generic dispatch boundary", () => {
  assert.match(
    docsText,
    /Shared Governance Export Package Bundle\/Package Manifest Adapter-Dispatch Seam Freeze/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/governance\/src\/index\.js` bundle\/package manifest adapter\/dispatch seam formed by `exportPackageBundleManifestAdapterRegistry`, `getExportPackageBundleManifestAdapter`, `deriveExportPackageBundleManifest`, and `resolveExportPackageBundleManifestProjection` is the canonical internal governance-side export-package bundle\/package manifest adapter lookup and generic dispatch boundary for the current included governance flows below and is now frozen as the baseline seam/i,
  );
  assert.match(
    docsText,
    /the currently evidenced governed surfaces in this freeze are limited to:\s+`export_package_bundle_manifest` adapter lookup keyed by `jurisdiction_profile_key`\s+generic `export_package_bundle_manifest` derivation dispatch from canonical export-package snapshots plus the corresponding artifact snapshot set\s+generic `export_package_bundle_manifest` projection dispatch/i,
  );
  assert.match(
    docsText,
    /the currently concrete shared helper responsibilities already evidenced for this seam are limited to:\s+centralizing the explicit bundle\/package manifest adapter entries for `SWE_BODELNING` and `"CMD_PROFILE"` inside the shared registry object\s+returning the current adapter entry or `null` through the shared `getExportPackageBundleManifestAdapter` lookup helper\s+dispatching generic bundle\/package manifest derivation through the shared registry when a non-empty `jurisdiction_profile_key` is present and otherwise through the current default-adapter path backed by `Object\.values\(exportPackageBundleManifestAdapterRegistry\)\[0\]`\s+dispatching generic bundle\/package manifest projection resolution through the current shared adapter-resolution path and then through the resolved adapter or the same current default-adapter path/i,
  );
  assert.match(
    docsText,
    /the current relationship to profile-specific adapter-slot wiring already evidenced in `packages\/governance\/src\/index\.js` is limited to:\s+`sweBodelningExportPackageBundleManifestAdapter` wiring `deriveExportPackageBundleManifest` and `resolveExportPackageBundleManifestProjection` to the SWE helper pair\s+`cmdExportPackageBundleManifestAdapter` wiring `deriveExportPackageBundleManifest` and `resolveExportPackageBundleManifestProjection` to the CMD helper pair\s+`exportPackageBundleManifestAdapterRegistry` centralizing those two adapter objects under `supportedProfileKey` and `cmdProfileKey`/i,
  );
  assert.match(
    docsText,
    /the current relationship to the already-frozen broader bundle\/package manifest derivation and projection helper scaffold already evidenced in `packages\/governance\/src\/index\.js` is limited to the shared generic seam delegating through those profile-specific adapter slots instead of reconstructing deterministic manifest assembly, artifact matching, `snapshot_status` derivation, or lower projection logic itself/i,
  );
  assert.match(
    docsText,
    /the nearby `resolveExportPackageBundleManifestAdapter` helper remains an internal implementation detail within this seam because current repo evidence limits it to 1 internal generic-dispatch call site and does not show it as a separately frozen shared boundary/i,
  );
  assert.match(
    docsText,
    /the current bounded reuse already evidenced in `packages\/governance\/src\/index\.js` is limited to 2 profile-specific adapter object definitions, 1 shared registry definition, 1 shared lookup helper definition, 2 shared generic dispatch helper definitions, 1 internal adapter-resolution helper implementation detail supporting 1 of those dispatchers, and the current named module export surface exposing `deriveExportPackageBundleManifest`, `exportPackageBundleManifestAdapterRegistry`, `getExportPackageBundleManifestAdapter`, and `resolveExportPackageBundleManifestProjection`/i,
  );
  assert.match(
    docsText,
    /the frozen broader governance bundle\/package manifest derivation and projection helper scaffold remains outside this seam because it owns deterministic manifest assembly, artifact-to-export-package matching, projection\/currentness behavior, and lower projection validation beyond this narrower registry\/lookup\/generic-dispatch sub-seam/i,
  );
  assert.match(
    docsText,
    /the frozen broader governance export-artifact derivation and round-trip helper scaffold remains outside this seam because it owns the wider cross-artifact derivation \/ round-trip boundary beyond this narrower bundle\/package manifest-specific registry\/lookup\/generic-dispatch sub-seam/i,
  );
  assert.match(
    docsText,
    /the frozen broader shared governance adapter-dispatch scaffold remains outside this seam because it owns the wider multi-surface runtime\/governance boundary across profile input, release-eval, export-package, artifact, and bundle surfaces rather than this narrower bundle\/package manifest-specific registry\/lookup\/generic-dispatch sub-seam/i,
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
    /the shared `assertSupportedJurisdictionProfileCapability` helper seam remains outside this seam because runtime supported-capability gating is a separate frozen boundary even where the generic dispatchers or delegated helper paths currently consume it/i,
  );
  assert.match(
    docsText,
    /the shared `assertPlainObject` helper seam remains outside this seam because governance-local object-shape gating is a separate frozen boundary even where delegated helper paths currently consume it/i,
  );
  assert.match(
    docsText,
    /downstream governance dispatch, adapter consumers, artifact-derivation, persistence, and route\/runtime behavior remain outside this seam because they may call or route into the shared bundle\/package manifest registry\/lookup\/generic-dispatch seam but do not define that canonical bundle\/package manifest-specific boundary themselves/i,
  );
  assert.match(
    docsText,
    /future governance-side bundle\/package manifest adapter lookup or generic bundle\/package manifest dispatch behavior that needs the same shared registry path should extend this seam instead of bypassing it in profile-specific helpers, broader manifest scaffolds, bundle\/archive helpers, or routes/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, governance semantics, projection semantics, derivation semantics, schema behavior, or fail-closed behavior/i,
  );

  assert.match(
    governanceIndexText,
    /const exportPackageBundleManifestAdapterRegistry = Object\.freeze\(\{\s*\[supportedProfileKey\]: sweBodelningExportPackageBundleManifestAdapter,\s*\[cmdProfileKey\]: cmdExportPackageBundleManifestAdapter,\s*\}\);/,
  );
  assert.match(
    governanceIndexText,
    /function getExportPackageBundleManifestAdapter\(jurisdictionProfileKey\)\s*\{[\s\S]*return exportPackageBundleManifestAdapterRegistry\[jurisdictionProfileKey\] \?\? null;\s*\}/,
  );
  assert.match(
    governanceIndexText,
    /function deriveExportPackageBundleManifest\(\s*exportPackageSnapshot,\s*artifactSnapshots,\s*options = \{\},\s*\)\s*\{/,
  );
  assert.match(
    governanceIndexText,
    /const adapter = getExportPackageBundleManifestAdapter\([\s\S]*exportPackageSnapshot\.jurisdiction_profile_key,[\s\S]*?\);/,
  );
  assert.match(
    governanceIndexText,
    /assertSupportedJurisdictionProfileCapability\([\s\S]*exportPackageSnapshot\.jurisdiction_profile_key,[\s\S]*"export_package_bundle_manifest"[\s\S]*?\);/,
  );
  assert.match(
    governanceIndexText,
    /return adapter\.deriveExportPackageBundleManifest\([\s\S]*exportPackageSnapshot,[\s\S]*artifactSnapshots,[\s\S]*options,[\s\S]*\);/,
  );
  assert.match(
    governanceIndexText,
    /const defaultAdapter = Object\.values\(exportPackageBundleManifestAdapterRegistry\)\[0\];/,
  );
  assert.match(
    governanceIndexText,
    /return defaultAdapter\.deriveExportPackageBundleManifest\([\s\S]*exportPackageSnapshot,[\s\S]*artifactSnapshots,[\s\S]*options,[\s\S]*\);/,
  );
  assert.match(
    governanceIndexText,
    /function resolveExportPackageBundleManifestAdapter\(\s*exportPackageBundleManifestSnapshot,\s*currentExportPackageSnapshot,\s*\)\s*\{/,
  );
  assert.match(
    governanceIndexText,
    /const manifestAdapter = getExportPackageBundleManifestAdapter\([\s\S]*exportPackageBundleManifestSnapshot\.jurisdiction_profile_key,[\s\S]*?\);/,
  );
  assert.match(
    governanceIndexText,
    /const currentExportPackageAdapter = getExportPackageBundleManifestAdapter\([\s\S]*currentExportPackageSnapshot\.jurisdiction_profile_key,[\s\S]*?\);/,
  );
  assert.match(governanceIndexText, /return null;\s*\}/);
  assert.match(
    governanceIndexText,
    /function resolveExportPackageBundleManifestProjection\(\s*exportPackageBundleManifestSnapshot,\s*currentExportPackageSnapshot,\s*currentArtifactSnapshots,\s*\)\s*\{/,
  );
  assert.match(
    governanceIndexText,
    /const adapter = resolveExportPackageBundleManifestAdapter\([\s\S]*exportPackageBundleManifestSnapshot,[\s\S]*currentExportPackageSnapshot,[\s\S]*?\);/,
  );
  assert.match(
    governanceIndexText,
    /return adapter\.resolveExportPackageBundleManifestProjection\([\s\S]*exportPackageBundleManifestSnapshot,[\s\S]*currentExportPackageSnapshot,[\s\S]*currentArtifactSnapshots,[\s\S]*\);/,
  );
  assert.match(
    governanceIndexText,
    /assertSupportedJurisdictionProfileCapability\([\s\S]*jurisdictionProfileKey,[\s\S]*"export_package_bundle_manifest"[\s\S]*?\);/,
  );
  assert.match(
    governanceIndexText,
    /return defaultAdapter\.resolveExportPackageBundleManifestProjection\([\s\S]*exportPackageBundleManifestSnapshot,[\s\S]*currentExportPackageSnapshot,[\s\S]*currentArtifactSnapshots,[\s\S]*\);/,
  );
  assert.match(governanceIndexText, /deriveExportPackageBundleManifest,\n/);
  assert.match(governanceIndexText, /exportPackageBundleManifestAdapterRegistry,\n/);
  assert.match(governanceIndexText, /getExportPackageBundleManifestAdapter,\n/);
  assert.match(governanceIndexText, /resolveExportPackageBundleManifestProjection,\n/);
  assert.doesNotMatch(
    governanceIndexText,
    /\n\s*resolveExportPackageBundleManifestAdapter,\n/,
  );

  assert.deepEqual(
    collectLineMatches(governanceIndexText, /\bexportPackageBundleManifestAdapterRegistry\b/),
    [
      3133,
      3146,
      3179,
      4738,
      5920,
    ],
  );
  assert.deepEqual(
    collectLineMatches(governanceIndexText, /\bgetExportPackageBundleManifestAdapter\b/),
    [
      3138,
      3161,
      4666,
      4682,
      5934,
    ],
  );
  assert.deepEqual(
    collectLineMatches(governanceIndexText, /\bderiveExportPackageBundleManifest\b/),
    [
      3031,
      3128,
      3149,
      3172,
      3180,
      5867,
    ],
  );
  assert.deepEqual(
    collectLineMatches(governanceIndexText, /\bresolveExportPackageBundleManifestProjection\b/),
    [
      3032,
      3129,
      4694,
      4705,
      4739,
      6015,
    ],
  );
  assert.deepEqual(
    collectLineMatches(governanceIndexText, /\bresolveExportPackageBundleManifestAdapter\b/),
    [4655, 4699],
  );

  assert.match(
    exportPackageAdapterDispatchFreezeTestText,
    /Shared Governance Export Package Adapter-Dispatch Seam Freeze/i,
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
    artifactDerivationFreezeTestText,
    /docs freeze the shared governance bundle\/package manifest derivation and projection helper scaffold/i,
  );

  assert.match(
    adapterRegistryTestText,
    /the generic bundle\/package manifest adapter registry exposes the explicit CMD_PROFILE entry/i,
  );
  assert.match(
    adapterRegistryTestText,
    /const expectedViaRegistry = deriveExportPackageBundleManifest\(/,
  );
  assert.match(
    adapterRegistryTestText,
    /const expectedViaRegistry = resolveExportPackageBundleManifestProjection\(/,
  );
  assert.match(
    adapterRegistryTestText,
    /const bundleManifestSnapshot = adapter\.deriveExportPackageBundleManifest\(/,
  );
  assert.match(
    adapterRegistryTestText,
    /adapter\.resolveExportPackageBundleManifestProjection\(/,
  );
});
