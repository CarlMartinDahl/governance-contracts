const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const docsPath = path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md");
const docsText = fs.readFileSync(docsPath, "utf8");

test("docs freeze export_package_bundle_manifest semantic-fact mapping at the prerequisite stage only", () => {
  assert.match(
    docsText,
    /### Export Package Bundle Manifest Semantic-Fact Mapping Prerequisites/,
  );
  assert.match(
    docsText,
    /`export_package_bundle_manifest` semantic-fact adoption is not yet implemented/i,
  );
  assert.match(
    docsText,
    /No\s+canonical `export_package_bundle_manifest` semantic-fact alignment surface is added yet\s+because doing so would require guessing beyond the current repo contracts\./i,
  );
  assert.match(docsText, /`jurisdiction_profile_key`/);
  assert.match(docsText, /`package_version`/);
  assert.match(docsText, /`export_version`/);
  assert.match(docsText, /`dossier_fingerprint`/);
  assert.match(docsText, /`canonical_source`/);
  assert.match(docsText, /`generated_at`/);
  assert.match(docsText, /`artifacts`/);
  assert.match(docsText, /`snapshot_status`/);
  assert.match(
    docsText,
    /bundle\/package manifest is deterministically derived from the persisted canonical export\s+package snapshot plus the required persisted canonical JSON, Markdown, PDF, and DOCX\s+artifact snapshots/i,
  );
  assert.match(
    docsText,
    /Because `export_package` semantic-fact mapping is itself already frozen/i,
  );
  assert.match(
    docsText,
    /`export_package_bundle_manifest` semantic-fact mapping is also\s+blocked\s+from safe implementation/i,
  );
  assert.match(
    docsText,
    /none yet; the current bundle\/package manifest contracts do not safely assign any neutral\s+semantic-fact dimension without additional contract detail/i,
  );
  assert.match(docsText, /`presence_status`/);
  assert.match(docsText, /`source_status`/);
  assert.match(docsText, /`verification_status`/);
  assert.match(docsText, /`dispute_status`/);
  assert.match(docsText, /`consistency_status`/);
  assert.match(
    docsText,
    /no `export_package_bundle_manifest` semantic-fact alignment should be implemented until\s+the missing dimensions are explicitly contract-defined/i,
  );
  assert.match(
    docsText,
    /undocumented mappings must remain blocked from implementation/i,
  );
  assert.match(
    docsText,
    /no runtime or schema alignment should be added while the bundle\/package manifest remains\s+only a deterministic derivative of the canonical export package snapshot plus the\s+required persisted canonical JSON, Markdown, PDF, and DOCX artifact snapshots and the\s+upstream `export_package` semantic-fact mapping remains frozen/i,
  );
  assert.match(
    docsText,
    /`schemas\/export-package-bundle-manifest-stop-outcome-alignment\.json`/,
  );
  assert.match(
    docsText,
    /`schemas\/export-package-bundle-manifest-stop-matrix-alignment\.json`/,
  );
  assert.match(
    docsText,
    /`schemas\/export-package-bundle-manifest-traceability-alignment\.json`/,
  );
  assert.match(
    docsText,
    /semantic-fact adoption is intentionally held at this prerequisite\/freeze stage only/i,
  );
});
