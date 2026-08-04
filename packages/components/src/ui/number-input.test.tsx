import { describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NumberInput } from "./number-input.js";

describe("NumberInput", () => {
  it("renders the current value", () => {
    render(<NumberInput value={5} />);
    expect(screen.getByRole("textbox")).toHaveValue("5");
  });

  it("increments with the up button", async () => {
    const onValueChange = vi.fn();
    render(<NumberInput value={5} onValueChange={onValueChange} />);
    await userEvent.click(screen.getByLabelText("Increase value"));
    expect(onValueChange).toHaveBeenLastCalledWith(6);
  });

  it("decrements with the down button", async () => {
    const onValueChange = vi.fn();
    render(<NumberInput value={5} onValueChange={onValueChange} />);
    await userEvent.click(screen.getByLabelText("Decrease value"));
    expect(onValueChange).toHaveBeenLastCalledWith(4);
  });

  it("clamps to min and max", async () => {
    const onValueChange = vi.fn();
    const maxView = render(
      <NumberInput value={10} min={0} max={10} onValueChange={onValueChange} />,
    );
    const up = within(maxView.baseElement).getByLabelText("Increase value");
    expect(up).toBeDisabled();
    await userEvent.click(up);
    expect(onValueChange).not.toHaveBeenCalled();
    maxView.unmount();

    const minView = render(
      <NumberInput value={0} min={0} max={10} onValueChange={onValueChange} />,
    );
    const down = within(minView.baseElement).getByLabelText("Decrease value");
    expect(down).toBeDisabled();
    await userEvent.click(down);
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("steps by the configured step", async () => {
    const onValueChange = vi.fn();
    render(<NumberInput value={2} step={0.5} onValueChange={onValueChange} />);
    await userEvent.click(screen.getByLabelText("Increase value"));
    expect(onValueChange).toHaveBeenLastCalledWith(2.5);
  });

  it("accepts typed numbers and clamps on change", async () => {
    const onValueChange = vi.fn();
    render(<NumberInput value={0} min={0} max={10} onValueChange={onValueChange} />);
    const input = screen.getByRole("textbox");
    await userEvent.clear(input);
    await userEvent.type(input, "7");
    expect(onValueChange).toHaveBeenLastCalledWith(7);
  });

  it("renders a label when provided", () => {
    render(<NumberInput value={1} label="Quantity" />);
    expect(screen.getByText("Quantity")).toBeInTheDocument();
  });
});
