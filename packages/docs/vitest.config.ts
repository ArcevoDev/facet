import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    // Docs engine tests: content-driven navigation, slugs, manifest, layout
    // config building, and component rendering against a consumer config.
    environment: "jsdom",
    globals: true,
    setupFiles: ["../../scripts/test-setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
    passWithNoTests: false,
    pool: "vmThreads",
    env: { NODE_ENV: "test" },
  },
});
