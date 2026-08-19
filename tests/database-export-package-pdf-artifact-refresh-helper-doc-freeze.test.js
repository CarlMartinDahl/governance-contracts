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
const pdfArtifactRefreshTestText = fs.readFileSync(
  path.join(__dirname, "export-package-pdf-artifact-refresh.test.js"),
  "utf8",
);
const pdfArtifactRefreshApiTestText = fs.readFileSync(
  path.join(__dirname, "export-package-pdf-artifact-refresh-api.test.js"),
  "utf8",
);

function collectLineMatches(text, pattern) {
  const linePattern = new RegExp(pattern.source, pattern.flags.replaceAll("g", ""));
  return text.split("\n").flatMap((line, index) => (
    linePattern.test(line) ? [index + 1] : []
  ));
}

test("docs freeze the shared database export-package PDF artifact refresh helper seam as the persisted refresh boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared Database Export-Package PDF Artifact Refresh Helper Seam Freeze[\s\S]*?(?=\n### )/,
  );
  const refreshStart = databaseIndexText.indexOf(
    "async function refreshCaseExportPackagePdfArtifactSnapshot(",
  );
  const refreshEnd = databaseIndexText.indexOf(
    "async function refreshCaseExportPackageMarkdownArtifactSnapshot(",
    refreshStart,
  );

  assert.ok(
    docsSectionMatch,
    "expected export-package PDF artifact refresh helper docs section",
  );
  assert.notEqual(
    refreshStart,
    -1,
    "expected refreshCaseExportPackagePdfArtifactSnapshot helper",
  );
  assert.notEqual(refreshEnd, -1, "expected next helper boundary");

  const docsSection = docsSectionMatch[0];
  const refreshSlice = databaseIndexText.slice(refreshStart, refreshEnd);

  assert.match(
    docsSection,
    /Shared Database Export-Package PDF Artifact Refresh Helper Seam Freeze/i,
  );
  assert.match(
    docsSection,
    /shared `packages\/database\/src\/index\.js` `refreshCaseExportPackagePdfArtifactSnapshot` helper is the canonical persisted case-level `export_package_pdf_artifact` refresh-helper boundary/i,
  );
  assert.match(
    docsSection,
    /currently evidenced included database\/runtime surfaces in this freeze are limited to:\s+`packages\/database\/src\/index\.js` export surface\s+current bounded direct runtime reuse in `apps\/api\/src\/index\.js`\s+current runtime proof in `tests\/export-package-pdf-artifact-refresh\.test\.js`\s+current runtime\/helper proof in `tests\/export-package-pdf-artifact-refresh-api\.test\.js`/i,
  );
  assert.match(
    docsSection,
    /current `packages\/database` refresh boundary already does this through the existing shared refresh helper with bounded direct runtime reuse in the thin PDF artifact refresh route and no current direct latest-read or current-only delivery route reuse/i,
  );
  assert.match(
    docsSection,
    /`refreshCaseExportPackagePdfArtifactSnapshot` rejecting invalid `caseId` values through `createPersistenceError\("ERR_CASE_ID_INVALID", "caseId must be a non-empty string"\)`/i,
  );
  assert.match(
    docsSection,
    /`refreshCaseExportPackagePdfArtifactSnapshot` loading the prerequisite latest export-package snapshot through the already-frozen reader seam `getLatestCaseExportPackageSnapshot\(caseId, options\)`/i,
  );
  assert.match(
    docsSection,
    /`refreshCaseExportPackagePdfArtifactSnapshot` rejecting missing persisted export-package snapshots through `createPersistenceError\("ERR_EXPORT_PACKAGE_SNAPSHOT_NOT_FOUND", "export package snapshot must exist before PDF export artifact refresh", \{ case_id: caseId \}\)`/i,
  );
  assert.match(
    docsSection,
    /`refreshCaseExportPackagePdfArtifactSnapshot` delegating canonical PDF artifact derivation through the shared governance helper `deriveExportPackagePdfArtifact\(exportPackageSnapshot\)`/i,
  );
  assert.match(
    docsSection,
    /`refreshCaseExportPackagePdfArtifactSnapshot` delegating final persisted write ownership through the existing persistence helper `persistCaseExportPackagePdfArtifactSnapshot\(caseId, canonicalExportPackagePdfArtifact, options\)`/i,
  );
  assert.match(
    docsSection,
    /`refreshCaseExportPackagePdfArtifactSnapshot` returning the canonical persisted PDF artifact snapshot delegated back from `persistCaseExportPackagePdfArtifactSnapshot\(\.\.\.\)`/i,
  );
  assert.match(
    docsSection,
    /current relationship to the broader already-frozen case-level persisted `export_package_pdf_artifact` seam is limited to this helper being the narrower persisted refresh boundary inside that broader persistence seam, while latest-read and direct persisted-write remain separate adjacent surfaces/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen PDF artifact snapshot-reader seam is negative and separate because this refresh helper does not perform PDF artifact latest-read ownership and does not call `getLatestCaseExportPackagePdfArtifactSnapshot\(\.\.\.\)`/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen PDF artifact projection-helper seam is negative and separate because this refresh helper does not perform PDF artifact projection\/currentness ownership and does not call `getLatestCaseExportPackagePdfArtifactProjection\(\.\.\.\)`/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen export-package snapshot-reader seam is limited to `refreshCaseExportPackagePdfArtifactSnapshot` loading `getLatestCaseExportPackageSnapshot\(caseId, options\)` as the prerequisite latest persisted export-package snapshot before separate PDF artifact refresh orchestration continues/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen export-package projection-helper seam is negative and separate because this refresh helper does not call `getLatestCaseExportPackageProjection\(\.\.\.\)` and does not perform export-package projection\/currentness ownership/i,
  );
  assert.match(
    docsSection,
    /current relationship to the shared governance PDF artifact derivation\/projection helper seams is limited to `refreshCaseExportPackagePdfArtifactSnapshot` delegating PDF artifact derivation through `deriveExportPackagePdfArtifact\(exportPackageSnapshot\)`; PDF artifact projection resolution remains a separate governance boundary/i,
  );
  assert.match(
    docsSection,
    /current relationship to the shared export refresh invalid-contract API envelope partition is limited to route\/runtime consumers surfacing machine-readable invalid-contract responses from this helper path where governance derivation or final persisted validation rejects input; the envelope partition itself remains a separate higher API boundary/i,
  );
  assert.match(
    docsSection,
    /current bounded live-code reuse already evidenced in `packages\/database\/src\/index\.js` is limited to `refreshCaseExportPackagePdfArtifactSnapshot` being exposed from `packages\/database\/src\/index\.js`/i,
  );
  assert.match(
    docsSection,
    /current bounded direct runtime reuse already evidenced in `apps\/api\/src\/index\.js` is limited to:\s+`handleCaseExportPackagePdfArtifactRefreshRoute`/i,
  );
  assert.match(
    docsSection,
    /no current direct runtime reuse is evidenced in `apps\/api\/src\/index\.js` for:\s+`handleCaseExportPackagePdfArtifactLatestRoute`\s+`handleCaseExportPackagePdfArtifactDownloadRoute`/i,
  );
  assert.match(
    docsSection,
    /already-frozen broader case-level persisted `export_package_pdf_artifact` seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /already-frozen thin authenticated `POST \/cases\/:caseId\/export-package\/pdf-artifact\/refresh` seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /already-frozen thin authenticated `GET \/cases\/:caseId\/export-package\/pdf-artifact\/latest` seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /already-frozen thin authenticated `GET \/cases\/:caseId\/export-package\/pdf-artifact\/download` seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /already-frozen PDF artifact snapshot-reader seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /already-frozen PDF artifact projection-helper seam remains outside this helper seam/i,
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
    /sibling JSON, Markdown, DOCX, bundle\/package manifest, and final bundle\/archive refresh\/helper families remain outside this helper seam/i,
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
    /shared governance PDF artifact derivation helper seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /future database helpers that need the same persisted PDF artifact refresh behavior should extend the existing `refreshCaseExportPackagePdfArtifactSnapshot` seam instead of introducing a parallel PDF artifact refresh stack/i,
  );
  assert.match(
    docsSection,
    /does not change runtime behavior, refresh semantics, persistence semantics, filesystem behavior, API behavior, or fail-closed behavior/i,
  );

  assert.match(
    refreshSlice,
    /async function refreshCaseExportPackagePdfArtifactSnapshot\(\s*caseId,\s*options = \{\},?\s*\)\s*\{/,
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
    /throw createPersistenceError\(\s*"ERR_EXPORT_PACKAGE_SNAPSHOT_NOT_FOUND",\s*"export package snapshot must exist before PDF export artifact refresh",\s*\{ case_id: caseId \},\s*\);/s,
  );
  assert.match(
    refreshSlice,
    /const canonicalExportPackagePdfArtifact =\s*deriveExportPackagePdfArtifact\(exportPackageSnapshot\);/s,
  );
  assert.match(
    refreshSlice,
    /return persistCaseExportPackagePdfArtifactSnapshot\(\s*caseId,\s*canonicalExportPackagePdfArtifact,\s*options,\s*\);/s,
  );

  assert.deepEqual(
    collectLineMatches(databaseIndexText, /refreshCaseExportPackagePdfArtifactSnapshot/),
    [1263, 1594],
  );
  assert.deepEqual(
    collectLineMatches(
      databaseIndexText,
      /^\s*refreshCaseExportPackagePdfArtifactSnapshot,\s*$/,
    ),
    [1594],
  );
  assert.deepEqual(
    collectLineMatches(apiIndexText, /refreshCaseExportPackagePdfArtifactSnapshot/),
    [17, 1648],
  );

  assert.doesNotMatch(refreshSlice, /getLatestCaseExportPackagePdfArtifactSnapshot\(/);
  assert.doesNotMatch(refreshSlice, /getLatestCaseExportPackagePdfArtifactProjection\(/);
  assert.doesNotMatch(refreshSlice, /getLatestCaseExportPackageProjection\(/);
  assert.doesNotMatch(refreshSlice, /resolveExportPackagePdfArtifactProjection\(/);
  assert.doesNotMatch(refreshSlice, /handleCaseExportPackagePdfArtifactRefreshRoute\(/);
  assert.doesNotMatch(refreshSlice, /handleCaseExportPackagePdfArtifactLatestRoute\(/);
  assert.doesNotMatch(refreshSlice, /handleCaseExportPackagePdfArtifactDownloadRoute\(/);
  assert.doesNotMatch(refreshSlice, /errorResponse\(/);
  assert.doesNotMatch(refreshSlice, /readStore\(/);
  assert.doesNotMatch(refreshSlice, /writeStore\(/);
  assert.doesNotMatch(refreshSlice, /persistCaseExportPackageJsonArtifactSnapshot\(/);
  assert.doesNotMatch(refreshSlice, /refreshCaseExportPackageJsonArtifactSnapshot\(/);
  assert.doesNotMatch(refreshSlice, /persistCaseExportPackageMarkdownArtifactSnapshot\(/);
  assert.doesNotMatch(refreshSlice, /refreshCaseExportPackageMarkdownArtifactSnapshot\(/);
  assert.doesNotMatch(refreshSlice, /persistCaseExportPackageDocxArtifactSnapshot\(/);
  assert.doesNotMatch(refreshSlice, /refreshCaseExportPackageDocxArtifactSnapshot\(/);
  assert.doesNotMatch(refreshSlice, /persistCaseExportPackageBundleManifestSnapshot\(/);
  assert.doesNotMatch(refreshSlice, /refreshCaseExportPackageBundleManifestSnapshot\(/);
  assert.doesNotMatch(refreshSlice, /persistCaseExportPackageBundleArchiveArtifactSnapshot\(/);
  assert.doesNotMatch(refreshSlice, /refreshCaseExportPackageBundleArchiveArtifactSnapshot\(/);

  assert.match(
    pdfArtifactRefreshTestText,
    /const refreshed = await refreshCaseExportPackagePdfArtifactSnapshot\("case-1", \{\s*storageDir,\s*\}\);/s,
  );
  assert.match(
    pdfArtifactRefreshTestText,
    /const first = await refreshCaseExportPackagePdfArtifactSnapshot\("case-1", \{\s*storageDir,\s*\}\);/s,
  );
  assert.match(
    pdfArtifactRefreshTestText,
    /const second = await refreshCaseExportPackagePdfArtifactSnapshot\("case-1", \{\s*storageDir,\s*\}\);/s,
  );
  assert.match(pdfArtifactRefreshTestText, /assert\.deepEqual\(latest, refreshed\);/);

  assert.match(
    pdfArtifactRefreshApiTestText,
    /docs freeze the thin authenticated export_package_pdf_artifact refresh seam as a distinct canonical runtime\/refresh seam/,
  );
  assert.match(
    apiIndexText,
    /const latestExportPackageSnapshot = await getLatestCaseExportPackageSnapshot\(\s*routeMatch\.caseId,\s*options,\s*\);/s,
  );
  assert.match(
    apiIndexText,
    /await refreshCaseExportPackagePdfArtifactSnapshot\(routeMatch\.caseId, options\)/,
  );
  assert.match(
    apiIndexText,
    /error\.code === "ERR_EXPORT_PACKAGE_PDF_ARTIFACT_INVALID"/,
  );
});
