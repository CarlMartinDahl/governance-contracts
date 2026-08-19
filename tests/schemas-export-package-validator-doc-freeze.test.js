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
const databaseIndexText = fs.readFileSync(
  path.join(__dirname, "..", "packages", "database", "src", "index.js"),
  "utf8",
);
const validatorDispatchRuntimeTestText = fs.readFileSync(
  path.join(__dirname, "export-package-validator-dispatch.test.js"),
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

test("docs freeze the shared packages/schemas export-package validator seam as the schema-side export-package validation boundary", () => {
  assert.match(
    docsText,
    /Shared Packages\/Schemas Export Package Validator Seam Freeze/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas\/src\/index\.js` export-package validator seam formed by `validateSWEBodelningExportPackage`, `validateCMDExportPackage`, and `validateExportPackage` is the canonical internal `packages\/schemas` export-package validation boundary for the current included schema-side flows below and is now frozen as the baseline seam/i,
  );
  assert.match(
    docsText,
    /the currently evidenced schema-side surfaces in this freeze are limited to:\s+`export_package` validator for `SWE_BODELNING`\s+`export_package` validator for `"CMD_PROFILE"`\s+shared generic `export_package` validator dispatch keyed by `jurisdiction_profile_key`/i,
  );
  assert.match(
    docsText,
    /the currently concrete shared helper responsibilities already evidenced for this seam are limited to:\s+shared top-level export-package object validation and required-key enforcement\s+shared non-empty `export_version`, `dossier_fingerprint`, and `generated_at` enforcement\s+shared manifest object-shape validation plus non-empty, duplicate-free, known-artifact enforcement for `manifest\.included_top_level_artifacts`\s+validating the `SWE_BODELNING` payload through the canonical `jurisdiction_profile_key` constant, `validateSWEBodelningProfileDossierSnapshot\(\.\.\.\)`, exact `canonical_source` key enforcement, and exact `canonical_source` plus `dossier_fingerprint` parity with the validated profile-dossier snapshot\s+validating the `"CMD_PROFILE"` payload through the canonical `jurisdiction_profile_key` constant, exact `canonical_source` key enforcement, non-empty canonical-source field enforcement, `canonical_source\.jurisdiction_profile_key` const enforcement, and `validateCMDProfileDossierSnapshotForExportPackage\(\.\.\.\)`\s+centralizing the explicit export-package validator entries for `SWE_BODELNING` and `"CMD_PROFILE"` inside the nearby export-package-specific registry object\s+returning the current export-package validator entry or `null` through the nearby export-package-specific lookup helper\s+dispatching generic export-package validation through the shared lookup helper when a non-empty `jurisdiction_profile_key` is present and otherwise through the current default-validator path backed by `Object\.values\(exportPackageValidatorRegistry\)\[0\]`\s+returning normalized canonical export-package payloads/i,
  );
  assert.match(
    docsText,
    /the current relationship to the higher export-package projection-validation surface already evidenced in `packages\/schemas\/src\/index\.js` is limited to `validateSWEBodelningExportPackageProjection` and `validateCMDExportPackageProjection` delegating lower export-package payload validation to `validateSWEBodelningExportPackage` and `validateCMDExportPackage` before their projection-specific `snapshot_status` validation/i,
  );
  assert.match(
    docsText,
    /the current relationship to the already-frozen export-package stop-outcome alignment seam, export-package stop-matrix alignment seam, and export-package traceability alignment seam already evidenced in docs\/tests is limited to those seams mapping documented blocked\/current baselines, reason-code cases, and schema\/projection output references rather than validating export-package payloads themselves/i,
  );
  assert.match(
    docsText,
    /the current bounded reuse already evidenced across repo code is limited to 2 profile-specific validator definitions, 1 export-package-specific registry definition, 1 export-package-specific lookup helper definition, 1 shared generic validator definition, 12 current schema-side reconstruction\/validator\/projection call sites, 27 current governance runtime\/helper call sites, 1 current database persistence call site in `persistCaseExportPackageSnapshot`, the current named module export surface exposing `exportPackageValidatorRegistry`, `getExportPackageValidator`, `validateSWEBodelningExportPackage`, `validateCMDExportPackage`, and `validateExportPackage`, and 1 current runtime proof file `tests\/export-package-validator-dispatch\.test\.js` spanning registry exposure, shared dispatch, CMD support, persistence use, unsupported-profile fail-closed behavior, and no SWE behavior drift/i,
  );
  assert.match(
    docsText,
    /the nearby `exportPackageValidatorRegistry` and `getExportPackageValidator` currently belong to the same centralized export-package validator seam because current repo evidence limits them to the export-package-specific validator block, 1 shared `validateExportPackage` dispatch path, the current named export surface, and the focused runtime proof rather than showing a separately reused competing boundary/i,
  );
  assert.match(
    docsText,
    /the broader shared `packages\/schemas` validator-dispatch scaffold remains outside this seam because it is the separately frozen cross-surface persisted-boundary scaffold spanning `release_eval`, `export_package`, artifact, and bundle surfaces rather than this narrower export-package validator sub-seam/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas` validation-helper scaffold remains outside this seam because machine-readable error construction, plain-object enforcement, key-shape validation, shared allowed-key enforcement, and shared string-enum enforcement are separate frozen internal boundaries consumed by the validator seam rather than defined by it/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas` export-artifact reconstruction helper scaffold remains outside this seam because artifact-body parsing and export-package reconstruction remain separate frozen lower responsibilities even where the current reconstruction helpers delegate final payload enforcement to the validator pair/i,
  );
  assert.match(
    docsText,
    /the frozen governance-side export-package adapter-dispatch seam remains outside this seam because runtime adapter lookup, generic derivation\/projection dispatch, and higher governance export-package behavior are separate runtime responsibilities even where current governance helpers call the lower export-package validators/i,
  );
  assert.match(
    docsText,
    /downstream governance, persistence, API route\/runtime, and other adapter behavior remain outside this seam because they may call the validator seam but do not define the canonical shared schema-side export-package validation boundary themselves/i,
  );
  assert.match(
    docsText,
    /future `packages\/schemas` export-package validation that needs the same SWE\/CMD validator pair plus generic dispatch path should extend this seam instead of introducing parallel export-package validator stacks inside projections, artifact validators, governance helpers, or routes/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, validation semantics, alignment semantics, projection semantics, governance semantics, schema behavior, or fail-closed behavior/i,
  );

  assert.match(
    schemasIndexText,
    /function validateSWEBodelningExportPackage\(\s*input,\s*errorCode = "ERR_EXPORT_PACKAGE_INVALID",\s*\)/,
  );
  assert.match(
    schemasIndexText,
    /assertExactKeys\(input, exportPackageRequiredKeys, errorCode, "input"\);/,
  );
  assert.match(
    schemasIndexText,
    /input\.jurisdiction_profile_key !==\s*sweBodelningExportPackage\.properties\.jurisdiction_profile_key\.const/,
  );
  assert.match(
    schemasIndexText,
    /for \(const field of \["export_version", "dossier_fingerprint", "generated_at"\]\)/,
  );
  assert.match(
    schemasIndexText,
    /assertExactKeys\(\s*input\.manifest,\s*exportPackageManifestRequiredKeys,\s*errorCode,\s*"manifest",\s*\);/,
  );
  assert.match(
    schemasIndexText,
    /manifest\.included_top_level_artifacts must not contain duplicates/,
  );
  assert.match(
    schemasIndexText,
    /const profileDossierSnapshot = validateSWEBodelningProfileDossierSnapshot\(\s*input\.profile_dossier_snapshot,\s*errorCode,\s*\);/,
  );
  assert.match(
    schemasIndexText,
    /assertExactKeys\(\s*input\.canonical_source,\s*dossierCanonicalSourceRequiredKeys,\s*errorCode,\s*"canonical_source",\s*\);/,
  );
  assert.match(
    schemasIndexText,
    /canonical_source\.\$\{field\} must match profile_dossier_snapshot\.canonical_source\.\$\{field\}/,
  );
  assert.match(
    schemasIndexText,
    /dossier_fingerprint must match profile_dossier_snapshot\.dossier_fingerprint/,
  );
  assert.match(
    schemasIndexText,
    /canonical_source: profileDossierSnapshot\.canonical_source,/,
  );

  assert.match(
    schemasIndexText,
    /function validateCMDExportPackage\(\s*input,\s*errorCode = "ERR_EXPORT_PACKAGE_INVALID",\s*\)/,
  );
  assert.match(
    schemasIndexText,
    /assertExactKeys\(input, cmdExportPackageRequiredKeys, errorCode, "input"\);/,
  );
  assert.match(
    schemasIndexText,
    /assertExactKeys\(\s*input\.canonical_source,\s*cmdExportPackageCanonicalSourceRequiredKeys,\s*errorCode,\s*"canonical_source",\s*\);/,
  );
  assert.match(
    schemasIndexText,
    /canonical_source\.\$\{field\} must be a non-empty string/,
  );
  assert.match(
    schemasIndexText,
    /input\.canonical_source\.jurisdiction_profile_key !==\s*cmdExportPackage\.\$defs\.exportPackageCanonicalSource\.properties\s*\.jurisdiction_profile_key\.const/,
  );
  assert.match(
    schemasIndexText,
    /const profileDossierSnapshot = validateCMDProfileDossierSnapshotForExportPackage\(\s*input\.profile_dossier_snapshot,\s*errorCode,\s*\);/,
  );
  assert.match(
    schemasIndexText,
    /canonical_source: \{\s*release_eval_run_id: input\.canonical_source\.release_eval_run_id,\s*evaluator_version: input\.canonical_source\.evaluator_version,\s*jurisdiction_profile_key: input\.canonical_source\.jurisdiction_profile_key,\s*persisted_at: input\.canonical_source\.persisted_at,\s*\},/s,
  );

  assert.match(
    schemasIndexText,
    /const sweBodelningExportPackageValidator = Object\.freeze\(\{\s*jurisdiction_profile_key:\s*sweBodelningExportPackage\.properties\.jurisdiction_profile_key\.const,\s*validateExportPackage: validateSWEBodelningExportPackage,\s*\}\);/s,
  );
  assert.match(
    schemasIndexText,
    /const cmdExportPackageValidator = Object\.freeze\(\{\s*jurisdiction_profile_key: cmdExportPackage\.properties\.jurisdiction_profile_key\.const,\s*validateExportPackage: validateCMDExportPackage,\s*\}\);/s,
  );
  assert.match(
    schemasIndexText,
    /const exportPackageValidatorRegistry = Object\.freeze\(\{\s*\[sweBodelningExportPackageValidator\.jurisdiction_profile_key\]:\s*sweBodelningExportPackageValidator,\s*\[cmdExportPackageValidator\.jurisdiction_profile_key\]: cmdExportPackageValidator,\s*\}\);/s,
  );
  assert.match(
    schemasIndexText,
    /function getExportPackageValidator\(jurisdictionProfileKey\)\s*\{[\s\S]*return exportPackageValidatorRegistry\[jurisdictionProfileKey\] \?\? null;\s*\}/,
  );
  assert.match(
    schemasIndexText,
    /function validateExportPackage\(input\)\s*\{[\s\S]*const validator = getExportPackageValidator\(input\.jurisdiction_profile_key\);[\s\S]*return validator\.validateExportPackage\(input\);[\s\S]*const defaultValidator = Object\.values\(exportPackageValidatorRegistry\)\[0\];[\s\S]*return defaultValidator\.validateExportPackage\(input\);[\s\S]*\}/,
  );

  assert.deepEqual(
    collectLineMatches(schemasIndexText, /\bvalidateSWEBodelningExportPackage\b/),
    [2920, 3025, 3141, 9302, 9912, 10993, 12487, 12755, 13024],
  );
  assert.deepEqual(
    collectLineMatches(schemasIndexText, /\bvalidateCMDExportPackage\b/),
    [3083, 3199, 9773, 9917, 11085, 12205, 12394, 12841, 13050],
  );
  assert.deepEqual(
    collectLineMatches(schemasIndexText, /\bvalidateExportPackage\b/),
    [9912, 9917, 9937, 9948, 9953, 13082],
  );
  assert.deepEqual(
    collectLineMatches(schemasIndexText, /\bexportPackageValidatorRegistry\b/),
    [9920, 9934, 9952, 12927],
  );
  assert.deepEqual(
    collectLineMatches(schemasIndexText, /\bgetExportPackageValidator\b/),
    [9926, 9945, 12934],
  );

  assert.deepEqual(
    collectCrossFunctionCallSites(schemasIndexText, [
      "validateSWEBodelningExportPackage",
      "validateCMDExportPackage",
    ]),
    [
      {
        fnName: "validateSWEBodelningExportPackage",
        caller: "reconstructSWEBodelningExportPackageFromMarkdownArtifactBody",
        line: 2920,
      },
      {
        fnName: "validateSWEBodelningExportPackage",
        caller: "reconstructSWEBodelningExportPackageFromPdfArtifactBody",
        line: 3025,
      },
      {
        fnName: "validateCMDExportPackage",
        caller: "reconstructCMDExportPackageFromPdfArtifactBody",
        line: 3083,
      },
      {
        fnName: "validateSWEBodelningExportPackage",
        caller: "reconstructSWEBodelningExportPackageFromDocxArtifactBody",
        line: 3141,
      },
      {
        fnName: "validateCMDExportPackage",
        caller: "reconstructCMDExportPackageFromDocxArtifactBody",
        line: 3199,
      },
      {
        fnName: "validateSWEBodelningExportPackage",
        caller: "validateSWEBodelningExportPackageJsonArtifact",
        line: 10993,
      },
      {
        fnName: "validateCMDExportPackage",
        caller: "validateCMDExportPackageJsonArtifact",
        line: 11085,
      },
      {
        fnName: "validateCMDExportPackage",
        caller: "reconstructCMDExportPackageFromMarkdownArtifactBody",
        line: 12205,
      },
      {
        fnName: "validateCMDExportPackage",
        caller: "validateCMDExportPackageJsonArtifactProjection",
        line: 12394,
      },
      {
        fnName: "validateSWEBodelningExportPackage",
        caller: "validateSWEBodelningExportPackageJsonArtifactProjection",
        line: 12487,
      },
      {
        fnName: "validateSWEBodelningExportPackage",
        caller: "validateSWEBodelningExportPackageProjection",
        line: 12755,
      },
      {
        fnName: "validateCMDExportPackage",
        caller: "validateCMDExportPackageProjection",
        line: 12841,
      },
    ],
  );
  assert.deepEqual(
    collectCrossFunctionCallSites(schemasIndexText, ["validateExportPackage"]),
    [],
  );
  assert.deepEqual(
    collectCrossFunctionCallSites(governanceIndexText, [
      "validateSWEBodelningExportPackage",
      "validateCMDExportPackage",
    ]),
    [
      {
        fnName: "validateCMDExportPackage",
        caller: "deriveCMDExportPackageFromProfileDossierSnapshot",
        line: 1757,
      },
      {
        fnName: "validateCMDExportPackage",
        caller: "deriveCMDExportPackageSnapshotStatus",
        line: 1790,
      },
      {
        fnName: "validateCMDExportPackage",
        caller: "resolveCMDExportPackageProjection",
        line: 1823,
      },
      {
        fnName: "validateSWEBodelningExportPackage",
        caller: "deriveSWEBodelningExportPackageJsonArtifact",
        line: 1928,
      },
      {
        fnName: "validateCMDExportPackage",
        caller: "deriveCMDExportPackageJsonArtifact",
        line: 1942,
      },
      {
        fnName: "validateCMDExportPackage",
        caller: "deriveCMDExportPackageFromJsonArtifact",
        line: 1966,
      },
      {
        fnName: "validateCMDExportPackage",
        caller: "deriveCMDExportPackageJsonArtifactSnapshotStatus",
        line: 1988,
      },
      {
        fnName: "validateSWEBodelningExportPackage",
        caller: "deriveSWEBodelningExportPackageDocxArtifact",
        line: 2109,
      },
      {
        fnName: "validateCMDExportPackage",
        caller: "deriveCMDExportPackageDocxArtifact",
        line: 2142,
      },
      {
        fnName: "validateCMDExportPackage",
        caller: "deriveCMDExportPackageDocxArtifactSnapshotStatus",
        line: 2200,
      },
      {
        fnName: "validateSWEBodelningExportPackage",
        caller: "deriveSWEBodelningExportPackagePdfArtifact",
        line: 2381,
      },
      {
        fnName: "validateCMDExportPackage",
        caller: "deriveCMDExportPackagePdfArtifact",
        line: 2413,
      },
      {
        fnName: "validateCMDExportPackage",
        caller: "deriveCMDExportPackagePdfArtifactSnapshotStatus",
        line: 2470,
      },
      {
        fnName: "validateSWEBodelningExportPackage",
        caller: "deriveSWEBodelningExportPackageMarkdownArtifact",
        line: 2650,
      },
      {
        fnName: "validateCMDExportPackage",
        caller: "deriveCMDExportPackageMarkdownArtifact",
        line: 2692,
      },
      {
        fnName: "validateCMDExportPackage",
        caller: "deriveCMDExportPackageMarkdownArtifactSnapshotStatus",
        line: 2768,
      },
      {
        fnName: "validateSWEBodelningExportPackage",
        caller: "deriveSWEBodelningExportPackageBundleManifest",
        line: 2969,
      },
      {
        fnName: "validateCMDExportPackage",
        caller: "deriveCMDExportPackageBundleManifest",
        line: 3041,
      },
      {
        fnName: "validateSWEBodelningExportPackage",
        caller: "deriveSWEBodelningExportPackageFromJsonArtifact",
        line: 3830,
      },
      {
        fnName: "validateSWEBodelningExportPackage",
        caller: "deriveSWEBodelningExportPackageJsonArtifactSnapshotStatus",
        line: 3978,
      },
      {
        fnName: "validateSWEBodelningExportPackage",
        caller: "deriveSWEBodelningExportPackagePdfArtifactSnapshotStatus",
        line: 4038,
      },
      {
        fnName: "validateSWEBodelningExportPackage",
        caller: "deriveSWEBodelningExportPackageDocxArtifactSnapshotStatus",
        line: 4098,
      },
      {
        fnName: "validateSWEBodelningExportPackage",
        caller: "deriveSWEBodelningExportPackageMarkdownArtifactSnapshotStatus",
        line: 4329,
      },
      {
        fnName: "validateSWEBodelningExportPackage",
        caller: "deriveSWEBodelningExportPackageBundleManifestSnapshotStatus",
        line: 4449,
      },
      {
        fnName: "validateCMDExportPackage",
        caller: "deriveCMDExportPackageBundleManifestSnapshotStatus",
        line: 4573,
      },
      {
        fnName: "validateSWEBodelningExportPackage",
        caller: "deriveSWEBodelningExportPackageSnapshotStatus",
        line: 4750,
      },
      {
        fnName: "validateSWEBodelningExportPackage",
        caller: "resolveSWEBodelningExportPackageProjection",
        line: 4785,
      },
    ],
  );
  assert.deepEqual(
    collectCrossFunctionCallSites(governanceIndexText, ["validateExportPackage"]),
    [],
  );
  assert.deepEqual(
    collectCrossFunctionCallSites(databaseIndexText, ["validateExportPackage"]),
    [
      {
        fnName: "validateExportPackage",
        caller: "persistCaseExportPackageSnapshot",
        line: 848,
      },
    ],
  );
  assert.deepEqual(
    collectLineMatches(governanceIndexText, /\bexportPackageValidatorRegistry\b/),
    [],
  );
  assert.deepEqual(
    collectLineMatches(governanceIndexText, /\bgetExportPackageValidator\b/),
    [],
  );
  assert.deepEqual(
    collectLineMatches(databaseIndexText, /\bexportPackageValidatorRegistry\b/),
    [],
  );
  assert.deepEqual(
    collectLineMatches(databaseIndexText, /\bgetExportPackageValidator\b/),
    [],
  );

  assert.match(
    validatorDispatchRuntimeTestText,
    /the generic validator dispatch exposes the explicit CMD_PROFILE export package validator entry/,
  );
  assert.match(
    validatorDispatchRuntimeTestText,
    /packages\/database persisted export package validation uses the dispatch path while preserving current SWE_BODELNING behavior/,
  );
  assert.match(
    validatorDispatchRuntimeTestText,
    /the CMD_PROFILE entry validates the documented schema shape through the shared dispatch path/,
  );
  assert.match(
    validatorDispatchRuntimeTestText,
    /runtime support for CMD_PROFILE export-package persistence is enabled through the shared validator path/,
  );
  assert.match(
    validatorDispatchRuntimeTestText,
    /unsupported\/non-SWE machine-readable behavior remains unchanged/,
  );
  assert.match(
    validatorDispatchRuntimeTestText,
    /no current SWE_BODELNING schema\/output changes are introduced/,
  );
});
