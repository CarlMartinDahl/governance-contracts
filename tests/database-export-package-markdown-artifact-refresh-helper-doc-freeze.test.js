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
const markdownArtifactRefreshTestText = fs.readFileSync(
  path.join(__dirname, "export-package-markdown-artifact-refresh.test.js"),
  "utf8",
);
const markdownArtifactRefreshApiTestText = fs.readFileSync(
  path.join(__dirname, "export-package-markdown-artifact-refresh-api.test.js"),
  "utf8",
);

function collectLineMatches(text, pattern) {
  const linePattern = new RegExp(pattern.source, pattern.flags.replaceAll("g", ""));
  return text.split("\n").flatMap((line, index) => (
    linePattern.test(line) ? [index + 1] : []
  ));
}

test("docs freeze the shared database export-package Markdown artifact refresh helper seam as the persisted refresh boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared Database Export-Package Markdown Artifact Refresh Helper Seam Freeze[\s\S]*?(?=\n### )/,
  );
  const refreshStart = databaseIndexText.indexOf(
    "async function refreshCaseExportPackageMarkdownArtifactSnapshot(",
  );
  const refreshEnd = databaseIndexText.indexOf(
    "async function refreshCaseExportPackageBundleManifestSnapshot(",
    refreshStart,
  );

  assert.ok(
    docsSectionMatch,
    "expected export-package Markdown artifact refresh helper docs section",
  );
  assert.notEqual(
    refreshStart,
    -1,
    "expected refreshCaseExportPackageMarkdownArtifactSnapshot helper",
  );
  assert.notEqual(refreshEnd, -1, "expected next helper boundary");

  const docsSection = docsSectionMatch[0];
  const refreshSlice = databaseIndexText.slice(refreshStart, refreshEnd);

  assert.match(
    docsSection,
    /Shared Database Export-Package Markdown Artifact Refresh Helper Seam Freeze/i,
  );
  assert.match(
    docsSection,
    /shared `packages\/database\/src\/index\.js` `refreshCaseExportPackageMarkdownArtifactSnapshot` helper is the canonical persisted case-level `export_package_markdown_artifact` refresh-helper boundary/i,
  );
  assert.match(
    docsSection,
    /currently evidenced included database\/runtime surfaces in this freeze are limited to:\s+`packages\/database\/src\/index\.js` export surface\s+current bounded direct runtime reuse in `apps\/api\/src\/index\.js`\s+current runtime proof in `tests\/export-package-markdown-artifact-refresh\.test\.js`\s+current runtime\/helper proof in `tests\/export-package-markdown-artifact-refresh-api\.test\.js`/i,
  );
  assert.match(
    docsSection,
    /current `packages\/database` refresh boundary already does this through the existing shared refresh helper with bounded direct runtime reuse in the thin Markdown artifact refresh route and no current direct latest-read or current-only delivery route reuse/i,
  );
  assert.match(
    docsSection,
    /`refreshCaseExportPackageMarkdownArtifactSnapshot` rejecting invalid `caseId` values through `createPersistenceError\("ERR_CASE_ID_INVALID", "caseId must be a non-empty string"\)`/i,
  );
  assert.match(
    docsSection,
    /`refreshCaseExportPackageMarkdownArtifactSnapshot` loading the prerequisite latest export-package snapshot through the already-frozen reader seam `getLatestCaseExportPackageSnapshot\(caseId, options\)`/i,
  );
  assert.match(
    docsSection,
    /`refreshCaseExportPackageMarkdownArtifactSnapshot` rejecting missing persisted export-package snapshots through `createPersistenceError\("ERR_EXPORT_PACKAGE_SNAPSHOT_NOT_FOUND", "export package snapshot must exist before Markdown export artifact refresh", \{ case_id: caseId \}\)`/i,
  );
  assert.match(
    docsSection,
    /`refreshCaseExportPackageMarkdownArtifactSnapshot` delegating canonical Markdown artifact derivation through the shared governance helper `deriveExportPackageMarkdownArtifact\(exportPackageSnapshot\)`/i,
  );
  assert.match(
    docsSection,
    /`refreshCaseExportPackageMarkdownArtifactSnapshot` delegating final persisted write ownership through the existing persistence helper `persistCaseExportPackageMarkdownArtifactSnapshot\(caseId, canonicalExportPackageMarkdownArtifact, options\)`/i,
  );
  assert.match(
    docsSection,
    /`refreshCaseExportPackageMarkdownArtifactSnapshot` returning the canonical persisted Markdown artifact snapshot delegated back from `persistCaseExportPackageMarkdownArtifactSnapshot\(\.\.\.\)`/i,
  );
  assert.match(
    docsSection,
    /current relationship to the broader already-frozen case-level persisted `export_package_markdown_artifact` seam is limited to this helper being the narrower persisted refresh boundary inside that broader persistence seam, while latest-read and direct persisted-write remain separate adjacent surfaces/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen Markdown artifact snapshot-reader seam is negative and separate because this refresh helper does not perform Markdown artifact latest-read ownership and does not call `getLatestCaseExportPackageMarkdownArtifactSnapshot\(\.\.\.\)`/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen Markdown artifact projection-helper seam is negative and separate because this refresh helper does not perform Markdown artifact projection\/currentness ownership and does not call `getLatestCaseExportPackageMarkdownArtifactProjection\(\.\.\.\)`/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen export-package snapshot-reader seam is limited to `refreshCaseExportPackageMarkdownArtifactSnapshot` loading `getLatestCaseExportPackageSnapshot\(caseId, options\)` as the prerequisite latest persisted export-package snapshot before separate Markdown artifact refresh orchestration continues/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen export-package projection-helper seam is negative and separate because this refresh helper does not call `getLatestCaseExportPackageProjection\(\.\.\.\)` and does not perform export-package projection\/currentness ownership/i,
  );
  assert.match(
    docsSection,
    /current relationship to the shared governance Markdown artifact derivation\/projection helper seams is limited to `refreshCaseExportPackageMarkdownArtifactSnapshot` delegating Markdown artifact derivation through `deriveExportPackageMarkdownArtifact\(exportPackageSnapshot\)`; Markdown artifact projection resolution remains a separate governance boundary/i,
  );
  assert.match(
    docsSection,
    /current relationship to the shared export refresh invalid-contract API envelope partition is limited to route\/runtime consumers surfacing machine-readable invalid-contract responses from this helper path where governance derivation or final persisted validation rejects input; the envelope partition itself remains a separate higher API boundary/i,
  );
  assert.match(
    docsSection,
    /current bounded live-code reuse already evidenced in `packages\/database\/src\/index\.js` is limited to `refreshCaseExportPackageMarkdownArtifactSnapshot` being exposed from `packages\/database\/src\/index\.js`/i,
  );
  assert.match(
    docsSection,
    /current bounded direct runtime reuse already evidenced in `apps\/api\/src\/index\.js` is limited to:\s+`handleCaseExportPackageMarkdownArtifactRefreshRoute`/i,
  );
  assert.match(
    docsSection,
    /no current direct runtime reuse is evidenced in `apps\/api\/src\/index\.js` for:\s+`handleCaseExportPackageMarkdownArtifactLatestRoute`\s+`handleCaseExportPackageMarkdownArtifactDownloadRoute`/i,
  );
  assert.match(
    docsSection,
    /already-frozen broader case-level persisted `export_package_markdown_artifact` seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /already-frozen thin authenticated `POST \/cases\/:caseId\/export-package\/markdown-artifact\/refresh` seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /already-frozen thin authenticated `GET \/cases\/:caseId\/export-package\/markdown-artifact\/latest` seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /already-frozen thin authenticated `GET \/cases\/:caseId\/export-package\/markdown-artifact\/download` seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /already-frozen Markdown artifact snapshot-reader seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /already-frozen Markdown artifact projection-helper seam remains outside this helper seam/i,
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
    /sibling JSON, PDF, DOCX, bundle\/package manifest, and final bundle\/archive refresh\/helper families remain outside this helper seam/i,
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
    /shared governance Markdown artifact derivation helper seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /future database helpers that need the same persisted Markdown artifact refresh behavior should extend the existing `refreshCaseExportPackageMarkdownArtifactSnapshot` seam instead of introducing a parallel Markdown artifact refresh stack/i,
  );
  assert.match(
    docsSection,
    /does not change runtime behavior, refresh semantics, persistence semantics, filesystem behavior, API behavior, or fail-closed behavior/i,
  );

  assert.match(
    refreshSlice,
    /async function refreshCaseExportPackageMarkdownArtifactSnapshot\(\s*caseId,\s*options = \{\},?\s*\)\s*\{/,
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
    /throw createPersistenceError\(\s*"ERR_EXPORT_PACKAGE_SNAPSHOT_NOT_FOUND",\s*"export package snapshot must exist before Markdown export artifact refresh",\s*\{ case_id: caseId \},\s*\);/s,
  );
  assert.match(
    refreshSlice,
    /const canonicalExportPackageMarkdownArtifact =\s*deriveExportPackageMarkdownArtifact\(exportPackageSnapshot\);/s,
  );
  assert.match(
    refreshSlice,
    /return persistCaseExportPackageMarkdownArtifactSnapshot\(\s*caseId,\s*canonicalExportPackageMarkdownArtifact,\s*options,\s*\);/s,
  );

  assert.deepEqual(
    collectLineMatches(databaseIndexText, /refreshCaseExportPackageMarkdownArtifactSnapshot/),
    [1288, 1596],
  );
  assert.deepEqual(
    collectLineMatches(
      databaseIndexText,
      /^\s*refreshCaseExportPackageMarkdownArtifactSnapshot,\s*$/,
    ),
    [1596],
  );
  assert.deepEqual(
    collectLineMatches(apiIndexText, /refreshCaseExportPackageMarkdownArtifactSnapshot/),
    [19, 1936],
  );

  assert.doesNotMatch(refreshSlice, /getLatestCaseExportPackageMarkdownArtifactSnapshot\(/);
  assert.doesNotMatch(refreshSlice, /getLatestCaseExportPackageMarkdownArtifactProjection\(/);
  assert.doesNotMatch(refreshSlice, /getLatestCaseExportPackageProjection\(/);
  assert.doesNotMatch(refreshSlice, /resolveExportPackageMarkdownArtifactProjection\(/);
  assert.doesNotMatch(refreshSlice, /handleCaseExportPackageMarkdownArtifactRefreshRoute\(/);
  assert.doesNotMatch(refreshSlice, /handleCaseExportPackageMarkdownArtifactLatestRoute\(/);
  assert.doesNotMatch(refreshSlice, /handleCaseExportPackageMarkdownArtifactDownloadRoute\(/);
  assert.doesNotMatch(refreshSlice, /errorResponse\(/);
  assert.doesNotMatch(refreshSlice, /readStore\(/);
  assert.doesNotMatch(refreshSlice, /writeStore\(/);
  assert.doesNotMatch(refreshSlice, /persistCaseExportPackageJsonArtifactSnapshot\(/);
  assert.doesNotMatch(refreshSlice, /refreshCaseExportPackageJsonArtifactSnapshot\(/);
  assert.doesNotMatch(refreshSlice, /persistCaseExportPackageBundleManifestSnapshot\(/);
  assert.doesNotMatch(refreshSlice, /refreshCaseExportPackageBundleManifestSnapshot\(/);
  assert.doesNotMatch(refreshSlice, /persistCaseExportPackageBundleArchiveArtifactSnapshot\(/);
  assert.doesNotMatch(refreshSlice, /refreshCaseExportPackageBundleArchiveArtifactSnapshot\(/);

  assert.match(
    markdownArtifactRefreshTestText,
    /const refreshed = await refreshCaseExportPackageMarkdownArtifactSnapshot\("case-1", \{\s*storageDir,\s*\}\);/s,
  );
  assert.match(
    markdownArtifactRefreshTestText,
    /const first = await refreshCaseExportPackageMarkdownArtifactSnapshot\("case-1", \{\s*storageDir,\s*\}\);/s,
  );
  assert.match(
    markdownArtifactRefreshTestText,
    /const second = await refreshCaseExportPackageMarkdownArtifactSnapshot\("case-1", \{\s*storageDir,\s*\}\);/s,
  );
  assert.match(markdownArtifactRefreshTestText, /assert\.deepEqual\(latest, refreshed\);/);

  assert.match(
    markdownArtifactRefreshApiTestText,
    /docs freeze the thin authenticated export_package_markdown_artifact refresh seam as a distinct canonical runtime\/refresh seam/,
  );
  assert.match(
    apiIndexText,
    /const latestExportPackageSnapshot = await getLatestCaseExportPackageSnapshot\(\s*routeMatch\.caseId,\s*options,\s*\);/s,
  );
  assert.match(
    apiIndexText,
    /await refreshCaseExportPackageMarkdownArtifactSnapshot\(\s*routeMatch\.caseId,\s*options,\s*\)/,
  );
  assert.match(
    apiIndexText,
    /error\.code === "ERR_EXPORT_PACKAGE_MARKDOWN_ARTIFACT_INVALID"/,
  );
});
