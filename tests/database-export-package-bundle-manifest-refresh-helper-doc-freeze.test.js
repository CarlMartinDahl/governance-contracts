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
const bundleManifestRefreshTestText = fs.readFileSync(
  path.join(__dirname, "export-package-bundle-manifest-refresh.test.js"),
  "utf8",
);
const bundleManifestRefreshApiTestText = fs.readFileSync(
  path.join(__dirname, "export-package-bundle-manifest-refresh-api.test.js"),
  "utf8",
);

function collectLineMatches(text, pattern) {
  const linePattern = new RegExp(pattern.source, pattern.flags.replaceAll("g", ""));
  return text.split("\n").flatMap((line, index) => (
    linePattern.test(line) ? [index + 1] : []
  ));
}

test("docs freeze the shared database export-package bundle/package manifest refresh helper seam as the persisted refresh boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared Database Export-Package Bundle Manifest Refresh Helper Seam Freeze[\s\S]*?(?=\n### )/,
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
    "expected export-package bundle manifest refresh helper docs section",
  );
  assert.notEqual(
    refreshStart,
    -1,
    "expected refreshCaseExportPackageBundleManifestSnapshot helper",
  );
  assert.notEqual(refreshEnd, -1, "expected next helper boundary");

  const docsSection = docsSectionMatch[0];
  const refreshSlice = databaseIndexText.slice(refreshStart, refreshEnd);

  assert.match(
    docsSection,
    /Shared Database Export-Package Bundle Manifest Refresh Helper Seam Freeze/i,
  );
  assert.match(
    docsSection,
    /shared `packages\/database\/src\/index\.js` `refreshCaseExportPackageBundleManifestSnapshot` helper is the canonical persisted case-level `export_package_bundle_manifest` refresh-helper boundary/i,
  );
  assert.match(
    docsSection,
    /currently evidenced included database\/runtime surfaces in this freeze are limited to:\s+`packages\/database\/src\/index\.js` export surface\s+current bounded direct runtime reuse in `apps\/api\/src\/index\.js`\s+current runtime proof in `tests\/export-package-bundle-manifest-refresh\.test\.js`\s+current runtime\/helper proof in `tests\/export-package-bundle-manifest-refresh-api\.test\.js`/i,
  );
  assert.match(
    docsSection,
    /current `packages\/database` refresh boundary already does this through the existing shared refresh helper with bounded direct runtime reuse in the thin bundle\/package manifest refresh route and no current direct latest-read route reuse/i,
  );
  assert.match(
    docsSection,
    /`refreshCaseExportPackageBundleManifestSnapshot` rejecting invalid `caseId` values through `createPersistenceError\("ERR_CASE_ID_INVALID", "caseId must be a non-empty string"\)`/i,
  );
  assert.match(
    docsSection,
    /`refreshCaseExportPackageBundleManifestSnapshot` loading the prerequisite latest export-package snapshot through the already-frozen reader seam `getLatestCaseExportPackageSnapshot\(caseId, options\)`/i,
  );
  assert.match(
    docsSection,
    /`refreshCaseExportPackageBundleManifestSnapshot` rejecting missing persisted export-package snapshots through `createPersistenceError\("ERR_EXPORT_PACKAGE_SNAPSHOT_NOT_FOUND", "export package snapshot must exist before bundle\/package manifest refresh", \{ case_id: caseId \}\)`/i,
  );
  assert.match(
    docsSection,
    /`refreshCaseExportPackageBundleManifestSnapshot` loading the prerequisite latest JSON, Markdown, PDF, and DOCX artifact snapshots through the already-frozen sibling reader seams `getLatestCaseExportPackageJsonArtifactSnapshot\(caseId, options\)`, `getLatestCaseExportPackageMarkdownArtifactSnapshot\(caseId, options\)`, `getLatestCaseExportPackagePdfArtifactSnapshot\(caseId, options\)`, and `getLatestCaseExportPackageDocxArtifactSnapshot\(caseId, options\)`/i,
  );
  assert.match(
    docsSection,
    /`refreshCaseExportPackageBundleManifestSnapshot` delegating canonical bundle\/package manifest derivation through the shared governance helper `deriveExportPackageBundleManifest\(exportPackageSnapshot, \{ jsonArtifactSnapshot, markdownArtifactSnapshot, pdfArtifactSnapshot, docxArtifactSnapshot \}, \{ generated_at: options\.generated_at \}\)`/i,
  );
  assert.match(
    docsSection,
    /`refreshCaseExportPackageBundleManifestSnapshot` delegating final persisted write ownership through the existing persistence helper `persistCaseExportPackageBundleManifestSnapshot\(caseId, canonicalExportPackageBundleManifest, options\)`/i,
  );
  assert.match(
    docsSection,
    /`refreshCaseExportPackageBundleManifestSnapshot` returning the canonical persisted bundle\/package manifest snapshot delegated back from `persistCaseExportPackageBundleManifestSnapshot\(\.\.\.\)`/i,
  );
  assert.match(
    docsSection,
    /current relationship to the broader already-frozen case-level persisted `export_package_bundle_manifest` seam is limited to this helper being the narrower persisted refresh boundary inside that broader persistence seam, while latest-read and direct persisted-write remain separate adjacent surfaces/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen bundle\/package manifest snapshot-reader seam is negative and separate because this refresh helper does not perform bundle\/package manifest latest-read ownership and does not call `getLatestCaseExportPackageBundleManifestSnapshot\(\.\.\.\)`/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen bundle\/package manifest projection-helper seam is negative and separate because this refresh helper does not perform bundle\/package manifest projection\/currentness ownership and does not call `getLatestCaseExportPackageBundleManifestProjection\(\.\.\.\)`/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen export-package snapshot-reader seam is limited to `refreshCaseExportPackageBundleManifestSnapshot` loading `getLatestCaseExportPackageSnapshot\(caseId, options\)` as the prerequisite latest persisted export-package snapshot before separate bundle\/package manifest refresh orchestration continues/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen export-package projection-helper seam is negative and separate because this refresh helper does not call `getLatestCaseExportPackageProjection\(\.\.\.\)` and does not perform export-package projection\/currentness ownership/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen JSON, Markdown, PDF, and DOCX artifact snapshot-reader seams is limited to `refreshCaseExportPackageBundleManifestSnapshot` loading those latest persisted artifact snapshots as prerequisite inputs before separate bundle\/package manifest refresh orchestration continues/i,
  );
  assert.match(
    docsSection,
    /current relationship to the shared export refresh invalid-contract API envelope partition is limited to route\/runtime consumers surfacing machine-readable invalid-contract responses from this helper path where governance derivation or final persisted validation rejects input; the envelope partition itself remains a separate higher API boundary/i,
  );
  assert.match(
    docsSection,
    /current bounded live-code reuse already evidenced in `packages\/database\/src\/index\.js` is limited to `refreshCaseExportPackageBundleManifestSnapshot` being exposed from `packages\/database\/src\/index\.js`/i,
  );
  assert.match(
    docsSection,
    /current bounded direct runtime reuse already evidenced in `apps\/api\/src\/index\.js` is limited to:\s+`handleCaseExportPackageBundleManifestRefreshRoute`/i,
  );
  assert.match(
    docsSection,
    /no current direct runtime reuse is evidenced in `apps\/api\/src\/index\.js` for:\s+`handleCaseExportPackageBundleManifestLatestRoute`/i,
  );
  assert.match(
    docsSection,
    /already-frozen broader case-level persisted `export_package_bundle_manifest` seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /already-frozen thin authenticated `POST \/cases\/:caseId\/export-package\/bundle-manifest\/refresh` seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /already-frozen thin authenticated `GET \/cases\/:caseId\/export-package\/bundle-manifest\/latest` seam remains outside this helper seam/i,
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
    /already-frozen export-package snapshot-reader seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /already-frozen export-package projection-helper seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /already-frozen JSON, Markdown, PDF, and DOCX artifact snapshot-reader seams remain outside this helper seam/i,
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
    /shared governance bundle\/package manifest derivation helper seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /future database helpers that need the same persisted bundle\/package manifest refresh behavior should extend the existing `refreshCaseExportPackageBundleManifestSnapshot` seam instead of introducing a parallel bundle\/package manifest refresh stack/i,
  );
  assert.match(
    docsSection,
    /does not change runtime behavior, refresh semantics, persistence semantics, filesystem behavior, API behavior, or fail-closed behavior/i,
  );

  assert.match(
    refreshSlice,
    /async function refreshCaseExportPackageBundleManifestSnapshot\(\s*caseId,\s*options = \{\},\s*\)\s*\{/,
  );
  assert.match(
    refreshSlice,
    /throw createPersistenceError\("ERR_CASE_ID_INVALID", "caseId must be a non-empty string"\);/,
  );
  assert.match(
    refreshSlice,
    /const exportPackageSnapshot = await getLatestCaseExportPackageSnapshot\(caseId, options\);/s,
  );
  assert.match(
    refreshSlice,
    /throw createPersistenceError\(\s*"ERR_EXPORT_PACKAGE_SNAPSHOT_NOT_FOUND",\s*"export package snapshot must exist before bundle\/package manifest refresh",\s*\{ case_id: caseId \},\s*\);/s,
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
    /const canonicalExportPackageBundleManifest =\s+deriveExportPackageBundleManifest\(\s*exportPackageSnapshot,\s*\{\s*jsonArtifactSnapshot,\s*markdownArtifactSnapshot,\s*pdfArtifactSnapshot,\s*docxArtifactSnapshot,\s*\},\s*\{\s*generated_at: options\.generated_at,\s*\},\s*\);/s,
  );
  assert.match(
    refreshSlice,
    /return persistCaseExportPackageBundleManifestSnapshot\(\s*caseId,\s*canonicalExportPackageBundleManifest,\s*options,\s*\);/s,
  );

  assert.deepEqual(
    collectLineMatches(
      databaseIndexText,
      /refreshCaseExportPackageBundleManifestSnapshot/,
    ),
    [1316, 1592],
  );
  assert.deepEqual(
    collectLineMatches(
      databaseIndexText,
      /^\s*refreshCaseExportPackageBundleManifestSnapshot,\s*$/,
    ),
    [1592],
  );
  assert.deepEqual(
    collectLineMatches(
      apiIndexText,
      /refreshCaseExportPackageBundleManifestSnapshot/,
    ),
    [15, 925],
  );

  assert.doesNotMatch(
    refreshSlice,
    /getLatestCaseExportPackageBundleManifestSnapshot\(/,
  );
  assert.doesNotMatch(
    refreshSlice,
    /getLatestCaseExportPackageBundleManifestProjection\(/,
  );
  assert.doesNotMatch(refreshSlice, /getLatestCaseExportPackageProjection\(/);
  assert.doesNotMatch(
    refreshSlice,
    /handleCaseExportPackageBundleManifestRefreshRoute\(/,
  );
  assert.doesNotMatch(
    refreshSlice,
    /handleCaseExportPackageBundleManifestLatestRoute\(/,
  );
  assert.doesNotMatch(refreshSlice, /errorResponse\(/);
  assert.doesNotMatch(refreshSlice, /readStore\(/);
  assert.doesNotMatch(refreshSlice, /writeStore\(/);
  assert.doesNotMatch(
    refreshSlice,
    /persistCaseExportPackageBundleArchiveArtifactSnapshot\(/,
  );
  assert.doesNotMatch(
    refreshSlice,
    /refreshCaseExportPackageBundleArchiveArtifactSnapshot\(/,
  );

  assert.match(
    bundleManifestRefreshTestText,
    /const refreshed = await refreshCaseExportPackageBundleManifestSnapshot\(\s*"case-1",\s*\{[\s\S]*?storageDir,[\s\S]*?generated_at:\s*"2026-03-24T13:00:00.000Z",[\s\S]*?\}\s*\);/s,
  );
  assert.match(
    bundleManifestRefreshTestText,
    /const first = await refreshCaseExportPackageBundleManifestSnapshot\(\s*"case-1",\s*\{[\s\S]*?storageDir,[\s\S]*?generated_at:\s*"2026-03-24T13:00:00.000Z",[\s\S]*?\}\s*\);/s,
  );
  assert.match(
    bundleManifestRefreshTestText,
    /const second = await refreshCaseExportPackageBundleManifestSnapshot\(\s*"case-1",\s*\{[\s\S]*?storageDir,[\s\S]*?generated_at:\s*"2026-03-24T13:00:00.000Z",[\s\S]*?\}\s*\);/s,
  );
  assert.match(
    bundleManifestRefreshTestText,
    /assert\.deepEqual\(latest, refreshed\);/,
  );

  assert.match(
    bundleManifestRefreshApiTestText,
    /docs freeze the thin authenticated bundle\/package manifest refresh seam as a distinct canonical runtime\/refresh seam/,
  );
  assert.match(
    apiIndexText,
    /const latestExportPackageSnapshot\s*=\s*await getLatestCaseExportPackageSnapshot\(\s*routeMatch\.caseId,\s*options,\s*\);/s,
  );
  assert.match(
    apiIndexText,
    /await\s+refreshCaseExportPackageBundleManifestSnapshot\(\s*routeMatch\.caseId,\s*options,\s*\)/s,
  );
  assert.match(
    apiIndexText,
    /error\.code === "ERR_EXPORT_PACKAGE_BUNDLE_MANIFEST_INVALID"/,
  );
});
