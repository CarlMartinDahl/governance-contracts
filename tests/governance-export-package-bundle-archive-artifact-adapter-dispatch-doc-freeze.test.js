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
const bundleManifestAdapterDispatchFreezeTestText = fs.readFileSync(
  path.join(
    __dirname,
    "governance-export-package-bundle-manifest-adapter-dispatch-doc-freeze.test.js",
  ),
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
  path.join(__dirname, "export-package-bundle-archive-artifact-adapter-registry.test.js"),
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

test("docs freeze the shared governance export-package bundle/archive artifact adapter-dispatch seam as the final-archive registry and generic dispatch boundary", () => {
  assert.match(
    docsText,
    /Shared Governance Export Package Bundle\/Archive Artifact Adapter-Dispatch Seam Freeze/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/governance\/src\/index\.js` bundle\/archive artifact adapter\/dispatch seam formed by `exportPackageBundleArchiveArtifactAdapterRegistry`, `getExportPackageBundleArchiveArtifactAdapter`, `deriveExportPackageBundleArchiveArtifact`, and `resolveExportPackageBundleArchiveArtifactProjection` is the canonical internal governance-side export-package bundle\/archive artifact adapter lookup and generic dispatch boundary for the current included governance flows below and is now frozen as the baseline seam/i,
  );
  assert.match(
    docsText,
    /the currently evidenced governed surfaces in this freeze are limited to:\s+`export_package_bundle_archive_artifact` adapter lookup keyed by `jurisdiction_profile_key`\s+generic `export_package_bundle_archive_artifact` derivation dispatch from canonical bundle\/package manifest snapshots plus the corresponding artifact snapshot set\s+generic `export_package_bundle_archive_artifact` projection dispatch/i,
  );
  assert.match(
    docsText,
    /the currently concrete shared helper responsibilities already evidenced for this seam are limited to:\s+centralizing the explicit bundle\/archive artifact adapter entries for `SWE_BODELNING` and `"CMD_PROFILE"` inside the shared registry object\s+returning the current adapter entry or `null` through the shared `getExportPackageBundleArchiveArtifactAdapter` lookup helper\s+dispatching generic bundle\/archive artifact derivation through the shared registry when a non-empty `jurisdiction_profile_key` is present and otherwise through the current default-adapter path backed by `Object\.values\(exportPackageBundleArchiveArtifactAdapterRegistry\)\[0\]`\s+dispatching generic bundle\/archive artifact projection resolution through the current shared adapter-resolution path and then through the resolved adapter or the same current default-adapter path/i,
  );
  assert.match(
    docsText,
    /the current relationship to profile-specific adapter-slot wiring already evidenced in `packages\/governance\/src\/index\.js` is limited to:\s+`sweBodelningExportPackageBundleArchiveArtifactAdapter` wiring `deriveExportPackageBundleArchiveArtifact` and `resolveExportPackageBundleArchiveArtifactProjection` to the SWE helper pair\s+`cmdExportPackageBundleArchiveArtifactAdapter` wiring `deriveExportPackageBundleArchiveArtifact` and `resolveExportPackageBundleArchiveArtifactProjection` to the CMD helper pair\s+`exportPackageBundleArchiveArtifactAdapterRegistry` centralizing those two adapter objects under `supportedProfileKey` and `cmdProfileKey`/i,
  );
  assert.match(
    docsText,
    /the current relationship to the already-frozen broader final bundle\/archive artifact derivation and projection helper scaffold already evidenced in `packages\/governance\/src\/index\.js` is limited to the shared generic seam delegating through those profile-specific adapter slots instead of reconstructing deterministic final archive assembly, ZIP container generation, artifact-to-manifest matching, `snapshot_status` derivation, or lower projection logic itself/i,
  );
  assert.match(
    docsText,
    /the nearby `resolveExportPackageBundleArchiveArtifactAdapter` helper remains an internal implementation detail within this seam because current repo evidence limits it to 1 internal generic-dispatch call site and does not show it as a separately frozen shared boundary/i,
  );
  assert.match(
    docsText,
    /the current bounded reuse already evidenced in `packages\/governance\/src\/index\.js` is limited to 2 profile-specific adapter object definitions, 1 shared registry definition, 1 shared lookup helper definition, 2 shared generic dispatch helper definitions, 1 internal adapter-resolution helper implementation detail supporting 1 of those dispatchers, and the current named module export surface exposing `deriveExportPackageBundleArchiveArtifact`, `exportPackageBundleArchiveArtifactAdapterRegistry`, `getExportPackageBundleArchiveArtifactAdapter`, and `resolveExportPackageBundleArchiveArtifactProjection`/i,
  );
  assert.match(
    docsText,
    /the frozen broader governance final bundle\/archive artifact derivation and projection helper scaffold remains outside this seam because it owns deterministic archive assembly, artifact-to-manifest matching, projection\/currentness behavior, and lower projection validation beyond this narrower registry\/lookup\/generic-dispatch sub-seam/i,
  );
  assert.match(
    docsText,
    /the frozen governance bundle\/package manifest derivation and projection helper scaffold remains outside this seam because the generic final bundle\/archive adapter path consumes bundle\/package manifest snapshots and projections but does not define manifest derivation or projection behavior itself/i,
  );
  assert.match(
    docsText,
    /the frozen broader governance export-artifact derivation and round-trip helper scaffold remains outside this seam because it owns the wider cross-artifact derivation \/ round-trip boundary beyond this narrower bundle\/archive artifact-specific registry\/lookup\/generic-dispatch sub-seam/i,
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
    /downstream governance dispatch, adapter consumers, artifact-derivation, persistence, and route\/runtime behavior remain outside this seam because they may call or route into the shared bundle\/archive artifact registry\/lookup\/generic-dispatch seam but do not define that canonical bundle\/archive artifact-specific boundary themselves/i,
  );
  assert.match(
    docsText,
    /future governance-side bundle\/archive artifact adapter lookup or generic bundle\/archive artifact dispatch behavior that needs the same shared registry path should extend this seam instead of bypassing it in profile-specific helpers, broader final bundle\/archive scaffolds, bundle\/package manifest helpers, or routes/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, governance semantics, projection semantics, derivation semantics, schema behavior, or fail-closed behavior/i,
  );

  assert.match(
    governanceIndexText,
    /const exportPackageBundleArchiveArtifactAdapterRegistry = Object\.freeze\(\{\s*\[supportedProfileKey\]: sweBodelningExportPackageBundleArchiveArtifactAdapter,\s*\[cmdProfileKey\]: cmdExportPackageBundleArchiveArtifactAdapter,\s*\}\);/,
  );
  assert.match(
    governanceIndexText,
    /function getExportPackageBundleArchiveArtifactAdapter\(jurisdictionProfileKey\)\s*\{[\s\S]*return\s*\(\s*exportPackageBundleArchiveArtifactAdapterRegistry\[jurisdictionProfileKey\] \?\? null\s*\);[\s\S]*\}/,
  );
  assert.match(
    governanceIndexText,
    /function deriveExportPackageBundleArchiveArtifact\(\s*bundleManifestSnapshot,\s*artifactSnapshots,\s*\)\s*\{/,
  );
  assert.match(
    governanceIndexText,
    /const adapter = getExportPackageBundleArchiveArtifactAdapter\([\s\S]*bundleManifestSnapshot\.jurisdiction_profile_key,[\s\S]*?\);/,
  );
  assert.match(
    governanceIndexText,
    /assertSupportedJurisdictionProfileCapability\([\s\S]*bundleManifestSnapshot\.jurisdiction_profile_key,[\s\S]*"export_package_bundle_archive_artifact"[\s\S]*?\);/,
  );
  assert.match(
    governanceIndexText,
    /return adapter\.deriveExportPackageBundleArchiveArtifact\([\s\S]*bundleManifestSnapshot,[\s\S]*artifactSnapshots,[\s\S]*\);/,
  );
  assert.match(
    governanceIndexText,
    /const defaultAdapter = Object\.values\(exportPackageBundleArchiveArtifactAdapterRegistry\)\[0\];/,
  );
  assert.match(
    governanceIndexText,
    /return defaultAdapter\.deriveExportPackageBundleArchiveArtifact\([\s\S]*bundleManifestSnapshot,[\s\S]*artifactSnapshots,[\s\S]*\);/,
  );
  assert.match(
    governanceIndexText,
    /function resolveExportPackageBundleArchiveArtifactAdapter\(\s*exportPackageBundleArchiveArtifactSnapshot,\s*currentBundleManifestProjection,\s*\)\s*\{/,
  );
  assert.match(
    governanceIndexText,
    /const currentBundleManifestAdapter = getExportPackageBundleArchiveArtifactAdapter\([\s\S]*currentBundleManifestProjection\.jurisdiction_profile_key,[\s\S]*?\);/,
  );
  assert.match(governanceIndexText, /return null;\s*\}/);
  assert.match(
    governanceIndexText,
    /function resolveExportPackageBundleArchiveArtifactProjection\(\s*exportPackageBundleArchiveArtifactSnapshot,\s*currentBundleManifestProjection,\s*\)\s*\{/,
  );
  assert.match(
    governanceIndexText,
    /const adapter = resolveExportPackageBundleArchiveArtifactAdapter\([\s\S]*exportPackageBundleArchiveArtifactSnapshot,[\s\S]*currentBundleManifestProjection,[\s\S]*?\);/,
  );
  assert.match(
    governanceIndexText,
    /return adapter\.resolveExportPackageBundleArchiveArtifactProjection\([\s\S]*exportPackageBundleArchiveArtifactSnapshot,[\s\S]*currentBundleManifestProjection,[\s\S]*\);/,
  );
  assert.match(
    governanceIndexText,
    /assertSupportedJurisdictionProfileCapability\([\s\S]*currentJurisdictionProfileKey,[\s\S]*"export_package_bundle_archive_artifact"[\s\S]*?\);/,
  );
  assert.match(
    governanceIndexText,
    /return defaultAdapter\.resolveExportPackageBundleArchiveArtifactProjection\([\s\S]*exportPackageBundleArchiveArtifactSnapshot,[\s\S]*currentBundleManifestProjection,[\s\S]*\);/,
  );
  assert.match(governanceIndexText, /deriveExportPackageBundleArchiveArtifact,\n/);
  assert.match(governanceIndexText, /exportPackageBundleArchiveArtifactAdapterRegistry,\n/);
  assert.match(governanceIndexText, /getExportPackageBundleArchiveArtifactAdapter,\n/);
  assert.match(governanceIndexText, /resolveExportPackageBundleArchiveArtifactProjection,\n/);
  assert.doesNotMatch(
    governanceIndexText,
    /\n\s*resolveExportPackageBundleArchiveArtifactAdapter,\n/,
  );

  assert.deepEqual(
    collectLineMatches(
      governanceIndexText,
      /\bexportPackageBundleArchiveArtifactAdapterRegistry\b/,
    ),
    [
      3709,
      3723,
      3755,
      3817,
      5919,
    ],
  );
  assert.deepEqual(
    collectLineMatches(
      governanceIndexText,
      /\bgetExportPackageBundleArchiveArtifactAdapter\b/,
    ),
    [
      3714,
      3738,
      3773,
      5933,
    ],
  );
  assert.deepEqual(
    collectLineMatches(governanceIndexText, /\bderiveExportPackageBundleArchiveArtifact\b/),
    [
      3525,
      3703,
      3727,
      3749,
      3756,
      5873,
    ],
  );
  assert.deepEqual(
    collectLineMatches(
      governanceIndexText,
      /\bresolveExportPackageBundleArchiveArtifactProjection\b/,
    ),
    [
      3527,
      3705,
      3785,
      3795,
      3818,
      5987,
    ],
  );
  assert.deepEqual(
    collectLineMatches(
      governanceIndexText,
      /\bresolveExportPackageBundleArchiveArtifactAdapter\b/,
    ),
    [3762, 3789],
  );

  assert.match(
    bundleManifestAdapterDispatchFreezeTestText,
    /docs freeze the shared governance export-package bundle\/package manifest adapter-dispatch seam/i,
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
    /docs freeze the shared governance final bundle\/archive artifact derivation and projection helper scaffold/i,
  );

  assert.match(
    adapterRegistryTestText,
    /the generic final bundle\/archive artifact adapter registry exposes the explicit CMD_PROFILE entry/i,
  );
  assert.match(
    adapterRegistryTestText,
    /const expectedViaRegistry = deriveExportPackageBundleArchiveArtifact\(/,
  );
  assert.match(
    adapterRegistryTestText,
    /const expectedViaRegistry = resolveExportPackageBundleArchiveArtifactProjection\(/,
  );
  assert.match(
    adapterRegistryTestText,
    /const expectedDirect = adapter\.deriveExportPackageBundleArchiveArtifact\(/,
  );
  assert.match(
    adapterRegistryTestText,
    /const expectedProjectionDirect = adapter\.resolveExportPackageBundleArchiveArtifactProjection\(/,
  );
});
