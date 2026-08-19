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
const exportPackageJsonArtifactPersistenceTestText = fs.readFileSync(
  path.join(__dirname, "export-package-json-artifact-persistence.test.js"),
  "utf8",
);
const exportPackageJsonArtifactRefreshTestText = fs.readFileSync(
  path.join(__dirname, "export-package-json-artifact-refresh.test.js"),
  "utf8",
);
const exportPackageJsonArtifactValidatorDispatchTestText = fs.readFileSync(
  path.join(__dirname, "export-package-json-artifact-validator-dispatch.test.js"),
  "utf8",
);

function collectLineMatches(text, pattern) {
  const linePattern = new RegExp(pattern.source, pattern.flags.replaceAll("g", ""));
  return text.split("\n").flatMap((line, index) => (
    linePattern.test(line) ? [index + 1] : []
  ));
}

test("docs freeze the shared database export-package JSON artifact writer helper seam as the persisted writer boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared Database Export-Package JSON Artifact Writer Helper Seam Freeze[\s\S]*?(?=\n### )/,
  );
  const writerStart = databaseIndexText.indexOf(
    "async function persistCaseExportPackageJsonArtifactSnapshot(",
  );
  const writerEnd = databaseIndexText.indexOf(
    "async function persistCaseExportPackageDocxArtifactSnapshot(",
    writerStart,
  );
  const refreshStart = databaseIndexText.indexOf(
    "async function refreshCaseExportPackageJsonArtifactSnapshot(",
  );
  const refreshEnd = databaseIndexText.indexOf(
    "async function refreshCaseExportPackageDocxArtifactSnapshot(",
    refreshStart,
  );

  assert.ok(docsSectionMatch, "expected JSON artifact writer docs section");
  assert.notEqual(writerStart, -1, "expected persistCaseExportPackageJsonArtifactSnapshot helper");
  assert.notEqual(writerEnd, -1, "expected next database writer helper boundary");
  assert.notEqual(refreshStart, -1, "expected refreshCaseExportPackageJsonArtifactSnapshot helper");
  assert.notEqual(refreshEnd, -1, "expected next JSON refresh helper boundary");

  const docsSection = docsSectionMatch[0];
  const writerSlice = databaseIndexText.slice(writerStart, writerEnd);
  const refreshSlice = databaseIndexText.slice(refreshStart, refreshEnd);

  assert.match(
    docsSection,
    /Shared Database Export-Package JSON Artifact Writer Helper Seam Freeze/i,
  );
  assert.match(
    docsSection,
    /shared `packages\/database\/src\/index\.js` `persistCaseExportPackageJsonArtifactSnapshot` helper is the canonical persisted case-level `export_package_json_artifact` writer boundary/i,
  );
  assert.match(
    docsSection,
    /currently evidenced included database\/runtime surfaces in this freeze are limited to:\s+`packages\/database\/src\/index\.js` export surface\s+current shared in-package refresh-helper reuse in `packages\/database\/src\/index\.js`\s+current runtime proof in `tests\/export-package-json-artifact-persistence\.test\.js`\s+current runtime proof in `tests\/export-package-json-artifact-refresh\.test\.js`\s+current validator-dispatch proof in `tests\/export-package-json-artifact-validator-dispatch\.test\.js`/i,
  );
  assert.match(
    docsSection,
    /current `packages\/database` JSON artifact write boundary already does this through the existing shared writer helper with bounded live-code reuse inside the database package and no direct route reuse/i,
  );
  assert.match(
    docsSection,
    /`persistCaseExportPackageJsonArtifactSnapshot` rejecting invalid `caseId` values through `createPersistenceError\("ERR_CASE_ID_INVALID", "caseId must be a non-empty string"\)`/i,
  );
  assert.match(
    docsSection,
    /`persistCaseExportPackageJsonArtifactSnapshot` parsing non-empty string `body_utf8` values with `JSON\.parse\(exportPackageJsonArtifactSnapshot\.body_utf8\)` only to inspect an embedded `jurisdiction_profile_key` before persistence validation continues/i,
  );
  assert.match(
    docsSection,
    /`persistCaseExportPackageJsonArtifactSnapshot` rejecting unsupported parsed JSON artifact `jurisdiction_profile_key` values through `hasJurisdictionProfileCapability\(parsedArtifactBody\.jurisdiction_profile_key, "export_package_json_artifact"\)` plus `createPersistenceError\("ERR_UNSUPPORTED_JURISDICTION_PROFILE", "jurisdiction_profile_key is not supported", \{ jurisdiction_profile_key: parsedArtifactBody\.jurisdiction_profile_key \}\)`/i,
  );
  assert.match(
    docsSection,
    /`persistCaseExportPackageJsonArtifactSnapshot` preserving the existing malformed-JSON handoff to `validateExportPackageJsonArtifact\(exportPackageJsonArtifactSnapshot\)` by swallowing JSON parse failures unless the thrown error is `ERR_UNSUPPORTED_JURISDICTION_PROFILE`/i,
  );
  assert.match(
    docsSection,
    /`persistCaseExportPackageJsonArtifactSnapshot` validating and canonicalizing the incoming snapshot through `validateExportPackageJsonArtifact\(exportPackageJsonArtifactSnapshot\)`/i,
  );
  assert.match(
    docsSection,
    /`persistCaseExportPackageJsonArtifactSnapshot` loading the JSON artifact snapshot store through `readStore\(exportPackageJsonArtifactSnapshotsFileName, options\)`/i,
  );
  assert.match(
    docsSection,
    /`persistCaseExportPackageJsonArtifactSnapshot` reading `store\[caseId\]` as the persisted case-level JSON artifact snapshot record list lookup and falling back to `\[\]` when no list exists/i,
  );
  assert.match(
    docsSection,
    /`persistCaseExportPackageJsonArtifactSnapshot` selecting `options\.persisted_at \?\? new Date\(\)\.toISOString\(\)` as the persisted record timestamp/i,
  );
  assert.match(
    docsSection,
    /`persistCaseExportPackageJsonArtifactSnapshot` appending the normalized persisted record through `normalizeExportPackageJsonArtifactRecord\(caseId, canonicalExportPackageJsonArtifact, persistedAt\)`/i,
  );
  assert.match(
    docsSection,
    /`persistCaseExportPackageJsonArtifactSnapshot` assigning the updated case snapshot list back to `store\[caseId\]`/i,
  );
  assert.match(
    docsSection,
    /`persistCaseExportPackageJsonArtifactSnapshot` writing the updated store through `writeStore\(exportPackageJsonArtifactSnapshotsFileName, store, options\)`/i,
  );
  assert.match(
    docsSection,
    /`persistCaseExportPackageJsonArtifactSnapshot` returning the canonical `export_package_json_artifact` produced by `validateExportPackageJsonArtifact\(exportPackageJsonArtifactSnapshot\)`/i,
  );
  assert.match(
    docsSection,
    /current relationship to the closed parent export-package writer-helper seam is negative and separate because this JSON artifact writer helper does not write parent `export_package` snapshots and does not call `persistCaseExportPackageSnapshot\(\.\.\.\)`/i,
  );
  assert.match(
    docsSection,
    /current relationship to the broader already-frozen case-level persisted `export_package_json_artifact` seam is limited to this helper being the narrower persisted write boundary inside that broader persistence seam, while latest-read and refresh remain separate adjacent surfaces/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen JSON artifact snapshot-reader seam is negative and separate because this writer helper does not perform latest-read ownership and does not call `getLatestCaseExportPackageJsonArtifactSnapshot\(\.\.\.\)`/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen JSON artifact projection-helper seam is negative and separate because this writer helper does not perform projection\/currentness ownership and does not call `getLatestCaseExportPackageJsonArtifactProjection\(\.\.\.\)`/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen JSON artifact refresh-helper seam is limited to `refreshCaseExportPackageJsonArtifactSnapshot` delegating final persisted write ownership through `persistCaseExportPackageJsonArtifactSnapshot\(caseId, canonicalExportPackageJsonArtifact, options\)`/i,
  );
  assert.match(
    docsSection,
    /current relationship to the shared schema-side JSON artifact validator seam is limited to `persistCaseExportPackageJsonArtifactSnapshot` delegating validation\/canonicalization through `validateExportPackageJsonArtifact\(exportPackageJsonArtifactSnapshot\)`/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen record-normalization seam is limited to `persistCaseExportPackageJsonArtifactSnapshot` delegating persisted record shaping through `normalizeExportPackageJsonArtifactRecord\(caseId, canonicalExportPackageJsonArtifact, persistedAt\)`/i,
  );
  assert.match(
    docsSection,
    /current bounded live-code reuse already evidenced in `packages\/database\/src\/index\.js` is limited to:\s+`persistCaseExportPackageJsonArtifactSnapshot` being reused by `refreshCaseExportPackageJsonArtifactSnapshot`\s+`persistCaseExportPackageJsonArtifactSnapshot` being exposed from `packages\/database\/src\/index\.js`/i,
  );
  assert.match(
    docsSection,
    /no current direct runtime reuse is evidenced in `apps\/api\/src\/index\.js`/i,
  );
  assert.match(
    docsSection,
    /current bounded runtime\/test surface already evidenced in `packages\/database\/src\/index\.js`, `tests\/export-package-json-artifact-persistence\.test\.js`, `tests\/export-package-json-artifact-refresh\.test\.js`, and `tests\/export-package-json-artifact-validator-dispatch\.test\.js` is limited to 1 shared JSON artifact writer-helper definition, 1 higher database JSON artifact refresh caller, 1 database export surface, 1 invalid-`caseId` persistence error branch, 1 parsed-body unsupported-profile persistence error branch, 1 shared validation\/canonicalization step, 1 store read, 1 normalized-record append, 1 store write, 1 canonical `export_package_json_artifact` return surface, and current runtime proof across the existing JSON artifact persistence\/refresh\/validator-dispatch tests/i,
  );
  assert.match(
    docsSection,
    /closed parent export-package writer-helper seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /already-frozen broader case-level persisted `export_package_json_artifact` seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /already-frozen JSON artifact snapshot-reader seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /already-frozen JSON artifact projection-helper seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /already-frozen JSON artifact refresh-helper seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /thin authenticated `GET \/cases\/:caseId\/export-package\/json-artifact\/latest`, `GET \/cases\/:caseId\/export-package\/json-artifact\/download`, and `POST \/cases\/:caseId\/export-package\/json-artifact\/refresh` route seams remain outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /sibling Markdown, PDF, DOCX, bundle\/package manifest, and final bundle\/archive reader\/projection\/refresh\/writer helper families remain outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /shared governance JSON artifact derivation, adapter-dispatch, and projection helper seams remain outside this helper seam/i,
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
    /future database helpers that need the same persisted JSON artifact write behavior should extend the existing `persistCaseExportPackageJsonArtifactSnapshot` seam instead of introducing a parallel JSON artifact writer stack/i,
  );
  assert.match(
    docsSection,
    /does not change runtime behavior, persistence semantics, filesystem behavior, API behavior, or fail-closed behavior/i,
  );

  assert.match(
    writerSlice,
    /async function persistCaseExportPackageJsonArtifactSnapshot\(\s*caseId,\s*exportPackageJsonArtifactSnapshot,\s*options = \{\},?\s*\)\s*\{/,
  );
  assert.match(
    writerSlice,
    /if \(!caseId \|\| typeof caseId !== "string"\) \{\s*throw createPersistenceError\("ERR_CASE_ID_INVALID", "caseId must be a non-empty string"\);\s*\}/s,
  );
  assert.match(
    writerSlice,
    /typeof exportPackageJsonArtifactSnapshot\?\.body_utf8 === "string" &&\s*exportPackageJsonArtifactSnapshot\.body_utf8\.length > 0/s,
  );
  assert.match(writerSlice, /const parsedArtifactBody = JSON\.parse\(exportPackageJsonArtifactSnapshot\.body_utf8\);/);
  assert.match(
    writerSlice,
    /typeof parsedArtifactBody\?\.jurisdiction_profile_key === "string" &&\s*!hasJurisdictionProfileCapability\(\s*parsedArtifactBody\.jurisdiction_profile_key,\s*"export_package_json_artifact",\s*\)/s,
  );
  assert.match(
    writerSlice,
    /throw createPersistenceError\(\s*"ERR_UNSUPPORTED_JURISDICTION_PROFILE",\s*"jurisdiction_profile_key is not supported",[\s\S]*jurisdiction_profile_key: parsedArtifactBody\.jurisdiction_profile_key,[\s\S]*\);/,
  );
  assert.match(
    writerSlice,
    /if \(error\?\.code === "ERR_UNSUPPORTED_JURISDICTION_PROFILE"\) \{\s*throw error;\s*\}/s,
  );
  assert.match(
    writerSlice,
    /const canonicalExportPackageJsonArtifact =\s*validateExportPackageJsonArtifact\(exportPackageJsonArtifactSnapshot\);/s,
  );
  assert.match(
    writerSlice,
    /const store = await readStore\(exportPackageJsonArtifactSnapshotsFileName, options\);/,
  );
  assert.match(
    writerSlice,
    /const caseSnapshots = Array\.isArray\(store\[caseId\]\) \? store\[caseId\] : \[\];/,
  );
  assert.match(
    writerSlice,
    /const persistedAt = options\.persisted_at \?\? new Date\(\)\.toISOString\(\);/,
  );
  assert.match(
    writerSlice,
    /caseSnapshots\.push\(\s*normalizeExportPackageJsonArtifactRecord\(\s*caseId,\s*canonicalExportPackageJsonArtifact,\s*persistedAt,\s*\),\s*\);/s,
  );
  assert.match(writerSlice, /store\[caseId\] = caseSnapshots;/);
  assert.match(
    writerSlice,
    /await writeStore\(exportPackageJsonArtifactSnapshotsFileName, store, options\);/,
  );
  assert.match(writerSlice, /return canonicalExportPackageJsonArtifact;/);
  assert.deepEqual(
    collectLineMatches(databaseIndexText, /persistCaseExportPackageJsonArtifactSnapshot/),
    [973, 1231, 1587],
  );
  assert.deepEqual(
    collectLineMatches(
      databaseIndexText,
      /^\s*persistCaseExportPackageJsonArtifactSnapshot,\s*$/,
    ),
    [1587],
  );
  assert.equal(
    (apiIndexText.match(/\bpersistCaseExportPackageJsonArtifactSnapshot\b/g) || [])
      .length,
    0,
  );
  assert.doesNotMatch(writerSlice, /persistCaseExportPackageSnapshot\(/);
  assert.doesNotMatch(writerSlice, /getLatestCaseExportPackageJsonArtifactSnapshot\(/);
  assert.doesNotMatch(writerSlice, /getLatestCaseExportPackageJsonArtifactProjection\(/);
  assert.doesNotMatch(writerSlice, /refreshCaseExportPackageJsonArtifactSnapshot\(/);
  assert.doesNotMatch(writerSlice, /deriveExportPackageJsonArtifact\(/);
  assert.doesNotMatch(writerSlice, /resolveExportPackageJsonArtifactProjection\(/);

  assert.match(
    refreshSlice,
    /return persistCaseExportPackageJsonArtifactSnapshot\(\s*caseId,\s*canonicalExportPackageJsonArtifact,\s*options,\s*\);/s,
  );

  assert.match(
    exportPackageJsonArtifactPersistenceTestText,
    /test\("valid JSON export artifact payload roundtrips through persistence"/,
  );
  assert.match(
    exportPackageJsonArtifactPersistenceTestText,
    /const persisted = await persistCaseExportPackageJsonArtifactSnapshot\(\s*"case-1",\s*payload,\s*\{\s*storageDir\s*\},\s*\);/s,
  );
  assert.match(
    exportPackageJsonArtifactPersistenceTestText,
    /test\("invalid payload shape is rejected before persistence"/,
  );
  assert.match(
    exportPackageJsonArtifactPersistenceTestText,
    /test\("non-SWE_BODELNING behavior remains unchanged"/,
  );
  assert.match(
    exportPackageJsonArtifactRefreshTestText,
    /test\("canonical refresh\/create persists a valid SWE_BODELNING JSON export artifact snapshot"/,
  );
  assert.match(
    exportPackageJsonArtifactRefreshTestText,
    /const refreshed = await refreshCaseExportPackageJsonArtifactSnapshot\("case-1", \{\s*storageDir,\s*\}\);/s,
  );
  assert.match(
    exportPackageJsonArtifactValidatorDispatchTestText,
    /test\("packages\/database persisted JSON export artifact validation uses the dispatch path while preserving current SWE_BODELNING behavior"/,
  );
  assert.match(
    exportPackageJsonArtifactValidatorDispatchTestText,
    /test\("runtime support for CMD_PROFILE uses the shared persistence seam without changing the validator dispatch"/,
  );
  assert.match(
    exportPackageJsonArtifactValidatorDispatchTestText,
    /test\("unsupported\/non-SWE machine-readable behavior remains unchanged"/,
  );
});
