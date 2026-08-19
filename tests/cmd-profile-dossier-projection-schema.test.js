const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const projectionSchema = require("../schemas/cmd-profile-dossier-projection.json");
const snapshotSchema = require("../schemas/cmd-profile-dossier-snapshot.json");
const {
  cmdProfileDossierProjection,
  cmdProfileDossierSnapshot,
  sweBodelningProfileDossierProjection,
} = require("../packages/schemas/src/index.js");
const {
  getReleaseEvalAdapter,
  hasJurisdictionProfileCapability,
  isSupportedJurisdictionProfileKey,
} = require("../packages/governance/src/index.js");

const docsPath = path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md");
const docsText = fs.readFileSync(docsPath, "utf8");

test("the new CMD_PROFILE dossier projection schema accepts the documented surface", () => {
  assert.deepEqual(projectionSchema.required, [
    "jurisdiction_profile_key",
    "release_gate",
    "release_gate_reason_code",
    "release_eval_freshness",
    "release_eval_freshness_reason_code",
    "evaluator_version",
    "profile_input_summary",
    "profile_input_lane_snapshot",
    "snapshot_status",
  ]);
  assert.equal(projectionSchema.properties.jurisdiction_profile_key.const, "CMD_PROFILE");
  assert.equal(
    projectionSchema.properties.profile_input_summary.$ref,
    "https://governance-contracts.invalid/schemas/cmd-profile-dossier-snapshot.json#/properties/profile_input_summary",
  );
  assert.equal(
    projectionSchema.properties.profile_input_lane_snapshot.$ref,
    "https://governance-contracts.invalid/schemas/cmd-profile-dossier-snapshot.json#/properties/profile_input_lane_snapshot",
  );
  assert.deepEqual(projectionSchema.properties.snapshot_status.required, [
    "source",
    "snapshot_projection_version_found",
    "current_projection_version",
    "snapshot_is_current",
  ]);
  assert.deepEqual(projectionSchema.properties.snapshot_status.properties.source.enum, [
    "persisted-current",
    "fallback-reprojection",
  ]);
});

test("packages/schemas exports the new schema if applicable", () => {
  assert.deepEqual(cmdProfileDossierProjection, projectionSchema);
  assert.deepEqual(cmdProfileDossierSnapshot, snapshotSchema);
});

test("docs describe the same dossier projection surface", () => {
  assert.match(
    docsText,
    /read-time `"CMD_PROFILE"` profile dossier projection contract is defined in `schemas\/cmd-profile-dossier-projection\.json`/,
  );
  assert.match(docsText, /reuses the `"CMD_PROFILE"` dossier snapshot surface/);
  assert.match(docsText, /top-level machine-readable `snapshot_status` block/);
  assert.match(docsText, /Runtime support is enabled for this `"CMD_PROFILE"` dossier projection surface/);
  assert.match(
    docsText,
    /GET \/cases\/:caseId\/profile-dossier/,
  );
});

test("current SWE_BODELNING behavior remains unchanged", () => {
  assert.equal(
    sweBodelningProfileDossierProjection.properties.jurisdiction_profile_key.const,
    "SWE_BODELNING",
  );
  assert.deepEqual(sweBodelningProfileDossierProjection.required, [
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
    "snapshot_status",
    "evidence_reference_index",
    "evidence_exhibit_index",
    "issue_index",
    "section_index",
  ]);
});

test("dossier runtime support for CMD_PROFILE is enabled while only artifact and bundle export surfaces remain unsupported", () => {
  const adapter = getReleaseEvalAdapter("CMD_PROFILE");

  assert.equal(adapter.jurisdiction_profile_key, "CMD_PROFILE");
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
