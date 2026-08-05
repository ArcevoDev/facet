import { Link, Navigate, useLocation } from "react-router-dom";
import {
  GuidePage,
  H2,
  P,
  Ul,
  Li,
  PageNav,
} from "../components/Guide.js";
import { DocsTable } from "../components/DocsTable.js";
import { CodeBlock } from "../components/CodeBlock.js";
import { InstallTabs } from "../components/InstallTabs.js";
import { AuthDemo } from "../components/AuthDemo.js";
import { AuthPreviews } from "../components/AuthPreviews.js";
import { LayoutPreviews } from "../components/LayoutPreviews.js";
import { InteractiveDemo } from "../components/InteractiveDemo.js";
import { KeyboardShortcuts } from "../components/KeyboardShortcuts.js";
import type { DocsBlock } from "../lib/pages.js";
import { useDocsApp } from "../context.js";
import { useDocsKeyboardNav, useDocsNavigation } from "../lib/keyboard-nav.js";

/** Render a single structured content block. */
function Block({ block }: { block: DocsBlock }) {
  switch (block.type) {
    case "h2":
      return <H2>{block.text}</H2>;
    case "p":
      return <P>{block.text}</P>;
    case "code":
      return <CodeBlock code={block.text} />;
    case "install":
      return (
        <InstallTabs
          commands={[{ pkg: block.pkg, extras: block.extras }]}
        />
      );
    case "ul":
      return (
        <Ul>
          {block.items.map((item, i) => (
            <Li key={i}>{item}</Li>
          ))}
        </Ul>
      );
    case "table":
      return <DocsTable headers={block.headers} rows={block.rows} />;
    case "link":
      return (
        <Link to={block.href} className="text-primary underline-offset-4 hover:underline">
          {block.label}
        </Link>
      );
    case "authDemo":
      return <AuthDemo />;
    case "demo":
      return (
        <InteractiveDemo
          slug={block.slug}
          title={block.title}
          description={block.description}
          labels={block.labels}
        />
      );
    case "authPreviews":
      return <AuthPreviews />;
    case "layoutPreviews":
      return <LayoutPreviews />;
    case "keyboardShortcuts":
      return (
        <KeyboardShortcuts
          shortcuts={[
            { label: "Open search / command palette", keys: ["mod", "K"] },
            { label: "Collapse / expand sidebar", keys: ["mod", "B"] },
            { label: "Previous page", keys: ["Alt", "←"] },
            { label: "Next page", keys: ["Alt", "→"] },
            { label: "Previous page", keys: ["Alt", "↑"] },
            { label: "Next page", keys: ["Alt", "↓"] },
          ]}
        />
      );
  }
}

/**
 * Content-driven docs page. Renders whatever pages the DocsApp config
 * declares for the current path (consumers pass their own registry and it
 * renders here with zero component edits).
 */
export function DocsContentPage() {
  const { pages } = useDocsApp();
  const { pathname } = useLocation();
  const page = pages.find((p) => p.path === pathname);
  if (!page) return <Navigate to="/" replace />;

  // Unified prev/next across the whole docs site (content pages +
  // components), so Alt+Up/Down works on every page.
  const { prev, next } = useDocsNavigation();
  useDocsKeyboardNav();

  return (
    <GuidePage title={page.title} description={page.description}>
      {page.blocks.map((block, i) => (
        <Block key={i} block={block} />
      ))}
      <PageNav
        prev={prev ? { label: prev.label, to: prev.path } : undefined}
        next={next ? { label: next.label, to: next.path } : undefined}
      />
    </GuidePage>
  );
}
