import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import type { IconName } from "@arcevo/facet-components/light";
import { ThemeProvider } from "@arcevo/facet-components/light";
import { DocsAppProvider, type DocsAppValue } from "./context.js";
import { DocsContentPage } from "./pages/DocsContentPage.js";

// The layout shell (ConsoleLayout + CommandPalette) pulls the heavy
// facet-layout/components graph, so it is lazy-loaded: the eager entry is
// just the theme provider + router + a minimal fallback.
const DocsLayout = React.lazy(() =>
  import("./components/DocsLayout.js").then((m) => ({ default: m.DocsLayout })),
);

// The component gallery pages pull in the full component-preview machinery
// (every variant preview + the whole components barrel), so they are
// lazy-loaded too.
const ComponentsPage = React.lazy(() =>
  import("./pages/ComponentsPage.js").then((m) => ({ default: m.ComponentsPage })),
);
const ComponentPage = React.lazy(() =>
  import("./pages/ComponentPage.js").then((m) => ({ default: m.ComponentPage })),
);
const ReadyToUsePage = React.lazy(() =>
  import("./pages/ReadyToUsePage.js").then((m) => ({ default: m.ReadyToUsePage })),
);
const PagesPage = React.lazy(() =>
  import("./pages/PagesPage.js").then((m) => ({ default: m.PagesPage })),
);

import type { DocsSiteConfig } from "./lib/nav.js";
import type { DocsPage } from "./lib/pages.js";

/** Suspense fallback shown while a lazy route chunk loads. */
function PageLoader() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center text-sm text-muted-foreground">
      Loading...
    </div>
  );
}

export interface DocsAppProps {
  /** Brand, nav sections, and ecosystem links for the layout shell. */
  config: DocsSiteConfig;
  /** Content pages registry. Guides/Foundations/Ecosystem nav derives from these. */
  pages: DocsPage[];
  /** Mount the /components gallery routes (requires the component manifest). */
  showComponents?: boolean;
  /** Extra topbar content (e.g. a GitHub link), rendered after the search bar. */
  topbar?: React.ReactNode;
  /** External links rendered in the settings gear menu. */
  links?: { label: string; href: string; icon?: IconName }[];
  /** Initial theme for ThemeProvider. */
  defaultTheme?: "light" | "dark" | "system";
}

/**
 * Mount a complete, config-driven docs site.
 *
 * Everything a consumer needs to publish their own docs: brand + nav from
 * `config`, content from `pages`, and an optional /components gallery.
 * Renders inside a ThemeProvider + BrowserRouter, so it works as a
 * top-level app (Vite entry) or nested under an existing router with
 * <HashRouter> where needed.
 */
export function DocsApp({
  config,
  pages,
  showComponents = true,
  topbar,
  links,
  defaultTheme = "system",
}: DocsAppProps) {
  const value: DocsAppValue = { config, pages, showComponents, topbar, links };
  return (
    <ThemeProvider defaultTheme={defaultTheme}>
      <BrowserRouter>
        <DocsAppProvider value={value}>
          <React.Suspense fallback={<PageLoader />}>
            <Routes>
              <Route element={<DocsLayout />}>
                {pages.map((page) => (
                  <Route key={page.path} path={page.path} element={<DocsContentPage />} />
                ))}
                {showComponents && (
                  <>
                    <Route path="/components" element={<ComponentsPage />} />
                    <Route path="/components/:slug" element={<ComponentPage />} />
                    <Route path="/ready-to-use" element={<ReadyToUsePage />} />
                    <Route path="/pages" element={<PagesPage />} />
                  </>
                )}
                <Route path="*" element={<DocsContentPage />} />
              </Route>
            </Routes>
          </React.Suspense>
        </DocsAppProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
