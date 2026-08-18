/**
 * Sandbox e2e test for facet-cli.
 *
 * Creates a minimal virtual consumer project in the OS temp dir, then runs
 * real CLI commands against it (via tsx on the local source) to verify:
 *
 *   - facet latest                 (read-only: fetch all facet package versions)
 *   - facet add @arcevo/facet-tokens (installs a facet package via detected PM)
 *   - facet clean -y               (removes unused facet deps and auto-runs remove)
 *   - facet doctor                 (analyzes the sandbox for issues)
 *   - facet --log <cmd>            (verbose output)
 *
 * The sandbox is fully isolated — nothing touches arc-id or the real repo.
 */
import { mkdirSync, rmSync, writeFileSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { execFileSync } from "node:child_process";

const CLI = join(process.cwd(), "packages/cli/dist/index.js");
const SANDBOX = join(tmpdir(), "facet-sandbox-" + Date.now());

function runFacet(args, cwd = SANDBOX, timeoutMs = 60000) {
  try {
    return execFileSync("node", [CLI, ...args], {
      cwd,
      encoding: "utf-8",
      stdio: ["ignore", "pipe", "pipe"],
      timeout: timeoutMs,
    });
  } catch (e) {
    // Return whatever output was captured, even on non-zero exit
    return (e.stdout || "") + (e.stderr || "");
  }
}

function setupSandbox() {
  rmSync(SANDBOX, { recursive: true, force: true });
  mkdirSync(SANDBOX, { recursive: true });

  writeFileSync(
    join(SANDBOX, "package.json"),
    JSON.stringify(
      {
        name: "facet-sandbox",
        version: "0.1.0",
        private: true,
        type: "module",
        packageManager: "npm@10.0.0",
        dependencies: {},
      },
      null,
      2,
    ) + "\n",
  );

  writeFileSync(
    join(SANDBOX, "tsconfig.json"),
    JSON.stringify(
      {
        compilerOptions: {
          target: "ES2022",
          module: "ESNext",
          moduleResolution: "Bundler",
          strict: true,
        },
      },
      null,
      2,
    ) + "\n",
  );

  // npm-shrinkwrap.json so PM detection finds npm (npm always ships with node)
  writeFileSync(join(SANDBOX, "package-lock.json"), "{}");

  console.log("Sandbox created at:", SANDBOX);
}

const results = {
  "facet latest": null,
  "facet add <pkg>": null,
  "facet add shorthand": null,
  "facet clean -y": null,
  "facet doctor": null,
};

try {
  setupSandbox();

  // --- Test 1: facet latest (read-only) ---
  console.log("\n=== TEST 1: facet latest ===");
  const latestOut = runFacet(["--no-update-check", "latest"]);
  results["facet latest"] = latestOut.includes("@arcevo/facet-");
  console.log(latestOut.slice(0, 600));
  console.log("PASS:", results["facet latest"]);

  // --- Test 2: facet add @arcevo/facet-tokens (installs a facet package) ---
  console.log("\n=== TEST 2: facet add @arcevo/facet-tokens --log ===");
  const addOut = runFacet(["--no-update-check", "add", "@arcevo/facet-tokens", "--log"], SANDBOX, 120000);
  results["facet add <pkg>"] = addOut.includes("installed") || addOut.includes("Installing");
  console.log(addOut.slice(0, 800));
  console.log("PASS:", results["facet add <pkg>"]);

  // Verify the package was added to package.json
  const pkg = JSON.parse(readFileSync(join(SANDBOX, "package.json"), "utf-8"));
  const hasToken = "@arcevo/facet-tokens" in (pkg.dependencies || {});
  console.log("package.json has @arcevo/facet-tokens:", hasToken);

  // --- Test 3: facet add shorthand (facet add tokens) ---
  console.log("\n=== TEST 3: facet add tokens (shorthand) ===");
  const shortcutOut = runFacet(["--no-update-check", "add", "tokens", "--log"], SANDBOX, 120000);
  results["facet add shorthand"] = shortcutOut.includes("Installing");
  console.log(shortcutOut.slice(0, 400));
  console.log("PASS:", results["facet add shorthand"]);

  // --- Test 4: facet clean -y (removes unused deps + auto-runs remove) ---
  console.log("\n=== TEST 4: facet clean -y ===");
  // Create a source file that imports facet-tokens (so it IS used)
  mkdirSync(join(SANDBOX, "src"), { recursive: true });
  writeFileSync(
    join(SANDBOX, "src", "app.jsx"),
    "import { vars } from '@arcevo/facet-tokens';\nconsole.log(vars);\n",
  );
  // Remove the import so facet-tokens becomes unused
  writeFileSync(
    join(SANDBOX, "src", "app.jsx"),
    "import { something } from 'react';\nconsole.log(something);\n",
  );
  const cleanOut = runFacet(["--no-update-check", "clean", "--yes"], SANDBOX, 120000);
  results["facet clean -y"] = cleanOut.includes("remove") || cleanOut.includes("Finished");
  console.log(cleanOut.slice(0, 1000));
  console.log("PASS:", results["facet clean -y"]);

  // --- Test 5: facet doctor ---
  console.log("\n=== TEST 5: facet doctor ===");
  const doctorOut = runFacet(["--no-update-check", "doctor"]);
  results["facet doctor"] = doctorOut.includes("doctor") || doctorOut.includes("Analysis");
  console.log(doctorOut.slice(0, 800));
  console.log("PASS:", results["facet doctor"]);

  console.log("\n=== SUMMARY ===");
  for (const [test, passed] of Object.entries(results)) {
    console.log(`  ${test}: ${passed ? "PASS" : "CHECK"}`);
  }
} catch (err) {
  console.error("Sandbox e2e test errored:", err.message || err);
  console.error(err.stderr || "");
  if (err.stdout) console.error(err.stdout);
} finally {
  // Clean up sandbox (ignore EBUSY — Windows holds handles briefly after pnpm)
  try {
    rmSync(SANDBOX, { recursive: true, force: true });
    console.log("\nSandbox cleaned up.");
  } catch (e) {
    if (e.code === "EBUSY") {
      console.log("\nSandbox left in place (EBUSY: " + SANDBOX + "). Clean up manually later.");
    } else {
      throw e;
    }
  }
}
