import { describe, expect, it } from "vitest";
import * as React from "react";
import {
  renderEmailFromReact,
  EmailLayout,
  EmailButton,
  EmailText,
  EmailCodeBlock,
  EmailSecurityNotice,
  EmailSection,
  EmailRow,
  EmailColumn,
  toTemplateTree,
} from "./index.js";

describe("React bridge", () => {
  it("converts a React element to a template tree", () => {
    const tree = toTemplateTree(
      <div>
        <h1>Hello</h1>
        <p>World</p>
      </div>,
    );
    expect(tree.tag).toBe("div");
    expect(tree.children?.length).toBe(2);
  });

  it("renders JSX email primitives to HTML", () => {
    const html = renderEmailFromReact(
      <EmailLayout previewText="Preview" heading="Welcome" brandName="Acme">
        <EmailText>Hello there</EmailText>
        <EmailButton href="https://acme.dev/go">Get started</EmailButton>
        <EmailCodeBlock code="847 291" />
      </EmailLayout>,
    );
    expect(html).toContain("<!DOCTYPE html>");
    expect(html).toContain("Acme");
    expect(html).toContain("Welcome");
    expect(html).toContain("Hello there");
    expect(html).toContain('href="https://acme.dev/go"');
    expect(html).toContain("847 291");
  });

  it("works with plain (non-JSX) createElement calls", () => {
    const element = React.createElement(
      EmailLayout,
      { previewText: "P", heading: "Hi", brandName: "Acme" },
      React.createElement(EmailButton, { href: "#", children: "Go" }),
    );
    const html = renderEmailFromReact(element);
    expect(html).toContain("Hi");
    expect(html).toContain(">Go</a>");
  });

  it("renders Section/Row/Column and security-notice callouts in JSX", () => {
    const html = renderEmailFromReact(
      <EmailLayout previewText="P" heading="Codes" brandName="Acme">
        <EmailSection>
          <EmailRow>
            <EmailColumn style={{ width: "50%" }}>
              <EmailCodeBlock codes={["AAAA", "BBBB"]} label="Recovery codes" />
            </EmailColumn>
            <EmailColumn style={{ width: "50%" }}>
              <EmailCodeBlock code="123456" />
            </EmailColumn>
          </EmailRow>
        </EmailSection>
        <EmailSecurityNotice variant="warning">Heads up</EmailSecurityNotice>
      </EmailLayout>,
    );
    expect(html).toContain("AAAA");
    expect(html).toContain("BBBB");
    expect(html).toContain("123456");
    expect(html).toContain("Heads up");
    expect(html).toContain("Recovery codes");
  });
});
