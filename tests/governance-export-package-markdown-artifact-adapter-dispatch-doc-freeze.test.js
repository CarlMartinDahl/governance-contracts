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
const markdownProjectionHelperFreezeTestText = fs.readFileSync(
  path.join(__dirname, "governance-markdown-artifact-projection-helper-doc-freeze.test.js"),
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
const schemasMarkdownProjectionValidatorFreezeTestText = fs.readFileSync(
  path.join(__dirname, "schemas-markdown-artifact-projection-validator-doc-freeze.test.js"),
  "utf8",
);
const schemasMarkdownValidatorFreezeTestText = fs.readFileSync(
  path.join(__dirname, "schemas-markdown-artifact-validator-doc-freeze.test.js"),
  "utf8",
);
const adapterRegistryTestText = fs.readFileSync(
  path.join(__dirname, "export-package-markdown-artifact-adapter-registry.test.js"),
  "utf8",
);
const projectionTestText = fs.readFileSync(
  path.join(__dirname, "export-package-markdown-artifact-projection.test.js"),
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

test("docs freeze the shared governance export-package Markdown artifact adapter-dispatch seam as the Markdown artifact-specific registry and generic dispatch boundary", () => {
  assert.match(
    docsText,
    /Shared Governance Export Package Markdown Artifact Adapter-Dispatch Seam Freeze/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/governance\/src\/index\.js` Markdown artifact adapter\/dispatch seam formed by `exportPackageMarkdownArtifactAdapterRegistry`, `getExportPackageMarkdownArtifactAdapter`, `deriveExportPackageMarkdownArtifact`, `deriveExportPackageFromMarkdownArtifact`, and `resolveExportPackageMarkdownArtifactProjection` is the canonical internal governance-side export-package Markdown artifact adapter lookup and generic dispatch boundary for the current included governance flows below and is now frozen as the baseline seam/i,
  );
  assert.match(
    docsText,
    /the currently evidenced governed surfaces in this freeze are limited to:\s+`export_package_markdown_artifact` adapter lookup keyed by `jurisdiction_profile_key`\s+generic `export_package_markdown_artifact` derivation dispatch from canonical export-package snapshots\s+generic export-package reconstruction dispatch from persisted `export_package_markdown_artifact` snapshots\s+generic `export_package_markdown_artifact` projection dispatch/i,
  );
  assert.match(
    docsText,
    /the currently concrete shared helper responsibilities already evidenced for this seam are limited to:\s+centralizing the explicit Markdown artifact adapter entries for `SWE_BODELNING` and `"CMD_PROFILE"` inside the shared registry object\s+returning the current adapter entry or `null` through the shared `getExportPackageMarkdownArtifactAdapter` lookup helper\s+dispatching generic Markdown artifact derivation through the shared registry when a non-empty `jurisdiction_profile_key` is present and otherwise through the current default-adapter path backed by `Object\.values\(exportPackageMarkdownArtifactAdapterRegistry\)\[0\]`\s+dispatching generic export-package reconstruction from persisted Markdown artifacts through the current shared adapter-resolution path and then through the resolved adapter or the same current default-adapter path\s+dispatching generic Markdown artifact projection resolution through the current shared adapter-resolution path and then through the resolved adapter or the same current default-adapter path/i,
  );
  assert.match(
    docsText,
    /the current relationship to the already-frozen profile-specific Markdown artifact projection-helper seam already evidenced in `packages\/governance\/src\/index\.js` is limited to `sweBodelningExportPackageMarkdownArtifactAdapter` and `cmdExportPackageMarkdownArtifactAdapter` exposing `resolveExportPackageMarkdownArtifactProjection` slots backed by `resolveSWEBodelningExportPackageMarkdownArtifactProjection` and `resolveCMDExportPackageMarkdownArtifactProjection`, while the shared generic dispatcher delegates through those adapter slots instead of reconstructing profile-specific projection logic itself/i,
  );
  assert.match(
    docsText,
    /the current relationship to the lower schemas Markdown artifact projection-validator seam already evidenced in `packages\/governance\/src\/index\.js` is limited to the shared generic Markdown artifact projection dispatcher reaching that lower seam only through the already-frozen profile-specific Markdown artifact projection-helper pair rather than calling `validateSWEBodelningExportPackageMarkdownArtifactProjection` or `validateCMDExportPackageMarkdownArtifactProjection` directly/i,
  );
  assert.match(
    docsText,
    /the current relationship to the lower schemas Markdown artifact validator seam already evidenced in `packages\/governance\/src\/index\.js` is limited to the shared generic Markdown artifact derivation, reconstruction, and projection dispatchers reaching that lower seam only through the existing profile-specific Markdown artifact derivation \/ round-trip \/ projection helpers rather than calling `validateSWEBodelningExportPackageMarkdownArtifact` or `validateCMDExportPackageMarkdownArtifact` directly/i,
  );
  assert.match(
    docsText,
    /the current relationship to adapter-slot wiring already evidenced in `packages\/governance\/src\/index\.js` is limited to:\s+`sweBodelningExportPackageMarkdownArtifactAdapter` wiring the shared Markdown artifact slots to the SWE helper trio\s+`cmdExportPackageMarkdownArtifactAdapter` wiring the shared Markdown artifact slots to the CMD helper trio\s+`exportPackageMarkdownArtifactAdapterRegistry` centralizing those two adapter objects under `supportedProfileKey` and `cmdProfileKey`/i,
  );
  assert.match(
    docsText,
    /the nearby `resolveExportPackageMarkdownArtifactAdapter` helper remains an internal implementation detail within this seam because current repo evidence limits it to 2 internal generic-dispatch call sites and does not show it as a separately frozen shared boundary/i,
  );
  assert.match(
    docsText,
    /the current bounded reuse already evidenced in `packages\/governance\/src\/index\.js` is limited to 2 profile-specific adapter object definitions, 1 shared registry definition, 1 shared lookup helper definition, 3 shared generic dispatch helper definitions, 1 internal adapter-resolution helper implementation detail supporting 2 of those dispatchers, and the current named module export surface exposing `deriveExportPackageFromMarkdownArtifact`, `deriveExportPackageMarkdownArtifact`, `exportPackageMarkdownArtifactAdapterRegistry`, `getExportPackageMarkdownArtifactAdapter`, and `resolveExportPackageMarkdownArtifactProjection`/i,
  );
  assert.match(
    docsText,
    /the lower schemas Markdown artifact projection-validator seam remains outside this seam because schema-side projection validation, `snapshot_status` object enforcement, and normalized projection-shape guarantees are separate lower-boundary responsibilities consumed only through the delegated profile-specific projection-helper pair rather than defined by this generic adapter\/dispatch seam/i,
  );
  assert.match(
    docsText,
    /the lower schemas Markdown artifact validator seam remains outside this seam because lower artifact-envelope validation, canonical export-package reconstruction, filename equality, and canonical Markdown equality\/normalization are separate lower-boundary responsibilities consumed only through the delegated profile-specific Markdown helper paths rather than defined by this generic adapter\/dispatch seam/i,
  );
  assert.match(
    docsText,
    /the frozen profile-specific Markdown artifact projection-helper seam remains outside this seam because governance-side Markdown artifact projection assembly and projection-level `snapshot_status` derivation remain separate lower helper responsibilities even where the shared generic projection dispatcher currently delegates to it/i,
  );
  assert.match(
    docsText,
    /the frozen broader governance export-artifact derivation and round-trip helper scaffold remains outside this seam because it owns the wider Markdown derivation, round-trip reconstruction, and Markdown artifact snapshot-status area beyond this narrower registry\/lookup\/generic-dispatch sub-seam/i,
  );
  assert.match(
    docsText,
    /the frozen broader shared governance adapter-dispatch scaffold remains outside this seam because it owns the wider multi-surface runtime\/governance boundary across profile input, release-eval, export-package, artifact, and bundle surfaces rather than this narrower Markdown artifact-specific registry\/lookup\/generic-dispatch sub-seam/i,
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
    /downstream governance dispatch, adapter consumers, artifact-derivation, and route\/runtime behavior remain outside this seam because they may call or route into the shared Markdown artifact registry\/lookup\/generic-dispatch seam but do not define that canonical Markdown artifact-specific boundary themselves/i,
  );
  assert.match(
    docsText,
    /future governance-side Markdown artifact adapter lookup or generic Markdown artifact dispatch behavior that needs the same shared registry path should extend this seam instead of bypassing it in profile-specific helpers, broader artifact helpers, or routes/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, governance semantics, projection semantics, derivation semantics, reconstruction semantics, schema behavior, or fail-closed behavior/i,
  );

  assert.match(
    governanceIndexText,
    /const exportPackageMarkdownArtifactAdapterRegistry = Object\.freeze\(\{\s*\[supportedProfileKey\]: sweBodelningExportPackageMarkdownArtifactAdapter,\s*\[cmdProfileKey\]: cmdExportPackageMarkdownArtifactAdapter,\s*\}\);/,
  );
  assert.match(
    governanceIndexText,
    /function getExportPackageMarkdownArtifactAdapter\(jurisdictionProfileKey\)\s*\{[\s\S]*return exportPackageMarkdownArtifactAdapterRegistry\[jurisdictionProfileKey\] \?\? null;\s*\}/,
  );
  assert.match(
    governanceIndexText,
    /function deriveExportPackageMarkdownArtifact\(\s*exportPackageSnapshot\s*\)\s*\{/,
  );
  assert.match(
    governanceIndexText,
    /const adapter = getExportPackageMarkdownArtifactAdapter\([\s\S]*exportPackageSnapshot\.jurisdiction_profile_key,[\s\S]*?\);/,
  );
  assert.match(
    governanceIndexText,
    /assertSupportedJurisdictionProfileCapability\([\s\S]*exportPackageSnapshot\.jurisdiction_profile_key,[\s\S]*"export_package_markdown_artifact"[\s\S]*?\);/,
  );
  assert.match(
    governanceIndexText,
    /return adapter\.deriveExportPackageMarkdownArtifact\(exportPackageSnapshot\);/,
  );
  assert.match(
    governanceIndexText,
    /const defaultAdapter = Object\.values\(exportPackageMarkdownArtifactAdapterRegistry\)\[0\];/,
  );
  assert.match(
    governanceIndexText,
    /return defaultAdapter\.deriveExportPackageMarkdownArtifact\(exportPackageSnapshot\);/,
  );
  assert.match(
    governanceIndexText,
    /function resolveExportPackageMarkdownArtifactAdapter\(\s*exportPackageMarkdownArtifactSnapshot,\s*currentExportPackageSnapshot,\s*\)\s*\{/,
  );
  assert.match(
    governanceIndexText,
    /const currentExportPackageAdapter = getExportPackageMarkdownArtifactAdapter\([\s\S]*currentExportPackageSnapshot\.jurisdiction_profile_key,[\s\S]*?\);/,
  );
  assert.match(
    governanceIndexText,
    /for \(const adapter of Object\.values\(exportPackageMarkdownArtifactAdapterRegistry\)\) \{/,
  );
  assert.match(
    governanceIndexText,
    /adapter\.deriveExportPackageFromMarkdownArtifact\(\s*exportPackageMarkdownArtifactSnapshot,\s*\);/,
  );
  assert.match(governanceIndexText, /return null;\s*\}/);
  assert.match(
    governanceIndexText,
    /function deriveExportPackageFromMarkdownArtifact\(\s*exportPackageMarkdownArtifactSnapshot\s*\)\s*\{/,
  );
  assert.match(
    governanceIndexText,
    /const adapter = resolveExportPackageMarkdownArtifactAdapter\(\s*exportPackageMarkdownArtifactSnapshot,\s*null,\s*\);/,
  );
  assert.match(
    governanceIndexText,
    /return adapter\.deriveExportPackageFromMarkdownArtifact\(\s*exportPackageMarkdownArtifactSnapshot,\s*\);/,
  );
  assert.match(
    governanceIndexText,
    /return defaultAdapter\.deriveExportPackageFromMarkdownArtifact\(\s*exportPackageMarkdownArtifactSnapshot,\s*\);/,
  );
  assert.match(
    governanceIndexText,
    /function resolveExportPackageMarkdownArtifactProjection\(\s*exportPackageMarkdownArtifactSnapshot,\s*currentExportPackageSnapshot,\s*currentProfileDossierSnapshot,\s*\)\s*\{/,
  );
  assert.match(
    governanceIndexText,
    /const adapter = resolveExportPackageMarkdownArtifactAdapter\(\s*exportPackageMarkdownArtifactSnapshot,\s*currentExportPackageSnapshot,\s*\);/,
  );
  assert.match(
    governanceIndexText,
    /return adapter\.resolveExportPackageMarkdownArtifactProjection\(\s*exportPackageMarkdownArtifactSnapshot,\s*currentExportPackageSnapshot,\s*currentProfileDossierSnapshot,\s*\);/,
  );
  assert.match(
    governanceIndexText,
    /assertSupportedJurisdictionProfileCapability\([\s\S]*currentExportPackageSnapshot\.jurisdiction_profile_key,[\s\S]*"export_package_markdown_artifact"[\s\S]*?\);/,
  );
  assert.match(
    governanceIndexText,
    /return defaultAdapter\.resolveExportPackageMarkdownArtifactProjection\(\s*exportPackageMarkdownArtifactSnapshot,\s*currentExportPackageSnapshot,\s*currentProfileDossierSnapshot,\s*\);/,
  );
  assert.match(governanceIndexText, /deriveExportPackageFromMarkdownArtifact,\n/);
  assert.match(governanceIndexText, /deriveExportPackageMarkdownArtifact,\n/);
  assert.match(governanceIndexText, /exportPackageMarkdownArtifactAdapterRegistry,\n/);
  assert.match(governanceIndexText, /getExportPackageMarkdownArtifactAdapter,\n/);
  assert.match(governanceIndexText, /resolveExportPackageMarkdownArtifactProjection,\n/);
  assert.doesNotMatch(
    governanceIndexText,
    /\n\s*resolveExportPackageMarkdownArtifactAdapter,\n/,
  );

  assert.deepEqual(
    collectLineMatches(governanceIndexText, /\bexportPackageMarkdownArtifactAdapterRegistry\b/),
    [
      2848,
      2861,
      2886,
      3922,
      3955,
      4423,
      5923,
    ],
  );
  assert.deepEqual(
    collectLineMatches(governanceIndexText, /\bgetExportPackageMarkdownArtifactAdapter\b/),
    [
      2853,
      2872,
      3913,
      5937,
    ],
  );
  assert.deepEqual(
    collectLineMatches(governanceIndexText, /\bderiveExportPackageMarkdownArtifact\b/),
    [
      2809,
      2841,
      2864,
      2883,
      2887,
      5876,
    ],
  );
  assert.deepEqual(
    collectLineMatches(governanceIndexText, /\bderiveExportPackageFromMarkdownArtifact\b/),
    [
      2810,
      2842,
      3925,
      3943,
      3950,
      3956,
      5871,
    ],
  );
  assert.deepEqual(
    collectLineMatches(governanceIndexText, /\bresolveExportPackageMarkdownArtifactProjection\b/),
    [
      2812,
      2844,
      4392,
      4403,
      4424,
      6021,
    ],
  );
  assert.deepEqual(
    collectLineMatches(governanceIndexText, /\bresolveExportPackageMarkdownArtifactAdapter\b/),
    [3902, 3944, 4397],
  );

  assert.match(
    markdownProjectionHelperFreezeTestText,
    /Shared Governance Markdown Artifact Projection Helper Seam Freeze/i,
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
    schemasMarkdownProjectionValidatorFreezeTestText,
    /shared packages\/schemas Markdown artifact projection-validator seam/i,
  );
  assert.match(
    schemasMarkdownValidatorFreezeTestText,
    /shared packages\/schemas Markdown artifact validator seam/i,
  );

  assert.match(
    adapterRegistryTestText,
    /the generic Markdown artifact adapter registry exposes the explicit CMD_PROFILE entry/i,
  );
  assert.match(
    adapterRegistryTestText,
    /const expectedViaRegistry = deriveExportPackageMarkdownArtifact\(exportPackage\);/,
  );
  assert.match(
    adapterRegistryTestText,
    /const expectedViaRegistry = resolveExportPackageMarkdownArtifactProjection\(/,
  );
  assert.match(
    adapterRegistryTestText,
    /adapter\.deriveExportPackageFromMarkdownArtifact\(markdownArtifactSnapshot\)/,
  );
  assert.match(
    adapterRegistryTestText,
    /deriveExportPackageFromMarkdownArtifact\(markdownArtifactSnapshot\)/,
  );
  assert.match(
    adapterRegistryTestText,
    /adapter\.resolveExportPackageMarkdownArtifactProjection\(/,
  );
  assert.match(
    projectionTestText,
    /resolveSWEBodelningExportPackageMarkdownArtifactProjection,/,
  );
  assert.match(
    projectionTestText,
    /const projection = resolveSWEBodelningExportPackageMarkdownArtifactProjection\(/,
  );
});
