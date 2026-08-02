import type { Meta, StoryObj } from "@storybook/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@arcevo/facet-components";
import { Button } from "@arcevo/facet-components";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          This is the card content area. Place your content here.
        </p>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" size="sm">
          Cancel
        </Button>
        <Button size="sm">Save</Button>
      </CardFooter>
    </Card>
  ),
};

export const Simple: Story = {
  render: () => (
    <Card className="w-80 p-6">
      <p className="text-sm text-muted-foreground">
        A simple card with just content, no header or footer.
      </p>
    </Card>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="grid w-full max-w-3xl gap-4 sm:grid-cols-2">
      {(["default", "glass", "glow", "ghost", "outline", "elevated", "interactive"] as const).map(
        (variant) => (
          <Card key={variant} variant={variant} className="w-full">
            <CardHeader>
              <CardTitle className="capitalize">{variant}</CardTitle>
              <CardDescription>The {variant} variant using the shared card chrome.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Cards carry the surface, border and shadow tokens so content stays readable in any
                theme.
              </p>
            </CardContent>
          </Card>
        ),
      )}
    </div>
  ),
};
