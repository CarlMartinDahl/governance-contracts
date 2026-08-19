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

test("docs freeze the shared packages/schemas Markdown artifact validator seam as the schema-side Markdown validation boundary", () => {
  assert.match(
    docsText,
    /Shared Packages\/Schemas Markdown Artifact Validator Seam Freeze/i,
  );
  assert.match(
    docsText,
    /shared `packages\/schemas\/src\/index\.js` Markdown artifact validator pair `validateSWEBodelningExportPackageMarkdownArtifact` and `validateCMDExportPackageMarkdownArtifact` is the canonical internal `packages\/schemas` Markdown artifact validation boundary for the current included schema-side flows below and is now frozen as the baseline seam/i,
  );
  assert.match(
    docsText,
    /the currently evidenced schema-side surfaces in this freeze are limited to:\s+`export_package_markdown_artifact` validator for `SWE_BODELNING`\s+`export_package_markdown_artifact` validator for `"CMD_PROFILE"`/i,
  );
  assert.match(
    docsText,
    /the currently concrete shared helper responsibilities already evidenced for this seam are limited to:\s+shared artifact envelope validation for `artifact_type`, `filename`, `content_type`, `encoding`, and `body_utf8`\s+reconstructing the canonical export package payload from `body_utf8` through the separately frozen Markdown reconstruction helper seam\s+enforcing filename equality against the canonical export package identity\s+deriving canonical `body_utf8` through the separately frozen Markdown body-builder seam and enforcing canonical Markdown equality\s+returning the normalized artifact object with canonical `body_utf8`/i,
  );
  assert.match(
    docsText,
    /the current relationship to the wider projection-validator surface already evidenced in `packages\/schemas\/src\/index\.js` is limited to `validateSWEBodelningExportPackageMarkdownArtifactProjection` and `validateCMDExportPackageMarkdownArtifactProjection` delegating artifact validation to the shared validator pair before their projection-specific `snapshot_status` validation/i,
  );
  assert.match(
    docsText,
    /the current bounded reuse already evidenced in `packages\/schemas\/src\/index\.js` is limited to 2 validator definitions and 2 current projection-validator call sites, one per validator/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas` `toCanonicalJson` helper seam remains outside this helper seam because stable JSON serialization is a separate frozen boundary even where the validator pair compares `body_utf8` against canonical Markdown bodies that embed canonical JSON blocks/i,
  );
  assert.match(
    docsText,
    /the frozen Markdown artifact body-builder seam remains outside this helper seam because the validator pair calls the shared builder helpers to derive canonical body text but does not define the canonical Markdown section layout itself/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas` validation-helper scaffold remains outside this helper seam because machine-readable error construction, plain-object enforcement, and key-shape validation are separate frozen internal boundaries consumed by the validator pair rather than defined by it/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas` export-artifact reconstruction helper scaffold remains outside this helper seam because Markdown body parsing back into canonical export package payloads is a separate frozen internal boundary consumed by the validator pair rather than defined by it/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas` Markdown artifact validator-dispatch layer remains outside this helper seam because registry-based jurisdiction\/profile selection through `getExportPackageMarkdownArtifactValidator`, `exportPackageMarkdownArtifactValidatorRegistry`, and `validateExportPackageMarkdownArtifact` is a separate layer above the profile-specific validator pair/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas` export scaffold remains outside this helper seam because aggregate validator\/export surfacing is a separate frozen external boundary/i,
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
    /downstream schema-specific projection, reconstruction, export, and route\/runtime behavior remain outside this helper seam because they may call the validator pair but do not define the canonical shared Markdown artifact validation boundary themselves/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, Markdown encoding semantics, validation semantics, reconstruction semantics, export semantics, schema behavior, or fail-closed behavior/i,
  );

  assert.match(
    schemasIndexText,
    /function validateSWEBodelningExportPackageMarkdownArtifact\(\s*input,\s*errorCode = "ERR_EXPORT_PACKAGE_MARKDOWN_ARTIFACT_INVALID",\s*\) \{\s*assertPlainObject\(input, errorCode, "input"\);\s*assertExactKeys\(input, exportPackageMarkdownArtifactRequiredKeys, errorCode, "input"\);[\s\S]*const canonicalExportPackage =\s*reconstructSWEBodelningExportPackageFromMarkdownArtifactBody\(\s*input\.body_utf8,\s*errorCode,\s*\);[\s\S]*const expectedFilename =\s*`\$\{canonicalExportPackage\.export_version\}-\$\{canonicalExportPackage\.dossier_fingerprint\}\.md`[\s\S]*const canonicalBodyUtf8 =\s*buildSWEBodelningExportPackageMarkdownArtifactBody\(canonicalExportPackage\);[\s\S]*return \{\s*artifact_type: input\.artifact_type,\s*filename: input\.filename,\s*content_type: input\.content_type,\s*encoding: input\.encoding,\s*body_utf8: canonicalBodyUtf8,\s*\};\s*\}/,
  );
  assert.match(
    schemasIndexText,
    /function validateCMDExportPackageMarkdownArtifact\(\s*input,\s*errorCode = "ERR_EXPORT_PACKAGE_MARKDOWN_ARTIFACT_INVALID",\s*\) \{\s*assertPlainObject\(input, errorCode, "input"\);\s*assertExactKeys\(input, exportPackageMarkdownArtifactRequiredKeys, errorCode, "input"\);[\s\S]*const canonicalExportPackage = reconstructCMDExportPackageFromMarkdownArtifactBody\(\s*input\.body_utf8,\s*errorCode,\s*\);[\s\S]*const expectedFilename =\s*`\$\{canonicalExportPackage\.export_version\}-\$\{canonicalExportPackage\.dossier_fingerprint\}\.md`[\s\S]*const canonicalBodyUtf8 =\s*buildCMDExportPackageMarkdownArtifactBody\(canonicalExportPackage\);[\s\S]*return \{\s*artifact_type: input\.artifact_type,\s*filename: input\.filename,\s*content_type: input\.content_type,\s*encoding: input\.encoding,\s*body_utf8: canonicalBodyUtf8,\s*\};\s*\}/,
  );

  assert.equal(
    (schemasIndexText.match(/function validateSWEBodelningExportPackageMarkdownArtifact\(/g) ||
      []).length,
    1,
  );
  assert.equal(
    (schemasIndexText.match(/function validateCMDExportPackageMarkdownArtifact\(/g) || [])
      .length,
    1,
  );

  const lines = schemasIndexText.split("\n");
  let currentFunction = null;
  const callSites = [];
  const targetFns = new Set([
    "validateSWEBodelningExportPackageMarkdownArtifact",
    "validateCMDExportPackageMarkdownArtifact",
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
      fnName: "validateCMDExportPackageMarkdownArtifact",
      caller: "validateCMDExportPackageMarkdownArtifactProjection",
      line: 12572,
    },
    {
      fnName: "validateSWEBodelningExportPackageMarkdownArtifact",
      caller: "validateSWEBodelningExportPackageMarkdownArtifactProjection",
      line: 12665,
    },
  ]);
});
