import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["src/**/*.test.ts"],
    environment: "node",
    pool: "vmThreads",
    env: { NODE_ENV: "test" },
  },
});
