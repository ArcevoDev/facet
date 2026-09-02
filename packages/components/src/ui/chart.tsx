/**
 * @arcevo/facet-components: Chart
 *
 * A dependency-free chart primitive (line / bar / area). Built on pure
 * SVG so it works in any bundler, tree-shakes to ~3kb, and doesn't
 * drag in recharts/visx. Phase 1 roadmap item #2.
 *
 * Why: every dashboard / billing / usage view needs a chart. Hand-
 * rolling one wastes a day; pulling in recharts adds ~80kb.
 */

import * as React from "react";
import { cn } from "../utils.js";

/* ── Types ─────────────────────────────────────────────────── */

export interface ChartSeries {
  id: string;
  /** Series label (legend). */
  label: string;
  /** Series color (CSS). Defaults to a slot from the theme. */
  color?: string;
  /** y values, in the same order as `x` on the parent Chart. */
  data: number[];
}

export interface ChartProps {
  /** Shared x-axis labels (one per data point). */
  x: (string | number)[];
  /** Series to render. */
  series: ChartSeries[];
  /** "line" (default), "bar", or "area". */
  type?: "line" | "bar" | "area";
  /** Show the legend row. */
  showLegend?: boolean;
  /** Show the y-axis grid + labels. Default: true. */
  showAxes?: boolean;
  /** Show a tooltip on hover. Default: true. */
  showTooltip?: boolean;
  /** Chart height in pixels. Default: 240. */
  height?: number;
  /** Format a y value (e.g. abbreviate 1000 → "1k"). */
  formatY?: (n: number) => string;
  /** Format an x value (e.g. "Jan", "Q1"). */
  formatX?: (v: string | number) => string;
  /** Extra className for the SVG wrapper. */
  className?: string;
  /** Theme color slot for the default series color. */
  defaultColor?: string;
}

/* ── Helpers ───────────────────────────────────────────────── */

const SVG_NS = "http://www.w3.org/2000/svg";
const DEFAULT_HEIGHT = 240;
const DEFAULT_COLOR = "hsl(var(--primary))";
const PALETTE = [
  "hsl(var(--primary))",
  "hsl(var(--chart-2, 220 70% 50%))",
  "hsl(var(--chart-3, 160 60% 45%))",
  "hsl(var(--chart-4, 30 80% 55%))",
  "hsl(var(--chart-5, 280 65% 60%))",
];

function niceTicks(min: number, max: number, count = 4): number[] {
  if (min === max) return [min];
  const step = (max - min) / count;
  return Array.from({ length: count + 1 }, (_, i) => min + step * i);
}

function defaultFormatY(n: number): string {
  if (Math.abs(n) >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (Math.abs(n) >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return String(n);
}

function colorFor(i: number, series: ChartSeries): string {
  return series.color ?? PALETTE[i % PALETTE.length] ?? DEFAULT_COLOR;
}

/* ── Component ─────────────────────────────────────────────── */

/**
 * Line / bar / area chart in pure SVG. Pass `x` labels and one or
 * more `series`. Supports legend, axes, and a hover tooltip.
 */
export function Chart({
  x,
  series,
  type = "line",
  showLegend = true,
  showAxes = true,
  showTooltip = true,
  height = DEFAULT_HEIGHT,
  formatY = defaultFormatY,
  formatX,
  className,
}: ChartProps) {
  const width = 800; // SVG viewBox; the parent scales it responsively.
  const padding = { top: 16, right: 16, bottom: showAxes ? 32 : 8, left: showAxes ? 48 : 8 };
  const plotW = width - padding.left - padding.right;
  const plotH = height - padding.top - padding.bottom;

  const all = series.flatMap((s) => s.data);
  const minY = Math.min(0, ...all);
  const maxY = Math.max(0, ...all);
  const range = maxY - minY || 1;

  const yTicks = niceTicks(minY, maxY, 4);
  const n = x.length;
  const xStep = n > 1 ? plotW / (n - 1) : plotW;
  const xOf = (i: number) => (n === 1 ? padding.left + plotW / 2 : padding.left + i * xStep);
  const yOf = (v: number) => padding.top + plotH - ((v - minY) / range) * plotH;

  const [hover, setHover] = React.useState<{
    seriesIndex: number;
    dataIndex: number;
  } | null>(null);

  const tooltipX = hover ? xOf(hover.dataIndex) : 0;
  const tooltipY = hover ? yOf(series[hover.seriesIndex]!.data[hover.dataIndex]!) : 0;

  const svgRef = React.useRef<SVGSVGElement | null>(null);
  const pointerYRef = React.useRef<number>(0);

  const handlePointerMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (rect) pointerYRef.current = e.clientY - rect.top;
  };

  return (
    <div className={cn("relative w-full", className)}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        className="block w-full"
        role="img"
        aria-label="Chart"
        onMouseMove={handlePointerMove}
        onMouseLeave={() => setHover(null)}
      >
        {/* Y axis grid + labels */}
        {showAxes &&
          yTicks.map((tick, i) => (
            <g key={`y-${i}`}>
              <line
                x1={padding.left}
                x2={padding.left + plotW}
                y1={yOf(tick)}
                y2={yOf(tick)}
                stroke="hsl(var(--border))"
                strokeDasharray="2 4"
                strokeWidth={1}
              />
              <text
                x={padding.left - 8}
                y={yOf(tick)}
                textAnchor="end"
                dominantBaseline="middle"
                fontSize={11}
                fill="hsl(var(--muted-foreground))"
              >
                {formatY(tick)}
              </text>
            </g>
          ))}

        {/* X axis labels */}
        {showAxes &&
          x.map((v, i) => (
            <text
              key={`x-${i}`}
              x={xOf(i)}
              y={padding.top + plotH + 18}
              textAnchor="middle"
              fontSize={11}
              fill="hsl(var(--muted-foreground))"
            >
              {formatX ? formatX(v) : String(v)}
            </text>
          ))}

        {/* Series */}
        {series.map((s, si) => {
          const color = colorFor(si, s);
          if (type === "bar") {
            const barW = (plotW / n) * 0.7;
            return (
              <g key={s.id}>
                {s.data.map((v, i) => (
                  <rect
                    key={i}
                    x={xOf(i) - barW / 2}
                    y={yOf(Math.max(0, v))}
                    width={barW}
                    height={Math.abs(yOf(v) - yOf(0))}
                    fill={color}
                    opacity={hover && (hover.dataIndex !== i || hover.seriesIndex !== si) ? 0.4 : 1}
                    rx={4}
                  />
                ))}
              </g>
            );
          }

          const pts = s.data.map((v, i) => `${xOf(i)},${yOf(v)}`).join(" ");
          const path = `M ${pts.split(" ").join(" L ")}`;
          const areaPath = `${path} L ${xOf(n - 1)},${yOf(0)} L ${xOf(0)},${yOf(0)} Z`;

          return (
            <g key={s.id}>
              {type === "area" && (
                <path d={areaPath} fill={color} opacity={0.15} />
              )}
              <path
                d={path}
                fill="none"
                stroke={color}
                strokeWidth={2}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              {s.data.map((v, i) => (
                <circle
                  key={i}
                  cx={xOf(i)}
                  cy={yOf(v)}
                  r={hover?.dataIndex === i && hover?.seriesIndex === si ? 5 : 3}
                  fill={color}
                />
              ))}
            </g>
          );
        })}

        {/* Hover targets */}
        {showTooltip &&
          x.map((_, i) => (
            <rect
              key={`hit-${i}`}
              x={xOf(i) - xStep / 2}
              y={padding.top}
              width={xStep}
              height={plotH}
              fill="transparent"
              onMouseEnter={() => {
                const py = pointerYRef.current;
                let bestSi = 0;
                let bestDist = Infinity;
                for (let si = 0; si < series.length; si++) {
                  const val = series[si]?.data?.[i];
                  if (val == null) continue;
                  const dist = Math.abs(yOf(val) - py);
                  if (dist < bestDist) {
                    bestDist = dist;
                    bestSi = si;
                  }
                }
                setHover({ dataIndex: i, seriesIndex: bestSi });
              }}
            />
          ))}

        {/* Tooltip line */}
        {showTooltip && hover && (
          <line
            x1={tooltipX}
            x2={tooltipX}
            y1={padding.top}
            y2={padding.top + plotH}
            stroke="hsl(var(--foreground))"
            strokeOpacity={0.2}
            strokeDasharray="3 3"
          />
        )}
      </svg>

      {/* Tooltip overlay */}
      {showTooltip && hover && (
        <div
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-full rounded-md border border-border bg-popover px-3 py-1.5 text-xs shadow-md"
          style={{
            left: `${(tooltipX / width) * 100}%`,
            top: `${(tooltipY / height) * 100}%`,
          }}
        >
          <div className="font-medium">
            {formatX ? formatX(x[hover.dataIndex]!) : String(x[hover.dataIndex])}
          </div>
          {series.map((s, si) => (
            <div key={s.id} className="flex items-center gap-2 text-muted-foreground">
              <span
                className="size-2 rounded-full"
                style={{ background: colorFor(si, s) }}
              />
              <span>{s.label}:</span>
              <span className="font-medium text-foreground">{formatY(s.data[hover.dataIndex]!)}</span>
            </div>
          ))}
        </div>
      )}

      {/* Legend */}
      {showLegend && (
        <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          {series.map((s, si) => (
            <div key={s.id} className="flex items-center gap-2">
              <span
                className="size-2.5 rounded-full"
                style={{ background: colorFor(si, s) }}
              />
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

Chart.displayName = "Chart";

// Re-export SVG_NS so the surrounding ecosystem can mock it for tests.
export { SVG_NS };