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
  path.join(__dirname, "export-package-bundle-archive-artifact-projection.test.js"),
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

test("docs freeze the shared packages/schemas bundle/archive artifact projection-validator seam as the schema-side projection-validation boundary", () => {
  assert.match(
    docsText,
    /Shared Packages\/Schemas Bundle\/Archive Artifact Projection-Validator Seam Freeze/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas\/src\/index\.js` bundle\/archive artifact projection-validator pair `validateSWEBodelningExportPackageBundleArchiveArtifactProjection` and `validateCMDExportPackageBundleArchiveArtifactProjection` is the canonical internal `packages\/schemas` final bundle\/archive artifact projection-validation boundary for the current included schema-side flows below and is now frozen as the baseline seam/i,
  );
  assert.match(
    docsText,
    /the currently evidenced schema-side surfaces in this freeze are limited to:\s+`export_package_bundle_archive_artifact` projection validator for `SWE_BODELNING`\s+`export_package_bundle_archive_artifact` projection validator for `"CMD_PROFILE"`/i,
  );
  assert.match(
    docsText,
    /the currently concrete shared helper responsibilities already evidenced for this seam are limited to:\s+delegating lower artifact validation to the current lower bundle\/archive artifact validator seam before any projection-specific checks\s+enforcing projection-level `snapshot_status` object shape, supported `source` values, and required `current_package_version` plus `snapshot_is_current` fields\s+enforcing the currently evidenced shared `snapshot_package_version_found` rule where both profiles allow `null` or a matching non-empty package version\s+returning the normalized projection object by combining the validated lower artifact payload with the validated `snapshot_status` block/i,
  );
  assert.match(
    docsText,
    /the current relationship to the lower bundle\/archive artifact validator seam already evidenced in `packages\/schemas\/src\/index\.js` is limited to `validateSWEBodelningExportPackageBundleArchiveArtifactProjection` and `validateCMDExportPackageBundleArchiveArtifactProjection` calling `validateSWEBodelningExportPackageBundleArchiveArtifact` and `validateCMDExportPackageBundleArchiveArtifact` before their projection-level `snapshot_status` validation/i,
  );
  assert.match(
    docsText,
    /the current relationship to projection-level `snapshot_status` checks already evidenced in `packages\/schemas\/src\/index\.js` is limited to enforcing projection `snapshot_status` key shape plus supported `source`, `snapshot_package_version_found`, `current_package_version`, and `snapshot_is_current` rules against the already validated lower artifact `package_version`/i,
  );
  assert.match(
    docsText,
    /the current runtime reuse already evidenced across repo code is limited to `resolveSWEBodelningExportPackageBundleArchiveArtifactProjection` and `resolveCMDExportPackageBundleArchiveArtifactProjection` in `packages\/governance\/src\/index\.js` delegating schema-side projection validation to the shared projection-validator pair after deriving projection-level `snapshot_status`/i,
  );
  assert.match(
    docsText,
    /the current bounded reuse already evidenced across runtime code is limited to 2 projection-validator definitions and 2 current governance runtime call sites, one per projection validator/i,
  );
  assert.match(
    docsText,
    /the lower bundle\/archive artifact validator seam remains outside this helper seam because artifact-envelope validation, ZIP filename\/base64 checks, lower validator dispatch, and normalized lower artifact return are separate responsibilities consumed by the projection-validator pair rather than defined by it/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas` validation-helper scaffold remains outside this helper seam because machine-readable error construction, plain-object enforcement, and key-shape validation are separate frozen internal boundaries consumed by the projection-validator pair rather than defined by it/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas` export-artifact reconstruction helper scaffold remains outside this helper seam because bundle\/archive artifact projection validation does not reconstruct archive bodies and reconstruction remains a separate frozen internal boundary/i,
  );
  assert.match(
    docsText,
    /the frozen governance-side bundle\/archive artifact adapter-dispatch seam remains outside this helper seam because governance adapter lookup and generic projection\/derivation dispatch are separate higher runtime responsibilities even where profile-specific governance helpers currently call this projection-validator pair/i,
  );
  assert.match(
    docsText,
    /the frozen governance-side bundle\/package manifest adapter-dispatch seam remains outside this helper seam because current bundle-manifest derivation and projection are separate higher governance responsibilities that may supply `snapshot_status` inputs but do not define this schema-side projection-validation boundary/i,
  );
  assert.match(
    docsText,
    /the shared governance `buildStoredZip` helper seam remains outside this helper seam because ZIP container assembly is a separate frozen governance boundary/i,
  );
  assert.match(
    docsText,
    /the shared governance `toCanonicalJson` helper seam remains outside this helper seam because canonical JSON serialization is a separate frozen governance boundary/i,
  );
  assert.match(
    docsText,
    /downstream governance adapter, persistence, artifact-derivation, and route\/runtime behavior remain outside this helper seam because they may call the projection-validator pair after deriving `snapshot_status` but do not define the canonical shared schema-side bundle\/archive artifact projection-validation boundary themselves/i,
  );
  assert.match(
    docsText,
    /future `packages\/schemas` bundle\/archive artifact projection validation that needs the same profile-specific lower-artifact-plus-`snapshot_status` checks should extend the existing projection-validator pair instead of introducing parallel projection-validator stacks inside governance helpers or route\/runtime layers/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, projection semantics, bundle\/archive validation semantics, governance semantics, schema behavior, or fail-closed behavior/i,
  );

  assert.match(
    schemasIndexText,
    /function validateSWEBodelningExportPackageBundleArchiveArtifactProjection\(\s*input,\s*errorCode = "ERR_EXPORT_PACKAGE_BUNDLE_ARCHIVE_ARTIFACT_PROJECTION_INVALID",\s*\) \{\s*assertPlainObject\(input, errorCode, "input"\);\s*assertExactKeys\(\s*input,\s*exportPackageBundleArchiveArtifactProjectionRequiredKeys,\s*errorCode,\s*"input",\s*\);[\s\S]*const exportPackageBundleArchiveArtifact =\s*validateSWEBodelningExportPackageBundleArchiveArtifact\([\s\S]*assertPlainObject\(input\.snapshot_status, errorCode, "snapshot_status"\);[\s\S]*assertExactKeys\(\s*input\.snapshot_status,\s*exportPackageBundleArchiveArtifactProjectionSnapshotStatusRequiredKeys,\s*errorCode,\s*"snapshot_status",\s*\);[\s\S]*snapshot_status\.source must be a supported source value[\s\S]*snapshot_status\.snapshot_package_version_found must be null or a non-empty string[\s\S]*snapshot_status\.snapshot_package_version_found must match package_version when present[\s\S]*snapshot_status\.current_package_version must be a non-empty string[\s\S]*snapshot_status\.snapshot_is_current must be a boolean[\s\S]*return \{\s*\.\.\.exportPackageBundleArchiveArtifact,\s*snapshot_status: input\.snapshot_status,\s*\};\s*\}/,
  );
  assert.match(
    schemasIndexText,
    /function validateCMDExportPackageBundleArchiveArtifactProjection\(\s*input,\s*errorCode = "ERR_EXPORT_PACKAGE_BUNDLE_ARCHIVE_ARTIFACT_PROJECTION_INVALID",\s*\) \{\s*assertPlainObject\(input, errorCode, "input"\);\s*assertExactKeys\(\s*input,\s*cmdExportPackageBundleArchiveArtifactProjectionRequiredKeys,\s*errorCode,\s*"input",\s*\);[\s\S]*const exportPackageBundleArchiveArtifact =\s*validateCMDExportPackageBundleArchiveArtifact\([\s\S]*assertPlainObject\(input\.snapshot_status, errorCode, "snapshot_status"\);[\s\S]*assertExactKeys\(\s*input\.snapshot_status,\s*cmdExportPackageBundleArchiveArtifactProjectionSnapshotStatusRequiredKeys,\s*errorCode,\s*"snapshot_status",\s*\);[\s\S]*snapshot_status\.source must be a supported source value[\s\S]*snapshot_status\.snapshot_package_version_found must be null or a non-empty string[\s\S]*snapshot_status\.snapshot_package_version_found must match package_version when present[\s\S]*snapshot_status\.current_package_version must be a non-empty string[\s\S]*snapshot_status\.snapshot_is_current must be a boolean[\s\S]*return \{\s*\.\.\.exportPackageBundleArchiveArtifact,\s*snapshot_status: input\.snapshot_status,\s*\};\s*\}/,
  );

  assert.deepEqual(
    collectLineMatches(
      schemasIndexText,
      /\bvalidateSWEBodelningExportPackageBundleArchiveArtifactProjection\b/,
    ),
    [10550, 13021],
  );
  assert.deepEqual(
    collectLineMatches(
      schemasIndexText,
      /\bvalidateCMDExportPackageBundleArchiveArtifactProjection\b/,
    ),
    [10645, 13017],
  );

  assert.deepEqual(
    collectCallSites(governanceIndexText, [
      "validateSWEBodelningExportPackageBundleArchiveArtifactProjection",
      "validateCMDExportPackageBundleArchiveArtifactProjection",
    ]),
    [
      {
        fnName: "validateSWEBodelningExportPackageBundleArchiveArtifactProjection",
        caller: "resolveSWEBodelningExportPackageBundleArchiveArtifactProjection",
        line: 3513,
      },
      {
        fnName: "validateCMDExportPackageBundleArchiveArtifactProjection",
        caller: "resolveCMDExportPackageBundleArchiveArtifactProjection",
        line: 3692,
      },
    ],
  );

  assert.match(
    projectionRuntimeTestText,
    /resolveSWEBodelningExportPackageBundleArchiveArtifactProjection/,
  );
  assert.match(
    projectionRuntimeTestText,
    /validateSWEBodelningExportPackageBundleArchiveArtifactProjection/,
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
