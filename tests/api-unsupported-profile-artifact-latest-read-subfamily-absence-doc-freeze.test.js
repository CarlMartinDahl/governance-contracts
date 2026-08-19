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

test("docs freeze the shared unsupported-profile artifact-latest-read-only subfamily only as an absence/prerequisite boundary", () => {
  const docsSectionMatch = docsText.match(
    /### Shared `ERR_UNSUPPORTED_JURISDICTION_PROFILE` Artifact-Latest-Read-Only API Envelope Subfamily Absence\/Prerequisite Freeze[\s\S]*?(?=\n### )/,
  );

  assert.ok(
    docsSectionMatch,
    "expected unsupported-profile artifact-latest-read-only absence docs section",
  );

  const docsSection = docsSectionMatch[0];

  assert.match(
    docsSection,
    /Shared `ERR_UNSUPPORTED_JURISDICTION_PROFILE` Artifact-Latest-Read-Only API Envelope Subfamily Absence\/Prerequisite Freeze/i,
  );
  assert.match(
    docsSection,
    /distinct shared `ERR_UNSUPPORTED_JURISDICTION_PROFILE` artifact-latest-read-only API envelope subfamily spanning only currently evidenced artifact latest-read consumers is now frozen as a canonical absence\/prerequisite boundary rather than as an active shared helper or envelope family/i,
  );
  assert.match(
    docsSection,
    /current repo state does not currently evidence a distinct shared `ERR_UNSUPPORTED_JURISDICTION_PROFILE` artifact-latest-read-only API envelope subfamily beyond the already-audited broader shared unsupported jurisdiction\/profile API envelope partition, the already-audited shared `loadAuthorizedCaseContext\(\.\.\.\)` helper seam, the already-audited shared `jsonResponse\(\.\.\.\)` \/ `errorResponse\(\.\.\.\)` response-helper seam, the already-audited individual artifact latest-read seams, and the blocking PDF\/DOCX latest-read evidence that prevents treating any smaller currently named set as a closed distinct subfamily/i,
  );
  assert.match(
    docsSection,
    /only currently evidenced shared unsupported-profile runtime branch in this area remains the broader helper-owned `errorResponse\(409, "ERR_UNSUPPORTED_JURISDICTION_PROFILE", \{ case_id, jurisdiction_profile_key \}\)` path inside `loadAuthorizedCaseContext\(\.\.\.\)`/i,
  );
  assert.match(
    docsSection,
    /no distinct shared unsupported-profile artifact-latest-read-only helper, dispatcher, or latest-read-only envelope-family owner is currently evidenced in `apps\/api\/src\/index\.js`/i,
  );
  assert.match(
    docsSection,
    /only currently evidenced artifact latest-read consumers relevant to this absence\/prerequisite freeze remain the route-specific seams:\s+`GET \/cases\/:caseId\/export-package\/bundle-archive-artifact\/latest`\s+`GET \/cases\/:caseId\/export-package\/json-artifact\/latest`\s+`GET \/cases\/:caseId\/export-package\/markdown-artifact\/latest`\s+`GET \/cases\/:caseId\/export-package\/pdf-artifact\/latest`\s+`GET \/cases\/:caseId\/export-package\/docx-artifact\/latest`/i,
  );
  assert.match(
    docsSection,
    /those route-specific latest-read seams remain distinct because each still owns its own parser call, route-entry `ERR_ROUTE_NOT_FOUND` branch, downstream `request\.method !== "GET"` gate, downstream snapshot-not-found branch, downstream upstream-jurisdiction-profile mismatch branch where applicable, downstream `snapshot_status` projection behavior where applicable, and final route-specific persisted artifact-projection response behavior rather than delegating the full latest-read flow through a separate shared unsupported-profile artifact-latest-read-only family/i,
  );
  assert.match(
    docsSection,
    /already-audited broader shared unsupported jurisdiction\/profile API envelope partition remains limited to the broader repeated `ERR_UNSUPPORTED_JURISDICTION_PROFILE` branch family and must stay distinct from any future artifact-latest-read-only subfamily claim/i,
  );
  assert.match(
    docsSection,
    /already-audited shared `loadAuthorizedCaseContext\(\.\.\.\)` helper seam remains limited to shared auth\/access\/capability gating and must stay distinct from any future artifact-latest-read-only subfamily claim/i,
  );
  assert.match(
    docsSection,
    /already-audited shared `jsonResponse\(\.\.\.\)` \/ `errorResponse\(\.\.\.\)` response-helper seam remains limited to final response shaping and must stay distinct from any future artifact-latest-read-only subfamily claim/i,
  );
  assert.match(
    docsSection,
    /already-audited individual artifact latest-read seams remain distinct route boundaries and must not be reinterpreted as proof of a distinct shared unsupported-profile artifact-latest-read-only API envelope subfamily without explicit new contract\/runtime evidence/i,
  );
  assert.match(
    docsSection,
    /current repo state also evidences `ERR_UNSUPPORTED_JURISDICTION_PROFILE` through the already-audited `GET \/cases\/:caseId\/export-package\/pdf-artifact\/latest` and `GET \/cases\/:caseId\/export-package\/docx-artifact\/latest` latest-read seams, so the current repo does not support treating any smaller currently named latest-read subset as a closed distinct subfamily/i,
  );
  assert.match(
    docsSection,
    /current bounded docs\/runtime proof surface already evidenced for this absence\/prerequisite freeze is limited to 1 docs freeze section, 1 still-separate broader shared unsupported jurisdiction\/profile API envelope partition, 1 still-separate shared `loadAuthorizedCaseContext\(\.\.\.\)` helper seam, 1 still-separate shared `jsonResponse\(\.\.\.\)` \/ `errorResponse\(\.\.\.\)` response-helper seam, 5 still-separate named latest-read handler definitions in `apps\/api\/src\/index\.js`, 2 still-separate additional PDF and DOCX latest-read route proofs surfacing the same broader unsupported-profile envelope, 0 distinct shared unsupported-profile artifact-latest-read-only helper or dispatcher definitions in `apps\/api\/src\/index\.js`, and current proof in `tests\/api-unsupported-profile-artifact-latest-read-subfamily-absence-doc-freeze\.test\.js`/i,
  );
  assert.match(
    docsSection,
    /no undocumented broadening should treat repeated helper-owned `ERR_UNSUPPORTED_JURISDICTION_PROFILE` latest-read returns, repeated `errorResponse\(\.\.\.\)` shaping, repeated latest-read path naming, repeated persisted latest-projection route structure, or repeated `snapshot_status` read projection behavior as if they already prove a distinct shared unsupported-profile artifact-latest-read-only API envelope subfamily/i,
  );
  assert.match(
    docsSection,
    /this freeze records the canonical currently evidenced absence\/prerequisite boundary only and does not change runtime behavior, broader unsupported-profile partition semantics, helper semantics, response-helper semantics, latest-read semantics, parser behavior, auth\/access behavior, database-helper behavior, API error-envelope behavior, or fail-closed behavior/i,
  );

  assert.match(
    apiIndexText,
    /errorResponse\(409,\s*"ERR_UNSUPPORTED_JURISDICTION_PROFILE",\s*\{\s*case_id:\s*caseId,\s*jurisdiction_profile_key:\s*caseContext\.jurisdiction_profile_key,\s*\}\)/,
  );

  const namedLatestHandlers =
    apiIndexText.match(
      /async function handleCaseExportPackage(?:BundleArchiveArtifact|DocxArtifact|PdfArtifact|JsonArtifact|MarkdownArtifact)LatestRoute\(/g,
    ) || [];
  assert.equal(namedLatestHandlers.length, 5);

  const broaderUnsupportedRoutes = [
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
  assert.deepEqual([...new Set(broaderUnsupportedRoutes)], [
    "export_package_bundle_archive_artifact",
    "export_package_docx_artifact",
    "export_package_pdf_artifact",
    "export_package_json_artifact",
    "export_package_markdown_artifact",
  ]);

  assert.doesNotMatch(
    apiIndexText,
    /function (?:dispatch|handle|get|create)SharedUnsupportedProfileArtifactLatest/i,
  );
  assert.doesNotMatch(
    apiIndexText,
    /function dispatchUnsupportedProfileArtifactLatestSubfamily/i,
  );
  assert.doesNotMatch(
    apiIndexText,
    /function handleUnsupportedProfileArtifactLatestReadOnlyFamily/i,
  );
});
