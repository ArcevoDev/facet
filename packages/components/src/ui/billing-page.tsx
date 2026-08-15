/**
 * @arcevo/facet-components: Billing / pricing page components
 *
 * Three config-driven billing layouts that all consume the same
 * `BillingPageConfig` + `BillingPlan` model:
 *   - BillingPage        (card grid)   - SaaS/product pricing cards
 *   - BillingPageTable   (comparison)  - full feature comparison table
 *   - BillingPageFreemium (split hero) - free/paid freemium pitch
 *
 * Plans are data, not hardcoded: tiers (Free/Starter/Pro/Enterprise or any
 * other names), prices, intervals, feature lists, and CTAs are all passed
 * in, so the same component adapts to any project's pricing model.
 *
 * Usage:
 *   <BillingPage config={{ plans: [...], interval: "monthly" }} />
 */

import * as React from "react";
import { cn } from "../utils.js";
import { AnimatedButton } from "./animated-button.js";
import { Badge } from "./badge.js";
import { Card, CardContent, CardHeader, CardTitle } from "./card.js";
import { Icon } from "../icon/index.js";
import {
  planPriceLabel,
  planInterval,
  type BillingInterval,
  type BillingPageConfig,
  type BillingPlan,
} from "./billing-types.js";

/* ── Shared bits ───────────────────────────────────────────── */

function IntervalToggle({
  config,
  onChange,
}: {
  config: BillingPageConfig;
  onChange: (i: BillingInterval) => void;
}) {
  const { interval = "monthly", onIntervalChange, annualDiscountNote } = config;
  const set = (i: BillingInterval) => {
    onChange(i);
    onIntervalChange?.(i);
  };
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="inline-flex items-center rounded-full border border-border bg-muted/40 p-1">
        <button
          type="button"
          onClick={() => set("monthly")}
          className={cn(
            "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
            interval === "monthly"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          Monthly
        </button>
        <button
          type="button"
          onClick={() => set("yearly")}
          className={cn(
            "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
            interval === "yearly"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          Yearly
        </button>
      </div>
      {annualDiscountNote && (
        <p className="text-xs text-muted-foreground">{annualDiscountNote}</p>
      )}
    </div>
  );
}

function PlanHeader({ plan, interval }: { plan: BillingPlan; interval: BillingInterval }) {
  const activeInterval = planInterval(plan, interval);
  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {plan.icon && <Icon name={plan.icon} className="size-4 text-primary" />}
          <h3 className="font-heading text-base font-semibold text-foreground">{plan.name}</h3>
        </div>
        {plan.legacy && (
          <Badge variant="outline" className="text-[10px]">
            Legacy
          </Badge>
        )}
      </div>
      {plan.description && (
        <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
      )}
      <div className="mt-4 flex items-baseline gap-1">
        <span className="font-heading text-3xl font-bold text-foreground">
          {planPriceLabel(plan, "$")}
        </span>
        {plan.price > 0 && (
          <span className="text-sm text-muted-foreground">/{activeInterval}</span>
        )}
      </div>
    </div>
  );
}

function PlanCta({
  plan,
  ctaButton,
}: {
  plan: BillingPlan;
  ctaButton?: BillingPageConfig["ctaButton"];
}) {
  const href = plan.cta?.href ?? "#";
  const label = plan.cta?.label ?? (plan.price === 0 ? "Get started" : "Contact us");
  const animation = ctaButton?.animation ?? "sparkle";
  const go = () => {
    if (href && href !== "#") {
      // In-app navigation via history; consumers can override with renderButton.
      window.location.href = href;
    }
  };
  return (
    <AnimatedButton
      animation={animation}
      renderButton={ctaButton?.renderButton}
      onClick={go}
      className="w-full"
    >
      {label}
    </AnimatedButton>
  );
}

function FeatureList({ features }: { features: string[] }) {
  return (
    <ul className="space-y-2.5">
      {features.map((f) => (
        <li key={f} className="flex items-start gap-2 text-sm text-foreground/80">
          <Icon name="check" className="mt-0.5 size-4 shrink-0 text-primary" />
          <span className="leading-relaxed">{f}</span>
        </li>
      ))}
    </ul>
  );
}

/* ── 1. BillingPage: card grid ─────────────────────────────── */

export interface BillingPageProps {
  config: BillingPageConfig;
  className?: string;
}

export function BillingPage({ config, className }: BillingPageProps) {
  const { plans, title = "Pricing", description } = config;
  const [interval, setInterval] = React.useState<BillingInterval>(config.interval ?? "monthly");

  return (
    <section className={cn("mx-auto w-full max-w-6xl px-6 py-16", className)}>
      {config.header ?? (
        <div className="mb-12 text-center">
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">{title}</h2>
          {description && (
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">{description}</p>
          )}
          <div className="mt-8">
            <IntervalToggle config={config} onChange={setInterval} />
          </div>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            variant={plan.highlight ? "glow" : "default"}
            className={cn(
              "flex flex-col",
              plan.highlight && "relative border-primary/40 shadow-lg",
            )}
          >
            {plan.highlight && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground">
                  {plan.badgeLabel ?? "Most popular"}
                </Badge>
              </div>
            )}
            <CardHeader>
              <PlanHeader plan={plan} interval={interval} />
            </CardHeader>
            <CardContent className="flex flex-1 flex-col justify-between gap-6">
              {config.badge?.(plan) ?? (plan.badge ? plan.badge(plan) : null)}
              <FeatureList features={plan.features} />
              <PlanCta plan={plan} ctaButton={config.ctaButton} />
            </CardContent>
          </Card>
        ))}
      </div>

      {config.footer}
    </section>
  );
}

/* ── 2. BillingPageTable: comparison table ─────────────────── */

export interface BillingPageTableProps {
  config: BillingPageConfig;
  /** Row label -> whether each plan supports it. Missing rows are hidden. */
  rows: { label: string; supports: Record<string, boolean | string> }[];
  className?: string;
}

export function BillingPageTable({ config, rows, className }: BillingPageTableProps) {
  const { plans, title = "Compare plans", description } = config;
  const [interval, setInterval] = React.useState<BillingInterval>(config.interval ?? "monthly");

  return (
    <section className={cn("mx-auto w-full max-w-6xl px-6 py-16", className)}>
      {config.header ?? (
        <div className="mb-12 text-center">
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">{title}</h2>
          {description && (
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">{description}</p>
          )}
          <div className="mt-8">
            <IntervalToggle config={config} onChange={setInterval} />
          </div>
        </div>
      )}

      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="p-4 text-sm font-medium text-muted-foreground">Features</th>
              {plans.map((plan) => (
                <th
                  key={plan.id}
                  className={cn(
                    "p-4 text-center",
                    plan.highlight && "bg-primary/5",
                  )}
                >
                  <div className="flex flex-col items-center gap-1">
                    {plan.highlight && (
                      <Badge className="bg-primary text-primary-foreground">
                        {plan.badgeLabel ?? "Most popular"}
                      </Badge>
                    )}
                    <span className="font-heading text-base font-semibold text-foreground">
                      {plan.name}
                    </span>
                    <span className="font-heading text-2xl font-bold text-foreground">
                      {planPriceLabel(plan, "$")}
                      {plan.price > 0 && (
                        <span className="text-xs font-normal text-muted-foreground">
                          /{planInterval(plan, interval)}
                        </span>
                      )}
                    </span>
                    <PlanCta plan={plan} ctaButton={config.ctaButton} />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-b border-border last:border-0">
                <td className="p-4 text-sm font-medium text-foreground">{row.label}</td>
                {plans.map((plan) => {
                  const v = row.supports[plan.id];
                  return (
                    <td key={plan.id} className="p-4 text-center">
                      {v === true && <Icon name="check" className="mx-auto size-4 text-primary" />}
                      {v === false && <Icon name="close" className="mx-auto size-4 text-muted-foreground/40" />}
                      {typeof v === "string" && (
                        <span className="text-xs text-muted-foreground">{v}</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {config.footer}
    </section>
  );
}

/* ── 3. BillingPageFreemium: split hero + tiers ─────────────── */

export interface BillingPageFreemiumProps {
  config: BillingPageConfig;
  /** The plan featured in the hero (must exist in config.plans). */
  heroPlanId?: string;
  className?: string;
}

export function BillingPageFreemium({ config, heroPlanId, className }: BillingPageFreemiumProps) {
  const { plans, title = "Start free, scale when you're ready", description } = config;
  const [interval, setInterval] = React.useState<BillingInterval>(config.interval ?? "monthly");

  const hero = plans.find((p) => p.id === heroPlanId) ?? plans.find((p) => p.highlight) ?? plans[0];
  const rest = plans.filter((p) => p.id !== hero?.id);

  return (
    <section className={cn("mx-auto w-full max-w-6xl px-6 py-16", className)}>
      {config.header ?? (
        <div className="mb-12 text-center">
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">{title}</h2>
          {description && (
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">{description}</p>
          )}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Free tier pitch */}
        {plans.find((p) => p.price === 0) && (
          <Card className="flex flex-col justify-between border-dashed">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="sparkles" className="size-4 text-primary" />
                {plans.find((p) => p.price === 0)!.name}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Everything you need to get started. No credit card required.
              </p>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col justify-between gap-6">
              <FeatureList features={plans.find((p) => p.price === 0)!.features} />
              <PlanCta plan={plans.find((p) => p.price === 0)!} ctaButton={config.ctaButton} />
            </CardContent>
          </Card>
        )}

        {/* Featured paid plan */}
        {hero && hero.price > 0 && (
          <Card variant="glow" className="relative flex flex-col border-primary/40 shadow-lg">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <Badge className="bg-primary text-primary-foreground">
                {hero.badgeLabel ?? "Most popular"}
              </Badge>
            </div>
            <CardHeader>
              <PlanHeader plan={hero} interval={interval} />
            </CardHeader>
            <CardContent className="flex flex-1 flex-col justify-between gap-6">
              <FeatureList features={hero.features} />
              <PlanCta plan={hero} ctaButton={config.ctaButton} />
            </CardContent>
          </Card>
        )}
      </div>

      {/* Remaining tiers */}
      {rest.length > 0 && (
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {rest.map((plan) => (
            <Card key={plan.id} className="flex flex-col">
              <CardHeader>
                <PlanHeader plan={plan} interval={interval} />
              </CardHeader>
              <CardContent className="flex flex-1 flex-col justify-between gap-6">
                <FeatureList features={plan.features} />
                <PlanCta plan={plan} ctaButton={config.ctaButton} />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="mt-8 flex justify-center">
        <IntervalToggle config={config} onChange={setInterval} />
      </div>

      {config.footer}
    </section>
  );
}
