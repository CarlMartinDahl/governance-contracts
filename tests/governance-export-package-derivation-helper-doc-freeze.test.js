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
const projectionHelperFreezeTestText = fs.readFileSync(
  path.join(__dirname, "governance-export-package-projection-helper-doc-freeze.test.js"),
  "utf8",
);
const snapshotStatusHelperFreezeTestText = fs.readFileSync(
  path.join(
    __dirname,
    "governance-export-package-snapshot-status-helper-doc-freeze.test.js",
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
  path.join(__dirname, "export-package-adapter-registry.test.js"),
  "utf8",
);
const governanceProjectionTestText = fs.readFileSync(
  path.join(__dirname, "export-package-governance.test.js"),
  "utf8",
);

test("docs freeze the shared governance export-package derivation helper seam as the governance-side dossier-to-export-package boundary", () => {
  assert.match(
    docsText,
    /Shared Governance Export Package Derivation Helper Seam Freeze/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/governance\/src\/index\.js` export-package derivation helper pair `deriveSWEBodelningExportPackageFromProfileDossierSnapshot` and `deriveCMDExportPackageFromProfileDossierSnapshot` is the canonical internal governance-side export-package derivation-from-profile-dossier-snapshot boundary for the current included governance flows below and is now frozen as the baseline seam/i,
  );
  assert.match(
    docsText,
    /the currently evidenced governed surfaces in this freeze are limited to:\s+`export_package` derivation from a `profile_dossier_snapshot` for `SWE_BODELNING`\s+`export_package` derivation from a `profile_dossier_snapshot` for `"CMD_PROFILE"`/i,
  );
  assert.match(
    docsText,
    /the currently concrete shared helper responsibilities already evidenced for this seam are limited to:\s+validating and canonicalizing incoming profile-dossier snapshots through the existing profile-specific dossier validators before export-package construction\s+enforcing the existing export-package capability gate before returning a canonical export-package snapshot\s+deriving the canonical export-package fields from the canonical profile-dossier snapshot plus derivation options: `jurisdiction_profile_key`, `export_version`, `dossier_fingerprint`, `canonical_source`, `profile_dossier_snapshot`, `generated_at`, and `manifest`\s+returning the resulting canonical export-package snapshot/i,
  );
  assert.match(
    docsText,
    /the current relationship to the export-package projection-helper seam already evidenced in `packages\/governance\/src\/index\.js` is limited to the shared `sweBodelningExportPackageAdapter` and `cmdExportPackageAdapter` exposing both `deriveExportPackageFromProfileDossierSnapshot` and `resolveExportPackageProjection` slots while keeping derivation and projection resolution as separate helper seams/i,
  );
  assert.match(
    docsText,
    /the current relationship to the export-package snapshot-status helper seam already evidenced in `packages\/governance\/src\/index\.js` is limited to producing canonical export-package snapshots with `export_version` and `dossier_fingerprint` fields that the separate snapshot-status helpers later compare; no `snapshot_status` derivation occurs in this helper pair/i,
  );
  assert.match(
    docsText,
    /the current relationship to adapter \/ dispatcher wiring already evidenced in `packages\/governance\/src\/index\.js` is limited to the shared generic `deriveExportPackageFromProfileDossierSnapshot` dispatcher falling back to the SWE helper when `jurisdiction_profile_key` is missing and otherwise routing through the same profile-specific adapter-slot pair/i,
  );
  assert.match(
    docsText,
    /the currently evidenced CMD\/SWE behavior differences inside this seam are limited to:\s+`deriveSWEBodelningExportPackageFromProfileDossierSnapshot` first applies `assertPlainObject\(\.\.\.\)`, reuses `canonicalProfileDossierSnapshot\.dossier_fingerprint`, and reuses `canonicalProfileDossierSnapshot\.canonical_source`\s+`deriveCMDExportPackageFromProfileDossierSnapshot` derives `dossier_fingerprint` through `deriveCMDExportPackageDossierFingerprint\(canonicalProfileDossierSnapshot\)`, derives `canonical_source` through `deriveCMDExportPackageCanonicalSource\(options\)`, and final-normalizes the result through `validateCMDExportPackage\(\.\.\.\)`\s+the current named module export surface already exposes `deriveSWEBodelningExportPackageFromProfileDossierSnapshot`, while the CMD helper is currently only consumed internally by `deriveCMDExportPackage` and the CMD adapter slot/i,
  );
  assert.match(
    docsText,
    /the current bounded reuse already evidenced in `packages\/governance\/src\/index\.js` is limited to 2 helper definitions, 2 release-eval wrapper call sites, 2 profile-specific adapter-slot assignments, the shared generic `deriveExportPackageFromProfileDossierSnapshot` dispatcher consuming those adapter slots with SWE fallback on missing profile keys, and the current named module export surface exposing only `deriveSWEBodelningExportPackageFromProfileDossierSnapshot`/i,
  );
  assert.match(
    docsText,
    /the shared governance export-package projection-helper seam remains outside this helper seam because projection object assembly, lower projection validation, and currentness attachment remain separate governance-side boundaries after derivation/i,
  );
  assert.match(
    docsText,
    /the shared governance export-package snapshot-status helper seam remains outside this helper seam because currentness comparison and `snapshot_status` assembly remain separate governance-side boundaries after derivation/i,
  );
  assert.match(
    docsText,
    /the shared governance `toCanonicalJson` helper seam remains outside this helper seam because canonical JSON serialization is a separate frozen boundary even where the CMD helper currently consumes dossier-fingerprint and canonical-source subhelpers that rely on it/i,
  );
  assert.match(
    docsText,
    /the shared governance `buildStoredZip` helper seam remains outside this helper seam because ZIP container assembly is a separate frozen boundary/i,
  );
  assert.match(
    docsText,
    /the shared `createGovernanceError` helper seam remains outside this helper seam because machine-readable governance error construction is a separate frozen boundary even where the CMD helper currently consumes the canonical-source subhelper that may throw it/i,
  );
  assert.match(
    docsText,
    /the shared `assertSupportedJurisdictionProfileCapability` helper seam remains outside this helper seam because runtime supported-capability gating is a separate frozen boundary even where both helpers currently consume it/i,
  );
  assert.match(
    docsText,
    /the shared `assertPlainObject` helper seam remains outside this helper seam because governance-local object-shape gating is a separate frozen boundary even where the SWE helper and the generic dispatcher currently consume it/i,
  );
  assert.match(
    docsText,
    /the frozen broader governance export-artifact derivation and round-trip helper scaffold remains outside this helper seam because it owns the wider Markdown\/PDF\/DOCX derivation and round-trip area rather than this narrower export-package derivation pair/i,
  );
  assert.match(
    docsText,
    /downstream governance dispatch, adapter, artifact-derivation, and route\/runtime behavior remain outside this helper seam because they may call or route into the pair but do not define the canonical shared export-package derivation-from-profile-dossier-snapshot boundary themselves/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, projection semantics, currentness semantics, derivation semantics, schema behavior, or fail-closed behavior/i,
  );

  assert.match(
    governanceIndexText,
    /function deriveSWEBodelningExportPackageFromProfileDossierSnapshot\(\s*profileDossierSnapshot,\s*options = \{\},\s*\) \{\s*assertPlainObject\(\s*profileDossierSnapshot,\s*"ERR_PROFILE_DOSSIER_SNAPSHOT_INVALID",\s*"profile_dossier_snapshot",\s*\);\s*const canonicalProfileDossierSnapshot = validateSWEBodelningProfileDossierSnapshot\(\s*profileDossierSnapshot,\s*\);\s*assertSupportedJurisdictionProfileCapability\(\s*canonicalProfileDossierSnapshot\.jurisdiction_profile_key,\s*"export_package",\s*\);\s*return \{\s*jurisdiction_profile_key: supportedProfileKey,\s*export_version: exportPackageVersion,\s*dossier_fingerprint: canonicalProfileDossierSnapshot\.dossier_fingerprint,\s*canonical_source: canonicalProfileDossierSnapshot\.canonical_source,\s*profile_dossier_snapshot: canonicalProfileDossierSnapshot,\s*generated_at: resolveSWEBodelningExportPackageGeneratedAt\(options\),\s*manifest: deriveSWEBodelningExportPackageManifest\(\),\s*\};\s*\}/,
  );
  assert.match(
    governanceIndexText,
    /function deriveCMDExportPackageFromProfileDossierSnapshot\(\s*profileDossierSnapshot,\s*options = \{\},\s*\) \{\s*const canonicalProfileDossierSnapshot = validateCMDProfileDossierSnapshot\(\s*profileDossierSnapshot,\s*\);\s*assertSupportedJurisdictionProfileCapability\(cmdProfileKey, "export_package"\);\s*return validateCMDExportPackage\(\{\s*jurisdiction_profile_key: cmdProfileKey,\s*export_version: cmdExportPackageVersion,\s*dossier_fingerprint: deriveCMDExportPackageDossierFingerprint\(\s*canonicalProfileDossierSnapshot,\s*\),\s*canonical_source: deriveCMDExportPackageCanonicalSource\(options\),\s*profile_dossier_snapshot: canonicalProfileDossierSnapshot,\s*generated_at: resolveSWEBodelningExportPackageGeneratedAt\(options\),\s*manifest: deriveCMDExportPackageManifest\(\),\s*\}\);\s*\}/,
  );
  assert.match(
    governanceIndexText,
    /function deriveSWEBodelningExportPackage\(\s*releaseEvalRun,\s*options = \{\}\s*\)/,
  );
  assert.match(
    governanceIndexText,
    /return deriveSWEBodelningExportPackageFromProfileDossierSnapshot\(\s*releaseEvalRun\.profile_dossier_snapshot,\s*options,\s*\);/,
  );
  assert.match(
    governanceIndexText,
    /function deriveCMDExportPackage\(\s*releaseEvalRun,\s*options = \{\}\s*\)/,
  );
  assert.match(
    governanceIndexText,
    /return deriveCMDExportPackageFromProfileDossierSnapshot\(\s*resolveCMDProfileDossierSnapshot\(releaseEvalRun, options\),[\s\S]*\);/,
  );
  assert.match(
    governanceIndexText,
    /const sweBodelningExportPackageAdapter = Object\.freeze\(\{\s*jurisdiction_profile_key: supportedProfileKey,[\s\S]*deriveExportPackageFromProfileDossierSnapshot:\s*deriveSWEBodelningExportPackageFromProfileDossierSnapshot,[\s\S]*resolveExportPackageProjection:\s*resolveSWEBodelningExportPackageProjection,\s*\}\);/,
  );
  assert.match(
    governanceIndexText,
    /const cmdExportPackageAdapter = Object\.freeze\(\{\s*jurisdiction_profile_key: cmdProfileKey,[\s\S]*deriveExportPackageFromProfileDossierSnapshot:\s*deriveCMDExportPackageFromProfileDossierSnapshot,[\s\S]*resolveExportPackageProjection:\s*resolveCMDExportPackageProjection,\s*\}\);/,
  );
  assert.match(
    governanceIndexText,
    /function deriveExportPackageFromProfileDossierSnapshot\(\s*profileDossierSnapshot,\s*options = \{\},\s*\) \{\s*assertPlainObject\(\s*profileDossierSnapshot,\s*"ERR_PROFILE_DOSSIER_SNAPSHOT_INVALID",\s*"profile_dossier_snapshot",\s*\);[\s\S]*return deriveSWEBodelningExportPackageFromProfileDossierSnapshot\(\s*profileDossierSnapshot,\s*options,\s*\);[\s\S]*const adapter = getExportPackageAdapter\(\s*profileDossierSnapshot\.jurisdiction_profile_key,\s*\);[\s\S]*return adapter\.deriveExportPackageFromProfileDossierSnapshot\(\s*profileDossierSnapshot,\s*options,\s*\);/,
  );
  assert.match(
    governanceIndexText,
    /deriveSWEBodelningExportPackageFromProfileDossierSnapshot,/,
  );

  assert.equal(
    (
      governanceIndexText.match(
        /function deriveSWEBodelningExportPackageFromProfileDossierSnapshot\(/g,
      ) || []
    ).length,
    1,
  );
  assert.equal(
    (
      governanceIndexText.match(
        /function deriveCMDExportPackageFromProfileDossierSnapshot\(/g,
      ) || []
    ).length,
    1,
  );

  const governanceLines = governanceIndexText.split("\n");
  const sweLines = [];
  const cmdLines = [];
  for (let index = 0; index < governanceLines.length; index += 1) {
    if (
      governanceLines[index].includes(
        "deriveSWEBodelningExportPackageFromProfileDossierSnapshot",
      )
    ) {
      sweLines.push(index + 1);
    }
    if (
      governanceLines[index].includes(
        "deriveCMDExportPackageFromProfileDossierSnapshot",
      )
    ) {
      cmdLines.push(index + 1);
    }
  }

  assert.deepEqual(sweLines, [
    1639,
    1677,
    1839,
    1882,
    5896,
  ]);
  assert.deepEqual(cmdLines, [
    1747,
    1775,
    1847,
  ]);

  assert.match(
    projectionHelperFreezeTestText,
    /Shared Governance Export Package Projection Helper Seam Freeze/i,
  );
  assert.match(
    snapshotStatusHelperFreezeTestText,
    /Shared Governance Export Package Snapshot-Status Helper Seam Freeze/i,
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
    governanceProjectionTestText,
    /deriveSWEBodelningExportPackage,/,
  );
  assert.match(
    governanceProjectionTestText,
    /const exportPackage = deriveSWEBodelningExportPackage\(/,
  );
  assert.match(
    adapterRegistryTestText,
    /const expectedViaRegistry = deriveExportPackageFromProfileDossierSnapshot\(/,
  );
  assert.match(
    adapterRegistryTestText,
    /const expectedViaRunRegistry = deriveExportPackage\(/,
  );
  assert.match(
    adapterRegistryTestText,
    /const expectedDirect = deriveSWEBodelningExportPackageFromProfileDossierSnapshot\(/,
  );
  assert.match(
    adapterRegistryTestText,
    /const exportPackageSnapshot = deriveExportPackageFromProfileDossierSnapshot\(/,
  );
  assert.match(
    adapterRegistryTestText,
    /const exportPackageFromRun = deriveExportPackage\(/,
  );
});
