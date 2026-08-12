/**
 * @arcevo/facet-components/light
 *
 * A slim entry point for consumers (or eager app shells) that only need the
 * lightweight, high-frequency modules: the icon registry, theme system,
 * dropdown menu, kbd, and the `cn` helper. Importing from here avoids
 * pulling the entire component barrel (dialog, form, dropzone, qrcode,
 * input-otp, ...) into the eager bundle.
 *
 *   import { Icon, ThemeProvider, DropdownMenu } from "@arcevo/facet-components/light";
 */

export { cn, isMac, getModSymbol } from "./utils.js";

/* ── Button ──────────────────────────────────────────────────── */
export { type ButtonProps, Button, buttonVariants } from "./ui/button.js";

/* ── Icon registry ──────────────────────────────────────────── */
export { IconProvider, Icon, registerIcon, resetIconRegistry, getIcon, lucideIconMap, lucideIconNames, toKebab } from "./icon/index.js";
export type {
  IconComponent,
  IconName,
  SemanticIconName,
  LucideIconName,
  IconOverrides,
  IconProps,
  IconProviderProps,
} from "./icon/index.js";

/* ── Theme system ────────────────────────────────────────────── */
export { ThemeProvider, useTheme, ThemeToggle } from "./theme/index.js";
export type { Theme, ThemeProviderProps, ThemeToggleProps } from "./theme/index.js";

/* ── Dropdown menu ───────────────────────────────────────────── */
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

/* ── Kbd ─────────────────────────────────────────────────────── */
export { Kbd } from "./ui/kbd.js";

/* ── Tabs ────────────────────────────────────────────────────── */
export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "./ui/tabs.js";
