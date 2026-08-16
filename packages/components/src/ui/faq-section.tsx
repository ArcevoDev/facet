/**
 * @arcevo/facet-components: FaqSection
 *
 * A ready-to-use FAQ section built on the Accordion primitive. Data-driven
 * with optional two-column layout. Fully customizable via props.
 */

import * as React from "react";
import { cn } from "../utils.js";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./accordion.js";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  items: FaqItem[];
  /** Optional heading above the list. */
  title?: string;
  /** Optional description under the title. */
  description?: string;
  /** Default open items (by index). Default: [] (all closed). */
  defaultOpen?: number[];
  /** Render the heading and list side-by-side on lg. Default: false. */
  split?: boolean;
  /** Accordion behavior. "multiple" (default) allows several open; "single" opens one at a time. */
  type?: "multiple" | "single";
  /** Content rendered after the accordion (e.g. an explore / feedback strip). */
  children?: React.ReactNode;
}

/**
 * An FAQ section: a title (optional) and a stacked accordion of Q&A.
 * When `split` is set, the heading sits in a left column on lg screens.
 */
export function FaqSection({
  items,
  title,
  description,
  defaultOpen = [],
  split = false,
  type = "multiple",
  className,
  children,
  ...props
}: FaqSectionProps) {
  const accordionItems = items.map((item, i) => (
    <AccordionItem key={i} value={String(i)}>
      <AccordionTrigger className="text-left font-medium">{item.question}</AccordionTrigger>
      <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
        {item.answer}
      </AccordionContent>
    </AccordionItem>
  ));
  return (
    <section className={cn("w-full", className)} {...props}>
      <div className={cn(split && "lg:grid lg:grid-cols-[minmax(0,1fr)_2fr] lg:gap-12")}>
        {(title || description) && (
          <div className={cn("mb-5 space-y-1", split && "lg:mb-0")}>
            {title && <h3 className="font-heading text-2xl font-semibold text-foreground">{title}</h3>}
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
          </div>
        )}
        {type === "single" ? (
          <Accordion type="single" collapsible defaultValue={defaultOpen[0]?.toString()}>
            {accordionItems}
          </Accordion>
        ) : (
          <Accordion type="multiple" defaultValue={defaultOpen.map(String)}>
            {accordionItems}
          </Accordion>
        )}
      </div>
      {children && <div className="mt-8">{children}</div>}
    </section>
  );
}

FaqSection.displayName = "FaqSection";
