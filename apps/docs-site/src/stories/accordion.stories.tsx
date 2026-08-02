import type { Meta, StoryObj } from "@storybook/react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@arcevo/facet-components";

const meta: Meta<typeof Accordion> = {
  title: "Components/Accordion",
  component: Accordion,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-[420px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>What is facet?</AccordionTrigger>
        <AccordionContent>
          A domain-customizable React component library built on Radix UI primitives with design
          tokens.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it MIT licensed?</AccordionTrigger>
        <AccordionContent>Yes. Everything is open source and MIT licensed.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Does it support dark mode?</AccordionTrigger>
        <AccordionContent>
          Out of the box. Themes are driven by CSS variables with a ThemeProvider.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Accordion type="multiple" className="w-[420px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>Account settings</AccordionTrigger>
        <AccordionContent>Manage profile, email, and password.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Billing</AccordionTrigger>
        <AccordionContent>Invoices, payment methods, and plans.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Separated: Story = {
  render: () => (
    <div className="w-[420px]">
      <Accordion type="single" collapsible>
        <AccordionItem variant="separated" value="item-1">
          <AccordionTrigger>Card 1</AccordionTrigger>
          <AccordionContent>
            Each item renders as its own bordered card with shadow.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem variant="separated" value="item-2">
          <AccordionTrigger>Card 2</AccordionTrigger>
          <AccordionContent>
            Separated items in one accordion keep a consistent gap.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem variant="separated" value="item-3">
          <AccordionTrigger>Card 3</AccordionTrigger>
          <AccordionContent>
            No wrapper needed: spacing is built into the variant.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

export const Ghost: Story = {
  render: () => (
    <div className="w-[420px]">
      <Accordion type="single" collapsible>
        <AccordionItem variant="ghost" value="item-1">
          <AccordionTrigger>No borders here</AccordionTrigger>
          <AccordionContent>
            Ghost items have no divider or card chrome, just the trigger row.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem variant="ghost" value="item-2">
          <AccordionTrigger>Blends into any surface</AccordionTrigger>
          <AccordionContent>
            Use it on tinted backgrounds where dividers would add noise.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

export const Compact: Story = {
  render: () => (
    <div className="w-[420px]">
      <Accordion type="single" collapsible>
        <AccordionItem variant="compact" value="item-1">
          <AccordionTrigger>Small footprint</AccordionTrigger>
          <AccordionContent>
            Compact rows keep lists dense, good for settings panels.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem variant="compact" value="item-2">
          <AccordionTrigger>Less vertical space</AccordionTrigger>
          <AccordionContent>
            The trigger keeps standard padding but the item chrome is tighter.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

export const Nested: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-[420px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>Getting started</AccordionTrigger>
        <AccordionContent>
          <Accordion type="single" collapsible>
            <AccordionItem variant="nested" value="sub-1">
              <AccordionTrigger>Installation</AccordionTrigger>
              <AccordionContent>
                pnpm add @arcevo/facet-components
              </AccordionContent>
            </AccordionItem>
            <AccordionItem variant="nested" value="sub-2">
              <AccordionTrigger>Setup</AccordionTrigger>
              <AccordionContent>Import tokens and wrap the app in ThemeProvider.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Advanced</AccordionTrigger>
        <AccordionContent>
          Nested accordions work because each level is its own Radix Root, so
          open state is tracked independently per level. The nested variant
          indents child items and draws a left guide line so the hierarchy
          reads as a tree.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
