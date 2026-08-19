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
const pdfArtifactApiTestText = fs.readFileSync(
  path.join(__dirname, "export-package-pdf-artifact-api.test.js"),
  "utf8",
);
const pdfArtifactDeliveryApiTestText = fs.readFileSync(
  path.join(__dirname, "export-package-pdf-artifact-delivery-api.test.js"),
  "utf8",
);
const pdfArtifactAdapterRegistryTestText = fs.readFileSync(
  path.join(__dirname, "export-package-pdf-artifact-adapter-registry.test.js"),
  "utf8",
);

function collectLineMatches(text, pattern) {
  const linePattern = new RegExp(pattern.source, pattern.flags.replaceAll("g", ""));
  return text.split("\n").flatMap((line, index) => (
    linePattern.test(line) ? [index + 1] : []
  ));
}

test("docs freeze the shared database export-package PDF artifact projection helper seam as the persisted latest projection boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared Database Export-Package PDF Artifact Projection Helper Seam Freeze[\s\S]*?(?=\n### )/,
  );
  const helperStart = databaseIndexText.indexOf(
    "async function getLatestCaseExportPackagePdfArtifactProjection(caseId, options = {}) {",
  );
  const helperEnd = databaseIndexText.indexOf(
    "async function getLatestCaseExportPackageJsonArtifactProjection(caseId, options = {}) {",
    helperStart,
  );

  assert.ok(
    docsSectionMatch,
    "expected export-package PDF artifact projection helper docs section",
  );
  assert.notEqual(
    helperStart,
    -1,
    "expected getLatestCaseExportPackagePdfArtifactProjection helper",
  );
  assert.notEqual(helperEnd, -1, "expected next helper boundary");

  const docsSection = docsSectionMatch[0];
  const helperSlice = databaseIndexText.slice(helperStart, helperEnd);

  assert.match(
    docsSection,
    /Shared Database Export-Package PDF Artifact Projection Helper Seam Freeze/i,
  );
  assert.match(
    docsSection,
    /shared `packages\/database\/src\/index\.js` `getLatestCaseExportPackagePdfArtifactProjection` helper is the canonical persisted case-level latest `export_package_pdf_artifact` projection-resolution boundary/i,
  );
  assert.match(
    docsSection,
    /currently evidenced included database\/runtime surfaces in this freeze are limited to:\s+`packages\/database\/src\/index\.js` export surface\s+current bounded direct runtime reuse in `apps\/api\/src\/index\.js`\s+current runtime proof in `tests\/export-package-pdf-artifact-api\.test\.js`\s+current runtime\/helper proof in `tests\/export-package-pdf-artifact-delivery-api\.test\.js`\s+current helper\/output proof in `tests\/export-package-pdf-artifact-adapter-registry\.test\.js`/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackagePdfArtifactProjection` rejecting invalid `caseId` values through `createPersistenceError\("ERR_CASE_ID_INVALID", "caseId must be a non-empty string"\)`/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackagePdfArtifactProjection` loading the latest persisted PDF artifact snapshot through the already-frozen reader seam `getLatestCaseExportPackagePdfArtifactSnapshot\(caseId, options\)`/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackagePdfArtifactProjection` returning `null` when that reader seam yields no persisted PDF artifact snapshot/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackagePdfArtifactProjection` loading the current persisted export-package snapshot through the already-frozen reader seam `getLatestCaseExportPackageSnapshot\(caseId, options\)`/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackagePdfArtifactProjection` loading the persisted release-eval store through `readStore\(releaseEvalRunsFileName, options\)`/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackagePdfArtifactProjection` reading `releaseEvalStore\[caseId\]` as the persisted case-level release-eval record list lookup/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackagePdfArtifactProjection` defaulting `currentProfileDossierSnapshot` to `null` when no persisted release-eval record list exists/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackagePdfArtifactProjection` selecting `caseRuns\[caseRuns\.length - 1\]` as the persisted latest release-eval record when a persisted release-eval record list exists/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackagePdfArtifactProjection` loading persisted case profile inputs through the already-frozen reader seam `getCaseProfileInputs\(caseId, options\)` before dossier reconstruction when a latest persisted release-eval record exists/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackagePdfArtifactProjection` reconstructing the current persisted profile-dossier snapshot through the already-frozen lower reconciliation seam `resolvePersistedReleaseEvalProfileDossierSnapshot\(latestReleaseEvalRun, caseProfileInputs, \{ persisted_at: latestReleaseEvalRecord\.persisted_at \}\)`/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackagePdfArtifactProjection` delegating final PDF artifact projection assembly through `resolveExportPackagePdfArtifactProjection\(exportPackagePdfArtifactSnapshot, currentExportPackageSnapshot, currentProfileDossierSnapshot\)`/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackagePdfArtifactProjection` returning the resulting projection unchanged/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen PDF artifact reader seam is limited to `getLatestCaseExportPackagePdfArtifactProjection` loading `getLatestCaseExportPackagePdfArtifactSnapshot\(caseId, options\)` as the prerequisite latest persisted PDF artifact snapshot and returning `null` when that reader seam yields no snapshot; persisted PDF artifact latest-read\/write\/refresh semantics remain outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen export-package snapshot reader seam is limited to `getLatestCaseExportPackagePdfArtifactProjection` loading `getLatestCaseExportPackageSnapshot\(caseId, options\)` as the current export-package input for downstream PDF artifact projection resolution/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen release-eval reconciliation helper seam is limited to `getLatestCaseExportPackagePdfArtifactProjection` loading the persisted release-eval store, selecting the persisted latest release-eval record when present, loading persisted case profile inputs through `getCaseProfileInputs\(caseId, options\)`, and reconstructing the current persisted profile-dossier snapshot through `resolvePersistedReleaseEvalProfileDossierSnapshot\(\.\.\.\)`; persisted release-eval reconciliation and dossier-snapshot resolution semantics remain outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen case-profile-input reader-helper seam is limited to `getLatestCaseExportPackagePdfArtifactProjection` loading persisted case profile inputs through `getCaseProfileInputs\(caseId, options\)` before delegated dossier reconstruction; persisted profile-input read semantics remain outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /current relationship to the governance-side PDF artifact projection handoff already evidenced in repo code is limited to `getLatestCaseExportPackagePdfArtifactProjection` delegating final PDF artifact projection assembly through `resolveExportPackagePdfArtifactProjection\(exportPackagePdfArtifactSnapshot, currentExportPackageSnapshot, currentProfileDossierSnapshot\)` and returning that downstream result unchanged; governance-side PDF artifact projection assembly, `snapshot_status` derivation, adapter dispatch, parent export-package projection semantics, and lower projection validation remain outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /current returned canonical projection shape already evidenced for this helper seam is limited to the governance-resolved `export_package_pdf_artifact` projection object returned unchanged from `resolveExportPackagePdfArtifactProjection\(\.\.\.\)`, including the top-level `snapshot_status` block already surfaced by that downstream resolver contract/i,
  );
  assert.match(
    docsSection,
    /current bounded live-code reuse already evidenced in `packages\/database\/src\/index\.js` is limited to `getLatestCaseExportPackagePdfArtifactProjection` being exposed from `packages\/database\/src\/index\.js`; no current additional in-package helper reuse is evidenced/i,
  );
  assert.match(
    docsSection,
    /current bounded direct runtime reuse already evidenced in `apps\/api\/src\/index\.js` is limited to:\s+`handleCaseExportPackagePdfArtifactLatestRoute`\s+`handleCaseExportPackagePdfArtifactDownloadRoute`/i,
  );
  assert.match(
    docsSection,
    /current runtime\/test surface already evidenced in `tests\/export-package-pdf-artifact-api\.test\.js`, `tests\/export-package-pdf-artifact-delivery-api\.test\.js`, and `tests\/export-package-pdf-artifact-adapter-registry\.test\.js` is limited to successful PDF artifact latest-read staying aligned with helper output across SWE and CMD flows, PDF artifact delivery consuming this helper as a separate downstream artifact projection input, same-tenant upstream profile drift enforcement against helper output, and helper output matching the separate governance PDF projection resolver path while preserving the canonical downstream projection surface/i,
  );
  assert.match(
    docsSection,
    /already-frozen database export-package PDF artifact reader-helper seam remains outside this helper seam/i,
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
    /shared governance PDF\/export-package helper seams remain outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /lower schemas PDF artifact projection-validator seam remains outside this helper seam/i,
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
    /future database helpers that need the same persisted latest PDF artifact projection behavior should extend the existing `getLatestCaseExportPackagePdfArtifactProjection` seam instead of introducing a parallel PDF artifact projection wrapper stack/i,
  );
  assert.match(
    docsSection,
    /does not change runtime behavior, projection semantics, persistence semantics, filesystem behavior, API behavior, or fail-closed behavior/i,
  );

  assert.match(
    helperSlice,
    /async function getLatestCaseExportPackagePdfArtifactProjection\(\s*caseId,\s*options = \{\}\s*\)\s*\{/,
  );
  assert.match(
    helperSlice,
    /throw createPersistenceError\("ERR_CASE_ID_INVALID", "caseId must be a non-empty string"\);/,
  );
  assert.match(
    helperSlice,
    /const exportPackagePdfArtifactSnapshot =\s*await getLatestCaseExportPackagePdfArtifactSnapshot\(caseId, options\);/s,
  );
  assert.match(
    helperSlice,
    /if \(!exportPackagePdfArtifactSnapshot\) \{\s*return null;\s*\}/s,
  );
  assert.match(
    helperSlice,
    /const currentExportPackageSnapshot = await getLatestCaseExportPackageSnapshot\(caseId, options\);/,
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
    /return resolveExportPackagePdfArtifactProjection\(\s*exportPackagePdfArtifactSnapshot,\s*currentExportPackageSnapshot,\s*currentProfileDossierSnapshot,\s*\);/s,
  );

  assert.deepEqual(
    collectLineMatches(databaseIndexText, /getLatestCaseExportPackagePdfArtifactProjection/),
    [640, 1573],
  );
  assert.deepEqual(
    collectLineMatches(
      databaseIndexText,
      /^\s*getLatestCaseExportPackagePdfArtifactProjection,\s*$/,
    ),
    [1573],
  );
  assert.deepEqual(
    collectLineMatches(apiIndexText, /getLatestCaseExportPackagePdfArtifactProjection/),
    [6, 1061, 1526],
  );

  assert.doesNotMatch(helperSlice, /persistCaseExportPackagePdfArtifactSnapshot\(/);
  assert.doesNotMatch(helperSlice, /refreshCaseExportPackagePdfArtifactSnapshot\(/);
  assert.doesNotMatch(helperSlice, /getLatestCaseExportPackageProjection\(/);
  assert.doesNotMatch(helperSlice, /getLatestCaseExportPackageBundleManifestProjection\(/);
  assert.doesNotMatch(helperSlice, /getLatestCaseExportPackageBundleArchiveArtifactProjection\(/);
  assert.doesNotMatch(helperSlice, /getLatestCaseProfileDossierProjection\(/);
  assert.doesNotMatch(helperSlice, /getLatestCaseReleaseEvalRun\(/);
  assert.doesNotMatch(helperSlice, /resolvePersistedReleaseEvalProfileDossierProjection\(/);
  assert.doesNotMatch(helperSlice, /validateSWEBodelningExportPackagePdfArtifactProjection\(/);
  assert.doesNotMatch(helperSlice, /validateCMDExportPackagePdfArtifactProjection\(/);
  assert.doesNotMatch(helperSlice, /handleCaseExportPackagePdfArtifactLatestRoute\(/);

  assert.match(
    pdfArtifactApiTestText,
    /const expectedProjection = await getLatestCaseExportPackagePdfArtifactProjection\("case-1", \{\s*storageDir,?\s*\}\);/s,
  );
  assert.match(
    pdfArtifactApiTestText,
    /const expectedProjection = await getLatestCaseExportPackagePdfArtifactProjection\("case-cmd", \{\s*storageDir,?\s*\}\);/s,
  );
  assert.match(
    pdfArtifactApiTestText,
    /assert\.deepEqual\(response\.body, expectedProjection\);/,
  );

  assert.match(
    pdfArtifactDeliveryApiTestText,
    /const response = await handleCaseExportPackagePdfArtifactDownloadRoute\(/,
  );
  assert.match(
    pdfArtifactDeliveryApiTestText,
    /const exportPackageProjection = await getLatestCaseExportPackageProjection\(\s*"case-profile-drift",\s*\{\s*storageDir,?\s*\},\s*\);/s,
  );
  assert.match(
    pdfArtifactDeliveryApiTestText,
    /assert\.deepEqual\(response\.body, Buffer\.from\(persistedPdfArtifact\.body_base64, "base64"\)\);/,
  );

  assert.match(
    pdfArtifactAdapterRegistryTestText,
    /const projected = await getLatestCaseExportPackagePdfArtifactProjection\("case-2", \{\s*storageDir,?\s*\}\);/s,
  );
  assert.match(
    pdfArtifactAdapterRegistryTestText,
    /const expectedViaRegistry = resolveExportPackagePdfArtifactProjection\(\s*pdfArtifact,\s*exportPackage,\s*releaseEvalRun\.profile_dossier_snapshot,\s*\);/s,
  );
  assert.match(
    pdfArtifactAdapterRegistryTestText,
    /const latestProjection = await getLatestCaseExportPackagePdfArtifactProjection\(\s*"case-3",\s*\{\s*storageDir,?\s*\},\s*\);/s,
  );
});
