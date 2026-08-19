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
const projectionTestText = fs.readFileSync(
  path.join(__dirname, "export-package-governance.test.js"),
  "utf8",
);
const adapterRegistryTestText = fs.readFileSync(
  path.join(__dirname, "export-package-adapter-registry.test.js"),
  "utf8",
);

test("docs freeze the shared governance export-package projection helper seam as the governance-side projection-resolution boundary", () => {
  assert.match(
    docsText,
    /Shared Governance Export Package Projection Helper Seam Freeze/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/governance\/src\/index\.js` export-package projection helper pair `resolveSWEBodelningExportPackageProjection` and `resolveCMDExportPackageProjection` is the canonical internal governance-side export-package projection-resolution boundary for the current included governance flows below and is now frozen as the baseline seam/i,
  );
  assert.match(
    docsText,
    /the currently evidenced governed surfaces in this freeze are limited to:\s+`export_package` projection resolution for `SWE_BODELNING`\s+`export_package` projection resolution for `"CMD_PROFILE"`/i,
  );
  assert.match(
    docsText,
    /the currently concrete shared helper responsibilities already evidenced for this seam are limited to:\s+validating incoming export-package snapshots through the lower schemas export-package validator pair before governance-side projection assembly\s+deriving projection-level `snapshot_status` through the existing profile-specific export-package snapshot-status helpers from the validated export-package snapshot plus the current profile dossier snapshot\s+delegating final projection validation and normalization to the lower schemas CMD export-package projection-validator helper where already present\s+returning the resulting governance-side projection object/i,
  );
  assert.match(
    docsText,
    /the current relationship to the lower schemas export-package projection-validator seam already evidenced in `packages\/governance\/src\/index\.js` is limited to `resolveCMDExportPackageProjection` calling `validateCMDExportPackageProjection` after governance-side `snapshot_status` derivation; `resolveSWEBodelningExportPackageProjection` currently returns the canonical export-package snapshot plus derived `snapshot_status` directly, and the resulting SWE projection shape is instead corroborated by existing governance\/runtime tests that validate it through `validateSWEBodelningExportPackageProjection`/i,
  );
  assert.match(
    docsText,
    /the current relationship to the lower schemas export-package validator seam already evidenced in `packages\/governance\/src\/index\.js` is limited to `resolveSWEBodelningExportPackageProjection` and `resolveCMDExportPackageProjection` calling `validateSWEBodelningExportPackage` and `validateCMDExportPackage` before projection assembly/i,
  );
  assert.match(
    docsText,
    /the current relationship to projection\/currentness semantics already evidenced in `packages\/governance\/src\/index\.js` is limited to consuming `deriveSWEBodelningExportPackageSnapshotStatus` and `deriveCMDExportPackageSnapshotStatus` and attaching their resulting `snapshot_status` blocks to the returned governance-side projection objects/i,
  );
  assert.match(
    docsText,
    /the current relationship to runtime capability gating already evidenced in `packages\/governance\/src\/index\.js` is limited to `resolveCMDExportPackageProjection` calling `assertSupportedJurisdictionProfileCapability\(cmdProfileKey, "export_package"\)` before lower schemas CMD projection validation; the shared capability-guard boundary itself remains separate/i,
  );
  assert.match(
    docsText,
    /the current bounded reuse already evidenced in `packages\/governance\/src\/index\.js` is limited to 2 helper definitions, 2 profile-specific adapter-slot assignments, the shared generic `resolveExportPackageProjection` dispatcher consuming those adapter slots, and the current named module export surface already exposing `resolveSWEBodelningExportPackageProjection`/i,
  );
  assert.match(
    docsText,
    /the lower schemas export-package projection-validator seam remains outside this helper seam because schema-side projection normalization and projection-shape enforcement are separate lower-boundary responsibilities even where the CMD helper currently consumes `validateCMDExportPackageProjection` and the SWE path is only corroborated through supporting tests/i,
  );
  assert.match(
    docsText,
    /the lower schemas export-package validator seam remains outside this helper seam because lower export-package snapshot validation is a separate lower-boundary responsibility consumed by the helper pair rather than defined by it/i,
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
    /the shared `assertSupportedJurisdictionProfileCapability` helper seam remains outside this helper seam because runtime supported-capability gating is a separate frozen boundary even where the CMD helper currently consumes it/i,
  );
  assert.match(
    docsText,
    /the shared `assertPlainObject` helper seam remains outside this helper seam because governance-local object-shape gating is a separate frozen boundary/i,
  );
  assert.match(
    docsText,
    /the frozen broader governance export-artifact derivation and round-trip helper scaffold remains outside this helper seam because it owns the wider Markdown\/PDF\/DOCX derivation and round-trip area beyond this narrower export-package projection-resolution pair/i,
  );
  assert.match(
    docsText,
    /downstream governance adapter-dispatch, artifact-derivation, and route\/runtime behavior remain outside this helper seam because they may call or route into the pair but do not define the canonical shared governance export-package projection-resolution boundary themselves/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, projection semantics, currentness semantics, derivation semantics, schema behavior, or fail-closed behavior/i,
  );

  assert.match(
    governanceIndexText,
    /function resolveCMDExportPackageProjection\(\s*exportPackageSnapshot,\s*currentProfileDossierSnapshot,\s*\) \{\s*const canonicalExportPackage = validateCMDExportPackage\(exportPackageSnapshot\);\s*assertSupportedJurisdictionProfileCapability\(cmdProfileKey, "export_package"\);\s*return validateCMDExportPackageProjection\(\{\s*\.\.\.canonicalExportPackage,\s*snapshot_status: deriveCMDExportPackageSnapshotStatus\(\s*canonicalExportPackage,\s*currentProfileDossierSnapshot,\s*\),\s*\}\);\s*\}/,
  );
  assert.match(
    governanceIndexText,
    /function resolveSWEBodelningExportPackageProjection\(\s*exportPackageSnapshot,\s*currentProfileDossierSnapshot,\s*\) \{\s*const canonicalExportPackage = validateSWEBodelningExportPackage\(\s*exportPackageSnapshot,\s*\);\s*return \{\s*\.\.\.canonicalExportPackage,\s*snapshot_status: deriveSWEBodelningExportPackageSnapshotStatus\(\s*canonicalExportPackage,\s*currentProfileDossierSnapshot,\s*\),\s*\};\s*\}/,
  );
  assert.match(
    governanceIndexText,
    /const sweBodelningExportPackageAdapter = Object\.freeze\(\{\s*jurisdiction_profile_key: supportedProfileKey,[\s\S]*resolveExportPackageProjection:\s*resolveSWEBodelningExportPackageProjection,\s*\}\);/,
  );
  assert.match(
    governanceIndexText,
    /const cmdExportPackageAdapter = Object\.freeze\(\{\s*jurisdiction_profile_key: cmdProfileKey,[\s\S]*resolveExportPackageProjection:\s*resolveCMDExportPackageProjection,\s*\}\);/,
  );
  assert.match(
    governanceIndexText,
    /function resolveExportPackageProjection\(\s*exportPackageSnapshot,\s*currentProfileDossierSnapshot,\s*\) \{\s*assertPlainObject\(\s*exportPackageSnapshot,\s*"ERR_EXPORT_PACKAGE_INVALID",\s*"exportPackageSnapshot",\s*\);[\s\S]*return adapter\.resolveExportPackageProjection\(\s*exportPackageSnapshot,\s*currentProfileDossierSnapshot,\s*\);/,
  );
  assert.match(
    governanceIndexText,
    /resolveSWEBodelningExportPackageProjection,/,
  );

  assert.equal(
    (
      governanceIndexText.match(
        /function resolveSWEBodelningExportPackageProjection\(/g,
      ) || []
    ).length,
    1,
  );
  assert.equal(
    (
      governanceIndexText.match(/function resolveCMDExportPackageProjection\(/g) ||
      []
    ).length,
    1,
  );

  const governanceLines = governanceIndexText.split("\n");
  const sweLines = [];
  const cmdLines = [];
  for (let index = 0; index < governanceLines.length; index += 1) {
    if (governanceLines[index].includes("resolveSWEBodelningExportPackageProjection")) {
      sweLines.push(index + 1);
    }
    if (governanceLines[index].includes("resolveCMDExportPackageProjection")) {
      cmdLines.push(index + 1);
    }
  }

  assert.deepEqual(sweLines, [
    1841,
    4781,
    4812,
    6027,
  ]);
  assert.deepEqual(cmdLines, [
    1819,
    1849,
  ]);

  assert.match(
    projectionTestText,
    /resolveSWEBodelningExportPackageProjection,/,
  );
  assert.match(
    projectionTestText,
    /const projection = resolveSWEBodelningExportPackageProjection\(/,
  );
  assert.match(
    projectionTestText,
    /validateSWEBodelningExportPackageProjection\(projection\)/,
  );
  assert.match(
    adapterRegistryTestText,
    /resolveExportPackageProjection,/,
  );
  assert.match(
    adapterRegistryTestText,
    /resolveSWEBodelningExportPackageProjection,/,
  );
  assert.match(
    adapterRegistryTestText,
    /validateCMDExportPackageProjection\(projection\)/,
  );
  assert.match(
    adapterRegistryTestText,
    /adapter\.resolveExportPackageProjection\(/,
  );
});
