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
const governanceProjectionTestText = fs.readFileSync(
  path.join(__dirname, "export-package-governance.test.js"),
  "utf8",
);
const adapterRegistryTestText = fs.readFileSync(
  path.join(__dirname, "export-package-adapter-registry.test.js"),
  "utf8",
);

test("docs freeze the shared governance export-package snapshot-status helper seam as the governance-side currentness derivation boundary", () => {
  assert.match(
    docsText,
    /Shared Governance Export Package Snapshot-Status Helper Seam Freeze/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/governance\/src\/index\.js` export-package snapshot-status helper pair `deriveSWEBodelningExportPackageSnapshotStatus` and `deriveCMDExportPackageSnapshotStatus` is the canonical internal governance-side export-package snapshot-status derivation boundary for the current included governance flows below and is now frozen as the baseline seam/i,
  );
  assert.match(
    docsText,
    /the currently evidenced governed surfaces in this freeze are limited to:\s+`export_package` snapshot-status derivation for `SWE_BODELNING`\s+`export_package` snapshot-status derivation for `"CMD_PROFILE"`/i,
  );
  assert.match(
    docsText,
    /the currently concrete shared helper responsibilities already evidenced for this seam are limited to:\s+validating incoming export-package snapshots through the lower schemas export-package validator pair before currentness comparison\s+deriving a current dossier fingerprint from the current profile dossier snapshot only when that input is object-shaped, otherwise falling back to `null`\s+comparing canonical export-package identity against the current export-version constant plus the current dossier fingerprint to derive `source`, `snapshot_export_version_found`, `current_export_version`, and `snapshot_is_current`\s+returning the resulting `snapshot_status` object/i,
  );
  assert.match(
    docsText,
    /the current relationship to the export-package projection-helper seam already evidenced in `packages\/governance\/src\/index\.js` is limited to `resolveSWEBodelningExportPackageProjection` and `resolveCMDExportPackageProjection` consuming `deriveSWEBodelningExportPackageSnapshotStatus` and `deriveCMDExportPackageSnapshotStatus` while assembling the final projection objects; projection assembly, capability gating, and any lower projection validation remain in the separate projection-helper seam rather than this helper pair/i,
  );
  assert.match(
    docsText,
    /the current relationship to currentness \/ export-version semantics already evidenced in `packages\/governance\/src\/index\.js` is limited to comparing `canonicalExportPackage\.export_version` against `exportPackageVersion` for SWE and `cmdExportPackageVersion` for CMD, comparing the canonical dossier fingerprint against the current dossier fingerprint, and mapping that result to the existing `persisted-current` \/ `persisted-stale` `source` values plus the boolean `snapshot_is_current`/i,
  );
  assert.match(
    docsText,
    /the currently evidenced CMD\/SWE behavior differences inside this seam are limited to:\s+`deriveCMDExportPackageSnapshotStatus` derives the current dossier fingerprint through `deriveCMDExportPackageDossierFingerprint\(currentProfileDossierSnapshot\)` while `deriveSWEBodelningExportPackageSnapshotStatus` derives it through `validateSWEBodelningProfileDossierSnapshot\(currentProfileDossierSnapshot\)\.dossier_fingerprint`\s+`deriveCMDExportPackageSnapshotStatus` uses `cmdExportPackageVersion` while `deriveSWEBodelningExportPackageSnapshotStatus` uses `exportPackageVersion`\s+the current named module export surface already exposes `deriveSWEBodelningExportPackageSnapshotStatus`, while the CMD helper is currently only consumed internally by `resolveCMDExportPackageProjection`/i,
  );
  assert.match(
    docsText,
    /the current bounded reuse already evidenced in `packages\/governance\/src\/index\.js` is limited to 2 helper definitions, 2 export-package projection-helper call sites, and the current named module export surface exposing only `deriveSWEBodelningExportPackageSnapshotStatus`/i,
  );
  assert.match(
    docsText,
    /the lower schemas export-package validator seam remains outside this helper seam because lower export-package snapshot validation is a separate lower-boundary responsibility consumed by the helper pair rather than defined by it/i,
  );
  assert.match(
    docsText,
    /the shared governance export-package projection-helper seam remains outside this helper seam because projection object assembly, adapter-slot routing, generic dispatch, and lower projection validation remain separate governance-side boundaries above snapshot-status derivation/i,
  );
  assert.match(
    docsText,
    /the shared governance `toCanonicalJson` helper seam remains outside this helper seam because canonical JSON serialization is a separate frozen boundary/i,
  );
  assert.match(
    docsText,
    /the shared governance `buildStoredZip` helper seam remains outside this helper seam because ZIP container assembly is a separate frozen boundary/i,
  );
  assert.match(
    docsText,
    /the shared `createGovernanceError` helper seam remains outside this helper seam because machine-readable governance error construction is a separate frozen boundary/i,
  );
  assert.match(
    docsText,
    /the shared `assertSupportedJurisdictionProfileCapability` helper seam remains outside this helper seam because runtime supported-capability gating is a separate frozen boundary even where the CMD projection helper currently consumes it after this seam/i,
  );
  assert.match(
    docsText,
    /the shared `assertPlainObject` helper seam remains outside this helper seam because governance-local object-shape gating is a separate frozen boundary even where projection dispatch may consume it before this seam is reached/i,
  );
  assert.match(
    docsText,
    /the frozen broader governance export-artifact derivation and round-trip helper scaffold remains outside this helper seam because it owns the wider Markdown\/PDF\/DOCX derivation and round-trip area rather than this narrower export-package snapshot-status pair/i,
  );
  assert.match(
    docsText,
    /downstream governance dispatch, adapter, artifact-derivation, and route\/runtime behavior remain outside this helper seam because they may call or route into the pair but do not define the canonical shared export-package snapshot-status derivation boundary themselves/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, projection semantics, currentness semantics, derivation semantics, schema behavior, or fail-closed behavior/i,
  );

  assert.match(
    governanceIndexText,
    /function deriveCMDExportPackageSnapshotStatus\(\s*exportPackageSnapshot,\s*currentProfileDossierSnapshot,\s*\) \{\s*const canonicalExportPackage = validateCMDExportPackage\(exportPackageSnapshot\);\s*let currentDossierFingerprint = null;[\s\S]*currentDossierFingerprint = deriveCMDExportPackageDossierFingerprint\(\s*currentProfileDossierSnapshot,\s*\);[\s\S]*const snapshotIsCurrent =\s*canonicalExportPackage\.export_version === cmdExportPackageVersion &&\s*canonicalExportPackage\.dossier_fingerprint === currentDossierFingerprint;[\s\S]*source: snapshotIsCurrent \? "persisted-current" : "persisted-stale",[\s\S]*snapshot_export_version_found: canonicalExportPackage\.export_version,[\s\S]*current_export_version: cmdExportPackageVersion,[\s\S]*snapshot_is_current: snapshotIsCurrent,[\s\S]*\}/,
  );
  assert.match(
    governanceIndexText,
    /function deriveSWEBodelningExportPackageSnapshotStatus\(\s*exportPackageSnapshot,\s*currentProfileDossierSnapshot,\s*\) \{\s*const canonicalExportPackage = validateSWEBodelningExportPackage\(\s*exportPackageSnapshot,\s*\);\s*let currentDossierFingerprint = null;[\s\S]*currentDossierFingerprint = validateSWEBodelningProfileDossierSnapshot\(\s*currentProfileDossierSnapshot,\s*\)\.dossier_fingerprint;[\s\S]*const snapshotIsCurrent =\s*canonicalExportPackage\.export_version === exportPackageVersion &&\s*canonicalExportPackage\.dossier_fingerprint === currentDossierFingerprint;[\s\S]*source: snapshotIsCurrent \? "persisted-current" : "persisted-stale",[\s\S]*snapshot_export_version_found: canonicalExportPackage\.export_version,[\s\S]*current_export_version: exportPackageVersion,[\s\S]*snapshot_is_current: snapshotIsCurrent,[\s\S]*\}/,
  );
  assert.match(
    governanceIndexText,
    /function resolveCMDExportPackageProjection\([\s\S]*snapshot_status: deriveCMDExportPackageSnapshotStatus\(\s*canonicalExportPackage,\s*currentProfileDossierSnapshot,\s*\)/,
  );
  assert.match(
    governanceIndexText,
    /function resolveSWEBodelningExportPackageProjection\([\s\S]*snapshot_status: deriveSWEBodelningExportPackageSnapshotStatus\(\s*canonicalExportPackage,\s*currentProfileDossierSnapshot,\s*\)/,
  );
  assert.match(
    governanceIndexText,
    /deriveSWEBodelningExportPackageSnapshotStatus,/,
  );

  assert.equal(
    (
      governanceIndexText.match(
        /function deriveSWEBodelningExportPackageSnapshotStatus\(/g,
      ) || []
    ).length,
    1,
  );
  assert.equal(
    (
      governanceIndexText.match(/function deriveCMDExportPackageSnapshotStatus\(/g) ||
      []
    ).length,
    1,
  );

  const governanceLines = governanceIndexText.split("\n");
  const sweLines = [];
  const cmdLines = [];
  for (let index = 0; index < governanceLines.length; index += 1) {
    if (
      governanceLines[index].includes(
        "deriveSWEBodelningExportPackageSnapshotStatus",
      )
    ) {
      sweLines.push(index + 1);
    }
    if (
      governanceLines[index].includes("deriveCMDExportPackageSnapshotStatus")
    ) {
      cmdLines.push(index + 1);
    }
  }

  assert.deepEqual(sweLines, [
    4746,
    4791,
    5902,
  ]);
  assert.deepEqual(cmdLines, [
    1786,
    1829,
  ]);

  assert.match(
    projectionHelperFreezeTestText,
    /deriveSWEBodelningExportPackageSnapshotStatus/,
  );
  assert.match(
    projectionHelperFreezeTestText,
    /deriveCMDExportPackageSnapshotStatus/,
  );
  assert.match(
    governanceProjectionTestText,
    /deriveSWEBodelningExportPackageSnapshotStatus,/,
  );
  assert.match(
    governanceProjectionTestText,
    /deriveSWEBodelningExportPackageSnapshotStatus\(/,
  );
  assert.match(
    adapterRegistryTestText,
    /resolveExportPackageProjection\(/,
  );
  assert.match(
    adapterRegistryTestText,
    /snapshot_status: \{\s*source: "persisted-current",\s*snapshot_export_version_found: deriveCMDExportPackageVersion\(\),\s*current_export_version: deriveCMDExportPackageVersion\(\),\s*snapshot_is_current: true,\s*\}/,
  );
});
