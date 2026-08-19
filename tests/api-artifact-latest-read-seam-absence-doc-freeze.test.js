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

test("docs freeze the shared apps/api artifact latest-read seam only as an absence/prerequisite boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared Artifact Latest-Read Seam Absence\/Prerequisite Freeze[\s\S]*?(?=\n### )/,
  );

  assert.ok(docsSectionMatch, "expected shared artifact latest-read absence docs section");

  const docsSection = docsSectionMatch[0];

  assert.match(
    docsSection,
    /Shared Artifact Latest-Read Seam Absence\/Prerequisite Freeze/i,
  );
  assert.match(
    docsSection,
    /distinct shared `apps\/api` artifact latest-read seam family is now frozen as a canonical absence\/prerequisite boundary rather than as an active shared helper seam/i,
  );
  assert.match(
    docsSection,
    /current repo state does not currently evidence a distinct shared `apps\/api` artifact latest-read seam family beyond the already-frozen shared `jsonResponse\(\.\.\.\)` response-helper seam plus the already-frozen individual latest-read route seams/i,
  );
  assert.match(
    docsSection,
    /only currently evidenced shared response-construction surface in this area remains the shared `jsonResponse\(status, body\)` helper in `apps\/api\/src\/index\.js`/i,
  );
  assert.match(
    docsSection,
    /no distinct shared artifact latest-read helper or dispatcher beyond `jsonResponse\(\.\.\.\)` is currently evidenced in `apps\/api\/src\/index\.js`/i,
  );
  assert.match(
    docsSection,
    /only currently evidenced latest-read runtime surfaces in this area remain the route-specific handlers:\s+`GET \/cases\/:caseId\/export-package\/bundle-archive-artifact\/latest`\s+`GET \/cases\/:caseId\/export-package\/json-artifact\/latest`\s+`GET \/cases\/:caseId\/export-package\/markdown-artifact\/latest`\s+`GET \/cases\/:caseId\/export-package\/pdf-artifact\/latest`\s+`GET \/cases\/:caseId\/export-package\/docx-artifact\/latest`/i,
  );
  assert.match(
    docsSection,
    /those route-specific latest-read seams remain distinct because each still owns its bounded parser selection, auth\/access branch, method gate, persisted latest snapshot\/projection load, mismatch branch, and not-found branch before terminating in the shared `jsonResponse\(\.\.\.\)` helper/i,
  );
  assert.match(
    docsSection,
    /already-frozen shared response-helper seam remains limited to final response shaping and must stay distinct from any future shared artifact latest-read family/i,
  );
  assert.match(
    docsSection,
    /already-frozen individual latest-read route seams remain the only currently evidenced artifact latest-read boundaries and must stay distinct from one another rather than collapsing into a synthetic parent latest-read seam without explicit new contract\/runtime evidence/i,
  );
  assert.match(
    docsSection,
    /already-frozen lower database latest-reader \/ projection-helper seams remain outside this absence\/prerequisite freeze because current latest-read routes consume those lower seams separately on a route-by-route basis rather than through a shared API latest-read dispatcher/i,
  );
  assert.match(
    docsSection,
    /current bounded docs\/runtime proof surface already evidenced for this absence\/prerequisite freeze is limited to 1 docs freeze section, 1 still-separate shared `jsonResponse\(\.\.\.\)` response-helper seam, 0 distinct shared artifact latest-read helper or dispatcher definitions beyond `jsonResponse\(\.\.\.\)` in `apps\/api\/src\/index\.js`, 5 route-specific latest-read handler definitions terminating in `jsonResponse\(\.\.\.\)`, and current proof in `tests\/api-artifact-latest-read-seam-absence-doc-freeze\.test\.js`/i,
  );
  assert.match(
    docsSection,
    /no undocumented broadening should treat repeated route-specific `jsonResponse\(\.\.\.\)` call sites from these artifact latest-read handlers as if they already prove a distinct shared `apps\/api` artifact latest-read seam family/i,
  );
  assert.match(
    docsSection,
    /seam should remain frozen as an absence\/prerequisite boundary unless explicit shared latest-read contract detail, focused docs freeze, and runtime evidence are added/i,
  );
  assert.match(
    docsSection,
    /does not change runtime behavior, latest-read semantics, response-helper semantics, auth\/access semantics, parser behavior, database behavior, API error-envelope behavior, or fail-closed behavior/i,
  );

  assert.match(
    apiIndexText,
    /function jsonResponse\(status, body\)\s*\{\s*return \{ status, body \};\s*\}/,
  );
  assert.equal((apiIndexText.match(/function jsonResponse\(/g) || []).length, 1);
  assert.equal((apiIndexText.match(/return jsonResponse\(/g) || []).length, 19);

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
    /function (?:read|get|dispatch|handle)SharedArtifactLatest/i,
  );
  assert.doesNotMatch(
    apiIndexText,
    /function dispatchArtifactLatestRead/i,
  );
  assert.doesNotMatch(
    apiIndexText,
    /function handleCaseExportPackageArtifactLatestRoute/i,
  );
});
