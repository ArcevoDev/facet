import * as React from "react";
import type { LayoutConfig, NavItem, NavSection } from "@arcevo/facet-layout";
import type { DocsPage } from "./pages.js";
import { extendedManifest } from "./manifest.js";

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

  // The Components and Ready-to-Use sections are inserted after the Auth
  // section so the gallery follows auth in the sidebar. They render before
  // the remaining page-driven sections (foundations, ecosystem).
  const ORDER = ["guides", "auth", "components", "ready-to-use", "foundations", "ecosystem"];
  const seen = new Set(ORDER);
  const ordered = [...ORDER];
  for (const page of pages) {
    if (!seen.has(page.section)) {
      seen.add(page.section);
      ordered.push(page.section);
    }
  }

  // Build the components + ready-to-use sections first so we can insert
  // them at the right positions in the ordered sections below.
  const componentsSection = showComponents ? buildComponentsSection() : undefined;
  const readyToUseSection = showComponents ? buildReadyToUseSection() : undefined;

  for (const section of ordered) {
    // The components / ready-to-use sections are assembled from the
    // manifest, not pages.
    if (section === "components") {
      if (componentsSection) navigation.push(componentsSection);
      continue;
    }
    if (section === "ready-to-use") {
      if (readyToUseSection) navigation.push(readyToUseSection);
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
 * then one collapsible sub-group per manifest category. Only base UI
 * primitives live here — the auth and layout surfaces (SignIn, SignUp,
 * ConsoleLayout, ...) are excluded because they have their own guide pages
 * with interactive demos under the Auth and Layout sections. Foundations
 * (Icon, Theme) also have their own docs pages under Foundations, and the
 * Ready-to-Use components live in the dedicated "Ready to Use" section
 * (buildReadyToUseSection).
 */
function buildComponentsSection(): NavSection {
  const byCategory = new Map<string, typeof extendedManifest>();
  for (const entry of extendedManifest) {
    if (
      entry.category === "foundations" ||
      entry.category === "ready-to-use" ||
      entry.category === "auth" ||
      entry.category === "layout"
    ) {
      continue;
    }
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

/**
 * Build the dedicated "Ready to Use" sidebar section from the manifest:
 * ready-to-use extras (Dropzone, ColorPicker, QRCode, Marquee, Roadmap,
 * Form) rendered as top-level items with their gallery pages.
 */
export function buildReadyToUseSection(): NavSection {
  const readyToUse = extendedManifest.filter((entry) => entry.category === "ready-to-use");
  return {
    title: "Ready to Use",
    id: "ready-to-use",
    items: readyToUse.map((entry) => ({
      href: `/components/${entry.slug}`,
      label: entry.name,
    })),
  };
}

/** Export a nav item type for consumers building their own sections. */
export type { NavItem, NavSection };
