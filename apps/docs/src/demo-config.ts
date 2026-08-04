import type { DocsPage, DocsSiteConfig } from "@arcevo/facet-docs";
import { docsPages } from "@arcevo/facet-docs";

/**
 * Demo instance configuration for facet's own docs site.
 *
 * This is exactly what an external consumer (arc-id, arcbase, arc-wallet)
 * would write: a DocsSiteConfig (brand + nav + ecosystem links) plus their
 * own pages. facet dogfoods its docs package here.
 */

export const demoConfig: DocsSiteConfig = {
  brand: {
    name: "facet",
    tagline: "Component library for the Arcevo ecosystem",
  },
  navigation: [],
  // arc-id is an ecosystem page in the registry (section "ecosystem"), so
  // it already renders under the sidebar's "Ecosystem" section. External
  // consumers point config.ecosystem links at their own hosted docs
  // instead of adding in-tree pages.
};

export const demoPages: DocsPage[] = docsPages;
