const {
  getLatestCaseExportPackageBundleArchiveArtifactProjection,
  getLatestCaseExportPackageBundleManifestSnapshot,
  getLatestCaseExportPackageBundleManifestProjection,
  getLatestCaseExportPackageDocxArtifactProjection,
  getLatestCaseExportPackagePdfArtifactProjection,
  getCaseProfileInputs,
  getLatestCaseExportPackageSnapshot,
  getLatestCaseExportPackageJsonArtifactProjection,
  getLatestCaseExportPackageMarkdownArtifactProjection,
  getLatestCaseExportPackageProjection,
  getLatestCaseProfileDossierProjection,
  getLatestCaseReleaseEvalRun,
  refreshCaseExportPackageBundleArchiveArtifactSnapshot,
  refreshCaseExportPackageBundleManifestSnapshot,
  refreshCaseExportPackageDocxArtifactSnapshot,
  refreshCaseExportPackagePdfArtifactSnapshot,
  refreshCaseExportPackageJsonArtifactSnapshot,
  refreshCaseExportPackageMarkdownArtifactSnapshot,
  refreshCaseExportPackageSnapshot,
  upsertCaseProfileInputs,
} = require("../../../packages/database/src/index.js");
const {
  hasJurisdictionProfileCapability,
  validateProfileInputSnapshot,
} = require("../../../packages/governance/src/index.js");

function jsonResponse(status, body) {
  return { status, body };
}

function artifactResponse(status, body, headers = {}) {
  return { status, body, headers };
}

function errorResponse(status, code, details = {}) {
  return jsonResponse(status, {
    error: {
      code,
      ...details,
    },
  });
}

function decodeCaseIdOrNull(encodedCaseId) {
  try {
    return decodeURIComponent(encodedCaseId);
  } catch (error) {
    if (error instanceof URIError) {
      return null;
    }
    throw error;
  }
}

function parseCasePath(pathname, pattern) {
  const match = pattern.exec(pathname);
  if (!match) {
    return null;
  }
  const caseId = decodeCaseIdOrNull(match[1]);
  return caseId === null ? null : { caseId };
}

function parseCaseProfileInputsPath(pathname) {
  return parseCasePath(pathname, /^\/cases\/([^/]+)\/profile-inputs$/);
}

function parseCaseReleaseEvalLatestPath(pathname) {
  return parseCasePath(pathname, /^\/cases\/([^/]+)\/release-eval\/latest$/);
}

function parseCaseProfileDossierPath(pathname) {
  return parseCasePath(pathname, /^\/cases\/([^/]+)\/profile-dossier$/);
}

function parseCaseExportPackageLatestPath(pathname) {
  return parseCasePath(pathname, /^\/cases\/([^/]+)\/export-package\/latest$/);
}

function parseCaseExportPackageBundleManifestLatestPath(pathname) {
  return parseCasePath(
    pathname,
    /^\/cases\/([^/]+)\/export-package\/bundle-manifest\/latest$/,
  );
}

function parseCaseExportPackageBundleArchiveArtifactLatestPath(pathname) {
  return parseCasePath(
    pathname,
    /^\/cases\/([^/]+)\/export-package\/bundle-archive-artifact\/latest$/,
  );
}

function parseCaseExportPackageBundleArchiveArtifactRefreshPath(pathname) {
  return parseCasePath(
    pathname,
    /^\/cases\/([^/]+)\/export-package\/bundle-archive-artifact\/refresh$/,
  );
}

function parseCaseExportPackageBundleArchiveArtifactDownloadPath(pathname) {
  return parseCasePath(
    pathname,
    /^\/cases\/([^/]+)\/export-package\/bundle-archive-artifact\/download$/,
  );
}

function parseCaseExportPackageBundleManifestRefreshPath(pathname) {
  return parseCasePath(
    pathname,
    /^\/cases\/([^/]+)\/export-package\/bundle-manifest\/refresh$/,
  );
}

function parseCaseExportPackageDocxArtifactLatestPath(pathname) {
  return parseCasePath(
    pathname,
    /^\/cases\/([^/]+)\/export-package\/docx-artifact\/latest$/,
  );
}

function parseCaseExportPackagePdfArtifactLatestPath(pathname) {
  return parseCasePath(
    pathname,
    /^\/cases\/([^/]+)\/export-package\/pdf-artifact\/latest$/,
  );
}

function parseCaseExportPackageJsonArtifactLatestPath(pathname) {
  return parseCasePath(
    pathname,
    /^\/cases\/([^/]+)\/export-package\/json-artifact\/latest$/,
  );
}

function parseCaseExportPackageMarkdownArtifactLatestPath(pathname) {
  return parseCasePath(
    pathname,
    /^\/cases\/([^/]+)\/export-package\/markdown-artifact\/latest$/,
  );
}

function parseCaseExportPackageMarkdownArtifactDownloadPath(pathname) {
  return parseCasePath(
    pathname,
    /^\/cases\/([^/]+)\/export-package\/markdown-artifact\/download$/,
  );
}

function parseCaseExportPackageDocxArtifactDownloadPath(pathname) {
  return parseCasePath(
    pathname,
    /^\/cases\/([^/]+)\/export-package\/docx-artifact\/download$/,
  );
}

function parseCaseExportPackageJsonArtifactDownloadPath(pathname) {
  return parseCasePath(
    pathname,
    /^\/cases\/([^/]+)\/export-package\/json-artifact\/download$/,
  );
}

function parseCaseExportPackagePdfArtifactDownloadPath(pathname) {
  return parseCasePath(
    pathname,
    /^\/cases\/([^/]+)\/export-package\/pdf-artifact\/download$/,
  );
}

function parseCaseExportPackagePdfArtifactRefreshPath(pathname) {
  return parseCasePath(
    pathname,
    /^\/cases\/([^/]+)\/export-package\/pdf-artifact\/refresh$/,
  );
}

function parseCaseExportPackageDocxArtifactRefreshPath(pathname) {
  return parseCasePath(
    pathname,
    /^\/cases\/([^/]+)\/export-package\/docx-artifact\/refresh$/,
  );
}

function parseCaseExportPackageJsonArtifactRefreshPath(pathname) {
  return parseCasePath(
    pathname,
    /^\/cases\/([^/]+)\/export-package\/json-artifact\/refresh$/,
  );
}

function parseCaseExportPackageMarkdownArtifactRefreshPath(pathname) {
  return parseCasePath(
    pathname,
    /^\/cases\/([^/]+)\/export-package\/markdown-artifact\/refresh$/,
  );
}

function parseCaseExportPackageRefreshPath(pathname) {
  return parseCasePath(pathname, /^\/cases\/([^/]+)\/export-package\/refresh$/);
}

async function loadAuthorizedCaseContext(
  caseId,
  auth,
  loadCaseContext,
  requiredCapability,
) {
  if (!auth || typeof auth.tenantId !== "string" || auth.tenantId.length === 0) {
    return {
      error: errorResponse(401, "ERR_UNAUTHENTICATED"),
    };
  }

  if (typeof loadCaseContext !== "function") {
    throw new Error("loadCaseContext must be provided");
  }

  const caseContext = await loadCaseContext(caseId);

  if (!caseContext || caseContext.tenant_id !== auth.tenantId) {
    return {
      error: errorResponse(403, "ERR_CASE_ACCESS_DENIED", {
        case_id: caseId,
      }),
    };
  }

  if (
    !hasJurisdictionProfileCapability(
      caseContext.jurisdiction_profile_key,
      requiredCapability,
    )
  ) {
    return {
      error: errorResponse(409, "ERR_UNSUPPORTED_JURISDICTION_PROFILE", {
        case_id: caseId,
        jurisdiction_profile_key: caseContext.jurisdiction_profile_key,
      }),
    };
  }

  return { caseContext };
}

async function handleCaseProfileInputsRoute(request, options = {}) {
  const routeMatch = parseCaseProfileInputsPath(request.path);

  if (!routeMatch) {
    return errorResponse(404, "ERR_ROUTE_NOT_FOUND");
  }

  const authorization = await loadAuthorizedCaseContext(
    routeMatch.caseId,
    request.auth,
    options.loadCaseContext,
    "profile_inputs",
  );

  if (authorization.error) {
    return authorization.error;
  }

  if (request.method === "GET") {
    const profileInputs = await getCaseProfileInputs(routeMatch.caseId, options);

    if (!profileInputs) {
      return errorResponse(404, "ERR_PROFILE_INPUTS_NOT_FOUND", {
        case_id: routeMatch.caseId,
      });
    }

    return jsonResponse(200, profileInputs);
  }

  if (request.method === "PATCH") {
    try {
      validateProfileInputSnapshot(request.body);
    } catch (error) {
      return errorResponse(422, error.code ?? "ERR_PROFILE_INPUT_INVALID", {
        ...error.details,
        message: error.message,
      });
    }

    if (
      request.body.jurisdiction_profile_key !==
      authorization.caseContext.jurisdiction_profile_key
    ) {
      return errorResponse(409, "ERR_PROFILE_INPUT_JURISDICTION_PROFILE_MISMATCH", {
        case_id: routeMatch.caseId,
        jurisdiction_profile_key: request.body.jurisdiction_profile_key,
        expected_jurisdiction_profile_key:
          authorization.caseContext.jurisdiction_profile_key,
      });
    }

    const profileInputs = await upsertCaseProfileInputs(
      routeMatch.caseId,
      request.body,
      options,
    );

    return jsonResponse(200, profileInputs);
  }

  return errorResponse(405, "ERR_METHOD_NOT_ALLOWED", {
    method: request.method,
  });
}

async function handleCaseReleaseEvalLatestRoute(request, options = {}) {
  const routeMatch = parseCaseReleaseEvalLatestPath(request.path);

  if (!routeMatch) {
    return errorResponse(404, "ERR_ROUTE_NOT_FOUND");
  }

  const authorization = await loadAuthorizedCaseContext(
    routeMatch.caseId,
    request.auth,
    options.loadCaseContext,
    "release_eval",
  );

  if (authorization.error) {
    return authorization.error;
  }

  if (request.method !== "GET") {
    return errorResponse(405, "ERR_METHOD_NOT_ALLOWED", {
      method: request.method,
    });
  }

  const releaseEvalRun = await getLatestCaseReleaseEvalRun(routeMatch.caseId, options);

  if (!releaseEvalRun) {
    return errorResponse(404, "ERR_RELEASE_EVAL_RUN_NOT_FOUND", {
      case_id: routeMatch.caseId,
    });
  }

  if (
    releaseEvalRun.jurisdiction_profile_key !==
    authorization.caseContext.jurisdiction_profile_key
  ) {
    return errorResponse(409, "ERR_RELEASE_EVAL_JURISDICTION_PROFILE_MISMATCH", {
      case_id: routeMatch.caseId,
      jurisdiction_profile_key: releaseEvalRun.jurisdiction_profile_key,
      expected_jurisdiction_profile_key:
        authorization.caseContext.jurisdiction_profile_key,
    });
  }

  return jsonResponse(200, releaseEvalRun);
}

async function handleCaseProfileDossierRoute(request, options = {}) {
  const routeMatch = parseCaseProfileDossierPath(request.path);

  if (!routeMatch) {
    return errorResponse(404, "ERR_ROUTE_NOT_FOUND");
  }

  const authorization = await loadAuthorizedCaseContext(
    routeMatch.caseId,
    request.auth,
    options.loadCaseContext,
    "profile_dossier",
  );

  if (authorization.error) {
    return authorization.error;
  }

  if (request.method !== "GET") {
    return errorResponse(405, "ERR_METHOD_NOT_ALLOWED", {
      method: request.method,
    });
  }

  const profileDossierProjection = await getLatestCaseProfileDossierProjection(
    routeMatch.caseId,
    options,
  );

  if (!profileDossierProjection) {
    return errorResponse(404, "ERR_PROFILE_DOSSIER_SNAPSHOT_NOT_FOUND", {
      case_id: routeMatch.caseId,
    });
  }

  if (
    profileDossierProjection.jurisdiction_profile_key !==
    authorization.caseContext.jurisdiction_profile_key
  ) {
    return errorResponse(409, "ERR_PROFILE_DOSSIER_JURISDICTION_PROFILE_MISMATCH", {
      case_id: routeMatch.caseId,
      jurisdiction_profile_key: profileDossierProjection.jurisdiction_profile_key,
      expected_jurisdiction_profile_key:
        authorization.caseContext.jurisdiction_profile_key,
    });
  }

  return jsonResponse(200, profileDossierProjection);
}

async function handleCaseExportPackageLatestRoute(request, options = {}) {
  const routeMatch = parseCaseExportPackageLatestPath(request.path);

  if (!routeMatch) {
    return errorResponse(404, "ERR_ROUTE_NOT_FOUND");
  }

  const authorization = await loadAuthorizedCaseContext(
    routeMatch.caseId,
    request.auth,
    options.loadCaseContext,
    "export_package",
  );

  if (authorization.error) {
    return authorization.error;
  }

  if (request.method !== "GET") {
    return errorResponse(405, "ERR_METHOD_NOT_ALLOWED", {
      method: request.method,
    });
  }

  const exportPackageProjection = await getLatestCaseExportPackageProjection(
    routeMatch.caseId,
    options,
  );

  if (!exportPackageProjection) {
    return errorResponse(404, "ERR_EXPORT_PACKAGE_SNAPSHOT_NOT_FOUND", {
      case_id: routeMatch.caseId,
    });
  }

  const expectedJurisdictionProfileKey =
    authorization.caseContext.jurisdiction_profile_key;
  const exportPackageJurisdictionProfileKey =
    exportPackageProjection.jurisdiction_profile_key;
  const profileDossierJurisdictionProfileKey =
    exportPackageProjection.profile_dossier_snapshot?.jurisdiction_profile_key;

  if (
    exportPackageJurisdictionProfileKey !== expectedJurisdictionProfileKey ||
    (typeof profileDossierJurisdictionProfileKey === "string" &&
      profileDossierJurisdictionProfileKey !== expectedJurisdictionProfileKey)
  ) {
    const errorDetails = {
      case_id: routeMatch.caseId,
      export_package_jurisdiction_profile_key: exportPackageJurisdictionProfileKey,
      expected_jurisdiction_profile_key: expectedJurisdictionProfileKey,
    };

    if (typeof profileDossierJurisdictionProfileKey === "string") {
      errorDetails.profile_dossier_jurisdiction_profile_key =
        profileDossierJurisdictionProfileKey;
    }

    return errorResponse(
      409,
      "ERR_EXPORT_PACKAGE_UPSTREAM_JURISDICTION_PROFILE_MISMATCH",
      errorDetails,
    );
  }

  return jsonResponse(200, exportPackageProjection);
}

async function handleCaseExportPackageBundleManifestLatestRoute(
  request,
  options = {},
) {
  const routeMatch = parseCaseExportPackageBundleManifestLatestPath(request.path);

  if (!routeMatch) {
    return errorResponse(404, "ERR_ROUTE_NOT_FOUND");
  }

  const authorization = await loadAuthorizedCaseContext(
    routeMatch.caseId,
    request.auth,
    options.loadCaseContext,
    "export_package_bundle_manifest",
  );

  if (authorization.error) {
    return authorization.error;
  }

  if (request.method !== "GET") {
    return errorResponse(405, "ERR_METHOD_NOT_ALLOWED", {
      method: request.method,
    });
  }

  const exportPackageBundleManifestSnapshot =
    await getLatestCaseExportPackageBundleManifestProjection(
      routeMatch.caseId,
      options,
    );

  if (!exportPackageBundleManifestSnapshot) {
    return errorResponse(404, "ERR_EXPORT_PACKAGE_BUNDLE_MANIFEST_SNAPSHOT_NOT_FOUND", {
      case_id: routeMatch.caseId,
    });
  }

  const expectedJurisdictionProfileKey =
    authorization.caseContext.jurisdiction_profile_key;
  const bundleManifestJurisdictionProfileKey =
    exportPackageBundleManifestSnapshot.jurisdiction_profile_key;
  const canonicalSourceJurisdictionProfileKey =
    exportPackageBundleManifestSnapshot.canonical_source?.jurisdiction_profile_key;

  if (
    bundleManifestJurisdictionProfileKey !== expectedJurisdictionProfileKey ||
    (typeof canonicalSourceJurisdictionProfileKey === "string" &&
      canonicalSourceJurisdictionProfileKey !== expectedJurisdictionProfileKey)
  ) {
    const errorDetails = {
      case_id: routeMatch.caseId,
      bundle_manifest_jurisdiction_profile_key:
        bundleManifestJurisdictionProfileKey,
      expected_jurisdiction_profile_key: expectedJurisdictionProfileKey,
    };

    if (typeof canonicalSourceJurisdictionProfileKey === "string") {
      errorDetails.canonical_source_jurisdiction_profile_key =
        canonicalSourceJurisdictionProfileKey;
    }

    return errorResponse(
      409,
      "ERR_EXPORT_PACKAGE_UPSTREAM_JURISDICTION_PROFILE_MISMATCH",
      errorDetails,
    );
  }

  return jsonResponse(200, exportPackageBundleManifestSnapshot);
}

async function handleCaseExportPackageBundleArchiveArtifactLatestRoute(
  request,
  options = {},
) {
  const routeMatch = parseCaseExportPackageBundleArchiveArtifactLatestPath(
    request.path,
  );

  if (!routeMatch) {
    return errorResponse(404, "ERR_ROUTE_NOT_FOUND");
  }

  const authorization = await loadAuthorizedCaseContext(
    routeMatch.caseId,
    request.auth,
    options.loadCaseContext,
    "export_package_bundle_archive_artifact",
  );

  if (authorization.error) {
    return authorization.error;
  }

  if (request.method !== "GET") {
    return errorResponse(405, "ERR_METHOD_NOT_ALLOWED", {
      method: request.method,
    });
  }

  const exportPackageBundleArchiveArtifactSnapshot =
    await getLatestCaseExportPackageBundleArchiveArtifactProjection(
      routeMatch.caseId,
      options,
    );

  if (!exportPackageBundleArchiveArtifactSnapshot) {
    return errorResponse(
      404,
      "ERR_EXPORT_PACKAGE_BUNDLE_ARCHIVE_ARTIFACT_SNAPSHOT_NOT_FOUND",
      {
        case_id: routeMatch.caseId,
      },
    );
  }

  const latestBundleManifestProjection =
    await getLatestCaseExportPackageBundleManifestProjection(
      routeMatch.caseId,
      options,
    );

  if (latestBundleManifestProjection) {
    const expectedJurisdictionProfileKey =
      authorization.caseContext.jurisdiction_profile_key;
    const bundleManifestJurisdictionProfileKey =
      latestBundleManifestProjection.jurisdiction_profile_key;
    const canonicalSourceJurisdictionProfileKey =
      latestBundleManifestProjection.canonical_source?.jurisdiction_profile_key;

    if (
      bundleManifestJurisdictionProfileKey !== expectedJurisdictionProfileKey ||
      (typeof canonicalSourceJurisdictionProfileKey === "string" &&
        canonicalSourceJurisdictionProfileKey !== expectedJurisdictionProfileKey)
    ) {
      const errorDetails = {
        case_id: routeMatch.caseId,
        bundle_manifest_jurisdiction_profile_key:
          bundleManifestJurisdictionProfileKey,
        expected_jurisdiction_profile_key: expectedJurisdictionProfileKey,
      };

      if (typeof canonicalSourceJurisdictionProfileKey === "string") {
        errorDetails.canonical_source_jurisdiction_profile_key =
          canonicalSourceJurisdictionProfileKey;
      }

      return errorResponse(
        409,
        "ERR_EXPORT_PACKAGE_UPSTREAM_JURISDICTION_PROFILE_MISMATCH",
        errorDetails,
      );
    }
  }

  return jsonResponse(200, exportPackageBundleArchiveArtifactSnapshot);
}

async function handleCaseExportPackageBundleArchiveArtifactRefreshRoute(
  request,
  options = {},
) {
  const routeMatch = parseCaseExportPackageBundleArchiveArtifactRefreshPath(
    request.path,
  );

  if (!routeMatch) {
    return errorResponse(404, "ERR_ROUTE_NOT_FOUND");
  }

  const authorization = await loadAuthorizedCaseContext(
    routeMatch.caseId,
    request.auth,
    options.loadCaseContext,
    "export_package_bundle_archive_artifact",
  );

  if (authorization.error) {
    return authorization.error;
  }

  if (request.method !== "POST") {
    return errorResponse(405, "ERR_METHOD_NOT_ALLOWED", {
      method: request.method,
    });
  }

  const latestBundleManifestSnapshot =
    await getLatestCaseExportPackageBundleManifestSnapshot(routeMatch.caseId, options);

  if (latestBundleManifestSnapshot) {
    const expectedJurisdictionProfileKey =
      authorization.caseContext.jurisdiction_profile_key;
    const bundleManifestJurisdictionProfileKey =
      latestBundleManifestSnapshot.jurisdiction_profile_key;
    const canonicalSourceJurisdictionProfileKey =
      latestBundleManifestSnapshot.canonical_source?.jurisdiction_profile_key;

    if (
      bundleManifestJurisdictionProfileKey !== expectedJurisdictionProfileKey ||
      (typeof canonicalSourceJurisdictionProfileKey === "string" &&
        canonicalSourceJurisdictionProfileKey !== expectedJurisdictionProfileKey)
    ) {
      const errorDetails = {
        case_id: routeMatch.caseId,
        bundle_manifest_jurisdiction_profile_key:
          bundleManifestJurisdictionProfileKey,
        expected_jurisdiction_profile_key: expectedJurisdictionProfileKey,
      };

      if (typeof canonicalSourceJurisdictionProfileKey === "string") {
        errorDetails.canonical_source_jurisdiction_profile_key =
          canonicalSourceJurisdictionProfileKey;
      }

      return errorResponse(
        409,
        "ERR_EXPORT_PACKAGE_UPSTREAM_JURISDICTION_PROFILE_MISMATCH",
        errorDetails,
      );
    }
  }

  try {
    const exportPackageBundleArchiveArtifactSnapshot =
      await refreshCaseExportPackageBundleArchiveArtifactSnapshot(
        routeMatch.caseId,
        options,
      );

    return jsonResponse(200, exportPackageBundleArchiveArtifactSnapshot);
  } catch (error) {
    if (
      error.code === "ERR_EXPORT_PACKAGE_BUNDLE_MANIFEST_SNAPSHOT_NOT_FOUND" ||
      error.code === "ERR_EXPORT_PACKAGE_JSON_ARTIFACT_SNAPSHOT_NOT_FOUND" ||
      error.code === "ERR_EXPORT_PACKAGE_MARKDOWN_ARTIFACT_SNAPSHOT_NOT_FOUND" ||
      error.code === "ERR_EXPORT_PACKAGE_PDF_ARTIFACT_SNAPSHOT_NOT_FOUND" ||
      error.code === "ERR_EXPORT_PACKAGE_DOCX_ARTIFACT_SNAPSHOT_NOT_FOUND"
    ) {
      return errorResponse(404, error.code, {
        case_id: routeMatch.caseId,
      });
    }

    if (error.code === "ERR_UNSUPPORTED_JURISDICTION_PROFILE") {
      return errorResponse(409, error.code, {
        case_id: routeMatch.caseId,
        ...error.details,
      });
    }

    if (
      error.code === "ERR_EXPORT_PACKAGE_BUNDLE_ARCHIVE_INVALID" ||
      error.code === "ERR_EXPORT_PACKAGE_BUNDLE_ARCHIVE_ARTIFACT_INVALID" ||
      error.code === "ERR_EXPORT_PACKAGE_BUNDLE_MANIFEST_INVALID" ||
      error.code === "ERR_EXPORT_PACKAGE_JSON_ARTIFACT_INVALID" ||
      error.code === "ERR_EXPORT_PACKAGE_MARKDOWN_ARTIFACT_INVALID" ||
      error.code === "ERR_EXPORT_PACKAGE_PDF_ARTIFACT_INVALID" ||
      error.code === "ERR_EXPORT_PACKAGE_DOCX_ARTIFACT_INVALID"
    ) {
      return errorResponse(422, error.code, {
        case_id: routeMatch.caseId,
        ...error.details,
        message: error.message,
      });
    }

    throw error;
  }
}

async function handleCaseExportPackageBundleArchiveArtifactDownloadRoute(
  request,
  options = {},
) {
  const routeMatch = parseCaseExportPackageBundleArchiveArtifactDownloadPath(
    request.path,
  );

  if (!routeMatch) {
    return errorResponse(404, "ERR_ROUTE_NOT_FOUND");
  }

  const authorization = await loadAuthorizedCaseContext(
    routeMatch.caseId,
    request.auth,
    options.loadCaseContext,
    "export_package_bundle_archive_artifact",
  );

  if (authorization.error) {
    return authorization.error;
  }

  if (request.method !== "GET") {
    return errorResponse(405, "ERR_METHOD_NOT_ALLOWED", {
      method: request.method,
    });
  }

  const exportPackageBundleArchiveArtifactProjection =
    await getLatestCaseExportPackageBundleArchiveArtifactProjection(
      routeMatch.caseId,
      options,
    );

  if (!exportPackageBundleArchiveArtifactProjection) {
    return errorResponse(
      404,
      "ERR_EXPORT_PACKAGE_BUNDLE_ARCHIVE_ARTIFACT_SNAPSHOT_NOT_FOUND",
      {
        case_id: routeMatch.caseId,
      },
    );
  }

  const latestBundleManifestProjection =
    await getLatestCaseExportPackageBundleManifestProjection(
      routeMatch.caseId,
      options,
    );

  if (latestBundleManifestProjection) {
    const expectedJurisdictionProfileKey =
      authorization.caseContext.jurisdiction_profile_key;
    const bundleManifestJurisdictionProfileKey =
      latestBundleManifestProjection.jurisdiction_profile_key;
    const canonicalSourceJurisdictionProfileKey =
      latestBundleManifestProjection.canonical_source?.jurisdiction_profile_key;

    if (
      bundleManifestJurisdictionProfileKey !== expectedJurisdictionProfileKey ||
      (typeof canonicalSourceJurisdictionProfileKey === "string" &&
        canonicalSourceJurisdictionProfileKey !== expectedJurisdictionProfileKey)
    ) {
      const errorDetails = {
        case_id: routeMatch.caseId,
        bundle_manifest_jurisdiction_profile_key:
          bundleManifestJurisdictionProfileKey,
        expected_jurisdiction_profile_key: expectedJurisdictionProfileKey,
      };

      if (typeof canonicalSourceJurisdictionProfileKey === "string") {
        errorDetails.canonical_source_jurisdiction_profile_key =
          canonicalSourceJurisdictionProfileKey;
      }

      return errorResponse(
        409,
        "ERR_EXPORT_PACKAGE_UPSTREAM_JURISDICTION_PROFILE_MISMATCH",
        errorDetails,
      );
    }
  }

  if (
    exportPackageBundleArchiveArtifactProjection.snapshot_status.snapshot_is_current !==
    true
  ) {
    return errorResponse(
      409,
      "ERR_EXPORT_PACKAGE_BUNDLE_ARCHIVE_ARTIFACT_SNAPSHOT_NOT_CURRENT",
      {
        case_id: routeMatch.caseId,
        snapshot_status: exportPackageBundleArchiveArtifactProjection.snapshot_status,
      },
    );
  }

  return artifactResponse(
    200,
    Buffer.from(exportPackageBundleArchiveArtifactProjection.body_base64, "base64"),
    {
      "content-type": exportPackageBundleArchiveArtifactProjection.content_type,
      "content-disposition": `attachment; filename="${exportPackageBundleArchiveArtifactProjection.filename}"`,
    },
  );
}

async function handleCaseExportPackageBundleManifestRefreshRoute(
  request,
  options = {},
) {
  const routeMatch = parseCaseExportPackageBundleManifestRefreshPath(request.path);

  if (!routeMatch) {
    return errorResponse(404, "ERR_ROUTE_NOT_FOUND");
  }

  const authorization = await loadAuthorizedCaseContext(
    routeMatch.caseId,
    request.auth,
    options.loadCaseContext,
    "export_package_bundle_manifest",
  );

  if (authorization.error) {
    return authorization.error;
  }

  if (request.method !== "POST") {
    return errorResponse(405, "ERR_METHOD_NOT_ALLOWED", {
      method: request.method,
    });
  }

  const latestExportPackageSnapshot = await getLatestCaseExportPackageSnapshot(
    routeMatch.caseId,
    options,
  );

  if (latestExportPackageSnapshot) {
    const expectedJurisdictionProfileKey =
      authorization.caseContext.jurisdiction_profile_key;
    const exportPackageJurisdictionProfileKey =
      latestExportPackageSnapshot.jurisdiction_profile_key;
    const profileDossierJurisdictionProfileKey =
      latestExportPackageSnapshot.profile_dossier_snapshot?.jurisdiction_profile_key;

    if (
      exportPackageJurisdictionProfileKey !== expectedJurisdictionProfileKey ||
      (typeof profileDossierJurisdictionProfileKey === "string" &&
        profileDossierJurisdictionProfileKey !== expectedJurisdictionProfileKey)
    ) {
      const errorDetails = {
        case_id: routeMatch.caseId,
        export_package_jurisdiction_profile_key: exportPackageJurisdictionProfileKey,
        expected_jurisdiction_profile_key: expectedJurisdictionProfileKey,
      };

      if (typeof profileDossierJurisdictionProfileKey === "string") {
        errorDetails.profile_dossier_jurisdiction_profile_key =
          profileDossierJurisdictionProfileKey;
      }

      return errorResponse(
        409,
        "ERR_EXPORT_PACKAGE_UPSTREAM_JURISDICTION_PROFILE_MISMATCH",
        errorDetails,
      );
    }
  }

  try {
    const exportPackageBundleManifestSnapshot =
      await refreshCaseExportPackageBundleManifestSnapshot(
        routeMatch.caseId,
        options,
      );

    return jsonResponse(200, exportPackageBundleManifestSnapshot);
  } catch (error) {
    if (
      error.code === "ERR_EXPORT_PACKAGE_SNAPSHOT_NOT_FOUND" ||
      error.code === "ERR_EXPORT_PACKAGE_JSON_ARTIFACT_SNAPSHOT_NOT_FOUND" ||
      error.code === "ERR_EXPORT_PACKAGE_MARKDOWN_ARTIFACT_SNAPSHOT_NOT_FOUND" ||
      error.code === "ERR_EXPORT_PACKAGE_PDF_ARTIFACT_SNAPSHOT_NOT_FOUND" ||
      error.code === "ERR_EXPORT_PACKAGE_DOCX_ARTIFACT_SNAPSHOT_NOT_FOUND"
    ) {
      return errorResponse(404, error.code, {
        case_id: routeMatch.caseId,
      });
    }

    if (error.code === "ERR_UNSUPPORTED_JURISDICTION_PROFILE") {
      return errorResponse(409, error.code, {
        case_id: routeMatch.caseId,
        ...error.details,
      });
    }

    if (
      error.code === "ERR_EXPORT_PACKAGE_BUNDLE_MANIFEST_INVALID" ||
      error.code === "ERR_EXPORT_PACKAGE_INVALID"
    ) {
      return errorResponse(422, error.code, {
        case_id: routeMatch.caseId,
        ...error.details,
        message: error.message,
      });
    }

    throw error;
  }
}

async function handleCaseExportPackageDocxArtifactLatestRoute(request, options = {}) {
  const routeMatch = parseCaseExportPackageDocxArtifactLatestPath(request.path);

  if (!routeMatch) {
    return errorResponse(404, "ERR_ROUTE_NOT_FOUND");
  }

  const authorization = await loadAuthorizedCaseContext(
    routeMatch.caseId,
    request.auth,
    options.loadCaseContext,
    "export_package_docx_artifact",
  );

  if (authorization.error) {
    return authorization.error;
  }

  if (request.method !== "GET") {
    return errorResponse(405, "ERR_METHOD_NOT_ALLOWED", {
      method: request.method,
    });
  }

  const exportPackageDocxArtifactProjection =
    await getLatestCaseExportPackageDocxArtifactProjection(routeMatch.caseId, options);

  if (!exportPackageDocxArtifactProjection) {
    return errorResponse(404, "ERR_EXPORT_PACKAGE_DOCX_ARTIFACT_SNAPSHOT_NOT_FOUND", {
      case_id: routeMatch.caseId,
    });
  }

  const exportPackageProjection = await getLatestCaseExportPackageProjection(
    routeMatch.caseId,
    options,
  );
  const expectedJurisdictionProfileKey =
    authorization.caseContext.jurisdiction_profile_key;
  const exportPackageJurisdictionProfileKey =
    exportPackageProjection?.jurisdiction_profile_key;
  const profileDossierJurisdictionProfileKey =
    exportPackageProjection?.profile_dossier_snapshot?.jurisdiction_profile_key;

  if (
    exportPackageJurisdictionProfileKey !== expectedJurisdictionProfileKey ||
    (typeof profileDossierJurisdictionProfileKey === "string" &&
      profileDossierJurisdictionProfileKey !== expectedJurisdictionProfileKey)
  ) {
    const errorDetails = {
      case_id: routeMatch.caseId,
      export_package_jurisdiction_profile_key: exportPackageJurisdictionProfileKey,
      expected_jurisdiction_profile_key: expectedJurisdictionProfileKey,
    };

    if (typeof profileDossierJurisdictionProfileKey === "string") {
      errorDetails.profile_dossier_jurisdiction_profile_key =
        profileDossierJurisdictionProfileKey;
    }

    return errorResponse(
      409,
      "ERR_EXPORT_PACKAGE_UPSTREAM_JURISDICTION_PROFILE_MISMATCH",
      errorDetails,
    );
  }

  return jsonResponse(200, exportPackageDocxArtifactProjection);
}

async function handleCaseExportPackagePdfArtifactLatestRoute(request, options = {}) {
  const routeMatch = parseCaseExportPackagePdfArtifactLatestPath(request.path);

  if (!routeMatch) {
    return errorResponse(404, "ERR_ROUTE_NOT_FOUND");
  }

  const authorization = await loadAuthorizedCaseContext(
    routeMatch.caseId,
    request.auth,
    options.loadCaseContext,
    "export_package_pdf_artifact",
  );

  if (authorization.error) {
    return authorization.error;
  }

  if (request.method !== "GET") {
    return errorResponse(405, "ERR_METHOD_NOT_ALLOWED", {
      method: request.method,
    });
  }

  const exportPackagePdfArtifactProjection =
    await getLatestCaseExportPackagePdfArtifactProjection(routeMatch.caseId, options);

  if (!exportPackagePdfArtifactProjection) {
    return errorResponse(404, "ERR_EXPORT_PACKAGE_PDF_ARTIFACT_SNAPSHOT_NOT_FOUND", {
      case_id: routeMatch.caseId,
    });
  }

  const exportPackageProjection = await getLatestCaseExportPackageProjection(
    routeMatch.caseId,
    options,
  );
  const expectedJurisdictionProfileKey =
    authorization.caseContext.jurisdiction_profile_key;
  const exportPackageJurisdictionProfileKey =
    exportPackageProjection?.jurisdiction_profile_key;
  const profileDossierJurisdictionProfileKey =
    exportPackageProjection?.profile_dossier_snapshot?.jurisdiction_profile_key;

  if (
    exportPackageJurisdictionProfileKey !== expectedJurisdictionProfileKey ||
    (typeof profileDossierJurisdictionProfileKey === "string" &&
      profileDossierJurisdictionProfileKey !== expectedJurisdictionProfileKey)
  ) {
    const errorDetails = {
      case_id: routeMatch.caseId,
      export_package_jurisdiction_profile_key: exportPackageJurisdictionProfileKey,
      expected_jurisdiction_profile_key: expectedJurisdictionProfileKey,
    };

    if (typeof profileDossierJurisdictionProfileKey === "string") {
      errorDetails.profile_dossier_jurisdiction_profile_key =
        profileDossierJurisdictionProfileKey;
    }

    return errorResponse(
      409,
      "ERR_EXPORT_PACKAGE_UPSTREAM_JURISDICTION_PROFILE_MISMATCH",
      errorDetails,
    );
  }

  return jsonResponse(200, exportPackagePdfArtifactProjection);
}

async function handleCaseExportPackageJsonArtifactLatestRoute(request, options = {}) {
  const routeMatch = parseCaseExportPackageJsonArtifactLatestPath(request.path);

  if (!routeMatch) {
    return errorResponse(404, "ERR_ROUTE_NOT_FOUND");
  }

  const authorization = await loadAuthorizedCaseContext(
    routeMatch.caseId,
    request.auth,
    options.loadCaseContext,
    "export_package_json_artifact",
  );

  if (authorization.error) {
    return authorization.error;
  }

  if (request.method !== "GET") {
    return errorResponse(405, "ERR_METHOD_NOT_ALLOWED", {
      method: request.method,
    });
  }

  const exportPackageJsonArtifactProjection =
    await getLatestCaseExportPackageJsonArtifactProjection(routeMatch.caseId, options);

  if (!exportPackageJsonArtifactProjection) {
    return errorResponse(404, "ERR_EXPORT_PACKAGE_JSON_ARTIFACT_SNAPSHOT_NOT_FOUND", {
      case_id: routeMatch.caseId,
    });
  }

  const exportPackageProjection = await getLatestCaseExportPackageProjection(
    routeMatch.caseId,
    options,
  );
  const expectedJurisdictionProfileKey = authorization.caseContext.jurisdiction_profile_key;
  const exportPackageJurisdictionProfileKey = exportPackageProjection?.jurisdiction_profile_key;
  const profileDossierJurisdictionProfileKey =
    exportPackageProjection?.profile_dossier_snapshot?.jurisdiction_profile_key;

  if (
    exportPackageJurisdictionProfileKey !== expectedJurisdictionProfileKey ||
    (typeof profileDossierJurisdictionProfileKey === "string" &&
      profileDossierJurisdictionProfileKey !== expectedJurisdictionProfileKey)
  ) {
    const errorDetails = {
      case_id: routeMatch.caseId,
      export_package_jurisdiction_profile_key: exportPackageJurisdictionProfileKey,
      expected_jurisdiction_profile_key: expectedJurisdictionProfileKey,
    };

    if (typeof profileDossierJurisdictionProfileKey === "string") {
      errorDetails.profile_dossier_jurisdiction_profile_key =
        profileDossierJurisdictionProfileKey;
    }

    return errorResponse(
      409,
      "ERR_EXPORT_PACKAGE_UPSTREAM_JURISDICTION_PROFILE_MISMATCH",
      errorDetails,
    );
  }

  return jsonResponse(200, exportPackageJsonArtifactProjection);
}

async function handleCaseExportPackageMarkdownArtifactLatestRoute(
  request,
  options = {},
) {
  const routeMatch = parseCaseExportPackageMarkdownArtifactLatestPath(request.path);

  if (!routeMatch) {
    return errorResponse(404, "ERR_ROUTE_NOT_FOUND");
  }

  const authorization = await loadAuthorizedCaseContext(
    routeMatch.caseId,
    request.auth,
    options.loadCaseContext,
    "export_package_markdown_artifact",
  );

  if (authorization.error) {
    return authorization.error;
  }

  if (request.method !== "GET") {
    return errorResponse(405, "ERR_METHOD_NOT_ALLOWED", {
      method: request.method,
    });
  }

  const exportPackageMarkdownArtifactProjection =
    await getLatestCaseExportPackageMarkdownArtifactProjection(
      routeMatch.caseId,
      options,
    );

  if (!exportPackageMarkdownArtifactProjection) {
    return errorResponse(404, "ERR_EXPORT_PACKAGE_MARKDOWN_ARTIFACT_SNAPSHOT_NOT_FOUND", {
      case_id: routeMatch.caseId,
    });
  }

  const exportPackageProjection = await getLatestCaseExportPackageProjection(
    routeMatch.caseId,
    options,
  );
  const expectedJurisdictionProfileKey =
    authorization.caseContext.jurisdiction_profile_key;
  const exportPackageJurisdictionProfileKey =
    exportPackageProjection?.jurisdiction_profile_key;
  const profileDossierJurisdictionProfileKey =
    exportPackageProjection?.profile_dossier_snapshot
      ?.jurisdiction_profile_key;

  if (
    exportPackageJurisdictionProfileKey !== expectedJurisdictionProfileKey ||
    (typeof profileDossierJurisdictionProfileKey === "string" &&
      profileDossierJurisdictionProfileKey !== expectedJurisdictionProfileKey)
  ) {
    const errorDetails = {
      case_id: routeMatch.caseId,
      export_package_jurisdiction_profile_key: exportPackageJurisdictionProfileKey,
      expected_jurisdiction_profile_key: expectedJurisdictionProfileKey,
    };

    if (typeof profileDossierJurisdictionProfileKey === "string") {
      errorDetails.profile_dossier_jurisdiction_profile_key =
        profileDossierJurisdictionProfileKey;
    }

    return errorResponse(
      409,
      "ERR_EXPORT_PACKAGE_UPSTREAM_JURISDICTION_PROFILE_MISMATCH",
      errorDetails,
    );
  }

  return jsonResponse(200, exportPackageMarkdownArtifactProjection);
}

async function handleCaseExportPackageMarkdownArtifactDownloadRoute(
  request,
  options = {},
) {
  const routeMatch = parseCaseExportPackageMarkdownArtifactDownloadPath(request.path);

  if (!routeMatch) {
    return errorResponse(404, "ERR_ROUTE_NOT_FOUND");
  }

  const authorization = await loadAuthorizedCaseContext(
    routeMatch.caseId,
    request.auth,
    options.loadCaseContext,
    "export_package_markdown_artifact",
  );

  if (authorization.error) {
    return authorization.error;
  }

  if (request.method !== "GET") {
    return errorResponse(405, "ERR_METHOD_NOT_ALLOWED", {
      method: request.method,
    });
  }

  const exportPackageMarkdownArtifactProjection =
    await getLatestCaseExportPackageMarkdownArtifactProjection(
      routeMatch.caseId,
      options,
    );

  if (!exportPackageMarkdownArtifactProjection) {
    return errorResponse(404, "ERR_EXPORT_PACKAGE_MARKDOWN_ARTIFACT_SNAPSHOT_NOT_FOUND", {
      case_id: routeMatch.caseId,
    });
  }

  const exportPackageProjection = await getLatestCaseExportPackageProjection(
    routeMatch.caseId,
    options,
  );
  const expectedJurisdictionProfileKey =
    authorization.caseContext.jurisdiction_profile_key;
  const exportPackageJurisdictionProfileKey =
    exportPackageProjection?.jurisdiction_profile_key;
  const profileDossierJurisdictionProfileKey =
    exportPackageProjection?.profile_dossier_snapshot?.jurisdiction_profile_key;

  if (
    exportPackageJurisdictionProfileKey !== expectedJurisdictionProfileKey ||
    (typeof profileDossierJurisdictionProfileKey === "string" &&
      profileDossierJurisdictionProfileKey !== expectedJurisdictionProfileKey)
  ) {
    const errorDetails = {
      case_id: routeMatch.caseId,
      export_package_jurisdiction_profile_key: exportPackageJurisdictionProfileKey,
      expected_jurisdiction_profile_key: expectedJurisdictionProfileKey,
    };

    if (typeof profileDossierJurisdictionProfileKey === "string") {
      errorDetails.profile_dossier_jurisdiction_profile_key =
        profileDossierJurisdictionProfileKey;
    }

    return errorResponse(
      409,
      "ERR_EXPORT_PACKAGE_UPSTREAM_JURISDICTION_PROFILE_MISMATCH",
      errorDetails,
    );
  }

  if (exportPackageMarkdownArtifactProjection.snapshot_status.snapshot_is_current !== true) {
    return errorResponse(409, "ERR_EXPORT_PACKAGE_MARKDOWN_ARTIFACT_SNAPSHOT_NOT_CURRENT", {
      case_id: routeMatch.caseId,
      snapshot_status: exportPackageMarkdownArtifactProjection.snapshot_status,
    });
  }

  return artifactResponse(200, exportPackageMarkdownArtifactProjection.body_utf8, {
    "content-type": exportPackageMarkdownArtifactProjection.content_type,
    "content-disposition": `attachment; filename="${exportPackageMarkdownArtifactProjection.filename}"`,
  });
}

async function handleCaseExportPackageDocxArtifactDownloadRoute(request, options = {}) {
  const routeMatch = parseCaseExportPackageDocxArtifactDownloadPath(request.path);

  if (!routeMatch) {
    return errorResponse(404, "ERR_ROUTE_NOT_FOUND");
  }

  const authorization = await loadAuthorizedCaseContext(
    routeMatch.caseId,
    request.auth,
    options.loadCaseContext,
    "export_package_docx_artifact",
  );

  if (authorization.error) {
    return authorization.error;
  }

  if (request.method !== "GET") {
    return errorResponse(405, "ERR_METHOD_NOT_ALLOWED", {
      method: request.method,
    });
  }

  const exportPackageDocxArtifactProjection =
    await getLatestCaseExportPackageDocxArtifactProjection(routeMatch.caseId, options);

  if (!exportPackageDocxArtifactProjection) {
    return errorResponse(404, "ERR_EXPORT_PACKAGE_DOCX_ARTIFACT_SNAPSHOT_NOT_FOUND", {
      case_id: routeMatch.caseId,
    });
  }

  const exportPackageProjection = await getLatestCaseExportPackageProjection(
    routeMatch.caseId,
    options,
  );
  const expectedJurisdictionProfileKey =
    authorization.caseContext.jurisdiction_profile_key;
  const exportPackageJurisdictionProfileKey =
    exportPackageProjection?.jurisdiction_profile_key;
  const profileDossierJurisdictionProfileKey =
    exportPackageProjection?.profile_dossier_snapshot?.jurisdiction_profile_key;

  if (
    exportPackageJurisdictionProfileKey !== expectedJurisdictionProfileKey ||
    (typeof profileDossierJurisdictionProfileKey === "string" &&
      profileDossierJurisdictionProfileKey !== expectedJurisdictionProfileKey)
  ) {
    const errorDetails = {
      case_id: routeMatch.caseId,
      export_package_jurisdiction_profile_key: exportPackageJurisdictionProfileKey,
      expected_jurisdiction_profile_key: expectedJurisdictionProfileKey,
    };

    if (typeof profileDossierJurisdictionProfileKey === "string") {
      errorDetails.profile_dossier_jurisdiction_profile_key =
        profileDossierJurisdictionProfileKey;
    }

    return errorResponse(
      409,
      "ERR_EXPORT_PACKAGE_UPSTREAM_JURISDICTION_PROFILE_MISMATCH",
      errorDetails,
    );
  }

  if (exportPackageDocxArtifactProjection.snapshot_status.snapshot_is_current !== true) {
    return errorResponse(409, "ERR_EXPORT_PACKAGE_DOCX_ARTIFACT_SNAPSHOT_NOT_CURRENT", {
      case_id: routeMatch.caseId,
      snapshot_status: exportPackageDocxArtifactProjection.snapshot_status,
    });
  }

  return artifactResponse(
    200,
    Buffer.from(exportPackageDocxArtifactProjection.body_base64, "base64"),
    {
      "content-type": exportPackageDocxArtifactProjection.content_type,
      "content-disposition": `attachment; filename="${exportPackageDocxArtifactProjection.filename}"`,
    },
  );
}

async function handleCaseExportPackageJsonArtifactDownloadRoute(request, options = {}) {
  const routeMatch = parseCaseExportPackageJsonArtifactDownloadPath(request.path);

  if (!routeMatch) {
    return errorResponse(404, "ERR_ROUTE_NOT_FOUND");
  }

  const authorization = await loadAuthorizedCaseContext(
    routeMatch.caseId,
    request.auth,
    options.loadCaseContext,
    "export_package_json_artifact",
  );

  if (authorization.error) {
    return authorization.error;
  }

  if (request.method !== "GET") {
    return errorResponse(405, "ERR_METHOD_NOT_ALLOWED", {
      method: request.method,
    });
  }

  const exportPackageJsonArtifactProjection =
    await getLatestCaseExportPackageJsonArtifactProjection(routeMatch.caseId, options);

  if (!exportPackageJsonArtifactProjection) {
    return errorResponse(404, "ERR_EXPORT_PACKAGE_JSON_ARTIFACT_SNAPSHOT_NOT_FOUND", {
      case_id: routeMatch.caseId,
    });
  }

  const exportPackageProjection = await getLatestCaseExportPackageProjection(
    routeMatch.caseId,
    options,
  );
  const expectedJurisdictionProfileKey =
    authorization.caseContext.jurisdiction_profile_key;
  const exportPackageJurisdictionProfileKey =
    exportPackageProjection?.jurisdiction_profile_key;
  const profileDossierJurisdictionProfileKey =
    exportPackageProjection?.profile_dossier_snapshot?.jurisdiction_profile_key;

  if (
    exportPackageJurisdictionProfileKey !== expectedJurisdictionProfileKey ||
    (typeof profileDossierJurisdictionProfileKey === "string" &&
      profileDossierJurisdictionProfileKey !== expectedJurisdictionProfileKey)
  ) {
    const errorDetails = {
      case_id: routeMatch.caseId,
      export_package_jurisdiction_profile_key: exportPackageJurisdictionProfileKey,
      expected_jurisdiction_profile_key: expectedJurisdictionProfileKey,
    };

    if (typeof profileDossierJurisdictionProfileKey === "string") {
      errorDetails.profile_dossier_jurisdiction_profile_key =
        profileDossierJurisdictionProfileKey;
    }

    return errorResponse(
      409,
      "ERR_EXPORT_PACKAGE_UPSTREAM_JURISDICTION_PROFILE_MISMATCH",
      errorDetails,
    );
  }

  if (exportPackageJsonArtifactProjection.snapshot_status.snapshot_is_current !== true) {
    return errorResponse(409, "ERR_EXPORT_PACKAGE_JSON_ARTIFACT_SNAPSHOT_NOT_CURRENT", {
      case_id: routeMatch.caseId,
      snapshot_status: exportPackageJsonArtifactProjection.snapshot_status,
    });
  }

  return artifactResponse(200, exportPackageJsonArtifactProjection.body_utf8, {
    "content-type": exportPackageJsonArtifactProjection.content_type,
    "content-disposition": `attachment; filename="${exportPackageJsonArtifactProjection.filename}"`,
  });
}

async function handleCaseExportPackagePdfArtifactDownloadRoute(request, options = {}) {
  const routeMatch = parseCaseExportPackagePdfArtifactDownloadPath(request.path);

  if (!routeMatch) {
    return errorResponse(404, "ERR_ROUTE_NOT_FOUND");
  }

  const authorization = await loadAuthorizedCaseContext(
    routeMatch.caseId,
    request.auth,
    options.loadCaseContext,
    "export_package_pdf_artifact",
  );

  if (authorization.error) {
    return authorization.error;
  }

  if (request.method !== "GET") {
    return errorResponse(405, "ERR_METHOD_NOT_ALLOWED", {
      method: request.method,
    });
  }

  const exportPackagePdfArtifactProjection =
    await getLatestCaseExportPackagePdfArtifactProjection(routeMatch.caseId, options);

  if (!exportPackagePdfArtifactProjection) {
    return errorResponse(404, "ERR_EXPORT_PACKAGE_PDF_ARTIFACT_SNAPSHOT_NOT_FOUND", {
      case_id: routeMatch.caseId,
    });
  }

  const exportPackageProjection = await getLatestCaseExportPackageProjection(
    routeMatch.caseId,
    options,
  );
  const expectedJurisdictionProfileKey =
    authorization.caseContext.jurisdiction_profile_key;
  const exportPackageJurisdictionProfileKey =
    exportPackageProjection?.jurisdiction_profile_key;
  const profileDossierJurisdictionProfileKey =
    exportPackageProjection?.profile_dossier_snapshot?.jurisdiction_profile_key;

  if (
    exportPackageJurisdictionProfileKey !== expectedJurisdictionProfileKey ||
    (typeof profileDossierJurisdictionProfileKey === "string" &&
      profileDossierJurisdictionProfileKey !== expectedJurisdictionProfileKey)
  ) {
    const errorDetails = {
      case_id: routeMatch.caseId,
      export_package_jurisdiction_profile_key: exportPackageJurisdictionProfileKey,
      expected_jurisdiction_profile_key: expectedJurisdictionProfileKey,
    };

    if (typeof profileDossierJurisdictionProfileKey === "string") {
      errorDetails.profile_dossier_jurisdiction_profile_key =
        profileDossierJurisdictionProfileKey;
    }

    return errorResponse(
      409,
      "ERR_EXPORT_PACKAGE_UPSTREAM_JURISDICTION_PROFILE_MISMATCH",
      errorDetails,
    );
  }

  if (exportPackagePdfArtifactProjection.snapshot_status.snapshot_is_current !== true) {
    return errorResponse(409, "ERR_EXPORT_PACKAGE_PDF_ARTIFACT_SNAPSHOT_NOT_CURRENT", {
      case_id: routeMatch.caseId,
      snapshot_status: exportPackagePdfArtifactProjection.snapshot_status,
    });
  }

  return artifactResponse(
    200,
    Buffer.from(exportPackagePdfArtifactProjection.body_base64, "base64"),
    {
      "content-type": exportPackagePdfArtifactProjection.content_type,
      "content-disposition": `attachment; filename="${exportPackagePdfArtifactProjection.filename}"`,
    },
  );
}

async function handleCaseExportPackagePdfArtifactRefreshRoute(request, options = {}) {
  const routeMatch = parseCaseExportPackagePdfArtifactRefreshPath(request.path);

  if (!routeMatch) {
    return errorResponse(404, "ERR_ROUTE_NOT_FOUND");
  }

  const authorization = await loadAuthorizedCaseContext(
    routeMatch.caseId,
    request.auth,
    options.loadCaseContext,
    "export_package_pdf_artifact",
  );

  if (authorization.error) {
    return authorization.error;
  }

  if (request.method !== "POST") {
    return errorResponse(405, "ERR_METHOD_NOT_ALLOWED", {
      method: request.method,
    });
  }

  const latestExportPackageSnapshot = await getLatestCaseExportPackageSnapshot(
    routeMatch.caseId,
    options,
  );

  if (latestExportPackageSnapshot) {
    const expectedJurisdictionProfileKey =
      authorization.caseContext.jurisdiction_profile_key;
    const exportPackageJurisdictionProfileKey =
      latestExportPackageSnapshot.jurisdiction_profile_key;
    const profileDossierJurisdictionProfileKey =
      latestExportPackageSnapshot.profile_dossier_snapshot?.jurisdiction_profile_key;

    if (
      exportPackageJurisdictionProfileKey !== expectedJurisdictionProfileKey ||
      (typeof profileDossierJurisdictionProfileKey === "string" &&
        profileDossierJurisdictionProfileKey !== expectedJurisdictionProfileKey)
    ) {
      const errorDetails = {
        case_id: routeMatch.caseId,
        export_package_jurisdiction_profile_key: exportPackageJurisdictionProfileKey,
        expected_jurisdiction_profile_key: expectedJurisdictionProfileKey,
      };

      if (typeof profileDossierJurisdictionProfileKey === "string") {
        errorDetails.profile_dossier_jurisdiction_profile_key =
          profileDossierJurisdictionProfileKey;
      }

      return errorResponse(
        409,
        "ERR_EXPORT_PACKAGE_UPSTREAM_JURISDICTION_PROFILE_MISMATCH",
        errorDetails,
      );
    }
  }

  try {
    const exportPackagePdfArtifactSnapshot =
      await refreshCaseExportPackagePdfArtifactSnapshot(routeMatch.caseId, options);

    return jsonResponse(200, exportPackagePdfArtifactSnapshot);
  } catch (error) {
    if (error.code === "ERR_EXPORT_PACKAGE_SNAPSHOT_NOT_FOUND") {
      return errorResponse(404, error.code, {
        case_id: routeMatch.caseId,
      });
    }

    if (error.code === "ERR_UNSUPPORTED_JURISDICTION_PROFILE") {
      return errorResponse(409, error.code, {
        case_id: routeMatch.caseId,
        ...error.details,
      });
    }

    if (
      error.code === "ERR_EXPORT_PACKAGE_PDF_ARTIFACT_INVALID" ||
      error.code === "ERR_EXPORT_PACKAGE_INVALID"
    ) {
      return errorResponse(422, error.code, {
        case_id: routeMatch.caseId,
        ...error.details,
        message: error.message,
      });
    }

    throw error;
  }
}

async function handleCaseExportPackageDocxArtifactRefreshRoute(request, options = {}) {
  const routeMatch = parseCaseExportPackageDocxArtifactRefreshPath(request.path);

  if (!routeMatch) {
    return errorResponse(404, "ERR_ROUTE_NOT_FOUND");
  }

  const authorization = await loadAuthorizedCaseContext(
    routeMatch.caseId,
    request.auth,
    options.loadCaseContext,
    "export_package_docx_artifact",
  );

  if (authorization.error) {
    return authorization.error;
  }

  if (request.method !== "POST") {
    return errorResponse(405, "ERR_METHOD_NOT_ALLOWED", {
      method: request.method,
    });
  }

  const latestExportPackageSnapshot = await getLatestCaseExportPackageSnapshot(
    routeMatch.caseId,
    options,
  );

  if (latestExportPackageSnapshot) {
    const expectedJurisdictionProfileKey =
      authorization.caseContext.jurisdiction_profile_key;
    const exportPackageJurisdictionProfileKey =
      latestExportPackageSnapshot.jurisdiction_profile_key;
    const profileDossierJurisdictionProfileKey =
      latestExportPackageSnapshot.profile_dossier_snapshot?.jurisdiction_profile_key;

    if (
      exportPackageJurisdictionProfileKey !== expectedJurisdictionProfileKey ||
      (typeof profileDossierJurisdictionProfileKey === "string" &&
        profileDossierJurisdictionProfileKey !== expectedJurisdictionProfileKey)
    ) {
      const errorDetails = {
        case_id: routeMatch.caseId,
        export_package_jurisdiction_profile_key: exportPackageJurisdictionProfileKey,
        expected_jurisdiction_profile_key: expectedJurisdictionProfileKey,
      };

      if (typeof profileDossierJurisdictionProfileKey === "string") {
        errorDetails.profile_dossier_jurisdiction_profile_key =
          profileDossierJurisdictionProfileKey;
      }

      return errorResponse(
        409,
        "ERR_EXPORT_PACKAGE_UPSTREAM_JURISDICTION_PROFILE_MISMATCH",
        errorDetails,
      );
    }
  }

  try {
    const exportPackageDocxArtifactSnapshot =
      await refreshCaseExportPackageDocxArtifactSnapshot(routeMatch.caseId, options);

    return jsonResponse(200, exportPackageDocxArtifactSnapshot);
  } catch (error) {
    if (error.code === "ERR_EXPORT_PACKAGE_SNAPSHOT_NOT_FOUND") {
      return errorResponse(404, error.code, {
        case_id: routeMatch.caseId,
      });
    }

    if (error.code === "ERR_UNSUPPORTED_JURISDICTION_PROFILE") {
      return errorResponse(409, error.code, {
        case_id: routeMatch.caseId,
        ...error.details,
      });
    }

    if (
      error.code === "ERR_EXPORT_PACKAGE_DOCX_ARTIFACT_INVALID" ||
      error.code === "ERR_EXPORT_PACKAGE_INVALID"
    ) {
      return errorResponse(422, error.code, {
        case_id: routeMatch.caseId,
        ...error.details,
        message: error.message,
      });
    }

    throw error;
  }
}

async function handleCaseExportPackageJsonArtifactRefreshRoute(request, options = {}) {
  const routeMatch = parseCaseExportPackageJsonArtifactRefreshPath(request.path);

  if (!routeMatch) {
    return errorResponse(404, "ERR_ROUTE_NOT_FOUND");
  }

  const authorization = await loadAuthorizedCaseContext(
    routeMatch.caseId,
    request.auth,
    options.loadCaseContext,
    "export_package_json_artifact",
  );

  if (authorization.error) {
    return authorization.error;
  }

  if (request.method !== "POST") {
    return errorResponse(405, "ERR_METHOD_NOT_ALLOWED", {
      method: request.method,
    });
  }

  const latestExportPackageSnapshot = await getLatestCaseExportPackageSnapshot(
    routeMatch.caseId,
    options,
  );

  if (latestExportPackageSnapshot) {
    const expectedJurisdictionProfileKey =
      authorization.caseContext.jurisdiction_profile_key;
    const exportPackageJurisdictionProfileKey =
      latestExportPackageSnapshot.jurisdiction_profile_key;
    const profileDossierJurisdictionProfileKey =
      latestExportPackageSnapshot.profile_dossier_snapshot?.jurisdiction_profile_key;

    if (
      exportPackageJurisdictionProfileKey !== expectedJurisdictionProfileKey ||
      (typeof profileDossierJurisdictionProfileKey === "string" &&
        profileDossierJurisdictionProfileKey !== expectedJurisdictionProfileKey)
    ) {
      const errorDetails = {
        case_id: routeMatch.caseId,
        export_package_jurisdiction_profile_key: exportPackageJurisdictionProfileKey,
        expected_jurisdiction_profile_key: expectedJurisdictionProfileKey,
      };

      if (typeof profileDossierJurisdictionProfileKey === "string") {
        errorDetails.profile_dossier_jurisdiction_profile_key =
          profileDossierJurisdictionProfileKey;
      }

      return errorResponse(
        409,
        "ERR_EXPORT_PACKAGE_UPSTREAM_JURISDICTION_PROFILE_MISMATCH",
        errorDetails,
      );
    }
  }

  try {
    const exportPackageJsonArtifactSnapshot =
      await refreshCaseExportPackageJsonArtifactSnapshot(routeMatch.caseId, options);

    return jsonResponse(200, exportPackageJsonArtifactSnapshot);
  } catch (error) {
    if (error.code === "ERR_EXPORT_PACKAGE_SNAPSHOT_NOT_FOUND") {
      return errorResponse(404, error.code, {
        case_id: routeMatch.caseId,
      });
    }

    if (error.code === "ERR_UNSUPPORTED_JURISDICTION_PROFILE") {
      return errorResponse(409, error.code, {
        case_id: routeMatch.caseId,
        ...error.details,
      });
    }

    if (
      error.code === "ERR_EXPORT_PACKAGE_JSON_ARTIFACT_INVALID" ||
      error.code === "ERR_EXPORT_PACKAGE_INVALID"
    ) {
      return errorResponse(422, error.code, {
        case_id: routeMatch.caseId,
        ...error.details,
        message: error.message,
      });
    }

    throw error;
  }
}

async function handleCaseExportPackageMarkdownArtifactRefreshRoute(
  request,
  options = {},
) {
  const routeMatch = parseCaseExportPackageMarkdownArtifactRefreshPath(request.path);

  if (!routeMatch) {
    return errorResponse(404, "ERR_ROUTE_NOT_FOUND");
  }

  const authorization = await loadAuthorizedCaseContext(
    routeMatch.caseId,
    request.auth,
    options.loadCaseContext,
    "export_package_markdown_artifact",
  );

  if (authorization.error) {
    return authorization.error;
  }

  if (request.method !== "POST") {
    return errorResponse(405, "ERR_METHOD_NOT_ALLOWED", {
      method: request.method,
    });
  }

  const latestExportPackageSnapshot = await getLatestCaseExportPackageSnapshot(
    routeMatch.caseId,
    options,
  );

  if (latestExportPackageSnapshot) {
    const expectedJurisdictionProfileKey =
      authorization.caseContext.jurisdiction_profile_key;
    const exportPackageJurisdictionProfileKey =
      latestExportPackageSnapshot.jurisdiction_profile_key;
    const profileDossierJurisdictionProfileKey =
      latestExportPackageSnapshot.profile_dossier_snapshot?.jurisdiction_profile_key;

    if (
      exportPackageJurisdictionProfileKey !== expectedJurisdictionProfileKey ||
      (typeof profileDossierJurisdictionProfileKey === "string" &&
        profileDossierJurisdictionProfileKey !== expectedJurisdictionProfileKey)
    ) {
      const errorDetails = {
        case_id: routeMatch.caseId,
        export_package_jurisdiction_profile_key: exportPackageJurisdictionProfileKey,
        expected_jurisdiction_profile_key: expectedJurisdictionProfileKey,
      };

      if (typeof profileDossierJurisdictionProfileKey === "string") {
        errorDetails.profile_dossier_jurisdiction_profile_key =
          profileDossierJurisdictionProfileKey;
      }

      return errorResponse(
        409,
        "ERR_EXPORT_PACKAGE_UPSTREAM_JURISDICTION_PROFILE_MISMATCH",
        errorDetails,
      );
    }
  }

  try {
    const exportPackageMarkdownArtifactSnapshot =
      await refreshCaseExportPackageMarkdownArtifactSnapshot(
        routeMatch.caseId,
        options,
      );

    return jsonResponse(200, exportPackageMarkdownArtifactSnapshot);
  } catch (error) {
    if (error.code === "ERR_EXPORT_PACKAGE_SNAPSHOT_NOT_FOUND") {
      return errorResponse(404, error.code, {
        case_id: routeMatch.caseId,
      });
    }

    if (error.code === "ERR_UNSUPPORTED_JURISDICTION_PROFILE") {
      return errorResponse(409, error.code, {
        case_id: routeMatch.caseId,
        ...error.details,
      });
    }

    if (
      error.code === "ERR_EXPORT_PACKAGE_MARKDOWN_ARTIFACT_INVALID" ||
      error.code === "ERR_EXPORT_PACKAGE_INVALID"
    ) {
      return errorResponse(422, error.code, {
        case_id: routeMatch.caseId,
        ...error.details,
        message: error.message,
      });
    }

    throw error;
  }
}

async function handleCaseExportPackageRefreshRoute(request, options = {}) {
  const routeMatch = parseCaseExportPackageRefreshPath(request.path);

  if (!routeMatch) {
    return errorResponse(404, "ERR_ROUTE_NOT_FOUND");
  }

  const authorization = await loadAuthorizedCaseContext(
    routeMatch.caseId,
    request.auth,
    options.loadCaseContext,
    "export_package",
  );

  if (authorization.error) {
    return authorization.error;
  }

  if (request.method !== "POST") {
    return errorResponse(405, "ERR_METHOD_NOT_ALLOWED", {
      method: request.method,
    });
  }

  const latestReleaseEvalRun = await getLatestCaseReleaseEvalRun(routeMatch.caseId, options);

  if (latestReleaseEvalRun) {
    const expectedJurisdictionProfileKey =
      authorization.caseContext.jurisdiction_profile_key;
    const releaseEvalJurisdictionProfileKey =
      latestReleaseEvalRun.jurisdiction_profile_key;
    const profileDossierJurisdictionProfileKey =
      latestReleaseEvalRun.profile_dossier_snapshot?.jurisdiction_profile_key;

    if (
      releaseEvalJurisdictionProfileKey !== expectedJurisdictionProfileKey ||
      (typeof profileDossierJurisdictionProfileKey === "string" &&
        profileDossierJurisdictionProfileKey !== expectedJurisdictionProfileKey)
    ) {
      const errorDetails = {
        case_id: routeMatch.caseId,
        release_eval_jurisdiction_profile_key: releaseEvalJurisdictionProfileKey,
        expected_jurisdiction_profile_key: expectedJurisdictionProfileKey,
      };

      if (typeof profileDossierJurisdictionProfileKey === "string") {
        errorDetails.profile_dossier_jurisdiction_profile_key =
          profileDossierJurisdictionProfileKey;
      }

      return errorResponse(
        409,
        "ERR_EXPORT_PACKAGE_UPSTREAM_JURISDICTION_PROFILE_MISMATCH",
        errorDetails,
      );
    }
  }

  try {
    const exportPackageSnapshot = await refreshCaseExportPackageSnapshot(
      routeMatch.caseId,
      {
        ...options,
        generated_at: request.body?.generated_at,
      },
    );

    return jsonResponse(200, exportPackageSnapshot);
  } catch (error) {
    if (
      error.code === "ERR_RELEASE_EVAL_RUN_NOT_FOUND" ||
      error.code === "ERR_PROFILE_DOSSIER_SNAPSHOT_NOT_FOUND"
    ) {
      return errorResponse(404, "ERR_PROFILE_DOSSIER_SNAPSHOT_NOT_FOUND", {
        case_id: routeMatch.caseId,
      });
    }

    if (error.code === "ERR_UNSUPPORTED_JURISDICTION_PROFILE") {
      return errorResponse(409, error.code, {
        case_id: routeMatch.caseId,
        ...error.details,
      });
    }

    if (
      error.code === "ERR_EXPORT_PACKAGE_INVALID" ||
      error.code === "ERR_PROFILE_DOSSIER_SNAPSHOT_INVALID"
    ) {
      return errorResponse(422, error.code, {
        case_id: routeMatch.caseId,
        ...error.details,
        message: error.message,
      });
    }

    throw error;
  }
}

module.exports = {
  handleCaseExportPackageBundleArchiveArtifactDownloadRoute,
  handleCaseExportPackageBundleArchiveArtifactRefreshRoute,
  handleCaseExportPackageBundleArchiveArtifactLatestRoute,
  handleCaseExportPackageBundleManifestLatestRoute,
  handleCaseExportPackageBundleManifestRefreshRoute,
  handleCaseExportPackageDocxArtifactDownloadRoute,
  handleCaseExportPackageDocxArtifactLatestRoute,
  handleCaseExportPackageDocxArtifactRefreshRoute,
  handleCaseExportPackagePdfArtifactDownloadRoute,
  handleCaseExportPackagePdfArtifactRefreshRoute,
  handleCaseExportPackagePdfArtifactLatestRoute,
  handleCaseExportPackageJsonArtifactDownloadRoute,
  handleCaseExportPackageJsonArtifactLatestRoute,
  handleCaseExportPackageJsonArtifactRefreshRoute,
  handleCaseExportPackageMarkdownArtifactDownloadRoute,
  handleCaseExportPackageMarkdownArtifactRefreshRoute,
  handleCaseExportPackageMarkdownArtifactLatestRoute,
  handleCaseExportPackageLatestRoute,
  handleCaseExportPackageRefreshRoute,
  handleCaseProfileDossierRoute,
  handleCaseProfileInputsRoute,
  handleCaseReleaseEvalLatestRoute,
};
