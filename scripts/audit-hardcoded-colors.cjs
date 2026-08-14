const fs = require("fs");
const path = require("path");

const dir = "packages/components/src";
const results = [];

function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p);
    else if (f.endsWith(".tsx") || f.endsWith(".ts")) results.push(p);
  }
}
walk(dir);

const hex = /#[0-9a-fA-F]{3,8}\b/g;
const rgb = /\b(?:rgb|rgba|hsl|hsla|oklch)\([^)]*\)/g;
const named = /\b(?:indigo|violet|purple|fuchsia|cyan|blue|emerald|amber|rose|red|green|yellow|slate|gray|grey|black|white)\b/gi;

let hardcoded = 0;
for (const f of results) {
  const s = fs.readFileSync(f, "utf8");
  const hexHits = [...s.matchAll(hex)];
  const rgbHits = [...s.matchAll(rgb)];
  const namedHits = [...s.matchAll(named)];
  if (hexHits.length || rgbHits.length || namedHits.length) {
    hardcoded++;
    const samples = [
      ...hexHits.slice(0, 3).map((m) => m[0]),
      ...rgbHits.slice(0, 2).map((m) => m[0]),
      ...namedHits.slice(0, 3).map((m) => m[0]),
    ];
    console.log(`${f.replace(dir + path.sep, "")}: ${samples.join(", ")}`);
  }
}
console.log(`\nfiles with hardcoded colors: ${hardcoded}/${results.length}`);
