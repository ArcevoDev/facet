import type { Meta, StoryObj } from "@storybook/react";
import { NotificationDrawer, Button } from "@arcevo/facet-components";
import type { DrawerNotification } from "@arcevo/facet-components";

const meta: Meta<typeof NotificationDrawer> = {
  title: "Components/NotificationDrawer",
  component: NotificationDrawer,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof NotificationDrawer>;

const sampleNotifications: DrawerNotification[] = [
  {
    id: "1",
    title: "New sign-in detected",
    description: "A new device signed in to your account from Lagos, NG.",
    time: "2m ago",
    read: false,
    type: "warning",
  },
  {
    id: "2",
    title: "Payment received",
    description: "You received $249.00 for invoice #INV-1042.",
    time: "1h ago",
    read: false,
    type: "success",
  },
  {
    id: "3",
    title: "MFA disabled",
    description: "Two-factor authentication was turned off for your account.",
    time: "3h ago",
    read: false,
    type: "error",
  },
  {
    id: "4",
    title: "Weekly security report",
    description: "Your account had no suspicious activity this week.",
    time: "1d ago",
    read: true,
    type: "info",
  },
  {
    id: "5",
    title: "New feature available",
    description: "Passkey support is now live. Add a passkey to your account.",
    time: "2d ago",
    read: true,
  },
];

export const Default: Story = {
  args: {
    notifications: sampleNotifications,
    onMarkAllRead: () => {},
    onMarkRead: () => {},
    onDismiss: () => {},
  },
};

export const Empty: Story = {
  args: {
    notifications: [],
  },
};

export const CustomTrigger: Story = {
  args: {
    notifications: sampleNotifications,
    trigger: <Button variant="outline">Open notifications</Button>,
  },
};
