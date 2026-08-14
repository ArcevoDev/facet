const fs = require("fs");
const s = fs.readFileSync("packages/docs/src/lib/variants.tsx", "utf8");
const icons = [...s.matchAll(/<Icon name="([^"]+)"/g)].map((m) => m[1]);
console.log("Icon usages in variants.tsx:", icons.length, "unique:", new Set(icons).size);
console.log("top:", [...new Set(icons)].slice(0, 25).join(", "));
