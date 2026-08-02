import type { Meta, StoryObj } from "@storybook/react";
import { NotificationBell, type BellNotification } from "@arcevo/facet-components";

const meta: Meta<typeof NotificationBell> = {
  title: "Components/NotificationBell",
  component: NotificationBell,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof NotificationBell>;

const notifications: BellNotification[] = [
  {
    id: "1",
    title: "New sign-in detected",
    description: "A new device signed in from Lagos, NG.",
    time: "2 min ago",
    read: false,
  },
  {
    id: "2",
    title: "Payment received",
    description: "$2,400.00 was credited to your account.",
    time: "1 hr ago",
    read: false,
  },
  {
    id: "3",
    title: "Weekly digest",
    description: "Your workspace activity summary is ready.",
    time: "Yesterday",
    read: true,
  },
];

export const Default: Story = {
  args: { notifications },
};

export const Empty: Story = {
  args: { notifications: [] },
};

export const WithCustomTrigger: Story = {
  args: {
    notifications,
    trigger: <span className="text-sm font-medium">Open</span>,
  },
};
