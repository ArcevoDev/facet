/**
 * DataTable: a ready-to-use data table built on the facet Table primitives.
 *
 * Features: column visibility toggle, sortable columns, optional search box,
 * optional CSV export, pagination, and row selection with a header checkbox.
 *
 * Usage:
 *   <DataTable
 *     columns={[
 *       { key: "name", header: "Name" },
 *       { key: "email", header: "Email" },
 *     ]}
 *     data={[
 *       { id: "1", name: "Ada", email: "ada@example.com" },
 *     ]}
 *     searchable
 *     exportable
 *   />
 */

import * as React from "react";
import { cn } from "../utils.js";
import { Input } from "./input.js";
import { Button } from "./button.js";
import { Checkbox } from "./checkbox.js";
import { Icon } from "../icon/index.js";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "./table.js";

/* ── Types ─────────────────────────────────────────────────── */

export interface DataTableColumn<T extends Record<string, unknown>> {
  /** Unique key for the column; used for sorting and CSV export. */
  key: string;
  /** Column header text. */
  header: string;
  /** Accessor for the cell value (defaults to row[key]). */
  accessor?: (row: T) => string | number | null | undefined;
  /** Custom cell renderer. */
  cell?: (row: T) => React.ReactNode;
  /** Hide this column by default (user can still toggle it on). */
  hidden?: boolean;
  /** Label for hiding/showing in the column toggle menu. */
  label?: string;
  /** Disable sorting for this column. */
  sortable?: boolean;
}

export interface DataTableProps<T extends Record<string, unknown>> {
  /** Column definitions. */
  columns: DataTableColumn<T>[];
  /** Row data. Each row should carry a stable `id` for selection keys. */
  data: T[];
  /** Unique key per row, e.g. "id". Defaults to "id". */
  rowKey?: keyof T;
  /** Show a search box filtering rows by stringified cell values. */
  searchable?: boolean;
  /** Placeholder for the search box. Default: "Search..." */
  searchPlaceholder?: string;
  /** Show a CSV export button. */
  exportable?: boolean;
  /** File name for the CSV export (no extension). Default: "table-export". */
  exportFileName?: string;
  /** Paginate results, `pageSize` rows per page. */
  pagination?: boolean;
  /** Rows per page when `pagination` is set. Default: 10. */
  pageSize?: number;
  /** Enable row selection with checkboxes. */
  selectable?: boolean;
  /** Enabled columns that cannot be hidden via the toggle. */
  requiredColumns?: string[];
  /** Controlled search value. */
  search?: string;
  /** Called when the search box value changes. */
  onSearchChange?: (value: string) => void;
  className?: string;
}

/* ── Helpers ───────────────────────────────────────────────── */

function cellValue<T extends Record<string, unknown>>(
  row: T,
  column: DataTableColumn<T>,
): string {
  if (column.accessor) {
    const v = column.accessor(row);
    return v == null ? "" : String(v);
  }
  const v = row[column.key];
  return v == null ? "" : String(v);
}

function toCsv<T extends Record<string, unknown>>(
  columns: DataTableColumn<T>[],
  rows: T[],
): string {
  const escape = (value: string) => {
    if (/[",\n]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
    return value;
  };
  const header = columns.map((c) => escape(c.header)).join(",");
  const body = rows.map((row) => columns.map((c) => escape(cellValue(row, c))).join(","));
  return [header, ...body].join("\n");
}

function formatDateForExport(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/* ── Main component ────────────────────────────────────────── */

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  rowKey = "id" as keyof T,
  searchable = false,
  searchPlaceholder = "Search...",
  exportable = false,
  exportFileName = "table-export",
  pagination = false,
  pageSize = 10,
  selectable = false,
  requiredColumns = [],
  search: searchProp,
  onSearchChange,
  className,
}: DataTableProps<T>) {
  const [internalSearch, setInternalSearch] = React.useState("");
  const searchValue = searchProp ?? internalSearch;
  const setSearch = onSearchChange ?? setInternalSearch;

  const [visibleColumns, setVisibleColumns] = React.useState<string[]>(() =>
    columns.filter((c) => !c.hidden).map((c) => c.key),
  );
  const [sortKey, setSortKey] = React.useState<string | null>(null);
  const [sortDir, setSortDir] = React.useState<"asc" | "desc">("asc");
  const [page, setPage] = React.useState(1);
  const [selected, setSelected] = React.useState<Set<string>>(new Set());

  // Reset selection when data identity changes.
  React.useEffect(() => {
    setSelected(new Set());
  }, [data]);

  const toggleColumn = (key: string) => {
    setVisibleColumns((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  };

  const handleSort = (key: string) => {
    setSortKey((prevKey) => {
      if (prevKey !== key) {
        setSortDir("asc");
        return key;
      }
      setSortDir((prevDir) => (prevDir === "asc" ? "desc" : "asc"));
      return key;
    });
  };

  // Filter by search across all visible stringified cell values.
  const filtered = React.useMemo(() => {
    const q = searchValue.trim().toLowerCase();
    if (!q) return data;
    return data.filter((row) =>
      columns.some((col) => cellValue(row, col).toLowerCase().includes(q)),
    );
  }, [data, columns, searchValue]);

  // Sort.
  const sorted = React.useMemo(() => {
    if (!sortKey) return filtered;
    const column = columns.find((c) => c.key === sortKey);
    if (!column || column.sortable === false) return filtered;
    const dir = sortDir === "asc" ? 1 : -1;
    return [...filtered].sort((a, b) => {
      const va = cellValue(a, column);
      const vb = cellValue(b, column);
      return va.localeCompare(vb, undefined, { numeric: true }) * dir;
    });
  }, [filtered, columns, sortKey, sortDir]);

  // Paginate.
  const totalPages = pagination ? Math.max(1, Math.ceil(sorted.length / pageSize)) : 1;
  React.useEffect(() => {
    setPage((p) => Math.min(p, totalPages));
  }, [totalPages]);
  const pageRows = pagination ? sorted.slice((page - 1) * pageSize, page * pageSize) : sorted;

  const shownColumns = columns.filter((c) => visibleColumns.includes(c.key));

  const allSelected =
    selectable && pageRows.length > 0 && pageRows.every((row) => selected.has(String(row[rowKey])));
  const someSelected = selectable && pageRows.some((row) => selected.has(String(row[rowKey])));

  const toggleAll = () => {
    const keys = pageRows.map((row) => String(row[rowKey]));
    const next = new Set(selected);
    if (allSelected) {
      keys.forEach((k) => next.delete(k));
    } else {
      keys.forEach((k) => next.add(k));
    }
    setSelected(next);
  };

  const toggleRow = (key: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const handleExport = () => {
    const csv = toCsv(shownColumns, sorted);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${exportFileName}-${formatDateForExport(new Date())}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={cn("space-y-3", className)}>
      {/* Toolbar */}
      {(searchable || exportable || columns.some((c) => c.hidden) || selectable) && (
        <div className="flex flex-wrap items-center gap-2">
          {searchable && (
            <div className="relative min-w-0 flex-1">
              <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground">
                <Icon name="search" className="size-4" />
              </span>
              <Input
                value={searchValue}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={searchPlaceholder}
                className="pl-8"
                aria-label={searchPlaceholder}
              />
            </div>
          )}
          <div className="flex flex-wrap items-center gap-2">
            {exportable && (
              <Button type="button" variant="outline" size="sm" onClick={handleExport}>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-1.5"
                  aria-hidden="true"
                >
                  <path
                    d="M8 2V10M8 10L11 7M8 10L5 7M3 12.5V13C3 13.5523 3.44772 14 4 14H12C12.5523 14 13 13.5523 13 13V12.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Export CSV
              </Button>
            )}
            {columns.some((c) => c.hidden) && (
              <div className="flex items-center gap-1 rounded-md border border-border p-0.5">
                {columns
                  .filter((c) => c.hidden && !requiredColumns.includes(c.key))
                  .map((c) => (
                    <button
                      key={c.key}
                      type="button"
                      onClick={() => toggleColumn(c.key)}
                      aria-pressed={visibleColumns.includes(c.key)}
                      className={cn(
                        "rounded px-2 py-1 text-xs font-medium transition-colors",
                        visibleColumns.includes(c.key)
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                      )}
                    >
                      {c.label ?? c.header}
                    </button>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              {selectable && (
                <TableHead className="w-10">
                  <Checkbox
                    aria-label="Select all rows"
                    checked={allSelected}
                    onCheckedChange={toggleAll}
                    data-state={someSelected && !allSelected ? "indeterminate" : undefined}
                  />
                </TableHead>
              )}
              {shownColumns.map((column) => (
                <TableHead key={column.key} className={cn(column.sortable === false && "whitespace-nowrap")}>
                  {column.sortable === false ? (
                    column.header
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleSort(column.key)}
                      className="inline-flex items-center gap-1 hover:text-foreground"
                      aria-label={`Sort by ${column.header}`}
                    >
                      {column.header}
                      <span className="text-muted-foreground">
                        {sortKey === column.key
                          ? sortDir === "asc"
                            ? "↑"
                            : "↓"
                          : "↕"}
                      </span>
                    </button>
                  )}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageRows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={shownColumns.length + (selectable ? 1 : 0)}
                  className="h-24 text-center text-muted-foreground"
                >
                  No results found.
                </TableCell>
              </TableRow>
            ) : (
              pageRows.map((row) => {
                const key = String(row[rowKey]);
                const isSelected = selected.has(key);
                return (
                  <TableRow key={key} data-state={isSelected ? "selected" : undefined}>
                    {selectable && (
                      <TableCell>
                        <Checkbox
                          aria-label="Select row"
                          checked={isSelected}
                          onCheckedChange={() => toggleRow(key)}
                        />
                      </TableCell>
                    )}
                    {shownColumns.map((column) => (
                      <TableCell key={column.key}>
                        {column.cell ? column.cell(row) : cellValue(row, column)}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Footer */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
        <div className="min-w-0 truncate">
          {selectable && selected.size > 0 && (
            <span className="text-foreground">
              {selected.size} selected
              <button
                type="button"
                onClick={() => setSelected(new Set())}
                className="ml-2 text-xs font-medium text-primary hover:underline"
              >
                Clear
              </button>
            </span>
          )}
          {!selectable && (
            <span>
              {sorted.length} {sorted.length === 1 ? "row" : "rows"}
            </span>
          )}
        </div>
        {pagination && totalPages > 1 && (
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Previous
            </Button>
            <span className="tabular-nums">
              Page {page} of {totalPages}
            </span>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
