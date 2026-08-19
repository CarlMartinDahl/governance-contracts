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

test("docs freeze the shared unsupported-profile non-artifact export-package subfamily only as an absence/prerequisite boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared `ERR_UNSUPPORTED_JURISDICTION_PROFILE` Non-Artifact Export-Package API Envelope Subfamily Absence\/Prerequisite Freeze[\s\S]*?(?=\n### )/,
  );

  assert.ok(
    docsSectionMatch,
    "expected unsupported-profile non-artifact export-package absence docs section",
  );

  const docsSection = docsSectionMatch[0];

  assert.match(
    docsSection,
    /Shared `ERR_UNSUPPORTED_JURISDICTION_PROFILE` Non-Artifact Export-Package API Envelope Subfamily Absence\/Prerequisite Freeze/i,
  );
  assert.match(
    docsSection,
    /distinct shared `ERR_UNSUPPORTED_JURISDICTION_PROFILE` non-artifact export-package API envelope subfamily spanning only the currently evidenced non-artifact export-package consumers is now frozen as a canonical absence\/prerequisite boundary rather than as an active shared helper or envelope family/i,
  );
  assert.match(
    docsSection,
    /current repo state does not currently evidence a distinct shared `ERR_UNSUPPORTED_JURISDICTION_PROFILE` non-artifact export-package API envelope subfamily beyond the already-audited broader shared unsupported jurisdiction\/profile API envelope partition, the already-audited shared `loadAuthorizedCaseContext\(\.\.\.\)` helper seam, the already-audited shared `jsonResponse\(\.\.\.\)` \/ `errorResponse\(\.\.\.\)` response-helper seam, and the already-audited four route-specific non-artifact seams/i,
  );
  assert.match(
    docsSection,
    /only currently evidenced shared unsupported-profile runtime branch in this area remains the broader helper-owned `errorResponse\(409, "ERR_UNSUPPORTED_JURISDICTION_PROFILE", \{ case_id, jurisdiction_profile_key \}\)` path inside `loadAuthorizedCaseContext\(\.\.\.\)`/i,
  );
  assert.match(
    docsSection,
    /no distinct shared unsupported-profile non-artifact export-package helper, dispatcher, or non-artifact-only envelope-family owner is currently evidenced in `apps\/api\/src\/index\.js`/i,
  );
  assert.match(
    docsSection,
    /only currently evidenced non-artifact export-package consumers relevant to this absence\/prerequisite freeze remain the route-specific seams:\s+`GET \/cases\/:caseId\/export-package\/latest`\s+`GET \/cases\/:caseId\/export-package\/bundle-manifest\/latest`\s+`POST \/cases\/:caseId\/export-package\/refresh`\s+`POST \/cases\/:caseId\/export-package\/bundle-manifest\/refresh`/i,
  );
  assert.match(
    docsSection,
    /those route-specific non-artifact seams remain distinct because each still owns its own parser call, route-entry `ERR_ROUTE_NOT_FOUND` branch, downstream `request\.method !== "GET"` or `request\.method !== "POST"` gate, downstream persisted latest-read or refresh prerequisite load, downstream upstream-jurisdiction-profile mismatch or route-specific fail-closed branch where applicable, and final route-specific response behavior rather than delegating the full non-artifact flow through a separate shared unsupported-profile non-artifact export-package family/i,
  );
  assert.match(
    docsSection,
    /already-audited broader shared unsupported jurisdiction\/profile API envelope partition remains limited to the broader repeated `ERR_UNSUPPORTED_JURISDICTION_PROFILE` branch family and must stay distinct from any future non-artifact export-package subfamily claim/i,
  );
  assert.match(
    docsSection,
    /already-audited shared `loadAuthorizedCaseContext\(\.\.\.\)` helper seam remains limited to shared auth\/access\/capability gating and must stay distinct from any future non-artifact export-package subfamily claim/i,
  );
  assert.match(
    docsSection,
    /already-audited shared `jsonResponse\(\.\.\.\)` \/ `errorResponse\(\.\.\.\)` response-helper seam remains limited to final response shaping and must stay distinct from any future non-artifact export-package subfamily claim/i,
  );
  assert.match(
    docsSection,
    /already-audited four route-specific non-artifact seams remain distinct route boundaries and must not be reinterpreted as proof of a distinct shared unsupported-profile non-artifact export-package API envelope subfamily without explicit new contract\/runtime evidence/i,
  );
  assert.match(
    docsSection,
    /current bounded docs\/runtime proof surface already evidenced for this absence\/prerequisite freeze is limited to 1 docs freeze section, 1 still-separate broader shared unsupported jurisdiction\/profile API envelope partition, 1 still-separate shared `loadAuthorizedCaseContext\(\.\.\.\)` helper seam, 1 still-separate shared `jsonResponse\(\.\.\.\)` \/ `errorResponse\(\.\.\.\)` response-helper seam, 4 still-separate named non-artifact handler definitions in `apps\/api\/src\/index\.js`, 2 still-separate route-specific `request\.method !== "GET"` gates, 2 still-separate route-specific `request\.method !== "POST"` gates, 4 still-separate route-specific success returns through `jsonResponse\(\.\.\.\)`, 0 distinct shared unsupported-profile non-artifact export-package helper or dispatcher definitions in `apps\/api\/src\/index\.js`, and current proof in `tests\/api-unsupported-profile-non-artifact-export-package-subfamily-absence-doc-freeze\.test\.js`/i,
  );
  assert.match(
    docsSection,
    /no undocumented broadening should treat repeated helper-owned `ERR_UNSUPPORTED_JURISDICTION_PROFILE` returns, repeated `errorResponse\(\.\.\.\)` shaping, repeated non-artifact export-package path naming, repeated route-specific latest-read or refresh prerequisite loads, repeated route-specific upstream mismatch branches, or repeated route-specific success returns as if they already prove a distinct shared unsupported-profile non-artifact export-package API envelope subfamily/i,
  );
  assert.match(
    docsSection,
    /this freeze records the canonical currently evidenced absence\/prerequisite boundary only and does not change runtime behavior, broader unsupported-profile partition semantics, helper semantics, response-helper semantics, route-specific non-artifact latest-read semantics, route-specific non-artifact refresh semantics, parser behavior, auth\/access behavior, database-helper behavior, API error-envelope behavior, or fail-closed behavior/i,
  );

  assert.match(
    apiIndexText,
    /errorResponse\(409,\s*"ERR_UNSUPPORTED_JURISDICTION_PROFILE",\s*\{\s*case_id:\s*caseId,\s*jurisdiction_profile_key:\s*caseContext\.jurisdiction_profile_key,\s*\}\)/,
  );

  const namedNonArtifactHandlers =
    apiIndexText.match(
      /async function handleCaseExportPackage(?:LatestRoute|BundleManifestLatestRoute|BundleManifestRefreshRoute|RefreshRoute)\(/g,
    ) || [];
  assert.equal(namedNonArtifactHandlers.length, 4);

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
      ].includes(capability),
    );
  assert.deepEqual([...new Set(broaderUnsupportedRoutes)], [
    "export_package",
    "export_package_bundle_manifest",
  ]);

  const getMethodGates =
    apiIndexText.match(/if \(request\.method !== "GET"\) \{/g) || [];
  assert.ok(getMethodGates.length >= 2);

  const postMethodGates =
    apiIndexText.match(/if \(request\.method !== "POST"\) \{/g) || [];
  assert.ok(postMethodGates.length >= 2);

  assert.doesNotMatch(
    apiIndexText,
    /function (?:dispatch|handle|get|create)SharedUnsupportedProfileNonArtifactExportPackage/i,
  );
  assert.doesNotMatch(
    apiIndexText,
    /function dispatchUnsupportedProfileNonArtifactExportPackageSubfamily/i,
  );
  assert.doesNotMatch(
    apiIndexText,
    /function handleUnsupportedProfileNonArtifactExportPackageFamily/i,
  );
});
