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
const docxArtifactPersistenceTestText = fs.readFileSync(
  path.join(__dirname, "export-package-docx-artifact-persistence.test.js"),
  "utf8",
);
const docxArtifactRefreshTestText = fs.readFileSync(
  path.join(__dirname, "export-package-docx-artifact-refresh.test.js"),
  "utf8",
);
const docxArtifactApiTestText = fs.readFileSync(
  path.join(__dirname, "export-package-docx-artifact-api.test.js"),
  "utf8",
);
const docxArtifactAdapterRegistryTestText = fs.readFileSync(
  path.join(__dirname, "export-package-docx-artifact-adapter-registry.test.js"),
  "utf8",
);

function collectLineMatches(text, pattern) {
  const linePattern = new RegExp(pattern.source, pattern.flags.replaceAll("g", ""));
  return text.split("\n").flatMap((line, index) => (
    linePattern.test(line) ? [index + 1] : []
  ));
}

test("docs freeze the shared database export-package DOCX artifact reader seam as the persisted latest snapshot boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared Database Export-Package DOCX Artifact Reader Helper Seam Freeze[\s\S]*?(?=\n### )/,
  );
  const readerStart = databaseIndexText.indexOf(
    "async function getLatestCaseExportPackageDocxArtifactSnapshot(caseId, options = {}) {",
  );
  const readerEnd = databaseIndexText.indexOf(
    "async function getLatestCaseExportPackageDocxArtifactProjection(caseId, options = {}) {",
    readerStart,
  );

  assert.ok(
    docsSectionMatch,
    "expected export-package DOCX artifact reader docs section",
  );
  assert.notEqual(
    readerStart,
    -1,
    "expected getLatestCaseExportPackageDocxArtifactSnapshot helper",
  );
  assert.notEqual(readerEnd, -1, "expected next helper boundary");

  const docsSection = docsSectionMatch[0];
  const readerSlice = databaseIndexText.slice(readerStart, readerEnd);

  assert.match(
    docsSection,
    /Shared Database Export-Package DOCX Artifact Reader Helper Seam Freeze/i,
  );
  assert.match(
    docsSection,
    /shared `packages\/database\/src\/index\.js` `getLatestCaseExportPackageDocxArtifactSnapshot` helper is the canonical persisted case-level latest `export_package_docx_artifact` snapshot reader boundary/i,
  );
  assert.match(
    docsSection,
    /currently evidenced included database\/runtime surfaces in this freeze are limited to:\s+`packages\/database\/src\/index\.js` export surface\s+current shared in-package projection\/helper\/refresh reuse in `packages\/database\/src\/index\.js`\s+current runtime proof in `tests\/export-package-docx-artifact-persistence\.test\.js`\s+current runtime proof in `tests\/export-package-docx-artifact-refresh\.test\.js`\s+current runtime\/helper proof in `tests\/export-package-docx-artifact-api\.test\.js`\s+current helper\/output proof in `tests\/export-package-docx-artifact-adapter-registry\.test\.js`/i,
  );
  assert.match(
    docsSection,
    /current `packages\/database` latest DOCX artifact snapshot read boundary already does this through the existing shared latest-reader helper with bounded live-code reuse inside the database package and no current direct route\/runtime import above it/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageDocxArtifactSnapshot` rejecting invalid `caseId` values through `createPersistenceError\("ERR_CASE_ID_INVALID", "caseId must be a non-empty string"\)`/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageDocxArtifactSnapshot` loading the DOCX artifact snapshot store through `readStore\(exportPackageDocxArtifactSnapshotsFileName, options\)`/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageDocxArtifactSnapshot` reading `store\[caseId\]` as the persisted case-level DOCX artifact snapshot record list lookup/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageDocxArtifactSnapshot` returning `null` when no persisted case-level DOCX artifact snapshot record list exists/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageDocxArtifactSnapshot` selecting `caseSnapshots\[caseSnapshots\.length - 1\]` as the persisted latest DOCX artifact snapshot record/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageDocxArtifactSnapshot` returning `caseSnapshots\[caseSnapshots\.length - 1\]\.export_package_docx_artifact_payload` unchanged as the canonical latest persisted `export_package_docx_artifact` payload/i,
  );
  assert.match(
    docsSection,
    /current relationship to the broader already-frozen case-level persisted `export_package_docx_artifact` seam is limited to this helper being the narrower persisted latest-reader boundary inside that broader persistence seam, while persisted write and persisted refresh remain separate adjacent surfaces/i,
  );
  assert.match(
    docsSection,
    /current relationship to export-package DOCX persistence\/refresh and adjacent database helper flows already evidenced in repo code and tests is limited to:/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageBundleManifestProjection`, `getLatestCaseExportPackageDocxArtifactProjection`, `refreshCaseExportPackageBundleManifestSnapshot`, and `refreshCaseExportPackageBundleArchiveArtifactSnapshot` reusing this helper as the prerequisite latest DOCX artifact snapshot lookup inside `packages\/database\/src\/index\.js`/i,
  );
  assert.match(
    docsSection,
    /current runtime proof that `persistCaseExportPackageDocxArtifactSnapshot\(\.\.\.\)` and `refreshCaseExportPackageDocxArtifactSnapshot\(\.\.\.\)` produce canonical DOCX artifact snapshots which this helper later returns unchanged on latest-read/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen DOCX artifact projection-helper seam is limited to `getLatestCaseExportPackageDocxArtifactProjection` loading `getLatestCaseExportPackageDocxArtifactSnapshot\(caseId, options\)` as the prerequisite latest persisted DOCX artifact snapshot and returning `null` when this reader yields no snapshot; downstream DOCX artifact projection semantics remain outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /current returned canonical persisted shape already evidenced for this helper seam is limited to the stored canonical `export_package_docx_artifact_payload` object returned unchanged from the latest persisted DOCX artifact snapshot record/i,
  );
  assert.match(
    docsSection,
    /current bounded live-code reuse already evidenced in `packages\/database\/src\/index\.js` is limited to:/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageDocxArtifactSnapshot` being reused by `getLatestCaseExportPackageBundleManifestProjection`/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageDocxArtifactSnapshot` being reused by `getLatestCaseExportPackageDocxArtifactProjection`/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageDocxArtifactSnapshot` being reused by `refreshCaseExportPackageBundleManifestSnapshot`/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageDocxArtifactSnapshot` being reused by `refreshCaseExportPackageBundleArchiveArtifactSnapshot`/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageDocxArtifactSnapshot` being exposed from `packages\/database\/src\/index\.js`/i,
  );
  assert.match(
    docsSection,
    /current bounded direct runtime reuse already evidenced above the database package is limited to no current direct `apps\/api\/src\/index\.js` import or direct invocation of `getLatestCaseExportPackageDocxArtifactSnapshot`; current latest-read and delivery routes consume the already-frozen DOCX artifact projection-helper seam instead/i,
  );
  assert.match(
    docsSection,
    /current runtime\/test surface already evidenced in `tests\/export-package-docx-artifact-persistence\.test\.js`, `tests\/export-package-docx-artifact-refresh\.test\.js`, `tests\/export-package-docx-artifact-api\.test\.js`, and `tests\/export-package-docx-artifact-adapter-registry\.test\.js` is limited to valid persisted roundtrip latest-read behavior, case-scoped latest snapshot selection, null-on-missing latest-read behavior, refreshed DOCX artifact snapshots being read back unchanged through this helper, persisted latest-route fields staying aligned with this helper's latest snapshot read, and refresh responses staying aligned with this helper's latest snapshot read/i,
  );
  assert.match(
    docsSection,
    /already-frozen database export-package DOCX artifact projection-helper seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /already-frozen database export-package projection-helper seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /already-frozen database export-package snapshot reader-helper seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /already-frozen database export-package bundle-manifest projection-helper seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /already-frozen database export-package bundle-manifest reader-helper seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /already-frozen database export-package bundle-archive artifact projection-helper seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /already-frozen database export-package bundle-archive artifact reader-helper seam remains outside this helper seam/i,
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
    /shared governance DOCX\/export-package helper seams remain outside this helper seam/i,
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
    /future database helpers that need the same persisted latest DOCX artifact snapshot read behavior should extend the existing `getLatestCaseExportPackageDocxArtifactSnapshot` seam instead of introducing a parallel DOCX artifact reader stack/i,
  );
  assert.match(
    docsSection,
    /does not change runtime behavior, persistence semantics, filesystem behavior, API behavior, or fail-closed behavior/i,
  );

  assert.match(
    readerSlice,
    /async function getLatestCaseExportPackageDocxArtifactSnapshot\(\s*caseId,\s*options = \{\}\s*\)\s*\{/,
  );
  assert.match(
    readerSlice,
    /throw createPersistenceError\("ERR_CASE_ID_INVALID", "caseId must be a non-empty string"\);/,
  );
  assert.match(
    readerSlice,
    /const store = await readStore\(exportPackageDocxArtifactSnapshotsFileName, options\);/,
  );
  assert.match(readerSlice, /const caseSnapshots = store\[caseId\];/);
  assert.match(
    readerSlice,
    /if \(!Array\.isArray\(caseSnapshots\) \|\| caseSnapshots\.length === 0\) \{\s*return null;\s*\}/s,
  );
  assert.match(
    readerSlice,
    /return caseSnapshots\[caseSnapshots\.length - 1\]\.export_package_docx_artifact_payload;/,
  );

  assert.deepEqual(
    collectLineMatches(databaseIndexText, /getLatestCaseExportPackageDocxArtifactSnapshot/),
    [514, 572, 593, 1368, 1454, 1572],
  );
  assert.deepEqual(
    collectLineMatches(
      databaseIndexText,
      /^\s*getLatestCaseExportPackageDocxArtifactSnapshot,\s*$/,
    ),
    [1572],
  );
  assert.deepEqual(
    collectLineMatches(apiIndexText, /getLatestCaseExportPackageDocxArtifactSnapshot/),
    [],
  );

  assert.doesNotMatch(readerSlice, /persistCaseExportPackageDocxArtifactSnapshot\(/);
  assert.doesNotMatch(readerSlice, /refreshCaseExportPackageDocxArtifactSnapshot\(/);
  assert.doesNotMatch(readerSlice, /getLatestCaseExportPackageDocxArtifactProjection\(/);
  assert.doesNotMatch(readerSlice, /getLatestCaseExportPackageProjection\(/);
  assert.doesNotMatch(readerSlice, /getLatestCaseExportPackageBundleManifestProjection\(/);
  assert.doesNotMatch(readerSlice, /getLatestCaseReleaseEvalRun\(/);
  assert.doesNotMatch(readerSlice, /getLatestCaseProfileDossierProjection\(/);
  assert.doesNotMatch(readerSlice, /getCaseProfileInputs\(/);
  assert.doesNotMatch(readerSlice, /resolvePersistedReleaseEvalProfileDossierSnapshot\(/);
  assert.doesNotMatch(readerSlice, /resolveExportPackageDocxArtifactProjection\(/);
  assert.doesNotMatch(readerSlice, /handleCaseExportPackageDocxArtifactLatestRoute\(/);

  assert.match(
    docxArtifactPersistenceTestText,
    /only currently evidenced persistence surfaces in this freeze are `getLatestCaseExportPackageDocxArtifactSnapshot`, `persistCaseExportPackageDocxArtifactSnapshot`, and `refreshCaseExportPackageDocxArtifactSnapshot`/i,
  );
  assert.match(
    docxArtifactPersistenceTestText,
    /const latest = await getLatestCaseExportPackageDocxArtifactSnapshot\(\s*"case-1",\s*\{\s*storageDir,\s*\}\s*\);/s,
  );
  assert.match(
    docxArtifactPersistenceTestText,
    /assert\.deepEqual\(latest, payload\);/,
  );
  assert.match(
    docxArtifactPersistenceTestText,
    /const latestCaseOne = await getLatestCaseExportPackageDocxArtifactSnapshot\("case-1", \{\s*storageDir,\s*\}\);/s,
  );
  assert.match(
    docxArtifactPersistenceTestText,
    /const latestCaseTwo = await getLatestCaseExportPackageDocxArtifactSnapshot\("case-2", \{\s*storageDir,\s*\}\);/s,
  );
  assert.match(
    docxArtifactPersistenceTestText,
    /assert\.equal\(latest, null\);/,
  );

  assert.match(
    docxArtifactRefreshTestText,
    /const latest = await getLatestCaseExportPackageDocxArtifactSnapshot\("case-1", \{\s*storageDir,\s*\}\);/s,
  );
  assert.match(
    docxArtifactRefreshTestText,
    /assert\.deepEqual\(latest, refreshed\);/,
  );

  assert.match(
    docxArtifactApiTestText,
    /const latestDocxArtifact = await getLatestCaseExportPackageDocxArtifactSnapshot\("case-6", \{\s*storageDir,\s*\}\);/s,
  );
  assert.match(
    docxArtifactApiTestText,
    /assert\.deepEqual\(latestDocxArtifact, persistedDocxArtifact\);/,
  );

  assert.match(
    docxArtifactAdapterRegistryTestText,
    /const latestSnapshot = await getLatestCaseExportPackageDocxArtifactSnapshot\("case-3", \{\s*storageDir,\s*\}\);/s,
  );
  assert.match(
    docxArtifactAdapterRegistryTestText,
    /assert\.deepEqual\(refreshResponse\.body, latestSnapshot\);/,
  );
});
