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
const canonicalJsonFreezeTestText = fs.readFileSync(
  path.join(__dirname, "governance-canonical-json-helper-doc-freeze.test.js"),
  "utf8",
);
const schemaValidatorFreezeTestText = fs.readFileSync(
  path.join(__dirname, "schemas-bundle-manifest-validator-doc-freeze.test.js"),
  "utf8",
);
const adapterDispatchFreezeTestText = fs.readFileSync(
  path.join(
    __dirname,
    "governance-export-package-bundle-manifest-adapter-dispatch-doc-freeze.test.js",
  ),
  "utf8",
);
const bundleArchiveProjectionTestText = fs.readFileSync(
  path.join(__dirname, "export-package-bundle-archive-artifact-projection.test.js"),
  "utf8",
);
const cmdDossierFingerprintFreezeTestText = fs.readFileSync(
  path.join(
    __dirname,
    "governance-export-package-cmd-dossier-fingerprint-helper-doc-freeze.test.js",
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

test("docs freeze the shared governance export-package bundle/package manifest fingerprint helper seam as the manifest hashing boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared Governance Export Package Bundle\/Package Manifest Fingerprint Helper Seam Freeze[\s\S]*?(?=\n### )/,
  );
  const sweHelperStart = governanceIndexText.indexOf(
    "function deriveSWEBodelningExportPackageBundleManifestFingerprint(",
  );
  const cmdHelperStart = governanceIndexText.indexOf(
    "function deriveCMDExportPackageBundleManifestFingerprint(",
  );
  const cmdHelperEnd = governanceIndexText.indexOf(
    "\nfunction deriveSWEBodelningExportPackageBundleManifest(",
    cmdHelperStart,
  );
  const sweHelperText = governanceIndexText.slice(sweHelperStart, cmdHelperStart);
  const cmdHelperText = governanceIndexText.slice(cmdHelperStart, cmdHelperEnd);
  const exportSlice = governanceIndexText.slice(
    governanceIndexText.indexOf("module.exports = {"),
  );

  assert.ok(
    docsSectionMatch,
    "expected bundle/package manifest fingerprint docs section",
  );
  assert.notEqual(sweHelperStart, -1, "expected SWE fingerprint helper start");
  assert.notEqual(cmdHelperStart, -1, "expected CMD fingerprint helper start");
  assert.notEqual(cmdHelperEnd, -1, "expected CMD fingerprint helper end");

  const docsSection = docsSectionMatch[0];

  assert.match(
    docsSection,
    /Shared Governance Export Package Bundle\/Package Manifest Fingerprint Helper Seam Freeze/i,
  );
  assert.match(
    docsSection,
    /seam formed by `deriveSWEBodelningExportPackageBundleManifestFingerprint\(\.\.\.\)` and `deriveCMDExportPackageBundleManifestFingerprint\(\.\.\.\)` is the canonical internal governance-side helper boundary for deriving deterministic bundle\/package manifest fingerprints/i,
  );
  assert.match(
    docsSection,
    /currently evidenced governed surfaces in this freeze are limited to:\s+`export_package_bundle_manifest` fingerprint derivation for `SWE_BODELNING` bundle\/archive artifact derivation and currentness comparison\s+`export_package_bundle_manifest` fingerprint derivation for `"CMD_PROFILE"` bundle\/archive artifact derivation and currentness comparison/i,
  );
  assert.match(
    docsSection,
    /currently concrete helper responsibilities already evidenced for this seam are limited to:\s+validating and canonicalizing the incoming SWE bundle\/package manifest snapshot through `validateSWEBodelningExportPackageBundleManifest\(bundleManifestSnapshot\)`\s+validating and canonicalizing the incoming CMD bundle\/package manifest snapshot through `validateCMDExportPackageBundleManifest\(bundleManifestSnapshot\)`\s+serializing the resulting canonical bundle\/package manifest through the already-closed governance `toCanonicalJson\(\.\.\.\)` helper seam\s+deriving the currently evidenced SHA-256 hex digest through `crypto\.createHash\("sha256"\)\.update\(toCanonicalJson\(canonicalBundleManifest\)\)\.digest\("hex"\)`\s+returning the resulting digest as the bundle\/package manifest fingerprint consumed by the final bundle\/archive artifact helpers/i,
  );
  assert.match(
    docsSection,
    /relationship to final bundle\/archive artifact derivation is limited to the SWE final bundle\/archive artifact helper calling `deriveSWEBodelningExportPackageBundleManifestFingerprint\(canonicalBundleManifest\)` and the CMD final bundle\/archive artifact helper calling `deriveCMDExportPackageBundleManifestFingerprint\(canonicalBundleManifest\)` for their `bundle_manifest_fingerprint` values/i,
  );
  assert.match(
    docsSection,
    /relationship to final bundle\/archive currentness comparison is limited to the SWE and CMD final bundle\/archive currentness paths calling their respective bundle\/package manifest fingerprint helpers for current bundle-manifest fingerprint comparison/i,
  );
  assert.match(
    docsSection,
    /current bounded reuse already evidenced in `packages\/governance\/src\/index\.js` is limited to two helper definitions, two final bundle\/archive artifact derivation call sites, two final bundle\/archive currentness comparison call sites, and the current named module export surface exposing `deriveSWEBodelningExportPackageBundleManifestFingerprint` while not exposing `deriveCMDExportPackageBundleManifestFingerprint`/i,
  );
  assert.match(
    docsSection,
    /shared governance `toCanonicalJson` helper seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /bundle\/package manifest schema validator seams remain outside this helper seam because `validateSWEBodelningExportPackageBundleManifest\(\.\.\.\)` and `validateCMDExportPackageBundleManifest\(\.\.\.\)` own lower schema validation and canonicalization beyond the bounded validator handoff evidenced here/i,
  );
  assert.match(
    docsSection,
    /already-frozen bundle\/package manifest adapter-dispatch seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /already-frozen broader bundle\/package manifest derivation and projection helper scaffold remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /final bundle\/archive derivation, projection, and currentness behavior as a whole remain outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /database persistence\/read\/refresh behavior, route\/API behavior, stored-ZIP behavior, generated artifact output as a whole, and broader governance\/runtime behavior remain outside this seam/i,
  );
  assert.match(
    docsSection,
    /already-closed helper families, including `deriveCMDExportPackageDossierFingerprint\(\.\.\.\)`, remain outside this seam/i,
  );
  assert.match(
    docsSection,
    /future governance-side bundle\/package manifest fingerprint derivation for the same SWE or CMD export-package bundle\/archive surfaces should extend this helper pair instead of duplicating hashing semantics in adapter-dispatch, broader manifest scaffolds, final archive helpers, database, route, schema, or generated-artifact layers/i,
  );
  assert.match(
    docsSection,
    /does not change runtime behavior, fingerprint semantics, canonical JSON semantics, validation semantics, derivation semantics, currentness semantics, projection semantics, artifact semantics, persistence semantics, API behavior, schema behavior, or fail-closed behavior/i,
  );

  assert.match(
    sweHelperText,
    /function deriveSWEBodelningExportPackageBundleManifestFingerprint\(\s*bundleManifestSnapshot,?\s*\) \{/,
  );
  assert.match(
    sweHelperText,
    /const canonicalBundleManifest = validateSWEBodelningExportPackageBundleManifest\(\s*bundleManifestSnapshot,\s*\);/,
  );
  assert.match(
    sweHelperText,
    /return crypto\s*\.createHash\("sha256"\)\s*\.update\(toCanonicalJson\(canonicalBundleManifest\)\)\s*\.digest\("hex"\);/,
  );
  assert.match(
    cmdHelperText,
    /function deriveCMDExportPackageBundleManifestFingerprint\(\s*bundleManifestSnapshot,?\s*\) \{/,
  );
  assert.match(
    cmdHelperText,
    /const canonicalBundleManifest = validateCMDExportPackageBundleManifest\(\s*bundleManifestSnapshot,\s*\);/,
  );
  assert.match(
    cmdHelperText,
    /return crypto\s*\.createHash\("sha256"\)\s*\.update\(toCanonicalJson\(canonicalBundleManifest\)\)\s*\.digest\("hex"\);/,
  );

  assert.match(
    governanceIndexText,
    /const bundleManifestFingerprint = deriveSWEBodelningExportPackageBundleManifestFingerprint\(\s*canonicalBundleManifest,\s*\);/,
  );
  assert.match(
    governanceIndexText,
    /currentBundleManifestFingerprint\s*=\s*deriveSWEBodelningExportPackageBundleManifestFingerprint\(\s*canonicalCurrentBundleManifest,\s*\);/,
  );
  assert.match(
    governanceIndexText,
    /const bundleManifestFingerprint = deriveCMDExportPackageBundleManifestFingerprint\(\s*canonicalBundleManifest,\s*\);/,
  );
  assert.match(
    governanceIndexText,
    /currentBundleManifestFingerprint\s*=\s*deriveCMDExportPackageBundleManifestFingerprint\(\s*canonicalCurrentBundleManifest,\s*\);/,
  );
  assert.match(
    governanceIndexText,
    /bundle_manifest_fingerprint: bundleManifestFingerprint,/,
  );
  assert.match(
    exportSlice,
    /^\s*deriveSWEBodelningExportPackageBundleManifestFingerprint,\s*$/m,
  );
  assert.doesNotMatch(
    exportSlice,
    /^\s*deriveCMDExportPackageBundleManifestFingerprint,\s*$/m,
  );

  assert.deepEqual(
    collectLineMatches(
      governanceIndexText,
      /\bderiveSWEBodelningExportPackageBundleManifestFingerprint\b/,
    ),
    [
      2940,
      3393,
      3466,
      5882,
    ],
  );
  assert.deepEqual(
    collectLineMatches(
      governanceIndexText,
      /\bderiveCMDExportPackageBundleManifestFingerprint\b/,
    ),
    [
      2953,
      3564,
      3640,
    ],
  );
  assert.doesNotMatch(
    apiIndexText,
    /deriveSWEBodelningExportPackageBundleManifestFingerprint\(/,
  );
  assert.doesNotMatch(
    apiIndexText,
    /deriveCMDExportPackageBundleManifestFingerprint\(/,
  );
  assert.doesNotMatch(
    databaseIndexText,
    /deriveSWEBodelningExportPackageBundleManifestFingerprint\(/,
  );
  assert.doesNotMatch(
    databaseIndexText,
    /deriveCMDExportPackageBundleManifestFingerprint\(/,
  );

  assert.match(
    canonicalJsonFreezeTestText,
    /deriveSWEBodelningExportPackageBundleManifestFingerprint/i,
  );
  assert.match(
    schemaValidatorFreezeTestText,
    /deriveSWEBodelningExportPackageBundleManifestFingerprint/i,
  );
  assert.match(
    schemaValidatorFreezeTestText,
    /deriveCMDExportPackageBundleManifestFingerprint/i,
  );
  assert.match(
    adapterDispatchFreezeTestText,
    /bundle\/package manifest adapter-dispatch seam/i,
  );
  assert.match(
    bundleArchiveProjectionTestText,
    /deriveSWEBodelningExportPackageBundleManifestFingerprint/i,
  );
  assert.match(
    cmdDossierFingerprintFreezeTestText,
    /Shared Governance Export Package CMD Dossier-Fingerprint Helper Seam Freeze/i,
  );
});
