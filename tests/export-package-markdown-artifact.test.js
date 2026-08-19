const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const schema = require("../schemas/swe-bodelning-export-package-markdown-artifact.json");
const {
  deriveSWEBodelningExportPackage,
  deriveSWEBodelningExportPackageMarkdownArtifact,
  deriveSWEBodelningExportPackageVersion,
  deriveSWEBodelningProfileDossierSnapshot,
  deriveSWEBodelningReleaseEvalBaseline,
  deriveSWEBodelningReleaseEvalEvaluatorVersion,
} = require("../packages/governance/src/index.js");
const {
  sweBodelningExportPackageMarkdownArtifact,
  validateSWEBodelningExportPackageMarkdownArtifact,
} = require("../packages/schemas/src/index.js");

const docsPath = path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md");
const docsText = fs.readFileSync(docsPath, "utf8");

const canonicalBaseline = deriveSWEBodelningReleaseEvalBaseline();
const canonicalEvaluatorVersion = deriveSWEBodelningReleaseEvalEvaluatorVersion();
const currentFreshnessReasonCode = "evaluator-version-current";
const canonicalPersistedAt = "2026-03-24T10:00:00.000Z";
const canonicalGeneratedAt = "2026-03-24T12:00:00.000Z";

function toCanonicalJson(value) {
  if (Array.isArray(value)) {
    return `[${value.map((item) => toCanonicalJson(item)).join(",")}]`;
  }

  if (value && typeof value === "object") {
    const entries = Object.keys(value)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${toCanonicalJson(value[key])}`);
    return `{${entries.join(",")}}`;
  }

  return JSON.stringify(value);
}

function buildExpectedMarkdownBody(exportPackage) {
  return [
    "# SWE_BODELNING Export Package",
    "",
    "## Metadata",
    "",
    `- \`jurisdiction_profile_key\`: \`${exportPackage.jurisdiction_profile_key}\``,
    `- \`export_version\`: \`${exportPackage.export_version}\``,
    `- \`dossier_fingerprint\`: \`${exportPackage.dossier_fingerprint}\``,
    `- \`generated_at\`: \`${exportPackage.generated_at}\``,
    "",
    "## Canonical Source",
    "",
    "```json",
    toCanonicalJson(exportPackage.canonical_source),
    "```",
    "",
    "## Manifest",
    "",
    "```json",
    toCanonicalJson(exportPackage.manifest),
    "```",
    "",
    "## Profile Dossier Snapshot",
    "",
    "```json",
    toCanonicalJson(exportPackage.profile_dossier_snapshot),
    "```",
    "",
  ].join("\n");
}

function createValidReleaseEvalRun(overrides = {}) {
  const releaseEvalRun = {
    jurisdiction_profile_key: "SWE_BODELNING",
    release_eval_run_id: "release-eval-run-1",
    evaluator_version: canonicalEvaluatorVersion,
    release_gate: canonicalBaseline.release_gate,
    release_gate_reason_code: canonicalBaseline.release_gate_reason_code,
    release_eval_freshness: canonicalBaseline.release_eval_freshness,
    release_eval_freshness_reason_code: currentFreshnessReasonCode,
    profile_input_summary: {
      required_lane_count: 3,
      lanes_with_value_count: 2,
      missing_value_lane_keys: ["shared_intent"],
      lanes_with_support_count: 2,
      missing_support_lane_keys: ["shared_intent"],
    },
    profile_input_lane_snapshot: {
      economic_contribution: {
        has_value: true,
        value: "documented",
        evidence_object_ids: ["evidence-1"],
        has_support: true,
      },
      shared_use: {
        has_value: true,
        value: "residence",
        evidence_object_ids: ["evidence-2"],
        has_support: true,
      },
      shared_intent: {
        has_value: false,
        value: null,
        evidence_object_ids: [],
        has_support: false,
      },
    },
    ...overrides,
  };

  return {
    ...releaseEvalRun,
    profile_dossier_snapshot: deriveSWEBodelningProfileDossierSnapshot(releaseEvalRun, {
      persisted_at: canonicalPersistedAt,
    }),
  };
}

test("the governance helper derives a valid Markdown export artifact from a canonical SWE_BODELNING export package snapshot", () => {
  const exportPackage = deriveSWEBodelningExportPackage(createValidReleaseEvalRun(), {
    generated_at: canonicalGeneratedAt,
  });
  const artifact = deriveSWEBodelningExportPackageMarkdownArtifact(exportPackage);

  assert.deepEqual(artifact, {
    artifact_type: "export-package-markdown",
    filename: `${deriveSWEBodelningExportPackageVersion()}-${exportPackage.dossier_fingerprint}.md`,
    content_type: "text/markdown",
    encoding: "utf-8",
    body_utf8: buildExpectedMarkdownBody(exportPackage),
  });
  assert.deepEqual(validateSWEBodelningExportPackageMarkdownArtifact(artifact), artifact);
});

test("the canonical Markdown export artifact schema includes the required artifact fields", () => {
  assert.deepEqual(schema.required, [
    "artifact_type",
    "filename",
    "content_type",
    "encoding",
    "body_utf8",
  ]);
  assert.equal(schema.properties.artifact_type.const, "export-package-markdown");
  assert.equal(schema.properties.content_type.const, "text/markdown");
  assert.equal(schema.properties.encoding.const, "utf-8");
});

test("identical canonical inputs plus identical generated_at yield the same artifact filename and Markdown body", () => {
  const firstArtifact = deriveSWEBodelningExportPackageMarkdownArtifact(
    deriveSWEBodelningExportPackage(createValidReleaseEvalRun(), {
      generated_at: canonicalGeneratedAt,
    }),
  );
  const secondArtifact = deriveSWEBodelningExportPackageMarkdownArtifact(
    deriveSWEBodelningExportPackage(createValidReleaseEvalRun(), {
      generated_at: canonicalGeneratedAt,
    }),
  );

  assert.equal(firstArtifact.filename, secondArtifact.filename);
  assert.equal(firstArtifact.body_utf8, secondArtifact.body_utf8);
});

test("changed canonical export package content yields changed Markdown body where appropriate", () => {
  const firstArtifact = deriveSWEBodelningExportPackageMarkdownArtifact(
    deriveSWEBodelningExportPackage(createValidReleaseEvalRun(), {
      generated_at: canonicalGeneratedAt,
    }),
  );
  const secondArtifact = deriveSWEBodelningExportPackageMarkdownArtifact(
    deriveSWEBodelningExportPackage(
      createValidReleaseEvalRun({
        profile_input_summary: {
          required_lane_count: 3,
          lanes_with_value_count: 3,
          missing_value_lane_keys: [],
          lanes_with_support_count: 3,
          missing_support_lane_keys: [],
        },
        profile_input_lane_snapshot: {
          economic_contribution: {
            has_value: true,
            value: "documented",
            evidence_object_ids: ["evidence-1"],
            has_support: true,
          },
          shared_use: {
            has_value: true,
            value: "residence",
            evidence_object_ids: ["evidence-2"],
            has_support: true,
          },
          shared_intent: {
            has_value: true,
            value: "co-acquisition",
            evidence_object_ids: ["evidence-3"],
            has_support: true,
          },
        },
      }),
      {
        generated_at: canonicalGeneratedAt,
      },
    ),
  );

  assert.notEqual(firstArtifact.body_utf8, secondArtifact.body_utf8);
});

test("the artifact metadata is machine-readable and stable", () => {
  const exportPackage = deriveSWEBodelningExportPackage(createValidReleaseEvalRun(), {
    generated_at: canonicalGeneratedAt,
  });
  const artifact = deriveSWEBodelningExportPackageMarkdownArtifact(exportPackage);

  assert.equal(artifact.artifact_type, "export-package-markdown");
  assert.equal(artifact.content_type, "text/markdown");
  assert.equal(artifact.encoding, "utf-8");
  assert.match(
    artifact.filename,
    new RegExp(`^${deriveSWEBodelningExportPackageVersion()}-[a-f0-9]+\\.md$`),
  );
  assert.match(artifact.body_utf8, /^# SWE_BODELNING Export Package$/m);
  assert.match(artifact.body_utf8, /^## Metadata$/m);
  assert.match(artifact.body_utf8, /^## Canonical Source$/m);
  assert.match(artifact.body_utf8, /^## Manifest$/m);
  assert.match(artifact.body_utf8, /^## Profile Dossier Snapshot$/m);
});

test("packages/schemas exports the Markdown export artifact schema", () => {
  assert.deepEqual(sweBodelningExportPackageMarkdownArtifact, schema);
});

test("non-SWE_BODELNING behavior remains unchanged", () => {
  const exportPackage = deriveSWEBodelningExportPackage(createValidReleaseEvalRun(), {
    generated_at: canonicalGeneratedAt,
  });

  assert.throws(
    () =>
      deriveSWEBodelningExportPackageMarkdownArtifact({
        ...exportPackage,
        jurisdiction_profile_key: "SWE_OTHER",
      }),
    (error) => error.code === "ERR_UNSUPPORTED_JURISDICTION_PROFILE",
  );
});

test("no readiness behavior changes are introduced", () => {
  const exportPackage = deriveSWEBodelningExportPackage(createValidReleaseEvalRun(), {
    generated_at: canonicalGeneratedAt,
  });
  const artifact = deriveSWEBodelningExportPackageMarkdownArtifact(exportPackage);

  assert.equal(exportPackage.profile_dossier_snapshot.release_gate, "blocked");
  assert.equal(
    exportPackage.profile_dossier_snapshot.release_eval_freshness,
    canonicalBaseline.release_eval_freshness,
  );
  assert.match(
    artifact.body_utf8,
    new RegExp(exportPackage.profile_dossier_snapshot.dossier_fingerprint),
  );
  assert.match(
    docsText,
    /schemas\/swe-bodelning-export-package-markdown-artifact\.json/,
  );
  assert.match(
    docsText,
    /used by the shared governance Markdown artifact helper/,
  );
  assert.match(
    docsText,
    /deterministic machine-readable Markdown export artifact/,
  );
  assert.match(
    docsText,
    /aligned to that shared schema surface/,
  );
  assert.match(
    docsText,
    /without introducing persistence, API, or packaging behavior in this slice/,
  );
});
