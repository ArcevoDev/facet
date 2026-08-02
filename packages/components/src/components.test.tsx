import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./ui/button.js";
import { Badge } from "./ui/badge.js";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card.js";
import { Navbar, type NavLink } from "./ui/navbar.js";
import { NotificationDrawer, type Notification } from "./ui/notification-drawer.js";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion.js";
import { Dialog, DialogContent } from "./ui/dialog.js";
import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "./ui/alert.js";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "./ui/alert-dialog.js";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group.js";
import { Toggle } from "./ui/toggle.js";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group.js";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
} from "./ui/menubar.js";
import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem } from "./ui/context-menu.js";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "./ui/hover-card.js";
import { Kbd } from "./ui/kbd.js";
import { Spinner } from "./ui/spinner.js";
import { EmptyState } from "./ui/empty-state.js";
import { ButtonGroup } from "./ui/button-group.js";
import { AvatarGroup } from "./ui/avatar-group.js";
import { Combobox } from "./ui/combobox.js";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Save</Button>);
    expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
  });

  it("applies variant + size classes", () => {
    const { container } = render(
      <Button variant="destructive" size="lg">
        Delete
      </Button>,
    );
    const btn = container.querySelector("button");
    expect(btn).toHaveClass("bg-destructive");
    expect(btn).toHaveClass("h-10");
    expect(btn).toHaveClass("cursor-pointer");
  });

  it("is disabled when disabled prop set", () => {
    render(<Button disabled>Off</Button>);
    expect(screen.getByRole("button", { name: /off/i })).toBeDisabled();
  });

  it("fires onClick", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);
    await userEvent.click(screen.getByRole("button", { name: /click/i }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe("Badge", () => {
  it("renders label", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("applies variant classes", () => {
    const { container } = render(<Badge variant="secondary">Tag</Badge>);
    expect(container.querySelector("div")).toHaveClass("bg-secondary");
  });

  it("renders an optional leading icon", () => {
    const { container } = render(<Badge icon={<span data-testid="icon">*</span>}>New</Badge>);
    expect(screen.getByText("New")).toBeInTheDocument();
    expect(container.querySelector("[data-testid=icon]")).toBeInTheDocument();
  });

  it("renders icon-only when iconOnly is set", () => {
    const { container } = render(<Badge iconOnly icon={<span data-testid="icon">*</span>} />);
    expect(container.querySelector("[data-testid=icon]")).toBeInTheDocument();
    expect(container.querySelector("div")).toHaveClass("size-6");
  });
});

describe("Card", () => {
  it("composes header, title, content", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>Manage settings</CardDescription>
        </CardHeader>
        <CardContent>Body</CardContent>
      </Card>,
    );
    expect(screen.getByText("Account")).toBeInTheDocument();
    expect(screen.getByText("Manage settings")).toBeInTheDocument();
    expect(screen.getByText("Body")).toBeInTheDocument();
  });

  it.each(["outline", "elevated", "interactive"] as const)(
    "applies %s variant classes",
    (variant) => {
      const { container } = render(<Card variant={variant}>Body</Card>);
      const card = container.querySelector("div");
      expect(card).toHaveClass("rounded-xl");
      if (variant === "outline") expect(card).toHaveClass("shadow-none");
      if (variant === "elevated") expect(card).toHaveClass("shadow-md");
      if (variant === "interactive") expect(card).toHaveClass("cursor-pointer");
    },
  );
});

describe("Accordion", () => {
  it("renders trigger and expands content", async () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Question</AccordionTrigger>
          <AccordionContent>Answer</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    expect(screen.getByText("Question")).toBeInTheDocument();
    await userEvent.click(screen.getByText("Question"));
    expect(await screen.findByText("Answer")).toBeInTheDocument();
  });

  it("applies the separated variant classes to the item", () => {
    const { container } = render(
      <Accordion type="single">
        <AccordionItem variant="separated" value="item-1">
          <AccordionTrigger>Q</AccordionTrigger>
        </AccordionItem>
      </Accordion>,
    );
    // The AccordionItem renders an <h3> (Header) inside the item div.
    const header = container.querySelector("h3");
    const item = header?.parentElement;
    expect(item?.className).toContain("bg-card");
    expect(item?.className).toContain("rounded-lg");
  });

  it("spaces separated items apart within a single accordion", () => {
    const { container } = render(
      <Accordion type="single">
        <AccordionItem variant="separated" value="item-1">
          <AccordionTrigger>First</AccordionTrigger>
        </AccordionItem>
        <AccordionItem variant="separated" value="item-2">
          <AccordionTrigger>Second</AccordionTrigger>
        </AccordionItem>
      </Accordion>,
    );
    const headers = container.querySelectorAll("h3");
    const items = Array.from(headers, (h) => h.parentElement);
    expect(items[1]?.className).toContain("mt-2");
  });

  it("applies nested indent and guide-line classes to the item", () => {
    const { container } = render(
      <Accordion type="single">
        <AccordionItem variant="nested" value="item-1">
          <AccordionTrigger>Child</AccordionTrigger>
        </AccordionItem>
      </Accordion>,
    );
    const header = container.querySelector("h3");
    const item = header?.parentElement;
    expect(item?.className).toContain("ml-3");
    expect(item?.className).toContain("pl-3");
    expect(item?.className).toContain("border-l");
  });
});

describe("Dialog", () => {
  it("renders content inside a dialog with a dim overlay by default", async () => {
    render(
      <Dialog defaultOpen>
        <DialogContent aria-describedby={undefined}>
          <p>Content</p>
        </DialogContent>
      </Dialog>,
    );
    const content = await screen.findByText("Content");
    expect(content).toBeInTheDocument();
    const dialog = content.closest("[role=dialog]");
    // Default dialog uses the frost surface for a readable, blurred card.
    expect(dialog?.className).toContain("frost");
    // The overlay is rendered by Radix into the portal; the dim variant applies bg-black/80.
    expect(document.querySelector(".bg-black\\/80")).not.toBeNull();
  });

  it("applies the compact variant class to content", async () => {
    render(
      <Dialog defaultOpen>
        <DialogContent variant="compact" aria-describedby={undefined}>
          <p>Small</p>
        </DialogContent>
      </Dialog>,
    );
    const content = await screen.findByText("Small");
    const dialog = content.closest("[role=dialog]");
    expect(dialog?.className).toContain("max-w-md");
  });
});

describe("Navbar", () => {
  const links: NavLink[] = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/settings", label: "Settings", badge: "New" },
  ];

  it("renders brand and desktop links", () => {
    render(<Navbar brand={<span>Acme</span>} links={links} />);
    expect(screen.getByText("Acme")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /dashboard/i })).toHaveAttribute("href", "/dashboard");
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  it("renders badge on links", () => {
    render(<Navbar links={links} />);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("calls onNavigate and prevents default", async () => {
    const onNavigate = vi.fn();
    render(<Navbar links={links} onNavigate={onNavigate} />);

    const link = screen.getByRole("link", { name: /dashboard/i });
    await userEvent.click(link);

    expect(onNavigate).toHaveBeenCalledWith("/dashboard");
  });

  it("toggles the mobile menu", async () => {
    render(<Navbar brand="Acme" links={links} />);

    const toggle = screen.getByRole("button", { name: /toggle menu/i });
    // Desktop links are rendered but hidden; mobile menu starts closed
    expect(screen.getAllByText("Settings").length).toBe(1);

    await userEvent.click(toggle);
    // Mobile menu adds a duplicate of the links
    expect(screen.getAllByText("Settings").length).toBe(2);

    await userEvent.click(toggle);
    expect(screen.getAllByText("Settings").length).toBe(1);
  });

  it("renders sub-links in a dropdown trigger", async () => {
    const onNavigate = vi.fn();
    render(
      <Navbar
        links={[
          {
            href: "/product",
            label: "Product",
            children: [{ href: "/product/pricing", label: "Pricing" }],
          },
        ]}
        onNavigate={onNavigate}
      />,
    );

    // The parent link becomes a dropdown trigger button
    const trigger = screen.getByRole("button", { name: /product/i });
    expect(trigger).toBeInTheDocument();

    // Sub-link renders inside the dropdown once opened
    await userEvent.click(trigger);
    const subLink = await screen.findByText("Pricing");
    expect(subLink).toBeInTheDocument();

    await userEvent.click(subLink);
    expect(onNavigate).toHaveBeenCalledWith("/product/pricing");
  });

  it("applies frosted-glass pill classes when variant is pill", () => {
    const { container } = render(<Navbar variant="pill" brand="Acme" links={links} />);
    const nav = container.querySelector("nav");
    // Pill is mobile-first: floating rounded bar applies from md up
    expect(nav).toHaveClass("md:rounded-full");
    expect(nav).toHaveClass("backdrop-blur-xl");
    expect(nav).toHaveClass("sticky");
  });

  it("renders a segmented tray for pill links", () => {
    const { container } = render(<Navbar variant="pill" brand="Acme" links={links} />);
    const tray = container.querySelector("nav > div:nth-of-type(2)");
    expect(tray).toHaveClass("rounded-full");
    expect(tray).toHaveClass("bg-muted/40");
  });

  it("marks a hash link active when the hash matches", () => {
    const anchorLinks: NavLink[] = [
      { href: "#features", label: "Features" },
      { href: "#demo", label: "Demo" },
    ];
    window.location.hash = "#demo";
    render(<Navbar brand="Acme" links={anchorLinks} />);

    const features = screen.getByRole("link", { name: /features/i });
    const demo = screen.getByRole("link", { name: /demo/i });
    expect(features).not.toHaveAttribute("aria-current", "page");
    expect(demo).toHaveAttribute("aria-current", "page");
  });

  it("renders pill with actions, badges, and sub-links together", async () => {
    const onNavigate = vi.fn();
    render(
      <Navbar
        variant="pill"
        brand="Acme"
        links={[
          { href: "/dashboard", label: "Dashboard" },
          { href: "/inbox", label: "Inbox", badge: 5 },
          {
            href: "/product",
            label: "Product",
            children: [
              { href: "/product/pricing", label: "Pricing" },
              { href: "/product/changelog", label: "Changelog" },
            ],
          },
        ]}
        actions={<button type="button">Sign in</button>}
        onNavigate={onNavigate}
      />,
    );

    // Actions render in the pill bar
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();

    // Badge renders next to the label
    expect(screen.getByText("5")).toBeInTheDocument();

    // Sub-links open a dropdown from the pill trigger
    const product = screen.getByRole("button", { name: /product/i });
    await userEvent.click(product);
    expect(await screen.findByText("Pricing")).toBeInTheDocument();
    expect(screen.getByText("Changelog")).toBeInTheDocument();
  });
});

describe("NotificationDrawer", () => {
  const notifications: Notification[] = [
    { id: "1", title: "New sign-in", description: "From Lagos", read: false, type: "warning" },
    { id: "2", title: "Payment received", read: true, type: "success" },
  ];

  it("renders bell with unread count", () => {
    render(<NotificationDrawer notifications={notifications} />);
    expect(screen.getByText("1")).toBeInTheDocument(); // unread badge
  });

  it("opens drawer and lists notifications", async () => {
    render(<NotificationDrawer notifications={notifications} />);
    await userEvent.click(screen.getByRole("button"));

    expect(await screen.findByText("New sign-in")).toBeInTheDocument();
    expect(screen.getByText("Payment received")).toBeInTheDocument();
  });

  it("marks all read via callback", async () => {
    const onMarkAllRead = vi.fn();
    render(<NotificationDrawer notifications={notifications} onMarkAllRead={onMarkAllRead} />);

    await userEvent.click(screen.getByRole("button"));
    await userEvent.click(await screen.findByText(/mark all/i));

    expect(onMarkAllRead).toHaveBeenCalledTimes(1);
  });
});

describe("Alert", () => {
  it("renders title and description", () => {
    render(
      <Alert>
        <AlertTitle>Heads up</AlertTitle>
        <AlertDescription>Something to note</AlertDescription>
      </Alert>,
    );
    expect(screen.getByText("Heads up")).toBeInTheDocument();
    expect(screen.getByText("Something to note")).toBeInTheDocument();
  });

  it("applies role=alert", () => {
    const { container } = render(<Alert>Info</Alert>);
    expect(container.querySelector("[role=alert]")).toBeInTheDocument();
  });

  it("applies destructive variant classes", () => {
    const { container } = render(<Alert variant="destructive">Danger</Alert>);
    const alert = container.querySelector("[role=alert]");
    expect(alert?.className).toContain("border-destructive/50");
    expect(alert?.className).toContain("text-destructive");
  });
});

describe("AlertDialog", () => {
  it("opens on trigger click and shows title + description", async () => {
    render(
      <AlertDialog>
        <AlertDialogTrigger>Delete</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Confirm delete</AlertDialogTitle>
          <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
        </AlertDialogContent>
      </AlertDialog>,
    );
    await userEvent.click(screen.getByRole("button", { name: /delete/i }));
    expect(await screen.findByText("Confirm delete")).toBeInTheDocument();
    expect(screen.getByText("This cannot be undone.")).toBeInTheDocument();
  });

  it("fires Action callback and closes", async () => {
    const onAction = vi.fn();
    render(
      <AlertDialog>
        <AlertDialogTrigger>Open</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Title</AlertDialogTitle>
          <AlertDialogAction onClick={onAction}>Confirm</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>,
    );
    await userEvent.click(screen.getByRole("button", { name: /open/i }));
    await userEvent.click(await screen.findByRole("button", { name: /confirm/i }));
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it("Cancel closes the dialog", async () => {
    render(
      <AlertDialog>
        <AlertDialogTrigger>Open</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Title</AlertDialogTitle>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogContent>
      </AlertDialog>,
    );
    await userEvent.click(screen.getByRole("button", { name: /open/i }));
    await userEvent.click(await screen.findByRole("button", { name: /cancel/i }));
    expect(screen.queryByText("Title")).not.toBeInTheDocument();
  });
});

describe("RadioGroup", () => {
  it("renders items and fires onValueChange on select", async () => {
    const onValueChange = vi.fn();
    render(
      <RadioGroup onValueChange={onValueChange}>
        <RadioGroupItem value="a" id="a" />
        <RadioGroupItem value="b" id="b" />
      </RadioGroup>,
    );
    const radios = screen.getAllByRole("radio");
    expect(radios.length).toBe(2);
    await userEvent.click(radios[1]!);
    expect(onValueChange).toHaveBeenCalledWith("b");
  });
});

describe("Toggle", () => {
  it("toggles aria-pressed and fires onPressedChange", async () => {
    const onPressedChange = vi.fn();
    render(<Toggle onPressedChange={onPressedChange}>Bold</Toggle>);
    const toggle = screen.getByRole("button", { name: /bold/i });
    expect(toggle).toHaveAttribute("aria-pressed", "false");
    await userEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-pressed", "true");
    expect(onPressedChange).toHaveBeenCalledWith(true);
  });
});

describe("ToggleGroup", () => {
  it("fires onValueChange for single selection", async () => {
    const onValueChange = vi.fn();
    render(
      <ToggleGroup type="single" onValueChange={onValueChange}>
        <ToggleGroupItem value="a">A</ToggleGroupItem>
        <ToggleGroupItem value="b">B</ToggleGroupItem>
      </ToggleGroup>,
    );
    await userEvent.click(screen.getByRole("radio", { name: /a/i }));
    expect(onValueChange).toHaveBeenCalledWith("a");
  });

  it("fires onValueChange for multiple selection", async () => {
    const onValueChange = vi.fn();
    render(
      <ToggleGroup type="multiple" onValueChange={onValueChange}>
        <ToggleGroupItem value="a">A</ToggleGroupItem>
        <ToggleGroupItem value="b">B</ToggleGroupItem>
      </ToggleGroup>,
    );
    await userEvent.click(screen.getByRole("button", { name: /a/i }));
    await userEvent.click(screen.getByRole("button", { name: /b/i }));
    expect(onValueChange).toHaveBeenCalledWith(["a"]);
    expect(onValueChange).toHaveBeenCalledWith(["a", "b"]);
  });
});

describe("Menubar", () => {
  it("opens a menu on trigger click and renders an item", async () => {
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>New</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>,
    );
    await userEvent.click(screen.getByRole("menuitem", { name: /file/i }));
    expect(await screen.findByText("New")).toBeInTheDocument();
  });
});

describe("ContextMenu", () => {
  it("opens on right-click and renders an item", async () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>Right click me</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Copy</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>,
    );
    const trigger = screen.getByText("Right click me");
    fireEvent.contextMenu(trigger);
    expect(await screen.findByText("Copy")).toBeInTheDocument();
  });
});

describe("HoverCard", () => {
  it("renders trigger and content on hover", async () => {
    render(
      <HoverCard>
        <HoverCardTrigger>@jane</HoverCardTrigger>
        <HoverCardContent>Jane Doe</HoverCardContent>
      </HoverCard>,
    );
    expect(screen.getByText("@jane")).toBeInTheDocument();
    await userEvent.hover(screen.getByText("@jane"));
    expect(await screen.findByText("Jane Doe")).toBeInTheDocument();
  });
});

describe("Kbd", () => {
  it("renders a kbd element with font-mono", () => {
    const { container } = render(<Kbd>Ctrl</Kbd>);
    const kbd = container.querySelector("kbd");
    expect(kbd).toBeInTheDocument();
    expect(kbd?.className).toContain("font-mono");
  });
});

describe("Spinner", () => {
  it("renders with animate-spin and default size", () => {
    const { container } = render(<Spinner />);
    const spinner = container.querySelector("[role=status]");
    expect(spinner?.className).toContain("animate-spin");
    expect(spinner?.className).toContain("size-6");
  });

  it("applies size + variant classes", () => {
    const { container } = render(<Spinner size="sm" variant="primary" />);
    const spinner = container.querySelector("[role=status]");
    expect(spinner?.className).toContain("size-4");
    expect(spinner?.className).toContain("text-primary");
  });
});

describe("EmptyState", () => {
  it("renders icon, title, description, and action", () => {
    const { container } = render(
      <EmptyState
        icon={<span data-testid="empty-icon">*</span>}
        title="No results"
        description="Try adjusting your search."
        action={<Button>Reset</Button>}
      />,
    );
    expect(screen.getByText("No results")).toBeInTheDocument();
    expect(screen.getByText("Try adjusting your search.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /reset/i })).toBeInTheDocument();
    expect(container.querySelector("[data-testid=empty-icon]")).toBeInTheDocument();
  });
});

describe("ButtonGroup", () => {
  it("renders children", () => {
    render(
      <ButtonGroup>
        <Button>One</Button>
        <Button>Two</Button>
      </ButtonGroup>,
    );
    expect(screen.getByRole("button", { name: /one/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /two/i })).toBeInTheDocument();
  });

  it("applies joined container classes", () => {
    const { container } = render(<ButtonGroup joined>X</ButtonGroup>);
    const group = container.querySelector("div");
    expect(group?.className).toContain("rounded-md");
    expect(group?.className).toContain("border-border");
  });
});

describe("AvatarGroup", () => {
  it("renders stacked avatars with fallbacks", () => {
    render(
      <AvatarGroup
        avatars={[
          { fallback: "A" },
          { fallback: "B" },
          { fallback: "C" },
          { fallback: "D" },
          { fallback: "E" },
        ]}
      />,
    );
    // max defaults to 4, so 4 shown + 1 overflow
    expect(screen.getByText("+1")).toBeInTheDocument();
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.queryByText("E")).not.toBeInTheDocument();
  });
});

describe("Combobox", () => {
  const options = [
    { value: "ng", label: "Nigeria" },
    { value: "ke", label: "Kenya" },
    { value: "za", label: "South Africa" },
  ];

  it("opens and shows options, then selects one", async () => {
    const onValueChange = vi.fn();
    render(<Combobox options={options} onValueChange={onValueChange} placeholder="Select country" />);
    await userEvent.click(screen.getByRole("combobox"));
    expect(await screen.findByText("Nigeria")).toBeInTheDocument();
    await userEvent.click(screen.getByText("Nigeria"));
    expect(onValueChange).toHaveBeenCalledWith("ng");
  });

  it("shows the selected value as the trigger label", () => {
    render(<Combobox options={options} value="ke" />);
    expect(screen.getByRole("combobox")).toHaveTextContent("Kenya");
  });
});
