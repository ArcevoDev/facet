import { Link } from "react-router-dom";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@arcevo/facet-components";
import { LightIcon } from "@arcevo/facet-components/light";
import { FAQ } from "../data/features.js";
import { getDocsUrl } from "../lib/docs-url.js";

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

      {/* Explore / feedback strip */}
      <div className="mt-10 flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6 text-center sm:flex-row sm:gap-6">
        <a
          href={getDocsUrl()}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
        >
          <LightIcon name="book-open" className="size-4" />
          Explore the docs for a deeper view
        </a>
        <span className="hidden h-4 w-px bg-border sm:block" />
        <Link
          to="/feedback"
          className="inline-flex items-center gap-2 text-sm font-semibold text-foreground/80 hover:text-foreground"
        >
          <LightIcon name="message-square" className="size-4" />
          Drop feedback or contact the maintainers
        </Link>
      </div>
    </section>
  );
}
