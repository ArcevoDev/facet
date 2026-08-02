import type { Meta, StoryObj } from "@storybook/react";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@arcevo/facet-components";
import { Avatar, AvatarFallback, AvatarImage } from "@arcevo/facet-components";
import { CalendarDays } from "lucide-react";

const meta: Meta<typeof HoverCard> = {
  title: "Components/HoverCard",
  component: HoverCard,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof HoverCard>;

export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger className="text-sm font-medium text-primary underline underline-offset-4">
        @jane.doe
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src="https://i.pravatar.cc/150?u=jane" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">Jane Doe</h4>
            <p className="text-sm text-muted-foreground">
              Product engineer at Arcevo. Building the identity layer for the ecosystem.
            </p>
            <div className="flex items-center pt-2">
              <CalendarDays className="mr-2 size-4 opacity-70" />
              <span className="text-xs text-muted-foreground">Joined August 2025</span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};
