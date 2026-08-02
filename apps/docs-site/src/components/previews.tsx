import { Check, Sparkles } from "lucide-react";
import {
  Button,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Alert,
  AlertTitle,
  AlertDescription,
  AvatarGroup,
  Avatar,
  AvatarImage,
  AvatarFallback,
  UserAvatar,
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Checkbox,
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  Input,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  Kbd,
  getModSymbol,
  Label,
  Progress,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Separator,
  Skeleton,
  Slider,
  Spinner,
  Switch,
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Textarea,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
  PaginationEllipsis,
  EmptyState,
  ButtonGroup,
  Combobox,
  Navbar,
  NotificationBell,
  NotificationDrawer,
  Popover,
  PopoverTrigger,
  PopoverContent,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogIcon,
  ConfirmAlertDialog,
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
  ScrollArea,
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  ScrollBar,
  Toaster,
} from "@arcevo/facet-components";

const IMG =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=faces";

export interface PreviewOptions {
  variant?: string;
  size?: string;
}

/** Compact static demo for a component slug (shared by sidebar + pages). */
export function ComponentPreview({ slug, variant = "default", size = "default" }: { slug: string } & PreviewOptions) {
  switch (slug) {
    case "button":
      return <Button variant={variant as never} size={size as never}>Button</Button>;
    case "badge":
      return (
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={variant as never}>Default</Badge>
          <Badge icon={<Sparkles className="size-3" />}>New</Badge>
          <Badge variant="success" iconOnly icon={<Check className="size-3.5" />} aria-label="Verified" />
        </div>
      );
    case "card":
      return (
        <Card className="w-72">
          <CardHeader>
            <CardTitle>Card</CardTitle>
            <CardDescription>Description</CardDescription>
          </CardHeader>
          <CardContent>Content</CardContent>
        </Card>
      );
    case "accordion":
      return (
        <Accordion type="single" collapsible className="w-64">
          <AccordionItem value="a">
            <AccordionTrigger>Item A</AccordionTrigger>
            <AccordionContent>Content A</AccordionContent>
          </AccordionItem>
          <AccordionItem value="b">
            <AccordionTrigger>Item B</AccordionTrigger>
            <AccordionContent>Content B</AccordionContent>
          </AccordionItem>
        </Accordion>
      );
    case "alert":
      return (
        <div className="flex w-80 flex-col gap-3">
          <Alert>
            <AlertTitle>Heads up</AlertTitle>
            <AlertDescription>Default alert</AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Destructive alert</AlertDescription>
          </Alert>
        </div>
      );
    case "avatar":
      return (
        <div className="flex flex-wrap items-center justify-center gap-6">
          <Avatar className="h-10 w-10">
            <AvatarImage src={IMG} alt="Jane Archer" />
            <AvatarFallback>JA</AvatarFallback>
          </Avatar>
          <Avatar className="h-10 w-10">
            <AvatarFallback>JA</AvatarFallback>
          </Avatar>
          <Avatar className="h-16 w-16 text-lg">
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <UserAvatar
            user={{
              name: "Ada Lovelace",
              email: "ada@arcevo.dev",
              memberships: [{ tenantId: "1", name: "Arcevo" }],
            }}
            items={[
              { label: "Profile", shortcut: `⇧${getModSymbol()}P`, icon: "users" },
              { label: "Settings", shortcut: `${getModSymbol()},`, icon: "settings" },
            ]}
          />
        </div>
      );
    case "avatar-group":
      return (
        <AvatarGroup
          avatars={[
            { src: IMG, alt: "a", fallback: "A" },
            { fallback: "B" },
            { fallback: "C" },
          ]}
        />
      );
    case "breadcrumb":
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
    case "button-group":
      return (
        <ButtonGroup>
          <Button size="sm">Left</Button>
          <Button size="sm">Middle</Button>
          <Button size="sm">Right</Button>
        </ButtonGroup>
      );
    case "checkbox":
      return (
        <div className="flex items-center gap-2">
          <Checkbox id="c1" />
          <Label htmlFor="c1">Accept terms</Label>
        </div>
      );
    case "collapsible":
      return (
        <Collapsible className="w-72">
          <CollapsibleTrigger>Toggle</CollapsibleTrigger>
          <CollapsibleContent className="mt-2 text-sm text-muted-foreground">
            Collapsible content
          </CollapsibleContent>
        </Collapsible>
      );
    case "combobox":
      return (
        <div className="w-72">
          <Combobox
            options={[
              { value: "o1", label: "Option 1" },
              { value: "o2", label: "Option 2" },
              { value: "o3", label: "Option 3" },
            ]}
            value="o1"
            placeholder="Select..."
            label="Options"
          />
        </div>
      );
    case "input":
      return <Input className="w-72" placeholder="Type here..." />;
    case "input-otp":
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
    case "kbd":
      return (
        <Kbd>
          {getModSymbol()}K
        </Kbd>
      );
    case "label":
      return <Label htmlFor="x">Email</Label>;
    case "progress":
      return <Progress value={60} className="w-72" />;
    case "radio-group":
      return (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <RadioGroup defaultValue="a">
              <RadioGroupItem value="a" id="ra" />
            </RadioGroup>
            <Label htmlFor="ra">Option A</Label>
          </div>
        </div>
      );
    case "select":
      return (
        <Select>
          <SelectTrigger className="w-56">
            <SelectValue placeholder="Pick one" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="a">Apple</SelectItem>
            <SelectItem value="b">Banana</SelectItem>
          </SelectContent>
        </Select>
      );
    case "separator":
      return (
        <div className="flex w-72 flex-col gap-2">
          <span>Above</span>
          <Separator />
          <span>Below</span>
        </div>
      );
    case "skeleton":
      return (
        <div className="flex w-72 flex-col gap-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      );
    case "slider":
      return <Slider defaultValue={[50]} max={100} step={1} className="w-72" />;
    case "spinner":
      return <Spinner />;
    case "switch":
      return (
        <div className="flex items-center gap-2">
          <Switch id="s1" />
          <Label htmlFor="s1">Enable</Label>
        </div>
      );
    case "tabs":
      return (
        <Tabs defaultValue="a">
          <TabsList>
            <TabsTrigger value="a">A</TabsTrigger>
            <TabsTrigger value="b">B</TabsTrigger>
          </TabsList>
          <TabsContent value="a">Content A</TabsContent>
          <TabsContent value="b">Content B</TabsContent>
        </Tabs>
      );
    case "textarea":
      return <Textarea className="w-72" placeholder="Write something..." />;
    case "toggle":
      return <Toggle aria-label="Bold">B</Toggle>;
    case "toggle-group":
      return (
        <ToggleGroup type="single" defaultValue="a">
          <ToggleGroupItem value="a">A</ToggleGroupItem>
          <ToggleGroupItem value="b">B</ToggleGroupItem>
          <ToggleGroupItem value="c">C</ToggleGroupItem>
        </ToggleGroup>
      );
    case "table":
      return (
        <Table className="w-80">
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
    case "pagination":
      return (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
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
    case "empty-state":
      return <EmptyState title="No results" description="Try a different filter." />;
    case "tooltip":
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Hover</Button>
            </TooltipTrigger>
            <TooltipContent>Tooltip</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    case "popover":
      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Open</Button>
          </PopoverTrigger>
          <PopoverContent>Popover content</PopoverContent>
        </Popover>
      );
    case "dropdown-menu":
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
    case "sheet":
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
    case "dialog":
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Open</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dialog</DialogTitle>
              <DialogDescription>Dialog content</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    case "alert-dialog":
      return (
        <div className="flex flex-wrap items-center justify-center gap-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete account</Button>
            </AlertDialogTrigger>
            <AlertDialogContent variant="destructive">
              <AlertDialogHeader>
                <div className="flex items-start gap-3 sm:items-center">
                  <AlertDialogIcon className="mt-0.5 shrink-0 sm:mt-0" />
                  <div className="flex flex-col gap-1.5">
                    <AlertDialogTitle>Delete account?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This cannot be undone. Your account, data, and memberships will be
                      permanently removed.
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
          <ConfirmAlertDialog
            entityName="facet"
            entityLabel="workspace"
            confirmPhrase="confirm delete"
            actionLabel="Delete workspace"
            trigger={<Button variant="destructive">Delete workspace</Button>}
          />
        </div>
      );
    case "command":
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
    case "hover-card":
      return (
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="link">Hover</Button>
          </HoverCardTrigger>
          <HoverCardContent>Hover card content</HoverCardContent>
        </HoverCard>
      );
    case "scroll-area":
      return (
        <ScrollArea className="h-32 w-72 rounded-md border border-border p-3">
          {Array.from({ length: 20 }, (_, i) => (
            <p key={i} className="py-0.5 text-sm">
              Line {i + 1}
            </p>
          ))}
          <ScrollBar />
        </ScrollArea>
      );
    case "context-menu":
      return (
        <ContextMenu>
          <ContextMenuTrigger asChild>
            <div className="flex h-24 w-72 items-center justify-center rounded-md border border-dashed border-border text-sm text-muted-foreground">
              Right-click
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuLabel>Actions</ContextMenuLabel>
            <ContextMenuSeparator />
            <ContextMenuItem>Copy</ContextMenuItem>
            <ContextMenuItem>Paste</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      );
    case "menubar":
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
          <MenubarMenu>
            <MenubarTrigger>Edit</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Undo</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      );
    case "navigation-menu":
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
    case "navbar":
      return (
        <div className="w-full max-w-lg">
          <Navbar
            variant="sticky"
            brand={<span className="font-semibold">facet</span>}
            links={[
              { href: "#", label: "Features" },
              { href: "#", label: "Docs" },
            ]}
          />
        </div>
      );
    case "notification-bell":
      return <NotificationBell />;
    case "notification-drawer":
      return <NotificationDrawer />;
    case "sonner":
      return <Toaster richColors position="top-right" />;
    default:
      return (
        <div className="text-sm text-muted-foreground">
          Live preview for <code>{slug}</code> is not implemented yet.
        </div>
      );
  }
}
