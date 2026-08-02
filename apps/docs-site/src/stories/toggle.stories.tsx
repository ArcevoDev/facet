import type { Meta, StoryObj } from "@storybook/react";
import { Toggle } from "@arcevo/facet-components";
import { Bold, Italic, Underline } from "lucide-react";

const meta: Meta<typeof Toggle> = {
  title: "Components/Toggle",
  component: Toggle,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default", "outline"] },
    size: { control: "select", options: ["default", "sm", "lg"] },
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  render: () => (
    <Toggle aria-label="Toggle bold">
      <Bold className="size-4" />
    </Toggle>
  ),
};

export const Outline: Story = {
  args: { variant: "outline" },
  render: (args) => (
    <Toggle {...args} aria-label="Toggle italic">
      <Italic className="size-4" />
    </Toggle>
  ),
};

export const WithText: Story = {
  render: () => (
    <Toggle defaultPressed aria-label="Underline">
      <Underline className="size-4" />
      Underline
    </Toggle>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Toggle size="sm" aria-label="Small">
        <Bold className="size-3.5" />
      </Toggle>
      <Toggle aria-label="Default">
        <Bold className="size-4" />
      </Toggle>
      <Toggle size="lg" aria-label="Large">
        <Bold className="size-5" />
      </Toggle>
    </div>
  ),
};
