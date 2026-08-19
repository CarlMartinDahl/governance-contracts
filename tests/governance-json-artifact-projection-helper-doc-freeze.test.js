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
  path.join(__dirname, "export-package-json-artifact-projection.test.js"),
  "utf8",
);
const adapterRegistryTestText = fs.readFileSync(
  path.join(__dirname, "export-package-json-artifact-adapter-registry.test.js"),
  "utf8",
);

test("docs freeze the shared governance JSON artifact projection helper seam as the governance-side projection-resolution boundary", () => {
  assert.match(
    docsText,
    /Shared Governance JSON Artifact Projection Helper Seam Freeze/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/governance\/src\/index\.js` JSON artifact projection helper pair `resolveSWEBodelningExportPackageJsonArtifactProjection` and `resolveCMDExportPackageJsonArtifactProjection` is the canonical internal governance-side JSON artifact projection-resolution boundary for the current included governance flows below and is now frozen as the baseline seam/i,
  );
  assert.match(
    docsText,
    /the currently evidenced governed surfaces in this freeze are limited to:\s+`export_package_json_artifact` projection resolution for `SWE_BODELNING`\s+`export_package_json_artifact` projection resolution for `"CMD_PROFILE"`/i,
  );
  assert.match(
    docsText,
    /the currently concrete shared helper responsibilities already evidenced for this seam are limited to:\s+validating incoming JSON artifact snapshots through the lower schemas JSON artifact validator pair before governance-side projection assembly\s+deriving projection-level `snapshot_status` through the existing profile-specific JSON artifact snapshot-status helpers from the validated artifact snapshot plus the current export package and profile dossier snapshots\s+delegating final projection validation and normalization to the lower schemas JSON artifact projection-validator pair\s+returning the resulting validated projection object/i,
  );
  assert.match(
    docsText,
    /the current relationship to the lower schemas JSON artifact projection-validator seam already evidenced in `packages\/governance\/src\/index\.js` is limited to `resolveSWEBodelningExportPackageJsonArtifactProjection` and `resolveCMDExportPackageJsonArtifactProjection` calling `validateSWEBodelningExportPackageJsonArtifactProjection` and `validateCMDExportPackageJsonArtifactProjection` after governance-side `snapshot_status` derivation/i,
  );
  assert.match(
    docsText,
    /the current relationship to the lower schemas JSON artifact validator seam already evidenced in `packages\/governance\/src\/index\.js` is limited to `resolveSWEBodelningExportPackageJsonArtifactProjection` and `resolveCMDExportPackageJsonArtifactProjection` calling `validateSWEBodelningExportPackageJsonArtifact` and `validateCMDExportPackageJsonArtifact` before projection assembly/i,
  );
  assert.match(
    docsText,
    /the current relationship to projection\/currentness semantics already evidenced in `packages\/governance\/src\/index\.js` is limited to consuming `deriveSWEBodelningExportPackageJsonArtifactSnapshotStatus` and `deriveCMDExportPackageJsonArtifactSnapshotStatus` and passing their resulting `snapshot_status` blocks into the lower schemas projection-validator seam/i,
  );
  assert.match(
    docsText,
    /the current relationship to runtime capability gating already evidenced in `packages\/governance\/src\/index\.js` is limited to `resolveCMDExportPackageJsonArtifactProjection` calling `assertSupportedJurisdictionProfileCapability\(cmdProfileKey, "export_package_json_artifact"\)` before schema-side projection validation; the shared capability-guard boundary itself remains separate/i,
  );
  assert.match(
    docsText,
    /the current bounded reuse already evidenced in `packages\/governance\/src\/index\.js` is limited to 2 helper definitions, 2 profile-specific adapter-slot assignments, the shared generic `resolveExportPackageJsonArtifactProjection` dispatcher consuming those adapter slots, and the current named module export surface already exposing `resolveSWEBodelningExportPackageJsonArtifactProjection`/i,
  );
  assert.match(
    docsText,
    /the lower schemas JSON artifact projection-validator seam remains outside this helper seam because schema-side projection validation, `snapshot_status` object enforcement, and normalized projection-shape guarantees are separate lower-boundary responsibilities consumed by the helper pair rather than defined by it/i,
  );
  assert.match(
    docsText,
    /the lower schemas JSON artifact validator seam remains outside this helper seam because lower artifact-envelope validation, canonical export-package revalidation, filename equality, and canonical JSON equality\/normalization are separate lower-boundary responsibilities consumed by the helper pair rather than defined by it/i,
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
    /the frozen broader governance JSON export-artifact derivation and round-trip helper scaffold remains outside this helper seam because it owns the wider JSON derivation \/ round-trip area beyond this narrower projection-resolution pair/i,
  );
  assert.match(
    docsText,
    /downstream governance adapter-dispatch, artifact-derivation, and route\/runtime behavior remain outside this helper seam because they may call or route into the pair but do not define the canonical shared governance JSON artifact projection-resolution boundary themselves/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, projection semantics, currentness semantics, derivation semantics, schema behavior, or fail-closed behavior/i,
  );

  assert.match(
    governanceIndexText,
    /function resolveCMDExportPackageJsonArtifactProjection\(\s*exportPackageJsonArtifactSnapshot,\s*currentExportPackageSnapshot,\s*currentProfileDossierSnapshot,\s*\) \{\s*const canonicalExportPackageJsonArtifact = validateCMDExportPackageJsonArtifact\(\s*exportPackageJsonArtifactSnapshot,\s*\);\s*assertSupportedJurisdictionProfileCapability\(\s*cmdProfileKey,\s*"export_package_json_artifact",\s*\);\s*return validateCMDExportPackageJsonArtifactProjection\(\{\s*\.\.\.canonicalExportPackageJsonArtifact,\s*snapshot_status: deriveCMDExportPackageJsonArtifactSnapshotStatus\(\s*canonicalExportPackageJsonArtifact,\s*currentExportPackageSnapshot,\s*currentProfileDossierSnapshot,\s*\),\s*\}\);\s*\}/,
  );
  assert.match(
    governanceIndexText,
    /function resolveSWEBodelningExportPackageJsonArtifactProjection\(\s*exportPackageJsonArtifactSnapshot,\s*currentExportPackageSnapshot,\s*currentProfileDossierSnapshot,\s*\) \{\s*const canonicalExportPackageJsonArtifact =\s*validateSWEBodelningExportPackageJsonArtifact\(exportPackageJsonArtifactSnapshot\);\s*return validateSWEBodelningExportPackageJsonArtifactProjection\(\{\s*\.\.\.canonicalExportPackageJsonArtifact,\s*snapshot_status: deriveSWEBodelningExportPackageJsonArtifactSnapshotStatus\(\s*canonicalExportPackageJsonArtifact,\s*currentExportPackageSnapshot,\s*currentProfileDossierSnapshot,\s*\),\s*\}\);\s*\}/,
  );
  assert.match(
    governanceIndexText,
    /const sweBodelningExportPackageJsonArtifactAdapter = Object\.freeze\(\{\s*jurisdiction_profile_key: supportedProfileKey,[\s\S]*resolveExportPackageJsonArtifactProjection:\s*resolveSWEBodelningExportPackageJsonArtifactProjection,\s*\}\);/,
  );
  assert.match(
    governanceIndexText,
    /const cmdExportPackageJsonArtifactAdapter = Object\.freeze\(\{\s*jurisdiction_profile_key: cmdProfileKey,[\s\S]*resolveExportPackageJsonArtifactProjection:\s*resolveCMDExportPackageJsonArtifactProjection,\s*\}\);/,
  );
  assert.match(
    governanceIndexText,
    /function resolveExportPackageJsonArtifactProjection\(\s*exportPackageJsonArtifactSnapshot,\s*currentExportPackageSnapshot,\s*currentProfileDossierSnapshot,\s*\) \{\s*const adapter = resolveExportPackageJsonArtifactAdapter\(\s*exportPackageJsonArtifactSnapshot,\s*currentExportPackageSnapshot,\s*\);[\s\S]*return adapter\.resolveExportPackageJsonArtifactProjection\(\s*exportPackageJsonArtifactSnapshot,\s*currentExportPackageSnapshot,\s*currentProfileDossierSnapshot,\s*\);/,
  );
  assert.match(
    governanceIndexText,
    /resolveSWEBodelningExportPackageJsonArtifactProjection,/,
  );

  assert.equal(
    (
      governanceIndexText.match(
        /function resolveSWEBodelningExportPackageJsonArtifactProjection\(/g,
      ) || []
    ).length,
    1,
  );
  assert.equal(
    (
      governanceIndexText.match(
        /function resolveCMDExportPackageJsonArtifactProjection\(/g,
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
        "resolveSWEBodelningExportPackageJsonArtifactProjection",
      )
    ) {
      sweLines.push(index + 1);
    }
    if (
      governanceLines[index].includes(
        "resolveCMDExportPackageJsonArtifactProjection",
      )
    ) {
      cmdLines.push(index + 1);
    }
  }

  assert.deepEqual(sweLines, [
    2055,
    4255,
    6025,
  ]);
  assert.deepEqual(cmdLines, [
    2027,
    2063,
  ]);

  assert.match(
    projectionTestText,
    /resolveSWEBodelningExportPackageJsonArtifactProjection,/,
  );
  assert.match(
    projectionTestText,
    /const projection = resolveSWEBodelningExportPackageJsonArtifactProjection\(/,
  );
  assert.match(
    adapterRegistryTestText,
    /resolveExportPackageJsonArtifactProjection,/,
  );
  assert.match(
    adapterRegistryTestText,
    /resolveSWEBodelningExportPackageJsonArtifactProjection,/,
  );
  assert.match(
    adapterRegistryTestText,
    /adapter\.resolveExportPackageJsonArtifactProjection\(/,
  );
});
