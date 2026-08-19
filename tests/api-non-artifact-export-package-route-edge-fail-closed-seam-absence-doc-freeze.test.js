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

test("docs freeze the shared apps/api non-artifact export-package route-edge fail-closed seam only as an absence/prerequisite boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared Non-Artifact Export-Package Route-Edge Fail-Closed Seam Absence\/Prerequisite Freeze[\s\S]*?(?=\n### )/,
  );

  assert.ok(
    docsSectionMatch,
    "expected shared non-artifact export-package route-edge fail-closed absence docs section",
  );

  const docsSection = docsSectionMatch[0];

  assert.match(
    docsSection,
    /Shared Non-Artifact Export-Package Route-Edge Fail-Closed Seam Absence\/Prerequisite Freeze/i,
  );
  assert.match(
    docsSection,
    /distinct shared `apps\/api` non-artifact export-package route-edge fail-closed seam family spanning only the repeated `ERR_ROUTE_NOT_FOUND` and `ERR_METHOD_NOT_ALLOWED` branches for the non-artifact export-package latest-read and refresh routes is now frozen as a canonical absence\/prerequisite boundary rather than as an active shared helper seam/i,
  );
  assert.match(
    docsSection,
    /current repo state does not currently evidence a distinct shared `apps\/api` non-artifact export-package route-edge fail-closed seam family beyond the already-audited shared `ERR_ROUTE_NOT_FOUND` API envelope partition, the already-audited shared `ERR_METHOD_NOT_ALLOWED` API envelope partition, the already-audited shared `\/cases\/:caseId\/\.\.\.` parser seam, the already-audited shared `jsonResponse\(\.\.\.\)` \/ `errorResponse\(\.\.\.\)` response-helper seam, the already-audited four route-specific seams, and the already-frozen non-artifact export-package route-family absence boundary/i,
  );
  assert.match(
    docsSection,
    /only currently evidenced shared route-edge fail-closed response-construction surface in this area remains the shared `errorResponse\(status, code, details\)` helper in `apps\/api\/src\/index\.js`, used through the broader already-audited `ERR_ROUTE_NOT_FOUND` and `ERR_METHOD_NOT_ALLOWED` envelope partitions/i,
  );
  assert.match(
    docsSection,
    /no distinct shared non-artifact export-package route-edge fail-closed helper or dispatcher is currently evidenced in `apps\/api\/src\/index\.js`/i,
  );
  assert.match(
    docsSection,
    /only currently evidenced non-artifact export-package route-edge fail-closed runtime surfaces in this area remain the route-specific handlers:\s+`GET \/cases\/:caseId\/export-package\/latest`\s+`GET \/cases\/:caseId\/export-package\/bundle-manifest\/latest`\s+`POST \/cases\/:caseId\/export-package\/refresh`\s+`POST \/cases\/:caseId\/export-package\/bundle-manifest\/refresh`/i,
  );
  assert.match(
    docsSection,
    /those four route-specific seams remain distinct because each still owns its own parser call, route-entry `ERR_ROUTE_NOT_FOUND` branch, downstream method gate, and route-specific business behavior after those edge branches, rather than delegating those fail-closed branches through a separate shared route-edge family helper\/dispatcher/i,
  );
  assert.match(
    docsSection,
    /already-audited shared `ERR_ROUTE_NOT_FOUND` API envelope partition remains limited to the broader repeated route-entry miss family and must stay distinct from any future shared non-artifact export-package route-edge fail-closed seam family/i,
  );
  assert.match(
    docsSection,
    /already-audited shared `ERR_METHOD_NOT_ALLOWED` API envelope partition remains limited to the broader repeated thin route-edge method-gate family and must stay distinct from any future shared non-artifact export-package route-edge fail-closed seam family/i,
  );
  assert.match(
    docsSection,
    /already-audited shared `\/cases\/:caseId\/\.\.\.` parser seam remains limited to parser-level match and safe case-id decode behavior and must stay distinct from any future shared non-artifact export-package route-edge fail-closed seam family/i,
  );
  assert.match(
    docsSection,
    /already-audited shared `jsonResponse\(\.\.\.\)` \/ `errorResponse\(\.\.\.\)` response-helper seam remains limited to final response shaping and must stay distinct from any future shared non-artifact export-package route-edge fail-closed seam family/i,
  );
  assert.match(
    docsSection,
    /already-audited four route-specific seams remain distinct route boundaries and must not be reinterpreted as proof of a broader shared non-artifact export-package route-edge fail-closed seam family without explicit new contract\/runtime evidence/i,
  );
  assert.match(
    docsSection,
    /already-frozen non-artifact export-package route-family absence boundary remains separate because current repo state still does not evidence a distinct shared route-family helper\/dispatcher above or across those four route-specific handlers/i,
  );
  assert.match(
    docsSection,
    /current bounded docs\/runtime proof surface already evidenced for this absence\/prerequisite freeze is limited to 1 docs freeze section, 1 still-separate shared `ERR_ROUTE_NOT_FOUND` API envelope partition, 1 still-separate shared `ERR_METHOD_NOT_ALLOWED` API envelope partition, 1 still-separate shared `\/cases\/:caseId\/\.\.\.` parser seam, 1 still-separate shared `jsonResponse\(\.\.\.\)` \/ `errorResponse\(\.\.\.\)` response-helper seam, 4 route-specific handler definitions in `apps\/api\/src\/index\.js`, 4 route-specific `ERR_ROUTE_NOT_FOUND` branches, 4 route-specific `ERR_METHOD_NOT_ALLOWED` branches, 0 distinct shared non-artifact export-package route-edge fail-closed helper or dispatcher definitions in `apps\/api\/src\/index\.js`, and current proof in `tests\/api-non-artifact-export-package-route-edge-fail-closed-seam-absence-doc-freeze\.test\.js`/i,
  );
  assert.match(
    docsSection,
    /no undocumented broadening should treat repeated route-specific `ERR_ROUTE_NOT_FOUND` branches, repeated route-specific `ERR_METHOD_NOT_ALLOWED` branches, repeated route-specific parser-to-route-edge translation, or repeated route-specific `errorResponse\(\.\.\.\)` route-edge calls as if they already prove a distinct shared `apps\/api` non-artifact export-package route-edge fail-closed seam family/i,
  );
  assert.match(
    docsSection,
    /seam should remain frozen as an absence\/prerequisite boundary unless explicit shared non-artifact export-package route-edge fail-closed contract detail, focused docs freeze, and runtime evidence are added/i,
  );
  assert.match(
    docsSection,
    /does not change runtime behavior, route-edge fail-closed semantics, envelope-partition semantics, parser semantics, response-helper semantics, route-family semantics, thin route semantics, auth\/access semantics, database-helper behavior, governance-helper behavior, API error-envelope behavior, or fail-closed behavior/i,
  );

  assert.match(
    apiIndexText,
    /function errorResponse\(status, code, details = \{\}\)\s*\{\s*return jsonResponse\(status, \{\s*error: \{\s*code,/,
  );
  assert.match(
    apiIndexText,
    /function parseCasePath\(pathname,\s*pattern\)\s*\{\s*const match = pattern\.exec\(pathname\);/,
  );

  assert.equal(
    (apiIndexText.match(
      /async function handleCaseExportPackage(?:BundleManifest)?LatestRoute\(/g,
    ) || []).length,
    2,
  );
  assert.equal(
    (apiIndexText.match(
      /async function handleCaseExportPackage(?:BundleManifest)?RefreshRoute\(/g,
    ) || []).length,
    2,
  );

  assert.match(
    apiIndexText,
    /async function handleCaseExportPackageLatestRoute\([\s\S]*?if \(!routeMatch\) \{\s*return errorResponse\(404, "ERR_ROUTE_NOT_FOUND"\);\s*\}[\s\S]*?if \(request\.method !== "GET"\) \{\s*return errorResponse\(405, "ERR_METHOD_NOT_ALLOWED", \{\s*method: request\.method,\s*\}\);\s*\}/,
  );
  assert.match(
    apiIndexText,
    /async function handleCaseExportPackageBundleManifestLatestRoute\([\s\S]*?if \(!routeMatch\) \{\s*return errorResponse\(404, "ERR_ROUTE_NOT_FOUND"\);\s*\}[\s\S]*?if \(request\.method !== "GET"\) \{\s*return errorResponse\(405, "ERR_METHOD_NOT_ALLOWED", \{\s*method: request\.method,\s*\}\);\s*\}/,
  );
  assert.match(
    apiIndexText,
    /async function handleCaseExportPackageRefreshRoute\([\s\S]*?if \(!routeMatch\) \{\s*return errorResponse\(404, "ERR_ROUTE_NOT_FOUND"\);\s*\}[\s\S]*?if \(request\.method !== "POST"\) \{\s*return errorResponse\(405, "ERR_METHOD_NOT_ALLOWED", \{\s*method: request\.method,\s*\}\);\s*\}/,
  );
  assert.match(
    apiIndexText,
    /async function handleCaseExportPackageBundleManifestRefreshRoute\([\s\S]*?if \(!routeMatch\) \{\s*return errorResponse\(404, "ERR_ROUTE_NOT_FOUND"\);\s*\}[\s\S]*?if \(request\.method !== "POST"\) \{\s*return errorResponse\(405, "ERR_METHOD_NOT_ALLOWED", \{\s*method: request\.method,\s*\}\);\s*\}/,
  );

  const routeNotFoundMatches = apiIndexText.match(
    /async function handleCaseExportPackage(?:BundleManifest)?(?:Latest|Refresh)Route\([\s\S]*?if \(!routeMatch\) \{\s*return errorResponse\(404, "ERR_ROUTE_NOT_FOUND"\);\s*\}/g,
  ) || [];
  assert.equal(routeNotFoundMatches.length, 4);

  const methodNotAllowedMatches = apiIndexText.match(
    /async function handleCaseExportPackage(?:BundleManifest)?(?:Latest|Refresh)Route\([\s\S]*?return errorResponse\(405, "ERR_METHOD_NOT_ALLOWED", \{\s*method: request\.method,\s*\}\);/g,
  ) || [];
  assert.equal(methodNotAllowedMatches.length, 4);

  assert.doesNotMatch(
    apiIndexText,
    /function (?:dispatch|handle|get|create)SharedNonArtifactExportPackageRouteEdgeFailClosed/i,
  );
  assert.doesNotMatch(
    apiIndexText,
    /function dispatchNonArtifactExportPackageRouteEdgeFailClosed/i,
  );
  assert.doesNotMatch(
    apiIndexText,
    /function handleCaseNonArtifactExportPackageRouteEdgeFailClosedFamilyRoute/i,
  );
});
