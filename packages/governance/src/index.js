const crypto = require("node:crypto");

const {
  dataHandlingBlockerRegistry,
  dataHandlingNonAuthorizationInvariant,
  decideMaterialRoute,
  evaluateNoOverclaim,
  getDataHandlingBlockerEntry,
  getGlobalNonAuthorizationInvariant,
  getMaterialClassEntry,
  getMaterialHandlingStatusEntry,
  getNonProofStatusEntry,
  getRouteDecisionEntry,
  materialClassRegistry,
  materialHandlingStatusRegistry,
  nonProofStatusRegistry,
  routeDecisionRegistry,
} = require("./data-handling-control-plane.js");
const {
  allowedEventContentCategoryRegistry,
  classifyProhibitedEventContent,
  deriveNoContentAuditAccessEventDescriptor,
  eventFamilyRegistry,
  getAllowedEventContentCategoryEntry,
  getEventFamilyEntry,
  getProhibitedEventContentCategoryEntry,
  noContentAuditAccessImplementationBoundary,
  noContentAuditAccessMarkers,
  prohibitedEventContentCategoryRegistry,
} = require("./no-content-audit-access-event-taxonomy.js");
const {
  accessDecisionRegistry,
  actorTypeRegistry,
  adminSupportDeniedActionCategories,
  deriveAdminSupportNonBypassDecision,
  deriveRbacDenyByDefaultAccessDecision,
  evaluateRouteCaseCapabilityNonOverclaim,
  permissionCategoryRegistry,
  resourceMaterialScopeRegistry,
  roleCategoryRegistry,
  routeCaseCapabilityOverclaimRegistry,
} = require("./rbac-role-permission-deny-by-default-scaffold.js");
const {
  assertNoTokenUrlSecretRoute,
  classifyProviderRouteGap,
  denyRawMaterialRoute,
  denyThirdPartyModelApiRoute,
  deriveRouteDenialDescriptor,
  getNetworkCredentialSourceLocatorDenialEntry,
  getProviderRouteGapStatusEntry,
  getRawRouteDenialEntry,
  getThirdPartyRouteDenialEntry,
  networkCredentialSourceLocatorDenialRegistry,
  providerRouteGapStatusRegistry,
  rawMaterialRoutingThirdPartyNonAuthorizationInvariant,
  rawRouteDenialRegistry,
  thirdPartyRouteDenialRegistry,
} = require("./raw-material-routing-third-party-deny-by-default-hardening.js");
const {
  deriveLifecycleGapDescriptor,
  encryptionKeyManagementBlockerRegistry,
  getEncryptionKeyManagementBlockerEntry,
  getLifecycleGapStatusEntry,
  getLifecycleNonAuthorizationEntry,
  getProviderLifecycleGapEntry,
  getRetentionDeletionPurgeErasureBlockerEntry,
  lifecycleGapStatusRegistry,
  lifecycleNonAuthorizationRegistry,
  noDeletionProof,
  noEncryptionImplementation,
  noProviderDeletionVerification,
  noPurgeProof,
  noRetentionCurrentness,
  providerLifecycleGapRegistry,
  retentionDeletionEncryptionGapReviewInvariant,
  retentionDeletionPurgeErasureBlockerRegistry,
} = require("./retention-deletion-encryption-gap-review.js");
const {
  getJurisdictionProfileRegistryEntry,
  hasJurisdictionProfileCapability,
  isSupportedJurisdictionProfileKey,
  jurisdictionProfileRegistry,
} = require("./jurisdiction-profile-registry.js");
const cmdProfileInput = require("../../../schemas/cmd-profile-input.json");
const sweBodelningProfileInput = require("../../../schemas/swe-bodelning-profile-input.json");
const {
  validateCMDExportPackage,
  validateCMDExportPackageProjection,
  validateCMDExportPackageBundleArchiveArtifact,
  validateCMDExportPackageBundleArchiveArtifactProjection,
  validateCMDExportPackageBundleManifest,
  validateCMDExportPackageBundleManifestProjection,
  validateCMDExportPackageDocxArtifact,
  validateCMDExportPackageDocxArtifactProjection,
  validateCMDExportPackagePdfArtifact,
  validateCMDExportPackagePdfArtifactProjection,
  validateCMDExportPackageJsonArtifact,
  validateCMDExportPackageJsonArtifactProjection,
  validateCMDExportPackageMarkdownArtifact,
  validateCMDExportPackageMarkdownArtifactProjection,
  validateCMDProfileDossierProjection,
  validateCMDProfileDossierSnapshot,
  validateCMDProfileInputSnapshot,
  validateCMDReleaseEvalRun,
  reconstructCMDExportPackageFromDocxArtifactBody,
  reconstructCMDExportPackageFromPdfArtifactBody,
  reconstructCMDExportPackageFromMarkdownArtifactBody,
  validateSWEBodelningExportPackageBundleArchiveArtifact,
  validateSWEBodelningExportPackageBundleArchiveArtifactProjection,
  reconstructSWEBodelningExportPackageFromDocxArtifactBody,
  reconstructSWEBodelningExportPackageFromPdfArtifactBody,
  reconstructSWEBodelningExportPackageFromMarkdownArtifactBody,
  validateSWEBodelningExportPackageBundleManifest,
  validateSWEBodelningExportPackageBundleManifestProjection,
  validateSWEBodelningExportPackage,
  validateSWEBodelningExportPackageDocxArtifact,
  validateSWEBodelningExportPackageDocxArtifactProjection,
  validateSWEBodelningExportPackagePdfArtifact,
  validateSWEBodelningExportPackagePdfArtifactProjection,
  validateSWEBodelningExportPackageJsonArtifact,
  validateSWEBodelningExportPackageMarkdownArtifact,
  validateSWEBodelningExportPackageJsonArtifactProjection,
  validateSWEBodelningExportPackageMarkdownArtifactProjection,
  validateSWEBodelningProfileInputSnapshot,
  validateSWEBodelningProfileDossierSnapshot,
} = require("../../schemas/src/index.js");

const cmdLaneKeys = cmdProfileInput.properties.profile_input_lane_snapshot.required;
const cmdProfileKey = cmdProfileInput.properties.jurisdiction_profile_key.const;
const laneKeys = sweBodelningProfileInput.properties.profile_input_lane_snapshot.required;
const supportedProfileKey =
  sweBodelningProfileInput.properties.jurisdiction_profile_key.const;
const releaseEvalBaseline = {
  release_gate: "blocked",
  release_gate_reason_code:
    "governance_baseline_fail_closed_pending_completeness_support_policy",
  release_eval_freshness: "current",
};
const cmdReleaseEvalBaseline = {
  release_gate: "blocked",
  release_eval_freshness: "current",
};
const cmdReleaseEvalEvaluatorVersion = "cmd-release-eval-v1";
const releaseEvalEvaluatorVersion = "swe-bodelning-release-eval-v1";
const currentEvaluatorVersionFreshnessReasonCode = "evaluator-version-current";
const evaluatorVersionMismatchFreshnessReasonCode = "evaluator-version-mismatch";
const profileInputContextMismatchFreshnessReasonCode =
  "profile-input-context-mismatch";
const cmdIncompleteReleaseEvalReasonCode = "cmd-input-incomplete";
const cmdRuntimeNotImplementedReleaseEvalReasonCode =
  "cmd-runtime-not-implemented";
const incompleteReleaseEvalReasonCode = "swe-bodelning-input-incomplete";
const supportIncompleteReleaseEvalReasonCode = "swe-bodelning-support-incomplete";
const cmdProfileDossierProjectionVersion = "cmd-profile-dossier-v1";
const cmdExportPackageVersion = "cmd-export-package-v1";
const cmdExportPackageBundleManifestVersion = "cmd-export-bundle-manifest-v1";
const profileDossierProjectionVersion = "swe-bodelning-profile-dossier-v26";
const exportPackageBundleManifestVersion = "swe-bodelning-export-bundle-manifest-v1";
const exportPackageVersion = "swe-bodelning-export-package-v1";
const fixedZipDosTime = 0;
const fixedZipDosDate = 33;
const crc32Table = (() => {
  const table = new Uint32Array(256);

  for (let index = 0; index < 256; index += 1) {
    let value = index;

    for (let bit = 0; bit < 8; bit += 1) {
      value = (value & 1) === 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
    }

    table[index] = value >>> 0;
  }

  return table;
})();

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

function chunkPdfText(value, size = 88) {
  if (typeof value !== "string" || value.length === 0) {
    return [""];
  }

  const chunks = [];

  for (let index = 0; index < value.length; index += size) {
    chunks.push(value.slice(index, index + size));
  }

  return chunks;
}

function escapePdfText(value) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)")
    .replace(/\r/g, "\\r")
    .replace(/\n/g, "\\n");
}

function buildMinimalPdfDocument(lines) {
  const contentLines = ["BT", "/F1 10 Tf", "50 780 Td", "12 TL"];

  lines.forEach((line, index) => {
    contentLines.push(`(${escapePdfText(line)}) Tj`);

    if (index < lines.length - 1) {
      contentLines.push("T*");
    }
  });

  contentLines.push("ET");

  const contentStream = `${contentLines.join("\n")}\n`;
  const objects = [
    "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n",
    "2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n",
    "3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>\nendobj\n",
    "4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n",
    `5 0 obj\n<< /Length ${contentStream.length} >>\nstream\n${contentStream}endstream\nendobj\n`,
  ];

  let pdf = "%PDF-1.4\n";
  const offsets = [0];

  for (const objectText of objects) {
    offsets.push(pdf.length);
    pdf += objectText;
  }

  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;

  for (const offset of offsets.slice(1)) {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  }

  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

  return pdf;
}

function chunkDocxText(value, size = 120) {
  if (typeof value !== "string" || value.length === 0) {
    return [""];
  }

  const chunks = [];

  for (let index = 0; index < value.length; index += size) {
    chunks.push(value.slice(index, index + size));
  }

  return chunks;
}

function escapeXmlText(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function computeCrc32(buffer) {
  let value = 0xffffffff;

  for (const byte of buffer) {
    value = crc32Table[(value ^ byte) & 0xff] ^ (value >>> 8);
  }

  return (value ^ 0xffffffff) >>> 0;
}

function buildStoredZip(files) {
  const localFileParts = [];
  const centralDirectoryParts = [];
  let offset = 0;

  files.forEach((file) => {
    const nameBuffer = Buffer.from(file.name, "utf8");
    const dataBuffer =
      Buffer.isBuffer(file.data) ? file.data : Buffer.from(file.data, "utf8");
    const crc32 = computeCrc32(dataBuffer);
    const localHeader = Buffer.alloc(30 + nameBuffer.length);

    localHeader.writeUInt32LE(0x04034b50, 0);
    localHeader.writeUInt16LE(20, 4);
    localHeader.writeUInt16LE(0, 6);
    localHeader.writeUInt16LE(0, 8);
    localHeader.writeUInt16LE(fixedZipDosTime, 10);
    localHeader.writeUInt16LE(fixedZipDosDate, 12);
    localHeader.writeUInt32LE(crc32, 14);
    localHeader.writeUInt32LE(dataBuffer.length, 18);
    localHeader.writeUInt32LE(dataBuffer.length, 22);
    localHeader.writeUInt16LE(nameBuffer.length, 26);
    localHeader.writeUInt16LE(0, 28);
    nameBuffer.copy(localHeader, 30);

    localFileParts.push(localHeader, dataBuffer);

    const centralHeader = Buffer.alloc(46 + nameBuffer.length);
    centralHeader.writeUInt32LE(0x02014b50, 0);
    centralHeader.writeUInt16LE(20, 4);
    centralHeader.writeUInt16LE(20, 6);
    centralHeader.writeUInt16LE(0, 8);
    centralHeader.writeUInt16LE(0, 10);
    centralHeader.writeUInt16LE(fixedZipDosTime, 12);
    centralHeader.writeUInt16LE(fixedZipDosDate, 14);
    centralHeader.writeUInt32LE(crc32, 16);
    centralHeader.writeUInt32LE(dataBuffer.length, 20);
    centralHeader.writeUInt32LE(dataBuffer.length, 24);
    centralHeader.writeUInt16LE(nameBuffer.length, 28);
    centralHeader.writeUInt16LE(0, 30);
    centralHeader.writeUInt16LE(0, 32);
    centralHeader.writeUInt16LE(0, 34);
    centralHeader.writeUInt16LE(0, 36);
    centralHeader.writeUInt32LE(0, 38);
    centralHeader.writeUInt32LE(offset, 42);
    nameBuffer.copy(centralHeader, 46);

    centralDirectoryParts.push(centralHeader);
    offset += localHeader.length + dataBuffer.length;
  });

  const centralDirectory = Buffer.concat(centralDirectoryParts);
  const endOfCentralDirectory = Buffer.alloc(22);

  endOfCentralDirectory.writeUInt32LE(0x06054b50, 0);
  endOfCentralDirectory.writeUInt16LE(0, 4);
  endOfCentralDirectory.writeUInt16LE(0, 6);
  endOfCentralDirectory.writeUInt16LE(files.length, 8);
  endOfCentralDirectory.writeUInt16LE(files.length, 10);
  endOfCentralDirectory.writeUInt32LE(centralDirectory.length, 12);
  endOfCentralDirectory.writeUInt32LE(offset, 16);
  endOfCentralDirectory.writeUInt16LE(0, 20);

  return Buffer.concat([...localFileParts, centralDirectory, endOfCentralDirectory]);
}

function buildMinimalDocxDocument(lines) {
  const paragraphXml = lines
    .flatMap((line) => {
      if (line.length === 0) {
        return ["<w:p/>"];
      }

      return chunkDocxText(line).map(
        (chunk) =>
          `<w:p><w:r><w:t xml:space="preserve">${escapeXmlText(chunk)}</w:t></w:r></w:p>`,
      );
    })
    .join("");

  const contentTypesXml = [
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>',
    '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">',
    '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>',
    '<Default Extension="xml" ContentType="application/xml"/>',
    '<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>',
    "</Types>",
  ].join("");

  const relationshipsXml = [
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>',
    '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">',
    '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>',
    "</Relationships>",
  ].join("");

  const documentXml = [
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>',
    '<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">',
    "<w:body>",
    paragraphXml,
    '<w:sectPr><w:pgSz w:w="12240" w:h="15840"/><w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440" w:header="720" w:footer="720" w:gutter="0"/></w:sectPr>',
    "</w:body>",
    "</w:document>",
  ].join("");

  return buildStoredZip([
    { name: "[Content_Types].xml", data: contentTypesXml },
    { name: "_rels/.rels", data: relationshipsXml },
    { name: "word/document.xml", data: documentXml },
  ]);
}

function createGovernanceError(code, message, details = {}) {
  const error = new Error(message);
  error.code = code;
  error.details = details;
  return error;
}

function assertSupportedJurisdictionProfileCapability(
  jurisdictionProfileKey,
  capability,
) {
  if (!hasJurisdictionProfileCapability(jurisdictionProfileKey, capability)) {
    throw createGovernanceError(
      "ERR_UNSUPPORTED_JURISDICTION_PROFILE",
      "jurisdiction_profile_key is not supported",
      {
        jurisdiction_profile_key: jurisdictionProfileKey,
      },
    );
  }
}

function assertPlainObject(value, code, field) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw createGovernanceError(code, `${field} must be an object`, { field });
  }
}

function deriveSWEBodelningProfileInputLaneSnapshot(input) {
  assertPlainObject(input, "ERR_PROFILE_INPUT_INVALID", "input");

  const sourceSnapshot = input.profile_input_lane_snapshot;
  assertPlainObject(
    sourceSnapshot,
    "ERR_PROFILE_INPUT_INVALID",
    "profile_input_lane_snapshot",
  );

  const derivedSnapshot = {};

  for (const laneKey of laneKeys) {
    const entry = sourceSnapshot[laneKey];

    assertPlainObject(
      entry,
      "ERR_PROFILE_INPUT_INVALID",
      `profile_input_lane_snapshot.${laneKey}`,
    );

    const derivedEntry = {
      has_value: entry.has_value,
      value: entry.value,
    };

    if (Object.hasOwn(entry, "evidence_object_ids")) {
      derivedEntry.evidence_object_ids = [...entry.evidence_object_ids];
    }

    derivedSnapshot[laneKey] = derivedEntry;
  }

  return derivedSnapshot;
}

function deriveSWEBodelningProfileInputSummary(input) {
  const laneSnapshot = deriveSWEBodelningProfileInputLaneSnapshot(input);
  const missing_value_lane_keys = laneKeys.filter(
    (laneKey) => !laneSnapshot[laneKey].has_value,
  );

  return {
    required_lane_count: laneKeys.length,
    lanes_with_value_count: laneKeys.length - missing_value_lane_keys.length,
    missing_value_lane_keys,
  };
}

function deriveSWEBodelningProfileInputSnapshot(input) {
  assertPlainObject(input, "ERR_PROFILE_INPUT_INVALID", "input");

  assertSupportedJurisdictionProfileCapability(
    input.jurisdiction_profile_key,
    "profile_inputs",
  );

  const profile_input_lane_snapshot = deriveSWEBodelningProfileInputLaneSnapshot(input);
  const profile_input_summary = deriveSWEBodelningProfileInputSummary({
    profile_input_lane_snapshot,
  });

  return {
    jurisdiction_profile_key: supportedProfileKey,
    profile_input_summary,
    profile_input_lane_snapshot,
  };
}

function deriveCMDProfileInputLaneSnapshot(input) {
  assertPlainObject(input, "ERR_PROFILE_INPUT_INVALID", "input");

  const sourceSnapshot = input.profile_input_lane_snapshot;
  assertPlainObject(
    sourceSnapshot,
    "ERR_PROFILE_INPUT_INVALID",
    "profile_input_lane_snapshot",
  );

  const derivedSnapshot = {};

  for (const laneKey of cmdLaneKeys) {
    const entry = sourceSnapshot[laneKey];

    assertPlainObject(
      entry,
      "ERR_PROFILE_INPUT_INVALID",
      `profile_input_lane_snapshot.${laneKey}`,
    );

    const derivedEntry = {
      has_value: entry.has_value,
      value: entry.value,
    };

    if (Object.hasOwn(entry, "evidence_object_ids")) {
      derivedEntry.evidence_object_ids = [...entry.evidence_object_ids];
    }

    derivedSnapshot[laneKey] = derivedEntry;
  }

  return derivedSnapshot;
}

function deriveCMDProfileInputSummary(input) {
  const laneSnapshot = deriveCMDProfileInputLaneSnapshot(input);
  const missing_value_lane_keys = cmdLaneKeys.filter(
    (laneKey) => !laneSnapshot[laneKey].has_value,
  );

  return {
    required_lane_count: cmdLaneKeys.length,
    lanes_with_value_count: cmdLaneKeys.length - missing_value_lane_keys.length,
    missing_value_lane_keys,
  };
}

function deriveCMDProfileInputSnapshot(input) {
  assertPlainObject(input, "ERR_PROFILE_INPUT_INVALID", "input");

  const profile_input_lane_snapshot = deriveCMDProfileInputLaneSnapshot(input);
  const profile_input_summary = deriveCMDProfileInputSummary({
    profile_input_lane_snapshot,
  });

  return {
    jurisdiction_profile_key: cmdProfileKey,
    profile_input_summary,
    profile_input_lane_snapshot,
  };
}

const sweBodelningProfileInputAdapter = Object.freeze({
  jurisdiction_profile_key: supportedProfileKey,
  validateProfileInputSnapshot: validateSWEBodelningProfileInputSnapshot,
  deriveProfileInputLaneSnapshot: deriveSWEBodelningProfileInputLaneSnapshot,
  deriveProfileInputSummary: deriveSWEBodelningProfileInputSummary,
  deriveProfileInputSnapshot: deriveSWEBodelningProfileInputSnapshot,
});

const cmdProfileInputAdapter = Object.freeze({
  jurisdiction_profile_key: cmdProfileKey,
  validateProfileInputSnapshot: validateCMDProfileInputSnapshot,
  deriveProfileInputLaneSnapshot: deriveCMDProfileInputLaneSnapshot,
  deriveProfileInputSummary: deriveCMDProfileInputSummary,
  deriveProfileInputSnapshot: deriveCMDProfileInputSnapshot,
});

const profileInputAdapterRegistry = Object.freeze({
  [supportedProfileKey]: sweBodelningProfileInputAdapter,
  [cmdProfileKey]: cmdProfileInputAdapter,
});

function getProfileInputAdapter(jurisdictionProfileKey) {
  if (
    typeof jurisdictionProfileKey !== "string" ||
    jurisdictionProfileKey.length === 0
  ) {
    return null;
  }

  return profileInputAdapterRegistry[jurisdictionProfileKey] ?? null;
}

function validateProfileInputSnapshot(profileInputSnapshot) {
  assertPlainObject(
    profileInputSnapshot,
    "ERR_PROFILE_INPUT_INVALID",
    "profileInputSnapshot",
  );

  if (
    typeof profileInputSnapshot.jurisdiction_profile_key !== "string" ||
    profileInputSnapshot.jurisdiction_profile_key.length === 0
  ) {
    return validateSWEBodelningProfileInputSnapshot(profileInputSnapshot);
  }

  const adapter = getProfileInputAdapter(
    profileInputSnapshot.jurisdiction_profile_key,
  );

  if (!adapter) {
    assertSupportedJurisdictionProfileCapability(
      profileInputSnapshot.jurisdiction_profile_key,
      "profile_inputs",
    );
  }

  return adapter.validateProfileInputSnapshot(profileInputSnapshot);
}

function deriveProfileInputLaneSnapshot(input) {
  assertPlainObject(input, "ERR_PROFILE_INPUT_INVALID", "input");

  const adapter = getProfileInputAdapter(input.jurisdiction_profile_key);

  if (!adapter) {
    assertSupportedJurisdictionProfileCapability(
      input.jurisdiction_profile_key,
      "profile_inputs",
    );
  }

  return adapter.deriveProfileInputLaneSnapshot(input);
}

function deriveProfileInputSummary(input) {
  assertPlainObject(input, "ERR_PROFILE_INPUT_INVALID", "input");

  const adapter = getProfileInputAdapter(input.jurisdiction_profile_key);

  if (!adapter) {
    assertSupportedJurisdictionProfileCapability(
      input.jurisdiction_profile_key,
      "profile_inputs",
    );
  }

  return adapter.deriveProfileInputSummary(input);
}

function deriveProfileInputSnapshot(input) {
  assertPlainObject(input, "ERR_PROFILE_INPUT_INVALID", "input");

  const adapter = getProfileInputAdapter(input.jurisdiction_profile_key);

  if (!adapter) {
    assertSupportedJurisdictionProfileCapability(
      input.jurisdiction_profile_key,
      "profile_inputs",
    );
  }

  return adapter.deriveProfileInputSnapshot(input);
}

function laneHasSupport(entry) {
  return Array.isArray(entry.evidence_object_ids) && entry.evidence_object_ids.length > 0;
}

function deriveComparableProfileInputContextFromLaneSnapshot(laneSnapshot, code) {
  assertPlainObject(laneSnapshot, code, "profile_input_lane_snapshot");

  const comparableContext = {};

  for (const laneKey of laneKeys) {
    const entry = laneSnapshot[laneKey];

    assertPlainObject(entry, code, `profile_input_lane_snapshot.${laneKey}`);

    comparableContext[laneKey] = {
      has_value: entry.has_value,
      value: entry.value,
      evidence_object_ids: Array.isArray(entry.evidence_object_ids)
        ? [...entry.evidence_object_ids].sort()
        : [],
    };
  }

  return comparableContext;
}

function deriveComparableProfileInputContext(input, code) {
  assertPlainObject(input, code, "input");

  if (
    typeof input.jurisdiction_profile_key !== "string" ||
    input.jurisdiction_profile_key.length === 0
  ) {
    throw createGovernanceError(
      code,
      "jurisdiction_profile_key must be a non-empty string",
      {
        field: "jurisdiction_profile_key",
      },
    );
  }

  return {
    jurisdiction_profile_key: input.jurisdiction_profile_key,
    profile_input_lane_snapshot: deriveComparableProfileInputContextFromLaneSnapshot(
      input.profile_input_lane_snapshot,
      code,
    ),
  };
}

function deriveSWEBodelningProfileInputContext(caseProfileInputs) {
  return deriveComparableProfileInputContext(
    caseProfileInputs,
    "ERR_PROFILE_INPUT_INVALID",
  );
}

function deriveSWEBodelningReleaseEvalProfileInputContext(releaseEvalRun) {
  return deriveComparableProfileInputContext(
    releaseEvalRun,
    "ERR_RELEASE_EVAL_RUN_INVALID",
  );
}

function hasMatchingSWEBodelningProfileInputContext(releaseEvalRun, caseProfileInputs) {
  const releaseEvalContext =
    deriveSWEBodelningReleaseEvalProfileInputContext(releaseEvalRun);
  const currentProfileInputContext = deriveSWEBodelningProfileInputContext(caseProfileInputs);

  return JSON.stringify(releaseEvalContext) === JSON.stringify(currentProfileInputContext);
}

function deriveComparableCMDProfileInputContextFromLaneSnapshot(laneSnapshot, code) {
  assertPlainObject(laneSnapshot, code, "profile_input_lane_snapshot");

  const comparableContext = {};

  for (const laneKey of cmdLaneKeys) {
    const entry = laneSnapshot[laneKey];

    assertPlainObject(entry, code, `profile_input_lane_snapshot.${laneKey}`);

    comparableContext[laneKey] = {
      has_value: entry.has_value,
      value: entry.value,
      evidence_object_ids: Array.isArray(entry.evidence_object_ids)
        ? [...entry.evidence_object_ids].sort()
        : [],
    };
  }

  return comparableContext;
}

function deriveComparableCMDProfileInputContext(input, code) {
  assertPlainObject(input, code, "input");

  if (
    typeof input.jurisdiction_profile_key !== "string" ||
    input.jurisdiction_profile_key.length === 0
  ) {
    throw createGovernanceError(
      code,
      "jurisdiction_profile_key must be a non-empty string",
      {
        field: "jurisdiction_profile_key",
      },
    );
  }

  return {
    jurisdiction_profile_key: input.jurisdiction_profile_key,
    profile_input_lane_snapshot: deriveComparableCMDProfileInputContextFromLaneSnapshot(
      input.profile_input_lane_snapshot,
      code,
    ),
  };
}

function deriveCMDProfileInputContext(caseProfileInputs) {
  return deriveComparableCMDProfileInputContext(
    caseProfileInputs,
    "ERR_PROFILE_INPUT_INVALID",
  );
}

function deriveCMDReleaseEvalProfileInputContext(releaseEvalRun) {
  return deriveComparableCMDProfileInputContext(
    releaseEvalRun,
    "ERR_RELEASE_EVAL_RUN_INVALID",
  );
}

function hasMatchingCMDProfileInputContext(releaseEvalRun, caseProfileInputs) {
  const releaseEvalContext =
    deriveCMDReleaseEvalProfileInputContext(releaseEvalRun);
  const currentProfileInputContext = {
    jurisdiction_profile_key: caseProfileInputs.jurisdiction_profile_key,
    profile_input_lane_snapshot: deriveComparableCMDProfileInputContextFromLaneSnapshot(
      deriveCMDReleaseEvalProfileInputLaneSnapshot(caseProfileInputs),
      "ERR_PROFILE_INPUT_INVALID",
    ),
  };

  return JSON.stringify(releaseEvalContext) === JSON.stringify(currentProfileInputContext);
}

function deriveSWEBodelningReleaseEvalProfileInputLaneSnapshot(input) {
  const profileInputLaneSnapshot = deriveSWEBodelningProfileInputLaneSnapshot(input);
  const derivedSnapshot = {};

  for (const laneKey of laneKeys) {
    const entry = profileInputLaneSnapshot[laneKey];

    derivedSnapshot[laneKey] = {
      ...entry,
      has_support: laneHasSupport(entry),
    };
  }

  return derivedSnapshot;
}

function deriveSWEBodelningReleaseEvalProfileInputSummary(input) {
  const profileInputSnapshot = deriveSWEBodelningProfileInputSnapshot(input);
  const releaseEvalLaneSnapshot = deriveSWEBodelningReleaseEvalProfileInputLaneSnapshot(input);
  const missing_support_lane_keys = laneKeys.filter(
    (laneKey) => !releaseEvalLaneSnapshot[laneKey].has_support,
  );

  return {
    ...profileInputSnapshot.profile_input_summary,
    lanes_with_support_count: laneKeys.length - missing_support_lane_keys.length,
    missing_support_lane_keys,
  };
}

function deriveCMDReleaseEvalProfileInputLaneSnapshot(input) {
  const profileInputLaneSnapshot = deriveCMDProfileInputLaneSnapshot(input);
  const derivedSnapshot = {};

  for (const laneKey of cmdLaneKeys) {
    const entry = profileInputLaneSnapshot[laneKey];
    const has_value =
      entry.has_value === true &&
      !(typeof entry.value === "string" && entry.value.length === 0);

    derivedSnapshot[laneKey] = {
      ...entry,
      has_value,
      has_support: laneHasSupport(entry),
    };
  }

  return derivedSnapshot;
}

function deriveCMDReleaseEvalProfileInputSummary(input) {
  const releaseEvalLaneSnapshot = deriveCMDReleaseEvalProfileInputLaneSnapshot(input);
  const missing_value_lane_keys = cmdLaneKeys.filter(
    (laneKey) => !releaseEvalLaneSnapshot[laneKey].has_value,
  );

  const missing_support_lane_keys = cmdLaneKeys.filter(
    (laneKey) => !releaseEvalLaneSnapshot[laneKey].has_support,
  );

  return {
    required_lane_count: cmdLaneKeys.length,
    lanes_with_value_count: cmdLaneKeys.length - missing_value_lane_keys.length,
    missing_value_lane_keys,
    lanes_with_support_count: cmdLaneKeys.length - missing_support_lane_keys.length,
    missing_support_lane_keys,
  };
}

function cloneSWEBodelningReleaseEvalProfileInputSummary(summary) {
  assertPlainObject(summary, "ERR_RELEASE_EVAL_RUN_INVALID", "profile_input_summary");

  return {
    required_lane_count: summary.required_lane_count,
    lanes_with_value_count: summary.lanes_with_value_count,
    missing_value_lane_keys: [...summary.missing_value_lane_keys],
    lanes_with_support_count: summary.lanes_with_support_count,
    missing_support_lane_keys: [...summary.missing_support_lane_keys],
  };
}

function cloneSWEBodelningReleaseEvalProfileInputLaneSnapshot(snapshot) {
  assertPlainObject(
    snapshot,
    "ERR_RELEASE_EVAL_RUN_INVALID",
    "profile_input_lane_snapshot",
  );

  const clonedSnapshot = {};

  for (const laneKey of laneKeys) {
    const entry = snapshot[laneKey];

    assertPlainObject(
      entry,
      "ERR_RELEASE_EVAL_RUN_INVALID",
      `profile_input_lane_snapshot.${laneKey}`,
    );

    clonedSnapshot[laneKey] = {
      has_value: entry.has_value,
      value: entry.value,
    };

    if (Object.hasOwn(entry, "evidence_object_ids")) {
      clonedSnapshot[laneKey].evidence_object_ids = [...entry.evidence_object_ids];
    }

    clonedSnapshot[laneKey].has_support = entry.has_support;
  }

  return clonedSnapshot;
}

function cloneCMDReleaseEvalProfileInputSummary(summary) {
  assertPlainObject(summary, "ERR_RELEASE_EVAL_RUN_INVALID", "profile_input_summary");

  return {
    required_lane_count: summary.required_lane_count,
    lanes_with_value_count: summary.lanes_with_value_count,
    missing_value_lane_keys: [...summary.missing_value_lane_keys],
    lanes_with_support_count: summary.lanes_with_support_count,
    missing_support_lane_keys: [...summary.missing_support_lane_keys],
  };
}

function cloneCMDReleaseEvalProfileInputLaneSnapshot(snapshot) {
  assertPlainObject(
    snapshot,
    "ERR_RELEASE_EVAL_RUN_INVALID",
    "profile_input_lane_snapshot",
  );

  const clonedSnapshot = {};

  for (const laneKey of cmdLaneKeys) {
    const entry = snapshot[laneKey];

    assertPlainObject(
      entry,
      "ERR_RELEASE_EVAL_RUN_INVALID",
      `profile_input_lane_snapshot.${laneKey}`,
    );

    clonedSnapshot[laneKey] = {
      has_value: entry.has_value,
      value: entry.value,
      has_support: entry.has_support,
    };

    if (Object.hasOwn(entry, "evidence_object_ids")) {
      clonedSnapshot[laneKey].evidence_object_ids = [...entry.evidence_object_ids];
    }
  }

  return clonedSnapshot;
}

function deriveSWEBodelningProfileDossierFingerprint(snapshot) {
  assertPlainObject(
    snapshot,
    "ERR_PROFILE_DOSSIER_SNAPSHOT_INVALID",
    "profile_dossier_snapshot",
  );

  const fingerprintInput = { ...snapshot };
  delete fingerprintInput.dossier_fingerprint;
  delete fingerprintInput.canonical_source;

  return crypto
    .createHash("sha256")
    .update(toCanonicalJson(fingerprintInput))
    .digest("hex");
}

function deriveSWEBodelningProfileDossierEvidenceReferenceIndex(
  profileDossierSnapshot,
) {
  assertPlainObject(
    profileDossierSnapshot,
    "ERR_PROFILE_DOSSIER_SNAPSHOT_INVALID",
    "profileDossierSnapshot",
  );

  const laneSnapshot = cloneSWEBodelningReleaseEvalProfileInputLaneSnapshot(
    profileDossierSnapshot.profile_input_lane_snapshot,
  );
  const issueIndex = Array.isArray(profileDossierSnapshot.issue_index)
    ? profileDossierSnapshot.issue_index.filter(
        (entry) => entry && typeof entry === "object",
      )
    : [];
  const supportingLaneKeysByEvidenceObjectId = new Map();

  for (const laneKey of laneKeys) {
    const evidenceObjectIds = Array.isArray(laneSnapshot[laneKey].evidence_object_ids)
      ? [...laneSnapshot[laneKey].evidence_object_ids].sort()
      : [];

    for (const evidenceObjectId of evidenceObjectIds) {
      if (!supportingLaneKeysByEvidenceObjectId.has(evidenceObjectId)) {
        supportingLaneKeysByEvidenceObjectId.set(evidenceObjectId, []);
      }

      const supportingLaneKeys =
        supportingLaneKeysByEvidenceObjectId.get(evidenceObjectId);
      if (!supportingLaneKeys.includes(laneKey)) {
        supportingLaneKeys.push(laneKey);
      }
    }
  }

  return [...supportingLaneKeysByEvidenceObjectId.entries()]
    .sort(([leftEvidenceObjectId], [rightEvidenceObjectId]) =>
      leftEvidenceObjectId.localeCompare(rightEvidenceObjectId),
    )
    .map(([evidence_object_id, supporting_lane_keys], index) => ({
      reference_ref: `REF-${String(index + 1).padStart(3, "0")}`,
      evidence_object_id,
      supporting_lane_keys: [...supporting_lane_keys],
      related_issue_refs: [
        ...new Set(
          issueIndex
            .filter(
              (issueEntry) =>
                Array.isArray(issueEntry.related_lane_keys) &&
                issueEntry.related_lane_keys.some((laneKey) =>
                  supporting_lane_keys.includes(laneKey),
                ),
            )
            .map((issueEntry) => issueEntry.issue_ref),
        ),
      ],
    }));
}

function deriveSWEBodelningProfileDossierEvidenceExhibitIndex(
  profileDossierSnapshot,
) {
  assertPlainObject(
    profileDossierSnapshot,
    "ERR_PROFILE_DOSSIER_SNAPSHOT_INVALID",
    "profileDossierSnapshot",
  );

  if (!Array.isArray(profileDossierSnapshot.evidence_reference_index)) {
    throw createGovernanceError(
      "ERR_PROFILE_DOSSIER_SNAPSHOT_INVALID",
      "evidence_reference_index must be an array",
      {
        field: "evidence_reference_index",
      },
    );
  }

  return profileDossierSnapshot.evidence_reference_index.map((entry, index) => ({
    exhibit_ref: `EX-${String(index + 1).padStart(3, "0")}`,
    evidence_object_id: entry.evidence_object_id,
    supporting_lane_keys: [...entry.supporting_lane_keys],
    related_lane_keys: laneKeys.filter((laneKey) =>
      entry.supporting_lane_keys.includes(laneKey),
    ),
    related_reference_refs: profileDossierSnapshot.evidence_reference_index
      .filter(
        (referenceEntry) =>
          referenceEntry &&
          typeof referenceEntry === "object" &&
          referenceEntry.evidence_object_id === entry.evidence_object_id,
      )
      .map((referenceEntry) => referenceEntry.reference_ref),
    related_issue_refs: [],
    related_section_refs: [],
  }));
}

function attachSWEBodelningLaneSupportingExhibitRefs(
  profileInputLaneSnapshot,
  evidenceExhibitIndex,
) {
  assertPlainObject(
    profileInputLaneSnapshot,
    "ERR_PROFILE_DOSSIER_SNAPSHOT_INVALID",
    "profile_input_lane_snapshot",
  );

  const evidenceExhibitEntries = Array.isArray(evidenceExhibitIndex)
    ? evidenceExhibitIndex
    : [];
  const attachedSnapshot = {};

  for (const laneKey of laneKeys) {
    const laneEntry = profileInputLaneSnapshot[laneKey];

    assertPlainObject(
      laneEntry,
      "ERR_PROFILE_DOSSIER_SNAPSHOT_INVALID",
      `profile_input_lane_snapshot.${laneKey}`,
    );

    const evidenceObjectIds = new Set(
      Array.isArray(laneEntry.evidence_object_ids) ? laneEntry.evidence_object_ids : [],
    );

    attachedSnapshot[laneKey] = {
      ...laneEntry,
      supporting_exhibit_refs: evidenceExhibitEntries
        .filter((entry) => evidenceObjectIds.has(entry.evidence_object_id))
        .map((entry) => entry.exhibit_ref),
    };
  }

  return attachedSnapshot;
}

function attachSWEBodelningLaneSupportingReferenceRefs(
  profileInputLaneSnapshot,
  evidenceReferenceIndex,
) {
  assertPlainObject(
    profileInputLaneSnapshot,
    "ERR_PROFILE_DOSSIER_SNAPSHOT_INVALID",
    "profile_input_lane_snapshot",
  );

  const evidenceReferenceEntries = Array.isArray(evidenceReferenceIndex)
    ? evidenceReferenceIndex
    : [];
  const attachedSnapshot = {};

  for (const laneKey of laneKeys) {
    const laneEntry = profileInputLaneSnapshot[laneKey];

    assertPlainObject(
      laneEntry,
      "ERR_PROFILE_DOSSIER_SNAPSHOT_INVALID",
      `profile_input_lane_snapshot.${laneKey}`,
    );

    const evidenceObjectIds = new Set(
      Array.isArray(laneEntry.evidence_object_ids) ? laneEntry.evidence_object_ids : [],
    );

    attachedSnapshot[laneKey] = {
      ...laneEntry,
      supporting_reference_refs: evidenceReferenceEntries
        .filter((entry) => evidenceObjectIds.has(entry.evidence_object_id))
        .map((entry) => entry.reference_ref),
    };
  }

  return attachedSnapshot;
}

function attachSWEBodelningLaneRelatedIssueRefs(
  profileInputLaneSnapshot,
  issueIndex,
) {
  assertPlainObject(
    profileInputLaneSnapshot,
    "ERR_PROFILE_DOSSIER_SNAPSHOT_INVALID",
    "profile_input_lane_snapshot",
  );

  const relatedIssueRefsByLaneKey = new Map(laneKeys.map((laneKey) => [laneKey, []]));

  if (Array.isArray(issueIndex)) {
    for (const issueEntry of issueIndex) {
      if (
        typeof issueEntry?.issue_ref !== "string" ||
        !Array.isArray(issueEntry.related_lane_keys)
      ) {
        continue;
      }

      for (const laneKey of issueEntry.related_lane_keys) {
        if (!relatedIssueRefsByLaneKey.has(laneKey)) {
          continue;
        }

        const relatedIssueRefs = relatedIssueRefsByLaneKey.get(laneKey);
        if (!relatedIssueRefs.includes(issueEntry.issue_ref)) {
          relatedIssueRefs.push(issueEntry.issue_ref);
        }
      }
    }
  }

  const attachedSnapshot = {};

  for (const laneKey of laneKeys) {
    const laneEntry = profileInputLaneSnapshot[laneKey];

    assertPlainObject(
      laneEntry,
      "ERR_PROFILE_DOSSIER_SNAPSHOT_INVALID",
      `profile_input_lane_snapshot.${laneKey}`,
    );

    attachedSnapshot[laneKey] = {
      ...laneEntry,
      related_issue_refs: relatedIssueRefsByLaneKey.get(laneKey) ?? [],
    };
  }

  return attachedSnapshot;
}

function attachSWEBodelningLaneRelatedSectionRefs(
  profileInputLaneSnapshot,
  issueIndex,
  sectionIndex,
) {
  assertPlainObject(
    profileInputLaneSnapshot,
    "ERR_PROFILE_DOSSIER_SNAPSHOT_INVALID",
    "profile_input_lane_snapshot",
  );

  const relatedSectionRefsByIssueRef = new Map(
    Array.isArray(issueIndex)
      ? issueIndex
          .filter(
            (entry) =>
              entry &&
              typeof entry === "object" &&
              typeof entry.issue_ref === "string",
          )
          .map((entry) => [
            entry.issue_ref,
            Array.isArray(entry.related_section_refs) ? entry.related_section_refs : [],
          ])
      : [],
  );
  const canonicalSectionRefs = Array.isArray(sectionIndex)
    ? sectionIndex
        .filter(
          (entry) =>
            entry &&
            typeof entry === "object" &&
            typeof entry.section_ref === "string",
        )
        .map((entry) => entry.section_ref)
    : [];
  const attachedSnapshot = {};

  for (const laneKey of laneKeys) {
    const laneEntry = profileInputLaneSnapshot[laneKey];

    assertPlainObject(
      laneEntry,
      "ERR_PROFILE_DOSSIER_SNAPSHOT_INVALID",
      `profile_input_lane_snapshot.${laneKey}`,
    );

    const relatedIssueRefs = Array.isArray(laneEntry.related_issue_refs)
      ? laneEntry.related_issue_refs
      : [];

    attachedSnapshot[laneKey] = {
      ...laneEntry,
      related_section_refs: canonicalSectionRefs.filter((sectionRef) =>
        relatedIssueRefs.some((issueRef) =>
          relatedSectionRefsByIssueRef.get(issueRef)?.includes(sectionRef),
        ),
      ),
    };
  }

  return attachedSnapshot;
}

function deriveSWEBodelningIssueRelatedExhibitRefs(
  issueEntry,
  profileInputLaneSnapshot,
  evidenceExhibitIndex,
) {
  assertPlainObject(
    issueEntry,
    "ERR_PROFILE_DOSSIER_SNAPSHOT_INVALID",
    "issue_index_entry",
  );
  assertPlainObject(
    profileInputLaneSnapshot,
    "ERR_PROFILE_DOSSIER_SNAPSHOT_INVALID",
    "profile_input_lane_snapshot",
  );

  if (!Array.isArray(issueEntry.related_lane_keys) || !Array.isArray(evidenceExhibitIndex)) {
    return [];
  }

  const relatedExhibitRefs = new Set();

  for (const laneKey of issueEntry.related_lane_keys) {
    const laneEntry = profileInputLaneSnapshot[laneKey];

    if (!laneEntry || typeof laneEntry !== "object" || Array.isArray(laneEntry)) {
      continue;
    }

    const supportingExhibitRefs = Array.isArray(laneEntry.supporting_exhibit_refs)
      ? laneEntry.supporting_exhibit_refs
      : [];

    for (const exhibitRef of supportingExhibitRefs) {
      relatedExhibitRefs.add(exhibitRef);
    }
  }

  return evidenceExhibitIndex
    .filter((entry) => relatedExhibitRefs.has(entry.exhibit_ref))
    .map((entry) => entry.exhibit_ref);
}

function deriveSWEBodelningIssueRelatedReferenceRefs(
  issueEntry,
  profileInputLaneSnapshot,
  evidenceReferenceIndex,
) {
  assertPlainObject(
    issueEntry,
    "ERR_PROFILE_DOSSIER_SNAPSHOT_INVALID",
    "issue_index_entry",
  );
  assertPlainObject(
    profileInputLaneSnapshot,
    "ERR_PROFILE_DOSSIER_SNAPSHOT_INVALID",
    "profile_input_lane_snapshot",
  );

  if (!Array.isArray(issueEntry.related_lane_keys) || !Array.isArray(evidenceReferenceIndex)) {
    return [];
  }

  const relatedReferenceRefs = new Set();

  for (const laneKey of issueEntry.related_lane_keys) {
    const laneEntry = profileInputLaneSnapshot[laneKey];

    if (!laneEntry || typeof laneEntry !== "object" || Array.isArray(laneEntry)) {
      continue;
    }

    const supportingReferenceRefs = Array.isArray(laneEntry.supporting_reference_refs)
      ? laneEntry.supporting_reference_refs
      : [];

    for (const referenceRef of supportingReferenceRefs) {
      relatedReferenceRefs.add(referenceRef);
    }
  }

  return evidenceReferenceIndex
    .filter((entry) => relatedReferenceRefs.has(entry.reference_ref))
    .map((entry) => entry.reference_ref);
}

function resolveProfileDossierSourceTimestamp(releaseEvalRun, options = {}) {
  if (typeof options.persisted_at === "string" && options.persisted_at.length > 0) {
    return options.persisted_at;
  }

  const existingTimestamp =
    releaseEvalRun?.profile_dossier_snapshot?.canonical_source?.persisted_at;

  if (typeof existingTimestamp === "string" && existingTimestamp.length > 0) {
    return existingTimestamp;
  }

  throw createGovernanceError(
    "ERR_PROFILE_DOSSIER_SNAPSHOT_INVALID",
    "canonical_source.persisted_at must be provided for dossier derivation",
    {
      field: "canonical_source.persisted_at",
    },
  );
}

function deriveSWEBodelningProfileDossierCanonicalSource(
  releaseEvalRun,
  options = {},
) {
  assertPlainObject(releaseEvalRun, "ERR_RELEASE_EVAL_RUN_INVALID", "releaseEvalRun");

  const persistedAt = resolveProfileDossierSourceTimestamp(releaseEvalRun, options);

  for (const field of [
    "release_eval_run_id",
    "evaluator_version",
    "jurisdiction_profile_key",
  ]) {
    if (typeof releaseEvalRun[field] !== "string" || releaseEvalRun[field].length === 0) {
      throw createGovernanceError(
        "ERR_RELEASE_EVAL_RUN_INVALID",
        `${field} must be a non-empty string`,
        { field },
      );
    }
  }

  return {
    release_eval_run_id: releaseEvalRun.release_eval_run_id,
    evaluator_version: releaseEvalRun.evaluator_version,
    jurisdiction_profile_key: releaseEvalRun.jurisdiction_profile_key,
    persisted_at: persistedAt,
  };
}

function deriveSWEBodelningProfileDossierSnapshot(releaseEvalRun, options = {}) {
  assertPlainObject(releaseEvalRun, "ERR_RELEASE_EVAL_RUN_INVALID", "releaseEvalRun");

  assertSupportedJurisdictionProfileCapability(
    releaseEvalRun.jurisdiction_profile_key,
    "profile_dossier",
  );

  for (const field of [
    "release_gate",
    "release_gate_reason_code",
    "release_eval_freshness",
    "release_eval_freshness_reason_code",
    "evaluator_version",
  ]) {
    if (typeof releaseEvalRun[field] !== "string" || releaseEvalRun[field].length === 0) {
      throw createGovernanceError(
        "ERR_RELEASE_EVAL_RUN_INVALID",
        `${field} must be a non-empty string`,
        { field },
      );
    }
  }

  const snapshot = {
    jurisdiction_profile_key: releaseEvalRun.jurisdiction_profile_key,
    projection_version: profileDossierProjectionVersion,
    release_gate: releaseEvalRun.release_gate,
    release_gate_reason_code: releaseEvalRun.release_gate_reason_code,
    release_eval_freshness: releaseEvalRun.release_eval_freshness,
    release_eval_freshness_reason_code:
      releaseEvalRun.release_eval_freshness_reason_code,
    evaluator_version: releaseEvalRun.evaluator_version,
    canonical_source: deriveSWEBodelningProfileDossierCanonicalSource(
      releaseEvalRun,
      options,
    ),
    profile_input_summary: cloneSWEBodelningReleaseEvalProfileInputSummary(
      releaseEvalRun.profile_input_summary,
    ),
    profile_input_lane_snapshot: cloneSWEBodelningReleaseEvalProfileInputLaneSnapshot(
      releaseEvalRun.profile_input_lane_snapshot,
    ),
  };

  const snapshotWithIssueIndex = {
    ...snapshot,
    issue_index: deriveSWEBodelningProfileDossierIssueIndex(snapshot),
  };
  const snapshotWithSectionIndex = {
    ...snapshotWithIssueIndex,
    section_index: deriveSWEBodelningProfileDossierSectionIndex(
      snapshotWithIssueIndex,
    ),
  };
  const snapshotWithRelatedSectionRefs = {
    ...snapshotWithSectionIndex,
    issue_index: attachSWEBodelningIssueRelatedSectionRefs(
      snapshotWithIssueIndex.issue_index,
      snapshotWithSectionIndex.section_index,
    ),
  };
  const snapshotWithRelatedIssueRefs = {
    ...snapshotWithRelatedSectionRefs,
    section_index: attachSWEBodelningSectionRelatedIssueRefs(
      snapshotWithSectionIndex.section_index,
      snapshotWithRelatedSectionRefs.issue_index,
    ),
  };
  const snapshotWithSectionRelatedLaneKeys = {
    ...snapshotWithRelatedIssueRefs,
    section_index: attachSWEBodelningSectionRelatedLaneKeys(
      snapshotWithRelatedIssueRefs.section_index,
      snapshotWithRelatedSectionRefs.issue_index,
    ),
  };
  const snapshotWithEvidenceReferenceIndex = {
    ...snapshotWithSectionRelatedLaneKeys,
    evidence_reference_index: deriveSWEBodelningProfileDossierEvidenceReferenceIndex(
      snapshotWithSectionRelatedLaneKeys,
    ),
  };
  const snapshotWithEvidenceReferenceRelatedSectionRefs = {
    ...snapshotWithEvidenceReferenceIndex,
    evidence_reference_index: attachSWEBodelningEvidenceReferenceRelatedSectionRefs(
      snapshotWithEvidenceReferenceIndex.evidence_reference_index,
      snapshotWithEvidenceReferenceIndex.issue_index,
      snapshotWithEvidenceReferenceIndex.section_index,
    ),
  };
  const snapshotWithEvidenceExhibitIndex = {
    ...snapshotWithEvidenceReferenceRelatedSectionRefs,
    evidence_exhibit_index: deriveSWEBodelningProfileDossierEvidenceExhibitIndex(
      snapshotWithEvidenceReferenceRelatedSectionRefs,
    ),
  };
  const snapshotWithEvidenceReferenceRelatedExhibitRefs = {
    ...snapshotWithEvidenceExhibitIndex,
    evidence_reference_index: attachSWEBodelningEvidenceReferenceRelatedExhibitRefs(
      snapshotWithEvidenceReferenceRelatedSectionRefs.evidence_reference_index,
      snapshotWithEvidenceExhibitIndex.evidence_exhibit_index,
    ),
  };
  const snapshotWithSupportingReferenceRefs = {
    ...snapshotWithEvidenceReferenceRelatedExhibitRefs,
    profile_input_lane_snapshot: attachSWEBodelningLaneSupportingReferenceRefs(
      snapshotWithEvidenceReferenceRelatedExhibitRefs.profile_input_lane_snapshot,
      snapshotWithEvidenceReferenceRelatedExhibitRefs.evidence_reference_index,
    ),
  };
  const snapshotWithRelatedReferenceRefs = {
    ...snapshotWithSupportingReferenceRefs,
    issue_index: attachSWEBodelningIssueRelatedReferenceRefs(
      snapshotWithRelatedSectionRefs.issue_index,
      snapshotWithSupportingReferenceRefs.profile_input_lane_snapshot,
      snapshotWithEvidenceReferenceRelatedExhibitRefs.evidence_reference_index,
    ),
  };
  const snapshotWithSupportingExhibitRefs = {
    ...snapshotWithRelatedReferenceRefs,
    profile_input_lane_snapshot: attachSWEBodelningLaneSupportingExhibitRefs(
      snapshotWithSupportingReferenceRefs.profile_input_lane_snapshot,
      snapshotWithEvidenceReferenceRelatedExhibitRefs.evidence_exhibit_index,
    ),
  };
  const snapshotWithRelatedExhibitRefs = {
    ...snapshotWithSupportingExhibitRefs,
    issue_index: attachSWEBodelningIssueRelatedExhibitRefs(
      snapshotWithRelatedReferenceRefs.issue_index,
      snapshotWithSupportingExhibitRefs.profile_input_lane_snapshot,
      snapshotWithSupportingExhibitRefs.evidence_exhibit_index,
    ),
  };
  const snapshotWithLaneRelatedIssueRefs = {
    ...snapshotWithRelatedExhibitRefs,
    profile_input_lane_snapshot: attachSWEBodelningLaneRelatedIssueRefs(
      snapshotWithSupportingExhibitRefs.profile_input_lane_snapshot,
      snapshotWithRelatedExhibitRefs.issue_index,
    ),
  };
  const snapshotWithExhibitRelatedIssueRefs = {
    ...snapshotWithLaneRelatedIssueRefs,
    evidence_exhibit_index: attachSWEBodelningEvidenceExhibitRelatedIssueRefs(
      snapshotWithSupportingExhibitRefs.evidence_exhibit_index,
      snapshotWithRelatedExhibitRefs.issue_index,
    ),
  };
  const snapshotWithSectionRelatedExhibitRefs = {
    ...snapshotWithExhibitRelatedIssueRefs,
    section_index: attachSWEBodelningSectionRelatedExhibitRefs(
      snapshotWithSectionRelatedLaneKeys.section_index,
      snapshotWithRelatedExhibitRefs.issue_index,
      snapshotWithExhibitRelatedIssueRefs.evidence_exhibit_index,
    ),
  };
  const snapshotWithSectionRelatedReferenceRefs = {
    ...snapshotWithSectionRelatedExhibitRefs,
    section_index: attachSWEBodelningSectionRelatedReferenceRefs(
      snapshotWithSectionRelatedExhibitRefs.section_index,
      snapshotWithExhibitRelatedIssueRefs.evidence_exhibit_index,
      snapshotWithEvidenceReferenceRelatedExhibitRefs.evidence_reference_index,
    ),
  };
  const snapshotWithExhibitRelatedSectionRefs = {
    ...snapshotWithSectionRelatedReferenceRefs,
    evidence_exhibit_index: attachSWEBodelningEvidenceExhibitRelatedSectionRefs(
      snapshotWithExhibitRelatedIssueRefs.evidence_exhibit_index,
      snapshotWithSectionRelatedReferenceRefs.section_index,
    ),
  };
  const snapshotWithLaneRelatedSectionRefs = {
    ...snapshotWithExhibitRelatedSectionRefs,
    profile_input_lane_snapshot: attachSWEBodelningLaneRelatedSectionRefs(
      snapshotWithLaneRelatedIssueRefs.profile_input_lane_snapshot,
      snapshotWithExhibitRelatedSectionRefs.issue_index,
      snapshotWithExhibitRelatedSectionRefs.section_index,
    ),
  };

  return {
    ...snapshotWithLaneRelatedSectionRefs,
    dossier_fingerprint: deriveSWEBodelningProfileDossierFingerprint(
      snapshotWithLaneRelatedSectionRefs,
    ),
  };
}

function resolveSWEBodelningExportPackageGeneratedAt(options = {}) {
  if (
    typeof options.generated_at === "string" &&
    options.generated_at.length > 0
  ) {
    return options.generated_at;
  }

  throw createGovernanceError(
    "ERR_EXPORT_PACKAGE_INVALID",
    "generated_at must be provided for export package derivation",
    {
      field: "generated_at",
    },
  );
}

function deriveSWEBodelningExportPackageManifest() {
  return {
    included_top_level_artifacts: [
      "canonical_source",
      "profile_dossier_snapshot",
    ],
  };
}

function deriveSWEBodelningExportPackageFromProfileDossierSnapshot(
  profileDossierSnapshot,
  options = {},
) {
  assertPlainObject(
    profileDossierSnapshot,
    "ERR_PROFILE_DOSSIER_SNAPSHOT_INVALID",
    "profile_dossier_snapshot",
  );

  const canonicalProfileDossierSnapshot = validateSWEBodelningProfileDossierSnapshot(
    profileDossierSnapshot,
  );

  assertSupportedJurisdictionProfileCapability(
    canonicalProfileDossierSnapshot.jurisdiction_profile_key,
    "export_package",
  );

  return {
    jurisdiction_profile_key: supportedProfileKey,
    export_version: exportPackageVersion,
    dossier_fingerprint: canonicalProfileDossierSnapshot.dossier_fingerprint,
    canonical_source: canonicalProfileDossierSnapshot.canonical_source,
    profile_dossier_snapshot: canonicalProfileDossierSnapshot,
    generated_at: resolveSWEBodelningExportPackageGeneratedAt(options),
    manifest: deriveSWEBodelningExportPackageManifest(),
  };
}

function deriveSWEBodelningExportPackage(releaseEvalRun, options = {}) {
  assertPlainObject(releaseEvalRun, "ERR_RELEASE_EVAL_RUN_INVALID", "releaseEvalRun");

  assertSupportedJurisdictionProfileCapability(
    releaseEvalRun.jurisdiction_profile_key,
    "export_package",
  );

  return deriveSWEBodelningExportPackageFromProfileDossierSnapshot(
    releaseEvalRun.profile_dossier_snapshot,
    options,
  );
}

function deriveCMDExportPackageManifest() {
  return {
    included_top_level_artifacts: [
      "canonical_source",
      "profile_dossier_snapshot",
    ],
  };
}

function deriveCMDExportPackageDossierFingerprint(profileDossierSnapshot) {
  const canonicalProfileDossierSnapshot = validateCMDProfileDossierSnapshot(
    profileDossierSnapshot,
  );

  return crypto
    .createHash("sha256")
    .update(toCanonicalJson(canonicalProfileDossierSnapshot))
    .digest("hex");
}

function deriveCMDExportPackageCanonicalSource(options = {}) {
  const releaseEvalRunId =
    options.release_eval_run_id ?? options.canonical_source?.release_eval_run_id;
  const evaluatorVersion =
    options.evaluator_version ?? options.canonical_source?.evaluator_version;
  const jurisdictionProfileKey =
    options.jurisdiction_profile_key ??
    options.canonical_source?.jurisdiction_profile_key ??
    cmdProfileKey;
  const persistedAt =
    options.persisted_at ?? options.canonical_source?.persisted_at;

  for (const [field, value] of [
    ["release_eval_run_id", releaseEvalRunId],
    ["evaluator_version", evaluatorVersion],
    ["persisted_at", persistedAt],
  ]) {
    if (typeof value !== "string" || value.length === 0) {
      throw createGovernanceError(
        "ERR_EXPORT_PACKAGE_INVALID",
        `canonical_source.${field} must be a non-empty string`,
        { field: `canonical_source.${field}` },
      );
    }
  }

  if (jurisdictionProfileKey !== cmdProfileKey) {
    throw createGovernanceError(
      "ERR_UNSUPPORTED_JURISDICTION_PROFILE",
      "jurisdiction_profile_key is not supported",
      {
        jurisdiction_profile_key: jurisdictionProfileKey,
      },
    );
  }

  return {
    release_eval_run_id: releaseEvalRunId,
    evaluator_version: evaluatorVersion,
    jurisdiction_profile_key: cmdProfileKey,
    persisted_at: persistedAt,
  };
}

function deriveCMDExportPackageFromProfileDossierSnapshot(
  profileDossierSnapshot,
  options = {},
) {
  const canonicalProfileDossierSnapshot = validateCMDProfileDossierSnapshot(
    profileDossierSnapshot,
  );

  assertSupportedJurisdictionProfileCapability(cmdProfileKey, "export_package");

  return validateCMDExportPackage({
    jurisdiction_profile_key: cmdProfileKey,
    export_version: cmdExportPackageVersion,
    dossier_fingerprint: deriveCMDExportPackageDossierFingerprint(
      canonicalProfileDossierSnapshot,
    ),
    canonical_source: deriveCMDExportPackageCanonicalSource(options),
    profile_dossier_snapshot: canonicalProfileDossierSnapshot,
    generated_at: resolveSWEBodelningExportPackageGeneratedAt(options),
    manifest: deriveCMDExportPackageManifest(),
  });
}

function deriveCMDExportPackage(releaseEvalRun, options = {}) {
  const canonicalReleaseEvalRun = validateCMDReleaseEvalRunCore(releaseEvalRun);

  assertSupportedJurisdictionProfileCapability(cmdProfileKey, "export_package");

  return deriveCMDExportPackageFromProfileDossierSnapshot(
    resolveCMDProfileDossierSnapshot(releaseEvalRun, options),
    {
      ...options,
      release_eval_run_id: canonicalReleaseEvalRun.release_eval_run_id,
      evaluator_version: canonicalReleaseEvalRun.evaluator_version,
      jurisdiction_profile_key: canonicalReleaseEvalRun.jurisdiction_profile_key,
    },
  );
}

function deriveCMDExportPackageSnapshotStatus(
  exportPackageSnapshot,
  currentProfileDossierSnapshot,
) {
  const canonicalExportPackage = validateCMDExportPackage(exportPackageSnapshot);
  let currentDossierFingerprint = null;

  if (
    currentProfileDossierSnapshot &&
    typeof currentProfileDossierSnapshot === "object" &&
    !Array.isArray(currentProfileDossierSnapshot)
  ) {
    try {
      currentDossierFingerprint = deriveCMDExportPackageDossierFingerprint(
        currentProfileDossierSnapshot,
      );
    } catch {
      currentDossierFingerprint = null;
    }
  }

  const snapshotIsCurrent =
    canonicalExportPackage.export_version === cmdExportPackageVersion &&
    canonicalExportPackage.dossier_fingerprint === currentDossierFingerprint;

  return {
    source: snapshotIsCurrent ? "persisted-current" : "persisted-stale",
    snapshot_export_version_found: canonicalExportPackage.export_version,
    current_export_version: cmdExportPackageVersion,
    snapshot_is_current: snapshotIsCurrent,
  };
}

function resolveCMDExportPackageProjection(
  exportPackageSnapshot,
  currentProfileDossierSnapshot,
) {
  const canonicalExportPackage = validateCMDExportPackage(exportPackageSnapshot);

  assertSupportedJurisdictionProfileCapability(cmdProfileKey, "export_package");

  return validateCMDExportPackageProjection({
    ...canonicalExportPackage,
    snapshot_status: deriveCMDExportPackageSnapshotStatus(
      canonicalExportPackage,
      currentProfileDossierSnapshot,
    ),
  });
}

const sweBodelningExportPackageAdapter = Object.freeze({
  jurisdiction_profile_key: supportedProfileKey,
  deriveExportPackageFromProfileDossierSnapshot:
    deriveSWEBodelningExportPackageFromProfileDossierSnapshot,
  deriveExportPackage: deriveSWEBodelningExportPackage,
  resolveExportPackageProjection: resolveSWEBodelningExportPackageProjection,
});

const cmdExportPackageAdapter = Object.freeze({
  jurisdiction_profile_key: cmdProfileKey,
  deriveExportPackageFromProfileDossierSnapshot:
    deriveCMDExportPackageFromProfileDossierSnapshot,
  deriveExportPackage: deriveCMDExportPackage,
  resolveExportPackageProjection: resolveCMDExportPackageProjection,
});

const exportPackageAdapterRegistry = Object.freeze({
  [supportedProfileKey]: sweBodelningExportPackageAdapter,
  [cmdProfileKey]: cmdExportPackageAdapter,
});

function getExportPackageAdapter(jurisdictionProfileKey) {
  if (
    typeof jurisdictionProfileKey !== "string" ||
    jurisdictionProfileKey.length === 0
  ) {
    return null;
  }

  return exportPackageAdapterRegistry[jurisdictionProfileKey] ?? null;
}

function deriveExportPackageFromProfileDossierSnapshot(
  profileDossierSnapshot,
  options = {},
) {
  assertPlainObject(
    profileDossierSnapshot,
    "ERR_PROFILE_DOSSIER_SNAPSHOT_INVALID",
    "profile_dossier_snapshot",
  );

  if (
    typeof profileDossierSnapshot.jurisdiction_profile_key !== "string" ||
    profileDossierSnapshot.jurisdiction_profile_key.length === 0
  ) {
    return deriveSWEBodelningExportPackageFromProfileDossierSnapshot(
      profileDossierSnapshot,
      options,
    );
  }

  const adapter = getExportPackageAdapter(
    profileDossierSnapshot.jurisdiction_profile_key,
  );

  if (!adapter) {
    assertSupportedJurisdictionProfileCapability(
      profileDossierSnapshot.jurisdiction_profile_key,
      "export_package",
    );
  }

  return adapter.deriveExportPackageFromProfileDossierSnapshot(
    profileDossierSnapshot,
    options,
  );
}

function deriveExportPackage(releaseEvalRun, options = {}) {
  assertPlainObject(releaseEvalRun, "ERR_RELEASE_EVAL_RUN_INVALID", "releaseEvalRun");

  if (
    typeof releaseEvalRun.jurisdiction_profile_key !== "string" ||
    releaseEvalRun.jurisdiction_profile_key.length === 0
  ) {
    return deriveSWEBodelningExportPackage(releaseEvalRun, options);
  }

  const adapter = getExportPackageAdapter(releaseEvalRun.jurisdiction_profile_key);

  if (!adapter) {
    assertSupportedJurisdictionProfileCapability(
      releaseEvalRun.jurisdiction_profile_key,
      "export_package",
    );
  }

  return adapter.deriveExportPackage(releaseEvalRun, options);
}

function deriveSWEBodelningExportPackageJsonArtifact(exportPackageSnapshot) {
  const canonicalExportPackage = validateSWEBodelningExportPackage(
    exportPackageSnapshot,
  );

  return validateSWEBodelningExportPackageJsonArtifact({
    artifact_type: "export-package-json",
    filename: `${canonicalExportPackage.export_version}-${canonicalExportPackage.dossier_fingerprint}.json`,
    content_type: "application/json",
    encoding: "utf-8",
    body_utf8: toCanonicalJson(canonicalExportPackage),
  });
}

function deriveCMDExportPackageJsonArtifact(exportPackageSnapshot) {
  const canonicalExportPackage = validateCMDExportPackage(exportPackageSnapshot);
  assertSupportedJurisdictionProfileCapability(
    cmdProfileKey,
    "export_package_json_artifact",
  );

  return validateCMDExportPackageJsonArtifact({
    artifact_type: "export-package-json",
    filename: `${canonicalExportPackage.export_version}-${canonicalExportPackage.dossier_fingerprint}.json`,
    content_type: "application/json",
    encoding: "utf-8",
    body_utf8: toCanonicalJson(canonicalExportPackage),
  });
}

function deriveCMDExportPackageFromJsonArtifact(exportPackageJsonArtifactSnapshot) {
  const canonicalExportPackageJsonArtifact = validateCMDExportPackageJsonArtifact(
    exportPackageJsonArtifactSnapshot,
  );
  assertSupportedJurisdictionProfileCapability(
    cmdProfileKey,
    "export_package_json_artifact",
  );

  return validateCMDExportPackage(
    JSON.parse(canonicalExportPackageJsonArtifact.body_utf8),
  );
}

function deriveCMDExportPackageJsonArtifactSnapshotStatus(
  exportPackageJsonArtifactSnapshot,
  currentExportPackageSnapshot,
  currentProfileDossierSnapshot,
) {
  const exportPackageFromArtifact = deriveCMDExportPackageFromJsonArtifact(
    exportPackageJsonArtifactSnapshot,
  );
  let canonicalCurrentExportPackage = null;
  let currentDossierFingerprint = null;

  if (
    currentExportPackageSnapshot &&
    typeof currentExportPackageSnapshot === "object" &&
    !Array.isArray(currentExportPackageSnapshot)
  ) {
    try {
      canonicalCurrentExportPackage = validateCMDExportPackage(
        currentExportPackageSnapshot,
      );
    } catch {
      canonicalCurrentExportPackage = null;
    }
  }

  if (
    currentProfileDossierSnapshot &&
    typeof currentProfileDossierSnapshot === "object" &&
    !Array.isArray(currentProfileDossierSnapshot)
  ) {
    try {
      currentDossierFingerprint = deriveCMDExportPackageDossierFingerprint(
        currentProfileDossierSnapshot,
      );
    } catch {
      currentDossierFingerprint = null;
    }
  }

  const snapshotIsCurrent =
    canonicalCurrentExportPackage !== null &&
    exportPackageFromArtifact.export_version === cmdExportPackageVersion &&
    exportPackageFromArtifact.export_version ===
      canonicalCurrentExportPackage.export_version &&
    exportPackageFromArtifact.dossier_fingerprint ===
      canonicalCurrentExportPackage.dossier_fingerprint &&
    exportPackageFromArtifact.dossier_fingerprint === currentDossierFingerprint;

  return {
    source: snapshotIsCurrent ? "persisted-current" : "persisted-stale",
    snapshot_export_version_found: exportPackageFromArtifact.export_version,
    current_export_version: cmdExportPackageVersion,
    snapshot_is_current: snapshotIsCurrent,
  };
}

function resolveCMDExportPackageJsonArtifactProjection(
  exportPackageJsonArtifactSnapshot,
  currentExportPackageSnapshot,
  currentProfileDossierSnapshot,
) {
  const canonicalExportPackageJsonArtifact = validateCMDExportPackageJsonArtifact(
    exportPackageJsonArtifactSnapshot,
  );
  assertSupportedJurisdictionProfileCapability(
    cmdProfileKey,
    "export_package_json_artifact",
  );

  return validateCMDExportPackageJsonArtifactProjection({
    ...canonicalExportPackageJsonArtifact,
    snapshot_status: deriveCMDExportPackageJsonArtifactSnapshotStatus(
      canonicalExportPackageJsonArtifact,
      currentExportPackageSnapshot,
      currentProfileDossierSnapshot,
    ),
  });
}

const sweBodelningExportPackageJsonArtifactAdapter = Object.freeze({
  jurisdiction_profile_key: supportedProfileKey,
  deriveExportPackageJsonArtifact: deriveSWEBodelningExportPackageJsonArtifact,
  deriveExportPackageFromJsonArtifact: deriveSWEBodelningExportPackageFromJsonArtifact,
  resolveExportPackageJsonArtifactProjection:
    resolveSWEBodelningExportPackageJsonArtifactProjection,
});

const cmdExportPackageJsonArtifactAdapter = Object.freeze({
  jurisdiction_profile_key: cmdProfileKey,
  deriveExportPackageJsonArtifact: deriveCMDExportPackageJsonArtifact,
  deriveExportPackageFromJsonArtifact: deriveCMDExportPackageFromJsonArtifact,
  resolveExportPackageJsonArtifactProjection:
    resolveCMDExportPackageJsonArtifactProjection,
});

const exportPackageJsonArtifactAdapterRegistry = Object.freeze({
  [supportedProfileKey]: sweBodelningExportPackageJsonArtifactAdapter,
  [cmdProfileKey]: cmdExportPackageJsonArtifactAdapter,
});

function getExportPackageJsonArtifactAdapter(jurisdictionProfileKey) {
  if (
    typeof jurisdictionProfileKey !== "string" ||
    jurisdictionProfileKey.length === 0
  ) {
    return null;
  }

  return exportPackageJsonArtifactAdapterRegistry[jurisdictionProfileKey] ?? null;
}

function deriveExportPackageJsonArtifact(exportPackageSnapshot) {
  if (
    exportPackageSnapshot &&
    typeof exportPackageSnapshot === "object" &&
    !Array.isArray(exportPackageSnapshot) &&
    typeof exportPackageSnapshot.jurisdiction_profile_key === "string" &&
    exportPackageSnapshot.jurisdiction_profile_key.length > 0
  ) {
    const adapter = getExportPackageJsonArtifactAdapter(
      exportPackageSnapshot.jurisdiction_profile_key,
    );

    if (!adapter) {
      assertSupportedJurisdictionProfileCapability(
        exportPackageSnapshot.jurisdiction_profile_key,
        "export_package_json_artifact",
      );
    }

    return adapter.deriveExportPackageJsonArtifact(exportPackageSnapshot);
  }

  const defaultAdapter = Object.values(exportPackageJsonArtifactAdapterRegistry)[0];
  return defaultAdapter.deriveExportPackageJsonArtifact(exportPackageSnapshot);
}

function deriveSWEBodelningExportPackageDocxArtifact(exportPackageSnapshot) {
  const canonicalExportPackage = validateSWEBodelningExportPackage(
    exportPackageSnapshot,
  );
  const canonicalExportPackageJson = toCanonicalJson(canonicalExportPackage);
  const docxDocument = buildMinimalDocxDocument([
    "SWE_BODELNING Export Package",
    `jurisdiction_profile_key: ${canonicalExportPackage.jurisdiction_profile_key}`,
    `export_version: ${canonicalExportPackage.export_version}`,
    `dossier_fingerprint: ${canonicalExportPackage.dossier_fingerprint}`,
    `generated_at: ${canonicalExportPackage.generated_at}`,
    "canonical_export_package_json:",
    ...chunkDocxText(canonicalExportPackageJson),
  ]);

  return validateSWEBodelningExportPackageDocxArtifact({
    artifact_type: "export-package-docx",
    filename: `${canonicalExportPackage.export_version}-${canonicalExportPackage.dossier_fingerprint}.docx`,
    content_type:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    encoding: "base64",
    body_base64: docxDocument.toString("base64"),
  });
}

const sweBodelningExportPackageDocxArtifactAdapter = Object.freeze({
  jurisdiction_profile_key: supportedProfileKey,
  deriveExportPackageDocxArtifact: deriveSWEBodelningExportPackageDocxArtifact,
  deriveExportPackageFromDocxArtifact: deriveSWEBodelningExportPackageFromDocxArtifact,
  resolveExportPackageDocxArtifactProjection:
    resolveSWEBodelningExportPackageDocxArtifactProjection,
});

function deriveCMDExportPackageDocxArtifact(exportPackageSnapshot) {
  const canonicalExportPackage = validateCMDExportPackage(exportPackageSnapshot);
  assertSupportedJurisdictionProfileCapability(
    cmdProfileKey,
    "export_package_docx_artifact",
  );

  const canonicalExportPackageJson = toCanonicalJson(canonicalExportPackage);
  const docxDocument = buildMinimalDocxDocument([
    "CMD_PROFILE Export Package",
    `jurisdiction_profile_key: ${canonicalExportPackage.jurisdiction_profile_key}`,
    `export_version: ${canonicalExportPackage.export_version}`,
    `dossier_fingerprint: ${canonicalExportPackage.dossier_fingerprint}`,
    `generated_at: ${canonicalExportPackage.generated_at}`,
    "canonical_export_package_json:",
    ...chunkDocxText(canonicalExportPackageJson),
  ]);

  return validateCMDExportPackageDocxArtifact({
    artifact_type: "export-package-docx",
    filename: `${canonicalExportPackage.export_version}-${canonicalExportPackage.dossier_fingerprint}.docx`,
    content_type:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    encoding: "base64",
    body_base64: docxDocument.toString("base64"),
  });
}

function deriveCMDExportPackageFromDocxArtifact(exportPackageDocxArtifactSnapshot) {
  const canonicalExportPackageDocxArtifact = validateCMDExportPackageDocxArtifact(
    exportPackageDocxArtifactSnapshot,
  );
  assertSupportedJurisdictionProfileCapability(
    cmdProfileKey,
    "export_package_docx_artifact",
  );

  return reconstructCMDExportPackageFromDocxArtifactBody(
    canonicalExportPackageDocxArtifact.body_base64,
  );
}

function deriveCMDExportPackageDocxArtifactSnapshotStatus(
  exportPackageDocxArtifactSnapshot,
  currentExportPackageSnapshot,
  currentProfileDossierSnapshot,
) {
  const exportPackageFromArtifact = deriveCMDExportPackageFromDocxArtifact(
    exportPackageDocxArtifactSnapshot,
  );
  let canonicalCurrentExportPackage = null;
  let currentDossierFingerprint = null;

  if (
    currentExportPackageSnapshot &&
    typeof currentExportPackageSnapshot === "object" &&
    !Array.isArray(currentExportPackageSnapshot)
  ) {
    try {
      canonicalCurrentExportPackage = validateCMDExportPackage(
        currentExportPackageSnapshot,
      );
    } catch {
      canonicalCurrentExportPackage = null;
    }
  }

  if (
    currentProfileDossierSnapshot &&
    typeof currentProfileDossierSnapshot === "object" &&
    !Array.isArray(currentProfileDossierSnapshot)
  ) {
    try {
      currentDossierFingerprint = deriveCMDExportPackageDossierFingerprint(
        currentProfileDossierSnapshot,
      );
    } catch {
      currentDossierFingerprint = null;
    }
  }

  const snapshotIsCurrent =
    canonicalCurrentExportPackage !== null &&
    exportPackageFromArtifact.export_version === cmdExportPackageVersion &&
    exportPackageFromArtifact.export_version ===
      canonicalCurrentExportPackage.export_version &&
    exportPackageFromArtifact.dossier_fingerprint ===
      canonicalCurrentExportPackage.dossier_fingerprint &&
    exportPackageFromArtifact.dossier_fingerprint === currentDossierFingerprint;

  return {
    source: snapshotIsCurrent ? "persisted-current" : "persisted-stale",
    snapshot_export_version_found: exportPackageFromArtifact.export_version,
    current_export_version: cmdExportPackageVersion,
    snapshot_is_current: snapshotIsCurrent,
  };
}

function resolveCMDExportPackageDocxArtifactProjection(
  exportPackageDocxArtifactSnapshot,
  currentExportPackageSnapshot,
  currentProfileDossierSnapshot,
) {
  const canonicalExportPackageDocxArtifact = validateCMDExportPackageDocxArtifact(
    exportPackageDocxArtifactSnapshot,
  );
  assertSupportedJurisdictionProfileCapability(
    cmdProfileKey,
    "export_package_docx_artifact",
  );

  return validateCMDExportPackageDocxArtifactProjection({
    ...canonicalExportPackageDocxArtifact,
    snapshot_status: deriveCMDExportPackageDocxArtifactSnapshotStatus(
      canonicalExportPackageDocxArtifact,
      currentExportPackageSnapshot,
      currentProfileDossierSnapshot,
    ),
  });
}

const cmdExportPackageDocxArtifactAdapter = Object.freeze({
  jurisdiction_profile_key: cmdProfileKey,
  deriveExportPackageDocxArtifact: deriveCMDExportPackageDocxArtifact,
  deriveExportPackageFromDocxArtifact: deriveCMDExportPackageFromDocxArtifact,
  resolveExportPackageDocxArtifactProjection:
    resolveCMDExportPackageDocxArtifactProjection,
});

const exportPackageDocxArtifactAdapterRegistry = Object.freeze({
  [supportedProfileKey]: sweBodelningExportPackageDocxArtifactAdapter,
  [cmdProfileKey]: cmdExportPackageDocxArtifactAdapter,
});

function getExportPackageDocxArtifactAdapter(jurisdictionProfileKey) {
  if (
    typeof jurisdictionProfileKey !== "string" ||
    jurisdictionProfileKey.length === 0
  ) {
    return null;
  }

  return exportPackageDocxArtifactAdapterRegistry[jurisdictionProfileKey] ?? null;
}

function deriveExportPackageDocxArtifact(exportPackageSnapshot) {
  if (
    exportPackageSnapshot &&
    typeof exportPackageSnapshot === "object" &&
    !Array.isArray(exportPackageSnapshot) &&
    typeof exportPackageSnapshot.jurisdiction_profile_key === "string" &&
    exportPackageSnapshot.jurisdiction_profile_key.length > 0
  ) {
    const adapter = getExportPackageDocxArtifactAdapter(
      exportPackageSnapshot.jurisdiction_profile_key,
    );

    if (!adapter) {
      assertSupportedJurisdictionProfileCapability(
        exportPackageSnapshot.jurisdiction_profile_key,
        "export_package_docx_artifact",
      );
    }

    return adapter.deriveExportPackageDocxArtifact(exportPackageSnapshot);
  }

  const defaultAdapter = Object.values(exportPackageDocxArtifactAdapterRegistry)[0];
  return defaultAdapter.deriveExportPackageDocxArtifact(exportPackageSnapshot);
}

function deriveSWEBodelningExportPackageFromDocxArtifact(
  exportPackageDocxArtifactSnapshot,
) {
  const canonicalExportPackageDocxArtifact =
    validateSWEBodelningExportPackageDocxArtifact(exportPackageDocxArtifactSnapshot);

  return reconstructSWEBodelningExportPackageFromDocxArtifactBody(
    canonicalExportPackageDocxArtifact.body_base64,
    "ERR_EXPORT_PACKAGE_DOCX_ARTIFACT_INVALID",
  );
}

function resolveExportPackageDocxArtifactAdapter(
  exportPackageDocxArtifactSnapshot,
  currentExportPackageSnapshot,
) {
  if (
    currentExportPackageSnapshot &&
    typeof currentExportPackageSnapshot === "object" &&
    !Array.isArray(currentExportPackageSnapshot) &&
    typeof currentExportPackageSnapshot.jurisdiction_profile_key === "string" &&
    currentExportPackageSnapshot.jurisdiction_profile_key.length > 0
  ) {
    const currentExportPackageAdapter = getExportPackageDocxArtifactAdapter(
      currentExportPackageSnapshot.jurisdiction_profile_key,
    );

    if (currentExportPackageAdapter) {
      return currentExportPackageAdapter;
    }
  }

  for (const adapter of Object.values(exportPackageDocxArtifactAdapterRegistry)) {
    try {
      const exportPackageFromArtifact = adapter.deriveExportPackageFromDocxArtifact(
        exportPackageDocxArtifactSnapshot,
      );

      if (
        exportPackageFromArtifact.jurisdiction_profile_key ===
        adapter.jurisdiction_profile_key
      ) {
        return adapter;
      }
    } catch {
      // Try the next registered adapter.
    }
  }

  return null;
}

function deriveExportPackageFromDocxArtifact(exportPackageDocxArtifactSnapshot) {
  const adapter = resolveExportPackageDocxArtifactAdapter(
    exportPackageDocxArtifactSnapshot,
    null,
  );

  if (adapter) {
    return adapter.deriveExportPackageFromDocxArtifact(exportPackageDocxArtifactSnapshot);
  }

  const defaultAdapter = Object.values(exportPackageDocxArtifactAdapterRegistry)[0];
  return defaultAdapter.deriveExportPackageFromDocxArtifact(
    exportPackageDocxArtifactSnapshot,
  );
}

function deriveSWEBodelningExportPackagePdfArtifact(exportPackageSnapshot) {
  const canonicalExportPackage = validateSWEBodelningExportPackage(
    exportPackageSnapshot,
  );
  const canonicalExportPackageJson = toCanonicalJson(canonicalExportPackage);
  const pdfDocument = buildMinimalPdfDocument([
    "SWE_BODELNING Export Package",
    `jurisdiction_profile_key: ${canonicalExportPackage.jurisdiction_profile_key}`,
    `export_version: ${canonicalExportPackage.export_version}`,
    `dossier_fingerprint: ${canonicalExportPackage.dossier_fingerprint}`,
    `generated_at: ${canonicalExportPackage.generated_at}`,
    "canonical_export_package_json:",
    ...chunkPdfText(canonicalExportPackageJson),
  ]);

  return validateSWEBodelningExportPackagePdfArtifact({
    artifact_type: "export-package-pdf",
    filename: `${canonicalExportPackage.export_version}-${canonicalExportPackage.dossier_fingerprint}.pdf`,
    content_type: "application/pdf",
    encoding: "base64",
    body_base64: Buffer.from(pdfDocument, "utf8").toString("base64"),
  });
}

const sweBodelningExportPackagePdfArtifactAdapter = Object.freeze({
  jurisdiction_profile_key: supportedProfileKey,
  deriveExportPackagePdfArtifact: deriveSWEBodelningExportPackagePdfArtifact,
  deriveExportPackageFromPdfArtifact: deriveSWEBodelningExportPackageFromPdfArtifact,
  resolveExportPackagePdfArtifactProjection:
    resolveSWEBodelningExportPackagePdfArtifactProjection,
});

function deriveCMDExportPackagePdfArtifact(exportPackageSnapshot) {
  const canonicalExportPackage = validateCMDExportPackage(exportPackageSnapshot);
  assertSupportedJurisdictionProfileCapability(
    cmdProfileKey,
    "export_package_pdf_artifact",
  );

  const canonicalExportPackageJson = toCanonicalJson(canonicalExportPackage);
  const pdfDocument = buildMinimalPdfDocument([
    "CMD_PROFILE Export Package",
    `jurisdiction_profile_key: ${canonicalExportPackage.jurisdiction_profile_key}`,
    `export_version: ${canonicalExportPackage.export_version}`,
    `dossier_fingerprint: ${canonicalExportPackage.dossier_fingerprint}`,
    `generated_at: ${canonicalExportPackage.generated_at}`,
    "canonical_export_package_json:",
    ...chunkPdfText(canonicalExportPackageJson),
  ]);

  return validateCMDExportPackagePdfArtifact({
    artifact_type: "export-package-pdf",
    filename: `${canonicalExportPackage.export_version}-${canonicalExportPackage.dossier_fingerprint}.pdf`,
    content_type: "application/pdf",
    encoding: "base64",
    body_base64: Buffer.from(pdfDocument, "utf8").toString("base64"),
  });
}

function deriveCMDExportPackageFromPdfArtifact(exportPackagePdfArtifactSnapshot) {
  const canonicalExportPackagePdfArtifact = validateCMDExportPackagePdfArtifact(
    exportPackagePdfArtifactSnapshot,
  );
  assertSupportedJurisdictionProfileCapability(
    cmdProfileKey,
    "export_package_pdf_artifact",
  );

  return reconstructCMDExportPackageFromPdfArtifactBody(
    canonicalExportPackagePdfArtifact.body_base64,
  );
}

function deriveCMDExportPackagePdfArtifactSnapshotStatus(
  exportPackagePdfArtifactSnapshot,
  currentExportPackageSnapshot,
  currentProfileDossierSnapshot,
) {
  const exportPackageFromArtifact = deriveCMDExportPackageFromPdfArtifact(
    exportPackagePdfArtifactSnapshot,
  );
  let canonicalCurrentExportPackage = null;
  let currentDossierFingerprint = null;

  if (
    currentExportPackageSnapshot &&
    typeof currentExportPackageSnapshot === "object" &&
    !Array.isArray(currentExportPackageSnapshot)
  ) {
    try {
      canonicalCurrentExportPackage = validateCMDExportPackage(
        currentExportPackageSnapshot,
      );
    } catch {
      canonicalCurrentExportPackage = null;
    }
  }

  if (
    currentProfileDossierSnapshot &&
    typeof currentProfileDossierSnapshot === "object" &&
    !Array.isArray(currentProfileDossierSnapshot)
  ) {
    try {
      currentDossierFingerprint = deriveCMDExportPackageDossierFingerprint(
        currentProfileDossierSnapshot,
      );
    } catch {
      currentDossierFingerprint = null;
    }
  }

  const snapshotIsCurrent =
    canonicalCurrentExportPackage !== null &&
    exportPackageFromArtifact.export_version === cmdExportPackageVersion &&
    exportPackageFromArtifact.export_version ===
      canonicalCurrentExportPackage.export_version &&
    exportPackageFromArtifact.dossier_fingerprint ===
      canonicalCurrentExportPackage.dossier_fingerprint &&
    exportPackageFromArtifact.dossier_fingerprint === currentDossierFingerprint;

  return {
    source: snapshotIsCurrent ? "persisted-current" : "persisted-stale",
    snapshot_export_version_found: exportPackageFromArtifact.export_version,
    current_export_version: cmdExportPackageVersion,
    snapshot_is_current: snapshotIsCurrent,
  };
}

function resolveCMDExportPackagePdfArtifactProjection(
  exportPackagePdfArtifactSnapshot,
  currentExportPackageSnapshot,
  currentProfileDossierSnapshot,
) {
  const canonicalExportPackagePdfArtifact = validateCMDExportPackagePdfArtifact(
    exportPackagePdfArtifactSnapshot,
  );
  assertSupportedJurisdictionProfileCapability(
    cmdProfileKey,
    "export_package_pdf_artifact",
  );

  return validateCMDExportPackagePdfArtifactProjection({
    ...canonicalExportPackagePdfArtifact,
    snapshot_status: deriveCMDExportPackagePdfArtifactSnapshotStatus(
      canonicalExportPackagePdfArtifact,
      currentExportPackageSnapshot,
      currentProfileDossierSnapshot,
    ),
  });
}

const cmdExportPackagePdfArtifactAdapter = Object.freeze({
  jurisdiction_profile_key: cmdProfileKey,
  deriveExportPackagePdfArtifact: deriveCMDExportPackagePdfArtifact,
  deriveExportPackageFromPdfArtifact: deriveCMDExportPackageFromPdfArtifact,
  resolveExportPackagePdfArtifactProjection:
    resolveCMDExportPackagePdfArtifactProjection,
});

const exportPackagePdfArtifactAdapterRegistry = Object.freeze({
  [supportedProfileKey]: sweBodelningExportPackagePdfArtifactAdapter,
  [cmdProfileKey]: cmdExportPackagePdfArtifactAdapter,
});

function getExportPackagePdfArtifactAdapter(jurisdictionProfileKey) {
  if (
    typeof jurisdictionProfileKey !== "string" ||
    jurisdictionProfileKey.length === 0
  ) {
    return null;
  }

  return exportPackagePdfArtifactAdapterRegistry[jurisdictionProfileKey] ?? null;
}

function deriveExportPackagePdfArtifact(exportPackageSnapshot) {
  if (
    exportPackageSnapshot &&
    typeof exportPackageSnapshot === "object" &&
    !Array.isArray(exportPackageSnapshot) &&
    typeof exportPackageSnapshot.jurisdiction_profile_key === "string" &&
    exportPackageSnapshot.jurisdiction_profile_key.length > 0
  ) {
    const adapter = getExportPackagePdfArtifactAdapter(
      exportPackageSnapshot.jurisdiction_profile_key,
    );

    if (!adapter) {
      assertSupportedJurisdictionProfileCapability(
        exportPackageSnapshot.jurisdiction_profile_key,
        "export_package_pdf_artifact",
      );
    }

    return adapter.deriveExportPackagePdfArtifact(exportPackageSnapshot);
  }

  const defaultAdapter = Object.values(exportPackagePdfArtifactAdapterRegistry)[0];
  return defaultAdapter.deriveExportPackagePdfArtifact(exportPackageSnapshot);
}

function deriveSWEBodelningExportPackageFromPdfArtifact(
  exportPackagePdfArtifactSnapshot,
) {
  const canonicalExportPackagePdfArtifact =
    validateSWEBodelningExportPackagePdfArtifact(exportPackagePdfArtifactSnapshot);

  return reconstructSWEBodelningExportPackageFromPdfArtifactBody(
    canonicalExportPackagePdfArtifact.body_base64,
  );
}

function resolveExportPackagePdfArtifactAdapter(
  exportPackagePdfArtifactSnapshot,
  currentExportPackageSnapshot,
) {
  if (
    currentExportPackageSnapshot &&
    typeof currentExportPackageSnapshot === "object" &&
    !Array.isArray(currentExportPackageSnapshot) &&
    typeof currentExportPackageSnapshot.jurisdiction_profile_key === "string" &&
    currentExportPackageSnapshot.jurisdiction_profile_key.length > 0
  ) {
    const currentExportPackageAdapter = getExportPackagePdfArtifactAdapter(
      currentExportPackageSnapshot.jurisdiction_profile_key,
    );

    if (currentExportPackageAdapter) {
      return currentExportPackageAdapter;
    }
  }

  for (const adapter of Object.values(exportPackagePdfArtifactAdapterRegistry)) {
    try {
      const exportPackageFromArtifact = adapter.deriveExportPackageFromPdfArtifact(
        exportPackagePdfArtifactSnapshot,
      );

      if (
        exportPackageFromArtifact.jurisdiction_profile_key ===
        adapter.jurisdiction_profile_key
      ) {
        return adapter;
      }
    } catch {
      // Try the next registered adapter.
    }
  }

  return null;
}

function deriveExportPackageFromPdfArtifact(exportPackagePdfArtifactSnapshot) {
  const adapter = resolveExportPackagePdfArtifactAdapter(
    exportPackagePdfArtifactSnapshot,
    null,
  );

  if (adapter) {
    return adapter.deriveExportPackageFromPdfArtifact(exportPackagePdfArtifactSnapshot);
  }

  const defaultAdapter = Object.values(exportPackagePdfArtifactAdapterRegistry)[0];
  return defaultAdapter.deriveExportPackageFromPdfArtifact(
    exportPackagePdfArtifactSnapshot,
  );
}

function deriveSWEBodelningExportPackageMarkdownArtifact(exportPackageSnapshot) {
  const canonicalExportPackage = validateSWEBodelningExportPackage(
    exportPackageSnapshot,
  );

  return validateSWEBodelningExportPackageMarkdownArtifact({
    artifact_type: "export-package-markdown",
    filename: `${canonicalExportPackage.export_version}-${canonicalExportPackage.dossier_fingerprint}.md`,
    content_type: "text/markdown",
    encoding: "utf-8",
    body_utf8: [
      "# SWE_BODELNING Export Package",
      "",
      "## Metadata",
      "",
      `- \`jurisdiction_profile_key\`: \`${canonicalExportPackage.jurisdiction_profile_key}\``,
      `- \`export_version\`: \`${canonicalExportPackage.export_version}\``,
      `- \`dossier_fingerprint\`: \`${canonicalExportPackage.dossier_fingerprint}\``,
      `- \`generated_at\`: \`${canonicalExportPackage.generated_at}\``,
      "",
      "## Canonical Source",
      "",
      "```json",
      toCanonicalJson(canonicalExportPackage.canonical_source),
      "```",
      "",
      "## Manifest",
      "",
      "```json",
      toCanonicalJson(canonicalExportPackage.manifest),
      "```",
      "",
      "## Profile Dossier Snapshot",
      "",
      "```json",
      toCanonicalJson(canonicalExportPackage.profile_dossier_snapshot),
      "```",
      "",
    ].join("\n"),
  });
}

function deriveCMDExportPackageMarkdownArtifact(exportPackageSnapshot) {
  const canonicalExportPackage = validateCMDExportPackage(exportPackageSnapshot);
  assertSupportedJurisdictionProfileCapability(
    cmdProfileKey,
    "export_package_markdown_artifact",
  );

  return validateCMDExportPackageMarkdownArtifact({
    artifact_type: "export-package-markdown",
    filename: `${canonicalExportPackage.export_version}-${canonicalExportPackage.dossier_fingerprint}.md`,
    content_type: "text/markdown",
    encoding: "utf-8",
    body_utf8: [
      "# CMD_PROFILE Export Package",
      "",
      "## Metadata",
      "",
      `- \`jurisdiction_profile_key\`: \`${canonicalExportPackage.jurisdiction_profile_key}\``,
      `- \`export_version\`: \`${canonicalExportPackage.export_version}\``,
      `- \`dossier_fingerprint\`: \`${canonicalExportPackage.dossier_fingerprint}\``,
      `- \`generated_at\`: \`${canonicalExportPackage.generated_at}\``,
      "",
      "## Canonical Source",
      "",
      "```json",
      toCanonicalJson(canonicalExportPackage.canonical_source),
      "```",
      "",
      "## Manifest",
      "",
      "```json",
      toCanonicalJson(canonicalExportPackage.manifest),
      "```",
      "",
      "## Profile Dossier Snapshot",
      "",
      "```json",
      toCanonicalJson(canonicalExportPackage.profile_dossier_snapshot),
      "```",
      "",
    ].join("\n"),
  });
}

function deriveCMDExportPackageFromMarkdownArtifact(
  exportPackageMarkdownArtifactSnapshot,
) {
  const canonicalExportPackageMarkdownArtifact = validateCMDExportPackageMarkdownArtifact(
    exportPackageMarkdownArtifactSnapshot,
  );
  assertSupportedJurisdictionProfileCapability(
    cmdProfileKey,
    "export_package_markdown_artifact",
  );

  return reconstructCMDExportPackageFromMarkdownArtifactBody(
    canonicalExportPackageMarkdownArtifact.body_utf8,
  );
}

function deriveCMDExportPackageMarkdownArtifactSnapshotStatus(
  exportPackageMarkdownArtifactSnapshot,
  currentExportPackageSnapshot,
  currentProfileDossierSnapshot,
) {
  const exportPackageFromArtifact = deriveCMDExportPackageFromMarkdownArtifact(
    exportPackageMarkdownArtifactSnapshot,
  );
  let canonicalCurrentExportPackage = null;
  let currentDossierFingerprint = null;

  if (
    currentExportPackageSnapshot &&
    typeof currentExportPackageSnapshot === "object" &&
    !Array.isArray(currentExportPackageSnapshot)
  ) {
    try {
      canonicalCurrentExportPackage = validateCMDExportPackage(
        currentExportPackageSnapshot,
      );
    } catch {
      canonicalCurrentExportPackage = null;
    }
  }

  if (
    currentProfileDossierSnapshot &&
    typeof currentProfileDossierSnapshot === "object" &&
    !Array.isArray(currentProfileDossierSnapshot)
  ) {
    try {
      currentDossierFingerprint = deriveCMDExportPackageDossierFingerprint(
        currentProfileDossierSnapshot,
      );
    } catch {
      currentDossierFingerprint = null;
    }
  }

  const snapshotIsCurrent =
    canonicalCurrentExportPackage !== null &&
    exportPackageFromArtifact.export_version === cmdExportPackageVersion &&
    exportPackageFromArtifact.export_version ===
      canonicalCurrentExportPackage.export_version &&
    exportPackageFromArtifact.dossier_fingerprint ===
      canonicalCurrentExportPackage.dossier_fingerprint &&
    exportPackageFromArtifact.dossier_fingerprint === currentDossierFingerprint;

  return {
    source: snapshotIsCurrent ? "persisted-current" : "persisted-stale",
    snapshot_export_version_found: exportPackageFromArtifact.export_version,
    current_export_version: cmdExportPackageVersion,
    snapshot_is_current: snapshotIsCurrent,
  };
}

const sweBodelningExportPackageMarkdownArtifactAdapter = Object.freeze({
  jurisdiction_profile_key: supportedProfileKey,
  deriveExportPackageMarkdownArtifact: deriveSWEBodelningExportPackageMarkdownArtifact,
  deriveExportPackageFromMarkdownArtifact:
    deriveSWEBodelningExportPackageFromMarkdownArtifact,
  resolveExportPackageMarkdownArtifactProjection:
    resolveSWEBodelningExportPackageMarkdownArtifactProjection,
});

function resolveCMDExportPackageMarkdownArtifactProjection(
  exportPackageMarkdownArtifactSnapshot,
  currentExportPackageSnapshot,
  currentProfileDossierSnapshot,
) {
  const canonicalExportPackageMarkdownArtifact = validateCMDExportPackageMarkdownArtifact(
    exportPackageMarkdownArtifactSnapshot,
  );
  assertSupportedJurisdictionProfileCapability(
    cmdProfileKey,
    "export_package_markdown_artifact",
  );

  return validateCMDExportPackageMarkdownArtifactProjection({
    ...canonicalExportPackageMarkdownArtifact,
    snapshot_status: deriveCMDExportPackageMarkdownArtifactSnapshotStatus(
      canonicalExportPackageMarkdownArtifact,
      currentExportPackageSnapshot,
      currentProfileDossierSnapshot,
    ),
  });
}

const cmdExportPackageMarkdownArtifactAdapter = Object.freeze({
  jurisdiction_profile_key: cmdProfileKey,
  deriveExportPackageMarkdownArtifact: deriveCMDExportPackageMarkdownArtifact,
  deriveExportPackageFromMarkdownArtifact:
    deriveCMDExportPackageFromMarkdownArtifact,
  resolveExportPackageMarkdownArtifactProjection:
    resolveCMDExportPackageMarkdownArtifactProjection,
});

const exportPackageMarkdownArtifactAdapterRegistry = Object.freeze({
  [supportedProfileKey]: sweBodelningExportPackageMarkdownArtifactAdapter,
  [cmdProfileKey]: cmdExportPackageMarkdownArtifactAdapter,
});

function getExportPackageMarkdownArtifactAdapter(jurisdictionProfileKey) {
  if (
    typeof jurisdictionProfileKey !== "string" ||
    jurisdictionProfileKey.length === 0
  ) {
    return null;
  }

  return exportPackageMarkdownArtifactAdapterRegistry[jurisdictionProfileKey] ?? null;
}

function deriveExportPackageMarkdownArtifact(exportPackageSnapshot) {
  if (
    exportPackageSnapshot &&
    typeof exportPackageSnapshot === "object" &&
    !Array.isArray(exportPackageSnapshot) &&
    typeof exportPackageSnapshot.jurisdiction_profile_key === "string" &&
    exportPackageSnapshot.jurisdiction_profile_key.length > 0
  ) {
    const adapter = getExportPackageMarkdownArtifactAdapter(
      exportPackageSnapshot.jurisdiction_profile_key,
    );

    if (!adapter) {
      assertSupportedJurisdictionProfileCapability(
        exportPackageSnapshot.jurisdiction_profile_key,
        "export_package_markdown_artifact",
      );
    }

    return adapter.deriveExportPackageMarkdownArtifact(exportPackageSnapshot);
  }

  const defaultAdapter = Object.values(exportPackageMarkdownArtifactAdapterRegistry)[0];
  return defaultAdapter.deriveExportPackageMarkdownArtifact(exportPackageSnapshot);
}

function toSWEBodelningExportPackageBundleManifestArtifactEntry(artifactSnapshot) {
  return {
    artifact_type: artifactSnapshot.artifact_type,
    filename: artifactSnapshot.filename,
    content_type: artifactSnapshot.content_type,
    encoding: artifactSnapshot.encoding,
  };
}

function toCMDExportPackageBundleManifestArtifactEntry(artifactSnapshot) {
  return {
    artifact_type: artifactSnapshot.artifact_type,
    filename: artifactSnapshot.filename,
    content_type: artifactSnapshot.content_type,
    encoding: artifactSnapshot.encoding,
  };
}

function assertSWEBodelningBundleManifestArtifactMatchesExportPackage(
  canonicalExportPackage,
  artifactSnapshot,
  exportPackageFromArtifact,
) {
  if (toCanonicalJson(exportPackageFromArtifact) !== toCanonicalJson(canonicalExportPackage)) {
    throw createGovernanceError(
      "ERR_EXPORT_PACKAGE_ARTIFACT_MISMATCH",
      "artifact snapshot does not match export package snapshot",
      {
        artifact_type: artifactSnapshot.artifact_type,
      },
    );
  }
}

function assertCMDExportPackageBundleManifestArtifactMatchesExportPackage(
  canonicalExportPackage,
  artifactSnapshot,
  exportPackageFromArtifact,
) {
  if (toCanonicalJson(exportPackageFromArtifact) !== toCanonicalJson(canonicalExportPackage)) {
    throw createGovernanceError(
      "ERR_EXPORT_PACKAGE_ARTIFACT_MISMATCH",
      "artifact snapshot does not match export package snapshot",
      {
        artifact_type: artifactSnapshot.artifact_type,
      },
    );
  }
}

function deriveSWEBodelningExportPackageBundleManifestFingerprint(
  bundleManifestSnapshot,
) {
  const canonicalBundleManifest = validateSWEBodelningExportPackageBundleManifest(
    bundleManifestSnapshot,
  );

  return crypto
    .createHash("sha256")
    .update(toCanonicalJson(canonicalBundleManifest))
    .digest("hex");
}

function deriveCMDExportPackageBundleManifestFingerprint(bundleManifestSnapshot) {
  const canonicalBundleManifest = validateCMDExportPackageBundleManifest(
    bundleManifestSnapshot,
  );

  return crypto
    .createHash("sha256")
    .update(toCanonicalJson(canonicalBundleManifest))
    .digest("hex");
}

function deriveSWEBodelningExportPackageBundleManifest(
  exportPackageSnapshot,
  artifactSnapshots,
  options = {},
) {
  const canonicalExportPackage = validateSWEBodelningExportPackage(
    exportPackageSnapshot,
  );

  assertPlainObject(
    artifactSnapshots,
    "ERR_EXPORT_PACKAGE_BUNDLE_MANIFEST_INVALID",
    "artifactSnapshots",
  );

  const canonicalJsonArtifact = validateSWEBodelningExportPackageJsonArtifact(
    artifactSnapshots.jsonArtifactSnapshot,
  );
  const canonicalMarkdownArtifact = validateSWEBodelningExportPackageMarkdownArtifact(
    artifactSnapshots.markdownArtifactSnapshot,
  );
  const canonicalPdfArtifact = validateSWEBodelningExportPackagePdfArtifact(
    artifactSnapshots.pdfArtifactSnapshot,
  );
  const canonicalDocxArtifact = validateSWEBodelningExportPackageDocxArtifact(
    artifactSnapshots.docxArtifactSnapshot,
  );

  assertSWEBodelningBundleManifestArtifactMatchesExportPackage(
    canonicalExportPackage,
    canonicalJsonArtifact,
    deriveSWEBodelningExportPackageFromJsonArtifact(canonicalJsonArtifact),
  );
  assertSWEBodelningBundleManifestArtifactMatchesExportPackage(
    canonicalExportPackage,
    canonicalMarkdownArtifact,
    deriveSWEBodelningExportPackageFromMarkdownArtifact(canonicalMarkdownArtifact),
  );
  assertSWEBodelningBundleManifestArtifactMatchesExportPackage(
    canonicalExportPackage,
    canonicalPdfArtifact,
    deriveSWEBodelningExportPackageFromPdfArtifact(canonicalPdfArtifact),
  );
  assertSWEBodelningBundleManifestArtifactMatchesExportPackage(
    canonicalExportPackage,
    canonicalDocxArtifact,
    deriveSWEBodelningExportPackageFromDocxArtifact(canonicalDocxArtifact),
  );

  return validateSWEBodelningExportPackageBundleManifest({
    jurisdiction_profile_key: canonicalExportPackage.jurisdiction_profile_key,
    package_version: exportPackageBundleManifestVersion,
    export_version: canonicalExportPackage.export_version,
    dossier_fingerprint: canonicalExportPackage.dossier_fingerprint,
    canonical_source: canonicalExportPackage.canonical_source,
    generated_at: options.generated_at ?? canonicalExportPackage.generated_at,
    artifacts: [
      toSWEBodelningExportPackageBundleManifestArtifactEntry(canonicalJsonArtifact),
      toSWEBodelningExportPackageBundleManifestArtifactEntry(canonicalMarkdownArtifact),
      toSWEBodelningExportPackageBundleManifestArtifactEntry(canonicalPdfArtifact),
      toSWEBodelningExportPackageBundleManifestArtifactEntry(canonicalDocxArtifact),
    ],
  });
}

const sweBodelningExportPackageBundleManifestAdapter = Object.freeze({
  jurisdiction_profile_key: supportedProfileKey,
  deriveExportPackageBundleManifest: deriveSWEBodelningExportPackageBundleManifest,
  resolveExportPackageBundleManifestProjection:
    resolveSWEBodelningExportPackageBundleManifestProjection,
});

function deriveCMDExportPackageBundleManifest(
  exportPackageSnapshot,
  artifactSnapshots,
  options = {},
) {
  const canonicalExportPackage = validateCMDExportPackage(exportPackageSnapshot);
  assertSupportedJurisdictionProfileCapability(
    cmdProfileKey,
    "export_package_bundle_manifest",
  );

  assertPlainObject(
    artifactSnapshots,
    "ERR_EXPORT_PACKAGE_BUNDLE_MANIFEST_INVALID",
    "artifactSnapshots",
  );

  const canonicalJsonArtifact = validateCMDExportPackageJsonArtifact(
    artifactSnapshots.jsonArtifactSnapshot,
  );
  const canonicalMarkdownArtifact = validateCMDExportPackageMarkdownArtifact(
    artifactSnapshots.markdownArtifactSnapshot,
  );
  const canonicalPdfArtifact = validateCMDExportPackagePdfArtifact(
    artifactSnapshots.pdfArtifactSnapshot,
  );
  const canonicalDocxArtifact = validateCMDExportPackageDocxArtifact(
    artifactSnapshots.docxArtifactSnapshot,
  );

  assertCMDExportPackageBundleManifestArtifactMatchesExportPackage(
    canonicalExportPackage,
    canonicalJsonArtifact,
    deriveCMDExportPackageFromJsonArtifact(canonicalJsonArtifact),
  );
  assertCMDExportPackageBundleManifestArtifactMatchesExportPackage(
    canonicalExportPackage,
    canonicalMarkdownArtifact,
    deriveCMDExportPackageFromMarkdownArtifact(canonicalMarkdownArtifact),
  );
  assertCMDExportPackageBundleManifestArtifactMatchesExportPackage(
    canonicalExportPackage,
    canonicalPdfArtifact,
    deriveCMDExportPackageFromPdfArtifact(canonicalPdfArtifact),
  );
  assertCMDExportPackageBundleManifestArtifactMatchesExportPackage(
    canonicalExportPackage,
    canonicalDocxArtifact,
    deriveCMDExportPackageFromDocxArtifact(canonicalDocxArtifact),
  );

  return validateCMDExportPackageBundleManifest({
    jurisdiction_profile_key: canonicalExportPackage.jurisdiction_profile_key,
    package_version: cmdExportPackageBundleManifestVersion,
    export_version: canonicalExportPackage.export_version,
    dossier_fingerprint: canonicalExportPackage.dossier_fingerprint,
    canonical_source: canonicalExportPackage.canonical_source,
    generated_at: options.generated_at ?? canonicalExportPackage.generated_at,
    artifacts: [
      toCMDExportPackageBundleManifestArtifactEntry(canonicalJsonArtifact),
      toCMDExportPackageBundleManifestArtifactEntry(canonicalMarkdownArtifact),
      toCMDExportPackageBundleManifestArtifactEntry(canonicalPdfArtifact),
      toCMDExportPackageBundleManifestArtifactEntry(canonicalDocxArtifact),
    ],
  });
}

function resolveCMDExportPackageBundleManifestProjection(
  exportPackageBundleManifestSnapshot,
  currentExportPackageSnapshot,
  currentArtifactSnapshots,
) {
  const canonicalExportPackageBundleManifest = validateCMDExportPackageBundleManifest(
    exportPackageBundleManifestSnapshot,
  );
  assertSupportedJurisdictionProfileCapability(
    cmdProfileKey,
    "export_package_bundle_manifest",
  );

  return validateCMDExportPackageBundleManifestProjection({
    ...canonicalExportPackageBundleManifest,
    snapshot_status: deriveCMDExportPackageBundleManifestSnapshotStatus(
      canonicalExportPackageBundleManifest,
      currentExportPackageSnapshot,
      currentArtifactSnapshots,
    ),
  });
}

const cmdExportPackageBundleManifestAdapter = Object.freeze({
  jurisdiction_profile_key: cmdProfileKey,
  deriveExportPackageBundleManifest: deriveCMDExportPackageBundleManifest,
  resolveExportPackageBundleManifestProjection:
    resolveCMDExportPackageBundleManifestProjection,
});

const exportPackageBundleManifestAdapterRegistry = Object.freeze({
  [supportedProfileKey]: sweBodelningExportPackageBundleManifestAdapter,
  [cmdProfileKey]: cmdExportPackageBundleManifestAdapter,
});

function getExportPackageBundleManifestAdapter(jurisdictionProfileKey) {
  if (
    typeof jurisdictionProfileKey !== "string" ||
    jurisdictionProfileKey.length === 0
  ) {
    return null;
  }

  return exportPackageBundleManifestAdapterRegistry[jurisdictionProfileKey] ?? null;
}

function deriveExportPackageBundleManifest(
  exportPackageSnapshot,
  artifactSnapshots,
  options = {},
) {
  if (
    exportPackageSnapshot &&
    typeof exportPackageSnapshot === "object" &&
    !Array.isArray(exportPackageSnapshot) &&
    typeof exportPackageSnapshot.jurisdiction_profile_key === "string" &&
    exportPackageSnapshot.jurisdiction_profile_key.length > 0
  ) {
    const adapter = getExportPackageBundleManifestAdapter(
      exportPackageSnapshot.jurisdiction_profile_key,
    );

    if (!adapter) {
      assertSupportedJurisdictionProfileCapability(
        exportPackageSnapshot.jurisdiction_profile_key,
        "export_package_bundle_manifest",
      );
    }

    return adapter.deriveExportPackageBundleManifest(
      exportPackageSnapshot,
      artifactSnapshots,
      options,
    );
  }

  const defaultAdapter = Object.values(exportPackageBundleManifestAdapterRegistry)[0];
  return defaultAdapter.deriveExportPackageBundleManifest(
    exportPackageSnapshot,
    artifactSnapshots,
    options,
  );
}

function assertSWEBodelningBundleArchiveManifestArtifactMatchesSnapshot(
  canonicalBundleManifest,
  manifestArtifactEntry,
  artifactSnapshot,
) {
  if (
    toCanonicalJson(manifestArtifactEntry) !==
    toCanonicalJson(toSWEBodelningExportPackageBundleManifestArtifactEntry(artifactSnapshot))
  ) {
    throw createGovernanceError(
      "ERR_EXPORT_PACKAGE_BUNDLE_ARCHIVE_INVALID",
      "bundle/package manifest artifact entry does not match persisted artifact snapshot",
      {
        artifact_type: artifactSnapshot.artifact_type,
      },
    );
  }

  let exportPackageFromArtifact;

  switch (artifactSnapshot.artifact_type) {
    case "export-package-json":
      exportPackageFromArtifact =
        deriveSWEBodelningExportPackageFromJsonArtifact(artifactSnapshot);
      break;
    case "export-package-markdown":
      exportPackageFromArtifact =
        deriveSWEBodelningExportPackageFromMarkdownArtifact(artifactSnapshot);
      break;
    case "export-package-pdf":
      exportPackageFromArtifact =
        deriveSWEBodelningExportPackageFromPdfArtifact(artifactSnapshot);
      break;
    case "export-package-docx":
      exportPackageFromArtifact =
        deriveSWEBodelningExportPackageFromDocxArtifact(artifactSnapshot);
      break;
    default:
      throw createGovernanceError(
        "ERR_EXPORT_PACKAGE_BUNDLE_ARCHIVE_INVALID",
        "artifact_type is not supported for final archive generation",
        {
          artifact_type: artifactSnapshot.artifact_type,
        },
      );
  }

  for (const field of [
    "jurisdiction_profile_key",
    "export_version",
    "dossier_fingerprint",
  ]) {
    if (exportPackageFromArtifact[field] !== canonicalBundleManifest[field]) {
      throw createGovernanceError(
        "ERR_EXPORT_PACKAGE_BUNDLE_ARCHIVE_INVALID",
        "artifact snapshot does not match bundle/package manifest identity",
        {
          artifact_type: artifactSnapshot.artifact_type,
          field,
        },
      );
    }
  }

  if (
    toCanonicalJson(exportPackageFromArtifact.canonical_source) !==
    toCanonicalJson(canonicalBundleManifest.canonical_source)
  ) {
    throw createGovernanceError(
      "ERR_EXPORT_PACKAGE_BUNDLE_ARCHIVE_INVALID",
      "artifact snapshot canonical_source does not match bundle/package manifest",
      {
        artifact_type: artifactSnapshot.artifact_type,
        field: "canonical_source",
      },
    );
  }
}

function assertCMDBundleArchiveManifestArtifactMatchesSnapshot(
  canonicalBundleManifest,
  manifestArtifactEntry,
  artifactSnapshot,
) {
  if (
    toCanonicalJson(manifestArtifactEntry) !==
    toCanonicalJson(toCMDExportPackageBundleManifestArtifactEntry(artifactSnapshot))
  ) {
    throw createGovernanceError(
      "ERR_EXPORT_PACKAGE_BUNDLE_ARCHIVE_INVALID",
      "bundle/package manifest artifact entry does not match persisted artifact snapshot",
      {
        artifact_type: artifactSnapshot.artifact_type,
      },
    );
  }

  let exportPackageFromArtifact;

  switch (artifactSnapshot.artifact_type) {
    case "export-package-json":
      exportPackageFromArtifact =
        deriveCMDExportPackageFromJsonArtifact(artifactSnapshot);
      break;
    case "export-package-markdown":
      exportPackageFromArtifact =
        deriveCMDExportPackageFromMarkdownArtifact(artifactSnapshot);
      break;
    case "export-package-pdf":
      exportPackageFromArtifact =
        deriveCMDExportPackageFromPdfArtifact(artifactSnapshot);
      break;
    case "export-package-docx":
      exportPackageFromArtifact =
        deriveCMDExportPackageFromDocxArtifact(artifactSnapshot);
      break;
    default:
      throw createGovernanceError(
        "ERR_EXPORT_PACKAGE_BUNDLE_ARCHIVE_INVALID",
        "artifact_type is not supported for final archive generation",
        {
          artifact_type: artifactSnapshot.artifact_type,
        },
      );
  }

  for (const field of [
    "jurisdiction_profile_key",
    "export_version",
    "dossier_fingerprint",
  ]) {
    if (exportPackageFromArtifact[field] !== canonicalBundleManifest[field]) {
      throw createGovernanceError(
        "ERR_EXPORT_PACKAGE_BUNDLE_ARCHIVE_INVALID",
        "artifact snapshot does not match bundle/package manifest identity",
        {
          artifact_type: artifactSnapshot.artifact_type,
          field,
        },
      );
    }
  }

  if (
    toCanonicalJson(exportPackageFromArtifact.canonical_source) !==
    toCanonicalJson(canonicalBundleManifest.canonical_source)
  ) {
    throw createGovernanceError(
      "ERR_EXPORT_PACKAGE_BUNDLE_ARCHIVE_INVALID",
      "artifact snapshot canonical_source does not match bundle/package manifest",
      {
        artifact_type: artifactSnapshot.artifact_type,
        field: "canonical_source",
      },
    );
  }
}

function toBundleArchiveFileData(artifactSnapshot) {
  if (typeof artifactSnapshot.body_utf8 === "string") {
    return Buffer.from(artifactSnapshot.body_utf8, "utf8");
  }

  if (typeof artifactSnapshot.body_base64 === "string") {
    return Buffer.from(artifactSnapshot.body_base64, "base64");
  }

  throw createGovernanceError(
    "ERR_EXPORT_PACKAGE_BUNDLE_ARCHIVE_INVALID",
    "artifact snapshot body is not supported for final archive generation",
    {
      artifact_type: artifactSnapshot.artifact_type,
    },
  );
}

function deriveSWEBodelningExportPackageBundleArchiveArtifact(
  bundleManifestSnapshot,
  artifactSnapshots,
) {
  const canonicalBundleManifest = validateSWEBodelningExportPackageBundleManifest(
    bundleManifestSnapshot,
  );

  assertPlainObject(
    artifactSnapshots,
    "ERR_EXPORT_PACKAGE_BUNDLE_ARCHIVE_INVALID",
    "artifactSnapshots",
  );

  const artifactsByType = {
    "export-package-json": validateSWEBodelningExportPackageJsonArtifact(
      artifactSnapshots.jsonArtifactSnapshot,
    ),
    "export-package-markdown": validateSWEBodelningExportPackageMarkdownArtifact(
      artifactSnapshots.markdownArtifactSnapshot,
    ),
    "export-package-pdf": validateSWEBodelningExportPackagePdfArtifact(
      artifactSnapshots.pdfArtifactSnapshot,
    ),
    "export-package-docx": validateSWEBodelningExportPackageDocxArtifact(
      artifactSnapshots.docxArtifactSnapshot,
    ),
  };

  const manifestBodyUtf8 = toCanonicalJson(canonicalBundleManifest);
  const bundleManifestFingerprint = deriveSWEBodelningExportPackageBundleManifestFingerprint(
    canonicalBundleManifest,
  );
  const archiveBody = buildStoredZip([
    { name: "bundle-manifest.json", data: manifestBodyUtf8 },
    ...canonicalBundleManifest.artifacts.map((manifestArtifactEntry) => {
      const artifactSnapshot = artifactsByType[manifestArtifactEntry.artifact_type];

      if (!artifactSnapshot) {
        throw createGovernanceError(
          "ERR_EXPORT_PACKAGE_BUNDLE_ARCHIVE_INVALID",
          "required artifact snapshot is missing for final archive generation",
          {
            artifact_type: manifestArtifactEntry.artifact_type,
          },
        );
      }

      assertSWEBodelningBundleArchiveManifestArtifactMatchesSnapshot(
        canonicalBundleManifest,
        manifestArtifactEntry,
        artifactSnapshot,
      );

      return {
        name: manifestArtifactEntry.filename,
        data: toBundleArchiveFileData(artifactSnapshot),
      };
    }),
  ]);

  return validateSWEBodelningExportPackageBundleArchiveArtifact({
    artifact_type: "export-package-bundle-archive",
    filename: `${canonicalBundleManifest.package_version}-${bundleManifestFingerprint}.zip`,
    content_type: "application/zip",
    encoding: "base64",
    body_base64: archiveBody.toString("base64"),
    package_version: canonicalBundleManifest.package_version,
    bundle_manifest_fingerprint: bundleManifestFingerprint,
  });
}

function deriveSWEBodelningExportPackageBundleArchiveArtifactSnapshotStatus(
  exportPackageBundleArchiveArtifactSnapshot,
  currentBundleManifestProjection,
) {
  const canonicalExportPackageBundleArchiveArtifact =
    validateSWEBodelningExportPackageBundleArchiveArtifact(
      exportPackageBundleArchiveArtifactSnapshot,
    );
  let canonicalCurrentBundleManifest = null;
  let currentBundleManifestFingerprint = null;
  let currentDossierFingerprint = null;
  let currentBundleManifestIsCurrent = false;

  if (
    currentBundleManifestProjection &&
    typeof currentBundleManifestProjection === "object" &&
    !Array.isArray(currentBundleManifestProjection)
  ) {
    try {
      const validatedCurrentBundleManifestProjection =
        validateSWEBodelningExportPackageBundleManifestProjection(
          currentBundleManifestProjection,
        );
      const { snapshot_status: currentSnapshotStatus, ...currentBundleManifestFields } =
        validatedCurrentBundleManifestProjection;

      canonicalCurrentBundleManifest =
        validateSWEBodelningExportPackageBundleManifest(
          currentBundleManifestFields,
        );
      currentBundleManifestFingerprint =
        deriveSWEBodelningExportPackageBundleManifestFingerprint(
          canonicalCurrentBundleManifest,
        );
      currentDossierFingerprint = canonicalCurrentBundleManifest.dossier_fingerprint;
      currentBundleManifestIsCurrent = currentSnapshotStatus.snapshot_is_current === true;
    } catch {
      canonicalCurrentBundleManifest = null;
      currentBundleManifestFingerprint = null;
      currentDossierFingerprint = null;
      currentBundleManifestIsCurrent = false;
    }
  }

  const snapshotPackageVersionFound =
    typeof canonicalExportPackageBundleArchiveArtifact.package_version === "string" &&
    canonicalExportPackageBundleArchiveArtifact.package_version.length > 0
      ? canonicalExportPackageBundleArchiveArtifact.package_version
      : null;
  const snapshotIsCurrent =
    canonicalCurrentBundleManifest !== null &&
    currentBundleManifestIsCurrent &&
    typeof currentDossierFingerprint === "string" &&
    currentDossierFingerprint.length > 0 &&
    snapshotPackageVersionFound === exportPackageBundleManifestVersion &&
    canonicalCurrentBundleManifest.package_version === exportPackageBundleManifestVersion &&
    canonicalExportPackageBundleArchiveArtifact.package_version ===
      canonicalCurrentBundleManifest.package_version &&
    canonicalExportPackageBundleArchiveArtifact.bundle_manifest_fingerprint ===
      currentBundleManifestFingerprint;

  return {
    source: snapshotIsCurrent ? "persisted-current" : "persisted-stale",
    snapshot_package_version_found: snapshotPackageVersionFound,
    current_package_version: exportPackageBundleManifestVersion,
    snapshot_is_current: snapshotIsCurrent,
  };
}

function resolveSWEBodelningExportPackageBundleArchiveArtifactProjection(
  exportPackageBundleArchiveArtifactSnapshot,
  currentBundleManifestProjection,
) {
  const canonicalExportPackageBundleArchiveArtifact =
    validateSWEBodelningExportPackageBundleArchiveArtifact(
      exportPackageBundleArchiveArtifactSnapshot,
    );

  return validateSWEBodelningExportPackageBundleArchiveArtifactProjection({
    ...canonicalExportPackageBundleArchiveArtifact,
    snapshot_status:
      deriveSWEBodelningExportPackageBundleArchiveArtifactSnapshotStatus(
        canonicalExportPackageBundleArchiveArtifact,
        currentBundleManifestProjection,
      ),
  });
}

const sweBodelningExportPackageBundleArchiveArtifactAdapter = Object.freeze({
  jurisdiction_profile_key: supportedProfileKey,
  deriveExportPackageBundleArchiveArtifact:
    deriveSWEBodelningExportPackageBundleArchiveArtifact,
  resolveExportPackageBundleArchiveArtifactProjection:
    resolveSWEBodelningExportPackageBundleArchiveArtifactProjection,
});

function deriveCMDExportPackageBundleArchiveArtifact(
  bundleManifestSnapshot,
  artifactSnapshots,
) {
  const canonicalBundleManifest = validateCMDExportPackageBundleManifest(
    bundleManifestSnapshot,
  );
  assertSupportedJurisdictionProfileCapability(
    cmdProfileKey,
    "export_package_bundle_archive_artifact",
  );
  assertPlainObject(
    artifactSnapshots,
    "ERR_EXPORT_PACKAGE_BUNDLE_ARCHIVE_INVALID",
    "artifactSnapshots",
  );

  const artifactsByType = {
    "export-package-json": validateCMDExportPackageJsonArtifact(
      artifactSnapshots.jsonArtifactSnapshot,
    ),
    "export-package-markdown": validateCMDExportPackageMarkdownArtifact(
      artifactSnapshots.markdownArtifactSnapshot,
    ),
    "export-package-pdf": validateCMDExportPackagePdfArtifact(
      artifactSnapshots.pdfArtifactSnapshot,
    ),
    "export-package-docx": validateCMDExportPackageDocxArtifact(
      artifactSnapshots.docxArtifactSnapshot,
    ),
  };

  const manifestBodyUtf8 = toCanonicalJson(canonicalBundleManifest);
  const bundleManifestFingerprint = deriveCMDExportPackageBundleManifestFingerprint(
    canonicalBundleManifest,
  );
  const archiveBody = buildStoredZip([
    { name: "bundle-manifest.json", data: manifestBodyUtf8 },
    ...canonicalBundleManifest.artifacts.map((manifestArtifactEntry) => {
      const artifactSnapshot = artifactsByType[manifestArtifactEntry.artifact_type];

      if (!artifactSnapshot) {
        throw createGovernanceError(
          "ERR_EXPORT_PACKAGE_BUNDLE_ARCHIVE_INVALID",
          "required artifact snapshot is missing for final archive generation",
          {
            artifact_type: manifestArtifactEntry.artifact_type,
          },
        );
      }

      assertCMDBundleArchiveManifestArtifactMatchesSnapshot(
        canonicalBundleManifest,
        manifestArtifactEntry,
        artifactSnapshot,
      );

      return {
        name: manifestArtifactEntry.filename,
        data: toBundleArchiveFileData(artifactSnapshot),
      };
    }),
  ]);

  return validateCMDExportPackageBundleArchiveArtifact({
    artifact_type: "export-package-bundle-archive",
    filename: `${canonicalBundleManifest.package_version}-${bundleManifestFingerprint}.zip`,
    content_type: "application/zip",
    encoding: "base64",
    body_base64: archiveBody.toString("base64"),
    package_version: canonicalBundleManifest.package_version,
    bundle_manifest_fingerprint: bundleManifestFingerprint,
  });
}

function deriveCMDExportPackageBundleArchiveArtifactSnapshotStatus(
  exportPackageBundleArchiveArtifactSnapshot,
  currentBundleManifestProjection,
) {
  const canonicalExportPackageBundleArchiveArtifact =
    validateCMDExportPackageBundleArchiveArtifact(
      exportPackageBundleArchiveArtifactSnapshot,
    );
  assertSupportedJurisdictionProfileCapability(
    cmdProfileKey,
    "export_package_bundle_archive_artifact",
  );

  let canonicalCurrentBundleManifest = null;
  let currentBundleManifestFingerprint = null;
  let currentDossierFingerprint = null;
  let currentBundleManifestIsCurrent = false;

  if (
    currentBundleManifestProjection &&
    typeof currentBundleManifestProjection === "object" &&
    !Array.isArray(currentBundleManifestProjection)
  ) {
    try {
      const validatedCurrentBundleManifestProjection =
        validateCMDExportPackageBundleManifestProjection(
          currentBundleManifestProjection,
        );
      const { snapshot_status: currentSnapshotStatus, ...currentBundleManifestFields } =
        validatedCurrentBundleManifestProjection;

      canonicalCurrentBundleManifest = validateCMDExportPackageBundleManifest(
        currentBundleManifestFields,
      );
      currentBundleManifestFingerprint = deriveCMDExportPackageBundleManifestFingerprint(
        canonicalCurrentBundleManifest,
      );
      currentDossierFingerprint = canonicalCurrentBundleManifest.dossier_fingerprint;
      currentBundleManifestIsCurrent = currentSnapshotStatus.snapshot_is_current === true;
    } catch {
      canonicalCurrentBundleManifest = null;
      currentBundleManifestFingerprint = null;
      currentDossierFingerprint = null;
      currentBundleManifestIsCurrent = false;
    }
  }

  const snapshotPackageVersionFound =
    typeof canonicalExportPackageBundleArchiveArtifact.package_version === "string" &&
    canonicalExportPackageBundleArchiveArtifact.package_version.length > 0
      ? canonicalExportPackageBundleArchiveArtifact.package_version
      : null;
  const snapshotIsCurrent =
    canonicalCurrentBundleManifest !== null &&
    currentBundleManifestIsCurrent &&
    typeof currentDossierFingerprint === "string" &&
    currentDossierFingerprint.length > 0 &&
    snapshotPackageVersionFound === cmdExportPackageBundleManifestVersion &&
    canonicalCurrentBundleManifest.package_version ===
      cmdExportPackageBundleManifestVersion &&
    canonicalExportPackageBundleArchiveArtifact.package_version ===
      canonicalCurrentBundleManifest.package_version &&
    canonicalExportPackageBundleArchiveArtifact.bundle_manifest_fingerprint ===
      currentBundleManifestFingerprint;

  return {
    source: snapshotIsCurrent ? "persisted-current" : "persisted-stale",
    snapshot_package_version_found: snapshotPackageVersionFound,
    current_package_version: cmdExportPackageBundleManifestVersion,
    snapshot_is_current: snapshotIsCurrent,
  };
}

function resolveCMDExportPackageBundleArchiveArtifactProjection(
  exportPackageBundleArchiveArtifactSnapshot,
  currentBundleManifestProjection,
) {
  const canonicalExportPackageBundleArchiveArtifact =
    validateCMDExportPackageBundleArchiveArtifact(
      exportPackageBundleArchiveArtifactSnapshot,
    );
  assertSupportedJurisdictionProfileCapability(
    cmdProfileKey,
    "export_package_bundle_archive_artifact",
  );

  return validateCMDExportPackageBundleArchiveArtifactProjection({
    ...canonicalExportPackageBundleArchiveArtifact,
    snapshot_status: deriveCMDExportPackageBundleArchiveArtifactSnapshotStatus(
      canonicalExportPackageBundleArchiveArtifact,
      currentBundleManifestProjection,
    ),
  });
}

const cmdExportPackageBundleArchiveArtifactAdapter = Object.freeze({
  jurisdiction_profile_key: cmdProfileKey,
  deriveExportPackageBundleArchiveArtifact:
    deriveCMDExportPackageBundleArchiveArtifact,
  resolveExportPackageBundleArchiveArtifactProjection:
    resolveCMDExportPackageBundleArchiveArtifactProjection,
});

const exportPackageBundleArchiveArtifactAdapterRegistry = Object.freeze({
  [supportedProfileKey]: sweBodelningExportPackageBundleArchiveArtifactAdapter,
  [cmdProfileKey]: cmdExportPackageBundleArchiveArtifactAdapter,
});

function getExportPackageBundleArchiveArtifactAdapter(jurisdictionProfileKey) {
  if (
    typeof jurisdictionProfileKey !== "string" ||
    jurisdictionProfileKey.length === 0
  ) {
    return null;
  }

  return (
    exportPackageBundleArchiveArtifactAdapterRegistry[jurisdictionProfileKey] ?? null
  );
}

function deriveExportPackageBundleArchiveArtifact(
  bundleManifestSnapshot,
  artifactSnapshots,
) {
  if (
    bundleManifestSnapshot &&
    typeof bundleManifestSnapshot === "object" &&
    !Array.isArray(bundleManifestSnapshot) &&
    typeof bundleManifestSnapshot.jurisdiction_profile_key === "string" &&
    bundleManifestSnapshot.jurisdiction_profile_key.length > 0
  ) {
    const adapter = getExportPackageBundleArchiveArtifactAdapter(
      bundleManifestSnapshot.jurisdiction_profile_key,
    );

    if (!adapter) {
      assertSupportedJurisdictionProfileCapability(
        bundleManifestSnapshot.jurisdiction_profile_key,
        "export_package_bundle_archive_artifact",
      );
    }

    return adapter.deriveExportPackageBundleArchiveArtifact(
      bundleManifestSnapshot,
      artifactSnapshots,
    );
  }

  const defaultAdapter = Object.values(exportPackageBundleArchiveArtifactAdapterRegistry)[0];
  return defaultAdapter.deriveExportPackageBundleArchiveArtifact(
    bundleManifestSnapshot,
    artifactSnapshots,
  );
}

function resolveExportPackageBundleArchiveArtifactAdapter(
  exportPackageBundleArchiveArtifactSnapshot,
  currentBundleManifestProjection,
) {
  if (
    currentBundleManifestProjection &&
    typeof currentBundleManifestProjection === "object" &&
    !Array.isArray(currentBundleManifestProjection) &&
    typeof currentBundleManifestProjection.jurisdiction_profile_key === "string" &&
    currentBundleManifestProjection.jurisdiction_profile_key.length > 0
  ) {
    const currentBundleManifestAdapter = getExportPackageBundleArchiveArtifactAdapter(
      currentBundleManifestProjection.jurisdiction_profile_key,
    );

    if (currentBundleManifestAdapter) {
      return currentBundleManifestAdapter;
    }
  }

  return null;
}

function resolveExportPackageBundleArchiveArtifactProjection(
  exportPackageBundleArchiveArtifactSnapshot,
  currentBundleManifestProjection,
) {
  const adapter = resolveExportPackageBundleArchiveArtifactAdapter(
    exportPackageBundleArchiveArtifactSnapshot,
    currentBundleManifestProjection,
  );

  if (adapter) {
    return adapter.resolveExportPackageBundleArchiveArtifactProjection(
      exportPackageBundleArchiveArtifactSnapshot,
      currentBundleManifestProjection,
    );
  }

  const currentJurisdictionProfileKey =
    currentBundleManifestProjection &&
    typeof currentBundleManifestProjection === "object" &&
    !Array.isArray(currentBundleManifestProjection) &&
    typeof currentBundleManifestProjection.jurisdiction_profile_key === "string" &&
    currentBundleManifestProjection.jurisdiction_profile_key.length > 0
      ? currentBundleManifestProjection.jurisdiction_profile_key
      : null;

  if (currentJurisdictionProfileKey) {
    assertSupportedJurisdictionProfileCapability(
      currentJurisdictionProfileKey,
      "export_package_bundle_archive_artifact",
    );
  }

  const defaultAdapter = Object.values(exportPackageBundleArchiveArtifactAdapterRegistry)[0];
  return defaultAdapter.resolveExportPackageBundleArchiveArtifactProjection(
    exportPackageBundleArchiveArtifactSnapshot,
    currentBundleManifestProjection,
  );
}

function deriveSWEBodelningExportPackageFromJsonArtifact(
  exportPackageJsonArtifactSnapshot,
) {
  const canonicalExportPackageJsonArtifact =
    validateSWEBodelningExportPackageJsonArtifact(exportPackageJsonArtifactSnapshot);

  return validateSWEBodelningExportPackage(
    JSON.parse(canonicalExportPackageJsonArtifact.body_utf8),
  );
}

function resolveExportPackageJsonArtifactAdapter(
  exportPackageJsonArtifactSnapshot,
  currentExportPackageSnapshot,
) {
  if (
    currentExportPackageSnapshot &&
    typeof currentExportPackageSnapshot === "object" &&
    !Array.isArray(currentExportPackageSnapshot) &&
    typeof currentExportPackageSnapshot.jurisdiction_profile_key === "string" &&
    currentExportPackageSnapshot.jurisdiction_profile_key.length > 0
  ) {
    const currentExportPackageAdapter = getExportPackageJsonArtifactAdapter(
      currentExportPackageSnapshot.jurisdiction_profile_key,
    );

    if (currentExportPackageAdapter) {
      return currentExportPackageAdapter;
    }
  }

  for (const adapter of Object.values(exportPackageJsonArtifactAdapterRegistry)) {
    try {
      const exportPackageFromArtifact =
        adapter.deriveExportPackageFromJsonArtifact(exportPackageJsonArtifactSnapshot);

      if (exportPackageFromArtifact.jurisdiction_profile_key === adapter.jurisdiction_profile_key) {
        return adapter;
      }
    } catch {
      // Try the next registered adapter.
    }
  }

  return null;
}

function deriveExportPackageFromJsonArtifact(exportPackageJsonArtifactSnapshot) {
  const adapter = resolveExportPackageJsonArtifactAdapter(
    exportPackageJsonArtifactSnapshot,
    null,
  );

  if (adapter) {
    return adapter.deriveExportPackageFromJsonArtifact(
      exportPackageJsonArtifactSnapshot,
    );
  }

  const defaultAdapter = Object.values(exportPackageJsonArtifactAdapterRegistry)[0];
  return defaultAdapter.deriveExportPackageFromJsonArtifact(
    exportPackageJsonArtifactSnapshot,
  );
}

function deriveSWEBodelningExportPackageFromMarkdownArtifact(
  exportPackageMarkdownArtifactSnapshot,
) {
  const canonicalExportPackageMarkdownArtifact =
    validateSWEBodelningExportPackageMarkdownArtifact(
      exportPackageMarkdownArtifactSnapshot,
    );

  return reconstructSWEBodelningExportPackageFromMarkdownArtifactBody(
    canonicalExportPackageMarkdownArtifact.body_utf8,
  );
}

function resolveExportPackageMarkdownArtifactAdapter(
  exportPackageMarkdownArtifactSnapshot,
  currentExportPackageSnapshot,
) {
  if (
    currentExportPackageSnapshot &&
    typeof currentExportPackageSnapshot === "object" &&
    !Array.isArray(currentExportPackageSnapshot) &&
    typeof currentExportPackageSnapshot.jurisdiction_profile_key === "string" &&
    currentExportPackageSnapshot.jurisdiction_profile_key.length > 0
  ) {
    const currentExportPackageAdapter = getExportPackageMarkdownArtifactAdapter(
      currentExportPackageSnapshot.jurisdiction_profile_key,
    );

    if (currentExportPackageAdapter) {
      return currentExportPackageAdapter;
    }
  }

  for (const adapter of Object.values(exportPackageMarkdownArtifactAdapterRegistry)) {
    try {
      const exportPackageFromArtifact =
        adapter.deriveExportPackageFromMarkdownArtifact(
          exportPackageMarkdownArtifactSnapshot,
        );

      if (
        exportPackageFromArtifact.jurisdiction_profile_key ===
        adapter.jurisdiction_profile_key
      ) {
        return adapter;
      }
    } catch {
      // Try the next registered adapter.
    }
  }

  return null;
}

function deriveExportPackageFromMarkdownArtifact(exportPackageMarkdownArtifactSnapshot) {
  const adapter = resolveExportPackageMarkdownArtifactAdapter(
    exportPackageMarkdownArtifactSnapshot,
    null,
  );

  if (adapter) {
    return adapter.deriveExportPackageFromMarkdownArtifact(
      exportPackageMarkdownArtifactSnapshot,
    );
  }

  const defaultAdapter = Object.values(exportPackageMarkdownArtifactAdapterRegistry)[0];
  return defaultAdapter.deriveExportPackageFromMarkdownArtifact(
    exportPackageMarkdownArtifactSnapshot,
  );
}

function deriveSWEBodelningExportPackageJsonArtifactSnapshotStatus(
  exportPackageJsonArtifactSnapshot,
  currentExportPackageSnapshot,
  currentProfileDossierSnapshot,
) {
  const exportPackageFromArtifact = deriveSWEBodelningExportPackageFromJsonArtifact(
    exportPackageJsonArtifactSnapshot,
  );
  let canonicalCurrentExportPackage = null;
  let currentDossierFingerprint = null;

  if (
    currentExportPackageSnapshot &&
    typeof currentExportPackageSnapshot === "object" &&
    !Array.isArray(currentExportPackageSnapshot)
  ) {
    try {
      canonicalCurrentExportPackage = validateSWEBodelningExportPackage(
        currentExportPackageSnapshot,
      );
    } catch {
      canonicalCurrentExportPackage = null;
    }
  }

  if (
    currentProfileDossierSnapshot &&
    typeof currentProfileDossierSnapshot === "object" &&
    !Array.isArray(currentProfileDossierSnapshot)
  ) {
    try {
      currentDossierFingerprint = validateSWEBodelningProfileDossierSnapshot(
        currentProfileDossierSnapshot,
      ).dossier_fingerprint;
    } catch {
      currentDossierFingerprint = null;
    }
  }

  const snapshotExportVersionFound =
    typeof exportPackageFromArtifact.export_version === "string" &&
    exportPackageFromArtifact.export_version.length > 0
      ? exportPackageFromArtifact.export_version
      : null;
  const snapshotIsCurrent =
    canonicalCurrentExportPackage !== null &&
    snapshotExportVersionFound === exportPackageVersion &&
    exportPackageFromArtifact.export_version === canonicalCurrentExportPackage.export_version &&
    exportPackageFromArtifact.dossier_fingerprint ===
      canonicalCurrentExportPackage.dossier_fingerprint &&
    exportPackageFromArtifact.dossier_fingerprint === currentDossierFingerprint;

  return {
    source: snapshotIsCurrent ? "persisted-current" : "persisted-stale",
    snapshot_export_version_found: snapshotExportVersionFound,
    current_export_version: exportPackageVersion,
    snapshot_is_current: snapshotIsCurrent,
  };
}

function deriveSWEBodelningExportPackagePdfArtifactSnapshotStatus(
  exportPackagePdfArtifactSnapshot,
  currentExportPackageSnapshot,
  currentProfileDossierSnapshot,
) {
  const exportPackageFromArtifact = deriveSWEBodelningExportPackageFromPdfArtifact(
    exportPackagePdfArtifactSnapshot,
  );
  let canonicalCurrentExportPackage = null;
  let currentDossierFingerprint = null;

  if (
    currentExportPackageSnapshot &&
    typeof currentExportPackageSnapshot === "object" &&
    !Array.isArray(currentExportPackageSnapshot)
  ) {
    try {
      canonicalCurrentExportPackage = validateSWEBodelningExportPackage(
        currentExportPackageSnapshot,
      );
    } catch {
      canonicalCurrentExportPackage = null;
    }
  }

  if (
    currentProfileDossierSnapshot &&
    typeof currentProfileDossierSnapshot === "object" &&
    !Array.isArray(currentProfileDossierSnapshot)
  ) {
    try {
      currentDossierFingerprint = validateSWEBodelningProfileDossierSnapshot(
        currentProfileDossierSnapshot,
      ).dossier_fingerprint;
    } catch {
      currentDossierFingerprint = null;
    }
  }

  const snapshotExportVersionFound =
    typeof exportPackageFromArtifact.export_version === "string" &&
    exportPackageFromArtifact.export_version.length > 0
      ? exportPackageFromArtifact.export_version
      : null;
  const snapshotIsCurrent =
    canonicalCurrentExportPackage !== null &&
    snapshotExportVersionFound === exportPackageVersion &&
    exportPackageFromArtifact.export_version === canonicalCurrentExportPackage.export_version &&
    exportPackageFromArtifact.dossier_fingerprint ===
      canonicalCurrentExportPackage.dossier_fingerprint &&
    exportPackageFromArtifact.dossier_fingerprint === currentDossierFingerprint;

  return {
    source: snapshotIsCurrent ? "persisted-current" : "persisted-stale",
    snapshot_export_version_found: snapshotExportVersionFound,
    current_export_version: exportPackageVersion,
    snapshot_is_current: snapshotIsCurrent,
  };
}

function deriveSWEBodelningExportPackageDocxArtifactSnapshotStatus(
  exportPackageDocxArtifactSnapshot,
  currentExportPackageSnapshot,
  currentProfileDossierSnapshot,
) {
  const exportPackageFromArtifact = deriveSWEBodelningExportPackageFromDocxArtifact(
    exportPackageDocxArtifactSnapshot,
  );
  let canonicalCurrentExportPackage = null;
  let currentDossierFingerprint = null;

  if (
    currentExportPackageSnapshot &&
    typeof currentExportPackageSnapshot === "object" &&
    !Array.isArray(currentExportPackageSnapshot)
  ) {
    try {
      canonicalCurrentExportPackage = validateSWEBodelningExportPackage(
        currentExportPackageSnapshot,
      );
    } catch {
      canonicalCurrentExportPackage = null;
    }
  }

  if (
    currentProfileDossierSnapshot &&
    typeof currentProfileDossierSnapshot === "object" &&
    !Array.isArray(currentProfileDossierSnapshot)
  ) {
    try {
      currentDossierFingerprint = validateSWEBodelningProfileDossierSnapshot(
        currentProfileDossierSnapshot,
      ).dossier_fingerprint;
    } catch {
      currentDossierFingerprint = null;
    }
  }

  const snapshotExportVersionFound =
    typeof exportPackageFromArtifact.export_version === "string" &&
    exportPackageFromArtifact.export_version.length > 0
      ? exportPackageFromArtifact.export_version
      : null;
  const snapshotIsCurrent =
    canonicalCurrentExportPackage !== null &&
    snapshotExportVersionFound === exportPackageVersion &&
    exportPackageFromArtifact.export_version === canonicalCurrentExportPackage.export_version &&
    exportPackageFromArtifact.dossier_fingerprint ===
      canonicalCurrentExportPackage.dossier_fingerprint &&
    exportPackageFromArtifact.dossier_fingerprint === currentDossierFingerprint;

  return {
    source: snapshotIsCurrent ? "persisted-current" : "persisted-stale",
    snapshot_export_version_found: snapshotExportVersionFound,
    current_export_version: exportPackageVersion,
    snapshot_is_current: snapshotIsCurrent,
  };
}

function resolveSWEBodelningExportPackageDocxArtifactProjection(
  exportPackageDocxArtifactSnapshot,
  currentExportPackageSnapshot,
  currentProfileDossierSnapshot,
) {
  const canonicalExportPackageDocxArtifact =
    validateSWEBodelningExportPackageDocxArtifact(exportPackageDocxArtifactSnapshot);

  return validateSWEBodelningExportPackageDocxArtifactProjection({
    ...canonicalExportPackageDocxArtifact,
    snapshot_status: deriveSWEBodelningExportPackageDocxArtifactSnapshotStatus(
      canonicalExportPackageDocxArtifact,
      currentExportPackageSnapshot,
      currentProfileDossierSnapshot,
    ),
  });
}

function resolveExportPackageDocxArtifactProjection(
  exportPackageDocxArtifactSnapshot,
  currentExportPackageSnapshot,
  currentProfileDossierSnapshot,
) {
  const adapter = resolveExportPackageDocxArtifactAdapter(
    exportPackageDocxArtifactSnapshot,
    currentExportPackageSnapshot,
  );

  if (adapter) {
    return adapter.resolveExportPackageDocxArtifactProjection(
      exportPackageDocxArtifactSnapshot,
      currentExportPackageSnapshot,
      currentProfileDossierSnapshot,
    );
  }

  if (
    currentExportPackageSnapshot &&
    typeof currentExportPackageSnapshot === "object" &&
    !Array.isArray(currentExportPackageSnapshot) &&
    typeof currentExportPackageSnapshot.jurisdiction_profile_key === "string" &&
    currentExportPackageSnapshot.jurisdiction_profile_key.length > 0
  ) {
    assertSupportedJurisdictionProfileCapability(
      currentExportPackageSnapshot.jurisdiction_profile_key,
      "export_package_docx_artifact",
    );
  }

  const defaultAdapter = Object.values(exportPackageDocxArtifactAdapterRegistry)[0];
  return defaultAdapter.resolveExportPackageDocxArtifactProjection(
    exportPackageDocxArtifactSnapshot,
    currentExportPackageSnapshot,
    currentProfileDossierSnapshot,
  );
}

function resolveSWEBodelningExportPackagePdfArtifactProjection(
  exportPackagePdfArtifactSnapshot,
  currentExportPackageSnapshot,
  currentProfileDossierSnapshot,
) {
  const canonicalExportPackagePdfArtifact =
    validateSWEBodelningExportPackagePdfArtifact(exportPackagePdfArtifactSnapshot);

  return validateSWEBodelningExportPackagePdfArtifactProjection({
    ...canonicalExportPackagePdfArtifact,
    snapshot_status: deriveSWEBodelningExportPackagePdfArtifactSnapshotStatus(
      canonicalExportPackagePdfArtifact,
      currentExportPackageSnapshot,
      currentProfileDossierSnapshot,
    ),
  });
}

function resolveExportPackagePdfArtifactProjection(
  exportPackagePdfArtifactSnapshot,
  currentExportPackageSnapshot,
  currentProfileDossierSnapshot,
) {
  const adapter = resolveExportPackagePdfArtifactAdapter(
    exportPackagePdfArtifactSnapshot,
    currentExportPackageSnapshot,
  );

  if (adapter) {
    return adapter.resolveExportPackagePdfArtifactProjection(
      exportPackagePdfArtifactSnapshot,
      currentExportPackageSnapshot,
      currentProfileDossierSnapshot,
    );
  }

  if (
    currentExportPackageSnapshot &&
    typeof currentExportPackageSnapshot === "object" &&
    !Array.isArray(currentExportPackageSnapshot) &&
    typeof currentExportPackageSnapshot.jurisdiction_profile_key === "string" &&
    currentExportPackageSnapshot.jurisdiction_profile_key.length > 0
  ) {
    assertSupportedJurisdictionProfileCapability(
      currentExportPackageSnapshot.jurisdiction_profile_key,
      "export_package_pdf_artifact",
    );
  }

  const defaultAdapter = Object.values(exportPackagePdfArtifactAdapterRegistry)[0];
  return defaultAdapter.resolveExportPackagePdfArtifactProjection(
    exportPackagePdfArtifactSnapshot,
    currentExportPackageSnapshot,
    currentProfileDossierSnapshot,
  );
}

function resolveSWEBodelningExportPackageJsonArtifactProjection(
  exportPackageJsonArtifactSnapshot,
  currentExportPackageSnapshot,
  currentProfileDossierSnapshot,
) {
  const canonicalExportPackageJsonArtifact =
    validateSWEBodelningExportPackageJsonArtifact(exportPackageJsonArtifactSnapshot);

  return validateSWEBodelningExportPackageJsonArtifactProjection({
    ...canonicalExportPackageJsonArtifact,
    snapshot_status: deriveSWEBodelningExportPackageJsonArtifactSnapshotStatus(
      canonicalExportPackageJsonArtifact,
      currentExportPackageSnapshot,
      currentProfileDossierSnapshot,
    ),
  });
}

function resolveExportPackageJsonArtifactProjection(
  exportPackageJsonArtifactSnapshot,
  currentExportPackageSnapshot,
  currentProfileDossierSnapshot,
) {
  const adapter = resolveExportPackageJsonArtifactAdapter(
    exportPackageJsonArtifactSnapshot,
    currentExportPackageSnapshot,
  );

  if (adapter) {
    return adapter.resolveExportPackageJsonArtifactProjection(
      exportPackageJsonArtifactSnapshot,
      currentExportPackageSnapshot,
      currentProfileDossierSnapshot,
    );
  }

  if (
    currentExportPackageSnapshot &&
    typeof currentExportPackageSnapshot === "object" &&
    !Array.isArray(currentExportPackageSnapshot) &&
    typeof currentExportPackageSnapshot.jurisdiction_profile_key === "string" &&
    currentExportPackageSnapshot.jurisdiction_profile_key.length > 0
  ) {
    assertSupportedJurisdictionProfileCapability(
      currentExportPackageSnapshot.jurisdiction_profile_key,
      "export_package_json_artifact",
    );
  }

  const defaultAdapter = Object.values(exportPackageJsonArtifactAdapterRegistry)[0];
  return defaultAdapter.resolveExportPackageJsonArtifactProjection(
    exportPackageJsonArtifactSnapshot,
    currentExportPackageSnapshot,
    currentProfileDossierSnapshot,
  );
}

function deriveSWEBodelningExportPackageMarkdownArtifactSnapshotStatus(
  exportPackageMarkdownArtifactSnapshot,
  currentExportPackageSnapshot,
  currentProfileDossierSnapshot,
) {
  const exportPackageFromArtifact = deriveSWEBodelningExportPackageFromMarkdownArtifact(
    exportPackageMarkdownArtifactSnapshot,
  );
  let canonicalCurrentExportPackage = null;
  let currentDossierFingerprint = null;

  if (
    currentExportPackageSnapshot &&
    typeof currentExportPackageSnapshot === "object" &&
    !Array.isArray(currentExportPackageSnapshot)
  ) {
    try {
      canonicalCurrentExportPackage = validateSWEBodelningExportPackage(
        currentExportPackageSnapshot,
      );
    } catch {
      canonicalCurrentExportPackage = null;
    }
  }

  if (
    currentProfileDossierSnapshot &&
    typeof currentProfileDossierSnapshot === "object" &&
    !Array.isArray(currentProfileDossierSnapshot)
  ) {
    try {
      currentDossierFingerprint = validateSWEBodelningProfileDossierSnapshot(
        currentProfileDossierSnapshot,
      ).dossier_fingerprint;
    } catch {
      currentDossierFingerprint = null;
    }
  }

  const snapshotExportVersionFound =
    typeof exportPackageFromArtifact.export_version === "string" &&
    exportPackageFromArtifact.export_version.length > 0
      ? exportPackageFromArtifact.export_version
      : null;
  const snapshotIsCurrent =
    canonicalCurrentExportPackage !== null &&
    snapshotExportVersionFound === exportPackageVersion &&
    exportPackageFromArtifact.export_version === canonicalCurrentExportPackage.export_version &&
    exportPackageFromArtifact.dossier_fingerprint ===
      canonicalCurrentExportPackage.dossier_fingerprint &&
    exportPackageFromArtifact.dossier_fingerprint === currentDossierFingerprint;

  return {
    source: snapshotIsCurrent ? "persisted-current" : "persisted-stale",
    snapshot_export_version_found: snapshotExportVersionFound,
    current_export_version: exportPackageVersion,
    snapshot_is_current: snapshotIsCurrent,
  };
}

function resolveSWEBodelningExportPackageMarkdownArtifactProjection(
  exportPackageMarkdownArtifactSnapshot,
  currentExportPackageSnapshot,
  currentProfileDossierSnapshot,
) {
  const canonicalExportPackageMarkdownArtifact =
    validateSWEBodelningExportPackageMarkdownArtifact(
      exportPackageMarkdownArtifactSnapshot,
    );

  return validateSWEBodelningExportPackageMarkdownArtifactProjection({
    ...canonicalExportPackageMarkdownArtifact,
    snapshot_status: deriveSWEBodelningExportPackageMarkdownArtifactSnapshotStatus(
      canonicalExportPackageMarkdownArtifact,
      currentExportPackageSnapshot,
      currentProfileDossierSnapshot,
    ),
  });
}

function resolveExportPackageMarkdownArtifactProjection(
  exportPackageMarkdownArtifactSnapshot,
  currentExportPackageSnapshot,
  currentProfileDossierSnapshot,
) {
  const adapter = resolveExportPackageMarkdownArtifactAdapter(
    exportPackageMarkdownArtifactSnapshot,
    currentExportPackageSnapshot,
  );

  if (adapter) {
    return adapter.resolveExportPackageMarkdownArtifactProjection(
      exportPackageMarkdownArtifactSnapshot,
      currentExportPackageSnapshot,
      currentProfileDossierSnapshot,
    );
  }

  if (
    currentExportPackageSnapshot &&
    typeof currentExportPackageSnapshot === "object" &&
    !Array.isArray(currentExportPackageSnapshot) &&
    typeof currentExportPackageSnapshot.jurisdiction_profile_key === "string" &&
    currentExportPackageSnapshot.jurisdiction_profile_key.length > 0
  ) {
    assertSupportedJurisdictionProfileCapability(
      currentExportPackageSnapshot.jurisdiction_profile_key,
      "export_package_markdown_artifact",
    );
  }

  const defaultAdapter = Object.values(exportPackageMarkdownArtifactAdapterRegistry)[0];
  return defaultAdapter.resolveExportPackageMarkdownArtifactProjection(
    exportPackageMarkdownArtifactSnapshot,
    currentExportPackageSnapshot,
    currentProfileDossierSnapshot,
  );
}

function deriveSWEBodelningExportPackageBundleManifestSnapshotStatus(
  exportPackageBundleManifestSnapshot,
  currentExportPackageSnapshot,
  currentArtifactSnapshots,
) {
  const canonicalExportPackageBundleManifest =
    validateSWEBodelningExportPackageBundleManifest(
      exportPackageBundleManifestSnapshot,
    );
  let canonicalCurrentExportPackage = null;
  let currentArtifactEntries = null;

  if (
    currentExportPackageSnapshot &&
    typeof currentExportPackageSnapshot === "object" &&
    !Array.isArray(currentExportPackageSnapshot)
  ) {
    try {
      canonicalCurrentExportPackage = validateSWEBodelningExportPackage(
        currentExportPackageSnapshot,
      );
    } catch {
      canonicalCurrentExportPackage = null;
    }
  }

  if (
    currentArtifactSnapshots &&
    typeof currentArtifactSnapshots === "object" &&
    !Array.isArray(currentArtifactSnapshots) &&
    canonicalCurrentExportPackage !== null
  ) {
    try {
      const canonicalJsonArtifact = validateSWEBodelningExportPackageJsonArtifact(
        currentArtifactSnapshots.jsonArtifactSnapshot,
      );
      const canonicalMarkdownArtifact =
        validateSWEBodelningExportPackageMarkdownArtifact(
          currentArtifactSnapshots.markdownArtifactSnapshot,
        );
      const canonicalPdfArtifact = validateSWEBodelningExportPackagePdfArtifact(
        currentArtifactSnapshots.pdfArtifactSnapshot,
      );
      const canonicalDocxArtifact = validateSWEBodelningExportPackageDocxArtifact(
        currentArtifactSnapshots.docxArtifactSnapshot,
      );

      assertSWEBodelningBundleManifestArtifactMatchesExportPackage(
        canonicalCurrentExportPackage,
        canonicalJsonArtifact,
        deriveSWEBodelningExportPackageFromJsonArtifact(canonicalJsonArtifact),
      );
      assertSWEBodelningBundleManifestArtifactMatchesExportPackage(
        canonicalCurrentExportPackage,
        canonicalMarkdownArtifact,
        deriveSWEBodelningExportPackageFromMarkdownArtifact(canonicalMarkdownArtifact),
      );
      assertSWEBodelningBundleManifestArtifactMatchesExportPackage(
        canonicalCurrentExportPackage,
        canonicalPdfArtifact,
        deriveSWEBodelningExportPackageFromPdfArtifact(canonicalPdfArtifact),
      );
      assertSWEBodelningBundleManifestArtifactMatchesExportPackage(
        canonicalCurrentExportPackage,
        canonicalDocxArtifact,
        deriveSWEBodelningExportPackageFromDocxArtifact(canonicalDocxArtifact),
      );

      currentArtifactEntries = [
        toSWEBodelningExportPackageBundleManifestArtifactEntry(canonicalJsonArtifact),
        toSWEBodelningExportPackageBundleManifestArtifactEntry(canonicalMarkdownArtifact),
        toSWEBodelningExportPackageBundleManifestArtifactEntry(canonicalPdfArtifact),
        toSWEBodelningExportPackageBundleManifestArtifactEntry(canonicalDocxArtifact),
      ];
    } catch {
      currentArtifactEntries = null;
    }
  }

  const snapshotPackageVersionFound =
    typeof canonicalExportPackageBundleManifest.package_version === "string" &&
    canonicalExportPackageBundleManifest.package_version.length > 0
      ? canonicalExportPackageBundleManifest.package_version
      : null;
  const snapshotIsCurrent =
    canonicalCurrentExportPackage !== null &&
    currentArtifactEntries !== null &&
    snapshotPackageVersionFound === exportPackageBundleManifestVersion &&
    canonicalExportPackageBundleManifest.export_version ===
      canonicalCurrentExportPackage.export_version &&
    canonicalExportPackageBundleManifest.dossier_fingerprint ===
      canonicalCurrentExportPackage.dossier_fingerprint &&
    toCanonicalJson(canonicalExportPackageBundleManifest.canonical_source) ===
      toCanonicalJson(canonicalCurrentExportPackage.canonical_source) &&
    toCanonicalJson(canonicalExportPackageBundleManifest.artifacts) ===
      toCanonicalJson(currentArtifactEntries);

  return {
    source: snapshotIsCurrent ? "persisted-current" : "persisted-stale",
    snapshot_package_version_found: snapshotPackageVersionFound,
    current_package_version: exportPackageBundleManifestVersion,
    snapshot_is_current: snapshotIsCurrent,
  };
}

function resolveSWEBodelningExportPackageBundleManifestProjection(
  exportPackageBundleManifestSnapshot,
  currentExportPackageSnapshot,
  currentArtifactSnapshots,
) {
  const canonicalExportPackageBundleManifest =
    validateSWEBodelningExportPackageBundleManifest(
      exportPackageBundleManifestSnapshot,
    );

  return validateSWEBodelningExportPackageBundleManifestProjection({
    ...canonicalExportPackageBundleManifest,
    snapshot_status: deriveSWEBodelningExportPackageBundleManifestSnapshotStatus(
      canonicalExportPackageBundleManifest,
      currentExportPackageSnapshot,
      currentArtifactSnapshots,
    ),
  });
}

function deriveCMDExportPackageBundleManifestSnapshotStatus(
  exportPackageBundleManifestSnapshot,
  currentExportPackageSnapshot,
  currentArtifactSnapshots,
) {
  const canonicalExportPackageBundleManifest = validateCMDExportPackageBundleManifest(
    exportPackageBundleManifestSnapshot,
  );
  let canonicalCurrentExportPackage = null;
  let currentArtifactEntries = null;

  if (
    currentExportPackageSnapshot &&
    typeof currentExportPackageSnapshot === "object" &&
    !Array.isArray(currentExportPackageSnapshot)
  ) {
    try {
      canonicalCurrentExportPackage = validateCMDExportPackage(
        currentExportPackageSnapshot,
      );
    } catch {
      canonicalCurrentExportPackage = null;
    }
  }

  if (
    currentArtifactSnapshots &&
    typeof currentArtifactSnapshots === "object" &&
    !Array.isArray(currentArtifactSnapshots) &&
    canonicalCurrentExportPackage !== null
  ) {
    try {
      const canonicalJsonArtifact = validateCMDExportPackageJsonArtifact(
        currentArtifactSnapshots.jsonArtifactSnapshot,
      );
      const canonicalMarkdownArtifact = validateCMDExportPackageMarkdownArtifact(
        currentArtifactSnapshots.markdownArtifactSnapshot,
      );
      const canonicalPdfArtifact = validateCMDExportPackagePdfArtifact(
        currentArtifactSnapshots.pdfArtifactSnapshot,
      );
      const canonicalDocxArtifact = validateCMDExportPackageDocxArtifact(
        currentArtifactSnapshots.docxArtifactSnapshot,
      );

      assertCMDExportPackageBundleManifestArtifactMatchesExportPackage(
        canonicalCurrentExportPackage,
        canonicalJsonArtifact,
        deriveCMDExportPackageFromJsonArtifact(canonicalJsonArtifact),
      );
      assertCMDExportPackageBundleManifestArtifactMatchesExportPackage(
        canonicalCurrentExportPackage,
        canonicalMarkdownArtifact,
        deriveCMDExportPackageFromMarkdownArtifact(canonicalMarkdownArtifact),
      );
      assertCMDExportPackageBundleManifestArtifactMatchesExportPackage(
        canonicalCurrentExportPackage,
        canonicalPdfArtifact,
        deriveCMDExportPackageFromPdfArtifact(canonicalPdfArtifact),
      );
      assertCMDExportPackageBundleManifestArtifactMatchesExportPackage(
        canonicalCurrentExportPackage,
        canonicalDocxArtifact,
        deriveCMDExportPackageFromDocxArtifact(canonicalDocxArtifact),
      );

      currentArtifactEntries = [
        toCMDExportPackageBundleManifestArtifactEntry(canonicalJsonArtifact),
        toCMDExportPackageBundleManifestArtifactEntry(canonicalMarkdownArtifact),
        toCMDExportPackageBundleManifestArtifactEntry(canonicalPdfArtifact),
        toCMDExportPackageBundleManifestArtifactEntry(canonicalDocxArtifact),
      ];
    } catch {
      currentArtifactEntries = null;
    }
  }

  const snapshotIsCurrent =
    canonicalCurrentExportPackage !== null &&
    currentArtifactEntries !== null &&
    canonicalExportPackageBundleManifest.package_version ===
      cmdExportPackageBundleManifestVersion &&
    canonicalExportPackageBundleManifest.export_version ===
      canonicalCurrentExportPackage.export_version &&
    canonicalExportPackageBundleManifest.dossier_fingerprint ===
      canonicalCurrentExportPackage.dossier_fingerprint &&
    toCanonicalJson(canonicalExportPackageBundleManifest.canonical_source) ===
      toCanonicalJson(canonicalCurrentExportPackage.canonical_source) &&
    toCanonicalJson(canonicalExportPackageBundleManifest.artifacts) ===
      toCanonicalJson(currentArtifactEntries);

  return {
    source: snapshotIsCurrent ? "persisted-current" : "persisted-stale",
    snapshot_package_version_found: canonicalExportPackageBundleManifest.package_version,
    current_package_version: cmdExportPackageBundleManifestVersion,
    snapshot_is_current: snapshotIsCurrent,
  };
}

function resolveExportPackageBundleManifestAdapter(
  exportPackageBundleManifestSnapshot,
  currentExportPackageSnapshot,
) {
  if (
    exportPackageBundleManifestSnapshot &&
    typeof exportPackageBundleManifestSnapshot === "object" &&
    !Array.isArray(exportPackageBundleManifestSnapshot) &&
    typeof exportPackageBundleManifestSnapshot.jurisdiction_profile_key === "string" &&
    exportPackageBundleManifestSnapshot.jurisdiction_profile_key.length > 0
  ) {
    const manifestAdapter = getExportPackageBundleManifestAdapter(
      exportPackageBundleManifestSnapshot.jurisdiction_profile_key,
    );

    if (manifestAdapter) {
      return manifestAdapter;
    }
  }

  if (
    currentExportPackageSnapshot &&
    typeof currentExportPackageSnapshot === "object" &&
    !Array.isArray(currentExportPackageSnapshot) &&
    typeof currentExportPackageSnapshot.jurisdiction_profile_key === "string" &&
    currentExportPackageSnapshot.jurisdiction_profile_key.length > 0
  ) {
    const currentExportPackageAdapter = getExportPackageBundleManifestAdapter(
      currentExportPackageSnapshot.jurisdiction_profile_key,
    );

    if (currentExportPackageAdapter) {
      return currentExportPackageAdapter;
    }
  }

  return null;
}

function resolveExportPackageBundleManifestProjection(
  exportPackageBundleManifestSnapshot,
  currentExportPackageSnapshot,
  currentArtifactSnapshots,
) {
  const adapter = resolveExportPackageBundleManifestAdapter(
    exportPackageBundleManifestSnapshot,
    currentExportPackageSnapshot,
  );

  if (adapter) {
    return adapter.resolveExportPackageBundleManifestProjection(
      exportPackageBundleManifestSnapshot,
      currentExportPackageSnapshot,
      currentArtifactSnapshots,
    );
  }

  const manifestJurisdictionProfileKey =
    exportPackageBundleManifestSnapshot &&
    typeof exportPackageBundleManifestSnapshot === "object" &&
    !Array.isArray(exportPackageBundleManifestSnapshot) &&
    typeof exportPackageBundleManifestSnapshot.jurisdiction_profile_key === "string" &&
    exportPackageBundleManifestSnapshot.jurisdiction_profile_key.length > 0
      ? exportPackageBundleManifestSnapshot.jurisdiction_profile_key
      : null;
  const currentJurisdictionProfileKey =
    currentExportPackageSnapshot &&
    typeof currentExportPackageSnapshot === "object" &&
    !Array.isArray(currentExportPackageSnapshot) &&
    typeof currentExportPackageSnapshot.jurisdiction_profile_key === "string" &&
    currentExportPackageSnapshot.jurisdiction_profile_key.length > 0
      ? currentExportPackageSnapshot.jurisdiction_profile_key
      : null;
  const jurisdictionProfileKey =
    manifestJurisdictionProfileKey ?? currentJurisdictionProfileKey;

  if (jurisdictionProfileKey) {
    assertSupportedJurisdictionProfileCapability(
      jurisdictionProfileKey,
      "export_package_bundle_manifest",
    );
  }

  const defaultAdapter = Object.values(exportPackageBundleManifestAdapterRegistry)[0];
  return defaultAdapter.resolveExportPackageBundleManifestProjection(
    exportPackageBundleManifestSnapshot,
    currentExportPackageSnapshot,
    currentArtifactSnapshots,
  );
}

function deriveSWEBodelningExportPackageSnapshotStatus(
  exportPackageSnapshot,
  currentProfileDossierSnapshot,
) {
  const canonicalExportPackage = validateSWEBodelningExportPackage(
    exportPackageSnapshot,
  );
  let currentDossierFingerprint = null;

  if (
    currentProfileDossierSnapshot &&
    typeof currentProfileDossierSnapshot === "object" &&
    !Array.isArray(currentProfileDossierSnapshot)
  ) {
    try {
      currentDossierFingerprint = validateSWEBodelningProfileDossierSnapshot(
        currentProfileDossierSnapshot,
      ).dossier_fingerprint;
    } catch {
      currentDossierFingerprint = null;
    }
  }

  const snapshotIsCurrent =
    canonicalExportPackage.export_version === exportPackageVersion &&
    canonicalExportPackage.dossier_fingerprint === currentDossierFingerprint;

  return {
    source: snapshotIsCurrent ? "persisted-current" : "persisted-stale",
    snapshot_export_version_found: canonicalExportPackage.export_version,
    current_export_version: exportPackageVersion,
    snapshot_is_current: snapshotIsCurrent,
  };
}

function resolveSWEBodelningExportPackageProjection(
  exportPackageSnapshot,
  currentProfileDossierSnapshot,
) {
  const canonicalExportPackage = validateSWEBodelningExportPackage(
    exportPackageSnapshot,
  );

  return {
    ...canonicalExportPackage,
    snapshot_status: deriveSWEBodelningExportPackageSnapshotStatus(
      canonicalExportPackage,
      currentProfileDossierSnapshot,
    ),
  };
}

function resolveExportPackageProjection(
  exportPackageSnapshot,
  currentProfileDossierSnapshot,
) {
  assertPlainObject(
    exportPackageSnapshot,
    "ERR_EXPORT_PACKAGE_INVALID",
    "exportPackageSnapshot",
  );

  if (
    typeof exportPackageSnapshot.jurisdiction_profile_key !== "string" ||
    exportPackageSnapshot.jurisdiction_profile_key.length === 0
  ) {
    return resolveSWEBodelningExportPackageProjection(
      exportPackageSnapshot,
      currentProfileDossierSnapshot,
    );
  }

  const adapter = getExportPackageAdapter(
    exportPackageSnapshot.jurisdiction_profile_key,
  );

  if (!adapter) {
    assertSupportedJurisdictionProfileCapability(
      exportPackageSnapshot.jurisdiction_profile_key,
      "export_package",
    );
  }

  return adapter.resolveExportPackageProjection(
    exportPackageSnapshot,
    currentProfileDossierSnapshot,
  );
}

function hasCurrentSWEBodelningProfileDossierSnapshot(releaseEvalRun) {
  const snapshot = releaseEvalRun?.profile_dossier_snapshot;

  return (
    !!snapshot &&
    typeof snapshot === "object" &&
    !Array.isArray(snapshot) &&
    snapshot.projection_version === profileDossierProjectionVersion
  );
}

function hasSchemaValidSWEBodelningProfileDossierSnapshot(releaseEvalRun) {
  const snapshot = releaseEvalRun?.profile_dossier_snapshot;

  if (!snapshot || typeof snapshot !== "object" || Array.isArray(snapshot)) {
    return false;
  }

  try {
    validateSWEBodelningProfileDossierSnapshot(snapshot);
    return true;
  } catch {
    return false;
  }
}

function deriveSWEBodelningProfileDossierSnapshotStatus(releaseEvalRun) {
  const snapshot = releaseEvalRun?.profile_dossier_snapshot;
  const snapshotProjectionVersionFound =
    typeof snapshot?.projection_version === "string" &&
    snapshot.projection_version.length > 0
      ? snapshot.projection_version
      : null;
  const snapshotIsCurrent =
    hasCurrentSWEBodelningProfileDossierSnapshot(releaseEvalRun) &&
    hasSchemaValidSWEBodelningProfileDossierSnapshot(releaseEvalRun);

  return {
    source: snapshotIsCurrent ? "persisted-current" : "fallback-reprojection",
    snapshot_projection_version_found: snapshotProjectionVersionFound,
    current_projection_version: profileDossierProjectionVersion,
    snapshot_is_current: snapshotIsCurrent,
  };
}

function hasSchemaValidCMDProfileDossierSnapshot(releaseEvalRun) {
  if (
    !releaseEvalRun?.profile_dossier_snapshot ||
    typeof releaseEvalRun.profile_dossier_snapshot !== "object" ||
    Array.isArray(releaseEvalRun.profile_dossier_snapshot)
  ) {
    return false;
  }

  try {
    validateCMDReleaseEvalRun(releaseEvalRun);
    return true;
  } catch {
    return false;
  }
}

function deriveCMDProfileDossierSnapshotStatus(releaseEvalRun) {
  const snapshotIsCurrent = hasSchemaValidCMDProfileDossierSnapshot(releaseEvalRun);

  return {
    source: snapshotIsCurrent ? "persisted-current" : "fallback-reprojection",
    snapshot_projection_version_found: snapshotIsCurrent
      ? cmdProfileDossierProjectionVersion
      : null,
    current_projection_version: cmdProfileDossierProjectionVersion,
    snapshot_is_current: snapshotIsCurrent,
  };
}

function deriveSWEBodelningProfileDossierIssueIndex(profileDossierSnapshot) {
  assertPlainObject(
    profileDossierSnapshot,
    "ERR_PROFILE_DOSSIER_SNAPSHOT_INVALID",
    "profileDossierSnapshot",
  );

  const profileInputSummary = cloneSWEBodelningReleaseEvalProfileInputSummary(
    profileDossierSnapshot.profile_input_summary,
  );
  const issueIndex = [];

  if (profileInputSummary.missing_value_lane_keys.length > 0) {
    issueIndex.push({
      issue_code: incompleteReleaseEvalReasonCode,
      blocking: true,
      related_lane_keys: [...profileInputSummary.missing_value_lane_keys].sort(),
    });
  }

  if (profileInputSummary.missing_support_lane_keys.length > 0) {
    issueIndex.push({
      issue_code: supportIncompleteReleaseEvalReasonCode,
      blocking: true,
      related_lane_keys: [...profileInputSummary.missing_support_lane_keys].sort(),
    });
  }

  if (
    profileDossierSnapshot.release_eval_freshness !==
    releaseEvalBaseline.release_eval_freshness
  ) {
    issueIndex.push({
      issue_code: profileDossierSnapshot.release_eval_freshness_reason_code,
      blocking: true,
      related_lane_keys: [],
    });
  }

  return issueIndex.map((entry, index) => ({
    issue_ref: `ISS-${String(index + 1).padStart(3, "0")}`,
    ...entry,
  }));
}

function deriveSWEBodelningIssueRelatedSectionRefs(issueCode, sectionIndex) {
  if (!Array.isArray(sectionIndex)) {
    return [];
  }

  const sectionRefsByKey = new Map(
    sectionIndex
      .filter((entry) => entry && typeof entry === "object")
      .map((entry) => [entry.section_key, entry.section_ref]),
  );
  let relatedSectionKeys = [];

  if (
    issueCode === incompleteReleaseEvalReasonCode ||
    issueCode === supportIncompleteReleaseEvalReasonCode
  ) {
    relatedSectionKeys = ["release_status", "profile_inputs"];
  } else if (
    issueCode === evaluatorVersionMismatchFreshnessReasonCode ||
    issueCode === profileInputContextMismatchFreshnessReasonCode
  ) {
    relatedSectionKeys = ["release_status"];
  }

  return [
    ...new Set(
      relatedSectionKeys
        .map((sectionKey) => sectionRefsByKey.get(sectionKey))
        .filter(
          (sectionRef) => typeof sectionRef === "string" && sectionRef.length > 0,
        ),
    ),
  ];
}

function attachSWEBodelningIssueRelatedSectionRefs(issueIndex, sectionIndex) {
  if (!Array.isArray(issueIndex)) {
    return [];
  }

  return issueIndex.map((entry) => ({
    ...entry,
    related_section_refs: deriveSWEBodelningIssueRelatedSectionRefs(
      entry.issue_code,
      sectionIndex,
    ),
  }));
}

function attachSWEBodelningIssueRelatedExhibitRefs(
  issueIndex,
  profileInputLaneSnapshot,
  evidenceExhibitIndex,
) {
  if (!Array.isArray(issueIndex)) {
    return [];
  }

  return issueIndex.map((entry) => ({
    ...entry,
    related_exhibit_refs: deriveSWEBodelningIssueRelatedExhibitRefs(
      entry,
      profileInputLaneSnapshot,
      evidenceExhibitIndex,
    ),
  }));
}

function attachSWEBodelningIssueRelatedReferenceRefs(
  issueIndex,
  profileInputLaneSnapshot,
  evidenceReferenceIndex,
) {
  if (!Array.isArray(issueIndex)) {
    return [];
  }

  return issueIndex.map((entry) => ({
    ...entry,
    related_reference_refs: deriveSWEBodelningIssueRelatedReferenceRefs(
      entry,
      profileInputLaneSnapshot,
      evidenceReferenceIndex,
    ),
  }));
}

function attachSWEBodelningEvidenceExhibitRelatedIssueRefs(
  evidenceExhibitIndex,
  issueIndex,
) {
  if (!Array.isArray(evidenceExhibitIndex)) {
    return [];
  }

  const relatedIssueRefsByExhibitRef = new Map(
    evidenceExhibitIndex.map((entry) => [entry.exhibit_ref, []]),
  );

  if (Array.isArray(issueIndex)) {
    for (const issueEntry of issueIndex) {
      if (
        typeof issueEntry?.issue_ref !== "string" ||
        !Array.isArray(issueEntry.related_exhibit_refs)
      ) {
        continue;
      }

      for (const exhibitRef of issueEntry.related_exhibit_refs) {
        if (!relatedIssueRefsByExhibitRef.has(exhibitRef)) {
          continue;
        }

        const relatedIssueRefs = relatedIssueRefsByExhibitRef.get(exhibitRef);
        if (!relatedIssueRefs.includes(issueEntry.issue_ref)) {
          relatedIssueRefs.push(issueEntry.issue_ref);
        }
      }
    }
  }

  return evidenceExhibitIndex.map((entry) => ({
    ...entry,
    related_issue_refs: relatedIssueRefsByExhibitRef.get(entry.exhibit_ref) ?? [],
  }));
}

function attachSWEBodelningEvidenceExhibitRelatedSectionRefs(
  evidenceExhibitIndex,
  sectionIndex,
) {
  if (!Array.isArray(evidenceExhibitIndex)) {
    return [];
  }

  const relatedSectionRefsByExhibitRef = new Map(
    evidenceExhibitIndex.map((entry) => [entry.exhibit_ref, []]),
  );

  if (Array.isArray(sectionIndex)) {
    for (const sectionEntry of sectionIndex) {
      if (
        typeof sectionEntry?.section_ref !== "string" ||
        !Array.isArray(sectionEntry.related_exhibit_refs)
      ) {
        continue;
      }

      for (const exhibitRef of sectionEntry.related_exhibit_refs) {
        if (!relatedSectionRefsByExhibitRef.has(exhibitRef)) {
          continue;
        }

        const relatedSectionRefs = relatedSectionRefsByExhibitRef.get(exhibitRef);
        if (!relatedSectionRefs.includes(sectionEntry.section_ref)) {
          relatedSectionRefs.push(sectionEntry.section_ref);
        }
      }
    }
  }

  return evidenceExhibitIndex.map((entry) => ({
    ...entry,
    related_section_refs: relatedSectionRefsByExhibitRef.get(entry.exhibit_ref) ?? [],
  }));
}

function attachSWEBodelningSectionRelatedReferenceRefs(
  sectionIndex,
  evidenceExhibitIndex,
  evidenceReferenceIndex,
) {
  if (!Array.isArray(sectionIndex)) {
    return [];
  }

  const relatedReferenceRefsByExhibitRef = new Map(
    Array.isArray(evidenceExhibitIndex)
      ? evidenceExhibitIndex.map((entry) => [
          entry.exhibit_ref,
          Array.isArray(entry.related_reference_refs)
            ? entry.related_reference_refs
            : [],
        ])
      : [],
  );
  const canonicalReferenceRefs = Array.isArray(evidenceReferenceIndex)
    ? evidenceReferenceIndex
        .filter((entry) => entry && typeof entry === "object")
        .map((entry) => entry.reference_ref)
    : [];

  return sectionIndex.map((entry) => ({
    ...entry,
    related_reference_refs: canonicalReferenceRefs.filter((referenceRef) =>
      Array.isArray(entry.related_exhibit_refs) &&
      entry.related_exhibit_refs.some((exhibitRef) =>
        relatedReferenceRefsByExhibitRef.get(exhibitRef)?.includes(referenceRef),
      ),
    ),
  }));
}

function attachSWEBodelningEvidenceReferenceRelatedSectionRefs(
  evidenceReferenceIndex,
  issueIndex,
  sectionIndex,
) {
  if (!Array.isArray(evidenceReferenceIndex)) {
    return [];
  }

  const relatedSectionRefsByIssueRef = new Map(
    Array.isArray(issueIndex)
      ? issueIndex
          .filter((entry) => entry && typeof entry === "object")
          .map((entry) => [
            entry.issue_ref,
            Array.isArray(entry.related_section_refs) ? entry.related_section_refs : [],
          ])
      : [],
  );
  const canonicalSectionRefs = Array.isArray(sectionIndex)
    ? sectionIndex
        .filter((entry) => entry && typeof entry.section_ref === "string")
        .map((entry) => entry.section_ref)
    : [];

  return evidenceReferenceIndex.map((entry) => ({
    ...entry,
    related_section_refs: canonicalSectionRefs.filter((sectionRef) =>
      Array.isArray(entry.related_issue_refs) &&
      entry.related_issue_refs.some((issueRef) =>
        relatedSectionRefsByIssueRef.get(issueRef)?.includes(sectionRef),
      ),
    ),
  }));
}

function attachSWEBodelningEvidenceReferenceRelatedExhibitRefs(
  evidenceReferenceIndex,
  evidenceExhibitIndex,
) {
  if (!Array.isArray(evidenceReferenceIndex)) {
    return [];
  }

  const relatedExhibitRefsByEvidenceObjectId = new Map(
    evidenceReferenceIndex.map((entry) => [entry.evidence_object_id, []]),
  );

  if (Array.isArray(evidenceExhibitIndex)) {
    for (const exhibitEntry of evidenceExhibitIndex) {
      if (
        typeof exhibitEntry?.exhibit_ref !== "string" ||
        typeof exhibitEntry.evidence_object_id !== "string" ||
        !relatedExhibitRefsByEvidenceObjectId.has(exhibitEntry.evidence_object_id)
      ) {
        continue;
      }

      const relatedExhibitRefs = relatedExhibitRefsByEvidenceObjectId.get(
        exhibitEntry.evidence_object_id,
      );
      if (!relatedExhibitRefs.includes(exhibitEntry.exhibit_ref)) {
        relatedExhibitRefs.push(exhibitEntry.exhibit_ref);
      }
    }
  }

  return evidenceReferenceIndex.map((entry) => ({
    ...entry,
    related_exhibit_refs:
      relatedExhibitRefsByEvidenceObjectId.get(entry.evidence_object_id) ?? [],
  }));
}

function attachSWEBodelningSectionRelatedIssueRefs(sectionIndex, issueIndex) {
  if (!Array.isArray(sectionIndex)) {
    return [];
  }

  const relatedIssueRefsBySectionRef = new Map(
    sectionIndex.map((entry) => [entry.section_ref, []]),
  );

  if (Array.isArray(issueIndex)) {
    for (const issueEntry of issueIndex) {
      if (!Array.isArray(issueEntry.related_section_refs)) {
        continue;
      }

      for (const sectionRef of issueEntry.related_section_refs) {
        if (!relatedIssueRefsBySectionRef.has(sectionRef)) {
          continue;
        }

        const relatedIssueRefs = relatedIssueRefsBySectionRef.get(sectionRef);
        if (!relatedIssueRefs.includes(issueEntry.issue_ref)) {
          relatedIssueRefs.push(issueEntry.issue_ref);
        }
      }
    }
  }

  return sectionIndex.map((entry) => ({
    ...entry,
    related_issue_refs: relatedIssueRefsBySectionRef.get(entry.section_ref) ?? [],
  }));
}

function attachSWEBodelningSectionRelatedLaneKeys(sectionIndex, issueIndex) {
  if (!Array.isArray(sectionIndex)) {
    return [];
  }

  const relatedLaneKeysByIssueRef = new Map(
    Array.isArray(issueIndex)
      ? issueIndex.map((entry) => [
          entry.issue_ref,
          Array.isArray(entry.related_lane_keys) ? entry.related_lane_keys : [],
        ])
      : [],
  );

  return sectionIndex.map((entry) => ({
    ...entry,
    related_lane_keys: laneKeys.filter((laneKey) =>
      Array.isArray(entry.related_issue_refs) &&
      entry.related_issue_refs.some((issueRef) =>
        relatedLaneKeysByIssueRef.get(issueRef)?.includes(laneKey),
      ),
    ),
  }));
}

function attachSWEBodelningSectionRelatedExhibitRefs(
  sectionIndex,
  issueIndex,
  evidenceExhibitIndex,
) {
  if (!Array.isArray(sectionIndex)) {
    return [];
  }

  const relatedExhibitRefsByIssueRef = new Map(
    Array.isArray(issueIndex)
      ? issueIndex.map((entry) => [
          entry.issue_ref,
          Array.isArray(entry.related_exhibit_refs) ? entry.related_exhibit_refs : [],
        ])
      : [],
  );
  const canonicalExhibitRefs = Array.isArray(evidenceExhibitIndex)
    ? evidenceExhibitIndex
        .filter((entry) => entry && typeof entry === "object")
        .map((entry) => entry.exhibit_ref)
    : [];

  return sectionIndex.map((entry) => ({
    ...entry,
    related_exhibit_refs: canonicalExhibitRefs.filter((exhibitRef) =>
      Array.isArray(entry.related_issue_refs) &&
      entry.related_issue_refs.some((issueRef) =>
        relatedExhibitRefsByIssueRef.get(issueRef)?.includes(exhibitRef),
      ),
    ),
  }));
}

function deriveSWEBodelningProfileDossierSectionIndex(profileDossierSnapshot) {
  assertPlainObject(
    profileDossierSnapshot,
    "ERR_PROFILE_DOSSIER_SNAPSHOT_INVALID",
    "profileDossierSnapshot",
  );

  return [
    {
      section_key: "release_status",
      section_order: 1,
      present: true,
    },
    {
      section_key: "profile_inputs",
      section_order: 2,
      present: true,
    },
    {
      section_key: "issues",
      section_order: 3,
      present:
        Array.isArray(profileDossierSnapshot.issue_index) &&
        profileDossierSnapshot.issue_index.length > 0,
    },
  ].map((entry, index) => ({
    section_ref: `SEC-${String(index + 1).padStart(3, "0")}`,
    ...entry,
  }));
}

function resolveSWEBodelningProfileDossierSnapshot(releaseEvalRun, options = {}) {
  assertPlainObject(releaseEvalRun, "ERR_RELEASE_EVAL_RUN_INVALID", "releaseEvalRun");

  assertSupportedJurisdictionProfileCapability(
    releaseEvalRun.jurisdiction_profile_key,
    "profile_dossier",
  );

  if (
    options.force_reproject !== true &&
    hasCurrentSWEBodelningProfileDossierSnapshot(releaseEvalRun) &&
    hasSchemaValidSWEBodelningProfileDossierSnapshot(releaseEvalRun)
  ) {
    return releaseEvalRun.profile_dossier_snapshot;
  }

  return deriveSWEBodelningProfileDossierSnapshot(releaseEvalRun, options);
}

function resolveSWEBodelningProfileDossierProjection(releaseEvalRun, options = {}) {
  const resolvedSnapshot = resolveSWEBodelningProfileDossierSnapshot(
    releaseEvalRun,
    options,
  );

  return {
    ...resolvedSnapshot,
    snapshot_status: deriveSWEBodelningProfileDossierSnapshotStatus(releaseEvalRun),
  };
}

function attachSWEBodelningProfileDossierSnapshot(releaseEvalRun, options = {}) {
  return {
    ...releaseEvalRun,
    profile_dossier_snapshot: resolveSWEBodelningProfileDossierSnapshot(
      releaseEvalRun,
      options,
    ),
  };
}

function deriveSWEBodelningReleaseEvalPolicy(profileInputSummary) {
  assertPlainObject(
    profileInputSummary,
    "ERR_PROFILE_INPUT_INVALID",
    "profile_input_summary",
  );

  if (!Array.isArray(profileInputSummary.missing_value_lane_keys)) {
    throw createGovernanceError(
      "ERR_PROFILE_INPUT_INVALID",
      "profile_input_summary.missing_value_lane_keys must be an array",
      {
        field: "profile_input_summary.missing_value_lane_keys",
      },
    );
  }

  if (profileInputSummary.missing_value_lane_keys.length > 0) {
    return {
      release_gate: releaseEvalBaseline.release_gate,
      release_gate_reason_code: incompleteReleaseEvalReasonCode,
      release_eval_freshness: releaseEvalBaseline.release_eval_freshness,
    };
  }

  if (
    !Array.isArray(profileInputSummary.missing_support_lane_keys)
  ) {
    throw createGovernanceError(
      "ERR_PROFILE_INPUT_INVALID",
      "profile_input_summary.missing_support_lane_keys must be an array",
      {
        field: "profile_input_summary.missing_support_lane_keys",
      },
    );
  }

  if (profileInputSummary.missing_support_lane_keys.length > 0) {
    return {
      release_gate: releaseEvalBaseline.release_gate,
      release_gate_reason_code: supportIncompleteReleaseEvalReasonCode,
      release_eval_freshness: releaseEvalBaseline.release_eval_freshness,
    };
  }

  return { ...releaseEvalBaseline };
}

function deriveCMDReleaseEvalPolicy(profileInputSummary) {
  assertPlainObject(
    profileInputSummary,
    "ERR_PROFILE_INPUT_INVALID",
    "profile_input_summary",
  );

  if (!Array.isArray(profileInputSummary.missing_value_lane_keys)) {
    throw createGovernanceError(
      "ERR_PROFILE_INPUT_INVALID",
      "profile_input_summary.missing_value_lane_keys must be an array",
      {
        field: "profile_input_summary.missing_value_lane_keys",
      },
    );
  }

  if (profileInputSummary.missing_value_lane_keys.length > 0) {
    return {
      release_gate: cmdReleaseEvalBaseline.release_gate,
      release_gate_reason_code: cmdIncompleteReleaseEvalReasonCode,
      release_eval_freshness: cmdReleaseEvalBaseline.release_eval_freshness,
    };
  }

  return {
    release_gate: cmdReleaseEvalBaseline.release_gate,
    release_gate_reason_code: cmdRuntimeNotImplementedReleaseEvalReasonCode,
    release_eval_freshness: cmdReleaseEvalBaseline.release_eval_freshness,
  };
}

function deriveSWEBodelningReleaseEvalFreshness(releaseEvalRun, caseProfileInputs) {
  assertPlainObject(releaseEvalRun, "ERR_RELEASE_EVAL_RUN_INVALID", "releaseEvalRun");

  assertSupportedJurisdictionProfileCapability(
    releaseEvalRun.jurisdiction_profile_key,
    "release_eval",
  );

  if (
    typeof releaseEvalRun.evaluator_version !== "string" ||
    releaseEvalRun.evaluator_version.length === 0
  ) {
    throw createGovernanceError(
      "ERR_RELEASE_EVAL_RUN_INVALID",
      "evaluator_version must be a non-empty string",
      {
        field: "evaluator_version",
      },
    );
  }

  if (releaseEvalRun.evaluator_version === releaseEvalEvaluatorVersion) {
    if (
      caseProfileInputs &&
      !hasMatchingSWEBodelningProfileInputContext(releaseEvalRun, caseProfileInputs)
    ) {
      return {
        release_eval_freshness: "stale",
        release_eval_freshness_reason_code:
          profileInputContextMismatchFreshnessReasonCode,
      };
    }

    return {
      release_eval_freshness: releaseEvalBaseline.release_eval_freshness,
      release_eval_freshness_reason_code: currentEvaluatorVersionFreshnessReasonCode,
    };
  }

  return {
    release_eval_freshness: "stale",
    release_eval_freshness_reason_code: evaluatorVersionMismatchFreshnessReasonCode,
  };
}

function deriveCMDReleaseEvalFreshness(releaseEvalRun, caseProfileInputs) {
  assertPlainObject(releaseEvalRun, "ERR_RELEASE_EVAL_RUN_INVALID", "releaseEvalRun");

  assertSupportedJurisdictionProfileCapability(
    releaseEvalRun.jurisdiction_profile_key,
    "release_eval",
  );

  if (
    typeof releaseEvalRun.evaluator_version !== "string" ||
    releaseEvalRun.evaluator_version.length === 0
  ) {
    throw createGovernanceError(
      "ERR_RELEASE_EVAL_RUN_INVALID",
      "evaluator_version must be a non-empty string",
      {
        field: "evaluator_version",
      },
    );
  }

  if (releaseEvalRun.evaluator_version === cmdReleaseEvalEvaluatorVersion) {
    if (
      caseProfileInputs &&
      !hasMatchingCMDProfileInputContext(releaseEvalRun, caseProfileInputs)
    ) {
      return {
        release_eval_freshness: "stale",
        release_eval_freshness_reason_code:
          profileInputContextMismatchFreshnessReasonCode,
      };
    }

    return {
      release_eval_freshness: cmdReleaseEvalBaseline.release_eval_freshness,
      release_eval_freshness_reason_code: currentEvaluatorVersionFreshnessReasonCode,
    };
  }

  return {
    release_eval_freshness: "stale",
    release_eval_freshness_reason_code: evaluatorVersionMismatchFreshnessReasonCode,
  };
}

function reconcileSWEBodelningReleaseEvalRun(releaseEvalRun, caseProfileInputs) {
  const freshness = deriveSWEBodelningReleaseEvalFreshness(
    releaseEvalRun,
    caseProfileInputs,
  );

  return {
    ...releaseEvalRun,
    release_eval_freshness: freshness.release_eval_freshness,
    release_eval_freshness_reason_code: freshness.release_eval_freshness_reason_code,
  };
}

function deriveSWEBodelningReleaseEvalRun(releaseEvalSeed, caseProfileInputs, options = {}) {
  assertPlainObject(releaseEvalSeed, "ERR_RELEASE_EVAL_RUN_INVALID", "releaseEvalSeed");

  assertSupportedJurisdictionProfileCapability(
    releaseEvalSeed.jurisdiction_profile_key,
    "release_eval",
  );

  const releaseEvalProfileInputSummary =
    deriveSWEBodelningReleaseEvalProfileInputSummary(caseProfileInputs);
  const releaseEvalProfileInputLaneSnapshot =
    deriveSWEBodelningReleaseEvalProfileInputLaneSnapshot(caseProfileInputs);
  const releaseEvalPolicy = deriveSWEBodelningReleaseEvalPolicy(
    releaseEvalProfileInputSummary,
  );

  for (const field of ["release_eval_run_id"]) {
    if (typeof releaseEvalSeed[field] !== "string" || releaseEvalSeed[field].length === 0) {
      throw createGovernanceError(
        "ERR_RELEASE_EVAL_RUN_INVALID",
        `${field} must be a non-empty string`,
        { field },
      );
    }
  }

  return attachSWEBodelningProfileDossierSnapshot(
    reconcileSWEBodelningReleaseEvalRun(
      {
        jurisdiction_profile_key: supportedProfileKey,
        release_eval_run_id: releaseEvalSeed.release_eval_run_id,
        evaluator_version: releaseEvalEvaluatorVersion,
        release_gate: releaseEvalPolicy.release_gate,
        release_gate_reason_code: releaseEvalPolicy.release_gate_reason_code,
        release_eval_freshness: releaseEvalPolicy.release_eval_freshness,
        profile_input_summary: releaseEvalProfileInputSummary,
        profile_input_lane_snapshot: releaseEvalProfileInputLaneSnapshot,
      },
      caseProfileInputs,
    ),
    options,
  );
}

function deriveCMDReleaseEvalRun(releaseEvalSeed, caseProfileInputs) {
  assertPlainObject(releaseEvalSeed, "ERR_RELEASE_EVAL_RUN_INVALID", "releaseEvalSeed");

  assertSupportedJurisdictionProfileCapability(
    releaseEvalSeed.jurisdiction_profile_key,
    "release_eval",
  );

  const releaseEvalProfileInputSummary =
    deriveCMDReleaseEvalProfileInputSummary(caseProfileInputs);
  const releaseEvalProfileInputLaneSnapshot =
    deriveCMDReleaseEvalProfileInputLaneSnapshot(caseProfileInputs);
  const releaseEvalPolicy = deriveCMDReleaseEvalPolicy(releaseEvalProfileInputSummary);

  for (const field of ["release_eval_run_id"]) {
    if (typeof releaseEvalSeed[field] !== "string" || releaseEvalSeed[field].length === 0) {
      throw createGovernanceError(
        "ERR_RELEASE_EVAL_RUN_INVALID",
        `${field} must be a non-empty string`,
        { field },
      );
    }
  }

  return reconcileCMDReleaseEvalRun(
    {
      jurisdiction_profile_key: cmdProfileKey,
      release_eval_run_id: releaseEvalSeed.release_eval_run_id,
      evaluator_version: cmdReleaseEvalEvaluatorVersion,
      release_gate: releaseEvalPolicy.release_gate,
      release_gate_reason_code: releaseEvalPolicy.release_gate_reason_code,
      release_eval_freshness: releaseEvalPolicy.release_eval_freshness,
      profile_input_summary: releaseEvalProfileInputSummary,
      profile_input_lane_snapshot: releaseEvalProfileInputLaneSnapshot,
    },
    caseProfileInputs,
  );
}

function reconcileCMDReleaseEvalRun(releaseEvalRun, caseProfileInputs) {
  const freshness = deriveCMDReleaseEvalFreshness(releaseEvalRun, caseProfileInputs);
  const reconciledReleaseEvalRun = {
    ...releaseEvalRun,
    release_eval_freshness: freshness.release_eval_freshness,
    release_eval_freshness_reason_code: freshness.release_eval_freshness_reason_code,
  };

  validateCMDReleaseEvalRun(reconciledReleaseEvalRun);

  return reconciledReleaseEvalRun;
}

function validateCMDReleaseEvalRunCore(releaseEvalRun) {
  const releaseEvalRunForValidation = { ...releaseEvalRun };
  delete releaseEvalRunForValidation.profile_dossier_snapshot;
  return validateCMDReleaseEvalRun(releaseEvalRunForValidation);
}

function deriveCMDProfileDossierSnapshot(releaseEvalRun) {
  const canonicalReleaseEvalRun = validateCMDReleaseEvalRunCore(releaseEvalRun);

  assertSupportedJurisdictionProfileCapability(cmdProfileKey, "profile_dossier");

  return validateCMDProfileDossierSnapshot({
    jurisdiction_profile_key: canonicalReleaseEvalRun.jurisdiction_profile_key,
    release_gate: canonicalReleaseEvalRun.release_gate,
    release_gate_reason_code: canonicalReleaseEvalRun.release_gate_reason_code,
    release_eval_freshness: canonicalReleaseEvalRun.release_eval_freshness,
    release_eval_freshness_reason_code:
      canonicalReleaseEvalRun.release_eval_freshness_reason_code,
    evaluator_version: canonicalReleaseEvalRun.evaluator_version,
    profile_input_summary: cloneCMDReleaseEvalProfileInputSummary(
      canonicalReleaseEvalRun.profile_input_summary,
    ),
    profile_input_lane_snapshot: cloneCMDReleaseEvalProfileInputLaneSnapshot(
      canonicalReleaseEvalRun.profile_input_lane_snapshot,
    ),
  });
}

function attachCMDProfileDossierSnapshot(releaseEvalRun, options = {}) {
  return {
    ...validateCMDReleaseEvalRunCore(releaseEvalRun),
    profile_dossier_snapshot: resolveCMDProfileDossierSnapshot(
      releaseEvalRun,
      options,
    ),
  };
}

function resolveCMDProfileDossierSnapshot(releaseEvalRun, options = {}) {
  validateCMDReleaseEvalRunCore(releaseEvalRun);
  assertSupportedJurisdictionProfileCapability(cmdProfileKey, "profile_dossier");

  if (
    options.force_reproject !== true &&
    hasSchemaValidCMDProfileDossierSnapshot(releaseEvalRun)
  ) {
    return validateCMDProfileDossierSnapshot(releaseEvalRun.profile_dossier_snapshot);
  }

  return deriveCMDProfileDossierSnapshot(releaseEvalRun);
}

function resolveCMDProfileDossierProjection(releaseEvalRun, options = {}) {
  const resolvedSnapshot = resolveCMDProfileDossierSnapshot(releaseEvalRun, options);

  return validateCMDProfileDossierProjection({
    ...resolvedSnapshot,
    snapshot_status: deriveCMDProfileDossierSnapshotStatus(releaseEvalRun),
  });
}

const sweBodelningReleaseEvalAdapter = Object.freeze({
  jurisdiction_profile_key: supportedProfileKey,
  deriveReleaseEvalRun: deriveSWEBodelningReleaseEvalRun,
  reconcileReleaseEvalRun: reconcileSWEBodelningReleaseEvalRun,
  attachProfileDossierSnapshot: attachSWEBodelningProfileDossierSnapshot,
  resolveProfileDossierSnapshot: resolveSWEBodelningProfileDossierSnapshot,
  resolveProfileDossierProjection: resolveSWEBodelningProfileDossierProjection,
});

const cmdReleaseEvalAdapter = Object.freeze({
  jurisdiction_profile_key: cmdProfileKey,
  deriveReleaseEvalRun: deriveCMDReleaseEvalRun,
  reconcileReleaseEvalRun: reconcileCMDReleaseEvalRun,
  attachProfileDossierSnapshot: attachCMDProfileDossierSnapshot,
  resolveProfileDossierSnapshot: resolveCMDProfileDossierSnapshot,
  resolveProfileDossierProjection: resolveCMDProfileDossierProjection,
});

const releaseEvalAdapterRegistry = Object.freeze({
  [supportedProfileKey]: sweBodelningReleaseEvalAdapter,
  [cmdProfileKey]: cmdReleaseEvalAdapter,
});

function getReleaseEvalAdapter(jurisdictionProfileKey) {
  if (
    typeof jurisdictionProfileKey !== "string" ||
    jurisdictionProfileKey.length === 0
  ) {
    return null;
  }

  return releaseEvalAdapterRegistry[jurisdictionProfileKey] ?? null;
}

function deriveReleaseEvalRun(releaseEvalSeed, caseProfileInputs, options = {}) {
  assertPlainObject(releaseEvalSeed, "ERR_RELEASE_EVAL_RUN_INVALID", "releaseEvalSeed");

  const adapter = getReleaseEvalAdapter(releaseEvalSeed.jurisdiction_profile_key);

  if (!adapter) {
    assertSupportedJurisdictionProfileCapability(
      releaseEvalSeed.jurisdiction_profile_key,
      "release_eval",
    );
  }

  return adapter.deriveReleaseEvalRun(releaseEvalSeed, caseProfileInputs, options);
}

function reconcileReleaseEvalRun(releaseEvalRun, caseProfileInputs) {
  assertPlainObject(releaseEvalRun, "ERR_RELEASE_EVAL_RUN_INVALID", "releaseEvalRun");

  const adapter = getReleaseEvalAdapter(releaseEvalRun.jurisdiction_profile_key);

  if (!adapter) {
    assertSupportedJurisdictionProfileCapability(
      releaseEvalRun.jurisdiction_profile_key,
      "release_eval",
    );
  }

  return adapter.reconcileReleaseEvalRun(releaseEvalRun, caseProfileInputs);
}

function attachReleaseEvalProfileDossierSnapshot(releaseEvalRun, options = {}) {
  assertPlainObject(releaseEvalRun, "ERR_RELEASE_EVAL_RUN_INVALID", "releaseEvalRun");

  const adapter = getReleaseEvalAdapter(releaseEvalRun.jurisdiction_profile_key);

  if (!adapter) {
    assertSupportedJurisdictionProfileCapability(
      releaseEvalRun.jurisdiction_profile_key,
      "profile_dossier",
    );
  }

  return adapter.attachProfileDossierSnapshot(releaseEvalRun, options);
}

function resolveReleaseEvalProfileDossierSnapshot(releaseEvalRun, options = {}) {
  assertPlainObject(releaseEvalRun, "ERR_RELEASE_EVAL_RUN_INVALID", "releaseEvalRun");

  const adapter = getReleaseEvalAdapter(releaseEvalRun.jurisdiction_profile_key);

  if (!adapter) {
    assertSupportedJurisdictionProfileCapability(
      releaseEvalRun.jurisdiction_profile_key,
      "profile_dossier",
    );
  }

  return adapter.resolveProfileDossierSnapshot(releaseEvalRun, options);
}

function resolveReleaseEvalProfileDossierProjection(releaseEvalRun, options = {}) {
  assertPlainObject(releaseEvalRun, "ERR_RELEASE_EVAL_RUN_INVALID", "releaseEvalRun");

  const adapter = getReleaseEvalAdapter(releaseEvalRun.jurisdiction_profile_key);

  if (!adapter) {
    assertSupportedJurisdictionProfileCapability(
      releaseEvalRun.jurisdiction_profile_key,
      "profile_dossier",
    );
  }

  return adapter.resolveProfileDossierProjection(releaseEvalRun, options);
}

module.exports = {
  accessDecisionRegistry,
  actorTypeRegistry,
  adminSupportDeniedActionCategories,
  allowedEventContentCategoryRegistry,
  assertNoTokenUrlSecretRoute,
  attachSWEBodelningProfileDossierSnapshot,
  attachReleaseEvalProfileDossierSnapshot,
  classifyProhibitedEventContent,
  classifyProviderRouteGap,
  dataHandlingBlockerRegistry,
  dataHandlingNonAuthorizationInvariant,
  decideMaterialRoute,
  denyRawMaterialRoute,
  denyThirdPartyModelApiRoute,
  deriveAdminSupportNonBypassDecision,
  deriveLifecycleGapDescriptor,
  deriveNoContentAuditAccessEventDescriptor,
  deriveRbacDenyByDefaultAccessDecision,
  deriveRouteDenialDescriptor,
  deriveExportPackage,
  deriveExportPackageBundleManifest,
  deriveExportPackageFromProfileDossierSnapshot,
  deriveExportPackageFromDocxArtifact,
  deriveExportPackageFromJsonArtifact,
  deriveExportPackageFromMarkdownArtifact,
  deriveExportPackageFromPdfArtifact,
  deriveExportPackageBundleArchiveArtifact,
  deriveExportPackageDocxArtifact,
  deriveExportPackageJsonArtifact,
  deriveExportPackageMarkdownArtifact,
  deriveExportPackagePdfArtifact,
  deriveSWEBodelningExportPackage,
  deriveSWEBodelningExportPackageBundleArchiveArtifact,
  deriveSWEBodelningExportPackageBundleArchiveArtifactSnapshotStatus,
  deriveSWEBodelningExportPackageBundleManifest,
  deriveSWEBodelningExportPackageBundleManifestFingerprint,
  deriveSWEBodelningExportPackageBundleManifestSnapshotStatus,
  deriveSWEBodelningExportPackageDocxArtifact,
  deriveSWEBodelningExportPackageDocxArtifactSnapshotStatus,
  deriveSWEBodelningExportPackageFromDocxArtifact,
  deriveSWEBodelningExportPackageFromPdfArtifact,
  deriveSWEBodelningExportPackageFromJsonArtifact,
  deriveSWEBodelningExportPackageFromMarkdownArtifact,
  deriveSWEBodelningExportPackagePdfArtifact,
  deriveSWEBodelningExportPackageJsonArtifact,
  deriveSWEBodelningExportPackageMarkdownArtifact,
  deriveSWEBodelningExportPackagePdfArtifactSnapshotStatus,
  deriveSWEBodelningExportPackageJsonArtifactSnapshotStatus,
  deriveSWEBodelningExportPackageMarkdownArtifactSnapshotStatus,
  deriveSWEBodelningExportPackageFromProfileDossierSnapshot,
  deriveSWEBodelningExportPackageBundleManifestVersion:
    () => exportPackageBundleManifestVersion,
  deriveCMDExportPackageBundleManifestVersion:
    () => cmdExportPackageBundleManifestVersion,
  deriveCMDExportPackageVersion: () => cmdExportPackageVersion,
  deriveSWEBodelningExportPackageSnapshotStatus,
  deriveSWEBodelningExportPackageVersion: () => exportPackageVersion,
  deriveSWEBodelningProfileDossierCanonicalSource,
  deriveSWEBodelningProfileDossierEvidenceExhibitIndex,
  deriveSWEBodelningProfileDossierEvidenceReferenceIndex,
  deriveSWEBodelningProfileDossierFingerprint,
  deriveSWEBodelningProfileDossierIssueIndex,
  deriveSWEBodelningProfileDossierSectionIndex,
  deriveSWEBodelningProfileDossierProjectionVersion: () =>
    profileDossierProjectionVersion,
  deriveSWEBodelningProfileDossierSnapshot,
  deriveSWEBodelningProfileDossierSnapshotStatus,
  deriveProfileInputLaneSnapshot,
  deriveProfileInputSnapshot,
  deriveProfileInputSummary,
  encryptionKeyManagementBlockerRegistry,
  exportPackageAdapterRegistry,
  exportPackageBundleArchiveArtifactAdapterRegistry,
  exportPackageBundleManifestAdapterRegistry,
  exportPackageDocxArtifactAdapterRegistry,
  exportPackageJsonArtifactAdapterRegistry,
  exportPackageMarkdownArtifactAdapterRegistry,
  exportPackagePdfArtifactAdapterRegistry,
  eventFamilyRegistry,
  evaluateNoOverclaim,
  evaluateRouteCaseCapabilityNonOverclaim,
  getAllowedEventContentCategoryEntry,
  getDataHandlingBlockerEntry,
  getEncryptionKeyManagementBlockerEntry,
  getEventFamilyEntry,
  getExportPackageAdapter,
  getExportPackageBundleArchiveArtifactAdapter,
  getExportPackageBundleManifestAdapter,
  getExportPackageDocxArtifactAdapter,
  getExportPackageJsonArtifactAdapter,
  getExportPackageMarkdownArtifactAdapter,
  getExportPackagePdfArtifactAdapter,
  getGlobalNonAuthorizationInvariant,
  getJurisdictionProfileRegistryEntry,
  getLifecycleGapStatusEntry,
  getLifecycleNonAuthorizationEntry,
  getMaterialClassEntry,
  getMaterialHandlingStatusEntry,
  getNonProofStatusEntry,
  getNetworkCredentialSourceLocatorDenialEntry,
  getProhibitedEventContentCategoryEntry,
  getProfileInputAdapter,
  getProviderLifecycleGapEntry,
  getProviderRouteGapStatusEntry,
  getRawRouteDenialEntry,
  getRetentionDeletionPurgeErasureBlockerEntry,
  getRouteDecisionEntry,
  getThirdPartyRouteDenialEntry,
  hasJurisdictionProfileCapability,
  hasCurrentSWEBodelningProfileDossierSnapshot,
  hasSchemaValidSWEBodelningProfileDossierSnapshot,
  isSupportedJurisdictionProfileKey,
  jurisdictionProfileRegistry,
  lifecycleGapStatusRegistry,
  lifecycleNonAuthorizationRegistry,
  materialClassRegistry,
  materialHandlingStatusRegistry,
  networkCredentialSourceLocatorDenialRegistry,
  noContentAuditAccessImplementationBoundary,
  noContentAuditAccessMarkers,
  noDeletionProof,
  noEncryptionImplementation,
  noProviderDeletionVerification,
  noPurgeProof,
  noRetentionCurrentness,
  nonProofStatusRegistry,
  permissionCategoryRegistry,
  profileInputAdapterRegistry,
  prohibitedEventContentCategoryRegistry,
  providerLifecycleGapRegistry,
  providerRouteGapStatusRegistry,
  rawMaterialRoutingThirdPartyNonAuthorizationInvariant,
  rawRouteDenialRegistry,
  retentionDeletionEncryptionGapReviewInvariant,
  retentionDeletionPurgeErasureBlockerRegistry,
  resourceMaterialScopeRegistry,
  roleCategoryRegistry,
  routeDecisionRegistry,
  routeCaseCapabilityOverclaimRegistry,
  thirdPartyRouteDenialRegistry,
  resolveExportPackageBundleArchiveArtifactProjection,
  resolveSWEBodelningExportPackageBundleArchiveArtifactProjection,
  resolveSWEBodelningExportPackageBundleManifestProjection,
  resolveSWEBodelningProfileDossierProjection,
  resolveSWEBodelningProfileDossierSnapshot,
  deriveCMDReleaseEvalBaseline: () => ({ ...cmdReleaseEvalBaseline }),
  deriveCMDReleaseEvalEvaluatorVersion: () => cmdReleaseEvalEvaluatorVersion,
  deriveCMDReleaseEvalFreshness,
  deriveCMDReleaseEvalPolicy,
  deriveCMDReleaseEvalProfileInputLaneSnapshot,
  deriveCMDReleaseEvalProfileInputSummary,
  deriveCMDReleaseEvalRun,
  deriveSWEBodelningReleaseEvalBaseline: () => ({ ...releaseEvalBaseline }),
  deriveSWEBodelningReleaseEvalEvaluatorVersion: () => releaseEvalEvaluatorVersion,
  deriveSWEBodelningReleaseEvalFreshness,
  deriveSWEBodelningReleaseEvalProfileInputLaneSnapshot,
  deriveSWEBodelningReleaseEvalProfileInputSummary,
  deriveSWEBodelningReleaseEvalPolicy,
  deriveSWEBodelningReleaseEvalRun,
  deriveReleaseEvalRun,
  getReleaseEvalAdapter,
  reconcileSWEBodelningReleaseEvalRun,
  reconcileReleaseEvalRun,
  releaseEvalAdapterRegistry,
  deriveSWEBodelningProfileInputLaneSnapshot,
  deriveSWEBodelningProfileInputSummary,
  deriveSWEBodelningProfileInputSnapshot,
  validateProfileInputSnapshot,
  resolveExportPackageBundleManifestProjection,
  resolveReleaseEvalProfileDossierProjection,
  resolveReleaseEvalProfileDossierSnapshot,
  resolveExportPackageDocxArtifactProjection,
  resolveExportPackageProjection,
  resolveExportPackageJsonArtifactProjection,
  resolveExportPackageMarkdownArtifactProjection,
  resolveExportPackagePdfArtifactProjection,
  resolveSWEBodelningExportPackageDocxArtifactProjection,
  resolveSWEBodelningExportPackagePdfArtifactProjection,
  resolveSWEBodelningExportPackageJsonArtifactProjection,
  resolveSWEBodelningExportPackageMarkdownArtifactProjection,
  resolveSWEBodelningExportPackageProjection,
};

Object.assign(
  module.exports,
  require("./storage-data-location-inventory-registry.js"),
);

Object.assign(
  module.exports,
  require("./retention-deletion-encryption-storage-dependency-registry.js"),
);

Object.assign(
  module.exports,
  require("./audit-access-log-storage-dependency-registry.js"),
);

Object.assign(
  module.exports,
  require("./raw-material-routing-control-specification-registry.js"),
);

Object.assign(
  module.exports,
  require("./third-party-routing-status-gap-registry.js"),
);
Object.assign(
  module.exports,
  require("./admin-support-runtime-readiness-status-gap-registry.js"),
);

Object.assign(
  module.exports,
  require("./global-access-control-threat-model-inventory-status-registry.js"),
);

Object.assign(
  module.exports,
  require("./runtime-gate-candidate-status-inventory-registry.js"),
);

Object.assign(
  module.exports,
  require("./role-permission-model-status-gap-registry.js"),
);

Object.assign(
  module.exports,
  require("./audit-access-log-runtime-readiness-blocker-status-registry.js"),
);

Object.assign(
  module.exports,
  require("./third-party-routing-runtime-readiness-blocker-status-registry.js"),
);

Object.assign(
  module.exports,
  require("./retention-deletion-encryption-runtime-readiness-blocker-status-registry.js"),
);

Object.assign(
  module.exports,
  require("./court-adjacent-high-risk-ai-readiness-gap-matrix-registry.js"),
);

Object.assign(
  module.exports,
  require("./rbac-admin-support-scope-review-registry.js"),
);

Object.assign(
  module.exports,
  require("./admin-support-sub-scope-clarification-selection-registry.js"),
);

Object.assign(
  module.exports,
  require("./rbac-role-permission-admin-support-scope-review-registry.js"),
);

Object.assign(
  module.exports,
  require("./raw-material-routing-implementation-readiness-scope-review-registry.js"),
);

Object.assign(
  module.exports,
  require("./rbac-role-permission-model-scope-review-registry.js"),
);

Object.assign(
  module.exports,
  require("./admin-support-access-model-scope-review-registry.js"),
);

Object.assign(
  module.exports,
  require("./audit-access-log-implementation-readiness-scope-review-registry.js"),
);

Object.assign(
  module.exports,
  require("./retention-deletion-encryption-implementation-readiness-scope-review-registry.js"),
);

Object.assign(
  module.exports,
  require("./rbac-admin-support-authorization-context-contract.js"),
);

Object.assign(
  module.exports,
  require("./authenticated-actor-identity-evidence-contract.js"),
);

Object.assign(
  module.exports,
  require("./rbac-admin-support-authorization-context-deny-only-evaluator.js"),
);

Object.assign(
  module.exports,
  require("./rbac-role-permission-policy-evidence-contract.js"),
);

Object.assign(
  module.exports,
  require("./rbac-actor-role-binding-evidence-contract.js"),
);

Object.assign(
  module.exports,
  require("./rbac-role-permission-binding-evidence-contract.js"),
);

Object.assign(
  module.exports,
  require("./rbac-tenant-case-scope-membership-evidence-contract.js"),
);

Object.assign(
  module.exports,
  require("./rbac-resource-tenant-case-placement-evidence-contract.js"),
);

Object.assign(
  module.exports,
  require("./local-service-permission-current-state-evidence-contract.js"),
);

Object.assign(
  module.exports,
  require("./local-service-permission-writer-transition-evidence-contract.js"),
);

Object.assign(
  module.exports,
  require("./local-service-permission-lifecycle-history-evidence-contract.js"),
);

Object.assign(
  module.exports,
  require("./local-service-permission-repository-currentness-evidence-contract.js"),
);

Object.assign(
  module.exports,
  require("./local-service-permission-trusted-reader-identity-applicability-evidence-contract.js"),
);

Object.assign(
  module.exports,
  require("./local-service-permission-trusted-reader-authentication-evidence-contract.js"),
);

Object.assign(
  module.exports,
  require("./local-service-permission-trusted-reader-authorization-evidence-contract.js"),
);

Object.assign(
  module.exports,
  require("./api-contract-schema-validator.js"),
);
