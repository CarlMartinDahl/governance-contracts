const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const docsText = fs.readFileSync(
  path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md"),
  "utf8",
);
const databaseIndexText = fs.readFileSync(
  path.join(__dirname, "..", "packages", "database", "src", "index.js"),
  "utf8",
);
const apiIndexText = fs.readFileSync(
  path.join(__dirname, "..", "apps", "api", "src", "index.js"),
  "utf8",
);
const bundleManifestPersistenceTestText = fs.readFileSync(
  path.join(__dirname, "export-package-bundle-manifest-persistence.test.js"),
  "utf8",
);
const bundleManifestRefreshTestText = fs.readFileSync(
  path.join(__dirname, "export-package-bundle-manifest-refresh.test.js"),
  "utf8",
);
const bundleManifestValidatorDispatchTestText = fs.readFileSync(
  path.join(__dirname, "export-package-bundle-manifest-validator-dispatch.test.js"),
  "utf8",
);

function collectLineMatches(text, pattern) {
  const linePattern = new RegExp(pattern.source, pattern.flags.replaceAll("g", ""));
  return text.split("\n").flatMap((line, index) => (
    linePattern.test(line) ? [index + 1] : []
  ));
}

test("docs freeze the shared database export-package bundle/package manifest writer helper seam as the persisted writer boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared Database Export-Package Bundle Manifest Writer Helper Seam Freeze[\s\S]*?(?=\n### )/,
  );
  const writerStart = databaseIndexText.indexOf(
    "async function persistCaseExportPackageBundleManifestSnapshot(",
  );
  const writerEnd = databaseIndexText.indexOf(
    "async function persistCaseExportPackageJsonArtifactSnapshot(",
    writerStart,
  );
  const refreshStart = databaseIndexText.indexOf(
    "async function refreshCaseExportPackageBundleManifestSnapshot(",
  );
  const refreshEnd = databaseIndexText.indexOf(
    "async function refreshCaseExportPackageBundleArchiveArtifactSnapshot(",
    refreshStart,
  );

  assert.ok(
    docsSectionMatch,
    "expected export-package bundle manifest writer helper docs section",
  );
  assert.notEqual(
    writerStart,
    -1,
    "expected persistCaseExportPackageBundleManifestSnapshot helper",
  );
  assert.notEqual(writerEnd, -1, "expected next database writer helper boundary");
  assert.notEqual(
    refreshStart,
    -1,
    "expected refreshCaseExportPackageBundleManifestSnapshot helper",
  );
  assert.notEqual(refreshEnd, -1, "expected next refresh helper boundary");

  const docsSection = docsSectionMatch[0];
  const writerSlice = databaseIndexText.slice(writerStart, writerEnd);
  const refreshSlice = databaseIndexText.slice(refreshStart, refreshEnd);

  assert.match(
    docsSection,
    /Shared Database Export-Package Bundle Manifest Writer Helper Seam Freeze/i,
  );
  assert.match(
    docsSection,
    /shared `packages\/database\/src\/index\.js` `persistCaseExportPackageBundleManifestSnapshot` helper is the canonical persisted case-level `export_package_bundle_manifest` writer boundary/i,
  );
  assert.match(
    docsSection,
    /currently evidenced included database\/runtime surfaces in this freeze are limited to:\s+`packages\/database\/src\/index\.js` export surface\s+current shared in-package refresh-helper reuse in `packages\/database\/src\/index\.js`\s+current runtime proof in `tests\/export-package-bundle-manifest-persistence\.test\.js`\s+current runtime proof in `tests\/export-package-bundle-manifest-refresh\.test\.js`\s+current validator-dispatch proof in `tests\/export-package-bundle-manifest-validator-dispatch\.test\.js`/i,
  );
  assert.match(
    docsSection,
    /current `packages\/database` bundle\/package manifest write boundary already does this through the existing shared writer helper with bounded live-code reuse inside the database package and no direct route reuse/i,
  );
  assert.match(
    docsSection,
    /`persistCaseExportPackageBundleManifestSnapshot` rejecting invalid `caseId` values through `createPersistenceError\("ERR_CASE_ID_INVALID", "caseId must be a non-empty string"\)`/i,
  );
  assert.match(
    docsSection,
    /`persistCaseExportPackageBundleManifestSnapshot` rejecting unsupported `jurisdiction_profile_key` values through `hasJurisdictionProfileCapability\(exportPackageBundleManifestSnapshot\.jurisdiction_profile_key, "export_package_bundle_manifest"\)` plus `createPersistenceError\("ERR_UNSUPPORTED_JURISDICTION_PROFILE", "jurisdiction_profile_key is not supported", \{ jurisdiction_profile_key: exportPackageBundleManifestSnapshot\.jurisdiction_profile_key \}\)`/i,
  );
  assert.match(
    docsSection,
    /`persistCaseExportPackageBundleManifestSnapshot` validating and canonicalizing the incoming snapshot through `validateExportPackageBundleManifest\(exportPackageBundleManifestSnapshot\)`/i,
  );
  assert.match(
    docsSection,
    /`persistCaseExportPackageBundleManifestSnapshot` loading the bundle\/package manifest snapshot store through `readStore\(exportPackageBundleManifestSnapshotsFileName, options\)`/i,
  );
  assert.match(
    docsSection,
    /`persistCaseExportPackageBundleManifestSnapshot` reading `store\[caseId\]` as the persisted case-level bundle\/package manifest snapshot record list lookup and falling back to `\[\]` when no list exists/i,
  );
  assert.match(
    docsSection,
    /`persistCaseExportPackageBundleManifestSnapshot` selecting `options\.persisted_at \?\? new Date\(\)\.toISOString\(\)` as the persisted record timestamp/i,
  );
  assert.match(
    docsSection,
    /`persistCaseExportPackageBundleManifestSnapshot` appending the normalized persisted record through `normalizeExportPackageBundleManifestRecord\(caseId, canonicalExportPackageBundleManifest, persistedAt\)`/i,
  );
  assert.match(
    docsSection,
    /`persistCaseExportPackageBundleManifestSnapshot` assigning the updated case snapshot list back to `store\[caseId\]`/i,
  );
  assert.match(
    docsSection,
    /`persistCaseExportPackageBundleManifestSnapshot` writing the updated store through `writeStore\(exportPackageBundleManifestSnapshotsFileName, store, options\)`/i,
  );
  assert.match(
    docsSection,
    /`persistCaseExportPackageBundleManifestSnapshot` returning the canonical `export_package_bundle_manifest` produced by `validateExportPackageBundleManifest\(exportPackageBundleManifestSnapshot\)`/i,
  );
  assert.match(
    docsSection,
    /current relationship to the closed parent export-package writer-helper seam is negative and separate because this bundle\/package manifest writer helper does not write parent `export_package` snapshots and does not call `persistCaseExportPackageSnapshot\(\.\.\.\)`/i,
  );
  assert.match(
    docsSection,
    /current relationship to the closed JSON artifact writer-helper seam is negative and separate because this bundle\/package manifest writer helper does not write `export_package_json_artifact` snapshots and does not call `persistCaseExportPackageJsonArtifactSnapshot\(\.\.\.\)`/i,
  );
  assert.match(
    docsSection,
    /current relationship to the closed Markdown artifact writer-helper seam is negative and separate because this bundle\/package manifest writer helper does not write `export_package_markdown_artifact` snapshots and does not call `persistCaseExportPackageMarkdownArtifactSnapshot\(\.\.\.\)`/i,
  );
  assert.match(
    docsSection,
    /current relationship to the closed PDF artifact writer-helper seam is negative and separate because this bundle\/package manifest writer helper does not write `export_package_pdf_artifact` snapshots and does not call `persistCaseExportPackagePdfArtifactSnapshot\(\.\.\.\)`/i,
  );
  assert.match(
    docsSection,
    /current relationship to the closed DOCX artifact writer-helper seam is negative and separate because this bundle\/package manifest writer helper does not write `export_package_docx_artifact` snapshots and does not call `persistCaseExportPackageDocxArtifactSnapshot\(\.\.\.\)`/i,
  );
  assert.match(
    docsSection,
    /current relationship to the broader already-frozen case-level persisted `export_package_bundle_manifest` seam is limited to this helper being the narrower persisted write boundary inside that broader persistence seam, while latest-read and refresh remain separate adjacent surfaces/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen bundle\/package manifest snapshot-reader seam is negative and separate because this writer helper does not perform latest-read ownership and does not call `getLatestCaseExportPackageBundleManifestSnapshot\(\.\.\.\)`/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen bundle\/package manifest projection-helper seam is negative and separate because this writer helper does not perform projection\/currentness ownership and does not call `getLatestCaseExportPackageBundleManifestProjection\(\.\.\.\)`/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen bundle\/package manifest refresh-helper seam is limited to `refreshCaseExportPackageBundleManifestSnapshot` delegating final persisted write ownership through `persistCaseExportPackageBundleManifestSnapshot\(caseId, canonicalExportPackageBundleManifest, options\)`/i,
  );
  assert.match(
    docsSection,
    /current relationship to the shared schema-side bundle\/package manifest validator seam is limited to `persistCaseExportPackageBundleManifestSnapshot` delegating validation\/canonicalization through `validateExportPackageBundleManifest\(exportPackageBundleManifestSnapshot\)`/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen record-normalization seam is limited to `persistCaseExportPackageBundleManifestSnapshot` delegating persisted record shaping through `normalizeExportPackageBundleManifestRecord\(caseId, canonicalExportPackageBundleManifest, persistedAt\)`/i,
  );
  assert.match(
    docsSection,
    /current bounded live-code reuse already evidenced in `packages\/database\/src\/index\.js` is limited to:\s+`persistCaseExportPackageBundleManifestSnapshot` being reused by `refreshCaseExportPackageBundleManifestSnapshot`\s+`persistCaseExportPackageBundleManifestSnapshot` being exposed from `packages\/database\/src\/index\.js`/i,
  );
  assert.match(
    docsSection,
    /no current direct runtime reuse is evidenced in `apps\/api\/src\/index\.js`/i,
  );
  assert.match(
    docsSection,
    /current bounded runtime\/test surface already evidenced in `packages\/database\/src\/index\.js`, `tests\/export-package-bundle-manifest-persistence\.test\.js`, `tests\/export-package-bundle-manifest-refresh\.test\.js`, and `tests\/export-package-bundle-manifest-validator-dispatch\.test\.js` is limited to 1 shared bundle\/package manifest writer-helper definition, 1 higher database bundle\/package manifest refresh caller, 1 database export surface, 1 invalid-`caseId` persistence error branch, 1 profile-capability unsupported-profile persistence error branch, 1 shared validation\/canonicalization step, 1 store read, 1 normalized-record append, 1 store write, 1 canonical `export_package_bundle_manifest` return surface, and current runtime proof across the existing bundle\/package manifest persistence\/refresh\/validator-dispatch tests/i,
  );
  assert.match(
    docsSection,
    /closed parent export-package writer-helper seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /closed JSON, Markdown, PDF, and DOCX artifact writer-helper seams remain outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /already-frozen broader case-level persisted `export_package_bundle_manifest` seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /already-frozen bundle\/package manifest snapshot-reader seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /already-frozen bundle\/package manifest projection-helper seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /already-frozen bundle\/package manifest refresh-helper seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /thin authenticated `GET \/cases\/:caseId\/export-package\/bundle-manifest\/latest` and `POST \/cases\/:caseId\/export-package\/bundle-manifest\/refresh` route seams remain outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /sibling artifact reader\/projection\/refresh\/writer helper families and final bundle\/archive helper families remain outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /shared governance bundle\/package manifest derivation, adapter-dispatch, and projection helper seams remain outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /shared `createPersistenceError` helper seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /shared `resolveStoragePath` \/ `readStore` \/ `writeStore` storage-helper seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /shared `normalizeRecord` \/ `normalizeReleaseEvalRecord` \/ `normalizeExportPackage\*Record` normalization seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /future database helpers that need the same persisted bundle\/package manifest write behavior should extend the existing `persistCaseExportPackageBundleManifestSnapshot` seam instead of introducing a parallel bundle\/package manifest writer stack/i,
  );
  assert.match(
    docsSection,
    /does not change runtime behavior, persistence semantics, filesystem behavior, API behavior, or fail-closed behavior/i,
  );

  assert.match(
    writerSlice,
    /async function persistCaseExportPackageBundleManifestSnapshot\(\s*caseId,\s*exportPackageBundleManifestSnapshot,\s*options = \{\},?\s*\)\s*\{/,
  );
  assert.match(
    writerSlice,
    /if \(!caseId \|\| typeof caseId !== "string"\) \{\s*throw createPersistenceError\("ERR_CASE_ID_INVALID", "caseId must be a non-empty string"\);\s*\}/s,
  );
  assert.match(
    writerSlice,
    /typeof exportPackageBundleManifestSnapshot\?\.jurisdiction_profile_key === "string" &&\s*!hasJurisdictionProfileCapability\(\s*exportPackageBundleManifestSnapshot\.jurisdiction_profile_key,\s*"export_package_bundle_manifest",\s*\)/s,
  );
  assert.match(
    writerSlice,
    /throw createPersistenceError\(\s*"ERR_UNSUPPORTED_JURISDICTION_PROFILE",\s*"jurisdiction_profile_key is not supported",[\s\S]*jurisdiction_profile_key: exportPackageBundleManifestSnapshot\.jurisdiction_profile_key,[\s\S]*\);/,
  );
  assert.match(
    writerSlice,
    /const canonicalExportPackageBundleManifest =\s*validateExportPackageBundleManifest\(exportPackageBundleManifestSnapshot\);/s,
  );
  assert.match(
    writerSlice,
    /const store = await readStore\(exportPackageBundleManifestSnapshotsFileName, options\);/,
  );
  assert.match(
    writerSlice,
    /const caseSnapshots = Array\.isArray\(store\[caseId\]\) \? store\[caseId\] : \[\];/,
  );
  assert.match(
    writerSlice,
    /const persistedAt = options\.persisted_at \?\? new Date\(\)\.toISOString\(\);/,
  );
  assert.match(
    writerSlice,
    /caseSnapshots\.push\(\s*normalizeExportPackageBundleManifestRecord\(\s*caseId,\s*canonicalExportPackageBundleManifest,\s*persistedAt,\s*\),\s*\);/s,
  );
  assert.match(writerSlice, /store\[caseId\] = caseSnapshots;/);
  assert.match(
    writerSlice,
    /await writeStore\(exportPackageBundleManifestSnapshotsFileName, store, options\);/,
  );
  assert.match(writerSlice, /return canonicalExportPackageBundleManifest;/);

  assert.match(
    refreshSlice,
    /return persistCaseExportPackageBundleManifestSnapshot\(\s*caseId,\s*canonicalExportPackageBundleManifest,\s*options,\s*\);/s,
  );
  assert.deepEqual(
    collectLineMatches(
      databaseIndexText,
      /persistCaseExportPackageBundleManifestSnapshot/,
    ),
    [928, 1394, 1584],
  );
  assert.deepEqual(
    collectLineMatches(
      databaseIndexText,
      /^\s*persistCaseExportPackageBundleManifestSnapshot,\s*$/,
    ),
    [1584],
  );
  assert.deepEqual(
    collectLineMatches(
      apiIndexText,
      /persistCaseExportPackageBundleManifestSnapshot/,
    ),
    [],
  );

  assert.doesNotMatch(writerSlice, /getLatestCaseExportPackageBundleManifestSnapshot\(/);
  assert.doesNotMatch(writerSlice, /getLatestCaseExportPackageBundleManifestProjection\(/);
  assert.doesNotMatch(writerSlice, /refreshCaseExportPackageBundleManifestSnapshot\(/);
  assert.doesNotMatch(writerSlice, /persistCaseExportPackageSnapshot\(/);
  assert.doesNotMatch(writerSlice, /persistCaseExportPackageJsonArtifactSnapshot\(/);
  assert.doesNotMatch(writerSlice, /persistCaseExportPackageMarkdownArtifactSnapshot\(/);
  assert.doesNotMatch(writerSlice, /persistCaseExportPackagePdfArtifactSnapshot\(/);
  assert.doesNotMatch(writerSlice, /persistCaseExportPackageDocxArtifactSnapshot\(/);
  assert.doesNotMatch(writerSlice, /handleCaseExportPackageBundleManifest/);
  assert.doesNotMatch(writerSlice, /deriveExportPackageBundleManifest\(/);
  assert.doesNotMatch(writerSlice, /resolveExportPackageBundleManifestProjection\(/);

  assert.match(
    bundleManifestPersistenceTestText,
    /persistCaseExportPackageBundleManifestSnapshot/,
  );
  assert.match(
    bundleManifestRefreshTestText,
    /refreshCaseExportPackageBundleManifestSnapshot/,
  );
  assert.match(
    bundleManifestValidatorDispatchTestText,
    /persistCaseExportPackageBundleManifestSnapshot/,
  );
});
