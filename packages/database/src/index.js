const fs = require("node:fs/promises");
const path = require("node:path");

const {
  validateExportPackageBundleArchiveArtifact,
  validateExportPackage,
  validateExportPackageBundleManifest,
  validateExportPackageDocxArtifact,
  validateExportPackageJsonArtifact,
  validateExportPackageMarkdownArtifact,
  validateExportPackagePdfArtifact,
  validateReleaseEvalRun,
} = require("../../schemas/src/index.js");
const {
  attachReleaseEvalProfileDossierSnapshot,
  deriveExportPackageBundleArchiveArtifact,
  deriveExportPackageBundleManifest,
  deriveExportPackageDocxArtifact,
  deriveExportPackageFromProfileDossierSnapshot,
  deriveExportPackageJsonArtifact,
  deriveExportPackageMarkdownArtifact,
  deriveExportPackagePdfArtifact,
  deriveProfileInputSnapshot,
  deriveReleaseEvalRun,
  getReleaseEvalAdapter,
  hasJurisdictionProfileCapability,
  reconcileReleaseEvalRun,
  resolveExportPackageProjection,
  resolveExportPackageBundleArchiveArtifactProjection,
  resolveExportPackageBundleManifestProjection,
  resolveExportPackageDocxArtifactProjection,
  resolveExportPackagePdfArtifactProjection,
  resolveExportPackageJsonArtifactProjection,
  resolveExportPackageMarkdownArtifactProjection,
  resolveReleaseEvalProfileDossierProjection,
  resolveReleaseEvalProfileDossierSnapshot,
  validateProfileInputSnapshot,
} = require("../../governance/src/index.js");

const caseProfileInputsFileName = "case-profile-inputs.json";
const exportPackageBundleArchiveArtifactSnapshotsFileName =
  "export-package-bundle-archive-artifact-snapshots.json";
const exportPackageBundleManifestSnapshotsFileName =
  "export-package-bundle-manifest-snapshots.json";
const exportPackageDocxArtifactSnapshotsFileName =
  "export-package-docx-artifact-snapshots.json";
const exportPackagePdfArtifactSnapshotsFileName =
  "export-package-pdf-artifact-snapshots.json";
const exportPackageJsonArtifactSnapshotsFileName =
  "export-package-json-artifact-snapshots.json";
const exportPackageMarkdownArtifactSnapshotsFileName =
  "export-package-markdown-artifact-snapshots.json";
const exportPackageSnapshotsFileName = "export-package-snapshots.json";
const releaseEvalRunsFileName = "release-eval-runs.json";

function createPersistenceError(code, message, details = {}) {
  const error = new Error(message);
  error.code = code;
  error.details = details;
  return error;
}

function resolveStoragePath(fileName, options = {}) {
  const storageDir = options.storageDir ?? path.join(process.cwd(), ".tmp", "database");
  return {
    storageDir,
    persistenceFilePath: path.join(storageDir, fileName),
  };
}

async function readStore(fileName, options = {}) {
  const { persistenceFilePath } = resolveStoragePath(fileName, options);

  try {
    const storeText = await fs.readFile(persistenceFilePath, "utf8");
    return JSON.parse(storeText);
  } catch (error) {
    if (error.code === "ENOENT") {
      return {};
    }

    throw error;
  }
}

async function writeStore(fileName, store, options = {}) {
  const { storageDir, persistenceFilePath } = resolveStoragePath(fileName, options);
  await fs.mkdir(storageDir, { recursive: true });
  await fs.writeFile(persistenceFilePath, JSON.stringify(store, null, 2));
}

function normalizeRecord(caseId, snapshot, existingRecord) {
  const timestamp = new Date().toISOString();

  return {
    case_id: caseId,
    jurisdiction_profile_key: snapshot.jurisdiction_profile_key,
    profile_input_summary: snapshot.profile_input_summary,
    profile_input_lane_snapshot: snapshot.profile_input_lane_snapshot,
    created_at: existingRecord?.created_at ?? timestamp,
    updated_at: timestamp,
  };
}

async function getCaseProfileInputs(caseId, options = {}) {
  if (!caseId || typeof caseId !== "string") {
    throw createPersistenceError("ERR_CASE_ID_INVALID", "caseId must be a non-empty string");
  }

  const store = await readStore(caseProfileInputsFileName, options);
  const record = store[caseId];

  if (!record) {
    return null;
  }

  return {
    jurisdiction_profile_key: record.jurisdiction_profile_key,
    profile_input_summary: record.profile_input_summary,
    profile_input_lane_snapshot: record.profile_input_lane_snapshot,
  };
}

function reconcilePersistedReleaseEvalRun(releaseEvalRun, caseProfileInputs) {
  const adapter = getReleaseEvalAdapter(releaseEvalRun?.jurisdiction_profile_key);

  if (!adapter) {
    return releaseEvalRun;
  }

  return reconcileReleaseEvalRun(releaseEvalRun, caseProfileInputs);
}

function attachPersistedReleaseEvalRun(
  releaseEvalRun,
  caseProfileInputs,
  options = {},
) {
  const reconciledReleaseEvalRun = reconcilePersistedReleaseEvalRun(
    releaseEvalRun,
    caseProfileInputs,
  );
  const adapter = getReleaseEvalAdapter(
    reconciledReleaseEvalRun?.jurisdiction_profile_key,
  );

  if (!adapter) {
    return reconciledReleaseEvalRun;
  }

  if (
    !hasJurisdictionProfileCapability(
      reconciledReleaseEvalRun?.jurisdiction_profile_key,
      "profile_dossier",
    )
  ) {
    return reconciledReleaseEvalRun;
  }

  return attachReleaseEvalProfileDossierSnapshot(reconciledReleaseEvalRun, options);
}

function resolvePersistedReleaseEvalProfileDossierProjection(
  releaseEvalRun,
  caseProfileInputs,
  options = {},
) {
  const reconciledReleaseEvalRun = reconcilePersistedReleaseEvalRun(
    releaseEvalRun,
    caseProfileInputs,
  );
  const adapter = getReleaseEvalAdapter(
    reconciledReleaseEvalRun?.jurisdiction_profile_key,
  );

  if (!adapter) {
    return releaseEvalRun?.profile_dossier_snapshot ?? null;
  }

  return resolveReleaseEvalProfileDossierProjection(
    reconciledReleaseEvalRun,
    options,
  );
}

function resolvePersistedReleaseEvalProfileDossierSnapshot(
  releaseEvalRun,
  caseProfileInputs,
  options = {},
) {
  const reconciledReleaseEvalRun = reconcilePersistedReleaseEvalRun(
    releaseEvalRun,
    caseProfileInputs,
  );
  const adapter = getReleaseEvalAdapter(
    reconciledReleaseEvalRun?.jurisdiction_profile_key,
  );

  if (!adapter) {
    return null;
  }

  return resolveReleaseEvalProfileDossierSnapshot(reconciledReleaseEvalRun, options);
}

async function upsertCaseProfileInputs(caseId, profileInputSnapshot, options = {}) {
  if (!caseId || typeof caseId !== "string") {
    throw createPersistenceError("ERR_CASE_ID_INVALID", "caseId must be a non-empty string");
  }

  if (
    !hasJurisdictionProfileCapability(
      profileInputSnapshot?.jurisdiction_profile_key,
      "profile_inputs",
    )
  ) {
    throw createPersistenceError(
      "ERR_UNSUPPORTED_JURISDICTION_PROFILE",
      "jurisdiction_profile_key is not supported",
      {
        jurisdiction_profile_key: profileInputSnapshot?.jurisdiction_profile_key,
      },
    );
  }

  validateProfileInputSnapshot(profileInputSnapshot);
  const canonicalSnapshot = deriveProfileInputSnapshot(profileInputSnapshot);
  const store = await readStore(caseProfileInputsFileName, options);
  const record = normalizeRecord(caseId, canonicalSnapshot, store[caseId]);

  store[caseId] = record;
  await writeStore(caseProfileInputsFileName, store, options);

  return {
    jurisdiction_profile_key: record.jurisdiction_profile_key,
    profile_input_summary: record.profile_input_summary,
    profile_input_lane_snapshot: record.profile_input_lane_snapshot,
  };
}

function normalizeReleaseEvalRecord(caseId, releaseEvalRun, persistedAt) {
  return {
    case_id: caseId,
    release_eval_run_id: releaseEvalRun.release_eval_run_id,
    jurisdiction_profile_key: releaseEvalRun.jurisdiction_profile_key,
    release_eval_payload: releaseEvalRun,
    persisted_at: persistedAt,
  };
}

function normalizeExportPackageRecord(caseId, exportPackageSnapshot) {
  return {
    case_id: caseId,
    jurisdiction_profile_key: exportPackageSnapshot.jurisdiction_profile_key,
    export_version: exportPackageSnapshot.export_version,
    dossier_fingerprint: exportPackageSnapshot.dossier_fingerprint,
    export_package_payload: exportPackageSnapshot,
    generated_at: exportPackageSnapshot.generated_at,
  };
}

function normalizeExportPackageBundleArchiveArtifactRecord(
  caseId,
  exportPackageBundleArchiveArtifactSnapshot,
  persistedAt,
) {
  return {
    case_id: caseId,
    artifact_type: exportPackageBundleArchiveArtifactSnapshot.artifact_type,
    filename: exportPackageBundleArchiveArtifactSnapshot.filename,
    content_type: exportPackageBundleArchiveArtifactSnapshot.content_type,
    encoding: exportPackageBundleArchiveArtifactSnapshot.encoding,
    package_version: exportPackageBundleArchiveArtifactSnapshot.package_version,
    bundle_manifest_fingerprint:
      exportPackageBundleArchiveArtifactSnapshot.bundle_manifest_fingerprint,
    export_package_bundle_archive_artifact_payload:
      exportPackageBundleArchiveArtifactSnapshot,
    persisted_at: persistedAt,
  };
}

function normalizeExportPackageBundleManifestRecord(
  caseId,
  exportPackageBundleManifestSnapshot,
  persistedAt,
) {
  return {
    case_id: caseId,
    jurisdiction_profile_key: exportPackageBundleManifestSnapshot.jurisdiction_profile_key,
    package_version: exportPackageBundleManifestSnapshot.package_version,
    export_version: exportPackageBundleManifestSnapshot.export_version,
    dossier_fingerprint: exportPackageBundleManifestSnapshot.dossier_fingerprint,
    export_package_bundle_manifest_payload: exportPackageBundleManifestSnapshot,
    persisted_at: persistedAt,
  };
}

function normalizeExportPackageJsonArtifactRecord(
  caseId,
  exportPackageJsonArtifactSnapshot,
  persistedAt,
) {
  return {
    case_id: caseId,
    artifact_type: exportPackageJsonArtifactSnapshot.artifact_type,
    filename: exportPackageJsonArtifactSnapshot.filename,
    content_type: exportPackageJsonArtifactSnapshot.content_type,
    encoding: exportPackageJsonArtifactSnapshot.encoding,
    export_package_json_artifact_payload: exportPackageJsonArtifactSnapshot,
    persisted_at: persistedAt,
  };
}

function normalizeExportPackageDocxArtifactRecord(
  caseId,
  exportPackageDocxArtifactSnapshot,
  persistedAt,
) {
  return {
    case_id: caseId,
    artifact_type: exportPackageDocxArtifactSnapshot.artifact_type,
    filename: exportPackageDocxArtifactSnapshot.filename,
    content_type: exportPackageDocxArtifactSnapshot.content_type,
    encoding: exportPackageDocxArtifactSnapshot.encoding,
    export_package_docx_artifact_payload: exportPackageDocxArtifactSnapshot,
    persisted_at: persistedAt,
  };
}

function normalizeExportPackagePdfArtifactRecord(
  caseId,
  exportPackagePdfArtifactSnapshot,
  persistedAt,
) {
  return {
    case_id: caseId,
    artifact_type: exportPackagePdfArtifactSnapshot.artifact_type,
    filename: exportPackagePdfArtifactSnapshot.filename,
    content_type: exportPackagePdfArtifactSnapshot.content_type,
    encoding: exportPackagePdfArtifactSnapshot.encoding,
    export_package_pdf_artifact_payload: exportPackagePdfArtifactSnapshot,
    persisted_at: persistedAt,
  };
}

function normalizeExportPackageMarkdownArtifactRecord(
  caseId,
  exportPackageMarkdownArtifactSnapshot,
  persistedAt,
) {
  return {
    case_id: caseId,
    artifact_type: exportPackageMarkdownArtifactSnapshot.artifact_type,
    filename: exportPackageMarkdownArtifactSnapshot.filename,
    content_type: exportPackageMarkdownArtifactSnapshot.content_type,
    encoding: exportPackageMarkdownArtifactSnapshot.encoding,
    export_package_markdown_artifact_payload: exportPackageMarkdownArtifactSnapshot,
    persisted_at: persistedAt,
  };
}

async function getLatestCaseReleaseEvalRun(caseId, options = {}) {
  if (!caseId || typeof caseId !== "string") {
    throw createPersistenceError("ERR_CASE_ID_INVALID", "caseId must be a non-empty string");
  }

  const store = await readStore(releaseEvalRunsFileName, options);
  const caseRuns = store[caseId];

  if (!Array.isArray(caseRuns) || caseRuns.length === 0) {
    return null;
  }

  const latestReleaseEvalRecord = caseRuns[caseRuns.length - 1];
  const latestReleaseEvalRun = latestReleaseEvalRecord.release_eval_payload;
  const caseProfileInputs = await getCaseProfileInputs(caseId, options);

  return attachPersistedReleaseEvalRun(latestReleaseEvalRun, caseProfileInputs, {
    persisted_at: latestReleaseEvalRecord.persisted_at,
  });
}

async function getLatestCaseProfileDossierProjection(caseId, options = {}) {
  if (!caseId || typeof caseId !== "string") {
    throw createPersistenceError("ERR_CASE_ID_INVALID", "caseId must be a non-empty string");
  }

  const store = await readStore(releaseEvalRunsFileName, options);
  const caseRuns = store[caseId];

  if (!Array.isArray(caseRuns) || caseRuns.length === 0) {
    return null;
  }

  const latestReleaseEvalRecord = caseRuns[caseRuns.length - 1];
  const latestReleaseEvalRun = latestReleaseEvalRecord.release_eval_payload;
  const caseProfileInputs = await getCaseProfileInputs(caseId, options);

  return resolvePersistedReleaseEvalProfileDossierProjection(
    latestReleaseEvalRun,
    caseProfileInputs,
    {
      persisted_at: latestReleaseEvalRecord.persisted_at,
    },
  );
}

async function getLatestCaseExportPackageSnapshot(caseId, options = {}) {
  if (!caseId || typeof caseId !== "string") {
    throw createPersistenceError("ERR_CASE_ID_INVALID", "caseId must be a non-empty string");
  }

  const store = await readStore(exportPackageSnapshotsFileName, options);
  const caseSnapshots = store[caseId];

  if (!Array.isArray(caseSnapshots) || caseSnapshots.length === 0) {
    return null;
  }

  return caseSnapshots[caseSnapshots.length - 1].export_package_payload;
}

async function getLatestCaseExportPackageBundleArchiveArtifactSnapshot(
  caseId,
  options = {},
) {
  if (!caseId || typeof caseId !== "string") {
    throw createPersistenceError("ERR_CASE_ID_INVALID", "caseId must be a non-empty string");
  }

  const store = await readStore(exportPackageBundleArchiveArtifactSnapshotsFileName, options);
  const caseSnapshots = store[caseId];

  if (!Array.isArray(caseSnapshots) || caseSnapshots.length === 0) {
    return null;
  }

  return caseSnapshots[caseSnapshots.length - 1].export_package_bundle_archive_artifact_payload;
}

async function getLatestCaseExportPackageBundleArchiveArtifactProjection(
  caseId,
  options = {},
) {
  if (!caseId || typeof caseId !== "string") {
    throw createPersistenceError("ERR_CASE_ID_INVALID", "caseId must be a non-empty string");
  }

  const exportPackageBundleArchiveArtifactSnapshot =
    await getLatestCaseExportPackageBundleArchiveArtifactSnapshot(caseId, options);

  if (!exportPackageBundleArchiveArtifactSnapshot) {
    return null;
  }

  return resolveExportPackageBundleArchiveArtifactProjection(
    exportPackageBundleArchiveArtifactSnapshot,
    await getLatestCaseExportPackageBundleManifestProjection(caseId, options),
  );
}

async function getLatestCaseExportPackageBundleManifestSnapshot(
  caseId,
  options = {},
) {
  if (!caseId || typeof caseId !== "string") {
    throw createPersistenceError("ERR_CASE_ID_INVALID", "caseId must be a non-empty string");
  }

  const store = await readStore(exportPackageBundleManifestSnapshotsFileName, options);
  const caseSnapshots = store[caseId];

  if (!Array.isArray(caseSnapshots) || caseSnapshots.length === 0) {
    return null;
  }

  return caseSnapshots[caseSnapshots.length - 1].export_package_bundle_manifest_payload;
}

async function getLatestCaseExportPackageBundleManifestProjection(
  caseId,
  options = {},
) {
  if (!caseId || typeof caseId !== "string") {
    throw createPersistenceError("ERR_CASE_ID_INVALID", "caseId must be a non-empty string");
  }

  const exportPackageBundleManifestSnapshot =
    await getLatestCaseExportPackageBundleManifestSnapshot(caseId, options);

  if (!exportPackageBundleManifestSnapshot) {
    return null;
  }

  const currentExportPackageSnapshot = await getLatestCaseExportPackageSnapshot(
    caseId,
    options,
  );

  return resolveExportPackageBundleManifestProjection(
    exportPackageBundleManifestSnapshot,
    currentExportPackageSnapshot,
    {
      jsonArtifactSnapshot: await getLatestCaseExportPackageJsonArtifactSnapshot(
        caseId,
        options,
      ),
      markdownArtifactSnapshot:
        await getLatestCaseExportPackageMarkdownArtifactSnapshot(caseId, options),
      pdfArtifactSnapshot: await getLatestCaseExportPackagePdfArtifactSnapshot(
        caseId,
        options,
      ),
      docxArtifactSnapshot: await getLatestCaseExportPackageDocxArtifactSnapshot(
        caseId,
        options,
      ),
    },
  );
}

async function getLatestCaseExportPackageProjection(caseId, options = {}) {
  if (!caseId || typeof caseId !== "string") {
    throw createPersistenceError("ERR_CASE_ID_INVALID", "caseId must be a non-empty string");
  }

  const exportPackageSnapshot = await getLatestCaseExportPackageSnapshot(caseId, options);

  if (!exportPackageSnapshot) {
    return null;
  }

  const releaseEvalStore = await readStore(releaseEvalRunsFileName, options);
  const caseRuns = releaseEvalStore[caseId];
  let currentProfileDossierSnapshot = null;

  if (Array.isArray(caseRuns) && caseRuns.length > 0) {
    const latestReleaseEvalRecord = caseRuns[caseRuns.length - 1];
    const latestReleaseEvalRun = latestReleaseEvalRecord.release_eval_payload;
    const caseProfileInputs = await getCaseProfileInputs(caseId, options);

    currentProfileDossierSnapshot = resolvePersistedReleaseEvalProfileDossierSnapshot(
      latestReleaseEvalRun,
      caseProfileInputs,
      {
        persisted_at: latestReleaseEvalRecord.persisted_at,
      },
    );
  }

  return resolveExportPackageProjection(
    exportPackageSnapshot,
    currentProfileDossierSnapshot,
  );
}

async function getLatestCaseExportPackageJsonArtifactSnapshot(caseId, options = {}) {
  if (!caseId || typeof caseId !== "string") {
    throw createPersistenceError("ERR_CASE_ID_INVALID", "caseId must be a non-empty string");
  }

  const store = await readStore(exportPackageJsonArtifactSnapshotsFileName, options);
  const caseSnapshots = store[caseId];

  if (!Array.isArray(caseSnapshots) || caseSnapshots.length === 0) {
    return null;
  }

  return caseSnapshots[caseSnapshots.length - 1].export_package_json_artifact_payload;
}

async function getLatestCaseExportPackageDocxArtifactSnapshot(caseId, options = {}) {
  if (!caseId || typeof caseId !== "string") {
    throw createPersistenceError("ERR_CASE_ID_INVALID", "caseId must be a non-empty string");
  }

  const store = await readStore(exportPackageDocxArtifactSnapshotsFileName, options);
  const caseSnapshots = store[caseId];

  if (!Array.isArray(caseSnapshots) || caseSnapshots.length === 0) {
    return null;
  }

  return caseSnapshots[caseSnapshots.length - 1].export_package_docx_artifact_payload;
}

async function getLatestCaseExportPackageDocxArtifactProjection(caseId, options = {}) {
  if (!caseId || typeof caseId !== "string") {
    throw createPersistenceError("ERR_CASE_ID_INVALID", "caseId must be a non-empty string");
  }

  const exportPackageDocxArtifactSnapshot =
    await getLatestCaseExportPackageDocxArtifactSnapshot(caseId, options);

  if (!exportPackageDocxArtifactSnapshot) {
    return null;
  }

  const currentExportPackageSnapshot = await getLatestCaseExportPackageSnapshot(caseId, options);
  const releaseEvalStore = await readStore(releaseEvalRunsFileName, options);
  const caseRuns = releaseEvalStore[caseId];
  let currentProfileDossierSnapshot = null;

  if (Array.isArray(caseRuns) && caseRuns.length > 0) {
    const latestReleaseEvalRecord = caseRuns[caseRuns.length - 1];
    const latestReleaseEvalRun = latestReleaseEvalRecord.release_eval_payload;
    const caseProfileInputs = await getCaseProfileInputs(caseId, options);

    currentProfileDossierSnapshot = resolvePersistedReleaseEvalProfileDossierSnapshot(
      latestReleaseEvalRun,
      caseProfileInputs,
      {
        persisted_at: latestReleaseEvalRecord.persisted_at,
      },
    );
  }

  return resolveExportPackageDocxArtifactProjection(
    exportPackageDocxArtifactSnapshot,
    currentExportPackageSnapshot,
    currentProfileDossierSnapshot,
  );
}

async function getLatestCaseExportPackagePdfArtifactSnapshot(caseId, options = {}) {
  if (!caseId || typeof caseId !== "string") {
    throw createPersistenceError("ERR_CASE_ID_INVALID", "caseId must be a non-empty string");
  }

  const store = await readStore(exportPackagePdfArtifactSnapshotsFileName, options);
  const caseSnapshots = store[caseId];

  if (!Array.isArray(caseSnapshots) || caseSnapshots.length === 0) {
    return null;
  }

  return caseSnapshots[caseSnapshots.length - 1].export_package_pdf_artifact_payload;
}

async function getLatestCaseExportPackagePdfArtifactProjection(caseId, options = {}) {
  if (!caseId || typeof caseId !== "string") {
    throw createPersistenceError("ERR_CASE_ID_INVALID", "caseId must be a non-empty string");
  }

  const exportPackagePdfArtifactSnapshot =
    await getLatestCaseExportPackagePdfArtifactSnapshot(caseId, options);

  if (!exportPackagePdfArtifactSnapshot) {
    return null;
  }

  const currentExportPackageSnapshot = await getLatestCaseExportPackageSnapshot(caseId, options);
  const releaseEvalStore = await readStore(releaseEvalRunsFileName, options);
  const caseRuns = releaseEvalStore[caseId];
  let currentProfileDossierSnapshot = null;

  if (Array.isArray(caseRuns) && caseRuns.length > 0) {
    const latestReleaseEvalRecord = caseRuns[caseRuns.length - 1];
    const latestReleaseEvalRun = latestReleaseEvalRecord.release_eval_payload;
    const caseProfileInputs = await getCaseProfileInputs(caseId, options);

    currentProfileDossierSnapshot = resolvePersistedReleaseEvalProfileDossierSnapshot(
      latestReleaseEvalRun,
      caseProfileInputs,
      {
        persisted_at: latestReleaseEvalRecord.persisted_at,
      },
    );
  }

  return resolveExportPackagePdfArtifactProjection(
    exportPackagePdfArtifactSnapshot,
    currentExportPackageSnapshot,
    currentProfileDossierSnapshot,
  );
}

async function getLatestCaseExportPackageJsonArtifactProjection(caseId, options = {}) {
  if (!caseId || typeof caseId !== "string") {
    throw createPersistenceError("ERR_CASE_ID_INVALID", "caseId must be a non-empty string");
  }

  const exportPackageJsonArtifactSnapshot =
    await getLatestCaseExportPackageJsonArtifactSnapshot(caseId, options);

  if (!exportPackageJsonArtifactSnapshot) {
    return null;
  }

  const currentExportPackageSnapshot = await getLatestCaseExportPackageSnapshot(caseId, options);
  const releaseEvalStore = await readStore(releaseEvalRunsFileName, options);
  const caseRuns = releaseEvalStore[caseId];
  let currentProfileDossierSnapshot = null;

  if (Array.isArray(caseRuns) && caseRuns.length > 0) {
    const latestReleaseEvalRecord = caseRuns[caseRuns.length - 1];
    const latestReleaseEvalRun = latestReleaseEvalRecord.release_eval_payload;
    const caseProfileInputs = await getCaseProfileInputs(caseId, options);

    currentProfileDossierSnapshot = resolvePersistedReleaseEvalProfileDossierSnapshot(
      latestReleaseEvalRun,
      caseProfileInputs,
      {
        persisted_at: latestReleaseEvalRecord.persisted_at,
      },
    );
  }

  return resolveExportPackageJsonArtifactProjection(
    exportPackageJsonArtifactSnapshot,
    currentExportPackageSnapshot,
    currentProfileDossierSnapshot,
  );
}

async function getLatestCaseExportPackageMarkdownArtifactSnapshot(
  caseId,
  options = {},
) {
  if (!caseId || typeof caseId !== "string") {
    throw createPersistenceError("ERR_CASE_ID_INVALID", "caseId must be a non-empty string");
  }

  const store = await readStore(exportPackageMarkdownArtifactSnapshotsFileName, options);
  const caseSnapshots = store[caseId];

  if (!Array.isArray(caseSnapshots) || caseSnapshots.length === 0) {
    return null;
  }

  return caseSnapshots[caseSnapshots.length - 1].export_package_markdown_artifact_payload;
}

async function getLatestCaseExportPackageMarkdownArtifactProjection(
  caseId,
  options = {},
) {
  if (!caseId || typeof caseId !== "string") {
    throw createPersistenceError("ERR_CASE_ID_INVALID", "caseId must be a non-empty string");
  }

  const exportPackageMarkdownArtifactSnapshot =
    await getLatestCaseExportPackageMarkdownArtifactSnapshot(caseId, options);

  if (!exportPackageMarkdownArtifactSnapshot) {
    return null;
  }

  const currentExportPackageSnapshot = await getLatestCaseExportPackageSnapshot(caseId, options);
  const releaseEvalStore = await readStore(releaseEvalRunsFileName, options);
  const caseRuns = releaseEvalStore[caseId];
  let currentProfileDossierSnapshot = null;

  if (Array.isArray(caseRuns) && caseRuns.length > 0) {
    const latestReleaseEvalRecord = caseRuns[caseRuns.length - 1];
    const latestReleaseEvalRun = latestReleaseEvalRecord.release_eval_payload;
    const caseProfileInputs = await getCaseProfileInputs(caseId, options);

    currentProfileDossierSnapshot = resolvePersistedReleaseEvalProfileDossierSnapshot(
      latestReleaseEvalRun,
      caseProfileInputs,
      {
        persisted_at: latestReleaseEvalRecord.persisted_at,
      },
    );
  }

  return resolveExportPackageMarkdownArtifactProjection(
    exportPackageMarkdownArtifactSnapshot,
    currentExportPackageSnapshot,
    currentProfileDossierSnapshot,
  );
}

async function persistCaseReleaseEvalRun(caseId, releaseEvalRun, options = {}) {
  if (!caseId || typeof caseId !== "string") {
    throw createPersistenceError("ERR_CASE_ID_INVALID", "caseId must be a non-empty string");
  }

  if (
    typeof releaseEvalRun?.jurisdiction_profile_key === "string" &&
    !hasJurisdictionProfileCapability(
      releaseEvalRun.jurisdiction_profile_key,
      "release_eval",
    )
  ) {
    throw createPersistenceError(
      "ERR_UNSUPPORTED_JURISDICTION_PROFILE",
      "jurisdiction_profile_key is not supported",
      {
        jurisdiction_profile_key: releaseEvalRun.jurisdiction_profile_key,
      },
    );
  }

  const caseProfileInputs = await getCaseProfileInputs(caseId, options);
  const persistedAt =
    options.persisted_at ??
    releaseEvalRun?.profile_dossier_snapshot?.canonical_source?.persisted_at ??
    new Date().toISOString();
  const releaseEvalRunForPersistence =
    hasJurisdictionProfileCapability(
      releaseEvalRun?.jurisdiction_profile_key,
      "profile_dossier",
    )
      ? attachReleaseEvalProfileDossierSnapshot(
          reconcileReleaseEvalRun(releaseEvalRun, caseProfileInputs),
          { persisted_at: persistedAt, force_reproject: true },
        )
      : releaseEvalRun;
  const canonicalReleaseEvalRun = validateReleaseEvalRun(releaseEvalRunForPersistence);
  const store = await readStore(releaseEvalRunsFileName, options);
  const caseRuns = Array.isArray(store[caseId]) ? store[caseId] : [];

  caseRuns.push(normalizeReleaseEvalRecord(caseId, canonicalReleaseEvalRun, persistedAt));
  store[caseId] = caseRuns;

  await writeStore(releaseEvalRunsFileName, store, options);

  return canonicalReleaseEvalRun;
}

async function persistCaseExportPackageSnapshot(
  caseId,
  exportPackageSnapshot,
  options = {},
) {
  if (!caseId || typeof caseId !== "string") {
    throw createPersistenceError("ERR_CASE_ID_INVALID", "caseId must be a non-empty string");
  }

  if (
    typeof exportPackageSnapshot?.jurisdiction_profile_key === "string" &&
    !hasJurisdictionProfileCapability(
      exportPackageSnapshot.jurisdiction_profile_key,
      "export_package",
    )
  ) {
    throw createPersistenceError(
      "ERR_UNSUPPORTED_JURISDICTION_PROFILE",
      "jurisdiction_profile_key is not supported",
      {
        jurisdiction_profile_key: exportPackageSnapshot.jurisdiction_profile_key,
      },
    );
  }

  const canonicalExportPackage = validateExportPackage(exportPackageSnapshot);
  const store = await readStore(exportPackageSnapshotsFileName, options);
  const caseSnapshots = Array.isArray(store[caseId]) ? store[caseId] : [];

  caseSnapshots.push(
    normalizeExportPackageRecord(caseId, canonicalExportPackage),
  );
  store[caseId] = caseSnapshots;

  await writeStore(exportPackageSnapshotsFileName, store, options);

  return canonicalExportPackage;
}

async function persistCaseExportPackageBundleArchiveArtifactSnapshot(
  caseId,
  exportPackageBundleArchiveArtifactSnapshot,
  options = {},
) {
  if (!caseId || typeof caseId !== "string") {
    throw createPersistenceError("ERR_CASE_ID_INVALID", "caseId must be a non-empty string");
  }

  if (
    typeof exportPackageBundleArchiveArtifactSnapshot?.body_base64 === "string" &&
    exportPackageBundleArchiveArtifactSnapshot.body_base64.length > 0
  ) {
    try {
      const decodedBody = Buffer.from(
        exportPackageBundleArchiveArtifactSnapshot.body_base64,
        "base64",
      ).toString("utf8");
      const jurisdictionProfileKeyMatch =
        decodedBody.match(/"jurisdiction_profile_key":"([^"]+)"/) ??
        decodedBody.match(/jurisdiction_profile_key:\s+([A-Z_<>\.]+)/);

      if (
        jurisdictionProfileKeyMatch?.[1] === "CMD_PROFILE" &&
        !hasJurisdictionProfileCapability(
          jurisdictionProfileKeyMatch[1],
          "export_package_bundle_archive_artifact",
        )
      ) {
        throw createPersistenceError(
          "ERR_UNSUPPORTED_JURISDICTION_PROFILE",
          "jurisdiction_profile_key is not supported",
          {
            jurisdiction_profile_key: jurisdictionProfileKeyMatch[1],
          },
        );
      }
    } catch (error) {
      if (error?.code === "ERR_UNSUPPORTED_JURISDICTION_PROFILE") {
        throw error;
      }
    }
  }

  const canonicalExportPackageBundleArchiveArtifact =
    validateExportPackageBundleArchiveArtifact(
      exportPackageBundleArchiveArtifactSnapshot,
    );
  const store = await readStore(exportPackageBundleArchiveArtifactSnapshotsFileName, options);
  const caseSnapshots = Array.isArray(store[caseId]) ? store[caseId] : [];
  const persistedAt = options.persisted_at ?? new Date().toISOString();

  caseSnapshots.push(
    normalizeExportPackageBundleArchiveArtifactRecord(
      caseId,
      canonicalExportPackageBundleArchiveArtifact,
      persistedAt,
    ),
  );
  store[caseId] = caseSnapshots;

  await writeStore(exportPackageBundleArchiveArtifactSnapshotsFileName, store, options);

  return canonicalExportPackageBundleArchiveArtifact;
}

async function persistCaseExportPackageBundleManifestSnapshot(
  caseId,
  exportPackageBundleManifestSnapshot,
  options = {},
) {
  if (!caseId || typeof caseId !== "string") {
    throw createPersistenceError("ERR_CASE_ID_INVALID", "caseId must be a non-empty string");
  }

  if (
    typeof exportPackageBundleManifestSnapshot?.jurisdiction_profile_key === "string" &&
    !hasJurisdictionProfileCapability(
      exportPackageBundleManifestSnapshot.jurisdiction_profile_key,
      "export_package_bundle_manifest",
    )
  ) {
    throw createPersistenceError(
      "ERR_UNSUPPORTED_JURISDICTION_PROFILE",
      "jurisdiction_profile_key is not supported",
      {
        jurisdiction_profile_key: exportPackageBundleManifestSnapshot.jurisdiction_profile_key,
      },
    );
  }

  const canonicalExportPackageBundleManifest =
    validateExportPackageBundleManifest(exportPackageBundleManifestSnapshot);
  const store = await readStore(exportPackageBundleManifestSnapshotsFileName, options);
  const caseSnapshots = Array.isArray(store[caseId]) ? store[caseId] : [];
  const persistedAt = options.persisted_at ?? new Date().toISOString();

  caseSnapshots.push(
    normalizeExportPackageBundleManifestRecord(
      caseId,
      canonicalExportPackageBundleManifest,
      persistedAt,
    ),
  );
  store[caseId] = caseSnapshots;

  await writeStore(exportPackageBundleManifestSnapshotsFileName, store, options);

  return canonicalExportPackageBundleManifest;
}

async function persistCaseExportPackageJsonArtifactSnapshot(
  caseId,
  exportPackageJsonArtifactSnapshot,
  options = {},
) {
  if (!caseId || typeof caseId !== "string") {
    throw createPersistenceError("ERR_CASE_ID_INVALID", "caseId must be a non-empty string");
  }

  if (
    typeof exportPackageJsonArtifactSnapshot?.body_utf8 === "string" &&
    exportPackageJsonArtifactSnapshot.body_utf8.length > 0
  ) {
    try {
      const parsedArtifactBody = JSON.parse(exportPackageJsonArtifactSnapshot.body_utf8);

      if (
        typeof parsedArtifactBody?.jurisdiction_profile_key === "string" &&
        !hasJurisdictionProfileCapability(
          parsedArtifactBody.jurisdiction_profile_key,
          "export_package_json_artifact",
        )
      ) {
        throw createPersistenceError(
          "ERR_UNSUPPORTED_JURISDICTION_PROFILE",
          "jurisdiction_profile_key is not supported",
          {
            jurisdiction_profile_key: parsedArtifactBody.jurisdiction_profile_key,
          },
        );
      }
    } catch (error) {
      if (error?.code === "ERR_UNSUPPORTED_JURISDICTION_PROFILE") {
        throw error;
      }
    }
  }

  const canonicalExportPackageJsonArtifact =
    validateExportPackageJsonArtifact(exportPackageJsonArtifactSnapshot);
  const store = await readStore(exportPackageJsonArtifactSnapshotsFileName, options);
  const caseSnapshots = Array.isArray(store[caseId]) ? store[caseId] : [];
  const persistedAt = options.persisted_at ?? new Date().toISOString();

  caseSnapshots.push(
    normalizeExportPackageJsonArtifactRecord(
      caseId,
      canonicalExportPackageJsonArtifact,
      persistedAt,
    ),
  );
  store[caseId] = caseSnapshots;

  await writeStore(exportPackageJsonArtifactSnapshotsFileName, store, options);

  return canonicalExportPackageJsonArtifact;
}

async function persistCaseExportPackageDocxArtifactSnapshot(
  caseId,
  exportPackageDocxArtifactSnapshot,
  options = {},
) {
  if (!caseId || typeof caseId !== "string") {
    throw createPersistenceError("ERR_CASE_ID_INVALID", "caseId must be a non-empty string");
  }

  if (
    typeof exportPackageDocxArtifactSnapshot?.body_base64 === "string" &&
    exportPackageDocxArtifactSnapshot.body_base64.length > 0
  ) {
    try {
      const decodedBody = Buffer.from(
        exportPackageDocxArtifactSnapshot.body_base64,
        "base64",
      ).toString("utf8");
      const jurisdictionProfileKeyMatch =
        decodedBody.match(/jurisdiction_profile_key:\s+([A-Z_<>\.]+)/) ??
        decodedBody.match(/&quot;jurisdiction_profile_key&quot;:&quot;([^&]+)&quot;/) ??
        decodedBody.match(/"jurisdiction_profile_key":"([^"]+)"/);

      if (
        jurisdictionProfileKeyMatch?.[1] === "CMD_PROFILE" &&
        !hasJurisdictionProfileCapability(
          jurisdictionProfileKeyMatch[1],
          "export_package_docx_artifact",
        )
      ) {
        throw createPersistenceError(
          "ERR_UNSUPPORTED_JURISDICTION_PROFILE",
          "jurisdiction_profile_key is not supported",
          {
            jurisdiction_profile_key: jurisdictionProfileKeyMatch[1],
          },
        );
      }
    } catch (error) {
      if (error?.code === "ERR_UNSUPPORTED_JURISDICTION_PROFILE") {
        throw error;
      }
    }
  }

  const canonicalExportPackageDocxArtifact =
    validateExportPackageDocxArtifact(exportPackageDocxArtifactSnapshot);
  const store = await readStore(exportPackageDocxArtifactSnapshotsFileName, options);
  const caseSnapshots = Array.isArray(store[caseId]) ? store[caseId] : [];
  const persistedAt = options.persisted_at ?? new Date().toISOString();

  caseSnapshots.push(
    normalizeExportPackageDocxArtifactRecord(
      caseId,
      canonicalExportPackageDocxArtifact,
      persistedAt,
    ),
  );
  store[caseId] = caseSnapshots;

  await writeStore(exportPackageDocxArtifactSnapshotsFileName, store, options);

  return canonicalExportPackageDocxArtifact;
}

async function persistCaseExportPackagePdfArtifactSnapshot(
  caseId,
  exportPackagePdfArtifactSnapshot,
  options = {},
) {
  if (!caseId || typeof caseId !== "string") {
    throw createPersistenceError("ERR_CASE_ID_INVALID", "caseId must be a non-empty string");
  }

  if (
    typeof exportPackagePdfArtifactSnapshot?.body_base64 === "string" &&
    exportPackagePdfArtifactSnapshot.body_base64.length > 0
  ) {
    try {
      const decodedBody = Buffer.from(
        exportPackagePdfArtifactSnapshot.body_base64,
        "base64",
      ).toString("utf8");
      const jurisdictionProfileKeyMatch =
        decodedBody.match(/"jurisdiction_profile_key":"([^"]+)"/) ??
        decodedBody.match(/jurisdiction_profile_key:\s+([A-Z_<>\.]+)/);

      if (
        jurisdictionProfileKeyMatch?.[1] === "CMD_PROFILE" &&
        !hasJurisdictionProfileCapability(
          jurisdictionProfileKeyMatch[1],
          "export_package_pdf_artifact",
        )
      ) {
        throw createPersistenceError(
          "ERR_UNSUPPORTED_JURISDICTION_PROFILE",
          "jurisdiction_profile_key is not supported",
          {
            jurisdiction_profile_key: jurisdictionProfileKeyMatch[1],
          },
        );
      }
    } catch (error) {
      if (error?.code === "ERR_UNSUPPORTED_JURISDICTION_PROFILE") {
        throw error;
      }
    }
  }

  const canonicalExportPackagePdfArtifact =
    validateExportPackagePdfArtifact(exportPackagePdfArtifactSnapshot);
  const store = await readStore(exportPackagePdfArtifactSnapshotsFileName, options);
  const caseSnapshots = Array.isArray(store[caseId]) ? store[caseId] : [];
  const persistedAt = options.persisted_at ?? new Date().toISOString();

  caseSnapshots.push(
    normalizeExportPackagePdfArtifactRecord(
      caseId,
      canonicalExportPackagePdfArtifact,
      persistedAt,
    ),
  );
  store[caseId] = caseSnapshots;

  await writeStore(exportPackagePdfArtifactSnapshotsFileName, store, options);

  return canonicalExportPackagePdfArtifact;
}

async function persistCaseExportPackageMarkdownArtifactSnapshot(
  caseId,
  exportPackageMarkdownArtifactSnapshot,
  options = {},
) {
  if (!caseId || typeof caseId !== "string") {
    throw createPersistenceError("ERR_CASE_ID_INVALID", "caseId must be a non-empty string");
  }

  const jurisdictionProfileKeyMatch =
    exportPackageMarkdownArtifactSnapshot?.body_utf8?.match(
      /^- `jurisdiction_profile_key`: `([^`]+)`$/m,
    ) ?? null;

  if (
    typeof jurisdictionProfileKeyMatch?.[1] === "string" &&
    !hasJurisdictionProfileCapability(
      jurisdictionProfileKeyMatch[1],
      "export_package_markdown_artifact",
    )
  ) {
    throw createPersistenceError(
      "ERR_UNSUPPORTED_JURISDICTION_PROFILE",
      "jurisdiction_profile_key is not supported",
      {
        jurisdiction_profile_key: jurisdictionProfileKeyMatch[1],
      },
    );
  }

  const canonicalExportPackageMarkdownArtifact =
    validateExportPackageMarkdownArtifact(
      exportPackageMarkdownArtifactSnapshot,
    );
  const store = await readStore(exportPackageMarkdownArtifactSnapshotsFileName, options);
  const caseSnapshots = Array.isArray(store[caseId]) ? store[caseId] : [];
  const persistedAt = options.persisted_at ?? new Date().toISOString();

  caseSnapshots.push(
    normalizeExportPackageMarkdownArtifactRecord(
      caseId,
      canonicalExportPackageMarkdownArtifact,
      persistedAt,
    ),
  );
  store[caseId] = caseSnapshots;

  await writeStore(exportPackageMarkdownArtifactSnapshotsFileName, store, options);

  return canonicalExportPackageMarkdownArtifact;
}

async function refreshCaseExportPackageJsonArtifactSnapshot(caseId, options = {}) {
  if (!caseId || typeof caseId !== "string") {
    throw createPersistenceError("ERR_CASE_ID_INVALID", "caseId must be a non-empty string");
  }

  const exportPackageSnapshot = await getLatestCaseExportPackageSnapshot(caseId, options);

  if (!exportPackageSnapshot) {
    throw createPersistenceError(
      "ERR_EXPORT_PACKAGE_SNAPSHOT_NOT_FOUND",
      "export package snapshot must exist before JSON export artifact refresh",
      { case_id: caseId },
    );
  }

  const canonicalExportPackageJsonArtifact = deriveExportPackageJsonArtifact(
    exportPackageSnapshot,
  );

  return persistCaseExportPackageJsonArtifactSnapshot(
    caseId,
    canonicalExportPackageJsonArtifact,
    options,
  );
}

async function refreshCaseExportPackageDocxArtifactSnapshot(caseId, options = {}) {
  if (!caseId || typeof caseId !== "string") {
    throw createPersistenceError("ERR_CASE_ID_INVALID", "caseId must be a non-empty string");
  }

  const exportPackageSnapshot = await getLatestCaseExportPackageSnapshot(caseId, options);

  if (!exportPackageSnapshot) {
    throw createPersistenceError(
      "ERR_EXPORT_PACKAGE_SNAPSHOT_NOT_FOUND",
      "export package snapshot must exist before DOCX export artifact refresh",
      { case_id: caseId },
    );
  }

  const canonicalExportPackageDocxArtifact =
    deriveExportPackageDocxArtifact(exportPackageSnapshot);

  return persistCaseExportPackageDocxArtifactSnapshot(
    caseId,
    canonicalExportPackageDocxArtifact,
    options,
  );
}

async function refreshCaseExportPackagePdfArtifactSnapshot(caseId, options = {}) {
  if (!caseId || typeof caseId !== "string") {
    throw createPersistenceError("ERR_CASE_ID_INVALID", "caseId must be a non-empty string");
  }

  const exportPackageSnapshot = await getLatestCaseExportPackageSnapshot(caseId, options);

  if (!exportPackageSnapshot) {
    throw createPersistenceError(
      "ERR_EXPORT_PACKAGE_SNAPSHOT_NOT_FOUND",
      "export package snapshot must exist before PDF export artifact refresh",
      { case_id: caseId },
    );
  }

  const canonicalExportPackagePdfArtifact =
    deriveExportPackagePdfArtifact(exportPackageSnapshot);

  return persistCaseExportPackagePdfArtifactSnapshot(
    caseId,
    canonicalExportPackagePdfArtifact,
    options,
  );
}

async function refreshCaseExportPackageMarkdownArtifactSnapshot(
  caseId,
  options = {},
) {
  if (!caseId || typeof caseId !== "string") {
    throw createPersistenceError("ERR_CASE_ID_INVALID", "caseId must be a non-empty string");
  }

  const exportPackageSnapshot = await getLatestCaseExportPackageSnapshot(caseId, options);

  if (!exportPackageSnapshot) {
    throw createPersistenceError(
      "ERR_EXPORT_PACKAGE_SNAPSHOT_NOT_FOUND",
      "export package snapshot must exist before Markdown export artifact refresh",
      { case_id: caseId },
    );
  }

  const canonicalExportPackageMarkdownArtifact =
    deriveExportPackageMarkdownArtifact(exportPackageSnapshot);

  return persistCaseExportPackageMarkdownArtifactSnapshot(
    caseId,
    canonicalExportPackageMarkdownArtifact,
    options,
  );
}

async function refreshCaseExportPackageBundleManifestSnapshot(
  caseId,
  options = {},
) {
  if (!caseId || typeof caseId !== "string") {
    throw createPersistenceError("ERR_CASE_ID_INVALID", "caseId must be a non-empty string");
  }

  const exportPackageSnapshot = await getLatestCaseExportPackageSnapshot(caseId, options);

  if (!exportPackageSnapshot) {
    throw createPersistenceError(
      "ERR_EXPORT_PACKAGE_SNAPSHOT_NOT_FOUND",
      "export package snapshot must exist before bundle/package manifest refresh",
      { case_id: caseId },
    );
  }

  const jsonArtifactSnapshot = await getLatestCaseExportPackageJsonArtifactSnapshot(
    caseId,
    options,
  );
  if (!jsonArtifactSnapshot) {
    throw createPersistenceError(
      "ERR_EXPORT_PACKAGE_JSON_ARTIFACT_SNAPSHOT_NOT_FOUND",
      "JSON export artifact snapshot must exist before bundle/package manifest refresh",
      { case_id: caseId },
    );
  }

  const markdownArtifactSnapshot =
    await getLatestCaseExportPackageMarkdownArtifactSnapshot(caseId, options);
  if (!markdownArtifactSnapshot) {
    throw createPersistenceError(
      "ERR_EXPORT_PACKAGE_MARKDOWN_ARTIFACT_SNAPSHOT_NOT_FOUND",
      "Markdown export artifact snapshot must exist before bundle/package manifest refresh",
      { case_id: caseId },
    );
  }

  const pdfArtifactSnapshot = await getLatestCaseExportPackagePdfArtifactSnapshot(
    caseId,
    options,
  );
  if (!pdfArtifactSnapshot) {
    throw createPersistenceError(
      "ERR_EXPORT_PACKAGE_PDF_ARTIFACT_SNAPSHOT_NOT_FOUND",
      "PDF export artifact snapshot must exist before bundle/package manifest refresh",
      { case_id: caseId },
    );
  }

  const docxArtifactSnapshot = await getLatestCaseExportPackageDocxArtifactSnapshot(
    caseId,
    options,
  );
  if (!docxArtifactSnapshot) {
    throw createPersistenceError(
      "ERR_EXPORT_PACKAGE_DOCX_ARTIFACT_SNAPSHOT_NOT_FOUND",
      "DOCX export artifact snapshot must exist before bundle/package manifest refresh",
      { case_id: caseId },
    );
  }

  const canonicalExportPackageBundleManifest =
    deriveExportPackageBundleManifest(
      exportPackageSnapshot,
      {
        jsonArtifactSnapshot,
        markdownArtifactSnapshot,
        pdfArtifactSnapshot,
        docxArtifactSnapshot,
      },
      {
        generated_at: options.generated_at,
      },
    );

  return persistCaseExportPackageBundleManifestSnapshot(
    caseId,
    canonicalExportPackageBundleManifest,
    options,
  );
}

async function refreshCaseExportPackageBundleArchiveArtifactSnapshot(
  caseId,
  options = {},
) {
  if (!caseId || typeof caseId !== "string") {
    throw createPersistenceError("ERR_CASE_ID_INVALID", "caseId must be a non-empty string");
  }

  const bundleManifestSnapshot =
    await getLatestCaseExportPackageBundleManifestSnapshot(caseId, options);

  if (!bundleManifestSnapshot) {
    throw createPersistenceError(
      "ERR_EXPORT_PACKAGE_BUNDLE_MANIFEST_SNAPSHOT_NOT_FOUND",
      "bundle/package manifest snapshot must exist before final bundle/archive artifact refresh",
      { case_id: caseId },
    );
  }

  const jsonArtifactSnapshot = await getLatestCaseExportPackageJsonArtifactSnapshot(
    caseId,
    options,
  );
  if (!jsonArtifactSnapshot) {
    throw createPersistenceError(
      "ERR_EXPORT_PACKAGE_JSON_ARTIFACT_SNAPSHOT_NOT_FOUND",
      "JSON export artifact snapshot must exist before final bundle/archive artifact refresh",
      { case_id: caseId },
    );
  }

  const markdownArtifactSnapshot =
    await getLatestCaseExportPackageMarkdownArtifactSnapshot(caseId, options);
  if (!markdownArtifactSnapshot) {
    throw createPersistenceError(
      "ERR_EXPORT_PACKAGE_MARKDOWN_ARTIFACT_SNAPSHOT_NOT_FOUND",
      "Markdown export artifact snapshot must exist before final bundle/archive artifact refresh",
      { case_id: caseId },
    );
  }

  const pdfArtifactSnapshot = await getLatestCaseExportPackagePdfArtifactSnapshot(
    caseId,
    options,
  );
  if (!pdfArtifactSnapshot) {
    throw createPersistenceError(
      "ERR_EXPORT_PACKAGE_PDF_ARTIFACT_SNAPSHOT_NOT_FOUND",
      "PDF export artifact snapshot must exist before final bundle/archive artifact refresh",
      { case_id: caseId },
    );
  }

  const docxArtifactSnapshot = await getLatestCaseExportPackageDocxArtifactSnapshot(
    caseId,
    options,
  );
  if (!docxArtifactSnapshot) {
    throw createPersistenceError(
      "ERR_EXPORT_PACKAGE_DOCX_ARTIFACT_SNAPSHOT_NOT_FOUND",
      "DOCX export artifact snapshot must exist before final bundle/archive artifact refresh",
      { case_id: caseId },
    );
  }

  const canonicalExportPackageBundleArchiveArtifact =
    deriveExportPackageBundleArchiveArtifact(
      bundleManifestSnapshot,
      {
        jsonArtifactSnapshot,
        markdownArtifactSnapshot,
        pdfArtifactSnapshot,
        docxArtifactSnapshot,
      },
    );

  return persistCaseExportPackageBundleArchiveArtifactSnapshot(
    caseId,
    canonicalExportPackageBundleArchiveArtifact,
    options,
  );
}

async function refreshCaseExportPackageSnapshot(caseId, options = {}) {
  if (!caseId || typeof caseId !== "string") {
    throw createPersistenceError("ERR_CASE_ID_INVALID", "caseId must be a non-empty string");
  }

  const releaseEvalStore = await readStore(releaseEvalRunsFileName, options);
  const caseRuns = releaseEvalStore[caseId];

  if (!Array.isArray(caseRuns) || caseRuns.length === 0) {
    throw createPersistenceError(
      "ERR_RELEASE_EVAL_RUN_NOT_FOUND",
      "release eval run must exist before export package refresh",
      { case_id: caseId },
    );
  }

  const latestReleaseEvalRecord = caseRuns[caseRuns.length - 1];
  const latestReleaseEvalPayload = latestReleaseEvalRecord.release_eval_payload;

  if (!latestReleaseEvalPayload || typeof latestReleaseEvalPayload !== "object") {
    throw createPersistenceError(
      "ERR_RELEASE_EVAL_RUN_INVALID",
      "latest release eval payload must be an object",
      { case_id: caseId },
    );
  }

  if (
    !latestReleaseEvalPayload.profile_dossier_snapshot ||
    typeof latestReleaseEvalPayload.profile_dossier_snapshot !== "object" ||
    Array.isArray(latestReleaseEvalPayload.profile_dossier_snapshot)
  ) {
    throw createPersistenceError(
      "ERR_PROFILE_DOSSIER_SNAPSHOT_NOT_FOUND",
      "profile dossier snapshot must exist before export package refresh",
      { case_id: caseId },
    );
  }

  const canonicalExportPackage = deriveExportPackageFromProfileDossierSnapshot(
    latestReleaseEvalPayload.profile_dossier_snapshot,
    {
      generated_at: options.generated_at ?? new Date().toISOString(),
      release_eval_run_id: latestReleaseEvalPayload.release_eval_run_id,
      evaluator_version: latestReleaseEvalPayload.evaluator_version,
      jurisdiction_profile_key: latestReleaseEvalPayload.jurisdiction_profile_key,
      persisted_at: latestReleaseEvalRecord.persisted_at,
    },
  );

  return persistCaseExportPackageSnapshot(caseId, canonicalExportPackage, options);
}

async function refreshCaseReleaseEvalRun(caseId, releaseEvalSeed, options = {}) {
  if (!caseId || typeof caseId !== "string") {
    throw createPersistenceError("ERR_CASE_ID_INVALID", "caseId must be a non-empty string");
  }

  const caseProfileInputs = await getCaseProfileInputs(caseId, options);

  if (!caseProfileInputs) {
    throw createPersistenceError(
      "ERR_PROFILE_INPUTS_NOT_FOUND",
      "profile inputs must exist before release eval refresh",
      { case_id: caseId },
    );
  }

  const persistedAt = new Date().toISOString();
  const canonicalReleaseEvalRun = deriveReleaseEvalRun(
    releaseEvalSeed,
    caseProfileInputs,
    { persisted_at: persistedAt },
  );

  return persistCaseReleaseEvalRun(caseId, canonicalReleaseEvalRun, {
    ...options,
    persisted_at: persistedAt,
  });
}

module.exports = {
  getCaseProfileInputs,
  getLatestCaseExportPackageBundleArchiveArtifactProjection,
  getLatestCaseExportPackageBundleArchiveArtifactSnapshot,
  getLatestCaseExportPackageBundleManifestProjection,
  getLatestCaseExportPackageBundleManifestSnapshot,
  getLatestCaseExportPackageDocxArtifactProjection,
  getLatestCaseExportPackageDocxArtifactSnapshot,
  getLatestCaseExportPackagePdfArtifactProjection,
  getLatestCaseExportPackagePdfArtifactSnapshot,
  getLatestCaseExportPackageJsonArtifactProjection,
  getLatestCaseExportPackageJsonArtifactSnapshot,
  getLatestCaseExportPackageMarkdownArtifactProjection,
  getLatestCaseExportPackageMarkdownArtifactSnapshot,
  getLatestCaseExportPackageProjection,
  getLatestCaseExportPackageSnapshot,
  getLatestCaseProfileDossierProjection,
  getLatestCaseReleaseEvalRun,
  persistCaseExportPackageBundleArchiveArtifactSnapshot,
  persistCaseExportPackageBundleManifestSnapshot,
  persistCaseExportPackageDocxArtifactSnapshot,
  persistCaseExportPackagePdfArtifactSnapshot,
  persistCaseExportPackageJsonArtifactSnapshot,
  persistCaseExportPackageMarkdownArtifactSnapshot,
  persistCaseExportPackageSnapshot,
  persistCaseReleaseEvalRun,
  refreshCaseExportPackageBundleArchiveArtifactSnapshot,
  refreshCaseExportPackageBundleManifestSnapshot,
  refreshCaseExportPackageDocxArtifactSnapshot,
  refreshCaseExportPackagePdfArtifactSnapshot,
  refreshCaseExportPackageJsonArtifactSnapshot,
  refreshCaseExportPackageMarkdownArtifactSnapshot,
  refreshCaseExportPackageSnapshot,
  refreshCaseReleaseEvalRun,
  upsertCaseProfileInputs,
  validateProfileInputSnapshot,
};
