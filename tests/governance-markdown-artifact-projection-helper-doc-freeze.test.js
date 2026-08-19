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
  path.join(__dirname, "export-package-markdown-artifact-projection.test.js"),
  "utf8",
);
const adapterRegistryTestText = fs.readFileSync(
  path.join(__dirname, "export-package-markdown-artifact-adapter-registry.test.js"),
  "utf8",
);

test("docs freeze the shared governance Markdown artifact projection helper seam as the governance-side projection-resolution boundary", () => {
  assert.match(
    docsText,
    /Shared Governance Markdown Artifact Projection Helper Seam Freeze/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/governance\/src\/index\.js` Markdown artifact projection helper pair `resolveSWEBodelningExportPackageMarkdownArtifactProjection` and `resolveCMDExportPackageMarkdownArtifactProjection` is the canonical internal governance-side Markdown artifact projection-resolution boundary for the current included governance flows below and is now frozen as the baseline seam/i,
  );
  assert.match(
    docsText,
    /the currently evidenced governed surfaces in this freeze are limited to:\s+`export_package_markdown_artifact` projection resolution for `SWE_BODELNING`\s+`export_package_markdown_artifact` projection resolution for `"CMD_PROFILE"`/i,
  );
  assert.match(
    docsText,
    /the currently concrete shared helper responsibilities already evidenced for this seam are limited to:\s+validating incoming Markdown artifact snapshots through the lower schemas Markdown artifact validator pair before governance-side projection assembly\s+deriving projection-level `snapshot_status` through the existing profile-specific Markdown artifact snapshot-status helpers from the validated artifact snapshot plus the current export package and profile dossier snapshots\s+delegating final projection validation and normalization to the lower schemas Markdown artifact projection-validator pair\s+returning the resulting validated projection object/i,
  );
  assert.match(
    docsText,
    /the current relationship to the lower schemas Markdown artifact projection-validator seam already evidenced in `packages\/governance\/src\/index\.js` is limited to `resolveSWEBodelningExportPackageMarkdownArtifactProjection` and `resolveCMDExportPackageMarkdownArtifactProjection` calling `validateSWEBodelningExportPackageMarkdownArtifactProjection` and `validateCMDExportPackageMarkdownArtifactProjection` after governance-side `snapshot_status` derivation/i,
  );
  assert.match(
    docsText,
    /the current relationship to the lower schemas Markdown artifact validator seam already evidenced in `packages\/governance\/src\/index\.js` is limited to `resolveSWEBodelningExportPackageMarkdownArtifactProjection` and `resolveCMDExportPackageMarkdownArtifactProjection` calling `validateSWEBodelningExportPackageMarkdownArtifact` and `validateCMDExportPackageMarkdownArtifact` before projection assembly/i,
  );
  assert.match(
    docsText,
    /the current relationship to projection\/currentness semantics already evidenced in `packages\/governance\/src\/index\.js` is limited to consuming `deriveSWEBodelningExportPackageMarkdownArtifactSnapshotStatus` and `deriveCMDExportPackageMarkdownArtifactSnapshotStatus` and passing their resulting `snapshot_status` blocks into the lower schemas projection-validator seam/i,
  );
  assert.match(
    docsText,
    /the current relationship to runtime capability gating already evidenced in `packages\/governance\/src\/index\.js` is limited to `resolveCMDExportPackageMarkdownArtifactProjection` calling `assertSupportedJurisdictionProfileCapability\(cmdProfileKey, "export_package_markdown_artifact"\)` before schema-side projection validation; the shared capability-guard boundary itself remains separate/i,
  );
  assert.match(
    docsText,
    /the current bounded reuse already evidenced in `packages\/governance\/src\/index\.js` is limited to 2 helper definitions, 2 profile-specific adapter-slot assignments, the shared generic `resolveExportPackageMarkdownArtifactProjection` dispatcher consuming those adapter slots, and the current named module export surface already exposing `resolveSWEBodelningExportPackageMarkdownArtifactProjection`/i,
  );
  assert.match(
    docsText,
    /the lower schemas Markdown artifact projection-validator seam remains outside this helper seam because schema-side projection validation, `snapshot_status` object enforcement, and normalized projection-shape guarantees are separate lower-boundary responsibilities consumed by the helper pair rather than defined by it/i,
  );
  assert.match(
    docsText,
    /the lower schemas Markdown artifact validator seam remains outside this helper seam because lower artifact-envelope validation, canonical export-package reconstruction, filename equality, and canonical Markdown equality\/normalization are separate lower-boundary responsibilities consumed by the helper pair rather than defined by it/i,
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
    /the frozen broader governance export-artifact derivation and round-trip helper scaffold remains outside this helper seam because it owns the wider Markdown derivation \/ round-trip area beyond this narrower projection-resolution pair/i,
  );
  assert.match(
    docsText,
    /downstream governance adapter-dispatch, artifact-derivation, and route\/runtime behavior remain outside this helper seam because they may call or route into the pair but do not define the canonical shared governance Markdown artifact projection-resolution boundary themselves/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, projection semantics, currentness semantics, derivation semantics, schema behavior, or fail-closed behavior/i,
  );

  assert.match(
    governanceIndexText,
    /function resolveCMDExportPackageMarkdownArtifactProjection\(\s*exportPackageMarkdownArtifactSnapshot,\s*currentExportPackageSnapshot,\s*currentProfileDossierSnapshot,\s*\) \{\s*const canonicalExportPackageMarkdownArtifact = validateCMDExportPackageMarkdownArtifact\(\s*exportPackageMarkdownArtifactSnapshot,\s*\);\s*assertSupportedJurisdictionProfileCapability\(\s*cmdProfileKey,\s*"export_package_markdown_artifact",\s*\);\s*return validateCMDExportPackageMarkdownArtifactProjection\(\{\s*\.\.\.canonicalExportPackageMarkdownArtifact,\s*snapshot_status: deriveCMDExportPackageMarkdownArtifactSnapshotStatus\(\s*canonicalExportPackageMarkdownArtifact,\s*currentExportPackageSnapshot,\s*currentProfileDossierSnapshot,\s*\),\s*\}\);\s*\}/,
  );
  assert.match(
    governanceIndexText,
    /function resolveSWEBodelningExportPackageMarkdownArtifactProjection\(\s*exportPackageMarkdownArtifactSnapshot,\s*currentExportPackageSnapshot,\s*currentProfileDossierSnapshot,\s*\) \{\s*const canonicalExportPackageMarkdownArtifact =\s*validateSWEBodelningExportPackageMarkdownArtifact\(\s*exportPackageMarkdownArtifactSnapshot,\s*\);\s*return validateSWEBodelningExportPackageMarkdownArtifactProjection\(\{\s*\.\.\.canonicalExportPackageMarkdownArtifact,\s*snapshot_status: deriveSWEBodelningExportPackageMarkdownArtifactSnapshotStatus\(\s*canonicalExportPackageMarkdownArtifact,\s*currentExportPackageSnapshot,\s*currentProfileDossierSnapshot,\s*\),\s*\}\);\s*\}/,
  );
  assert.match(
    governanceIndexText,
    /const sweBodelningExportPackageMarkdownArtifactAdapter = Object\.freeze\(\{\s*jurisdiction_profile_key: supportedProfileKey,[\s\S]*resolveExportPackageMarkdownArtifactProjection:\s*resolveSWEBodelningExportPackageMarkdownArtifactProjection,\s*\}\);/,
  );
  assert.match(
    governanceIndexText,
    /const cmdExportPackageMarkdownArtifactAdapter = Object\.freeze\(\{\s*jurisdiction_profile_key: cmdProfileKey,[\s\S]*resolveExportPackageMarkdownArtifactProjection:\s*resolveCMDExportPackageMarkdownArtifactProjection,\s*\}\);/,
  );
  assert.match(
    governanceIndexText,
    /function resolveExportPackageMarkdownArtifactProjection\(\s*exportPackageMarkdownArtifactSnapshot,\s*currentExportPackageSnapshot,\s*currentProfileDossierSnapshot,\s*\) \{\s*const adapter = resolveExportPackageMarkdownArtifactAdapter\(\s*exportPackageMarkdownArtifactSnapshot,\s*currentExportPackageSnapshot,\s*\);[\s\S]*return adapter\.resolveExportPackageMarkdownArtifactProjection\(\s*exportPackageMarkdownArtifactSnapshot,\s*currentExportPackageSnapshot,\s*currentProfileDossierSnapshot,\s*\);/,
  );
  assert.match(
    governanceIndexText,
    /resolveSWEBodelningExportPackageMarkdownArtifactProjection,/,
  );

  assert.equal(
    (
      governanceIndexText.match(
        /function resolveSWEBodelningExportPackageMarkdownArtifactProjection\(/g,
      ) || []
    ).length,
    1,
  );
  assert.equal(
    (
      governanceIndexText.match(
        /function resolveCMDExportPackageMarkdownArtifactProjection\(/g,
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
        "resolveSWEBodelningExportPackageMarkdownArtifactProjection",
      )
    ) {
      sweLines.push(index + 1);
    }
    if (
      governanceLines[index].includes(
        "resolveCMDExportPackageMarkdownArtifactProjection",
      )
    ) {
      cmdLines.push(index + 1);
    }
  }

  assert.deepEqual(sweLines, [
    2813,
    4372,
    6026,
  ]);
  assert.deepEqual(cmdLines, [
    2816,
    2845,
  ]);

  assert.match(
    projectionTestText,
    /resolveSWEBodelningExportPackageMarkdownArtifactProjection,/,
  );
  assert.match(
    projectionTestText,
    /const projection = resolveSWEBodelningExportPackageMarkdownArtifactProjection\(/,
  );
  assert.match(
    adapterRegistryTestText,
    /resolveExportPackageMarkdownArtifactProjection,/,
  );
  assert.match(
    adapterRegistryTestText,
    /resolveSWEBodelningExportPackageMarkdownArtifactProjection,/,
  );
  assert.match(
    adapterRegistryTestText,
    /adapter\.resolveExportPackageMarkdownArtifactProjection\(/,
  );
});
