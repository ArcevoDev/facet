import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ChevronsUpDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@arcevo/facet-components";

const meta: Meta<typeof Collapsible> = {
  title: "Components/Collapsible",
  component: Collapsible,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Collapsible>;

export const Default: Story = {
  render: () => (
    <Collapsible className="w-[380px] space-y-2">
      <div className="flex items-center justify-between rounded-md border px-4 py-3 text-sm">
        <span className="font-medium">@arcevodev/facet</span>
        <CollapsibleTrigger className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
          <ChevronsUpDown className="size-4" />
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="rounded-md border px-4 py-3 text-sm text-muted-foreground">
        Core packages: tokens, components, auth, layout, and sdk. Each is independently installable
        and tree-shakeable.
      </CollapsibleContent>
    </Collapsible>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Collapsible open={open} onOpenChange={setOpen} className="w-[380px] space-y-2">
        <div className="flex items-center justify-between rounded-md border px-4 py-3 text-sm">
          <span className="font-medium">Expandable row</span>
          <CollapsibleTrigger className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
            <ChevronsUpDown className="size-4" />
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="rounded-md border px-4 py-3 text-sm text-muted-foreground">
          {open ? "Open: click the trigger again to collapse." : ""}
        </CollapsibleContent>
      </Collapsible>
    );
  },
};
