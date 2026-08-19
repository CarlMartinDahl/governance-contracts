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

test("docs freeze the shared packages/schemas validation helper scaffold as the canonical internal validation seam", () => {
  assert.match(docsText, /Shared Packages\/Schemas Validation Helper Scaffold Freeze/i);
  assert.match(
    docsText,
    /shared schema-validation helper scaffold inside `packages\/schemas` is the canonical internal validation-infrastructure seam and is now frozen as the baseline internal validation seam/i,
  );
  assert.match(docsText, /machine-readable schema validation error construction/i);
  assert.match(docsText, /shared plain-object and key-shape enforcement/i);
  assert.match(docsText, /shared allowed-key and string-enum enforcement/i);
  assert.match(docsText, /shared non-empty unique string-array validation/i);
  assert.match(
    docsText,
    /canonical external contract-export boundary remains the shared `packages\/schemas` export scaffold, while this helper scaffold is the canonical internal validation-infrastructure seam inside `packages\/schemas`/i,
  );
  assert.match(
    docsText,
    /exported schema\/validator families may rely on this shared helper layer rather than duplicating helper infrastructure ad hoc/i,
  );
  assert.match(
    docsText,
    /including `createSchemaValidationError`, `assertPlainObject`, `assertExactKeys`, `assertAllowedKeys`, `validateStringEnum`, `validateNonEmptyUniqueStringArray`, and `validateStringEnumArray`/i,
  );
  assert.match(
    docsText,
    /individual schema files and family-specific validator code may remain as implementation details, but they are not the canonical shared helper seam/i,
  );
  assert.match(
    docsText,
    /new shared validation helper behavior should extend the existing helper scaffold instead of introducing parallel helper stacks/i,
  );
  assert.match(
    docsText,
    /undocumented bypasses of the shared helper scaffold should be avoided for canonical shared validation infrastructure/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, helper semantics, export semantics, schema behavior, or fail-closed behavior/i,
  );

  assert.match(schemasIndexText, /function createSchemaValidationError\(/);
  assert.match(schemasIndexText, /function assertPlainObject\(/);
  assert.match(schemasIndexText, /function assertExactKeys\(/);
  assert.match(schemasIndexText, /function assertAllowedKeys\(/);
  assert.match(schemasIndexText, /function validateStringEnum\(/);
  assert.match(schemasIndexText, /function validateNonEmptyUniqueStringArray\(/);
  assert.match(schemasIndexText, /function validateStringEnumArray\(/);
  assert.match(schemasIndexText, /function validateSemanticFactModel\(/);
  assert.match(schemasIndexText, /function validateStopOutcomeModel\(/);
  assert.match(schemasIndexText, /function validateJurisdictionProfileRegistry\(/);
  assert.match(schemasIndexText, /function validateSWEBodelningProfileInputSnapshot\(/);
  assert.match(schemasIndexText, /function validateReleaseEvalRun\(/);
  assert.match(schemasIndexText, /function validateExportPackage\(/);
});
