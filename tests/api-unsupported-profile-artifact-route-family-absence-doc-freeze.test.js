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

test("docs freeze the shared unsupported-profile artifact-route-family subfamily only as an absence/prerequisite boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared `ERR_UNSUPPORTED_JURISDICTION_PROFILE` Artifact-Route-Family API Envelope Subfamily Absence\/Prerequisite Freeze[\s\S]*?(?=\n### )/,
  );

  assert.ok(
    docsSectionMatch,
    "expected unsupported-profile artifact-route-family absence docs section",
  );

  const docsSection = docsSectionMatch[0];

  assert.match(
    docsSection,
    /Shared `ERR_UNSUPPORTED_JURISDICTION_PROFILE` Artifact-Route-Family API Envelope Subfamily Absence\/Prerequisite Freeze/i,
  );
  assert.match(
    docsSection,
    /distinct shared `ERR_UNSUPPORTED_JURISDICTION_PROFILE` artifact-route-family API envelope subfamily spanning the full currently evidenced artifact latest-read, refresh, and delivery consumers is now frozen as a canonical absence\/prerequisite boundary rather than as an active shared helper, dispatcher, or envelope family/i,
  );
  assert.match(
    docsSection,
    /current repo state does not currently evidence a distinct shared `ERR_UNSUPPORTED_JURISDICTION_PROFILE` artifact-route-family API envelope subfamily beyond the already-audited broader shared unsupported jurisdiction\/profile API envelope partition, the already-audited shared `loadAuthorizedCaseContext\(\.\.\.\)` helper seam, the already-audited shared `jsonResponse\(\.\.\.\)` \/ `errorResponse\(\.\.\.\)` response-helper seam, the already-audited individual artifact latest-read seams, the already-audited individual artifact refresh seams, the already-audited individual artifact delivery seams, the already-frozen unsupported-profile artifact latest-read-only absence boundary, the already-frozen unsupported-profile artifact refresh-only absence boundary, and the already-frozen unsupported-profile artifact delivery-only absence boundary/i,
  );
  assert.match(
    docsSection,
    /only currently evidenced shared unsupported-profile runtime branch in this area remains the broader helper-owned `errorResponse\(409, "ERR_UNSUPPORTED_JURISDICTION_PROFILE", \{ case_id, jurisdiction_profile_key \}\)` path inside `loadAuthorizedCaseContext\(\.\.\.\)`/i,
  );
  assert.match(
    docsSection,
    /no distinct shared unsupported-profile artifact-route-family helper, dispatcher, or route-family envelope-family owner is currently evidenced in `apps\/api\/src\/index\.js`/i,
  );
  assert.match(
    docsSection,
    /only currently evidenced artifact route consumers relevant to this absence\/prerequisite freeze remain the route-specific seams:\s+`GET \/cases\/:caseId\/export-package\/bundle-archive-artifact\/latest`\s+`POST \/cases\/:caseId\/export-package\/bundle-archive-artifact\/refresh`\s+`GET \/cases\/:caseId\/export-package\/bundle-archive-artifact\/download`\s+`GET \/cases\/:caseId\/export-package\/json-artifact\/latest`\s+`POST \/cases\/:caseId\/export-package\/json-artifact\/refresh`\s+`GET \/cases\/:caseId\/export-package\/json-artifact\/download`\s+`GET \/cases\/:caseId\/export-package\/markdown-artifact\/latest`\s+`POST \/cases\/:caseId\/export-package\/markdown-artifact\/refresh`\s+`GET \/cases\/:caseId\/export-package\/markdown-artifact\/download`\s+`GET \/cases\/:caseId\/export-package\/pdf-artifact\/latest`\s+`POST \/cases\/:caseId\/export-package\/pdf-artifact\/refresh`\s+`GET \/cases\/:caseId\/export-package\/pdf-artifact\/download`\s+`GET \/cases\/:caseId\/export-package\/docx-artifact\/latest`\s+`POST \/cases\/:caseId\/export-package\/docx-artifact\/refresh`\s+`GET \/cases\/:caseId\/export-package\/docx-artifact\/download`/i,
  );
  assert.match(
    docsSection,
    /already-audited broader shared unsupported jurisdiction\/profile API envelope partition remains limited to the broader repeated `ERR_UNSUPPORTED_JURISDICTION_PROFILE` branch family and must stay distinct from any future artifact-route-family subfamily claim/i,
  );
  assert.match(
    docsSection,
    /already-audited shared `loadAuthorizedCaseContext\(\.\.\.\)` helper seam remains limited to shared auth\/access\/capability gating and must stay distinct from any future artifact-route-family subfamily claim/i,
  );
  assert.match(
    docsSection,
    /already-audited shared `jsonResponse\(\.\.\.\)` \/ `errorResponse\(\.\.\.\)` response-helper seam remains limited to final response shaping and must stay distinct from any future artifact-route-family subfamily claim/i,
  );
  assert.match(
    docsSection,
    /already-audited individual artifact latest-read seams, individual artifact refresh seams, and individual artifact delivery seams remain distinct route boundaries and must not be reinterpreted as proof of a distinct shared unsupported-profile artifact-route-family API envelope subfamily without explicit new contract\/runtime evidence/i,
  );
  assert.match(
    docsSection,
    /already-frozen unsupported-profile artifact latest-read-only absence boundary remains separate because current repo state still does not evidence a distinct shared latest-read-only unsupported-profile helper\/dispatcher above or across the five artifact latest-read handlers/i,
  );
  assert.match(
    docsSection,
    /already-frozen unsupported-profile artifact refresh-only absence boundary remains separate because current repo state still does not evidence a distinct shared refresh-only unsupported-profile helper\/dispatcher above or across the five artifact refresh handlers/i,
  );
  assert.match(
    docsSection,
    /already-frozen unsupported-profile artifact delivery-only absence boundary remains separate because current repo state still does not evidence a distinct shared delivery-only unsupported-profile helper\/dispatcher above or across the five artifact delivery handlers/i,
  );
  assert.match(
    docsSection,
    /current bounded docs\/runtime proof surface already evidenced for this absence\/prerequisite freeze is limited to 1 docs freeze section, 1 still-separate broader shared unsupported jurisdiction\/profile API envelope partition, 1 still-separate shared `loadAuthorizedCaseContext\(\.\.\.\)` helper seam, 1 still-separate shared `jsonResponse\(\.\.\.\)` \/ `errorResponse\(\.\.\.\)` response-helper seam, 3 still-separate unsupported-profile artifact-only absence boundaries, 15 still-separate named artifact latest-read \/ refresh \/ delivery handler definitions in `apps\/api\/src\/index\.js`, 15 still-separate route-specific `loadAuthorizedCaseContext\(\.\.\.\)` artifact handler call sites in `apps\/api\/src\/index\.js`, 0 distinct shared unsupported-profile artifact-route-family helper or dispatcher definitions in `apps\/api\/src\/index\.js`, and current proof in `tests\/api-unsupported-profile-artifact-route-family-absence-doc-freeze\.test\.js`/i,
  );
  assert.match(
    docsSection,
    /no undocumented broadening should treat repeated helper-owned `ERR_UNSUPPORTED_JURISDICTION_PROFILE` returns, repeated `errorResponse\(\.\.\.\)` shaping, repeated artifact path naming, repeated route-specific latest-read \/ refresh \/ delivery structure, or repeated artifact handler capability naming as if they already prove a distinct shared unsupported-profile artifact-route-family API envelope subfamily/i,
  );
  assert.match(
    docsSection,
    /this freeze records the canonical currently evidenced absence\/prerequisite boundary only and does not change runtime behavior, broader unsupported-profile partition semantics, helper semantics, response-helper semantics, latest-read semantics, refresh semantics, delivery semantics, parser behavior, auth\/access behavior, database-helper behavior, API error-envelope behavior, or fail-closed behavior/i,
  );

  assert.match(
    apiIndexText,
    /errorResponse\(409,\s*"ERR_UNSUPPORTED_JURISDICTION_PROFILE",\s*\{\s*case_id:\s*caseId,\s*jurisdiction_profile_key:\s*caseContext\.jurisdiction_profile_key,\s*\}\)/,
  );

  const namedArtifactHandlers =
    apiIndexText.match(
      /async function handleCaseExportPackage(?:BundleArchiveArtifact|DocxArtifact|PdfArtifact|JsonArtifact|MarkdownArtifact)(?:Latest|Refresh|Download)Route\(/g,
    ) || [];
  assert.equal(namedArtifactHandlers.length, 15);

  const broaderUnsupportedArtifactRoutes = [
    ...apiIndexText.matchAll(
      /loadAuthorizedCaseContext\(\s*routeMatch\.caseId,\s*request\.auth,\s*options\.loadCaseContext,\s*"([^"]+)"/g,
    ),
  ]
    .map((match) => match[1])
    .filter((capability) =>
      [
        "export_package_bundle_archive_artifact",
        "export_package_docx_artifact",
        "export_package_pdf_artifact",
        "export_package_json_artifact",
        "export_package_markdown_artifact",
      ].includes(capability),
    );
  assert.equal(broaderUnsupportedArtifactRoutes.length, 15);
  assert.deepEqual([...new Set(broaderUnsupportedArtifactRoutes)], [
    "export_package_bundle_archive_artifact",
    "export_package_docx_artifact",
    "export_package_pdf_artifact",
    "export_package_json_artifact",
    "export_package_markdown_artifact",
  ]);

  assert.doesNotMatch(
    apiIndexText,
    /function (?:dispatch|handle|get|create)SharedUnsupportedProfileArtifactRouteFamily/i,
  );
  assert.doesNotMatch(
    apiIndexText,
    /function dispatchUnsupportedProfileArtifactRouteFamily/i,
  );
  assert.doesNotMatch(
    apiIndexText,
    /function handleUnsupportedProfileArtifactRouteFamily/i,
  );
});
