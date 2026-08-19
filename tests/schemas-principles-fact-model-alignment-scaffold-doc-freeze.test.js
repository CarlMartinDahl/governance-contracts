const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const docsText = fs.readFileSync(
  path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md"),
  "utf8",
);
const schemasIndexText = fs.readFileSync(
  path.join(__dirname, "..", "packages", "schemas", "src", "index.js"),
  "utf8",
);
const rolloutFreezeText = fs.readFileSync(
  path.join(
    __dirname,
    "..",
    "docs",
    "PRINCIPLES_FACT_MODEL_ROLLOUT_FREEZE_v1.md",
  ),
  "utf8",
);
const modelPrinciplesText = fs.readFileSync(
  path.join(__dirname, "..", "docs", "MODEL_INFORMATION_PRINCIPLES_v1.md"),
  "utf8",
);

test("docs freeze the shared packages/schemas principles/fact-model alignment scaffold as the parent neutral-model and alignment-export seam", () => {
  assert.match(
    docsText,
    /Shared Packages\/Schemas Principles\/Fact-Model Alignment Scaffold Freeze/i,
  );
  assert.match(
    docsText,
    /shared `packages\/schemas` principles\/fact-model alignment scaffold is the canonical shared schema-side neutral-model and alignment-export boundary already surfaced from `packages\/schemas` and is now frozen as the baseline seam/i,
  );

  for (const neutralModel of [
    "semanticFactModel",
    "stopMatrixModel",
    "stopOutcomeModel",
    "traceabilityModel",
  ]) {
    assert.match(docsText, new RegExp("`" + neutralModel + "`"));
    assert.match(schemasIndexText, new RegExp("\\b" + neutralModel + "\\b"));
  }

  for (const alignmentExport of [
    "profileInputSemanticFactAlignment",
    "releaseEvalSemanticFactAlignment",
    "releaseEvalStopMatrixAlignment",
    "releaseEvalStopOutcomeAlignment",
    "releaseEvalTraceabilityAlignment",
    "profileDossierStopMatrixAlignment",
    "profileDossierStopOutcomeAlignment",
    "profileDossierTraceabilityAlignment",
    "exportPackageStopMatrixAlignment",
    "exportPackageStopOutcomeAlignment",
    "exportPackageTraceabilityAlignment",
    "exportPackageJsonArtifactStopMatrixAlignment",
    "exportPackageJsonArtifactStopOutcomeAlignment",
    "exportPackageJsonArtifactTraceabilityAlignment",
    "exportPackageMarkdownArtifactStopMatrixAlignment",
    "exportPackageMarkdownArtifactStopOutcomeAlignment",
    "exportPackageMarkdownArtifactTraceabilityAlignment",
    "exportPackagePdfArtifactStopMatrixAlignment",
    "exportPackagePdfArtifactStopOutcomeAlignment",
    "exportPackagePdfArtifactTraceabilityAlignment",
    "exportPackageDocxArtifactStopMatrixAlignment",
    "exportPackageDocxArtifactStopOutcomeAlignment",
    "exportPackageDocxArtifactTraceabilityAlignment",
    "exportPackageBundleManifestStopMatrixAlignment",
    "exportPackageBundleManifestStopOutcomeAlignment",
    "exportPackageBundleManifestTraceabilityAlignment",
    "exportPackageBundleArchiveArtifactStopMatrixAlignment",
    "exportPackageBundleArchiveArtifactStopOutcomeAlignment",
    "exportPackageBundleArchiveArtifactTraceabilityAlignment",
    "snapshotStatusTraceabilityAlignment",
  ]) {
    assert.match(docsText, new RegExp("`" + alignmentExport + "`"));
    assert.match(schemasIndexText, new RegExp("\\b" + alignmentExport + "\\b"));
  }

  assert.match(
    docsText,
    /canonical shared baseline for this seam is the current neutral-model and alignment export surface in `packages\/schemas\/src\/index\.js`, while the broader principles and rollout baseline in `docs\/MODEL_INFORMATION_PRINCIPLES_v1\.md` and `docs\/PRINCIPLES_FACT_MODEL_ROLLOUT_FREEZE_v1\.md` remains a separate upstream documentation baseline rather than this schema-side export scaffold itself/i,
  );
  assert.match(
    docsText,
    /consumers needing the canonical shared neutral models or shared alignment surfaces should rely on the shared `packages\/schemas` surface rather than bypassing it with ad hoc deep imports/i,
  );
  assert.match(
    docsText,
    /shared `packages\/schemas` export scaffold remains outside this seam because it is the broader aggregate contract-export boundary/i,
  );
  assert.match(
    docsText,
    /shared `packages\/schemas` validator-dispatch scaffold remains outside this seam because persisted-surface validator lookup and validation entrypoints are separate frozen dispatch responsibilities/i,
  );
  assert.match(
    docsText,
    /shared `packages\/schemas` validation-helper scaffold remains outside this seam because machine-readable error construction, plain-object enforcement, key-shape validation, shared enum enforcement, and other validation infrastructure are separate frozen helper responsibilities/i,
  );
  assert.match(
    docsText,
    /narrower feature-specific alignment seams remain outside this seam because they freeze surface-specific alignment payloads, validators, mapping cases, and bounded runtime proof responsibilities rather than the parent shared neutral-model and alignment-export scaffold/i,
  );
  assert.match(
    docsText,
    /current bounded downstream reuse already evidenced for this seam is limited to the named `packages\/schemas` export surface, the broader principles\/rollout baseline docs and proof files, and the narrower schema\/runtime proof files that verify the exported alignment\/model surfaces/i,
  );
  assert.match(
    docsText,
    /future shared neutral-model exports or shared alignment exports that belong to the same parent schema-side contract family should extend this scaffold instead of introducing parallel parent alignment\/export boundaries elsewhere in the repo/i,
  );
  assert.match(
    docsText,
    /no new principles, fact-model mappings, or alignment semantics are created by this freeze/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, validation semantics, export semantics, schema behavior, or fail-closed behavior/i,
  );

  assert.match(
    rolloutFreezeText,
    /completed shared principles\/fact-model adoption rollout/i,
  );
  assert.match(
    modelPrinciplesText,
    /Model Information Principles v1/,
  );
});
