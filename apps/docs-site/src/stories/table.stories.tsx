import type { Meta, StoryObj } from "@storybook/react";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "@arcevo/facet-components";
import { Badge } from "@arcevo/facet-components";

const meta: Meta<typeof Table> = {
  title: "Components/Table",
  component: Table,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Table>;

const invoices = [
  { invoice: "INV-001", status: "Paid", method: "Card", amount: "$250.00" },
  { invoice: "INV-002", status: "Pending", method: "Bank", amount: "$150.00" },
  { invoice: "INV-003", status: "Paid", method: "Card", amount: "$350.00" },
  { invoice: "INV-004", status: "Overdue", method: "Wire", amount: "$120.00" },
];

export const Default: Story = {
  render: () => (
    <Table className="w-full max-w-2xl">
      <TableCaption>A list of recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((inv) => (
          <TableRow key={inv.invoice}>
            <TableCell className="font-medium">{inv.invoice}</TableCell>
            <TableCell>
              <Badge
                variant={
                  inv.status === "Paid"
                    ? "success"
                    : inv.status === "Pending"
                      ? "warning"
                      : "destructive"
                }
              >
                {inv.status}
              </Badge>
            </TableCell>
            <TableCell>{inv.method}</TableCell>
            <TableCell className="text-right">{inv.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$870.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};
