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
const exportPackagePdfArtifactPersistenceTestText = fs.readFileSync(
  path.join(__dirname, "export-package-pdf-artifact-persistence.test.js"),
  "utf8",
);
const exportPackagePdfArtifactRefreshTestText = fs.readFileSync(
  path.join(__dirname, "export-package-pdf-artifact-refresh.test.js"),
  "utf8",
);
const exportPackagePdfArtifactValidatorDispatchTestText = fs.readFileSync(
  path.join(__dirname, "export-package-pdf-artifact-validator-dispatch.test.js"),
  "utf8",
);

function collectLineMatches(text, pattern) {
  const linePattern = new RegExp(pattern.source, pattern.flags.replaceAll("g", ""));
  return text.split("\n").flatMap((line, index) => (
    linePattern.test(line) ? [index + 1] : []
  ));
}

test("docs freeze the shared database export-package PDF artifact writer helper seam as the persisted writer boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared Database Export-Package PDF Artifact Writer Helper Seam Freeze[\s\S]*?(?=\n### )/,
  );
  const writerStart = databaseIndexText.indexOf(
    "async function persistCaseExportPackagePdfArtifactSnapshot(",
  );
  const writerEnd = databaseIndexText.indexOf(
    "async function persistCaseExportPackageMarkdownArtifactSnapshot(",
    writerStart,
  );
  const refreshStart = databaseIndexText.indexOf(
    "async function refreshCaseExportPackagePdfArtifactSnapshot(",
  );
  const refreshEnd = databaseIndexText.indexOf(
    "async function refreshCaseExportPackageMarkdownArtifactSnapshot(",
    refreshStart,
  );

  assert.ok(docsSectionMatch, "expected PDF artifact writer docs section");
  assert.notEqual(writerStart, -1, "expected persistCaseExportPackagePdfArtifactSnapshot helper");
  assert.notEqual(writerEnd, -1, "expected next database writer helper boundary");
  assert.notEqual(refreshStart, -1, "expected refreshCaseExportPackagePdfArtifactSnapshot helper");
  assert.notEqual(refreshEnd, -1, "expected next PDF refresh helper boundary");

  const docsSection = docsSectionMatch[0];
  const writerSlice = databaseIndexText.slice(writerStart, writerEnd);
  const refreshSlice = databaseIndexText.slice(refreshStart, refreshEnd);

  assert.match(
    docsSection,
    /Shared Database Export-Package PDF Artifact Writer Helper Seam Freeze/i,
  );
  assert.match(
    docsSection,
    /shared `packages\/database\/src\/index\.js` `persistCaseExportPackagePdfArtifactSnapshot` helper is the canonical persisted case-level `export_package_pdf_artifact` writer boundary/i,
  );
  assert.match(
    docsSection,
    /currently evidenced included database\/runtime surfaces in this freeze are limited to:\s+`packages\/database\/src\/index\.js` export surface\s+current shared in-package refresh-helper reuse in `packages\/database\/src\/index\.js`\s+current runtime proof in `tests\/export-package-pdf-artifact-persistence\.test\.js`\s+current runtime proof in `tests\/export-package-pdf-artifact-refresh\.test\.js`\s+current validator-dispatch proof in `tests\/export-package-pdf-artifact-validator-dispatch\.test\.js`/i,
  );
  assert.match(
    docsSection,
    /current `packages\/database` PDF artifact write boundary already does this through the existing shared writer helper with bounded live-code reuse inside the database package and no direct route reuse/i,
  );
  assert.match(
    docsSection,
    /`persistCaseExportPackagePdfArtifactSnapshot` rejecting invalid `caseId` values through `createPersistenceError\("ERR_CASE_ID_INVALID", "caseId must be a non-empty string"\)`/i,
  );
  assert.match(
    docsSection,
    /`persistCaseExportPackagePdfArtifactSnapshot` decoding non-empty string `body_base64` values with `Buffer\.from\(exportPackagePdfArtifactSnapshot\.body_base64, "base64"\)\.toString\("utf8"\)` only to inspect an embedded `jurisdiction_profile_key` before persistence validation continues/i,
  );
  assert.match(
    docsSection,
    /`persistCaseExportPackagePdfArtifactSnapshot` extracting the decoded PDF artifact `jurisdiction_profile_key` marker with the current JSON-string and text fallback match expressions/i,
  );
  assert.match(
    docsSection,
    /`persistCaseExportPackagePdfArtifactSnapshot` rejecting unsupported extracted `"CMD_PROFILE"` PDF artifact `jurisdiction_profile_key` values through `hasJurisdictionProfileCapability\(jurisdictionProfileKeyMatch\[1\], "export_package_pdf_artifact"\)` plus `createPersistenceError\("ERR_UNSUPPORTED_JURISDICTION_PROFILE", "jurisdiction_profile_key is not supported", \{ jurisdiction_profile_key: jurisdictionProfileKeyMatch\[1\] \}\)`/i,
  );
  assert.match(
    docsSection,
    /`persistCaseExportPackagePdfArtifactSnapshot` preserving the existing malformed-body handoff to `validateExportPackagePdfArtifact\(exportPackagePdfArtifactSnapshot\)` by swallowing decode\/inspection failures unless the thrown error is `ERR_UNSUPPORTED_JURISDICTION_PROFILE`/i,
  );
  assert.match(
    docsSection,
    /`persistCaseExportPackagePdfArtifactSnapshot` validating and canonicalizing the incoming snapshot through `validateExportPackagePdfArtifact\(exportPackagePdfArtifactSnapshot\)`/i,
  );
  assert.match(
    docsSection,
    /`persistCaseExportPackagePdfArtifactSnapshot` loading the PDF artifact snapshot store through `readStore\(exportPackagePdfArtifactSnapshotsFileName, options\)`/i,
  );
  assert.match(
    docsSection,
    /`persistCaseExportPackagePdfArtifactSnapshot` reading `store\[caseId\]` as the persisted case-level PDF artifact snapshot record list lookup and falling back to `\[\]` when no list exists/i,
  );
  assert.match(
    docsSection,
    /`persistCaseExportPackagePdfArtifactSnapshot` selecting `options\.persisted_at \?\? new Date\(\)\.toISOString\(\)` as the persisted record timestamp/i,
  );
  assert.match(
    docsSection,
    /`persistCaseExportPackagePdfArtifactSnapshot` appending the normalized persisted record through `normalizeExportPackagePdfArtifactRecord\(caseId, canonicalExportPackagePdfArtifact, persistedAt\)`/i,
  );
  assert.match(
    docsSection,
    /`persistCaseExportPackagePdfArtifactSnapshot` assigning the updated case snapshot list back to `store\[caseId\]`/i,
  );
  assert.match(
    docsSection,
    /`persistCaseExportPackagePdfArtifactSnapshot` writing the updated store through `writeStore\(exportPackagePdfArtifactSnapshotsFileName, store, options\)`/i,
  );
  assert.match(
    docsSection,
    /`persistCaseExportPackagePdfArtifactSnapshot` returning the canonical `export_package_pdf_artifact` produced by `validateExportPackagePdfArtifact\(exportPackagePdfArtifactSnapshot\)`/i,
  );
  assert.match(
    docsSection,
    /current relationship to the closed parent export-package writer-helper seam is negative and separate because this PDF artifact writer helper does not write parent `export_package` snapshots and does not call `persistCaseExportPackageSnapshot\(\.\.\.\)`/i,
  );
  assert.match(
    docsSection,
    /current relationship to the closed JSON artifact writer-helper seam is negative and separate because this PDF artifact writer helper does not write `export_package_json_artifact` snapshots and does not call `persistCaseExportPackageJsonArtifactSnapshot\(\.\.\.\)`/i,
  );
  assert.match(
    docsSection,
    /current relationship to the closed Markdown artifact writer-helper seam is negative and separate because this PDF artifact writer helper does not write `export_package_markdown_artifact` snapshots and does not call `persistCaseExportPackageMarkdownArtifactSnapshot\(\.\.\.\)`/i,
  );
  assert.match(
    docsSection,
    /current relationship to the broader already-frozen case-level persisted `export_package_pdf_artifact` seam is limited to this helper being the narrower persisted write boundary inside that broader persistence seam, while latest-read and refresh remain separate adjacent surfaces/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen PDF artifact snapshot-reader seam is negative and separate because this writer helper does not perform latest-read ownership and does not call `getLatestCaseExportPackagePdfArtifactSnapshot\(\.\.\.\)`/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen PDF artifact projection-helper seam is negative and separate because this writer helper does not perform projection\/currentness ownership and does not call `getLatestCaseExportPackagePdfArtifactProjection\(\.\.\.\)`/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen PDF artifact refresh-helper seam is limited to `refreshCaseExportPackagePdfArtifactSnapshot` delegating final persisted write ownership through `persistCaseExportPackagePdfArtifactSnapshot\(caseId, canonicalExportPackagePdfArtifact, options\)`/i,
  );
  assert.match(
    docsSection,
    /current relationship to the shared schema-side PDF artifact validator seam is limited to `persistCaseExportPackagePdfArtifactSnapshot` delegating validation\/canonicalization through `validateExportPackagePdfArtifact\(exportPackagePdfArtifactSnapshot\)`/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen record-normalization seam is limited to `persistCaseExportPackagePdfArtifactSnapshot` delegating persisted record shaping through `normalizeExportPackagePdfArtifactRecord\(caseId, canonicalExportPackagePdfArtifact, persistedAt\)`/i,
  );
  assert.match(
    docsSection,
    /current bounded live-code reuse already evidenced in `packages\/database\/src\/index\.js` is limited to:\s+`persistCaseExportPackagePdfArtifactSnapshot` being reused by `refreshCaseExportPackagePdfArtifactSnapshot`\s+`persistCaseExportPackagePdfArtifactSnapshot` being exposed from `packages\/database\/src\/index\.js`/i,
  );
  assert.match(
    docsSection,
    /no current direct runtime reuse is evidenced in `apps\/api\/src\/index\.js`/i,
  );
  assert.match(
    docsSection,
    /current bounded runtime\/test surface already evidenced in `packages\/database\/src\/index\.js`, `tests\/export-package-pdf-artifact-persistence\.test\.js`, `tests\/export-package-pdf-artifact-refresh\.test\.js`, and `tests\/export-package-pdf-artifact-validator-dispatch\.test\.js` is limited to 1 shared PDF artifact writer-helper definition, 1 higher database PDF artifact refresh caller, 1 database export surface, 1 invalid-`caseId` persistence error branch, 1 decoded-body unsupported-profile persistence error branch, 1 shared validation\/canonicalization step, 1 store read, 1 normalized-record append, 1 store write, 1 canonical `export_package_pdf_artifact` return surface, and current runtime proof across the existing PDF artifact persistence\/refresh\/validator-dispatch tests/i,
  );
  assert.match(docsSection, /closed parent export-package writer-helper seam remains outside this helper seam/i);
  assert.match(docsSection, /closed JSON artifact writer-helper seam remains outside this helper seam/i);
  assert.match(docsSection, /closed Markdown artifact writer-helper seam remains outside this helper seam/i);
  assert.match(
    docsSection,
    /already-frozen broader case-level persisted `export_package_pdf_artifact` seam remains outside this helper seam/i,
  );
  assert.match(docsSection, /already-frozen PDF artifact snapshot-reader seam remains outside this helper seam/i);
  assert.match(docsSection, /already-frozen PDF artifact projection-helper seam remains outside this helper seam/i);
  assert.match(docsSection, /already-frozen PDF artifact refresh-helper seam remains outside this helper seam/i);
  assert.match(
    docsSection,
    /thin authenticated `GET \/cases\/:caseId\/export-package\/pdf-artifact\/latest`, `GET \/cases\/:caseId\/export-package\/pdf-artifact\/download`, and `POST \/cases\/:caseId\/export-package\/pdf-artifact\/refresh` route seams remain outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /sibling JSON, Markdown, DOCX, bundle\/package manifest, and final bundle\/archive reader\/projection\/refresh\/writer helper families remain outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /shared governance PDF artifact derivation, adapter-dispatch, and projection helper seams remain outside this helper seam/i,
  );
  assert.match(docsSection, /shared `createPersistenceError` helper seam remains outside this helper seam/i);
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
    /future database helpers that need the same persisted PDF artifact write behavior should extend the existing `persistCaseExportPackagePdfArtifactSnapshot` seam instead of introducing a parallel PDF artifact writer stack/i,
  );
  assert.match(
    docsSection,
    /does not change runtime behavior, persistence semantics, filesystem behavior, API behavior, or fail-closed behavior/i,
  );

  assert.match(
    writerSlice,
    /async function persistCaseExportPackagePdfArtifactSnapshot\(\s*caseId,\s*exportPackagePdfArtifactSnapshot,\s*options = \{\},?\s*\)\s*\{/,
  );
  assert.match(
    writerSlice,
    /if \(!caseId \|\| typeof caseId !== "string"\) \{\s*throw createPersistenceError\("ERR_CASE_ID_INVALID", "caseId must be a non-empty string"\);\s*\}/s,
  );
  assert.match(
    writerSlice,
    /typeof exportPackagePdfArtifactSnapshot\?\.body_base64 === "string" &&\s*exportPackagePdfArtifactSnapshot\.body_base64\.length > 0/s,
  );
  assert.match(
    writerSlice,
    /const decodedBody = Buffer\.from\(\s*exportPackagePdfArtifactSnapshot\.body_base64,\s*"base64",\s*\)\.toString\("utf8"\);/s,
  );
  assert.match(
    writerSlice,
    /const jurisdictionProfileKeyMatch =\s*decodedBody\.match\(\/"jurisdiction_profile_key":"\(\[\^"\]\+\)"\/\) \?\?/s,
  );
  assert.ok(
    writerSlice.includes(
      "decodedBody.match(/jurisdiction_profile_key:\\s+([A-Z_<>\\.]+)/);",
    ),
  );
  assert.match(
    writerSlice,
    /jurisdictionProfileKeyMatch\?\.\[1\] === "CMD_PROFILE" &&\s*!hasJurisdictionProfileCapability\(\s*jurisdictionProfileKeyMatch\[1\],\s*"export_package_pdf_artifact",\s*\)/s,
  );
  assert.match(
    writerSlice,
    /throw createPersistenceError\(\s*"ERR_UNSUPPORTED_JURISDICTION_PROFILE",\s*"jurisdiction_profile_key is not supported",[\s\S]*jurisdiction_profile_key: jurisdictionProfileKeyMatch\[1\],[\s\S]*\);/,
  );
  assert.match(
    writerSlice,
    /if \(error\?\.code === "ERR_UNSUPPORTED_JURISDICTION_PROFILE"\) \{\s*throw error;\s*\}/s,
  );
  assert.match(
    writerSlice,
    /const canonicalExportPackagePdfArtifact =\s*validateExportPackagePdfArtifact\(exportPackagePdfArtifactSnapshot\);/s,
  );
  assert.match(
    writerSlice,
    /const store = await readStore\(exportPackagePdfArtifactSnapshotsFileName, options\);/,
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
    /caseSnapshots\.push\(\s*normalizeExportPackagePdfArtifactRecord\(\s*caseId,\s*canonicalExportPackagePdfArtifact,\s*persistedAt,\s*\),\s*\);/s,
  );
  assert.match(writerSlice, /store\[caseId\] = caseSnapshots;/);
  assert.match(
    writerSlice,
    /await writeStore\(exportPackagePdfArtifactSnapshotsFileName, store, options\);/,
  );
  assert.match(writerSlice, /return canonicalExportPackagePdfArtifact;/);
  assert.deepEqual(
    collectLineMatches(databaseIndexText, /persistCaseExportPackagePdfArtifactSnapshot/),
    [1096, 1281, 1586],
  );
  assert.deepEqual(
    collectLineMatches(
      databaseIndexText,
      /^\s*persistCaseExportPackagePdfArtifactSnapshot,\s*$/,
    ),
    [1586],
  );
  assert.equal(
    (apiIndexText.match(/\bpersistCaseExportPackagePdfArtifactSnapshot\b/g) || []).length,
    0,
  );
  assert.doesNotMatch(writerSlice, /persistCaseExportPackageSnapshot\(/);
  assert.doesNotMatch(writerSlice, /persistCaseExportPackageJsonArtifactSnapshot\(/);
  assert.doesNotMatch(writerSlice, /persistCaseExportPackageMarkdownArtifactSnapshot\(/);
  assert.doesNotMatch(writerSlice, /getLatestCaseExportPackagePdfArtifactSnapshot\(/);
  assert.doesNotMatch(writerSlice, /getLatestCaseExportPackagePdfArtifactProjection\(/);
  assert.doesNotMatch(writerSlice, /refreshCaseExportPackagePdfArtifactSnapshot\(/);
  assert.doesNotMatch(writerSlice, /deriveExportPackagePdfArtifact\(/);
  assert.doesNotMatch(writerSlice, /resolveExportPackagePdfArtifactProjection\(/);

  assert.match(
    refreshSlice,
    /return persistCaseExportPackagePdfArtifactSnapshot\(\s*caseId,\s*canonicalExportPackagePdfArtifact,\s*options,\s*\);/s,
  );

  assert.match(
    exportPackagePdfArtifactPersistenceTestText,
    /test\("valid PDF export artifact payload roundtrips through persistence"/,
  );
  assert.match(
    exportPackagePdfArtifactPersistenceTestText,
    /const persisted = await persistCaseExportPackagePdfArtifactSnapshot\("case-1", payload, \{\s*storageDir,\s*\}\);/s,
  );
  assert.match(
    exportPackagePdfArtifactPersistenceTestText,
    /test\("invalid payload shape is rejected before persistence"/,
  );
  assert.match(
    exportPackagePdfArtifactPersistenceTestText,
    /test\("non-SWE_BODELNING behavior remains unchanged"/,
  );
  assert.match(
    exportPackagePdfArtifactRefreshTestText,
    /test\("canonical refresh\/create persists a valid SWE_BODELNING PDF export artifact snapshot"/,
  );
  assert.match(
    exportPackagePdfArtifactRefreshTestText,
    /const refreshed = await refreshCaseExportPackagePdfArtifactSnapshot\("case-1", \{\s*storageDir,\s*\}\);/s,
  );
  assert.match(
    exportPackagePdfArtifactValidatorDispatchTestText,
    /test\("packages\/database persisted PDF export artifact validation uses the dispatch path while preserving current SWE_BODELNING behavior"/,
  );
  assert.match(
    exportPackagePdfArtifactValidatorDispatchTestText,
    /test\("runtime support for CMD_PROFILE uses the shared validation path"/,
  );
  assert.match(
    exportPackagePdfArtifactValidatorDispatchTestText,
    /test\("unsupported\/non-SWE machine-readable behavior remains unchanged"/,
  );
});
