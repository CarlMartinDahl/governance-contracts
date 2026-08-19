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
const pdfProjectionHelperFreezeTestText = fs.readFileSync(
  path.join(__dirname, "governance-pdf-artifact-projection-helper-doc-freeze.test.js"),
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
const schemasPdfProjectionValidatorFreezeTestText = fs.readFileSync(
  path.join(__dirname, "schemas-pdf-artifact-projection-validator-doc-freeze.test.js"),
  "utf8",
);
const schemasPdfValidatorFreezeTestText = fs.readFileSync(
  path.join(__dirname, "schemas-pdf-artifact-validator-doc-freeze.test.js"),
  "utf8",
);
const adapterRegistryTestText = fs.readFileSync(
  path.join(__dirname, "export-package-pdf-artifact-adapter-registry.test.js"),
  "utf8",
);
const projectionTestText = fs.readFileSync(
  path.join(__dirname, "export-package-pdf-artifact-projection.test.js"),
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

test("docs freeze the shared governance export-package PDF artifact adapter-dispatch seam as the PDF artifact-specific registry and generic dispatch boundary", () => {
  assert.match(
    docsText,
    /Shared Governance Export Package PDF Artifact Adapter-Dispatch Seam Freeze/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/governance\/src\/index\.js` PDF artifact adapter\/dispatch seam formed by `exportPackagePdfArtifactAdapterRegistry`, `getExportPackagePdfArtifactAdapter`, `deriveExportPackagePdfArtifact`, `deriveExportPackageFromPdfArtifact`, and `resolveExportPackagePdfArtifactProjection` is the canonical internal governance-side export-package PDF artifact adapter lookup and generic dispatch boundary for the current included governance flows below and is now frozen as the baseline seam/i,
  );
  assert.match(
    docsText,
    /the currently evidenced governed surfaces in this freeze are limited to:\s+`export_package_pdf_artifact` adapter lookup keyed by `jurisdiction_profile_key`\s+generic `export_package_pdf_artifact` derivation dispatch from canonical export-package snapshots\s+generic export-package reconstruction dispatch from persisted `export_package_pdf_artifact` snapshots\s+generic `export_package_pdf_artifact` projection dispatch/i,
  );
  assert.match(
    docsText,
    /the currently concrete shared helper responsibilities already evidenced for this seam are limited to:\s+centralizing the explicit PDF artifact adapter entries for `SWE_BODELNING` and `"CMD_PROFILE"` inside the shared registry object\s+returning the current adapter entry or `null` through the shared `getExportPackagePdfArtifactAdapter` lookup helper\s+dispatching generic PDF artifact derivation through the shared registry when a non-empty `jurisdiction_profile_key` is present and otherwise through the current default-adapter path backed by `Object\.values\(exportPackagePdfArtifactAdapterRegistry\)\[0\]`\s+dispatching generic export-package reconstruction from persisted PDF artifacts through the current shared adapter-resolution path and then through the resolved adapter or the same current default-adapter path\s+dispatching generic PDF artifact projection resolution through the current shared adapter-resolution path and then through the resolved adapter or the same current default-adapter path/i,
  );
  assert.match(
    docsText,
    /the current relationship to the already-frozen profile-specific PDF artifact projection-helper seam already evidenced in `packages\/governance\/src\/index\.js` is limited to `sweBodelningExportPackagePdfArtifactAdapter` and `cmdExportPackagePdfArtifactAdapter` exposing `resolveExportPackagePdfArtifactProjection` slots backed by `resolveSWEBodelningExportPackagePdfArtifactProjection` and `resolveCMDExportPackagePdfArtifactProjection`, while the shared generic dispatcher delegates through those adapter slots instead of reconstructing profile-specific projection logic itself/i,
  );
  assert.match(
    docsText,
    /the current relationship to the lower schemas PDF artifact projection-validator seam already evidenced in `packages\/governance\/src\/index\.js` is limited to the shared generic PDF artifact projection dispatcher reaching that lower seam only through the already-frozen profile-specific PDF artifact projection-helper pair rather than calling `validateSWEBodelningExportPackagePdfArtifactProjection` or `validateCMDExportPackagePdfArtifactProjection` directly/i,
  );
  assert.match(
    docsText,
    /the current relationship to the lower schemas PDF artifact validator seam already evidenced in `packages\/governance\/src\/index\.js` is limited to the shared generic PDF artifact derivation, reconstruction, and projection dispatchers reaching that lower seam only through the existing profile-specific PDF artifact derivation \/ round-trip \/ projection helpers rather than calling `validateSWEBodelningExportPackagePdfArtifact` or `validateCMDExportPackagePdfArtifact` directly/i,
  );
  assert.match(
    docsText,
    /the current relationship to adapter-slot wiring already evidenced in `packages\/governance\/src\/index\.js` is limited to:\s+`sweBodelningExportPackagePdfArtifactAdapter` wiring the shared PDF artifact slots to the SWE helper trio\s+`cmdExportPackagePdfArtifactAdapter` wiring the shared PDF artifact slots to the CMD helper trio\s+`exportPackagePdfArtifactAdapterRegistry` centralizing those two adapter objects under `supportedProfileKey` and `cmdProfileKey`/i,
  );
  assert.match(
    docsText,
    /the nearby `resolveExportPackagePdfArtifactAdapter` helper remains an internal implementation detail within this seam because current repo evidence limits it to 2 internal generic-dispatch call sites and does not show it as a separately frozen shared boundary/i,
  );
  assert.match(
    docsText,
    /the current bounded reuse already evidenced in `packages\/governance\/src\/index\.js` is limited to 2 profile-specific adapter object definitions, 1 shared registry definition, 1 shared lookup helper definition, 3 shared generic dispatch helper definitions, 1 internal adapter-resolution helper implementation detail supporting 2 of those dispatchers, and the current named module export surface exposing `deriveExportPackageFromPdfArtifact`, `deriveExportPackagePdfArtifact`, `exportPackagePdfArtifactAdapterRegistry`, `getExportPackagePdfArtifactAdapter`, and `resolveExportPackagePdfArtifactProjection`/i,
  );
  assert.match(
    docsText,
    /the lower schemas PDF artifact projection-validator seam remains outside this seam because schema-side projection validation, `snapshot_status` object enforcement, and normalized projection-shape guarantees are separate lower-boundary responsibilities consumed only through the delegated profile-specific projection-helper pair rather than defined by this generic adapter\/dispatch seam/i,
  );
  assert.match(
    docsText,
    /the lower schemas PDF artifact validator seam remains outside this seam because lower artifact-envelope validation, canonical export-package reconstruction, filename equality, and canonical PDF equality\/normalization are separate lower-boundary responsibilities consumed only through the delegated profile-specific PDF helper paths rather than defined by this generic adapter\/dispatch seam/i,
  );
  assert.match(
    docsText,
    /the frozen profile-specific PDF artifact projection-helper seam remains outside this seam because governance-side PDF artifact projection assembly and projection-level `snapshot_status` derivation remain separate lower helper responsibilities even where the shared generic projection dispatcher currently delegates to it/i,
  );
  assert.match(
    docsText,
    /the frozen broader governance export-artifact derivation and round-trip helper scaffold remains outside this seam because it owns the wider PDF derivation, round-trip reconstruction, and PDF artifact snapshot-status area beyond this narrower registry\/lookup\/generic-dispatch sub-seam/i,
  );
  assert.match(
    docsText,
    /the frozen broader shared governance adapter-dispatch scaffold remains outside this seam because it owns the wider multi-surface runtime\/governance boundary across profile input, release-eval, export-package, artifact, and bundle surfaces rather than this narrower PDF artifact-specific registry\/lookup\/generic-dispatch sub-seam/i,
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
    /downstream governance dispatch, adapter consumers, artifact-derivation, and route\/runtime behavior remain outside this seam because they may call or route into the shared PDF artifact registry\/lookup\/generic-dispatch seam but do not define that canonical PDF artifact-specific boundary themselves/i,
  );
  assert.match(
    docsText,
    /future governance-side PDF artifact adapter lookup or generic PDF artifact dispatch behavior that needs the same shared registry path should extend this seam instead of bypassing it in profile-specific helpers, broader artifact helpers, or routes/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, governance semantics, projection semantics, derivation semantics, reconstruction semantics, schema behavior, or fail-closed behavior/i,
  );

  assert.match(
    governanceIndexText,
    /const exportPackagePdfArtifactAdapterRegistry = Object\.freeze\(\{\s*\[supportedProfileKey\]: sweBodelningExportPackagePdfArtifactAdapter,\s*\[cmdProfileKey\]: cmdExportPackagePdfArtifactAdapter,\s*\}\);/,
  );
  assert.match(
    governanceIndexText,
    /function getExportPackagePdfArtifactAdapter\(jurisdictionProfileKey\)\s*\{[\s\S]*return exportPackagePdfArtifactAdapterRegistry\[jurisdictionProfileKey\] \?\? null;\s*\}/,
  );
  assert.match(
    governanceIndexText,
    /function deriveExportPackagePdfArtifact\(\s*exportPackageSnapshot\s*\)\s*\{/,
  );
  assert.match(
    governanceIndexText,
    /const adapter = getExportPackagePdfArtifactAdapter\([\s\S]*exportPackageSnapshot\.jurisdiction_profile_key,[\s\S]*?\);/,
  );
  assert.match(
    governanceIndexText,
    /assertSupportedJurisdictionProfileCapability\([\s\S]*exportPackageSnapshot\.jurisdiction_profile_key,[\s\S]*"export_package_pdf_artifact"[\s\S]*?\);/,
  );
  assert.match(
    governanceIndexText,
    /return adapter\.deriveExportPackagePdfArtifact\(exportPackageSnapshot\);/,
  );
  assert.match(
    governanceIndexText,
    /const defaultAdapter = Object\.values\(exportPackagePdfArtifactAdapterRegistry\)\[0\];/,
  );
  assert.match(
    governanceIndexText,
    /return defaultAdapter\.deriveExportPackagePdfArtifact\(exportPackageSnapshot\);/,
  );
  assert.match(
    governanceIndexText,
    /function resolveExportPackagePdfArtifactAdapter\(\s*exportPackagePdfArtifactSnapshot,\s*currentExportPackageSnapshot,\s*\)\s*\{/,
  );
  assert.match(
    governanceIndexText,
    /const currentExportPackageAdapter = getExportPackagePdfArtifactAdapter\([\s\S]*currentExportPackageSnapshot\.jurisdiction_profile_key,[\s\S]*?\);/,
  );
  assert.match(
    governanceIndexText,
    /for \(const adapter of Object\.values\(exportPackagePdfArtifactAdapterRegistry\)\) \{/,
  );
  assert.match(
    governanceIndexText,
    /adapter\.deriveExportPackageFromPdfArtifact\(\s*exportPackagePdfArtifactSnapshot,\s*\);/,
  );
  assert.match(governanceIndexText, /return null;\s*\}/);
  assert.match(
    governanceIndexText,
    /function deriveExportPackageFromPdfArtifact\(\s*exportPackagePdfArtifactSnapshot\s*\)\s*\{/,
  );
  assert.match(
    governanceIndexText,
    /const adapter = resolveExportPackagePdfArtifactAdapter\(\s*exportPackagePdfArtifactSnapshot,\s*null,\s*\);/,
  );
  assert.match(
    governanceIndexText,
    /return adapter\.deriveExportPackageFromPdfArtifact\(\s*exportPackagePdfArtifactSnapshot\s*\);/,
  );
  assert.match(
    governanceIndexText,
    /return defaultAdapter\.deriveExportPackageFromPdfArtifact\(\s*exportPackagePdfArtifactSnapshot,\s*\);/,
  );
  assert.match(
    governanceIndexText,
    /function resolveExportPackagePdfArtifactProjection\(\s*exportPackagePdfArtifactSnapshot,\s*currentExportPackageSnapshot,\s*currentProfileDossierSnapshot,\s*\)\s*\{/,
  );
  assert.match(
    governanceIndexText,
    /const adapter = resolveExportPackagePdfArtifactAdapter\(\s*exportPackagePdfArtifactSnapshot,\s*currentExportPackageSnapshot,\s*\);/,
  );
  assert.match(
    governanceIndexText,
    /return adapter\.resolveExportPackagePdfArtifactProjection\(\s*exportPackagePdfArtifactSnapshot,\s*currentExportPackageSnapshot,\s*currentProfileDossierSnapshot,\s*\);/,
  );
  assert.match(
    governanceIndexText,
    /assertSupportedJurisdictionProfileCapability\([\s\S]*currentExportPackageSnapshot\.jurisdiction_profile_key,[\s\S]*"export_package_pdf_artifact"[\s\S]*?\);/,
  );
  assert.match(
    governanceIndexText,
    /return defaultAdapter\.resolveExportPackagePdfArtifactProjection\(\s*exportPackagePdfArtifactSnapshot,\s*currentExportPackageSnapshot,\s*currentProfileDossierSnapshot,\s*\);/,
  );
  assert.match(governanceIndexText, /deriveExportPackageFromPdfArtifact,\n/);
  assert.match(governanceIndexText, /deriveExportPackagePdfArtifact,\n/);
  assert.match(governanceIndexText, /exportPackagePdfArtifactAdapterRegistry,\n/);
  assert.match(governanceIndexText, /getExportPackagePdfArtifactAdapter,\n/);
  assert.match(governanceIndexText, /resolveExportPackagePdfArtifactProjection,\n/);
  assert.doesNotMatch(
    governanceIndexText,
    /\n\s*resolveExportPackagePdfArtifactAdapter,\n/,
  );

  assert.deepEqual(
    collectLineMatches(governanceIndexText, /\bexportPackagePdfArtifactAdapterRegistry\b/),
    [
      2540,
      2553,
      2578,
      2613,
      2643,
      4247,
      5924,
    ],
  );
  assert.deepEqual(
    collectLineMatches(governanceIndexText, /\bgetExportPackagePdfArtifactAdapter\b/),
    [
      2545,
      2564,
      2604,
      5938,
    ],
  );
  assert.deepEqual(
    collectLineMatches(governanceIndexText, /\bderiveExportPackagePdfArtifact\b/),
    [
      2406,
      2534,
      2556,
      2575,
      2579,
      5877,
    ],
  );
  assert.deepEqual(
    collectLineMatches(governanceIndexText, /\bderiveExportPackageFromPdfArtifact\b/),
    [
      2407,
      2535,
      2615,
      2633,
      2640,
      2644,
      5872,
    ],
  );
  assert.deepEqual(
    collectLineMatches(governanceIndexText, /\bresolveExportPackagePdfArtifactProjection\b/),
    [
      2408,
      2536,
      4216,
      4227,
      4248,
      6022,
    ],
  );
  assert.deepEqual(
    collectLineMatches(governanceIndexText, /\bresolveExportPackagePdfArtifactAdapter\b/),
    [2593, 2634, 4221],
  );

  assert.match(
    pdfProjectionHelperFreezeTestText,
    /Shared Governance PDF Artifact Projection Helper Seam Freeze/i,
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
    schemasPdfProjectionValidatorFreezeTestText,
    /shared packages\/schemas PDF artifact projection-validator seam/i,
  );
  assert.match(
    schemasPdfValidatorFreezeTestText,
    /shared packages\/schemas PDF artifact validator seam/i,
  );

  assert.match(
    adapterRegistryTestText,
    /the generic PDF artifact adapter registry exposes the explicit CMD_PROFILE entry/i,
  );
  assert.match(
    adapterRegistryTestText,
    /const expectedViaRegistry = deriveExportPackagePdfArtifact\(exportPackage\);/,
  );
  assert.match(
    adapterRegistryTestText,
    /const expectedViaRegistry = resolveExportPackagePdfArtifactProjection\(/,
  );
  assert.match(
    adapterRegistryTestText,
    /adapter\.deriveExportPackageFromPdfArtifact\(pdfArtifactSnapshot\)/,
  );
  assert.match(
    adapterRegistryTestText,
    /deriveExportPackageFromPdfArtifact\(pdfArtifactSnapshot\)/,
  );
  assert.match(
    adapterRegistryTestText,
    /adapter\.resolveExportPackagePdfArtifactProjection\(/,
  );
  assert.match(
    projectionTestText,
    /resolveSWEBodelningExportPackagePdfArtifactProjection,/,
  );
  assert.match(
    projectionTestText,
    /const projection = resolveSWEBodelningExportPackagePdfArtifactProjection\(/,
  );
});
