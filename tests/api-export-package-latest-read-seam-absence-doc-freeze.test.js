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

test("docs freeze the shared apps/api export-package latest-read seam only as an absence/prerequisite boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared Export-Package Latest-Read Seam Absence\/Prerequisite Freeze[\s\S]*?(?=\n### )/,
  );

  assert.ok(
    docsSectionMatch,
    "expected shared export-package latest-read absence docs section",
  );

  const docsSection = docsSectionMatch[0];

  assert.match(
    docsSection,
    /Shared Export-Package Latest-Read Seam Absence\/Prerequisite Freeze/i,
  );
  assert.match(
    docsSection,
    /distinct shared `apps\/api` export-package latest-read seam family is now frozen as a canonical absence\/prerequisite boundary rather than as an active shared helper seam/i,
  );
  assert.match(
    docsSection,
    /current repo state does not currently evidence a distinct shared `apps\/api` export-package latest-read seam family beyond the already-frozen shared `jsonResponse\(\.\.\.\)` response-helper seam, the already-audited thin `GET \/cases\/:caseId\/export-package\/latest` seam, the already-audited thin `GET \/cases\/:caseId\/export-package\/bundle-manifest\/latest` seam, the already-frozen shared artifact latest-read absence\/prerequisite seam, and the already-audited individual artifact latest-read route seams/i,
  );
  assert.match(
    docsSection,
    /only currently evidenced shared response-construction surface in this area remains the shared `jsonResponse\(status, body\)` helper in `apps\/api\/src\/index\.js`/i,
  );
  assert.match(
    docsSection,
    /no distinct shared export-package latest-read helper or dispatcher beyond `jsonResponse\(\.\.\.\)` is currently evidenced in `apps\/api\/src\/index\.js`/i,
  );
  assert.match(
    docsSection,
    /only currently evidenced export-package latest-read runtime surfaces in this area remain the route-specific handlers:\s+`GET \/cases\/:caseId\/export-package\/latest`\s+`GET \/cases\/:caseId\/export-package\/bundle-manifest\/latest`\s+`GET \/cases\/:caseId\/export-package\/bundle-archive-artifact\/latest`\s+`GET \/cases\/:caseId\/export-package\/json-artifact\/latest`\s+`GET \/cases\/:caseId\/export-package\/markdown-artifact\/latest`\s+`GET \/cases\/:caseId\/export-package\/pdf-artifact\/latest`\s+`GET \/cases\/:caseId\/export-package\/docx-artifact\/latest`/i,
  );
  assert.match(
    docsSection,
    /those route-specific latest-read seams remain distinct because each still owns its bounded parser selection, auth\/access branch, method gate, persisted latest snapshot\/projection load, mismatch branch, and not-found branch before terminating in the shared `jsonResponse\(\.\.\.\)` helper/i,
  );
  assert.match(
    docsSection,
    /already-frozen shared response-helper seam remains limited to final response shaping and must stay distinct from any future shared export-package latest-read family/i,
  );
  assert.match(
    docsSection,
    /already-audited thin `GET \/cases\/:caseId\/export-package\/latest` seam and thin `GET \/cases\/:caseId\/export-package\/bundle-manifest\/latest` seam remain distinct route boundaries and must not be reinterpreted as proof of a broader shared API latest-read family without explicit new contract\/runtime evidence/i,
  );
  assert.match(
    docsSection,
    /already-frozen shared artifact latest-read absence\/prerequisite seam remains separate because current repo state still does not evidence a distinct shared artifact latest-read helper\/dispatcher beneath these route-specific latest-read handlers/i,
  );
  assert.match(
    docsSection,
    /already-audited individual artifact latest-read route seams remain distinct route boundaries and must stay separate from one another rather than collapsing into a synthetic parent export-package latest-read seam without explicit new contract\/runtime evidence/i,
  );
  assert.match(
    docsSection,
    /already-frozen lower database latest-reader \/ projection-helper seams remain outside this absence\/prerequisite freeze because current export-package latest-read routes consume those lower seams separately on a route-by-route basis rather than through a shared API latest-read dispatcher/i,
  );
  assert.match(
    docsSection,
    /current bounded docs\/runtime proof surface already evidenced for this absence\/prerequisite freeze is limited to 1 docs freeze section, 1 still-separate shared `jsonResponse\(\.\.\.\)` response-helper seam, 2 still-separate non-artifact latest-read handler definitions terminating in `jsonResponse\(\.\.\.\)`, 1 still-separate shared artifact latest-read absence\/prerequisite seam, 5 still-separate artifact latest-read handler definitions terminating in `jsonResponse\(\.\.\.\)`, 0 distinct shared export-package latest-read helper or dispatcher definitions beyond `jsonResponse\(\.\.\.\)` in `apps\/api\/src\/index\.js`, and current proof in `tests\/api-export-package-latest-read-seam-absence-doc-freeze\.test\.js`/i,
  );
  assert.match(
    docsSection,
    /no undocumented broadening should treat repeated route-specific `jsonResponse\(\.\.\.\)` call sites from these export-package latest-read handlers as if they already prove a distinct shared `apps\/api` export-package latest-read seam family/i,
  );
  assert.match(
    docsSection,
    /seam should remain frozen as an absence\/prerequisite boundary unless explicit shared export-package latest-read contract detail, focused docs freeze, and runtime evidence are added/i,
  );
  assert.match(
    docsSection,
    /does not change runtime behavior, latest-read semantics, response-helper semantics, thin route semantics, artifact latest-read absence semantics, auth\/access semantics, parser behavior, database behavior, API error-envelope behavior, or fail-closed behavior/i,
  );

  assert.match(
    apiIndexText,
    /function jsonResponse\(status, body\)\s*\{\s*return \{ status, body \};\s*\}/,
  );
  assert.equal((apiIndexText.match(/function jsonResponse\(/g) || []).length, 1);
  assert.equal((apiIndexText.match(/return jsonResponse\(/g) || []).length, 19);

  assert.match(apiIndexText, /async function handleCaseExportPackageLatestRoute\(/);
  assert.match(
    apiIndexText,
    /async function handleCaseExportPackageBundleManifestLatestRoute\(/,
  );
  assert.match(
    apiIndexText,
    /async function handleCaseExportPackageBundleArchiveArtifactLatestRoute\(/,
  );
  assert.match(
    apiIndexText,
    /async function handleCaseExportPackageDocxArtifactLatestRoute\(/,
  );
  assert.match(
    apiIndexText,
    /async function handleCaseExportPackagePdfArtifactLatestRoute\(/,
  );
  assert.match(
    apiIndexText,
    /async function handleCaseExportPackageJsonArtifactLatestRoute\(/,
  );
  assert.match(
    apiIndexText,
    /async function handleCaseExportPackageMarkdownArtifactLatestRoute\(/,
  );

  assert.match(
    apiIndexText,
    /return jsonResponse\(200, exportPackageProjection\);/,
  );
  assert.match(
    apiIndexText,
    /return jsonResponse\(200, exportPackageBundleManifestSnapshot\);/,
  );
  assert.match(
    apiIndexText,
    /return jsonResponse\(200, exportPackageBundleArchiveArtifactSnapshot\);/,
  );
  assert.match(
    apiIndexText,
    /return jsonResponse\(200, exportPackageDocxArtifactProjection\);/,
  );
  assert.match(
    apiIndexText,
    /return jsonResponse\(200, exportPackagePdfArtifactProjection\);/,
  );
  assert.match(
    apiIndexText,
    /return jsonResponse\(200, exportPackageJsonArtifactProjection\);/,
  );
  assert.match(
    apiIndexText,
    /return jsonResponse\(200, exportPackageMarkdownArtifactProjection\);/,
  );

  assert.doesNotMatch(
    apiIndexText,
    /function (?:read|get|dispatch|handle)SharedExportPackageLatest/i,
  );
  assert.doesNotMatch(
    apiIndexText,
    /function dispatchExportPackageLatestRead/i,
  );
  assert.doesNotMatch(
    apiIndexText,
    /function handleCaseExportPackageLatestFamilyRoute/i,
  );
});
