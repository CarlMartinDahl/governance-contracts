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

test("docs freeze the shared loadAuthorizedCaseContext helper seam as the case-scoped API auth/access boundary", () => {
  assert.match(docsText, /Shared `loadAuthorizedCaseContext` Helper Seam Freeze/i);
  assert.match(
    docsText,
    /shared `apps\/api\/src\/index\.js` `loadAuthorizedCaseContext` helper is the canonical case-scoped API auth\/access boundary for the included route families below and is now frozen as the baseline seam/i,
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
    /callers at the case-scoped API boundary for those included route families should go through the shared `loadAuthorizedCaseContext` seam with `routeMatch\.caseId`, `request\.auth`, `options\.loadCaseContext`, and the route-required capability rather than reimplementing tenant\/access\/profile gating inline/i,
  );
  assert.match(
    docsText,
    /the currently concrete shared behavior already evidenced for this helper seam is limited to:\s+successful authorized case-context load through `await loadCaseContext\(caseId\)` followed by `\{ caseContext \}` on success\s+machine-readable `ERR_UNAUTHENTICATED`\s+machine-readable `ERR_CASE_ACCESS_DENIED` with existing `case_id` detail\s+machine-readable `ERR_UNSUPPORTED_JURISDICTION_PROFILE` with existing `case_id` and `jurisdiction_profile_key` detail/i,
  );
  assert.match(
    docsText,
    /route-entry `ERR_ROUTE_NOT_FOUND` remains outside this helper seam because path parsing completes before the shared helper is invoked/i,
  );
  assert.match(
    docsText,
    /route-edge `ERR_METHOD_NOT_ALLOWED` remains outside this helper seam because method gating is still performed by downstream route handlers after the shared helper returns/i,
  );
  assert.match(
    docsText,
    /downstream `resource\/snapshot not found`, downstream `snapshot not current`, and downstream latest-read \/ refresh \/ delivery behavior remain outside this helper seam/i,
  );
  assert.match(
    docsText,
    /future new case-scoped API route families that need the same authorized case-context load \/ auth \/ access \/ capability gating should extend the existing shared helper seam instead of introducing a parallel helper stack/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, auth\/access semantics, database behavior, API error-envelope behavior, or fail-closed behavior/i,
  );

  assert.match(
    apiIndexText,
    /async function loadAuthorizedCaseContext\(\s*[\s\S]*?caseId,\s*[\s\S]*?auth,\s*[\s\S]*?loadCaseContext,\s*[\s\S]*?requiredCapability,\s*\)/,
  );
  assert.match(apiIndexText, /const caseContext = await loadCaseContext\(caseId\);/);
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
