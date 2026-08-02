import type { Meta, StoryObj } from "@storybook/react";
import { Combobox } from "@arcevo/facet-components";
import { Check, Globe } from "lucide-react";

const meta: Meta<typeof Combobox> = {
  title: "Components/Combobox",
  component: Combobox,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Combobox>;

const countries = [
  { value: "ng", label: "Nigeria" },
  { value: "ke", label: "Kenya" },
  { value: "za", label: "South Africa" },
  { value: "gh", label: "Ghana" },
  { value: "eg", label: "Egypt" },
  { value: "ma", label: "Morocco" },
];

export const Default: Story = {
  render: () => (
    <div className="w-72">
      <Combobox
        options={countries}
        placeholder="Select country..."
        label="Country"
      />
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="w-72">
      <Combobox
        options={countries}
        placeholder="Select country..."
        label="Country"
        renderOption={(option) => (
          <span className="flex items-center gap-2">
            <Globe className="size-4 text-muted-foreground" />
            {option.label}
          </span>
        )}
      />
    </div>
  ),
};

export const Selected: Story = {
  render: () => (
    <div className="w-72">
      <Combobox
        options={countries}
        value="ng"
        placeholder="Select country..."
        label="Country"
        renderOption={(option) => (
          <span className="flex items-center gap-2">
            <Check className="size-4 text-muted-foreground" />
            {option.label}
          </span>
        )}
      />
    </div>
  ),
};
