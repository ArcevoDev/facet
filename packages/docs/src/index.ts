/**
 * @arcevo/facet-docs
 *
 * Installable, config-driven documentation site engine.
 *
 * Mount <DocsApp config={...} pages={...} /> with your own brand, nav,
 * content pages, and ecosystem links. Ships the component gallery
 * (paginated index + per-component variant pages with per-variant usage
 * tabs), install tabs, and a searchable sidebar shell, all driven by
 * the config you pass.
 */

// Mountable app
export { DocsApp } from "./docs-app.js";
export type { DocsAppProps } from "./docs-app.js";

// Config + context
export { DocsAppProvider, useDocsApp } from "./context.js";
export type { DocsAppValue } from "./context.js";

// Page registry
export type { DocsPage, DocsBlock, DocsLink } from "./lib/pages.js";
export { docsPages, slugify } from "./lib/pages.js";

// Nav config
export type { DocsSiteConfig } from "./lib/nav.js";
export { buildDocsLayoutConfig } from "./lib/nav.js";
export type { NavItem, NavSection } from "./lib/nav.js";

// Reusable docs components
export { GuidePage, H2, P, Pre, Ul, Li, Code, PageNav, InlineText } from "./components/Guide.js";
export type { GuidePageProps } from "./components/Guide.js";
export { DocsTable } from "./components/DocsTable.js";
export type { DocsTableProps } from "./components/DocsTable.js";
export { CodeBlock } from "./components/CodeBlock.js";
export type { CodeBlockProps } from "./components/CodeBlock.js";
export { InstallTabs } from "./components/InstallTabs.js";
export type { InstallCommand } from "./components/InstallTabs.js";
export { VariantUsageTabs } from "./components/VariantUsageTabs.js";
export { AuthDemo } from "./components/AuthDemo.js";
export type { AuthDemoProps, AuthDemoConfig, AuthDemoStep } from "./components/AuthDemo.js";
export { AuthPreviews } from "./components/AuthPreviews.js";
export { LayoutPreviews } from "./components/LayoutPreviews.js";
export { KeyboardShortcuts } from "./components/KeyboardShortcuts.js";
export type { KeyboardShortcutsProps, KeyboardShortcut } from "./components/KeyboardShortcuts.js";
export { ThemePreviewFrame } from "./components/ThemePreviewFrame.js";
export type { ThemePreviewFrameProps } from "./components/ThemePreviewFrame.js";
export { Playground, useControl } from "./components/Playground.js";
export type { Control, PlaygroundProps } from "./components/Playground.js";

// Content engine
export { DocsContentPage } from "./pages/DocsContentPage.js";
export { ComponentsPage } from "./pages/ComponentsPage.js";
export { ComponentPage } from "./pages/ComponentPage.js";

// Component manifest (auto-generated)
export { docsManifest } from "./manifest.js";
export type { DocsManifestEntry } from "./manifest.js";
