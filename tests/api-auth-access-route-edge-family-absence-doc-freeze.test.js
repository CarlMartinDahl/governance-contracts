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

test("docs freeze the shared apps/api auth/access route-edge family only as an absence/prerequisite boundary", () => {
  assert.match(
    docsText,
    /### Shared `apps\/api` Auth\/Access Route-Edge Seam Family Absence\/Prerequisite Freeze[\s\S]*?(?=\n### )/,
  );
  assert.match(
    docsText,
    /distinct shared `apps\/api` auth\/access route-edge seam family spanning the currently evidenced case-scoped route consumers above the already-audited lower auth\/access seams is now frozen as a canonical absence\/prerequisite boundary rather than as an active shared helper seam or dispatcher/i,
  );
  assert.match(
    docsText,
    /current repo state does not currently evidence a distinct shared `apps\/api` auth\/access route-edge seam family beyond the already-audited shared `loadAuthorizedCaseContext\(\.\.\.\)` helper seam, the already-audited shared `ERR_UNAUTHENTICATED` API envelope partition\/prerequisites, the already-audited shared `ERR_CASE_ACCESS_DENIED` API envelope partition\/prerequisites, the adjacent helper-owned `ERR_UNSUPPORTED_JURISDICTION_PROFILE` branch where already evidenced, and the route-specific consumers that remain separate above those lower seams/i,
  );
  assert.match(
    docsText,
    /only currently evidenced shared auth\/access runtime branch owner in this area remains `loadAuthorizedCaseContext\(\.\.\.\)`, which returns either `\{ caseContext \}` on success or helper-owned machine-readable `ERR_UNAUTHENTICATED`, `ERR_CASE_ACCESS_DENIED`, or adjacent helper-owned `ERR_UNSUPPORTED_JURISDICTION_PROFILE` responses/i,
  );
  assert.match(
    docsText,
    /no distinct shared auth\/access route-edge helper or dispatcher above `loadAuthorizedCaseContext\(\.\.\.\)` is currently evidenced in `apps\/api\/src\/index\.js`/i,
  );
  assert.match(
    docsText,
    /the only currently evidenced route-specific consumers relevant to this absence\/prerequisite freeze remain:\s+`GET \/cases\/:caseId\/profile-inputs`\s+`PATCH \/cases\/:caseId\/profile-inputs`\s+`GET \/cases\/:caseId\/release-eval\/latest`\s+`GET \/cases\/:caseId\/profile-dossier`\s+`GET \/cases\/:caseId\/export-package\/latest`\s+`POST \/cases\/:caseId\/export-package\/refresh`\s+`GET \/cases\/:caseId\/export-package\/bundle-manifest\/latest`\s+`POST \/cases\/:caseId\/export-package\/bundle-manifest\/refresh`/i,
  );
  assert.match(
    docsText,
    /`GET \/cases\/:caseId\/export-package\/bundle-archive-artifact\/latest`\s+`POST \/cases\/:caseId\/export-package\/bundle-archive-artifact\/refresh`\s+`GET \/cases\/:caseId\/export-package\/bundle-archive-artifact\/download`\s+`GET \/cases\/:caseId\/export-package\/json-artifact\/latest`\s+`POST \/cases\/:caseId\/export-package\/json-artifact\/refresh`\s+`GET \/cases\/:caseId\/export-package\/json-artifact\/download`\s+`GET \/cases\/:caseId\/export-package\/markdown-artifact\/latest`\s+`POST \/cases\/:caseId\/export-package\/markdown-artifact\/refresh`\s+`GET \/cases\/:caseId\/export-package\/markdown-artifact\/download`\s+`GET \/cases\/:caseId\/export-package\/pdf-artifact\/latest`\s+`POST \/cases\/:caseId\/export-package\/pdf-artifact\/refresh`\s+`GET \/cases\/:caseId\/export-package\/pdf-artifact\/download`\s+`GET \/cases\/:caseId\/export-package\/docx-artifact\/latest`\s+`POST \/cases\/:caseId\/export-package\/docx-artifact\/refresh`\s+`GET \/cases\/:caseId\/export-package\/docx-artifact\/download`/i,
  );
  assert.match(
    docsText,
    /those route-specific consumers remain distinct because each still owns its own parser call, route-entry `ERR_ROUTE_NOT_FOUND` branch, downstream method gate, and route-specific latest-read, refresh, delivery, or write business behavior after the shared auth\/access helper returns, rather than delegating the full route edge through a separate shared auth\/access route-edge family helper or dispatcher/i,
  );
  assert.match(
    docsText,
    /already-audited shared `loadAuthorizedCaseContext\(\.\.\.\)` helper seam remains limited to shared auth\/access\/capability gating and must stay distinct from any future higher auth\/access route-edge family claim/i,
  );
  assert.match(
    docsText,
    /already-audited shared `ERR_UNAUTHENTICATED` API envelope partition remains limited to the repeated helper-owned `401` branch family and must stay distinct from any future higher auth\/access route-edge family claim/i,
  );
  assert.match(
    docsText,
    /already-audited shared `ERR_CASE_ACCESS_DENIED` API envelope partition remains limited to the repeated helper-owned `403` branch family and must stay distinct from any future higher auth\/access route-edge family claim/i,
  );
  assert.match(
    docsText,
    /adjacent helper-owned `ERR_UNSUPPORTED_JURISDICTION_PROFILE` branch where already evidenced remains a separate capability\/unsupported-profile envelope surface and must not be reinterpreted as proof of a broader shared auth\/access route-edge family without explicit new contract\/runtime evidence/i,
  );
  assert.match(
    docsText,
    /22 still-separate route-specific `loadAuthorizedCaseContext\(\.\.\.\)` consumer call sites in `apps\/api\/src\/index\.js`/i,
  );
  assert.match(
    docsText,
    /0 distinct shared auth\/access route-edge helper or dispatcher definitions above `loadAuthorizedCaseContext\(\.\.\.\)` in `apps\/api\/src\/index\.js`/i,
  );
  assert.match(
    docsText,
    /no undocumented broadening should treat repeated `loadAuthorizedCaseContext\(\.\.\.\)` call sites, repeated helper-owned `ERR_UNAUTHENTICATED` returns, repeated helper-owned `ERR_CASE_ACCESS_DENIED` returns, repeated adjacent helper-owned `ERR_UNSUPPORTED_JURISDICTION_PROFILE` returns, repeated route family naming, or repeated downstream route-specific business structure as if they already prove a distinct shared `apps\/api` auth\/access route-edge seam family/i,
  );
  assert.match(
    docsText,
    /this freeze records the canonical currently evidenced absence\/prerequisite boundary only and does not change runtime behavior, helper semantics, unauthenticated partition semantics, case-access-denied partition semantics, unsupported-profile semantics, parser semantics, response-helper semantics, route-specific business semantics, database-helper behavior, API error-envelope behavior, or fail-closed behavior/i,
  );

  assert.match(
    apiIndexText,
    /async function loadAuthorizedCaseContext\(\s*[\s\S]*?caseId,\s*[\s\S]*?auth,\s*[\s\S]*?loadCaseContext,\s*[\s\S]*?requiredCapability,\s*\)/,
  );
  assert.match(apiIndexText, /errorResponse\(401,\s*"ERR_UNAUTHENTICATED"\)/);
  assert.match(
    apiIndexText,
    /errorResponse\(403,\s*"ERR_CASE_ACCESS_DENIED",\s*\{\s*case_id:\s*caseId,\s*\}\)/,
  );
  assert.match(
    apiIndexText,
    /errorResponse\(409,\s*"ERR_UNSUPPORTED_JURISDICTION_PROFILE",\s*\{\s*case_id:\s*caseId,\s*jurisdiction_profile_key:\s*caseContext\.jurisdiction_profile_key,\s*\}\)/,
  );

  const helperCallCapabilities = [
    ...apiIndexText.matchAll(
      /loadAuthorizedCaseContext\(\s*routeMatch\.caseId,\s*request\.auth,\s*options\.loadCaseContext,\s*"([^"]+)"/g,
    ),
  ].map((match) => match[1]);

  assert.equal(helperCallCapabilities.length, 22);
  assert.deepEqual([...new Set(helperCallCapabilities)], [
    "profile_inputs",
    "release_eval",
    "profile_dossier",
    "export_package",
    "export_package_bundle_manifest",
    "export_package_bundle_archive_artifact",
    "export_package_docx_artifact",
    "export_package_pdf_artifact",
    "export_package_json_artifact",
    "export_package_markdown_artifact",
  ]);
});
