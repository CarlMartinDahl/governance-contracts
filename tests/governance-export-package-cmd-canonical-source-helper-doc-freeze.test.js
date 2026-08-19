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
const manifestHelperFreezeTestText = fs.readFileSync(
  path.join(
    __dirname,
    "governance-export-package-manifest-helper-doc-freeze.test.js",
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
const releaseEvalDerivationFreezeTestText = fs.readFileSync(
  path.join(
    __dirname,
    "governance-export-package-release-eval-derivation-helper-doc-freeze.test.js",
  ),
  "utf8",
);
const canonicalJsonFreezeTestText = fs.readFileSync(
  path.join(__dirname, "governance-canonical-json-helper-doc-freeze.test.js"),
  "utf8",
);

function collectLineMatches(text, pattern) {
  return text
    .split("\n")
    .map((line, index) => ({ line, lineNumber: index + 1 }))
    .filter(({ line }) => pattern.test(line))
    .map(({ lineNumber }) => lineNumber);
}

test("docs freeze the shared governance export-package CMD canonical-source helper seam as the CMD canonical_source construction boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared Governance Export Package CMD Canonical-Source Helper Seam Freeze[\s\S]*?(?=\n### )/,
  );
  const helperStart = governanceIndexText.indexOf(
    "function deriveCMDExportPackageCanonicalSource(",
  );
  const helperEnd = governanceIndexText.indexOf(
    "\nfunction deriveCMDExportPackageFromProfileDossierSnapshot(",
    helperStart,
  );
  const helperText = governanceIndexText.slice(helperStart, helperEnd);
  const exportSlice = governanceIndexText.slice(
    governanceIndexText.indexOf("module.exports = {"),
  );

  assert.ok(docsSectionMatch, "expected CMD canonical-source helper docs section");
  assert.notEqual(helperStart, -1, "expected CMD canonical-source helper start");
  assert.notEqual(helperEnd, -1, "expected CMD canonical-source helper end");

  const docsSection = docsSectionMatch[0];

  assert.match(
    docsSection,
    /Shared Governance Export Package CMD Canonical-Source Helper Seam Freeze/i,
  );
  assert.match(
    docsSection,
    /export-package CMD canonical-source helper `deriveCMDExportPackageCanonicalSource` is the canonical internal governance-side helper boundary for constructing the canonical `canonical_source` object used by CMD export-package derivation before the profile-specific derivation helper writes it into canonical export-package payloads/i,
  );
  assert.match(
    docsSection,
    /currently evidenced governed surface in this freeze is limited to:\s+`export_package\.canonical_source` construction for `"CMD_PROFILE"` export-package derivation from a profile-dossier snapshot/i,
  );
  assert.match(
    docsSection,
    /currently concrete helper responsibilities already evidenced for this seam are limited to:\s+resolving `release_eval_run_id` from `options\.release_eval_run_id \?\? options\.canonical_source\?\.release_eval_run_id`\s+resolving `evaluator_version` from `options\.evaluator_version \?\? options\.canonical_source\?\.evaluator_version`\s+resolving `jurisdiction_profile_key` from `options\.jurisdiction_profile_key \?\? options\.canonical_source\?\.jurisdiction_profile_key \?\? cmdProfileKey`\s+resolving `persisted_at` from `options\.persisted_at \?\? options\.canonical_source\?\.persisted_at`\s+throwing `createGovernanceError\("ERR_EXPORT_PACKAGE_INVALID", \\`canonical_source\.\$\{field\} must be a non-empty string\\`, \{ field: \\`canonical_source\.\$\{field\}\\` \}\)` when `release_eval_run_id`, `evaluator_version`, or `persisted_at` is absent, non-string, or empty\s+throwing `createGovernanceError\("ERR_UNSUPPORTED_JURISDICTION_PROFILE", "jurisdiction_profile_key is not supported", \{ jurisdiction_profile_key: jurisdictionProfileKey \}\)` when the resolved jurisdiction profile key is not `"CMD_PROFILE"`\s+returning exactly `release_eval_run_id`, `evaluator_version`, `jurisdiction_profile_key: cmdProfileKey`, and `persisted_at` for the canonical CMD `canonical_source` payload without owning the rest of export-package payload assembly/i,
  );
  assert.match(
    docsSection,
    /relationship to the export-package derivation-from-profile-dossier-snapshot helper seam is limited to `deriveCMDExportPackageFromProfileDossierSnapshot\(\.\.\.\)` calling `deriveCMDExportPackageCanonicalSource\(options\)` for its canonical `canonical_source` field/i,
  );
  assert.match(
    docsSection,
    /relationship to the export-package release-eval derivation helper seam is limited to `deriveCMDExportPackage\(\.\.\.\)` forwarding `release_eval_run_id`, `evaluator_version`, and `jurisdiction_profile_key` through the `options` payload/i,
  );
  assert.match(
    docsSection,
    /current bounded reuse already evidenced in `packages\/governance\/src\/index\.js` is limited to one unexported helper definition, one profile-specific export-package derivation-from-profile-dossier-snapshot call site, and no current named module export surface for this helper/i,
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
    /already-closed export-package derivation-from-profile-dossier-snapshot seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /shared governance `createGovernanceError` helper seam remains outside this helper seam because machine-readable governance error construction is a separate frozen boundary/i,
  );
  assert.match(
    docsSection,
    /shared governance `toCanonicalJson` helper seam remains outside this helper seam because canonical JSON serialization is a separate frozen boundary/i,
  );
  assert.match(
    docsSection,
    /export-package adapter-dispatch, projection, snapshot-status\/currentness, artifact derivation\/projection, bundle-manifest, bundle-archive, stored-ZIP, content\/escaping, profile-dossier, schema validation, route\/API behavior, parser\/auth\/response-helper behavior, database persistence\/read\/refresh behavior, and broader governance\/runtime behavior remain outside this seam/i,
  );
  assert.match(
    docsSection,
    /does not change runtime behavior, canonical-source semantics, derivation semantics, projection semantics, persistence semantics, API behavior, schema behavior, or fail-closed behavior/i,
  );

  assert.match(
    helperText,
    /function deriveCMDExportPackageCanonicalSource\(options = \{\}\) \{/,
  );
  assert.match(
    helperText,
    /const releaseEvalRunId =\s*options\.release_eval_run_id \?\? options\.canonical_source\?\.release_eval_run_id;/,
  );
  assert.match(
    helperText,
    /const evaluatorVersion =\s*options\.evaluator_version \?\? options\.canonical_source\?\.evaluator_version;/,
  );
  assert.match(
    helperText,
    /const jurisdictionProfileKey =\s*options\.jurisdiction_profile_key \?\?\s*options\.canonical_source\?\.jurisdiction_profile_key \?\?\s*cmdProfileKey;/,
  );
  assert.match(
    helperText,
    /const persistedAt =\s*options\.persisted_at \?\? options\.canonical_source\?\.persisted_at;/,
  );
  assert.match(
    helperText,
    /for \(const \[field, value\] of \[\s*\["release_eval_run_id", releaseEvalRunId\],\s*\["evaluator_version", evaluatorVersion\],\s*\["persisted_at", persistedAt\],\s*\]\) \{/,
  );
  assert.match(
    helperText,
    /throw createGovernanceError\(\s*"ERR_EXPORT_PACKAGE_INVALID",\s*`canonical_source\.\$\{field\} must be a non-empty string`,\s*\{ field: `canonical_source\.\$\{field\}` \},\s*\);/,
  );
  assert.match(
    helperText,
    /if \(jurisdictionProfileKey !== cmdProfileKey\) \{\s*throw createGovernanceError\(\s*"ERR_UNSUPPORTED_JURISDICTION_PROFILE",\s*"jurisdiction_profile_key is not supported",\s*\{\s*jurisdiction_profile_key: jurisdictionProfileKey,\s*\},\s*\);\s*\}/,
  );
  assert.match(
    helperText,
    /return \{\s*release_eval_run_id: releaseEvalRunId,\s*evaluator_version: evaluatorVersion,\s*jurisdiction_profile_key: cmdProfileKey,\s*persisted_at: persistedAt,\s*\};/,
  );
  assert.match(
    governanceIndexText,
    /function deriveCMDExportPackageFromProfileDossierSnapshot\([\s\S]*canonical_source: deriveCMDExportPackageCanonicalSource\(options\),[\s\S]*generated_at: resolveSWEBodelningExportPackageGeneratedAt\(options\),[\s\S]*manifest: deriveCMDExportPackageManifest\(\),/,
  );
  assert.match(
    governanceIndexText,
    /function deriveCMDExportPackage\(\s*releaseEvalRun,\s*options = \{\}\s*\)[\s\S]*return deriveCMDExportPackageFromProfileDossierSnapshot\(\s*resolveCMDProfileDossierSnapshot\(releaseEvalRun, options\),\s*\{\s*\.\.\.options,\s*release_eval_run_id: canonicalReleaseEvalRun\.release_eval_run_id,\s*evaluator_version: canonicalReleaseEvalRun\.evaluator_version,\s*jurisdiction_profile_key: canonicalReleaseEvalRun\.jurisdiction_profile_key,\s*\},\s*\);/,
  );
  assert.doesNotMatch(
    exportSlice,
    /^\s*deriveCMDExportPackageCanonicalSource,\s*$/m,
  );

  assert.deepEqual(
    collectLineMatches(
      governanceIndexText,
      /\bderiveCMDExportPackageCanonicalSource\b/,
    ),
    [
      1703,
      1763,
    ],
  );
  assert.doesNotMatch(apiIndexText, /deriveCMDExportPackageCanonicalSource\(/);
  assert.doesNotMatch(
    databaseIndexText,
    /deriveCMDExportPackageCanonicalSource\(/,
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
    derivationHelperFreezeTestText,
    /Shared Governance Export Package Derivation Helper Seam Freeze/i,
  );
  assert.match(
    derivationHelperFreezeTestText,
    /deriveCMDExportPackageCanonicalSource\\\(options\\\)/,
  );
  assert.match(
    releaseEvalDerivationFreezeTestText,
    /Shared Governance Export Package Release-Eval Derivation Helper Seam Freeze/i,
  );
  assert.match(
    canonicalJsonFreezeTestText,
    /Shared Governance Canonical-JSON Helper Seam Freeze/i,
  );
});
