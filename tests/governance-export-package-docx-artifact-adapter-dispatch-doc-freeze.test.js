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
const docxProjectionHelperFreezeTestText = fs.readFileSync(
  path.join(__dirname, "governance-docx-artifact-projection-helper-doc-freeze.test.js"),
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
const schemasDocxProjectionValidatorFreezeTestText = fs.readFileSync(
  path.join(__dirname, "schemas-docx-artifact-projection-validator-doc-freeze.test.js"),
  "utf8",
);
const schemasDocxValidatorFreezeTestText = fs.readFileSync(
  path.join(__dirname, "schemas-docx-artifact-validator-doc-freeze.test.js"),
  "utf8",
);
const adapterRegistryTestText = fs.readFileSync(
  path.join(__dirname, "export-package-docx-artifact-adapter-registry.test.js"),
  "utf8",
);
const projectionTestText = fs.readFileSync(
  path.join(__dirname, "export-package-docx-artifact-projection.test.js"),
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

test("docs freeze the shared governance export-package DOCX artifact adapter-dispatch seam as the DOCX artifact-specific registry and generic dispatch boundary", () => {
  assert.match(
    docsText,
    /Shared Governance Export Package DOCX Artifact Adapter-Dispatch Seam Freeze/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/governance\/src\/index\.js` DOCX artifact adapter\/dispatch seam formed by `exportPackageDocxArtifactAdapterRegistry`, `getExportPackageDocxArtifactAdapter`, `deriveExportPackageDocxArtifact`, `deriveExportPackageFromDocxArtifact`, and `resolveExportPackageDocxArtifactProjection` is the canonical internal governance-side export-package DOCX artifact adapter lookup and generic dispatch boundary for the current included governance flows below and is now frozen as the baseline seam/i,
  );
  assert.match(
    docsText,
    /the currently evidenced governed surfaces in this freeze are limited to:\s+`export_package_docx_artifact` adapter lookup keyed by `jurisdiction_profile_key`\s+generic `export_package_docx_artifact` derivation dispatch from canonical export-package snapshots\s+generic export-package reconstruction dispatch from persisted `export_package_docx_artifact` snapshots\s+generic `export_package_docx_artifact` projection dispatch/i,
  );
  assert.match(
    docsText,
    /the currently concrete shared helper responsibilities already evidenced for this seam are limited to:\s+centralizing the explicit DOCX artifact adapter entries for `SWE_BODELNING` and `"CMD_PROFILE"` inside the shared registry object\s+returning the current adapter entry or `null` through the shared `getExportPackageDocxArtifactAdapter` lookup helper\s+dispatching generic DOCX artifact derivation through the shared registry when a non-empty `jurisdiction_profile_key` is present and otherwise through the current default-adapter path backed by `Object\.values\(exportPackageDocxArtifactAdapterRegistry\)\[0\]`\s+dispatching generic export-package reconstruction from persisted DOCX artifacts through the current shared adapter-resolution path and then through the resolved adapter or the same current default-adapter path\s+dispatching generic DOCX artifact projection resolution through the current shared adapter-resolution path and then through the resolved adapter or the same current default-adapter path/i,
  );
  assert.match(
    docsText,
    /the current relationship to the already-frozen profile-specific DOCX artifact projection-helper seam already evidenced in `packages\/governance\/src\/index\.js` is limited to `sweBodelningExportPackageDocxArtifactAdapter` and `cmdExportPackageDocxArtifactAdapter` exposing `resolveExportPackageDocxArtifactProjection` slots backed by `resolveSWEBodelningExportPackageDocxArtifactProjection` and `resolveCMDExportPackageDocxArtifactProjection`, while the shared generic dispatcher delegates through those adapter slots instead of reconstructing profile-specific projection logic itself/i,
  );
  assert.match(
    docsText,
    /the current relationship to the lower schemas DOCX artifact projection-validator seam already evidenced in `packages\/governance\/src\/index\.js` is limited to the shared generic DOCX artifact projection dispatcher reaching that lower seam only through the already-frozen profile-specific DOCX artifact projection-helper pair rather than calling `validateSWEBodelningExportPackageDocxArtifactProjection` or `validateCMDExportPackageDocxArtifactProjection` directly/i,
  );
  assert.match(
    docsText,
    /the current relationship to the lower schemas DOCX artifact validator seam already evidenced in `packages\/governance\/src\/index\.js` is limited to the shared generic DOCX artifact derivation, reconstruction, and projection dispatchers reaching that lower seam only through the existing profile-specific DOCX artifact derivation \/ round-trip \/ projection helpers rather than calling `validateSWEBodelningExportPackageDocxArtifact` or `validateCMDExportPackageDocxArtifact` directly/i,
  );
  assert.match(
    docsText,
    /the current relationship to adapter-slot wiring already evidenced in `packages\/governance\/src\/index\.js` is limited to:\s+`sweBodelningExportPackageDocxArtifactAdapter` wiring the shared DOCX artifact slots to the SWE helper trio\s+`cmdExportPackageDocxArtifactAdapter` wiring the shared DOCX artifact slots to the CMD helper trio\s+`exportPackageDocxArtifactAdapterRegistry` centralizing those two adapter objects under `supportedProfileKey` and `cmdProfileKey`/i,
  );
  assert.match(
    docsText,
    /the nearby `resolveExportPackageDocxArtifactAdapter` helper remains an internal implementation detail within this seam because current repo evidence limits it to 2 internal generic-dispatch call sites and does not show it as a separately frozen shared boundary/i,
  );
  assert.match(
    docsText,
    /the current bounded reuse already evidenced in `packages\/governance\/src\/index\.js` is limited to 2 profile-specific adapter object definitions, 1 shared registry definition, 1 shared lookup helper definition, 3 shared generic dispatch helper definitions, 1 internal adapter-resolution helper implementation detail supporting 2 of those dispatchers, and the current named module export surface exposing `deriveExportPackageFromDocxArtifact`, `deriveExportPackageDocxArtifact`, `exportPackageDocxArtifactAdapterRegistry`, `getExportPackageDocxArtifactAdapter`, and `resolveExportPackageDocxArtifactProjection`/i,
  );
  assert.match(
    docsText,
    /the lower schemas DOCX artifact projection-validator seam remains outside this seam because schema-side projection validation, `snapshot_status` object enforcement, and normalized projection-shape guarantees are separate lower-boundary responsibilities consumed only through the delegated profile-specific projection-helper pair rather than defined by this generic adapter\/dispatch seam/i,
  );
  assert.match(
    docsText,
    /the lower schemas DOCX artifact validator seam remains outside this seam because lower artifact-envelope validation, canonical export-package reconstruction, filename equality, and canonical DOCX equality\/normalization are separate lower-boundary responsibilities consumed only through the delegated profile-specific DOCX helper paths rather than defined by this generic adapter\/dispatch seam/i,
  );
  assert.match(
    docsText,
    /the frozen profile-specific DOCX artifact projection-helper seam remains outside this seam because governance-side DOCX artifact projection assembly and projection-level `snapshot_status` derivation remain separate lower helper responsibilities even where the shared generic projection dispatcher currently delegates to it/i,
  );
  assert.match(
    docsText,
    /the frozen broader governance export-artifact derivation and round-trip helper scaffold remains outside this seam because it owns the wider DOCX derivation, round-trip reconstruction, and DOCX artifact snapshot-status area beyond this narrower registry\/lookup\/generic-dispatch sub-seam/i,
  );
  assert.match(
    docsText,
    /the frozen broader shared governance adapter-dispatch scaffold remains outside this seam because it owns the wider multi-surface runtime\/governance boundary across profile input, release-eval, export-package, artifact, and bundle surfaces rather than this narrower DOCX artifact-specific registry\/lookup\/generic-dispatch sub-seam/i,
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
    /downstream governance dispatch, adapter consumers, artifact-derivation, and route\/runtime behavior remain outside this seam because they may call or route into the shared DOCX artifact registry\/lookup\/generic-dispatch seam but do not define that canonical DOCX artifact-specific boundary themselves/i,
  );
  assert.match(
    docsText,
    /future governance-side DOCX artifact adapter lookup or generic DOCX artifact dispatch behavior that needs the same shared registry path should extend this seam instead of bypassing it in profile-specific helpers, broader artifact helpers, or routes/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, governance semantics, projection semantics, derivation semantics, reconstruction semantics, schema behavior, or fail-closed behavior/i,
  );

  assert.match(
    governanceIndexText,
    /const exportPackageDocxArtifactAdapterRegistry = Object\.freeze\(\{\s*\[supportedProfileKey\]: sweBodelningExportPackageDocxArtifactAdapter,\s*\[cmdProfileKey\]: cmdExportPackageDocxArtifactAdapter,\s*\}\);/,
  );
  assert.match(
    governanceIndexText,
    /function getExportPackageDocxArtifactAdapter\(jurisdictionProfileKey\)\s*\{[\s\S]*return exportPackageDocxArtifactAdapterRegistry\[jurisdictionProfileKey\] \?\? null;\s*\}/,
  );
  assert.match(
    governanceIndexText,
    /function deriveExportPackageDocxArtifact\(\s*exportPackageSnapshot\s*\)\s*\{/,
  );
  assert.match(
    governanceIndexText,
    /const adapter = getExportPackageDocxArtifactAdapter\([\s\S]*exportPackageSnapshot\.jurisdiction_profile_key,[\s\S]*?\);/,
  );
  assert.match(
    governanceIndexText,
    /assertSupportedJurisdictionProfileCapability\([\s\S]*exportPackageSnapshot\.jurisdiction_profile_key,[\s\S]*"export_package_docx_artifact"[\s\S]*?\);/,
  );
  assert.match(
    governanceIndexText,
    /return adapter\.deriveExportPackageDocxArtifact\(exportPackageSnapshot\);/,
  );
  assert.match(
    governanceIndexText,
    /const defaultAdapter = Object\.values\(exportPackageDocxArtifactAdapterRegistry\)\[0\];/,
  );
  assert.match(
    governanceIndexText,
    /return defaultAdapter\.deriveExportPackageDocxArtifact\(exportPackageSnapshot\);/,
  );
  assert.match(
    governanceIndexText,
    /function resolveExportPackageDocxArtifactAdapter\(\s*exportPackageDocxArtifactSnapshot,\s*currentExportPackageSnapshot,\s*\)\s*\{/,
  );
  assert.match(
    governanceIndexText,
    /const currentExportPackageAdapter = getExportPackageDocxArtifactAdapter\([\s\S]*currentExportPackageSnapshot\.jurisdiction_profile_key,[\s\S]*?\);/,
  );
  assert.match(
    governanceIndexText,
    /for \(const adapter of Object\.values\(exportPackageDocxArtifactAdapterRegistry\)\) \{/,
  );
  assert.match(
    governanceIndexText,
    /adapter\.deriveExportPackageFromDocxArtifact\(\s*exportPackageDocxArtifactSnapshot,\s*\);/,
  );
  assert.match(governanceIndexText, /return null;\s*\}/);
  assert.match(
    governanceIndexText,
    /function deriveExportPackageFromDocxArtifact\(\s*exportPackageDocxArtifactSnapshot\s*\)\s*\{/,
  );
  assert.match(
    governanceIndexText,
    /const adapter = resolveExportPackageDocxArtifactAdapter\(\s*exportPackageDocxArtifactSnapshot,\s*null,\s*\);/,
  );
  assert.match(
    governanceIndexText,
    /return adapter\.deriveExportPackageFromDocxArtifact\(\s*exportPackageDocxArtifactSnapshot\s*\);/,
  );
  assert.match(
    governanceIndexText,
    /return defaultAdapter\.deriveExportPackageFromDocxArtifact\(\s*exportPackageDocxArtifactSnapshot,\s*\);/,
  );
  assert.match(
    governanceIndexText,
    /function resolveExportPackageDocxArtifactProjection\(\s*exportPackageDocxArtifactSnapshot,\s*currentExportPackageSnapshot,\s*currentProfileDossierSnapshot,\s*\)\s*\{/,
  );
  assert.match(
    governanceIndexText,
    /const adapter = resolveExportPackageDocxArtifactAdapter\(\s*exportPackageDocxArtifactSnapshot,\s*currentExportPackageSnapshot,\s*\);/,
  );
  assert.match(
    governanceIndexText,
    /return adapter\.resolveExportPackageDocxArtifactProjection\(\s*exportPackageDocxArtifactSnapshot,\s*currentExportPackageSnapshot,\s*currentProfileDossierSnapshot,\s*\);/,
  );
  assert.match(
    governanceIndexText,
    /assertSupportedJurisdictionProfileCapability\([\s\S]*currentExportPackageSnapshot\.jurisdiction_profile_key,[\s\S]*"export_package_docx_artifact"[\s\S]*?\);/,
  );
  assert.match(
    governanceIndexText,
    /return defaultAdapter\.resolveExportPackageDocxArtifactProjection\(\s*exportPackageDocxArtifactSnapshot,\s*currentExportPackageSnapshot,\s*currentProfileDossierSnapshot,\s*\);/,
  );
  assert.match(governanceIndexText, /deriveExportPackageFromDocxArtifact,\n/);
  assert.match(governanceIndexText, /deriveExportPackageDocxArtifact,\n/);
  assert.match(governanceIndexText, /exportPackageDocxArtifactAdapterRegistry,\n/);
  assert.match(governanceIndexText, /getExportPackageDocxArtifactAdapter,\n/);
  assert.match(governanceIndexText, /resolveExportPackageDocxArtifactProjection,\n/);
  assert.doesNotMatch(
    governanceIndexText,
    /\n\s*resolveExportPackageDocxArtifactAdapter,\n/,
  );

  assert.deepEqual(
    collectLineMatches(governanceIndexText, /\bexportPackageDocxArtifactAdapterRegistry\b/),
    [
      2270,
      2283,
      2308,
      2344,
      2374,
      4190,
      5921,
    ],
  );
  assert.deepEqual(
    collectLineMatches(governanceIndexText, /\bgetExportPackageDocxArtifactAdapter\b/),
    [
      2275,
      2294,
      2335,
      5935,
    ],
  );
  assert.deepEqual(
    collectLineMatches(governanceIndexText, /\bderiveExportPackageDocxArtifact\b/),
    [
      2135,
      2264,
      2286,
      2305,
      2309,
      5874,
    ],
  );
  assert.deepEqual(
    collectLineMatches(governanceIndexText, /\bderiveExportPackageFromDocxArtifact\b/),
    [
      2136,
      2265,
      2346,
      2364,
      2371,
      2375,
      5869,
    ],
  );
  assert.deepEqual(
    collectLineMatches(governanceIndexText, /\bresolveExportPackageDocxArtifactProjection\b/),
    [
      2137,
      2266,
      4159,
      4170,
      4191,
      6018,
    ],
  );
  assert.deepEqual(
    collectLineMatches(governanceIndexText, /\bresolveExportPackageDocxArtifactAdapter\b/),
    [2324, 2365, 4164],
  );

  assert.match(
    docxProjectionHelperFreezeTestText,
    /Shared Governance DOCX Artifact Projection Helper Seam Freeze/i,
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
    schemasDocxProjectionValidatorFreezeTestText,
    /shared packages\/schemas DOCX artifact projection-validator seam/i,
  );
  assert.match(
    schemasDocxValidatorFreezeTestText,
    /shared packages\/schemas DOCX artifact validator seam/i,
  );

  assert.match(
    adapterRegistryTestText,
    /the generic DOCX artifact adapter registry exposes the explicit CMD_PROFILE entry/i,
  );
  assert.match(
    adapterRegistryTestText,
    /const expectedViaRegistry = deriveExportPackageDocxArtifact\(exportPackage\);/,
  );
  assert.match(
    adapterRegistryTestText,
    /const expectedViaRegistry = resolveExportPackageDocxArtifactProjection\(/,
  );
  assert.match(
    adapterRegistryTestText,
    /adapter\.deriveExportPackageFromDocxArtifact\(docxArtifactSnapshot\)/,
  );
  assert.match(
    adapterRegistryTestText,
    /deriveExportPackageFromDocxArtifact\(docxArtifactSnapshot\)/,
  );
  assert.match(
    adapterRegistryTestText,
    /adapter\.resolveExportPackageDocxArtifactProjection\(/,
  );
  assert.match(
    projectionTestText,
    /resolveSWEBodelningExportPackageDocxArtifactProjection,/,
  );
  assert.match(
    projectionTestText,
    /const projection = resolveSWEBodelningExportPackageDocxArtifactProjection\(/,
  );
});
