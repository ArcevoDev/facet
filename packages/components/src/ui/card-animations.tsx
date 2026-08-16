/**
 * @arcevo/facet-components: card animations
 *
 * A family of animated card surfaces: 3D flip, cursor spotlight,
 * animated border beams, shine sweeps, gradient borders, scroll reveal,
 * hover lift, and magnetic pull. All SSR-safe (initial render is static;
 * effects run after mount / on interaction).
 */

import * as React from "react";
import { cn } from "../utils.js";

/* ── FlipCard ─────────────────────────────────────────────── */

export interface FlipCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Front face content. */
  front: React.ReactNode;
  /** Back face content. */
  back: React.ReactNode;
  /** Flip direction. Default: "horizontal". */
  direction?: "horizontal" | "vertical";
  /** Flip duration, in ms. Default: 600. */
  duration?: number;
  /** Flip on hover instead of click. Default: false. */
  hover?: boolean;
  /** Fixed height so the flip doesn't collapse. Default: "16rem". */
  height?: string | number;
}

/**
 * A card that flips to reveal a back face on click (or hover).
 * The front/back faces are absolutely stacked; the parent sizes them.
 */
export function FlipCard({
  front,
  back,
  direction = "horizontal",
  duration = 600,
  hover = false,
  height = "16rem",
  className,
  style,
  ...props
}: FlipCardProps) {
  const [flipped, setFlipped] = React.useState(false);
  const rotate = direction === "vertical" ? "rotateX(180deg)" : "rotateY(180deg)";
  return (
    <div
      className={cn("[perspective:1200px]", className)}
      style={{ ...style, height }}
      onClick={hover ? undefined : () => setFlipped((f) => !f)}
      onMouseEnter={hover ? () => setFlipped(true) : undefined}
      onMouseLeave={hover ? () => setFlipped(false) : undefined}
      role={hover ? undefined : "button"}
      tabIndex={hover ? undefined : 0}
      onKeyDown={
        hover
          ? undefined
          : (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setFlipped((f) => !f);
              }
            }
      }
      {...props}
    >
      <div
        className="relative h-full w-full transition-transform"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? rotate : "none",
          transitionDuration: `${duration}ms`,
        }}
      >
        <div className="absolute inset-0 [backface-visibility:hidden]" style={{ WebkitBackfaceVisibility: "hidden" }}>
          {front}
        </div>
        <div
          className="absolute inset-0 [backface-visibility:hidden]"
          style={{ WebkitBackfaceVisibility: "hidden", transform: rotate }}
        >
          {back}
        </div>
      </div>
    </div>
  );
}

FlipCard.displayName = "FlipCard";

/* ── SpotlightCard ────────────────────────────────────────── */

export interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Spotlight color. Default: "var(--primary)". */
  color?: string;
  /** Spotlight blur radius, in px. Default: 300. */
  radius?: number;
}

/**
 * A card with a radial spotlight that follows the cursor across the
 * surface. The highlight renders as an absolutely-positioned gradient.
 */
export function SpotlightCard({
  color = "var(--primary, #6366f1)",
  radius = 300,
  className,
  children,
  style,
  ...props
}: SpotlightCardProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [pos, setPos] = React.useState<{ x: number; y: number; opacity: number }>({
    x: 50,
    y: 50,
    opacity: 0,
  });
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
      opacity: 1,
    });
  };
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setPos((p) => ({ ...p, opacity: 0 }))}
      className={cn("relative overflow-hidden", className)}
      style={style}
      {...props}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: pos.opacity,
          background: `radial-gradient(${radius}px circle at ${pos.x}% ${pos.y}%, ${color}, transparent 70%)`,
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}

SpotlightCard.displayName = "SpotlightCard";

/* ── BorderBeamCard ───────────────────────────────────────── */

export interface BorderBeamCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Beam color(s) for the conic gradient. Default: primary -> fuchsia. */
  colors?: string[];
  /** Border beam thickness, in px. Default: 2. */
  thickness?: number;
  /** Rotation loop duration, in ms. Default: 4000. */
  duration?: number;
}

/**
 * A card with an animated conic-gradient border that slowly rotates
 * around the edge (a "beam" sweeping the border).
 */
export function BorderBeamCard({
  colors = ["var(--primary, #6366f1)", "#d946ef", "transparent"],
  thickness = 2,
  duration = 4000,
  className,
  children,
  style,
  ...props
}: BorderBeamCardProps) {
  return (
    <div
      className={cn("relative rounded-xl p-px", className)}
      style={
        {
          ...style,
          background: `conic-gradient(from 0deg, ${colors.join(", ")})`,
          animation: `facet-spin ${duration}ms linear infinite`,
        } as React.CSSProperties
      }
      {...props}
    >
      <div className="relative rounded-[calc(0.75rem-1px)] bg-background">{children}</div>
    </div>
  );
}

BorderBeamCard.displayName = "BorderBeamCard";

/* ── ShineCard ────────────────────────────────────────────── */

export interface ShineCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Highlight color. Default: white at 30%. */
  shineColor?: string;
  /** Sweep duration, in ms. Default: 1500. */
  duration?: number;
  /** Trigger on hover only (default) or loop. */
  loop?: boolean;
}

/**
 * A card with a light sheen that sweeps across the surface on hover
 * (or continuously when `loop` is set).
 */
export function ShineCard({
  shineColor = "rgba(255,255,255,0.3)",
  duration = 1500,
  loop = false,
  className,
  children,
  style,
  ...props
}: ShineCardProps) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      className={cn("relative overflow-hidden", className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={style}
      {...props}
    >
      {children}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={
          {
            background: `linear-gradient(105deg, transparent 40%, ${shineColor} 50%, transparent 60%)`,
            backgroundSize: "200% 100%",
            backgroundPosition: loop || hovered ? "-200% 0" : "200% 0",
            transition: loop ? "none" : `background-position ${duration}ms ease-out`,
            animation: loop ? `facet-shimmer ${duration}ms linear infinite` : undefined,
          } as React.CSSProperties
        }
      />
    </div>
  );
}

ShineCard.displayName = "ShineCard";

/* ── GradientBorderCard ───────────────────────────────────── */

export interface GradientBorderCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Gradient stops for the border. Default: primary -> fuchsia -> cyan. */
  colors?: string[];
  /** Border thickness, in px. Default: 1.5. */
  thickness?: number;
}

/** A card with a static (or slowly shifting) gradient border. */
export function GradientBorderCard({
  colors = ["var(--primary, #6366f1)", "#d946ef", "#06b6d4"],
  thickness = 1.5,
  className,
  children,
  style,
  ...props
}: GradientBorderCardProps) {
  return (
    <div
      className={cn("relative rounded-xl", className)}
      style={
        {
          ...style,
          padding: thickness,
          background: `linear-gradient(135deg, ${colors.join(", ")})`,
        } as React.CSSProperties
      }
      {...props}
    >
      <div className="relative rounded-[calc(0.75rem-1px)] bg-background">{children}</div>
    </div>
  );
}

GradientBorderCard.displayName = "GradientBorderCard";

/* ── RevealCard ───────────────────────────────────────────── */

export interface RevealCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Delay before reveal, in ms. Default: 0. */
  delay?: number;
  /** Reveal duration, in ms. Default: 600. */
  duration?: number;
  /** Y offset before reveal, in px. Default: 24. */
  y?: number;
}

/**
 * A card wrapper that fades + slides in when it scrolls into view
 * (IntersectionObserver, one-shot).
 */
export function RevealCard({
  delay = 0,
  duration = 600,
  y = 24,
  className,
  children,
  style,
  ...props
}: RevealCardProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={cn("will-change-transform", className)}
      style={
        {
          ...style,
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : `translateY(${y}px)`,
          transition: `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`,
        } as React.CSSProperties
      }
      {...props}
    >
      {children}
    </div>
  );
}

RevealCard.displayName = "RevealCard";

/* ── HoverScaleCard ───────────────────────────────────────── */

export interface HoverScaleCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Hover scale. Default: 1.03. */
  scale?: number;
  /** Transition duration, in ms. Default: 200. */
  duration?: number;
  /** Shadow lift on hover. Default: true. */
  lift?: boolean;
}

/** A card that subtly scales and lifts on hover. */
export function HoverScaleCard({
  scale = 1.03,
  duration = 200,
  lift = true,
  className,
  children,
  style,
  ...props
}: HoverScaleCardProps) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      className={cn("transition-all will-change-transform", className)}
      style={{
        ...style,
        transform: hovered ? `scale(${scale})` : "none",
        boxShadow: hovered && lift ? "0 12px 32px -12px rgb(0 0 0 / 0.25)" : undefined,
        transitionDuration: `${duration}ms`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...props}
    >
      {children}
    </div>
  );
}

HoverScaleCard.displayName = "HoverScaleCard";

/* ── MagneticCard ─────────────────────────────────────────── */

export interface MagneticCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Magnetic pull strength, in px. Default: 12. */
  strength?: number;
}

/**
 * A card that gravitates toward the cursor (translates up to
 * `strength` px in the cursor's direction).
 */
export function MagneticCard({
  strength = 12,
  className,
  children,
  style,
  ...props
}: MagneticCardProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [offset, setOffset] = React.useState({ x: 0, y: 0 });
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    const dist = Math.hypot(dx, dy) || 1;
    const pull = Math.min(1, 200 / dist);
    setOffset({ x: (dx / dist) * strength * pull, y: (dy / dist) * strength * pull });
  };
  const onLeave = () => setOffset({ x: 0, y: 0 });
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn("transition-transform duration-200 will-change-transform", className)}
      style={{ ...style, transform: `translate(${offset.x}px, ${offset.y}px)` }}
      {...props}
    >
      {children}
    </div>
  );
}

MagneticCard.displayName = "MagneticCard";
