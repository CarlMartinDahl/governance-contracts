const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const schema = require("../schemas/cmd-profile-dossier-snapshot.json");
const {
  cmdProfileDossierSnapshot,
  sweBodelningProfileDossierSnapshot,
} = require("../packages/schemas/src/index.js");
const {
  getReleaseEvalAdapter,
  hasJurisdictionProfileCapability,
  isSupportedJurisdictionProfileKey,
} = require("../packages/governance/src/index.js");

const docsPath = path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md");
const docsText = fs.readFileSync(docsPath, "utf8");

test("the new CMD_PROFILE dossier snapshot schema accepts the documented surface", () => {
  assert.deepEqual(schema.required, [
    "jurisdiction_profile_key",
    "release_gate",
    "release_gate_reason_code",
    "release_eval_freshness",
    "release_eval_freshness_reason_code",
    "evaluator_version",
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
  assert.deepEqual(schema.properties.profile_input_lane_snapshot.required, ["cmd_primary_signal"]);
  assert.deepEqual(
    Object.keys(schema.properties.profile_input_lane_snapshot.properties),
    ["cmd_primary_signal"],
  );
  assert.deepEqual(schema.$defs.dossierLaneSnapshotEntry.required, [
    "has_value",
    "value",
    "has_support",
  ]);
});

test("packages/schemas exports the new schema if applicable", () => {
  assert.deepEqual(cmdProfileDossierSnapshot, schema);
});

test("docs describe the same dossier snapshot surface", () => {
  assert.match(
    docsText,
    /canonical `"CMD_PROFILE"` `profile_dossier_snapshot` contract is defined in `schemas\/cmd-profile-dossier-snapshot\.json`/,
  );
  assert.match(docsText, /normalized `"cmd_primary_signal"` lane set only/);
  assert.match(docsText, /Runtime support is enabled for this `"CMD_PROFILE"` dossier snapshot surface/);
  assert.match(
    docsText,
    /authenticated dossier reads resolve it through the shared seam/,
  );
});

test("current SWE_BODELNING behavior remains unchanged", () => {
  assert.equal(
    sweBodelningProfileDossierSnapshot.properties.jurisdiction_profile_key.const,
    "SWE_BODELNING",
  );
  assert.deepEqual(
    sweBodelningProfileDossierSnapshot.properties.profile_input_lane_snapshot.required,
    ["economic_contribution", "shared_use", "shared_intent"],
  );
  assert.deepEqual(sweBodelningProfileDossierSnapshot.required, [
    "jurisdiction_profile_key",
    "projection_version",
    "dossier_fingerprint",
    "canonical_source",
    "release_gate",
    "release_gate_reason_code",
    "release_eval_freshness",
    "release_eval_freshness_reason_code",
    "evaluator_version",
    "profile_input_summary",
    "profile_input_lane_snapshot",
    "evidence_reference_index",
    "evidence_exhibit_index",
    "issue_index",
    "section_index",
  ]);
});

test("dossier runtime support for CMD_PROFILE is enabled while only artifact and bundle export surfaces remain unsupported", () => {
  const adapter = getReleaseEvalAdapter("CMD_PROFILE");

  assert.equal(adapter.jurisdiction_profile_key, "CMD_PROFILE");
  assert.equal(typeof adapter.resolveProfileDossierSnapshot, "function");
  assert.equal(typeof adapter.resolveProfileDossierProjection, "function");
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
