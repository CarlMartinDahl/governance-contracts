const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const schema = require("../schemas/profile-dossier-traceability-alignment.json");
const traceabilityModel = require("../schemas/traceability-model.json");
const sweBodelningProfileDossierSnapshot = require("../schemas/swe-bodelning-profile-dossier-snapshot.json");
const sweBodelningProfileDossierProjection = require("../schemas/swe-bodelning-profile-dossier-projection.json");
const cmdProfileDossierSnapshot = require("../schemas/cmd-profile-dossier-snapshot.json");
const cmdProfileDossierProjection = require("../schemas/cmd-profile-dossier-projection.json");
const {
  profileDossierTraceabilityAlignment,
  validateProfileDossierTraceabilityAlignment,
} = require("../packages/schemas/src/index.js");

const docsPath = path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md");
const docsText = fs.readFileSync(docsPath, "utf8");

function createAlignmentPayload() {
  return {
    SWE_BODELNING_INPUT_INCOMPLETE: {
      jurisdiction_profile_key: "SWE_BODELNING",
      release_gate: "blocked",
      release_eval_freshness: "current",
      release_gate_reason_code: "swe-bodelning-input-incomplete",
      traceability: {
        input_references: ["profile_input_summary.missing_value_lane_keys"],
        documented_rule_references: [
          "docs/API_CONTRACTS_GOVERNANCE_v1.md::swe-bodelning-input-incomplete",
          "docs/MODEL_INFORMATION_PRINCIPLES_v1.md::traceability-principle",
        ],
        canonical_output_references: [
          "schemas/swe-bodelning-profile-dossier-snapshot.json",
          "schemas/swe-bodelning-profile-dossier-projection.json",
        ],
        change_causes: ["changed_input"],
      },
    },
    SWE_BODELNING_SUPPORT_INCOMPLETE: {
      jurisdiction_profile_key: "SWE_BODELNING",
      release_gate: "blocked",
      release_eval_freshness: "current",
      release_gate_reason_code: "swe-bodelning-support-incomplete",
      traceability: {
        input_references: ["profile_input_summary.missing_support_lane_keys"],
        documented_rule_references: [
          "docs/API_CONTRACTS_GOVERNANCE_v1.md::swe-bodelning-support-incomplete",
          "docs/MODEL_INFORMATION_PRINCIPLES_v1.md::traceability-principle",
        ],
        canonical_output_references: [
          "schemas/swe-bodelning-profile-dossier-snapshot.json",
          "schemas/swe-bodelning-profile-dossier-projection.json",
        ],
        change_causes: ["changed_support"],
      },
    },
    CMD_PROFILE_INPUT_INCOMPLETE: {
      jurisdiction_profile_key: "CMD_PROFILE",
      release_gate: "blocked",
      release_eval_freshness: "current",
      release_gate_reason_code: "cmd-input-incomplete",
      traceability: {
        input_references: ["profile_input_summary.missing_value_lane_keys"],
        documented_rule_references: [
          "docs/API_CONTRACTS_GOVERNANCE_v1.md::cmd-input-incomplete",
          "docs/MODEL_INFORMATION_PRINCIPLES_v1.md::traceability-principle",
        ],
        canonical_output_references: [
          "schemas/cmd-profile-dossier-snapshot.json",
          "schemas/cmd-profile-dossier-projection.json",
        ],
        change_causes: ["changed_input"],
      },
    },
    CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED: {
      jurisdiction_profile_key: "CMD_PROFILE",
      release_gate: "blocked",
      release_eval_freshness: "current",
      release_gate_reason_code: "cmd-runtime-not-implemented",
      traceability: {
        input_references: ["profile_input_lane_snapshot.cmd_primary_signal.value"],
        documented_rule_references: [
          "docs/API_CONTRACTS_GOVERNANCE_v1.md::cmd-primary-signal-present-but-runtime-not-implemented",
          "docs/MODEL_INFORMATION_PRINCIPLES_v1.md::traceability-principle",
        ],
        canonical_output_references: [
          "schemas/cmd-profile-dossier-snapshot.json",
          "schemas/cmd-profile-dossier-projection.json",
        ],
        change_causes: ["changed_input", "changed_rule"],
      },
    },
  };
}

test("the current documented profile_dossier input-incomplete baseline has canonical traceability alignment where docs are concrete enough", () => {
  const payload = createAlignmentPayload();

  assert.deepEqual(validateProfileDossierTraceabilityAlignment(payload), payload);
  assert.equal(
    payload.SWE_BODELNING_INPUT_INCOMPLETE.release_gate_reason_code,
    "swe-bodelning-input-incomplete",
  );
  assert.deepEqual(payload.SWE_BODELNING_INPUT_INCOMPLETE.traceability, {
    input_references: ["profile_input_summary.missing_value_lane_keys"],
    documented_rule_references: [
      "docs/API_CONTRACTS_GOVERNANCE_v1.md::swe-bodelning-input-incomplete",
      "docs/MODEL_INFORMATION_PRINCIPLES_v1.md::traceability-principle",
    ],
    canonical_output_references: [
      "schemas/swe-bodelning-profile-dossier-snapshot.json",
      "schemas/swe-bodelning-profile-dossier-projection.json",
    ],
    change_causes: ["changed_input"],
  });
  assert.equal(
    payload.CMD_PROFILE_INPUT_INCOMPLETE.release_gate_reason_code,
    "cmd-input-incomplete",
  );
  assert.deepEqual(payload.CMD_PROFILE_INPUT_INCOMPLETE.traceability, {
    input_references: ["profile_input_summary.missing_value_lane_keys"],
    documented_rule_references: [
      "docs/API_CONTRACTS_GOVERNANCE_v1.md::cmd-input-incomplete",
      "docs/MODEL_INFORMATION_PRINCIPLES_v1.md::traceability-principle",
    ],
    canonical_output_references: [
      "schemas/cmd-profile-dossier-snapshot.json",
      "schemas/cmd-profile-dossier-projection.json",
    ],
    change_causes: ["changed_input"],
  });
});

test("the current documented profile_dossier support-incomplete baseline has canonical traceability alignment where docs are concrete enough", () => {
  const payload = createAlignmentPayload();

  assert.deepEqual(validateProfileDossierTraceabilityAlignment(payload), payload);
  assert.equal(
    payload.SWE_BODELNING_SUPPORT_INCOMPLETE.release_gate_reason_code,
    "swe-bodelning-support-incomplete",
  );
  assert.deepEqual(payload.SWE_BODELNING_SUPPORT_INCOMPLETE.traceability, {
    input_references: ["profile_input_summary.missing_support_lane_keys"],
    documented_rule_references: [
      "docs/API_CONTRACTS_GOVERNANCE_v1.md::swe-bodelning-support-incomplete",
      "docs/MODEL_INFORMATION_PRINCIPLES_v1.md::traceability-principle",
    ],
    canonical_output_references: [
      "schemas/swe-bodelning-profile-dossier-snapshot.json",
      "schemas/swe-bodelning-profile-dossier-projection.json",
    ],
    change_causes: ["changed_support"],
  });
});

test("the current documented first CMD_PROFILE rule as reflected in profile_dossier has canonical traceability alignment where docs are concrete enough", () => {
  const payload = createAlignmentPayload();

  assert.deepEqual(validateProfileDossierTraceabilityAlignment(payload), payload);
  assert.equal(
    payload.CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED
      .release_gate_reason_code,
    "cmd-runtime-not-implemented",
  );
  assert.deepEqual(
    payload.CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED.traceability,
    {
      input_references: ["profile_input_lane_snapshot.cmd_primary_signal.value"],
      documented_rule_references: [
        "docs/API_CONTRACTS_GOVERNANCE_v1.md::cmd-primary-signal-present-but-runtime-not-implemented",
        "docs/MODEL_INFORMATION_PRINCIPLES_v1.md::traceability-principle",
      ],
      canonical_output_references: [
        "schemas/cmd-profile-dossier-snapshot.json",
        "schemas/cmd-profile-dossier-projection.json",
      ],
      change_causes: ["changed_input", "changed_rule"],
    },
  );
});

test("packages/schemas exports the profile_dossier traceability alignment surface if applicable", () => {
  assert.deepEqual(profileDossierTraceabilityAlignment, schema);
  assert.equal(typeof validateProfileDossierTraceabilityAlignment, "function");
  assert.equal(
    schema.properties.SWE_BODELNING_INPUT_INCOMPLETE.properties.traceability.allOf[0]
      .$ref,
    "./traceability-model.json",
  );
  assert.equal(
    schema.properties.CMD_PROFILE_PRIMARY_SIGNAL_PRESENT_RUNTIME_NOT_IMPLEMENTED
      .properties.traceability.allOf[0].$ref,
    "./traceability-model.json",
  );
  assert.deepEqual(traceabilityModel.required, [
    "input_references",
    "documented_rule_references",
    "canonical_output_references",
  ]);
  assert.equal(
    sweBodelningProfileDossierProjection.properties.snapshot_status.type,
    "object",
  );
  assert.equal(
    cmdProfileDossierProjection.properties.snapshot_status.type,
    "object",
  );
  assert.equal(sweBodelningProfileDossierSnapshot.properties.release_gate.type, "string");
  assert.equal(cmdProfileDossierSnapshot.properties.release_gate.type, "string");
});

test("docs describe the same profile_dossier-to-traceability alignment", () => {
  assert.match(
    docsText,
    /shared `profile_dossier` seam is also explicitly aligned to the neutral traceability contract through `schemas\/profile-dossier-traceability-alignment\.json`/i,
  );
  assert.match(docsText, /exported through `packages\/schemas`/);
  assert.match(docsText, /`swe-bodelning-input-incomplete`/);
  assert.match(docsText, /`swe-bodelning-support-incomplete`/);
  assert.match(docsText, /`cmd-input-incomplete`/);
  assert.match(
    docsText,
    /`cmd-primary-signal-present-but-runtime-not-implemented`/,
  );
  assert.match(docsText, /`changed_input`/);
  assert.match(docsText, /`changed_support`/);
  assert.match(docsText, /`changed_rule`/);
  assert.match(
    docsText,
    /Dossier `snapshot_status` currentness reporting remains intentionally outside this dossier traceability alignment surface/i,
  );
});

test("no runtime behavior changes are introduced", () => {
  const workerEntries = fs.readdirSync(path.join(__dirname, "..", "workers", "analyze"));
  assert.deepEqual(workerEntries, [".gitkeep"]);
});
