import type { Meta, StoryObj } from "@storybook/react";
import { Check, Info, ShieldAlert, Sparkles, X } from "lucide-react";
import { Badge } from "@arcevo/facet-components";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "destructive", "outline", "success", "warning"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = { args: { children: "Badge" } };

export const Secondary: Story = { args: { children: "Secondary", variant: "secondary" } };

export const Destructive: Story = { args: { children: "Destructive", variant: "destructive" } };

export const Outline: Story = { args: { children: "Outline", variant: "outline" } };

export const Success: Story = { args: { children: "Success", variant: "success" } };

export const Warning: Story = { args: { children: "Warning", variant: "warning" } };

export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge icon={<Sparkles size={12} />}>New</Badge>
      <Badge variant="success" icon={<Check size={12} />}>
        Verified
      </Badge>
      <Badge variant="warning" icon={<Info size={12} />}>
        Pending review
      </Badge>
      <Badge variant="destructive" icon={<X size={12} />}>
        Blocked
      </Badge>
    </div>
  ),
};

export const IconOnly: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Badge variant="success" iconOnly icon={<Check size={14} />} aria-label="Verified" />
      <Badge variant="warning" iconOnly icon={<Info size={14} />} aria-label="Info" />
      <Badge variant="destructive" iconOnly icon={<X size={14} />} aria-label="Blocked" />
      <Badge variant="outline" iconOnly icon={<ShieldAlert size={14} />} aria-label="Security" />
    </div>
  ),
};
