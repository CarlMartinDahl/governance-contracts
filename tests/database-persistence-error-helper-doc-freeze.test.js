const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const docsText = fs.readFileSync(
  path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md"),
  "utf8",
);
const databaseIndexText = fs.readFileSync(
  path.join(__dirname, "..", "packages", "database", "src", "index.js"),
  "utf8",
);
const profileInputPersistenceText = fs.readFileSync(
  path.join(__dirname, "profile-input-persistence.test.js"),
  "utf8",
);
const bundleArchivePersistenceText = fs.readFileSync(
  path.join(__dirname, "export-package-bundle-archive-artifact-persistence.test.js"),
  "utf8",
);

test("docs freeze the shared createPersistenceError helper seam as the machine-readable persistence error boundary", () => {
  assert.match(
    docsText,
    /Shared Database Persistence-Error Helper Seam Freeze/i,
  );
  assert.match(
    docsText,
    /shared `packages\/database\/src\/index\.js` `createPersistenceError` helper is the canonical machine-readable persistence error-construction boundary for the current case-level persistence families below and is now frozen as the baseline seam/i,
  );
  assert.match(
    docsText,
    /the currently evidenced case-level persistence families in this freeze are limited to:\s+`profile_input` persistence\s+`release_eval` persistence and persisted dossier\/projection reads where applicable\s+`export_package` persistence\/read helpers/i,
  );
  assert.match(
    docsText,
    /`export_package_json_artifact` persistence\/read helpers\s+`export_package_markdown_artifact` persistence\/read helpers\s+`export_package_pdf_artifact` persistence\/read helpers\s+`export_package_docx_artifact` persistence\/read helpers\s+`export_package_bundle_manifest` persistence\/read helpers\s+`export_package_bundle_archive_artifact` persistence\/read helpers/i,
  );
  assert.match(
    docsText,
    /callers at the persistence boundary for those included families should go through the shared `createPersistenceError\(code, message, details\)` seam for machine-readable persistence errors rather than hand-mutating `Error` instances inline/i,
  );
  assert.match(
    docsText,
    /the currently concrete shared behavior already evidenced for this helper seam is limited to:\s+constructing an `Error` instance\s+attaching machine-readable `error\.code`\s+attaching machine-readable `error\.details`\s+repeated helper reuse for invalid case-id persistence rejections such as `ERR_CASE_ID_INVALID`\s+repeated helper reuse for persistence-boundary invalid payload and unsupported-profile rejections where existing tests already prove `error\.code` and `error\.details`/i,
  );
  assert.match(
    docsText,
    /the shared API response-helper seam remains outside this helper seam because API response construction is performed in `apps\/api\/src\/index\.js` after persistence results are returned or thrown/i,
  );
  assert.match(
    docsText,
    /the shared `\/cases\/:caseId\/\.\.\.` parser seam remains outside this helper seam because path parsing occurs before any persistence boundary is reached/i,
  );
  assert.match(
    docsText,
    /the shared `loadAuthorizedCaseContext` helper remains outside this helper seam because auth\/access loading and capability gating occur before persistence helper selection/i,
  );
  assert.match(
    docsText,
    /route-edge API error-envelope families remain outside this helper seam because they are API-surface envelopes rather than database-layer thrown errors/i,
  );
  assert.match(
    docsText,
    /broader storage helpers such as `resolveStoragePath`, `readStore`, and `writeStore` remain outside this helper seam because they centralize filesystem\/path I\/O rather than machine-readable persistence error construction/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, persistence semantics, filesystem behavior, API behavior, or fail-closed behavior/i,
  );

  assert.match(
    databaseIndexText,
    /function createPersistenceError\(code, message, details = \{\}\)\s*\{\s*const error = new Error\(message\);\s*error\.code = code;\s*error\.details = details;\s*return error;\s*\}/,
  );
  assert.equal(
    (databaseIndexText.match(/function createPersistenceError\(/g) || []).length,
    1,
  );

  const createPersistenceErrorUses =
    (databaseIndexText.match(/createPersistenceError\(/g) || []).length - 1;
  assert.ok(createPersistenceErrorUses > 20);
  assert.match(
    databaseIndexText,
    /throw createPersistenceError\("ERR_CASE_ID_INVALID", "caseId must be a non-empty string"\);/,
  );

  assert.match(
    profileInputPersistenceText,
    /assert\.equal\(error\.code, "ERR_PROFILE_INPUT_INVALID"\);[\s\S]*assert\.equal\(\s*error\.details\.field,/,
  );
  assert.match(
    profileInputPersistenceText,
    /assert\.equal\(error\.code, "ERR_UNSUPPORTED_JURISDICTION_PROFILE"\);[\s\S]*assert\.equal\(error\.details\.jurisdiction_profile_key, "SWE_OTHER"\);/,
  );
  assert.match(
    bundleArchivePersistenceText,
    /assert\.equal\(error\.code, "ERR_EXPORT_PACKAGE_BUNDLE_ARCHIVE_ARTIFACT_INVALID"\);[\s\S]*assert\.equal\(error\.details\.field, "bundle_manifest_fingerprint"\);/,
  );
});
