const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { test } = require("node:test");

const documentPath = path.join(
  __dirname,
  "..",
  "docs",
  "LOCAL_SERVICE_PERMISSION_TRUSTED_READER_IDENTITY_AUTHENTICATION_AUTHORIZATION_ARCHITECTURE_BOUNDARY_v1.md",
);

const documentText = fs.readFileSync(documentPath, "utf8");
const sourceText = fs.readFileSync(__filename, "utf8");

const title = "# Local Service Permission Trusted Reader Identity, Authentication, and Authorization Architecture Boundary v1";
const semanticLock =
  "LOCAL_SERVICE_PERMISSION_TRUSTED_READER_IDENTITY_AUTHENTICATION_AUTHORIZATION_BOUNDARY_ARCHITECTURE_NEUTRAL_SEMANTICS_LOCKED_IN_THREAD_NO_IMPLEMENTATION";
const finalMarker =
  "DOCS_ONLY_LOCAL_SERVICE_PERMISSION_TRUSTED_READER_IDENTITY_AUTHENTICATION_AUTHORIZATION_ARCHITECTURE_BOUNDARY_V1_NO_IMPLEMENTATION_NO_AUTHORITY_CREATED";

const headingOrder = [
  "## Status and classification",
  "## Purpose",
  "## Semantic-lock provenance",
  "## Accepted architecture baseline",
  "## Exact local-service permission relation",
  "## Combined boundary and layer separation",
  "## Reader identity evidence boundary",
  "## Reader authentication evidence boundary",
  "## Reader authorization evidence boundary",
  "## Deny-by-default and fail-closed posture",
  "## Exact repository and current-request binding",
  "## Wildcard, inheritance, fallback, and portable-grant prohibition",
  "## Writer, repository-administrator, caller-process, and reader separation",
  "## Admin and support actor separation",
  "## Service and system actor separation",
  "## Audit actor separation",
  "## Human and professional reviewer separation",
  "## Repository identity and currentness relationship",
  "## Process authentication, service authorization, and access separation",
  "## Tenant, case, resource, and domain-authorization separation",
  "## Repository-read request and provenance relationship",
  "## Trusted-read occurrence boundary",
  "## Sanitized result, resolver, evaluator, and access separation",
  "## Privacy and no-raw boundary",
  "## Audit and access-log dependency",
  "## Failure and unknown-state posture",
  "## Deferred decisions",
  "## Architecture matrix",
  "## Synthetic proof obligations",
  "## Open blockers",
  "## Closure model",
  "## Explicit non-authorizations",
  "## Final marker",
];

const matrixRows = [
  "| Reader identity evidence | UNKNOWN_NOT_EVIDENCED | No | No |",
  "| Reader authentication evidence | UNKNOWN_NOT_EVIDENCED | No | No |",
  "| Reader authorization evidence | UNKNOWN_NOT_EVIDENCED | No | No |",
  "| Caller process identity | RELATED_PATTERN_ONLY | No | No |",
  "| Process authentication | UNKNOWN_NOT_EVIDENCED | No | No |",
  "| Repository identity | RELATED_PATTERN_ONLY | No | No |",
  "| Repository-currentness evidence | EXACT_TRACKED_ARTIFACT | No | No |",
  "| Permission declaration relation | RELATED_PATTERN_ONLY | No | No |",
  "| Current-request context | RELATED_PATTERN_ONLY | No | No |",
  "| Admin/support actor context | RELATED_PATTERN_ONLY | No | No |",
  "| Service/system actor context | RELATED_PATTERN_ONLY | No | No |",
  "| Repository writer | CONCEPTUAL_BOUNDARY_ONLY | No | No |",
  "| Repository administrator | CONCEPTUAL_BOUNDARY_ONLY | No | No |",
  "| Audit actor | RELATED_PATTERN_ONLY | No | No |",
  "| Human/professional reviewer | RELATED_PATTERN_ONLY | No | No |",
  "| Repository-read request | UNKNOWN_NOT_EVIDENCED | No | No |",
  "| Repository-read provenance | UNKNOWN_NOT_EVIDENCED | No | No |",
  "| Trusted-read occurrence | NOT_AUTHORIZED | No | No |",
  "| Sanitized trusted-read result | CONCEPTUAL_BOUNDARY_ONLY | No | No |",
  "| Resolver output | NOT_AUTHORIZED | No | No |",
  "| Evaluator decision | NOT_AUTHORIZED | No | No |",
  "| Service authorization | NOT_AUTHORIZED | No | No |",
  "| Access grant | NOT_AUTHORIZED | No | No |",
  "| Runtime enforcement | NOT_AUTHORIZED | No | No |",
];

function countOccurrences(haystack, needle) {
  return haystack.split(needle).length - 1;
}

function section(name) {
  const start = documentText.indexOf(name);
  assert.notEqual(start, -1);
  const next = documentText.indexOf("\n## ", start + name.length);
  return next === -1 ? documentText.slice(start) : documentText.slice(start, next);
}

function assertIncludesAll(text, fragments) {
  for (const fragment of fragments) {
    assert.match(text, new RegExp(fragment.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "u"));
  }
}

test("loads the fixed trusted-reader architecture-boundary document", () => {
  assert.equal(path.basename(documentPath), "LOCAL_SERVICE_PERMISSION_TRUSTED_READER_IDENTITY_AUTHENTICATION_AUTHORIZATION_ARCHITECTURE_BOUNDARY_v1.md");
  assert.equal(path.basename(path.dirname(documentPath)), "docs");
  assert.ok(documentText.length > 1000);
  assert.equal(documentText.endsWith("\n"), true);
});

test("freezes the exact title status and non-authorization postures", () => {
  assert.equal(countOccurrences(documentText, title), 1);
  assert.equal(documentText.startsWith(`${title}\n\n`), true);
  assertIncludesAll(documentText, [
    "**Status:** `DOCS_ONLY_ARCHITECTURE_BOUNDARY`",
    "**Evidence classification:** `DOCS_ONLY` / `PROVE_ONLY`",
    "**Implementation posture:** `NOT_IMPLEMENTED`",
    "**Runtime posture:** `NOT_RUNTIME_ENFORCEMENT`",
    "**Schema posture:** `NOT_SCHEMA_VALIDATOR_ENFORCEMENT`",
    "**Authority posture:** `NO_READER_IDENTITY_AUTHENTICATION_OR_AUTHORIZATION_AUTHORITY_CREATED`",
  ]);
});

test("preserves the exact semantic-lock marker as planning provenance only", () => {
  assert.equal(countOccurrences(documentText, semanticLock), 1);
  const semanticSection = section("## Semantic-lock provenance");
  assertIncludesAll(semanticSection, [
    "planning provenance only",
    "not implementation provenance",
    "authority provenance",
    "identity provenance",
    "authentication provenance",
    "authorization provenance",
    "trusted-read provenance",
  ]);
});

test("freezes the exact second-level heading order and uniqueness", () => {
  const headings = documentText.match(/^## .+$/gm);
  assert.deepEqual(headings, headingOrder);
  assert.equal(new Set(headings).size, headingOrder.length);
});

test("preserves the accepted PR 76 through PR 82 baseline without authority upgrade", () => {
  const baseline = section("## Accepted architecture baseline");
  assertIncludesAll(baseline, ["PR #76 through PR #82", "partial architecture and structural evidence only"]);
  assertIncludesAll(baseline, [
    "do not create a trusted reader",
    "authenticated reader identity",
    "reader authorization",
    "repository-read authority",
    "resolver",
    "evaluator",
    "service authorization",
    "access grant",
    "runtime enforcement",
  ]);
  assert.match(baseline, /Route, case, and capability evidence remains partial and surface-specific\. It is not full RBAC, full access-control, admin\/support access-control, or a global authorization model\./u);
});

test("preserves the exact five-part local-service permission relation", () => {
  const relation = section("## Exact local-service permission relation");
  assertIncludesAll(relation, [
    "caller process",
    "intended service recipient",
    "service operation",
    "request purpose",
    "permission declaration",
  ]);
});

test("keeps reader identity authentication and authorization as separate layers", () => {
  assertIncludesAll(section("## Combined boundary and layer separation"), [
    "Reader identity evidence",
    "reader authentication evidence",
    "reader authorization evidence",
    "separate layers",
  ]);
  assert.match(section("## Reader identity evidence boundary"), /unknown and not evidenced/u);
  assert.match(section("## Reader authentication evidence boundary"), /bound to the current repository-read request/u);
  assert.match(section("## Reader authorization evidence boundary"), /permitted to perform the exact repository-read request/u);
});

test("preserves deny-by-default fail-closed and request-bound posture", () => {
  assertIncludesAll(section("## Deny-by-default and fail-closed posture"), [
    "fails closed",
    "No default allow posture",
    "admin bypass",
    "support bypass",
    "fallback authorization",
  ]);
  assertIncludesAll(section("## Exact repository and current-request binding"), [
    "exact repository identity",
    "exact currentness evidence",
    "exact request context",
    "exact local-service permission relation",
    "exact read occurrence",
  ]);
});

test("prohibits wildcard inheritance fallback portable grants and self-authorization", () => {
  const wildcard = section("## Wildcard, inheritance, fallback, and portable-grant prohibition");
  assertIncludesAll(wildcard, ["Wildcards", "inheritance", "fallback matching", "portable grants", "bearer grants"]);
  assertIncludesAll(section("## Deny-by-default and fail-closed posture"), ["service self-approval"]);
});

test("separates reader writer repository administrator caller process and audit actor", () => {
  assertIncludesAll(section("## Writer, repository-administrator, caller-process, and reader separation"), [
    "repository writer",
    "repository administrator",
    "caller process",
    "trusted reader",
    "Writer authority does not imply reader authority",
  ]);
  assertIncludesAll(section("## Audit actor separation"), ["Audit actors", "does not authorize a read"]);
});

test("separates admin-support and service-system actors without bypass", () => {
  assertIncludesAll(section("## Admin and support actor separation"), [
    "Admin and support actors remain separate",
    "No admin bypass",
    "support bypass",
    "global administrative read",
  ]);
  assertIncludesAll(section("## Service and system actor separation"), [
    "Service and system actors remain separate",
    "service authorization",
    "access grant",
  ]);
});

test("separates human-professional review from technical reader authorization", () => {
  const human = section("## Human and professional reviewer separation");
  assertIncludesAll(human, [
    "Human/professional review remains required.",
    "do not by themselves authenticate a reader",
    "authorize a repository read",
    "certify runtime behavior",
  ]);
});

test("keeps repository identity and currentness unverified and fail-closed", () => {
  assertIncludesAll(section("## Repository identity and currentness relationship"), [
    "does not prove repository identity",
    "repository existence",
    "latest state",
    "freshness",
    "trusted read",
    "reader authorization",
  ]);
  assertIncludesAll(section("## Failure and unknown-state posture"), ["Unknown reader identity", "unknown repository currentness", "fail closed"]);
});

test("keeps process authentication service authorization domain authorization and access separate", () => {
  assertIncludesAll(section("## Process authentication, service authorization, and access separation"), [
    "Process authentication",
    "service authorization",
    "access grants remain separate",
    "without producing an allow decision",
  ]);
  assertIncludesAll(section("## Tenant, case, resource, and domain-authorization separation"), [
    "outside this boundary",
    "wrong-tenant decision",
    "wrong-case decision",
    "case-truth conclusion",
  ]);
});

test("keeps repository-read provenance trusted read sanitized result resolver and evaluator downstream", () => {
  assertIncludesAll(section("## Repository-read request and provenance relationship"), [
    "reader identity",
    "repository identity",
    "request binding",
    "read occurrence",
  ]);
  assertIncludesAll(section("## Trusted-read occurrence boundary"), ["not authorized", "one exact repository read"]);
  assertIncludesAll(section("## Sanitized result, resolver, evaluator, and access separation"), [
    "sanitized trusted-read result",
    "resolver output",
    "evaluator decision",
    "access result",
    "downstream concepts",
  ]);
});

test("preserves opaque-reference no-raw privacy and sensitive-data boundaries", () => {
  assertIncludesAll(section("## Privacy and no-raw boundary"), [
    "No raw private content",
    "source material",
    "provider payload",
    "token",
    "credential",
    "session secret",
    "opaque references",
    "no-content-required evidence",
  ]);
});

test("treats audit and access-log evidence as future dependency not authority", () => {
  assertIncludesAll(section("## Audit and access-log dependency"), [
    "future dependencies",
    "privileged reader attempts",
    "denied reads",
    "successful trusted-read occurrences",
    "creates no audit implementation",
    "security finding",
  ]);
});

test("freezes the exact architecture matrix rows classifications and no-authority cells", () => {
  const matrix = section("## Architecture matrix");
  assert.equal(countOccurrences(matrix, "| Boundary element | Evidence classification | Identity, authentication, or authorization established | Runtime behavior created |"), 1);
  assert.equal(countOccurrences(matrix, "| --- | --- | --- | --- |"), 1);
  for (const row of matrixRows) {
    assert.equal(countOccurrences(matrix, row), 1);
  }
  assert.equal(matrix.match(/^\| .+ \| .+ \| No \| No \|$/gm).length, matrixRows.length);
});

test("preserves synthetic proof obligations open blockers closure model and final marker", () => {
  assertIncludesAll(section("## Synthetic proof obligations"), ["fixed document path", "no-runtime behavior"]);
  assertIncludesAll(section("## Open blockers"), ["reader identity source", "reader authentication evidence", "reader authorization evidence"]);
  assertIncludesAll(section("## Closure model"), ["future tracked evidence", "not sufficient to close"]);
  assert.equal(countOccurrences(documentText, finalMarker), 1);
  assert.equal(documentText.trimEnd().endsWith(finalMarker), true);
});

test("uses a fixed read-only proof surface with no runtime network subprocess environment or file-write behavior", () => {
  const testCalls = sourceText.match(/^test\("/gm);
  assert.equal(testCalls.length, 20);
  const forbiddenSpecs = [
    {
      label: "category-1",
      patternParts: ["\\bpro", "cess\\s*\\.\\s*e", "nv\\b"],
      probes: [["pro", "cess", ".", "e", "nv"]],
    },
    {
      label: "category-2",
      patternParts: ["\\bchi", "ld_", "pro", "cess\\b"],
      probes: [["chi", "ld_", "pro", "cess"]],
    },
    {
      label: "category-3",
      patternParts: ["\\bsp", "awn", "(?:Sync)?\\s*\\("],
      probes: [
        ["sp", "awn", "("],
        ["sp", "awn", "Sync", "("],
      ],
    },
    {
      label: "category-4",
      patternParts: ["\\bex", "ec", "(?:File)?(?:Sync)?\\s*\\("],
      probes: [
        ["ex", "ec", "("],
        ["ex", "ec", "Sync", "("],
        ["ex", "ec", "File", "("],
        ["ex", "ec", "File", "Sync", "("],
      ],
    },
    {
      label: "category-5",
      patternParts: ["\\bfe", "tch\\s*\\("],
      probes: [["fe", "tch", "("]],
    },
    {
      label: "category-6",
      patternParts: ["\\bax", "ios\\b"],
      probes: [["ax", "ios"]],
    },
    {
      label: "category-7",
      patternParts: ["\\brea", "ddir", "(?:Sync)?\\b"],
      probes: [
        ["rea", "ddir"],
        ["rea", "ddir", "Sync"],
      ],
    },
    {
      label: "category-8",
      patternParts: ["\\bope", "ndir", "(?:Sync)?\\b"],
      probes: [
        ["ope", "ndir"],
        ["ope", "ndir", "Sync"],
      ],
    },
    {
      label: "category-9",
      patternParts: ["\\bgl", "ob", "(?:Sync)?\\b"],
      probes: [
        ["gl", "ob"],
        ["gl", "ob", "Sync"],
      ],
      negativeProbes: [
        ["gl", "ob", "al"],
        ["gl", "ob", "ally"],
      ],
    },
    {
      label: "category-10",
      patternParts: ["\\bwri", "te", "File", "(?:Sync)?\\b"],
      probes: [
        ["wri", "te", "File"],
        ["wri", "te", "File", "Sync"],
      ],
    },
    {
      label: "category-11",
      patternParts: ["\\bapp", "end", "File", "(?:Sync)?\\b"],
      probes: [
        ["app", "end", "File"],
        ["app", "end", "File", "Sync"],
      ],
    },
    {
      label: "category-12",
      patternParts: ["\\bcre", "ate", "Write", "Stream\\b"],
      probes: [["cre", "ate", "Write", "Stream"]],
    },
  ];
  for (const spec of forbiddenSpecs) {
    const pattern = new RegExp(spec.patternParts.join(""), "u");
    for (const probeParts of spec.probes) {
      assert.equal(pattern.test(probeParts.join("")), true, spec.label);
    }
    for (const probeParts of spec.negativeProbes || []) {
      assert.equal(pattern.test(probeParts.join("")), false, spec.label);
    }
    assert.equal(pattern.global, false, spec.label);
    assert.equal(pattern.test(sourceText), false, spec.label);
  }
  assert.match(sourceText, /node:assert\/strict/u);
  assert.match(sourceText, /node:fs/u);
  assert.match(sourceText, /node:path/u);
  assert.match(sourceText, /node:test/u);
});
