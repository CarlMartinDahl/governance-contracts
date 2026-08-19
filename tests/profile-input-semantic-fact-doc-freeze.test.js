const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const docsPath = path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md");
const docsText = fs.readFileSync(docsPath, "utf8");

test("docs freeze profile_input semantic-fact mapping outside the presence-only safe boundary", () => {
  assert.match(docsText, /### Profile Input Semantic-Fact Mapping Prerequisites/);
  assert.match(
    docsText,
    /`profile_input` semantic-fact adoption is only partially implemented/i,
  );
  assert.match(
    docsText,
    /`schemas\/profile-input-semantic-fact-alignment\.json`, exported through `packages\/schemas`/i,
  );
  assert.match(docsText, /`jurisdiction_profile_key`/);
  assert.match(docsText, /`profile_input_lane_snapshot` required lane keys/);
  assert.match(docsText, /`profile_input_summary\.required_lane_count`/);
  assert.match(docsText, /`profile_input_summary\.missing_value_lane_keys`/);
  assert.match(docsText, /`profile_input_lane_snapshot\.\*\.has_value`/);
  assert.match(docsText, /`profile_input_lane_snapshot\.\*\.value`/);
  assert.match(docsText, /`profile_input_lane_snapshot\.\*\.evidence_object_ids`/);
  assert.match(docsText, /`profile_input_summary\.lanes_with_value_count`/);
  assert.match(
    docsText,
    /`presence_status` only\./i,
  );
  assert.match(
    docsText,
    /required lane with value ->\s+`?\{ "presence_status": "present" \}`?/i,
  );
  assert.match(
    docsText,
    /required lane already marked missing in the canonical `profile_input` snapshot\/summary ->\s+`?\{ "presence_status": "missing" \}`?/i,
  );
  assert.match(
    docsText,
    /Raw empty payload content is not independently normalized at the `profile_input` seam\./i,
  );
  assert.match(docsText, /`source_status`/);
  assert.match(docsText, /`verification_status`/);
  assert.match(docsText, /`dispute_status`/);
  assert.match(docsText, /`consistency_status`/);
  assert.match(
    docsText,
    /`profile_input_lane_snapshot\.\*\.evidence_object_ids` remain opaque reference ids in this seam\s+and are not yet contractually sufficient to map `source_status` without guessing/i,
  );
  assert.match(
    docsText,
    /no `profile_input` semantic-fact alignment should be implemented beyond the documented\s+safe `presence_status` cases until the missing dimensions are explicitly\s+contract-defined/i,
  );
  assert.match(
    docsText,
    /undocumented mappings must remain blocked from implementation/i,
  );
  assert.match(
    docsText,
    /do not change current runtime behavior,\s+stored payloads, schema surfaces, readiness behavior, or fail-closed behavior/i,
  );
});
