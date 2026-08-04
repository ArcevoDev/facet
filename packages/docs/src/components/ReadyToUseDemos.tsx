import * as React from "react";
import {
  Dropzone,
  QRCode,
  Marquee,
  Roadmap,
  ColorPicker,
  Form,
  FormField,
  useForm,
  Button,
  Input,
  DataTable,
  DatePicker,
  NumberInput,
  CountryCodeInput,
  LocationPicker,
  type RoadmapItem,
  type DataTableColumn,
} from "@arcevo/facet-components";

/**
 * Live demos for the "Ready to Use" docs pages. Each demo is a small,
 * self-contained example of one ready-to-use component.
 */

export function DropzoneDemo() {
  const [names, setNames] = React.useState<string[]>([]);
  return (
    <div className="not-prose space-y-3">
      <Dropzone
        label="Drop files to see them listed"
        hint="PDF, images, anything"
        onFiles={(files) => setNames(files.map((f) => f.name))}
      />
      {names.length > 0 && (
        <ul className="space-y-1 text-sm text-muted-foreground">
          {names.map((name) => (
            <li key={name} className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-primary" />
              {name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function ColorPickerDemo() {
  const [color, setColor] = React.useState("#6366f1");
  return (
    <div className="not-prose space-y-3">
      <ColorPicker value={color} onValueChange={setColor} label="Brand accent" />
      <p className="text-sm text-muted-foreground">Selected: {color}</p>
    </div>
  );
}

export function QRCodeDemo() {
  return (
    <div className="not-prose flex flex-wrap items-center gap-6">
      <QRCode value="https://facet.arcevocirqle.com.ng" size={140} label="facet docs QR code" />
      <QRCode value="https://github.com/arcevodev/facet" size={140} label="facet GitHub QR code" />
    </div>
  );
}

export function MarqueeDemo() {
  const items = ["facet", "arc-id", "auth", "design tokens", "React 19", "Radix", "TypeScript"];
  return (
    <div className="not-prose">
      <Marquee
        items={items.map((label) => (
          <span
            key={label}
            className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground"
          >
            {label}
          </span>
        ))}
        duration={18}
      />
    </div>
  );
}

const ROADMAP_ITEMS: RoadmapItem[] = [
  { title: "Auth presets", description: "Fintech, med, edu, enterprise", status: "done", date: "v1.0" },
  { title: "Passkey support", description: "WebAuthn across presets", status: "in-progress" },
  { title: "SAML/OIDC SSO", description: "Enterprise identity providers", status: "planned" },
  { title: "Collaborative canvas", description: "Multiplayer docs canvas", status: "planned", date: "later" },
];

export function RoadmapDemo() {
  return (
    <div className="not-prose">
      <Roadmap items={ROADMAP_ITEMS} />
    </div>
  );
}

interface FormValues {
  name: string;
  email: string;
}

export function FormDemo() {
  const form = useForm<FormValues>({ defaultValues: { name: "", email: "" } });
  const [sent, setSent] = React.useState<string | null>(null);
  return (
    <div className="not-prose max-w-md space-y-4">
      <Form
        form={form}
        onSubmit={(values) => setSent(`${values.name} <${values.email}>`)}
      >
        <FormField name="name" label="Name" required>
          <Input placeholder="Ada Lovelace" />
        </FormField>
        <FormField name="email" label="Email" required description="We never share it.">
          <Input placeholder="ada@example.com" type="email" />
        </FormField>
        <Button type="submit">Submit</Button>
      </Form>
      {sent && <p className="text-sm text-success">Submitted: {sent}</p>}
    </div>
  );
}

interface DemoRow extends Record<string, unknown> {
  id: string;
  name: string;
  email: string;
  role: string;
}

const DEMO_ROWS: DemoRow[] = [
  { id: "1", name: "Ada Lovelace", email: "ada@example.com", role: "Admin" },
  { id: "2", name: "Grace Hopper", email: "grace@example.com", role: "Engineer" },
  { id: "3", name: "Linus Torvalds", email: "linus@example.com", role: "Maintainer" },
  { id: "4", name: "Katherine Johnson", email: "katherine@example.com", role: "Scientist" },
  { id: "5", name: "Alan Turing", email: "alan@example.com", role: "Researcher" },
  { id: "6", name: "Margaret Hamilton", email: "margaret@example.com", role: "Engineer" },
];

const DEMO_COLUMNS: DataTableColumn<DemoRow>[] = [
  { key: "name", header: "Name" },
  { key: "email", header: "Email" },
  { key: "role", header: "Role", hidden: true, label: "Role" },
];

export function DataTableDemo() {
  return (
    <div className="not-prose">
      <DataTable
        columns={DEMO_COLUMNS}
        data={DEMO_ROWS}
        searchable
        exportable
        pagination
        pageSize={5}
        selectable
      />
    </div>
  );
}

export function DatePickerDemo() {
  const [date, setDate] = React.useState<Date | null>(null);
  return (
    <div className="not-prose space-y-6">
      <div className="max-w-xs">
        <DatePicker label="Due date" value={date} onValueChange={setDate} />
      </div>
      <div className="max-w-md">
        <p className="mb-2 text-sm font-medium text-foreground">Horizontal scroll strip</p>
        <DatePicker label="Pick a day" scrollMode="horizontal" horizontalDays={14} />
      </div>
    </div>
  );
}

export function NumberInputDemo() {
  const [count, setCount] = React.useState<number | null>(0);
  return (
    <div className="not-prose max-w-md space-y-6">
      <NumberInput label="Quantity" value={count} onValueChange={setCount} min={0} max={10} />
      <p className="text-sm text-muted-foreground">Selected: {count ?? "none"}</p>
    </div>
  );
}

export function CountryCodeInputDemo() {
  const [phone, setPhone] = React.useState({ country: "NG", number: "" });
  return (
    <div className="not-prose max-w-md space-y-6">
      <CountryCodeInput label="Mobile number" value={phone} onValueChange={setPhone} />
      <p className="text-sm text-muted-foreground">
        Dialed: {phone.country} {phone.number}
      </p>
    </div>
  );
}

export function LocationPickerDemo() {
  const [location, setLocation] = React.useState<{
    country?: string;
    region?: string;
    locality?: string;
  }>({});
  return (
    <div className="not-prose max-w-md space-y-4">
      <LocationPicker
        value={location}
        onValueChange={setLocation}
        showLocality
        placeholders={{ region: "Select state / region", locality: "Select LGA (optional)" }}
      />
      <p className="text-sm text-muted-foreground">
        Location:{" "}
        {[location.country, location.region, location.locality].filter(Boolean).join(" / ") ||
          "not set"}
      </p>
    </div>
  );
}
