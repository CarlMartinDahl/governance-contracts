const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const {
  getCaseProfileInputs,
  upsertCaseProfileInputs,
} = require("../packages/database/src/index.js");

const docsPath = path.join(__dirname, "..", "docs", "API_CONTRACTS_GOVERNANCE_v1.md");
const docsText = fs.readFileSync(docsPath, "utf8");
const databaseIndexPath = path.join(
  __dirname,
  "..",
  "packages",
  "database",
  "src",
  "index.js",
);
const databaseIndexText = fs.readFileSync(databaseIndexPath, "utf8");

function createStorageDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "governance-contracts-db-"));
}

function createValidSnapshot() {
  return {
    jurisdiction_profile_key: "SWE_BODELNING",
    profile_input_summary: {
      required_lane_count: 3,
      lanes_with_value_count: 2,
      missing_value_lane_keys: ["shared_intent"],
    },
    profile_input_lane_snapshot: {
      economic_contribution: {
        has_value: true,
        value: "documented",
        evidence_object_ids: ["evidence-1", "evidence-2"],
      },
      shared_use: {
        has_value: true,
        value: "residence",
        evidence_object_ids: ["evidence-3"],
      },
      shared_intent: {
        has_value: false,
        value: null,
        evidence_object_ids: [],
      },
    },
  };
}

test("docs freeze the case-level persisted profile_inputs snapshot seam as a distinct canonical persistence seam", () => {
  assert.match(
    docsText,
    /Case-Level Persisted Profile Inputs Snapshot Seam Freeze/i,
  );
  assert.match(
    docsText,
    /case-level persisted `profile_inputs` snapshot seam is now frozen as the canonical persistence boundary for this exact stored surface/i,
  );
  assert.match(
    docsText,
    /only currently evidenced persistence surfaces in this freeze are `getCaseProfileInputs` and `upsertCaseProfileInputs`/i,
  );
  assert.match(
    docsText,
    /persisted case-level canonical profile input snapshot storage\/read behavior/i,
  );
  assert.match(
    docsText,
    /persisted read via the existing `getCaseProfileInputs` boundary/i,
  );
  assert.match(
    docsText,
    /persisted update\/upsert via the existing `upsertCaseProfileInputs` boundary/i,
  );
  assert.match(
    docsText,
    /existing shared profile input validation\/canonicalization on write before persistence/i,
  );
  assert.match(
    docsText,
    /separate from the thin authenticated `GET \/cases\/:caseId\/profile-inputs` read seam, the thin authenticated `PATCH \/cases\/:caseId\/profile-inputs` write seam, and the thin authenticated `GET \/cases\/:caseId\/profile-dossier` read\/projection seam/i,
  );
  assert.match(
    docsText,
    /does not itself define route-edge authentication or API error-envelope behavior/i,
  );
  assert.match(
    docsText,
    /does not itself define `profile_dossier` projection semantics, `release_eval` persistence semantics, `export_package` persistence semantics, or broader governance derivation\/rebuild ownership beyond the exact stored snapshot boundary already evidenced here/i,
  );
  assert.match(
    docsText,
    /no undocumented broadening of this persistence seam into route behavior, dossier projection, release-eval\/export-package persistence, or broader derivation\/rebuild work should be introduced/i,
  );
  assert.match(
    docsText,
    /seam should remain a thin case-level persisted canonical profile input snapshot boundary unless explicit contract detail changes/i,
  );
  assert.match(
    docsText,
    /does not change runtime behavior, persistence semantics, schema behavior, or fail-closed behavior/i,
  );

  assert.match(databaseIndexText, /async function getCaseProfileInputs\(/);
  assert.match(databaseIndexText, /async function upsertCaseProfileInputs\(/);
  assert.match(
    databaseIndexText,
    /validateProfileInputSnapshot\(profileInputSnapshot\);/,
  );
  assert.match(
    databaseIndexText,
    /const canonicalSnapshot = deriveProfileInputSnapshot\(profileInputSnapshot\);/,
  );
  assert.match(
    databaseIndexText,
    /hasJurisdictionProfileCapability\(\s+profileInputSnapshot\?\.jurisdiction_profile_key,\s+"profile_inputs",/s,
  );
  assert.match(
    databaseIndexText,
    /const record = normalizeRecord\(caseId, canonicalSnapshot, store\[caseId\]\);/,
  );
  assert.match(
    databaseIndexText,
    /return \{\s+jurisdiction_profile_key: record\.jurisdiction_profile_key,\s+profile_input_summary: record\.profile_input_summary,\s+profile_input_lane_snapshot: record\.profile_input_lane_snapshot,\s+\};/s,
  );
});

test("persisted roundtrip for a valid SWE_BODELNING profile input snapshot", async () => {
  const storageDir = createStorageDir();
  const input = createValidSnapshot();

  const persisted = await upsertCaseProfileInputs("case-123", input, { storageDir });
  const roundtrip = await getCaseProfileInputs("case-123", { storageDir });

  assert.deepEqual(persisted, input);
  assert.deepEqual(roundtrip, input);
});

test("invalid input shape is rejected before persistence", async () => {
  const storageDir = createStorageDir();
  const invalidInput = createValidSnapshot();

  delete invalidInput.profile_input_summary;

  await assert.rejects(
    upsertCaseProfileInputs("case-123", invalidInput, { storageDir }),
    (error) => {
      assert.equal(error.code, "ERR_PROFILE_INPUT_INVALID");
      return true;
    },
  );

  const roundtrip = await getCaseProfileInputs("case-123", { storageDir });
  assert.equal(roundtrip, null);
});

test("invalid evidence-reference field shape is rejected before persistence", async () => {
  const storageDir = createStorageDir();
  const invalidInput = createValidSnapshot();

  invalidInput.profile_input_lane_snapshot.shared_use.evidence_object_ids = "evidence-3";

  await assert.rejects(
    upsertCaseProfileInputs("case-124", invalidInput, { storageDir }),
    (error) => {
      assert.equal(error.code, "ERR_PROFILE_INPUT_INVALID");
      assert.equal(
        error.details.field,
        "profile_input_lane_snapshot.shared_use.evidence_object_ids",
      );
      return true;
    },
  );

  const roundtrip = await getCaseProfileInputs("case-124", { storageDir });
  assert.equal(roundtrip, null);
});

test("non-SWE_BODELNING profile data is rejected at the persistence boundary", async () => {
  const storageDir = createStorageDir();
  const invalidInput = createValidSnapshot();
  invalidInput.jurisdiction_profile_key = "SWE_OTHER";

  await assert.rejects(
    upsertCaseProfileInputs("case-123", invalidInput, { storageDir }),
    (error) => {
      assert.equal(error.code, "ERR_UNSUPPORTED_JURISDICTION_PROFILE");
      assert.equal(error.details.jurisdiction_profile_key, "SWE_OTHER");
      return true;
    },
  );
});

test("stored profile_input_summary and profile_input_lane_snapshot preserve the expected shape", async () => {
  const storageDir = createStorageDir();
  const input = createValidSnapshot();

  await upsertCaseProfileInputs("case-456", input, { storageDir });

  const persisted = await getCaseProfileInputs("case-456", { storageDir });

  assert.deepEqual(persisted.profile_input_summary, input.profile_input_summary);
  assert.deepEqual(
    persisted.profile_input_lane_snapshot,
    input.profile_input_lane_snapshot,
  );
});

test("no readiness behavior changes are introduced by this slice", () => {
  const workerEntries = fs.readdirSync(path.join(__dirname, "..", "workers", "analyze"));
  assert.deepEqual(workerEntries, [".gitkeep"]);
});
