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

test("docs freeze the shared database storage-helper seam as the filesystem/path I/O boundary", () => {
  assert.match(
    docsText,
    /Shared Database Storage-Helper Seam Freeze/i,
  );
  assert.match(
    docsText,
    /shared `packages\/database\/src\/index\.js` `resolveStoragePath`, `readStore`, and `writeStore` helpers are the canonical filesystem\/path I\/O boundary for the current case-level persistence families below and are now frozen as the baseline seam/i,
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
    /the currently concrete shared behavior already evidenced for this helper seam is limited to:\s+`resolveStoragePath` centralizing default storage directory selection and `persistenceFilePath` construction from `fileName` and optional `options\.storageDir`\s+`readStore` centralizing UTF-8 store reads through `resolveStoragePath`\s+`readStore` returning `\{\}` for missing-store `ENOENT` cases and rethrowing other filesystem errors unchanged\s+`writeStore` centralizing recursive directory creation and pretty-printed JSON store writes through `resolveStoragePath`/i,
  );
  assert.match(
    docsText,
    /the shared `createPersistenceError` helper seam remains outside this helper seam because machine-readable persistence error construction is a separate frozen boundary/i,
  );
  assert.match(
    docsText,
    /the shared API response-helper seam remains outside this helper seam because API response construction is performed in `apps\/api\/src\/index\.js` after persistence work completes or throws/i,
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
    /route-edge API error-envelope families remain outside this helper seam because they are API-surface envelopes rather than database-layer filesystem\/path helpers/i,
  );
  assert.match(
    docsText,
    /downstream persistence-specific business logic may remain inside individual persistence helpers as implementation detail, but it is not the canonical shared storage\/path I\/O boundary/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, persistence semantics, filesystem behavior, API behavior, or fail-closed behavior/i,
  );

  assert.match(
    databaseIndexText,
    /function resolveStoragePath\(fileName, options = \{\}\)\s*\{\s*const storageDir = options\.storageDir \?\? path\.join\(process\.cwd\(\), "\.tmp", "database"\);\s*return \{\s*storageDir,\s*persistenceFilePath: path\.join\(storageDir, fileName\),\s*\};\s*\}/,
  );
  assert.match(
    databaseIndexText,
    /async function readStore\(fileName, options = \{\}\)\s*\{\s*const \{ persistenceFilePath \} = resolveStoragePath\(fileName, options\);\s*try \{\s*const storeText = await fs\.readFile\(persistenceFilePath, "utf8"\);\s*return JSON\.parse\(storeText\);\s*\} catch \(error\) \{\s*if \(error\.code === "ENOENT"\) \{\s*return \{\};\s*\}\s*throw error;\s*\}\s*\}/,
  );
  assert.match(
    databaseIndexText,
    /async function writeStore\(fileName, store, options = \{\}\)\s*\{\s*const \{ storageDir, persistenceFilePath \} = resolveStoragePath\(fileName, options\);\s*await fs\.mkdir\(storageDir, \{ recursive: true \}\);\s*await fs\.writeFile\(persistenceFilePath, JSON\.stringify\(store, null, 2\)\);\s*\}/,
  );

  assert.equal(
    (databaseIndexText.match(/function resolveStoragePath\(/g) || []).length,
    1,
  );
  assert.equal(
    (databaseIndexText.match(/async function readStore\(/g) || []).length,
    1,
  );
  assert.equal(
    (databaseIndexText.match(/async function writeStore\(/g) || []).length,
    1,
  );

  const resolveStoragePathUses =
    (databaseIndexText.match(/resolveStoragePath\(/g) || []).length - 1;
  const readStoreUses =
    (databaseIndexText.match(/readStore\(/g) || []).length - 1;
  const writeStoreUses =
    (databaseIndexText.match(/writeStore\(/g) || []).length - 1;

  assert.ok(resolveStoragePathUses >= 2);
  assert.ok(readStoreUses > 20);
  assert.ok(writeStoreUses >= 9);
});
