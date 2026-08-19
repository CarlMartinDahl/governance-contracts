const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const schema = require("../schemas/cmd-release-eval-run.json");
const {
  cmdReleaseEvalRun,
  sweBodelningReleaseEvalRun,
} = require("../packages/schemas/src/index.js");
const {
  getReleaseEvalAdapter,
  hasJurisdictionProfileCapability,
  isSupportedJurisdictionProfileKey,
} = require("../packages/governance/src/index.js");

const docsPath = path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md");
const docsText = fs.readFileSync(docsPath, "utf8");

test("the new CMD_PROFILE release_eval schema accepts the documented surface", () => {
  assert.deepEqual(schema.required, [
    "jurisdiction_profile_key",
    "release_eval_run_id",
    "evaluator_version",
    "release_gate",
    "release_gate_reason_code",
    "release_eval_freshness",
    "release_eval_freshness_reason_code",
    "profile_input_summary",
    "profile_input_lane_snapshot",
  ]);
  assert.equal(schema.properties.jurisdiction_profile_key.const, "CMD_PROFILE");
  assert.deepEqual(schema.properties.profile_input_summary.required, [
    "required_lane_count",
    "lanes_with_value_count",
    "missing_value_lane_keys",
    "lanes_with_support_count",
    "missing_support_lane_keys",
  ]);
  assert.deepEqual(
    schema.properties.profile_input_lane_snapshot.required,
    ["cmd_primary_signal"],
  );
  assert.deepEqual(
    Object.keys(schema.properties.profile_input_lane_snapshot.properties),
    ["cmd_primary_signal"],
  );
  assert.deepEqual(
    schema.$defs.releaseEvalLaneSnapshotEntry.required,
    ["has_value", "value", "has_support"],
  );
  assert.equal(
    schema.properties.profile_dossier_snapshot.$ref,
    "https://governance-contracts.invalid/schemas/cmd-profile-dossier-snapshot.json",
  );
});

test("packages/schemas exports the new schema if applicable", () => {
  assert.deepEqual(cmdReleaseEvalRun, schema);
});

test("docs describe the same release_eval surface", () => {
  assert.match(
    docsText,
    /canonical `"CMD_PROFILE"` release eval contract is defined in `schemas\/cmd-release-eval-run\.json`/,
  );
  assert.match(docsText, /normalized `"cmd_primary_signal"` lane set only/);
  assert.match(
    docsText,
    /Runtime support is enabled for `release_eval` in this slice/,
  );
  assert.match(
    docsText,
    /deterministic blocked\/current `"CMD_PROFILE"` release-eval baseline derived only from persisted `"CMD_PROFILE"` profile inputs/,
  );
  assert.match(
    docsText,
    /may also carry an attached `profile_dossier_snapshot` derived from the same blocked\/current baseline/,
  );
  assert.match(
    docsText,
    /"rule_name": "cmd-primary-signal-present-but-runtime-not-implemented"/,
  );
  assert.match(
    docsText,
    /"qualifying_conditions": "jurisdiction_profile_key == \\"CMD_PROFILE\\" AND lane \\"cmd_primary_signal\\" is present and non-empty"/,
  );
  assert.match(docsText, /"release_gate": "blocked"/);
  assert.match(
    docsText,
    /"release_gate_reason_code": "cmd-runtime-not-implemented"/,
  );
  assert.match(
    docsText,
    /"non_qualifying_cases": "stay_fail_closed_blocked"/,
  );
  assert.match(
    docsText,
    /"runtime_status": "implemented"/,
  );
  assert.match(
    docsText,
    /All non-qualifying or ambiguous `"CMD_PROFILE"` cases remain on the current fail-closed blocked baseline/,
  );
  assert.match(
    docsText,
    /Current `SWE_BODELNING` behavior is unchanged/,
  );
});

test("current SWE_BODELNING behavior remains unchanged", () => {
  assert.equal(
    sweBodelningReleaseEvalRun.properties.jurisdiction_profile_key.const,
    "SWE_BODELNING",
  );
  assert.deepEqual(
    sweBodelningReleaseEvalRun.properties.profile_input_lane_snapshot.required,
    ["economic_contribution", "shared_use", "shared_intent"],
  );
});

test("release_eval runtime support for CMD_PROFILE remains enabled with the downstream export surfaces runtime-enabled", () => {
  const adapter = getReleaseEvalAdapter("CMD_PROFILE");

  assert.equal(adapter.jurisdiction_profile_key, "CMD_PROFILE");
  assert.equal(typeof adapter.deriveReleaseEvalRun, "function");
  assert.equal(typeof adapter.reconcileReleaseEvalRun, "function");
  assert.equal(isSupportedJurisdictionProfileKey("CMD_PROFILE"), true);
  assert.equal(hasJurisdictionProfileCapability("CMD_PROFILE", "release_eval"), true);
  assert.equal(hasJurisdictionProfileCapability("CMD_PROFILE", "profile_dossier"), true);
  assert.equal(hasJurisdictionProfileCapability("CMD_PROFILE", "export_package"), true);
  assert.equal(
    hasJurisdictionProfileCapability("CMD_PROFILE", "export_package_json_artifact"),
    true,
  );
});

test("no readiness behavior changes are introduced", () => {
  const workerEntries = fs.readdirSync(path.join(__dirname, "..", "workers", "analyze"));
  assert.deepEqual(workerEntries, [".gitkeep"]);
});
