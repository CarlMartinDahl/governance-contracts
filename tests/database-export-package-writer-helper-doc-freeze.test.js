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
const exportPackagePersistenceTestText = fs.readFileSync(
  path.join(__dirname, "export-package-persistence.test.js"),
  "utf8",
);
const exportPackageRefreshTestText = fs.readFileSync(
  path.join(__dirname, "export-package-refresh.test.js"),
  "utf8",
);
const exportPackageValidatorDispatchTestText = fs.readFileSync(
  path.join(__dirname, "export-package-validator-dispatch.test.js"),
  "utf8",
);

function collectLineMatches(text, pattern) {
  const linePattern = new RegExp(pattern.source, pattern.flags.replaceAll("g", ""));
  return text.split("\n").flatMap((line, index) => (
    linePattern.test(line) ? [index + 1] : []
  ));
}

test("docs freeze the shared database export-package writer helper seam as the persisted writer boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared Database Export-Package Writer Helper Seam Freeze[\s\S]*?(?=\n### )/,
  );
  const writerStart = databaseIndexText.indexOf(
    "async function persistCaseExportPackageSnapshot(",
  );
  const writerEnd = databaseIndexText.indexOf(
    "async function persistCaseExportPackageBundleArchiveArtifactSnapshot(",
    writerStart,
  );
  const refreshStart = databaseIndexText.indexOf(
    "async function refreshCaseExportPackageSnapshot(",
  );
  const refreshEnd = databaseIndexText.indexOf(
    "async function refreshCaseReleaseEvalRun(",
    refreshStart,
  );

  assert.ok(docsSectionMatch, "expected export-package writer docs section");
  assert.notEqual(writerStart, -1, "expected persistCaseExportPackageSnapshot helper");
  assert.notEqual(writerEnd, -1, "expected next database helper boundary");
  assert.notEqual(refreshStart, -1, "expected refreshCaseExportPackageSnapshot helper");
  assert.notEqual(refreshEnd, -1, "expected next refresh helper boundary");

  const docsSection = docsSectionMatch[0];
  const writerSlice = databaseIndexText.slice(writerStart, writerEnd);
  const refreshSlice = databaseIndexText.slice(refreshStart, refreshEnd);

  assert.match(
    docsSection,
    /Shared Database Export-Package Writer Helper Seam Freeze/i,
  );
  assert.match(
    docsSection,
    /shared `packages\/database\/src\/index\.js` `persistCaseExportPackageSnapshot` helper is the canonical persisted case-level `export_package` writer boundary/i,
  );
  assert.match(
    docsSection,
    /currently evidenced included database\/runtime surfaces in this freeze are limited to:\s+`packages\/database\/src\/index\.js` export surface\s+current shared in-package refresh-helper reuse in `packages\/database\/src\/index\.js`\s+current runtime proof in `tests\/export-package-persistence\.test\.js`\s+current runtime proof in `tests\/export-package-refresh\.test\.js`\s+current validator-dispatch proof in `tests\/export-package-validator-dispatch\.test\.js`/i,
  );
  assert.match(
    docsSection,
    /current `packages\/database` write boundary already does this through the existing shared writer helper with bounded live-code reuse inside the database package and no direct route reuse/i,
  );
  assert.match(
    docsSection,
    /`persistCaseExportPackageSnapshot` rejecting invalid `caseId` values through `createPersistenceError\("ERR_CASE_ID_INVALID", "caseId must be a non-empty string"\)`/i,
  );
  assert.match(
    docsSection,
    /`persistCaseExportPackageSnapshot` rejecting unsupported string `jurisdiction_profile_key` values through `typeof exportPackageSnapshot\?\.jurisdiction_profile_key === "string" && !hasJurisdictionProfileCapability\(exportPackageSnapshot\.jurisdiction_profile_key, "export_package"\)` plus `createPersistenceError\("ERR_UNSUPPORTED_JURISDICTION_PROFILE", "jurisdiction_profile_key is not supported", \{ jurisdiction_profile_key: exportPackageSnapshot\.jurisdiction_profile_key \}\)`/i,
  );
  assert.match(
    docsSection,
    /`persistCaseExportPackageSnapshot` validating and canonicalizing the incoming snapshot through `validateExportPackage\(exportPackageSnapshot\)`/i,
  );
  assert.match(
    docsSection,
    /`persistCaseExportPackageSnapshot` loading the export-package snapshot store through `readStore\(exportPackageSnapshotsFileName, options\)`/i,
  );
  assert.match(
    docsSection,
    /`persistCaseExportPackageSnapshot` reading `store\[caseId\]` as the persisted case-level export-package snapshot record list lookup and falling back to `\[\]` when no list exists/i,
  );
  assert.match(
    docsSection,
    /`persistCaseExportPackageSnapshot` appending the normalized persisted record through `normalizeExportPackageRecord\(caseId, canonicalExportPackage\)`/i,
  );
  assert.match(
    docsSection,
    /`persistCaseExportPackageSnapshot` assigning the updated case snapshot list back to `store\[caseId\]`/i,
  );
  assert.match(
    docsSection,
    /`persistCaseExportPackageSnapshot` writing the updated store through `writeStore\(exportPackageSnapshotsFileName, store, options\)`/i,
  );
  assert.match(
    docsSection,
    /`persistCaseExportPackageSnapshot` returning the canonical `export_package` produced by `validateExportPackage\(exportPackageSnapshot\)`/i,
  );
  assert.match(
    docsSection,
    /current relationship to the broader already-frozen case-level persisted `export_package` snapshot seam is limited to this helper being the narrower persisted write boundary inside that broader persistence seam, while latest-read and refresh remain separate adjacent surfaces/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen export-package snapshot-reader seam is negative and separate because this writer helper does not perform latest-read ownership and does not call `getLatestCaseExportPackageSnapshot\(\.\.\.\)`/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen export-package parent refresh-helper seam is limited to `refreshCaseExportPackageSnapshot` delegating final persisted write ownership through `persistCaseExportPackageSnapshot\(caseId, canonicalExportPackage, options\)`/i,
  );
  assert.match(
    docsSection,
    /current relationship to the shared schema-side export-package validator seam is limited to `persistCaseExportPackageSnapshot` delegating validation\/canonicalization through `validateExportPackage\(exportPackageSnapshot\)`/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen record-normalization seam is limited to `persistCaseExportPackageSnapshot` delegating persisted record shaping through `normalizeExportPackageRecord\(caseId, canonicalExportPackage\)`/i,
  );
  assert.match(
    docsSection,
    /current bounded live-code reuse already evidenced in `packages\/database\/src\/index\.js` is limited to:\s+`persistCaseExportPackageSnapshot` being reused by `refreshCaseExportPackageSnapshot`\s+`persistCaseExportPackageSnapshot` being exposed from `packages\/database\/src\/index\.js`/i,
  );
  assert.match(
    docsSection,
    /no current direct runtime reuse is evidenced in `apps\/api\/src\/index\.js`/i,
  );
  assert.match(
    docsSection,
    /current bounded runtime\/test surface already evidenced in `packages\/database\/src\/index\.js`, `tests\/export-package-persistence\.test\.js`, `tests\/export-package-refresh\.test\.js`, and `tests\/export-package-validator-dispatch\.test\.js` is limited to 1 shared writer-helper definition, 1 higher database refresh caller, 1 database export surface, 1 invalid-`caseId` persistence error branch, 1 unsupported-profile persistence error branch, 1 shared validation\/canonicalization step, 1 store read, 1 normalized-record append, 1 store write, 1 canonical `export_package` return surface, and current runtime proof across the existing export-package persistence\/refresh\/validator-dispatch tests/i,
  );
  assert.match(
    docsSection,
    /already-frozen broader case-level persisted `export_package` seam remains outside this helper seam/i,
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
    /already-frozen export-package parent refresh-helper seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /thin authenticated `GET \/cases\/:caseId\/export-package\/latest` and `POST \/cases\/:caseId\/export-package\/refresh` route seams remain outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /sibling JSON, Markdown, PDF, DOCX, bundle\/package manifest, and final bundle\/archive reader\/projection\/refresh helper families remain outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /shared governance export-package derivation, adapter-dispatch, and projection helper seams remain outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /shared export refresh invalid-contract API envelope partition remains outside this helper seam/i,
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
    /shared `normalizeRecord` \/ `normalizeReleaseEvalRecord` \/ `normalizeExportPackage\*Record` normalization seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /future database helpers that need the same persisted export-package write behavior should extend the existing `persistCaseExportPackageSnapshot` seam instead of introducing a parallel export-package writer stack/i,
  );
  assert.match(
    docsSection,
    /does not change runtime behavior, persistence semantics, filesystem behavior, API behavior, or fail-closed behavior/i,
  );

  assert.match(
    writerSlice,
    /async function persistCaseExportPackageSnapshot\(\s*caseId,\s*exportPackageSnapshot,\s*options = \{\},?\s*\)\s*\{/,
  );
  assert.match(
    writerSlice,
    /if \(!caseId \|\| typeof caseId !== "string"\) \{\s*throw createPersistenceError\("ERR_CASE_ID_INVALID", "caseId must be a non-empty string"\);\s*\}/s,
  );
  assert.match(
    writerSlice,
    /typeof exportPackageSnapshot\?\.jurisdiction_profile_key === "string" &&\s*!hasJurisdictionProfileCapability\(\s*exportPackageSnapshot\.jurisdiction_profile_key,\s*"export_package",\s*\)/s,
  );
  assert.match(
    writerSlice,
    /throw createPersistenceError\(\s*"ERR_UNSUPPORTED_JURISDICTION_PROFILE",\s*"jurisdiction_profile_key is not supported",[\s\S]*jurisdiction_profile_key: exportPackageSnapshot\.jurisdiction_profile_key,[\s\S]*\);/,
  );
  assert.match(
    writerSlice,
    /const canonicalExportPackage = validateExportPackage\(exportPackageSnapshot\);/,
  );
  assert.match(
    writerSlice,
    /const store = await readStore\(exportPackageSnapshotsFileName, options\);/,
  );
  assert.match(
    writerSlice,
    /const caseSnapshots = Array\.isArray\(store\[caseId\]\) \? store\[caseId\] : \[\];/,
  );
  assert.match(
    writerSlice,
    /caseSnapshots\.push\(\s*normalizeExportPackageRecord\(caseId, canonicalExportPackage\),\s*\);/s,
  );
  assert.match(writerSlice, /store\[caseId\] = caseSnapshots;/);
  assert.match(
    writerSlice,
    /await writeStore\(exportPackageSnapshotsFileName, store, options\);/,
  );
  assert.match(writerSlice, /return canonicalExportPackage;/);
  assert.deepEqual(
    collectLineMatches(databaseIndexText, /persistCaseExportPackageSnapshot/),
    [823, 1534, 1589],
  );
  assert.deepEqual(
    collectLineMatches(
      databaseIndexText,
      /^\s*persistCaseExportPackageSnapshot,\s*$/,
    ),
    [1589],
  );
  assert.equal((apiIndexText.match(/\bpersistCaseExportPackageSnapshot\b/g) || []).length, 0);
  assert.doesNotMatch(writerSlice, /getLatestCaseExportPackageSnapshot\(/);
  assert.doesNotMatch(writerSlice, /getLatestCaseExportPackageProjection\(/);
  assert.doesNotMatch(writerSlice, /refreshCaseExportPackageSnapshot\(/);
  assert.doesNotMatch(writerSlice, /deriveExportPackageFromProfileDossierSnapshot\(/);
  assert.doesNotMatch(writerSlice, /getLatestCaseReleaseEvalRun\(/);
  assert.doesNotMatch(writerSlice, /getCaseProfileInputs\(/);

  assert.match(
    refreshSlice,
    /return persistCaseExportPackageSnapshot\(caseId, canonicalExportPackage, options\);/,
  );

  assert.match(
    exportPackagePersistenceTestText,
    /test\("valid export package payload roundtrips through persistence"/,
  );
  assert.match(
    exportPackagePersistenceTestText,
    /const persisted = await persistCaseExportPackageSnapshot\("case-1", payload, \{\s*storageDir,\s*\}\);/s,
  );
  assert.match(
    exportPackagePersistenceTestText,
    /test\("invalid payload shape is rejected before persistence"/,
  );
  assert.match(
    exportPackagePersistenceTestText,
    /test\("non-SWE_BODELNING behavior remains unchanged"/,
  );
  assert.match(
    exportPackageRefreshTestText,
    /test\("canonical refresh\/create persists a valid SWE_BODELNING export package snapshot"/,
  );
  assert.match(
    exportPackageRefreshTestText,
    /assert\.match\(\s*databaseIndexText,\s*\/return persistCaseExportPackageSnapshot\\\(caseId, canonicalExportPackage, options\\\);\/,\s*\);/s,
  );
  assert.match(
    exportPackageValidatorDispatchTestText,
    /test\("packages\/database persisted export package validation uses the dispatch path while preserving current SWE_BODELNING behavior"/,
  );
  assert.match(
    exportPackageValidatorDispatchTestText,
    /test\("runtime support for CMD_PROFILE export-package persistence is enabled through the shared validator path"/,
  );
  assert.match(
    exportPackageValidatorDispatchTestText,
    /test\("unsupported\/non-SWE machine-readable behavior remains unchanged"/,
  );
});
