import * as React from "react";
import { Check, Sparkles } from "lucide-react";
import {
  Alert,
  AlertTitle,
  AlertDescription,
  Badge,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Progress,
  Spinner,
  Switch,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Avatar,
  AvatarImage,
  AvatarFallback,
  UserAvatar,
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
  getModSymbol,
} from "@arcevo/facet-components";

/** One cell in the variant gallery: a label plus the rendered example. */
export interface VariantCell {
  label: string;
  node: React.ReactNode;
}

/**
 * Per-component variant galleries for the /components/:slug pages.
 * Each slug maps to the labeled cells shown in the Storybook grid.
 * Falls back to a single default cell for slugs without a gallery.
 */
export function variantCells(slug: string): VariantCell[] | undefined {
  switch (slug) {
    case "button":
      return (
        ["default", "destructive", "outline", "secondary", "ghost", "link"] as const
      ).map((variant) => ({
        label: variant,
        node: <Button variant={variant}>Button</Button>,
      }));
    case "badge":
      return (
        [
          ...(["default", "secondary", "outline", "success", "warning", "destructive"] as const).map(
            (variant) => ({
              label: variant,
              node: <Badge variant={variant}>{variant}</Badge>,
            }),
          ),
          { label: "with icon", node: <Badge icon={<Sparkles className="size-3" />}>New</Badge> },
          {
            label: "icon only",
            node: (
              <Badge variant="success" iconOnly icon={<Check className="size-3.5" />} aria-label="Verified" />
            ),
          },
        ] as const
      );
    case "alert":
      return (
        [
          { label: "Default", variant: "default", title: "Heads up", desc: "Default alert" },
          { label: "Destructive", variant: "destructive", title: "Error", desc: "Destructive alert" },
          { label: "Success", variant: "success", title: "Success", desc: "Success alert" },
          { label: "Warning", variant: "warning", title: "Warning", desc: "Warning alert" },
        ] as const
      ).map(({ label, variant, title, desc }) => ({
        label,
        node: (
          <Alert variant={variant} className="w-full">
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>{desc}</AlertDescription>
          </Alert>
        ),
      }));
    case "card":
      return (
        ["default", "glass", "glow", "ghost", "outline", "elevated", "interactive"] as const
      ).map((variant) => ({
        label: variant,
        node: (
          <Card variant={variant} className="w-full">
            <CardHeader>
              <CardTitle className="capitalize">{variant}</CardTitle>
              <CardDescription>The {variant} card variant.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Card content area.</p>
            </CardContent>
            <CardFooter className="justify-end">
              <Button size="sm" variant="outline">
                Action
              </Button>
            </CardFooter>
          </Card>
        ),
      }));
    case "progress":
      return [0, 25, 50, 85, 100].map((value) => ({
        label: value === 0 ? "Empty" : value === 100 ? "Complete" : `${value}%`,
        node: <Progress value={value} className="w-full" />,
      }));
    case "spinner":
      return (
        [
          { label: "Default", variant: "default" },
          { label: "Primary", variant: "primary" },
          { label: "Muted", variant: "muted" },
        ] as const
      ).map(({ label, variant }) => ({
        label,
        node: <Spinner variant={variant} />,
      }));
    case "switch":
      return (
        [
          { label: "Off", checked: false },
          { label: "On", checked: true },
          { label: "Disabled", checked: false, disabled: true },
        ] as const
      ).map(({ label, ...props }) => ({
        label,
        node: <Switch {...props} />,
      }));
    case "toggle":
      return (
        [
          { label: "Default", pressed: true, children: "Bold" },
          { label: "Outline", variant: "outline", children: "Italic" },
        ] as const
      ).map(({ label, children, ...props }) => ({
        label,
        node: <Toggle {...props}>{children}</Toggle>,
      }));
    case "toggle-group":
      return [
        {
          label: "Single",
          node: (
            <ToggleGroup type="single" defaultValue="a">
              <ToggleGroupItem value="a">A</ToggleGroupItem>
              <ToggleGroupItem value="b">B</ToggleGroupItem>
              <ToggleGroupItem value="c">C</ToggleGroupItem>
            </ToggleGroup>
          ),
        },
        {
          label: "Multiple",
          node: (
            <ToggleGroup type="multiple" defaultValue={["a"]}>
              <ToggleGroupItem value="a">A</ToggleGroupItem>
              <ToggleGroupItem value="b">B</ToggleGroupItem>
              <ToggleGroupItem value="c">C</ToggleGroupItem>
            </ToggleGroup>
          ),
        },
      ];
    case "tabs":
      return [
        {
          label: "Default",
          node: (
            <Tabs defaultValue="a">
              <TabsList>
                <TabsTrigger value="a">A</TabsTrigger>
                <TabsTrigger value="b">B</TabsTrigger>
              </TabsList>
              <TabsContent value="a">Content A</TabsContent>
              <TabsContent value="b">Content B</TabsContent>
            </Tabs>
          ),
        },
      ];
    case "accordion":
      return [
        {
          label: "Default",
          node: (
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="a">
                <AccordionTrigger>Item A</AccordionTrigger>
                <AccordionContent>Content A</AccordionContent>
              </AccordionItem>
            </Accordion>
          ),
        },
        {
          label: "Multiple",
          node: (
            <Accordion type="multiple" className="w-full">
              <AccordionItem value="a">
                <AccordionTrigger>Item A</AccordionTrigger>
                <AccordionContent>Content A</AccordionContent>
              </AccordionItem>
            </Accordion>
          ),
        },
        {
          label: "Separated",
          node: (
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem variant="separated" value="a">
                <AccordionTrigger>Item A</AccordionTrigger>
                <AccordionContent>Content A</AccordionContent>
              </AccordionItem>
            </Accordion>
          ),
        },
        {
          label: "Ghost",
          node: (
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem variant="ghost" value="a">
                <AccordionTrigger>Item A</AccordionTrigger>
                <AccordionContent>Content A</AccordionContent>
              </AccordionItem>
            </Accordion>
          ),
        },
        {
          label: "Compact",
          node: (
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem variant="compact" value="a">
                <AccordionTrigger>Item A</AccordionTrigger>
                <AccordionContent>Content A</AccordionContent>
              </AccordionItem>
            </Accordion>
          ),
        },
        {
          label: "Nested",
          node: (
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="parent">
                <AccordionTrigger>Parent</AccordionTrigger>
                <AccordionContent>
                  <Accordion type="single" collapsible>
                    <AccordionItem variant="nested" value="child">
                      <AccordionTrigger>Child item</AccordionTrigger>
                      <AccordionContent>Deep content</AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ),
        },
      ];
    case "avatar":
      return [
        {
          label: "With image",
          node: (
            <Avatar className="h-10 w-10">
              <AvatarImage
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=faces"
                alt="Jane Archer"
              />
              <AvatarFallback>JA</AvatarFallback>
            </Avatar>
          ),
        },
        {
          label: "Fallback",
          node: (
            <Avatar className="h-10 w-10">
              <AvatarFallback>JA</AvatarFallback>
            </Avatar>
          ),
        },
        {
          label: "Large",
          node: (
            <Avatar className="h-16 w-16 text-lg">
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          ),
        },
        {
          label: "Authenticated user",
          node: (
            <UserAvatar
              user={{ name: "Ada Lovelace", email: "ada@arcevo.dev" }}
              items={[
                { label: "Profile", shortcut: `⇧${getModSymbol()}P`, icon: "users" },
                { label: "Settings", shortcut: `${getModSymbol()},`, icon: "settings" },
              ]}
            />
          ),
        },
      ];
    case "alert-dialog":
      return [
        {
          label: "Default",
          node: (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline">Delete account</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ),
        },
        {
          label: "Destructive",
          node: (
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
                        This will invalidate all tokens immediately.
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
        },
        {
          label: "Confirm by typing",
          node: (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete workspace</Button>
              </AlertDialogTrigger>
              <AlertDialogContent variant="destructive">
                <AlertDialogHeader>
                  <div className="flex items-start gap-3 sm:items-center">
                    <AlertDialogIcon className="mt-0.5 shrink-0 sm:mt-0" />
                    <div className="flex flex-col gap-1.5">
                      <AlertDialogTitle>Delete this workspace?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Type the workspace name to confirm.
                      </AlertDialogDescription>
                    </div>
                  </div>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction variant="destructive">Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ),
        },
      ];
    default:
      return undefined;
  }
}
