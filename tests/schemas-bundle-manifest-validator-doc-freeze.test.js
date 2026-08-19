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
const projectionFreezeTestText = fs.readFileSync(
  path.join(__dirname, "schemas-bundle-manifest-projection-validator-doc-freeze.test.js"),
  "utf8",
);
const validatorDispatchTestText = fs.readFileSync(
  path.join(__dirname, "export-package-bundle-manifest-validator-dispatch.test.js"),
  "utf8",
);
const manifestProjectionRuntimeTestText = fs.readFileSync(
  path.join(__dirname, "export-package-bundle-manifest-projection.test.js"),
  "utf8",
);
const governanceManifestFreezeTestText = fs.readFileSync(
  path.join(
    __dirname,
    "governance-export-package-bundle-manifest-adapter-dispatch-doc-freeze.test.js",
  ),
  "utf8",
);
const governanceBundleArchiveFreezeTestText = fs.readFileSync(
  path.join(
    __dirname,
    "governance-export-package-bundle-archive-artifact-adapter-dispatch-doc-freeze.test.js",
  ),
  "utf8",
);
const governanceStoredZipFreezeTestText = fs.readFileSync(
  path.join(__dirname, "governance-stored-zip-helper-doc-freeze.test.js"),
  "utf8",
);
const governanceCanonicalJsonFreezeTestText = fs.readFileSync(
  path.join(__dirname, "governance-canonical-json-helper-doc-freeze.test.js"),
  "utf8",
);
const schemasValidationHelperFreezeTestText = fs.readFileSync(
  path.join(__dirname, "schemas-validation-helper-doc-freeze.test.js"),
  "utf8",
);
const schemasReconstructionFreezeTestText = fs.readFileSync(
  path.join(__dirname, "schemas-artifact-reconstruction-doc-freeze.test.js"),
  "utf8",
);

function collectLineMatches(text, pattern) {
  const lines = text.split("\n");
  const matches = [];

  for (let index = 0; index < lines.length; index += 1) {
    if (pattern.test(lines[index])) {
      matches.push(index + 1);
    }
  }

  return matches;
}

function collectCallSites(text, targetFns) {
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

    for (const fnName of targetFns) {
      if (lines[index].includes(`${fnName}(`) && currentFunction !== fnName) {
        callSites.push({ fnName, caller: currentFunction, line: index + 1 });
      }
    }
  }

  return callSites;
}

test("docs freeze the shared packages/schemas bundle/package manifest validator seam as the schema-side manifest validation boundary", () => {
  assert.match(
    docsText,
    /Shared Packages\/Schemas Bundle\/Package Manifest Validator Seam Freeze/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas\/src\/index\.js` bundle\/package manifest validator seam formed by `validateSWEBodelningExportPackageBundleManifest`, `validateCMDExportPackageBundleManifest`, `exportPackageBundleManifestValidatorRegistry`, `getExportPackageBundleManifestValidator`, and `validateExportPackageBundleManifest` is the canonical internal `packages\/schemas` bundle\/package manifest validation boundary for the current included schema-side flows below and is now frozen as the baseline seam/i,
  );
  assert.match(
    docsText,
    /the currently evidenced schema-side surfaces in this freeze are limited to:\s+`export_package_bundle_manifest` validator for `SWE_BODELNING`\s+`export_package_bundle_manifest` validator for `"CMD_PROFILE"`\s+validator lookup keyed by `jurisdiction_profile_key`\s+generic `export_package_bundle_manifest` validator dispatch for persisted bundle\/package manifest snapshots/i,
  );
  assert.match(
    docsText,
    /the currently concrete shared helper responsibilities already evidenced for this seam are limited to:\s+shared manifest-envelope validation for `jurisdiction_profile_key`, `package_version`, `export_version`, `dossier_fingerprint`, `canonical_source`, `generated_at`, and `artifacts`\s+enforcing non-empty top-level manifest identity\/version\/timestamp strings for `package_version`, `export_version`, `dossier_fingerprint`, and `generated_at`\s+enforcing profile-specific `canonical_source` key shape and non-empty string field validation, plus the current `CMD_PROFILE` `canonical_source\.jurisdiction_profile_key` support check\s+enforcing `artifacts` as a non-empty array\s+enforcing per-artifact key shape and non-empty string `artifact_type`, `filename`, `content_type`, and `encoding`\s+centralizing the explicit bundle\/package manifest validator entries for `SWE_BODELNING` and `"CMD_PROFILE"` inside the shared registry object\s+returning the current validator entry or `null` through the shared `getExportPackageBundleManifestValidator` lookup helper\s+dispatching generic bundle\/package manifest validation first through top-level `jurisdiction_profile_key` when present and otherwise through the current default-validator path backed by `Object\.values\(exportPackageBundleManifestValidatorRegistry\)\[0\]`\s+returning the normalized manifest object with validated bundle\/package manifest fields/i,
  );
  assert.match(
    docsText,
    /the current relationship to the higher bundle\/package manifest projection-validator pair already evidenced in `packages\/schemas\/src\/index\.js` is limited to `validateSWEBodelningExportPackageBundleManifestProjection` and `validateCMDExportPackageBundleManifestProjection` delegating lower manifest validation to the shared validator seam before their projection-level `snapshot_status` validation/i,
  );
  assert.match(
    docsText,
    /the current relationship to the already-frozen governance-side bundle-manifest adapter-dispatch seam already evidenced in repo code is limited to the governance-side adapter layer delegating through profile-specific governance helpers, while those helpers currently call `validateSWEBodelningExportPackageBundleManifest` and `validateCMDExportPackageBundleManifest` directly rather than routing through the schema-side registry\/lookup\/generic-dispatch seam itself/i,
  );
  assert.match(
    docsText,
    /the current relationship to persisted bundle\/package manifest storage already evidenced in `packages\/database\/src\/index\.js` is limited to `persistCaseExportPackageBundleManifestSnapshot` calling `validateExportPackageBundleManifest` before canonical snapshot storage/i,
  );
  assert.match(
    docsText,
    /the current bounded reuse already evidenced across repo code is limited to 2 profile-specific validator definitions, 2 current higher projection-validator call sites inside `packages\/schemas\/src\/index\.js`, 1 shared validator registry definition, 1 shared lookup helper definition with 1 current internal generic-dispatch lookup call site, 1 shared generic dispatch helper definition with 1 current default-validator fallback path, 1 current `packages\/database` persisted-validation call site, 12 current governance runtime\/helper call sites spanning `deriveSWEBodelningExportPackageBundleManifestFingerprint`, `deriveCMDExportPackageBundleManifestFingerprint`, `deriveSWEBodelningExportPackageBundleManifest`, `deriveCMDExportPackageBundleManifest`, `resolveSWEBodelningExportPackageBundleManifestProjection`, `resolveCMDExportPackageBundleManifestProjection`, `deriveSWEBodelningExportPackageBundleManifestSnapshotStatus`, `deriveCMDExportPackageBundleManifestSnapshotStatus`, `deriveSWEBodelningExportPackageBundleArchiveArtifact`, `deriveCMDExportPackageBundleArchiveArtifact`, `deriveSWEBodelningExportPackageBundleArchiveArtifactSnapshotStatus`, and `deriveCMDExportPackageBundleArchiveArtifactSnapshotStatus`, and the current named module export surface exposing `exportPackageBundleManifestValidatorRegistry`, `getExportPackageBundleManifestValidator`, `validateExportPackageBundleManifest`, `validateSWEBodelningExportPackageBundleManifest`, and `validateCMDExportPackageBundleManifest`/i,
  );
  assert.match(
    docsText,
    /the higher bundle\/package manifest projection-validator pair remains outside this helper seam because projection-level `snapshot_status` validation and normalized projection return-shape enforcement are separate higher responsibilities consumed after lower manifest validation succeeds/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas` validation-helper scaffold remains outside this seam because machine-readable error construction, plain-object enforcement, and key-shape validation are separate frozen internal boundaries consumed by the validator seam rather than defined by it/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas` export-artifact reconstruction helper scaffold remains outside this seam because bundle\/package manifest validation operates on manifest-envelope objects and does not reconstruct artifact bodies or export packages/i,
  );
  assert.match(
    docsText,
    /the frozen governance-side bundle-manifest adapter-dispatch seam remains outside this seam because governance adapter lookup and generic projection\/derivation dispatch are separate higher runtime responsibilities even where profile-specific governance helpers currently consume the lower schema validator pair/i,
  );
  assert.match(
    docsText,
    /the frozen governance-side bundle\/archive artifact adapter-dispatch seam remains outside this seam because higher final bundle\/archive derivation, projection, and currentness behavior are separate higher runtime responsibilities even where current bundle\/archive helpers consume the lower schema validator pair/i,
  );
  assert.match(
    docsText,
    /the shared governance `buildStoredZip` helper seam remains outside this seam because ZIP container assembly is a separate frozen governance boundary/i,
  );
  assert.match(
    docsText,
    /the shared governance `toCanonicalJson` helper seam remains outside this seam because canonical JSON serialization and higher manifest fingerprint\/currentness comparison are separate frozen governance boundaries/i,
  );
  assert.match(
    docsText,
    /downstream governance adapter, persistence, artifact-derivation, and route\/runtime behavior remain outside this seam because they may call or consume the shared validator seam but do not define the canonical schema-side bundle\/package manifest validation boundary themselves/i,
  );
  assert.match(
    docsText,
    /future `packages\/schemas` bundle\/package manifest validation that needs the same profile-specific envelope checks and registry-backed dispatch should extend this seam instead of introducing parallel validator stacks inside governance helpers, persistence, or routes/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, bundle\/package manifest validation semantics, dispatch semantics, governance semantics, schema behavior, or fail-closed behavior/i,
  );

  assert.match(
    schemasIndexText,
    /function validateSWEBodelningExportPackageBundleManifest\(\s*input,\s*errorCode = "ERR_EXPORT_PACKAGE_BUNDLE_MANIFEST_INVALID",\s*\)/,
  );
  assert.match(
    schemasIndexText,
    /assertExactKeys\(input,\s*exportPackageBundleManifestRequiredKeys,\s*errorCode,\s*"input"\);/,
  );
  assert.match(
    schemasIndexText,
    /assertPlainObject\(input\.canonical_source,\s*errorCode,\s*"canonical_source"\);/,
  );
  assert.match(schemasIndexText, /\bdossierCanonicalSourceRequiredKeys\b/);
  assert.match(
    schemasIndexText,
    /\bexportPackageBundleManifestArtifactRequiredKeys\b/,
  );
  assert.match(
    schemasIndexText,
    /return \{\s*jurisdiction_profile_key:\s*input\.jurisdiction_profile_key,[\s\S]*?artifacts:\s*input\.artifacts\.map\(/,
  );
  assert.match(
    schemasIndexText,
    /function validateCMDExportPackageBundleManifest\(\s*input,\s*errorCode = "ERR_EXPORT_PACKAGE_BUNDLE_MANIFEST_INVALID",\s*\)/,
  );
  assert.match(
    schemasIndexText,
    /assertExactKeys\(input,\s*cmdExportPackageBundleManifestRequiredKeys,\s*errorCode,\s*"input"\);/,
  );
  assert.match(
    schemasIndexText,
    /assertPlainObject\(input\.canonical_source,\s*errorCode,\s*"canonical_source"\);/,
  );
  assert.match(
    schemasIndexText,
    /\bcmdExportPackageCanonicalSourceRequiredKeys\b/,
  );
  assert.match(
    schemasIndexText,
    /input\.canonical_source\.jurisdiction_profile_key\s*!==/,
  );
  assert.match(
    schemasIndexText,
    /\bcmdExportPackageBundleManifestArtifactRequiredKeys\b/,
  );
  assert.match(
    schemasIndexText,
    /return \{\s*jurisdiction_profile_key:\s*input\.jurisdiction_profile_key,[\s\S]*?artifacts:\s*input\.artifacts\.map\(/,
  );
  assert.match(
    schemasIndexText,
    /const exportPackageBundleManifestValidatorRegistry = Object\.freeze\(\{\s*\[sweBodelningExportPackageBundleManifestValidator\.jurisdiction_profile_key\]:\s*sweBodelningExportPackageBundleManifestValidator,\s*\[cmdExportPackageBundleManifestValidator\.jurisdiction_profile_key\]:\s*cmdExportPackageBundleManifestValidator,\s*\}\);/,
  );
  assert.match(
    schemasIndexText,
    /function getExportPackageBundleManifestValidator\(jurisdictionProfileKey\)\s*\{[\s\S]*return exportPackageBundleManifestValidatorRegistry\[jurisdictionProfileKey\] \?\? null;[\s\S]*\}/,
  );
  assert.match(
    schemasIndexText,
    /function validateExportPackageBundleManifest\(input\)\s*\{[\s\S]*typeof input\.jurisdiction_profile_key === "string"[\s\S]*const validator = getExportPackageBundleManifestValidator\([\s\S]*input\.jurisdiction_profile_key,[\s\S]*return validator\.validateExportPackageBundleManifest\(input\);[\s\S]*const defaultValidator = Object\.values\(\s*exportPackageBundleManifestValidatorRegistry,\s*\)\[0\];\s*return defaultValidator\.validateExportPackageBundleManifest\(input\);\s*\}/,
  );
  assert.match(
    schemasIndexText,
    /function validateSWEBodelningExportPackageBundleManifestProjection\([\s\S]*validateSWEBodelningExportPackageBundleManifest\(/,
  );
  assert.match(
    schemasIndexText,
    /function validateCMDExportPackageBundleManifestProjection\([\s\S]*validateCMDExportPackageBundleManifest\(/,
  );
  assert.match(databaseIndexText, /validateExportPackageBundleManifest,\n/);
  assert.match(
    databaseIndexText,
    /async function persistCaseExportPackageBundleManifestSnapshot\([\s\S]*const canonicalExportPackageBundleManifest =\s*validateExportPackageBundleManifest\(\s*exportPackageBundleManifestSnapshot\s*\);/,
  );
  assert.doesNotMatch(governanceIndexText, /\bgetExportPackageBundleManifestValidator\s*\(/);
  assert.doesNotMatch(governanceIndexText, /\bvalidateExportPackageBundleManifest\s*\(/);

  assert.deepEqual(
    collectLineMatches(
      schemasIndexText,
      /\bexportPackageBundleManifestValidatorRegistry\b/,
    ),
    [10202, 10217, 10238, 12922],
  );
  assert.deepEqual(
    collectLineMatches(
      schemasIndexText,
      /\bgetExportPackageBundleManifestValidator\b/,
    ),
    [10209, 10228, 12929],
  );
  assert.deepEqual(
    collectLineMatches(
      schemasIndexText,
      /\bvalidateExportPackageBundleManifest\b/,
    ),
    [10193, 10199, 10220, 10233, 10240, 13015],
  );
  assert.deepEqual(
    collectLineMatches(
      schemasIndexText,
      /\bvalidateSWEBodelningExportPackageBundleManifest\b/,
    ),
    [9956, 10193, 10752, 13022],
  );
  assert.deepEqual(
    collectLineMatches(
      schemasIndexText,
      /\bvalidateCMDExportPackageBundleManifest\b/,
    ),
    [10066, 10199, 10846, 13018],
  );

  assert.deepEqual(
    collectCallSites(schemasIndexText, [
      "getExportPackageBundleManifestValidator",
      "validateSWEBodelningExportPackageBundleManifest",
      "validateCMDExportPackageBundleManifest",
    ]),
    [
      {
        fnName: "getExportPackageBundleManifestValidator",
        caller: "validateExportPackageBundleManifest",
        line: 10228,
      },
      {
        fnName: "validateSWEBodelningExportPackageBundleManifest",
        caller: "validateSWEBodelningExportPackageBundleManifestProjection",
        line: 10752,
      },
      {
        fnName: "validateCMDExportPackageBundleManifest",
        caller: "validateCMDExportPackageBundleManifestProjection",
        line: 10846,
      },
    ],
  );
  assert.deepEqual(
    collectCallSites(databaseIndexText, ["validateExportPackageBundleManifest"]),
    [
      {
        fnName: "validateExportPackageBundleManifest",
        caller: "persistCaseExportPackageBundleManifestSnapshot",
        line: 954,
      },
    ],
  );
  assert.deepEqual(
    collectCallSites(governanceIndexText, [
      "validateSWEBodelningExportPackageBundleManifest",
      "validateCMDExportPackageBundleManifest",
    ]),
    [
      {
        fnName: "validateSWEBodelningExportPackageBundleManifest",
        caller: "deriveSWEBodelningExportPackageBundleManifestFingerprint",
        line: 2943,
      },
      {
        fnName: "validateCMDExportPackageBundleManifest",
        caller: "deriveCMDExportPackageBundleManifestFingerprint",
        line: 2954,
      },
      {
        fnName: "validateSWEBodelningExportPackageBundleManifest",
        caller: "deriveSWEBodelningExportPackageBundleManifest",
        line: 3013,
      },
      {
        fnName: "validateCMDExportPackageBundleManifest",
        caller: "deriveCMDExportPackageBundleManifest",
        line: 3087,
      },
      {
        fnName: "validateCMDExportPackageBundleManifest",
        caller: "resolveCMDExportPackageBundleManifestProjection",
        line: 3108,
      },
      {
        fnName: "validateSWEBodelningExportPackageBundleManifest",
        caller: "deriveSWEBodelningExportPackageBundleArchiveArtifact",
        line: 3367,
      },
      {
        fnName: "validateSWEBodelningExportPackageBundleManifest",
        caller: "deriveSWEBodelningExportPackageBundleArchiveArtifactSnapshotStatus",
        line: 3462,
      },
      {
        fnName: "validateCMDExportPackageBundleManifest",
        caller: "deriveCMDExportPackageBundleArchiveArtifact",
        line: 3535,
      },
      {
        fnName: "validateCMDExportPackageBundleManifest",
        caller: "deriveCMDExportPackageBundleArchiveArtifactSnapshotStatus",
        line: 3637,
      },
      {
        fnName: "validateSWEBodelningExportPackageBundleManifest",
        caller: "deriveSWEBodelningExportPackageBundleManifestSnapshotStatus",
        line: 4437,
      },
      {
        fnName: "validateSWEBodelningExportPackageBundleManifest",
        caller: "resolveSWEBodelningExportPackageBundleManifestProjection",
        line: 4542,
      },
      {
        fnName: "validateCMDExportPackageBundleManifest",
        caller: "deriveCMDExportPackageBundleManifestSnapshotStatus",
        line: 4561,
      },
    ],
  );

  assert.match(
    projectionFreezeTestText,
    /Shared Packages\\\/Schemas Bundle\\\/Package Manifest Projection-Validator Seam Freeze/i,
  );
  assert.match(
    projectionFreezeTestText,
    /calling `validateSWEBodelningExportPackageBundleManifest` and `validateCMDExportPackageBundleManifest` before their projection-level `snapshot_status` validation/i,
  );
  assert.match(
    governanceManifestFreezeTestText,
    /Shared Governance Export Package Bundle\\\/Package Manifest Adapter-Dispatch Seam Freeze/i,
  );
  assert.match(
    governanceBundleArchiveFreezeTestText,
    /Shared Governance Export Package Bundle\\\/Archive Artifact Adapter-Dispatch Seam Freeze/i,
  );
  assert.match(
    governanceStoredZipFreezeTestText,
    /Shared Governance Stored-ZIP Helper Seam Freeze/i,
  );
  assert.match(
    governanceCanonicalJsonFreezeTestText,
    /Shared Governance Canonical-JSON Helper Seam Freeze/i,
  );
  assert.match(
    schemasValidationHelperFreezeTestText,
    /Shared Packages\\\/Schemas Validation Helper Scaffold Freeze/i,
  );
  assert.match(
    schemasReconstructionFreezeTestText,
    /Shared Packages\\\/Schemas Export-Artifact Reconstruction Helper Scaffold Freeze/i,
  );
  assert.match(
    validatorDispatchTestText,
    /the generic validator dispatch exposes the explicit CMD_PROFILE bundle\/package manifest validator entry/,
  );
  assert.match(
    validatorDispatchTestText,
    /packages\/database persisted bundle\/package manifest validation uses the dispatch path while preserving current SWE_BODELNING behavior/,
  );
  assert.match(
    manifestProjectionRuntimeTestText,
    /the bundle\/package manifest projection schema includes the read-time snapshot_status surface/,
  );
  assert.match(
    manifestProjectionRuntimeTestText,
    /validateSWEBodelningExportPackageBundleManifestProjection/,
  );
});
