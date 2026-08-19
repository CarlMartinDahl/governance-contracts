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

test("docs freeze the shared packages/schemas JSON artifact validator seam as the schema-side JSON validation boundary", () => {
  assert.match(
    docsText,
    /Shared Packages\/Schemas JSON Artifact Validator Seam Freeze/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas\/src\/index\.js` JSON artifact validator pair `validateSWEBodelningExportPackageJsonArtifact` and `validateCMDExportPackageJsonArtifact` is the canonical internal `packages\/schemas` JSON artifact validation boundary for the current included schema-side flows below and is now frozen as the baseline seam/i,
  );
  assert.match(
    docsText,
    /the currently evidenced schema-side surfaces in this freeze are limited to:\s+`export_package_json_artifact` validator for `SWE_BODELNING`\s+`export_package_json_artifact` validator for `"CMD_PROFILE"`/i,
  );
  assert.match(
    docsText,
    /the currently concrete shared helper responsibilities already evidenced for this seam are limited to:\s+shared artifact-envelope validation for `artifact_type`, `content_type`, `encoding`, and `body_utf8`\s+parsing `body_utf8` as JSON and validating the canonical export package payload through the profile-specific export package validators\s+enforcing filename equality against the canonical export package identity\s+deriving canonical `body_utf8` through the separately frozen `packages\/schemas` canonical-JSON seam and enforcing canonical JSON equality\s+returning the normalized artifact object with canonical `body_utf8`/i,
  );
  assert.match(
    docsText,
    /the current relationship to the higher JSON artifact projection-validator seam already evidenced in `packages\/schemas\/src\/index\.js` is limited to `validateSWEBodelningExportPackageJsonArtifactProjection` and `validateCMDExportPackageJsonArtifactProjection` delegating artifact validation to the shared validator pair before their projection-specific `snapshot_status` validation/i,
  );
  assert.match(
    docsText,
    /the current bounded reuse already evidenced across repo code is limited to 2 validator definitions, 2 current higher projection-validator call sites inside `packages\/schemas\/src\/index\.js`, and 12 current governance runtime\/helper call sites spanning `deriveSWEBodelningExportPackageJsonArtifact`, `deriveCMDExportPackageJsonArtifact`, `deriveCMDExportPackageFromJsonArtifact`, `resolveCMDExportPackageJsonArtifactProjection`, `deriveSWEBodelningExportPackageBundleManifest`, `deriveCMDExportPackageBundleManifest`, `deriveSWEBodelningExportPackageBundleArchiveArtifact`, `deriveCMDExportPackageBundleArchiveArtifact`, `deriveSWEBodelningExportPackageFromJsonArtifact`, `resolveSWEBodelningExportPackageJsonArtifactProjection`, `deriveSWEBodelningExportPackageBundleManifestSnapshotStatus`, and `deriveCMDExportPackageBundleManifestSnapshotStatus`/i,
  );
  assert.match(
    docsText,
    /the frozen JSON artifact projection-validator seam remains outside this helper seam because projection-level `snapshot_status` validation and normalized projection return-shape enforcement are separate frozen higher responsibilities consumed after lower artifact validation succeeds/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas` `toCanonicalJson` helper seam remains outside this helper seam because stable JSON serialization is a separate frozen boundary even where the validator pair derives canonical `body_utf8` through that lower helper/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas` validation-helper scaffold remains outside this helper seam because machine-readable error construction, plain-object enforcement, and key-shape validation are separate frozen internal boundaries consumed by the validator pair rather than defined by it/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas` export-artifact reconstruction helper scaffold remains outside this helper seam because JSON artifact validation parses canonical export package payloads directly from `body_utf8` and does not define artifact-body reconstruction infrastructure/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas` JSON artifact validator-dispatch layer remains outside this helper seam because registry-based jurisdiction\/profile selection through `getExportPackageJsonArtifactValidator`, `exportPackageJsonArtifactValidatorRegistry`, and `validateExportPackageJsonArtifact` is a separate layer above the profile-specific validator pair/i,
  );
  assert.match(
    docsText,
    /the shared API response-helper seam remains outside this helper seam because API response construction is performed after schema validation results are returned or thrown/i,
  );
  assert.match(
    docsText,
    /the shared `\/cases\/:caseId\/\.\.\.` parser seam remains outside this helper seam because path parsing occurs before any schema boundary is reached/i,
  );
  assert.match(
    docsText,
    /downstream schema-specific projection, derivation, manifest\/archive assembly, export, and route\/runtime behavior remain outside this helper seam because they may call the validator pair but do not define the canonical shared JSON artifact validation boundary themselves/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, JSON encoding semantics, validation semantics, projection semantics, schema behavior, or fail-closed behavior/i,
  );

  assert.match(
    schemasIndexText,
    /function validateSWEBodelningExportPackageJsonArtifact\(\s*input,\s*errorCode = "ERR_EXPORT_PACKAGE_JSON_ARTIFACT_INVALID",\s*\) \{\s*assertPlainObject\(input, errorCode, "input"\);\s*assertExactKeys\(input, exportPackageJsonArtifactRequiredKeys, errorCode, "input"\);[\s\S]*"artifact_type is not supported"[\s\S]*"filename must be a non-empty string"[\s\S]*"content_type is not supported"[\s\S]*"encoding is not supported"[\s\S]*"body_utf8 must be a non-empty string"[\s\S]*parsedBody = JSON\.parse\(input\.body_utf8\);[\s\S]*const canonicalExportPackage = validateSWEBodelningExportPackage\(\s*parsedBody,\s*errorCode,\s*\);[\s\S]*const expectedFilename =\s*`\$\{canonicalExportPackage\.export_version\}-\$\{canonicalExportPackage\.dossier_fingerprint\}\.json`[\s\S]*"filename must match the canonical export package identity"[\s\S]*const canonicalBodyUtf8 = toCanonicalJson\(canonicalExportPackage\);[\s\S]*"body_utf8 must match the canonical export package JSON encoding"[\s\S]*return \{\s*artifact_type: input\.artifact_type,\s*filename: input\.filename,\s*content_type: input\.content_type,\s*encoding: input\.encoding,\s*body_utf8: canonicalBodyUtf8,\s*\};\s*\}/,
  );
  assert.match(
    schemasIndexText,
    /function validateCMDExportPackageJsonArtifact\(\s*input,\s*errorCode = "ERR_EXPORT_PACKAGE_JSON_ARTIFACT_INVALID",\s*\) \{\s*assertPlainObject\(input, errorCode, "input"\);\s*assertExactKeys\(input, exportPackageJsonArtifactRequiredKeys, errorCode, "input"\);[\s\S]*"artifact_type is not supported"[\s\S]*"content_type is not supported"[\s\S]*"encoding is not supported"[\s\S]*"body_utf8 must be a non-empty string"[\s\S]*parsedBody = JSON\.parse\(input\.body_utf8\);[\s\S]*const canonicalExportPackage = validateCMDExportPackage\(parsedBody, errorCode\);[\s\S]*const expectedFilename =\s*`\$\{canonicalExportPackage\.export_version\}-\$\{canonicalExportPackage\.dossier_fingerprint\}\.json`[\s\S]*"filename must match the canonical export package identity"[\s\S]*const canonicalBodyUtf8 = toCanonicalJson\(canonicalExportPackage\);[\s\S]*"body_utf8 must match the canonical export package JSON encoding"[\s\S]*return \{\s*artifact_type: input\.artifact_type,\s*filename: input\.filename,\s*content_type: input\.content_type,\s*encoding: input\.encoding,\s*body_utf8: canonicalBodyUtf8,\s*\};\s*\}/,
  );

  assert.equal(
    (schemasIndexText.match(/function validateSWEBodelningExportPackageJsonArtifact\(/g) ||
      []).length,
    1,
  );
  assert.equal(
    (schemasIndexText.match(/function validateCMDExportPackageJsonArtifact\(/g) || [])
      .length,
    1,
  );
  assert.match(
    schemasIndexText,
    /const exportPackageJsonArtifactValidatorRegistry = Object\.freeze\(/,
  );
  assert.match(schemasIndexText, /function getExportPackageJsonArtifactValidator\(/);
  assert.match(schemasIndexText, /function validateExportPackageJsonArtifact\(/);

  const schemasLines = schemasIndexText.split("\n");
  let currentSchemasFunction = null;
  const schemasCallSites = [];
  const targetFns = new Set([
    "validateSWEBodelningExportPackageJsonArtifact",
    "validateCMDExportPackageJsonArtifact",
  ]);

  for (let index = 0; index < schemasLines.length; index += 1) {
    const functionMatch = schemasLines[index].match(/^function\s+([A-Za-z0-9_]+)\s*\(/);
    if (functionMatch) {
      currentSchemasFunction = functionMatch[1];
    }

    for (const fnName of targetFns) {
      if (schemasLines[index].includes(`${fnName}(`) && currentSchemasFunction !== fnName) {
        schemasCallSites.push({ fnName, caller: currentSchemasFunction, line: index + 1 });
      }
    }
  }

  assert.deepEqual(schemasCallSites, [
    {
      fnName: "validateCMDExportPackageJsonArtifact",
      caller: "validateCMDExportPackageJsonArtifactProjection",
      line: 12384,
    },
    {
      fnName: "validateSWEBodelningExportPackageJsonArtifact",
      caller: "validateSWEBodelningExportPackageJsonArtifactProjection",
      line: 12477,
    },
  ]);

  const governanceLines = governanceIndexText.split("\n");
  let currentGovernanceFunction = null;
  const governanceCallSites = [];

  for (let index = 0; index < governanceLines.length; index += 1) {
    const functionMatch = governanceLines[index].match(/^function\s+([A-Za-z0-9_]+)\s*\(/);
    if (functionMatch) {
      currentGovernanceFunction = functionMatch[1];
    }

    for (const fnName of targetFns) {
      if (
        governanceLines[index].includes(`${fnName}(`) &&
        currentGovernanceFunction !== fnName
      ) {
        governanceCallSites.push({
          fnName,
          caller: currentGovernanceFunction,
          line: index + 1,
        });
      }
    }
  }

  assert.deepEqual(governanceCallSites, [
    {
      fnName: "validateSWEBodelningExportPackageJsonArtifact",
      caller: "deriveSWEBodelningExportPackageJsonArtifact",
      line: 1932,
    },
    {
      fnName: "validateCMDExportPackageJsonArtifact",
      caller: "deriveCMDExportPackageJsonArtifact",
      line: 1948,
    },
    {
      fnName: "validateCMDExportPackageJsonArtifact",
      caller: "deriveCMDExportPackageFromJsonArtifact",
      line: 1958,
    },
    {
      fnName: "validateCMDExportPackageJsonArtifact",
      caller: "resolveCMDExportPackageJsonArtifactProjection",
      line: 2032,
    },
    {
      fnName: "validateSWEBodelningExportPackageJsonArtifact",
      caller: "deriveSWEBodelningExportPackageBundleManifest",
      line: 2979,
    },
    {
      fnName: "validateCMDExportPackageJsonArtifact",
      caller: "deriveCMDExportPackageBundleManifest",
      line: 3053,
    },
    {
      fnName: "validateSWEBodelningExportPackageJsonArtifact",
      caller: "deriveSWEBodelningExportPackageBundleArchiveArtifact",
      line: 3378,
    },
    {
      fnName: "validateCMDExportPackageJsonArtifact",
      caller: "deriveCMDExportPackageBundleArchiveArtifact",
      line: 3549,
    },
    {
      fnName: "validateSWEBodelningExportPackageJsonArtifact",
      caller: "deriveSWEBodelningExportPackageFromJsonArtifact",
      line: 3828,
    },
    {
      fnName: "validateSWEBodelningExportPackageJsonArtifact",
      caller: "resolveSWEBodelningExportPackageJsonArtifactProjection",
      line: 4261,
    },
    {
      fnName: "validateSWEBodelningExportPackageJsonArtifact",
      caller: "deriveSWEBodelningExportPackageBundleManifestSnapshotStatus",
      line: 4464,
    },
    {
      fnName: "validateCMDExportPackageJsonArtifact",
      caller: "deriveCMDExportPackageBundleManifestSnapshotStatus",
      line: 4588,
    },
  ]);
});
