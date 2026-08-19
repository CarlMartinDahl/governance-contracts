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
const bundleArchiveApiTestText = fs.readFileSync(
  path.join(__dirname, "export-package-bundle-archive-artifact-api.test.js"),
  "utf8",
);

function collectLineMatches(text, pattern) {
  const linePattern = new RegExp(pattern.source, pattern.flags.replaceAll("g", ""));
  return text.split("\n").flatMap((line, index) => (
    linePattern.test(line) ? [index + 1] : []
  ));
}

test("docs freeze the shared database export-package bundle/archive artifact reader seam as the persisted latest final artifact boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared Database Export-Package Bundle Archive Artifact Reader Helper Seam Freeze[\s\S]*?(?=\n### )/,
  );
  const readerStart = databaseIndexText.indexOf(
    "async function getLatestCaseExportPackageBundleArchiveArtifactSnapshot(",
  );
  const projectionStart = databaseIndexText.indexOf(
    "async function getLatestCaseExportPackageBundleArchiveArtifactProjection(",
    readerStart,
  );
  const projectionEnd = databaseIndexText.indexOf(
    "async function getLatestCaseExportPackageBundleManifestSnapshot(",
    projectionStart,
  );

  assert.ok(
    docsSectionMatch,
    "expected export-package bundle/archive artifact reader docs section",
  );
  assert.notEqual(
    readerStart,
    -1,
    "expected getLatestCaseExportPackageBundleArchiveArtifactSnapshot helper",
  );
  assert.notEqual(
    projectionStart,
    -1,
    "expected bundle/archive projection wrapper boundary",
  );
  assert.notEqual(projectionEnd, -1, "expected next helper boundary");

  const docsSection = docsSectionMatch[0];
  const readerSlice = databaseIndexText.slice(readerStart, projectionStart);
  const projectionWrapperSlice = databaseIndexText.slice(projectionStart, projectionEnd);

  assert.match(
    docsSection,
    /Shared Database Export-Package Bundle Archive Artifact Reader Helper Seam Freeze/i,
  );
  assert.match(
    docsSection,
    /shared `packages\/database\/src\/index\.js` `getLatestCaseExportPackageBundleArchiveArtifactSnapshot` helper is the canonical persisted case-level latest `export_package_bundle_archive_artifact` snapshot reader boundary/i,
  );
  assert.match(
    docsSection,
    /currently evidenced included database\/runtime surfaces in this freeze are limited to:\s+`packages\/database\/src\/index\.js` export surface\s+current shared in-package projection-wrapper reuse in `packages\/database\/src\/index\.js`\s+current runtime proof in `tests\/export-package-bundle-archive-artifact-persistence\.test\.js`\s+current runtime proof in `tests\/export-package-bundle-archive-artifact-refresh\.test\.js`\s+current runtime\/helper proof in `tests\/export-package-bundle-archive-artifact-api\.test\.js`/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageBundleArchiveArtifactSnapshot` rejecting invalid `caseId` values through `createPersistenceError\("ERR_CASE_ID_INVALID", "caseId must be a non-empty string"\)`/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageBundleArchiveArtifactSnapshot` loading the final bundle\/archive artifact snapshot store through `readStore\(exportPackageBundleArchiveArtifactSnapshotsFileName, options\)`/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageBundleArchiveArtifactSnapshot` returning `null` when no persisted case-level final bundle\/archive artifact snapshot record list exists/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageBundleArchiveArtifactSnapshot` returning `caseSnapshots\[caseSnapshots\.length - 1\]\.export_package_bundle_archive_artifact_payload` unchanged as the canonical latest persisted `export_package_bundle_archive_artifact` payload/i,
  );
  assert.match(
    docsSection,
    /current relationship to the broader already-frozen case-level persisted `export_package_bundle_archive_artifact` seam is limited to this helper being the narrower persisted latest-reader boundary inside that broader persistence seam, while persisted write and persisted refresh remain separate adjacent surfaces/i,
  );
  assert.match(
    docsSection,
    /current relationship to the nearby final bundle\/archive projection wrapper already evidenced in repo code is limited to `getLatestCaseExportPackageBundleArchiveArtifactProjection` reusing this helper as the prerequisite latest final bundle\/archive artifact snapshot read, then delegating projection assembly through `resolveExportPackageBundleArchiveArtifactProjection\(exportPackageBundleArchiveArtifactSnapshot, await getLatestCaseExportPackageBundleManifestProjection\(caseId, options\)\)`/i,
  );
  assert.match(
    docsSection,
    /current returned canonical persisted shape already evidenced for this helper seam is limited to the stored canonical `export_package_bundle_archive_artifact_payload` object returned unchanged from the latest persisted final bundle\/archive artifact snapshot record/i,
  );
  assert.match(
    docsSection,
    /current bounded live-code reuse already evidenced in `packages\/database\/src\/index\.js` is limited to:/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageBundleArchiveArtifactSnapshot` being reused by `getLatestCaseExportPackageBundleArchiveArtifactProjection`/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageBundleArchiveArtifactSnapshot` being exposed from `packages\/database\/src\/index\.js`/i,
  );
  assert.match(
    docsSection,
    /no current direct live-route reuse is evidenced in `apps\/api\/src\/index\.js`/i,
  );
  assert.match(
    docsSection,
    /already-frozen database export-package snapshot reader-helper seam remains outside this helper seam/i,
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
    /future database helpers that need the same persisted latest final bundle\/archive artifact read behavior should extend the existing `getLatestCaseExportPackageBundleArchiveArtifactSnapshot` seam instead of introducing a parallel final bundle\/archive artifact reader stack/i,
  );
  assert.match(
    docsSection,
    /does not change runtime behavior, persistence semantics, filesystem behavior, API behavior, or fail-closed behavior/i,
  );

  assert.match(
    readerSlice,
    /async function getLatestCaseExportPackageBundleArchiveArtifactSnapshot\(\s*caseId,\s*options = \{\},\s*\)\s*\{/,
  );
  assert.match(
    readerSlice,
    /throw createPersistenceError\("ERR_CASE_ID_INVALID", "caseId must be a non-empty string"\);/,
  );
  assert.match(
    readerSlice,
    /const store = await readStore\(exportPackageBundleArchiveArtifactSnapshotsFileName, options\);/,
  );
  assert.match(readerSlice, /const caseSnapshots = store\[caseId\];/);
  assert.match(
    readerSlice,
    /if \(!Array\.isArray\(caseSnapshots\) \|\| caseSnapshots\.length === 0\) \{\s*return null;\s*\}/s,
  );
  assert.match(
    readerSlice,
    /return caseSnapshots\[caseSnapshots\.length - 1\]\.export_package_bundle_archive_artifact_payload;/,
  );

  assert.match(
    projectionWrapperSlice,
    /const exportPackageBundleArchiveArtifactSnapshot =\s+await getLatestCaseExportPackageBundleArchiveArtifactSnapshot\(caseId, options\);/s,
  );
  assert.match(
    projectionWrapperSlice,
    /return resolveExportPackageBundleArchiveArtifactProjection\(\s*exportPackageBundleArchiveArtifactSnapshot,\s*await getLatestCaseExportPackageBundleManifestProjection\(caseId, options\),\s*\);/s,
  );

  assert.deepEqual(
    collectLineMatches(
      databaseIndexText,
      /getLatestCaseExportPackageBundleArchiveArtifactSnapshot/,
    ),
    [423, 450, 1568],
  );
  assert.deepEqual(
    collectLineMatches(
      databaseIndexText,
      /^\s*getLatestCaseExportPackageBundleArchiveArtifactSnapshot,\s*$/,
    ),
    [1568],
  );
  assert.deepEqual(
    collectLineMatches(apiIndexText, /getLatestCaseExportPackageBundleArchiveArtifactSnapshot/),
    [],
  );

  assert.doesNotMatch(readerSlice, /persistCaseExportPackageBundleArchiveArtifactSnapshot\(/);
  assert.doesNotMatch(readerSlice, /refreshCaseExportPackageBundleArchiveArtifactSnapshot\(/);
  assert.doesNotMatch(readerSlice, /getLatestCaseExportPackageSnapshot\(/);
  assert.doesNotMatch(readerSlice, /getLatestCaseReleaseEvalRun\(/);
  assert.doesNotMatch(readerSlice, /getLatestCaseProfileDossierProjection\(/);
  assert.doesNotMatch(readerSlice, /getCaseProfileInputs\(/);
  assert.doesNotMatch(readerSlice, /resolveExportPackageBundleArchiveArtifactProjection\(/);

  assert.match(
    bundleArchivePersistenceTestText,
    /const latest = await getLatestCaseExportPackageBundleArchiveArtifactSnapshot\("case-1", \{\s*storageDir,\s*\}\);/s,
  );
  assert.match(
    bundleArchivePersistenceTestText,
    /test\("latest final bundle\/archive artifact retrieval works at case level"/,
  );
  assert.match(
    bundleArchivePersistenceTestText,
    /const latestCaseOne = await getLatestCaseExportPackageBundleArchiveArtifactSnapshot\("case-1", \{\s*storageDir,\s*\}\);/s,
  );
  assert.match(
    bundleArchivePersistenceTestText,
    /const latestCaseTwo = await getLatestCaseExportPackageBundleArchiveArtifactSnapshot\("case-2", \{\s*storageDir,\s*\}\);/s,
  );
  assert.match(
    bundleArchivePersistenceTestText,
    /assert\.equal\(latest, null\);/,
  );
  assert.match(
    bundleArchivePersistenceTestText,
    /assert\.equal\(latest\.body_base64, payload\.body_base64\);/,
  );
  assert.match(
    bundleArchivePersistenceTestText,
    /latest\.bundle_manifest_fingerprint,/,
  );

  assert.match(
    bundleArchiveRefreshTestText,
    /test\("canonical refresh\/create persists a valid SWE_BODELNING final bundle\/archive artifact snapshot"/,
  );
  assert.match(
    bundleArchiveRefreshTestText,
    /const latest = await getLatestCaseExportPackageBundleArchiveArtifactSnapshot\("case-1", \{\s*storageDir,\s*\}\);/s,
  );
  assert.match(
    bundleArchiveRefreshTestText,
    /assert\.deepEqual\(latest, refreshed\);/,
  );
  assert.match(
    bundleArchiveRefreshTestText,
    /test\("existing read helpers return the persisted final bundle\/archive artifact snapshot unchanged"/,
  );

  assert.match(
    bundleArchiveApiTestText,
    /const latestSnapshot = await getLatestCaseExportPackageBundleArchiveArtifactSnapshot\("case-6", \{\s*storageDir,\s*\}\);/s,
  );
  assert.match(
    bundleArchiveApiTestText,
    /assert\.deepEqual\(persistedFields, latestSnapshot\);/,
  );
});
