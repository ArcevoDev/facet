/**
 * @arcevo/facet-components: TestimonialShowcase
 *
 * A ready-to-use social-proof grid (or carousel) of testimonials with
 * quote, author, role, and optional avatar. Data-driven and responsive.
 */

import * as React from "react";
import { cn } from "../utils.js";
import { Card, CardContent } from "./card.js";

export interface Testimonial {
  quote: string;
  author: string;
  role?: string;
  /** Avatar image URL. */
  avatar?: string;
  /** Avatar initials fallback (used when no avatar). */
  initials?: string;
  /** Optional highlight color for the quote mark. */
  accent?: string;
}

export interface TestimonialShowcaseProps extends React.HTMLAttributes<HTMLDivElement> {
  testimonials: Testimonial[];
  /** "grid" (default) or "carousel" (single, prev/next). */
  mode?: "grid" | "carousel";
  /** Columns on md+. Default: 3. */
  columns?: 1 | 2 | 3;
  /** Optional heading above the grid. */
  title?: string;
  /** Optional subheading. */
  description?: string;
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <Card className="h-full">
      <CardContent className="space-y-3 p-5">
        <div
          className="font-serif text-3xl leading-none"
          style={{ color: t.accent ?? "var(--primary, #6366f1)" }}
          aria-hidden="true"
        >
          "
        </div>
        <p className="text-sm leading-relaxed text-foreground">{t.quote}</p>
        <div className="flex items-center gap-2.5 pt-1">
          {t.avatar ? (
            <img
              src={t.avatar}
              alt={t.author}
              className="h-8 w-8 rounded-full object-cover"
              loading="lazy"
            />
          ) : (
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
              {t.initials ?? t.author.slice(0, 2).toUpperCase()}
            </span>
          )}
          <div>
            <p className="text-sm font-semibold text-foreground">{t.author}</p>
            {t.role && <p className="text-xs text-muted-foreground">{t.role}</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * A responsive testimonial showcase. In grid mode it lays out all cards;
 * in carousel mode it shows one at a time with prev/next controls.
 */
export function TestimonialShowcase({
  testimonials,
  mode = "grid",
  columns = 3,
  title,
  description,
  className,
  ...props
}: TestimonialShowcaseProps) {
  const [index, setIndex] = React.useState(0);
  const count = testimonials.length;

  return (
    <div className={cn("w-full", className)} {...props}>
      {(title || description) && (
        <div className="mb-5 space-y-1">
          {title && <h3 className="font-heading text-xl font-semibold text-foreground">{title}</h3>}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      )}

      {mode === "grid" ? (
        <div
          className={cn(
            "grid gap-4",
            columns === 1 && "grid-cols-1",
            columns === 2 && "grid-cols-1 sm:grid-cols-2",
            columns === 3 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
          )}
        >
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      ) : (
        <div className="relative">
          <div className="mx-auto max-w-xl">
            {count > 0 && <TestimonialCard t={testimonials[index % count]!} />}
          </div>
          {count > 1 && (
            <div className="mt-4 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setIndex((i) => (i - 1 + count) % count)}
                className="rounded-md border border-border p-1.5 text-muted-foreground transition-colors hover:bg-muted"
                aria-label="Previous testimonial"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <span className="text-xs text-muted-foreground">
                {index + 1} / {count}
              </span>
              <button
                type="button"
                onClick={() => setIndex((i) => (i + 1) % count)}
                className="rounded-md border border-border p-1.5 text-muted-foreground transition-colors hover:bg-muted"
                aria-label="Next testimonial"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

TestimonialShowcase.displayName = "TestimonialShowcase";
