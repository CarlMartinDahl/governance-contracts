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
const exportPackagePersistenceTestText = fs.readFileSync(
  path.join(__dirname, "export-package-persistence.test.js"),
  "utf8",
);
const exportPackageRefreshTestText = fs.readFileSync(
  path.join(__dirname, "export-package-refresh.test.js"),
  "utf8",
);
const bundleArchiveHelperTestText = fs.readFileSync(
  path.join(__dirname, "export-package-bundle-archive-artifact-helper.test.js"),
  "utf8",
);

function collectLineMatches(text, pattern) {
  const linePattern = new RegExp(pattern.source, pattern.flags.replaceAll("g", ""));
  return text.split("\n").flatMap((line, index) => (
    linePattern.test(line) ? [index + 1] : []
  ));
}

test("docs freeze the shared database export-package snapshot reader seam as the persisted latest export-package snapshot boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared Database Export-Package Snapshot Reader Helper Seam Freeze[\s\S]*?(?=\n### )/,
  );
  const readerStart = databaseIndexText.indexOf(
    "async function getLatestCaseExportPackageSnapshot(",
  );
  const readerEnd = databaseIndexText.indexOf(
    "async function getLatestCaseExportPackageBundleArchiveArtifactSnapshot(",
    readerStart,
  );

  assert.ok(docsSectionMatch, "expected export-package snapshot reader docs section");
  assert.notEqual(
    readerStart,
    -1,
    "expected getLatestCaseExportPackageSnapshot helper",
  );
  assert.notEqual(readerEnd, -1, "expected next helper boundary");

  const docsSection = docsSectionMatch[0];
  const readerSlice = databaseIndexText.slice(readerStart, readerEnd);

  assert.match(
    docsSection,
    /Shared Database Export-Package Snapshot Reader Helper Seam Freeze/i,
  );
  assert.match(
    docsSection,
    /shared `packages\/database\/src\/index\.js` `getLatestCaseExportPackageSnapshot` helper is the canonical persisted case-level latest `export_package` snapshot reader boundary/i,
  );
  assert.match(
    docsSection,
    /currently evidenced included database\/runtime surfaces in this freeze are limited to:\s+`packages\/database\/src\/index\.js` export surface\s+current shared in-package projection\/helper reuse in `packages\/database\/src\/index\.js`\s+current bounded direct runtime reuse in `apps\/api\/src\/index\.js`\s+current runtime proof in `tests\/export-package-persistence\.test\.js`\s+current runtime proof in `tests\/export-package-refresh\.test\.js`\s+current runtime\/helper proof in `tests\/export-package-bundle-archive-artifact-helper\.test\.js`/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageSnapshot` rejecting invalid `caseId` values through `createPersistenceError\("ERR_CASE_ID_INVALID", "caseId must be a non-empty string"\)`/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageSnapshot` loading the export-package snapshot store through `readStore\(exportPackageSnapshotsFileName, options\)`/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageSnapshot` returning `null` when no persisted case-level export-package snapshot record list exists/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageSnapshot` selecting `caseSnapshots\[caseSnapshots\.length - 1\]` as the persisted latest export-package snapshot record/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageSnapshot` returning `caseSnapshots\[caseSnapshots\.length - 1\]\.export_package_payload` unchanged as the canonical latest persisted `export_package` snapshot payload/i,
  );
  assert.match(
    docsSection,
    /current relationship to the broader already-frozen case-level persisted `export_package` snapshot seam is limited to this helper being the narrower persisted latest-reader boundary inside that broader persistence seam, while persisted write and persisted refresh remain separate adjacent surfaces/i,
  );
  assert.match(
    docsSection,
    /current relationship to export-package persistence\/refresh flows already evidenced in repo code and tests is limited to:/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageBundleManifestProjection`, `getLatestCaseExportPackageProjection`, `getLatestCaseExportPackageDocxArtifactProjection`, `getLatestCaseExportPackagePdfArtifactProjection`, `getLatestCaseExportPackageJsonArtifactProjection`, `getLatestCaseExportPackageMarkdownArtifactProjection`, `refreshCaseExportPackageJsonArtifactSnapshot`, `refreshCaseExportPackageDocxArtifactSnapshot`, `refreshCaseExportPackagePdfArtifactSnapshot`, `refreshCaseExportPackageMarkdownArtifactSnapshot`, and `refreshCaseExportPackageBundleManifestSnapshot` reusing this helper/i,
  );
  assert.match(
    docsSection,
    /current runtime proof that `persistCaseExportPackageSnapshot\(\.\.\.\)` and `refreshCaseExportPackageSnapshot\(\.\.\.\)` produce canonical export-package snapshots which this helper later returns unchanged on latest-read/i,
  );
  assert.match(
    docsSection,
    /current returned canonical persisted shape already evidenced for this helper seam is limited to the stored canonical `export_package_payload` object returned unchanged from the latest persisted export-package snapshot record/i,
  );
  assert.match(
    docsSection,
    /current bounded live-code reuse already evidenced in `packages\/database\/src\/index\.js` is limited to:/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageSnapshot` being reused by `getLatestCaseExportPackageBundleManifestProjection`/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageSnapshot` being reused by `getLatestCaseExportPackageProjection`/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageSnapshot` being reused by `getLatestCaseExportPackageDocxArtifactProjection`/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageSnapshot` being reused by `getLatestCaseExportPackagePdfArtifactProjection`/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageSnapshot` being reused by `getLatestCaseExportPackageJsonArtifactProjection`/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageSnapshot` being reused by `getLatestCaseExportPackageMarkdownArtifactProjection`/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageSnapshot` being reused by `refreshCaseExportPackageJsonArtifactSnapshot`/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageSnapshot` being reused by `refreshCaseExportPackageDocxArtifactSnapshot`/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageSnapshot` being reused by `refreshCaseExportPackagePdfArtifactSnapshot`/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageSnapshot` being reused by `refreshCaseExportPackageMarkdownArtifactSnapshot`/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageSnapshot` being reused by `refreshCaseExportPackageBundleManifestSnapshot`/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageSnapshot` being exposed from `packages\/database\/src\/index\.js`/i,
  );
  assert.match(
    docsSection,
    /current bounded direct runtime reuse already evidenced in `apps\/api\/src\/index\.js` is limited to the current `handleCaseExportPackageBundleManifestRefreshRoute`, `handleCaseExportPackagePdfArtifactRefreshRoute`, `handleCaseExportPackageDocxArtifactRefreshRoute`, `handleCaseExportPackageJsonArtifactRefreshRoute`, and `handleCaseExportPackageMarkdownArtifactRefreshRoute` handlers importing and invoking this helper as the prerequisite latest export-package snapshot lookup/i,
  );
  assert.match(
    docsSection,
    /already-frozen database profile-dossier reader-helper seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /already-frozen database release-eval reader-helper seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /already-frozen database release-eval writer-helper seam and release-eval refresh-helper seam remain outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /already-frozen database case-profile-input writer-helper seam and case-profile-input reader-helper seam remain outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /thin route seams remain outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /shared governance export-package helper seams remain outside this helper seam/i,
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
    /future database helpers that need the same persisted latest export-package snapshot read behavior should extend the existing `getLatestCaseExportPackageSnapshot` seam instead of introducing a parallel export-package reader stack/i,
  );
  assert.match(
    docsSection,
    /does not change runtime behavior, persistence semantics, filesystem behavior, API behavior, or fail-closed behavior/i,
  );

  assert.match(
    readerSlice,
    /async function getLatestCaseExportPackageSnapshot\(\s*caseId,\s*options = \{\}\s*\)\s*\{/,
  );
  assert.match(
    readerSlice,
    /throw createPersistenceError\("ERR_CASE_ID_INVALID", "caseId must be a non-empty string"\);/,
  );
  assert.match(
    readerSlice,
    /const store = await readStore\(exportPackageSnapshotsFileName, options\);/,
  );
  assert.match(readerSlice, /const caseSnapshots = store\[caseId\];/);
  assert.match(
    readerSlice,
    /if \(!Array\.isArray\(caseSnapshots\) \|\| caseSnapshots\.length === 0\) \{\s*return null;\s*\}/s,
  );
  assert.match(
    readerSlice,
    /return caseSnapshots\[caseSnapshots\.length - 1\]\.export_package_payload;/,
  );

  assert.deepEqual(
    collectLineMatches(databaseIndexText, /getLatestCaseExportPackageSnapshot/),
    [408, 495, 527, 599, 652, 690, 749, 1217, 1243, 1268, 1296, 1324, 1580],
  );
  assert.deepEqual(
    collectLineMatches(
      databaseIndexText,
      /^\s*getLatestCaseExportPackageSnapshot,\s*$/,
    ),
    [1580],
  );
  assert.deepEqual(
    collectLineMatches(apiIndexText, /getLatestCaseExportPackageSnapshot/),
    [8, 886, 1609, 1704, 1799, 1897],
  );

  assert.doesNotMatch(readerSlice, /persistCaseExportPackageSnapshot\(/);
  assert.doesNotMatch(readerSlice, /refreshCaseExportPackageSnapshot\(/);
  assert.doesNotMatch(readerSlice, /getLatestCaseReleaseEvalRun\(/);
  assert.doesNotMatch(readerSlice, /getLatestCaseProfileDossierProjection\(/);
  assert.doesNotMatch(readerSlice, /resolvePersistedReleaseEvalProfileDossierProjection\(/);
  assert.doesNotMatch(readerSlice, /getCaseProfileInputs\(/);
  assert.doesNotMatch(readerSlice, /resolveExportPackageProjection\(/);

  assert.match(
    exportPackagePersistenceTestText,
    /test\("valid export package payload roundtrips through persistence"/,
  );
  assert.match(
    exportPackagePersistenceTestText,
    /const latest = await getLatestCaseExportPackageSnapshot\("case-1", \{ storageDir \}\);/,
  );
  assert.match(
    exportPackagePersistenceTestText,
    /test\("latest export package retrieval works at case level"/,
  );
  assert.match(
    exportPackagePersistenceTestText,
    /const latestCaseOne = await getLatestCaseExportPackageSnapshot\("case-1", \{\s*storageDir,\s*\}\);/s,
  );
  assert.match(
    exportPackagePersistenceTestText,
    /const latestCaseTwo = await getLatestCaseExportPackageSnapshot\("case-2", \{\s*storageDir,\s*\}\);/s,
  );
  assert.match(
    exportPackagePersistenceTestText,
    /assert\.equal\(latest, null\);/,
  );

  assert.match(
    exportPackageRefreshTestText,
    /test\("canonical refresh\/create persists a valid SWE_BODELNING export package snapshot"/,
  );
  assert.match(
    exportPackageRefreshTestText,
    /const latest = await getLatestCaseExportPackageSnapshot\("case-1", \{ storageDir \}\);/,
  );
  assert.match(
    exportPackageRefreshTestText,
    /assert\.deepEqual\(latest, refreshed\);/,
  );
  assert.match(
    exportPackageRefreshTestText,
    /test\("existing read helpers return the persisted export package snapshot unchanged"/,
  );

  assert.match(
    bundleArchiveHelperTestText,
    /await getLatestCaseExportPackageSnapshot\("case-1", \{ storageDir \}\),/,
  );
});
