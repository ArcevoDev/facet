import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@arcevo/facet-components";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
    },
    size: { control: "select", options: ["default", "sm", "lg", "icon"] },
    disabled: { control: "boolean" },
    asChild: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: { children: "Button", variant: "default" },
};

export const Destructive: Story = {
  args: { children: "Destructive", variant: "destructive" },
};

export const Outline: Story = {
  args: { children: "Outline", variant: "outline" },
};

export const Secondary: Story = {
  args: { children: "Secondary", variant: "secondary" },
};

export const Ghost: Story = {
  args: { children: "Ghost", variant: "ghost" },
};

export const Link: Story = {
  args: { children: "Link", variant: "link" },
};

export const Small: Story = {
  args: { children: "Small", size: "sm" },
};

export const Large: Story = {
  args: { children: "Large", size: "lg" },
};

export const Icon: Story = {
  args: {
    children: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <path
          d="M8 2.75a.5.5 0 00-1 0v4.25H2.75a.5.5 0 000 1H7v4.25a.5.5 0 001 0V8h4.25a.5.5 0 000-1H8V2.75z"
          fill="currentColor"
        />
      </svg>
    ),
    size: "icon",
    "aria-label": "Add",
  },
};

export const Disabled: Story = {
  args: { children: "Disabled", disabled: true },
};
