import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // The docs package is an engine with no unit test files today; the
    // config exists so `pnpm -F @arcevo/facet-docs test` runs its own
    // project instead of walking up to the root workspace config (which
    // resolves projects relative to the wrong dir and crashes).
    include: [],
    passWithNoTests: true,
    environment: "node",
    pool: "vmThreads",
    env: { NODE_ENV: "test" },
  },
});
