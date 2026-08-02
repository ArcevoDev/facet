import { Github, ExternalLink } from "lucide-react";
import { Navbar, Button, ThemeToggle } from "@arcevo/facet-components";
import type { NavLink } from "@arcevo/facet-components";
import { getDocsUrl } from "../lib/docs-url.js";

// Anchor links scroll to in-page sections; no dead routes.
const LINKS: NavLink[] = [
  { href: "#features", label: "Features" },
  { href: "#demo", label: "Demo" },
  { href: "#install", label: "Install" },
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

function MobileMenu() {
  return (
    <div className="flex flex-col gap-1">
      {LINKS.map((link) => (
        <a
          key={link.href}
          href={link.href}
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
        <Github size={16} />
        GitHub
      </a>
      <Button
        size="sm"
        className="mt-1 w-full"
        onClick={() => window.open(getDocsUrl())}
      >
        Browse components
        <ExternalLink size={14} />
      </Button>
    </div>
  );
}

export function Nav() {
  return (
    <Navbar
      variant="pill"
      brand={<Brand />}
      links={LINKS}
      mobileMenu={<MobileMenu />}
      actions={
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/arcevodev/facet"
            className="hidden items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground md:flex"
          >
            <Github size={16} />
            GitHub
          </a>
          <ThemeToggle />
          <Button
            size="sm"
            className="hidden md:inline-flex"
            onClick={() => window.open(getDocsUrl())}
          >
            Browse components
          </Button>
        </div>
      }
    />
  );
}
