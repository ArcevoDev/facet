import type { Meta, StoryObj } from "@storybook/react";
import { Alert, AlertTitle, AlertDescription } from "@arcevo/facet-components";
import { AlertCircle, CheckCircle2, Info, TriangleAlert } from "lucide-react";

const meta: Meta<typeof Alert> = {
  title: "Components/Alert",
  component: Alert,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "success", "warning"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  render: () => (
    <Alert className="w-96">
      <Info className="size-4" />
      <AlertTitle>Heads up</AlertTitle>
      <AlertDescription>You can add components to your app using the CLI.</AlertDescription>
    </Alert>
  ),
};

export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive" className="w-96">
      <AlertCircle className="size-4" />
      <AlertTitle>Payment failed</AlertTitle>
      <AlertDescription>Check your payment method and try again.</AlertDescription>
    </Alert>
  ),
};

export const Success: Story = {
  render: () => (
    <Alert variant="success" className="w-96">
      <CheckCircle2 className="size-4" />
      <AlertTitle>Payment received</AlertTitle>
      <AlertDescription>A receipt has been sent to your email.</AlertDescription>
    </Alert>
  ),
};

export const Warning: Story = {
  render: () => (
    <Alert variant="warning" className="w-96">
      <TriangleAlert className="size-4" />
      <AlertTitle>Subscription expiring</AlertTitle>
      <AlertDescription>Renew soon to avoid service interruption.</AlertDescription>
    </Alert>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Alert className="w-96">
      <Info className="size-4" />
      <AlertTitle>Dark mode available</AlertTitle>
      <AlertDescription>Enable it under your profile settings to get started.</AlertDescription>
      <button className="absolute right-4 top-4 text-sm font-medium text-primary hover:underline">
        Enable
      </button>
    </Alert>
  ),
};
