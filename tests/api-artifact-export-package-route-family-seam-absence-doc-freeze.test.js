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

test("docs freeze the shared apps/api artifact export-package route-family seam only as an absence/prerequisite boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared Artifact Export-Package Route-Family Seam Absence\/Prerequisite Freeze[\s\S]*?(?=\n### )/,
  );

  assert.ok(
    docsSectionMatch,
    "expected shared artifact export-package route-family absence docs section",
  );

  const docsSection = docsSectionMatch[0];

  assert.match(
    docsSection,
    /Shared Artifact Export-Package Route-Family Seam Absence\/Prerequisite Freeze/i,
  );
  assert.match(
    docsSection,
    /distinct shared `apps\/api` artifact export-package route-family seam spanning the artifact latest-read, refresh, and delivery routes is now frozen as a canonical absence\/prerequisite boundary rather than as an active shared helper seam/i,
  );
  assert.match(
    docsSection,
    /current repo state does not currently evidence a distinct shared `apps\/api` artifact export-package route-family seam beyond the already-audited shared `jsonResponse\(\.\.\.\)` \/ `errorResponse\(\.\.\.\)` response-helper seam, the already-audited shared `ERR_ROUTE_NOT_FOUND` API envelope partition, the already-audited shared `ERR_METHOD_NOT_ALLOWED` API envelope partition, the already-audited shared `\/cases\/:caseId\/\.\.\.` parser seam, the already-audited individual artifact latest-read seams, the already-audited individual artifact refresh seams, the already-audited individual artifact delivery seams, the already-frozen artifact latest-read absence boundary, the already-frozen artifact delivery absence boundary, and the already-frozen artifact route-edge fail-closed absence boundary/i,
  );
  assert.match(
    docsSection,
    /only currently evidenced shared response-construction surfaces in this area remain the shared `jsonResponse\(status, body\)` and `errorResponse\(status, code, details\)` helpers in `apps\/api\/src\/index\.js`/i,
  );
  assert.match(
    docsSection,
    /no distinct shared artifact export-package route-family helper or dispatcher is currently evidenced in `apps\/api\/src\/index\.js`/i,
  );
  assert.match(
    docsSection,
    /only currently evidenced artifact export-package route-family runtime surfaces in this area remain the route-specific handlers:\s+`GET \/cases\/:caseId\/export-package\/bundle-archive-artifact\/latest`\s+`POST \/cases\/:caseId\/export-package\/bundle-archive-artifact\/refresh`\s+`GET \/cases\/:caseId\/export-package\/bundle-archive-artifact\/download`\s+`GET \/cases\/:caseId\/export-package\/json-artifact\/latest`\s+`POST \/cases\/:caseId\/export-package\/json-artifact\/refresh`\s+`GET \/cases\/:caseId\/export-package\/json-artifact\/download`\s+`GET \/cases\/:caseId\/export-package\/markdown-artifact\/latest`\s+`POST \/cases\/:caseId\/export-package\/markdown-artifact\/refresh`\s+`GET \/cases\/:caseId\/export-package\/markdown-artifact\/download`\s+`GET \/cases\/:caseId\/export-package\/pdf-artifact\/latest`\s+`POST \/cases\/:caseId\/export-package\/pdf-artifact\/refresh`\s+`GET \/cases\/:caseId\/export-package\/pdf-artifact\/download`\s+`GET \/cases\/:caseId\/export-package\/docx-artifact\/latest`\s+`POST \/cases\/:caseId\/export-package\/docx-artifact\/refresh`\s+`GET \/cases\/:caseId\/export-package\/docx-artifact\/download`/i,
  );
  assert.match(
    docsSection,
    /those artifact route-specific seams remain distinct because each still owns its own parser call, route-entry `ERR_ROUTE_NOT_FOUND` branch, downstream method gate, auth\/access branch, route-specific persisted-read or refresh precondition load, route-specific mismatch or current-only fail-closed behavior, and final route-specific runtime behavior rather than delegating the full route flow through a separate shared artifact export-package route-family helper\/dispatcher/i,
  );
  assert.match(
    docsSection,
    /already-audited shared `jsonResponse\(\.\.\.\)` \/ `errorResponse\(\.\.\.\)` response-helper seam remains limited to final response shaping and must stay distinct from any future shared artifact export-package route-family seam/i,
  );
  assert.match(
    docsSection,
    /already-audited shared `ERR_ROUTE_NOT_FOUND` API envelope partition remains limited to the broader repeated route-entry miss family and must stay distinct from any future shared artifact export-package route-family seam/i,
  );
  assert.match(
    docsSection,
    /already-audited shared `ERR_METHOD_NOT_ALLOWED` API envelope partition remains limited to the broader repeated thin route-edge method-gate family and must stay distinct from any future shared artifact export-package route-family seam/i,
  );
  assert.match(
    docsSection,
    /already-audited shared `\/cases\/:caseId\/\.\.\.` parser seam remains limited to parser-level match and safe case-id decode behavior and must stay distinct from any future shared artifact export-package route-family seam/i,
  );
  assert.match(
    docsSection,
    /already-audited individual artifact latest-read seams, individual artifact refresh seams, and individual artifact delivery seams remain distinct route boundaries and must not be reinterpreted as proof of a broader shared artifact export-package route-family seam without explicit new contract\/runtime evidence/i,
  );
  assert.match(
    docsSection,
    /already-frozen artifact latest-read absence boundary remains separate because current repo state still does not evidence a distinct shared artifact latest-read helper\/dispatcher above or across those route-specific artifact latest-read handlers/i,
  );
  assert.match(
    docsSection,
    /already-frozen artifact delivery absence boundary remains separate because current repo state still does not evidence a distinct shared artifact delivery helper\/dispatcher above or across those route-specific artifact delivery handlers/i,
  );
  assert.match(
    docsSection,
    /already-frozen artifact route-edge fail-closed absence boundary remains separate because current repo state still does not evidence a distinct shared artifact route-edge fail-closed helper\/dispatcher above or across those same 15 route-specific artifact handlers/i,
  );
  assert.match(
    docsSection,
    /current bounded docs\/runtime proof surface already evidenced for this absence\/prerequisite freeze is limited to 1 docs freeze section, 1 still-separate shared `jsonResponse\(\.\.\.\)` \/ `errorResponse\(\.\.\.\)` response-helper seam, 1 still-separate shared `ERR_ROUTE_NOT_FOUND` API envelope partition, 1 still-separate shared `ERR_METHOD_NOT_ALLOWED` API envelope partition, 1 still-separate shared `\/cases\/:caseId\/\.\.\.` parser seam, 15 route-specific artifact handler definitions in `apps\/api\/src\/index\.js`, 5 route-specific latest-read handlers, 5 route-specific refresh handlers, 5 route-specific delivery handlers, 0 distinct shared artifact export-package route-family helper or dispatcher definitions in `apps\/api\/src\/index\.js`, and current proof in `tests\/api-artifact-export-package-route-family-seam-absence-doc-freeze\.test\.js`/i,
  );
  assert.match(
    docsSection,
    /no undocumented broadening should treat repeated route-specific parser use, repeated route-specific `ERR_ROUTE_NOT_FOUND` branches, repeated route-specific `ERR_METHOD_NOT_ALLOWED` branches, repeated route-specific `jsonResponse\(\.\.\.\)` or `errorResponse\(\.\.\.\)` calls, or repeated artifact path naming as if they already prove a distinct shared `apps\/api` artifact export-package route-family seam/i,
  );
  assert.match(
    docsSection,
    /this freeze records the canonical currently evidenced absence\/prerequisite boundary only and does not change runtime behavior, artifact latest-read semantics, artifact refresh semantics, artifact delivery semantics, response-helper semantics, envelope-partition semantics, parser semantics, individual artifact route semantics, artifact latest-read absence semantics, artifact delivery absence semantics, artifact edge-fail-closed absence semantics, database-helper behavior, API error-envelope behavior, or fail-closed behavior/i,
  );

  assert.match(apiIndexText, /function jsonResponse\(status, body\)/);
  assert.match(apiIndexText, /function errorResponse\(status, code, details = \{\}\)/);

  const latestRouteHandlers =
    apiIndexText.match(
      /async function handleCaseExportPackage(?:BundleArchiveArtifact|DocxArtifact|PdfArtifact|JsonArtifact|MarkdownArtifact)LatestRoute\(/g,
    ) || [];
  assert.equal(latestRouteHandlers.length, 5);

  const refreshRouteHandlers =
    apiIndexText.match(
      /async function handleCaseExportPackage(?:BundleArchiveArtifact|DocxArtifact|PdfArtifact|JsonArtifact|MarkdownArtifact)RefreshRoute\(/g,
    ) || [];
  assert.equal(refreshRouteHandlers.length, 5);

  const deliveryRouteHandlers =
    apiIndexText.match(
      /async function handleCaseExportPackage(?:BundleArchiveArtifact|DocxArtifact|PdfArtifact|JsonArtifact|MarkdownArtifact)DownloadRoute\(/g,
    ) || [];
  assert.equal(deliveryRouteHandlers.length, 5);

  const routeHandlerMatches =
    apiIndexText.match(
      /async function handleCaseExportPackage(?:BundleArchiveArtifact|DocxArtifact|PdfArtifact|JsonArtifact|MarkdownArtifact)(?:Latest|Refresh|Download)Route\(/g,
    ) || [];
  assert.equal(routeHandlerMatches.length, 15);

  assert.doesNotMatch(
    apiIndexText,
    /function (?:dispatch|handle|get|create)SharedArtifactExportPackageRouteFamily/i,
  );
  assert.doesNotMatch(
    apiIndexText,
    /function dispatchArtifactExportPackageRouteFamily/i,
  );
  assert.doesNotMatch(
    apiIndexText,
    /function handleCaseArtifactExportPackageRouteFamilyRoute/i,
  );
});
