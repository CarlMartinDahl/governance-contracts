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

test("docs freeze the shared apps/api route-edge failure family only as an absence/prerequisite boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared `apps\/api` Route-Edge Failure Family Absence\/Prerequisite Freeze[\s\S]*?(?=\n### )/,
  );

  assert.ok(docsSectionMatch, "expected shared route-edge failure absence docs section");

  const docsSection = docsSectionMatch[0];

  assert.match(
    docsSection,
    /distinct shared `apps\/api` route-edge failure family spanning the currently evidenced case-scoped route consumers above the already-audited lower route-edge failure seams is now frozen as a canonical absence\/prerequisite boundary rather than as an active shared helper seam or dispatcher/i,
  );
  assert.match(
    docsSection,
    /current repo state does not currently evidence a distinct shared `apps\/api` route-edge failure family beyond the already-audited shared `\/cases\/:caseId\/\.\.\.` parser seam, the already-audited shared `ERR_ROUTE_NOT_FOUND` API envelope partition\/prerequisites, the already-audited shared `ERR_METHOD_NOT_ALLOWED` API envelope partition\/prerequisites, the already-audited shared `jsonResponse\(\.\.\.\)` \/ `errorResponse\(\.\.\.\)` response-helper seam, and the route-specific consumers that remain separate above those lower seams/i,
  );
  assert.match(
    docsSection,
    /only currently evidenced shared route-edge runtime surfaces in this area remain parser-level `null` \/ non-match translation into route-local `ERR_ROUTE_NOT_FOUND` plus route-local downstream method gating into `ERR_METHOD_NOT_ALLOWED` using the already-audited lower seams/i,
  );
  assert.match(
    docsSection,
    /no distinct shared route-edge failure helper or dispatcher above the already-audited shared parser seam plus the already-audited `ERR_ROUTE_NOT_FOUND` and `ERR_METHOD_NOT_ALLOWED` envelope partitions is currently evidenced in `apps\/api\/src\/index\.js`/i,
  );
  assert.match(
    docsSection,
    /those route-specific consumers remain distinct because each still owns its own parser call, route-entry `ERR_ROUTE_NOT_FOUND` branch, downstream method gate, and downstream auth\/access or route-specific business behavior after those lower route-edge branches, rather than delegating the full route edge through a separate shared route-edge failure helper or dispatcher/i,
  );
  assert.match(
    docsSection,
    /already-audited shared `\/cases\/:caseId\/\.\.\.` parser seam remains limited to parser-level match and safe case-id decode behavior and must stay distinct from any future higher route-edge failure family claim/i,
  );
  assert.match(
    docsSection,
    /already-audited shared `ERR_ROUTE_NOT_FOUND` API envelope partition remains limited to the broader repeated route-entry miss family and must stay distinct from any future higher route-edge failure family claim/i,
  );
  assert.match(
    docsSection,
    /already-audited shared `ERR_METHOD_NOT_ALLOWED` API envelope partition remains limited to the broader repeated thin route-edge method-gate family and must stay distinct from any future higher route-edge failure family claim/i,
  );
  assert.match(
    docsSection,
    /already-audited shared `jsonResponse\(\.\.\.\)` \/ `errorResponse\(\.\.\.\)` response-helper seam remains limited to final response shaping and must stay distinct from any future higher route-edge failure family claim/i,
  );
  assert.match(
    docsSection,
    /22 route-specific handler definitions in `apps\/api\/src\/index\.js`, 22 route-specific `ERR_ROUTE_NOT_FOUND` branches, 22 route-specific `ERR_METHOD_NOT_ALLOWED` branches, 0 distinct shared route-edge failure helper or dispatcher definitions in `apps\/api\/src\/index\.js`, and current proof in `tests\/api-route-edge-failure-family-absence-doc-freeze\.test\.js`/i,
  );
  assert.match(
    docsSection,
    /no undocumented broadening should treat repeated route-specific parser use, repeated route-specific `ERR_ROUTE_NOT_FOUND` branches, repeated route-specific `ERR_METHOD_NOT_ALLOWED` branches, repeated route-specific parser-to-route-edge translation, repeated route-specific `errorResponse\(\.\.\.\)` route-edge calls, or repeated route family naming as if they already prove a distinct shared `apps\/api` route-edge failure family/i,
  );
  assert.match(
    docsSection,
    /does not change runtime behavior, parser semantics, route-not-found semantics, method-not-allowed semantics, response-helper semantics, auth\/access semantics, route-specific business semantics, database-helper behavior, API error-envelope behavior, or fail-closed behavior/i,
  );

  assert.match(
    apiIndexText,
    /function decodeCaseIdOrNull\(encodedCaseId\)\s*\{\s*try\s*\{\s*return decodeURIComponent\(encodedCaseId\);[\s\S]*?return null;[\s\S]*?\}\s*\}/,
  );
  assert.match(
    apiIndexText,
    /function parseCasePath\(pathname,\s*pattern\)\s*\{\s*const match = pattern\.exec\(pathname\);\s*if \(!match\)\s*\{\s*return null;\s*\}\s*const caseId = decodeCaseIdOrNull\(match\[1\]\);\s*return caseId === null \? null : \{ caseId \};\s*\}/,
  );
  assert.match(
    apiIndexText,
    /function errorResponse\(status, code, details = \{\}\)\s*\{\s*return jsonResponse\(status, \{\s*error: \{\s*code,/,
  );

  const handlerMatches = apiIndexText.match(
    /async function handleCase(?:ProfileInputs|ReleaseEvalLatest|ProfileDossier|ExportPackage(?:BundleManifest|BundleArchiveArtifact|DocxArtifact|PdfArtifact|JsonArtifact|MarkdownArtifact)?(?:Latest|Refresh|Download)?|ExportPackageRefresh)Route\(/g,
  ) || [];
  assert.equal(handlerMatches.length, 22);

  const routeNotFoundMatches = apiIndexText.match(
    /async function handleCase(?:ProfileInputs|ReleaseEvalLatest|ProfileDossier|ExportPackage(?:BundleManifest|BundleArchiveArtifact|DocxArtifact|PdfArtifact|JsonArtifact|MarkdownArtifact)?(?:Latest|Refresh|Download)?|ExportPackageRefresh)Route\([\s\S]*?if \(!routeMatch\) \{\s*return errorResponse\(404, "ERR_ROUTE_NOT_FOUND"\);\s*\}/g,
  ) || [];
  assert.equal(routeNotFoundMatches.length, 22);

  const methodNotAllowedMatches = apiIndexText.match(
    /async function handleCase(?:ProfileInputs|ReleaseEvalLatest|ProfileDossier|ExportPackage(?:BundleManifest|BundleArchiveArtifact|DocxArtifact|PdfArtifact|JsonArtifact|MarkdownArtifact)?(?:Latest|Refresh|Download)?|ExportPackageRefresh)Route\([\s\S]*?return errorResponse\(405, "ERR_METHOD_NOT_ALLOWED", \{\s*method: request\.method,\s*\}\);/g,
  ) || [];
  assert.equal(methodNotAllowedMatches.length, 22);

  assert.match(
    apiIndexText,
    /async function handleCaseProfileInputsRoute\([\s\S]*?const routeMatch = parseCaseProfileInputsPath\(request\.path\);[\s\S]*?if \(!routeMatch\) \{\s*return errorResponse\(404, "ERR_ROUTE_NOT_FOUND"\);\s*\}[\s\S]*?return errorResponse\(405, "ERR_METHOD_NOT_ALLOWED", \{\s*method: request\.method,\s*\}\);/,
  );
  assert.match(
    apiIndexText,
    /async function handleCaseReleaseEvalLatestRoute\([\s\S]*?const routeMatch = parseCaseReleaseEvalLatestPath\(request\.path\);[\s\S]*?if \(!routeMatch\) \{\s*return errorResponse\(404, "ERR_ROUTE_NOT_FOUND"\);\s*\}[\s\S]*?return errorResponse\(405, "ERR_METHOD_NOT_ALLOWED", \{\s*method: request\.method,\s*\}\);/,
  );
  assert.match(
    apiIndexText,
    /async function handleCaseProfileDossierRoute\([\s\S]*?const routeMatch = parseCaseProfileDossierPath\(request\.path\);[\s\S]*?if \(!routeMatch\) \{\s*return errorResponse\(404, "ERR_ROUTE_NOT_FOUND"\);\s*\}[\s\S]*?return errorResponse\(405, "ERR_METHOD_NOT_ALLOWED", \{\s*method: request\.method,\s*\}\);/,
  );
  assert.match(
    apiIndexText,
    /async function handleCaseExportPackageLatestRoute\([\s\S]*?const routeMatch = parseCaseExportPackageLatestPath\(request\.path\);[\s\S]*?if \(!routeMatch\) \{\s*return errorResponse\(404, "ERR_ROUTE_NOT_FOUND"\);\s*\}[\s\S]*?return errorResponse\(405, "ERR_METHOD_NOT_ALLOWED", \{\s*method: request\.method,\s*\}\);/,
  );
  assert.match(
    apiIndexText,
    /async function handleCaseExportPackageRefreshRoute\([\s\S]*?const routeMatch = parseCaseExportPackageRefreshPath\(request\.path\);[\s\S]*?if \(!routeMatch\) \{\s*return errorResponse\(404, "ERR_ROUTE_NOT_FOUND"\);\s*\}[\s\S]*?return errorResponse\(405, "ERR_METHOD_NOT_ALLOWED", \{\s*method: request\.method,\s*\}\);/,
  );

  assert.doesNotMatch(
    apiIndexText,
    /function (?:dispatch|handle|get|create)SharedRouteEdgeFailure/i,
  );
  assert.doesNotMatch(
    apiIndexText,
    /function dispatchRouteEdgeFailure/i,
  );
  assert.doesNotMatch(
    apiIndexText,
    /function handleCaseRouteEdgeFailureFamilyRoute/i,
  );
});
