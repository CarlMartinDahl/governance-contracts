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

test("docs freeze the shared apps/api export-package refresh seam only as an absence/prerequisite boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared Export-Package Refresh Seam Absence\/Prerequisite Freeze[\s\S]*?(?=\n### )/,
  );

  assert.ok(
    docsSectionMatch,
    "expected shared export-package refresh absence docs section",
  );

  const docsSection = docsSectionMatch[0];

  assert.match(
    docsSection,
    /Shared Export-Package Refresh Seam Absence\/Prerequisite Freeze/i,
  );
  assert.match(
    docsSection,
    /distinct shared `apps\/api` export-package refresh seam family is now frozen as a canonical absence\/prerequisite boundary rather than as an active shared helper seam/i,
  );
  assert.match(
    docsSection,
    /current repo state does not currently evidence a distinct shared `apps\/api` export-package refresh seam family beyond the already-audited shared `jsonResponse\(\.\.\.\)` \/ `errorResponse\(\.\.\.\)` response-helper seam, the already-audited shared `export refresh invalid-contract` envelope partition, the already-evidenced lower refresh-helper seams, and the already-evidenced route-specific refresh seams/i,
  );
  assert.match(
    docsSection,
    /only currently evidenced shared response-construction surface in this area remains the shared `jsonResponse\(status, body\)` plus `errorResponse\(status, code, details\)` helpers in `apps\/api\/src\/index\.js`/i,
  );
  assert.match(
    docsSection,
    /no distinct shared export-package refresh helper or dispatcher is currently evidenced in `apps\/api\/src\/index\.js`/i,
  );
  assert.match(
    docsSection,
    /only currently evidenced export-package refresh runtime surfaces in this area remain the route-specific handlers:\s+`POST \/cases\/:caseId\/export-package\/refresh`\s+`POST \/cases\/:caseId\/export-package\/bundle-manifest\/refresh`\s+`POST \/cases\/:caseId\/export-package\/bundle-archive-artifact\/refresh`\s+`POST \/cases\/:caseId\/export-package\/json-artifact\/refresh`\s+`POST \/cases\/:caseId\/export-package\/markdown-artifact\/refresh`\s+`POST \/cases\/:caseId\/export-package\/pdf-artifact\/refresh`\s+`POST \/cases\/:caseId\/export-package\/docx-artifact\/refresh`/i,
  );
  assert.match(
    docsSection,
    /those route-specific refresh seams remain distinct because each still owns its bounded parser selection, auth\/access branch, method gate, prerequisite latest snapshot\/read lookup where applicable, upstream mismatch branch, route-level fail-closed error mapping, and success response shaping before returning through the shared response helpers/i,
  );
  assert.match(
    docsSection,
    /already-audited shared response-helper seam remains limited to final response shaping and must stay distinct from any future shared export-package refresh family/i,
  );
  assert.match(
    docsSection,
    /already-audited shared `export refresh invalid-contract` API-envelope partition remains limited to narrower repeated `422` machine-readable invalid-contract behavior and must stay distinct from any future shared export-package refresh family/i,
  );
  assert.match(
    docsSection,
    /already-evidenced lower refresh-helper seams remain outside this absence\/prerequisite freeze because current export-package refresh routes consume those lower seams separately on a route-by-route basis rather than through a shared API refresh dispatcher/i,
  );
  assert.match(
    docsSection,
    /already-evidenced route-specific refresh seams remain the only currently evidenced API refresh boundaries in this area and must stay distinct from one another rather than collapsing into a synthetic shared export-package refresh seam without explicit new contract\/runtime evidence/i,
  );
  assert.match(
    docsSection,
    /current bounded docs\/runtime proof surface already evidenced for this absence\/prerequisite freeze is limited to 1 docs freeze section, 1 still-separate shared `jsonResponse\(\.\.\.\)` \/ `errorResponse\(\.\.\.\)` response-helper seam, 1 still-separate shared `export refresh invalid-contract` envelope partition, 7 route-specific refresh handler definitions in `apps\/api\/src\/index\.js`, 7 route-specific `request\.method !== "POST"` gates, 7 route-specific refresh success returns through `jsonResponse\(\.\.\.\)`, 0 distinct shared export-package refresh helper or dispatcher definitions in `apps\/api\/src\/index\.js`, and current proof in `tests\/api-export-package-refresh-seam-absence-doc-freeze\.test\.js`/i,
  );
  assert.match(
    docsSection,
    /no undocumented broadening should treat repeated route-specific refresh handlers, repeated `request\.method !== "POST"` gates, repeated route-specific `jsonResponse\(\.\.\.\)` success returns, or repeated route-specific `errorResponse\(\.\.\.\)` fail-closed branches as if they already prove a distinct shared `apps\/api` export-package refresh seam family/i,
  );
  assert.match(
    docsSection,
    /seam should remain frozen as an absence\/prerequisite boundary unless explicit shared export-package refresh contract detail, focused docs freeze, and runtime evidence are added/i,
  );
  assert.match(
    docsSection,
    /does not change runtime behavior, refresh semantics, response-helper semantics, invalid-contract envelope semantics, route-specific refresh semantics, auth\/access semantics, parser behavior, database-helper behavior, API error-envelope behavior, or fail-closed behavior/i,
  );

  assert.match(
    apiIndexText,
    /function jsonResponse\(status, body\)\s*\{\s*return \{ status, body \};\s*\}/,
  );
  assert.match(
    apiIndexText,
    /function errorResponse\(status, code, details = \{\}\)\s*\{\s*return jsonResponse\(status, \{\s*error: \{\s*code,/,
  );

  assert.match(
    apiIndexText,
    /async function handleCaseExportPackageBundleArchiveArtifactRefreshRoute\(/,
  );
  assert.match(
    apiIndexText,
    /async function handleCaseExportPackageBundleManifestRefreshRoute\(/,
  );
  assert.match(
    apiIndexText,
    /async function handleCaseExportPackagePdfArtifactRefreshRoute\(/,
  );
  assert.match(
    apiIndexText,
    /async function handleCaseExportPackageDocxArtifactRefreshRoute\(/,
  );
  assert.match(
    apiIndexText,
    /async function handleCaseExportPackageJsonArtifactRefreshRoute\(/,
  );
  assert.match(
    apiIndexText,
    /async function handleCaseExportPackageMarkdownArtifactRefreshRoute\(/,
  );
  assert.match(
    apiIndexText,
    /async function handleCaseExportPackageRefreshRoute\(/,
  );

  assert.equal((apiIndexText.match(/request\.method !== "POST"/g) || []).length, 7);

  assert.match(
    apiIndexText,
    /return jsonResponse\(200, exportPackageBundleArchiveArtifactSnapshot\);/,
  );
  assert.match(
    apiIndexText,
    /return jsonResponse\(200, exportPackageBundleManifestSnapshot\);/,
  );
  assert.match(
    apiIndexText,
    /return jsonResponse\(200, exportPackagePdfArtifactSnapshot\);/,
  );
  assert.match(
    apiIndexText,
    /return jsonResponse\(200, exportPackageDocxArtifactSnapshot\);/,
  );
  assert.match(
    apiIndexText,
    /return jsonResponse\(200, exportPackageJsonArtifactSnapshot\);/,
  );
  assert.match(
    apiIndexText,
    /return jsonResponse\(200, exportPackageMarkdownArtifactSnapshot\);/,
  );
  assert.match(
    apiIndexText,
    /return jsonResponse\(200, exportPackageSnapshot\);/,
  );

  assert.doesNotMatch(
    apiIndexText,
    /function (?:dispatch|refresh|handle)SharedExportPackageRefresh/i,
  );
  assert.doesNotMatch(apiIndexText, /function dispatchExportPackageRefresh/i);
  assert.doesNotMatch(
    apiIndexText,
    /function handleCaseExportPackageRefreshFamilyRoute/i,
  );
});
