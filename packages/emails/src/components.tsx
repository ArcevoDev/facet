/**
 * @arcevo/facet-emails: template primitives
 *
 * Every primitive exists in two forms:
 *   - A plain function returning a `TemplateNode` (framework-agnostic):
 *       emailButton({ href, children, variant })
 *   - A React component (JSX convenience layer):
 *       <EmailButton href="...">Go</EmailButton>
 *
 * Both share the same style-object API and inherit brand tokens from the
 * `brand` option passed to `renderEmail` / the layout.
 */

import type * as React from "react";
import { createElement, type TemplateNode } from "./render.js";

/* ── Style tokens ─────────────────────────────────────────── */

const PRIMARY = "var(--primary, #6366f1)";
const SURFACE = "var(--surface, #ffffff)";
const TEXT = "var(--text, #1f2937)";
const MUTED = "var(--muted, #6b7280)";

/* ── EmailLayout ──────────────────────────────────────────── */

export interface EmailLayoutProps {
  previewText: string;
  heading?: string;
  brandName?: string;
  footerNote?: string;
  footerMeta?: string;
  children?: React.ReactNode;
}

export function emailLayout(props: EmailLayoutProps): TemplateNode {
  const {
    previewText,
    heading,
    brandName = "facet",
    footerNote,
    footerMeta,
    children,
  } = props;
  const body = createElement(
    "table",
    { width: "100%", cellPadding: 0, cellSpacing: 0, role: "presentation", style: { backgroundColor: "var(--background, #f6f6f6)", margin: 0, padding: 0 } },
    createElement(
      "tr",
      {},
      createElement(
        "td",
        { align: "center", style: { padding: "32px 16px" } },
        createElement(
          "table",
          { width: "100%", cellPadding: 0, cellSpacing: 0, role: "presentation", style: { maxWidth: "600px", width: "100%", margin: "0 auto", backgroundColor: SURFACE, borderRadius: "12px", border: "1px solid #00000014", overflow: "hidden" } },
          // Preview text (hidden)
          createElement("div", { style: { display: "none", maxHeight: 0, overflow: "hidden" } }, previewText),
          // Header
          createElement(
            "tr",
            {},
            createElement(
              "td",
              { style: { padding: "24px 32px" } },
              createElement("h1", { style: { margin: 0, fontSize: "20px", fontWeight: 700, color: TEXT } }, brandName),
            ),
          ),
          // Divider
          createElement("tr", {}, createElement("td", { style: { borderTop: "1px solid #00000014" } })),
          // Heading + body
          createElement(
            "tr",
            {},
            createElement(
              "td",
              { style: { padding: "24px 32px" } },
              heading ? createElement("h2", { style: { margin: "0 0 16px", fontSize: "18px", fontWeight: 700, color: TEXT } }, heading) : null,
              ...(Array.isArray(children)
                ? (children as unknown as TemplateNode[])
                : children
                  ? [children as unknown as TemplateNode]
                  : []),
            ),
          ),
          // Footer
          createElement(
            "tr",
            {},
            createElement(
              "td",
              { style: { padding: "24px 32px", borderTop: "1px solid #00000014" } },
              footerNote
                ? createElement("p", { style: { margin: "0 0 8px", fontSize: "13px", lineHeight: "20px", color: MUTED } }, footerNote)
                : null,
              createElement("p", { style: { margin: 0, fontSize: "12px", color: MUTED } }, footerMeta ?? "This is an automated message. Please do not reply."),
            ),
          ),
        ),
      ),
    ),
  );
  return body;
}

/* ── EmailButton ──────────────────────────────────────────── */

export type EmailButtonVariant = "primary" | "danger" | "outline";

export interface EmailButtonProps {
  href: string;
  children?: React.ReactNode;
  variant?: EmailButtonVariant;
  style?: React.CSSProperties;
}

export function emailButton(props: EmailButtonProps): TemplateNode {
  const { href, children = "Learn more", variant = "primary", style = {} } = props;
  const base: React.CSSProperties = {
    display: "inline-block",
    padding: "13px 24px",
    borderRadius: "8px",
    fontWeight: 600,
    fontSize: "15px",
    textDecoration: "none",
    boxSizing: "border-box",
    margin: "8px 0",
    ...style,
  };
  if (variant === "primary") {
    base.backgroundColor = PRIMARY;
    base.color = "#ffffff";
  } else if (variant === "danger") {
    base.backgroundColor = "var(--danger, #dc2626)";
    base.color = "#ffffff";
  } else {
    base.border = `1px solid ${PRIMARY}`;
    base.color = PRIMARY;
    base.backgroundColor = "transparent";
  }
  return createElement("a", { href, className: "facet-btn", style: base }, children);
}

/* ── EmailText ────────────────────────────────────────────── */

export type EmailTextVariant = "default" | "small" | "muted" | "code";

export interface EmailTextProps {
  children?: React.ReactNode;
  variant?: EmailTextVariant;
  style?: React.CSSProperties;
}

export function emailText(props: EmailTextProps): TemplateNode {
  const { children, variant = "default", style = {} } = props;
  const base: React.CSSProperties = {
    margin: "0 0 12px",
    fontSize: "15px",
    lineHeight: "24px",
    color: TEXT,
    ...style,
  };
  if (variant === "small") base.fontSize = "13px";
  if (variant === "muted") {
    base.color = MUTED;
    base.fontSize = "13px";
  }
  if (variant === "code") {
    base.fontFamily = "ui-monospace,SFMono-Regular,Menlo,monospace";
    base.fontSize = "14px";
    base.backgroundColor = "#00000008";
    base.border = "1px solid #00000014";
    base.borderRadius = "6px";
    base.padding = "10px 14px";
  }
  return createElement("p", { style: base }, children);
}

/* ── EmailCodeBlock ───────────────────────────────────────── */

export interface EmailCodeBlockProps {
  code: string;
  label?: string;
  style?: React.CSSProperties;
}

export function emailCodeBlock(props: EmailCodeBlockProps): TemplateNode {
  const { code, label, style = {} } = props;
  return createElement(
    "table",
    { width: "100%", cellPadding: 0, cellSpacing: 0, role: "presentation", style: { margin: "16px 0" } },
    createElement(
      "tr",
      {},
      createElement(
        "td",
        { style: { backgroundColor: "#0f172a", borderRadius: "8px", padding: "16px 20px" } },
        label
          ? createElement("p", { style: { margin: "0 0 8px", fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", color: "#94a3b8" } }, label)
          : null,
        createElement(
          "pre",
          { style: { margin: 0, color: "#e2e8f0", fontFamily: "ui-monospace,SFMono-Regular,Menlo,monospace", fontSize: "15px", letterSpacing: "2px" } },
          code,
        ),
      ),
    ),
  );
}

/* ── EmailDivider ─────────────────────────────────────────── */

export function emailDivider(): TemplateNode {
  return createElement("hr", { style: { border: "none", borderTop: "1px solid #00000014", margin: "24px 0" } });
}

/* ── EmailLink ────────────────────────────────────────────── */

export interface EmailLinkProps {
  href: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export function emailLink(props: EmailLinkProps): TemplateNode {
  const { href, children, style = {} } = props;
  return createElement("a", { href, style: { color: PRIMARY, textDecoration: "underline", ...style } }, children ?? href);
}

/* ── EmailSecurityNotice ──────────────────────────────────── */

export interface EmailSecurityNoticeProps {
  ip: string;
  userAgent?: string;
  location?: string;
  style?: React.CSSProperties;
}

export function emailSecurityNotice(props: EmailSecurityNoticeProps): TemplateNode {
  const { ip, userAgent, location, style = {} } = props;
  const rows = [
    { k: "IP address", v: ip },
    ...(location ? [{ k: "Location", v: location }] : []),
    ...(userAgent ? [{ k: "Device", v: userAgent }] : []),
  ];
  return createElement(
    "table",
    { width: "100%", cellPadding: 0, cellSpacing: 0, role: "presentation", style: { margin: "16px 0", border: "1px solid #00000014", borderRadius: "8px", ...style } },
    ...rows.map((r) =>
      createElement(
        "tr",
        {},
        createElement("td", { style: { padding: "8px 16px", width: "120px", fontSize: "13px", color: MUTED } }, r.k),
        createElement("td", { style: { padding: "8px 16px", fontSize: "13px", color: TEXT } }, r.v),
      ),
    ),
  );
}

/* ── EmailList ────────────────────────────────────────────── */

export interface EmailListProps {
  items: string[];
  style?: React.CSSProperties;
}

export function emailList(props: EmailListProps): TemplateNode {
  const { items, style = {} } = props;
  return createElement(
    "ul",
    { style: { margin: "16px 0", paddingLeft: "20px", ...style } },
    ...items.map((item) =>
      createElement("li", { style: { margin: "0 0 8px", fontSize: "15px", lineHeight: "24px", color: TEXT } }, item),
    ),
  );
}

/* ── React wrappers ───────────────────────────────────────── */

import * as React from "react";

function wrap<T extends object>(fn: (props: T) => TemplateNode) {
  return function EmailComponent(props: T) {
    return toReactNode(fn(props));
  };
}

/** Convert a TemplateNode to a React element (for JSX composition). */
function toReactNode(node: TemplateNode): React.ReactElement {
  const { tag, props = {}, children = [] } = node;
  return React.createElement(
    tag,
    props as React.HTMLAttributes<HTMLElement>,
    ...children.map((c) => (typeof c === "string" ? c : toReactNode(c))),
  );
}

export const EmailLayout = wrap<EmailLayoutProps & { children?: React.ReactNode }>((props) => {
  const { children, ...rest } = props;
  return emailLayout({ ...rest, children });
});
export const EmailButton = wrap<EmailButtonProps>(emailButton);
export const EmailText = wrap<EmailTextProps>(emailText);
export const EmailCodeBlock = wrap<EmailCodeBlockProps>(emailCodeBlock);
export const EmailDivider = wrap<{}>(() => emailDivider());
export const EmailLink = wrap<EmailLinkProps>(emailLink);
export const EmailSecurityNotice = wrap<EmailSecurityNoticeProps>(emailSecurityNotice);
export const EmailList = wrap<EmailListProps>(emailList);
