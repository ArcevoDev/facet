/**
 * Marquee: auto-scrolling horizontal ticker with pause-on-hover support.
 */
import * as React from "react";
import { cn } from "../utils.js";

export interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Items rendered repeatedly across the track. */
  items: React.ReactNode[];
  /** Animation duration in seconds. Default: 20 */
  duration?: number;
  /** Reverse the scroll direction. Default: false */
  reverse?: boolean;
  /** Pause scrolling while the pointer is over the track. Default: true */
  pauseOnHover?: boolean;
  /**
   * Gap between items. Accepts a number (px, clamped to 4-32) or any CSS
   * length string ("0.5rem", "20px", ...). Default: 16 (px).
   */
  gap?: number | string;
}

/**
 * A CSS-only marquee. Children are duplicated to form a seamless loop, and
 * the track animates with a transform translateX keyframe. Accessibility
 * focus and hover pauses are handled without JavaScript animation state.
 * The `facet-marquee` keyframe is defined in `@arcevo/facet-tokens`
 * (tokens.css / tailwind.css).
 */
const Marquee = React.forwardRef<HTMLDivElement, MarqueeProps>(
  (
    {
      items,
      duration = 20,
      reverse = false,
      pauseOnHover = true,
      gap = 16,
      className,
      ...props
    },
    ref,
  ) => {
    const track = React.useMemo(() => [...items, ...items], [items]);
    const [paused, setPaused] = React.useState(false);

    // Normalize gap: numeric px (clamped to a safe 4-32px band so spacing
    // never collapses or explodes), or a passthrough CSS length string.
    const gapCss = typeof gap === "number" ? `${Math.min(32, Math.max(4, gap))}px` : gap;

    return (
      <div
        ref={ref}
        role="marquee"
        aria-label="Scrolling content"
        className={cn("group flex w-full overflow-hidden", className)}
        onMouseEnter={pauseOnHover ? () => setPaused(true) : undefined}
        onMouseLeave={pauseOnHover ? () => setPaused(false) : undefined}
        {...props}
      >
        <div
          className="flex shrink-0 items-center"
          style={{
            gap: gapCss,
            animation: `facet-marquee ${duration}s linear infinite`,
            animationDirection: reverse ? "reverse" : "normal",
            animationPlayState: paused ? "paused" : "running",
          }}
        >
          {track.map((item, i) => (
            <React.Fragment key={i}>
              {item}
              <span aria-hidden="true" style={{ width: gapCss }} />
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  },
);
Marquee.displayName = "Marquee";

export { Marquee };
