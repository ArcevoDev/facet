/**
 * @arcevo/facet-components: Styled shadcn-equivalent UI components
 *
 * These are Layer 2 components: Radix primitives + Alpha Palette styling.
 * No business logic, just polished, accessible UI.
 *
 * Usage:
 *   import { Button, Card, Input } from "@arcevo/facet-components";
 *   import "@arcevo/facet-components/tokens.css";
 */

export { cn, isMac, getModSymbol } from "./utils.js";

/* ── Icon registry ──────────────────────────────────────────── */
export { IconProvider, Icon, registerIcon, getIcon } from "./icon/index.js";
export type {
  IconComponent,
  IconName,
  IconOverrides,
  IconProps,
  IconProviderProps,
} from "./icon/index.js";

/* ── Theme system ────────────────────────────────────────────── */
export { ThemeProvider, useTheme, ThemeToggle } from "./theme/index.js";
export type { Theme, ThemeProviderProps, ThemeToggleProps } from "./theme/index.js";

export { type ButtonProps, Button, buttonVariants } from "./ui/button.js";

export { type InputProps, Input } from "./ui/input.js";

export { Label } from "./ui/label.js";

export { type BadgeProps, Badge, badgeVariants } from "./ui/badge.js";

export { type AlertProps, Alert, AlertTitle, AlertDescription, alertVariants } from "./ui/alert.js";

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  ConfirmAlertDialog,
  AlertDialogIcon,
} from "./ui/alert-dialog.js";
export type {
  ConfirmAlertDialogProps,
  AlertDialogProps,
  AlertDialogContentProps,
  AlertDialogActionProps,
} from "./ui/alert-dialog.js";

export { RadioGroup, RadioGroupItem } from "./ui/radio-group.js";

export { type ToggleProps, Toggle, toggleVariants } from "./ui/toggle.js";

export { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group.js";

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
} from "./ui/menubar.js";

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
} from "./ui/context-menu.js";

export { HoverCard, HoverCardTrigger, HoverCardContent } from "./ui/hover-card.js";

export { type KbdProps, Kbd } from "./ui/kbd.js";

export { type SpinnerProps, Spinner, spinnerVariants } from "./ui/spinner.js";

export { type EmptyStateProps, EmptyState } from "./ui/empty-state.js";

export { type ButtonGroupProps, ButtonGroup } from "./ui/button-group.js";

export { type AvatarGroupProps, AvatarGroup } from "./ui/avatar-group.js";

export { type ComboboxProps, type ComboboxOption, Combobox } from "./ui/combobox.js";

export {
  type CardProps,
  Card,
  cardVariants,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card.js";

export { Separator } from "./ui/separator.js";

export { Skeleton } from "./ui/skeleton.js";

export { Avatar, AvatarImage, AvatarFallback, UserAvatar, getInitials } from "./ui/avatar.js";
export type {
  UserAvatarProps,
  UserAvatarUser,
  UserAvatarMenuItem,
} from "./ui/avatar.js";

export { Checkbox } from "./ui/checkbox.js";

export { Switch } from "./ui/switch.js";

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  dialogOverlayVariants,
  dialogContentVariants,
} from "./ui/dialog.js";
export type { DialogOverlayProps, DialogContentProps } from "./ui/dialog.js";

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
} from "./ui/select.js";

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor } from "./ui/popover.js";

export { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs.js";

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "./ui/tooltip.js";

export { Slider } from "./ui/slider.js";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
} from "./ui/dropdown-menu.js";

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from "./ui/sheet.js";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "./ui/table.js";

export { Textarea } from "./ui/textarea.js";

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "./ui/breadcrumb.js";

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "./ui/pagination.js";

export { Progress } from "./ui/progress.js";

export { ScrollArea, ScrollBar } from "./ui/scroll-area.js";

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "./ui/input-otp.js";

export { Collapsible, CollapsibleTrigger, CollapsibleContent } from "./ui/collapsible.js";

export { Toaster } from "./ui/sonner.js";

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  accordionItemVariants,
} from "./ui/accordion.js";
export type { AccordionItemProps } from "./ui/accordion.js";

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu.js";

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from "./ui/command.js";

export { NotificationBell } from "./ui/notification-bell.js";
export type {
  Notification as BellNotification,
  NotificationBellProps,
} from "./ui/notification-bell.js";

export { Navbar, navbarVariants } from "./ui/navbar.js";
export type {
  NavbarProps,
  NavLink,
  NavChildLink,
  NavbarRouter,
  NavbarRouterLinkProps,
} from "./ui/navbar.js";

export { NotificationDrawer } from "./ui/notification-drawer.js";
export type {
  Notification as DrawerNotification,
  NotificationDrawerProps,
  NotificationType,
} from "./ui/notification-drawer.js";
