import { describe, expect, it } from "vitest";
import {
  currentCliVersion,
  globalInstallCommand,
  checkForCliUpdate,
} from "./update.js";

describe("currentCliVersion", () => {
  it("returns a valid semver string from package.json", () => {
    const v = currentCliVersion();
    expect(v).toMatch(/^\d+\.\d+\.\d+/);
  });
});

describe("globalInstallCommand", () => {
  it("returns a global install command for @arcevo/facet-cli", () => {
    const cmd = globalInstallCommand();
    expect(cmd).toContain("@arcevo/facet-cli@latest");
    // One of the supported global install patterns.
    expect(cmd).toMatch(/^(npm i -g|pnpm add -g|bun add -g|yarn global add)/);
  });
});

describe("checkForCliUpdate", () => {
  it("returns null in CI environments", async () => {
    const prev = process.env.CI;
    process.env.CI = "true";
    try {
      const state = await checkForCliUpdate();
      expect(state).toBeNull();
    } finally {
      if (prev === undefined) delete process.env.CI;
      else process.env.CI = prev;
    }
  });
});
