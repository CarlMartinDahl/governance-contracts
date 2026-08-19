const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const schema = require("../schemas/cmd-profile-input.json");
const {
  cmdProfileInput,
  sweBodelningProfileInput,
} = require("../packages/schemas/src/index.js");
const {
  getJurisdictionProfileRegistryEntry,
  hasJurisdictionProfileCapability,
  isSupportedJurisdictionProfileKey,
  jurisdictionProfileRegistry,
} = require("../packages/governance/src/index.js");

const docsPath = path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md");
const docsText = fs.readFileSync(docsPath, "utf8");

test("the new profile-input schema accepts the documented normalized lane structure", () => {
  assert.equal(schema.properties.jurisdiction_profile_key.const, "CMD_PROFILE");
  assert.deepEqual(schema.properties.profile_input_lane_snapshot.required, ["cmd_primary_signal"]);
  assert.deepEqual(
    Object.keys(schema.properties.profile_input_lane_snapshot.properties),
    ["cmd_primary_signal"],
  );
  assert.equal(schema.properties.profile_input_summary.properties.required_lane_count.const, 1);
  assert.deepEqual(
    schema.properties.profile_input_summary.properties.missing_value_lane_keys.items.enum,
    ["cmd_primary_signal"],
  );
});

test("packages/schemas exports the new profile schema", () => {
  assert.deepEqual(cmdProfileInput, schema);
});

test("docs describe the same profile-input surface and duplicate-source normalization", () => {
  assert.match(docsText, /The next documented profile declaration is `"CMD_PROFILE"`/);
  assert.match(
    docsText,
    /The provided raw required lane input list is `"cmd_primary_signal"`, `"cmd_primary_signal"`, `"cmd_primary_signal"`/,
  );
  assert.match(
    docsText,
    /normalizes that required lane set to `"cmd_primary_signal"` only/,
  );
  assert.match(
    docsText,
    /Runtime support is enabled for `profile_inputs`, `release_eval`, `profile_dossier`, `export_package`, `export_package_json_artifact`, `export_package_markdown_artifact`, `export_package_pdf_artifact`, `export_package_docx_artifact`, `export_package_bundle_manifest`, and `export_package_bundle_archive_artifact` on `"CMD_PROFILE"`/,
  );
  assert.match(
    docsText,
    /explicit `"CMD_PROFILE"` entry with those capability flags set to `true` through the final bundle\/archive surface in this slice/,
  );
});

test("current SWE_BODELNING behavior remains unchanged", () => {
  assert.equal(sweBodelningProfileInput.properties.jurisdiction_profile_key.const, "SWE_BODELNING");
  assert.deepEqual(
    sweBodelningProfileInput.properties.profile_input_lane_snapshot.required,
    ["economic_contribution", "shared_use", "shared_intent"],
  );
});

test("runtime support for CMD_PROFILE includes profile inputs, release_eval, profile_dossier, export_package, JSON artifact, Markdown artifact, PDF artifact, DOCX artifact, bundle/package manifest, and final bundle/archive", () => {
  assert.deepEqual(getJurisdictionProfileRegistryEntry("CMD_PROFILE"), {
    jurisdiction_profile_key: "CMD_PROFILE",
    capabilities: {
      profile_inputs: true,
      release_eval: true,
      profile_dossier: true,
      export_package: true,
      export_package_json_artifact: true,
      export_package_markdown_artifact: true,
      export_package_pdf_artifact: true,
      export_package_docx_artifact: true,
      export_package_bundle_manifest: true,
      export_package_bundle_archive_artifact: true,
    },
  });
  assert.equal(isSupportedJurisdictionProfileKey("CMD_PROFILE"), true);
  assert.equal(hasJurisdictionProfileCapability("CMD_PROFILE", "profile_inputs"), true);
  assert.equal(hasJurisdictionProfileCapability("CMD_PROFILE", "release_eval"), true);
  assert.equal(hasJurisdictionProfileCapability("CMD_PROFILE", "profile_dossier"), true);
  assert.equal(hasJurisdictionProfileCapability("CMD_PROFILE", "export_package"), true);
  assert.equal(hasJurisdictionProfileCapability("CMD_PROFILE", "export_package_docx_artifact"), true);
  assert.equal(
    hasJurisdictionProfileCapability("CMD_PROFILE", "export_package_bundle_manifest"),
    true,
  );
  assert.equal(
    hasJurisdictionProfileCapability(
      "CMD_PROFILE",
      "export_package_bundle_archive_artifact",
    ),
    true,
  );
  assert.deepEqual(Object.keys(jurisdictionProfileRegistry), ["SWE_BODELNING", "CMD_PROFILE"]);
});

test("no readiness behavior changes are introduced", () => {
  const workerEntries = fs.readdirSync(path.join(__dirname, "..", "workers", "analyze"));
  assert.deepEqual(workerEntries, [".gitkeep"]);
});
