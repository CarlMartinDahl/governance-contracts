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
const exportPackageApiTestText = fs.readFileSync(
  path.join(__dirname, "export-package-api.test.js"),
  "utf8",
);
const exportPackageAdapterRegistryTestText = fs.readFileSync(
  path.join(__dirname, "export-package-adapter-registry.test.js"),
  "utf8",
);
const exportPackageGovernanceTestText = fs.readFileSync(
  path.join(__dirname, "export-package-governance.test.js"),
  "utf8",
);

function collectLineMatches(text, pattern) {
  return text
    .split("\n")
    .flatMap((line, index) => (pattern.test(line) ? [index + 1] : []));
}

function collectCrossFunctionCallSites(text, targetFnNames) {
  const lines = text.split("\n");
  let currentFunction = null;
  const callSites = [];

  for (let index = 0; index < lines.length; index += 1) {
    const functionMatch = lines[index].match(
      /^(?:async\s+)?function\s+([A-Za-z0-9_]+)\s*\(/,
    );
    if (functionMatch) {
      currentFunction = functionMatch[1];
    }

    for (const fnName of targetFnNames) {
      if (
        lines[index].includes(`${fnName}(`) &&
        currentFunction !== fnName
      ) {
        callSites.push({
          fnName,
          caller: currentFunction,
          line: index + 1,
        });
      }
    }
  }

  return callSites;
}

test("docs freeze the shared packages/schemas export-package projection-validator seam as the schema-side projection-validation boundary", () => {
  assert.match(
    docsText,
    /Shared Packages\/Schemas Export Package Projection-Validator Seam Freeze/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas\/src\/index\.js` export-package projection-validator pair `validateSWEBodelningExportPackageProjection` and `validateCMDExportPackageProjection` is the canonical internal `packages\/schemas` export-package projection-validation boundary for the current included schema-side flows below and is now frozen as the baseline seam/i,
  );
  assert.match(
    docsText,
    /the currently evidenced schema-side surfaces in this freeze are limited to:\s+`export_package` projection validator for `SWE_BODELNING`\s+`export_package` projection validator for `"CMD_PROFILE"`/i,
  );
  assert.match(
    docsText,
    /the currently concrete shared helper responsibilities already evidenced for this seam are limited to:\s+delegating lower export-package validation to the current lower export-package validator seam before any projection-specific checks\s+enforcing projection-level `snapshot_status` object shape and exact required-key validation\s+enforcing projection-level `snapshot_status\.source` against the current supported source values\s+enforcing projection-level `snapshot_status\.snapshot_export_version_found` as a non-empty string that matches the validated lower `export_version`\s+enforcing projection-level `snapshot_status\.current_export_version` as a non-empty string\s+enforcing projection-level `snapshot_status\.snapshot_is_current` as a boolean\s+returning the normalized projection object by combining the validated lower export-package payload with the validated `snapshot_status` block/i,
  );
  assert.match(
    docsText,
    /the current relationship to the lower export-package validator seam already evidenced in `packages\/schemas\/src\/index\.js` is limited to `validateSWEBodelningExportPackageProjection` and `validateCMDExportPackageProjection` calling `validateSWEBodelningExportPackage` and `validateCMDExportPackage` before their projection-level `snapshot_status` validation/i,
  );
  assert.match(
    docsText,
    /the current relationship to projection-level `snapshot_status` checks already evidenced in `packages\/schemas\/src\/index\.js` is limited to enforcing projection `snapshot_status` key shape plus supported `source`, `snapshot_export_version_found`, `current_export_version`, and `snapshot_is_current` rules against the already validated lower export-package payload/i,
  );
  assert.match(
    docsText,
    /the current runtime reuse already evidenced across repo code is limited to `resolveCMDExportPackageProjection` in `packages\/governance\/src\/index\.js` delegating schema-side projection validation to `validateCMDExportPackageProjection` after governance-side `snapshot_status` derivation, while the current `SWE_BODELNING` projection shape is corroborated through existing governance\/runtime tests that validate returned projections through `validateSWEBodelningExportPackageProjection`/i,
  );
  assert.match(
    docsText,
    /the current bounded reuse already evidenced across repo code is limited to 2 projection-validator definitions, no current generic schemas-side export-package projection-validator registry, lookup, or dispatch helper definition, 1 current governance runtime call site, 5 current governance\/runtime test call sites across `tests\/export-package-api\.test\.js`, `tests\/export-package-adapter-registry\.test\.js`, and `tests\/export-package-governance\.test\.js`, and the current named module export surface exposing `validateSWEBodelningExportPackageProjection` and `validateCMDExportPackageProjection`/i,
  );
  assert.match(
    docsText,
    /no current generic schemas-side export-package projection-validator registry, lookup helper, or dispatch helper belongs inside this seam because current repo code exposes only the profile-specific projection-validator pair and leaves any higher projection selection outside this schema seam/i,
  );
  assert.match(
    docsText,
    /the lower export-package validator seam remains outside this helper seam because lower export-package object, canonical-source, manifest, and generic validator-dispatch validation are separate lower-boundary responsibilities consumed by the projection-validator pair rather than defined by it/i,
  );
  assert.match(
    docsText,
    /the shared export-package stop-outcome alignment seam remains outside this helper seam because blocked\/current baseline and reason-code alignment are separate responsibilities rather than projection payload validation responsibilities/i,
  );
  assert.match(
    docsText,
    /the shared export-package stop-matrix alignment seam remains outside this helper seam because neutral stop-matrix case alignment is a separate responsibility rather than projection payload validation responsibility/i,
  );
  assert.match(
    docsText,
    /the shared export-package traceability alignment seam remains outside this helper seam because documented rule\/input\/output reference alignment is a separate responsibility rather than projection payload validation responsibility/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas` validation-helper scaffold remains outside this helper seam because machine-readable error construction, plain-object enforcement, and key-shape validation are separate frozen internal boundaries consumed by the projection-validator pair rather than defined by it/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas` export-artifact reconstruction helper scaffold remains outside this helper seam because export-package projection validation operates on validated export-package objects plus projection `snapshot_status` and does not reconstruct artifact bodies or canonical export-package payloads/i,
  );
  assert.match(
    docsText,
    /the frozen governance-side export-package projection helper seam remains outside this helper seam because governance-side projection assembly, `snapshot_status` derivation, runtime capability gating, and higher projection-resolution behavior are separate runtime responsibilities even where the current CMD helper calls `validateCMDExportPackageProjection` and the SWE path is corroborated through supporting tests/i,
  );
  assert.match(
    docsText,
    /the frozen governance-side export-package adapter-dispatch seam remains outside this helper seam because governance adapter lookup, generic derivation\/projection dispatch, and higher runtime export-package behavior are separate runtime responsibilities and do not define the schema-side projection-validation boundary/i,
  );
  assert.match(
    docsText,
    /downstream governance, persistence, API route\/runtime, and other adapter behavior remain outside this helper seam because they may call or validate returned projection objects through the projection-validator pair after deriving `snapshot_status` but do not define the canonical shared schema-side export-package projection-validation boundary themselves/i,
  );
  assert.match(
    docsText,
    /future `packages\/schemas` export-package projection validation that needs the same lower-export-package-plus-`snapshot_status` checks should extend the existing projection-validator pair instead of introducing parallel projection-validator stacks inside governance helpers or route\/runtime layers/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, projection semantics, export-package validation semantics, alignment semantics, governance semantics, schema behavior, or fail-closed behavior/i,
  );

  assert.match(
    schemasIndexText,
    /function validateSWEBodelningExportPackageProjection\(\s*input,\s*errorCode = "ERR_EXPORT_PACKAGE_PROJECTION_INVALID",\s*\) \{\s*assertPlainObject\(input, errorCode, "input"\);\s*assertExactKeys\(input, exportPackageProjectionRequiredKeys, errorCode, "input"\);[\s\S]*const exportPackage = validateSWEBodelningExportPackage\([\s\S]*assertPlainObject\(input\.snapshot_status, errorCode, "snapshot_status"\);[\s\S]*assertExactKeys\(\s*input\.snapshot_status,\s*exportPackageProjectionSnapshotStatusRequiredKeys,\s*errorCode,\s*"snapshot_status",\s*\);[\s\S]*snapshot_status\.source must be a supported source value[\s\S]*snapshot_status\.snapshot_export_version_found must be a non-empty string[\s\S]*snapshot_status\.snapshot_export_version_found must match export_version[\s\S]*snapshot_status\.current_export_version must be a non-empty string[\s\S]*snapshot_status\.snapshot_is_current must be a boolean[\s\S]*return \{\s*\.\.\.exportPackage,\s*snapshot_status: input\.snapshot_status,\s*\};\s*\}/,
  );
  assert.match(
    schemasIndexText,
    /function validateCMDExportPackageProjection\(\s*input,\s*errorCode = "ERR_EXPORT_PACKAGE_PROJECTION_INVALID",\s*\) \{\s*assertPlainObject\(input, errorCode, "input"\);\s*assertExactKeys\(input, exportPackageProjectionRequiredKeys, errorCode, "input"\);[\s\S]*const exportPackage = validateCMDExportPackage\([\s\S]*assertPlainObject\(input\.snapshot_status, errorCode, "snapshot_status"\);[\s\S]*assertExactKeys\(\s*input\.snapshot_status,\s*exportPackageProjectionSnapshotStatusRequiredKeys,\s*errorCode,\s*"snapshot_status",\s*\);[\s\S]*snapshot_status\.source must be a supported source value[\s\S]*snapshot_status\.snapshot_export_version_found must be a non-empty string[\s\S]*snapshot_status\.snapshot_export_version_found must match export_version[\s\S]*snapshot_status\.current_export_version must be a non-empty string[\s\S]*snapshot_status\.snapshot_is_current must be a boolean[\s\S]*return \{\s*\.\.\.exportPackage,\s*snapshot_status: input\.snapshot_status,\s*\};\s*\}/,
  );

  assert.deepEqual(
    collectLineMatches(
      schemasIndexText,
      /\bvalidateSWEBodelningExportPackageProjection\b/,
    ),
    [12748, 13045],
  );
  assert.deepEqual(
    collectLineMatches(schemasIndexText, /\bvalidateCMDExportPackageProjection\b/),
    [12834, 13051],
  );
  assert.deepEqual(
    collectLineMatches(schemasIndexText, /\bvalidateExportPackageProjection\b/),
    [],
  );
  assert.deepEqual(
    collectLineMatches(
      schemasIndexText,
      /\bexportPackageProjectionValidatorRegistry\b/,
    ),
    [],
  );
  assert.deepEqual(
    collectLineMatches(
      schemasIndexText,
      /\bgetExportPackageProjectionValidator\b/,
    ),
    [],
  );

  assert.deepEqual(
    collectCrossFunctionCallSites(governanceIndexText, [
      "validateSWEBodelningExportPackageProjection",
      "validateCMDExportPackageProjection",
    ]),
    [
      {
        fnName: "validateCMDExportPackageProjection",
        caller: "resolveCMDExportPackageProjection",
        line: 1827,
      },
    ],
  );

  assert.deepEqual(
    collectLineMatches(
      exportPackageApiTestText,
      /\bvalidateSWEBodelningExportPackageProjection\(/,
    ),
    [247],
  );
  assert.deepEqual(
    collectLineMatches(
      exportPackageApiTestText,
      /\bvalidateCMDExportPackageProjection\(/,
    ),
    [291],
  );
  assert.deepEqual(
    collectLineMatches(
      exportPackageAdapterRegistryTestText,
      /\bvalidateCMDExportPackageProjection\(/,
    ),
    [262],
  );
  assert.deepEqual(
    collectLineMatches(
      exportPackageAdapterRegistryTestText,
      /\bvalidateSWEBodelningExportPackageProjection\(/,
    ),
    [387],
  );
  assert.deepEqual(
    collectLineMatches(
      exportPackageGovernanceTestText,
      /\bvalidateSWEBodelningExportPackageProjection\(/,
    ),
    [212],
  );

  assert.match(
    exportPackageApiTestText,
    /validateSWEBodelningExportPackageProjection\(response\.body\)/,
  );
  assert.match(
    exportPackageApiTestText,
    /validateCMDExportPackageProjection\(response\.body\)/,
  );
  assert.match(
    exportPackageAdapterRegistryTestText,
    /validateCMDExportPackageProjection\(projection\)/,
  );
  assert.match(
    exportPackageAdapterRegistryTestText,
    /validateSWEBodelningExportPackageProjection\(latestProjection\)/,
  );
  assert.match(
    exportPackageGovernanceTestText,
    /validateSWEBodelningExportPackageProjection\(projection\)/,
  );
  assert.match(
    exportPackageGovernanceTestText,
    /snapshot_status\.source = persisted-current/,
  );
  assert.match(
    exportPackageGovernanceTestText,
    /snapshot_status\.source = persisted-stale/,
  );
  assert.match(exportPackageGovernanceTestText, /snapshot_export_version_found/);
  assert.match(exportPackageGovernanceTestText, /current_export_version/);
  assert.match(exportPackageGovernanceTestText, /snapshot_is_current/);
});
