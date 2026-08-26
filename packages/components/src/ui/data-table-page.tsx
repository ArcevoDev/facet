/**
 * @arcevo/facet-components: DataTablePage
 *
 * A ready-to-use data table page wrapper: breadcrumbs header + title +
 * description + filter bar + density toggle + pagination + the
 * underlying DataTable. Distinct from the bare `DataTable` component.
 */

import * as React from "react";
import { cn } from "../utils.js";
import { Card, CardContent } from "./card.js";
import { Button } from "./button.js";
import { Input } from "./input.js";
import { Icon, type IconName } from "../icon/index.js";
import { DataTable, type DataTableColumn } from "./data-table.js";

/* ── Types ─────────────────────────────────────────────────── */

export interface DataTablePageFilter {
  /** Unique key for the filter. */
  id: string;
  /** Render the filter UI. */
  render: () => React.ReactNode;
}

export interface DataTablePageBreadcrumb {
  label: string;
  href?: string;
}

export type DataTableDensity = "compact" | "comfortable";

export interface DataTablePageProps<T extends object> {
  /** Page title. */
  title: string;
  /** Optional one-line description. */
  description?: string;
  /** Breadcrumb trail (newest last). */
  breadcrumbs?: DataTablePageBreadcrumb[];
  /** Optional icon for the title row. */
  icon?: IconName;
  /** Columns (passed straight through to `DataTable`). */
  columns: DataTableColumn<T>[];
  /** Rows to render. */
  rows: T[];
  /** Row key extractor. */
  rowKey?: keyof T;
  /** Search value + handler (shown as a search input in the filter bar). */
  search?: {
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
  };
  /** Filter bar slot (rendered after the search input). */
  filters?: DataTablePageFilter[];
  /** Primary action button (e.g. "New row"). */
  primaryAction?: {
    label: string;
    onClick?: () => void;
    href?: string;
    icon?: IconName;
  };
  /** Secondary actions (overflow menu). */
  secondaryActions?: Array<{
    label: string;
    onClick?: () => void;
    href?: string;
    icon?: IconName;
  }>;
  /** Pagination. */
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    onPageChange: (page: number) => void;
  };
  /** Default density. Default: "comfortable". */
  defaultDensity?: DataTableDensity;
  /** Called when density changes. */
  onDensityChange?: (d: DataTableDensity) => void;
  /** Empty-state slot when rows is empty. */
  emptyState?: React.ReactNode;
  /** Loading state. Renders a skeleton placeholder. */
  loading?: boolean;
  /** Extra className for the wrapper. */
  className?: string;
}

/* ── Helpers ───────────────────────────────────────────────── */

const DensityToggle = ({
  value,
  onChange,
}: {
  value: DataTableDensity;
  onChange: (d: DataTableDensity) => void;
}) => (
  <div className="flex items-center rounded-md border border-border bg-secondary/30 p-0.5">
    <button
      type="button"
      aria-label="Comfortable density"
      aria-pressed={value === "comfortable"}
      onClick={() => onChange("comfortable")}
      className={cn(
        "rounded-sm px-2 py-1 text-xs",
        value === "comfortable" ? "bg-background shadow-sm" : "text-muted-foreground",
      )}
    >
      <Icon name="rows-3" className="size-3.5" />
    </button>
    <button
      type="button"
      aria-label="Compact density"
      aria-pressed={value === "compact"}
      onClick={() => onChange("compact")}
      className={cn(
        "rounded-sm px-2 py-1 text-xs",
        value === "compact" ? "bg-background shadow-sm" : "text-muted-foreground",
      )}
    >
      <Icon name="rows-4" className="size-3.5" />
    </button>
  </div>
);

/* ── Component ─────────────────────────────────────────────── */

/**
 * A batteries-included data table page: header (title, description,
 * breadcrumbs, primary action) + filter bar (search, custom filters,
 * density toggle) + DataTable + pagination.
 *
 * Distinct from `DataTable` (which is just the table itself).
 */
export function DataTablePage<T extends object>({
  title: titleText,
  description,
  breadcrumbs,
  icon,
  columns,
  rows,
  rowKey,
  search,
  filters,
  primaryAction,
  secondaryActions,
  pagination,
  defaultDensity = "comfortable",
  onDensityChange,
  emptyState,
  loading,
  className,
}: DataTablePageProps<T>) {
  const [density, setDensity] = React.useState<DataTableDensity>(defaultDensity);

  const setDensityAnd = React.useCallback(
    (d: DataTableDensity) => {
      setDensity(d);
      onDensityChange?.(d);
    },
    [onDensityChange],
  );

  return (
    <div className={cn("flex w-full flex-col gap-4", className)}>
      {/* Header */}
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div className="space-y-1">
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs text-muted-foreground">
              {breadcrumbs.map((b, i) => (
                <span key={`${b.label}-${i}`} className="flex items-center gap-1">
                  {b.href ? (
                    <a className="hover:text-foreground" href={b.href}>
                      {b.label}
                    </a>
                  ) : (
                    <span>{b.label}</span>
                  )}
                  {i < breadcrumbs.length - 1 && (
                    <Icon name="chevron-right" className="size-3" />
                  )}
                </span>
              ))}
            </nav>
          )}
          <div className="flex items-center gap-2">
            {icon && <Icon name={icon} className="size-5 text-muted-foreground" />}
            <h1 className="text-2xl font-semibold tracking-tight">{titleText}</h1>
          </div>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>

        <div className="flex items-center gap-2">
          {secondaryActions?.map((a) =>
            a.href ? (
              <Button key={a.label} variant="outline" asChild>
                <a href={a.href}>
                  {a.icon && <Icon name={a.icon} className="size-4" />}
                  {a.label}
                </a>
              </Button>
            ) : (
              <Button
                key={a.label}
                variant="outline"
                onClick={a.onClick}
              >
                {a.icon && <Icon name={a.icon} className="size-4" />}
                {a.label}
              </Button>
            ),
          )}
          {primaryAction &&
            (primaryAction.href ? (
              <Button asChild>
                <a href={primaryAction.href}>
                  {primaryAction.icon && <Icon name={primaryAction.icon} className="size-4" />}
                  {primaryAction.label}
                </a>
              </Button>
            ) : (
              <Button onClick={primaryAction.onClick}>
                {primaryAction.icon && <Icon name={primaryAction.icon} className="size-4" />}
                {primaryAction.label}
              </Button>
            ))}
        </div>
      </header>

      {/* Filter bar */}
      {(search || filters?.length) && (
        <div className="flex flex-wrap items-center gap-2">
          {search && (
            <div className="relative">
              <Icon
                name="search"
                className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                type="search"
                placeholder={search.placeholder ?? "Search…"}
                value={search.value}
                onChange={(e) => search.onChange(e.target.value)}
                className="h-8 w-56 pl-8"
              />
            </div>
          )}
          {filters?.map((f) => (
            <div key={f.id}>{f.render()}</div>
          ))}
          <div className="ml-auto">
            <DensityToggle value={density} onChange={setDensityAnd} />
          </div>
        </div>
      )}

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex h-48 items-center justify-center text-sm text-muted-foreground">
              Loading…
            </div>
          ) : rows.length === 0 && emptyState ? (
            <div className="p-6">{emptyState}</div>
          ) : (
            <div className={cn(density === "compact" && "[&_td]:py-2 [&_th]:py-2")}>
              <DataTable<T> columns={columns} data={rows} rowKey={rowKey} />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {pagination && (
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Page {pagination.page} of{" "}
            {Math.max(1, Math.ceil(pagination.total / pagination.pageSize))} ·{" "}
            {pagination.total} total
          </span>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.page <= 1}
              onClick={() => pagination.onPageChange(pagination.page - 1)}
            >
              <Icon name="chevron-left" className="size-4" />
              Prev
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={
                pagination.page >=
                Math.ceil(pagination.total / pagination.pageSize)
              }
              onClick={() => pagination.onPageChange(pagination.page + 1)}
            >
              Next
              <Icon name="chevron-right" className="size-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

DataTablePage.displayName = "DataTablePage";