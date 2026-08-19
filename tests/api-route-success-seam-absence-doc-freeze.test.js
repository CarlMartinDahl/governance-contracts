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

test("docs freeze the shared apps/api route-success seam family only as an absence/prerequisite boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared `apps\/api` Route-Success Seam Family Absence\/Prerequisite Freeze[\s\S]*?(?=\n### )/,
  );

  assert.ok(
    docsSectionMatch,
    "expected shared apps/api route-success absence docs section",
  );

  const docsSection = docsSectionMatch[0];

  assert.match(
    docsSection,
    /distinct shared `apps\/api` route-success seam family spanning the currently evidenced route-specific latest-read, refresh, and delivery success branches is now frozen as a canonical absence\/prerequisite boundary rather than as an active shared helper seam or dispatcher/i,
  );
  assert.match(
    docsSection,
    /current repo state does not currently evidence a distinct shared `apps\/api` route-success seam family beyond the already-audited shared `jsonResponse\(\.\.\.\)` \/ `artifactResponse\(\.\.\.\)` \/ `errorResponse\(\.\.\.\)` response-helper seam, the already-audited route-specific latest-read success branches, the already-audited route-specific refresh success branches, the already-audited route-specific delivery success branches, and narrower already-frozen absence boundaries where no broader shared success family exists/i,
  );
  assert.match(
    docsSection,
    /only currently evidenced shared success response-construction surfaces in this area remain the shared `jsonResponse\(status, body\)` and `artifactResponse\(status, body, headers = \{\}\)` helpers in `apps\/api\/src\/index\.js`/i,
  );
  assert.match(
    docsSection,
    /no distinct shared route-success helper or dispatcher is currently evidenced in `apps\/api\/src\/index\.js`/i,
  );
  assert.match(
    docsSection,
    /only currently evidenced route-specific success runtime surfaces relevant to this absence\/prerequisite freeze remain the route-specific handlers:\s+`GET \/cases\/:caseId\/release-eval\/latest`\s+`GET \/cases\/:caseId\/profile-dossier`\s+`GET \/cases\/:caseId\/export-package\/latest`\s+`GET \/cases\/:caseId\/export-package\/bundle-manifest\/latest`\s+`GET \/cases\/:caseId\/export-package\/bundle-archive-artifact\/latest`\s+`GET \/cases\/:caseId\/export-package\/docx-artifact\/latest`\s+`GET \/cases\/:caseId\/export-package\/pdf-artifact\/latest`\s+`GET \/cases\/:caseId\/export-package\/json-artifact\/latest`\s+`GET \/cases\/:caseId\/export-package\/markdown-artifact\/latest`\s+`POST \/cases\/:caseId\/export-package\/bundle-archive-artifact\/refresh`\s+`POST \/cases\/:caseId\/export-package\/bundle-manifest\/refresh`\s+`POST \/cases\/:caseId\/export-package\/pdf-artifact\/refresh`\s+`POST \/cases\/:caseId\/export-package\/docx-artifact\/refresh`\s+`POST \/cases\/:caseId\/export-package\/json-artifact\/refresh`\s+`POST \/cases\/:caseId\/export-package\/markdown-artifact\/refresh`\s+`POST \/cases\/:caseId\/export-package\/refresh`\s+`GET \/cases\/:caseId\/export-package\/bundle-archive-artifact\/download`\s+`GET \/cases\/:caseId\/export-package\/json-artifact\/download`\s+`GET \/cases\/:caseId\/export-package\/markdown-artifact\/download`\s+`GET \/cases\/:caseId\/export-package\/pdf-artifact\/download`\s+`GET \/cases\/:caseId\/export-package\/docx-artifact\/download`/i,
  );
  assert.match(
    docsSection,
    /those route-specific success branches remain distinct because each still owns its bounded parser selection, auth\/access branch, method gate, route-specific prerequisite latest snapshot\/projection load or refresh derivation work, route-specific currentness or upstream-mismatch checks where applicable, and final success payload construction before returning through the shared response helpers/i,
  );
  assert.match(
    docsSection,
    /already-audited shared `jsonResponse\(\.\.\.\)` \/ `artifactResponse\(\.\.\.\)` \/ `errorResponse\(\.\.\.\)` response-helper seam remains limited to final response shaping and must stay distinct from any future shared route-success seam family/i,
  );
  assert.match(
    docsSection,
    /already-audited route-specific latest-read success branches remain distinct route boundaries and must not be reinterpreted as proof of a broader shared `apps\/api` route-success seam family without explicit new contract\/runtime evidence/i,
  );
  assert.match(
    docsSection,
    /already-audited route-specific refresh success branches remain distinct route boundaries and must not be reinterpreted as proof of a broader shared `apps\/api` route-success seam family without explicit new contract\/runtime evidence/i,
  );
  assert.match(
    docsSection,
    /already-audited route-specific delivery success branches remain distinct route boundaries and must not be reinterpreted as proof of a broader shared `apps\/api` route-success seam family without explicit new contract\/runtime evidence/i,
  );
  assert.match(
    docsSection,
    /already-frozen narrower success-adjacent absence boundaries remain separate because current repo state still does not evidence distinct shared latest-read, refresh, or delivery helper\/dispatcher layers above or across those route-specific success handlers/i,
  );
  assert.match(
    docsSection,
    /current bounded docs\/runtime proof surface already evidenced for this absence\/prerequisite freeze is limited to 1 docs freeze section, 1 still-separate shared `jsonResponse\(\.\.\.\)` \/ `artifactResponse\(\.\.\.\)` \/ `errorResponse\(\.\.\.\)` response-helper seam, 9 route-specific latest-read handler definitions in `apps\/api\/src\/index\.js`, 7 route-specific refresh handler definitions in `apps\/api\/src\/index\.js`, 5 route-specific delivery handler definitions in `apps\/api\/src\/index\.js`, 16 route-specific success returns through `jsonResponse\(\.\.\.\)`, 5 route-specific success returns through `artifactResponse\(\.\.\.\)`, 0 distinct shared route-success helper or dispatcher definitions in `apps\/api\/src\/index\.js`, and current proof in `tests\/api-route-success-seam-absence-doc-freeze\.test\.js`/i,
  );
  assert.match(
    docsSection,
    /no undocumented broadening should treat repeated route-specific `jsonResponse\(\.\.\.\)` success returns, repeated route-specific `artifactResponse\(\.\.\.\)` success returns, repeated latest-read \/ refresh \/ delivery route naming, or repeated route-specific prerequisite\/currentness\/mismatch checks as if they already prove a distinct shared `apps\/api` route-success seam family/i,
  );
  assert.match(
    docsSection,
    /seam should remain frozen as an absence\/prerequisite boundary unless explicit shared route-success contract detail, focused docs freeze, and runtime evidence are added/i,
  );
  assert.match(
    docsSection,
    /does not change runtime behavior, response-helper semantics, route-specific latest-read semantics, route-specific refresh semantics, route-specific delivery semantics, parser behavior, auth\/access behavior, error-envelope behavior, database-helper behavior, or broader runtime behavior/i,
  );

  assert.match(
    apiIndexText,
    /function jsonResponse\(status, body\)\s*\{\s*return \{ status, body \};\s*\}/,
  );
  assert.match(
    apiIndexText,
    /function artifactResponse\(status, body, headers = \{\}\)\s*\{\s*return \{ status, body, headers \};\s*\}/,
  );

  const latestRouteHandlers =
    apiIndexText.match(
      /async function handleCase(?:ReleaseEvalLatest|ProfileDossier|ExportPackageLatest|ExportPackageBundleManifestLatest|ExportPackageBundleArchiveArtifactLatest|ExportPackageDocxArtifactLatest|ExportPackagePdfArtifactLatest|ExportPackageJsonArtifactLatest|ExportPackageMarkdownArtifactLatest)Route\(/g,
    ) || [];
  assert.equal(latestRouteHandlers.length, 9);

  const refreshRouteHandlers =
    apiIndexText.match(
      /async function handleCaseExportPackage(?:BundleArchiveArtifact|BundleManifest|DocxArtifact|PdfArtifact|JsonArtifact|MarkdownArtifact)?RefreshRoute\(/g,
    ) || [];
  assert.equal(refreshRouteHandlers.length, 7);

  const deliveryRouteHandlers =
    apiIndexText.match(
      /async function handleCaseExportPackage(?:BundleArchiveArtifact|DocxArtifact|PdfArtifact|JsonArtifact|MarkdownArtifact)DownloadRoute\(/g,
    ) || [];
  assert.equal(deliveryRouteHandlers.length, 5);

  const jsonSuccessReturns =
    apiIndexText.match(
      /return jsonResponse\(200, (?:releaseEvalRun|profileDossierProjection|exportPackageProjection|exportPackageBundleManifestSnapshot|exportPackageBundleArchiveArtifactSnapshot|exportPackageDocxArtifactProjection|exportPackagePdfArtifactProjection|exportPackageJsonArtifactProjection|exportPackageMarkdownArtifactProjection|exportPackagePdfArtifactSnapshot|exportPackageDocxArtifactSnapshot|exportPackageJsonArtifactSnapshot|exportPackageMarkdownArtifactSnapshot|exportPackageSnapshot)\);/g,
    ) || [];
  assert.equal(jsonSuccessReturns.length, 16);

  const artifactSuccessReturns =
    apiIndexText.match(
      /return artifactResponse\(/g,
    ) || [];
  assert.equal(artifactSuccessReturns.length, 5);

  assert.doesNotMatch(
    apiIndexText,
    /function (?:dispatch|handle|build|create)SharedRouteSuccess/i,
  );
  assert.doesNotMatch(apiIndexText, /function dispatchRouteSuccess/i);
  assert.doesNotMatch(apiIndexText, /function handleCaseRouteSuccessFamilyRoute/i);
});
