import type { Meta, StoryObj } from "@storybook/react";
import { AvatarGroup } from "@arcevo/facet-components";

const meta: Meta<typeof AvatarGroup> = {
  title: "Components/AvatarGroup",
  component: AvatarGroup,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "default", "lg"] },
  },
};

export default meta;
type Story = StoryObj<typeof AvatarGroup>;

export const Default: Story = {
  args: {
    avatars: [
      { src: "https://i.pravatar.cc/150?u=jane", fallback: "JD" },
      { src: "https://i.pravatar.cc/150?u=john", fallback: "JM" },
      { src: "https://i.pravatar.cc/150?u=grace", fallback: "GA" },
      { src: "https://i.pravatar.cc/150?u=sam", fallback: "SK" },
      { src: "https://i.pravatar.cc/150?u=ada", fallback: "AI" },
    ],
  },
};

export const OverflowCount: Story = {
  args: {
    max: 3,
    avatars: [
      { fallback: "JD" },
      { fallback: "JM" },
      { fallback: "GA" },
      { fallback: "SK" },
      { fallback: "AI" },
      { fallback: "OB" },
      { fallback: "TP" },
    ],
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-4">
      <AvatarGroup
        size="sm"
        avatars={[{ fallback: "JD" }, { fallback: "JM" }, { fallback: "GA" }]}
      />
      <AvatarGroup
        size="default"
        avatars={[{ fallback: "JD" }, { fallback: "JM" }, { fallback: "GA" }]}
      />
      <AvatarGroup
        size="lg"
        avatars={[{ fallback: "JD" }, { fallback: "JM" }, { fallback: "GA" }]}
      />
    </div>
  ),
};
