import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "@arcevo/facet-components";

const meta: Meta<typeof Skeleton> = {
  title: "Components/Skeleton",
  component: Skeleton,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Text: Story = {
  render: () => (
    <div className="flex flex-col gap-3 w-64">
      <Skeleton className="h-4 w-48" />
      <Skeleton className="h-4 w-36" />
      <Skeleton className="h-4 w-52" />
    </div>
  ),
};

export const Card: Story = {
  render: () => (
    <div className="flex flex-col gap-3 w-64 rounded-xl border p-4">
      <Skeleton className="h-32 w-full rounded-lg" />
      <Skeleton className="h-4 w-48" />
      <Skeleton className="h-4 w-32" />
    </div>
  ),
};

export const Avatar: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
  ),
};
