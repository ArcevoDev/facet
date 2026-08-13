import * as React from "react";
import { cn } from "../utils.js";
import { Button } from "./button.js";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "./sheet.js";
import { ScrollArea } from "./scroll-area.js";

/* ── Types ─────────────────────────────────────────────────── */

export type NotificationType = "default" | "success" | "warning" | "error" | "info";

export interface Notification {
  id: string;
  title: string;
  description?: string;
  time?: string;
  read?: boolean;
  type?: NotificationType;
  /** Optional element rendered at the start (avatar, icon, etc.) */
  icon?: React.ReactNode;
  /** Callback when a single notification is clicked */
  onClick?: (notification: Notification) => void;
}

export interface NotificationDrawerProps {
  /** List of notifications */
  notifications?: Notification[];
  /** Total unread count (defaults to counting unread from notifications) */
  unreadCount?: number;
  /** Called when a notification is clicked */
  onNotificationClick?: (notification: Notification) => void;
  /** Called when "Mark all as read" is clicked */
  onMarkAllRead?: () => void;
  /** Called when a single notification is marked read */
  onMarkRead?: (notification: Notification) => void;
  /** Called when a notification is dismissed (remove from list) */
  onDismiss?: (notification: Notification) => void;
  /** Called when a notification is deleted (hard remove, distinct from dismiss) */
  onDelete?: (notification: Notification) => void;
  /** Show the toolbar (search + filter + actions). Default: true when any
   *  of onSearchChange/onFilterChange/onMarkAllRead/onDelete is provided. */
  showToolbar?: boolean;
  /** Controlled search query (defaults to internal state). */
  search?: string;
  /** Called when the search box changes. */
  onSearchChange?: (query: string) => void;
  /** Controlled read filter. Default: "all". */
  filter?: "all" | "unread";
  /** Called when the read filter changes. */
  onFilterChange?: (filter: "all" | "unread") => void;
  /** Custom trigger element */
  trigger?: React.ReactNode;
  /** Drawer side */
  side?: "left" | "right";
  /** Show a footer with "View all" action */
  showFooter?: boolean;
  /** Called when "View all" is clicked */
  onViewAll?: () => void;
  /** Empty state content */
  emptyState?: React.ReactNode;
  /** Panel header content override */
  header?: React.ReactNode;
  className?: string;
}

/* ── Type styling ──────────────────────────────────────────── */

const typeStyles: Record<NotificationType, { dot: string; icon: string }> = {
  default: { dot: "bg-muted-foreground", icon: "text-muted-foreground" },
  success: { dot: "bg-emerald-500", icon: "text-emerald-500" },
  warning: { dot: "bg-amber-500", icon: "text-amber-500" },
  error: { dot: "bg-red-500", icon: "text-red-500" },
  info: { dot: "bg-sky-500", icon: "text-sky-500" },
};

/* ── Component ─────────────────────────────────────────────── */

export function NotificationDrawer({
  notifications = [],
  unreadCount,
  onNotificationClick,
  onMarkAllRead,
  onMarkRead,
  onDismiss,
  onDelete,
  showToolbar,
  search: searchProp,
  onSearchChange,
  filter: filterProp,
  onFilterChange,
  trigger,
  side = "right",
  showFooter = true,
  onViewAll,
  emptyState,
  header,
  className,
}: NotificationDrawerProps) {
  const [internalSearch, setInternalSearch] = React.useState("");
  const [internalFilter, setInternalFilter] = React.useState<"all" | "unread">("all");
  const search = searchProp ?? internalSearch;
  const setSearch = onSearchChange ?? setInternalSearch;
  const filter = filterProp ?? internalFilter;
  const setFilter = onFilterChange ?? setInternalFilter;

  const count = unreadCount ?? notifications.filter((n) => n.read !== true).length;

  // Toolbar is shown when explicitly requested OR any action/search/filter
  // handler is wired (so a bare drawer stays clean).
  const toolbarEnabled =
    showToolbar ??
    Boolean(onSearchChange || onFilterChange || onMarkAllRead || onDelete);

  const handleClick = (n: Notification) => {
    if (n.read !== true) onMarkRead?.(n);
    onNotificationClick?.(n);
  };

  // Filter by read state + search across title/description.
  const q = search.trim().toLowerCase();
  const visible = notifications.filter((n) => {
    if (filter === "unread" && n.read !== false) return false;
    if (!q) return true;
    return (
      n.title.toLowerCase().includes(q) || (n.description ?? "").toLowerCase().includes(q)
    );
  });
  const hasUnread = notifications.some((n) => n.read !== true);

  return (
    <Sheet>
      <SheetTrigger asChild>
        {trigger ?? (
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            aria-label={`Notifications${count > 0 ? ` (${count} unread)` : ""}`}
          >
            <BellIcon />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-medium text-destructive-foreground">
                {count > 99 ? "99+" : count}
              </span>
            )}
          </Button>
        )}
      </SheetTrigger>

      <SheetContent side={side} className={cn("flex w-full flex-col p-0 sm:max-w-sm", className)}>
        {header ?? (
          <SheetHeader className="flex flex-row items-center justify-between gap-4 border-b px-4 py-3">
            <SheetTitle>Notifications</SheetTitle>
            {count > 0 && onMarkAllRead && (
              <button onClick={onMarkAllRead} className="text-xs text-primary hover:underline">
                Mark all as read
              </button>
            )}
          </SheetHeader>
        )}

        {toolbarEnabled && notifications.length > 0 && (
          <div className="flex flex-col gap-2 border-b px-4 py-2">
            {/* Search */}
            <div className="relative">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search notifications..."
                className="h-8 w-full rounded-md border border-input bg-transparent pl-8 pr-2.5 text-sm outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
            {/* Filter + actions */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1 rounded-md border border-border p-0.5">
                {(["all", "unread"] as const).map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFilter(f)}
                    aria-pressed={filter === f}
                    className={cn(
                      "rounded px-2 py-0.5 text-xs font-medium capitalize transition-colors",
                      filter === f
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                    )}
                  >
                    {f}
                  </button>
                ))}
              </div>
              {onMarkAllRead && hasUnread && (
                <button
                  type="button"
                  onClick={onMarkAllRead}
                  className="text-xs text-primary hover:underline"
                >
                  Mark all read
                </button>
              )}
            </div>
          </div>
        )}

        {notifications.length === 0 ? (
          (emptyState ?? (
            <div className="flex flex-1 flex-col items-center justify-center gap-2 p-8 text-center">
              <BellIcon className="size-8 text-muted-foreground/40" />
              <p className="text-sm text-muted-foreground">No notifications</p>
            </div>
          ))
        ) : visible.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 p-8 text-center">
            <p className="text-sm text-muted-foreground">No notifications match.</p>
          </div>
        ) : (
          <ScrollArea className="flex-1">
            <div className="flex flex-col gap-1 p-2">
              {visible.map((n) => {
                const style = typeStyles[n.type ?? "default"];
                return (
                  <div
                    key={n.id}
                    className={cn(
                      "group relative flex cursor-pointer gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors hover:bg-accent",
                      n.read === false && "bg-accent/50",
                    )}
                    onClick={() => handleClick(n)}
                  >
                    {/* Unread indicator */}
                    {n.read === false && (
                      <span
                        className={cn(
                          "absolute left-1.5 top-1/2 size-1.5 -translate-y-1/2 rounded-full",
                          style.dot,
                        )}
                      />
                    )}

                    {/* Icon slot */}
                    {n.icon ? (
                      <span className={cn("mt-0.5 size-4 shrink-0", style.icon)}>{n.icon}</span>
                    ) : null}

                    {/* Content */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-medium text-foreground">{n.title}</p>
                        {n.time && (
                          <span className="shrink-0 text-[10px] text-muted-foreground/60">
                            {n.time}
                          </span>
                        )}
                      </div>
                      {n.description && (
                        <p className="mt-0.5 text-xs text-muted-foreground">{n.description}</p>
                      )}
                    </div>

                    {/* Actions: mark read, delete, dismiss */}
                    <div className="flex shrink-0 items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
                      {n.read === false && onMarkRead && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onMarkRead(n);
                          }}
                          aria-label={`Mark ${n.title} as read`}
                          className="rounded-sm p-1 text-muted-foreground/50 hover:bg-muted hover:text-foreground"
                        >
                          <CheckIcon />
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete(n);
                          }}
                          aria-label={`Delete ${n.title}`}
                          className="rounded-sm p-1 text-muted-foreground/50 hover:bg-destructive/10 hover:text-destructive"
                        >
                          <TrashIcon />
                        </button>
                      )}
                      {onDismiss && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDismiss(n);
                          }}
                          aria-label={`Dismiss ${n.title}`}
                          className="rounded-sm p-1 text-muted-foreground/50 hover:bg-muted hover:text-foreground"
                        >
                          <XIcon />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        )}

        {showFooter && notifications.length > 0 && (
          <div className="border-t p-3">
            <Button variant="ghost" size="sm" className="w-full" onClick={onViewAll}>
              View all notifications
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

/* ── Icons (inline, zero deps) ─────────────────────────────── */

function BellIcon({ className }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

NotificationDrawer.displayName = "NotificationDrawer";
