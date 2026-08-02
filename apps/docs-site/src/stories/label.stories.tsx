import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "@arcevo/facet-components";
import { Input } from "@arcevo/facet-components";

const meta: Meta<typeof Label> = {
  title: "Components/Label",
  component: Label,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: { children: "Email Address", htmlFor: "email" },
};

export const WithInput: Story = {
  render: () => (
    <div className="grid gap-2">
      <Label htmlFor="email">Email Address</Label>
      <Input id="email" placeholder="email@example.com" className="w-64" />
    </div>
  ),
};
