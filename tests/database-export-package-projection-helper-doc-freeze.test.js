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
const exportPackageApiTestText = fs.readFileSync(
  path.join(__dirname, "export-package-api.test.js"),
  "utf8",
);
const exportPackageAdapterRegistryTestText = fs.readFileSync(
  path.join(__dirname, "export-package-adapter-registry.test.js"),
  "utf8",
);
const exportPackageDocxArtifactApiTestText = fs.readFileSync(
  path.join(__dirname, "export-package-docx-artifact-api.test.js"),
  "utf8",
);
const exportPackagePdfArtifactApiTestText = fs.readFileSync(
  path.join(__dirname, "export-package-pdf-artifact-api.test.js"),
  "utf8",
);
const exportPackageJsonArtifactApiTestText = fs.readFileSync(
  path.join(__dirname, "export-package-json-artifact-api.test.js"),
  "utf8",
);
const exportPackageMarkdownArtifactApiTestText = fs.readFileSync(
  path.join(__dirname, "export-package-markdown-artifact-api.test.js"),
  "utf8",
);
const exportPackageDocxArtifactDeliveryApiTestText = fs.readFileSync(
  path.join(__dirname, "export-package-docx-artifact-delivery-api.test.js"),
  "utf8",
);
const exportPackagePdfArtifactDeliveryApiTestText = fs.readFileSync(
  path.join(__dirname, "export-package-pdf-artifact-delivery-api.test.js"),
  "utf8",
);
const exportPackageJsonArtifactDeliveryApiTestText = fs.readFileSync(
  path.join(__dirname, "export-package-json-artifact-delivery-api.test.js"),
  "utf8",
);
const exportPackageMarkdownArtifactDeliveryApiTestText = fs.readFileSync(
  path.join(__dirname, "export-package-markdown-artifact-delivery-api.test.js"),
  "utf8",
);

function collectLineMatches(text, pattern) {
  const linePattern = new RegExp(pattern.source, pattern.flags.replaceAll("g", ""));
  return text.split("\n").flatMap((line, index) => (
    linePattern.test(line) ? [index + 1] : []
  ));
}

test("docs freeze the shared database export-package projection helper seam as the persisted latest projection boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared Database Export-Package Projection Helper Seam Freeze[\s\S]*?(?=\n### )/,
  );
  const helperStart = databaseIndexText.indexOf(
    "async function getLatestCaseExportPackageProjection(caseId, options = {}) {",
  );
  const helperEnd = databaseIndexText.indexOf(
    "async function getLatestCaseExportPackageJsonArtifactSnapshot(caseId, options = {}) {",
    helperStart,
  );

  assert.ok(
    docsSectionMatch,
    "expected export-package projection helper docs section",
  );
  assert.notEqual(
    helperStart,
    -1,
    "expected getLatestCaseExportPackageProjection helper",
  );
  assert.notEqual(helperEnd, -1, "expected next helper boundary");

  const docsSection = docsSectionMatch[0];
  const helperSlice = databaseIndexText.slice(helperStart, helperEnd);

  assert.match(
    docsSection,
    /Shared Database Export-Package Projection Helper Seam Freeze/i,
  );
  assert.match(
    docsSection,
    /shared `packages\/database\/src\/index\.js` `getLatestCaseExportPackageProjection` helper is the canonical persisted case-level latest `export_package` projection-resolution boundary/i,
  );
  assert.match(
    docsSection,
    /currently evidenced included database\/runtime surfaces in this freeze are limited to:\s+`packages\/database\/src\/index\.js` export surface\s+current bounded direct runtime reuse in `apps\/api\/src\/index\.js`\s+current runtime proof in `tests\/export-package-api\.test\.js`\s+current helper\/output proof in `tests\/export-package-adapter-registry\.test\.js`\s+current runtime\/helper proof in `tests\/export-package-docx-artifact-api\.test\.js`, `tests\/export-package-pdf-artifact-api\.test\.js`, `tests\/export-package-json-artifact-api\.test\.js`, and `tests\/export-package-markdown-artifact-api\.test\.js`\s+current runtime\/helper proof in `tests\/export-package-docx-artifact-delivery-api\.test\.js`, `tests\/export-package-pdf-artifact-delivery-api\.test\.js`, `tests\/export-package-json-artifact-delivery-api\.test\.js`, and `tests\/export-package-markdown-artifact-delivery-api\.test\.js`/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageProjection` rejecting invalid `caseId` values through `createPersistenceError\("ERR_CASE_ID_INVALID", "caseId must be a non-empty string"\)`/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageProjection` loading the latest persisted export-package snapshot through the already-frozen reader seam `getLatestCaseExportPackageSnapshot\(caseId, options\)`/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageProjection` returning `null` when the reader seam yields no persisted export-package snapshot/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageProjection` loading the persisted release-eval store through `readStore\(releaseEvalRunsFileName, options\)`/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageProjection` reading `releaseEvalStore\[caseId\]` as the persisted case-level release-eval record list lookup/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageProjection` defaulting `currentProfileDossierSnapshot` to `null` when no persisted release-eval record list exists/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageProjection` selecting `caseRuns\[caseRuns\.length - 1\]` as the persisted latest release-eval record when a persisted release-eval record list exists/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageProjection` loading persisted case profile inputs through the already-frozen reader seam `getCaseProfileInputs\(caseId, options\)` before dossier reconstruction when a latest persisted release-eval record exists/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageProjection` reconstructing the current persisted profile-dossier snapshot through the already-frozen lower reconciliation seam `resolvePersistedReleaseEvalProfileDossierSnapshot\(latestReleaseEvalRun, caseProfileInputs, \{ persisted_at: latestReleaseEvalRecord\.persisted_at \}\)`/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageProjection` delegating final projection assembly through `resolveExportPackageProjection\(exportPackageSnapshot, currentProfileDossierSnapshot\)`/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageProjection` returning the resulting projection unchanged/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen export-package snapshot reader seam is limited to `getLatestCaseExportPackageProjection` loading `getLatestCaseExportPackageSnapshot\(caseId, options\)` as the prerequisite latest persisted export-package snapshot and returning `null` when that reader seam yields no snapshot/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen release-eval reconciliation helper seam is limited to `getLatestCaseExportPackageProjection` loading the persisted release-eval store, selecting the persisted latest release-eval record when present, loading persisted case profile inputs through `getCaseProfileInputs\(caseId, options\)`, and reconstructing the current persisted profile-dossier snapshot through `resolvePersistedReleaseEvalProfileDossierSnapshot\(\.\.\.\)`; persisted release-eval reconciliation and dossier-snapshot resolution semantics remain outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen case-profile-input reader-helper seam is limited to `getLatestCaseExportPackageProjection` loading persisted case profile inputs through `getCaseProfileInputs\(caseId, options\)` before delegated dossier reconstruction; persisted profile-input read semantics remain outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /current relationship to the governance-side export-package projection handoff already evidenced in repo code is limited to `getLatestCaseExportPackageProjection` delegating final projection assembly through `resolveExportPackageProjection\(exportPackageSnapshot, currentProfileDossierSnapshot\)` and returning that downstream result unchanged; governance-side projection assembly, `snapshot_status` derivation, adapter dispatch, and lower projection validation remain outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /current returned canonical projection shape already evidenced for this helper seam is limited to the governance-resolved `export_package` projection object returned unchanged from `resolveExportPackageProjection\(\.\.\.\)`, including the top-level `snapshot_status` block already surfaced by that downstream resolver contract/i,
  );
  assert.match(
    docsSection,
    /current bounded live-code reuse already evidenced in `packages\/database\/src\/index\.js` is limited to `getLatestCaseExportPackageProjection` being exposed from `packages\/database\/src\/index\.js`; no current additional in-package helper reuse is evidenced/i,
  );
  assert.match(
    docsSection,
    /current bounded direct runtime reuse already evidenced in `apps\/api\/src\/index\.js` is limited to:\s+`handleCaseExportPackageLatestRoute`\s+`handleCaseExportPackageDocxArtifactLatestRoute`\s+`handleCaseExportPackagePdfArtifactLatestRoute`\s+`handleCaseExportPackageJsonArtifactLatestRoute`\s+`handleCaseExportPackageMarkdownArtifactLatestRoute`\s+`handleCaseExportPackageMarkdownArtifactDownloadRoute`\s+`handleCaseExportPackageDocxArtifactDownloadRoute`\s+`handleCaseExportPackageJsonArtifactDownloadRoute`\s+`handleCaseExportPackagePdfArtifactDownloadRoute`/i,
  );
  assert.match(
    docsSection,
    /runtime\/test surface already evidenced in `tests\/export-package-api\.test\.js`, `tests\/export-package-adapter-registry\.test\.js`, `tests\/export-package-docx-artifact-api\.test\.js`, `tests\/export-package-pdf-artifact-api\.test\.js`, `tests\/export-package-json-artifact-api\.test\.js`, `tests\/export-package-markdown-artifact-api\.test\.js`, `tests\/export-package-docx-artifact-delivery-api\.test\.js`, `tests\/export-package-pdf-artifact-delivery-api\.test\.js`, `tests\/export-package-json-artifact-delivery-api\.test\.js`, and `tests\/export-package-markdown-artifact-delivery-api\.test\.js` is limited to successful export-package latest-read staying aligned with helper output across SWE and CMD flows, same-tenant upstream profile drift enforcement against helper output, export-package artifact latest-read and delivery routes consuming this helper as a separate downstream projection input, and helper output matching the separate governance projection resolver path while preserving the canonical downstream projection surface/i,
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
    /shared governance export-package helper seams remain outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /lower schemas export-package projection-validator seam remains outside this helper seam/i,
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
    /future database helpers that need the same persisted latest export-package projection behavior should extend the existing `getLatestCaseExportPackageProjection` seam instead of introducing a parallel export-package projection wrapper stack/i,
  );
  assert.match(
    docsSection,
    /does not change runtime behavior, projection semantics, persistence semantics, filesystem behavior, API behavior, or fail-closed behavior/i,
  );

  assert.match(
    helperSlice,
    /async function getLatestCaseExportPackageProjection\(\s*caseId,\s*options = \{\}\s*\)\s*\{/,
  );
  assert.match(
    helperSlice,
    /throw createPersistenceError\("ERR_CASE_ID_INVALID", "caseId must be a non-empty string"\);/,
  );
  assert.match(
    helperSlice,
    /const exportPackageSnapshot = await getLatestCaseExportPackageSnapshot\(caseId, options\);/,
  );
  assert.match(
    helperSlice,
    /if \(!exportPackageSnapshot\) \{\s*return null;\s*\}/s,
  );
  assert.match(
    helperSlice,
    /const releaseEvalStore = await readStore\(releaseEvalRunsFileName, options\);/,
  );
  assert.match(
    helperSlice,
    /const caseRuns = releaseEvalStore\[caseId\];/,
  );
  assert.match(
    helperSlice,
    /let currentProfileDossierSnapshot = null;/,
  );
  assert.match(
    helperSlice,
    /if \(Array\.isArray\(caseRuns\) && caseRuns\.length > 0\) \{\s*const latestReleaseEvalRecord = caseRuns\[caseRuns\.length - 1\];\s*const latestReleaseEvalRun = latestReleaseEvalRecord\.release_eval_payload;\s*const caseProfileInputs = await getCaseProfileInputs\(caseId, options\);/s,
  );
  assert.match(
    helperSlice,
    /currentProfileDossierSnapshot = resolvePersistedReleaseEvalProfileDossierSnapshot\(\s*latestReleaseEvalRun,\s*caseProfileInputs,\s*\{\s*persisted_at: latestReleaseEvalRecord\.persisted_at,\s*\},\s*\);/s,
  );
  assert.match(
    helperSlice,
    /return resolveExportPackageProjection\(\s*exportPackageSnapshot,\s*currentProfileDossierSnapshot,\s*\);/s,
  );

  assert.deepEqual(
    collectLineMatches(databaseIndexText, /getLatestCaseExportPackageProjection/),
    [522, 1579],
  );
  assert.deepEqual(
    collectLineMatches(
      databaseIndexText,
      /^\s*getLatestCaseExportPackageProjection,\s*$/,
    ),
    [1579],
  );
  assert.deepEqual(
    collectLineMatches(apiIndexText, /getLatestCaseExportPackageProjection/),
    [11, 434, 999, 1069, 1139, 1213, 1290, 1370, 1454, 1534],
  );

  assert.doesNotMatch(helperSlice, /persistCaseExportPackageSnapshot\(/);
  assert.doesNotMatch(helperSlice, /refreshCaseExportPackageSnapshot\(/);
  assert.doesNotMatch(helperSlice, /getLatestCaseExportPackageBundleManifestProjection\(/);
  assert.doesNotMatch(helperSlice, /getLatestCaseExportPackageBundleArchiveArtifactProjection\(/);
  assert.doesNotMatch(helperSlice, /getLatestCaseReleaseEvalRun\(/);
  assert.doesNotMatch(helperSlice, /getLatestCaseProfileDossierProjection\(/);
  assert.doesNotMatch(helperSlice, /resolvePersistedReleaseEvalProfileDossierProjection\(/);
  assert.doesNotMatch(helperSlice, /validateSWEBodelningExportPackageProjection\(/);
  assert.doesNotMatch(helperSlice, /validateCMDExportPackageProjection\(/);
  assert.doesNotMatch(helperSlice, /handleCaseExportPackageLatestRoute\(/);

  assert.match(
    exportPackageApiTestText,
    /const expectedProjection = await getLatestCaseExportPackageProjection\("case-1", \{\s*storageDir,?\s*\}\);/s,
  );
  assert.match(
    exportPackageApiTestText,
    /const expectedProjection = await getLatestCaseExportPackageProjection\("case-cmd", \{\s*storageDir,?\s*\}\);/s,
  );
  assert.match(
    exportPackageApiTestText,
    /assert\.deepEqual\(response\.body, expectedProjection\);/,
  );

  assert.match(
    exportPackageAdapterRegistryTestText,
    /const projected = await getLatestCaseExportPackageProjection\("case-2", \{\s*storageDir,?\s*\}\);/s,
  );
  assert.match(
    exportPackageAdapterRegistryTestText,
    /const expectedViaRegistry = resolveExportPackageProjection\(\s*refreshed,\s*releaseEvalRun\.profile_dossier_snapshot,\s*\);/s,
  );
  assert.match(
    exportPackageAdapterRegistryTestText,
    /const latestProjection = await getLatestCaseExportPackageProjection\("case-3", \{\s*storageDir,?\s*\}\);/s,
  );

  assert.match(
    exportPackageDocxArtifactApiTestText,
    /const exportPackageProjection = await getLatestCaseExportPackageProjection\(/,
  );
  assert.match(
    exportPackagePdfArtifactApiTestText,
    /const exportPackageProjection = await getLatestCaseExportPackageProjection\(/,
  );
  assert.match(
    exportPackageJsonArtifactApiTestText,
    /const exportPackageProjection = await getLatestCaseExportPackageProjection\(/,
  );
  assert.match(
    exportPackageMarkdownArtifactApiTestText,
    /const exportPackageProjection = await getLatestCaseExportPackageProjection\(/,
  );
  assert.match(
    exportPackageDocxArtifactDeliveryApiTestText,
    /const exportPackageProjection = await getLatestCaseExportPackageProjection\(/,
  );
  assert.match(
    exportPackagePdfArtifactDeliveryApiTestText,
    /const exportPackageProjection = await getLatestCaseExportPackageProjection\(/,
  );
  assert.match(
    exportPackageJsonArtifactDeliveryApiTestText,
    /const exportPackageProjection = await getLatestCaseExportPackageProjection\(/,
  );
  assert.match(
    exportPackageMarkdownArtifactDeliveryApiTestText,
    /const exportPackageProjection = await getLatestCaseExportPackageProjection\(/,
  );
});
