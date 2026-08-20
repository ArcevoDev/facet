// @vitest-environment node
import { describe, it, expect } from "vitest";
import { docsManifest } from "../manifest.js";
import { extendedManifest, extendedEntries } from "./manifest.js";

describe("extendedManifest", () => {
  it("contains all base docsManifest entries", () => {
    expect(extendedManifest).toContainEqual(docsManifest[0]);
    expect(extendedManifest.length).toBe(
      docsManifest.length + extendedEntries.length,
    );
  });

  it("appends auth and layout entries after the base manifest", () => {
    for (const entry of extendedEntries) {
      expect(extendedManifest).toContainEqual(entry);
    }
  });

  it("extendedEntries only contains auth and layout categories", () => {
    const categories = new Set(extendedEntries.map((e) => e.category));
    expect(categories.has("auth")).toBe(true);
    expect(categories.has("layout")).toBe(true);
    expect(categories.size).toBe(2);
  });

  it("each entry has required fields", () => {
    for (const entry of extendedManifest) {
      expect(entry.name).toBeTypeOf("string");
      expect(entry.name.length).toBeGreaterThan(0);
      expect(entry.slug).toBeTypeOf("string");
      expect(entry.slug.length).toBeGreaterThan(0);
      expect(entry.description).toBeTypeOf("string");
      expect(entry.category).toBeTypeOf("string");
    }
  });

  it("all slugs are unique", () => {
    const slugs = extendedManifest.map((e) => e.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});
