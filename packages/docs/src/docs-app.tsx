import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import type { IconName } from "@arcevo/facet-components";
import { ThemeProvider } from "@arcevo/facet-components";
import { DocsAppProvider, type DocsAppValue } from "./context.js";
import { DocsLayout } from "./components/DocsLayout.js";
import { DocsContentPage } from "./pages/DocsContentPage.js";
import { ComponentsPage } from "./pages/ComponentsPage.js";
import { ComponentPage } from "./pages/ComponentPage.js";
import { ReadyToUsePage } from "./pages/ReadyToUsePage.js";
import type { DocsSiteConfig } from "./lib/nav.js";
import type { DocsPage } from "./lib/pages.js";

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
                </>
              )}
              <Route path="*" element={<DocsContentPage />} />
            </Route>
          </Routes>
        </DocsAppProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
