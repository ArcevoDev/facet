import { describe, expect, it } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {
  buildDoctorReport,
  formatPackageTable,
  planUpdates,
  readInstalledVersion,
  updateCommand,
  installFacetPackages,
  globalInstallFacetPackages,
  isFacetPackage,
  resolveFacetPackageName,
  type FacetPackageInfo,
} from "./commands.js";
import { discoverFacetPackages, ALL_FACET_PACKAGES } from "./registry.js";
import {
  compareVersions,
  collectFacetDeps,
  detectMonorepo,
  detectPackageManager,
} from "./types.js";

function tmp(): string {
  return fs.mkdtempSync(path.join(os.tmpdir(), "facet-cmd-"));
}

function writePkg(dir: string, pkg: Record<string, unknown>) {
  fs.writeFileSync(path.join(dir, "package.json"), JSON.stringify(pkg, null, 2));
}

const SAMPLE: FacetPackageInfo[] = [
  { name: "@arcevo/facet-auth", latest: "1.1.0", outdated: false },
  { name: "@arcevo/facet-cli", latest: "0.2.0", outdated: false },
  {
    name: "@arcevo/facet-components",
    latest: "1.2.0",
    installed: "1.1.0",
    declared: "^1.1.0",
    outdated: true,
  },
  { name: "@arcevo/facet-docs", latest: "1.2.0", outdated: false },
  { name: "@arcevo/facet-layout", latest: "1.1.1", outdated: false },
  { name: "@arcevo/facet-sdk", latest: "1.0.1", outdated: false },
  { name: "@arcevo/facet-tokens", latest: "1.1.0", outdated: false },
];

describe("planUpdates", () => {
  it("returns only outdated packages", () => {
    const updates = planUpdates(SAMPLE);
    expect(updates).toHaveLength(1);
    expect(updates[0]!.name).toBe("@arcevo/facet-components");
  });
});

describe("updateCommand", () => {
  it("builds a pnpm command", () => {
    expect(updateCommand("pnpm", [{ name: "@arcevo/facet-components", latest: "1.2.0" }])).toBe(
      "pnpm add @arcevo/facet-components@^1.2.0",
    );
  });

  it("adds -w for pnpm workspaces", () => {
    expect(
      updateCommand("pnpm", [{ name: "@arcevo/facet-components", latest: "1.2.0" }], true),
    ).toBe("pnpm -w add @arcevo/facet-components@^1.2.0");
  });

  it("builds npm and yarn commands", () => {
    expect(updateCommand("npm", [{ name: "@arcevo/facet-tokens", latest: "1.1.0" }])).toBe(
      "npm install @arcevo/facet-tokens@^1.1.0",
    );
    expect(updateCommand("yarn", [{ name: "@arcevo/facet-tokens", latest: "1.1.0" }])).toBe(
      "yarn workspace add @arcevo/facet-tokens@^1.1.0",
    );
  });
});

describe("formatPackageTable", () => {
  it("renders the header and rows", () => {
    const table = formatPackageTable(SAMPLE);
    expect(table).toContain("Package");
    expect(table).toContain("@arcevo/facet-components");
    expect(table).toContain("(update available)");
  });
});

describe("buildDoctorReport", () => {
  it("flags outdated packages and suggests update", () => {
    const dir = tmp();
    try {
      writePkg(dir, {
        name: "app",
        dependencies: { "@arcevo/facet-components": "^1.1.0" },
      });
      const report = buildDoctorReport(dir, SAMPLE);
      expect(report.pm).toBe("npm");
      expect(report.monorepo).toBe(false);
      expect(report.outdated.map((i) => i.name)).toContain("@arcevo/facet-components");
      expect(report.suggestions.some((s) => s.includes("facet update"))).toBe(true);
    } finally {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });

  it("suggests tokens when components are used without tokens", () => {
    const dir = tmp();
    try {
      writePkg(dir, {
        name: "app",
        dependencies: { "@arcevo/facet-components": "^1.2.0" },
      });
      const infos: FacetPackageInfo[] = [
        { name: "@arcevo/facet-components", latest: "1.2.0", declared: "^1.2.0", outdated: false },
        ...SAMPLE.filter((i) => i.name !== "@arcevo/facet-components"),
      ];
      const report = buildDoctorReport(dir, infos);
      expect(report.suggestions.some((s) => s.includes("facet-tokens"))).toBe(true);
    } finally {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });

  it("warns on workspace:* dependency for publish-time", () => {
    const dir = tmp();
    try {
      writePkg(dir, {
        name: "app",
        dependencies: { "@arcevo/facet-components": "workspace:*" },
      });
      const infos: FacetPackageInfo[] = [
        { name: "@arcevo/facet-components", latest: "1.2.0", declared: "workspace:*", outdated: false },
        ...SAMPLE.filter((i) => i.name !== "@arcevo/facet-components"),
      ];
      const report = buildDoctorReport(dir, infos);
      expect(report.suggestions.some((s) => s.includes("workspace:*"))).toBe(true);
    } finally {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });
});

describe("detectMonorepo", () => {
  it("detects pnpm workspaces from pnpm-workspace.yaml", () => {
    const dir = tmp();
    try {
      writePkg(dir, { name: "root" });
      fs.writeFileSync(
        path.join(dir, "pnpm-workspace.yaml"),
        "packages:\n  - \"client\"\n  - \"server\"\n",
      );
      expect(detectMonorepo(dir)).toEqual(["client", "server"]);
    } finally {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });

  it("detects package.json workspaces field", () => {
    const dir = tmp();
    try {
      writePkg(dir, { name: "root", workspaces: ["packages/*", "apps/*"] });
      expect(detectMonorepo(dir)).toEqual(["packages/*", "apps/*"]);
    } finally {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });

  it("returns null for a single package", () => {
    const dir = tmp();
    try {
      writePkg(dir, { name: "app", dependencies: { react: "^19" } });
      expect(detectMonorepo(dir)).toBeNull();
    } finally {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });
});

describe("collectFacetDeps", () => {
  it("collects facet deps from workspace members (direct-dir globs)", () => {
    const dir = tmp();
    try {
      writePkg(dir, { name: "root" });
      fs.writeFileSync(path.join(dir, "pnpm-workspace.yaml"), "packages:\n  - client\n");
      fs.mkdirSync(path.join(dir, "client"));
      writePkg(path.join(dir, "client"), {
        name: "client",
        dependencies: {
          "@arcevo/facet-components": "1.2.0",
          "@arcevo/facet-tokens": "1.1.0",
        },
      });
      const deps = collectFacetDeps(dir);
      expect(deps["@arcevo/facet-components"]).toBe("1.2.0");
      expect(deps["@arcevo/facet-tokens"]).toBe("1.1.0");
    } finally {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });
});

describe("readInstalledVersion", () => {
  it("reads the version from node_modules/<pkg>/package.json", () => {
    const dir = tmp();
    try {
      const pkgDir = path.join(dir, "node_modules", "@arcevo", "facet-auth");
      fs.mkdirSync(pkgDir, { recursive: true });
      writePkg(pkgDir, { name: "@arcevo/facet-auth", version: "1.1.1" });
      expect(readInstalledVersion([dir], "@arcevo/facet-auth")).toBe("1.1.1");
    } finally {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });

  it("returns undefined when the package is not installed", () => {
    const dir = tmp();
    try {
      writePkg(dir, { name: "app" });
      expect(readInstalledVersion([dir], "@arcevo/facet-not-there")).toBeUndefined();
    } finally {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });
});

describe("compareVersions", () => {
  it("compares semver strings", () => {
    expect(compareVersions("1.2.0", "1.1.0")).toBeGreaterThan(0);
    expect(compareVersions("1.1.0", "1.2.0")).toBeLessThan(0);
    expect(compareVersions("1.2.0", "1.2.0")).toBe(0);
  });
});

describe("discoverFacetPackages", () => {
  it("always includes the baseline facet packages", async () => {
    const names = await discoverFacetPackages();
    for (const pkg of ALL_FACET_PACKAGES) {
      expect(names).toContain(pkg);
    }
  });

  it("only returns @arcevo/facet-* scoped packages", async () => {
    const names = await discoverFacetPackages();
    for (const n of names) {
      expect(n.startsWith("@arcevo/facet-")).toBe(true);
    }
  });
});

describe("detectPackageManager", () => {
  it("detects pnpm from the lockfile", () => {
    const dir = tmp();
    try {
      fs.writeFileSync(path.join(dir, "pnpm-lock.yaml"), "");
      expect(detectPackageManager(dir)).toBe("pnpm");
    } finally {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });
});

describe("isFacetPackage", () => {
  it("returns true for @arcevo/facet-* names", () => {
    expect(isFacetPackage("@arcevo/facet-layout")).toBe(true);
    expect(isFacetPackage("@arcevo/facet-components")).toBe(true);
  });

  it("returns false for non-facet names", () => {
    expect(isFacetPackage("react")).toBe(false);
    expect(isFacetPackage("Button")).toBe(false);
    expect(isFacetPackage("@radix-ui/react-dialog")).toBe(false);
  });
});

describe("resolveFacetPackageName", () => {
  it("resolves full package names as-is", () => {
    expect(resolveFacetPackageName("@arcevo/facet-components")).toBe("@arcevo/facet-components");
    expect(resolveFacetPackageName("@arcevo/facet-layout")).toBe("@arcevo/facet-layout");
  });

  it("resolves shorthand names to full facet packages", () => {
    expect(resolveFacetPackageName("components")).toBe("@arcevo/facet-components");
    expect(resolveFacetPackageName("layout")).toBe("@arcevo/facet-layout");
    expect(resolveFacetPackageName("tokens")).toBe("@arcevo/facet-tokens");
    expect(resolveFacetPackageName("store")).toBe("@arcevo/facet-store");
    expect(resolveFacetPackageName("@arcevo/facet-store")).toBe("@arcevo/facet-store");
  });

  it("resolves scoped-dropped aliases (facet-cli -> @arcevo/facet-cli)", () => {
    expect(resolveFacetPackageName("facet-cli")).toBe("@arcevo/facet-cli");
    expect(resolveFacetPackageName("facet-components")).toBe("@arcevo/facet-components");
    expect(resolveFacetPackageName("facet-layout")).toBe("@arcevo/facet-layout");
  });

  it("returns undefined for non-facet component names (falls through to copy)", () => {
    expect(resolveFacetPackageName("Button")).toBeUndefined();
    expect(resolveFacetPackageName("react")).toBeUndefined();
    expect(resolveFacetPackageName("not-a-real-pkg")).toBeUndefined();
  });
});

describe("installFacetPackages", () => {
  it("builds a pnpm command with version", () => {
    expect(
      installFacetPackages("pnpm", [{ name: "@arcevo/facet-layout", latest: "1.2.0" }]),
    ).toBe("pnpm add @arcevo/facet-layout@^1.2.0");
  });

  it("adds -w for pnpm workspaces", () => {
    expect(
      installFacetPackages("pnpm", [{ name: "@arcevo/facet-layout", latest: "1.2.0" }], true),
    ).toBe("pnpm -w add @arcevo/facet-layout@^1.2.0");
  });

  it("joins multiple packages into one command", () => {
    expect(
      installFacetPackages("pnpm", [
        { name: "@arcevo/facet-layout", latest: "1.2.0" },
        { name: "@arcevo/facet-tokens", latest: "1.1.0" },
      ]),
    ).toBe("pnpm add @arcevo/facet-layout@^1.2.0 @arcevo/facet-tokens@^1.1.0");
  });

  it("builds npm and yarn commands", () => {
    expect(
      installFacetPackages("npm", [{ name: "@arcevo/facet-tokens", latest: "1.1.0" }]),
    ).toBe("npm install @arcevo/facet-tokens@^1.1.0");
    expect(
      installFacetPackages("yarn", [{ name: "@arcevo/facet-tokens", latest: "1.1.0" }]),
    ).toBe("yarn workspace add @arcevo/facet-tokens@^1.1.0");
  });
});

describe("globalInstallFacetPackages", () => {
  it("builds npm command with -g and no caret", () => {
    expect(
      globalInstallFacetPackages("npm", [{ name: "@arcevo/facet-cli", latest: "0.8.0" }]),
    ).toBe("npm i -g @arcevo/facet-cli@0.8.0");
  });

  it("builds pnpm global command", () => {
    expect(
      globalInstallFacetPackages("pnpm", [{ name: "@arcevo/facet-cli", latest: "0.8.0" }]),
    ).toBe("pnpm add -g @arcevo/facet-cli@0.8.0");
  });

  it("builds yarn global command", () => {
    expect(
      globalInstallFacetPackages("yarn", [{ name: "@arcevo/facet-cli", latest: "0.8.0" }]),
    ).toBe("yarn global add @arcevo/facet-cli@0.8.0");
  });

  it("builds bun global command", () => {
    expect(
      globalInstallFacetPackages("bun", [{ name: "@arcevo/facet-cli", latest: "0.8.0" }]),
    ).toBe("bun add -g @arcevo/facet-cli@0.8.0");
  });

  it("joins multiple packages into one global command", () => {
    expect(
      globalInstallFacetPackages("pnpm", [
        { name: "@arcevo/facet-cli", latest: "0.8.0" },
        { name: "@arcevo/facet-layout", latest: "1.2.0" },
      ]),
    ).toBe("pnpm add -g @arcevo/facet-cli@0.8.0 @arcevo/facet-layout@1.2.0");
  });

  it("never emits a workspace -w flag", () => {
    expect(
      globalInstallFacetPackages("pnpm", [{ name: "@arcevo/facet-cli", latest: "0.8.0" }]),
    ).not.toContain(" -w");
  });
});
