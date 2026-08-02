import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "@arcevo/facet-components";

const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  component: Textarea,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: { placeholder: "Write your message here...", className: "w-80" },
};

export const WithValue: Story = {
  args: {
    defaultValue: "This is some pre-filled text content in the textarea.",
    className: "w-80",
  },
};

export const Disabled: Story = {
  args: { placeholder: "Disabled textarea", disabled: true, className: "w-80" },
};
