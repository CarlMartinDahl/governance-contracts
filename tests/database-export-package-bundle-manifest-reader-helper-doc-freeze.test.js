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

test("docs freeze the shared database export-package bundle/package manifest reader seam as the persisted latest manifest boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared Database Export-Package Bundle Manifest Reader Helper Seam Freeze[\s\S]*?(?=\n### )/,
  );
  const readerStart = databaseIndexText.indexOf(
    "async function getLatestCaseExportPackageBundleManifestSnapshot(",
  );
  const projectionStart = databaseIndexText.indexOf(
    "async function getLatestCaseExportPackageBundleManifestProjection(",
    readerStart,
  );
  const projectionEnd = databaseIndexText.indexOf(
    "async function getLatestCaseExportPackageProjection(",
    projectionStart,
  );

  assert.ok(docsSectionMatch, "expected export-package bundle manifest reader docs section");
  assert.notEqual(
    readerStart,
    -1,
    "expected getLatestCaseExportPackageBundleManifestSnapshot helper",
  );
  assert.notEqual(
    projectionStart,
    -1,
    "expected bundle/package manifest projection wrapper boundary",
  );
  assert.notEqual(projectionEnd, -1, "expected next helper boundary");

  const docsSection = docsSectionMatch[0];
  const readerSlice = databaseIndexText.slice(readerStart, projectionStart);
  const projectionWrapperSlice = databaseIndexText.slice(projectionStart, projectionEnd);

  assert.match(
    docsSection,
    /Shared Database Export-Package Bundle Manifest Reader Helper Seam Freeze/i,
  );
  assert.match(
    docsSection,
    /shared `packages\/database\/src\/index\.js` `getLatestCaseExportPackageBundleManifestSnapshot` helper is the canonical persisted case-level latest `export_package_bundle_manifest` snapshot reader boundary/i,
  );
  assert.match(
    docsSection,
    /currently evidenced included database\/runtime surfaces in this freeze are limited to:\s+`packages\/database\/src\/index\.js` export surface\s+current shared in-package projection-wrapper and refresh-helper reuse in `packages\/database\/src\/index\.js`\s+current bounded direct runtime reuse in `apps\/api\/src\/index\.js`\s+current runtime proof in `tests\/export-package-bundle-manifest-persistence\.test\.js`\s+current runtime proof in `tests\/export-package-bundle-manifest-refresh\.test\.js`\s+current runtime\/helper proof in `tests\/export-package-bundle-archive-artifact-refresh-api\.test\.js`/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageBundleManifestSnapshot` rejecting invalid `caseId` values through `createPersistenceError\("ERR_CASE_ID_INVALID", "caseId must be a non-empty string"\)`/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageBundleManifestSnapshot` loading the bundle\/package manifest snapshot store through `readStore\(exportPackageBundleManifestSnapshotsFileName, options\)`/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageBundleManifestSnapshot` returning `null` when no persisted case-level bundle\/package manifest snapshot record list exists/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageBundleManifestSnapshot` returning `caseSnapshots\[caseSnapshots\.length - 1\]\.export_package_bundle_manifest_payload` unchanged as the canonical latest persisted `export_package_bundle_manifest` payload/i,
  );
  assert.match(
    docsSection,
    /current relationship to the broader already-frozen case-level persisted `export_package_bundle_manifest` seam is limited to this helper being the narrower persisted latest-reader boundary inside that broader persistence seam, while persisted write and persisted refresh remain separate adjacent surfaces/i,
  );
  assert.match(
    docsSection,
    /current relationship to the nearby bundle\/package manifest projection wrapper already evidenced in repo code is limited to `getLatestCaseExportPackageBundleManifestProjection` reusing this helper as the prerequisite latest bundle\/package manifest snapshot read, then delegating projection assembly through `resolveExportPackageBundleManifestProjection\(exportPackageBundleManifestSnapshot, currentExportPackageSnapshot, \{ jsonArtifactSnapshot, markdownArtifactSnapshot, pdfArtifactSnapshot, docxArtifactSnapshot \}\)`/i,
  );
  assert.match(
    docsSection,
    /current relationship to adjacent database\/runtime flows already evidenced in repo code is limited to `refreshCaseExportPackageBundleArchiveArtifactSnapshot` reusing this helper as the prerequisite latest bundle\/package manifest snapshot read before separate final bundle\/archive refresh orchestration continues, and `handleCaseExportPackageBundleArchiveArtifactRefreshRoute` importing and invoking this helper as the prerequisite latest bundle\/package manifest snapshot lookup before separate route-edge authorization, profile-basis checks, and refresh response behavior continue/i,
  );
  assert.match(
    docsSection,
    /current returned canonical persisted shape already evidenced for this helper seam is limited to the stored canonical `export_package_bundle_manifest_payload` object returned unchanged from the latest persisted bundle\/package manifest snapshot record/i,
  );
  assert.match(
    docsSection,
    /current bounded live-code reuse already evidenced in `packages\/database\/src\/index\.js` is limited to:/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageBundleManifestSnapshot` being reused by `getLatestCaseExportPackageBundleManifestProjection`/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageBundleManifestSnapshot` being reused by `refreshCaseExportPackageBundleArchiveArtifactSnapshot`/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageBundleManifestSnapshot` being exposed from `packages\/database\/src\/index\.js`/i,
  );
  assert.match(
    docsSection,
    /current bounded direct runtime reuse already evidenced in `apps\/api\/src\/index\.js` is limited to the current `handleCaseExportPackageBundleArchiveArtifactRefreshRoute` importing and invoking this helper/i,
  );
  assert.match(
    docsSection,
    /already-frozen database export-package snapshot reader-helper seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /already-frozen database export-package bundle\/archive artifact reader-helper seam remains outside this helper seam/i,
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
    /future database helpers that need the same persisted latest bundle\/package manifest read behavior should extend the existing `getLatestCaseExportPackageBundleManifestSnapshot` seam instead of introducing a parallel bundle\/package manifest reader stack/i,
  );
  assert.match(
    docsSection,
    /does not change runtime behavior, persistence semantics, filesystem behavior, API behavior, or fail-closed behavior/i,
  );

  assert.match(
    readerSlice,
    /async function getLatestCaseExportPackageBundleManifestSnapshot\(\s*caseId,\s*options = \{\},\s*\)\s*\{/,
  );
  assert.match(
    readerSlice,
    /throw createPersistenceError\("ERR_CASE_ID_INVALID", "caseId must be a non-empty string"\);/,
  );
  assert.match(
    readerSlice,
    /const store = await readStore\(exportPackageBundleManifestSnapshotsFileName, options\);/,
  );
  assert.match(readerSlice, /const caseSnapshots = store\[caseId\];/);
  assert.match(
    readerSlice,
    /if \(!Array\.isArray\(caseSnapshots\) \|\| caseSnapshots\.length === 0\) \{\s*return null;\s*\}/s,
  );
  assert.match(
    readerSlice,
    /return caseSnapshots\[caseSnapshots\.length - 1\]\.export_package_bundle_manifest_payload;/,
  );

  assert.match(
    projectionWrapperSlice,
    /const exportPackageBundleManifestSnapshot =\s+await getLatestCaseExportPackageBundleManifestSnapshot\(caseId, options\);/s,
  );
  assert.match(
    projectionWrapperSlice,
    /const currentExportPackageSnapshot = await getLatestCaseExportPackageSnapshot\(\s*caseId,\s*options,\s*\);/s,
  );
  assert.match(
    projectionWrapperSlice,
    /return resolveExportPackageBundleManifestProjection\(\s*exportPackageBundleManifestSnapshot,\s*currentExportPackageSnapshot,\s*\{\s*jsonArtifactSnapshot:/s,
  );

  assert.deepEqual(
    collectLineMatches(
      databaseIndexText,
      /getLatestCaseExportPackageBundleManifestSnapshot/,
    ),
    [462, 489, 1410, 1570],
  );
  assert.deepEqual(
    collectLineMatches(
      databaseIndexText,
      /^\s*getLatestCaseExportPackageBundleManifestSnapshot,\s*$/,
    ),
    [1570],
  );
  assert.deepEqual(
    collectLineMatches(apiIndexText, /getLatestCaseExportPackageBundleManifestSnapshot/),
    [3, 668],
  );

  assert.doesNotMatch(readerSlice, /persistCaseExportPackageBundleManifestSnapshot\(/);
  assert.doesNotMatch(readerSlice, /refreshCaseExportPackageBundleManifestSnapshot\(/);
  assert.doesNotMatch(readerSlice, /getLatestCaseExportPackageSnapshot\(/);
  assert.doesNotMatch(readerSlice, /getLatestCaseExportPackageBundleArchiveArtifactSnapshot\(/);
  assert.doesNotMatch(readerSlice, /getLatestCaseReleaseEvalRun\(/);
  assert.doesNotMatch(readerSlice, /getLatestCaseProfileDossierProjection\(/);
  assert.doesNotMatch(readerSlice, /getCaseProfileInputs\(/);
  assert.doesNotMatch(readerSlice, /resolveExportPackageBundleManifestProjection\(/);

  assert.match(
    bundleManifestPersistenceTestText,
    /const latest = await getLatestCaseExportPackageBundleManifestSnapshot\("case-1", \{\s*storageDir,\s*\}\);/s,
  );
  assert.match(
    bundleManifestPersistenceTestText,
    /test\("latest bundle\/package manifest retrieval works at case level"/,
  );
  assert.match(
    bundleManifestPersistenceTestText,
    /const latestCaseOne = await getLatestCaseExportPackageBundleManifestSnapshot\("case-1", \{\s*storageDir,\s*\}\);/s,
  );
  assert.match(
    bundleManifestPersistenceTestText,
    /const latestCaseTwo = await getLatestCaseExportPackageBundleManifestSnapshot\("case-2", \{\s*storageDir,\s*\}\);/s,
  );
  assert.match(
    bundleManifestPersistenceTestText,
    /assert\.equal\(latest, null\);/,
  );
  assert.match(
    bundleManifestPersistenceTestText,
    /assert\.deepEqual\(latest\.artifacts, payload\.artifacts\);/,
  );

  assert.match(
    bundleManifestRefreshTestText,
    /test\("canonical refresh\/create persists a valid SWE_BODELNING bundle\/package manifest snapshot"/,
  );
  assert.match(
    bundleManifestRefreshTestText,
    /const latest = await getLatestCaseExportPackageBundleManifestSnapshot\("case-1", \{\s*storageDir,\s*}\);/s,
  );
  assert.match(
    bundleManifestRefreshTestText,
    /assert\.deepEqual\(latest, refreshed\);/,
  );
  assert.match(
    bundleManifestRefreshTestText,
    /test\("existing read helpers return the persisted bundle\/package manifest snapshot unchanged"/,
  );

  assert.match(
    apiIndexText,
    /async function handleCaseExportPackageBundleArchiveArtifactRefreshRoute\(/,
  );
  assert.match(
    apiIndexText,
    /await getLatestCaseExportPackageBundleManifestSnapshot\(\s*routeMatch\.caseId,\s*options\s*\)/,
  );
  assert.match(
    bundleArchiveRefreshApiTestText,
    /handleCaseExportPackageBundleArchiveArtifactRefreshRoute/,
  );
  assert.match(
    bundleArchiveRefreshApiTestText,
    /getLatestCaseExportPackageBundleManifestSnapshot/,
  );
});
