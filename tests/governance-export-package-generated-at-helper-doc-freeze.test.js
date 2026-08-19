const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const docsText = fs.readFileSync(
  path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md"),
  "utf8",
);
const governanceIndexText = fs.readFileSync(
  path.join(__dirname, "..", "packages", "governance", "src", "index.js"),
  "utf8",
);
const apiIndexText = fs.readFileSync(
  path.join(__dirname, "..", "apps", "api", "src", "index.js"),
  "utf8",
);
const databaseIndexText = fs.readFileSync(
  path.join(__dirname, "..", "packages", "database", "src", "index.js"),
  "utf8",
);
const derivationHelperFreezeTestText = fs.readFileSync(
  path.join(__dirname, "governance-export-package-derivation-helper-doc-freeze.test.js"),
  "utf8",
);
const adapterDispatchFreezeTestText = fs.readFileSync(
  path.join(__dirname, "governance-export-package-adapter-dispatch-doc-freeze.test.js"),
  "utf8",
);
const projectionHelperFreezeTestText = fs.readFileSync(
  path.join(__dirname, "governance-export-package-projection-helper-doc-freeze.test.js"),
  "utf8",
);
const snapshotStatusHelperFreezeTestText = fs.readFileSync(
  path.join(
    __dirname,
    "governance-export-package-snapshot-status-helper-doc-freeze.test.js",
  ),
  "utf8",
);

function collectLineMatches(text, pattern) {
  return text
    .split("\n")
    .map((line, index) => ({ line, lineNumber: index + 1 }))
    .filter(({ line }) => pattern.test(line))
    .map(({ lineNumber }) => lineNumber);
}

test("docs freeze the shared governance export-package generated-at helper seam as the generated_at option resolver boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared Governance Export Package Generated-At Helper Seam Freeze[\s\S]*?(?=\n### )/,
  );
  const helperStart = governanceIndexText.indexOf(
    "function resolveSWEBodelningExportPackageGeneratedAt(",
  );
  const helperEnd = governanceIndexText.indexOf(
    "\nfunction deriveSWEBodelningExportPackageManifest(",
    helperStart,
  );
  const helperText = governanceIndexText.slice(helperStart, helperEnd);
  const exportSlice = governanceIndexText.slice(
    governanceIndexText.indexOf("module.exports = {"),
  );

  assert.ok(docsSectionMatch, "expected generated-at helper docs section");
  assert.notEqual(helperStart, -1, "expected generated-at helper start");
  assert.notEqual(helperEnd, -1, "expected generated-at helper end");

  const docsSection = docsSectionMatch[0];

  assert.match(
    docsSection,
    /Shared Governance Export Package Generated-At Helper Seam Freeze/i,
  );
  assert.match(
    docsSection,
    /export-package generated-at helper `resolveSWEBodelningExportPackageGeneratedAt` is the canonical internal governance-side helper boundary for resolving the required export-package `generated_at` option value before profile-specific export-package derivation writes it into canonical export-package payloads/i,
  );
  assert.match(
    docsSection,
    /currently evidenced governed surface in this freeze is limited to:\s+resolving or rejecting the `generated_at` derivation option for export-package derivation from a profile-dossier snapshot for `SWE_BODELNING` and `"CMD_PROFILE"`/i,
  );
  assert.match(
    docsSection,
    /currently concrete helper responsibilities already evidenced for this seam are limited to:\s+returning `options\.generated_at` when it is a non-empty string\s+throwing `createGovernanceError\("ERR_EXPORT_PACKAGE_INVALID", "generated_at must be provided for export package derivation", \{ field: "generated_at" \}\)` when `generated_at` is absent, non-string, or empty\s+providing the resolved `generated_at` value to already separate export-package derivation helpers without owning the rest of export-package payload assembly/i,
  );
  assert.match(
    docsSection,
    /relationship to export-package derivation-from-profile-dossier-snapshot helpers is limited to `deriveSWEBodelningExportPackageFromProfileDossierSnapshot\(\.\.\.\)` and `deriveCMDExportPackageFromProfileDossierSnapshot\(\.\.\.\)` calling this helper for their canonical `generated_at` fields/i,
  );
  assert.match(
    docsSection,
    /current bounded reuse already evidenced in `packages\/governance\/src\/index\.js` is limited to one unexported helper definition, two profile-specific export-package derivation-from-profile-dossier-snapshot call sites, and no current named module export surface for this helper/i,
  );
  assert.match(
    docsSection,
    /shared governance error helper seam remains outside this helper seam because `resolveSWEBodelningExportPackageGeneratedAt\(\.\.\.\)` consumes `createGovernanceError\(\.\.\.\)` only for the currently evidenced `ERR_EXPORT_PACKAGE_INVALID` branch/i,
  );
  assert.match(
    docsSection,
    /export-package adapter-dispatch, release-eval derivation, projection, snapshot-status\/currentness, artifact derivation\/projection, bundle-manifest, bundle-archive, stored-ZIP, content\/escaping, profile-dossier, schema validation, route\/API behavior, parser\/auth\/response-helper behavior, database persistence\/read\/refresh behavior, and broader governance\/runtime behavior remain outside this seam/i,
  );
  assert.match(
    docsSection,
    /does not change runtime behavior, generated-at semantics, derivation semantics, projection semantics, persistence semantics, API behavior, schema behavior, or fail-closed behavior/i,
  );

  assert.match(
    helperText,
    /function resolveSWEBodelningExportPackageGeneratedAt\(options = \{\}\) \{/,
  );
  assert.match(
    helperText,
    /typeof options\.generated_at === "string" &&\s*options\.generated_at\.length > 0[\s\S]*return options\.generated_at;/,
  );
  assert.match(
    helperText,
    /throw createGovernanceError\(\s*"ERR_EXPORT_PACKAGE_INVALID",\s*"generated_at must be provided for export package derivation",\s*\{\s*field: "generated_at",\s*\},\s*\);/,
  );
  assert.match(
    governanceIndexText,
    /function deriveSWEBodelningExportPackageFromProfileDossierSnapshot\([\s\S]*generated_at: resolveSWEBodelningExportPackageGeneratedAt\(options\),[\s\S]*manifest: deriveSWEBodelningExportPackageManifest\(\),/,
  );
  assert.match(
    governanceIndexText,
    /function deriveCMDExportPackageFromProfileDossierSnapshot\([\s\S]*generated_at: resolveSWEBodelningExportPackageGeneratedAt\(options\),[\s\S]*manifest: deriveCMDExportPackageManifest\(\),/,
  );
  assert.doesNotMatch(
    exportSlice,
    /^\s*resolveSWEBodelningExportPackageGeneratedAt,\s*$/m,
  );

  assert.deepEqual(
    collectLineMatches(
      governanceIndexText,
      /\bresolveSWEBodelningExportPackageGeneratedAt\b/,
    ),
    [
      1613,
      1664,
      1765,
    ],
  );
  assert.doesNotMatch(apiIndexText, /resolveSWEBodelningExportPackageGeneratedAt\(/);
  assert.doesNotMatch(
    databaseIndexText,
    /resolveSWEBodelningExportPackageGeneratedAt\(/,
  );

  assert.match(
    derivationHelperFreezeTestText,
    /Shared Governance Export Package Derivation Helper Seam Freeze/i,
  );
  assert.match(
    derivationHelperFreezeTestText,
    /resolveSWEBodelningExportPackageGeneratedAt\\\(options\\\)/,
  );
  assert.match(
    adapterDispatchFreezeTestText,
    /Shared Governance Export Package Adapter-Dispatch Seam Freeze/i,
  );
  assert.match(
    projectionHelperFreezeTestText,
    /Shared Governance Export Package Projection Helper Seam Freeze/i,
  );
  assert.match(
    snapshotStatusHelperFreezeTestText,
    /Shared Governance Export Package Snapshot-Status Helper Seam Freeze/i,
  );
});
