import type { Meta, StoryObj } from "@storybook/react";
import { Calculator, Calendar, CreditCard, Settings, Smile, User } from "lucide-react";
import { getModSymbol } from "@arcevo/facet-components";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@arcevo/facet-components";

const meta: Meta<typeof Command> = {
  title: "Components/Command",
  component: Command,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Command>;

export const Default: Story = {
  render: () => (
    <Command className="w-[440px] border">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <Calendar className="mr-2" />
            <span>Calendar</span>
          </CommandItem>
          <CommandItem>
            <Smile className="mr-2" />
            <span>Search Emoji</span>
          </CommandItem>
          <CommandItem>
            <Calculator className="mr-2" />
            <span>Calculator</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <User className="mr-2" />
            <span>Profile</span>
            <CommandShortcut>{getModSymbol()}P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <CreditCard className="mr-2" />
            <span>Billing</span>
            <CommandShortcut>{getModSymbol()}B</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Settings className="mr-2" />
            <span>Settings</span>
            <CommandShortcut>{getModSymbol()}S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};

export const InDialog: Story = {
  render: () => (
    <CommandDialog open onOpenChange={() => undefined}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Quick actions">
          <CommandItem>Create new workspace</CommandItem>
          <CommandItem>Invite team member</CommandItem>
          <CommandItem>Switch organization</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  ),
};
