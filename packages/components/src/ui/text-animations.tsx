/**
 * @arcevo/facet-components: text animations
 *
 * Reusable, zero-dependency text effects for hero sections and headers.
 * All are SSR-safe: the text renders in its final state on the server,
 * then the entrance animation runs after mount (no layout flash).
 *
 * Every component accepts `text` (or `children`), `className`, and
 * per-effect config props. Character-level effects split into spans and
 * stagger via a `--delay` custom property consumed by the CSS animation.
 */

import * as React from "react";
import { cn } from "../utils.js";

/* ── Shared helpers ────────────────────────────────────────── */

/** Split a string into characters, wrapping each in a span with a stagger delay. */
function splitChars(
  text: string,
  baseDelay: number,
  step: number,
  className: string,
): React.ReactNode[] {
  return text.split("").map((ch, i) => (
    <span
      key={i}
      aria-hidden={ch === " " ? undefined : true}
      className={cn("inline-block will-change-transform", className)}
      style={{ animationDelay: `${baseDelay + i * step}ms` }}
    >
      {ch === " " ? "\u00A0" : ch}
    </span>
  ));
}

/** Split into words, wrapping each in an inline-block span. */
function splitWords(
  text: string,
  baseDelay: number,
  step: number,
  className: string,
): React.ReactNode[] {
  return text.split(" ").map((word, i) => (
    <span
      key={i}
      className={cn("inline-block will-change-transform", className)}
      style={{ animationDelay: `${baseDelay + i * step}ms` }}
    >
      {word}
      {i < text.split(" ").length - 1 ? "\u00A0" : ""}
    </span>
  ));
}

/** Resolve the text to animate from `text` prop or `children`. */
function resolveText(text?: string, children?: React.ReactNode): string {
  if (text != null) return text;
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.filter((c) => typeof c === "string").join("");
  return "";
}

/* ── 1. BlurText ───────────────────────────────────────────── */

export interface BlurTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  text?: string;
  /** Entrance delay before the first char, in ms. Default: 0. */
  delay?: number;
  /** Stagger between chars, in ms. Default: 40. */
  stagger?: number;
  /** Animation duration, in ms. Default: 500. */
  duration?: number;
}

/** Each character fades in from a blur to sharp, staggered. */
export function BlurText({
  text,
  delay = 0,
  stagger = 40,
  duration = 500,
  className,
  children,
  ...props
}: BlurTextProps) {
  const resolved = resolveText(text, children);
  const chars = splitChars(resolved, delay, stagger, "animate-[facet-text-blur_500ms_ease-out_both]");
  return (
    <span
      className={cn("inline-block", className)}
      style={{ "--tw-anim-dur": `${duration}ms` } as React.CSSProperties}
      {...props}
    >
      {chars}
    </span>
  );
}

/* ── 2. WaveText ───────────────────────────────────────────── */

export interface WaveTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  text?: string;
  /** Loop duration, in ms. Default: 1200. */
  duration?: number;
  /** Stagger between chars, in ms. Default: 60. */
  stagger?: number;
  /** Pause between loops, in ms. Default: 600. */
  delay?: number;
}

/** Characters bob in a continuous wave. */
export function WaveText({
  text,
  duration = 1200,
  stagger = 60,
  delay = 0,
  className,
  children,
  ...props
}: WaveTextProps) {
  const resolved = resolveText(text, children);
  const chars = splitChars(
    resolved,
    delay,
    stagger,
    `animate-[facet-text-wave_${duration}ms_ease-in-out_infinite]`,
  );
  return (
    <span className={cn("inline-block", className)} {...props}>
      {chars}
    </span>
  );
}

/* ── 3. FlipText ───────────────────────────────────────────── */

export interface FlipTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  text?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
}

/** Characters flip in sequentially (rotateX). */
export function FlipText({
  text,
  delay = 0,
  stagger = 50,
  duration = 500,
  className,
  children,
  ...props
}: FlipTextProps) {
  const resolved = resolveText(text, children);
  const chars = splitChars(
    resolved,
    delay,
    stagger,
    `animate-[facet-flip_${duration}ms_ease-out_both]`,
  );
  return (
    <span className={cn("inline-block [perspective:400px]", className)} {...props}>
      {chars}
    </span>
  );
}

/* ── 4. SplitText ──────────────────────────────────────────── */

export interface SplitTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  text?: string;
  /** "words" (default) or "chars". */
  by?: "words" | "chars";
  delay?: number;
  stagger?: number;
  duration?: number;
}

/** Words (or chars) rise into place from below. */
export function SplitText({
  text,
  by = "words",
  delay = 0,
  stagger = 60,
  duration = 600,
  className,
  children,
  ...props
}: SplitTextProps) {
  const resolved = resolveText(text, children);
  const items =
    by === "chars"
      ? splitChars(resolved, delay, stagger, `animate-[facet-fade-up_${duration}ms_ease-out_both]`)
      : splitWords(resolved, delay, stagger, `animate-[facet-fade-up_${duration}ms_ease-out_both]`);
  return (
    <span className={cn("inline-block", className)} {...props}>
      {items}
    </span>
  );
}

/* ── 5. FadeUpText ─────────────────────────────────────────── */

export interface FadeUpTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  text?: string;
  delay?: number;
  duration?: number;
}

/** The whole block fades and slides up on mount. */
export function FadeUpText({
  text,
  delay = 0,
  duration = 600,
  className,
  children,
  ...props
}: FadeUpTextProps) {
  const resolved = resolveText(text, children);
  return (
    <span
      className={cn(
        "inline-block animate-[facet-fade-up_600ms_ease-out_both]",
        className,
      )}
      style={{ animationDelay: `${delay}ms`, animationDuration: `${duration}ms` }}
      {...props}
    >
      {resolved}
    </span>
  );
}

/* ── 6. ShimmerText ────────────────────────────────────────── */

export interface ShimmerTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  text?: string;
  /** Shimmer color overlay. Default: white at 60%. */
  shimmerColor?: string;
  /** Animation duration, in ms. Default: 2200. */
  duration?: number;
}

/** A light sheen sweeps across the text. Best on bold/heading text. */
export function ShimmerText({
  text,
  shimmerColor = "rgba(255,255,255,0.6)",
  duration = 2200,
  className,
  children,
  style,
  ...props
}: ShimmerTextProps) {
  const resolved = resolveText(text, children);
  return (
    <span
      className={cn(
        "inline-block bg-clip-text text-transparent",
        "bg-[linear-gradient(110deg,transparent_20%,var(--tw-shimmer,white)_50%,transparent_80%)]",
        "animate-[facet-shimmer_2200ms_linear_infinite]",
        className,
      )}
      style={
        {
          ...style,
          backgroundSize: "200% 100%",
          "--tw-shimmer": shimmerColor,
          animationDuration: `${duration}ms`,
          WebkitBackgroundClip: "text",
        } as React.CSSProperties
      }
      {...props}
    >
      {resolved}
    </span>
  );
}

/* ── 7. GradientText ───────────────────────────────────────── */

export interface GradientTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  text?: string;
  /** Gradient stops. Default: primary -> fuchsia -> cyan. */
  colors?: string[];
  /** Animation duration, in ms. Default: 4000. */
  duration?: number;
}

/** An animated gradient fills the text. */
export function GradientText({
  text,
  colors = ["var(--primary, #6366f1)", "#d946ef", "#06b6d4", "var(--primary, #6366f1)"],
  duration = 4000,
  className,
  children,
  style,
  ...props
}: GradientTextProps) {
  const resolved = resolveText(text, children);
  return (
    <span
      className={cn(
        "inline-block bg-clip-text text-transparent",
        "animate-[facet-gradient-shift_4000ms_ease_infinite]",
        className,
      )}
      style={
        {
          ...style,
          backgroundImage: `linear-gradient(90deg, ${colors.join(", ")})`,
          backgroundSize: "300% 100%",
          animationDuration: `${duration}ms`,
          WebkitBackgroundClip: "text",
        } as React.CSSProperties
      }
      {...props}
    >
      {resolved}
    </span>
  );
}

/* ── 8. LetterSpacingText ──────────────────────────────────── */

export interface LetterSpacingTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  text?: string;
  /** Track the text expands to. Default: 0.25em. */
  open?: string;
  /** Track at rest. Default: -0.02em. */
  closed?: string;
  /** Transition duration, in ms. Default: 400. */
  duration?: number;
  /** Loop instead of on-hover. */
  loop?: boolean;
}

/** Letters expand on hover (or loop) via a tracking transition. */
export function LetterSpacingText({
  text,
  open = "0.25em",
  closed = "-0.02em",
  duration = 400,
  loop = false,
  className,
  children,
  style,
  ...props
}: LetterSpacingTextProps) {
  const resolved = resolveText(text, children);
  const [hovered, setHovered] = React.useState(false);
  const track = loop || hovered ? open : closed;
  return (
    <span
      className={cn("inline-block cursor-default transition-[letter-spacing] will-change-[letter-spacing]", className)}
      style={{ ...style, letterSpacing: track, transitionDuration: `${duration}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...props}
    >
      {resolved}
    </span>
  );
}

/* ── 9. CountUpText ────────────────────────────────────────── */

export interface CountUpTextProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  /** Target number. */
  to: number;
  /** Start value. Default: 0. */
  from?: number;
  /** Duration, in ms. Default: 1200. */
  duration?: number;
  /** Decimals to show. Default: 0. */
  decimals?: number;
  /** Thousands separator. Default: false. */
  separator?: boolean;
  /** Ease-out exponent (2 = quadratic). Default: 2. */
  ease?: number;
}

/** Counts from `from` to `to` on mount with an ease-out curve. SSR-safe: renders the target server-side. */
export function CountUpText({
  to,
  from = 0,
  duration = 1200,
  decimals = 0,
  separator = false,
  ease = 2,
  className,
  ...props
}: CountUpTextProps) {
  const [value, setValue] = React.useState(from);
  const started = React.useRef(false);

  React.useEffect(() => {
    if (started.current) return;
    started.current = true;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, ease);
      setValue(from + (to - from) * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, from, duration, ease]);

  const formatted = separator
    ? value.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
    : value.toFixed(decimals);

  return (
    <span className={className} {...props}>
      {formatted}
    </span>
  );
}
