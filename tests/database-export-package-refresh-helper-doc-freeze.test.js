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
const exportPackageRefreshTestText = fs.readFileSync(
  path.join(__dirname, "export-package-refresh.test.js"),
  "utf8",
);
const exportPackageRefreshApiTestText = fs.readFileSync(
  path.join(__dirname, "export-package-refresh-api.test.js"),
  "utf8",
);

function collectLineMatches(text, pattern) {
  const linePattern = new RegExp(pattern.source, pattern.flags.replaceAll("g", ""));
  return text.split("\n").flatMap((line, index) => (
    linePattern.test(line) ? [index + 1] : []
  ));
}

test("docs freeze the shared database export-package parent refresh helper seam as the persisted refresh boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared Database Export-Package Parent Refresh Helper Seam Freeze[\s\S]*?(?=\n### )/,
  );
  const refreshStart = databaseIndexText.indexOf(
    "async function refreshCaseExportPackageSnapshot(",
  );
  const refreshEnd = databaseIndexText.indexOf(
    "async function refreshCaseReleaseEvalRun(",
    refreshStart,
  );

  assert.ok(
    docsSectionMatch,
    "expected export-package parent refresh helper docs section",
  );
  assert.notEqual(
    refreshStart,
    -1,
    "expected refreshCaseExportPackageSnapshot helper",
  );
  assert.notEqual(refreshEnd, -1, "expected next helper boundary");

  const docsSection = docsSectionMatch[0];
  const refreshSlice = databaseIndexText.slice(refreshStart, refreshEnd);

  assert.match(
    docsSection,
    /Shared Database Export-Package Parent Refresh Helper Seam Freeze/i,
  );
  assert.match(
    docsSection,
    /shared `packages\/database\/src\/index\.js` `refreshCaseExportPackageSnapshot` helper is the canonical persisted case-level `export_package` parent refresh-helper boundary/i,
  );
  assert.match(
    docsSection,
    /currently evidenced included database\/runtime surfaces in this freeze are limited to:\s+`packages\/database\/src\/index\.js` export surface\s+current bounded direct runtime reuse in `apps\/api\/src\/index\.js`\s+current runtime proof in `tests\/export-package-refresh\.test\.js`\s+current runtime\/helper proof in `tests\/export-package-refresh-api\.test\.js`/i,
  );
  assert.match(
    docsSection,
    /current `packages\/database` parent refresh boundary already does this through the existing shared refresh helper with bounded direct runtime reuse in the thin export-package refresh route and no current direct latest-read route reuse/i,
  );
  assert.match(
    docsSection,
    /`refreshCaseExportPackageSnapshot` rejecting invalid `caseId` values through `createPersistenceError\("ERR_CASE_ID_INVALID", "caseId must be a non-empty string"\)`/i,
  );
  assert.match(
    docsSection,
    /`refreshCaseExportPackageSnapshot` loading the release-eval store through `readStore\(releaseEvalRunsFileName, options\)` as the bounded prerequisite release-eval read/i,
  );
  assert.match(
    docsSection,
    /`refreshCaseExportPackageSnapshot` rejecting missing persisted release-eval runs through `createPersistenceError\("ERR_RELEASE_EVAL_RUN_NOT_FOUND", "release eval run must exist before export package refresh", \{ case_id: caseId \}\)`/i,
  );
  assert.match(
    docsSection,
    /`refreshCaseExportPackageSnapshot` selecting `caseRuns\[caseRuns\.length - 1\]` as the persisted latest release-eval record/i,
  );
  assert.match(
    docsSection,
    /`refreshCaseExportPackageSnapshot` rejecting non-object latest release-eval payloads through `createPersistenceError\("ERR_RELEASE_EVAL_RUN_INVALID", "latest release eval payload must be an object", \{ case_id: caseId \}\)`/i,
  );
  assert.match(
    docsSection,
    /`refreshCaseExportPackageSnapshot` rejecting missing or non-object `latestReleaseEvalPayload\.profile_dossier_snapshot` values through `createPersistenceError\("ERR_PROFILE_DOSSIER_SNAPSHOT_NOT_FOUND", "profile dossier snapshot must exist before export package refresh", \{ case_id: caseId \}\)`/i,
  );
  assert.match(
    docsSection,
    /`refreshCaseExportPackageSnapshot` delegating canonical export-package derivation through the shared governance helper `deriveExportPackageFromProfileDossierSnapshot\(latestReleaseEvalPayload\.profile_dossier_snapshot, \{ generated_at: options\.generated_at \?\? new Date\(\)\.toISOString\(\), release_eval_run_id: latestReleaseEvalPayload\.release_eval_run_id, evaluator_version: latestReleaseEvalPayload\.evaluator_version, jurisdiction_profile_key: latestReleaseEvalPayload\.jurisdiction_profile_key, persisted_at: latestReleaseEvalRecord\.persisted_at \}\)`/i,
  );
  assert.match(
    docsSection,
    /`refreshCaseExportPackageSnapshot` delegating final persisted write ownership through the existing persistence helper `persistCaseExportPackageSnapshot\(caseId, canonicalExportPackage, options\)`/i,
  );
  assert.match(
    docsSection,
    /current relationship to the broader already-frozen case-level persisted `export_package` seam is limited to this helper being the narrower persisted parent refresh boundary inside that broader persistence seam/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen release-eval latest-reader seam is intentionally bounded and separate because this helper directly reads the release-eval store for refresh prerequisites rather than calling or owning `getLatestCaseReleaseEvalRun\(\.\.\.\)`/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen export-package snapshot-reader seam is negative and separate because this refresh helper does not perform export-package latest-read ownership and does not call `getLatestCaseExportPackageSnapshot\(\.\.\.\)`/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen export-package projection-helper seam is negative and separate because this refresh helper does not call `getLatestCaseExportPackageProjection\(\.\.\.\)` and does not perform export-package projection\/currentness ownership/i,
  );
  assert.match(
    docsSection,
    /current relationship to shared governance export-package derivation \/ adapter-dispatch \/ projection helper seams is limited to `refreshCaseExportPackageSnapshot` delegating parent export-package derivation through `deriveExportPackageFromProfileDossierSnapshot\(\.\.\.\)`/i,
  );
  assert.match(
    docsSection,
    /current relationship to profile-dossier \/ release-eval snapshot validation surfaces is limited to this helper consuming the persisted latest release-eval payload and its attached `profile_dossier_snapshot` as refresh prerequisites/i,
  );
  assert.match(
    docsSection,
    /current relationship to the shared export refresh invalid-contract API envelope partition is limited to route\/runtime consumers surfacing machine-readable invalid-contract responses from this helper path where governance derivation or final persisted validation rejects input/i,
  );
  assert.match(
    docsSection,
    /current bounded live-code reuse already evidenced in `packages\/database\/src\/index\.js` is limited to `refreshCaseExportPackageSnapshot` being exposed from `packages\/database\/src\/index\.js`/i,
  );
  assert.match(
    docsSection,
    /current bounded direct runtime reuse already evidenced in `apps\/api\/src\/index\.js` is limited to:\s+`handleCaseExportPackageRefreshRoute`/i,
  );
  assert.match(
    docsSection,
    /no current direct runtime reuse is evidenced in `apps\/api\/src\/index\.js` for:\s+`handleCaseExportPackageLatestRoute`/i,
  );
  assert.match(
    docsSection,
    /already-frozen broader case-level persisted `export_package` seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /already-frozen thin authenticated `POST \/cases\/:caseId\/export-package\/refresh` seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /already-frozen thin authenticated `GET \/cases\/:caseId\/export-package\/latest` seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /already-frozen release-eval latest-reader helper seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /already-frozen export-package snapshot-reader seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /already-frozen export-package projection-helper seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /shared governance export-package derivation, adapter-dispatch, and projection helper seams remain outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /profile-dossier and release-eval snapshot validation\/helper surfaces remain outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /sibling JSON, Markdown, PDF, DOCX, bundle\/package manifest, and final bundle\/archive refresh\/helper families remain outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /shared export refresh invalid-contract API envelope partition remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /future database helpers that need the same persisted parent export-package refresh behavior should extend the existing `refreshCaseExportPackageSnapshot` seam instead of introducing a parallel parent export-package refresh stack/i,
  );
  assert.match(
    docsSection,
    /does not change runtime behavior, refresh semantics, persistence semantics, filesystem behavior, API behavior, or fail-closed behavior/i,
  );

  assert.match(
    refreshSlice,
    /async function refreshCaseExportPackageSnapshot\(caseId, options = \{\}\)\s*\{/,
  );
  assert.match(
    refreshSlice,
    /throw createPersistenceError\("ERR_CASE_ID_INVALID", "caseId must be a non-empty string"\);/,
  );
  assert.match(
    refreshSlice,
    /const releaseEvalStore = await readStore\(releaseEvalRunsFileName, options\);/s,
  );
  assert.match(refreshSlice, /const caseRuns = releaseEvalStore\[caseId\];/);
  assert.match(
    refreshSlice,
    /throw createPersistenceError\(\s*"ERR_RELEASE_EVAL_RUN_NOT_FOUND",\s*"release eval run must exist before export package refresh",\s*\{ case_id: caseId \},\s*\);/s,
  );
  assert.match(
    refreshSlice,
    /const latestReleaseEvalRecord = caseRuns\[caseRuns\.length - 1\];/s,
  );
  assert.match(
    refreshSlice,
    /const latestReleaseEvalPayload = latestReleaseEvalRecord\.release_eval_payload;/s,
  );
  assert.match(
    refreshSlice,
    /throw createPersistenceError\(\s*"ERR_RELEASE_EVAL_RUN_INVALID",\s*"latest release eval payload must be an object",\s*\{ case_id: caseId \},\s*\);/s,
  );
  assert.match(
    refreshSlice,
    /throw createPersistenceError\(\s*"ERR_PROFILE_DOSSIER_SNAPSHOT_NOT_FOUND",\s*"profile dossier snapshot must exist before export package refresh",\s*\{ case_id: caseId \},\s*\);/s,
  );
  assert.match(
    refreshSlice,
    /const canonicalExportPackage = deriveExportPackageFromProfileDossierSnapshot\(\s*latestReleaseEvalPayload\.profile_dossier_snapshot,\s*\{[\s\S]*?generated_at: options\.generated_at \?\? new Date\(\)\.toISOString\(\),[\s\S]*?release_eval_run_id: latestReleaseEvalPayload\.release_eval_run_id,[\s\S]*?evaluator_version: latestReleaseEvalPayload\.evaluator_version,[\s\S]*?jurisdiction_profile_key: latestReleaseEvalPayload\.jurisdiction_profile_key,[\s\S]*?persisted_at: latestReleaseEvalRecord\.persisted_at,[\s\S]*?\},\s*\);/s,
  );
  assert.match(
    refreshSlice,
    /return persistCaseExportPackageSnapshot\(caseId, canonicalExportPackage, options\);/,
  );

  assert.deepEqual(
    collectLineMatches(databaseIndexText, /refreshCaseExportPackageSnapshot/),
    [1484, 1597],
  );
  assert.deepEqual(
    collectLineMatches(databaseIndexText, /^\s*refreshCaseExportPackageSnapshot,\s*$/),
    [1597],
  );
  assert.deepEqual(
    collectLineMatches(apiIndexText, /refreshCaseExportPackageSnapshot/),
    [20, 2030],
  );

  assert.doesNotMatch(refreshSlice, /getLatestCaseReleaseEvalRun\(/);
  assert.doesNotMatch(refreshSlice, /getLatestCaseExportPackageSnapshot\(/);
  assert.doesNotMatch(refreshSlice, /getLatestCaseExportPackageProjection\(/);
  assert.doesNotMatch(refreshSlice, /deriveExportPackage\(/);
  assert.doesNotMatch(refreshSlice, /resolveExportPackageProjection\(/);
  assert.doesNotMatch(refreshSlice, /handleCaseExportPackageRefreshRoute\(/);
  assert.doesNotMatch(refreshSlice, /handleCaseExportPackageLatestRoute\(/);
  assert.doesNotMatch(refreshSlice, /jsonResponse\(/);
  assert.doesNotMatch(refreshSlice, /errorResponse\(/);
  assert.doesNotMatch(refreshSlice, /writeStore\(/);
  assert.doesNotMatch(refreshSlice, /refreshCaseExportPackageJsonArtifactSnapshot\(/);
  assert.doesNotMatch(refreshSlice, /refreshCaseExportPackageMarkdownArtifactSnapshot\(/);
  assert.doesNotMatch(refreshSlice, /refreshCaseExportPackagePdfArtifactSnapshot\(/);
  assert.doesNotMatch(refreshSlice, /refreshCaseExportPackageDocxArtifactSnapshot\(/);
  assert.doesNotMatch(refreshSlice, /refreshCaseExportPackageBundleManifestSnapshot\(/);
  assert.doesNotMatch(refreshSlice, /refreshCaseExportPackageBundleArchiveArtifactSnapshot\(/);

  assert.match(
    exportPackageRefreshTestText,
    /const refreshed = await refreshCaseExportPackageSnapshot\("case-1", \{\s*storageDir,\s*generated_at: "2026-03-23T12:00:00\.000Z",\s*\}\);/s,
  );
  assert.match(
    exportPackageRefreshTestText,
    /const first = await refreshCaseExportPackageSnapshot\("case-1", \{\s*storageDir,\s*generated_at: "2026-03-23T12:00:00\.000Z",\s*\}\);/s,
  );
  assert.match(
    exportPackageRefreshTestText,
    /const second = await refreshCaseExportPackageSnapshot\("case-1", \{\s*storageDir,\s*generated_at: "2026-03-23T12:00:00\.000Z",\s*\}\);/s,
  );
  assert.match(exportPackageRefreshTestText, /assert\.deepEqual\(latest, refreshed\);/);

  assert.match(
    exportPackageRefreshApiTestText,
    /docs freeze the thin authenticated export_package refresh seam as a distinct canonical runtime\/refresh seam/,
  );
  assert.match(
    apiIndexText,
    /const latestReleaseEvalRun = await getLatestCaseReleaseEvalRun\(routeMatch\.caseId, options\);/,
  );
  assert.match(
    apiIndexText,
    /await refreshCaseExportPackageSnapshot\(\s*routeMatch\.caseId,\s*\{[\s\S]*?generated_at: request\.body\?\.generated_at,[\s\S]*?\},\s*\);/s,
  );
  assert.match(
    apiIndexText,
    /error\.code === "ERR_EXPORT_PACKAGE_INVALID" \|\|\s*error\.code === "ERR_PROFILE_DOSSIER_SNAPSHOT_INVALID"/s,
  );
});
