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
const exportPackageMarkdownArtifactPersistenceTestText = fs.readFileSync(
  path.join(__dirname, "export-package-markdown-artifact-persistence.test.js"),
  "utf8",
);
const exportPackageMarkdownArtifactRefreshTestText = fs.readFileSync(
  path.join(__dirname, "export-package-markdown-artifact-refresh.test.js"),
  "utf8",
);
const exportPackageMarkdownArtifactValidatorDispatchTestText = fs.readFileSync(
  path.join(__dirname, "export-package-markdown-artifact-validator-dispatch.test.js"),
  "utf8",
);

function collectLineMatches(text, pattern) {
  const linePattern = new RegExp(pattern.source, pattern.flags.replaceAll("g", ""));
  return text.split("\n").flatMap((line, index) => (
    linePattern.test(line) ? [index + 1] : []
  ));
}

test("docs freeze the shared database export-package Markdown artifact writer helper seam as the persisted writer boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared Database Export-Package Markdown Artifact Writer Helper Seam Freeze[\s\S]*?(?=\n### )/,
  );
  const writerStart = databaseIndexText.indexOf(
    "async function persistCaseExportPackageMarkdownArtifactSnapshot(",
  );
  const writerEnd = databaseIndexText.indexOf(
    "async function refreshCaseExportPackageJsonArtifactSnapshot(",
    writerStart,
  );
  const refreshStart = databaseIndexText.indexOf(
    "async function refreshCaseExportPackageMarkdownArtifactSnapshot(",
  );
  const refreshEnd = databaseIndexText.indexOf(
    "async function refreshCaseExportPackageBundleManifestSnapshot(",
    refreshStart,
  );

  assert.ok(docsSectionMatch, "expected Markdown artifact writer docs section");
  assert.notEqual(
    writerStart,
    -1,
    "expected persistCaseExportPackageMarkdownArtifactSnapshot helper",
  );
  assert.notEqual(writerEnd, -1, "expected next database refresh helper boundary");
  assert.notEqual(
    refreshStart,
    -1,
    "expected refreshCaseExportPackageMarkdownArtifactSnapshot helper",
  );
  assert.notEqual(refreshEnd, -1, "expected next Markdown refresh helper boundary");

  const docsSection = docsSectionMatch[0];
  const writerSlice = databaseIndexText.slice(writerStart, writerEnd);
  const refreshSlice = databaseIndexText.slice(refreshStart, refreshEnd);

  assert.match(
    docsSection,
    /Shared Database Export-Package Markdown Artifact Writer Helper Seam Freeze/i,
  );
  assert.match(
    docsSection,
    /shared `packages\/database\/src\/index\.js` `persistCaseExportPackageMarkdownArtifactSnapshot` helper is the canonical persisted case-level `export_package_markdown_artifact` writer boundary/i,
  );
  assert.match(
    docsSection,
    /currently evidenced included database\/runtime surfaces in this freeze are limited to:\s+`packages\/database\/src\/index\.js` export surface\s+current shared in-package refresh-helper reuse in `packages\/database\/src\/index\.js`\s+current runtime proof in `tests\/export-package-markdown-artifact-persistence\.test\.js`\s+current runtime proof in `tests\/export-package-markdown-artifact-refresh\.test\.js`\s+current validator-dispatch proof in `tests\/export-package-markdown-artifact-validator-dispatch\.test\.js`/i,
  );
  assert.match(
    docsSection,
    /current `packages\/database` Markdown artifact write boundary already does this through the existing shared writer helper with bounded live-code reuse inside the database package and no direct route reuse/i,
  );
  assert.match(
    docsSection,
    /`persistCaseExportPackageMarkdownArtifactSnapshot` rejecting invalid `caseId` values through `createPersistenceError\("ERR_CASE_ID_INVALID", "caseId must be a non-empty string"\)`/i,
  );
  assert.match(
    docsSection,
    /`persistCaseExportPackageMarkdownArtifactSnapshot` extracting the Markdown body `jurisdiction_profile_key` marker from `exportPackageMarkdownArtifactSnapshot\?\.body_utf8` with the current line-anchored match expression/i,
  );
  assert.match(
    docsSection,
    /`persistCaseExportPackageMarkdownArtifactSnapshot` rejecting unsupported extracted Markdown artifact `jurisdiction_profile_key` values through `hasJurisdictionProfileCapability\(jurisdictionProfileKeyMatch\[1\], "export_package_markdown_artifact"\)` plus `createPersistenceError\("ERR_UNSUPPORTED_JURISDICTION_PROFILE", "jurisdiction_profile_key is not supported", \{ jurisdiction_profile_key: jurisdictionProfileKeyMatch\[1\] \}\)`/i,
  );
  assert.match(
    docsSection,
    /`persistCaseExportPackageMarkdownArtifactSnapshot` validating and canonicalizing the incoming snapshot through `validateExportPackageMarkdownArtifact\(exportPackageMarkdownArtifactSnapshot\)`/i,
  );
  assert.match(
    docsSection,
    /`persistCaseExportPackageMarkdownArtifactSnapshot` loading the Markdown artifact snapshot store through `readStore\(exportPackageMarkdownArtifactSnapshotsFileName, options\)`/i,
  );
  assert.match(
    docsSection,
    /`persistCaseExportPackageMarkdownArtifactSnapshot` reading `store\[caseId\]` as the persisted case-level Markdown artifact snapshot record list lookup and falling back to `\[\]` when no list exists/i,
  );
  assert.match(
    docsSection,
    /`persistCaseExportPackageMarkdownArtifactSnapshot` selecting `options\.persisted_at \?\? new Date\(\)\.toISOString\(\)` as the persisted record timestamp/i,
  );
  assert.match(
    docsSection,
    /`persistCaseExportPackageMarkdownArtifactSnapshot` appending the normalized persisted record through `normalizeExportPackageMarkdownArtifactRecord\(caseId, canonicalExportPackageMarkdownArtifact, persistedAt\)`/i,
  );
  assert.match(
    docsSection,
    /`persistCaseExportPackageMarkdownArtifactSnapshot` assigning the updated case snapshot list back to `store\[caseId\]`/i,
  );
  assert.match(
    docsSection,
    /`persistCaseExportPackageMarkdownArtifactSnapshot` writing the updated store through `writeStore\(exportPackageMarkdownArtifactSnapshotsFileName, store, options\)`/i,
  );
  assert.match(
    docsSection,
    /`persistCaseExportPackageMarkdownArtifactSnapshot` returning the canonical `export_package_markdown_artifact` produced by `validateExportPackageMarkdownArtifact\(exportPackageMarkdownArtifactSnapshot\)`/i,
  );
  assert.match(
    docsSection,
    /current relationship to the closed parent export-package writer-helper seam is negative and separate because this Markdown artifact writer helper does not write parent `export_package` snapshots and does not call `persistCaseExportPackageSnapshot\(\.\.\.\)`/i,
  );
  assert.match(
    docsSection,
    /current relationship to the broader already-frozen case-level persisted `export_package_markdown_artifact` seam is limited to this helper being the narrower persisted write boundary inside that broader persistence seam, while latest-read and refresh remain separate adjacent surfaces/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen Markdown artifact snapshot-reader seam is negative and separate because this writer helper does not perform latest-read ownership and does not call `getLatestCaseExportPackageMarkdownArtifactSnapshot\(\.\.\.\)`/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen Markdown artifact projection-helper seam is negative and separate because this writer helper does not perform projection\/currentness ownership and does not call `getLatestCaseExportPackageMarkdownArtifactProjection\(\.\.\.\)`/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen Markdown artifact refresh-helper seam is limited to `refreshCaseExportPackageMarkdownArtifactSnapshot` delegating final persisted write ownership through `persistCaseExportPackageMarkdownArtifactSnapshot\(caseId, canonicalExportPackageMarkdownArtifact, options\)`/i,
  );
  assert.match(
    docsSection,
    /current relationship to the shared schema-side Markdown artifact validator seam is limited to `persistCaseExportPackageMarkdownArtifactSnapshot` delegating validation\/canonicalization through `validateExportPackageMarkdownArtifact\(exportPackageMarkdownArtifactSnapshot\)`/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen record-normalization seam is limited to `persistCaseExportPackageMarkdownArtifactSnapshot` delegating persisted record shaping through `normalizeExportPackageMarkdownArtifactRecord\(caseId, canonicalExportPackageMarkdownArtifact, persistedAt\)`/i,
  );
  assert.match(
    docsSection,
    /current bounded live-code reuse already evidenced in `packages\/database\/src\/index\.js` is limited to:\s+`persistCaseExportPackageMarkdownArtifactSnapshot` being reused by `refreshCaseExportPackageMarkdownArtifactSnapshot`\s+`persistCaseExportPackageMarkdownArtifactSnapshot` being exposed from `packages\/database\/src\/index\.js`/i,
  );
  assert.match(
    docsSection,
    /no current direct runtime reuse is evidenced in `apps\/api\/src\/index\.js`/i,
  );
  assert.match(
    docsSection,
    /current bounded runtime\/test surface already evidenced in `packages\/database\/src\/index\.js`, `tests\/export-package-markdown-artifact-persistence\.test\.js`, `tests\/export-package-markdown-artifact-refresh\.test\.js`, and `tests\/export-package-markdown-artifact-validator-dispatch\.test\.js` is limited to 1 shared Markdown artifact writer-helper definition, 1 higher database Markdown artifact refresh caller, 1 database export surface, 1 invalid-`caseId` persistence error branch, 1 extracted-body unsupported-profile persistence error branch, 1 shared validation\/canonicalization step, 1 store read, 1 normalized-record append, 1 store write, 1 canonical `export_package_markdown_artifact` return surface, and current runtime proof across the existing Markdown artifact persistence\/refresh\/validator-dispatch tests/i,
  );
  assert.match(
    docsSection,
    /closed parent export-package writer-helper seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /already-frozen broader case-level persisted `export_package_markdown_artifact` seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /already-frozen Markdown artifact snapshot-reader seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /already-frozen Markdown artifact projection-helper seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /already-frozen Markdown artifact refresh-helper seam remains outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /thin authenticated `GET \/cases\/:caseId\/export-package\/markdown-artifact\/latest`, `GET \/cases\/:caseId\/export-package\/markdown-artifact\/download`, and `POST \/cases\/:caseId\/export-package\/markdown-artifact\/refresh` route seams remain outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /sibling JSON, PDF, DOCX, bundle\/package manifest, and final bundle\/archive reader\/projection\/refresh\/writer helper families remain outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /shared governance Markdown artifact derivation, adapter-dispatch, and projection helper seams remain outside this helper seam/i,
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
    /future database helpers that need the same persisted Markdown artifact write behavior should extend the existing `persistCaseExportPackageMarkdownArtifactSnapshot` seam instead of introducing a parallel Markdown artifact writer stack/i,
  );
  assert.match(
    docsSection,
    /does not change runtime behavior, persistence semantics, filesystem behavior, API behavior, or fail-closed behavior/i,
  );

  assert.match(
    writerSlice,
    /async function persistCaseExportPackageMarkdownArtifactSnapshot\(\s*caseId,\s*exportPackageMarkdownArtifactSnapshot,\s*options = \{\},?\s*\)\s*\{/,
  );
  assert.match(
    writerSlice,
    /if \(!caseId \|\| typeof caseId !== "string"\) \{\s*throw createPersistenceError\("ERR_CASE_ID_INVALID", "caseId must be a non-empty string"\);\s*\}/s,
  );
  assert.match(
    writerSlice,
    /const jurisdictionProfileKeyMatch =\s*exportPackageMarkdownArtifactSnapshot\?\.body_utf8\?\.match\(\s*\/\^- `jurisdiction_profile_key`: `\(\[\^`\]\+\)`\$\/m,\s*\) \?\? null;/s,
  );
  assert.match(
    writerSlice,
    /typeof jurisdictionProfileKeyMatch\?\.\[1\] === "string" &&\s*!hasJurisdictionProfileCapability\(\s*jurisdictionProfileKeyMatch\[1\],\s*"export_package_markdown_artifact",\s*\)/s,
  );
  assert.match(
    writerSlice,
    /throw createPersistenceError\(\s*"ERR_UNSUPPORTED_JURISDICTION_PROFILE",\s*"jurisdiction_profile_key is not supported",[\s\S]*jurisdiction_profile_key: jurisdictionProfileKeyMatch\[1\],[\s\S]*\);/,
  );
  assert.match(
    writerSlice,
    /const canonicalExportPackageMarkdownArtifact =\s*validateExportPackageMarkdownArtifact\(\s*exportPackageMarkdownArtifactSnapshot,\s*\);/s,
  );
  assert.match(
    writerSlice,
    /const store = await readStore\(exportPackageMarkdownArtifactSnapshotsFileName, options\);/,
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
    /caseSnapshots\.push\(\s*normalizeExportPackageMarkdownArtifactRecord\(\s*caseId,\s*canonicalExportPackageMarkdownArtifact,\s*persistedAt,\s*\),\s*\);/s,
  );
  assert.match(writerSlice, /store\[caseId\] = caseSnapshots;/);
  assert.match(
    writerSlice,
    /await writeStore\(exportPackageMarkdownArtifactSnapshotsFileName, store, options\);/,
  );
  assert.match(writerSlice, /return canonicalExportPackageMarkdownArtifact;/);
  assert.deepEqual(
    collectLineMatches(databaseIndexText, /persistCaseExportPackageMarkdownArtifactSnapshot/),
    [1160, 1309, 1588],
  );
  assert.deepEqual(
    collectLineMatches(
      databaseIndexText,
      /^\s*persistCaseExportPackageMarkdownArtifactSnapshot,\s*$/,
    ),
    [1588],
  );
  assert.equal(
    (apiIndexText.match(/\bpersistCaseExportPackageMarkdownArtifactSnapshot\b/g) || [])
      .length,
    0,
  );
  assert.doesNotMatch(writerSlice, /persistCaseExportPackageSnapshot\(/);
  assert.doesNotMatch(writerSlice, /getLatestCaseExportPackageMarkdownArtifactSnapshot\(/);
  assert.doesNotMatch(writerSlice, /getLatestCaseExportPackageMarkdownArtifactProjection\(/);
  assert.doesNotMatch(writerSlice, /refreshCaseExportPackageMarkdownArtifactSnapshot\(/);
  assert.doesNotMatch(writerSlice, /deriveExportPackageMarkdownArtifact\(/);
  assert.doesNotMatch(writerSlice, /resolveExportPackageMarkdownArtifactProjection\(/);

  assert.match(
    refreshSlice,
    /return persistCaseExportPackageMarkdownArtifactSnapshot\(\s*caseId,\s*canonicalExportPackageMarkdownArtifact,\s*options,\s*\);/s,
  );

  assert.match(
    exportPackageMarkdownArtifactPersistenceTestText,
    /test\("valid Markdown export artifact payload roundtrips through persistence"/,
  );
  assert.match(
    exportPackageMarkdownArtifactPersistenceTestText,
    /const persisted = await persistCaseExportPackageMarkdownArtifactSnapshot\(\s*"case-1",\s*payload,\s*\{\s*storageDir\s*\},\s*\);/s,
  );
  assert.match(
    exportPackageMarkdownArtifactPersistenceTestText,
    /test\("invalid payload shape is rejected before persistence"/,
  );
  assert.match(
    exportPackageMarkdownArtifactPersistenceTestText,
    /test\("non-SWE_BODELNING behavior remains unchanged"/,
  );
  assert.match(
    exportPackageMarkdownArtifactRefreshTestText,
    /test\("canonical refresh\/create persists a valid SWE_BODELNING Markdown export artifact snapshot"/,
  );
  assert.match(
    exportPackageMarkdownArtifactRefreshTestText,
    /const refreshed = await refreshCaseExportPackageMarkdownArtifactSnapshot\("case-1", \{\s*storageDir,\s*\}\);/s,
  );
  assert.match(
    exportPackageMarkdownArtifactValidatorDispatchTestText,
    /test\("packages\/database persisted Markdown export artifact validation uses the dispatch path while preserving current SWE_BODELNING behavior"/,
  );
  assert.match(
    exportPackageMarkdownArtifactValidatorDispatchTestText,
    /test\("runtime support for CMD_PROFILE uses the shared validation path"/,
  );
  assert.match(
    exportPackageMarkdownArtifactValidatorDispatchTestText,
    /test\("unsupported\/non-SWE machine-readable behavior remains unchanged"/,
  );
});
