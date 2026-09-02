import * as React from "react";
import { render, screen, fireEvent, cleanup, act } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LiveCodePlayground } from "./LiveCodePlayground.js";

vi.mock("prettier/standalone", () => ({
  format: async (code: string) => "// formatted\n" + code,
}));
vi.mock("prettier/plugins/typescript", () => ({}));
vi.mock("prettier/plugins/estree", () => ({}));

const MockButton: React.ComponentType<any> = ({ children }) => (
  <button data-testid="preview-btn">{children}</button>
);
const components = { Button: MockButton };

afterEach(cleanup);

const FULL_CODE = `import { Button } from "@arcevo/facet-components";

function Example() {
  return <Button variant="default">Get started</Button>;
}
`;

describe("LiveCodePlayground", () => {
  it("shows the full usage code in the editor", () => {
    render(<LiveCodePlayground defaultCode={FULL_CODE} components={components} />);
    const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
    expect(textarea.value).toBe(FULL_CODE);
  });

  it("renders the preview from a full usage snippet", () => {
    render(<LiveCodePlayground defaultCode={FULL_CODE} components={components} />);
    expect(screen.getByTestId("preview-btn")).toHaveTextContent("Get started");
  });

  it("renders bare pasted JSX even without a return statement", () => {
    render(
      <LiveCodePlayground
        defaultCode="<Button>Bare paste</Button>"
        components={components}
      />,
    );
    expect(screen.getByTestId("preview-btn")).toHaveTextContent("Bare paste");
  });

  it("reports unknown components with a helpful message", () => {
    render(
      <LiveCodePlayground
        defaultCode="<NotFound>x</NotFound>"
        components={components}
      />,
    );
    expect(screen.getByText(/unknown component/i)).toBeInTheDocument();
  });

  it("exposes a visible copy button", () => {
    render(
      <LiveCodePlayground
        defaultCode="<Button>x</Button>"
        components={components}
      />,
    );
    const copy = screen.getByRole("button", { name: /copy code/i });
    expect(copy).toBeInTheDocument();
    expect(copy).not.toHaveClass("opacity-0");
  });

  it("copies the code to the clipboard", async () => {
    vi.useFakeTimers();
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    });

    const code = "<Button>copy me</Button>";
    render(<LiveCodePlayground defaultCode={code} components={components} />);

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /copy code/i }));
    });
    expect(writeText).toHaveBeenCalledWith(code);
    vi.useRealTimers();
  });

  it("renders a Format button", () => {
    render(<LiveCodePlayground defaultCode="<Button>x</Button>" components={components} />);
    expect(screen.getByRole("button", { name: /format/i })).toBeInTheDocument();
  });

  it("formats the editor code with Prettier on click", async () => {
    const code = "<Button>x</Button>";
    render(<LiveCodePlayground defaultCode={code} components={components} />);
    const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
    expect(textarea.value).toBe(code);

    await act(async () => {
      await fireEvent.click(screen.getByRole("button", { name: /format/i }));
    });

    await vi.waitFor(() => {
      expect(textarea.value).toBe("// formatted\n" + code);
    });
  });

  it("evaluates array literals and ignores bare identifiers in props", () => {
    let captured: any = null;
    const Box: React.ComponentType<any> = (props) => {
      captured = props;
      return <span data-testid="box" />;
    };
    render(
      <LiveCodePlayground
        defaultCode='<Box items={["a", "b"]} count={count} />'
        components={{ Box }}
      />,
    );
    expect(captured?.items).toEqual(["a", "b"]);
    expect(captured?.count).toBeUndefined();
  });

  it("sanitizes javascript: URLs in href to #", () => {
    render(
      <LiveCodePlayground
        defaultCode='<a href="javascript:alert(1)">click me</a>'
        components={components}
      />,
    );
    const link = screen.getByText("click me") as HTMLAnchorElement;
    expect(link.getAttribute("href")).toBe("#");
    expect(link.getAttribute("href")).not.toContain("javascript:");
  });

  it("preserves safe https: URLs in href", () => {
    render(
      <LiveCodePlayground
        defaultCode='<a href="https://example.com">safe link</a>'
        components={components}
      />,
    );
    const link = screen.getByText("safe link") as HTMLAnchorElement;
    expect(link.getAttribute("href")).toBe("https://example.com");
  });

  it("sanitizes javascript: URLs in img src to #", () => {
    render(
      <LiveCodePlayground
        defaultCode='<img src="javascript:alert(1)" alt="img" />'
        components={components}
      />,
    );
    const img = screen.getByAltText("img") as HTMLImageElement;
    expect(img.getAttribute("src")).toBe("#");
  });

  it("preserves relative and anchor URLs", () => {
    render(
      <LiveCodePlayground
        defaultCode='<a href="/relative/path">rel</a>'
        components={components}
      />,
    );
    const link = screen.getByText("rel") as HTMLAnchorElement;
    expect(link.getAttribute("href")).toBe("/relative/path");
  });
});
