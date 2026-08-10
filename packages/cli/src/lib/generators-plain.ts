import path from "node:path";
import type { AddTarget, DocsAnswers, GeneratedFile } from "./types.js";

/** Extension for the consumer's language (.ts vs .js). */
function ext(language: "typescript" | "javascript"): string {
  return language === "typescript" ? "ts" : "js";
}

/**
 * Generate a framework-agnostic docs scaffold: a pages registry + a
 * markdown content pipeline, with no React shell. Suitable for plain JS,
 * Python, or any non-React repo. The consumer writes markdown under
 * <location>/content and the generator compiles it into a pages array.
 */
export function generatePlainJs(answers: DocsAnswers, cwd: string): GeneratedFile[] {
  const e = ext(answers.language);
  const base = path.join(cwd, answers.location === "." ? "" : answers.location);

  const pagesFile = answers.language === "typescript"
    ? `import type { DocsPage } from "@arcevo/facet-docs";

/**
 * Your docs pages registry (framework-agnostic). A page is data:
 * path + title + section + content blocks. The docs engine renders these
 * from any React host, but the registry itself is plain data, so it works
 * in plain JS / Python / any stack.
 */
export const docsPages: DocsPage[] = [
  {
    path: "/",
    title: "Overview",
    section: "guides",
    description: "Welcome to ${answers.name}.",
    blocks: [
      { type: "p", text: "Welcome to ${answers.name} docs." },
      { type: "h2", text: "Quick start" },
      { type: "code", text: "npm install ${answers.name}" },
    ],
  },
];
`
    : `/**
 * Your docs pages registry (framework-agnostic). A page is data:
 * path + title + section + content blocks. The docs engine renders these
 * from any React host, but the registry itself is plain data, so it works
 * in plain JS / Python / any stack.
 */
export const docsPages = [
  {
    path: "/",
    title: "Overview",
    section: "guides",
    description: "Welcome to ${answers.name}.",
    blocks: [
      { type: "p", text: "Welcome to ${answers.name} docs." },
      { type: "h2", text: "Quick start" },
      { type: "code", text: "npm install ${answers.name}" },
    ],
  },
];
`;

  const contentPipeline = `/**
 * Markdown -> DocsPage pipeline.
 *
 * Drop markdown files under ./content and this turns each into a DocsPage.
 * Front matter:
 *   ---
 *   title: My Page
 *   section: guides
 *   ---
 * Body is a limited markdown subset: paragraphs, ## h2, code fences,
 * bullet lists, and tables.
 */

export interface MarkdownDoc {
  title: string;
  section: string;
  path: string;
  description?: string;
  body: string;
}

export function parseFrontMatter(source: string): { front: Record<string, string>; body: string } {
  const m = source.match(/^---\\n([\\s\\S]*?)\\n---\\n([\\s\\S]*)$/);
  if (!m) return { front: {}, body: source };
  const front: Record<string, string> = {};
  for (const line of m[1].split("\\n")) {
    const [k, ...rest] = line.split(":");
    if (k) front[k.trim()] = rest.join(":").trim();
  }
  return { front, body: m[2] };
}

/** Render a markdown body into DocsBlock data (limited subset). */
export function markdownToBlocks(body: string): import("@arcevo/facet-docs").DocsBlock[] {
  const blocks: import("@arcevo/facet-docs").DocsBlock[] = [];
  const lines = body.split("\\n");
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      i++;
      continue;
    }
    if (line.startsWith("## ")) {
      blocks.push({ type: "h2", text: line.slice(3) });
      i++;
      continue;
    }
    if (line.startsWith("### ")) {
      blocks.push({ type: "h2", text: line.slice(4) });
      i++;
      continue;
    }
    if (line.startsWith("\`\`\`")) {
      const lang = line.slice(3).trim();
      const fence: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("\`\`\`")) {
        fence.push(lines[i]);
        i++;
      }
      i++; // closing fence
      blocks.push({ type: "code", text: fence.join("\\n"), lang: lang || undefined });
      continue;
    }
    if (line.startsWith("- ") || line.startsWith("* ")) {
      const items: string[] = [];
      while (i < lines.length && (lines[i].startsWith("- ") || lines[i].startsWith("* "))) {
        items.push(lines[i].slice(2));
        i++;
      }
      blocks.push({ type: "ul", items });
      continue;
    }
    // Paragraph: accumulate until a blank line or block start.
    const para: string[] = [line];
    i++;
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].startsWith("## ") &&
      !lines[i].startsWith("### ") &&
      !lines[i].startsWith("\`\`\`") &&
      !lines[i].startsWith("- ") &&
      !lines[i].startsWith("* ")
    ) {
      para.push(lines[i]);
      i++;
    }
    blocks.push({ type: "p", text: para.join(" ") });
  }
  return blocks;
}
`;

  const files: GeneratedFile[] = [
    { path: path.join(base, `pages.${e}`), content: pagesFile },
    {
      path: path.join(base, `content-pipeline.${e}`),
      content: answers.language === "typescript" ? contentPipeline : stripTypes(contentPipeline),
    },
  ];

  return files;
}

/**
 * Strip the type annotations from the generated content-pipeline so the
 * JavaScript variant is valid .js (interfaces and `: Type` annotations are
 * TS-only). The template is controlled, so a targeted strip is safe.
 */
function stripTypes(source: string): string {
  return source
    // Remove the interface block entirely.
    .replace(/export interface MarkdownDoc \{[\s\S]*?\n\}/, "")
    // Drop function parameter and return type annotations.
    .replace(/\((source: string)\): \{ front: Record<string, string>; body: string \}/, "(source)")
    .replace(/\(body: string\): import\("@arcevo\/facet-docs"\)\.DocsBlock\[\]/, "(body)")
    // Drop variable type annotations.
    .replace(/const (front|blocks|lines|fence|items|para): [^=]+=/, "const $1 =")
    // Drop remaining inline type annotations (fence/lang/undefined casts).
    .replace(/:\s*string\[\]/g, "")
    .replace(/:\s*Record<string, string>/g, "")
    .replace(/:\s*import\("@arcevo\/facet-docs"\)\.DocsBlock\[\]/g, "")
    .replace(/lang: lang \|\| undefined/, "lang: lang || undefined");
}

/**
 * Generate a `facet add <component>` style entry (secondary tier).
 * The primary consumption model is npm-package install; this exists for
 * consumers who prefer a copy-into-source workflow (shadcn-style).
 */
export function generateComponentAdd(
  component: string,
  cwd: string,
  answers: { language: "typescript" | "javascript"; target: AddTarget },
): GeneratedFile[] {
  const e = ext(answers.language);
  // answers.target is the components directory itself (e.g. "src/components"),
  // so the file goes directly inside it.
  const base = path.join(cwd, answers.target);
  const target = path.join(base, `${component}.${e}`);

  return [
    {
      path: target,
      content: `// Generated by @arcevo/facet-cli (facet add ${component}).
// Recommended: import from the package instead of copying source, so you
// get updates and the token system. Copying means you own every future fix.
import { ${component} } from "@arcevo/facet-components";

export default ${component};
`,
    },
  ];
}
