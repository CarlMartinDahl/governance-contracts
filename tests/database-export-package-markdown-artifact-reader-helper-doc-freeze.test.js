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
const markdownArtifactPersistenceTestText = fs.readFileSync(
  path.join(__dirname, "export-package-markdown-artifact-persistence.test.js"),
  "utf8",
);
const markdownArtifactRefreshTestText = fs.readFileSync(
  path.join(__dirname, "export-package-markdown-artifact-refresh.test.js"),
  "utf8",
);
const markdownArtifactApiTestText = fs.readFileSync(
  path.join(__dirname, "export-package-markdown-artifact-api.test.js"),
  "utf8",
);
const markdownArtifactAdapterRegistryTestText = fs.readFileSync(
  path.join(__dirname, "export-package-markdown-artifact-adapter-registry.test.js"),
  "utf8",
);

function collectLineMatches(text, pattern) {
  const linePattern = new RegExp(pattern.source, pattern.flags.replaceAll("g", ""));
  return text.split("\n").flatMap((line, index) => (
    linePattern.test(line) ? [index + 1] : []
  ));
}

test("docs freeze the shared database export-package Markdown artifact reader seam as the persisted latest snapshot boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared Database Export-Package Markdown Artifact Reader Helper Seam Freeze[\s\S]*?(?=\n### )/,
  );
  const readerStart = databaseIndexText.indexOf(
    "async function getLatestCaseExportPackageMarkdownArtifactSnapshot(",
  );
  const readerEnd = databaseIndexText.indexOf(
    "async function getLatestCaseExportPackageMarkdownArtifactProjection(",
    readerStart,
  );

  assert.ok(
    docsSectionMatch,
    "expected export-package Markdown artifact reader docs section",
  );
  assert.notEqual(
    readerStart,
    -1,
    "expected getLatestCaseExportPackageMarkdownArtifactSnapshot helper",
  );
  assert.notEqual(readerEnd, -1, "expected next helper boundary");

  const docsSection = docsSectionMatch[0];
  const readerSlice = databaseIndexText.slice(readerStart, readerEnd);

  assert.match(
    docsSection,
    /Shared Database Export-Package Markdown Artifact Reader Helper Seam Freeze/i,
  );
  assert.match(
    docsSection,
    /shared `packages\/database\/src\/index\.js` `getLatestCaseExportPackageMarkdownArtifactSnapshot` helper is the canonical persisted case-level latest `export_package_markdown_artifact` snapshot reader boundary/i,
  );
  assert.match(
    docsSection,
    /currently evidenced included database\/runtime surfaces in this freeze are limited to:\s+`packages\/database\/src\/index\.js` export surface\s+current shared in-package projection\/helper\/refresh reuse in `packages\/database\/src\/index\.js`\s+current runtime proof in `tests\/export-package-markdown-artifact-persistence\.test\.js`\s+current runtime proof in `tests\/export-package-markdown-artifact-refresh\.test\.js`\s+current runtime\/helper proof in `tests\/export-package-markdown-artifact-api\.test\.js`\s+current helper\/output proof in `tests\/export-package-markdown-artifact-adapter-registry\.test\.js`/i,
  );
  assert.match(
    docsSection,
    /current `packages\/database` latest Markdown artifact snapshot read boundary already does this through the existing shared latest-reader helper with bounded live-code reuse inside the database package and no current direct route\/runtime import above it/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageMarkdownArtifactSnapshot` rejecting invalid `caseId` values through `createPersistenceError\("ERR_CASE_ID_INVALID", "caseId must be a non-empty string"\)`/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageMarkdownArtifactSnapshot` loading the Markdown artifact snapshot store through `readStore\(exportPackageMarkdownArtifactSnapshotsFileName, options\)`/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageMarkdownArtifactSnapshot` reading `store\[caseId\]` as the persisted case-level Markdown artifact snapshot record list lookup/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageMarkdownArtifactSnapshot` returning `null` when no persisted case-level Markdown artifact snapshot record list exists/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageMarkdownArtifactSnapshot` selecting `caseSnapshots\[caseSnapshots\.length - 1\]` as the persisted latest Markdown artifact snapshot record/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageMarkdownArtifactSnapshot` returning `caseSnapshots\[caseSnapshots\.length - 1\]\.export_package_markdown_artifact_payload` unchanged as the canonical latest persisted `export_package_markdown_artifact` payload/i,
  );
  assert.match(
    docsSection,
    /current relationship to the broader already-evidenced case-level persisted `export_package_markdown_artifact` seam is limited to this helper being the narrower persisted latest-reader boundary inside that broader persistence seam, while persisted write and persisted refresh remain separate adjacent surfaces/i,
  );
  assert.match(
    docsSection,
    /current relationship to export-package Markdown persistence\/refresh and adjacent database helper flows already evidenced in repo code and tests is limited to:/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageBundleManifestProjection`, `getLatestCaseExportPackageMarkdownArtifactProjection`, `refreshCaseExportPackageBundleManifestSnapshot`, and `refreshCaseExportPackageBundleArchiveArtifactSnapshot` reusing this helper as the prerequisite latest Markdown artifact snapshot lookup inside `packages\/database\/src\/index\.js`/i,
  );
  assert.match(
    docsSection,
    /current runtime proof that `persistCaseExportPackageMarkdownArtifactSnapshot\(\.\.\.\)` and `refreshCaseExportPackageMarkdownArtifactSnapshot\(\.\.\.\)` produce canonical Markdown artifact snapshots which this helper later returns unchanged on latest-read/i,
  );
  assert.match(
    docsSection,
    /current relationship to the nearby Markdown artifact projection helper is limited to `getLatestCaseExportPackageMarkdownArtifactProjection` loading `getLatestCaseExportPackageMarkdownArtifactSnapshot\(caseId, options\)` as the prerequisite latest persisted Markdown artifact snapshot and returning `null` when this reader yields no snapshot; downstream Markdown artifact projection semantics remain outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /current returned canonical persisted shape already evidenced for this helper seam is limited to the stored canonical `export_package_markdown_artifact_payload` object returned unchanged from the latest persisted Markdown artifact snapshot record/i,
  );
  assert.match(
    docsSection,
    /current bounded live-code reuse already evidenced in `packages\/database\/src\/index\.js` is limited to:/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageMarkdownArtifactSnapshot` being reused by `getLatestCaseExportPackageBundleManifestProjection`/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageMarkdownArtifactSnapshot` being reused by `getLatestCaseExportPackageMarkdownArtifactProjection`/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageMarkdownArtifactSnapshot` being reused by `refreshCaseExportPackageBundleManifestSnapshot`/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageMarkdownArtifactSnapshot` being reused by `refreshCaseExportPackageBundleArchiveArtifactSnapshot`/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageMarkdownArtifactSnapshot` being exposed from `packages\/database\/src\/index\.js`/i,
  );
  assert.match(
    docsSection,
    /current bounded direct runtime reuse already evidenced above the database package is limited to no current direct `apps\/api\/src\/index\.js` import or direct invocation of `getLatestCaseExportPackageMarkdownArtifactSnapshot`; current latest-read and delivery routes consume the nearby Markdown artifact projection helper instead/i,
  );
  assert.match(
    docsSection,
    /current runtime\/test surface already evidenced in `tests\/export-package-markdown-artifact-persistence\.test\.js`, `tests\/export-package-markdown-artifact-refresh\.test\.js`, `tests\/export-package-markdown-artifact-api\.test\.js`, and `tests\/export-package-markdown-artifact-adapter-registry\.test\.js` is limited to valid persisted roundtrip latest-read behavior, case-scoped latest snapshot selection, null-on-missing latest-read behavior, refreshed Markdown artifact snapshots being read back unchanged through this helper, persisted latest-route fields staying aligned with this helper's latest snapshot read, and refresh responses staying aligned with this helper's latest snapshot read/i,
  );
  assert.match(
    docsSection,
    /already-frozen database export-package JSON artifact reader-helper seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /already-frozen database export-package JSON artifact projection-helper seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /already-frozen database export-package PDF artifact reader-helper seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /already-frozen database export-package PDF artifact projection-helper seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /already-frozen database export-package DOCX artifact reader-helper seam remains outside this helper seam/i,
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
    /shared governance Markdown\/export-package helper seams remain outside this helper seam/i,
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
    /future database helpers that need the same persisted latest Markdown artifact snapshot read behavior should extend the existing `getLatestCaseExportPackageMarkdownArtifactSnapshot` seam instead of introducing a parallel Markdown artifact reader stack/i,
  );
  assert.match(
    docsSection,
    /does not change runtime behavior, persistence semantics, filesystem behavior, API behavior, or fail-closed behavior/i,
  );

  assert.match(
    readerSlice,
    /async function getLatestCaseExportPackageMarkdownArtifactSnapshot\(\s*caseId,\s*options = \{\},?\s*\)\s*\{/,
  );
  assert.match(
    readerSlice,
    /throw createPersistenceError\("ERR_CASE_ID_INVALID", "caseId must be a non-empty string"\);/,
  );
  assert.match(
    readerSlice,
    /const store = await readStore\(exportPackageMarkdownArtifactSnapshotsFileName, options\);/,
  );
  assert.match(readerSlice, /const caseSnapshots = store\[caseId\];/);
  assert.match(
    readerSlice,
    /if \(!Array\.isArray\(caseSnapshots\) \|\| caseSnapshots\.length === 0\) \{\s*return null;\s*\}/s,
  );
  assert.match(
    readerSlice,
    /return caseSnapshots\[caseSnapshots\.length - 1\]\.export_package_markdown_artifact_payload;/,
  );

  assert.deepEqual(
    collectLineMatches(databaseIndexText, /getLatestCaseExportPackageMarkdownArtifactSnapshot/),
    [509, 716, 743, 1347, 1433, 1578],
  );
  assert.deepEqual(
    collectLineMatches(
      databaseIndexText,
      /^\s*getLatestCaseExportPackageMarkdownArtifactSnapshot,\s*$/,
    ),
    [1578],
  );
  assert.deepEqual(
    collectLineMatches(apiIndexText, /getLatestCaseExportPackageMarkdownArtifactSnapshot/),
    [],
  );

  assert.doesNotMatch(readerSlice, /persistCaseExportPackageMarkdownArtifactSnapshot\(/);
  assert.doesNotMatch(readerSlice, /refreshCaseExportPackageMarkdownArtifactSnapshot\(/);
  assert.doesNotMatch(readerSlice, /getLatestCaseExportPackageMarkdownArtifactProjection\(/);
  assert.doesNotMatch(readerSlice, /getLatestCaseExportPackageProjection\(/);
  assert.doesNotMatch(readerSlice, /getLatestCaseExportPackageBundleManifestProjection\(/);
  assert.doesNotMatch(readerSlice, /getLatestCaseReleaseEvalRun\(/);
  assert.doesNotMatch(readerSlice, /getLatestCaseProfileDossierProjection\(/);
  assert.doesNotMatch(readerSlice, /getCaseProfileInputs\(/);
  assert.doesNotMatch(readerSlice, /resolvePersistedReleaseEvalProfileDossierSnapshot\(/);
  assert.doesNotMatch(readerSlice, /resolveExportPackageMarkdownArtifactProjection\(/);
  assert.doesNotMatch(readerSlice, /handleCaseExportPackageMarkdownArtifactLatestRoute\(/);

  assert.match(
    markdownArtifactPersistenceTestText,
    /only currently evidenced persistence surfaces in this freeze are `getLatestCaseExportPackageMarkdownArtifactSnapshot`, `persistCaseExportPackageMarkdownArtifactSnapshot`, and `refreshCaseExportPackageMarkdownArtifactSnapshot`/i,
  );
  assert.match(
    markdownArtifactPersistenceTestText,
    /const latest = await getLatestCaseExportPackageMarkdownArtifactSnapshot\("case-1", \{\s*storageDir,\s*\}\);/s,
  );
  assert.match(
    markdownArtifactPersistenceTestText,
    /assert\.deepEqual\(latest, payload\);/,
  );
  assert.match(
    markdownArtifactPersistenceTestText,
    /const latestCaseOne = await getLatestCaseExportPackageMarkdownArtifactSnapshot\("case-1", \{\s*storageDir,\s*\}\);/s,
  );
  assert.match(
    markdownArtifactPersistenceTestText,
    /const latestCaseTwo = await getLatestCaseExportPackageMarkdownArtifactSnapshot\("case-2", \{\s*storageDir,\s*\}\);/s,
  );
  assert.match(
    markdownArtifactPersistenceTestText,
    /assert\.equal\(latest, null\);/,
  );

  assert.match(
    markdownArtifactRefreshTestText,
    /const latest = await getLatestCaseExportPackageMarkdownArtifactSnapshot\("case-1", \{\s*storageDir,\s*\}\);/s,
  );
  assert.match(
    markdownArtifactRefreshTestText,
    /assert\.deepEqual\(latest, refreshed\);/,
  );

  assert.match(
    markdownArtifactApiTestText,
    /const persistedMarkdownArtifact =\s+await refreshCaseExportPackageMarkdownArtifactSnapshot\("case-6", \{\s*storageDir,\s*\}\);/s,
  );
  assert.match(
    markdownArtifactApiTestText,
    /assert\.deepEqual\(persistedFields, persistedMarkdownArtifact\);/,
  );

  assert.match(
    markdownArtifactAdapterRegistryTestText,
    /const latestSnapshot =\s+await getLatestCaseExportPackageMarkdownArtifactSnapshot\("case-3", \{\s*storageDir,\s*\}\);/s,
  );
  assert.match(
    markdownArtifactAdapterRegistryTestText,
    /assert\.deepEqual\(refreshResponse\.body, latestSnapshot\);/,
  );
});
