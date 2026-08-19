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
const jsonArtifactApiTestText = fs.readFileSync(
  path.join(__dirname, "export-package-json-artifact-api.test.js"),
  "utf8",
);
const jsonArtifactDeliveryApiTestText = fs.readFileSync(
  path.join(__dirname, "export-package-json-artifact-delivery-api.test.js"),
  "utf8",
);
const jsonArtifactAdapterRegistryTestText = fs.readFileSync(
  path.join(__dirname, "export-package-json-artifact-adapter-registry.test.js"),
  "utf8",
);

function collectLineMatches(text, pattern) {
  const linePattern = new RegExp(pattern.source, pattern.flags.replaceAll("g", ""));
  return text.split("\n").flatMap((line, index) => (
    linePattern.test(line) ? [index + 1] : []
  ));
}

test("docs freeze the shared database export-package JSON artifact projection helper seam as the persisted latest projection boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared Database Export-Package JSON Artifact Projection Helper Seam Freeze[\s\S]*?(?=\n### )/,
  );
  const helperStart = databaseIndexText.indexOf(
    "async function getLatestCaseExportPackageJsonArtifactProjection(caseId, options = {}) {",
  );
  const helperEnd = databaseIndexText.indexOf(
    "async function getLatestCaseExportPackageMarkdownArtifactSnapshot(",
    helperStart,
  );

  assert.ok(
    docsSectionMatch,
    "expected export-package JSON artifact projection helper docs section",
  );
  assert.notEqual(
    helperStart,
    -1,
    "expected getLatestCaseExportPackageJsonArtifactProjection helper",
  );
  assert.notEqual(helperEnd, -1, "expected next helper boundary");

  const docsSection = docsSectionMatch[0];
  const helperSlice = databaseIndexText.slice(helperStart, helperEnd);

  assert.match(
    docsSection,
    /Shared Database Export-Package JSON Artifact Projection Helper Seam Freeze/i,
  );
  assert.match(
    docsSection,
    /shared `packages\/database\/src\/index\.js` `getLatestCaseExportPackageJsonArtifactProjection` helper is the canonical persisted case-level latest `export_package_json_artifact` projection-resolution boundary/i,
  );
  assert.match(
    docsSection,
    /currently evidenced included database\/runtime surfaces in this freeze are limited to:\s+`packages\/database\/src\/index\.js` export surface\s+current bounded direct runtime reuse in `apps\/api\/src\/index\.js`\s+current runtime proof in `tests\/export-package-json-artifact-api\.test\.js`\s+current runtime\/helper proof in `tests\/export-package-json-artifact-delivery-api\.test\.js`\s+current helper\/output proof in `tests\/export-package-json-artifact-adapter-registry\.test\.js`/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageJsonArtifactProjection` rejecting invalid `caseId` values through `createPersistenceError\("ERR_CASE_ID_INVALID", "caseId must be a non-empty string"\)`/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageJsonArtifactProjection` loading the latest persisted JSON artifact snapshot through the nearby reader boundary `getLatestCaseExportPackageJsonArtifactSnapshot\(caseId, options\)`/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageJsonArtifactProjection` returning `null` when that nearby reader boundary yields no persisted JSON artifact snapshot/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageJsonArtifactProjection` loading the current persisted export-package snapshot through the already-frozen reader seam `getLatestCaseExportPackageSnapshot\(caseId, options\)`/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageJsonArtifactProjection` loading the persisted release-eval store through `readStore\(releaseEvalRunsFileName, options\)`/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageJsonArtifactProjection` reading `releaseEvalStore\[caseId\]` as the persisted case-level release-eval record list lookup/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageJsonArtifactProjection` defaulting `currentProfileDossierSnapshot` to `null` when no persisted release-eval record list exists/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageJsonArtifactProjection` selecting `caseRuns\[caseRuns\.length - 1\]` as the persisted latest release-eval record when a persisted release-eval record list exists/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageJsonArtifactProjection` loading persisted case profile inputs through the already-frozen reader seam `getCaseProfileInputs\(caseId, options\)` before dossier reconstruction when a latest persisted release-eval record exists/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageJsonArtifactProjection` reconstructing the current persisted profile-dossier snapshot through the already-frozen lower reconciliation seam `resolvePersistedReleaseEvalProfileDossierSnapshot\(latestReleaseEvalRun, caseProfileInputs, \{ persisted_at: latestReleaseEvalRecord\.persisted_at \}\)`/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageJsonArtifactProjection` delegating final JSON artifact projection assembly through `resolveExportPackageJsonArtifactProjection\(exportPackageJsonArtifactSnapshot, currentExportPackageSnapshot, currentProfileDossierSnapshot\)`/i,
  );
  assert.match(
    docsSection,
    /`getLatestCaseExportPackageJsonArtifactProjection` returning the resulting projection unchanged/i,
  );
  assert.match(
    docsSection,
    /current relationship to the nearby JSON artifact reader boundary already evidenced in repo code is limited to `getLatestCaseExportPackageJsonArtifactProjection` loading `getLatestCaseExportPackageJsonArtifactSnapshot\(caseId, options\)` as the prerequisite latest persisted JSON artifact snapshot and returning `null` when that reader yields no snapshot; persisted JSON artifact latest-read\/write\/refresh semantics remain outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen export-package snapshot reader seam is limited to `getLatestCaseExportPackageJsonArtifactProjection` loading `getLatestCaseExportPackageSnapshot\(caseId, options\)` as the current export-package input for downstream JSON artifact projection resolution/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen release-eval reconciliation helper seam is limited to `getLatestCaseExportPackageJsonArtifactProjection` loading the persisted release-eval store, selecting the persisted latest release-eval record when present, loading persisted case profile inputs through `getCaseProfileInputs\(caseId, options\)`, and reconstructing the current persisted profile-dossier snapshot through `resolvePersistedReleaseEvalProfileDossierSnapshot\(\.\.\.\)`; persisted release-eval reconciliation and dossier-snapshot resolution semantics remain outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen case-profile-input reader-helper seam is limited to `getLatestCaseExportPackageJsonArtifactProjection` loading persisted case profile inputs through `getCaseProfileInputs\(caseId, options\)` before delegated dossier reconstruction; persisted profile-input read semantics remain outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /current relationship to the governance-side JSON artifact projection handoff already evidenced in repo code is limited to `getLatestCaseExportPackageJsonArtifactProjection` delegating final JSON artifact projection assembly through `resolveExportPackageJsonArtifactProjection\(exportPackageJsonArtifactSnapshot, currentExportPackageSnapshot, currentProfileDossierSnapshot\)` and returning that downstream result unchanged; governance-side JSON artifact projection assembly, `snapshot_status` derivation, adapter dispatch, parent export-package projection semantics, and lower projection validation remain outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /current returned canonical projection shape already evidenced for this helper seam is limited to the governance-resolved `export_package_json_artifact` projection object returned unchanged from `resolveExportPackageJsonArtifactProjection\(\.\.\.\)`, including the top-level `snapshot_status` block already surfaced by that downstream resolver contract/i,
  );
  assert.match(
    docsSection,
    /current bounded live-code reuse already evidenced in `packages\/database\/src\/index\.js` is limited to `getLatestCaseExportPackageJsonArtifactProjection` being exposed from `packages\/database\/src\/index\.js`; no current additional in-package helper reuse is evidenced/i,
  );
  assert.match(
    docsSection,
    /current bounded direct runtime reuse already evidenced in `apps\/api\/src\/index\.js` is limited to:\s+`handleCaseExportPackageJsonArtifactLatestRoute`\s+`handleCaseExportPackageJsonArtifactDownloadRoute`/i,
  );
  assert.match(
    docsSection,
    /current runtime\/test surface already evidenced in `tests\/export-package-json-artifact-api\.test\.js`, `tests\/export-package-json-artifact-delivery-api\.test\.js`, and `tests\/export-package-json-artifact-adapter-registry\.test\.js` is limited to successful JSON artifact latest-read staying aligned with helper output across SWE and CMD flows, JSON artifact delivery consuming this helper as a separate downstream artifact projection input, same-tenant upstream profile drift enforcement against helper output, and helper output matching the separate governance JSON projection resolver path while preserving the canonical downstream projection surface/i,
  );
  assert.match(
    docsSection,
    /already-frozen database export-package PDF artifact projection-helper seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /already-frozen database export-package PDF artifact reader-helper seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /already-frozen database export-package DOCX artifact projection-helper seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /already-frozen database export-package DOCX artifact reader-helper seam remains outside this helper seam/i,
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
    /shared governance JSON\/export-package helper seams remain outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /lower schemas JSON artifact projection-validator seam remains outside this helper seam/i,
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
    /future database helpers that need the same persisted latest JSON artifact projection behavior should extend the existing `getLatestCaseExportPackageJsonArtifactProjection` seam instead of introducing a parallel JSON artifact projection wrapper stack/i,
  );
  assert.match(
    docsSection,
    /does not change runtime behavior, projection semantics, persistence semantics, filesystem behavior, API behavior, or fail-closed behavior/i,
  );

  assert.match(
    helperSlice,
    /async function getLatestCaseExportPackageJsonArtifactProjection\(\s*caseId,\s*options = \{\}\s*\)\s*\{/,
  );
  assert.match(
    helperSlice,
    /throw createPersistenceError\("ERR_CASE_ID_INVALID", "caseId must be a non-empty string"\);/,
  );
  assert.match(
    helperSlice,
    /const exportPackageJsonArtifactSnapshot =\s*await getLatestCaseExportPackageJsonArtifactSnapshot\(caseId, options\);/s,
  );
  assert.match(
    helperSlice,
    /if \(!exportPackageJsonArtifactSnapshot\) \{\s*return null;\s*\}/s,
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
    /return resolveExportPackageJsonArtifactProjection\(\s*exportPackageJsonArtifactSnapshot,\s*currentExportPackageSnapshot,\s*currentProfileDossierSnapshot,\s*\);/s,
  );

  assert.deepEqual(
    collectLineMatches(databaseIndexText, /getLatestCaseExportPackageJsonArtifactProjection/),
    [678, 1575],
  );
  assert.deepEqual(
    collectLineMatches(
      databaseIndexText,
      /^\s*getLatestCaseExportPackageJsonArtifactProjection,\s*$/,
    ),
    [1575],
  );
  assert.deepEqual(
    collectLineMatches(apiIndexText, /getLatestCaseExportPackageJsonArtifactProjection/),
    [9, 1131, 1446],
  );

  assert.doesNotMatch(helperSlice, /persistCaseExportPackageJsonArtifactSnapshot\(/);
  assert.doesNotMatch(helperSlice, /refreshCaseExportPackageJsonArtifactSnapshot\(/);
  assert.doesNotMatch(helperSlice, /getLatestCaseExportPackageProjection\(/);
  assert.doesNotMatch(helperSlice, /getLatestCaseExportPackageBundleManifestProjection\(/);
  assert.doesNotMatch(helperSlice, /getLatestCaseExportPackageBundleArchiveArtifactProjection\(/);
  assert.doesNotMatch(helperSlice, /getLatestCaseProfileDossierProjection\(/);
  assert.doesNotMatch(helperSlice, /getLatestCaseReleaseEvalRun\(/);
  assert.doesNotMatch(helperSlice, /resolvePersistedReleaseEvalProfileDossierProjection\(/);
  assert.doesNotMatch(helperSlice, /validateSWEBodelningExportPackageJsonArtifactProjection\(/);
  assert.doesNotMatch(helperSlice, /validateCMDExportPackageJsonArtifactProjection\(/);
  assert.doesNotMatch(helperSlice, /handleCaseExportPackageJsonArtifactLatestRoute\(/);

  assert.match(
    jsonArtifactApiTestText,
    /const expectedProjection = await getLatestCaseExportPackageJsonArtifactProjection\("case-1", \{\s*storageDir,?\s*\}\);/s,
  );
  assert.match(
    jsonArtifactApiTestText,
    /const expectedProjection = await getLatestCaseExportPackageJsonArtifactProjection\(\s*"case-cmd",\s*\{\s*storageDir,?\s*\},\s*\);/s,
  );
  assert.match(
    jsonArtifactApiTestText,
    /assert\.deepEqual\(response\.body, expectedProjection\);/,
  );

  assert.match(
    jsonArtifactDeliveryApiTestText,
    /const response = await handleCaseExportPackageJsonArtifactDownloadRoute\(/,
  );
  assert.match(
    jsonArtifactDeliveryApiTestText,
    /assert\.equal\(response\.body, persistedJsonArtifact\.body_utf8\);/,
  );
  assert.match(
    jsonArtifactDeliveryApiTestText,
    /const response = await handleCaseExportPackageJsonArtifactDownloadRoute\(/,
  );

  assert.match(
    jsonArtifactAdapterRegistryTestText,
    /const projected = await getLatestCaseExportPackageJsonArtifactProjection\("case-2", \{\s*storageDir,?\s*\}\);/s,
  );
  assert.match(
    jsonArtifactAdapterRegistryTestText,
    /const expectedViaRegistry = resolveExportPackageJsonArtifactProjection\(\s*jsonArtifact,\s*exportPackage,\s*releaseEvalRun\.profile_dossier_snapshot,\s*\);/s,
  );
  assert.match(
    jsonArtifactAdapterRegistryTestText,
    /const latestProjection = await getLatestCaseExportPackageJsonArtifactProjection\(\s*"case-3",\s*\{\s*storageDir,?\s*\},\s*\);/s,
  );
  assert.match(
    jsonArtifactAdapterRegistryTestText,
    /const latestProjection = await getLatestCaseExportPackageJsonArtifactProjection\(\s*"case-4",\s*\{\s*storageDir,?\s*\},\s*\);/s,
  );
});
