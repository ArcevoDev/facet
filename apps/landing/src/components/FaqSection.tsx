import { FAQ } from "../data/features.js";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@arcevo/facet-components";

export function FaqSection() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-8 py-24">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-foreground font-heading sm:text-4xl">
          Frequently asked questions
        </h2>
        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
          Quick answers for the questions consumers ask most.
        </p>
      </div>
      <Accordion type="single" collapsible className="w-full text-left">
        {FAQ.map((item) => (
          <AccordionItem key={item.q} value={item.q}>
            <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
            <AccordionContent className="text-left text-sm text-muted-foreground leading-relaxed">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
