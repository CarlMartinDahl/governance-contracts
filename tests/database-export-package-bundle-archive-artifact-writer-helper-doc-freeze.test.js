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
const bundleArchivePersistenceTestText = fs.readFileSync(
  path.join(__dirname, "export-package-bundle-archive-artifact-persistence.test.js"),
  "utf8",
);
const bundleArchiveRefreshTestText = fs.readFileSync(
  path.join(__dirname, "export-package-bundle-archive-artifact-refresh.test.js"),
  "utf8",
);
const bundleArchiveValidatorDispatchTestText = fs.readFileSync(
  path.join(__dirname, "export-package-bundle-archive-artifact-validator-dispatch.test.js"),
  "utf8",
);

function collectLineMatches(text, pattern) {
  const linePattern = new RegExp(pattern.source, pattern.flags.replaceAll("g", ""));
  return text.split("\n").flatMap((line, index) => (
    linePattern.test(line) ? [index + 1] : []
  ));
}

test("docs freeze the shared database export-package bundle/archive artifact writer helper seam as the persisted writer boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared Database Export-Package Bundle Archive Artifact Writer Helper Seam Freeze[\s\S]*?(?=\n### )/,
  );
  const writerStart = databaseIndexText.indexOf(
    "async function persistCaseExportPackageBundleArchiveArtifactSnapshot(",
  );
  const writerEnd = databaseIndexText.indexOf(
    "async function persistCaseExportPackageBundleManifestSnapshot(",
    writerStart,
  );
  const refreshStart = databaseIndexText.indexOf(
    "async function refreshCaseExportPackageBundleArchiveArtifactSnapshot(",
  );
  const refreshEnd = databaseIndexText.indexOf(
    "async function refreshCaseExportPackageSnapshot(",
    refreshStart,
  );

  assert.ok(
    docsSectionMatch,
    "expected export-package bundle/archive artifact writer helper docs section",
  );
  assert.notEqual(
    writerStart,
    -1,
    "expected persistCaseExportPackageBundleArchiveArtifactSnapshot helper",
  );
  assert.notEqual(writerEnd, -1, "expected next database writer helper boundary");
  assert.notEqual(
    refreshStart,
    -1,
    "expected refreshCaseExportPackageBundleArchiveArtifactSnapshot helper",
  );
  assert.notEqual(refreshEnd, -1, "expected next refresh helper boundary");

  const docsSection = docsSectionMatch[0];
  const writerSlice = databaseIndexText.slice(writerStart, writerEnd);
  const refreshSlice = databaseIndexText.slice(refreshStart, refreshEnd);

  assert.match(
    docsSection,
    /Shared Database Export-Package Bundle Archive Artifact Writer Helper Seam Freeze/i,
  );
  assert.match(
    docsSection,
    /shared `packages\/database\/src\/index\.js` `persistCaseExportPackageBundleArchiveArtifactSnapshot` helper is the canonical persisted case-level `export_package_bundle_archive_artifact` writer boundary/i,
  );
  assert.match(
    docsSection,
    /currently evidenced included database\/runtime surfaces in this freeze are limited to:\s+`packages\/database\/src\/index\.js` export surface\s+current shared in-package refresh-helper reuse in `packages\/database\/src\/index\.js`\s+current runtime proof in `tests\/export-package-bundle-archive-artifact-persistence\.test\.js`\s+current runtime proof in `tests\/export-package-bundle-archive-artifact-refresh\.test\.js`\s+current validator-dispatch proof in `tests\/export-package-bundle-archive-artifact-validator-dispatch\.test\.js`/i,
  );
  assert.match(
    docsSection,
    /current `packages\/database` final bundle\/archive artifact write boundary already does this through the existing shared writer helper with bounded live-code reuse inside the database package and no direct route reuse/i,
  );
  assert.match(
    docsSection,
    /`persistCaseExportPackageBundleArchiveArtifactSnapshot` rejecting invalid `caseId` values through `createPersistenceError\("ERR_CASE_ID_INVALID", "caseId must be a non-empty string"\)`/i,
  );
  assert.match(
    docsSection,
    /`persistCaseExportPackageBundleArchiveArtifactSnapshot` decoding non-empty string `body_base64` values with `Buffer\.from\(exportPackageBundleArchiveArtifactSnapshot\.body_base64, "base64"\)\.toString\("utf8"\)`/i,
  );
  assert.match(
    docsSection,
    /`persistCaseExportPackageBundleArchiveArtifactSnapshot` extracting the decoded final bundle\/archive artifact `jurisdiction_profile_key` marker with the current JSON-string and text fallback match expressions/i,
  );
  assert.match(
    docsSection,
    /`persistCaseExportPackageBundleArchiveArtifactSnapshot` rejecting unsupported extracted `"CMD_PROFILE"` final bundle\/archive artifact `jurisdiction_profile_key` values through `hasJurisdictionProfileCapability\(jurisdictionProfileKeyMatch\[1\], "export_package_bundle_archive_artifact"\)` plus `createPersistenceError\("ERR_UNSUPPORTED_JURISDICTION_PROFILE", "jurisdiction_profile_key is not supported", \{ jurisdiction_profile_key: jurisdictionProfileKeyMatch\[1\] \}\)`/i,
  );
  assert.match(
    docsSection,
    /`persistCaseExportPackageBundleArchiveArtifactSnapshot` preserving the existing malformed-body handoff to `validateExportPackageBundleArchiveArtifact\(exportPackageBundleArchiveArtifactSnapshot\)` by swallowing decode\/inspection failures unless the thrown error is `ERR_UNSUPPORTED_JURISDICTION_PROFILE`/i,
  );
  assert.match(
    docsSection,
    /`persistCaseExportPackageBundleArchiveArtifactSnapshot` validating and canonicalizing the incoming snapshot through `validateExportPackageBundleArchiveArtifact\(exportPackageBundleArchiveArtifactSnapshot\)`/i,
  );
  assert.match(
    docsSection,
    /`persistCaseExportPackageBundleArchiveArtifactSnapshot` loading the final bundle\/archive artifact snapshot store through `readStore\(exportPackageBundleArchiveArtifactSnapshotsFileName, options\)`/i,
  );
  assert.match(
    docsSection,
    /`persistCaseExportPackageBundleArchiveArtifactSnapshot` reading `store\[caseId\]` as the persisted case-level final bundle\/archive artifact snapshot record list lookup and falling back to `\[\]` when no list exists/i,
  );
  assert.match(
    docsSection,
    /`persistCaseExportPackageBundleArchiveArtifactSnapshot` selecting `options\.persisted_at \?\? new Date\(\)\.toISOString\(\)` as the persisted record timestamp/i,
  );
  assert.match(
    docsSection,
    /`persistCaseExportPackageBundleArchiveArtifactSnapshot` appending the normalized persisted record through `normalizeExportPackageBundleArchiveArtifactRecord\(caseId, canonicalExportPackageBundleArchiveArtifact, persistedAt\)`/i,
  );
  assert.match(
    docsSection,
    /`persistCaseExportPackageBundleArchiveArtifactSnapshot` writing the updated store through `writeStore\(exportPackageBundleArchiveArtifactSnapshotsFileName, store, options\)`/i,
  );
  assert.match(
    docsSection,
    /current relationship to the closed parent export-package writer-helper seam is negative and separate because this final bundle\/archive artifact writer helper does not write parent `export_package` snapshots and does not call `persistCaseExportPackageSnapshot\(\.\.\.\)`/i,
  );
  assert.match(
    docsSection,
    /current relationship to the closed bundle\/package manifest writer-helper seam is negative and separate because this final bundle\/archive artifact writer helper does not write `export_package_bundle_manifest` snapshots and does not call `persistCaseExportPackageBundleManifestSnapshot\(\.\.\.\)`/i,
  );
  assert.match(
    docsSection,
    /current relationship to the broader already-frozen case-level persisted `export_package_bundle_archive_artifact` seam is limited to this helper being the narrower persisted write boundary inside that broader persistence seam, while latest-read, delivery, and refresh remain separate adjacent surfaces/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen bundle\/archive artifact snapshot-reader seam is negative and separate because this writer helper does not perform latest-read ownership and does not call `getLatestCaseExportPackageBundleArchiveArtifactSnapshot\(\.\.\.\)`/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen bundle\/archive artifact projection-helper seam is negative and separate because this writer helper does not perform projection\/currentness ownership and does not call `getLatestCaseExportPackageBundleArchiveArtifactProjection\(\.\.\.\)`/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen bundle\/archive artifact refresh-helper seam is limited to `refreshCaseExportPackageBundleArchiveArtifactSnapshot` delegating final persisted write ownership through `persistCaseExportPackageBundleArchiveArtifactSnapshot\(caseId, canonicalExportPackageBundleArchiveArtifact, options\)`/i,
  );
  assert.match(
    docsSection,
    /current relationship to the shared schema-side final bundle\/archive artifact validator seam is limited to `persistCaseExportPackageBundleArchiveArtifactSnapshot` delegating validation\/canonicalization through `validateExportPackageBundleArchiveArtifact\(exportPackageBundleArchiveArtifactSnapshot\)`/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen record-normalization seam is limited to `persistCaseExportPackageBundleArchiveArtifactSnapshot` delegating persisted record shaping through `normalizeExportPackageBundleArchiveArtifactRecord\(caseId, canonicalExportPackageBundleArchiveArtifact, persistedAt\)`/i,
  );
  assert.match(
    docsSection,
    /current bounded live-code reuse already evidenced in `packages\/database\/src\/index\.js` is limited to:\s+`persistCaseExportPackageBundleArchiveArtifactSnapshot` being reused by `refreshCaseExportPackageBundleArchiveArtifactSnapshot`\s+`persistCaseExportPackageBundleArchiveArtifactSnapshot` being exposed from `packages\/database\/src\/index\.js`/i,
  );
  assert.match(
    docsSection,
    /no current direct runtime reuse is evidenced in `apps\/api\/src\/index\.js`/i,
  );
  assert.match(
    docsSection,
    /current bounded runtime\/test surface already evidenced in `packages\/database\/src\/index\.js`, `tests\/export-package-bundle-archive-artifact-persistence\.test\.js`, `tests\/export-package-bundle-archive-artifact-refresh\.test\.js`, and `tests\/export-package-bundle-archive-artifact-validator-dispatch\.test\.js` is limited to 1 shared final bundle\/archive artifact writer-helper definition, 1 higher database final bundle\/archive artifact refresh caller, 1 database export surface, 1 invalid-`caseId` persistence error branch, 1 decoded-body unsupported-profile persistence error branch, 1 shared validation\/canonicalization step, 1 store read, 1 normalized-record append, 1 store write, 1 canonical `export_package_bundle_archive_artifact` return surface, and current runtime proof across the existing final bundle\/archive artifact persistence\/refresh\/validator-dispatch tests/i,
  );
  assert.match(
    docsSection,
    /closed parent export-package writer-helper seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /closed bundle\/package manifest writer-helper seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /closed JSON, Markdown, PDF, and DOCX artifact writer-helper seams remain outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /already-frozen broader case-level persisted `export_package_bundle_archive_artifact` seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /already-frozen bundle\/archive artifact snapshot-reader seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /already-frozen bundle\/archive artifact projection-helper seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /already-frozen bundle\/archive artifact refresh-helper seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /thin authenticated `GET \/cases\/:caseId\/export-package\/bundle-archive-artifact\/latest`, `GET \/cases\/:caseId\/export-package\/bundle-archive-artifact\/download`, and `POST \/cases\/:caseId\/export-package\/bundle-archive-artifact\/refresh` route seams remain outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /shared governance final bundle\/archive derivation, adapter-dispatch, and projection helper seams remain outside this helper seam/i,
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
    /future database helpers that need the same persisted final bundle\/archive artifact write behavior should extend the existing `persistCaseExportPackageBundleArchiveArtifactSnapshot` seam instead of introducing a parallel final bundle\/archive artifact writer stack/i,
  );
  assert.match(
    docsSection,
    /does not change runtime behavior, persistence semantics, filesystem behavior, API behavior, or fail-closed behavior/i,
  );

  assert.match(
    writerSlice,
    /async function persistCaseExportPackageBundleArchiveArtifactSnapshot\(\s*caseId,\s*exportPackageBundleArchiveArtifactSnapshot,\s*options = \{\},?\s*\)\s*\{/,
  );
  assert.match(
    writerSlice,
    /if \(!caseId \|\| typeof caseId !== "string"\) \{\s*throw createPersistenceError\("ERR_CASE_ID_INVALID", "caseId must be a non-empty string"\);\s*\}/s,
  );
  assert.match(
    writerSlice,
    /Buffer\.from\(\s*exportPackageBundleArchiveArtifactSnapshot\.body_base64,\s*"base64",\s*\)\.toString\("utf8"\);/s,
  );
  assert.match(
    writerSlice,
    /decodedBody\.match\(\/"jurisdiction_profile_key":"\(\[\^"\]\+\)"\/\)/,
  );
  assert.ok(
    writerSlice.includes(
      "decodedBody.match(/jurisdiction_profile_key:\\s+([A-Z_<>\\.]+)/);",
    ),
  );
  assert.match(
    writerSlice,
    /jurisdictionProfileKeyMatch\?\.\[1\] === "CMD_PROFILE" &&\s*!hasJurisdictionProfileCapability\(\s*jurisdictionProfileKeyMatch\[1\],\s*"export_package_bundle_archive_artifact",\s*\)/s,
  );
  assert.match(
    writerSlice,
    /throw createPersistenceError\(\s*"ERR_UNSUPPORTED_JURISDICTION_PROFILE",\s*"jurisdiction_profile_key is not supported",[\s\S]*jurisdiction_profile_key: jurisdictionProfileKeyMatch\[1\],[\s\S]*\);/,
  );
  assert.match(
    writerSlice,
    /if \(error\?\.code === "ERR_UNSUPPORTED_JURISDICTION_PROFILE"\) \{\s*throw error;\s*\}/s,
  );
  assert.match(
    writerSlice,
    /const canonicalExportPackageBundleArchiveArtifact =\s*validateExportPackageBundleArchiveArtifact\(\s*exportPackageBundleArchiveArtifactSnapshot,\s*\);/s,
  );
  assert.match(
    writerSlice,
    /const store = await readStore\(exportPackageBundleArchiveArtifactSnapshotsFileName, options\);/,
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
    /caseSnapshots\.push\(\s*normalizeExportPackageBundleArchiveArtifactRecord\(\s*caseId,\s*canonicalExportPackageBundleArchiveArtifact,\s*persistedAt,\s*\),\s*\);/s,
  );
  assert.match(writerSlice, /store\[caseId\] = caseSnapshots;/);
  assert.match(
    writerSlice,
    /await writeStore\(exportPackageBundleArchiveArtifactSnapshotsFileName, store, options\);/,
  );
  assert.match(writerSlice, /return canonicalExportPackageBundleArchiveArtifact;/);
  assert.match(
    refreshSlice,
    /return persistCaseExportPackageBundleArchiveArtifactSnapshot\(\s*caseId,\s*canonicalExportPackageBundleArchiveArtifact,\s*options,\s*\);/s,
  );

  assert.deepEqual(
    collectLineMatches(
      databaseIndexText,
      /persistCaseExportPackageBundleArchiveArtifactSnapshot/,
    ),
    [862, 1477, 1583],
  );
  assert.deepEqual(
    collectLineMatches(
      databaseIndexText,
      /^\s*persistCaseExportPackageBundleArchiveArtifactSnapshot,\s*$/,
    ),
    [1583],
  );
  assert.deepEqual(
    collectLineMatches(
      apiIndexText,
      /persistCaseExportPackageBundleArchiveArtifactSnapshot/,
    ),
    [],
  );

  assert.doesNotMatch(writerSlice, /getLatestCaseExportPackageBundleArchiveArtifactSnapshot\(/);
  assert.doesNotMatch(writerSlice, /getLatestCaseExportPackageBundleArchiveArtifactProjection\(/);
  assert.doesNotMatch(writerSlice, /refreshCaseExportPackageBundleArchiveArtifactSnapshot\(/);
  assert.doesNotMatch(writerSlice, /persistCaseExportPackageSnapshot\(/);
  assert.doesNotMatch(writerSlice, /persistCaseExportPackageBundleManifestSnapshot\(/);
  assert.doesNotMatch(writerSlice, /persistCaseExportPackageJsonArtifactSnapshot\(/);
  assert.doesNotMatch(writerSlice, /persistCaseExportPackageMarkdownArtifactSnapshot\(/);
  assert.doesNotMatch(writerSlice, /persistCaseExportPackagePdfArtifactSnapshot\(/);
  assert.doesNotMatch(writerSlice, /persistCaseExportPackageDocxArtifactSnapshot\(/);
  assert.doesNotMatch(writerSlice, /handleCaseExportPackageBundleArchiveArtifact/);
  assert.doesNotMatch(writerSlice, /deriveExportPackageBundleArchiveArtifact\(/);
  assert.doesNotMatch(writerSlice, /resolveExportPackageBundleArchiveArtifactProjection\(/);

  assert.match(
    bundleArchivePersistenceTestText,
    /persistCaseExportPackageBundleArchiveArtifactSnapshot/,
  );
  assert.match(
    bundleArchiveRefreshTestText,
    /refreshCaseExportPackageBundleArchiveArtifactSnapshot/,
  );
  assert.match(
    bundleArchiveValidatorDispatchTestText,
    /persistCaseExportPackageBundleArchiveArtifactSnapshot/,
  );
});
