"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");

const registry = require("../packages/governance/src/court-adjacent-high-risk-ai-readiness-gap-matrix-registry.js");
const indexExports = require("../packages/governance/src/index.js");
const {
  listDataLocations,
  listMaterialClasses,
  HIGH_RISK_MATERIAL_CLASSES_DENIED,
} = require("../packages/governance/src/storage-data-location-inventory-registry.js");
const {
  listRetentionDeletionEncryptionRuntimeReadinessBlockerRows,
} = require("../packages/governance/src/retention-deletion-encryption-runtime-readiness-blocker-status-registry.js");
const {
  listThirdPartyRoutingRuntimeReadinessBlockerRows,
} = require("../packages/governance/src/third-party-routing-runtime-readiness-blocker-status-registry.js");
const {
  listAuditAccessLogRuntimeReadinessBlockerRows,
} = require("../packages/governance/src/audit-access-log-runtime-readiness-blocker-status-registry.js");
const {
  listRolePermissionModelStatusGapRows,
} = require("../packages/governance/src/role-permission-model-status-gap-registry.js");
const {
  listRuntimeGateCandidateStatusInventoryRows,
} = require("../packages/governance/src/runtime-gate-candidate-status-inventory-registry.js");
const {
  listGlobalAccessControlThreatModelInventoryRows,
} = require("../packages/governance/src/global-access-control-threat-model-inventory-status-registry.js");
const {
  listAdminSupportRuntimeReadinessStatusGaps,
} = require("../packages/governance/src/admin-support-runtime-readiness-status-gap-registry.js");
const {
  listRawMaterialRoutingControls,
} = require("../packages/governance/src/raw-material-routing-control-specification-registry.js");

const expectedRowIds = [
  "CAHR-AI-GAP-001_RBAC_ACCESS_CONTROL",
  "CAHR-AI-GAP-002_AUDIT_ACCESS_LOG",
  "CAHR-AI-GAP-003_DATA_LIFECYCLE_RDE",
  "CAHR-AI-GAP-004_PROVIDER_THIRD_PARTY_ROUTING",
  "CAHR-AI-GAP-005_RAW_MATERIAL_SOURCE_HANDLING",
  "CAHR-AI-GAP-006_PILOT_RUNTIME_PRIVATE_CASE_PROCESSING",
  "CAHR-AI-GAP-007_SECURITY_REVIEW_METHOD_SCOPE",
  "CAHR-AI-GAP-008_PRIVACY_GDPR_DPIA",
  "CAHR-AI-GAP-009_EU_AI_ACT_HIGH_RISK_READINESS",
  "CAHR-AI-GAP-010_HUMAN_OVERSIGHT_PROFESSIONAL_REVIEW",
  "CAHR-AI-GAP-011_SWE_JURISDICTION_MODULE",
  "CAHR-AI-GAP-012_DK_JURISDICTION_MODULE",
  "CAHR-AI-GAP-013_EXTERNAL_EXPERT_REVIEW",
  "CAHR-AI-GAP-014_NO_RAW_NO_CONCLUSION_COUNTER_CONTEXT",
  "CAHR-AI-GAP-015_EXTERNAL_USE_PRODUCT_READINESS",
  "CAHR-AI-GAP-016_COURT_ADJACENT_PILOT_CLOSURE_CRITERIA",
];

const requiredFields = [
  "id",
  "control_area",
  "jurisdiction_scope",
  "court_use_relevance",
  "current_evidence_level",
  "implementation_gap",
  "test_evidence_gap",
  "security_review_gap",
  "privacy_gdpr_dependency",
  "eu_ai_act_dependency",
  "human_oversight_requirement",
  "jurisdiction_specific_dependency",
  "external_expert_review_required",
  "blocker_for_private_case_processing",
  "blocker_for_internal_sanitized_pilot",
  "blocker_for_court_adjacent_pilot",
  "blocker_for_external_use",
  "closure_criteria",
  "related_rde_runtime_blocker_ids",
  "related_tpr_runtime_blocker_ids",
  "related_aal_runtime_blocker_ids",
  "related_role_permission_gap_ids",
  "related_runtime_gate_candidate_ids",
  "related_global_access_control_row_ids",
  "related_admin_support_gap_ids",
  "related_raw_material_routing_control_ids",
  "related_storage_location_ids",
  "related_material_classes",
  "evidence_posture",
  "non_authorizations",
  "notes",
];

const positiveClaimKeys = [
  "authorized",
  "court_ready",
  "approved_tool_ready",
  "external_use_authorized",
  "product_candidate_selected",
  "runtime_certification_created",
  "technical_signoff_created",
  "release_approved",
  "real_private_case_ready",
  "legal_decision_ready",
  "clinical_decision_ready",
  "evidentiary_proof_ready",
  "eu_ai_act_compliance_ready",
  "security_finding_created",
  "vulnerability_finding_created",
  "severity_assigned",
  "remediation_recommended",
  "remediation_implemented",
  "retention_implemented",
  "deletion_implemented",
  "purge_implemented",
  "erasure_implemented",
  "encryption_implemented",
  "key_management_implemented",
  "provider_retention_deletion_implemented",
  "audit_access_log_implemented",
  "rbac_implemented",
  "access_control_implemented",
  "runtime_gate_implemented",
  "validator_dispatch_created",
  "runtime_registry_lookup_created",
  "third_party_routing_implemented",
  "raw_material_routing_implemented",
  "source_package_inspected",
  "metadata_acquired",
];

const expectedPrerequisiteCoverage = [
  {
    label: "RBAC / access-control",
    pattern: /RBAC\/access-control/,
  },
  {
    label: "audit / access-log",
    pattern: /audit\/access-log/,
  },
  {
    label: "RDE lifecycle",
    pattern: /RDE lifecycle/,
  },
  {
    label: "provider / third-party routing",
    pattern: /third-party\/provider routing/,
  },
  {
    label: "raw/source handling",
    pattern: /raw\/private\/source material handling/,
  },
  {
    label: "pilot/runtime",
    pattern: /pilot\/runtime readiness/,
  },
  {
    label: "security review method/scope",
    pattern: /security review method\/scope/,
  },
  {
    label: "privacy / GDPR / DPIA",
    pattern: /privacy\/GDPR and DPIA/,
  },
  {
    label: "EU AI Act high-risk readiness",
    pattern: /EU AI Act high-risk readiness/,
  },
  {
    label: "human oversight",
    pattern: /human oversight and professional review/,
  },
  {
    label: "SWE jurisdiction module",
    pattern: /SWE jurisdiction module/,
  },
  {
    label: "DK jurisdiction module",
    pattern: /DK jurisdiction module/,
  },
  {
    label: "external expert review",
    pattern: /external expert review/,
  },
  {
    label: "no-raw / no-conclusion / counter-context",
    pattern: /no-raw\/no-conclusion\/counter-context/,
  },
  {
    label: "external-use / product readiness closure",
    pattern: /external-use\/product readiness closure/,
  },
  {
    label: "court-adjacent pilot closure criteria",
    pattern: /court-adjacent pilot closure criteria/,
  },
];

function collectObjects(value, collected = []) {
  if (!value || typeof value !== "object") {
    return collected;
  }

  collected.push(value);
  for (const nested of Object.values(value)) {
    collectObjects(nested, collected);
  }

  return collected;
}

test("court-adjacent high-risk AI gap matrix rows exist exactly", () => {
  assert.deepEqual(
    Object.keys(
      registry.COURT_ADJACENT_HIGH_RISK_AI_READINESS_GAP_MATRIX_FAMILIES,
    ),
    [
      "RBAC_ACCESS_CONTROL",
      "AUDIT_ACCESS_LOG",
      "DATA_LIFECYCLE_RDE",
      "PROVIDER_THIRD_PARTY_ROUTING",
      "RAW_MATERIAL_SOURCE_HANDLING",
      "PILOT_RUNTIME_PRIVATE_CASE_PROCESSING",
      "SECURITY_REVIEW_METHOD_SCOPE",
      "PRIVACY_GDPR_DPIA",
      "EU_AI_ACT_HIGH_RISK_READINESS",
      "HUMAN_OVERSIGHT_PROFESSIONAL_REVIEW",
      "SWE_JURISDICTION_MODULE",
      "DK_JURISDICTION_MODULE",
      "EXTERNAL_EXPERT_REVIEW",
      "NO_RAW_NO_CONCLUSION_COUNTER_CONTEXT",
      "EXTERNAL_USE_PRODUCT_READINESS",
      "COURT_ADJACENT_PILOT_CLOSURE_CRITERIA",
    ],
  );
  assert.deepEqual(
    registry.listCourtAdjacentHighRiskAiReadinessGapRows().map((row) => row.id),
    expectedRowIds,
  );
});

test("rows expose required fields and remain gap/status only", () => {
  for (const row of registry.listCourtAdjacentHighRiskAiReadinessGapRows()) {
    for (const field of requiredFields) {
      assert.ok(Object.hasOwn(row, field), `${row.id} missing ${field}`);
    }

    assert.equal(row.current_evidence_level, "DOCS_ONLY_REGISTRY_SCAFFOLD_EVIDENCE");
    assert.ok(row.current_readiness_status.includes("DOCS_ONLY_GAP_MATRIX"));
    assert.ok(row.current_readiness_status.includes("REGISTRY_SCAFFOLD_ONLY"));
    assert.ok(row.current_readiness_status.includes("FUTURE_ONLY_CANDIDATE_ONLY"));
    assert.ok(
      row.current_readiness_status.includes("RUNTIME_GATE_INVENTORY_DEFERRED"),
    );
    assert.ok(
      row.current_readiness_status.includes(
        "NOT_AUTHORIZED_FOR_RUNTIME_ENFORCEMENT",
      ),
    );
    assert.ok(row.current_readiness_status.includes("NOT_COURT_READY"));
    assert.ok(row.current_readiness_status.includes("NOT_EXTERNAL_USE_READY"));
    assert.equal(row.blocker_for_private_case_processing, true);
    assert.equal(row.blocker_for_internal_sanitized_pilot, true);
    assert.equal(row.blocker_for_court_adjacent_pilot, true);
    assert.equal(row.blocker_for_external_use, true);
    assert.equal(row.external_expert_review_required, true);
    assert.match(row.human_oversight_requirement, /human|professional/i);
  }
});

test("cross-registry references point only to known rows classes and locations", () => {
  const known = {
    rde: new Set(
      listRetentionDeletionEncryptionRuntimeReadinessBlockerRows().map(
        (row) => row.id,
      ),
    ),
    tpr: new Set(
      listThirdPartyRoutingRuntimeReadinessBlockerRows().map((row) => row.id),
    ),
    aal: new Set(
      listAuditAccessLogRuntimeReadinessBlockerRows().map((row) => row.id),
    ),
    role: new Set(listRolePermissionModelStatusGapRows().map((row) => row.id)),
    runtime: new Set(
      listRuntimeGateCandidateStatusInventoryRows().map((row) => row.id),
    ),
    globalAccess: new Set(
      listGlobalAccessControlThreatModelInventoryRows().map((row) => row.id),
    ),
    admin: new Set(
      listAdminSupportRuntimeReadinessStatusGaps().map((row) => row.id),
    ),
    rawRouting: new Set(
      listRawMaterialRoutingControls().map((row) => row.control_id),
    ),
    locations: new Set(listDataLocations().map((row) => row.id)),
    materials: new Set(listMaterialClasses()),
  };

  for (const row of registry.listCourtAdjacentHighRiskAiReadinessGapRows()) {
    for (const id of row.related_rde_runtime_blocker_ids) {
      assert.ok(known.rde.has(id), `${row.id} unknown RDE ref ${id}`);
    }
    for (const id of row.related_tpr_runtime_blocker_ids) {
      assert.ok(known.tpr.has(id), `${row.id} unknown TPR ref ${id}`);
    }
    for (const id of row.related_aal_runtime_blocker_ids) {
      assert.ok(known.aal.has(id), `${row.id} unknown AAL ref ${id}`);
    }
    for (const id of row.related_role_permission_gap_ids) {
      assert.ok(known.role.has(id), `${row.id} unknown role ref ${id}`);
    }
    for (const id of row.related_runtime_gate_candidate_ids) {
      assert.ok(known.runtime.has(id), `${row.id} unknown runtime ref ${id}`);
    }
    for (const id of row.related_global_access_control_row_ids) {
      assert.ok(
        known.globalAccess.has(id),
        `${row.id} unknown global access ref ${id}`,
      );
    }
    for (const id of row.related_admin_support_gap_ids) {
      assert.ok(known.admin.has(id), `${row.id} unknown admin ref ${id}`);
    }
    for (const id of row.related_raw_material_routing_control_ids) {
      assert.ok(known.rawRouting.has(id), `${row.id} unknown RMR ref ${id}`);
    }
    for (const id of row.related_storage_location_ids) {
      assert.ok(known.locations.has(id), `${row.id} unknown storage ref ${id}`);
    }
    for (const materialClass of row.related_material_classes) {
      assert.ok(
        known.materials.has(materialClass),
        `${row.id} unknown material class ${materialClass}`,
      );
    }
  }
});

test("SWE and DK jurisdiction scopes remain separated", () => {
  const swe = registry.getCourtAdjacentHighRiskAiReadinessGapRow(
    "CAHR-AI-GAP-011_SWE_JURISDICTION_MODULE",
  );
  const dk = registry.getCourtAdjacentHighRiskAiReadinessGapRow(
    "CAHR-AI-GAP-012_DK_JURISDICTION_MODULE",
  );

  assert.equal(swe.jurisdiction_scope, "SWE");
  assert.equal(dk.jurisdiction_scope, "DK");
  assert.notEqual(swe.id, dk.id);
  assert.match(swe.jurisdiction_specific_dependency, /SWE/);
  assert.match(dk.jurisdiction_specific_dependency, /DK/);
});

test("high-risk material classes remain denied and blocked", () => {
  const highRisk = new Set(
    Object.values(HIGH_RISK_MATERIAL_CLASSES_DENIED).map(
      (entry) => entry.material_class,
    ),
  );
  const rows = registry.listCourtAdjacentHighRiskAiReadinessGapRows();
  const rowsWithHighRiskMaterial = rows.filter((row) =>
    row.related_material_classes.some((materialClass) =>
      highRisk.has(materialClass),
    ),
  );

  assert.ok(rowsWithHighRiskMaterial.length > 0);
  for (const row of rowsWithHighRiskMaterial) {
    assert.equal(row.blocker_for_private_case_processing, true);
    assert.equal(row.blocker_for_external_use, true);
    assert.equal(row.non_authorizations.authorized, false);
    assert.equal(row.non_authorizations.external_use_authorized, false);
    assert.equal(row.non_authorizations.real_private_case_ready, false);
  }
});

test("unknown lookup fails closed", () => {
  assert.equal(
    registry.hasCourtAdjacentHighRiskAiReadinessGapRow("UNKNOWN"),
    false,
  );
  assert.equal(
    registry.getCourtAdjacentHighRiskAiReadinessGapRow("UNKNOWN"),
    null,
  );

  const classification =
    registry.classifyCourtAdjacentHighRiskAiReadinessGapRow("UNKNOWN");
  assert.equal(classification.status, "UNKNOWN_NOT_EVIDENCED");
  assert.equal(classification.current_evidence_level, "UNKNOWN_NOT_EVIDENCED");
  for (const key of positiveClaimKeys) {
    assert.equal(classification.non_authorizations[key], false);
  }
});

test("helpers never create readiness authorization finding severity or remediation claims", () => {
  for (const row of registry.listCourtAdjacentHighRiskAiReadinessGapRows()) {
    for (const key of positiveClaimKeys) {
      assert.equal(row.non_authorizations[key], false, `${row.id} ${key}`);
    }

    assert.equal(registry.isCourtReady(row.id), false);
    assert.equal(registry.isExternalUseAuthorized(row.id), false);
    assert.equal(registry.isProductCandidateSelected(row.id), false);
    assert.equal(registry.isRuntimeCertified(row.id), false);
    assert.equal(registry.isTechnicalSignoffCreated(row.id), false);
    assert.equal(registry.isSecurityFindingCreated(row.id), false);
    assert.equal(registry.isSeverityAssigned(row.id), false);
    assert.equal(registry.isRemediationRecommended(row.id), false);
  }

  for (const key of positiveClaimKeys) {
    assert.equal(
      registry.getCourtAdjacentHighRiskAiReadinessNonAuthorizationStatus()[key],
      false,
    );
  }
});

test("helper outputs are frozen copy-safe values", () => {
  const rows = registry.listCourtAdjacentHighRiskAiReadinessGapRows();
  assert.equal(Object.isFrozen(rows[0]), true);
  assert.equal(Object.isFrozen(rows[0].non_authorizations), true);

  rows.pop();
  assert.equal(
    registry.listCourtAdjacentHighRiskAiReadinessGapRows().length,
    expectedRowIds.length,
  );

  const first = registry.getCourtAdjacentHighRiskAiReadinessGapRow(
    expectedRowIds[0],
  );
  assert.equal(Object.isFrozen(first), true);
  assert.equal(Object.isFrozen(first.closure_criteria), true);

  const collected = collectObjects(
    registry.classifyCourtAdjacentHighRiskAiReadinessGapRow(expectedRowIds[0]),
  );
  assert.ok(collected.every((value) => Object.isFrozen(value)));

  const prerequisites =
    registry.getCourtAdjacentHighRiskAiReadinessRequiredPrerequisites();
  assert.equal(Object.isFrozen(prerequisites), true);
  assert.throws(() => prerequisites.push("court-ready"));
  assert.equal(
    registry.getCourtAdjacentHighRiskAiReadinessRequiredPrerequisites().length,
    expectedPrerequisiteCoverage.length,
  );
});

test("index export wiring is side-effect-free and exposes the new helpers", () => {
  assert.equal(
    indexExports.listCourtAdjacentHighRiskAiReadinessGapRows,
    registry.listCourtAdjacentHighRiskAiReadinessGapRows,
  );
  assert.equal(
    indexExports.getCourtAdjacentHighRiskAiReadinessGapRow,
    registry.getCourtAdjacentHighRiskAiReadinessGapRow,
  );
  assert.equal(indexExports.isCourtReady(expectedRowIds[0]), false);
});

test("non-overclaim rules and prerequisites preserve the boundary", () => {
  assert.ok(
    registry
      .listCourtAdjacentHighRiskAiReadinessNonOverclaimRules()
      .some((rule) => rule.includes("COURT_READY")),
  );
  assert.ok(
    registry
      .listCourtAdjacentHighRiskAiReadinessNonOverclaimRules()
      .some((rule) => rule.includes("SECURITY_FINDING")),
  );

  const prerequisites =
    registry.getCourtAdjacentHighRiskAiReadinessRequiredPrerequisites();
  assert.equal(prerequisites.length, expectedPrerequisiteCoverage.length);
  for (const { label, pattern } of expectedPrerequisiteCoverage) {
    assert.ok(
      prerequisites.some((prerequisite) => pattern.test(prerequisite)),
      `missing prerequisite coverage for ${label}`,
    );
  }

  const serializedPrerequisites = JSON.stringify(prerequisites);
  for (const positiveClaim of [
    "court_ready: true",
    "approved_tool_ready: true",
    "external_use_authorized: true",
    "product_candidate_selected: true",
    "runtime_certification_created: true",
    "technical_signoff_created: true",
    "security_finding_created: true",
    "vulnerability_finding_created: true",
    "severity_assigned: true",
    "remediation_recommended: true",
    "remediation_implemented: true",
    "release_approved: true",
  ]) {
    assert.equal(serializedPrerequisites.includes(positiveClaim), false);
  }
});
