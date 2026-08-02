import type { Meta, StoryObj } from "@storybook/react";
import { Icon, IconProvider, registerIcon } from "@arcevo/facet-components";
import type { IconName } from "@arcevo/facet-components";
import { ShieldAlert } from "lucide-react";

const meta: Meta<typeof Icon> = {
  title: "Foundations/Icon",
  component: Icon,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: "select",
      options: [
        "settings",
        "logout",
        "chevronDown",
        "search",
        "check",
        "moon",
        "sun",
        "bell",
        "menu",
        "close",
        "chevronLeft",
        "chevronRight",
        "arrowRight",
        "sparkles",
        "github",
        "bookOpen",
        "building",
        "users",
        "shield",
        "creditCard",
        "dashboard",
        "document",
        "help",
      ],
    },
    size: { control: "number" },
  },
};
export default meta;
type Story = StoryObj<typeof Icon>;

const NAMES: IconName[] = [
  "settings",
  "logout",
  "chevronDown",
  "search",
  "check",
  "moon",
  "sun",
  "bell",
  "menu",
  "close",
  "chevronLeft",
  "chevronRight",
  "arrowRight",
  "sparkles",
  "github",
  "bookOpen",
  "building",
  "users",
  "shield",
  "creditCard",
  "dashboard",
  "document",
  "help",
];

/** The full built-in semantic icon set. */
export const AllIcons: Story = {
  render: () => (
    <div className="grid max-w-2xl grid-cols-4 gap-4 sm:grid-cols-6">
      {NAMES.map((name) => (
        <div
          key={name}
          className="flex flex-col items-center gap-2 rounded-lg border border-border p-3"
        >
          <Icon name={name} className="size-5" />
          <span className="text-xs text-muted-foreground">{name}</span>
        </div>
      ))}
    </div>
  ),
};

/** A single icon via the controls panel. */
export const Single: Story = {
  args: { name: "bell", size: 24 },
};

/** Global registration lets you swap a semantic name everywhere. */
export const RegisterIcon: Story = {
  render: () => {
    registerIcon("shield", ShieldAlert);
    return (
      <div className="flex items-center gap-4">
        <Icon name="shield" className="size-5" />
        <span className="text-sm text-muted-foreground">
          shield is now ShieldAlert globally
        </span>
      </div>
    );
  },
};

/** IconProvider scopes overrides to a subtree (domain-specific icons). */
export const ProviderOverride: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-4">
        <Icon name="logout" className="size-5" />
        <span className="text-sm text-muted-foreground">default logout</span>
      </div>
      <IconProvider overrides={{ logout: ShieldAlert }}>
        <div className="flex items-center gap-4">
          <Icon name="logout" className="size-5" />
          <span className="text-sm text-muted-foreground">
            logout overridden by provider
          </span>
        </div>
      </IconProvider>
    </div>
  ),
};
