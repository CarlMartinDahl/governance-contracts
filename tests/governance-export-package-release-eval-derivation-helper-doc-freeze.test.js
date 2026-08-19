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
const governanceTestText = fs.readFileSync(
  path.join(__dirname, "export-package-governance.test.js"),
  "utf8",
);

test("docs freeze the shared governance export-package release-eval derivation helper seam as the governance-side run-backed export-package boundary", () => {
  assert.match(
    docsText,
    /Shared Governance Export Package Release-Eval Derivation Helper Seam Freeze/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/governance\/src\/index\.js` export-package release-eval derivation helper pair `deriveSWEBodelningExportPackage` and `deriveCMDExportPackage` is the canonical internal governance-side export-package derivation-from-release-eval-backed state boundary for the current included governance flows below and is now frozen as the baseline seam/i,
  );
  assert.match(
    docsText,
    /the currently evidenced governed surfaces in this freeze are limited to:\s+`export_package` derivation from release-eval-backed input for `SWE_BODELNING`\s+`export_package` derivation from release-eval-backed input for `"CMD_PROFILE"`/i,
  );
  assert.match(
    docsText,
    /the currently concrete shared helper responsibilities already evidenced for this seam are limited to:\s+validating or canonicalizing incoming release-eval-backed input through the current profile-specific run-shape checks before export-package derivation\s+enforcing the existing export-package capability gate before returning a canonical export-package snapshot\s+delegating the canonical dossier-to-export-package construction to the already-frozen lower `deriveSWEBodelningExportPackageFromProfileDossierSnapshot` \/ `deriveCMDExportPackageFromProfileDossierSnapshot` helper seam\s+returning the resulting canonical export-package snapshot/i,
  );
  assert.match(
    docsText,
    /the current relationship to the lower profile-dossier-snapshot derivation seam already evidenced in `packages\/governance\/src\/index\.js` is limited to `deriveSWEBodelningExportPackage` forwarding `releaseEvalRun\.profile_dossier_snapshot` into `deriveSWEBodelningExportPackageFromProfileDossierSnapshot\(\.\.\.\)`, while `deriveCMDExportPackage` first resolves the dossier snapshot through `resolveCMDProfileDossierSnapshot\(releaseEvalRun, options\)` and forwards `release_eval_run_id`, `evaluator_version`, and `jurisdiction_profile_key` into `deriveCMDExportPackageFromProfileDossierSnapshot\(\.\.\.\)`/i,
  );
  assert.match(
    docsText,
    /the current relationship to the export-package projection-helper seam already evidenced in `packages\/governance\/src\/index\.js` is limited to the shared `sweBodelningExportPackageAdapter` and `cmdExportPackageAdapter` exposing both `deriveExportPackage` and `resolveExportPackageProjection` slots while keeping release-eval derivation and projection resolution as separate helper seams/i,
  );
  assert.match(
    docsText,
    /the current relationship to adapter \/ dispatcher wiring already evidenced in `packages\/governance\/src\/index\.js` is limited to the shared generic `deriveExportPackage` dispatcher falling back to the SWE helper when `jurisdiction_profile_key` is missing and otherwise routing through the same profile-specific adapter-slot pair/i,
  );
  assert.match(
    docsText,
    /the currently evidenced CMD\/SWE behavior differences inside this seam are limited to:\s+`deriveSWEBodelningExportPackage` first applies `assertPlainObject\(\.\.\.\)`, gates on `releaseEvalRun\.jurisdiction_profile_key`, and directly reuses `releaseEvalRun\.profile_dossier_snapshot`\s+`deriveCMDExportPackage` first canonicalizes the release-eval-backed input through `validateCMDReleaseEvalRunCore\(releaseEvalRun\)`, gates on `cmdProfileKey`, resolves the dossier snapshot through `resolveCMDProfileDossierSnapshot\(releaseEvalRun, options\)`, and forwards canonical-source fields through its options payload before delegating\s+the current named module export surface already exposes `deriveExportPackage` and `deriveSWEBodelningExportPackage`, while the CMD helper is currently only consumed internally by `deriveExportPackage` and the CMD adapter slot/i,
  );
  assert.match(
    docsText,
    /the current bounded reuse already evidenced in `packages\/governance\/src\/index\.js` is limited to 2 helper definitions, 2 profile-specific adapter-slot assignments, the shared generic `deriveExportPackage` dispatcher consuming those adapter slots with SWE fallback on missing profile keys, and the current named module export surface exposing `deriveExportPackage` and `deriveSWEBodelningExportPackage` while not exposing `deriveCMDExportPackage`/i,
  );
  assert.match(
    docsText,
    /the lower governance export-package derivation-from-profile-dossier-snapshot seam remains outside this helper seam because canonical dossier-to-export-package construction is a separate lower-boundary responsibility consumed by the wrapper pair rather than defined by it/i,
  );
  assert.match(
    docsText,
    /the shared governance export-package projection-helper seam remains outside this helper seam because projection object assembly, lower projection validation, and currentness attachment remain separate governance-side boundaries after release-eval derivation/i,
  );
  assert.match(
    docsText,
    /the shared governance export-package snapshot-status helper seam remains outside this helper seam because currentness comparison and `snapshot_status` assembly remain separate governance-side boundaries after release-eval derivation/i,
  );
  assert.match(
    docsText,
    /the shared governance `toCanonicalJson` helper seam remains outside this helper seam because canonical JSON serialization is a separate frozen boundary even where lower CMD subhelpers reached through delegation may rely on it/i,
  );
  assert.match(
    docsText,
    /the shared governance `buildStoredZip` helper seam remains outside this helper seam because ZIP container assembly is a separate frozen boundary/i,
  );
  assert.match(
    docsText,
    /the shared `createGovernanceError` helper seam remains outside this helper seam because machine-readable governance error construction is a separate frozen boundary even where lower CMD subhelpers reached through delegation may throw it/i,
  );
  assert.match(
    docsText,
    /the shared `assertSupportedJurisdictionProfileCapability` helper seam remains outside this helper seam because runtime supported-capability gating is a separate frozen boundary even where both wrapper helpers currently consume it/i,
  );
  assert.match(
    docsText,
    /the shared `assertPlainObject` helper seam remains outside this helper seam because governance-local object-shape gating is a separate frozen boundary even where the SWE helper and the generic dispatcher currently consume it/i,
  );
  assert.match(
    docsText,
    /the frozen broader governance export-artifact derivation and round-trip helper scaffold remains outside this helper seam because it owns the wider Markdown\/PDF\/DOCX derivation and round-trip area rather than this narrower release-eval wrapper pair/i,
  );
  assert.match(
    docsText,
    /downstream governance dispatch, adapter, artifact-derivation, and route\/runtime behavior remain outside this helper seam because they may call or route into the pair but do not define the canonical shared export-package derivation-from-release-eval-backed state boundary themselves/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, projection semantics, currentness semantics, derivation semantics, schema behavior, or fail-closed behavior/i,
  );

  assert.match(
    governanceIndexText,
    /function deriveSWEBodelningExportPackage\(\s*releaseEvalRun,\s*options = \{\}\s*\)/,
  );
  assert.match(
    governanceIndexText,
    /assertPlainObject\(releaseEvalRun, "ERR_RELEASE_EVAL_RUN_INVALID", "releaseEvalRun"\);/,
  );
  assert.match(
    governanceIndexText,
    /assertSupportedJurisdictionProfileCapability\(\s*releaseEvalRun\.jurisdiction_profile_key,\s*"export_package",\s*\);/,
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
    /const canonicalReleaseEvalRun = validateCMDReleaseEvalRunCore\(releaseEvalRun\);/,
  );
  assert.match(
    governanceIndexText,
    /assertSupportedJurisdictionProfileCapability\(cmdProfileKey, "export_package"\);/,
  );
  assert.match(
    governanceIndexText,
    /return deriveCMDExportPackageFromProfileDossierSnapshot\(\s*resolveCMDProfileDossierSnapshot\(releaseEvalRun, options\),\s*\{\s*\.\.\.options,\s*release_eval_run_id: canonicalReleaseEvalRun\.release_eval_run_id,\s*evaluator_version: canonicalReleaseEvalRun\.evaluator_version,\s*jurisdiction_profile_key: canonicalReleaseEvalRun\.jurisdiction_profile_key,\s*\},\s*\);/,
  );
  assert.match(
    governanceIndexText,
    /resolveCMDProfileDossierSnapshot\(releaseEvalRun, options\)/,
  );
  assert.match(
    governanceIndexText,
    /const sweBodelningExportPackageAdapter = Object\.freeze\(\{\s*jurisdiction_profile_key: supportedProfileKey,[\s\S]*deriveExportPackage:\s*deriveSWEBodelningExportPackage,[\s\S]*resolveExportPackageProjection:\s*resolveSWEBodelningExportPackageProjection,\s*\}\);/,
  );
  assert.match(
    governanceIndexText,
    /const cmdExportPackageAdapter = Object\.freeze\(\{\s*jurisdiction_profile_key: cmdProfileKey,[\s\S]*deriveExportPackage:\s*deriveCMDExportPackage,[\s\S]*resolveExportPackageProjection:\s*resolveCMDExportPackageProjection,\s*\}\);/,
  );
  assert.match(
    governanceIndexText,
    /function deriveExportPackage\(\s*releaseEvalRun,\s*options = \{\}\s*\)/,
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
    /deriveExportPackage,/,
  );
  assert.match(
    governanceIndexText,
    /deriveSWEBodelningExportPackage,/,
  );
  assert.doesNotMatch(
    governanceIndexText,
    /\n\s*deriveCMDExportPackage,\n/,
  );

  assert.equal(
    (
      governanceIndexText.match(/function deriveSWEBodelningExportPackage\(/g) || []
    ).length,
    1,
  );
  assert.equal(
    (governanceIndexText.match(/function deriveCMDExportPackage\(/g) || []).length,
    1,
  );

  const governanceLines = governanceIndexText.split("\n");
  const sweLines = [];
  const cmdLines = [];
  for (let index = 0; index < governanceLines.length; index += 1) {
    if (/\bderiveSWEBodelningExportPackage\b/.test(governanceLines[index])) {
      sweLines.push(index + 1);
    }
    if (/\bderiveCMDExportPackage\b/.test(governanceLines[index])) {
      cmdLines.push(index + 1);
    }
  }

  assert.deepEqual(sweLines, [
    1669,
    1840,
    1912,
    5878,
  ]);
  assert.deepEqual(cmdLines, [
    1770,
    1848,
  ]);

  assert.match(
    derivationHelperFreezeTestText,
    /Shared Governance Export Package Derivation Helper Seam Freeze/i,
  );
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
    governanceTestText,
    /deriveSWEBodelningExportPackage,/,
  );
  assert.match(
    governanceTestText,
    /const exportPackage = deriveSWEBodelningExportPackage\(/,
  );
  assert.match(
    adapterRegistryTestText,
    /assert\.equal\(typeof cmdAdapter\.deriveExportPackage, "function"\);/,
  );
  assert.match(
    adapterRegistryTestText,
    /const expectedViaRunRegistry = deriveExportPackage\(/,
  );
  assert.match(
    adapterRegistryTestText,
    /const expectedDirectViaRun = deriveSWEBodelningExportPackage\(/,
  );
  assert.match(
    adapterRegistryTestText,
    /const exportPackageFromRun = deriveExportPackage\(/,
  );
  assert.match(
    adapterRegistryTestText,
    /assert\.deepEqual\(exportPackageFromRun, exportPackageSnapshot\);/,
  );
});
