import type { Meta, StoryObj } from "@storybook/react";
import { Progress } from "@arcevo/facet-components";

const meta: Meta<typeof Progress> = {
  title: "Components/Progress",
  component: Progress,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100, step: 1 } },
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Empty: Story = {
  args: { value: 0, className: "w-64" },
};

export const Halfway: Story = {
  args: { value: 50, className: "w-64" },
};

export const AlmostComplete: Story = {
  args: { value: 85, className: "w-64" },
};

export const Complete: Story = {
  args: { value: 100, className: "w-64" },
};
