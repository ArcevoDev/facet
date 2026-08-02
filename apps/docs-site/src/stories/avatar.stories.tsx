import type { Meta, StoryObj } from "@storybook/react";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  UserAvatar,
  getModSymbol,
} from "@arcevo/facet-components";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const WithImage: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://i.pravatar.cc/150?u=jane" alt="Jane Archer" />
      <AvatarFallback>JA</AvatarFallback>
    </Avatar>
  ),
};

export const WithFallback: Story = {
  render: () => (
    <Avatar>
      <AvatarFallback>JA</AvatarFallback>
    </Avatar>
  ),
};

export const Large: Story = {
  render: () => (
    <Avatar className="h-16 w-16 text-lg">
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
};

export const AuthenticatedUser: Story = {
  render: () => (
    <UserAvatar
      user={{
        name: "Ada Lovelace",
        email: "ada@arcevo.dev",
        memberships: [{ tenantId: "1", name: "Arcevo" }],
      }}
      items={[
        { label: "Profile", shortcut: `⇧${getModSymbol()}P`, icon: "users" },
        { label: "Settings", shortcut: `${getModSymbol()},`, icon: "settings" },
      ]}
      onSignOut={() => console.log("signed out")}
    />
  ),
};
