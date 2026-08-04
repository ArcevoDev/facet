import * as React from "react";
import type { LayoutConfig, NavItem, NavSection } from "@arcevo/facet-layout";
import type { DocsPage } from "./pages.js";
import { docsManifest } from "../manifest.js";

/**
 * Navigation config for the docs site shell (feeds facet Sidebar).
 *
 * The Guides, Foundations, and Ecosystem sections are derived from the
 * pages registry passed to <DocsApp>, so pages and navigation stay in
 * lockstep: add a page to the registry and it appears in the sidebar and in
 * the search palette automatically.
 */
export interface DocsSiteConfig {
  brand: LayoutConfig["brand"];
  /** Extra nav sections rendered in the sidebar (e.g. a Components section). */
  navigation: LayoutConfig["navigation"];
  /** Optional ecosystem links, rendered as a final "Ecosystem" section. */
  ecosystem?: { label: string; href: string; icon?: React.ReactNode }[];
}

/** Section id -> sidebar heading. */
const SECTION_TITLES: Record<string, string> = {
  guides: "Guides",
  auth: "Auth",
  foundations: "Foundations",
  ecosystem: "Ecosystem",
};

/** Display title for a page section id ("ready-to-use" -> "Ready to Use"). */
function titleFor(section: string): string {
  if (SECTION_TITLES[section]) return SECTION_TITLES[section]!;
  return section
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Build the full LayoutConfig for a DocsApp instance: the passed
 * navigation sections, the pages-derived sections (in a stable order:
 * guides, auth, then the components section, then foundations and any
 * other sections in first-appearance order).
 *
 * Pages with a `parent` value render as nested children under a
 * collapsible parent item (e.g. auth pages under "Auth").
 */
export function buildDocsLayoutConfig(
  config: DocsSiteConfig,
  pages: DocsPage[],
  showComponents: boolean,
): LayoutConfig {
  const navigation = [...config.navigation];

  const bySection = (section: DocsPage["section"]) =>
    pages.filter((page) => page.section === section);

  // The Components section is inserted after the Auth section so the
  // component gallery follows auth in the sidebar. It renders before
  // the remaining page-driven sections (foundations, ecosystem).
  const ORDER = ["guides", "auth", "components", "foundations", "ecosystem"];
  const seen = new Set(ORDER);
  const ordered = [...ORDER];
  for (const page of pages) {
    if (!seen.has(page.section)) {
      seen.add(page.section);
      ordered.push(page.section);
    }
  }

  // Build the components section first so we can insert it at the right
  // position in the ordered sections below.
  const componentsSection = showComponents ? buildComponentsSection() : undefined;

  for (const section of ordered) {
    // The components section is assembled from the manifest, not pages.
    if (section === "components") {
      if (componentsSection) navigation.push(componentsSection);
      continue;
    }
    const sectionPages = bySection(section);
    if (sectionPages.length === 0) continue;

    // Flat pages render as top-level section items; pages with a `parent`
    // render under one collapsible parent item per parent name.
    const topLevel: DocsPage[] = [];
    const parents = new Map<string, DocsPage[]>();
    for (const page of sectionPages) {
      if (page.parent) {
        const list = parents.get(page.parent) ?? [];
        list.push(page);
        parents.set(page.parent, list);
      } else {
        topLevel.push(page);
      }
    }

    const items: NavItem[] = topLevel.map((page) => ({
      href: page.path,
      label: page.title,
    }));
    for (const [parent, children] of parents) {
      items.push({
        href: children[0]!.path,
        label: parent,
        children: children.map((child) => ({
          href: child.path,
          label: child.title,
        })),
      });
    }

    navigation.push({ title: titleFor(section), id: section, items });
  }

  if (config.ecosystem && config.ecosystem.length > 0) {
    navigation.push({
      title: "Ecosystem",
      id: "ecosystem",
      items: config.ecosystem.map((link) => ({
        href: link.href,
        label: link.label,
        icon: link.icon,
      })),
    });
  }

  return { brand: config.brand, navigation };
}

/**
 * Build the sidebar Components section from the manifest: "All components"
 * then one collapsible sub-group per manifest category. Ready-to-use
 * components are grouped under this section (no separate "Ready to Use"
 * sidebar section). Foundations (Icon, Theme) are excluded — they have
 * their own docs pages under the Foundations section.
 */
function buildComponentsSection(): NavSection {
  const byCategory = new Map<string, typeof docsManifest>();
  for (const entry of docsManifest) {
    if (entry.category === "foundations") continue;
    const list = byCategory.get(entry.category) ?? [];
    list.push(entry);
    byCategory.set(entry.category, list);
  }
  const items: NavItem[] = [{ href: "/components", label: "All components" }];
  for (const [category, entries] of byCategory) {
    items.push({
      href: `/components/${entries[0]!.slug}`,
      label: category
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" "),
      children: entries.map((entry) => ({
        href: `/components/${entry.slug}`,
        label: entry.name,
      })),
    });
  }
  return { title: "Components", id: "components", items };
}

/** Export a nav item type for consumers building their own sections. */
export type { NavItem, NavSection };
