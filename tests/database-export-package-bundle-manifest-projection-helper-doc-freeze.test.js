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
const bundleManifestApiTestText = fs.readFileSync(
  path.join(__dirname, "export-package-bundle-manifest-api.test.js"),
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
const bundleManifestAdapterRegistryTestText = fs.readFileSync(
  path.join(__dirname, "export-package-bundle-manifest-adapter-registry.test.js"),
  "utf8",
);

function collectLineMatches(text, pattern) {
  const linePattern = new RegExp(pattern.source, pattern.flags.replaceAll("g", ""));
  return text.split("\n").flatMap((line, index) => (
    linePattern.test(line) ? [index + 1] : []
  ));
}

test("docs freeze the shared database export-package bundle/package manifest projection helper seam as the persisted latest projection boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared Database Export-Package Bundle Manifest Projection Helper Seam Freeze[\s\S]*?(?=\n### )/,
  );
  const helperStart = databaseIndexText.indexOf(
    "async function getLatestCaseExportPackageBundleManifestProjection(",
  );
  const helperEnd = databaseIndexText.indexOf(
    "async function getLatestCaseExportPackageProjection(caseId, options = {}) {",
    helperStart,
  );

  assert.ok(
    docsSectionMatch,
    "expected export-package bundle manifest projection helper docs section",
  );
  assert.notEqual(
    helperStart,
    -1,
    "expected getLatestCaseExportPackageBundleManifestProjection helper",
  );
  assert.notEqual(helperEnd, -1, "expected next helper boundary");

  const docsSection = docsSectionMatch[0];
  const helperSlice = databaseIndexText.slice(helperStart, helperEnd);

  assert.match(
    docsSection,
    /Shared Database Export-Package Bundle Manifest Projection Helper Seam Freeze/i,
  );
  assert.match(
    docsSection,
    /shared `packages\/database\/src\/index\.js` `getLatestCaseExportPackageBundleManifestProjection` helper is the canonical persisted case-level latest `export_package_bundle_manifest` projection-resolution boundary/i,
  );
  assert.match(
    docsSection,
    /currently evidenced included database\/runtime surfaces in this freeze are limited to:\s+`packages\/database\/src\/index\.js` export surface\s+current shared in-package reader\/helper reuse in `packages\/database\/src\/index\.js`\s+current bounded direct runtime reuse in `apps\/api\/src\/index\.js`\s+current runtime proof in `tests\/export-package-bundle-manifest-api\.test\.js`\s+current runtime\/helper proof in `tests\/export-package-bundle-archive-artifact-api\.test\.js`\s+current runtime\/helper proof in `tests\/export-package-bundle-archive-artifact-delivery-api\.test\.js`\s+current helper\/output proof in `tests\/export-package-bundle-manifest-adapter-registry\.test\.js`/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageBundleManifestProjection` rejecting invalid `caseId` values through `createPersistenceError\("ERR_CASE_ID_INVALID", "caseId must be a non-empty string"\)`/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageBundleManifestProjection` loading the latest persisted bundle\/package manifest snapshot through the already-frozen reader seam `getLatestCaseExportPackageBundleManifestSnapshot\(caseId, options\)`/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageBundleManifestProjection` returning `null` when the reader seam yields no persisted bundle\/package manifest snapshot/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageBundleManifestProjection` loading the current persisted export-package snapshot through `getLatestCaseExportPackageSnapshot\(caseId, options\)`/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageBundleManifestProjection` loading the current persisted JSON, Markdown, PDF, and DOCX artifact snapshots through `getLatestCaseExportPackageJsonArtifactSnapshot`, `getLatestCaseExportPackageMarkdownArtifactSnapshot`, `getLatestCaseExportPackagePdfArtifactSnapshot`, and `getLatestCaseExportPackageDocxArtifactSnapshot`/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageBundleManifestProjection` delegating final projection assembly through `resolveExportPackageBundleManifestProjection\(exportPackageBundleManifestSnapshot, currentExportPackageSnapshot, \{ jsonArtifactSnapshot, markdownArtifactSnapshot, pdfArtifactSnapshot, docxArtifactSnapshot \}\)`/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageBundleManifestProjection` returning the resulting projection unchanged/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen reader seam is limited to `getLatestCaseExportPackageBundleManifestProjection` loading `getLatestCaseExportPackageBundleManifestSnapshot\(caseId, options\)` as the prerequisite latest persisted bundle\/package manifest snapshot and returning `null` when that reader seam yields no snapshot/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen database export-package snapshot reader-helper seam is limited to `getLatestCaseExportPackageBundleManifestProjection` loading `getLatestCaseExportPackageSnapshot\(caseId, options\)` as the current export-package input for downstream projection resolution/i,
  );
  assert.match(
    docsSection,
    /current relationship to the lower schemas bundle\/package manifest projection-validator seam is limited to downstream projection validation occurring through the separately frozen governance `resolveExportPackageBundleManifestProjection` seam; this database helper itself makes no direct lower schemas projection-validator calls/i,
  );
  assert.match(
    docsSection,
    /current returned canonical projection shape already evidenced for this helper seam is limited to the governance-resolved `export_package_bundle_manifest` projection object returned unchanged from `resolveExportPackageBundleManifestProjection\(\.\.\.\)`, including the top-level `snapshot_status` block already surfaced by that downstream resolver contract/i,
  );
  assert.match(
    docsSection,
    /current bounded live-code reuse already evidenced in `packages\/database\/src\/index\.js` is limited to:\s+`getLatestCaseExportPackageBundleManifestProjection` being reused by `getLatestCaseExportPackageBundleArchiveArtifactProjection`\s+`getLatestCaseExportPackageBundleManifestProjection` being exposed from `packages\/database\/src\/index\.js`/i,
  );
  assert.match(
    docsSection,
    /current bounded direct runtime reuse already evidenced in `apps\/api\/src\/index\.js` is limited to:\s+`handleCaseExportPackageBundleManifestLatestRoute`\s+`handleCaseExportPackageBundleArchiveArtifactLatestRoute`\s+`handleCaseExportPackageBundleArchiveArtifactDownloadRoute`/i,
  );
  assert.match(
    docsSection,
    /already-frozen database export-package bundle\/manifest reader-helper seam remains outside this helper seam/i,
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
    /lower schemas bundle\/package manifest projection-validator seam remains outside this helper seam/i,
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
    /future database helpers that need the same persisted latest bundle\/package manifest projection behavior should extend the existing `getLatestCaseExportPackageBundleManifestProjection` seam instead of introducing a parallel bundle\/package manifest projection wrapper stack/i,
  );
  assert.match(
    docsSection,
    /does not change runtime behavior, projection semantics, persistence semantics, filesystem behavior, API behavior, or fail-closed behavior/i,
  );

  assert.match(
    helperSlice,
    /async function getLatestCaseExportPackageBundleManifestProjection\(\s*caseId,\s*options = \{\},\s*\)\s*\{/,
  );
  assert.match(
    helperSlice,
    /throw createPersistenceError\("ERR_CASE_ID_INVALID", "caseId must be a non-empty string"\);/,
  );
  assert.match(
    helperSlice,
    /const exportPackageBundleManifestSnapshot =\s+await getLatestCaseExportPackageBundleManifestSnapshot\(caseId, options\);/s,
  );
  assert.match(
    helperSlice,
    /if \(!exportPackageBundleManifestSnapshot\) \{\s*return null;\s*\}/s,
  );
  assert.match(
    helperSlice,
    /const currentExportPackageSnapshot = await getLatestCaseExportPackageSnapshot\(\s*caseId,\s*options,\s*\);/s,
  );
  assert.match(
    helperSlice,
    /jsonArtifactSnapshot: await getLatestCaseExportPackageJsonArtifactSnapshot\(\s*caseId,\s*options,\s*\),/s,
  );
  assert.match(
    helperSlice,
    /markdownArtifactSnapshot:\s*await getLatestCaseExportPackageMarkdownArtifactSnapshot\(caseId, options\),/s,
  );
  assert.match(
    helperSlice,
    /pdfArtifactSnapshot: await getLatestCaseExportPackagePdfArtifactSnapshot\(\s*caseId,\s*options,\s*\),/s,
  );
  assert.match(
    helperSlice,
    /docxArtifactSnapshot: await getLatestCaseExportPackageDocxArtifactSnapshot\(\s*caseId,\s*options,\s*\),/s,
  );
  assert.match(
    helperSlice,
    /return resolveExportPackageBundleManifestProjection\(\s*exportPackageBundleManifestSnapshot,\s*currentExportPackageSnapshot,\s*\{/s,
  );

  assert.deepEqual(
    collectLineMatches(
      databaseIndexText,
      /getLatestCaseExportPackageBundleManifestProjection/,
    ),
    [458, 480, 1569],
  );
  assert.deepEqual(
    collectLineMatches(
      databaseIndexText,
      /^\s*getLatestCaseExportPackageBundleManifestProjection,\s*$/,
    ),
    [1569],
  );
  assert.deepEqual(
    collectLineMatches(apiIndexText, /getLatestCaseExportPackageBundleManifestProjection/),
    [4, 506, 597, 797],
  );

  assert.doesNotMatch(helperSlice, /persistCaseExportPackageBundleManifestSnapshot\(/);
  assert.doesNotMatch(helperSlice, /refreshCaseExportPackageBundleManifestSnapshot\(/);
  assert.doesNotMatch(
    helperSlice,
    /validateSWEBodelningExportPackageBundleManifestProjection\(/,
  );
  assert.doesNotMatch(
    helperSlice,
    /validateCMDExportPackageBundleManifestProjection\(/,
  );
  assert.doesNotMatch(helperSlice, /getLatestCaseReleaseEvalRun\(/);
  assert.doesNotMatch(helperSlice, /getLatestCaseProfileDossierProjection\(/);
  assert.doesNotMatch(helperSlice, /getCaseProfileInputs\(/);
  assert.doesNotMatch(
    helperSlice,
    /handleCaseExportPackageBundleManifestLatestRoute\(/,
  );

  assert.match(
    bundleManifestApiTestText,
    /await getLatestCaseExportPackageBundleManifestProjection\(/,
  );
  assert.match(
    bundleManifestApiTestText,
    /const expectedProjection = await getLatestCaseExportPackageBundleManifestProjection\("case-1", \{\s*storageDir,\s*\}\);/s,
  );
  assert.match(
    bundleManifestApiTestText,
    /assert\.deepEqual\(response\.body, expectedProjection\);/,
  );
  assert.match(
    bundleManifestApiTestText,
    /validateSWEBodelningExportPackageBundleManifestProjection\(response\.body\)/,
  );
  assert.match(
    bundleManifestApiTestText,
    /validateCMDExportPackageBundleManifestProjection\(response\.body\)/,
  );

  assert.match(
    bundleArchiveApiTestText,
    /await getLatestCaseExportPackageBundleManifestProjection\(/,
  );
  assert.match(
    bundleArchiveApiTestText,
    /const bundleManifestProjection =\s+await getLatestCaseExportPackageBundleManifestProjection\(/s,
  );

  assert.match(
    bundleArchiveDeliveryApiTestText,
    /handleCaseExportPackageBundleArchiveArtifactDownloadRoute/,
  );
  assert.match(
    bundleArchiveDeliveryApiTestText,
    /getLatestCaseExportPackageBundleManifestProjection/,
  );

  assert.match(
    bundleManifestAdapterRegistryTestText,
    /const projected = await getLatestCaseExportPackageBundleManifestProjection\("case-2", \{\s*storageDir,\s*\}\);/s,
  );
  assert.match(
    bundleManifestAdapterRegistryTestText,
    /const expectedViaRegistry = resolveExportPackageBundleManifestProjection\(\s*bundleManifest,\s*exportPackage,\s*artifactSnapshots,\s*\);/s,
  );
  assert.match(
    bundleManifestAdapterRegistryTestText,
    /assert\.deepEqual\(\s*validateCMDExportPackageBundleManifestProjection\(projected\),\s*projected,\s*\);/s,
  );
  assert.match(
    bundleManifestAdapterRegistryTestText,
    /assert\.deepEqual\(\s*validateSWEBodelningExportPackageBundleManifestProjection\(latestProjection\),\s*latestProjection,\s*\);/s,
  );
});
