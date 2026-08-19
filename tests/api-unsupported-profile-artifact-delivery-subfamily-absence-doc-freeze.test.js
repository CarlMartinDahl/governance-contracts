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

test("docs freeze the shared unsupported-profile artifact-delivery-only subfamily only as an absence/prerequisite boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared `ERR_UNSUPPORTED_JURISDICTION_PROFILE` Artifact-Delivery-Only API Envelope Subfamily Absence\/Prerequisite Freeze[\s\S]*?(?=\n### )/,
  );

  assert.ok(
    docsSectionMatch,
    "expected unsupported-profile artifact-delivery-only absence docs section",
  );

  const docsSection = docsSectionMatch[0];

  assert.match(
    docsSection,
    /Shared `ERR_UNSUPPORTED_JURISDICTION_PROFILE` Artifact-Delivery-Only API Envelope Subfamily Absence\/Prerequisite Freeze/i,
  );
  assert.match(
    docsSection,
    /distinct shared `ERR_UNSUPPORTED_JURISDICTION_PROFILE` artifact-delivery-only API envelope subfamily spanning only currently evidenced artifact delivery consumers is now frozen as a canonical absence\/prerequisite boundary rather than as an active shared helper or envelope family/i,
  );
  assert.match(
    docsSection,
    /current repo state does not currently evidence a distinct shared `ERR_UNSUPPORTED_JURISDICTION_PROFILE` artifact-delivery-only API envelope subfamily beyond the already-audited broader shared unsupported jurisdiction\/profile API envelope partition, the already-audited shared `loadAuthorizedCaseContext\(\.\.\.\)` helper seam, the already-audited shared `jsonResponse\(\.\.\.\)` \/ `errorResponse\(\.\.\.\)` response-helper seam, and the already-audited individual delivery seams/i,
  );
  assert.match(
    docsSection,
    /only currently evidenced shared unsupported-profile runtime branch in this area remains the broader helper-owned `errorResponse\(409, "ERR_UNSUPPORTED_JURISDICTION_PROFILE", \{ case_id, jurisdiction_profile_key \}\)` path inside `loadAuthorizedCaseContext\(\.\.\.\)`/i,
  );
  assert.match(
    docsSection,
    /no distinct shared unsupported-profile artifact-delivery-only helper, dispatcher, or delivery-only envelope-family owner is currently evidenced in `apps\/api\/src\/index\.js`/i,
  );
  assert.match(
    docsSection,
    /only currently evidenced artifact delivery consumers relevant to this absence\/prerequisite freeze remain the route-specific seams:\s+`GET \/cases\/:caseId\/export-package\/json-artifact\/download`\s+`GET \/cases\/:caseId\/export-package\/markdown-artifact\/download`\s+`GET \/cases\/:caseId\/export-package\/bundle-archive-artifact\/download`/i,
  );
  assert.match(
    docsSection,
    /those route-specific delivery seams remain distinct because each still owns its own parser call, route-entry `ERR_ROUTE_NOT_FOUND` branch, downstream `request\.method !== "GET"` gate, downstream missing-snapshot branch, downstream current-only `snapshot_status` gate where applicable, downstream upstream-jurisdiction-profile mismatch branch, and final route-specific artifact-byte or artifact-body response behavior rather than delegating the full delivery flow through a separate shared unsupported-profile artifact-delivery-only family/i,
  );
  assert.match(
    docsSection,
    /already-audited broader shared unsupported jurisdiction\/profile API envelope partition remains limited to the broader repeated `ERR_UNSUPPORTED_JURISDICTION_PROFILE` branch family and must stay distinct from any future artifact-delivery-only subfamily claim/i,
  );
  assert.match(
    docsSection,
    /already-audited shared `loadAuthorizedCaseContext\(\.\.\.\)` helper seam remains limited to shared auth\/access\/capability gating and must stay distinct from any future artifact-delivery-only subfamily claim/i,
  );
  assert.match(
    docsSection,
    /already-audited shared `jsonResponse\(\.\.\.\)` \/ `errorResponse\(\.\.\.\)` response-helper seam remains limited to final response shaping and must stay distinct from any future artifact-delivery-only subfamily claim/i,
  );
  assert.match(
    docsSection,
    /already-audited individual delivery seams remain distinct route boundaries and must not be reinterpreted as proof of a distinct shared unsupported-profile artifact-delivery-only API envelope subfamily without explicit new contract\/runtime evidence/i,
  );
  assert.match(
    docsSection,
    /current repo state also evidences `ERR_UNSUPPORTED_JURISDICTION_PROFILE` through the already-audited `GET \/cases\/:caseId\/export-package\/pdf-artifact\/download` and `GET \/cases\/:caseId\/export-package\/docx-artifact\/download` delivery seams, so the current repo does not support treating the three-route set above as a closed distinct subfamily/i,
  );
  assert.match(
    docsSection,
    /current bounded docs\/runtime proof surface already evidenced for this absence\/prerequisite freeze is limited to 1 docs freeze section, 1 still-separate broader shared unsupported jurisdiction\/profile API envelope partition, 1 still-separate shared `loadAuthorizedCaseContext\(\.\.\.\)` helper seam, 1 still-separate shared `jsonResponse\(\.\.\.\)` \/ `errorResponse\(\.\.\.\)` response-helper seam, 3 still-separate named delivery handler definitions in `apps\/api\/src\/index\.js`, 2 still-separate additional PDF and DOCX delivery route proofs surfacing the same broader unsupported-profile envelope, 0 distinct shared unsupported-profile artifact-delivery-only helper or dispatcher definitions in `apps\/api\/src\/index\.js`, and current proof in `tests\/api-unsupported-profile-artifact-delivery-subfamily-absence-doc-freeze\.test\.js`/i,
  );
  assert.match(
    docsSection,
    /no undocumented broadening should treat repeated helper-owned `ERR_UNSUPPORTED_JURISDICTION_PROFILE` delivery returns, repeated `errorResponse\(\.\.\.\)` shaping, repeated delivery-path naming, or repeated current-only delivery route structure as if they already prove a distinct shared unsupported-profile artifact-delivery-only API envelope subfamily/i,
  );
  assert.match(
    docsSection,
    /this freeze records the canonical currently evidenced absence\/prerequisite boundary only and does not change runtime behavior, broader unsupported-profile partition semantics, helper semantics, response-helper semantics, delivery semantics, parser behavior, auth\/access behavior, database-helper behavior, API error-envelope behavior, or fail-closed behavior/i,
  );

  assert.match(
    apiIndexText,
    /errorResponse\(409,\s*"ERR_UNSUPPORTED_JURISDICTION_PROFILE",\s*\{\s*case_id:\s*caseId,\s*jurisdiction_profile_key:\s*caseContext\.jurisdiction_profile_key,\s*\}\)/,
  );

  const namedDeliveryHandlers =
    apiIndexText.match(
      /async function handleCaseExportPackage(?:BundleArchiveArtifact|MarkdownArtifact|JsonArtifact)DownloadRoute\(/g,
    ) || [];
  assert.equal(namedDeliveryHandlers.length, 3);

  const broaderUnsupportedRoutes = [
    ...apiIndexText.matchAll(
      /loadAuthorizedCaseContext\(\s*routeMatch\.caseId,\s*request\.auth,\s*options\.loadCaseContext,\s*"([^"]+)"/g,
    ),
  ]
    .map((match) => match[1])
    .filter((capability) =>
      [
        "export_package_bundle_archive_artifact",
        "export_package_markdown_artifact",
        "export_package_json_artifact",
        "export_package_pdf_artifact",
        "export_package_docx_artifact",
      ].includes(capability),
    );
  assert.deepEqual([...new Set(broaderUnsupportedRoutes)], [
    "export_package_bundle_archive_artifact",
    "export_package_docx_artifact",
    "export_package_pdf_artifact",
    "export_package_json_artifact",
    "export_package_markdown_artifact",
  ]);

  assert.doesNotMatch(
    apiIndexText,
    /function (?:dispatch|handle|get|create)SharedUnsupportedProfileArtifactDelivery/i,
  );
  assert.doesNotMatch(
    apiIndexText,
    /function dispatchUnsupportedProfileArtifactDeliverySubfamily/i,
  );
  assert.doesNotMatch(
    apiIndexText,
    /function handleUnsupportedProfileArtifactDeliveryOnlyFamily/i,
  );
});
