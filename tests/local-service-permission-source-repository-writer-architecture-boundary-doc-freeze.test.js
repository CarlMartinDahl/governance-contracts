"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const repoRoot = path.resolve(__dirname, "..");
const docPath = path.join(
  repoRoot,
  "docs",
  "LOCAL_SERVICE_PERMISSION_SOURCE_REPOSITORY_WRITER_ARCHITECTURE_BOUNDARY_v1.md",
);
const doc = fs.readFileSync(docPath, "utf8");
const lines = doc.split(/\r?\n/u);

const requiredHeadings = [
  "## 1. Status and classification",
  "## 2. Purpose",
  "## 3. Accepted tracked baseline",
  "## 4. Scope",
  "## 5. Exact permission relation",
  "## 6. Structural evidence is not authority",
  "## 7. Governed permission administration",
  "## 8. Approval and execution separation",
  "## 9. Single authoritative writer",
  "## 10. Versioned current-state repository",
  "## 11. Non-rewriting lifecycle history",
  "## 12. Logical transition boundary",
  "## 13. Stale writes, conflicts, and unknown outcomes",
  "## 14. Exact scope, no wildcards, and no inheritance",
  "## 15. Repository ownership and direct-access prohibition",
  "## 16. Read-only resolution and downstream evaluation",
  "## 17. Failure and availability semantics",
  "## 18. Restart, restore, and recovery",
  "## 19. Bootstrap and emergency reduction",
  "## 20. Privacy and minimization",
  "## 21. Audit boundary",
  "## 22. Architecture matrix",
  "## 23. Future synthetic proof obligations",
  "## 24. Deferred decisions",
  "## 25. Closure-evidence model",
  "## 26. Evidence and provenance",
  "## 27. Explicit non-authorizations",
  "## 28. Human/professional review",
];

const matrixRows = [
  "Exact permission relation",
  "Permission administration",
  "Approval and execution separation",
  "Authoritative source",
  "Single authoritative writer",
  "Versioned current state",
  "Lifecycle history",
  "Transition boundary",
  "Concurrency and stale writes",
  "Repository access",
  "Read-only resolver",
  "Current-request evaluator",
  "Process authentication",
  "Restart, restore, and recovery",
  "Audit evidence",
  "Runtime enforcement",
];

function occurrences(haystack, needle) {
  return haystack.split(needle).length - 1;
}

function sectionText(heading) {
  const start = lines.findIndex((line) => line === heading);
  assert.notEqual(start, -1, heading);
  const end = lines.findIndex(
    (line, index) => index > start && /^## \d+\. /u.test(line),
  );
  return lines.slice(start, end === -1 ? lines.length : end).join("\n");
}

test("exact title and top status/classification/posture literals", () => {
  assert.equal(
    lines[0],
    "# Local Service Permission Source, Repository, and Writer Architecture Boundary v1",
  );
  [
    "**Status:** `DOCS_ONLY_ARCHITECTURE_BOUNDARY`",
    "**Evidence classification:** `DOCS_ONLY`",
    "**Implementation posture:** `NOT_IMPLEMENTED`",
    "**Runtime posture:** `NOT_RUNTIME_ENFORCEMENT`",
    "**Authority posture:** `NO_PERMISSION_AUTHORITY_CREATED`",
  ].forEach((literal) => assert.equal(doc.includes(literal), true, literal));
});

test("exact 28 second-level headings, exact order, no duplicate headings", () => {
  const headings = lines.filter((line) => /^## \d+\. /u.test(line));

  assert.deepEqual(headings, requiredHeadings);
  requiredHeadings.forEach((heading) => {
    assert.equal(occurrences(doc, heading), 1, heading);
  });
});

test("accepted PR #76 and PR #77 tracked-baseline references", () => {
  const baseline = sectionText("## 3. Accepted tracked baseline");

  [
    "docs/LOCAL_SERVICE_AUTHORIZATION_ARCHITECTURE_BOUNDARY_v1.md",
    "packages/governance/src/local-service-permission-current-state-evidence-contract.js",
    "LOCAL_SERVICE_AUTHORIZATION_ARCHITECTURE_BOUNDARY_V1_DOCS_ONLY_NO_IMPLEMENTATION",
    "MERGED_AS_LOCAL_SERVICE_PERMISSION_CURRENT_STATE_EVIDENCE_CONTRACT_SCHEMA_VALIDATOR_AFTER_PR76",
    "Conversation semantic locks are planning context",
  ].forEach((literal) => assert.match(baseline, new RegExp(literal, "u")));
});

test("exact permission relation and no-wildcard/no-inheritance/no-portable-grant semantics", () => {
  const section = sectionText("## 5. Exact permission relation");

  [
    "one exact caller process",
    "one exact intended service recipient",
    "one exact service operation",
    "one exact request purpose",
    "Wildcard caller",
    "wildcard recipient",
    "wildcard operation",
    "wildcard purpose",
    "all-operations permission",
    "inheritance",
    "portable grants",
    "fallback authority",
  ].forEach((literal) => assert.match(section, new RegExp(literal, "u")));
});

test("structural evidence, source reference, version reference, lifecycle declaration, history, and audit are not authority", () => {
  const section = sectionText("## 6. Structural evidence is not authority");

  [
    "PR #77-valid evidence is structural only",
    "Source references are not verified sources",
    "Version references are not verified currentness",
    "Lifecycle declarations are not lifecycle truth",
    "Repository storage is not authority",
    "History is not authority",
    "Audit is not authority",
  ].forEach((literal) => assert.match(section, new RegExp(literal, "u")));
});

test("governed administration, self-approval prohibition, independent positive approval, and approval/execution separation", () => {
  const administration = sectionText(
    "## 7. Governed permission administration",
  );
  const separation = sectionText("## 8. Approval and execution separation");

  [
    "logically separate governed permission-administration authority",
    "Self-approval is prohibited",
    "Positive widening requires independent approval",
    "Positive restoration requires independent approval",
    "Recovery is separate from ordinary administration",
    "Emergency reduction does not restore positive authority",
  ].forEach((literal) =>
    assert.match(administration, new RegExp(literal, "u")),
  );
  assert.match(separation, /Approval and execution are separate boundaries/u);
  assert.match(separation, /Approval does not itself mutate current state/u);
});

test("exactly one logical authoritative writer and prohibited hidden-writer paths", () => {
  const section = sectionText("## 9. Single authoritative writer");

  [
    "Exactly one logical authoritative writer",
    "Caller writes",
    "API route writes",
    "API self-granting",
    "evaluator self-granting",
    "audit writes",
    "configuration authority",
    "fixture authority",
    "multi-writer current-state mutation",
    "No writer component, function, class, module, process, endpoint, or API",
  ].forEach((literal) => assert.match(section, new RegExp(literal, "u")));
});

test("versioned current state and non-rewriting lifecycle-history separation", () => {
  const current = sectionText("## 10. Versioned current-state repository");
  const history = sectionText("## 11. Non-rewriting lifecycle history");

  [
    "Current state must be versioned",
    "Exactly one current version",
    "one exact relation scope",
    "Positive reliance may rest only on governed current state",
  ].forEach((literal) => assert.match(current, new RegExp(literal, "u")));
  [
    "Lifecycle history is non-rewriting",
    "separate from current authority",
    "History alone is never current authority",
    "Correction is a new governed transition",
    "Rollback is a new governed transition",
    "Recovery is a new governed transition",
    "Historical records cannot reactivate a permission",
  ].forEach((literal) => assert.match(history, new RegExp(literal, "u")));
});

test("exact logical transition-boundary concepts", () => {
  const section = sectionText("## 12. Logical transition boundary");

  [
    "expected current version",
    "transition declaration",
    "resulting version",
    "writer provenance",
    "transaction outcome",
    "corresponding history entry",
    "selects no field names",
    "no implementation mechanics",
  ].forEach((literal) => assert.match(section, new RegExp(literal, "u")));
});

test("stale-write, duplicate, overlap, conflict, partial-transition, unknown outcome, and current/history mismatch fail-closed semantics", () => {
  const section = sectionText(
    "## 13. Stale writes, conflicts, and unknown outcomes",
  );

  [
    "Stale write",
    "concurrent conflict",
    "duplicate current record",
    "overlapping current record",
    "unknown transaction completion",
    "partial transition",
    "current/history mismatch",
    "fail closed",
  ].forEach((literal) => assert.match(section, new RegExp(literal, "u")));
});

test("repository ownership, no direct API access, no direct caller access, and no direct non-owner cross-process store access", () => {
  const section = sectionText(
    "## 15. Repository ownership and direct-access prohibition",
  );

  [
    "Logical authority ownership remains separate from storage placement",
    "Physical co-location does not imply shared authority",
    "Direct caller store access",
    "direct API route store access",
    "direct non-owner write access",
    "direct cross-process store access by non-owners",
    "raw repository handles for consumers",
  ].forEach((literal) => assert.match(section, new RegExp(literal, "u")));
});

test("resolver, sanitized result, process authentication, evaluator, and runtime enforcement remain downstream and uncreated", () => {
  const section = sectionText(
    "## 16. Read-only resolution and downstream evaluation",
  );

  [
    "Trusted read-only resolution",
    "minimized sanitized resolver result",
    "process-authenticated request boundary",
    "current-request evaluation",
    "runtime service authorization remain downstream",
    "This document creates none of them",
  ].forEach((literal) => assert.match(section, new RegExp(literal, "u")));
});

test("restart, cache, backup, restore, recovery, bootstrap, retirement, and emergency-reduction semantics", () => {
  const restart = sectionText("## 18. Restart, restore, and recovery");
  const bootstrap = sectionText("## 19. Bootstrap and emergency reduction");

  [
    "Restart does not preserve uncertain authority",
    "Cache is not authority",
    "Backup is not authority",
    "Stale backup cannot reactivate revoked permission",
    "Incomplete restore fails closed",
    "Restored state requires reconciliation",
    "Recovery is a governed transition",
  ].forEach((literal) => assert.match(restart, new RegExp(literal, "u")));
  [
    "Bootstrap is not created",
    "narrow",
    "independently approved",
    "single-use",
    "replay-resistant",
    "retired",
    "Failed retirement blocks positive reliance",
    "Emergency automation is reduction-only by default",
    "Restoration requires ordinary governed approval",
  ].forEach((literal) => assert.match(bootstrap, new RegExp(literal, "u")));
});

test("privacy, minimization, audit-as-evidence-only, and prohibited sensitive concepts", () => {
  const privacy = sectionText("## 20. Privacy and minimization");
  const audit = sectionText("## 21. Audit boundary");

  [
    "minimized opaque references",
    "non-sensitive currentness",
    "credentials",
    "tokens",
    "keys",
    "certificates",
    "secrets",
    "provider payloads",
    "raw configuration",
    "full permission records",
    "full lifecycle history",
    "administrator notes",
    "approval identities",
    "recovery secrets",
    "human roles",
    "human permissions",
    "tenant/case membership",
    "resource placement",
    "domain authorization",
    "access-grant decisions",
  ].forEach((literal) => assert.match(privacy, new RegExp(literal, "u")));
  [
    "Future audit may evidence events",
    "cannot create permission authority",
    "become current state",
    "prove currentness",
    "authorize a request",
    "reactivate a permission",
    "substitute for repository truth",
  ].forEach((literal) => assert.match(audit, new RegExp(literal, "u")));
});

test("architecture matrix exact header, exact 16 row labels/order, and every final cell exactly No", () => {
  const section = sectionText("## 22. Architecture matrix");
  const tableLines = section
    .split(/\r?\n/u)
    .filter((line) => line.startsWith("|"));

  assert.equal(
    tableLines[0],
    "| Boundary area | Required invariant | Current tracked evidence | Future dependency | Authority created by this document |",
  );
  assert.equal(tableLines[1], "| --- | --- | --- | --- | --- |");
  assert.equal(tableLines.length, 18);

  const bodyRows = tableLines.slice(2);
  assert.deepEqual(
    bodyRows.map((line) => line.split("|")[1].trim()),
    matrixRows,
  );
  bodyRows.forEach((line) => {
    const cells = line.split("|").slice(1, -1).map((cell) => cell.trim());

    assert.equal(cells.length, 5);
    assert.ok(
      [
        "DOCS_ONLY",
        "SCHEMA_VALIDATOR_ENFORCED_FOR_EXPORTED_TRACKED_SCHEMA_VALIDATORS_ONLY",
        "UNKNOWN_NOT_EVIDENCED",
        "NOT_AUTHORIZED",
      ].includes(cells[2]),
      cells[2],
    );
    assert.equal(cells[4], "No", line);
  });
});

test("deferred decisions, closure-evidence model, explicit non-authorizations, human/professional review sentence, and exact final marker", () => {
  const deferred = sectionText("## 24. Deferred decisions");
  const closure = sectionText("## 25. Closure-evidence model");
  const nonAuthorizations = sectionText("## 27. Explicit non-authorizations");

  [
    "organizational role names",
    "component names",
    "process names",
    "public symbols",
    "contract names",
    "evidence-kind names",
    "field names",
    "lifecycle enum tokens",
    "error codes",
    "store product",
    "database",
    "table",
    "migration",
    "transaction library",
    "cache",
    "process placement",
    "API",
    "RPC",
    "transport",
    "credential",
    "timeout",
    "retention",
    "deletion",
    "encryption",
    "implementation",
  ].forEach((literal) => assert.match(deferred, new RegExp(literal, "u")));
  [
    "Conversation semantic lock",
    "DOCS_ONLY document",
    "schema-valid evidence",
    "focused test",
    "CI success",
    "merge provenance",
    "package export",
    "store-product choice",
    "database choice",
    "do not close this boundary",
  ].forEach((literal) => assert.match(closure, new RegExp(literal, "u")));
  [
    "permission",
    "permission transition",
    "permission authority",
    "permission-administration role",
    "approval",
    "source implementation",
    "repository",
    "store",
    "database",
    "schema",
    "table",
    "migration",
    "writer",
    "reader",
    "resolver",
    "evaluator",
    "lookup",
    "registry",
    "policy engine",
    "process authentication",
    "service authorization",
    "access grant",
    "human RBAC",
    "tenant/case authority",
    "domain authorization",
    "route integration",
    "middleware",
    "persistence",
    "audit emission",
    "audit storage",
    "provider routing",
    "external-use authorization",
    "product approval",
    "security finding",
    "severity",
    "remediation",
    "technical sign-off",
    "runtime certification",
    "release approval",
    "blocker closure",
    "legal conclusion",
    "clinical conclusion",
    "evidentiary conclusion",
    "case-truth conclusion",
  ].forEach((literal) =>
    assert.match(nonAuthorizations, new RegExp(literal, "u")),
  );
  assert.match(doc, /Human\/professional review remains required\./u);
  assert.equal(
    doc.trimEnd().endsWith(
      "LOCAL_SERVICE_PERMISSION_SOURCE_REPOSITORY_WRITER_ARCHITECTURE_BOUNDARY_V1_DOCS_ONLY_NO_IMPLEMENTATION",
    ),
    true,
  );
});
