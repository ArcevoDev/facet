import type { Meta, StoryObj } from "@storybook/react";
import { EmptyState } from "@arcevo/facet-components";
import { Button } from "@arcevo/facet-components";
import { Inbox, SearchX } from "lucide-react";

const meta: Meta<typeof EmptyState> = {
  title: "Components/EmptyState",
  component: EmptyState,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  args: {
    icon: <Inbox className="size-10" />,
    title: "No items yet",
    description: "Items you add will show up here. Get started by creating your first one.",
  },
};

export const WithAction: Story = {
  render: () => (
    <EmptyState
      icon={<Inbox className="size-10" />}
      title="No notifications"
      description="You're all caught up. New notifications will appear here."
      action={<Button>Refresh</Button>}
    />
  ),
};

export const Compact: Story = {
  render: () => (
    <EmptyState
      className="py-8"
      icon={<SearchX className="size-8" />}
      title="No results found"
      description="Try adjusting your search or filters."
    />
  ),
};
