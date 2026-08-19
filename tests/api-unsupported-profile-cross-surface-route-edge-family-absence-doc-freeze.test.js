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

test("docs freeze the shared unsupported-profile cross-surface route-edge family only as an absence/prerequisite boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared `ERR_UNSUPPORTED_JURISDICTION_PROFILE` Cross-Surface Route-Edge API Envelope Family Absence\/Prerequisite Freeze[\s\S]*?(?=\n### )/,
  );

  assert.ok(
    docsSectionMatch,
    "expected unsupported-profile cross-surface route-edge absence docs section",
  );

  const docsSection = docsSectionMatch[0];

  assert.match(
    docsSection,
    /Shared `ERR_UNSUPPORTED_JURISDICTION_PROFILE` Cross-Surface Route-Edge API Envelope Family Absence\/Prerequisite Freeze/i,
  );
  assert.match(
    docsSection,
    /distinct shared `ERR_UNSUPPORTED_JURISDICTION_PROFILE` cross-surface route-edge API envelope family spanning both the already-frozen non-artifact export-package unsupported-profile boundary and the already-frozen artifact-route-family unsupported-profile boundary is now frozen as a canonical absence\/prerequisite boundary rather than as an active shared helper, dispatcher, or envelope family/i,
  );
  assert.match(
    docsSection,
    /current repo state does not currently evidence a distinct shared `ERR_UNSUPPORTED_JURISDICTION_PROFILE` cross-surface route-edge API envelope family beyond the already-audited broader shared unsupported jurisdiction\/profile API envelope partition, the already-audited shared `loadAuthorizedCaseContext\(\.\.\.\)` helper seam, the already-audited shared `jsonResponse\(\.\.\.\)` \/ `errorResponse\(\.\.\.\)` response-helper seam, the already-frozen non-artifact export-package unsupported-profile absence boundary, the already-frozen artifact-route-family unsupported-profile absence boundary, the already-frozen unsupported-profile artifact latest-read-only absence boundary, the already-frozen unsupported-profile artifact refresh-only absence boundary, the already-frozen unsupported-profile artifact delivery-only absence boundary, and the already-audited individual non-artifact and artifact route seams/i,
  );
  assert.match(
    docsSection,
    /only currently evidenced shared unsupported-profile runtime branch in this area remains the broader helper-owned `errorResponse\(409, "ERR_UNSUPPORTED_JURISDICTION_PROFILE", \{ case_id, jurisdiction_profile_key \}\)` path inside `loadAuthorizedCaseContext\(\.\.\.\)`/i,
  );
  assert.match(
    docsSection,
    /no distinct shared cross-surface unsupported-profile helper, dispatcher, or cross-surface route-edge envelope-family owner is currently evidenced in `apps\/api\/src\/index\.js`/i,
  );
  assert.match(
    docsSection,
    /non-artifact export-package unsupported-profile route family and the artifact unsupported-profile route family must remain explicitly separate in current repo state rather than being reinterpreted as one combined cross-surface route-edge family/i,
  );
  assert.match(
    docsSection,
    /only currently evidenced non-artifact export-package consumers relevant to this absence\/prerequisite freeze remain the route-specific seams:\s+`GET \/cases\/:caseId\/export-package\/latest`\s+`GET \/cases\/:caseId\/export-package\/bundle-manifest\/latest`\s+`POST \/cases\/:caseId\/export-package\/refresh`\s+`POST \/cases\/:caseId\/export-package\/bundle-manifest\/refresh`/i,
  );
  assert.match(
    docsSection,
    /only currently evidenced artifact consumers relevant to this absence\/prerequisite freeze remain the route-specific seams:\s+`GET \/cases\/:caseId\/export-package\/bundle-archive-artifact\/latest`\s+`POST \/cases\/:caseId\/export-package\/bundle-archive-artifact\/refresh`\s+`GET \/cases\/:caseId\/export-package\/bundle-archive-artifact\/download`\s+`GET \/cases\/:caseId\/export-package\/json-artifact\/latest`\s+`POST \/cases\/:caseId\/export-package\/json-artifact\/refresh`\s+`GET \/cases\/:caseId\/export-package\/json-artifact\/download`\s+`GET \/cases\/:caseId\/export-package\/markdown-artifact\/latest`\s+`POST \/cases\/:caseId\/export-package\/markdown-artifact\/refresh`\s+`GET \/cases\/:caseId\/export-package\/markdown-artifact\/download`\s+`GET \/cases\/:caseId\/export-package\/pdf-artifact\/latest`\s+`POST \/cases\/:caseId\/export-package\/pdf-artifact\/refresh`\s+`GET \/cases\/:caseId\/export-package\/pdf-artifact\/download`\s+`GET \/cases\/:caseId\/export-package\/docx-artifact\/latest`\s+`POST \/cases\/:caseId\/export-package\/docx-artifact\/refresh`\s+`GET \/cases\/:caseId\/export-package\/docx-artifact\/download`/i,
  );
  assert.match(
    docsSection,
    /already-audited broader shared unsupported jurisdiction\/profile API envelope partition remains limited to the broader repeated `ERR_UNSUPPORTED_JURISDICTION_PROFILE` branch family and must stay distinct from any future cross-surface route-edge family claim/i,
  );
  assert.match(
    docsSection,
    /already-audited shared `loadAuthorizedCaseContext\(\.\.\.\)` helper seam remains limited to shared auth\/access\/capability gating and must stay distinct from any future cross-surface route-edge family claim/i,
  );
  assert.match(
    docsSection,
    /already-audited shared `jsonResponse\(\.\.\.\)` \/ `errorResponse\(\.\.\.\)` response-helper seam remains limited to final response shaping and must stay distinct from any future cross-surface route-edge family claim/i,
  );
  assert.match(
    docsSection,
    /already-frozen non-artifact export-package unsupported-profile absence boundary remains separate because current repo state still does not evidence a distinct shared cross-surface unsupported-profile helper\/dispatcher above or across the four non-artifact handlers plus the 15 artifact handlers/i,
  );
  assert.match(
    docsSection,
    /already-frozen artifact-route-family unsupported-profile absence boundary remains separate because current repo state still does not evidence a distinct shared cross-surface unsupported-profile helper\/dispatcher above or across those same non-artifact and artifact handlers/i,
  );
  assert.match(
    docsSection,
    /already-frozen unsupported-profile artifact latest-read-only, refresh-only, and delivery-only absence boundaries remain separate because current repo state still does not evidence any distinct shared higher cross-surface unsupported-profile helper\/dispatcher above or across those narrower artifact-only handler groupings/i,
  );
  assert.match(
    docsSection,
    /already-audited individual non-artifact and artifact route seams remain distinct route boundaries and must not be reinterpreted as proof of a distinct shared unsupported-profile cross-surface route-edge API envelope family without explicit new contract\/runtime evidence/i,
  );
  assert.match(
    docsSection,
    /current bounded docs\/runtime proof surface already evidenced for this absence\/prerequisite freeze is limited to 1 docs freeze section, 1 still-separate broader shared unsupported jurisdiction\/profile API envelope partition, 1 still-separate shared `loadAuthorizedCaseContext\(\.\.\.\)` helper seam, 1 still-separate shared `jsonResponse\(\.\.\.\)` \/ `errorResponse\(\.\.\.\)` response-helper seam, 1 still-separate non-artifact export-package unsupported-profile absence boundary, 1 still-separate unsupported-profile artifact-route-family absence boundary, 3 still-separate unsupported-profile artifact-only absence boundaries, 19 still-separate named non-artifact and artifact handler definitions in `apps\/api\/src\/index\.js`, 19 still-separate route-specific `loadAuthorizedCaseContext\(\.\.\.\)` non-artifact and artifact handler call sites in `apps\/api\/src\/index\.js`, 0 distinct shared cross-surface unsupported-profile helper or dispatcher definitions in `apps\/api\/src\/index\.js`, and current proof in `tests\/api-unsupported-profile-cross-surface-route-edge-family-absence-doc-freeze\.test\.js`/i,
  );
  assert.match(
    docsSection,
    /no undocumented broadening should treat repeated helper-owned `ERR_UNSUPPORTED_JURISDICTION_PROFILE` returns, repeated `errorResponse\(\.\.\.\)` shaping, repeated non-artifact and artifact path naming, repeated route-specific non-artifact latest-read or refresh prerequisite loads, repeated route-specific artifact latest-read \/ refresh \/ delivery structure, or repeated handler capability naming as if they already prove a distinct shared unsupported-profile cross-surface route-edge API envelope family/i,
  );
  assert.match(
    docsSection,
    /this freeze records the canonical currently evidenced absence\/prerequisite boundary only and does not change runtime behavior, broader unsupported-profile partition semantics, helper semantics, response-helper semantics, route-specific non-artifact semantics, route-specific artifact semantics, parser behavior, auth\/access behavior, database-helper behavior, API error-envelope behavior, or fail-closed behavior/i,
  );

  assert.match(
    apiIndexText,
    /errorResponse\(409,\s*"ERR_UNSUPPORTED_JURISDICTION_PROFILE",\s*\{\s*case_id:\s*caseId,\s*jurisdiction_profile_key:\s*caseContext\.jurisdiction_profile_key,\s*\}\)/,
  );

  const namedCombinedHandlers =
    apiIndexText.match(
      /async function handleCaseExportPackage(?:LatestRoute|BundleManifestLatestRoute|BundleManifestRefreshRoute|RefreshRoute|BundleArchiveArtifactLatestRoute|BundleArchiveArtifactRefreshRoute|BundleArchiveArtifactDownloadRoute|DocxArtifactLatestRoute|DocxArtifactRefreshRoute|DocxArtifactDownloadRoute|PdfArtifactLatestRoute|PdfArtifactRefreshRoute|PdfArtifactDownloadRoute|JsonArtifactLatestRoute|JsonArtifactRefreshRoute|JsonArtifactDownloadRoute|MarkdownArtifactLatestRoute|MarkdownArtifactRefreshRoute|MarkdownArtifactDownloadRoute)\(/g,
    ) || [];
  assert.equal(namedCombinedHandlers.length, 19);

  const broaderUnsupportedRoutes = [
    ...apiIndexText.matchAll(
      /loadAuthorizedCaseContext\(\s*routeMatch\.caseId,\s*request\.auth,\s*options\.loadCaseContext,\s*"([^"]+)"/g,
    ),
  ]
    .map((match) => match[1])
    .filter((capability) =>
      [
        "export_package",
        "export_package_bundle_manifest",
        "export_package_bundle_archive_artifact",
        "export_package_docx_artifact",
        "export_package_pdf_artifact",
        "export_package_json_artifact",
        "export_package_markdown_artifact",
      ].includes(capability),
    );
  assert.equal(broaderUnsupportedRoutes.length, 19);
  assert.deepEqual([...new Set(broaderUnsupportedRoutes)], [
    "export_package",
    "export_package_bundle_manifest",
    "export_package_bundle_archive_artifact",
    "export_package_docx_artifact",
    "export_package_pdf_artifact",
    "export_package_json_artifact",
    "export_package_markdown_artifact",
  ]);

  assert.doesNotMatch(
    apiIndexText,
    /function (?:dispatch|handle|get|create)SharedUnsupportedProfileCrossSurface/i,
  );
  assert.doesNotMatch(
    apiIndexText,
    /function dispatchUnsupportedProfileCrossSurfaceRouteEdgeFamily/i,
  );
  assert.doesNotMatch(
    apiIndexText,
    /function handleUnsupportedProfileCrossSurfaceRouteEdgeFamily/i,
  );
});
