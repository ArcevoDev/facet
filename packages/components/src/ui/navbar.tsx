import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils.js";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu.js";

/** Minimal router abstraction so Navbar can render framework-native links. */
export interface NavbarRouterLinkProps {
  href: string;
  className?: string;
  onClick?: (event: React.MouseEvent) => void;
  children?: React.ReactNode;
  "aria-current"?: "page" | undefined;
}

export interface NavbarRouter {
  Link: React.ComponentType<NavbarRouterLinkProps>;
  isActive: (href: string) => boolean;
}

/* ── Navbar variants ───────────────────────────────────────── */

export const navbarVariants = cva(
  "flex w-full items-center justify-between gap-4 px-4 py-3 sm:px-6",
  {
    variants: {
      variant: {
        default: "border-b border-border bg-background",
        sticky:
          "sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80",
        glass: "sticky top-0 z-50 border-b border-white/10 glass",
        bordered: "border border-border/60 bg-background shadow-sm",
        transparent: "border-b border-transparent bg-transparent",
        pill: [
          "sticky top-0 z-50 w-full",
          "border-b border-border/60 bg-background/80 px-3 py-2 shadow-sm shadow-black/5",
          "backdrop-blur-xl supports-[backdrop-filter]:bg-background/60",
          "transition-colors",
          "md:top-3 md:mx-auto md:w-[calc(100%-2rem)] md:max-w-7xl md:rounded-full md:border md:border-border/60 md:bg-background/70 md:px-3 md:shadow-lg md:shadow-black/5",
        ].join(" "),
      },
      size: {
        default: "h-16",
        sm: "h-12",
        lg: "h-20",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

/* ── Types ─────────────────────────────────────────────────── */

export interface NavChildLink {
  /** Route href */
  href: string;
  /** Display label */
  label: string;
  /** Short description shown under the label in the dropdown */
  description?: string;
  /** Optional icon element (e.g. lucide <Home />) */
  icon?: React.ReactNode;
  /** Optional badge ("New", count, etc.) */
  badge?: string | number;
}

export interface NavLink {
  /** Route href (or label key when children are provided) */
  href: string;
  /** Display label */
  label: string;
  /** Optional icon element (e.g. lucide <Home />) */
  icon?: React.ReactNode;
  /** Active state override: when omitted, uses href matching */
  active?: boolean;
  /** Optional badge ("New", count, etc.) */
  badge?: string | number;
  /** Optional sub-links rendered in a dropdown menu */
  children?: NavChildLink[];
}

export interface NavbarProps
  extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof navbarVariants> {
  /** Brand element: logo, name, or both */
  brand?: React.ReactNode;
  /** Nav links rendered in desktop view */
  links?: NavLink[];
  /** Whether a link is active (defaults to exact href match against current path) */
  onNavigate?: (href: string) => void;
  /** Framework-aware routing (Next <Link>, react-router <Link>, ...). */
  router?: NavbarRouter;
  /** Right-side actions (buttons, avatar, notification bell, etc.) */
  actions?: React.ReactNode;
  /** Mobile menu content: defaults to a stacked list of links */
  mobileMenu?: React.ReactNode;
  /** Show mobile hamburger. Default: true when links/mobileMenu provided */
  showMobileMenu?: boolean;
  /** Render children instead of links */
  children?: React.ReactNode;
}

/* ── Component ─────────────────────────────────────────────── */

export function Navbar({
  variant,
  size,
  brand,
  links = [],
  onNavigate,
  router,
  actions,
  mobileMenu,
  showMobileMenu,
  children,
  className,
  ...props
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isPill = variant === "pill";
  // Variants that define their own sticky positioning must not be overridden
  // by the trailing "relative" (tailwind-merge keeps the last position class).
  const hasOwnPosition = variant === "pill" || variant === "sticky" || variant === "glass";

  const hasMobileMenu = mobileMenu !== undefined || links.length > 0;
  const showHamburger = showMobileMenu ?? hasMobileMenu;

  const handleNav = (href: string) => {
    setMobileOpen(false);
    onNavigate?.(href);
  };

  return (
    <nav
      className={cn(navbarVariants({ variant, size }), hasOwnPosition ? "" : "relative", className)}
      {...props}
    >
      {/* Brand */}
      {brand && <div className="flex shrink-0 items-center gap-2">{brand}</div>}

      {/* Desktop links */}
      {children ?? (
        <div
          className={cn(
            "hidden items-center md:flex",
            isPill ? "gap-0.5 rounded-full bg-muted/40 p-1" : "gap-1",
          )}
        >
          {links.map((link) => (
            <NavLinkItem
              key={link.href}
              link={link}
              router={router}
              onNavigate={handleNav}
              isPill={isPill}
            />
          ))}
        </div>
      )}

      {/* Actions + mobile toggle */}
      <div className="flex shrink-0 items-center gap-2">
        {actions}
        {showHamburger && (
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground/70 hover:bg-accent hover:text-accent-foreground md:hidden"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          </button>
        )}
      </div>

      {/* Mobile menu */}
      {showHamburger && mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className={cn(
            "absolute inset-x-0 top-full z-50 border-b border-border bg-background p-4 md:hidden",
            isPill && "mt-1 rounded-2xl shadow-lg",
          )}
        >
          {mobileMenu ?? (
            <div className="flex flex-col gap-1">
              {links.map((link) => (
                <MobileNavLink key={link.href} link={link} router={router} onNavigate={handleNav} />
              ))}
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

/* ── Internal link item (desktop) ──────────────────────────── */

function NavLinkItem({
  link,
  router,
  onNavigate,
  isPill = false,
}: {
  link: NavLink;
  router: NavbarRouter | undefined;
  onNavigate: (href: string) => void;
  isPill?: boolean;
}) {
  const isActive =
    link.active ??
    (router
      ? router.isActive(link.href)
      : typeof window !== "undefined" && isHrefActive(link.href));

  // In pill mode the active item gets a solid rounded chip on the tray.
  const itemClass = cn(
    "flex items-center gap-2 text-sm font-medium transition-colors",
    isPill ? "rounded-full px-3 py-1.5" : "rounded-md px-3 py-2",
    isActive
      ? isPill
        ? "bg-background text-foreground shadow-sm"
        : "bg-accent text-accent-foreground"
      : "text-foreground/70 hover:bg-accent/60 hover:text-foreground",
  );

  // Link with sub-links → render a dropdown (OpenAI-style)
  if (link.children?.length) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button type="button" className={cn(itemClass, "data-[state=open]:bg-accent/60")}>
            {link.icon && <span className="size-4 shrink-0">{link.icon}</span>}
            <span>{link.label}</span>
            {link.badge != null && (
              <span className="rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-medium text-primary-foreground">
                {link.badge}
              </span>
            )}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="text-muted-foreground/60"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-64">
          {link.children.map((child, index) => (
            <React.Fragment key={child.href}>
              {index > 0 && <DropdownMenuSeparator />}
              <DropdownMenuItem
                onSelect={() => onNavigate(child.href)}
                className="flex cursor-pointer flex-col items-start gap-0.5 py-2.5"
              >
                <span className="flex items-center gap-2 font-medium">
                  {child.icon && (
                    <span className="size-4 shrink-0 text-muted-foreground">{child.icon}</span>
                  )}
                  {child.label}
                  {child.badge != null && (
                    <span className="rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-medium text-primary-foreground">
                      {child.badge}
                    </span>
                  )}
                </span>
                {child.description && (
                  <span className="pl-6 text-xs text-muted-foreground">{child.description}</span>
                )}
              </DropdownMenuItem>
            </React.Fragment>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  const Link = router?.Link ?? "a";
  return (
    <Link
      href={link.href}
      onClick={(e) => {
        if (onNavigate) {
          e.preventDefault();
          onNavigate(link.href);
        }
      }}
      className={itemClass}
      aria-current={isActive ? "page" : undefined}
    >
      {link.icon && <span className="size-4 shrink-0">{link.icon}</span>}
      <span>{link.label}</span>
      {link.badge != null && (
        <span className="rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-medium text-primary-foreground">
          {link.badge}
        </span>
      )}
    </Link>
  );
}

/* ── Internal mobile link (expands sub-links inline) ───────── */

function MobileNavLink({
  link,
  router,
  onNavigate,
}: {
  link: NavLink;
  router: NavbarRouter | undefined;
  onNavigate: (href: string) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const Link = router?.Link ?? "a";

  if (link.children?.length) {
    return (
      <div className="flex flex-col">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-foreground/70 transition-colors hover:bg-accent hover:text-foreground"
        >
          <span className="flex items-center gap-2">
            {link.icon && <span className="size-4 shrink-0">{link.icon}</span>}
            {link.label}
          </span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className={cn("text-muted-foreground/60 transition-transform", open && "rotate-180")}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
        {open && (
          <div className="ml-4 flex flex-col gap-1 border-l pl-3">
            {link.children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(child.href);
                }}
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-foreground/70 transition-colors hover:bg-accent hover:text-foreground"
              >
                {child.icon && <span className="size-4 shrink-0">{child.icon}</span>}
                <span>{child.label}</span>
                {child.badge != null && (
                  <span className="rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-medium text-primary-foreground">
                    {child.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={link.href}
      onClick={(e) => {
        e.preventDefault();
        onNavigate(link.href);
      }}
      className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-foreground/70 transition-colors hover:bg-accent hover:text-foreground"
    >
      {link.icon && <span className="size-4 shrink-0">{link.icon}</span>}
      <span>{link.label}</span>
      {link.badge != null && (
        <span className="rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-medium text-primary-foreground">
          {link.badge}
        </span>
      )}
    </Link>
  );
}

Navbar.displayName = "Navbar";

/**
 * Active-state matching for plain anchors:
 * - Hash links ("#features") match against window.location.hash.
 * - Path links ("/dashboard") match the pathname.
 */
function isHrefActive(href: string): boolean {
  if (href.startsWith("#")) {
    return window.location.hash === href;
  }
  return window.location.pathname === href;
}
