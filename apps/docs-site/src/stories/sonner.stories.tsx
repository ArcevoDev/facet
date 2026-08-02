import type { Meta, StoryObj } from "@storybook/react";
import { toast } from "sonner";
import { Button, Toaster } from "@arcevo/facet-components";

const meta: Meta<typeof Toaster> = {
  title: "Components/Toaster",
  component: Toaster,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Toaster>;

export const Default: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button onClick={() => toast("Event has been created")}>Default toast</Button>
      <Button onClick={() => toast.success("Saved successfully")}>Success</Button>
      <Button variant="outline" onClick={() => toast.error("Something went wrong")}>
        Error
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast("Custom action", {
            action: { label: "Undo", onClick: () => undefined },
          })
        }
      >
        With action
      </Button>
      <Toaster />
    </div>
  ),
};
