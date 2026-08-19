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
const bundleArchiveApiTestText = fs.readFileSync(
  path.join(__dirname, "export-package-bundle-archive-artifact-api.test.js"),
  "utf8",
);
const bundleArchiveDeliveryApiTestText = fs.readFileSync(
  path.join(__dirname, "export-package-bundle-archive-artifact-delivery-api.test.js"),
  "utf8",
);
const bundleArchiveAdapterRegistryTestText = fs.readFileSync(
  path.join(__dirname, "export-package-bundle-archive-artifact-adapter-registry.test.js"),
  "utf8",
);

function collectLineMatches(text, pattern) {
  const linePattern = new RegExp(pattern.source, pattern.flags.replaceAll("g", ""));
  return text.split("\n").flatMap((line, index) => (
    linePattern.test(line) ? [index + 1] : []
  ));
}

test("docs freeze the shared database export-package bundle/archive artifact projection helper seam as the persisted latest projection boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared Database Export-Package Bundle Archive Artifact Projection Helper Seam Freeze[\s\S]*?(?=\n### )/,
  );
  const helperStart = databaseIndexText.indexOf(
    "async function getLatestCaseExportPackageBundleArchiveArtifactProjection(",
  );
  const helperEnd = databaseIndexText.indexOf(
    "async function getLatestCaseExportPackageBundleManifestSnapshot(",
    helperStart,
  );

  assert.ok(
    docsSectionMatch,
    "expected export-package bundle/archive artifact projection helper docs section",
  );
  assert.notEqual(
    helperStart,
    -1,
    "expected getLatestCaseExportPackageBundleArchiveArtifactProjection helper",
  );
  assert.notEqual(helperEnd, -1, "expected next helper boundary");

  const docsSection = docsSectionMatch[0];
  const helperSlice = databaseIndexText.slice(helperStart, helperEnd);

  assert.match(
    docsSection,
    /Shared Database Export-Package Bundle Archive Artifact Projection Helper Seam Freeze/i,
  );
  assert.match(
    docsSection,
    /shared `packages\/database\/src\/index\.js` `getLatestCaseExportPackageBundleArchiveArtifactProjection` helper is the canonical persisted case-level latest `export_package_bundle_archive_artifact` projection-resolution boundary/i,
  );
  assert.match(
    docsSection,
    /currently evidenced included database\/runtime surfaces in this freeze are limited to:\s+`packages\/database\/src\/index\.js` export surface\s+current bounded direct runtime reuse in `apps\/api\/src\/index\.js`\s+current runtime\/helper proof in `tests\/export-package-bundle-archive-artifact-api\.test\.js`\s+current runtime\/helper proof in `tests\/export-package-bundle-archive-artifact-delivery-api\.test\.js`\s+current helper\/output proof in `tests\/export-package-bundle-archive-artifact-adapter-registry\.test\.js`/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageBundleArchiveArtifactProjection` rejecting invalid `caseId` values through `createPersistenceError\("ERR_CASE_ID_INVALID", "caseId must be a non-empty string"\)`/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageBundleArchiveArtifactProjection` loading the latest persisted final bundle\/archive artifact snapshot through the already-frozen reader seam `getLatestCaseExportPackageBundleArchiveArtifactSnapshot\(caseId, options\)`/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageBundleArchiveArtifactProjection` returning `null` when the reader seam yields no persisted final bundle\/archive artifact snapshot/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageBundleArchiveArtifactProjection` delegating final projection assembly through `resolveExportPackageBundleArchiveArtifactProjection\(exportPackageBundleArchiveArtifactSnapshot, await getLatestCaseExportPackageBundleManifestProjection\(caseId, options\)\)`/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageBundleArchiveArtifactProjection` returning the resulting projection unchanged/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen reader seam is limited to `getLatestCaseExportPackageBundleArchiveArtifactProjection` loading `getLatestCaseExportPackageBundleArchiveArtifactSnapshot\(caseId, options\)` as the prerequisite latest persisted final bundle\/archive artifact snapshot and returning `null` when that reader seam yields no snapshot/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen bundle\/package manifest projection-helper seam is limited to `getLatestCaseExportPackageBundleArchiveArtifactProjection` loading `getLatestCaseExportPackageBundleManifestProjection\(caseId, options\)` as the current bundle\/package manifest projection input for downstream final bundle\/archive projection resolution/i,
  );
  assert.match(
    docsSection,
    /current relationship to the lower schemas bundle\/archive artifact projection-validator seam is limited to downstream projection validation occurring through the separately frozen governance `resolveExportPackageBundleArchiveArtifactProjection` seam; this database helper itself makes no direct lower schemas projection-validator calls/i,
  );
  assert.match(
    docsSection,
    /current returned canonical projection shape already evidenced for this helper seam is limited to the governance-resolved `export_package_bundle_archive_artifact` projection object returned unchanged from `resolveExportPackageBundleArchiveArtifactProjection\(\.\.\.\)`, including the top-level `snapshot_status` block already surfaced by that downstream resolver contract/i,
  );
  assert.match(
    docsSection,
    /current bounded live-code reuse already evidenced in `packages\/database\/src\/index\.js` is limited to `getLatestCaseExportPackageBundleArchiveArtifactProjection` being exposed from `packages\/database\/src\/index\.js`; no current additional in-package helper reuse is evidenced/i,
  );
  assert.match(
    docsSection,
    /current bounded direct runtime reuse already evidenced in `apps\/api\/src\/index\.js` is limited to:\s+`handleCaseExportPackageBundleArchiveArtifactLatestRoute`\s+`handleCaseExportPackageBundleArchiveArtifactDownloadRoute`/i,
  );
  assert.match(
    docsSection,
    /already-frozen database export-package bundle\/archive artifact reader-helper seam remains outside this helper seam/i,
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
    /lower schemas bundle\/archive artifact projection-validator seam remains outside this helper seam/i,
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
    /future database helpers that need the same persisted latest final bundle\/archive projection behavior should extend the existing `getLatestCaseExportPackageBundleArchiveArtifactProjection` seam instead of introducing a parallel final bundle\/archive projection wrapper stack/i,
  );
  assert.match(
    docsSection,
    /does not change runtime behavior, projection semantics, persistence semantics, filesystem behavior, API behavior, or fail-closed behavior/i,
  );

  assert.match(
    helperSlice,
    /async function getLatestCaseExportPackageBundleArchiveArtifactProjection\(\s*caseId,\s*options = \{\},\s*\)\s*\{/,
  );
  assert.match(
    helperSlice,
    /throw createPersistenceError\("ERR_CASE_ID_INVALID", "caseId must be a non-empty string"\);/,
  );
  assert.match(
    helperSlice,
    /const exportPackageBundleArchiveArtifactSnapshot =\s+await getLatestCaseExportPackageBundleArchiveArtifactSnapshot\(caseId, options\);/s,
  );
  assert.match(
    helperSlice,
    /if \(!exportPackageBundleArchiveArtifactSnapshot\) \{\s*return null;\s*\}/s,
  );
  assert.match(
    helperSlice,
    /return resolveExportPackageBundleArchiveArtifactProjection\(\s*exportPackageBundleArchiveArtifactSnapshot,\s*await getLatestCaseExportPackageBundleManifestProjection\(caseId, options\),\s*\);/s,
  );

  assert.deepEqual(
    collectLineMatches(
      databaseIndexText,
      /getLatestCaseExportPackageBundleArchiveArtifactProjection/,
    ),
    [441, 1567],
  );
  assert.deepEqual(
    collectLineMatches(
      databaseIndexText,
      /^\s*getLatestCaseExportPackageBundleArchiveArtifactProjection,\s*$/,
    ),
    [1567],
  );
  assert.deepEqual(
    collectLineMatches(
      apiIndexText,
      /getLatestCaseExportPackageBundleArchiveArtifactProjection/,
    ),
    [2, 581, 781],
  );

  assert.doesNotMatch(helperSlice, /persistCaseExportPackageBundleArchiveArtifactSnapshot\(/);
  assert.doesNotMatch(helperSlice, /refreshCaseExportPackageBundleArchiveArtifactSnapshot\(/);
  assert.doesNotMatch(
    helperSlice,
    /validateSWEBodelningExportPackageBundleArchiveArtifactProjection\(/,
  );
  assert.doesNotMatch(
    helperSlice,
    /validateCMDExportPackageBundleArchiveArtifactProjection\(/,
  );
  assert.doesNotMatch(helperSlice, /getLatestCaseExportPackageSnapshot\(/);
  assert.doesNotMatch(helperSlice, /getLatestCaseReleaseEvalRun\(/);
  assert.doesNotMatch(helperSlice, /getLatestCaseProfileDossierProjection\(/);
  assert.doesNotMatch(helperSlice, /getCaseProfileInputs\(/);
  assert.doesNotMatch(
    helperSlice,
    /handleCaseExportPackageBundleArchiveArtifactLatestRoute\(/,
  );

  assert.match(
    bundleArchiveApiTestText,
    /await getLatestCaseExportPackageBundleArchiveArtifactProjection\(/,
  );
  assert.match(
    bundleArchiveApiTestText,
    /const expectedProjection =\s+await getLatestCaseExportPackageBundleArchiveArtifactProjection\("case-1", \{\s*storageDir,\s*\}\);/s,
  );
  assert.match(
    bundleArchiveApiTestText,
    /const expectedProjection =\s+await getLatestCaseExportPackageBundleArchiveArtifactProjection\("case-cmd", \{\s*storageDir,\s*\}\);/s,
  );
  assert.match(
    bundleArchiveApiTestText,
    /assert\.deepEqual\(response\.body, expectedProjection\);/,
  );
  assert.match(
    bundleArchiveApiTestText,
    /validateSWEBodelningExportPackageBundleArchiveArtifactProjection\(response\.body\)/,
  );
  assert.match(
    bundleArchiveApiTestText,
    /validateCMDExportPackageBundleArchiveArtifactProjection\(response\.body\)/,
  );

  assert.match(
    bundleArchiveDeliveryApiTestText,
    /handleCaseExportPackageBundleArchiveArtifactDownloadRoute/,
  );
  assert.match(
    bundleArchiveDeliveryApiTestText,
    /getLatestCaseExportPackageBundleArchiveArtifactProjection/,
  );

  assert.match(
    bundleArchiveAdapterRegistryTestText,
    /const projected = await getLatestCaseExportPackageBundleArchiveArtifactProjection\("case-2", \{\s*storageDir,\s*\}\);/s,
  );
  assert.match(
    bundleArchiveAdapterRegistryTestText,
    /const projected = await getLatestCaseExportPackageBundleArchiveArtifactProjection\(\s*"case-cmd",\s*\{\s*storageDir,\s*\},\s*\);/s,
  );
  assert.match(
    bundleArchiveAdapterRegistryTestText,
    /const expectedViaRegistry = resolveExportPackageBundleArchiveArtifactProjection\(\s*finalArchiveArtifact,\s*currentBundleManifestProjection,\s*\);/s,
  );
  assert.match(
    bundleArchiveAdapterRegistryTestText,
    /const expectedProjectionViaRegistry = resolveExportPackageBundleArchiveArtifactProjection\(\s*refreshed,\s*currentBundleManifestProjection,\s*\);/s,
  );
  assert.match(
    bundleArchiveAdapterRegistryTestText,
    /validateCMDExportPackageBundleArchiveArtifactProjection\(projected\)/,
  );
  assert.match(
    bundleArchiveAdapterRegistryTestText,
    /validateSWEBodelningExportPackageBundleArchiveArtifactProjection\(\s*latestProjection,\s*\)/,
  );
});
