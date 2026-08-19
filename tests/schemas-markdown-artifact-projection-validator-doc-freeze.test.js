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

test("docs freeze the shared packages/schemas Markdown artifact projection-validator seam as the schema-side projection-validation boundary", () => {
  assert.match(
    docsText,
    /Shared Packages\/Schemas Markdown Artifact Projection-Validator Seam Freeze/i,
  );
  assert.match(
    docsText,
    /shared `packages\/schemas\/src\/index\.js` Markdown artifact projection-validator pair `validateSWEBodelningExportPackageMarkdownArtifactProjection` and `validateCMDExportPackageMarkdownArtifactProjection` is the canonical internal `packages\/schemas` Markdown artifact projection-validation boundary for the current included schema-side flows below and is now frozen as the baseline seam/i,
  );
  assert.match(
    docsText,
    /the currently evidenced schema-side surfaces in this freeze are limited to:\s+`export_package_markdown_artifact` projection validator for `SWE_BODELNING`\s+`export_package_markdown_artifact` projection validator for `"CMD_PROFILE"`/i,
  );
  assert.match(
    docsText,
    /the currently concrete shared helper responsibilities already evidenced for this seam are limited to:\s+delegating artifact validation to the separately frozen Markdown artifact validator seam before any projection-specific checks\s+reconstructing the canonical export package payload from validated `body_utf8` in order to compare projection-level export-version fields against the canonical export package identity\s+enforcing projection-level `snapshot_status` object shape, supported `source` values, and required `current_export_version` plus `snapshot_is_current` fields\s+enforcing the currently evidenced profile-specific `snapshot_export_version_found` rules where `CMD_PROFILE` requires a non-empty matching export version and `SWE_BODELNING` allows `null` or a matching non-empty export version\s+returning the normalized projection object by combining the validated artifact payload with the validated `snapshot_status` block/i,
  );
  assert.match(
    docsText,
    /the current relationship to the lower Markdown artifact validator seam already evidenced in `packages\/schemas\/src\/index\.js` is limited to `validateSWEBodelningExportPackageMarkdownArtifactProjection` and `validateCMDExportPackageMarkdownArtifactProjection` calling `validateSWEBodelningExportPackageMarkdownArtifact` and `validateCMDExportPackageMarkdownArtifact` before their projection-level `snapshot_status` validation/i,
  );
  assert.match(
    docsText,
    /the current runtime reuse already evidenced across repo code is limited to `resolveSWEBodelningExportPackageMarkdownArtifactProjection` and `resolveCMDExportPackageMarkdownArtifactProjection` in `packages\/governance\/src\/index\.js` delegating schema-side projection validation to the shared projection-validator pair after deriving projection-level `snapshot_status`/i,
  );
  assert.match(
    docsText,
    /the current bounded reuse already evidenced across runtime code is limited to 2 projection-validator definitions and 2 current governance runtime call sites, one per projection validator/i,
  );
  assert.match(
    docsText,
    /the frozen Markdown artifact validator seam remains outside this helper seam because artifact-envelope validation, filename equality, canonical Markdown equality, and lower reconstruction-backed artifact validation are separate frozen responsibilities consumed by the projection-validator pair rather than defined by it/i,
  );
  assert.match(
    docsText,
    /the frozen Markdown artifact body-builder seam remains outside this helper seam because canonical Markdown body construction remains a separate frozen lower boundary that the projection-validator pair only reaches indirectly through the lower validator seam/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas` `toCanonicalJson` helper seam remains outside this helper seam because stable JSON serialization is a separate frozen lower boundary that the projection-validator pair only reaches indirectly through the lower builder and validator seams/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas` validation-helper scaffold remains outside this helper seam because machine-readable error construction, plain-object enforcement, and key-shape validation are separate frozen internal boundaries consumed by the projection-validator pair rather than defined by it/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas` export-artifact reconstruction helper scaffold remains outside this helper seam because Markdown body parsing back into canonical export package payloads is a separate frozen internal boundary consumed by the projection-validator pair rather than defined by it/i,
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
    /downstream governance projection assembly, adapter, and route\/runtime behavior remain outside this helper seam because they may call the projection-validator pair after deriving `snapshot_status` but do not define the canonical shared schema-side Markdown artifact projection-validation boundary themselves/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, projection semantics, Markdown encoding semantics, validation semantics, reconstruction semantics, schema behavior, or fail-closed behavior/i,
  );

  assert.match(
    schemasIndexText,
    /function validateCMDExportPackageMarkdownArtifactProjection\(\s*input,\s*errorCode = "ERR_EXPORT_PACKAGE_MARKDOWN_ARTIFACT_PROJECTION_INVALID",\s*\) \{\s*assertPlainObject\(input, errorCode, "input"\);\s*assertExactKeys\(\s*input,\s*cmdExportPackageMarkdownArtifactProjectionRequiredKeys,\s*errorCode,\s*"input",\s*\);[\s\S]*const exportPackageMarkdownArtifact = validateCMDExportPackageMarkdownArtifact\([\s\S]*const exportPackage = reconstructCMDExportPackageFromMarkdownArtifactBody\([\s\S]*assertPlainObject\(input\.snapshot_status, errorCode, "snapshot_status"\);[\s\S]*assertExactKeys\(\s*input\.snapshot_status,\s*cmdExportPackageMarkdownArtifactProjectionSnapshotStatusRequiredKeys,\s*errorCode,\s*"snapshot_status",\s*\);[\s\S]*snapshot_status\.snapshot_export_version_found must be a non-empty string[\s\S]*snapshot_status\.snapshot_export_version_found must match export_version[\s\S]*snapshot_status\.current_export_version must be a non-empty string[\s\S]*snapshot_status\.snapshot_is_current must be a boolean[\s\S]*return \{\s*\.\.\.exportPackageMarkdownArtifact,\s*snapshot_status: input\.snapshot_status,\s*\};\s*\}/,
  );
  assert.match(
    schemasIndexText,
    /function validateSWEBodelningExportPackageMarkdownArtifactProjection\(\s*input,\s*errorCode = "ERR_EXPORT_PACKAGE_MARKDOWN_ARTIFACT_PROJECTION_INVALID",\s*\) \{\s*assertPlainObject\(input, errorCode, "input"\);\s*assertExactKeys\(\s*input,\s*exportPackageMarkdownArtifactProjectionRequiredKeys,\s*errorCode,\s*"input",\s*\);[\s\S]*const exportPackageMarkdownArtifact = validateSWEBodelningExportPackageMarkdownArtifact\([\s\S]*const exportPackage = reconstructSWEBodelningExportPackageFromMarkdownArtifactBody\([\s\S]*assertPlainObject\(input\.snapshot_status, errorCode, "snapshot_status"\);[\s\S]*assertExactKeys\(\s*input\.snapshot_status,\s*exportPackageMarkdownArtifactProjectionSnapshotStatusRequiredKeys,\s*errorCode,\s*"snapshot_status",\s*\);[\s\S]*snapshot_status\.snapshot_export_version_found must be null or a non-empty string[\s\S]*snapshot_status\.snapshot_export_version_found must match export_version when present[\s\S]*snapshot_status\.current_export_version must be a non-empty string[\s\S]*snapshot_status\.snapshot_is_current must be a boolean[\s\S]*return \{\s*\.\.\.exportPackageMarkdownArtifact,\s*snapshot_status: input\.snapshot_status,\s*\};\s*\}/,
  );

  assert.equal(
    (schemasIndexText.match(/function validateCMDExportPackageMarkdownArtifactProjection\(/g) ||
      []).length,
    1,
  );
  assert.equal(
    (schemasIndexText.match(/function validateSWEBodelningExportPackageMarkdownArtifactProjection\(/g) ||
      []).length,
    1,
  );

  const lines = governanceIndexText.split("\n");
  let currentFunction = null;
  const callSites = [];
  const targetFns = new Set([
    "validateCMDExportPackageMarkdownArtifactProjection",
    "validateSWEBodelningExportPackageMarkdownArtifactProjection",
  ]);

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

  assert.deepEqual(callSites, [
    {
      fnName: "validateCMDExportPackageMarkdownArtifactProjection",
      caller: "resolveCMDExportPackageMarkdownArtifactProjection",
      line: 2829,
    },
    {
      fnName: "validateSWEBodelningExportPackageMarkdownArtifactProjection",
      caller: "resolveSWEBodelningExportPackageMarkdownArtifactProjection",
      line: 4382,
    },
  ]);
});
