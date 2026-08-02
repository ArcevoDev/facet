import type { Meta, StoryObj } from "@storybook/react";
import { ScrollArea, ScrollBar } from "@arcevo/facet-components";

const meta: Meta<typeof ScrollArea> = {
  title: "Components/ScrollArea",
  component: ScrollArea,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ScrollArea>;

const longText = Array.from(
  { length: 20 },
  (_, i) => `Line ${i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
).join("\n");

export const Vertical: Story = {
  render: () => (
    <ScrollArea className="h-48 w-72 rounded-md border p-4">
      <pre className="text-sm whitespace-pre-wrap text-muted-foreground">{longText}</pre>
    </ScrollArea>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <ScrollArea className="h-32 w-64 whitespace-nowrap rounded-md border">
      <div className="flex gap-4 p-4">
        {Array.from({ length: 10 }, (_, i) => (
          <div
            key={i}
            className="flex h-24 w-32 items-center justify-center rounded-md bg-muted text-sm text-muted-foreground"
          >
            Card {i + 1}
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ),
};
