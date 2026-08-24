import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["src/**/*.test.ts"],
    environment: "node",
    // Windows worker spawn is unreliable for forks/threads: vmThreads is stable here.
    pool: "vmThreads",
    env: { NODE_ENV: "test" },
    // A few CLI tests hit the npm registry (discoverFacetPackages,
    // resolveFacetVersions / wizard) or parse large DTS files
    // (buildLucideCatalog). 3s fetch timeouts keep them from hanging on a
    // slow/unreachable registry, but parsing under load can still push past
    // the 5s default; give network + hot-path tests headroom.
    testTimeout: 15000,
  },
});
