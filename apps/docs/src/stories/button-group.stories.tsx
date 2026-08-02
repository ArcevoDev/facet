import type { Meta, StoryObj } from "@storybook/react";
import { ButtonGroup } from "@arcevo/facet-components";
import { Button } from "@arcevo/facet-components";

const meta: Meta<typeof ButtonGroup> = {
  title: "Components/ButtonGroup",
  component: ButtonGroup,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

export const Joined: Story = {
  render: () => (
    <ButtonGroup joined>
      <Button variant="ghost" size="sm">
        Day
      </Button>
      <Button variant="ghost" size="sm">
        Week
      </Button>
      <Button variant="ghost" size="sm">
        Month
      </Button>
    </ButtonGroup>
  ),
};

export const Spaced: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline" size="sm">
        Cancel
      </Button>
      <Button size="sm">Save</Button>
      <Button variant="destructive" size="sm">
        Delete
      </Button>
    </ButtonGroup>
  ),
};
