/** Minimal import + usage snippet for a component slug. */
const USAGE: Record<string, string> = {
  button: `import { Button } from "@arcevo/facet-components";

function Example() {
  return <Button variant="default" size="lg">Get started</Button>;
}`,
  badge: `import { Badge } from "@arcevo/facet-components";
import { Check, Sparkles } from "lucide-react";

function Example() {
  return (
    <div className="flex gap-2">
      <Badge variant="success">Live</Badge>
      <Badge icon={<Sparkles size={12} />}>New</Badge>
      <Badge variant="success" iconOnly icon={<Check size={14} />} aria-label="Verified" />
    </div>
  );
}`,
  alert: `import { Alert, AlertTitle, AlertDescription } from "@arcevo/facet-components";

function Example() {
  return (
    <Alert variant="destructive">
      <AlertTitle>Payment failed</AlertTitle>
      <AlertDescription>Check your payment method and try again.</AlertDescription>
    </Alert>
  );
}`,
  card: `import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@arcevo/facet-components";

function Example() {
  return (
    <Card variant="default">
      <CardHeader>
        <CardTitle>Card title</CardTitle>
        <CardDescription>Card description</CardDescription>
      </CardHeader>
      <CardContent>Card content</CardContent>
    </Card>
  );
}`,
  accordion: `import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@arcevo/facet-components";

function Example() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="a">
        <AccordionTrigger>Item A</AccordionTrigger>
        <AccordionContent>Content A</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}`,
  tabs: `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@arcevo/facet-components";

function Example() {
  return (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Account content</TabsContent>
      <TabsContent value="settings">Settings content</TabsContent>
    </Tabs>
  );
}`,
  dialog: `import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@arcevo/facet-components";
import { Button } from "@arcevo/facet-components";

function Example() {
  return (
    <Dialog>
      <DialogTrigger asChild><Button variant="outline">Open</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog</DialogTitle>
          <DialogDescription>Dialog content</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}`,
  "alert-dialog": `import { ConfirmAlertDialog } from "@arcevo/facet-components";
import { Button } from "@arcevo/facet-components";

function Example() {
  return (
    <ConfirmAlertDialog
      entityName="facet"
      entityLabel="workspace"
      confirmPhrase="confirm delete"
      actionLabel="Delete workspace"
      trigger={<Button variant="destructive">Delete workspace</Button>}
      onConfirm={() => console.log("deleted")}
    />
  );
}`,
  "confirm-alert-dialog": `import { ConfirmAlertDialog } from "@arcevo/facet-components";
import { Button } from "@arcevo/facet-components";

function Example() {
  return (
    <ConfirmAlertDialog
      entityName="facet"
      entityLabel="workspace"
      confirmPhrase="confirm delete"
      actionLabel="Delete workspace"
      trigger={<Button variant="destructive">Delete workspace</Button>}
      onConfirm={() => console.log("deleted")}
    />
  );
}`,
  input: `import { Input } from "@arcevo/facet-components";

function Example() {
  return <Input placeholder="Type here..." />;
}`,
  checkbox: `import { Checkbox } from "@arcevo/facet-components";
import { Label } from "@arcevo/facet-components";

function Example() {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms</Label>
    </div>
  );
}`,
  switch: `import { Switch } from "@arcevo/facet-components";
import { Label } from "@arcevo/facet-components";

function Example() {
  return (
    <div className="flex items-center gap-2">
      <Switch id="airplane" />
      <Label htmlFor="airplane">Airplane mode</Label>
    </div>
  );
}`,
  progress: `import { Progress } from "@arcevo/facet-components";

function Example() {
  return <Progress value={60} />;
}`,
  spinner: `import { Spinner } from "@arcevo/facet-components";

function Example() {
  return <Spinner variant="primary" />;
}`,
  select: `import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@arcevo/facet-components";

function Example() {
  return (
    <Select>
      <SelectTrigger><SelectValue placeholder="Pick one" /></SelectTrigger>
      <SelectContent>
        <SelectItem value="a">Apple</SelectItem>
        <SelectItem value="b">Banana</SelectItem>
      </SelectContent>
    </Select>
  );
}`,
  slider: `import { Slider } from "@arcevo/facet-components";

function Example() {
  return <Slider defaultValue={[50]} max={100} step={1} />;
}`,
  "input-otp": `import { InputOTP, InputOTPGroup, InputOTPSlot } from "@arcevo/facet-components";

function Example() {
  return (
    <InputOTP maxLength={6}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
    </InputOTP>
  );
}`,
  tooltip: `import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@arcevo/facet-components";
import { Button } from "@arcevo/facet-components";

function Example() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild><Button variant="outline">Hover</Button></TooltipTrigger>
        <TooltipContent>Tooltip content</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}`,
  avatar: `import { UserAvatar } from "@arcevo/facet-components";
import { useAuth } from "@arcevo/facet-auth";

function Example() {
  const { user, logout } = useAuth();
  if (!user) return null;
  return (
    <UserAvatar
      user={user}
      items={[
        { label: "Profile", shortcut: "⇧⌘P", icon: "user" },
        { label: "Settings", shortcut: "⌘,", icon: "settings" },
      ]}
      onSignOut={logout}
    />
  );
}`,
};

/** PascalCase single-component name for a slug, with common overrides. */
function importName(slug: string): string {
  const overrides: Record<string, string> = {
    "input-otp": "InputOTP",
    "alert-dialog": "AlertDialog",
    "avatar-group": "AvatarGroup",
    "empty-state": "EmptyState",
    "toggle-group": "ToggleGroup",
    "context-menu": "ContextMenu",
    "navigation-menu": "NavigationMenu",
    "dropdown-menu": "DropdownMenu",
    "scroll-area": "ScrollArea",
    "button-group": "ButtonGroup",
    "radio-group": "RadioGroup",
    "hover-card": "HoverCard",
  };
  if (overrides[slug]) return overrides[slug];
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

/** Minimal import + usage snippet for a component slug. */
export function usageCode(slug: string): string {
  if (USAGE[slug]) return USAGE[slug];
  const name = importName(slug);
  return `import { ${name} } from "@arcevo/facet-components";

function Example() {
  return <${name} />;
}`;
}
