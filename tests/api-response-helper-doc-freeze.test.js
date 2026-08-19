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

test("docs freeze the shared API response-helper seam as the case-scoped route-response construction boundary", () => {
  assert.match(docsText, /Shared API Response-Helper Seam Freeze/i);
  assert.match(
    docsText,
    /shared `apps\/api\/src\/index\.js` `jsonResponse` \+ `artifactResponse` \+ `errorResponse` seam is the canonical case-scoped route-response construction boundary for the included route families below and is now frozen as the baseline seam/i,
  );
  assert.match(
    docsText,
    /the included case-scoped route families in this freeze are exactly:\s+`profile_inputs` read\/write\s+`release_eval` latest-read\s+`profile_dossier` read\/projection\s+`export_package` latest-read and refresh/i,
  );
  assert.match(
    docsText,
    /`export_package_bundle_manifest` latest-read and refresh\s+`export_package_bundle_archive_artifact` latest-read, refresh, and delivery\s+`export_package_json_artifact` latest-read, refresh, and delivery\s+`export_package_markdown_artifact` latest-read, refresh, and delivery\s+`export_package_pdf_artifact` latest-read, refresh, and delivery\s+`export_package_docx_artifact` latest-read, refresh, and delivery/i,
  );
  assert.match(
    docsText,
    /callers at the case-scoped route boundary for those included route families should go through the shared response-helper seam with `jsonResponse\(status, body\)` for normalized JSON responses, `artifactResponse\(status, body, headers\)` for normalized artifact\/byte responses, and `errorResponse\(status, code, details\)` for normalized machine-readable error-envelope responses rather than hand-building response objects inline/i,
  );
  assert.match(
    docsText,
    /the currently concrete shared behavior already evidenced for this response-helper seam is limited to:\s+successful `jsonResponse` returns `\{ status, body \}`\s+successful `artifactResponse` returns `\{ status, body, headers \}`\s+successful `errorResponse` returns `jsonResponse\(status, \{ error: \{ code, \.\.\.details \} \}\)`\s+repeated direct route-handler reuse of `jsonResponse` for machine-readable JSON success responses\s+repeated direct route-handler reuse of `artifactResponse` for current delivery byte\/artifact responses\s+repeated direct route-handler reuse of `errorResponse` for machine-readable route-edge and route-specific fail-closed responses/i,
  );
  assert.match(
    docsText,
    /`ERR_ROUTE_NOT_FOUND` remains outside this helper seam because it is a narrower route-edge error-envelope family that is constructed through, but is still distinct from, the shared `errorResponse` helper/i,
  );
  assert.match(
    docsText,
    /`ERR_METHOD_NOT_ALLOWED` remains outside this helper seam because it is a narrower route-edge error-envelope family that is constructed through, but is still distinct from, the shared `errorResponse` helper/i,
  );
  assert.match(
    docsText,
    /the shared `\/cases\/:caseId\/\.\.\.` parser seam remains outside this helper seam because route matching and safe case-id decoding occur before response helper selection/i,
  );
  assert.match(
    docsText,
    /the shared `loadAuthorizedCaseContext` helper remains outside this helper seam because auth\/access loading and capability gating occur before downstream response helper selection/i,
  );
  assert.match(
    docsText,
    /downstream latest-read \/ refresh \/ delivery behavior remains outside this helper seam because the shared helpers only shape final response values/i,
  );
  assert.match(
    docsText,
    /future new case-scoped API route families that need the same normalized JSON \/ artifact \/ machine-readable error response construction should extend the existing shared response-helper seam instead of introducing a parallel manual response-object stack/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, response semantics, auth\/access semantics, database behavior, API error-envelope behavior, or fail-closed behavior/i,
  );

  assert.match(apiIndexText, /function jsonResponse\(status, body\)\s*\{\s*return \{ status, body \};\s*\}/);
  assert.match(
    apiIndexText,
    /function artifactResponse\(status, body, headers = \{\}\)\s*\{\s*return \{ status, body, headers \};\s*\}/,
  );
  assert.match(
    apiIndexText,
    /function errorResponse\(status, code, details = \{\}\)\s*\{\s*return jsonResponse\(status, \{\s*error: \{\s*code,\s*\.\.\.details,\s*\},\s*\}\);\s*\}/,
  );

  assert.equal((apiIndexText.match(/function jsonResponse\(/g) || []).length, 1);
  assert.equal((apiIndexText.match(/function artifactResponse\(/g) || []).length, 1);
  assert.equal((apiIndexText.match(/function errorResponse\(/g) || []).length, 1);
  assert.equal((apiIndexText.match(/return jsonResponse\(/g) || []).length, 19);
  assert.equal((apiIndexText.match(/return artifactResponse\(/g) || []).length, 5);
  assert.equal((apiIndexText.match(/return errorResponse\(/g) || []).length, 108);

  assert.match(apiIndexText, /return jsonResponse\(200, profileInputs\);/);
  assert.match(
    apiIndexText,
    /return artifactResponse\(200, exportPackageMarkdownArtifactProjection\.body_utf8, \{/,
  );
  assert.match(apiIndexText, /return errorResponse\(404, "ERR_ROUTE_NOT_FOUND"\);/);
});
