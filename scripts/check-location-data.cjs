const fs = require("fs");
const s = fs.readFileSync("packages/components/src/ui/location-data.ts", "utf8");

const ri = s.indexOf("export const DEFAULT_REGIONS");
const rj = s.indexOf("export const DEFAULT_LOCALITIES");
const regs = s.slice(ri, rj);

const countries = [...regs.matchAll(/^\s{2}([A-Z]{2}): \[/gm)].map((m) => {
  const code = m[1];
  const start = m.index;
  const end = regs.indexOf("\n  ],", start);
  const block = regs.slice(start, end);
  const count = (block.match(/name: "/g) || []).length;
  return { code, count };
});

console.log("REGIONS coverage (country: count):");
for (const { code, count } of countries) console.log(`  ${code}: ${count}`);

const li = s.indexOf("export const DEFAULT_LOCALITIES");
const loc = s.slice(li);
const locCountries = [...loc.matchAll(/^\s{2}([A-Z]{2}): \{/gm)].map((m) => m[1]);
console.log("\nLOCALITIES (LGA depth) for:", locCountries.join(", ") || "NONE");
