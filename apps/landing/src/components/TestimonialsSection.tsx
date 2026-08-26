import { TestimonialShowcase } from "@arcevo/facet-components";
import { TESTIMONIALS } from "../data/testimonials.js";

/**
 * Social proof grid using the ready-to-use TestimonialShowcase component.
 * Six quotes, three-column responsive grid. The TestimonialShowcase
 * component handles the icon + avatar + name/role composition.
 */
export function TestimonialsSection() {
  return (
    <section id="testimonials" className="mx-auto max-w-7xl px-8 py-24">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-foreground font-heading sm:text-4xl">
          Adopted where standards matter
        </h2>
        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
          Identity, healthcare, fintech, and education teams use facet to ship
          domain-customized auth without rebuilding the design system.
        </p>
      </div>
      <TestimonialShowcase testimonials={TESTIMONIALS} columns={3} />
    </section>
  );
}