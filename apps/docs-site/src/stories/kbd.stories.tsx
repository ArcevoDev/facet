import type { Meta, StoryObj } from "@storybook/react";
import { Kbd, getModSymbol } from "@arcevo/facet-components";

const meta: Meta<typeof Kbd> = {
  title: "Components/Kbd",
  component: Kbd,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Kbd>;

export const Default: Story = {
  render: () => <Kbd>{getModSymbol()}</Kbd>,
};

export const Group: Story = {
  render: () => (
    <div className="flex items-center gap-1.5">
      <Kbd>{getModSymbol()}</Kbd>
      <span className="text-muted-foreground">+</span>
      <Kbd>K</Kbd>
    </div>
  ),
};

export const InButton: Story = {
  render: () => (
    <button className="inline-flex h-9 items-center gap-2 rounded-md border border-input bg-background px-3 text-sm shadow-sm transition-colors hover:bg-accent">
      Search
      <Kbd>
        {getModSymbol()}K
      </Kbd>
    </button>
  ),
};
