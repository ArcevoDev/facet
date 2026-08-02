import type { Meta, StoryObj } from "@storybook/react";
import { Navbar, Button } from "@arcevo/facet-components";

const meta: Meta<typeof Navbar> = {
  title: "Components/Navbar",
  component: Navbar,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "sticky", "glass", "bordered", "transparent", "pill"],
    },
    size: { control: "select", options: ["default", "sm", "lg"] },
    showMobileMenu: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Navbar>;

const defaultLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/analytics", label: "Analytics" },
  { href: "/settings", label: "Settings" },
];

export const Default: Story = {
  args: {
    brand: <span className="font-semibold">Acme</span>,
    links: defaultLinks,
    actions: <Button size="sm">Sign in</Button>,
  },
};

export const Sticky: Story = {
  args: {
    variant: "sticky",
    brand: <span className="font-semibold">Acme</span>,
    links: defaultLinks,
    actions: <Button size="sm">Sign in</Button>,
  },
};

export const Glass: Story = {
  args: {
    variant: "glass",
    brand: <span className="font-semibold">Acme</span>,
    links: defaultLinks,
    actions: <Button size="sm">Sign in</Button>,
  },
};

export const Bordered: Story = {
  args: {
    variant: "bordered",
    brand: <span className="font-semibold">Acme</span>,
    links: defaultLinks,
    actions: <Button size="sm">Sign in</Button>,
  },
};

export const Pill: Story = {
  args: {
    variant: "pill",
    brand: <span className="font-semibold">Acme</span>,
    links: defaultLinks,
    actions: <Button size="sm">Sign in</Button>,
  },
};

export const WithBadge: Story = {
  args: {
    brand: <span className="font-semibold">Acme</span>,
    links: [
      { href: "/dashboard", label: "Dashboard" },
      { href: "/inbox", label: "Inbox", badge: 5 },
      { href: "/settings", label: "Settings" },
    ],
  },
};

export const WithActions: Story = {
  args: {
    brand: <span className="font-semibold">Acme</span>,
    links: defaultLinks,
    actions: (
      <>
        <Button variant="outline" size="sm">
          Log in
        </Button>
        <Button size="sm">Get started</Button>
      </>
    ),
  },
};

export const WithSubLinks: Story = {
  args: {
    brand: <span className="font-semibold">Acme</span>,
    links: [
      {
        href: "/product",
        label: "Product",
        children: [
          {
            href: "/product/overview",
            label: "Overview",
            description: "High-level product tour and feature highlights.",
          },
          {
            href: "/product/pricing",
            label: "Pricing",
            description: "Plans, billing, and usage limits.",
            badge: "New",
          },
          {
            href: "/product/changelog",
            label: "Changelog",
            description: "What shipped recently.",
          },
        ],
      },
      {
        href: "/docs",
        label: "Documentation",
        children: [
          {
            href: "/docs/getting-started",
            label: "Getting started",
            description: "Install and configure facet in 5 minutes.",
          },
          {
            href: "/docs/components",
            label: "Components",
            description: "Browse the full component reference.",
          },
          {
            href: "/docs/theming",
            label: "Theming",
            description: "Customize tokens per brand and domain.",
          },
        ],
      },
      { href: "/pricing", label: "Pricing" },
      { href: "/blog", label: "Blog" },
    ],
    actions: <Button size="sm">Get started</Button>,
  },
};
