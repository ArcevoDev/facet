const { execSync } = require("child_process");

function grep(pattern, args = []) {
  try {
    return execSync(`git grep -n -E "${pattern}" -- packages apps scripts`, {
      encoding: "utf8",
      maxBuffer: 20 * 1024 * 1024,
      shell: "cmd.exe",
    }).split("\n").filter(Boolean);
  } catch {
    return [];
  }
}

const todo = grep("TODO|FIXME|HACK|XXX|@ts-ignore|@ts-expect-error");
console.log("=== TODOs / suppressions:", todo.length);
console.log(todo.slice(0, 20).join("\n") || "none");

const hardcoded = grep("#[0-9A-Fa-f]{6}|ArcevoCirqle");
console.log("\n=== hardcoded hex / Arcevo brand (src only):", hardcoded.length);
console.log(hardcoded.slice(0, 20).join("\n") || "none");

const anys = grep(": any|as any|any\\[\\]");
console.log("\n=== any usages:", anys.length);
console.log(anys.slice(0, 15).join("\n") || "none");

const consoleLog = grep("console\\.(log|warn)");
console.log("\n=== console.log/warn in packages:", consoleLog.length);
console.log(consoleLog.slice(0, 15).join("\n") || "none");
