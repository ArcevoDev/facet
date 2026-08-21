import { defineConfig } from "tsup";

/**
 * facet-auth is a client-only React auth layer (forms + providers that import
 * react-hook-form). The `"use client"` banner ensures Next.js App Router
 * resolves its client-only imports against the browser entry, not the
 * `react-server` condition.
 */
export default defineConfig({
  entry: ["src/index.ts"],
  format: "esm",
  dts: true,
  clean: true,
  banner: {
    js: '"use client";',
  },
});
