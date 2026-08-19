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
const bundleArchiveRefreshTestText = fs.readFileSync(
  path.join(__dirname, "export-package-bundle-archive-artifact-refresh.test.js"),
  "utf8",
);
const bundleArchiveRefreshApiTestText = fs.readFileSync(
  path.join(__dirname, "export-package-bundle-archive-artifact-refresh-api.test.js"),
  "utf8",
);

function collectLineMatches(text, pattern) {
  const linePattern = new RegExp(pattern.source, pattern.flags.replaceAll("g", ""));
  return text.split("\n").flatMap((line, index) => (
    linePattern.test(line) ? [index + 1] : []
  ));
}

test("docs freeze the shared database export-package bundle/archive artifact refresh helper seam as the persisted refresh boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared Database Export-Package Bundle Archive Artifact Refresh Helper Seam Freeze[\s\S]*?(?=\n### )/,
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
    "expected export-package bundle/archive artifact refresh helper docs section",
  );
  assert.notEqual(
    refreshStart,
    -1,
    "expected refreshCaseExportPackageBundleArchiveArtifactSnapshot helper",
  );
  assert.notEqual(refreshEnd, -1, "expected next helper boundary");

  const docsSection = docsSectionMatch[0];
  const refreshSlice = databaseIndexText.slice(refreshStart, refreshEnd);

  assert.match(
    docsSection,
    /Shared Database Export-Package Bundle Archive Artifact Refresh Helper Seam Freeze/i,
  );
  assert.match(
    docsSection,
    /shared `packages\/database\/src\/index\.js` `refreshCaseExportPackageBundleArchiveArtifactSnapshot` helper is the canonical persisted case-level `export_package_bundle_archive_artifact` refresh-helper boundary/i,
  );
  assert.match(
    docsSection,
    /currently evidenced included database\/runtime surfaces in this freeze are limited to:\s+`packages\/database\/src\/index\.js` export surface\s+current bounded direct runtime reuse in `apps\/api\/src\/index\.js`\s+current runtime proof in `tests\/export-package-bundle-archive-artifact-refresh\.test\.js`\s+current runtime\/helper proof in `tests\/export-package-bundle-archive-artifact-refresh-api\.test\.js`/i,
  );
  assert.match(
    docsSection,
    /current `packages\/database` refresh boundary already does this through the existing shared refresh helper with bounded direct runtime reuse in the thin final bundle\/archive refresh route and no current direct latest-read or current-only delivery route reuse/i,
  );
  assert.match(
    docsSection,
    /`refreshCaseExportPackageBundleArchiveArtifactSnapshot` rejecting invalid `caseId` values through `createPersistenceError\("ERR_CASE_ID_INVALID", "caseId must be a non-empty string"\)`/i,
  );
  assert.match(
    docsSection,
    /`refreshCaseExportPackageBundleArchiveArtifactSnapshot` loading the prerequisite latest bundle\/package manifest snapshot through the already-frozen reader seam `getLatestCaseExportPackageBundleManifestSnapshot\(caseId, options\)`/i,
  );
  assert.match(
    docsSection,
    /`refreshCaseExportPackageBundleArchiveArtifactSnapshot` rejecting missing persisted bundle\/package manifest snapshots through `createPersistenceError\("ERR_EXPORT_PACKAGE_BUNDLE_MANIFEST_SNAPSHOT_NOT_FOUND", "bundle\/package manifest snapshot must exist before final bundle\/archive artifact refresh", \{ case_id: caseId \}\)`/i,
  );
  assert.match(
    docsSection,
    /`refreshCaseExportPackageBundleArchiveArtifactSnapshot` loading the prerequisite latest JSON, Markdown, PDF, and DOCX artifact snapshots through the already-frozen sibling reader seams `getLatestCaseExportPackageJsonArtifactSnapshot\(caseId, options\)`, `getLatestCaseExportPackageMarkdownArtifactSnapshot\(caseId, options\)`, `getLatestCaseExportPackagePdfArtifactSnapshot\(caseId, options\)`, and `getLatestCaseExportPackageDocxArtifactSnapshot\(caseId, options\)`/i,
  );
  assert.match(
    docsSection,
    /`refreshCaseExportPackageBundleArchiveArtifactSnapshot` delegating canonical final bundle\/archive derivation through the shared governance helper `deriveExportPackageBundleArchiveArtifact\(bundleManifestSnapshot, \{ jsonArtifactSnapshot, markdownArtifactSnapshot, pdfArtifactSnapshot, docxArtifactSnapshot \}\)`/i,
  );
  assert.match(
    docsSection,
    /`refreshCaseExportPackageBundleArchiveArtifactSnapshot` delegating final persisted write ownership through the existing persistence helper `persistCaseExportPackageBundleArchiveArtifactSnapshot\(caseId, canonicalExportPackageBundleArchiveArtifact, options\)`/i,
  );
  assert.match(
    docsSection,
    /`refreshCaseExportPackageBundleArchiveArtifactSnapshot` returning the canonical persisted final bundle\/archive artifact snapshot delegated back from `persistCaseExportPackageBundleArchiveArtifactSnapshot\(\.\.\.\)`/i,
  );
  assert.match(
    docsSection,
    /current relationship to the broader already-frozen case-level persisted `export_package_bundle_archive_artifact` seam is limited to this helper being the narrower persisted refresh boundary inside that broader persistence seam, while latest-read and direct persisted-write remain separate adjacent surfaces/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen bundle\/archive artifact snapshot-reader seam is negative and separate because this refresh helper does not perform final bundle\/archive latest-read ownership and does not call `getLatestCaseExportPackageBundleArchiveArtifactSnapshot\(\.\.\.\)`/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen bundle\/archive artifact projection-helper seam is negative and separate because this refresh helper does not perform final bundle\/archive projection\/currentness ownership and does not call `getLatestCaseExportPackageBundleArchiveArtifactProjection\(\.\.\.\)`/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen bundle\/package manifest snapshot-reader seam is limited to `refreshCaseExportPackageBundleArchiveArtifactSnapshot` loading `getLatestCaseExportPackageBundleManifestSnapshot\(caseId, options\)` as the prerequisite latest persisted manifest snapshot before separate final bundle\/archive refresh orchestration continues/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen bundle\/package manifest projection-helper seam is negative and separate because this refresh helper does not call `getLatestCaseExportPackageBundleManifestProjection\(\.\.\.\)` and does not perform manifest projection\/currentness ownership/i,
  );
  assert.match(
    docsSection,
    /current relationship to the shared export refresh invalid-contract API envelope partition is limited to route\/runtime consumers surfacing machine-readable invalid-contract responses from this helper path where governance derivation or final persisted validation rejects input; the envelope partition itself remains a separate higher API boundary/i,
  );
  assert.match(
    docsSection,
    /current bounded live-code reuse already evidenced in `packages\/database\/src\/index\.js` is limited to `refreshCaseExportPackageBundleArchiveArtifactSnapshot` being exposed from `packages\/database\/src\/index\.js`/i,
  );
  assert.match(
    docsSection,
    /current bounded direct runtime reuse already evidenced in `apps\/api\/src\/index\.js` is limited to:\s+`handleCaseExportPackageBundleArchiveArtifactRefreshRoute`/i,
  );
  assert.match(
    docsSection,
    /no current direct runtime reuse is evidenced in `apps\/api\/src\/index\.js` for:\s+`handleCaseExportPackageBundleArchiveArtifactLatestRoute`\s+`handleCaseExportPackageBundleArchiveArtifactDownloadRoute`/i,
  );
  assert.match(
    docsSection,
    /already-frozen broader case-level persisted `export_package_bundle_archive_artifact` seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /already-frozen thin authenticated `POST \/cases\/:caseId\/export-package\/bundle-archive-artifact\/refresh` seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /already-frozen thin authenticated `GET \/cases\/:caseId\/export-package\/bundle-archive-artifact\/latest` seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /already-frozen thin authenticated `GET \/cases\/:caseId\/export-package\/bundle-archive-artifact\/download` seam remains outside this helper seam/i,
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
    /already-frozen bundle\/package manifest snapshot-reader seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /already-frozen bundle\/package manifest projection-helper seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /shared export refresh invalid-contract API envelope partition remains outside this helper seam/i,
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
    /shared governance final bundle\/archive derivation helper seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /future database helpers that need the same persisted final bundle\/archive refresh behavior should extend the existing `refreshCaseExportPackageBundleArchiveArtifactSnapshot` seam instead of introducing a parallel final bundle\/archive refresh stack/i,
  );
  assert.match(
    docsSection,
    /does not change runtime behavior, refresh semantics, persistence semantics, filesystem behavior, API behavior, or fail-closed behavior/i,
  );

  assert.match(
    refreshSlice,
    /async function refreshCaseExportPackageBundleArchiveArtifactSnapshot\(\s*caseId,\s*options = \{\},\s*\)\s*\{/,
  );
  assert.match(
    refreshSlice,
    /throw createPersistenceError\("ERR_CASE_ID_INVALID", "caseId must be a non-empty string"\);/,
  );
  assert.match(
    refreshSlice,
    /const bundleManifestSnapshot =\s+await getLatestCaseExportPackageBundleManifestSnapshot\(caseId, options\);/s,
  );
  assert.match(
    refreshSlice,
    /throw createPersistenceError\(\s*"ERR_EXPORT_PACKAGE_BUNDLE_MANIFEST_SNAPSHOT_NOT_FOUND",\s*"bundle\/package manifest snapshot must exist before final bundle\/archive artifact refresh",\s*\{ case_id: caseId \},\s*\);/s,
  );
  assert.match(
    refreshSlice,
    /const jsonArtifactSnapshot = await getLatestCaseExportPackageJsonArtifactSnapshot\(\s*caseId,\s*options,\s*\);/s,
  );
  assert.match(
    refreshSlice,
    /const markdownArtifactSnapshot =\s+await getLatestCaseExportPackageMarkdownArtifactSnapshot\(caseId, options\);/s,
  );
  assert.match(
    refreshSlice,
    /const pdfArtifactSnapshot = await getLatestCaseExportPackagePdfArtifactSnapshot\(\s*caseId,\s*options,\s*\);/s,
  );
  assert.match(
    refreshSlice,
    /const docxArtifactSnapshot = await getLatestCaseExportPackageDocxArtifactSnapshot\(\s*caseId,\s*options,\s*\);/s,
  );
  assert.match(
    refreshSlice,
    /const canonicalExportPackageBundleArchiveArtifact =\s+deriveExportPackageBundleArchiveArtifact\(\s*bundleManifestSnapshot,\s*\{\s*jsonArtifactSnapshot,\s*markdownArtifactSnapshot,\s*pdfArtifactSnapshot,\s*docxArtifactSnapshot,\s*\},\s*\);/s,
  );
  assert.match(
    refreshSlice,
    /return persistCaseExportPackageBundleArchiveArtifactSnapshot\(\s*caseId,\s*canonicalExportPackageBundleArchiveArtifact,\s*options,\s*\);/s,
  );

  assert.deepEqual(
    collectLineMatches(
      databaseIndexText,
      /refreshCaseExportPackageBundleArchiveArtifactSnapshot/,
    ),
    [1401, 1591],
  );
  assert.deepEqual(
    collectLineMatches(
      databaseIndexText,
      /^\s*refreshCaseExportPackageBundleArchiveArtifactSnapshot,\s*$/,
    ),
    [1591],
  );
  assert.deepEqual(
    collectLineMatches(
      apiIndexText,
      /refreshCaseExportPackageBundleArchiveArtifactSnapshot/,
    ),
    [14, 705],
  );

  assert.doesNotMatch(
    refreshSlice,
    /getLatestCaseExportPackageBundleArchiveArtifactSnapshot\(/,
  );
  assert.doesNotMatch(
    refreshSlice,
    /getLatestCaseExportPackageBundleArchiveArtifactProjection\(/,
  );
  assert.doesNotMatch(
    refreshSlice,
    /getLatestCaseExportPackageBundleManifestProjection\(/,
  );
  assert.doesNotMatch(refreshSlice, /handleCaseExportPackageBundleArchiveArtifactRefreshRoute\(/);
  assert.doesNotMatch(refreshSlice, /handleCaseExportPackageBundleArchiveArtifactLatestRoute\(/);
  assert.doesNotMatch(refreshSlice, /handleCaseExportPackageBundleArchiveArtifactDownloadRoute\(/);
  assert.doesNotMatch(refreshSlice, /errorResponse\(/);
  assert.doesNotMatch(refreshSlice, /readStore\(/);
  assert.doesNotMatch(refreshSlice, /writeStore\(/);
  assert.doesNotMatch(refreshSlice, /resolveExportPackageBundleArchiveArtifactProjection\(/);
  assert.doesNotMatch(refreshSlice, /persistCaseExportPackageBundleManifestSnapshot\(/);
  assert.doesNotMatch(refreshSlice, /persistCaseExportPackageSnapshot\(/);

  assert.match(
    bundleArchiveRefreshTestText,
    /const refreshed = await refreshCaseExportPackageBundleArchiveArtifactSnapshot\("case-1", \{\s*storageDir,\s*\}\);/s,
  );
  assert.match(
    bundleArchiveRefreshTestText,
    /const first = await refreshCaseExportPackageBundleArchiveArtifactSnapshot\("case-1", \{\s*storageDir,\s*\}\);/s,
  );
  assert.match(
    bundleArchiveRefreshTestText,
    /const second = await refreshCaseExportPackageBundleArchiveArtifactSnapshot\("case-1", \{\s*storageDir,\s*\}\);/s,
  );
  assert.match(
    bundleArchiveRefreshTestText,
    /assert\.deepEqual\(latest, refreshed\);/,
  );

  assert.match(
    bundleArchiveRefreshApiTestText,
    /docs freeze the thin authenticated final bundle\/archive refresh seam as a distinct canonical runtime\/refresh seam/,
  );
  assert.match(
    bundleArchiveRefreshApiTestText,
    /ERR_EXPORT_PACKAGE_BUNDLE_ARCHIVE_INVALID/,
  );
  assert.match(
    apiIndexText,
    /error\.code === "ERR_EXPORT_PACKAGE_BUNDLE_ARCHIVE_ARTIFACT_INVALID"/,
  );
  assert.match(
    apiIndexText,
    /const latestBundleManifestSnapshot =\s+await getLatestCaseExportPackageBundleManifestSnapshot\(routeMatch\.caseId, options\);/s,
  );
  assert.match(
    apiIndexText,
    /await refreshCaseExportPackageBundleArchiveArtifactSnapshot\(\s*routeMatch\.caseId,\s*options,\s*\)/s,
  );
});
