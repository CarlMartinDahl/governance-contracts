const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const docsText = fs.readFileSync(
  path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md"),
  "utf8",
);
const apiIndexText = fs.readFileSync(
  path.join(__dirname, "..", "apps", "api", "src", "index.js"),
  "utf8",
);

test("docs freeze the shared API error-envelope seam at the prerequisite stage only", () => {
  assert.match(docsText, /Shared API Error-Envelope Mapping Prerequisites/i);
  assert.match(
    docsText,
    /shared machine-readable API error-envelope seam is not yet adopted into the neutral principles\/fact-model layer and remains docs-only\/prerequisite-frozen for now/i,
  );
  assert.match(
    docsText,
    /\{ "error": \{ "code": \.\.\., \.\.\.details \} \}/i,
  );
  assert.match(
    docsText,
    /HTTP status usage, machine-readable `error\.code`, and existing route-level detail fields such as `case_id` and `snapshot_status`/i,
  );
  assert.match(docsText, /auth\/access failures/i);
  assert.match(docsText, /route\/resource not found/i);
  assert.match(docsText, /unsupported profile\/capability states/i);
  assert.match(docsText, /validation\/body-shape failures/i);
  assert.match(docsText, /`snapshot not current` delivery failures/i);
  assert.match(
    docsText,
    /no single shared neutral-model alignment is yet safe for:\s+stop-outcome\s+stop-matrix\s+traceability\s+semantic-fact/i,
  );
  assert.match(
    docsText,
    /implementing one shared alignment now would require guessing/i,
  );
  assert.match(
    docsText,
    /no shared API error-envelope alignment should be implemented until the envelope families are explicitly contract-defined enough for safe mapping/i,
  );
  assert.match(
    docsText,
    /undocumented shared API error-envelope mappings must remain blocked from implementation/i,
  );
  assert.match(
    docsText,
    /outside the already frozen ten adopted seams recorded in `docs\/PRINCIPLES_FACT_MODEL_ROLLOUT_FREEZE_v1\.md`/i,
  );
  assert.match(
    docsText,
    /separate from the shared `snapshot_status` currentness traceability seam/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, schema behavior, readiness behavior, or fail-closed behavior/i,
  );
});

test("docs freeze the snapshot not current envelope subfamily as a narrower partition only", () => {
  assert.match(
    docsText,
    /Snapshot Not Current API Envelope Partition\/Prerequisites/i,
  );
  assert.match(
    docsText,
    /`snapshot not current` is a narrower subfamily inside the already-frozen shared API error-envelope seam, but it is itself still docs-only\/prerequisite-frozen for now/i,
  );
  assert.match(
    docsText,
    /`GET \/cases\/:caseId\/export-package\/json-artifact\/download` with `ERR_EXPORT_PACKAGE_JSON_ARTIFACT_SNAPSHOT_NOT_CURRENT`/i,
  );
  assert.match(
    docsText,
    /`GET \/cases\/:caseId\/export-package\/markdown-artifact\/download` with `ERR_EXPORT_PACKAGE_MARKDOWN_ARTIFACT_SNAPSHOT_NOT_CURRENT`/i,
  );
  assert.match(
    docsText,
    /`GET \/cases\/:caseId\/export-package\/pdf-artifact\/download` with `ERR_EXPORT_PACKAGE_PDF_ARTIFACT_SNAPSHOT_NOT_CURRENT`/i,
  );
  assert.match(
    docsText,
    /`GET \/cases\/:caseId\/export-package\/docx-artifact\/download` with `ERR_EXPORT_PACKAGE_DOCX_ARTIFACT_SNAPSHOT_NOT_CURRENT`/i,
  );
  assert.match(
    docsText,
    /`GET \/cases\/:caseId\/export-package\/bundle-archive-artifact\/download` with `ERR_EXPORT_PACKAGE_BUNDLE_ARCHIVE_ARTIFACT_SNAPSHOT_NOT_CURRENT`/i,
  );
  assert.match(
    docsText,
    /the currently concrete shared signals already evidenced for this subfamily are limited to:\s+HTTP `409`\s+repeated machine-readable `ERR_EXPORT_PACKAGE_JSON_ARTIFACT_SNAPSHOT_NOT_CURRENT`, `ERR_EXPORT_PACKAGE_MARKDOWN_ARTIFACT_SNAPSHOT_NOT_CURRENT`, `ERR_EXPORT_PACKAGE_PDF_ARTIFACT_SNAPSHOT_NOT_CURRENT`, `ERR_EXPORT_PACKAGE_DOCX_ARTIFACT_SNAPSHOT_NOT_CURRENT`, and `ERR_EXPORT_PACKAGE_BUNDLE_ARCHIVE_ARTIFACT_SNAPSHOT_NOT_CURRENT`\s+machine-readable `case_id`\s+machine-readable `snapshot_status`/i,
  );
  assert.match(
    docsText,
    /delivery blocked because the requested persisted artifact snapshot is not current/i,
  );
  assert.match(
    docsText,
    /neighboring machine-readable `\*_SNAPSHOT_NOT_FOUND` and `ERR_UNSUPPORTED_JURISDICTION_PROFILE` families remain outside this narrower partition/i,
  );
  assert.match(
    docsText,
    /depends on the already-adopted shared `snapshot_status` currentness seam because the `snapshot not current` delivery envelope carries the same machine-readable `snapshot_status` surface/i,
  );
  assert.match(docsText, /not itself yet contract-aligned to any neutral model/i);
  assert.match(
    docsText,
    /still does not define enough common envelope fields and canonical mapping semantics to safely add one shared:\s+stop-outcome\s+stop-matrix\s+traceability\s+semantic-fact\s+alignment without guessing/i,
  );
  assert.match(
    docsText,
    /no neutral-model alignment should be implemented for this subfamily until its common envelope fields and canonical mapping semantics are explicitly contract-defined/i,
  );
  assert.match(
    docsText,
    /undocumented `snapshot not current` mappings must remain blocked from implementation/i,
  );
  assert.match(
    docsText,
    /this partition is narrower than the overall shared API error-envelope seam, the broader seam remains frozen, and this partition\/freeze does not change runtime behavior/i,
  );
});

test("docs freeze the unsupported jurisdiction/profile envelope subfamily as a narrower partition only", () => {
  assert.match(
    docsText,
    /Unsupported Jurisdiction\/Profile API Envelope Partition\/Prerequisites/i,
  );
  assert.match(
    docsText,
    /`unsupported jurisdiction\/profile` is a narrower subfamily inside the already-frozen shared API error-envelope seam, but it is itself still docs-only\/partition-frozen for now/i,
  );
  assert.match(
    docsText,
    /`profile_dossier` unsupported jurisdiction\/profile responses/i,
  );
  assert.match(
    docsText,
    /`export_package_json_artifact` latest unsupported jurisdiction\/profile responses/i,
  );
  assert.match(
    docsText,
    /`export_package_json_artifact` delivery unsupported jurisdiction\/profile responses/i,
  );
  assert.match(
    docsText,
    /`export_package_markdown_artifact` delivery unsupported jurisdiction\/profile responses/i,
  );
  assert.match(
    docsText,
    /`export_package_bundle_archive_artifact` delivery unsupported jurisdiction\/profile responses/i,
  );
  assert.match(
    docsText,
    /the currently concrete shared signals already evidenced for this subfamily are limited to:\s+HTTP `409`\s+repeated machine-readable `ERR_UNSUPPORTED_JURISDICTION_PROFILE`\s+machine-readable unsupported jurisdiction\/profile semantics/i,
  );
  assert.match(
    docsText,
    /existing route-level `case_id` and `jurisdiction_profile_key` detail fields where they are already carried through the current runtime helper path/i,
  );
  assert.match(
    docsText,
    /the current route helper reaches this branch through a broader shared capability check, but the exact currently evidenced route-edge family under this partition is still only the repeated unsupported jurisdiction\/profile `ERR_UNSUPPORTED_JURISDICTION_PROFILE` branch/i,
  );
  assert.match(
    docsText,
    /broader helper-level unsupported-capability wording remains outside this narrower partition unless exact route-edge evidence is documented/i,
  );
  assert.match(
    docsText,
    /still not yet safe to treat as one neutral-model contract surface/i,
  );
  assert.match(
    docsText,
    /still does not define enough common envelope fields and canonical mapping semantics to safely add one shared:\s+stop-outcome\s+stop-matrix\s+traceability\s+semantic-fact\s+alignment without guessing/i,
  );
  assert.match(
    docsText,
    /no neutral-model alignment should be implemented for this subfamily until its common envelope fields and canonical mapping semantics are explicitly contract-defined/i,
  );
  assert.match(
    docsText,
    /undocumented unsupported jurisdiction\/profile mappings must remain blocked from implementation/i,
  );
  assert.match(
    docsText,
    /separate from the already frozen `snapshot not current` API envelope partition\/prerequisites/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, schema behavior, readiness behavior, or fail-closed behavior/i,
  );
});

test("docs freeze the ERR_CASE_ACCESS_DENIED envelope subfamily as a narrower partition only", () => {
  assert.match(
    docsText,
    /ERR_CASE_ACCESS_DENIED API Envelope Partition\/Prerequisites/i,
  );
  assert.match(
    docsText,
    /`ERR_CASE_ACCESS_DENIED` is a narrower subfamily inside the already-frozen shared API error-envelope seam, but it is itself still docs-only\/partition-frozen for now/i,
  );
  assert.match(
    docsText,
    /`GET \/cases\/:caseId\/profile-inputs`\s+`GET \/cases\/:caseId\/release-eval\/latest`\s+`GET \/cases\/:caseId\/profile-dossier`\s+`GET \/cases\/:caseId\/export-package\/latest`\s+`POST \/cases\/:caseId\/export-package\/refresh`/i,
  );
  assert.match(
    docsText,
    /`GET \/cases\/:caseId\/export-package\/bundle-manifest\/latest`\s+`POST \/cases\/:caseId\/export-package\/bundle-manifest\/refresh`\s+`GET \/cases\/:caseId\/export-package\/bundle-archive-artifact\/latest`\s+`POST \/cases\/:caseId\/export-package\/bundle-archive-artifact\/refresh`\s+`GET \/cases\/:caseId\/export-package\/bundle-archive-artifact\/download`/i,
  );
  assert.match(
    docsText,
    /`GET \/cases\/:caseId\/export-package\/json-artifact\/latest`\s+`POST \/cases\/:caseId\/export-package\/json-artifact\/refresh`\s+`GET \/cases\/:caseId\/export-package\/json-artifact\/download`\s+`GET \/cases\/:caseId\/export-package\/markdown-artifact\/latest`\s+`POST \/cases\/:caseId\/export-package\/markdown-artifact\/refresh`\s+`GET \/cases\/:caseId\/export-package\/markdown-artifact\/download`/i,
  );
  assert.match(
    docsText,
    /`GET \/cases\/:caseId\/export-package\/pdf-artifact\/latest`\s+`POST \/cases\/:caseId\/export-package\/pdf-artifact\/refresh`\s+`GET \/cases\/:caseId\/export-package\/pdf-artifact\/download`\s+`GET \/cases\/:caseId\/export-package\/docx-artifact\/latest`\s+`POST \/cases\/:caseId\/export-package\/docx-artifact\/refresh`\s+`GET \/cases\/:caseId\/export-package\/docx-artifact\/download`/i,
  );
  assert.match(
    docsText,
    /the currently concrete shared signals already evidenced for this subfamily are limited to:\s+HTTP `403`\s+repeated machine-readable `ERR_CASE_ACCESS_DENIED`\s+machine-readable case access denied semantics/i,
  );
  assert.match(
    docsText,
    /existing route-level `case_id` detail fields where they are already carried through the current runtime helper path/i,
  );
  assert.match(
    docsText,
    /the current route helper reaches this branch through broader shared auth\/access logic, but the exact currently evidenced route-edge family under this partition is still only the repeated `ERR_CASE_ACCESS_DENIED` branch/i,
  );
  assert.match(
    docsText,
    /broader helper-level auth\/access wording remains outside this narrower partition unless exact route-edge evidence is documented/i,
  );
  assert.match(
    docsText,
    /must remain separate from `ERR_UNAUTHENTICATED`/i,
  );
  assert.match(
    apiIndexText,
    /errorResponse\(403,\s*"ERR_CASE_ACCESS_DENIED",\s*\{/,
  );
  assert.match(
    apiIndexText,
    /errorResponse\(401,\s*"ERR_UNAUTHENTICATED"\)/,
  );
  assert.match(
    docsText,
    /is not itself yet safe to treat as one neutral-model contract surface/i,
  );
  assert.match(
    docsText,
    /still does not define enough common envelope fields and canonical mapping semantics to safely add one shared:\s+stop-outcome\s+stop-matrix\s+traceability\s+semantic-fact\s+alignment without guessing/i,
  );
  assert.match(
    docsText,
    /no neutral-model alignment should be implemented for this subfamily until its common envelope fields and canonical mapping semantics are explicitly contract-defined/i,
  );
  assert.match(
    docsText,
    /undocumented `ERR_CASE_ACCESS_DENIED` mappings must remain blocked from implementation/i,
  );
  assert.match(
    docsText,
    /separate from the already frozen `snapshot not current` API envelope partition\/prerequisites/i,
  );
  assert.match(
    docsText,
    /separate from the already frozen `unsupported jurisdiction\/profile` API envelope partition\/prerequisites/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, schema behavior, readiness behavior, or fail-closed behavior/i,
  );
});

test("docs freeze the unauthenticated envelope subfamily as a narrower partition only", () => {
  assert.match(
    docsText,
    /Unauthenticated API Envelope Partition\/Prerequisites/i,
  );
  assert.match(
    docsText,
    /`unauthenticated` is a narrower subfamily inside the already-frozen shared API error-envelope seam, but it is itself still docs-only\/partition-frozen for now/i,
  );
  assert.match(docsText, /`profile_dossier` unauthenticated responses/i);
  assert.match(docsText, /`release_eval` unauthenticated responses/i);
  assert.match(
    docsText,
    /`export_package_json_artifact` latest unauthenticated responses/i,
  );
  assert.match(
    docsText,
    /`export_package_json_artifact` delivery unauthenticated responses/i,
  );
  assert.match(
    docsText,
    /the currently concrete shared signals already evidenced for this subfamily are limited to:\s+HTTP `401`\s+repeated machine-readable `ERR_UNAUTHENTICATED` usage through the shared `loadAuthorizedCaseContext` helper path\s+machine-readable unauthenticated semantics/i,
  );
  assert.match(
    docsText,
    /narrower than the broader auth\/access family and must remain separate from `ERR_CASE_ACCESS_DENIED`/i,
  );
  assert.match(
    docsText,
    /is not itself yet safe to treat as one neutral-model contract surface/i,
  );
  assert.match(
    docsText,
    /still does not define enough common envelope fields and canonical mapping semantics to safely add one shared:\s+stop-outcome\s+stop-matrix\s+traceability\s+semantic-fact\s+alignment without guessing/i,
  );
  assert.match(
    docsText,
    /no neutral-model alignment should be implemented for this subfamily until its common envelope fields and canonical mapping semantics are explicitly contract-defined/i,
  );
  assert.match(
    docsText,
    /undocumented unauthenticated mappings must remain blocked from implementation/i,
  );
  assert.match(
    docsText,
    /separate from the already frozen `snapshot not current` API envelope partition\/prerequisites/i,
  );
  assert.match(
    docsText,
    /separate from the already frozen `unsupported jurisdiction\/profile` API envelope partition\/prerequisites/i,
  );
  assert.match(
    docsText,
    /separate from the already frozen `ERR_CASE_ACCESS_DENIED` API envelope partition\/prerequisites/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, schema behavior, readiness behavior, or fail-closed behavior/i,
  );
});

test("docs freeze the resource/snapshot not found envelope subfamily as a narrower partition only", () => {
  assert.match(
    docsText,
    /Resource\/Snapshot Not Found API Envelope Partition\/Prerequisites/i,
  );
  assert.match(
    docsText,
    /`resource\/snapshot not found` is a narrower subfamily inside the already-frozen shared API error-envelope seam, but it is itself still docs-only\/partition-frozen for now/i,
  );
  assert.match(
    docsText,
    /`GET \/cases\/:caseId\/profile-inputs` empty-case responses with `ERR_PROFILE_INPUTS_NOT_FOUND`/i,
  );
  assert.match(docsText, /`profile_dossier` snapshot-not-found responses/i);
  assert.match(
    docsText,
    /`export_package` latest snapshot-not-found responses/i,
  );
  assert.match(
    docsText,
    /`export_package_bundle_manifest` latest snapshot-not-found responses/i,
  );
  assert.match(
    docsText,
    /`export_package_bundle_archive_artifact` latest snapshot-not-found responses/i,
  );
  assert.match(
    docsText,
    /`export_package_json_artifact` latest snapshot-not-found responses/i,
  );
  assert.match(
    docsText,
    /`export_package_json_artifact` delivery snapshot-not-found responses/i,
  );
  assert.match(
    docsText,
    /`export_package_markdown_artifact` latest snapshot-not-found responses/i,
  );
  assert.match(
    docsText,
    /`export_package_markdown_artifact` delivery snapshot-not-found responses/i,
  );
  assert.match(
    docsText,
    /`export_package_pdf_artifact` latest snapshot-not-found responses/i,
  );
  assert.match(
    docsText,
    /`export_package_pdf_artifact` delivery snapshot-not-found responses/i,
  );
  assert.match(
    docsText,
    /`export_package_docx_artifact` latest snapshot-not-found responses/i,
  );
  assert.match(
    docsText,
    /`export_package_docx_artifact` delivery snapshot-not-found responses/i,
  );
  assert.match(
    docsText,
    /`export_package_bundle_archive_artifact` delivery snapshot-not-found responses/i,
  );
  assert.match(
    docsText,
    /the currently concrete shared signals already evidenced for this subfamily are limited to:\s+HTTP `404`\s+repeated machine-readable `ERR_PROFILE_INPUTS_NOT_FOUND`, `ERR_PROFILE_DOSSIER_SNAPSHOT_NOT_FOUND`, `ERR_EXPORT_PACKAGE_SNAPSHOT_NOT_FOUND`, `ERR_EXPORT_PACKAGE_BUNDLE_MANIFEST_SNAPSHOT_NOT_FOUND`, `ERR_EXPORT_PACKAGE_JSON_ARTIFACT_SNAPSHOT_NOT_FOUND`, `ERR_EXPORT_PACKAGE_MARKDOWN_ARTIFACT_SNAPSHOT_NOT_FOUND`, `ERR_EXPORT_PACKAGE_PDF_ARTIFACT_SNAPSHOT_NOT_FOUND`, `ERR_EXPORT_PACKAGE_DOCX_ARTIFACT_SNAPSHOT_NOT_FOUND`, and `ERR_EXPORT_PACKAGE_BUNDLE_ARCHIVE_ARTIFACT_SNAPSHOT_NOT_FOUND`\s+machine-readable resource or snapshot missing semantics/i,
  );
  assert.match(
    docsText,
    /existing route-level `case_id` detail fields where they are already carried through the current runtime helper path/i,
  );
  assert.match(
    docsText,
    /narrower than the broader route\/resource-not-found family and must remain separate from the exact route-entry `ERR_ROUTE_NOT_FOUND` family/i,
  );
  assert.match(
    docsText,
    /is not itself yet safe to treat as one neutral-model contract surface/i,
  );
  assert.match(
    docsText,
    /still does not define enough common envelope fields and canonical mapping semantics to safely add one shared:\s+stop-outcome\s+stop-matrix\s+traceability\s+semantic-fact\s+alignment without guessing/i,
  );
  assert.match(
    docsText,
    /no neutral-model alignment should be implemented for this subfamily until its common envelope fields and canonical mapping semantics are explicitly contract-defined/i,
  );
  assert.match(
    docsText,
    /undocumented resource\/snapshot not found mappings must remain blocked from implementation/i,
  );
  assert.match(
    docsText,
    /separate from the already frozen `snapshot not current` API envelope partition\/prerequisites/i,
  );
  assert.match(
    docsText,
    /separate from the already frozen `unsupported jurisdiction\/profile` API envelope partition\/prerequisites/i,
  );
  assert.match(
    docsText,
    /separate from the already frozen `ERR_CASE_ACCESS_DENIED` API envelope partition\/prerequisites/i,
  );
  assert.match(
    docsText,
    /separate from the already frozen `unauthenticated` API envelope partition\/prerequisites/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, schema behavior, readiness behavior, or fail-closed behavior/i,
  );
});

test("docs freeze the ERR_ROUTE_NOT_FOUND envelope subfamily as a narrower partition only", () => {
  assert.match(
    docsText,
    /ERR_ROUTE_NOT_FOUND API Envelope Partition\/Prerequisites/i,
  );
  assert.match(
    docsText,
    /`ERR_ROUTE_NOT_FOUND` is a narrower subfamily inside the already-frozen shared API error-envelope seam, but it is itself still docs-only\/partition-frozen for now/i,
  );
  assert.match(docsText, /`profile_inputs`/i);
  assert.match(docsText, /`release_eval` latest/i);
  assert.match(docsText, /`profile_dossier`/i);
  assert.match(docsText, /`export_package` latest and refresh/i);
  assert.match(docsText, /`export_package_bundle_manifest` latest and refresh/i);
  assert.match(
    docsText,
    /`export_package_bundle_archive_artifact` latest, refresh, and download/i,
  );
  assert.match(
    docsText,
    /`export_package_json_artifact` latest, refresh, and download/i,
  );
  assert.match(
    docsText,
    /`export_package_markdown_artifact` latest, refresh, and download/i,
  );
  assert.match(
    docsText,
    /`export_package_pdf_artifact` latest, refresh, and download/i,
  );
  assert.match(
    docsText,
    /`export_package_docx_artifact` latest, refresh, and download/i,
  );
  assert.match(
    docsText,
    /the currently concrete shared signals already evidenced for this subfamily are limited to:\s+HTTP `404`\s+repeated machine-readable `ERR_ROUTE_NOT_FOUND`\s+machine-readable route-entry miss semantics without resource-specific detail fields/i,
  );
  assert.match(
    docsText,
    /narrower than the broader route\/resource-not-found family and must remain separate from the already frozen `resource\/snapshot not found` API envelope partition\/prerequisites/i,
  );
  assert.match(
    docsText,
    /is not itself yet safe to treat as one neutral-model contract surface/i,
  );
  assert.match(
    docsText,
    /still does not define enough common envelope fields and canonical mapping semantics to safely add one shared:\s+stop-outcome\s+stop-matrix\s+traceability\s+semantic-fact\s+alignment without guessing/i,
  );
  assert.match(
    docsText,
    /no neutral-model alignment should be implemented for this subfamily until its common envelope fields and canonical mapping semantics are explicitly contract-defined/i,
  );
  assert.match(
    docsText,
    /undocumented `ERR_ROUTE_NOT_FOUND` mappings must remain blocked from implementation/i,
  );
  assert.match(
    docsText,
    /separate from the already frozen `snapshot not current` API envelope partition\/prerequisites/i,
  );
  assert.match(
    docsText,
    /separate from the already frozen `unsupported jurisdiction\/profile` API envelope partition\/prerequisites/i,
  );
  assert.match(
    docsText,
    /separate from the already frozen `ERR_CASE_ACCESS_DENIED` API envelope partition\/prerequisites/i,
  );
  assert.match(
    docsText,
    /separate from the already frozen `unauthenticated` API envelope partition\/prerequisites/i,
  );
  assert.match(
    docsText,
    /separate from the already frozen `resource\/snapshot not found` API envelope partition\/prerequisites/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, schema behavior, readiness behavior, or fail-closed behavior/i,
  );
});

test("docs freeze the ERR_METHOD_NOT_ALLOWED envelope subfamily as a narrower partition only", () => {
  assert.match(
    docsText,
    /ERR_METHOD_NOT_ALLOWED API Envelope Partition\/Prerequisites/i,
  );
  assert.match(
    docsText,
    /`ERR_METHOD_NOT_ALLOWED` is a narrower subfamily inside the already-frozen shared API error-envelope seam, but it is itself still docs-only\/partition-frozen for now/i,
  );
  assert.match(
    docsText,
    /the currently evidenced members of this subfamily are only the thin route-edge method-gate surfaces that already return `ERR_METHOD_NOT_ALLOWED`, including:\s+`profile_inputs`\s+`release_eval` latest\s+`profile_dossier`\s+`export_package` latest and refresh/i,
  );
  assert.match(
    docsText,
    /`export_package_bundle_manifest` latest and refresh\s+`export_package_bundle_archive_artifact` latest, refresh, and download\s+`export_package_json_artifact` latest, refresh, and download\s+`export_package_markdown_artifact` latest, refresh, and download\s+`export_package_pdf_artifact` latest, refresh, and download\s+`export_package_docx_artifact` latest, refresh, and download/i,
  );
  assert.match(
    docsText,
    /the currently concrete shared signals already evidenced for this subfamily are limited to:\s+HTTP `405`\s+repeated machine-readable `ERR_METHOD_NOT_ALLOWED`\s+machine-readable `method` carrying `request\.method`/i,
  );
  assert.match(
    docsText,
    /the current route handlers reach this branch through thin per-route method gating, but the exact currently evidenced route-edge family under this partition is still only the repeated `ERR_METHOD_NOT_ALLOWED` branch with the existing `method` detail/i,
  );
  assert.match(
    docsText,
    /broader HTTP method semantics, `Allow` headers, and allowed-method enumerations remain outside this narrower partition unless exact route-edge evidence is documented/i,
  );
  assert.match(
    docsText,
    /must remain separate from the already frozen `ERR_ROUTE_NOT_FOUND` API envelope partition\/prerequisites/i,
  );
  assert.match(
    docsText,
    /separate from the already frozen `unauthenticated` API envelope partition\/prerequisites/i,
  );
  assert.match(
    docsText,
    /separate from the already frozen `ERR_CASE_ACCESS_DENIED` API envelope partition\/prerequisites/i,
  );
  assert.match(
    docsText,
    /separate from the already frozen `unsupported jurisdiction\/profile` API envelope partition\/prerequisites/i,
  );
  assert.match(
    docsText,
    /separate from the already frozen `resource\/snapshot not found` API envelope partition\/prerequisites/i,
  );
  assert.match(
    docsText,
    /separate from the already frozen `snapshot not current` API envelope partition\/prerequisites/i,
  );
  assert.match(
    docsText,
    /separate from the already frozen `export refresh invalid-contract` API envelope partition\/prerequisites/i,
  );
  assert.match(
    docsText,
    /undocumented `ERR_METHOD_NOT_ALLOWED` mappings must remain blocked from implementation/i,
  );
  assert.match(
    apiIndexText,
    /errorResponse\(405,\s*"ERR_METHOD_NOT_ALLOWED",\s*\{\s*method:\s*request\.method,\s*\}\)/,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, schema behavior, readiness behavior, or fail-closed behavior/i,
  );
});

test("docs freeze the profile_input invalid body-shape envelope subfamily as a narrower partition only", () => {
  assert.match(
    docsText,
    /Profile_Input Invalid Body-Shape API Envelope Partition\/Prerequisites/i,
  );
  assert.match(
    docsText,
    /`profile_input invalid body-shape` is a narrower subfamily inside the already-frozen shared API error-envelope seam, but it is itself still docs-only\/partition-frozen for now/i,
  );
  assert.match(
    docsText,
    /the currently evidenced members of this subfamily are only the `profile_inputs` `PATCH` invalid body-shape responses that already return `ERR_PROFILE_INPUT_INVALID` through the shared profile-input validator path/i,
  );
  assert.match(
    docsText,
    /the currently concrete shared signals already evidenced for this subfamily are limited to:\s+HTTP `422`\s+repeated machine-readable `ERR_PROFILE_INPUT_INVALID`\s+machine-readable invalid `profile_input` body\/shape semantics\s+existing validator-provided detail fields where they are already carried through the current runtime validation path/i,
  );
  assert.match(
    docsText,
    /narrower than the broader validation\/body-shape family and must remain separate from the export-specific `\*_INVALID` branches/i,
  );
  assert.match(
    docsText,
    /is not itself yet safe to treat as one neutral-model contract surface/i,
  );
  assert.match(
    docsText,
    /still does not define enough common envelope fields and canonical mapping semantics to safely add one shared:\s+stop-outcome\s+stop-matrix\s+traceability\s+semantic-fact\s+alignment without guessing/i,
  );
  assert.match(
    docsText,
    /no neutral-model alignment should be implemented for this subfamily until its common envelope fields and canonical mapping semantics are explicitly contract-defined/i,
  );
  assert.match(
    docsText,
    /undocumented `profile_input invalid body-shape` mappings must remain blocked from implementation/i,
  );
  assert.match(
    docsText,
    /separate from the already frozen `snapshot not current` API envelope partition\/prerequisites/i,
  );
  assert.match(
    docsText,
    /separate from the already frozen `unsupported jurisdiction\/profile` API envelope partition\/prerequisites/i,
  );
  assert.match(
    docsText,
    /separate from the already frozen `ERR_CASE_ACCESS_DENIED` API envelope partition\/prerequisites/i,
  );
  assert.match(
    docsText,
    /separate from the already frozen `unauthenticated` API envelope partition\/prerequisites/i,
  );
  assert.match(
    docsText,
    /separate from the already frozen `resource\/snapshot not found` API envelope partition\/prerequisites/i,
  );
  assert.match(
    docsText,
    /separate from the already frozen `ERR_ROUTE_NOT_FOUND` API envelope partition\/prerequisites/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, schema behavior, readiness behavior, or fail-closed behavior/i,
  );
});

test("docs freeze the export refresh invalid-contract envelope subfamily as a narrower partition only", () => {
  assert.match(
    docsText,
    /Export Refresh Invalid-Contract API Envelope Partition\/Prerequisites/i,
  );
  assert.match(
    docsText,
    /`export refresh invalid-contract` is a narrower subfamily inside the already-frozen shared API error-envelope seam, but it is itself still docs-only\/partition-frozen for now/i,
  );
  assert.match(
    docsText,
    /`POST \/cases\/:caseId\/export-package\/json-artifact\/refresh`/i,
  );
  assert.match(
    docsText,
    /`POST \/cases\/:caseId\/export-package\/markdown-artifact\/refresh`/i,
  );
  assert.match(
    docsText,
    /`POST \/cases\/:caseId\/export-package\/pdf-artifact\/refresh`/i,
  );
  assert.match(
    docsText,
    /`POST \/cases\/:caseId\/export-package\/docx-artifact\/refresh`/i,
  );
  assert.match(
    docsText,
    /`POST \/cases\/:caseId\/export-package\/bundle-manifest\/refresh`/i,
  );
  assert.match(
    docsText,
    /`POST \/cases\/:caseId\/export-package\/bundle-archive-artifact\/refresh`/i,
  );
  assert.match(
    docsText,
    /the currently concrete shared signals already evidenced for this subfamily are limited to:\s+HTTP `422`\s+repeated export-family machine-readable `ERR_EXPORT_PACKAGE_INVALID`, `ERR_EXPORT_PACKAGE_JSON_ARTIFACT_INVALID`, `ERR_EXPORT_PACKAGE_MARKDOWN_ARTIFACT_INVALID`, `ERR_EXPORT_PACKAGE_PDF_ARTIFACT_INVALID`, `ERR_EXPORT_PACKAGE_DOCX_ARTIFACT_INVALID`, `ERR_EXPORT_PACKAGE_BUNDLE_MANIFEST_INVALID`, `ERR_EXPORT_PACKAGE_BUNDLE_ARCHIVE_INVALID`, and `ERR_EXPORT_PACKAGE_BUNDLE_ARCHIVE_ARTIFACT_INVALID`\s+machine-readable `case_id`\s+existing validator-provided detail fields and `message` where they are already carried through the current route\/runtime helper path/i,
  );
  assert.match(
    docsText,
    /parent `POST \/cases\/:caseId\/export-package\/refresh` branch is explicitly outside this narrower subfamily because its current `422` invalid-contract path also surfaces mixed upstream `ERR_PROFILE_DOSSIER_SNAPSHOT_INVALID`/i,
  );
  assert.match(
    docsText,
    /must remain separate from the already frozen `profile_input invalid body-shape` API envelope partition\/prerequisites/i,
  );
  assert.match(
    docsText,
    /no neutral-model alignment should be implemented for this subfamily until its common envelope fields and canonical mapping semantics are explicitly contract-defined/i,
  );
  assert.match(
    docsText,
    /undocumented `export refresh invalid-contract` mappings must remain blocked from implementation/i,
  );
  assert.match(apiIndexText, /return errorResponse\(422, error\.code, \{/);
  assert.match(apiIndexText, /ERR_EXPORT_PACKAGE_BUNDLE_ARCHIVE_INVALID/);
  assert.match(apiIndexText, /ERR_EXPORT_PACKAGE_BUNDLE_ARCHIVE_ARTIFACT_INVALID/);
  assert.match(apiIndexText, /ERR_EXPORT_PACKAGE_BUNDLE_MANIFEST_INVALID/);
  assert.match(apiIndexText, /ERR_EXPORT_PACKAGE_JSON_ARTIFACT_INVALID/);
  assert.match(apiIndexText, /ERR_EXPORT_PACKAGE_MARKDOWN_ARTIFACT_INVALID/);
  assert.match(apiIndexText, /ERR_EXPORT_PACKAGE_PDF_ARTIFACT_INVALID/);
  assert.match(apiIndexText, /ERR_EXPORT_PACKAGE_DOCX_ARTIFACT_INVALID/);
  assert.match(apiIndexText, /ERR_PROFILE_DOSSIER_SNAPSHOT_INVALID/);
});
