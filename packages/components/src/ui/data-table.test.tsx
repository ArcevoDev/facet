import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DataTable, type DataTableColumn } from "./data-table.js";

interface Row extends Record<string, unknown> {
  id: string;
  name: string;
  role: string;
  active: boolean;
}

const COLUMNS: DataTableColumn<Row>[] = [
  { key: "name", header: "Name" },
  { key: "role", header: "Role" },
  { key: "active", header: "Status", cell: (r) => (r.active ? "Active" : "Inactive") },
];

const ROWS: Row[] = [
  { id: "1", name: "Ada", role: "Admin", active: true },
  { id: "2", name: "Grace", role: "Engineer", active: false },
  { id: "3", name: "Linus", role: "Admin", active: true },
];

describe("DataTable", () => {
  it("renders headers and rows", () => {
    render(<DataTable columns={COLUMNS} data={ROWS} />);
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Ada")).toBeInTheDocument();
    expect(screen.getByText("Engineer")).toBeInTheDocument();
  });

  it("filters rows via the search box", async () => {
    render(<DataTable columns={COLUMNS} data={ROWS} searchable />);
    await userEvent.type(screen.getByLabelText("Search..."), "Grace");
    expect(screen.getByText("Grace")).toBeInTheDocument();
    expect(screen.queryByText("Ada")).not.toBeInTheDocument();
  });

  it("sorts rows when a header is clicked", async () => {
    render(<DataTable columns={COLUMNS} data={ROWS} />);
    await userEvent.click(screen.getByRole("button", { name: "Sort by Name" }));
    const nameCells = screen.getAllByRole("row").slice(1).map((r) => within(r).getByText(/Ada|Grace|Linus/).textContent);
    expect(nameCells).toEqual(["Ada", "Grace", "Linus"]);
    await userEvent.click(screen.getByRole("button", { name: "Sort by Name" }));
    const descCells = screen.getAllByRole("row").slice(1).map((r) => within(r).getByText(/Ada|Grace|Linus/).textContent);
    expect(descCells).toEqual(["Linus", "Grace", "Ada"]);
  });

  it("paginates rows", async () => {
    render(<DataTable columns={COLUMNS} data={ROWS} pagination pageSize={2} />);
    expect(screen.getByText("Ada")).toBeInTheDocument();
    expect(screen.getByText("Grace")).toBeInTheDocument();
    expect(screen.queryByText("Linus")).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Next" }));
    expect(screen.getByText("Linus")).toBeInTheDocument();
  });

  it("selects and clears rows", async () => {
    render(<DataTable columns={COLUMNS} data={ROWS} selectable />);
    const rowCheckboxes = screen.getAllByLabelText("Select row");
    await userEvent.click(rowCheckboxes[0]!);
    expect(screen.getByText("1 selected")).toBeInTheDocument();
    await userEvent.click(screen.getByText("Clear"));
    expect(screen.queryByText("1 selected")).not.toBeInTheDocument();
  });

  it("selects all rows with the header checkbox", async () => {
    render(<DataTable columns={COLUMNS} data={ROWS} selectable />);
    await userEvent.click(screen.getByLabelText("Select all rows"));
    expect(screen.getByText("3 selected")).toBeInTheDocument();
  });

  it("exports CSV on button click", () => {
    const revoke = vi.fn();
    const create = vi.fn(() => "blob:url");
    const click = vi.fn();
    vi.stubGlobal("URL", { ...URL, createObjectURL: create, revokeObjectURL: revoke });
    // The real Blob works in jsdom; only the anchor click needs spying.
    const clickSpy = vi
      .spyOn(HTMLAnchorElement.prototype, "click")
      .mockImplementation(click);

    render(<DataTable columns={COLUMNS} data={ROWS} exportable />);
    fireEvent.click(screen.getByRole("button", { name: /Export CSV/ }));
    expect(create).toHaveBeenCalled();
    expect(clickSpy).toHaveBeenCalled();
    expect(revoke).toHaveBeenCalled();
    clickSpy.mockRestore();
    vi.unstubAllGlobals();
  });

  it("shows an empty state when no rows match", async () => {
    render(<DataTable columns={COLUMNS} data={ROWS} searchable />);
    await userEvent.type(screen.getByLabelText("Search..."), "nobody");
    expect(screen.getByText("No results found.")).toBeInTheDocument();
  });

  it("accepts plain interface row types (no index signature)", () => {
    // Regression: the generic used to be `T extends Record<string, unknown>`,
    // which rejects interfaces (TS2344). Plain interfaces must work.
    interface EventRow {
      id: string;
      title: string;
      actor: string;
    }
    const eventColumns: DataTableColumn<EventRow>[] = [
      { key: "title", header: "Title" },
      { key: "actor", header: "Actor" },
    ];
    const eventRows: EventRow[] = [
      { id: "1", title: "Login", actor: "ada" },
      { id: "2", title: "Logout", actor: "grace" },
    ];
    render(<DataTable columns={eventColumns} data={eventRows} selectable />);
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("grace")).toBeInTheDocument();
    const rowCheckboxes = screen.getAllByLabelText("Select row");
    fireEvent.click(rowCheckboxes[0]!);
    expect(screen.getByText("1 selected")).toBeInTheDocument();
  });
});
