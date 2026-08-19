const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const docsPath = path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md");
const docsText = fs.readFileSync(docsPath, "utf8");

test("docs freeze profile_dossier semantic-fact mapping at the prerequisite stage only", () => {
  assert.match(docsText, /### Profile Dossier Semantic-Fact Mapping Prerequisites/);
  assert.match(
    docsText,
    /`profile_dossier` semantic-fact adoption is not yet implemented/i,
  );
  assert.match(
    docsText,
    /No\s+canonical `profile_dossier` semantic-fact alignment surface is added yet because doing so\s+would require guessing beyond the current repo contracts\./i,
  );
  assert.match(docsText, /`profile_input_summary`/);
  assert.match(docsText, /`profile_input_lane_snapshot`/);
  assert.match(docsText, /`evidence_reference_index`/);
  assert.match(docsText, /`evidence_exhibit_index`/);
  assert.match(docsText, /`issue_index`/);
  assert.match(docsText, /`section_index`/);
  assert.match(docsText, /`release_gate`/);
  assert.match(docsText, /`release_gate_reason_code`/);
  assert.match(docsText, /`release_eval_freshness`/);
  assert.match(docsText, /`release_eval_freshness_reason_code`/);
  assert.match(docsText, /`snapshot_status`/);
  assert.match(
    docsText,
    /none yet; the current dossier contracts do not safely assign any neutral semantic-fact\s+dimension without additional contract detail/i,
  );
  assert.match(docsText, /`presence_status`/);
  assert.match(docsText, /`source_status`/);
  assert.match(docsText, /`verification_status`/);
  assert.match(docsText, /`dispute_status`/);
  assert.match(docsText, /`consistency_status`/);
  assert.match(
    docsText,
    /`schemas\/profile-dossier-stop-outcome-alignment\.json`/,
  );
  assert.match(
    docsText,
    /`schemas\/profile-dossier-stop-matrix-alignment\.json`/,
  );
  assert.match(
    docsText,
    /`schemas\/profile-dossier-traceability-alignment\.json`/,
  );
  assert.match(
    docsText,
    /semantic-fact adoption is intentionally held at this prerequisite\/freeze stage only/i,
  );
});
