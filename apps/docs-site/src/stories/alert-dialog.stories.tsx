import type { Meta, StoryObj } from "@storybook/react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogIcon,
  ConfirmAlertDialog,
} from "@arcevo/facet-components";
import { Button } from "@arcevo/facet-components";

const meta: Meta<typeof AlertDialog> = {
  title: "Components/AlertDialog",
  component: AlertDialog,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AlertDialog>;

export const Default: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Delete account</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your
            data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

export const Destructive: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Revoke access</Button>
      </AlertDialogTrigger>
      <AlertDialogContent variant="destructive">
        <AlertDialogHeader>
          <div className="flex items-start gap-3 sm:items-center">
            <AlertDialogIcon className="mt-0.5 shrink-0 sm:mt-0" />
            <div className="flex flex-col gap-1.5">
              <AlertDialogTitle>Revoke API access?</AlertDialogTitle>
              <AlertDialogDescription>
                This will immediately invalidate all tokens issued to this application.
              </AlertDialogDescription>
            </div>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep access</AlertDialogCancel>
          <AlertDialogAction variant="destructive">Revoke</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

export const ConfirmByTyping: Story = {
  render: () => (
    <ConfirmAlertDialog
      entityName="facet"
      entityLabel="workspace"
      confirmPhrase="confirm delete"
      actionLabel="Delete workspace"
      description="This action cannot be undone. Type the workspace name and the confirmation phrase to continue."
      trigger={<Button variant="destructive">Delete workspace</Button>}
    />
  ),
};
