import * as React from "react";
import type { IconName } from "@arcevo/facet-components/light";
import type { DocsPage } from "./lib/pages.js";
import type { DocsSiteConfig } from "./lib/nav.js";

export interface DocsAppValue {
  /** Brand + nav + ecosystem config fed to the layout shell. */
  config: DocsSiteConfig;
  /** Content pages rendered by DocsContentPage and the nav builder. */
  pages: DocsPage[];
  /** Whether the /components gallery routes are mounted. */
  showComponents: boolean;
  /** Extra topbar content (e.g. a GitHub link), rendered after search. */
  topbar?: React.ReactNode;
  /** External links rendered in the settings menu. */
  links?: { label: string; href: string; icon?: IconName }[];
}

const DocsAppContext = React.createContext<DocsAppValue | null>(null);

export function DocsAppProvider({ value, children }: { value: DocsAppValue; children: React.ReactNode }) {
  return <DocsAppContext.Provider value={value}>{children}</DocsAppContext.Provider>;
}

/** Access the active DocsApp config from any engine component. */
export function useDocsApp(): DocsAppValue {
  const ctx = React.useContext(DocsAppContext);
  if (!ctx) throw new Error("useDocsApp must be used within <DocsApp>");
  return ctx;
}
