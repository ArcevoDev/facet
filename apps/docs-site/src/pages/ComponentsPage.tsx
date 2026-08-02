import * as React from "react";
import { Link } from "react-router-dom";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  Icon,
} from "@arcevo/facet-components";
import { ChevronDown } from "lucide-react";
import { docsManifest } from "../manifest.js";
import { ComponentPreview } from "../components/previews.js";
import { ThemePreviewFrame } from "../components/ThemePreviewFrame.js";

const PER_PAGE = 12;
const GRID_COLUMNS = [2, 3, 4] as const;

/** Range of page numbers to show, e.g. [1, 2, "...", 4] for many pages. */
function pageNumbers(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "ellipsis")[] = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  if (start > 2) pages.push("ellipsis");
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < total - 1) pages.push("ellipsis");
  pages.push(total);
  return pages;
}

type ViewMode = "grid" | "list";

/** True at the desktop (md) breakpoint or wider. */
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isDesktop;
}

export function ComponentsPage() {
  const components = docsManifest.filter((entry) => !entry.description.startsWith("Semantic"));
  const totalPages = Math.max(1, Math.ceil(components.length / PER_PAGE));
  const [page, setPage] = React.useState(1);
  const [view, setView] = React.useState<ViewMode>("grid");
  const [columns, setColumns] = React.useState<number>(3);
  const isDesktop = useIsDesktop();

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  // On small screens default to the compact list view (no horizontal
  // scrolling, no dense multi-column grid).
  React.useEffect(() => {
    if (!isDesktop && view === "grid") setView("list");
  }, [isDesktop, view]);

  // Alt + ArrowLeft/ArrowRight moves between pages.
  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!event.altKey || event.ctrlKey || event.metaKey) return;
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
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
      if (event.key === "ArrowLeft") {
        setPage((p) => Math.max(1, p - 1));
      } else {
        setPage((p) => Math.min(totalPages, p + 1));
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [totalPages]);

  const start = (page - 1) * PER_PAGE;
  const visible = components.slice(start, start + PER_PAGE);

  return (
    <article>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground">Components</h1>
          <p className="mt-2 text-muted-foreground">
            {components.length} styled Radix components. Each card shows a live preview by default;
            collapse it to show only the name. Click a component to see all its variants.
          </p>
        </div>

        {/* View controls: grid/list toggle + dynamic grid columns */}
        <div className="flex items-center gap-2">
          {view === "grid" && isDesktop && (
            <div className="hidden items-center gap-1 rounded-lg border border-border bg-muted/30 p-1 md:flex">
              {GRID_COLUMNS.map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setColumns(n)}
                  aria-pressed={columns === n}
                  aria-label={`${n} columns`}
                  className={`rounded-md px-2 py-1 text-xs font-medium transition-colors ${
                    columns === n
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          )}
          <div className="flex items-center gap-1 rounded-lg border border-border bg-muted/30 p-1">
            <button
              type="button"
              onClick={() => setView("grid")}
              aria-pressed={view === "grid"}
              aria-label="Grid view"
              className={`rounded-md p-1.5 transition-colors ${
                view === "grid"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <Icon name="grid" className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => setView("list")}
              aria-pressed={view === "list"}
              aria-label="List view"
              className={`rounded-md p-1.5 transition-colors ${
                view === "list"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <Icon name="list" className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid view: single column on mobile, dynamic columns on desktop */}
      {view === "grid" ? (
        <div
          className="mt-6 grid grid-cols-1 gap-3"
          style={isDesktop ? { gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` } : undefined}
        >
          {visible.map((entry) => (
            <ComponentCard
              key={entry.slug}
              slug={entry.slug}
              name={entry.name}
              description={entry.description}
            />
          ))}
        </div>
      ) : (
        /* List view: compact rows */
        <div className="mt-6 space-y-3">
          {visible.map((entry) => (
            <ComponentListRow
              key={entry.slug}
              slug={entry.slug}
              name={entry.name}
              description={entry.description}
            />
          ))}
        </div>
      )}

      <Pagination className="mt-8">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              aria-disabled={page === 1}
              onClick={(event) => {
                event.preventDefault();
                if (page > 1) setPage(page - 1);
              }}
              className={page === 1 ? "pointer-events-none opacity-40" : ""}
            />
          </PaginationItem>
          {pageNumbers(page, totalPages).map((n, i) =>
            n === "ellipsis" ? (
              <PaginationItem key={`e-${i}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={n}>
                <PaginationLink
                  href="#"
                  isActive={n === page}
                  onClick={(event) => {
                    event.preventDefault();
                    setPage(n);
                  }}
                >
                  {n}
                </PaginationLink>
              </PaginationItem>
            ),
          )}
          <PaginationItem>
            <PaginationNext
              href="#"
              aria-disabled={page === totalPages}
              onClick={(event) => {
                event.preventDefault();
                if (page < totalPages) setPage(page + 1);
              }}
              className={page === totalPages ? "pointer-events-none opacity-40" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <p className="mt-3 text-center text-sm text-muted-foreground">
        Page {page} of {totalPages}
      </p>
    </article>
  );
}

function ComponentCard({
  slug,
  name,
  description,
}: {
  slug: string;
  name: string;
  description: string;
}) {
  const [open, setOpen] = React.useState(true);

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className="overflow-hidden rounded-lg border border-border"
    >
      <CollapsibleTrigger asChild>
        <button
          type="button"
          aria-expanded={open}
          className="flex w-full items-center justify-between gap-3 border-b border-border bg-muted/30 px-4 py-3 text-left transition-colors hover:bg-muted/60"
        >
          <span className="min-w-0">
            <span className="block truncate font-semibold text-foreground">{name}</span>
            {description && (
              <span className="block truncate text-sm text-muted-foreground">{description}</span>
            )}
          </span>
          <ChevronDown
            className={`size-4 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>
      </CollapsibleTrigger>

      {open && (
        <ThemePreviewFrame>
          <ComponentPreview slug={slug} />
        </ThemePreviewFrame>
      )}

      <CollapsibleContent>
        <div className="flex justify-end px-4 py-2">
          <Link
            to={`/components/${slug}`}
            className="text-sm font-medium text-primary hover:underline"
          >
            View all variants →
          </Link>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

function ComponentListRow({
  slug,
  name,
  description,
}: {
  slug: string;
  name: string;
  description: string;
}) {
  return (
    <Link
      to={`/components/${slug}`}
      className="flex items-center justify-between gap-4 rounded-lg border border-border px-4 py-3 transition-colors hover:border-primary/50 hover:bg-accent/40"
    >
      <span className="min-w-0">
        <span className="block font-semibold text-foreground">{name}</span>
        {description && (
          <span className="block truncate text-sm text-muted-foreground">{description}</span>
        )}
      </span>
      <span className="shrink-0 text-sm font-medium text-primary">View →</span>
    </Link>
  );
}
