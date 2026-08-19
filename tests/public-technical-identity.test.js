const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repositoryRoot = path.resolve(__dirname, "..");
const schemaDirectory = path.join(repositoryRoot, "schemas");
const schemaIdentityBase = "https://governance-contracts.invalid/schemas/";
const expectedSchemaCount = 109;
const expectedAbsoluteReferenceCount = 31;
const expectedAbsoluteReferenceTargets = Object.freeze([
  `${schemaIdentityBase}cmd-export-package-bundle-manifest.json`,
  `${schemaIdentityBase}cmd-export-package.json`,
  `${schemaIdentityBase}cmd-profile-dossier-snapshot.json`,
  `${schemaIdentityBase}swe-bodelning-export-package-bundle-manifest.json`,
  `${schemaIdentityBase}swe-bodelning-export-package.json`,
  `${schemaIdentityBase}swe-bodelning-profile-dossier-snapshot.json`,
]);

function readJson(relativePath) {
  return JSON.parse(
    fs.readFileSync(path.join(repositoryRoot, relativePath), "utf8"),
  );
}

function collectReferences(value, references) {
  if (Array.isArray(value)) {
    for (const item of value) {
      collectReferences(item, references);
    }
    return;
  }

  if (value === null || typeof value !== "object") {
    return;
  }

  for (const [key, nestedValue] of Object.entries(value)) {
    if (key === "$ref" && typeof nestedValue === "string") {
      references.push(nestedValue);
    }
    collectReferences(nestedValue, references);
  }
}

test("every tracked schema has one canonical public technical identity", () => {
  const schemaFiles = fs
    .readdirSync(schemaDirectory)
    .filter((fileName) => fileName.endsWith(".json"))
    .sort();
  const schemas = schemaFiles.map((fileName) => [
    fileName,
    readJson(path.join("schemas", fileName)),
  ]);
  const schemaIds = schemas.map(([, schema]) => schema.$id);

  assert.equal(schemaFiles.length, expectedSchemaCount);
  assert.equal(new Set(schemaIds).size, schemaIds.length);

  for (const [fileName, schema] of schemas) {
    assert.equal(schema.$id, `${schemaIdentityBase}${fileName}`);
  }
});

test("every absolute schema reference resolves within the public identity set", () => {
  const schemas = fs
    .readdirSync(schemaDirectory)
    .filter((fileName) => fileName.endsWith(".json"))
    .map((fileName) => readJson(path.join("schemas", fileName)));
  const schemaIds = new Set(schemas.map((schema) => schema.$id));
  const references = [];

  for (const schema of schemas) {
    collectReferences(schema, references);
  }

  const absoluteReferences = references.filter((value) =>
    /^[a-z][a-z0-9+.-]*:/iu.test(value),
  );
  const absoluteReferenceTargets = [
    ...new Set(absoluteReferences.map((reference) => reference.split("#")[0])),
  ].sort();

  assert.equal(absoluteReferences.length, expectedAbsoluteReferenceCount);
  assert.deepEqual(absoluteReferenceTargets, expectedAbsoluteReferenceTargets);

  for (const reference of absoluteReferences) {
    assert.ok(reference.startsWith(schemaIdentityBase));
    assert.ok(schemaIds.has(reference.split("#")[0]));
  }
});

test("private workspace package identities align with the public project name", () => {
  assert.equal(readJson("package.json").name, "governance-contracts");
  assert.equal(
    readJson("packages/database/package.json").name,
    "governance-contracts-database",
  );
  assert.equal(
    readJson("packages/governance/package.json").name,
    "governance-contracts-governance",
  );
  assert.equal(
    readJson("packages/schemas/package.json").name,
    "governance-contracts-schemas",
  );
});
