"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const candidateSchema = require("../schemas/controlled-synthetic-red-team-result-envelope.json");
const resultSchema = require("../schemas/controlled-synthetic-red-team-result-envelope-validator-result.json");
const validatorModule = require("../packages/schemas/src/controlled-synthetic-red-team-result-envelope-validator.js");
const packageSchemas = require("../packages/schemas/src/index.js");

const { validateControlledSyntheticRedTeamResultEnvelope } = validatorModule;
const REQUIRED_FIELDS = candidateSchema.required;
const ROW_FIELDS = [
  "caseId",
  "outputType",
  "actionClass",
  "escalationTarget",
  "safeNextAction",
];
const CASE_ROWS = candidateSchema.oneOf.map((branch) =>
  Object.fromEntries(
    ROW_FIELDS.map((field) => [field, branch.properties[field].const]),
  ),
);
const RESULT_IDENTITY = {
  contractKind: resultSchema.properties.contractKind.const,
  version: resultSchema.properties.version.const,
};
const helperPath = path.join(
  __dirname,
  "..",
  "packages",
  "schemas",
  "src",
  "controlled-synthetic-red-team-result-envelope-validator.js",
);

function candidateForRow(row, overrides = {}) {
  return {
    contractVersion: candidateSchema.properties.contractVersion.const,
    contractKind: candidateSchema.properties.contractKind.const,
    ...row,
    syntheticCorpusPosture:
      candidateSchema.properties.syntheticCorpusPosture.const,
    realEvidencePosture: candidateSchema.properties.realEvidencePosture.const,
    humanProfessionalReviewRequired:
      candidateSchema.properties.humanProfessionalReviewRequired.const,
    ...overrides,
  };
}

function errorPairs(result) {
  return result.errors.map((error) => [error.code, error.path]);
}

function expectedSuccessResult() {
  return {
    valid: true,
    contractKind: RESULT_IDENTITY.contractKind,
    version: RESULT_IDENTITY.version,
    errors: [],
  };
}

function assertResultMatchesTrackedSchema(result) {
  assert.deepEqual(Object.keys(result), resultSchema.required);
  assert.equal(typeof result.valid, "boolean");
  assert.equal(result.contractKind, resultSchema.properties.contractKind.const);
  assert.equal(result.version, resultSchema.properties.version.const);
  assert.equal(Array.isArray(result.errors), true);

  const itemSchema = resultSchema.properties.errors.items;
  const pairs = new Set();
  for (const error of result.errors) {
    assert.deepEqual(Object.keys(error), itemSchema.required);
    assert.equal(typeof error.code, "string");
    assert.equal(typeof error.path, "string");

    const matchingBranches = itemSchema.oneOf.filter((branch) => {
      const codeMatches = branch.properties.code.const === error.code;
      const pathContract = branch.properties.path;
      const pathMatches = Object.hasOwn(pathContract, "const")
        ? pathContract.const === error.path
        : pathContract.enum.includes(error.path);
      return codeMatches && pathMatches;
    });
    assert.equal(matchingBranches.length, 1);

    const pair = `${error.code}\u0000${error.path}`;
    assert.equal(pairs.has(pair), false);
    pairs.add(pair);
  }

  assert.equal(result.valid, result.errors.length === 0);
}

test("exports exactly one unary validator with a reference-equivalent package-index export", () => {
  assert.deepEqual(Object.keys(validatorModule), [
    "validateControlledSyntheticRedTeamResultEnvelope",
  ]);
  assert.equal(typeof validateControlledSyntheticRedTeamResultEnvelope, "function");
  assert.equal(validateControlledSyntheticRedTeamResultEnvelope.length, 1);
  assert.strictEqual(
    packageSchemas.validateControlledSyntheticRedTeamResultEnvelope,
    validateControlledSyntheticRedTeamResultEnvelope,
  );
});

test("accepts all 26 schema-derived canonical rows with exact frozen results", () => {
  assert.equal(CASE_ROWS.length, 26);

  for (const row of CASE_ROWS) {
    const result = validateControlledSyntheticRedTeamResultEnvelope(
      candidateForRow(row),
    );

    assert.deepEqual(result, expectedSuccessResult(), row.caseId);
    assert.equal(Object.isFrozen(result), true, row.caseId);
    assert.equal(Object.isFrozen(result.errors), true, row.caseId);
  }
});

test("short-circuits every non-plain root to one exact root error", () => {
  const invalidRoots = [
    null,
    undefined,
    true,
    1,
    "candidate",
    Symbol("candidate"),
    () => {},
    [],
    new Date(0),
    /candidate/u,
  ];

  for (const candidate of invalidRoots) {
    assert.deepEqual(validateControlledSyntheticRedTeamResultEnvelope(candidate), {
      valid: false,
      contractKind: RESULT_IDENTITY.contractKind,
      version: RESULT_IDENTITY.version,
      errors: [{ code: "INVALID_TYPE", path: "$" }],
    });
  }
});

test("accepts a null-prototype canonical candidate", () => {
  const candidate = Object.assign(
    Object.create(null),
    candidateForRow(CASE_ROWS[0]),
  );

  assert.deepEqual(
    validateControlledSyntheticRedTeamResultEnvelope(candidate),
    expectedSuccessResult(),
  );
});

test("reports every missing field in exact candidate-schema order", () => {
  const result = validateControlledSyntheticRedTeamResultEnvelope({});

  assert.deepEqual(
    errorPairs(result),
    REQUIRED_FIELDS.map((field) => ["MISSING_FIELD", `$.${field}`]),
  );
});

test("collapses all unknown own keys without key or value echo", () => {
  const candidate = candidateForRow(CASE_ROWS[0]);
  const secretSymbol = Symbol("SECRET_SYMBOL_KEY");
  candidate.SECRET_ENUMERABLE_KEY = "SECRET_ENUMERABLE_VALUE";
  candidate[secretSymbol] = "SECRET_SYMBOL_VALUE";
  Object.defineProperty(candidate, "SECRET_HIDDEN_KEY", {
    value: "SECRET_HIDDEN_VALUE",
    enumerable: false,
  });
  candidate.self = candidate;

  const result = validateControlledSyntheticRedTeamResultEnvelope(candidate);
  const serialized = JSON.stringify(result);

  assert.deepEqual(errorPairs(result), [["UNKNOWN_FIELD", "$"]]);
  for (const secret of [
    "SECRET_ENUMERABLE_KEY",
    "SECRET_ENUMERABLE_VALUE",
    "SECRET_SYMBOL_KEY",
    "SECRET_SYMBOL_VALUE",
    "SECRET_HIDDEN_KEY",
    "SECRET_HIDDEN_VALUE",
  ]) {
    assert.equal(serialized.includes(secret), false);
  }
});

test("treats known accessors as invalid data values without invoking them", () => {
  const candidate = candidateForRow(CASE_ROWS[0]);
  let getterCalls = 0;
  let setterCalls = 0;

  Object.defineProperty(candidate, "outputType", {
    enumerable: true,
    get() {
      getterCalls += 1;
      throw new Error("getter must not run");
    },
  });
  Object.defineProperty(candidate, "humanProfessionalReviewRequired", {
    enumerable: true,
    set() {
      setterCalls += 1;
      throw new Error("setter must not run");
    },
  });

  const result = validateControlledSyntheticRedTeamResultEnvelope(candidate);

  assert.equal(getterCalls, 0);
  assert.equal(setterCalls, 0);
  assert.deepEqual(errorPairs(result), [
    ["INVALID_TYPE", "$.outputType"],
    ["INVALID_BOOLEAN", "$.humanProfessionalReviewRequired"],
  ]);
});

test("orders missing unknown type and value errors by the four frozen phases", () => {
  const candidate = candidateForRow(CASE_ROWS[0], {
    contractKind: 7,
    caseId: "SECRET_NON_CANONICAL_CASE",
    outputType: "SECRET_NON_CANONICAL_OUTPUT",
    humanProfessionalReviewRequired: false,
  });
  delete candidate.contractVersion;
  candidate.SECRET_UNKNOWN = "SECRET_UNKNOWN_VALUE";

  const result = validateControlledSyntheticRedTeamResultEnvelope(candidate);

  assert.deepEqual(errorPairs(result), [
    ["MISSING_FIELD", "$.contractVersion"],
    ["UNKNOWN_FIELD", "$"],
    ["INVALID_TYPE", "$.contractKind"],
    ["INVALID_ENUM", "$.caseId"],
    ["INVALID_ENUM", "$.outputType"],
    ["INVALID_BOOLEAN", "$.humanProfessionalReviewRequired"],
  ]);
  assert.equal(JSON.stringify(result).includes("SECRET_"), false);
});

test("orders all known type failures by required field order", () => {
  const candidate = Object.fromEntries(
    REQUIRED_FIELDS.map((field) => [field, null]),
  );

  assert.deepEqual(
    errorPairs(validateControlledSyntheticRedTeamResultEnvelope(candidate)),
    REQUIRED_FIELDS.map((field) => [
      field === "humanProfessionalReviewRequired"
        ? "INVALID_BOOLEAN"
        : "INVALID_TYPE",
      `$.${field}`,
    ]),
  );
});

test("checks fixed string and boolean literals in required field order", () => {
  const result = validateControlledSyntheticRedTeamResultEnvelope(
    candidateForRow(CASE_ROWS[0], {
      contractVersion: "v2",
      contractKind: "OTHER_CONTRACT",
      syntheticCorpusPosture: "REAL_CORPUS",
      realEvidencePosture: "REAL_EVIDENCE",
      humanProfessionalReviewRequired: false,
    }),
  );

  assert.deepEqual(errorPairs(result), [
    ["INVALID_ENUM", "$.contractVersion"],
    ["INVALID_ENUM", "$.contractKind"],
    ["INVALID_ENUM", "$.syntheticCorpusPosture"],
    ["INVALID_ENUM", "$.realEvidencePosture"],
    ["INVALID_BOOLEAN", "$.humanProfessionalReviewRequired"],
  ]);
});

test("rejects every cross-row mapping mismatch in row-field order", () => {
  const sourceRow = CASE_ROWS[0];
  const differentRow = CASE_ROWS.find((row) =>
    ROW_FIELDS.slice(1).every((field) => row[field] !== sourceRow[field]),
  );
  assert.ok(differentRow);

  const result = validateControlledSyntheticRedTeamResultEnvelope(
    candidateForRow(sourceRow, {
      outputType: differentRow.outputType,
      actionClass: differentRow.actionClass,
      escalationTarget: differentRow.escalationTarget,
      safeNextAction: differentRow.safeNextAction,
    }),
  );

  assert.deepEqual(errorPairs(result), [
    ["INVALID_ENUM", "$.outputType"],
    ["INVALID_ENUM", "$.actionClass"],
    ["INVALID_ENUM", "$.escalationTarget"],
    ["INVALID_ENUM", "$.safeNextAction"],
  ]);
});

test("deduplicates one globally invalid and row-mismatched value pair", () => {
  const result = validateControlledSyntheticRedTeamResultEnvelope(
    candidateForRow(CASE_ROWS[0], {
      outputType: "SECRET_INVALID_AND_MISMATCHED_OUTPUT",
    }),
  );

  assert.deepEqual(errorPairs(result), [["INVALID_ENUM", "$.outputType"]]);
  assert.equal(
    JSON.stringify(result).includes("SECRET_INVALID_AND_MISMATCHED_OUTPUT"),
    false,
  );
});

test("returns deterministic errors independent of candidate insertion order", () => {
  const canonical = candidateForRow(CASE_ROWS[0], {
    contractVersion: "v2",
    safeNextAction: "SECRET_INVALID_ACTION",
    humanProfessionalReviewRequired: false,
  });
  const reversed = Object.fromEntries(Object.entries(canonical).reverse());

  assert.deepEqual(
    validateControlledSyntheticRedTeamResultEnvelope(reversed),
    validateControlledSyntheticRedTeamResultEnvelope(canonical),
  );
});

test("does not mutate candidates and recursively freezes failure results", () => {
  const candidate = candidateForRow(CASE_ROWS[0], {
    outputType: "SECRET_INVALID_OUTPUT",
  });
  const before = structuredClone(candidate);

  const result = validateControlledSyntheticRedTeamResultEnvelope(candidate);

  assert.deepEqual(candidate, before);
  assert.equal(Object.isFrozen(candidate), false);
  assert.equal(Object.isFrozen(result), true);
  assert.equal(Object.isFrozen(result.errors), true);
  assert.equal(Object.isFrozen(result.errors[0]), true);
  assert.throws(() => {
    result.errors.push({ code: "UNKNOWN_FIELD", path: "$" });
  }, TypeError);
  assert.throws(() => {
    result.errors[0].path = "$.caseId";
  }, TypeError);
});

test("success and failure results match the tracked result-schema structure", () => {
  const success = validateControlledSyntheticRedTeamResultEnvelope(
    candidateForRow(CASE_ROWS[0]),
  );
  const failure = validateControlledSyntheticRedTeamResultEnvelope({
    SECRET_UNKNOWN: "SECRET_UNKNOWN_VALUE",
  });

  assertResultMatchesTrackedSchema(success);
  assertResultMatchesTrackedSchema(failure);
});

test("loads only the two tracked schemas and contains no integration behavior", () => {
  const source = fs.readFileSync(helperPath, "utf8");
  const staticRequires = source.match(/require\("[^"]+"\)/gu) ?? [];

  assert.deepEqual(staticRequires, [
    'require("../../../schemas/controlled-synthetic-red-team-result-envelope.json")',
    'require("../../../schemas/controlled-synthetic-red-team-result-envelope-validator-result.json")',
  ]);

  for (const forbidden of [
    /\brequire\(["']node:fs["']\)/u,
    /\bfetch\b/iu,
    /\bhttps?\b/iu,
    /\bprocess\b/iu,
    /\benv(?:ironment)?\b/iu,
    /\bprovider\b/iu,
    /\bmodel\b/iu,
    /\bpersistence\b/iu,
    /\bapi\b/iu,
    /\bdispatch\b/iu,
    /\bconsole\b/iu,
    /\blog(?:ger|ging)?\b/iu,
    /\btelemetry\b/iu,
  ]) {
    assert.doesNotMatch(source, forbidden);
  }
});
