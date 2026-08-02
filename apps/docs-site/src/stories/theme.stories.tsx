import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@arcevo/facet-components";
import { ThemeProvider, ThemeToggle } from "@arcevo/facet-components";

const meta: Meta<typeof ThemeToggle> = {
  title: "Components/Theme",
  component: ThemeToggle,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ThemeToggle>;

export const Default: Story = {
  render: () => (
    <ThemeProvider defaultTheme="dark">
      <div className="flex items-start gap-6">
        <Card className="w-[320px]">
          <CardHeader>
            <CardTitle>Theme control</CardTitle>
            <CardDescription>
              Switch between light, dark, and system. The choice persists to localStorage and any
              brand can override the CSS variables.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ThemeToggle />
          </CardContent>
        </Card>
      </div>
    </ThemeProvider>
  ),
};

export const LightOnly: Story = {
  render: () => (
    <ThemeProvider defaultTheme="light">
      <div className="flex gap-3">
        <ThemeToggle />
      </div>
    </ThemeProvider>
  ),
};

export const WithOverrideVars: Story = {
  render: () => (
    <ThemeProvider defaultTheme="dark" overrideVars={{ "--primary": "oklch(0.55 0.2 162)" }}>
      <div className="flex gap-3">
        <ThemeToggle />
      </div>
    </ThemeProvider>
  ),
};
