const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const docsPath = path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md");
const docsText = fs.readFileSync(docsPath, "utf8");

test("docs freeze release_eval semantic-fact mapping outside the documented partial safe alignment", () => {
  assert.match(docsText, /### Release Eval Semantic-Fact Mapping Prerequisites/);
  assert.match(
    docsText,
    /`release_eval` semantic-fact adoption is only partially implemented/i,
  );
  assert.match(
    docsText,
    /`schemas\/release-eval-semantic-fact-alignment\.json`, exported through `packages\/schemas`/i,
  );
  assert.match(docsText, /`presence_status`/);
  assert.match(docsText, /`source_status`/);
  assert.match(docsText, /`verification_status`/);
  assert.match(docsText, /`dispute_status`/);
  assert.match(docsText, /`consistency_status`/);
  assert.match(docsText, /`profile_input_summary\.missing_value_lane_keys`/);
  assert.match(docsText, /`profile_input_summary\.missing_support_lane_keys`/);
  assert.match(docsText, /`profile_input_lane_snapshot\.\*\.has_support`/);
  assert.match(docsText, /`cmd-runtime-not-implemented`/);
  assert.match(docsText, /`swe-bodelning-support-incomplete`/);
  assert.match(
    docsText,
    /`cmd-primary-signal-present-but-runtime-not-implemented` ->\s+`?\{ "presence_status": "present" \}`?/i,
  );
  assert.match(
    docsText,
    /`swe-bodelning-support-incomplete` ->\s+`?\{ "presence_status": "present", "source_status": "unsourced" \}`?/i,
  );
  assert.match(
    docsText,
    /No `source_status = sourced` mapping is added yet\./i,
  );
  assert.match(docsText, /`schemas\/release-eval-stop-outcome-alignment\.json`/);
  assert.match(docsText, /`schemas\/release-eval-stop-matrix-alignment\.json`/);
  assert.match(docsText, /`schemas\/release-eval-traceability-alignment\.json`/);
  assert.match(
    docsText,
    /semantic-fact adoption is now partially present through\s+`schemas\/release-eval-semantic-fact-alignment\.json` and remains frozen beyond the\s+documented safe cases/i,
  );
  assert.match(
    docsText,
    /no `release_eval` semantic-fact alignment should be implemented beyond the documented\s+safe `presence_status` and `source_status` cases until the missing dimensions are\s+explicitly contract-defined/i,
  );
  assert.match(
    docsText,
    /do not change current runtime behavior,\s+stored payloads,\s+reason codes,\s+readiness behavior,\s+or fail-closed behavior/i,
  );
});
