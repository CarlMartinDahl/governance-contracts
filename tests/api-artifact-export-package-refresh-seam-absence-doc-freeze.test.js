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

test("docs freeze the shared apps/api artifact export-package refresh seam only as an absence/prerequisite boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared Artifact Export-Package Refresh Seam Absence\/Prerequisite Freeze[\s\S]*?(?=\n### )/,
  );

  assert.ok(
    docsSectionMatch,
    "expected shared artifact export-package refresh absence docs section",
  );

  const docsSection = docsSectionMatch[0];

  assert.match(
    docsSection,
    /Shared Artifact Export-Package Refresh Seam Absence\/Prerequisite Freeze/i,
  );
  assert.match(
    docsSection,
    /distinct shared `apps\/api` artifact export-package refresh seam family spanning only the five artifact refresh routes is now frozen as a canonical absence\/prerequisite boundary rather than as an active shared helper seam/i,
  );
  assert.match(
    docsSection,
    /current repo state does not currently evidence a distinct shared `apps\/api` artifact export-package refresh seam family beyond the already-audited shared `jsonResponse\(\.\.\.\)` \/ `errorResponse\(\.\.\.\)` response-helper seam, the already-audited shared `export refresh invalid-contract` envelope partition, the already-audited five route-specific artifact refresh seams, the already-frozen artifact export-package route-family absence boundary, and the already-frozen artifact export-package route-edge fail-closed absence boundary/i,
  );
  assert.match(
    docsSection,
    /only currently evidenced shared response-construction surfaces in this area remain the shared `jsonResponse\(status, body\)` and `errorResponse\(status, code, details\)` helpers in `apps\/api\/src\/index\.js`/i,
  );
  assert.match(
    docsSection,
    /no distinct shared artifact export-package refresh helper or dispatcher is currently evidenced in `apps\/api\/src\/index\.js`/i,
  );
  assert.match(
    docsSection,
    /only currently evidenced artifact export-package refresh runtime surfaces in this area remain the route-specific handlers:\s+`POST \/cases\/:caseId\/export-package\/bundle-archive-artifact\/refresh`\s+`POST \/cases\/:caseId\/export-package\/json-artifact\/refresh`\s+`POST \/cases\/:caseId\/export-package\/markdown-artifact\/refresh`\s+`POST \/cases\/:caseId\/export-package\/pdf-artifact\/refresh`\s+`POST \/cases\/:caseId\/export-package\/docx-artifact\/refresh`/i,
  );
  assert.match(
    docsSection,
    /those artifact route-specific refresh seams remain distinct because each still owns its own parser call, route-entry `ERR_ROUTE_NOT_FOUND` branch, downstream `request\.method !== "POST"` gate, auth\/access branch, route-specific persisted refresh prerequisite load, route-specific upstream mismatch branch, route-specific invalid-contract or fail-closed branches, and final route-specific refresh runtime behavior rather than delegating the full refresh flow through a separate shared artifact export-package refresh helper\/dispatcher/i,
  );
  assert.match(
    docsSection,
    /already-audited shared `jsonResponse\(\.\.\.\)` \/ `errorResponse\(\.\.\.\)` response-helper seam remains limited to final response shaping and must stay distinct from any future shared artifact export-package refresh seam family/i,
  );
  assert.match(
    docsSection,
    /already-audited shared `export refresh invalid-contract` envelope partition remains limited to narrower repeated `422` machine-readable invalid-contract behavior and must stay distinct from any future shared artifact export-package refresh seam family/i,
  );
  assert.match(
    docsSection,
    /already-audited five route-specific artifact refresh seams remain distinct route boundaries and must not be reinterpreted as proof of a broader shared artifact export-package refresh seam family without explicit new contract\/runtime evidence/i,
  );
  assert.match(
    docsSection,
    /already-frozen artifact export-package route-family absence boundary remains separate because current repo state still does not evidence a distinct shared artifact export-package route-family helper\/dispatcher above or across those route-specific artifact refresh handlers/i,
  );
  assert.match(
    docsSection,
    /already-frozen artifact export-package route-edge fail-closed absence boundary remains separate because current repo state still does not evidence a distinct shared artifact export-package route-edge fail-closed helper\/dispatcher above or across those same five route-specific artifact refresh handlers/i,
  );
  assert.match(
    docsSection,
    /current bounded docs\/runtime proof surface already evidenced for this absence\/prerequisite freeze is limited to 1 docs freeze section, 1 still-separate shared `jsonResponse\(\.\.\.\)` \/ `errorResponse\(\.\.\.\)` response-helper seam, 1 still-separate shared `export refresh invalid-contract` envelope partition, 5 route-specific artifact refresh handler definitions in `apps\/api\/src\/index\.js`, 5 route-specific `request\.method !== "POST"` gates, 5 route-specific artifact refresh success returns through `jsonResponse\(\.\.\.\)`, 0 distinct shared artifact export-package refresh helper or dispatcher definitions in `apps\/api\/src\/index\.js`, and current proof in `tests\/api-artifact-export-package-refresh-seam-absence-doc-freeze\.test\.js`/i,
  );
  assert.match(
    docsSection,
    /no undocumented broadening should treat repeated route-specific artifact refresh handlers, repeated `request\.method !== "POST"` gates, repeated route-specific `jsonResponse\(\.\.\.\)` success returns, repeated route-specific `errorResponse\(\.\.\.\)` fail-closed branches, or repeated artifact refresh path naming as if they already prove a distinct shared `apps\/api` artifact export-package refresh seam family/i,
  );
  assert.match(
    docsSection,
    /this freeze records the canonical currently evidenced absence\/prerequisite boundary only and does not change runtime behavior, artifact refresh semantics, response-helper semantics, invalid-contract envelope semantics, route-specific artifact refresh semantics, artifact route-family absence semantics, artifact route-edge fail-closed absence semantics, parser behavior, auth\/access behavior, database-helper behavior, API error-envelope behavior, or fail-closed behavior/i,
  );

  assert.match(apiIndexText, /function jsonResponse\(status, body\)/);
  assert.match(apiIndexText, /function errorResponse\(status, code, details = \{\}\)/);

  const refreshRouteHandlers =
    apiIndexText.match(
      /async function handleCaseExportPackage(?:BundleArchiveArtifact|DocxArtifact|PdfArtifact|JsonArtifact|MarkdownArtifact)RefreshRoute\(/g,
    ) || [];
  assert.equal(refreshRouteHandlers.length, 5);

  const methodGateMatches =
    apiIndexText.match(
      /async function handleCaseExportPackage(?:BundleArchiveArtifact|DocxArtifact|PdfArtifact|JsonArtifact|MarkdownArtifact)RefreshRoute\([\s\S]*?if \(request\.method !== "POST"\) \{\s*return errorResponse\(405, "ERR_METHOD_NOT_ALLOWED", \{\s*method: request\.method,\s*\}\);\s*\}/g,
    ) || [];
  assert.equal(methodGateMatches.length, 5);

  const successReturnMatches =
    apiIndexText.match(
      /async function handleCaseExportPackage(?:BundleArchiveArtifact|DocxArtifact|PdfArtifact|JsonArtifact|MarkdownArtifact)RefreshRoute\([\s\S]*?return jsonResponse\(200, exportPackage(?:BundleArchiveArtifact|DocxArtifact|PdfArtifact|JsonArtifact|MarkdownArtifact)Snapshot\);/g,
    ) || [];
  assert.equal(successReturnMatches.length, 5);

  assert.doesNotMatch(
    apiIndexText,
    /function (?:dispatch|handle|get|create)SharedArtifactExportPackageRefresh/i,
  );
  assert.doesNotMatch(
    apiIndexText,
    /function dispatchArtifactExportPackageRefresh/i,
  );
  assert.doesNotMatch(
    apiIndexText,
    /function handleCaseArtifactExportPackageRefreshFamilyRoute/i,
  );
});
