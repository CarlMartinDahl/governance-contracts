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
const jsonProjectionHelperFreezeTestText = fs.readFileSync(
  path.join(__dirname, "governance-json-artifact-projection-helper-doc-freeze.test.js"),
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
const schemasJsonProjectionValidatorFreezeTestText = fs.readFileSync(
  path.join(__dirname, "schemas-json-artifact-projection-validator-doc-freeze.test.js"),
  "utf8",
);
const schemasJsonValidatorFreezeTestText = fs.readFileSync(
  path.join(__dirname, "schemas-json-artifact-validator-doc-freeze.test.js"),
  "utf8",
);
const adapterRegistryTestText = fs.readFileSync(
  path.join(__dirname, "export-package-json-artifact-adapter-registry.test.js"),
  "utf8",
);
const projectionTestText = fs.readFileSync(
  path.join(__dirname, "export-package-json-artifact-projection.test.js"),
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

test("docs freeze the shared governance export-package JSON artifact adapter-dispatch seam as the JSON artifact-specific registry and generic dispatch boundary", () => {
  assert.match(
    docsText,
    /Shared Governance Export Package JSON Artifact Adapter-Dispatch Seam Freeze/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/governance\/src\/index\.js` JSON artifact adapter\/dispatch seam formed by `exportPackageJsonArtifactAdapterRegistry`, `getExportPackageJsonArtifactAdapter`, `deriveExportPackageJsonArtifact`, `deriveExportPackageFromJsonArtifact`, and `resolveExportPackageJsonArtifactProjection` is the canonical internal governance-side export-package JSON artifact adapter lookup and generic dispatch boundary for the current included governance flows below and is now frozen as the baseline seam/i,
  );
  assert.match(
    docsText,
    /the currently evidenced governed surfaces in this freeze are limited to:\s+`export_package_json_artifact` adapter lookup keyed by `jurisdiction_profile_key`\s+generic `export_package_json_artifact` derivation dispatch from canonical export-package snapshots\s+generic export-package reconstruction dispatch from persisted `export_package_json_artifact` snapshots\s+generic `export_package_json_artifact` projection dispatch/i,
  );
  assert.match(
    docsText,
    /the currently concrete shared helper responsibilities already evidenced for this seam are limited to:\s+centralizing the explicit JSON artifact adapter entries for `SWE_BODELNING` and `"CMD_PROFILE"` inside the shared registry object\s+returning the current adapter entry or `null` through the shared `getExportPackageJsonArtifactAdapter` lookup helper\s+dispatching generic JSON artifact derivation through the shared registry when a non-empty `jurisdiction_profile_key` is present and otherwise through the current default-adapter path backed by `Object\.values\(exportPackageJsonArtifactAdapterRegistry\)\[0\]`\s+dispatching generic export-package reconstruction from persisted JSON artifacts through the current shared adapter-resolution path and then through the resolved adapter or the same current default-adapter path\s+dispatching generic JSON artifact projection resolution through the current shared adapter-resolution path and then through the resolved adapter or the same current default-adapter path/i,
  );
  assert.match(
    docsText,
    /the current relationship to the already-frozen profile-specific JSON artifact projection-helper seam already evidenced in `packages\/governance\/src\/index\.js` is limited to `sweBodelningExportPackageJsonArtifactAdapter` and `cmdExportPackageJsonArtifactAdapter` exposing `resolveExportPackageJsonArtifactProjection` slots backed by `resolveSWEBodelningExportPackageJsonArtifactProjection` and `resolveCMDExportPackageJsonArtifactProjection`, while the shared generic dispatcher delegates through those adapter slots instead of reconstructing profile-specific projection logic itself/i,
  );
  assert.match(
    docsText,
    /the current relationship to the lower schemas JSON artifact projection-validator seam already evidenced in `packages\/governance\/src\/index\.js` is limited to the shared generic JSON artifact projection dispatcher reaching that lower seam only through the already-frozen profile-specific JSON artifact projection-helper pair rather than calling `validateSWEBodelningExportPackageJsonArtifactProjection` or `validateCMDExportPackageJsonArtifactProjection` directly/i,
  );
  assert.match(
    docsText,
    /the current relationship to the lower schemas JSON artifact validator seam already evidenced in `packages\/governance\/src\/index\.js` is limited to the shared generic JSON artifact derivation, reconstruction, and projection dispatchers reaching that lower seam only through the existing profile-specific JSON artifact derivation \/ round-trip \/ projection helpers rather than calling `validateSWEBodelningExportPackageJsonArtifact` or `validateCMDExportPackageJsonArtifact` directly/i,
  );
  assert.match(
    docsText,
    /the current relationship to adapter-slot wiring already evidenced in `packages\/governance\/src\/index\.js` is limited to:\s+`sweBodelningExportPackageJsonArtifactAdapter` wiring the shared JSON artifact slots to the SWE helper trio\s+`cmdExportPackageJsonArtifactAdapter` wiring the shared JSON artifact slots to the CMD helper trio\s+`exportPackageJsonArtifactAdapterRegistry` centralizing those two adapter objects under `supportedProfileKey` and `cmdProfileKey`/i,
  );
  assert.match(
    docsText,
    /the nearby `resolveExportPackageJsonArtifactAdapter` helper remains an internal implementation detail within this seam because current repo evidence limits it to 2 internal generic-dispatch call sites and does not show it as a separately frozen shared boundary/i,
  );
  assert.match(
    docsText,
    /the current bounded reuse already evidenced in `packages\/governance\/src\/index\.js` is limited to 2 profile-specific adapter object definitions, 1 shared registry definition, 1 shared lookup helper definition, 3 shared generic dispatch helper definitions, 1 internal adapter-resolution helper implementation detail supporting 2 of those dispatchers, and the current named module export surface exposing `deriveExportPackageFromJsonArtifact`, `deriveExportPackageJsonArtifact`, `exportPackageJsonArtifactAdapterRegistry`, `getExportPackageJsonArtifactAdapter`, and `resolveExportPackageJsonArtifactProjection`/i,
  );
  assert.match(
    docsText,
    /the lower schemas JSON artifact projection-validator seam remains outside this seam because schema-side projection validation, `snapshot_status` object enforcement, and normalized projection-shape guarantees are separate lower-boundary responsibilities consumed only through the delegated profile-specific projection-helper pair rather than defined by this generic adapter\/dispatch seam/i,
  );
  assert.match(
    docsText,
    /the lower schemas JSON artifact validator seam remains outside this seam because lower artifact-envelope validation, canonical export-package revalidation, filename equality, and canonical JSON equality\/normalization are separate lower-boundary responsibilities consumed only through the delegated profile-specific JSON helper paths rather than defined by this generic adapter\/dispatch seam/i,
  );
  assert.match(
    docsText,
    /the frozen profile-specific JSON artifact projection-helper seam remains outside this seam because governance-side JSON artifact projection assembly and projection-level `snapshot_status` derivation remain separate lower helper responsibilities even where the shared generic projection dispatcher currently delegates to it/i,
  );
  assert.match(
    docsText,
    /the frozen broader governance JSON export-artifact derivation and round-trip helper scaffold remains outside this seam because it owns the wider JSON derivation, round-trip reconstruction, and JSON artifact snapshot-status area beyond this narrower registry\/lookup\/generic-dispatch sub-seam/i,
  );
  assert.match(
    docsText,
    /the frozen broader shared governance adapter-dispatch scaffold remains outside this seam because it owns the wider multi-surface runtime\/governance boundary across profile input, release-eval, export-package, artifact, and bundle surfaces rather than this narrower JSON artifact-specific registry\/lookup\/generic-dispatch sub-seam/i,
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
    /the shared `assertSupportedJurisdictionProfileCapability` helper seam remains outside this seam because runtime supported-capability gating is a separate frozen boundary even where the generic dispatchers currently consume it on unresolved or unsupported profile paths/i,
  );
  assert.match(
    docsText,
    /the shared `assertPlainObject` helper seam remains outside this seam because governance-local object-shape gating is a separate frozen boundary even where downstream delegated helpers may consume it/i,
  );
  assert.match(
    docsText,
    /downstream governance dispatch, adapter consumers, artifact-derivation, and route\/runtime behavior remain outside this seam because they may call or route into the shared JSON artifact registry\/lookup\/generic-dispatch seam but do not define that canonical JSON artifact-specific boundary themselves/i,
  );
  assert.match(
    docsText,
    /future governance-side JSON artifact adapter lookup or generic JSON artifact dispatch behavior that needs the same shared registry path should extend this seam instead of bypassing it in profile-specific helpers, broader artifact helpers, or routes/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, governance semantics, projection semantics, derivation semantics, reconstruction semantics, schema behavior, or fail-closed behavior/i,
  );

  assert.match(
    governanceIndexText,
    /const exportPackageJsonArtifactAdapterRegistry = Object\.freeze\(\{\s*\[supportedProfileKey\]: sweBodelningExportPackageJsonArtifactAdapter,\s*\[cmdProfileKey\]: cmdExportPackageJsonArtifactAdapter,\s*\}\);/,
  );
  assert.match(
    governanceIndexText,
    /function getExportPackageJsonArtifactAdapter\(jurisdictionProfileKey\)\s*\{[\s\S]*return exportPackageJsonArtifactAdapterRegistry\[jurisdictionProfileKey\] \?\? null;\s*\}/,
  );
  assert.match(
    governanceIndexText,
    /function deriveExportPackageJsonArtifact\(\s*exportPackageSnapshot\s*\)\s*\{/,
  );
  assert.match(
    governanceIndexText,
    /const adapter = getExportPackageJsonArtifactAdapter\([\s\S]*exportPackageSnapshot\.jurisdiction_profile_key,[\s\S]*?\);/,
  );
  assert.match(
    governanceIndexText,
    /assertSupportedJurisdictionProfileCapability\([\s\S]*exportPackageSnapshot\.jurisdiction_profile_key,[\s\S]*"export_package_json_artifact"[\s\S]*?\);/,
  );
  assert.match(
    governanceIndexText,
    /return adapter\.deriveExportPackageJsonArtifact\(exportPackageSnapshot\);/,
  );
  assert.match(
    governanceIndexText,
    /const defaultAdapter = Object\.values\(exportPackageJsonArtifactAdapterRegistry\)\[0\];/,
  );
  assert.match(
    governanceIndexText,
    /return defaultAdapter\.deriveExportPackageJsonArtifact\(exportPackageSnapshot\);/,
  );
  assert.match(
    governanceIndexText,
    /function resolveExportPackageJsonArtifactAdapter\(\s*exportPackageJsonArtifactSnapshot,\s*currentExportPackageSnapshot,\s*\)\s*\{/,
  );
  assert.match(
    governanceIndexText,
    /const currentExportPackageAdapter = getExportPackageJsonArtifactAdapter\([\s\S]*currentExportPackageSnapshot\.jurisdiction_profile_key,[\s\S]*?\);/,
  );
  assert.match(
    governanceIndexText,
    /for \(const adapter of Object\.values\(exportPackageJsonArtifactAdapterRegistry\)\) \{/,
  );
  assert.match(
    governanceIndexText,
    /adapter\.deriveExportPackageFromJsonArtifact\(exportPackageJsonArtifactSnapshot\);/,
  );
  assert.match(
    governanceIndexText,
    /return null;\s*\}/,
  );
  assert.match(
    governanceIndexText,
    /function deriveExportPackageFromJsonArtifact\(\s*exportPackageJsonArtifactSnapshot\s*\)\s*\{/,
  );
  assert.match(
    governanceIndexText,
    /const adapter = resolveExportPackageJsonArtifactAdapter\(\s*exportPackageJsonArtifactSnapshot,\s*null,\s*\);/,
  );
  assert.match(
    governanceIndexText,
    /return adapter\.deriveExportPackageFromJsonArtifact\(\s*exportPackageJsonArtifactSnapshot,\s*\);/,
  );
  assert.match(
    governanceIndexText,
    /return defaultAdapter\.deriveExportPackageFromJsonArtifact\(\s*exportPackageJsonArtifactSnapshot,\s*\);/,
  );
  assert.match(
    governanceIndexText,
    /function resolveExportPackageJsonArtifactProjection\(\s*exportPackageJsonArtifactSnapshot,\s*currentExportPackageSnapshot,\s*currentProfileDossierSnapshot,\s*\)\s*\{/,
  );
  assert.match(
    governanceIndexText,
    /const adapter = resolveExportPackageJsonArtifactAdapter\(\s*exportPackageJsonArtifactSnapshot,\s*currentExportPackageSnapshot,\s*\);/,
  );
  assert.match(
    governanceIndexText,
    /return adapter\.resolveExportPackageJsonArtifactProjection\(\s*exportPackageJsonArtifactSnapshot,\s*currentExportPackageSnapshot,\s*currentProfileDossierSnapshot,\s*\);/,
  );
  assert.match(
    governanceIndexText,
    /assertSupportedJurisdictionProfileCapability\([\s\S]*currentExportPackageSnapshot\.jurisdiction_profile_key,[\s\S]*"export_package_json_artifact"[\s\S]*?\);/,
  );
  assert.match(
    governanceIndexText,
    /return defaultAdapter\.resolveExportPackageJsonArtifactProjection\(\s*exportPackageJsonArtifactSnapshot,\s*currentExportPackageSnapshot,\s*currentProfileDossierSnapshot,\s*\);/,
  );
  assert.match(
    governanceIndexText,
    /deriveExportPackageFromJsonArtifact,\n/,
  );
  assert.match(
    governanceIndexText,
    /deriveExportPackageJsonArtifact,\n/,
  );
  assert.match(
    governanceIndexText,
    /exportPackageJsonArtifactAdapterRegistry,\n/,
  );
  assert.match(
    governanceIndexText,
    /getExportPackageJsonArtifactAdapter,\n/,
  );
  assert.match(
    governanceIndexText,
    /resolveExportPackageJsonArtifactProjection,\n/,
  );
  assert.doesNotMatch(
    governanceIndexText,
    /\n\s*resolveExportPackageJsonArtifactAdapter,\n/,
  );

  assert.deepEqual(
    collectLineMatches(governanceIndexText, /\bexportPackageJsonArtifactAdapterRegistry\b/),
    [
      2066,
      2079,
      2104,
      3855,
      3883,
      4304,
      5922,
    ],
  );
  assert.deepEqual(
    collectLineMatches(governanceIndexText, /\bgetExportPackageJsonArtifactAdapter\b/),
    [
      2071,
      2090,
      3846,
      5936,
    ],
  );
  assert.deepEqual(
    collectLineMatches(governanceIndexText, /\bderiveExportPackageJsonArtifact\b/),
    [
      2052,
      2060,
      2082,
      2101,
      2105,
      5875,
    ],
  );
  assert.deepEqual(
    collectLineMatches(governanceIndexText, /\bderiveExportPackageFromJsonArtifact\b/),
    [
      2053,
      2061,
      3858,
      3871,
      3878,
      3884,
      5870,
    ],
  );
  assert.deepEqual(
    collectLineMatches(governanceIndexText, /\bresolveExportPackageJsonArtifactProjection\b/),
    [
      2054,
      2062,
      4273,
      4284,
      4305,
      6020,
    ],
  );
  assert.deepEqual(
    collectLineMatches(governanceIndexText, /\bresolveExportPackageJsonArtifactAdapter\b/),
    [3835, 3872, 4278],
  );

  assert.match(
    jsonProjectionHelperFreezeTestText,
    /Shared Governance JSON Artifact Projection Helper Seam Freeze/i,
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
    /shared governance JSON export-artifact derivation and round-trip helper scaffold/i,
  );
  assert.match(
    schemasJsonProjectionValidatorFreezeTestText,
    /shared packages\/schemas JSON artifact projection-validator seam/i,
  );
  assert.match(
    schemasJsonValidatorFreezeTestText,
    /shared packages\/schemas JSON artifact validator seam/i,
  );

  assert.match(
    adapterRegistryTestText,
    /the generic JSON artifact adapter registry exposes the explicit CMD_PROFILE entry/i,
  );
  assert.match(
    adapterRegistryTestText,
    /const expectedViaRegistry = deriveExportPackageJsonArtifact\(exportPackage\);/,
  );
  assert.match(
    adapterRegistryTestText,
    /const expectedViaRegistry = resolveExportPackageJsonArtifactProjection\(/,
  );
  assert.match(
    adapterRegistryTestText,
    /adapter\.deriveExportPackageFromJsonArtifact\(jsonArtifactSnapshot\)/,
  );
  assert.match(
    adapterRegistryTestText,
    /deriveExportPackageFromJsonArtifact\(jsonArtifactSnapshot\)/,
  );
  assert.match(
    adapterRegistryTestText,
    /adapter\.resolveExportPackageJsonArtifactProjection\(/,
  );
  assert.match(
    projectionTestText,
    /resolveSWEBodelningExportPackageJsonArtifactProjection,/,
  );
  assert.match(
    projectionTestText,
    /const projection = resolveSWEBodelningExportPackageJsonArtifactProjection\(/,
  );
});
