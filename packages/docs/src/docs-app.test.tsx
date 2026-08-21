/**
 * Integration test: docs engine rendered against a real consumer-style config.
 *
 * Q10 gap: "No integration test — docs engine + real consumer. The
 * sandbox-e2e tests the CLI, and unit tests cover packages, but there's no
 * CI gate that renders the docs engine against a real consumer like arc-id."
 *
 * This test mounts <DocsApp> with a representative consumer config +
 * pages (brand, navigation, ecosystem, content pages with various
 * DocsBlock types) and asserts the router, context, and content pipeline
 * all work end-to-end. Heavy external modules (facet-layout ConsoleLayout,
 * facet-components NotFound, facet-components/light UI primitives) are
 * stubbed so the test focuses on the *docs engine* integration surface,
 * not the UI primitives.
 */
import * as React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";

// ── Stubs for heavy external modules ───────────────────────────
// ConsoleLayout + CommandPalette live in @arcevo/facet-layout, a heavy
// graph.  Stub them so we exercise the docs engine's routing/context
// rather than the layout shell.
vi.mock("@arcevo/facet-layout", () => {
  const Stub = ({ children, ...rest }: any) =>
    React.createElement("div", { "data-testid": "console-layout", ...rest }, children);
  const VoidStub = () => React.createElement("div", { "data-testid": "command-palette" });
  return {
    ConsoleLayout: Stub,
    CommandPalette: VoidStub,
  };
});

// NotFound comes from the full @arcevo/facet-components package (lazy
// route).  Stub it; /light subpath is mocked separately below.
vi.mock("@arcevo/facet-components", () => ({
  NotFound: () => React.createElement("div", { "data-testid": "not-found" }, "404"),
}));

// facet-components/light is imported by ThemeProvider (eager in docs-app)
// and by content block components (CodeBlock, InstallTabs, KeyboardShortcuts,
// DocsLayout's SettingsMenu).  Provide lightweight stubs so jsdom doesn't
// need the full Radix + icon-catalog graph.
vi.mock("@arcevo/facet-components/light", () => {
  const stub =
    (tag: string) =>
    ({ children, ...rest }: any) =>
      React.createElement(tag === "svg" ? "svg" : "div", { "data-testid": tag, ...rest }, children);
  return {
    ThemeProvider: ({ children }: { children?: React.ReactNode }) => children,
    LightIcon: ({ name }: { name?: string }) =>
      React.createElement("svg", { "data-testid": `icon-${name}` }),
    Button: stub("button"),
    Kbd: ({ children }: { children?: React.ReactNode }) =>
      React.createElement("kbd", null, children),
    Tabs: stub("tabs"),
    TabsList: stub("tabs-list"),
    TabsTrigger: stub("tabs-trigger"),
    TabsContent: stub("tabs-content"),
    DropdownMenu: stub("dropdown-menu"),
    DropdownMenuTrigger: stub("dropdown-menu-trigger"),
    DropdownMenuContent: stub("dropdown-menu-content"),
    DropdownMenuItem: stub("dropdown-menu-item"),
    DropdownMenuLabel: stub("dropdown-menu-label"),
    DropdownMenuSeparator: () => React.createElement("hr"),
    cn: (...args: unknown[]) => args.filter(Boolean).join(" "),
    useTheme: () => ({ theme: "light" }),
  };
});

import { DocsApp } from "./docs-app.js";
import type { DocsSiteConfig, DocsPage } from "./index.js";

// ── Consumer-style fixtures (mirrors what an arc-id docs site passes) ──

const consumerConfig: DocsSiteConfig = {
  brand: { name: "ArcID" },
  navigation: [{ title: "Guides", items: [{ label: "Overview", href: "/" }] }],
  ecosystem: [{ label: "GitHub", href: "https://github.com/arcevodev" }],
};

const consumerPages: DocsPage[] = [
  {
    path: "/",
    title: "Overview",
    section: "guides",
    description: "Domain-customizable, auth-first component system for Arcevo.",
    blocks: [
      { type: "p", text: "facet is what you get when you own the identity backend." },
      { type: "h2", text: "Packages" },
      {
        type: "ul",
        items: [
          "`@arcevo/facet-tokens`: Design tokens.",
          "`@arcevo/facet-sdk`: API client.",
          "`@arcevo/facet-components`: UI components.",
        ],
      },
      { type: "code", text: "pnpm install\npnpm build" },
      { type: "link", label: "GitHub repo", href: "https://github.com/arcevodev/facet" },
    ],
  },
  {
    path: "/guides/auth",
    title: "Authentication",
    section: "auth",
    description: "Auth flows and domain presets.",
    blocks: [
      { type: "p", text: "Arcevo ships domain presets for fintech, med, and edu." },
      { type: "h2", text: "Sign-in flow" },
      {
        type: "table",
        headers: ["Method", "Package"],
        rows: [
          ["Password", "@arcevo/facet-auth"],
          ["OAuth", "@arcevo/facet-auth"],
        ],
      },
    ],
  },
];

// ── Tests ──────────────────────────────────────────────────────

describe("DocsApp integration — consumer-style config + pages", () => {
  beforeEach(() => {
    window.history.pushState({}, "", "/");
  });

  afterEach(() => {
    cleanup();
    window.history.pushState({}, "", "/");
  });

  it("mounts with a consumer config without crashing", async () => {
    render(<DocsApp config={consumerConfig} pages={consumerPages} showComponents={false} />);
    expect(await screen.findByTestId("console-layout")).toBeInTheDocument();
  });

  it("renders the home page at / with title and description", async () => {
    window.history.pushState({}, "", "/");
    render(<DocsApp config={consumerConfig} pages={consumerPages} showComponents={false} />);

    await screen.findByTestId("console-layout");
    expect(screen.getByRole("heading", { name: "Overview" })).toBeInTheDocument();
    expect(
      screen.getByText("Domain-customizable, auth-first component system for Arcevo."),
    ).toBeInTheDocument();
  });

  it("renders content blocks (paragraph, heading, list, code)", async () => {
    window.history.pushState({}, "", "/");
    render(<DocsApp config={consumerConfig} pages={consumerPages} showComponents={false} />);

    await screen.findByTestId("console-layout");
    expect(screen.getByText(/facet is what you get/)).toBeInTheDocument();
    expect(screen.getByText("Packages")).toBeInTheDocument();
    // Code blocks render as <pre><code>
    const codeBlock = screen.getByText((content) => content.includes("pnpm install"));
    expect(codeBlock).toBeInTheDocument();
  });

  it("renders a guide page at /guides/auth with table blocks", async () => {
    window.history.pushState({}, "", "/guides/auth");
    render(<DocsApp config={consumerConfig} pages={consumerPages} showComponents={false} />);

    await screen.findByTestId("console-layout");
    expect(screen.getByRole("heading", { name: "Authentication" })).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
    expect(screen.getAllByText("@arcevo/facet-auth")).toHaveLength(2);
  });

  it("renders link blocks as anchor tags", async () => {
    window.history.pushState({}, "", "/");
    render(<DocsApp config={consumerConfig} pages={consumerPages} showComponents={false} />);

    await screen.findByTestId("console-layout");
    const link = screen.getByText("GitHub repo");
    expect(link.closest("a")).toHaveAttribute("href", "https://github.com/arcevodev/facet");
  });

  it("renders 404 for unknown routes", async () => {
    window.history.pushState({}, "", "/totally-unknown-page");
    render(<DocsApp config={consumerConfig} pages={consumerPages} showComponents={false} />);

    expect(await screen.findByTestId("not-found")).toBeInTheDocument();
  });

  it("respects showComponents=false — component gallery routes are absent", async () => {
    window.history.pushState({}, "", "/components");
    render(<DocsApp config={consumerConfig} pages={consumerPages} showComponents={false} />);

    // Without showComponents, /components is not a route — hits the 404 fallback.
    expect(await screen.findByTestId("not-found")).toBeInTheDocument();
  });

  it("passes config and pages through to the docs app context", async () => {
    // DocsApp doesn't accept children, but the context value is observable
    // through the rendered content: the page that matches the current route
    // is sourced from the `pages` prop, and the sidebar nav is sourced from
    // `config.navigation`.
    window.history.pushState({}, "", "/guides/auth");
    render(<DocsApp config={consumerConfig} pages={consumerPages} showComponents={false} />);

    await screen.findByTestId("console-layout");
    expect(screen.getByRole("heading", { name: "Authentication" })).toBeInTheDocument();
    expect(screen.getByText("Auth flows and domain presets.")).toBeInTheDocument();
  });
});
