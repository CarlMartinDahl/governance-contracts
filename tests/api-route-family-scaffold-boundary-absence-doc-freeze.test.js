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

test("docs freeze the shared apps/api route-family scaffold boundary only as an absence/prerequisite boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared `apps\/api` Route-Family Scaffold Boundary Absence\/Prerequisite Freeze[\s\S]*?(?=\n### )/,
  );

  assert.ok(
    docsSectionMatch,
    "expected shared apps/api route-family scaffold boundary absence docs section",
  );

  const docsSection = docsSectionMatch[0];

  assert.match(
    docsSection,
    /distinct broader shared `apps\/api` route-family scaffold boundary spanning the currently evidenced case-scoped route families above the already-frozen lower absence families is now frozen as a canonical absence\/prerequisite boundary rather than as an active shared scaffold, helper, or dispatcher/i,
  );
  assert.match(
    docsSection,
    /current repo state does not currently evidence a distinct broader shared `apps\/api` route-family scaffold boundary beyond the already-audited shared `jsonResponse\(\.\.\.\)` \/ `errorResponse\(\.\.\.\)` response-helper seam, the already-audited shared `\/cases\/:caseId\/\.\.\.` parser seam, the already-frozen shared `apps\/api` auth\/access route-edge absence family, the already-frozen shared `apps\/api` route-edge failure family, the already-frozen shared non-artifact export-package route-family absence boundary, the already-frozen shared artifact export-package route-family absence boundary, and the route-specific families that remain separate above those lower seams/i,
  );
  assert.match(
    docsSection,
    /no distinct broader route-family scaffold helper, dispatcher, or boundary owner is currently evidenced in `apps\/api\/src\/index\.js`/i,
  );
  assert.match(
    docsSection,
    /only currently evidenced shared lower route-construction surfaces in this area remain the shared parser seam, the shared auth\/access helper seam, the shared response-helper seam, and the already-frozen lower absence families that explicitly keep their route-specific consumers separate/i,
  );
  assert.match(
    docsSection,
    /only currently evidenced route-specific families relevant to this absence\/prerequisite freeze remain:\s+`profile_inputs` read\/write\s+`release_eval` latest-read\s+`profile_dossier` read\/projection\s+non-artifact `export_package` latest-read and refresh\s+artifact `export_package_bundle_archive_artifact` latest-read, refresh, and delivery\s+artifact `export_package_json_artifact` latest-read, refresh, and delivery\s+artifact `export_package_markdown_artifact` latest-read, refresh, and delivery\s+artifact `export_package_pdf_artifact` latest-read, refresh, and delivery\s+artifact `export_package_docx_artifact` latest-read, refresh, and delivery/i,
  );
  assert.match(
    docsSection,
    /those lower absence families and route-specific families remain distinct because current repo state still only shows route-specific handlers composing the already-audited lower seams rather than delegating the broader route family through a separate shared scaffold\/helper\/dispatcher/i,
  );
  assert.match(
    docsSection,
    /already-audited shared `jsonResponse\(\.\.\.\)` \/ `errorResponse\(\.\.\.\)` response-helper seam remains limited to final response shaping and must stay distinct from any future broader route-family scaffold boundary claim/i,
  );
  assert.match(
    docsSection,
    /already-audited shared `\/cases\/:caseId\/\.\.\.` parser seam remains limited to parser-level match and safe case-id decode behavior and must stay distinct from any future broader route-family scaffold boundary claim/i,
  );
  assert.match(
    docsSection,
    /already-frozen shared `apps\/api` auth\/access route-edge absence family remains limited to the absence of a distinct higher auth\/access route-edge family and must stay distinct from any future broader route-family scaffold boundary claim/i,
  );
  assert.match(
    docsSection,
    /already-frozen shared `apps\/api` route-edge failure family remains limited to the absence of a distinct higher route-edge failure family and must stay distinct from any future broader route-family scaffold boundary claim/i,
  );
  assert.match(
    docsSection,
    /already-frozen shared non-artifact export-package route-family absence boundary remains limited to the absence of a distinct shared non-artifact export-package route-family seam and must stay distinct from any future broader route-family scaffold boundary claim/i,
  );
  assert.match(
    docsSection,
    /already-frozen shared artifact export-package route-family absence boundary remains limited to the absence of a distinct shared artifact export-package route-family seam and must stay distinct from any future broader route-family scaffold boundary claim/i,
  );
  assert.match(
    docsSection,
    /already-evidenced route-specific families remain distinct route boundaries and must not be reinterpreted as proof of a broader shared `apps\/api` route-family scaffold boundary without explicit new contract\/runtime evidence/i,
  );
  assert.match(
    docsSection,
    /current bounded docs\/runtime proof surface already evidenced for this absence\/prerequisite freeze is limited to 1 docs freeze section, 1 still-separate shared `jsonResponse\(\.\.\.\)` \/ `errorResponse\(\.\.\.\)` response-helper seam, 1 still-separate shared `\/cases\/:caseId\/\.\.\.` parser seam, 1 still-separate shared `apps\/api` auth\/access route-edge absence family, 1 still-separate shared `apps\/api` route-edge failure family, 1 still-separate shared non-artifact export-package route-family absence boundary, 1 still-separate shared artifact export-package route-family absence boundary, 22 route-specific handler definitions in `apps\/api\/src\/index\.js`, 0 distinct broader route-family scaffold helper or dispatcher definitions in `apps\/api\/src\/index\.js`, and current proof in `tests\/api-route-family-scaffold-boundary-absence-doc-freeze\.test\.js`/i,
  );
  assert.match(
    docsSection,
    /no undocumented broadening should treat repeated route-family naming, repeated route-specific parser use, repeated route-specific auth\/access helper use, repeated route-specific `ERR_ROUTE_NOT_FOUND` or `ERR_METHOD_NOT_ALLOWED` branches, repeated route-specific `jsonResponse\(\.\.\.\)` \/ `errorResponse\(\.\.\.\)` shaping, or repeated route-specific latest-read \/ refresh \/ delivery \/ write structure as if they already prove a distinct broader shared `apps\/api` route-family scaffold boundary/i,
  );
  assert.match(
    docsSection,
    /this freeze records the canonical currently evidenced absence\/prerequisite boundary only and does not change runtime behavior, parser semantics, response-helper semantics, auth\/access semantics, route-edge failure semantics, non-artifact export-package semantics, artifact export-package semantics, route-specific business semantics, database-helper behavior, API error-envelope behavior, or fail-closed behavior/i,
  );

  assert.match(apiIndexText, /function parseCasePath\(pathname,\s*pattern\)/);
  assert.match(apiIndexText, /async function loadAuthorizedCaseContext\(/);
  assert.match(apiIndexText, /function jsonResponse\(status, body\)/);
  assert.match(apiIndexText, /function errorResponse\(status, code, details = \{\}\)/);

  const routeHandlerMatches =
    apiIndexText.match(
      /async function handleCase(?:ProfileInputs|ReleaseEvalLatest|ProfileDossier|ExportPackage(?:BundleManifest|BundleArchiveArtifact|DocxArtifact|PdfArtifact|JsonArtifact|MarkdownArtifact)?(?:Latest|Refresh|Download)?|ExportPackageRefresh)Route\(/g,
    ) || [];
  assert.equal(routeHandlerMatches.length, 22);

  assert.doesNotMatch(
    apiIndexText,
    /function (?:dispatch|handle|get|create)SharedRouteFamilyScaffold/i,
  );
  assert.doesNotMatch(apiIndexText, /function dispatchRouteFamilyScaffold/i);
  assert.doesNotMatch(apiIndexText, /function handleCaseRouteFamilyScaffoldRoute/i);
});
