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
const exportPackageDocxArtifactPersistenceTestText = fs.readFileSync(
  path.join(__dirname, "export-package-docx-artifact-persistence.test.js"),
  "utf8",
);
const exportPackageDocxArtifactRefreshTestText = fs.readFileSync(
  path.join(__dirname, "export-package-docx-artifact-refresh.test.js"),
  "utf8",
);
const exportPackageDocxArtifactValidatorDispatchTestText = fs.readFileSync(
  path.join(__dirname, "export-package-docx-artifact-validator-dispatch.test.js"),
  "utf8",
);

function collectLineMatches(text, pattern) {
  const linePattern = new RegExp(pattern.source, pattern.flags.replaceAll("g", ""));
  return text.split("\n").flatMap((line, index) => (
    linePattern.test(line) ? [index + 1] : []
  ));
}

test("docs freeze the shared database export-package DOCX artifact writer helper seam as the persisted writer boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared Database Export-Package DOCX Artifact Writer Helper Seam Freeze[\s\S]*?(?=\n### )/,
  );
  const writerStart = databaseIndexText.indexOf(
    "async function persistCaseExportPackageDocxArtifactSnapshot(",
  );
  const writerEnd = databaseIndexText.indexOf(
    "async function persistCaseExportPackagePdfArtifactSnapshot(",
    writerStart,
  );
  const refreshStart = databaseIndexText.indexOf(
    "async function refreshCaseExportPackageDocxArtifactSnapshot(",
  );
  const refreshEnd = databaseIndexText.indexOf(
    "async function refreshCaseExportPackagePdfArtifactSnapshot(",
    refreshStart,
  );

  assert.ok(docsSectionMatch, "expected DOCX artifact writer docs section");
  assert.notEqual(writerStart, -1, "expected persistCaseExportPackageDocxArtifactSnapshot helper");
  assert.notEqual(writerEnd, -1, "expected next database writer helper boundary");
  assert.notEqual(refreshStart, -1, "expected refreshCaseExportPackageDocxArtifactSnapshot helper");
  assert.notEqual(refreshEnd, -1, "expected next DOCX refresh helper boundary");

  const docsSection = docsSectionMatch[0];
  const writerSlice = databaseIndexText.slice(writerStart, writerEnd);
  const refreshSlice = databaseIndexText.slice(refreshStart, refreshEnd);

  assert.match(
    docsSection,
    /shared `packages\/database\/src\/index\.js` `persistCaseExportPackageDocxArtifactSnapshot` helper is the canonical persisted case-level `export_package_docx_artifact` writer boundary/i,
  );
  assert.match(
    docsSection,
    /currently evidenced included database\/runtime surfaces in this freeze are limited to:\s+`packages\/database\/src\/index\.js` export surface\s+current shared in-package refresh-helper reuse in `packages\/database\/src\/index\.js`\s+current runtime proof in `tests\/export-package-docx-artifact-persistence\.test\.js`\s+current runtime proof in `tests\/export-package-docx-artifact-refresh\.test\.js`\s+current validator-dispatch proof in `tests\/export-package-docx-artifact-validator-dispatch\.test\.js`/i,
  );
  assert.match(
    docsSection,
    /`persistCaseExportPackageDocxArtifactSnapshot` rejecting invalid `caseId` values through `createPersistenceError\("ERR_CASE_ID_INVALID", "caseId must be a non-empty string"\)`/i,
  );
  assert.match(
    docsSection,
    /`persistCaseExportPackageDocxArtifactSnapshot` decoding non-empty string `body_base64` values with `Buffer\.from\(exportPackageDocxArtifactSnapshot\.body_base64, "base64"\)\.toString\("utf8"\)` only to inspect an embedded `jurisdiction_profile_key` before persistence validation continues/i,
  );
  assert.match(
    docsSection,
    /`persistCaseExportPackageDocxArtifactSnapshot` extracting the decoded DOCX artifact `jurisdiction_profile_key` marker with the current text, HTML-escaped JSON-string, and JSON-string fallback match expressions/i,
  );
  assert.match(
    docsSection,
    /`persistCaseExportPackageDocxArtifactSnapshot` rejecting unsupported extracted `"CMD_PROFILE"` DOCX artifact `jurisdiction_profile_key` values through `hasJurisdictionProfileCapability\(jurisdictionProfileKeyMatch\[1\], "export_package_docx_artifact"\)` plus `createPersistenceError\("ERR_UNSUPPORTED_JURISDICTION_PROFILE", "jurisdiction_profile_key is not supported", \{ jurisdiction_profile_key: jurisdictionProfileKeyMatch\[1\] \}\)`/i,
  );
  assert.match(
    docsSection,
    /`persistCaseExportPackageDocxArtifactSnapshot` preserving the existing malformed-body handoff to `validateExportPackageDocxArtifact\(exportPackageDocxArtifactSnapshot\)` by swallowing decode\/inspection failures unless the thrown error is `ERR_UNSUPPORTED_JURISDICTION_PROFILE`/i,
  );
  assert.match(
    docsSection,
    /`persistCaseExportPackageDocxArtifactSnapshot` validating and canonicalizing the incoming snapshot through `validateExportPackageDocxArtifact\(exportPackageDocxArtifactSnapshot\)`/i,
  );
  assert.match(
    docsSection,
    /`persistCaseExportPackageDocxArtifactSnapshot` loading the DOCX artifact snapshot store through `readStore\(exportPackageDocxArtifactSnapshotsFileName, options\)`/i,
  );
  assert.match(
    docsSection,
    /`persistCaseExportPackageDocxArtifactSnapshot` appending the normalized persisted record through `normalizeExportPackageDocxArtifactRecord\(caseId, canonicalExportPackageDocxArtifact, persistedAt\)`/i,
  );
  assert.match(
    docsSection,
    /`persistCaseExportPackageDocxArtifactSnapshot` writing the updated store through `writeStore\(exportPackageDocxArtifactSnapshotsFileName, store, options\)`/i,
  );
  assert.match(
    docsSection,
    /current relationship to the closed parent export-package writer-helper seam is negative and separate because this DOCX artifact writer helper does not write parent `export_package` snapshots and does not call `persistCaseExportPackageSnapshot\(\.\.\.\)`/i,
  );
  assert.match(
    docsSection,
    /current relationship to the closed JSON artifact writer-helper seam is negative and separate because this DOCX artifact writer helper does not write `export_package_json_artifact` snapshots and does not call `persistCaseExportPackageJsonArtifactSnapshot\(\.\.\.\)`/i,
  );
  assert.match(
    docsSection,
    /current relationship to the closed Markdown artifact writer-helper seam is negative and separate because this DOCX artifact writer helper does not write `export_package_markdown_artifact` snapshots and does not call `persistCaseExportPackageMarkdownArtifactSnapshot\(\.\.\.\)`/i,
  );
  assert.match(
    docsSection,
    /current relationship to the closed PDF artifact writer-helper seam is negative and separate because this DOCX artifact writer helper does not write `export_package_pdf_artifact` snapshots and does not call `persistCaseExportPackagePdfArtifactSnapshot\(\.\.\.\)`/i,
  );
  assert.match(
    docsSection,
    /current relationship to the already-frozen DOCX artifact refresh-helper seam is limited to `refreshCaseExportPackageDocxArtifactSnapshot` delegating final persisted write ownership through `persistCaseExportPackageDocxArtifactSnapshot\(caseId, canonicalExportPackageDocxArtifact, options\)`/i,
  );
  assert.match(
    docsSection,
    /current bounded live-code reuse already evidenced in `packages\/database\/src\/index\.js` is limited to:\s+`persistCaseExportPackageDocxArtifactSnapshot` being reused by `refreshCaseExportPackageDocxArtifactSnapshot`\s+`persistCaseExportPackageDocxArtifactSnapshot` being exposed from `packages\/database\/src\/index\.js`/i,
  );
  assert.match(docsSection, /no current direct runtime reuse is evidenced in `apps\/api\/src\/index\.js`/i);
  assert.match(
    docsSection,
    /thin authenticated `GET \/cases\/:caseId\/export-package\/docx-artifact\/latest`, `GET \/cases\/:caseId\/export-package\/docx-artifact\/download`, and `POST \/cases\/:caseId\/export-package\/docx-artifact\/refresh` route seams remain outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /sibling JSON, Markdown, PDF, bundle\/package manifest, and final bundle\/archive reader\/projection\/refresh\/writer helper families remain outside this helper seam/i,
  );
  assert.match(
    docsSection,
    /shared governance DOCX artifact derivation, adapter-dispatch, and projection helper seams remain outside this helper seam/i,
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
    /future database helpers that need the same persisted DOCX artifact write behavior should extend the existing `persistCaseExportPackageDocxArtifactSnapshot` seam instead of introducing a parallel DOCX artifact writer stack/i,
  );
  assert.match(
    docsSection,
    /does not change runtime behavior, persistence semantics, filesystem behavior, API behavior, or fail-closed behavior/i,
  );

  assert.match(
    writerSlice,
    /async function persistCaseExportPackageDocxArtifactSnapshot\(\s*caseId,\s*exportPackageDocxArtifactSnapshot,\s*options = \{\},?\s*\)\s*\{/,
  );
  assert.match(
    writerSlice,
    /if \(!caseId \|\| typeof caseId !== "string"\) \{\s*throw createPersistenceError\("ERR_CASE_ID_INVALID", "caseId must be a non-empty string"\);\s*\}/s,
  );
  assert.match(
    writerSlice,
    /typeof exportPackageDocxArtifactSnapshot\?\.body_base64 === "string" &&\s*exportPackageDocxArtifactSnapshot\.body_base64\.length > 0/s,
  );
  assert.match(
    writerSlice,
    /const decodedBody = Buffer\.from\(\s*exportPackageDocxArtifactSnapshot\.body_base64,\s*"base64",\s*\)\.toString\("utf8"\);/s,
  );
  assert.ok(
    writerSlice.includes(
      "decodedBody.match(/jurisdiction_profile_key:\\s+([A-Z_<>\\.]+)/) ??",
    ),
  );
  assert.ok(
    writerSlice.includes(
      "decodedBody.match(/&quot;jurisdiction_profile_key&quot;:&quot;([^&]+)&quot;/) ??",
    ),
  );
  assert.ok(
    writerSlice.includes(
      'decodedBody.match(/"jurisdiction_profile_key":"([^"]+)"/);',
    ),
  );
  assert.match(
    writerSlice,
    /jurisdictionProfileKeyMatch\?\.\[1\] === "CMD_PROFILE" &&\s*!hasJurisdictionProfileCapability\(\s*jurisdictionProfileKeyMatch\[1\],\s*"export_package_docx_artifact",\s*\)/s,
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
    /const canonicalExportPackageDocxArtifact =\s*validateExportPackageDocxArtifact\(exportPackageDocxArtifactSnapshot\);/s,
  );
  assert.match(
    writerSlice,
    /const store = await readStore\(exportPackageDocxArtifactSnapshotsFileName, options\);/,
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
    /caseSnapshots\.push\(\s*normalizeExportPackageDocxArtifactRecord\(\s*caseId,\s*canonicalExportPackageDocxArtifact,\s*persistedAt,\s*\),\s*\);/s,
  );
  assert.match(writerSlice, /store\[caseId\] = caseSnapshots;/);
  assert.match(
    writerSlice,
    /await writeStore\(exportPackageDocxArtifactSnapshotsFileName, store, options\);/,
  );
  assert.match(writerSlice, /return canonicalExportPackageDocxArtifact;/);
  assert.deepEqual(
    collectLineMatches(databaseIndexText, /persistCaseExportPackageDocxArtifactSnapshot/),
    [1031, 1256, 1585],
  );
  assert.deepEqual(
    collectLineMatches(
      databaseIndexText,
      /^\s*persistCaseExportPackageDocxArtifactSnapshot,\s*$/,
    ),
    [1585],
  );
  assert.equal(
    (apiIndexText.match(/\bpersistCaseExportPackageDocxArtifactSnapshot\b/g) || []).length,
    0,
  );
  assert.doesNotMatch(writerSlice, /persistCaseExportPackageSnapshot\(/);
  assert.doesNotMatch(writerSlice, /persistCaseExportPackageJsonArtifactSnapshot\(/);
  assert.doesNotMatch(writerSlice, /persistCaseExportPackageMarkdownArtifactSnapshot\(/);
  assert.doesNotMatch(writerSlice, /persistCaseExportPackagePdfArtifactSnapshot\(/);
  assert.doesNotMatch(writerSlice, /getLatestCaseExportPackageDocxArtifactSnapshot\(/);
  assert.doesNotMatch(writerSlice, /getLatestCaseExportPackageDocxArtifactProjection\(/);
  assert.doesNotMatch(writerSlice, /refreshCaseExportPackageDocxArtifactSnapshot\(/);
  assert.doesNotMatch(writerSlice, /deriveExportPackageDocxArtifact\(/);
  assert.doesNotMatch(writerSlice, /resolveExportPackageDocxArtifactProjection\(/);

  assert.match(
    refreshSlice,
    /return persistCaseExportPackageDocxArtifactSnapshot\(\s*caseId,\s*canonicalExportPackageDocxArtifact,\s*options,\s*\);/s,
  );

  assert.match(
    exportPackageDocxArtifactPersistenceTestText,
    /test\("valid DOCX export artifact payload roundtrips through persistence"/,
  );
  assert.match(
    exportPackageDocxArtifactPersistenceTestText,
    /const persisted = await persistCaseExportPackageDocxArtifactSnapshot\("case-1", payload, \{\s*storageDir,\s*\}\);/s,
  );
  assert.match(
    exportPackageDocxArtifactPersistenceTestText,
    /test\("invalid payload shape is rejected before persistence"/,
  );
  assert.match(
    exportPackageDocxArtifactPersistenceTestText,
    /test\("non-SWE_BODELNING behavior remains unchanged"/,
  );
  assert.match(
    exportPackageDocxArtifactRefreshTestText,
    /test\("canonical refresh\/create persists a valid SWE_BODELNING DOCX export artifact snapshot"/,
  );
  assert.match(
    exportPackageDocxArtifactRefreshTestText,
    /const refreshed = await refreshCaseExportPackageDocxArtifactSnapshot\("case-1", \{\s*storageDir,\s*\}\);/s,
  );
  assert.match(
    exportPackageDocxArtifactValidatorDispatchTestText,
    /test\("packages\/database persisted DOCX export artifact validation uses the dispatch path while preserving current SWE_BODELNING behavior"/,
  );
  assert.match(
    exportPackageDocxArtifactValidatorDispatchTestText,
    /test\("runtime support for CMD_PROFILE uses the shared validation path"/,
  );
  assert.match(
    exportPackageDocxArtifactValidatorDispatchTestText,
    /test\("unsupported\/non-SWE machine-readable behavior remains unchanged"/,
  );
});
