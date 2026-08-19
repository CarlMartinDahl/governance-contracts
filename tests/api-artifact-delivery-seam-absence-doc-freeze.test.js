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

test("docs freeze the shared apps/api artifact-delivery seam only as an absence/prerequisite boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared Artifact-Delivery Seam Absence\/Prerequisite Freeze[\s\S]*?(?=\n### )/,
  );

  assert.ok(docsSectionMatch, "expected shared artifact-delivery absence docs section");

  const docsSection = docsSectionMatch[0];

  assert.match(
    docsSection,
    /Shared Artifact-Delivery Seam Absence\/Prerequisite Freeze/i,
  );
  assert.match(
    docsSection,
    /distinct shared `apps\/api` artifact-delivery seam family is now frozen as a canonical absence\/prerequisite boundary rather than as an active shared helper seam/i,
  );
  assert.match(
    docsSection,
    /current repo state does not currently evidence a distinct shared `apps\/api` artifact-delivery seam family beyond the already-frozen shared `artifactResponse\(\.\.\.\)` response-helper seam plus the already-frozen individual delivery route seams/i,
  );
  assert.match(
    docsSection,
    /only currently evidenced shared response-construction surface in this area remains the shared `artifactResponse\(status, body, headers = \{\}\)` helper in `apps\/api\/src\/index\.js`/i,
  );
  assert.match(
    docsSection,
    /no distinct shared artifact-delivery helper or dispatcher beyond `artifactResponse\(\.\.\.\)` is currently evidenced in `apps\/api\/src\/index\.js`/i,
  );
  assert.match(
    docsSection,
    /only currently evidenced delivery runtime surfaces in this area remain the route-specific handlers:\s+`GET \/cases\/:caseId\/export-package\/bundle-archive-artifact\/download`\s+`GET \/cases\/:caseId\/export-package\/json-artifact\/download`\s+`GET \/cases\/:caseId\/export-package\/markdown-artifact\/download`\s+`GET \/cases\/:caseId\/export-package\/pdf-artifact\/download`\s+`GET \/cases\/:caseId\/export-package\/docx-artifact\/download`/i,
  );
  assert.match(
    docsSection,
    /those route-specific delivery seams remain distinct because each still owns its bounded parser selection, auth\/access branch, method gate, current-only check, mismatch branch, and not-found branch before terminating in the shared `artifactResponse\(\.\.\.\)` helper/i,
  );
  assert.match(
    docsSection,
    /already-frozen shared response-helper seam remains limited to final response shaping and must stay distinct from any future shared artifact-delivery family/i,
  );
  assert.match(
    docsSection,
    /already-frozen individual delivery route seams remain the only currently evidenced delivery boundaries and must stay distinct from one another rather than collapsing into a synthetic parent delivery seam without explicit new contract\/runtime evidence/i,
  );
  assert.match(
    docsSection,
    /already-frozen lower database latest-reader \/ projection-helper seams remain outside this absence\/prerequisite freeze because current delivery routes consume those lower seams separately on a route-by-route basis rather than through a shared API delivery dispatcher/i,
  );
  assert.match(
    docsSection,
    /current bounded docs\/runtime proof surface already evidenced for this absence\/prerequisite freeze is limited to 1 docs freeze section, 1 still-separate shared `artifactResponse\(\.\.\.\)` response-helper seam, 0 distinct shared artifact-delivery helper or dispatcher definitions beyond `artifactResponse\(\.\.\.\)` in `apps\/api\/src\/index\.js`, 5 route-specific delivery handler definitions terminating in `artifactResponse\(\.\.\.\)`, and current proof in `tests\/api-artifact-delivery-seam-absence-doc-freeze\.test\.js`/i,
  );
  assert.match(
    docsSection,
    /no undocumented broadening should treat repeated route-specific `artifactResponse\(\.\.\.\)` call sites as if they already prove a distinct shared `apps\/api` artifact-delivery seam family/i,
  );
  assert.match(
    docsSection,
    /seam should remain frozen as an absence\/prerequisite boundary unless explicit shared delivery contract detail, focused docs freeze, and runtime evidence are added/i,
  );
  assert.match(
    docsSection,
    /does not change runtime behavior, delivery semantics, response-helper semantics, auth\/access semantics, parser behavior, database behavior, API error-envelope behavior, or fail-closed behavior/i,
  );

  assert.match(
    apiIndexText,
    /function artifactResponse\(status, body, headers = \{\}\)\s*\{\s*return \{ status, body, headers \};\s*\}/,
  );
  assert.equal((apiIndexText.match(/function artifactResponse\(/g) || []).length, 1);
  assert.equal((apiIndexText.match(/return artifactResponse\(/g) || []).length, 5);

  assert.match(
    apiIndexText,
    /async function handleCaseExportPackageBundleArchiveArtifactDownloadRoute\(/,
  );
  assert.match(
    apiIndexText,
    /async function handleCaseExportPackageJsonArtifactDownloadRoute\(/,
  );
  assert.match(
    apiIndexText,
    /async function handleCaseExportPackageMarkdownArtifactDownloadRoute\(/,
  );
  assert.match(
    apiIndexText,
    /async function handleCaseExportPackagePdfArtifactDownloadRoute\(/,
  );
  assert.match(
    apiIndexText,
    /async function handleCaseExportPackageDocxArtifactDownloadRoute\(/,
  );

  assert.match(
    apiIndexText,
    /return artifactResponse\(\s*200,\s*Buffer\.from\(exportPackageBundleArchiveArtifactProjection\.body_base64, "base64"\),/,
  );
  assert.match(
    apiIndexText,
    /return artifactResponse\(200, exportPackageJsonArtifactProjection\.body_utf8, \{/,
  );
  assert.match(
    apiIndexText,
    /return artifactResponse\(200, exportPackageMarkdownArtifactProjection\.body_utf8, \{/,
  );
  assert.match(
    apiIndexText,
    /return artifactResponse\(\s*200,\s*Buffer\.from\(exportPackagePdfArtifactProjection\.body_base64, "base64"\),/,
  );
  assert.match(
    apiIndexText,
    /return artifactResponse\(\s*200,\s*Buffer\.from\(exportPackageDocxArtifactProjection\.body_base64, "base64"\),/,
  );

  assert.doesNotMatch(
    apiIndexText,
    /function (?:deliver|build|dispatch|handle)SharedArtifact/i,
  );
  assert.doesNotMatch(
    apiIndexText,
    /function dispatchArtifactDelivery/i,
  );
  assert.doesNotMatch(
    apiIndexText,
    /function handleCaseExportPackageArtifactDownloadRoute/i,
  );
});
