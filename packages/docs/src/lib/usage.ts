/**
 * Usage snippets for the component gallery.
 *
 * Two layers:
 *  - `usageCode(slug)` returns a complete, copy-pasteable default example
 *    (import + render) for every manifest component. No placeholder
 *    `<X />` stubs.
 *  - `variantUsage(slug)` returns one labeled snippet per variant gallery
 *    cell (labels must match lib/variants.tsx), rendered as tabs on the
 *    component page. Components without a gallery fall back to the default
 *    usage snippet.
 */

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
    "color-picker": "ColorPicker",
    "country-code-input": "CountryCodeInput",
    "date-picker": "DatePicker",
    "data-table": "DataTable",
    "number-input": "NumberInput",
    "location-picker": "LocationPicker",
    "notification-drawer": "NotificationDrawer",
  };
  if (overrides[slug]) return overrides[slug];
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

/**
 * Complete default usage snippets (import + a realistic example). Every
 * manifest component should appear here; anything missing falls back to a
 * generated import + a generic render.
 */
const USAGE: Record<string, string> = {
  button: `import { Button } from "@arcevo/facet-components";

function Example() {
  return <Button variant="default" size="lg">Get started</Button>;
}`,
  badge: `import { Badge } from "@arcevo/facet-components";
import { Sparkles, Check } from "lucide-react";

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
  "alert-dialog": `import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel } from "@arcevo/facet-components";
import { Button } from "@arcevo/facet-components";

function Example() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete account</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
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
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
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
  avatar: `import { Avatar, AvatarImage, AvatarFallback } from "@arcevo/facet-components";

function Example() {
  return (
    <Avatar className="h-10 w-10">
      <AvatarImage src="https://i.pravatar.cc/64?img=5" alt="Ada Lovelace" />
      <AvatarFallback>AL</AvatarFallback>
    </Avatar>
  );
}`,
  "avatar-group": `import { AvatarGroup } from "@arcevo/facet-components";

function Example() {
  return (
    <AvatarGroup
      avatars={[
        { src: "https://i.pravatar.cc/64?img=1", alt: "Ada", fallback: "A" },
        { fallback: "B" },
        { fallback: "C" },
      ]}
    />
  );
}`,
  breadcrumb: `import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@arcevo/facet-components";

function Example() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Docs</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}`,
  "button-group": `import { ButtonGroup } from "@arcevo/facet-components";
import { Button } from "@arcevo/facet-components";

function Example() {
  return (
    <ButtonGroup>
      <Button size="sm">Left</Button>
      <Button size="sm">Middle</Button>
      <Button size="sm">Right</Button>
    </ButtonGroup>
  );
}`,
  collapsible: `import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@arcevo/facet-components";

function Example() {
  return (
    <Collapsible>
      <CollapsibleTrigger>Toggle</CollapsibleTrigger>
      <CollapsibleContent>Collapsible content</CollapsibleContent>
    </Collapsible>
  );
}`,
  combobox: `import { Combobox } from "@arcevo/facet-components";

function Example() {
  return (
    <Combobox
      options={[
        { value: "o1", label: "Option 1" },
        { value: "o2", label: "Option 2" },
      ]}
      placeholder="Select..."
      label="Options"
    />
  );
}`,
  command: `import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@arcevo/facet-components";

function Example() {
  return (
    <Command className="w-72">
      <CommandInput placeholder="Search..." />
      <CommandList>
        <CommandEmpty>No results</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>Profile</CommandItem>
          <CommandItem>Settings</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}`,
  "context-menu": `import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuSeparator } from "@arcevo/facet-components";

function Example() {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div className="rounded-md border border-dashed p-4">Right-click</div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>Actions</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuItem>Copy</ContextMenuItem>
        <ContextMenuItem>Paste</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}`,
  "dropdown-menu": `import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@arcevo/facet-components";
import { Button } from "@arcevo/facet-components";

function Example() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}`,
  "empty-state": `import { EmptyState } from "@arcevo/facet-components";
import { Button } from "@arcevo/facet-components";

function Example() {
  return (
    <EmptyState
      title="No documents"
      description="Create your first document to get started."
      action={<Button size="sm">New document</Button>}
    />
  );
}`,
  "hover-card": `import { HoverCard, HoverCardTrigger, HoverCardContent } from "@arcevo/facet-components";
import { Button } from "@arcevo/facet-components";

function Example() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">@ada</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-64">
        <p className="text-sm font-semibold">Ada Lovelace</p>
        <p className="text-sm text-muted-foreground">Mathematician and writer.</p>
      </HoverCardContent>
    </HoverCard>
  );
}`,
  kbd: `import { Kbd, getModSymbol } from "@arcevo/facet-components";

function Example() {
  return <Kbd>{getModSymbol()}K</Kbd>;
}`,
  label: `import { Label } from "@arcevo/facet-components";

function Example() {
  return <Label htmlFor="email">Email</Label>;
}`,
  menubar: `import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarSeparator } from "@arcevo/facet-components";

function Example() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>New</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Exit</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}`,
  navbar: `import { Navbar } from "@arcevo/facet-components";

function Example() {
  return (
    <Navbar
      variant="sticky"
      brand={<span className="font-semibold">facet</span>}
      links={[
        { href: "#", label: "Features" },
        { href: "#", label: "Docs" },
      ]}
    />
  );
}`,
  "navigation-menu": `import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink } from "@arcevo/facet-components";

function Example() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Docs</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink href="#">Getting Started</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}`,
  pagination: `import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext, PaginationLink, PaginationEllipsis } from "@arcevo/facet-components";

function Example() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}`,
  popover: `import { Popover, PopoverTrigger, PopoverContent } from "@arcevo/facet-components";
import { Button } from "@arcevo/facet-components";

function Example() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open</Button>
      </PopoverTrigger>
      <PopoverContent>Popover content</PopoverContent>
    </Popover>
  );
}`,
  "radio-group": `import { RadioGroup, RadioGroupItem } from "@arcevo/facet-components";
import { Label } from "@arcevo/facet-components";

function Example() {
  return (
    <RadioGroup defaultValue="a">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="a" id="ra" />
        <Label htmlFor="ra">Option A</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="b" id="rb" />
        <Label htmlFor="rb">Option B</Label>
      </div>
    </RadioGroup>
  );
}`,
  "scroll-area": `import { ScrollArea, ScrollBar } from "@arcevo/facet-components";

function Example() {
  return (
    <ScrollArea className="h-32 w-72 rounded-md border p-3">
      {Array.from({ length: 20 }, (_, i) => (
        <p key={i} className="py-0.5 text-sm">Line {i + 1}</p>
      ))}
      <ScrollBar />
    </ScrollArea>
  );
}`,
  separator: `import { Separator } from "@arcevo/facet-components";

function Example() {
  return (
    <div className="flex flex-col gap-2">
      <span>Above</span>
      <Separator />
      <span>Below</span>
    </div>
  );
}`,
  sheet: `import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@arcevo/facet-components";
import { Button } from "@arcevo/facet-components";

function Example() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Sheet</SheetTitle>
          <SheetDescription>Sheet content</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}`,
  skeleton: `import { Skeleton } from "@arcevo/facet-components";

function Example() {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="h-4 w-48" />
      <Skeleton className="h-4 w-32" />
    </div>
  );
}`,
  sonner: `import { Toaster, toast } from "@arcevo/facet-components";

function Example() {
  return (
    <>
      <Toaster richColors position="top-right" />
      <Button onClick={() => toast.success("Saved successfully")}>Show toast</Button>
    </>
  );
}`,
  table: `import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@arcevo/facet-components";

function Example() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Ada</TableCell>
          <TableCell>Active</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}`,
  textarea: `import { Textarea } from "@arcevo/facet-components";

function Example() {
  return <Textarea placeholder="Write something..." />;
}`,
  toggle: `import { Toggle } from "@arcevo/facet-components";

function Example() {
  return <Toggle aria-label="Bold">B</Toggle>;
}`,
  "toggle-group": `import { ToggleGroup, ToggleGroupItem } from "@arcevo/facet-components";

function Example() {
  return (
    <ToggleGroup type="single" defaultValue="a">
      <ToggleGroupItem value="a">A</ToggleGroupItem>
      <ToggleGroupItem value="b">B</ToggleGroupItem>
      <ToggleGroupItem value="c">C</ToggleGroupItem>
    </ToggleGroup>
  );
}`,
  dropzone: `import { Dropzone } from "@arcevo/facet-components";

function Example() {
  return (
    <Dropzone
      label="Drag files here or click to browse"
      hint="PDF, images, anything"
      onFiles={(files) => console.log(files)}
    />
  );
}`,
  "color-picker": `import { ColorPicker } from "@arcevo/facet-components";

function Example() {
  return <ColorPicker value="#6366f1" label="Brand accent" />;
}`,
  qrcode: `import { QRCode } from "@arcevo/facet-components";

function Example() {
  return <QRCode value="https://facet.arcevocirqle.com.ng" size={140} label="facet docs" />;
}`,
  marquee: `import { Marquee } from "@arcevo/facet-components";

function Example() {
  return (
    <Marquee
      items={["facet", "arc-id", "auth", "tokens", "React 19", "Radix"]}
      duration={18}
    />
  );
}`,
  roadmap: `import { Roadmap } from "@arcevo/facet-components";
import type { RoadmapItem } from "@arcevo/facet-components";

const items: RoadmapItem[] = [
  { title: "Auth presets", description: "Fintech, med, edu", status: "done", date: "v1.0" },
  { title: "Passkey support", description: "WebAuthn across presets", status: "in-progress" },
  { title: "SAML/OIDC SSO", description: "Enterprise identity providers", status: "planned" },
];

function Example() {
  return <Roadmap items={items} />;
}`,
  form: `import { Form, FormField, useForm } from "@arcevo/facet-components";
import { Button, Input } from "@arcevo/facet-components";

interface FormValues {
  name: string;
  email: string;
}

function Example() {
  const form = useForm<FormValues>({ defaultValues: { name: "", email: "" } });
  return (
    <Form form={form} onSubmit={(values) => console.log(values)}>
      <FormField name="name" label="Name" required>
        <Input placeholder="Ada Lovelace" />
      </FormField>
      <FormField name="email" label="Email" required>
        <Input placeholder="ada@example.com" type="email" />
      </FormField>
      <Button type="submit">Submit</Button>
    </Form>
  );
}`,
  "data-table": `import { DataTable } from "@arcevo/facet-components";
import type { DataTableColumn } from "@arcevo/facet-components";

interface Row extends Record<string, unknown> {
  id: string;
  name: string;
  email: string;
  role: string;
}

const columns: DataTableColumn<Row>[] = [
  { key: "name", header: "Name" },
  { key: "email", header: "Email" },
  { key: "role", header: "Role" },
];

const rows: Row[] = [
  { id: "1", name: "Ada Lovelace", email: "ada@example.com", role: "Admin" },
];

function Example() {
  return <DataTable columns={columns} data={rows} searchable pagination />;
}`,
  "date-picker": `import { DatePicker } from "@arcevo/facet-components";

function Example() {
  return <DatePicker label="Due date" />;
}`,
  "number-input": `import { NumberInput } from "@arcevo/facet-components";

function Example() {
  return <NumberInput label="Quantity" min={0} max={10} />;
}`,
  "country-code-input": `import { CountryCodeInput } from "@arcevo/facet-components";

function Example() {
  return <CountryCodeInput label="Mobile number" />;
}`,
  "location-picker": `import { LocationPicker } from "@arcevo/facet-components";

function Example() {
  return <LocationPicker showLocality />;
}`,
  "notification-drawer": `import { NotificationDrawer } from "@arcevo/facet-components";

function Example() {
  return (
    <NotificationDrawer
      notifications={[
        { id: "1", title: "New message", description: "Ada sent you a message", time: "2m", read: false, type: "info" },
      ]}
    />
  );
}`,
};

/** Minimal import + usage snippet for a component slug. */
export function usageCode(slug: string): string {
  if (USAGE[slug]) return USAGE[slug];
  const name = importName(slug);
  return `import { ${name} } from "@arcevo/facet-components";

function Example() {
  return <${name} />;
}`;
}

/** lucide icons a snippet's code needs, detected by name. */
function lucideIcons(code: string): string {
  const icons = new Set<string>();
  for (const icon of ["Sparkles", "Check", "Sun", "Moon", "ArrowRight"]) {
    if (code.includes(icon)) icons.add(icon);
  }
  return icons.size ? `\nimport { ${[...icons].join(", ")} } from "lucide-react";` : "";
}

/**
 * Per-variant usage snippets, keyed by slug then variant label (labels must
 * match the gallery cells in lib/variants.tsx). Components with meaningful
 * per-variant code get tabs; the rest fall back to a single "Default" tab
 * showing the base usage snippet.
 */
const VARIANT_USAGE: Record<string, Record<string, string>> = {
  button: {
    default: `<Button variant="default">Button</Button>`,
    secondary: `<Button variant="secondary">Button</Button>`,
    destructive: `<Button variant="destructive">Delete</Button>`,
    outline: `<Button variant="outline">Button</Button>`,
    ghost: `<Button variant="ghost">Button</Button>`,
    link: `<Button variant="link">Link</Button>`,
    glass: `<Button variant="glass">Glass</Button>`,
    glow: `<Button variant="glow">Glow</Button>`,
  },
  badge: {
    default: `<Badge>Default</Badge>`,
    secondary: `<Badge variant="secondary">Secondary</Badge>`,
    outline: `<Badge variant="outline">Outline</Badge>`,
    success: `<Badge variant="success">Live</Badge>`,
    warning: `<Badge variant="warning">Warning</Badge>`,
    destructive: `<Badge variant="destructive">Error</Badge>`,
    "with icon": `<Badge icon={<Sparkles className="size-3" />}>New</Badge>`,
    "icon only": `<Badge variant="success" iconOnly icon={<Check className="size-3.5" />} aria-label="Verified" />`,
  },
  alert: {
    Default: `<Alert>
  <AlertTitle>Heads up</AlertTitle>
  <AlertDescription>Default alert</AlertDescription>
</Alert>`,
    Destructive: `<Alert variant="destructive">
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>Destructive alert</AlertDescription>
</Alert>`,
    Success: `<Alert variant="success">
  <AlertTitle>Success</AlertTitle>
  <AlertDescription>Success alert</AlertDescription>
</Alert>`,
    Warning: `<Alert variant="warning">
  <AlertTitle>Warning</AlertTitle>
  <AlertDescription>Warning alert</AlertDescription>
</Alert>`,
  },
  card: {
    default: `<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>`,
    glass: `<Card variant="glass">
  <CardHeader>
    <CardTitle>Glass</CardTitle>
    <CardDescription>Frosted surface.</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>`,
    frost: `<Card variant="frost">
  <CardHeader>
    <CardTitle>Frost</CardTitle>
    <CardDescription>Frosted glass surface.</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>`,
    glow: `<Card variant="glow">
  <CardHeader>
    <CardTitle>Glow</CardTitle>
    <CardDescription>Glowing surface.</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>`,
    ghost: `<Card variant="ghost">
  <CardHeader>
    <CardTitle>Ghost</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>`,
    outline: `<Card variant="outline">
  <CardHeader>
    <CardTitle>Outline</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>`,
    elevated: `<Card variant="elevated">
  <CardHeader>
    <CardTitle>Elevated</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>`,
    interactive: `<Card variant="interactive">
  <CardHeader>
    <CardTitle>Interactive</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>`,
  },
  spinner: {
    Default: `<Spinner />`,
    Primary: `<Spinner variant="primary" />`,
    Muted: `<Spinner variant="muted" />`,
    Small: `<Spinner size="sm" />`,
    Large: `<Spinner size="lg" />`,
  },
  switch: {
    Off: `<Switch />`,
    On: `<Switch checked />`,
    Disabled: `<Switch disabled />`,
  },
  toggle: {
    Default: `<Toggle>Bold</Toggle>`,
    Outline: `<Toggle variant="outline">Italic</Toggle>`,
    "With icon": `<Toggle aria-label="Settings">
  <Settings className="size-4" /> Settings
</Toggle>`,
  },
  "toggle-group": {
    Single: `<ToggleGroup type="single" defaultValue="a">
  <ToggleGroupItem value="a">A</ToggleGroupItem>
  <ToggleGroupItem value="b">B</ToggleGroupItem>
</ToggleGroup>`,
    Multiple: `<ToggleGroup type="multiple" defaultValue={["a"]}>
  <ToggleGroupItem value="a">A</ToggleGroupItem>
  <ToggleGroupItem value="b">B</ToggleGroupItem>
</ToggleGroup>`,
    Outline: `<ToggleGroup type="single" variant="outline" defaultValue="a">
  <ToggleGroupItem value="a">A</ToggleGroupItem>
  <ToggleGroupItem value="b">B</ToggleGroupItem>
</ToggleGroup>`,
  },
  tabs: {
    Default: `<Tabs defaultValue="a">
  <TabsList>
    <TabsTrigger value="a">A</TabsTrigger>
    <TabsTrigger value="b">B</TabsTrigger>
  </TabsList>
  <TabsContent value="a">Content A</TabsContent>
  <TabsContent value="b">Content B</TabsContent>
</Tabs>`,
    "Three tabs": `<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
    <TabsTrigger value="billing">Billing</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Account content</TabsContent>
</Tabs>`,
  },
  accordion: {
    Default: `<Accordion type="single" collapsible>
  <AccordionItem value="a">
    <AccordionTrigger>Item A</AccordionTrigger>
    <AccordionContent>Content A</AccordionContent>
  </AccordionItem>
</Accordion>`,
    Multiple: `<Accordion type="multiple">
  <AccordionItem value="a">
    <AccordionTrigger>Item A</AccordionTrigger>
    <AccordionContent>Content A</AccordionContent>
  </AccordionItem>
</Accordion>`,
    Separated: `<Accordion type="single" collapsible>
  <AccordionItem variant="separated" value="a">
    <AccordionTrigger>Item A</AccordionTrigger>
    <AccordionContent>Content A</AccordionContent>
  </AccordionItem>
</Accordion>`,
    Ghost: `<Accordion type="single" collapsible>
  <AccordionItem variant="ghost" value="a">
    <AccordionTrigger>Item A</AccordionTrigger>
    <AccordionContent>Content A</AccordionContent>
  </AccordionItem>
</Accordion>`,
    Compact: `<Accordion type="single" collapsible>
  <AccordionItem variant="compact" value="a">
    <AccordionTrigger>Item A</AccordionTrigger>
    <AccordionContent>Content A</AccordionContent>
  </AccordionItem>
</Accordion>`,
    Nested: `<Accordion type="single" collapsible>
  <AccordionItem value="parent">
    <AccordionTrigger>Parent</AccordionTrigger>
    <AccordionContent>
      <AccordionItem variant="nested" value="child">
        <AccordionTrigger>Child</AccordionTrigger>
        <AccordionContent>Deep content</AccordionContent>
      </AccordionItem>
    </AccordionContent>
  </AccordionItem>
</Accordion>`,
  },
  "alert-dialog": {
    Default: `<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="outline">Delete account</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
      <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
    Destructive: `<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">Revoke access</Button>
  </AlertDialogTrigger>
  <AlertDialogContent variant="destructive">
    <AlertDialogHeader>
      <AlertDialogTitle>Revoke API access?</AlertDialogTitle>
      <AlertDialogDescription>This will invalidate all tokens immediately.</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Keep access</AlertDialogCancel>
      <AlertDialogAction variant="destructive">Revoke</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
    "Confirm by typing": `<ConfirmAlertDialog
  entityName="facet"
  entityLabel="workspace"
  confirmPhrase="confirm delete"
  actionLabel="Delete workspace"
  trigger={<Button variant="destructive">Delete workspace</Button>}
  onConfirm={() => console.log("deleted")}
/>`,
  },
  "button-group": {
    Default: `<ButtonGroup>
  <Button size="sm">Left</Button>
  <Button size="sm">Middle</Button>
  <Button size="sm">Right</Button>
</ButtonGroup>`,
    Joined: `<ButtonGroup joined>
  <Button size="sm">Left</Button>
  <Button size="sm">Middle</Button>
  <Button size="sm">Right</Button>
</ButtonGroup>`,
  },
  breadcrumb: {
    "Two levels": `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Docs</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
    "Three levels": `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Guide</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
  },
  collapsible: {
    Default: `<Collapsible>
  <CollapsibleTrigger>Toggle</CollapsibleTrigger>
  <CollapsibleContent>Collapsible content</CollapsibleContent>
</Collapsible>`,
    "Open by default": `<Collapsible defaultOpen>
  <CollapsibleTrigger>Toggle</CollapsibleTrigger>
  <CollapsibleContent>Open content</CollapsibleContent>
</Collapsible>`,
  },
  menubar: {
    Default: `<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>New</MenubarItem>
      <MenubarSeparator />
      <MenubarItem>Exit</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`,
  },
  navbar: {
    default: `<Navbar
  brand={<span className="font-semibold">facet</span>}
  links={[{ href: "#", label: "Features" }]}
/>`,
    sticky: `<Navbar
  variant="sticky"
  brand={<span className="font-semibold">facet</span>}
  links={[{ href: "#", label: "Docs" }]}
/>`,
    glass: `<Navbar
  variant="glass"
  brand={<span className="font-semibold">facet</span>}
  links={[{ href: "#", label: "Docs" }]}
/>`,
    bordered: `<Navbar
  variant="bordered"
  brand={<span className="font-semibold">facet</span>}
  links={[{ href: "#", label: "Docs" }]}
/>`,
    transparent: `<Navbar
  variant="transparent"
  brand={<span className="font-semibold">facet</span>}
  links={[{ href: "#", label: "Docs" }]}
/>`,
    pill: `<Navbar
  variant="pill"
  brand={<span className="font-semibold">facet</span>}
  links={[{ href: "#", label: "Docs" }]}
/>`,
  },
  "navigation-menu": {
    Default: `<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Docs</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink href="#">Getting Started</NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`,
    "Multiple items": `<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Docs</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink href="#">Getting Started</NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink href="#">API Reference</NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`,
  },
  pagination: {
    Default: `<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">2</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`,
    Simple: `<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`,
  },
  "scroll-area": {
    Vertical: `<ScrollArea className="h-32 w-56 rounded-md border p-3">
  {Array.from({ length: 20 }, (_, i) => (
    <p key={i} className="py-0.5 text-sm">Line {i + 1}</p>
  ))}
  <ScrollBar />
</ScrollArea>`,
    Horizontal: `<ScrollArea className="h-24 w-56 whitespace-nowrap rounded-md border p-3">
  <div className="flex w-max gap-3">
    {items.map((item) => (
      <span key={item} className="w-32 rounded-md border p-2">{item}</span>
    ))}
  </div>
  <ScrollBar orientation="horizontal" />
</ScrollArea>`,
    Both: `<ScrollArea className="h-40 w-56 rounded-md border p-3">
  <div className="grid w-max grid-cols-3 gap-3">
    {items.map((item, i) => (
      <div key={i} className="h-24 w-24 rounded-md border">{item}</div>
    ))}
  </div>
  <ScrollBar orientation="horizontal" />
</ScrollArea>`,
  },
  separator: {
    Horizontal: `<div className="flex flex-col gap-2">
  <span>Above</span>
  <Separator />
  <span>Below</span>
</div>`,
    Vertical: `<div className="flex h-12 items-center gap-3">
  <span>Left</span>
  <Separator orientation="vertical" />
  <span>Right</span>
</div>`,
  },
  sheet: {
    Right: `<Sheet>
  <SheetTrigger asChild><Button variant="outline">Open</Button></SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Sheet</SheetTitle>
      <SheetDescription>Sheet content</SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>`,
    Left: `<Sheet>
  <SheetTrigger asChild><Button variant="outline">Open</Button></SheetTrigger>
  <SheetContent side="left">
    <SheetHeader>
      <SheetTitle>Sheet</SheetTitle>
      <SheetDescription>Sheet content</SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>`,
    Top: `<Sheet>
  <SheetTrigger asChild><Button variant="outline">Open</Button></SheetTrigger>
  <SheetContent side="top">
    <SheetHeader>
      <SheetTitle>Sheet</SheetTitle>
      <SheetDescription>Sheet content</SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>`,
    Bottom: `<Sheet>
  <SheetTrigger asChild><Button variant="outline">Open</Button></SheetTrigger>
  <SheetContent side="bottom">
    <SheetHeader>
      <SheetTitle>Sheet</SheetTitle>
      <SheetDescription>Sheet content</SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>`,
  },
  avatar: {
    "With image": `<Avatar className="h-10 w-10">
  <AvatarImage src="https://i.pravatar.cc/64?img=5" alt="Jane Archer" />
  <AvatarFallback>JA</AvatarFallback>
</Avatar>`,
    Fallback: `<Avatar className="h-10 w-10">
  <AvatarFallback>JA</AvatarFallback>
</Avatar>`,
    Large: `<Avatar className="h-16 w-16 text-lg">
  <AvatarFallback>JD</AvatarFallback>
</Avatar>`,
    "Authenticated user": `<UserAvatar
  user={{ name: "Ada Lovelace", email: "ada@arcevo.dev" }}
  items={[
    { label: "Profile", shortcut: "⇧⌘P", icon: "users" },
    { label: "Settings", shortcut: "⌘,", icon: "settings" },
  ]}
/>`,
  },
  "avatar-group": {
    Default: `<AvatarGroup
  avatars={[
    { src: "https://i.pravatar.cc/64?img=1", alt: "Ada", fallback: "A" },
    { fallback: "B" },
    { fallback: "C" },
  ]}
/>`,
    Small: `<AvatarGroup
  size="sm"
  avatars={[
    { src: "https://i.pravatar.cc/64?img=1", alt: "Ada", fallback: "A" },
    { fallback: "B" },
  ]}
/>`,
    Large: `<AvatarGroup
  size="lg"
  avatars={[
    { src: "https://i.pravatar.cc/64?img=1", alt: "Ada", fallback: "A" },
    { fallback: "B" },
  ]}
/>`,
    "Max 2": `<AvatarGroup
  max={2}
  avatars={[
    { src: "https://i.pravatar.cc/64?img=1", alt: "Ada", fallback: "A" },
    { fallback: "B" },
    { fallback: "C" },
  ]}
/>`,
  },
  "empty-state": {
    Default: `<EmptyState title="No results" description="Try a different filter." />`,
    "With icon": `<EmptyState
  icon={<Search className="size-6" />}
  title="Nothing here"
  description="No items match your search."
/>`,
    "With action": `<EmptyState
  title="No documents"
  description="Create your first document to get started."
  action={<Button size="sm">New document</Button>}
/>`,
  },
  skeleton: {
    Text: `<div className="flex flex-col gap-2">
  <Skeleton className="h-4 w-48" />
  <Skeleton className="h-4 w-32" />
</div>`,
    Avatar: `<Skeleton className="size-12 rounded-full" />`,
    Card: `<div className="flex flex-col gap-3">
  <Skeleton className="h-28 w-56 rounded-lg" />
  <Skeleton className="h-4 w-40" />
</div>`,
  },
  progress: {
    Empty: `<Progress value={0} />`,
    "25%": `<Progress value={25} />`,
    "50%": `<Progress value={50} />`,
    "85%": `<Progress value={85} />`,
    Complete: `<Progress value={100} />`,
  },
  sonner: {
    Toaster: `<Toaster richColors position="top-right" />

<Button onClick={() => toast.success("Saved successfully")}>
  Show toast
</Button>`,
  },
  command: {
    Default: `<Command className="w-72">
  <CommandInput placeholder="Search..." />
  <CommandList>
    <CommandEmpty>No results</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem>Profile</CommandItem>
      <CommandItem>Settings</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`,
    "With separator": `<Command className="w-72">
  <CommandInput placeholder="Search..." />
  <CommandList>
    <CommandEmpty>No results</CommandEmpty>
    <CommandGroup heading="General">
      <CommandItem>Profile</CommandItem>
      <CommandItem>Settings</CommandItem>
    </CommandGroup>
    <CommandGroup heading="Danger">
      <CommandItem>Logout</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`,
  },
  "context-menu": {
    Default: `<ContextMenu>
  <ContextMenuTrigger asChild>
    <div className="rounded-md border border-dashed p-4">Right-click</div>
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuLabel>Actions</ContextMenuLabel>
    <ContextMenuSeparator />
    <ContextMenuItem>Copy</ContextMenuItem>
    <ContextMenuItem>Paste</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`,
    "With icons": `<ContextMenu>
  <ContextMenuTrigger asChild>
    <div className="rounded-md border border-dashed p-4">Right-click</div>
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuLabel>Actions</ContextMenuLabel>
    <ContextMenuSeparator />
    <ContextMenuItem>
      <Copy className="size-4" /> Copy
    </ContextMenuItem>
    <ContextMenuItem>
      <Paste className="size-4" /> Paste
    </ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`,
  },
  dialog: {
    Default: `<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Open</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog</DialogTitle>
      <DialogDescription>Dialog content</DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>`,
    "With footer": `<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Open</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Create project</DialogTitle>
      <DialogDescription>Fill in the details below.</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="outline">Cancel</Button>
      <Button>Create</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
  },
  "dropdown-menu": {
    Default: `<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
    "With icons": `<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
      <Users className="size-4" /> Profile
    </DropdownMenuItem>
    <DropdownMenuItem>
      <Settings className="size-4" /> Settings
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
  },
  "hover-card": {
    Default: `<HoverCard>
  <HoverCardTrigger asChild>
    <Button variant="link">Hover</Button>
  </HoverCardTrigger>
  <HoverCardContent>Hover card content</HoverCardContent>
</HoverCard>`,
    "With content": `<HoverCard>
  <HoverCardTrigger asChild>
    <Button variant="link">@ada</Button>
  </HoverCardTrigger>
  <HoverCardContent className="w-64">
    <div className="space-y-1">
      <h4 className="text-sm font-semibold">Ada Lovelace</h4>
      <p className="text-sm text-muted-foreground">Mathematician and writer.</p>
    </div>
  </HoverCardContent>
</HoverCard>`,
  },
  popover: {
    Default: `<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Open</Button>
  </PopoverTrigger>
  <PopoverContent>Popover content</PopoverContent>
</Popover>`,
    "With content": `<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Open</Button>
  </PopoverTrigger>
  <PopoverContent className="w-64">
    <div className="space-y-1">
      <h4 className="text-sm font-semibold">Dimensions</h4>
      <p className="text-sm text-muted-foreground">Set the width and height.</p>
    </div>
  </PopoverContent>
</Popover>`,
  },
  tooltip: {
    Default: `<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">Hover</Button>
    </TooltipTrigger>
    <TooltipContent>Tooltip</TooltipContent>
  </Tooltip>
</TooltipProvider>`,
    Top: `<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">Hover</Button>
    </TooltipTrigger>
    <TooltipContent side="top">Top tooltip</TooltipContent>
  </Tooltip>
</TooltipProvider>`,
  },
  table: {
    Default: `<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Ada</TableCell>
      <TableCell>Active</TableCell>
    </TableRow>
  </TableBody>
</Table>`,
    Wide: `<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
      <TableHead>Role</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Ada</TableCell>
      <TableCell>ada@example.com</TableCell>
      <TableCell>Admin</TableCell>
    </TableRow>
  </TableBody>
</Table>`,
  },
  "notification-drawer": {
    Default: `<NotificationDrawer notifications={[]} />`,
    "With notifications": `<NotificationDrawer
  notifications={[
    { id: "1", title: "New message", description: "Ada sent you a message", time: "2m", read: false, type: "info" },
    { id: "2", title: "Build passed", description: "CI pipeline succeeded", time: "1h", read: false, type: "success" },
  ]}
/>`,
  },
  checkbox: {
    Default: `<Checkbox id="terms" />
<Label htmlFor="terms">Accept terms</Label>`,
    Checked: `<Checkbox id="terms" defaultChecked />
<Label htmlFor="terms">Checked</Label>`,
    Disabled: `<Checkbox id="terms" disabled />
<Label htmlFor="terms">Disabled</Label>`,
  },
  combobox: {
    Default: `<Combobox
  options={[
    { value: "o1", label: "Option 1" },
    { value: "o2", label: "Option 2" },
  ]}
  placeholder="Select..."
  label="Options"
/>`,
    Placeholder: `<Combobox
  options={[{ value: "o1", label: "Option 1" }]}
  placeholder="Choose a framework..."
  label="Framework"
/>`,
  },
  input: {
    Default: `<Input placeholder="Type here..." />`,
    "With label": `<div className="grid gap-1.5">
  <Label htmlFor="email">Email</Label>
  <Input id="email" placeholder="you@example.com" type="email" />
</div>`,
    Disabled: `<Input placeholder="Disabled" disabled />`,
  },
  "input-otp": {
    Default: `<InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`,
    Separated: `<InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`,
    Small: `<InputOTP maxLength={4}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
  </InputOTPGroup>
</InputOTP>`,
  },
  label: {
    Default: `<Label htmlFor="email">Email</Label>`,
    "With input": `<div className="grid gap-1.5">
  <Label htmlFor="name">Full name</Label>
  <Input id="name" placeholder="Ada Lovelace" />
</div>`,
  },
  "radio-group": {
    Default: `<RadioGroup defaultValue="a">
  <div className="flex items-center gap-2">
    <RadioGroupItem value="a" id="ra" />
    <Label htmlFor="ra">Option A</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="b" id="rb" />
    <Label htmlFor="rb">Option B</Label>
  </div>
</RadioGroup>`,
    Disabled: `<RadioGroup defaultValue="a">
  <div className="flex items-center gap-2">
    <RadioGroupItem value="a" id="rd" />
    <Label htmlFor="rd">Option A</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="b" id="rd2" disabled />
    <Label htmlFor="rd2">Disabled</Label>
  </div>
</RadioGroup>`,
  },
  select: {
    Default: `<Select>
  <SelectTrigger><SelectValue placeholder="Pick one" /></SelectTrigger>
  <SelectContent>
    <SelectItem value="a">Apple</SelectItem>
    <SelectItem value="b">Banana</SelectItem>
  </SelectContent>
</Select>`,
    "With value": `<Select defaultValue="b">
  <SelectTrigger><SelectValue /></SelectTrigger>
  <SelectContent>
    <SelectItem value="a">Apple</SelectItem>
    <SelectItem value="b">Banana</SelectItem>
  </SelectContent>
</Select>`,
  },
  slider: {
    Default: `<Slider defaultValue={[50]} max={100} step={1} />`,
    Range: `<Slider defaultValue={[25, 75]} max={100} step={1} />`,
    Disabled: `<Slider defaultValue={[50]} max={100} step={1} disabled />`,
  },
  textarea: {
    Default: `<Textarea placeholder="Write something..." />`,
    "With label": `<div className="grid gap-1.5">
  <Label htmlFor="bio">Bio</Label>
  <Textarea id="bio" placeholder="Tell us about yourself" />
</div>`,
  },
  kbd: {
    Default: `<Kbd>⌘K</Kbd>`,
    Modifier: `<Kbd mod />`,
    Combination: `<Kbd>Shift + ⌘ + P</Kbd>`,
  },
  dropzone: {
    Default: `<Dropzone
  label="Drag files here or click to browse"
  hint="PDF, images, anything"
  onFiles={(files) => console.log(files)}
/>`,
    Disabled: `<Dropzone label="Uploads disabled" disabled />`,
  },
  "color-picker": {
    Default: `<ColorPicker value="#6366f1" label="Brand accent" />`,
    Compact: `<ColorPicker value="#10b981" compact label="Compact" />`,
  },
  qrcode: {
    Default: `<QRCode value="https://facet.arcevocirqle.com.ng" size={120} label="facet docs" />`,
    Large: `<QRCode value="https://github.com/arcevodev/facet" size={160} label="facet GitHub" />`,
    Colored: `<QRCode
  value="https://facet.arcevocirqle.com.ng"
  size={120}
  fgColor="#6366f1"
  label="branded"
/>`,
  },
  marquee: {
    Default: `<Marquee
  duration={16}
  items={["facet", "arc-id", "auth", "tokens", "React 19", "Radix"]}
/>`,
    Reverse: `<Marquee
  duration={16}
  reverse
  items={["A", "B", "C", "D", "E", "F"].map((letter) => (
    <span key={letter} className="rounded-full border px-4 py-2">
      Item {letter}
    </span>
  ))}
/>`,
  },
  roadmap: {
    Default: `<Roadmap
  items={[
    { title: "Auth presets", description: "Fintech, med, edu", status: "done", date: "v1.0" },
    { title: "Passkey support", description: "WebAuthn across presets", status: "in-progress" },
    { title: "SAML/OIDC SSO", description: "Enterprise identity providers", status: "planned" },
  ]}
/>`,
    "No line": `<Roadmap
  showLine={false}
  items={[
    { title: "Auth presets", description: "Fintech, med, edu", status: "done", date: "v1.0" },
  ]}
/>`,
  },
  form: {
    "Basic form": `<Form form={form} onSubmit={(values) => console.log(values)}>
  <FormField name="name" label="Name" required>
    <Input placeholder="Ada Lovelace" />
  </FormField>
  <FormField name="email" label="Email" required>
    <Input placeholder="ada@example.com" type="email" />
  </FormField>
  <Button type="submit">Submit</Button>
</Form>`,
    "With validation": `<Form form={form} onSubmit={(values) => console.log(values)}>
  <FormField name="email" label="Work email" required>
    <Input placeholder="you@company.com" type="email" />
  </FormField>
  <Button type="submit">Continue</Button>
</Form>`,
  },
  "data-table": {
    Default: `<DataTable columns={columns} data={rows} />`,
    Searchable: `<DataTable columns={columns} data={rows} searchable />`,
    Selectable: `<DataTable columns={columns} data={rows} selectable />`,
  },
  "date-picker": {
    Default: `<DatePicker label="Due date" />`,
    "Horizontal strip": `<DatePicker label="Pick a day" scrollMode="horizontal" horizontalDays={14} />`,
  },
  "number-input": {
    Default: `<NumberInput label="Quantity" min={0} max={10} />`,
    "With value": `<NumberInput label="Quantity" value={4} min={0} max={10} />`,
  },
  "country-code-input": {
    Default: `<CountryCodeInput label="Mobile number" />`,
  },
  "location-picker": {
    Default: `<LocationPicker showLocality />`,
    "Without locality": `<LocationPicker />`,
  },
};

/** Per-variant usage snippet for a slug. Returns { label, code } entries in
 *  gallery order, falling back to a single "Default" tab. */
export function variantUsage(slug: string): { label: string; code: string }[] {
  const variants = VARIANT_USAGE[slug];
  if (!variants) return [{ label: "Default", code: usageCode(slug) }];
  const name = importName(slug);
  const needsMore = (code: string) =>
    code.includes("Button") ||
    code.includes("Label") ||
    code.includes("Separator") ||
    code.includes("Input") ||
    code.includes("UserAvatar") ||
    code.includes("ConfirmAlertDialog") ||
    code.includes("ScrollBar") ||
    code.includes("InputOTPSeparator");
  const extraImports = (code: string) => {
    const parts = [`import { ${name} } from "@arcevo/facet-components";`];
    if (needsMore(code)) {
      const extras = ["Button", "Label", "Separator", "ScrollBar", "InputOTPSeparator", "UserAvatar", "ConfirmAlertDialog"]
        .filter((c) => code.includes(c))
        .join(", ");
      if (extras) parts.push(`import { ${extras} } from "@arcevo/facet-components";`);
    }
    const icons = lucideIcons(code);
    if (icons) parts.push(icons.replace(/^\n/, ""));
    return parts.join("\n");
  };
  return Object.entries(variants).map(([label, code]) => ({
    label,
    code: `${extraImports(code)}
function Example() {
  return ${code};
}`,
  }));
}
