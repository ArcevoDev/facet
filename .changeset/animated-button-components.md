---
"@arcevo/facet-components": minor
---

feat: AnimatedButton - uniform animated CTAs in composed components (overridable)

New `AnimatedButton` renders an animated button variant (shine default, sparkle, ripple, magnetic, or none = plain Button) and accepts a `renderButton` full override. It is used by default in composed components so consumers get a consistent animated feel without extra imports, while staying fully flexible:

- `BillingPageConfig.ctaButton` (default animation "sparkle"): the plan CTAs are now animated.
- `FeedbackPageProps.submitButton` (default "shine"): the feedback submit is now animated.
- `AnimatedButton` is exported from the barrel for direct use.

`animation="none"` gives today's plain Button; `renderButton` lets consumers drop in their own component entirely.
