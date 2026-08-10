import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["src/**/*.test.ts"],
    environment: "node",
    // Windows worker spawn is unreliable for forks/threads: vmThreads is stable here.
    pool: "vmThreads",
    env: { NODE_ENV: "test" },
  },
});
