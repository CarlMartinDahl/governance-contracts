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

test("docs freeze the shared packages/schemas Markdown artifact body-builder seam as the schema-side body-construction boundary", () => {
  assert.match(
    docsText,
    /Shared Packages\/Schemas Markdown Artifact Body-Builder Helper Seam Freeze/i,
  );
  assert.match(
    docsText,
    /shared `packages\/schemas\/src\/index\.js` Markdown body-builder pair `buildSWEBodelningExportPackageMarkdownArtifactBody` and `buildCMDExportPackageMarkdownArtifactBody` is the canonical internal `packages\/schemas` Markdown artifact body-construction boundary for the current included schema-side flows below and is now frozen as the baseline seam/i,
  );
  assert.match(
    docsText,
    /the currently evidenced schema-side surfaces in this freeze are limited to:\s+`export_package_markdown_artifact` canonical Markdown body construction for `SWE_BODELNING`\s+`export_package_markdown_artifact` canonical Markdown body construction for `"CMD_PROFILE"`/i,
  );
  assert.match(
    docsText,
    /the currently concrete shared helper responsibilities already evidenced for this seam are limited to:\s+profile-specific top-level Markdown titles for `SWE_BODELNING` and `"CMD_PROFILE"`\s+shared metadata lines for `jurisdiction_profile_key`, `export_version`, `dossier_fingerprint`, and `generated_at`\s+shared fenced `json` sections for `canonical_source`, `manifest`, and `profile_dossier_snapshot`\s+final body assembly through newline-joined section fragments/i,
  );
  assert.match(
    docsText,
    /the current validator-family relationship already evidenced in `packages\/schemas\/src\/index\.js` is limited to `validateSWEBodelningExportPackageMarkdownArtifact` and `validateCMDExportPackageMarkdownArtifact` calling the shared builder pair to derive canonical `body_utf8` values for equality checking/i,
  );
  assert.match(
    docsText,
    /the current bounded reuse already evidenced in `packages\/schemas\/src\/index\.js` is limited to 2 helper definitions and 2 current validator-family call sites, one per helper/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas` `toCanonicalJson` helper seam remains outside this helper seam because canonical JSON block serialization is delegated to the separately frozen stable JSON boundary and the Markdown body-builder pair only arranges the surrounding Markdown structure and section order/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas` validation-helper scaffold remains outside this helper seam because machine-readable error construction, plain-object enforcement, and key-shape validation occur in the validator family around the builder pair rather than in the builder helpers themselves/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas` export-artifact reconstruction helper scaffold remains outside this helper seam because parsing Markdown artifact bodies back into canonical export package payloads is a separate frozen internal boundary/i,
  );
  assert.match(
    docsText,
    /the shared `packages\/schemas` export scaffold remains outside this helper seam because package export and contract surfacing are a separate frozen external boundary/i,
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
    /downstream schema-specific validation, projection, reconstruction, and artifact-family business logic remain outside this helper seam because they may call the builder pair but do not define the canonical shared Markdown body-construction boundary themselves/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, Markdown encoding semantics, validation semantics, reconstruction semantics, export semantics, schema behavior, or fail-closed behavior/i,
  );

  assert.match(
    schemasIndexText,
    /function buildSWEBodelningExportPackageMarkdownArtifactBody\(exportPackage\) \{\s*return \[\s*"# SWE_BODELNING Export Package",[\s\S]*"## Canonical Source",[\s\S]*toCanonicalJson\(exportPackage\.canonical_source\),[\s\S]*"## Manifest",[\s\S]*toCanonicalJson\(exportPackage\.manifest\),[\s\S]*"## Profile Dossier Snapshot",[\s\S]*toCanonicalJson\(exportPackage\.profile_dossier_snapshot\),[\s\S]*\]\.join\("\\n"\);\s*\}/,
  );
  assert.match(
    schemasIndexText,
    /function buildCMDExportPackageMarkdownArtifactBody\(exportPackage\) \{\s*return \[\s*"# CMD_PROFILE Export Package",[\s\S]*"## Canonical Source",[\s\S]*toCanonicalJson\(exportPackage\.canonical_source\),[\s\S]*"## Manifest",[\s\S]*toCanonicalJson\(exportPackage\.manifest\),[\s\S]*"## Profile Dossier Snapshot",[\s\S]*toCanonicalJson\(exportPackage\.profile_dossier_snapshot\),[\s\S]*\]\.join\("\\n"\);\s*\}/,
  );

  assert.equal(
    (schemasIndexText.match(/function buildSWEBodelningExportPackageMarkdownArtifactBody\(/g) ||
      []).length,
    1,
  );
  assert.equal(
    (schemasIndexText.match(/function buildCMDExportPackageMarkdownArtifactBody\(/g) || [])
      .length,
    1,
  );

  const lines = schemasIndexText.split("\n");
  let currentFunction = null;
  const callSites = [];
  const targetFns = new Set([
    "buildSWEBodelningExportPackageMarkdownArtifactBody",
    "buildCMDExportPackageMarkdownArtifactBody",
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
      fnName: "buildSWEBodelningExportPackageMarkdownArtifactBody",
      caller: "validateSWEBodelningExportPackageMarkdownArtifact",
      line: 12095,
    },
    {
      fnName: "buildCMDExportPackageMarkdownArtifactBody",
      caller: "validateCMDExportPackageMarkdownArtifact",
      line: 12299,
    },
  ]);
});
