const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const docsPath = path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md");
const docsText = fs.readFileSync(docsPath, "utf8");

test("docs freeze export_package_bundle_archive_artifact semantic-fact mapping at the prerequisite stage only", () => {
  assert.match(
    docsText,
    /### Export Package Bundle Archive Artifact Semantic-Fact Mapping Prerequisites/,
  );
  assert.match(
    docsText,
    /`export_package_bundle_archive_artifact` semantic-fact adoption is not yet implemented/i,
  );
  assert.match(
    docsText,
    /No\s+canonical\s+`export_package_bundle_archive_artifact` semantic-fact alignment surface is added yet\s+because doing so would require guessing beyond the current repo contracts\./i,
  );
  assert.match(docsText, /`artifact_type`/);
  assert.match(docsText, /`filename`/);
  assert.match(docsText, /`content_type`/);
  assert.match(docsText, /`encoding`/);
  assert.match(docsText, /`body_base64`/);
  assert.match(docsText, /`package_version`/);
  assert.match(docsText, /`bundle_manifest_fingerprint`/);
  assert.match(docsText, /`snapshot_status`/);
  assert.match(
    docsText,
    /final bundle\/archive artifact is deterministically derived from the persisted canonical\s+bundle\/package manifest snapshot plus the required persisted canonical JSON, Markdown, PDF,\s+and DOCX artifact snapshots/i,
  );
  assert.match(
    docsText,
    /Because `export_package` semantic-fact mapping is itself\s+already frozen/i,
  );
  assert.match(
    docsText,
    /`export_package_bundle_archive_artifact`\s+semantic-fact mapping is also blocked from safe implementation/i,
  );
  assert.match(
    docsText,
    /none yet; the current final bundle\/archive artifact contracts do not safely assign any\s+neutral semantic-fact dimension without additional contract detail/i,
  );
  assert.match(docsText, /`presence_status`/);
  assert.match(docsText, /`source_status`/);
  assert.match(docsText, /`verification_status`/);
  assert.match(docsText, /`dispute_status`/);
  assert.match(docsText, /`consistency_status`/);
  assert.match(
    docsText,
    /no `export_package_bundle_archive_artifact` semantic-fact alignment should be\s+implemented until the missing dimensions are explicitly contract-defined/i,
  );
  assert.match(
    docsText,
    /undocumented mappings must remain blocked from implementation/i,
  );
  assert.match(
    docsText,
    /no runtime or schema alignment should be added while the final bundle\/archive artifact\s+remains only a deterministic derivative of the canonical bundle\/package manifest\s+snapshot plus the required persisted canonical JSON, Markdown, PDF, and DOCX artifact\s+snapshots and the upstream `export_package` semantic-fact mapping remains frozen/i,
  );
  assert.match(
    docsText,
    /`schemas\/export-package-bundle-archive-artifact-stop-outcome-alignment\.json`/,
  );
  assert.match(
    docsText,
    /`schemas\/export-package-bundle-archive-artifact-stop-matrix-alignment\.json`/,
  );
  assert.match(
    docsText,
    /`schemas\/export-package-bundle-archive-artifact-traceability-alignment\.json`/,
  );
  assert.match(
    docsText,
    /semantic-fact adoption is intentionally held at this prerequisite\/freeze stage only/i,
  );
});
