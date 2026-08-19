import { access } from "node:fs/promises";
import { constants } from "node:fs";

const requiredPaths = [
  "apps/api",
  "apps/api/src/index.js",
  "packages/governance",
  "packages/governance/package.json",
  "packages/governance/src/index.js",
  "packages/schemas",
  "schemas/swe-bodelning-release-eval-run.json",
  "packages/database",
  "packages/database/package.json",
  "packages/database/src/index.js",
  "packages/database/migrations/0001_case_profile_inputs.sql",
  "packages/database/migrations/0002_release_eval_runs.sql",
  "workers/analyze",
  "schemas/swe-bodelning-profile-input.json",
];

for (const path of requiredPaths) {
  await access(path, constants.F_OK);
}

console.log("Build bootstrap check passed.");
