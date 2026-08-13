/**
 * @arcevo/facet-components: Footer
 *
 * A dynamic, fully customizable site footer. Everything is config-driven:
 * brand block, link columns, social icons, bottom-bar links, and legal
 * text. Use it in place of ad-hoc footers (landing, docs, consumer apps).
 *
 * Usage:
 *   <Footer
 *     brand={{ name: "facet", tagline: "The Arcevo UI system" }}
 *     columns={[
 *       { title: "Product", links: [{ label: "Components", href: "#" }] },
 *     ]}
 *     socials={[
 *       { label: "GitHub", href: "https://github.com/arcevodev", icon: "github" },
 *     ]}
 *     bottomLinks={[{ label: "Feedback", href: "/feedback" }]}
 *     legal={`© ${new Date().getFullYear()} facet. MIT License.`}
 *   />
 *
 * For full control, pass `bottomBar` / `socialArea` / `children` as
 * ReactNode overrides.
 */

import * as React from "react";
import { cn } from "../utils.js";
import { Separator } from "./separator.js";
import { Icon, type IconName } from "../icon/index.js";

export interface FooterLink {
  label: string;
  href: string;
  /** Open in a new tab. Default: false for internal, true for http(s). */
  external?: boolean;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface FooterSocial {
  /** Accessible label, e.g. "GitHub". */
  label: string;
  href: string;
  /** Semantic icon name resolved through the Icon registry. */
  icon: IconName;
}

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  /** Brand block: name, optional logo element, tagline. */
  brand?: {
    name?: string;
    logo?: React.ReactNode;
    tagline?: string;
  };
  /** Link columns rendered in the middle section. */
  columns?: FooterColumn[];
  /** Social icon links in the bottom bar. */
  socials?: FooterSocial[];
  /** Bottom-bar text links (e.g. Feedback, Status, Privacy). */
  bottomLinks?: FooterLink[];
  /** Legal / copyright text in the bottom bar. */
  legal?: string;
  /** Replace the entire bottom bar (overrides legal + bottomLinks + socials). */
  bottomBar?: React.ReactNode;
  /** Extra content rendered below the columns (newsletter, CTAs, ...). */
  children?: React.ReactNode;
  /** Max content width class. Default: "max-w-7xl". */
  containerClassName?: string;
}

/** Auto-detect external links unless explicitly set. */
function isExternal(link: FooterLink): boolean {
  if (link.external !== undefined) return link.external;
  return /^https?:\/\//.test(link.href);
}

export function Footer({
  brand,
  columns = [],
  socials = [],
  bottomLinks = [],
  legal,
  bottomBar,
  children,
  className,
  containerClassName = "max-w-7xl",
  ...props
}: FooterProps) {
  return (
    <footer className={cn("w-full", className)} {...props}>
      <div className={cn("mx-auto w-full px-6 py-12 md:px-8", containerClassName)}>
        <Separator className="mb-10" />

        {/* Top: brand + columns */}
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.2fr)_repeat(auto-fit,minmax(140px,1fr))]">
          {/* Brand */}
          <div className="max-w-sm">
            <div className="flex items-center gap-2">
              {brand?.logo}
              {brand?.name && (
                <span className="font-heading text-lg font-bold text-foreground">{brand.name}</span>
              )}
            </div>
            {brand?.tagline && (
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{brand.tagline}</p>
            )}
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-foreground">{col.title}</h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label + link.href}>
                    <a
                      href={link.href}
                      target={isExternal(link) ? "_blank" : undefined}
                      rel={isExternal(link) ? "noreferrer" : undefined}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Extra content (newsletter, CTAs) */}
        {children}

        {/* Bottom bar */}
        {bottomBar ?? (
          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
            {legal && <p className="text-sm text-muted-foreground">{legal}</p>}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {bottomLinks.map((link) => (
                <a
                  key={link.label + link.href}
                  href={link.href}
                  target={isExternal(link) ? "_blank" : undefined}
                  rel={isExternal(link) ? "noreferrer" : undefined}
                  className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
              {socials.length > 0 && (
                <span className="flex items-center gap-3">
                  {socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.label}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <Icon name={social.icon} className="size-4" />
                    </a>
                  ))}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </footer>
  );
}
