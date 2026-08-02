import * as React from "react";
import { Link, useParams, Navigate, useNavigate } from "react-router-dom";
import { docsManifest } from "../manifest.js";
import { ComponentDemoCard } from "../components/ComponentDemoCard.js";
import { ComponentPreview } from "../components/previews.js";
import { CodeBlock } from "../components/CodeBlock.js";
import { variantCells } from "../lib/variants.js";
import { usageCode } from "../lib/usage.js";
import { PageNav } from "../components/Guide.js";
import type { Control } from "../components/Playground.js";

/** Variant/size controls for components that have obvious options. */
export function demoControls(slug: string): Control[] | undefined {
  switch (slug) {
    case "button":
      return [
        {
          label: "Variant",
          options: ["default", "secondary", "outline", "ghost", "destructive", "link"],
          value: "default",
          onChange: () => {},
        },
        {
          label: "Size",
          options: ["default", "sm", "lg", "icon"],
          value: "default",
          onChange: () => {},
        },
      ];
    case "badge":
      return [
        {
          label: "Variant",
          options: ["default", "secondary", "outline", "success", "warning", "destructive"],
          value: "default",
          onChange: () => {},
        },
      ];
    default:
      return undefined;
  }
}

export function ComponentPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  if (!slug) return <Navigate to="/components" replace />;
  const entry = docsManifest.find((e) => e.slug === slug);
  if (!entry) return <Navigate to="/components" replace />;

  // Live controls for parameterized previews (Button/Badge).
  const controls = demoControls(slug);
  const [variant, setVariant] = React.useState("default");
  const [size, setSize] = React.useState("default");
  const liveControls = controls?.map((c) =>
    c.label === "Variant"
      ? { ...c, value: variant, onChange: setVariant }
      : { ...c, value: size, onChange: setSize },
  );

  const cells = variantCells(slug);

  // Prev/next within the manifest order.
  const index = docsManifest.findIndex((e) => e.slug === slug);
  const prev = index > 0 ? docsManifest[index - 1] : undefined;
  const next = index >= 0 && index < docsManifest.length - 1 ? docsManifest[index + 1] : undefined;

  // Alt+Up / Alt+Down moves to the previous / next component in the
  // manifest order. Ignored while typing in a field.
  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!event.altKey || event.ctrlKey || event.metaKey) return;
      if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return;
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable)
      ) {
        return;
      }
      event.preventDefault();
      if (event.key === "ArrowUp" && prev) navigate(`/components/${prev.slug}`);
      if (event.key === "ArrowDown" && next) navigate(`/components/${next.slug}`);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [prev, next, navigate]);

  return (
    <article>
      <p className="mb-2 text-sm text-muted-foreground">
        <Link to="/components" className="inline-flex items-center gap-1.5 hover:text-foreground">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M10 4L6 8L10 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Components
        </Link>{" "}
        / {entry.name}
      </p>
      <h1 className="font-heading text-3xl font-bold text-foreground">{entry.name}</h1>
      {entry.description && (
        <p className="mt-2 text-muted-foreground">{entry.description}</p>
      )}

      <ComponentDemoCard
        name={entry.name}
        description={entry.description}
        collapsed={<ComponentPreview slug={slug} />}
        controls={liveControls}
        expanded={<ComponentPreview slug={slug} variant={variant} size={size} />}
      />

      {cells && cells.length > 0 && (
        <section className="mt-8">
          <h2 className="font-heading text-xl font-semibold text-foreground">Variants</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cells.map((cell) => (
              <div
                key={cell.label}
                className="overflow-hidden rounded-lg border border-border"
              >
                <div className="flex min-h-28 items-center justify-center p-4">{cell.node}</div>
                <p className="border-t border-border bg-muted/30 px-3 py-1.5 text-center text-xs font-medium text-muted-foreground">
                  {cell.label}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mt-8">
        <CodeBlock title="Usage" code={usageCode(slug)} />
      </section>

      <PageNav
        prev={prev ? { label: prev.name, to: `/components/${prev.slug}` } : undefined}
        next={next ? { label: next.name, to: `/components/${next.slug}` } : undefined}
      />
    </article>
  );
}
