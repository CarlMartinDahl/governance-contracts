const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const docsText = fs.readFileSync(
  path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md"),
  "utf8",
);
const governanceIndexText = fs.readFileSync(
  path.join(__dirname, "..", "packages", "governance", "src", "index.js"),
  "utf8",
);
const profileInputGovernanceText = fs.readFileSync(
  path.join(__dirname, "profile-input-governance.test.js"),
  "utf8",
);
const exportPackageValidatorDispatchText = fs.readFileSync(
  path.join(__dirname, "export-package-validator-dispatch.test.js"),
  "utf8",
);

test("docs freeze the shared governance createGovernanceError seam as the machine-readable governance error boundary", () => {
  assert.match(
    docsText,
    /Shared Governance Error Helper Seam Freeze/i,
  );
  assert.match(
    docsText,
    /shared `packages\/governance\/src\/index\.js` `createGovernanceError` helper is the canonical machine-readable governance error-construction boundary for the current included governance flows below and is now frozen as the baseline seam/i,
  );
  assert.match(
    docsText,
    /the currently evidenced governed surfaces in this freeze are limited to:\s+`profile_input` governance helpers\s+`release_eval` governance helpers and dossier-related governance resolution where applicable\s+`export_package` governance helpers\s+`export_package_json_artifact` governance helpers\s+`export_package_markdown_artifact` governance helpers\s+`export_package_pdf_artifact` governance helpers\s+`export_package_docx_artifact` governance helpers\s+`export_package_bundle_manifest` governance helpers\s+`export_package_bundle_archive_artifact` governance helpers\s+shared jurisdiction-profile capability gating where applicable/i,
  );
  assert.match(
    docsText,
    /callers at the governance boundary for those included surfaces should go through the shared `createGovernanceError\(code, message, details\)` seam for machine-readable governance errors rather than hand-mutating `Error` instances inline/i,
  );
  assert.match(
    docsText,
    /the currently concrete shared behavior already evidenced for this helper seam is limited to:\s+constructing an `Error` instance\s+attaching machine-readable `error\.code`\s+attaching machine-readable `error\.details`\s+repeated helper reuse for machine-readable unsupported-profile governance rejections such as `ERR_UNSUPPORTED_JURISDICTION_PROFILE`\s+repeated helper reuse across governance-layer validation\/consistency branches where existing tests already prove `error\.code` and, where applicable, `error\.details`/i,
  );
  assert.match(
    docsText,
    /the shared `createPersistenceError` helper seam remains outside this helper seam because database-layer machine-readable persistence error construction is a separate frozen boundary/i,
  );
  assert.match(
    docsText,
    /the shared `resolveStoragePath` \/ `readStore` \/ `writeStore` storage-helper seam remains outside this helper seam because filesystem\/path I\/O is a separate frozen boundary/i,
  );
  assert.match(
    docsText,
    /the shared `reconcilePersistedReleaseEvalRun` \/ `resolvePersistedReleaseEvalProfileDossierSnapshot` reconciliation helper seam remains outside this helper seam because persisted release-eval reconciliation and dossier-snapshot resolution are separate frozen database boundaries/i,
  );
  assert.match(
    docsText,
    /the shared `attachPersistedReleaseEvalRun` \/ `resolvePersistedReleaseEvalProfileDossierProjection` wrapper seam remains outside this helper seam because attached release-eval and profile-dossier projection resolution are separate frozen database boundaries/i,
  );
  assert.match(
    docsText,
    /the shared API response-helper seam remains outside this helper seam because API response construction is performed in `apps\/api\/src\/index\.js` after governance results are returned or thrown/i,
  );
  assert.match(
    docsText,
    /the shared `\/cases\/:caseId\/\.\.\.` parser seam remains outside this helper seam because path parsing occurs before any governance boundary is reached/i,
  );
  assert.match(
    docsText,
    /the shared `loadAuthorizedCaseContext` helper remains outside this helper seam because auth\/access loading and capability gating occur before governance helper selection/i,
  );
  assert.match(
    docsText,
    /the shared validator-dispatch scaffold remains outside this helper seam because schema-validator dispatch selects validators rather than constructing governance-layer thrown errors/i,
  );
  assert.match(
    docsText,
    /the shared governance adapter-dispatch scaffold remains outside this helper seam because jurisdiction-profile adapter routing and governed-surface dispatch are separate runtime boundaries/i,
  );
  assert.match(
    docsText,
    /the shared jurisdiction-profile registry scaffold remains outside this helper seam because registry metadata and capability lookup are separate machine-readable boundaries/i,
  );
  assert.match(
    docsText,
    /downstream governance derivation, reconstruction, projection, and rule logic remain outside this helper seam because they may call the shared helper but do not define the canonical error-construction boundary themselves/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, governance semantics, persistence semantics, filesystem behavior, API behavior, or fail-closed behavior/i,
  );

  assert.match(
    governanceIndexText,
    /function createGovernanceError\(code, message, details = \{\}\)\s*\{\s*const error = new Error\(message\);\s*error\.code = code;\s*error\.details = details;\s*return error;\s*\}/,
  );
  assert.equal(
    (governanceIndexText.match(/function createGovernanceError\(/g) || []).length,
    1,
  );

  const createGovernanceErrorUses =
    (governanceIndexText.match(/createGovernanceError\(/g) || []).length - 1;
  assert.ok(createGovernanceErrorUses > 20);

  assert.match(
    governanceIndexText,
    /function assertSupportedJurisdictionProfileCapability[\s\S]*throw createGovernanceError\(\s*"ERR_UNSUPPORTED_JURISDICTION_PROFILE",\s*"jurisdiction_profile_key is not supported",\s*\{\s*jurisdiction_profile_key: jurisdictionProfileKey,\s*\},\s*\)/,
  );
  assert.match(
    governanceIndexText,
    /function assertPlainObject\(value, code, field\) \{\s*if \(!value \|\| typeof value !== "object" \|\| Array\.isArray\(value\)\) \{\s*throw createGovernanceError\(code, `\$\{field\} must be an object`, \{ field \}\);/,
  );

  assert.match(
    profileInputGovernanceText,
    /deriveSWEBodelningProfileInputSnapshot\([\s\S]*jurisdiction_profile_key: "SWE_OTHER"[\s\S]*assert\.equal\(error\.code, "ERR_UNSUPPORTED_JURISDICTION_PROFILE"\);/,
  );
  assert.match(
    exportPackageValidatorDispatchText,
    /assert\.equal\(error\.code, "ERR_UNSUPPORTED_JURISDICTION_PROFILE"\);[\s\S]*assert\.equal\(error\.details\.jurisdiction_profile_key, "SWE_OTHER"\);/,
  );
});
