import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DateInput, validateIsoDate } from "./date-input.js";

describe("validateIsoDate", () => {
  it("accepts valid ISO dates", () => {
    expect(validateIsoDate("2026-03-05")).toBe("2026-03-05");
  });

  it("rejects invalid dates and rollovers", () => {
    expect(validateIsoDate("garbage")).toBeNull();
    expect(validateIsoDate("2026-02-30")).toBeNull();
    expect(validateIsoDate("2026-13-01")).toBeNull();
  });
});

describe("DateInput", () => {
  it("renders the value", () => {
    render(<DateInput value="2026-03-05" />);
    expect(screen.getByRole("textbox")).toHaveValue("2026-03-05");
  });

  it("calls onValueChange with a validated date", async () => {
    const onValueChange = vi.fn();
    render(<DateInput onValueChange={onValueChange} />);
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "2026-03-05");
    expect(onValueChange).toHaveBeenLastCalledWith("2026-03-05");
  });

  it("reverts invalid input on blur", async () => {
    const onValueChange = vi.fn();
    render(<DateInput value="2026-03-05" onValueChange={onValueChange} />);
    const input = screen.getByRole("textbox");
    await userEvent.clear(input);
    await userEvent.type(input, "2026-02-30");
    fireEvent.blur(input);
    expect(input).toHaveValue("2026-03-05");
  });

  it("clears when the input is emptied", async () => {
    const onValueChange = vi.fn();
    render(<DateInput value="2026-03-05" onValueChange={onValueChange} />);
    const input = screen.getByRole("textbox");
    await userEvent.clear(input);
    expect(onValueChange).toHaveBeenLastCalledWith(null);
  });

  it("supports native date input", () => {
    render(<DateInput native label="Start date" />);
    expect(screen.getByLabelText("Start date")).toHaveAttribute("type", "date");
  });
});
