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

test("docs freeze the shared packages/schemas DOCX artifact validator seam as the schema-side DOCX validation boundary", () => {
  assert.match(
    docsText,
    /Shared Packages\/Schemas DOCX Artifact Validator Seam Freeze/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas\/src\/index\.js` DOCX artifact validator pair `validateSWEBodelningExportPackageDocxArtifact` and `validateCMDExportPackageDocxArtifact` is the canonical internal `packages\/schemas` DOCX artifact validation boundary for the current included schema-side flows below and is now frozen as the baseline seam/i,
  );
  assert.match(
    docsText,
    /the currently evidenced schema-side surfaces in this freeze are limited to:\s+`export_package_docx_artifact` validator for `SWE_BODELNING`\s+`export_package_docx_artifact` validator for `"CMD_PROFILE"`/i,
  );
  assert.match(
    docsText,
    /the currently concrete shared helper responsibilities already evidenced for this seam are limited to:\s+shared artifact-envelope validation for `artifact_type`, `filename`, `content_type`, `encoding`, and `body_base64`\s+enforcing non-empty DOCX filenames plus the `\.docx` filename suffix\s+enforcing non-empty base64-shaped `body_base64`\s+returning the normalized artifact object with validated `body_base64`/i,
  );
  assert.match(
    docsText,
    /the current relationship to the higher DOCX artifact projection-validator pair already evidenced in `packages\/schemas\/src\/index\.js` is limited to `validateSWEBodelningExportPackageDocxArtifactProjection` and `validateCMDExportPackageDocxArtifactProjection` delegating lower artifact validation to the shared validator pair before their reconstruction-based export-version checks and projection-specific `snapshot_status` validation/i,
  );
  assert.match(
    docsText,
    /the current relationship to reconstruction \/ canonical-body checks already evidenced in `packages\/schemas\/src\/index\.js` is limited to those higher projection validators calling `reconstructSWEBodelningExportPackageFromDocxArtifactBody` and `reconstructCMDExportPackageFromDocxArtifactBody` after lower artifact validation succeeds/i,
  );
  assert.match(
    docsText,
    /the current bounded reuse already evidenced across repo code is limited to 2 validator definitions, 2 current higher projection-validator call sites inside `packages\/schemas\/src\/index\.js`, and 12 current governance runtime\/helper call sites spanning `deriveSWEBodelningExportPackageDocxArtifact`, `deriveCMDExportPackageDocxArtifact`, `deriveCMDExportPackageFromDocxArtifact`, `resolveCMDExportPackageDocxArtifactProjection`, `deriveSWEBodelningExportPackageFromDocxArtifact`, `deriveSWEBodelningExportPackageBundleManifest`, `deriveCMDExportPackageBundleManifest`, `deriveSWEBodelningExportPackageBundleArchiveArtifact`, `deriveCMDExportPackageBundleArchiveArtifact`, `resolveSWEBodelningExportPackageDocxArtifactProjection`, `deriveSWEBodelningExportPackageBundleManifestSnapshotStatus`, and `deriveCMDExportPackageBundleManifestSnapshotStatus`/i,
  );
  assert.match(
    docsText,
    /the higher DOCX artifact projection-validator pair remains outside this helper seam because projection-level `snapshot_status` validation, reconstruction-based export-version comparison, and normalized projection return-shape enforcement are separate higher responsibilities consumed after lower artifact validation succeeds/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas` `toCanonicalJson` helper seam remains outside this helper seam because stable JSON serialization is a separate frozen boundary and the DOCX validator pair does not define canonical JSON equality or serialization/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas` validation-helper scaffold remains outside this helper seam because machine-readable error construction, plain-object enforcement, and key-shape validation are separate frozen internal boundaries consumed by the validator pair rather than defined by it/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas` export-artifact reconstruction helper scaffold remains outside this helper seam because canonical DOCX body decoding and `canonical_export_package_json` extraction are separate frozen internal reconstruction responsibilities rather than lower artifact-envelope validation/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas` DOCX artifact validator-dispatch layer remains outside this helper seam because registry-based jurisdiction\/profile selection through `getExportPackageDocxArtifactValidator`, `exportPackageDocxArtifactValidatorRegistry`, and `validateExportPackageDocxArtifact` is a separate layer above the profile-specific validator pair/i,
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
    /downstream schema-specific projection, derivation, manifest\/archive assembly, export, and route\/runtime behavior remain outside this helper seam because they may call the validator pair but do not define the canonical shared DOCX artifact validation boundary themselves/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, DOCX encoding semantics, validation semantics, projection semantics, reconstruction semantics, schema behavior, or fail-closed behavior/i,
  );

  assert.match(
    schemasIndexText,
    /function validateSWEBodelningExportPackageDocxArtifact\(\s*input,\s*errorCode = "ERR_EXPORT_PACKAGE_DOCX_ARTIFACT_INVALID",\s*\) \{\s*assertPlainObject\(input, errorCode, "input"\);\s*assertExactKeys\(input, exportPackageDocxArtifactRequiredKeys, errorCode, "input"\);[\s\S]*"artifact_type is not supported"[\s\S]*"filename must be a non-empty string"[\s\S]*"filename must be a DOCX artifact filename"[\s\S]*"content_type is not supported"[\s\S]*"encoding is not supported"[\s\S]*"body_base64 must be a non-empty string"[\s\S]*"body_base64 must be a base64-encoded string"[\s\S]*return \{\s*artifact_type: input\.artifact_type,\s*filename: input\.filename,\s*content_type: input\.content_type,\s*encoding: input\.encoding,\s*body_base64: input\.body_base64,\s*\};\s*\}/,
  );
  assert.match(
    schemasIndexText,
    /function validateCMDExportPackageDocxArtifact\(\s*input,\s*errorCode = "ERR_EXPORT_PACKAGE_DOCX_ARTIFACT_INVALID",\s*\) \{\s*assertPlainObject\(input, errorCode, "input"\);\s*assertExactKeys\(input, exportPackageDocxArtifactRequiredKeys, errorCode, "input"\);[\s\S]*"artifact_type is not supported"[\s\S]*"filename must be a non-empty string"[\s\S]*"filename must be a DOCX artifact filename"[\s\S]*"content_type is not supported"[\s\S]*"encoding is not supported"[\s\S]*"body_base64 must be a non-empty string"[\s\S]*"body_base64 must be a base64-encoded string"[\s\S]*return \{\s*artifact_type: input\.artifact_type,\s*filename: input\.filename,\s*content_type: input\.content_type,\s*encoding: input\.encoding,\s*body_base64: input\.body_base64,\s*\};\s*\}/,
  );
  assert.match(
    schemasIndexText,
    /function validateSWEBodelningExportPackageDocxArtifactProjection\([\s\S]*const exportPackageDocxArtifact = validateSWEBodelningExportPackageDocxArtifact\([\s\S]*const exportPackage = reconstructSWEBodelningExportPackageFromDocxArtifactBody\(\s*exportPackageDocxArtifact\.body_base64,\s*errorCode,\s*\)/,
  );
  assert.match(
    schemasIndexText,
    /function validateCMDExportPackageDocxArtifactProjection\([\s\S]*const exportPackageDocxArtifact = validateCMDExportPackageDocxArtifact\([\s\S]*const exportPackage = reconstructCMDExportPackageFromDocxArtifactBody\(\s*exportPackageDocxArtifact\.body_base64,\s*errorCode,\s*\)/,
  );

  assert.equal(
    (
      schemasIndexText.match(
        /function validateSWEBodelningExportPackageDocxArtifact\(/g,
      ) || []
    ).length,
    1,
  );
  assert.equal(
    (
      schemasIndexText.match(
        /function validateCMDExportPackageDocxArtifact\(/g,
      ) || []
    ).length,
    1,
  );
  assert.match(
    schemasIndexText,
    /const exportPackageDocxArtifactValidatorRegistry = Object\.freeze\(/,
  );
  assert.match(schemasIndexText, /function getExportPackageDocxArtifactValidator\(/);
  assert.match(schemasIndexText, /function validateExportPackageDocxArtifact\(/);

  const schemasLines = schemasIndexText.split("\n");
  let currentSchemasFunction = null;
  const schemasCallSites = [];
  const targetFns = new Set([
    "validateSWEBodelningExportPackageDocxArtifact",
    "validateCMDExportPackageDocxArtifact",
  ]);

  for (let index = 0; index < schemasLines.length; index += 1) {
    const functionMatch = schemasLines[index].match(
      /^function\s+([A-Za-z0-9_]+)\s*\(/,
    );
    if (functionMatch) {
      currentSchemasFunction = functionMatch[1];
    }

    for (const fnName of targetFns) {
      if (
        schemasLines[index].includes(`${fnName}(`) &&
        currentSchemasFunction !== fnName
      ) {
        schemasCallSites.push({ fnName, caller: currentSchemasFunction, line: index + 1 });
      }
    }
  }

  assert.deepEqual(schemasCallSites, [
    {
      fnName: "validateSWEBodelningExportPackageDocxArtifact",
      caller: "validateSWEBodelningExportPackageDocxArtifactProjection",
      line: 11421,
    },
    {
      fnName: "validateCMDExportPackageDocxArtifact",
      caller: "validateCMDExportPackageDocxArtifactProjection",
      line: 11516,
    },
  ]);

  const governanceLines = governanceIndexText.split("\n");
  let currentGovernanceFunction = null;
  const governanceCallSites = [];

  for (let index = 0; index < governanceLines.length; index += 1) {
    const functionMatch = governanceLines[index].match(
      /^function\s+([A-Za-z0-9_]+)\s*\(/,
    );
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
      fnName: "validateSWEBodelningExportPackageDocxArtifact",
      caller: "deriveSWEBodelningExportPackageDocxArtifact",
      line: 2123,
    },
    {
      fnName: "validateCMDExportPackageDocxArtifact",
      caller: "deriveCMDExportPackageDocxArtifact",
      line: 2159,
    },
    {
      fnName: "validateCMDExportPackageDocxArtifact",
      caller: "deriveCMDExportPackageFromDocxArtifact",
      line: 2170,
    },
    {
      fnName: "validateCMDExportPackageDocxArtifact",
      caller: "resolveCMDExportPackageDocxArtifactProjection",
      line: 2244,
    },
    {
      fnName: "validateSWEBodelningExportPackageDocxArtifact",
      caller: "deriveSWEBodelningExportPackageFromDocxArtifact",
      line: 2316,
    },
    {
      fnName: "validateSWEBodelningExportPackageDocxArtifact",
      caller: "deriveSWEBodelningExportPackageBundleManifest",
      line: 2988,
    },
    {
      fnName: "validateCMDExportPackageDocxArtifact",
      caller: "deriveCMDExportPackageBundleManifest",
      line: 3062,
    },
    {
      fnName: "validateSWEBodelningExportPackageDocxArtifact",
      caller: "deriveSWEBodelningExportPackageBundleArchiveArtifact",
      line: 3387,
    },
    {
      fnName: "validateCMDExportPackageDocxArtifact",
      caller: "deriveCMDExportPackageBundleArchiveArtifact",
      line: 3558,
    },
    {
      fnName: "validateSWEBodelningExportPackageDocxArtifact",
      caller: "resolveSWEBodelningExportPackageDocxArtifactProjection",
      line: 4147,
    },
    {
      fnName: "validateSWEBodelningExportPackageDocxArtifact",
      caller: "deriveSWEBodelningExportPackageBundleManifestSnapshotStatus",
      line: 4474,
    },
    {
      fnName: "validateCMDExportPackageDocxArtifact",
      caller: "deriveCMDExportPackageBundleManifestSnapshotStatus",
      line: 4597,
    },
  ]);
});
