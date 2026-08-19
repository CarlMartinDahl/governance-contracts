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

test("docs freeze the shared packages/schemas PDF artifact projection-validator seam as the schema-side projection-validation boundary", () => {
  assert.match(
    docsText,
    /Shared Packages\/Schemas PDF Artifact Projection-Validator Seam Freeze/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas\/src\/index\.js` PDF artifact projection-validator pair `validateSWEBodelningExportPackagePdfArtifactProjection` and `validateCMDExportPackagePdfArtifactProjection` is the canonical internal `packages\/schemas` PDF artifact projection-validation boundary for the current included schema-side flows below and is now frozen as the baseline seam/i,
  );
  assert.match(
    docsText,
    /the currently evidenced schema-side surfaces in this freeze are limited to:\s+`export_package_pdf_artifact` projection validator for `SWE_BODELNING`\s+`export_package_pdf_artifact` projection validator for `"CMD_PROFILE"`/i,
  );
  assert.match(
    docsText,
    /the currently concrete shared helper responsibilities already evidenced for this seam are limited to:\s+delegating lower artifact validation to the current lower PDF artifact validator pair before any projection-specific checks\s+reconstructing canonical export package payloads from validated `body_base64` through the separately frozen PDF reconstruction helpers in order to compare projection-level export-version fields against the canonical export package identity\s+enforcing projection-level `snapshot_status` object shape, supported `source` values, and required `current_export_version` plus `snapshot_is_current` fields\s+enforcing the currently evidenced profile-specific `snapshot_export_version_found` rules where `CMD_PROFILE` requires a non-empty matching export version and `SWE_BODELNING` allows `null` or a matching non-empty export version\s+returning the normalized projection object by combining the validated artifact payload with the validated `snapshot_status` block/i,
  );
  assert.match(
    docsText,
    /the current relationship to the lower PDF artifact validator pair already evidenced in `packages\/schemas\/src\/index\.js` is limited to `validateSWEBodelningExportPackagePdfArtifactProjection` and `validateCMDExportPackagePdfArtifactProjection` calling `validateSWEBodelningExportPackagePdfArtifact` and `validateCMDExportPackagePdfArtifact` before their projection-level `snapshot_status` validation/i,
  );
  assert.match(
    docsText,
    /the current relationship to reconstruction \/ canonical-body checks already evidenced in `packages\/schemas\/src\/index\.js` is limited to `validateSWEBodelningExportPackagePdfArtifactProjection` and `validateCMDExportPackagePdfArtifactProjection` calling `reconstructSWEBodelningExportPackageFromPdfArtifactBody` and `reconstructCMDExportPackageFromPdfArtifactBody` after lower artifact validation succeeds in order to compare `snapshot_export_version_found` against canonical export-package identity/i,
  );
  assert.match(
    docsText,
    /the current runtime reuse already evidenced across repo code is limited to `resolveSWEBodelningExportPackagePdfArtifactProjection` and `resolveCMDExportPackagePdfArtifactProjection` in `packages\/governance\/src\/index\.js` delegating schema-side projection validation to the shared projection-validator pair after deriving projection-level `snapshot_status`/i,
  );
  assert.match(
    docsText,
    /the current bounded reuse already evidenced across runtime code is limited to 2 projection-validator definitions and 2 current governance runtime call sites, one per projection validator/i,
  );
  assert.match(
    docsText,
    /the lower PDF artifact validator pair remains outside this helper seam because artifact-envelope validation, PDF filename\/base64 checks, and normalized lower artifact return are separate responsibilities consumed by the projection-validator pair rather than defined by it/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas` `toCanonicalJson` helper seam remains outside this helper seam because stable JSON serialization is a separate frozen boundary and the PDF projection-validator pair does not define canonical JSON equality or serialization/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas` validation-helper scaffold remains outside this helper seam because machine-readable error construction, plain-object enforcement, and key-shape validation are separate frozen internal boundaries consumed by the projection-validator pair rather than defined by it/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas` export-artifact reconstruction helper scaffold remains outside this helper seam because canonical PDF body decoding and `canonical_export_package_json` extraction are separate frozen internal reconstruction responsibilities consumed by the projection-validator pair rather than defined by it/i,
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
    /downstream governance projection assembly, adapter, and route\/runtime behavior remain outside this helper seam because they may call the projection-validator pair after deriving `snapshot_status` but do not define the canonical shared schema-side PDF artifact projection-validation boundary themselves/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, projection semantics, PDF encoding semantics, validation semantics, reconstruction semantics, schema behavior, or fail-closed behavior/i,
  );

  assert.match(
    schemasIndexText,
    /function validateSWEBodelningExportPackagePdfArtifactProjection\(\s*input,\s*errorCode = "ERR_EXPORT_PACKAGE_PDF_ARTIFACT_PROJECTION_INVALID",\s*\) \{\s*assertPlainObject\(input, errorCode, "input"\);\s*assertExactKeys\(\s*input,\s*exportPackagePdfArtifactProjectionRequiredKeys,\s*errorCode,\s*"input",\s*\);[\s\S]*const exportPackagePdfArtifact = validateSWEBodelningExportPackagePdfArtifact\([\s\S]*const exportPackage = reconstructSWEBodelningExportPackageFromPdfArtifactBody\(\s*exportPackagePdfArtifact\.body_base64,\s*errorCode,\s*\);[\s\S]*assertPlainObject\(input\.snapshot_status, errorCode, "snapshot_status"\);[\s\S]*assertExactKeys\(\s*input\.snapshot_status,\s*exportPackagePdfArtifactProjectionSnapshotStatusRequiredKeys,\s*errorCode,\s*"snapshot_status",\s*\);[\s\S]*snapshot_status\.source must be a supported source value[\s\S]*snapshot_status\.snapshot_export_version_found must be null or a non-empty string[\s\S]*snapshot_status\.snapshot_export_version_found must match export_version when present[\s\S]*snapshot_status\.current_export_version must be a non-empty string[\s\S]*snapshot_status\.snapshot_is_current must be a boolean[\s\S]*return \{\s*\.\.\.exportPackagePdfArtifact,\s*snapshot_status: input\.snapshot_status,\s*\};\s*\}/,
  );
  assert.match(
    schemasIndexText,
    /function validateCMDExportPackagePdfArtifactProjection\(\s*input,\s*errorCode = "ERR_EXPORT_PACKAGE_PDF_ARTIFACT_PROJECTION_INVALID",\s*\) \{\s*assertPlainObject\(input, errorCode, "input"\);\s*assertExactKeys\(\s*input,\s*cmdExportPackagePdfArtifactProjectionRequiredKeys,\s*errorCode,\s*"input",\s*\);[\s\S]*const exportPackagePdfArtifact = validateCMDExportPackagePdfArtifact\([\s\S]*const exportPackage = reconstructCMDExportPackageFromPdfArtifactBody\(\s*exportPackagePdfArtifact\.body_base64,\s*errorCode,\s*\);[\s\S]*assertPlainObject\(input\.snapshot_status, errorCode, "snapshot_status"\);[\s\S]*assertExactKeys\(\s*input\.snapshot_status,\s*cmdExportPackagePdfArtifactProjectionSnapshotStatusRequiredKeys,\s*errorCode,\s*"snapshot_status",\s*\);[\s\S]*snapshot_status\.source must be a supported source value[\s\S]*snapshot_status\.snapshot_export_version_found must be a non-empty string[\s\S]*snapshot_status\.snapshot_export_version_found must match export_version[\s\S]*snapshot_status\.current_export_version must be a non-empty string[\s\S]*snapshot_status\.snapshot_is_current must be a boolean[\s\S]*return \{\s*\.\.\.exportPackagePdfArtifact,\s*snapshot_status: input\.snapshot_status,\s*\};\s*\}/,
  );

  assert.equal(
    (
      schemasIndexText.match(
        /function validateSWEBodelningExportPackagePdfArtifactProjection\(/g,
      ) || []
    ).length,
    1,
  );
  assert.equal(
    (
      schemasIndexText.match(
        /function validateCMDExportPackagePdfArtifactProjection\(/g,
      ) || []
    ).length,
    1,
  );

  const governanceLines = governanceIndexText.split("\n");
  let currentFunction = null;
  const callSites = [];
  const targetFns = new Set([
    "validateCMDExportPackagePdfArtifactProjection",
    "validateSWEBodelningExportPackagePdfArtifactProjection",
  ]);

  for (let index = 0; index < governanceLines.length; index += 1) {
    const functionMatch = governanceLines[index].match(
      /^function\s+([A-Za-z0-9_]+)\s*\(/,
    );
    if (functionMatch) {
      currentFunction = functionMatch[1];
    }

    for (const fnName of targetFns) {
      if (
        governanceLines[index].includes(`${fnName}(`) &&
        currentFunction !== fnName
      ) {
        callSites.push({ fnName, caller: currentFunction, line: index + 1 });
      }
    }
  }

  assert.deepEqual(callSites, [
    {
      fnName: "validateCMDExportPackagePdfArtifactProjection",
      caller: "resolveCMDExportPackagePdfArtifactProjection",
      line: 2522,
    },
    {
      fnName: "validateSWEBodelningExportPackagePdfArtifactProjection",
      caller: "resolveSWEBodelningExportPackagePdfArtifactProjection",
      line: 4206,
    },
  ]);
});
