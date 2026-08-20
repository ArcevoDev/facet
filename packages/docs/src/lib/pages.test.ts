// @vitest-environment node
import { describe, it, expect } from "vitest";
import { slugify } from "./pages.js";

describe("slugify", () => {
  it("converts title case to kebab-case", () => {
    expect(slugify("Getting Started")).toBe("getting-started");
  });

  it("lowercases and preserves single spaces as hyphens", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });

  it("collapses multiple spaces into a single hyphen", () => {
    expect(slugify("Multiple   Spaces   Here")).toBe("multiple-spaces-here");
  });

  it("handles strings that are already slugified", () => {
    expect(slugify("already-slug")).toBe("already-slug");
  });

  it("strips leading/trailing whitespace and hyphens", () => {
    expect(slugify("  --Spaced--  ")).toBe("spaced");
  });

  it("removes special characters", () => {
    expect(slugify("Button! @Icon #1")).toBe("button-icon-1");
  });

  it("preserves numbers", () => {
    expect(slugify("Step 3 Guide")).toBe("step-3-guide");
  });

  it("handles empty string", () => {
    expect(slugify("")).toBe("");
  });

  it("handles single word", () => {
    expect(slugify("Components")).toBe("components");
  });

  it("lowercases camelCase", () => {
    expect(slugify("camelCaseWord")).toBe("camelcaseword");
  });

  it("collapses non-alphanumeric runs to a single hyphen", () => {
    expect(slugify("Hello!!!World")).toBe("hello-world");
  });
});
