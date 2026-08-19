import { readFile } from "node:fs/promises";

const packageJson = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8"));

for (const scriptName of ["test", "lint", "build", "release:scan"]) {
  if (!packageJson.scripts?.[scriptName]) {
    throw new Error(`Missing required script: ${scriptName}`);
  }
}

console.log("Lint bootstrap check passed.");
