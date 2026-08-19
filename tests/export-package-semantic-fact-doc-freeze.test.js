const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const docsPath = path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md");
const docsText = fs.readFileSync(docsPath, "utf8");

test("docs freeze export_package semantic-fact mapping at the prerequisite stage only", () => {
  assert.match(docsText, /### Export Package Semantic-Fact Mapping Prerequisites/);
  assert.match(
    docsText,
    /`export_package` semantic-fact adoption is not yet implemented/i,
  );
  assert.match(
    docsText,
    /No\s+canonical `export_package` semantic-fact alignment surface is added yet because doing so\s+would require guessing beyond the current repo contracts\./i,
  );
  assert.match(docsText, /`dossier_fingerprint`/);
  assert.match(docsText, /`canonical_source`/);
  assert.match(docsText, /`profile_dossier_snapshot`/);
  assert.match(docsText, /`generated_at`/);
  assert.match(docsText, /`manifest`/);
  assert.match(docsText, /`snapshot_status`/);
  assert.match(
    docsText,
    /none yet; the current export package contracts do not safely assign any neutral\s+semantic-fact dimension without additional contract detail/i,
  );
  assert.match(docsText, /`presence_status`/);
  assert.match(docsText, /`source_status`/);
  assert.match(docsText, /`verification_status`/);
  assert.match(docsText, /`dispute_status`/);
  assert.match(docsText, /`consistency_status`/);
  assert.match(docsText, /`schemas\/export-package-stop-outcome-alignment\.json`/);
  assert.match(docsText, /`schemas\/export-package-stop-matrix-alignment\.json`/);
  assert.match(docsText, /`schemas\/export-package-traceability-alignment\.json`/);
  assert.match(
    docsText,
    /semantic-fact adoption is intentionally held at this prerequisite\/freeze stage only/i,
  );
});
