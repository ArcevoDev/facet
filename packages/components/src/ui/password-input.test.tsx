import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PasswordInput } from "./password-input.js";

describe("PasswordInput", () => {
  it("renders as a password field by default", () => {
    render(<PasswordInput value="secret" />);
    expect(screen.getByRole("textbox", { hidden: true })).toHaveAttribute("type", "password");
  });

  it("toggles visibility on click", async () => {
    render(<PasswordInput value="secret" />);
    const toggle = screen.getByLabelText("Show password");
    await userEvent.click(toggle);
    expect(screen.getByRole("textbox", { hidden: true })).toHaveAttribute("type", "text");
    expect(screen.getByLabelText("Hide password")).toBeInTheDocument();
  });

  it("renders a label when provided", () => {
    render(<PasswordInput label="Password" />);
    expect(screen.getByText("Password")).toBeInTheDocument();
  });

  it("respects controlled visibility", async () => {
    const onVisibleChange = vi.fn();
    render(<PasswordInput value="secret" visible={false} onVisibleChange={onVisibleChange} />);
    await userEvent.click(screen.getByLabelText("Show password"));
    expect(onVisibleChange).toHaveBeenCalledWith(true);
    // Controlled: stays hidden because visible prop is still false.
    expect(screen.getByRole("textbox", { hidden: true })).toHaveAttribute("type", "password");
  });
});
