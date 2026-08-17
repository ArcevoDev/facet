import { defineConfig } from "vitest/config";

// The store tests exercise pure Zustand state logic via .getState() - no
// React rendering, so a node environment (no jsdom) is the correct, lean
// setup. vmThreads keeps things stable on Windows workers.
export default defineConfig({
  test: {
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
    environment: "node",
    globals: true,
    pool: "vmThreads",
    env: { NODE_ENV: "test" },
  },
});
