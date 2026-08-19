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

test("docs freeze the shared apps/api non-artifact export-package route-family seam only as an absence/prerequisite boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared Non-Artifact Export-Package Route-Family Seam Absence\/Prerequisite Freeze[\s\S]*?(?=\n### )/,
  );

  assert.ok(
    docsSectionMatch,
    "expected shared non-artifact export-package route-family absence docs section",
  );

  const docsSection = docsSectionMatch[0];

  assert.match(
    docsSection,
    /Shared Non-Artifact Export-Package Route-Family Seam Absence\/Prerequisite Freeze/i,
  );
  assert.match(
    docsSection,
    /distinct shared `apps\/api` non-artifact export-package route-family seam spanning only the non-artifact latest-read and refresh routes is now frozen as a canonical absence\/prerequisite boundary rather than as an active shared helper seam/i,
  );
  assert.match(
    docsSection,
    /current repo state does not currently evidence a distinct shared `apps\/api` non-artifact export-package route-family seam beyond the already-audited shared `jsonResponse\(\.\.\.\)` \/ `errorResponse\(\.\.\.\)` response-helper seam, the already-audited shared `export refresh invalid-contract` envelope partition, the already-audited thin `GET \/cases\/:caseId\/export-package\/latest` seam, the already-audited thin `GET \/cases\/:caseId\/export-package\/bundle-manifest\/latest` seam, the already-frozen non-artifact export-package latest-read absence\/prerequisite seam, the already-frozen non-artifact export-package refresh absence\/prerequisite seam, and the already-evidenced lower database\/governance helper seams/i,
  );
  assert.match(
    docsSection,
    /only currently evidenced shared response-construction surface in this area remains the shared `jsonResponse\(status, body\)` plus `errorResponse\(status, code, details\)` helpers in `apps\/api\/src\/index\.js`/i,
  );
  assert.match(
    docsSection,
    /no distinct shared non-artifact export-package route-family helper or dispatcher is currently evidenced in `apps\/api\/src\/index\.js`/i,
  );
  assert.match(
    docsSection,
    /only currently evidenced non-artifact export-package route-family runtime surfaces in this area remain the route-specific handlers:\s+`GET \/cases\/:caseId\/export-package\/latest`\s+`GET \/cases\/:caseId\/export-package\/bundle-manifest\/latest`\s+`POST \/cases\/:caseId\/export-package\/refresh`\s+`POST \/cases\/:caseId\/export-package\/bundle-manifest\/refresh`/i,
  );
  assert.match(
    docsSection,
    /those four route-specific seams remain distinct because each still owns its bounded parser selection, auth\/access branch, method gate, route-specific prerequisite latest snapshot\/projection load, upstream mismatch or fail-closed branch behavior, and success response shaping before returning through the shared response helpers/i,
  );
  assert.match(
    docsSection,
    /already-audited shared response-helper seam remains limited to final response shaping and must stay distinct from any future shared non-artifact export-package route-family seam/i,
  );
  assert.match(
    docsSection,
    /already-audited shared `export refresh invalid-contract` API-envelope partition remains limited to narrower repeated `422` machine-readable invalid-contract behavior and must stay distinct from any future shared non-artifact export-package route-family seam/i,
  );
  assert.match(
    docsSection,
    /already-audited thin `GET \/cases\/:caseId\/export-package\/latest` seam and thin `GET \/cases\/:caseId\/export-package\/bundle-manifest\/latest` seam remain distinct route boundaries and must not be reinterpreted as proof of a broader shared non-artifact export-package route-family seam without explicit new contract\/runtime evidence/i,
  );
  assert.match(
    docsSection,
    /already-frozen non-artifact export-package latest-read absence\/prerequisite seam remains separate because current repo state still does not evidence a distinct shared non-artifact latest-read helper\/dispatcher above or across those two route-specific latest-read handlers/i,
  );
  assert.match(
    docsSection,
    /already-frozen non-artifact export-package refresh absence\/prerequisite seam remains separate because current repo state still does not evidence a distinct shared non-artifact refresh helper\/dispatcher above or across those two route-specific refresh handlers/i,
  );
  assert.match(
    docsSection,
    /already-evidenced lower database\/governance helper seams remain outside this absence\/prerequisite freeze because the current non-artifact export-package latest-read and refresh routes consume those lower seams separately on a route-by-route basis rather than through a shared API route-family dispatcher/i,
  );
  assert.match(
    docsSection,
    /current bounded docs\/runtime proof surface already evidenced for this absence\/prerequisite freeze is limited to 1 docs freeze section, 1 still-separate shared `jsonResponse\(\.\.\.\)` \/ `errorResponse\(\.\.\.\)` response-helper seam, 1 still-separate shared `export refresh invalid-contract` envelope partition, 2 still-separate non-artifact latest-read handler definitions in `apps\/api\/src\/index\.js`, 2 still-separate non-artifact refresh handler definitions in `apps\/api\/src\/index\.js`, 2 route-specific `request\.method !== "GET"` gates, 2 route-specific `request\.method !== "POST"` gates, 4 route-specific non-artifact success returns through `jsonResponse\(\.\.\.\)`, 0 distinct shared non-artifact export-package route-family helper or dispatcher definitions in `apps\/api\/src\/index\.js`, and current proof in `tests\/api-non-artifact-export-package-route-family-seam-absence-doc-freeze\.test\.js`/i,
  );
  assert.match(
    docsSection,
    /no undocumented broadening should treat repeated route-specific non-artifact handlers, repeated `request\.method !== "GET"` \/ `request\.method !== "POST"` gates, repeated route-specific `jsonResponse\(\.\.\.\)` success returns, or repeated route-specific `errorResponse\(\.\.\.\)` fail-closed branches as if they already prove a distinct shared `apps\/api` non-artifact export-package route-family seam/i,
  );
  assert.match(
    docsSection,
    /seam should remain frozen as an absence\/prerequisite boundary unless explicit shared non-artifact export-package route-family contract detail, focused docs freeze, and runtime evidence are added/i,
  );
  assert.match(
    docsSection,
    /does not change runtime behavior, latest-read semantics, refresh semantics, response-helper semantics, invalid-contract envelope semantics, thin route semantics, existing absence-boundary semantics, auth\/access semantics, parser behavior, database-helper behavior, governance-helper behavior, API error-envelope behavior, or fail-closed behavior/i,
  );

  assert.match(
    apiIndexText,
    /function jsonResponse\(status, body\)\s*\{\s*return \{ status, body \};\s*\}/,
  );
  assert.match(
    apiIndexText,
    /function errorResponse\(status, code, details = \{\}\)\s*\{\s*return jsonResponse\(status, \{\s*error: \{\s*code,/,
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

  assert.match(apiIndexText, /async function handleCaseExportPackageLatestRoute\(/);
  assert.match(
    apiIndexText,
    /async function handleCaseExportPackageBundleManifestLatestRoute\(/,
  );
  assert.match(apiIndexText, /async function handleCaseExportPackageRefreshRoute\(/);
  assert.match(
    apiIndexText,
    /async function handleCaseExportPackageBundleManifestRefreshRoute\(/,
  );

  assert.match(
    apiIndexText,
    /async function handleCaseExportPackageLatestRoute\([\s\S]*?if \(request\.method !== "GET"\) \{\s*return errorResponse\(405, "ERR_METHOD_NOT_ALLOWED"/,
  );
  assert.match(
    apiIndexText,
    /async function handleCaseExportPackageBundleManifestLatestRoute\([\s\S]*?if \(request\.method !== "GET"\) \{\s*return errorResponse\(405, "ERR_METHOD_NOT_ALLOWED"/,
  );
  assert.match(
    apiIndexText,
    /async function handleCaseExportPackageRefreshRoute\([\s\S]*?if \(request\.method !== "POST"\) \{\s*return errorResponse\(405, "ERR_METHOD_NOT_ALLOWED"/,
  );
  assert.match(
    apiIndexText,
    /async function handleCaseExportPackageBundleManifestRefreshRoute\([\s\S]*?if \(request\.method !== "POST"\) \{\s*return errorResponse\(405, "ERR_METHOD_NOT_ALLOWED"/,
  );

  assert.match(apiIndexText, /return jsonResponse\(200, exportPackageProjection\);/);
  assert.match(
    apiIndexText,
    /return jsonResponse\(200, exportPackageBundleManifestSnapshot\);/,
  );
  assert.match(apiIndexText, /return jsonResponse\(200, exportPackageSnapshot\);/);

  assert.doesNotMatch(
    apiIndexText,
    /function (?:read|get|dispatch|handle)SharedNonArtifactExportPackageRouteFamily/i,
  );
  assert.doesNotMatch(
    apiIndexText,
    /function dispatchNonArtifactExportPackageRouteFamily/i,
  );
  assert.doesNotMatch(
    apiIndexText,
    /function handleCaseNonArtifactExportPackageRouteFamilyRoute/i,
  );
});
