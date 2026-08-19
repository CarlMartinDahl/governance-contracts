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
const profileDossierFingerprintFreezeTestText = fs.readFileSync(
  path.join(
    __dirname,
    "governance-profile-dossier-fingerprint-helper-doc-freeze.test.js",
  ),
  "utf8",
);
const generatedAtHelperFreezeTestText = fs.readFileSync(
  path.join(
    __dirname,
    "governance-export-package-generated-at-helper-doc-freeze.test.js",
  ),
  "utf8",
);
const manifestHelperFreezeTestText = fs.readFileSync(
  path.join(
    __dirname,
    "governance-export-package-manifest-helper-doc-freeze.test.js",
  ),
  "utf8",
);
const canonicalSourceHelperFreezeTestText = fs.readFileSync(
  path.join(
    __dirname,
    "governance-export-package-cmd-canonical-source-helper-doc-freeze.test.js",
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

test("docs freeze the shared governance export-package CMD dossier-fingerprint helper seam as the CMD dossier_fingerprint hashing boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared Governance Export Package CMD Dossier-Fingerprint Helper Seam Freeze[\s\S]*?(?=\n### )/,
  );
  const helperStart = governanceIndexText.indexOf(
    "function deriveCMDExportPackageDossierFingerprint(",
  );
  const helperEnd = governanceIndexText.indexOf(
    "\nfunction deriveCMDExportPackageCanonicalSource(",
    helperStart,
  );
  const helperText = governanceIndexText.slice(helperStart, helperEnd);
  const exportSlice = governanceIndexText.slice(
    governanceIndexText.indexOf("module.exports = {"),
  );

  assert.ok(docsSectionMatch, "expected CMD dossier-fingerprint docs section");
  assert.notEqual(helperStart, -1, "expected CMD dossier-fingerprint helper start");
  assert.notEqual(helperEnd, -1, "expected CMD dossier-fingerprint helper end");

  const docsSection = docsSectionMatch[0];

  assert.match(
    docsSection,
    /Shared Governance Export Package CMD Dossier-Fingerprint Helper Seam Freeze/i,
  );
  assert.match(
    docsSection,
    /export-package CMD dossier-fingerprint helper `deriveCMDExportPackageDossierFingerprint` is the canonical internal governance-side helper boundary for deriving the canonical CMD export-package `dossier_fingerprint` from a CMD profile-dossier snapshot before CMD export-package derivation writes it into canonical export-package payloads/i,
  );
  assert.match(
    docsSection,
    /currently evidenced governed surface in this freeze is limited to:\s+`export_package\.dossier_fingerprint` derivation for `"CMD_PROFILE"` export-package derivation from a profile-dossier snapshot/i,
  );
  assert.match(
    docsSection,
    /currently concrete helper responsibilities already evidenced for this seam are limited to:\s+validating and canonicalizing the incoming CMD profile-dossier snapshot through `validateCMDProfileDossierSnapshot\(profileDossierSnapshot\)`\s+serializing the resulting canonical CMD profile-dossier snapshot through the already-closed governance `toCanonicalJson\(\.\.\.\)` helper seam\s+deriving the currently evidenced SHA-256 hex digest through `crypto\.createHash\("sha256"\)\.update\(toCanonicalJson\(canonicalProfileDossierSnapshot\)\)\.digest\("hex"\)`\s+returning the resulting digest as the canonical CMD export-package `dossier_fingerprint` value without owning the rest of export-package payload assembly/i,
  );
  assert.match(
    docsSection,
    /relationship to the export-package derivation-from-profile-dossier-snapshot helper seam is limited to `deriveCMDExportPackageFromProfileDossierSnapshot\(\.\.\.\)` calling `deriveCMDExportPackageDossierFingerprint\(canonicalProfileDossierSnapshot\)` for its canonical `dossier_fingerprint` field/i,
  );
  assert.match(
    docsSection,
    /relationship to the export-package snapshot-status\/currentness helper seam is limited to `deriveCMDExportPackageSnapshotStatus\(\.\.\.\)` calling `deriveCMDExportPackageDossierFingerprint\(currentProfileDossierSnapshot\)` when deriving the current CMD dossier fingerprint for comparison/i,
  );
  assert.match(
    docsSection,
    /relationship to CMD export-package artifact snapshot-status\/currentness helper seams is consumer-only and boundary-only because current JSON, DOCX, PDF, and Markdown artifact currentness helpers may call `deriveCMDExportPackageDossierFingerprint\(\.\.\.\)` while comparing artifact-derived export packages against current profile-dossier state/i,
  );
  assert.match(
    docsSection,
    /current bounded reuse already evidenced in `packages\/governance\/src\/index\.js` is limited to one unexported helper definition, one CMD export-package derivation-from-profile-dossier-snapshot call site, one CMD export-package snapshot-status\/currentness call site, four CMD export-package artifact snapshot-status\/currentness call sites, and no current named module export surface for this helper/i,
  );
  assert.match(
    docsSection,
    /lower CMD profile-dossier validator seam remains outside this helper seam because `validateCMDProfileDossierSnapshot\(\.\.\.\)` owns lower profile-dossier snapshot validation and canonicalization/i,
  );
  assert.match(
    docsSection,
    /shared governance `toCanonicalJson` helper seam remains outside this helper seam because stable canonical JSON serialization is a separate frozen boundary consumed by this helper before hashing/i,
  );
  assert.match(
    docsSection,
    /already-closed profile-dossier fingerprint helper seam remains outside this helper seam because `deriveSWEBodelningProfileDossierFingerprint\(\.\.\.\)` derives SWE profile-dossier `dossier_fingerprint` values from profile-dossier payloads/i,
  );
  assert.match(
    docsSection,
    /already-closed export-package generated-at helper seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /already-closed export-package manifest helper seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /already-closed export-package CMD canonical-source helper seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /already-closed export-package derivation-from-profile-dossier-snapshot seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /SWE dossier-fingerprint behavior, release-eval derivation, export-package adapter-dispatch, projection, snapshot-status\/currentness, artifact derivation\/projection\/currentness, bundle-manifest, bundle-archive, stored-ZIP, content\/escaping, profile-dossier snapshot\/projection\/helper behavior, schema validation ownership, database persistence\/read\/refresh behavior, route\/API behavior, parser\/auth\/response-helper behavior, and broader governance\/runtime behavior remain outside this seam/i,
  );
  assert.match(
    docsSection,
    /does not change runtime behavior, fingerprint semantics, canonical JSON semantics, profile-dossier validation semantics, derivation semantics, currentness semantics, projection semantics, artifact semantics, persistence semantics, API behavior, schema behavior, or fail-closed behavior/i,
  );

  assert.match(
    helperText,
    /function deriveCMDExportPackageDossierFingerprint\(profileDossierSnapshot\) \{/,
  );
  assert.match(
    helperText,
    /const canonicalProfileDossierSnapshot = validateCMDProfileDossierSnapshot\(\s*profileDossierSnapshot,\s*\);/,
  );
  assert.match(
    helperText,
    /return crypto\s*\.createHash\("sha256"\)\s*\.update\(toCanonicalJson\(canonicalProfileDossierSnapshot\)\)\s*\.digest\("hex"\);/,
  );
  assert.match(
    governanceIndexText,
    /function deriveCMDExportPackageFromProfileDossierSnapshot\([\s\S]*dossier_fingerprint: deriveCMDExportPackageDossierFingerprint\(\s*canonicalProfileDossierSnapshot,\s*\),[\s\S]*canonical_source: deriveCMDExportPackageCanonicalSource\(options\),/,
  );
  assert.match(
    governanceIndexText,
    /function deriveCMDExportPackageSnapshotStatus\([\s\S]*currentDossierFingerprint = deriveCMDExportPackageDossierFingerprint\(\s*currentProfileDossierSnapshot,\s*\);[\s\S]*canonicalExportPackage\.dossier_fingerprint === currentDossierFingerprint/,
  );
  assert.doesNotMatch(
    exportSlice,
    /^\s*deriveCMDExportPackageDossierFingerprint,\s*$/m,
  );

  assert.deepEqual(
    collectLineMatches(
      governanceIndexText,
      /\bderiveCMDExportPackageDossierFingerprint\b/,
    ),
    [
      1692,
      1760,
      1799,
      2002,
      2214,
      2484,
      2782,
    ],
  );
  assert.doesNotMatch(apiIndexText, /deriveCMDExportPackageDossierFingerprint\(/);
  assert.doesNotMatch(
    databaseIndexText,
    /deriveCMDExportPackageDossierFingerprint\(/,
  );

  assert.match(
    canonicalJsonFreezeTestText,
    /Shared Governance Canonical-JSON Helper Seam Freeze/i,
  );
  assert.match(
    profileDossierFingerprintFreezeTestText,
    /Shared Governance Profile Dossier Fingerprint Helper Seam Freeze/i,
  );
  assert.match(
    generatedAtHelperFreezeTestText,
    /Shared Governance Export Package Generated-At Helper Seam Freeze/i,
  );
  assert.match(
    manifestHelperFreezeTestText,
    /Shared Governance Export Package Manifest Helper Seam Freeze/i,
  );
  assert.match(
    canonicalSourceHelperFreezeTestText,
    /Shared Governance Export Package CMD Canonical-Source Helper Seam Freeze/i,
  );
  assert.match(
    derivationHelperFreezeTestText,
    /deriveCMDExportPackageDossierFingerprint\\\(canonicalProfileDossierSnapshot\\\)/,
  );
  assert.match(
    snapshotStatusHelperFreezeTestText,
    /deriveCMDExportPackageDossierFingerprint\\\(currentProfileDossierSnapshot\\\)/,
  );
});
