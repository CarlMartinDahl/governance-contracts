const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const docsText = fs.readFileSync(
  path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md"),
  "utf8",
);
const schemasIndexText = fs.readFileSync(
  path.join(__dirname, "..", "packages", "schemas", "src", "index.js"),
  "utf8",
);
const governanceIndexText = fs.readFileSync(
  path.join(__dirname, "..", "packages", "governance", "src", "index.js"),
  "utf8",
);
const projectionRuntimeTestText = fs.readFileSync(
  path.join(__dirname, "export-package-bundle-manifest-projection.test.js"),
  "utf8",
);

function collectLineMatches(text, pattern) {
  return text
    .split("\n")
    .flatMap((line, index) => (pattern.test(line) ? [index + 1] : []));
}

function collectCallSites(text, targetFns) {
  const lines = text.split("\n");
  let currentFunction = null;
  const callSites = [];

  for (let index = 0; index < lines.length; index += 1) {
    const functionMatch = lines[index].match(/^function\s+([A-Za-z0-9_]+)\s*\(/);
    if (functionMatch) {
      currentFunction = functionMatch[1];
    }

    for (const fnName of targetFns) {
      if (lines[index].includes(`${fnName}(`) && currentFunction !== fnName) {
        callSites.push({ fnName, caller: currentFunction, line: index + 1 });
      }
    }
  }

  return callSites;
}

test("docs freeze the shared packages/schemas bundle/package manifest projection-validator seam as the schema-side projection-validation boundary", () => {
  assert.match(
    docsText,
    /Shared Packages\/Schemas Bundle\/Package Manifest Projection-Validator Seam Freeze/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas\/src\/index\.js` bundle\/package manifest projection-validator pair `validateSWEBodelningExportPackageBundleManifestProjection` and `validateCMDExportPackageBundleManifestProjection` is the canonical internal `packages\/schemas` bundle\/package manifest projection-validation boundary for the current included schema-side flows below and is now frozen as the baseline seam/i,
  );
  assert.match(
    docsText,
    /the currently evidenced schema-side surfaces in this freeze are limited to:\s+`export_package_bundle_manifest` projection validator for `SWE_BODELNING`\s+`export_package_bundle_manifest` projection validator for `"CMD_PROFILE"`/i,
  );
  assert.match(
    docsText,
    /the currently concrete shared helper responsibilities already evidenced for this seam are limited to:\s+delegating lower bundle\/package manifest validation to the current lower validator seam before any projection-specific checks\s+enforcing projection-level `snapshot_status` object shape, supported `source` values, and required `current_package_version` plus `snapshot_is_current` fields\s+enforcing the currently evidenced profile-specific `snapshot_package_version_found` rules where `CMD_PROFILE` requires a non-empty matching package version and `SWE_BODELNING` allows `null` or a matching non-empty package version\s+returning the normalized projection object by combining the validated lower bundle\/package manifest payload with the validated `snapshot_status` block/i,
  );
  assert.match(
    docsText,
    /the current relationship to the lower bundle\/package manifest validator seam already evidenced in `packages\/schemas\/src\/index\.js` is limited to `validateSWEBodelningExportPackageBundleManifestProjection` and `validateCMDExportPackageBundleManifestProjection` calling `validateSWEBodelningExportPackageBundleManifest` and `validateCMDExportPackageBundleManifest` before their projection-level `snapshot_status` validation/i,
  );
  assert.match(
    docsText,
    /the current relationship to projection-level `snapshot_status` checks already evidenced in `packages\/schemas\/src\/index\.js` is limited to enforcing projection `snapshot_status` key shape plus supported `source`, `snapshot_package_version_found`, `current_package_version`, and `snapshot_is_current` rules against the already validated lower manifest `package_version`/i,
  );
  assert.match(
    docsText,
    /the current runtime reuse already evidenced across repo code is limited to `resolveSWEBodelningExportPackageBundleManifestProjection` and `resolveCMDExportPackageBundleManifestProjection` in `packages\/governance\/src\/index\.js` delegating schema-side projection validation to the shared projection-validator pair after deriving projection-level `snapshot_status`, plus `deriveSWEBodelningExportPackageBundleArchiveArtifactSnapshotStatus` and `deriveCMDExportPackageBundleArchiveArtifactSnapshotStatus` in `packages\/governance\/src\/index\.js` validating `currentBundleManifestProjection` through the same pair before higher bundle\/archive currentness comparison/i,
  );
  assert.match(
    docsText,
    /the current bounded reuse already evidenced across runtime code is limited to 2 projection-validator definitions, 4 current governance runtime call sites spanning the 2 bundle\/package manifest projection resolvers and 2 bundle\/archive snapshot-status helpers, and the current named module export surface exposing `validateSWEBodelningExportPackageBundleManifestProjection` and `validateCMDExportPackageBundleManifestProjection`/i,
  );
  assert.match(
    docsText,
    /the lower bundle\/package manifest validator seam remains outside this helper seam because manifest-envelope validation, canonical source\/artifact entry checks, lower validator dispatch, and normalized lower manifest return are separate responsibilities consumed by the projection-validator pair rather than defined by it/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas` validation-helper scaffold remains outside this helper seam because machine-readable error construction, plain-object enforcement, and key-shape validation are separate frozen internal boundaries consumed by the projection-validator pair rather than defined by it/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas` export-artifact reconstruction helper scaffold remains outside this helper seam because bundle\/package manifest projection validation operates on validated manifest objects and does not reconstruct artifact bodies or export packages/i,
  );
  assert.match(
    docsText,
    /the frozen governance-side bundle-manifest adapter-dispatch seam remains outside this helper seam because governance adapter lookup, generic projection\/derivation dispatch, and higher bundle\/package manifest currentness assembly are separate runtime responsibilities even where profile-specific governance projection helpers currently call this pair/i,
  );
  assert.match(
    docsText,
    /the frozen governance-side bundle\/archive artifact adapter-dispatch seam remains outside this helper seam because higher bundle\/archive currentness and projection behavior are separate runtime responsibilities even where the current bundle\/archive snapshot-status helpers validate `currentBundleManifestProjection` through this pair/i,
  );
  assert.match(
    docsText,
    /the shared governance `buildStoredZip` helper seam remains outside this helper seam because ZIP container assembly is a separate frozen governance boundary/i,
  );
  assert.match(
    docsText,
    /the shared governance `toCanonicalJson` helper seam remains outside this helper seam because canonical JSON serialization and higher manifest fingerprint\/currentness comparison are separate frozen governance boundaries rather than responsibilities defined by the projection-validator pair/i,
  );
  assert.match(
    docsText,
    /downstream governance adapter, persistence, artifact-derivation, and route\/runtime behavior remain outside this helper seam because they may call the projection-validator pair after deriving `snapshot_status` but do not define the canonical shared schema-side bundle\/package manifest projection-validation boundary themselves/i,
  );
  assert.match(
    docsText,
    /future `packages\/schemas` bundle\/package manifest projection validation that needs the same profile-specific lower-manifest-plus-`snapshot_status` checks should extend the existing projection-validator pair instead of introducing parallel projection-validator stacks inside governance helpers or route\/runtime layers/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, projection semantics, bundle\/package manifest validation semantics, governance semantics, schema behavior, or fail-closed behavior/i,
  );

  assert.match(
    schemasIndexText,
    /function validateSWEBodelningExportPackageBundleManifestProjection\(\s*input,\s*errorCode = "ERR_EXPORT_PACKAGE_BUNDLE_MANIFEST_PROJECTION_INVALID",\s*\) \{\s*assertPlainObject\(input, errorCode, "input"\);\s*assertExactKeys\(\s*input,\s*exportPackageBundleManifestProjectionRequiredKeys,\s*errorCode,\s*"input",\s*\);[\s\S]*const exportPackageBundleManifest = validateSWEBodelningExportPackageBundleManifest\([\s\S]*assertPlainObject\(input\.snapshot_status, errorCode, "snapshot_status"\);[\s\S]*assertExactKeys\(\s*input\.snapshot_status,\s*exportPackageBundleManifestProjectionSnapshotStatusRequiredKeys,\s*errorCode,\s*"snapshot_status",\s*\);[\s\S]*snapshot_status\.source must be a supported source value[\s\S]*snapshot_status\.snapshot_package_version_found must be null or a non-empty string[\s\S]*snapshot_status\.snapshot_package_version_found must match package_version when present[\s\S]*snapshot_status\.current_package_version must be a non-empty string[\s\S]*snapshot_status\.snapshot_is_current must be a boolean[\s\S]*return \{\s*\.\.\.exportPackageBundleManifest,\s*snapshot_status: input\.snapshot_status,\s*\};\s*\}/,
  );
  assert.match(
    schemasIndexText,
    /function validateCMDExportPackageBundleManifestProjection\(\s*input,\s*errorCode = "ERR_EXPORT_PACKAGE_BUNDLE_MANIFEST_PROJECTION_INVALID",\s*\) \{\s*assertPlainObject\(input, errorCode, "input"\);\s*assertExactKeys\(\s*input,\s*cmdExportPackageBundleManifestProjectionRequiredKeys,\s*errorCode,\s*"input",\s*\);[\s\S]*const exportPackageBundleManifest = validateCMDExportPackageBundleManifest\([\s\S]*assertPlainObject\(input\.snapshot_status, errorCode, "snapshot_status"\);[\s\S]*assertExactKeys\(\s*input\.snapshot_status,\s*cmdExportPackageBundleManifestProjectionSnapshotStatusRequiredKeys,\s*errorCode,\s*"snapshot_status",\s*\);[\s\S]*snapshot_status\.source must be a supported source value[\s\S]*snapshot_status\.snapshot_package_version_found must be a non-empty string[\s\S]*snapshot_status\.snapshot_package_version_found must match package_version[\s\S]*snapshot_status\.current_package_version must be a non-empty string[\s\S]*snapshot_status\.snapshot_is_current must be a boolean[\s\S]*return \{\s*\.\.\.exportPackageBundleManifest,\s*snapshot_status: input\.snapshot_status,\s*\};\s*\}/,
  );

  assert.deepEqual(
    collectLineMatches(
      schemasIndexText,
      /\bvalidateSWEBodelningExportPackageBundleManifestProjection\b/,
    ),
    [10740, 13023],
  );
  assert.deepEqual(
    collectLineMatches(
      schemasIndexText,
      /\bvalidateCMDExportPackageBundleManifestProjection\b/,
    ),
    [10834, 13019],
  );

  assert.deepEqual(
    collectCallSites(governanceIndexText, [
      "validateSWEBodelningExportPackageBundleManifestProjection",
      "validateCMDExportPackageBundleManifestProjection",
    ]),
    [
      {
        fnName: "validateCMDExportPackageBundleManifestProjection",
        caller: "resolveCMDExportPackageBundleManifestProjection",
        line: 3116,
      },
      {
        fnName: "validateSWEBodelningExportPackageBundleManifestProjection",
        caller: "deriveSWEBodelningExportPackageBundleArchiveArtifactSnapshotStatus",
        line: 3455,
      },
      {
        fnName: "validateCMDExportPackageBundleManifestProjection",
        caller: "deriveCMDExportPackageBundleArchiveArtifactSnapshotStatus",
        line: 3631,
      },
      {
        fnName: "validateSWEBodelningExportPackageBundleManifestProjection",
        caller: "resolveSWEBodelningExportPackageBundleManifestProjection",
        line: 4546,
      },
    ],
  );

  assert.match(
    projectionRuntimeTestText,
    /resolveSWEBodelningExportPackageBundleManifestProjection/,
  );
  assert.match(
    projectionRuntimeTestText,
    /validateSWEBodelningExportPackageBundleManifestProjection/,
  );
  assert.match(
    projectionRuntimeTestText,
    /snapshot_status\.source = persisted-current/,
  );
  assert.match(
    projectionRuntimeTestText,
    /snapshot_status\.source = persisted-stale/,
  );
  assert.match(
    projectionRuntimeTestText,
    /snapshot_package_version_found/,
  );
  assert.match(
    projectionRuntimeTestText,
    /current_package_version/,
  );
  assert.match(projectionRuntimeTestText, /snapshot_is_current/);
});
