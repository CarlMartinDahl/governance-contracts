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
const databaseIndexText = fs.readFileSync(
  path.join(__dirname, "..", "packages", "database", "src", "index.js"),
  "utf8",
);

test("docs freeze the thin authenticated release-eval refresh route seam as an absence/prerequisite boundary only", () => {
  const docsSectionMatch = docsText.match(
    /### Thin Authenticated Release-Eval Refresh Route Absence\/Prerequisite Freeze[\s\S]*?(?=\nThe current dossier snapshot foundation is limited to|\n### )/,
  );
  const latestRouteSlice = apiIndexText.slice(
    apiIndexText.indexOf("async function handleCaseReleaseEvalLatestRoute("),
    apiIndexText.indexOf("async function handleCaseProfileDossierRoute("),
  );
  const exportSlice = apiIndexText.slice(
    apiIndexText.indexOf("module.exports = {"),
  );

  assert.ok(docsSectionMatch, "expected release-eval refresh route absence docs section");
  assert.notEqual(
    apiIndexText.indexOf("async function handleCaseReleaseEvalLatestRoute("),
    -1,
    "expected latest route handler",
  );
  assert.notEqual(
    apiIndexText.indexOf("async function handleCaseProfileDossierRoute("),
    -1,
    "expected next route handler boundary",
  );
  assert.notEqual(
    apiIndexText.indexOf("module.exports = {"),
    -1,
    "expected API export scaffold",
  );

  const docsSection = docsSectionMatch[0];

  assert.match(
    docsSection,
    /Thin Authenticated Release-Eval Refresh Route Absence\/Prerequisite Freeze/i,
  );
  assert.match(
    docsSection,
    /thin authenticated `release_eval` refresh route seam is now frozen as a canonical absence\/prerequisite boundary rather than as an active route seam/i,
  );
  assert.match(
    docsSection,
    /current repo state does not currently evidence a thin authenticated `POST \/cases\/:caseId\/release-eval\/refresh` route in `apps\/api\/src\/index\.js`/i,
  );
  assert.match(
    docsSection,
    /only currently evidenced thin authenticated `release_eval` route surface in this area remains `GET \/cases\/:caseId\/release-eval\/latest`/i,
  );
  assert.match(
    docsSection,
    /no `handleCaseReleaseEvalRefreshRoute` handler definition is currently evidenced in `apps\/api\/src\/index\.js`/i,
  );
  assert.match(
    docsSection,
    /no thin authenticated `POST \/cases\/:caseId\/release-eval\/refresh` route registration\/export surface is currently evidenced in `apps\/api\/src\/index\.js`/i,
  );
  assert.match(
    docsSection,
    /adjacent existing lower boundary already evidenced for future refresh behavior is the shared database `refreshCaseReleaseEvalRun\(caseId, releaseEvalSeed, options = \{\}\)` seam/i,
  );
  assert.match(
    docsSection,
    /already-frozen thin authenticated `GET \/cases\/:caseId\/release-eval\/latest` seam is limited to latest-read remaining the only currently evidenced thin authenticated `release_eval` route boundary in `apps\/api\/src\/index\.js`, while refresh must remain a distinct future route seam rather than collapsing into latest-read/i,
  );
  assert.match(
    docsSection,
    /adjacent thin authenticated `GET \/cases\/:caseId\/profile-inputs` read seam remains a distinct route boundary/i,
  );
  assert.match(
    docsSection,
    /adjacent thin authenticated `PATCH \/cases\/:caseId\/profile-inputs` write seam remains a distinct route boundary/i,
  );
  assert.match(
    docsSection,
    /adjacent thin authenticated `GET \/cases\/:caseId\/profile-dossier` read\/projection seam remains a distinct route boundary/i,
  );
  assert.match(
    docsSection,
    /current bounded docs\/runtime proof surface already evidenced for this absence\/prerequisite freeze is limited to 1 docs freeze section, 0 `handleCaseReleaseEvalRefreshRoute` handler definitions in `apps\/api\/src\/index\.js`, 0 `POST \/cases\/:caseId\/release-eval\/refresh` route registrations\/exports in `apps\/api\/src\/index\.js`, 1 still-separate `GET \/cases\/:caseId\/release-eval\/latest` route seam, 1 still-separate shared database `refreshCaseReleaseEvalRun\(caseId, releaseEvalSeed, options = \{\}\)` seam, and current proof in `tests\/governance-release-eval-refresh-route-absence-doc-freeze\.test\.js`/i,
  );
  assert.match(
    docsSection,
    /shared governance release-eval derivation \/ adapter seams remain outside this absence\/prerequisite freeze/i,
  );
  assert.match(
    docsSection,
    /does not change runtime behavior, route availability, persistence semantics, schema behavior, or fail-closed behavior/i,
  );

  assert.match(
    latestRouteSlice,
    /async function handleCaseReleaseEvalLatestRoute\(\s*request,\s*options = \{\}\s*\)\s*\{/,
  );
  assert.match(latestRouteSlice, /if \(request\.method !== "GET"\)/);
  assert.match(latestRouteSlice, /getLatestCaseReleaseEvalRun\(/);
  assert.doesNotMatch(apiIndexText, /async function handleCaseReleaseEvalRefreshRoute\(/);
  assert.doesNotMatch(apiIndexText, /POST \/cases\/:caseId\/release-eval\/refresh/);
  assert.doesNotMatch(apiIndexText, /parseCaseReleaseEvalRefreshPath\(/);
  assert.doesNotMatch(exportSlice, /\bhandleCaseReleaseEvalRefreshRoute\b/);

  assert.match(
    databaseIndexText,
    /async function refreshCaseReleaseEvalRun\(caseId, releaseEvalSeed, options = \{\}\)\s*\{/,
  );
  assert.match(
    databaseIndexText,
    /module\.exports = \{[\s\S]*refreshCaseReleaseEvalRun,[\s\S]*\}/,
  );
});
