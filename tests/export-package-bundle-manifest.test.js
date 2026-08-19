const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const schema = require("../schemas/swe-bodelning-export-package-bundle-manifest.json");
const {
  sweBodelningExportPackageBundleManifest,
} = require("../packages/schemas/src/index.js");

const docsPath = path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md");
const docsText = fs.readFileSync(docsPath, "utf8");

test("the bundle/package manifest schema accepts the intended machine-readable manifest shape", () => {
  assert.deepEqual(schema.required, [
    "jurisdiction_profile_key",
    "package_version",
    "export_version",
    "dossier_fingerprint",
    "canonical_source",
    "generated_at",
    "artifacts",
  ]);
  assert.equal(schema.properties.jurisdiction_profile_key.const, "SWE_BODELNING");
  assert.equal(
    schema.properties.canonical_source.$ref,
    "https://governance-contracts.invalid/schemas/swe-bodelning-profile-dossier-snapshot.json#/$defs/canonicalSource",
  );
  assert.deepEqual(schema.$defs.bundleManifestArtifact.required, [
    "artifact_type",
    "filename",
    "content_type",
    "encoding",
  ]);
});

test("packages/schemas exports the SWE_BODELNING bundle/package manifest schema", () => {
  assert.deepEqual(sweBodelningExportPackageBundleManifest, schema);
});

test("docs describe the same bundle/package manifest surface", () => {
  assert.match(
    docsText,
    /schemas\/swe-bodelning-export-package-bundle-manifest\.json/,
  );
  assert.match(
    docsText,
    /distinct from the persisted export package snapshot contract/,
  );
  assert.match(
    docsText,
    /machine-readable multi-artifact manifest surface for later bundle\/package assembly/,
  );
});

test("no runtime behavior changes are introduced beyond contract alignment", () => {
  assert.match(
    docsText,
    /does not introduce governance assembly, persistence, API delivery, zip packaging, or final archive generation in this slice/,
  );
});
