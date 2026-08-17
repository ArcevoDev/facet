import { describe, expect, it } from "vitest";
import type { BillingPlan } from "./billing-types.js";
import {
  intervalLabel,
  intervalMonths,
  planPriceForInterval,
  planPriceLabel,
} from "./billing-types.js";

const base: BillingPlan = {
  id: "pro",
  name: "Pro",
  price: 19,
  features: ["x"],
};

describe("intervalLabel / intervalMonths", () => {
  it("labels monthly, quarterly and yearly", () => {
    expect(intervalLabel("monthly")).toBe("month");
    expect(intervalLabel("quarterly")).toBe("3 months");
    expect(intervalLabel("yearly")).toBe("year");
  });

  it("returns the month multiplier for each interval", () => {
    expect(intervalMonths("monthly")).toBe(1);
    expect(intervalMonths("quarterly")).toBe(3);
    expect(intervalMonths("yearly")).toBe(12);
  });
});

describe("planPriceForInterval", () => {
  it("returns the base monthly price for monthly", () => {
    expect(planPriceForInterval(base, "monthly")).toBe(19);
  });

  it("applies the plan discount for the selected interval", () => {
    const plan: BillingPlan = { ...base, discounts: { quarterly: 30 } };
    // 19 * 3 months * 0.70 = 39.90
    expect(planPriceForInterval(plan, "quarterly")).toBe(39.9);
  });

  it("applies a yearly discount when none is set (2 months free)", () => {
    // 19 * (12 - 2 months free) = $190
    expect(planPriceForInterval(base, "yearly")).toBe(190);
  });

  it("uses an explicit per-interval price over the discount", () => {
    const plan: BillingPlan = {
      ...base,
      discounts: { yearly: 50 },
      prices: { yearly: 99 },
    };
    expect(planPriceForInterval(plan, "yearly")).toBe(99);
  });

  it("keeps free plans free across intervals", () => {
    const free: BillingPlan = { id: "f", name: "Free", price: 0, features: [] };
    expect(planPriceForInterval(free, "monthly")).toBe(0);
    expect(planPriceForInterval(free, "yearly")).toBe(0);
  });

  it("returns null for custom-price plans", () => {
    const custom: BillingPlan = {
      id: "e",
      name: "Enterprise",
      price: 0,
      customPriceLabel: "Custom",
      features: [],
    };
    expect(planPriceForInterval(custom, "monthly")).toBeNull();
  });
});

describe("planPriceLabel", () => {
  it("formats dynamic prices per interval", () => {
    const plan: BillingPlan = { ...base, discounts: { quarterly: 30 } };
    expect(planPriceLabel(plan, "$", "monthly")).toBe("$19");
    expect(planPriceLabel(plan, "$", "quarterly")).toBe("$39.90");
    expect(planPriceLabel(plan, "$", "yearly")).toBe("$190");
  });

  it("returns the custom label for custom-price plans", () => {
    const custom: BillingPlan = {
      id: "e",
      name: "Enterprise",
      price: 0,
      customPriceLabel: "Contact sales",
      features: [],
    };
    expect(planPriceLabel(custom, "$", "yearly")).toBe("Contact sales");
  });

  it("returns Free for zero-price plans", () => {
    const free: BillingPlan = { id: "f", name: "Free", price: 0, features: [] };
    expect(planPriceLabel(free, "$", "monthly")).toBe("Free");
  });

  it("falls back to the static price when no interval is given", () => {
    expect(planPriceLabel(base, "$")).toBe("$19");
  });
});
