import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "@arcevo/facet-components";

const meta: Meta<typeof Slider> = {
  title: "Components/Slider",
  component: Slider,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    defaultValue: { control: "object" },
    max: { control: "number" },
    step: { control: "number" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  args: { defaultValue: [50], max: 100, step: 1, className: "w-64" },
};

export const Range: Story = {
  args: { defaultValue: [25, 75], max: 100, step: 1, className: "w-64" },
};

export const Disabled: Story = {
  args: { defaultValue: [40], max: 100, disabled: true, className: "w-64" },
};
