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
const docxArtifactRefreshTestText = fs.readFileSync(
  path.join(__dirname, "export-package-docx-artifact-refresh.test.js"),
  "utf8",
);
const docxArtifactRefreshApiTestText = fs.readFileSync(
  path.join(__dirname, "export-package-docx-artifact-refresh-api.test.js"),
  "utf8",
);

function collectLineMatches(text, pattern) {
  const linePattern = new RegExp(pattern.source, pattern.flags.replaceAll("g", ""));
  return text.split("\n").flatMap((line, index) => (
    linePattern.test(line) ? [index + 1] : []
  ));
}

test("docs freeze the shared database export-package DOCX artifact refresh helper seam as the persisted refresh boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared Database Export-Package DOCX Artifact Refresh Helper Seam Freeze[\s\S]*?(?=\n### )/,
  );
  const refreshStart = databaseIndexText.indexOf(
    "async function refreshCaseExportPackageDocxArtifactSnapshot(",
  );
  const refreshEnd = databaseIndexText.indexOf(
    "async function refreshCaseExportPackagePdfArtifactSnapshot(",
    refreshStart,
  );

  assert.ok(
    docsSectionMatch,
    "expected export-package DOCX artifact refresh helper docs section",
  );
  assert.notEqual(
    refreshStart,
    -1,
    "expected refreshCaseExportPackageDocxArtifactSnapshot helper",
  );
  assert.notEqual(refreshEnd, -1, "expected next helper boundary");

  const docsSection = docsSectionMatch[0];
  const refreshSlice = databaseIndexText.slice(refreshStart, refreshEnd);

  assert.match(
    docsSection,
    /Shared Database Export-Package DOCX Artifact Refresh Helper Seam Freeze/i,
  );
  assert.match(
    docsSection,
    /shared `packages\/database\/src\/index\.js` `refreshCaseExportPackageDocxArtifactSnapshot` helper is the canonical persisted case-level `export_package_docx_artifact` refresh-helper boundary/i,
  );
  assert.match(
    docsSection,
    /currently evidenced included database\/runtime surfaces in this freeze are limited to:\s+`packages\/database\/src\/index\.js` export surface\s+current bounded direct runtime reuse in `apps\/api\/src\/index\.js`\s+current runtime proof in `tests\/export-package-docx-artifact-refresh\.test\.js`\s+current runtime\/helper proof in `tests\/export-package-docx-artifact-refresh-api\.test\.js`/i,
  );
  assert.match(
    docsSection,
    /current `packages\/database` refresh boundary already does this through the existing shared refresh helper with bounded direct runtime reuse in the thin DOCX artifact refresh route and no current direct latest-read or current-only delivery route reuse/i,
  );
  assert.match(
    docsSection,
    /`refreshCaseExportPackageDocxArtifactSnapshot` rejecting invalid `caseId` values through `createPersistenceError\("ERR_CASE_ID_INVALID", "caseId must be a non-empty string"\)`/i,
  );
  assert.match(
    docsSection,
    /`refreshCaseExportPackageDocxArtifactSnapshot` loading the prerequisite latest export-package snapshot through the already-frozen reader seam `getLatestCaseExportPackageSnapshot\(caseId, options\)`/i,
  );
  assert.match(
    docsSection,
    /`refreshCaseExportPackageDocxArtifactSnapshot` rejecting missing persisted export-package snapshots through `createPersistenceError\("ERR_EXPORT_PACKAGE_SNAPSHOT_NOT_FOUND", "export package snapshot must exist before DOCX export artifact refresh", \{ case_id: caseId \}\)`/i,
  );
  assert.match(
    docsSection,
    /`refreshCaseExportPackageDocxArtifactSnapshot` delegating canonical DOCX artifact derivation through the shared governance helper `deriveExportPackageDocxArtifact\(exportPackageSnapshot\)`/i,
  );
  assert.match(
    docsSection,
    /`refreshCaseExportPackageDocxArtifactSnapshot` delegating final persisted write ownership through the existing persistence helper `persistCaseExportPackageDocxArtifactSnapshot\(caseId, canonicalExportPackageDocxArtifact, options\)`/i,
  );
  assert.match(
    docsSection,
    /`refreshCaseExportPackageDocxArtifactSnapshot` returning the canonical persisted DOCX artifact snapshot delegated back from `persistCaseExportPackageDocxArtifactSnapshot\(\.\.\.\)`/i,
  );
  assert.match(
    docsSection,
    /current relationship to the broader already-frozen case-level persisted `export_package_docx_artifact` seam is limited to this helper being the narrower persisted refresh boundary inside that broader persistence seam, while latest-read and direct persisted-write remain separate adjacent surfaces/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen DOCX artifact snapshot-reader seam is negative and separate because this refresh helper does not perform DOCX artifact latest-read ownership and does not call `getLatestCaseExportPackageDocxArtifactSnapshot\(\.\.\.\)`/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen DOCX artifact projection-helper seam is negative and separate because this refresh helper does not perform DOCX artifact projection\/currentness ownership and does not call `getLatestCaseExportPackageDocxArtifactProjection\(\.\.\.\)`/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen export-package snapshot-reader seam is limited to `refreshCaseExportPackageDocxArtifactSnapshot` loading `getLatestCaseExportPackageSnapshot\(caseId, options\)` as the prerequisite latest persisted export-package snapshot before separate DOCX artifact refresh orchestration continues/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen export-package projection-helper seam is negative and separate because this refresh helper does not call `getLatestCaseExportPackageProjection\(\.\.\.\)` and does not perform export-package projection\/currentness ownership/i,
  );
  assert.match(
    docsSection,
    /current relationship to the shared governance DOCX artifact derivation\/projection helper seams is limited to `refreshCaseExportPackageDocxArtifactSnapshot` delegating DOCX artifact derivation through `deriveExportPackageDocxArtifact\(exportPackageSnapshot\)`; DOCX artifact projection resolution remains a separate governance boundary/i,
  );
  assert.match(
    docsSection,
    /current relationship to the shared export refresh invalid-contract API envelope partition is limited to route\/runtime consumers surfacing machine-readable invalid-contract responses from this helper path where governance derivation or final persisted validation rejects input; the envelope partition itself remains a separate higher API boundary/i,
  );
  assert.match(
    docsSection,
    /current bounded live-code reuse already evidenced in `packages\/database\/src\/index\.js` is limited to `refreshCaseExportPackageDocxArtifactSnapshot` being exposed from `packages\/database\/src\/index\.js`/i,
  );
  assert.match(
    docsSection,
    /current bounded direct runtime reuse already evidenced in `apps\/api\/src\/index\.js` is limited to:\s+`handleCaseExportPackageDocxArtifactRefreshRoute`/i,
  );
  assert.match(
    docsSection,
    /no current direct runtime reuse is evidenced in `apps\/api\/src\/index\.js` for:\s+`handleCaseExportPackageDocxArtifactLatestRoute`\s+`handleCaseExportPackageDocxArtifactDownloadRoute`/i,
  );
  assert.match(
    docsSection,
    /already-frozen broader case-level persisted `export_package_docx_artifact` seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /already-frozen thin authenticated `POST \/cases\/:caseId\/export-package\/docx-artifact\/refresh` seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /already-frozen thin authenticated `GET \/cases\/:caseId\/export-package\/docx-artifact\/latest` seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /already-frozen thin authenticated `GET \/cases\/:caseId\/export-package\/docx-artifact\/download` seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /already-frozen DOCX artifact snapshot-reader seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /already-frozen DOCX artifact projection-helper seam remains outside this helper seam/i,
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
    /sibling JSON, Markdown, PDF, bundle\/package manifest, and final bundle\/archive refresh\/helper families remain outside this helper seam/i,
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
    /shared governance DOCX artifact derivation helper seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /future database helpers that need the same persisted DOCX artifact refresh behavior should extend the existing `refreshCaseExportPackageDocxArtifactSnapshot` seam instead of introducing a parallel DOCX artifact refresh stack/i,
  );
  assert.match(
    docsSection,
    /does not change runtime behavior, refresh semantics, persistence semantics, filesystem behavior, API behavior, or fail-closed behavior/i,
  );

  assert.match(
    refreshSlice,
    /async function refreshCaseExportPackageDocxArtifactSnapshot\(\s*caseId,\s*options = \{\},?\s*\)\s*\{/,
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
    /throw createPersistenceError\(\s*"ERR_EXPORT_PACKAGE_SNAPSHOT_NOT_FOUND",\s*"export package snapshot must exist before DOCX export artifact refresh",\s*\{ case_id: caseId \},\s*\);/s,
  );
  assert.match(
    refreshSlice,
    /const canonicalExportPackageDocxArtifact =\s*deriveExportPackageDocxArtifact\(exportPackageSnapshot\);/s,
  );
  assert.match(
    refreshSlice,
    /return persistCaseExportPackageDocxArtifactSnapshot\(\s*caseId,\s*canonicalExportPackageDocxArtifact,\s*options,\s*\);/s,
  );

  assert.deepEqual(
    collectLineMatches(databaseIndexText, /refreshCaseExportPackageDocxArtifactSnapshot/),
    [1238, 1593],
  );
  assert.deepEqual(
    collectLineMatches(
      databaseIndexText,
      /^\s*refreshCaseExportPackageDocxArtifactSnapshot,\s*$/,
    ),
    [1593],
  );
  assert.deepEqual(
    collectLineMatches(apiIndexText, /refreshCaseExportPackageDocxArtifactSnapshot/),
    [16, 1743],
  );

  assert.doesNotMatch(refreshSlice, /getLatestCaseExportPackageDocxArtifactSnapshot\(/);
  assert.doesNotMatch(refreshSlice, /getLatestCaseExportPackageDocxArtifactProjection\(/);
  assert.doesNotMatch(refreshSlice, /getLatestCaseExportPackageProjection\(/);
  assert.doesNotMatch(refreshSlice, /resolveExportPackageDocxArtifactProjection\(/);
  assert.doesNotMatch(refreshSlice, /handleCaseExportPackageDocxArtifactRefreshRoute\(/);
  assert.doesNotMatch(refreshSlice, /handleCaseExportPackageDocxArtifactLatestRoute\(/);
  assert.doesNotMatch(refreshSlice, /handleCaseExportPackageDocxArtifactDownloadRoute\(/);
  assert.doesNotMatch(refreshSlice, /errorResponse\(/);
  assert.doesNotMatch(refreshSlice, /readStore\(/);
  assert.doesNotMatch(refreshSlice, /writeStore\(/);
  assert.doesNotMatch(refreshSlice, /persistCaseExportPackageJsonArtifactSnapshot\(/);
  assert.doesNotMatch(refreshSlice, /refreshCaseExportPackageJsonArtifactSnapshot\(/);
  assert.doesNotMatch(refreshSlice, /persistCaseExportPackageMarkdownArtifactSnapshot\(/);
  assert.doesNotMatch(refreshSlice, /refreshCaseExportPackageMarkdownArtifactSnapshot\(/);
  assert.doesNotMatch(refreshSlice, /persistCaseExportPackagePdfArtifactSnapshot\(/);
  assert.doesNotMatch(refreshSlice, /refreshCaseExportPackagePdfArtifactSnapshot\(/);
  assert.doesNotMatch(refreshSlice, /persistCaseExportPackageBundleManifestSnapshot\(/);
  assert.doesNotMatch(refreshSlice, /refreshCaseExportPackageBundleManifestSnapshot\(/);
  assert.doesNotMatch(refreshSlice, /persistCaseExportPackageBundleArchiveArtifactSnapshot\(/);
  assert.doesNotMatch(refreshSlice, /refreshCaseExportPackageBundleArchiveArtifactSnapshot\(/);

  assert.match(
    docxArtifactRefreshTestText,
    /const refreshed = await refreshCaseExportPackageDocxArtifactSnapshot\("case-1", \{\s*storageDir,\s*\}\);/s,
  );
  assert.match(
    docxArtifactRefreshTestText,
    /const first = await refreshCaseExportPackageDocxArtifactSnapshot\("case-1", \{\s*storageDir,\s*\}\);/s,
  );
  assert.match(
    docxArtifactRefreshTestText,
    /const second = await refreshCaseExportPackageDocxArtifactSnapshot\("case-1", \{\s*storageDir,\s*\}\);/s,
  );
  assert.match(docxArtifactRefreshTestText, /assert\.deepEqual\(latest, refreshed\);/);

  assert.match(
    docxArtifactRefreshApiTestText,
    /docs freeze the thin authenticated export_package_docx_artifact refresh seam as a distinct canonical runtime\/refresh seam/,
  );
  assert.match(
    apiIndexText,
    /const latestExportPackageSnapshot = await getLatestCaseExportPackageSnapshot\(\s*routeMatch\.caseId,\s*options,\s*\);/s,
  );
  assert.match(
    apiIndexText,
    /await refreshCaseExportPackageDocxArtifactSnapshot\(routeMatch\.caseId, options\)/,
  );
  assert.match(
    apiIndexText,
    /error\.code === "ERR_EXPORT_PACKAGE_DOCX_ARTIFACT_INVALID"/,
  );
});
