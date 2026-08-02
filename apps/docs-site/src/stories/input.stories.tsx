import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "@arcevo/facet-components";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    type: { control: "select", options: ["text", "email", "password", "number", "search", "url"] },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: { placeholder: "Enter text..." },
};

export const Email: Story = {
  args: { type: "email", placeholder: "email@example.com", defaultValue: "jane@example.com" },
};

export const Password: Story = {
  args: { type: "password", placeholder: "Enter password" },
};

export const Disabled: Story = {
  args: { placeholder: "Disabled input", disabled: true },
};

export const WithError: Story = {
  args: { placeholder: "Enter text...", className: "border-destructive", "aria-invalid": true },
};
