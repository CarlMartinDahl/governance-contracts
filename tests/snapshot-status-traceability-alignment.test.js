const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const schema = require("../schemas/snapshot-status-traceability-alignment.json");
const traceabilityModel = require("../schemas/traceability-model.json");
const sweBodelningProfileDossierProjection = require("../schemas/swe-bodelning-profile-dossier-projection.json");
const cmdProfileDossierProjection = require("../schemas/cmd-profile-dossier-projection.json");
const sweBodelningExportPackageProjection = require("../schemas/swe-bodelning-export-package-projection.json");
const cmdExportPackageProjection = require("../schemas/cmd-export-package-projection.json");
const sweBodelningExportPackageBundleManifestProjection = require("../schemas/swe-bodelning-export-package-bundle-manifest-projection.json");
const cmdExportPackageBundleManifestProjection = require("../schemas/cmd-export-package-bundle-manifest-projection.json");
const sweBodelningExportPackageBundleArchiveArtifactProjection = require("../schemas/swe-bodelning-export-package-bundle-archive-artifact-projection.json");
const cmdExportPackageBundleArchiveArtifactProjection = require("../schemas/cmd-export-package-bundle-archive-artifact-projection.json");
const {
  snapshotStatusTraceabilityAlignment,
  validateSnapshotStatusTraceabilityAlignment,
} = require("../packages/schemas/src/index.js");

const repoRoot = path.join(__dirname, "..");
const docsPath = path.join(repoRoot, "docs", "API_CONTRACTS_GOVERNANCE_v1.md");
const docsText = fs.readFileSync(docsPath, "utf8");
const jsonDeliveryTestText = fs.readFileSync(
  path.join(repoRoot, "tests", "export-package-json-artifact-delivery-api.test.js"),
  "utf8",
);
const markdownDeliveryTestText = fs.readFileSync(
  path.join(repoRoot, "tests", "export-package-markdown-artifact-delivery-api.test.js"),
  "utf8",
);
const pdfDeliveryTestText = fs.readFileSync(
  path.join(repoRoot, "tests", "export-package-pdf-artifact-delivery-api.test.js"),
  "utf8",
);
const docxDeliveryTestText = fs.readFileSync(
  path.join(repoRoot, "tests", "export-package-docx-artifact-delivery-api.test.js"),
  "utf8",
);
const bundleArchiveDeliveryTestText = fs.readFileSync(
  path.join(repoRoot, "tests", "export-package-bundle-archive-artifact-delivery-api.test.js"),
  "utf8",
);

function createAlignmentPayload() {
  return {
    alignment_scope: schema.properties.alignment_scope.const,
    supported_snapshot_status_sources:
      schema.properties.supported_snapshot_status_sources.items.enum,
    unaligned_snapshot_status_sources:
      schema.properties.unaligned_snapshot_status_sources.items.enum,
    CURRENT_SHARED_SNAPSHOT_STATUS: {
      snapshot_status_source:
        schema.properties.CURRENT_SHARED_SNAPSHOT_STATUS.properties.snapshot_status_source
          .const,
      snapshot_is_current:
        schema.properties.CURRENT_SHARED_SNAPSHOT_STATUS.properties.snapshot_is_current
          .const,
      persisted_snapshot_references:
        schema.properties.CURRENT_SHARED_SNAPSHOT_STATUS.properties
          .persisted_snapshot_references.items.enum,
      current_source_references:
        schema.properties.CURRENT_SHARED_SNAPSHOT_STATUS.properties
          .current_source_references.items.enum,
      projection_references:
        schema.properties.CURRENT_SHARED_SNAPSHOT_STATUS.properties.projection_references
          .items.enum,
      traceability: {
        input_references:
          schema.properties.CURRENT_SHARED_SNAPSHOT_STATUS.properties.traceability.allOf[1]
            .properties.input_references.items.enum,
        documented_rule_references:
          schema.properties.CURRENT_SHARED_SNAPSHOT_STATUS.properties.traceability.allOf[1]
            .properties.documented_rule_references.items.enum,
        canonical_output_references:
          schema.properties.CURRENT_SHARED_SNAPSHOT_STATUS.properties.traceability.allOf[1]
            .properties.canonical_output_references.items.enum,
      },
    },
    STALE_SHARED_SNAPSHOT_STATUS: {
      snapshot_status_source:
        schema.properties.STALE_SHARED_SNAPSHOT_STATUS.properties.snapshot_status_source
          .const,
      snapshot_is_current:
        schema.properties.STALE_SHARED_SNAPSHOT_STATUS.properties.snapshot_is_current
          .const,
      persisted_snapshot_references:
        schema.properties.STALE_SHARED_SNAPSHOT_STATUS.properties
          .persisted_snapshot_references.items.enum,
      current_source_references:
        schema.properties.STALE_SHARED_SNAPSHOT_STATUS.properties
          .current_source_references.items.enum,
      projection_references:
        schema.properties.STALE_SHARED_SNAPSHOT_STATUS.properties.projection_references
          .items.enum,
      traceability: {
        input_references:
          schema.properties.STALE_SHARED_SNAPSHOT_STATUS.properties.traceability.allOf[1]
            .properties.input_references.items.enum,
        documented_rule_references:
          schema.properties.STALE_SHARED_SNAPSHOT_STATUS.properties.traceability.allOf[1]
            .properties.documented_rule_references.items.enum,
        canonical_output_references:
          schema.properties.STALE_SHARED_SNAPSHOT_STATUS.properties.traceability.allOf[1]
            .properties.canonical_output_references.items.enum,
      },
    },
  };
}

test("the shared current snapshot_status case has canonical traceability alignment where docs are concrete enough", () => {
  const payload = createAlignmentPayload();

  assert.deepEqual(validateSnapshotStatusTraceabilityAlignment(payload), payload);
  assert.equal(
    payload.CURRENT_SHARED_SNAPSHOT_STATUS.snapshot_status_source,
    "persisted-current",
  );
  assert.equal(payload.CURRENT_SHARED_SNAPSHOT_STATUS.snapshot_is_current, true);
  assert.ok(
    payload.CURRENT_SHARED_SNAPSHOT_STATUS.persisted_snapshot_references.includes(
      "schemas/swe-bodelning-profile-dossier-snapshot.json",
    ),
  );
  assert.ok(
    payload.CURRENT_SHARED_SNAPSHOT_STATUS.persisted_snapshot_references.includes(
      "schemas/cmd-export-package-bundle-archive-artifact.json",
    ),
  );
  assert.ok(
    payload.CURRENT_SHARED_SNAPSHOT_STATUS.current_source_references.includes(
      "docs/API_CONTRACTS_GOVERNANCE_v1.md::snapshot-status-profile-dossier-current-source",
    ),
  );
  assert.ok(
    payload.CURRENT_SHARED_SNAPSHOT_STATUS.projection_references.includes(
      "schemas/cmd-profile-dossier-projection.json",
    ),
  );
  assert.ok(
    payload.CURRENT_SHARED_SNAPSHOT_STATUS.projection_references.includes(
      "schemas/swe-bodelning-export-package-bundle-manifest-projection.json",
    ),
  );
  assert.deepEqual(
    payload.CURRENT_SHARED_SNAPSHOT_STATUS.traceability.documented_rule_references,
    [
      "docs/API_CONTRACTS_GOVERNANCE_v1.md::shared-snapshot-status-current-traceability",
      "docs/MODEL_INFORMATION_PRINCIPLES_v1.md::traceability-principle",
    ],
  );
});

test("the shared stale snapshot_status case has canonical traceability alignment where docs are concrete enough", () => {
  const payload = createAlignmentPayload();

  assert.deepEqual(validateSnapshotStatusTraceabilityAlignment(payload), payload);
  assert.equal(
    payload.STALE_SHARED_SNAPSHOT_STATUS.snapshot_status_source,
    "persisted-stale",
  );
  assert.equal(payload.STALE_SHARED_SNAPSHOT_STATUS.snapshot_is_current, false);
  assert.ok(
    payload.STALE_SHARED_SNAPSHOT_STATUS.persisted_snapshot_references.includes(
      "schemas/swe-bodelning-export-package.json",
    ),
  );
  assert.ok(
    payload.STALE_SHARED_SNAPSHOT_STATUS.persisted_snapshot_references.includes(
      "schemas/cmd-export-package-docx-artifact.json",
    ),
  );
  assert.ok(
    payload.STALE_SHARED_SNAPSHOT_STATUS.current_source_references.includes(
      "docs/API_CONTRACTS_GOVERNANCE_v1.md::snapshot-status-bundle-archive-current-source",
    ),
  );
  assert.ok(
    payload.STALE_SHARED_SNAPSHOT_STATUS.projection_references.includes(
      "schemas/cmd-export-package-projection.json",
    ),
  );
  assert.ok(
    payload.STALE_SHARED_SNAPSHOT_STATUS.projection_references.includes(
      "schemas/swe-bodelning-export-package-json-artifact-projection.json",
    ),
  );
  assert.deepEqual(
    payload.STALE_SHARED_SNAPSHOT_STATUS.traceability.documented_rule_references,
    [
      "docs/API_CONTRACTS_GOVERNANCE_v1.md::shared-snapshot-status-stale-traceability",
      "docs/MODEL_INFORMATION_PRINCIPLES_v1.md::traceability-principle",
    ],
  );
});

test("packages/schemas exports the shared snapshot_status traceability alignment surface if applicable", () => {
  const payload = createAlignmentPayload();

  assert.deepEqual(snapshotStatusTraceabilityAlignment, schema);
  assert.equal(typeof validateSnapshotStatusTraceabilityAlignment, "function");
  assert.deepEqual(traceabilityModel.required, [
    "input_references",
    "documented_rule_references",
    "canonical_output_references",
  ]);
  assert.equal(
    sweBodelningProfileDossierProjection.properties.snapshot_status.type,
    "object",
  );
  assert.equal(cmdProfileDossierProjection.properties.snapshot_status.type, "object");
  assert.equal(
    sweBodelningExportPackageProjection.properties.snapshot_status.type,
    "object",
  );
  assert.equal(cmdExportPackageProjection.properties.snapshot_status.type, "object");
  assert.equal(
    sweBodelningExportPackageBundleManifestProjection.properties.snapshot_status.type,
    "object",
  );
  assert.equal(
    cmdExportPackageBundleManifestProjection.properties.snapshot_status.type,
    "object",
  );
  assert.equal(
    sweBodelningExportPackageBundleArchiveArtifactProjection.properties.snapshot_status
      .type,
    "object",
  );
  assert.equal(
    cmdExportPackageBundleArchiveArtifactProjection.properties.snapshot_status.type,
    "object",
  );

  for (const ref of [
    ...payload.CURRENT_SHARED_SNAPSHOT_STATUS.persisted_snapshot_references,
    ...payload.CURRENT_SHARED_SNAPSHOT_STATUS.projection_references,
    ...payload.STALE_SHARED_SNAPSHOT_STATUS.persisted_snapshot_references,
    ...payload.STALE_SHARED_SNAPSHOT_STATUS.projection_references,
  ]) {
    assert.equal(fs.existsSync(path.join(repoRoot, ref)), true, `${ref} should exist`);
  }
});

test("docs describe the same shared snapshot_status-to-traceability alignment", () => {
  assert.match(
    docsText,
    /shared `snapshot_status` currentness seam is explicitly aligned to the neutral traceability contract through `schemas\/snapshot-status-traceability-alignment\.json`/i,
  );
  assert.match(docsText, /exported through `packages\/schemas`/i);
  assert.match(docsText, /`CURRENT_SHARED_SNAPSHOT_STATUS`/);
  assert.match(docsText, /`STALE_SHARED_SNAPSHOT_STATUS`/);
  assert.match(docsText, /`source = persisted-current`/i);
  assert.match(docsText, /`source = persisted-stale`/i);
  assert.match(
    docsText,
    /`snapshot_status\.source = fallback-reprojection` remains intentionally outside this first shared snapshot-status traceability alignment surface/i,
  );
  assert.match(
    docsText,
    /Shared Snapshot Status Fallback-Reprojection Traceability Prerequisites/i,
  );
  assert.match(
    docsText,
    /the currently aligned shared currentness cases remain only:\s+`persisted-current`\s+`persisted-stale`/i,
  );
  assert.match(
    docsText,
    /schema-invalid current-version fallback reprojection/i,
  );
  assert.match(
    docsText,
    /adding a shared traceability mapping now would require guessing/i,
  );
  assert.match(
    docsText,
    /no shared `snapshot_status` traceability alignment for `fallback-reprojection` should be implemented until explicit contract detail defines the allowed canonical cause mapping/i,
  );
  assert.match(
    docsText,
    /undocumented fallback-reprojection mappings must remain blocked from implementation/i,
  );
  assert.match(
    docsText,
    /current-only delivery responses for JSON, Markdown, PDF, DOCX, and final bundle\/archive downloads remain behaviorally unchanged/i,
  );
  assert.match(
    docsText,
    /auth, access, and general API error envelopes remain outside this slice/i,
  );
  assert.match(
    docsText,
    /it does not change current delivery or projection runtime behavior, and it is narrower than auth, access, and general route\/error semantics/i,
  );
});

test("docs keep fallback-reprojection partitioned into the two evidenced dossier-only currentness subcases", () => {
  assert.match(
    docsText,
    /`snapshot_status\.source = fallback-reprojection` is not yet one proven canonical shared cause/i,
  );
  assert.match(
    docsText,
    /the currently evidenced dossier-only fallback-reprojection subcases are exactly:/i,
  );
  assert.match(docsText, /`older projection-version fallback reprojection`/);
  assert.match(
    docsText,
    /older stored `profile_dossier_snapshot\.projection_version` than the current dossier projection version triggers fallback reprojection/i,
  );
  assert.match(docsText, /`schema-invalid current-version fallback reprojection`/);
  assert.match(
    docsText,
    /stored current-version dossier snapshot fails schema-validity\/currentness checks and therefore triggers fallback reprojection/i,
  );
  assert.match(
    docsText,
    /both currently evidenced dossier-only fallback-reprojection subcases remain explicitly outside shared traceability alignment until a narrower or broader principle-level mapping is explicitly proven/i,
  );
});

test("current-only delivery semantics remain unchanged and merely consume the same snapshot_status seam", () => {
  assert.match(
    jsonDeliveryTestText,
    /ERR_EXPORT_PACKAGE_JSON_ARTIFACT_SNAPSHOT_NOT_CURRENT/,
  );
  assert.match(jsonDeliveryTestText, /response\.body\.error\.snapshot_status/);
  assert.match(
    markdownDeliveryTestText,
    /ERR_EXPORT_PACKAGE_MARKDOWN_ARTIFACT_SNAPSHOT_NOT_CURRENT/,
  );
  assert.match(markdownDeliveryTestText, /response\.body\.error\.snapshot_status/);
  assert.match(
    pdfDeliveryTestText,
    /ERR_EXPORT_PACKAGE_PDF_ARTIFACT_SNAPSHOT_NOT_CURRENT/,
  );
  assert.match(pdfDeliveryTestText, /response\.body\.error\.snapshot_status/);
  assert.match(
    docxDeliveryTestText,
    /ERR_EXPORT_PACKAGE_DOCX_ARTIFACT_SNAPSHOT_NOT_CURRENT/,
  );
  assert.match(docxDeliveryTestText, /response\.body\.error\.snapshot_status/);
  assert.match(
    bundleArchiveDeliveryTestText,
    /ERR_EXPORT_PACKAGE_BUNDLE_ARCHIVE_ARTIFACT_SNAPSHOT_NOT_CURRENT/,
  );
  assert.match(bundleArchiveDeliveryTestText, /response\.body\.error\.snapshot_status/);
});

test("no runtime behavior changes are introduced", () => {
  const workerEntries = fs.readdirSync(path.join(repoRoot, "workers", "analyze"));
  assert.deepEqual(workerEntries, [".gitkeep"]);
});
