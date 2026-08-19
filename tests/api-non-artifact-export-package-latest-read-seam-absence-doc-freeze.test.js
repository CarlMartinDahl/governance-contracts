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

test("docs freeze the shared apps/api non-artifact export-package latest-read seam only as an absence/prerequisite boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared Non-Artifact Export-Package Latest-Read Seam Absence\/Prerequisite Freeze[\s\S]*?(?=\n### )/,
  );

  assert.ok(
    docsSectionMatch,
    "expected shared non-artifact export-package latest-read absence docs section",
  );

  const docsSection = docsSectionMatch[0];

  assert.match(
    docsSection,
    /Shared Non-Artifact Export-Package Latest-Read Seam Absence\/Prerequisite Freeze/i,
  );
  assert.match(
    docsSection,
    /distinct shared `apps\/api` non-artifact export-package latest-read seam family is now frozen as a canonical absence\/prerequisite boundary rather than as an active shared helper seam/i,
  );
  assert.match(
    docsSection,
    /current repo state does not currently evidence a distinct shared `apps\/api` non-artifact export-package latest-read seam family beyond the already-audited shared `jsonResponse\(\.\.\.\)` response-helper seam, the already-audited thin `GET \/cases\/:caseId\/export-package\/latest` seam, the already-audited thin `GET \/cases\/:caseId\/export-package\/bundle-manifest\/latest` seam, the already-frozen broader export-package latest-read absence\/prerequisite seam, the already-frozen artifact latest-read absence\/prerequisite seam, and the already-audited individual artifact latest-read route seams/i,
  );
  assert.match(
    docsSection,
    /the only currently evidenced shared response-construction surface in this area remains the shared `jsonResponse\(status, body\)` helper in `apps\/api\/src\/index\.js`/i,
  );
  assert.match(
    docsSection,
    /no distinct shared non-artifact export-package latest-read helper or dispatcher beyond `jsonResponse\(\.\.\.\)` is currently evidenced in `apps\/api\/src\/index\.js`/i,
  );
  assert.match(
    docsSection,
    /the only currently evidenced non-artifact export-package latest-read runtime surfaces in this area remain the route-specific handlers:\s+`GET \/cases\/:caseId\/export-package\/latest`\s+`GET \/cases\/:caseId\/export-package\/bundle-manifest\/latest`/i,
  );
  assert.match(
    docsSection,
    /those two route-specific latest-read seams remain distinct because each still owns its bounded parser selection, auth\/access branch, method gate, persisted latest snapshot\/projection load, mismatch branch, and not-found branch before terminating in the shared `jsonResponse\(\.\.\.\)` helper/i,
  );
  assert.match(
    docsSection,
    /already-audited shared response-helper seam remains limited to final response shaping and must stay distinct from any future shared non-artifact export-package latest-read family/i,
  );
  assert.match(
    docsSection,
    /already-audited thin `GET \/cases\/:caseId\/export-package\/latest` seam and thin `GET \/cases\/:caseId\/export-package\/bundle-manifest\/latest` seam remain distinct route boundaries and must not be reinterpreted as proof of a broader shared non-artifact API latest-read family without explicit new contract\/runtime evidence/i,
  );
  assert.match(
    docsSection,
    /already-frozen broader export-package latest-read absence\/prerequisite seam remains separate because current repo state still does not evidence a distinct shared export-package latest-read helper\/dispatcher above or across these route-specific latest-read handlers/i,
  );
  assert.match(
    docsSection,
    /already-frozen artifact latest-read absence\/prerequisite seam remains separate because current repo state still does not evidence a distinct shared artifact latest-read helper\/dispatcher beneath these route-specific latest-read handlers/i,
  );
  assert.match(
    docsSection,
    /already-audited individual artifact latest-read route seams remain distinct route boundaries and must stay separate from one another rather than collapsing into a synthetic shared non-artifact export-package latest-read seam without explicit new contract\/runtime evidence/i,
  );
  assert.match(
    docsSection,
    /already-frozen lower database latest-reader \/ projection-helper seams remain outside this absence\/prerequisite freeze because current non-artifact export-package latest-read routes consume those lower seams separately on a route-by-route basis rather than through a shared API latest-read dispatcher/i,
  );
  assert.match(
    docsSection,
    /current bounded docs\/runtime proof surface already evidenced for this absence\/prerequisite freeze is limited to 1 docs freeze section, 1 still-separate shared `jsonResponse\(\.\.\.\)` response-helper seam, 2 still-separate non-artifact latest-read handler definitions terminating in `jsonResponse\(\.\.\.\)`, 1 still-separate broader export-package latest-read absence\/prerequisite seam, 1 still-separate artifact latest-read absence\/prerequisite seam, 0 distinct shared non-artifact export-package latest-read helper or dispatcher definitions beyond `jsonResponse\(\.\.\.\)` in `apps\/api\/src\/index\.js`, and current proof in `tests\/api-non-artifact-export-package-latest-read-seam-absence-doc-freeze\.test\.js`/i,
  );
  assert.match(
    docsSection,
    /no undocumented broadening should treat repeated route-specific `jsonResponse\(\.\.\.\)` call sites from these two non-artifact latest-read handlers as if they already prove a distinct shared `apps\/api` non-artifact export-package latest-read seam family/i,
  );
  assert.match(
    docsSection,
    /seam should remain frozen as an absence\/prerequisite boundary unless explicit shared non-artifact export-package latest-read contract detail, focused docs freeze, and runtime evidence are added/i,
  );
  assert.match(
    docsSection,
    /does not change runtime behavior, latest-read semantics, response-helper semantics, thin route semantics, broader export-package latest-read absence semantics, artifact latest-read absence semantics, auth\/access semantics, parser behavior, database behavior, API error-envelope behavior, or fail-closed behavior/i,
  );

  assert.match(
    apiIndexText,
    /function jsonResponse\(status, body\)\s*\{\s*return \{ status, body \};\s*\}/,
  );
  assert.equal((apiIndexText.match(/function jsonResponse\(/g) || []).length, 1);

  assert.match(apiIndexText, /async function handleCaseExportPackageLatestRoute\(/);
  assert.match(
    apiIndexText,
    /async function handleCaseExportPackageBundleManifestLatestRoute\(/,
  );
  assert.equal(
    (apiIndexText.match(
      /async function handleCaseExportPackage(?:BundleManifest)?LatestRoute\(/g,
    ) || []).length,
    2,
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
    /return jsonResponse\(200, exportPackageProjection\);/,
  );
  assert.match(
    apiIndexText,
    /return jsonResponse\(200, exportPackageBundleManifestSnapshot\);/,
  );

  assert.doesNotMatch(
    apiIndexText,
    /function (?:read|get|dispatch|handle)SharedNonArtifactExportPackageLatest/i,
  );
  assert.doesNotMatch(
    apiIndexText,
    /function dispatchNonArtifactExportPackageLatestRead/i,
  );
  assert.doesNotMatch(
    apiIndexText,
    /function handleCaseNonArtifactExportPackageLatestFamilyRoute/i,
  );
});
