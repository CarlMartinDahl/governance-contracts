const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const docsText = fs.readFileSync(
  path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md"),
  "utf8",
);
const schemasIndexText = fs.readFileSync(
  path.join(__dirname, "..", "packages", "schemas", "src", "index.js"),
  "utf8",
);

test("docs freeze the shared packages/schemas export scaffold as the aggregate contract-export boundary seam", () => {
  assert.match(docsText, /Shared Packages\/Schemas Export Scaffold Freeze/i);
  assert.match(
    docsText,
    /shared `packages\/schemas` export scaffold is the canonical aggregate machine-readable contract-export boundary and is now frozen as the baseline seam/i,
  );
  assert.match(docsText, /neutral shared model contracts/i);
  assert.match(docsText, /jurisdiction-profile registry contracts/i);
  assert.match(docsText, /profile_input contracts/i);
  assert.match(docsText, /release_eval contracts/i);
  assert.match(docsText, /profile_dossier contracts/i);
  assert.match(docsText, /export_package family contracts/i);
  assert.match(docsText, /related shared alignment surfaces/i);
  assert.match(
    docsText,
    /consumers of the canonical contract surface should use the shared `packages\/schemas` export scaffold rather than bypassing it with ad hoc deep imports/i,
  );
  assert.match(
    docsText,
    /aggregate export surface in `packages\/schemas\/src\/index\.js`/i,
  );
  assert.match(
    docsText,
    /individual schema files and internal helper\/validator functions may remain as implementation details, but they are not the canonical aggregate export boundary/i,
  );
  assert.match(
    docsText,
    /future new contract families or shared alignment surfaces should extend the shared `packages\/schemas` export scaffold/i,
  );
  assert.match(
    docsText,
    /new canonical contract consumers should not bypass the shared export surface without explicit reason and contract documentation/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, export semantics, schema behavior, or fail-closed behavior/i,
  );

  assert.match(schemasIndexText, /module\.exports = \{/);
  assert.match(schemasIndexText, /semanticFactModel/);
  assert.match(schemasIndexText, /stopOutcomeModel/);
  assert.match(schemasIndexText, /jurisdictionProfileRegistry/);
  assert.match(schemasIndexText, /sweBodelningProfileInput/);
  assert.match(schemasIndexText, /cmdReleaseEvalRun/);
  assert.match(schemasIndexText, /sweBodelningProfileDossierSnapshot/);
  assert.match(schemasIndexText, /validateExportPackage/);
  assert.match(schemasIndexText, /exportPackageStopOutcomeAlignment/);
});
