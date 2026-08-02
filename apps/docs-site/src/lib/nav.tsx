import * as React from "react";
import { Compass, Layers, Palette, Sparkles, KeyRound, Building2 } from "lucide-react";
import type { LayoutConfig, NavItem, NavSection } from "@arcevo/facet-layout";
import { docsManifest } from "../manifest.js";

/**
 * Navigation config for the docs site shell (feeds facet Sidebar).
 *
 * The `ecosystem` list is optional. When present, it renders as a
 * final "Ecosystem" section in the sidebar, linking to documentation
 * for arc-id and any future Arcevo ecosystem products.
 */
export interface DocsSiteConfig {
  brand: LayoutConfig["brand"];
  /** Nav sections rendered in the sidebar, excluding the ecosystem section. */
  navigation: LayoutConfig["navigation"];
  /** Optional ecosystem links, rendered as a final "Ecosystem" section. */
  ecosystem?: { label: string; href: string; icon?: React.ReactNode }[];
}

const icon = (I: typeof Compass) => React.createElement(I, { className: "size-4" });

/** Build the Components section from the manifest: one nav item per component. */
function buildComponentsSection(): NavSection {
  const items: NavItem[] = docsManifest
    .filter((entry) => !entry.description.startsWith("Semantic"))
    .map((entry) => ({
      href: `/components/${entry.slug}`,
      label: entry.name,
    }));
  return { title: "Components", id: "components", items };
}

/** Docs site shell config. Customize branding, nav, and ecosystem links here. */
export const docsSiteConfig: DocsSiteConfig = {
  brand: {
    name: "facet",
    tagline: "Component library for the Arcevo ecosystem",
  },
  navigation: [
    {
      title: "Guides",
      id: "guides",
      items: [
        { href: "/", label: "Overview", icon: icon(Compass) },
        { href: "/getting-started", label: "Getting Started", icon: icon(Sparkles) },
        { href: "/theming", label: "Theming", icon: icon(Palette) },
        { href: "/tokens", label: "Design Tokens", icon: icon(Layers) },
        { href: "/auth", label: "Auth", icon: icon(KeyRound) },
        { href: "/layout", label: "Layout", icon: icon(Building2) },
      ],
    },
    buildComponentsSection(),
    {
      title: "Foundations",
      id: "foundations",
      items: [
        { href: "/foundations/icon", label: "Icon", icon: icon(Sparkles) },
        { href: "/foundations/theme", label: "Theme", icon: icon(Palette) },
      ],
    },
  ],
  ecosystem: [{ label: "arc-id", href: "/arc-id", icon: icon(KeyRound) }],
};

/** Build the full LayoutConfig, appending the ecosystem section when configured. */
export function buildDocsLayoutConfig(config: DocsSiteConfig = docsSiteConfig): LayoutConfig {
  const navigation = [...config.navigation];
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
