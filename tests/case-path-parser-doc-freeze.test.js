const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const docsText = fs.readFileSync(
  path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md"),
  "utf8",
);
const apiIndexText = fs.readFileSync(
  path.join(__dirname, "..", "apps", "api", "src", "index.js"),
  "utf8",
);

test("docs freeze the shared /cases/:caseId/... parser seam as the safe case-scoped route-entry boundary", () => {
  assert.match(docsText, /Shared `\/cases\/:caseId\/\.\.\.` Parser Seam Freeze/i);
  assert.match(
    docsText,
    /shared `apps\/api\/src\/index\.js` `decodeCaseIdOrNull` \+ `parseCasePath` seam is the canonical case-scoped route-entry parser boundary for the included route families below and is now frozen as the baseline seam/i,
  );
  assert.match(
    docsText,
    /the included case-scoped route families in this freeze are exactly:\s+`profile_inputs` read\/write\s+`release_eval` latest-read\s+`profile_dossier` read\/projection\s+`export_package` latest-read and refresh/i,
  );
  assert.match(
    docsText,
    /`export_package_bundle_manifest` latest-read and refresh\s+`export_package_bundle_archive_artifact` latest-read, refresh, and delivery\s+`export_package_json_artifact` latest-read, refresh, and delivery\s+`export_package_markdown_artifact` latest-read, refresh, and delivery\s+`export_package_pdf_artifact` latest-read, refresh, and delivery\s+`export_package_docx_artifact` latest-read, refresh, and delivery/i,
  );
  assert.match(
    docsText,
    /callers at the case-scoped route-entry boundary for those included route families should go through the shared `parseCasePath` seam and its safe `decodeCaseIdOrNull` helper with the route-specific path regex rather than calling `decodeURIComponent` directly inside route-specific parsers/i,
  );
  assert.match(
    docsText,
    /the currently concrete shared behavior already evidenced for this parser seam is limited to:\s+successful safe `decodeURIComponent\(encodedCaseId\)` through `decodeCaseIdOrNull`\s+malformed percent-encoded `caseId` handling by catching `URIError` and returning `null`\s+parser-level `null` \/ non-match return when the path does not match the route shape\s+parser-level `null` \/ non-match return when the encoded `caseId` is malformed\s+successful `\{ caseId \}` return from `parseCasePath` when the route shape matches and decode succeeds/i,
  );
  assert.match(
    docsText,
    /route-entry `ERR_ROUTE_NOT_FOUND` remains outside this parser seam because downstream route handlers translate parser-level `null` \/ non-match into that route-edge envelope/i,
  );
  assert.match(
    docsText,
    /route-edge `ERR_METHOD_NOT_ALLOWED` remains outside this parser seam because method gating is still performed by downstream route handlers after the shared parser returns a successful match/i,
  );
  assert.match(
    docsText,
    /the shared `loadAuthorizedCaseContext` helper remains outside this parser seam because auth\/access loading begins only after a successful parser match/i,
  );
  assert.match(
    docsText,
    /downstream latest-read \/ refresh \/ delivery behavior remains outside this parser seam/i,
  );
  assert.match(
    docsText,
    /future new `\/cases\/:caseId\/\.\.\.` route families that need the same safe case-id decode \/ parser behavior should extend the existing shared parser seam instead of introducing a parallel direct-`decodeURIComponent` parser stack/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, path semantics, auth\/access semantics, database behavior, API error-envelope behavior, or fail-closed behavior/i,
  );

  assert.match(
    apiIndexText,
    /function decodeCaseIdOrNull\(encodedCaseId\)\s*\{\s*try\s*\{\s*return decodeURIComponent\(encodedCaseId\);\s*\}\s*catch \(error\)\s*\{\s*if \(error instanceof URIError\)\s*\{\s*return null;\s*\}\s*throw error;\s*\}\s*\}/,
  );
  assert.match(
    apiIndexText,
    /function parseCasePath\(pathname,\s*pattern\)\s*\{\s*const match = pattern\.exec\(pathname\);\s*if \(!match\)\s*\{\s*return null;\s*\}\s*const caseId = decodeCaseIdOrNull\(match\[1\]\);\s*return caseId === null \? null : \{ caseId \};\s*\}/,
  );
  assert.equal((apiIndexText.match(/decodeURIComponent\(/g) || []).length, 1);

  const parserHelpers = [
    ...apiIndexText.matchAll(
      /function (parseCase[A-Za-z]+Path)\(pathname\) \{\s*return parseCasePath\(/g,
    ),
  ].map((match) => match[1]);

  assert.deepEqual(parserHelpers, [
    "parseCaseProfileInputsPath",
    "parseCaseReleaseEvalLatestPath",
    "parseCaseProfileDossierPath",
    "parseCaseExportPackageLatestPath",
    "parseCaseExportPackageBundleManifestLatestPath",
    "parseCaseExportPackageBundleArchiveArtifactLatestPath",
    "parseCaseExportPackageBundleArchiveArtifactRefreshPath",
    "parseCaseExportPackageBundleArchiveArtifactDownloadPath",
    "parseCaseExportPackageBundleManifestRefreshPath",
    "parseCaseExportPackageDocxArtifactLatestPath",
    "parseCaseExportPackagePdfArtifactLatestPath",
    "parseCaseExportPackageJsonArtifactLatestPath",
    "parseCaseExportPackageMarkdownArtifactLatestPath",
    "parseCaseExportPackageMarkdownArtifactDownloadPath",
    "parseCaseExportPackageDocxArtifactDownloadPath",
    "parseCaseExportPackageJsonArtifactDownloadPath",
    "parseCaseExportPackagePdfArtifactDownloadPath",
    "parseCaseExportPackagePdfArtifactRefreshPath",
    "parseCaseExportPackageDocxArtifactRefreshPath",
    "parseCaseExportPackageJsonArtifactRefreshPath",
    "parseCaseExportPackageMarkdownArtifactRefreshPath",
    "parseCaseExportPackageRefreshPath",
  ]);
  assert.match(
    apiIndexText,
    /const routeMatch = parseCaseProfileInputsPath\(request\.path\);\s*if \(!routeMatch\)\s*\{\s*return errorResponse\(404,\s*"ERR_ROUTE_NOT_FOUND"\);\s*\}\s*const authorization = await loadAuthorizedCaseContext\(/,
  );
});
