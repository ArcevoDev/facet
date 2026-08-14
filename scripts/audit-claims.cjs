const fs = require("fs");
const path = require("path");

// Actual published versions + component count.
const actual = {
  components: JSON.parse(fs.readFileSync("packages/components/package.json", "utf8")).version,
  docs: JSON.parse(fs.readFileSync("packages/docs/package.json", "utf8")).version,
  auth: JSON.parse(fs.readFileSync("packages/auth/package.json", "utf8")).version,
  layout: JSON.parse(fs.readFileSync("packages/layout/package.json", "utf8")).version,
  cli: JSON.parse(fs.readFileSync("packages/cli/package.json", "utf8")).version,
  sdk: JSON.parse(fs.readFileSync("packages/sdk/package.json", "utf8")).version,
  tokens: JSON.parse(fs.readFileSync("packages/tokens/package.json", "utf8")).version,
};
console.log("actual versions:", JSON.stringify(actual));
console.log("component count (manifest entries):", 
  (fs.readFileSync("packages/docs/src/manifest.ts", "utf8").match(/"slug":/g) || []).length);

// Landing claims.
const landing = fs.readFileSync("apps/landing/src/data/features.ts", "utf8");
const versions = [...landing.matchAll(/version: "([^"]+)"/g)].map((m) => m[1]);
console.log("\nlanding package versions:", versions.join(", "));
console.log("landing STATS components:", (landing.match(/value: "(\d+)", label: "components"/) || [])[1] || "?");

// README stale version claims.
const readme = fs.readFileSync("README.md", "utf8");
const readmeV = [...readme.matchAll(/(\d+\.\d+\.\d+)/g)].map((m) => m[1]);
console.log("\nREADME version mentions:", [...new Set(readmeV)].join(", "));
