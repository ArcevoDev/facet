import type * as React from "react";
import type { IconName } from "../icon/index.js";
import type { AnimatedButtonVariant, AnimatedButtonRenderProps } from "./animated-button.js";

/**
 * Shared plan model for the billing page components.
 *
 * Plans are plain data: tiers (Free / Starter / Pro / Enterprise / anything
 * else), prices, intervals, feature lists, highlight + CTA treatment. The
 * three billing page components (BillingPage, BillingPageTable,
 * BillingPageFreemium) all consume this same model, so a consumer can swap
 * layouts without reshaping their data.
 */

export type BillingInterval = "monthly" | "yearly";

export interface BillingPlanCta {
  label: string;
  href: string;
  /** Button variant. Default: "default". */
  variant?: "default" | "outline" | "ghost";
}

export interface BillingPlan {
  /** Stable id (used as a React key). */
  id: string;
  /** Display name: "Free", "Premium", "Pro", "Enterprise", ... */
  name: string;
  /** Price per interval. 0 = free. */
  price: number;
  /** Interval this price applies to. Default: "monthly". */
  interval?: BillingInterval;
  /** One-line pitch under the plan name. */
  description?: string;
  /** Optional semantic icon rendered on the plan card. */
  icon?: IconName;
  /** Feature bullets. Completely dynamic. */
  features: string[];
  /** Give the card the "Most popular" elevated treatment. */
  highlight?: boolean;
  /** Optional badge label (defaults to "Most popular" when highlighted). */
  badgeLabel?: string;
  /** CTA. When omitted, the component renders "Contact us" / "Get started". */
  cta?: BillingPlanCta;
  /** Replace the price entirely, e.g. "Custom" for Enterprise. */
  customPriceLabel?: string;
  /** Show a "Legacy" / "Grandfathered" tag. */
  legacy?: boolean;
  /** Extra plan-level config exposed through the badge slot. */
  badge?: (plan: BillingPlan) => React.ReactNode;
}

export interface BillingPageConfig {
  /** The plan set. */
  plans: BillingPlan[];
  /** Active billing interval. Default: "monthly". */
  interval?: BillingInterval;
  /** Controlled interval change (for a shared toggle above the page). */
  onIntervalChange?: (interval: BillingInterval) => void;
  /** Page title. Default: "Pricing". */
  title?: string;
  /** Intro description under the title. */
  description?: string;
  /** Currency symbol prefix. Default: "$". */
  currency?: string;
  /** Note shown next to the interval toggle, e.g. "Save 20% with yearly". */
  annualDiscountNote?: string;
  /** Replace the header block entirely. */
  header?: React.ReactNode;
  /** Extra content below the plan grid / table. */
  footer?: React.ReactNode;
  /** Per-plan badge slot (rendered above the price). */
  badge?: (plan: BillingPlan) => React.ReactNode;
  /** Animated CTA button options. Default animation: "sparkle". */
  ctaButton?: {
    animation?: AnimatedButtonVariant;
    renderButton?: (props: AnimatedButtonRenderProps) => React.ReactNode;
  };
}

/** Price label for a plan (respects customPriceLabel; 0 = "Free"). */
export function planPriceLabel(plan: BillingPlan, currency: string): string {
  if (plan.customPriceLabel) return plan.customPriceLabel;
  if (plan.price === 0) return "Free";
  return `${currency}${plan.price}`;
}

/** The interval a plan's price is expressed in (falls back to the page interval). */
export function planInterval(plan: BillingPlan, pageInterval: BillingInterval): BillingInterval {
  return plan.interval ?? pageInterval;
}
