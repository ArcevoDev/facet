import prompts from "prompts";
import {
  detectStyling,
  detectFramework,
  type DocsAnswers,
  type Framework,
  type Styling,
} from "./types.js";
import { resolveFacetVersions } from "./registry.js";

const FRAMEWORKS: { value: Framework; label: string; hint?: string }[] = [
  { value: "react-vite", label: "React + Vite", hint: "full docs app (recommended)" },
  { value: "next", label: "Next.js", hint: "route + pages registry" },
  { value: "remix", label: "Remix", hint: "route + pages registry" },
  { value: "plain-js", label: "Plain JS / Markdown", hint: "pages registry + content pipeline, no React shell" },
  { value: "python", label: "Python", hint: "markdown content pipeline only" },
];

const TEMPLATES = [
  { value: "component-library", label: "Component library", hint: "pages per component (like facet's own docs)" },
  { value: "api-reference", label: "API reference", hint: "endpoints, types, and examples" },
  { value: "product-docs", label: "Product docs", hint: "getting started, guides, and FAQs" },
] as const;

/**
 * Interactive wizard for `facet docs init`. Detects the consumer's
 * frontend framework (ignoring backend stacks like Fastify/Express —
 * docs are a frontend concern), styling setup, and package manager, then
 * resolves the current facet package versions from the npm registry so
 * the scaffold never pins an outdated version.
 */
export async function runInitWizard(cwd: string): Promise<DocsAnswers> {
  const detectedStyling = detectStyling(cwd);
  const detectedFramework = detectFramework(cwd);

  // Resolve current published versions up front (falls back to loose
  // ranges if offline). The wizard can show the resolved versions in the
  // final summary and the generator uses them for the package.json.
  const facetVersions = await resolveFacetVersions();

  const initial: DocsAnswers = {
    name: "docs",
    location: ".",
    language: "typescript",
    framework: detectedFramework,
    styling: detectedStyling,
    useFacetTokens: true,
    template: "component-library",
    facetVersions,
  };

  const res = await prompts([
    {
      type: "text",
      name: "name",
      message: "What should your docs site be called?",
      initial: initial.name,
    },
    {
      type: "select",
      name: "location",
      message: "Where should the docs scaffold live?",
      choices: [
        { title: "Root (.)", description: "Recommended: docs at the repo root, like Docusaurus/Mintlify", value: "." },
        { title: "docs/", value: "docs" },
        { title: "src/docs/", value: "src/docs" },
      ],
    },
    {
      type: "toggle",
      name: "language",
      message: "TypeScript or JavaScript?",
      initial: initial.language === "typescript",
      active: "TypeScript",
      inactive: "JavaScript",
    },
    {
      type: "select",
      name: "framework",
      message: `What frontend framework are you on? (detected: ${detectedFramework})`,
      choices: FRAMEWORKS.map((f) => ({ title: f.label, description: f.hint, value: f.value })),
      initial: FRAMEWORKS.findIndex((f) => f.value === detectedFramework),
    },
    {
      type: "select",
      name: "styling",
      message: "How is your app styled today?",
      choices: [
        { title: "facet tokens (recommended)", description: "Already using @arcevo/facet-tokens", value: "facet-tokens" },
        { title: "Tailwind CSS", value: "tailwind" },
        { title: "Plain CSS", value: "plain-css" },
        { title: "None / custom", value: "none" },
      ],
      initial: initial.styling === "facet-tokens" ? 0 : initial.styling === "tailwind" ? 1 : initial.styling === "plain-css" ? 2 : 3,
    },
    {
      type: "toggle",
      name: "useFacetTokens",
      message: "Wire up @arcevo/facet-tokens for theming? (recommended — saves restyling every component)",
      initial: true,
      active: "Yes, use facet tokens",
      inactive: "No, keep my styling",
    },
    {
      type: "select",
      name: "template",
      message: "What kind of docs are you publishing?",
      choices: TEMPLATES.map((t) => ({ title: t.label, description: t.hint, value: t.value })),
      initial: 0,
    },
  ]);

  const language: "typescript" | "javascript" = res.language ? "typescript" : "javascript";
  const framework: Framework = res.framework ?? initial.framework;
  const styling: Styling = res.styling ?? initial.styling;

  return {
    name: (res.name as string)?.trim() || initial.name,
    location: res.location ?? initial.location,
    language,
    framework,
    styling,
    useFacetTokens: res.useFacetTokens ?? initial.useFacetTokens,
    template: res.template ?? initial.template,
    facetVersions,
  };
}
