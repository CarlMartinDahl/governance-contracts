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
const generatedAtHelperFreezeTestText = fs.readFileSync(
  path.join(
    __dirname,
    "governance-export-package-generated-at-helper-doc-freeze.test.js",
  ),
  "utf8",
);
const derivationHelperFreezeTestText = fs.readFileSync(
  path.join(
    __dirname,
    "governance-export-package-derivation-helper-doc-freeze.test.js",
  ),
  "utf8",
);
const adapterDispatchFreezeTestText = fs.readFileSync(
  path.join(
    __dirname,
    "governance-export-package-adapter-dispatch-doc-freeze.test.js",
  ),
  "utf8",
);
const projectionHelperFreezeTestText = fs.readFileSync(
  path.join(
    __dirname,
    "governance-export-package-projection-helper-doc-freeze.test.js",
  ),
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

test("docs freeze the shared governance export-package manifest helper seam as the static manifest-construction boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared Governance Export Package Manifest Helper Seam Freeze[\s\S]*?(?=\n### )/,
  );
  const sweHelperStart = governanceIndexText.indexOf(
    "function deriveSWEBodelningExportPackageManifest(",
  );
  const sweHelperEnd = governanceIndexText.indexOf(
    "\nfunction deriveSWEBodelningExportPackageFromProfileDossierSnapshot(",
    sweHelperStart,
  );
  const cmdHelperStart = governanceIndexText.indexOf(
    "function deriveCMDExportPackageManifest(",
  );
  const cmdHelperEnd = governanceIndexText.indexOf(
    "\nfunction deriveCMDExportPackageDossierFingerprint(",
    cmdHelperStart,
  );
  const sweHelperText = governanceIndexText.slice(sweHelperStart, sweHelperEnd);
  const cmdHelperText = governanceIndexText.slice(cmdHelperStart, cmdHelperEnd);
  const exportSlice = governanceIndexText.slice(
    governanceIndexText.indexOf("module.exports = {"),
  );

  assert.ok(docsSectionMatch, "expected manifest helper docs section");
  assert.notEqual(sweHelperStart, -1, "expected SWE manifest helper start");
  assert.notEqual(sweHelperEnd, -1, "expected SWE manifest helper end");
  assert.notEqual(cmdHelperStart, -1, "expected CMD manifest helper start");
  assert.notEqual(cmdHelperEnd, -1, "expected CMD manifest helper end");

  const docsSection = docsSectionMatch[0];

  assert.match(
    docsSection,
    /Shared Governance Export Package Manifest Helper Seam Freeze/i,
  );
  assert.match(
    docsSection,
    /export-package manifest helper pair `deriveSWEBodelningExportPackageManifest` and `deriveCMDExportPackageManifest` is the canonical internal governance-side helper boundary for constructing the static canonical export-package `manifest` object before profile-specific export-package derivation writes it into canonical export-package payloads/i,
  );
  assert.match(
    docsSection,
    /currently evidenced governed surface in this freeze is limited to:\s+`export_package\.manifest` construction for `SWE_BODELNING`\s+`export_package\.manifest` construction for `"CMD_PROFILE"`/i,
  );
  assert.match(
    docsSection,
    /currently concrete helper responsibilities already evidenced for this seam are limited to:\s+returning a manifest object with `included_top_level_artifacts`\s+preserving the currently evidenced static top-level artifact list `\["canonical_source", "profile_dossier_snapshot"\]`\s+providing the resolved manifest object to already separate export-package derivation helpers without owning the rest of export-package payload assembly/i,
  );
  assert.match(
    docsSection,
    /relationship to export-package derivation-from-profile-dossier-snapshot helpers is limited to `deriveSWEBodelningExportPackageFromProfileDossierSnapshot\(\.\.\.\)` calling `deriveSWEBodelningExportPackageManifest\(\.\.\.\)` for its canonical `manifest` field and `deriveCMDExportPackageFromProfileDossierSnapshot\(\.\.\.\)` calling `deriveCMDExportPackageManifest\(\.\.\.\)` for its canonical `manifest` field/i,
  );
  assert.match(
    docsSection,
    /current bounded reuse already evidenced in `packages\/governance\/src\/index\.js` is limited to two unexported helper definitions, two profile-specific export-package derivation-from-profile-dossier-snapshot call sites, and no current named module export surface for either manifest helper/i,
  );
  assert.match(
    docsSection,
    /already-closed export-package generated-at helper seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /export-package adapter-dispatch, release-eval derivation, projection, snapshot-status\/currentness, artifact derivation\/projection, bundle-manifest, bundle-archive, stored-ZIP, content\/escaping, profile-dossier, schema validation, route\/API behavior, parser\/auth\/response-helper behavior, database persistence\/read\/refresh behavior, and broader governance\/runtime behavior remain outside this seam/i,
  );
  assert.match(
    docsSection,
    /does not change runtime behavior, manifest semantics, derivation semantics, projection semantics, persistence semantics, API behavior, schema behavior, or fail-closed behavior/i,
  );

  assert.match(
    sweHelperText,
    /function deriveSWEBodelningExportPackageManifest\(\) \{/,
  );
  assert.match(
    sweHelperText,
    /included_top_level_artifacts:\s*\[\s*"canonical_source",\s*"profile_dossier_snapshot",\s*\]/,
  );
  assert.match(cmdHelperText, /function deriveCMDExportPackageManifest\(\) \{/);
  assert.match(
    cmdHelperText,
    /included_top_level_artifacts:\s*\[\s*"canonical_source",\s*"profile_dossier_snapshot",\s*\]/,
  );
  assert.match(
    governanceIndexText,
    /function deriveSWEBodelningExportPackageFromProfileDossierSnapshot\([\s\S]*manifest: deriveSWEBodelningExportPackageManifest\(\),/,
  );
  assert.match(
    governanceIndexText,
    /function deriveCMDExportPackageFromProfileDossierSnapshot\([\s\S]*manifest: deriveCMDExportPackageManifest\(\),/,
  );
  assert.doesNotMatch(
    exportSlice,
    /^\s*deriveSWEBodelningExportPackageManifest,\s*$/m,
  );
  assert.doesNotMatch(exportSlice, /^\s*deriveCMDExportPackageManifest,\s*$/m);

  assert.deepEqual(
    collectLineMatches(
      governanceIndexText,
      /\bderiveSWEBodelningExportPackageManifest\b/,
    ),
    [
      1630,
      1665,
    ],
  );
  assert.deepEqual(
    collectLineMatches(governanceIndexText, /\bderiveCMDExportPackageManifest\b/),
    [
      1683,
      1766,
    ],
  );
  assert.doesNotMatch(
    apiIndexText,
    /deriveSWEBodelningExportPackageManifest\(/,
  );
  assert.doesNotMatch(apiIndexText, /deriveCMDExportPackageManifest\(/);
  assert.doesNotMatch(
    databaseIndexText,
    /deriveSWEBodelningExportPackageManifest\(/,
  );
  assert.doesNotMatch(databaseIndexText, /deriveCMDExportPackageManifest\(/);

  assert.match(
    generatedAtHelperFreezeTestText,
    /Shared Governance Export Package Generated-At Helper Seam Freeze/i,
  );
  assert.match(
    derivationHelperFreezeTestText,
    /Shared Governance Export Package Derivation Helper Seam Freeze/i,
  );
  assert.match(
    derivationHelperFreezeTestText,
    /manifest: deriveSWEBodelningExportPackageManifest\\\(\\\)/,
  );
  assert.match(
    derivationHelperFreezeTestText,
    /manifest: deriveCMDExportPackageManifest\\\(\\\)/,
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
