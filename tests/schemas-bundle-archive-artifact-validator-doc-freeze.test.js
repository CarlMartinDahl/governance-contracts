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
const governanceBundleArchiveFreezeTestText = fs.readFileSync(
  path.join(
    __dirname,
    "governance-export-package-bundle-archive-artifact-adapter-dispatch-doc-freeze.test.js",
  ),
  "utf8",
);
const governanceBundleManifestFreezeTestText = fs.readFileSync(
  path.join(
    __dirname,
    "governance-export-package-bundle-manifest-adapter-dispatch-doc-freeze.test.js",
  ),
  "utf8",
);
const governanceStoredZipFreezeTestText = fs.readFileSync(
  path.join(__dirname, "governance-stored-zip-helper-doc-freeze.test.js"),
  "utf8",
);
const governanceArtifactDerivationFreezeTestText = fs.readFileSync(
  path.join(__dirname, "governance-artifact-derivation-doc-freeze.test.js"),
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
const validatorDispatchTestText = fs.readFileSync(
  path.join(__dirname, "export-package-bundle-archive-artifact-validator-dispatch.test.js"),
  "utf8",
);
const bundleArchiveArtifactTestText = fs.readFileSync(
  path.join(__dirname, "export-package-bundle-archive-artifact.test.js"),
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

test("docs freeze the shared packages/schemas bundle/archive artifact validator seam as the schema-side final archive validation boundary", () => {
  assert.match(
    docsText,
    /Shared Packages\/Schemas Bundle\/Archive Artifact Validator Seam Freeze/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas\/src\/index\.js` bundle\/archive artifact validator seam formed by `validateSWEBodelningExportPackageBundleArchiveArtifact`, `validateCMDExportPackageBundleArchiveArtifact`, `exportPackageBundleArchiveArtifactValidatorRegistry`, `getExportPackageBundleArchiveArtifactValidator`, and `validateExportPackageBundleArchiveArtifact` is the canonical internal `packages\/schemas` final bundle\/archive artifact validation boundary for the current included schema-side flows below and is now frozen as the baseline seam/i,
  );
  assert.match(
    docsText,
    /the currently evidenced schema-side surfaces in this freeze are limited to:\s+`export_package_bundle_archive_artifact` validator for `SWE_BODELNING`\s+`export_package_bundle_archive_artifact` validator for `"CMD_PROFILE"`\s+validator lookup keyed by `jurisdiction_profile_key`\s+generic `export_package_bundle_archive_artifact` validator dispatch for persisted final bundle\/archive artifact snapshots/i,
  );
  assert.match(
    docsText,
    /the currently concrete shared helper responsibilities already evidenced for this seam are limited to:\s+shared artifact-envelope validation for `artifact_type`, `filename`, `content_type`, `encoding`, `body_base64`, `package_version`, and `bundle_manifest_fingerprint`\s+enforcing non-empty ZIP filenames plus the `\.zip` filename suffix\s+enforcing non-empty base64-shaped `body_base64`\s+enforcing non-empty `package_version` and `bundle_manifest_fingerprint`\s+centralizing the explicit bundle\/archive artifact validator entries for `SWE_BODELNING` and `"CMD_PROFILE"` inside the shared registry object\s+returning the current validator entry or `null` through the shared `getExportPackageBundleArchiveArtifactValidator` lookup helper\s+dispatching generic final bundle\/archive artifact validation first through top-level `jurisdiction_profile_key` when present, otherwise through the current decoded-archive `jurisdiction_profile_key` inference from `body_base64`, and otherwise through the current default-validator path backed by `Object\.values\(exportPackageBundleArchiveArtifactValidatorRegistry\)\[0\]` in order to preserve the current canonical `SWE_BODELNING` validation semantics for persisted snapshots without a top-level `jurisdiction_profile_key`\s+returning the normalized artifact object with validated bundle\/archive fields/i,
  );
  assert.match(
    docsText,
    /the current relationship to the higher bundle\/archive artifact projection-validator pair already evidenced in `packages\/schemas\/src\/index\.js` is limited to `validateSWEBodelningExportPackageBundleArchiveArtifactProjection` and `validateCMDExportPackageBundleArchiveArtifactProjection` delegating lower artifact validation to the shared validator pair before their projection-level `snapshot_status` validation/i,
  );
  assert.match(
    docsText,
    /the current relationship to the already-frozen governance-side bundle\/archive artifact adapter-dispatch seam already evidenced in repo code is limited to the governance-side adapter layer delegating through profile-specific governance helpers, while those helpers currently call `validateSWEBodelningExportPackageBundleArchiveArtifact` and `validateCMDExportPackageBundleArchiveArtifact` directly rather than routing through the schema-side registry\/lookup\/generic-dispatch seam itself/i,
  );
  assert.match(
    docsText,
    /the current relationship to persisted final bundle\/archive artifact storage already evidenced in `packages\/database\/src\/index\.js` is limited to `persistCaseExportPackageBundleArchiveArtifactSnapshot` calling `validateExportPackageBundleArchiveArtifact` before canonical snapshot storage/i,
  );
  assert.match(
    docsText,
    /the current bounded reuse already evidenced across repo code is limited to 2 profile-specific validator definitions, 2 current higher projection-validator call sites inside `packages\/schemas\/src\/index\.js`, 1 shared validator registry definition, 1 shared lookup helper definition with 2 current internal generic-dispatch lookup call sites, 1 shared generic dispatch helper definition with 1 current default-validator fallback path, 1 current `packages\/database` persisted-validation call site, 6 current governance runtime\/helper call sites spanning `deriveSWEBodelningExportPackageBundleArchiveArtifact`, `deriveSWEBodelningExportPackageBundleArchiveArtifactSnapshotStatus`, `resolveSWEBodelningExportPackageBundleArchiveArtifactProjection`, `deriveCMDExportPackageBundleArchiveArtifact`, `deriveCMDExportPackageBundleArchiveArtifactSnapshotStatus`, and `resolveCMDExportPackageBundleArchiveArtifactProjection`, and the current named module export surface exposing `exportPackageBundleArchiveArtifactValidatorRegistry`, `getExportPackageBundleArchiveArtifactValidator`, `validateExportPackageBundleArchiveArtifact`, `validateSWEBodelningExportPackageBundleArchiveArtifact`, and `validateCMDExportPackageBundleArchiveArtifact`/i,
  );
  assert.match(
    docsText,
    /the higher bundle\/archive artifact projection-validator pair remains outside this helper seam because projection-level `snapshot_status` validation and normalized projection return-shape enforcement are separate higher responsibilities consumed after lower artifact validation succeeds/i,
  );
  assert.match(
    docsText,
    /the frozen governance-side bundle\/archive artifact adapter-dispatch seam remains outside this seam because governance adapter lookup and generic projection\/derivation dispatch are separate higher runtime responsibilities even where profile-specific governance helpers currently consume the lower schema validator pair/i,
  );
  assert.match(
    docsText,
    /the frozen broader governance final bundle\/archive artifact derivation and projection helper scaffold remains outside this seam because deterministic archive assembly, artifact-to-manifest matching, and projection\/currentness behavior are separate higher runtime responsibilities beyond this narrower schema-side validator\/registry\/lookup\/dispatch boundary/i,
  );
  assert.match(
    docsText,
    /the frozen governance-side bundle\/package manifest adapter-dispatch seam remains outside this seam because bundle\/package manifest derivation and projection are separate higher governance responsibilities/i,
  );
  assert.match(
    docsText,
    /the shared governance `buildStoredZip` helper seam remains outside this seam because ZIP container assembly is a separate frozen governance boundary/i,
  );
  assert.match(
    docsText,
    /the shared governance `toCanonicalJson` helper seam remains outside this seam because canonical JSON serialization is a separate frozen governance boundary/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas` validation-helper scaffold remains outside this seam because machine-readable error construction, plain-object enforcement, and key-shape validation are separate frozen internal boundaries consumed by the validator seam rather than defined by it/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas` export-artifact reconstruction helper scaffold remains outside this seam because canonical artifact-body reconstruction is a separate frozen internal boundary and the generic dispatcher's current `body_base64` text probe does not define reconstruction semantics/i,
  );
  assert.match(
    docsText,
    /downstream governance adapter, persistence, artifact-derivation, and route\/runtime behavior remain outside this seam because they may call or consume the shared validator seam but do not define the canonical schema-side bundle\/archive artifact validation boundary themselves/i,
  );
  assert.match(
    docsText,
    /future `packages\/schemas` bundle\/archive artifact validation that needs the same profile-specific envelope checks and registry-backed dispatch should extend this seam instead of introducing parallel validator stacks inside governance helpers, persistence, or routes/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, bundle\/archive validation semantics, dispatch semantics, governance semantics, schema behavior, or fail-closed behavior/i,
  );

  assert.match(
    schemasIndexText,
    /function validateSWEBodelningExportPackageBundleArchiveArtifact\(\s*input,\s*errorCode = "ERR_EXPORT_PACKAGE_BUNDLE_ARCHIVE_ARTIFACT_INVALID",\s*\) \{\s*assertPlainObject\(input, errorCode, "input"\);\s*assertExactKeys\(\s*input,\s*exportPackageBundleArchiveArtifactRequiredKeys,\s*errorCode,\s*"input",\s*\);[\s\S]*"artifact_type is not supported"[\s\S]*"filename must be a non-empty string"[\s\S]*"filename must be a ZIP archive filename"[\s\S]*"content_type is not supported"[\s\S]*"encoding is not supported"[\s\S]*"body_base64 must be a non-empty string"[\s\S]*"body_base64 must be a base64-encoded string"[\s\S]*"package_version must be a non-empty string"[\s\S]*"bundle_manifest_fingerprint must be a non-empty string"[\s\S]*return \{\s*artifact_type: input\.artifact_type,\s*filename: input\.filename,\s*content_type: input\.content_type,\s*encoding: input\.encoding,\s*body_base64: input\.body_base64,\s*package_version: input\.package_version,\s*bundle_manifest_fingerprint: input\.bundle_manifest_fingerprint,\s*\};\s*\}/,
  );
  assert.match(
    schemasIndexText,
    /function validateCMDExportPackageBundleArchiveArtifact\(\s*input,\s*errorCode = "ERR_EXPORT_PACKAGE_BUNDLE_ARCHIVE_ARTIFACT_INVALID",\s*\) \{\s*assertPlainObject\(input, errorCode, "input"\);\s*assertExactKeys\(\s*input,\s*cmdExportPackageBundleArchiveArtifactRequiredKeys,\s*errorCode,\s*"input",\s*\);[\s\S]*"artifact_type is not supported"[\s\S]*"filename must be a non-empty string"[\s\S]*"filename must be a ZIP archive filename"[\s\S]*"content_type is not supported"[\s\S]*"encoding is not supported"[\s\S]*"body_base64 must be a non-empty string"[\s\S]*"body_base64 must be a base64-encoded string"[\s\S]*"package_version must be a non-empty string"[\s\S]*"bundle_manifest_fingerprint must be a non-empty string"[\s\S]*return \{\s*artifact_type: input\.artifact_type,\s*filename: input\.filename,\s*content_type: input\.content_type,\s*encoding: input\.encoding,\s*body_base64: input\.body_base64,\s*package_version: input\.package_version,\s*bundle_manifest_fingerprint: input\.bundle_manifest_fingerprint,\s*\};\s*\}/,
  );
  assert.match(
    schemasIndexText,
    /const exportPackageBundleArchiveArtifactValidatorRegistry = Object\.freeze\(\{\s*\[sweBodelningExportPackageBundleArchiveArtifactValidator\.jurisdiction_profile_key\]:\s*sweBodelningExportPackageBundleArchiveArtifactValidator,\s*\[cmdExportPackageBundleArchiveArtifactValidator\.jurisdiction_profile_key\]:\s*cmdExportPackageBundleArchiveArtifactValidator,\s*\}\);/,
  );
  assert.match(
    schemasIndexText,
    /function getExportPackageBundleArchiveArtifactValidator\(jurisdictionProfileKey\)\s*\{[\s\S]*return\s*\(\s*exportPackageBundleArchiveArtifactValidatorRegistry\[jurisdictionProfileKey\] \?\?\s*null\s*\);[\s\S]*\}/,
  );
  assert.match(
    schemasIndexText,
    /function validateExportPackageBundleArchiveArtifact\(input\)\s*\{[\s\S]*typeof input\.jurisdiction_profile_key === "string"[\s\S]*const validator = getExportPackageBundleArchiveArtifactValidator\([\s\S]*input\.jurisdiction_profile_key,[\s\S]*return validator\.validateExportPackageBundleArchiveArtifact\(input\);[\s\S]*typeof input\.body_base64 === "string"[\s\S]*Buffer\.from\(input\.body_base64, "base64"\)\.toString\("utf8"\)[\s\S]*decodedBody\.match\(\/"jurisdiction_profile_key":"\(\[\^"]\+\)"\/\)\s*\?\?\s*decodedBody\.match\(\/jurisdiction_profile_key:\\s\+\(\[A-Z_<>\\\.]\+\)\/\)[\s\S]*const validator = getExportPackageBundleArchiveArtifactValidator\([\s\S]*jurisdictionProfileKeyMatch\[1\],[\s\S]*return validator\.validateExportPackageBundleArchiveArtifact\(input\);[\s\S]*const defaultValidator = Object\.values\(\s*exportPackageBundleArchiveArtifactValidatorRegistry,\s*\)\[0\];\s*return defaultValidator\.validateExportPackageBundleArchiveArtifact\(input\);\s*\}/,
  );
  assert.match(
    schemasIndexText,
    /function validateSWEBodelningExportPackageBundleArchiveArtifactProjection\([\s\S]*validateSWEBodelningExportPackageBundleArchiveArtifact\(/,
  );
  assert.match(
    schemasIndexText,
    /function validateCMDExportPackageBundleArchiveArtifactProjection\([\s\S]*validateCMDExportPackageBundleArchiveArtifact\(/,
  );
  assert.match(databaseIndexText, /validateExportPackageBundleArchiveArtifact,\n/);
  assert.match(
    databaseIndexText,
    /async function persistCaseExportPackageBundleArchiveArtifactSnapshot\([\s\S]*const canonicalExportPackageBundleArchiveArtifact =\s*validateExportPackageBundleArchiveArtifact\([\s\S]*exportPackageBundleArchiveArtifactSnapshot,[\s\S]*\);/,
  );

  assert.deepEqual(
    collectLineMatches(
      schemasIndexText,
      /\bexportPackageBundleArchiveArtifactValidatorRegistry\b/,
    ),
    [10475, 10491, 10545, 12921],
  );
  assert.deepEqual(
    collectLineMatches(
      schemasIndexText,
      /\bgetExportPackageBundleArchiveArtifactValidator\b/,
    ),
    [10482, 10504, 10527, 12928],
  );
  assert.deepEqual(
    collectLineMatches(
      schemasIndexText,
      /\bvalidateExportPackageBundleArchiveArtifact\b/,
    ),
    [10465, 10471, 10496, 10509, 10532, 10547, 13014],
  );
  assert.deepEqual(
    collectLineMatches(
      schemasIndexText,
      /\bvalidateSWEBodelningExportPackageBundleArchiveArtifact\b/,
    ),
    [10243, 10466, 10563, 13020],
  );
  assert.deepEqual(
    collectLineMatches(
      schemasIndexText,
      /\bvalidateCMDExportPackageBundleArchiveArtifact\b/,
    ),
    [10353, 10472, 10658, 13016],
  );

  assert.deepEqual(
    collectCallSites(schemasIndexText, [
      "getExportPackageBundleArchiveArtifactValidator",
      "validateSWEBodelningExportPackageBundleArchiveArtifact",
      "validateCMDExportPackageBundleArchiveArtifact",
    ]),
    [
      {
        fnName: "getExportPackageBundleArchiveArtifactValidator",
        caller: "validateExportPackageBundleArchiveArtifact",
        line: 10504,
      },
      {
        fnName: "getExportPackageBundleArchiveArtifactValidator",
        caller: "validateExportPackageBundleArchiveArtifact",
        line: 10527,
      },
      {
        fnName: "validateSWEBodelningExportPackageBundleArchiveArtifact",
        caller: "validateSWEBodelningExportPackageBundleArchiveArtifactProjection",
        line: 10563,
      },
      {
        fnName: "validateCMDExportPackageBundleArchiveArtifact",
        caller: "validateCMDExportPackageBundleArchiveArtifactProjection",
        line: 10658,
      },
    ],
  );

  assert.deepEqual(
    collectCallSites(governanceIndexText, [
      "validateSWEBodelningExportPackageBundleArchiveArtifact",
      "validateCMDExportPackageBundleArchiveArtifact",
    ]),
    [
      {
        fnName: "validateSWEBodelningExportPackageBundleArchiveArtifact",
        caller: "deriveSWEBodelningExportPackageBundleArchiveArtifact",
        line: 3424,
      },
      {
        fnName: "validateSWEBodelningExportPackageBundleArchiveArtifact",
        caller: "deriveSWEBodelningExportPackageBundleArchiveArtifactSnapshotStatus",
        line: 3440,
      },
      {
        fnName: "validateSWEBodelningExportPackageBundleArchiveArtifact",
        caller: "resolveSWEBodelningExportPackageBundleArchiveArtifactProjection",
        line: 3509,
      },
      {
        fnName: "validateCMDExportPackageBundleArchiveArtifact",
        caller: "deriveCMDExportPackageBundleArchiveArtifact",
        line: 3595,
      },
      {
        fnName: "validateCMDExportPackageBundleArchiveArtifact",
        caller: "deriveCMDExportPackageBundleArchiveArtifactSnapshotStatus",
        line: 3611,
      },
      {
        fnName: "validateCMDExportPackageBundleArchiveArtifact",
        caller: "resolveCMDExportPackageBundleArchiveArtifactProjection",
        line: 3684,
      },
    ],
  );

  assert.deepEqual(
    collectCallSites(databaseIndexText, ["validateExportPackageBundleArchiveArtifact"]),
    [
      {
        fnName: "validateExportPackageBundleArchiveArtifact",
        caller: "persistCaseExportPackageBundleArchiveArtifactSnapshot",
        line: 907,
      },
    ],
  );

  assert.match(
    governanceBundleArchiveFreezeTestText,
    /docs freeze the shared governance export-package bundle\/archive artifact adapter-dispatch seam as the final-archive registry and generic dispatch boundary/i,
  );
  assert.match(
    governanceBundleManifestFreezeTestText,
    /docs freeze the shared governance export-package bundle\/package manifest adapter-dispatch seam as the manifest-specific registry and generic dispatch boundary/i,
  );
  assert.match(
    governanceStoredZipFreezeTestText,
    /docs freeze the shared governance stored-zip helper seam as the canonical ZIP assembly boundary/i,
  );
  assert.match(
    governanceArtifactDerivationFreezeTestText,
    /docs freeze the shared governance final bundle\/archive artifact derivation and projection helper scaffold as the canonical internal runtime\/helper seam for final bundle\/archive artifacts/i,
  );
  assert.match(
    schemasValidationHelperFreezeTestText,
    /docs freeze the shared packages\/schemas validation helper scaffold as the canonical internal validation seam/i,
  );
  assert.match(
    schemasReconstructionFreezeTestText,
    /docs freeze the shared packages\/schemas export-artifact reconstruction helper scaffold as the canonical internal reconstruction seam/i,
  );

  assert.match(
    validatorDispatchTestText,
    /the generic validator dispatch exposes the explicit CMD_PROFILE final bundle\/archive artifact validator entry/i,
  );
  assert.match(
    validatorDispatchTestText,
    /packages\/database persisted final bundle\/archive artifact validation uses the dispatch path while preserving current SWE_BODELNING behavior/i,
  );
  assert.match(
    validatorDispatchTestText,
    /runtime support for CMD_PROFILE persists canonical final bundle\/archive artifacts unchanged through the shared validation path/i,
  );
  assert.match(
    validatorDispatchTestText,
    /unsupported\/non-SWE machine-readable behavior remains unchanged/i,
  );
  assert.match(
    bundleArchiveArtifactTestText,
    /the final bundle\/archive artifact schema accepts the intended machine-readable artifact shape/i,
  );
});
