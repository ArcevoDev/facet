import { useNavigate, useLocation } from "react-router-dom";
import { Grid2x2 } from "lucide-react";
import {
  Navbar,
  ThemeToggle,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@arcevo/facet-components";
import type { NavLink } from "@arcevo/facet-components";
import { getDocsUrl } from "../lib/docs-url.js";
import { GithubIcon } from "./BrandIcons.js";

// Anchor links scroll to in-page sections; no dead routes.
const LINKS: NavLink[] = [
  { href: "#packages", label: "Packages" },
  { href: "#features", label: "Features" },
  { href: "#demo", label: "Demo" },
  { href: "#install", label: "Install" },
  { href: "/feedback", label: "Feedback" },
];

function Brand() {
  return (
    <div className="flex items-center gap-2.5">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-primary">
        <path
          d="M12 2L4 6V12C4 17.52 7.58 22.48 12 24C16.42 22.48 20 17.52 20 12V6L12 2Z"
          fill="currentColor"
          opacity="0.8"
        />
        <path
          d="M12 6L8 8V12C8 14.5 9.67 16.8 12 17.5C14.33 16.8 16 14.5 16 12V8L12 6Z"
          fill="currentColor"
          opacity="0.4"
        />
      </svg>
      <span className="font-heading text-lg font-bold text-foreground">facet</span>
    </div>
  );
}

function MobileMenu({ onNavigate }: { onNavigate: (href: string) => void }) {
  return (
    <div className="flex flex-col gap-1">
      {LINKS.map((link) => (
        <a
          key={link.href}
          href={link.href}
          onClick={(e) => {
            e.preventDefault();
            onNavigate(link.href);
          }}
          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-foreground/70 transition-colors hover:bg-accent hover:text-foreground"
        >
          {link.label}
        </a>
      ))}
      <div className="my-1 h-px bg-border" />
      <a
        href="https://github.com/arcevodev/facet"
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-foreground/70 transition-colors hover:bg-accent hover:text-foreground"
      >
        <GithubIcon size={16} />
        GitHub
      </a>
      <button
        type="button"
        onClick={() => window.open(getDocsUrl())}
        className="mt-1 flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-foreground/70 transition-colors hover:bg-accent hover:text-foreground"
      >
        Browse components
      </button>
    </div>
  );
}

export function Nav() {
  const navigate = useNavigate();
  const location = useLocation();

  // Single handler for all Navbar links (desktop + mobile). Hash anchors
  // scroll in-page; real routes navigate via the router.
  const handleNav = (href: string) => {
    if (href.startsWith("#")) {
      // If we're not on the home page, go home first, then scroll.
      if (location.pathname !== "/") {
        navigate("/");
        // Wait for the home page to mount before scrolling.
        setTimeout(() => {
          document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(href);
    }
  };

  return (
    <Navbar
      variant="pill"
      brand={<Brand />}
      links={LINKS}
      onNavigate={handleNav}
      mobileMenu={<MobileMenu onNavigate={handleNav} />}
      actions={
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/arcevodev/facet"
            className="hidden items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground md:flex"
          >
            <GithubIcon size={16} />
            GitHub
          </a>
          <ThemeToggle />
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="hidden h-9 w-9 items-center justify-center rounded-md text-foreground/70 transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:inline-flex"
                  aria-label="Browse components"
                  title="Browse components"
                  onClick={() => window.open(getDocsUrl())}
                >
                  <Grid2x2 size={16} />
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom">Browse components</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      }
    />
  );
}
